<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="register-title">用户注册</h2>
      <el-form
        :model="registerForm"
        :rules="rules"
        ref="ruleFormRef"
        label-position="top"
        label-width="100px"
        class="register-form"
      >
        <el-form-item prop="phone">
          <el-input
            v-model="registerForm.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-phone"
            clearable
            class="input-field"
          />
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            clearable
            class="input-field"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
            class="input-field"
          />
        </el-form-item>
        <el-form-item prop="imgVerityCode">
          <el-row>
            <el-col :span="14">
              <el-input
                v-model="registerForm.imgVerityCode"
                placeholder="请输入验证码"
                clearable
                class="input-field"
              />
            </el-col>
            <el-col :span="10">
              <img
                :src="imgVerifyCodeSrc.imgVerifyCode"
                @click="fetchCaptcha"
                class="captcha-image"
                alt="验证码"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-button
          type="primary"
          @click="submitForm(registerForm)"
          class="register-button"
          round
          block
          size="large"
          >注册</el-button
        >
        <el-link class="login-link" @click="goToLogin"
          >已有账号？点击登录</el-link
        >
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, FormInstance } from "element-plus";
import { Service } from "../../generated"; // 确保你有这个路径

const router = useRouter();
const ruleFormRef = ref<FormInstance>();

// 定义 emit，指定自定义事件
const emit = defineEmits<{
  (e: "login-success"): void; // 声明登录成功事件
  (e: "login-open"): void; // 声明登录打开事件
}>();
// 定义注册表单数据
const registerForm = ref({
  phone: "",
  username: "",
  password: "",
  imgVerityCode: "",
  sessionId: "",
});

// 定义验证规则
const rules = {
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  imgVerityCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

// 获取验证码函数
const imgVerifyCodeSrc = reactive({
  imgVerifyCode: "",
});

const fetchCaptcha = async () => {
  try {
    const response = await Service.getImgVerityCode(); // 替换为你的验证码接口
    imgVerifyCodeSrc.imgVerifyCode =
      "data:image/png;base64," + response.data.img;
    registerForm.value.sessionId = response.data.sessionId;
  } catch (error) {
    console.error("加载验证码失败", error);
  }
};

// 提交注册表单
const submitForm = async (registerForm: any) => {
  const response = await Service.register(registerForm); // 替换为你的注册接口
  if (response.code === "200") {
    ElMessage.success("注册成功");
    setTimeout(() => {
      // 这里可以选择跳转到登录页面
      ElMessage.success("跳转到登录页面...");
      emit("login-open");
    }, 1000);
  } else {
    ElMessage.error(response.data.message);
  }
};

// 跳转到登录页面
const route = useRoute();
const goToLogin = () => {
  if (route.name === "注册" || route.path === "/register") {
    router.push("/login");
  }
  emit("login-open");
};

// 页面加载时获取验证码
fetchCaptcha();
</script>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  /*background: linear-gradient(135deg, #f0f2f5, #e8eff0);*/
  background: white;
  padding: 20px;
}

.register-card {
  padding: 30px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: linear-gradient(135deg, #ffffff, #e0e0e0); /* 卡片渐变背景 */
  animation: float 3s ease-in-out infinite; /* 添加浮动动画 */
}

@keyframes float {
  0%,
  100% {
    transform: translatey(0); /* 初始和结束位置 */
  }
  50% {
    transform: translatey(-10px); /* 上浮10像素 */
  }
}

.register-card:hover {
  transform: translateY(-10px); /* 悬停时向上浮动 */
}

.register-title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 24px;
  font-weight: bold;
}

.input-field {
  border-radius: 5px;
  background-color: #f9f9f9;
}

.captcha-image {
  width: 100%;
  height: 40px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #e0e0e0;
}

.register-button {
  margin-top: 20px;
  background: linear-gradient(135deg, #4caf50, #81c784); /* 按钮渐变背景 */
  color: white;
  margin-left: auto;
  font-size: 16px; /* 增加字体大小 */
  padding: 12px; /* 增加内边距，使按钮更大 */
  height: 50px; /* 设置按钮的高度 */
  width: 100%; /* 使按钮宽度占满父容器 */
}

.register-button:hover {
  background: linear-gradient(135deg, #43a047, #66bb6a); /* 悬停时的渐变颜色 */
}

.login-link {
  display: block;
  text-align: center;
  margin-top: 12px;
  color: transparent; /* 透明颜色 */
  background: linear-gradient(135deg, #4caf50, #81c784); /* 链接渐变背景 */
  -webkit-background-clip: text; /* 将背景剪裁到文本 */
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease; /* 添加过渡效果 */
}

.login-link:hover {
  color: #66b1ff; /* 悬停时变更颜色 */
  transform: scale(1.05); /* 悬停时放大 */
}

.el-link {
  --el-link-hover-text-color: none;
}
</style>
