CREATE MIGRATION m1f3zkk2dlm4tu64bvgyddfluwxzduw6eusv4f6he5wpbb55dtodcq
    ONTO m1oc7jceo63dwwktbkxjbosafaaq4olo423civvgnfe3uvhkbiub6q
{
  ALTER TYPE default::Account {
      ALTER PROPERTY accid {
          CREATE CONSTRAINT std::exclusive;
      };
      ALTER PROPERTY username {
          DROP CONSTRAINT std::exclusive;
      };
  };
};
