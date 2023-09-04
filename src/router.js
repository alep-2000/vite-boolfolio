import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import PostList from './pages/PostList.vue';
import SinglePost from './pages/SinglePost.vue';
import NotFound from './pages/NotFound.vue';
import ContactUs from './pages/ContactUs.vue';
import ThankYou from './pages/ThankYou.vue';

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
        },
        {
            path: '/contact-us',
            name: 'contact-us',
            component: ContactUs
        },
        {
            path: '/thank-you',
            name: 'thank-you',
            component: ThankYou
        },
        {
            path: '/pagina-non-trovata',
            name: 'not-found',
            component: NotFound
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/pagina-non-trovata'
        }
    ]
});

export { router }