import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from "qiankun";

const loader = (loading: boolean) => {
  console.log("loading", loading);
}

let props = {
  name: "abc"
}


/* 

{
      name: "react15",
      entry: 'http://localhost:7102',
      container: '#container',
      activeRule: '/c2',
      props,
      loader
    }
*/
// 注册微应用
registerMicroApps(
  [
    //name: 微应用的名称,
    //entry: 微应用的入口,
    //container: 微应用的容器节点的选择器或者 Element 实例,
    //activeRule: 激活微应用的规则(可以匹配到微应用的路由),
    //loader: 加载微应用的状态 true | false
    {
      name: "purehtml",
      entry: 'http://localhost:7104',
      container: '#container',
      activeRule: '/c1',
      props,
      loader
    },

  ],
  {
    beforeLoad: [
      (app): Promise<any> => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
        return Promise.resolve();
      }
    ],
    beforeMount: [
      (app): Promise<any> => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
        return Promise.resolve();
      }
    ],
    afterUnmount: [
      (app): Promise<any> => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
        return Promise.resolve();
      }
    ]
  }
)

// 设置默认进入的子应用
setDefaultMountApp('/c1')

// 启动应用
start({
  // sandbox: { strictStyleIsolation: true }
})

// 首次加载
runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted')
})