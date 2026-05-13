const NODE_TYPE = "shadow-check";
const DEFAULT_TOPIC = "sunInWindow";

type EditorNodeProperties = {
  name: string;
};

type EditorRed = {
  nodes: {
    registerType(type: string, definition: unknown): void;
  };
  validators: {
    number(): (value: unknown) => boolean;
  };
};

declare const RED: EditorRed;

RED.nodes.registerType(NODE_TYPE, {
  category: "advanced",
  color: "#ffcc66",
  defaults: {
    name: { value: "" },
    topic: { value: DEFAULT_TOPIC },
    width: { value: "", required: true, validate: RED.validators.number() },
    height: { value: "", required: true, validate: RED.validators.number() },
    azimuth: { value: 0, required: true, validate: RED.validators.number() },
    inset: { value: 0, required: true, validate: RED.validators.number() },
    overhang: { value: 0, required: true, validate: RED.validators.number() },
    overhangOffsetLeft: {
      value: 0,
      required: true,
      validate: RED.validators.number(),
    },
    overhangOffsetRight: {
      value: 0,
      required: true,
      validate: RED.validators.number(),
    },
    overhangOffsetTop: {
      value: 0,
      required: true,
      validate: RED.validators.number(),
    },
  },
  inputs: 1,
  outputs: 1,
  icon: "sunInWindow.png",
  paletteLabel: "shadow check",
  label: function (this: EditorNodeProperties): string {
    return this.name || "shadow check";
  },
  labelStyle: function (this: EditorNodeProperties): string {
    return this.name ? "node_label_italic" : "";
  },
  inputLabels: "sun position",
  outputLabels: "sun shines into window",
});
