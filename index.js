import { Hono } from 'hono'

const app = new Hono()

const client_id = 'b1c12627-36fe-4fab-b0bc-914caf46f0e0'

// routes
app.get('/auth', async (c) => {

    const db = c.env.DB

    const code = c.req.query('code')
    const session_state = c.req.query('session_state')


    if (!code) {
        return c.json({ error: 'Missing code parameter' }, 400)
    }

    const payload = {
        client_id:client_id,
        code:code,
        session_state:session_state,
        redirect_uri: 'https://api.stallioninfosoft.com/auth',
        scope: 'https://graph.microsoft.com/.default offline_access',
        grant_type: 'authorization_code',
        client_secret: '-Nm8Q~-WlfcvYpjNqh12XulHWZY-2rUS2FmYVaie'
    }

    const params = new URLSearchParams(payload)

    try {
        const res = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        })

        const data = await res.json()
        const result = await db.prepare(
            'INSERT INTO tokens (token) VALUES (?)'
        ).bind(data).run()

        return c.json(data)
    } catch (error) {
        return c.json({ error: 'Failed to fetch token', detail: error.message }, 500)
    }
})

export default app
