import Home from '@/module/home/page/home.vue'
import Spec from '@/module/goods/page/specification.vue'
import Template from '@/module/goods/page/template.vue'
import Category from '@/module/goods/page/category.vue'

export default [{
  path:'/goods',
  name:'网站管理',
  component: Home,
  hidden:false,
  children:[
    {name:'分类管理',path:'/goods/category/list',component:Category,hidden:false},
    {name:'页面模板管理',path:'/goods/spec/list',component:Spec,hidden:false},
    {name:'页面管理',path:'/goods/tempate/list',component:Template,hidden:false},
  ]
}]
