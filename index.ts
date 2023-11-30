import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as edgedb from "https://deno.land/x/edgedb/mod.ts";

const app = new Application();
const router = new Router();
const db = edgedb.createClient();

router.get("/users", async (ctx) => {
  const users = await db.queryJSON("select Account { username, accid, description, image}");
  ctx.response.status = 200;
  ctx.response.body = users;
})

router.post("/register", async (ctx) => {
  const {headers} = ctx.request;
  const username = headers.get("username");
  const accid = headers.get("accid");
  const password = headers.get("password");
  const description = headers.get("description");
  if (await db.querySingle("select Account { username, accid, description, image} filter .accid = <str>$accid", {accid}) != null) {
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
  const user = await db.querySingle("select Account { username, accid, description, image} filter .accid = <str>$accid and .password = <str>$password", {accid, password});
  if (user == null) {
    ctx.response.status = 401;
    return;
  }
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
  ctx.response.body = msg;
})

router.post("/msg", async (ctx) => {
  const headerlist = ctx.request.headers;
  const from = headerlist.get("from");
  const to = headerlist.get("to");
  const content = headerlist.get("content");
  const time = Date.now();
  await db.querySingle("insert Message {from := <str>$from, to := <str>$to, text := <str>$content, time := <int64>$time}", {from, to, content, time});
  ctx.response.body = "ok";
  ctx.response.status = 201;
})

router.post("/update_desc", async (ctx) => {
  const {headers} = ctx.request;
  const accid = headers.get("accid");
  const description = headers.get("description");
  await db.querySingle("update Account filter .accid = <str>$accid set {description := <str>$description}", {accid, description});
});

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({ port: 21000 });

