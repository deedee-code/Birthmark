import passport from "./apiAuth.controller";

export default passport;

export { default as createCelebrant } from "./celebrants/create";
export { default as allCelebrants } from "./celebrants/get-all";
export { default as getACelebrant } from "./celebrants/get";
export { default as updateCelebrant } from "./celebrants/update";
export { default as deleteCelebrant } from "./celebrants/delete";
