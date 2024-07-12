<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryCard from '@/components/CategoryCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { Event } from '@/type' // ???

const events = ref<Event[] | null>(null)

onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/techatha/Compo-Lab02-number14/events')
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Events for Good</h1>
  <!-- new element -->
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
  <div class="category">
    <CategoryCard v-for="event in events" :key="event.id" :event="event" />
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
