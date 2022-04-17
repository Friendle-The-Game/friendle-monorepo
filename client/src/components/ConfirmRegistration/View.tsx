import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './confirmRegistration.scss';

const ConfirmRegistration = ({ actions, isConfirmed = false }:
  { actions: { confirmRegistration: (token: string) => void}, isConfirmed: boolean }) => {
  const location = useLocation()
  const token = useMemo(() => new URLSearchParams(location.search).get('token'), [location]);
  useEffect(() => {
    if (token) actions.confirmRegistration(token);
  }, [token, actions]);
  return (
    <div className="confirm-registration">
      {isConfirmed ? (<div>Success</div>) : (<div>Error</div>)}
    </div>
  );
};

export default ConfirmRegistration;
