import React from "react";
import styled from "styled-components";
const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <Wrapper className="form-row">
      <label htmlFor={name} className="form-label text-left">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select capitalize"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
};

export default FormRowSelect;
const Wrapper = styled.div`
  /* border: 2px solid red; */
  select {
    max-width: 100%;
    width: 100%;
    background-color: var(---primary-300);
    color: #fff;
    border-radius: 10px;
    height: 3rem;
    border-radius: 0.5rem;
  }
  option {
    max-width: 70%;
    width: 80%;
    background-color: inherit;
  }
`;
