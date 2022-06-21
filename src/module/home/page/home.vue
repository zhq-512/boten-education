<template>
  <el-row class="container">
    <p-head></p-head>
        <el-col :span="24" class="main">
          <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose"
                     @select="handleselect"
                     unique-opened router v-show="!collapsed" background-color="#EFEFF4">
              <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                <el-submenu :index="index+''" v-if="!item.leaf">
                  <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                  <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
                    {{child.name}}
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i
                  :class="item.iconCls"></i>{{item.children[0].name}}
                </el-menu-item>
              </template>
            </el-menu>
          </aside>
      <section class="content-container">
        <el-tabs v-model="editableTabsValue"
                 type="border-card"
                 style="width: 100%; height: auto"
                 @tab-click="tabClick"
                 @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="item.closable">
            <router-view></router-view>
          </el-tab-pane>
        </el-tabs>
      </section>

    </el-col>
  </el-row>
</template>

<script>
  import PHead from '@/base/components/head.vue';
  import utilApi from '../../../common/utils';
  export default {
    components: {
      PHead
    },
    data() {
      return {
        collapsed: false,
        sysUserName: '',
        sysUserAvatar: '/static/images/small.jpg',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        editableTabs: [{
          title: '首页',
          name: '/index',
          closable:false
        }],
        editableTabsValue:'/index'
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleopen() {
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
      },
      handleselect: function (a, b) {
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      removeTab:function (targetName){
        console.log(targetName)
        let tabs = this.editableTabs;
        for (let i = 0;i < tabs.length;i++) {
          if (tabs[i].name == targetName) {
            this.editableTabs.splice(i,1);
          }
        }
        this.editableTabsValue = '/';
        this.$router.push({path: '/'});
      },
      tabClick:function (tab) {
        let path = tab.name;
        this.editableTabsValue = path
        this.$router.push({path: path});
      }
    },
    created: function () {

    }
  }

</script>

<style scoped lang="scss">
  @import '~scss_vars';

  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: $color-primary;
      color: #fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color: #fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        //width:230px;
        height: 60px;
        font-size: 22px;
        padding-left: 20px;
        padding-right: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color: #fff;
        }
      }
      .logo-width {
        width: 250px;
      }
      .logo-collapse-width {
        width: 60px
      }
      .tools {
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex: 0 0 230px;
        width: 230px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
        .el-menu {
          height: 100%;
        }
        .collapsed {
          width: 60px;
          .item {
            position: relative;
          }
          .submenu {
            position: absolute;
            top: 0px;
            left: 60px;
            z-index: 99999;
            height: auto;
            display: none;
          }

        }
      }
      .menu-collapsed {
        flex: 0 0 60px;
        width: 60px;
      }
      .menu-expanded {
        flex: 0 0 230px;
        width: 230px;
      }
      .content-container {
        background: #fff;
        flex: 1;
        overflow-y: scroll;
        padding: 0px;
      }
    }
  }
</style>
