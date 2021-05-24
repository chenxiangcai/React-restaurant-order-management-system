import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import DocumentTitle from "react-document-title";
import { Card, ConfigProvider, Descriptions, Drawer, message, Table } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import Paging from "../../../components/Paging";
import { ColumnsType } from "antd/es/table";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { GETORDERLIST, ORDERDEL, ORDEREDIT } from "./actions";
import { ORDERDEL_URL, ORDEREDIT_URL, ORDERLIST_URL } from "../../../common/api";
import moment from 'moment';
import TableCheckBox from "../../../components/TableCheckBox";
import { getStore, setStore } from "../../../utils/storage";

interface OwnProps {
  [prop: string]: any

  toggleOrderPage(value?: object): void

  delOrder(value: string): void,

  // addOrder(value: object): void,

  editOrder(value: object): void
}

type Props = OwnProps;

interface Orders {
  _id: string,
  orderid: number,
  tableid: number,
  waiter: any,
  orderdetail: any,
  paid: number,
  receivable: number,
  level: any,
  finishtime: string
}


const mapStateToProps = (state: any) => ({
  list: state.orders.list || [],
  addOStatus: state.orders.addOStatus,
  delOStatus: state.orders.delOStatus,
  errorMsgO: state.orders.errorMsgO,
  editOStatus: state.orders.editOStatus
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  delOrder(value: string) {
    dispatch({
      type: ORDERDEL,
      url: ORDERDEL_URL,
      data: value
    })
  },
  // addOrder(value: object) {
  //   dispatch({
  //     type: ORDERADD,
  //     url: ORDERADD_URL,
  //     data: value
  //   })
  // },
  toggleOrderPage(value: object) {
    dispatch({
      type: GETORDERLIST,
      url: ORDERLIST_URL,
      data: value
    })
  },
  editOrder(value: object) {
    dispatch({
      type: ORDEREDIT,
      url: ORDEREDIT_URL,
      data: value
    })
  }
})

