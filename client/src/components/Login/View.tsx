import React, { FormEvent, useCallback, useMemo, useState } from 'react';
import { Adsense } from '@ctrl/react-adsense';
import './login.scss';

const Login = ({ actions, errors }:
  { actions: { login: (username: string, password: string) => void}, errors: Record<string, any> | null }) => {
  const [credentials, setCredentials] = useState<{ username: string, password: string }>({ username: '', password: '' });
  const setPassword = useCallback(({ target: { value } }: { target: HTMLInputElement }) => {
    setCredentials(credentials => ({ ...credentials, password: value }));
  }, [setCredentials]);
  const setUsername = useCallback(({ target: { value } }: { target: HTMLInputElement }) => {
    setCredentials(credentials => ({ ...credentials, username: value }));
  }, [setCredentials]);
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const { username, password } = credentials;
    actions.login(username, password);
  }, [credentials, actions]);
  const { username: usernameError, password: passwordError, ...otherErrors } = errors || {};
  const displayErrors = useMemo(() => Object.values(otherErrors).map(error => <div>{error}</div>), [otherErrors]);
  return (
    <div className="with-ads">
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          {displayErrors}
          <label htmlFor="username">Username</label>
          <input name="username" type="text" value={credentials.username} onChange={setUsername} />
          {usernameError && <div>{usernameError}</div>}
          <label htmlFor="password">Password</label>
          <input name="password" type="password" value={credentials.password} onChange={setPassword} />
          {passwordError && <div>{passwordError}</div>}
          <button type="submit">Sign in</button>
        </form>
      </div>
      <Adsense
        client="ca-pub-6590154931831231"
        slot="8360483357"
        style={{ display: 'block' }}
        format="fluid"
      />
    </div>
  );
};

export default Login;
