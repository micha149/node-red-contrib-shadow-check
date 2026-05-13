type Message = {
  topic?: string;
  payload: unknown;
  [key: string]: unknown;
};

export const applyResultToMessage = (
  topic: string,
  msg: Message,
  windowCompletelyInShadow: boolean,
): Message => ({
  ...msg,
  topic,
  payload: !windowCompletelyInShadow,
});
