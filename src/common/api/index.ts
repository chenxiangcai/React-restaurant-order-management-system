// 登录模块
export const LoginApi = '/login'
export type LoginApi = typeof LoginApi

// 员工模块
export const STAFFLIST = '/staff'
export type STAFFLIST = typeof STAFFLIST

export const STAFFADD = '/staff/add'
export type STAFFADD = typeof STAFFADD

export const DELSTAFF_URL = '/staff'
export type DELSTAFF_URL = typeof DELSTAFF_URL

export const EDITSTAFF_URL = '/staff/edit'
export type EDITSTAFF_URL = typeof EDITSTAFF_URL

// 菜品模块
export const DISHLIST = '/dish'
export type DISHLIST = typeof DISHLIST

export const CATELIST_URL = '/category'
export type CATELIST_URL = typeof CATELIST_URL

export const ADDDISH_URL = '/dish/add'
export type ADDDISH_URL = typeof ADDDISH_URL

export const DELDISH_URL = '/dish/del'
export type DELDISH_URL = typeof DELDISH_URL

export const EDITDISH_URL = '/dish/edit'
export type EDITDISH_URL = typeof EDITDISH_URL

// 图片上传地址
export const UPPIC_URL = 'http://localhost:8080/upload'
export type UPPIC_URL = typeof UPPIC_URL

// 服务器端地址
export const SERVER_URL = 'http://localhost:8080'
export type SERVER_URL = typeof SERVER_URL
