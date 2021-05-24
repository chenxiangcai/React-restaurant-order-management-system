import React, { FC, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginWrap } from "./login-style";
import logo from '../../assets/images/logo.png'
import { TOLOGIN } from "./actions";
import { LoginApi } from '../../common/api'
import { Dispatch } from "redux";
import DocumentTitle from 'react-document-title'
import { getStore } from "../../utils/storage";
import { useHistory } from "react-router-dom";
import { post } from "../../utils/http";

const CryptoJS = require("crypto");

type Props = {
  status: number,
  toLogin(values: any): void,
  clearState(): void
  [prop: string]: any

};

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

  const history = useHistory()
  const [svgUrl, setSvgUrl] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const vercoderef = useRef(null)
  const accountref = useRef(null)
  const pwdref = useRef(null)

  useEffect(() => {
    if (String(props.status)) {
      const { status } = props
      if (status === -1) message.warning('网络连接错误！');
      else if (status > 100) message.error('账号或密码错误！')
      else {
        if (getStore('userInfo') !== null) {
          const info = JSON.parse(getStore('userInfo'))
          if (info.role === 'admin') history.push('/admin/dashboard')
          else if (info.role === 'chef') history.push('/chef/orders')
          else history.push('/waiter')
          message.success(`欢迎您：${info.name}`)
        }
      }
    }
  }, [props.status])

  //获取验证码
  useEffect(() => {
    getVerCode()
  }, []);

  //验证码点击事件
  async function getVerCode() {
    // @ts-ignore
    vercoderef.current.value = ''
    const res = await post({ url: '/getVerificationCode' }, {})
    setSvgUrl(res.svg)
    setPublicKey(res.publicKey)
  }

  //点击登录触发的函数
  async function VerCodeIsPass(val: number) {
    if (val) {
      const res = await post({ url: "/isvercode" }, { value: val })
      if (res.status === 200) {
        // @ts-ignore
        const value = { account: accountref.current.state.value, password: pwdref.current.state.value }
        //使用公钥加密
        let ciphertext = CryptoJS.publicEncrypt(publicKey, Buffer.from(JSON.stringify(value), 'utf8'));
        // console.log(ciphertext)
        // @ts-ignore
        onFinish(ciphertext)
        return
      }
      message.error('验证码错误')
      return
    }
    message.info('请输入验证码')
  }

  /**
   * 表单提交验证函数
   * @param values 加密后的用户提交的用户名和密码
   */
  function onFinish(values: any): void {
    // @ts-ignore
    if ((accountref.current.state.value as string).trim() === '' || pwdref.current.state.value.trim() === '') {
      message.error('请输入工号或密码')
    } else {
      props.toLogin({
        val: values
      })
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
              <Input ref={accountref} prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="工号"/>
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
              <Input.Password ref={pwdref} prefix={<LockOutlined className="site-form-item-icon"/>}
                              type="password"
                              placeholder="密码"/>
            </Form.Item>
            <div className='r'>
              <span onClick={getVerCode} className='svg' dangerouslySetInnerHTML={{ __html: svgUrl }}/>
              <div>
                <input ref={vercoderef} type="text" placeholder="请输入验证码"/>
                <span></span>
              </div>
            </div>
            <Form.Item>
              <Button type="primary" onClick={() => {
                // @ts-ignore
                VerCodeIsPass(vercoderef.current.value)
              }} size="large"
                      className="login-form-button">立即登录</Button>
              <div className="login-form-login" style={{ margin: 0 }}>
                {/*<span>还没有账号？<a href="???">去注册...</a></span>*/}
              </div>
            </Form.Item>
          </Form>
        </LoginWrap>
      </DocumentTitle>
  )
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
