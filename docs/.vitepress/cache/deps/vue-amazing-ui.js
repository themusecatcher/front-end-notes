import {
  TransitionPresets,
  isClient,
  toRef as toRef2,
  useTransition
} from "./chunk-WQF7SX5B.js";
import "./chunk-D4PKXASA.js";
import {
  Fragment,
  Teleport,
  Transition,
  TransitionGroup,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createStaticVNode,
  createTextVNode,
  createVNode,
  defineComponent,
  getCurrentScope,
  guardReactiveProps,
  h,
  isRef,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onScopeDispose,
  onUnmounted,
  onUpdated,
  openBlock,
  popScopeId,
  provide,
  pushScopeId,
  reactive,
  ref,
  render,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  shallowRef,
  toDisplayString,
  toRef,
  unref,
  useSlots,
  vModelDynamic,
  vModelText,
  vShow,
  watch,
  watchEffect,
  watchPostEffect,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-PPTVPZ73.js";
import {
  __commonJS,
  __publicField,
  __toESM
} from "./chunk-EQCVQC35.js";

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/can-promise.js"(exports, module) {
    module.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/utils.js"(exports) {
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version) {
      if (!version) throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
    };
    exports.getBCHDigit = function(data) {
      let digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    exports.L = { bit: 1 };
    exports.M = { bit: 0 };
    exports.Q = { bit: 3 };
    exports.H = { bit: 2 };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports.isValid = function isValid2(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module.exports = BitBuffer;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved) this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module.exports = BitMatrix;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version) {
      if (version === 1) return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i = 1; i < posCount - 1; i++) {
        positions[i] = positions[i - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i = 0; i < posLength; i++) {
        for (let j = 0; j < posLength; j++) {
          if (i === 0 && j === 0 || // top-left
          i === 0 && j === posLength - 1 || // bottom-left
          i === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid2(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data) {
      const size = data.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module2 = data.get(row, col);
          if (module2 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module2;
            sameCountCol = 1;
          }
          module2 = data.get(col, row);
          if (module2 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module2;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0) points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data) {
      const size = data.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
      const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask(pattern, data) {
      const size = data.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data.isReserved(row, col)) continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data, setupFormatFunc) {
      const numPatterns = Object.keys(exports.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p = 0; p < numPatterns; p++) {
        setupFormatFunc(p);
        exports.applyMask(p, data);
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/galois-field.js"(exports) {
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x = 1;
      for (let i = 0; i < 255; i++) {
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1;
        if (x & 256) {
          x ^= 285;
        }
      }
      for (let i = 255; i < 512; i++) {
        EXP_TABLE[i] = EXP_TABLE[i - 255];
      }
    })();
    exports.log = function log(n) {
      if (n < 1) throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports.mul = function mul(x, y) {
      if (x === 0 || y === 0) return 0;
      return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/polynomial.js"(exports) {
    var GF = require_galois_field();
    exports.mul = function mul(p12, p22) {
      const coeff = new Uint8Array(p12.length + p22.length - 1);
      for (let i = 0; i < p12.length; i++) {
        for (let j = 0; j < p22.length; j++) {
          coeff[i + j] ^= GF.mul(p12[i], p22[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i = 0; i < divisor.length; i++) {
          result[i] ^= GF.mul(divisor[i], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0) offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i = 0; i < degree; i++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
      }
      return poly;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree) this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data.length + this.degree);
      paddedData.set(data);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module.exports = ReedSolomonEncoder;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/version-check.js"(exports) {
    exports.isValid = function isValid2(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/regex.js"(exports) {
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/mode.js"(exports) {
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10) return mode.ccBits[0];
      else if (version < 27) return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr)) return exports.KANJI;
      else return exports.BYTE;
    };
    exports.toString = function toString(mode) {
      if (mode && mode.id) return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid2(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/version.js"(exports) {
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined") mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED) return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d = version << 12;
      while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
      }
      return version << 12 | d;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/format-info.js"(exports) {
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data = errorCorrectionLevel.bit << 3 | mask;
      let d = data << 10;
      while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
      }
      return (data << 10 | d) ^ G15_MASK;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i, group, value;
      for (i = 0; i + 3 <= this.data.length; i += 3) {
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i;
      if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module.exports = NumericData;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i;
      for (i = 0; i + 2 <= this.data.length; i += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
      }
    };
    module.exports = AlphanumericData;
  }
});

// node_modules/.pnpm/encode-utf8@1.0.3/node_modules/encode-utf8/index.js
var require_encode_utf8 = __commonJS({
  "node_modules/.pnpm/encode-utf8@1.0.3/node_modules/encode-utf8/index.js"(exports, module) {
    "use strict";
    module.exports = function encodeUtf8(input) {
      var result = [];
      var size = input.length;
      for (var index = 0; index < size; index++) {
        var point = input.charCodeAt(index);
        if (point >= 55296 && point <= 56319 && size > index + 1) {
          var second = input.charCodeAt(index + 1);
          if (second >= 56320 && second <= 57343) {
            point = (point - 55296) * 1024 + second - 56320 + 65536;
            index += 1;
          }
        }
        if (point < 128) {
          result.push(point);
          continue;
        }
        if (point < 2048) {
          result.push(point >> 6 | 192);
          result.push(point & 63 | 128);
          continue;
        }
        if (point < 55296 || point >= 57344 && point < 65536) {
          result.push(point >> 12 | 224);
          result.push(point >> 6 & 63 | 128);
          result.push(point & 63 | 128);
          continue;
        }
        if (point >= 65536 && point <= 1114111) {
          result.push(point >> 18 | 240);
          result.push(point >> 12 & 63 | 128);
          result.push(point >> 6 & 63 | 128);
          result.push(point & 63 | 128);
          continue;
        }
        result.push(239, 191, 189);
      }
      return new Uint8Array(result).buffer;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
    var encodeUtf8 = require_encode_utf8();
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        data = encodeUtf8(data);
      }
      this.data = new Uint8Array(data);
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i = 0, l = this.data.length; i < l; i++) {
        bitBuffer.put(this.data[i], 8);
      }
    };
    module.exports = ByteData;
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i;
      for (i = 0; i < this.data.length; i++) {
        let value = Utils.toSJIS(this.data[i]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module.exports = KanjiData;
  }
});

// node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
  "node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js"(exports, module) {
    "use strict";
    var dijkstra = {
      single_source_shortest_paths: function(graph, s, d) {
        var predecessors = {};
        var costs = {};
        costs[s] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u;
              }
            }
          }
        }
        if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
          var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while (u) {
          nodes.push(u);
          predecessor = predecessors[u];
          u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(
          predecessors,
          d
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T = dijkstra.PriorityQueue, t = {}, key;
          opts = opts || {};
          for (key in T) {
            if (T.hasOwnProperty(key)) {
              t[key] = T[key];
            }
          }
          t.queue = [];
          t.sorter = opts.sorter || T.default_sorter;
          return t;
        },
        default_sorter: function(a, b) {
          return a.cost - b.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(value, cost) {
          var item = { value, cost };
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    if (typeof module !== "undefined") {
      module.exports = dijkstra;
    }
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/segments.js"(exports) {
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s22) {
        return s1.index - s22.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i = 0; i < nodes.length; i++) {
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i + j;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (let n = 0; n < prevNodeIds.length; n++) {
            const prevNodeId = prevNodeIds[n];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n = 0; n < prevNodeIds.length; n++) {
        graph[prevNodeIds[n]].end = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString(data, version) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i = 1; i < path.length - 1; i++) {
        optimizedSegs.push(graph.table[path[i]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data) {
      return exports.fromArray(
        getSegmentsFromString(data, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/qrcode.js"(exports) {
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r) continue;
          for (let c = -1; c <= 7; c++) {
            if (col + c <= -1 || size <= col + c) continue;
            if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r = 8; r < size - 8; r++) {
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i = 0; i < 18; i++) {
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i, mod;
      for (i = 0; i < 15; i++) {
        mod = (bits >> i & 1) === 1;
        if (i < 6) {
          matrix.set(i, 8, mod, true);
        } else if (i < 8) {
          matrix.set(i + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i, 8, mod, true);
        }
        if (i < 8) {
          matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
          matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (!matrix.isReserved(row, col - c)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i = 0; i < remainingByte; i++) {
        buffer.put(i % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs2 = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b = 0; b < ecTotalBlocks; b++) {
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b] = buffer.slice(offset, offset + dataSize);
        ecData[b] = rs2.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i, r;
      for (i = 0; i < maxDataSize; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i < dcData[r].length) {
            data[index++] = dcData[r][i];
          }
        }
      }
      for (i = 0; i < ecCount; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i];
        }
      }
      return data;
    }
    function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/utils.js"(exports) {
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
          return [c, c];
        }));
      }
      if (hexCode.length === 6) hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions(options) {
      if (!options) options = {};
      if (!options.color) options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr2, opts) {
      const size = qr2.modules.size;
      const data = qr2.modules.data;
      const scale = exports.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i = 0; i < symbolSize; i++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas, size) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style) canvas.style = {};
      canvas.height = size;
      canvas.width = size;
      canvas.style.height = size + "px";
      canvas.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render2(qrData, canvas, options) {
      let opts = options;
      let canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image = ctx.createImageData(size, size);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts) opts = {};
      const canvasEl = exports.render(qrData, canvas, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x, y) {
      let str = cmd + x;
      if (typeof y !== "undefined") str += " " + y;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i = 0; i < data.length; i++) {
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
          lineLength++;
          if (!(i > 0 && col > 0 && data[i - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render2(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/browser.js"(exports) {
    var canPromise = require_can_promise();
    var QRCode2 = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode2.create(text, opts);
            resolve(renderFunc(data, canvas, opts));
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode2.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e) {
        cb(e);
      }
    }
    exports.create = QRCode2.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/toDate.mjs
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
    return new argument.constructor(+argument);
  } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
    return new Date(argument);
  } else {
    return /* @__PURE__ */ new Date(NaN);
  }
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/constructFrom.mjs
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value);
  } else {
    return new Date(value);
  }
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addDays.mjs
function addDays(date, amount) {
  const _date = toDate(date);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  _date.setDate(_date.getDate() + amount);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addMonths.mjs
function addMonths(date, amount) {
  const _date = toDate(date);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  const dayOfMonth = _date.getDate();
  const endOfDesiredMonth = constructFrom(date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth
    );
    return _date;
  }
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/add.mjs
function add(date, duration) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = duration;
  const _date = toDate(date);
  const dateWithMonths = months || years ? addMonths(_date, months + years * 12) : _date;
  const dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
  const minutesToAdd = minutes + hours * 60;
  const secondsToAdd = seconds + minutesToAdd * 60;
  const msToAdd = secondsToAdd * 1e3;
  const finalDate = constructFrom(date, dateWithDays.getTime() + msToAdd);
  return finalDate;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addMilliseconds.mjs
function addMilliseconds(date, amount) {
  const timestamp = +toDate(date);
  return constructFrom(date, timestamp + amount);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/constants.mjs
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var minTime = -maxTime;
var millisecondsInWeek = 6048e5;
var millisecondsInDay = 864e5;
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var millisecondsInSecond = 1e3;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addHours.mjs
function addHours(date, amount) {
  return addMilliseconds(date, amount * millisecondsInHour);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/defaultOptions.mjs
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfWeek.mjs
function startOfWeek(date, options) {
  var _a3, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a3 = options == null ? void 0 : options.locale) == null ? void 0 : _a3.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfISOWeek.mjs
function startOfISOWeek(date) {
  return startOfWeek(date, { weekStartsOn: 1 });
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getISOWeekYear.mjs
function getISOWeekYear(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfDay.mjs
function startOfDay(date) {
  const _date = toDate(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/differenceInCalendarDays.mjs
function differenceInCalendarDays(dateLeft, dateRight) {
  const startOfDayLeft = startOfDay(dateLeft);
  const startOfDayRight = startOfDay(dateRight);
  const timestampLeft = +startOfDayLeft - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  const timestampRight = +startOfDayRight - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / millisecondsInDay);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfISOWeekYear.mjs
function startOfISOWeekYear(date) {
  const year = getISOWeekYear(date);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addQuarters.mjs
function addQuarters(date, amount) {
  const months = amount * 3;
  return addMonths(date, months);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addYears.mjs
function addYears(date, amount) {
  return addMonths(date, amount * 12);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/compareAsc.mjs
function compareAsc(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const diff = _dateLeft.getTime() - _dateRight.getTime();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return diff;
  }
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isDate.mjs
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isValid.mjs
function isValid(date) {
  if (!isDate(date) && typeof date !== "number") {
    return false;
  }
  const _date = toDate(date);
  return !isNaN(Number(_date));
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getQuarter.mjs
function getQuarter(date) {
  const _date = toDate(date);
  const quarter = Math.trunc(_date.getMonth() / 3) + 1;
  return quarter;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/differenceInCalendarYears.mjs
function differenceInCalendarYears(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  return _dateLeft.getFullYear() - _dateRight.getFullYear();
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/differenceInYears.mjs
function differenceInYears(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const sign = compareAsc(_dateLeft, _dateRight);
  const difference = Math.abs(differenceInCalendarYears(_dateLeft, _dateRight));
  _dateLeft.setFullYear(1584);
  _dateRight.setFullYear(1584);
  const isLastYearNotFull = compareAsc(_dateLeft, _dateRight) === -sign;
  const result = sign * (difference - +isLastYearNotFull);
  return result === 0 ? 0 : result;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/eachDayOfInterval.mjs
function eachDayOfInterval(interval, options) {
  const startDate = toDate(interval.start);
  const endDate = toDate(interval.end);
  let reversed = +startDate > +endDate;
  const endTime = reversed ? +startDate : +endDate;
  const currentDate = reversed ? endDate : startDate;
  currentDate.setHours(0, 0, 0, 0);
  let step = (options == null ? void 0 : options.step) ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }
  const dates = [];
  while (+currentDate <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }
  return reversed ? dates.reverse() : dates;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfQuarter.mjs
function startOfQuarter(date) {
  const _date = toDate(date);
  const currentMonth = _date.getMonth();
  const month = currentMonth - currentMonth % 3;
  _date.setMonth(month, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/eachQuarterOfInterval.mjs
function eachQuarterOfInterval(interval, options) {
  const startDate = toDate(interval.start);
  const endDate = toDate(interval.end);
  let reversed = +startDate > +endDate;
  const endTime = reversed ? +startOfQuarter(startDate) : +startOfQuarter(endDate);
  let currentDate = reversed ? startOfQuarter(endDate) : startOfQuarter(startDate);
  let step = (options == null ? void 0 : options.step) ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }
  const dates = [];
  while (+currentDate <= endTime) {
    dates.push(toDate(currentDate));
    currentDate = addQuarters(currentDate, step);
  }
  return reversed ? dates.reverse() : dates;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfMonth.mjs
function startOfMonth(date) {
  const _date = toDate(date);
  _date.setDate(1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/endOfYear.mjs
function endOfYear(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  _date.setFullYear(year + 1, 0, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfYear.mjs
function startOfYear(date) {
  const cleanDate = toDate(date);
  const _date = constructFrom(date, 0);
  _date.setFullYear(cleanDate.getFullYear(), 0, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/endOfWeek.mjs
function endOfWeek(date, options) {
  var _a3, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a3 = options == null ? void 0 : options.locale) == null ? void 0 : _a3.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/endOfQuarter.mjs
function endOfQuarter(date) {
  const _date = toDate(date);
  const currentMonth = _date.getMonth();
  const month = currentMonth - currentMonth % 3 + 3;
  _date.setMonth(month, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.mjs
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options == null ? void 0 : options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.mjs
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/en-US/_lib/formatLong.mjs
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/en-US/_lib/formatRelative.mjs
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.mjs
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = (options == null ? void 0 : options.context) ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/en-US/_lib/localize.mjs
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/_lib/buildMatchFn.mjs
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.mjs
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/en-US/_lib/match.mjs
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/locale/en-US.mjs
var enUS = {
  code: "en-US",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getDayOfYear.mjs
function getDayOfYear(date) {
  const _date = toDate(date);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getISOWeek.mjs
function getISOWeek(date) {
  const _date = toDate(date);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getWeekYear.mjs
function getWeekYear(date, options) {
  var _a3, _b, _c, _d;
  const _date = toDate(date);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a3 = options == null ? void 0 : options.locale) == null ? void 0 : _a3.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const firstWeekOfNextYear = constructFrom(date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/startOfWeekYear.mjs
function startOfWeekYear(date, options) {
  var _a3, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a3 = options == null ? void 0 : options.locale) == null ? void 0 : _a3.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getWeek.mjs
function getWeek(date, options) {
  const _date = toDate(date);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/addLeadingZeros.mjs
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/format/lightFormatters.mjs
var lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/format/formatters.mjs
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  // Era
  G: function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(date.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    const timestamp = date.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/format/longFormatters.mjs
var dateLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
};
var timeLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
};
var dateTimeLongFormatter = (pattern, formatLong2) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/_lib/protectedTokens.mjs
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/format.mjs
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  var _a3, _b, _c, _d, _e2, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a3 = options == null ? void 0 : options.locale) == null ? void 0 : _a3.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_f = (_e2 = options == null ? void 0 : options.locale) == null ? void 0 : _e2.options) == null ? void 0 : _f.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  const originalDate = toDate(date);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken) return part.value;
    const token = part.value;
    if (!(options == null ? void 0 : options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token) || !(options == null ? void 0 : options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getDay.mjs
function getDay(date) {
  const _date = toDate(date);
  const day = _date.getDay();
  return day;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getDaysInMonth.mjs
function getDaysInMonth(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const monthIndex = _date.getMonth();
  const lastDayOfMonth2 = constructFrom(date, 0);
  lastDayOfMonth2.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth2.setHours(0, 0, 0, 0);
  return lastDayOfMonth2.getDate();
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getDefaultOptions.mjs
function getDefaultOptions2() {
  return Object.assign({}, getDefaultOptions());
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getHours.mjs
function getHours(date) {
  const _date = toDate(date);
  const hours = _date.getHours();
  return hours;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getISODay.mjs
function getISODay(date) {
  const _date = toDate(date);
  let day = _date.getDay();
  if (day === 0) {
    day = 7;
  }
  return day;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getMinutes.mjs
function getMinutes(date) {
  const _date = toDate(date);
  const minutes = _date.getMinutes();
  return minutes;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getMonth.mjs
function getMonth(date) {
  const _date = toDate(date);
  const month = _date.getMonth();
  return month;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getSeconds.mjs
function getSeconds(date) {
  const _date = toDate(date);
  const seconds = _date.getSeconds();
  return seconds;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/getYear.mjs
function getYear(date) {
  return toDate(date).getFullYear();
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isAfter.mjs
function isAfter(date, dateToCompare) {
  const _date = toDate(date);
  const _dateToCompare = toDate(dateToCompare);
  return _date.getTime() > _dateToCompare.getTime();
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isBefore.mjs
function isBefore(date, dateToCompare) {
  const _date = toDate(date);
  const _dateToCompare = toDate(dateToCompare);
  return +_date < +_dateToCompare;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isEqual.mjs
function isEqual(leftDate, rightDate) {
  const _dateLeft = toDate(leftDate);
  const _dateRight = toDate(rightDate);
  return +_dateLeft === +_dateRight;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/transpose.mjs
function transpose(fromDate, constructor) {
  const date = constructor instanceof Date ? constructFrom(constructor, 0) : new constructor(0);
  date.setFullYear(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate()
  );
  date.setHours(
    fromDate.getHours(),
    fromDate.getMinutes(),
    fromDate.getSeconds(),
    fromDate.getMilliseconds()
  );
  return date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/Setter.mjs
var TIMEZONE_UNIT_PRIORITY = 10;
var Setter = class {
  constructor() {
    __publicField(this, "subPriority", 0);
  }
  validate(_utcDate, _options) {
    return true;
  }
};
var ValueSetter = class extends Setter {
  constructor(value, validateValue, setValue, priority, subPriority) {
    super();
    this.value = value;
    this.validateValue = validateValue;
    this.setValue = setValue;
    this.priority = priority;
    if (subPriority) {
      this.subPriority = subPriority;
    }
  }
  validate(date, options) {
    return this.validateValue(date, this.value, options);
  }
  set(date, flags, options) {
    return this.setValue(date, flags, this.value, options);
  }
};
var DateToSystemTimezoneSetter = class extends Setter {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", TIMEZONE_UNIT_PRIORITY);
    __publicField(this, "subPriority", -1);
  }
  set(date, flags) {
    if (flags.timestampIsSet) return date;
    return constructFrom(date, transpose(date, Date));
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/Parser.mjs
var Parser = class {
  run(dateString, token, match2, options) {
    const result = this.parse(dateString, token, match2, options);
    if (!result) {
      return null;
    }
    return {
      setter: new ValueSetter(
        result.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: result.rest
    };
  }
  validate(_utcDate, _value, _options) {
    return true;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/EraParser.mjs
var EraParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 140);
    __publicField(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
      case "GGGGG":
        return match2.era(dateString, { width: "narrow" });
      case "GGGG":
      default:
        return match2.era(dateString, { width: "wide" }) || match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
    }
  }
  set(date, flags, value) {
    flags.era = value;
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/constants.mjs
var numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
};
var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/utils.mjs
function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }
  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest
  };
}
function parseNumericPattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  const sign = matchResult[1] === "+" ? 1 : -1;
  const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}
function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}
function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}
function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  const isCommonEra = currentYear > 0;
  const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  let result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    const rangeEnd = absCurrentYear + 50;
    const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
    const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/YearParser.mjs
var YearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "yy"
    });
    switch (token) {
      case "y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "yo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "year"
          }),
          valueCallback
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }
  set(date, flags, value) {
    const currentYear = date.getFullYear();
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear
      );
      date.setFullYear(normalizedTwoDigitYear, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
    const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.mjs
var LocalWeekYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "YY"
    });
    switch (token) {
      case "Y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "Yo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "year"
          }),
          valueCallback
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }
  set(date, flags, value, options) {
    const currentYear = getWeekYear(date, options);
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear
      );
      date.setFullYear(
        normalizedTwoDigitYear,
        0,
        options.firstWeekContainsDate
      );
      date.setHours(0, 0, 0, 0);
      return startOfWeek(date, options);
    }
    const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, options.firstWeekContainsDate);
    date.setHours(0, 0, 0, 0);
    return startOfWeek(date, options);
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.mjs
var ISOWeekYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", [
      "G",
      "y",
      "Y",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token) {
    if (token === "R") {
      return parseNDigitsSigned(4, dateString);
    }
    return parseNDigitsSigned(token.length, dateString);
  }
  set(date, _flags, value) {
    const firstWeekOfYear = constructFrom(date, 0);
    firstWeekOfYear.setFullYear(value, 0, 4);
    firstWeekOfYear.setHours(0, 0, 0, 0);
    return startOfISOWeek(firstWeekOfYear);
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.mjs
var ExtendedYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(dateString, token) {
    if (token === "u") {
      return parseNDigitsSigned(4, dateString);
    }
    return parseNDigitsSigned(token.length, dateString);
  }
  set(date, _flags, value) {
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/QuarterParser.mjs
var QuarterParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 120);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "Q":
      case "QQ":
        return parseNDigits(token.length, dateString);
      case "Qo":
        return match2.ordinalNumber(dateString, { unit: "quarter" });
      case "QQQ":
        return match2.quarter(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQQ":
        return match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return match2.quarter(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 4;
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.mjs
var StandAloneQuarterParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 120);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "q":
      case "qq":
        return parseNDigits(token.length, dateString);
      case "qo":
        return match2.ordinalNumber(dateString, { unit: "quarter" });
      case "qqq":
        return match2.quarter(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqqq":
        return match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return match2.quarter(dateString, {
          width: "wide",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 4;
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/MonthParser.mjs
var MonthParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "L",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    __publicField(this, "priority", 110);
  }
  parse(dateString, token, match2) {
    const valueCallback = (value) => value - 1;
    switch (token) {
      case "M":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback
        );
      case "MM":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      case "Mo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "month"
          }),
          valueCallback
        );
      case "MMM":
        return match2.month(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.month(dateString, { width: "narrow", context: "formatting" });
      case "MMMMM":
        return match2.month(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return match2.month(dateString, { width: "wide", context: "formatting" }) || match2.month(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.month(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.mjs
var StandAloneMonthParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 110);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (value) => value - 1;
    switch (token) {
      case "L":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback
        );
      case "LL":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      case "Lo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "month"
          }),
          valueCallback
        );
      case "LLL":
        return match2.month(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.month(dateString, { width: "narrow", context: "standalone" });
      case "LLLLL":
        return match2.month(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return match2.month(dateString, { width: "wide", context: "standalone" }) || match2.month(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.month(dateString, { width: "narrow", context: "standalone" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setWeek.mjs
function setWeek(date, week, options) {
  const _date = toDate(date);
  const diff = getWeek(_date, options) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.mjs
var LocalWeekParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 100);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "w":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "wo":
        return match2.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53;
  }
  set(date, _flags, value, options) {
    return startOfWeek(setWeek(date, value, options), options);
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setISOWeek.mjs
function setISOWeek(date, week) {
  const _date = toDate(date);
  const diff = getISOWeek(_date) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.mjs
var ISOWeekParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 100);
    __publicField(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "I":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "Io":
        return match2.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53;
  }
  set(date, _flags, value) {
    return startOfISOWeek(setISOWeek(date, value));
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/DateParser.mjs
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
var DateParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "subPriority", 1);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "d":
        return parseNumericPattern(numericPatterns.date, dateString);
      case "do":
        return match2.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear2 = isLeapYearIndex(year);
    const month = date.getMonth();
    if (isLeapYear2) {
      return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
    } else {
      return value >= 1 && value <= DAYS_IN_MONTH[month];
    }
  }
  set(date, _flags, value) {
    date.setDate(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.mjs
var DayOfYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "subpriority", 1);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "E",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "D":
      case "DD":
        return parseNumericPattern(numericPatterns.dayOfYear, dateString);
      case "Do":
        return match2.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear2 = isLeapYearIndex(year);
    if (isLeapYear2) {
      return value >= 1 && value <= 366;
    } else {
      return value >= 1 && value <= 365;
    }
  }
  set(date, _flags, value) {
    date.setMonth(0, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setDay.mjs
function setDay(date, day, options) {
  var _a3, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a3 = options == null ? void 0 : options.locale) == null ? void 0 : _a3.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const currentDay = _date.getDay();
  const remainder = day % 7;
  const dayIndex = (remainder + 7) % 7;
  const delta = 7 - weekStartsOn;
  const diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
  return addDays(_date, diff);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/DayParser.mjs
var DayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "EEEEE":
        return match2.day(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "EEEE":
      default:
        return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/LocalDayParser.mjs
var LocalDayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
    };
    switch (token) {
      case "e":
      case "ee":
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      case "eo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "day"
          }),
          valueCallback
        );
      case "eee":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "eeeee":
        return match2.day(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "eeee":
      default:
        return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.mjs
var StandAloneLocalDayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "e",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
    };
    switch (token) {
      case "c":
      case "cc":
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      case "co":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "day"
          }),
          valueCallback
        );
      case "ccc":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      case "ccccc":
        return match2.day(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      case "cccc":
      default:
        return match2.day(dateString, { width: "wide", context: "standalone" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setISODay.mjs
function setISODay(date, day) {
  const _date = toDate(date);
  const currentDay = getISODay(_date);
  const diff = day - currentDay;
  return addDays(_date, diff);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/ISODayParser.mjs
var ISODayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "E",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (value) => {
      if (value === 0) {
        return 7;
      }
      return value;
    };
    switch (token) {
      case "i":
      case "ii":
        return parseNDigits(token.length, dateString);
      case "io":
        return match2.ordinalNumber(dateString, { unit: "day" });
      case "iii":
        return mapValue(
          match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      case "iiiii":
        return mapValue(
          match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      case "iiiiii":
        return mapValue(
          match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      case "iiii":
      default:
        return mapValue(
          match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 7;
  }
  set(date, _flags, value) {
    date = setISODay(date, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/AMPMParser.mjs
var AMPMParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "a":
      case "aa":
      case "aaa":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.mjs
var AMPMMidnightParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "b":
      case "bb":
      case "bbb":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.mjs
var DayPeriodParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.mjs
var Hour1to12Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "h":
        return parseNumericPattern(numericPatterns.hour12h, dateString);
      case "ho":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 12;
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else if (!isPM && value === 12) {
      date.setHours(0, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.mjs
var Hour0to23Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "H":
        return parseNumericPattern(numericPatterns.hour23h, dateString);
      case "Ho":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 23;
  }
  set(date, _flags, value) {
    date.setHours(value, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.mjs
var Hour0To11Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "K":
        return parseNumericPattern(numericPatterns.hour11h, dateString);
      case "Ko":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.mjs
var Hour1To24Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "k":
        return parseNumericPattern(numericPatterns.hour24h, dateString);
      case "ko":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 24;
  }
  set(date, _flags, value) {
    const hours = value <= 24 ? value % 24 : value;
    date.setHours(hours, 0, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/MinuteParser.mjs
var MinuteParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 60);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "m":
        return parseNumericPattern(numericPatterns.minute, dateString);
      case "mo":
        return match2.ordinalNumber(dateString, { unit: "minute" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59;
  }
  set(date, _flags, value) {
    date.setMinutes(value, 0, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/SecondParser.mjs
var SecondParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 50);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "s":
        return parseNumericPattern(numericPatterns.second, dateString);
      case "so":
        return match2.ordinalNumber(dateString, { unit: "second" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59;
  }
  set(date, _flags, value) {
    date.setSeconds(value, 0);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.mjs
var FractionOfSecondParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 30);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(dateString, token) {
    const valueCallback = (value) => Math.trunc(value * Math.pow(10, -token.length + 3));
    return mapValue(parseNDigits(token.length, dateString), valueCallback);
  }
  set(date, _flags, value) {
    date.setMilliseconds(value);
    return date;
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.mjs
var ISOTimezoneWithZParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 10);
    __publicField(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(dateString, token) {
    switch (token) {
      case "X":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString
        );
      case "XX":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "XXXX":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString
        );
      case "XXXXX":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString
        );
      case "XXX":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
    );
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.mjs
var ISOTimezoneParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 10);
    __publicField(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(dateString, token) {
    switch (token) {
      case "x":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString
        );
      case "xx":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "xxxx":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString
        );
      case "xxxxx":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString
        );
      case "xxx":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
    );
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.mjs
var TimestampSecondsParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 40);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }
  set(date, _flags, value) {
    return [constructFrom(date, value * 1e3), { timestampIsSet: true }];
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.mjs
var TimestampMillisecondsParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 20);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }
  set(date, _flags, value) {
    return [constructFrom(date, value), { timestampIsSet: true }];
  }
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse/_lib/parsers.mjs
var parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser()
};

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/parse.mjs
var formattingTokensRegExp2 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp2 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp2 = /^'([^]*?)'?$/;
var doubleQuoteRegExp2 = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp2 = /[a-zA-Z]/;
function parse(dateStr, formatStr, referenceDate, options) {
  var _a3, _b, _c, _d, _e2, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions2();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a3 = options == null ? void 0 : options.locale) == null ? void 0 : _a3.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_f = (_e2 = options == null ? void 0 : options.locale) == null ? void 0 : _e2.options) == null ? void 0 : _f.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  if (formatStr === "") {
    if (dateStr === "") {
      return toDate(referenceDate);
    } else {
      return constructFrom(referenceDate, NaN);
    }
  }
  const subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  const setters = [new DateToSystemTimezoneSetter()];
  const tokens = formatStr.match(longFormattingTokensRegExp2).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter in longFormatters) {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp2);
  const usedTokens = [];
  for (let token of tokens) {
    if (!(options == null ? void 0 : options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    if (!(options == null ? void 0 : options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    const firstCharacter = token[0];
    const parser = parsers[firstCharacter];
    if (parser) {
      const { incompatibleTokens } = parser;
      if (Array.isArray(incompatibleTokens)) {
        const incompatibleToken = usedTokens.find(
          (usedToken) => incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter
        );
        if (incompatibleToken) {
          throw new RangeError(
            `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`
          );
        }
      } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
        throw new RangeError(
          `The format string mustn't contain \`${token}\` and any other token at the same time`
        );
      }
      usedTokens.push({ token: firstCharacter, fullToken: token });
      const parseResult = parser.run(
        dateStr,
        token,
        locale.match,
        subFnOptions
      );
      if (!parseResult) {
        return constructFrom(referenceDate, NaN);
      }
      setters.push(parseResult.setter);
      dateStr = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp2)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
        );
      }
      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString2(token);
      }
      if (dateStr.indexOf(token) === 0) {
        dateStr = dateStr.slice(token.length);
      } else {
        return constructFrom(referenceDate, NaN);
      }
    }
  }
  if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
    return constructFrom(referenceDate, NaN);
  }
  const uniquePrioritySetters = setters.map((setter) => setter.priority).sort((a, b) => b - a).filter((priority, index, array) => array.indexOf(priority) === index).map(
    (priority) => setters.filter((setter) => setter.priority === priority).sort((a, b) => b.subPriority - a.subPriority)
  ).map((setterArray) => setterArray[0]);
  let date = toDate(referenceDate);
  if (isNaN(date.getTime())) {
    return constructFrom(referenceDate, NaN);
  }
  const flags = {};
  for (const setter of uniquePrioritySetters) {
    if (!setter.validate(date, subFnOptions)) {
      return constructFrom(referenceDate, NaN);
    }
    const result = setter.set(date, flags, subFnOptions);
    if (Array.isArray(result)) {
      date = result[0];
      Object.assign(flags, result[1]);
    } else {
      date = result;
    }
  }
  return constructFrom(referenceDate, date);
}
function cleanEscapedString2(input) {
  return input.match(escapedStringRegExp2)[1].replace(doubleQuoteRegExp2, "'");
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/isSameQuarter.mjs
function isSameQuarter(dateLeft, dateRight) {
  const dateLeftStartOfQuarter = startOfQuarter(dateLeft);
  const dateRightStartOfQuarter = startOfQuarter(dateRight);
  return +dateLeftStartOfQuarter === +dateRightStartOfQuarter;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/subDays.mjs
function subDays(date, amount) {
  return addDays(date, -amount);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setMonth.mjs
function setMonth(date, month) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const day = _date.getDate();
  const dateWithDesiredMonth = constructFrom(date, 0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  _date.setMonth(month, Math.min(day, daysInMonth));
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/set.mjs
function set(date, values) {
  let _date = toDate(date);
  if (isNaN(+_date)) {
    return constructFrom(date, NaN);
  }
  if (values.year != null) {
    _date.setFullYear(values.year);
  }
  if (values.month != null) {
    _date = setMonth(_date, values.month);
  }
  if (values.date != null) {
    _date.setDate(values.date);
  }
  if (values.hours != null) {
    _date.setHours(values.hours);
  }
  if (values.minutes != null) {
    _date.setMinutes(values.minutes);
  }
  if (values.seconds != null) {
    _date.setSeconds(values.seconds);
  }
  if (values.milliseconds != null) {
    _date.setMilliseconds(values.milliseconds);
  }
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setHours.mjs
function setHours(date, hours) {
  const _date = toDate(date);
  _date.setHours(hours);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setMilliseconds.mjs
function setMilliseconds(date, milliseconds) {
  const _date = toDate(date);
  _date.setMilliseconds(milliseconds);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setMinutes.mjs
function setMinutes(date, minutes) {
  const _date = toDate(date);
  _date.setMinutes(minutes);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setSeconds.mjs
function setSeconds(date, seconds) {
  const _date = toDate(date);
  _date.setSeconds(seconds);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/setYear.mjs
function setYear(date, year) {
  const _date = toDate(date);
  if (isNaN(+_date)) {
    return constructFrom(date, NaN);
  }
  _date.setFullYear(year);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/subMonths.mjs
function subMonths(date, amount) {
  return addMonths(date, -amount);
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/sub.mjs
function sub(date, duration) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = duration;
  const dateWithoutMonths = subMonths(date, months + years * 12);
  const dateWithoutDays = subDays(dateWithoutMonths, days + weeks * 7);
  const minutestoSub = minutes + hours * 60;
  const secondstoSub = seconds + minutestoSub * 60;
  const mstoSub = secondstoSub * 1e3;
  const finalDate = constructFrom(date, dateWithoutDays.getTime() - mstoSub);
  return finalDate;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/subYears.mjs
function subYears(date, amount) {
  return addYears(date, -amount);
}

// node_modules/.pnpm/@vuepic+vue-datepicker@8.8.0_vue@3.4.29/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Et() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z"
      }),
      createBaseVNode("path", {
        d: "M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      createBaseVNode("path", {
        d: "M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      createBaseVNode("path", {
        d: "M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z"
      })
    ]
  );
}
Et.compatConfig = {
  MODE: 3
};
function wn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z"
      }),
      createBaseVNode("path", {
        d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
wn.compatConfig = {
  MODE: 3
};
function La() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
La.compatConfig = {
  MODE: 3
};
function za() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
za.compatConfig = {
  MODE: 3
};
function Ha() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      createBaseVNode("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
Ha.compatConfig = {
  MODE: 3
};
function Wa() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Wa.compatConfig = {
  MODE: 3
};
function Va() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
Va.compatConfig = {
  MODE: 3
};
var Ze = (e, t) => t ? new Date(e.toLocaleString("en-US", { timeZone: t })) : new Date(e);
var Ua = (e, t, l) => {
  const a = Na(e, t, l);
  return a || U();
};
var il = (e, t, l) => {
  const a = t.dateInTz ? Ze(new Date(e), t.dateInTz) : U(e);
  return l ? Ke(a, true) : a;
};
var Na = (e, t, l) => {
  if (!e)
    return null;
  const a = l ? Ke(U(e), true) : U(e);
  return t ? t.exactMatch ? il(e, t, l) : Ze(a, t.timezone) : a;
};
var dl = (e) => {
  if (!e)
    return 0;
  const t = /* @__PURE__ */ new Date(), l = new Date(t.toLocaleString("en-US", { timeZone: "UTC" })), a = new Date(t.toLocaleString("en-US", { timeZone: e })), n = a.getTimezoneOffset() / 60;
  return (+l - +a) / (1e3 * 60 * 60) - n;
};
var nt = ((e) => (e.month = "month", e.year = "year", e))(nt || {});
var Mt = ((e) => (e.top = "top", e.bottom = "bottom", e))(Mt || {});
var Tt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Tt || {});
var He = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(He || {});
var cl = ["timestamp", "date", "iso"];
var je = ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(je || {});
var Re = ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Re || {});
function nn(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function fl(e) {
  return (t) => format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "EEEEEE", { locale: e });
}
var vl = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e !== null)
    try {
      n = a.map(fl(e));
    } catch {
      n = a.map(nn(t));
    }
  else
    n = a.map(nn(t));
  const c = n.slice(0, l), v = n.slice(l + 1, n.length);
  return [n[l]].concat(...v).concat(...c);
};
var ja = (e, t, l) => {
  const a = [];
  for (let n = +e[0]; n <= +e[1]; n++)
    a.push({ value: +n, text: An(n, t) });
  return l ? a.reverse() : a;
};
var Dn = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => {
    const v = c < 10 ? `0${c}` : c;
    return /* @__PURE__ */ new Date(`2017-${v}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const c = l === "long" ? "LLLL" : "LLL";
      return a.map((v, h3) => {
        const i = format(Ze(v, "UTC"), c, { locale: e });
        return {
          text: i.charAt(0).toUpperCase() + i.substring(1),
          value: h3
        };
      });
    } catch {
    }
  const n = new Intl.DateTimeFormat(t, { month: l, timeZone: "UTC" });
  return a.map((c, v) => {
    const h3 = n.format(c);
    return {
      text: h3.charAt(0).toUpperCase() + h3.substring(1),
      value: v
    };
  });
};
var ml = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ie = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var gl = (e) => ({ type: "dot", ...e ?? {} });
var Mn = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Ka = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Ye = (e) => e;
var ln = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var rn = (e) => e === null;
var $n = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var yl = (e) => {
  const t = [], l = (a) => a.filter((n) => n);
  for (let a = 0; a < e.length; a += 3) {
    const n = [e[a], e[a + 1], e[a + 2]];
    t.push(l(n));
  }
  return t;
};
var Gt = (e, t, l) => {
  const a = l != null, n = t != null;
  if (!a && !n)
    return false;
  const c = +l, v = +t;
  return a && n ? +e > c || +e < v : a ? +e > c : n ? +e < v : false;
};
var Yt = (e, t) => yl(e).map((l) => l.map((a) => {
  const { active: n, disabled: c, isBetween: v, highlighted: h3 } = t(a);
  return {
    ...a,
    active: n,
    disabled: c,
    className: {
      dp__overlay_cell_active: n,
      dp__overlay_cell: !n,
      dp__overlay_cell_disabled: c,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: c && n,
      dp__cell_in_between: v,
      "dp--highlighted": h3
    }
  };
}));
var yt = (e, t, l = false) => {
  e && t.allowStopPropagation && (l && e.stopImmediatePropagation(), e.stopPropagation());
};
var pl = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function hl(e, t) {
  let l = [...document.querySelectorAll(pl())];
  l = l.filter((n) => !e.contains(n) || n.hasAttribute("data-datepicker-instance"));
  const a = l.indexOf(e);
  if (a >= 0 && (t ? a - 1 >= 0 : a + 1 <= l.length))
    return l[a + (t ? -1 : 1)];
}
var bl = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var An = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var Ga = (e) => format(e, "dd-MM-yyyy");
var $a = (e) => Array.isArray(e);
var sa = (e, t) => t.get(Ga(e));
var kl = (e, t) => e ? t ? t instanceof Map ? !!sa(e, t) : t(U(e)) : false : true;
var qe = (e, t, l = false) => {
  if (e.key === Re.enter || e.key === Re.space)
    return l && e.preventDefault(), t();
};
var on = (e, t, l, a, n, c) => {
  const v = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: c });
  return isValid(v) && isDate(v) ? a || n ? v : set(v, {
    hours: +l.hours,
    minutes: +(l == null ? void 0 : l.minutes),
    seconds: +(l == null ? void 0 : l.seconds),
    milliseconds: 0
  }) : null;
};
var wl = (e, t, l, a, n, c) => {
  const v = Array.isArray(l) ? l[0] : l;
  if (typeof t == "string")
    return on(e, t, v, a, n, c);
  if (Array.isArray(t)) {
    let h3 = null;
    for (const i of t)
      if (h3 = on(e, i, v, a, n, c), h3)
        break;
    return h3;
  }
  return typeof t == "function" ? t(e) : null;
};
var U = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var Dl = (e, t, l) => {
  if (t) {
    const n = (e.getMonth() + 1).toString().padStart(2, "0"), c = e.getDate().toString().padStart(2, "0"), v = e.getHours().toString().padStart(2, "0"), h3 = e.getMinutes().toString().padStart(2, "0"), i = l ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${n}-${c}T${v}:${h3}:${i}.000Z`;
  }
  const a = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
  return new Date(a).toISOString();
};
var Ke = (e, t) => {
  const l = U(JSON.parse(JSON.stringify(e))), a = set(l, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  return t ? startOfMonth(a) : a;
};
var pt = (e, t, l, a) => {
  let n = e ? U(e) : U();
  return (t || t === 0) && (n = setHours(n, +t)), (l || l === 0) && (n = setMinutes(n, +l)), (a || a === 0) && (n = setSeconds(n, +a)), setMilliseconds(n, 0);
};
var _e = (e, t) => !e || !t ? false : isBefore(Ke(e), Ke(t));
var De = (e, t) => !e || !t ? false : isEqual(Ke(e), Ke(t));
var Be = (e, t) => !e || !t ? false : isAfter(Ke(e), Ke(t));
var da = (e, t, l) => e != null && e[0] && (e != null && e[1]) ? Be(l, e[0]) && _e(l, e[1]) : e != null && e[0] && t ? Be(l, e[0]) && _e(l, t) || _e(l, e[0]) && Be(l, t) : false;
var lt = (e) => {
  const t = set(new Date(e), { date: 1 });
  return Ke(t);
};
var Aa = (e, t, l) => t && (l || l === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((a) => a === t ? [a, l] : [a, isNaN(+e[a]) ? void 0 : +e[a]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
};
var St = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
});
var Tn = (e, t) => {
  if (t) {
    const l = getYear(U(t));
    if (l > e)
      return 12;
    if (l === e)
      return getMonth(U(t));
  }
};
var Sn = (e, t) => {
  if (t) {
    const l = getYear(U(t));
    return l < e ? -1 : l === e ? getMonth(U(t)) : void 0;
  }
};
var It = (e) => {
  if (e)
    return getYear(U(e));
};
var Pn = (e, t) => {
  const l = Be(e, t) ? t : e, a = Be(t, e) ? t : e;
  return eachDayOfInterval({ start: l, end: a });
};
var Ml = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var it = (e, t) => {
  const l = startOfWeek(e, { weekStartsOn: +t }), a = endOfWeek(e, { weekStartsOn: +t });
  return [l, a];
};
var Rn = (e, t) => {
  const l = {
    hours: getHours(U()),
    minutes: getMinutes(U()),
    seconds: t ? getSeconds(U()) : 0
  };
  return Object.assign(l, e);
};
var gt = (e, t, l) => [set(U(e), { date: 1 }), set(U(), { month: t, year: l, date: 1 })];
var dt = (e, t, l) => {
  let a = e ? U(e) : U();
  return (t || t === 0) && (a = setMonth(a, t)), l && (a = setYear(a, l)), a;
};
var Cn = (e, t, l, a, n) => {
  if (!a || n && !t || !n && !l)
    return false;
  const c = n ? addMonths(e, 1) : subMonths(e, 1), v = [getMonth(c), getYear(c)];
  return n ? !Al(...v, t) : !$l(...v, l);
};
var $l = (e, t, l) => _e(...gt(l, e, t)) || De(...gt(l, e, t));
var Al = (e, t, l) => Be(...gt(l, e, t)) || De(...gt(l, e, t));
var _n = (e, t, l, a, n, c, v) => {
  if (typeof t == "function" && !v)
    return t(e);
  const h3 = l ? { locale: l } : void 0;
  return Array.isArray(e) ? `${format(e[0], c, h3)}${n && !e[1] ? "" : a}${e[1] ? format(e[1], c, h3) : ""}` : format(e, c, h3);
};
var Rt = (e) => {
  if (e)
    return null;
  throw new Error(Ka.prop("partial-range"));
};
var ta = (e, t) => {
  if (t)
    return e();
  throw new Error(Ka.prop("range"));
};
var Ea = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var Tl = (e, t) => set(t ?? U(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var Ta = (e, t, l, a) => {
  if (!e)
    return true;
  if (a) {
    const n = l === "max" ? isBefore(e, t) : isAfter(e, t), c = { seconds: 0, milliseconds: 0 };
    return n || isEqual(set(e, c), set(t, c));
  }
  return l === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
};
var Sa = (e, t, l) => e ? Tl(e, t) : U(l ?? t);
var sn = (e, t, l, a, n) => {
  if (Array.isArray(a)) {
    const v = Sa(e, a[0], t), h3 = Sa(e, a[1], t);
    return Ta(a[0], v, l, !!t) && Ta(a[1], h3, l, !!t) && n;
  }
  const c = Sa(e, a, t);
  return Ta(a, c, l, !!t) && n;
};
var Pa = (e) => set(U(), St(e));
var Sl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((l) => getYear(U(l)) === t).map((l) => getMonth(l)) : [];
var On = (e, t, l) => typeof e == "function" ? e({ month: t, year: l }) : !!e.months.find((a) => a.month === t && a.year === l);
var Qa = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var Bn = (e) => format(e, "yyyy-MM-dd");
var Ht = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Yn = () => {
  const e = (a) => {
    Ht.menuFocused = a;
  }, t = (a) => {
    Ht.shiftKeyInMenu !== a && (Ht.shiftKeyInMenu = a);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Ht.shiftKeyInMenu, menuFocused: Ht.menuFocused })),
    setMenuFocused: e,
    setShiftKey: t
  };
};
var Se = reactive({
  monthYear: [],
  calendar: [],
  time: [],
  actionRow: [],
  selectionGrid: [],
  timePicker: {
    0: [],
    1: []
  },
  monthPicker: []
});
var Ra = ref(null);
var aa = ref(false);
var Ca = ref(false);
var _a = ref(false);
var Oa = ref(false);
var ze = ref(0);
var Oe = ref(0);
var bt = () => {
  const e = computed(() => aa.value ? [...Se.selectionGrid, Se.actionRow].filter((y) => y.length) : Ca.value ? [
    ...Se.timePicker[0],
    ...Se.timePicker[1],
    Oa.value ? [] : [Ra.value],
    Se.actionRow
  ].filter((y) => y.length) : _a.value ? [...Se.monthPicker, Se.actionRow] : [Se.monthYear, ...Se.calendar, Se.time, Se.actionRow].filter((y) => y.length)), t = (y) => {
    ze.value = y ? ze.value + 1 : ze.value - 1;
    let F = null;
    e.value[Oe.value] && (F = e.value[Oe.value][ze.value]), !F && e.value[Oe.value + (y ? 1 : -1)] ? (Oe.value = Oe.value + (y ? 1 : -1), ze.value = y ? 0 : e.value[Oe.value].length - 1) : F || (ze.value = y ? ze.value - 1 : ze.value + 1);
  }, l = (y) => {
    if (Oe.value === 0 && !y || Oe.value === e.value.length && y)
      return;
    Oe.value = y ? Oe.value + 1 : Oe.value - 1, e.value[Oe.value] ? e.value[Oe.value] && !e.value[Oe.value][ze.value] && ze.value !== 0 && (ze.value = e.value[Oe.value].length - 1) : Oe.value = y ? Oe.value - 1 : Oe.value + 1;
  }, a = (y) => {
    let F = null;
    e.value[Oe.value] && (F = e.value[Oe.value][ze.value]), F ? F.focus({ preventScroll: !aa.value }) : ze.value = y ? ze.value - 1 : ze.value + 1;
  }, n = () => {
    t(true), a(true);
  }, c = () => {
    t(false), a(false);
  }, v = () => {
    l(false), a(true);
  }, h3 = () => {
    l(true), a(true);
  }, i = (y, F) => {
    Se[F] = y;
  }, L = (y, F) => {
    Se[F] = y;
  }, m = () => {
    ze.value = 0, Oe.value = 0;
  };
  return {
    buildMatrix: i,
    buildMultiLevelMatrix: L,
    setTimePickerBackRef: (y) => {
      Ra.value = y;
    },
    setSelectionGrid: (y) => {
      aa.value = y, m(), y || (Se.selectionGrid = []);
    },
    setTimePicker: (y, F = false) => {
      Ca.value = y, Oa.value = F, m(), y || (Se.timePicker[0] = [], Se.timePicker[1] = []);
    },
    setTimePickerElements: (y, F = 0) => {
      Se.timePicker[F] = y;
    },
    arrowRight: n,
    arrowLeft: c,
    arrowUp: v,
    arrowDown: h3,
    clearArrowNav: () => {
      Se.monthYear = [], Se.calendar = [], Se.time = [], Se.actionRow = [], Se.selectionGrid = [], Se.timePicker[0] = [], Se.timePicker[1] = [], aa.value = false, Ca.value = false, Oa.value = false, _a.value = false, m(), Ra.value = null;
    },
    setMonthPicker: (y) => {
      _a.value = y, m();
    },
    refSets: Se
    // exposed for testing
  };
};
var un = (e) => ({
  menuAppearTop: "dp-menu-appear-top",
  menuAppearBottom: "dp-menu-appear-bottom",
  open: "dp-slide-down",
  close: "dp-slide-up",
  next: "calendar-next",
  previous: "calendar-prev",
  vNext: "dp-slide-up",
  vPrevious: "dp-slide-down",
  ...e ?? {}
});
var Pl = (e) => ({
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
  calendarWrap: "Calendar wrapper",
  calendarDays: "Calendar days",
  openTimePicker: "Open time picker",
  closeTimePicker: "Close time Picker",
  incrementValue: (t) => `Increment ${t}`,
  decrementValue: (t) => `Decrement ${t}`,
  openTpOverlay: (t) => `Open ${t} overlay`,
  amPmButton: "Switch AM/PM mode",
  openYearsOverlay: "Open years overlay",
  openMonthsOverlay: "Open months overlay",
  nextMonth: "Next month",
  prevMonth: "Previous month",
  nextYear: "Next year",
  prevYear: "Previous year",
  day: void 0,
  weekDay: void 0,
  ...e ?? {}
});
var dn = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var Rl = (e) => {
  const t = typeof e == "object" && e, l = {
    static: true,
    solo: false
  };
  if (!e)
    return { ...l, count: dn(false) };
  const a = t ? e : {}, n = t ? a.count ?? true : e, c = dn(n);
  return Object.assign(l, a, { count: c });
};
var Cl = (e, t, l) => e || (typeof l == "string" ? l : t);
var _l = (e) => typeof e == "boolean" ? e ? un({}) : false : un(e);
var Ol = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var Bl = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Yl = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var Il = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var Nl = (e) => ({ ...{
  allowStopPropagation: true,
  closeOnScroll: false,
  modeHeight: 255,
  allowPreventDefault: false,
  closeOnClearValue: true,
  closeOnAutoApply: true,
  noSwipe: false,
  keepActionRow: false,
  onClickOutside: void 0,
  tabOutClosesMenu: true,
  arrowLeft: void 0,
  keepViewOnOffsetClick: false,
  timeArrowHoldThreshold: 0
}, ...e ?? {} });
var El = (e) => {
  const t = {
    dates: Array.isArray(e) ? e.map((l) => U(l)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: false }
  };
  return typeof e == "function" ? e : { ...t, ...e ?? {} };
};
var Fl = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var Ll = (e, t) => {
  const l = {
    noDisabledRange: false,
    showLastInRange: true,
    minMaxRawRange: false,
    partialRange: true,
    disableTimeRangeValidation: false,
    maxRange: void 0,
    minRange: void 0,
    autoRange: void 0,
    fixedStart: false,
    fixedEnd: false
  };
  return typeof e == "object" ? { enabled: true, ...l, ...e } : {
    enabled: e,
    noDisabledRange: t.noDisabledRange,
    showLastInRange: t.showLastInRange,
    minMaxRawRange: t.minMaxRawRange,
    partialRange: t.partialRange,
    disableTimeRangeValidation: t.disableTimeRangeValidation,
    maxRange: t.maxRange,
    minRange: t.minRange,
    autoRange: t.autoRange,
    fixedStart: t.fixedStart,
    fixedEnd: t.fixedEnd
  };
};
var zl = (e, t) => e ? typeof e == "string" ? { timezone: e, exactMatch: false, dateInTz: void 0, emitTimezone: t, convertModel: true } : {
  timezone: e.timezone,
  exactMatch: e.exactMatch ?? false,
  dateInTz: e.dateInTz ?? void 0,
  emitTimezone: t ?? e.emitTimezone,
  convertModel: e.convertModel ?? true
} : { timezone: void 0, exactMatch: false, emitTimezone: t };
var Ba = (e, t, l) => new Map(
  e.map((a) => {
    const n = Ua(a, t, l);
    return [Ga(n), n];
  })
);
var Hl = (e, t) => e.length ? new Map(
  e.map((l) => {
    const a = Ua(l.date, t);
    return [Ga(a), l];
  })
) : null;
var Wl = (e) => {
  var t;
  return {
    minDate: Na(e.minDate, e.timezone, e.isSpecific),
    maxDate: Na(e.maxDate, e.timezone, e.isSpecific),
    disabledDates: $a(e.disabledDates) ? Ba(e.disabledDates, e.timezone, e.isSpecific) : e.disabledDates,
    allowedDates: $a(e.allowedDates) ? Ba(e.allowedDates, e.timezone, e.isSpecific) : null,
    highlight: typeof e.highlight == "object" && $a((t = e.highlight) == null ? void 0 : t.dates) ? Ba(e.highlight.dates, e.timezone) : e.highlight,
    markers: Hl(e.markers, e.timezone)
  };
};
var Vl = (e, t) => typeof e == "boolean" ? { enabled: e, dragSelect: true, limit: +t } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? true
};
var Ul = (e) => ({
  ...Object.fromEntries(
    Object.keys(e).map((l) => {
      const a = l, n = e[a], c = typeof e[a] == "string" ? { [n]: true } : Object.fromEntries(n.map((v) => [v, true]));
      return [l, c];
    })
  )
});
var Ce = (e) => {
  const t = () => {
    const le = e.enableSeconds ? ":ss" : "", Q = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${Q}${le}` : `hh${Q}${le} aa`;
  }, l = () => {
    var le;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((le = O.value) == null ? void 0 : le.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, a = (le) => Rn(le, e.enableSeconds), n = () => X.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [a(e.startTime[0]), a(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? a(e.startTime) : null, c = computed(() => Rl(e.multiCalendars)), v = computed(() => n()), h3 = computed(() => Pl(e.ariaLabels)), i = computed(() => Bl(e.filters)), L = computed(() => _l(e.transitions)), m = computed(() => Yl(e.actionRow)), E = computed(
    () => Cl(e.previewFormat, e.format, l())
  ), b = computed(() => Ol(e.textInput)), C = computed(() => Il(e.inline)), H = computed(() => Nl(e.config)), N = computed(() => El(e.highlight)), O = computed(() => Fl(e.weekNumbers)), y = computed(() => zl(e.timezone, e.emitTimezone)), F = computed(() => Vl(e.multiDates, e.multiDatesLimit)), S = computed(
    () => Wl({
      minDate: e.minDate,
      maxDate: e.maxDate,
      disabledDates: e.disabledDates,
      allowedDates: e.allowedDates,
      highlight: N.value,
      markers: e.markers,
      timezone: y.value,
      isSpecific: e.monthPicker || e.yearPicker || e.quarterPicker
    })
  ), X = computed(
    () => Ll(e.range, {
      minMaxRawRange: false,
      maxRange: e.maxRange,
      minRange: e.minRange,
      noDisabledRange: e.noDisabledRange,
      showLastInRange: e.showLastInRange,
      partialRange: e.partialRange,
      disableTimeRangeValidation: e.disableTimeRangeValidation,
      autoRange: e.autoRange,
      fixedStart: e.fixedStart,
      fixedEnd: e.fixedEnd
    })
  ), J = computed(() => Ul(e.ui));
  return {
    defaultedTransitions: L,
    defaultedMultiCalendars: c,
    defaultedStartTime: v,
    defaultedAriaLabels: h3,
    defaultedFilters: i,
    defaultedActionRow: m,
    defaultedPreviewFormat: E,
    defaultedTextInput: b,
    defaultedInline: C,
    defaultedConfig: H,
    defaultedHighlight: N,
    defaultedWeekNumbers: O,
    defaultedRange: X,
    propDates: S,
    defaultedTz: y,
    defaultedMultiDates: F,
    defaultedUI: J,
    getDefaultPattern: l,
    getDefaultStartTime: n
  };
};
var jl = (e, t, l) => {
  const a = ref(), { defaultedTextInput: n, defaultedRange: c, defaultedTz: v, defaultedMultiDates: h3, getDefaultPattern: i } = Ce(t), L = ref(""), m = toRef(t, "format"), E = toRef(t, "formatLocale");
  watch(
    a,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", a.value, T(true));
    },
    { deep: true }
  ), watch(c, (s, oe2) => {
    s.enabled !== oe2.enabled && (a.value = null);
  }), watch(m, () => {
    z();
  });
  const b = (s) => v.value.timezone && v.value.convertModel ? Ze(s, v.value.timezone) : s, C = (s) => {
    if (v.value.timezone && v.value.convertModel) {
      const oe2 = dl(v.value.timezone);
      return addHours(s, oe2);
    }
    return s;
  }, H = (s, oe2, M = false) => _n(
    s,
    t.format,
    t.formatLocale,
    n.value.rangeSeparator,
    t.modelAuto,
    oe2 ?? i(),
    M
  ), N = (s) => s ? t.modelType ? ee(s) : {
    hours: getHours(s),
    minutes: getMinutes(s),
    seconds: t.enableSeconds ? getSeconds(s) : 0
  } : null, O = (s) => t.modelType ? ee(s) : { month: getMonth(s), year: getYear(s) }, y = (s) => Array.isArray(s) ? h3.value.enabled ? s.map((oe2) => F(oe2, setYear(U(), oe2))) : ta(
    () => [
      setYear(U(), s[0]),
      s[1] ? setYear(U(), s[1]) : Rt(c.value.partialRange)
    ],
    c.value.enabled
  ) : setYear(U(), +s), F = (s, oe2) => (typeof s == "string" || typeof s == "number") && t.modelType ? D(s) : oe2, S = (s) => Array.isArray(s) ? [
    F(
      s[0],
      pt(null, +s[0].hours, +s[0].minutes, s[0].seconds)
    ),
    F(
      s[1],
      pt(null, +s[1].hours, +s[1].minutes, s[1].seconds)
    )
  ] : F(s, pt(null, s.hours, s.minutes, s.seconds)), X = (s) => {
    const oe2 = set(U(), { date: 1 });
    return Array.isArray(s) ? h3.value.enabled ? s.map((M) => F(M, dt(oe2, +M.month, +M.year))) : ta(
      () => [
        F(s[0], dt(oe2, +s[0].month, +s[0].year)),
        F(
          s[1],
          s[1] ? dt(oe2, +s[1].month, +s[1].year) : Rt(c.value.partialRange)
        )
      ],
      c.value.enabled
    ) : F(s, dt(oe2, +s.month, +s.year));
  }, J = (s) => {
    if (Array.isArray(s))
      return s.map((oe2) => D(oe2));
    throw new Error(Ka.dateArr("multi-dates"));
  }, le = (s) => {
    if (Array.isArray(s) && c.value.enabled) {
      const oe2 = s[0], M = s[1];
      return [
        U(Array.isArray(oe2) ? oe2[0] : null),
        U(Array.isArray(M) ? M[0] : null)
      ];
    }
    return U(s[0]);
  }, Q = (s) => t.modelAuto ? Array.isArray(s) ? [D(s[0]), D(s[1])] : t.autoApply ? [D(s)] : [D(s), null] : Array.isArray(s) ? ta(
    () => s[1] ? [
      D(s[0]),
      s[1] ? D(s[1]) : Rt(c.value.partialRange)
    ] : [D(s[0])],
    c.value.enabled
  ) : D(s), P = () => {
    Array.isArray(a.value) && c.value.enabled && a.value.length === 1 && a.value.push(Rt(c.value.partialRange));
  }, re = () => {
    const s = a.value;
    return [
      ee(s[0]),
      s[1] ? ee(s[1]) : Rt(c.value.partialRange)
    ];
  }, B = () => a.value[1] ? re() : ee(Ye(a.value[0])), j = () => (a.value || []).map((s) => ee(s)), fe = (s = false) => (s || P(), t.modelAuto ? B() : h3.value.enabled ? j() : Array.isArray(a.value) ? ta(() => re(), c.value.enabled) : ee(Ye(a.value))), ce = (s) => !s || Array.isArray(s) && !s.length ? null : t.timePicker ? S(Ye(s)) : t.monthPicker ? X(Ye(s)) : t.yearPicker ? y(Ye(s)) : h3.value.enabled ? J(Ye(s)) : t.weekPicker ? le(Ye(s)) : Q(Ye(s)), _ = (s) => {
    const oe2 = ce(s);
    Ea(Ye(oe2)) ? (a.value = Ye(oe2), z()) : (a.value = null, L.value = "");
  }, A = () => {
    const s = (oe2) => format(oe2, n.value.format);
    return `${s(a.value[0])} ${n.value.rangeSeparator} ${a.value[1] ? s(a.value[1]) : ""}`;
  }, k = () => l.value && a.value ? Array.isArray(a.value) ? A() : format(a.value, n.value.format) : H(a.value), o = () => a.value ? h3.value.enabled ? a.value.map((s) => H(s)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? k() : H(a.value) : "", z = () => {
    !t.format || typeof t.format == "string" || n.value.enabled && typeof n.value.format == "string" ? L.value = o() : L.value = t.format(a.value);
  }, D = (s) => {
    if (t.utc) {
      const oe2 = new Date(s);
      return t.utc === "preserve" ? new Date(oe2.getTime() + oe2.getTimezoneOffset() * 6e4) : oe2;
    }
    return t.modelType ? cl.includes(t.modelType) ? b(new Date(s)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? b(
      parse(s, i(), /* @__PURE__ */ new Date(), { locale: E.value })
    ) : b(
      parse(s, t.modelType, /* @__PURE__ */ new Date(), { locale: E.value })
    ) : b(new Date(s));
  }, ee = (s) => s ? t.utc ? Dl(s, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +C(s) : t.modelType === "iso" ? C(s).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? H(C(s)) : H(C(s), t.modelType, true) : C(s) : "", de = (s, oe2 = false, M = false) => {
    if (M)
      return s;
    if (e("update:model-value", s), v.value.emitTimezone && oe2) {
      const me = Array.isArray(s) ? s.map((d) => Ze(Ye(d), v.value.emitTimezone)) : Ze(Ye(s), v.value.emitTimezone);
      e("update:model-timezone-value", me);
    }
  }, u = (s) => Array.isArray(a.value) ? h3.value.enabled ? a.value.map((oe2) => s(oe2)) : [
    s(a.value[0]),
    a.value[1] ? s(a.value[1]) : Rt(c.value.partialRange)
  ] : s(Ye(a.value)), I = () => {
    if (Array.isArray(a.value)) {
      const s = it(a.value[0], t.weekStart), oe2 = a.value[1] ? it(a.value[1], t.weekStart) : [];
      return [s.map((M) => U(M)), oe2.map((M) => U(M))];
    }
    return it(a.value, t.weekStart).map((s) => U(s));
  }, se = (s, oe2) => de(Ye(u(s)), false, oe2), f = (s) => {
    const oe2 = I();
    return s ? oe2 : e("update:model-value", I());
  }, T = (s = false) => (s || z(), t.monthPicker ? se(O, s) : t.timePicker ? se(N, s) : t.yearPicker ? se(getYear, s) : t.weekPicker ? f(s) : de(fe(s), true, s));
  return {
    inputValue: L,
    internalModelValue: a,
    checkBeforeEmit: () => a.value ? c.value.enabled ? c.value.partialRange ? a.value.length >= 1 : a.value.length === 2 : !!a.value : false,
    parseExternalModelValue: _,
    formatInputValue: z,
    emitModelValue: T
  };
};
var Kl = (e, t) => {
  const { defaultedFilters: l, propDates: a } = Ce(e), { validateMonthYearInRange: n } = kt(e), c = (m, E) => {
    let b = m;
    return l.value.months.includes(getMonth(b)) ? (b = E ? addMonths(m, 1) : subMonths(m, 1), c(b, E)) : b;
  }, v = (m, E) => {
    let b = m;
    return l.value.years.includes(getYear(b)) ? (b = E ? addYears(m, 1) : subYears(m, 1), v(b, E)) : b;
  }, h3 = (m, E = false) => {
    const b = set(U(), { month: e.month, year: e.year });
    let C = m ? addMonths(b, 1) : subMonths(b, 1);
    e.disableYearSelect && (C = setYear(C, e.year));
    let H = getMonth(C), N = getYear(C);
    l.value.months.includes(H) && (C = c(C, m), H = getMonth(C), N = getYear(C)), l.value.years.includes(N) && (C = v(C, m), N = getYear(C)), n(H, N, m, e.preventMinMaxNavigation) && i(H, N, E);
  }, i = (m, E, b) => {
    t("update-month-year", { month: m, year: E, fromNav: b });
  }, L = computed(() => (m) => Cn(
    set(U(), { month: e.month, year: e.year }),
    a.value.maxDate,
    a.value.minDate,
    e.preventMinMaxNavigation,
    m
  ));
  return { handleMonthYearChange: h3, isDisabled: L, updateMonthYear: i };
};
var ca = {
  multiCalendars: { type: [Boolean, Number, String, Object], default: void 0 },
  modelValue: { type: [String, Date, Array, Object, Number], default: null },
  modelType: { type: String, default: null },
  position: { type: String, default: "center" },
  dark: { type: Boolean, default: false },
  format: {
    type: [String, Function],
    default: () => null
  },
  autoPosition: { type: Boolean, default: true },
  altPosition: { type: Function, default: null },
  transitions: { type: [Boolean, Object], default: true },
  formatLocale: { type: Object, default: null },
  utc: { type: [Boolean, String], default: false },
  ariaLabels: { type: Object, default: () => ({}) },
  offset: { type: [Number, String], default: 10 },
  hideNavigation: { type: Array, default: () => [] },
  timezone: { type: [String, Object], default: null },
  emitTimezone: { type: String, default: null },
  vertical: { type: Boolean, default: false },
  disableMonthYearSelect: { type: Boolean, default: false },
  disableYearSelect: { type: Boolean, default: false },
  menuClassName: { type: String, default: null },
  dayClass: {
    type: Function,
    default: null
  },
  yearRange: { type: Array, default: () => [1900, 2100] },
  calendarCellClassName: { type: String, default: null },
  enableTimePicker: { type: Boolean, default: true },
  autoApply: { type: Boolean, default: false },
  disabledDates: { type: [Array, Function], default: () => [] },
  monthNameFormat: { type: String, default: "short" },
  startDate: { type: [Date, String], default: null },
  startTime: { type: [Object, Array], default: null },
  hideOffsetDates: { type: Boolean, default: false },
  autoRange: { type: [Number, String], default: null },
  noToday: { type: Boolean, default: false },
  disabledWeekDays: { type: Array, default: () => [] },
  allowedDates: { type: Array, default: null },
  nowButtonLabel: { type: String, default: "Now" },
  markers: { type: Array, default: () => [] },
  escClose: { type: Boolean, default: true },
  spaceConfirm: { type: Boolean, default: true },
  monthChangeOnArrows: { type: Boolean, default: true },
  presetDates: { type: Array, default: () => [] },
  flow: { type: Array, default: () => [] },
  partialFlow: { type: Boolean, default: false },
  preventMinMaxNavigation: { type: Boolean, default: false },
  minRange: { type: [Number, String], default: null },
  maxRange: { type: [Number, String], default: null },
  multiDatesLimit: { type: [Number, String], default: null },
  reverseYears: { type: Boolean, default: false },
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
  disableTimeRangeValidation: { type: Boolean, default: false },
  highlight: {
    type: [Function, Object],
    default: null
  },
  teleport: { type: [Boolean, String, Object], default: null },
  teleportCenter: { type: Boolean, default: false },
  locale: { type: String, default: "en-Us" },
  weekNumName: { type: String, default: "W" },
  weekStart: { type: [Number, String], default: 1 },
  weekNumbers: {
    type: [String, Function, Object],
    default: null
  },
  calendarClassName: { type: String, default: null },
  monthChangeOnScroll: { type: [Boolean, String], default: true },
  dayNames: {
    type: [Function, Array],
    default: null
  },
  monthPicker: { type: Boolean, default: false },
  customProps: { type: Object, default: null },
  yearPicker: { type: Boolean, default: false },
  modelAuto: { type: Boolean, default: false },
  selectText: { type: String, default: "Select" },
  cancelText: { type: String, default: "Cancel" },
  previewFormat: {
    type: [String, Function],
    default: () => ""
  },
  multiDates: { type: [Object, Boolean], default: false },
  partialRange: { type: Boolean, default: true },
  ignoreTimeValidation: { type: Boolean, default: false },
  minDate: { type: [Date, String], default: null },
  maxDate: { type: [Date, String], default: null },
  minTime: { type: Object, default: null },
  maxTime: { type: Object, default: null },
  name: { type: String, default: null },
  placeholder: { type: String, default: "" },
  hideInputIcon: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  state: { type: Boolean, default: null },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: "off" },
  inputClassName: { type: String, default: null },
  fixedStart: { type: Boolean, default: false },
  fixedEnd: { type: Boolean, default: false },
  timePicker: { type: Boolean, default: false },
  enableSeconds: { type: Boolean, default: false },
  is24: { type: Boolean, default: true },
  noHoursOverlay: { type: Boolean, default: false },
  noMinutesOverlay: { type: Boolean, default: false },
  noSecondsOverlay: { type: Boolean, default: false },
  hoursGridIncrement: { type: [String, Number], default: 1 },
  minutesGridIncrement: { type: [String, Number], default: 5 },
  secondsGridIncrement: { type: [String, Number], default: 5 },
  hoursIncrement: { type: [Number, String], default: 1 },
  minutesIncrement: { type: [Number, String], default: 1 },
  secondsIncrement: { type: [Number, String], default: 1 },
  range: { type: [Boolean, Object], default: false },
  uid: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  inline: { type: [Boolean, Object], default: false },
  textInput: { type: [Boolean, Object], default: false },
  noDisabledRange: { type: Boolean, default: false },
  sixWeeks: { type: [Boolean, String], default: false },
  actionRow: { type: Object, default: () => ({}) },
  focusStartDate: { type: Boolean, default: false },
  disabledTimes: { type: [Function, Array], default: void 0 },
  showLastInRange: { type: Boolean, default: true },
  timePickerInline: { type: Boolean, default: false },
  calendar: { type: Function, default: null },
  config: { type: Object, default: void 0 },
  quarterPicker: { type: Boolean, default: false },
  yearFirst: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  onInternalModelChange: { type: [Function, Object], default: null },
  enableMinutes: { type: Boolean, default: true },
  ui: { type: Object, default: () => ({}) }
};
var rt = {
  ...ca,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  noOverlayFocus: { type: Boolean, default: false },
  collapse: { type: Boolean, default: false },
  menuWrapRef: { type: Object, default: null },
  getInputRect: { type: Function, default: () => ({}) },
  isTextInputDate: { type: Boolean, default: false }
};
var Gl = ["title"];
var Ql = ["disabled"];
var ql = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...rt
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: t }) {
    const l = t, a = e, {
      defaultedActionRow: n,
      defaultedPreviewFormat: c,
      defaultedMultiCalendars: v,
      defaultedTextInput: h3,
      defaultedInline: i,
      defaultedRange: L,
      defaultedMultiDates: m,
      getDefaultPattern: E
    } = Ce(a), { isTimeValid: b, isMonthValid: C } = kt(a), { buildMatrix: H } = bt(), N = ref(null), O = ref(null), y = ref(false), F = ref({}), S = ref(null), X = ref(null);
    onMounted(() => {
      a.arrowNavigation && H([Ie(N), Ie(O)], "actionRow"), J(), window.addEventListener("resize", J);
    }), onUnmounted(() => {
      window.removeEventListener("resize", J);
    });
    const J = () => {
      y.value = false, setTimeout(() => {
        var o, z;
        const A = (o = S.value) == null ? void 0 : o.getBoundingClientRect(), k = (z = X.value) == null ? void 0 : z.getBoundingClientRect();
        A && k && (F.value.maxWidth = `${k.width - A.width - 20}px`), y.value = true;
      }, 0);
    }, le = computed(() => L.value.enabled && !L.value.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), Q = computed(
      () => !b.value(a.internalModelValue) || !C.value(a.internalModelValue) || !le.value
    ), P = () => {
      const A = c.value;
      return a.timePicker || a.monthPicker, A(Ye(a.internalModelValue));
    }, re = () => {
      const A = a.internalModelValue;
      return v.value.count > 0 ? `${B(A[0])} - ${B(A[1])}` : [B(A[0]), B(A[1])];
    }, B = (A) => _n(
      A,
      c.value,
      a.formatLocale,
      h3.value.rangeSeparator,
      a.modelAuto,
      E()
    ), j = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof c.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? re() : m.value.enabled ? a.internalModelValue.map((A) => `${B(A)}`) : a.modelAuto ? `${B(a.internalModelValue[0])}` : `${B(a.internalModelValue[0])} -` : B(a.internalModelValue) : P()), fe = () => m.value.enabled ? "; " : " - ", ce = computed(
      () => Array.isArray(j.value) ? j.value.join(fe()) : j.value
    ), _ = () => {
      b.value(a.internalModelValue) && C.value(a.internalModelValue) && le.value ? l("select-date") : l("invalid-select");
    };
    return (A, k) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: X,
      class: "dp__action_row"
    }, [
      A.$slots["action-row"] ? renderSlot(A.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: A.internalModelValue,
        disabled: Q.value,
        selectDate: () => A.$emit("select-date"),
        closePicker: () => A.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(n).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: ce.value,
          style: normalizeStyle(F.value)
        }, [
          A.$slots["action-preview"] && y.value ? renderSlot(A.$slots, "action-preview", {
            key: 0,
            value: A.internalModelValue
          }) : createCommentVNode("", true),
          !A.$slots["action-preview"] && y.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(ce.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, Gl)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: S,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          A.$slots["action-buttons"] ? renderSlot(A.$slots, "action-buttons", {
            key: 0,
            value: A.internalModelValue
          }) : createCommentVNode("", true),
          A.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(i).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: N,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: k[0] || (k[0] = (o) => A.$emit("close-picker")),
              onKeydown: k[1] || (k[1] = (o) => unref(qe)(o, () => A.$emit("close-picker")))
            }, toDisplayString(A.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: k[2] || (k[2] = (o) => A.$emit("select-now")),
              onKeydown: k[3] || (k[3] = (o) => unref(qe)(o, () => A.$emit("select-now")))
            }, toDisplayString(A.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: O,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: Q.value,
              "data-test": "select-button",
              onKeydown: k[4] || (k[4] = (o) => unref(qe)(o, () => _())),
              onClick: _
            }, toDisplayString(A.selectText), 41, Ql)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
});
var Xl = { class: "dp__selection_grid_header" };
var Jl = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"];
var Zl = ["aria-label"];
var qt = defineComponent({
  __name: "SelectionOverlay",
  props: {
    items: {},
    type: {},
    isLast: { type: Boolean },
    arrowNavigation: { type: Boolean },
    skipButtonRef: { type: Boolean },
    headerRefs: {},
    hideNavigation: {},
    escClose: { type: Boolean },
    useRelative: { type: Boolean },
    height: {},
    textInput: { type: [Boolean, Object] },
    config: {},
    noOverlayFocus: { type: Boolean },
    focusValue: {},
    menuWrapRef: {},
    ariaLabels: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e, { expose: t, emit: l }) {
    const { setSelectionGrid: a, buildMultiLevelMatrix: n, setMonthPicker: c } = bt(), v = l, h3 = e, { defaultedAriaLabels: i, defaultedTextInput: L, defaultedConfig: m } = Ce(
      h3
    ), { hideNavigationButtons: E } = ma(), b = ref(false), C = ref(null), H = ref(null), N = ref([]), O = ref(), y = ref(null), F = ref(0), S = ref(null);
    onBeforeUpdate(() => {
      C.value = null;
    }), onMounted(() => {
      nextTick().then(() => j()), h3.noOverlayFocus || J(), X(true);
    }), onUnmounted(() => X(false));
    const X = (u) => {
      var I;
      h3.arrowNavigation && ((I = h3.headerRefs) != null && I.length ? c(u) : a(u));
    }, J = () => {
      var I;
      const u = Ie(H);
      u && (L.value.enabled || (C.value ? (I = C.value) == null || I.focus({ preventScroll: true }) : u.focus({ preventScroll: true })), b.value = u.clientHeight < u.scrollHeight);
    }, le = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !h3.useRelative,
        "dp--overlay-relative": h3.useRelative
      })
    ), Q = computed(
      () => h3.useRelative ? { height: `${h3.height}px`, width: "260px" } : void 0
    ), P = computed(() => ({
      dp__overlay_col: true
    })), re = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: b.value,
        dp__button_bottom: h3.isLast
      })
    ), B = computed(() => {
      var u, I;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((u = h3.items) == null ? void 0 : u.length) <= 6,
        dp__container_block: ((I = h3.items) == null ? void 0 : I.length) > 6
      };
    });
    watch(
      () => h3.items,
      () => j(false),
      { deep: true }
    );
    const j = (u = true) => {
      nextTick().then(() => {
        const I = Ie(C), se = Ie(H), f = Ie(y), T = Ie(S), G = f ? f.getBoundingClientRect().height : 0;
        se && (se.getBoundingClientRect().height ? F.value = se.getBoundingClientRect().height - G : F.value = m.value.modeHeight - G), I && T && u && (T.scrollTop = I.offsetTop - T.offsetTop - (F.value / 2 - I.getBoundingClientRect().height) - G);
      });
    }, fe = (u) => {
      u.disabled || v("selected", u.value);
    }, ce = () => {
      v("toggle"), v("reset-flow");
    }, _ = () => {
      h3.escClose && ce();
    }, A = (u, I, se, f) => {
      u && ((I.active || I.value === h3.focusValue) && (C.value = u), h3.arrowNavigation && (Array.isArray(N.value[se]) ? N.value[se][f] = u : N.value[se] = [u], k()));
    }, k = () => {
      var I, se;
      const u = (I = h3.headerRefs) != null && I.length ? [h3.headerRefs].concat(N.value) : N.value.concat([h3.skipButtonRef ? [] : [y.value]]);
      n(Ye(u), (se = h3.headerRefs) != null && se.length ? "monthPicker" : "selectionGrid");
    }, o = (u) => {
      h3.arrowNavigation || yt(u, m.value, true);
    }, z = (u) => {
      O.value = u, v("hover-value", u);
    }, D = () => {
      if (ce(), !h3.isLast) {
        const u = bl(h3.menuWrapRef ?? null, "action-row");
        if (u) {
          const I = $n(u);
          I == null || I.focus();
        }
      }
    }, ee = (u) => {
      switch (u.key) {
        case Re.esc:
          return _();
        case Re.arrowLeft:
          return o(u);
        case Re.arrowRight:
          return o(u);
        case Re.arrowUp:
          return o(u);
        case Re.arrowDown:
          return o(u);
        default:
          return;
      }
    }, de = (u) => {
      if (u.key === Re.enter)
        return ce();
      if (u.key === Re.tab)
        return D();
    };
    return t({ focusGrid: J }), (u, I) => {
      var se;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: H,
        class: normalizeClass(le.value),
        style: normalizeStyle(Q.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: ee,
        onClick: I[0] || (I[0] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: S,
          class: normalizeClass(B.value),
          role: "grid",
          style: normalizeStyle({ "--dp-overlay-height": `${F.value}px` })
        }, [
          createBaseVNode("div", Xl, [
            renderSlot(u.$slots, "header")
          ]),
          u.$slots.overlay ? renderSlot(u.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(u.items, (f, T) => (openBlock(), createElementBlock("div", {
            key: T,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: u.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(f, (G, s) => (openBlock(), createElementBlock("div", {
              key: G.value,
              ref_for: true,
              ref: (oe2) => A(oe2, G, T, s),
              role: "gridcell",
              class: normalizeClass(P.value),
              "aria-selected": G.active || void 0,
              "aria-disabled": G.disabled || void 0,
              tabindex: "0",
              "data-test": G.text,
              onClick: withModifiers((oe2) => fe(G), ["prevent"]),
              onKeydown: (oe2) => unref(qe)(oe2, () => fe(G), true),
              onMouseover: (oe2) => z(G.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(G.className)
              }, [
                u.$slots.item ? renderSlot(u.$slots, "item", {
                  key: 0,
                  item: G
                }) : createCommentVNode("", true),
                u.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(G.text), 1)
                ], 64))
              ], 2)
            ], 42, Jl))), 128))
          ], 2))), 128))
        ], 6),
        u.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: y,
          type: "button",
          "aria-label": (se = unref(i)) == null ? void 0 : se.toggleOverlay,
          class: normalizeClass(re.value),
          tabindex: "0",
          onClick: ce,
          onKeydown: de
        }, [
          renderSlot(u.$slots, "button-icon")
        ], 42, Zl)), [
          [vShow, !unref(E)(u.hideNavigation, u.type)]
        ]) : createCommentVNode("", true)
      ], 38);
    };
  }
});
var fa = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean },
    collapse: { type: Boolean }
  },
  setup(e) {
    const t = e, l = computed(
      () => t.multiCalendars > 0 ? [...Array(t.multiCalendars).keys()] : [0]
    ), a = computed(() => ({
      dp__instance_calendar: t.multiCalendars > 0
    }));
    return (n, c) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !n.stretch,
        "dp--menu--inner-stretched": n.stretch,
        dp__flex_display: n.multiCalendars > 0,
        "dp--flex-display-collapsed": n.collapse
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (v, h3) => (openBlock(), createElementBlock("div", {
        key: v,
        class: normalizeClass(a.value)
      }, [
        renderSlot(n.$slots, "default", {
          instance: v,
          index: h3
        })
      ], 2))), 128))
    ], 2));
  }
});
var xl = ["aria-label", "aria-disabled"];
var Wt = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: t }) {
    const l = t, a = ref(null);
    return onMounted(() => l("set-ref", a)), (n, c) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: a,
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": n.ariaLabel,
      "aria-disabled": n.disabled || void 0,
      onClick: c[0] || (c[0] = (v) => n.$emit("activate")),
      onKeydown: c[1] || (c[1] = (v) => unref(qe)(v, () => n.$emit("activate"), true))
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: n.disabled }])
      }, [
        renderSlot(n.$slots, "default")
      ], 2)
    ], 40, xl));
  }
});
var er = { class: "dp--year-mode-picker" };
var tr = ["aria-label", "data-test"];
var In = defineComponent({
  __name: "YearModePicker",
  props: {
    ...rt,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e, { emit: t }) {
    const l = t, a = e, { showRightIcon: n, showLeftIcon: c } = ma(), { defaultedConfig: v, defaultedMultiCalendars: h3, defaultedAriaLabels: i, defaultedTransitions: L, defaultedUI: m } = Ce(a), { showTransition: E, transitionName: b } = Xt(L), C = (O = false, y) => {
      l("toggle-year-picker", { flow: O, show: y });
    }, H = (O) => {
      l("year-select", O);
    }, N = (O = false) => {
      l("handle-year", O);
    };
    return (O, y) => {
      var F, S, X, J, le;
      return openBlock(), createElementBlock("div", er, [
        unref(c)(unref(h3), e.instance) ? (openBlock(), createBlock(Wt, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": (F = unref(i)) == null ? void 0 : F.prevYear,
          disabled: e.isDisabled(false),
          class: normalizeClass((S = unref(m)) == null ? void 0 : S.navBtnPrev),
          onActivate: y[0] || (y[0] = (Q) => N(false))
        }, {
          default: withCtx(() => [
            O.$slots["arrow-left"] ? renderSlot(O.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
            O.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(La), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
        createBaseVNode("button", {
          ref: "mpYearButtonRef",
          class: "dp__btn dp--year-select",
          type: "button",
          "aria-label": (X = unref(i)) == null ? void 0 : X.openYearsOverlay,
          "data-test": `year-mode-btn-${e.instance}`,
          onClick: y[1] || (y[1] = () => C(false)),
          onKeydown: y[2] || (y[2] = withKeys(() => C(false), ["enter"]))
        }, [
          O.$slots.year ? renderSlot(O.$slots, "year", {
            key: 0,
            year: e.year
          }) : createCommentVNode("", true),
          O.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e.year), 1)
          ], 64))
        ], 40, tr),
        unref(n)(unref(h3), e.instance) ? (openBlock(), createBlock(Wt, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": (J = unref(i)) == null ? void 0 : J.nextYear,
          disabled: e.isDisabled(true),
          class: normalizeClass((le = unref(m)) == null ? void 0 : le.navBtnNext),
          onActivate: y[3] || (y[3] = (Q) => N(true))
        }, {
          default: withCtx(() => [
            O.$slots["arrow-right"] ? renderSlot(O.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
            O.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(b)(e.showYearPicker),
          css: unref(E)
        }, {
          default: withCtx(() => [
            e.showYearPicker ? (openBlock(), createBlock(qt, {
              key: 0,
              items: e.items,
              "text-input": O.textInput,
              "esc-close": O.escClose,
              config: O.config,
              "is-last": O.autoApply && !unref(v).keepActionRow,
              "hide-navigation": O.hideNavigation,
              "aria-labels": O.ariaLabels,
              type: "year",
              onToggle: C,
              onSelected: y[4] || (y[4] = (Q) => H(Q))
            }, createSlots({
              "button-icon": withCtx(() => [
                O.$slots["calendar-icon"] ? renderSlot(O.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                O.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
              ]),
              _: 2
            }, [
              O.$slots["year-overlay-value"] ? {
                name: "item",
                fn: withCtx(({ item: Q }) => [
                  renderSlot(O.$slots, "year-overlay-value", {
                    text: Q.text,
                    value: Q.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "text-input", "esc-close", "config", "is-last", "hide-navigation", "aria-labels"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var qa = (e, t, l) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((a) => De(e, a))) {
      const a = t.value.filter((n) => !De(n, e));
      t.value = a.length ? a : null;
    } else
      (l && +l > t.value.length || !l) && t.value.push(e);
  else
    t.value = [e];
};
var Xa = (e, t, l) => {
  let a = e.value ? e.value.slice() : [];
  return a.length === 2 && a[1] !== null && (a = []), a.length ? _e(t, a[0]) ? (a.unshift(t), l("range-start", a[0]), l("range-start", a[1])) : (a[1] = t, l("range-end", t)) : (a = [t], l("range-start", t)), a;
};
var va = (e, t, l, a) => {
  e && (e[0] && e[1] && l && t("auto-apply"), e[0] && !e[1] && a && l && t("auto-apply"));
};
var Nn = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => Ze(U(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = Ze(U(e.value), e.timezone));
};
var En = (e, t, l, a) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && a.value.partialRange) ? a.value.fixedStart && (Be(e, t.value[0]) || De(e, t.value[0])) ? [t.value[0], e] : a.value.fixedEnd && (_e(e, t.value[1]) || De(e, t.value[1])) ? [e, t.value[1]] : (l("invalid-fixed-range", e), t.value) : [];
var Fn = ({
  multiCalendars: e,
  range: t,
  highlight: l,
  propDates: a,
  calendars: n,
  modelValue: c,
  props: v,
  filters: h3,
  year: i,
  month: L,
  emit: m
}) => {
  const E = computed(() => ja(v.yearRange, v.locale, v.reverseYears)), b = ref([false]), C = computed(() => (B, j) => {
    const fe = set(lt(/* @__PURE__ */ new Date()), {
      month: L.value(B),
      year: i.value(B)
    }), ce = j ? endOfYear(fe) : startOfYear(fe);
    return Cn(
      ce,
      a.value.maxDate,
      a.value.minDate,
      v.preventMinMaxNavigation,
      j
    );
  }), H = () => Array.isArray(c.value) && e.value.solo && c.value[1], N = () => {
    for (let B = 0; B < e.value.count; B++)
      if (B === 0)
        n.value[B] = n.value[0];
      else if (B === e.value.count - 1 && H())
        n.value[B] = {
          month: getMonth(c.value[1]),
          year: getYear(c.value[1])
        };
      else {
        const j = set(U(), n.value[B - 1]);
        n.value[B] = { month: getMonth(j), year: getYear(addYears(j, 1)) };
      }
  }, O = (B) => {
    if (!B)
      return N();
    const j = set(U(), n.value[B]);
    return n.value[0].year = getYear(subYears(j, e.value.count - 1)), N();
  }, y = (B, j) => {
    const fe = differenceInYears(j, B);
    return t.value.showLastInRange && fe > 1 ? j : B;
  }, F = (B) => v.focusStartDate || e.value.solo ? B[0] : B[1] ? y(B[0], B[1]) : B[0], S = () => {
    if (c.value) {
      const B = Array.isArray(c.value) ? F(c.value) : c.value;
      n.value[0] = { month: getMonth(B), year: getYear(B) };
    }
  }, X = () => {
    S(), e.value.count && N();
  };
  watch(c, (B, j) => {
    v.isTextInputDate && JSON.stringify(B ?? {}) !== JSON.stringify(j ?? {}) && X();
  }), onMounted(() => {
    X();
  });
  const J = (B, j) => {
    n.value[j].year = B, m("update-month-year", { instance: j, year: B, month: n.value[j].month }), e.value.count && !e.value.solo && O(j);
  }, le = computed(() => (B) => Yt(E.value, (j) => {
    var A;
    const fe = i.value(B) === j.value, ce = Gt(
      j.value,
      It(a.value.minDate),
      It(a.value.maxDate)
    ) || ((A = h3.value.years) == null ? void 0 : A.includes(i.value(B))), _ = Qa(l.value, j.value);
    return { active: fe, disabled: ce, highlighted: _ };
  })), Q = (B, j) => {
    J(B, j), re(j);
  }, P = (B, j = false) => {
    if (!C.value(B, j)) {
      const fe = j ? i.value(B) + 1 : i.value(B) - 1;
      J(fe, B);
    }
  }, re = (B, j = false, fe) => {
    j || m("reset-flow"), fe !== void 0 ? b.value[B] = fe : b.value[B] = !b.value[B], b.value[B] ? m("overlay-toggle", { open: true, overlay: He.year }) : (m("overlay-closed"), m("overlay-toggle", { open: false, overlay: He.year }));
  };
  return {
    isDisabled: C,
    groupedYears: le,
    showYearPicker: b,
    selectYear: J,
    toggleYearPicker: re,
    handleYearSelect: Q,
    handleYear: P
  };
};
var ar = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: c,
    defaultedRange: v,
    defaultedHighlight: h3,
    propDates: i,
    defaultedTz: L,
    defaultedFilters: m,
    defaultedMultiDates: E
  } = Ce(e), b = () => {
    e.isTextInputDate && X(getYear(U(e.startDate)), 0);
  }, { modelValue: C, year: H, month: N, calendars: O } = Jt(e, t, b), y = computed(() => Dn(e.formatLocale, e.locale, e.monthNameFormat)), F = ref(null), { checkMinMaxRange: S } = kt(e), {
    selectYear: X,
    groupedYears: J,
    showYearPicker: le,
    toggleYearPicker: Q,
    handleYearSelect: P,
    handleYear: re,
    isDisabled: B
  } = Fn({
    modelValue: C,
    multiCalendars: l,
    range: v,
    highlight: h3,
    calendars: O,
    year: H,
    propDates: i,
    month: N,
    filters: m,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (C.value && e.focusStartDate || !C.value) && X(getYear(U(e.startDate)), 0);
  });
  const j = (T) => T ? { month: getMonth(T), year: getYear(T) } : { month: null, year: null }, fe = () => C.value ? Array.isArray(C.value) ? C.value.map((T) => j(T)) : j(C.value) : j(), ce = (T, G) => {
    const s = O.value[T], oe2 = fe();
    return Array.isArray(oe2) ? oe2.some((M) => M.year === (s == null ? void 0 : s.year) && M.month === G) : (s == null ? void 0 : s.year) === oe2.year && G === oe2.month;
  }, _ = (T, G, s) => {
    var M, me;
    const oe2 = fe();
    return Array.isArray(oe2) ? H.value(G) === ((M = oe2[s]) == null ? void 0 : M.year) && T === ((me = oe2[s]) == null ? void 0 : me.month) : false;
  }, A = (T, G) => {
    if (v.value.enabled) {
      const s = fe();
      if (Array.isArray(C.value) && Array.isArray(s)) {
        const oe2 = _(T, G, 0) || _(T, G, 1), M = dt(lt(U()), T, H.value(G));
        return da(C.value, F.value, M) && !oe2;
      }
      return false;
    }
    return false;
  }, k = computed(() => (T) => Yt(y.value, (G) => {
    var d;
    const s = ce(T, G.value), oe2 = Gt(
      G.value,
      Tn(H.value(T), i.value.minDate),
      Sn(H.value(T), i.value.maxDate)
    ) || Sl(i.value.disabledDates, H.value(T)).includes(G.value) || ((d = m.value.months) == null ? void 0 : d.includes(G.value)), M = A(G.value, T), me = On(h3.value, G.value, H.value(T));
    return { active: s, disabled: oe2, isBetween: M, highlighted: me };
  })), o = (T, G) => dt(lt(U()), T, H.value(G)), z = (T, G) => {
    const s = C.value ? C.value : lt(/* @__PURE__ */ new Date());
    C.value = dt(s, T, H.value(G)), t("auto-apply"), t("update-flow-step");
  }, D = (T, G) => {
    const s = o(T, G);
    v.value.fixedEnd || v.value.fixedStart ? C.value = En(s, C, t, v) : C.value ? S(s, C.value) && (C.value = Xa(C, o(T, G), t)) : C.value = [o(T, G)], nextTick().then(() => {
      va(C.value, t, e.autoApply, e.modelAuto);
    });
  }, ee = (T, G) => {
    qa(o(T, G), C, E.value.limit), t("auto-apply", true);
  }, de = (T, G) => (O.value[G].month = T, I(G, O.value[G].year, T), E.value.enabled ? ee(T, G) : v.value.enabled ? D(T, G) : z(T, G)), u = (T, G) => {
    X(T, G), I(G, T, null);
  }, I = (T, G, s) => {
    let oe2 = s;
    if (!oe2 && oe2 !== 0) {
      const M = fe();
      oe2 = Array.isArray(M) ? M[T].month : M.month;
    }
    t("update-month-year", { instance: T, year: G, month: oe2 });
  };
  return {
    groupedMonths: k,
    groupedYears: J,
    year: H,
    isDisabled: B,
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: c,
    showYearPicker: le,
    modelValue: C,
    presetDate: (T, G) => {
      Nn({
        value: T,
        modelValue: C,
        range: v.value.enabled,
        timezone: G ? void 0 : L.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (T, G) => {
      F.value = o(T, G);
    },
    selectMonth: de,
    selectYear: u,
    toggleYearPicker: Q,
    handleYearSelect: P,
    handleYear: re,
    getModelMonthYear: fe
  };
};
var nr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...rt
  },
  emits: [
    "update:internal-model-value",
    "overlay-closed",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year",
    "update-flow-step",
    "mount",
    "invalid-fixed-range",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = useSlots(), c = Je(n, "yearMode"), v = e;
    onMounted(() => {
      v.shadow || a("mount", null);
    });
    const {
      groupedMonths: h3,
      groupedYears: i,
      year: L,
      isDisabled: m,
      defaultedMultiCalendars: E,
      defaultedConfig: b,
      showYearPicker: C,
      modelValue: H,
      presetDate: N,
      setHoverDate: O,
      selectMonth: y,
      selectYear: F,
      toggleYearPicker: S,
      handleYearSelect: X,
      handleYear: J,
      getModelMonthYear: le
    } = ar(v, a);
    return t({ getSidebarProps: () => ({
      modelValue: H,
      year: L,
      getModelMonthYear: le,
      selectMonth: y,
      selectYear: F,
      handleYear: J
    }), presetDate: N, toggleYearPicker: (P) => S(0, P) }), (P, re) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(E).count,
      collapse: P.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: B }) => [
        P.$slots["top-extra"] ? renderSlot(P.$slots, "top-extra", {
          key: 0,
          value: P.internalModelValue
        }) : createCommentVNode("", true),
        P.$slots["month-year"] ? renderSlot(P.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(L),
          months: unref(h3)(B),
          years: unref(i)(B),
          selectMonth: unref(y),
          selectYear: unref(F),
          instance: B
        }))) : (openBlock(), createBlock(qt, {
          key: 2,
          items: unref(h3)(B),
          "arrow-navigation": P.arrowNavigation,
          "is-last": P.autoApply && !unref(b).keepActionRow,
          "esc-close": P.escClose,
          height: unref(b).modeHeight,
          config: P.config,
          "no-overlay-focus": !!(P.noOverlayFocus || P.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (j) => unref(y)(j, B),
          onHoverValue: (j) => unref(O)(j, B)
        }, createSlots({
          header: withCtx(() => [
            createVNode(In, mergeProps(P.$props, {
              items: unref(i)(B),
              instance: B,
              "show-year-picker": unref(C)[B],
              year: unref(L)(B),
              "is-disabled": (j) => unref(m)(B, j),
              onHandleYear: (j) => unref(J)(B, j),
              onYearSelect: (j) => unref(X)(j, B),
              onToggleYearPicker: (j) => unref(S)(B, j == null ? void 0 : j.flow, j == null ? void 0 : j.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(c), (j, fe) => ({
                name: j,
                fn: withCtx((ce) => [
                  renderSlot(P.$slots, j, normalizeProps(guardReactiveProps(ce)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          P.$slots["month-overlay-value"] ? {
            name: "item",
            fn: withCtx(({ item: j }) => [
              renderSlot(P.$slots, "month-overlay-value", {
                text: j.text,
                value: j.value
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "config", "no-overlay-focus", "onSelected", "onHoverValue"]))
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var lr = (e, t) => {
  const l = () => {
    e.isTextInputDate && (m.value = getYear(U(e.startDate)));
  }, { modelValue: a } = Jt(e, t, l), n = ref(null), { defaultedHighlight: c, defaultedMultiDates: v, defaultedFilters: h3, defaultedRange: i, propDates: L } = Ce(e), m = ref();
  onMounted(() => {
    e.startDate && (a.value && e.focusStartDate || !a.value) && (m.value = getYear(U(e.startDate)));
  });
  const E = (y) => Array.isArray(a.value) ? a.value.some((F) => getYear(F) === y) : a.value ? getYear(a.value) === y : false, b = (y) => i.value.enabled && Array.isArray(a.value) ? da(a.value, n.value, H(y)) : false, C = computed(() => Yt(ja(e.yearRange, e.locale, e.reverseYears), (y) => {
    const F = E(y.value), S = Gt(
      y.value,
      It(L.value.minDate),
      It(L.value.maxDate)
    ) || h3.value.years.includes(y.value), X = b(y.value) && !F, J = Qa(c.value, y.value);
    return { active: F, disabled: S, isBetween: X, highlighted: J };
  })), H = (y) => setYear(lt(startOfYear(/* @__PURE__ */ new Date())), y);
  return {
    groupedYears: C,
    modelValue: a,
    focusYear: m,
    setHoverValue: (y) => {
      n.value = setYear(lt(/* @__PURE__ */ new Date()), y);
    },
    selectYear: (y) => {
      var F;
      if (t("update-month-year", { instance: 0, year: y }), v.value.enabled)
        return a.value ? Array.isArray(a.value) && (((F = a.value) == null ? void 0 : F.map((X) => getYear(X))).includes(y) ? a.value = a.value.filter((X) => getYear(X) !== y) : a.value.push(setYear(Ke(U()), y))) : a.value = [setYear(Ke(startOfYear(U())), y)], t("auto-apply", true);
      i.value.enabled ? (a.value = Xa(a, H(y), t), nextTick().then(() => {
        va(a.value, t, e.autoApply, e.modelAuto);
      })) : (a.value = H(y), t("auto-apply"));
    }
  };
};
var rr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...rt
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, { groupedYears: c, modelValue: v, focusYear: h3, selectYear: i, setHoverValue: L } = lr(n, a), { defaultedConfig: m } = Ce(n);
    return t({ getSidebarProps: () => ({
      modelValue: v,
      selectYear: i
    }) }), (b, C) => (openBlock(), createElementBlock("div", null, [
      b.$slots["top-extra"] ? renderSlot(b.$slots, "top-extra", {
        key: 0,
        value: b.internalModelValue
      }) : createCommentVNode("", true),
      b.$slots["month-year"] ? renderSlot(b.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(c),
        selectYear: unref(i)
      }))) : (openBlock(), createBlock(qt, {
        key: 2,
        items: unref(c),
        "is-last": b.autoApply && !unref(m).keepActionRow,
        height: unref(m).modeHeight,
        config: b.config,
        "no-overlay-focus": !!(b.noOverlayFocus || b.textInput),
        "focus-value": unref(h3),
        type: "year",
        "use-relative": "",
        onSelected: unref(i),
        onHoverValue: unref(L)
      }, createSlots({ _: 2 }, [
        b.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: H }) => [
            renderSlot(b.$slots, "year-overlay-value", {
              text: H.text,
              value: H.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
});
var or = {
  key: 0,
  class: "dp__time_input"
};
var sr = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var ur = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var ir = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var dr = ["aria-label", "disabled", "data-test", "onKeydown", "onClick"];
var cr = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var fr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var vr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var mr = { key: 0 };
var gr = ["aria-label"];
var yr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimeInput",
  props: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    closeTimePickerBtn: { type: Object, default: null },
    order: { type: Number, default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: { type: Function, default: () => false },
    ...rt
  },
  emits: [
    "set-hours",
    "set-minutes",
    "update:hours",
    "update:minutes",
    "update:seconds",
    "reset-flow",
    "mounted",
    "overlay-closed",
    "overlay-opened",
    "am-pm-change"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, { setTimePickerElements: c, setTimePickerBackRef: v } = bt(), { defaultedAriaLabels: h3, defaultedTransitions: i, defaultedFilters: L, defaultedConfig: m, defaultedRange: E } = Ce(n), { transitionName: b, showTransition: C } = Xt(i), H = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), N = ref("AM"), O = ref(null), y = ref([]), F = ref();
    onMounted(() => {
      a("mounted");
    });
    const S = (d) => set(/* @__PURE__ */ new Date(), {
      hours: d.hours,
      minutes: d.minutes,
      seconds: n.enableSeconds ? d.seconds : 0,
      milliseconds: 0
    }), X = computed(
      () => (d) => k(d, n[d]) || le(d, n[d])
    ), J = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), le = (d, Y) => E.value.enabled && !E.value.disableTimeRangeValidation ? !n.validateTime(d, Y) : false, Q = (d, Y) => {
      if (E.value.enabled && !E.value.disableTimeRangeValidation) {
        const V = Y ? +n[`${d}Increment`] : -+n[`${d}Increment`], R = n[d] + V;
        return !n.validateTime(d, R);
      }
      return false;
    }, P = computed(() => (d) => !de(+n[d] + +n[`${d}Increment`], d) || Q(d, true)), re = computed(() => (d) => !de(+n[d] - +n[`${d}Increment`], d) || Q(d, false)), B = (d, Y) => add(set(U(), d), Y), j = (d, Y) => sub(set(U(), d), Y), fe = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })
    ), ce = computed(() => {
      const d = [{ type: "hours" }];
      return n.enableMinutes && d.push({ type: "", separator: true }, {
        type: "minutes"
      }), n.enableSeconds && d.push({ type: "", separator: true }, {
        type: "seconds"
      }), d;
    }), _ = computed(() => ce.value.filter((d) => !d.separator)), A = computed(() => (d) => {
      if (d === "hours") {
        const Y = G(+n.hours);
        return { text: Y < 10 ? `0${Y}` : `${Y}`, value: Y };
      }
      return { text: n[d] < 10 ? `0${n[d]}` : `${n[d]}`, value: n[d] };
    }), k = (d, Y) => {
      var R;
      if (!n.disabledTimesConfig)
        return false;
      const V = n.disabledTimesConfig(n.order, d === "hours" ? Y : void 0);
      return V[d] ? !!((R = V[d]) != null && R.includes(Y)) : true;
    }, o = (d, Y) => Y !== "hours" || N.value === "AM" ? d : d + 12, z = (d) => {
      const Y = n.is24 ? 24 : 12, V = d === "hours" ? Y : 60, R = +n[`${d}GridIncrement`], te = d === "hours" && !n.is24 ? R : 0, ue = [];
      for (let w = te; w < V; w += R)
        ue.push({ value: n.is24 ? w : o(w, d), text: w < 10 ? `0${w}` : `${w}` });
      return d === "hours" && !n.is24 && ue.unshift({ value: N.value === "PM" ? 12 : 0, text: "12" }), Yt(ue, (w) => ({ active: false, disabled: L.value.times[d].includes(w.value) || !de(w.value, d) || k(d, w.value) || le(d, w.value) }));
    }, D = (d) => d >= 0 ? d : 59, ee = (d) => d >= 0 ? d : 23, de = (d, Y) => {
      const V = n.minTime ? S(Aa(n.minTime)) : null, R = n.maxTime ? S(Aa(n.maxTime)) : null, te = S(
        Aa(
          J.value,
          Y,
          Y === "minutes" || Y === "seconds" ? D(d) : ee(d)
        )
      );
      return V && R ? (isBefore(te, R) || isEqual(te, R)) && (isAfter(te, V) || isEqual(te, V)) : V ? isAfter(te, V) || isEqual(te, V) : R ? isBefore(te, R) || isEqual(te, R) : true;
    }, u = (d) => n[`no${d[0].toUpperCase() + d.slice(1)}Overlay`], I = (d) => {
      u(d) || (H[d] = !H[d], H[d] ? a("overlay-opened", d) : a("overlay-closed", d));
    }, se = (d) => d === "hours" ? getHours : d === "minutes" ? getMinutes : getSeconds, f = () => {
      F.value && clearTimeout(F.value);
    }, T = (d, Y = true, V) => {
      const R = Y ? B : j, te = Y ? +n[`${d}Increment`] : -+n[`${d}Increment`];
      de(+n[d] + te, d) && a(
        `update:${d}`,
        se(d)(R({ [d]: +n[d] }, { [d]: +n[`${d}Increment`] }))
      ), !(V != null && V.keyboard) && m.value.timeArrowHoldThreshold && (F.value = setTimeout(() => {
        T(d, Y);
      }, m.value.timeArrowHoldThreshold));
    }, G = (d) => n.is24 ? d : (d >= 12 ? N.value = "PM" : N.value = "AM", ml(d)), s = () => {
      N.value === "PM" ? (N.value = "AM", a("update:hours", n.hours - 12)) : (N.value = "PM", a("update:hours", n.hours + 12)), a("am-pm-change", N.value);
    }, oe2 = (d) => {
      H[d] = true;
    }, M = (d, Y, V) => {
      if (d && n.arrowNavigation) {
        Array.isArray(y.value[Y]) ? y.value[Y][V] = d : y.value[Y] = [d];
        const R = y.value.reduce(
          (te, ue) => ue.map((w, x) => [...te[x] || [], ue[x]]),
          []
        );
        v(n.closeTimePickerBtn), O.value && (R[1] = R[1].concat(O.value)), c(R, n.order);
      }
    }, me = (d, Y) => (I(d), a(`update:${d}`, Y));
    return t({ openChildCmp: oe2 }), (d, Y) => {
      var V;
      return d.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", or, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(ce.value, (R, te) => {
          var ue, w, x;
          return openBlock(), createElementBlock("div", {
            key: te,
            class: normalizeClass(fe.value)
          }, [
            R.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (pe) => M(pe, te, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !d.timePickerInline,
                  dp__inc_dec_button_inline: d.timePickerInline,
                  dp__tp_inline_btn_top: d.timePickerInline,
                  dp__inc_dec_button_disabled: P.value(R.type)
                }),
                "data-test": `${R.type}-time-inc-btn-${n.order}`,
                "aria-label": (ue = unref(h3)) == null ? void 0 : ue.incrementValue(R.type),
                tabindex: "0",
                onKeydown: (pe) => unref(qe)(pe, () => T(R.type, true, { keyboard: true }), true),
                onClick: (pe) => unref(m).timeArrowHoldThreshold ? void 0 : T(R.type, true),
                onMousedown: (pe) => unref(m).timeArrowHoldThreshold ? T(R.type, true) : void 0,
                onMouseup: f
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  d.$slots["tp-inline-arrow-up"] ? renderSlot(d.$slots, "tp-inline-arrow-up", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    ur,
                    ir
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  d.$slots["arrow-up"] ? renderSlot(d.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  d.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
                ], 64))
              ], 42, sr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (pe) => M(pe, te, 1),
                type: "button",
                "aria-label": (w = unref(h3)) == null ? void 0 : w.openTpOverlay(R.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !d.timePickerInline,
                  dp__time_display_inline: d.timePickerInline,
                  "dp--time-invalid": X.value(R.type),
                  "dp--time-overlay-btn": !X.value(R.type)
                }),
                disabled: u(R.type),
                tabindex: "0",
                "data-test": `${R.type}-toggle-overlay-btn-${n.order}`,
                onKeydown: (pe) => unref(qe)(pe, () => I(R.type), true),
                onClick: (pe) => I(R.type)
              }, [
                d.$slots[R.type] ? renderSlot(d.$slots, R.type, {
                  key: 0,
                  text: A.value(R.type).text,
                  value: A.value(R.type).value
                }) : createCommentVNode("", true),
                d.$slots[R.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(A.value(R.type).text), 1)
                ], 64))
              ], 42, dr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (pe) => M(pe, te, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !d.timePickerInline,
                  dp__inc_dec_button_inline: d.timePickerInline,
                  dp__tp_inline_btn_bottom: d.timePickerInline,
                  dp__inc_dec_button_disabled: re.value(R.type)
                }),
                "data-test": `${R.type}-time-dec-btn-${n.order}`,
                "aria-label": (x = unref(h3)) == null ? void 0 : x.decrementValue(R.type),
                tabindex: "0",
                onKeydown: (pe) => unref(qe)(pe, () => T(R.type, false, { keyboard: true }), true),
                onClick: (pe) => unref(m).timeArrowHoldThreshold ? void 0 : T(R.type, false),
                onMousedown: (pe) => unref(m).timeArrowHoldThreshold ? T(R.type, false) : void 0,
                onMouseup: f
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  d.$slots["tp-inline-arrow-down"] ? renderSlot(d.$slots, "tp-inline-arrow-down", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    fr,
                    vr
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  d.$slots["arrow-down"] ? renderSlot(d.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  d.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
                ], 64))
              ], 42, cr)
            ], 64))
          ], 2);
        }), 128)),
        d.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", mr, [
          d.$slots["am-pm-button"] ? renderSlot(d.$slots, "am-pm-button", {
            key: 0,
            toggle: s,
            value: N.value
          }) : createCommentVNode("", true),
          d.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: O,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (V = unref(h3)) == null ? void 0 : V.amPmButton,
            tabindex: "0",
            onClick: s,
            onKeydown: Y[0] || (Y[0] = (R) => unref(qe)(R, () => s(), true))
          }, toDisplayString(N.value), 41, gr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_.value, (R, te) => (openBlock(), createBlock(Transition, {
          key: te,
          name: unref(b)(H[R.type]),
          css: unref(C)
        }, {
          default: withCtx(() => [
            H[R.type] ? (openBlock(), createBlock(qt, {
              key: 0,
              items: z(R.type),
              "is-last": d.autoApply && !unref(m).keepActionRow,
              "esc-close": d.escClose,
              type: R.type,
              "text-input": d.textInput,
              config: d.config,
              "arrow-navigation": d.arrowNavigation,
              "aria-labels": d.ariaLabels,
              onSelected: (ue) => me(R.type, ue),
              onToggle: (ue) => I(R.type),
              onResetFlow: Y[1] || (Y[1] = (ue) => d.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                d.$slots["clock-icon"] ? renderSlot(d.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                d.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(d.timePickerInline ? unref(Et) : unref(Ha)), { key: 1 }))
              ]),
              _: 2
            }, [
              d.$slots[`${R.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: ue }) => [
                  renderSlot(d.$slots, `${R.type}-overlay-value`, {
                    text: ue.text,
                    value: ue.value
                  })
                ]),
                key: "0"
              } : void 0,
              d.$slots[`${R.type}-overlay-header`] ? {
                name: "header",
                fn: withCtx(() => [
                  renderSlot(d.$slots, `${R.type}-overlay-header`, {
                    toggle: () => I(R.type)
                  })
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "aria-labels", "onSelected", "onToggle"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var pr = { class: "dp--tp-wrap" };
var hr = ["aria-label", "tabindex"];
var br = ["tabindex"];
var kr = ["aria-label"];
var Ln = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: {
      type: Function,
      default: () => false
    },
    ...rt
  },
  emits: [
    "update:hours",
    "update:minutes",
    "update:seconds",
    "mount",
    "reset-flow",
    "overlay-opened",
    "overlay-closed",
    "am-pm-change"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, { buildMatrix: c, setTimePicker: v } = bt(), h3 = useSlots(), { defaultedTransitions: i, defaultedAriaLabels: L, defaultedTextInput: m, defaultedConfig: E, defaultedRange: b } = Ce(n), { transitionName: C, showTransition: H } = Xt(i), { hideNavigationButtons: N } = ma(), O = ref(null), y = ref(null), F = ref([]), S = ref(null);
    onMounted(() => {
      a("mount"), !n.timePicker && n.arrowNavigation ? c([Ie(O.value)], "time") : v(true, n.timePicker);
    });
    const X = computed(() => b.value.enabled && n.modelAuto ? Mn(n.internalModelValue) : true), J = ref(false), le = (o) => ({
      hours: Array.isArray(n.hours) ? n.hours[o] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[o] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[o] : n.seconds
    }), Q = computed(() => {
      const o = [];
      if (b.value.enabled)
        for (let z = 0; z < 2; z++)
          o.push(le(z));
      else
        o.push(le(0));
      return o;
    }), P = (o, z = false, D = "") => {
      z || a("reset-flow"), J.value = o, a(o ? "overlay-opened" : "overlay-closed", He.time), n.arrowNavigation && v(o), nextTick(() => {
        D !== "" && F.value[0] && F.value[0].openChildCmp(D);
      });
    }, re = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !E.value.keepActionRow
    })), B = Je(h3, "timePicker"), j = (o, z, D) => b.value.enabled ? z === 0 ? [o, Q.value[1][D]] : [Q.value[0][D], o] : o, fe = (o) => {
      a("update:hours", o);
    }, ce = (o) => {
      a("update:minutes", o);
    }, _ = (o) => {
      a("update:seconds", o);
    }, A = () => {
      if (S.value && !m.value.enabled && !n.noOverlayFocus) {
        const o = $n(S.value);
        o && o.focus({ preventScroll: true });
      }
    }, k = (o) => {
      a("overlay-closed", o);
    };
    return t({ toggleTimePicker: P }), (o, z) => {
      var D;
      return openBlock(), createElementBlock("div", pr, [
        !o.timePicker && !o.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: O,
          type: "button",
          class: normalizeClass(re.value),
          "aria-label": (D = unref(L)) == null ? void 0 : D.openTimePicker,
          tabindex: o.noOverlayFocus ? void 0 : 0,
          "data-test": "open-time-picker-btn",
          onKeydown: z[0] || (z[0] = (ee) => unref(qe)(ee, () => P(true))),
          onClick: z[1] || (z[1] = (ee) => P(true))
        }, [
          o.$slots["clock-icon"] ? renderSlot(o.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          o.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ha), { key: 1 }))
        ], 42, hr)), [
          [vShow, !unref(N)(o.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(C)(J.value),
          css: unref(H) && !o.timePickerInline
        }, {
          default: withCtx(() => {
            var ee;
            return [
              J.value || o.timePicker || o.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: S,
                class: normalizeClass({
                  dp__overlay: !o.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !o.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle(o.timePicker ? { height: `${unref(E).modeHeight}px` } : void 0),
                tabindex: o.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    o.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  o.$slots["time-picker-overlay"] ? renderSlot(o.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: fe,
                    setMinutes: ce,
                    setSeconds: _
                  }) : createCommentVNode("", true),
                  o.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(o.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(Q.value, (de, u) => withDirectives((openBlock(), createBlock(yr, mergeProps({
                      key: u,
                      ref_for: true
                    }, {
                      ...o.$props,
                      order: u,
                      hours: de.hours,
                      minutes: de.minutes,
                      seconds: de.seconds,
                      closeTimePickerBtn: y.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: u === 0 ? o.fixedStart : o.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: F,
                      "validate-time": (I, se) => e.validateTime(I, j(se, u, I)),
                      "onUpdate:hours": (I) => fe(j(I, u, "hours")),
                      "onUpdate:minutes": (I) => ce(j(I, u, "minutes")),
                      "onUpdate:seconds": (I) => _(j(I, u, "seconds")),
                      onMounted: A,
                      onOverlayClosed: k,
                      onOverlayOpened: z[2] || (z[2] = (I) => o.$emit("overlay-opened", I)),
                      onAmPmChange: z[3] || (z[3] = (I) => o.$emit("am-pm-change", I))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(B), (I, se) => ({
                        name: I,
                        fn: withCtx((f) => [
                          renderSlot(o.$slots, I, mergeProps({ ref_for: true }, f))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, u === 0 ? true : X.value]
                    ])), 128))
                  ], 2)),
                  !o.timePicker && !o.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: y,
                    type: "button",
                    class: normalizeClass(re.value),
                    "aria-label": (ee = unref(L)) == null ? void 0 : ee.closeTimePicker,
                    tabindex: "0",
                    onKeydown: z[4] || (z[4] = (de) => unref(qe)(de, () => P(false))),
                    onClick: z[5] || (z[5] = (de) => P(false))
                  }, [
                    o.$slots["calendar-icon"] ? renderSlot(o.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    o.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                  ], 42, kr)), [
                    [vShow, !unref(N)(o.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, br)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var zn = (e, t, l, a) => {
  const { defaultedRange: n } = Ce(e), c = (S, X) => Array.isArray(t[S]) ? t[S][X] : t[S], v = (S) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[S] : t.seconds : 0, h3 = (S, X) => S ? X !== void 0 ? pt(S, c("hours", X), c("minutes", X), v(X)) : pt(S, t.hours, t.minutes, v()) : setSeconds(U(), v(X)), i = (S, X) => {
    t[S] = X;
  }, L = computed(() => e.modelAuto && n.value.enabled ? Array.isArray(l.value) ? l.value.length > 1 : false : n.value.enabled), m = (S, X) => {
    const J = Object.fromEntries(
      Object.keys(t).map((le) => le === S ? [le, X] : [le, t[le]].slice())
    );
    if (L.value && !n.value.disableTimeRangeValidation) {
      const le = (P) => l.value ? pt(
        l.value[P],
        J.hours[P],
        J.minutes[P],
        J.seconds[P]
      ) : null, Q = (P) => setMilliseconds(l.value[P], 0);
      return !(De(le(0), le(1)) && (isAfter(le(0), Q(1)) || isBefore(le(1), Q(0))));
    }
    return true;
  }, E = (S, X) => {
    m(S, X) && (i(S, X), a && a());
  }, b = (S) => {
    E("hours", S);
  }, C = (S) => {
    E("minutes", S);
  }, H = (S) => {
    E("seconds", S);
  }, N = (S, X, J, le) => {
    X && b(S), !X && !J && C(S), J && H(S), l.value && le(l.value);
  }, O = (S) => {
    if (S) {
      const X = Array.isArray(S), J = X ? [+S[0].hours, +S[1].hours] : +S.hours, le = X ? [+S[0].minutes, +S[1].minutes] : +S.minutes, Q = X ? [+S[0].seconds, +S[1].seconds] : +S.seconds;
      i("hours", J), i("minutes", le), e.enableSeconds && i("seconds", Q);
    }
  }, y = (S, X) => {
    const J = {
      hours: Array.isArray(t.hours) ? t.hours[S] : t.hours,
      disabledArr: []
    };
    return (X || X === 0) && (J.hours = X), Array.isArray(e.disabledTimes) && (J.disabledArr = n.value.enabled && Array.isArray(e.disabledTimes[S]) ? e.disabledTimes[S] : e.disabledTimes), J;
  }, F = computed(() => (S, X) => {
    var J;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: le, hours: Q } = y(S, X), P = le.filter((re) => +re.hours === Q);
      return ((J = P[0]) == null ? void 0 : J.minutes) === "*" ? { hours: [Q], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (P == null ? void 0 : P.map((re) => +re.minutes)) ?? [],
        seconds: (P == null ? void 0 : P.map((re) => re.seconds ? +re.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: i,
    updateHours: b,
    updateMinutes: C,
    updateSeconds: H,
    getSetDateTime: h3,
    updateTimeValues: N,
    getSecondsValue: v,
    assignStartTime: O,
    validateTime: m,
    disabledTimesConfig: F
  };
};
var wr = (e, t) => {
  const l = () => {
    e.isTextInputDate && X();
  }, { modelValue: a, time: n } = Jt(e, t, l), { defaultedStartTime: c, defaultedRange: v, defaultedTz: h3 } = Ce(e), { updateTimeValues: i, getSetDateTime: L, setTime: m, assignStartTime: E, disabledTimesConfig: b, validateTime: C } = zn(e, n, a, H);
  function H() {
    t("update-flow-step");
  }
  const N = (Q) => {
    const { hours: P, minutes: re, seconds: B } = Q;
    return { hours: +P, minutes: +re, seconds: B ? +B : 0 };
  }, O = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const P = N(e.startTime[0]), re = N(e.startTime[1]);
        return [set(U(), P), set(U(), re)];
      }
      const Q = N(e.startTime);
      return set(U(), Q);
    }
    return v.value.enabled ? [null, null] : null;
  }, y = () => {
    if (v.value.enabled) {
      const [Q, P] = O();
      a.value = [
        Ze(L(Q, 0), h3.value.timezone),
        Ze(L(P, 1), h3.value.timezone)
      ];
    } else
      a.value = Ze(L(O()), h3.value.timezone);
  }, F = (Q) => Array.isArray(Q) ? [St(U(Q[0])), St(U(Q[1]))] : [St(Q ?? U())], S = (Q, P, re) => {
    m("hours", Q), m("minutes", P), m("seconds", e.enableSeconds ? re : 0);
  }, X = () => {
    const [Q, P] = F(a.value);
    return v.value.enabled ? S(
      [Q.hours, P.hours],
      [Q.minutes, P.minutes],
      [Q.seconds, P.seconds]
    ) : S(Q.hours, Q.minutes, Q.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return E(c.value), a.value ? X() : y();
  });
  const J = () => {
    Array.isArray(a.value) ? a.value = a.value.map((Q, P) => Q && L(Q, P)) : a.value = L(a.value), t("time-update");
  };
  return {
    modelValue: a,
    time: n,
    disabledTimesConfig: b,
    updateTime: (Q, P = true, re = false) => {
      i(Q, P, re, J);
    },
    validateTime: C
  };
};
var Dr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...rt
  },
  emits: [
    "update:internal-model-value",
    "time-update",
    "am-pm-change",
    "mount",
    "reset-flow",
    "update-flow-step",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, c = useSlots(), v = Je(c, "timePicker"), h3 = ref(null), { time: i, modelValue: L, disabledTimesConfig: m, updateTime: E, validateTime: b } = wr(n, a);
    return onMounted(() => {
      n.shadow || a("mount", null);
    }), t({ getSidebarProps: () => ({
      modelValue: L,
      time: i,
      updateTime: E
    }), toggleTimePicker: (N, O = false, y = "") => {
      var F;
      (F = h3.value) == null || F.toggleTimePicker(N, O, y);
    } }), (N, O) => (openBlock(), createBlock(fa, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Ln, mergeProps({
          ref_key: "tpRef",
          ref: h3
        }, N.$props, {
          hours: unref(i).hours,
          minutes: unref(i).minutes,
          seconds: unref(i).seconds,
          "internal-model-value": N.internalModelValue,
          "disabled-times-config": unref(m),
          "validate-time": unref(b),
          "onUpdate:hours": O[0] || (O[0] = (y) => unref(E)(y)),
          "onUpdate:minutes": O[1] || (O[1] = (y) => unref(E)(y, false)),
          "onUpdate:seconds": O[2] || (O[2] = (y) => unref(E)(y, false, true)),
          onAmPmChange: O[3] || (O[3] = (y) => N.$emit("am-pm-change", y)),
          onResetFlow: O[4] || (O[4] = (y) => N.$emit("reset-flow")),
          onOverlayClosed: O[5] || (O[5] = (y) => N.$emit("overlay-toggle", { open: false, overlay: y })),
          onOverlayOpened: O[6] || (O[6] = (y) => N.$emit("overlay-toggle", { open: true, overlay: y }))
        }), createSlots({ _: 2 }, [
          renderList(unref(v), (y, F) => ({
            name: y,
            fn: withCtx((S) => [
              renderSlot(N.$slots, y, normalizeProps(guardReactiveProps(S)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
});
var Mr = { class: "dp--header-wrap" };
var $r = {
  key: 0,
  class: "dp__month_year_wrap"
};
var Ar = { key: 0 };
var Tr = { class: "dp__month_year_wrap" };
var Sr = ["aria-label", "data-test", "onClick", "onKeydown"];
var Pr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpHeader",
  props: {
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    instance: { type: Number, default: 0 },
    years: { type: Array, default: () => [] },
    months: { type: Array, default: () => [] },
    ...rt
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed", "overlay-opened"],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, {
      defaultedTransitions: c,
      defaultedAriaLabels: v,
      defaultedMultiCalendars: h3,
      defaultedFilters: i,
      defaultedConfig: L,
      defaultedHighlight: m,
      propDates: E,
      defaultedUI: b
    } = Ce(n), { transitionName: C, showTransition: H } = Xt(c), { buildMatrix: N } = bt(), { handleMonthYearChange: O, isDisabled: y, updateMonthYear: F } = Kl(n, a), { showLeftIcon: S, showRightIcon: X } = ma(), J = ref(false), le = ref(false), Q = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const P = (u) => ({
      get: () => n[u],
      set: (I) => {
        const se = u === nt.month ? nt.year : nt.month;
        a("update-month-year", { [u]: I, [se]: n[se] }), u === nt.month ? k(true) : o(true);
      }
    }), re = computed(P(nt.month)), B = computed(P(nt.year)), j = computed(() => (u) => ({
      month: n.month,
      year: n.year,
      items: u === nt.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: F,
      toggle: u === nt.month ? k : o
    })), fe = computed(() => {
      const u = n.months.find((I) => I.value === n.month);
      return u || { text: "", value: 0 };
    }), ce = computed(() => Yt(n.months, (u) => {
      const I = n.month === u.value, se = Gt(
        u.value,
        Tn(n.year, E.value.minDate),
        Sn(n.year, E.value.maxDate)
      ) || i.value.months.includes(u.value), f = On(m.value, u.value, n.year);
      return { active: I, disabled: se, highlighted: f };
    })), _ = computed(() => Yt(n.years, (u) => {
      const I = n.year === u.value, se = Gt(
        u.value,
        It(E.value.minDate),
        It(E.value.maxDate)
      ) || i.value.years.includes(u.value), f = Qa(m.value, u.value);
      return { active: I, disabled: se, highlighted: f };
    })), A = (u, I, se) => {
      se !== void 0 ? u.value = se : u.value = !u.value, u.value ? a("overlay-opened", I) : a("overlay-closed", I);
    }, k = (u = false, I) => {
      z(u), A(J, He.month, I);
    }, o = (u = false, I) => {
      z(u), A(le, He.year, I);
    }, z = (u) => {
      u || a("reset-flow");
    }, D = (u, I) => {
      n.arrowNavigation && (Q.value[I] = Ie(u), N(Q.value, "monthYear"));
    }, ee = computed(() => {
      var u, I;
      return [
        {
          type: nt.month,
          index: 1,
          toggle: k,
          modelValue: re.value,
          updateModelValue: (se) => re.value = se,
          text: fe.value.text,
          showSelectionGrid: J.value,
          items: ce.value,
          ariaLabel: (u = v.value) == null ? void 0 : u.openMonthsOverlay
        },
        {
          type: nt.year,
          index: 2,
          toggle: o,
          modelValue: B.value,
          updateModelValue: (se) => B.value = se,
          text: An(n.year, n.locale),
          showSelectionGrid: le.value,
          items: _.value,
          ariaLabel: (I = v.value) == null ? void 0 : I.openYearsOverlay
        }
      ];
    }), de = computed(() => n.disableYearSelect ? [ee.value[0]] : n.yearFirst ? [...ee.value].reverse() : ee.value);
    return t({
      toggleMonthPicker: k,
      toggleYearPicker: o,
      handleMonthYearChange: O
    }), (u, I) => {
      var se, f, T, G, s, oe2;
      return openBlock(), createElementBlock("div", Mr, [
        u.$slots["month-year"] ? (openBlock(), createElementBlock("div", $r, [
          renderSlot(u.$slots, "month-year", normalizeProps(guardReactiveProps({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(F), handleMonthYearChange: unref(O), instance: e.instance })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          u.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Ar, [
            renderSlot(u.$slots, "top-extra", { value: u.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", Tr, [
            unref(S)(unref(h3), e.instance) && !u.vertical ? (openBlock(), createBlock(Wt, {
              key: 0,
              "aria-label": (se = unref(v)) == null ? void 0 : se.prevMonth,
              disabled: unref(y)(false),
              class: normalizeClass((f = unref(b)) == null ? void 0 : f.navBtnPrev),
              onActivate: I[0] || (I[0] = (M) => unref(O)(false, true)),
              onSetRef: I[1] || (I[1] = (M) => D(M, 0))
            }, {
              default: withCtx(() => [
                u.$slots["arrow-left"] ? renderSlot(u.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                u.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(La), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: u.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(de.value, (M, me) => (openBlock(), createElementBlock(Fragment, {
                key: M.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (d) => D(d, me + 1),
                  type: "button",
                  class: "dp__btn dp__month_year_select",
                  tabindex: "0",
                  "aria-label": M.ariaLabel,
                  "data-test": `${M.type}-toggle-overlay-${e.instance}`,
                  onClick: M.toggle,
                  onKeydown: (d) => unref(qe)(d, () => M.toggle(), true)
                }, [
                  u.$slots[M.type] ? renderSlot(u.$slots, M.type, {
                    key: 0,
                    text: M.text,
                    value: n[M.type]
                  }) : createCommentVNode("", true),
                  u.$slots[M.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(M.text), 1)
                  ], 64))
                ], 40, Sr),
                createVNode(Transition, {
                  name: unref(C)(M.showSelectionGrid),
                  css: unref(H)
                }, {
                  default: withCtx(() => [
                    M.showSelectionGrid ? (openBlock(), createBlock(qt, {
                      key: 0,
                      items: M.items,
                      "arrow-navigation": u.arrowNavigation,
                      "hide-navigation": u.hideNavigation,
                      "is-last": u.autoApply && !unref(L).keepActionRow,
                      "skip-button-ref": false,
                      config: u.config,
                      type: M.type,
                      "header-refs": [],
                      "esc-close": u.escClose,
                      "menu-wrap-ref": u.menuWrapRef,
                      "text-input": u.textInput,
                      "aria-labels": u.ariaLabels,
                      onSelected: M.updateModelValue,
                      onToggle: M.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        u.$slots["calendar-icon"] ? renderSlot(u.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        u.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      u.$slots[`${M.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: d }) => [
                          renderSlot(u.$slots, `${M.type}-overlay-value`, {
                            text: d.text,
                            value: d.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      u.$slots[`${M.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(u.$slots, `${M.type}-overlay`, mergeProps({ ref_for: true }, j.value(M.type)))
                        ]),
                        key: "1"
                      } : void 0,
                      u.$slots[`${M.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(u.$slots, `${M.type}-overlay-header`, {
                            toggle: M.toggle
                          })
                        ]),
                        key: "2"
                      } : void 0
                    ]), 1032, ["items", "arrow-navigation", "hide-navigation", "is-last", "config", "type", "esc-close", "menu-wrap-ref", "text-input", "aria-labels", "onSelected", "onToggle"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["name", "css"])
              ], 64))), 128))
            ], 2),
            unref(S)(unref(h3), e.instance) && u.vertical ? (openBlock(), createBlock(Wt, {
              key: 1,
              "aria-label": (T = unref(v)) == null ? void 0 : T.prevMonth,
              disabled: unref(y)(false),
              class: normalizeClass((G = unref(b)) == null ? void 0 : G.navBtnPrev),
              onActivate: I[2] || (I[2] = (M) => unref(O)(false, true))
            }, {
              default: withCtx(() => [
                u.$slots["arrow-up"] ? renderSlot(u.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                u.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            unref(X)(unref(h3), e.instance) ? (openBlock(), createBlock(Wt, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(y)(true),
              "aria-label": (s = unref(v)) == null ? void 0 : s.nextMonth,
              class: normalizeClass((oe2 = unref(b)) == null ? void 0 : oe2.navBtnNext),
              onActivate: I[3] || (I[3] = (M) => unref(O)(true, true)),
              onSetRef: I[4] || (I[4] = (M) => D(M, u.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                u.$slots[u.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(u.$slots, u.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                u.$slots[u.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(u.vertical ? unref(Va) : unref(za)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label", "class"])) : createCommentVNode("", true)
          ])
        ], 64))
      ]);
    };
  }
});
var Rr = ["aria-label"];
var Cr = {
  class: "dp__calendar_header",
  role: "row"
};
var _r = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Or = ["aria-label"];
var Br = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Yr = ["aria-label"];
var Ir = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var Nr = { class: "dp__cell_inner" };
var Er = ["id", "aria-selected", "aria-disabled", "aria-label", "data-test", "onClick", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
var Fr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...rt
  },
  emits: [
    "select-date",
    "set-hover-date",
    "handle-scroll",
    "mount",
    "handle-swipe",
    "handle-space",
    "tooltip-open",
    "tooltip-close"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, { buildMultiLevelMatrix: c } = bt(), {
      defaultedTransitions: v,
      defaultedConfig: h3,
      defaultedAriaLabels: i,
      defaultedMultiCalendars: L,
      defaultedWeekNumbers: m,
      defaultedMultiDates: E,
      defaultedUI: b
    } = Ce(n), C = ref(null), H = ref({
      bottom: "",
      left: "",
      transform: ""
    }), N = ref([]), O = ref(null), y = ref(true), F = ref(""), S = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), X = ref([]), J = ref({ left: "50%" }), le = ref(false), Q = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), P = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : vl(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: N }), h3.value.noSwipe || O.value && (O.value.addEventListener("touchstart", D, { passive: false }), O.value.addEventListener("touchend", ee, { passive: false }), O.value.addEventListener("touchmove", de, { passive: false })), n.monthChangeOnScroll && O.value && O.value.addEventListener("wheel", se, { passive: false });
    });
    const re = (M) => M ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", B = (M, me) => {
      if (n.transitions) {
        const d = Ke(dt(U(), n.month, n.year));
        F.value = Be(Ke(dt(U(), M, me)), d) ? v.value[re(true)] : v.value[re(false)], y.value = false, nextTick(() => {
          y.value = true;
        });
      }
    }, j = computed(
      () => ({
        [n.calendarClassName]: !!n.calendarClassName,
        ...b.value.calendar ?? {}
      })
    ), fe = computed(() => (M) => {
      const me = gl(M);
      return {
        dp__marker_dot: me.type === "dot",
        dp__marker_line: me.type === "line"
      };
    }), ce = computed(() => (M) => De(M, C.value)), _ = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: L.value.count > 0 && n.instance !== 0
    })), A = computed(() => (M) => n.hideOffsetDates ? M.current : true), k = async (M, me, d) => {
      const Y = Ie(N.value[me][d]);
      if (Y) {
        const { width: V, height: R } = Y.getBoundingClientRect();
        C.value = M.value;
        let te = { left: `${V / 2}px` }, ue = -50;
        if (await nextTick(), X.value[0]) {
          const { left: w, width: x } = X.value[0].getBoundingClientRect();
          w < 0 && (te = { left: "0" }, ue = 0, J.value.left = `${V / 2}px`), window.innerWidth < w + x && (te = { right: "0" }, ue = 0, J.value.left = `${x - V / 2}px`);
        }
        H.value = {
          bottom: `${R}px`,
          ...te,
          transform: `translateX(${ue}%)`
        }, a("tooltip-open", M.marker);
      }
    }, o = async (M, me, d) => {
      var Y, V;
      if (le.value && E.value.enabled && E.value.dragSelect)
        return a("select-date", M);
      a("set-hover-date", M), (V = (Y = M.marker) == null ? void 0 : Y.tooltip) != null && V.length && await k(M, me, d);
    }, z = (M) => {
      C.value && (C.value = null, H.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", M.marker));
    }, D = (M) => {
      S.value.startX = M.changedTouches[0].screenX, S.value.startY = M.changedTouches[0].screenY;
    }, ee = (M) => {
      S.value.endX = M.changedTouches[0].screenX, S.value.endY = M.changedTouches[0].screenY, u();
    }, de = (M) => {
      n.vertical && !n.inline && M.preventDefault();
    }, u = () => {
      const M = n.vertical ? "Y" : "X";
      Math.abs(S.value[`start${M}`] - S.value[`end${M}`]) > 10 && a("handle-swipe", S.value[`start${M}`] > S.value[`end${M}`] ? "right" : "left");
    }, I = (M, me, d) => {
      M && (Array.isArray(N.value[me]) ? N.value[me][d] = M : N.value[me] = [M]), n.arrowNavigation && c(N.value, "calendar");
    }, se = (M) => {
      n.monthChangeOnScroll && (M.preventDefault(), a("handle-scroll", M));
    }, f = (M) => m.value.type === "local" ? getWeek(M.value, { weekStartsOn: +n.weekStart }) : m.value.type === "iso" ? getISOWeek(M.value) : typeof m.value.type == "function" ? m.value.type(M.value) : "", T = (M) => {
      const me = M[0];
      return m.value.hideOnOffsetDates ? M.some((d) => d.current) ? f(me) : "" : f(me);
    }, G = (M, me) => {
      E.value.enabled || (yt(M, h3.value), a("select-date", me));
    }, s = (M) => {
      yt(M, h3.value);
    }, oe2 = (M) => {
      E.value.enabled && E.value.dragSelect ? (le.value = true, a("select-date", M)) : E.value.enabled && a("select-date", M);
    };
    return t({ triggerTransition: B }), (M, me) => {
      var d;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: O,
          role: "grid",
          class: normalizeClass(j.value),
          "aria-label": (d = unref(i)) == null ? void 0 : d.calendarWrap
        }, [
          createBaseVNode("div", Cr, [
            M.weekNumbers ? (openBlock(), createElementBlock("div", _r, toDisplayString(M.weekNumName), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(P.value, (Y, V) => {
              var R, te;
              return openBlock(), createElementBlock("div", {
                key: V,
                class: "dp__calendar_header_item",
                role: "gridcell",
                "data-test": "calendar-header",
                "aria-label": (te = (R = unref(i)) == null ? void 0 : R.weekDay) == null ? void 0 : te.call(R, V)
              }, [
                M.$slots["calendar-header"] ? renderSlot(M.$slots, "calendar-header", {
                  key: 0,
                  day: Y,
                  index: V
                }) : createCommentVNode("", true),
                M.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(Y), 1)
                ], 64))
              ], 8, Or);
            }), 128))
          ]),
          Br,
          createVNode(Transition, {
            name: F.value,
            css: !!M.transitions
          }, {
            default: withCtx(() => {
              var Y;
              return [
                y.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "dp__calendar",
                  role: "rowgroup",
                  "aria-label": ((Y = unref(i)) == null ? void 0 : Y.calendarDays) || void 0,
                  onMouseleave: me[1] || (me[1] = (V) => le.value = false)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(Q.value, (V, R) => (openBlock(), createElementBlock("div", {
                    key: R,
                    class: "dp__calendar_row",
                    role: "row"
                  }, [
                    M.weekNumbers ? (openBlock(), createElementBlock("div", Ir, [
                      createBaseVNode("div", Nr, toDisplayString(T(V.days)), 1)
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(V.days, (te, ue) => {
                      var w, x, pe;
                      return openBlock(), createElementBlock("div", {
                        id: unref(Bn)(te.value),
                        ref_for: true,
                        ref: ($e2) => I($e2, R, ue),
                        key: ue + R,
                        role: "gridcell",
                        class: "dp__calendar_item",
                        "aria-selected": (te.classData.dp__active_date || te.classData.dp__range_start || te.classData.dp__range_start) ?? void 0,
                        "aria-disabled": te.classData.dp__cell_disabled || void 0,
                        "aria-label": (x = (w = unref(i)) == null ? void 0 : w.day) == null ? void 0 : x.call(w, te),
                        tabindex: "0",
                        "data-test": te.value,
                        onClick: withModifiers(($e2) => G($e2, te), ["prevent"]),
                        onKeydown: ($e2) => unref(qe)($e2, () => M.$emit("select-date", te)),
                        onMouseenter: ($e2) => o(te, R, ue),
                        onMouseleave: ($e2) => z(te),
                        onMousedown: ($e2) => oe2(te),
                        onMouseup: me[0] || (me[0] = ($e2) => le.value = false)
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(["dp__cell_inner", te.classData])
                        }, [
                          M.$slots.day && A.value(te) ? renderSlot(M.$slots, "day", {
                            key: 0,
                            day: +te.text,
                            date: te.value
                          }) : createCommentVNode("", true),
                          M.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            createTextVNode(toDisplayString(te.text), 1)
                          ], 64)),
                          te.marker && A.value(te) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                            M.$slots.marker ? renderSlot(M.$slots, "marker", {
                              key: 0,
                              marker: te.marker,
                              day: +te.text,
                              date: te.value
                            }) : (openBlock(), createElementBlock("div", {
                              key: 1,
                              class: normalizeClass(fe.value(te.marker)),
                              style: normalizeStyle(te.marker.color ? { backgroundColor: te.marker.color } : {})
                            }, null, 6))
                          ], 64)) : createCommentVNode("", true),
                          ce.value(te.value) ? (openBlock(), createElementBlock("div", {
                            key: 3,
                            ref_for: true,
                            ref_key: "activeTooltip",
                            ref: X,
                            class: "dp__marker_tooltip",
                            style: normalizeStyle(H.value)
                          }, [
                            (pe = te.marker) != null && pe.tooltip ? (openBlock(), createElementBlock("div", {
                              key: 0,
                              class: "dp__tooltip_content",
                              onClick: s
                            }, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(te.marker.tooltip, ($e2, Ge2) => (openBlock(), createElementBlock("div", {
                                key: Ge2,
                                class: "dp__tooltip_text"
                              }, [
                                M.$slots["marker-tooltip"] ? renderSlot(M.$slots, "marker-tooltip", {
                                  key: 0,
                                  tooltip: $e2,
                                  day: te.value
                                }) : createCommentVNode("", true),
                                M.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                  createBaseVNode("div", {
                                    class: "dp__tooltip_mark",
                                    style: normalizeStyle($e2.color ? { backgroundColor: $e2.color } : {})
                                  }, null, 4),
                                  createBaseVNode("div", null, toDisplayString($e2.text), 1)
                                ], 64))
                              ]))), 128)),
                              createBaseVNode("div", {
                                class: "dp__arrow_bottom_tp",
                                style: normalizeStyle(J.value)
                              }, null, 4)
                            ])) : createCommentVNode("", true)
                          ], 4)) : createCommentVNode("", true)
                        ], 2)
                      ], 40, Er);
                    }), 128))
                  ]))), 128))
                ], 40, Yr)) : createCommentVNode("", true)
              ];
            }),
            _: 3
          }, 8, ["name", "css"])
        ], 10, Rr)
      ], 2);
    };
  }
});
var cn = (e) => Array.isArray(e);
var Lr = (e, t, l, a) => {
  const n = ref([]), c = ref(/* @__PURE__ */ new Date()), v = ref(), h3 = () => ee(e.isTextInputDate), { modelValue: i, calendars: L, time: m, today: E } = Jt(e, t, h3), {
    defaultedMultiCalendars: b,
    defaultedStartTime: C,
    defaultedRange: H,
    defaultedConfig: N,
    defaultedTz: O,
    propDates: y,
    defaultedMultiDates: F
  } = Ce(e), { validateMonthYearInRange: S, isDisabled: X, isDateRangeAllowed: J, checkMinMaxRange: le } = kt(e), { updateTimeValues: Q, getSetDateTime: P, setTime: re, assignStartTime: B, validateTime: j, disabledTimesConfig: fe } = zn(e, m, i, a), ce = computed(
    () => (p) => L.value[p] ? L.value[p].month : 0
  ), _ = computed(
    () => (p) => L.value[p] ? L.value[p].year : 0
  ), A = (p) => !N.value.keepViewOnOffsetClick || p ? true : !v.value, k = (p, g, W3, ne = false) => {
    var Ae, Fe2;
    A(ne) && (L.value[p] || (L.value[p] = { month: 0, year: 0 }), L.value[p].month = rn(g) ? (Ae = L.value[p]) == null ? void 0 : Ae.month : g, L.value[p].year = rn(W3) ? (Fe2 = L.value[p]) == null ? void 0 : Fe2.year : W3);
  }, o = () => {
    e.autoApply && t("select-date");
  };
  onMounted(() => {
    e.shadow || (i.value || (me(), C.value && B(C.value)), ee(true), e.focusStartDate && e.startDate && me());
  });
  const z = computed(() => {
    var p;
    return (p = e.flow) != null && p.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), D = () => {
    e.autoApply && z.value && t("auto-apply");
  }, ee = (p = false) => {
    if (i.value)
      return Array.isArray(i.value) ? (n.value = i.value, G(p)) : I(i.value, p);
    if (b.value.count && p && !e.startDate)
      return u(U(), p);
  }, de = () => Array.isArray(i.value) && H.value.enabled ? getMonth(i.value[0]) === getMonth(i.value[1] ?? i.value[0]) : false, u = (p = /* @__PURE__ */ new Date(), g = false) => {
    if ((!b.value.count || !b.value.static || g) && k(0, getMonth(p), getYear(p)), b.value.count && (!b.value.solo || !i.value || de()))
      for (let W3 = 1; W3 < b.value.count; W3++) {
        const ne = set(U(), { month: ce.value(W3 - 1), year: _.value(W3 - 1) }), Ae = add(ne, { months: 1 });
        L.value[W3] = { month: getMonth(Ae), year: getYear(Ae) };
      }
  }, I = (p, g) => {
    u(p), re("hours", getHours(p)), re("minutes", getMinutes(p)), re("seconds", getSeconds(p)), b.value.count && g && M();
  }, se = (p) => {
    if (b.value.count) {
      if (b.value.solo)
        return 0;
      const g = getMonth(p[0]), W3 = getMonth(p[1]);
      return Math.abs(W3 - g) < b.value.count ? 0 : 1;
    }
    return 1;
  }, f = (p, g) => {
    p[1] && H.value.showLastInRange ? u(p[se(p)], g) : u(p[0], g);
    const W3 = (ne, Ae) => [
      ne(p[0]),
      p[1] ? ne(p[1]) : m[Ae][1]
    ];
    re("hours", W3(getHours, "hours")), re("minutes", W3(getMinutes, "minutes")), re("seconds", W3(getSeconds, "seconds"));
  }, T = (p, g) => {
    if ((H.value.enabled || e.weekPicker) && !F.value.enabled)
      return f(p, g);
    if (F.value.enabled && g) {
      const W3 = p[p.length - 1];
      return I(W3, g);
    }
  }, G = (p) => {
    const g = i.value;
    T(g, p), b.value.count && b.value.solo && M();
  }, s = (p, g) => {
    const W3 = set(U(), { month: ce.value(g), year: _.value(g) }), ne = p < 0 ? addMonths(W3, 1) : subMonths(W3, 1);
    S(getMonth(ne), getYear(ne), p < 0, e.preventMinMaxNavigation) && (k(g, getMonth(ne), getYear(ne)), t("update-month-year", { instance: g, month: getMonth(ne), year: getYear(ne) }), b.value.count && !b.value.solo && oe2(g), l());
  }, oe2 = (p) => {
    for (let g = p - 1; g >= 0; g--) {
      const W3 = subMonths(set(U(), { month: ce.value(g + 1), year: _.value(g + 1) }), 1);
      k(g, getMonth(W3), getYear(W3));
    }
    for (let g = p + 1; g <= b.value.count - 1; g++) {
      const W3 = addMonths(set(U(), { month: ce.value(g - 1), year: _.value(g - 1) }), 1);
      k(g, getMonth(W3), getYear(W3));
    }
  }, M = () => {
    if (Array.isArray(i.value) && i.value.length === 2) {
      const p = U(
        U(i.value[1] ? i.value[1] : addMonths(i.value[0], 1))
      ), [g, W3] = [getMonth(i.value[0]), getYear(i.value[0])], [ne, Ae] = [getMonth(i.value[1]), getYear(i.value[1])];
      (g !== ne || g === ne && W3 !== Ae) && b.value.solo && k(1, getMonth(p), getYear(p));
    } else
      i.value && !Array.isArray(i.value) && (k(0, getMonth(i.value), getYear(i.value)), u(U()));
  }, me = () => {
    e.startDate && (k(0, getMonth(U(e.startDate)), getYear(U(e.startDate))), b.value.count && oe2(0));
  }, d = (p, g) => {
    if (e.monthChangeOnScroll) {
      const W3 = (/* @__PURE__ */ new Date()).getTime() - c.value.getTime(), ne = Math.abs(p.deltaY);
      let Ae = 500;
      ne > 1 && (Ae = 100), ne > 100 && (Ae = 0), W3 > Ae && (c.value = /* @__PURE__ */ new Date(), s(e.monthChangeOnScroll !== "inverse" ? -p.deltaY : p.deltaY, g));
    }
  }, Y = (p, g, W3 = false) => {
    e.monthChangeOnArrows && e.vertical === W3 && V(p, g);
  }, V = (p, g) => {
    s(p === "right" ? -1 : 1, g);
  }, R = (p) => {
    if (y.value.markers)
      return sa(p.value, y.value.markers);
  }, te = (p, g) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [p == 0, true];
      case "fair":
        return [p == 0 || g > p, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, ue = (p, g, W3, ne) => {
    if (e.sixWeeks && p.length < 6) {
      const Ae = 6 - p.length, Fe2 = (g.getDay() + 7 - ne) % 7, xt2 = 6 - (W3.getDay() + 7 - ne) % 7, [zt2, Da2] = te(Fe2, xt2);
      for (let Dt2 = 1; Dt2 <= Ae; Dt2++)
        if (Da2 ? !!(Dt2 % 2) == zt2 : zt2) {
          const ea2 = p[0].days[0], Ma2 = w(addDays(ea2.value, -7), getMonth(g));
          p.unshift({ days: Ma2 });
        } else {
          const ea2 = p[p.length - 1], Ma2 = ea2.days[ea2.days.length - 1], Wn = w(addDays(Ma2.value, 1), getMonth(g));
          p.push({ days: Wn });
        }
    }
    return p;
  }, w = (p, g) => {
    const W3 = U(p), ne = [];
    for (let Ae = 0; Ae < 7; Ae++) {
      const Fe2 = addDays(W3, Ae), wt2 = getMonth(Fe2) !== g;
      ne.push({
        text: e.hideOffsetDates && wt2 ? "" : Fe2.getDate(),
        value: Fe2,
        current: !wt2,
        classData: {}
      });
    }
    return ne;
  }, x = (p, g) => {
    const W3 = [], ne = new Date(g, p), Ae = new Date(g, p + 1, 0), Fe2 = e.weekStart, wt2 = startOfWeek(ne, { weekStartsOn: Fe2 }), xt2 = (zt2) => {
      const Da2 = w(zt2, p);
      if (W3.push({ days: Da2 }), !W3[W3.length - 1].days.some(
        (Dt2) => De(Ke(Dt2.value), Ke(Ae))
      )) {
        const Dt2 = addDays(zt2, 7);
        xt2(Dt2);
      }
    };
    return xt2(wt2), ue(W3, ne, Ae, Fe2);
  }, pe = (p) => {
    const g = pt(U(p.value), m.hours, m.minutes, Xe());
    t("date-update", g), F.value.enabled ? qa(g, i, F.value.limit) : i.value = g, a(), nextTick().then(() => {
      D();
    });
  }, $e2 = (p) => H.value.noDisabledRange ? Pn(n.value[0], p).some((W3) => X(W3)) : false, Ge2 = () => {
    n.value = i.value ? i.value.slice() : [], n.value.length === 2 && !(H.value.fixedStart || H.value.fixedEnd) && (n.value = []);
  }, ve2 = (p, g) => {
    const W3 = [
      U(p.value),
      addDays(U(p.value), +H.value.autoRange)
    ];
    J(W3) ? (g && vt2(p.value), n.value = W3) : t("invalid-date", p.value);
  }, vt2 = (p) => {
    const g = getMonth(U(p)), W3 = getYear(U(p));
    if (k(0, g, W3), b.value.count > 0)
      for (let ne = 1; ne < b.value.count; ne++) {
        const Ae = Ml(
          set(U(p), { year: ce.value(ne - 1), month: _.value(ne - 1) })
        );
        k(ne, Ae.month, Ae.year);
      }
  }, ot2 = (p) => {
    if ($e2(p.value) || !le(p.value, i.value, H.value.fixedStart ? 0 : 1))
      return t("invalid-date", p.value);
    n.value = En(U(p.value), i, t, H);
  }, Ft2 = (p, g) => {
    if (Ge2(), H.value.autoRange)
      return ve2(p, g);
    if (H.value.fixedStart || H.value.fixedEnd)
      return ot2(p);
    n.value[0] ? le(U(p.value), i.value) && !$e2(p.value) ? _e(U(p.value), U(n.value[0])) ? (n.value.unshift(U(p.value)), t("range-end", n.value[0])) : (n.value[1] = U(p.value), t("range-end", n.value[1])) : (e.autoApply && t("auto-apply-invalid", p.value), t("invalid-date", p.value)) : (n.value[0] = U(p.value), t("range-start", n.value[0]));
  }, Xe = (p = true) => e.enableSeconds ? Array.isArray(m.seconds) ? p ? m.seconds[0] : m.seconds[1] : m.seconds : 0, Lt2 = (p) => {
    n.value[p] = pt(
      n.value[p],
      m.hours[p],
      m.minutes[p],
      Xe(p !== 1)
    );
  }, ga2 = () => {
    var p, g;
    n.value[0] && n.value[1] && +((p = n.value) == null ? void 0 : p[0]) > +((g = n.value) == null ? void 0 : g[1]) && (n.value.reverse(), t("range-start", n.value[0]), t("range-end", n.value[1]));
  }, Zt2 = () => {
    n.value.length && (n.value[0] && !n.value[1] ? Lt2(0) : (Lt2(0), Lt2(1), a()), ga2(), i.value = n.value.slice(), va(n.value, t, e.autoApply, e.modelAuto));
  }, ya2 = (p, g = false) => {
    if (X(p.value) || !p.current && e.hideOffsetDates)
      return t("invalid-date", p.value);
    if (v.value = JSON.parse(JSON.stringify(p)), !H.value.enabled)
      return pe(p);
    cn(m.hours) && cn(m.minutes) && !F.value.enabled && (Ft2(p, g), Zt2());
  }, pa2 = (p, g) => {
    var ne;
    k(p, g.month, g.year, true), b.value.count && !b.value.solo && oe2(p), t("update-month-year", { instance: p, month: g.month, year: g.year }), l(b.value.solo ? p : void 0);
    const W3 = (ne = e.flow) != null && ne.length ? e.flow[e.flowStep] : void 0;
    !g.fromNav && (W3 === He.month || W3 === He.year) && a();
  }, ha2 = (p, g) => {
    Nn({
      value: p,
      modelValue: i,
      range: H.value.enabled,
      timezone: g ? void 0 : O.value.timezone
    }), o(), e.multiCalendars && nextTick().then(() => ee(true));
  }, ba2 = () => {
    const p = Ua(U(), O.value);
    H.value.enabled ? i.value && Array.isArray(i.value) && i.value[0] ? i.value = _e(p, i.value[0]) ? [p, i.value[0]] : [i.value[0], p] : i.value = [p] : i.value = p, o();
  }, ka2 = () => {
    if (Array.isArray(i.value))
      if (F.value.enabled) {
        const p = wa2();
        i.value[i.value.length - 1] = P(p);
      } else
        i.value = i.value.map((p, g) => p && P(p, g));
    else
      i.value = P(i.value);
    t("time-update");
  }, wa2 = () => Array.isArray(i.value) && i.value.length ? i.value[i.value.length - 1] : null;
  return {
    calendars: L,
    modelValue: i,
    month: ce,
    year: _,
    time: m,
    disabledTimesConfig: fe,
    today: E,
    validateTime: j,
    getCalendarDays: x,
    getMarker: R,
    handleScroll: d,
    handleSwipe: V,
    handleArrow: Y,
    selectDate: ya2,
    updateMonthYear: pa2,
    presetDate: ha2,
    selectCurrentDate: ba2,
    updateTime: (p, g = true, W3 = false) => {
      Q(p, g, W3, ka2);
    },
    assignMonthAndYear: u
  };
};
var zr = { key: 0 };
var Hr = defineComponent({
  __name: "DatePicker",
  props: {
    ...rt
  },
  emits: [
    "tooltip-open",
    "tooltip-close",
    "mount",
    "update:internal-model-value",
    "update-flow-step",
    "reset-flow",
    "auto-apply",
    "focus-menu",
    "select-date",
    "range-start",
    "range-end",
    "invalid-fixed-range",
    "time-update",
    "am-pm-change",
    "time-picker-open",
    "time-picker-close",
    "recalculate-position",
    "update-month-year",
    "auto-apply-invalid",
    "date-update",
    "invalid-date",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, {
      calendars: c,
      month: v,
      year: h3,
      modelValue: i,
      time: L,
      disabledTimesConfig: m,
      today: E,
      validateTime: b,
      getCalendarDays: C,
      getMarker: H,
      handleArrow: N,
      handleScroll: O,
      handleSwipe: y,
      selectDate: F,
      updateMonthYear: S,
      presetDate: X,
      selectCurrentDate: J,
      updateTime: le,
      assignMonthAndYear: Q
    } = Lr(n, a, de, u), P = useSlots(), { setHoverDate: re, getDayClassData: B, clearHoverDate: j } = no(i, n), { defaultedMultiCalendars: fe } = Ce(n), ce = ref([]), _ = ref([]), A = ref(null), k = Je(P, "calendar"), o = Je(P, "monthYear"), z = Je(P, "timePicker"), D = (Y) => {
      n.shadow || a("mount", Y);
    };
    watch(
      c,
      () => {
        n.shadow || setTimeout(() => {
          a("recalculate-position");
        }, 0);
      },
      { deep: true }
    ), watch(
      fe,
      (Y, V) => {
        Y.count - V.count > 0 && Q();
      },
      { deep: true }
    );
    const ee = computed(() => (Y) => C(v.value(Y), h3.value(Y)).map((V) => ({
      ...V,
      days: V.days.map((R) => (R.marker = H(R), R.classData = B(R), R))
    })));
    function de(Y) {
      var V;
      Y || Y === 0 ? (V = _.value[Y]) == null || V.triggerTransition(v.value(Y), h3.value(Y)) : _.value.forEach((R, te) => R.triggerTransition(v.value(te), h3.value(te)));
    }
    function u() {
      a("update-flow-step");
    }
    const I = (Y, V = false) => {
      F(Y, V), n.spaceConfirm && a("select-date");
    }, se = (Y, V, R = 0) => {
      var te;
      (te = ce.value[R]) == null || te.toggleMonthPicker(Y, V);
    }, f = (Y, V, R = 0) => {
      var te;
      (te = ce.value[R]) == null || te.toggleYearPicker(Y, V);
    }, T = (Y, V, R) => {
      var te;
      (te = A.value) == null || te.toggleTimePicker(Y, V, R);
    }, G = (Y, V) => {
      var R;
      if (!n.range) {
        const te = i.value ? i.value : E, ue = V ? new Date(V) : te, w = Y ? startOfWeek(ue, { weekStartsOn: 1 }) : endOfWeek(ue, { weekStartsOn: 1 });
        F({
          value: w,
          current: getMonth(ue) === v.value(0),
          text: "",
          classData: {}
        }), (R = document.getElementById(Bn(w))) == null || R.focus();
      }
    }, s = (Y) => {
      var V;
      (V = ce.value[0]) == null || V.handleMonthYearChange(Y, true);
    }, oe2 = (Y) => {
      S(0, { month: v.value(0), year: h3.value(0) + (Y ? 1 : -1), fromNav: true });
    }, M = (Y, V) => {
      Y === He.time && a(`time-picker-${V ? "open" : "close"}`), a("overlay-toggle", { open: V, overlay: Y });
    }, me = (Y) => {
      a("overlay-toggle", { open: false, overlay: Y }), a("focus-menu");
    };
    return t({
      clearHoverDate: j,
      presetDate: X,
      selectCurrentDate: J,
      toggleMonthPicker: se,
      toggleYearPicker: f,
      toggleTimePicker: T,
      handleArrow: N,
      updateMonthYear: S,
      getSidebarProps: () => ({
        modelValue: i,
        month: v,
        year: h3,
        time: L,
        updateTime: le,
        updateMonthYear: S,
        selectDate: F,
        presetDate: X
      }),
      changeMonth: s,
      changeYear: oe2,
      selectWeekDate: G
    }), (Y, V) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(fa, {
        "multi-calendars": unref(fe).count,
        collapse: Y.collapse
      }, {
        default: withCtx(({ instance: R, index: te }) => [
          Y.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Pr, mergeProps({
            key: 0,
            ref: (ue) => {
              ue && (ce.value[te] = ue);
            },
            months: unref(Dn)(Y.formatLocale, Y.locale, Y.monthNameFormat),
            years: unref(ja)(Y.yearRange, Y.locale, Y.reverseYears),
            month: unref(v)(R),
            year: unref(h3)(R),
            instance: R
          }, Y.$props, {
            onMount: V[0] || (V[0] = (ue) => D(unref(Tt).header)),
            onResetFlow: V[1] || (V[1] = (ue) => Y.$emit("reset-flow")),
            onUpdateMonthYear: (ue) => unref(S)(R, ue),
            onOverlayClosed: me,
            onOverlayOpened: V[2] || (V[2] = (ue) => Y.$emit("overlay-toggle", { open: true, overlay: ue }))
          }), createSlots({ _: 2 }, [
            renderList(unref(o), (ue, w) => ({
              name: ue,
              fn: withCtx((x) => [
                renderSlot(Y.$slots, ue, normalizeProps(guardReactiveProps(x)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Fr, mergeProps({
            ref: (ue) => {
              ue && (_.value[te] = ue);
            },
            "mapped-dates": ee.value(R),
            month: unref(v)(R),
            year: unref(h3)(R),
            instance: R
          }, Y.$props, {
            onSelectDate: (ue) => unref(F)(ue, R !== 1),
            onHandleSpace: (ue) => I(ue, R !== 1),
            onSetHoverDate: V[3] || (V[3] = (ue) => unref(re)(ue)),
            onHandleScroll: (ue) => unref(O)(ue, R),
            onHandleSwipe: (ue) => unref(y)(ue, R),
            onMount: V[4] || (V[4] = (ue) => D(unref(Tt).calendar)),
            onResetFlow: V[5] || (V[5] = (ue) => Y.$emit("reset-flow")),
            onTooltipOpen: V[6] || (V[6] = (ue) => Y.$emit("tooltip-open", ue)),
            onTooltipClose: V[7] || (V[7] = (ue) => Y.$emit("tooltip-close", ue))
          }), createSlots({ _: 2 }, [
            renderList(unref(k), (ue, w) => ({
              name: ue,
              fn: withCtx((x) => [
                renderSlot(Y.$slots, ue, normalizeProps(guardReactiveProps({ ...x })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      Y.enableTimePicker ? (openBlock(), createElementBlock("div", zr, [
        Y.$slots["time-picker"] ? renderSlot(Y.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(L), updateTime: unref(le) }))) : (openBlock(), createBlock(Ln, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: A
        }, Y.$props, {
          hours: unref(L).hours,
          minutes: unref(L).minutes,
          seconds: unref(L).seconds,
          "internal-model-value": Y.internalModelValue,
          "disabled-times-config": unref(m),
          "validate-time": unref(b),
          onMount: V[8] || (V[8] = (R) => D(unref(Tt).timePicker)),
          "onUpdate:hours": V[9] || (V[9] = (R) => unref(le)(R)),
          "onUpdate:minutes": V[10] || (V[10] = (R) => unref(le)(R, false)),
          "onUpdate:seconds": V[11] || (V[11] = (R) => unref(le)(R, false, true)),
          onResetFlow: V[12] || (V[12] = (R) => Y.$emit("reset-flow")),
          onOverlayClosed: V[13] || (V[13] = (R) => M(R, false)),
          onOverlayOpened: V[14] || (V[14] = (R) => M(R, true)),
          onAmPmChange: V[15] || (V[15] = (R) => Y.$emit("am-pm-change", R))
        }), createSlots({ _: 2 }, [
          renderList(unref(z), (R, te) => ({
            name: R,
            fn: withCtx((ue) => [
              renderSlot(Y.$slots, R, normalizeProps(guardReactiveProps(ue)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Wr = (e, t) => {
  const l = ref(), {
    defaultedMultiCalendars: a,
    defaultedConfig: n,
    defaultedHighlight: c,
    defaultedRange: v,
    propDates: h3,
    defaultedFilters: i,
    defaultedMultiDates: L
  } = Ce(e), { modelValue: m, year: E, month: b, calendars: C } = Jt(e, t), { isDisabled: H } = kt(e), { selectYear: N, groupedYears: O, showYearPicker: y, isDisabled: F, toggleYearPicker: S, handleYearSelect: X, handleYear: J } = Fn({
    modelValue: m,
    multiCalendars: a,
    range: v,
    highlight: c,
    calendars: C,
    propDates: h3,
    month: b,
    year: E,
    filters: i,
    props: e,
    emit: t
  }), le = (o, z) => [o, z].map((D) => format(D, "MMMM", { locale: e.formatLocale })).join("-"), Q = computed(() => (o) => m.value ? Array.isArray(m.value) ? m.value.some((z) => isSameQuarter(o, z)) : isSameQuarter(m.value, o) : false), P = (o) => {
    if (v.value.enabled) {
      if (Array.isArray(m.value)) {
        const z = De(o, m.value[0]) || De(o, m.value[1]);
        return da(m.value, l.value, o) && !z;
      }
      return false;
    }
    return false;
  }, re = (o, z) => o.quarter === getQuarter(z) && o.year === getYear(z), B = (o) => typeof c.value == "function" ? c.value({ quarter: getQuarter(o), year: getYear(o) }) : !!c.value.quarters.find((z) => re(z, o)), j = computed(() => (o) => {
    const z = set(/* @__PURE__ */ new Date(), { year: E.value(o) });
    return eachQuarterOfInterval({
      start: startOfYear(z),
      end: endOfYear(z)
    }).map((D) => {
      const ee = startOfQuarter(D), de = endOfQuarter(D), u = H(D), I = P(ee), se = B(ee);
      return {
        text: le(ee, de),
        value: ee,
        active: Q.value(ee),
        highlighted: se,
        disabled: u,
        isBetween: I
      };
    });
  }), fe = (o) => {
    qa(o, m, L.value.limit), t("auto-apply", true);
  }, ce = (o) => {
    m.value = Xa(m, o, t), va(m.value, t, e.autoApply, e.modelAuto);
  }, _ = (o) => {
    m.value = o, t("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a,
    groupedYears: O,
    year: E,
    isDisabled: F,
    quarters: j,
    showYearPicker: y,
    modelValue: m,
    setHoverDate: (o) => {
      l.value = o;
    },
    selectYear: N,
    selectQuarter: (o, z, D) => {
      if (!D)
        return C.value[z].month = getMonth(endOfQuarter(o)), L.value.enabled ? fe(o) : v.value.enabled ? ce(o) : _(o);
    },
    toggleYearPicker: S,
    handleYearSelect: X,
    handleYear: J
  };
};
var Vr = { class: "dp--quarter-items" };
var Ur = ["data-test", "disabled", "onClick", "onMouseover"];
var jr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...rt
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "overlay-closed",
    "auto-apply",
    "range-start",
    "range-end",
    "overlay-toggle",
    "update-month-year"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, c = useSlots(), v = Je(c, "yearMode"), {
      defaultedMultiCalendars: h3,
      defaultedConfig: i,
      groupedYears: L,
      year: m,
      isDisabled: E,
      quarters: b,
      modelValue: C,
      showYearPicker: H,
      setHoverDate: N,
      selectQuarter: O,
      toggleYearPicker: y,
      handleYearSelect: F,
      handleYear: S
    } = Wr(n, a);
    return t({ getSidebarProps: () => ({
      modelValue: C,
      year: m,
      selectQuarter: O,
      handleYearSelect: F,
      handleYear: S
    }) }), (J, le) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(h3).count,
      collapse: J.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: Q }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(i).modeHeight}px` })
        }, [
          J.$slots["top-extra"] ? renderSlot(J.$slots, "top-extra", {
            key: 0,
            value: J.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(In, mergeProps(J.$props, {
              items: unref(L)(Q),
              instance: Q,
              "show-year-picker": unref(H)[Q],
              year: unref(m)(Q),
              "is-disabled": (P) => unref(E)(Q, P),
              onHandleYear: (P) => unref(S)(Q, P),
              onYearSelect: (P) => unref(F)(P, Q),
              onToggleYearPicker: (P) => unref(y)(Q, P == null ? void 0 : P.flow, P == null ? void 0 : P.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(v), (P, re) => ({
                name: P,
                fn: withCtx((B) => [
                  renderSlot(J.$slots, P, normalizeProps(guardReactiveProps(B)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Vr, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(b)(Q), (P, re) => (openBlock(), createElementBlock("div", { key: re }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": P.active,
                  "dp--qr-btn-between": P.isBetween,
                  "dp--qr-btn-disabled": P.disabled,
                  "dp--highlighted": P.highlighted
                }]),
                "data-test": P.value,
                disabled: P.disabled,
                onClick: (B) => unref(O)(P.value, Q, P.disabled),
                onMouseover: (B) => unref(N)(P.value)
              }, [
                J.$slots.quarter ? renderSlot(J.$slots, "quarter", {
                  key: 0,
                  value: P.value,
                  text: P.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(P.text), 1)
                ], 64))
              ], 42, Ur)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var Kr = ["id", "aria-label"];
var Gr = {
  key: 0,
  class: "dp--menu-load-container"
};
var Qr = createBaseVNode("span", { class: "dp--menu-loader" }, null, -1);
var qr = [
  Qr
];
var Xr = {
  key: 0,
  class: "dp__sidebar_left"
};
var Jr = ["data-test", "onClick", "onKeydown"];
var Zr = {
  key: 2,
  class: "dp__sidebar_right"
};
var xr = {
  key: 3,
  class: "dp__action_extra"
};
var fn = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...ca,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    noOverlayFocus: { type: Boolean, default: false },
    collapse: { type: Boolean, default: false },
    getInputRect: { type: Function, default: () => ({}) },
    isTextInputDate: { type: Boolean, default: false }
  },
  emits: [
    "close-picker",
    "select-date",
    "auto-apply",
    "time-update",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "update:internal-model-value",
    "recalculate-position",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open",
    "time-picker-close",
    "am-pm-change",
    "range-start",
    "range-end",
    "auto-apply-invalid",
    "date-update",
    "invalid-date",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, c = ref(null), v = computed(() => {
      const { openOnTop: w, ...x } = n;
      return {
        ...x,
        flowStep: re.value,
        collapse: n.collapse,
        noOverlayFocus: n.noOverlayFocus,
        menuWrapRef: c.value
      };
    }), { setMenuFocused: h3, setShiftKey: i, control: L } = Yn(), m = useSlots(), { defaultedTextInput: E, defaultedInline: b, defaultedConfig: C, defaultedUI: H } = Ce(n), N = ref(null), O = ref(0), y = ref(null), F = ref(false), S = ref(null);
    onMounted(() => {
      if (!n.shadow) {
        F.value = true, X(), window.addEventListener("resize", X);
        const w = Ie(c);
        if (w && !E.value.enabled && !b.value.enabled && (h3(true), k()), w) {
          const x = (pe) => {
            C.value.allowPreventDefault && pe.preventDefault(), yt(pe, C.value, true);
          };
          w.addEventListener("pointerdown", x), w.addEventListener("mousedown", x);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", X);
    });
    const X = () => {
      const w = Ie(y);
      w && (O.value = w.getBoundingClientRect().width);
    }, { arrowRight: J, arrowLeft: le, arrowDown: Q, arrowUp: P } = bt(), { flowStep: re, updateFlowStep: B, childMount: j, resetFlow: fe, handleFlow: ce } = lo(n, a, S), _ = computed(() => n.monthPicker ? nr : n.yearPicker ? rr : n.timePicker ? Dr : n.quarterPicker ? jr : Hr), A = computed(() => {
      var pe;
      if (C.value.arrowLeft)
        return C.value.arrowLeft;
      const w = (pe = c.value) == null ? void 0 : pe.getBoundingClientRect(), x = n.getInputRect();
      return x.width < O.value && x.left <= ((w == null ? void 0 : w.left) ?? 0) ? `${x.width / 2}px` : "50%";
    }), k = () => {
      const w = Ie(c);
      w && w.focus({ preventScroll: true });
    }, o = computed(() => {
      var w;
      return ((w = S.value) == null ? void 0 : w.getSidebarProps()) || {};
    }), z = () => {
      n.openOnTop && a("recalculate-position");
    }, D = Je(m, "action"), ee = computed(() => n.monthPicker || n.yearPicker ? Je(m, "monthYear") : n.timePicker ? Je(m, "timePicker") : Je(m, "shared")), de = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), u = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly,
      "dp-menu-loading": n.loading
    })), I = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !b.value.enabled,
        dp__relative: b.value.enabled,
        [n.menuClassName]: !!n.menuClassName,
        ...H.value.menu ?? {}
      })
    ), se = (w) => {
      yt(w, C.value, true);
    }, f = () => {
      n.escClose && a("close-picker");
    }, T = (w) => {
      if (n.arrowNavigation) {
        if (w === je.up)
          return P();
        if (w === je.down)
          return Q();
        if (w === je.left)
          return le();
        if (w === je.right)
          return J();
      } else
        w === je.left || w === je.up ? me("handleArrow", je.left, 0, w === je.up) : me("handleArrow", je.right, 0, w === je.down);
    }, G = (w) => {
      i(w.shiftKey), !n.disableMonthYearSelect && w.code === Re.tab && w.target.classList.contains("dp__menu") && L.value.shiftKeyInMenu && (w.preventDefault(), yt(w, C.value, true), a("close-picker"));
    }, s = () => {
      k(), a("time-picker-close");
    }, oe2 = (w) => {
      var x, pe, $e2;
      (x = S.value) == null || x.toggleTimePicker(false, false), (pe = S.value) == null || pe.toggleMonthPicker(false, false, w), ($e2 = S.value) == null || $e2.toggleYearPicker(false, false, w);
    }, M = (w, x = 0) => {
      var pe, $e2, Ge2;
      return w === "month" ? (pe = S.value) == null ? void 0 : pe.toggleMonthPicker(false, true, x) : w === "year" ? ($e2 = S.value) == null ? void 0 : $e2.toggleYearPicker(false, true, x) : w === "time" ? (Ge2 = S.value) == null ? void 0 : Ge2.toggleTimePicker(true, false) : oe2(x);
    }, me = (w, ...x) => {
      var pe, $e2;
      (pe = S.value) != null && pe[w] && (($e2 = S.value) == null || $e2[w](...x));
    }, d = () => {
      me("selectCurrentDate");
    }, Y = (w, x) => {
      me("presetDate", w, x);
    }, V = () => {
      me("clearHoverDate");
    }, R = (w, x) => {
      me("updateMonthYear", w, x);
    }, te = (w, x) => {
      w.preventDefault(), T(x);
    }, ue = (w) => {
      var x;
      if (G(w), w.key === Re.home || w.key === Re.end)
        return me(
          "selectWeekDate",
          w.key === Re.home,
          w.target.getAttribute("id")
        );
      switch ((w.key === Re.pageUp || w.key === Re.pageDown) && (w.shiftKey ? me("changeYear", w.key === Re.pageUp) : me("changeMonth", w.key === Re.pageUp), w.target.getAttribute("id") && ((x = c.value) == null || x.focus({ preventScroll: true }))), w.key) {
        case Re.esc:
          return f();
        case Re.arrowLeft:
          return te(w, je.left);
        case Re.arrowRight:
          return te(w, je.right);
        case Re.arrowUp:
          return te(w, je.up);
        case Re.arrowDown:
          return te(w, je.down);
        default:
          return;
      }
    };
    return t({
      updateMonthYear: R,
      switchView: M,
      handleFlow: ce
    }), (w, x) => {
      var pe, $e2, Ge2;
      return openBlock(), createElementBlock("div", {
        id: w.uid ? `dp-menu-${w.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: c,
        tabindex: "0",
        role: "dialog",
        "aria-label": (pe = w.ariaLabels) == null ? void 0 : pe.menu,
        class: normalizeClass(I.value),
        style: normalizeStyle({ "--dp-arrow-left": A.value }),
        onMouseleave: V,
        onClick: se,
        onKeydown: ue
      }, [
        (w.disabled || w.readonly) && unref(b).enabled || w.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(u.value)
        }, [
          w.loading ? (openBlock(), createElementBlock("div", Gr, qr)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        !unref(b).enabled && !w.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(de.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: y,
          class: normalizeClass({
            dp__menu_content_wrapper: (($e2 = w.presetDates) == null ? void 0 : $e2.length) || !!w.$slots["left-sidebar"] || !!w.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((Ge2 = w.presetDates) == null ? void 0 : Ge2.length) || !!w.$slots["left-sidebar"] || !!w.$slots["right-sidebar"])
          }),
          style: normalizeStyle({ "--dp-menu-width": `${O.value}px` })
        }, [
          w.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Xr, [
            renderSlot(w.$slots, "left-sidebar", normalizeProps(guardReactiveProps(o.value)))
          ])) : createCommentVNode("", true),
          w.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(w.presetDates, (ve2, vt2) => (openBlock(), createElementBlock(Fragment, { key: vt2 }, [
              ve2.slot ? renderSlot(w.$slots, ve2.slot, {
                key: 0,
                presetDate: Y,
                label: ve2.label,
                value: ve2.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(ve2.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test": ve2.testId ?? void 0,
                onClick: withModifiers((ot2) => Y(ve2.value, ve2.noTz), ["prevent"]),
                onKeydown: (ot2) => unref(qe)(ot2, () => Y(ve2.value, ve2.noTz), true)
              }, toDisplayString(ve2.label), 47, Jr))
            ], 64))), 128))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: N,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(_.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: S
            }, v.value, {
              "flow-step": unref(re),
              onMount: unref(j),
              onUpdateFlowStep: unref(B),
              onResetFlow: unref(fe),
              onFocusMenu: k,
              onSelectDate: x[0] || (x[0] = (ve2) => w.$emit("select-date")),
              onDateUpdate: x[1] || (x[1] = (ve2) => w.$emit("date-update", ve2)),
              onTooltipOpen: x[2] || (x[2] = (ve2) => w.$emit("tooltip-open", ve2)),
              onTooltipClose: x[3] || (x[3] = (ve2) => w.$emit("tooltip-close", ve2)),
              onAutoApply: x[4] || (x[4] = (ve2) => w.$emit("auto-apply", ve2)),
              onRangeStart: x[5] || (x[5] = (ve2) => w.$emit("range-start", ve2)),
              onRangeEnd: x[6] || (x[6] = (ve2) => w.$emit("range-end", ve2)),
              onInvalidFixedRange: x[7] || (x[7] = (ve2) => w.$emit("invalid-fixed-range", ve2)),
              onTimeUpdate: x[8] || (x[8] = (ve2) => w.$emit("time-update")),
              onAmPmChange: x[9] || (x[9] = (ve2) => w.$emit("am-pm-change", ve2)),
              onTimePickerOpen: x[10] || (x[10] = (ve2) => w.$emit("time-picker-open", ve2)),
              onTimePickerClose: s,
              onRecalculatePosition: z,
              onUpdateMonthYear: x[11] || (x[11] = (ve2) => w.$emit("update-month-year", ve2)),
              onAutoApplyInvalid: x[12] || (x[12] = (ve2) => w.$emit("auto-apply-invalid", ve2)),
              onInvalidDate: x[13] || (x[13] = (ve2) => w.$emit("invalid-date", ve2)),
              onOverlayToggle: x[14] || (x[14] = (ve2) => w.$emit("overlay-toggle", ve2)),
              "onUpdate:internalModelValue": x[15] || (x[15] = (ve2) => w.$emit("update:internal-model-value", ve2))
            }), createSlots({ _: 2 }, [
              renderList(ee.value, (ve2, vt2) => ({
                name: ve2,
                fn: withCtx((ot2) => [
                  renderSlot(w.$slots, ve2, normalizeProps(guardReactiveProps({ ...ot2 })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          w.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Zr, [
            renderSlot(w.$slots, "right-sidebar", normalizeProps(guardReactiveProps(o.value)))
          ])) : createCommentVNode("", true),
          w.$slots["action-extra"] ? (openBlock(), createElementBlock("div", xr, [
            w.$slots["action-extra"] ? renderSlot(w.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: d
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !w.autoApply || unref(C).keepActionRow ? (openBlock(), createBlock(ql, mergeProps({
          key: 2,
          "menu-mount": F.value
        }, v.value, {
          "calendar-width": O.value,
          onClosePicker: x[16] || (x[16] = (ve2) => w.$emit("close-picker")),
          onSelectDate: x[17] || (x[17] = (ve2) => w.$emit("select-date")),
          onInvalidSelect: x[18] || (x[18] = (ve2) => w.$emit("invalid-select")),
          onSelectNow: d
        }), createSlots({ _: 2 }, [
          renderList(unref(D), (ve2, vt2) => ({
            name: ve2,
            fn: withCtx((ot2) => [
              renderSlot(w.$slots, ve2, normalizeProps(guardReactiveProps({ ...ot2 })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 46, Kr);
    };
  }
});
var Ct = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(Ct || {});
var eo = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: l,
  pickerWrapperRef: a,
  inline: n,
  emit: c,
  props: v,
  slots: h3
}) => {
  const i = ref({}), L = ref(false), m = ref({
    top: "0",
    left: "0"
  }), E = ref(false), b = toRef(v, "teleportCenter");
  watch(b, () => {
    m.value = JSON.parse(JSON.stringify({})), X();
  });
  const C = (k) => {
    if (v.teleport) {
      const o = k.getBoundingClientRect();
      return {
        left: o.left + window.scrollX,
        top: o.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, H = (k, o) => {
    m.value.left = `${k + o - i.value.width}px`;
  }, N = (k) => {
    m.value.left = `${k}px`;
  }, O = (k, o) => {
    v.position === Ct.left && N(k), v.position === Ct.right && H(k, o), v.position === Ct.center && (m.value.left = `${k + o / 2 - i.value.width / 2}px`);
  }, y = (k) => {
    const { width: o, height: z } = k.getBoundingClientRect(), { top: D, left: ee } = v.altPosition ? v.altPosition(k) : C(k);
    return { top: +D, left: +ee, width: o, height: z };
  }, F = () => {
    m.value.left = "50%", m.value.top = "50%", m.value.transform = "translate(-50%, -50%)", m.value.position = "fixed", delete m.value.opacity;
  }, S = () => {
    const k = Ie(l), { top: o, left: z, transform: D } = v.altPosition(k);
    m.value = { top: `${o}px`, left: `${z}px`, transform: D ?? "" };
  }, X = (k = true) => {
    var o;
    if (!n.value.enabled) {
      if (b.value)
        return F();
      if (v.altPosition !== null)
        return S();
      if (k) {
        const z = v.teleport ? (o = t.value) == null ? void 0 : o.$el : e.value;
        z && (i.value = z.getBoundingClientRect()), c("recalculate-position");
      }
      return j();
    }
  }, J = ({ inputEl: k, left: o, width: z }) => {
    window.screen.width > 768 && !L.value && O(o, z), P(k);
  }, le = (k) => {
    const { top: o, left: z, height: D, width: ee } = y(k);
    m.value.top = `${D + o + +v.offset}px`, E.value = false, L.value || (m.value.left = `${z + ee / 2 - i.value.width / 2}px`), J({ inputEl: k, left: z, width: ee });
  }, Q = (k) => {
    const { top: o, left: z, width: D } = y(k);
    m.value.top = `${o - +v.offset - i.value.height}px`, E.value = true, J({ inputEl: k, left: z, width: D });
  }, P = (k) => {
    if (v.autoPosition) {
      const { left: o, width: z } = y(k), { left: D, right: ee } = i.value;
      if (!L.value) {
        if (Math.abs(D) !== Math.abs(ee)) {
          if (D <= 0)
            return L.value = true, N(o);
          if (ee >= document.documentElement.clientWidth)
            return L.value = true, H(o, z);
        }
        return O(o, z);
      }
    }
  }, re = () => {
    const k = Ie(l);
    if (k) {
      const { height: o } = i.value, { top: z, height: D } = k.getBoundingClientRect(), de = window.innerHeight - z - D, u = z;
      return o <= de ? Mt.bottom : o > de && o <= u ? Mt.top : de >= u ? Mt.bottom : Mt.top;
    }
    return Mt.bottom;
  }, B = (k) => re() === Mt.bottom ? le(k) : Q(k), j = () => {
    const k = Ie(l);
    if (k)
      return v.autoPosition ? B(k) : le(k);
  }, fe = function(k) {
    if (k) {
      const o = k.scrollHeight > k.clientHeight, D = window.getComputedStyle(k).overflowY.indexOf("hidden") !== -1;
      return o && !D;
    }
    return true;
  }, ce = function(k) {
    return !k || k === document.body || k.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : fe(k) ? k : ce(k.assignedSlot ? k.assignedSlot.parentNode : k.parentNode);
  }, _ = (k) => {
    if (k)
      switch (v.position) {
        case Ct.left:
          return { left: 0, transform: "translateX(0)" };
        case Ct.right:
          return { left: `${k.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${k.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: E,
    menuStyle: m,
    xCorrect: L,
    setMenuPosition: X,
    getScrollableParent: ce,
    shadowRender: (k, o) => {
      var I, se, f;
      const z = document.createElement("div"), D = (I = Ie(l)) == null ? void 0 : I.getBoundingClientRect();
      z.setAttribute("id", "dp--temp-container");
      const ee = (se = a.value) != null && se.clientWidth ? a.value : document.body;
      ee.append(z);
      const de = _(D), u = h(
        k,
        {
          ...o,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...de }
        },
        Object.fromEntries(
          Object.keys(h3).filter((T) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(T)).map((T) => [T, h3[T]])
        )
      );
      render(u, z), i.value = (f = u.el) == null ? void 0 : f.getBoundingClientRect(), render(null, z), ee.removeChild(z);
    }
  };
};
var mt = [
  { name: "clock-icon", use: ["time", "calendar", "shared"] },
  { name: "arrow-left", use: ["month-year", "calendar", "shared", "year-mode"] },
  { name: "arrow-right", use: ["month-year", "calendar", "shared", "year-mode"] },
  { name: "arrow-up", use: ["time", "calendar", "month-year", "shared"] },
  { name: "arrow-down", use: ["time", "calendar", "month-year", "shared"] },
  { name: "calendar-icon", use: ["month-year", "time", "calendar", "shared", "year-mode"] },
  { name: "day", use: ["calendar", "shared"] },
  { name: "month-overlay-value", use: ["calendar", "month-year", "shared"] },
  { name: "year-overlay-value", use: ["calendar", "month-year", "shared", "year-mode"] },
  { name: "year-overlay", use: ["month-year", "shared"] },
  { name: "month-overlay", use: ["month-year", "shared"] },
  { name: "month-overlay-header", use: ["month-year", "shared"] },
  { name: "year-overlay-header", use: ["month-year", "shared"] },
  { name: "hours-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "hours-overlay-header", use: ["calendar", "time", "shared"] },
  { name: "minutes-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "minutes-overlay-header", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-header", use: ["calendar", "time", "shared"] },
  { name: "hours", use: ["calendar", "time", "shared"] },
  { name: "minutes", use: ["calendar", "time", "shared"] },
  { name: "month", use: ["calendar", "month-year", "shared"] },
  { name: "year", use: ["calendar", "month-year", "shared", "year-mode"] },
  { name: "action-buttons", use: ["action"] },
  { name: "action-preview", use: ["action"] },
  { name: "calendar-header", use: ["calendar", "shared"] },
  { name: "marker-tooltip", use: ["calendar", "shared"] },
  { name: "action-extra", use: ["menu"] },
  { name: "time-picker-overlay", use: ["calendar", "time", "shared"] },
  { name: "am-pm-button", use: ["calendar", "time", "shared"] },
  { name: "left-sidebar", use: ["menu"] },
  { name: "right-sidebar", use: ["menu"] },
  { name: "month-year", use: ["month-year", "shared"] },
  { name: "time-picker", use: ["menu", "shared"] },
  { name: "action-row", use: ["action"] },
  { name: "marker", use: ["calendar", "shared"] },
  { name: "quarter", use: ["shared"] },
  { name: "top-extra", use: ["shared", "month-year"] },
  { name: "tp-inline-arrow-up", use: ["shared", "time"] },
  { name: "tp-inline-arrow-down", use: ["shared", "time"] }
];
var to = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var ao = {
  all: () => mt,
  monthYear: () => mt.filter((e) => e.use.includes("month-year")),
  input: () => to,
  timePicker: () => mt.filter((e) => e.use.includes("time")),
  action: () => mt.filter((e) => e.use.includes("action")),
  calendar: () => mt.filter((e) => e.use.includes("calendar")),
  menu: () => mt.filter((e) => e.use.includes("menu")),
  shared: () => mt.filter((e) => e.use.includes("shared")),
  yearMode: () => mt.filter((e) => e.use.includes("year-mode"))
};
var Je = (e, t, l) => {
  const a = [];
  return ao[t]().forEach((n) => {
    e[n.name] && a.push(n.name);
  }), l != null && l.length && l.forEach((n) => {
    n.slot && a.push(n.slot);
  }), a;
};
var Xt = (e) => {
  const t = computed(() => (a) => e.value ? a ? e.value.open : e.value.close : ""), l = computed(() => (a) => e.value ? a ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: t, showTransition: !!e.value, menuTransition: l };
};
var Jt = (e, t, l) => {
  const { defaultedRange: a, defaultedTz: n } = Ce(e), c = U(Ze(U(), n.value.timezone)), v = ref([{ month: getMonth(c), year: getYear(c) }]), h3 = (b) => {
    const C = {
      hours: getHours(c),
      minutes: getMinutes(c),
      seconds: 0
    };
    return a.value.enabled ? [C[b], C[b]] : C[b];
  }, i = reactive({
    hours: h3("hours"),
    minutes: h3("minutes"),
    seconds: h3("seconds")
  });
  watch(
    a,
    (b, C) => {
      b.enabled !== C.enabled && (i.hours = h3("hours"), i.minutes = h3("minutes"), i.seconds = h3("seconds"));
    },
    { deep: true }
  );
  const L = computed({
    get: () => e.internalModelValue,
    set: (b) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", b);
    }
  }), m = computed(
    () => (b) => v.value[b] ? v.value[b].month : 0
  ), E = computed(
    () => (b) => v.value[b] ? v.value[b].year : 0
  );
  return watch(
    L,
    (b, C) => {
      l && JSON.stringify(b ?? {}) !== JSON.stringify(C ?? {}) && l();
    },
    { deep: true }
  ), {
    calendars: v,
    time: i,
    modelValue: L,
    month: m,
    year: E,
    today: c
  };
};
var no = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedMultiDates: a,
    defaultedUI: n,
    defaultedHighlight: c,
    defaultedTz: v,
    propDates: h3,
    defaultedRange: i
  } = Ce(t), { isDisabled: L } = kt(t), m = ref(null), E = ref(Ze(/* @__PURE__ */ new Date(), v.value.timezone)), b = (f) => {
    !f.current && t.hideOffsetDates || (m.value = f.value);
  }, C = () => {
    m.value = null;
  }, H = (f) => Array.isArray(e.value) && i.value.enabled && e.value[0] && m.value ? f ? Be(m.value, e.value[0]) : _e(m.value, e.value[0]) : true, N = (f, T) => {
    const G = () => e.value ? T ? e.value[0] || null : e.value[1] : null, s = e.value && Array.isArray(e.value) ? G() : null;
    return De(U(f.value), s);
  }, O = (f) => {
    const T = Array.isArray(e.value) ? e.value[0] : null;
    return f ? !_e(m.value ?? null, T) : true;
  }, y = (f, T = true) => (i.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !f.current ? false : De(U(f.value), e.value[T ? 0 : 1]) : i.value.enabled ? N(f, T) && O(T) || De(f.value, Array.isArray(e.value) ? e.value[0] : null) && H(T) : false, F = (f, T) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const G = De(f.value, m.value);
      return T ? Be(e.value[0], f.value) && G : _e(e.value[0], f.value) && G;
    }
    return false;
  }, S = (f) => !e.value || t.hideOffsetDates && !f.current ? false : i.value.enabled ? t.modelAuto && Array.isArray(e.value) ? De(f.value, e.value[0] ? e.value[0] : E.value) : false : a.value.enabled && Array.isArray(e.value) ? e.value.some((T) => De(T, f.value)) : De(f.value, e.value ? e.value : E.value), X = (f) => {
    if (i.value.autoRange || t.weekPicker) {
      if (m.value) {
        if (t.hideOffsetDates && !f.current)
          return false;
        const T = addDays(m.value, +i.value.autoRange), G = it(U(m.value), t.weekStart);
        return t.weekPicker ? De(G[1], U(f.value)) : De(T, U(f.value));
      }
      return false;
    }
    return false;
  }, J = (f) => {
    if (i.value.autoRange || t.weekPicker) {
      if (m.value) {
        const T = addDays(m.value, +i.value.autoRange);
        if (t.hideOffsetDates && !f.current)
          return false;
        const G = it(U(m.value), t.weekStart);
        return t.weekPicker ? Be(f.value, G[0]) && _e(f.value, G[1]) : Be(f.value, m.value) && _e(f.value, T);
      }
      return false;
    }
    return false;
  }, le = (f) => {
    if (i.value.autoRange || t.weekPicker) {
      if (m.value) {
        if (t.hideOffsetDates && !f.current)
          return false;
        const T = it(U(m.value), t.weekStart);
        return t.weekPicker ? De(T[0], f.value) : De(m.value, f.value);
      }
      return false;
    }
    return false;
  }, Q = (f) => da(e.value, m.value, f.value), P = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, re = () => t.modelAuto ? Mn(t.internalModelValue) : true, B = (f) => {
    if (t.weekPicker)
      return false;
    const T = i.value.enabled ? !y(f) && !y(f, false) : true;
    return !L(f.value) && !S(f) && !(!f.current && t.hideOffsetDates) && T;
  }, j = (f) => i.value.enabled ? t.modelAuto ? P() && S(f) : false : S(f), fe = (f) => c.value ? kl(f.value, h3.value.highlight) : false, ce = (f) => {
    const T = L(f.value);
    return T && (typeof c.value == "function" ? !c.value(f.value, T) : !c.value.options.highlightDisabled);
  }, _ = (f) => {
    var T;
    return typeof c.value == "function" ? c.value(f.value) : (T = c.value.weekdays) == null ? void 0 : T.includes(f.value.getDay());
  }, A = (f) => (i.value.enabled || t.weekPicker) && (!(l.value.count > 0) || f.current) && re() && !(!f.current && t.hideOffsetDates) && !S(f) ? Q(f) : false, k = (f) => {
    const { isRangeStart: T, isRangeEnd: G } = ee(f), s = i.value.enabled ? T || G : false;
    return {
      dp__cell_offset: !f.current,
      dp__pointer: !t.disabled && !(!f.current && t.hideOffsetDates) && !L(f.value),
      dp__cell_disabled: L(f.value),
      dp__cell_highlight: !ce(f) && (fe(f) || _(f)) && !j(f) && !s && !le(f) && !(A(f) && t.weekPicker) && !G,
      dp__cell_highlight_active: !ce(f) && (fe(f) || _(f)) && j(f),
      dp__today: !t.noToday && De(f.value, E.value) && f.current,
      "dp--past": _e(f.value, E.value),
      "dp--future": Be(f.value, E.value)
    };
  }, o = (f) => ({
    dp__active_date: j(f),
    dp__date_hover: B(f)
  }), z = (f) => {
    if (e.value && !Array.isArray(e.value)) {
      const T = it(e.value, t.weekStart);
      return {
        ...u(f),
        dp__range_start: De(T[0], f.value),
        dp__range_end: De(T[1], f.value),
        dp__range_between_week: Be(f.value, T[0]) && _e(f.value, T[1])
      };
    }
    return {
      ...u(f)
    };
  }, D = (f) => {
    if (e.value && Array.isArray(e.value)) {
      const T = it(e.value[0], t.weekStart), G = e.value[1] ? it(e.value[1], t.weekStart) : [];
      return {
        ...u(f),
        dp__range_start: De(T[0], f.value) || De(G[0], f.value),
        dp__range_end: De(T[1], f.value) || De(G[1], f.value),
        dp__range_between_week: Be(f.value, T[0]) && _e(f.value, T[1]) || Be(f.value, G[0]) && _e(f.value, G[1]),
        dp__range_between: Be(f.value, T[1]) && _e(f.value, G[0])
      };
    }
    return {
      ...u(f)
    };
  }, ee = (f) => {
    const T = l.value.count > 0 ? f.current && y(f) && re() : y(f) && re(), G = l.value.count > 0 ? f.current && y(f, false) && re() : y(f, false) && re();
    return { isRangeStart: T, isRangeEnd: G };
  }, de = (f) => {
    const { isRangeStart: T, isRangeEnd: G } = ee(f);
    return {
      dp__range_start: T,
      dp__range_end: G,
      dp__range_between: A(f),
      dp__date_hover: De(f.value, m.value) && !T && !G && !t.weekPicker,
      dp__date_hover_start: F(f, true),
      dp__date_hover_end: F(f, false)
    };
  }, u = (f) => ({
    ...de(f),
    dp__cell_auto_range: J(f),
    dp__cell_auto_range_start: le(f),
    dp__cell_auto_range_end: X(f)
  }), I = (f) => i.value.enabled ? i.value.autoRange ? u(f) : t.modelAuto ? { ...o(f), ...de(f) } : t.weekPicker ? D(f) : de(f) : t.weekPicker ? z(f) : o(f);
  return {
    setHoverDate: b,
    clearHoverDate: C,
    getDayClassData: (f) => t.hideOffsetDates && !f.current ? {} : {
      ...k(f),
      ...I(f),
      [t.dayClass ? t.dayClass(f.value, t.internalModelValue) : ""]: true,
      [t.calendarCellClassName]: !!t.calendarCellClassName,
      ...n.value.calendarCell ?? {}
    }
  };
};
var kt = (e) => {
  const { defaultedFilters: t, defaultedRange: l, propDates: a, defaultedMultiDates: n } = Ce(e), c = (_) => a.value.disabledDates ? typeof a.value.disabledDates == "function" ? a.value.disabledDates(U(_)) : !!sa(_, a.value.disabledDates) : false, v = (_) => a.value.maxDate ? e.yearPicker ? getYear(_) > getYear(a.value.maxDate) : Be(_, a.value.maxDate) : false, h3 = (_) => a.value.minDate ? e.yearPicker ? getYear(_) < getYear(a.value.minDate) : _e(_, a.value.minDate) : false, i = (_) => {
    const A = v(_), k = h3(_), o = c(_), D = t.value.months.map((se) => +se).includes(getMonth(_)), ee = e.disabledWeekDays.length ? e.disabledWeekDays.some((se) => +se === getDay(_)) : false, de = C(_), u = getYear(_), I = u < +e.yearRange[0] || u > +e.yearRange[1];
    return !(A || k || o || D || I || ee || de);
  }, L = (_, A) => _e(...gt(a.value.minDate, _, A)) || De(...gt(a.value.minDate, _, A)), m = (_, A) => Be(...gt(a.value.maxDate, _, A)) || De(...gt(a.value.maxDate, _, A)), E = (_, A, k) => {
    let o = false;
    return a.value.maxDate && k && m(_, A) && (o = true), a.value.minDate && !k && L(_, A) && (o = true), o;
  }, b = (_, A, k, o) => {
    let z = false;
    return o ? a.value.minDate && a.value.maxDate ? z = E(_, A, k) : (a.value.minDate && L(_, A) || a.value.maxDate && m(_, A)) && (z = true) : z = true, z;
  }, C = (_) => Array.isArray(a.value.allowedDates) && !a.value.allowedDates.length ? true : a.value.allowedDates ? !sa(_, a.value.allowedDates) : false, H = (_) => !i(_), N = (_) => l.value.noDisabledRange ? !eachDayOfInterval({ start: _[0], end: _[1] }).some((k) => H(k)) : true, O = (_) => {
    if (_) {
      const A = getYear(_);
      return A >= +e.yearRange[0] && A <= e.yearRange[1];
    }
    return true;
  }, y = (_, A) => !!(Array.isArray(_) && _[A] && (l.value.maxRange || l.value.minRange) && O(_[A])), F = (_, A, k = 0) => {
    if (y(A, k) && O(_)) {
      const o = differenceInCalendarDays(_, A[k]), z = Pn(A[k], _), D = z.length === 1 ? 0 : z.filter((de) => H(de)).length, ee = Math.abs(o) - (l.value.minMaxRawRange ? 0 : D);
      if (l.value.minRange && l.value.maxRange)
        return ee >= +l.value.minRange && ee <= +l.value.maxRange;
      if (l.value.minRange)
        return ee >= +l.value.minRange;
      if (l.value.maxRange)
        return ee <= +l.value.maxRange;
    }
    return true;
  }, S = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, X = (_) => Array.isArray(_) ? [_[0] ? Pa(_[0]) : null, _[1] ? Pa(_[1]) : null] : Pa(_), J = (_, A, k) => _.find(
    (o) => +o.hours === getHours(A) && o.minutes === "*" ? true : +o.minutes === getMinutes(A) && +o.hours === getHours(A)
  ) && k, le = (_, A, k) => {
    const [o, z] = _, [D, ee] = A;
    return !J(o, D, k) && !J(z, ee, k) && k;
  }, Q = (_, A) => {
    const k = Array.isArray(A) ? A : [A];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? le(e.disabledTimes, k, _) : !k.some((o) => J(e.disabledTimes, o, _)) : _;
  }, P = (_, A) => {
    const k = Array.isArray(A) ? [St(A[0]), A[1] ? St(A[1]) : void 0] : St(A), o = !e.disabledTimes(k);
    return _ && o;
  }, re = (_, A) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? Q(A, _) : P(A, _) : A, B = (_) => {
    let A = true;
    if (!_ || S())
      return true;
    const k = !a.value.minDate && !a.value.maxDate ? X(_) : _;
    return (e.maxTime || a.value.maxDate) && (A = sn(
      e.maxTime,
      a.value.maxDate,
      "max",
      Ye(k),
      A
    )), (e.minTime || a.value.minDate) && (A = sn(
      e.minTime,
      a.value.minDate,
      "min",
      Ye(k),
      A
    )), re(_, A);
  }, j = (_) => {
    if (!e.monthPicker)
      return true;
    let A = true;
    const k = U(lt(_));
    if (a.value.minDate && a.value.maxDate) {
      const o = U(lt(a.value.minDate)), z = U(lt(a.value.maxDate));
      return Be(k, o) && _e(k, z) || De(k, o) || De(k, z);
    }
    if (a.value.minDate) {
      const o = U(lt(a.value.minDate));
      A = Be(k, o) || De(k, o);
    }
    if (a.value.maxDate) {
      const o = U(lt(a.value.maxDate));
      A = _e(k, o) || De(k, o);
    }
    return A;
  }, fe = computed(() => (_) => !e.enableTimePicker || e.ignoreTimeValidation ? true : B(_)), ce = computed(() => (_) => e.monthPicker ? Array.isArray(_) && (l.value.enabled || n.value.enabled) ? !_.filter((k) => !j(k)).length : j(_) : true);
  return {
    isDisabled: H,
    validateDate: i,
    validateMonthYearInRange: b,
    isDateRangeAllowed: N,
    checkMinMaxRange: F,
    isValidTime: B,
    isTimeValid: fe,
    isMonthValid: ce
  };
};
var ma = () => {
  const e = computed(() => (a, n) => a == null ? void 0 : a.includes(n)), t = computed(() => (a, n) => a.count ? a.solo ? true : n === 0 : true), l = computed(() => (a, n) => a.count ? a.solo ? true : n === a.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: l };
};
var lo = (e, t, l) => {
  const a = ref(0), n = reactive({
    [Tt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Tt.calendar]: false,
    [Tt.header]: false
  }), c = computed(() => e.monthPicker || e.timePicker), v = (E) => {
    var b;
    if ((b = e.flow) != null && b.length) {
      if (!E && c.value)
        return m();
      n[E] = true, Object.keys(n).filter((C) => !n[C]).length || m();
    }
  }, h3 = () => {
    var E, b;
    (E = e.flow) != null && E.length && a.value !== -1 && (a.value += 1, t("flow-step", a.value), m()), ((b = e.flow) == null ? void 0 : b.length) === a.value && nextTick().then(() => i());
  }, i = () => {
    a.value = -1;
  }, L = (E, b, ...C) => {
    var H, N;
    e.flow[a.value] === E && l.value && ((N = (H = l.value)[b]) == null || N.call(H, ...C));
  }, m = (E = 0) => {
    E && (a.value += E), L(He.month, "toggleMonthPicker", true), L(He.year, "toggleYearPicker", true), L(He.calendar, "toggleTimePicker", false, true), L(He.time, "toggleTimePicker", true, true);
    const b = e.flow[a.value];
    (b === He.hours || b === He.minutes || b === He.seconds) && L(b, "toggleTimePicker", true, true, b);
  };
  return { childMount: v, updateFlowStep: h3, resetFlow: i, handleFlow: m, flowStep: a };
};
var ro = {
  key: 1,
  class: "dp__input_wrap"
};
var oo = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var so = {
  key: 2,
  class: "dp__clear_icon"
};
var uo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...ca
  },
  emits: [
    "clear",
    "open",
    "update:input-value",
    "set-input-date",
    "close",
    "select-date",
    "set-empty-date",
    "toggle",
    "focus-prev",
    "focus",
    "blur",
    "real-blur"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, {
      defaultedTextInput: c,
      defaultedAriaLabels: v,
      defaultedInline: h3,
      defaultedConfig: i,
      defaultedRange: L,
      defaultedMultiDates: m,
      defaultedUI: E,
      getDefaultPattern: b,
      getDefaultStartTime: C
    } = Ce(n), { checkMinMaxRange: H } = kt(n), N = ref(), O = ref(null), y = ref(false), F = ref(false), S = computed(
      () => ({
        dp__pointer: !n.disabled && !n.readonly && !c.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !c.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: !!n.state,
        dp__input_invalid: n.state === false,
        dp__input_focus: y.value || n.isMenuOpen,
        dp__input_reg: !c.value.enabled,
        [n.inputClassName]: !!n.inputClassName,
        ...E.value.input ?? {}
      })
    ), X = () => {
      a("set-input-date", null), n.clearable && n.autoApply && (a("set-empty-date"), N.value = null);
    }, J = (D) => {
      const ee = C();
      return wl(
        D,
        c.value.format ?? b(),
        ee ?? Rn({}, n.enableSeconds),
        n.inputValue,
        F.value,
        n.formatLocale
      );
    }, le = (D) => {
      const { rangeSeparator: ee } = c.value, [de, u] = D.split(`${ee}`);
      if (de) {
        const I = J(de.trim()), se = u ? J(u.trim()) : null;
        if (isAfter(I, se))
          return;
        const f = I && se ? [I, se] : [I];
        H(se, f, 0) && (N.value = I ? f : null);
      }
    }, Q = () => {
      F.value = true;
    }, P = (D) => {
      if (L.value.enabled)
        le(D);
      else if (m.value.enabled) {
        const ee = D.split(";");
        N.value = ee.map((de) => J(de.trim())).filter((de) => de);
      } else
        N.value = J(D);
    }, re = (D) => {
      var de;
      const ee = typeof D == "string" ? D : (de = D.target) == null ? void 0 : de.value;
      ee !== "" ? (c.value.openMenu && !n.isMenuOpen && a("open"), P(ee), a("set-input-date", N.value)) : X(), F.value = false, a("update:input-value", ee);
    }, B = (D) => {
      c.value.enabled ? (P(D.target.value), c.value.enterSubmit && Ea(N.value) && n.inputValue !== "" ? (a("set-input-date", N.value, true), N.value = null) : c.value.enterSubmit && n.inputValue === "" && (N.value = null, a("clear"))) : ce(D);
    }, j = (D) => {
      c.value.enabled && c.value.tabSubmit && P(D.target.value), c.value.tabSubmit && Ea(N.value) && n.inputValue !== "" ? (a("set-input-date", N.value, true, true), N.value = null) : c.value.tabSubmit && n.inputValue === "" && (N.value = null, a("clear", true));
    }, fe = () => {
      y.value = true, a("focus"), nextTick().then(() => {
        var D;
        c.value.enabled && c.value.selectOnFocus && ((D = O.value) == null || D.select());
      });
    }, ce = (D) => {
      D.preventDefault(), yt(D, i.value, true), c.value.enabled && c.value.openMenu && !h3.value.input && !n.isMenuOpen ? a("open") : c.value.enabled || a("toggle");
    }, _ = () => {
      a("real-blur"), y.value = false, (!n.isMenuOpen || h3.value.enabled && h3.value.input) && a("blur"), n.autoApply && c.value.enabled && N.value && !n.isMenuOpen && (a("set-input-date", N.value), a("select-date"), N.value = null);
    }, A = (D) => {
      yt(D, i.value, true), a("clear");
    }, k = (D) => {
      if (D.key === "Tab" && j(D), D.key === "Enter" && B(D), !c.value.enabled) {
        if (D.code === "Tab")
          return;
        D.preventDefault();
      }
    };
    return t({
      focusInput: () => {
        var D;
        (D = O.value) == null || D.focus({ preventScroll: true });
      },
      setParsedDate: (D) => {
        N.value = D;
      }
    }), (D, ee) => {
      var de;
      return openBlock(), createElementBlock("div", { onClick: ce }, [
        D.$slots.trigger && !D.$slots["dp-input"] && !unref(h3).enabled ? renderSlot(D.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !D.$slots.trigger && (!unref(h3).enabled || unref(h3).input) ? (openBlock(), createElementBlock("div", ro, [
          D.$slots["dp-input"] && !D.$slots.trigger && (!unref(h3).enabled || unref(h3).enabled && unref(h3).input) ? renderSlot(D.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: re,
            onEnter: B,
            onTab: j,
            onClear: A,
            onBlur: _,
            onKeypress: k,
            onPaste: Q,
            onFocus: fe,
            openMenu: () => D.$emit("open"),
            closeMenu: () => D.$emit("close"),
            toggleMenu: () => D.$emit("toggle")
          }) : createCommentVNode("", true),
          D.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: D.uid ? `dp-input-${D.uid}` : void 0,
            ref_key: "inputRef",
            ref: O,
            "data-test": "dp-input",
            name: D.name,
            class: normalizeClass(S.value),
            inputmode: unref(c).enabled ? "text" : "none",
            placeholder: D.placeholder,
            disabled: D.disabled,
            readonly: D.readonly,
            required: D.required,
            value: e.inputValue,
            autocomplete: D.autocomplete,
            "aria-label": (de = unref(v)) == null ? void 0 : de.input,
            "aria-disabled": D.disabled || void 0,
            "aria-invalid": D.state === false ? true : void 0,
            onInput: re,
            onBlur: _,
            onFocus: fe,
            onKeypress: k,
            onKeydown: k,
            onPaste: Q
          }, null, 42, oo)),
          createBaseVNode("div", {
            onClick: ee[2] || (ee[2] = (u) => a("toggle"))
          }, [
            D.$slots["input-icon"] && !D.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: ee[0] || (ee[0] = (u) => a("toggle"))
            }, [
              renderSlot(D.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !D.$slots["input-icon"] && !D.hideInputIcon && !D.$slots["dp-input"] ? (openBlock(), createBlock(unref(Et), {
              key: 1,
              class: "dp__input_icon dp__input_icons",
              onClick: ee[1] || (ee[1] = (u) => a("toggle"))
            })) : createCommentVNode("", true)
          ]),
          D.$slots["clear-icon"] && e.inputValue && D.clearable && !D.disabled && !D.readonly ? (openBlock(), createElementBlock("span", so, [
            renderSlot(D.$slots, "clear-icon", { clear: A })
          ])) : createCommentVNode("", true),
          D.clearable && !D.$slots["clear-icon"] && e.inputValue && !D.disabled && !D.readonly ? (openBlock(), createBlock(unref(wn), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            "data-test": "clear-icon",
            onClick: ee[3] || (ee[3] = withModifiers((u) => A(u), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var io = typeof window < "u" ? window : void 0;
var Ya = () => {
};
var co = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var fo = (e, t, l, a) => {
  if (!e)
    return Ya;
  let n = Ya;
  const c = watch(
    () => unref(e),
    (h3) => {
      n(), h3 && (h3.addEventListener(t, l, a), n = () => {
        h3.removeEventListener(t, l, a), n = Ya;
      });
    },
    { immediate: true, flush: "post" }
  ), v = () => {
    c(), n();
  };
  return co(v), v;
};
var vo = (e, t, l, a = {}) => {
  const { window: n = io, event: c = "pointerdown" } = a;
  return n ? fo(n, c, (h3) => {
    const i = Ie(e), L = Ie(t);
    !i || !L || i === h3.target || h3.composedPath().includes(i) || h3.composedPath().includes(L) || l(h3);
  }, { passive: true }) : void 0;
};
var mo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...ca
  },
  emits: [
    "update:model-value",
    "update:model-timezone-value",
    "text-submit",
    "closed",
    "cleared",
    "open",
    "focus",
    "blur",
    "internal-model-change",
    "recalculate-position",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open",
    "time-picker-close",
    "am-pm-change",
    "range-start",
    "range-end",
    "date-update",
    "invalid-date",
    "overlay-toggle"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, c = useSlots(), v = ref(false), h3 = toRef(n, "modelValue"), i = toRef(n, "timezone"), L = ref(null), m = ref(null), E = ref(null), b = ref(false), C = ref(null), H = ref(false), N = ref(false), O = ref(false), y = ref(false), { setMenuFocused: F, setShiftKey: S } = Yn(), { clearArrowNav: X } = bt(), { validateDate: J, isValidTime: le } = kt(n), {
      defaultedTransitions: Q,
      defaultedTextInput: P,
      defaultedInline: re,
      defaultedConfig: B,
      defaultedRange: j,
      defaultedMultiDates: fe
    } = Ce(n), { menuTransition: ce, showTransition: _ } = Xt(Q);
    onMounted(() => {
      f(n.modelValue), nextTick().then(() => {
        if (!re.value.enabled) {
          const g = de(C.value);
          g == null || g.addEventListener("scroll", R), window == null || window.addEventListener("resize", te);
        }
      }), re.value.enabled && (v.value = true), window == null || window.addEventListener("keyup", ue), window == null || window.addEventListener("keydown", w);
    }), onUnmounted(() => {
      if (!re.value.enabled) {
        const g = de(C.value);
        g == null || g.removeEventListener("scroll", R), window == null || window.removeEventListener("resize", te);
      }
      window == null || window.removeEventListener("keyup", ue), window == null || window.removeEventListener("keydown", w);
    });
    const A = Je(c, "all", n.presetDates), k = Je(c, "input");
    watch(
      [h3, i],
      () => {
        f(h3.value);
      },
      { deep: true }
    );
    const { openOnTop: o, menuStyle: z, xCorrect: D, setMenuPosition: ee, getScrollableParent: de, shadowRender: u } = eo({
      menuRef: L,
      menuRefInner: m,
      inputRef: E,
      pickerWrapperRef: C,
      inline: re,
      emit: a,
      props: n,
      slots: c
    }), {
      inputValue: I,
      internalModelValue: se,
      parseExternalModelValue: f,
      emitModelValue: T,
      formatInputValue: G,
      checkBeforeEmit: s
    } = jl(a, n, b), oe2 = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: re.value.enabled,
        "dp--flex-display-collapsed": O.value,
        dp__flex_display_with_input: re.value.input
      })
    ), M = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), me = computed(() => n.teleport ? {
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: !n.teleport || re.value.enabled
    } : {}), d = computed(() => ({ class: "dp__outer_menu_wrap" })), Y = computed(() => re.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), V = () => {
      var g, W3;
      return (W3 = (g = E.value) == null ? void 0 : g.$el) == null ? void 0 : W3.getBoundingClientRect();
    }, R = () => {
      v.value && (B.value.closeOnScroll ? Xe() : ee());
    }, te = () => {
      var W3;
      v.value && ee();
      const g = (W3 = m.value) == null ? void 0 : W3.$el.getBoundingClientRect().width;
      O.value = document.body.offsetWidth <= g;
    }, ue = (g) => {
      g.key === "Tab" && !re.value.enabled && !n.teleport && B.value.tabOutClosesMenu && (C.value.contains(document.activeElement) || Xe()), N.value = g.shiftKey;
    }, w = (g) => {
      N.value = g.shiftKey;
    }, x = () => {
      !n.disabled && !n.readonly && (u(fn, n), ee(false), v.value = true, v.value && a("open"), v.value || Ft2(), f(n.modelValue));
    }, pe = () => {
      var g;
      I.value = "", Ft2(), (g = E.value) == null || g.setParsedDate(null), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), B.value.closeOnClearValue && Xe();
    }, $e2 = () => {
      const g = se.value;
      return !g || !Array.isArray(g) && J(g) ? true : Array.isArray(g) ? fe.value.enabled || g.length === 2 && J(g[0]) && J(g[1]) ? true : j.value.partialRange && !n.timePicker ? J(g[0]) : false : false;
    }, Ge2 = () => {
      s() && $e2() ? (T(), Xe()) : a("invalid-select", se.value);
    }, ve2 = (g) => {
      vt2(), T(), B.value.closeOnAutoApply && !g && Xe();
    }, vt2 = () => {
      E.value && P.value.enabled && E.value.setParsedDate(se.value);
    }, ot2 = (g = false) => {
      n.autoApply && le(se.value) && $e2() && (j.value.enabled && Array.isArray(se.value) ? (j.value.partialRange || se.value.length === 2) && ve2(g) : ve2(g));
    }, Ft2 = () => {
      P.value.enabled || (se.value = null);
    }, Xe = () => {
      re.value.enabled || (v.value && (v.value = false, D.value = false, F(false), S(false), X(), a("closed"), I.value && f(h3.value)), Ft2(), a("blur"));
    }, Lt2 = (g, W3, ne = false) => {
      if (!g) {
        se.value = null;
        return;
      }
      const Ae = Array.isArray(g) ? !g.some((wt2) => !J(wt2)) : J(g), Fe2 = le(g);
      Ae && Fe2 && (y.value = true, se.value = g, W3 && (H.value = ne, Ge2(), a("text-submit")), nextTick().then(() => {
        y.value = false;
      }));
    }, ga2 = () => {
      n.autoApply && le(se.value) && T(), vt2();
    }, Zt2 = () => v.value ? Xe() : x(), ya2 = (g) => {
      se.value = g;
    }, pa2 = () => {
      P.value.enabled && (b.value = true, G()), a("focus");
    }, ha2 = () => {
      if (P.value.enabled && (b.value = false, f(n.modelValue), H.value)) {
        const g = hl(C.value, N.value);
        g == null || g.focus();
      }
      a("blur");
    }, ba2 = (g) => {
      m.value && m.value.updateMonthYear(0, {
        month: ln(g.month),
        year: ln(g.year)
      });
    }, ka2 = (g) => {
      f(g ?? n.modelValue);
    }, wa2 = (g, W3) => {
      var ne;
      (ne = m.value) == null || ne.switchView(g, W3);
    }, Ja2 = (g) => B.value.onClickOutside ? B.value.onClickOutside(g) : Xe(), p = (g = 0) => {
      var W3;
      (W3 = m.value) == null || W3.handleFlow(g);
    };
    return vo(L, E, () => Ja2($e2)), t({
      closeMenu: Xe,
      selectDate: Ge2,
      clearValue: pe,
      openMenu: x,
      onScroll: R,
      formatInputValue: G,
      // exposed for testing purposes
      updateInternalModelValue: ya2,
      // modify internal modelValue
      setMonthYear: ba2,
      parseModel: ka2,
      switchView: wa2,
      toggleMenu: Zt2,
      handleFlow: p
    }), (g, W3) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: C,
      class: normalizeClass(oe2.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(uo, mergeProps({
        ref_key: "inputRef",
        ref: E,
        "input-value": unref(I),
        "onUpdate:inputValue": W3[0] || (W3[0] = (ne) => isRef(I) ? I.value = ne : null),
        "is-menu-open": v.value
      }, g.$props, {
        onClear: pe,
        onOpen: x,
        onSetInputDate: Lt2,
        onSetEmptyDate: unref(T),
        onSelectDate: Ge2,
        onToggle: Zt2,
        onClose: Xe,
        onFocus: pa2,
        onBlur: ha2,
        onRealBlur: W3[1] || (W3[1] = (ne) => b.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(k), (ne, Ae) => ({
          name: ne,
          fn: withCtx((Fe2) => [
            renderSlot(g.$slots, ne, normalizeProps(guardReactiveProps(Fe2)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(g.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps(me.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(ce)(unref(o)),
            css: unref(_) && !unref(re).enabled
          }, {
            default: withCtx(() => [
              v.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: L
              }, d.value, {
                class: { "dp--menu-wrapper": !unref(re).enabled },
                style: unref(re).enabled ? void 0 : unref(z)
              }), [
                createVNode(fn, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: m
                }, g.$props, {
                  "internal-model-value": unref(se),
                  "onUpdate:internalModelValue": W3[2] || (W3[2] = (ne) => isRef(se) ? se.value = ne : null),
                  class: { [M.value]: true, "dp--menu-wrapper": g.teleport },
                  "open-on-top": unref(o),
                  "no-overlay-focus": Y.value,
                  collapse: O.value,
                  "get-input-rect": V,
                  "is-text-input-date": y.value,
                  onClosePicker: Xe,
                  onSelectDate: Ge2,
                  onAutoApply: ot2,
                  onTimeUpdate: ga2,
                  onFlowStep: W3[3] || (W3[3] = (ne) => g.$emit("flow-step", ne)),
                  onUpdateMonthYear: W3[4] || (W3[4] = (ne) => g.$emit("update-month-year", ne)),
                  onInvalidSelect: W3[5] || (W3[5] = (ne) => g.$emit("invalid-select", unref(se))),
                  onAutoApplyInvalid: W3[6] || (W3[6] = (ne) => g.$emit("invalid-select", ne)),
                  onInvalidFixedRange: W3[7] || (W3[7] = (ne) => g.$emit("invalid-fixed-range", ne)),
                  onRecalculatePosition: unref(ee),
                  onTooltipOpen: W3[8] || (W3[8] = (ne) => g.$emit("tooltip-open", ne)),
                  onTooltipClose: W3[9] || (W3[9] = (ne) => g.$emit("tooltip-close", ne)),
                  onTimePickerOpen: W3[10] || (W3[10] = (ne) => g.$emit("time-picker-open", ne)),
                  onTimePickerClose: W3[11] || (W3[11] = (ne) => g.$emit("time-picker-close", ne)),
                  onAmPmChange: W3[12] || (W3[12] = (ne) => g.$emit("am-pm-change", ne)),
                  onRangeStart: W3[13] || (W3[13] = (ne) => g.$emit("range-start", ne)),
                  onRangeEnd: W3[14] || (W3[14] = (ne) => g.$emit("range-end", ne)),
                  onDateUpdate: W3[15] || (W3[15] = (ne) => g.$emit("date-update", ne)),
                  onInvalidDate: W3[16] || (W3[16] = (ne) => g.$emit("invalid-date", ne)),
                  onOverlayToggle: W3[17] || (W3[17] = (ne) => g.$emit("overlay-toggle", ne))
                }), createSlots({ _: 2 }, [
                  renderList(unref(A), (ne, Ae) => ({
                    name: ne,
                    fn: withCtx((Fe2) => [
                      renderSlot(g.$slots, ne, normalizeProps(guardReactiveProps({ ...Fe2 })))
                    ])
                  }))
                ]), 1040, ["internal-model-value", "class", "open-on-top", "no-overlay-focus", "collapse", "is-text-input-date", "onRecalculatePosition"])
              ], 16)) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["name", "css"])
        ]),
        _: 3
      }, 16))
    ], 2));
  }
});
var Hn = (() => {
  const e = mo;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var go = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Hn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(go).forEach(([e, t]) => {
  e !== "default" && (Hn[e] = t);
});

// node_modules/.pnpm/@vueuse+integrations@10.11.0_async-validator@4.2.5_focus-trap@7.5.4_qrcode@1.5.3_sortablejs@1.15.2_vue@3.4.29/node_modules/@vueuse/integrations/useQRCode.mjs
var import_qrcode = __toESM(require_browser(), 1);
function useQRCode(text, options) {
  const src = toRef2(text);
  const result = ref("");
  watch(
    src,
    async (value) => {
      if (src.value && isClient)
        result.value = await import_qrcode.default.toDataURL(value, options);
    },
    { immediate: true }
  );
  return result;
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/shared/ssr-window.esm.mjs
function isObject(obj) {
  return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
}
function extend(target, src) {
  if (target === void 0) {
    target = {};
  }
  if (src === void 0) {
    src = {};
  }
  Object.keys(src).forEach((key) => {
    if (typeof target[key] === "undefined") target[key] = src[key];
    else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      extend(target[key], src[key]);
    }
  });
}
var ssrDocument = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function getDocument() {
  const doc = typeof document !== "undefined" ? document : {};
  extend(doc, ssrDocument);
  return doc;
}
var ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(callback) {
    if (typeof setTimeout === "undefined") {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame(id) {
    if (typeof setTimeout === "undefined") {
      return;
    }
    clearTimeout(id);
  }
};
function getWindow() {
  const win = typeof window !== "undefined" ? window : {};
  extend(win, ssrWindow);
  return win;
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/shared/utils.mjs
function classesToTokens(classes2) {
  if (classes2 === void 0) {
    classes2 = "";
  }
  return classes2.trim().split(" ").filter((c) => !!c.trim());
}
function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch (e) {
    }
    try {
      delete object[key];
    } catch (e) {
    }
  });
}
function nextTick2(callback, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle2(el2) {
  const window2 = getWindow();
  let style;
  if (window2.getComputedStyle) {
    style = window2.getComputedStyle(el2, null);
  }
  if (!style && el2.currentStyle) {
    style = el2.currentStyle;
  }
  if (!style) {
    style = el2.style;
  }
  return style;
}
function getTranslate(el2, axis) {
  if (axis === void 0) {
    axis = "x";
  }
  const window2 = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle2(el2);
  if (window2.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(",").length > 6) {
      curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
    }
    transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
    matrix = transformMatrix.toString().split(",");
  }
  if (axis === "x") {
    if (window2.WebKitCSSMatrix) curTransform = transformMatrix.m41;
    else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
    else curTransform = parseFloat(matrix[4]);
  }
  if (axis === "y") {
    if (window2.WebKitCSSMatrix) curTransform = transformMatrix.m42;
    else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
    else curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject2(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function isNode(node) {
  if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend2() {
  const to3 = Object(arguments.length <= 0 ? void 0 : arguments[0]);
  const noExtend = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < arguments.length; i += 1) {
    const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
    if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== void 0 && desc.enumerable) {
          if (isObject2(to3[nextKey]) && isObject2(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to3[nextKey] = nextSource[nextKey];
            } else {
              extend2(to3[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject2(to3[nextKey]) && isObject2(nextSource[nextKey])) {
            to3[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to3[nextKey] = nextSource[nextKey];
            } else {
              extend2(to3[nextKey], nextSource[nextKey]);
            }
          } else {
            to3[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to3;
}
function setCSSProperty(el2, varName, varValue) {
  el2.style.setProperty(varName, varValue);
}
function animateCSSModeScroll(_ref) {
  let {
    swiper,
    targetPosition,
    side
  } = _ref;
  const window2 = getWindow();
  const startPosition = -swiper.translate;
  let startTime = null;
  let time;
  const duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = "none";
  window2.cancelAnimationFrame(swiper.cssModeFrameID);
  const dir = targetPosition > startPosition ? "next" : "prev";
  const isOutOfBound = (current, target) => {
    return dir === "next" && current >= target || dir === "prev" && current <= target;
  };
  const animate = () => {
    time = (/* @__PURE__ */ new Date()).getTime();
    if (startTime === null) {
      startTime = time;
    }
    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo({
      [side]: currentPosition
    });
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = "hidden";
      swiper.wrapperEl.style.scrollSnapType = "";
      setTimeout(() => {
        swiper.wrapperEl.style.overflow = "";
        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      });
      window2.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
  };
  animate();
}
function getSlideTransformEl(slideEl) {
  return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowRoot && slideEl.shadowRoot.querySelector(".swiper-slide-transform") || slideEl;
}
function elementChildren(element, selector) {
  if (selector === void 0) {
    selector = "";
  }
  return [...element.children].filter((el2) => el2.matches(selector));
}
function showWarning(text) {
  try {
    console.warn(text);
    return;
  } catch (err) {
  }
}
function createElement(tag, classes2) {
  if (classes2 === void 0) {
    classes2 = [];
  }
  const el2 = document.createElement(tag);
  el2.classList.add(...Array.isArray(classes2) ? classes2 : classesToTokens(classes2));
  return el2;
}
function elementPrevAll(el2, selector) {
  const prevEls = [];
  while (el2.previousElementSibling) {
    const prev = el2.previousElementSibling;
    if (selector) {
      if (prev.matches(selector)) prevEls.push(prev);
    } else prevEls.push(prev);
    el2 = prev;
  }
  return prevEls;
}
function elementNextAll(el2, selector) {
  const nextEls = [];
  while (el2.nextElementSibling) {
    const next = el2.nextElementSibling;
    if (selector) {
      if (next.matches(selector)) nextEls.push(next);
    } else nextEls.push(next);
    el2 = next;
  }
  return nextEls;
}
function elementStyle(el2, prop) {
  const window2 = getWindow();
  return window2.getComputedStyle(el2, null).getPropertyValue(prop);
}
function elementIndex(el2) {
  let child = el2;
  let i;
  if (child) {
    i = 0;
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) i += 1;
    }
    return i;
  }
  return void 0;
}
function elementParents(el2, selector) {
  const parents = [];
  let parent = el2.parentElement;
  while (parent) {
    if (selector) {
      if (parent.matches(selector)) parents.push(parent);
    } else {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}
function elementTransitionEnd(el2, callback) {
  function fireCallBack(e) {
    if (e.target !== el2) return;
    callback.call(el2, e);
    el2.removeEventListener("transitionend", fireCallBack);
  }
  if (callback) {
    el2.addEventListener("transitionend", fireCallBack);
  }
}
function elementOuterSize(el2, size, includeMargins) {
  const window2 = getWindow();
  if (includeMargins) {
    return el2[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el2, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el2, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
  }
  return el2.offsetWidth;
}
function makeElementsArray(el2) {
  return (Array.isArray(el2) ? el2 : [el2]).filter((e) => !!e);
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/shared/swiper-core.mjs
var support;
function calcSupport() {
  const window2 = getWindow();
  const document2 = getDocument();
  return {
    smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
    touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}
var deviceCached;
function calcDevice(_temp) {
  let {
    userAgent
  } = _temp === void 0 ? {} : _temp;
  const support2 = getSupport();
  const window2 = getWindow();
  const platform = window2.navigator.platform;
  const ua2 = userAgent || window2.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window2.screen.width;
  const screenHeight = window2.screen.height;
  const android = ua2.match(/(Android);?[\s\/]+([\d.]+)?/);
  let ipad = ua2.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua2.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua2.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === "Win32";
  let macos = platform === "MacIntel";
  const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua2.match(/(Version)\/([\d.]+)/);
    if (!ipad) ipad = [0, 1, "13_0_0"];
    macos = false;
  }
  if (android && !windows) {
    device.os = "android";
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = "ios";
    device.ios = true;
  }
  return device;
}
function getDevice(overrides) {
  if (overrides === void 0) {
    overrides = {};
  }
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}
var browser;
function calcBrowser() {
  const window2 = getWindow();
  const device = getDevice();
  let needPerspectiveFix = false;
  function isSafari() {
    const ua2 = window2.navigator.userAgent.toLowerCase();
    return ua2.indexOf("safari") >= 0 && ua2.indexOf("chrome") < 0 && ua2.indexOf("android") < 0;
  }
  if (isSafari()) {
    const ua2 = String(window2.navigator.userAgent);
    if (ua2.includes("Version/")) {
      const [major, minor] = ua2.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
      needPerspectiveFix = major < 16 || major === 16 && minor < 2;
    }
  }
  const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent);
  const isSafariBrowser = isSafari();
  const need3dFix = isSafariBrowser || isWebView && device.ios;
  return {
    isSafari: needPerspectiveFix || isSafariBrowser,
    needPerspectiveFix,
    need3dFix,
    isWebView
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}
function Resize(_ref) {
  let {
    swiper,
    on: on2,
    emit
  } = _ref;
  const window2 = getWindow();
  let observer = null;
  let animationFrame = null;
  const resizeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit("beforeResize");
    emit("resize");
  };
  const createObserver = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    observer = new ResizeObserver((entries) => {
      animationFrame = window2.requestAnimationFrame(() => {
        const {
          width,
          height
        } = swiper;
        let newWidth = width;
        let newHeight = height;
        entries.forEach((_ref2) => {
          let {
            contentBoxSize,
            contentRect,
            target
          } = _ref2;
          if (target && target !== swiper.el) return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };
  const removeObserver = () => {
    if (animationFrame) {
      window2.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };
  const orientationChangeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit("orientationchange");
  };
  on2("init", () => {
    if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
      createObserver();
      return;
    }
    window2.addEventListener("resize", resizeHandler);
    window2.addEventListener("orientationchange", orientationChangeHandler);
  });
  on2("destroy", () => {
    removeObserver();
    window2.removeEventListener("resize", resizeHandler);
    window2.removeEventListener("orientationchange", orientationChangeHandler);
  });
}
function Observer(_ref) {
  let {
    swiper,
    extendParams,
    on: on2,
    emit
  } = _ref;
  const observers = [];
  const window2 = getWindow();
  const attach = function(target, options) {
    if (options === void 0) {
      options = {};
    }
    const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
    const observer = new ObserverFunc((mutations) => {
      if (swiper.__preventObserver__) return;
      if (mutations.length === 1) {
        emit("observerUpdate", mutations[0]);
        return;
      }
      const observerUpdate = function observerUpdate2() {
        emit("observerUpdate", mutations[0]);
      };
      if (window2.requestAnimationFrame) {
        window2.requestAnimationFrame(observerUpdate);
      } else {
        window2.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === "undefined" ? true : options.attributes,
      childList: typeof options.childList === "undefined" ? true : options.childList,
      characterData: typeof options.characterData === "undefined" ? true : options.characterData
    });
    observers.push(observer);
  };
  const init = () => {
    if (!swiper.params.observer) return;
    if (swiper.params.observeParents) {
      const containerParents = elementParents(swiper.hostEl);
      for (let i = 0; i < containerParents.length; i += 1) {
        attach(containerParents[i]);
      }
    }
    attach(swiper.hostEl, {
      childList: swiper.params.observeSlideChildren
    });
    attach(swiper.wrapperEl, {
      attributes: false
    });
  };
  const destroy = () => {
    observers.forEach((observer) => {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on2("init", init);
  on2("destroy", destroy);
}
var eventsEmitter = {
  on(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== "function") return self;
    const method = priority ? "unshift" : "push";
    events2.split(" ").forEach((event2) => {
      if (!self.eventsListeners[event2]) self.eventsListeners[event2] = [];
      self.eventsListeners[event2][method](handler);
    });
    return self;
  },
  once(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== "function") return self;
    function onceHandler() {
      self.off(events2, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events2, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== "function") return self;
    const method = priority ? "unshift" : "push";
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny(handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsAnyListeners) return self;
    const index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },
  off(events2, handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    events2.split(" ").forEach((event2) => {
      if (typeof handler === "undefined") {
        self.eventsListeners[event2] = [];
      } else if (self.eventsListeners[event2]) {
        self.eventsListeners[event2].forEach((eventHandler, index) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event2].splice(index, 1);
          }
        });
      }
    });
    return self;
  },
  emit() {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    let events2;
    let data;
    let context;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (typeof args[0] === "string" || Array.isArray(args[0])) {
      events2 = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events2 = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
    eventsArray.forEach((event2) => {
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach((eventHandler) => {
          eventHandler.apply(context, [event2, ...data]);
        });
      }
      if (self.eventsListeners && self.eventsListeners[event2]) {
        self.eventsListeners[event2].forEach((eventHandler) => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
};
function updateSize() {
  const swiper = this;
  let width;
  let height;
  const el2 = swiper.el;
  if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el2.clientWidth;
  }
  if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el2.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }
  width = width - parseInt(elementStyle(el2, "padding-left") || 0, 10) - parseInt(elementStyle(el2, "padding-right") || 0, 10);
  height = height - parseInt(elementStyle(el2, "padding-top") || 0, 10) - parseInt(elementStyle(el2, "padding-bottom") || 0, 10);
  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;
  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height
  });
}
function updateSlides() {
  const swiper = this;
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
  }
  const params = swiper.params;
  const {
    wrapperEl,
    slidesEl,
    size: swiperSize,
    rtlTranslate: rtl,
    wrongRTL
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === "function") {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === "function") {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  const previousSnapGridLength = swiper.snapGrid.length;
  const previousSlidesGridLength = swiper.slidesGrid.length;
  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index = 0;
  if (typeof swiperSize === "undefined") {
    return;
  }
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
  } else if (typeof spaceBetween === "string") {
    spaceBetween = parseFloat(spaceBetween);
  }
  swiper.virtualSize = -spaceBetween;
  slides.forEach((slideEl) => {
    if (rtl) {
      slideEl.style.marginLeft = "";
    } else {
      slideEl.style.marginRight = "";
    }
    slideEl.style.marginBottom = "";
    slideEl.style.marginTop = "";
  });
  if (params.centeredSlides && params.cssMode) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
    setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
  }
  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slides);
  } else if (swiper.grid) {
    swiper.grid.unsetSlides();
  }
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
    return typeof params.breakpoints[key].slidesPerView !== "undefined";
  }).length > 0;
  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    let slide2;
    if (slides[i]) slide2 = slides[i];
    if (gridEnabled) {
      swiper.grid.updateSlide(i, slide2, slides);
    }
    if (slides[i] && elementStyle(slide2, "display") === "none") continue;
    if (params.slidesPerView === "auto") {
      if (shouldResetSlideSize) {
        slides[i].style[swiper.getDirectionLabel("width")] = ``;
      }
      const slideStyles = getComputedStyle(slide2);
      const currentTransform = slide2.style.transform;
      const currentWebKitTransform = slide2.style.webkitTransform;
      if (currentTransform) {
        slide2.style.transform = "none";
      }
      if (currentWebKitTransform) {
        slide2.style.webkitTransform = "none";
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width", true) : elementOuterSize(slide2, "height", true);
      } else {
        const width = getDirectionPropertyValue(slideStyles, "width");
        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
        const boxSizing = slideStyles.getPropertyValue("box-sizing");
        if (boxSizing && boxSizing === "border-box") {
          slideSize = width + marginLeft + marginRight;
        } else {
          const {
            clientWidth,
            offsetWidth
          } = slide2;
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide2.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide2.style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths) slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths) slideSize = Math.floor(slideSize);
      if (slides[i]) {
        slides[i].style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
      }
    }
    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
    wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (params.setWrapperSize) {
    wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid);
  }
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (isVirtual && params.loop) {
    const size = slidesSizesGrid[0] + spaceBetween;
    if (params.slidesPerGroup > 1) {
      const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
      const groupSize = size * params.slidesPerGroup;
      for (let i = 0; i < groups; i += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
      if (params.slidesPerGroup === 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + size);
      }
      slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
      swiper.virtualSize += size;
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];
  if (spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
    slides.filter((_, slideIndex) => {
      if (!params.cssMode || params.loop) return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach((slideEl) => {
      slideEl.style[key] = `${spaceBetween}px`;
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const maxSnap = allSlidesSize - swiperSize;
    snapGrid = snapGrid.map((snap) => {
      if (snap <= 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const offsetSize = (params.slidesOffsetBefore || 0) + (params.slidesOffsetAfter || 0);
    if (allSlidesSize + offsetSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
    setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper.snapGrid[0];
    const addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
    swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit("slidesLengthChange");
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit("snapGridLengthChange");
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit("slidesGridLengthChange");
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  swiper.emit("slidesUpdated");
  if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
}
function updateAutoHeight(speed) {
  const swiper = this;
  const activeSlides = [];
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0;
  let i;
  if (typeof speed === "number") {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  const getSlideByIndex = (index) => {
    if (isVirtual) {
      return swiper.slides[swiper.getSlideIndexByData(index)];
    }
    return swiper.slides[index];
  };
  if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || []).forEach((slide2) => {
        activeSlides.push(slide2);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        const index = swiper.activeIndex + i;
        if (index > swiper.slides.length && !isVirtual) break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== "undefined") {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }
  if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
}
function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;
  const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
  }
}
var toggleSlideClasses$1 = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};
function updateSlidesProgress(translate2) {
  if (translate2 === void 0) {
    translate2 = this && this.translate || 0;
  }
  const swiper = this;
  const params = swiper.params;
  const {
    slides,
    rtlTranslate: rtl,
    snapGrid
  } = swiper;
  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
  let offsetCenter = -translate2;
  if (rtl) offsetCenter = translate2;
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  let spaceBetween = params.spaceBetween;
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
  } else if (typeof spaceBetween === "string") {
    spaceBetween = parseFloat(spaceBetween);
  }
  for (let i = 0; i < slides.length; i += 1) {
    const slide2 = slides[i];
    let slideOffset = slide2.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide2);
      swiper.visibleSlidesIndexes.push(i);
    }
    toggleSlideClasses$1(slide2, isVisible, params.slideVisibleClass);
    toggleSlideClasses$1(slide2, isFullyVisible, params.slideFullyVisibleClass);
    slide2.progress = rtl ? -slideProgress : slideProgress;
    slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}
function updateProgress(translate2) {
  const swiper = this;
  if (typeof translate2 === "undefined") {
    const multiplier = swiper.rtlTranslate ? -1 : 1;
    translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  const params = swiper.params;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd,
    progressLoop
  } = swiper;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate2 - swiper.minTranslate()) / translatesDiff;
    const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1;
    const isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
    isBeginning = isBeginningRounded || progress <= 0;
    isEnd = isEndRounded || progress >= 1;
    if (isBeginningRounded) progress = 0;
    if (isEndRounded) progress = 1;
  }
  if (params.loop) {
    const firstSlideIndex = swiper.getSlideIndexByData(0);
    const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
    const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
    const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
    const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
    const translateAbs = Math.abs(translate2);
    if (translateAbs >= firstSlideTranslate) {
      progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
    } else {
      progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
    }
    if (progressLoop > 1) progressLoop -= 1;
  }
  Object.assign(swiper, {
    progress,
    progressLoop,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate2);
  if (isBeginning && !wasBeginning) {
    swiper.emit("reachBeginning toEdge");
  }
  if (isEnd && !wasEnd) {
    swiper.emit("reachEnd toEdge");
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit("fromEdge");
  }
  swiper.emit("progress", progress);
}
var toggleSlideClasses = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    slidesEl,
    activeIndex
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  const getFilteredSlide = (selector) => {
    return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
  };
  let activeSlide;
  let prevSlide;
  let nextSlide;
  if (isVirtual) {
    if (params.loop) {
      let slideIndex = activeIndex - swiper.virtual.slidesBefore;
      if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
      if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
    } else {
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
    }
  } else {
    if (gridEnabled) {
      activeSlide = slides.filter((slideEl) => slideEl.column === activeIndex)[0];
      nextSlide = slides.filter((slideEl) => slideEl.column === activeIndex + 1)[0];
      prevSlide = slides.filter((slideEl) => slideEl.column === activeIndex - 1)[0];
    } else {
      activeSlide = slides[activeIndex];
    }
  }
  if (activeSlide) {
    if (!gridEnabled) {
      nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !nextSlide) {
        nextSlide = slides[0];
      }
      prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !prevSlide === 0) {
        prevSlide = slides[slides.length - 1];
      }
    }
  }
  slides.forEach((slideEl) => {
    toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
    toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
    toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
  });
  swiper.emitSlidesClasses();
}
var processLazyPreloader = (swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  const slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    if (!lazyEl && swiper.isElement) {
      if (slideEl.shadowRoot) {
        lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
      } else {
        requestAnimationFrame(() => {
          if (slideEl.shadowRoot) {
            lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (lazyEl) lazyEl.remove();
          }
        });
      }
    }
    if (lazyEl) lazyEl.remove();
  }
};
var unlazy = (swiper, index) => {
  if (!swiper.slides[index]) return;
  const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
  if (imageEl) imageEl.removeAttribute("loading");
};
var preload = (swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  let amount = swiper.params.lazyPreloadPrevNext;
  const len = swiper.slides.length;
  if (!len || !amount || amount < 0) return;
  amount = Math.min(amount, len);
  const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
  const activeIndex = swiper.activeIndex;
  if (swiper.params.grid && swiper.params.grid.rows > 1) {
    const activeColumn = activeIndex;
    const preloadColumns = [activeColumn - amount];
    preloadColumns.push(...Array.from({
      length: amount
    }).map((_, i) => {
      return activeColumn + slidesPerView + i;
    }));
    swiper.slides.forEach((slideEl, i) => {
      if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
    });
    return;
  }
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind || swiper.params.loop) {
    for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      const realIndex = (i % len + len) % len;
      if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
    }
  } else {
    for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
      if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
        unlazy(swiper, i);
      }
    }
  }
};
function getActiveIndexByTranslate(swiper) {
  const {
    slidesGrid,
    params
  } = swiper;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  let activeIndex;
  for (let i = 0; i < slidesGrid.length; i += 1) {
    if (typeof slidesGrid[i + 1] !== "undefined") {
      if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
        activeIndex = i;
      } else if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1]) {
        activeIndex = i + 1;
      }
    } else if (translate2 >= slidesGrid[i]) {
      activeIndex = i;
    }
  }
  if (params.normalizeSlideIndex) {
    if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
  }
  return activeIndex;
}
function updateActiveIndex(newActiveIndex) {
  const swiper = this;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  const {
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper;
  let activeIndex = newActiveIndex;
  let snapIndex;
  const getVirtualRealIndex = (aIndex) => {
    let realIndex2 = aIndex - swiper.virtual.slidesBefore;
    if (realIndex2 < 0) {
      realIndex2 = swiper.virtual.slides.length + realIndex2;
    }
    if (realIndex2 >= swiper.virtual.slides.length) {
      realIndex2 -= swiper.virtual.slides.length;
    }
    return realIndex2;
  };
  if (typeof activeIndex === "undefined") {
    activeIndex = getActiveIndexByTranslate(swiper);
  }
  if (snapGrid.indexOf(translate2) >= 0) {
    snapIndex = snapGrid.indexOf(translate2);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex && !swiper.params.loop) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit("snapIndexChange");
    }
    return;
  }
  if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
    swiper.realIndex = getVirtualRealIndex(activeIndex);
    return;
  }
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  let realIndex;
  if (swiper.virtual && params.virtual.enabled && params.loop) {
    realIndex = getVirtualRealIndex(activeIndex);
  } else if (gridEnabled) {
    const firstSlideInColumn = swiper.slides.filter((slideEl) => slideEl.column === activeIndex)[0];
    let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
    if (Number.isNaN(activeSlideIndex)) {
      activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
    }
    realIndex = Math.floor(activeSlideIndex / params.grid.rows);
  } else if (swiper.slides[activeIndex]) {
    const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
    if (slideIndex) {
      realIndex = parseInt(slideIndex, 10);
    } else {
      realIndex = activeIndex;
    }
  } else {
    realIndex = activeIndex;
  }
  Object.assign(swiper, {
    previousSnapIndex,
    snapIndex,
    previousRealIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  if (swiper.initialized) {
    preload(swiper);
  }
  swiper.emit("activeIndexChange");
  swiper.emit("snapIndexChange");
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    if (previousRealIndex !== realIndex) {
      swiper.emit("realIndexChange");
    }
    swiper.emit("slideChange");
  }
}
function updateClickedSlide(el2, path) {
  const swiper = this;
  const params = swiper.params;
  let slide2 = el2.closest(`.${params.slideClass}, swiper-slide`);
  if (!slide2 && swiper.isElement && path && path.length > 1 && path.includes(el2)) {
    [...path.slice(path.indexOf(el2) + 1, path.length)].forEach((pathEl) => {
      if (!slide2 && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) {
        slide2 = pathEl;
      }
    });
  }
  let slideFound = false;
  let slideIndex;
  if (slide2) {
    for (let i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide2) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide2 && slideFound) {
    swiper.clickedSlide = slide2;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = void 0;
    swiper.clickedIndex = void 0;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}
var update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};
function getSwiperTranslate(axis) {
  if (axis === void 0) {
    axis = this.isHorizontal() ? "x" : "y";
  }
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl,
    translate: translate2,
    wrapperEl
  } = swiper;
  if (params.virtualTranslate) {
    return rtl ? -translate2 : translate2;
  }
  if (params.cssMode) {
    return translate2;
  }
  let currentTranslate = getTranslate(wrapperEl, axis);
  currentTranslate += swiper.cssOverflowAdjustment();
  if (rtl) currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}
function setTranslate(translate2, byController) {
  const swiper = this;
  const {
    rtlTranslate: rtl,
    params,
    wrapperEl,
    progress
  } = swiper;
  let x = 0;
  let y = 0;
  const z = 0;
  if (swiper.isHorizontal()) {
    x = rtl ? -translate2 : translate2;
  } else {
    y = translate2;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y;
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    if (swiper.isHorizontal()) {
      x -= swiper.cssOverflowAdjustment();
    } else {
      y -= swiper.cssOverflowAdjustment();
    }
    wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
  }
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate2);
  }
  swiper.emit("setTranslate", swiper.translate, byController);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(translate2, speed, runCallbacks, translateBounds, internal) {
  if (translate2 === void 0) {
    translate2 = 0;
  }
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (translateBounds === void 0) {
    translateBounds = true;
  }
  const swiper = this;
  const {
    params,
    wrapperEl
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  const minTranslate2 = swiper.minTranslate();
  const maxTranslate2 = swiper.maxTranslate();
  let newTranslate;
  if (translateBounds && translate2 > minTranslate2) newTranslate = minTranslate2;
  else if (translateBounds && translate2 < maxTranslate2) newTranslate = maxTranslate2;
  else newTranslate = translate2;
  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: -newTranslate,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: -newTranslate,
        behavior: "smooth"
      });
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionEnd");
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionStart");
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          swiper.animating = false;
          if (runCallbacks) {
            swiper.emit("transitionEnd");
          }
        };
      }
      swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}
var translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};
function setTransition(duration, byController) {
  const swiper = this;
  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
    swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
  }
  swiper.emit("setTransition", duration, byController);
}
function transitionEmit(_ref) {
  let {
    swiper,
    runCallbacks,
    direction,
    step
  } = _ref;
  const {
    activeIndex,
    previousIndex
  } = swiper;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) dir = "next";
    else if (activeIndex < previousIndex) dir = "prev";
    else dir = "reset";
  }
  swiper.emit(`transition${step}`);
  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === "reset") {
      swiper.emit(`slideResetTransition${step}`);
      return;
    }
    swiper.emit(`slideChangeTransition${step}`);
    if (dir === "next") {
      swiper.emit(`slideNextTransition${step}`);
    } else {
      swiper.emit(`slidePrevTransition${step}`);
    }
  }
}
function transitionStart(runCallbacks, direction) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "Start"
  });
}
function transitionEnd(runCallbacks, direction) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "End"
  });
}
var transition = {
  setTransition,
  transitionStart,
  transitionEnd
};
function slideTo(index, speed, runCallbacks, internal, initial) {
  if (index === void 0) {
    index = 0;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (typeof index === "string") {
    index = parseInt(index, 10);
  }
  const swiper = this;
  let slideIndex = index;
  if (slideIndex < 0) slideIndex = 0;
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = swiper;
  if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  const translate2 = -snapGrid[snapIndex];
  if (params.normalizeSlideIndex) {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate2 * 100);
      const normalizedGrid = Math.floor(slidesGrid[i] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && (rtl ? translate2 > swiper.translate && translate2 > swiper.minTranslate() : translate2 < swiper.translate && translate2 < swiper.minTranslate())) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit("beforeSlideChangeStart");
  }
  swiper.updateProgress(translate2);
  let direction;
  if (slideIndex > activeIndex) direction = "next";
  else if (slideIndex < activeIndex) direction = "prev";
  else direction = "reset";
  if (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate) {
    swiper.updateActiveIndex(slideIndex);
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== "slide") {
      swiper.setTranslate(translate2);
    }
    if (direction !== "reset") {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    const t = rtl ? translate2 : -translate2;
    if (speed === 0) {
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = "none";
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
        });
      } else {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
      }
      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper.wrapperEl.style.scrollSnapType = "";
          swiper._immediateVirtual = false;
        });
      }
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: t,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: t,
        behavior: "smooth"
      });
    }
    return true;
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate2);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit("beforeTransitionStart", speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e) {
        if (!swiper || swiper.destroyed) return;
        if (e.target !== this) return;
        swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
  }
  return true;
}
function slideToLoop(index, speed, runCallbacks, internal) {
  if (index === void 0) {
    index = 0;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (typeof index === "string") {
    const indexAsNumber = parseInt(index, 10);
    index = indexAsNumber;
  }
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
  let newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      let targetSlideIndex;
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        targetSlideIndex = swiper.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)[0].column;
      } else {
        targetSlideIndex = swiper.getSlideIndexByData(newIndex);
      }
      const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
      const {
        centeredSlides
      } = swiper.params;
      let slidesPerView = swiper.params.slidesPerView;
      if (slidesPerView === "auto") {
        slidesPerView = swiper.slidesPerViewDynamic();
      } else {
        slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
        if (centeredSlides && slidesPerView % 2 === 0) {
          slidesPerView = slidesPerView + 1;
        }
      }
      let needLoopFix = cols - targetSlideIndex < slidesPerView;
      if (centeredSlides) {
        needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
      }
      if (internal && centeredSlides && swiper.params.slidesPerView !== "auto" && !gridEnabled) {
        needLoopFix = false;
      }
      if (needLoopFix) {
        const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
        swiper.loopFix({
          direction,
          slideTo: true,
          activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
          slideRealIndex: direction === "next" ? swiper.realIndex : void 0
        });
      }
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        newIndex = swiper.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)[0].column;
      } else {
        newIndex = swiper.getSlideIndexByData(newIndex);
      }
    }
  }
  requestAnimationFrame(() => {
    swiper.slideTo(newIndex, speed, runCallbacks, internal);
  });
  return swiper;
}
function slideNext(speed, runCallbacks, internal) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    enabled,
    params,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  let perGroup = params.slidesPerGroup;
  if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
  }
  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: "next"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
    if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
      requestAnimationFrame(() => {
        swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
      });
      return true;
    }
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}
function slidePrev(speed, runCallbacks, internal) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    params,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: "prev"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate2);
  const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === "undefined" && params.cssMode) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== "undefined") {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  let prevIndex = 0;
  if (typeof prevSnap !== "undefined") {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
    requestAnimationFrame(() => {
      swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    });
    return true;
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}
function slideReset(speed, runCallbacks, internal) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
function slideToClosest(speed, runCallbacks, internal, threshold) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (threshold === void 0) {
    threshold = 0.5;
  }
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  let index = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate2 >= swiper.snapGrid[snapIndex]) {
    const currentSnap = swiper.snapGrid[snapIndex];
    const nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    const prevSnap = swiper.snapGrid[snapIndex - 1];
    const currentSnap = swiper.snapGrid[snapIndex];
    if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}
function slideToClickedSlide() {
  const swiper = this;
  if (swiper.destroyed) return;
  const {
    params,
    slidesEl
  } = swiper;
  const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.clickedIndex;
  let realIndex;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
        nextTick2(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
      nextTick2(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}
var slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};
function loopCreate(slideRealIndex) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  const initSlides = () => {
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    slides.forEach((el2, index) => {
      el2.setAttribute("data-swiper-slide-index", index);
    });
  };
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
  const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
  const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
  const addBlankSlides = (amountOfSlides) => {
    for (let i = 0; i < amountOfSlides; i += 1) {
      const slideEl = swiper.isElement ? createElement("swiper-slide", [params.slideBlankClass]) : createElement("div", [params.slideClass, params.slideBlankClass]);
      swiper.slidesEl.append(slideEl);
    }
  };
  if (shouldFillGroup) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    }
    initSlides();
  } else if (shouldFillGrid) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    }
    initSlides();
  } else {
    initSlides();
  }
  swiper.loopFix({
    slideRealIndex,
    direction: params.centeredSlides ? void 0 : "next"
  });
}
function loopFix(_temp) {
  let {
    slideRealIndex,
    slideTo: slideTo2 = true,
    direction,
    setTranslate: setTranslate2,
    activeSlideIndex,
    byController,
    byMousewheel
  } = _temp === void 0 ? {} : _temp;
  const swiper = this;
  if (!swiper.params.loop) return;
  swiper.emit("beforeLoopFix");
  const {
    slides,
    allowSlidePrev,
    allowSlideNext,
    slidesEl,
    params
  } = swiper;
  const {
    centeredSlides
  } = params;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  if (swiper.virtual && params.virtual.enabled) {
    if (slideTo2) {
      if (!params.centeredSlides && swiper.snapIndex === 0) {
        swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
      } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
        swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit("loopFix");
    return;
  }
  let slidesPerView = params.slidesPerView;
  if (slidesPerView === "auto") {
    slidesPerView = swiper.slidesPerViewDynamic();
  } else {
    slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
    if (centeredSlides && slidesPerView % 2 === 0) {
      slidesPerView = slidesPerView + 1;
    }
  }
  const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
  let loopedSlides = slidesPerGroup;
  if (loopedSlides % slidesPerGroup !== 0) {
    loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
  }
  loopedSlides += params.loopAdditionalSlides;
  swiper.loopedSlides = loopedSlides;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  if (slides.length < slidesPerView + loopedSlides) {
    showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters");
  } else if (gridEnabled && params.grid.fill === "row") {
    showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  }
  const prependSlidesIndexes = [];
  const appendSlidesIndexes = [];
  let activeIndex = swiper.activeIndex;
  if (typeof activeSlideIndex === "undefined") {
    activeSlideIndex = swiper.getSlideIndex(slides.filter((el2) => el2.classList.contains(params.slideActiveClass))[0]);
  } else {
    activeIndex = activeSlideIndex;
  }
  const isNext = direction === "next" || !direction;
  const isPrev = direction === "prev" || !direction;
  let slidesPrepended = 0;
  let slidesAppended = 0;
  const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
  const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
  const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate2 === "undefined" ? -slidesPerView / 2 + 0.5 : 0);
  if (activeColIndexWithShift < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
    for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        const colIndexToPrepend = cols - index - 1;
        for (let i3 = slides.length - 1; i3 >= 0; i3 -= 1) {
          if (slides[i3].column === colIndexToPrepend) prependSlidesIndexes.push(i3);
        }
      } else {
        prependSlidesIndexes.push(cols - index - 1);
      }
    }
  } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
    slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
    for (let i = 0; i < slidesAppended; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        slides.forEach((slide2, slideIndex) => {
          if (slide2.column === index) appendSlidesIndexes.push(slideIndex);
        });
      } else {
        appendSlidesIndexes.push(index);
      }
    }
  }
  swiper.__preventObserver__ = true;
  requestAnimationFrame(() => {
    swiper.__preventObserver__ = false;
  });
  if (isPrev) {
    prependSlidesIndexes.forEach((index) => {
      slides[index].swiperLoopMoveDOM = true;
      slidesEl.prepend(slides[index]);
      slides[index].swiperLoopMoveDOM = false;
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach((index) => {
      slides[index].swiperLoopMoveDOM = true;
      slidesEl.append(slides[index]);
      slides[index].swiperLoopMoveDOM = false;
    });
  }
  swiper.recalcSlides();
  if (params.slidesPerView === "auto") {
    swiper.updateSlides();
  } else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) {
    swiper.slides.forEach((slide2, slideIndex) => {
      swiper.grid.updateSlide(slideIndex, slide2, swiper.slides);
    });
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (slideTo2) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex === "undefined") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
          if (setTranslate2) {
            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
          }
        }
      } else {
        if (setTranslate2) {
          const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
          swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
          swiper.touchEventsData.currentTranslate = swiper.translate;
        }
      }
    } else if (appendSlidesIndexes.length > 0 && isNext) {
      if (typeof slideRealIndex === "undefined") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
          if (setTranslate2) {
            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
          }
        }
      } else {
        const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
        swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
      }
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.controller && swiper.controller.control && !byController) {
    const loopParams = {
      slideRealIndex,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController: true
    };
    if (Array.isArray(swiper.controller.control)) {
      swiper.controller.control.forEach((c) => {
        if (!c.destroyed && c.params.loop) c.loopFix({
          ...loopParams,
          slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo2 : false
        });
      });
    } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
      swiper.controller.control.loopFix({
        ...loopParams,
        slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo2 : false
      });
    }
  }
  swiper.emit("loopFix");
}
function loopDestroy() {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  swiper.recalcSlides();
  const newSlidesOrder = [];
  swiper.slides.forEach((slideEl) => {
    const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  });
  swiper.slides.forEach((slideEl) => {
    slideEl.removeAttribute("data-swiper-slide-index");
  });
  newSlidesOrder.forEach((slideEl) => {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}
var loop = {
  loopCreate,
  loopFix,
  loopDestroy
};
function setGrabCursor(moving) {
  const swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
  const el2 = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el2.style.cursor = "move";
  el2.style.cursor = moving ? "grabbing" : "grab";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}
function unsetGrabCursor() {
  const swiper = this;
  if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}
var grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};
function closestElement(selector, base) {
  if (base === void 0) {
    base = this;
  }
  function __closestFrom(el2) {
    if (!el2 || el2 === getDocument() || el2 === getWindow()) return null;
    if (el2.assignedSlot) el2 = el2.assignedSlot;
    const found = el2.closest(selector);
    if (!found && !el2.getRootNode) {
      return null;
    }
    return found || __closestFrom(el2.getRootNode().host);
  }
  return __closestFrom(base);
}
function preventEdgeSwipe(swiper, event2, startX) {
  const window2 = getWindow();
  const {
    params
  } = swiper;
  const edgeSwipeDetection = params.edgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === "prevent") {
      event2.preventDefault();
      return true;
    }
    return false;
  }
  return true;
}
function onTouchStart(event2) {
  const swiper = this;
  const document2 = getDocument();
  let e = event2;
  if (e.originalEvent) e = e.originalEvent;
  const data = swiper.touchEventsData;
  if (e.type === "pointerdown") {
    if (data.pointerId !== null && data.pointerId !== e.pointerId) {
      return;
    }
    data.pointerId = e.pointerId;
  } else if (e.type === "touchstart" && e.targetTouches.length === 1) {
    data.touchId = e.targetTouches[0].identifier;
  }
  if (e.type === "touchstart") {
    preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
    return;
  }
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === "mouse") return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let targetEl = e.target;
  if (params.touchEventsTarget === "wrapper") {
    if (!swiper.wrapperEl.contains(targetEl)) return;
  }
  if ("which" in e && e.which === 3) return;
  if ("button" in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return;
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
  const eventPath = e.composedPath ? e.composedPath() : e.path;
  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e.target && e.target.shadowRoot);
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler)) return;
  }
  touches.currentX = e.pageX;
  touches.currentY = e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;
  if (!preventEdgeSwipe(swiper, e, startX)) {
    return;
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: void 0,
    startMoving: void 0
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = void 0;
  if (params.threshold > 0) data.allowThresholdMove = false;
  let preventDefault = true;
  if (targetEl.matches(data.focusableElements)) {
    preventDefault = false;
    if (targetEl.nodeName === "SELECT") {
      data.isTouched = false;
    }
  }
  if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl) {
    document2.activeElement.blur();
  }
  const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
    e.preventDefault();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit("touchStart", e);
}
function onTouchMove(event2) {
  const document2 = getDocument();
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && event2.pointerType === "mouse") return;
  let e = event2;
  if (e.originalEvent) e = e.originalEvent;
  if (e.type === "pointermove") {
    if (data.touchId !== null) return;
    const id = e.pointerId;
    if (id !== data.pointerId) return;
  }
  let targetTouch;
  if (e.type === "touchmove") {
    targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  } else {
    targetTouch = e;
  }
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit("touchMoveOpposite", e);
    }
    return;
  }
  const pageX = targetTouch.pageX;
  const pageY = targetTouch.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = now();
    }
    return;
  }
  if (params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }
  if (document2.activeElement) {
    if (e.target === document2.activeElement && e.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit("touchMove", e);
  }
  touches.previousX = touches.currentX;
  touches.previousY = touches.currentY;
  touches.currentX = pageX;
  touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
  if (typeof data.isScrolling === "undefined") {
    let touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit("touchMoveOpposite", e);
  }
  if (typeof data.startMoving === "undefined") {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  let diff = swiper.isHorizontal() ? diffX : diffY;
  let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
  if (params.oneWayMovement) {
    diff = Math.abs(diff) * (rtl ? 1 : -1);
    touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
  }
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) {
    diff = -diff;
    touchesDiff = -touchesDiff;
  }
  const prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? "prev" : "next";
  swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
  const isLoop = swiper.params.loop && !params.cssMode;
  const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
  if (!data.isMoved) {
    if (isLoop && allowLoopFix) {
      swiper.loopFix({
        direction: swiper.swipeDirection
      });
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      const evt = new window.CustomEvent("transitionend", {
        bubbles: true,
        cancelable: true,
        detail: {
          bySwiperTouchMove: true
        }
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit("sliderFirstMove", e);
  }
  let loopFixed;
  (/* @__PURE__ */ new Date()).getTime();
  if (data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
    Object.assign(touches, {
      startX: pageX,
      startY: pageY,
      currentX: pageX,
      currentY: pageY,
      startTranslate: data.currentTranslate
    });
    data.loopSwapReset = true;
    data.startTranslate = data.currentTranslate;
    return;
  }
  swiper.emit("sliderMove", e);
  data.isMoved = true;
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] : swiper.minTranslate())) {
      swiper.loopFix({
        direction: "prev",
        setTranslate: true,
        activeSlideIndex: 0
      });
    }
    if (data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      }
    }
  } else if (diff < 0) {
    if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] : swiper.maxTranslate())) {
      swiper.loopFix({
        direction: "next",
        setTranslate: true,
        activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
      });
    }
    if (data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }
    }
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }
  if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode) return;
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  swiper.updateProgress(data.currentTranslate);
  swiper.setTranslate(data.currentTranslate);
}
function onTouchEnd(event2) {
  const swiper = this;
  const data = swiper.touchEventsData;
  let e = event2;
  if (e.originalEvent) e = e.originalEvent;
  let targetTouch;
  const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
  if (!isTouchEvent) {
    if (data.touchId !== null) return;
    if (e.pointerId !== data.pointerId) return;
    targetTouch = e;
  } else {
    targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(e.type)) {
    const proceed = ["pointercancel", "contextmenu"].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
    if (!proceed) {
      return;
    }
  }
  data.pointerId = null;
  data.touchId = null;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === "mouse") return;
  if (data.allowTouchCallbacks) {
    swiper.emit("touchEnd", e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }
  const touchEndTime = now();
  const timeDiff = touchEndTime - data.touchStartTime;
  if (swiper.allowClick) {
    const pathTree = e.path || e.composedPath && e.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
    swiper.emit("tap click", e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit("doubleTap doubleClick", e);
    }
  }
  data.lastClickTime = now();
  nextTick2(() => {
    if (!swiper.destroyed) swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  let currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }
  const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];
  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment2 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + increment2] !== "undefined") {
      if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) {
        stopIndex = i;
        groupSize = slidesGrid[i + increment2] - slidesGrid[i];
      }
    } else if (swipeToLast || currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  let rewindFirstIndex = null;
  let rewindLastIndex = null;
  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    } else if (swiper.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === "next") {
      if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
      else swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === "prev") {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper.slideTo(rewindLastIndex);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } else {
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === "next") {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === "prev") {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}
function onResize() {
  const swiper = this;
  const {
    params,
    el: el2
  } = swiper;
  if (el2 && el2.offsetWidth === 0) return;
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }
  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper;
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  const isVirtualLoop = isVirtual && params.loop;
  if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    if (swiper.params.loop && !isVirtual) {
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    clearTimeout(swiper.autoplay.resizeTimeout);
    swiper.autoplay.resizeTimeout = setTimeout(() => {
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }, 500);
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}
function onClick(e) {
  const swiper = this;
  if (!swiper.enabled) return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}
function onScroll() {
  const swiper = this;
  const {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  if (swiper.translate === 0) swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit("setTranslate", swiper.translate, false);
}
function onLoad(e) {
  const swiper = this;
  processLazyPreloader(swiper, e.target);
  if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
    return;
  }
  swiper.update();
}
function onDocumentTouchStart() {
  const swiper = this;
  if (swiper.documentTouchHandlerProceeded) return;
  swiper.documentTouchHandlerProceeded = true;
  if (swiper.params.touchReleaseOnEdges) {
    swiper.el.style.touchAction = "auto";
  }
}
var events = (swiper, method) => {
  const document2 = getDocument();
  const {
    params,
    el: el2,
    wrapperEl,
    device
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
  const swiperMethod = method;
  if (!el2 || typeof el2 === "string") return;
  document2[domMethod]("touchstart", swiper.onDocumentTouchStart, {
    passive: false,
    capture
  });
  el2[domMethod]("touchstart", swiper.onTouchStart, {
    passive: false
  });
  el2[domMethod]("pointerdown", swiper.onTouchStart, {
    passive: false
  });
  document2[domMethod]("touchmove", swiper.onTouchMove, {
    passive: false,
    capture
  });
  document2[domMethod]("pointermove", swiper.onTouchMove, {
    passive: false,
    capture
  });
  document2[domMethod]("touchend", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerup", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointercancel", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("touchcancel", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerout", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerleave", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("contextmenu", swiper.onTouchEnd, {
    passive: true
  });
  if (params.preventClicks || params.preventClicksPropagation) {
    el2[domMethod]("click", swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]("scroll", swiper.onScroll);
  }
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
  } else {
    swiper[swiperMethod]("observerUpdate", onResize, true);
  }
  el2[domMethod]("load", swiper.onLoad, {
    capture: true
  });
};
function attachEvents() {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.onTouchStart = onTouchStart.bind(swiper);
  swiper.onTouchMove = onTouchMove.bind(swiper);
  swiper.onTouchEnd = onTouchEnd.bind(swiper);
  swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }
  swiper.onClick = onClick.bind(swiper);
  swiper.onLoad = onLoad.bind(swiper);
  events(swiper, "on");
}
function detachEvents() {
  const swiper = this;
  events(swiper, "off");
}
var events$1 = {
  attachEvents,
  detachEvents
};
var isGridEnabled = (swiper, params) => {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  const swiper = this;
  const {
    realIndex,
    initialized,
    params,
    el: el2
  } = swiper;
  const breakpoints2 = params.breakpoints;
  if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0) return;
  const breakpoint = swiper.getBreakpoint(breakpoints2, swiper.params.breakpointsBase, swiper.el);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
  const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);
  const wasGrabCursor = swiper.params.grabCursor;
  const isGrabCursor = breakpointParams.grabCursor;
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el2.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el2.classList.add(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
      el2.classList.add(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
  }
  if (wasGrabCursor && !isGrabCursor) {
    swiper.unsetGrabCursor();
  } else if (!wasGrabCursor && isGrabCursor) {
    swiper.setGrabCursor();
  }
  ["navigation", "pagination", "scrollbar"].forEach((prop) => {
    if (typeof breakpointParams[prop] === "undefined") return;
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      swiper[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      swiper[prop].enable();
    }
  });
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  const wasLoop = params.loop;
  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  extend2(swiper.params, breakpointParams);
  const isEnabled = swiper.params.enabled;
  const hasLoop = swiper.params.loop;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }
  swiper.currentBreakpoint = breakpoint;
  swiper.emit("_beforeBreakpoint", breakpointParams);
  if (initialized) {
    if (needsReLoop) {
      swiper.loopDestroy();
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (!wasLoop && hasLoop) {
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (wasLoop && !hasLoop) {
      swiper.loopDestroy();
    }
  }
  swiper.emit("breakpoint", breakpointParams);
}
function getBreakpoint(breakpoints2, base, containerEl) {
  if (base === void 0) {
    base = "window";
  }
  if (!breakpoints2 || base === "container" && !containerEl) return void 0;
  let breakpoint = false;
  const window2 = getWindow();
  const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints2).map((point) => {
    if (typeof point === "string" && point.indexOf("@") === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return {
        value,
        point
      };
    }
    return {
      value: point,
      point
    };
  });
  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  for (let i = 0; i < points.length; i += 1) {
    const {
      point,
      value
    } = points[i];
    if (base === "window") {
      if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || "max";
}
var breakpoints = {
  setBreakpoint,
  getBreakpoint
};
function prepareClasses(entries, prefix) {
  const resultClasses = [];
  entries.forEach((item) => {
    if (typeof item === "object") {
      Object.keys(item).forEach((classNames) => {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === "string") {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  const swiper = this;
  const {
    classNames,
    params,
    rtl,
    el: el2,
    device
  } = swiper;
  const suffixes = prepareClasses(["initialized", params.direction, {
    "free-mode": swiper.params.freeMode && params.freeMode.enabled
  }, {
    "autoheight": params.autoHeight
  }, {
    "rtl": rtl
  }, {
    "grid": params.grid && params.grid.rows > 1
  }, {
    "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
  }, {
    "android": device.android
  }, {
    "ios": device.ios
  }, {
    "css-mode": params.cssMode
  }, {
    "centered": params.cssMode && params.centeredSlides
  }, {
    "watch-progress": params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push(...suffixes);
  el2.classList.add(...classNames);
  swiper.emitContainerClasses();
}
function removeClasses() {
  const swiper = this;
  const {
    el: el2,
    classNames
  } = swiper;
  if (!el2 || typeof el2 === "string") return;
  el2.classList.remove(...classNames);
  swiper.emitContainerClasses();
}
var classes = {
  addClasses,
  removeClasses
};
function checkOverflow() {
  const swiper = this;
  const {
    isLocked: wasLocked,
    params
  } = swiper;
  const {
    slidesOffsetBefore
  } = params;
  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1;
    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? "lock" : "unlock");
  }
}
var checkOverflow$1 = {
  checkOverflow
};
var defaults = {
  init: true,
  direction: "horizontal",
  oneWayMovement: false,
  swiperElementNodeName: "SWIPER-CONTAINER",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  eventsPrefix: "swiper",
  enabled: true,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 5,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // loop
  loop: false,
  loopAddBlankSlides: true,
  loopAdditionalSlides: 0,
  loopPreventsSliding: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false
};
function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj) {
    if (obj === void 0) {
      obj = {};
    }
    const moduleParamName = Object.keys(obj)[0];
    const moduleParams = obj[moduleParamName];
    if (typeof moduleParams !== "object" || moduleParams === null) {
      extend2(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) {
      params[moduleParamName].auto = true;
    }
    if (["pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) {
      params[moduleParamName].auto = true;
    }
    if (!(moduleParamName in params && "enabled" in moduleParams)) {
      extend2(allModulesParams, obj);
      return;
    }
    if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName]) params[moduleParamName] = {
      enabled: false
    };
    extend2(allModulesParams, obj);
  };
}
var prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes
};
var extendedDefaults = {};
var Swiper = class _Swiper {
  constructor() {
    let el2;
    let params;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
      params = args[0];
    } else {
      [el2, params] = args;
    }
    if (!params) params = {};
    params = extend2({}, params);
    if (el2 && !params.el) params.el = el2;
    const document2 = getDocument();
    if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
      const swipers = [];
      document2.querySelectorAll(params.el).forEach((containerEl) => {
        const newParams = extend2({}, params, {
          el: containerEl
        });
        swipers.push(new _Swiper(newParams));
      });
      return swipers;
    }
    const swiper = this;
    swiper.__swiper__ = true;
    swiper.support = getSupport();
    swiper.device = getDevice({
      userAgent: params.userAgent
    });
    swiper.browser = getBrowser();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = [...swiper.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      swiper.modules.push(...params.modules);
    }
    const allModulesParams = {};
    swiper.modules.forEach((mod) => {
      mod({
        params,
        swiper,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });
    const swiperParams = extend2({}, defaults, allModulesParams);
    swiper.params = extend2({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = extend2({}, swiper.params);
    swiper.passedParams = extend2({}, params);
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach((eventName) => {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    }
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el: el2,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return swiper.params.direction === "horizontal";
      },
      isVertical() {
        return swiper.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit("_swiper");
    if (swiper.params.init) {
      swiper.init();
    }
    return swiper;
  }
  getDirectionLabel(property) {
    if (this.isHorizontal()) {
      return property;
    }
    return {
      "width": "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      "marginRight": "marginBottom"
    }[property];
  }
  getSlideIndex(slideEl) {
    const {
      slidesEl,
      params
    } = this;
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    const firstSlideIndex = elementIndex(slides[0]);
    return elementIndex(slideEl) - firstSlideIndex;
  }
  getSlideIndexByData(index) {
    return this.getSlideIndex(this.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index)[0]);
  }
  recalcSlides() {
    const swiper = this;
    const {
      slidesEl,
      params
    } = swiper;
    swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  }
  enable() {
    const swiper = this;
    if (swiper.enabled) return;
    swiper.enabled = true;
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }
    swiper.emit("enable");
  }
  disable() {
    const swiper = this;
    if (!swiper.enabled) return;
    swiper.enabled = false;
    if (swiper.params.grabCursor) {
      swiper.unsetGrabCursor();
    }
    swiper.emit("disable");
  }
  setProgress(progress, speed) {
    const swiper = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min2 = swiper.minTranslate();
    const max2 = swiper.maxTranslate();
    const current = (max2 - min2) * progress + min2;
    swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const cls = swiper.el.className.split(" ").filter((className) => {
      return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
    });
    swiper.emit("_containerClasses", cls.join(" "));
  }
  getSlideClasses(slideEl) {
    const swiper = this;
    if (swiper.destroyed) return "";
    return slideEl.className.split(" ").filter((className) => {
      return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
    }).join(" ");
  }
  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const updates = [];
    swiper.slides.forEach((slideEl) => {
      const classNames = swiper.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      });
      swiper.emit("_slideClass", slideEl, classNames);
    });
    swiper.emit("_slideClasses", updates);
  }
  slidesPerViewDynamic(view, exact) {
    if (view === void 0) {
      view = "current";
    }
    if (exact === void 0) {
      exact = false;
    }
    const swiper = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper;
    let spv = 1;
    if (typeof params.slidesPerView === "number") return params.slidesPerView;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += Math.ceil(slides[i].swiperSlideSize);
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
    } else {
      if (view === "current") {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }
  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed) return;
    const {
      snapGrid,
      params
    } = swiper;
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      }
    });
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    function setTranslate2() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    let translated;
    if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
      setTranslate2();
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
        const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
        translated = swiper.slideTo(slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate2();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
    swiper.emit("update");
  }
  changeDirection(newDirection, needUpdate) {
    if (needUpdate === void 0) {
      needUpdate = true;
    }
    const swiper = this;
    const currentDirection = swiper.params.direction;
    if (!newDirection) {
      newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
    }
    if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
      return swiper;
    }
    swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
    swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();
    swiper.params.direction = newDirection;
    swiper.slides.forEach((slideEl) => {
      if (newDirection === "vertical") {
        slideEl.style.width = "";
      } else {
        slideEl.style.height = "";
      }
    });
    swiper.emit("changeDirection");
    if (needUpdate) swiper.update();
    return swiper;
  }
  changeLanguageDirection(direction) {
    const swiper = this;
    if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
    swiper.rtl = direction === "rtl";
    swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
    if (swiper.rtl) {
      swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = "rtl";
    } else {
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = "ltr";
    }
    swiper.update();
  }
  mount(element) {
    const swiper = this;
    if (swiper.mounted) return true;
    let el2 = element || swiper.params.el;
    if (typeof el2 === "string") {
      el2 = document.querySelector(el2);
    }
    if (!el2) {
      return false;
    }
    el2.swiper = swiper;
    if (el2.parentNode && el2.parentNode.host && el2.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) {
      swiper.isElement = true;
    }
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
    };
    const getWrapper = () => {
      if (el2 && el2.shadowRoot && el2.shadowRoot.querySelector) {
        const res = el2.shadowRoot.querySelector(getWrapperSelector());
        return res;
      }
      return elementChildren(el2, getWrapperSelector())[0];
    };
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = createElement("div", swiper.params.wrapperClass);
      el2.append(wrapperEl);
      elementChildren(el2, `.${swiper.params.slideClass}`).forEach((slideEl) => {
        wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      el: el2,
      wrapperEl,
      slidesEl: swiper.isElement && !el2.parentNode.host.slideSlots ? el2.parentNode.host : wrapperEl,
      hostEl: swiper.isElement ? el2.parentNode.host : el2,
      mounted: true,
      // RTL
      rtl: el2.dir.toLowerCase() === "rtl" || elementStyle(el2, "direction") === "rtl",
      rtlTranslate: swiper.params.direction === "horizontal" && (el2.dir.toLowerCase() === "rtl" || elementStyle(el2, "direction") === "rtl"),
      wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
    });
    return true;
  }
  init(el2) {
    const swiper = this;
    if (swiper.initialized) return swiper;
    const mounted = swiper.mount(el2);
    if (mounted === false) return swiper;
    swiper.emit("beforeInit");
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }
    swiper.addClasses();
    swiper.updateSize();
    swiper.updateSlides();
    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }
    if (swiper.params.grabCursor && swiper.enabled) {
      swiper.setGrabCursor();
    }
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
    }
    if (swiper.params.loop) {
      swiper.loopCreate();
    }
    swiper.attachEvents();
    const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')];
    if (swiper.isElement) {
      lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
    }
    lazyElements.forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      } else {
        imageEl.addEventListener("load", (e) => {
          processLazyPreloader(swiper, e.target);
        });
      }
    });
    preload(swiper);
    swiper.initialized = true;
    preload(swiper);
    swiper.emit("init");
    swiper.emit("afterInit");
    return swiper;
  }
  destroy(deleteInstance, cleanStyles) {
    if (deleteInstance === void 0) {
      deleteInstance = true;
    }
    if (cleanStyles === void 0) {
      cleanStyles = true;
    }
    const swiper = this;
    const {
      params,
      el: el2,
      wrapperEl,
      slides
    } = swiper;
    if (typeof swiper.params === "undefined" || swiper.destroyed) {
      return null;
    }
    swiper.emit("beforeDestroy");
    swiper.initialized = false;
    swiper.detachEvents();
    if (params.loop) {
      swiper.loopDestroy();
    }
    if (cleanStyles) {
      swiper.removeClasses();
      if (el2 && typeof el2 !== "string") {
        el2.removeAttribute("style");
      }
      if (wrapperEl) {
        wrapperEl.removeAttribute("style");
      }
      if (slides && slides.length) {
        slides.forEach((slideEl) => {
          slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
          slideEl.removeAttribute("style");
          slideEl.removeAttribute("data-swiper-slide-index");
        });
      }
    }
    swiper.emit("destroy");
    Object.keys(swiper.eventsListeners).forEach((eventName) => {
      swiper.off(eventName);
    });
    if (deleteInstance !== false) {
      if (swiper.el && typeof swiper.el !== "string") {
        swiper.el.swiper = null;
      }
      deleteProps(swiper);
    }
    swiper.destroyed = true;
    return null;
  }
  static extendDefaults(newDefaults) {
    extend2(extendedDefaults, newDefaults);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(mod) {
    if (!_Swiper.prototype.__modules__) _Swiper.prototype.__modules__ = [];
    const modules = _Swiper.prototype.__modules__;
    if (typeof mod === "function" && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }
  static use(module) {
    if (Array.isArray(module)) {
      module.forEach((m) => _Swiper.installModule(m));
      return _Swiper;
    }
    _Swiper.installModule(module);
    return _Swiper;
  }
};
Object.keys(prototypes).forEach((prototypeGroup) => {
  Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([Resize, Observer]);

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/shared/update-swiper.mjs
var paramsList = [
  "eventsPrefix",
  "injectStyles",
  "injectStylesUrls",
  "modules",
  "init",
  "_direction",
  "oneWayMovement",
  "swiperElementNodeName",
  "touchEventsTarget",
  "initialSlide",
  "_speed",
  "cssMode",
  "updateOnWindowResize",
  "resizeObserver",
  "nested",
  "focusableElements",
  "_enabled",
  "_width",
  "_height",
  "preventInteractionOnTransition",
  "userAgent",
  "url",
  "_edgeSwipeDetection",
  "_edgeSwipeThreshold",
  "_freeMode",
  "_autoHeight",
  "setWrapperSize",
  "virtualTranslate",
  "_effect",
  "breakpoints",
  "breakpointsBase",
  "_spaceBetween",
  "_slidesPerView",
  "maxBackfaceHiddenSlides",
  "_grid",
  "_slidesPerGroup",
  "_slidesPerGroupSkip",
  "_slidesPerGroupAuto",
  "_centeredSlides",
  "_centeredSlidesBounds",
  "_slidesOffsetBefore",
  "_slidesOffsetAfter",
  "normalizeSlideIndex",
  "_centerInsufficientSlides",
  "_watchOverflow",
  "roundLengths",
  "touchRatio",
  "touchAngle",
  "simulateTouch",
  "_shortSwipes",
  "_longSwipes",
  "longSwipesRatio",
  "longSwipesMs",
  "_followFinger",
  "allowTouchMove",
  "_threshold",
  "touchMoveStopPropagation",
  "touchStartPreventDefault",
  "touchStartForcePreventDefault",
  "touchReleaseOnEdges",
  "uniqueNavElements",
  "_resistance",
  "_resistanceRatio",
  "_watchSlidesProgress",
  "_grabCursor",
  "preventClicks",
  "preventClicksPropagation",
  "_slideToClickedSlide",
  "_loop",
  "loopAdditionalSlides",
  "loopAddBlankSlides",
  "loopPreventsSliding",
  "_rewind",
  "_allowSlidePrev",
  "_allowSlideNext",
  "_swipeHandler",
  "_noSwiping",
  "noSwipingClass",
  "noSwipingSelector",
  "passiveListeners",
  "containerModifierClass",
  "slideClass",
  "slideActiveClass",
  "slideVisibleClass",
  "slideFullyVisibleClass",
  "slideNextClass",
  "slidePrevClass",
  "slideBlankClass",
  "wrapperClass",
  "lazyPreloaderClass",
  "lazyPreloadPrevNext",
  "runCallbacksOnInit",
  "observer",
  "observeParents",
  "observeSlideChildren",
  // modules
  "a11y",
  "_autoplay",
  "_controller",
  "coverflowEffect",
  "cubeEffect",
  "fadeEffect",
  "flipEffect",
  "creativeEffect",
  "cardsEffect",
  "hashNavigation",
  "history",
  "keyboard",
  "mousewheel",
  "_navigation",
  "_pagination",
  "parallax",
  "_scrollbar",
  "_thumbs",
  "virtual",
  "zoom",
  "control"
];
function isObject3(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object" && !o.__swiper__;
}
function extend3(target, src) {
  const noExtend = ["__proto__", "constructor", "prototype"];
  Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
    if (typeof target[key] === "undefined") target[key] = src[key];
    else if (isObject3(src[key]) && isObject3(target[key]) && Object.keys(src[key]).length > 0) {
      if (src[key].__swiper__) target[key] = src[key];
      else extend3(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}
function needsNavigation(params) {
  if (params === void 0) {
    params = {};
  }
  return params.navigation && typeof params.navigation.nextEl === "undefined" && typeof params.navigation.prevEl === "undefined";
}
function needsPagination(params) {
  if (params === void 0) {
    params = {};
  }
  return params.pagination && typeof params.pagination.el === "undefined";
}
function needsScrollbar(params) {
  if (params === void 0) {
    params = {};
  }
  return params.scrollbar && typeof params.scrollbar.el === "undefined";
}
function uniqueClasses(classNames) {
  if (classNames === void 0) {
    classNames = "";
  }
  const classes2 = classNames.split(" ").map((c) => c.trim()).filter((c) => !!c);
  const unique = [];
  classes2.forEach((c) => {
    if (unique.indexOf(c) < 0) unique.push(c);
  });
  return unique.join(" ");
}
function wrapperClass(className) {
  if (className === void 0) {
    className = "";
  }
  if (!className) return "swiper-wrapper";
  if (!className.includes("swiper-wrapper")) return `swiper-wrapper ${className}`;
  return className;
}
function updateSwiper(_ref) {
  let {
    swiper,
    slides,
    passedParams,
    changedParams,
    nextEl,
    prevEl,
    scrollbarEl,
    paginationEl
  } = _ref;
  const updateParams = changedParams.filter((key) => key !== "children" && key !== "direction" && key !== "wrapperClass");
  const {
    params: currentParams,
    pagination,
    navigation,
    scrollbar,
    virtual,
    thumbs
  } = swiper;
  let needThumbsInit;
  let needControllerInit;
  let needPaginationInit;
  let needScrollbarInit;
  let needNavigationInit;
  let loopNeedDestroy;
  let loopNeedEnable;
  let loopNeedReloop;
  if (changedParams.includes("thumbs") && passedParams.thumbs && passedParams.thumbs.swiper && currentParams.thumbs && !currentParams.thumbs.swiper) {
    needThumbsInit = true;
  }
  if (changedParams.includes("controller") && passedParams.controller && passedParams.controller.control && currentParams.controller && !currentParams.controller.control) {
    needControllerInit = true;
  }
  if (changedParams.includes("pagination") && passedParams.pagination && (passedParams.pagination.el || paginationEl) && (currentParams.pagination || currentParams.pagination === false) && pagination && !pagination.el) {
    needPaginationInit = true;
  }
  if (changedParams.includes("scrollbar") && passedParams.scrollbar && (passedParams.scrollbar.el || scrollbarEl) && (currentParams.scrollbar || currentParams.scrollbar === false) && scrollbar && !scrollbar.el) {
    needScrollbarInit = true;
  }
  if (changedParams.includes("navigation") && passedParams.navigation && (passedParams.navigation.prevEl || prevEl) && (passedParams.navigation.nextEl || nextEl) && (currentParams.navigation || currentParams.navigation === false) && navigation && !navigation.prevEl && !navigation.nextEl) {
    needNavigationInit = true;
  }
  const destroyModule = (mod) => {
    if (!swiper[mod]) return;
    swiper[mod].destroy();
    if (mod === "navigation") {
      if (swiper.isElement) {
        swiper[mod].prevEl.remove();
        swiper[mod].nextEl.remove();
      }
      currentParams[mod].prevEl = void 0;
      currentParams[mod].nextEl = void 0;
      swiper[mod].prevEl = void 0;
      swiper[mod].nextEl = void 0;
    } else {
      if (swiper.isElement) {
        swiper[mod].el.remove();
      }
      currentParams[mod].el = void 0;
      swiper[mod].el = void 0;
    }
  };
  if (changedParams.includes("loop") && swiper.isElement) {
    if (currentParams.loop && !passedParams.loop) {
      loopNeedDestroy = true;
    } else if (!currentParams.loop && passedParams.loop) {
      loopNeedEnable = true;
    } else {
      loopNeedReloop = true;
    }
  }
  updateParams.forEach((key) => {
    if (isObject3(currentParams[key]) && isObject3(passedParams[key])) {
      Object.assign(currentParams[key], passedParams[key]);
      if ((key === "navigation" || key === "pagination" || key === "scrollbar") && "enabled" in passedParams[key] && !passedParams[key].enabled) {
        destroyModule(key);
      }
    } else {
      const newValue = passedParams[key];
      if ((newValue === true || newValue === false) && (key === "navigation" || key === "pagination" || key === "scrollbar")) {
        if (newValue === false) {
          destroyModule(key);
        }
      } else {
        currentParams[key] = passedParams[key];
      }
    }
  });
  if (updateParams.includes("controller") && !needControllerInit && swiper.controller && swiper.controller.control && currentParams.controller && currentParams.controller.control) {
    swiper.controller.control = currentParams.controller.control;
  }
  if (changedParams.includes("children") && slides && virtual && currentParams.virtual.enabled) {
    virtual.slides = slides;
    virtual.update(true);
  } else if (changedParams.includes("virtual") && virtual && currentParams.virtual.enabled) {
    if (slides) virtual.slides = slides;
    virtual.update(true);
  }
  if (changedParams.includes("children") && slides && currentParams.loop) {
    loopNeedReloop = true;
  }
  if (needThumbsInit) {
    const initialized = thumbs.init();
    if (initialized) thumbs.update(true);
  }
  if (needControllerInit) {
    swiper.controller.control = currentParams.controller.control;
  }
  if (needPaginationInit) {
    if (swiper.isElement && (!paginationEl || typeof paginationEl === "string")) {
      paginationEl = document.createElement("div");
      paginationEl.classList.add("swiper-pagination");
      paginationEl.part.add("pagination");
      swiper.el.appendChild(paginationEl);
    }
    if (paginationEl) currentParams.pagination.el = paginationEl;
    pagination.init();
    pagination.render();
    pagination.update();
  }
  if (needScrollbarInit) {
    if (swiper.isElement && (!scrollbarEl || typeof scrollbarEl === "string")) {
      scrollbarEl = document.createElement("div");
      scrollbarEl.classList.add("swiper-scrollbar");
      scrollbarEl.part.add("scrollbar");
      swiper.el.appendChild(scrollbarEl);
    }
    if (scrollbarEl) currentParams.scrollbar.el = scrollbarEl;
    scrollbar.init();
    scrollbar.updateSize();
    scrollbar.setTranslate();
  }
  if (needNavigationInit) {
    if (swiper.isElement) {
      if (!nextEl || typeof nextEl === "string") {
        nextEl = document.createElement("div");
        nextEl.classList.add("swiper-button-next");
        nextEl.innerHTML = swiper.hostEl.constructor.nextButtonSvg;
        nextEl.part.add("button-next");
        swiper.el.appendChild(nextEl);
      }
      if (!prevEl || typeof prevEl === "string") {
        prevEl = document.createElement("div");
        prevEl.classList.add("swiper-button-prev");
        prevEl.innerHTML = swiper.hostEl.constructor.prevButtonSvg;
        prevEl.part.add("button-prev");
        swiper.el.appendChild(prevEl);
      }
    }
    if (nextEl) currentParams.navigation.nextEl = nextEl;
    if (prevEl) currentParams.navigation.prevEl = prevEl;
    navigation.init();
    navigation.update();
  }
  if (changedParams.includes("allowSlideNext")) {
    swiper.allowSlideNext = passedParams.allowSlideNext;
  }
  if (changedParams.includes("allowSlidePrev")) {
    swiper.allowSlidePrev = passedParams.allowSlidePrev;
  }
  if (changedParams.includes("direction")) {
    swiper.changeDirection(passedParams.direction, false);
  }
  if (loopNeedDestroy || loopNeedReloop) {
    swiper.loopDestroy();
  }
  if (loopNeedEnable || loopNeedReloop) {
    swiper.loopCreate();
  }
  swiper.update();
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/shared/update-on-virtual-data.mjs
function getParams(obj, splitEvents) {
  if (obj === void 0) {
    obj = {};
  }
  if (splitEvents === void 0) {
    splitEvents = true;
  }
  const params = {
    on: {}
  };
  const events2 = {};
  const passedParams = {};
  extend3(params, defaults);
  params._emitClasses = true;
  params.init = false;
  const rest = {};
  const allowedParams = paramsList.map((key) => key.replace(/_/, ""));
  const plainObj = Object.assign({}, obj);
  Object.keys(plainObj).forEach((key) => {
    if (typeof obj[key] === "undefined") return;
    if (allowedParams.indexOf(key) >= 0) {
      if (isObject3(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        extend3(params[key], obj[key]);
        extend3(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === "function") {
      if (splitEvents) {
        events2[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
      } else {
        params.on[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
      }
    } else {
      rest[key] = obj[key];
    }
  });
  ["navigation", "pagination", "scrollbar"].forEach((key) => {
    if (params[key] === true) params[key] = {};
    if (params[key] === false) delete params[key];
  });
  return {
    params,
    passedParams,
    rest,
    events: events2
  };
}
function mountSwiper(_ref, swiperParams) {
  let {
    el: el2,
    nextEl,
    prevEl,
    paginationEl,
    scrollbarEl,
    swiper
  } = _ref;
  if (needsNavigation(swiperParams) && nextEl && prevEl) {
    swiper.params.navigation.nextEl = nextEl;
    swiper.originalParams.navigation.nextEl = nextEl;
    swiper.params.navigation.prevEl = prevEl;
    swiper.originalParams.navigation.prevEl = prevEl;
  }
  if (needsPagination(swiperParams) && paginationEl) {
    swiper.params.pagination.el = paginationEl;
    swiper.originalParams.pagination.el = paginationEl;
  }
  if (needsScrollbar(swiperParams) && scrollbarEl) {
    swiper.params.scrollbar.el = scrollbarEl;
    swiper.originalParams.scrollbar.el = scrollbarEl;
  }
  swiper.init(el2);
}
function getChangedParams(swiperParams, oldParams, children, oldChildren, getKey) {
  const keys = [];
  if (!oldParams) return keys;
  const addKey = (key) => {
    if (keys.indexOf(key) < 0) keys.push(key);
  };
  if (children && oldChildren) {
    const oldChildrenKeys = oldChildren.map(getKey);
    const childrenKeys = children.map(getKey);
    if (oldChildrenKeys.join("") !== childrenKeys.join("")) addKey("children");
    if (oldChildren.length !== children.length) addKey("children");
  }
  const watchParams = paramsList.filter((key) => key[0] === "_").map((key) => key.replace(/_/, ""));
  watchParams.forEach((key) => {
    if (key in swiperParams && key in oldParams) {
      if (isObject3(swiperParams[key]) && isObject3(oldParams[key])) {
        const newKeys = Object.keys(swiperParams[key]);
        const oldKeys = Object.keys(oldParams[key]);
        if (newKeys.length !== oldKeys.length) {
          addKey(key);
        } else {
          newKeys.forEach((newKey) => {
            if (swiperParams[key][newKey] !== oldParams[key][newKey]) {
              addKey(key);
            }
          });
          oldKeys.forEach((oldKey) => {
            if (swiperParams[key][oldKey] !== oldParams[key][oldKey]) addKey(key);
          });
        }
      } else if (swiperParams[key] !== oldParams[key]) {
        addKey(key);
      }
    }
  });
  return keys;
}
var updateOnVirtualData = (swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params.virtual || swiper.params.virtual && !swiper.params.virtual.enabled) return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();
  if (swiper.parallax && swiper.params.parallax && swiper.params.parallax.enabled) {
    swiper.parallax.setTranslate();
  }
};

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/swiper-vue.mjs
function getChildren(originalSlots, slidesRef, oldSlidesRef) {
  if (originalSlots === void 0) {
    originalSlots = {};
  }
  const slides = [];
  const slots = {
    "container-start": [],
    "container-end": [],
    "wrapper-start": [],
    "wrapper-end": []
  };
  const getSlidesFromElements = (els, slotName) => {
    if (!Array.isArray(els)) {
      return;
    }
    els.forEach((vnode) => {
      const isFragment = typeof vnode.type === "symbol";
      if (slotName === "default") slotName = "container-end";
      if (isFragment && vnode.children) {
        getSlidesFromElements(vnode.children, slotName);
      } else if (vnode.type && (vnode.type.name === "SwiperSlide" || vnode.type.name === "AsyncComponentWrapper") || vnode.componentOptions && vnode.componentOptions.tag === "SwiperSlide") {
        slides.push(vnode);
      } else if (slots[slotName]) {
        slots[slotName].push(vnode);
      }
    });
  };
  Object.keys(originalSlots).forEach((slotName) => {
    if (typeof originalSlots[slotName] !== "function") return;
    const els = originalSlots[slotName]();
    getSlidesFromElements(els, slotName);
  });
  oldSlidesRef.value = slidesRef.value;
  slidesRef.value = slides;
  return {
    slides,
    slots
  };
}
function renderVirtual(swiperRef, slides, virtualData) {
  if (!virtualData) return null;
  const getSlideIndex = (index) => {
    let slideIndex = index;
    if (index < 0) {
      slideIndex = slides.length + index;
    } else if (slideIndex >= slides.length) {
      slideIndex = slideIndex - slides.length;
    }
    return slideIndex;
  };
  const style = swiperRef.value.isHorizontal() ? {
    [swiperRef.value.rtlTranslate ? "right" : "left"]: `${virtualData.offset}px`
  } : {
    top: `${virtualData.offset}px`
  };
  const {
    from,
    to: to3
  } = virtualData;
  const loopFrom = swiperRef.value.params.loop ? -slides.length : 0;
  const loopTo = swiperRef.value.params.loop ? slides.length * 2 : slides.length;
  const slidesToRender = [];
  for (let i = loopFrom; i < loopTo; i += 1) {
    if (i >= from && i <= to3 && slidesToRender.length < slides.length) {
      slidesToRender.push(slides[getSlideIndex(i)]);
    }
  }
  return slidesToRender.map((slide2) => {
    if (!slide2.props) slide2.props = {};
    if (!slide2.props.style) slide2.props.style = {};
    slide2.props.swiperRef = swiperRef;
    slide2.props.style = style;
    if (slide2.type) {
      return h(slide2.type, {
        ...slide2.props
      }, slide2.children);
    } else if (slide2.componentOptions) {
      return h(slide2.componentOptions.Ctor, {
        ...slide2.props
      }, slide2.componentOptions.children);
    }
  });
}
var Swiper2 = {
  name: "Swiper",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    wrapperTag: {
      type: String,
      default: "div"
    },
    modules: {
      type: Array,
      default: void 0
    },
    init: {
      type: Boolean,
      default: void 0
    },
    direction: {
      type: String,
      default: void 0
    },
    oneWayMovement: {
      type: Boolean,
      default: void 0
    },
    swiperElementNodeName: {
      type: String,
      default: "SWIPER-CONTAINER"
    },
    touchEventsTarget: {
      type: String,
      default: void 0
    },
    initialSlide: {
      type: Number,
      default: void 0
    },
    speed: {
      type: Number,
      default: void 0
    },
    cssMode: {
      type: Boolean,
      default: void 0
    },
    updateOnWindowResize: {
      type: Boolean,
      default: void 0
    },
    resizeObserver: {
      type: Boolean,
      default: void 0
    },
    nested: {
      type: Boolean,
      default: void 0
    },
    focusableElements: {
      type: String,
      default: void 0
    },
    width: {
      type: Number,
      default: void 0
    },
    height: {
      type: Number,
      default: void 0
    },
    preventInteractionOnTransition: {
      type: Boolean,
      default: void 0
    },
    userAgent: {
      type: String,
      default: void 0
    },
    url: {
      type: String,
      default: void 0
    },
    edgeSwipeDetection: {
      type: [Boolean, String],
      default: void 0
    },
    edgeSwipeThreshold: {
      type: Number,
      default: void 0
    },
    autoHeight: {
      type: Boolean,
      default: void 0
    },
    setWrapperSize: {
      type: Boolean,
      default: void 0
    },
    virtualTranslate: {
      type: Boolean,
      default: void 0
    },
    effect: {
      type: String,
      default: void 0
    },
    breakpoints: {
      type: Object,
      default: void 0
    },
    spaceBetween: {
      type: [Number, String],
      default: void 0
    },
    slidesPerView: {
      type: [Number, String],
      default: void 0
    },
    maxBackfaceHiddenSlides: {
      type: Number,
      default: void 0
    },
    slidesPerGroup: {
      type: Number,
      default: void 0
    },
    slidesPerGroupSkip: {
      type: Number,
      default: void 0
    },
    slidesPerGroupAuto: {
      type: Boolean,
      default: void 0
    },
    centeredSlides: {
      type: Boolean,
      default: void 0
    },
    centeredSlidesBounds: {
      type: Boolean,
      default: void 0
    },
    slidesOffsetBefore: {
      type: Number,
      default: void 0
    },
    slidesOffsetAfter: {
      type: Number,
      default: void 0
    },
    normalizeSlideIndex: {
      type: Boolean,
      default: void 0
    },
    centerInsufficientSlides: {
      type: Boolean,
      default: void 0
    },
    watchOverflow: {
      type: Boolean,
      default: void 0
    },
    roundLengths: {
      type: Boolean,
      default: void 0
    },
    touchRatio: {
      type: Number,
      default: void 0
    },
    touchAngle: {
      type: Number,
      default: void 0
    },
    simulateTouch: {
      type: Boolean,
      default: void 0
    },
    shortSwipes: {
      type: Boolean,
      default: void 0
    },
    longSwipes: {
      type: Boolean,
      default: void 0
    },
    longSwipesRatio: {
      type: Number,
      default: void 0
    },
    longSwipesMs: {
      type: Number,
      default: void 0
    },
    followFinger: {
      type: Boolean,
      default: void 0
    },
    allowTouchMove: {
      type: Boolean,
      default: void 0
    },
    threshold: {
      type: Number,
      default: void 0
    },
    touchMoveStopPropagation: {
      type: Boolean,
      default: void 0
    },
    touchStartPreventDefault: {
      type: Boolean,
      default: void 0
    },
    touchStartForcePreventDefault: {
      type: Boolean,
      default: void 0
    },
    touchReleaseOnEdges: {
      type: Boolean,
      default: void 0
    },
    uniqueNavElements: {
      type: Boolean,
      default: void 0
    },
    resistance: {
      type: Boolean,
      default: void 0
    },
    resistanceRatio: {
      type: Number,
      default: void 0
    },
    watchSlidesProgress: {
      type: Boolean,
      default: void 0
    },
    grabCursor: {
      type: Boolean,
      default: void 0
    },
    preventClicks: {
      type: Boolean,
      default: void 0
    },
    preventClicksPropagation: {
      type: Boolean,
      default: void 0
    },
    slideToClickedSlide: {
      type: Boolean,
      default: void 0
    },
    loop: {
      type: Boolean,
      default: void 0
    },
    loopedSlides: {
      type: Number,
      default: void 0
    },
    loopPreventsSliding: {
      type: Boolean,
      default: void 0
    },
    rewind: {
      type: Boolean,
      default: void 0
    },
    allowSlidePrev: {
      type: Boolean,
      default: void 0
    },
    allowSlideNext: {
      type: Boolean,
      default: void 0
    },
    swipeHandler: {
      type: Boolean,
      default: void 0
    },
    noSwiping: {
      type: Boolean,
      default: void 0
    },
    noSwipingClass: {
      type: String,
      default: void 0
    },
    noSwipingSelector: {
      type: String,
      default: void 0
    },
    passiveListeners: {
      type: Boolean,
      default: void 0
    },
    containerModifierClass: {
      type: String,
      default: void 0
    },
    slideClass: {
      type: String,
      default: void 0
    },
    slideActiveClass: {
      type: String,
      default: void 0
    },
    slideVisibleClass: {
      type: String,
      default: void 0
    },
    slideFullyVisibleClass: {
      type: String,
      default: void 0
    },
    slideBlankClass: {
      type: String,
      default: void 0
    },
    slideNextClass: {
      type: String,
      default: void 0
    },
    slidePrevClass: {
      type: String,
      default: void 0
    },
    wrapperClass: {
      type: String,
      default: void 0
    },
    lazyPreloaderClass: {
      type: String,
      default: void 0
    },
    lazyPreloadPrevNext: {
      type: Number,
      default: void 0
    },
    runCallbacksOnInit: {
      type: Boolean,
      default: void 0
    },
    observer: {
      type: Boolean,
      default: void 0
    },
    observeParents: {
      type: Boolean,
      default: void 0
    },
    observeSlideChildren: {
      type: Boolean,
      default: void 0
    },
    a11y: {
      type: [Boolean, Object],
      default: void 0
    },
    autoplay: {
      type: [Boolean, Object],
      default: void 0
    },
    controller: {
      type: Object,
      default: void 0
    },
    coverflowEffect: {
      type: Object,
      default: void 0
    },
    cubeEffect: {
      type: Object,
      default: void 0
    },
    fadeEffect: {
      type: Object,
      default: void 0
    },
    flipEffect: {
      type: Object,
      default: void 0
    },
    creativeEffect: {
      type: Object,
      default: void 0
    },
    cardsEffect: {
      type: Object,
      default: void 0
    },
    hashNavigation: {
      type: [Boolean, Object],
      default: void 0
    },
    history: {
      type: [Boolean, Object],
      default: void 0
    },
    keyboard: {
      type: [Boolean, Object],
      default: void 0
    },
    mousewheel: {
      type: [Boolean, Object],
      default: void 0
    },
    navigation: {
      type: [Boolean, Object],
      default: void 0
    },
    pagination: {
      type: [Boolean, Object],
      default: void 0
    },
    parallax: {
      type: [Boolean, Object],
      default: void 0
    },
    scrollbar: {
      type: [Boolean, Object],
      default: void 0
    },
    thumbs: {
      type: Object,
      default: void 0
    },
    virtual: {
      type: [Boolean, Object],
      default: void 0
    },
    zoom: {
      type: [Boolean, Object],
      default: void 0
    },
    grid: {
      type: [Object],
      default: void 0
    },
    freeMode: {
      type: [Boolean, Object],
      default: void 0
    },
    enabled: {
      type: Boolean,
      default: void 0
    }
  },
  emits: ["_beforeBreakpoint", "_containerClasses", "_slideClass", "_slideClasses", "_swiper", "_freeModeNoMomentumRelease", "activeIndexChange", "afterInit", "autoplay", "autoplayStart", "autoplayStop", "autoplayPause", "autoplayResume", "autoplayTimeLeft", "beforeDestroy", "beforeInit", "beforeLoopFix", "beforeResize", "beforeSlideChangeStart", "beforeTransitionStart", "breakpoint", "breakpointsBase", "changeDirection", "click", "disable", "doubleTap", "doubleClick", "destroy", "enable", "fromEdge", "hashChange", "hashSet", "init", "keyPress", "lock", "loopFix", "momentumBounce", "navigationHide", "navigationShow", "navigationPrev", "navigationNext", "observerUpdate", "orientationchange", "paginationHide", "paginationRender", "paginationShow", "paginationUpdate", "progress", "reachBeginning", "reachEnd", "realIndexChange", "resize", "scroll", "scrollbarDragEnd", "scrollbarDragMove", "scrollbarDragStart", "setTransition", "setTranslate", "slidesUpdated", "slideChange", "slideChangeTransitionEnd", "slideChangeTransitionStart", "slideNextTransitionEnd", "slideNextTransitionStart", "slidePrevTransitionEnd", "slidePrevTransitionStart", "slideResetTransitionStart", "slideResetTransitionEnd", "sliderMove", "sliderFirstMove", "slidesLengthChange", "slidesGridLengthChange", "snapGridLengthChange", "snapIndexChange", "swiper", "tap", "toEdge", "touchEnd", "touchMove", "touchMoveOpposite", "touchStart", "transitionEnd", "transitionStart", "unlock", "update", "virtualUpdate", "zoomChange"],
  setup(props, _ref) {
    let {
      slots: originalSlots,
      emit
    } = _ref;
    const {
      tag: Tag,
      wrapperTag: WrapperTag
    } = props;
    const containerClasses = ref("swiper");
    const virtualData = ref(null);
    const breakpointChanged = ref(false);
    const initializedRef = ref(false);
    const swiperElRef = ref(null);
    const swiperRef = ref(null);
    const oldPassedParamsRef = ref(null);
    const slidesRef = {
      value: []
    };
    const oldSlidesRef = {
      value: []
    };
    const nextElRef = ref(null);
    const prevElRef = ref(null);
    const paginationElRef = ref(null);
    const scrollbarElRef = ref(null);
    const {
      params: swiperParams,
      passedParams
    } = getParams(props, false);
    getChildren(originalSlots, slidesRef, oldSlidesRef);
    oldPassedParamsRef.value = passedParams;
    oldSlidesRef.value = slidesRef.value;
    const onBeforeBreakpoint = () => {
      getChildren(originalSlots, slidesRef, oldSlidesRef);
      breakpointChanged.value = true;
    };
    swiperParams.onAny = function(event2) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      emit(event2, ...args);
    };
    Object.assign(swiperParams.on, {
      _beforeBreakpoint: onBeforeBreakpoint,
      _containerClasses(swiper, classes2) {
        containerClasses.value = classes2;
      }
    });
    const passParams = {
      ...swiperParams
    };
    delete passParams.wrapperClass;
    swiperRef.value = new Swiper(passParams);
    if (swiperRef.value.virtual && swiperRef.value.params.virtual.enabled) {
      swiperRef.value.virtual.slides = slidesRef.value;
      const extendWith = {
        cache: false,
        slides: slidesRef.value,
        renderExternal: (data) => {
          virtualData.value = data;
        },
        renderExternalUpdate: false
      };
      extend3(swiperRef.value.params.virtual, extendWith);
      extend3(swiperRef.value.originalParams.virtual, extendWith);
    }
    onUpdated(() => {
      if (!initializedRef.value && swiperRef.value) {
        swiperRef.value.emitSlidesClasses();
        initializedRef.value = true;
      }
      const {
        passedParams: newPassedParams
      } = getParams(props, false);
      const changedParams = getChangedParams(newPassedParams, oldPassedParamsRef.value, slidesRef.value, oldSlidesRef.value, (c) => c.props && c.props.key);
      oldPassedParamsRef.value = newPassedParams;
      if ((changedParams.length || breakpointChanged.value) && swiperRef.value && !swiperRef.value.destroyed) {
        updateSwiper({
          swiper: swiperRef.value,
          slides: slidesRef.value,
          passedParams: newPassedParams,
          changedParams,
          nextEl: nextElRef.value,
          prevEl: prevElRef.value,
          scrollbarEl: scrollbarElRef.value,
          paginationEl: paginationElRef.value
        });
      }
      breakpointChanged.value = false;
    });
    provide("swiper", swiperRef);
    watch(virtualData, () => {
      nextTick(() => {
        updateOnVirtualData(swiperRef.value);
      });
    });
    onMounted(() => {
      if (!swiperElRef.value) return;
      mountSwiper({
        el: swiperElRef.value,
        nextEl: nextElRef.value,
        prevEl: prevElRef.value,
        paginationEl: paginationElRef.value,
        scrollbarEl: scrollbarElRef.value,
        swiper: swiperRef.value
      }, swiperParams);
      emit("swiper", swiperRef.value);
    });
    onBeforeUnmount(() => {
      if (swiperRef.value && !swiperRef.value.destroyed) {
        swiperRef.value.destroy(true, false);
      }
    });
    function renderSlides(slides) {
      if (swiperParams.virtual) {
        return renderVirtual(swiperRef, slides, virtualData.value);
      }
      slides.forEach((slide2, index) => {
        if (!slide2.props) slide2.props = {};
        slide2.props.swiperRef = swiperRef;
        slide2.props.swiperSlideIndex = index;
      });
      return slides;
    }
    return () => {
      const {
        slides,
        slots
      } = getChildren(originalSlots, slidesRef, oldSlidesRef);
      return h(Tag, {
        ref: swiperElRef,
        class: uniqueClasses(containerClasses.value)
      }, [slots["container-start"], h(WrapperTag, {
        class: wrapperClass(swiperParams.wrapperClass)
      }, [slots["wrapper-start"], renderSlides(slides), slots["wrapper-end"]]), needsNavigation(props) && [h("div", {
        ref: prevElRef,
        class: "swiper-button-prev"
      }), h("div", {
        ref: nextElRef,
        class: "swiper-button-next"
      })], needsScrollbar(props) && h("div", {
        ref: scrollbarElRef,
        class: "swiper-scrollbar"
      }), needsPagination(props) && h("div", {
        ref: paginationElRef,
        class: "swiper-pagination"
      }), slots["container-end"]]);
    };
  }
};
var SwiperSlide = {
  name: "SwiperSlide",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    swiperRef: {
      type: Object,
      required: false
    },
    swiperSlideIndex: {
      type: Number,
      default: void 0,
      required: false
    },
    zoom: {
      type: Boolean,
      default: void 0,
      required: false
    },
    lazy: {
      type: Boolean,
      default: false,
      required: false
    },
    virtualIndex: {
      type: [String, Number],
      default: void 0
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    let eventAttached = false;
    const {
      swiperRef
    } = props;
    const slideElRef = ref(null);
    const slideClasses = ref("swiper-slide");
    const lazyLoaded = ref(false);
    function updateClasses(swiper, el2, classNames) {
      if (el2 === slideElRef.value) {
        slideClasses.value = classNames;
      }
    }
    onMounted(() => {
      if (!swiperRef || !swiperRef.value) return;
      swiperRef.value.on("_slideClass", updateClasses);
      eventAttached = true;
    });
    onBeforeUpdate(() => {
      if (eventAttached || !swiperRef || !swiperRef.value) return;
      swiperRef.value.on("_slideClass", updateClasses);
      eventAttached = true;
    });
    onUpdated(() => {
      if (!slideElRef.value || !swiperRef || !swiperRef.value) return;
      if (typeof props.swiperSlideIndex !== "undefined") {
        slideElRef.value.swiperSlideIndex = props.swiperSlideIndex;
      }
      if (swiperRef.value.destroyed) {
        if (slideClasses.value !== "swiper-slide") {
          slideClasses.value = "swiper-slide";
        }
      }
    });
    onBeforeUnmount(() => {
      if (!swiperRef || !swiperRef.value) return;
      swiperRef.value.off("_slideClass", updateClasses);
    });
    const slideData = computed(() => ({
      isActive: slideClasses.value.indexOf("swiper-slide-active") >= 0,
      isVisible: slideClasses.value.indexOf("swiper-slide-visible") >= 0,
      isPrev: slideClasses.value.indexOf("swiper-slide-prev") >= 0,
      isNext: slideClasses.value.indexOf("swiper-slide-next") >= 0
    }));
    provide("swiperSlide", slideData);
    const onLoad2 = () => {
      lazyLoaded.value = true;
    };
    return () => {
      return h(props.tag, {
        class: uniqueClasses(`${slideClasses.value}`),
        ref: slideElRef,
        "data-swiper-slide-index": typeof props.virtualIndex === "undefined" && swiperRef && swiperRef.value && swiperRef.value.params.loop ? props.swiperSlideIndex : props.virtualIndex,
        onLoadCapture: onLoad2
      }, props.zoom ? h("div", {
        class: "swiper-zoom-container",
        "data-swiper-zoom": typeof props.zoom === "number" ? props.zoom : void 0
      }, [slots.default && slots.default(slideData.value), props.lazy && !lazyLoaded.value && h("div", {
        class: "swiper-lazy-preloader"
      })]) : [slots.default && slots.default(slideData.value), props.lazy && !lazyLoaded.value && h("div", {
        class: "swiper-lazy-preloader"
      })]);
    };
  }
};

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/modules/mousewheel.mjs
function Mousewheel(_ref) {
  let {
    swiper,
    extendParams,
    on: on2,
    emit
  } = _ref;
  const window2 = getWindow();
  extendParams({
    mousewheel: {
      enabled: false,
      releaseOnEdges: false,
      invert: false,
      forceToAxis: false,
      sensitivity: 1,
      eventsTarget: "container",
      thresholdDelta: null,
      thresholdTime: null,
      noMousewheelClass: "swiper-no-mousewheel"
    }
  });
  swiper.mousewheel = {
    enabled: false
  };
  let timeout;
  let lastScrollTime = now();
  let lastEventBeforeSnap;
  const recentWheelEvents = [];
  function normalize(e) {
    const PIXEL_STEP = 10;
    const LINE_HEIGHT = 40;
    const PAGE_HEIGHT = 800;
    let sX = 0;
    let sY = 0;
    let pX = 0;
    let pY = 0;
    if ("detail" in e) {
      sY = e.detail;
    }
    if ("wheelDelta" in e) {
      sY = -e.wheelDelta / 120;
    }
    if ("wheelDeltaY" in e) {
      sY = -e.wheelDeltaY / 120;
    }
    if ("wheelDeltaX" in e) {
      sX = -e.wheelDeltaX / 120;
    }
    if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }
    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;
    if ("deltaY" in e) {
      pY = e.deltaY;
    }
    if ("deltaX" in e) {
      pX = e.deltaX;
    }
    if (e.shiftKey && !pX) {
      pX = pY;
      pY = 0;
    }
    if ((pX || pY) && e.deltaMode) {
      if (e.deltaMode === 1) {
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }
    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY
    };
  }
  function handleMouseEnter() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = true;
  }
  function handleMouseLeave() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = false;
  }
  function animateSlider(newEvent) {
    if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
      return false;
    }
    if (swiper.params.mousewheel.thresholdTime && now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
      return false;
    }
    if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
      return true;
    }
    if (newEvent.direction < 0) {
      if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
        swiper.slideNext();
        emit("scroll", newEvent.raw);
      }
    } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
      swiper.slidePrev();
      emit("scroll", newEvent.raw);
    }
    lastScrollTime = new window2.Date().getTime();
    return false;
  }
  function releaseScroll(newEvent) {
    const params = swiper.params.mousewheel;
    if (newEvent.direction < 0) {
      if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
        return true;
      }
    } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
      return true;
    }
    return false;
  }
  function handle(event2) {
    let e = event2;
    let disableParentSwiper = true;
    if (!swiper.enabled) return;
    if (event2.target.closest(`.${swiper.params.mousewheel.noMousewheelClass}`)) return;
    const params = swiper.params.mousewheel;
    if (swiper.params.cssMode) {
      e.preventDefault();
    }
    let targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== "container") {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    const targetElContainsTarget = targetEl && targetEl.contains(e.target);
    if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges) return true;
    if (e.originalEvent) e = e.originalEvent;
    let delta = 0;
    const rtlFactor = swiper.rtlTranslate ? -1 : 1;
    const data = normalize(e);
    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;
        else return true;
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;
      else return true;
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }
    if (delta === 0) return true;
    if (params.invert) delta = -delta;
    let positions = swiper.getTranslate() + delta * params.sensitivity;
    if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
    if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();
    disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
    if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
    if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
      const newEvent = {
        time: now(),
        delta: Math.abs(delta),
        direction: Math.sign(delta),
        raw: event2
      };
      if (recentWheelEvents.length >= 2) {
        recentWheelEvents.shift();
      }
      const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
      recentWheelEvents.push(newEvent);
      if (prevEvent) {
        if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
          animateSlider(newEvent);
        }
      } else {
        animateSlider(newEvent);
      }
      if (releaseScroll(newEvent)) {
        return true;
      }
    } else {
      const newEvent = {
        time: now(),
        delta: Math.abs(delta),
        direction: Math.sign(delta)
      };
      const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
      if (!ignoreWheelEvents) {
        lastEventBeforeSnap = void 0;
        let position = swiper.getTranslate() + delta * params.sensitivity;
        const wasBeginning = swiper.isBeginning;
        const wasEnd = swiper.isEnd;
        if (position >= swiper.minTranslate()) position = swiper.minTranslate();
        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
          swiper.updateSlidesClasses();
        }
        if (swiper.params.loop) {
          swiper.loopFix({
            direction: newEvent.direction < 0 ? "next" : "prev",
            byMousewheel: true
          });
        }
        if (swiper.params.freeMode.sticky) {
          clearTimeout(timeout);
          timeout = void 0;
          if (recentWheelEvents.length >= 15) {
            recentWheelEvents.shift();
          }
          const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
          const firstEvent = recentWheelEvents[0];
          recentWheelEvents.push(newEvent);
          if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
            recentWheelEvents.splice(0);
          } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
            const snapToThreshold = delta > 0 ? 0.8 : 0.2;
            lastEventBeforeSnap = newEvent;
            recentWheelEvents.splice(0);
            timeout = nextTick2(() => {
              swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
            }, 0);
          }
          if (!timeout) {
            timeout = nextTick2(() => {
              const snapToThreshold = 0.5;
              lastEventBeforeSnap = newEvent;
              recentWheelEvents.splice(0);
              swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
            }, 500);
          }
        }
        if (!ignoreWheelEvents) emit("scroll", e);
        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop();
        if (params.releaseOnEdges && (position === swiper.minTranslate() || position === swiper.maxTranslate())) {
          return true;
        }
      }
    }
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
    return false;
  }
  function events2(method) {
    let targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== "container") {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    targetEl[method]("mouseenter", handleMouseEnter);
    targetEl[method]("mouseleave", handleMouseLeave);
    targetEl[method]("wheel", handle);
  }
  function enable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.removeEventListener("wheel", handle);
      return true;
    }
    if (swiper.mousewheel.enabled) return false;
    events2("addEventListener");
    swiper.mousewheel.enabled = true;
    return true;
  }
  function disable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.addEventListener(event, handle);
      return true;
    }
    if (!swiper.mousewheel.enabled) return false;
    events2("removeEventListener");
    swiper.mousewheel.enabled = false;
    return true;
  }
  on2("init", () => {
    if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
      disable();
    }
    if (swiper.params.mousewheel.enabled) enable();
  });
  on2("destroy", () => {
    if (swiper.params.cssMode) {
      enable();
    }
    if (swiper.mousewheel.enabled) disable();
  });
  Object.assign(swiper.mousewheel, {
    enable,
    disable
  });
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/shared/create-element-if-not-defined.mjs
function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
        if (!element) {
          element = createElement("div", checkProps[key]);
          element.className = checkProps[key];
          swiper.el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/modules/navigation.mjs
function Navigation(_ref) {
  let {
    swiper,
    extendParams,
    on: on2,
    emit
  } = _ref;
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  });
  swiper.navigation = {
    nextEl: null,
    prevEl: null
  };
  function getEl(el2) {
    let res;
    if (el2 && typeof el2 === "string" && swiper.isElement) {
      res = swiper.el.querySelector(el2);
      if (res) return res;
    }
    if (el2) {
      if (typeof el2 === "string") res = [...document.querySelectorAll(el2)];
      if (swiper.params.uniqueNavElements && typeof el2 === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el2).length === 1) {
        res = swiper.el.querySelector(el2);
      } else if (res && res.length === 1) {
        res = res[0];
      }
    }
    if (el2 && !res) return el2;
    return res;
  }
  function toggleEl(el2, disabled) {
    const params = swiper.params.navigation;
    el2 = makeElementsArray(el2);
    el2.forEach((subEl) => {
      if (subEl) {
        subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
        if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
        }
      }
    });
  }
  function update2() {
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (swiper.params.loop) {
      toggleEl(prevEl, false);
      toggleEl(nextEl, false);
      return;
    }
    toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e) {
    e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
    emit("navigationPrev");
  }
  function onNextClick(e) {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
    emit("navigationNext");
  }
  function init() {
    const params = swiper.params.navigation;
    swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    });
    if (!(params.nextEl || params.prevEl)) return;
    let nextEl = getEl(params.nextEl);
    let prevEl = getEl(params.prevEl);
    Object.assign(swiper.navigation, {
      nextEl,
      prevEl
    });
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const initButton = (el2, dir) => {
      if (el2) {
        el2.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el2) {
        el2.classList.add(...params.lockClass.split(" "));
      }
    };
    nextEl.forEach((el2) => initButton(el2, "next"));
    prevEl.forEach((el2) => initButton(el2, "prev"));
  }
  function destroy() {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const destroyButton = (el2, dir) => {
      el2.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      el2.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
    };
    nextEl.forEach((el2) => destroyButton(el2, "next"));
    prevEl.forEach((el2) => destroyButton(el2, "prev"));
  }
  on2("init", () => {
    if (swiper.params.navigation.enabled === false) {
      disable();
    } else {
      init();
      update2();
    }
  });
  on2("toEdge fromEdge lock unlock", () => {
    update2();
  });
  on2("destroy", () => {
    destroy();
  });
  on2("enable disable", () => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    if (swiper.enabled) {
      update2();
      return;
    }
    [...nextEl, ...prevEl].filter((el2) => !!el2).forEach((el2) => el2.classList.add(swiper.params.navigation.lockClass));
  });
  on2("click", (_s2, e) => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const targetEl = e.target;
    let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
    if (swiper.isElement && !targetIsButton) {
      const path = e.path || e.composedPath && e.composedPath();
      if (path) {
        targetIsButton = path.find((pathEl) => nextEl.includes(pathEl) || prevEl.includes(pathEl));
      }
    }
    if (swiper.params.navigation.hideOnClick && !targetIsButton) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
      let isHidden;
      if (nextEl.length) {
        isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      } else if (prevEl.length) {
        isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit("navigationShow");
      } else {
        emit("navigationHide");
      }
      [...nextEl, ...prevEl].filter((el2) => !!el2).forEach((el2) => el2.classList.toggle(swiper.params.navigation.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
    init();
    update2();
  };
  const disable = () => {
    swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
    destroy();
  };
  Object.assign(swiper.navigation, {
    enable,
    disable,
    update: update2,
    init,
    destroy
  });
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/shared/classes-to-selector.mjs
function classesToSelector(classes2) {
  if (classes2 === void 0) {
    classes2 = "";
  }
  return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/modules/pagination.mjs
function Pagination(_ref) {
  let {
    swiper,
    extendParams,
    on: on2,
    emit
  } = _ref;
  const pfx = "swiper-pagination";
  extendParams({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: "bullets",
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: (number) => number,
      formatFractionTotal: (number) => number,
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`
    }
  });
  swiper.pagination = {
    el: null,
    bullets: []
  };
  let bulletSize;
  let dynamicBulletIndex = 0;
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
  }
  function setSideBullets(bulletEl, position) {
    const {
      bulletActiveClass
    } = swiper.params.pagination;
    if (!bulletEl) return;
    bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
    if (bulletEl) {
      bulletEl.classList.add(`${bulletActiveClass}-${position}`);
      bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
      }
    }
  }
  function onBulletClick(e) {
    const bulletEl = e.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
    if (!bulletEl) {
      return;
    }
    e.preventDefault();
    const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index) return;
      swiper.slideToLoop(index);
    } else {
      swiper.slideTo(index);
    }
  }
  function update2() {
    const rtl = swiper.rtl;
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el2 = swiper.pagination.el;
    el2 = makeElementsArray(el2);
    let current;
    let previousIndex;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      previousIndex = swiper.previousRealIndex || 0;
      current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
    } else if (typeof swiper.snapIndex !== "undefined") {
      current = swiper.snapIndex;
      previousIndex = swiper.previousSnapIndex;
    } else {
      previousIndex = swiper.previousIndex || 0;
      current = swiper.activeIndex || 0;
    }
    if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      const bullets = swiper.pagination.bullets;
      let firstIndex;
      let lastIndex;
      let midIndex;
      if (params.dynamicBullets) {
        bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
        el2.forEach((subEl) => {
          subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
        });
        if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
          dynamicBulletIndex += current - (previousIndex || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach((bulletEl) => {
        const classesToRemove = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => `${params.bulletActiveClass}${suffix}`)].map((s) => typeof s === "string" && s.includes(" ") ? s.split(" ") : s).flat();
        bulletEl.classList.remove(...classesToRemove);
      });
      if (el2.length > 1) {
        bullets.forEach((bullet) => {
          const bulletIndex = elementIndex(bullet);
          if (bulletIndex === current) {
            bullet.classList.add(...params.bulletActiveClass.split(" "));
          } else if (swiper.isElement) {
            bullet.setAttribute("part", "bullet");
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets(bullet, "prev");
            }
            if (bulletIndex === lastIndex) {
              setSideBullets(bullet, "next");
            }
          }
        });
      } else {
        const bullet = bullets[current];
        if (bullet) {
          bullet.classList.add(...params.bulletActiveClass.split(" "));
        }
        if (swiper.isElement) {
          bullets.forEach((bulletEl, bulletIndex) => {
            bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
          });
        }
        if (params.dynamicBullets) {
          const firstDisplayedBullet = bullets[firstIndex];
          const lastDisplayedBullet = bullets[lastIndex];
          for (let i = firstIndex; i <= lastIndex; i += 1) {
            if (bullets[i]) {
              bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
            }
          }
          setSideBullets(firstDisplayedBullet, "prev");
          setSideBullets(lastDisplayedBullet, "next");
        }
      }
      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        const offsetProp = rtl ? "right" : "left";
        bullets.forEach((bullet) => {
          bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
        });
      }
    }
    el2.forEach((subEl, subElIndex) => {
      if (params.type === "fraction") {
        subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
          fractionEl.textContent = params.formatFractionCurrent(current + 1);
        });
        subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
          totalEl.textContent = params.formatFractionTotal(total);
        });
      }
      if (params.type === "progressbar") {
        let progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal";
        } else {
          progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
        }
        const scale = (current + 1) / total;
        let scaleX = 1;
        let scaleY = 1;
        if (progressbarDirection === "horizontal") {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl) => {
          progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
          progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
        });
      }
      if (params.type === "custom" && params.renderCustom) {
        subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
        if (subElIndex === 0) emit("paginationRender", subEl);
      } else {
        if (subElIndex === 0) emit("paginationRender", subEl);
        emit("paginationUpdate", subEl);
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
      }
    });
  }
  function render2() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
    let el2 = swiper.pagination.el;
    el2 = makeElementsArray(el2);
    let paginationHTML = "";
    if (params.type === "bullets") {
      let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (let i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }
    }
    if (params.type === "fraction") {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`;
      }
    }
    if (params.type === "progressbar") {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }
    }
    swiper.pagination.bullets = [];
    el2.forEach((subEl) => {
      if (params.type !== "custom") {
        subEl.innerHTML = paginationHTML || "";
      }
      if (params.type === "bullets") {
        swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
      }
    });
    if (params.type !== "custom") {
      emit("paginationRender", el2[0]);
    }
  }
  function init() {
    swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: "swiper-pagination"
    });
    const params = swiper.params.pagination;
    if (!params.el) return;
    let el2;
    if (typeof params.el === "string" && swiper.isElement) {
      el2 = swiper.el.querySelector(params.el);
    }
    if (!el2 && typeof params.el === "string") {
      el2 = [...document.querySelectorAll(params.el)];
    }
    if (!el2) {
      el2 = params.el;
    }
    if (!el2 || el2.length === 0) return;
    if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el2) && el2.length > 1) {
      el2 = [...swiper.el.querySelectorAll(params.el)];
      if (el2.length > 1) {
        el2 = el2.filter((subEl) => {
          if (elementParents(subEl, ".swiper")[0] !== swiper.el) return false;
          return true;
        })[0];
      }
    }
    if (Array.isArray(el2) && el2.length === 1) el2 = el2[0];
    Object.assign(swiper.pagination, {
      el: el2
    });
    el2 = makeElementsArray(el2);
    el2.forEach((subEl) => {
      if (params.type === "bullets" && params.clickable) {
        subEl.classList.add(...(params.clickableClass || "").split(" "));
      }
      subEl.classList.add(params.modifierClass + params.type);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      if (params.type === "bullets" && params.dynamicBullets) {
        subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
        dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === "progressbar" && params.progressbarOpposite) {
        subEl.classList.add(params.progressbarOppositeClass);
      }
      if (params.clickable) {
        subEl.addEventListener("click", onBulletClick);
      }
      if (!swiper.enabled) {
        subEl.classList.add(params.lockClass);
      }
    });
  }
  function destroy() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el2 = swiper.pagination.el;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => {
        subEl.classList.remove(params.hiddenClass);
        subEl.classList.remove(params.modifierClass + params.type);
        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.clickable) {
          subEl.classList.remove(...(params.clickableClass || "").split(" "));
          subEl.removeEventListener("click", onBulletClick);
        }
      });
    }
    if (swiper.pagination.bullets) swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
  }
  on2("changeDirection", () => {
    if (!swiper.pagination || !swiper.pagination.el) return;
    const params = swiper.params.pagination;
    let {
      el: el2
    } = swiper.pagination;
    el2 = makeElementsArray(el2);
    el2.forEach((subEl) => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on2("init", () => {
    if (swiper.params.pagination.enabled === false) {
      disable();
    } else {
      init();
      render2();
      update2();
    }
  });
  on2("activeIndexChange", () => {
    if (typeof swiper.snapIndex === "undefined") {
      update2();
    }
  });
  on2("snapIndexChange", () => {
    update2();
  });
  on2("snapGridLengthChange", () => {
    render2();
    update2();
  });
  on2("destroy", () => {
    destroy();
  });
  on2("enable disable", () => {
    let {
      el: el2
    } = swiper.pagination;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
    }
  });
  on2("lock unlock", () => {
    update2();
  });
  on2("click", (_s2, e) => {
    const targetEl = e.target;
    const el2 = makeElementsArray(swiper.pagination.el);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el2 && el2.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
      const isHidden = el2[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit("paginationShow");
      } else {
        emit("paginationHide");
      }
      el2.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    let {
      el: el2
    } = swiper.pagination;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
    }
    init();
    render2();
    update2();
  };
  const disable = () => {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    let {
      el: el2
    } = swiper.pagination;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
    }
    destroy();
  };
  Object.assign(swiper.pagination, {
    enable,
    disable,
    render: render2,
    update: update2,
    init,
    destroy
  });
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/modules/autoplay.mjs
function Autoplay(_ref) {
  let {
    swiper,
    extendParams,
    on: on2,
    emit,
    params
  } = _ref;
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3e3,
      waitForTransition: true,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  let timeout;
  let raf;
  let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayTimeLeft;
  let autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
  let wasPaused;
  let isTouched;
  let pausedByTouch;
  let touchStartTimeout;
  let slideChanged;
  let pausedByInteraction;
  let pausedByPointerEnter;
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
    if (e.target !== swiper.wrapperEl) return;
    swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
    if (pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) {
      return;
    }
    resume();
  }
  const calcTimeLeft = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (/* @__PURE__ */ new Date()).getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
    raf = requestAnimationFrame(() => {
      calcTimeLeft();
    });
  };
  const getSlideDelay = () => {
    let activeSlideEl;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      activeSlideEl = swiper.slides.filter((slideEl) => slideEl.classList.contains("swiper-slide-active"))[0];
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl) return void 0;
    const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
    return currentSlideDelay;
  };
  const run = (delayForce) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    cancelAnimationFrame(raf);
    calcTimeLeft();
    let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
    autoplayDelayTotal = swiper.params.autoplay.delay;
    autoplayDelayCurrent = swiper.params.autoplay.delay;
    const currentSlideDelay = getSlideDelay();
    if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
      delay = currentSlideDelay;
      autoplayDelayTotal = currentSlideDelay;
      autoplayDelayCurrent = currentSlideDelay;
    }
    autoplayTimeLeft = delay;
    const speed = swiper.params.speed;
    const proceed = () => {
      if (!swiper || swiper.destroyed) return;
      if (swiper.params.autoplay.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit("autoplay");
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit("autoplay");
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
        requestAnimationFrame(() => {
          run();
        });
      }
    };
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(() => {
        proceed();
      });
    }
    return delay;
  };
  const start = () => {
    autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
    swiper.autoplay.running = true;
    run();
    emit("autoplayStart");
  };
  const stop = () => {
    swiper.autoplay.running = false;
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
    emit("autoplayStop");
  };
  const pause = (internal, reset) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    clearTimeout(timeout);
    if (!internal) {
      pausedByInteraction = true;
    }
    const proceed = () => {
      emit("autoplayPause");
      if (swiper.params.autoplay.waitForTransition) {
        swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd);
      } else {
        resume();
      }
    };
    swiper.autoplay.paused = true;
    if (reset) {
      if (slideChanged) {
        autoplayTimeLeft = swiper.params.autoplay.delay;
      }
      slideChanged = false;
      proceed();
      return;
    }
    const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
    autoplayTimeLeft = delay - ((/* @__PURE__ */ new Date()).getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
    if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
    proceed();
  };
  const resume = () => {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
    autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit("autoplayResume");
  };
  const onVisibilityChange = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    const document2 = getDocument();
    if (document2.visibilityState === "hidden") {
      pausedByInteraction = true;
      pause(true);
    }
    if (document2.visibilityState === "visible") {
      resume();
    }
  };
  const onPointerEnter = (e) => {
    if (e.pointerType !== "mouse") return;
    pausedByInteraction = true;
    pausedByPointerEnter = true;
    if (swiper.animating || swiper.autoplay.paused) return;
    pause(true);
  };
  const onPointerLeave = (e) => {
    if (e.pointerType !== "mouse") return;
    pausedByPointerEnter = false;
    if (swiper.autoplay.paused) {
      resume();
    }
  };
  const attachMouseEvents = () => {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.el.addEventListener("pointerenter", onPointerEnter);
      swiper.el.addEventListener("pointerleave", onPointerLeave);
    }
  };
  const detachMouseEvents = () => {
    if (swiper.el && typeof swiper.el !== "string") {
      swiper.el.removeEventListener("pointerenter", onPointerEnter);
      swiper.el.removeEventListener("pointerleave", onPointerLeave);
    }
  };
  const attachDocumentEvents = () => {
    const document2 = getDocument();
    document2.addEventListener("visibilitychange", onVisibilityChange);
  };
  const detachDocumentEvents = () => {
    const document2 = getDocument();
    document2.removeEventListener("visibilitychange", onVisibilityChange);
  };
  on2("init", () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      start();
    }
  });
  on2("destroy", () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on2("_freeModeStaticRelease", () => {
    if (pausedByTouch || pausedByInteraction) {
      resume();
    }
  });
  on2("_freeModeNoMomentumRelease", () => {
    if (!swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on2("beforeTransitionStart", (_s2, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on2("sliderFirstMove", () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(() => {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });
  on2("touchEnd", () => {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode) resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on2("slideChange", () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    slideChanged = true;
  });
  Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume
  });
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/shared/effect-init.mjs
function effectInit(params) {
  const {
    effect,
    swiper,
    on: on2,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams
  } = params;
  on2("beforeInit", () => {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }
    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on2("setTranslate", () => {
    if (swiper.params.effect !== effect) return;
    setTranslate2();
  });
  on2("setTransition", (_s2, duration) => {
    if (swiper.params.effect !== effect) return;
    setTransition2(duration);
  });
  on2("transitionEnd", () => {
    if (swiper.params.effect !== effect) return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows) return;
      swiper.slides.forEach((slideEl) => {
        slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => shadowEl.remove());
      });
      recreateShadows();
    }
  });
  let requireUpdateOnVirtual;
  on2("virtualUpdate", () => {
    if (swiper.params.effect !== effect) return;
    if (!swiper.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(() => {
      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
        setTranslate2();
        requireUpdateOnVirtual = false;
      }
    });
  });
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/shared/effect-target.mjs
function effectTarget(effectParams, slideEl) {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = "hidden";
    transformEl.style["-webkit-backface-visibility"] = "hidden";
  }
  return transformEl;
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/shared/effect-virtual-transition-end.mjs
function effectVirtualTransitionEnd(_ref) {
  let {
    swiper,
    duration,
    transformElements,
    allSlides
  } = _ref;
  const {
    activeIndex
  } = swiper;
  const getSlide = (el2) => {
    if (!el2.parentElement) {
      const slide2 = swiper.slides.filter((slideEl) => slideEl.shadowRoot && slideEl.shadowRoot === el2.parentNode)[0];
      return slide2;
    }
    return el2.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter((transformEl) => {
        const el2 = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
        return swiper.getSlideIndex(el2) === activeIndex;
      });
    }
    transitionEndTarget.forEach((el2) => {
      elementTransitionEnd(el2, () => {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true
        });
        swiper.wrapperEl.dispatchEvent(evt);
      });
    });
  }
}

// node_modules/.pnpm/swiper@11.1.4/node_modules/swiper/modules/effect-fade.mjs
function EffectFade(_ref) {
  let {
    swiper,
    extendParams,
    on: on2
  } = _ref;
  extendParams({
    fadeEffect: {
      crossFade: false
    }
  });
  const setTranslate2 = () => {
    const {
      slides
    } = swiper;
    const params = swiper.params.fadeEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = swiper.slides[i];
      const offset = slideEl.swiperSlideOffset;
      let tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.opacity = slideOpacity;
      targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el2) => {
      el2.style.transitionDuration = `${duration}ms`;
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements,
      allSlides: true
    });
  };
  effectInit({
    effect: "fade",
    swiper,
    on: on2,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}

// node_modules/.pnpm/vue-amazing-ui@1.0.13_async-validator@4.2.5_focus-trap@7.5.4_sortablejs@1.15.2/node_modules/vue-amazing-ui/dist/vue-amazing-ui.js
function Ms(t = Date.now(), a = "YYYY-MM-DD HH:mm:ss") {
  try {
    let e, o = function(n, d = 2) {
      return String(n).padStart(d, "0");
    }, i = function(n) {
      switch (n) {
        case "YYYY":
          return o(e.getFullYear());
        case "YY":
          return o(e.getFullYear()).slice(2, 4);
        case "MM":
          return o(e.getMonth() + 1);
        case "M":
          return String(e.getMonth() + 1);
        case "DD":
          return o(e.getDate());
        case "D":
          return String(e.getDate());
        case "HH":
          return o(e.getHours());
        case "H":
          return String(e.getHours());
        case "mm":
          return o(e.getMinutes());
        case "m":
          return String(e.getMinutes());
        case "ss":
          return o(e.getSeconds());
        case "s":
          return String(e.getSeconds());
        case "SSS":
          return o(e.getMilliseconds(), 3);
        default:
          return n;
      }
    };
    if (typeof t == "number" || typeof t == "string") {
      if (e = new Date(t), isNaN(e.getTime())) throw new Error("Invalid date");
    } else e = t;
    return a.replace(/(YYYY|YY|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS)/g, i);
  } catch (e) {
    return console.error("Error formatting date:", e), "";
  }
}
function p1(t, a = 2, e = ",", o = ".", i = "", n = "") {
  if (typeof t != "number" && typeof t != "string") throw new TypeError("Expected value to be of type number or string");
  if (typeof a != "number") throw new TypeError("Expected precision to be of type number");
  const d = Number(t);
  if (isNaN(d) || !isFinite(d)) return "";
  if (d === 0) return d.toFixed(a);
  let s = d.toFixed(a);
  if (typeof e == "string" && e !== "") {
    const [p, r] = s.split(".");
    s = p.replace(/(\d)(?=(\d{3})+$)/g, "$1" + e) + (r ? o + r : "");
  }
  return i + s + n;
}
function ve(t, a = 0, e = false) {
  let o = null;
  const i = { id: requestAnimationFrame(function n(d) {
    if (o || (o = d), d - o >= a) {
      try {
        t();
      } catch (s) {
        console.error("Error executing rafTimeout function:", s);
      }
      e && (o = d, i.id = requestAnimationFrame(n));
    } else i.id = requestAnimationFrame(n);
  }) };
  return i;
}
function oe(t) {
  t && t.id && typeof t.id == "number" ? cancelAnimationFrame(t.id) : console.warn("cancelRaf received an invalid id:", t);
}
function e1(t, a = 300) {
  let e = true;
  return function(...o) {
    return e && (e = false, setTimeout(() => {
      t(...o), e = true;
    }, a)), false;
  };
}
function B1(t, a = 300) {
  let e = null;
  return function(...o) {
    e && clearTimeout(e), e = setTimeout(t(...o), a);
  };
}
function u1(t, a) {
  if (Number.isNaN(t) || Number.isNaN(a)) throw new Error("Both num1 and num2 must be valid numbers.");
  if (t % 1 == 0 && a % 1 == 0) return t + a;
  const e = String(t).split(".")[1] ?? "", o = String(a).split(".")[1] ?? "", i = Math.max(e.length, o.length), n = Math.pow(10, i), d = t.toFixed(i), s = a.toFixed(i);
  return (+d.replace(".", "") + +s.replace(".", "")) / n;
}
function zs(t, a) {
  t = encodeURI(t);
  let e = "";
  a ? e = a : e = new URL(t).pathname.split("/").pop() || "download";
  const o = new XMLHttpRequest();
  o.open("GET", t, true), o.responseType = "blob", o.onerror = function() {
    console.error("下载文件失败");
  }, o.onload = function() {
    if (o.status === 200) {
      const i = o.response, n = document.createElement("a"), d = document.querySelector("body");
      n.href = window.URL.createObjectURL(i), n.download = e, n.style.display = "none", d == null || d.appendChild(n), n.click(), d == null || d.removeChild(n), window.URL.revokeObjectURL(n.href);
    } else console.error("请求文件失败，状态码：", o.status);
  }, o.send();
}
function _s() {
  document.documentElement.classList.toggle("dark");
}
function f1(t, a, e) {
  onMounted(() => t.addEventListener(a, e)), onUnmounted(() => t.removeEventListener(a, e));
}
function Cs(t = 100) {
  const a = ref(false);
  let e = 0;
  const o = e1(function() {
    const i = window.pageYOffset || document.documentElement.scrollTop;
    a.value = i > e, e = i;
  }, t);
  return f1(window, "scroll", o), { scrollDown: a };
}
function $s() {
  const t = ref(0), a = ref(0);
  let e = performance.now();
  return requestAnimationFrame(function o(i) {
    if (a.value++, a.value >= 10) {
      const n = i - e;
      t.value = Math.round(1e3 / (n / 10)), e = i, a.value = 0;
    }
    requestAnimationFrame(o);
  }), { fps: t };
}
var ke = (t) => (pushScopeId("data-v-bd52b8be"), t = t(), popScopeId(), t);
var F1 = { key: 0, class: "m-alert-icon" };
var L1 = ["src"];
var S1 = { key: 1, focusable: "false", class: "u-alert-icon", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var A1 = [ke(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var E1 = { key: 2, focusable: "false", class: "u-alert-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var D1 = [ke(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var H1 = { key: 3, focusable: "false", class: "u-alert-icon", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var T1 = [ke(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var I1 = { key: 4, focusable: "false", class: "u-alert-icon", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var j1 = [ke(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var V1 = { key: 1, class: "m-big-icon" };
var W1 = ["src"];
var R1 = { key: 1, focusable: "false", class: "u-alert-icon", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var N1 = [ke(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), ke(() => createBaseVNode("path", { d: "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1))];
var q1 = { key: 2, focusable: "false", class: "u-alert-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var O1 = [ke(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1)), ke(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var P1 = { key: 3, focusable: "false", class: "u-alert-icon", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var K1 = [ke(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), ke(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var Y1 = { key: 4, focusable: "false", class: "u-alert-icon", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var U1 = [ke(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1)), ke(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var G1 = { class: "m-alert-content" };
var Z1 = { class: "u-alert-message" };
var J1 = { key: 0, class: "u-alert-description" };
var X1 = { key: 0 };
var Q1 = { key: 1, focusable: "false", class: "u-alert-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var et = [ke(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var W = (t, a) => {
  const e = t.__vccOpts || t;
  for (const [o, i] of a) e[o] = i;
  return e;
};
var ea = W(defineComponent({ __name: "Alert", props: { message: { default: "" }, description: { default: "" }, type: { default: "info" }, closable: { type: Boolean, default: false }, closeText: { default: "" }, icon: { default: "" }, showIcon: { type: Boolean, default: false } }, emits: ["close"], setup(t, { emit: a }) {
  const e = t, o = ref(), i = useSlots(), n = computed(() => {
    var m;
    const r = (m = i.description) == null ? void 0 : m.call(i);
    return r ? !!(r[0].children !== "v-if" && (r != null && r.length)) : e.description;
  }), d = a, s = ref(false);
  function p(r) {
    s.value = true, d("close", r);
  }
  return watchPostEffect(() => {
    e.closable && !s.value && (o.value.style.height = o.value.offsetHeight + "px");
  }), (r, m) => (openBlock(), createBlock(Transition, null, { default: withCtx(() => [s.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, ref_key: "alert", ref: o, class: normalizeClass(["m-alert", [`alert-${r.type}`, { "alert-width-description": n.value }]]) }, [r.showIcon ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [n.value ? (openBlock(), createElementBlock("span", V1, [renderSlot(r.$slots, "icon", {}, () => [r.icon ? (openBlock(), createElementBlock("img", { key: 0, src: r.icon, class: "u-big-icon-img" }, null, 8, W1)) : r.type === "info" ? (openBlock(), createElementBlock("svg", R1, N1)) : r.type === "success" ? (openBlock(), createElementBlock("svg", q1, O1)) : r.type === "warning" ? (openBlock(), createElementBlock("svg", P1, K1)) : r.type === "error" ? (openBlock(), createElementBlock("svg", Y1, U1)) : createCommentVNode("", true)], true)])) : (openBlock(), createElementBlock("span", F1, [renderSlot(r.$slots, "icon", {}, () => [r.icon ? (openBlock(), createElementBlock("img", { key: 0, src: r.icon, class: "u-icon-img" }, null, 8, L1)) : r.type === "info" ? (openBlock(), createElementBlock("svg", S1, A1)) : r.type === "success" ? (openBlock(), createElementBlock("svg", E1, D1)) : r.type === "warning" ? (openBlock(), createElementBlock("svg", H1, T1)) : r.type === "error" ? (openBlock(), createElementBlock("svg", I1, j1)) : createCommentVNode("", true)], true)]))], 64)) : createCommentVNode("", true), createBaseVNode("div", G1, [createBaseVNode("div", Z1, [renderSlot(r.$slots, "message", {}, () => [createTextVNode(toDisplayString(r.message), 1)], true)]), n.value ? (openBlock(), createElementBlock("div", J1, [renderSlot(r.$slots, "description", {}, () => [createTextVNode(toDisplayString(r.description), 1)], true)])) : createCommentVNode("", true)]), r.closable ? (openBlock(), createElementBlock("a", { key: 1, class: "m-alert-close", onClick: p }, [renderSlot(r.$slots, "closeText", {}, () => [r.closeText ? (openBlock(), createElementBlock("span", X1, toDisplayString(r.closeText), 1)) : (openBlock(), createElementBlock("svg", Q1, et))], true)])) : createCommentVNode("", true)], 2))]), _: 3 }));
} }), [["__scopeId", "data-v-bd52b8be"]]);
ea.install = (t) => {
  t.component(ea.__name, ea);
};
var at = ["src", "alt"];
var tt = { key: 1, class: "m-icon" };
var aa2 = W(defineComponent({ __name: "Avatar", props: { shape: { default: "circle" }, size: { default: "default" }, src: { default: "" }, alt: { default: "" }, icon: { default: void 0 } }, setup(t) {
  const a = t, e = ref(document.documentElement.clientWidth);
  function o() {
    e.value = document.documentElement.clientWidth;
  }
  onMounted(() => {
    window.addEventListener("resize", o);
  }), onUnmounted(() => {
    window.removeEventListener("resize", o);
  });
  const i = computed(() => {
    if (typeof a.size == "string") return null;
    if (typeof a.size == "number") return d.value ? { width: a.size + "px", height: a.size + "px", lineHeight: a.size + "px", fontSize: a.size / 2 + "px" } : { width: a.size + "px", height: a.size + "px", lineHeight: a.size + "px", fontSize: "18px" };
    if (typeof a.size == "object") {
      let r = 32;
      return e.value >= 1600 && a.size.xxl ? r = a.size.xxl : e.value >= 1200 && a.size.xl ? r = a.size.xl : e.value >= 992 && a.size.lg ? r = a.size.lg : e.value >= 768 && a.size.md ? r = a.size.md : e.value >= 576 && a.size.sm ? r = a.size.sm : e.value < 576 && a.size.xs && (r = a.size.xs), { width: r + "px", height: r + "px", lineHeight: r + "px", fontSize: r / 2 + "px" };
    }
  }), n = useSlots(), d = computed(() => {
    var r;
    if (!a.src) {
      const m = (r = n.icon) == null ? void 0 : r.call(n);
      if (m) return !!(m[0].children !== "v-if" && (m != null && m.length));
    }
    return false;
  }), s = computed(() => {
    var r, m;
    if (!a.src && !d.value) {
      const k = (r = n.default) == null ? void 0 : r.call(n);
      if (k) return !!(k[0].children !== "v-if" && ((m = k[0].children) != null && m.length));
    }
    return false;
  }), p = computed(() => {
    if (typeof a.size == "string") return { transform: "scale(1) translateX(-50%)" };
    if (typeof a.size == "number") {
      const r = Math.min(1, Math.max(0.022222222222222223, (1 + 1 * (a.size - 9)) / 45));
      return { lineHeight: a.size + "px", transform: `scale(${r}) translateX(-50%)` };
    }
  });
  return (r, m) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-avatar", [i.value === null ? "avatar-" + r.size : "", "avatar-" + r.shape, { "avatar-image": r.src }]]), style: normalizeStyle(i.value || {}) }, [r.src ? (openBlock(), createElementBlock("img", { key: 0, class: "u-image", src: r.src, alt: r.alt }, null, 8, at)) : createCommentVNode("", true), !r.src && d.value ? (openBlock(), createElementBlock("span", tt, [renderSlot(r.$slots, "icon", {}, void 0, true)])) : createCommentVNode("", true), r.src || d.value || !s.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", { key: 2, class: "m-string", style: normalizeStyle(p.value) }, [renderSlot(r.$slots, "default", {}, void 0, true)], 4))], 6));
} }), [["__scopeId", "data-v-e2cc9766"]]);
aa2.install = (t) => {
  t.component(aa2.__name, aa2);
};
var lt2 = ((t) => (pushScopeId("data-v-6ae15fa6"), t = t(), popScopeId(), t))(() => createBaseVNode("span", { class: "m-icon" }, [createBaseVNode("svg", { class: "u-icon", viewBox: "0 0 24 24", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xlinkHref: "http://www.w3.org/1999/xlink" }, [createBaseVNode("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, [createBaseVNode("g", { transform: "translate(-139.000000, -4423.000000)", "fill-rule": "nonzero" }, [createBaseVNode("g", { transform: "translate(120.000000, 4285.000000)" }, [createBaseVNode("g", { transform: "translate(7.000000, 126.000000)" }, [createBaseVNode("g", { transform: "translate(24.000000, 24.000000) scale(1, -1) translate(-24.000000, -24.000000) translate(12.000000, 12.000000)" }, [createBaseVNode("g", { transform: "translate(4.000000, 2.000000)" }, [createBaseVNode("path", { d: "M8,0 C8.51283584,0 8.93550716,0.38604019 8.99327227,0.883378875 L9,1 L9,10.584 L12.2928932,7.29289322 C12.6834175,6.90236893 13.3165825,6.90236893 13.7071068,7.29289322 C14.0675907,7.65337718 14.0953203,8.22060824 13.7902954,8.61289944 L13.7071068,8.70710678 L8.70710678,13.7071068 L8.62544899,13.7803112 L8.618,13.784 L8.59530661,13.8036654 L8.4840621,13.8753288 L8.37133602,13.9287745 L8.22929083,13.9735893 L8.14346259,13.9897165 L8.03324678,13.9994506 L7.9137692,13.9962979 L7.77070917,13.9735893 L7.6583843,13.9401293 L7.57677845,13.9063266 L7.47929125,13.8540045 L7.4048407,13.8036865 L7.38131006,13.7856883 C7.35030318,13.7612383 7.32077858,13.7349921 7.29289322,13.7071068 L2.29289322,8.70710678 L2.20970461,8.61289944 C1.90467972,8.22060824 1.93240926,7.65337718 2.29289322,7.29289322 C2.65337718,6.93240926 3.22060824,6.90467972 3.61289944,7.20970461 L3.70710678,7.29289322 L7,10.585 L7,1 L7.00672773,0.883378875 C7.06449284,0.38604019 7.48716416,0 8,0 Z" }), createBaseVNode("path", { d: "M14.9333333,15.9994506 C15.5224371,15.9994506 16,16.4471659 16,16.9994506 C16,17.5122865 15.5882238,17.9349578 15.0577292,17.9927229 L14.9333333,17.9994506 L1.06666667,17.9994506 C0.477562934,17.9994506 0,17.5517354 0,16.9994506 C0,16.4866148 0.411776203,16.0639435 0.9422708,16.0061783 L1.06666667,15.9994506 L14.9333333,15.9994506 Z" })])])])])])])])], -1));
var ta2 = W(defineComponent({ __name: "BackTop", props: { bottom: { default: 40 }, right: { default: 40 }, visibilityHeight: { default: 180 }, to: { default: "body" }, listenTo: { default: void 0 } }, emits: ["click", "show"], setup(t, { emit: a }) {
  const e = t, o = computed(() => typeof e.bottom == "number" ? e.bottom + "px" : e.bottom), i = computed(() => typeof e.right == "number" ? e.right + "px" : e.right), n = computed(() => s.value >= e.visibilityHeight), d = ref(null), s = ref(0), p = ref(null), r = ref(null), m = a, k = { childList: true, attributes: true, subtree: true }, M = new MutationObserver(function(f, _) {
    var F;
    s.value = ((F = p.value) == null ? void 0 : F.scrollTop) ?? 0;
  });
  watch(() => e.listenTo, () => {
    M.disconnect(), h3(), z();
  }, { flush: "post" }), watch(() => e.to, () => {
    x();
  }, { flush: "post" }), watch(n, (f) => {
    m("show", f);
  }), onMounted(() => {
    z(), x();
  }), onBeforeUnmount(() => {
    var f;
    M.disconnect(), h3(), (f = d.value) == null || f.remove();
  });
  const w = e1(function(f) {
    s.value = f.target.scrollTop;
  }, 100), c = e1(function() {
    var f;
    s.value = ((f = p.value) == null ? void 0 : f.scrollTop) ?? 0;
  }, 100);
  function h3() {
    p.value && (p.value.removeEventListener("scroll", w), window.removeEventListener("resize", c));
  }
  function z() {
    var f;
    e.listenTo === void 0 ? p.value = y((f = d.value) == null ? void 0 : f.parentElement) : typeof e.listenTo == "string" ? p.value = document.getElementsByTagName(e.listenTo)[0] : e.listenTo instanceof HTMLElement && (p.value = e.listenTo), p.value && (M.observe(p.value, k), p.value.addEventListener("scroll", w), window.addEventListener("resize", c));
  }
  function x() {
    var f;
    typeof e.to == "string" ? r.value = document.getElementsByTagName(e.to)[0] : e.to instanceof HTMLElement && (r.value = e.to), (f = r.value) == null || f.appendChild(d.value);
  }
  function y(f) {
    return f ? f.scrollHeight > f.clientHeight ? f : y(f.parentElement) : null;
  }
  function g() {
    p.value && p.value.scrollTo({ top: 0, behavior: "smooth" }), m("click");
  }
  return (f, _) => (openBlock(), createBlock(Transition, null, { default: withCtx(() => [withDirectives(createBaseVNode("div", { ref_key: "backtop", ref: d, onClick: g, class: "m-backtop", style: normalizeStyle(`bottom: ${o.value}; right: ${i.value};`) }, [renderSlot(f.$slots, "default", {}, () => [lt2], true)], 4), [[vShow, n.value]])]), _: 3 }));
} }), [["__scopeId", "data-v-6ae15fa6"]]);
ta2.install = (t) => {
  t.component(ta2.__name, ta2);
};
var ot = { class: "u-status-text" };
var st = { key: 0 };
var nt2 = ["title"];
var it2 = { key: 0, class: "m-number", style: { transition: "none 0s ease 0s" } };
var ut = { class: "u-number" };
var la = W(defineComponent({ __name: "Badge", props: { color: { default: "" }, count: { default: 0 }, max: { default: 99 }, showZero: { type: Boolean, default: false }, dot: { type: Boolean, default: false }, status: { default: void 0 }, text: { default: "" }, countStyle: { default: () => ({}) }, title: { default: "" }, ripple: { type: Boolean, default: true } }, setup(t) {
  const a = t, e = ["pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"], o = computed(() => {
    if (a.color && !e.includes(a.color)) return { color: a.color, backgroundColor: a.color };
  }), i = useSlots(), n = computed(() => {
    var s;
    if (!a.status && !a.color) {
      const p = (s = i.default) == null ? void 0 : s.call(i);
      if (p) return !!(p[0].children !== "v-if" && (p != null && p.length));
    }
    return false;
  }), d = computed(() => {
    var s;
    if (!a.status && !a.color) {
      const p = (s = i.count) == null ? void 0 : s.call(i);
      return !!(p != null && p.length);
    }
    return false;
  });
  return (s, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-badge", { "badge-status": s.status }]) }, [s.status || s.color ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("span", { class: normalizeClass(["u-status-dot", [`status-${s.status || s.color}`, { "dot-ripple": s.ripple }]]), style: normalizeStyle(o.value) }, null, 6), createBaseVNode("span", ot, [renderSlot(s.$slots, "default", {}, () => [createTextVNode(toDisplayString(s.text), 1)], true)])], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [n.value ? (openBlock(), createElementBlock("span", st, [renderSlot(s.$slots, "default", {}, void 0, true)])) : createCommentVNode("", true), d.value ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["m-count", { "only-number": !n.value }]) }, [renderSlot(s.$slots, "count", {}, void 0, true)], 2)) : (openBlock(), createBlock(Transition, { key: 2, name: "zoom" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-badge-count", { "small-num": s.count < 10, "only-number": !n.value, "only-dot": s.count === 0 && !s.showZero }]), style: normalizeStyle(s.countStyle), title: s.title || String(s.count) }, [s.dot ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", it2, [createBaseVNode("span", ut, toDisplayString(s.count > s.max ? s.max + "+" : s.count), 1)]))], 14, nt2), [[vShow, s.showZero || s.count !== 0 || s.dot]])]), _: 1 }))], 64))], 2));
} }), [["__scopeId", "data-v-166f4867"]]);
la.install = (t) => {
  t.component(la.__name, la);
};
var h1 = (t) => (pushScopeId("data-v-42762479"), t = t(), popScopeId(), t);
var ct = ["href", "title", "target"];
var dt2 = { key: 0, class: "u-separator" };
var rt2 = { key: 1, class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "right", "aria-hidden": "true", focusable: "false" };
var vt = [h1(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1))];
var pt2 = h1(() => createBaseVNode("div", { class: "assist" }, null, -1));
var ft = defineComponent({ __name: "Breadcrumb", props: { routes: { default: () => [] }, fontSize: { default: 14 }, height: { default: 21 }, maxWidth: { default: 180 }, separator: { default: "" }, target: { default: "_self" } }, setup(t) {
  const a = t, e = computed(() => a.routes.length);
  function o(i) {
    var n = i.path;
    if (i.query && JSON.stringify(i.query) !== "{}") {
      const d = i.query;
      Object.keys(d).forEach((s, p) => {
        n = p === 0 ? n + "?" + s + "=" + d[s] : n + "&" + s + "=" + d[s];
      });
    }
    return n;
  }
  return (i, n) => (openBlock(), createElementBlock("div", { class: "m-breadcrumb", style: normalizeStyle(`height: ${i.height}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(i.routes, (d, s) => (openBlock(), createElementBlock("div", { class: "m-bread", key: s }, [createBaseVNode("a", { class: normalizeClass(["u-route", { active: s === e.value - 1 }]), style: normalizeStyle(`font-size: ${i.fontSize}px; max-width: ${i.maxWidth}px;`), href: s === e.value - 1 ? "javascript:;" : o(d), title: d.name, target: s === e.value - 1 ? "_self" : i.target }, toDisplayString(d.name || "--"), 15, ct), s !== e.value - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [i.separator ? (openBlock(), createElementBlock("span", dt2, toDisplayString(i.separator), 1)) : (openBlock(), createElementBlock("svg", rt2, vt))], 64)) : createCommentVNode("", true)]))), 128)), pt2], 4));
} });
var oa = W(ft, [["__scopeId", "data-v-42762479"]]);
oa.install = (t) => {
  t.component(oa.__name, oa);
};
var ht = ["href", "target", "disabled"];
var mt2 = { class: "u-text" };
var gt2 = defineComponent({ __name: "Button", props: { name: { default: "按钮" }, type: { default: "default" }, effect: { default: "fade" }, size: { default: "middle" }, route: { default: () => ({}) }, target: { default: "_self" }, disabled: { type: Boolean, default: false }, loading: { type: Boolean, default: false }, center: { type: Boolean, default: false } }, emits: ["click"], setup(t, { emit: a }) {
  const e = t, o = computed(() => JSON.stringify(e.route) !== "{}"), i = a;
  function n(s) {
    o.value || i("click", s);
  }
  function d(s) {
    var p = s.path;
    if (s.query && JSON.stringify(s.query) !== "{}") {
      const r = s.query;
      Object.keys(r).forEach((m, k) => {
        p = k === 0 ? p + "?" + m + "=" + r[m] : p + "&" + m + "=" + r[m];
      });
    }
    return p;
  }
  return (s, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-btn-wrap", { center: s.center }]) }, [createBaseVNode("a", { onClick: n, href: d(s.route), target: o.value ? s.target : "_self", disabled: s.disabled, class: normalizeClass(["m-btn", [s.type, s.size, { [s.effect]: s.type === "default", disabled: s.disabled, "m-btn-loading": !o.value && s.loading }]]) }, [withDirectives(createBaseVNode("span", { class: normalizeClass(["m-loading-icon", { [`loading-${s.size}`]: s.loading }]) }, [createBaseVNode("span", { class: normalizeClass(["u-spin-circle", `spin-${s.size}`]) }, null, 2)], 2), [[vShow, !o.value]]), createBaseVNode("span", mt2, [renderSlot(s.$slots, "default", {}, () => [createTextVNode(toDisplayString(s.name), 1)], true)])], 10, ht)], 2));
} });
var Fe = W(gt2, [["__scopeId", "data-v-79ae025a"]]);
Fe.install = (t) => {
  t.component(Fe.__name, Fe);
};
var yt2 = { class: "m-head-wrapper" };
var kt2 = { class: "u-title" };
var wt = { class: "u-extra" };
var sa2 = W(defineComponent({ __name: "Card", props: { width: { default: "auto" }, bordered: { type: Boolean, default: true }, extra: { default: "" }, size: { default: "default" }, title: { default: "" }, headStyle: { default: () => ({}) }, bodyStyle: { default: () => ({}) } }, setup(t) {
  const a = t, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), o = useSlots(), i = computed(() => {
    var p, r, m, k;
    const n = (p = o.title) == null ? void 0 : p.call(o), d = (r = o.extra) == null ? void 0 : r.call(o);
    let s = 0;
    return n && ((m = n[0].children) != null && m.length) && s++, d && ((k = d[0].children) != null && k.length) && s++, !!s || a.title || a.extra;
  });
  return (n, d) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-card", { bordered: n.bordered, "m-small-card": n.size === "small" }]), style: normalizeStyle(`width: ${e.value};`) }, [i.value ? (openBlock(), createElementBlock("div", { key: 0, class: "m-card-head", style: normalizeStyle(n.headStyle) }, [createBaseVNode("div", yt2, [createBaseVNode("div", kt2, [renderSlot(n.$slots, "title", {}, () => [createTextVNode(toDisplayString(n.title), 1)], true)]), createBaseVNode("div", wt, [renderSlot(n.$slots, "extra", {}, () => [createTextVNode(toDisplayString(n.extra), 1)], true)])])], 4)) : createCommentVNode("", true), createBaseVNode("div", { class: "m-card-body", style: normalizeStyle(n.bodyStyle) }, [renderSlot(n.$slots, "default", {}, void 0, true)], 4)], 6));
} }), [["__scopeId", "data-v-a95475b1"]]);
sa2.install = (t) => {
  t.component(sa2.__name, sa2);
};
var ge = (t) => (pushScopeId("data-v-a514cee9"), t = t(), popScopeId(), t);
var bt2 = { class: "m-spin" };
var xt = { class: "m-spin-box" };
var Mt2 = { key: 0, class: "m-loading-dot" };
var zt = [ge(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), ge(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), ge(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), ge(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1))];
var _t = createStaticVNode('<div class="m-spin-dot" data-v-a514cee9><span class="u-spin-item" data-v-a514cee9></span><span class="u-spin-item" data-v-a514cee9></span><span class="u-spin-item" data-v-a514cee9></span><span class="u-spin-item" data-v-a514cee9></span></div>', 1);
var Ct2 = [ge(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1)), ge(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1)), ge(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1)), ge(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1))];
var $t = createStaticVNode('<div class="m-spin-line" data-v-a514cee9><span class="u-spin-item" data-v-a514cee9></span><span class="u-spin-item" data-v-a514cee9></span><span class="u-spin-item" data-v-a514cee9></span><span class="u-spin-item" data-v-a514cee9></span></div>', 1);
var Bt = [ge(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1)), ge(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1)), ge(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1)), ge(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1))];
var Ft = { key: 3, class: "u-quarter-circle" };
var Lt = { key: 4, class: "u-half-circle" };
var St2 = { key: 5, class: "u-three-quarters-circle" };
var At = { key: 6, class: "m-dynamic-circle" };
var Et2 = [ge(() => createBaseVNode("svg", { class: "circular", viewBox: "0 0 50 50" }, [createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" })], -1))];
var ye = W(defineComponent({ __name: "Spin", props: { spinning: { type: Boolean, default: true }, size: { default: "default" }, tip: { default: "" }, indicator: { default: "dot" }, color: { default: "#1677FF" }, rotate: { type: Boolean, default: false }, speed: { default: 600 } }, setup: (t) => (a, e) => (openBlock(), createElementBlock("div", { class: normalizeClass(`m-spin-wrap spin-${a.size}`), style: normalizeStyle(`--color: ${a.color}; --speed: ${a.speed}ms;`) }, [withDirectives(createBaseVNode("div", bt2, [createBaseVNode("div", xt, [a.indicator === "dot" ? (openBlock(), createElementBlock("div", Mt2, zt)) : createCommentVNode("", true), a.indicator === "spin-dot" ? (openBlock(), createElementBlock("div", { key: 1, class: normalizeClass(["spin-wrap-box", { "spin-wrap-rotate": a.rotate }]) }, [_t, createBaseVNode("div", { class: normalizeClass(["m-spin-dot spin-rotate", { "spin-tip": a.tip }]) }, Ct2, 2)], 2)) : createCommentVNode("", true), a.indicator === "spin-line" ? (openBlock(), createElementBlock("div", { key: 2, class: normalizeClass(["spin-wrap-box", { "spin-wrap-rotate": a.rotate }]) }, [$t, createBaseVNode("div", { class: normalizeClass(["m-spin-line spin-rotate", { "spin-tip": a.tip }]) }, Bt, 2)], 2)) : createCommentVNode("", true), a.indicator === "quarter-circle" ? (openBlock(), createElementBlock("div", Ft)) : createCommentVNode("", true), a.indicator === "half-circle" ? (openBlock(), createElementBlock("div", Lt)) : createCommentVNode("", true), a.indicator === "three-quarters-circle" ? (openBlock(), createElementBlock("div", St2)) : createCommentVNode("", true), a.indicator === "dynamic-circle" ? (openBlock(), createElementBlock("div", At, Et2)) : createCommentVNode("", true), withDirectives(createBaseVNode("p", { class: "u-tip" }, toDisplayString(a.tip), 513), [[vShow, a.tip]])])], 512), [[vShow, a.spinning]]), createBaseVNode("div", { class: normalizeClass(["m-spin-content", { "m-spin-mask": a.spinning }]) }, [renderSlot(a.$slots, "default", {}, void 0, true)], 2)], 6)) }), [["__scopeId", "data-v-a514cee9"]]);
ye.install = (t) => {
  t.component(ye.__name, ye);
};
var m1 = (t) => (pushScopeId("data-v-de8f9c26"), t = t(), popScopeId(), t);
var Dt = ["onClick"];
var Ht2 = ["onLoad", "src", "alt"];
var Tt2 = ["src", "alt"];
var It2 = [m1(() => createBaseVNode("path", { d: "M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z" }, null, -1))];
var jt = [m1(() => createBaseVNode("path", { d: "M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z" }, null, -1))];
var Vt = ["onClick", "onMouseenter"];
var Wt2 = defineComponent({ __name: "Carousel", props: { images: { default: () => [] }, width: { default: "100%" }, height: { default: "100vh" }, autoplay: { type: Boolean, default: false }, pauseOnMouseEnter: { type: Boolean, default: false }, effect: { default: "slide" }, interval: { default: 3e3 }, showArrow: { type: Boolean, default: true }, arrowColor: { default: "#FFF" }, arrowSize: { default: 36 }, dots: { type: Boolean, default: true }, dotSize: { default: 10 }, dotColor: { default: "rgba(255, 255, 255, 0.3)" }, dotActiveColor: { default: "#1677FF" }, dotStyle: { default: () => ({}) }, dotActiveStyle: { default: () => ({}) }, dotPosition: { default: "bottom" }, dotsTrigger: { default: "click" }, spinStyle: { default: () => ({}) }, fadeDuration: { default: 500 }, fadeFunction: { default: "cubic-bezier(0.4, 0, 0.2, 1)" }, slideDuration: { default: 800 }, slideFunction: { default: () => [0.65, 0, 0.35, 1] } }, emits: ["change", "click"], setup(t, { expose: a, emit: e }) {
  const o = t, i = ref(0), n = ref(), d = ref(false), s = ref(false), p = ref(), r = ref(), m = ref(), k = ref(1), M = ref(), w = ref(), c = ref(Array(o.images.length).fill(false)), h3 = computed(() => typeof o.width == "number" ? o.width + "px" : o.width), z = computed(() => typeof o.height == "number" ? o.height + "px" : o.height), x = computed(() => o.images.length), y = computed(() => ["left", "right"].includes(o.dotPosition)), g = computed(() => y.value ? w.value : M.value), f = computed(() => o.effect === "slide" ? { transform: (y.value ? "translateY" : "translateX") + `(${-i.value}px)` } : {}), _ = e;
  function F(E) {
    c.value[E] = true;
  }
  function H() {
    M.value = m.value.offsetWidth, w.value = m.value.offsetHeight;
  }
  function D(E) {
    E.preventDefault(), x.value > 1 && (E.key !== "ArrowLeft" && E.key !== "ArrowUp" || ae(), E.key !== "ArrowRight" && E.key !== "ArrowDown" || _e2());
  }
  function I() {
    console.log("visibilityState", document.visibilityState), document.visibilityState === "hidden" ? (n.value && oe(n.value), i.value = ue.value + ne.value, s.value = false) : j();
  }
  function j() {
    o.autoplay && x.value > 1 && c.value[0] && (d.value = false, se(), console.log("Carousel Start"));
  }
  function se() {
    d.value || (n.value && oe(n.value), n.value = ve(() => {
      s.value = true, o.effect === "slide" ? (de(i.value % (x.value * g.value) + g.value), k.value = k.value % x.value + 1) : O("left");
    }, o.interval));
  }
  function ae() {
    s.value || (s.value = true, n.value && oe(n.value), o.effect === "slide" ? (xe((k.value + x.value - 2) % x.value * g.value), k.value = k.value - 1 > 0 ? k.value - 1 : x.value) : O("right"));
  }
  function _e2() {
    s.value || (s.value = true, n.value && oe(n.value), o.effect === "slide" ? (de(k.value * g.value), k.value = k.value % x.value + 1) : O("left"));
  }
  watch(k, (E) => {
    _("change", E);
  }), watch(y, (E) => {
    n.value && oe(n.value), cancelAnimationFrame(p.value), s.value = false, i.value = E ? (ue.value + ne.value) / M.value * g.value : (ue.value + ne.value) / w.value * g.value, j();
  }), watch(() => o.effect, (E) => {
    n.value && oe(n.value), s.value = false, E === "slide" && (i.value = (k.value - 1) * g.value), j();
  }), watch(() => [o.images, o.autoplay, o.interval, o.fadeDuration, o.fadeFunction, c.value[0]], () => {
    n.value && oe(n.value), o.autoplay && c.value[0] && x.value > 1 && se();
  }, { deep: true, flush: "post" }), watch(() => [o.width, o.height], () => {
    H();
  }, { deep: true, flush: "post" }), onMounted(() => {
    H(), document.addEventListener("visibilitychange", I);
  }), onUnmounted(() => {
    document.removeEventListener("visibilitychange", I);
  });
  const we = ref(0), ue = ref(0), ne = ref(0), be = useTransition(we, { duration: o.slideDuration, transition: o.slideFunction });
  function O(E, fe) {
    k.value = E === "left" ? k.value % x.value + 1 : E === "right" ? k.value - 1 > 0 ? k.value - 1 : x.value : fe, ve(() => {
      s.value = false, o.autoplay && se();
    }, o.fadeDuration);
  }
  function Q(E) {
    r.value = E, we.value = we.value ? 0 : 1, ue.value = i.value, ne.value = E - ue.value;
  }
  function pe() {
    we.value ? i.value = ue.value + ne.value * be.value : i.value = ue.value + ne.value * (1 - be.value);
  }
  function le() {
    i.value >= r.value ? (s.value = false, o.autoplay && se()) : (pe(), p.value = requestAnimationFrame(le));
  }
  function de(E) {
    i.value === x.value * g.value && (i.value = 0), Q(E), p.value = requestAnimationFrame(le);
  }
  function ee() {
    i.value <= r.value ? (s.value = false, o.autoplay && se()) : (pe(), p.value = requestAnimationFrame(ee));
  }
  function xe(E) {
    i.value === 0 && (i.value = x.value * g.value), Q(E), p.value = requestAnimationFrame(ee);
  }
  function Le(E) {
    !s.value && k.value !== E && (s.value = true, n.value && oe(n.value), E < k.value && (o.effect === "slide" ? (xe((E - 1) * g.value), k.value = E) : O("switch", E)), E > k.value && (o.effect === "slide" ? (de((E - 1) * g.value), k.value = E) : O("switch", E)));
  }
  function Se2(E) {
    _("click", E);
  }
  return a({ to: function(E) {
    E >= 1 && E <= x.value && Le(E);
  }, prev: function() {
    ae();
  }, next: function() {
    _e2();
  }, getCurrentIndex: function() {
    return k.value;
  } }), (E, fe) => (openBlock(), createElementBlock("div", { ref_key: "carousel", ref: m, class: normalizeClass(["m-carousel", { "carousel-vertical": y.value, "carousel-fade": E.effect === "fade" }]), style: normalizeStyle(`--arrow-color: ${E.arrowColor}; --dot-size: ${E.dotSize}px; --dot-color: ${E.dotColor}; --fade-duration: ${o.fadeDuration}ms; --fade-function: ${o.fadeFunction}; width: ${h3.value}; height: ${z.value};`), onMouseenter: fe[2] || (fe[2] = (ie) => E.autoplay && E.pauseOnMouseEnter ? (n.value && oe(n.value), d.value = true, void console.log("Carousel Stop")) : () => false), onMouseleave: fe[3] || (fe[3] = (ie) => E.autoplay && E.pauseOnMouseEnter ? j() : () => false) }, [createBaseVNode("div", { class: "m-carousel-flex", style: normalizeStyle(f.value) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(E.images, (ie, Me) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-image", { "image-fade-active": E.effect === "fade" && k.value === Me + 1 }]), onClick: (Ce2) => Se2(ie), key: Me }, [createVNode(unref(ye), mergeProps({ spinning: !c.value[Me], indicator: "dynamic-circle", ref_for: true }, E.spinStyle), { default: withCtx(() => [(openBlock(), createElementBlock("img", { onLoad: (Ce2) => F(Me), src: ie.src, key: ie.src, alt: ie.title, class: "u-image", style: normalizeStyle(`width: ${M.value}px; height: ${w.value}px;`) }, null, 44, Ht2))]), _: 2 }, 1040, ["spinning"])], 10, Dt))), 128)), x.value && E.effect === "slide" ? (openBlock(), createElementBlock("div", { key: 0, class: "m-image", onClick: fe[1] || (fe[1] = (ie) => Se2(E.images[0])) }, [createVNode(unref(ye), mergeProps({ spinning: !c.value[0], indicator: "dynamic-circle" }, E.spinStyle), { default: withCtx(() => [(openBlock(), createElementBlock("img", { onLoad: fe[0] || (fe[0] = (ie) => F(0)), src: E.images[0].src, key: E.images[0].src, alt: E.images[0].title, class: "u-image", style: normalizeStyle(`width: ${M.value}px; height: ${w.value}px;`) }, null, 44, Tt2))]), _: 1 }, 16, ["spinning"])])) : createCommentVNode("", true)], 4), E.showArrow ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [(openBlock(), createElementBlock("svg", { tabindex: "0", class: "arrow-left", style: normalizeStyle(`width: ${E.arrowSize}px; height: ${E.arrowSize}px;`), onClick: ae, onKeydown: D, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, It2, 36)), (openBlock(), createElementBlock("svg", { tabindex: "0", class: "arrow-right", style: normalizeStyle(`width: ${E.arrowSize}px; height: ${E.arrowSize}px;`), onClick: _e2, onKeydown: D, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, jt, 36))], 64)) : createCommentVNode("", true), E.dots ? (openBlock(), createElementBlock("div", { key: 1, class: normalizeClass(["m-switch", `switch-${E.dotPosition}`]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(x.value, (ie) => (openBlock(), createElementBlock("div", { tabindex: "0", class: "u-dot", style: normalizeStyle([E.dotStyle, k.value === ie ? { backgroundColor: E.dotActiveColor, ...E.dotActiveStyle } : {}]), key: ie, onClick: (Me) => E.dotsTrigger === "click" ? Le(ie) : () => false, onMouseenter: (Me) => E.dotsTrigger === "hover" ? function(Ce2) {
    Le(Ce2);
  }(ie) : () => false, onKeydown: D }, null, 44, Vt))), 128))], 2)) : createCommentVNode("", true)], 38));
} });
var na = W(Wt2, [["__scopeId", "data-v-de8f9c26"]]);
na.install = (t) => {
  t.component(na.__name, na);
};
var Rt2 = { class: "m-empty" };
var Nt = [createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-1571ea47><g transform="translate(24 31.67)" data-v-1571ea47><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-1571ea47></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-1571ea47></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-1571ea47></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-1571ea47></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-1571ea47></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-1571ea47></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-1571ea47><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-1571ea47></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-1571ea47></path></g></g>', 1)];
var qt2 = [createStaticVNode('<g transform="translate(0 1)" fill="none" fill-rule="evenodd" data-v-1571ea47><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" data-v-1571ea47></ellipse><g fill-rule="nonzero" stroke="#d9d9d9" data-v-1571ea47><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" data-v-1571ea47></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" data-v-1571ea47></path></g></g>', 1)];
var Ot = ["src"];
var Re2 = W(defineComponent({ __name: "Empty", props: { description: { default: "暂无数据" }, image: { default: "1" }, imageStyle: { default: () => ({}) } }, setup: (t) => (a, e) => (openBlock(), createElementBlock("div", Rt2, [a.image === "1" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-empty-1", style: normalizeStyle(a.imageStyle), viewBox: "0 0 184 152", xmlns: "http://www.w3.org/2000/svg" }, Nt, 4)) : a.image === "2" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-empty-2", style: normalizeStyle(a.imageStyle), viewBox: "0 0 64 41", xmlns: "http://www.w3.org/2000/svg" }, qt2, 4)) : renderSlot(a.$slots, "default", { key: 2 }, () => [createBaseVNode("img", { class: "u-empty", src: a.image, style: normalizeStyle(a.imageStyle), alt: "image" }, null, 12, Ot)], true), a.description ? (openBlock(), createElementBlock("p", { key: 3, class: normalizeClass(["u-description", { gray: a.image === "2" }]) }, [renderSlot(a.$slots, "description", {}, () => [createTextVNode(toDisplayString(a.description), 1)], true)], 2)) : createCommentVNode("", true)])) }), [["__scopeId", "data-v-1571ea47"]]);
Re2.install = (t) => {
  t.component(Re2.__name, Re2);
};
var a1 = (t) => (pushScopeId("data-v-dfaf21c9"), t = t(), popScopeId(), t);
var Pt = { class: "m-select-search" };
var Kt = ["title"];
var Yt2 = [a1(() => createBaseVNode("path", { d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" }, null, -1))];
var Ut = [a1(() => createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1))];
var Gt2 = [a1(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var Zt = ["title", "onMouseenter", "onClick"];
var Jt2 = defineComponent({ __name: "Select", props: { options: { default: () => [] }, label: { default: "label" }, value: { default: "value" }, placeholder: { default: "请选择" }, disabled: { type: Boolean, default: false }, allowClear: { type: Boolean, default: false }, search: { type: Boolean, default: false }, filter: { type: [Function, Boolean], default: true }, width: { default: "auto" }, height: { default: 32 }, maxDisplay: { default: 6 }, modelValue: { default: null } }, emits: ["update:modelValue", "change"], setup(t, { emit: a }) {
  const e = t, o = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), i = ref(), n = ref(), d = ref(), s = ref(), p = ref(false), r = ref(true), m = ref(true), k = ref(false), M = ref(false), w = ref();
  function c() {
    e.allowClear && n.value && (m.value = false, k.value = true, e.search && (M.value = false));
  }
  function h3() {
    e.allowClear && k.value && (k.value = false, e.search || (m.value = true)), e.search && (p.value ? (M.value = true, m.value = false, w.value.focus()) : (M.value = false, m.value = true));
  }
  function z() {
    r.value = false;
  }
  function x() {
    s.value = null, r.value = true, w.value.focus();
  }
  watchEffect(() => {
    e.search ? (i.value = e.options.filter((f) => typeof e.filter == "function" ? e.filter(d.value, f) : f[e.label].includes(d.value)), i.value.length && d.value ? s.value = i.value[0][e.value] : s.value = null) : i.value = e.options;
  }), watchEffect(() => {
    (function() {
      if (e.modelValue) {
        const f = e.options.find((_) => _[e.value] === e.modelValue);
        f ? (n.value = f[e.label], s.value = f[e.value]) : (n.value = e.modelValue, s.value = null);
      } else n.value = null, s.value = null;
      e.search && (d.value = n.value);
    })();
  }), watch(p, (f) => {
    !f && e.search && (d.value = n.value);
  });
  const y = a;
  function g() {
    k.value = false, n.value = null, s.value = null, p.value = false, m.value = true, y("update:modelValue"), y("change");
  }
  return (f, _) => (openBlock(), createElementBlock("div", { class: "m-select", style: normalizeStyle(`width: ${o.value}; height: ${f.height}px;`) }, [createBaseVNode("div", { class: normalizeClass(["m-select-wrap", { hover: !f.disabled, focus: p.value, disabled: f.disabled }]), tabindex: "1", ref_key: "selectRef", ref: w, onMouseenter: c, onMouseleave: h3, onBlur: _[0] || (_[0] = (F) => r.value && !f.disabled ? (p.value && (p.value = false), void (e.search && (M.value = false, m.value = true))) : () => false), onClick: _[1] || (_[1] = (F) => f.disabled ? () => false : function() {
    if (p.value = !p.value, d.value = "", !s.value && n.value) {
      const H = e.options.find((D) => D[e.label] === n.value);
      s.value = H ? H[e.value] : null;
    }
    e.search && (k.value || (m.value = !p.value, M.value = p.value));
  }()) }, [withDirectives(createBaseVNode("span", Pt, [createBaseVNode("input", { class: "u-select-search", style: normalizeStyle(`height: ${f.height - 2}px;`), autocomplete: "off" }, null, 4)], 512), [[vShow, f.search]]), createBaseVNode("span", { class: normalizeClass(["u-select-item", { "select-item-gray": !n.value || p.value }]), style: normalizeStyle(`height: ${f.height - 2}px; line-height: ${f.height - 2}px;`), title: n.value }, toDisplayString(n.value || f.placeholder), 15, Kt), (openBlock(), createElementBlock("svg", { focusable: "false", class: normalizeClass(["u-svg", { show: M.value }]), "data-icon": "search", "aria-hidden": "true", viewBox: "64 64 896 896" }, Yt2, 2)), (openBlock(), createElementBlock("svg", { class: normalizeClass(["u-svg", { rotate: p.value, show: m.value }]), viewBox: "64 64 896 896", "data-icon": "down", "aria-hidden": "true", focusable: "false" }, Ut, 2)), (openBlock(), createElementBlock("svg", { onClick: withModifiers(g, ["stop"]), class: normalizeClass(["u-clear", { show: k.value }]), focusable: "false", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" }, Gt2, 2))], 34), createVNode(TransitionGroup, { name: "fade", tag: "div" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-options-panel", onMouseenter: z, onMouseleave: x, key: "1", style: normalizeStyle(`top: ${f.height + 4}px; line-height: ${f.height - 10}px; max-height: ${f.maxDisplay * f.height + 9}px; width: 100%;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(i.value, (F, H) => (openBlock(), createElementBlock("p", { key: H, class: normalizeClass(["u-option", { "option-hover": !F.disabled && F[f.value] === s.value, "option-selected": F[f.label] === n.value, "option-disabled": F.disabled }]), title: F[f.label], onMouseenter: (D) => {
    return I = F[f.value], void (s.value = I);
    var I;
  }, onClick: (D) => F.disabled ? () => false : function(I, j, se) {
    e.modelValue !== I && (n.value = j, s.value = I, y("update:modelValue", I), y("change", I, j, se)), p.value = false, e.search && (M.value = false, m.value = true);
  }(F[f.value], F[f.label], H) }, toDisplayString(F[f.label]), 43, Zt))), 128))], 36), [[vShow, p.value && i.value && i.value.length]]), withDirectives(createBaseVNode("div", { key: "2", class: "m-empty-wrap", style: normalizeStyle(`top: ${f.height + 4}px; width: ${f.width}px;`) }, [createVNode(unref(Re2), { image: "2", key: "2" })], 4), [[vShow, p.value && i.value && !i.value.length]])]), _: 1 })], 4));
} });
var He2 = W(Jt2, [["__scopeId", "data-v-dfaf21c9"]]);
He2.install = (t) => {
  t.component(He2.__name, He2);
};
var Xt2 = defineComponent({ __name: "Cascader", props: { options: { default: () => [] }, label: { default: "label" }, value: { default: "value" }, children: { default: "children" }, placeholder: { default: "请选择" }, changeOnSelect: { type: Boolean, default: false }, gap: { default: 8 }, width: { default: "auto" }, height: { default: 32 }, disabled: { type: [Boolean, Array], default: false }, allowClear: { type: Boolean, default: false }, search: { type: Boolean, default: false }, filter: { type: [Function, Boolean], default: true }, maxDisplay: { default: 6 }, modelValue: { default: () => [] } }, emits: ["update:modelValue", "change"], setup(t, { emit: a }) {
  const e = t, o = ref([]), i = ref([]), n = ref([]), d = ref([]), s = ref([]);
  function p(c, h3) {
    const z = c.length;
    for (let x = 0; x < z; x++) if (c[x][e.value] === o.value[h3]) return c[x][e.children] || [];
    return [];
  }
  function r(c, h3) {
    const z = c.length;
    for (let x = 0; x < z; x++) if (c[x][e.value] === o.value[h3]) return c[x][e.label];
    return o.value[h3];
  }
  watchEffect(() => {
    n.value = [...e.options];
  }), watchEffect(() => {
    o.value = [...e.modelValue];
  }), watchEffect(() => {
    var c;
    c = o.value, d.value = p(n.value, 0), s.value = [], c.length > 1 && (s.value = p(d.value, 1)), function(h3) {
      i.value[0] = r(n.value, 0), h3.length > 1 && (i.value[1] = r(d.value, 1)), h3.length > 2 && (i.value[2] = r(s.value, 2));
    }(o.value);
  });
  const m = a;
  function k(c, h3) {
    e.changeOnSelect ? (m("update:modelValue", [c]), m("change", [c], [h3])) : (o.value = [c], i.value = [h3]);
  }
  function M(c, h3) {
    e.changeOnSelect ? (m("update:modelValue", [o.value[0], c]), m("change", [o.value[0], c], [i.value[0], h3])) : (o.value = [o.value[0], c], i.value = [i.value[0], h3]);
  }
  function w(c, h3) {
    m("update:modelValue", [...o.value.slice(0, 2), c]), m("change", [...o.value.slice(0, 2), c], [...i.value.slice(0, 2), h3]);
  }
  return (c, h3) => (openBlock(), createElementBlock("div", { class: "m-cascader", style: normalizeStyle(`height: ${c.height}px; gap: ${c.gap}px;`) }, [createVNode(unref(He2), { options: n.value, label: c.label, value: c.value, placeholder: Array.isArray(c.placeholder) ? c.placeholder[0] : c.placeholder, disabled: Array.isArray(c.disabled) ? c.disabled[0] : c.disabled, "allow-clear": c.allowClear, search: c.search, filter: c.filter, width: Array.isArray(c.width) ? c.width[0] : c.width, height: c.height, "max-display": c.maxDisplay, modelValue: o.value[0], "onUpdate:modelValue": h3[0] || (h3[0] = (z) => o.value[0] = z), onChange: k }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]), createVNode(unref(He2), { options: d.value, label: c.label, value: c.value, placeholder: Array.isArray(c.placeholder) ? c.placeholder[1] : c.placeholder, disabled: Array.isArray(c.disabled) ? c.disabled[1] : c.disabled, "allow-clear": c.allowClear, search: c.search, filter: c.filter, width: Array.isArray(c.width) ? c.width[1] : c.width, height: c.height, "max-display": c.maxDisplay, modelValue: o.value[1], "onUpdate:modelValue": h3[1] || (h3[1] = (z) => o.value[1] = z), onChange: M }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]), createVNode(unref(He2), { options: s.value, label: c.label, value: c.value, placeholder: Array.isArray(c.placeholder) ? c.placeholder[2] : c.placeholder, disabled: Array.isArray(c.disabled) ? c.disabled[2] : c.disabled, "allow-clear": c.allowClear, search: c.search, filter: c.filter, width: Array.isArray(c.width) ? c.width[2] : c.width, height: c.height, "max-display": c.maxDisplay, modelValue: o.value[2], "onUpdate:modelValue": h3[2] || (h3[2] = (z) => o.value[2] = z), onChange: w }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"])], 4));
} });
var ia = W(Xt2, [["__scopeId", "data-v-70444074"]]);
ia.install = (t) => {
  t.component(ia.__name, ia);
};
var Qt = ["onClick"];
var el = { class: "u-label" };
var al = { key: 1, class: "m-checkbox-wrap" };
var tl = { class: "u-label" };
var ll = defineComponent({ __name: "Checkbox", props: { options: { default: () => [] }, disabled: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, value: { default: () => [] }, gap: { default: 8 }, width: { default: "auto" }, height: { default: "auto" }, indeterminate: { type: Boolean, default: false }, checked: { type: Boolean, default: false } }, emits: ["update:value", "update:checked", "change"], setup(t, { emit: a }) {
  const e = t, o = computed(() => e.options.length), i = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), n = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), d = computed(() => e.vertical ? { marginBottom: e.gap + "px" } : { marginRight: e.gap + "px" }), s = ref([]);
  watchEffect(() => {
    s.value = e.value;
  });
  const p = a;
  function r() {
    p("update:checked", !e.checked);
  }
  return (m, k) => (openBlock(), createElementBlock("div", { class: "m-checkbox", style: normalizeStyle(`max-width: ${i.value}; max-height: ${n.value};`) }, [o.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(m.options, (M, w) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-checkbox-wrap", { vertical: m.vertical }]), style: normalizeStyle(o.value !== w + 1 ? d.value : ""), key: w }, [createBaseVNode("div", { class: normalizeClass(["m-box", { disabled: m.disabled || M.disabled }]), onClick: (c) => m.disabled || M.disabled ? () => false : function(h3) {
    if (e.value.includes(h3)) {
      const z = s.value.filter((x) => x !== h3);
      p("update:value", z), p("change", z);
    } else {
      const z = [...s.value, h3];
      p("update:value", z), p("change", z);
    }
  }(M.value) }, [createBaseVNode("span", { class: normalizeClass(["u-checkbox", { "u-checkbox-checked": s.value.includes(M.value) }]) }, null, 2), createBaseVNode("span", el, [renderSlot(m.$slots, "default", { label: M.label }, () => [createTextVNode(toDisplayString(M.label), 1)], true)])], 10, Qt)], 6))), 128)) : (openBlock(), createElementBlock("div", al, [createBaseVNode("div", { class: normalizeClass(["m-box", { disabled: m.disabled }]), onClick: r }, [createBaseVNode("span", { class: normalizeClass(["u-checkbox", { "u-checkbox-checked": m.checked && !m.indeterminate, indeterminate: m.indeterminate }]) }, null, 2), createBaseVNode("span", tl, [renderSlot(m.$slots, "default", {}, () => [createTextVNode("Check all")], true)])], 2)]))], 4));
} });
var ua = W(ll, [["__scopeId", "data-v-282d46eb"]]);
ua.install = (t) => {
  t.component(ua.__name, ua);
};
var ca2 = W(defineComponent({ __name: "Col", props: { span: { default: void 0 }, offset: { default: 0 }, flex: { default: "" }, xs: { default: void 0 }, sm: { default: void 0 }, md: { default: void 0 }, lg: { default: void 0 }, xl: { default: void 0 }, xxl: { default: void 0 } }, setup(t) {
  const a = t, e = computed(() => typeof a.flex == "number" ? `${a.flex} ${a.flex} auto` : a.flex), o = computed(() => i.value >= 1600 && a.xxl ? typeof a.xxl == "object" ? a.xxl : { span: a.xxl, offset: void 0 } : i.value >= 1200 && a.xl ? typeof a.xl == "object" ? a.xl : { span: a.xl, offset: void 0 } : i.value >= 992 && a.lg ? typeof a.lg == "object" ? a.lg : { span: a.lg, offset: void 0 } : i.value >= 768 && a.md ? typeof a.md == "object" ? a.md : { span: a.md, offset: void 0 } : i.value >= 576 && a.sm ? typeof a.sm == "object" ? a.sm : { span: a.sm, offset: void 0 } : i.value < 576 && a.xs ? typeof a.xs == "object" ? a.xs : { span: a.xs, offset: void 0 } : void 0), i = ref(document.documentElement.clientWidth);
  function n() {
    i.value = document.documentElement.clientWidth;
  }
  return onMounted(() => {
    window.addEventListener("resize", n);
  }), onUnmounted(() => {
    window.removeEventListener("resize", n);
  }), (d, s) => {
    var p, r;
    return openBlock(), createElementBlock("div", { class: normalizeClass(`m-col col-${((p = o.value) == null ? void 0 : p.span) || d.span} offset-${((r = o.value) == null ? void 0 : r.offset) || d.offset}`), style: normalizeStyle([{ "padding-left": "var(--xGap)", "padding-right": "var(--xGap)" }, `flex: ${e.value}`]) }, [renderSlot(d.$slots, "default", {}, void 0, true)], 6);
  };
} }), [["__scopeId", "data-v-8e536677"]]);
ca2.install = (t) => {
  t.component(ca2.__name, ca2);
};
var ol = ["onClick", "onKeydown"];
var sl = { key: 0, class: "m-arrow" };
var nl = [((t) => (pushScopeId("data-v-0b1df362"), t = t(), popScopeId(), t))(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1))];
var il2 = { class: "u-lang" };
var ul = defineComponent({ __name: "Collapse", props: { collapseData: { default: () => [] }, activeKey: { default: null }, bordered: { type: Boolean, default: true }, copyable: { type: Boolean, default: false }, lang: { default: "" }, fontSize: { default: 14 }, headerFontSize: { default: 0 }, textFontSize: { default: 0 }, showArrow: { type: Boolean, default: true }, arrowPlacement: { default: "left" }, ghost: { type: Boolean, default: false } }, emits: ["update:activeKey", "change"], setup(t, { emit: a }) {
  const e = t, o = ref(), i = ref(0);
  function n(c) {
    c.style.height = o.value[i.value].offsetHeight + (e.bordered && !e.ghost ? 1 : 0) + "px", c.style.opacity = "1";
  }
  function d(c) {
    c.style.removeProperty("height"), c.style.removeProperty("opacity");
  }
  function s(c) {
    c.style.height = o.value[i.value].offsetHeight + (e.bordered && !e.ghost ? 1 : 0) + "px", c.style.opacity = "1";
  }
  function p(c) {
    c.style.removeProperty("height"), c.style.removeProperty("opacity");
  }
  const r = a;
  function m(c) {
    r("update:activeKey", c), r("change", c);
  }
  function k(c, h3) {
    i.value = h3, M(c) ? Array.isArray(e.activeKey) ? m(e.activeKey.filter((z) => z !== c)) : m(null) : Array.isArray(e.activeKey) ? m([...e.activeKey, c]) : m(c);
  }
  function M(c) {
    return Array.isArray(e.activeKey) ? e.activeKey.includes(c) : e.activeKey === c;
  }
  const w = ref("Copy");
  return (c, h3) => {
    const z = resolveComponent("Button");
    return openBlock(), createElementBlock("div", { class: normalizeClass(["m-collapse", { "collapse-borderless": !c.bordered, "collapse-arrow-right": c.arrowPlacement === "right", "collapse-ghost": c.ghost }]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(c.collapseData, (x, y) => (openBlock(), createElementBlock("div", { class: "m-collapse-item", key: y }, [createBaseVNode("div", { class: normalizeClass(["m-collapse-header", { "collapse-header-no-arrow": x.showArrow !== void 0 ? !x.showArrow : !c.showArrow }]), tabindex: "0", onClick: (g) => k(x.key || y, y), onKeydown: (g) => function(f, _, F) {
      f.key === "Enter" && k(_, F);
    }(g, x.key || y, y) }, [(x.showArrow !== void 0 ? x.showArrow : c.showArrow) ? (openBlock(), createElementBlock("div", sl, [(openBlock(), createElementBlock("svg", { focusable: "false", class: normalizeClass(["u-arrow", { "arrow-rotate": M(x.key || y) }]), "data-icon": "right", "aria-hidden": "true", viewBox: "64 64 896 896" }, nl, 2))])) : createCommentVNode("", true), createBaseVNode("div", { class: "u-header", style: normalizeStyle(`font-size: ${c.headerFontSize || c.fontSize}px;`) }, [renderSlot(c.$slots, "header", { header: x.header, key: x.key || y }, () => [createTextVNode(toDisplayString(x.header || "--"), 1)], true)], 4)], 42, ol), createVNode(Transition, { name: "collapse", onEnter: n, onAfterEnter: d, onLeave: s, onAfterLeave: p }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-collapse-content", { "u-collapse-copyable": c.copyable }]) }, [createBaseVNode("div", il2, [renderSlot(c.$slots, "lang", { lang: c.lang, key: x.key || y }, () => [createTextVNode(toDisplayString(c.lang), 1)], true)]), createVNode(z, { size: "small", class: "u-copy", type: "primary", onClick: (g) => function(f) {
      navigator.clipboard.writeText(o.value[f].innerText || "").then(() => {
        w.value = "Copied", ve(() => {
          w.value = "Copy";
        }, 3e3);
      }, (_) => {
        w.value = _;
      });
    }(y) }, { default: withCtx(() => [createTextVNode(toDisplayString(w.value), 1)]), _: 2 }, 1032, ["onClick"]), createBaseVNode("div", { ref_for: true, ref_key: "text", ref: o, class: "u-text", style: normalizeStyle(`font-size: ${c.textFontSize || c.fontSize}px;`) }, [renderSlot(c.$slots, "text", { text: x.text, key: x.key || y }, () => [createTextVNode(toDisplayString(x.text), 1)], true)], 4)], 2), [[vShow, M(x.key || y)]])]), _: 2 }, 1024)]))), 128))], 2);
  };
} });
var da2 = W(ul, [["__scopeId", "data-v-0b1df362"]]);
da2.install = (t) => {
  t.component(da2.__name, da2);
};
var cl2 = { class: "m-countdown" };
var dl2 = { class: "m-time" };
var rl = { key: 0, class: "u-prefix" };
var vl2 = { key: 0, class: "u-suffix" };
var ra = W(defineComponent({ __name: "Countdown", props: { title: { default: "" }, value: { default: void 0 }, future: { type: Boolean, default: true }, format: { default: "HH:mm:ss" }, prefix: { default: "" }, suffix: { default: "" }, titleStyle: { default: () => ({}) }, valueStyle: { default: () => ({}) }, finishedText: { default: "Finished" } }, emits: ["finish"], setup(t, { emit: a }) {
  const e = t, o = useSlots(), i = computed(() => {
    var c;
    const w = (c = o.prefix) == null ? void 0 : c.call(o);
    return w ? !!(w[0].children !== "v-if" && (w != null && w.length)) : e.prefix;
  }), n = computed(() => {
    var c;
    const w = (c = o.suffix) == null ? void 0 : c.call(o);
    return w ? !!(w[0].children !== "v-if" && (w != null && w.length)) : e.suffix;
  }), d = ref(0), s = ref(), p = computed(() => ({ showMillisecond: e.format.includes("SSS"), showYear: e.format.includes("Y"), showMonth: e.format.includes("M"), showDay: e.format.includes("D"), showHour: e.format.includes("H"), showMinute: e.format.includes("m"), showSecond: e.format.includes("s") }));
  function r(w) {
    return w < 10 ? "0" + w : String(w);
  }
  function m(w) {
    if (w === null) return "--";
    let c = e.format;
    if (p.value.showMillisecond) {
      var h3 = w % 1e3;
      c = c.replace("SSS", "0".repeat(3 - String(h3).length) + h3);
    }
    if (w = Math.floor(w / 1e3), p.value.showYear) {
      var z = Math.floor(w / 31104e3);
      c = c.includes("YY") ? c.replace("YY", r(z)) : c.replace("Y", String(z));
    } else z = 0;
    if (p.value.showMonth) {
      w -= 60 * z * 60 * 24 * 30 * 12;
      var x = Math.floor(w / 2592e3);
      c = c.includes("MM") ? c.replace("MM", r(x)) : c.replace("M", String(x));
    } else x = 0;
    if (p.value.showDay) {
      w -= 60 * x * 60 * 24 * 30;
      var y = Math.floor(w / 86400);
      c = c.includes("DD") ? c.replace("DD", r(y)) : c.replace("D", String(y));
    } else y = 0;
    if (p.value.showHour) {
      w -= 60 * y * 60 * 24;
      var g = Math.floor(w / 3600);
      c = c.includes("HH") ? c.replace("HH", r(g)) : c.replace("H", String(g));
    } else g = 0;
    if (p.value.showMinute) {
      w -= 60 * g * 60;
      var f = Math.floor(w / 60);
      c = c.includes("mm") ? c.replace("mm", r(f)) : c.replace("m", String(f));
    } else f = 0;
    if (p.value.showSecond) {
      var _ = w - 60 * f;
      c = c.includes("ss") ? c.replace("ss", r(_)) : c.replace("s", String(_));
    }
    return c;
  }
  const k = a;
  function M() {
    d.value > Date.now() ? (s.value = d.value - Date.now(), requestAnimationFrame(M)) : (s.value = 0, k("finish"));
  }
  return watchEffect(() => {
    Number.isFinite(e.value) ? (e.future ? e.value >= Date.now() && (d.value = e.value) : e.value >= 0 && (d.value = e.value + Date.now()), requestAnimationFrame(M)) : s.value = null;
  }), (w, c) => (openBlock(), createElementBlock("div", cl2, [createBaseVNode("div", { class: "u-title", style: normalizeStyle(w.titleStyle) }, [renderSlot(w.$slots, "title", {}, () => [createTextVNode(toDisplayString(e.title), 1)], true)], 4), createBaseVNode("div", dl2, [i.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [i.value || s.value > 0 || s.value === null ? (openBlock(), createElementBlock("span", rl, [renderSlot(w.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(w.prefix), 1)], true)])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), w.finishedText && s.value === 0 && s.value !== null ? (openBlock(), createElementBlock("span", { key: 1, class: "u-time-value", style: normalizeStyle(w.valueStyle) }, [renderSlot(w.$slots, "finish", {}, () => [createTextVNode(toDisplayString(w.finishedText), 1)], true)], 4)) : createCommentVNode("", true), Number.isFinite(s.value) && s.value > 0 ? (openBlock(), createElementBlock("span", { key: 2, class: "u-time-value", style: normalizeStyle(w.valueStyle) }, toDisplayString(m(s.value)), 5)) : createCommentVNode("", true), n.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [n.value || s.value > 0 || s.value === null ? (openBlock(), createElementBlock("span", vl2, [renderSlot(w.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(w.suffix), 1)], true)])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)])]));
} }), [["__scopeId", "data-v-304ba240"]]);
ra.install = (t) => {
  t.component(ra.__name, ra);
};
var va2 = W(defineComponent({ inheritAttrs: false, __name: "DatePicker", props: { width: { default: 180 }, mode: { default: "date" }, showTime: { type: Boolean, default: false }, showToday: { type: Boolean, default: false }, modelType: { default: "format" } }, setup(t) {
  const a = t, e = computed(() => a.mode === "time"), o = computed(() => a.mode === "week"), i = computed(() => a.mode === "month"), n = computed(() => a.mode === "year");
  return (d, s) => (openBlock(), createElementBlock("div", { class: "m-datepicker", style: normalizeStyle(`width: ${d.width}px;`) }, [createVNode(unref(Hn), mergeProps({ locale: "zh-CN", "month-change-on-scroll": false, "enable-time-picker": d.showTime, "time-picker": e.value, "week-picker": o.value, "month-picker": i.value, "year-picker": n.value, "now-button-label": "今天", "show-now-button": d.showToday, "auto-apply": "", "text-input": "", "model-type": d.modelType, "day-names": ["一", "二", "三", "四", "五", "六", "七"] }, d.$attrs), null, 16, ["enable-time-picker", "time-picker", "week-picker", "month-picker", "year-picker", "show-now-button", "model-type"])], 4));
} }), [["__scopeId", "data-v-cef27ae1"]]);
va2.install = (t) => {
  t.component(va2.__name, va2);
};
var pl2 = { class: "m-header" };
var fl2 = { class: "u-title" };
var hl2 = { class: "u-extra" };
var ml2 = { key: 0 };
var gl2 = ["colspan"];
var yl2 = { key: 1 };
var kl2 = defineComponent({ __name: "Descriptions", props: { title: { default: "" }, bordered: { type: Boolean, default: false }, column: { default: () => ({ xs: 1, sm: 2, md: 3 }) }, extra: { default: "" }, size: { default: "default" }, labelStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) } }, setup(t) {
  const a = t, e = ref(document.documentElement.clientWidth), o = computed(() => typeof a.column == "object" ? e.value >= 1600 && a.column.xxl ? a.column.xxl : e.value >= 1200 && a.column.xl ? a.column.xl : e.value >= 992 && a.column.lg ? a.column.lg : e.value >= 768 && a.column.md ? a.column.md : e.value >= 576 && a.column.sm ? a.column.sm : e.value < 576 && a.column.xs ? a.column.xs : 1 : a.column), i = ref(), n = ref(), d = ref(), s = ref(), p = ref([]), r = computed(() => p.value.length);
  function m() {
    e.value = document.documentElement.clientWidth;
  }
  function k(c, h3) {
    const z = c.length;
    let x = [];
    for (let y = 0; y < z; y++) {
      const g = { span: Math.min(c[y].dataset.span, h3), element: c[y] };
      M(x) < h3 ? (g.span = Math.min(g.span, h3 - M(x)), y === z - 1 && (g.span = h3 - M(x)), x.push(g), y === z - 1 && p.value.push(x)) : (p.value.push(x), x = [g], y === z - 1 && (g.span = h3, p.value.push(x)));
    }
    a.bordered ? nextTick(() => {
      p.value.forEach((y, g) => {
        y.forEach((f) => {
          const _ = Array.from(f.element.children), F = _[0].cloneNode(true);
          F.colSpan = 1, w(F, a.labelStyle), w(F, JSON.parse(f.element.dataset.labelStyle));
          const H = _[1].cloneNode(true);
          H.colSpan = 2 * f.span - 1, w(H, a.contentStyle), w(H, JSON.parse(f.element.dataset.contentStyle)), s.value[g].appendChild(F), s.value[g].appendChild(H);
        });
      });
    }) : nextTick(() => {
      c.forEach((y, g) => {
        const f = Array.from(y.children), _ = f[0];
        w(_, a.labelStyle), w(_, JSON.parse(y.dataset.labelStyle));
        const F = f[1];
        w(F, a.contentStyle), w(F, JSON.parse(y.dataset.contentStyle)), d.value[g].appendChild(y);
      });
    });
  }
  function M(c) {
    return c.reduce((h3, z) => h3 + z.span, 0);
  }
  function w(c, h3) {
    JSON.stringify(h3) !== "{}" && Object.keys(h3).forEach((z) => {
      c.style[z] = h3[z];
    });
  }
  return watchEffect(() => {
    a.bordered ? n.value = Array.from(i.value.children).filter((c) => c.className === "m-desc-item-bordered") : n.value = Array.from(i.value.children).filter((c) => c.className === "m-desc-item");
  }, { flush: "post" }), watch(n, (c) => {
    p.value = [], nextTick(() => {
      k(c, o.value);
    });
  }), watch(o, (c) => {
    p.value = [], nextTick(() => {
      k(n.value, c);
    });
  }), onMounted(() => {
    window.addEventListener("resize", m);
  }), onUnmounted(() => {
    window.removeEventListener("resize", m);
  }), (c, h3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-desc", `desc-${c.size}`]) }, [createBaseVNode("div", pl2, [createBaseVNode("div", fl2, [renderSlot(c.$slots, "title", {}, () => [createTextVNode(toDisplayString(c.title), 1)], true)]), createBaseVNode("div", hl2, [renderSlot(c.$slots, "extra", {}, () => [createTextVNode(toDisplayString(c.extra), 1)], true)])]), withDirectives(createBaseVNode("div", { ref_key: "view", ref: i }, [renderSlot(c.$slots, "default", {}, void 0, true)], 512), [[vShow, false]]), createBaseVNode("div", { class: normalizeClass(["m-desc-view", { "m-bordered": c.bordered }]) }, [createBaseVNode("table", null, [c.bordered ? (openBlock(), createElementBlock("tbody", yl2, [r.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(r.value, (z) => (openBlock(), createElementBlock("tr", { ref_for: true, ref_key: "rows", ref: s, class: "tr-bordered", key: z }))), 128)) : createCommentVNode("", true)])) : (openBlock(), createElementBlock("tbody", ml2, [(openBlock(true), createElementBlock(Fragment, null, renderList(p.value, (z, x) => (openBlock(), createElementBlock("tr", { key: x }, [(openBlock(true), createElementBlock(Fragment, null, renderList(z, (y, g) => (openBlock(), createElementBlock("td", { ref_for: true, ref_key: "cols", ref: d, class: "u-item-td", colspan: y.span, key: g }, null, 8, gl2))), 128))]))), 128))]))])], 2)], 2));
} });
var pa = W(kl2, [["__scopeId", "data-v-cbb130d9"]]);
pa.install = (t) => {
  t.component(pa.__name, pa);
};
var wl2 = ["data-span", "data-label-style", "data-content-style"];
var bl2 = { class: "u-label" };
var xl2 = { class: "u-content" };
var Ml2 = ["data-span", "data-label-style", "data-content-style"];
var zl2 = { class: "u-label-th" };
var _l2 = { class: "u-content-td" };
var fa2 = W(defineComponent({ __name: "DescriptionsItem", props: { label: { default: "" }, span: { default: 1 }, labelStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) } }, setup: (t) => (a, e) => (openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", { class: "m-desc-item", "data-span": a.span, "data-label-style": JSON.stringify(a.labelStyle), "data-content-style": JSON.stringify(a.contentStyle) }, [createBaseVNode("span", bl2, [renderSlot(a.$slots, "label", {}, () => [createTextVNode(toDisplayString(a.label), 1)], true)]), createBaseVNode("span", xl2, [renderSlot(a.$slots, "default", {}, void 0, true)])], 8, wl2), createBaseVNode("div", { class: "m-desc-item-bordered", "data-span": a.span, "data-label-style": JSON.stringify(a.labelStyle), "data-content-style": JSON.stringify(a.contentStyle) }, [createBaseVNode("th", zl2, [renderSlot(a.$slots, "label", {}, () => [createTextVNode(toDisplayString(a.label), 1)], true)]), createBaseVNode("td", _l2, [renderSlot(a.$slots, "default", {}, void 0, true)])], 8, Ml2)], 64)) }), [["__scopeId", "data-v-45441a7d"]]);
fa2.install = (t) => {
  t.component(fa2.__name, fa2);
};
var t1 = (t) => (pushScopeId("data-v-c23c347a"), t = t(), popScopeId(), t);
var Cl2 = { class: "m-dialog-root" };
var $l2 = { class: "m-dialog-mask" };
var Bl2 = { class: "m-dialog-header" };
var Fl2 = { class: "u-head" };
var Ll2 = { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "fullscreen", "aria-hidden": "true", focusable: "false" };
var Sl2 = [t1(() => createBaseVNode("path", { d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z" }, null, -1))];
var Al2 = { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "fullscreen-exit", "aria-hidden": "true", focusable: "false" };
var El2 = [t1(() => createBaseVNode("path", { d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z" }, null, -1))];
var Dl2 = [t1(() => createBaseVNode("svg", { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "close", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var Hl2 = { class: "m-dialog-footer" };
var ha = W(defineComponent({ __name: "Dialog", props: { title: { default: "提示" }, content: { default: "" }, width: { default: 540 }, height: { default: "auto" }, switchFullscreen: { type: Boolean, default: false }, cancelText: { default: "取消" }, okText: { default: "确定" }, footer: { type: Boolean, default: false }, center: { type: Boolean, default: true }, top: { default: 100 }, loading: { type: Boolean, default: false }, bodyStyle: { default: () => ({}) }, visible: { type: Boolean, default: false } }, emits: ["close", "cancel", "ok"], setup(t, { emit: a }) {
  const e = t, o = ref(false), i = computed(() => typeof e.height == "number" ? e.height + "px" : e.height);
  watch(() => e.visible, (k) => {
    k && (o.value = false);
  });
  const n = a;
  function d() {
    e.loading || n("close");
  }
  function s() {
    o.value = !o.value;
  }
  function p() {
    n("close");
  }
  function r() {
    n("cancel");
  }
  function m() {
    n("ok");
  }
  return (k, M) => (openBlock(), createElementBlock("div", Cl2, [createVNode(Transition, { name: "mask" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", $l2, null, 512), [[vShow, k.visible]])]), _: 1 }), createVNode(Transition, null, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-dialog-wrap", onClick: withModifiers(d, ["self"]) }, [createBaseVNode("div", { ref: "dialog", class: normalizeClass(["m-dialog", k.center ? "relative-hv-center" : "top-center"]), style: normalizeStyle(`width: ${o.value ? "100%" : e.width + "px"}; top: ${k.center ? "50%" : o.value ? 0 : k.top + "px"};`) }, [createBaseVNode("div", { class: normalizeClass(["m-dialog-content", { loading: k.loading }]), style: normalizeStyle(`--height: ${o.value ? "100vh" : i.value}`) }, [createVNode(unref(ye), { class: "u-spin", spinning: k.loading, size: "small" }, null, 8, ["spinning"]), createBaseVNode("div", Bl2, [createBaseVNode("p", Fl2, [renderSlot(k.$slots, "title", {}, () => [createTextVNode(toDisplayString(k.title), 1)], true)])]), k.switchFullscreen ? (openBlock(), createElementBlock("span", { key: 0, class: "m-screen", onClick: s }, [withDirectives((openBlock(), createElementBlock("svg", Ll2, Sl2, 512)), [[vShow, !o.value]]), withDirectives((openBlock(), createElementBlock("svg", Al2, El2, 512)), [[vShow, o.value]])])) : createCommentVNode("", true), createBaseVNode("span", { class: "m-close", onClick: p }, Dl2), createBaseVNode("div", { class: "m-dialog-body", style: normalizeStyle(k.bodyStyle) }, [renderSlot(k.$slots, "default", {}, () => [createTextVNode(toDisplayString(k.content), 1)], true)], 4), withDirectives(createBaseVNode("div", Hl2, [createVNode(unref(Fe), { class: "mr8", onClick: r }, { default: withCtx(() => [createTextVNode(toDisplayString(k.cancelText), 1)]), _: 1 }), createVNode(unref(Fe), { type: "primary", onClick: m }, { default: withCtx(() => [createTextVNode(toDisplayString(k.okText), 1)]), _: 1 })], 512), [[vShow, k.footer]])], 6)], 6)], 512), [[vShow, k.visible]])]), _: 3 })]));
} }), [["__scopeId", "data-v-c23c347a"]]);
ha.install = (t) => {
  t.component(ha.__name, ha);
};
var Tl2 = { key: 2, class: "u-text" };
var Il2 = { key: 1, class: "m-divider-vertical" };
var ma2 = W(defineComponent({ __name: "Divider", props: { dashed: { type: Boolean, default: false }, orientation: { default: "center" }, orientationMargin: { default: "" }, borderWidth: { default: 1 }, type: { default: "horizontal" } }, setup(t) {
  const a = t, e = computed(() => {
    if (a.orientationMargin !== "") return typeof a.orientationMargin == "number" ? a.orientationMargin + "px" : a.orientationMargin;
  }), o = useSlots(), i = computed(() => {
    var d, s;
    const n = (d = o.default) == null ? void 0 : d.call(o);
    return !!n && !!(n[0].children !== "v-if" && ((s = n[0].children) != null && s.length));
  });
  return (n, d) => n.type === "horizontal" ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass([`m-divider-horizontal ${n.orientation}`, { dashed: n.dashed, margin24: !i.value, marginLeft: n.orientationMargin !== "" && n.orientation === "left", marginRight: n.orientationMargin !== "" && n.orientation === "right" }]), style: normalizeStyle(`--border-width: ${n.borderWidth}px;`) }, [n.orientation === "left" ? withDirectives((openBlock(), createElementBlock("span", { key: 0, class: "u-text", style: normalizeStyle(`margin-left: ${e.value};`) }, [renderSlot(n.$slots, "default", {}, void 0, true)], 4)), [[vShow, i.value]]) : n.orientation === "right" ? withDirectives((openBlock(), createElementBlock("span", { key: 1, class: "u-text", style: normalizeStyle(`margin-right: ${e.value};`) }, [renderSlot(n.$slots, "default", {}, void 0, true)], 4)), [[vShow, i.value]]) : withDirectives((openBlock(), createElementBlock("span", Tl2, [renderSlot(n.$slots, "default", {}, void 0, true)], 512)), [[vShow, i.value]])], 6)) : (openBlock(), createElementBlock("div", Il2));
} }), [["__scopeId", "data-v-3f2f90d8"]]);
ma2.install = (t) => {
  t.component(ma2.__name, ma2);
};
var g1 = (t) => (pushScopeId("data-v-60bc1aa0"), t = t(), popScopeId(), t);
var jl2 = { class: "m-drawer", tabindex: "-1" };
var Vl2 = { class: "m-drawer-content" };
var Wl2 = { key: 0, class: "m-drawer-body-wrapper" };
var Rl2 = { class: "m-drawer-header" };
var Nl2 = { class: "m-header-title" };
var ql2 = [g1(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var Ol2 = { class: "u-title" };
var Pl2 = { class: "m-drawer-extra" };
var Kl2 = { class: "m-drawer-body" };
var Yl2 = { key: 1, class: "m-drawer-body-wrapper" };
var Ul2 = { class: "m-drawer-header" };
var Gl2 = { class: "m-header-title" };
var Zl2 = [g1(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var Jl2 = { class: "u-title" };
var Xl2 = { class: "m-drawer-extra" };
var Ql2 = { class: "m-drawer-body" };
var ga = W(defineComponent({ __name: "Drawer", props: { title: { default: "" }, width: { default: 378 }, height: { default: 378 }, closable: { type: Boolean, default: true }, destroyOnClose: { type: Boolean, default: false }, extra: { default: "" }, placement: { default: "right" }, zIndex: { default: 1e3 }, open: { type: Boolean, default: false } }, emits: ["update:open", "close"], setup(t, { emit: a }) {
  const e = t, o = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), i = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), n = a;
  function d(p) {
    s(p);
  }
  function s(p) {
    n("update:open", false), n("close", p);
  }
  return (p, r) => (openBlock(), createElementBlock("div", jl2, [createVNode(Transition, { name: "fade" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-drawer-mask", onClick: withModifiers(d, ["self"]) }, null, 512), [[vShow, p.open]])]), _: 1 }), createVNode(Transition, { name: `motion-${p.placement}` }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-drawer-wrapper", `drawer-${p.placement}`]), style: normalizeStyle(`z-index: ${p.zIndex}; ${["top", "bottom"].includes(p.placement) ? "height:" + i.value : "width:" + o.value};`) }, [createBaseVNode("div", Vl2, [p.destroyOnClose ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Wl2, [createBaseVNode("div", Rl2, [createBaseVNode("div", Nl2, [p.closable ? (openBlock(), createElementBlock("svg", { key: 0, focusable: "false", onClick: s, class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, ql2)) : createCommentVNode("", true), createBaseVNode("p", Ol2, [renderSlot(p.$slots, "title", {}, () => [createTextVNode(toDisplayString(p.title), 1)], true)])]), createBaseVNode("div", Pl2, [renderSlot(p.$slots, "extra", {}, () => [createTextVNode(toDisplayString(p.extra), 1)], true)])]), createBaseVNode("div", Kl2, [renderSlot(p.$slots, "default", {}, void 0, true)])])), p.destroyOnClose && p.open ? (openBlock(), createElementBlock("div", Yl2, [createBaseVNode("div", Ul2, [createBaseVNode("div", Gl2, [(openBlock(), createElementBlock("svg", { focusable: "false", onClick: s, class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, Zl2)), createBaseVNode("p", Jl2, [renderSlot(p.$slots, "title", {}, () => [createTextVNode(toDisplayString(p.title), 1)], true)])]), createBaseVNode("div", Xl2, [renderSlot(p.$slots, "extra", {}, () => [createTextVNode(toDisplayString(p.extra), 1)], true)])]), createBaseVNode("div", Ql2, [renderSlot(p.$slots, "default", {}, void 0, true)])])) : createCommentVNode("", true)])], 6), [[vShow, p.open]])]), _: 3 }, 8, ["name"])]));
} }), [["__scopeId", "data-v-60bc1aa0"]]);
ga.install = (t) => {
  t.component(ga.__name, ga);
};
var e2 = ((t) => (pushScopeId("data-v-334156c3"), t = t(), popScopeId(), t))(() => createBaseVNode("div", { class: "m-tooltip-arrow" }, [createBaseVNode("span", { class: "u-tooltip-arrow" })], -1));
var Ke2 = W(defineComponent({ __name: "Tooltip", props: { maxWidth: { default: 120 }, content: { default: "暂无内容" }, tooltip: { default: "暂无提示" }, fontSize: { default: 14 }, color: { default: "#FFF" }, backgroundColor: { default: "rgba(0, 0, 0, .85)" }, overlayStyle: { default: () => ({}) } }, emits: ["openChange"], setup(t, { emit: a }) {
  const e = ref(false), o = ref(), i = ref(0), n = ref(0), d = ref(), s = ref(), p = a;
  function r() {
    (function() {
      const k = d.value.offsetWidth, M = s.value.offsetWidth, w = s.value.offsetHeight;
      i.value = w + 4, n.value = (M - k) / 2;
    })(), oe(o.value), e.value = true, p("openChange", e.value);
  }
  function m() {
    o.value = ve(() => {
      e.value = false, p("openChange", e.value);
    }, 100);
  }
  return (k, M) => (openBlock(), createElementBlock("div", { class: "m-tooltip", onMouseenter: r, onMouseleave: m }, [createBaseVNode("div", { ref_key: "tooltipRef", ref: s, class: normalizeClass(["m-tooltip-content", { "show-tip": e.value }]), style: normalizeStyle(`--tooltip-font-size: ${k.fontSize}px; --tooltip-color: ${k.color}; --tooltip-background-color: ${k.backgroundColor}; max-width: ${k.maxWidth}px; transform-origin: 50% ${i.value}px; top: ${-i.value}px; left: ${-n.value}px;`), onMouseenter: r, onMouseleave: m }, [createBaseVNode("div", { class: "u-tooltip", style: normalizeStyle(k.overlayStyle) }, [renderSlot(k.$slots, "tooltip", {}, () => [createTextVNode(toDisplayString(k.tooltip), 1)], true)], 4), e2], 38), createBaseVNode("div", { ref_key: "contentRef", ref: d }, [renderSlot(k.$slots, "default", {}, () => [createTextVNode(toDisplayString(k.content), 1)], true)], 512)], 32));
} }), [["__scopeId", "data-v-334156c3"]]);
Ke2.install = (t) => {
  t.component(Ke2.__name, Ke2);
};
var ya = W(defineComponent({ __name: "Ellipsis", props: { maxWidth: { default: "100%" }, line: { default: void 0 }, expand: { type: Boolean, default: false }, tooltip: { type: Boolean, default: true }, tooltipMaxWidth: { default: void 0 }, tooltipFontSize: { default: 14 }, tooltipColor: { default: "#FFF" }, tooltipBackgroundColor: { default: "rgba(0, 0, 0, .85)" }, tooltipOverlayStyle: { default: () => ({ padding: "8px 12px", textAlign: "justify" }) } }, emits: ["expandChange"], setup(t, { emit: a }) {
  const e = t, o = ref(), i = ref(), n = ref(), d = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth);
  watchEffect(() => {
    o.value = e.tooltip;
  }), watchEffect(() => {
    e.tooltip && (e.tooltipMaxWidth ? n.value = e.tooltipMaxWidth : n.value = i.value.offsetWidth + 24);
  }, { flush: "post" });
  const s = a;
  function p() {
    i.value.style["-webkit-line-clamp"] ? (e.tooltip ? (o.value = false, nextTick(() => {
      i.value.style["-webkit-line-clamp"] = "";
    })) : i.value.style["-webkit-line-clamp"] = "", s("expandChange", true)) : (e.tooltip && (o.value = true), i.value.style["-webkit-line-clamp"] = e.line, s("expandChange", false));
  }
  return (r, m) => o.value ? (openBlock(), createBlock(unref(Ke2), { key: 0, "max-width": n.value, fontSize: r.tooltipFontSize, color: r.tooltipColor, backgroundColor: r.tooltipBackgroundColor, overlayStyle: r.tooltipOverlayStyle }, { tooltip: withCtx(() => [renderSlot(r.$slots, "tooltip", {}, () => [renderSlot(r.$slots, "default", {}, void 0, true)], true)]), default: withCtx(() => [createBaseVNode("div", mergeProps({ ref_key: "ellipsis", ref: i, class: ["m-ellipsis", [r.line ? "ellipsis-line" : "not-ellipsis-line", { "cursor-pointer": r.expand }]], style: `-webkit-line-clamp: ${r.line}; max-width: ${d.value};`, onClick: m[0] || (m[0] = (k) => r.expand ? p() : () => false) }, r.$attrs), [renderSlot(r.$slots, "default", {}, void 0, true)], 16)]), _: 3 }, 8, ["max-width", "fontSize", "color", "backgroundColor", "overlayStyle"])) : (openBlock(), createElementBlock("div", mergeProps({ key: 1, ref_key: "ellipsis", ref: i, class: ["m-ellipsis", [r.line ? "ellipsis-line" : "not-ellipsis-line", { "cursor-pointer": r.expand }]], style: `-webkit-line-clamp: ${r.line}; max-width: ${d.value};`, onClick: m[1] || (m[1] = (k) => r.expand ? p() : () => false) }, r.$attrs), [renderSlot(r.$slots, "default", {}, void 0, true)], 16));
} }), [["__scopeId", "data-v-8b94af26"]]);
ya.install = (t) => {
  t.component(ya.__name, ya);
};
var ka = W(defineComponent({ __name: "Flex", props: { width: { default: "auto" }, vertical: { type: Boolean, default: false }, wrap: { default: "nowrap" }, justify: { default: "normal" }, align: { default: "normal" }, gap: { default: "small" } }, setup(t) {
  const a = t, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), o = computed(() => {
    if (a.gap === void 0) return 0;
    if (typeof a.gap == "number") return a.gap + "px";
    if (Array.isArray(a.gap)) return a.gap[1] + "px " + a.gap[0] + "px ";
    if (["small", "middle", "large"].includes(a.gap))
      return { small: "8px", middle: "16px", large: "24px" }[a.gap];
  });
  return (i, n) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-flex", { "flex-vertical": i.vertical }]), style: normalizeStyle(`
      width: ${e.value};
      gap: ${o.value};
      margin-bottom: -${Array.isArray(a.gap) && i.wrap ? a.gap[1] : 0}px;
      --wrap: ${i.wrap};
      --justify: ${i.justify};
      --align: ${i.align};
    `) }, [renderSlot(i.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-779347b3"]]);
ka.install = (t) => {
  t.component(ka.__name, ka);
};
var je2 = W(defineComponent({ __name: "Space", props: { width: { default: "auto" }, align: { default: "start" }, direction: { default: "horizontal" }, gap: { default: "small" }, wrap: { type: Boolean, default: true } }, setup(t) {
  const a = t, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), o = computed(() => {
    if (typeof a.gap == "number") return a.gap + "px";
    if (Array.isArray(a.gap)) return a.gap[1] + "px " + a.gap[0] + "px ";
    if (["small", "middle", "large"].includes(a.gap))
      return { small: "8px", middle: "16px", large: "24px" }[a.gap];
  });
  return (i, n) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-space", [`space-${i.direction} space-${i.align}`, { "space-wrap": i.wrap }]]), style: normalizeStyle(`width: ${e.value}; gap: ${o.value}; margin-bottom: -${Array.isArray(a.gap) && i.wrap ? a.gap[1] : 0}px;`) }, [renderSlot(i.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-be2cb4d0"]]);
je2.install = (t) => {
  t.component(je2.__name, je2);
};
var $e = (t) => (pushScopeId("data-v-d2f6c1d7"), t = t(), popScopeId(), t);
var a2 = { class: "m-image-wrap" };
var t2 = ["onLoad", "src", "alt"];
var l2 = ["onClick"];
var o2 = { class: "m-image-mask-info" };
var s2 = $e(() => createBaseVNode("svg", { class: "u-eye", focusable: "false", "data-icon": "eye", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })], -1));
var n2 = { class: "u-pre" };
var i2 = { class: "m-preview-mask" };
var u2 = { class: "m-preview-body" };
var c2 = { class: "m-preview-operations" };
var d2 = ["href", "title"];
var r2 = [$e(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "close", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var v2 = [$e(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "zoom-in", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })], -1))];
var p2 = [$e(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "zoom-out", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })], -1))];
var f2 = [$e(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "expand", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z" })], -1))];
var h2 = [$e(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "rotate-right", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" }), createBaseVNode("path", { d: "M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" })], -1))];
var m2 = [$e(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "rotate-left", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" }), createBaseVNode("path", { d: "M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" })], -1))];
var g2 = [$e(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "swap", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" })], -1))];
var y2 = { class: "u-icon", style: { transform: "rotate(90deg)" }, focusable: "false", "data-icon": "swap", "aria-hidden": "true", viewBox: "64 64 896 896" };
var k2 = [$e(() => createBaseVNode("path", { d: "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" }, null, -1))];
var w2 = ["src", "alt", "onLoad"];
var b2 = [$e(() => createBaseVNode("svg", { focusable: "false", class: "u-switch", "data-icon": "left", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })], -1))];
var x2 = [$e(() => createBaseVNode("svg", { focusable: "false", class: "u-switch", "data-icon": "right", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" })], -1))];
var M2 = defineComponent({ __name: "Image", props: { src: { default: "" }, name: { default: "" }, width: { default: 200 }, height: { default: 200 }, bordered: { type: Boolean, default: true }, gap: { default: 8 }, fit: { default: "contain" }, preview: { default: "预览" }, zoomRatio: { default: 0.1 }, minZoomScale: { default: 0.1 }, maxZoomScale: { default: 10 }, resetOnDbclick: { type: Boolean, default: true }, loop: { type: Boolean, default: false }, album: { type: Boolean, default: false } }, setup(t, { expose: a }) {
  const e = t, o = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), i = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), n = ref([]);
  watchEffect(() => {
    n.value = Array.isArray(e.src) ? e.src : [{ src: e.src, name: e.name }];
  });
  const d = computed(() => n.value.length);
  onMounted(() => {
    document.addEventListener("keydown", g);
  }), onUnmounted(() => {
    document.removeEventListener("keydown", g);
  });
  const s = ref(Array(d.value).fill(false)), p = ref(Array(d.value).fill(false)), r = ref(0), m = ref(false), k = ref(0), M = ref(1), w = ref(1), c = ref(1), h3 = ref(0), z = ref(0), x = ref(0), y = ref(0);
  function g(O) {
    O.preventDefault(), m.value && d.value > 1 && (O.key !== "ArrowLeft" && O.key !== "ArrowUp" || ne(), O.key !== "ArrowRight" && O.key !== "ArrowDown" || be());
  }
  function f(O) {
    if (O) {
      if (O.name) return O.name;
      {
        const Q = O.src.split("?")[0].split("/");
        return Q[Q.length - 1];
      }
    }
  }
  function _(O) {
    M.value = 1, k.value = 0, x.value = 0, y.value = 0, m.value = true, r.value = O;
  }
  function F(O, Q) {
    const pe = String(O).split(".")[1], le = String(Q).split(".")[1];
    let de = Math.max((pe == null ? void 0 : pe.length) || 0, (le == null ? void 0 : le.length) || 0), ee = O.toFixed(de), xe = Q.toFixed(de);
    return (+ee.replace(".", "") + +xe.replace(".", "")) / Math.pow(10, de);
  }
  function H() {
    m.value = false;
  }
  function D() {
    M.value + e.zoomRatio > e.maxZoomScale ? M.value = e.maxZoomScale : M.value = F(M.value, e.zoomRatio);
  }
  function I() {
    M.value - e.zoomRatio < e.minZoomScale ? M.value = e.minZoomScale : M.value = F(M.value, -e.zoomRatio);
  }
  function j() {
    M.value = 1, w.value = 1, c.value = 1, k.value = 0, x.value = 0, y.value = 0;
  }
  function se() {
    k.value += 90;
  }
  function ae() {
    k.value -= 90;
  }
  function _e2() {
    w.value *= -1;
  }
  function we() {
    c.value *= -1;
  }
  function ue(O) {
    console.log("e", O);
    const Q = O.deltaY * e.zoomRatio * 0.1;
    M.value === e.minZoomScale && Q > 0 || M.value === e.maxZoomScale && Q < 0 || (M.value - Q < e.minZoomScale ? M.value = e.minZoomScale : M.value - Q > e.maxZoomScale ? M.value = e.maxZoomScale : M.value = F(M.value, -Q));
  }
  function ne() {
    e.loop ? r.value = (r.value - 1 + d.value) % d.value : r.value > 0 && r.value--, j();
  }
  function be() {
    e.loop ? r.value = (r.value + 1) % d.value : r.value < d.value - 1 && r.value++, j();
  }
  return a({ onPreview: _ }), (O, Q) => (openBlock(), createElementBlock("div", a2, [createVNode(unref(je2), { gap: O.gap }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (pe, le) => withDirectives((openBlock(), createElementBlock("div", { class: normalizeClass(["m-image", { bordered: O.bordered, "image-hover-mask": s.value[le] }]), style: normalizeStyle(`width: ${o.value}; height: ${i.value};`), key: le }, [createVNode(unref(ye), { spinning: !s.value[le], indicator: "dynamic-circle" }, { default: withCtx(() => [createBaseVNode("img", { class: "u-image", style: normalizeStyle(`width: calc(${o.value} - 2px); height: calc(${i.value} - 2px); object-fit: ${O.fit};`), onLoad: (de) => {
    return ee = le, void (s.value[ee] = true);
    var ee;
  }, src: pe.src, alt: pe.name }, null, 44, t2)]), _: 2 }, 1032, ["spinning"]), createBaseVNode("div", { class: "m-image-mask", onClick: (de) => _(le) }, [createBaseVNode("div", o2, [s2, createBaseVNode("p", n2, [renderSlot(O.$slots, "preview", {}, () => [createTextVNode(toDisplayString(O.preview), 1)], true)])])], 8, l2)], 6)), [[vShow, !O.album || O.album && le === 0]])), 128))]), _: 3 }, 8, ["gap"]), createVNode(Transition, { name: "mask" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", i2, null, 512), [[vShow, m.value]])]), _: 1 }), createVNode(Transition, { name: "preview" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-preview-wrap", onClick: withModifiers(H, ["self"]), onWheel: withModifiers(ue, ["prevent"]) }, [createBaseVNode("div", u2, [createBaseVNode("div", c2, [createBaseVNode("a", { class: "u-name", href: n.value[r.value].src, target: "_blank", title: f(n.value[r.value]) }, toDisplayString(f(n.value[r.value])), 9, d2), withDirectives(createBaseVNode("p", { class: "u-preview-progress" }, toDisplayString(r.value + 1) + " / " + toDisplayString(d.value), 513), [[vShow, Array.isArray(O.src)]]), createBaseVNode("div", { class: "u-preview-operation", title: "关闭", onClick: H }, r2), createBaseVNode("div", { class: normalizeClass(["u-preview-operation", { "u-operation-disabled": M.value === O.maxZoomScale }]), title: "放大", onClick: D }, v2, 2), createBaseVNode("div", { class: normalizeClass(["u-preview-operation", { "u-operation-disabled": M.value === O.minZoomScale }]), title: "缩小", onClick: I }, p2, 2), createBaseVNode("div", { class: "u-preview-operation", title: "还原", onClick: j }, f2), createBaseVNode("div", { class: "u-preview-operation", title: "向右旋转", onClick: se }, h2), createBaseVNode("div", { class: "u-preview-operation", title: "向左旋转", onClick: ae }, m2), createBaseVNode("div", { class: "u-preview-operation", title: "水平镜像", onClick: _e2 }, g2), createBaseVNode("div", { class: "u-preview-operation", title: "垂直镜像", onClick: we }, [(openBlock(), createElementBlock("svg", y2, k2))])]), createBaseVNode("div", { class: "m-preview-image", style: normalizeStyle(`transform: translate3d(${x.value}px, ${y.value}px, 0px);`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (pe, le) => withDirectives((openBlock(), createBlock(unref(ye), { spinning: !p.value[le], indicator: "dynamic-circle", key: le }, { default: withCtx(() => [createBaseVNode("img", { class: "u-preview-image", style: normalizeStyle(`transform: scale3d(${w.value * M.value}, ${c.value * M.value}, 1) rotate(${k.value}deg);`), src: pe.src, alt: pe.name, onMousedown: Q[0] || (Q[0] = withModifiers((de) => function(ee) {
    const xe = ee.target.getBoundingClientRect(), Le = xe.top, Se2 = xe.bottom, E = xe.right, fe = xe.left, ie = document.documentElement.clientWidth, Me = document.documentElement.clientHeight;
    h3.value = ee.clientX, z.value = ee.clientY;
    const Ce2 = x.value, Ae = y.value;
    document.onmousemove = (Xe) => {
      x.value = Ce2 + Xe.clientX - h3.value, y.value = Ae + Xe.clientY - z.value;
    }, document.onmouseup = () => {
      x.value > Ce2 + ie - E && (x.value = Ce2 + ie - E), x.value < Ce2 - fe && (x.value = Ce2 - fe), y.value > Ae + Me - Se2 && (y.value = Ae + Me - Se2), y.value < Ae - Le && (y.value = Ae - Le), document.onmousemove = null;
    };
  }(de), ["prevent"])), onLoad: (de) => function(ee) {
    p.value[ee] = true;
  }(le), onDblclick: Q[1] || (Q[1] = (de) => O.resetOnDbclick ? j() : () => false) }, null, 44, w2)]), _: 2 }, 1032, ["spinning"])), [[vShow, r.value === le]])), 128))], 4), d.value > 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", { class: normalizeClass(["m-switch-left", { "u-switch-disabled": r.value === 0 && !O.loop }]), onClick: ne }, b2, 2), createBaseVNode("div", { class: normalizeClass(["m-switch-right", { "u-switch-disabled": r.value === d.value - 1 && !O.loop }]), onClick: be }, x2, 2)], 64)) : createCommentVNode("", true)])], 544), [[vShow, m.value]])]), _: 1 })]));
} });
var Ye2 = W(M2, [["__scopeId", "data-v-d2f6c1d7"]]);
Ye2.install = (t) => {
  t.component(Ye2.__name, Ye2);
};
var Ga2 = (t) => (pushScopeId("data-v-14195256"), t = t(), popScopeId(), t);
var z2 = { key: 0, class: "m-prefix" };
var _2 = ["type", "value", "maxlength", "disabled"];
var C2 = { class: "m-suffix" };
var $2 = [Ga2(() => createBaseVNode("svg", { focusable: "false", class: "u-clear", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })], -1))];
var B2 = { focusable: "false", class: "u-eye", "data-icon": "eye", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var F2 = [Ga2(() => createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" }, null, -1))];
var L2 = { focusable: "false", class: "u-eye", "data-icon": "eye-invisible", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var S2 = [Ga2(() => createBaseVNode("path", { d: "M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" }, null, -1)), Ga2(() => createBaseVNode("path", { d: "M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" }, null, -1))];
var A2 = { key: 2, class: "m-count" };
var wa = W(defineComponent({ inheritAttrs: false, __name: "Input", props: { width: { default: "100%" }, addonBefore: { default: "" }, addonAfter: { default: "" }, allowClear: { type: Boolean, default: false }, password: { type: Boolean, default: false }, disabled: { type: Boolean, default: false }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, size: { default: "middle" }, prefix: { default: "" }, suffix: { default: "" }, value: { default: "" }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "enter"], setup(t, { emit: a }) {
  const e = t, o = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), i = computed(() => e.maxlength ? e.value.length + " / " + e.maxlength : e.value.length), n = useSlots(), d = computed(() => {
    var f;
    const g = (f = n.prefix) == null ? void 0 : f.call(n);
    return g ? !!(g[0].children !== "v-if" && (g != null && g.length)) : e.prefix;
  }), s = computed(() => {
    var f;
    const g = (f = n.suffix) == null ? void 0 : f.call(n);
    return g ? !!(g[0].children !== "v-if" && (g != null && g.length)) : e.suffix;
  }), p = computed(() => {
    var f;
    const g = (f = n.addonBefore) == null ? void 0 : f.call(n);
    return g ? !!(g[0].children !== "v-if" && (g != null && g.length)) : e.addonBefore;
  }), r = computed(() => {
    var f;
    const g = (f = n.addonAfter) == null ? void 0 : f.call(n);
    return g ? !!(g[0].children !== "v-if" && (g != null && g.length)) : e.addonAfter;
  }), m = computed(() => "lazy" in e.valueModifiers), k = a;
  function M(g) {
    m.value || (k("update:value", g.target.value), k("change", g));
  }
  function w(g) {
    m.value && (k("update:value", g.target.value), k("change", g));
  }
  function c(g) {
    g.key === "Enter" && (g.preventDefault(), k("enter", g));
  }
  const h3 = ref();
  function z() {
    k("update:value", ""), h3.value.focus();
  }
  const x = ref(false);
  function y() {
    x.value = !x.value;
  }
  return (g, f) => (openBlock(), createElementBlock("div", { class: "m-input-wrap", style: normalizeStyle(`width: ${o.value};`) }, [p.value ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["m-addon", { before: p.value }]) }, [renderSlot(g.$slots, "addonBefore", {}, () => [createTextVNode(toDisplayString(g.addonBefore), 1)], true)], 2)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["m-input", [`${g.size}`, { disabled: g.disabled, "input-before": p.value, "input-after": r.value }]]), tabindex: "1" }, [d.value ? (openBlock(), createElementBlock("span", z2, [renderSlot(g.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(g.prefix), 1)], true)])) : createCommentVNode("", true), createBaseVNode("input", mergeProps({ class: "u-input", ref_key: "input", ref: h3, type: g.password && !x.value ? "password" : "text", value: g.value, maxlength: g.maxlength, disabled: g.disabled, onInput: M, onChange: w, onKeydown: c }, g.$attrs), null, 16, _2), createBaseVNode("span", C2, [!g.disabled && g.allowClear && g.value ? (openBlock(), createElementBlock("span", { key: 0, class: "m-action", onClick: z }, $2)) : createCommentVNode("", true), g.password ? (openBlock(), createElementBlock("span", { key: 1, class: "m-action", onClick: y }, [withDirectives((openBlock(), createElementBlock("svg", B2, F2, 512)), [[vShow, x.value]]), withDirectives((openBlock(), createElementBlock("svg", L2, S2, 512)), [[vShow, !x.value]])])) : createCommentVNode("", true), g.showCount ? (openBlock(), createElementBlock("span", A2, toDisplayString(i.value), 1)) : createCommentVNode("", true), s.value ? renderSlot(g.$slots, "suffix", { key: 3 }, () => [createTextVNode(toDisplayString(g.suffix), 1)], true) : createCommentVNode("", true)])], 2), r.value ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["m-addon", { after: r.value }]) }, [renderSlot(g.$slots, "addonAfter", {}, () => [createTextVNode(toDisplayString(g.addonAfter), 1)], true)], 2)) : createCommentVNode("", true)], 4));
} }), [["__scopeId", "data-v-14195256"]]);
wa.install = (t) => {
  t.component(wa.__name, wa);
};
var y1 = (t) => (pushScopeId("data-v-bb1a69b9"), t = t(), popScopeId(), t);
var E2 = { class: "m-input-wrap" };
var D2 = { key: 0, class: "u-input-prefix" };
var H2 = ["disabled"];
var T2 = { class: "m-handler-wrap" };
var I2 = [y1(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "up", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" })], -1))];
var j2 = [y1(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "down", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })], -1))];
var ba = W(defineComponent({ inheritAttrs: false, __name: "InputNumber", props: { width: { default: 90 }, min: { default: -1 / 0 }, max: { default: 1 / 0 }, step: { default: 1 }, precision: { default: 0 }, prefix: { default: "" }, formatter: { type: Function, default: (t) => t }, keyboard: { type: Boolean, default: true }, disabled: { type: Boolean, default: false }, value: { default: null } }, emits: ["update:value", "change"], setup(t, { emit: a }) {
  var c;
  const e = t, o = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), i = computed(() => {
    var z;
    const h3 = ((z = String(e.step).split(".")[1]) == null ? void 0 : z.length) || 0;
    return Math.max(e.precision, h3);
  }), n = useSlots(), d = computed(() => {
    var z;
    const h3 = (z = n.prefix) == null ? void 0 : z.call(n);
    return h3 ? !!(h3[0].children !== "v-if" && (h3 != null && h3.length)) : e.prefix;
  }), s = ref(e.formatter((c = e.value) == null ? void 0 : c.toFixed(i.value)));
  watch(() => e.value, (h3) => {
    s.value = h3 === null ? null : e.formatter(h3 == null ? void 0 : h3.toFixed(i.value));
  }), watch(s, (h3) => {
    h3 || r(null);
  });
  const p = a;
  function r(h3) {
    p("change", h3), p("update:value", h3);
  }
  function m(h3) {
    var x, y;
    const z = h3.target.value.replace(/,/g, "");
    if (Number.isNaN(parseFloat(z))) s.value = (x = e.value) == null ? void 0 : x.toFixed(i.value);
    else {
      if (parseFloat(z) > e.max) return void r(e.max);
      if (parseFloat(z) < e.min) return void r(e.min);
      parseFloat(z) !== e.value ? r(parseFloat(z)) : s.value = (y = e.value) == null ? void 0 : y.toFixed(i.value);
    }
  }
  function k(h3) {
    h3.key === "ArrowUp" && M(), h3.key === "ArrowDown" && w();
  }
  function M() {
    r(parseFloat(Math.min(e.max, u1(e.value || 0, +e.step)).toFixed(i.value)));
  }
  function w() {
    r(parseFloat(Math.max(e.min, u1(e.value || 0, -e.step)).toFixed(i.value)));
  }
  return (h3, z) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-input-number", { "input-number-disabled": h3.disabled }]), tabindex: "1", style: normalizeStyle(`width: ${o.value};`) }, [createBaseVNode("div", E2, [d.value ? (openBlock(), createElementBlock("span", D2, [renderSlot(h3.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(h3.prefix), 1)], true)])) : createCommentVNode("", true), h3.keyboard ? withDirectives((openBlock(), createElementBlock("input", mergeProps({ key: 1, class: "u-input-number", autocomplete: "off", disabled: h3.disabled, "onUpdate:modelValue": z[0] || (z[0] = (x) => s.value = x), onKeydown: [z[1] || (z[1] = withKeys(withModifiers(() => {
  }, ["prevent"]), ["up"])), k], onChange: m }, h3.$attrs), null, 16, H2)), [[vModelDynamic, s.value]]) : withDirectives((openBlock(), createElementBlock("input", mergeProps({ key: 2, autocomplete: "off", class: "u-input-number", onChange: m, "onUpdate:modelValue": z[2] || (z[2] = (x) => s.value = x) }, h3.$attrs), null, 16)), [[vModelDynamic, s.value]])]), createBaseVNode("div", T2, [createBaseVNode("span", { class: normalizeClass(["m-arrow up-arrow", { disabled: (h3.value || 0) >= h3.max }]), onClick: M }, I2, 2), createBaseVNode("span", { class: normalizeClass(["m-arrow down-arrow", { disabled: (h3.value || 0) <= h3.min }]), onClick: w }, j2, 2)])], 6));
} }), [["__scopeId", "data-v-bb1a69b9"]]);
ba.install = (t) => {
  t.component(ba.__name, ba);
};
var Ze2 = (t) => (pushScopeId("data-v-31e3f18e"), t = t(), popScopeId(), t);
var V2 = ["onMouseenter", "onMouseleave"];
var W2 = [Ze2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var R2 = [Ze2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var N2 = [Ze2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var q2 = [Ze2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var O2 = [Ze2(() => createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" }, null, -1))];
var P2 = { class: "u-content" };
var We = ((t) => (t.info = "#1677FF", t.success = "#52c41a", t.error = "#ff4d4f", t.warning = "#faad14", t.loading = "#1677FF", t))(We || {});
var K2 = defineComponent({ __name: "Message", props: { duration: { default: 3e3 }, top: { default: 30 } }, emits: ["close"], setup(t, { expose: a, emit: e }) {
  const o = t, i = ref(), n = ref([]), d = ref([]), s = ref([]), p = computed(() => typeof o.top == "number" ? o.top + "px" : o.top), r = computed(() => n.value.every((w) => !w));
  function m() {
    oe(i.value);
    const w = s.value.length - 1;
    n.value[w] = true, M(w);
  }
  watch(r, (w, c) => {
    !c && w && (i.value = ve(() => {
      s.value.splice(0), n.value.splice(0);
    }, 300));
  }), a({ info: function(w) {
    s.value.push({ content: w, mode: "info" }), m();
  }, success: function(w) {
    s.value.push({ content: w, mode: "success" }), m();
  }, error: function(w) {
    s.value.push({ content: w, mode: "error" }), m();
  }, warning: function(w) {
    s.value.push({ content: w, mode: "warning" }), m();
  }, loading: function(w) {
    s.value.push({ content: w, mode: "loading" }), m();
  } });
  const k = e;
  function M(w) {
    d.value[w] = ve(() => {
      n.value[w] = false, k("close");
    }, o.duration);
  }
  return (w, c) => (openBlock(), createElementBlock("div", { class: "m-message-wrap", style: normalizeStyle(`top: ${p.value};`) }, [createVNode(TransitionGroup, { name: "slide-fade" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (h3, z) => withDirectives((openBlock(), createElementBlock("div", { class: "m-message", key: z }, [createBaseVNode("div", { class: "m-message-content", onMouseenter: (x) => function(y) {
    oe(d.value[y]);
  }(z), onMouseleave: (x) => function(y) {
    M(y);
  }(z) }, [h3.mode === "info" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-svg", style: normalizeStyle({ fill: We[h3.mode] }), viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true", focusable: "false" }, W2, 4)) : createCommentVNode("", true), h3.mode === "success" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-svg", style: normalizeStyle({ fill: We[h3.mode] }), viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true", focusable: "false" }, R2, 4)) : createCommentVNode("", true), h3.mode === "error" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-svg", style: normalizeStyle({ fill: We[h3.mode] }), viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true", focusable: "false" }, N2, 4)) : createCommentVNode("", true), h3.mode === "warning" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-svg", style: normalizeStyle({ fill: We[h3.mode] }), viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true", focusable: "false" }, q2, 4)) : createCommentVNode("", true), h3.mode === "loading" ? (openBlock(), createElementBlock("svg", { key: 4, class: "u-svg circular", style: normalizeStyle({ stroke: We[h3.mode] }), viewBox: "0 0 50 50", focusable: "false" }, O2, 4)) : createCommentVNode("", true), createBaseVNode("p", P2, toDisplayString(h3.content), 1)], 40, V2)])), [[vShow, n.value[z]]])), 128))]), _: 1 })], 4));
} });
var Ue = W(K2, [["__scopeId", "data-v-31e3f18e"]]);
Ue.install = (t) => {
  t.component(Ue.__name, Ue);
};
var Ne = (t) => (pushScopeId("data-v-8d184dc3"), t = t(), popScopeId(), t);
var Y2 = { class: "m-modal-root" };
var U2 = { class: "m-modal-mask" };
var G2 = { class: "m-body" };
var Z2 = { class: "m-title" };
var J2 = { key: 0, focusable: "false", class: "u-icon confirm", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var X2 = [Ne(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), Ne(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var Q2 = { key: 1, focusable: "false", class: "u-icon info", "data-icon": "info-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var e4 = [Ne(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var a4 = { key: 2, focusable: "false", class: "u-icon success", "data-icon": "check-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var t4 = [Ne(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var l4 = { key: 3, focusable: "false", class: "u-icon error", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var o4 = [Ne(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var s4 = { key: 4, focusable: "false", class: "u-icon warning", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var n4 = [Ne(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var i4 = { class: "u-title" };
var u4 = { class: "u-content" };
var c4 = { class: "m-btns" };
var xa = W(defineComponent({ __name: "Modal", props: { width: { default: 420 }, cancelText: { default: "取消" }, okText: { default: "确定" }, noticeText: { default: "知道了" }, center: { type: Boolean, default: true }, top: { default: 100 }, loading: { type: Boolean, default: false }, visible: { type: Boolean, default: false } }, emits: ["cancel", "ok", "know"], setup(t, { expose: a, emit: e }) {
  const o = ref(""), i = ref();
  a({ info: function(m) {
    o.value = "info", i.value = m;
  }, success: function(m) {
    o.value = "success", i.value = m;
  }, error: function(m) {
    o.value = "error", i.value = m;
  }, warning: function(m) {
    o.value = "warning", i.value = m;
  }, confirm: function(m) {
    o.value = "confirm", i.value = m;
  }, erase: function(m) {
    o.value = "erase", i.value = m;
  } });
  const n = e;
  function d() {
    n("cancel");
  }
  function s() {
    n("cancel");
  }
  function p() {
    n("ok");
  }
  function r() {
    n("know");
  }
  return (m, k) => (openBlock(), createElementBlock("div", Y2, [createVNode(Transition, { name: "mask" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", U2, null, 512), [[vShow, m.visible]])]), _: 1 }), createVNode(Transition, null, { default: withCtx(() => {
    var M, w;
    return [withDirectives(createBaseVNode("div", { class: "m-modal-wrap", onClick: withModifiers(d, ["self"]) }, [createBaseVNode("div", { class: normalizeClass(["m-modal", m.center ? "relative-hv-center" : "top-center"]), style: normalizeStyle(`width: ${m.width}px; top: ${m.center ? "50%" : m.top + "px"};`) }, [createBaseVNode("div", { class: normalizeClass(["m-modal-body", { loading: m.loading }]) }, [createVNode(unref(ye), { class: "u-spin", spinning: m.loading, size: "small" }, null, 8, ["spinning"]), createBaseVNode("div", G2, [createBaseVNode("div", Z2, [o.value === "confirm" || o.value === "erase" ? (openBlock(), createElementBlock("svg", J2, X2)) : createCommentVNode("", true), o.value === "info" ? (openBlock(), createElementBlock("svg", Q2, e4)) : createCommentVNode("", true), o.value === "success" ? (openBlock(), createElementBlock("svg", a4, t4)) : createCommentVNode("", true), o.value === "error" ? (openBlock(), createElementBlock("svg", l4, o4)) : createCommentVNode("", true), o.value === "warning" ? (openBlock(), createElementBlock("svg", s4, n4)) : createCommentVNode("", true), createBaseVNode("div", i4, toDisplayString((M = i.value) == null ? void 0 : M.title), 1)]), createBaseVNode("div", u4, toDisplayString((w = i.value) == null ? void 0 : w.content), 1)]), createBaseVNode("div", c4, [o.value === "confirm" || o.value === "erase" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(unref(Fe), { class: "mr8", onClick: s }, { default: withCtx(() => [createTextVNode(toDisplayString(m.cancelText), 1)]), _: 1 }), o.value === "confirm" ? (openBlock(), createBlock(unref(Fe), { key: 0, type: "primary", onClick: p }, { default: withCtx(() => [createTextVNode(toDisplayString(m.okText), 1)]), _: 1 })) : createCommentVNode("", true), o.value === "erase" ? (openBlock(), createBlock(unref(Fe), { key: 1, type: "danger", onClick: p }, { default: withCtx(() => [createTextVNode(toDisplayString(m.okText), 1)]), _: 1 })) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), ["info", "success", "error", "warning"].includes(o.value) ? (openBlock(), createBlock(unref(Fe), { key: 1, type: "primary", onClick: r }, { default: withCtx(() => [createTextVNode(toDisplayString(m.noticeText), 1)]), _: 1 })) : createCommentVNode("", true)])], 2)], 6)], 512), [[vShow, m.visible]])];
  }), _: 1 })]));
} }), [["__scopeId", "data-v-8d184dc3"]]);
xa.install = (t) => {
  t.component(xa.__name, xa);
};
var De2 = (t) => (pushScopeId("data-v-7d189438"), t = t(), popScopeId(), t);
var d4 = ["onMouseenter", "onMouseleave"];
var r4 = { class: "m-notification-content" };
var v4 = [De2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), De2(() => createBaseVNode("path", { d: "M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1))];
var p4 = [De2(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1)), De2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var f4 = [De2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), De2(() => createBaseVNode("path", { d: "M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var h4 = [De2(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1)), De2(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var m4 = ["onClick"];
var g4 = [De2(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var Pe = ((t) => (t.info = "#1677FF", t.success = "#52c41a", t.error = "#ff4d4f", t.warning = "#faad14", t))(Pe || {});
var y4 = defineComponent({ __name: "Notification", props: { message: { default: "温馨提示" }, duration: { default: 4500 }, top: { default: 24 }, bottom: { default: 24 }, placement: { default: "topRight" } }, emits: ["close"], setup(t, { expose: a, emit: e }) {
  const o = t, i = ref(), n = ref([]), d = ref([]), s = ref([]), p = ref(o.placement), r = ref(), m = computed(() => n.value.length === s.value.length);
  function k() {
    oe(i.value), d.value.push(null);
    const c = s.value.length - 1;
    nextTick(() => {
      r.value[c].style.height = r.value[c].offsetHeight + "px", r.value[c].style.opacity = 1;
    }), s.value[c].placement && (p.value = s.value[c].placement), o.duration && (d.value[c] = ve(() => {
      w(c);
    }, o.duration));
  }
  watch(m, (c, h3) => {
    !h3 && c && (i.value = ve(() => {
      n.value.splice(0), s.value.splice(0);
    }, 300));
  }), a({ open: function(c) {
    s.value.push({ ...c, mode: "open" }), k();
  }, info: function(c) {
    s.value.push({ ...c, mode: "info" }), k();
  }, success: function(c) {
    s.value.push({ ...c, mode: "success" }), k();
  }, error: function(c) {
    s.value.push({ ...c, mode: "error" }), k();
  }, warning: function(c) {
    s.value.push({ ...c, mode: "warning" }), k();
  } });
  const M = e;
  function w(c) {
    n.value.push(c), M("close");
  }
  return (c, h3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-notification-wrapper", p.value]), style: normalizeStyle(`top: ${["topRight", "topLeft"].includes(p.value) ? c.top : "auto"}px; bottom: ${["bottomRight", "bottomLeft"].includes(p.value) ? c.bottom : ""}px;`) }, [createVNode(TransitionGroup, { name: ["topRight", "bottomRight"].includes(p.value) ? "right" : "left" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (z, x) => withDirectives((openBlock(), createElementBlock("div", { ref_for: true, ref_key: "notification", ref: r, class: "m-notification", onMouseenter: (y) => function(g) {
    oe(d.value[g]), d.value[g] = null;
  }(x), onMouseleave: (y) => function(g) {
    o.duration && (d.value[g] = ve(() => {
      w(g);
    }, o.duration));
  }(x), key: x }, [createBaseVNode("div", r4, [z.mode === "info" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-svg", style: normalizeStyle(`fill: ${Pe[z.mode]}`), viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true", focusable: "false" }, v4, 4)) : createCommentVNode("", true), z.mode === "success" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-svg", style: normalizeStyle(`fill: ${Pe[z.mode]}`), viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true", focusable: "false" }, p4, 4)) : createCommentVNode("", true), z.mode === "warning" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-svg", style: normalizeStyle(`fill: ${Pe[z.mode]}`), viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true", focusable: "false" }, f4, 4)) : createCommentVNode("", true), z.mode === "error" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-svg", style: normalizeStyle(`fill: ${Pe[z.mode]}`), viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true", focusable: "false" }, h4, 4)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["u-title", { mb4: z.mode !== "open", ml36: z.mode !== "open" }]) }, toDisplayString(z.message || c.message), 3), createBaseVNode("p", { class: normalizeClass(["u-description", { ml36: z.mode !== "open" }]) }, toDisplayString(z.description || "--"), 3), (openBlock(), createElementBlock("svg", { class: "u-close", onClick: (y) => w(x), viewBox: "64 64 896 896", "data-icon": "close", "aria-hidden": "true", focusable: "false" }, g4, 8, m4))])], 40, d4)), [[vShow, !n.value.includes(x)]])), 128))]), _: 1 }, 8, ["name"])], 6));
} });
var Ma = W(y4, [["__scopeId", "data-v-7d189438"]]);
Ma.install = (t) => {
  t.component(Ma.__name, Ma);
};
var za2 = defineComponent({ __name: "NumberAnimation", props: { from: { default: 0 }, to: { default: 1e3 }, duration: { default: 3e3 }, autoplay: { type: Boolean, default: true }, precision: { default: 0 }, prefix: { default: "" }, suffix: { default: "" }, separator: { default: "," }, decimal: { default: "." }, valueStyle: { default: () => ({}) }, transition: { default: "easeInOutCubic" } }, emits: ["started", "finished"], setup(t, { expose: a, emit: e }) {
  const o = t, i = ref(o.from);
  watchEffect(() => {
    i.value = o.from;
  }), watch([() => o.from, () => o.to], () => {
    o.autoplay && d();
  }), onMounted(() => {
    o.autoplay && d();
  });
  const n = useTransition(i, { duration: o.duration, transition: TransitionPresets[o.transition], onFinished: () => p("finished"), onStarted: () => p("started") });
  function d() {
    i.value = o.to;
  }
  const s = computed(() => {
    const { precision: r, separator: m, decimal: k, prefix: M, suffix: w } = o;
    return p1(n.value, r, m, k, M, w);
  }), p = e;
  return a({ play: d }), (r, m) => (openBlock(), createElementBlock("span", { style: normalizeStyle(r.valueStyle) }, toDisplayString(s.value), 5));
} });
za2.install = (t) => {
  t.component(za2.__name, za2);
};
var qe2 = (t) => (pushScopeId("data-v-79e011df"), t = t(), popScopeId(), t);
var k4 = { class: "m-pagination-wrap" };
var w4 = { key: 0, class: "mr8" };
var b4 = [qe2(() => createBaseVNode("svg", { class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "left", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })], -1))];
var x4 = [qe2(() => createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1)), qe2(() => createBaseVNode("svg", { class: "u-icon", viewBox: "64 64 896 896", "data-icon": "double-left", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" })], -1))];
var M4 = ["onClick"];
var z4 = [qe2(() => createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1)), qe2(() => createBaseVNode("svg", { class: "u-icon", viewBox: "64 64 896 896", "data-icon": "double-right", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" })], -1))];
var _4 = [qe2(() => createBaseVNode("svg", { class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "right", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })], -1))];
var C4 = { key: 2, class: "u-jump-page" };
var $4 = defineComponent({ __name: "Pagination", props: { page: { default: 1 }, pageSize: { default: 10 }, pageSizeOptions: { default: () => [10, 20, 50, 100] }, total: { default: 0 }, pageListNum: { default: 5 }, hideOnSinglePage: { type: Boolean, default: false }, showQuickJumper: { type: Boolean, default: false }, showSizeChanger: { type: Boolean, default: void 0 }, showTotal: { type: Boolean, default: false }, placement: { default: "center" } }, emits: ["change", "pageSizeChange"], setup(t, { emit: a }) {
  const e = t, o = ref(e.page), i = ref(Number(e.pageSizeOptions[0])), n = ref(""), d = ref(false), s = ref(false), p = ref(false), r = ref(false), m = computed(() => Math.ceil(e.total / i.value)), k = computed(() => function(f) {
    var _ = [], F = Math.floor(e.pageListNum / 2), H = { start: f - F, end: f + F };
    H.start < 1 && (H.end = H.end + (1 - H.start), H.start = 1), H.end > m.value && (H.start = H.start - (H.end - m.value), H.end = m.value), H.start < 1 && (H.start = 1), H.start > 1 ? d.value = true : d.value = false, H.end < m.value ? s.value = true : s.value = false;
    for (let D = H.start; D <= H.end; D++) _.push(D);
    return _;
  }(o.value).filter((f) => f !== 1 && f !== m.value)), M = computed(() => typeof e.showSizeChanger == "boolean" ? e.showSizeChanger : e.total > 50), w = computed(() => e.pageSizeOptions.map((f) => ({ label: f + " 条/页", value: Number(f) }))), c = a;
  function h3() {
    o.value = o.value - e.pageListNum > 0 ? o.value - e.pageListNum : 1;
  }
  function z() {
    o.value = o.value + e.pageListNum < m.value ? o.value + e.pageListNum : m.value;
  }
  function x(f, _) {
    f.key === "Enter" && y(_);
  }
  function y(f) {
    if (f === 0 || f === m.value + 1) return false;
    o.value !== f && (o.value = f);
  }
  function g(f) {
    const _ = Math.ceil(e.total / f);
    o.value > _ ? (o.value = _, c("pageSizeChange", o.value, f)) : (c("pageSizeChange", o.value, f), c("change", o.value, f));
  }
  return watch(o, (f) => {
    console.log("change:", f), c("change", f, i.value);
  }), onMounted(() => {
    document.onkeydown = (f) => {
      f.key === "Enter" && function() {
        var _ = Number(n.value);
        Number.isInteger(_) && (_ < 1 && (_ = 1), _ > m.value && (_ = m.value), y(_)), n.value = "";
      }();
    };
  }), onUnmounted(() => {
    document.onkeydown = null;
  }), (f, _) => (openBlock(), createElementBlock("div", { class: normalizeClass([`m-pagination ${f.placement}`, { hidden: f.hideOnSinglePage && f.total <= f.pageSize }]) }, [createBaseVNode("div", k4, [f.showTotal ? (openBlock(), createElementBlock("span", w4, "共 " + toDisplayString(m.value) + " 页 / " + toDisplayString(f.total) + " 条", 1)) : createCommentVNode("", true), createBaseVNode("span", { class: normalizeClass(["u-item", { disabled: o.value === 1 }]), tabindex: "-1", onKeydown: _[0] || (_[0] = (F) => x(F, o.value - 1)), onClick: _[1] || (_[1] = (F) => y(o.value - 1)) }, b4, 34), createBaseVNode("span", { class: normalizeClass(["u-item", { active: o.value === 1 }]), onClick: _[2] || (_[2] = (F) => y(1)) }, "1", 2), withDirectives(createBaseVNode("span", { class: "m-arrow", ref: "forward", onClick: h3, onMouseenter: _[3] || (_[3] = (F) => p.value = true), onMouseleave: _[4] || (_[4] = (F) => p.value = false) }, x4, 544), [[vShow, d.value && k.value[0] - 1 > 1]]), (openBlock(true), createElementBlock(Fragment, null, renderList(k.value, (F, H) => (openBlock(), createElementBlock("span", { class: normalizeClass(["u-item", { active: o.value === F }]), key: H, onClick: (D) => y(F) }, toDisplayString(F), 11, M4))), 128)), withDirectives(createBaseVNode("span", { class: "m-arrow", ref: "backward", onClick: z, onMouseenter: _[5] || (_[5] = (F) => r.value = true), onMouseleave: _[6] || (_[6] = (F) => r.value = false) }, z4, 544), [[vShow, s.value && k.value[k.value.length - 1] + 1 < m.value]]), withDirectives(createBaseVNode("span", { class: normalizeClass(["u-item", { active: o.value === m.value }]), onClick: _[7] || (_[7] = (F) => y(m.value)) }, toDisplayString(m.value), 3), [[vShow, m.value !== 1]]), createBaseVNode("span", { class: normalizeClass(["u-item", { disabled: o.value === m.value }]), tabindex: "-1", onKeydown: _[8] || (_[8] = (F) => x(F, o.value + 1)), onClick: _[9] || (_[9] = (F) => y(o.value + 1)) }, _4, 34), M.value ? (openBlock(), createBlock(unref(He2), { key: 1, class: "u-pagesize-select", options: w.value, onChange: g, modelValue: i.value, "onUpdate:modelValue": _[10] || (_[10] = (F) => i.value = F) }, null, 8, ["options", "modelValue"])) : createCommentVNode("", true), f.showQuickJumper ? (openBlock(), createElementBlock("span", C4, [createTextVNode(" 跳至 "), withDirectives(createBaseVNode("input", { type: "text", "onUpdate:modelValue": _[11] || (_[11] = (F) => n.value = F) }, null, 512), [[vModelText, n.value]]), createTextVNode(" 页 ")])) : createCommentVNode("", true)])], 2));
} });
var Ge = W($4, [["__scopeId", "data-v-79e011df"]]);
Ge.install = (t) => {
  t.component(Ge.__name, Ge);
};
var Je2 = (t) => (pushScopeId("data-v-3a473251"), t = t(), popScopeId(), t);
var B4 = { class: "m-popconfirm" };
var F4 = { class: "m-pop" };
var L4 = { class: "m-pop-message" };
var S4 = { class: "m-icon" };
var A4 = { key: 0, focusable: "false", class: "u-icon", width: "1em", height: "1em", viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true" };
var E4 = [Je2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var D4 = { key: 1, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#52c41a" }, viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true" };
var H4 = [Je2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var T4 = { key: 2, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#ff4d4f" }, viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true" };
var I4 = [Je2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var j4 = { key: 3, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#faad14" }, viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true" };
var V4 = [Je2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var W4 = { key: 0, class: "m-pop-description" };
var R4 = { class: "m-pop-buttons" };
var N4 = Je2(() => createBaseVNode("div", { class: "m-pop-arrow" }, [createBaseVNode("span", { class: "u-pop-arrow" })], -1));
var _a2 = W(defineComponent({ __name: "Popconfirm", props: { title: { default: "" }, description: { default: "" }, content: { default: "" }, icon: { default: "" }, iconType: { default: "warning" }, maxWidth: { default: "auto" }, cancelText: { default: "取消" }, cancelType: { default: "default" }, okText: { default: "确定" }, okType: { default: "primary" }, showCancel: { type: Boolean, default: true } }, emits: ["cancel", "ok", "openChange"], setup(t, { emit: a }) {
  const e = t, o = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth), i = useSlots(), n = computed(() => {
    var g;
    const y = (g = i.description) == null ? void 0 : g.call(i);
    return y ? !!(y[0].children !== "v-if" && (y != null && y.length)) : e.description;
  }), d = ref(false), s = ref(0), p = ref(0), r = ref(), m = ref(), k = ref(false);
  function M() {
    k.value = false;
  }
  function w() {
    k.value = true, m.value.focus();
  }
  const c = a;
  function h3() {
    d.value = !d.value, d.value && function() {
      const y = r.value.offsetWidth, g = m.value.offsetWidth, f = m.value.offsetHeight;
      s.value = f + 4, p.value = (g - y) / 2;
    }(), c("openChange", d.value);
  }
  function z(y) {
    d.value = false, c("openChange", false), c("cancel", y);
  }
  function x(y) {
    d.value = false, c("openChange", false), c("ok", y);
  }
  return (y, g) => {
    const f = resolveComponent("Button");
    return openBlock(), createElementBlock("div", B4, [createBaseVNode("div", { ref_key: "popRef", ref: m, tabindex: "1", class: normalizeClass(["m-pop-content", { "show-pop": d.value }]), style: normalizeStyle(`max-width: ${o.value}; transform-origin: 50% ${s.value}px; top: ${-s.value}px; left: ${-p.value}px;`), onBlur: g[0] || (g[0] = (_) => k.value ? (d.value = false, void c("openChange", false)) : () => false) }, [createBaseVNode("div", F4, [createBaseVNode("div", L4, [createBaseVNode("span", S4, [renderSlot(y.$slots, "icon", {}, () => [y.iconType === "info" ? (openBlock(), createElementBlock("svg", A4, E4)) : createCommentVNode("", true), y.iconType === "success" ? (openBlock(), createElementBlock("svg", D4, H4)) : createCommentVNode("", true), y.iconType === "error" ? (openBlock(), createElementBlock("svg", T4, I4)) : createCommentVNode("", true), y.iconType === "warning" ? (openBlock(), createElementBlock("svg", j4, V4)) : createCommentVNode("", true)], true)]), createBaseVNode("div", { class: normalizeClass(["m-title", { "font-weight": n.value }]) }, [renderSlot(y.$slots, "title", {}, () => [createTextVNode(toDisplayString(y.title), 1)], true)], 2)]), n.value ? (openBlock(), createElementBlock("div", W4, [renderSlot(y.$slots, "description", {}, () => [createTextVNode(toDisplayString(y.description), 1)], true)])) : createCommentVNode("", true), createBaseVNode("div", R4, [y.showCancel ? (openBlock(), createBlock(f, { key: 0, onClick: z, size: "small", type: y.cancelType }, { default: withCtx(() => [createTextVNode(toDisplayString(y.cancelText), 1)]), _: 1 }, 8, ["type"])) : createCommentVNode("", true), createVNode(f, { onClick: x, size: "small", type: y.okType }, { default: withCtx(() => [createTextVNode(toDisplayString(y.okText), 1)]), _: 1 }, 8, ["type"])])]), N4], 38), createBaseVNode("div", { ref_key: "contentRef", ref: r, onClick: h3, onMouseenter: M, onMouseleave: w }, [renderSlot(y.$slots, "default", {}, () => [createTextVNode(toDisplayString(y.content), 1)], true)], 544)]);
  };
} }), [["__scopeId", "data-v-3a473251"]]);
_a2.install = (t) => {
  t.component(_a2.__name, _a2);
};
var q4 = { class: "m-title" };
var O4 = { class: "m-content" };
var P4 = ((t) => (pushScopeId("data-v-8ea70240"), t = t(), popScopeId(), t))(() => createBaseVNode("div", { class: "m-pop-arrow" }, [createBaseVNode("span", { class: "u-pop-arrow" })], -1));
var Ca2 = W(defineComponent({ __name: "Popover", props: { title: { default: "" }, content: { default: "" }, maxWidth: { default: "auto" }, trigger: { default: "hover" }, overlayStyle: { default: () => ({}) } }, emits: ["openChange"], setup(t, { emit: a }) {
  const e = t, o = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth), i = ref(false), n = ref(0), d = ref(0), s = ref(), p = ref();
  function r() {
    const h3 = s.value.offsetWidth, z = p.value.offsetWidth, x = p.value.offsetHeight;
    n.value = x + 4, d.value = (z - h3) / 2;
  }
  const m = a, k = ref();
  function M() {
    r(), oe(k.value), i.value = true, m("openChange", i.value);
  }
  function w() {
    k.value = ve(() => {
      i.value = false, m("openChange", i.value);
    }, 100);
  }
  const c = ref(false);
  return (h3, z) => (openBlock(), createElementBlock("div", { class: "m-popover", onMouseenter: z[6] || (z[6] = (x) => h3.trigger === "hover" ? M() : () => false), onMouseleave: z[7] || (z[7] = (x) => h3.trigger === "hover" ? w() : () => false) }, [createBaseVNode("div", { ref_key: "popRef", ref: p, tabindex: "1", class: normalizeClass(["m-pop-content", { "show-pop": i.value }]), style: normalizeStyle(`max-width: ${o.value}; transform-origin: 50% ${n.value}px; top: ${-n.value}px; left: ${-d.value}px;`), onBlur: z[0] || (z[0] = (x) => h3.trigger === "click" && c.value ? (i.value = false, void m("openChange", false)) : () => false), onMouseenter: z[1] || (z[1] = (x) => h3.trigger === "hover" ? M() : () => false), onMouseleave: z[2] || (z[2] = (x) => h3.trigger === "hover" ? w() : () => false) }, [createBaseVNode("div", { class: "m-pop", style: normalizeStyle(h3.overlayStyle) }, [createBaseVNode("div", q4, [renderSlot(h3.$slots, "title", {}, () => [createTextVNode(toDisplayString(h3.title), 1)], true)]), createBaseVNode("div", O4, [renderSlot(h3.$slots, "content", {}, () => [createTextVNode(toDisplayString(h3.content), 1)], true)])], 4), P4], 38), createBaseVNode("div", { ref_key: "defaultRef", ref: s, onClick: z[3] || (z[3] = (x) => h3.trigger === "click" ? (i.value = !i.value, i.value && r(), void m("openChange", i.value)) : () => false), onMouseenter: z[4] || (z[4] = (x) => h3.trigger === "click" ? void (c.value = false) : () => false), onMouseleave: z[5] || (z[5] = (x) => h3.trigger === "click" ? (c.value = true, void p.value.focus()) : () => false) }, [renderSlot(h3.$slots, "default", {}, void 0, true)], 544)], 32));
} }), [["__scopeId", "data-v-8ea70240"]]);
Ca2.install = (t) => {
  t.component(Ca2.__name, Ca2);
};
var k1 = (t) => (pushScopeId("data-v-455b575d"), t = t(), popScopeId(), t);
var K4 = { class: "m-progress-inner" };
var Y4 = { key: 0, class: "m-success" };
var U4 = [k1(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" })], -1))];
var G4 = { key: 1, class: "u-progress-text" };
var Z4 = { class: "u-progress-circle", viewBox: "0 0 100 100" };
var J4 = ["d", "stroke-width"];
var X4 = ["d", "stroke-width", "stroke", "opacity"];
var Q4 = { key: 0, class: "u-icon", focusable: "false", "data-icon": "check", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var eo2 = [k1(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1))];
var ao2 = { key: 1, class: "u-progress-text" };
var $a2 = W(defineComponent({ __name: "Progress", props: { width: { default: "100%" }, percent: { default: 0 }, strokeColor: { default: "#1677FF" }, strokeWidth: { default: 8 }, showInfo: { type: Boolean, default: true }, format: { type: Function, default: (t) => t + "%" }, type: { default: "line" } }, setup(t) {
  const a = t, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), o = computed(() => (100 - a.strokeWidth) * Math.PI), i = computed(() => {
    const s = 100 - a.strokeWidth;
    return `M 50,50 m 0,-${s / 2}
   a ${s / 2},${s / 2} 0 1 1 0,${s}
   a ${s / 2},${s / 2} 0 1 1 0,-${s}`;
  }), n = computed(() => typeof a.strokeColor == "string" ? a.strokeColor : `linear-gradient(to ${a.strokeColor.direction || "right"}, ${a.strokeColor["0%"] || a.strokeColor.from}, ${a.strokeColor["100%"] || a.strokeColor.to})`), d = computed(() => a.format(a.percent > 100 ? 100 : a.percent));
  return (s, p) => s.type === "line" ? (openBlock(), createElementBlock("div", { key: 0, class: "m-progress-line", style: normalizeStyle(`width: ${e.value}; height: ${s.strokeWidth < 24 ? 24 : s.strokeWidth}px;`) }, [createBaseVNode("div", K4, [createBaseVNode("div", { class: normalizeClass(["u-progress-bg", { "u-success-bg": s.percent >= 100 }]), style: normalizeStyle(`background: ${n.value}; width: ${s.percent >= 100 ? 100 : s.percent}%; height: ${s.strokeWidth}px;`) }, null, 6)]), s.showInfo ? (openBlock(), createBlock(Transition, { key: 0, mode: "out-in" }, { default: withCtx(() => [s.percent >= 100 ? (openBlock(), createElementBlock("span", Y4, U4)) : (openBlock(), createElementBlock("p", G4, [renderSlot(s.$slots, "format", { percent: s.percent }, () => [createTextVNode(toDisplayString(d.value), 1)], true)]))]), _: 3 })) : createCommentVNode("", true)], 4)) : (openBlock(), createElementBlock("div", { key: 1, class: "m-progress-circle", style: normalizeStyle(`width: ${e.value}; height: ${e.value};`) }, [(openBlock(), createElementBlock("svg", Z4, [createBaseVNode("path", { d: i.value, "stroke-linecap": "round", class: "u-progress-circle-trail", "stroke-width": s.strokeWidth, style: normalizeStyle(`stroke-dasharray: ${o.value}px, ${o.value}px;`), "fill-opacity": "0" }, null, 12, J4), createBaseVNode("path", { d: i.value, "stroke-linecap": "round", class: normalizeClass(["u-progress-circle-path", { success: s.percent >= 100 }]), "stroke-width": s.strokeWidth, stroke: n.value, style: normalizeStyle(`stroke-dasharray: ${s.percent / 100 * o.value}px, ${o.value}px;`), opacity: s.percent === 0 ? 0 : 1, "fill-opacity": "0" }, null, 14, X4)])), s.showInfo ? (openBlock(), createBlock(Transition, { key: 0, mode: "out-in" }, { default: withCtx(() => [s.percent >= 100 ? (openBlock(), createElementBlock("svg", Q4, eo2)) : (openBlock(), createElementBlock("p", ao2, [renderSlot(s.$slots, "format", { percent: s.percent }, () => [createTextVNode(toDisplayString(d.value), 1)], true)]))]), _: 3 })) : createCommentVNode("", true)], 4));
} }), [["__scopeId", "data-v-455b575d"]]);
$a2.install = (t) => {
  t.component($a2.__name, $a2);
};
var to2 = ["src"];
var Ba2 = W(defineComponent({ __name: "QRCode", props: { value: { default: "" }, size: { default: 160 }, color: { default: "#000" }, bgColor: { default: "#FFF" }, bordered: { type: Boolean, default: true }, borderColor: { default: "#0505050f" }, scale: { default: 8 }, errorLevel: { default: "H" } }, setup(t) {
  const a = t, e = computed(() => useQRCode(a.value, { errorCorrectionLevel: a.errorLevel, type: "image/png", quality: 1, margin: 3, scale: a.scale, color: { dark: a.color, light: a.bgColor } }));
  return (o, i) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-qrcode", { bordered: o.bordered }]), style: normalizeStyle(`width: ${o.size}px; height: ${o.size}px; border-color: ${o.borderColor};`) }, [createBaseVNode("img", { src: e.value.value, class: "u-qrcode", alt: "QRCode" }, null, 8, to2)], 6));
} }), [["__scopeId", "data-v-4830ed95"]]);
Ba2.install = (t) => {
  t.component(Ba2.__name, Ba2);
};
var lo2 = ["onClick"];
var oo2 = { class: "u-radio-label" };
var so2 = ["onClick"];
var no2 = { class: "u-radio-label" };
var io2 = defineComponent({ __name: "Radio", props: { options: { default: () => [] }, disabled: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, value: { default: null }, gap: { default: 8 }, button: { type: Boolean, default: false }, buttonStyle: { default: "outline" } }, emits: ["update:value", "change"], setup(t, { emit: a }) {
  const e = t, o = computed(() => e.options.length), i = computed(() => e.vertical ? { marginBottom: e.gap + "px" } : { marginRight: e.gap + "px" }), n = a;
  function d(s) {
    s !== e.value && (n("update:value", s), n("change", s));
  }
  return (s, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio", { "radio-button-solid": s.buttonStyle === "solid" }]) }, [s.button ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(s.options, (r, m) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio-button-wrap", { "radio-button-checked": s.value === r.value, "radio-button-disabled": s.disabled || r.disabled }]), key: m, onClick: (k) => s.disabled || r.disabled ? () => false : d(r.value) }, [createBaseVNode("span", no2, [renderSlot(s.$slots, "default", { label: r.label }, () => [createTextVNode(toDisplayString(r.label), 1)], true)])], 10, so2))), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(s.options, (r, m) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio-wrap", { vertical: s.vertical }]), style: normalizeStyle(o.value !== m + 1 ? i.value : ""), key: m }, [createBaseVNode("div", { class: normalizeClass(["m-radio-box", { "radio-disabled": s.disabled || r.disabled }]), onClick: (k) => s.disabled || r.disabled ? () => false : d(r.value) }, [createBaseVNode("span", { class: normalizeClass(["u-radio", { "radio-checked": s.value === r.value }]) }, null, 2), createBaseVNode("span", oo2, [renderSlot(s.$slots, "default", { label: r.label }, () => [createTextVNode(toDisplayString(r.label), 1)], true)])], 10, lo2)], 6))), 128))], 2));
} });
var Fa = W(io2, [["__scopeId", "data-v-c06cf285"]]);
Fa.install = (t) => {
  t.component(Fa.__name, Fa);
};
var Ie2 = (t) => (pushScopeId("data-v-24286c9e"), t = t(), popScopeId(), t);
var uo2 = ["onClick"];
var co2 = ["onClick", "onMouseenter"];
var ro2 = [Ie2(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1))];
var vo2 = [Ie2(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1))];
var po = [Ie2(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1))];
var fo2 = [Ie2(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1))];
var ho = ["onClick", "onMouseenter"];
var mo2 = [Ie2(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1))];
var go2 = [Ie2(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1))];
var yo = [Ie2(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1))];
var ko = [Ie2(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1))];
var La2 = W(defineComponent({ __name: "Rate", props: { allowClear: { type: Boolean, default: true }, allowHalf: { type: Boolean, default: false }, count: { default: 5 }, character: { default: "star-filled" }, size: { default: 20 }, color: { default: "#fadb14" }, gap: { default: 8 }, disabled: { type: Boolean, default: false }, value: { default: 0 } }, emits: ["update:value", "change", "hoverChange"], setup(t, { emit: a }) {
  const e = t, o = ref(e.value), i = ref();
  watch(() => e.value, (r) => {
    o.value = r;
  });
  const n = a;
  function d(r) {
    i.value = null, r !== e.value ? (n("change", r), n("update:value", r)) : e.allowClear ? (i.value = r, n("change", 0), n("update:value", 0)) : n("change", r);
  }
  function s() {
    i.value = null;
  }
  function p() {
    o.value = e.value;
  }
  return (r, m) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-rate", { disabled: r.disabled }]), style: normalizeStyle(`--color: ${r.color};`), onMouseleave: p }, [(openBlock(true), createElementBlock(Fragment, null, renderList(r.count, (k) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-star", { "u-star-half": r.allowHalf && o.value >= k - 0.5 && o.value < k, "u-star-full": o.value >= k, "temp-gray": !r.allowHalf && i.value === k }]), style: normalizeStyle(`margin-right: ${k !== r.count ? r.gap : 0}px;`), onClick: (M) => r.allowHalf ? void M.preventDefault() : d(k), key: k }, [r.allowHalf ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["u-star-first", { "temp-gray-first": i.value === k - 0.5 }]), onClick: withModifiers((M) => d(k - 0.5), ["stop"]), onMouseenter: (M) => {
    return w = k - 0.5, o.value = w, void n("hoverChange", w);
    var w;
  }, onMouseleave: s }, [r.character === "star-filled" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, ro2, 4)) : r.character === "star-outlined" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, vo2, 4)) : r.character === "heart-filled" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, po, 4)) : r.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, fo2, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-star", style: normalizeStyle(`font-size: ${0.66 * r.size}px; height: ${r.size}px;`) }, [renderSlot(r.$slots, "character", {}, () => [createTextVNode(toDisplayString(r.character), 1)], true)], 4))], 42, co2)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["u-star-second", { "temp-gray-second": i.value === k }]), onClick: withModifiers((M) => d(k), ["stop"]), onMouseenter: (M) => {
    return w = k, o.value = w, void n("hoverChange", w);
    var w;
  }, onMouseleave: s }, [r.character === "star-filled" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, mo2, 4)) : r.character === "star-outlined" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, go2, 4)) : r.character === "heart-filled" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, yo, 4)) : r.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, ko, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-star", style: normalizeStyle(`font-size: ${0.66 * r.size}px; height: ${r.size}px;`) }, [renderSlot(r.$slots, "character", {}, () => [createTextVNode(toDisplayString(r.character), 1)], true)], 4))], 42, ho)], 14, uo2))), 128))], 38));
} }), [["__scopeId", "data-v-24286c9e"]]);
La2.install = (t) => {
  t.component(La2.__name, La2);
};
var Ja = (t) => (pushScopeId("data-v-33e867c4"), t = t(), popScopeId(), t);
var wo = { class: "m-result" };
var bo = { class: "m-image" };
var xo = { key: 0, focusable: "false", class: "u-svg", style: "fill: #1677ff;", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Mo = [Ja(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var zo = { key: 1, focusable: "false", class: "u-svg", style: "fill: #52c41a;", "data-icon": "check-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var _o = [Ja(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var Co = { key: 2, focusable: "false", class: "u-svg", style: "fill: #faad14;", "data-icon": "warning", "aria-hidden": "true", viewBox: "64 64 896 896" };
var $o = [Ja(() => createBaseVNode("path", { d: "M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var Bo = { key: 3, focusable: "false", class: "u-svg", style: "fill: #ff4d4f;", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Fo = [Ja(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var Lo = { key: 4, class: "u-image", width: "251", height: "294" };
var So = [createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-33e867c4><path d="M0 129.023v-2.084C0 58.364 55.591 2.774 124.165 2.774h2.085c68.574 0 124.165 55.59 124.165 124.165v2.084c0 68.575-55.59 124.166-124.165 124.166h-2.085C55.591 253.189 0 197.598 0 129.023" fill="#E4EBF7" data-v-33e867c4></path><path d="M41.417 132.92a8.231 8.231 0 1 1-16.38-1.65 8.231 8.231 0 0 1 16.38 1.65" fill="#FFF" data-v-33e867c4></path><path d="M38.652 136.36l10.425 5.91M49.989 148.505l-12.58 10.73" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path d="M41.536 161.28a5.636 5.636 0 1 1-11.216-1.13 5.636 5.636 0 0 1 11.216 1.13M59.154 145.261a5.677 5.677 0 1 1-11.297-1.138 5.677 5.677 0 0 1 11.297 1.138M100.36 29.516l29.66-.013a4.562 4.562 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 0 0 .005 9.126M111.705 47.754l29.659-.013a4.563 4.563 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 1 0 .005 9.126" fill="#FFF" data-v-33e867c4></path><path d="M114.066 29.503V29.5l15.698-.007a4.563 4.563 0 1 0 .004 9.126l-15.698.007v-.002a4.562 4.562 0 0 0-.004-9.122M185.405 137.723c-.55 5.455-5.418 9.432-10.873 8.882-5.456-.55-9.432-5.418-8.882-10.873.55-5.455 5.418-9.432 10.873-8.882 5.455.55 9.432 5.418 8.882 10.873" fill="#FFF" data-v-33e867c4></path><path d="M180.17 143.772l12.572 7.129M193.841 158.42L178.67 171.36" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path d="M185.55 171.926a6.798 6.798 0 1 1-13.528-1.363 6.798 6.798 0 0 1 13.527 1.363M204.12 155.285a6.848 6.848 0 1 1-13.627-1.375 6.848 6.848 0 0 1 13.626 1.375" fill="#FFF" data-v-33e867c4></path><path d="M152.988 194.074a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0zM225.931 118.217a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM217.09 153.051a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.42 0zM177.84 109.842a2.21 2.21 0 1 1-4.422 0 2.21 2.21 0 0 1 4.421 0zM196.114 94.454a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM202.844 182.523a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0z" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path stroke="#FFF" stroke-width="2" d="M215.125 155.262l-1.902 20.075-10.87 5.958M174.601 176.636l-6.322 9.761H156.98l-4.484 6.449M175.874 127.28V111.56M221.51 119.404l-12.77 7.859-15.228-7.86V96.668" data-v-33e867c4></path><path d="M180.68 29.32C180.68 13.128 193.806 0 210 0c16.193 0 29.32 13.127 29.32 29.32 0 16.194-13.127 29.322-29.32 29.322-16.193 0-29.32-13.128-29.32-29.321" fill="#A26EF4" data-v-33e867c4></path><path d="M221.45 41.706l-21.563-.125a1.744 1.744 0 0 1-1.734-1.754l.071-12.23a1.744 1.744 0 0 1 1.754-1.734l21.562.125c.964.006 1.74.791 1.735 1.755l-.071 12.229a1.744 1.744 0 0 1-1.754 1.734" fill="#FFF" data-v-33e867c4></path><path d="M215.106 29.192c-.015 2.577-2.049 4.654-4.543 4.64-2.494-.014-4.504-2.115-4.489-4.693l.04-6.925c.016-2.577 2.05-4.654 4.543-4.64 2.494.015 4.504 2.116 4.49 4.693l-.04 6.925zm-4.53-14.074a6.877 6.877 0 0 0-6.916 6.837l-.043 7.368a6.877 6.877 0 0 0 13.754.08l.042-7.368a6.878 6.878 0 0 0-6.837-6.917zM167.566 68.367h-3.93a4.73 4.73 0 0 1-4.717-4.717 4.73 4.73 0 0 1 4.717-4.717h3.93a4.73 4.73 0 0 1 4.717 4.717 4.73 4.73 0 0 1-4.717 4.717" fill="#FFF" data-v-33e867c4></path><path d="M168.214 248.838a6.611 6.611 0 0 1-6.61-6.611v-66.108a6.611 6.611 0 0 1 13.221 0v66.108a6.611 6.611 0 0 1-6.61 6.61" fill="#5BA02E" data-v-33e867c4></path><path d="M176.147 248.176a6.611 6.611 0 0 1-6.61-6.61v-33.054a6.611 6.611 0 1 1 13.221 0v33.053a6.611 6.611 0 0 1-6.61 6.611" fill="#92C110" data-v-33e867c4></path><path d="M185.994 293.89h-27.376a3.17 3.17 0 0 1-3.17-3.17v-45.887a3.17 3.17 0 0 1 3.17-3.17h27.376a3.17 3.17 0 0 1 3.17 3.17v45.886a3.17 3.17 0 0 1-3.17 3.17" fill="#F2D7AD" data-v-33e867c4></path><path d="M81.972 147.673s6.377-.927 17.566-1.28c11.729-.371 17.57 1.086 17.57 1.086s3.697-3.855.968-8.424c1.278-12.077 5.982-32.827.335-48.273-1.116-1.339-3.743-1.512-7.536-.62-1.337.315-7.147-.149-7.983-.1l-15.311-.347s-3.487-.17-8.035-.508c-1.512-.113-4.227-1.683-5.458-.338-.406.443-2.425 5.669-1.97 16.077l8.635 35.642s-3.141 3.61 1.219 7.085" fill="#FFF" data-v-33e867c4></path><path d="M75.768 73.325l-.9-6.397 11.982-6.52s7.302-.118 8.038 1.205c.737 1.324-5.616.993-5.616.993s-1.836 1.388-2.615 2.5c-1.654 2.363-.986 6.471-8.318 5.986-1.708.284-2.57 2.233-2.57 2.233" fill="#FFC6A0" data-v-33e867c4></path><path d="M52.44 77.672s14.217 9.406 24.973 14.444c1.061.497-2.094 16.183-11.892 11.811-7.436-3.318-20.162-8.44-21.482-14.496-.71-3.258 2.543-7.643 8.401-11.76M141.862 80.113s-6.693 2.999-13.844 6.876c-3.894 2.11-10.137 4.704-12.33 7.988-6.224 9.314 3.536 11.22 12.947 7.503 6.71-2.651 28.999-12.127 13.227-22.367" fill="#FFB594" data-v-33e867c4></path><path d="M76.166 66.36l3.06 3.881s-2.783 2.67-6.31 5.747c-7.103 6.195-12.803 14.296-15.995 16.44-3.966 2.662-9.754 3.314-12.177-.118-3.553-5.032.464-14.628 31.422-25.95" fill="#FFC6A0" data-v-33e867c4></path><path d="M64.674 85.116s-2.34 8.413-8.912 14.447c.652.548 18.586 10.51 22.144 10.056 5.238-.669 6.417-18.968 1.145-20.531-.702-.208-5.901-1.286-8.853-2.167-.87-.26-1.611-1.71-3.545-.936l-1.98-.869zM128.362 85.826s5.318 1.956 7.325 13.734c-.546.274-17.55 12.35-21.829 7.805-6.534-6.94-.766-17.393 4.275-18.61 4.646-1.121 5.03-1.37 10.23-2.929" fill="#FFF" data-v-33e867c4></path><path d="M78.18 94.656s.911 7.41-4.914 13.078" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M87.397 94.68s3.124 2.572 10.263 2.572c7.14 0 9.074-3.437 9.074-3.437" stroke="#E4EBF7" stroke-width=".932" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M117.184 68.639l-6.781-6.177s-5.355-4.314-9.223-.893c-3.867 3.422 4.463 2.083 5.653 4.165 1.19 2.082.848 1.143-2.083.446-5.603-1.331-2.082.893 2.975 5.355 2.091 1.845 6.992.955 6.992.955l2.467-3.851z" fill="#FFC6A0" data-v-33e867c4></path><path d="M105.282 91.315l-.297-10.937-15.918-.027-.53 10.45c-.026.403.17.788.515.999 2.049 1.251 9.387 5.093 15.799.424.287-.21.443-.554.431-.91" fill="#FFB594" data-v-33e867c4></path><path d="M107.573 74.24c.817-1.147.982-9.118 1.015-11.928a1.046 1.046 0 0 0-.965-1.055l-4.62-.365c-7.71-1.044-17.071.624-18.253 6.346-5.482 5.813-.421 13.244-.421 13.244s1.963 3.566 4.305 6.791c.756 1.041.398-3.731 3.04-5.929 5.524-4.594 15.899-7.103 15.899-7.103" fill="#5C2552" data-v-33e867c4></path><path d="M88.426 83.206s2.685 6.202 11.602 6.522c7.82.28 8.973-7.008 7.434-17.505l-.909-5.483c-6.118-2.897-15.478.54-15.478.54s-.576 2.044-.19 5.504c-2.276 2.066-1.824 5.618-1.824 5.618s-.905-1.922-1.98-2.321c-.86-.32-1.897.089-2.322 1.98-1.04 4.632 3.667 5.145 3.667 5.145" fill="#FFC6A0" data-v-33e867c4></path><path stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" d="M100.843 77.099l1.701-.928-1.015-4.324.674-1.406" data-v-33e867c4></path><path d="M105.546 74.092c-.022.713-.452 1.279-.96 1.263-.51-.016-.904-.607-.882-1.32.021-.713.452-1.278.96-1.263.51.016.904.607.882 1.32M97.592 74.349c-.022.713-.452 1.278-.961 1.263-.509-.016-.904-.607-.882-1.32.022-.713.452-1.279.961-1.263.51.016.904.606.882 1.32" fill="#552950" data-v-33e867c4></path><path d="M91.132 86.786s5.269 4.957 12.679 2.327" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M99.776 81.903s-3.592.232-1.44-2.79c1.59-1.496 4.897-.46 4.897-.46s1.156 3.906-3.457 3.25" fill="#DB836E" data-v-33e867c4></path><path d="M102.88 70.6s2.483.84 3.402.715M93.883 71.975s2.492-1.144 4.778-1.073" stroke="#5C2552" stroke-width="1.526" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M86.32 77.374s.961.879 1.458 2.106c-.377.48-1.033 1.152-.236 1.809M99.337 83.719s1.911.151 2.509-.254" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M87.782 115.821l15.73-3.012M100.165 115.821l10.04-2.008" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M66.508 86.763s-1.598 8.83-6.697 14.078" stroke="#E4EBF7" stroke-width="1.114" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M128.31 87.934s3.013 4.121 4.06 11.785" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M64.09 84.816s-6.03 9.912-13.607 9.903" stroke="#DB836E" stroke-width=".795" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M112.366 65.909l-.142 5.32s5.993 4.472 11.945 9.202c4.482 3.562 8.888 7.455 10.985 8.662 4.804 2.766 8.9 3.355 11.076 1.808 4.071-2.894 4.373-9.878-8.136-15.263-4.271-1.838-16.144-6.36-25.728-9.73" fill="#FFC6A0" data-v-33e867c4></path><path d="M130.532 85.488s4.588 5.757 11.619 6.214" stroke="#DB836E" stroke-width=".75" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M121.708 105.73s-.393 8.564-1.34 13.612" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M115.784 161.512s-3.57-1.488-2.678-7.14" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M101.52 290.246s4.326 2.057 7.408 1.03c2.842-.948 4.564.673 7.132 1.186 2.57.514 6.925 1.108 11.772-1.269-.104-5.551-6.939-4.01-12.048-6.763-2.582-1.39-3.812-4.757-3.625-8.863h-9.471s-1.402 10.596-1.169 14.68" fill="#CBD1D1" data-v-33e867c4></path><path d="M101.496 290.073s2.447 1.281 6.809.658c3.081-.44 3.74.485 7.479 1.039 3.739.554 10.802-.07 11.91-.9.415 1.108-.347 2.077-.347 2.077s-1.523.608-4.847.831c-2.045.137-5.843.293-7.663-.507-1.8-1.385-5.286-1.917-5.77-.243-3.947.958-7.41-.288-7.41-.288l-.16-2.667z" fill="#2B0849" data-v-33e867c4></path><path d="M108.824 276.19h3.116s-.103 6.751 4.57 8.62c-4.673.624-8.62-2.32-7.686-8.62" fill="#A4AABA" data-v-33e867c4></path><path d="M57.65 272.52s-2.122 7.47-4.518 12.396c-1.811 3.724-4.255 7.548 5.505 7.548 6.698 0 9.02-.483 7.479-6.648-1.541-6.164.268-13.296.268-13.296H57.65z" fill="#CBD1D1" data-v-33e867c4></path><path d="M51.54 290.04s2.111 1.178 6.682 1.178c6.128 0 8.31-1.662 8.31-1.662s.605 1.122-.624 2.18c-1 .862-3.624 1.603-7.444 1.559-4.177-.049-5.876-.57-6.786-1.177-.831-.554-.692-1.593-.138-2.078" fill="#2B0849" data-v-33e867c4></path><path d="M58.533 274.438s.034 1.529-.315 2.95c-.352 1.431-1.087 3.127-1.139 4.17-.058 1.16 4.57 1.592 5.194.035.623-1.559 1.303-6.475 1.927-7.306.622-.831-4.94-2.135-5.667.15" fill="#A4AABA" data-v-33e867c4></path><path d="M100.885 277.015l13.306.092s1.291-54.228 1.843-64.056c.552-9.828 3.756-43.13.997-62.788l-12.48-.64-22.725.776s-.433 3.944-1.19 9.921c-.062.493-.677.838-.744 1.358-.075.582.42 1.347.318 1.956-2.35 14.003-6.343 32.926-8.697 46.425-.116.663-1.227 1.004-1.45 2.677-.04.3.21 1.516.112 1.785-6.836 18.643-10.89 47.584-14.2 61.551l14.528-.014s2.185-8.524 4.008-16.878c2.796-12.817 22.987-84.553 22.987-84.553l3-.517 1.037 46.1s-.223 1.228.334 2.008c.558.782-.556 1.117-.39 2.233l.39 1.784s-.446 7.14-.892 11.826c-.446 4.685-.092 38.954-.092 38.954" fill="#7BB2F9" data-v-33e867c4></path><path d="M77.438 220.434c1.146.094 4.016-2.008 6.916-4.91M107.55 223.931s2.758-1.103 6.069-3.862" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M108.459 220.905s2.759-1.104 6.07-3.863" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M76.099 223.557s2.608-.587 6.47-3.346M87.33 150.82c-.27 3.088.297 8.478-4.315 9.073M104.829 149.075s.11 13.936-1.286 14.983c-2.207 1.655-2.975 1.934-2.975 1.934M101.014 149.63s.035 12.81-1.19 24.245M94.93 174.965s7.174-1.655 9.38-1.655M75.671 204.754c-.316 1.55-.64 3.067-.973 4.535 0 0-1.45 1.822-1.003 3.756.446 1.934-.943 2.034-4.96 15.273-1.686 5.559-4.464 18.49-6.313 27.447-.078.38-4.018 18.06-4.093 18.423M77.043 196.743a313.269 313.269 0 0 1-.877 4.729M83.908 151.414l-1.19 10.413s-1.091.148-.496 2.23c.111 1.34-2.66 15.692-5.153 30.267M57.58 272.94h13.238" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M117.377 147.423s-16.955-3.087-35.7.199c.157 2.501-.002 4.128-.002 4.128s14.607-2.802 35.476-.31c.251-2.342.226-4.017.226-4.017" fill="#192064" data-v-33e867c4></path><path d="M107.511 150.353l.004-4.885a.807.807 0 0 0-.774-.81c-2.428-.092-5.04-.108-7.795-.014a.814.814 0 0 0-.784.81l-.003 4.88c0 .456.371.82.827.808a140.76 140.76 0 0 1 7.688.017.81.81 0 0 0 .837-.806" fill="#FFF" data-v-33e867c4></path><path d="M106.402 149.426l.002-3.06a.64.64 0 0 0-.616-.643 94.135 94.135 0 0 0-5.834-.009.647.647 0 0 0-.626.643l-.001 3.056c0 .36.291.648.651.64 1.78-.04 3.708-.041 5.762.012.36.009.662-.279.662-.64" fill="#192064" data-v-33e867c4></path><path d="M101.485 273.933h12.272M102.652 269.075c.006 3.368.04 5.759.11 6.47M102.667 263.125c-.009 1.53-.015 2.98-.016 4.313M102.204 174.024l.893 44.402s.669 1.561-.224 2.677c-.892 1.116 2.455.67.893 2.231-1.562 1.562.893 1.116 0 3.347-.592 1.48-.988 20.987-1.09 34.956" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path></g>', 1)];
var Ao = { key: 5, class: "u-image", width: "252", height: "294" };
var Eo = [createStaticVNode('<defs data-v-33e867c4><path d="M0 .387h251.772v251.772H0z" data-v-33e867c4></path></defs><g fill="none" fill-rule="evenodd" data-v-33e867c4><g transform="translate(0 .012)" data-v-33e867c4><mask fill="#fff" data-v-33e867c4></mask><path d="M0 127.32v-2.095C0 56.279 55.892.387 124.838.387h2.096c68.946 0 124.838 55.892 124.838 124.838v2.096c0 68.946-55.892 124.838-124.838 124.838h-2.096C55.892 252.16 0 196.267 0 127.321" fill="#E4EBF7" mask="url(#b)" data-v-33e867c4></path></g><path d="M39.755 130.84a8.276 8.276 0 1 1-16.468-1.66 8.276 8.276 0 0 1 16.468 1.66" fill="#FFF" data-v-33e867c4></path><path d="M36.975 134.297l10.482 5.943M48.373 146.508l-12.648 10.788" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path d="M39.875 159.352a5.667 5.667 0 1 1-11.277-1.136 5.667 5.667 0 0 1 11.277 1.136M57.588 143.247a5.708 5.708 0 1 1-11.358-1.145 5.708 5.708 0 0 1 11.358 1.145M99.018 26.875l29.82-.014a4.587 4.587 0 1 0-.003-9.175l-29.82.013a4.587 4.587 0 1 0 .003 9.176M110.424 45.211l29.82-.013a4.588 4.588 0 0 0-.004-9.175l-29.82.013a4.587 4.587 0 1 0 .004 9.175" fill="#FFF" data-v-33e867c4></path><path d="M112.798 26.861v-.002l15.784-.006a4.588 4.588 0 1 0 .003 9.175l-15.783.007v-.002a4.586 4.586 0 0 0-.004-9.172M184.523 135.668c-.553 5.485-5.447 9.483-10.931 8.93-5.485-.553-9.483-5.448-8.93-10.932.552-5.485 5.447-9.483 10.932-8.93 5.485.553 9.483 5.447 8.93 10.932" fill="#FFF" data-v-33e867c4></path><path d="M179.26 141.75l12.64 7.167M193.006 156.477l-15.255 13.011" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path d="M184.668 170.057a6.835 6.835 0 1 1-13.6-1.372 6.835 6.835 0 0 1 13.6 1.372M203.34 153.325a6.885 6.885 0 1 1-13.7-1.382 6.885 6.885 0 0 1 13.7 1.382" fill="#FFF" data-v-33e867c4></path><path d="M151.931 192.324a2.222 2.222 0 1 1-4.444 0 2.222 2.222 0 0 1 4.444 0zM225.27 116.056a2.222 2.222 0 1 1-4.445 0 2.222 2.222 0 0 1 4.444 0zM216.38 151.08a2.223 2.223 0 1 1-4.446-.001 2.223 2.223 0 0 1 4.446 0zM176.917 107.636a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM195.291 92.165a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM202.058 180.711a2.223 2.223 0 1 1-4.446 0 2.223 2.223 0 0 1 4.446 0z" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path stroke="#FFF" stroke-width="2" d="M214.404 153.302l-1.912 20.184-10.928 5.99M173.661 174.792l-6.356 9.814h-11.36l-4.508 6.484M174.941 125.168v-15.804M220.824 117.25l-12.84 7.901-15.31-7.902V94.39" data-v-33e867c4></path><path d="M166.588 65.936h-3.951a4.756 4.756 0 0 1-4.743-4.742 4.756 4.756 0 0 1 4.743-4.743h3.951a4.756 4.756 0 0 1 4.743 4.743 4.756 4.756 0 0 1-4.743 4.742" fill="#FFF" data-v-33e867c4></path><path d="M174.823 30.03c0-16.281 13.198-29.48 29.48-29.48 16.28 0 29.48 13.199 29.48 29.48 0 16.28-13.2 29.48-29.48 29.48-16.282 0-29.48-13.2-29.48-29.48" fill="#1890FF" data-v-33e867c4></path><path d="M205.952 38.387c.5.5.785 1.142.785 1.928s-.286 1.465-.785 1.964c-.572.5-1.214.75-2 .75-.785 0-1.429-.285-1.929-.785-.572-.5-.82-1.143-.82-1.929s.248-1.428.82-1.928c.5-.5 1.144-.75 1.93-.75.785 0 1.462.25 1.999.75m4.285-19.463c1.428 1.249 2.143 2.963 2.143 5.142 0 1.712-.427 3.13-1.219 4.25-.067.096-.137.18-.218.265-.416.429-1.41 1.346-2.956 2.699a5.07 5.07 0 0 0-1.428 1.75 5.207 5.207 0 0 0-.536 2.357v.5h-4.107v-.5c0-1.357.215-2.536.714-3.5.464-.964 1.857-2.464 4.178-4.536l.43-.5c.643-.785.964-1.643.964-2.535 0-1.18-.358-2.108-1-2.785-.678-.68-1.643-1.001-2.858-1.001-1.536 0-2.642.464-3.357 1.43-.37.5-.621 1.135-.76 1.904a1.999 1.999 0 0 1-1.971 1.63h-.004c-1.277 0-2.257-1.183-1.98-2.43.337-1.518 1.02-2.78 2.073-3.784 1.536-1.5 3.607-2.25 6.25-2.25 2.32 0 4.214.607 5.642 1.894" fill="#FFF" data-v-33e867c4></path><path d="M52.04 76.131s21.81 5.36 27.307 15.945c5.575 10.74-6.352 9.26-15.73 4.935-10.86-5.008-24.7-11.822-11.577-20.88" fill="#FFB594" data-v-33e867c4></path><path d="M90.483 67.504l-.449 2.893c-.753.49-4.748-2.663-4.748-2.663l-1.645.748-1.346-5.684s6.815-4.589 8.917-5.018c2.452-.501 9.884.94 10.7 2.278 0 0 1.32.486-2.227.69-3.548.203-5.043.447-6.79 3.132-1.747 2.686-2.412 3.624-2.412 3.624" fill="#FFC6A0" data-v-33e867c4></path><path d="M128.055 111.367c-2.627-7.724-6.15-13.18-8.917-15.478-3.5-2.906-9.34-2.225-11.366-4.187-1.27-1.231-3.215-1.197-3.215-1.197s-14.98-3.158-16.828-3.479c-2.37-.41-2.124-.714-6.054-1.405-1.57-1.907-2.917-1.122-2.917-1.122l-7.11-1.383c-.853-1.472-2.423-1.023-2.423-1.023l-2.468-.897c-1.645 9.976-7.74 13.796-7.74 13.796 1.795 1.122 15.703 8.3 15.703 8.3l5.107 37.11s-3.321 5.694 1.346 9.109c0 0 19.883-3.743 34.921-.329 0 0 3.047-2.546.972-8.806.523-3.01 1.394-8.263 1.736-11.622.385.772 2.019 1.918 3.14 3.477 0 0 9.407-7.365 11.052-14.012-.832-.723-1.598-1.585-2.267-2.453-.567-.736-.358-2.056-.765-2.717-.669-1.084-1.804-1.378-1.907-1.682" fill="#FFF" data-v-33e867c4></path><path d="M101.09 289.998s4.295 2.041 7.354 1.021c2.821-.94 4.53.668 7.08 1.178 2.55.51 6.874 1.1 11.686-1.26-.103-5.51-6.889-3.98-11.96-6.713-2.563-1.38-3.784-4.722-3.598-8.799h-9.402s-1.392 10.52-1.16 14.573" fill="#CBD1D1" data-v-33e867c4></path><path d="M101.067 289.826s2.428 1.271 6.759.653c3.058-.437 3.712.481 7.423 1.031 3.712.55 10.724-.069 11.823-.894.413 1.1-.343 2.063-.343 2.063s-1.512.603-4.812.824c-2.03.136-5.8.291-7.607-.503-1.787-1.375-5.247-1.903-5.728-.241-3.918.95-7.355-.286-7.355-.286l-.16-2.647z" fill="#2B0849" data-v-33e867c4></path><path d="M108.341 276.044h3.094s-.103 6.702 4.536 8.558c-4.64.618-8.558-2.303-7.63-8.558" fill="#A4AABA" data-v-33e867c4></path><path d="M57.542 272.401s-2.107 7.416-4.485 12.306c-1.798 3.695-4.225 7.492 5.465 7.492 6.648 0 8.953-.48 7.423-6.599-1.53-6.12.266-13.199.266-13.199h-8.669z" fill="#CBD1D1" data-v-33e867c4></path><path d="M51.476 289.793s2.097 1.169 6.633 1.169c6.083 0 8.249-1.65 8.249-1.65s.602 1.114-.619 2.165c-.993.855-3.597 1.591-7.39 1.546-4.145-.048-5.832-.566-6.736-1.168-.825-.55-.687-1.58-.137-2.062" fill="#2B0849" data-v-33e867c4></path><path d="M58.419 274.304s.033 1.519-.314 2.93c-.349 1.42-1.078 3.104-1.13 4.139-.058 1.151 4.537 1.58 5.155.034.62-1.547 1.294-6.427 1.913-7.252.619-.825-4.903-2.119-5.624.15" fill="#A4AABA" data-v-33e867c4></path><path d="M99.66 278.514l13.378.092s1.298-54.52 1.853-64.403c.554-9.882 3.776-43.364 1.002-63.128l-12.547-.644-22.849.78s-.434 3.966-1.195 9.976c-.063.496-.682.843-.749 1.365-.075.585.423 1.354.32 1.966-2.364 14.08-6.377 33.104-8.744 46.677-.116.666-1.234 1.009-1.458 2.691-.04.302.211 1.525.112 1.795-6.873 18.744-10.949 47.842-14.277 61.885l14.607-.014s2.197-8.57 4.03-16.97c2.811-12.886 23.111-85.01 23.111-85.01l3.016-.521 1.043 46.35s-.224 1.234.337 2.02c.56.785-.56 1.123-.392 2.244l.392 1.794s-.449 7.178-.898 11.89c-.448 4.71-.092 39.165-.092 39.165" fill="#7BB2F9" data-v-33e867c4></path><path d="M76.085 221.626c1.153.094 4.038-2.019 6.955-4.935M106.36 225.142s2.774-1.11 6.103-3.883" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M107.275 222.1s2.773-1.11 6.102-3.884" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M74.74 224.767s2.622-.591 6.505-3.365M86.03 151.634c-.27 3.106.3 8.525-4.336 9.123M103.625 149.88s.11 14.012-1.293 15.065c-2.219 1.664-2.99 1.944-2.99 1.944M99.79 150.438s.035 12.88-1.196 24.377M93.673 175.911s7.212-1.664 9.431-1.664M74.31 205.861a212.013 212.013 0 0 1-.979 4.56s-1.458 1.832-1.009 3.776c.449 1.944-.947 2.045-4.985 15.355-1.696 5.59-4.49 18.591-6.348 27.597l-.231 1.12M75.689 197.807a320.934 320.934 0 0 1-.882 4.754M82.591 152.233L81.395 162.7s-1.097.15-.5 2.244c.113 1.346-2.674 15.775-5.18 30.43M56.12 274.418h13.31" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M116.241 148.22s-17.047-3.104-35.893.2c.158 2.514-.003 4.15-.003 4.15s14.687-2.818 35.67-.312c.252-2.355.226-4.038.226-4.038" fill="#192064" data-v-33e867c4></path><path d="M106.322 151.165l.003-4.911a.81.81 0 0 0-.778-.815c-2.44-.091-5.066-.108-7.836-.014a.818.818 0 0 0-.789.815l-.003 4.906a.81.81 0 0 0 .831.813c2.385-.06 4.973-.064 7.73.017a.815.815 0 0 0 .842-.81" fill="#FFF" data-v-33e867c4></path><path d="M105.207 150.233l.002-3.076a.642.642 0 0 0-.619-.646 94.321 94.321 0 0 0-5.866-.01.65.65 0 0 0-.63.647v3.072a.64.64 0 0 0 .654.644 121.12 121.12 0 0 1 5.794.011c.362.01.665-.28.665-.642" fill="#192064" data-v-33e867c4></path><path d="M100.263 275.415h12.338M101.436 270.53c.006 3.387.042 5.79.111 6.506M101.451 264.548a915.75 915.75 0 0 0-.015 4.337M100.986 174.965l.898 44.642s.673 1.57-.225 2.692c-.897 1.122 2.468.673.898 2.243-1.57 1.57.897 1.122 0 3.365-.596 1.489-.994 21.1-1.096 35.146" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M46.876 83.427s-.516 6.045 7.223 5.552c11.2-.712 9.218-9.345 31.54-21.655-.786-2.708-2.447-4.744-2.447-4.744s-11.068 3.11-22.584 8.046c-6.766 2.9-13.395 6.352-13.732 12.801M104.46 91.057l.941-5.372-8.884-11.43-5.037 5.372-1.74 7.834a.321.321 0 0 0 .108.32c.965.8 6.5 5.013 14.347 3.544a.332.332 0 0 0 .264-.268" fill="#FFC6A0" data-v-33e867c4></path><path d="M93.942 79.387s-4.533-2.853-2.432-6.855c1.623-3.09 4.513 1.133 4.513 1.133s.52-3.642 3.121-3.642c.52-1.04 1.561-4.162 1.561-4.162s11.445 2.601 13.526 3.121c0 5.203-2.304 19.424-7.84 19.861-8.892.703-12.449-9.456-12.449-9.456" fill="#FFC6A0" data-v-33e867c4></path><path d="M113.874 73.446c2.601-2.081 3.47-9.722 3.47-9.722s-2.479-.49-6.64-2.05c-4.683-2.081-12.798-4.747-17.48.976-9.668 3.223-2.05 19.823-2.05 19.823l2.713-3.021s-3.935-3.287-2.08-6.243c2.17-3.462 3.92 1.073 3.92 1.073s.637-2.387 3.581-3.342c.355-.71 1.036-2.674 1.432-3.85a1.073 1.073 0 0 1 1.263-.704c2.4.558 8.677 2.019 11.356 2.662.522.125.871.615.82 1.15l-.305 3.248z" fill="#520038" data-v-33e867c4></path><path d="M104.977 76.064c-.103.61-.582 1.038-1.07.956-.489-.083-.801-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.644.698 1.254M112.132 77.694c-.103.61-.582 1.038-1.07.956-.488-.083-.8-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.643.698 1.254" fill="#552950" data-v-33e867c4></path><path stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" d="M110.13 74.84l-.896 1.61-.298 4.357h-2.228" data-v-33e867c4></path><path d="M110.846 74.481s1.79-.716 2.506.537" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M92.386 74.282s.477-1.114 1.113-.716c.637.398 1.274 1.433.558 1.99-.717.556.159 1.67.159 1.67" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M103.287 72.93s1.83 1.113 4.137.954" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M103.685 81.762s2.227 1.193 4.376 1.193M104.64 84.308s.954.398 1.511.318M94.693 81.205s2.308 7.4 10.424 7.639" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M81.45 89.384s.45 5.647-4.935 12.787M69 82.654s-.726 9.282-8.204 14.206" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M129.405 122.865s-5.272 7.403-9.422 10.768" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M119.306 107.329s.452 4.366-2.127 32.062" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M150.028 151.232h-49.837a1.01 1.01 0 0 1-1.01-1.01v-31.688c0-.557.452-1.01 1.01-1.01h49.837c.558 0 1.01.453 1.01 1.01v31.688a1.01 1.01 0 0 1-1.01 1.01" fill="#F2D7AD" data-v-33e867c4></path><path d="M150.29 151.232h-19.863v-33.707h20.784v32.786a.92.92 0 0 1-.92.92" fill="#F4D19D" data-v-33e867c4></path><path d="M123.554 127.896H92.917a.518.518 0 0 1-.425-.816l6.38-9.113c.193-.277.51-.442.85-.442h31.092l-7.26 10.371z" fill="#F2D7AD" data-v-33e867c4></path><path fill="#CC9B6E" d="M123.689 128.447H99.25v-.519h24.169l7.183-10.26.424.298z" data-v-33e867c4></path><path d="M158.298 127.896h-18.669a2.073 2.073 0 0 1-1.659-.83l-7.156-9.541h19.965c.49 0 .95.23 1.244.622l6.69 8.92a.519.519 0 0 1-.415.83" fill="#F4D19D" data-v-33e867c4></path><path fill="#CC9B6E" d="M157.847 128.479h-19.384l-7.857-10.475.415-.31 7.7 10.266h19.126zM130.554 150.685l-.032-8.177.519-.002.032 8.177z" data-v-33e867c4></path><path fill="#CC9B6E" d="M130.511 139.783l-.08-21.414.519-.002.08 21.414zM111.876 140.932l-.498-.143 1.479-5.167.498.143zM108.437 141.06l-2.679-2.935 2.665-3.434.41.318-2.397 3.089 2.384 2.612zM116.607 141.06l-.383-.35 2.383-2.612-2.397-3.089.41-.318 2.665 3.434z" data-v-33e867c4></path><path d="M154.316 131.892l-3.114-1.96.038 3.514-1.043.092c-1.682.115-3.634.23-4.789.23-1.902 0-2.693 2.258 2.23 2.648l-2.645-.596s-2.168 1.317.504 2.3c0 0-1.58 1.217.561 2.58-.584 3.504 5.247 4.058 7.122 3.59 1.876-.47 4.233-2.359 4.487-5.16.28-3.085-.89-5.432-3.35-7.238" fill="#FFC6A0" data-v-33e867c4></path><path d="M153.686 133.577s-6.522.47-8.36.372c-1.836-.098-1.904 2.19 2.359 2.264 3.739.15 5.451-.044 5.451-.044" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M145.16 135.877c-1.85 1.346.561 2.355.561 2.355s3.478.898 6.73.617" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M151.89 141.71s-6.28.111-6.73-2.132c-.223-1.346.45-1.402.45-1.402M146.114 140.868s-1.103 3.16 5.44 3.533M151.202 129.932v3.477M52.838 89.286c3.533-.337 8.423-1.248 13.582-7.754" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M168.567 248.318a6.647 6.647 0 0 1-6.647-6.647v-66.466a6.647 6.647 0 1 1 13.294 0v66.466a6.647 6.647 0 0 1-6.647 6.647" fill="#5BA02E" data-v-33e867c4></path><path d="M176.543 247.653a6.647 6.647 0 0 1-6.646-6.647v-33.232a6.647 6.647 0 1 1 13.293 0v33.232a6.647 6.647 0 0 1-6.647 6.647" fill="#92C110" data-v-33e867c4></path><path d="M186.443 293.613H158.92a3.187 3.187 0 0 1-3.187-3.187v-46.134a3.187 3.187 0 0 1 3.187-3.187h27.524a3.187 3.187 0 0 1 3.187 3.187v46.134a3.187 3.187 0 0 1-3.187 3.187" fill="#F2D7AD" data-v-33e867c4></path><path d="M88.979 89.48s7.776 5.384 16.6 2.842" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path></g>', 2)];
var Do = { key: 6, class: "u-image", width: "254", height: "294" };
var Ho = [createStaticVNode('<defs data-v-33e867c4><path d="M0 .335h253.49v253.49H0z" data-v-33e867c4></path><path d="M0 293.665h253.49V.401H0z" data-v-33e867c4></path></defs><g fill="none" fill-rule="evenodd" data-v-33e867c4><g transform="translate(0 .067)" data-v-33e867c4><mask fill="#fff" data-v-33e867c4></mask><path d="M0 128.134v-2.11C0 56.608 56.273.334 125.69.334h2.11c69.416 0 125.69 56.274 125.69 125.69v2.11c0 69.417-56.274 125.69-125.69 125.69h-2.11C56.273 253.824 0 197.551 0 128.134" fill="#E4EBF7" mask="url(#b)" data-v-33e867c4></path></g><path d="M39.989 132.108a8.332 8.332 0 1 1-16.581-1.671 8.332 8.332 0 0 1 16.58 1.671" fill="#FFF" data-v-33e867c4></path><path d="M37.19 135.59l10.553 5.983M48.665 147.884l-12.734 10.861" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path d="M40.11 160.816a5.706 5.706 0 1 1-11.354-1.145 5.706 5.706 0 0 1 11.354 1.145M57.943 144.6a5.747 5.747 0 1 1-11.436-1.152 5.747 5.747 0 0 1 11.436 1.153M99.656 27.434l30.024-.013a4.619 4.619 0 1 0-.004-9.238l-30.024.013a4.62 4.62 0 0 0 .004 9.238M111.14 45.896l30.023-.013a4.62 4.62 0 1 0-.004-9.238l-30.024.013a4.619 4.619 0 1 0 .004 9.238" fill="#FFF" data-v-33e867c4></path><path d="M113.53 27.421v-.002l15.89-.007a4.619 4.619 0 1 0 .005 9.238l-15.892.007v-.002a4.618 4.618 0 0 0-.004-9.234M150.167 70.091h-3.979a4.789 4.789 0 0 1-4.774-4.775 4.788 4.788 0 0 1 4.774-4.774h3.979a4.789 4.789 0 0 1 4.775 4.774 4.789 4.789 0 0 1-4.775 4.775" fill="#FFF" data-v-33e867c4></path><path d="M171.687 30.234c0-16.392 13.289-29.68 29.681-29.68 16.392 0 29.68 13.288 29.68 29.68 0 16.393-13.288 29.681-29.68 29.681s-29.68-13.288-29.68-29.68" fill="#FF603B" data-v-33e867c4></path><path d="M203.557 19.435l-.676 15.035a1.514 1.514 0 0 1-3.026 0l-.675-15.035a2.19 2.19 0 1 1 4.377 0m-.264 19.378c.513.477.77 1.1.77 1.87s-.257 1.393-.77 1.907c-.55.476-1.21.733-1.943.733a2.545 2.545 0 0 1-1.87-.77c-.55-.514-.806-1.136-.806-1.87 0-.77.256-1.393.806-1.87.513-.513 1.137-.733 1.87-.733.77 0 1.43.22 1.943.733" fill="#FFF" data-v-33e867c4></path><path d="M119.3 133.275c4.426-.598 3.612-1.204 4.079-4.778.675-5.18-3.108-16.935-8.262-25.118-1.088-10.72-12.598-11.24-12.598-11.24s4.312 4.895 4.196 16.199c1.398 5.243.804 14.45.804 14.45s5.255 11.369 11.78 10.487" fill="#FFB594" data-v-33e867c4></path><path d="M100.944 91.61s1.463-.583 3.211.582c8.08 1.398 10.368 6.706 11.3 11.368 1.864 1.282 1.864 2.33 1.864 3.496.365.777 1.515 3.03 1.515 3.03s-7.225 1.748-10.954 6.758c-1.399-6.41-6.936-25.235-6.936-25.235" fill="#FFF" data-v-33e867c4></path><path d="M94.008 90.5l1.019-5.815-9.23-11.874-5.233 5.581-2.593 9.863s8.39 5.128 16.037 2.246" fill="#FFB594" data-v-33e867c4></path><path d="M82.931 78.216s-4.557-2.868-2.445-6.892c1.632-3.107 4.537 1.139 4.537 1.139s.524-3.662 3.139-3.662c.523-1.046 1.569-4.184 1.569-4.184s11.507 2.615 13.6 3.138c-.001 5.23-2.317 19.529-7.884 19.969-8.94.706-12.516-9.508-12.516-9.508" fill="#FFC6A0" data-v-33e867c4></path><path d="M102.971 72.243c2.616-2.093 3.489-9.775 3.489-9.775s-2.492-.492-6.676-2.062c-4.708-2.092-12.867-4.771-17.575.982-9.54 4.41-2.062 19.93-2.062 19.93l2.729-3.037s-3.956-3.304-2.092-6.277c2.183-3.48 3.943 1.08 3.943 1.08s.64-2.4 3.6-3.36c.356-.714 1.04-2.69 1.44-3.872a1.08 1.08 0 0 1 1.27-.707c2.41.56 8.723 2.03 11.417 2.676.524.126.876.619.825 1.156l-.308 3.266z" fill="#520038" data-v-33e867c4></path><path d="M101.22 76.514c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.961.491.083.805.647.702 1.26M94.26 75.074c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.96.491.082.805.646.702 1.26" fill="#552950" data-v-33e867c4></path><path stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" d="M99.206 73.644l-.9 1.62-.3 4.38h-2.24" data-v-33e867c4></path><path d="M99.926 73.284s1.8-.72 2.52.54" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M81.367 73.084s.48-1.12 1.12-.72c.64.4 1.28 1.44.56 2s.16 1.68.16 1.68" stroke="#DB836E" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M92.326 71.724s1.84 1.12 4.16.96" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M92.726 80.604s2.24 1.2 4.4 1.2M93.686 83.164s.96.4 1.52.32M83.687 80.044s1.786 6.547 9.262 7.954" stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M95.548 91.663s-1.068 2.821-8.298 2.105c-7.23-.717-10.29-5.044-10.29-5.044" stroke="#E4EBF7" stroke-width="1.136" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M78.126 87.478s6.526 4.972 16.47 2.486c0 0 9.577 1.02 11.536 5.322 5.36 11.77.543 36.835 0 39.962 3.496 4.055-.466 8.483-.466 8.483-15.624-3.548-35.81-.6-35.81-.6-4.849-3.546-1.223-9.044-1.223-9.044L62.38 110.32c-2.485-15.227.833-19.803 3.549-20.743 3.03-1.049 8.04-1.282 8.04-1.282.496-.058 1.08-.076 1.37-.233 2.36-1.282 2.787-.583 2.787-.583" fill="#FFF" data-v-33e867c4></path><path d="M65.828 89.81s-6.875.465-7.59 8.156c-.466 8.857 3.03 10.954 3.03 10.954s6.075 22.102 16.796 22.957c8.39-2.176 4.758-6.702 4.661-11.42-.233-11.304-7.108-16.897-7.108-16.897s-4.212-13.75-9.789-13.75" fill="#FFC6A0" data-v-33e867c4></path><path d="M71.716 124.225s.855 11.264 9.828 6.486c4.765-2.536 7.581-13.828 9.789-22.568 1.456-5.768 2.58-12.197 2.58-12.197l-4.973-1.709s-2.408 5.516-7.769 12.275c-4.335 5.467-9.144 11.11-9.455 17.713" fill="#FFC6A0" data-v-33e867c4></path><path d="M108.463 105.191s1.747 2.724-2.331 30.535c2.376 2.216 1.053 6.012-.233 7.51" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M123.262 131.527s-.427 2.732-11.77 1.981c-15.187-1.006-25.326-3.25-25.326-3.25l.933-5.8s.723.215 9.71-.068c11.887-.373 18.714-6.07 24.964-1.022 4.039 3.263 1.489 8.16 1.489 8.16" fill="#FFC6A0" data-v-33e867c4></path><path d="M70.24 90.974s-5.593-4.739-11.054 2.68c-3.318 7.223.517 15.284 2.664 19.578-.31 3.729 2.33 4.311 2.33 4.311s.108.895 1.516 2.68c4.078-7.03 6.72-9.166 13.711-12.546-.328-.656-1.877-3.265-1.825-3.767.175-1.69-1.282-2.623-1.282-2.623s-.286-.156-1.165-2.738c-.788-2.313-2.036-5.177-4.895-7.575" fill="#FFF" data-v-33e867c4></path><path d="M90.232 288.027s4.855 2.308 8.313 1.155c3.188-1.063 5.12.755 8.002 1.331 2.881.577 7.769 1.243 13.207-1.424-.117-6.228-7.786-4.499-13.518-7.588-2.895-1.56-4.276-5.336-4.066-9.944H91.544s-1.573 11.89-1.312 16.47" fill="#CBD1D1" data-v-33e867c4></path><path d="M90.207 287.833s2.745 1.437 7.639.738c3.456-.494 3.223.66 7.418 1.282 4.195.621 13.092-.194 14.334-1.126.466 1.242-.388 2.33-.388 2.33s-1.709.682-5.438.932c-2.295.154-8.098.276-10.14-.621-2.02-1.554-4.894-1.515-6.06-.234-4.427 1.075-7.184-.31-7.184-.31l-.181-2.991z" fill="#2B0849" data-v-33e867c4></path><path d="M98.429 272.257h3.496s-.117 7.574 5.127 9.671c-5.244.7-9.672-2.602-8.623-9.671" fill="#A4AABA" data-v-33e867c4></path><path d="M44.425 272.046s-2.208 7.774-4.702 12.899c-1.884 3.874-4.428 7.854 5.729 7.854 6.97 0 9.385-.503 7.782-6.917-1.604-6.415.279-13.836.279-13.836h-9.088z" fill="#CBD1D1" data-v-33e867c4></path><path d="M38.066 290.277s2.198 1.225 6.954 1.225c6.376 0 8.646-1.73 8.646-1.73s.63 1.168-.649 2.27c-1.04.897-3.77 1.668-7.745 1.621-4.347-.05-6.115-.593-7.062-1.224-.864-.577-.72-1.657-.144-2.162" fill="#2B0849" data-v-33e867c4></path><path d="M45.344 274.041s.035 1.592-.329 3.07c-.365 1.49-1.13 3.255-1.184 4.34-.061 1.206 4.755 1.657 5.403.036.65-1.622 1.357-6.737 2.006-7.602.648-.865-5.14-2.222-5.896.156" fill="#A4AABA" data-v-33e867c4></path><path d="M89.476 277.57l13.899.095s1.349-56.643 1.925-66.909c.576-10.267 3.923-45.052 1.042-65.585l-13.037-.669-23.737.81s-.452 4.12-1.243 10.365c-.065.515-.708.874-.777 1.417-.078.608.439 1.407.332 2.044-2.455 14.627-5.797 32.736-8.256 46.837-.121.693-1.282 1.048-1.515 2.796-.042.314.22 1.584.116 1.865-7.14 19.473-12.202 52.601-15.66 67.19l15.176-.015s2.282-10.145 4.185-18.871c2.922-13.389 24.012-88.32 24.012-88.32l3.133-.954-.158 48.568s-.233 1.282.35 2.098c.583.815-.581 1.167-.408 2.331l.408 1.864s-.466 7.458-.932 12.352c-.467 4.895 1.145 40.69 1.145 40.69" fill="#7BB2F9" data-v-33e867c4></path><path d="M64.57 218.881c1.197.099 4.195-2.097 7.225-5.127M96.024 222.534s2.881-1.152 6.34-4.034" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M96.973 219.373s2.882-1.153 6.34-4.034" stroke="#648BD8" stroke-width="1.032" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M63.172 222.144s2.724-.614 6.759-3.496M74.903 146.166c-.281 3.226.31 8.856-4.506 9.478M93.182 144.344s.115 14.557-1.344 15.65c-2.305 1.73-3.107 2.02-3.107 2.02M89.197 144.923s.269 13.144-1.01 25.088M83.525 170.71s6.81-1.051 9.116-1.051M46.026 270.045l-.892 4.538M46.937 263.289l-.815 4.157M62.725 202.503c-.33 1.618-.102 1.904-.449 3.438 0 0-2.756 1.903-2.29 3.923.466 2.02-.31 3.424-4.505 17.252-1.762 5.807-4.233 18.922-6.165 28.278-.03.144-.521 2.646-1.14 5.8M64.158 194.136c-.295 1.658-.6 3.31-.917 4.938M71.33 146.787l-1.244 10.877s-1.14.155-.519 2.33c.117 1.399-2.778 16.39-5.382 31.615M44.242 273.727H58.07" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M106.18 142.117c-3.028-.489-18.825-2.744-36.219.2a.625.625 0 0 0-.518.644c.063 1.307.044 2.343.015 2.995a.617.617 0 0 0 .716.636c3.303-.534 17.037-2.412 35.664-.266.347.04.66-.214.692-.56.124-1.347.16-2.425.17-3.029a.616.616 0 0 0-.52-.62" fill="#192064" data-v-33e867c4></path><path d="M96.398 145.264l.003-5.102a.843.843 0 0 0-.809-.847 114.104 114.104 0 0 0-8.141-.014.85.85 0 0 0-.82.847l-.003 5.097c0 .476.388.857.864.845 2.478-.064 5.166-.067 8.03.017a.848.848 0 0 0 .876-.843" fill="#FFF" data-v-33e867c4></path><path d="M95.239 144.296l.002-3.195a.667.667 0 0 0-.643-.672c-1.9-.061-3.941-.073-6.094-.01a.675.675 0 0 0-.654.672l-.002 3.192c0 .376.305.677.68.669 1.859-.042 3.874-.043 6.02.012.376.01.69-.291.691-.668" fill="#192064" data-v-33e867c4></path><path d="M90.102 273.522h12.819M91.216 269.761c.006 3.519-.072 5.55 0 6.292M90.923 263.474c-.009 1.599-.016 2.558-.016 4.505M90.44 170.404l.932 46.38s.7 1.631-.233 2.796c-.932 1.166 2.564.7.932 2.33-1.63 1.633.933 1.166 0 3.497-.618 1.546-1.031 21.921-1.138 36.513" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M73.736 98.665l2.214 4.312s2.098.816 1.865 2.68l.816 2.214M64.297 116.611c.233-.932 2.176-7.147 12.585-10.488M77.598 90.042s7.691 6.137 16.547 2.72" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M91.974 86.954s5.476-.816 7.574-4.545c1.297-.345.72 2.212-.33 3.671-.7.971-1.01 1.554-1.01 1.554s.194.31.155.816c-.053.697-.175.653-.272 1.048-.081.335.108.657 0 1.049-.046.17-.198.5-.382.878-.12.249-.072.687-.2.948-.231.469-1.562 1.87-2.622 2.855-3.826 3.554-5.018 1.644-6.001-.408-.894-1.865-.661-5.127-.874-6.875-.35-2.914-2.622-3.03-1.923-4.429.343-.685 2.87.69 3.263 1.748.757 2.04 2.952 1.807 2.622 1.69" fill="#FFC6A0" data-v-33e867c4></path><path d="M99.8 82.429c-.465.077-.35.272-.97 1.243-.622.971-4.817 2.932-6.39 3.224-2.589.48-2.278-1.56-4.254-2.855-1.69-1.107-3.562-.638-1.398 1.398.99.932.932 1.107 1.398 3.205.335 1.506-.64 3.67.7 5.593" stroke="#DB836E" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M79.543 108.673c-2.1 2.926-4.266 6.175-5.557 8.762" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M87.72 124.768s-2.098-1.942-5.127-2.719c-3.03-.777-3.574-.155-5.516.078-1.942.233-3.885-.932-3.652.7.233 1.63 5.05 1.01 5.206 2.097.155 1.087-6.37 2.796-8.313 2.175-.777.777.466 1.864 2.02 2.175.233 1.554 2.253 1.554 2.253 1.554s.699 1.01 2.641 1.088c2.486 1.32 8.934-.7 10.954-1.554 2.02-.855-.466-5.594-.466-5.594" fill="#FFC6A0" data-v-33e867c4></path><path d="M73.425 122.826s.66 1.127 3.167 1.418c2.315.27 2.563.583 2.563.583s-2.545 2.894-9.07 2.272M72.416 129.274s3.826.097 4.933-.718M74.98 130.75s1.961.136 3.36-.505M77.232 131.916s1.748.019 2.914-.505M73.328 122.321s-.595-1.032 1.262-.427c1.671.544 2.833.055 5.128.155 1.389.061 3.067-.297 3.982.15 1.606.784 3.632 2.181 3.632 2.181s10.526 1.204 19.033-1.127M78.864 108.104s-8.39 2.758-13.168 12.12" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M109.278 112.533s3.38-3.613 7.575-4.662" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M107.375 123.006s9.697-2.745 11.445-.88" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M194.605 83.656l3.971-3.886M187.166 90.933l3.736-3.655M191.752 84.207l-4.462-4.56M198.453 91.057l-4.133-4.225M129.256 163.074l3.718-3.718M122.291 170.039l3.498-3.498M126.561 163.626l-4.27-4.27M132.975 170.039l-3.955-3.955" stroke="#BFCDDD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M190.156 211.779h-1.604a4.023 4.023 0 0 1-4.011-4.011V175.68a4.023 4.023 0 0 1 4.01-4.01h1.605a4.023 4.023 0 0 1 4.011 4.01v32.088a4.023 4.023 0 0 1-4.01 4.01" fill="#A3B4C6" data-v-33e867c4></path><path d="M237.824 212.977a4.813 4.813 0 0 1-4.813 4.813h-86.636a4.813 4.813 0 0 1 0-9.626h86.636a4.813 4.813 0 0 1 4.813 4.813" fill="#A3B4C6" data-v-33e867c4></path><mask fill="#fff" data-v-33e867c4></mask><path fill="#A3B4C6" mask="url(#d)" d="M154.098 190.096h70.513v-84.617h-70.513z" data-v-33e867c4></path><path d="M224.928 190.096H153.78a3.219 3.219 0 0 1-3.208-3.209V167.92a3.219 3.219 0 0 1 3.208-3.21h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.219 3.219 0 0 1-3.21 3.209M224.928 130.832H153.78a3.218 3.218 0 0 1-3.208-3.208v-18.968a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.218 3.218 0 0 1-3.21 3.208" fill="#BFCDDD" mask="url(#d)" data-v-33e867c4></path><path d="M159.563 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 120.546h-22.461a.802.802 0 0 1-.802-.802v-3.208c0-.443.359-.803.802-.803h22.46c.444 0 .803.36.803.803v3.208c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-33e867c4></path><path d="M224.928 160.464H153.78a3.218 3.218 0 0 1-3.208-3.209v-18.967a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.209v18.967a3.218 3.218 0 0 1-3.21 3.209" fill="#BFCDDD" mask="url(#d)" data-v-33e867c4></path><path d="M173.455 130.832h49.301M164.984 130.832h6.089M155.952 130.832h6.75M173.837 160.613h49.3M165.365 160.613h6.089M155.57 160.613h6.751" stroke="#7C90A5" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-33e867c4></path><path d="M159.563 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M166.98 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M174.397 151.038a2.407 2.407 0 1 1 .001-4.814 2.407 2.407 0 0 1 0 4.814M222.539 151.038h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802M159.563 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 179.987h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-33e867c4></path><path d="M203.04 221.108h-27.372a2.413 2.413 0 0 1-2.406-2.407v-11.448a2.414 2.414 0 0 1 2.406-2.407h27.372a2.414 2.414 0 0 1 2.407 2.407V218.7a2.413 2.413 0 0 1-2.407 2.407" fill="#BFCDDD" mask="url(#d)" data-v-33e867c4></path><path d="M177.259 207.217v11.52M201.05 207.217v11.52" stroke="#A3B4C6" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-33e867c4></path><path d="M162.873 267.894a9.422 9.422 0 0 1-9.422-9.422v-14.82a9.423 9.423 0 0 1 18.845 0v14.82a9.423 9.423 0 0 1-9.423 9.422" fill="#5BA02E" mask="url(#d)" data-v-33e867c4></path><path d="M171.22 267.83a9.422 9.422 0 0 1-9.422-9.423v-3.438a9.423 9.423 0 0 1 18.845 0v3.438a9.423 9.423 0 0 1-9.422 9.423" fill="#92C110" mask="url(#d)" data-v-33e867c4></path><path d="M181.31 293.666h-27.712a3.209 3.209 0 0 1-3.209-3.21V269.79a3.209 3.209 0 0 1 3.209-3.21h27.711a3.209 3.209 0 0 1 3.209 3.21v20.668a3.209 3.209 0 0 1-3.209 3.209" fill="#F2D7AD" mask="url(#d)" data-v-33e867c4></path></g>', 2)];
var To = { class: "m-title" };
var Io = { class: "m-subtitle" };
var jo = { class: "m-extra" };
var Vo = { key: 0, class: "m-content" };
var Sa2 = W(defineComponent({ __name: "Result", props: { status: { default: "info" }, title: { default: "" }, subTitle: { default: "" } }, setup(t) {
  const a = useSlots(), e = computed(() => {
    var i;
    const o = (i = a.default) == null ? void 0 : i.call(a);
    return !!o && !!(o[0].children !== "v-if" && (o != null && o.length));
  });
  return (o, i) => (openBlock(), createElementBlock("div", wo, [createBaseVNode("div", bo, [renderSlot(o.$slots, "image", {}, () => [o.status === "info" ? (openBlock(), createElementBlock("svg", xo, Mo)) : createCommentVNode("", true), o.status === "success" ? (openBlock(), createElementBlock("svg", zo, _o)) : createCommentVNode("", true), o.status === "warning" ? (openBlock(), createElementBlock("svg", Co, $o)) : createCommentVNode("", true), o.status === "error" ? (openBlock(), createElementBlock("svg", Bo, Fo)) : createCommentVNode("", true), o.status === "403" ? (openBlock(), createElementBlock("svg", Lo, So)) : createCommentVNode("", true), o.status === "404" ? (openBlock(), createElementBlock("svg", Ao, Eo)) : createCommentVNode("", true), o.status === "500" ? (openBlock(), createElementBlock("svg", Do, Ho)) : createCommentVNode("", true)], true)]), createBaseVNode("div", To, [renderSlot(o.$slots, "title", {}, () => [createTextVNode(toDisplayString(o.title), 1)], true)]), createBaseVNode("div", Io, [renderSlot(o.$slots, "subTitle", {}, () => [createTextVNode(toDisplayString(o.subTitle), 1)], true)]), createBaseVNode("div", jo, [renderSlot(o.$slots, "extra", {}, void 0, true)]), e.value ? (openBlock(), createElementBlock("div", Vo, [renderSlot(o.$slots, "default", {}, void 0, true)])) : createCommentVNode("", true)]));
} }), [["__scopeId", "data-v-33e867c4"]]);
Sa2.install = (t) => {
  t.component(Sa2.__name, Sa2);
};
var Aa2 = W(defineComponent({ __name: "Row", props: { width: { default: "auto" }, gutter: { default: 0 }, wrap: { type: Boolean, default: false }, align: { default: "top" }, justify: { default: "start" } }, setup(t) {
  const a = t, e = { top: "flex-start", middle: "center", bottom: "flex-end", stretch: "stretch" }, o = computed(() => typeof a.gutter == "number" ? a.gutter : Array.isArray(a.gutter) ? typeof a.gutter[0] == "object" ? d.value >= 1600 && a.gutter[0].xxl ? a.gutter[0].xxl : d.value >= 1200 && a.gutter[0].xl ? a.gutter[0].xl : d.value >= 992 && a.gutter[0].lg ? a.gutter[0].lg : d.value >= 768 && a.gutter[0].md ? a.gutter[0].md : d.value >= 576 && a.gutter[0].sm ? a.gutter[0].sm : d.value < 576 && a.gutter[0].xs ? a.gutter[0].xs : 16 : a.gutter[0] : typeof a.gutter == "object" ? d.value >= 1600 && a.gutter.xxl ? a.gutter.xxl : d.value >= 1200 && a.gutter.xl ? a.gutter.xl : d.value >= 992 && a.gutter.lg ? a.gutter.lg : d.value >= 768 && a.gutter.md ? a.gutter.md : d.value >= 576 && a.gutter.sm ? a.gutter.sm : d.value < 576 && a.gutter.xs ? a.gutter.xs : 16 : 0), i = computed(() => Array.isArray(a.gutter) ? typeof a.gutter[1] == "object" ? d.value >= 1600 && a.gutter[1].xxl ? a.gutter[1].xxl : d.value >= 1200 && a.gutter[1].xl ? a.gutter[1].xl : d.value >= 992 && a.gutter[1].lg ? a.gutter[1].lg : d.value >= 768 && a.gutter[1].md ? a.gutter[1].md : d.value >= 576 && a.gutter[1].sm ? a.gutter[1].sm : d.value < 576 && a.gutter[1].xs ? a.gutter[1].xs : 16 : a.gutter[1] : 0), n = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), d = ref(document.documentElement.clientWidth);
  function s() {
    d.value = document.documentElement.clientWidth;
  }
  return onMounted(() => {
    window.addEventListener("resize", s);
  }), onUnmounted(() => {
    window.removeEventListener("resize", s);
  }), (p, r) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-row", { "gutter-row": p.gutter }]), style: normalizeStyle(`--xGap: ${o.value / 2}px; --justify: ${p.justify}; --align: ${e[p.align]}; width: ${n.value}; margin-left: -${o.value / 2}px; margin-right: -${o.value / 2}px; row-gap: ${i.value}px;`) }, [renderSlot(p.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-21126246"]]);
Aa2.install = (t) => {
  t.component(Aa2.__name, Aa2);
};
var Wo = { key: 2, class: "m-skeleton-image" };
var Ro = [((t) => (pushScopeId("data-v-53e8ec49"), t = t(), popScopeId(), t))(() => createBaseVNode("svg", { viewBox: "0 0 1098 1024", xmlns: "http://www.w3.org/2000/svg", class: "m-skeleton-image-svg" }, [createBaseVNode("path", { class: "u-skeleton-image-path", d: "M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z" })], -1))];
var No = { key: 3, class: "m-skeleton-header" };
var qo = { key: 4, class: "m-skeleton-content" };
var Oo = { class: "u-skeleton-paragraph" };
var Ea2 = W(defineComponent({ __name: "Skeleton", props: { animated: { type: Boolean, default: true }, button: { type: [Boolean, Object], default: false }, avatar: { type: [Boolean, Object], default: false }, input: { type: [Boolean, Object], default: false }, image: { type: Boolean, default: false }, title: { type: [Boolean, Object], default: true }, paragraph: { type: [Boolean, Object], default: true }, loading: { type: Boolean, default: true } }, setup(t) {
  const a = t, e = computed(() => {
    if (typeof a.button == "object") return a.button.size === "large" ? 40 : a.button.size === "small" ? 24 : 32;
  }), o = computed(() => typeof a.avatar == "boolean" ? 8 : typeof a.avatar.size == "number" ? (a.avatar.size - 16) / 2 : { default: 8, small: 4, large: 12 }[a.avatar.size || "default"]), i = computed(() => typeof a.title == "boolean" ? "38%" : typeof a.title.width == "number" ? a.title.width + "px" : a.title.width || "38%"), n = computed(() => typeof a.paragraph == "boolean" ? 3 : a.paragraph.rows), d = computed(() => typeof a.paragraph == "boolean" ? Array(n.value) : Array.isArray(a.paragraph.width) ? a.paragraph.width.map((s) => typeof s == "number" ? s + "px" : s) : typeof a.paragraph.width == "number" ? Array(n.value).fill(a.paragraph.width + "px") : Array(n.value).fill(a.paragraph.width));
  return (s, p) => s.loading ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-skeleton", { "m-skeleton-avatar": s.avatar, "m-skeleton-animated": s.animated }]), style: normalizeStyle(`--button-size: ${e.value}px; --title-top: ${o.value}px;`) }, [s.button ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["u-skeleton-button", { "u-button-round": typeof s.button != "boolean" && s.button.shape === "round", "u-button-circle": typeof s.button != "boolean" && s.button.shape === "circle", "u-button-sm": typeof s.button != "boolean" && s.button.size === "small", "u-button-lg": typeof s.button != "boolean" && s.button.size === "large", "u-button-block": typeof s.button != "boolean" && s.button.shape !== "circle" && s.button.block }]) }, null, 2)) : createCommentVNode("", true), s.input ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["u-skeleton-input", { "u-input-sm": typeof s.input != "boolean" && s.input.size === "small", "u-input-lg": typeof s.input != "boolean" && s.input.size === "large" }]) }, null, 2)) : createCommentVNode("", true), s.image ? (openBlock(), createElementBlock("div", Wo, Ro)) : createCommentVNode("", true), s.avatar ? (openBlock(), createElementBlock("div", No, [createBaseVNode("span", { class: normalizeClass(["u-skeleton-avatar", { "u-avatar-sm": typeof s.avatar != "boolean" && s.avatar.size === "small", "u-avatar-lg": typeof s.avatar != "boolean" && s.avatar.size === "large", "u-avatar-square": typeof s.avatar != "boolean" && s.avatar.shape === "square" }]) }, null, 2)])) : createCommentVNode("", true), s.button || s.image || s.input ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", qo, [createBaseVNode("h3", { class: "u-skeleton-title", style: normalizeStyle({ width: i.value }) }, null, 4), createBaseVNode("ul", Oo, [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (r) => (openBlock(), createElementBlock("li", { key: r, style: normalizeStyle(`width: ${d.value[r - 1]};`) }, null, 4))), 128))])]))], 6)) : renderSlot(s.$slots, "default", { key: 1 }, void 0, true);
} }), [["__scopeId", "data-v-53e8ec49"]]);
Ea2.install = (t) => {
  t.component(Ea2.__name, Ea2);
};
var w1 = (t) => (pushScopeId("data-v-982f79dc"), t = t(), popScopeId(), t);
var Po = { key: 0, class: "m-handle-tooltip" };
var Ko = w1(() => createBaseVNode("div", { class: "m-arrow" }, null, -1));
var Yo = { key: 0, class: "m-handle-tooltip" };
var Uo = w1(() => createBaseVNode("div", { class: "m-arrow" }, null, -1));
var Da = W(defineComponent({ __name: "Slider", props: { width: { default: "100%" }, min: { default: 0 }, max: { default: 100 }, disabled: { type: Boolean, default: false }, range: { type: Boolean, default: false }, step: { default: 1 }, tipFormatter: { type: Function, default: (t) => t }, hideTip: { type: Boolean, default: false }, value: { default: 0 } }, emits: ["update:value", "change"], setup(t, { emit: a }) {
  const e = t, o = ref(false), i = ref(), n = ref(0), d = ref(0), s = ref(), p = ref(), r = ref(), m = ref(), k = computed(() => x(p.value / (e.max - e.min) * e.step)), M = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), w = computed(() => {
    let D;
    return D = d.value === p.value ? e.max : Math.round(d.value / k.value * e.step + e.min), e.range ? [Math.round(n.value / k.value * e.step + e.min), D] : D;
  }), c = computed(() => e.range ? e.tipFormatter(w.value[0]) : null), h3 = computed(() => e.range ? e.tipFormatter(w.value[1]) : e.tipFormatter(w.value)), z = a;
  function x(D) {
    return parseFloat(D.toFixed(2));
  }
  function y() {
    p.value = s.value.offsetWidth;
  }
  function g() {
    var D;
    e.range ? (n.value = x((((D = e.value[0]) < e.min ? e.min : D) - e.min) / e.step * k.value), d.value = x((function(I) {
      return I > e.max ? e.max : I;
    }(e.value[1]) - e.min) / e.step * k.value)) : d.value = x((function(I) {
      return I < e.min ? e.min : I > e.max ? e.max : I;
    }(e.value) - e.min) / e.step * k.value);
  }
  function f() {
    const D = s.value.getBoundingClientRect().left;
    document.onmousemove = (I) => {
      const j = x(Math.round((I.clientX - D) / k.value) * k.value);
      j < 0 ? n.value = 0 : j >= 0 && j <= d.value ? n.value = j : (n.value = d.value, m.value.focus(), _());
    }, document.onmouseup = () => {
      document.onmousemove = null;
    };
  }
  function _() {
    const D = s.value.getBoundingClientRect().left;
    document.onmousemove = (I) => {
      const j = x(Math.round((I.clientX - D) / k.value) * k.value);
      j > p.value ? d.value = p.value : n.value <= j && j <= p.value ? d.value = j : (d.value = n.value, e.range && (r.value.focus(), f()));
    }, document.onmouseup = () => {
      document.onmousemove = null;
    };
  }
  function F(D, I) {
    const j = D - k.value;
    I === "left" ? n.value = j < 0 ? 0 : j : j >= n.value ? d.value = j : (d.value = n.value, n.value = j, r.value.focus());
  }
  function H(D, I) {
    const j = D + k.value;
    I === "right" ? j > p.value ? d.value = p.value : d.value = j : j <= d.value ? n.value = j : (n.value = d.value, d.value = j, m.value.focus());
  }
  return watch(() => e.width, () => {
    y();
  }, { flush: "post" }), watch(() => e.value, () => {
    g();
  }), watch(w, (D) => {
    z("update:value", D), z("change", D);
  }), onMounted(() => {
    y(), g();
  }), (D, I) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-slider", { disabled: D.disabled }]), ref_key: "slider", ref: s, style: normalizeStyle(`width: ${M.value};`) }, [createBaseVNode("div", { class: "u-slider-rail", onClick: I[0] || (I[0] = withModifiers((j) => D.disabled ? () => false : function(se) {
    o.value ? (oe(i.value), i.value = null) : o.value = true, i.value = ve(() => {
      o.value = false;
    }, 300);
    const ae = Math.round(se.layerX / k.value) * k.value;
    e.range ? ae <= n.value ? (n.value = ae, r.value.focus()) : ae >= d.value ? (d.value = ae, m.value.focus()) : ae - n.value < d.value - ae ? (n.value = ae, r.value.focus()) : (d.value = ae, m.value.focus()) : (d.value = ae, m.value.focus());
  }(j), ["self"])) }), createBaseVNode("div", { class: normalizeClass(["u-slider-track", { trackTransition: o.value }]), style: normalizeStyle(`left: ${n.value}px; right: auto; width: ${d.value - n.value}px;`) }, null, 6), D.range ? (openBlock(), createElementBlock("div", { key: 0, tabindex: "0", ref_key: "leftHandle", ref: r, class: normalizeClass(["m-slider-handle", { handleTransition: o.value }]), style: normalizeStyle(`left: ${n.value}px; right: auto; transform: translate(-50%, -50%);`), onKeydown: [I[1] || (I[1] = withKeys(withModifiers((j) => D.disabled ? () => false : F(n.value, "left"), ["prevent"]), ["left"])), I[2] || (I[2] = withKeys(withModifiers((j) => D.disabled ? () => false : H(n.value, "left"), ["prevent"]), ["right"])), I[3] || (I[3] = withKeys(withModifiers((j) => D.disabled ? () => false : F(n.value, "left"), ["prevent"]), ["down"])), I[4] || (I[4] = withKeys(withModifiers((j) => D.disabled ? () => false : H(n.value, "left"), ["prevent"]), ["up"]))], onMousedown: I[5] || (I[5] = (j) => D.disabled ? () => false : f()) }, [D.hideTip ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Po, [createTextVNode(toDisplayString(c.value) + " ", 1), Ko]))], 38)) : createCommentVNode("", true), createBaseVNode("div", { tabindex: "0", ref_key: "rightHandle", ref: m, class: normalizeClass(["m-slider-handle", { handleTransition: o.value }]), style: normalizeStyle(`left: ${d.value}px; right: auto; transform: translate(-50%, -50%);`), onKeydown: [I[6] || (I[6] = withKeys(withModifiers((j) => D.disabled ? () => false : F(d.value, "right"), ["prevent"]), ["left"])), I[7] || (I[7] = withKeys(withModifiers((j) => D.disabled ? () => false : H(d.value, "right"), ["prevent"]), ["right"])), I[8] || (I[8] = withKeys(withModifiers((j) => D.disabled ? () => false : F(d.value, "right"), ["prevent"]), ["down"])), I[9] || (I[9] = withKeys(withModifiers((j) => D.disabled ? () => false : H(d.value, "right"), ["prevent"]), ["up"]))], onMousedown: I[10] || (I[10] = (j) => D.disabled ? () => false : _()) }, [D.hideTip ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Yo, [createTextVNode(toDisplayString(h3.value) + " ", 1), Uo]))], 38)], 6));
} }), [["__scopeId", "data-v-982f79dc"]]);
Da.install = (t) => {
  t.component(Da.__name, Da);
};
var Go = { class: "m-statistic" };
var Zo = { class: "u-title" };
var Jo = { key: 0, class: "u-prefix" };
var Xo = { class: "u-content-value" };
var Qo = { key: 1, class: "u-suffix" };
var Ha2 = W(defineComponent({ __name: "Statistic", props: { title: { default: "" }, value: { default: "" }, valueStyle: { default: () => ({}) }, precision: { default: 0 }, prefix: { default: "" }, suffix: { default: "" }, separator: { default: "," }, formatter: { type: Function, default: (t) => t } }, setup(t) {
  const a = t, e = computed(() => a.formatter(p1(a.value, a.precision, a.separator))), o = useSlots(), i = computed(() => {
    var s;
    const d = (s = o.prefix) == null ? void 0 : s.call(o);
    return d ? !!(d[0].children !== "v-if" && (d != null && d.length)) : a.prefix;
  }), n = computed(() => {
    var s;
    const d = (s = o.suffix) == null ? void 0 : s.call(o);
    return d ? !!(d[0].children !== "v-if" && (d != null && d.length)) : a.suffix;
  });
  return (d, s) => (openBlock(), createElementBlock("div", Go, [createBaseVNode("div", Zo, [renderSlot(d.$slots, "title", {}, () => [createTextVNode(toDisplayString(d.title), 1)], true)]), createBaseVNode("div", { class: "m-content", style: normalizeStyle(d.valueStyle) }, [i.value ? (openBlock(), createElementBlock("span", Jo, [renderSlot(d.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(d.prefix), 1)], true)])) : createCommentVNode("", true), createBaseVNode("span", Xo, [renderSlot(d.$slots, "default", {}, () => [createTextVNode(toDisplayString(e.value), 1)], true)]), n.value ? (openBlock(), createElementBlock("span", Qo, [renderSlot(d.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(d.suffix), 1)], true)])) : createCommentVNode("", true)], 4)]));
} }), [["__scopeId", "data-v-ce35a50c"]]);
Ha2.install = (t) => {
  t.component(Ha2.__name, Ha2);
};
var e0 = { class: "m-steps" };
var a0 = ["onClick"];
var t0 = { class: "m-steps-icon" };
var l0 = { key: 0, class: "u-num" };
var o0 = { key: 1, class: "u-icon", viewBox: "64 64 896 896", "data-icon": "check", "aria-hidden": "true", focusable: "false" };
var s0 = [((t) => (pushScopeId("data-v-5b8c802b"), t = t(), popScopeId(), t))(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1))];
var n0 = { class: "m-steps-content" };
var i0 = { class: "u-steps-title" };
var u0 = defineComponent({ __name: "Steps", props: { steps: { default: () => [] }, current: { default: 1 }, width: { default: "100%" }, descMaxWidth: { default: 120 } }, emits: ["update:current", "change"], setup(t, { emit: a }) {
  const e = t, o = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), i = computed(() => e.steps.length), n = computed(() => e.current < 1 ? 1 : e.current > i.value + 1 ? i.value + 1 : e.current), d = a;
  return (s, p) => (openBlock(), createElementBlock("div", { class: "m-steps-area", style: normalizeStyle(`width: ${o.value};`) }, [createBaseVNode("div", e0, [(openBlock(true), createElementBlock(Fragment, null, renderList(s.steps, (r, m) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-steps-item", { finish: n.value > m + 1, process: n.value === m + 1, wait: n.value < m + 1 }]), key: m }, [createBaseVNode("div", { class: "m-info-wrap", onClick: (k) => function(M) {
    n.value !== M && (d("update:current", M), d("change", M));
  }(m + 1) }, [createBaseVNode("div", t0, [n.value <= m + 1 ? (openBlock(), createElementBlock("span", l0, toDisplayString(m + 1), 1)) : (openBlock(), createElementBlock("svg", o0, s0))]), createBaseVNode("div", n0, [createBaseVNode("div", i0, toDisplayString(r.title), 1), withDirectives(createBaseVNode("div", { class: "u-steps-description", style: normalizeStyle(`max-width: ${s.descMaxWidth}px;`) }, toDisplayString(r.description), 5), [[vShow, r.description]])])], 8, a0)], 2))), 128))])], 4));
} });
var Ta2 = W(u0, [["__scopeId", "data-v-5b8c802b"]]);
Ta2.install = (t) => {
  t.component(Ta2.__name, Ta2);
};
var c0 = ["href", "target"];
var d0 = ["src", "alt"];
var r0 = ["href", "target"];
var v0 = ["src", "alt"];
var p0 = ["href", "target"];
var f0 = ["src", "alt"];
var h0 = defineComponent({ __name: "Swiper", props: { images: { default: () => [] }, width: { default: "100%" }, height: { default: "100vh" }, type: { default: "banner" }, navigation: { type: Boolean, default: true }, delay: { default: 3e3 }, swipe: { type: Boolean, default: true }, preloaderColor: { default: "theme" } }, emits: ["swiper", "change"], setup(t, { emit: a }) {
  const e = t, o = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), i = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), n = ref([Navigation, Pagination, Autoplay, EffectFade]), d = ref({ delay: e.delay, disableOnInteraction: false, pauseOnMouseEnter: true }), s = ref([Autoplay]), p = ref({ delay: 0, disableOnInteraction: false }), r = ref([Navigation, Pagination, Mousewheel]), m = a;
  function k(M) {
    m("swiper", M), e.type === "carousel" && (M.el.onmouseenter = () => {
      M.autoplay.stop();
    }, M.el.onmouseleave = () => {
      M.autoplay.start();
    });
  }
  return (M, w) => (openBlock(), createElementBlock(Fragment, null, [M.type === "banner" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 0, class: { "swiper-no-swiping": !M.swipe }, modules: n.value, navigation: M.navigation, "slides-per-view": 1, autoplay: d.value, lazy: "", loop: "", onSwiper: k, onSlideChange: w[0] || (w[0] = (c) => M.$emit("change", c)) }, M.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(M.images, (c, h3) => (openBlock(), createBlock(unref(SwiperSlide), { key: h3 }, { default: withCtx(() => [createBaseVNode("a", { href: c.link ? c.link : "javascript:;", target: c.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { src: c.src, class: "u-img", style: normalizeStyle(`width: ${o.value}; height: ${i.value};`), alt: c.title, loading: "lazy" }, null, 12, d0)], 8, c0), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${M.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["class", "modules", "navigation", "autoplay"])) : createCommentVNode("", true), M.type === "carousel" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 1, class: "swiper-no-swiping", modules: s.value, autoplay: p.value, lazy: "", loop: "", onSwiper: k, onSlideChange: w[1] || (w[1] = (c) => M.$emit("change", c)) }, M.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(M.images, (c, h3) => (openBlock(), createBlock(unref(SwiperSlide), { key: h3 }, { default: withCtx(() => [createBaseVNode("a", { href: c.link ? c.link : "javascript:;", target: c.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { src: c.src, class: "u-img", style: normalizeStyle(`width: ${o.value}; height: ${i.value};`), alt: c.title, loading: "lazy" }, null, 12, v0)], 8, r0), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${M.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["modules", "autoplay"])) : createCommentVNode("", true), M.type === "broadcast" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 2, modules: r.value, navigation: M.navigation, lazy: "", onSwiper: k, onSlideChange: w[2] || (w[2] = (c) => M.$emit("change", c)) }, M.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(M.images, (c, h3) => (openBlock(), createBlock(unref(SwiperSlide), { key: h3 }, { default: withCtx(() => [createBaseVNode("a", { href: c.link ? c.link : "javascript:;", target: c.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { src: c.src, class: "u-img", style: normalizeStyle(`width: ${o.value}; height: ${i.value};`), alt: c.title, loading: "lazy" }, null, 12, f0)], 8, p0), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${M.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["modules", "navigation"])) : createCommentVNode("", true)], 64));
} });
var Ia = W(h0, [["__scopeId", "data-v-8ed3bc6d"]]);
Ia.install = (t) => {
  t.component(Ia.__name, Ia);
};
var m0 = { class: "m-switch-wrap" };
var ja2 = W(defineComponent({ __name: "Switch", props: { onInfo: { default: "" }, offInfo: { default: "" }, disabled: { type: Boolean, default: false }, checked: { type: Boolean, default: false }, nodeStyle: { default: () => ({}) } }, emits: ["update:checked", "change"], setup(t, { emit: a }) {
  const e = t, o = a;
  return (i, n) => (openBlock(), createElementBlock("div", m0, [createBaseVNode("div", { onClick: n[0] || (n[0] = (d) => i.disabled ? () => false : (o("update:checked", !e.checked), void o("change", !e.checked))), class: normalizeClass(["m-switch", { "switch-checked": i.checked, disabled: i.disabled }]) }, [createBaseVNode("div", { class: normalizeClass(["u-switch-inner", i.checked ? "inner-checked" : "inner-unchecked"]) }, toDisplayString(i.checked ? i.onInfo : i.offInfo), 3), createBaseVNode("div", { class: normalizeClass(["u-node", { "node-checked": i.checked }]), style: normalizeStyle(i.nodeStyle) }, [renderSlot(i.$slots, "node", {}, void 0, true)], 6)], 2)]));
} }), [["__scopeId", "data-v-090bf09a"]]);
ja2.install = (t) => {
  t.component(ja2.__name, ja2);
};
var g0 = { class: "m-table-wrap" };
var y0 = { class: "m-table" };
var k0 = { class: "m-tr" };
var w0 = { class: "m-body" };
var b0 = { class: "m-tr-loading" };
var x0 = { class: "m-tr-empty" };
var M0 = ["colspan"];
var z0 = ["title"];
var _0 = { key: 1 };
var C0 = defineComponent({ __name: "Table", props: { columns: { default: () => [] }, dataSource: { default: () => [] }, pagination: { default: () => ({}) }, showPagination: { type: Boolean, default: true }, total: { default: 0 }, loading: { type: Boolean, default: false } }, emits: ["change"], setup(t, { emit: a }) {
  const e = a;
  function o(i, n) {
    e("change", i, n);
  }
  return (i, n) => (openBlock(), createElementBlock("div", g0, [createBaseVNode("table", y0, [createBaseVNode("thead", null, [createBaseVNode("tr", k0, [(openBlock(true), createElementBlock(Fragment, null, renderList(i.columns, (d, s) => (openBlock(), createElementBlock("th", { class: "m-th", style: normalizeStyle(`width: ${typeof d.width == "number" ? d.width + "px" : d.width};`), key: s }, toDisplayString(d.title), 5))), 128))])]), createBaseVNode("tbody", w0, [withDirectives(createBaseVNode("tr", b0, [createVNode(unref(ye), { class: "m-loading", size: "small", colspan: i.columns.length }, null, 8, ["colspan"])], 512), [[vShow, i.loading]]), withDirectives(createBaseVNode("tr", x0, [createBaseVNode("td", { class: "m-td-empty", colspan: i.columns.length }, [createVNode(unref(Re2), { class: "empty", image: "2" })], 8, M0)], 512), [[vShow, !i.total]]), (openBlock(true), createElementBlock(Fragment, null, renderList(i.dataSource, (d, s) => (openBlock(), createElementBlock("tr", { class: "m-tr", key: s }, [(openBlock(true), createElementBlock(Fragment, null, renderList(i.columns, (p, r) => (openBlock(), createElementBlock("td", { class: "m-td", key: r, title: d[p.dataIndex] }, [p.slot ? renderSlot(i.$slots, p.slot, mergeProps({ key: 0, ref_for: true }, d, { index: s }), () => [createTextVNode(toDisplayString(d[p.dataIndex] || "--"), 1)], true) : (openBlock(), createElementBlock("span", _0, toDisplayString(d[p.dataIndex] || "--"), 1))], 8, z0))), 128))]))), 128))])]), i.showPagination && i.total ? (openBlock(), createBlock(unref(Ge), { key: 0, class: "mt20", onChange: o, total: i.total, page: i.pagination.page, pageSize: i.pagination.pageSize, pageSizeOptions: i.pagination.pageSizeOptions, pageListNum: i.pagination.pageListNum, hideOnSinglePage: i.pagination.hideOnSinglePage, showQuickJumper: i.pagination.showQuickJumper, showSizeChanger: i.pagination.showSizeChanger, showTotal: i.pagination.showTotal, placement: i.pagination.placement }, null, 8, ["total", "page", "pageSize", "pageSizeOptions", "pageListNum", "hideOnSinglePage", "showQuickJumper", "showSizeChanger", "showTotal", "placement"])) : createCommentVNode("", true)]));
} });
var Va2 = W(C0, [["__scopeId", "data-v-0d405827"]]);
Va2.install = (t) => {
  t.component(Va2.__name, Va2);
};
var $0 = { class: "m-tabs" };
var B0 = { class: "m-tabs-nav" };
var F0 = ["onClick"];
var L0 = { class: "m-tabs-page" };
var S0 = defineComponent({ __name: "Tabs", props: { tabPages: { default: () => [] }, centered: { type: Boolean, default: false }, size: { default: "middle" }, type: { default: "line" }, gutter: { default: void 0 }, activeKey: { default: "" } }, emits: ["update:activeKey", "change"], setup(t, { emit: a }) {
  const e = t, o = ref(), i = ref(0), n = ref(0), d = ref(), s = ref(), p = ref(), r = ref(), m = ref(false), k = ref(0), M = ref(0), w = computed(() => e.tabPages.findIndex((y) => y.key === e.activeKey));
  watch(() => [e.tabPages, e.gutter, e.size, e.type], () => {
    ve(() => {
      x();
    }, 300);
  }, { deep: true, flush: "post" }), watch(() => e.activeKey, () => {
    z();
  }, { flush: "post" }), onMounted(() => {
    x();
  });
  const c = a, h3 = ref(false);
  function z() {
    const y = o.value[w.value];
    if (y) {
      if (i.value = y.offsetLeft, n.value = y.offsetWidth, m.value) {
        i.value < M.value && (h3.value = true, M.value = i.value, ve(() => {
          h3.value = false;
        }, 150));
        const g = i.value + n.value - s.value;
        g > M.value && (h3.value = true, M.value = g, ve(() => {
          h3.value = false;
        }, 150));
      }
    } else i.value = 0, n.value = 0;
  }
  function x() {
    s.value = d.value.offsetWidth, r.value = p.value.offsetWidth, r.value > s.value ? (m.value = true, k.value = r.value - s.value, M.value = k.value) : (m.value = false, M.value = 0), z();
  }
  return (y, g) => (openBlock(), createElementBlock("div", $0, [createBaseVNode("div", B0, [createBaseVNode("div", { ref_key: "wrap", ref: d, class: normalizeClass(["m-tabs-nav-wrap", { "tabs-center": y.centered, "before-shadow-active": m.value && M.value > 0, "after-shadow-active": m.value && M.value < k.value }]) }, [createBaseVNode("div", { ref_key: "nav", ref: p, class: normalizeClass(["m-tabs-nav-list", { transition: h3.value }]), onWheel: g[0] || (g[0] = (f) => m.value ? function(_) {
    if (_.deltaX !== 0) {
      _.preventDefault();
      const F = 1 * _.deltaX;
      M.value + F > k.value ? M.value = k.value : M.value + F < 0 ? M.value = 0 : M.value += F;
    }
  }(f) : () => false), style: normalizeStyle(`transform: translate(${-M.value}px, 0)`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(y.tabPages, (f, _) => (openBlock(), createElementBlock("div", { ref_for: true, ref_key: "tabs", ref: o, class: normalizeClass(["u-tab", [`u-tab-${y.size}`, { "u-tab-card": y.type === "card", "u-tab-disabled": f.disabled }, { "u-tab-line-active": y.activeKey === f.key && y.type === "line" }, { "u-tab-card-active": y.activeKey === f.key && y.type === "card" }]]), style: normalizeStyle(`margin-left: ${_ !== 0 ? y.gutter : null}px;`), onClick: (F) => {
    return f.disabled ? () => false : (H = f.key, c("update:activeKey", H), void c("change", H));
    var H;
  }, key: _ }, toDisplayString(f.tab), 15, F0))), 128)), createBaseVNode("div", { class: normalizeClass(["u-tab-bar", { "u-card-hidden": y.type === "card" }]), style: normalizeStyle(`left: ${i.value}px; width: ${n.value}px;`) }, null, 6)], 38)], 2)]), createBaseVNode("div", L0, [(openBlock(true), createElementBlock(Fragment, null, renderList(y.tabPages, (f) => withDirectives((openBlock(), createElementBlock("div", { class: "m-tabs-content", key: f.key }, [renderSlot(y.$slots, f.key, {}, () => [createTextVNode(toDisplayString(f.content), 1)], true)])), [[vShow, y.activeKey === f.key]])), 128))])]));
} });
var Wa2 = W(S0, [["__scopeId", "data-v-f75e4eec"]]);
Wa2.install = (t) => {
  t.component(Wa2.__name, Wa2);
};
var l1 = (t) => (pushScopeId("data-v-fab61bdd"), t = t(), popScopeId(), t);
var A0 = { key: 0, class: "m-icon" };
var E0 = { class: "u-tag" };
var D0 = [l1(() => createBaseVNode("svg", { focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var H0 = { class: "u-tag" };
var T0 = ["onClick"];
var I0 = [l1(() => createBaseVNode("svg", { focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var j0 = [l1(() => createBaseVNode("svg", { focusable: "false", class: "u-plus", "data-icon": "plus", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }), createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })], -1))];
var V0 = defineComponent({ __name: "Tag", props: { closable: { type: Boolean, default: false }, color: { default: "" }, icon: { default: "" }, size: { default: "middle" }, bordered: { type: Boolean, default: true }, dynamic: { type: Boolean, default: false }, value: { default: () => [] }, spaceWidth: { default: "auto" }, spaceAlign: { default: "start" }, spaceDirection: { default: "horizontal" }, spaceGap: { default: "small" } }, emits: ["update:value", "close", "dynamicClose"], setup(t, { emit: a }) {
  const e = t, o = computed(() => {
    if (e.dynamic && e.value.length) {
      if (typeof e.value[0] == "string") return true;
      if (typeof e.value[0] == "object") return false;
    }
    return null;
  }), i = computed(() => e.dynamic && e.value.length ? o.value ? e.value.map((g) => ({ label: g, closable: true })) : e.value.map((g) => ({ closable: true, ...g })) : []), n = useSlots(), d = computed(() => {
    var g;
    if (!e.dynamic) {
      const f = (g = n.icon) == null ? void 0 : g.call(n);
      return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e.icon;
    }
    return false;
  }), s = ref(), p = ref(false), r = ref(""), m = ["success", "processing", "error", "warning", "default", "pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"], k = ref(false), M = ref(), w = ref(Array(e.value.length).fill(1));
  watchEffect(() => {
    if (e.dynamic) {
      const g = e.value.length;
      w.value = Array(g).fill(1), nextTick(() => {
        if (M.value) for (let f = 0; f < g; f++) w.value[f] = M.value[f].offsetWidth;
      });
    }
  });
  const c = a;
  function h3(g) {
    k.value = true, c("close", g);
  }
  function z() {
    p.value = true, nextTick(() => {
      s.value.focus();
    });
  }
  function x() {
    o.value ? c("update:value", [...e.value, r.value]) : c("update:value", [...e.value, { label: r.value }]), p.value = false, s.value = "";
  }
  function y(g) {
    g.key === "Enter" && s.value.blur();
  }
  return (g, f) => g.dynamic ? (openBlock(), createBlock(unref(je2), { key: 1, width: g.spaceWidth, align: g.spaceAlign, direction: g.spaceDirection, gap: g.spaceGap }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(i.value, (_, F) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-tag", [`tag-${_.size || g.size}`, (_.color || g.color) && m.includes(_.color || g.color) ? "tag-" + (_.color || g.color) : "", { "tag-borderless": _.bordered !== void 0 && !_.bordered, "has-color": (_.color || g.color) && !m.includes(_.color || g.color) }]]), style: normalizeStyle(`background-color: ${!_.color && !g.color || m.includes(_.color || g.color) ? "" : _.color || g.color};`), key: F }, [withDirectives(createBaseVNode("span", { class: "m-icon", ref_for: true, ref_key: "tagsIconRef", ref: M }, [renderSlot(g.$slots, "icon", { index: F }, () => [createTextVNode(toDisplayString(_.icon), 1)], true)], 512), [[vShow, w.value[F]]]), createBaseVNode("span", H0, [renderSlot(g.$slots, "default", { label: _.label, index: F }, () => [createTextVNode(toDisplayString(_.label), 1)], true)]), _.closable || g.closable ? (openBlock(), createElementBlock("span", { key: 0, class: "m-close", onClick: (H) => function(D, I) {
    const j = e.value.filter((se, ae) => ae !== I);
    c("update:value", j), c("dynamicClose", D, I);
  }(_, F) }, I0, 8, T0)) : createCommentVNode("", true)], 6))), 128)), p.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-tag", [`tag-${g.size}`, { "m-plus": g.dynamic }]]), onClick: z }, j0, 2)), withDirectives(createBaseVNode("input", { ref_key: "inputRef", ref: s, class: normalizeClass(["u-input", `input-${g.size}`]), type: "text", "onUpdate:modelValue": f[0] || (f[0] = (_) => r.value = _), onBlur: f[1] || (f[1] = (_) => p.value = false), onChange: x, onKeydown: y }, null, 34), [[vShow, p.value], [vModelText, r.value]])]), _: 3 }, 8, ["width", "align", "direction", "gap"])) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-tag", [`tag-${g.size}`, g.color && m.includes(g.color) ? "tag-" + g.color : "", { "tag-borderless": !g.bordered, "has-color": g.color && !m.includes(g.color), hidden: k.value }]]), style: normalizeStyle(`background-color: ${g.color && !m.includes(g.color) ? g.color : ""};`) }, [d.value ? (openBlock(), createElementBlock("span", A0, [renderSlot(g.$slots, "icon", {}, () => [createTextVNode(toDisplayString(g.icon), 1)], true)])) : createCommentVNode("", true), createBaseVNode("span", E0, [renderSlot(g.$slots, "default", {}, void 0, true)]), g.closable ? (openBlock(), createElementBlock("span", { key: 1, class: "m-close", onClick: h3 }, D0)) : createCommentVNode("", true)], 6));
} });
var Ra2 = W(V0, [["__scopeId", "data-v-fab61bdd"]]);
Ra2.install = (t) => {
  t.component(Ra2.__name, Ra2);
};
var W0 = ["data-count"];
var R0 = ["value", "maxlength", "disabled"];
var N0 = [((t) => (pushScopeId("data-v-dea4708c"), t = t(), popScopeId(), t))(() => createBaseVNode("svg", { focusable: "false", class: "u-clear", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })], -1))];
var Na2 = W(defineComponent({ inheritAttrs: false, __name: "Textarea", props: { width: { default: "100%" }, allowClear: { type: Boolean, default: false }, autoSize: { type: [Boolean, Object], default: false }, disabled: { type: Boolean, default: false }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, value: { default: "" }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "enter"], setup(t, { emit: a }) {
  const e = t, o = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), i = computed(() => {
    if (typeof e.autoSize == "object") {
      const h3 = { resize: "none" };
      return "minRows" in e.autoSize && (h3["min-height"] = 22 * e.autoSize.minRows + 10 + "px"), "maxRows" in e.autoSize && (h3["max-height"] = 22 * e.autoSize.maxRows + 10 + "px"), h3;
    }
    if (typeof e.autoSize == "boolean") return e.autoSize ? { "max-height": "9000000000000000px", resize: "none" } : {};
  }), n = computed(() => e.maxlength ? e.value.length + " / " + e.maxlength : e.value.length), d = computed(() => "lazy" in e.valueModifiers);
  watch(() => e.value, () => {
    JSON.stringify(i.value) !== "{}" && (p.value = 32, nextTick(() => {
      r();
    }));
  }, { flush: "post" });
  const s = ref(), p = ref(32);
  function r() {
    p.value = s.value.scrollHeight + 2;
  }
  onMounted(() => {
    r();
  });
  const m = a;
  function k(h3) {
    d.value || (m("update:value", h3.target.value), m("change", h3));
  }
  function M(h3) {
    d.value && (m("update:value", h3.target.value), m("change", h3));
  }
  function w(h3) {
    h3.key === "Enter" && (h3.preventDefault(), m("enter", h3));
  }
  function c() {
    m("update:value", ""), s.value.focus();
  }
  return (h3, z) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-textarea", { "show-count": h3.showCount }]), style: normalizeStyle(`width: ${o.value};`), "data-count": n.value }, [createBaseVNode("textarea", mergeProps({ ref_key: "textarea", ref: s, type: "hidden", class: ["u-textarea", { disabled: h3.disabled }], style: [`height: ${h3.autoSize ? p.value : ""}px`, i.value], value: h3.value, maxlength: h3.maxlength, disabled: h3.disabled, onInput: k, onChange: M, onKeydown: w }, h3.$attrs), null, 16, R0), !h3.disabled && h3.allowClear && h3.value ? (openBlock(), createElementBlock("span", { key: 0, class: "m-clear", onClick: c }, N0)) : createCommentVNode("", true)], 14, W0));
} }), [["__scopeId", "data-v-dea4708c"]]);
Na2.install = (t) => {
  t.component(Na2.__name, Na2);
};
var q0 = ["title", "href", "target", "onClick"];
var O0 = ["title", "href", "target", "onClick"];
var P0 = defineComponent({ __name: "TextScroll", props: { scrollText: {}, single: { type: Boolean, default: false }, width: { default: "100%" }, height: { default: 60 }, fontSize: { default: 16 }, fontWeight: { default: 400 }, color: { default: "rgba(0, 0, 0, .88)" }, backgroundColor: { default: "#FFF" }, amount: { default: 4 }, gap: { default: 20 }, step: { default: 1 }, interval: { default: 10 }, vertical: { type: Boolean, default: false }, verticalInterval: { default: 3e3 } }, emits: ["click"], setup(t, { emit: a }) {
  const e = t, o = computed(() => e.single ? [e.scrollText, e.scrollText] : [...e.scrollText]), i = computed(() => o.value.length || 0), n = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), d = computed(() => e.single ? 1 : e.amount), s = ref(0), p = ref(), r = ref(), m = ref(), k = ref(0);
  function M() {
    return parseFloat((m.value.offsetWidth / d.value).toFixed(2));
  }
  function w() {
    e.vertical ? i.value > 1 && (r.value && oe(r.value), r.value = ve(() => {
      x.value = (x.value + 1) % i.value;
    }, e.verticalInterval, true)) : i.value > d.value && (p.value && oe(p.value), p.value = ve(() => {
      s.value >= k.value ? (o.value.push(o.value.shift()), s.value = 0) : s.value += e.step;
    }, e.interval, true));
  }
  function c() {
    e.vertical ? r.value && oe(r.value) : p.value && oe(p.value);
  }
  watch(() => [o, e.width, e.amount, e.gap, e.step, e.interval, e.vertical, e.verticalInterval], () => {
    e.vertical || (k.value = M()), w();
  }, { deep: true, flush: "post" }), onMounted(() => {
    e.vertical || (k.value = M()), w();
  });
  const h3 = a;
  function z(y) {
    h3("click", y);
  }
  const x = ref(0);
  return (y, g) => y.vertical ? (openBlock(), createElementBlock("div", { key: 1, class: "m-slider-vertical", onMouseenter: c, onMouseleave: w, style: normalizeStyle(`height: ${y.height}px; width: ${n.value}; background: ${y.backgroundColor}; --fontSize: ${y.fontSize}px; --fontWeight: ${y.fontWeight}; --color: ${y.color};`) }, [createVNode(TransitionGroup, { name: "slide" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (f, _) => withDirectives((openBlock(), createElementBlock("div", { class: "m-slider", style: normalizeStyle(`width: calc(${n.value} - ${2 * y.gap}px); height: ${y.height}px;`), key: _ }, [createBaseVNode("a", { class: "u-slider", title: f.title, href: f.link ? f.link : "javascript:;", target: f.link ? "_blank" : "_self", onClick: (F) => z(f) }, toDisplayString(f.title || "--"), 9, O0)], 4)), [[vShow, x.value === _]])), 128))]), _: 1 })], 36)) : (openBlock(), createElementBlock("div", { key: 0, ref_key: "horizonRef", ref: m, class: "m-slider-horizon", onMouseenter: c, onMouseleave: w, style: normalizeStyle(`height: ${y.height}px; width: ${n.value}; background: ${y.backgroundColor}; --fontSize: ${y.fontSize}px; --fontWeight: ${y.fontWeight}; --color: ${y.color};`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (f, _) => (openBlock(), createElementBlock("a", { style: normalizeStyle(`will-change: transform; transform: translateX(${-s.value}px); width: ${k.value - y.gap}px; margin-left: ${y.gap}px;`), class: "u-slide-title", key: _, title: f.title, href: f.link ? f.link : "javascript:;", target: f.link ? "_blank" : "_self", onClick: (F) => z(f) }, toDisplayString(f.title || "--"), 13, q0))), 128))], 36));
} });
var qa2 = W(P0, [["__scopeId", "data-v-6b6e5431"]]);
qa2.install = (t) => {
  t.component(qa2.__name, qa2);
};
var K0 = { class: "m-timeline" };
var Y0 = defineComponent({ __name: "Timeline", props: { timelineData: { default: () => [] }, width: { default: "100%" }, lineStyle: { default: "solid" }, mode: { default: "left" }, position: { default: "left" } }, setup(t) {
  const a = t, e = ref(), o = ref([]), i = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), n = computed(() => a.timelineData.length);
  return watchEffect(() => {
    (function() {
      for (let d = 0; d < n.value; d++) o.value[d] = getComputedStyle(e.value[d].firstElementChild || e.value[d], null).getPropertyValue("line-height");
    })();
  }, { flush: "post" }), watchEffect(() => {
    if (a.mode === "center") for (let d = 0; d < n.value; d++) (d + 1) % 2 ? a.position === "left" ? e.value[d].classList.add("alternate-left-desc") : e.value[d].classList.add("alternate-right-desc") : a.position === "left" ? e.value[d].classList.add("alternate-right-desc") : e.value[d].classList.add("alternate-left-desc");
  }, { flush: "post" }), (d, s) => (openBlock(), createElementBlock("div", { class: "m-timeline-area", style: normalizeStyle(`width: ${i.value};`) }, [createBaseVNode("div", K0, [(openBlock(true), createElementBlock(Fragment, null, renderList(d.timelineData, (p, r) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-timeline-item", { last: r === d.timelineData.length - 1 }]), key: r }, [createBaseVNode("span", { class: normalizeClass(`u-tail ${d.mode}-tail`), style: normalizeStyle(`border-left-style: ${d.lineStyle};`) }, null, 6), createBaseVNode("div", { class: normalizeClass(`m-dot ${d.mode}-dot`), style: normalizeStyle(`height: ${o.value[r]}`) }, [renderSlot(d.$slots, "dot", { index: r }, () => [p.color === "red" ? (openBlock(), createElementBlock("span", { key: 0, class: "u-dot", style: normalizeStyle({ borderColor: "#ff4d4f" }) }, null, 4)) : p.color === "gray" ? (openBlock(), createElementBlock("span", { key: 1, class: "u-dot", style: normalizeStyle({ borderColor: "#00000040" }) }, null, 4)) : p.color === "green" ? (openBlock(), createElementBlock("span", { key: 2, class: "u-dot", style: normalizeStyle({ borderColor: "#52c41a" }) }, null, 4)) : p.color === "blue" ? (openBlock(), createElementBlock("span", { key: 3, class: "u-dot", style: normalizeStyle({ borderColor: "#1677ff" }) }, null, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-dot", style: normalizeStyle({ borderColor: p.color || "#1677ff" }) }, null, 4))], true)], 6), createBaseVNode("div", { ref_for: true, ref_key: "desc", ref: e, class: normalizeClass(`u-desc ${d.mode}-desc`) }, [renderSlot(d.$slots, "desc", { index: r }, () => [createTextVNode(toDisplayString(p.desc || "--"), 1)], true)], 2)], 2))), 128))])], 4));
} });
var Oa2 = W(Y0, [["__scopeId", "data-v-818d20dd"]]);
Oa2.install = (t) => {
  t.component(Oa2.__name, Oa2);
};
var Oe2 = (t) => (pushScopeId("data-v-dfc0a9cd"), t = t(), popScopeId(), t);
var U0 = { class: "m-upload-list" };
var G0 = { class: "m-upload" };
var Z0 = ["onDrop", "onClick"];
var J0 = ["accept", "multiple", "onChange"];
var X0 = Oe2(() => createBaseVNode("svg", { focusable: "false", class: "u-plus", "data-icon": "plus", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("defs"), createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }), createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })], -1));
var Q0 = { class: "u-tip" };
var es = { class: "m-file-uploading" };
var as = { key: 0, class: "m-file-preview" };
var ts = { key: 1, class: "u-file", focusable: "false", "data-icon": "file-pdf", "aria-hidden": "true", viewBox: "64 64 896 896" };
var ls = [Oe2(() => createBaseVNode("path", { d: "M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1))];
var os = { key: 2, class: "u-file", focusable: "false", "data-icon": "file", "aria-hidden": "true", viewBox: "64 64 896 896" };
var ss = [Oe2(() => createBaseVNode("path", { d: "M534 352V136H232v752h560V394H576a42 42 0 01-42-42z", fill: "#e6f7ff" }, null, -1)), Oe2(() => createBaseVNode("path", { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1))];
var ns = { class: "m-file-mask" };
var is = ["onClick"];
var us = [Oe2(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "eye", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })], -1))];
var cs = ["onClick"];
var ds = [Oe2(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "delete", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" })], -1))];
var rs = defineComponent({ __name: "Upload", props: { accept: { default: "*" }, multiple: { type: Boolean, default: false }, maxCount: { default: 1 }, tip: { default: "Upload" }, uploadingTip: { default: "Uploading" }, gap: { default: 8 }, fit: { default: "contain" }, errorInfo: { default: "" }, beforeUpload: { type: Function, default: () => true }, uploadMode: { default: "base64" }, customRequest: { type: Function, default: () => {
} }, disabled: { type: Boolean, default: false }, fileList: { default: () => [] } }, emits: ["update:fileList", "change", "remove"], setup(t, { emit: a }) {
  const e = t, o = ref([]), i = ref(1), n = ref(Array(e.maxCount).fill(false)), d = ref();
  function s(w) {
    return /\.(jpg|jpeg|png|gif)$/i.test(w) || /^data:image/.test(w);
  }
  watchEffect(() => {
    (function() {
      o.value = [...e.fileList], o.value.length > e.maxCount && o.value.splice(e.maxCount), e.disabled ? i.value = o.value.length : o.value.length < e.maxCount ? i.value = e.fileList.length + 1 : i.value = e.maxCount;
    })();
  });
  const p = a, r = function(w, c) {
    e.beforeUpload(w) ? (e.maxCount > i.value && i.value++, e.uploadMode === "base64" && (n.value[c] = true, function(h3, z) {
      var x = new FileReader();
      x.readAsDataURL(h3), x.onloadstart = function(y) {
        console.log("开始读取 onloadstart:", y);
      }, x.onabort = function(y) {
        console.log("读取中止 onabort:", y);
      }, x.onerror = function(y) {
        console.log("读取错误 onerror:", y);
      }, x.onprogress = function(y) {
        y.loaded === y.total && (n.value[z] = false);
      }, x.onload = function(y) {
        var g;
        o.value.push({ name: h3.name, url: (g = y.target) == null ? void 0 : g.result }), p("update:fileList", o.value), p("change", o.value);
      }, x.onloadend = function(y) {
        console.log("读取结束 onloadend:", y);
      };
    }(w, c)), e.uploadMode === "custom" && (n.value[c] = true, function(h3, z) {
      e.customRequest(h3).then((x) => {
        o.value.push(x), p("update:fileList", o.value), p("change", o.value);
      }).catch((x) => {
        e.maxCount > 1 && (i.value = o.value.length + 1), M(x);
      }).finally(() => {
        n.value[z] = false;
      });
    }(w, c))) : nextTick(() => {
      M(e.errorInfo);
    });
  }, m = ref(), k = ref();
  function M(w) {
    k.value.error(w);
  }
  return (w, c) => (openBlock(), createElementBlock("div", U0, [createVNode(unref(je2), { gap: w.gap }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(i.value, (h3) => {
    return openBlock(), createElementBlock("div", { class: "m-upload-item", key: h3 }, [createBaseVNode("div", G0, [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-upload-wrap", { "upload-disabled": w.disabled }]), onDragenter: c[1] || (c[1] = withModifiers(() => {
    }, ["stop", "prevent"])), onDragover: c[2] || (c[2] = withModifiers(() => {
    }, ["stop", "prevent"])), onDrop: withModifiers((x) => w.disabled ? () => false : function(y, g) {
      var _;
      const f = (_ = y.dataTransfer) == null ? void 0 : _.files;
      if (f != null && f.length) {
        const F = f.length;
        for (let H = 0; H < F && g + H <= e.maxCount; H++) r(f[H], g + H);
        d.value[g].value = "";
      }
    }(x, h3 - 1), ["stop", "prevent"]), onClick: (x) => w.disabled ? () => false : function(y) {
      d.value[y].click();
    }(h3 - 1) }, [createBaseVNode("input", { ref_for: true, ref_key: "uploadInput", ref: d, type: "file", onClick: c[0] || (c[0] = withModifiers(() => {
    }, ["stop"])), accept: w.accept, multiple: w.multiple, onChange: (x) => function(y, g) {
      const f = y.target.files;
      if (f != null && f.length) {
        const _ = f.length;
        for (let F = 0; F < _ && g + F < e.maxCount; F++) r(f[F], g + F);
        d.value[g].value = "";
      }
    }(x, h3 - 1), style: { display: "none" } }, null, 40, J0), createBaseVNode("div", null, [X0, createBaseVNode("p", Q0, [renderSlot(w.$slots, "default", {}, () => [createTextVNode(toDisplayString(w.tip), 1)], true)])])], 42, Z0), [[vShow, !n.value[h3 - 1] && !o.value[h3 - 1]]]), withDirectives(createBaseVNode("div", es, [createVNode(unref(ye), { class: "u-spin", tip: w.uploadingTip, size: "small", indicator: "dynamic-circle" }, null, 8, ["tip"])], 512), [[vShow, n.value[h3 - 1]]]), o.value[h3 - 1] ? (openBlock(), createElementBlock("div", as, [s(o.value[h3 - 1].url) ? (openBlock(), createBlock(unref(Ye2), { key: 0, ref_for: true, ref_key: "imageRef", ref: m, bordered: false, width: 82, height: 82, src: o.value[h3 - 1].url, name: o.value[h3 - 1].name }, null, 8, ["src", "name"])) : (z = o.value[h3 - 1].url, /\.pdf$/i.test(z) || /^data:application\/pdf/.test(z) ? (openBlock(), createElementBlock("svg", ts, ls)) : (openBlock(), createElementBlock("svg", os, ss))), createBaseVNode("div", ns, [createBaseVNode("a", { class: "m-icon", title: "预览", onClick: (x) => function(y, g) {
      if (console.log("isImage", s(g)), s(g)) {
        const f = o.value.slice(0, y).filter((_) => !s(_.url));
        m.value[y - f.length].onPreview(0);
      } else window.open(g);
    }(h3 - 1, o.value[h3 - 1].url) }, us, 8, is), withDirectives(createBaseVNode("a", { class: "m-icon", title: "删除", onClick: withModifiers((x) => function(y) {
      o.value.length < e.maxCount && i.value--;
      const g = o.value.splice(y, 1);
      p("remove", g), p("update:fileList", o.value), p("change", o.value);
    }(h3 - 1), ["prevent", "stop"]) }, ds, 8, cs), [[vShow, !w.disabled]])])])) : createCommentVNode("", true)])]);
    var z;
  }), 128))]), _: 3 }, 8, ["gap"]), createVNode(unref(Ue), { ref_key: "message", ref: k, duration: 3e3, top: 30 }, null, 512)]));
} });
var Pa2 = W(rs, [["__scopeId", "data-v-dfc0a9cd"]]);
Pa2.install = (t) => {
  t.component(Pa2.__name, Pa2);
};
var vs = ["src", "poster", "width", "height", "autoplay", "controls", "loop", "muted", "preload"];
var ps = [((t) => (pushScopeId("data-v-7ecff17e"), t = t(), popScopeId(), t))(() => createBaseVNode("svg", { class: "u-svg", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 34 34" }, [createBaseVNode("path", { d: `M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039
          C31.913,19.675,31.913,14.325,28.26,11.961z` })], -1))];
var Ka2 = W(defineComponent({ __name: "Video", props: { src: { default: "" }, poster: { default: "" }, second: { default: 0.5 }, width: { default: 800 }, height: { default: 450 }, autoplay: { type: Boolean, default: false }, controls: { type: Boolean, default: true }, loop: { type: Boolean, default: false }, muted: { type: Boolean, default: false }, preload: { default: "metadata" }, showPlay: { type: Boolean, default: true }, fit: { default: "contain" } }, setup(t) {
  const a = t, e = ref(a.poster), o = ref(true), i = ref(false), n = ref();
  function d() {
    var s, p;
    o.value && (n.value.currentTime = 0, o.value = false), a.autoplay ? (s = n.value) == null || s.pause() : (i.value = true, (p = n.value) == null || p.play());
  }
  return onMounted(() => {
    a.autoplay && (i.value = true, o.value = false);
  }), (s, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-video", { "u-video-hover": !i.value }]), style: normalizeStyle(`width: ${s.width}px; height: ${s.height}px;`) }, [createBaseVNode("video", mergeProps({ ref_key: "veo", ref: n, style: `object-fit: ${s.fit};`, src: s.src, poster: e.value, width: s.width, height: s.height, autoplay: s.autoplay, controls: !o.value && s.controls, loop: s.loop, muted: s.autoplay || s.muted, preload: s.preload, crossorigin: "anonymous", onLoadedmetadata: p[0] || (p[0] = (r) => s.poster ? () => false : function() {
    n.value.currentTime = a.second;
    const m = document.createElement("canvas"), k = m.getContext("2d");
    m.width = n.value.videoWidth, m.height = n.value.videoHeight, k == null || k.drawImage(n.value, 0, 0, m.width, m.height), e.value = m.toDataURL("image/png");
  }()), onPause: p[1] || (p[1] = (r) => s.showPlay ? void (i.value = false) : () => false), onPlaying: p[2] || (p[2] = (r) => s.showPlay ? void (i.value = true) : () => false), onClickOnce: withModifiers(d, ["prevent"]) }, s.$attrs), " 您的浏览器不支持video标签。 ", 16, vs), withDirectives(createBaseVNode("span", { class: normalizeClass(["m-icon-play", { hidden: i.value }]) }, ps, 2), [[vShow, o.value || s.showPlay]])], 6));
} }), [["__scopeId", "data-v-7ecff17e"]]);
Ka2.install = (t) => {
  t.component(Ka2.__name, Ka2);
};
var fs = ["src", "alt", "onLoad"];
var hs = defineComponent({ __name: "Waterfall", props: { images: { default: () => [] }, columnCount: { default: 3 }, columnGap: { default: 20 }, width: { default: "100%" }, borderRadius: { default: 8 }, backgroundColor: { default: "#F2F4F8" } }, setup(t) {
  const a = t, e = ref(), o = ref(), i = ref(Array(a.images.length).fill(false)), n = ref(), d = ref([]), s = ref(Array(a.columnCount).fill(0)), p = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), r = computed(() => Math.max(...s.value) + a.columnGap), m = computed(() => a.images.length);
  watch(() => [a.columnCount, a.columnGap, a.width, a.images], () => {
    o.value = e.value.offsetWidth, i.value = Array(a.images.length).fill(false), s.value = Array(a.columnCount).fill(0), M();
  }, { deep: true, flush: "post" }), onMounted(() => {
    o.value = e.value.offsetWidth, M();
  });
  const k = B1(function() {
    const h3 = e.value.offsetWidth;
    a.images.length && h3 !== o.value && (o.value = h3, i.value = Array(m.value).fill(false), M());
  });
  async function M() {
    n.value = (o.value - (a.columnCount + 1) * a.columnGap) / a.columnCount, d.value.splice(0);
    for (let h3 = 0; h3 < m.value; h3++) await w(a.images[h3].src, h3);
  }
  function w(h3, z) {
    return new Promise((x) => {
      const y = new Image();
      y.src = h3, y.onload = function() {
        const g = y.height / (y.width / n.value);
        d.value[z] = { width: n.value, height: g, ...c(z, g) }, x("load");
      };
    });
  }
  function c(h3, z) {
    if (h3 < a.columnCount) return s.value[h3] = a.columnGap + z, { top: a.columnGap, left: (n.value + a.columnGap) * h3 + a.columnGap };
    {
      const x = Math.min(...s.value);
      let y = 0;
      for (let g = 0; g < a.columnCount; g++) if (s.value[g] === x) {
        y = g;
        break;
      }
      return s.value[y] = x + a.columnGap + z, { top: x + a.columnGap, left: (n.value + a.columnGap) * y + a.columnGap };
    }
  }
  return f1(window, "resize", k), (h3, z) => (openBlock(), createElementBlock("div", { class: "m-waterfall", ref_key: "waterfall", ref: e, style: normalizeStyle(`--borderRadius: ${h3.borderRadius}px; background-color: ${h3.backgroundColor}; width: ${p.value}; height: ${r.value}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(d.value, (x, y) => (openBlock(), createBlock(unref(ye), { class: "m-image", style: normalizeStyle(`width: ${x.width}px; height: ${x.height}px; top: ${x && x.top}px; left: ${x && x.left}px;`), spinning: !i.value[y], size: "small", indicator: "dynamic-circle", key: y }, { default: withCtx(() => [createBaseVNode("img", { class: "u-image", src: h3.images[y].src, alt: h3.images[y].title, onLoad: (g) => function(f) {
    i.value[f] = true;
  }(y) }, null, 40, fs)]), _: 2 }, 1032, ["style", "spinning"]))), 128))], 4));
} });
var Ya2 = W(hs, [["__scopeId", "data-v-d1872aa0"]]);
Ya2.install = (t) => {
  t.component(Ya2.__name, Ya2);
};
var Ua2 = defineComponent({ __name: "Watermark", props: { width: { default: void 0 }, height: { default: void 0 }, layout: { default: "alternate" }, rotate: { default: -22 }, zIndex: { default: 9 }, image: { default: void 0 }, content: { default: "" }, fullscreen: { type: Boolean, default: false }, color: { default: "rgba(0,0,0,.15)" }, fontSize: { default: 16 }, fontWeight: { default: "normal" }, fontFamily: { default: "sans-serif" }, fontStyle: { default: "normal" }, gap: { default: () => [100, 100] }, offset: { default: () => [50, 50] } }, setup(t) {
  const a = t, e = shallowRef(), o = shallowRef(), i = shallowRef(document.documentElement), n = shallowRef(false), d = computed(() => {
    var f;
    return ((f = a.gap) == null ? void 0 : f[0]) ?? 100;
  }), s = computed(() => {
    var f;
    return ((f = a.gap) == null ? void 0 : f[1]) ?? 100;
  }), p = computed(() => d.value / 2), r = computed(() => s.value / 2), m = computed(() => {
    var f;
    return ((f = a.offset) == null ? void 0 : f[0]) ?? p.value;
  }), k = computed(() => {
    var f;
    return ((f = a.offset) == null ? void 0 : f[1]) ?? r.value;
  }), M = computed(() => ({ parallel: 1, alternate: 2 })[a.layout]), w = computed(() => {
    const f = { zIndex: a.zIndex ?? 9, position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", backgroundRepeat: "repeat" };
    let _ = m.value - p.value, F = k.value - r.value;
    return _ > 0 && (f.left = `${_}px`, f.width = `calc(100% - ${_}px)`, _ = 0), F > 0 && (f.top = `${F}px`, f.height = `calc(100% - ${F}px)`, F = 0), f.backgroundPosition = `${_}px ${F}px`, f;
  });
  function c() {
    o.value && (o.value.remove(), o.value = void 0);
  }
  function h3(f, _) {
    var H;
    var F;
    e.value && o.value && (n.value = true, o.value.setAttribute("style", (F = { ...w.value, backgroundImage: `url('${f}')`, backgroundSize: (d.value + _) * M.value + "px" }, Object.keys(F).map((D) => `${function(I) {
      return I.replace(/([A-Z])/g, "-$1").toLowerCase();
    }(D)}: ${F[D]};`).join(" "))), a.fullscreen ? (i.value.setAttribute("style", "position: relative"), i.value.append(o.value)) : (H = e.value) == null || H.append(o.value), setTimeout(() => {
      n.value = false;
    }));
  }
  function z() {
    return window.devicePixelRatio || 1;
  }
  function x(f, _, F, H, D) {
    const I = z(), j = a.content, se = a.fontSize, ae = a.fontWeight, _e2 = a.fontFamily, we = a.fontStyle, ue = a.color, ne = Number(se) * I;
    f.font = `${we} normal ${ae} ${ne}px/${D}px ${_e2}`, f.fillStyle = ue, f.textAlign = "center", f.textBaseline = "top", f.translate(H / 2, 0);
    const be = Array.isArray(j) ? j : [j];
    be == null || be.forEach((O, Q) => {
      f.fillText(O ?? "", _, F + Q * (ne + 3 * I));
    });
  }
  function y() {
    const f = document.createElement("canvas"), _ = f.getContext("2d"), F = a.image, H = a.rotate ?? -22;
    if (_) {
      o.value || (o.value = document.createElement("div"));
      const D = z(), [I, j] = function(ee) {
        let xe = 120, Le = 64;
        const Se2 = a.content, E = a.image, fe = a.width, ie = a.height, Me = a.fontSize, Ce2 = a.fontFamily;
        if (!E && ee.measureText) {
          ee.font = `${Number(Me)}px ${Ce2}`;
          const Ae = Array.isArray(Se2) ? Se2 : [Se2], Xe = Ae.map((b1) => ee.measureText(b1).width);
          xe = Math.ceil(Math.max(...Xe)), Le = Number(Me) * Ae.length + 3 * (Ae.length - 1);
        }
        return [fe ?? xe, ie ?? Le];
      }(_), se = (d.value + I) * D, ae = (s.value + j) * D;
      f.setAttribute("width", se * M.value + "px"), f.setAttribute("height", ae * M.value + "px");
      const _e2 = d.value * D / 2, we = s.value * D / 2, ue = I * D, ne = j * D, be = (ue + d.value * D) / 2, O = (ne + s.value * D) / 2, Q = _e2 + se, pe = we + ae, le = be + se, de = O + ae;
      if (_.save(), g(_, be, O, H), F) {
        const ee = new Image();
        ee.onload = () => {
          _.drawImage(ee, _e2, we, ue, ne), _.restore(), g(_, le, de, H), _.drawImage(ee, Q, pe, ue, ne), h3(f.toDataURL(), I);
        }, ee.crossOrigin = "anonymous", ee.referrerPolicy = "no-referrer", ee.src = F;
      } else x(_, _e2, we, ue, ne), _.restore(), g(_, le, de, H), x(_, Q, pe, ue, ne), h3(f.toDataURL(), I);
    }
  }
  function g(f, _, F, H) {
    f.translate(_, F), f.rotate(Math.PI / 180 * Number(H)), f.translate(-_, -F);
  }
  return onMounted(() => {
    y();
  }), watch(() => [a], () => {
    y();
  }, { deep: true, flush: "post" }), onBeforeUnmount(() => {
    c();
  }), function(f, _, F) {
    let H;
    const D = () => {
      H && (H.disconnect(), H = void 0);
    }, I = watch(() => unref(f), (j) => {
      D(), window && j && (H = new MutationObserver(_), H.observe(j, F));
    }, { immediate: true });
  }(a.fullscreen ? i : e, function(f) {
    n.value || f.forEach((_) => {
      (function(F, H) {
        let D = false;
        return F.removedNodes.length && (D = Array.from(F.removedNodes).some((I) => I === H)), F.type === "attributes" && F.target === H && (D = true), D;
      })(_, o.value) && (c(), y());
    });
  }, { subtree: true, childList: true, attributes: true, attributeFilter: ["style", "class"] }), (f, _) => (openBlock(), createElementBlock("div", { ref_key: "containerRef", ref: e, style: { position: "relative" } }, [renderSlot(f.$slots, "default")], 512));
} });
Ua2.install = (t) => {
  t.component(Ua2.__name, Ua2);
};
var ms = [ea, aa2, ta2, la, oa, Fe, sa2, na, ia, ua, ca2, da2, ra, va2, pa, fa2, ha, ma2, ga, ya, Re2, ka, Ye2, wa, ba, Ue, xa, Ma, za2, Ge, _a2, Ca2, $a2, Ba2, Fa, La2, Sa2, Aa2, He2, Ea2, Da, je2, ye, Ha2, Ta2, Ia, ja2, Va2, Wa2, Ra2, Na2, qa2, Oa2, Ke2, Pa2, Ka2, Ya2, Ua2];
var Bs = { install: function(t) {
  ms.forEach((a) => t.component(a.__name, a));
} };
export {
  ea as Alert,
  aa2 as Avatar,
  ta2 as BackTop,
  la as Badge,
  oa as Breadcrumb,
  Fe as Button,
  sa2 as Card,
  na as Carousel,
  ia as Cascader,
  ua as Checkbox,
  ca2 as Col,
  da2 as Collapse,
  ra as Countdown,
  va2 as DatePicker,
  pa as Descriptions,
  fa2 as DescriptionsItem,
  ha as Dialog,
  ma2 as Divider,
  ga as Drawer,
  ya as Ellipsis,
  Re2 as Empty,
  ka as Flex,
  Ye2 as Image,
  wa as Input,
  ba as InputNumber,
  Ue as Message,
  xa as Modal,
  Ma as Notification,
  za2 as NumberAnimation,
  Ge as Pagination,
  _a2 as Popconfirm,
  Ca2 as Popover,
  $a2 as Progress,
  Ba2 as QRCode,
  Fa as Radio,
  La2 as Rate,
  Sa2 as Result,
  Aa2 as Row,
  He2 as Select,
  Ea2 as Skeleton,
  Da as Slider,
  je2 as Space,
  ye as Spin,
  Ha2 as Statistic,
  Ta2 as Steps,
  Ia as Swiper,
  ja2 as Switch,
  Va2 as Table,
  Wa2 as Tabs,
  Ra2 as Tag,
  qa2 as TextScroll,
  Na2 as Textarea,
  Oa2 as Timeline,
  Ke2 as Tooltip,
  Pa2 as Upload,
  Ka2 as Video,
  Ya2 as Waterfall,
  Ua2 as Watermark,
  u1 as add,
  oe as cancelRaf,
  Ms as dateFormat,
  B1 as debounce,
  Bs as default,
  zs as downloadFile,
  p1 as formatNumber,
  ve as rafTimeout,
  e1 as throttle,
  _s as toggleDark,
  f1 as useEventListener,
  $s as useFps,
  Cs as useScrollDirection
};
//# sourceMappingURL=vue-amazing-ui.js.map
