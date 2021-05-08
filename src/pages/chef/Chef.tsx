import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CORDEREDIT_URL, CORDERLIST_URL, WEBSOCKET_URL } from "../../common/api";
import { Card, List, Switch, Table, Tag } from "antd";
import { CGETORDERLIST, CORDEREDIT } from "./actions";
import moment from "moment";
import 'moment/locale/zh-cn'


interface OwnProps {
  GetOrder(value?: object): void

  UpdateOrder(value: object): void,

  [prop: string]: any
}

type Props = OwnProps;
const mapStateToProps = (state: any) => ({
  orderlist: state.chef.orderlist,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
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
    const socket = new WebSocket(`${WEBSOCKET_URL}/chef/order`);
    socket.addEventListener("open", function (event) {
      console.log("socket is open");
      socket.send("连接成功");
    });

    socket.addEventListener("message", function (event) {
      console.log("Message from server", event.data);
      // console.log(event.data)
      //服务器发送的数据更新了
      if (event.data !== 'websocket connected') setOrderList(JSON.parse(event.data))
    });
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
                  <Card style={{ overflow: "scroll" }}
                        title={<Tag color="#2db7f5">{item.tableID} 号桌</Tag>}
                        extra={<Tag color="orange-inverse">{moment(item.fromNow).fromNow()}</Tag>}>
                    <Table rowKey={item.tableID} pagination={false} columns={columns} dataSource={item.order}/>
                  </Card>
                </List.Item>
            )}
        />
      </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Chef);
