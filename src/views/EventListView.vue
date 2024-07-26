<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryCard from '@/components/CategoryCard.vue'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { type Event } from '@/types' // ???
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPage = Math.ceil(totalEvents.value / 2)
  return page.value < totalPage
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)
const limit = computed(() => props.limit)
onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(limit.value, page.value)
      .then((response) => {
        events.value = response.data
        console.log(limit.value)
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There wan an error!', error)
      })
  })
})
</script>

<template>
  <h1>Events for Good</h1>
  <!-- new element -->
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
  <div class="pagination">
    <RouterLink
      :to="{ name: 'event-list-view', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
      >Prev Page</RouterLink
    >
    <RouterLink
      :to="{ name: 'event-list-view', query: { page: page + 1 } }"
      rel="next"
      v-if="hasNextPage"
      >Next Page &#62;</RouterLink
    >
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
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
