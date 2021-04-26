import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Button, Icon, List, NavBar, Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { OrderWrap } from "./OrderWrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getStore, setStore } from "../../../utils/storage";
import { Input, Switch } from "antd";
import { ISCUS } from "./action";
import { CUSORDEREDIT_URL, ISCUS_URL } from "../../../common/api";
import { CUSOREDEREDIT } from "../shopcar/actions";

const Item = List.Item;
const Brief = Item.Brief;

interface OwnProps {
  [prop: string]: any

  isCus(value: number): void

  updateOrder(value: object, receivable: number, paid: number): void
}

type Props = OwnProps;
const mapStateToProps = (state: any) => ({
  shopcar: state.home.shopcar || [],
  iscus: state.orderDetail.iscus,
  cusInfo: state.orderDetail.cusInfo
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  isCus(value: number) {
    dispatch({
      type: ISCUS,
      url: ISCUS_URL,
      data: value
    })
  },
  updateOrder(val: object, receivable: number, paid: number) {
    const cusinfo: any = val
    console.log('cusINfo', cusinfo)
    const value = {
      status: 1,
      orderid: getStore('orderid'),
      level: cusinfo?.cus?.level?._id ?? '',
      cus: cusinfo?.cus?._id ?? '',
      receivable,
      paid
    }
    dispatch({
      type: CUSOREDEREDIT,
      data: value,
      url: CUSORDEREDIT_URL
    })
  },
})


