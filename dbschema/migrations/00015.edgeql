CREATE MIGRATION m1a7feo5iarqirnisv2njjrckrnanhoxrh24nssrfqxfz6iozeve5a
    ONTO m13n3n6jn5pfdsgzqp3zgjvptap7anffh6dz7fjrf3pxy6wm6w2ufa
{
  ALTER TYPE default::Account {
      ALTER PROPERTY manage {
          SET REQUIRED USING (<std::json>{[]});
      };
  };
};
