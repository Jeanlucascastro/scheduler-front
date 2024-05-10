'use strict'
<template>
  <div class="about">
    <div class="video-box-containder">
      <VideoBox :course-id="2"/>
    </div>

    <!-- <button></button> -->
  </div>
</template>

<style>
  .about {
    width: 100%;
    height: 1000px;
  }

</style>

<script lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useLoginMixin, type LoginMixin } from '../mixins/LoginMixin.js';
import VideoBox from '../components/VideosBox.vue'


const { checkLogin }: LoginMixin = useLoginMixin();
export default {
  components: {
    VideoBox,
  },
  name: 'App',
  data() {
    return {
      video_id: "kwpGBT-cQ-M",
    }
  },
  setup() {
    const route = useRoute();
    const loop = ref(1);

    if (Array.isArray(route.params.id)) {
      // handle array case
    } else {
      loop.value = Number(route.params.id);
    }

    return { loop };
  },
  methods: {

    // checkLogin() {
    //   const token = localStorage.getItem('token-oasis')
      

    //   if (!token) {
    //     router.push('/')
    //   }
    // }
  },
  
  created() {
    checkLogin()
  },
}

</script>
