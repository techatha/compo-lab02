<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
// import CategoryCard from '@/components/CategoryCard.vue'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { type Event } from '@/types' // ???
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'

const router = useRouter()
const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPage = Math.ceil(totalEvents.value / 3)
  return page.value < totalPage
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
})
const page = computed(() => props.page)
onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(3, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
  })
})
</script>

<template>
  <!-- new element -->
  <div class="flex flex-col items-center">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="w-[290px]">
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev" class="text-left text-custom-gray"
        v-if="page != 1"
        >&lt; Prev Page</RouterLink
      >
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next" class="text-right text-custom-gray"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
  <!-- <div class="category">
    <CategoryCard v-for="event in events" :key="event.id" :event="event" />
  </div> -->
</template>


