import React, { FunctionComponent, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  FileOutlined,
  LineChartOutlined,
  ShopOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import logo from '../../assets/images/logo_small.png'
import { useHistory, useLocation } from 'react-router-dom';
import './index.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const LayoutWrap: FunctionComponent<{}> = (props) => {

  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory()
  const { pathname } = useLocation()
  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => {
          setCollapsed(!collapsed)
        }}>
          <div className="logo">
            <img className='bigLogo' src={logo} alt="logo"/>
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
                key="/admin/staffs"
                icon={<TeamOutlined/>}
                onClick={() => {
                  history.push('/admin/staffs')
                }}
            >
              职工
            </Menu.Item>

            <SubMenu key="sub12" icon={<UnorderedListOutlined/>} title="订单">
              <Menu.Item key="3">所有订单</Menu.Item>
              <Menu.Item key="6">前台订单</Menu.Item>
              <Menu.Item key="8">后厨订单</Menu.Item>
            </SubMenu>

            <SubMenu key="sub2453" icon={<UsergroupAddOutlined/>} title="会员">
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
            <Menu.Item key="9" icon={<FileOutlined/>}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}/>
          <Content style={{ margin: '16px 16px' }}>
            {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
            {/*    <Breadcrumb.Item>后台</Breadcrumb.Item>*/}
            {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
            {/*</Breadcrumb>*/}
            <div className="site-layout-background" style={{ padding: 24, minHeight: 780 }}>
              {props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copyright © 2021 陈相材 </Footer>
        </Layout>
      </Layout>
  );
};

export default LayoutWrap;
