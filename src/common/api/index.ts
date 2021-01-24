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

// 菜品模块
export const DISHLIST = '/admin/dish'
export type DISHLIST = typeof DISHLIST

export const CATELIST_URL = '/admin/category'
export type CATELIST_URL = typeof CATELIST_URL

export const ADDDISH_URL = '/admin/dish/add'
export type ADDDISH_URL = typeof ADDDISH_URL

export const DELDISH_URL = '/admin/dish/del'
export type DELDISH_URL = typeof DELDISH_URL

export const EDITDISH_URL = '/admin/dish/edit'
export type EDITDISH_URL = typeof EDITDISH_URL

// 分类模块
export const GETCATELIST_URL = '/category'
export type GETCATELIST_URL = typeof GETCATELIST_URL

export const ADDCATELIST_URL = '/category/add'
export type ADDCATELIST_URL = typeof ADDCATELIST_URL

export const EDITCATE_URL = '/category/edit'
export type EDITCATE_URL = typeof EDITCATE_URL

export const DELCATE_URL = '/category/del'
export type DELCATE_URL = typeof DELCATE_URL

// 图片上传地址
export const UPPIC_URL = 'http://localhost:8080/upload'
export type UPPIC_URL = typeof UPPIC_URL

// 服务器端地址
export const SERVER_URL = 'http://localhost:8080'
export type SERVER_URL = typeof SERVER_URL
