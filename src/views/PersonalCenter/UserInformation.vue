<template>
  <el-card class="profile-card" shadow="hover">
    <h2>个人信息</h2>
    <div class="avatar-container">
      <div class="avatar-wrapper">
        <img :src="previewImage || user.avatar" alt="avatar" class="avatar" />
      </div>
    </div>
    <div class="edit-button-container">
      <el-button type="primary" @click="toggleEdit" :loading="loadingEdit">{{
        isEditing ? "取消" : "编辑"
      }}</el-button>
    </div>
    <el-form :model="user" label-width="100px" v-if="isEditing">
      <el-form-item label="用户名">
        <el-input v-model="user.userName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="user.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="displaySex" placeholder="请选择">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="button-container" v-if="isEditing">
      <el-button type="primary" @click="updateUserInfo" :loading="loading"
        >保存信息</el-button
      >
      <el-button type="primary" @click="handleUploadClick" :loading="uploading"
        >更换头像</el-button
      >
      <input
        type="file"
        ref="fileInput"
        accept="image/jpeg"
        style="display: none"
        @change="handleFileChange"
      />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import {
  ElContainer,
  ElAside,
  ElMenu,
  ElMenuItem,
  ElMain,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElSelect,
  ElOption,
  ElMessage,
  ElLoading,
} from "element-plus";
import { useStore } from "vuex";
import { Service } from "../../../generated/services/Service";
import { useRouter } from "vue-router";

interface User {
  userName: string;
  email: string;
  phoneNumber: string;
  sex: string;
  avatar: string;
}

const store = useStore();
const loginUser = store.state.user.loginUser;
console.log("user：", loginUser);
const user = reactive<User>({
  userName: loginUser.userName,
  email: loginUser.email,
  phoneNumber: loginUser.phoneNumber,
  sex: loginUser.sex,
  avatar: loginUser.avatar,
});
console.log(user.sex);
const previewImage = ref<string | null>(null);
const uploading = ref(false); // 控制上传按钮的加载状态
const fileInput = ref<HTMLInputElement | null>(null);
const isEditing = ref(false); // 控制表单的显示状态
const loading = ref(false);
const loadingEdit = ref(false); // 控制编辑按钮的加载状态

const handleUploadClick = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  console.log("文件类型：", file);
  if (file) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 5;

    if (!isJPG) {
      ElMessage.error("上传头像图片只能是 JPG 格式!");
      return;
    }
    if (!isLt2M) {
      ElMessage.error("上传头像图片大小不能超过 2MB!");
      return;
    }

    if (isJPG && isLt2M) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.value = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      uploading.value = true;
      try {
        const formData = new FormData();
        formData.append("file", file);
        const result = await Service.uploadAvatar(formData); // 传递包装后的对象
        ElMessage.success("头像上传成功");
        // 更新本地用户对象
        user.avatar = result.data.url;
        // 更新 Vuex store 中的用户头像
        await store.dispatch("user/updateAvatar", { avatar: result.data });

        console.log("更新后的用户数据:", user);
      } catch (error) {
        ElMessage.error("头像上传失败，请稍后再试");
      } finally {
        uploading.value = false;
      }
    }
  }
};

const displaySex = computed({
  get: () => {
    // 确保 user.sex 不为 null 或 undefined
    return user.sex === "1" ? "male" : user.sex === "0" ? "female" : "";
  },
  set: (value) => {
    // 确保 value 是有效的
    user.sex = value === "male" ? "1" : value === "female" ? "0" : "";
  },
});

const updateUserInfo = async () => {
  loading.value = true;
  try {
    const userToUpdate = {
      ...user,
      sex: user.sex, // 直接使用 user.sex，因为已经通过计算属性进行了转换
    };

    // 确保 userToUpdate 不为 null 或 undefined
    if (!userToUpdate) {
      ElMessage.error("用户信息为空，无法更新");
      return;
    }

    const resp = await Service.update(userToUpdate);
    console.log("更新结果：", resp);
    if (resp.code === "200") {
      await store.dispatch("user/updateUser", resp.data.userDto);
      ElMessage.success("用户信息更新成功");
      isEditing.value = false; // 更新成功后关闭编辑模式
    } else {
      ElMessage.error(`用户信息更新失败: ${resp.message}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error(`用户信息更新失败: ${error.message}`);
    } else {
      ElMessage.error("用户信息更新失败，请稍后再试");
    }
  } finally {
    loading.value = false;
  }
};

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    // 如果关闭编辑模式，重置表单数据
    user.userName = loginUser.userName;
    user.email = loginUser.email;
    user.phoneNumber = loginUser.phoneNumber;
    user.sex = loginUser.sex;
  }
};
</script>

<style scoped>
.profile-card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.avatar-container {
  display: flex;
  justify-content: center; /* 居中显示 */
  margin-bottom: 20px;
}

.avatar-wrapper {
  text-align: center;
}

.avatar {
  width: 120px; /* 增大头像尺寸 */
  height: 120px;
  border-radius: 50%;
}

.edit-button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.upload-button {
  margin-left: 20px;
}
</style>
