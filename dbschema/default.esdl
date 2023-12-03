module default {
  type Account {
    required username: str;
    required password: str;
    required description: str;
    required manage: json;
    image: str;
    required accid: str {
      constraint exclusive;
    };
  }

  type Message {
    required text: str;
    required time: int64;
    required from: str;
    required to: str;
  }
}
