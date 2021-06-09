<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="车间名称">
        <el-input
          v-model="queryParams.warnType"
          placeholder="请输入"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="value1"
          type="date"
          size="small"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <!--        <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>-->
      </el-form-item>
    </el-form>
    <el-row :gutter="10" style="margin-bottom: 8px;">
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="primary"-->
      <!--          icon="el-icon-plus"-->
      <!--          size="mini"-->
      <!--          @click="handleAdd"-->
      <!--        >新增-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          @click="handleUpdate"-->
      <!--        >修改-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
        >删除
        </el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="排名" type="index" width="55" align="center"/>
      <el-table-column label="车间名称" prop="name" align="center" />
<!--      <el-table-column label="排名" prop="type" align="center" />-->
      <el-table-column label="总用能(kW·h)" prop="date" align="center">
        <!--        <template slot-scope="scope">-->
        <!--          {{ scope.row.type }}-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="showDetails(scope)"
          >查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
    />
    <!--    @pagination="getList"-->
  </div>
</template>

<script>

export default {
  data() {
    return {
      list: [{ name: '益源科技', type: '1', date: '2909.3' }, { name: '第一车间', type: '2', date: '1928' }, { name: '第二车间', type: '3', date: '928.3' }, { name: '第三车间', type: '1', date: '910.6' }, { name: '第四车间', type: '2', date: '828.3' },],
      listLoading: false,
      queryParams: {
        warnType: '',
        pageNum: 1,
        pageSize: 10
      },
      value1: '',
      total: 6
    }
  },
  created() {
  },
  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      console.log(selection)
    },
    // 删除
    handleDelete() {
      alert('删除')
    },
    // 修改
    handleUpdate() {
      alert('修改')
    },
    // 新增
    handleAdd() {
      alert('新增')
    },
    // 查看
    showDetails(scope) {
      console.log(scope)
      alert('查看')
    },
    // 查询
    handleQuery() {
      alert('查询')
    },
    // 重置
    resetQuery() {
      alert('重置')
    }
  }
}
</script>
