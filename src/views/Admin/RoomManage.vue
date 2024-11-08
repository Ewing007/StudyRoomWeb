<template>
  <div class="study-room-manager">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>自习室管理</span>
          <el-button type="primary" @click="openCreateDialog"
            >新建自习室</el-button
          >
        </div>
      </template>
      <el-table
        :data="rooms"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="加载中..."
        :key="tableKey"
      >
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column
          prop="location"
          label="位置"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="capacity"
          label="容量"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="amenities"
          label="设施"
          width="200"
        ></el-table-column>
        <el-table-column prop="currentStatus" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusTagType(scope.row.currentStatus)">
              {{ getStatusText(scope.row.currentStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
          <template #default="scope">
            <el-tag :type="getTypeTagType(scope.row.type)">
              {{ getTypeText(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="floor"
          label="楼层"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="200"
        ></el-table-column>
        <el-table-column label="图片" width="150">
          <template #default="scope">
            <img
              v-if="scope.row.imageUrl"
              :src="scope.row.imageUrl"
              alt="自习室图片"
              style="max-width: 100%; max-height: 100px"
            />
            <span v-else>无图片</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button type="text" @click="openUpdateDialog(scope.row)"
              >更新</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="sizes, prev, pager, next, jumper, ->, total"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 更新自习室对话框 -->
    <el-dialog title="更新自习室" v-model="updateDialogVisible" width="50%">
      <el-form :model="currentRoom" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="currentRoom.name"></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="currentRoom.location"></el-input>
        </el-form-item>
        <el-form-item label="容量">
          <el-input-number
            v-model="currentRoom.capacity"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="设施">
          <el-input v-model="currentRoom.amenities"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="currentRoom.description"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="楼层">
          <el-input v-model="currentRoom.floor"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="currentRoom.type" placeholder="请选择类型">
            <el-option label="普通" value="0"></el-option>
            <el-option label="VIP" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="currentRoom.currentStatus"
            placeholder="请选择状态"
          >
            <el-option label="正常" value="0"></el-option>
            <el-option label="维护中" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片">
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
            <div v-if="currentRoom.imageFile" class="preview-image">
              <img :src="imageUrl" alt="预览图片" />
              <i class="el-icon-close" @click.stop="removeImage"></i>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateRoom">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 创建自习室对话框 -->
    <el-dialog title="新建自习室" v-model="dialogVisible" width="50%">
      <el-form :model="currentRoom" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="currentRoom.name"></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="currentRoom.location"></el-input>
        </el-form-item>
        <el-form-item label="容量">
          <el-input-number
            v-model="currentRoom.capacity"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="设施">
          <el-input v-model="currentRoom.amenities"></el-input>
        </el-form-item>
        <el-form-item label="开放时间">
          <el-select
            v-model="currentRoom.openingHours"
            multiple
            placeholder="请选择开放时间段"
          >
            <el-option
              v-for="slot in timeSlots"
              :key="slot.slotId"
              :label="`${slot.startTime} - ${slot.endTime}`"
              :value="slot.slotId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="currentRoom.description"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="楼层">
          <el-input v-model="currentRoom.floor"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="currentRoom.type" placeholder="请选择类型">
            <el-option label="普通" value="0"></el-option>
            <el-option label="VIP" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片">
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
            <div v-if="currentRoom.imageFile" class="preview-image">
              <img :src="imageUrl" alt="预览图片" />
              <i class="el-icon-close" @click.stop="removeImage"></i>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Service } from "../../../generated/services/Service";
import {
  GetAllRoomByAdminReqDto,
  RoomCreateReqDto,
  RoomUpdateReqDto,
} from "../../../generated";

interface StudyRoom {
  amenities: string;
  currentStatus: string;
  description: string;
  updateTime: string;
  type: string;
  delFlag: string;
  userId: string;
  roomId: string;
  capacity: number;
  createTime: string;
  imageUrl: string;
  name: string;
  location: string;
  id: number;
  floor: string;
  openingHours: string[];
  imageFile: File | null;
}

const rooms = ref<StudyRoom[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const tableKey = ref(0);
const loading = ref(true);
const dialogVisible = ref(false);
const currentRoom = ref<StudyRoom>({
  amenities: "",
  currentStatus: "0",
  description: "",
  updateTime: "",
  type: "0",
  delFlag: "0",
  userId: "",
  roomId: "",
  capacity: 1,
  createTime: "",
  imageUrl: "",
  name: "",
  location: "",
  id: 0,
  floor: "",
  openingHours: [],
  imageFile: null,
});

const timeSlots = ref<any[]>([]);

const fetchRooms = async () => {
  loading.value = true;
  try {
    const requestBody: GetAllRoomByAdminReqDto = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      fetchAll: true,
    };
    const response = await Service.getAllRooms(requestBody);
    if (response.code === "200") {
      rooms.value = response.data.list || [];
      total.value = response.data.total;
      tableKey.value += 1;
    }
  } catch (error) {
    ElMessage.error("获取自习室信息失败，请稍后再试。");
  } finally {
    loading.value = false;
  }
};

const fetchTimeSlots = async () => {
  try {
    const response = await Service.someMethodToGetAllTime();
    if (response.code === "200") {
      timeSlots.value = response.data;
    }
  } catch (error) {
    ElMessage.error("获取时间段信息失败，请稍后再试。");
  }
};

const getStatusTagType = (status: string) => {
  return status === "0" ? "success" : "info";
};

const getStatusText = (status: string) => {
  return status === "0" ? "可用" : "不可用";
};

const getTypeTagType = (type: string) => {
  return type === "0" ? "success" : "warning";
};

const getTypeText = (type: string) => {
  return type === "0" ? "普通" : "VIP";
};

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  fetchRooms();
};

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchRooms();
};

const openCreateDialog = () => {
  currentRoom.value = {
    amenities: "",
    currentStatus: "0",
    description: "",
    updateTime: "",
    type: "0",
    delFlag: "0",
    userId: "",
    roomId: "",
    capacity: 1,
    createTime: "",
    imageUrl: "",
    name: "",
    location: "",
    id: 0,
    floor: "",
    openingHours: [],
    imageFile: null,
  };
  dialogVisible.value = true;
};

const imageUrl = computed(() => {
  if (currentRoom.value.imageFile) {
    return URL.createObjectURL(currentRoom.value.imageFile);
  }
  return "";
});

const handleFileChange = (file: any, fileList: File[]) => {
  if (file.raw && file.raw.type.startsWith("image/")) {
    currentRoom.value.imageFile = file.raw;
  } else {
    ElMessage.error("只能上传图片文件");
  }
};

const updateDialogVisible = ref(false);

const openUpdateDialog = (row: StudyRoom) => {
  currentRoom.value = { ...row, imageFile: null };
  updateDialogVisible.value = true;
};

// const updateRoom = async () => {
//   try {
//     let imageUrl = currentRoom.value.imageUrl;
//
//     if (currentRoom.value.imageFile) {
//       const formData = new FormData();
//       formData.append("file", currentRoom.value.imageFile);
//       try {
//         const response = await Service.uploadStudyRoomImage(formData);
//         if (response.code === "200" && response.data) {
//           imageUrl = response.data;
//           ElMessage.success("图片上传成功");
//         } else {
//           ElMessage.error("图片上传失败");
//           return;
//         }
//       } catch (error) {
//         ElMessage.error("图片上传失败");
//         console.error(error);
//         return;
//       }
//     }
//
//     const updateRequest: RoomUpdateReqDto = {
//       roomId: currentRoom.value.roomId,
//       name: currentRoom.value.name,
//       location: currentRoom.value.location,
//       capacity: currentRoom.value.capacity,
//       amenities: currentRoom.value.amenities,
//       description: currentRoom.value.description,
//       floor: currentRoom.value.floor,
//       type: currentRoom.value.type,
//       imageUrl: imageUrl,
//       currentStatus: currentRoom.value.currentStatus,
//     };
//
//     const response = await Service.someMethodToUpdateStudyRoom(updateRequest);
//     if (response.code === "A4018") {
//       ElMessage.success("更新成功");
//       updateDialogVisible.value = false;
//       fetchRooms();
//     } else {
//       ElMessage.error("更新失败，请稍后再试。");
//     }
//   } catch (error) {
//     ElMessage.error("更新失败，请稍后再试。");
//   }
// };

const updateRoom = async () => {
  const originalCapacity = currentRoom.value.capacity;
  const originalStatus = currentRoom.value.currentStatus;
  if (
    currentRoom.value.capacity !== originalCapacity ||
    currentRoom.value.currentStatus !== originalStatus
  ) {
    ElMessageBox.confirm(
      "您正在更改自习室的容量或状态，这将删除原有的座位信息。确定继续吗？",
      "警告",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
      .then(async () => {
        await performUpdate();
      })
      .catch(() => {
        ElMessage.info("已取消更新");
      });
  } else {
    await performUpdate();
  }
};

const performUpdate = async () => {
  try {
    let imageUrl = currentRoom.value.imageUrl;

    if (currentRoom.value.imageFile) {
      const formData = new FormData();
      formData.append("file", currentRoom.value.imageFile);
      try {
        const response = await Service.uploadStudyRoomImage(formData);
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

    const updateRequest: RoomUpdateReqDto = {
      roomId: currentRoom.value.roomId,
      name: currentRoom.value.name,
      location: currentRoom.value.location,
      capacity: currentRoom.value.capacity,
      amenities: currentRoom.value.amenities,
      description: currentRoom.value.description,
      floor: currentRoom.value.floor,
      type: currentRoom.value.type,
      imageUrl: imageUrl,
      currentStatus: currentRoom.value.currentStatus,
    };

    const response = await Service.someMethodToUpdateStudyRoom(updateRequest);
    if (response.code === "A4018") {
      ElMessage.success("更新成功");
      updateDialogVisible.value = false;
      fetchRooms();
    } else {
      ElMessage.error("更新失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("更新失败，请稍后再试。");
  }
};

const beforeUpload = (file: File) => {
  // 这里可以进行一些额外的校验，例如文件大小限制
  return true;
};

const removeImage = () => {
  currentRoom.value.imageFile = null;
};

const submitForm = async () => {
  try {
    let imageUrl = "";

    if (currentRoom.value.imageFile) {
      const formData = new FormData();
      formData.append("file", currentRoom.value.imageFile);
      try {
        const response = await Service.uploadStudyRoomImage(formData);
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

    const newRoom: RoomCreateReqDto = {
      name: currentRoom.value.name,
      location: currentRoom.value.location,
      capacity: currentRoom.value.capacity,
      amenities: currentRoom.value.amenities,
      openingHours: currentRoom.value.openingHours,
      description: currentRoom.value.description,
      floor: currentRoom.value.floor,
      type: currentRoom.value.type,
      imageUrl: imageUrl,
    };

    const response = await Service.someMethodToCreateStudyRoom(newRoom);
    if (response.code === "A4016") {
      ElMessage.success("创建成功");
      dialogVisible.value = false;
      fetchRooms();
    } else {
      ElMessage.error("创建失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("创建失败，请稍后再试。");
  }
};

onMounted(() => {
  fetchRooms();
  fetchTimeSlots();
});
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
.preview-image {
  position: relative;
  margin-top: 10px;
  max-width: 100%;
  max-height: 100px;
}
.preview-image img {
  max-width: 100%;
  max-height: 100px;
}
.preview-image .el-icon-close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  color: red;
}

.preview-image {
  position: relative;
  margin-top: 10px;
  max-width: 100%;
  max-height: 100px;
}
.preview-image img {
  max-width: 100%;
  max-height: 100px;
}
.preview-image .el-icon-close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  color: red;
}
</style>
