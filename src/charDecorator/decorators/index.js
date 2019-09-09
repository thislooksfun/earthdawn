// Import manually so we can manually define order
import staticDecorators from "./static";
import effects from "./effects";
import attributes from "./attributes";
import dynamicDecorators from "./dynamic";

// Manually define order
export default [
  // Static decorators have no prereqs
  ...staticDecorators,

  // Effects and attributes require static decorators to be loaded first
  effects,
  attributes,

  // Dynamic decorators require effects, attributes, and static decorators
  ...dynamicDecorators,
];
