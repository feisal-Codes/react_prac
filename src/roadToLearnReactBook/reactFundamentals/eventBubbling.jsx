/** when an event is fired by an element , it first runs the event handlers of that
 * element and also event handlers of the parent elements for the same event all the way to the document
 * we can stop events from bubbling, or propagating to the parent elemnt by calling event.stopPropagation
 */

import { useEffect } from "react";

const EventBubbling = () => {
  useEffect(() => {
    const handleDocumentClick = (e) => {
      alert(e.currentTarget);
    };
    document.addEventListener("click", handleDocumentClick);

    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleButtonClick = (e) => {
    alert(e.target);
    e.stopPropagation();
  };
  const handleDivClick = (e) => {
    alert(e.currentTarget);
  };
  return (
    <div>
      <div
        style={{ border: "solid 2px black", padding: "20px" }}
        onClick={handleDivClick}
      >
        <button style={{}} onClick={handleButtonClick}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default EventBubbling;
