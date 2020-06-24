import * as React from "react";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import { useFetchTodos } from "../domain/hooks/useFetchTodos";

export const TodoPage: React.FC = () => {
  const { data, loading } = useFetchTodos();

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <MaterialTable
          columns={[
            { title: "タイトル", field: "title" },
            { title: "完了", field: "done", type: "boolean" },
            { title: "登録日時", field: "createdAt", type: "datetime" },
          ]}
          isLoading={loading}
          data={data ?? []}
          title="TODOリスト"
        />
      </Grid>
    </Grid>
  );
};
