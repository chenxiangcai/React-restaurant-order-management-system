import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  ConfigProvider,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import Paging from "../../../../components/Paging";
import DocumentTitle from "react-document-title";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Dispatch } from "redux";
import {
  CUSADD_URL,
  CUSDEL_URL, CUSEDIT_URL,
  CUSLIST_URL,
} from "../../../../common/api";
import { connect } from "react-redux";
import { CUSADD, CUSDEL, CUSEDIT, GETCUSLIST } from "./action";
import { getStore, setStore } from "../../../../utils/storage";
import TableCheckBox from "../../../../components/TableCheckBox";

const { Option } = Select;

interface OwnProps {
  [prop: string]: any

  toggleCusPage(value?: object): void

  delCus(value: string): void,

  addCus(value: object): void,

  editCus(value: object): void
}

type Props = OwnProps;

interface Cus {
  _id: string,
  name: string,
  telephone: number,
  xftimes: number,
  xftotal: number,
  status: number,
  level: {
    name: string,
    discount: number,
    _id: string
  }
}

const mapStateToProps = (state: any) => ({
  list: state.cus.list || [],
  cateList: state.cus.cateList,
  addCStatus: state.cus.addCStatus,
  delCStatus: state.cus.delCStatus,
  errorMsgC: state.cus.errorMsgC,
  editCStatus: state.cus.editCStatus
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  delCus(value: string) {
    dispatch({
      type: CUSDEL,
      url: CUSDEL_URL,
      data: value
    })
  },
  addCus(value: object) {
    dispatch({
      type: CUSADD,
      url: CUSADD_URL,
      data: value
    })
  },
  toggleCusPage(value: object) {
    dispatch({
      type: GETCUSLIST,
      url: CUSLIST_URL,
      data: value
    })
  },
  editCus(value: object) {
    dispatch({
      type: CUSEDIT,
      url: CUSEDIT_URL,
      data: value
    })
  }
})

