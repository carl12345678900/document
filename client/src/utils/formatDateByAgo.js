import { formatDistanceToNowStrict } from "date-fns";

export function formatDateByAgo(date) {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
  });
}
