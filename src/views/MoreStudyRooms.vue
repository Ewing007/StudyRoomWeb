<template>
  <div class="room-details-page">
    <el-row :gutter="20">
      <!-- 筛选栏 -->
      <el-col :span="24">
        <div class="filter-bar">
          <el-form label-width="100px" inline>
            <el-form-item label="自习室名称">
              <el-input
                v-model="filter.name"
                placeholder="请输入名称"
                class="filter-input"
              ></el-input>
            </el-form-item>
            <el-form-item label="自习室类型">
              <el-select
                v-model="filter.type"
                placeholder="请选择类型"
                class="filter-input"
              >
                <el-option label="全部" value=""></el-option>
                <el-option label="免费" value="0"></el-option>
                <el-option label="VIP" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所在楼层">
              <el-select
                v-model="filter.floor"
                placeholder="请选择楼层"
                class="filter-input"
              >
                <el-option label="全部" value=""></el-option>
                <el-option label="1楼" value="1"></el-option>
                <el-option label="2楼" value="2"></el-option>
                <el-option label="3楼" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="容纳人数">
              <el-input-number
                v-model="filter.capacity"
                placeholder="请输入人数"
                class="filter-input"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="设施">
              <el-input
                v-model="filter.amenities"
                placeholder="请输入设施"
                class="filter-input"
              ></el-input>
            </el-form-item>
            <el-form-item label="当前状态">
              <el-select
                v-model="filter.currentStatus"
                placeholder="请选择状态"
                class="filter-input"
              >
                <el-option label="全部" value=""></el-option>
                <el-option label="可用" value="0"></el-option>
                <el-option label="不可用" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="位置">
              <el-input
                v-model="filter.location"
                placeholder="请输入位置"
                class="filter-input"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="applyFilters"
                class="filter-button"
                >应用搜索</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-col>

      <!-- 自习室卡片列表 -->
      <el-col :span="24">
        <div class="room-list">
          <el-row :gutter="20">
            <el-col :span="8" v-for="room in filteredRooms" :key="room.roomId">
              <el-card class="room-card">
                <img :src="room.imageUrl" class="room-image" alt="自习室图片" />
                <div class="room-content">
                  <h3>{{ room.name }}</h3>
                  <p>
                    <el-tag :type="room.type === '0' ? 'success' : 'warning'">{{
                      room.type === "0" ? "免费" : "VIP"
                    }}</el-tag>
                  </p>
                  <p>
                    <strong>楼层:</strong>
                    <el-tag type="primary">{{ room.floor }}</el-tag>
                  </p>
                  <p>
                    <strong>容纳人数:</strong>
                    <el-tag type="primary">{{ room.capacity }}</el-tag>
                  </p>
                  <p>
                    <strong>设施:</strong>
                    <el-tag
                      v-for="amenity in room.amenities.split(',')"
                      :key="amenity"
                      type="info"
                      >{{ amenity }}</el-tag
                    >
                  </p>
                  <p>
                    <strong>当前状态:</strong>
                    <el-tag
                      :type="room.currentStatus === '0' ? 'success' : 'danger'"
                      >{{
                        room.currentStatus === "0" ? "可用" : "不可用"
                      }}</el-tag
                    >
                  </p>
                  <div class="room-tags">
                    <el-tag
                      v-for="tag in room.tags"
                      :key="tag"
                      class="room-tag"
                      type="primary"
                      >{{ tag }}</el-tag
                    >
                  </div>
                  <el-button type="primary" @click="viewDetails(room)"
                    >立即预约</el-button
                  >
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <!-- 分页栏 -->
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="filter.pageSize"
            :current-page="filter.pageNum"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Service } from "../../generated/services/Service";
import { RoomQueryByConditionReqDto } from "../../generated";
import { useRouter } from "vue-router";

// 筛选条件
const filter = ref<RoomQueryByConditionReqDto>({
  pageNum: 1,
  pageSize: 3,
  fetchAll: false,
  name: "",
  capacity: undefined,
  amenities: "",
  floor: "",
  type: "",
  currentStatus: "",
  location: "",
  description: "",
});

// 自习室列表
const rooms = ref([]);

// 总条数
const total = ref(1);

// 过滤后的自习室列表
const filteredRooms = computed(() => rooms.value);

// 应用筛选条件
const applyFilters = async () => {
  try {
    const response = await Service.someMethodToQueryStudyRoomByCondition(
      filter.value
    );
    rooms.value = response.data.list;
    total.value = response.data.total;
  } catch (error) {
    ElMessage.error("查询失败，请重试");
  }
};

// 页面加载时获取所有自习室
const fetchAllRooms = async () => {
  try {
    const response = await Service.someMethodToQueryStudyRoomByCondition({
      pageNum: 1,
      pageSize: 3,
      fetchAll: false,
    });
    rooms.value = response.data.list; // 假设返回的数据结构是 { data: { list: [] } }
    total.value = response.data.total; // 假设返回的数据结构是 { data: { total: number } }
  } catch (error) {
    ElMessage.error("获取自习室列表失败，请重试");
  }
};

// 在页面加载时调用 fetchAllRooms
onMounted(fetchAllRooms);

// 查看详细信息
const router = useRouter();
const viewDetails = (room: any) => {
  router.push({
    name: "RoomDetails",
    params: { id: room.roomId },
    query: { roomInfo: JSON.stringify(room) },
  });
};

// 处理分页变化
const handlePageChange = (newPage: number) => {
  filter.value.pageNum = newPage;
  applyFilters();
};
</script>

<style scoped>
.room-details-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.filter-bar {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.filter-input {
  width: 150px;
  margin-right: 10px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.filter-button {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.room-list {
  margin-top: 20px;
}

.room-card {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.room-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.room-content {
  padding: 20px;
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.room-content h3 {
  margin-top: 0;
  font-size: 1.2em;
  color: #333;
  margin-bottom: 10px;
}

.room-content p {
  margin: 5px 0;
  font-size: 0.9em;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
