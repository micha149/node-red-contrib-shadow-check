import * as v from "valibot";
import { calculateShadow } from "../../lib/calculate-shadow";
import { checkIfWindowInShadow } from "../../lib/check-if-window-in-shadow";
import { applyResultToMessage } from "../../lib/create-message";
import { createSunPositionSchema } from "../../lib/payload-schema";
import {
  configSchema,
  type ShadowCheckNodeConfig,
  type ShadowCheckNodeRawConfig,
} from "./config-schema";

const NODE_TYPE = "shadow-check";

type ShadowCheckMessage = {
  topic?: string;
  payload: unknown;
  [key: string]: unknown;
};

type NodeSend = (msg: unknown) => void;
type NodeDone = (error?: Error) => void;

type NodeRedNode = {
  on(
    event: "input",
    listener: (msg: unknown, send?: NodeSend, done?: NodeDone) => void,
  ): void;
  send(msg: unknown): void;
  error(error: Error, msg?: unknown): void;
};

type NodeRedRuntime = {
  nodes: {
    createNode(node: NodeRedNode, config: ShadowCheckNodeRawConfig): void;
    registerType(
      type: string,
      constructor: new (config: ShadowCheckNodeRawConfig) => NodeRedNode,
    ): void;
  };
};

const isShadowCheckMessage = (msg: unknown): msg is ShadowCheckMessage =>
  !!msg && typeof msg === "object" && "payload" in msg;

const nodeInit = (RED: NodeRedRuntime): void => {
  function ShadowCheck(
    this: NodeRedNode,
    rawConfig: ShadowCheckNodeRawConfig,
  ): void {
    RED.nodes.createNode(this, rawConfig);

    const config: ShadowCheckNodeConfig = v.parse(configSchema, rawConfig);
    const { width, height, inset, azimuth, overhang, topic } = config;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const overhangLeft = config.overhangOffsetLeft;
    const overhangRight = config.overhangOffsetRight;
    const overhangTop = config.overhangOffsetTop;
    const sunPositionSchema = createSunPositionSchema(azimuth);

    this.on("input", (msg: unknown, send?: NodeSend, done?: NodeDone): void => {
      const nodeSend = send || this.send.bind(this);

      try {
        if (!isShadowCheckMessage(msg)) {
          throw new Error(
            "Expected a Node-RED message with a payload property",
          );
        }

        const sunPos = v.parse(sunPositionSchema, msg.payload);
        const shadow = calculateShadow(
          overhang + inset,
          overhangLeft + halfWidth,
          overhangRight + halfWidth,
          overhangTop + halfHeight,
          sunPos,
        );
        const windowCompletelyInShadow = checkIfWindowInShadow(
          width,
          height,
          shadow,
        );

        nodeSend(applyResultToMessage(topic, msg, windowCompletelyInShadow));

        if (done) {
          done();
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));

        if (done) {
          done(err);
        } else {
          this.error(err, msg);
        }
      }
    });
  }

  RED.nodes.registerType(
    NODE_TYPE,
    ShadowCheck as unknown as new (
      config: ShadowCheckNodeRawConfig,
    ) => NodeRedNode,
  );
};

export = nodeInit;
