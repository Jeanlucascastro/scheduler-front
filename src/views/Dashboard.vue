'use strict'
<template>
  <div class="dash">
    <h1>Oasis Dashboard {{ video.name }}</h1>
  </div>
  <div class="course-box-containder">
      <CourseBox :company-id="2"/>
    </div>
</template>

<style>
  .dash {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: aqua !important;
    margin-bottom: 100px;
  }

  .course-box-containder {
    width: 80%;
  }
</style>

<script lang="ts">
import { useRoute } from 'vue-router';
import { ref  } from 'vue';
import { useLoginMixin, type LoginMixin } from '../mixins/LoginMixin.js';
import axios from 'axios';
import CourseBox from '../components/CoursesBox.vue';

interface Video {
  name: String,
  url: String    
}

const { checkLogin }: LoginMixin = useLoginMixin();

export default {

 name: 'App',
 data() {
   return {
    video: {} as Video,
     video_id: "kwpGBT-cQ-M",
     userName: localStorage.getItem('usuario-oasis') 
   }
 },
 setup() {
  const route = useRoute();
  const loop = ref(1);

  if (Array.isArray(route.params.id)) {
  } else {
    loop.value = Number(route.params.id);
  }
  
    return { loop };
 },
 components: {
  CourseBox
 },

 methods: {
  async getVideos(id: any) {
    const token = localStorage.getItem('token-oasis')
      try {
        await axios
          .get(
            'http://localhost:8080/video/' + id,
            {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          .then((video) => {
            this.video = video.data;
            console.log('videos.data', video.data)
            console.log('this.videos', video.data)
          })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
 },

 created() {
    checkLogin()
    this.getVideos(this.loop)
  },
}

</script>
