from requests import post, get

post("http://localhost:21000/msg",
     headers={
         "from": "a",
         "to": "b",
         "content": "hi",
         "time": "0"
     }
     )
print(get("http://localhost:21000/msg", headers={"from": "a"}).json())
