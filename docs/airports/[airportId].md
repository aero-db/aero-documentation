
# {{ data.name }}

## Details

## Runways

<table v-if="data.runways && data.runways.length">
    <thead>
        <tr>
            <th>Name</th>
            <th>Length (ft)</th>
            <th>Width (ft)</th>
            <th>Lighted</th>
            <th>Closed</th>
            <th>Low End Ident</th>
            <th>Low End Elev (ft)</th>
            <th>Low End Heading</th>
            <th>Low End Displaced Threshold (ft)</th>
            <th>High End Ident</th>
            <th>High End Elev (ft)</th>
            <th>High End Heading</th>
            <th>High End Displaced Threshold (ft)</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="runway in data.runways" :key="runway.name">
            <td>{{ runway.name }}</td>
            <td>{{ runway.length }}</td>
            <td>{{ runway.width }}</td>
            <td>{{ runway.isLighted ? 'Yes' : 'No' }}</td>
            <td>{{ runway.isClosed ? 'Yes' : 'No' }}</td>
            <td>{{ runway.lowEndIdent }}</td>
            <td>{{ runway.lowEndElevation }}</td>
            <td>{{ runway.lowEndHeading }}</td>
            <td>{{ runway.lowEndDisplacedThreshold }}</td>
            <td>{{ runway.highEndIdent }}</td>
            <td>{{ runway.highEndElevation }}</td>
            <td>{{ runway.highEndHeading }}</td>
            <td>{{ runway.highEndDisplacedThreshold }}</td>
        </tr>
    </tbody>
</table>
<span v-else>No runway data available.</span>

## Frequencies

<table v-if="data.frequencies && data.frequencies.length">
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Frequency (MHz)</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="freq in data.frequencies" :key="freq.id">
            <td>{{ freq.name }}</td>
            <td>{{ freq.type }}</td>
            <td>{{ freq.frequency }}</td>
            <td>{{ freq.description || 'N/A' }}</td>
        </tr>
    </tbody>
</table>
<span v-else>No frequency data available.</span>

<script setup>
import { ref, onMounted } from 'vue'

import { useData } from 'vitepress'

// params is a Vue ref
const { params } = useData()
console.log(params.value)

const data = ref([])

onMounted(async () => {
  const res = await fetch(`https://api.aerodb.net/airports/${params.value.airportId}`)

  data.value = await res.json()
    console.log(data.value)
  document.title = `${data.value.name} | AeroDB`
})
</script>
