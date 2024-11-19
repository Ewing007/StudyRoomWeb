<template>
  <div class="container">
    <div class="button-group">
      <el-button type="primary" @click="dialogVisibleFunc('0')"
        >发布遗失信息</el-button
      >
      <el-button type="success" @click="dialogVisibleFunc('1')"
        >发布拾到信息</el-button
      >
    </div>

    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="50%"
      @close="handleClose"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="lostFoundForm"
        label-width="120px"
        class="lost-found-form"
      >
        <el-form-item label="物品类型" prop="itemType">
          <el-select
            v-model="form.itemType"
            placeholder="请选择物品类型"
            disabled
          >
            <el-option label="失物" value="0"></el-option>
            <el-option label="招领" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物品描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item label="遗失或招领地点" prop="location">
          <el-input v-model="form.location"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="contactInfo">
          <el-input v-model="form.contactInfo"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="imageFile">
          <el-upload
            class="upload-demo"
            drag
            action=""
            :on-change="handleFileChange"
            :auto-upload="false"
            :show-file-list="false"
            accept="image/*"
            :before-upload="beforeUpload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将图片拖到此处，或<em>点击上传</em>
            </div>
            <div v-if="form.imageFile" class="preview-image">
              <img :src="imageUrl" alt="预览图片" />
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <h2>遗失信息</h2>
    <div v-if="loading" class="loading-container">
      <el-loading size="large" text="加载中..."></el-loading>
    </div>
    <el-timeline v-else class="timeline">
      <el-timeline-item
        v-for="announcement in lostAnnouncements"
        :key="announcement.id"
        :timestamp="formatDate(announcement.createTime)"
        color="red"
      >
        <el-card class="box-card lost-card" shadow="hover">
          <div class="card-header">
            <h3>
              {{ announcement.itemType === "0" ? "丢失信息" : "拾到信息" }}
            </h3>
            <span
              :class="{
                active: announcement.status === '0',
                expired: announcement.status !== '0',
              }"
            >
              {{ announcement.status === "1" ? "未找到" : "已找到" }}
            </span>
          </div>
          <div class="card-content">
            <h3>{{ announcement.description }}</h3>
            <h3>地点: {{ announcement.location }}</h3>
            <h3>联系方式: {{ announcement.contactInfo }}</h3>
            <div class="image-button-container">
              <img
                v-if="announcement.imageUrl"
                :src="announcement.imageUrl"
                alt="物品图片"
                class="item-image"
              />
              <el-button
                v-if="announcement.userId === userId"
                type="primary"
                @click="markAsFound(announcement.id)"
                :disabled="true"
                >本人发布</el-button
              >
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <h2>拾到信息</h2>
    <div v-if="loading" class="loading-container">
      <el-loading size="large" text="加载中..."></el-loading>
    </div>
    <el-timeline v-else class="timeline">
      <el-timeline-item
        v-for="announcement in foundAnnouncements"
        :key="announcement.id"
        :timestamp="formatDate(announcement.createTime)"
        color="green"
      >
        <el-card class="box-card found-card" shadow="hover">
          <div class="card-header">
            <h3>
              {{ announcement.itemType === "0" ? "丢失信息" : "拾到信息" }}
            </h3>
            <span
              :class="{
                active: announcement.status === '0',
                expired: announcement.status !== '0',
              }"
            >
              {{ announcement.status === "1" ? "未认领" : "已认领" }}
            </span>
          </div>
          <div class="card-content">
            <h3>{{ announcement.description }}</h3>
            <h3>地点: {{ announcement.location }}</h3>
            <h3>联系方式: {{ announcement.contactInfo }}</h3>
            <div class="image-button-container">
              <img
                v-if="announcement.imageUrl"
                :src="announcement.imageUrl"
                alt="物品图片"
                class="item-image"
              />
              <el-button
                type="primary"
                v-if="announcement.userId === userId"
                @click="markAsClaimed(announcement.id)"
                >标记为已认领</el-button
              >
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElUpload,
  ElDialog,
  ElMessage,
  ElTimeline,
  ElTimelineItem,
  ElCard,
  ElLoading,
} from "element-plus";
import { Service } from "../../generated";
import { useStore } from "vuex";

interface Announcement {
  id: number;
  contactInfo: string;
  createTime: string;
  description: string;
  imageUrl: string;
  itemType: string;
  location: string;
  status: string;
  updateTime: string;
  userId: string;
}

const announcements = reactive<Announcement[]>([]);
const showLostForm = ref(false);
const showFoundForm = ref(false);
const store = useStore();
const userId = store.state.user.loginUser.userId;
const loading = ref(true); // 加载状态

let nextId = 1; // 用于生成唯一的 id

const lostFoundForm = ref<InstanceType<typeof ElForm>>();
const dialogVisible = ref(false);
const dialogTitle = ref("失物招领表单");

