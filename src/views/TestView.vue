<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <div class="container">&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="button-group">&ndash;&gt;-->
<!--&lt;!&ndash;      <el-button type="primary" @click="dialogVisibleFunc('0')"&ndash;&gt;-->
<!--&lt;!&ndash;        >发布遗失信息</el-button&ndash;&gt;-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;      <el-button type="success" @click="dialogVisibleFunc('1')"&ndash;&gt;-->
<!--&lt;!&ndash;        >发布拾到信息</el-button&ndash;&gt;-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->

<!--&lt;!&ndash;    <el-dialog&ndash;&gt;-->
<!--&lt;!&ndash;      :title="dialogTitle"&ndash;&gt;-->
<!--&lt;!&ndash;      v-model="dialogVisible"&ndash;&gt;-->
<!--&lt;!&ndash;      width="50%"&ndash;&gt;-->
<!--&lt;!&ndash;      @close="handleClose"&ndash;&gt;-->
<!--&lt;!&ndash;    >&ndash;&gt;-->
<!--&lt;!&ndash;      <el-form&ndash;&gt;-->
<!--&lt;!&ndash;        :model="form"&ndash;&gt;-->
<!--&lt;!&ndash;        :rules="rules"&ndash;&gt;-->
<!--&lt;!&ndash;        ref="lostFoundForm"&ndash;&gt;-->
<!--&lt;!&ndash;        label-width="120px"&ndash;&gt;-->
<!--&lt;!&ndash;        class="lost-found-form"&ndash;&gt;-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="物品类型" prop="itemType">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-select&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="form.itemType"&ndash;&gt;-->
<!--&lt;!&ndash;            placeholder="请选择物品类型"&ndash;&gt;-->
<!--&lt;!&ndash;            disabled&ndash;&gt;-->
<!--&lt;!&ndash;          >&ndash;&gt;-->
<!--&lt;!&ndash;            <el-option label="失物" value="0"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-option label="招领" value="1"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-select>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="物品描述" prop="description">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="form.description"&ndash;&gt;-->
<!--&lt;!&ndash;            type="textarea"&ndash;&gt;-->
<!--&lt;!&ndash;            :rows="4"&ndash;&gt;-->
<!--&lt;!&ndash;          ></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="遗失或招领地点" prop="location">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input v-model="form.location"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="联系方式" prop="contactInfo">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input v-model="form.contactInfo"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="上传图片" prop="imageFile">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-upload&ndash;&gt;-->
<!--&lt;!&ndash;            class="upload-demo"&ndash;&gt;-->
<!--&lt;!&ndash;            drag&ndash;&gt;-->
<!--&lt;!&ndash;            action=""&ndash;&gt;-->
<!--&lt;!&ndash;            :on-change="handleFileChange"&ndash;&gt;-->
<!--&lt;!&ndash;            :auto-upload="false"&ndash;&gt;-->
<!--&lt;!&ndash;            :show-file-list="false"&ndash;&gt;-->
<!--&lt;!&ndash;            accept="image/*"&ndash;&gt;-->
<!--&lt;!&ndash;            :before-upload="beforeUpload"&ndash;&gt;-->
<!--&lt;!&ndash;          >&ndash;&gt;-->
<!--&lt;!&ndash;            <i class="el-icon-upload"></i>&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="el-upload__text">&ndash;&gt;-->
<!--&lt;!&ndash;              将图片拖到此处，或<em>点击上传</em>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;            <div v-if="form.imageFile" class="preview-image">&ndash;&gt;-->
<!--&lt;!&ndash;              <img :src="imageUrl" alt="预览图片" />&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-upload>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button type="primary" @click="submitForm">提交</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button @click="resetForm">重置</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-form>&ndash;&gt;-->
<!--&lt;!&ndash;    </el-dialog>&ndash;&gt;-->

