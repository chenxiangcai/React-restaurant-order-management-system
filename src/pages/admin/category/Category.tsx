import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import DocumentTitle from "react-document-title";
import { Button, Card, ConfigProvider, Form, Input, message, Modal, Popconfirm, Space, Table } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { connect } from 'react-redux'
import { Dispatch } from "redux";
import { CATEADD, CATEDEL, CATEEDIT, GETCATELISTS } from "./action";
import { ADDCATELIST_URL, DELCATE_URL, EDITCATE_URL, GETCATELIST_URL } from "../../../common/api";
import moment from 'moment';
import { getStore, setStore } from "../../../utils/storage";
import Paging from "../../../components/Paging";
import TableCheckBox from "../../../components/TableCheckBox";

interface Categories {
  _id: string,
  whoAdd: string,
  foodTypeName: string
}

interface Prop {
  [prop: string]: any,

  addCate(value: object): void

  editCate(value: object): void

  delCate(vale: string): void

  toggleCatePage(value?: object): void
}

type Props = Prop;

const mapStateToProps = (state: any) => ({
  list: state.cate.categoryList || [],
  addCateStatus: state.cate.addCateStatus,
  delCateStatus: state.cate.delCateStatus,
  errorMsgCate: state.cate.errorMsgCate,
  editCateStatus: state.cate.editCateStatus
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  delCate(value: string) {
    dispatch({
      type: CATEDEL,
      url: DELCATE_URL,
      data: value
    })
  },
  addCate(value: object) {
    dispatch({
      type: CATEADD,
      url: ADDCATELIST_URL,
      data: value
    })
  },
  toggleCatePage(value: object) {
    dispatch({
      type: GETCATELISTS,
      url: GETCATELIST_URL,
      data: value
    })
  },
  editCate(value: object) {
    dispatch({
      type: CATEEDIT,
      url: EDITCATE_URL,
      data: value
    })
  }
})


