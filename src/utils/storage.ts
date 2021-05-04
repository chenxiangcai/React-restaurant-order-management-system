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
  return !!(userInfo?.status !== 0 && userInfo?.role === 'admin' && getStore('token'));
}

export const isLoginAndChef = () => {
  const userInfo = JSON.parse(getStore('userInfo'))
  return !!(userInfo?.status !== 0 && userInfo?.role === 'chef' && getStore('token'));
}

export const isLoginAndWaiter = () => {
  const userInfo = JSON.parse(getStore('userInfo'))
  return !!(userInfo?.status !== 0 && userInfo?.role === 'waiter' && getStore('token'));
}
