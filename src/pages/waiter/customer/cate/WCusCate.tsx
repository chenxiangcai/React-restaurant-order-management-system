import React, { FunctionComponent, useEffect, useState } from 'react';
import { Card, ConfigProvider, List } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import DocumentTitle from "react-document-title";
import { Dispatch } from "redux";
import { WCUSCATELIST_URL } from "../../../../common/api";
import { connect } from "react-redux";
import { WGETCUSCATELIST } from "./action";
import { CateWrap } from './cateWrap-style'


interface OwnProps {
  [prop: string]: any

  toggleCusCatePage(value?: object): void
}

const mapStateToProps = (state: any) => ({
  list: state.wcuscate.list || [],
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleCusCatePage(value: object) {
    dispatch({
      type: WGETCUSCATELIST,
      url: WCUSCATELIST_URL,
      data: value
    })
  }
})

type Props = OwnProps;

interface WCusCate {
  name: string,
  discount: number,
  _id: string
}

const WCusCate: FunctionComponent<Props> = (props) => {
  const [cateList, SetCateList] = useState([])

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


  return (
      <DocumentTitle title="会员类别">
        <ConfigProvider locale={zhCN}>
          <Card title="会员类别">
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
                          <div style={{ marginTop: -14, fontWeight: 600 }}>{item?.name}</div>
                          <div style={{ textAlign: "center", paddingTop: '8%' }}>
                            <div style={{ color: "red" }}>{item?.discount}折</div>
                          </div>
                        </Card>
                      </CateWrap>
                    </List.Item>
                )}
            />
          </Card>
        </ConfigProvider>
      </DocumentTitle>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WCusCate);
