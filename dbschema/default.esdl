module default {
  type Account {
    required username: str {
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
