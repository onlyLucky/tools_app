import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import Compression from 'vite-plugin-compression';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
/* export default defineConfig({
  plugins: [vue()],
}) */

interface AliasObject {
  [key: string]: string;
}

export default defineConfig(({ command }) => {
  console.log("command:====", command)
  const isBuild = command === 'build';
  // 添加类型别名
  const alias: AliasObject = {
    '@/': resolve('src') + '/'
  };
  const plugins = [vue()];
  // 判断当前是否为build
  if (isBuild) {
    // 组件按需引入
    plugins.push(
      Components({
        dts: false,
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      })
    );
    // gzip压缩
    plugins.push(
      Compression({
        disable: !isBuild,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    );
  } else {
    // 开发环境全局安装
    alias['./as-needed'] = './global-import';
  }
  return {
    resolve: { alias },
    plugins,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    // 配置依赖优化的行为 Vite 会自动将所有 JavaScript 依赖项打包到单个文件中，这可以减少加载时间和带宽使用，提高应用程序的性能
    optimizeDeps: {
      include: [
        'vuedraggable',
        'sortablejs'
      ]
    },
    // 配置打包，兼容浏览器对象 
    build: {
      target: 'chrome63',
      chunkSizeWarningLimit: 2000
    }
  }
})