const CusList: FunctionComponent<Props> = (props) => {

      const [cusList, setCusList] = useState([])
      const [visible, setVisible] = useState(false);
      const [popCusStyle, setPopCusStyle] = useState('')
      const [editValue, setEditValue] = useState({
        _id: '',
        name: '',
        level: '',
        status: 0,
        telephone: 0
      })

      // 表格列
      const columns: ColumnsType<Cus> = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '会员类别',
          key: 'level',
          dataIndex: 'level',
          render: (level: any) => <>{level?.name}</>,
        },
        {
          title: '折扣',
          key: 'level',
          dataIndex: 'level',
          render: (level: any) => <>{level?.discount}</>,
        },
        {
          title: '消费次数',
          key: 'xftimes',
          dataIndex: 'xftimes',
        },
        {
          title: '消费金额',
          key: 'xftotal',
          dataIndex: 'xftotal',
        },
        {
          title: '手机号码',
          key: 'telephone',
          dataIndex: 'telephone',
        },
        {
          title: '状态',
          key: 'status',
          dataIndex: 'status',
          render: (status: any) => (
              <>
                {
                  status === 1 && '正常'
                }
                {
                  status === 0 && '挂失'
                }
                {
                  status === -1 && '停用'
                }
              </>
          ),
        },
        /*{
          title: '操作',
          key: '_id',
          render: (text, records, index) => (
              <Space>
                <Button type="primary" onClick={() => {
                  edit_cus(records)
                }} shape="circle" icon={<EditOutlined/>} size={"small"}/>
                {
                  <Popconfirm
                      title="确定要删除此会员吗？"
                      placement="top"
                      okText="确定"
                      cancelText="取消"
                      onConfirm={() => {
                        del_cus(records)
                      }}
                  >
                    <Button type="primary" danger shape="circle" icon={<DeleteOutlined/>} size={"small"}/>
                  </Popconfirm>
                }
              </Space>
          ),
        },*/
      ];

      // 取消弹出框
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
      };

      // 修改信息
      const edit_cus = (records: Cus) => {
        console.log(records)
        setVisible(true)
        setPopCusStyle('编辑会员')
        setEditValue({
          _id: records._id,
          name: records.name,
          level: records.level._id,
          telephone: records.telephone,
          status: records.status
        })
      }

      // 删除触发
      const del_cus = (value: Cus) => {
        const { _id } = value
        props.delCus(_id)
      }


      // 表单提交函数 新增和编辑
      const handleOk = (value: any) => {
        if (popCusStyle === '新增会员') {
          props.addCus(value)
          setVisible(false)
        } else {
          value._id = editValue._id
          console.log(value)
          props.editCus(value)
          setVisible(false)
        }
      }
      //列表显示
      const [pageMsg, setPageMsg] = useState({
        query: '',
        page: 1,
        pagesize: 10
      })
      useEffect(() => {
        props.toggleCusPage(pageMsg)
        const { list } = props
        const cus_List = list.records
        setCusList(cus_List)
        //数组长度发生变化后 获取数据 渲染列表
      }, [props.list.total, props.list.page, props.list.size])

      // 修改状态后 部分信息改变 通过memo监听list变化 重新渲染页面
      useMemo(() => {
        const { list } = props
        const cusList = list.records
        setCusList(cusList)
      }, [props.list])

      // 弹框状态管理 fix 状态存储在缓存 解决每次重新加载页面弹框问题
      useEffect(() => {
            const { errorMsgC, addCStatus, delCStatus, editCStatus } = props
            const astatus = getStore('addCStatus')
            const dstatus = getStore('delCStatus')
            const estatus = getStore('editCStatus')
            //添加
            if (astatus == addCStatus) {
            } else {
              setStore('addCStatus', addCStatus)
              if (addCStatus < 1) message.success('会员添加成功！')
              else if (errorMsgC && errorMsgC.includes('存在')) message.warning('此会员账号已存在')
            }
            //删除
            if (dstatus == delCStatus) {
            } else {
              setStore('delCStatus', delCStatus)
              if (delCStatus < 1) message.success('会员删除成功！')
            }
            //修改
            if (estatus == editCStatus) {
            } else {
              setStore('editCStatus', editCStatus)
              if (editCStatus < 1) message.success('资料修改成功！')
            }
          }, [props.addCStatus, props.delCStatus, props.editCStatus]
      )

