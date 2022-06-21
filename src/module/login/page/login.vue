<template>
  <div>
    <center>
      <div style="margin-top: 100px"></div>
      <img src="/static/images/img.png" style="height: 100px"><br>
      <div style="margin-top: 50px"></div>
      <el-card class="box-card" style="width: 40%">

        <h1>博天教育</h1>
        <el-form label-width="120px" >
          <el-form-item label="请输入账号">
            <el-input v-model="seller.sellerId"></el-input>
          </el-form-item>
          <el-form-item label="请输入密码">
            <el-input v-model="seller.password"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="login">登录</el-button>
      </el-card>
    </center>


  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      seller:{
        sellerId:'',
        password:''
      }
    }
  },
  methods:{
    login:function () {
      this.$router.push("/index");
    }
  }
}
</script>

<style scoped>

</style>
