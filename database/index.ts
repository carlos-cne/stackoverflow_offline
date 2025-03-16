import { Database } from "@nozbe/watermelondb";
import schema from "../model/schema";
import Question from "../model/Question";
import { createAdapter } from "./adapter";

// Use SQLite for native platforms and LokiJS for web

const database = new Database({
  adapter: createAdapter({ schema, dbName: "frontend_bh" }),
  modelClasses: [Question],
});

export { database };
