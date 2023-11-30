CREATE MIGRATION m1oc7jceo63dwwktbkxjbosafaaq4olo423civvgnfe3uvhkbiub6q
    ONTO m1mot5wfk53nmabiqlzit4itbh44cvthsheogky3vjazzwzzb3j5wq
{
  ALTER TYPE default::Account {
      CREATE REQUIRED PROPERTY accid: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE REQUIRED PROPERTY description: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE REQUIRED PROPERTY image: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE REQUIRED PROPERTY password: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