//选中函数
      const [selectValue, SetSelectValue] = useState([])
      const [barVisible, setBarVisible] = useState('')
      const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
          SetSelectValue(selectedRows)
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
          console.log(selected, selectedRows, changeRows);
        },
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
        props.toggleCusPage(pageMsg)
      }, [pageMsg])
      // 搜索后列表刷新
      useEffect(() => {
        const { list } = props
        const order_List = list.records
        setCusList(order_List)
      }, [props.list.records])

      //删除
      function delSelected() {
        // @ts-ignore
        const delAry = selectValue.map(val => val._id)
        // 把多个删除项处理为字符串格式 传给后端处理
        const delIds = delAry.join('-')
        props.delCus(delIds)
        setBarVisible('none')
      }

      return (
          <DocumentTitle title="会员 > 资料">
            <ConfigProvider locale={zhCN}>
              <Card title="会员档案"
                    extra={
                      <Button type="primary" onClick={() => {
                        setVisible(true)
                        setPopCusStyle('新增会员')
                      }}>新增</Button>
                    }
                    style={{ width: '100%' }}
              >
                <TableCheckBox
                    delSelected={delSelected}
                    barVisible={barVisible}
                    editBtn={() => {
                      edit_cus(selectValue[0])
                    }}
                    Search={(value: string) => {
                      setPageMsg({
                        page: 1,
                        pagesize: 10,
                        query: value
                      })
                    }}
                    title='手机号码'
                />

                {
                  cusList &&
                  <Table
                      rowKey='_id'
                      bordered
                      columns={columns}
                      dataSource={cusList}
                      pagination={false}
                      rowSelection={rowSelection}
                  />
                }
                {
                  cusList &&
                  <Paging page={props.list.page} total={props.list.total} fun={(page = 1, pageSize = 10): any => {
                    props.toggleCusPage(pageMsg)
                    setPageMsg({
                      query: pageMsg.query,
                      page: page,
                      pagesize: pageSize
                    })
                  }}/>
                }
                <Modal
                    title={popCusStyle}
                    visible={visible}
                    onCancel={handleCancel}
                    destroyOnClose
                    footer={null}
                >
                  <Form onFinish={handleOk}>
                    {
                      popCusStyle === '新增会员' &&
                      <Form.Item label={'姓名'} name="name" rules={[
                        {
                          required: true,
                          message: '请输入姓名',
                        },
                      ]}>
                        <Input autoFocus={true} placeholder="姓名"/>
                      </Form.Item>
                    }
                    {
                      popCusStyle === '编辑会员' &&
                      <Form.Item initialValue={editValue.name} label={'姓名'} name="name" rules={[
                        {
                          required: true,
                          message: '请输入姓名',
                        },
                      ]}>
                        <Input autoFocus={true} placeholder="姓名"/>
                      </Form.Item>
                    }

                    {
                      popCusStyle === '新增会员' &&
                      <Form.Item label={'手机'} name="telephone" rules={[
                        {
                          required: true,
                          message: '请输入手机号码',
                        },
                      ]}>
                        <Input type={"number"} placeholder="手机号码"/>
                      </Form.Item>
                    }
                    {
                      popCusStyle === '编辑会员' &&
                      <Form.Item initialValue={editValue.telephone} label={'手机'} name="telephone" rules={[
                        {
                          required: true,
                          message: '请输入手机号码',
                        },
                      ]}>
                        <Input type={"number"} placeholder="手机号码"/>
                      </Form.Item>
                    }
                    {
                      popCusStyle === '新增会员' &&
                      <Form.Item
                          name="level"
                          label="分类"
                          rules={[{ required: true, message: '请选择分类' }]}
                      >
                        <Select placeholder="会员类别">
                          {
                            props.cateList &&
                            props.cateList.map((value: any) => (
                                <Option value={value._id}
                                        key={value._id}>
                                  {value.name}
                                </Option>
                            ))
                          }
                        </Select>
                      </Form.Item>
                    }
                    {
                      popCusStyle === '编辑会员' &&
                      <Form.Item
                          initialValue={editValue.level}
                          name="level"
                          label="分类"
                          rules={[{ required: true, message: '请选择分类' }]}
                      >
                        <Select placeholder="会员类别">
                          {
                            props.cateList &&
                            props.cateList.map((value: any) => (
                                <Option value={value._id}
                                        key={value._id}>
                                  {value.name}
                                </Option>
                            ))
                          }
                        </Select>
                      </Form.Item>
                    }
                    {
                      popCusStyle === '新增会员' &&
                      <Form.Item initialValue={1} label={'状态'} style={{ marginLeft: 10 }} name="status">
                        <Select placeholder='状态'>
                          <Option value={1}>正常</Option>
                          <Option value={0}>挂失</Option>
                          <Option value={-1}>停用</Option>
                        </Select>
                      </Form.Item>
                    }
                    {
                      popCusStyle === '编辑会员' &&
                      <Form.Item initialValue={editValue.status} label={'状态'} style={{ marginLeft: 10 }} name="status">
                        <Select placeholder='状态'>
                          <Option value={1}>正常</Option>
                          <Option value={0}>挂失</Option>
                          <Option value={-1}>停用</Option>
                        </Select>
                      </Form.Item>
                    }
                    <Form.Item style={{ marginBottom: 4 }}>
                      <Space style={{ float: "right" }}>
                        <Button type="default" onClick={handleCancel}>取消</Button>
                        {
                          popCusStyle === '新增会员' &&
                          <Button type="primary" htmlType="submit">添加</Button>
                        }
                        {
                          popCusStyle === '编辑会员' &&
                          <Button type="primary" htmlType="submit">提交</Button>
                        }
                      </Space>
                    </Form.Item>
                  </Form>
                </Modal>
              </Card>
            </ConfigProvider>
          </DocumentTitle>
      );
    }
;

export default connect(mapStateToProps, mapDispatchToProps)(CusList);
