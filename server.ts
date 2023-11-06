import { Hono } from "hono";

const app: Hono = new Hono();

// app.get('/', (c) => c.redirect("https://github.com/taisan11/linebot-Tnet"))
app.post("/api/webhook", async (c) => {
  console.log(JSON.stringify(c));
  const replys: Promise<Response>[] = []
  for (const event of data.events) {
    // イベントでループ
    if (event.type !== 'message') return // メッセージでないイベントは無視

    const { message, replyToken } = event

    if (message.type !== 'text') return // テキストメッセージでないイベントは無視

    const textMessage: string = message.text // ユーザーの発言を取得

    const replyData = {
      replyToken,
      messages: [{
        type: "text",
        text: `${textMessage}`
      }],
    } // リプライするデータを作成
    replys.push(fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + Deno.env.get("LINE_TOKEN"),
      },
      "body": JSON.stringify(replyData),
    })) // リプライ
  }
  await Promise.all(replys) // 全てのリプライ完了を待つ
  return c.jsonT({ message: "Hello World!" });
});

app.notFound((c) => {
  return c.text("NotFound");
});

app.onError((c) => {
  return c.text("Error");
});

Deno.serve(app.fetch);
