<script>
import axios from 'axios';
import AppLoader from '../components/AppLoader.vue';


export default {
    name: 'PostList',
    components: {
        AppLoader
    },
    data() {
        return {
            baseUrl: 'http://127.0.0.1:8000',
            posts: [],
            loading: true,
            maxNumChara: 150,
            currentPage: 1,
            lastPage: null
        }
    },
    created() {
        this.getPosts(1);
    },
    methods: {
        getPosts(num_page) {
            this.loading = true;
            axios.get(`${this.baseUrl}/api/posts`, { params: { page: num_page } }).then((response) => {
                if (response.data.success) {
                    this.posts = response.data.results.data;
                    this.currentPage = response.data.results.current_page;
                    this.lastPage = response.data.results.last_page;
                    this.loading = false;
                }
            })
        },
        truncateText(text) {
            if (text.length > this.maxNumChara) {
                return text.substr(0, this.maxNumChara) + '...';
            }

            return text;
        }
    }
}
</script>

<template lang="">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center text-secondary">Boolpress</h1>
            </div>
        </div>
    </div>
    <AppLoader v-if="loading"/>
    <div v-else class="container">
        <div class="row">
            <div class="col-12 col-md-4" v-for="post in posts" :key="post.id">
                <div class="card-header my-3">
                    {{ post.title }}
                </div>
                <div class="card-image-top my-3">
                    <img :src="`${baseUrl}/storage/${post.cover_image}`" class="w-50">
                </div>
                <div class="card-body my-3">
                    <p>
                        <span v-if="post.types">{{ post.types.name }}</span>
                        <span v-else>Tipologia non scelta</span>
                    </p>
                    <p v-if="post.tecnologies">
                        <span class="badge text-bg-primary" v-for="tecnology in post.tecnologies" :key="tecnology.id">
                            {{tecnology.name}}
                        </span>
                    </p>
                    <p>{{ truncateText(post.content) }}</p>
                </div>
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