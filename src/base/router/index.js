import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// 定义路由配置
let routes = []

let concat = (router) => {
  routes = routes.concat(router)
}
// // 导入路由规则
import LoginRouter from '@/module/login/router/index'
import HomeRouter from '@/module/home/router/index'
import GoodsRouter from '@/module/goods/router/index'
import MediaRouter from '@/module/media/router/index'
import SeckillsRouter from '@/module/seckills/router/index'
// 合并路由规则
concat(LoginRouter)
concat(HomeRouter)
concat(GoodsRouter)
concat(MediaRouter)
concat(SeckillsRouter)
export default routes;
