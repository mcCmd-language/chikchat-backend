CREATE MIGRATION m1xdz5l4ad7qc4z4fgxgupguzr4feijhnobrr7ay6bammn6ltn7iva
    ONTO m1mc54bm4pg7bpaavx6qxia3elwtqga6avoghsj4zytcntebzcrtkq
{
  ALTER TYPE default::Manage {
      ALTER LINK elements {
          RESET OPTIONALITY;
      };
  };
};
