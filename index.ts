import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as edgedb from "https://deno.land/x/edgedb/mod.ts";

const app = new Application();
const router = new Router();
const db = edgedb.createClient();
let message = {};

router.get("/ws", (ctx) => {
  if (!ctx.isUpgradable) {
    ctx.response.status = 400;
    return;
  }
  const ws = ctx.upgrade();
  let _original = {}
  setInterval(()=>{
    if (message == _original) {return;}
    if (ws.readyState != 1) {return;}
    console.log(message);
    _original = message;
    ws.send(JSON.stringify(message));
  }, 1000);
})

router.get("/users", async (ctx) => {
  const users = await db.queryJSON("select Account { username, accid, description, image, manage }");
  ctx.response.status = 200;
  ctx.response.body = users;
})

router.post("/register", async (ctx) => {
  const {headers} = ctx.request;
  const username = headers.get("username");
  const accid = headers.get("accid");
  const password = headers.get("password");
  const description = headers.get("description");
  if (await db.querySingle("select Account { username, accid, description, image, manage } filter .accid = <str>$accid", {accid}) != null) {
    ctx.response.status = 409;
    ctx.response.body = "accid already exists";
    return;
  }
  ctx.response.status = 201;
  await db.querySingle("insert Account { username := <str>$username, accid := <str>$accid, password := <str>$password, description := <str>$description}", {username, accid, password, description});
})

router.get("/login", async (ctx) => {
  const {headers} = ctx.request;
  const accid = headers.get("accid");
  const password = headers.get("password");
  const user = await db.querySingle("select Account { username, accid, description, image, manage } filter .accid = <str>$accid and .password = <str>$password", {accid, password});
  if (user == null) {
    ctx.response.status = 401;
    return;
  }
  ctx.response.status = 200;
  ctx.response.body = user;
})

router.get("/msgs", async (ctx) => {
  const msg = await db.queryJSON("select Message {from, to, text, time}");
  ctx.response.body = msg;
})

router.get("/msg", async (ctx) => {
  const {headers} = ctx.request;
  const from = headers.get("from");
  const msg = await db.queryJSON("select Message {from, to, text, time} filter .from = <str>$from", {from});
  ctx.response.status = 200;
  ctx.response.body = msg;
})

router.post("/msg", async (ctx) => {
  const headerlist = ctx.request.headers;
  const from = headerlist.get("from");
  const to = headerlist.get("to");
  const content = headerlist.get("content");
  const time = Date.now();
  const json = await db.querySingleJSON("insert Message {from := <str>$from, to := <str>$to, text := <str>$content, time := <int64>$time}", {from, to, content, time});
  message = {
    "id": JSON.parse(json)["id"],
    "from": from,
    "content": content,
    "time": time,
    "to": to
  };
  ctx.response.body = "ok";
  ctx.response.status = 201;
})

router.post("/update_desc", async (ctx) => {
  const {headers} = ctx.request;
  const accid = headers.get("accid");
  const description = headers.get("description");
  await db.querySingle("update Account filter .accid = <str>$accid set {description := <str>$description}", {accid, description});
  ctx.response.status = 200;
});

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({ port: 21000 });

