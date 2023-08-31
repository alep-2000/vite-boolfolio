<script>

import axios from 'axios';
import { store } from '../store.js';
import AppLoader from '../components/AppLoader.vue';

export default {
    name: 'SinglePost',
    components: {
        AppLoader
    },
    data() {
        return {
            store,
            post: null
        }
    },
    created() {
        this.getSinglePost();
    },
    methods: {
        getSinglePost() {
            this.store.loading = true;
            axios.get(`${this.store.baseUrl}/api/posts/${this.$route.params.slug}`).then((response) => {
                if (response.data.success) {
                    this.post = response.data.post;
                    this.store.loading = false;
                }
                else {
                    this.$router.push({ name: 'not-found' });
                }
            })
        }
    }
}
</script>

<template lang="">
    <div>
        <AppLoader v-if="store.loading" />
        <div class="container" v-else>
            <div class="row">
                <div class="col-12 text-center mb-4">
                    <h1>{{ post.title }}</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-12 mb-3">
                    <img :src="`${store.baseUrl}/storage/${post.cover_image}`" class="w-50">
                </div>
                <div class="col-12" v-if="post.types">
                    <strong>Tipologia:</strong> {{ post.types.name }}
                </div>
                <div class="col-12 my-2" v-if="post.tecnologies">
                    <strong>Tecnologia:</strong> 
                    <span class="badge text-bg-primary mx-1" v-for="tecnology in post.tecnologies">
                        {{ tecnology.name }}
                    </span>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    {{ post.content }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="">
    
</style>