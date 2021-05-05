//菜品列表展示模块 （无总价模块）
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Card } from "antd-mobile";
import img from '../assets/images/dish1.jpeg'
import '../style/stepper.css'
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { SERVER_URL } from "../common/api";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ADD2CAR, LESS2CAR } from "../pages/front/home/actions";

interface OwnProps {
  [prop: string]: any,

  dish?: any,

  add2car(val: any): () => void,

  less2car(val: any): () => void

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
  less2car(val: object) {
    dispatch({
      type: LESS2CAR,
      data: val
    })
  }
})

const CateFoodDetail: FunctionComponent<Props> = (props) => {

  const [orders, setOrder] = useState([])
  const [dishes, setDishes] = useState([])
  const [num, SetNum] = useState([0])

  useEffect(() => {
    if (props.dish) setDishes(JSON.parse(JSON.stringify(props.dish)))
    setOrder(JSON.parse(JSON.stringify(props.shopcar)))
  }, [props])


  const plus = (order: object) => {
    // @ts-ignore
    order.url = order.picture
    props.add2car(order)
  }

  useEffect(() => {
    console.log('dishes', dishes)
    console.log(orders)

    // @ts-ignore
    const num = dishes.map((value: any, index: number) => value.num = orders.filter((val: any) => val._id === value._id)[0]?.num ?? 0)
    SetNum(num)
  }, [dishes])

  const less = (order: object) => {
    props.less2car(order)
  }

  return (
      <div style={{ width: '66vw', marginTop: '.7rem' }}>
        {
          dishes && dishes.map((order: any, index: number) => {
            return (
                <div key={index}>
                  {
                    orders && <Card key={index} style={{ marginBottom: 10 }}>
                      <Card.Body>
                        {
                          order.picture === '' ?
                              <img src={img} alt="" className='img' style={{ objectFit: "cover", top: 0, left: 0 }}/> :
                              <img src={`${SERVER_URL}${order.picture}`} className='img'
                                   style={{ objectFit: "cover", top: 0, left: 0 }} alt=''/>
                        }
                        <div style={{ display: "flex", position: "relative" }}>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span className='dish-titles'>{order.name}</span>
                            <span className='dish-prices'>¥ {order.price}</span>
                          </div>
                        </div>
                        <div className='numutil'>
                          <Button shape="circle" size={"small"} onClick={() => {
                            less(order)
                          }} icon={<MinusOutlined/>}/>
                          <span style={{ margin: '0 .5rem' }}>{num[index]}</span>
                          <Button shape="circle" size={"small"} onClick={() => {
                            plus(order)
                          }}
                                  style={{ backgroundColor: 'rgb(35, 45, 57)', color: 'white' }}
                                  icon={<PlusOutlined/>}/>
                        </div>
                      </Card.Body>
                    </Card>
                  }
                </div>
            )
          })
        }
      </div>
  );
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CateFoodDetail)
