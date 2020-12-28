import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux'
import {Button, Form, Input, message} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {LoginWrap} from "./login-style";
import logo from '../../assets/images/logo.png'
import {TOLOGIN} from "./actions";
import {LoginApi} from '../../common/api'
import {Dispatch} from "redux";
import DocumentTitle from 'react-document-title'

type Props = {
    status: number,
    toLogin(values: object): void,
    [prop: string]: any

};
type userInput = {
    account: number | string
    password: string
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
                    return  message.success('登录成功！') && history.replace('/admin/dashboard') ;
                case -1:
                    return message.warning('网络连接错误！');
                default:
                    return message.error('账号或密码错误！')
            }
        }
    }, [props])

    /**
     * 表单提交验证函数
     * @param values 用户提交的用户名和密码
     */
    // todo 账号输入是字符串的问题
    function onFinish(values: userInput): void {
        const {account, password} = values;
        if ((account as string).trim() === '' || password.trim() === '') {
            message.error('请输入工号或密码！')
        } else {
            props.toLogin(values)
        }
    }

    return (
        <DocumentTitle title='登录'>
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
                        name="account"
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
                        name="password"
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
        </DocumentTitle>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
