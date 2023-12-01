CREATE MIGRATION m15z7v4ecydvg44njtgt6yeq2wwb7gzjpmsdd5d72odedz62g7zhya
    ONTO m1xdz5l4ad7qc4z4fgxgupguzr4feijhnobrr7ay6bammn6ltn7iva
{
  ALTER TYPE default::Account {
      ALTER LINK manage {
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE default::Manage {
      ALTER LINK elements {
          ON TARGET DELETE ALLOW;
      };
  };
};
