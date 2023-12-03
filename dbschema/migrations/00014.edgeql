CREATE MIGRATION m13n3n6jn5pfdsgzqp3zgjvptap7anffh6dz7fjrf3pxy6wm6w2ufa
    ONTO m15z7v4ecydvg44njtgt6yeq2wwb7gzjpmsdd5d72odedz62g7zhya
{
  ALTER TYPE default::Account {
      DROP LINK manage;
  };
  ALTER TYPE default::Account {
      CREATE PROPERTY manage: std::json;
  };
  DROP TYPE default::Manage;
  DROP TYPE default::ManageElement;
  DROP SCALAR TYPE default::ValueForManage;
};
