import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Carousel, Flex, Grid, Icon, NavBar, Tabs, Toast, Popover } from "antd-mobile";
import { Avatar, Badge } from 'antd'
import { HomeWrap } from "./homeWrap";
import { Input } from "antd";
import img from '../../../assets/images/logo.png'
import { PlusOutlined, UpOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import FoodShelf from "../../../components/FoodShelf";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ADD2CAR, GETHDISH, RESETCAR } from "./actions";
import { HOMEDOSH_URL, SERVER_URL } from "../../../common/api";
import { getStore } from "../../../utils/storage";

const Item = Popover.Item;

interface OwnProps {
  GetHomeDish(): () => void,

  add2car(val: any): () => void,

  resetcar(val: any): () => void

  [prop: string]: any
}

type Props = OwnProps;
const mapStateToProps = (state: any) => ({
  hotlist: state.home.hotlist || [],
  homeDishState: state.home.homeDishState,
  randomlist: state.home.randomlist || [],
  shopcar: state.home.shopcar || []
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  GetHomeDish(value: object) {
    dispatch({
      type: GETHDISH,
      url: HOMEDOSH_URL,
      data: value
    })
  },
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


const Home: FunctionComponent<Props> = (props) => {

      const tabs = [
        { title: '热门菜' },
        { title: '菜单' },
      ];
      const [selectedItemClassName, setClickClass] = useState('')

      const [searchBar, setSearchBar] = useState('none')
      const [currentTab, setCurrentTab] = useState(0)
      const history = useHistory()

      const searchBarState = useRef<any>()

      //购物车数量
      const [shopCount, setShopCount] = useState(0)
      //购物车
      const shopcar = props.shopcar

      const increase = () => {
        setShopCount(shopCount + 1)
      }

      useEffect(() => {
        // searchBarState.current.focus()
      }, [searchBar])

      //导航栏搜索
      function clickSearch() {
        setSearchBar('block')
      }

      //搜索提交
      function searchSubmit(e: string) {
        console.log(e)
        // setSearchBar('none')
      }


      //获取列表数据
      useEffect(() => {
        props.GetHomeDish()
        const shop_car = JSON.parse(getStore('shopcar'))
        if (!shop_car) setShopCount(0)
        else {
          const shopnum = shop_car.reduce((pre: any, cur: any) => pre + cur.num, 0)
          setShopCount(shopnum)
          props.resetcar(shop_car)
        }
      }, [])


      useEffect(() => {
        const shop_car = JSON.parse(getStore('shopcar'))
        if (!shop_car) setShopCount(0)
        else {
          const shopnum = shop_car.reduce((pre: any, cur: any) => pre + cur.num, 0)
          setShopCount(shopnum)
        }
      }, [props.shopcar])

      //增加到购物车
      function add2car(val: any) {
        props.add2car(val)
      }

      const data1 = props.hotlist
      const data2 = props.randomlist

      return (
          <HomeWrap>
            <div className='top'>
              <NavBar
                  mode="light"
                  icon={<Icon type="left"/>}
                  onLeftClick={() => history.goBack()}
                  rightContent={[
                    <Popover mask
                             visible={false}
                             overlay={[
                               (<Item style={{ marginRight: 5 }} key="0" data-seed="logId">购物车</Item>),
                               (<Item style={{ whiteSpace: 'nowrap' }} key="1">我的订单</Item>),
                               (<Item key="2"><span style={{ marginRight: 5 }}>更多</span></Item>),
                             ]}
                             onSelect={(node: any, index?: number) => {
                               console.log(index)
                               if (index === 0) {
                                 // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                 shopCount === 0 ? Toast.info('购物车空空如也...', 1) : history.push('/home/shopcar')
                               } else if (index === 1) {
                                 //todo 跳转订单详情页之前验证
                                 history.push('/home/orderdetail')
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
                    </Popover>
                  ]}
              >
                <span className='top-title'>这是一个名字</span>
              </NavBar>

            </div>
            {/*style={{ maxWidth: '100%', display: searchBar }}*/}
            <Flex>
              <Flex.Item style={{ position: 'relative' }}>
                <div className='top-block'>
                  <span>欢迎来到</span>
                  <span>这是一个名字</span>
                </div>
                <div className='search-item'>
                  <Input
                      className='search-input'
                      prefix={<Icon type="search" size='xxs'/>}
                      placeholder={'搜索'}
                  />
                </div>
              </Flex.Item>
            </Flex>

            <div className="flex-container">
              <Flex>
                <Flex.Item style={{ paddingTop: '.3rem' }}>
                  <Tabs tabs={tabs}
                        swipeable={false}
                        initialPage={currentTab}
                        tabBarUnderlineStyle={{ width: '1rem', marginLeft: '5.4rem', background: '#000000' }}
                        onChange={(tab, index) => {
                          console.log('onChange', index, tab);
                          setCurrentTab(index)
                        }}
                  >
                    {/*热门菜品*/}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}>
                      {
                        data1 &&
                        <Carousel autoplay infinite>
                          {/*beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}*/}
                          {/*afterChange={index => console.log('slide to', index)}*/}
                          {data1.map((val: any, index: number) => (
                              <div className='hot-dish' key={val}>
                                {
                                  val.url === '' ? <img src={img} alt="" style={{ objectFit: "contain" }}/> :
                                      <img src={`${SERVER_URL}${val.url}`} style={{ objectFit: "contain" }} alt=''/>
                                }

                                <span className='dish-title'>{val.name}</span>
                                <div className='price-plus' onClick={() => {
                                  add2car(val)
                                }} style={{ marginTop: '2rem' }}>
                            <span className='price'>
                            <span className='pricedetail'>¥ {val.price}</span>
                            </span>
                                  <div className='plus' onClick={() => increase()}><PlusOutlined/></div>
                                </div>
                              </div>
                          ))}
                        </Carousel>
                      }
                      {
                        data1 &&
                        <div className='more'>
                          <span style={{ marginBottom: '.3rem', paddingTop: '.5rem' }}><UpOutlined/></span>
                          <span style={{ paddingBottom: '.4rem' }}>更多推荐</span>
                          <Grid data={data2}
                                columnNum={2}
                                hasLine={false}
                                renderItem={(dataItem: any) => (
                                    <div style={{ padding: '12.5px' }}>
                                      {
                                        dataItem.picture === '' ?
                                            <img src={img} style={{ width: '8rem', height: '8rem', objectFit: "cover" }}
                                                 alt="图片走丢了"/>
                                            :
                                            <img src={`${SERVER_URL}${dataItem.picture}`}
                                                 style={{ width: '8rem', height: '8rem', objectFit: "cover" }} alt=""/>
                                      }
                                      <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                        <span>{dataItem.name}</span>
                                      </div>
                                    </div>
                                )}
                          />
                        </div>
                      }
                    </div>


                    {/*菜单*/}
                    <div style={{ display: "flex" }}>
                      <FoodShelf/>
                    </div>


                    {/*<div style={{*/}
                    {/*  display: 'flex',*/}
                    {/*  alignItems: 'center',*/}
                    {/*  justifyContent: 'center',*/}
                    {/*  height: '150px',*/}
                    {/*}}>*/}
                    {/*  Content of third tab*/}
                    {/*</div>*/}
                  </Tabs>
                </Flex.Item>
              </Flex>
            </div>

            {/*购物车*/}
            <Badge className='shop-car' style={{ textAlign: "center" }} count={shopCount}>
              <div onClick={() => {
                if (props.shopcar.length === 0) return Toast.info('购物车空空如也...', 1)
                history.push('/home/shopcar')
              }}>
                <Avatar style={{ backgroundColor: '#fff', color: '#000' }} size={"large"} icon={<ShoppingCartOutlined/>}/>
              </div>
            </Badge>

          </HomeWrap>
      );
    }
;
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Home)
