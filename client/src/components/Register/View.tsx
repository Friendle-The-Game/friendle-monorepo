import React, { FormEvent, useCallback, useState } from 'react';
import { Adsense } from '@ctrl/react-adsense';
import './register.scss';

const Register = ({ actions }:
  { actions: { register: (username: string, password: string, email: string, confirmPassword: string) => void} }) => {
  const [formData, setFormData] = useState<
    { username: string, password: string, email: string, confirmPassword: string }
  >({ username: '', password: '', email: '', confirmPassword: '' });
  const setField = useCallback((field: string) => ({ target: { value } }: { target: HTMLInputElement }) => {
    setFormData(formData => ({ ...formData, [field]: value }));
  }, [setFormData]);
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const { username, password, email, confirmPassword } = formData;
    actions.register(username, password, email, confirmPassword);
  }, [formData, actions]);
  return (
    <div className="with-ads">
      <div className="register">
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input name="email" type="email" value={formData.email} onChange={setField('email')} />
          <label htmlFor="username">Username</label>
          <input name="username" type="text" value={formData.username} onChange={setField('username')} />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" value={formData.password} onChange={setField('password')} />
          <label htmlFor="confirm-password">Confirm password</label>
          <input name="confirm-password" type="password" value={formData.confirmPassword} onChange={setField('confirmPassword')} />
          <button type="submit">Sign up</button>
        </form>
      </div>
      <Adsense
        client="ca-pub-7640562161899788"
        slot="7259870550"
        style={{ display: 'block' }}
        layout="in-article"
        format="fluid"
      />
    </div>
  );
};

export default Register;
