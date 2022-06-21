import Home from '@/module/home/page/home.vue'
import aa from '@/module/media/page/aa.vue'
import bb from '@/module/media/page/bb.vue'
import cc from '@/module/media/page/cc.vue'

export default [{
  path:'/media',
  name:'媒资管理',
  component: Home,
  hidden:false,
  children:[
    {name:'我的资源',path:'/media/aa/list',component:aa,hidden:false},
    {name:'媒资审批',path:'/media/bb/list',component:bb,hidden:false},
    {name:'回收站',path:'/media/cc/list',component:cc,hidden:false},
  ]
}]
