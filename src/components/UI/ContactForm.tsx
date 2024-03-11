import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';

import '../../styles/UI/ContactForm.scss';

const successButtonIcon = 'https://camo.githubusercontent.com/b55970b1d4c6e5d8d09a07556bce08ff3cfec080b680ad6b5be3ed46546e6f77/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f6b52654b6366727331596f546d74324151742f67697068792e676966';

const ContactForm: React.FC = () => {
  const [formContent, setFormContent] = useState(
    JSON.parse(sessionStorage.getItem('formContent')!) || null,
    // * ! = non-null assertion operator to tell TS that
    // * sessionStorage.getItem('formContent')! is not null.
  );

  // * This state is to disable the submit button after the form is submitted.
  const [formSubmittedStatus, setFormSubmittedStatus] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const actionURL = process.env.REACT_APP_FORM_ACTION_URL;

  const $form = useRef<HTMLFormElement | null>(null);
  const $nameInputRef = useRef<HTMLInputElement | null>(null);
  const $companyInputRef = useRef<HTMLInputElement | null>(null);
  const $emailInputRef = useRef<HTMLInputElement | null>(null);
  const $messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const $submitButton = useRef<HTMLButtonElement | null>(null);

  const inputs = useMemo(
    () => ({
      name: { obj: $nameInputRef, validated: false },
      company: { obj: $companyInputRef, validated: false },
      email: { obj: $emailInputRef, validated: false },
      message: { obj: $messageInputRef, validated: false },
    }),
    [],
  );

  const validInputsPattern = useMemo(
    () => ({
      name: /[a-z]{2,}/,
      company: /[a-z]{3,}/,
      email: /^[\w.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: /[\w\s.!,.@#%&'"*+/=-]{20,}/,
    }),
    [],
  );

  const setInputStyle = (
    inputDomElement: HTMLInputElement,
    isValid: boolean,
  ) => {
    if (isValid) {
      inputDomElement.classList.remove('invalid');

      // * If the input is valid, remove invalid class, add show class to next
      // * input after label, and add valid class.
      // ! Note: This method of accessing the next input after the label may not
      // ! be the most robust.
      const inputElementAfterLabelElement = inputDomElement.nextSibling?.nextSibling;
      if (inputElementAfterLabelElement instanceof HTMLElement) {
        inputElementAfterLabelElement.classList.add('show');
      }
      inputDomElement.classList.add('valid');
    } else {
      inputDomElement.classList.remove('valid');
      inputDomElement.classList.add('invalid');
    }
  };

  const validateInput = useCallback(
    (input: any, regex: RegExp) => {
      const inputKey = input.obj.current?.name as keyof typeof inputs;
      const isValid = regex.test(input.obj.current?.value || '');

      inputs[inputKey].validated = isValid;
      setInputStyle(input.obj.current, isValid);

      // * set the submit button style based on the validity of all inputs.
      const areAllValidInputs = Object.values(inputs).every(
        (inputObj) => inputObj.validated,
      );
      if (areAllValidInputs) {
        setShowSubmitButton(true);
      } else {
        setShowSubmitButton(false);
      }
    },
    [inputs],
  );

  useEffect(() => {
    if (formContent) {
      sessionStorage.setItem('formContent', JSON.stringify(formContent));
    }
  }, [formContent]);

  const updateFormContent = useCallback(
    (input: any) => () => {
      const inputKey = input.obj.current?.name as keyof typeof inputs;

      setFormContent((previousFormContent: any) => {
        const currentFormContent = { ...previousFormContent };
        currentFormContent[inputKey] = input.obj.current?.value;

        return currentFormContent;
      });
    },
    [],
  );

  useEffect(() => {
    Object.values(inputs).forEach((input) => {
      input.obj.current?.addEventListener('blur', updateFormContent(input));

      return () => {
        input.obj.current?.removeEventListener('blur', updateFormContent);
      };
    });
  }, [inputs, updateFormContent]);

  // * this useEffect is to update the form inputs values and styles
  // * when the user comes back to the page.
  useEffect(() => {
    if (formContent) {
      Object.values(inputs).forEach((input) => {
        const inputKeyInValidInputsPattern = input.obj.current
          ?.name as keyof typeof validInputsPattern;
        // * key = 'name' | 'company' | 'email' | 'message'

        if (inputKeyInValidInputsPattern) {
          const inputObjDomElement = input.obj.current;
          if (inputObjDomElement) {
            // * assign the value from sessionStorage to the input,
            // * as long as the value is not undefined.
            if (formContent[inputKeyInValidInputsPattern]) {
              inputObjDomElement.value = formContent[inputKeyInValidInputsPattern];
            }
            validateInput(
              input,
              validInputsPattern[inputKeyInValidInputsPattern],
            );
          }
        }
      });
    }
  }, [formContent, inputs, validInputsPattern, validateInput]);

  const submitButtonErrorContent = (error: Error | string) => {
    if ($submitButton.current) {
      $submitButton.current.textContent = '';
      $submitButton.current.appendChild(
        document.createTextNode(`Error! ${error}`),
      );
    }
  };

  const hideInputs = useCallback(() => {
    if (formSubmittedStatus) {
      Object.values(inputs).forEach((input) => {
        const inputElement = input;
        if (inputElement.obj.current) {
          inputElement.obj.current.classList.remove('show');
          inputElement.obj.current.style.display = 'none';
        }
      });
    }
  }, [formSubmittedStatus, inputs]);

  useEffect(() => {
    if (formSubmittedStatus) hideInputs();
  }, [formSubmittedStatus, hideInputs]);

  const submitForm = async () => {
    try {
      await fetch(actionURL!, {
        method: 'POST',
        body: JSON.stringify({
          name: $nameInputRef.current?.value,
          company: $companyInputRef.current?.value,
          email: $emailInputRef.current?.value,
          message: $messageInputRef.current?.value,
        }),
        headers: {
          Accept: 'application/json',
        },
      });

      $form.current?.reset();
      sessionStorage.clear();
      setFormSubmittedStatus(true);
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        submitButtonErrorContent(error);
      } else {
        submitButtonErrorContent(String(error));
      }
    }
  };

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault();

    const allValidInputs = Object.values(inputs).every(
      (input) => input.validated,
    );

    if (allValidInputs) {
      submitForm();
    }
  };

  useEffect(() => {
    Object.values(inputs).forEach((input) => {
      const inputName = input.obj.current?.name;

      if (input.obj.current?.classList.contains('invalid')) {
        input.obj.current?.focus();
      }

      if (inputName) {
        const inputKeyInValidInputsPattern = inputName as keyof typeof validInputsPattern;
        // * key = 'name' | 'company' | 'email' | 'message'
        input.obj.current?.addEventListener('keyup', () => {
          validateInput(
            input,
            validInputsPattern[inputKeyInValidInputsPattern],
          );
        });
      }

      return () => {
        input.obj.current?.removeEventListener('keyup', () => validateInput);
      };
    });
  }, [inputs, validInputsPattern, validateInput]);

  return (
    <form
      className="contact-form container"
      ref={$form}
      onSubmit={handleSubmission}
    >
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        ref={$nameInputRef}
        name="name"
        placeholder="your name, at least 2 characters long"
        minLength={2}
        required
      />

      <label htmlFor="company">Company name: </label>
      <input
        id="company"
        type="text"
        ref={$companyInputRef}
        name="company"
        placeholder="your company name, at least 3 characters long"
        minLength={3}
        required
      />

      <label htmlFor="email">Email: </label>
      <input
        id="email"
        type="email"
        ref={$emailInputRef}
        name="email"
        placeholder="an email, e.g example@gmail.com"
        required
      />

      <label htmlFor="message">Message: </label>
      <textarea
        id="message"
        ref={$messageInputRef}
        name="message"
        placeholder="your message, at least 20 characters long"
        rows={5}
        cols={20}
        required
      />

      {showSubmitButton && (
        <button
          type="submit"
          disabled={formSubmittedStatus}
          ref={$submitButton}
          className={`my-btn ${showSubmitButton ? 'valid show' : 'invalid'}`}
          aria-label={
            formSubmittedStatus ? 'Thank you! email sent' : 'Send email'
          }
        >
          {formSubmittedStatus ? 'Thank you!' : 'Send'}

          {formSubmittedStatus && (
            <img
              src={successButtonIcon}
              alt="alien waving hand"
              aria-hidden="true"
              className="send-email-icon"
            />
          )}
        </button>
      )}
    </form>
  );
};

export default ContactForm;
