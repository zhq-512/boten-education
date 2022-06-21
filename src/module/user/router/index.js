import Home from '@/module/home/page/home.vue'
import User from '@/module/user/page/user.vue'
import UserAdd from '@/module/user/page/userAdd.vue'
import Role from '@/module/user/page/role.vue'

export default [{
  path:'/users',
  name:'用户中心',
  component: Home,
  hidden:false,
    children:[
      {name:'用户管理',path:'/users/user/list',component:User,hidden:false},
      {name:'新增用户',path:'/users/user/add',component:UserAdd,hidden:true},
      {name:'角色管理',path:'/users/role/list',component:Role,hidden:true}
    ]
}]
