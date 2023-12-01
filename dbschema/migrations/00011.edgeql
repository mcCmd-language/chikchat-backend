CREATE MIGRATION m1mc54bm4pg7bpaavx6qxia3elwtqga6avoghsj4zytcntebzcrtkq
    ONTO m1biehe7szfwoveo22opfqy5zqgitq2ouj5ibhxmjk2636ttckigyq
{
  DROP TYPE default::InputElement;
  DROP TYPE default::TimerElement;
  DROP TYPE default::ToggleElement;
  DROP TYPE default::TriggerElement;
  ALTER TYPE default::ManageElement {
      ALTER PROPERTY parent_id {
          RENAME TO parent_name;
      };
  };
  CREATE SCALAR TYPE default::ValueForManage EXTENDING enum<bool, str, int64>;
  ALTER TYPE default::ManageElement {
      CREATE REQUIRED PROPERTY value: default::ValueForManage {
          SET REQUIRED USING (<default::ValueForManage>{});
      };
  };
};
