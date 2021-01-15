import React, {FunctionComponent, useEffect, useState} from 'react';
import {Dispatch} from "redux";
import {ADDSTAFF, EDITSTAFF} from "../staff/actions";
import {DISHLIST, EDITSTAFF_URL, STAFFADD} from "../../../common/api";
import {connect} from "react-redux";
import DocumentTitle from "react-document-title";
import zhCN from "antd/es/locale/zh_CN";
import {
    Button,
    Card,
    Col,
    ConfigProvider,
    Drawer,
    Form,
    Input,
    Modal,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
    Upload
} from "antd";
import {ColumnsType} from "antd/es/table";
import {GETDISHLIST} from "./actions";
import Paging from "../../../components/Paging";
import {DeleteOutlined, EditOutlined, PlusOutlined,} from '@ant-design/icons';
import './dish.css'

const {Option} = Select;

interface OwnProps {
    [prop: string]: any

    toggleDishPage(value?: object): void

    getCateList(): void

    // delStaff(value: string): void,
    //
    // addStaff(value: object): void,
    //
    // editStaff(value: object): void

}

interface Dishes {
    _id: any,
    name: string,
    category: any,
    status: number,
    price: number,
}

type Props = OwnProps;

const mapStateToProps = (state: any) => ({
    list: state.dish.list,
    cateList: state.dish.cateList
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    // delDish(value: string) {
    //     dispatch({
    //         type: DELSTAFF,
    //         url: DELSTAFF_URL,
    //         data: value
    //     })
    // },
    addDish(value: object) {
        dispatch({
            type: ADDSTAFF,
            url: STAFFADD,
            data: value
        })
    },
    toggleDishPage(value: object) {
        dispatch({
            type: GETDISHLIST,
            url: DISHLIST,
            data: value
        })
    },
    editDish(value: object) {
        dispatch({
            type: EDITSTAFF,
            url: EDITSTAFF_URL,
            data: value
        })
    }
})


