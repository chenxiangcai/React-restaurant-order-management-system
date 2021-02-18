import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Button, Card, ConfigProvider, Form, Input, List, message, Modal, Popconfirm, Space } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import DocumentTitle from "react-document-title";
import {
  CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SoundOutlined
} from '@ant-design/icons';
import { Dispatch } from "redux";
import {
  CUSCATEADD_URL,
  CUSCATEDEL_URL, CUSCATEEDIT_URL, CUSCATELIST_URL,
} from "../../../../common/api";
import { connect } from "react-redux";
import { CUSCATEADD, CUSCATEDEL, CUSCATEEDIT, GETCUSCATELIST } from "./action";
import { CateWrap } from './cateWrap-style'
import { getStore, setStore } from "../../../../utils/storage";


interface OwnProps {
  [prop: string]: any

  toggleCusCatePage(value?: object): void

  delCusCate(value: string): void,

  addCusCate(value: object): void,

  editCusCate(value: object): void


}

const mapStateToProps = (state: any) => ({
  list: state.cuscate.list || [],
  addCcateStatus: state.cuscate.addCcateStatus,
  delCcateStatus: state.cuscate.delCcateStatus,
  errorMsgCcate: state.cuscate.errorMsgCcate,
  editCcateStatus: state.cuscate.editCcateStatus
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  delCusCate(value: string) {
    dispatch({
      type: CUSCATEDEL,
      url: CUSCATEDEL_URL,
      data: value
    })
  },
  addCusCate(value: object) {
    dispatch({
      type: CUSCATEADD,
      url: CUSCATEADD_URL,
      data: value
    })
  },
  toggleCusCatePage(value: object) {
    dispatch({
      type: GETCUSCATELIST,
      url: CUSCATELIST_URL,
      data: value
    })
  },
  editCusCate(value: object) {
    dispatch({
      type: CUSCATEEDIT,
      url: CUSCATEEDIT_URL,
      data: value
    })
  }
})

type Props = OwnProps;

interface Cate {
  name: string,
  discount: number,
  _id: string
}

