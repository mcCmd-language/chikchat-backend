import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as edgedb from "https://deno.land/x/edgedb/mod.ts";

const app = new Application();
const router = new Router();
const db = edgedb.createClient();

router.get("/user", async (ctx) => {
  const {headers} = ctx.request;
  const name = headers.get("name");
  const user = await db.querySingleJSON("select User {username, chats } filter .username = $name", {name});
  ctx.response.body = user;
})

router.post("/msg", async (ctx) => {
  const {headers} = ctx.response;
  const from = headers.get("from");
  const to = headers.get("to");
  const content = headers.get("content");
  const time = Date.now();
  await db.querySingle("insert Msg {from := $from, to := $to, text := $content, time := $time}", {from, to, content, time});
  ctx.response.body = "ok";
})

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({ port: 21000 });

