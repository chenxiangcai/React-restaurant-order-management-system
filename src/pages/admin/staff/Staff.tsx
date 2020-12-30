import React, {FunctionComponent, useEffect, useState} from 'react';
import {
    Button,
    Card,
    ConfigProvider,
    Form,
    Input,
    message,
    Modal,
    Pagination,
    Popconfirm,
    Radio,
    Space,
    Table,
    Tag
} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {Dispatch} from "redux";
import {ADDSTAFF, DELSTAFF, TOGGLEPAGE} from "./actions";
import {DELSTAFF_URL, STAFFADD, STAFFLIST} from "../../../common/api";
import DocumentTitle from "react-document-title";
import moment from 'moment';
import {FieldNumberOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {getStore, setStore} from "../../../utils/storage";
import zhCN from 'antd/es/locale/zh_CN';

interface OwnProps {
    [prop: string]: any

    togglePage(value?: object): void

    delStaff(value: string): void,

    addStaff(value: object): void,

}

interface User {
    _id: string,
    name: number | string,
    role: string,
    title: string,
    status: number,
    account: number,
    joinTime: string
}

type Props = OwnProps;

const mapStateToProps = (state: any) => ({
    list: state.staff.list,
    addStatus: state.staff.addStatus,
    delStatus: state.staff.delStatus,
    errorMsg: state.staff.errorMsg
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    delStaff(value: string) {
        dispatch({
            type: DELSTAFF,
            url: DELSTAFF_URL,
            data: value
        })
    },
    addStaff(value: object) {
        dispatch({
            type: ADDSTAFF,
            url: STAFFADD,
            data: value
        })
    },
    togglePage(value: object) {
        dispatch({
            type: TOGGLEPAGE,
            url: STAFFLIST,
            data: value
        })
    }
})


// todo 路由拦截
const Staff: FunctionComponent<Props> = (props) => {

    // 表格列
    const columns: ColumnsType<User> = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '角色',
            key: 'role',
            dataIndex: 'role',
            render: (role: any) => (
                <>
                    {
                        role === 'admin' &&
                        <Tag color={'#0083B0'} key={role}>
                            {
                                role === 'admin' ? '管理员' : '员工'
                            }
                        </Tag>
                    }
                    {
                        role === 'waiter' &&
                        <Tag color={'#2ed573'} key={role}>
                            {
                                role = '服务员'
                            }
                        </Tag>
                    }
                    {
                        role === 'chef' &&
                        <Tag color={'#a17fe0'} key={role}>
                            {
                                role = '厨师'
                            }
                        </Tag>
                    }
                </>
            ),
        },
        {
            title: '入职时间',
            key: 'joinTime',
            dataIndex: 'joinTime',
            render: (time: any) => (
                <>
                    {
                        moment(time).format('YYYY-MM-DD')
                    }
                </>
            ),
        },
        {
            title: '在职状态',
            key: 'status',
            dataIndex: 'status',
            render: (status: any) => (
                <>
                    {
                        status === 1 ? '在职' : '请假'
                    }
                </>
            ),
        },
        {
            title: '操作',
            key: '_id',
            width: 300,
            render: (text, records) => (
                <Space>
                    <Button type='primary' size={"small"} onClick={() => {
                        edit_staff(records)
                    }}>修改</Button>
                    {
                        <Popconfirm
                            title="确定要删除此用户吗？"
                            placement="top"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => {
                                del_staff(records)
                            }}
                        >
                            <Button type='primary' danger size={"small"}>删除</Button>
                        </Popconfirm>
                    }
                </Space>
            ),
        },
    ];

    //选择框(身份信息)
    const positionOptions = [
        {label: '服务员', value: 'waiter', style: {marginRight: 10}},
        {label: '厨师', value: 'chef', style: {marginRight: 10}},
        {label: '管理员', value: 'admin'},
    ];

    //列表显示
    const [pageMsg, setPageMsg] = useState({
        query: '',
        page: 1,
        pagesize: 10
    })
    const [userList, setUserList] = useState([])


    /**
     * 新增弹出框
     * visible: 弹框可见性
     * selected:选中项
     */
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(['waiter'])

    // 表单提交函数
    const handleOk = (value: any) => {
        value.account = props.list.total + 1
        value.joinTime = new Date().getTime()
        props.addStaff(value)
        setVisible(false);
    };

    // 取消弹出框
    const handleCancel = () => {
        // todo 取消弹出框确认
        console.log('Clicked cancel button');
        setVisible(false);
    };

    // 新增用户身份选择项
    const onChange1 = (e: any) => {
        const selectedValue = e.target.value
        setSelected(selectedValue)
    }

    // 删除员工触发
    const del_staff = (value: User) => {
        const {_id} = value
        props.delStaff(_id)
    }

    // 编辑员工触发
    const edit_staff = (value: User) => {
        console.log(value)
    }
    // 员工列表数据和事件处理
    useEffect(() => {
        props.togglePage(pageMsg)
        const {list} = props
        const user_List = list.records
        setUserList(user_List)
        //数组长度发生变化后 重新请求数据 渲染列表
    }, [props.list.total, props.list.page, props.list.size])


    // 弹框状态管理 fix 状态存储在缓存 解决每次重新加载页面弹框问题
    useEffect(() => {
        const {errorMsg, addStatus, delStatus} = props
        const astatus = getStore('addStatus')
        const dstatus = getStore('delStatus')
        //添加
        if (astatus == addStatus) {
        } else {
            setStore('addStatus', addStatus)
            if (addStatus < 1) message.success('员工添加成功！')
            else if (errorMsg && errorMsg.includes('密码')) message.error('请输入3位数以上的密码！')
            else if (errorMsg && errorMsg.includes('姓名')) message.error('请输入正确的姓名格式！')
        }
        //删除
        if (dstatus == delStatus) {
        } else {
            setStore('delStatus', delStatus)
            if (delStatus < 1) message.success('员工删除成功！')
        }
    }, [props.addStatus, props.delStatus])

    return (
        <DocumentTitle title="员工管理">
            <ConfigProvider locale={zhCN}>
                <Card title="员工列表"
                      extra={
                          <Button type="primary" onClick={() => {
                              setVisible(true)
                          }}>新增</Button>
                      }
                      headStyle={{fontSize: 18}}
                      style={{width: '100%'}}
                >
                    {
                        userList &&
                        < Table
                            rowKey='_id'
                            bordered
                            columns={columns}
                            dataSource={userList}
                            pagination={false}
                        />
                    }
                    {userList &&
                    <Pagination
                        defaultCurrent={props.list.page}
                        total={props.list.total}
                        hideOnSinglePage={false}
                        style={{float: "right", marginTop: 20}}
                        showTotal={total => `共 ${total} 条`}
                        onChange={(page = 1, pageSize = 10): any => {
                            props.togglePage({
                                query: '',
                                page: page,
                                pagesize: pageSize
                            })
                            setPageMsg({
                                query: '',
                                page: page,
                                pagesize: pageSize
                            })
                        }}
                    />}
                    {/*新增员工弹出框*/}
                    <Modal
                        title="新增员工"
                        visible={visible}
                        onCancel={handleCancel}
                        destroyOnClose
                        footer={null}
                    >

                        <Form name="normal_login" className="login-form" onFinish={handleOk}>
                            <Form.Item name="account"
                            >
                                <Input defaultValue={props.list.total + 1}
                                       disabled prefix={<FieldNumberOutlined className="site-form-item-icon"/>}
                                       placeholder="工号"/>
                            </Form.Item>
                            <Form.Item name="name" rules={[
                                {
                                    required: true,
                                    message: '请输入姓名',
                                },
                            ]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="姓名"/>
                            </Form.Item>
                            <Form.Item name="password" rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}>
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                                type="password"
                                                placeholder="密码"/>
                            </Form.Item>
                            <Form.Item name="role" initialValue={'waiter'}>
                                <Radio.Group
                                    options={positionOptions}
                                    onChange={onChange1}
                                    value={selected[0]}
                                    optionType="button"
                                />
                            </Form.Item>
                            <Form.Item name="status" initialValue={1} style={{marginTop: -10}}>
                                <Radio.Group>
                                    <Radio value={1}>在职</Radio>
                                    <Radio value={0}>请假</Radio>
                                    <Radio value={-1}>离职</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item style={{marginBottom: 0}}>
                                <Space style={{float: "right"}}>
                                    <Button type="default" onClick={handleCancel}>取消</Button>
                                    <Button type="primary" htmlType="submit" className="login-form-button">添加</Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Card>
            </ConfigProvider>
        </DocumentTitle>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Staff);