<!--&lt;!&ndash;    <h2>遗失信息</h2>&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-if="loading" class="loading-container">&ndash;&gt;-->
<!--&lt;!&ndash;      <el-loading size="large" text="加载中..."></el-loading>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    <el-timeline v-else class="timeline">&ndash;&gt;-->
<!--&lt;!&ndash;      <el-timeline-item&ndash;&gt;-->
<!--&lt;!&ndash;        v-for="announcement in lostAnnouncements"&ndash;&gt;-->
<!--&lt;!&ndash;        :key="announcement.id"&ndash;&gt;-->
<!--&lt;!&ndash;        :timestamp="formatDate(announcement.createTime)"&ndash;&gt;-->
<!--&lt;!&ndash;        color="red"&ndash;&gt;-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;        <el-card class="box-card lost-card" shadow="hover">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="card-header">&ndash;&gt;-->
<!--&lt;!&ndash;            <h3>&ndash;&gt;-->
<!--&lt;!&ndash;              {{ announcement.itemType === "0" ? "丢失信息" : "拾到信息" }}&ndash;&gt;-->
<!--&lt;!&ndash;            </h3>&ndash;&gt;-->
<!--&lt;!&ndash;            <span&ndash;&gt;-->
<!--&lt;!&ndash;              :class="{&ndash;&gt;-->
<!--&lt;!&ndash;                active: announcement.status === '0',&ndash;&gt;-->
<!--&lt;!&ndash;                expired: announcement.status !== '0',&ndash;&gt;-->
<!--&lt;!&ndash;              }"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              {{ announcement.status === "1" ? "未找到" : "已找到" }}&ndash;&gt;-->
<!--&lt;!&ndash;            </span>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;          <h3>{{ announcement.description }}</h3>&ndash;&gt;-->
<!--&lt;!&ndash;          <h3>地点: {{ announcement.location }}</h3>&ndash;&gt;-->
<!--&lt;!&ndash;          <h3>联系方式: {{ announcement.contactInfo }}</h3>&ndash;&gt;-->
<!--&lt;!&ndash;          <img&ndash;&gt;-->
<!--&lt;!&ndash;            v-if="announcement.imageUrl"&ndash;&gt;-->
<!--&lt;!&ndash;            :src="announcement.imageUrl"&ndash;&gt;-->
<!--&lt;!&ndash;            alt="物品图片"&ndash;&gt;-->
<!--&lt;!&ndash;            class="item-image"&ndash;&gt;-->
<!--&lt;!&ndash;          />&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button&ndash;&gt;-->
<!--&lt;!&ndash;            v-if="announcement.userId === userId"&ndash;&gt;-->
<!--&lt;!&ndash;            type="primary"&ndash;&gt;-->
<!--&lt;!&ndash;            @click="markAsFound(announcement.id)"&ndash;&gt;-->
<!--&lt;!&ndash;            >标记为已找到</el-button&ndash;&gt;-->
<!--&lt;!&ndash;          >&ndash;&gt;-->
<!--&lt;!&ndash;        </el-card>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-timeline-item>&ndash;&gt;-->
<!--&lt;!&ndash;    </el-timeline>&ndash;&gt;-->

