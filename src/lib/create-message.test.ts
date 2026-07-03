import { describe, expect, it } from "vitest";
import { applyResultToMessage } from "./create-message";

describe("applyResultToMessage", () => {
  it("sets payload to true when the sun shines into the window", () => {
    expect(
      applyResultToMessage(
        "sunInWindow",
        { payload: "previous", keep: true },
        true,
      ),
    ).toEqual({
      topic: "sunInWindow",
      payload: true,
      keep: true,
    });
  });

  it("sets payload to false when the sun does not reach the window", () => {
    expect(
      applyResultToMessage("sunInWindow", { payload: "previous" }, false),
    ).toEqual({
      topic: "sunInWindow",
      payload: false,
    });
  });
});
