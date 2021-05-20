import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Icon, InputItem, List, NavBar, TextareaItem, Toast } from "antd-mobile";
import { PreWrap } from "./PreWrap";
import img from '../../../assets/images/logo.png'
import { useHistory } from "react-router-dom";
import { getStore, removeStore, setStore } from "../../../utils/storage";

interface OwnProps {
}

type Props = OwnProps;

const PreHome: FunctionComponent<Props> = (props) => {

  const history = useHistory()
  const tableID = Number(history.location.pathname.slice(-1))

  const [peoplenum, setpn] = useState('')
  const [remarks, setRemarks] = useState('')

  //进入页面时清空缓存菜单信息
  useEffect(() => {
    if (getStore('more')) removeStore('more')
    if (getStore('shopcar')) removeStore('shopcar')
    if (getStore('remarks')) removeStore('remarks')
  }, [])

  function toHome() {
    if (Number(peoplenum) > 0) {
      history.push('/home')
      setStore('peoplenum', peoplenum)
      setStore('tableID', tableID)
      setStore('remarks', remarks)
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
                  onBlur={(v: any) => {
                    setRemarks(v.trimLeft())
                  }}
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
