<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Student } from '@/type' // ???
import StudentService from '@/services/StudentService'
import StudentCard from '@/components/StudentCard.vue'

const students = ref<Student[] | null>(null)

onMounted(() => {
  StudentService.getEvents()
    .then((response) => {
      students.value = response.data
      console.log(students.value)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Students</h1>
  <!-- new element -->
  <div class="events">
    <StudentCard v-for="student in students" :key="student.id" :student="student" />
  </div>
</template>

<style>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.category {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: right;
}
</style>