const form = reactive({
  itemType: "",
  description: "",
  location: "",
  contactInfo: "",
  imageFile: null as File | null,
});

const rules = reactive({
  itemType: [{ required: true, message: "请选择物品类型", trigger: "change" }],
  description: [{ required: true, message: "请输入物品描述", trigger: "blur" }],
  location: [
    { required: true, message: "请输入遗失或招领地点", trigger: "blur" },
  ],
  contactInfo: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
});

const imageUrl = computed(() => {
  if (form.imageFile) {
    return URL.createObjectURL(form.imageFile);
  }
  return "";
});

const lostAnnouncements = computed(() =>
  announcements.filter((a) => a.itemType === "0")
);

const foundAnnouncements = computed(() =>
  announcements.filter((a) => a.itemType === "1")
);

onMounted(async () => {
  try {
    const response = await Service.all();
    if (response.data && Array.isArray(response.data)) {
      announcements.push(...response.data);
      // 更新 nextId 以确保不会重复
      nextId = Math.max(...announcements.map((a) => a.id), 0) + 1;
    }
  } catch (error) {
    console.error("Error fetching lost and found items:", error);
  } finally {
    loading.value = false; // 加载完成后关闭加载状态
  }
});

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const handleFileChange = (file: any, fileList: File[]) => {
  if (file.raw && file.raw.type.startsWith("image/")) {
    form.imageFile = file.raw;
  } else {
    ElMessage.error("只能上传图片文件");
  }
};

const beforeUpload = (file: File) => {
  // 这里可以进行一些额外的校验，例如文件大小限制
  return true;
};

const submitForm = async () => {
  lostFoundForm.value?.validate(async (valid: boolean) => {
    if (valid) {
      let imageUrl = "";

      if (form.imageFile) {
        const formData = new FormData();
        formData.append("file", form.imageFile);
        console.log("Uploading image...", form.imageFile);
        try {
          const response = await Service.uploadLostAndFoundImage(formData);
          if (response.code === "200" && response.data) {
            imageUrl = response.data;
            ElMessage.success("图片上传成功");
          } else {
            ElMessage.error("图片上传失败");
            return;
          }
        } catch (error) {
          ElMessage.error("图片上传失败");
          console.error(error);
          return;
        }
      }

      const newAnnouncement = {
        id: nextId++,
        itemType: form.itemType,
        description: form.description,
        location: form.location,
        contactInfo: form.contactInfo,
        createTime: new Date().toISOString(),
        status: "1",
        updateTime: new Date().toISOString(),
        userId: userId,
        imageUrl: imageUrl,
      };

      try {
        const response = await Service.post1(newAnnouncement);
        console.log("xxfabuchenhh:", response);
        if (response.code === "A4011") {
          announcements.push(newAnnouncement);
          ElMessage.success("信息发布成功");
          resetForm();
          dialogVisible.value = false;
        }
      } catch (error) {
        console.error("Error posting item:", error);
        ElMessage.error("信息发布失败，请稍后再试");
      }
    } else {
      ElMessage.error("请检查表单信息");
    }
  });
};

const resetForm = () => {
  lostFoundForm.value?.resetFields();
  form.imageFile = null;
};

const handleClose = () => {
  dialogVisible.value = false;
  resetForm();
};

const dialogVisibleFunc = (type: string) => {
  form.itemType = type;
  dialogTitle.value = type === "0" ? "发布遗失信息" : "发布拾到信息";
  dialogVisible.value = true;
};

const markAsFound = (id: number) => {
  const announcement = announcements.find((a) => a.id === id);
  if (announcement) {
    announcement.status = "1";
    announcement.updateTime = new Date().toISOString();
  }
};

const markAsClaimed = (id: number) => {
  const announcement = announcements.find((a) => a.id === id);
  if (announcement) {
    announcement.status = "1";
    announcement.updateTime = new Date().toISOString();
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.box-card {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.lost-card {
  background-color: #fff1f0;
}

.found-card {
  background-color: #f0fff0;
}

.box-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.active {
  color: #67c23a;
  font-weight: bold;
  background-color: #e1f3d8;
  padding: 5px 10px;
  border-radius: 5px;
}

.expired {
  color: #f56c6c;
  font-weight: bold;
  background-color: #fde2e2;
  padding: 5px 10px;
  border-radius: 5px;
}

h3 {
  color: #2c3e50;
  font-weight: bold;
}

p {
  color: #606266;
  margin-top: 10px;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.image-button-container {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
}

.item-image {
  max-width: 50%;
  height: auto;
}

.timeline {
  margin-top: 20px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.upload-demo {
  text-align: center;
}

.preview-image {
  margin-top: 10px;
  text-align: center;
}

.preview-image img {
  max-width: 100%;
  max-height: 200px;
}
</style>
