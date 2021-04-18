import React, { FunctionComponent, useEffect } from 'react';
import { Button, Icon, List, NavBar } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { OrderWrap } from "./OrderWrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const Item = List.Item;
const Brief = Item.Brief;

interface OwnProps {
  [prop: string]: any
}

type Props = OwnProps;
const mapStateToProps = (state: any) => ({
  shopcar: state.home.shopcar || []
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  // GetHomeDish(value: object) {
  //   dispatch({
  //     type: GETHDISH,
  //     url: HOMEDOSH_URL,
  //     data: value
  //   })
  // },
  // add2car(val: object) {
  //   dispatch({
  //     type: ADD2CAR,
  //     data: val
  //   })
  // },
  // resetcar(val: object) {
  //   dispatch({
  //     type: RESETCAR,
  //     data: val
  //   })
  // }
})

const OrderDetail: FunctionComponent<Props> = (props) => {

  const car = props.shopcar

  //原价
  const prePrice = car.reduce((pre: any, cur: any) => pre + cur.num * cur.price, 0)

  //优惠金额
  const youhuiPrice = 0

  //合计
  const total = prePrice - youhuiPrice

  useEffect(() => {
    const car = props.shopcar
  }, [])

  const history = useHistory()
  return (
      <OrderWrap>
        <NavBar
            mode="light"
            icon={<Icon type="left"/>}
            onLeftClick={() => history.goBack()}
            rightContent={[
              <Icon key="1" type="ellipsis"/>,
            ]}
        >订单详情
        </NavBar>
        <div className='content'>
          <div className='title'>
            <div>您的订单已提交</div>
            <div>厨房已经在制作啦</div>
          </div>
          <div className='detail'>
            <List className="my-list">
              <Item extra={
                <Button size={"small"} onClick={() => history.push('/home')} className='morebtn'>继续点餐</Button>}>
                桌台号：1
              </Item>
              {
                car && car.map((val: any) => {
                  return (
                      <Item multipleLine extra={
                        <span>¥ {val.num * val.price}</span>
                      }>
                        <span style={{ fontSize: '.9rem', color: '#888' }}>{val.name}</span>
                        <Brief>x {val.num}</Brief>
                      </Item>
                  )
                })
              }
            </List>
          </div>
          <div style={{ marginTop: '.3rem' }}>
            <List className="my-list">
              <Item multipleLine>
                <span style={{ float: "right", color: '#888' }}>¥ {prePrice}</span>
                <span className='ccc'>原金额</span>
              </Item>
              <Item multipleLine extra="¥ 77">
                <span className='ccc'>优惠金额</span>
                <div style={{ fontSize: '.9rem', color: '#dabb91' }}>宗师会员: <span>7折</span></div>
              </Item>
              <Item multipleLine>
                <span style={{ float: "right", color: '#D5BC96', fontSize: '1.3rem' }}>¥ {total}</span>
                合计
              </Item>
            </List>
          </div>
          <div>
            <List className="my-list">
              <Item style={{ marginTop: '.3rem' }}>用餐信息</Item>
              <Item multipleLine>
                <span className='ccc'>用餐人数</span>
                <span className='ccc' style={{ float: "right" }}>3人</span>
              </Item>
              <Item multipleLine>
                <span className='ccc'>桌台号</span>
                <span className='ccc' style={{ float: "right" }}>128</span>
              </Item>
            </List>
          </div>
        </div>
        <div className='bottom'>
          <div style={{ color: '#888' }}>合计：<span className='price'>¥ {total}</span>
            <div style={{ display: "inline-block", marginLeft: '.5rem', color: '#888' }}> (已优惠¥{youhuiPrice})</div>
          </div>
          <div>
            <Button className='btn' onClick={() => {
            }}>去付款</Button>
          </div>
        </div>
      </OrderWrap>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
