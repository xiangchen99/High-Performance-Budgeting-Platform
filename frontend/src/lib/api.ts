import {hc} from "hono/client"
import {type ApiRoutes} from "@server/app"

//specify the server url
const client = hc<ApiRoutes>('/')

export const api = client.api