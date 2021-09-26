<template>
  <div class="container-fluid mt-5">
    <div class="row d-flex flex-row justify-content-center align-items-center p-3">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 card bg-dark shadow d-flex flex-column justify-content-center align-items-center text-center fadeIn" v-for="course in courses" :key="course.ID">
        <img class="img-thumbnail rounded-circle border-success mt-3" :src="require('@/assets/' + course.Logo)" style="width: 100px; height: 100px; border: 5px solid">
        <h3><router-link class="nav-link text-success" :to="{'name': 'Courses', 'params': {id: course.ID}}">{{course.Title}}</router-link></h3>
        <h5 class="text-success" v-if="course.Mode === 'completed' ">Завершён</h5>
        <h6 class="text-secondary">{{course.Description}}</h6>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
import data from '@/assets/data.json'

export default {
  data() {
    return {
      courses: []
    }
  },
  created() {
    this.courses = this.GetCourses()
  },
  methods: {
    GetCourses() {
      let courses = []
      for (var i in data["courses"]) {
        let course = data["courses"][i]
        let mode = localStorage.getItem(String(i))
        courses.push({
          ID: i,
          Title: course["title"],
          Description: course["description"],
          Logo: `${course["logo"]}`,
          Mode: mode
        })
      }
      return courses
    }
  },
}

</script>
