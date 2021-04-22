import React, { useRef } from "react";

const Test = () => {
  function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
      // `current` points to the mounted text input element
      inputEl.current.focus();
      inputEl.current.style.backgroundColor = "red";
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </>
    );
  }
  return (
    <div>
      <h1> test </h1>
      <TextInputWithFocusButton />
    </div>
  );
};

export default Test;
