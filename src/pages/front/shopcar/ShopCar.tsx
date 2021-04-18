import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import FoodDetail from "../../../components/FoodDetail";
import { Button, Icon, NavBar } from "antd-mobile";
import { ShopWrap } from "./ShopWrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ADD2CAR, RESETCAR } from "../home/actions";
import { getStore } from "../../../utils/storage";

interface OwnProps {
  [prop: string]: any

  add2car(val: object): () => void,

  resetcar(val: any): () => void

}

type Props = OwnProps;

const mapStateToProps = (state: any) => ({
  shopcar: state.home.shopcar || []
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
    if (Object.keys(shop_car).length === 0) return history.replace('/home')
    props.resetcar(shop_car)
    setOrder(shop_car)
  }, [props.shopcar.length])

  console.log(order)

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
            <Button className='btn' onClick={() => history.push('/home/orderdetail')}>选好了</Button>
          </div>
        </div>
      </ShopWrap>
  );
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ShopCar)
