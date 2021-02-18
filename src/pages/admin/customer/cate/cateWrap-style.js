import styled from "styled-components";

export const CateWrap = styled.div`
  /deep/ .ant-card-body {
    height: 100%;
  };
  
  cursor: pointer;

  .plus {
    font-size: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .card {
    width: 100%;
    height: 120px;
  }
`
