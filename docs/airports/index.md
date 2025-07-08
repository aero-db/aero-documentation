<table v-if="data?.length">
  <tr v-for="airport in data">
    <td>{{ airport.name }}</td>
    <td>{{ airport.iataCode || data.icaoCode || data.id }}</td>
  </tr>
</table>

<script setup>
import { ref, onMounted } from 'vue'

const data = ref([])

onMounted(async () => {
  const res = await fetch('https://api.aerodb.net/airports/all?limit=1000')
  data.value = await res.json()
})
</script>
