import React, { FunctionComponent, useEffect, useState } from 'react';
import { Icon, NavBar, Popover, Result } from "antd-mobile";
import { getStore } from "../../utils/storage";
import { useHistory } from "react-router-dom";

const Item = Popover.Item;

interface OwnProps {
}

type Props = OwnProps;

const style: any = {
  color: '#888',
  fontSize: 14,
  padding: '30px 0 18px 0',
  marginLeft: 15
}


const Pay: FunctionComponent<Props> = (props) => {

  const [total, setTotal] = useState(0)
  const [pre, setPre] = useState(0)

  const history = useHistory()

  useEffect(() => {
    setTotal(getStore('total'))
    setPre(getStore('pre'))
  }, [])

  return (
      <div>
        <NavBar
            mode="light"
            rightContent={[
              <Popover mask
                       visible={false}
                       overlay={[
                         (<Item style={{ marginRight: 0 }} key="0" data-seed="logId">订单详情</Item>),
                       ]}
                       onSelect={(node: any, index?: number) => {
                         if (index === 0) {
                           history.push('/home/orderdetail/readonly')
                         }
                       }}
              >
                <div style={{
                  height: '100%',
                  padding: '0 15px',
                  marginRight: '-7px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                >
                  <Icon type="ellipsis"/>
                </div>
              </Popover>]}
        >支付详情
        </NavBar>
        <div className="sub-title" style={style}>支付结果</div>
        <Result
            img={<img style={{
              width: 60,
              height: 80
            }} src={'https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg'}
                      className="spe am-icon am-icon-md" alt=""/>}
            title="支付成功"
            message={<div>{total}元 <del>{pre}元</del></div>}
        />
      </div>
  );
}

export default Pay;
