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
export const removeStore = (name: string): any=> {
    if (!name) return
    window.sessionStorage.removeItem(name)
}

export const isLogined = ()=>{
    return !!getStore('token');
}
