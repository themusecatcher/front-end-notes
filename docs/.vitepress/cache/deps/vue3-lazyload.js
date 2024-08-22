import "./chunk-4CIKH5VK.js";
import {
  onMounted,
  onUnmounted,
  ref,
  watch
} from "./chunk-5MS2HUDH.js";
import "./chunk-EQCVQC35.js";

// node_modules/.pnpm/vue3-lazyload@0.3.8_vue@3.4.34/node_modules/vue3-lazyload/dist/index.mjs
var LifecycleEnum = ((LifecycleEnum2) => {
  LifecycleEnum2["LOADING"] = "loading";
  LifecycleEnum2["LOADED"] = "loaded";
  LifecycleEnum2["ERROR"] = "error";
  return LifecycleEnum2;
})(LifecycleEnum || {});
var inBrowser = typeof window !== "undefined" && window !== null;
var hasIntersectionObserver = checkIntersectionObserver();
var isEnumerable = Object.prototype.propertyIsEnumerable;
var getSymbols = Object.getOwnPropertySymbols;
function isObject(val) {
  return typeof val === "function" || toString.call(val) === "[object Object]";
}
function isPrimitive(val) {
  return typeof val === "object" ? val === null : typeof val !== "function";
}
function isValidKey(key) {
  return key !== "__proto__" && key !== "constructor" && key !== "prototype";
}
function checkIntersectionObserver() {
  if (inBrowser && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
    if (!("isIntersecting" in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
        get() {
          return this.intersectionRatio > 0;
        }
      });
    }
    return true;
  }
  return false;
}
function assignSymbols(target, ...args) {
  if (!isObject(target))
    throw new TypeError("expected the first argument to be an object");
  if (args.length === 0 || typeof Symbol !== "function" || typeof getSymbols !== "function")
    return target;
  for (const arg of args) {
    const names = getSymbols(arg);
    for (const key of names) {
      if (isEnumerable.call(arg, key))
        target[key] = arg[key];
    }
  }
  return target;
}
function assign(target, ...args) {
  let i = 0;
  if (isPrimitive(target))
    target = args[i++];
  if (!target)
    target = {};
  for (; i < args.length; i++) {
    if (isObject(args[i])) {
      for (const key of Object.keys(args[i])) {
        if (isValidKey(key)) {
          if (isObject(target[key]) && isObject(args[i][key]))
            assign(target[key], args[i][key]);
          else
            target[key] = args[i][key];
        }
      }
      assignSymbols(target, args[i]);
    }
  }
  return target;
}
var DEFAULT_LOADING = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var DEFAULT_ERROR = "";
var DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: "0px",
  threshold: 0
};
var TIMEOUT_ID_DATA_ATTR = "data-lazy-timeout-id";
var Lazy = class {
  constructor(options) {
    this.options = {
      loading: DEFAULT_LOADING,
      error: DEFAULT_ERROR,
      observerOptions: DEFAULT_OBSERVER_OPTIONS,
      log: true,
      lifecycle: {},
      logLevel: "error"
    };
    this._images = /* @__PURE__ */ new WeakMap();
    this.config(options);
  }
  config(options = {}) {
    assign(this.options, options);
  }
  mount(el, binding) {
    if (!el)
      return;
    const { src, loading, error, lifecycle, delay } = this._valueFormatter(typeof binding === "string" ? binding : binding.value);
    this._lifecycle(LifecycleEnum.LOADING, lifecycle, el);
    el.setAttribute("src", loading || DEFAULT_LOADING);
    if (!hasIntersectionObserver) {
      this.loadImages(el, src, error, lifecycle);
      this._log(() => {
        this._logger("Not support IntersectionObserver!");
      });
    }
    this._initIntersectionObserver(el, src, error, lifecycle, delay);
  }
  update(el, binding) {
    var _a;
    if (!el)
      return;
    (_a = this._realObserver(el)) == null ? void 0 : _a.unobserve(el);
    const { src, error, lifecycle, delay } = this._valueFormatter(typeof binding === "string" ? binding : binding.value);
    this._initIntersectionObserver(el, src, error, lifecycle, delay);
  }
  unmount(el) {
    var _a;
    if (!el)
      return;
    (_a = this._realObserver(el)) == null ? void 0 : _a.unobserve(el);
    this._images.delete(el);
  }
  loadImages(el, src, error, lifecycle) {
    this._setImageSrc(el, src, error, lifecycle);
  }
  _setImageSrc(el, src, error, lifecycle) {
    if (el.tagName.toLowerCase() === "img") {
      if (src) {
        const preSrc = el.getAttribute("src");
        if (preSrc !== src)
          el.setAttribute("src", src);
      }
      this._listenImageStatus(el, () => {
        this._lifecycle(LifecycleEnum.LOADED, lifecycle, el);
      }, () => {
        var _a;
        el.onload = null;
        this._lifecycle(LifecycleEnum.ERROR, lifecycle, el);
        (_a = this._realObserver(el)) == null ? void 0 : _a.disconnect();
        if (error) {
          const newImageSrc = el.getAttribute("src");
          if (newImageSrc !== error)
            el.setAttribute("src", error);
        }
        this._log(() => {
          this._logger(`Image failed to load!And failed src was: ${src} `);
        });
      });
    } else {
      el.style.backgroundImage = `url('${src}')`;
    }
  }
  _initIntersectionObserver(el, src, error, lifecycle, delay) {
    var _a;
    const observerOptions = this.options.observerOptions;
    this._images.set(el, new IntersectionObserver((entries) => {
      Array.prototype.forEach.call(entries, (entry) => {
        if (delay && delay > 0)
          this._delayedIntersectionCallback(el, entry, delay, src, error, lifecycle);
        else
          this._intersectionCallback(el, entry, src, error, lifecycle);
      });
    }, observerOptions));
    (_a = this._realObserver(el)) == null ? void 0 : _a.observe(el);
  }
  _intersectionCallback(el, entry, src, error, lifecycle) {
    var _a;
    if (entry.isIntersecting) {
      (_a = this._realObserver(el)) == null ? void 0 : _a.unobserve(entry.target);
      this._setImageSrc(el, src, error, lifecycle);
    }
  }
  _delayedIntersectionCallback(el, entry, delay, src, error, lifecycle) {
    if (entry.isIntersecting) {
      if (entry.target.hasAttribute(TIMEOUT_ID_DATA_ATTR))
        return;
      const timeoutId = setTimeout(() => {
        this._intersectionCallback(el, entry, src, error, lifecycle);
        entry.target.removeAttribute(TIMEOUT_ID_DATA_ATTR);
      }, delay);
      entry.target.setAttribute(TIMEOUT_ID_DATA_ATTR, String(timeoutId));
    } else {
      if (entry.target.hasAttribute(TIMEOUT_ID_DATA_ATTR)) {
        clearTimeout(Number(entry.target.getAttribute(TIMEOUT_ID_DATA_ATTR)));
        entry.target.removeAttribute(TIMEOUT_ID_DATA_ATTR);
      }
    }
  }
  _listenImageStatus(image, success, error) {
    image.onload = success;
    image.onerror = error;
  }
  _valueFormatter(value) {
    let src = value;
    let loading = this.options.loading;
    let error = this.options.error;
    let lifecycle = this.options.lifecycle;
    let delay = this.options.delay;
    if (isObject(value)) {
      src = value.src;
      loading = value.loading || this.options.loading;
      error = value.error || this.options.error;
      lifecycle = value.lifecycle || this.options.lifecycle;
      delay = value.delay || this.options.delay;
    }
    return {
      src,
      loading,
      error,
      lifecycle,
      delay
    };
  }
  _log(callback) {
    if (this.options.log)
      callback();
  }
  _lifecycle(life, lifecycle, el) {
    switch (life) {
      case LifecycleEnum.LOADING:
        el == null ? void 0 : el.setAttribute("lazy", LifecycleEnum.LOADING);
        if (lifecycle == null ? void 0 : lifecycle.loading)
          lifecycle.loading(el);
        break;
      case LifecycleEnum.LOADED:
        el == null ? void 0 : el.setAttribute("lazy", LifecycleEnum.LOADED);
        if (lifecycle == null ? void 0 : lifecycle.loaded)
          lifecycle.loaded(el);
        break;
      case LifecycleEnum.ERROR:
        el == null ? void 0 : el.setAttribute("lazy", LifecycleEnum.ERROR);
        if (lifecycle == null ? void 0 : lifecycle.error)
          lifecycle.error(el);
        break;
    }
  }
  _realObserver(el) {
    return this._images.get(el);
  }
  _logger(message, ...optionalParams) {
    let log = console.error;
    switch (this.options.logLevel) {
      case "error":
        log = console.error;
        break;
      case "warn":
        log = console.warn;
        break;
      case "info":
        log = console.info;
        break;
      case "debug":
        log = console.debug;
        break;
    }
    log(message, optionalParams);
  }
};
function useLazyload(src, options) {
  const lazyRef = ref(null);
  const lazy = new Lazy(options);
  onMounted(() => {
    lazyRef.value && lazy.mount(lazyRef.value, src.value);
  });
  onUnmounted(() => {
    lazyRef.value && lazy.unmount(lazyRef.value);
  });
  watch(src, (newVal) => {
    if (src.value)
      lazy.update(lazyRef.value, newVal);
  });
  return lazyRef;
}
var index = {
  install(Vue, options) {
    const lazy = new Lazy(options);
    Vue.config.globalProperties.$Lazyload = lazy;
    Vue.provide("Lazyload", lazy);
    Vue.directive("lazy", {
      mounted: lazy.mount.bind(lazy),
      updated: lazy.update.bind(lazy),
      unmounted: lazy.unmount.bind(lazy)
    });
  }
};
export {
  index as default,
  useLazyload
};
//# sourceMappingURL=vue3-lazyload.js.map
