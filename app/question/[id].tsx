import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
  LogBox,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Q } from "@nozbe/watermelondb";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fromPromise } from "xstate";
import { database } from "@/database";
import Question from "@/model/Question";
import { useActor } from "@xstate/react";
import RenderHTML from "react-native-render-html";

const questionActor = fromPromise(
  async ({ input }: { input: { id: string } }) =>
    database.get<Question>("questions").query(Q.where("id", input.id))
);

LogBox.ignoreAllLogs();

function QuestionScreen() {
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams();
  const [state] = useActor(questionActor, {
    input: { id: id as string },
  });

  if (state.status === "active") {
    return (
      <View style={styles.content}>
        <ActivityIndicator />
      </View>
    );
  }

  if (state.status !== "done") {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>Ocorreu um erro</Text>
      </View>
    );
  }

  const question = state.output[0];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{question.title}</Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="thumb-up" size={16} color="#FF7B00" />
            <Text style={styles.statText}>{question.score}</Text>
          </View>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="message" size={16} color="#FF7B00" />
            <Text style={styles.statText}>{question.answerCount}</Text>
          </View>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="eye" size={16} color="#FF7B00" />
            <Text style={styles.statText}>{question.viewCount}</Text>
          </View>
        </View>
        <View style={styles.tags}>
          {question.tags.split(",").map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.body}>
          <RenderHTML
            baseStyle={{
              color: "white",
            }}
            contentWidth={width}
            source={{ html: question.body }}
          />
        </View>
        <View style={styles.author}>
          <Text style={styles.authorName}>Asked by {question.ownerName}</Text>
          <Text style={styles.date}>
            {question.creationDateAt.toLocaleDateString()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  content: {
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 16,
  },
  stats: {
    flexDirection: "row",
    marginBottom: 16,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    color: "#888",
    marginLeft: 4,
    fontSize: 14,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#FF7B00",
    fontSize: 12,
  },
  body: {
    marginBottom: 16,
  },
  bodyText: {
    color: "#CCC",
    fontSize: 16,
    lineHeight: 24,
  },
  author: {
    borderTopWidth: 1,
    borderTopColor: "#2C2C2C",
    paddingTop: 16,
  },
  authorName: {
    color: "#888",
    fontSize: 14,
  },
  date: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
  },
  errorText: {
    color: "#FF7B00",
    fontSize: 16,
    textAlign: "center",
    marginTop: 60,
  },
});

export default QuestionScreen;