const Category: FunctionComponent<Props> = (props) => {

  // 表格列
  const columns: ColumnsType<Categories> = [
    {
      title: '分类',
      dataIndex: 'foodTypeName',
      key: 'foodTypeName',
    },
    {
      title: '关联菜品数量',
      key: 'contactnum',
      dataIndex: 'contactnum',
    },
    // {
    //   title: '创建人',
    //   key: 'whoAdd',
    //   dataIndex: 'whoAdd',
    // },
    {
      title: '创建时间',
      key: 'createAt',
      dataIndex: 'createAt',
      render: (text => (
          <>
            {
              moment(text).format('YYYY-MM-DD')
            }
          </>
      ))
    },
    /*{
      title: '操作',
      key: '_id',
      width: 300,
      render: (text, records, index) => (
          <Space>
            <Button type="primary" onClick={() => {
              edit_cate(records)
            }} shape="circle" icon={<EditOutlined/>} size={"small"}/>
            {
              <Popconfirm
                  title="确定要删除此分类吗？"
                  placement="top"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => {
                    del_cate(records)
                  }}
              >
                <Button type="primary" danger shape="circle" icon={<DeleteOutlined/>} size={"small"}/>
              </Popconfirm>
            }
          </Space>
      ),
    },*/
  ];

  const [categoryList, SetCategoryList] = useState([])
  const [visible, setVisible] = useState(false);
  const [popCateStyle, setPopCateStyle] = useState('')
  const userInfo = JSON.parse(getStore('userInfo'))
  const [editValue, SetEditValue] = useState({
    _id: '',
    whoAdd: '',
    foodTypeName: ''
  })
  //列表显示
  const [pageMsg, setPageMsg] = useState({
    query: '',
    page: 1,
    pagesize: 10
  })

  // 取消弹出框
  const handleCancel = () => {
    // todo 取消弹出框确认
    console.log('Clicked cancel button');
    setVisible(false);
  };

  // 表单提交函数 新增和编辑
  const handleOk = (value: any) => {
    if (popCateStyle === '新增分类') {
      console.log(value)
      props.addCate(value)
    } else {
      value._id = editValue._id
      props.editCate(value)
    }
    setVisible(false)
  };
  //修改分类
  const edit_cate = (records: Categories) => {
    setVisible(true)
    setPopCateStyle('编辑分类')
    SetEditValue({
      _id: records?._id,
      foodTypeName: records?.foodTypeName,
      whoAdd: records?.whoAdd
    })
  }
  // 删除触发
  const del_cate = (value: Categories) => {
    const { _id } = value
    props.delCate(_id)
  }

  // 列表数据和事件处理
  useEffect(() => {
    props.toggleCatePage(pageMsg)
    const { list } = props
    const cates = list.records
    SetCategoryList(cates)
    //数组长度发生变化后 获取数据 渲染列表
  }, [props.list.total, props.list.page, props.list.size])

  // 修改状态后 部分信息改变 通过memo监听list变化 重新渲染页面
  useMemo(() => {
    const { list } = props
    const cateList = list.records
    SetCategoryList(cateList)
  }, [props.list])

  // 弹框状态管理 fix 状态存储在缓存 解决每次重新加载页面弹框问题
  useEffect(() => {
    const { errorMsgCate, addCateStatus, delCateStatus, editCateStatus } = props
    const aastatus = getStore('addCateStatus')
    const ddstatus = getStore('delCateStatus')
    const eestatus = getStore('editCateStatus')
    console.log(eestatus)
    //添加
    if (aastatus == addCateStatus) {
    } else {
      console.log(props)
      console.log(errorMsgCate)
      setStore('addCateStatus', addCateStatus)
      if (addCateStatus < 1) message.success('分类添加成功')
      else if (errorMsgCate && errorMsgCate.includes('存在')) message.warn('此分类已存在')
    }
    //删除
    if (ddstatus == delCateStatus) {
    } else {
      setStore('delCateStatus', delCateStatus)
      if (delCateStatus < 1) message.success('分类删除成功')
    }
    //修改
    if (eestatus == editCateStatus) {
    } else {
      setStore('editCateStatus', editCateStatus)
      console.log(props)
      if (editCateStatus < 1) {
        message.success('分类修改成功')
        //清空选中项
        SetSelectValue([])
        // @ts-ignore
        ref.current = []
      } else if (errorMsgCate && errorMsgCate.includes('存在')) message.warn('此分类已存在')
    }
  }, [props])

  //选中函数
  const [selectValue, SetSelectValue] = useState([])
  const [editBtnState, setEditBtnState] = useState(false)
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
    props.toggleCatePage(pageMsg)
  }, [pageMsg])
  // 搜索后列表刷新
  useEffect(() => {
    const { list } = props
    const order_List = list.records
    SetCategoryList(order_List)
  }, [props.list.records])

  //删除
  function delSelected() {
    // @ts-ignore
    const delAry = selectValue.map(val => val._id)
    // 把多个删除项处理为字符串格式 传给后端处理
    const delIds = delAry.join('-')
    props.delCate(delIds)
    setBarVisible('none')
  }

  return (
      <DocumentTitle title="菜品 > 分类">
        <ConfigProvider locale={zhCN}>
          <Card title="菜品分类" extra={
            <Button onClick={() => {
              setVisible(true)
              setPopCateStyle('新增分类')
            }} type="primary">
              新增
            </Button>
          }
                style={{ width: '100%' }}
          >
            <TableCheckBox
                delSelected={delSelected}
                barVisible={barVisible}
                editBtn={() => {
                  edit_cate(selectValue[0])
                }}
                editBtnState={editBtnState}
                Search={(value: string) => {
                  setPageMsg({
                    page: 1,
                    pagesize: 10,
                    query: value
                  })
                }}
                title='分类名'/>

            {
              categoryList && <Table
                  rowKey='_id'
                  bordered
                  columns={columns}
                  dataSource={categoryList}
                  pagination={false}
                  rowSelection={rowSelection}
              />
            }
            {
              categoryList &&
              <Paging page={props.list.page} total={props.list.total} fun={(page = 1, pageSize = 10): any => {
                props.toggleCatePage(pageMsg)
                setPageMsg({
                  query: pageMsg.query,
                  page: page,
                  pagesize: pageSize
                })
              }}/>
            }
            <Modal
                title={popCateStyle}
                visible={visible}
                onCancel={handleCancel}
                destroyOnClose
                footer={null}
            >
              <Form className="login-form" onFinish={handleOk}>

                {
                  popCateStyle === '新增分类' &&
                  <Form.Item name="foodTypeName" rules={[
                    {
                      required: true,
                      message: '请输入分类',
                    },
                  ]}>
                    <Input autoFocus={true}
                           prefix={<EditOutlined className="site-form-item-icon"/>}
                           placeholder="请输入分类名称"/>
                  </Form.Item>
                }
                {
                  popCateStyle === '编辑分类' &&
                  <Form.Item name="foodTypeName" initialValue={editValue.foodTypeName} rules={[
                    {
                      required: true,
                      message: '请输入分类',
                    },
                  ]}>
                    <Input autoFocus={true}
                           prefix={<EditOutlined className="site-form-item-icon"/>}
                           placeholder="请输入分类名称"/>
                  </Form.Item>
                }

                {
                  popCateStyle === '新增分类' &&
                  <Form.Item name="whoAdd" initialValue={userInfo.name}>
                    <Input disabled
                           prefix={<UserOutlined className="site-form-item-icon"/>}/>
                  </Form.Item>
                }
                {
                  popCateStyle === '编辑分类' &&
                  <Form.Item name="whoAdd" initialValue={userInfo.name}>
                    <Input disabled
                           prefix={<UserOutlined className="site-form-item-icon"/>}/>
                  </Form.Item>
                }


                <Form.Item style={{ marginBottom: 0 }}>
                  <Space style={{ float: "right" }}>
                    <Button type="default" onClick={handleCancel}>取消</Button>
                    {
                      popCateStyle === '新增分类' &&
                      <Button type="primary" htmlType="submit"
                              className="login-form-button">添加</Button>
                    }
                    {
                      popCateStyle === '编辑分类' &&
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);
