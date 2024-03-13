/* 全局安装 */
import ElementPlus from 'element-plus/es';
import 'element-plus/theme-chalk/src/index.scss';
import 'cropperjs/dist/cropper.css'; // 图像裁剪的 Web 组件

const installer = {
  install(app: { use: (arg0: any) => void; }) {
    app.use(ElementPlus);
  }
};

export default installer;
