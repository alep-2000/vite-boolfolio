import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import PostList from './pages/PostList.vue';
import SinglePost from './pages/SinglePost.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/posts',
            name: 'posts',
            component: PostList
        },
        {
            path: '/posts/:slug',
            name: 'single-post',
            component: SinglePost
        }
    ]
});

export { router }