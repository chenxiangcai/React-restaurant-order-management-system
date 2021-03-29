import styled from "styled-components";

export const HomeWrap = styled.div`
  .flex-container {
    position: relative;

    .inline {
      width: 80px !important;
      margin: 9px 9px 9px 0;
    }

    .small {
      height: 20px !important;
      line-height: 20px !important;
    }

    .sub-title {
      color: #888;
      font-size: 14px;
      padding: 30px 0 18px 0;
    }

    .placeholder {
      background-color: #ebebef;
      color: #bbb;
      text-align: center;
      height: 30px;
      line-height: 30px;
      width: 100%;
    }
  }

  .top {
    .top-title {
      font-size: 1rem;
      font-weight: 600;
    }
  }

  .top-block {
    height: 10vh;
    padding: .5rem 1.2rem;
    background-color: #fff;
    border-bottom-right-radius: .7rem;
    border-bottom-left-radius: .7em;

    span {
      display: block;

      &:first-child {
        color: #aaa;
      }

      &:nth-child(2) {
        font-weight: 600;
        font-size: 1.1rem;
      }
    }
  }

  .search-item {
    position: absolute;
    right: 1rem;
    top: 50%;
    width: 8rem;
    transform: translateY(-50%);

    .search-input {
      border-radius: 1rem;
    }
  }


  .hot-dish {
    // height: 53vh; 

    height: 62vh;

    img {
      height: 70%;
      width: 80%;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }

    .dish-title {
      display: block;
      margin-top: -6vh;
      text-align: center
    }

    .price-plus {
      position: relative;

      .price {
        background-color: #DCB184;
        color: #fff;
        display: block;
        width: 9rem;
        margin: -1rem auto;
        height: 2.5rem;
        border-radius: 3rem;
        font-size: 1rem;
        text-align: center;
        line-height: 2.5rem;
        position: relative;

        .pricedetail {
          position: absolute;
          top: 0;
          left: 27%;
        }
      }

      .plus {
        position: absolute;
        font-size: 1.1rem;
        right: 35%;
        color: #fff;
        top: 48%;
        transform: translate(-30%, -50%);
      }
    }

    //background-color: pink;
  }

  .more {
    height: 66vh;
    width: 100%;
    text-align: center;
    background-color: #fff;
    border-top-right-radius: .7rem;
    border-top-left-radius: .7em;

    span {
      display: block;
    }
  }

  .shop-car {
    position: fixed;
    right: 1.4rem;
    bottom: 7rem;
    z-index: 99999;
  }


  .my-list {
    width: 5rem;
    height: 100vh;
    background-color: #fff;
    left: 0;
    text-align: center;
  }

  .am-search-cancel, .am-search-cancel-show, .am-search-cancel-anim {
    display: none;
  }

  .am-tabs-default-bar, .am-tabs-default-bar-animated, .am-tabs-default-bar-top {
    background-color: #F5F5F9 !important;
  }

  .ant-avatar, .ant-avatar-icon {
    font-size: 1.5rem;
    background: #fff !important;
    color: #212121;
  }

  .am-list-body::before {
    background-color: #f5f5f9 !important;
  }

  .am-list-body::after {
    background-color: #fff !important;
  }

  .am-tabs-default-bar-tab::after {
    background-color: #f5f5f9 !important;
  }

  .am-tabs-default-bar-tab::before {
    background-color: #f5f5f9 !important;
  }

  .am-list-line::after {
    background-color: #fff !important;
  }

  .am-list-line::before {
    background-color: #fff !important;
  }

  .ant-tabs > .ant-tabs-nav, .ant-tabs > div > .ant-tabs-nav {
    background-color: #fff;
    height: 100vh;
  }

  .ant-tabs-tab-active {
    background-color: #f3f4f3;
    color: #212121;
  }
`