const Dish: FunctionComponent<Props> = (props) => {
    // 表格列
    const columns: ColumnsType<Dishes> = [
        {
            title: '菜品',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '分类',
            key: 'category',
            dataIndex: 'category',
            render: (value, records, index) => (
                <>
                    {records.category.foodTypeName}
                </>
            ),
        },
        {
            title: '售价(元)',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '库存',
            key: 'status',
            dataIndex: 'status',
            render: (status: any) => (
                <>
                    {
                        status === 1 && '充足'
                    }
                    {
                        status === 0 && '较少'
                    }
                    {
                        status === -1 && '缺货'
                    }
                </>
            ),
        },
        {
            title: '操作',
            key: '_id',
            width: 300,
            render: (text, records, index) => (
                <Space>
                    <Button type="primary" shape="circle" icon={<EditOutlined/>} size={"small"}/>
                    {
                        <Popconfirm
                            title="确定要删除此菜品吗？"
                            placement="top"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => {
                                //del_staff(records)
                            }}
                        >
                            <Button type="primary" danger shape="circle" icon={<DeleteOutlined/>} size={"small"}/>
                        </Popconfirm>
                    }
                </Space>
            ),
        },
    ];
    const [dishList, setDishList] = useState([])


    //列表显示
    const [pageMsg, setPageMsg] = useState({
        query: '',
        page: 1,
        pagesize: 10
    })
    const [stateVisible, SetStateVisible] = useState(false)

    const onClose = () => {
        SetStateVisible(false)
    };


    // 列表数据和事件处理
    useEffect(() => {
        props.toggleDishPage(pageMsg)
        const {list} = props
        console.log(list)
        const dish_List = list.records
        setDishList(dish_List)
        //数组长度发生变化后 获取数据 渲染列表
    }, [props.list.total, props.list.page, props.list.size])

    /**
     * 图片上传组件
     * previewVisible 预览可见性
     * previewImage 预览图片
     * previewTitle 预览标题
     * fileList 图片数组
     *
     */
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileLists, setFileList] = useState([])


    const handleCancel = () => setPreviewVisible(false);

    function getBase64(file: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    // @ts-ignore
    const handleChange = ({fileList}) => setFileList(fileList);
    // 上传按钮
    const uploadButton = (<div>
        <PlusOutlined/>
        <div style={{marginTop: 8}}>Upload</div>
    </div>);

    //新增菜品表单提交函数
    const handleForm = (value: any) => {
        console.log(value)
    }


    return (
        <DocumentTitle title="菜品管理">
            <ConfigProvider locale={zhCN}>
                <Card title="菜品列表" extra={
                    <Button onClick={() => {
                        SetStateVisible(true)
                    }} type="primary" shape="circle" icon={<PlusOutlined/>} size={"large"}/>
                }
                      style={{width: '100%'}}>
                    {
                        dishList && <Table
                            rowKey='_id'
                            bordered
                            columns={columns}
                            dataSource={dishList}
                            pagination={false}
                        />
                    }
                    {
                        dishList &&
                        <Paging page={props.list.page} total={props.list.total} fun={(page = 1, pageSize = 10): any => {
                            props.togglePage({
                                query: '',
                                page: page,
                                pagesize: pageSize
                            })
                            setPageMsg({
                                query: '',
                                page: page,
                                pagesize: pageSize
                            })
                        }}/>
                        /*<Pagination
                            defaultCurrent={props.list.page}
                            total={props.list.total}
                            hideOnSinglePage={false}
                            style={{float: "right", marginTop: 20}}
                            showTotal={total => `共 ${total} 条`}
                            onChange={(page = 1, pageSize = 10): any => {
                                props.togglePage({
                                    query: '',
                                    page: page,
                                    pagesize: pageSize
                                })
                                setPageMsg({
                                    query: '',
                                    page: page,
                                    pagesize: pageSize
                                })
                            }}
                        />*/
                    }
                    {/*新增抽屉框*/}
                    <Drawer
                        title="新增菜品"
                        width={'20%'}
                        onClose={onClose}
                        visible={stateVisible}
                        bodyStyle={{paddingBottom: 80}}
                        footer={null}
                    >
                        <>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileLists}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileLists.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                            >
                                <img alt="example" style={{width: '100%'}} src={previewImage}/>
                            </Modal>
                        </>

                        <Form layout="vertical"
                              requiredMark
                              style={{marginTop: 30}}
                              onFinish={handleForm}
                        >
                            <Row gutter={16}>
                                <Col span={22}>
                                    <Form.Item
                                        name="name"
                                        label="菜名"
                                        rules={[{required: true, message: '请输入名称'}]}
                                    >
                                        <Input placeholder="请输入名称"/>
                                    </Form.Item>
                                </Col>
                                <Col span={22}>
                                    <Form.Item
                                        name="price"
                                        label="单价"
                                        rules={[{required: true, message: '请输入单价'}]}
                                    >
                                        <Input
                                            style={{width: '100%'}}
                                            addonAfter="元"
                                            placeholder="请输入单价"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={22}>
                                    <Form.Item
                                        name="category"
                                        label="分类"
                                        rules={[{required: true, message: '请选择分类'}]}
                                    >
                                        <Select placeholder="请选择分类">
                                            {
                                                props.cateList &&
                                                props.cateList.map((value: any, index: number) => (
                                                        <Option value={value.foodTypeName}
                                                                key={index}>{value.foodTypeName}</Option>
                                                    )
                                                )
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={22}>
                                    <Form.Item
                                        name="type"
                                        label="库存"
                                        rules={[{required: true, message: '请选择库存'}]}
                                    >
                                        <Select placeholder="请选择库存">
                                            <Option value={1}>充足</Option>
                                            <Option value={0}>较少</Option>
                                            <Option value={-1}>缺货</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item style={{marginTop: 66}}>
                                <Space style={{float: "right"}}>
                                    <Button type="default" onClick={handleCancel}>取消</Button>

                                    <Button type="primary" htmlType="submit"
                                            className="login-form-button">添加</Button>
                                    <Button type="primary" htmlType="submit"
                                            className="login-form-button">提交</Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Drawer>
                </Card>
            </ConfigProvider>
        </DocumentTitle>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dish)

