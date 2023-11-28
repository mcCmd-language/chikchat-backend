import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as edgedb from "https://deno.land/x/edgedb/mod.ts";

const app = new Application();
const router = new Router();
const db = edgedb.createClient();

router.get("/user", async (ctx) => {
  const {headers} = ctx.request;
  const name = headers.get("name");
  const user = await db.querySingleJSON("select User { username } filter .username = <str>$name", {name});
  ctx.response.body = user;
})

router.get("/msg", async (ctx) => {
  const {headers} = ctx.request;
  const from = headers.get("from");
  const msg = await db.queryJSON("select Message {from, to, text, time} filter .from = <str>$from", {from});
  ctx.response.body = msg;
})

router.post("/msg", async (ctx) => {
  const headerlist = ctx.request.headers;
  const from = headerlist.get("from");
  const to = headerlist.get("to");
  const content = headerlist.get("content");
  const time = Date.now();
  console.log(from, to, content, time);
  await db.querySingle("insert Message {from := <str>$from, to := <str>$to, text := <str>$content, time := <int64>$time}", {from, to, content, time});
  ctx.response.body = "ok";
})

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({ port: 21000 });

