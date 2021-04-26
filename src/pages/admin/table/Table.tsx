import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { QR_URL, TABLE_URL, TABLEADD_URL, TABLEDEL_URL, TABLEEDIT_URL } from "../../../common/api";
import { ADDTABLE, DELTABLE, EDITTABLE, GETQRCODE, GETTABLE, } from "./action";
import { Button, Card, Descriptions, Drawer, Form, Input, List, message, Modal, Radio, Select, Space } from "antd";
import { TableWrap } from "./TableWrap";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FieldNumberOutlined
} from "@ant-design/icons";
import DocumentTitle from "react-document-title";
import { getStore, setStore } from "../../../utils/storage";

const { Option } = Select;
const { confirm } = Modal;

interface OwnProps {
  [prop: string]: any

  getQR(val: number | string): void

  getTable(): void

  addTable(value: object): void

  editTable(value: object): void

  delTable(value: string): void

}

type Props = OwnProps;

const mapStateToProps = (state: any) => ({
  url: state.table.url,
  urlArray: state.table.urlArray,
  tableList: state.table.tableList,
  staffList: state.table.staffList,
  addTStatus: state.table.addTStatus,
  delTStatus: state.table.delTStatus,
  errorMsgT: state.table.errorMsgT,
  editTStatus: state.table.editTStatus
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getQR(value: number | string) {
    dispatch({
      type: GETQRCODE,
      url: QR_URL,
      data: value
    })
  },
  getTable() {
    dispatch({
      type: GETTABLE,
      url: TABLE_URL,
    })
  },
  addTable(value: object) {
    dispatch({
      type: ADDTABLE,
      url: TABLEADD_URL,
      data: value
    })
  },
  editTable(value: object) {
    dispatch({
      type: EDITTABLE,
      url: TABLEEDIT_URL,
      data: value
    })
  },
  delTable(value: string) {
    dispatch({
      type: DELTABLE,
      url: TABLEDEL_URL,
      data: value
    })
  },
})

interface TableDetails {
  _id: '',
  status: undefined,
  tableID: undefined,
  staff: ''
}

