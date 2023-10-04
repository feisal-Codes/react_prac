import { useEffect, useRef } from "react";
const useClickOutSide = (callBack) => {
  const ref = useRef();
  useEffect(() => {
    console.log(ref);
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callBack();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return ref;
};

export default useClickOutSide;
