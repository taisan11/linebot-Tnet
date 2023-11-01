import { Hono } from 'https://deno.land/x/hono@v3.9.0/mod.ts'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))
app.post("/api/webhook", async (c) => {
    console.log(JSON.stringify(c));
    return c.json({ message: "Hello World!" });
});

Deno.serve(app.fetch)
