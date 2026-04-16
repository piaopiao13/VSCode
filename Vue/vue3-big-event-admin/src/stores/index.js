import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// import { useUserStore } from './modules/user'
// export { useUserStore }
// import { useCounterStore } from './modules/counter'
// export { useCounterStore }
// 简写，接收模块的所有的按需导出内容，并重新导出
export * from './modules/user'
export * from './modules/counter'
