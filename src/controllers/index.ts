import passport from "./apiAuth.controller";

export default passport;

export { default as createCelebrant } from "./celebrant/create-celebrant";
export { default as allCelebrants } from "./celebrant/get-all-celebrants";
export { default as getACelebrant } from "./celebrant/get-a-celebrant";
