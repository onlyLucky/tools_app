<template>
  <div class="loginWrapper">
    <el-card shadow="always" class="loginCard">
      <div class="loginCover">
        <h1 class="loginTitle">RuoYi EleAdmin</h1>
        <h4 class="loginSubtitle">界面美观组件丰富的中后台前端解决方案</h4>
      </div>
      <div class="loginBody">
        <el-text type="heading" style="font-size: 24px;font-weight: bold; margin-bottom: 18px;display: block;">
          用户登录
        </el-text>
        <Segmented
          v-model="tabActive"
          :items="[
            { label: '密码登录', value: 1 },
            { label: '扫码登录', value: 2 },
          ]"
          style="margin-bottom: 18px"
          @change="onTabChange"
        />
        <el-form
          v-if="tabActive == 1"
          ref="formRef"
          size="large"
          :model="form"
          :rules="rules"
          @keyup.enter="submit"
        >
          <el-form-item prop="username">
            <el-input
              clearable
              v-model="form.username"
              placeholder="请输入登录账号"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              show-password
              placeholder="请输入登录密码"
              :prefix-icon="Lock"
            />
          </el-form-item>
          <el-form-item prop="code">
            <div class="login-captcha-group">
              <el-input
                clearable
                v-model="form.code"
                placeholder="请输入验证码"
                :prefix-icon="ProtectOutlined"
              />
              <div class="login-captcha">
                <!-- <img v-if="captcha" :src="captcha"/> -->
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.remember">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              size="large"
              type="primary"
              :loading="loading"
              style="width: 100%"
              @click="submit"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <div v-else class="login-qrcode-group">
          
        </div>
      </div>
    </el-card>
    
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import { ProtectOutlined } from '@/components/icons';
import Segmented from '@/components/segmented/index.vue';
// 页签选中
const tabActive = ref(1);
// 表单
const formRef = ref();
// 加载状态
const loading = ref(false);
// 表单数据
const form = reactive({
  username: 'admin',
  password: 'admin123',
  code: '',
  uuid: '',
  remember: true
});
// 表单验证规则
const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入登录账号',
      type: 'string',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入登录密码',
      type: 'string',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      type: 'string',
      trigger: 'blur'
    }
  ]
})

// 二维码
const qrcode = ref("");

  /* 刷新二维码 */
const refreshQrCode = () => {
  qrcode.value = `https://api.eleadmin.com/v2/auth/login?code=${new Date().getTime()}`;
};

  /* 选项卡切换事件 */
  const onTabChange = (active: number) => {
    if (active === 2) {
      refreshQrCode();
    }
  };
  /* 跳转到首页 */
  /* const goHome = () => {
    const { query } = unref(currentRoute);
    goHomeRoute(query.from);
  }; */
  /* 提交 */
  const submit = () => {};
</script>
<style lang="scss" scoped>
  /* ::v-deep .ele-card-body {
    padding: 0;
    display: flex;
  } */
  .loginWrapper {
    min-height: 100vh;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('/src/assets/login-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    :deep(.el-card){
      border-radius: 8px;
      border-color: #e8e8e8;
      border: none;
    }
    .loginCard {
      width: 920px;
      max-width: 100%;
      overflow: hidden;

      :deep(.el-card__body) {
        display: flex;
        padding: 0;
        height: 462px;
      }
    }
  }
  .loginCover {
    flex: 1;
    padding: 36px 8px;
    box-sizing: border-box;
    background-color: #1681fd;
    background-image: url('/src/assets/login-img.png');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
    text-align: center;
    .loginTitle {
      color: rgba(255, 255, 255, 0.98);
      font-size: 26px;
      margin: 0 0 6px 0;
      font-weight: normal;
      font-family: 'AliPuHui';
      letter-spacing: 1.2px;
    }

    .loginSubtitle {
      color: rgba(255, 255, 255, 0.8);
      font-size: 16px;
      margin: 0;
      font-weight: normal;
      font-family: 'AliPuHui';
      letter-spacing: 4px;
    }
  }

  .loginBody {
    width: 400px;
    flex-shrink: 0;
    padding: 32px 48px;
    box-sizing: border-box;

    :deep(.el-checkbox) {
      height: auto;

      .el-checkbox__label {
        color: inherit;
      }
    }

    :deep(.el-input__prefix-inner > .el-icon) {
      margin-right: 12px;
      transform: scale(1.26) translateY(-1px);
    }
  }
  /* 阿里巴巴普惠体 */
  @font-face {
    font-family: 'AliPuHui';
    font-weight: 300;
    src: (
      url('/src/assets/fonts/AliPuHui.woff2')
        format('woff2'),
      url('/src/assets/fonts/AliPuHui.woff')
        format('woff')
    );
    font-display: swap;
  }

  /* 二维码 */
  .login-qrcode-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 0;
  }

  .login-qrcode {
    font-size: 0;
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
  }

  /* 小屏幕适应 */
  @media screen and (max-width: 680px) {
    .loginWrapper {
      padding: 0;
      display: block;
      background: #fff;

      .loginCard {
        width: 100%;
        background: none;
        box-shadow: none;
        border-radius: 0;
        border: none;
        :deep(.el-card__body) {
          display: block;
          height: auto;
        }
      }
    }

    .loginCover {
      padding: 24px 12px 100px 12px;
      background-size: auto 100px;
    }

    .loginBody {
      width: 100%;
    }
  }
</style>

<style lang="scss">
  html.dark .loginWrapper {
    background: #000;
    filter: brightness(0.88);
  }
</style>
