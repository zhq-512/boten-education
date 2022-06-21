<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="编号">
        <el-input v-model="formInline.id" placeholder="编号" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="formInline.name" placeholder="名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit()">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "upd",
  data() {
    return {
      formInline: {
        name: '',
        id:''
      },
      id:this.$route.query.id
    }
  },
  methods: {
    onSubmit() {
      this.$http.put('/api/brand/brands',this.formInline).then(res=>{
        console.log('submit!');
        if(res.data.code==20000){
          alert(res.data.message)
          this.$router.push('/goods/brand/list')
        }else {
          alert(res.data.message)
        }
      })
    }
  },
  created: function () {
    axios.get('/api/brand/brands/'+this.id).then(res=>{
      if(res.data.code==20000){
        this.formInline=res.data.data
      }else {
        alert(res.data.message)
      }
    })
  }
}
</script>

<style scoped>

</style>
