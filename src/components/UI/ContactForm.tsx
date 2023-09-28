import React, {
  useRef, useEffect, useMemo, useState,
} from 'react';

import '../../styles/UI/ContactForm.scss';

import config from '../../config.ts';

const ContactForm: React.FC = () => {
  const [formContent, setFormContent] = useState(
    JSON.parse(sessionStorage.getItem('formContent')!) || null,
    // * ! = non-null assertion operator to tell TS that
    // * sessionStorage.getItem('formContent')! is not null.
  );

  const [formSubmittedStatus, setFormSubmittedStatus] = useState(false);

  const actionURL = config.formActionURL;

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
      email:
        /^[\w.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: /[\w.!,.@#%&'"*+/=-]{20,}/,
    }),
    [],
  );

  const setInputStyle = (
    inputDomElement: HTMLInputElement,
    isValid: boolean,
  ) => {
    if (isValid) {
      inputDomElement.classList.remove('invalid');
      if (inputDomElement.nextSibling instanceof HTMLElement) {
        inputDomElement.nextSibling.classList.add('show');
      }
      inputDomElement.classList.add('valid');
    } else {
      inputDomElement.classList.remove('valid');
      inputDomElement.classList.add('invalid');
    }
  };

  const setSubmitButtonStyle = (isValid: boolean) => {
    if (isValid) {
      $submitButton.current?.classList.remove('invalid');
      $submitButton.current?.classList.add('valid');
    } else {
      $submitButton.current?.classList.remove('valid');
      $submitButton.current?.classList.add('invalid');
    }
  };

  const validateInput = (input: any, regex: RegExp) => {
    const inputKey = input.obj.current?.name as keyof typeof inputs;
    const isValid = regex.test(input.obj.current?.value || '');

    inputs[inputKey].validated = isValid;
    setInputStyle(input.obj.current, isValid);

    // * set the submit button style based on the validity of all inputs.
    setSubmitButtonStyle(
      Object.values(inputs).every((inputObj) => inputObj.validated),
    );
  };

  useEffect(() => {
    if (formContent) {
      sessionStorage.setItem('formContent', JSON.stringify(formContent));
    }
  }, [formContent]);

  const updateFormContent = (input: any) => () => {
    const inputKey = input.obj.current?.name as keyof typeof inputs;

    setFormContent((previousFormContent: any) => {
      const currentFormContent = { ...previousFormContent };
      currentFormContent[inputKey] = input.obj.current?.value;

      return currentFormContent;
    });
  };

  useEffect(() => {
    Object.values(inputs).forEach((input) => {
      input.obj.current?.addEventListener('blur', updateFormContent(input));

      return () => {
        input.obj.current?.removeEventListener('blur', updateFormContent);
      };
    });
  }, [inputs]);

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
  }, [formContent, inputs, validInputsPattern]);

  const submitButtonErrorContent = (error: Error | string) => {
    if ($submitButton.current) {
      $submitButton.current.textContent = '';
      $submitButton.current.appendChild(
        document.createTextNode(`Error! ${error}`),
      );
    }
  };

  const hideInputs = () => {
    if (formSubmittedStatus) {
      Object.values(inputs).forEach((input) => {
        const inputElement = input;
        if (inputElement.obj.current) {
          inputElement.obj.current.classList.remove('show');
          inputElement.obj.current.style.display = 'none';
        }
      });
    }
  };

  useEffect(() => {
    if (formSubmittedStatus) hideInputs();
  }, [formSubmittedStatus]);

  const submitForm = async () => {
    try {
      await fetch(actionURL, {
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
  }, [inputs]);

  return (
    <form
      className="contact-form container"
      ref={$form}
      onSubmit={handleSubmission}
    >
      <input
        type="text"
        ref={$nameInputRef}
        name="name"
        placeholder="tell me your name"
        minLength={2}
        required
      />

      <input
        type="text"
        ref={$companyInputRef}
        name="company"
        placeholder="your company name here!"
        minLength={3}
        required
      />

      <input
        type="email"
        ref={$emailInputRef}
        name="email"
        placeholder="an email so I can contact you back!"
        required
      />

      <textarea
        ref={$messageInputRef}
        name="message"
        placeholder="your message here!"
        rows={5}
        cols={20}
        required
      />

      <button type="submit" ref={$submitButton} className="my-btn">
        {formSubmittedStatus ? 'Thank you!' : 'Send'}
      </button>
    </form>
  );
};

export default ContactForm;
