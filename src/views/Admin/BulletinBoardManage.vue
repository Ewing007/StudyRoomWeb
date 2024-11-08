<template>
  <div class="announcement-manager">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>公告管理</span>
          <el-button type="primary" @click="showCreateDialog"
            >发布新公告</el-button
          >
        </div>
      </template>
      <el-skeleton :loading="loading" animated>
        <el-table
          :data="announcements"
          style="width: 100%"
          :key="tableKey"
          :fit="true"
          class="custom-table"
        >
          <el-table-column prop="id" label="ID" width="70" />
          <el-table-column
            prop="title"
            label="标题"
            width="150"
            show-overflow-tooltip
          />
          <el-table-column label="内容" min-width="200" show-overflow-tooltip>
            <template #default="{ row }">
              <el-collapse v-if="row.content.length > 100">
                <el-collapse-item name="1">
                  <template #title>
                    <span>{{ row.content.slice(0, 100) }}...</span>
                  </template>
                  <div>{{ row.content }}</div>
                </el-collapse-item>
              </el-collapse>
              <span v-else>{{ row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column label="作者" width="120">
            <template #default="{ row }">
              <el-tag type="primary">{{ row.authorName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template #default="{ row }">
              <el-tag type="info">{{ row.createdTime }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" width="180">
            <template #default="{ row }">
              <el-tag type="success">{{ row.startTime }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="结束时间" width="180">
            <template #default="{ row }">
              <el-tag type="warning">{{ row.endTime }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.status)">
                {{ getStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="180">
            <template #default="{ row }">
              <el-tag type="info">{{ row.updateTime || "无" }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                @click="editAnnouncement(row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-skeleton>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagination"
      />
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog v-model="editDialogVisible" title="编辑公告" width="50%">
      <el-form :model="currentAnnouncement" label-width="100px">
        <el-form-item label="ID">
          <el-input v-model="currentAnnouncement.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input
            v-model="currentAnnouncement.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            v-model="currentAnnouncement.content"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input
            v-model="currentAnnouncement.authorName"
            placeholder="请输入作者"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input
            v-model="currentAnnouncement.createdTime"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="currentAnnouncement.status"
            placeholder="请选择状态"
          >
            <el-option label="草稿" value="0"></el-option>
            <el-option label="有效" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="currentAnnouncement.startTime"
            type="datetime"
            placeholder="选择开始时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="currentAnnouncement.endTime"
            type="datetime"
            placeholder="选择结束时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 创建对话框 -->
    <el-dialog v-model="createDialogVisible" title="发布新公告" width="50%">
      <el-form :model="newAnnouncement" label-width="100px">
        <el-form-item label="标题">
          <el-input
            v-model="newAnnouncement.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            v-model="newAnnouncement.content"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input
            v-model="newAnnouncement.authorName"
            placeholder="请输入作者"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="newAnnouncement.createdTime"
            type="datetime"
            placeholder="选择创建时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="newAnnouncement.startTime"
            type="datetime"
            placeholder="选择开始时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="newAnnouncement.endTime"
            type="datetime"
            placeholder="选择结束时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitCreate">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Service } from "../../../generated/services/Service";
import {
  AnnouncementCreateReqDto,
  AnnouncementUpdateReqDto,
} from "../../../generated";

interface Announcement {
  id: number;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdTime: string;
  status: string;
  startTime: string;
  endTime: string;
  updateTime: string | null;
}

const announcements = ref<Announcement[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const tableKey = ref(0);
const loading = ref(true);

const fetchAnnouncements = async () => {
  loading.value = true;
  try {
    const response = await Service.getAllAnnouncements({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      fetchAll: false,
    });
    if (response.code === "200") {
      announcements.value = response.data.list || [];
      total.value = response.data.total;
      tableKey.value += 1;
    }
  } catch (error) {
    ElMessage.error("获取公告失败，请稍后再试。");
  } finally {
    loading.value = false;
  }
};

const getStatusTagType = (status: string) => {
  switch (status) {
    case "0":
      return "info";
    case "1":
      return "success";
    default:
      return "warning";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "0":
      return "草稿";
    case "1":
      return "有效";
    default:
      return "未知状态";
  }
};

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  fetchAnnouncements();
};

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchAnnouncements();
};

const editDialogVisible = ref(false);
const currentAnnouncement = ref<Announcement>({
  id: 0,
  title: "",
  content: "",
  authorId: "",
  authorName: "",
  createdTime: "",
  status: "",
  startTime: "",
  endTime: "",
  updateTime: null,
});

const editAnnouncement = (row: Announcement) => {
  currentAnnouncement.value = { ...row };
  editDialogVisible.value = true;
};

const submitEdit = async () => {
  try {
    const requestBody: AnnouncementUpdateReqDto = {
      id: currentAnnouncement.value.id,
      title: currentAnnouncement.value.title,
      content: currentAnnouncement.value.content,
      authorName: currentAnnouncement.value.authorName,
      createdTime: currentAnnouncement.value.createdTime,
      status: currentAnnouncement.value.status,
      startTime: currentAnnouncement.value.startTime,
      endTime: currentAnnouncement.value.endTime,
    };

    const response = await Service.updateAnnouncement(requestBody);
    if (response.code === "200") {
      ElMessage.success("公告更新成功！");
      editDialogVisible.value = false;
      fetchAnnouncements();
    } else {
      ElMessage.error("公告更新失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("公告更新失败，请稍后再试。");
  }
};

const createDialogVisible = ref(false);
const newAnnouncement = ref<AnnouncementCreateReqDto>({
  title: "",
  content: "",
  authorName: "",
  createdTime: "",
  startTime: "",
  endTime: "",
});

const showCreateDialog = () => {
  createDialogVisible.value = true;
};

const submitCreate = async () => {
  try {
    const requestBody: AnnouncementCreateReqDto = {
      title: newAnnouncement.value.title,
      content: newAnnouncement.value.content,
      authorName: newAnnouncement.value.authorName,
      createdTime: newAnnouncement.value.createdTime,
      startTime: newAnnouncement.value.startTime,
      endTime: newAnnouncement.value.endTime,
    };

    const response = await Service.createAnnouncement(requestBody);
    if (response.code === "A4014") {
      ElMessage.success("公告创建成功！");
      createDialogVisible.value = false;
      fetchAnnouncements();
    } else {
      ElMessage.error("公告创建失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("公告创建失败，请稍后再试。");
  }
};

onMounted(() => {
  fetchAnnouncements();
});
</script>

<style scoped>
.announcement-manager {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}

.box-card {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.custom-table .el-table__header-wrapper {
  background-color: #f5f7fa;
  color: #333;
  font-weight: 600;
}

.custom-table .el-table__row:hover {
  background-color: #f2f6fc;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
