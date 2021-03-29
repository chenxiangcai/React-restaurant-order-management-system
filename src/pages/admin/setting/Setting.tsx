import React, { FunctionComponent, useEffect } from 'react';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { QR_URL } from "../../../common/api";
import { GETQRCODE } from "./action";

interface OwnProps {
  [prop: string]: any

  getQR(): void
}

type Props = OwnProps;

const mapStateToProps = (state: any) => ({
  url: state.setting.url
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getQR() {
    dispatch({
      type: GETQRCODE,
      url: QR_URL,
    })
  }
})

const Setting: FunctionComponent<Props> = (props) => {

  //获取二维码
  useEffect(() => {
    props.getQR()
  }, [])

  const s = props.url
  console.log(props)

  return (
      <div>
        待开发
        <img width={300} height={300} src={s} alt='33'/>
      </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
