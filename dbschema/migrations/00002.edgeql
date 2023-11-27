CREATE MIGRATION m1ncfwydf4fwqyagmurj5h2exsk4swox5if7a44fhm2rghwkxupeaq
    ONTO m142hwz4xezh6r4n7rosimfsjzui7l245jci26oh7w2bakamwxl6ba
{
  ALTER TYPE default::Message {
      DROP LINK from;
  };
  ALTER TYPE default::Message {
      DROP LINK to;
  };
  ALTER TYPE default::Message {
      CREATE REQUIRED PROPERTY from: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE default::Message {
      CREATE REQUIRED PROPERTY to: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
