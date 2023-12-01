CREATE MIGRATION m1a62nwbkolkwtkk7kixiiyioipgswtfqng4ha2gidqrysgqpnncea
    ONTO m1u25dwieluefe2qhgdsnfhtlcyt3fobmh6q5f56gqbm7vptnpfthq
{
  CREATE ABSTRACT TYPE default::ManageElement {
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY type: std::str;
      CREATE REQUIRED PROPERTY valueBool: std::bool;
      CREATE REQUIRED PROPERTY valueInt: std::int64;
      CREATE REQUIRED PROPERTY valueStr: std::str;
  };
  CREATE TYPE default::Manage {
      CREATE REQUIRED MULTI LINK elements: default::ManageElement;
  };
  ALTER TYPE default::Account {
      CREATE MULTI LINK manage: default::Manage;
  };
};
