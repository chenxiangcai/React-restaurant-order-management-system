import styled from "styled-components";

export const ShopWrap = styled.div`
  .am-card {
    width: 92vw;
  }

  .dish-titles {
    font-size: 1.1rem;
  }

  .dish-prices {
    top: 2rem;
    font-size: 1rem;
  }

  .am-stepper-input {
    display: none;
  }

  .am-stepper-handler-wrap {
    position: absolute;
    width: 77%;
    bottom: .2rem;
  }

  .content {
    padding: 1rem;
    margin-top: -0.7rem;
    width: 100vw
  }

  .bottom {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 9rem;
    background-color: #fff;
    border-top-left-radius: .7rem;
    border-top-right-radius: .7rem;


    div:first-child {
      text-align: center;
      padding: .7rem 0;

      span {
        font-size: 1.5rem;
        color: #dabb91;
      }
    }

    .btn {
      margin: 0 1rem 0 1rem;
      background-color: #dabb91;
      color: white;
      border-radius: 3rem;
    }
  }
`
