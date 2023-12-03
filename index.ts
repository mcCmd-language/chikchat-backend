import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as edgedb from "https://deno.land/x/edgedb/mod.ts";

const app = new Application();
const router = new Router();
const db = edgedb.createClient();
let message = {};

// 실시간 채팅을 위한 웹소켓
router.get("/ws", (ctx) => {
  if (!ctx.isUpgradable) {
    ctx.response.status = 400;
    return;
  }
  const ws = ctx.upgrade();
  let _original = {}
  // 채팅 데이터가 바뀔 경우 바뀐 데이터 전송
  setInterval(()=>{
    if (message == _original) {return;}
    if (ws.readyState != 1) {return;}
    console.log(message);
    _original = message;
    ws.send(JSON.stringify(message));
  }, 1000);
})

// 유저 정보 전송
router.get("/users", async (ctx) => {
  const users = await db.queryJSON("select Account { username, accid, description, image, manage }");
  console.log(users);
  console.log("a");
  const jusers = JSON.parse(users);
  for (const i of jusers) {
    if (i.manage.toString() !== "") {
      console.log(typeof i.manage);
      console.log(i.manage);
      i.manage = JSON.parse(i.manage)
    }
  }
  console.log(jusers);
  ctx.response.status = 200;
  ctx.response.body = jusers;
})

// 회원가입 요청
router.post("/register", async (ctx) => {
  const {headers} = ctx.request;
  const username = headers.get("username");
  const accid = headers.get("accid");
  const password = headers.get("password");
  const description = headers.get("description");
  // 만약 accid가 이미 존재한다면 409 Conflict
  if (await db.querySingle("select Account { username, accid, description, image, manage } filter .accid = <str>$accid", {accid}) != null) {
    ctx.response.status = 409;
    ctx.response.body = "accid already exists";
    return;
  }
  ctx.response.status = 201;
  await db.querySingle("insert Account { username := <str>$username, accid := <str>$accid, password := <str>$password, description := <str>$description}", {username, accid, password, description});
})

// 로그인 요청
router.get("/login", async (ctx) => {
  const {headers} = ctx.request;
  const accid = headers.get("accid");
  const password = headers.get("password");
  // accid와 password가 일치하는 유저가 없다면 401 Unauthorized
  const user = await db.querySingle("select Account { username, accid, description, image, manage } filter .accid = <str>$accid and .password = <str>$password", {accid, password});
  if (user == null) {
    ctx.response.status = 401;
    return;
  }
  if (user.manage.toString() != "") {
    user.manage = JSON.parse(user.manage)
  }
  ctx.response.status = 200;
  ctx.response.body = user;
})

// 메시지 리스트 요청
router.get("/msgs", async (ctx) => {
  const msg = await db.queryJSON("select Message {from, to, text, time}");
  ctx.response.body = msg;
})

// 메시지 요청
router.get("/msg", async (ctx) => {
  const {headers} = ctx.request;
  const from = headers.get("from");
  const msg = await db.queryJSON("select Message {from, to, text, time} filter .from = <str>$from", {from});
  ctx.response.status = 200;
  ctx.response.body = msg;
})

// 메시지 전송 요청
router.post("/msg", async (ctx) => {
  const headerlist = ctx.request.headers;
  const from = headerlist.get("from");
  const to = headerlist.get("to");
  const content = headerlist.get("content");
  const time = Date.now();
  const json = await db.querySingleJSON("insert Message {from := <str>$from, to := <str>$to, text := <str>$content, time := <int64>$time}", {from, to, content, time});
  // 메시지 변경 전송
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

// 설명 변경
router.post("/update_desc", async (ctx) => {
  const {headers} = ctx.request;
  const accid = headers.get("accid");
  const description = headers.get("description");
  await db.querySingle("update Account filter .accid = <str>$accid set {description := <str>$description}", {accid, description});
  ctx.response.status = 200;
});

// 일정 변경
router.post("/update_manage", async (ctx) => {
  const {headers} = ctx.request;
  const accid = headers.get("accid");
  const manage = headers.get("manage");
  if (manage === null) {ctx.response.status = 400; return;}
  // 다 지우고 새로 데이터 연동
  console.log("a");
  await db.querySingle("update Account filter .accid = <str>$accid set {manage := <json>$manage}", {accid, manage});
  ctx.response.status = 200;
})

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({ port: 21000 });

