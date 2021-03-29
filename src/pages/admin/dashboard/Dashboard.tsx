import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Card, Col, ConfigProvider, Row, Statistic, Tooltip, Radio, Table } from 'antd';
import zhCN from "antd/es/locale/zh_CN";
import DocumentTitle from "react-document-title";
import { DashWrap } from "./dashbord-style";
import { ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import LineChart from "../../../components/LineChart";
import DemoColumn from "../../../components/ColumnChart";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { GETDASHBOARD } from "./actions";
import { DASHBOARD_URL } from "../../../common/api";
import DemoLiquid from "../../../components/PieChart";
import DemoDualAxes from '../../../components/MixCoulmnLine';

interface OwnProps {
  getDetail(): void,

  [prop: string]: any

}

type Props = OwnProps;

const mapStateToProps = (state: any) => ({
  detail: state.dashboard.detail || {},
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getDetail() {
    dispatch({
      type: GETDASHBOARD,
      url: DASHBOARD_URL,
    })
  },
})

const Dashboard: FunctionComponent<Props> = (props) => {
  const [data, SetData] = useState({
    vip: {
      vipnum: 0,
      dayVipActiveNum: 0,
      weekVipActiveRate: 0
    },
    allSold: {
      allMoney: 0,
      weekRate: 0,
      dayRate: 0,
      dayMoney: 0
    },
    allReceive: {
      allReMoney: 0,
      reTodayMoney: 0,
      thisWeekRe: []
    },
    orderNum: {
      todayordernum: 0,
      totalordernum: 0
    },
    SoldModule: {
      soldModule: undefined,
      soldModuleDay: undefined
    },
    rank: {
      rankMonth: [],
      rankWeek: [],
      rankDay: []
    }
  })
  const [soldMoneyData, setSoldMoneyData] = useState({})
  const [soldNumData, setSoldNumData] = useState({})

  const columns = [
    {
      title: '菜品',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '销量',
      dataIndex: 'num',
      key: 'num',
      align: ["center"]
    },
  ];

  //销售额切换
  function SoldMoneyToggle(e: any) {
    const which = e.target.value
    const { detail } = props
    if (which === 'year') setSoldMoneyData(detail?.SoldModule.soldModule)
    else setSoldMoneyData(detail?.SoldModule?.soldModuleDay)
  }

  //销售排行切换
  function SoldNumToggle(e: any) {
    const which = e.target.value
    const { detail } = props
    if (which === 'month') setSoldNumData(detail?.rank?.rankMonth)
    else if (which === 'week') setSoldNumData(detail?.rank?.rankWeek)
    else setSoldNumData(detail?.rank?.rankDay)
  }

  //列表数据
  useEffect(() => {
    props.getDetail()
  }, [])

  useMemo(() => {
    const { detail } = props
    SetData(detail)
    //销售额初始值设为本月
    setSoldMoneyData(detail?.SoldModule?.soldModuleDay)
    //销量排行初始值设为今日
    setSoldNumData(detail?.soldRank?.soldRankDay)

  }, [props.detail])

  // @ts-ignore
  return (
      <DocumentTitle title="经营状况">
        {
          data &&
          <ConfigProvider locale={zhCN}>
            <DashWrap>
              <div className="site-card-wrapper">
                <Row gutter={16}>
                  <Col span={6}>
                    <Card bordered={false} headStyle={{ borderBottom: 0, minHeight: 0 }}
                          bodyStyle={{ paddingTop: 20, paddingBottom: 10 }}
                    >
                      <div className='rightdot'>
                        <Tooltip placement="top" title={'指标说明'}>
                          <ExclamationCircleOutlined/>
                        </Tooltip>
                      </div>
                      <div className='content'>
                        <Statistic title="总销售额"
                                   valueStyle={{ fontSize: 30 }}
                                   value={data?.allSold?.allMoney}
                                   prefix={'¥'}
                        />
                        <div className='num'>
                          {
                            data?.allSold?.weekRate !== -9999 && data?.allSold?.weekRate !== -8888 &&
                            <Statistic
                                title="周环比"
                                value={data?.allSold?.weekRate}
                                precision={2}
                                valueStyle={{
                                  color: data?.allSold?.weekRate <= 0 ? '#cf1322' : '#3f8600',
                                  fontSize: 18
                                }}
                                prefix={
                                  data?.allSold?.weekRate > 0 ? <ArrowUpOutlined/> : <ArrowDownOutlined/>
                                }
                                suffix="%"
                            />
                          }
                          {
                            data?.allSold?.weekRate === -9999 &&
                            <Statistic
                                title="周环比"
                                value={'暂无上周数据'}
                                precision={2}
                                valueStyle={{
                                  color: '#a4b0be',
                                  fontSize: 16
                                }}
                            />
                          }
                          {
                            data?.allSold?.weekRate === -8888 &&
                            <Statistic
                                title="周环比"
                                value={'暂无本周数据'}
                                precision={2}
                                valueStyle={{
                                  color: '#a4b0be',
                                  fontSize: 16
                                }}
                            />
                          }
                          {
                            data?.allSold?.dayRate !== -9999 && data?.allSold?.dayRate !== -8888 &&
                            <Statistic
                                style={{ marginLeft: 30 }}
                                title="日环比"
                                value={data?.allSold?.dayRate}
                                precision={2}
                                valueStyle={{
                                  color: data?.allSold?.dayRate <= 0 ? '#cf1322' : '#3f8600',
                                  fontSize: 18
                                }}
                                prefix={
                                  data?.allSold?.dayRate > 0 ? <ArrowUpOutlined/> : <ArrowDownOutlined/>
                                }
                                suffix="%"
                            />
                          }
                          {
                            data?.allSold?.dayRate === -9999 &&
                            <Statistic
                                style={{ marginLeft: 30 }}
                                title="日环比"
                                value={'暂无昨日数据'}
                                precision={2}
                                valueStyle={{
                                  color: '#a4b0be',
                                  fontSize: 16
                                }}
                            />
                          }
                          {
                            data?.allSold?.dayRate === -8888 &&
                            <Statistic
                                style={{ marginLeft: 30 }}
                                title="日环比"
                                value={'暂无今日数据'}
                                precision={2}
                                valueStyle={{
                                  color: '#a4b0be',
                                  fontSize: 16
                                }}
                            />
                          }
                        </div>
                      </div>
                      <div className='daymoney'>
                        <Statistic
                            style={{ display: "flex", marginTop: 10 }}
                            title="日销售额"
                            value={data?.allSold?.dayMoney}
                            precision={2}
                            valueStyle={{ color: '#000', fontSize: 14, marginLeft: 10 }}
                            prefix={'¥'}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card bordered={false} headStyle={{ borderBottom: 0, minHeight: 0 }}
                          bodyStyle={{ paddingTop: 20, paddingBottom: 10 }}
                    >
                      <div className='rightdot'>
                        <Tooltip placement="top" title={'指标说明'}>
                          <ExclamationCircleOutlined/>
                        </Tooltip>
                      </div>
                      <div className='content'>
                        <Statistic title="销售实收"
                                   valueStyle={{ fontSize: 30 }}
                                   value={data?.allReceive?.allReMoney}
                                   prefix={'¥'}/>
                        <LineChart data={data?.allReceive?.thisWeekRe}/>
                      </div>

                      <div className='daymoney'>
                        <Statistic
                            style={{ display: "flex", marginTop: 10 }}
                            title="日收入额"
                            value={data?.allReceive?.reTodayMoney}
                            precision={2}
                            valueStyle={{ color: '#000', fontSize: 14, marginLeft: 10 }}
                            prefix={'¥'}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card bordered={false} headStyle={{ borderBottom: 0, minHeight: 0 }}
                          bodyStyle={{ paddingTop: 20, paddingBottom: 10 }}
                    >
                      <div className='rightdot'>
                        <Tooltip placement="top" title={'指标说明'}>
                          <ExclamationCircleOutlined/>
                        </Tooltip>
                      </div>

                      <div className='content'>
                        <Statistic suffix={'单'}
                                   title="总订单量"
                                   value={data?.orderNum?.totalordernum}/>
                        <DemoColumn data={data?.allReceive?.thisWeekRe}/>
                      </div>
                      <div className='daymoney'>
                        <Statistic
                            style={{ display: "flex", marginTop: 10 }}
                            title="日订单量"
                            value={data?.orderNum?.todayordernum}
                            suffix={'单'}
                            valueStyle={{ color: '#000', fontSize: 14, marginLeft: 10 }}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card bordered={false} headStyle={{ borderBottom: 0, minHeight: 0 }}
                          bodyStyle={{ paddingTop: 20, paddingBottom: 10 }}
                    >
                      <div className='rightdot'>
                        <Tooltip placement="top" title={'指标说明'}>
                          <ExclamationCircleOutlined/>
                        </Tooltip>
                      </div>

                      <div className='contents'>
                        <Statistic title="会员数量"
                                   value={data?.vip?.vipnum}
                                   suffix={'人'}
                        />
                        <div style={{ marginLeft: '10%' }} className='num'>
                          <DemoLiquid rate={data?.vip?.weekVipActiveRate}/>
                        </div>
                      </div>
                      <div className='daymoney'>
                        <Statistic
                            style={{ display: "flex", marginTop: 10 }}
                            title="日活跃量"
                            suffix={'人'}
                            value={data?.vip?.dayVipActiveNum}
                            valueStyle={{ color: '#000', fontSize: 14, marginLeft: 10 }}
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
              <div className="site-card-wrapper" style={{ marginTop: '1%' }}>
                <Row gutter={16}>
                  <Col span={18}>
                    <Card title="销售额" extra={
                      <Radio.Group onChange={SoldMoneyToggle} defaultValue="month">
                        <Radio.Button value="month">本月</Radio.Button>
                        <Radio.Button value="year">今年</Radio.Button>
                      </Radio.Group>
                    }>
                      <DemoDualAxes data={soldMoneyData}/>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card title="销量排行" extra={
                      <Radio.Group size={"small"} onChange={SoldNumToggle} defaultValue="day">
                        <Radio.Button value="day">今日</Radio.Button>
                        <Radio.Button value="week">本周</Radio.Button>
                        <Radio.Button value="month">本月</Radio.Button>
                      </Radio.Group>
                    }>
                      {/*@ts-ignore*/}
                      <Table pagination={false} columns={columns} dataSource={soldNumData}/>
                    </Card>
                  </Col>
                </Row>
              </div>

            </DashWrap>
          </ConfigProvider>
        }
      </DocumentTitle>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