const Order: FunctionComponent<Props> = (props) => {
  const [barVisible, setBarVisible] = useState('')
  const [orderList, setOrderList] = useState([])
  const [selectValue, SetSelectValue] = useState([])
  const [drawVisible, setDrawVisible] = useState(false)
  const [drawValue, setDrawValue] = useState({
    _id: undefined,
    orderid: undefined,
    paid: undefined,
    cus: {
      name: undefined,
    },
    begintime: undefined,
    finishtime: undefined,
    orderdetail: [{
      name: undefined,
      num: undefined
    }],
    tableid: {
      tableID: undefined
    }
  })

  // 表格列
  const columns: ColumnsType<Orders> = [
    // {
    //   title: '序号',
    //   key: 'orderid',
    //   render: ((value, record, index) => <>{index + 1}</>)
    // },
    {
      title: '订单号',
      key: 'orderid',
      render: (value => <a onClick={() => {
        showDrawer(value)
      }}>{value.orderid}
      </a>)
    },
    {
      title: '会员等级',
      key: 'level',
      render: (value, records, index) => (
          <>
            {
              records?.level?.name === undefined ? '无会员' : records.level.name
            }
          </>
      ),
    },
    {
      title: '应收(元)',
      key: 'orderdetail',
      render: (value, records, index) => (
          <>
            {records?.receivable}
          </>
      ),
    },
    {
      title: '实收(元)',
      key: 'orderdetail',
      render: (value, records, index) => (
          <>
            {records?.paid}
          </>
      ),
    },
    {
      title: '结账时间',
      dataIndex: 'finishtime',
      key: 'finishtime',
      render: ((value, record, index) =>
              <>
                {
                  value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '暂未结账'
                }
              </>
      )
    },
    {
      title: '服务员',
      key: 'waiter',
      render: (value, records, index) => (
          <>
            {records?.waiter?.name}
          </>
      ),
    },
  ];

  //列表显示
  const [pageMsg, setPageMsg] = useState({
    query: '',
    page: 1,
    pagesize: 10
  })

  //列表数据
  useEffect(() => {
    props.toggleOrderPage(pageMsg)
    const { list } = props
    const order_List = list.records
    setOrderList(order_List)
    //数组长度发生变化后 获取数据 渲染列表
  }, [props.list.total])

  useMemo(() => {
    const { list } = props
    const order_List = list.records
    setOrderList(order_List)
  }, [props.list.page, props.list.size]);


  //捕捉异步pageMsg
  useEffect(() => {
    setPageMsg(pageMsg)
    props.toggleOrderPage(pageMsg)
  }, [pageMsg])

  // 搜索后列表刷新
  useEffect(() => {
    const { list } = props
    const order_List = list.records
    setOrderList(order_List)
  }, [props.list.records])

  //删除
  function delSelected() {
    // @ts-ignore
    const delAry = selectValue.map(val => val._id)
    // 把多个删除项处理为字符串格式 传给后端处理
    const delIds = delAry.join('-')
    props.delOrder(delIds)
    setBarVisible('none')
  }

  //选中函数
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

  const showDrawer = (value: any) => {
    setDrawValue(value)
    setDrawVisible(true);
  };
  const onClose = () => {
    setDrawVisible(false);
  };

  useMemo(() => {
    console.log(drawValue)
  }, [drawValue])

  useEffect(() => {
    const { errorMsgO, addOStatus, delOStatus, editOStatus } = props
    const aastatus = getStore('addOStatus')
    const ddstatus = getStore('delOStatus')
    const eestatus = getStore('editOStatus')
    //添加
    if (aastatus == addOStatus) {
    } else {
      console.log(props)
      console.log(errorMsgO)
      setStore('addOStatus', addOStatus)
      if (addOStatus < 1) message.success('订单添加成功')
      else if (errorMsgO && errorMsgO.includes('存在')) message.error('此订单已存在！')
    }
    //删除
    if (ddstatus == delOStatus) {
    } else {
      setStore('delOStatus', delOStatus)
      if (delOStatus < 1) message.success('订单删除成功')
    }
    //修改
    if (eestatus == editOStatus) {
    } else {
      setStore('editOStatus', editOStatus)
      if (editOStatus < 1) message.success('订单修改成功')
    }
  }, [props])


  //详情页表单列
  const columnss = [
    {
      title: '菜名',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '单价(元)',
      key: 'perprice',
      dataIndex: 'perprice',
    },
    {
      title: '数量',
      key: 'num',
      dataIndex: 'num',
    },
  ];

  //详情页多选选中
  const rowSelections = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  // @ts-ignore
  return (
      <DocumentTitle title="订单管理">
        <ConfigProvider locale={zhCN}>
          <Card title="订单列表" style={{ position: "relative", width: '100%' }}>
            <TableCheckBox
                delSelected={delSelected}
                barVisible={barVisible}
                Search={(value: string) => {
                  setPageMsg({
                    page: 1,
                    pagesize: 10,
                    query: value
                  })
                }}
                title='订单号'/>

            {
              orderList && <Table
                  rowKey='_id'
                  bordered
                  columns={columns}
                  dataSource={orderList}
                  pagination={false}
                  rowSelection={rowSelection}
              />
            }
            {
              orderList &&
              <Paging page={props.list.page} total={props.list.total} fun={(page = 1, pageSize = 10): any => {
                // props.toggleOrderPage(pageMsg)
                setPageMsg({
                  query: pageMsg.query,
                  page: page,
                  pagesize: pageSize
                })
              }}/>
            }
          </Card>

          <Drawer
              title='订单详情'
              width={777}
              placement="right"
              closable={false}
              onClose={onClose}
              visible={drawVisible}
          >
            <Descriptions title={`订单号：${drawValue.orderid}`}>
              <Descriptions.Item label="桌位号">{drawValue.tableid.tableID} 号</Descriptions.Item>
              {
                drawValue?.cus?.name &&
                <Descriptions.Item label="会员姓名">{drawValue?.cus?.name}</Descriptions.Item>
              }
              <Descriptions.Item label="消费金额">
                {
                  drawValue.paid === 0 ? drawValue.orderdetail.map((value: any) => {
                    return value.num * value.price
                  }) : drawValue.paid
                }
                元
              </Descriptions.Item>
              <Descriptions.Item label="消费时长">
                {
                  drawValue.finishtime ?
                      <span>
                        {moment(`${drawValue.finishtime}`).diff(moment(`${drawValue.begintime}`), 'hours') + `时`}
                        {moment(`${drawValue.finishtime}`).diff(moment(`${drawValue.begintime}`), 'minutes') - moment(`${drawValue.finishtime}`).diff(moment(`${drawValue.begintime}`), 'hours') * 60}分
                      </span>
                      :
                      <span>
                        {
                          moment(drawValue.begintime).fromNow(true)
                        }
                      </span>
                }
              </Descriptions.Item>
              <Descriptions.Item label="结账时间">
                {
                  drawValue.finishtime ? moment(drawValue.finishtime).format('YYYY-MM-DD HH:mm:ss') : '暂未结账'
                }
              </Descriptions.Item>
            </Descriptions>

            <h4 style={{ marginTop: 20 }}>菜单详情：</h4>
            <Table
                columns={columnss}
                rowKey='_id'
                bordered
                rowSelection={rowSelections}
                dataSource={drawValue.orderdetail}
                pagination={{ hideOnSinglePage: true }}
            />
          </Drawer>
        </ConfigProvider>
      </DocumentTitle>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
