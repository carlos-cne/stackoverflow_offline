import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "questions",
      columns: [
        { name: "title", type: "string", isIndexed: true },
        { name: "body", type: "string" },
        { name: "score", type: "number" },
        { name: "view_count", type: "number" },
        { name: "answer_count", type: "number" },
        { name: "creation_date_at", type: "number" },
        { name: "last_activity_date_at", type: "number" },
        { name: "stack_exchange_id", type: "string" },
        { name: "owner_name", type: "string" },
        { name: "owner_avatar", type: "string" },
        { name: "tags", type: "string" },
      ],
    }),
  ],
});
