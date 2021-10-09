import * as React from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { wrap, increment, decrement, input } from "../styles/partials/components/_numeric-input.scss";

const NumericInput = ({ onIncrement, onDecrement, className, disabled, ...props }) => {
  return (
    <div className={`${className} numeric-input`}>
      <input disabled={disabled} type="numeric" {...props} />
      <div className="buttons">
        <button disabled={disabled} className="increment" aria-label="Increment" onClick={onIncrement}>
          <span>+</span>
          <MdArrowDropUp />
        </button>
        <button disabled={disabled} className='decrement' aria-label="Decrement" onClick={onDecrement}>
          <span>-</span>
          <MdArrowDropDown />
        </button>
      </div>
    </div>
  );
};

export default NumericInput;
