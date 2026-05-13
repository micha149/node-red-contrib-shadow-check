import { describe, expect, it } from "vitest";
import { applyResultToMessage } from "./create-message";

describe("applyResultToMessage", () => {
  it("sets payload to true when the window is not completely in shadow", () => {
    expect(
      applyResultToMessage(
        "sunInWindow",
        { payload: "previous", keep: true },
        false,
      ),
    ).toEqual({
      topic: "sunInWindow",
      payload: true,
      keep: true,
    });
  });

  it("sets payload to false when the window is completely in shadow", () => {
    expect(
      applyResultToMessage("sunInWindow", { payload: "previous" }, true),
    ).toEqual({
      topic: "sunInWindow",
      payload: false,
    });
  });
});
