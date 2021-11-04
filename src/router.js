import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login.vue'
import ForgotPassword from './views/ForgotPassword.vue'
import About from './views/About.vue'
import DashBoard from './views/admin/DashBoard.vue'
import UserListView from './views/admin/user_manage/UserListView.vue'
import PaymentRedirect from './views/PaymentRedirect.vue';
import PaymentCancel from './views/PaymentCancel.vue';
import VipUser from './views/admin/user_manage/VipUser'
import Product from "./views/admin/product_manage/Product"
import Category from "./views/admin/product_manage/Category.vue"
import Tags from "./views/admin/product_manage/Tags.vue"
import ServicePack from "./views/admin/product_manage/ServicePack.vue"
import Order from "./views/admin/order_manage/Order.vue"
import Transaction from "./views/admin/order_manage/Transaction.vue"
import Payment from "./views/admin/order_manage/Payment.vue"
import Review from "./views/admin/crm/Review.vue"
import Feedback from "./views/admin/crm/Feedback.vue"
import Comment from "./views/admin/crm/Comment.vue"
import Banner from "./views/admin/marketing/Banner.vue"
import SalePromote from "./views/admin/marketing/SalePromote.vue"
import Home from './views/user/Home.vue'
import SaleStatistics from './views/admin/statistic/Sale.vue'
import ProductStatistics from './views/admin/statistic/Product.vue'
import UserStatistics from './views/admin/statistic/User.vue'
import Dash from './views/admin/dash/Dash.vue'



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/about',
                name: 'About',
                component: About
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/forgot-password/:resetToken',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/cancel',
        name: 'PaymentCancel',
        component: PaymentCancel
    },
    {
        path: '/redirect',
        name: 'PaymentRedirect',
        component: PaymentRedirect
    },
    {
        path: '/admin/',
        name: 'Admin DashBoard',
        component: DashBoard,
        children: [
            {
                path: '/',
                component: Dash,
            },
            {
                path: 'user-list',
                component: UserListView,
            },
            {
                path: 'vip-user',
                component: VipUser,
            },
            {
                path: 'product-manage',
                component: Product,
            },
            {
                path: 'category-manage',
                component: Category,
            },
            {
                path: 'tag-manage',
                component: Tags,
            },
            {
                path: 'service-pack-manage',
                component: ServicePack,
            },
            {
                path: 'order-manage',
                component: Order,
            },
            {
                path: 'transaction-manage',
                component: Transaction,
            },
            {
                path: 'payment-manage',
                component: Payment,
            },
            {
                path: 'review-manage',
                component: Review,
            },
            {
                path: 'feedback-manage',
                component: Feedback,
            },
            {
                path: 'comment-manage',
                component: Comment,
            },
            {
                path: 'sale-statistics',
                component: SaleStatistics
            },
            {
                path: 'product-statistics',
                component: ProductStatistics
            },
            {
                path: 'user-statistics',
                component: UserStatistics
            },
            {
                path: 'banner',
                component: Banner,
            },
            {
                path: 'sale-promote',
                component: SalePromote
            }

        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router