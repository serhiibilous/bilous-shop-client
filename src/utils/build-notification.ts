import {v4} from "uuid";

export function buildNotification(variant: string, title: string, message: string) {
  return {
    id: v4(),
    date: new Date(),
    variant: variant,
    title: title,
    message: message,
  }
}
