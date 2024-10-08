
import {
  Environment,
  Network,
  RecordSource,
  Store,
  RequestParameters,
  Variables,
} from "relay-runtime"

async function fetchQuery(
  operation: RequestParameters,
  variables: Variables
) {
  const token = `Bearer ${localStorage.getItem('TOKEN')}`

  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token || "",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  })

  return response.json()
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})

export { environment, fetchQuery }
