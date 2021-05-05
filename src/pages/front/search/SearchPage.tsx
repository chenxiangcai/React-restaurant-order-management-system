import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { Icon, NavBar, SearchBar, Toast, WingBlank } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SEARCHDISH } from "./action";
import { SEARCHDISH_URL } from "../../../common/api";
import debounce from 'lodash.debounce';
import CateFoodDetail from "../../../components/CateFoodDetail";
import { SearchWrap } from "./SearchWrap";
import { Avatar, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { getStore } from "../../../utils/storage";


interface OwnProps {
  [prop: string]: any

  searchDish(value: string): void
}

type Props = OwnProps;


const mapStateToProps = (state: any) => ({
  searchlist: state.search.searchlist || [],
  shopcar: state.home.shopcar || []

})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchDish(val: string) {
    dispatch({
      type: SEARCHDISH,
      data: val,
      url: SEARCHDISH_URL
    })
  },
})

const SearchPage: FunctionComponent<Props> = (props) => {

  const history = useHistory()
  const ref = useRef<any>('input');
  const [list, setList] = useState([])
  //购物车数量
  const [shopCount, setShopCount] = useState(0)

  useEffect(() => {
    const shop_car = JSON.parse(getStore('shopcar'))
    if (!shop_car) setShopCount(0)
    else {
      const shopnum = shop_car.reduce((pre: any, cur: any) => pre + cur.num, 0)
      setShopCount(shopnum)
    }
  }, [props.shopcar])

  useEffect(() => {
    ref.current.focus()
  }, [])

  useMemo(() => {
    setList(props.searchlist)
  }, [props])

  //节流搜索
  const search = debounce(function (val: string) {
    if (val.trim().length !== 0) return props.searchDish(val)
    setList([])
  }, 200)

  return (
      <SearchWrap>
        <NavBar
            mode="light"
            icon={<Icon type="left"/>}
            onLeftClick={() => history.goBack()}
        >
          菜品搜索
        </NavBar>
        <SearchBar onChange={search} placeholder="按菜品名搜索" ref={ref}/>
        <WingBlank size="lg">
          <CateFoodDetail dish={list}/>
        </WingBlank>
        {/*购物车*/}
        <Badge className='shop-car' style={{ textAlign: "center" }} count={shopCount}>
          <div onClick={() => {
            if (shopCount === 0) return Toast.info('购物车空空如也...', 1)
            history.push('/home/shopcar')
          }}>
            <Avatar style={{ backgroundColor: '#fff', color: '#000' }} size={"large"} icon={<ShoppingCartOutlined/>}/>
          </div>
        </Badge>
      </SearchWrap>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
