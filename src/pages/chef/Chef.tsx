import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ORDERDEL } from "../admin/order/actions";
import { CORDEREDIT_URL, CORDERLIST_URL, ORDERDEL_URL } from "../../common/api";
import { Card, List, Switch, Table } from "antd";
import { CGETORDERLIST, CORDEREDIT } from "./actions";

interface OwnProps {
  GetOrder(value?: object): void

  UpdateOrder(value: object): void,

  [prop: string]: any
}

type Props = OwnProps;
const mapStateToProps = (state: any) => ({
  orderlist: state.chef.orderlist,
  addOStatus: state.chef.addOStatus,
  delOStatus: state.chef.delOStatus,
  errorMsgO: state.chef.errorMsgO,
  editCStatus: state.chef.editCStatus
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  delOrder(value: string) {
    dispatch({
      type: ORDERDEL,
      url: ORDERDEL_URL,
      data: value
    })
  },
  GetOrder(value?: object) {
    dispatch({
      type: CGETORDERLIST,
      url: CORDERLIST_URL,
      data: value
    })
  },
  UpdateOrder(value: object) {
    dispatch({
      type: CORDEREDIT,
      url: CORDEREDIT_URL,
      data: value
    })
  }
})

const Chef: FunctionComponent<Props> = (props) => {
  const [orderList, setOrderList] = useState([])
  const columns = [
    {
      title: '菜名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'tableID',
      render: (text: any, record: any) => (
          <a onClick={() => {
            onClick(record, text)
          }}>
            <Switch checkedChildren="完成" checked={record.status === 1} unCheckedChildren="待做"/>
          </a>
      ),
    },
  ];

  //获取订单列表
  useEffect(() => {
    props.GetOrder()
  }, [])

  useMemo(() => {
    setOrderList(props.orderlist)
  }, [props.orderlist])

  //switch切换事件 修改菜品出餐状态
  function onClick(record: any, text?: any) {
    // console.log(record)
    props.UpdateOrder(record)
  }

  return (
      <div>
        <List
            grid={{ column: 1 }}
            dataSource={orderList}
            renderItem={(item: any) => (
                <List.Item>
                  <Card style={{ overflow: "scroll" }} title={item.tableID + '号餐桌'}>
                    <Table rowKey={item.tableID} pagination={false} columns={columns} dataSource={item.order}/>
                  </Card>
                </List.Item>

            )}
        />
      </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Chef);
