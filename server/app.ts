import { Hono } from 'hono'
import {logger} from 'hono/logger'
import { expensesRoute } from './routes/expenses'
import { serveStatic } from 'hono/bun'
import {cors} from 'hono/cors'

const app = new Hono()

app.use(logger())

app.use(cors({
    origin: 'https://expense-tracker-backend-hr18.onrender.com/', // Replace with your frontend's domain
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Customize methods as needed
  }))

app.route("/api/expenses", expensesRoute)

app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app