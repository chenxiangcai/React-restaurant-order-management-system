import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, ConfigProvider, Form, Input, message, Modal, Radio, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Dispatch } from "redux";
import { ADDSTAFF, DELSTAFF, EDITSTAFF, TOGGLEPAGE } from "./actions";
import { DELSTAFF_URL, EDITSTAFF_URL, STAFFADD, STAFFLIST } from "../../../common/api";
import DocumentTitle from "react-document-title";
import moment from 'moment';
import { FieldNumberOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getStore, setStore } from "../../../utils/storage";
import zhCN from 'antd/es/locale/zh_CN';
import Paging from "../../../components/Paging";
import TableCheckBox from "../../../components/TableCheckBox";

interface OwnProps {
  [prop: string]: any

  togglePage(value?: object): void

  delStaff(value: string): void,

  addStaff(value: object): void,

  editStaff(value: object): void

}

interface User {
  _id: any,
  name: string,
  role: string,
  title: string,
  status: number,
  account: number,
  joinTime: string
}

type Props = OwnProps;

const mapStateToProps = (state: any) => ({
  list: state.staff.list || [],
  addStatus: state.staff.addStatus,
  delStatus: state.staff.delStatus,
  errorMsg: state.staff.errorMsg,
  editStatus: state.staff.editStatus
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
  },
  editStaff(value: object) {
    dispatch({
      type: EDITSTAFF,
      url: EDITSTAFF_URL,
      data: value
    })
  }
})


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
              status === 1 && '在职'
            }
            {
              status === 0 && '请假'
            }
            {
              status === -1 && '离职'
            }
          </>
      ),
    },
    /*{
      title: '操作',
      key: '_id',
      width: 300,
      render: (text, records, index) => (
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
    },*/
  ];

  //选择框(身份信息)
  const positionOptions = [
    { label: '服务员', value: 'waiter', style: { marginRight: 10 } },
    { label: '厨师', value: 'chef', style: { marginRight: 10 } },
    { label: '管理员', value: 'admin' },
  ];

  //列表显示
  const [pageMsg, setPageMsg] = useState({
    query: '',
    page: 1,
    pagesize: 10
  })
  const [userList, setUserList] = useState([])


  /**
   * 新增和编辑弹出框
   * visible: 弹框可见性
   * selected: 选中项
   * popStaffStyle: 弹窗类型
   */
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(['waiter'])
  const [popStaffStyle, setPopStaffStyle] = useState('')
  const [editValues, setEditValues] = useState({ account: 0, name: '', role: '', status: -9 })

  // 表单提交函数 新增和编辑
  const handleOk = (value: any) => {
    if (value.hasOwnProperty('password')) {
      // 找出最大值 作为账号account的值
      value.account = props.list.records.reduce((pre: any, cur: any) => pre > cur.account ? pre : `${cur.account + 1}`, 0)
      value.joinTime = new Date().getTime()
      props.addStaff(value)
      setVisible(false);
    } else {
      // @ts-ignore
      value.name = edited_name.current.state.value
      value.account = editValues.account

      // Dispach编辑行为
      props.editStaff(value)
      setVisible(false)
    }
  };

  const edited_name = useRef(null);

  // 取消弹出框
  const handleCancel = () => {
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
    const { _id } = value
    props.delStaff(_id)
  }

  // 编辑员工触发
  const edit_staff = (value: any) => {
    setVisible(true)
    setPopStaffStyle('编辑员工')
    setEditValues({
          account: value.account,
          name: value.name,
          role: value.role,
          status: value.status
        }
    )
  }

  // 监听拿到最新的修改信息 状态更新立即更改
  useEffect(() => {
    const { role } = editValues
    setSelected([`${role}`])
    // console.log(selected)
    // console.log(editValues)
  }, [editValues])

  // 员工列表数据和事件处理
  useEffect(() => {
    props.togglePage(pageMsg)
    const { list } = props
    const user_List = list.records
    setUserList(user_List)
    //数组长度发生变化后 获取数据 渲染列表
  }, [props.list.total, props.list.page, props.list.size])

  // 修改状态后 部分信息改变 通过memo监听list变化 重新渲染页面
  useMemo(() => {
    const { list } = props
    const user_List = list.records
    setUserList(user_List)
  }, [props.list])


  // 弹框状态管理 fix 状态存储在缓存 解决每次重新加载页面弹框问题
  useEffect(() => {
    const { errorMsg, addStatus, delStatus, editStatus } = props
    const astatus = getStore('addStatus')
    const dstatus = getStore('delStatus')
    const estatus = getStore('editStatus')
    //添加
    if (astatus == addStatus) {
    } else {
      setStore('addStatus', addStatus)
      if (addStatus < 1) message.success('员工添加成功')
      else if (errorMsg && errorMsg.includes('密码')) message.warning('请输入3位数以上的密码')
      else if (errorMsg && errorMsg.includes('姓名')) message.warning('请输入正确的姓名格式')
      else if (errorMsg && errorMsg.includes('注册')) message.warn('此账号已被注册')
    }
    //删除
    if (dstatus == delStatus) {
    } else {
      setStore('delStatus', delStatus)
      if (delStatus < 1) message.success('员工删除成功')
    }
    //修改
    if (estatus == editStatus) {
    } else {
      setStore('editStatus', editStatus)
      if (editStatus < 1) message.success('资料修改成功')
      //清空选中项
      SetSelectValue([])
      // @ts-ignore
      ref.current = []
    }
  }, [props.addStatus, props.delStatus, props.editStatus])

  const [editBtnState, setEditBtnState] = useState(false)
  //选中函数
  const [selectValue, SetSelectValue] = useState([])
  const [barVisible, setBarVisible] = useState('')
  const ref = useRef();
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      SetSelectValue(selectedRows)
      ref.current = selectedRowKeys;
      if (selectedRows.length > 1) setEditBtnState(true)
      else setEditBtnState(false)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    selectedRowKeys: ref.current,
  };
  //异步函数捕捉更新状态
  useEffect(() => {
    SetSelectValue(selectValue)
    if (selectValue.length === 0) setBarVisible('none')
    else setBarVisible('')
  }, [selectValue])
  //捕捉异步pageMsg
  useEffect(() => {
    setPageMsg(pageMsg)
    props.togglePage(pageMsg)
  }, [pageMsg])
  // 搜索后列表刷新
  useEffect(() => {
    const { list } = props
    const order_List = list.records
    setUserList(order_List)
  }, [props.list.records])

  //删除
  function delSelected() {
    // @ts-ignore
    const delAry = selectValue.map(val => val._id)
    // 把多个删除项处理为字符串格式 传给后端处理
    const delIds = delAry.join('-')
    props.delStaff(delIds)
    setBarVisible('none')
  }

  // @ts-ignore
  return (
      <DocumentTitle title="员工管理">
        <ConfigProvider locale={zhCN}>
          <Card title="员工列表"
                extra={
                  <Button type="primary" onClick={() => {
                    setVisible(true)
                    setPopStaffStyle('新增员工')
                  }} style={{ borderRadius: 5 }}>新增</Button>
                }
                headStyle={{}}
                style={{ width: '100%' }}
          >
            {/*<Button style={{ display: barVisible, float: "left", marginRight: 10 }}*/}
            {/*        onClick={() => {*/}
            {/*          console.log(selectValue)*/}
            {/*          edit_staff(selectValue[0])*/}
            {/*        }}*/}
            {/*>*/}
            {/*  编辑*/}
            {/*</Button>*/}
            <TableCheckBox
                delSelected={delSelected}
                barVisible={barVisible}
                editBtn={() => {
                  edit_staff(selectValue[0])
                }}
                editBtnState={editBtnState}
                Search={(value: string) => {
                  setPageMsg({
                    page: 1,
                    pagesize: 10,
                    query: value
                  })
                }}
                title='员工姓名'
            />

            {
              userList &&
              < Table
                  rowKey='_id'
                  bordered
                  columns={columns}
                  dataSource={userList}
                  pagination={false}
                  rowSelection={{ ...rowSelection }}
                  scroll={{ y: 400 }}
              />
            }
            {
              userList &&
              <Paging page={props.list.page} total={props.list.total} fun={(page = 1, pageSize = 10): any => {
                props.togglePage(pageMsg)
                setPageMsg({
                  query: pageMsg.query,
                  page: page,
                  pagesize: pageSize
                })
              }}/>
            }
            {/*新增弹出框*/}
            <Modal
                title={popStaffStyle}
                visible={visible}
                onCancel={handleCancel}
                destroyOnClose
                footer={null}
            >
              <Form name="normal_login" className="login-form" onFinish={handleOk}>
                <Form.Item name="account">
                  {
                    popStaffStyle === '新增员工' &&
                    <Form.Item name="account" style={{ margin: 0 }}
                               initialValue={props.list.records.reduce((pre: any, cur: any) => {
                                 // console.log(pre, cur.account)
                                 return pre > cur.account ? `${pre}` : `${cur.account + 1}`
                               }, 0)}>
                      <Input
                          disabled prefix={<FieldNumberOutlined className="site-form-item-icon"/>}
                          placeholder="工号"/>
                    </Form.Item>
                  }
                  {
                    popStaffStyle === '编辑员工' &&
                    <Form.Item name="account" style={{ margin: 0 }}>
                      <Input
                          defaultValue={editValues.account}
                          disabled prefix={<FieldNumberOutlined className="site-form-item-icon"/>}
                          placeholder="工号"/>
                    </Form.Item>
                  }
                </Form.Item>
                {
                  popStaffStyle === '新增员工' &&
                  <Form.Item name="name" rules={[
                    {
                      required: true,
                      message: '请输入姓名',
                    },
                  ]}>
                    <Input autoFocus={true}
                           prefix={<UserOutlined className="site-form-item-icon"/>}
                           placeholder="请输入2位及以上的姓名"/>
                  </Form.Item>
                }
                {
                  popStaffStyle === '编辑员工' &&
                  <Form.Item name="name" initialValue={editValues.name}>
                    <Input autoFocus={true}
                           defaultValue={editValues.name}
                           ref={edited_name}
                           prefix={<UserOutlined className="site-form-item-icon"/>}
                           placeholder="请输入2位及以上的姓名"/>
                  </Form.Item>
                }
                {
                  popStaffStyle === '新增员工' &&
                  <Form.Item name="password" rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                  ]}>
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="请输入3位及以上的密码"/>
                  </Form.Item>
                }
                <Form.Item name="role" initialValue={popStaffStyle === '编辑员工' ? selected[0] : 'waiter'}>
                  <Radio.Group
                      options={positionOptions}
                      onChange={onChange1}
                      value={selected[0]}
                      optionType="button"
                  />
                </Form.Item>
                <Form.Item name="status" initialValue={popStaffStyle === '编辑员工' ? editValues.status : 1}
                           style={{ marginTop: -10 }}>
                  <Radio.Group>
                    <Radio value={1}>在职</Radio>
                    <Radio value={0}>请假</Radio>
                    <Radio value={-1}>离职</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item style={{ marginBottom: -6 }}>
                  <Space style={{ float: "right" }}>
                    <Button type="default" onClick={handleCancel}>取消</Button>
                    {
                      popStaffStyle === '新增员工' &&
                      <Button type="primary" htmlType="submit"
                              className="login-form-button">添加</Button>
                    }
                    {
                      popStaffStyle === '编辑员工' &&
                      <Button type="primary" htmlType="submit"
                              className="login-form-button">提交</Button>
                    }
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
