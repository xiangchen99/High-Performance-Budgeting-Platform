import { Hono } from 'hono'
import {logger} from 'hono/logger'
import { expensesRoute } from './routes/expenses'
import { serveStatic } from 'hono/bun'
import {cors} from 'hono/cors'
import {authRoute} from './routes/auth'

const app = new Hono();

app.use(logger());

app.use(
    '/api/*',
    cors({
      origin: 'https://expense-tracker-frontend-hr18.onrender.com', // Replace with your frontend's URL
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization'], // Add any custom headers if needed
    })
  );

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute).route("/", authRoute);

app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app
export type ApiRoutes = typeof apiRoutes