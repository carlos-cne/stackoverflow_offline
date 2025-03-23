import { setup, assign, fromPromise, fromObservable } from "xstate";
import { fetchQuestions } from "../services/stackExchange";
import { database } from "@/database";
import Question from "@/model/Question";
import { Q } from "@nozbe/watermelondb";

export const syncMachine = setup({
  actors: {
    getQuestions: fromPromise(
      async ({ input }: { input: { lastSyncDate: string | null } }) => {
        const questions = await fetchQuestions(input.lastSyncDate);
        const questionsCollection = database.get<Question>("questions");
        console.log("questions", questions[0]);
        await database.write(async () => {
          const operations = questions.map((question: Question) =>
            questionsCollection.prepareCreate((q) => {
              Object.assign(q, question);
            })
          );

          await database.batch(operations);
        });

        return new Date().toISOString();
      }
    ),
    subscribeToDBChanges: fromObservable(() =>
      database
        .get<Question>("questions")
        .query(Q.sortBy("last_activity_date_at", Q.desc))
        .observe()
    ),
  },
  types: {
    context: {} as {
      questions: Question[];
      error: null | Error;
      lastSyncDate: null | string;
    },
  },
}).createMachine({
  id: "sync",
  initial: "idle",
  context: {
    questions: [],
    error: null,
    lastSyncDate: null,
  },
  invoke: {
    src: "subscribeToDBChanges",
    onSnapshot: {
      actions: [
        assign(({ event }) => ({
          questions: event.snapshot.context,
        })),
      ],
    },
  },
  on: {
    SYNC: ".syncing",
  },
  states: {
    idle: {},
    syncing: {
      invoke: {
        src: "getQuestions",
        input: ({ context }) => ({
          lastSyncDate: context.lastSyncDate,
        }),
        onDone: [
          {
            target: "idle",
            actions: [
              assign(({ event }) => ({
                lastSyncDate: event.output,
                error: null,
              })),
            ],
          },
        ],
        onError: {
          target: "error",
          actions: assign(({ event }) => ({
            error: event.error as Error,
          })),
        },
      },
    },
    error: {},
  },
});
