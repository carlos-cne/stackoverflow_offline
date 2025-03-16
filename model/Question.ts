import { Model } from "@nozbe/watermelondb";
import { date, field } from "@nozbe/watermelondb/decorators";

export default class Question extends Model {
  static table = "questions";

  @field("title") title!: string;
  @field("body") body!: string;
  @field("score") score!: number;
  @field("view_count") viewCount!: number;
  @field("answer_count") answerCount!: number;
  @date("creation_date_at") creationDateAt!: number;
  @date("last_activity_date_at") lastActivityDateAt!: number;
  @field("stack_exchange_id") stackExchangeId!: string;
  @field("owner_name") ownerName!: string;
  @field("owner_avatar") ownerAvatar!: string;
  @field("tags") tags!: string;
}
