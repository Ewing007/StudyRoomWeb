<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">用户登录</h2>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="ruleFormRef"
        label-position="top"
        label-width="100px"
        class="login-form"
        :disabled="loading"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            autocomplete="off"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            show-password
          />
        </el-form-item>
        <el-form-item prop="imgVerityCode">
          <el-row>
            <el-col :span="14">
              <el-input
                v-model="loginForm.imgVerityCode"
                placeholder="验证码"
                clearable
              />
            </el-col>
            <el-col :span="10">
              <img
                :src="imgVerifyCodeSrc.imgVerifyCode"
                @click="fetchCaptcha"
                class="captcha-image"
                alt="点击刷新验证码"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-button
          type="primary"
          @click="submitForm(loginForm)"
          class="login-button"
          round
          block
          size="large"
          :loading="loading"
          :disabled="loading"
          >登录</el-button
        >
        <el-link
          class="register-link"
          @click="goToRegister"
          @register-open="handleRegisterOpen"
          >未注册？点击注册</el-link
        >
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, FormInstance } from "element-plus";
import { OpenAPI, Service } from "../../generated";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const emit = defineEmits<{
  (e: "login-success"): void;
  (e: "register-open"): void;
}>();

const loginForm = reactive({
  username: "",
  password: "",
  imgVerityCode: "",
  sessionId: "",
});

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  imgVerityCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

const imgVerifyCodeSrc = reactive({
  imgVerifyCode: "",
});

const loading = ref(false);

const fetchCaptcha = async () => {
  try {
    const response = await Service.getImgVerityCode();
    imgVerifyCodeSrc.imgVerifyCode =
      "data:image/png;base64," + response.data.img;
    loginForm.sessionId = response.data.sessionId;
  } catch (error) {
    console.error("加载验证码失败", error);
  }
};

const submitForm = async (loginForm: any) => {
  loading.value = true;
  const response = await Service.login(loginForm);
  if (response.code === "200") {
    ElMessage.success("登录成功");
    (OpenAPI.HEADERS as any).Authorization = response.data.token;
    await store.dispatch("user/updateUser", response.data.userDto);
    await store.dispatch("user/setToken", response.data.token);
    emit("login-success");
    await router.push("/");
    loading.value = false;
  } else {
    ElMessage.error(response.message || "登录失败，请重试");
    fetchCaptcha(); // 刷新验证码
  }
};

const route = useRoute();
const goToRegister = () => {
  if (route.name === "登录" || route.path === "/login") {
    router.push("/register");
  }
  emit("register-open");
};

fetchCaptcha();
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  padding: 30px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: linear-gradient(135deg, #ffffff, #e0e0e0);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translatey(0);
  }
  50% {
    transform: translatey(-10px);
  }
}

.login-title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 24px;
}

.captcha-image {
  width: 100%;
  height: 40px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.login-button {
  margin-top: 20px;
  font-size: 16px;
  padding: 12px;
  height: 50px;
  width: 100%;
  background: linear-gradient(135deg, #4caf50, #81c784);
  color: white;
  border: none;
}

.login-button:hover {
  background: linear-gradient(135deg, #43a047, #66bb6a);
}

.register-link {
  display: block;
  text-align: center;
  margin-top: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
  background: linear-gradient(135deg, #4caf50, #81c784);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.register-link:hover {
  transform: scale(1.05);
}

.el-link {
  --el-link-hover-text-color: none;
}
</style>
