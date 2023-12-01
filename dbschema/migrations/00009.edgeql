CREATE MIGRATION m1ehnt64tjjrouva52gkzds7qfz3fri66xpdklanysmhfkb5br2pua
    ONTO m1kmavmbysrefese4wsdvrxm4dkkekansrnovl3xri4nei6hjuuilq
{
  ALTER TYPE default::Manage {
      CREATE REQUIRED PROPERTY name: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
