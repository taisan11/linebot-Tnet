import { Hono } from 'hono';
import { z } from 'zod'; 

const app: Hono = new Hono()

app.get('/', (c) => c.redirect("https://github.com/taisan11/linebot-Tnet"))
app.post("/api/webhook", async (c) => {
    console.log(JSON.stringify(c));
    return c.jsonT({ message: "Hello World!" });
});

app.notFound((c) => {
    return c.text("NotFound Handler")
})

app.onError((c) => {
    return c.text("Error Handler");
})

export default app.fetch;