const CusCate: FunctionComponent<Props> = (props) => {
  const [cateList, SetCateList] = useState([])
  const [visible, setVisible] = useState(false);
  const [popCateStyle, setPopCateStyle] = useState('')
  const [editValue, setEditValue] = useState({
    _id: '',
    name: '',
    discount: 0
  })

  //列表显示
  const [pageMsg, setPageMsg] = useState({
    query: '',
    page: 1,
    pagesize: 10
  })

  // 列表数据和事件处理
  useEffect(() => {
    props.toggleCusCatePage(pageMsg)
    console.log(props)
    const { list } = props
    const cate_List = list.records
    SetCateList(cate_List)
    //数组长度发生变化后 获取数据 渲染列表
  }, [props.list.total, props.list.page, props.list.size])

  // 表单提交函数 新增和编辑
  const handleOk = (value: any) => {
    if (popCateStyle === '新增会员类别') {
      console.log(value)
      props.addCusCate(value)
    } else {
      console.log(value)
      value._id = editValue._id
      props.editCusCate(value)
    }
    setVisible(false)
  };

  // 修改菜品信息
  const edit_cate = (val: Cate) => {
    setVisible(true)
    setPopCateStyle('编辑会员类别')
    setEditValue({
      name: val.name,
      discount: val.discount,
      _id: val._id
    })
  }

  //删除分类
  const del_cate = (value: Cate) => {
    const { _id } = value
    props.delCusCate(_id)
  }

  // 取消弹出框
  const handleCancel = () => {
    // todo 取消弹出框确认
    console.log('Clicked cancel button');
    setVisible(false);
  };

  // 修改状态后 部分信息改变 通过memo监听list变化 重新渲染页面
  useMemo(() => {
    const { list } = props
    const catelist = list.records
    SetCateList(catelist)
  }, [props.list])


  // 弹框状态管理 fix 状态存储在缓存 解决每次重新加载页面弹框问题
  useEffect(() => {
    const { errorMsgCcate, addCcateStatus, delCcateStatus, editCcateStatus } = props
    const astatus = getStore('addCcateStatus')
    const dstatus = getStore('delCcateStatus')
    const estatus = getStore('editCcateStatus')
    //添加
    if (astatus == addCcateStatus) {
    } else {
      setStore('addCcateStatus', addCcateStatus)
      if (addCcateStatus < 1) message.success('添加分类成功！')
      else if (errorMsgCcate && errorMsgCcate.includes('存在')) message.warning('此分类已存在')
    }
    //删除
    if (dstatus == delCcateStatus) {
    } else {
      setStore('delCcateStatus', delCcateStatus)
      if (delCcateStatus < 1) message.success('删除分类成功！')
    }
    //修改
    if (estatus == editCcateStatus) {
    } else {
      setStore('editCcateStatus', editCcateStatus)
      if (editCcateStatus < 1) message.success('分类修改成功！')
    }
  }, [props.addCcateStatus, props.delCcateStatus, props.editCcateStatus])

  // @ts-ignore
  const [newList, setList] = []
  //const s = cateList.unshift()
  // @ts-ignore
  //SetCateList()
  return (
      <DocumentTitle title="会员类别">
        <ConfigProvider locale={zhCN}>
          <Card title="会员类别">
            {/*<List>*/}
            {/*  <CateWrap>*/}
            {/*    <Card onClick={() => {*/}
            {/*      setVisible(true)*/}
            {/*      setPopCateStyle('新增会员类别')*/}
            {/*    }}*/}
            {/*          style={{ width: 262, display: "inline-block" }} className={'card'}>*/}
            {/*      <div className='plus'><PlusOutlined/></div>*/}
            {/*    </Card>*/}
            {/*  </CateWrap>*/}
            {/*</List>*/}
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={cateList}
                renderItem={(item: any) => (
                    <List.Item>
                      <CateWrap>
                        <Card
                            key={item.name}
                            className='card'
                            style={{ position: "relative" }}
                        >
                          <div style={{ position: "absolute", right: 8, top: 8 }}>
                            <EditOutlined
                                key="edit"
                                style={{ paddingRight: 4 }}
                                onClick={() => {
                                  edit_cate(item)
                                }}
                            />
                            {
                              <Popconfirm
                                  title="确定要删除此会员分类吗？"
                                  placement="right"
                                  okText="确定"
                                  cancelText="取消"
                                  onConfirm={() => {
                                    del_cate(item)
                                  }}
                              >
                                <CloseOutlined key="del"/>
                              </Popconfirm>
                            }
                          </div>
                          <div style={{ marginTop: -14, fontWeight: 600 }}>{item?.name}</div>
                          <div style={{ textAlign: "center", paddingTop: '8%' }}>
                            <div style={{ color: "red" }}>{item?.discount}折</div>
                          </div>
                        </Card>
                      </CateWrap>
                    </List.Item>
                )}
            />
            <CateWrap>
              <Card onClick={() => {
                setVisible(true)
                setPopCateStyle('新增会员类别')
              }} style={{ width: '24%', height: 120, display: "inline-block" }}>
                <div className='plus'><PlusOutlined/></div>
              </Card>
            </CateWrap>
            <Modal
                title={popCateStyle}
                visible={visible}
                onCancel={handleCancel}
                destroyOnClose
                footer={null}
            >
              <Form onFinish={handleOk}>
                {
                  popCateStyle === '新增会员类别' &&
                  <Form.Item name="name" rules={[
                    {
                      required: true,
                      message: '请输入分类',
                    },
                  ]}>
                    <Input autoFocus={true}
                           prefix={<EditOutlined className="site-form-item-icon"/>}
                           placeholder="请输入类别名称"/>
                  </Form.Item>
                }
                {
                  popCateStyle === '编辑会员类别' &&
                  <Form.Item initialValue={editValue.name} name="name" rules={[
                    {
                      required: true,
                      message: '请输入分类',
                    },
                  ]}>
                    <Input autoFocus={true}
                           prefix={<EditOutlined className="site-form-item-icon"/>}
                           placeholder="请输入类别名称"/>
                  </Form.Item>
                }

                {
                  popCateStyle === '新增会员类别' &&
                  <Form.Item name="discount">
                    <Input placeholder='请输入会员折扣'
                           type={"number"}
                           min={1} max={100}
                           prefix={<SoundOutlined className="site-form-item-icon"/>}/>
                  </Form.Item>
                }
                {
                  popCateStyle === '编辑会员类别' &&
                  <Form.Item initialValue={editValue.discount} name="discount">
                    <Input placeholder='请输入会员折扣'
                           type={"number"}
                           min={1} max={100}
                           prefix={<SoundOutlined className="site-form-item-icon"/>}/>
                  </Form.Item>
                }
                <span>说明：8.5折，请输入85</span>
                <Form.Item>
                  <Space style={{ float: "right", margin: '20px 0 -20px 0' }}>
                    <Button type="default" onClick={handleCancel}>取消</Button>
                    {
                      popCateStyle === '新增会员类别' &&
                      <Button type="primary" htmlType="submit"
                              className="login-form-button">添加</Button>
                    }
                    {
                      popCateStyle === '编辑会员类别' &&
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

export default connect(mapStateToProps, mapDispatchToProps)(CusCate);