const OrderDetail: FunctionComponent<Props> = (props) => {

  const history = useHistory()
  const peoplenum = getStore('peoplenum')
  const tableID = getStore('tableID')
  const [numinput, setnuminput] = useState('none')

  const [isCus, setIsCus] = useState(false)

  const [isReadOnly, setIsReadOnly] = useState(false)

  //判断页面跳转来源
  useEffect(() => {
    console.log(history.location.pathname.includes('readonly'))
    if (history.location.pathname.includes('readonly')) setIsReadOnly(true)
    else setIsReadOnly(false)
  }, [])

  const inputRef = useRef(null);


  const [prePrice, setprice] = useState(0)
  const [youhuiPrice, setyouhuiPrice] = useState(0)
  const [total, settotal] = useState(0)


  const sc = JSON.parse(getStore('shopcar'))
  const mc = JSON.parse(getStore('more')) ?? []

  mc.forEach((val: any, inx: number) => {
    sc.forEach((value: any, index: number) => {
      if (val._id === value._id) {
        value.num += val.num
        mc.splice(inx, 1)
      }
    })
  })

  const car = [...sc, ...mc]
  const iscus = props.iscus

  const cusInfo = props.cusInfo.cus


  //继续点餐
  function continueOrder(history: any) {
    //存储已点信息
    setStore('more', car)
    //置空购物车
    setStore('shopcar', [])
    history.push('/home')
  }

  //手机号输入框监听
  function onChangePhoneNumber(val: any) {
    const value = val.target.value
    if (value.length === 11) props.isCus(value)
  }

  useEffect(() => {
    const storecus = getStore('iscus')
    if (iscus > 10) {
      if (storecus != iscus) Toast.fail('暂时没有查询当前会员账号', 2);
      setIsCus(false)
    } else if (iscus !== -1) {
      if (storecus != iscus) Toast.success('会员折扣录入成功', 2);
      setIsCus(true)
      //二次进入时回填电话
      // @ts-ignore
      inputRef.current.state.value = cusInfo?.telephone
    }
    setStore('iscus', iscus)
  }, [iscus])

  useEffect(() => {
    if (iscus <= 10 && iscus !== -1 && numinput === 'block') {
      console.log('会员')
      setprice(car.reduce((pre: any, cur: any) => pre + cur.num * cur.price, 0))
      const youhui = Number((prePrice * cusInfo?.level?.discount * 0.1).toFixed(2)) || 0
      setyouhuiPrice(youhui)
      const t = prePrice - youhui
      settotal(t)
    } else if (iscus === -1) {
      console.log('初始化')
      setprice(car.reduce((pre: any, cur: any) => pre + cur.num * cur.price, 0))
      setyouhuiPrice(0)
      settotal(car.reduce((pre: any, cur: any) => pre + cur.num * cur.price, 0))
    } else {
      console.log('非会员')
      setprice(car.reduce((pre: any, cur: any) => pre + cur.num * cur.price, 0))

      setyouhuiPrice(0)
      settotal(car.reduce((pre: any, cur: any) => pre + cur.num * cur.price, 0))
    }
  }, [iscus, numinput, []]);

  //是否会员切换
  function huiyuanYouhui(checked: boolean) {
    checked ? setnuminput('block') : setnuminput('none')
  }

  return (
      <OrderWrap>
        <NavBar
            mode="light"
            icon={<Icon type="left"/>}
            onLeftClick={() => continueOrder(history)}
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
              {
                !isReadOnly &&
                <Item extra={
                  <Button size={"small"} onClick={() => continueOrder(history)} className='morebtn'>继续点餐</Button>}>
                  桌台号：{tableID}
                </Item>
              }
              {
                isReadOnly &&
                <Item>
                  桌台号：{tableID}
                </Item>
              }
              {
                car && car.map((val: any, index: number) => {
                  return (
                      <Item key={index} multipleLine extra={
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
              {
                !isReadOnly &&
                <Item multipleLine extra={<Switch onClick={huiyuanYouhui}/>}>
                  <span className='ccc'>会员优惠</span>
                  <div style={{ display: numinput }}>
                    <span style={{ fontSize: '.9rem', color: '#888' }}>手机号码</span>
                    <Input onChange={onChangePhoneNumber}
                           type="number"
                           ref={inputRef}
                           bordered={false}
                           className='phonenum'
                           placeholder="请输入会员手机号"
                    />
                  </div>
                </Item>
              }

              {
                !isReadOnly &&
                <Item multipleLine extra={youhuiPrice}>
                  <span className='ccc'>优惠金额</span>
                  {
                    iscus <= 10 && iscus !== -1 && numinput === 'block' &&
                    <div className='custitle'>
                      {cusInfo?.level?.name}: <span>{cusInfo?.level?.discount}折</span>
                    </div>
                  }
                </Item>
              }
              {
                isReadOnly &&
                <Item multipleLine extra={Number(getStore('youhuiPrice'))}>
                  <span className='ccc'>优惠金额</span>
                </Item>
              }
              {
                !isReadOnly &&
                <Item multipleLine>
                  <span style={{ float: "right", color: '#D5BC96', fontSize: '1.3rem' }}>¥ {total}</span>
                  合计
                </Item>
              }
              {
                isReadOnly &&
                <Item multipleLine>
                  <span style={{
                    float: "right",
                    color: '#D5BC96',
                    fontSize: '1.3rem'
                  }}>¥ {getStore('pre') - getStore('youhuiPrice')}</span>
                  合计
                </Item>
              }

            </List>
          </div>
          <div>
            <List className="my-list">
              <Item style={{ marginTop: '.3rem' }}>用餐信息</Item>
              <Item multipleLine>
                <span className='ccc'>用餐人数</span>
                <span className='ccc' style={{ float: "right" }}>{peoplenum}人</span>
              </Item>
              <Item multipleLine>
                <span className='ccc'>桌台号</span>
                <span className='ccc' style={{ float: "right" }}>{tableID}</span>
              </Item>
            </List>
          </div>
        </div>
        {
          !isReadOnly &&
          <div className='bottom'>
            <div style={{ color: '#888' }}>合计：<span className='price'>¥ {total}</span>
              <div style={{ display: "inline-block", marginLeft: '.5rem', color: '#888' }}> (已优惠¥{youhuiPrice})</div>
            </div>
            <div>
              <Button className='btn' onClick={() => {
                setStore('total', total)
                setStore('youhuiPrice', youhuiPrice)
                setStore('pre', prePrice)
                props.updateOrder(props.cusInfo, total, total - youhuiPrice)
                Toast.loading('付款中···', 1, () => {
                  history.push('/pay')
                });
              }}>去付款</Button>
            </div>
          </div>
        }
      </OrderWrap>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
