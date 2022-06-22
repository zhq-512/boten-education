<template>
  <div>
    <div>
      商品列表
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="ID"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="课程名称"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.goodsName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="课程图片"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.goodsImage }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="课程价格"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.goodsPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">添加秒杀活动</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加秒杀-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form :model="goodsList" status-icon  ref="goodsList" label-width="100px" class="demo-ruleForm">
          <el-form-item label="课程id" >
            <el-input  v-model="goodsList.id" ></el-input>
          </el-form-item>
          <el-form-item label="课程名称" >
            <el-input v-model="goodsList.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="课程价格" >
            <el-input v-model.number="goodsList.goodsPrice"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "seckill",
  data(){
    return{
      tableData:[],
      dialogVisible:false,
      goodsList:{
        id:'',
        goodsName:'',
        goodsPrice:'',
      }
    }
  },
  created() {
    this.getGoodsList()
  },
  methods:{
    getGoodsList(){
      axios.get("/seckill/goodsList").then(resp=>{
        if (resp.data.code==20000){
          this.tableData=resp.data.data;
        }
      })
    },
    handleEdit(index, row) {
      this.dialogVisible=true;
      axios.get("/seckill/getById/"+row.id).then(resp=>{
        if (resp.data.code==20000){
          this.goodsList.goodsName=resp.data.data.goodsName;
          this.goodsList.id=resp.data.data.id;
          this.goodsList.goodsPrice=resp.data.data.goodsPrice;
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>

<style scoped>

</style>
