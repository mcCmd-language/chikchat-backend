module default {
  type Account {
    required username: str;
    required password: str;
    required description: str;
    multi link manage: Manage {
      on target delete allow;
    };
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

  type Manage {
    required name: str;
    required parent_accid: str;
    multi link elements: ManageElement {
      on target delete allow;
    };
  }

  scalar type ValueForManage extending enum<bool, str, int64>;

  type ManageElement {
    required name: str;
    required parent_name: str;
    required type: str;
    required value: ValueForManage;
  }
}
