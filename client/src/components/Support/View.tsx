import React, { FormEvent, useCallback, useState } from 'react';
import { Adsense } from '@ctrl/react-adsense';
import TextareaAutosize from 'react-textarea-autosize';
import './support.scss';

const Support = ({ actions }:
  { actions: { sendFeedback: (email: string, subject: string, message: string) => void}, errors: Record<string, any> | null }) => {
  const [formBody, setFormBody] = useState<{ email: string, subject: string, message: string }>({
    email: '', subject: '', message: '',
  });
  const setEmail = useCallback(({ target: { value } }: { target: HTMLInputElement }) => {
    setFormBody(formBody => ({ ...formBody, email: value }));
  }, [setFormBody]);
  const setSubject = useCallback(({ target: { value } }: { target: HTMLInputElement }) => {
    setFormBody(formBody => ({ ...formBody, subject: value }));
  }, [setFormBody]);
  const setMessage = useCallback(({ target: { value } }: { target: HTMLTextAreaElement }) => {
    setFormBody(formBody => ({ ...formBody, message: value }));
  }, [setFormBody]);
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const { email, subject, message } = formBody;
    actions.sendFeedback(email, subject, message);
  }, [formBody, actions]);
  return (
    <div className="with-ads">
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input name="email" type="text" value={formBody.email} onChange={setEmail} />
          <label htmlFor="subject">Subject</label>
          <input name="subject" type="text" value={formBody.subject} onChange={setSubject} />
          <label htmlFor="message">Message</label>
          <TextareaAutosize maxRows={10} name="message" value={formBody.message} onChange={setMessage} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Adsense
        client="ca-pub-6590154931831231"
        slot="8360483357"
        style={{ height: '20vh' }}
        format=""
      />
    </div>
  );
};

export default Support;
