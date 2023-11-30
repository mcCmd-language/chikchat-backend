CREATE MIGRATION m1u25dwieluefe2qhgdsnfhtlcyt3fobmh6q5f56gqbm7vptnpfthq
    ONTO m1f3zkk2dlm4tu64bvgyddfluwxzduw6eusv4f6he5wpbb55dtodcq
{
  ALTER TYPE default::Account {
      ALTER PROPERTY image {
          RESET OPTIONALITY;
      };
  };
};
