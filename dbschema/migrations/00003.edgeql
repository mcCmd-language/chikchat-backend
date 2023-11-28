CREATE MIGRATION m1mot5wfk53nmabiqlzit4itbh44cvthsheogky3vjazzwzzb3j5wq
    ONTO m1ncfwydf4fwqyagmurj5h2exsk4swox5if7a44fhm2rghwkxupeaq
{
  ALTER TYPE default::Account {
      DROP LINK chats;
  };
};
