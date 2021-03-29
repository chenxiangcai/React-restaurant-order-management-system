import styled from "styled-components";

export const OrderWrap = styled.div`

  .content {
    padding: 0 1rem;
    border-radius: 300px;
  }

  .title {
    text-align: center;
    margin-top: .3rem;
    color: #aaa;
  }

  .detail {
    margin-top: .7rem;
  }

  .am-list-extra {
    color: #212121 !important;
  }

  .ccc {
    font-size: .9rem;
    color: #888
  }

  .btn {
    margin: 0 1rem 0 1rem;
    background-color: #dabb91;
    color: white;
    border-radius: 3rem;
  }

  .morebtn {
    border-radius: 3rem;
    width: 6rem;
    background-color: #202831;
    float: right;
    color: #eee
  }

  .bottom {
    margin-top: .8rem;
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
