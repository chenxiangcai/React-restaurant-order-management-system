import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Button, Card, Form, Input, List, Modal, Popconfirm, Select, Space, Table, Tag } from "antd";
import moment from "moment";
import { WEBSOCKET_URL, WORDERADD_URL, WORDEREDIT_URL, WORDERLIST_URL } from "../../../common/api";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { WGETORDERLIST, WORDERADD, WORDEREDIT } from "./actions";
import { CheckOutlined, DeleteOutlined, MinusOutlined } from "@ant-design/icons";
import { Wrap } from "./Wrap";
import DocumentTitle from "react-document-title";

const { Option } = Select;

interface OwnProps {
  [prop: string]: any

  getOrderList(): void,

  updateOrder(value: object): void,

  addDish(value: object): void

}

type Props = OwnProps;
const mapStateToProps = (state: any) => ({
  orderlist: state.waiterOrder.orderlist,
  dishlist: state.waiterOrder.dishlist
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getOrderList() {
    dispatch({
      type: WGETORDERLIST,
      url: WORDERLIST_URL,
    })
  },
  updateOrder(value: object) {
    dispatch({
      type: WORDEREDIT,
      url: WORDEREDIT_URL,
      data: value
    })
  },
  addDish(value: object) {
    dispatch({
      type: WORDERADD,
      url: WORDERADD_URL,
      data: value
    })
  }
})

