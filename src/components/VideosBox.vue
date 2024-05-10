<template>
<div class="global-box">

  <h3 class="titulo-box">Videos</h3>

  <div v-for="video of videos" class="video vstack gap-3">
    <div class="p-2">
      <RouterLink :to="'/about/' + video.id" class="router-link">{{ video.name }}</RouterLink>
    </div>
  </div>

</div>
</template>


<style>
/* .video {
  width: 100%;
  margin: 1px 12px;
} */
</style>

<script lang="ts">
import axios from 'axios'

export default {

name: 'VideoBox',
data() {
  return {
    video_id: "kwpGBT-cQ-M",
    videos: [] as any
  }
},
props: {
    courseId: Number
},

watch: {
    courseId(newCourseId) {
      this.getVideos(newCourseId);
    },
  },

  mounted() {
    if (this.courseId) {
      console.log('COURSE ID ', this.courseId)
      this.getVideos(this.courseId);
    }
  },

methods: {
  async getVideos(id: any) {
    const token = localStorage.getItem('token-oasis')
      try {
        await axios
          .get(
            'http://192.168.0.104:8080/video/byCourse/' + id,
            {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          .then((videos) => {
            this.videos = videos.data;
            console.log('videos.data', videos.data)
            console.log('this.videos', videos.data)
          })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
}
}
</script>