import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Card, Carousel, Drawer, Flex, Grid, Icon, List, NavBar, Stepper, Tabs, WingBlank, } from "antd-mobile";
import { Avatar, Badge } from 'antd'
import { HomeWrap } from "./homeWrap";
import { Input } from "antd";
import img from '../../../assets/images/logo.png'
import { PlusOutlined, UpOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import FoodShelf from "../../../components/FoodShelf";

interface OwnProps {
}

type Props = OwnProps;

const Home: FunctionComponent<Props> = (props) => {

      const tabs = [
        // { title: <Badge text={'3'}>热门菜</Badge> },
        { title: '热门菜' },
        { title: '菜单' },
        // { title: '前菜' },
      ];
      const [selectedItemClassName, setClickClass] = useState('')

      const [tabs2, setTabs] = useState([
        { title: '1 Tab', key: 't1' },
        { title: '2 Tab', key: 't2' },
        { title: '3 Tab', key: 't3' },
      ])

      const [searchBar, setSearchBar] = useState('none')
      const [currentTab, setCurrentTab] = useState(0)
      const history = useHistory()

      const searchBarState = useRef<any>()

      //购物车数量
      const [shopCount, setShopCount] = useState(0)
      const increase = () => {
        setShopCount(shopCount + 1);
      }

      const decline = () => {
        if (shopCount !== 0) setShopCount(shopCount - 1)
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

      const data1 = Array.from(new Array(9)).map(() => ({
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
      }));
      const sidebar = (<List>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
          if (index === 0) {
            return (<List.Item key={index}
                               thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                               multipleLine
            >Category</List.Item>);
          }
          return (<List.Item key={index}
                             thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
          >Category{index}</List.Item>);
        })}

      </List>);

      return (
          <HomeWrap>
            <div className='top'>
              <NavBar
                  mode="light"
                  icon={<Icon type="left"/>}
                  onLeftClick={() => history.goBack()}
                  rightContent={[
                    <Icon key="0" onClick={() => {
                      clickSearch()
                    }} type="search" size='xs'/>,
                    // <Icon key="1" type="ellipsis"/>,
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
                      <Carousel autoplay={true} infinite>
                        {/*beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}*/}
                        {/*afterChange={index => console.log('slide to', index)}*/}
                        {data1.map((val: any, index) => (
                            <div className='hot-dish' key={val}>
                              <img src={img} alt=""/>
                              <span className='dish-title'>模拟菜品1</span>
                              <div className='price-plus' style={{ marginTop: '2rem' }}>
                                <span className='price'>
                                  <span className='pricedetail'>¥ 77.77</span>
                                </span>
                                <div className='plus' onClick={() => increase()}><PlusOutlined/></div>
                              </div>
                            </div>
                        ))}
                      </Carousel>
                      <div className='more'>
                        <span style={{ marginBottom: '.3rem', paddingTop: '.5rem' }}><UpOutlined/></span>
                        <span style={{ paddingBottom: '.4rem' }}>更多推荐</span>
                        <Grid data={data1}
                              columnNum={2}
                              hasLine={false}
                              renderItem={(dataItem: any) => (
                                  <div style={{ padding: '12.5px' }}>
                                    <img src={img} style={{ width: '8rem', height: '8rem' }} alt=""/>
                                    <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                      <span>I am title..</span>
                                    </div>
                                  </div>
                              )}
                        />
                      </div>
                    </div>


                    {/*菜单*/}
                    <div style={{ display: "flex" }}>
                      {/*<List className="my-list">*/}
                      {/*  <Item className={selectedItemClassName} onClick={() => {*/}
                      {/*    setClickClass('click')*/}
                      {/*  }}>分类1</Item>*/}
                      {/*  <Item onClick={() => {*/}
                      {/*    setClickClass('click')*/}
                      {/*  }}>分类2</Item>*/}
                      {/*  <Item>分类3</Item>*/}
                      {/*  <Item>分类4</Item>*/}
                      {/*  <Item>分类5</Item>*/}
                      {/*</List>*/}
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
              <div onClick={() => history.push('/home/shopcar')}>
                <Avatar style={{ backgroundColor: '#fff', color: '#000' }} size={"large"} icon={<ShoppingCartOutlined/>}/>
              </div>
            </Badge>

          </HomeWrap>
      );
    }
;

export default Home;
