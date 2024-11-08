<template>
  <div class="role-permission-manager">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>角色和权限管理</span>
          <el-button type="primary" @click="addRoleDialogVisible = true"
            >新增角色</el-button
          >
          <el-button type="primary" @click="addPermissionDialogVisible = true"
            >新增权限</el-button
          >
        </div>
      </template>
      <el-skeleton :loading="loading" animated>
        <el-table
          :data="roles"
          style="width: 100%"
          :key="tableKey"
          :fit="true"
          class="custom-table"
        >
          <el-table-column prop="roleName" label="角色名称" width="150">
            <template #default="{ row }">
              <el-tag>{{ row.roleTable.roleName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" width="200">
            <template #default="{ row }">
              <el-tag>{{ row.roleTable.description }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="permissions" label="权限" min-width="200">
            <template #default="{ row }">
              <!--              <el-tag-->
              <!--                v-for="permission in row.permissionTableList"-->
              <!--                :key="permission.permissionId"-->
              <!--              >-->
              <!--                {{ permission.permissionName }}-->
              <!--              </el-tag>-->
              <el-tooltip
                effect="dark"
                :content="getPermissionsString(row.permissionTableList)"
                placement="top"
              >
                <el-tag
                  v-for="permission in row.permissionTableList"
                  :key="permission.permissionId"
                >
                  {{ permission.permissionName }}
                </el-tag>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                @click="assignPermissions(row)"
                >分配权限</el-button
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

    <!-- 新增角色对话框 -->
    <el-dialog v-model="addRoleDialogVisible" title="新增角色" width="50%">
      <el-form :model="newRole" label-width="100px">
        <el-form-item label="角色ID">
          <el-input v-model="newRole.roleId"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="newRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="newRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="createRole">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 新增权限对话框 -->
    <el-dialog
      v-model="addPermissionDialogVisible"
      title="新增权限"
      width="50%"
    >
      <el-form :model="newPermission" label-width="100px">
        <el-form-item label="权限ID">
          <el-input v-model="newPermission.permissionId"></el-input>
        </el-form-item>
        <el-form-item label="权限名称">
          <el-input v-model="newPermission.permissionName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="newPermission.permissionDesc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addPermissionDialogVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="createPermission">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 分配权限对话框 -->
    <el-dialog
      v-model="assignPermissionDialogVisible"
      title="分配权限"
      width="50%"
    >
      <el-form :model="selectedRole" label-width="100px">
        <el-form-item label="角色名称">
          <el-input
            v-model="selectedRole.roleTable.roleName"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="选择权限">
          <el-checkbox-group v-model="selectedPermissions">
            <el-checkbox
              v-for="permission in allPermissions"
              :key="permission"
              :label="permission"
            >
              {{ permission }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="assignPermissionDialogVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="updateRolePermissions"
            >确 定</el-button
          >
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
  RolesPermissionsAllByAdminReqDto,
  RolesCreateByAdminReqDto,
  PermissionsCreateByAdminReqDto,
  UpdateRolesByAdminReqDto,
} from "../../../generated";

interface Role {
  roleTable: {
    roleId: string;
    id: number;
    roleName: string;
    description: string;
  };
  permissionTableList: Permission[];
}

interface Permission {
  permissionId: string;
  permissionName: string;
  description: string;
}

const roles = ref<Role[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const tableKey = ref(0);
const loading = ref(true);

const fetchRoles = async () => {
  loading.value = true;
  try {
    const requestBody: RolesPermissionsAllByAdminReqDto = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
    };
    const response = await Service.getAllRolePermissions(requestBody);
    if (response.code === "200") {
      roles.value = response.data.list || [];
      total.value = response.data.total;
      tableKey.value += 1;
    }
  } catch (error) {
    ElMessage.error("获取角色和权限信息失败，请稍后再试。");
  } finally {
    loading.value = false;
  }
};

const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  fetchRoles();
};

const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchRoles();
};

const addRoleDialogVisible = ref(false);
const newRole = ref<RolesCreateByAdminReqDto>({
  roleId: "",
  roleName: "",
  roleDesc: "",
});

const createRole = async () => {
  try {
    const requestBody: RolesCreateByAdminReqDto = {
      roleId: newRole.value.roleId,
      roleName: newRole.value.roleName,
      roleDesc: newRole.value.roleDesc,
    };
    const response = await Service.createRolesByAdmin(requestBody);
    if (response.code === "A4041") {
      ElMessage.success("角色创建成功！");
      addRoleDialogVisible.value = false;
      fetchRoles();
    } else {
      ElMessage.error("角色创建失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("角色创建失败，请稍后再试。");
  }
};

const addPermissionDialogVisible = ref(false);
const newPermission = ref<PermissionsCreateByAdminReqDto>({
  permissionId: "",
  permissionName: "",
  permissionDesc: "",
});

const createPermission = async () => {
  try {
    const requestBody: PermissionsCreateByAdminReqDto = {
      permissionId: newPermission.value.permissionId,
      permissionName: newPermission.value.permissionName,
      permissionDesc: newPermission.value.permissionDesc,
    };
    const response = await Service.createPermissionByAdmin(requestBody);
    if (response.code === "A4042") {
      ElMessage.success("权限创建成功！");
      addPermissionDialogVisible.value = false;
      fetchRoles();
    } else {
      ElMessage.error("权限创建失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("权限创建失败，请稍后再试。");
  }
};

const assignPermissionDialogVisible = ref(false);
const selectedRole = ref<Role | null>(null);
const allPermissions = ref<string[]>([]);
const selectedPermissions = ref<string[]>([]);

const fetchAllPermissions = async () => {
  try {
    const response = await Service.getAllPermissionsByAdmin();
    if (response.code === "200") {
      allPermissions.value = response.data[0].permissionName;
    }
  } catch (error) {
    ElMessage.error("获取所有权限失败，请稍后再试。");
  }
};

const assignPermissions = (row: Role) => {
  selectedRole.value = row;
  selectedPermissions.value = row.permissionTableList.map(
    (p) => p.permissionName
  );
  assignPermissionDialogVisible.value = true;
};

const updateRolePermissions = async () => {
  if (!selectedRole.value) return;

  try {
    const requestBody: UpdateRolesByAdminReqDto = {
      roleId: selectedRole.value.roleTable.roleId,
      permissions: selectedPermissions.value,
    };
    const response = await Service.updateRolePermissionsByAdmin(requestBody);
    if (response.code === "A4044") {
      ElMessage.success("权限更新成功！");
      assignPermissionDialogVisible.value = false;
      fetchRoles();
    } else {
      ElMessage.error("权限更新失败，请稍后再试。");
    }
  } catch (error) {
    ElMessage.error("权限更新失败，请稍后再试。");
  }
};

const getPermissionsString = (permissions: Permission[]) => {
  return permissions.map((p) => p.permissionName).join(", ");
};
onMounted(() => {
  fetchRoles();
  fetchAllPermissions();
});
</script>

<style scoped>
.role-permission-manager {
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
