

export default {
    async paths() {
        // use respective CMS client library if needed
        const data = await (await fetch('https://api.aerodb.net/airports/all?limit=10000')).json()

        return data.map((airport) => {
            return {
                params: {
                    airportId: airport.iataCode || airport.icaoCode || airport.id
                }
            }
        })
    }
}