export const setStore = (name: string, content: any) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}
export const getStore = (name: string): any => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}
export const removeStore = (name: string): any => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}

export const isLoginAndAdmin = () => {
  const userInfo = JSON.parse(getStore('userInfo'))
  console.log(userInfo)
  // if (userInfo.status === 0) return false
  return !!(userInfo.status !== 0 && getStore('token'));
}
