import styled from "styled-components";

export const CateWrap = styled.div`
  /deep/ .ant-card-body {
    height: 100%;
  }
;

  display: flex;
  flex-wrap: wrap;
  cursor: pointer;

  .plus {
    font-size: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .card {
    width: 262px;
    height: 120px;
    margin-right: 20px;
  }

  .card:nth-child(4n) {
    margin-right: 0;
  }

  .card:nth-child(n+5) {
    margin-top: 20px;
  }
`
