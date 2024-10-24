<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import SigleImgUpload from '@/components/SigleImgUpload.vue'

const organizer = ref<Organizer>({
  id: 0,
  name: '',
  image: []
})

const router = useRouter()
const store = useMessageStore()
function saveEvent() {
  OrganizerService.saveOrganizer(organizer.value)
    .then((res) => {
      // router.push({ name: 'event-detail-view', params: { id: res.data.id } })
      store.updateMessage('You are successfully add a new event for ' + res.data.organizer)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>
<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="saveEvent">
      <label>Name</label>
      <input v-model="organizer.name" type="text" placeholder="Name" class="field" />

      <h3>The image of the Event</h3>
      <SigleImgUpload v-model="organizer.image" />

      <button class="button" type="submit">Submit</button>
    </form>
    <pre>{{ organizer }}</pre>
  </div>
</template>
