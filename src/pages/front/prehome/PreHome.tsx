import React, { FunctionComponent, useState } from 'react';
import { Button, Icon, InputItem, List, NavBar, TextareaItem, Toast } from "antd-mobile";
import { PreWrap } from "./PreWrap";
import img from '../../../assets/images/logo.png'
import { useHistory } from "react-router-dom";
import { setStore } from "../../../utils/storage";

interface OwnProps {
}

type Props = OwnProps;

const PreHome: FunctionComponent<Props> = (props) => {

  const history = useHistory()
  const [peoplenum, setpn] = useState('')


  function toHome() {
    if (Number(peoplenum) > 0) {
      history.push('/home')
      setStore('peoplenum', peoplenum)
    } else Toast.info('请输入就餐人数', 1)
  }

  return (
      <PreWrap>
        <NavBar
            style={{ fontWeight: 600 }}
            mode="light"
            icon={<Icon type="cross"/>}
            onLeftClick={() => {
            }}
            rightContent={[
              <Icon key="1" type="ellipsis"/>,
            ]}
        >这是个名字
        </NavBar>
        <div className='content'>
          <div style={{ textAlign: "center" }}>
            <img src={img} alt=""/>
            <div className='title'>欢迎来到这是个名字</div>
          </div>
          <div className='num'>
            <InputItem
                type={"number"}
                defaultValue={String(peoplenum)}
                onBlur={(v) => {
                  setpn(`${v}`)
                }}
                placeholder="请输入用餐人数"
                disabledKeys={['.']}
            >就餐人数
            </InputItem>
          </div>
          <div>
            <span className='aa'>备注</span>
            <List>
              <TextareaItem
                  style={{ fontSize: '.7rem' }}
                  rows={5}
                  placeholder='口味要求，忌口等（可不填）'
                  count={100}
              />
            </List>
          </div>
          <div>
            <Button className='btn' onClick={toHome}>开始点餐</Button>
          </div>
        </div>
      </PreWrap>
  );
};

export default PreHome;
