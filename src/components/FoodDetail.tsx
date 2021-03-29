import React, { FunctionComponent, useState } from 'react';
import { Card } from "antd-mobile";
import img from '../assets/images/dish1.jpeg'
import '../style/stepper.css'
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

interface OwnProps {
}

type Props = OwnProps;

const FoodDetail: FunctionComponent<Props> = (props) => {
  const [val, setVal] = useState(0)
  const plus = () => {
    const s = val + 1
    setVal(s)
  }
  const less = () => {
    let s = val - 1
    if (s < 0) s = 0
    setVal(s)
  }

  return (
      <div style={{ width: '66vw', marginTop: '.7rem' }}>
        <Card>
          <img src={img} alt="" className='img'/>
          <Card.Body>
            <div style={{ display: "flex", position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className='dish-titles'>酸汤鱼</span>
                <span className='dish-prices'>¥ 77.77</span>
                <span className='dish-titles num'>x 3</span>
              </div>
            </div>
            <div className='numutil'>
              <Button shape="circle" size={"small"} onClick={less} icon={<MinusOutlined/>}/>
              <span style={{ margin: '0 .5rem' }}>{val}</span>
              <Button shape="circle" size={"small"} onClick={plus}
                      style={{ backgroundColor: 'rgb(35, 45, 57)', color: 'white' }}
                      icon={<PlusOutlined/>}/>
            </div>
            {/*<Stepper*/}
            {/*    readOnly*/}
            {/*    className='steppers'*/}
            {/*    showNumber*/}
            {/*    max={99}*/}
            {/*    min={1}*/}
            {/*    value={val}*/}
            {/*    onChange={onChange}*/}
            {/*></Stepper>*/}

          </Card.Body>
        </Card>
      </div>
  );
};

export default FoodDetail;
