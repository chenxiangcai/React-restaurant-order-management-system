import React, {FunctionComponent, useEffect, useMemo, useState} from 'react';
import {Dispatch} from "redux";
import {ADDDISH_URL, DELDISH_URL, DISHLIST, EDITDISH_URL, SERVER_URL, UPPIC_URL} from "../../../common/api";
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
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Upload
} from "antd";
import {ColumnsType} from "antd/es/table";
import {ADDDISH, DELDISH, EDITDISH, GETDISHLIST} from "./actions";
import Paging from "../../../components/Paging";
import {DeleteOutlined, EditOutlined, PlusOutlined,} from '@ant-design/icons';
import './dish.css'
import {getStore, setStore} from "../../../utils/storage";

const {Option} = Select;

interface OwnProps {
  [prop: string]: any

  toggleDishPage(value?: object): void

  getCateList(): void,

  addDish(value: object): void,

  delDish(value: string): void

  editDish(value: object): void


}

interface Dishes {
  _id: any,
  name: string,
  category: {
    _id: string,
    foodTypeName: string
    [prop: string]: any
  },
  number: number,
  price: number,
  picture: string
}

type Props = OwnProps;

const mapStateToProps = (state: any) => ({
  list: state.dish.list || [],
  cateList: state.dish.cateList,
  addDishStatus: state.dish.addDishStatus,
  delDishStatus: state.dish.delDishStatus,
  errorMsgDish: state.dish.errorMsgDish,
  editDishStatus: state.dish.editDishStatus
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  delDish(value: string) {
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
      type: EDITDISH,
      url: EDITDISH_URL,
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
            {records?.category?.foodTypeName}
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
              edit_dish(records)
            }} shape="circle" icon={<EditOutlined/>} size={"small"}/>
            {
              <Popconfirm
                  title="确定要删除此菜品吗？"
                  placement="top"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => {
                    del_dish(records)
                  }}
              >
                <Button type="primary" danger shape="circle" icon={<DeleteOutlined/>} size={"small"}/>
              </Popconfirm>
            }
          </Space>
      ),
    },
  ];

  // 修改菜品信息
  const edit_dish = (records: Dishes) => {
    console.log(records)
    SetStateVisible(true)
    setDrawerType('编辑菜品')
    SetEditValue({
      _id: records._id,
      name: records.name,
      picture: records.picture,
      number: records.number,
      price: records.price,
      categoryId: records?.category?._id,
      foodTypeName: records?.category?.foodTypeName
    })

  }

  const [editValue, SetEditValue] = useState({
    _id: '',
    name: '',
    picture: '',
    number: 888,
    price: 0,
    categoryId: '',
    foodTypeName: ''

  })
  const [dishList, setDishList] = useState([])


  //列表显示
  const [pageMsg, setPageMsg] = useState({
    query: '',
    page: 1,
    pagesize: 10
  })
  const [stateVisible, SetStateVisible] = useState(false)
  const onClose = () => {
    setFileList([])
    SetStateVisible(false)
  };


  // 列表数据和事件处理
  useEffect(() => {
    props.toggleDishPage(pageMsg)
    const {list} = props
    const dish_List = list.records
    setDishList(dish_List)
    //数组长度发生变化后 获取数据 渲染列表
  }, [props.list.total, props.list.page, props.list.size])

  // 修改状态后 部分信息改变 通过memo监听list变化 重新渲染页面
  useMemo(() => {
    const {list} = props
    const dishList = list.records
    setDishList(dishList)
  }, [props.list])


  // 点击编辑按钮后 立马获得点击当前元素的信息
  useEffect(() => {
    // console.log(editValue)
    // console.log(fileLists)
    const picurl = editValue.picture || ''
    if (picurl !== '') {
      console.log(111111)
      const photo = [{
        uid: 123,
        status: 'done',
        type: 'image/png',
        url: `${SERVER_URL}${picurl}`
      }]
      // @ts-ignore
      setFileList(photo)
    } else {

    }
  }, [editValue])


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
  const [drawerType, setDrawerType] = useState('')


  const handleCancel = () => onClose();

  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  // 图片预览
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  };

  // todo 上传多张照片
  const [dishImgUrl, setDishImgUrl] = useState('')
  // @ts-ignore  图片状态发生变化时
  const handleChange = ({fileList}) => {
    setFileList(fileList)
    if (fileList.length > 0 && fileList[0].status === 'done') setDishImgUrl(fileList[0].response[0].file)
  };

  // 图片上传按钮
  const uploadButton = (<div>
    <PlusOutlined/>
    <div style={{marginTop: 8}}>点击上传</div>
  </div>);

  // 新增/编辑菜品表单提交函数
  const handleForm = (value: any) => {
    if (drawerType === '新增菜品') {
      value.picture = dishImgUrl
      props.addDish(value)
    } else {
      // value.categoryId = editValue.categoryId
      value._id = editValue._id
      value.picture = dishImgUrl
      console.log(value)
      props.editDish(value)
    }
    onClose()
  }

  // 删除菜品触发
  const del_dish = (value: Dishes) => {
    const {_id} = value
    props.delDish(_id)
  }


  // 上传前验证图片类型和大小
  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传JPG或者PNG图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2M!');
    }
    return isJpgOrPng && isLt2M;
  }


  // 弹框状态管理 fix 状态存储在缓存 解决每次重新加载页面弹框问题
  useEffect(() => {
    console.log(props)
    const {errorMsgDish, addDishStatus, delDishStatus, editDishStatus} = props
    const aastatus = getStore('addDishStatus')
    const ddstatus = getStore('delDishStatus')
    const eestatus = getStore('editDishStatus')
    //添加
    if (aastatus == addDishStatus) {
    } else {
      console.log(props)
      console.log(errorMsgDish)
      setStore('addDishStatus', addDishStatus)
      if (addDishStatus < 1) message.success('菜品添加成功！')
      else if (errorMsgDish && errorMsgDish.includes('存在')) message.error('此菜品已存在！')
    }
    //删除
    if (ddstatus == delDishStatus) {
    } else {
      setStore('delDishStatus', delDishStatus)
      if (delDishStatus < 1) message.success('菜品删除成功！')
    }
    //修改
    if (eestatus == editDishStatus) {
    } else {
      setStore('editDishStatus', editDishStatus)
      if (editDishStatus < 1) message.success('菜品修改成功！')
    }
  }, [props])

  // .addDishStatus, props.delDishStatus, props.editDishStatus

  return (
      <DocumentTitle title="菜品管理">
        <ConfigProvider locale={zhCN}>
          <Card title="菜品列表" extra={
            <Button onClick={() => {
              SetStateVisible(true)
              setDrawerType('新增菜品')
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
                props.toggleDishPage({
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
            }

            {/*新增菜品抽屉框*/}
            <Drawer
                title={drawerType}
                width={330}
                onClose={onClose}
                visible={stateVisible}
                footer={null}
                destroyOnClose
            >
              <>
                <Upload
                    action={UPPIC_URL}
                    listType="picture-card"
                    fileList={fileLists}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
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
                  <Col span={23}>
                    {
                      drawerType === '新增菜品' &&
                      <Form.Item
                          name="name"
                          label="菜名"
                          rules={[{required: true, message: '请输入名称'}]}
                      >
                          <Input autoFocus={true} placeholder="请输入名称"/>
                      </Form.Item>
                    }
                    {
                      drawerType === '编辑菜品' &&
                      <Form.Item
                          name="name"
                          label="菜名"
                          initialValue={editValue.name}
                          rules={[{required: true, message: '请输入名称'}]}
                      >
                          <Input placeholder="请输入名称" defaultValue={editValue.name} autoFocus={true}/>
                      </Form.Item>
                    }
                  </Col>
                  <Col span={23}>
                    {
                      drawerType === '新增菜品' &&
                      <Form.Item
                          name="price"
                          label="单价"
                          rules={[{required: true, message: '请输入单价'}]}
                      >
                          <Input
                              type={'number'}
                              style={{width: '100%'}}
                              addonAfter="元"
                              placeholder="请输入单价"
                          />
                      </Form.Item>
                    }
                    {
                      drawerType === '编辑菜品' &&
                      <Form.Item
                          initialValue={editValue.price}
                          name="price"
                          label="单价"
                          rules={[{required: true, message: '请输入单价'}]}
                      >
                          <Input
                              type={'number'}
                              style={{width: '100%'}}
                              addonAfter="元"
                              placeholder="请输入单价"
                              defaultValue={editValue.price}
                          />
                      </Form.Item>
                    }
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={23}>
                    {
                      drawerType === '新增菜品' &&
                      <Form.Item
                          name="category"
                          label="分类"
                          rules={[{required: true, message: '请选择分类'}]}
                      >
                          <Select placeholder="请选择分类">
                            {
                              props.cateList &&
                              props.cateList.map((value: any) => (
                                      <Option value={value._id}
                                              key={value._id}>
                                        {value.foodTypeName}
                                      </Option>
                                  )
                              )
                            }
                          </Select>
                      </Form.Item>
                    }
                    {
                      drawerType === '编辑菜品' &&
                      <Form.Item
                          initialValue={editValue.foodTypeName}
                          name="category"
                          label="分类"
                          rules={[{required: true, message: '请选择分类'}]}
                      >
                          <Select placeholder="请选择分类" defaultValue={editValue.foodTypeName}>
                            {
                              props.cateList &&
                              props.cateList.map((value: any) => (
                                      <Option value={value._id}
                                              key={value._id}>
                                        {value.foodTypeName}
                                      </Option>
                                  )
                              )
                            }
                          </Select>
                      </Form.Item>
                    }
                  </Col>
                  <Col span={23}>
                    {
                      drawerType === '新增菜品' &&
                      <Form.Item
                          initialValue={888}
                          name="number"
                          label="库存"
                          rules={[{required: true, message: '请输入库存'}]}
                      >
                          <Input
                              type={'number'}
                              style={{width: '100%'}}
                              placeholder="请输入库存"
                              defaultValue={888}
                          />
                      </Form.Item>
                    }
                    {
                      drawerType === '编辑菜品' &&
                      <Form.Item
                          initialValue={editValue.number}
                          name="number"
                          label="库存"
                          rules={[{required: true, message: '请输入库存'}]}
                      >
                          <Input
                              type={'number'}
                              style={{width: '100%'}}
                              placeholder="请输入库存"
                              defaultValue={editValue.number}
                          />
                      </Form.Item>
                    }
                  </Col>
                </Row>
                <Form.Item style={{marginTop: 66, marginRight: 14}}>
                  <Space style={{float: "right"}}>
                    <Button type="default" onClick={onClose}>取消</Button>
                    {
                      drawerType === '新增菜品' &&
                      <Button type="primary" htmlType="submit"
                              className="login-form-button">添加</Button>
                    }
                    {
                      drawerType === '编辑菜品' &&
                      <Button type="primary" htmlType="submit"
                              className="login-form-button">提交</Button>
                    }
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

