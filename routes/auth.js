import { Hono } from 'hono'

const router = new Hono()

router.get('/', (c) => {
    const name = c.req.query('code') || 'guest'
    return c.json({ message: `Hello, ${name}` })
})

export default router
