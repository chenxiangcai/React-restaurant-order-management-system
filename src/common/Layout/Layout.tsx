import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  ConfigProvider,
  Descriptions,
  Form,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Popover,
  Space,
  Tag,
  notification
} from 'antd';
import {
  HeartOutlined,
  LineChartOutlined,
  ShopOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import logo from '../../assets/images/logo_small.png'
import { useHistory, useLocation } from 'react-router-dom';
import './index.css'
// @ts-ignore
import Darkmode from 'darkmode-js';
import moment from 'moment'
import { getStore, removeStore, setStore } from "../../utils/storage";
import zhCN from "antd/es/locale/zh_CN";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { EDITUSERINFO } from "./actions";
import { PWD_URL } from "../api";
import Time from "../../components/Time";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const mapStateToProps = (state: any) => ({
  topBarEditState: state.topBarEditInfo.topBarEditState,
  tberr: state.topBarEditInfo.tberr,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  editInfo(val: any) {
    dispatch({
      type: EDITUSERINFO,
      url: PWD_URL,
      data: val
    })
  }
})

interface Props {
  editInfo(val: any): void,

  [prop: string]: any
}


const LayoutWrap: FunctionComponent<Props> = (props) => {

  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory()
  const { pathname } = useLocation()

  const options = {
    bottom: '30px', // default: '32px'
    right: '32px', // default: '32px'
    left: 'unset', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }
  const darkmode = new Darkmode(options);
  darkmode.showWidget();

  //头像弹出框
  const content = (
      <div className='contentss'>
        <p onClick={() => {
          setVisible(true)
        }}>个人资料</p>
        <p onClick={() => {
          setVisiblePwd(true)
        }}>修改密码</p>
        <p onClick={() => {
          removeStore('userInfo')
          removeStore('token')
          removeStore('topBarEditState')
          history.push('/login')
        }}>退出登录</p>
      </div>
  );


  //session获取个人信息
  const [personInfo, setPersonInfo] = useState({
    name: undefined,
    account: undefined,
    role: undefined,
    joinTime: undefined,
    status: undefined
  })
  //获取当前用户信息
  useEffect(() => {
    const userInfo = JSON.parse(getStore('userInfo'))
    setPersonInfo(userInfo)
  }, [])

  const [visible, setVisible] = useState(false)
  const [visiblePwd, setVisiblePwd] = useState(false)

  //确认修改
  const handleOks = (val: any) => {
    console.log(val)
    if (val.confirmPwd !== val.newPwd) {
      notification['warning']({
        message: '密码不一致',
        description: '请确认您输入的两次密码是否一致'
      })
      return
    }
    props.editInfo(val)
  }


  // 弹框状态管理 fix 状态存储在缓存 解决每次重新加载页面弹框问题
  useEffect(() => {
    console.log(props)
    const { topBarEditState, tberr } = props
    console.log(tberr)
    const estatus = getStore('topBarEditStatus')
    //修改
    if (estatus == topBarEditState) {
    } else {
      setStore('topBarEditState', topBarEditState)
      if (topBarEditState < 1) {
        message.success('密码修改成功')
        setVisiblePwd(false)
      } else {
        if (tberr === '初始密码错误，请输入正确的密码') message.warn('初始密码错误')
        else if (tberr === '请先登录') message.error('请先登录')
        else if (tberr === '新旧密码一致，无需更改') message.warn('新旧密码一致，无需更改')
        else if (tberr === '两次输入密码不一致，请重新输入') message.warn('两次输入密码不一致，请重新输入')
      }
      // //关闭时获取更新的用户信息
      // setPersonInfo(JSON.parse(getStore('userInfo')))
    }
  }, [props.topBarEditState, props.tberr])

  return (
      <ConfigProvider locale={zhCN}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={() => {
            setCollapsed(!collapsed)
          }}>
            <div className="logo">
              <img style={{ cursor: 'pointer' }} onClick={() => {
                history.push('/admin/dashboard')
              }} className='bigLogo' src={logo} alt="logo"/>
            </div>
            <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline">
              <Menu.Item key="/admin/dashboard" icon={<LineChartOutlined/>} onClick={() => {
                history.push('/admin/dashboard')
              }}>
                统计
              </Menu.Item>

              <SubMenu key="sub122" icon={<ShopOutlined/>} title="菜品">
                <Menu.Item key="/admin/dishes"
                           onClick={() => {
                             history.push('/admin/dishes')
                           }}
                >菜品列表</Menu.Item>
                <Menu.Item key="/admin/dishes/category"
                           onClick={() => {
                             history.push('/admin/dishes/category')
                           }}
                >菜品分类</Menu.Item>
              </SubMenu>

              <Menu.Item
                  key="/admin/orders"
                  icon={<UnorderedListOutlined/>}
                  onClick={() => {
                    history.push('/admin/orders')
                  }}
              >
                订单
              </Menu.Item>


              <SubMenu key="sub2453" icon={<HeartOutlined/>} title="会员">
                <Menu.Item key="/admin/customer"
                           onClick={() => {
                             history.push('/admin/customer')
                           }}
                >会员资料</Menu.Item>
                <Menu.Item key="/admin/customer/cate"
                           onClick={() => {
                             history.push('/admin/customer/cate')
                           }}
                >会员类别</Menu.Item>
              </SubMenu>
              <Menu.Item
                  key="/admin/staffs"
                  icon={<TeamOutlined/>}
                  onClick={() => {
                    history.push('/admin/staffs')
                  }}
              >
                职工
              </Menu.Item>
              {/*<Menu.Item key="9" icon={<FileOutlined/>}>*/}
              {/*  Files*/}
              {/*</Menu.Item>*/}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background">
              <div>起个什么名后台</div>
              <div className='time'><Time/></div>
              <div className='avatar'>
                <Popover placement={"leftTop"} content={content} title="欢迎您：">
                  <Avatar size={"large"} style={{ backgroundColor: '#1e90ff' }}>{personInfo?.name}</Avatar>
                </Popover>
              </div>
            </Header>
            <Content style={{ margin: '16px 16px' }}>
              {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
              {/*    <Breadcrumb.Item>后台</Breadcrumb.Item>*/}
              {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
              {/*</Breadcrumb>*/}
              <div style={{ minHeight: 780, height: '100%' }}>
                {props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Copyright © 2021 陈相材 </Footer>
          </Layout>
          <Modal
              visible={visible}
              destroyOnClose
              onCancel={() => {
                setVisible(false)
              }}
              footer={null}
          >
            <Descriptions bordered size={'small'} title="个人信息">
              <Descriptions.Item label="工号">{personInfo?.account}</Descriptions.Item>
              <Descriptions.Item label="姓名">{personInfo?.name}</Descriptions.Item>
              <Descriptions.Item label="岗位">
                {
                  personInfo.role === 'admin' &&
                  <Tag color="#108ee9">管理员</Tag>
                }
                {
                  personInfo.role === 'chef' &&
                  <Tag color="#9c90da">厨师</Tag>
                }
                {
                  personInfo.role === 'waiter' &&
                  <Tag color="#108ee9">服务员</Tag>
                }
              </Descriptions.Item>
              <Descriptions.Item label="在职状态">
                {
                  personInfo?.status === 1 && '在职'
                }
                {
                  personInfo?.status === 0 && '请假'
                }
              </Descriptions.Item>
              <Descriptions.Item
                  label="入职时间">{moment(personInfo?.joinTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
            </Descriptions>
          </Modal>

          <Modal
              visible={visiblePwd}
              destroyOnClose
              onCancel={() => {
                setVisiblePwd(false)
              }}
              title={'密码修改'}
              footer={null}
          >
            <Form onFinish={handleOks}>
              <Form.Item name="lastPwd" label="初始密码" rules={[
                {
                  required: true,
                  message: '请输入旧密码',
                },
              ]}>
                <Input.Password type={"password"}/>
              </Form.Item>
              <Form.Item name="newPwd" label="新的密码" rules={[
                {
                  required: true,
                  message: '请输入新密吗',
                },
              ]}>
                <Input.Password type={"password"}/>
              </Form.Item>
              <Form.Item name='confirmPwd' label="确认密码" rules={[
                {
                  required: true,
                  message: '请输入密码以确认',
                },
              ]}>
                <Input.Password type={"password"}/>
              </Form.Item>
              <Form.Item style={{ marginBottom: -6 }}>
                <Space style={{ float: "right" }}>
                  <Button type="default" onClick={() => {
                    setVisiblePwd(false)
                  }}>关闭</Button>
                  <Button type="primary" htmlType="submit">提交</Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>
        </Layout>
      </ConfigProvider>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(LayoutWrap);
