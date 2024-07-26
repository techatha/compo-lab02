<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'
const event = ref<Event | null>(null)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
onMounted(() => {
  // fetch event (by ID) and set local event data
  EventService.getEvent(parseInt(props.id))
    .then((response) => {
      event.value = response.data
      console.log(event.value)
    })
    .catch((error) => {
      console.error('There is an error! ', error)
    })
})
</script>
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
