import React, { useRef, useEffect, useMemo } from 'react';

import '../../styles/UI/ContactForm.scss';

import config from '../../config.ts';

const ContactForm: React.FC = () => {
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
    } catch (error) {
      console.error(error);
      // TODO: Add error handling
    }
  };

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault();

    const allValidInputs = inputs.every((input) => input.current?.classList.contains('valid'));

    if (allValidInputs) {
      submitForm();
      $form.current?.reset();
    }
  };

  useEffect(() => {
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

    inputs.forEach((input) => {
      const inputName = input.current?.name;

      if (input.current?.classList.contains('invalid')) {
        input.current?.focus();
      }

      if (inputName) {
        const key = inputName as keyof typeof validInputsPattern;
        // * key = 'name' | 'company' | 'email' | 'message'
        input.current?.addEventListener('keyup', () => {
          validateInput(input, validInputsPattern[key]);
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
        Send
      </button>
    </form>
  );
};

export default ContactForm;
