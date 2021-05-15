import styled from "styled-components";
import bgImg from '../../assets/images/bg.png'

export const LoginWrap = styled.div`
  background: url(${bgImg}) center center / cover;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;

  Form {
    margin-right: 320px;
    padding: 20px;
    background: #fff;
    width: 350px;
    min-height: 380px;
    border: 1px solid #fff;
    box-shadow: 0 0 10px rgb(250 250 250 / 40%);

    input {
      height: 30px;
      margin-left: 5px;
    }

    .logo {
      width: 50%;
      height: 50%;
      margin-left: 50%;
      margin-top: -30px;
      margin-bottom: -16px;
      transform: translateX(-50%);
    }

    .logo-left {
      width: 200px;
      position: absolute;
      left: -20px;
      top: -20px;
    }

    button {
      width: 100%;
      margin-top: 36px;
      font-size: 14px
    }

    .login-form-title {
      cursor: auto;
      letter-spacing: -1px;
      color: #2C81F2;
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .login-form-login {
      margin: 10px 0 40px 0;
      font-size: 12px;
      width: 100%;
      display: inline-block;
      position: relative;

      span {
        position: absolute;
        right: 0;
        top: 16px;
      }
    }
  }

  .svg {
    display: inline-block;
    cursor: pointer;
    width: 150px
  }

  .r {
    display: flex;

    div {
      margin-top: 20px;
      margin-left: 20px;
      position: relative;

      input {
        width: 130px;
        color: black;
        font-size: inherit;
        font-family: inherit;
        background-color: transparent;
        border: 1px solid transparent;
        //border-bottom-color: #448EF7;
      }

      input:focus {
        outline: none;
      }

      input::placeholder {
        color: #ccc;
      }

      span {
        position: absolute;
        bottom: 5px;
        left: 5px;
        right: 0;
        height: 1px;
        background-color: #448EF7;
        transform-origin: bottom right;
        transform: scaleX(0);
        transition: transform 0.5s ease;
      }

      input:focus ~ span {
        transform-origin: bottom left;
        transform: scaleX(1);
      }

    }

  }
`

