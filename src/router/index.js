import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login/Login.vue';
import DashBoard from '../views/DashBoard/DashBoard.vue';
import Notice from '../views/Board/Notice.vue';
import NoticeDetail from '../components/page/Board/Notice/NoticeDetail.vue';

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/vue',
        name: 'vue',
        component: DashBoard,
        children: [
            {
                path: 'board',
                name: 'board',
                children: [
                    {
                        path: 'notice.do',
                        name: 'notice',
                        component: Notice,
                        children: [
                            {
                                // 중첩라우터 <router-view>를 통해 NoticeDetail이 랜더링, 부모 자식 관계가 생김
                                path: ':idx',
                                name: 'noticeDetail',
                                component: NoticeDetail,
                            },
                        ],
                    },
                    {
                        // 단일 라우터 컴포넌트 간의 부모 자식 관계가 없음, 해당 경로로 새로운 컴포넌트가 열림
                        path: 'notice.do/:idx',
                        name: 'noticeDetail',
                        component: NoticeDetail,
                    },
                    {
                        path: 'notice.do/insert',
                        name: 'noticeInsertForm',
                        component: NoticeDetail,
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;
