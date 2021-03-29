import styled from "styled-components";

export const PreWrap = styled.div`
  height: 100vh;
  width: 100vw;
  background: #fff;

  .title {
    font-size: 1rem;
    margin-top: -2rem;
    font-weight: 600;
  }

  .num {
    margin-top: 2rem;
    margin-left: 1.7rem;
  }

  .am-list-header {
    color: black;
    font-size: 1.1rem;
    margin-left: 1.7rem;
  }

  .am-list-body {
    border-bottom: none;
    padding: 0 2.8rem;
    background-color: #fff;
  }

  .am-list-item.am-textarea-item {
    border-bottom: none;
    padding: 0 1rem;
    margin: .6rem 0 1rem 0;
    background-color: #f9fafc;
  }

  .am-list-body::before {
    display: none !important;
  }

  .am-list-body::after {
    display: none !important;
  }


  .btn {
    margin: 3rem 3rem 0 3rem;
    background-color: #dabb91;
    color: white;
    border-radius: 3rem;
  }

  .aa {
    font-size: 1.1rem;
    margin-left: 2.7rem;
  }
`
