export default defineEventHandler(async (event) => {
    const url = "https://sparql.terminologi.no/termwiki_prod/query"
    const body = await useBody(event)
    try {
        const response = await fetch(url, {
            method: "post",
            body: body,
            headers: {
                'Content-type': 'application/sparql-query',
                'Referer': 'https://term.uib.no/'
            }

        });
        if (response.ok) {
            return await response.json()
        }
        else {
            console.log(response.status)
        }
    }
    catch (e) {
        console.error(e.name)
    }
})

