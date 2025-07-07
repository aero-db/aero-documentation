

export default {
    async paths() {
        // use respective CMS client library if needed
        const data = await (await fetch('https://api.aerodb.net/airports/all', {

        })).json()

        return data.map(entry => {
            return {
                params: entry,
                content: entry
            }
        })
    }
}