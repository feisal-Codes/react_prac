import React from "react";

const WrapperComponent = (WrappedComponent) => {
  return (props) => {
    return <WrappedComponent name="feisal" {...props} />;
  };
};

const WrappedComponent = ({ name }) => {
  return (
    <>
      <div>hello {name}</div>
    </>
  );
};

const HocExample = WrapperComponent(WrappedComponent);

export default HocExample;
