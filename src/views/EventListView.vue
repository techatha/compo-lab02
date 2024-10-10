<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
// import CategoryCard from '@/components/CategoryCard.vue'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { type Event } from '@/types' // ???
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'

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
  }
})
const page = computed(() => props.page)
onMounted(() => {
  watchEffect(() => {
    updateKeyword()
  })
})
const keyword = ref('')
function updateKeyword() {
  console.log('fuck')
  let queryFunction
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(3, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, page.value)
  }
  queryFunction
    .then((response) => {
      events.value = response.data
      console.log('events', events.value)
      totalEvents.value = response.headers['x-total-count']
      console.log('totalEvent', totalEvents.value)
    })
    .catch(() => {
      router.push({ name: 'NetworkError' })
    })
}
</script>

<template>
  <!-- new element -->
  <div class="flex flex-col items-center">
    <h1>Events for Good</h1>
    <div class="w-64">
      <BaseInput
        v-model="keyword"
        type="text"
        label="Search..."
        class="w-full"
        @input="updateKeyword"
      />
    </div>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="w-[290px]">
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        class="text-left text-custom-gray"
        v-if="page != 1"
        >&lt; Prev Page</RouterLink
      >
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        class="text-right text-custom-gray"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
  <!-- <div class="category">
    <CategoryCard v-for="event in events" :key="event.id" :event="event" />
  </div> -->
</template>
