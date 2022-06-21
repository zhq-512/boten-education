<template>
  <div>
    test...user...vue....

    <el-button @click="toAdd">添加</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods : {
    toAdd(){
      this.$router.push("/users/user/add")
    }
  },
  created: function () {

  }
}
</script>

<style scoped>

</style>
