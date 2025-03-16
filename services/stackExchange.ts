const API_BASE = "https://api.stackexchange.com/2.3";
const SITE = "stackoverflow";

export async function fetchQuestions(fromDate?: string | null, page = 1) {
  const params = new URLSearchParams({
    site: SITE,
    order: "desc",
    sort: "activity",
    filter: "withbody",
    pagesize: "100",
    page: page.toString(),
    ...(fromDate
      ? { fromdate: Math.floor(new Date(fromDate).getTime() / 1000).toString() }
      : {}),
  });

  const response = await fetch(`${API_BASE}/questions?${params}`);
  const data = await response.json();

  return data.items.map((item: any) => ({
    title: item.title,
    body: item.body,
    score: item.score,
    viewCount: item.view_count,
    answerCount: item.answer_count,
    creationDateAt: item.creation_date * 1000,
    lastActivityDateAt: item.last_activity_date * 1000,
    stackExchangeId: item.question_id.toString(),
    ownerName: item.owner?.display_name || "Unknown",
    ownerAvatar: item.owner?.profile_image || "",
    tags: item.tags.join(", "),
  }));
}
