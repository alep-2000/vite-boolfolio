<script>
export default {
    name: 'AppCard',
    props: {
        post: Object
    },
    data() {
        return {
            maxNumChara: 150,
        }
    },
    methods: {
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
</template>

<style lang="">
    
</style>