import Home from '@/module/home/page/home.vue';
import Index from '@/module/home/page/index.vue';

export default [{
  path: '/layout',
  name: '框架',
  component: Home,
  leaf: true,
  children: [
    {
      path: '/index',
      name: '首页',
      component: Index
    }
  ]
}]