const WaiterOrder: FunctionComponent<Props> = (props) => {
  const [orderList, setOrderList] = useState([])
  const [dishlist, setDishList] = useState([])
  const [tableID, setTableID] = useState(0)

  const columns = [
    {
      title: '菜名',
      dataIndex: 'name',
      key: 'name',
      width: 400,
      render: (text: any, record: any) => (
          <Select
              showSearch
              bordered={false}
              style={{ width: 200 }}
              placeholder="请选择一个菜品"
              optionFilterProp="children"
              onClick={() => {
                onClick(record)
              }}
              onBlur={onSelectBlur}
              onChange={onNameChange}
              defaultValue={text}
              filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
          >
            {
              dishlist && dishlist.map((val: any) =>
                  <Option key={val._id} value={val._id}>{val.name}</Option>)
            }
          </Select>
      )
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
      render: (text: any, record: any) => (
          <div className='div'>
            <input
                onChange={(e) => {
                  numChange(record, e.target.value)
                }}
                onBlur={onNumBlur}
                value={text || ''}
                className='input'
                type="number"
                placeholder="菜品数量"/>
            <span className='span'/>
          </div>
      )
    },
    {
      title: '出餐状态',
      dataIndex: 'status',
      key: 'status',
      render: ((text: number, record: any) => (text === 1 ? <CheckOutlined style={{ color: "green" }}/> :
          <MinusOutlined style={{ color: "red" }}/>))
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'tableID',
      render: (text: any, record: any) => (
          <Space>
            <Popconfirm
                placement="top"
                title='确定要删除当前菜品吗'
                onConfirm={() => {
                  confirm2del(record)
                }}
                okText="确定"
                cancelText="取消"
            >
              <Button shape="circle" size={"small"} type="primary" danger icon={<DeleteOutlined/>}/>
            </Popconfirm>
          </Space>
      ),
    },
  ];

  //获取订单列表
  useEffect(() => {
    const socket = new WebSocket(`${WEBSOCKET_URL}/waiter/order`);
    socket.addEventListener("open", function (event) {
      console.log("socket is open");
      socket.send("连接成功");
    });
    socket.addEventListener("message", function (event) {
      console.log("Message from server", event.data);
      //服务器发送的数据更新了
      if (event.data !== 'websocket connected') {
        // if (JSON.stringify(orderList) !== event.data) alert('有菜品制作完成，请及时上菜')
        setOrderList(JSON.parse(event.data))
      }
    });
    props.getOrderList()
    console.log(props)
  }, [])

  useMemo(() => {
    setOrderList(props.orderlist)
    setDishList(props.dishlist)
  }, [props.orderlist, props.dishlist])


  //修改后的订单信息和id，用于向后端发送更新
  const [editedOrder, setEditedOrder] = useState({
    order: undefined,
    num: undefined,
    _id: undefined,
    orderid: undefined
  })
  //编辑的订单id
  const [editedOrderId, setEditOrderId] = useState('')
  //编辑的菜品id
  const [editDish, setEditDish] = useState('')
  //编辑的菜品数量
  const [editDishNum, setDishNum] = useState(0)

  //菜品编辑时的选中菜品名id
  const [nameSelectID, setNameID] = useState('')

  const [visible, setVisible] = useState(false)

  //菜品数量变化
  function numChange(pre: any, newVal: any) {
    //根据订单id查找订单详情
    const order: any = orderList.find(((value: any) => value.orderid === pre.orderid))
    const orderIndex: number = orderList.findIndex(((value: any) => value.orderid === pre.orderid))
    //通过菜品id遍历，并修改匹配到的数量
    order.order.forEach((val: any) => {
      if (val._id === pre._id) {
        val.num = +newVal
        setEditDish(val._id)
        setDishNum(val.num)
      }
    })
    setEditedOrder(order)
    setEditOrderId(order.orderid)

    //替换数组中对应数据
    // @ts-ignore
    orderList.splice(orderIndex, 1, order)
    const newOrderList = JSON.parse(JSON.stringify(orderList))

    setOrderList(newOrderList)
  }


  //数量修改离焦事件
  function onNumBlur() {
    // console.log('离焦了')
    dishlist.map((value: any) => {
      if (value._id === editDish) {
        console.log(editDish)
        const n = value.number -= editDishNum
        if (n < 0) {
          value.number += editDishNum
          alert(`菜品${value.name} 可用库存为 ${value.number}`)
        } else {
          props.updateOrder({
            orderid: editedOrderId,
            orderdetail: editedOrder.order,
            editDishID: editDish,
            editNum: editDishNum
          })
        }
      }
    })
  }

  //菜名选中回调
  function onNameChange(val: any) {
    console.log('更改后的菜品id', val)
    setNameID(val)
  }

  //菜名下拉框点击时根据id找到原始订单
  function onClick(val: any) {
    console.log('val', val)
    //点击时从所有菜品中筛选掉原始菜品
    const list = dishlist.filter(((value: any) => value._id !== val._id))
    setDishList(list)

    //根据订单id查找订单菜品详情
    const order: any = orderList.find(((value: any) => value.orderid === val.orderid))
    setEditOrderId(order.orderid)
    setEditedOrder(val)
  }

  //下拉框离焦更新
  function onSelectBlur() {
    props.updateOrder({
      status: 1,
      orderid: editedOrderId,
      updateDishId: nameSelectID,
      preDishDetail: editedOrder
    })
  }

  //删除
  function confirm2del(val: any) {
    console.log(val)
    props.updateOrder({
      order: val,
      status: 0
    })
  }


  function orderAddDish(val: any) {
    setVisible(true)
    setTableID(val.tableID)
    setEditedOrder(val)
  }

  //新增菜品提交
  function handleOk(val: any) {
    console.log(val)
    dishlist.map((value: any) => {
      if (value._id === val.id) {
        console.log(val)
        const n = value.number -= +val.num
        if (n < 0) {
          value.number += +val.num
          alert(`菜品${value.name} 可用库存为 ${value.number}`)
        } else {
          props.addDish({
            orderid: editedOrder.orderid,
            dish: val
          })
          setVisible(false)
        }
      }
    })

  }

  return (
      <DocumentTitle title="服务员端 > 订单列表">
        <Wrap>
          <List
              grid={{ column: 1 }}
              dataSource={orderList}
              renderItem={(item: any) => (
                  <List.Item>
                    <Card style={{ overflow: "scroll" }}
                          title={
                            <>
                              <Tag color="#2db7f5">{item.tableID} 号桌</Tag>
                              <Tag color="lime-inverse">{moment(item.fromNow).fromNow()}</Tag>
                              {
                                item.isPaid ? <Tag color="#87d068">已付款</Tag> :
                                    <Tag color="#f50">未付款</Tag>
                              }
                            </>
                          }
                          extra={
                            item.isPaid ? '' : <Button type="primary" style={{ borderRadius: 5 }}
                                                       onClick={() => {
                                                         orderAddDish(item)
                                                       }}
                            >加菜</Button>
                          }>
                      <Table rowKey={item.tableID} pagination={false} columns={columns} dataSource={item.order}/>
                    </Card>
                  </List.Item>
              )}
          />
          {/*新增弹出框*/}
          <Modal
              title={'新增点菜'}
              visible={visible}
              onCancel={() => {
                setVisible(false)
              }}
              destroyOnClose
              footer={null}
          >
            <Form onFinish={handleOk}>
              <Form.Item>
                <Form.Item name="tableID" style={{ margin: 0 }} initialValue={tableID}>
                  <Input placeholder="餐桌号" disabled/>
                </Form.Item>
                <Form.Item name="id" rules={[
                  {
                    required: true,
                    message: '请选择菜品',
                  },
                ]}>
                  <Select
                      autoFocus
                      showSearch
                      style={{ width: '100%', marginTop: 20 }}
                      placeholder="菜品"
                      optionFilterProp="children"
                  >
                    {
                      dishlist && dishlist.map((val: any) => <Option value={val._id}
                                                                     key={val._id}>{val.name}</Option>)
                    }
                  </Select>
                </Form.Item>
                <Form.Item name='num' rules={[
                  {
                    required: true,
                    message: '请输入数量',
                  },
                ]} style={{ marginTop: 0 }}>
                  <Input type={"number"}
                         placeholder="数量"/>
                </Form.Item>

              </Form.Item>

              <Form.Item style={{ marginBottom: -6 }}>
                <Space style={{ float: "right" }}>
                  <Button type="default" onClick={() => {
                    setVisible(false)
                  }}>取消</Button>
                  <Button type="primary" htmlType="submit">添加</Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>
        </Wrap>
      </DocumentTitle>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(WaiterOrder);
