import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function QuestionCard({ question, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.title} numberOfLines={2}>
        {question.title}
      </Text>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <MaterialCommunityIcons
            name="thumb-up-outline"
            size={16}
            color="#FF7B00"
          />
          <Text style={styles.statText}>{question.score}</Text>
        </View>
        <View style={styles.stat}>
          <MaterialCommunityIcons
            name="message-outline"
            size={16}
            color="#FF7B00"
          />
          <Text style={styles.statText}>{question.answerCount}</Text>
        </View>
        <View style={styles.stat}>
          <MaterialCommunityIcons
            name="eye-outline"
            size={16}
            color="#FF7B00"
          />
          <Text style={styles.statText}>{question.viewCount}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.ownerName}>{question.ownerName}</Text>
        <Text style={styles.date}>
          {question.creationDateAt.toLocaleDateString()}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 12,
  },
  stats: {
    flexDirection: "row",
    marginBottom: 12,
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ownerName: {
    color: "#888",
    fontSize: 12,
  },
  date: {
    color: "#666",
    fontSize: 12,
  },
});
