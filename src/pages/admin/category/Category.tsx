import React, {FunctionComponent, useEffect, useState} from 'react';
import DocumentTitle from "react-document-title";
import {Button, Card, ConfigProvider, Form, Input, Modal, Popconfirm, Space, Table} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {DeleteOutlined, EditOutlined, FieldNumberOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {connect} from 'react-redux'
import {Dispatch} from "redux";
import {GETCATELISTS} from "./action";
import {GETCATELIST_URL} from "../../../common/api";
import moment from 'moment';

interface Categories {
    _id: string,
    createAt: string,
    foodTypeName: string,
    relationshipCount: number
}

interface Prop {
    [prop: string]: any,

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
    /* delDish(value: string) {
         dispatch({
             type: DELDISH,
             url: DELDISH_URL,
             data: value
         })
     },
     addDish(value: object) {
         dispatch({
             type: ADDDISH,
             url: ADDDISH_URL,
             data: value
         })
     },*/
    toggleCatePage(value: object) {
        dispatch({
            type: GETCATELISTS,
            url: GETCATELIST_URL,
            data: value
        })
    },
    /*editDish(value: object) {
        dispatch({
            type: EDITDISH,
            url: EDITDISH_URL,
            data: value
        })
    }*/
})


// 表格列
const columns: ColumnsType<Categories> = [
    {
        title: '分类',
        dataIndex: 'foodTypeName',
        key: 'name',
    },
    {
        title: '创建时间',
        key: 'category',
        dataIndex: 'createAt',
        render: (text => (
            <>
                {
                    moment(text).format('YYYY-MM-DD')
                }
            </>
        ))
    },
    {
        title: '关联菜品数量',
        key: 'number',
        dataIndex: 'number',
        render: (number: number) => (
            <>
                {number}
            </>
        ),
    },
    {
        title: '操作',
        key: '_id',
        width: 300,
        render: (text, records, index) => (
            <Space>
                <Button type="primary" onClick={() => {
                    // edit_dish(records)
                }} shape="circle" icon={<EditOutlined/>} size={"small"}/>
                {
                    <Popconfirm
                        title="确定要删除此分类吗？"
                        placement="top"
                        okText="确定"
                        cancelText="取消"
                        onConfirm={() => {
                            // del_dish(records)
                        }}
                    >
                        <Button type="primary" danger shape="circle" icon={<DeleteOutlined/>} size={"small"}/>
                    </Popconfirm>
                }
            </Space>
        ),
    },
];

const Category: FunctionComponent<Props> = (props) => {

    const [categoryList, SetCategoryList] = useState([])
    const [visible, setVisible] = useState(false);
    const [popCateStyle, setPopCateStyle] = useState('')
    // 取消弹出框
    const handleCancel = () => {
        // todo 取消弹出框确认
        console.log('Clicked cancel button');
        setVisible(false);
    };

    // 表单提交函数 新增和编辑
    const handleOk = (value: any) => {
        if (value.hasOwnProperty('password')) {
            // 找出最大值 作为账号account的值
            value.account = props.list.records.reduce((pre: any, cur: any) => pre > cur.account ? pre : `${cur.account + 1}`, 0)
            value.joinTime = new Date().getTime()
            props.addStaff(value)
            setVisible(false);
        } else {
            // @ts-ignore
            value.name = edited_name.current.state.value
           // value.account = editValues.account

            // Dispach编辑行为
            props.editStaff(value)
            setVisible(false)
        }
    };

    // 列表数据和事件处理

    useEffect(() => {
            props.toggleCatePage()
            console.log(props)
            // @ts-ignore
            const {list} = props
            const cates = list.records
            SetCategoryList(cates)
            //数组长度发生变化后 获取数据 渲染列表
        },// @ts-ignore
        [props.list.total])

    return (
        <DocumentTitle title="菜品分类">
            <ConfigProvider locale={zhCN}>
                <Card title="菜品列表" extra={
                    <Button onClick={() => {
                        setVisible(true)
                        setPopCateStyle('新增分类')
                    }} type="primary">
                        新增
                    </Button>
                }
                      style={{width: '100%'}}>
                    {
                        categoryList && <Table
                            rowKey='_id'
                            bordered
                            columns={columns}
                            dataSource={categoryList}
                            pagination={false}
                        />
                    }

                    <Modal
                        title={popCateStyle}
                        visible={visible}
                        onCancel={handleCancel}
                        destroyOnClose
                        footer={null}
                    >
                        <Form name="normal_login" className="login-form" onFinish={handleOk}>

                            {
                                popCateStyle === '新增分类' &&
                                <Form.Item name="name" rules={[
                                    {
                                        required: true,
                                        message: '请输入姓名',
                                    },
                                ]}>
                                    <Input autoFocus={true}
                                           prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="请输入2位及以上的姓名"/>
                                </Form.Item>
                            }
                            {
                                popCateStyle === '编辑分类' &&
                                <Form.Item name="name" >
                                    <Input autoFocus={true}

                                           prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="请输入2位及以上的姓名"/>
                                </Form.Item>
                            }
                            {
                                popCateStyle === '新增分类' &&
                                <Form.Item name="password" rules={[
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    },
                                ]}>
                                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                                    type="password"
                                                    placeholder="请输入3位及以上的密码"/>
                                </Form.Item>
                            }


                            <Form.Item style={{marginBottom: 0}}>
                                <Space style={{float: "right"}}>
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
