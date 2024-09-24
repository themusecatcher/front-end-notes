import {
  init_vue_runtime_esm_bundler
} from "./chunk-3MDCYLEG.js";

// node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.5.3_async-validator@4.2.5_less@4.2.0_postcss@8.4.47__sk2y4zxk3mrpzfeq5qargxf4ru/node_modules/vitepress/lib/vue-demi.mjs
init_vue_runtime_esm_bundler();
init_vue_runtime_esm_bundler();
var isVue2 = false;
var isVue3 = true;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}

export {
  isVue2,
  isVue3,
  set,
  del
};
/*! Bundled license information:

vitepress/lib/vue-demi.mjs:
  (**
   * vue-demi v0.14.7
   * Copyright (c) 2020-present, Anthony Fu
   * @license MIT
   *)
*/
//# sourceMappingURL=chunk-4ZXLWKAY.js.map