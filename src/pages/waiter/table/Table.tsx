import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { WQR_URL, WTABLE_URL } from "../../../common/api";
import { WGETQRCODE, WGETTABLE, } from "./action";
import { Button, Card, Descriptions, Drawer, List, message } from "antd";
import { TableWrap } from "./TableWrap";
import { DownloadOutlined } from "@ant-design/icons";
import DocumentTitle from "react-document-title";
import { getStore, setStore } from "../../../utils/storage";

interface OwnProps {
  [prop: string]: any

  getQR(val: number | string): void

  getTable(): void

}

type Props = OwnProps;

const mapStateToProps = (state: any) => ({
  url: state.waiterTable.url,
  urlArray: state.waiterTable.urlArray,
  tableList: state.waiterTable.tableList,
  staffList: state.waiterTable.staffList,
  addTStatus: state.waiterTable.addTStatus,
  delTStatus: state.waiterTable.delTStatus,
  errorMsgT: state.waiterTable.errorMsgT,
  editTStatus: state.waiterTable.editTStatus
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getQR(value: number | string) {
    dispatch({
      type: WGETQRCODE,
      url: WQR_URL,
      data: value
    })
  },
  getTable() {
    dispatch({
      type: WGETTABLE,
      url: WTABLE_URL,
    })
  }
})

interface TableDetails {
  _id: '',
  status: undefined,
  tableID: undefined,
  staff: ''
}

const WTable: FunctionComponent<Props> = (props) => {

  //model弹框
  const [visible, setVisible] = useState(false);
  const [popTableStyle, setpopTableStyle] = useState('')

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
    // props.getQR('all')
    console.log(props)
  }, [])

  const { url, tableList, staffList } = props
  console.log(props)

  // @ts-ignore
  return (
      <DocumentTitle title="服务员端 > 餐桌列表">
        <TableWrap>
          <Card title='餐桌管理'>
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

          {/* 详情抽屉框 */}
          <Drawer
              title="餐桌详情"
              placement={'right'}
              closable={false}
              width={700}
              onClose={onDrawerClose}
              visible={DrawerVisible}
          >
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

export default connect(mapStateToProps, mapDispatchToProps)(WTable);
