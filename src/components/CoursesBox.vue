<template>
    <div class="global-box">
    
      <h3 class="titulo-box">Cursos</h3>
    
      <div v-for="course of courses" class="course vstack gap-3">
        <div class="p-2">
          <RouterLink :to="'/curso/' + course.id" class="router-link">{{ course.name }}</RouterLink>
        </div>
      </div>
    
    </div>
    </template>
    
    
    <style>
    /* .course {
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
        company_id: "kwpGBT-cQ-M",
        courses: [] as any
      }
    },
    props: {
        companyId: Number
    },
    
    watch: {
        companyId(newCourseId) {
          this.getCourses(newCourseId);
        },
      },
    
      mounted() {
        if (this.companyId) {
          this.getCourses(this.companyId);
        }
      },
    
    methods: {
      async getCourses(id: any) {
        const token = localStorage.getItem('token-oasis')
          try {
            await axios
              .get(
                'http://localhost:8080/course/byCompany/' + id,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Authorization': `Bearer ${token}`
                  }
                }
              )
              .then((courses) => {
                this.courses = courses.data;
                console.log('courses.data', courses.data)
                console.log('this.courses', courses.data)
              })
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        },
    }
    }
    </script>