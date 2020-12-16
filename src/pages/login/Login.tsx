import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux'
import {Button, Form, Input, message} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {LoginWrap} from "./login-style";
import logo from '../../assets/images/logo.png'
import {TOLOGIN} from "./actions";
import {LoginApi} from '../../common/api'
import {Dispatch} from "redux";

type Props = {
    status: number,
    toLogin(values: object): void,
    [prop: string]: any

};
type userInput = {
    userID: number | string
    userPassword: string
}

const mapStateToProps = (state: any) => ({
    status: state.login.status
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    toLogin(values: object) {
        dispatch({
            type: TOLOGIN,
            url: LoginApi,
            data: values
        })
    }
})


const Login: FC<Props> = (props) => {

    useEffect(() => {
        if (props.status !== 0) {
            const {status, history} = props
            switch (status) {
                case 1:
                    return history.replace('/admin/dashboard');
                case -1:
                    return message.warning('网络连接错误！');
                default:
                    return message.error('账号或密码错误！')
            }
        }
    }, [props])

    function onFinish(values: userInput): void {
        const {userID, userPassword} = values;
        if ((userID as string).trim() === '' || userPassword.trim() === '') {
            message.error('请输入工号或密码！')
        } else {
            props.toLogin(values)
        }
    }

    return (
        <LoginWrap>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <img className='logo-left' src={logo} alt='logo'/>
                <img className='logo' src={logo} alt=''/>
                <span className='login-form-title'>账号登录</span>
                <Form.Item
                    name="userID"
                    rules={[
                        {
                            required: true,
                            message: '请输入工号',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="工号"/>
                </Form.Item>
                <Form.Item
                    name="userPassword"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="密码"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large"
                            className="login-form-button">立即登录</Button>
                    <div className="login-form-login"><span>还没有账号？<a href="???">去注册...</a></span></div>
                </Form.Item>
            </Form>
        </LoginWrap>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
