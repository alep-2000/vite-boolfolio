<script>
import axios from 'axios';
import { store } from '../store.js';
import AppLoader from '../components/AppLoader.vue';
import AppCard from '../components/AppCard.vue'


export default {
    name: 'PostList',
    components: {
        AppLoader,
        AppCard
    },
    data() {
        return {
            store,
            posts: [],
            currentPage: 1,
            lastPage: null
        }
    },
    created() {
        this.getPosts(1);
    },
    methods: {
        getPosts(num_page) {
            this.store.loading = true;
            axios.get(`${this.store.baseUrl}/api/posts`, { params: { page: num_page } }).then((response) => {
                if (response.data.success) {
                    this.posts = response.data.results.data;
                    this.currentPage = response.data.results.current_page;
                    this.lastPage = response.data.results.last_page;
                    this.store.loading = false;
                }
            })
        }
    }
}
</script>

<template lang="">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center text-primary mb-5">Boolpress - POSTS</h1>
            </div>
        </div>
    </div>
    <AppLoader v-if="loading"/>
    <div v-else class="container">
        <div class="row">
            <div class="col-12 col-md-4" v-for="post in posts" :key="post.id">
                <AppCard :post="post"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-center">
                    <nav>
                        <ul class="pagination"> 
                            <li :class="currentPage === 1 ? 'disabled' : '' ">
                                <button class="page-link" @click="getPosts(currentPage - 1)">Prev</button>
                            </li>
                            <li :class="currentPage === lastPage ? 'disabled' : '' ">
                                <button class="page-link" @click="getPosts(currentPage + 1)">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
img {
    min-height: 200px;
}
</style>