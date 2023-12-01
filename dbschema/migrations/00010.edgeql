CREATE MIGRATION m1biehe7szfwoveo22opfqy5zqgitq2ouj5ibhxmjk2636ttckigyq
    ONTO m1ehnt64tjjrouva52gkzds7qfz3fri66xpdklanysmhfkb5br2pua
{
  ALTER TYPE default::ManageElement {
      CREATE REQUIRED PROPERTY parent_id: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE default::Manage {
      CREATE REQUIRED PROPERTY parent_accid: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
