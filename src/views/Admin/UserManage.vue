<template>
  <div class="user-manager">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
        </div>
      </template>
      <el-skeleton :loading="loading" animated>
        <el-table
          :data="users"
          style="width: 100%"
          :key="tableKey"
          :fit="true"
          class="custom-table"
        >
          <el-table-column prop="userId" label="用户ID" width="150">
            <template #default="{ row }">
              <el-tag>{{ row.userId }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="用户名" width="150">
            <template #default="{ row }">
              <el-tag>{{ row.userName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="200">
            <template #default="{ row }">
              <el-tag>{{ row.email }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phoneNumber" label="手机号" width="150">
            <template #default="{ row }">
              <el-tag>{{ row.phoneNumber }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="100">
            <template #default="{ row }">
              <el-tag :type="getSexTagType(row.sex)">
                {{ getSexText(row.sex) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="avatar" label="头像" width="150">
            <template #default="{ row }">
              <el-image
                style="width: 100px; height: 100px"
                :src="row.avatar"
                :preview-src-list="[row.avatar]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="creditScore" label="信用分数" width="100">
            <template #default="{ row }">
              <el-tag>{{ row.creditScore }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="roles" label="角色" width="150">
            <template #default="{ row }">
              <el-tag v-for="role in row.roles" :key="role">{{ role }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="permissions" label="权限" min-width="200">
            <template #default="{ row }">
              <el-tag v-for="permission in row.permissions" :key="permission">{{
                permission
              }}</el-tag>
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
          <el-table-column label="操作" width="200">
            <template #default="{ row }">
              <el-button type="primary" size="small" @click="editUser(row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="disableUser(row)"
                v-if="row.status === '0'"
                >封禁</el-button
              >
              <el-button
                type="success"
                size="small"
                @click="unblockUser(row)"
                v-if="row.status === '1'"
                >解禁</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="deleteUser(row)"
                v-if="row.delFlag === '0'"
                >删除</el-button
              >
              <el-button
                type="success"
                size="small"
                @click="undeleteUser(row)"
                v-if="row.delFlag === '1'"
                >恢复删除</el-button
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
    <el-dialog v-model="editDialogVisible" title="编辑用户信息" width="50%">
      <el-form :model="currentUser" label-width="100px">
        <el-form-item label="用户ID">
          <el-input v-model="currentUser.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="currentUser.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="currentUser.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="currentUser.phoneNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            v-model="currentUser.sex"
            disabled
            placeholder="请选择性别"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="currentUser.avatar" disabled></el-input>
        </el-form-item>
        <el-form-item label="信用分数">
          <el-input v-model="currentUser.creditScore"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="currentUser.roles"
            multiple
            placeholder="请选择角色"
          >
            <el-option
              v-for="role in allRoles"
              :key="role"
              :label="role"
              :value="role"
            ></el-option>
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
import {
  UserInfoAllByAdminReqDto,
  UserDisableReqDto,
  UserDeleteReqDto,
  UserUpdateByAdminReqDto,
} from "../../../generated";

interface User {
  userId: string;
  userName: string;
  email: string;
  phoneNumber: string;
  sex: string;
  avatar: string;
  creditScore: number;
  roles: string[];
  createTime: string;
  updateTime: string;
  status: string;
  delFlag: string;
}

const users = ref<User[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const tableKey = ref(0);
const loading = ref(true);
const allRoles = ref<string[]>([]);

const fetchUsers = async () => {
  loading.value = true;
  try {
    const requestBody: UserInfoAllByAdminReqDto = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
    };
    const response = await Service.managerAllUsers(requestBody);
    if (response.code === "200") {
      users.value = response.data.list || [];
      total.value = response.data.total;
      tableKey.value += 1;
    }
  } catch (error) {
    ElMessage.error("获取用户信息失败，请稍后再试。");
  } finally {
    loading.value = false;
  }
};

const fetchAllRoles = async () => {
  try {
    const response = await Service.getAllRolesByAdmin();
    if (response.code === "200") {
      allRoles.value = response.data[0].roleName || [];
    }
  } catch (error) {
    ElMessage.error("获取角色信息失败，请稍后再试。");
  }
};

const getSexTagType = (sex: string) => {
  return sex === "1" ? "success" : "info";
};

const getSexText = (sex: string) => {
  return sex === "1" ? "男" : "女";
};

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  fetchUsers();
};

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchUsers();
};

const editDialogVisible = ref(false);
const currentUser = ref<User>({
  userId: "",
  userName: "",
  email: "",
  phoneNumber: "",
  sex: "",
  avatar: "",
  creditScore: 0,
  roles: [],
  createTime: "",
  updateTime: "",
  status: "0",
  delFlag: "0",
});

const editUser = (row: User) => {
  currentUser.value = { ...row };
  editDialogVisible.value = true;
};

const submitEdit = async () => {
  try {
    const requestBody: UserUpdateByAdminReqDto = {
      userId: currentUser.value.userId,
      creditScore: currentUser.value.creditScore,
      roles: currentUser.value.roles,
    };

    const response = await Service.updateUserByAdmin(requestBody);
    if (response.code === "200") {
      ElMessage.success("用户信息更新成功！");
      editDialogVisible.value = false;
      fetchUsers();
    } else {
      ElMessage.error("用户信息更新失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("用户信息更新失败，请稍后再试。");
  }
};

const disableUser = async (row: User) => {
  try {
    const requestBody: UserDisableReqDto = {
      userId: row.userId,
    };
    const response = await Service.disable1(requestBody);
    if (response.code === "A406") {
      ElMessage.success("用户已封禁！");
      fetchUsers();
    } else {
      ElMessage.error("封禁用户失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("封禁用户失败，请稍后再试。");
  }
};

const unblockUser = async (row: User) => {
  try {
    const requestBody: UserDisableReqDto = {
      userId: row.userId,
    };
    const response = await Service.unblock1(requestBody);
    if (response.code === "A407") {
      ElMessage.success("用户已解禁！");
      fetchUsers();
    } else {
      ElMessage.error("解禁用户失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("解禁用户失败，请稍后再试。");
  }
};

const deleteUser = async (row: User) => {
  try {
    const requestBody: UserDeleteReqDto = {
      userId: row.userId,
    };
    const response = await Service.delete1(requestBody);
    if (response.code === "A408") {
      ElMessage.success("用户已删除！");
      fetchUsers();
    } else {
      ElMessage.error("删除用户失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("删除用户失败，请稍后再试。");
  }
};

const undeleteUser = async (row: User) => {
  try {
    const requestBody: UserDeleteReqDto = {
      userId: row.userId,
    };
    const response = await Service.undelete1(requestBody);
    if (response.code === "A409") {
      ElMessage.success("用户已恢复！");
      fetchUsers();
    } else {
      ElMessage.error("恢复用户失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("恢复用户失败，请稍后再试。");
  }
};

onMounted(() => {
  fetchUsers();
  fetchAllRoles();
});
</script>

<style scoped>
.user-manager {
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
