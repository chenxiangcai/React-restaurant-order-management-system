import styled from "styled-components";

export const Wrap = styled.div`
  .div {
    position: relative;
  }

  .input {
    width: 6.5em;
    color: black;
    font-size: inherit;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid transparent;
  }

  .input:focus {
    outline: none;
  }

  .input::placeholder {
    color: hsla(0, 0%, 100%, 0.6);
  }

  .span {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #3742fa;
    transform-origin: bottom right;
    transform: scaleX(0);
    transition: transform 0.5s ease;
  }

  .input:focus ~ span {
    transform-origin: bottom left;
    transform: scaleX(1);
  }
`
