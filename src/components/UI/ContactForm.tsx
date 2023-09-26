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
    () => [$nameInputRef, $companyInputRef, $emailInputRef, $messageInputRef],
    [],
  );

  const validInputsPattern = useMemo(
    () => ({
      name: /[a-z]{2,}/,
      company: /[a-z]{3,}/,
      email:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: /.{20,}/,
    }),
    [],
  );

  const validateInput = (input: any, regex: RegExp) => {
    if (!regex.test(input.current?.value)) {
      input.current?.classList.remove('valid');
      input.current?.classList.add('invalid');
      $submitButton.current?.classList.remove('valid');
      $submitButton.current?.classList.add('invalid');
    } else {
      input.current?.classList.add('valid');
      input.current?.nextSibling?.classList.add('show');
      input.current?.classList.remove('invalid');
      $submitButton.current?.classList.add('valid');
      $submitButton.current?.classList.remove('invalid');
    }
  };

  const updateFormContent = () => {
    const newFormContent = inputs.reduce((acc, input) => {
      const inputKeyInformContent = input.current
        ?.name as keyof typeof formContent;
      if (inputKeyInformContent) {
        acc[inputKeyInformContent] = input.current?.value;
      }
      return acc;
    }, {} as typeof formContent);

    setFormContent(newFormContent);
    sessionStorage.setItem('formContent', JSON.stringify(newFormContent));
  };

  useEffect(() => {
    inputs.forEach((input) => {
      input.current?.addEventListener('blur', updateFormContent);
    });

    return () => {
      inputs.forEach((input) => {
        input.current?.removeEventListener('blur', updateFormContent);
      });
    };
  }, [inputs]);

  // * this useEffect is to update the form inputs values and styles
  // * when the user comes back to the page.
  useEffect(() => {
    if (formContent) {
      inputs.forEach((input) => {
        const inputKeyInValidInputsPattern = input.current
          ?.name as keyof typeof validInputsPattern;
        // * key = 'name' | 'company' | 'email' | 'message'

        const inputKey = input; // * follows no param reassignment rule.
        if (inputKey.current) {
          inputKey.current.value = formContent[inputKeyInValidInputsPattern];
          validateInput(
            inputKey,
            validInputsPattern[inputKeyInValidInputsPattern],
          );
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
      inputs.forEach((input) => {
        const inputElement = input;
        if (inputElement.current) {
          inputElement.current.classList.remove('show');
          inputElement.current.style.display = 'none';
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

    // ! this it is not very secure, since valid class can be added/changed manually to the inputs.
    const allValidInputs = inputs.every((input) => input.current?.classList.contains('valid'));
    // ! >>>>needs to be address ASAP<<<<. maybe with internal flags.

    if (allValidInputs) {
      submitForm();
    }
  };

  useEffect(() => {
    inputs.forEach((input) => {
      const inputName = input.current?.name;

      if (input.current?.classList.contains('invalid')) {
        input.current?.focus();
      }

      if (inputName) {
        const inputKeyInValidInputsPattern = inputName as keyof typeof validInputsPattern;
        // * key = 'name' | 'company' | 'email' | 'message'
        input.current?.addEventListener('keyup', () => {
          validateInput(
            input,
            validInputsPattern[inputKeyInValidInputsPattern],
          );
        });
      }
    });
  }, [inputs, validInputsPattern]);

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
