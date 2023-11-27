CREATE MIGRATION m142hwz4xezh6r4n7rosimfsjzui7l245jci26oh7w2bakamwxl6ba
    ONTO initial
{
  CREATE TYPE default::Account {
      CREATE REQUIRED PROPERTY username: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE default::Message {
      CREATE REQUIRED LINK from: default::Account;
      CREATE REQUIRED LINK to: default::Account;
      CREATE REQUIRED PROPERTY text: std::str;
      CREATE REQUIRED PROPERTY time: std::int64;
  };
  ALTER TYPE default::Account {
      CREATE MULTI LINK chats: default::Message;
  };
};
