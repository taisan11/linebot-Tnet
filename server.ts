import { Hono } from "hono";

const app: Hono = new Hono();

// app.get('/', (c) => c.redirect("https://github.com/taisan11/linebot-Tnet"))
app.post("/api/webhook", (c) => {
  console.log(JSON.stringify(c));
  return c.jsonT({ message: "Hello World!" });
});

app.notFound((c) => {
  return c.text("NotFound");
});

app.onError((c) => {
  return c.text("Error");
});

Deno.serve(app.fetch);
