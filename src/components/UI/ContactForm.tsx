import React, { useRef, useEffect, useMemo } from 'react';

import config from '../../config.ts';

const ContactForm: React.FC = () => {
  const actionURL = config.formActionURL;

  const $form = useRef<HTMLFormElement | null>(null);
  const $nameInputRef = useRef<HTMLInputElement | null>(null);
  const $companyInputRef = useRef<HTMLInputElement | null>(null);
  const $emailInputRef = useRef<HTMLInputElement | null>(null);
  const $messageInputRef = useRef<HTMLTextAreaElement | null>(null);

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
      } else {
        input.current?.classList.add('valid');
        input.current?.classList.remove('invalid');
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
    <form className="contact-form" ref={$form} onSubmit={handleSubmission}>
      <div className="contact-form__group">
        <input
          type="text"
          ref={$nameInputRef}
          name="name"
          minLength={2}
          required
        />
      </div>
      <div className="contact-form__group">
        <input
          type="text"
          ref={$companyInputRef}
          name="company"
          minLength={3}
          required
        />
      </div>
      <div className="contact-form__group">
        <input type="email" ref={$emailInputRef} name="email" required />
      </div>
      <div className="contact-form__group">
        <textarea
          ref={$messageInputRef}
          name="message"
          minLength={20}
          rows={5}
          cols={20}
          required
        />
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
