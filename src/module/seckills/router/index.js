import Home from '@/module/home/page/home.vue'
import seckill from '@/module/seckills/page/seckill.vue'
import activity from '@/module/seckills/page/activity.vue'


export default [{
  path:'/seckills',
  name:'活动管理',
  component: Home,
  hidden:false,
  children:[
    {name:'发布秒杀',path:'/seckills/seckill/list',component:seckill,hidden:false},
    {name:'活动审批',path:'/seckills/activity/list',component:activity,hidden:false},
  ]
}]
