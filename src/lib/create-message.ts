type Message = {
  topic?: string;
  payload: unknown;
  [key: string]: unknown;
};

export const applyResultToMessage = (
  topic: string,
  msg: Message,
  sunInWindow: boolean,
): Message => ({
  ...msg,
  topic,
  payload: sunInWindow,
});
