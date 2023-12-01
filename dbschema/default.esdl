module default {
  type Account {
    required username: str;
    required password: str;
    required description: str;
    multi manage: Manage;
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
    required multi elements: ManageElement;
  }

  type ManageElement {
    required name: str;
    required type: str;
  }

  type ToggleElement extending ManageElement {
    required value: bool;
  }

  type InputElement extending ManageElement {
    required value: str;
  }

  type TimerElement extending ManageElement {
    required value: int64;
  }

  type TriggerElement extending ManageElement {
    required value: str;
  }
}
