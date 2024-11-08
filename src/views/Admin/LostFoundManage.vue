<template>
  <div class="lost-found-manager">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>失物招领管理</span>
        </div>
      </template>
      <el-skeleton :loading="loading" animated>
        <el-table
          :data="lostFounds"
          style="width: 100%"
          :key="tableKey"
          :fit="true"
          class="custom-table"
        >
          <el-table-column prop="id" label="ID" width="70">
            <template #default="{ row }">
              <el-tag>{{ row.id }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="userId" label="用户ID" width="100">
            <template #default="{ row }">
              <el-tag>{{ row.userId }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="itemType" label="类型" width="100">
            <template #default="{ row }">
              <el-tag :type="getItemTypeTagType(row.itemType)">
                {{ getItemTypeText(row.itemType) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            min-width="200"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <el-tag>{{ row.description }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="location" label="地点" width="150">
            <template #default="{ row }">
              <el-tag>{{ row.location }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="contactInfo" label="联系方式" width="150">
            <template #default="{ row }">
              <el-tag>{{ row.contactInfo }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="图片" width="150">
            <template #default="{ row }">
              <el-image
                style="width: 100px; height: 100px"
                :src="row.imageUrl"
                :preview-src-list="[row.imageUrl]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.status)">
                {{ getStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="illegal" label="违规" width="100">
            <template #default="{ row }">
              <el-tag :type="getIllegalTagType(row.illegal)">
                {{ getIllegalText(row.illegal) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="delIllegal" label="删除违规" width="120">
            <template #default="{ row }">
              <el-tag :type="getDelIllegalTagType(row.delIllegal)">
                {{ getDelIllegalText(row.delIllegal) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180">
            <template #default="{ row }">
              <el-tag>{{ row.createTime }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="180">
            <template #default="{ row }">
              <el-tag>{{ row.updateTime }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template #default="{ row }">
              <el-button type="primary" size="small" @click="editLostFound(row)"
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
    <el-dialog v-model="editDialogVisible" title="编辑失物招领信息" width="50%">
      <el-form :model="currentLostFound" label-width="100px">
        <el-form-item label="ID">
          <el-input v-model="currentLostFound.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="currentLostFound.status" placeholder="请选择状态">
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="违规">
          <el-select
            v-model="currentLostFound.illegal"
            placeholder="请选择违规状态"
          >
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="删除违规">
          <el-select
            v-model="currentLostFound.delIllegal"
            placeholder="请选择删除违规状态"
          >
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Service } from "../../../generated/services/Service";
import { LostFoundAdminReqDto } from "../../../generated";

interface LostFound {
  id: number;
  userId: string;
  itemType: string;
  description: string;
  status: string;
  location: string;
  imageUrl: string;
  contactInfo: string;
  illegal: string;
  delIllegal: string;
  createTime: string;
  updateTime: string;
}

const lostFounds = ref<LostFound[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const tableKey = ref(0);
const loading = ref(true);

const fetchLostFounds = async () => {
  loading.value = true;
  try {
    const response = await Service.getAllLoststByAdmin({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      fetchAll: false,
    });
    if (response.code === "200") {
      lostFounds.value = response.data.list || [];
      total.value = response.data.total;
      tableKey.value += 1;
    }
  } catch (error) {
    ElMessage.error("获取失物招领信息失败，请稍后再试。");
  } finally {
    loading.value = false;
  }
};

const getItemTypeTagType = (itemType: string) => {
  return itemType === "0" ? "info" : "success";
};

const getItemTypeText = (itemType: string) => {
  return itemType === "0" ? "失物" : "招领";
};

const getStatusTagType = (status: string) => {
  return status === "1" ? "success" : "danger";
};

const getStatusText = (status: string) => {
  return status === "1" ? "有效" : "无效";
};

const getIllegalTagType = (illegal: string) => {
  return illegal === "1" ? "danger" : "success";
};

const getIllegalText = (illegal: string) => {
  return illegal === "1" ? "是" : "否";
};

const getDelIllegalTagType = (delIllegal: string) => {
  return delIllegal === "1" ? "danger" : "success";
};

const getDelIllegalText = (delIllegal: string) => {
  return delIllegal === "1" ? "是" : "否";
};

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  fetchLostFounds();
};

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchLostFounds();
};

const editDialogVisible = ref(false);
const currentLostFound = ref<LostFound>({
  id: 0,
  userId: "",
  itemType: "",
  description: "",
  status: "",
  location: "",
  imageUrl: "",
  contactInfo: "",
  illegal: "",
  delIllegal: "",
  createTime: "",
  updateTime: "",
});

const editLostFound = (row: LostFound) => {
  currentLostFound.value = { ...row };
  editDialogVisible.value = true;
};

const submitEdit = async () => {
  try {
    const requestBody: LostFoundAdminReqDto = {
      id: currentLostFound.value.id,
      status: currentLostFound.value.status,
      illegal: currentLostFound.value.illegal,
      delIllegal: currentLostFound.value.delIllegal,
    };

    const response = await Service.managerByAdmin1(requestBody);
    if (response.code === "200") {
      ElMessage.success("失物招领信息更新成功！");
      editDialogVisible.value = false;
      fetchLostFounds();
    } else {
      ElMessage.error("失物招领信息更新失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("失物招领信息更新失败，请稍后再试。");
  }
};

onMounted(() => {
  fetchLostFounds();
});
</script>

<style scoped>
.lost-found-manager {
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
