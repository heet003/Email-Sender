import React from "react";
import "./Input.css";

function Input(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      {props.textarea ? (
        <textarea
          id={props.id}
          placeholder={props.placeholder}
          name={props.name}
          onChange={props.onChange}
        ></textarea>
      ) : (
        <input
          type={props.type}
          id={props.id}
          placeholder={props.placeholder}
          name={props.name}
          onChange={props.onChange}
        ></input>
      )}
    </div>
  );
}

export default Input;
