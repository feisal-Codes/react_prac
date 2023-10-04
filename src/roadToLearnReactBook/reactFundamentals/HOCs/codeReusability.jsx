/**
 *
 * HOCs are neccessary to avoid code reuse , and instead share code between components
 * eg, we illistrate logging the component in the example below
 *
 */

import { useEffect } from "react";

const WithLogger = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      console.log(
        `Component ${WrappedComponent.name || "Anonymous"} has rendered.`
      );
    }, []);

    return <WrappedComponent {...props} />;
  };
};

const ComponentA = () => <div>this is A</div>;
const ComponentB = () => <div>this is B</div>;
const ComponentC = () => <div>this is C</div>;
const ComponentD = () => <div>this is D</div>;

let arr = [ComponentA, ComponentB, ComponentC, ComponentD];

export default WithLogger;

// one function WithLogger is applied to another Components to create
// a new function , this avoid intermediary components

export const EnhancedA = WithLogger(ComponentA);
export const EnhancedB = WithLogger(ComponentB);
export const EnhancedC = WithLogger(ComponentC);
export const EnhancedD = WithLogger(ComponentD);
