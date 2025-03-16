import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useMachine, useSelector } from "@xstate/react";
import { syncMachine } from "../../machines/syncMachine";
import QuestionCard from "../../components/QuestionCard";
import Question from "@/model/Question";
import { SafeAreaView } from "react-native-safe-area-context";

function QuestionsScreen() {
  const router = useRouter();
  const [state, send, actorRef] = useMachine(syncMachine);
  const questions = useSelector(
    actorRef,
    (machine) => machine.context.questions
  );

  const onRefresh = () => {
    send({
      type: "SYNC",
    });
  };

  const renderItem = ({ item }: ListRenderItemInfo<Question>) => (
    <QuestionCard
      question={item}
      onPress={() =>
        router.push({
          pathname: "/question/[id]",
          params: { id: item.id },
        })
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "web" ? (
        <TouchableOpacity onPress={onRefresh}>
          <Text
            style={{
              color: "white",
              fontSize: 24,
            }}
          >
            Press here to update
          </Text>
        </TouchableOpacity>
      ) : null}
      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={state.matches("syncing")}
            onRefresh={onRefresh}
            tintColor="#FF7B00"
          />
        }
        ListEmptyComponent={
          Platform.OS !== "web" ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Pull to refresh and load questions
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
});

export default QuestionsScreen;
