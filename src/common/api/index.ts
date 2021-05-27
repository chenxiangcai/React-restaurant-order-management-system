// 登录模块
export const LoginApi = '/login'
export type LoginApi = typeof LoginApi

// 员工模块
export const STAFFLIST = '/admin/staff'
export type STAFFLIST = typeof STAFFLIST

export const STAFFADD = '/admin/staff/add'
export type STAFFADD = typeof STAFFADD

export const DELSTAFF_URL = '/admin/staff'
export type DELSTAFF_URL = typeof DELSTAFF_URL

export const EDITSTAFF_URL = '/admin/staff/edit'
export type EDITSTAFF_URL = typeof EDITSTAFF_URL

export const WSTAFFLIST = '/waiter/staff'
export type WSTAFFLIST = typeof WSTAFFLIST

// 菜品模块
export const DISHLIST = '/admin/dish'
export type DISHLIST = typeof DISHLIST

export const CATELIST_URL = '/admin/category'
export type CATELIST_URL = typeof CATELIST_URL

export const CATESEARCH_URL = '/category/search'
export type CATESEARCH_URL = typeof CATESEARCH_URL

export const ADDDISH_URL = '/admin/dish/add'
export type ADDDISH_URL = typeof ADDDISH_URL

export const DELDISH_URL = '/admin/dish/del'
export type DELDISH_URL = typeof DELDISH_URL

export const EDITDISH_URL = '/admin/dish/edit'
export type EDITDISH_URL = typeof EDITDISH_URL

// 分类模块
export const GETCATELIST_URL = '/admin/category'
export type GETCATELIST_URL = typeof GETCATELIST_URL

export const ADDCATELIST_URL = '/admin/category/add'
export type ADDCATELIST_URL = typeof ADDCATELIST_URL

export const EDITCATE_URL = '/admin/category/edit'
export type EDITCATE_URL = typeof EDITCATE_URL

export const DELCATE_URL = '/admin/category/del'
export type DELCATE_URL = typeof DELCATE_URL

// 会员分类模块
export const CUSCATELIST_URL = '/admin/customer/cate'
export type CUSCATELIST_URL = typeof CUSCATELIST_URL

export const CUSCATEEDIT_URL = '/admin/customer/cate/edit'
export type CUSCATEEDIT_URL = typeof CUSCATEEDIT_URL

export const CUSCATEDEL_URL = '/admin/customer/cate/del'
export type CUSCATEDEL_URL = typeof CUSCATEDEL_URL

export const CUSCATEADD_URL = '/admin/customer/cate/add'
export type CUSCATEADD_URL = typeof CUSCATEADD_URL

export const WCUSCATELIST_URL = '/waiter/customer/cate'
export type WCUSCATELIST_URL = typeof WCUSCATELIST_URL

// 会员列表模块
export const CUSLIST_URL = '/admin/customer'
export type CUSLIST_URL = typeof CUSLIST_URL

export const CUSEDIT_URL = '/admin/customer/edit'
export type CUSEDIT_URL = typeof CUSEDIT_URL

export const CUSDEL_URL = '/admin/customer/del'
export type CUSDEL_URL = typeof CUSDEL_URL

export const CUSADD_URL = '/admin/customer/add'
export type CUSADD_URL = typeof CUSADD_URL

export const WCUSLIST_URL = '/waiter/customer'
export type WCUSLIST_URL = typeof CUSLIST_URL

export const WCUSADD_URL = '/waiter/customer/add'
export type WCUSADD_URL = typeof WCUSADD_URL

// 订单列表模块
export const ORDERLIST_URL = '/admin/order'
export type ORDERLIST_URL = typeof ORDERLIST_URL

export const ORDEREDIT_URL = '/admin/order/edit'
export type ORDEREDIT_URL = typeof ORDEREDIT_URL

export const ORDERDEL_URL = '/admin/order/del'
export type ORDERDEL_URL = typeof ORDERDEL_URL

export const CUSORDERADD_URL = '/cus/order/add'
export type CUSORDERADD_URL = typeof CUSORDERADD_URL

export const CUSORDEREDIT_URL = '/cus/order/edit'
export type CUSORDEREDIT_URL = typeof CUSORDEREDIT_URL

export const CORDERLIST_URL = '/chef/order'
export type CORDERLIST_URL = typeof CORDERLIST_URL

export const CORDEREDIT_URL = '/chef/order/edit'
export type CORDEREDIT_URL = typeof CORDEREDIT_URL

export const WORDERLIST_URL = '/waiter/order'
export type WORDERLIST_URL = typeof WORDERLIST_URL

export const WORDEREDIT_URL = '/waiter/order/edit'
export type WORDEREDIT_URL = typeof WORDEREDIT_URL

export const WDISH_URL = '/waiter/dish'
export type WDISH_URL = typeof WDISH_URL

export const WORDERADD_URL = '/waiter/order/add'
export type WORDERADD_URL = typeof WORDERADD_URL

// 看板
export const DASHBOARD_URL = '/admin/dashboard'
export type DASHBOARD_URL = typeof DASHBOARD_URL

//密码
export const PWD_URL = '/staff/pwd'
export type PWD_URL = typeof PWD_URL

//餐桌
export const QR_URL = '/admin/qrcode'
export type QR_URL = typeof QR_URL
export const WQR_URL = '/waiter/qrcode'
export type WQR_URL = typeof WQR_URL

export const TABLE_URL = '/admin/table'
export type TABLE_URL = typeof TABLE_URL

export const TABLEADD_URL = '/admin/table/add'
export type TABLEADD_URL = typeof TABLEADD_URL

export const TABLEEDIT_URL = '/admin/table/edit'
export type TABLEEDIT_URL = typeof TABLEEDIT_URL

export const TABLEDEL_URL = '/admin/table/del'
export type TABLEDEL_URL = typeof TABLEDEL_URL

export const WTABLE_URL = '/waiter/table'
export type WTABLE_URL = typeof WTABLE_URL


// 图片上传地址 'https://trylive.top:8300/upload' http://localhost:8300/upload
export const UPPIC_URL = 'https://trylive.top/upload'
export type UPPIC_URL = typeof UPPIC_URL

// 服务器端地址 'https://trylive.top:8300' http://localhost:8300
export const SERVER_URL = 'https://trylive.top'
export type SERVER_URL = typeof SERVER_URL

//server https://trylive.top
export const SERVERNO_URL = 'https://trylive.top'
export type SERVERNO_URL = typeof SERVERNO_URL

// ws地址 wss://trylive.top ws://localhost:8300
export const WEBSOCKET_URL = 'wss://trylive.top'
export type WEBSOCKET_URL = typeof WEBSOCKET_URL

export const LOCAL_URL = 'http://localhost:8300'
export type LOCAL_URL = typeof LOCAL_URL


/** 前台 */
export const HOMEDOSH_URL = '/home'
export type HOMEDOSH_URL = typeof HOMEDOSH_URL

export const HOMEDISHCATE_URL = '/home/cate'
export type HOMEDISHCATE_URL = typeof HOMEDISHCATE_URL

export const ISCUS_URL = '/home/iscus'
export type ISCUS_URL = typeof ISCUS_URL

export const SEARCHDISH_URL = '/home/dish/search'
export type SEARCHDISH_URL = typeof SEARCHDISH_URL