const Table: FunctionComponent<Props> = (props) => {

  //model弹框
  const [visible, setVisible] = useState(false);
  const [popTableStyle, setpopTableStyle] = useState('')
  const [editValues, setEditValues] = useState({ tableID: 0, staff: '', role: '', status: -9 })

  //drawer弹框
  const [DrawerVisible, setDrawVisible] = useState(false)

  //餐桌详情
  const [tableDetail, setTableDetail] = useState({
    _id: '',
    status: undefined,
    tableID: undefined,
    staff: '',
    staffId: '',
    canSeat: undefined
  })

  //下载所有二维码
  function downloadAllQR() {
    props.getQR('all')
    downloadQR(props.urlArray)
  }

  function downloadQR(array: object[]) {
    console.log(array)
    array.forEach((val: any, index: number) => {
      setTimeout(() => {
        const qr = document.createElement('a');
        qr.href = `data:image/png;base64,${val.url}`
        qr.download = `${val.id}号餐桌二维码`
        document.body.appendChild(qr);
        qr.click()
        document.body.removeChild(qr);

      }, 500 * index)
    })
  }

  function onDrawerClose() {
    setDrawVisible(false)
    setTableDetail({ _id: '', status: undefined, tableID: undefined, staff: '', staffId: '', canSeat: undefined },)
  }

  function onDrawerOpen(item: TableDetails) {
    const { tableID } = item
    // @ts-ignore
    props.getQR(tableID)

    let items = JSON.parse(JSON.stringify(item))
    items.staffId = items.staff
    //员工id转换为name
    items.staff = staffList.find((value: any) => value._id === items.staff).name
    console.log(items)
    setTableDetail(items)
    setDrawVisible(true)
  }

  //点击编辑
  function showEdit(item: object) {
    setVisible(true)
    setpopTableStyle('编辑餐桌')
    console.log(item)
  }

  //状态提示管理
  useEffect(() => {
    const { errorMsgT, addTStatus, delTStatus, editTStatus } = props
    const aastatus = getStore('addTStatus')
    const ddstatus = getStore('delTStatus')
    const eestatus = getStore('editTStatus')
    //添加
    if (aastatus == addTStatus) {
    } else {
      console.log(props)
      console.log(errorMsgT)
      setStore('addTStatus', addTStatus)
      if (addTStatus < 1) message.success('餐桌添加成功')
      else if (errorMsgT && errorMsgT.includes('存在')) message.info('此餐桌已存在！')
    }
    //删除
    if (ddstatus == delTStatus) {
    } else {
      setStore('delTStatus', delTStatus)
      if (delTStatus < 1) message.success('餐桌删除成功')
      setVisible(false)
      setDrawVisible(false)
    }
    //修改
    if (eestatus == editTStatus) {
    } else {
      setStore('editTStatus', editTStatus)
      if (editTStatus < 1) message.success('餐桌信息修改成功')
      setVisible(false)
      setDrawVisible(false)
    }
  }, [props])

  //获取,餐桌
  useEffect(() => {
    props.getTable()
  }, [])

  // 取消弹出框
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
    setpopTableStyle('')
  };
  // 表单提交函数 新增和编辑
  const handleOk = (value: any) => {
    if (popTableStyle === '新增餐桌') {
      console.log(value)
      props.addTable(value)
      setVisible(false);
      return
    }
    console.log(value)
    value._id = tableDetail._id
    // value.tableID = tableDetail.tableID
    //判断是否更改了当前员工
    if (value.staff === tableDetail.staff) value.staff = tableDetail.staffId
    props.editTable(value)
    setVisible(false)
  };

  function showConfirm() {
    confirm({
      type: 'error',
      title: '确定要删除这张餐桌吗?',
      icon: <ExclamationCircleOutlined/>,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        props.delTable(tableDetail._id)
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const { url, tableList, staffList } = props
  // console.log(props)

  // @ts-ignore
  return (
      <DocumentTitle title="餐桌管理">

        <TableWrap>
          {/*<div>*/}
          {/*  <a href={`data:image/png;base64,${url}`} download={''}>*/}
          {/*    <img width={200} height={200} src={`data:image/png;base64,${url}`} alt='图片走丢了...'/>*/}
          {/*  </a>*/}
          {/*</div>*/}
          <Card title='餐桌管理' extra={
            <div>
              <Button type="primary"
                      style={{ borderRadius: 6 }}
                      onClick={() => {
                        setVisible(true)
                        setpopTableStyle('新增餐桌')
                      }}
              >新增</Button>
            </div>
          }>
            <Button
                style={{ marginBottom: 10 }}
                onClick={downloadAllQR}
                icon={<DownloadOutlined/>}>
              批量下载二维码
            </Button>
            <List
                grid={{ gutter: 16, column: 8 }}
                dataSource={tableList}
                renderItem={(item: any) => (
                    <List.Item>
                      {
                        item.status === 0 &&
                        <Card hoverable style={{ backgroundColor: '#f1f2f6' }}
                              className='card'
                              onClick={() => onDrawerOpen(item)}
                        >
                          <h2>{item.tableID}</h2>
                          <span>空位 {item.canSeat}人</span>
                        </Card>
                      }
                      {
                        item.status === 1 &&
                        <Card onClick={() => onDrawerOpen(item)}
                              hoverable style={{ backgroundColor: '#F9F5E9' }} className='card'>
                          <h2>{item.tableID}</h2>
                          <span>占用 {item.canSeat}人</span>
                        </Card>
                      }
                    </List.Item>
                )}
            />
          </Card>

          {/*新增弹出框*/}
          <Modal
              title={popTableStyle}
              visible={visible}
              onCancel={handleCancel}
              destroyOnClose
              footer={null}
          >
            <Form name="normal_login" className="login-form" onFinish={handleOk}>
              <Form.Item>
                {
                  popTableStyle === '新增餐桌' &&
                  <>
                    <Form.Item name="tableID" style={{ margin: 0 }}>
                      <Input type={"number"} prefix={<FieldNumberOutlined className="site-form-item-icon"/>}
                             placeholder="餐桌号"/>
                    </Form.Item>
                    <Form.Item name='canSeat' rules={[
                      {
                        required: true,
                        message: '请输入可容纳人数',
                      },
                    ]} style={{ marginTop: 20 }}>
                      <Input type={"number"} autoFocus
                             placeholder="可容纳人数"/>
                    </Form.Item>
                    <Form.Item name="staff" rules={[
                      {
                        required: true,
                        message: '请选择餐桌负责人',
                      },
                    ]}>
                      <Select
                          showSearch
                          style={{ width: '100%', marginTop: -10 }}
                          placeholder="责任员工"
                          optionFilterProp="children"
                      >
                        {
                          staffList && staffList.map((val: any) => <Option value={val._id}
                                                                           key={val._id}>{val.name}</Option>)
                        }
                      </Select>
                    </Form.Item>
                  </>
                }
                {
                  popTableStyle === '编辑餐桌' &&
                  <>
                    <Form.Item name="tableID" initialValue={tableDetail.tableID}>
                      <Input
                          type={"number"}
                          prefix={<FieldNumberOutlined className="site-form-item-icon"/>}
                          placeholder="餐桌号"/>
                    </Form.Item>
                    <Form.Item initialValue={tableDetail.canSeat} name='canSeat' rules={[
                      {
                        required: true,
                        message: '请输入可容纳人数',
                      },
                    ]} style={{ marginTop: 20 }}>
                      <Input type={"number"} autoFocus
                             placeholder="可容纳人数"/>
                    </Form.Item>
                    <Form.Item name="staff" initialValue={tableDetail.staff}>
                      <Select
                          showSearch
                          style={{ width: '100%', marginTop: -10 }}
                          placeholder="责任员工"
                          optionFilterProp="children"
                      >
                        {
                          staffList && staffList.map((val: any) => <Option value={val._id}
                                                                           key={val._id}>{val.name}</Option>)
                        }
                      </Select>
                    </Form.Item>
                  </>
                }
              </Form.Item>

              <Form.Item name="status" initialValue={popTableStyle === '编辑餐桌' ? tableDetail.status : 1}
                         style={{ marginTop: -30 }}>
                <Radio.Group>
                  <Radio value={1}>空闲</Radio>
                  <Radio value={0}>占用</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item style={{ marginBottom: -6 }}>
                <Space style={{ float: "right" }}>
                  <Button type="default" onClick={handleCancel}>取消</Button>
                  {
                    popTableStyle === '新增餐桌' &&
                    <Button type="primary" htmlType="submit"
                            className="login-form-button">添加</Button>
                  }
                  {
                    popTableStyle === '编辑餐桌' &&
                    <Button type="primary" htmlType="submit"
                            className="login-form-button">提交</Button>
                  }
                </Space>
              </Form.Item>
            </Form>
          </Modal>

          {/* 详情抽屉框 */}
          <Drawer
              title="餐桌详情"
              placement={'right'}
              closable={false}
              width={700}
              onClose={onDrawerClose}
              visible={DrawerVisible}
          >
            <div style={{ position: 'absolute', top: 14, right: 24 }}>
              <Button style={{ borderRadius: 6, marginRight: 10 }} type="primary" onClick={() => showEdit(tableDetail)}>
                <EditOutlined/>
              </Button>
              <Button style={{ borderRadius: 6 }} onClick={showConfirm} danger type="primary">
                <DeleteOutlined/>
              </Button>
            </div>

            <Descriptions>
              <Descriptions.Item label="餐桌号">{tableDetail.tableID}</Descriptions.Item>
              <Descriptions.Item label="使用状态">
                {
                  tableDetail.status === 0 && '使用中'
                }
                {
                  tableDetail.status === 1 && '空闲中'
                }
              </Descriptions.Item>
              <Descriptions.Item label="负责人">{tableDetail.staff}</Descriptions.Item>
            </Descriptions>

            <div style={{ position: "relative" }}>
              <div>餐桌二维码:</div>

              <img width={200} height={200} style={{ marginLeft: 220 }} src={`data:image/png;base64,${url}`}
                   alt='图片走丢了...'/>
              <div>
                <a href={`data:image/png;base64,${url}`} download={`${tableDetail.tableID}号餐桌二维码`}>
                  <Button style={{ borderRadius: 6, position: "absolute", left: 280, bottom: -50 }}
                          icon={<DownloadOutlined/>}>
                    下载
                  </Button>
                </a>
              </div>
            </div>
          </Drawer>
        </TableWrap>
      </DocumentTitle>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