<!--&lt;!&ndash;    <h2>拾到信息</h2>&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-if="loading" class="loading-container">&ndash;&gt;-->
<!--&lt;!&ndash;      <el-loading size="large" text="加载中..."></el-loading>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    <el-timeline v-else class="timeline">&ndash;&gt;-->
<!--&lt;!&ndash;      <el-timeline-item&ndash;&gt;-->
<!--&lt;!&ndash;        v-for="announcement in foundAnnouncements"&ndash;&gt;-->
<!--&lt;!&ndash;        :key="announcement.id"&ndash;&gt;-->
<!--&lt;!&ndash;        :timestamp="formatDate(announcement.createTime)"&ndash;&gt;-->
<!--&lt;!&ndash;        color="green"&ndash;&gt;-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;        <el-card class="box-card found-card" shadow="hover">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="card-header">&ndash;&gt;-->
<!--&lt;!&ndash;            <h3>&ndash;&gt;-->
<!--&lt;!&ndash;              {{ announcement.itemType === "0" ? "丢失信息" : "拾到信息" }}&ndash;&gt;-->
<!--&lt;!&ndash;            </h3>&ndash;&gt;-->
<!--&lt;!&ndash;            <span&ndash;&gt;-->
<!--&lt;!&ndash;              :class="{&ndash;&gt;-->
<!--&lt;!&ndash;                active: announcement.status === '0',&ndash;&gt;-->
<!--&lt;!&ndash;                expired: announcement.status !== '0',&ndash;&gt;-->
<!--&lt;!&ndash;              }"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              {{ announcement.status === "1" ? "未认领" : "已认领" }}&ndash;&gt;-->
<!--&lt;!&ndash;            </span>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;          <h3>{{ announcement.description }}</h3>&ndash;&gt;-->
<!--&lt;!&ndash;          <h3>地点: {{ announcement.location }}</h3>&ndash;&gt;-->
<!--&lt;!&ndash;          <h3>联系方式: {{ announcement.contactInfo }}</h3>&ndash;&gt;-->
<!--&lt;!&ndash;          <img&ndash;&gt;-->
<!--&lt;!&ndash;            v-if="announcement.imageUrl"&ndash;&gt;-->
<!--&lt;!&ndash;            :src="announcement.imageUrl"&ndash;&gt;-->
<!--&lt;!&ndash;            alt="物品图片"&ndash;&gt;-->
<!--&lt;!&ndash;            class="item-image"&ndash;&gt;-->
<!--&lt;!&ndash;          />&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button&ndash;&gt;-->
<!--&lt;!&ndash;            type="primary"&ndash;&gt;-->
<!--&lt;!&ndash;            v-if="announcement.userId === userId"&ndash;&gt;-->
<!--&lt;!&ndash;            @click="markAsClaimed(announcement.id)"&ndash;&gt;-->
<!--&lt;!&ndash;            >标记为已认领</el-button&ndash;&gt;-->
<!--&lt;!&ndash;          >&ndash;&gt;-->
<!--&lt;!&ndash;        </el-card>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-timeline-item>&ndash;&gt;-->
<!--&lt;!&ndash;    </el-timeline>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<style scoped>&ndash;&gt;-->
<!--&lt;!&ndash;.container {&ndash;&gt;-->
<!--&lt;!&ndash;  max-width: 800px;&ndash;&gt;-->
<!--&lt;!&ndash;  margin: 0 auto;&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.button-group {&ndash;&gt;-->
<!--&lt;!&ndash;  display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;  justify-content: space-between;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.box-card {&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  border-radius: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;  transition: transform 0.3s, box-shadow 0.3s;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.lost-card {&ndash;&gt;-->
<!--&lt;!&ndash;  background-color: #fff1f0;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.found-card {&ndash;&gt;-->
<!--&lt;!&ndash;  background-color: #f0fff0;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.box-card:hover {&ndash;&gt;-->
<!--&lt;!&ndash;  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);&ndash;&gt;-->
<!--&lt;!&ndash;  transform: translateY(-5px);&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.card-header {&ndash;&gt;-->
<!--&lt;!&ndash;  display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;  justify-content: space-between;&ndash;&gt;-->
<!--&lt;!&ndash;  align-items: center;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.active {&ndash;&gt;-->
<!--&lt;!&ndash;  color: #67c23a;&ndash;&gt;-->
<!--&lt;!&ndash;  font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;  background-color: #e1f3d8;&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 5px 10px;&ndash;&gt;-->
<!--&lt;!&ndash;  border-radius: 5px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.expired {&ndash;&gt;-->
<!--&lt;!&ndash;  color: #f56c6c;&ndash;&gt;-->
<!--&lt;!&ndash;  font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;  background-color: #fde2e2;&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 5px 10px;&ndash;&gt;-->
<!--&lt;!&ndash;  border-radius: 5px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;h3 {&ndash;&gt;-->
<!--&lt;!&ndash;  color: #2c3e50;&ndash;&gt;-->
<!--&lt;!&ndash;  font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;p {&ndash;&gt;-->
<!--&lt;!&ndash;  color: #606266;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-top: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.item-image {&ndash;&gt;-->
<!--&lt;!&ndash;  max-width: 50%;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-top: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.timeline {&ndash;&gt;-->
<!--&lt;!&ndash;  margin-top: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.loading-container {&ndash;&gt;-->
<!--&lt;!&ndash;  display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;  justify-content: center;&ndash;&gt;-->
<!--&lt;!&ndash;  align-items: center;&ndash;&gt;-->
<!--&lt;!&ndash;  height: 200px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.upload-demo {&ndash;&gt;-->
<!--&lt;!&ndash;  text-align: center;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.preview-image {&ndash;&gt;-->
<!--&lt;!&ndash;  margin-top: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;  text-align: center;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.preview-image img {&ndash;&gt;-->
<!--&lt;!&ndash;  max-width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;  max-height: 200px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->
<!--&lt;!&ndash;<script lang="ts" setup>&ndash;&gt;-->
<!--&lt;!&ndash;import { ref, reactive, computed, onMounted } from "vue";&ndash;&gt;-->
<!--&lt;!&ndash;import {&ndash;&gt;-->
<!--&lt;!&ndash;  ElForm,&ndash;&gt;-->
<!--&lt;!&ndash;  ElFormItem,&ndash;&gt;-->
<!--&lt;!&ndash;  ElInput,&ndash;&gt;-->
<!--&lt;!&ndash;  ElSelect,&ndash;&gt;-->
<!--&lt;!&ndash;  ElOption,&ndash;&gt;-->
<!--&lt;!&ndash;  ElButton,&ndash;&gt;-->
<!--&lt;!&ndash;  ElUpload,&ndash;&gt;-->
<!--&lt;!&ndash;  ElDialog,&ndash;&gt;-->
<!--&lt;!&ndash;  ElMessage,&ndash;&gt;-->
<!--&lt;!&ndash;  ElTimeline,&ndash;&gt;-->
<!--&lt;!&ndash;  ElTimelineItem,&ndash;&gt;-->
<!--&lt;!&ndash;  ElCard,&ndash;&gt;-->
<!--&lt;!&ndash;  ElLoading,&ndash;&gt;-->
<!--&lt;!&ndash;} from "element-plus";&ndash;&gt;-->
<!--&lt;!&ndash;import { Service } from "../../generated";&ndash;&gt;-->
<!--&lt;!&ndash;import { useStore } from "vuex";&ndash;&gt;-->

<!--&lt;!&ndash;interface Announcement {&ndash;&gt;-->
<!--&lt;!&ndash;  id: number;&ndash;&gt;-->
<!--&lt;!&ndash;  contactInfo: string;&ndash;&gt;-->
<!--&lt;!&ndash;  createTime: string;&ndash;&gt;-->
<!--&lt;!&ndash;  description: string;&ndash;&gt;-->
<!--&lt;!&ndash;  imageUrl: string;&ndash;&gt;-->
<!--&lt;!&ndash;  itemType: string;&ndash;&gt;-->
<!--&lt;!&ndash;  location: string;&ndash;&gt;-->
<!--&lt;!&ndash;  status: string;&ndash;&gt;-->
<!--&lt;!&ndash;  updateTime: string;&ndash;&gt;-->
<!--&lt;!&ndash;  userId: string;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;const announcements = reactive<Announcement[]>([]);&ndash;&gt;-->
<!--&lt;!&ndash;const showLostForm = ref(false);&ndash;&gt;-->
<!--&lt;!&ndash;const showFoundForm = ref(false);&ndash;&gt;-->
<!--&lt;!&ndash;const store = useStore();&ndash;&gt;-->
<!--&lt;!&ndash;const userId = store.state.user.loginUser.userId;&ndash;&gt;-->
<!--&lt;!&ndash;const loading = ref(true); // 加载状态&ndash;&gt;-->

<!--&lt;!&ndash;let nextId = 1; // 用于生成唯一的 id&ndash;&gt;-->

<!--&lt;!&ndash;const lostFoundForm = ref<InstanceType<typeof ElForm>>();&ndash;&gt;-->
<!--&lt;!&ndash;const dialogVisible = ref(false);&ndash;&gt;-->
<!--&lt;!&ndash;const dialogTitle = ref("失物招领表单");&ndash;&gt;-->

<!--&lt;!&ndash;const form = reactive({&ndash;&gt;-->
<!--&lt;!&ndash;  itemType: "",&ndash;&gt;-->
<!--&lt;!&ndash;  description: "",&ndash;&gt;-->
<!--&lt;!&ndash;  location: "",&ndash;&gt;-->
<!--&lt;!&ndash;  contactInfo: "",&ndash;&gt;-->
<!--&lt;!&ndash;  imageFile: null as File | null,&ndash;&gt;-->
<!--&lt;!&ndash;});&ndash;&gt;-->

<!--&lt;!&ndash;const rules = reactive({&ndash;&gt;-->
<!--&lt;!&ndash;  itemType: [{ required: true, message: "请选择物品类型", trigger: "change" }],&ndash;&gt;-->
<!--&lt;!&ndash;  description: [{ required: true, message: "请输入物品描述", trigger: "blur" }],&ndash;&gt;-->
<!--&lt;!&ndash;  location: [&ndash;&gt;-->
<!--&lt;!&ndash;    { required: true, message: "请输入遗失或招领地点", trigger: "blur" },&ndash;&gt;-->
<!--&lt;!&ndash;  ],&ndash;&gt;-->
<!--&lt;!&ndash;  contactInfo: [{ required: true, message: "请输入联系方式", trigger: "blur" }],&ndash;&gt;-->
<!--&lt;!&ndash;});&ndash;&gt;-->

<!--&lt;!&ndash;const imageUrl = computed(() => {&ndash;&gt;-->
<!--&lt;!&ndash;  if (form.imageFile) {&ndash;&gt;-->
<!--&lt;!&ndash;    return URL.createObjectURL(form.imageFile);&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  return "";&ndash;&gt;-->
<!--&lt;!&ndash;});&ndash;&gt;-->

<!--&lt;!&ndash;const lostAnnouncements = computed(() =>&ndash;&gt;-->
<!--&lt;!&ndash;  announcements.filter((a) => a.itemType === "0")&ndash;&gt;-->
<!--&lt;!&ndash;);&ndash;&gt;-->

<!--&lt;!&ndash;const foundAnnouncements = computed(() =>&ndash;&gt;-->
<!--&lt;!&ndash;  announcements.filter((a) => a.itemType === "1")&ndash;&gt;-->
<!--&lt;!&ndash;);&ndash;&gt;-->

<!--&lt;!&ndash;onMounted(async () => {&ndash;&gt;-->
<!--&lt;!&ndash;  try {&ndash;&gt;-->
<!--&lt;!&ndash;    const response = await Service.all();&ndash;&gt;-->
<!--&lt;!&ndash;    if (response.data && Array.isArray(response.data)) {&ndash;&gt;-->
<!--&lt;!&ndash;      announcements.push(...response.data);&ndash;&gt;-->
<!--&lt;!&ndash;      // 更新 nextId 以确保不会重复&ndash;&gt;-->
<!--&lt;!&ndash;      nextId = Math.max(...announcements.map((a) => a.id), 0) + 1;&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;  } catch (error) {&ndash;&gt;-->
<!--&lt;!&ndash;    console.error("Error fetching lost and found items:", error);&ndash;&gt;-->
<!--&lt;!&ndash;  } finally {&ndash;&gt;-->
<!--&lt;!&ndash;    loading.value = false; // 加载完成后关闭加载状态&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;});&ndash;&gt;-->

<!--&lt;!&ndash;function formatDate(dateString: string): string {&ndash;&gt;-->
<!--&lt;!&ndash;  const options: Intl.DateTimeFormatOptions = {&ndash;&gt;-->
<!--&lt;!&ndash;    year: "numeric",&ndash;&gt;-->
<!--&lt;!&ndash;    month: "short",&ndash;&gt;-->
<!--&lt;!&ndash;    day: "numeric",&ndash;&gt;-->
<!--&lt;!&ndash;  };&ndash;&gt;-->
<!--&lt;!&ndash;  return new Date(dateString).toLocaleDateString(undefined, options);&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;const handleFileChange = (file: any, fileList: File[]) => {&ndash;&gt;-->
<!--&lt;!&ndash;  if (file.raw && file.raw.type.startsWith("image/")) {&ndash;&gt;-->
<!--&lt;!&ndash;    form.imageFile = file.raw;&ndash;&gt;-->
<!--&lt;!&ndash;  } else {&ndash;&gt;-->
<!--&lt;!&ndash;    ElMessage.error("只能上传图片文件");&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;const beforeUpload = (file: File) => {&ndash;&gt;-->
<!--&lt;!&ndash;  // 这里可以进行一些额外的校验，例如文件大小限制&ndash;&gt;-->
<!--&lt;!&ndash;  return true;&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;const submitForm = async () => {&ndash;&gt;-->
<!--&lt;!&ndash;  lostFoundForm.value?.validate(async (valid: boolean) => {&ndash;&gt;-->
<!--&lt;!&ndash;    if (valid) {&ndash;&gt;-->
<!--&lt;!&ndash;      let imageUrl = "";&ndash;&gt;-->

<!--&lt;!&ndash;      if (form.imageFile) {&ndash;&gt;-->
<!--&lt;!&ndash;        const formData = new FormData();&ndash;&gt;-->
<!--&lt;!&ndash;        formData.append("file", form.imageFile);&ndash;&gt;-->
<!--&lt;!&ndash;        console.log("Uploading image...", form.imageFile);&ndash;&gt;-->
<!--&lt;!&ndash;        try {&ndash;&gt;-->
<!--&lt;!&ndash;          const response = await Service.uploadLostAndFoundImage(formData);&ndash;&gt;-->
<!--&lt;!&ndash;          if (response.code === "200" && response.data) {&ndash;&gt;-->
<!--&lt;!&ndash;            imageUrl = response.data;&ndash;&gt;-->
<!--&lt;!&ndash;            ElMessage.success("图片上传成功");&ndash;&gt;-->
<!--&lt;!&ndash;          } else {&ndash;&gt;-->
<!--&lt;!&ndash;            ElMessage.error("图片上传失败");&ndash;&gt;-->
<!--&lt;!&ndash;            return;&ndash;&gt;-->
<!--&lt;!&ndash;          }&ndash;&gt;-->
<!--&lt;!&ndash;        } catch (error) {&ndash;&gt;-->
<!--&lt;!&ndash;          ElMessage.error("图片上传失败");&ndash;&gt;-->
<!--&lt;!&ndash;          console.error(error);&ndash;&gt;-->
<!--&lt;!&ndash;          return;&ndash;&gt;-->
<!--&lt;!&ndash;        }&ndash;&gt;-->
<!--&lt;!&ndash;      }&ndash;&gt;-->

<!--&lt;!&ndash;      const newAnnouncement = {&ndash;&gt;-->
<!--&lt;!&ndash;        id: nextId++,&ndash;&gt;-->
<!--&lt;!&ndash;        itemType: form.itemType,&ndash;&gt;-->
<!--&lt;!&ndash;        description: form.description,&ndash;&gt;-->
<!--&lt;!&ndash;        location: form.location,&ndash;&gt;-->
<!--&lt;!&ndash;        contactInfo: form.contactInfo,&ndash;&gt;-->
<!--&lt;!&ndash;        createTime: new Date().toISOString(),&ndash;&gt;-->
<!--&lt;!&ndash;        status: "1",&ndash;&gt;-->
<!--&lt;!&ndash;        updateTime: new Date().toISOString(),&ndash;&gt;-->
<!--&lt;!&ndash;        userId: userId,&ndash;&gt;-->
<!--&lt;!&ndash;        imageUrl: imageUrl,&ndash;&gt;-->
<!--&lt;!&ndash;      };&ndash;&gt;-->

<!--&lt;!&ndash;      try {&ndash;&gt;-->
<!--&lt;!&ndash;        const response = await Service.post1(newAnnouncement);&ndash;&gt;-->
<!--&lt;!&ndash;        console.log("xxfabuchenhh:", response);&ndash;&gt;-->
<!--&lt;!&ndash;        if (response.code === "A4011") {&ndash;&gt;-->
<!--&lt;!&ndash;          announcements.push(newAnnouncement);&ndash;&gt;-->
<!--&lt;!&ndash;          ElMessage.success("信息发布成功");&ndash;&gt;-->
<!--&lt;!&ndash;          resetForm();&ndash;&gt;-->
<!--&lt;!&ndash;          dialogVisible.value = false;&ndash;&gt;-->
<!--&lt;!&ndash;        }&ndash;&gt;-->
<!--&lt;!&ndash;      } catch (error) {&ndash;&gt;-->
<!--&lt;!&ndash;        console.error("Error posting item:", error);&ndash;&gt;-->
<!--&lt;!&ndash;        ElMessage.error("信息发布失败，请稍后再试");&ndash;&gt;-->
<!--&lt;!&ndash;      }&ndash;&gt;-->
<!--&lt;!&ndash;    } else {&ndash;&gt;-->
<!--&lt;!&ndash;      ElMessage.error("请检查表单信息");&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;  });&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;const resetForm = () => {&ndash;&gt;-->
<!--&lt;!&ndash;  lostFoundForm.value?.resetFields();&ndash;&gt;-->
<!--&lt;!&ndash;  form.imageFile = null;&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;const handleClose = () => {&ndash;&gt;-->
<!--&lt;!&ndash;  dialogVisible.value = false;&ndash;&gt;-->
<!--&lt;!&ndash;  resetForm();&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;const dialogVisibleFunc = (type: string) => {&ndash;&gt;-->
<!--&lt;!&ndash;  form.itemType = type;&ndash;&gt;-->
<!--&lt;!&ndash;  dialogTitle.value = type === "0" ? "发布遗失信息" : "发布拾到信息";&ndash;&gt;-->
<!--&lt;!&ndash;  dialogVisible.value = true;&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;const markAsFound = (id: number) => {&ndash;&gt;-->
<!--&lt;!&ndash;  const announcement = announcements.find((a) => a.id === id);&ndash;&gt;-->
<!--&lt;!&ndash;  if (announcement) {&ndash;&gt;-->
<!--&lt;!&ndash;    announcement.status = "1";&ndash;&gt;-->
<!--&lt;!&ndash;    announcement.updateTime = new Date().toISOString();&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;const markAsClaimed = (id: number) => {&ndash;&gt;-->
<!--&lt;!&ndash;  const announcement = announcements.find((a) => a.id === id);&ndash;&gt;-->
<!--&lt;!&ndash;  if (announcement) {&ndash;&gt;-->
<!--&lt;!&ndash;    announcement.status = "1";&ndash;&gt;-->
<!--&lt;!&ndash;    announcement.updateTime = new Date().toISOString();&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--<template>-->
<!--  <div id="header">-->
<!--    <el-row>-->
<!--      <el-col :span="22">-->
<!--        <el-menu-->
<!--          :default-active="activeIndex"-->
<!--          mode="horizontal"-->
<!--          :ellipsis="true"-->
<!--          @select="handleSelect"-->
<!--          style="max-width: 100%; display: flex; padding: 0"-->
<!--          :router="true"-->
<!--        >-->
<!--          <el-menu-item>-->
<!--            <img-->
<!--              style="width: 100px"-->
<!--              src="../assets/logo.svg"-->
<!--              alt="StudyRoom logo"-->
<!--            />-->
<!--          </el-menu-item>-->
<!--          <el-menu-item-->
<!--            style="padding-right: 50px; padding-left: 50px"-->
<!--            v-for="route in visibleRouters"-->
<!--            :key="route.path"-->
<!--            :index="route.path"-->
<!--          >{{ route.name }}</el-menu-item-->
<!--          >-->
<!--        </el-menu>-->
<!--      </el-col>-->
<!--      <el-col :span="2" style="align-content: center">-->
<!--        <div style="display: flex; align-items: center; position: relative">-->
<!--          <el-avatar-->
<!--            size="large"-->
<!--            :src="store.state.user.loginUser.avatar"-->
<!--            @mouseenter="showMenu = true"-->
<!--            @mouseleave="hideMenu"-->
<!--          >{{ loginStatus ? "" : "未登录" }}</el-avatar-->
<!--          >-->
<!--          <div-->
<!--            v-if="showMenu"-->
<!--            class="menu-popup"-->
<!--            @mouseenter="showMenu = true"-->
<!--            @mouseleave="hideMenu"-->
<!--          >-->
<!--            <template v-if="!loginStatus">-->
<!--              <el-button-->
<!--                type="primary"-->
<!--                @click="openLoginDialog"-->
<!--                aria-label="登录"-->
<!--              >登录</el-button-->
<!--              >-->
<!--            </template>-->
<!--            <template v-else>-->
<!--              <el-button @click="goToProfile" aria-label="个人中心"-->
<!--              >个人中心</el-button-->
<!--              >-->
<!--              <el-button @click="logout" aria-label="退出登录"-->
<!--              >退出登录</el-button-->
<!--              >-->
<!--            </template>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->

<!--    &lt;!&ndash; 登录弹窗 &ndash;&gt;-->
<!--    <el-dialog-->
<!--      v-model="loginDialogVisible"-->
<!--      width="400px"-->
<!--      :before-close="closeLoginDialog"-->
<!--      class="login-dialog"-->
<!--    >-->
<!--      <LoginForm-->
<!--        v-model="loginDialogVisible"-->
<!--        @login-success="handleLoginSuccess"-->
<!--        @register-open="pushRegisterSuccess"-->
<!--        @register="handleRegister"-->
<!--      />-->
<!--    </el-dialog>-->

<!--    &lt;!&ndash; 注册弹窗 &ndash;&gt;-->
<!--    <el-dialog-->
<!--      v-model="registerDialogVisible"-->
<!--      width="400px"-->
<!--      :before-close="closeLoginDialog"-->
<!--      class="login-dialog"-->
<!--    >-->
<!--      <RegisterForm-->
<!--        v-model="registerDialogVisible"-->
<!--        @login-open="pushLoginSuccess"-->
<!--        @register="handleLogin"-->
<!--      />-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import { computed, ref } from "vue";-->
<!--import { routes } from "@/router/routes";-->
<!--import router from "@/router";-->
<!--import { useStore } from "vuex";-->
<!--import LoginForm from "../views/UserLogin.vue";-->
<!--import RegisterForm from "../views/UserRegister.vue";-->
<!--import { Service } from "../../generated";-->
<!--import { ElMessage } from "element-plus";-->

<!--const activeIndex = ref(["/"]);-->
<!--router.afterEach((to) => {-->
<!--  activeIndex.value = [to.path];-->
<!--});-->

<!--const showMenu = ref(false);-->
<!--const loginDialogVisible = ref(false);-->
<!--const registerDialogVisible = ref(false);-->
<!--const handleSelect = (key: string, keyPath: string[]) => {-->
<!--  console.log(key, keyPath);-->
<!--};-->

<!--const handleLoginSuccess = () => {-->
<!--  loginDialogVisible.value = false;-->
<!--  showMenu.value = false;-->
<!--};-->
<!--const handleRegisterSuccess = () => {-->
<!--  registerDialogVisible.value = false;-->
<!--  showMenu.value = false;-->
<!--};-->
<!--const pushRegisterSuccess = () => {-->
<!--  loginDialogVisible.value = false;-->
<!--  registerDialogVisible.value = true;-->
<!--};-->

<!--const pushLoginSuccess = () => {-->
<!--  loginDialogVisible.value = true;-->
<!--  registerDialogVisible.value = false;-->
<!--};-->
<!--const openLoginDialog = () => {-->
<!--  loginDialogVisible.value = true;-->
<!--};-->

<!--const hideMenu = () => {-->
<!--  setTimeout(() => {-->
<!--    showMenu.value = false;-->
<!--  }, 1000);-->
<!--};-->

<!--const goToProfile = () => {-->
<!--  router.push("/userProfile");-->
<!--};-->

<!--const logout = async () => {-->
<!--  const resp = await Service.logout();-->
<!--  if (resp.code === "200") {-->
<!--    await store.dispatch("user/logout");-->
<!--    ElMessage.success("退出成功");-->
<!--    await router.push("/");-->
<!--  } else {-->
<!--    ElMessage.error("退出失败");-->
<!--  }-->
<!--};-->

<!--const store = useStore();-->
<!--const roles = computed(() => store.state.user.loginUser.roles);-->
<!--const loginStatus = computed(() => store.state.user.loginUser.isLogin);-->
<!--// 过滤出当前用户可见的路由-->
<!--const visibleRouters = computed(() => {-->
<!--  return routes.filter((item) => {-->
<!--    // 如果当前用户有访问权限-->
<!--    if (item.meta?.roles?.some((role) => roles.value.includes(role))) {-->
<!--      // 管理员可见所有路由-->
<!--      if (roles.value.includes("ADMIN")) {-->
<!--        return true;-->
<!--      }-->
<!--      // 普通用户只能看到 hidden 为 false 的路由-->
<!--      if (!item.meta?.hidden) {-->
<!--        return true;-->
<!--      }-->
<!--    } else if (!item.meta?.hidden) {-->
<!--      return true;-->
<!--    }-->
<!--    return false;-->
<!--  });-->
<!--});-->

<!--const handleRegister = () => {-->
<!--  loginDialogVisible.value = false;-->
<!--};-->

<!--const handleLogin = () => {-->
<!--  loginDialogVisible.value = false;-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--#header .el-menu&#45;&#45;horizontal > .el-menu-item:nth-child(1) {-->
<!--  margin-right: 90px;-->
<!--}-->

<!--#header .el-menu&#45;&#45;horizontal.el-menu {-->
<!--  border-bottom: none;-->
<!--}-->
<!--#header {-->
<!--  box-shadow: #eee 1px 1px 5px;-->
<!--  border-bottom: 1px solid var(&#45;&#45;el-menu-border-color);-->
<!--}-->

<!--#header .el-menu-item:hover {-->
<!--  background-color: rgba(0, 0, 0, 0.1);-->
<!--  animation: bounce 0.5s;-->
<!--}-->

<!--@keyframes bounce {-->
<!--  0%,-->
<!--  20%,-->
<!--  50%,-->
<!--  80%,-->
<!--  100% {-->
<!--    transform: translateY(0);-->
<!--  }-->
<!--  40% {-->
<!--    transform: translateY(-5px);-->
<!--  }-->
<!--  60% {-->
<!--    transform: translateY(-2px);-->
<!--  }-->
<!--}-->

<!--.menu-popup {-->
<!--  position: absolute;-->
<!--  top: 80px;-->
<!--  right: 0;-->
<!--  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);-->
<!--  border-radius: 8px;-->
<!--  padding: 10px 0;-->
<!--  min-width: 150px;-->
<!--  z-index: 10;-->
<!--  background-color: white;-->
<!--  text-align: center;-->
<!--}-->

<!--.menu-popup .el-button {-->
<!--  width: 100%;-->
<!--  margin: 5px 0;-->
<!--  padding: 10px 20px;-->
<!--  font-size: 14px;-->
<!--  border-radius: 4px;-->
<!--  transition: background-color 0.3s;-->
<!--}-->

<!--.menu-popup .el-button:hover {-->
<!--  background-color: rgba(0, 0, 0, 0.05);-->
<!--}-->

<!--.login-dialog {-->
<!--  background: linear-gradient(135deg, #ffffff, #e0e0e0);-->
<!--}-->

<!--.login-dialog .el-dialog__header {-->
<!--  background: linear-gradient(135deg, #ffffff, #e0e0e0);-->
<!--}-->

<!--.login-dialog .el-dialog__body {-->
<!--  background: linear-gradient(135deg, #ffffff, #e0e0e0);-->
<!--  padding: 20px;-->
<!--}-->

<!--.login-container {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  height: auto;-->
<!--  background: none;-->
<!--}-->

<!--.register-container {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  height: auto;-->
<!--  background: none;-->
<!--}-->
<!--</style>-->

<template>
  <div>1111</div>
</template>
