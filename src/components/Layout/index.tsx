import React, {FunctionComponent, useState} from 'react';
import {Layout, Menu} from 'antd';
import {FileOutlined, LineChartOutlined, ShopOutlined, TeamOutlined, UnorderedListOutlined} from '@ant-design/icons';
import logo from '../../assets/images/logo_small.png'
import {useHistory, useLocation} from 'react-router-dom';
import './index.css'

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


const LayoutWrap: FunctionComponent<{}> = (props) => {

    const [collapsed, setCollapsed] = useState(false);
    const history = useHistory()
    const {pathname} = useLocation()

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => {
                setCollapsed(!collapsed)
            }}>
                <div className="logo">
                    <img className='bigLogo' src={logo} alt="logo"/>
                </div>
                <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline" style={{fontSize: 17}}>
                    <Menu.Item
                        key="1"
                        icon={<LineChartOutlined/>}
                        onClick={() => {
                            history.push('/admin/dashboard')
                        }}
                    >
                        统计
                    </Menu.Item>

                    <SubMenu key="sub12" icon={<UnorderedListOutlined/>} title="订单">
                        <Menu.Item key="3">所有订单</Menu.Item>
                        <Menu.Item key="6">前台订单</Menu.Item>
                        <Menu.Item key="8">后厨订单</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub122" icon={<ShopOutlined/>} title="菜品">
                        <Menu.Item key="62">家常菜</Menu.Item>
                        <Menu.Item key="82">粤菜</Menu.Item>
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
                    <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined/>}>
                        Files
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '16px 16px'}}>
                    {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                    {/*    <Breadcrumb.Item>后台</Breadcrumb.Item>*/}
                    {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    <div className="site-layout-background" style={{padding: 24, minHeight: 780}}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutWrap;
