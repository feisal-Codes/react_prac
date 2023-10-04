import React, { useState, useEffect } from "react";

function WithAuth(WrappedComponent) {
  return (props) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    useEffect(() => {
      setAuthenticated(false);
    }, []);

    if (!isAuthenticated) {
      return <div>Access denied</div>;
    }

    return <WrappedComponent {...props} />;
  };
}

export default WithAuth;

const SecureComponent = () => <div>classified</div>;

export const Auth = WithAuth(SecureComponent);
