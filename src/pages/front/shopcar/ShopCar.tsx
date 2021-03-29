import React, { FunctionComponent } from 'react';
import { useHistory } from "react-router-dom";
import FoodDetail from "../../../components/FoodDetail";
import { Button, Icon, NavBar } from "antd-mobile";
import { ShopWrap } from "./ShopWrap";

interface OwnProps {
}

type Props = OwnProps;

const ShopCar: FunctionComponent<Props> = (props) => {

  const history = useHistory()
  return (
      <ShopWrap>
        <NavBar
            mode="light"
            icon={<Icon type="left"/>}
            onLeftClick={() => history.goBack()}
            rightContent={[
              <Icon key="1" type="ellipsis"/>,
            ]}
        >待下单
        </NavBar>
        <div className='content'>
          <FoodDetail/>
          <FoodDetail/>

          <FoodDetail/>
        </div>
        <div className='bottom'>
          <div>合计：<span className='price'>¥ 99</span></div>
          <div>
            <Button className='btn' onClick={() => history.push('/home/orderdetail')}>选好了</Button>
          </div>
        </div>
      </ShopWrap>
  );
};

export default ShopCar;
