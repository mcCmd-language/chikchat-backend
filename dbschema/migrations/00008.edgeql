CREATE MIGRATION m1kmavmbysrefese4wsdvrxm4dkkekansrnovl3xri4nei6hjuuilq
    ONTO m1a62nwbkolkwtkk7kixiiyioipgswtfqng4ha2gidqrysgqpnncea
{
  ALTER TYPE default::ManageElement {
      RESET ABSTRACT;
      DROP PROPERTY valueBool;
      DROP PROPERTY valueInt;
      DROP PROPERTY valueStr;
  };
  CREATE TYPE default::InputElement EXTENDING default::ManageElement {
      CREATE REQUIRED PROPERTY value: std::str;
  };
  CREATE TYPE default::TimerElement EXTENDING default::ManageElement {
      CREATE REQUIRED PROPERTY value: std::int64;
  };
  CREATE TYPE default::ToggleElement EXTENDING default::ManageElement {
      CREATE REQUIRED PROPERTY value: std::bool;
  };
  CREATE TYPE default::TriggerElement EXTENDING default::ManageElement {
      CREATE REQUIRED PROPERTY value: std::str;
  };
};
