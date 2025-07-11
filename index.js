import { Hono } from 'hono'

const app = new Hono()

app.get('/auth', (c) => {
    return c.json({ message: 'Hello from /auth!' })
})

export default app
