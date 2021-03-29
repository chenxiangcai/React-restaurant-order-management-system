import styled from "styled-components";

export const DashWrap = styled.div`

  .content, .contents {
    border-bottom: 1px solid #eee;
  }

  .contents {
    /deep/ .ant-statistic-content {
      position: absolute;
    }
  }

  .money {
    margin-bottom: 16px;
    font-size: 30px;
    color: rgba(0, 0, 0, .85)
  }

  .num {
    margin: 6px 0 0 0;
    display: flex
  }

  .num /deep/ .ant-statistic-title {
    color: rgba(0, 0, 0, .85);
    margin-top: 10px;
  }

  .daymoney /deep/ .ant-statistic-title {
    color: rgba(0, 0, 0, .85);
  }

  .rightdot {
    position: absolute;
    top: 8px;
    right: 30px;
    transform: translate(44%, 50%);
    color: rgba(0, 0, 0, .45);
  }

  .card-bottom {
    display: block;
    margin-top: 10px;
  }

  /deep/ .a > .ant-statistic-content {
    position: absolute;
  }

  /deep/ .ant-table table {
    height: 407px;
  }
`

