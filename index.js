import { Hono } from 'hono'

const app = new Hono()

const client_id= "b1c12627-36fe-4fab-b0bc-914caf46f0e0"

app.get('/auth', async (c) => {
    const code = c.req.query('code')
    const session_state = c.req.query('session_state')

    const payload = {
        client_id: client_id,
        code: code,
        session_state: session_state,
        redirect_uri: "https://api.stallioninfosoft.com/auth",
        scope:"https://graph.microsoft.com/.default offline_access",
    }
    const res = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    return c.json(res.json)
})

export default app
