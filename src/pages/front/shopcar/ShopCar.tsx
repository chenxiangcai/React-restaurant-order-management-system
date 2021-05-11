import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import FoodDetail from "../../../components/FoodDetail";
import { Button, Icon, NavBar, Toast } from "antd-mobile";
import { ShopWrap } from "./ShopWrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ADD2CAR, RESETCAR } from "../home/actions";
import { getStore, setStore } from "../../../utils/storage";
import { SERVER_URL } from "../../../common/api";
import { message } from "antd";
import axios from "axios";

interface OwnProps {
  [prop: string]: any

  add2car(val: object): () => void,

  resetcar(val: any): () => void,

  addOrder(value: []): void

  updateOrder(value: object): void

  retSetShopCarState(): () => void,
}

type Props = OwnProps;

const mapStateToProps = (state: any) => ({
  shopcar: state.home.shopcar || [],
  handle: state.shopCar.handle,
  notEnough: state.shopCar.notEnough,
  handleEdit: state.shopCar.handleEdit,
  notE: state.shopCar.notE
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  add2car(val: object) {
    dispatch({
      type: ADD2CAR,
      data: val
    })
  },
  resetcar(val: object) {
    dispatch({
      type: RESETCAR,
      data: val
    })
  }
})


const ShopCar: FunctionComponent<Props> = (props) => {

  const [order, setOrder] = useState([])

  //页面刷新重新赋值
  useEffect(() => {
    const shop_car = JSON.parse(getStore('shopcar'))
    if (shop_car !== '' && Object.keys(shop_car).length === 0) return history.replace('/home')
    props.resetcar(shop_car)
    setOrder(shop_car)
  }, [props.shopcar.length])

  //订单提交
  async function handleOk() {
    //判断是否继续点餐
    const sc = JSON.parse(getStore('shopcar'))
    const more = JSON.parse(getStore('more'))
    const more2 = getStore('more')
    if (more2) {
      Toast.loading('订单更新中···', 1);
      more.forEach((val: any, inx: number) => {
        sc.forEach((value: any, index: number) => {
          if (val._id === value._id) {
            value.num += val.num
            more.splice(inx, 1)
          }
        })
      })
      const value = {
        orderid: getStore('orderid'),
        orderdetail: [...more, ...sc],
        addOrder: [...sc],
        tableID: Number(getStore('tableID'))
      }
      const s = await axios.put(`${SERVER_URL}/cus/order/edit`, { ...value })
      const { notE } = s.data
      if (s.data.status === 400) {
        notE.map((val: string) => {
          message.info(`${val}库存不足，请重新点餐`)
        })
      } else {
        history.push('/home/orderdetail/edit')
      }
      // props.updateOrder(value)
    } else {
      Toast.loading('订单提交中···', 1);
      const order = props.shopcar
      const val = {
        tableID: Number(getStore('tableID')),
        orderdetail: order.flat(),
        person: Number(getStore('peoplenum'))
      }
      const s = await axios.post(`${SERVER_URL}/cus/order/add`, { ...val })
      const { notEnough } = s.data
      if (s.data.status === 400) {
        notEnough.map((val: string) => {
          message.info(`${val}库存不足，请重新点餐`)
        })
      } else {
        console.log(s.data.order._id)
        setStore('orderid', s.data.order._id)
        history.push('/home/orderdetail/add')
      }
    }
  }

  const history = useHistory()
  // @ts-ignore
  const sum = order.reduce((previousValue, currentValue) => previousValue + currentValue.price * currentValue.num, 0)
  return (
      <ShopWrap>
        <NavBar
            mode="light"
            icon={<Icon type="left"/>}
            onLeftClick={() => history.goBack()}
            rightContent={[
              <Icon key="1" type="ellipsis"/>,
            ]}
        >购物车
        </NavBar>
        <div className='content'>
          <FoodDetail add22car={props}/>
        </div>
        <div className='bottom'>
          <div>合计：<span className='price'>¥ {sum}</span></div>
          <div>
            <Button className='btn' onClick={() => handleOk()}>选好了</Button>
          </div>
        </div>
      </ShopWrap>
  );
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ShopCar)
