import { v4 } from "uuid"

export type Item<T> = {
  /** 全てのItem内で一意な値 */
  id: string;
} & T

export function toItem<T>(t: T): Item<T> {
  return { ...t, id: v4() };
}
