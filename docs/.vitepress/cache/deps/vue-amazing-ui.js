import {
  TransitionPresets,
  isClient,
  toRef as toRef2,
  useTransition
} from "./chunk-EGNQOJEE.js";
import "./chunk-VI5B5WWZ.js";
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
  resolveDynamicComponent,
  shallowRef,
  toDisplayString,
  toRef,
  toValue,
  unref,
  useAttrs,
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
} from "./chunk-5MS2HUDH.js";
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
      return segs.sort(function(s12, s22) {
        return s12.index - s22.index;
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

// node_modules/.pnpm/@vuepic+vue-datepicker@9.0.1_vue@3.4.34/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Et() {
  const e = useAttrs();
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img",
      ...e
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
function Dn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
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
Dn.compatConfig = {
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
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
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
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
Ha.compatConfig = {
  MODE: 3
};
function Ua() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
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
Ua.compatConfig = {
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
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Va.compatConfig = {
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
      class: "dp__icon",
      role: "img"
    },
    [
      createBaseVNode("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
Wa.compatConfig = {
  MODE: 3
};
var qe = (e, t) => t ? new Date(e.toLocaleString("en-US", { timeZone: t })) : new Date(e);
var ja = (e, t, l) => {
  const a = Na(e, t, l);
  return a || G();
};
var cl = (e, t, l) => {
  const a = t.dateInTz ? qe(new Date(e), t.dateInTz) : G(e);
  return l ? Ge(a, true) : a;
};
var Na = (e, t, l) => {
  if (!e) return null;
  const a = l ? Ge(G(e), true) : G(e);
  return t ? t.exactMatch ? cl(e, t, l) : qe(a, t.timezone) : a;
};
var fl = (e) => {
  if (!e) return 0;
  const t = /* @__PURE__ */ new Date(), l = new Date(t.toLocaleString("en-US", { timeZone: "UTC" })), a = new Date(t.toLocaleString("en-US", { timeZone: e })), n = a.getTimezoneOffset() / 60;
  return (+l - +a) / (1e3 * 60 * 60) - n;
};
var nt = ((e) => (e.month = "month", e.year = "year", e))(nt || {});
var Mt = ((e) => (e.top = "top", e.bottom = "bottom", e))(Mt || {});
var Tt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Tt || {});
var He = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(He || {});
var vl = ["timestamp", "date", "iso"];
var je = ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(je || {});
var Pe = ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Pe || {});
function ln(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function ml(e) {
  return (t) => format(qe(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "UTC"), "EEEEEE", { locale: e });
}
var pl = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e !== null)
    try {
      n = a.map(ml(e));
    } catch {
      n = a.map(ln(t));
    }
  else
    n = a.map(ln(t));
  const i = n.slice(0, l), c = n.slice(l + 1, n.length);
  return [n[l]].concat(...c).concat(...i);
};
var Ka = (e, t, l) => {
  const a = [];
  for (let n = +e[0]; n <= +e[1]; n++)
    a.push({ value: +n, text: Tn(n, t) });
  return l ? a.reverse() : a;
};
var Mn = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
    const c = i < 10 ? `0${i}` : i;
    return /* @__PURE__ */ new Date(`2017-${c}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const i = l === "long" ? "LLLL" : "LLL";
      return a.map((c, k) => {
        const v = format(qe(c, "UTC"), i, { locale: e });
        return {
          text: v.charAt(0).toUpperCase() + v.substring(1),
          value: k
        };
      });
    } catch {
    }
  const n = new Intl.DateTimeFormat(t, { month: l, timeZone: "UTC" });
  return a.map((i, c) => {
    const k = n.format(i);
    return {
      text: k.charAt(0).toUpperCase() + k.substring(1),
      value: c
    };
  });
};
var yl = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ie = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var gl = (e) => ({ type: "dot", ...e ?? {} });
var $n = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Ga = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Ye = (e) => e;
var rn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var on = (e) => e === null;
var An = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var hl = (e) => {
  const t = [], l = (a) => a.filter((n) => n);
  for (let a = 0; a < e.length; a += 3) {
    const n = [e[a], e[a + 1], e[a + 2]];
    t.push(l(n));
  }
  return t;
};
var Gt = (e, t, l) => {
  const a = l != null, n = t != null;
  if (!a && !n) return false;
  const i = +l, c = +t;
  return a && n ? +e > i || +e < c : a ? +e > i : n ? +e < c : false;
};
var Yt = (e, t) => hl(e).map((l) => l.map((a) => {
  const { active: n, disabled: i, isBetween: c, highlighted: k } = t(a);
  return {
    ...a,
    active: n,
    disabled: i,
    className: {
      dp__overlay_cell_active: n,
      dp__overlay_cell: !n,
      dp__overlay_cell_disabled: i,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: i && n,
      dp__cell_in_between: c,
      "dp--highlighted": k
    }
  };
}));
var yt = (e, t, l = false) => {
  e && t.allowStopPropagation && (l && e.stopImmediatePropagation(), e.stopPropagation());
};
var bl = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function kl(e, t) {
  let l = [...document.querySelectorAll(bl())];
  l = l.filter((n) => !e.contains(n) || n.hasAttribute("data-datepicker-instance"));
  const a = l.indexOf(e);
  if (a >= 0 && (t ? a - 1 >= 0 : a + 1 <= l.length))
    return l[a + (t ? -1 : 1)];
}
var Ea = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var Tn = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var Qa = (e) => format(e, "dd-MM-yyyy");
var $a = (e) => Array.isArray(e);
var sa = (e, t) => t.get(Qa(e));
var wl = (e, t) => e ? t ? t instanceof Map ? !!sa(e, t) : t(G(e)) : false : true;
var Ke = (e, t, l = false, a) => {
  if (e.key === Pe.enter || e.key === Pe.space)
    return l && e.preventDefault(), t();
  if (a) return a(e);
};
var Dl = () => ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].some(
  (e) => navigator.userAgent.includes(e)
) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
var sn = (e, t, l, a, n, i) => {
  const c = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: i });
  return isValid(c) && isDate(c) ? a || n ? c : set(c, {
    hours: +l.hours,
    minutes: +(l == null ? void 0 : l.minutes),
    seconds: +(l == null ? void 0 : l.seconds),
    milliseconds: 0
  }) : null;
};
var Ml = (e, t, l, a, n, i) => {
  const c = Array.isArray(l) ? l[0] : l;
  if (typeof t == "string")
    return sn(e, t, c, a, n, i);
  if (Array.isArray(t)) {
    let k = null;
    for (const v of t)
      if (k = sn(e, v, c, a, n, i), k)
        break;
    return k;
  }
  return typeof t == "function" ? t(e) : null;
};
var G = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var $l = (e, t, l) => {
  if (t) {
    const n = (e.getMonth() + 1).toString().padStart(2, "0"), i = e.getDate().toString().padStart(2, "0"), c = e.getHours().toString().padStart(2, "0"), k = e.getMinutes().toString().padStart(2, "0"), v = l ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${n}-${i}T${c}:${k}:${v}.000Z`;
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
var Ge = (e, t) => {
  const l = G(JSON.parse(JSON.stringify(e))), a = set(l, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  return t ? startOfMonth(a) : a;
};
var gt = (e, t, l, a) => {
  let n = e ? G(e) : G();
  return (t || t === 0) && (n = setHours(n, +t)), (l || l === 0) && (n = setMinutes(n, +l)), (a || a === 0) && (n = setSeconds(n, +a)), setMilliseconds(n, 0);
};
var Oe = (e, t) => !e || !t ? false : isBefore(Ge(e), Ge(t));
var Me = (e, t) => !e || !t ? false : isEqual(Ge(e), Ge(t));
var Be = (e, t) => !e || !t ? false : isAfter(Ge(e), Ge(t));
var da = (e, t, l) => e != null && e[0] && (e != null && e[1]) ? Be(l, e[0]) && Oe(l, e[1]) : e != null && e[0] && t ? Be(l, e[0]) && Oe(l, t) || Oe(l, e[0]) && Be(l, t) : false;
var lt = (e) => {
  const t = set(new Date(e), { date: 1 });
  return Ge(t);
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
var Sn = (e, t) => {
  if (t) {
    const l = getYear(G(t));
    if (l > e) return 12;
    if (l === e) return getMonth(G(t));
  }
};
var Pn = (e, t) => {
  if (t) {
    const l = getYear(G(t));
    return l < e ? -1 : l === e ? getMonth(G(t)) : void 0;
  }
};
var It = (e) => {
  if (e) return getYear(G(e));
};
var Rn = (e, t) => {
  const l = Be(e, t) ? t : e, a = Be(t, e) ? t : e;
  return eachDayOfInterval({ start: l, end: a });
};
var Al = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var it = (e, t) => {
  const l = startOfWeek(e, { weekStartsOn: +t }), a = endOfWeek(e, { weekStartsOn: +t });
  return [l, a];
};
var Cn = (e, t) => {
  const l = {
    hours: getHours(G()),
    minutes: getMinutes(G()),
    seconds: t ? getSeconds(G()) : 0
  };
  return Object.assign(l, e);
};
var pt = (e, t, l) => [set(G(e), { date: 1 }), set(G(), { month: t, year: l, date: 1 })];
var dt = (e, t, l) => {
  let a = e ? G(e) : G();
  return (t || t === 0) && (a = setMonth(a, t)), l && (a = setYear(a, l)), a;
};
var On = (e, t, l, a, n) => {
  if (!a || n && !t || !n && !l) return false;
  const i = n ? addMonths(e, 1) : subMonths(e, 1), c = [getMonth(i), getYear(i)];
  return n ? !Sl(...c, t) : !Tl(...c, l);
};
var Tl = (e, t, l) => Oe(...pt(l, e, t)) || Me(...pt(l, e, t));
var Sl = (e, t, l) => Be(...pt(l, e, t)) || Me(...pt(l, e, t));
var _n = (e, t, l, a, n, i, c) => {
  if (typeof t == "function" && !c) return t(e);
  const k = l ? { locale: l } : void 0;
  return Array.isArray(e) ? `${format(e[0], i, k)}${n && !e[1] ? "" : a}${e[1] ? format(e[1], i, k) : ""}` : format(e, i, k);
};
var Rt = (e) => {
  if (e) return null;
  throw new Error(Ga.prop("partial-range"));
};
var ta = (e, t) => {
  if (t) return e();
  throw new Error(Ga.prop("range"));
};
var Fa = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var Pl = (e, t) => set(t ?? G(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var Ta = (e, t, l, a) => {
  if (!e) return true;
  if (a) {
    const n = l === "max" ? isBefore(e, t) : isAfter(e, t), i = { seconds: 0, milliseconds: 0 };
    return n || isEqual(set(e, i), set(t, i));
  }
  return l === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
};
var Sa = (e, t, l) => e ? Pl(e, t) : G(l ?? t);
var un = (e, t, l, a, n) => {
  if (Array.isArray(a)) {
    const c = Sa(e, a[0], t), k = Sa(e, a[1], t);
    return Ta(a[0], c, l, !!t) && Ta(a[1], k, l, !!t) && n;
  }
  const i = Sa(e, a, t);
  return Ta(a, i, l, !!t) && n;
};
var Pa = (e) => set(G(), St(e));
var Rl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((l) => getYear(G(l)) === t).map((l) => getMonth(l)) : [];
var Bn = (e, t, l) => typeof e == "function" ? e({ month: t, year: l }) : !!e.months.find((a) => a.month === t && a.year === l);
var qa = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var Yn = (e) => format(e, "yyyy-MM-dd");
var Ht = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var In = () => {
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
var Oa = ref(false);
var _a = ref(false);
var ze = ref(0);
var _e = ref(0);
var bt = () => {
  const e = computed(() => aa.value ? [...Se.selectionGrid, Se.actionRow].filter((f) => f.length) : Ca.value ? [
    ...Se.timePicker[0],
    ...Se.timePicker[1],
    _a.value ? [] : [Ra.value],
    Se.actionRow
  ].filter((f) => f.length) : Oa.value ? [...Se.monthPicker, Se.actionRow] : [Se.monthYear, ...Se.calendar, Se.time, Se.actionRow].filter((f) => f.length)), t = (f) => {
    ze.value = f ? ze.value + 1 : ze.value - 1;
    let B = null;
    e.value[_e.value] && (B = e.value[_e.value][ze.value]), !B && e.value[_e.value + (f ? 1 : -1)] ? (_e.value = _e.value + (f ? 1 : -1), ze.value = f ? 0 : e.value[_e.value].length - 1) : B || (ze.value = f ? ze.value - 1 : ze.value + 1);
  }, l = (f) => {
    if (_e.value === 0 && !f || _e.value === e.value.length && f) return;
    _e.value = f ? _e.value + 1 : _e.value - 1, e.value[_e.value] ? e.value[_e.value] && !e.value[_e.value][ze.value] && ze.value !== 0 && (ze.value = e.value[_e.value].length - 1) : _e.value = f ? _e.value - 1 : _e.value + 1;
  }, a = (f) => {
    let B = null;
    e.value[_e.value] && (B = e.value[_e.value][ze.value]), B ? B.focus({ preventScroll: !aa.value }) : ze.value = f ? ze.value - 1 : ze.value + 1;
  }, n = () => {
    t(true), a(true);
  }, i = () => {
    t(false), a(false);
  }, c = () => {
    l(false), a(true);
  }, k = () => {
    l(true), a(true);
  }, v = (f, B) => {
    Se[B] = f;
  }, L = (f, B) => {
    Se[B] = f;
  }, y = () => {
    ze.value = 0, _e.value = 0;
  };
  return {
    buildMatrix: v,
    buildMultiLevelMatrix: L,
    setTimePickerBackRef: (f) => {
      Ra.value = f;
    },
    setSelectionGrid: (f) => {
      aa.value = f, y(), f || (Se.selectionGrid = []);
    },
    setTimePicker: (f, B = false) => {
      Ca.value = f, _a.value = B, y(), f || (Se.timePicker[0] = [], Se.timePicker[1] = []);
    },
    setTimePickerElements: (f, B = 0) => {
      Se.timePicker[B] = f;
    },
    arrowRight: n,
    arrowLeft: i,
    arrowUp: c,
    arrowDown: k,
    clearArrowNav: () => {
      Se.monthYear = [], Se.calendar = [], Se.time = [], Se.actionRow = [], Se.selectionGrid = [], Se.timePicker[0] = [], Se.timePicker[1] = [], aa.value = false, Ca.value = false, _a.value = false, Oa.value = false, y(), Ra.value = null;
    },
    setMonthPicker: (f) => {
      Oa.value = f, y();
    },
    refSets: Se
    // exposed for testing
  };
};
var dn = (e) => ({
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
var Cl = (e) => ({
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
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
  clearInput: "Clear value",
  calendarIcon: "Calendar icon",
  timePicker: "Time picker",
  monthPicker: (t) => `Month picker${t ? " overlay" : ""}`,
  yearPicker: (t) => `Year picker${t ? " overlay" : ""}`,
  timeOverlay: (t) => `${t} overlay`,
  ...e ?? {}
});
var cn = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var Ol = (e) => {
  const t = typeof e == "object" && e, l = {
    static: true,
    solo: false
  };
  if (!e) return { ...l, count: cn(false) };
  const a = t ? e : {}, n = t ? a.count ?? true : e, i = cn(n);
  return Object.assign(l, a, { count: i });
};
var _l = (e, t, l) => e || (typeof l == "string" ? l : t);
var Bl = (e) => typeof e == "boolean" ? e ? dn({}) : false : dn(e);
var Yl = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: "open",
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var Il = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Nl = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var El = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var Fl = (e) => ({ ...{
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
  timeArrowHoldThreshold: 0,
  shadowDom: false
}, ...e ?? {} });
var Ll = (e) => {
  const t = {
    dates: Array.isArray(e) ? e.map((l) => G(l)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: false }
  };
  return typeof e == "function" ? e : { ...t, ...e ?? {} };
};
var zl = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var Hl = (e) => {
  const t = {
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
  return typeof e == "object" ? { enabled: true, ...t, ...e } : {
    enabled: e,
    ...t
  };
};
var Ul = (e) => e ? typeof e == "string" ? {
  timezone: e,
  exactMatch: false,
  dateInTz: void 0,
  emitTimezone: void 0,
  convertModel: true
} : {
  timezone: e.timezone,
  exactMatch: e.exactMatch ?? false,
  dateInTz: e.dateInTz ?? void 0,
  emitTimezone: e.emitTimezone ?? void 0,
  convertModel: e.convertModel ?? true
} : { timezone: void 0, exactMatch: false, emitTimezone: void 0 };
var Ba = (e, t, l) => new Map(
  e.map((a) => {
    const n = ja(a, t, l);
    return [Qa(n), n];
  })
);
var Vl = (e, t) => e.length ? new Map(
  e.map((l) => {
    const a = ja(l.date, t);
    return [Qa(a), l];
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
    markers: Vl(e.markers, e.timezone)
  };
};
var jl = (e) => typeof e == "boolean" ? { enabled: e, dragSelect: true, limit: null } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? true
};
var Kl = (e) => ({
  ...Object.fromEntries(
    Object.keys(e).map((l) => {
      const a = l, n = e[a], i = typeof e[a] == "string" ? { [n]: true } : Object.fromEntries(n.map((c) => [c, true]));
      return [l, i];
    })
  )
});
var Ce = (e) => {
  const t = () => {
    const oe = e.enableSeconds ? ":ss" : "", X = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${X}${oe}` : `hh${X}${oe} aa`;
  }, l = () => {
    var oe;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((oe = U.value) == null ? void 0 : oe.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, a = (oe) => Cn(oe, e.enableSeconds), n = () => Q.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [a(e.startTime[0]), a(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? a(e.startTime) : null, i = computed(() => Ol(e.multiCalendars)), c = computed(() => n()), k = computed(() => Cl(e.ariaLabels)), v = computed(() => Il(e.filters)), L = computed(() => Bl(e.transitions)), y = computed(() => Nl(e.actionRow)), I = computed(
    () => _l(e.previewFormat, e.format, l())
  ), b = computed(() => Yl(e.textInput)), R = computed(() => El(e.inline)), H = computed(() => Fl(e.config)), E = computed(() => Ll(e.highlight)), U = computed(() => zl(e.weekNumbers)), f = computed(() => Ul(e.timezone)), B = computed(() => jl(e.multiDates)), T = computed(
    () => Wl({
      minDate: e.minDate,
      maxDate: e.maxDate,
      disabledDates: e.disabledDates,
      allowedDates: e.allowedDates,
      highlight: E.value,
      markers: e.markers,
      timezone: f.value,
      isSpecific: e.monthPicker || e.yearPicker || e.quarterPicker
    })
  ), Q = computed(() => Hl(e.range)), te = computed(() => Kl(e.ui));
  return {
    defaultedTransitions: L,
    defaultedMultiCalendars: i,
    defaultedStartTime: c,
    defaultedAriaLabels: k,
    defaultedFilters: v,
    defaultedActionRow: y,
    defaultedPreviewFormat: I,
    defaultedTextInput: b,
    defaultedInline: R,
    defaultedConfig: H,
    defaultedHighlight: E,
    defaultedWeekNumbers: U,
    defaultedRange: Q,
    propDates: T,
    defaultedTz: f,
    defaultedMultiDates: B,
    defaultedUI: te,
    getDefaultPattern: l,
    getDefaultStartTime: n
  };
};
var Gl = (e, t, l) => {
  const a = ref(), { defaultedTextInput: n, defaultedRange: i, defaultedTz: c, defaultedMultiDates: k, getDefaultPattern: v } = Ce(t), L = ref(""), y = toRef(t, "format"), I = toRef(t, "formatLocale");
  watch(
    a,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", a.value, h3(true));
    },
    { deep: true }
  ), watch(i, (s, le) => {
    s.enabled !== le.enabled && (a.value = null);
  }), watch(y, () => {
    K();
  });
  const b = (s) => c.value.timezone && c.value.convertModel ? qe(s, c.value.timezone) : s, R = (s) => {
    if (c.value.timezone && c.value.convertModel) {
      const le = fl(c.value.timezone);
      return addHours(s, le);
    }
    return s;
  }, H = (s, le, pe = false) => _n(
    s,
    t.format,
    t.formatLocale,
    n.value.rangeSeparator,
    t.modelAuto,
    le ?? v(),
    pe
  ), E = (s) => s ? t.modelType ? ne(s) : {
    hours: getHours(s),
    minutes: getMinutes(s),
    seconds: t.enableSeconds ? getSeconds(s) : 0
  } : null, U = (s) => t.modelType ? ne(s) : { month: getMonth(s), year: getYear(s) }, f = (s) => Array.isArray(s) ? k.value.enabled ? s.map((le) => B(le, setYear(G(), le))) : ta(
    () => [
      setYear(G(), s[0]),
      s[1] ? setYear(G(), s[1]) : Rt(i.value.partialRange)
    ],
    i.value.enabled
  ) : setYear(G(), +s), B = (s, le) => (typeof s == "string" || typeof s == "number") && t.modelType ? $(s) : le, T = (s) => Array.isArray(s) ? [
    B(
      s[0],
      gt(null, +s[0].hours, +s[0].minutes, s[0].seconds)
    ),
    B(
      s[1],
      gt(null, +s[1].hours, +s[1].minutes, s[1].seconds)
    )
  ] : B(s, gt(null, s.hours, s.minutes, s.seconds)), Q = (s) => {
    const le = set(G(), { date: 1 });
    return Array.isArray(s) ? k.value.enabled ? s.map((pe) => B(pe, dt(le, +pe.month, +pe.year))) : ta(
      () => [
        B(s[0], dt(le, +s[0].month, +s[0].year)),
        B(
          s[1],
          s[1] ? dt(le, +s[1].month, +s[1].year) : Rt(i.value.partialRange)
        )
      ],
      i.value.enabled
    ) : B(s, dt(le, +s.month, +s.year));
  }, te = (s) => {
    if (Array.isArray(s))
      return s.map((le) => $(le));
    throw new Error(Ga.dateArr("multi-dates"));
  }, oe = (s) => {
    if (Array.isArray(s) && i.value.enabled) {
      const le = s[0], pe = s[1];
      return [
        G(Array.isArray(le) ? le[0] : null),
        G(Array.isArray(pe) ? pe[0] : null)
      ];
    }
    return G(s[0]);
  }, X = (s) => t.modelAuto ? Array.isArray(s) ? [$(s[0]), $(s[1])] : t.autoApply ? [$(s)] : [$(s), null] : Array.isArray(s) ? ta(
    () => s[1] ? [
      $(s[0]),
      s[1] ? $(s[1]) : Rt(i.value.partialRange)
    ] : [$(s[0])],
    i.value.enabled
  ) : $(s), S = () => {
    Array.isArray(a.value) && i.value.enabled && a.value.length === 1 && a.value.push(Rt(i.value.partialRange));
  }, ae = () => {
    const s = a.value;
    return [
      ne(s[0]),
      s[1] ? ne(s[1]) : Rt(i.value.partialRange)
    ];
  }, O = () => a.value[1] ? ae() : ne(Ye(a.value[0])), q = () => (a.value || []).map((s) => ne(s)), ie = (s = false) => (s || S(), t.modelAuto ? O() : k.value.enabled ? q() : Array.isArray(a.value) ? ta(() => ae(), i.value.enabled) : ne(Ye(a.value))), fe = (s) => !s || Array.isArray(s) && !s.length ? null : t.timePicker ? T(Ye(s)) : t.monthPicker ? Q(Ye(s)) : t.yearPicker ? f(Ye(s)) : k.value.enabled ? te(Ye(s)) : t.weekPicker ? oe(Ye(s)) : X(Ye(s)), C = (s) => {
    const le = fe(s);
    Fa(Ye(le)) ? (a.value = Ye(le), K()) : (a.value = null, L.value = "");
  }, P = () => {
    const s = (le) => format(le, n.value.format);
    return `${s(a.value[0])} ${n.value.rangeSeparator} ${a.value[1] ? s(a.value[1]) : ""}`;
  }, x = () => l.value && a.value ? Array.isArray(a.value) ? P() : format(a.value, n.value.format) : H(a.value), m = () => a.value ? k.value.enabled ? a.value.map((s) => H(s)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? x() : H(a.value) : "", K = () => {
    !t.format || typeof t.format == "string" || n.value.enabled && typeof n.value.format == "string" ? L.value = m() : L.value = t.format(a.value);
  }, $ = (s) => {
    if (t.utc) {
      const le = new Date(s);
      return t.utc === "preserve" ? new Date(le.getTime() + le.getTimezoneOffset() * 6e4) : le;
    }
    return t.modelType ? vl.includes(t.modelType) ? b(new Date(s)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? b(
      parse(s, v(), /* @__PURE__ */ new Date(), { locale: I.value })
    ) : b(
      parse(s, t.modelType, /* @__PURE__ */ new Date(), { locale: I.value })
    ) : b(new Date(s));
  }, ne = (s) => s ? t.utc ? $l(s, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +R(s) : t.modelType === "iso" ? R(s).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? H(R(s)) : H(R(s), t.modelType, true) : R(s) : "", de = (s, le = false, pe = false) => {
    if (pe) return s;
    if (e("update:model-value", s), c.value.emitTimezone && le) {
      const M = Array.isArray(s) ? s.map((ge) => qe(Ye(ge), c.value.emitTimezone)) : qe(Ye(s), c.value.emitTimezone);
      e("update:model-timezone-value", M);
    }
  }, d = (s) => Array.isArray(a.value) ? k.value.enabled ? a.value.map((le) => s(le)) : [
    s(a.value[0]),
    a.value[1] ? s(a.value[1]) : Rt(i.value.partialRange)
  ] : s(Ye(a.value)), p = () => {
    if (Array.isArray(a.value)) {
      const s = it(a.value[0], t.weekStart), le = a.value[1] ? it(a.value[1], t.weekStart) : [];
      return [s.map((pe) => G(pe)), le.map((pe) => G(pe))];
    }
    return it(a.value, t.weekStart).map((s) => G(s));
  }, z = (s, le) => de(Ye(d(s)), false, le), u = (s) => {
    const le = p();
    return s ? le : e("update:model-value", p());
  }, h3 = (s = false) => (s || K(), t.monthPicker ? z(U, s) : t.timePicker ? z(E, s) : t.yearPicker ? z(getYear, s) : t.weekPicker ? u(s) : de(ie(s), true, s));
  return {
    inputValue: L,
    internalModelValue: a,
    checkBeforeEmit: () => a.value ? i.value.enabled ? i.value.partialRange ? a.value.length >= 1 : a.value.length === 2 : !!a.value : false,
    parseExternalModelValue: C,
    formatInputValue: K,
    emitModelValue: h3
  };
};
var Ql = (e, t) => {
  const { defaultedFilters: l, propDates: a } = Ce(e), { validateMonthYearInRange: n } = kt(e), i = (y, I) => {
    let b = y;
    return l.value.months.includes(getMonth(b)) ? (b = I ? addMonths(y, 1) : subMonths(y, 1), i(b, I)) : b;
  }, c = (y, I) => {
    let b = y;
    return l.value.years.includes(getYear(b)) ? (b = I ? addYears(y, 1) : subYears(y, 1), c(b, I)) : b;
  }, k = (y, I = false) => {
    const b = set(G(), { month: e.month, year: e.year });
    let R = y ? addMonths(b, 1) : subMonths(b, 1);
    e.disableYearSelect && (R = setYear(R, e.year));
    let H = getMonth(R), E = getYear(R);
    l.value.months.includes(H) && (R = i(R, y), H = getMonth(R), E = getYear(R)), l.value.years.includes(E) && (R = c(R, y), E = getYear(R)), n(H, E, y, e.preventMinMaxNavigation) && v(H, E, I);
  }, v = (y, I, b) => {
    t("update-month-year", { month: y, year: I, fromNav: b });
  }, L = computed(() => (y) => On(
    set(G(), { month: e.month, year: e.year }),
    a.value.maxDate,
    a.value.minDate,
    e.preventMinMaxNavigation,
    y
  ));
  return { handleMonthYearChange: k, isDisabled: L, updateMonthYear: v };
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
  vertical: { type: Boolean, default: false },
  disableMonthYearSelect: { type: Boolean, default: false },
  disableYearSelect: { type: Boolean, default: false },
  dayClass: {
    type: Function,
    default: null
  },
  yearRange: { type: Array, default: () => [1900, 2100] },
  enableTimePicker: { type: Boolean, default: true },
  autoApply: { type: Boolean, default: false },
  disabledDates: { type: [Array, Function], default: () => [] },
  monthNameFormat: { type: String, default: "short" },
  startDate: { type: [Date, String], default: null },
  startTime: { type: [Object, Array], default: null },
  hideOffsetDates: { type: Boolean, default: false },
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
  reverseYears: { type: Boolean, default: false },
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
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
  sixWeeks: { type: [Boolean, String], default: false },
  actionRow: { type: Object, default: () => ({}) },
  focusStartDate: { type: Boolean, default: false },
  disabledTimes: { type: [Function, Array], default: void 0 },
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
var ql = ["title"];
var Xl = ["disabled"];
var Jl = defineComponent({
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
      defaultedPreviewFormat: i,
      defaultedMultiCalendars: c,
      defaultedTextInput: k,
      defaultedInline: v,
      defaultedRange: L,
      defaultedMultiDates: y,
      getDefaultPattern: I
    } = Ce(a), { isTimeValid: b, isMonthValid: R } = kt(a), { buildMatrix: H } = bt(), E = ref(null), U = ref(null), f = ref(false), B = ref({}), T = ref(null), Q = ref(null);
    onMounted(() => {
      a.arrowNavigation && H([Ie(E), Ie(U)], "actionRow"), te(), window.addEventListener("resize", te);
    }), onUnmounted(() => {
      window.removeEventListener("resize", te);
    });
    const te = () => {
      f.value = false, setTimeout(() => {
        var m, K;
        const P = (m = T.value) == null ? void 0 : m.getBoundingClientRect(), x = (K = Q.value) == null ? void 0 : K.getBoundingClientRect();
        P && x && (B.value.maxWidth = `${x.width - P.width - 20}px`), f.value = true;
      }, 0);
    }, oe = computed(() => L.value.enabled && !L.value.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), X = computed(
      () => !b.value(a.internalModelValue) || !R.value(a.internalModelValue) || !oe.value
    ), S = () => {
      const P = i.value;
      return a.timePicker || a.monthPicker, P(Ye(a.internalModelValue));
    }, ae = () => {
      const P = a.internalModelValue;
      return c.value.count > 0 ? `${O(P[0])} - ${O(P[1])}` : [O(P[0]), O(P[1])];
    }, O = (P) => _n(
      P,
      i.value,
      a.formatLocale,
      k.value.rangeSeparator,
      a.modelAuto,
      I()
    ), q = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof i.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? ae() : y.value.enabled ? a.internalModelValue.map((P) => `${O(P)}`) : a.modelAuto ? `${O(a.internalModelValue[0])}` : `${O(a.internalModelValue[0])} -` : O(a.internalModelValue) : S()), ie = () => y.value.enabled ? "; " : " - ", fe = computed(
      () => Array.isArray(q.value) ? q.value.join(ie()) : q.value
    ), C = () => {
      b.value(a.internalModelValue) && R.value(a.internalModelValue) && oe.value ? l("select-date") : l("invalid-select");
    };
    return (P, x) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: Q,
      class: "dp__action_row"
    }, [
      P.$slots["action-row"] ? renderSlot(P.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: P.internalModelValue,
        disabled: X.value,
        selectDate: () => P.$emit("select-date"),
        closePicker: () => P.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(n).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: fe.value,
          style: normalizeStyle(B.value)
        }, [
          P.$slots["action-preview"] && f.value ? renderSlot(P.$slots, "action-preview", {
            key: 0,
            value: P.internalModelValue
          }) : createCommentVNode("", true),
          !P.$slots["action-preview"] && f.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(fe.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, ql)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: T,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          P.$slots["action-buttons"] ? renderSlot(P.$slots, "action-buttons", {
            key: 0,
            value: P.internalModelValue
          }) : createCommentVNode("", true),
          P.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(v).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: E,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: x[0] || (x[0] = (m) => P.$emit("close-picker")),
              onKeydown: x[1] || (x[1] = (m) => unref(Ke)(m, () => P.$emit("close-picker")))
            }, toDisplayString(P.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: x[2] || (x[2] = (m) => P.$emit("select-now")),
              onKeydown: x[3] || (x[3] = (m) => unref(Ke)(m, () => P.$emit("select-now")))
            }, toDisplayString(P.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: U,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: X.value,
              "data-test": "select-button",
              onKeydown: x[4] || (x[4] = (m) => unref(Ke)(m, () => C())),
              onClick: C
            }, toDisplayString(P.selectText), 41, Xl)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
});
var Zl = ["role", "aria-label", "tabindex"];
var xl = { class: "dp__selection_grid_header" };
var er = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"];
var tr = ["aria-label"];
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
    ariaLabels: {},
    overlayLabel: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e, { expose: t, emit: l }) {
    const { setSelectionGrid: a, buildMultiLevelMatrix: n, setMonthPicker: i } = bt(), c = l, k = e, { defaultedAriaLabels: v, defaultedTextInput: L, defaultedConfig: y } = Ce(
      k
    ), { hideNavigationButtons: I } = ma(), b = ref(false), R = ref(null), H = ref(null), E = ref([]), U = ref(), f = ref(null), B = ref(0), T = ref(null);
    onBeforeUpdate(() => {
      R.value = null;
    }), onMounted(() => {
      nextTick().then(() => q()), k.noOverlayFocus || te(), Q(true);
    }), onUnmounted(() => Q(false));
    const Q = (d) => {
      var p;
      k.arrowNavigation && ((p = k.headerRefs) != null && p.length ? i(d) : a(d));
    }, te = () => {
      var p;
      const d = Ie(H);
      d && (L.value.enabled || (R.value ? (p = R.value) == null || p.focus({ preventScroll: true }) : d.focus({ preventScroll: true })), b.value = d.clientHeight < d.scrollHeight);
    }, oe = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !k.useRelative,
        "dp--overlay-relative": k.useRelative
      })
    ), X = computed(
      () => k.useRelative ? { height: `${k.height}px`, width: "260px" } : void 0
    ), S = computed(() => ({
      dp__overlay_col: true
    })), ae = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: b.value,
        dp__button_bottom: k.isLast
      })
    ), O = computed(() => {
      var d, p;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((d = k.items) == null ? void 0 : d.length) <= 6,
        dp__container_block: ((p = k.items) == null ? void 0 : p.length) > 6
      };
    });
    watch(
      () => k.items,
      () => q(false),
      { deep: true }
    );
    const q = (d = true) => {
      nextTick().then(() => {
        const p = Ie(R), z = Ie(H), u = Ie(f), h3 = Ie(T), N = u ? u.getBoundingClientRect().height : 0;
        z && (z.getBoundingClientRect().height ? B.value = z.getBoundingClientRect().height - N : B.value = y.value.modeHeight - N), p && h3 && d && (h3.scrollTop = p.offsetTop - h3.offsetTop - (B.value / 2 - p.getBoundingClientRect().height) - N);
      });
    }, ie = (d) => {
      d.disabled || c("selected", d.value);
    }, fe = () => {
      c("toggle"), c("reset-flow");
    }, C = () => {
      k.escClose && fe();
    }, P = (d, p, z, u) => {
      d && ((p.active || p.value === k.focusValue) && (R.value = d), k.arrowNavigation && (Array.isArray(E.value[z]) ? E.value[z][u] = d : E.value[z] = [d], x()));
    }, x = () => {
      var p, z;
      const d = (p = k.headerRefs) != null && p.length ? [k.headerRefs].concat(E.value) : E.value.concat([k.skipButtonRef ? [] : [f.value]]);
      n(Ye(d), (z = k.headerRefs) != null && z.length ? "monthPicker" : "selectionGrid");
    }, m = (d) => {
      k.arrowNavigation || yt(d, y.value, true);
    }, K = (d) => {
      U.value = d, c("hover-value", d);
    }, $ = () => {
      if (fe(), !k.isLast) {
        const d = Ea(k.menuWrapRef ?? null, "action-row");
        if (d) {
          const p = An(d);
          p == null || p.focus();
        }
      }
    }, ne = (d) => {
      switch (d.key) {
        case Pe.esc:
          return C();
        case Pe.arrowLeft:
          return m(d);
        case Pe.arrowRight:
          return m(d);
        case Pe.arrowUp:
          return m(d);
        case Pe.arrowDown:
          return m(d);
        default:
          return;
      }
    }, de = (d) => {
      if (d.key === Pe.enter) return fe();
      if (d.key === Pe.tab) return $();
    };
    return t({ focusGrid: te }), (d, p) => {
      var z;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: H,
        class: normalizeClass(oe.value),
        style: normalizeStyle(X.value),
        role: d.useRelative ? void 0 : "dialog",
        "aria-label": d.overlayLabel,
        tabindex: d.useRelative ? void 0 : "0",
        onKeydown: ne,
        onClick: p[0] || (p[0] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: T,
          class: normalizeClass(O.value),
          style: normalizeStyle({ "--dp-overlay-height": `${B.value}px` }),
          role: "grid"
        }, [
          createBaseVNode("div", xl, [
            renderSlot(d.$slots, "header")
          ]),
          d.$slots.overlay ? renderSlot(d.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(d.items, (u, h3) => (openBlock(), createElementBlock("div", {
            key: h3,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: d.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(u, (N, s) => (openBlock(), createElementBlock("div", {
              key: N.value,
              ref_for: true,
              ref: (le) => P(le, N, h3, s),
              role: "gridcell",
              class: normalizeClass(S.value),
              "aria-selected": N.active || void 0,
              "aria-disabled": N.disabled || void 0,
              tabindex: "0",
              "data-test": N.text,
              onClick: withModifiers((le) => ie(N), ["prevent"]),
              onKeydown: (le) => unref(Ke)(le, () => ie(N), true),
              onMouseover: (le) => K(N.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(N.className)
              }, [
                d.$slots.item ? renderSlot(d.$slots, "item", {
                  key: 0,
                  item: N
                }) : createCommentVNode("", true),
                d.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(N.text), 1)
                ], 64))
              ], 2)
            ], 42, er))), 128))
          ], 2))), 128))
        ], 6),
        d.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: f,
          type: "button",
          "aria-label": (z = unref(v)) == null ? void 0 : z.toggleOverlay,
          class: normalizeClass(ae.value),
          tabindex: "0",
          onClick: fe,
          onKeydown: de
        }, [
          renderSlot(d.$slots, "button-icon")
        ], 42, tr)), [
          [vShow, !unref(I)(d.hideNavigation, d.type)]
        ]) : createCommentVNode("", true)
      ], 46, Zl);
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
    return (n, i) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !n.stretch,
        "dp--menu--inner-stretched": n.stretch,
        dp__flex_display: n.multiCalendars > 0,
        "dp--flex-display-collapsed": n.collapse
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (c, k) => (openBlock(), createElementBlock("div", {
        key: c,
        class: normalizeClass(a.value)
      }, [
        renderSlot(n.$slots, "default", {
          instance: c,
          index: k
        })
      ], 2))), 128))
    ], 2));
  }
});
var ar = ["data-dp-element", "aria-label", "aria-disabled"];
var Ut = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    elName: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: t }) {
    const l = t, a = ref(null);
    return onMounted(() => l("set-ref", a)), (n, i) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: a,
      type: "button",
      "data-dp-element": n.elName,
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": n.ariaLabel,
      "aria-disabled": n.disabled || void 0,
      onClick: i[0] || (i[0] = (c) => n.$emit("activate")),
      onKeydown: i[1] || (i[1] = (c) => unref(Ke)(c, () => n.$emit("activate"), true))
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: n.disabled }])
      }, [
        renderSlot(n.$slots, "default")
      ], 2)
    ], 40, ar));
  }
});
var nr = ["aria-label", "data-test"];
var Nn = defineComponent({
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
    const l = t, a = e, { showRightIcon: n, showLeftIcon: i } = ma(), { defaultedConfig: c, defaultedMultiCalendars: k, defaultedAriaLabels: v, defaultedTransitions: L, defaultedUI: y } = Ce(a), { showTransition: I, transitionName: b } = Xt(L), R = ref(false), H = (f = false, B) => {
      R.value = !R.value, l("toggle-year-picker", { flow: f, show: B });
    }, E = (f) => {
      R.value = false, l("year-select", f);
    }, U = (f = false) => {
      l("handle-year", f);
    };
    return (f, B) => {
      var T, Q, te, oe, X;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          class: normalizeClass(["dp--year-mode-picker", { "dp--hidden-el": R.value }])
        }, [
          unref(i)(unref(k), e.instance) ? (openBlock(), createBlock(Ut, {
            key: 0,
            ref: "mpPrevIconRef",
            "aria-label": (T = unref(v)) == null ? void 0 : T.prevYear,
            disabled: e.isDisabled(false),
            class: normalizeClass((Q = unref(y)) == null ? void 0 : Q.navBtnPrev),
            onActivate: B[0] || (B[0] = (S) => U(false))
          }, {
            default: withCtx(() => [
              f.$slots["arrow-left"] ? renderSlot(f.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              f.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
          createBaseVNode("button", {
            ref: "mpYearButtonRef",
            class: "dp__btn dp--year-select",
            type: "button",
            "aria-label": `${e.year}-${(te = unref(v)) == null ? void 0 : te.openYearsOverlay}`,
            "data-test": `year-mode-btn-${e.instance}`,
            onClick: B[1] || (B[1] = () => H(false)),
            onKeydown: B[2] || (B[2] = withKeys(() => H(false), ["enter"]))
          }, [
            f.$slots.year ? renderSlot(f.$slots, "year", {
              key: 0,
              year: e.year
            }) : createCommentVNode("", true),
            f.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(e.year), 1)
            ], 64))
          ], 40, nr),
          unref(n)(unref(k), e.instance) ? (openBlock(), createBlock(Ut, {
            key: 1,
            ref: "mpNextIconRef",
            "aria-label": (oe = unref(v)) == null ? void 0 : oe.nextYear,
            disabled: e.isDisabled(true),
            class: normalizeClass((X = unref(y)) == null ? void 0 : X.navBtnNext),
            onActivate: B[3] || (B[3] = (S) => U(true))
          }, {
            default: withCtx(() => [
              f.$slots["arrow-right"] ? renderSlot(f.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
              f.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ha), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true)
        ], 2),
        createVNode(Transition, {
          name: unref(b)(e.showYearPicker),
          css: unref(I)
        }, {
          default: withCtx(() => {
            var S, ae;
            return [
              e.showYearPicker ? (openBlock(), createBlock(qt, {
                key: 0,
                items: e.items,
                "text-input": f.textInput,
                "esc-close": f.escClose,
                config: f.config,
                "is-last": f.autoApply && !unref(c).keepActionRow,
                "hide-navigation": f.hideNavigation,
                "aria-labels": f.ariaLabels,
                "overlay-label": (ae = (S = unref(v)) == null ? void 0 : S.yearPicker) == null ? void 0 : ae.call(S, true),
                type: "year",
                onToggle: H,
                onSelected: B[4] || (B[4] = (O) => E(O))
              }, createSlots({
                "button-icon": withCtx(() => [
                  f.$slots["calendar-icon"] ? renderSlot(f.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                  f.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                ]),
                _: 2
              }, [
                f.$slots["year-overlay-value"] ? {
                  name: "item",
                  fn: withCtx(({ item: O }) => [
                    renderSlot(f.$slots, "year-overlay-value", {
                      text: O.text,
                      value: O.value
                    })
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["items", "text-input", "esc-close", "config", "is-last", "hide-navigation", "aria-labels", "overlay-label"])) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ], 64);
    };
  }
});
var Xa = (e, t, l) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((a) => Me(e, a))) {
      const a = t.value.filter((n) => !Me(n, e));
      t.value = a.length ? a : null;
    } else (l && +l > t.value.length || !l) && t.value.push(e);
  else
    t.value = [e];
};
var Ja = (e, t, l) => {
  let a = e.value ? e.value.slice() : [];
  return a.length === 2 && a[1] !== null && (a = []), a.length ? Oe(t, a[0]) ? (a.unshift(t), l("range-start", a[0]), l("range-start", a[1])) : (a[1] = t, l("range-end", t)) : (a = [t], l("range-start", t)), a;
};
var va = (e, t, l, a) => {
  e && (e[0] && e[1] && l && t("auto-apply"), e[0] && !e[1] && a && l && t("auto-apply"));
};
var En = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => qe(G(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = qe(G(e.value), e.timezone));
};
var Fn = (e, t, l, a) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && a.value.partialRange) ? a.value.fixedStart && (Be(e, t.value[0]) || Me(e, t.value[0])) ? [t.value[0], e] : a.value.fixedEnd && (Oe(e, t.value[1]) || Me(e, t.value[1])) ? [e, t.value[1]] : (l("invalid-fixed-range", e), t.value) : [];
var Ln = ({
  multiCalendars: e,
  range: t,
  highlight: l,
  propDates: a,
  calendars: n,
  modelValue: i,
  props: c,
  filters: k,
  year: v,
  month: L,
  emit: y
}) => {
  const I = computed(() => Ka(c.yearRange, c.locale, c.reverseYears)), b = ref([false]), R = computed(() => (O, q) => {
    const ie = set(lt(/* @__PURE__ */ new Date()), {
      month: L.value(O),
      year: v.value(O)
    }), fe = q ? endOfYear(ie) : startOfYear(ie);
    return On(
      fe,
      a.value.maxDate,
      a.value.minDate,
      c.preventMinMaxNavigation,
      q
    );
  }), H = () => Array.isArray(i.value) && e.value.solo && i.value[1], E = () => {
    for (let O = 0; O < e.value.count; O++)
      if (O === 0)
        n.value[O] = n.value[0];
      else if (O === e.value.count - 1 && H())
        n.value[O] = {
          month: getMonth(i.value[1]),
          year: getYear(i.value[1])
        };
      else {
        const q = set(G(), n.value[O - 1]);
        n.value[O] = { month: getMonth(q), year: getYear(addYears(q, 1)) };
      }
  }, U = (O) => {
    if (!O) return E();
    const q = set(G(), n.value[O]);
    return n.value[0].year = getYear(subYears(q, e.value.count - 1)), E();
  }, f = (O, q) => {
    const ie = differenceInYears(q, O);
    return t.value.showLastInRange && ie > 1 ? q : O;
  }, B = (O) => c.focusStartDate || e.value.solo ? O[0] : O[1] ? f(O[0], O[1]) : O[0], T = () => {
    if (i.value) {
      const O = Array.isArray(i.value) ? B(i.value) : i.value;
      n.value[0] = { month: getMonth(O), year: getYear(O) };
    }
  }, Q = () => {
    T(), e.value.count && E();
  };
  watch(i, (O, q) => {
    c.isTextInputDate && JSON.stringify(O ?? {}) !== JSON.stringify(q ?? {}) && Q();
  }), onMounted(() => {
    Q();
  });
  const te = (O, q) => {
    n.value[q].year = O, y("update-month-year", { instance: q, year: O, month: n.value[q].month }), e.value.count && !e.value.solo && U(q);
  }, oe = computed(() => (O) => Yt(I.value, (q) => {
    var P;
    const ie = v.value(O) === q.value, fe = Gt(
      q.value,
      It(a.value.minDate),
      It(a.value.maxDate)
    ) || ((P = k.value.years) == null ? void 0 : P.includes(v.value(O))), C = qa(l.value, q.value);
    return { active: ie, disabled: fe, highlighted: C };
  })), X = (O, q) => {
    te(O, q), ae(q);
  }, S = (O, q = false) => {
    if (!R.value(O, q)) {
      const ie = q ? v.value(O) + 1 : v.value(O) - 1;
      te(ie, O);
    }
  }, ae = (O, q = false, ie) => {
    q || y("reset-flow"), ie !== void 0 ? b.value[O] = ie : b.value[O] = !b.value[O], b.value[O] ? y("overlay-toggle", { open: true, overlay: He.year }) : (y("overlay-closed"), y("overlay-toggle", { open: false, overlay: He.year }));
  };
  return {
    isDisabled: R,
    groupedYears: oe,
    showYearPicker: b,
    selectYear: te,
    toggleYearPicker: ae,
    handleYearSelect: X,
    handleYear: S
  };
};
var lr = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: i,
    defaultedRange: c,
    defaultedHighlight: k,
    propDates: v,
    defaultedTz: L,
    defaultedFilters: y,
    defaultedMultiDates: I
  } = Ce(e), b = () => {
    e.isTextInputDate && Q(getYear(G(e.startDate)), 0);
  }, { modelValue: R, year: H, month: E, calendars: U } = Jt(e, t, b), f = computed(() => Mn(e.formatLocale, e.locale, e.monthNameFormat)), B = ref(null), { checkMinMaxRange: T } = kt(e), {
    selectYear: Q,
    groupedYears: te,
    showYearPicker: oe,
    toggleYearPicker: X,
    handleYearSelect: S,
    handleYear: ae,
    isDisabled: O
  } = Ln({
    modelValue: R,
    multiCalendars: l,
    range: c,
    highlight: k,
    calendars: U,
    year: H,
    propDates: v,
    month: E,
    filters: y,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (R.value && e.focusStartDate || !R.value) && Q(getYear(G(e.startDate)), 0);
  });
  const q = (h3) => h3 ? { month: getMonth(h3), year: getYear(h3) } : { month: null, year: null }, ie = () => R.value ? Array.isArray(R.value) ? R.value.map((h3) => q(h3)) : q(R.value) : q(), fe = (h3, N) => {
    const s = U.value[h3], le = ie();
    return Array.isArray(le) ? le.some((pe) => pe.year === (s == null ? void 0 : s.year) && pe.month === N) : (s == null ? void 0 : s.year) === le.year && N === le.month;
  }, C = (h3, N, s) => {
    var pe, M;
    const le = ie();
    return Array.isArray(le) ? H.value(N) === ((pe = le[s]) == null ? void 0 : pe.year) && h3 === ((M = le[s]) == null ? void 0 : M.month) : false;
  }, P = (h3, N) => {
    if (c.value.enabled) {
      const s = ie();
      if (Array.isArray(R.value) && Array.isArray(s)) {
        const le = C(h3, N, 0) || C(h3, N, 1), pe = dt(lt(G()), h3, H.value(N));
        return da(R.value, B.value, pe) && !le;
      }
      return false;
    }
    return false;
  }, x = computed(() => (h3) => Yt(f.value, (N) => {
    var ge;
    const s = fe(h3, N.value), le = Gt(
      N.value,
      Sn(H.value(h3), v.value.minDate),
      Pn(H.value(h3), v.value.maxDate)
    ) || Rl(v.value.disabledDates, H.value(h3)).includes(N.value) || ((ge = y.value.months) == null ? void 0 : ge.includes(N.value)), pe = P(N.value, h3), M = Bn(k.value, N.value, H.value(h3));
    return { active: s, disabled: le, isBetween: pe, highlighted: M };
  })), m = (h3, N) => dt(lt(G()), h3, H.value(N)), K = (h3, N) => {
    const s = R.value ? R.value : lt(/* @__PURE__ */ new Date());
    R.value = dt(s, h3, H.value(N)), t("auto-apply"), t("update-flow-step");
  }, $ = (h3, N) => {
    const s = m(h3, N);
    c.value.fixedEnd || c.value.fixedStart ? R.value = Fn(s, R, t, c) : R.value ? T(s, R.value) && (R.value = Ja(R, m(h3, N), t)) : R.value = [m(h3, N)], nextTick().then(() => {
      va(R.value, t, e.autoApply, e.modelAuto);
    });
  }, ne = (h3, N) => {
    Xa(m(h3, N), R, I.value.limit), t("auto-apply", true);
  }, de = (h3, N) => (U.value[N].month = h3, p(N, U.value[N].year, h3), I.value.enabled ? ne(h3, N) : c.value.enabled ? $(h3, N) : K(h3, N)), d = (h3, N) => {
    Q(h3, N), p(N, h3, null);
  }, p = (h3, N, s) => {
    let le = s;
    if (!le && le !== 0) {
      const pe = ie();
      le = Array.isArray(pe) ? pe[h3].month : pe.month;
    }
    t("update-month-year", { instance: h3, year: N, month: le });
  };
  return {
    groupedMonths: x,
    groupedYears: te,
    year: H,
    isDisabled: O,
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: i,
    showYearPicker: oe,
    modelValue: R,
    presetDate: (h3, N) => {
      En({
        value: h3,
        modelValue: R,
        range: c.value.enabled,
        timezone: N ? void 0 : L.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (h3, N) => {
      B.value = m(h3, N);
    },
    selectMonth: de,
    selectYear: d,
    toggleYearPicker: X,
    handleYearSelect: S,
    handleYear: ae,
    getModelMonthYear: ie
  };
};
var rr = defineComponent({
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
    const a = l, n = useSlots(), i = Je(n, "yearMode"), c = e;
    onMounted(() => {
      c.shadow || a("mount", null);
    });
    const {
      groupedMonths: k,
      groupedYears: v,
      year: L,
      isDisabled: y,
      defaultedMultiCalendars: I,
      defaultedConfig: b,
      showYearPicker: R,
      modelValue: H,
      presetDate: E,
      setHoverDate: U,
      selectMonth: f,
      selectYear: B,
      toggleYearPicker: T,
      handleYearSelect: Q,
      handleYear: te,
      getModelMonthYear: oe
    } = lr(c, a);
    return t({ getSidebarProps: () => ({
      modelValue: H,
      year: L,
      getModelMonthYear: oe,
      selectMonth: f,
      selectYear: B,
      handleYear: te
    }), presetDate: E, toggleYearPicker: (S) => T(0, S) }), (S, ae) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(I).count,
      collapse: S.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: O }) => [
        S.$slots["top-extra"] ? renderSlot(S.$slots, "top-extra", {
          key: 0,
          value: S.internalModelValue
        }) : createCommentVNode("", true),
        S.$slots["month-year"] ? renderSlot(S.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(L),
          months: unref(k)(O),
          years: unref(v)(O),
          selectMonth: unref(f),
          selectYear: unref(B),
          instance: O
        }))) : (openBlock(), createBlock(qt, {
          key: 2,
          items: unref(k)(O),
          "arrow-navigation": S.arrowNavigation,
          "is-last": S.autoApply && !unref(b).keepActionRow,
          "esc-close": S.escClose,
          height: unref(b).modeHeight,
          config: S.config,
          "no-overlay-focus": !!(S.noOverlayFocus || S.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (q) => unref(f)(q, O),
          onHoverValue: (q) => unref(U)(q, O)
        }, createSlots({
          header: withCtx(() => [
            createVNode(Nn, mergeProps(S.$props, {
              items: unref(v)(O),
              instance: O,
              "show-year-picker": unref(R)[O],
              year: unref(L)(O),
              "is-disabled": (q) => unref(y)(O, q),
              onHandleYear: (q) => unref(te)(O, q),
              onYearSelect: (q) => unref(Q)(q, O),
              onToggleYearPicker: (q) => unref(T)(O, q == null ? void 0 : q.flow, q == null ? void 0 : q.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(i), (q, ie) => ({
                name: q,
                fn: withCtx((fe) => [
                  renderSlot(S.$slots, q, normalizeProps(guardReactiveProps(fe)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          S.$slots["month-overlay-value"] ? {
            name: "item",
            fn: withCtx(({ item: q }) => [
              renderSlot(S.$slots, "month-overlay-value", {
                text: q.text,
                value: q.value
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
var or = (e, t) => {
  const l = () => {
    e.isTextInputDate && (y.value = getYear(G(e.startDate)));
  }, { modelValue: a } = Jt(e, t, l), n = ref(null), { defaultedHighlight: i, defaultedMultiDates: c, defaultedFilters: k, defaultedRange: v, propDates: L } = Ce(e), y = ref();
  onMounted(() => {
    e.startDate && (a.value && e.focusStartDate || !a.value) && (y.value = getYear(G(e.startDate)));
  });
  const I = (f) => Array.isArray(a.value) ? a.value.some((B) => getYear(B) === f) : a.value ? getYear(a.value) === f : false, b = (f) => v.value.enabled && Array.isArray(a.value) ? da(a.value, n.value, H(f)) : false, R = computed(() => Yt(Ka(e.yearRange, e.locale, e.reverseYears), (f) => {
    const B = I(f.value), T = Gt(
      f.value,
      It(L.value.minDate),
      It(L.value.maxDate)
    ) || k.value.years.includes(f.value), Q = b(f.value) && !B, te = qa(i.value, f.value);
    return { active: B, disabled: T, isBetween: Q, highlighted: te };
  })), H = (f) => setYear(lt(startOfYear(/* @__PURE__ */ new Date())), f);
  return {
    groupedYears: R,
    modelValue: a,
    focusYear: y,
    setHoverValue: (f) => {
      n.value = setYear(lt(/* @__PURE__ */ new Date()), f);
    },
    selectYear: (f) => {
      var B;
      if (t("update-month-year", { instance: 0, year: f }), c.value.enabled)
        return a.value ? Array.isArray(a.value) && (((B = a.value) == null ? void 0 : B.map((Q) => getYear(Q))).includes(f) ? a.value = a.value.filter((Q) => getYear(Q) !== f) : a.value.push(setYear(Ge(G()), f))) : a.value = [setYear(Ge(startOfYear(G())), f)], t("auto-apply", true);
      v.value.enabled ? (a.value = Ja(a, H(f), t), nextTick().then(() => {
        va(a.value, t, e.autoApply, e.modelAuto);
      })) : (a.value = H(f), t("auto-apply"));
    }
  };
};
var sr = defineComponent({
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
    const a = l, n = e, { groupedYears: i, modelValue: c, focusYear: k, selectYear: v, setHoverValue: L } = or(n, a), { defaultedConfig: y } = Ce(n);
    return t({ getSidebarProps: () => ({
      modelValue: c,
      selectYear: v
    }) }), (b, R) => (openBlock(), createElementBlock("div", null, [
      b.$slots["top-extra"] ? renderSlot(b.$slots, "top-extra", {
        key: 0,
        value: b.internalModelValue
      }) : createCommentVNode("", true),
      b.$slots["month-year"] ? renderSlot(b.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(i),
        selectYear: unref(v)
      }))) : (openBlock(), createBlock(qt, {
        key: 2,
        items: unref(i),
        "is-last": b.autoApply && !unref(y).keepActionRow,
        height: unref(y).modeHeight,
        config: b.config,
        "no-overlay-focus": !!(b.noOverlayFocus || b.textInput),
        "focus-value": unref(k),
        type: "year",
        "use-relative": "",
        onSelected: unref(v),
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
var ur = {
  key: 0,
  class: "dp__time_input"
};
var ir = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var dr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var cr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var fr = ["aria-label", "disabled", "data-test", "onKeydown", "onClick"];
var vr = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var mr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var pr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var yr = { key: 0 };
var gr = ["aria-label"];
var hr = defineComponent({
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
    const a = l, n = e, { setTimePickerElements: i, setTimePickerBackRef: c } = bt(), { defaultedAriaLabels: k, defaultedTransitions: v, defaultedFilters: L, defaultedConfig: y, defaultedRange: I } = Ce(n), { transitionName: b, showTransition: R } = Xt(v), H = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), E = ref("AM"), U = ref(null), f = ref([]), B = ref(), T = ref(false);
    onMounted(() => {
      a("mounted");
    });
    const Q = (r) => set(/* @__PURE__ */ new Date(), {
      hours: r.hours,
      minutes: r.minutes,
      seconds: n.enableSeconds ? r.seconds : 0,
      milliseconds: 0
    }), te = computed(
      () => (r) => m(r, n[r]) || X(r, n[r])
    ), oe = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), X = (r, Y) => I.value.enabled && !I.value.disableTimeRangeValidation ? !n.validateTime(r, Y) : false, S = (r, Y) => {
      if (I.value.enabled && !I.value.disableTimeRangeValidation) {
        const _ = Y ? +n[`${r}Increment`] : -+n[`${r}Increment`], V = n[r] + _;
        return !n.validateTime(r, V);
      }
      return false;
    }, ae = computed(() => (r) => !d(+n[r] + +n[`${r}Increment`], r) || S(r, true)), O = computed(() => (r) => !d(+n[r] - +n[`${r}Increment`], r) || S(r, false)), q = (r, Y) => add(set(G(), r), Y), ie = (r, Y) => sub(set(G(), r), Y), fe = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })
    ), C = computed(() => {
      const r = [{ type: "hours" }];
      return n.enableMinutes && r.push({ type: "", separator: true }, {
        type: "minutes"
      }), n.enableSeconds && r.push({ type: "", separator: true }, {
        type: "seconds"
      }), r;
    }), P = computed(() => C.value.filter((r) => !r.separator)), x = computed(() => (r) => {
      if (r === "hours") {
        const Y = s(+n.hours);
        return { text: Y < 10 ? `0${Y}` : `${Y}`, value: Y };
      }
      return { text: n[r] < 10 ? `0${n[r]}` : `${n[r]}`, value: n[r] };
    }), m = (r, Y) => {
      var V;
      if (!n.disabledTimesConfig) return false;
      const _ = n.disabledTimesConfig(n.order, r === "hours" ? Y : void 0);
      return _[r] ? !!((V = _[r]) != null && V.includes(Y)) : true;
    }, K = (r, Y) => Y !== "hours" || E.value === "AM" ? r : r + 12, $ = (r) => {
      const Y = n.is24 ? 24 : 12, _ = r === "hours" ? Y : 60, V = +n[`${r}GridIncrement`], se = r === "hours" && !n.is24 ? V : 0, D = [];
      for (let F = se; F < _; F += V)
        D.push({ value: n.is24 ? F : K(F, r), text: F < 10 ? `0${F}` : `${F}` });
      return r === "hours" && !n.is24 && D.unshift({ value: E.value === "PM" ? 12 : 0, text: "12" }), Yt(D, (F) => ({ active: false, disabled: L.value.times[r].includes(F.value) || !d(F.value, r) || m(r, F.value) || X(r, F.value) }));
    }, ne = (r) => r >= 0 ? r : 59, de = (r) => r >= 0 ? r : 23, d = (r, Y) => {
      const _ = n.minTime ? Q(Aa(n.minTime)) : null, V = n.maxTime ? Q(Aa(n.maxTime)) : null, se = Q(
        Aa(
          oe.value,
          Y,
          Y === "minutes" || Y === "seconds" ? ne(r) : de(r)
        )
      );
      return _ && V ? (isBefore(se, V) || isEqual(se, V)) && (isAfter(se, _) || isEqual(se, _)) : _ ? isAfter(se, _) || isEqual(se, _) : V ? isBefore(se, V) || isEqual(se, V) : true;
    }, p = (r) => n[`no${r[0].toUpperCase() + r.slice(1)}Overlay`], z = (r) => {
      p(r) || (H[r] = !H[r], H[r] ? (T.value = true, a("overlay-opened", r)) : (T.value = false, a("overlay-closed", r)));
    }, u = (r) => r === "hours" ? getHours : r === "minutes" ? getMinutes : getSeconds, h3 = () => {
      B.value && clearTimeout(B.value);
    }, N = (r, Y = true, _) => {
      const V = Y ? q : ie, se = Y ? +n[`${r}Increment`] : -+n[`${r}Increment`];
      d(+n[r] + se, r) && a(
        `update:${r}`,
        u(r)(V({ [r]: +n[r] }, { [r]: +n[`${r}Increment`] }))
      ), !(_ != null && _.keyboard) && y.value.timeArrowHoldThreshold && (B.value = setTimeout(() => {
        N(r, Y);
      }, y.value.timeArrowHoldThreshold));
    }, s = (r) => n.is24 ? r : (r >= 12 ? E.value = "PM" : E.value = "AM", yl(r)), le = () => {
      E.value === "PM" ? (E.value = "AM", a("update:hours", n.hours - 12)) : (E.value = "PM", a("update:hours", n.hours + 12)), a("am-pm-change", E.value);
    }, pe = (r) => {
      H[r] = true;
    }, M = (r, Y, _) => {
      if (r && n.arrowNavigation) {
        Array.isArray(f.value[Y]) ? f.value[Y][_] = r : f.value[Y] = [r];
        const V = f.value.reduce(
          (se, D) => D.map((F, ce2) => [...se[ce2] || [], D[ce2]]),
          []
        );
        c(n.closeTimePickerBtn), U.value && (V[1] = V[1].concat(U.value)), i(V, n.order);
      }
    }, ge = (r, Y) => (z(r), a(`update:${r}`, Y));
    return t({ openChildCmp: pe }), (r, Y) => {
      var _;
      return r.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", ur, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(C.value, (V, se) => {
          var D, F, ce2;
          return openBlock(), createElementBlock("div", {
            key: se,
            class: normalizeClass(fe.value)
          }, [
            V.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              T.value ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(":")
              ], 64))
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => M(he, se, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !r.timePickerInline,
                  dp__inc_dec_button_inline: r.timePickerInline,
                  dp__tp_inline_btn_top: r.timePickerInline,
                  dp__inc_dec_button_disabled: ae.value(V.type),
                  "dp--hidden-el": T.value
                }),
                "data-test": `${V.type}-time-inc-btn-${n.order}`,
                "aria-label": (D = unref(k)) == null ? void 0 : D.incrementValue(V.type),
                tabindex: "0",
                onKeydown: (he) => unref(Ke)(he, () => N(V.type, true, { keyboard: true }), true),
                onClick: (he) => unref(y).timeArrowHoldThreshold ? void 0 : N(V.type, true),
                onMousedown: (he) => unref(y).timeArrowHoldThreshold ? N(V.type, true) : void 0,
                onMouseup: h3
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  r.$slots["tp-inline-arrow-up"] ? renderSlot(r.$slots, "tp-inline-arrow-up", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    dr,
                    cr
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-up"] ? renderSlot(r.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
                ], 64))
              ], 42, ir),
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => M(he, se, 1),
                type: "button",
                "aria-label": `${x.value(V.type).text}-${(F = unref(k)) == null ? void 0 : F.openTpOverlay(V.type)}`,
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !r.timePickerInline,
                  dp__time_display_inline: r.timePickerInline,
                  "dp--time-invalid": te.value(V.type),
                  "dp--time-overlay-btn": !te.value(V.type),
                  "dp--hidden-el": T.value
                }),
                disabled: p(V.type),
                tabindex: "0",
                "data-test": `${V.type}-toggle-overlay-btn-${n.order}`,
                onKeydown: (he) => unref(Ke)(he, () => z(V.type), true),
                onClick: (he) => z(V.type)
              }, [
                r.$slots[V.type] ? renderSlot(r.$slots, V.type, {
                  key: 0,
                  text: x.value(V.type).text,
                  value: x.value(V.type).value
                }) : createCommentVNode("", true),
                r.$slots[V.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(x.value(V.type).text), 1)
                ], 64))
              ], 42, fr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => M(he, se, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !r.timePickerInline,
                  dp__inc_dec_button_inline: r.timePickerInline,
                  dp__tp_inline_btn_bottom: r.timePickerInline,
                  dp__inc_dec_button_disabled: O.value(V.type),
                  "dp--hidden-el": T.value
                }),
                "data-test": `${V.type}-time-dec-btn-${n.order}`,
                "aria-label": (ce2 = unref(k)) == null ? void 0 : ce2.decrementValue(V.type),
                tabindex: "0",
                onKeydown: (he) => unref(Ke)(he, () => N(V.type, false, { keyboard: true }), true),
                onClick: (he) => unref(y).timeArrowHoldThreshold ? void 0 : N(V.type, false),
                onMousedown: (he) => unref(y).timeArrowHoldThreshold ? N(V.type, false) : void 0,
                onMouseup: h3
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  r.$slots["tp-inline-arrow-down"] ? renderSlot(r.$slots, "tp-inline-arrow-down", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    mr,
                    pr
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-down"] ? renderSlot(r.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
                ], 64))
              ], 42, vr)
            ], 64))
          ], 2);
        }), 128)),
        r.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", yr, [
          r.$slots["am-pm-button"] ? renderSlot(r.$slots, "am-pm-button", {
            key: 0,
            toggle: le,
            value: E.value
          }) : createCommentVNode("", true),
          r.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: U,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (_ = unref(k)) == null ? void 0 : _.amPmButton,
            tabindex: "0",
            onClick: le,
            onKeydown: Y[0] || (Y[0] = (V) => unref(Ke)(V, () => le(), true))
          }, toDisplayString(E.value), 41, gr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(P.value, (V, se) => (openBlock(), createBlock(Transition, {
          key: se,
          name: unref(b)(H[V.type]),
          css: unref(R)
        }, {
          default: withCtx(() => {
            var D, F;
            return [
              H[V.type] ? (openBlock(), createBlock(qt, {
                key: 0,
                items: $(V.type),
                "is-last": r.autoApply && !unref(y).keepActionRow,
                "esc-close": r.escClose,
                type: V.type,
                "text-input": r.textInput,
                config: r.config,
                "arrow-navigation": r.arrowNavigation,
                "aria-labels": r.ariaLabels,
                "overlay-label": (F = (D = unref(k)).timeOverlay) == null ? void 0 : F.call(D, V.type),
                onSelected: (ce2) => ge(V.type, ce2),
                onToggle: (ce2) => z(V.type),
                onResetFlow: Y[1] || (Y[1] = (ce2) => r.$emit("reset-flow"))
              }, createSlots({
                "button-icon": withCtx(() => [
                  r.$slots["clock-icon"] ? renderSlot(r.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(r.timePickerInline ? unref(Et) : unref(Ua)), { key: 1 }))
                ]),
                _: 2
              }, [
                r.$slots[`${V.type}-overlay-value`] ? {
                  name: "item",
                  fn: withCtx(({ item: ce2 }) => [
                    renderSlot(r.$slots, `${V.type}-overlay-value`, {
                      text: ce2.text,
                      value: ce2.value
                    })
                  ]),
                  key: "0"
                } : void 0,
                r.$slots[`${V.type}-overlay-header`] ? {
                  name: "header",
                  fn: withCtx(() => [
                    renderSlot(r.$slots, `${V.type}-overlay-header`, {
                      toggle: () => z(V.type)
                    })
                  ]),
                  key: "1"
                } : void 0
              ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "aria-labels", "overlay-label", "onSelected", "onToggle"])) : createCommentVNode("", true)
            ];
          }),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var br = { class: "dp--tp-wrap" };
var kr = ["aria-label", "tabindex"];
var wr = ["role", "aria-label", "tabindex"];
var Dr = ["aria-label"];
var zn = defineComponent({
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
    const a = l, n = e, { buildMatrix: i, setTimePicker: c } = bt(), k = useSlots(), { defaultedTransitions: v, defaultedAriaLabels: L, defaultedTextInput: y, defaultedConfig: I, defaultedRange: b } = Ce(n), { transitionName: R, showTransition: H } = Xt(v), { hideNavigationButtons: E } = ma(), U = ref(null), f = ref(null), B = ref([]), T = ref(null), Q = ref(false);
    onMounted(() => {
      a("mount"), !n.timePicker && n.arrowNavigation ? i([Ie(U.value)], "time") : c(true, n.timePicker);
    });
    const te = computed(() => b.value.enabled && n.modelAuto ? $n(n.internalModelValue) : true), oe = ref(false), X = ($) => ({
      hours: Array.isArray(n.hours) ? n.hours[$] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[$] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[$] : n.seconds
    }), S = computed(() => {
      const $ = [];
      if (b.value.enabled)
        for (let ne = 0; ne < 2; ne++)
          $.push(X(ne));
      else
        $.push(X(0));
      return $;
    }), ae = ($, ne = false, de = "") => {
      ne || a("reset-flow"), oe.value = $, a($ ? "overlay-opened" : "overlay-closed", He.time), n.arrowNavigation && c($), nextTick(() => {
        de !== "" && B.value[0] && B.value[0].openChildCmp(de);
      });
    }, O = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !I.value.keepActionRow
    })), q = Je(k, "timePicker"), ie = ($, ne, de) => b.value.enabled ? ne === 0 ? [$, S.value[1][de]] : [S.value[0][de], $] : $, fe = ($) => {
      a("update:hours", $);
    }, C = ($) => {
      a("update:minutes", $);
    }, P = ($) => {
      a("update:seconds", $);
    }, x = () => {
      if (T.value && !y.value.enabled && !n.noOverlayFocus) {
        const $ = An(T.value);
        $ && $.focus({ preventScroll: true });
      }
    }, m = ($) => {
      Q.value = false, a("overlay-closed", $);
    }, K = ($) => {
      Q.value = true, a("overlay-opened", $);
    };
    return t({ toggleTimePicker: ae }), ($, ne) => {
      var de;
      return openBlock(), createElementBlock("div", br, [
        !$.timePicker && !$.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: U,
          type: "button",
          class: normalizeClass({ ...O.value, "dp--hidden-el": oe.value }),
          "aria-label": (de = unref(L)) == null ? void 0 : de.openTimePicker,
          tabindex: $.noOverlayFocus ? void 0 : 0,
          "data-test": "open-time-picker-btn",
          onKeydown: ne[0] || (ne[0] = (d) => unref(Ke)(d, () => ae(true))),
          onClick: ne[1] || (ne[1] = (d) => ae(true))
        }, [
          $.$slots["clock-icon"] ? renderSlot($.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          $.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ua), { key: 1 }))
        ], 42, kr)), [
          [vShow, !unref(E)($.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(R)(oe.value),
          css: unref(H) && !$.timePickerInline
        }, {
          default: withCtx(() => {
            var d, p;
            return [
              oe.value || $.timePicker || $.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: T,
                role: $.timePickerInline ? void 0 : "dialog",
                class: normalizeClass({
                  dp__overlay: !$.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !$.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle($.timePicker ? { height: `${unref(I).modeHeight}px` } : void 0),
                "aria-label": (d = unref(L)) == null ? void 0 : d.timePicker,
                tabindex: $.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    $.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  $.$slots["time-picker-overlay"] ? renderSlot($.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: fe,
                    setMinutes: C,
                    setSeconds: P
                  }) : createCommentVNode("", true),
                  $.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass($.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(S.value, (z, u) => withDirectives((openBlock(), createBlock(hr, mergeProps({
                      key: u,
                      ref_for: true
                    }, {
                      ...$.$props,
                      order: u,
                      hours: z.hours,
                      minutes: z.minutes,
                      seconds: z.seconds,
                      closeTimePickerBtn: f.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: u === 0 ? unref(b).fixedStart : unref(b).fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: B,
                      "validate-time": (h3, N) => e.validateTime(h3, ie(N, u, h3)),
                      "onUpdate:hours": (h3) => fe(ie(h3, u, "hours")),
                      "onUpdate:minutes": (h3) => C(ie(h3, u, "minutes")),
                      "onUpdate:seconds": (h3) => P(ie(h3, u, "seconds")),
                      onMounted: x,
                      onOverlayClosed: m,
                      onOverlayOpened: K,
                      onAmPmChange: ne[2] || (ne[2] = (h3) => $.$emit("am-pm-change", h3))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(q), (h3, N) => ({
                        name: h3,
                        fn: withCtx((s) => [
                          renderSlot($.$slots, h3, mergeProps({ ref_for: true }, s))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, u === 0 ? true : te.value]
                    ])), 128))
                  ], 2)),
                  !$.timePicker && !$.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: f,
                    type: "button",
                    class: normalizeClass({ ...O.value, "dp--hidden-el": Q.value }),
                    "aria-label": (p = unref(L)) == null ? void 0 : p.closeTimePicker,
                    tabindex: "0",
                    onKeydown: ne[3] || (ne[3] = (z) => unref(Ke)(z, () => ae(false))),
                    onClick: ne[4] || (ne[4] = (z) => ae(false))
                  }, [
                    $.$slots["calendar-icon"] ? renderSlot($.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    $.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                  ], 42, Dr)), [
                    [vShow, !unref(E)($.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, wr)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Hn = (e, t, l, a) => {
  const { defaultedRange: n } = Ce(e), i = (T, Q) => Array.isArray(t[T]) ? t[T][Q] : t[T], c = (T) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[T] : t.seconds : 0, k = (T, Q) => T ? Q !== void 0 ? gt(T, i("hours", Q), i("minutes", Q), c(Q)) : gt(T, t.hours, t.minutes, c()) : setSeconds(G(), c(Q)), v = (T, Q) => {
    t[T] = Q;
  }, L = computed(() => e.modelAuto && n.value.enabled ? Array.isArray(l.value) ? l.value.length > 1 : false : n.value.enabled), y = (T, Q) => {
    const te = Object.fromEntries(
      Object.keys(t).map((oe) => oe === T ? [oe, Q] : [oe, t[oe]].slice())
    );
    if (L.value && !n.value.disableTimeRangeValidation) {
      const oe = (S) => l.value ? gt(
        l.value[S],
        te.hours[S],
        te.minutes[S],
        te.seconds[S]
      ) : null, X = (S) => setMilliseconds(l.value[S], 0);
      return !(Me(oe(0), oe(1)) && (isAfter(oe(0), X(1)) || isBefore(oe(1), X(0))));
    }
    return true;
  }, I = (T, Q) => {
    y(T, Q) && (v(T, Q), a && a());
  }, b = (T) => {
    I("hours", T);
  }, R = (T) => {
    I("minutes", T);
  }, H = (T) => {
    I("seconds", T);
  }, E = (T, Q, te, oe) => {
    Q && b(T), !Q && !te && R(T), te && H(T), l.value && oe(l.value);
  }, U = (T) => {
    if (T) {
      const Q = Array.isArray(T), te = Q ? [+T[0].hours, +T[1].hours] : +T.hours, oe = Q ? [+T[0].minutes, +T[1].minutes] : +T.minutes, X = Q ? [+T[0].seconds, +T[1].seconds] : +T.seconds;
      v("hours", te), v("minutes", oe), e.enableSeconds && v("seconds", X);
    }
  }, f = (T, Q) => {
    const te = {
      hours: Array.isArray(t.hours) ? t.hours[T] : t.hours,
      disabledArr: []
    };
    return (Q || Q === 0) && (te.hours = Q), Array.isArray(e.disabledTimes) && (te.disabledArr = n.value.enabled && Array.isArray(e.disabledTimes[T]) ? e.disabledTimes[T] : e.disabledTimes), te;
  }, B = computed(() => (T, Q) => {
    var te;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: oe, hours: X } = f(T, Q), S = oe.filter((ae) => +ae.hours === X);
      return ((te = S[0]) == null ? void 0 : te.minutes) === "*" ? { hours: [X], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (S == null ? void 0 : S.map((ae) => +ae.minutes)) ?? [],
        seconds: (S == null ? void 0 : S.map((ae) => ae.seconds ? +ae.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: v,
    updateHours: b,
    updateMinutes: R,
    updateSeconds: H,
    getSetDateTime: k,
    updateTimeValues: E,
    getSecondsValue: c,
    assignStartTime: U,
    validateTime: y,
    disabledTimesConfig: B
  };
};
var Mr = (e, t) => {
  const l = () => {
    e.isTextInputDate && Q();
  }, { modelValue: a, time: n } = Jt(e, t, l), { defaultedStartTime: i, defaultedRange: c, defaultedTz: k } = Ce(e), { updateTimeValues: v, getSetDateTime: L, setTime: y, assignStartTime: I, disabledTimesConfig: b, validateTime: R } = Hn(e, n, a, H);
  function H() {
    t("update-flow-step");
  }
  const E = (X) => {
    const { hours: S, minutes: ae, seconds: O } = X;
    return { hours: +S, minutes: +ae, seconds: O ? +O : 0 };
  }, U = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const S = E(e.startTime[0]), ae = E(e.startTime[1]);
        return [set(G(), S), set(G(), ae)];
      }
      const X = E(e.startTime);
      return set(G(), X);
    }
    return c.value.enabled ? [null, null] : null;
  }, f = () => {
    if (c.value.enabled) {
      const [X, S] = U();
      a.value = [
        qe(L(X, 0), k.value.timezone),
        qe(L(S, 1), k.value.timezone)
      ];
    } else
      a.value = qe(L(U()), k.value.timezone);
  }, B = (X) => Array.isArray(X) ? [St(G(X[0])), St(G(X[1]))] : [St(X ?? G())], T = (X, S, ae) => {
    y("hours", X), y("minutes", S), y("seconds", e.enableSeconds ? ae : 0);
  }, Q = () => {
    const [X, S] = B(a.value);
    return c.value.enabled ? T(
      [X.hours, S.hours],
      [X.minutes, S.minutes],
      [X.seconds, S.seconds]
    ) : T(X.hours, X.minutes, X.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return I(i.value), a.value ? Q() : f();
  });
  const te = () => {
    Array.isArray(a.value) ? a.value = a.value.map((X, S) => X && L(X, S)) : a.value = L(a.value), t("time-update");
  };
  return {
    modelValue: a,
    time: n,
    disabledTimesConfig: b,
    updateTime: (X, S = true, ae = false) => {
      v(X, S, ae, te);
    },
    validateTime: R
  };
};
var $r = defineComponent({
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
    const a = l, n = e, i = useSlots(), c = Je(i, "timePicker"), k = ref(null), { time: v, modelValue: L, disabledTimesConfig: y, updateTime: I, validateTime: b } = Mr(n, a);
    return onMounted(() => {
      n.shadow || a("mount", null);
    }), t({ getSidebarProps: () => ({
      modelValue: L,
      time: v,
      updateTime: I
    }), toggleTimePicker: (E, U = false, f = "") => {
      var B;
      (B = k.value) == null || B.toggleTimePicker(E, U, f);
    } }), (E, U) => (openBlock(), createBlock(fa, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(zn, mergeProps({
          ref_key: "tpRef",
          ref: k
        }, E.$props, {
          hours: unref(v).hours,
          minutes: unref(v).minutes,
          seconds: unref(v).seconds,
          "internal-model-value": E.internalModelValue,
          "disabled-times-config": unref(y),
          "validate-time": unref(b),
          "onUpdate:hours": U[0] || (U[0] = (f) => unref(I)(f)),
          "onUpdate:minutes": U[1] || (U[1] = (f) => unref(I)(f, false)),
          "onUpdate:seconds": U[2] || (U[2] = (f) => unref(I)(f, false, true)),
          onAmPmChange: U[3] || (U[3] = (f) => E.$emit("am-pm-change", f)),
          onResetFlow: U[4] || (U[4] = (f) => E.$emit("reset-flow")),
          onOverlayClosed: U[5] || (U[5] = (f) => E.$emit("overlay-toggle", { open: false, overlay: f })),
          onOverlayOpened: U[6] || (U[6] = (f) => E.$emit("overlay-toggle", { open: true, overlay: f }))
        }), createSlots({ _: 2 }, [
          renderList(unref(c), (f, B) => ({
            name: f,
            fn: withCtx((T) => [
              renderSlot(E.$slots, f, normalizeProps(guardReactiveProps(T)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
});
var Ar = { class: "dp--header-wrap" };
var Tr = {
  key: 0,
  class: "dp__month_year_wrap"
};
var Sr = { key: 0 };
var Pr = { class: "dp__month_year_wrap" };
var Rr = ["data-dp-element", "aria-label", "data-test", "onClick", "onKeydown"];
var Cr = defineComponent({
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
      defaultedTransitions: i,
      defaultedAriaLabels: c,
      defaultedMultiCalendars: k,
      defaultedFilters: v,
      defaultedConfig: L,
      defaultedHighlight: y,
      propDates: I,
      defaultedUI: b
    } = Ce(n), { transitionName: R, showTransition: H } = Xt(i), { buildMatrix: E } = bt(), { handleMonthYearChange: U, isDisabled: f, updateMonthYear: B } = Ql(n, a), { showLeftIcon: T, showRightIcon: Q } = ma(), te = ref(false), oe = ref(false), X = ref(false), S = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const ae = (p) => ({
      get: () => n[p],
      set: (z) => {
        const u = p === nt.month ? nt.year : nt.month;
        a("update-month-year", { [p]: z, [u]: n[u] }), p === nt.month ? m(true) : K(true);
      }
    }), O = computed(ae(nt.month)), q = computed(ae(nt.year)), ie = computed(() => (p) => ({
      month: n.month,
      year: n.year,
      items: p === nt.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: B,
      toggle: p === nt.month ? m : K
    })), fe = computed(() => {
      const p = n.months.find((z) => z.value === n.month);
      return p || { text: "", value: 0 };
    }), C = computed(() => Yt(n.months, (p) => {
      const z = n.month === p.value, u = Gt(
        p.value,
        Sn(n.year, I.value.minDate),
        Pn(n.year, I.value.maxDate)
      ) || v.value.months.includes(p.value), h3 = Bn(y.value, p.value, n.year);
      return { active: z, disabled: u, highlighted: h3 };
    })), P = computed(() => Yt(n.years, (p) => {
      const z = n.year === p.value, u = Gt(
        p.value,
        It(I.value.minDate),
        It(I.value.maxDate)
      ) || v.value.years.includes(p.value), h3 = qa(y.value, p.value);
      return { active: z, disabled: u, highlighted: h3 };
    })), x = (p, z, u) => {
      u !== void 0 ? p.value = u : p.value = !p.value, p.value ? (X.value = true, a("overlay-opened", z)) : (X.value = false, a("overlay-closed", z));
    }, m = (p = false, z) => {
      $(p), x(te, He.month, z);
    }, K = (p = false, z) => {
      $(p), x(oe, He.year, z);
    }, $ = (p) => {
      p || a("reset-flow");
    }, ne = (p, z) => {
      n.arrowNavigation && (S.value[z] = Ie(p), E(S.value, "monthYear"));
    }, de = computed(() => {
      var p, z, u, h3, N, s;
      return [
        {
          type: nt.month,
          index: 1,
          toggle: m,
          modelValue: O.value,
          updateModelValue: (le) => O.value = le,
          text: fe.value.text,
          showSelectionGrid: te.value,
          items: C.value,
          ariaLabel: (p = c.value) == null ? void 0 : p.openMonthsOverlay,
          overlayLabel: ((u = (z = c.value).monthPicker) == null ? void 0 : u.call(z, true)) ?? void 0
        },
        {
          type: nt.year,
          index: 2,
          toggle: K,
          modelValue: q.value,
          updateModelValue: (le) => q.value = le,
          text: Tn(n.year, n.locale),
          showSelectionGrid: oe.value,
          items: P.value,
          ariaLabel: (h3 = c.value) == null ? void 0 : h3.openYearsOverlay,
          overlayLabel: ((s = (N = c.value).yearPicker) == null ? void 0 : s.call(N, true)) ?? void 0
        }
      ];
    }), d = computed(() => n.disableYearSelect ? [de.value[0]] : n.yearFirst ? [...de.value].reverse() : de.value);
    return t({
      toggleMonthPicker: m,
      toggleYearPicker: K,
      handleMonthYearChange: U
    }), (p, z) => {
      var u, h3, N, s, le, pe;
      return openBlock(), createElementBlock("div", Ar, [
        p.$slots["month-year"] ? (openBlock(), createElementBlock("div", Tr, [
          renderSlot(p.$slots, "month-year", normalizeProps(guardReactiveProps({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(B), handleMonthYearChange: unref(U), instance: e.instance })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          p.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Sr, [
            renderSlot(p.$slots, "top-extra", { value: p.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", Pr, [
            unref(T)(unref(k), e.instance) && !p.vertical ? (openBlock(), createBlock(Ut, {
              key: 0,
              "aria-label": (u = unref(c)) == null ? void 0 : u.prevMonth,
              disabled: unref(f)(false),
              class: normalizeClass((h3 = unref(b)) == null ? void 0 : h3.navBtnPrev),
              "el-name": "action-prev",
              onActivate: z[0] || (z[0] = (M) => unref(U)(false, true)),
              onSetRef: z[1] || (z[1] = (M) => ne(M, 0))
            }, {
              default: withCtx(() => [
                p.$slots["arrow-left"] ? renderSlot(p.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                p.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: p.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(d.value, (M, ge) => (openBlock(), createElementBlock(Fragment, {
                key: M.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (r) => ne(r, ge + 1),
                  type: "button",
                  "data-dp-element": `overlay-${M.type}`,
                  class: normalizeClass(["dp__btn dp__month_year_select", { "dp--hidden-el": X.value }]),
                  "aria-label": `${M.text}-${M.ariaLabel}`,
                  "data-test": `${M.type}-toggle-overlay-${e.instance}`,
                  onClick: M.toggle,
                  onKeydown: (r) => unref(Ke)(r, () => M.toggle(), true)
                }, [
                  p.$slots[M.type] ? renderSlot(p.$slots, M.type, {
                    key: 0,
                    text: M.text,
                    value: n[M.type]
                  }) : createCommentVNode("", true),
                  p.$slots[M.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(M.text), 1)
                  ], 64))
                ], 42, Rr),
                createVNode(Transition, {
                  name: unref(R)(M.showSelectionGrid),
                  css: unref(H)
                }, {
                  default: withCtx(() => [
                    M.showSelectionGrid ? (openBlock(), createBlock(qt, {
                      key: 0,
                      items: M.items,
                      "arrow-navigation": p.arrowNavigation,
                      "hide-navigation": p.hideNavigation,
                      "is-last": p.autoApply && !unref(L).keepActionRow,
                      "skip-button-ref": false,
                      config: p.config,
                      type: M.type,
                      "header-refs": [],
                      "esc-close": p.escClose,
                      "menu-wrap-ref": p.menuWrapRef,
                      "text-input": p.textInput,
                      "aria-labels": p.ariaLabels,
                      "overlay-label": M.overlayLabel,
                      onSelected: M.updateModelValue,
                      onToggle: M.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        p.$slots["calendar-icon"] ? renderSlot(p.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        p.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      p.$slots[`${M.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: r }) => [
                          renderSlot(p.$slots, `${M.type}-overlay-value`, {
                            text: r.text,
                            value: r.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      p.$slots[`${M.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(p.$slots, `${M.type}-overlay`, mergeProps({ ref_for: true }, ie.value(M.type)))
                        ]),
                        key: "1"
                      } : void 0,
                      p.$slots[`${M.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(p.$slots, `${M.type}-overlay-header`, {
                            toggle: M.toggle
                          })
                        ]),
                        key: "2"
                      } : void 0
                    ]), 1032, ["items", "arrow-navigation", "hide-navigation", "is-last", "config", "type", "esc-close", "menu-wrap-ref", "text-input", "aria-labels", "overlay-label", "onSelected", "onToggle"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["name", "css"])
              ], 64))), 128))
            ], 2),
            unref(T)(unref(k), e.instance) && p.vertical ? (openBlock(), createBlock(Ut, {
              key: 1,
              "aria-label": (N = unref(c)) == null ? void 0 : N.prevMonth,
              "el-name": "action-prev",
              disabled: unref(f)(false),
              class: normalizeClass((s = unref(b)) == null ? void 0 : s.navBtnPrev),
              onActivate: z[2] || (z[2] = (M) => unref(U)(false, true))
            }, {
              default: withCtx(() => [
                p.$slots["arrow-up"] ? renderSlot(p.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                p.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            unref(Q)(unref(k), e.instance) ? (openBlock(), createBlock(Ut, {
              key: 2,
              ref: "rightIcon",
              "el-name": "action-next",
              disabled: unref(f)(true),
              "aria-label": (le = unref(c)) == null ? void 0 : le.nextMonth,
              class: normalizeClass((pe = unref(b)) == null ? void 0 : pe.navBtnNext),
              onActivate: z[3] || (z[3] = (M) => unref(U)(true, true)),
              onSetRef: z[4] || (z[4] = (M) => ne(M, p.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                p.$slots[p.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(p.$slots, p.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                p.$slots[p.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(p.vertical ? unref(Wa) : unref(Ha)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label", "class"])) : createCommentVNode("", true)
          ])
        ], 64))
      ]);
    };
  }
});
var Or = {
  class: "dp__calendar_header",
  role: "row"
};
var _r = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Br = ["aria-label"];
var Yr = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Ir = {
  key: 0,
  class: "dp__calendar_item dp__week_num",
  role: "gridcell"
};
var Nr = { class: "dp__cell_inner" };
var Er = ["id", "aria-pressed", "aria-disabled", "aria-label", "data-test", "onClick", "onTouchend", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
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
    const a = l, n = e, { buildMultiLevelMatrix: i } = bt(), {
      defaultedTransitions: c,
      defaultedConfig: k,
      defaultedAriaLabels: v,
      defaultedMultiCalendars: L,
      defaultedWeekNumbers: y,
      defaultedMultiDates: I,
      defaultedUI: b
    } = Ce(n), R = ref(null), H = ref({
      bottom: "",
      left: "",
      transform: ""
    }), E = ref([]), U = ref(null), f = ref(true), B = ref(""), T = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), Q = ref([]), te = ref({ left: "50%" }), oe = ref(false), X = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), S = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : pl(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: E }), k.value.noSwipe || U.value && (U.value.addEventListener("touchstart", ne, { passive: false }), U.value.addEventListener("touchend", de, { passive: false }), U.value.addEventListener("touchmove", d, { passive: false })), n.monthChangeOnScroll && U.value && U.value.addEventListener("wheel", u, { passive: false });
    });
    const ae = (M) => M ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", O = (M, ge) => {
      if (n.transitions) {
        const r = Ge(dt(G(), n.month, n.year));
        B.value = Be(Ge(dt(G(), M, ge)), r) ? c.value[ae(true)] : c.value[ae(false)], f.value = false, nextTick(() => {
          f.value = true;
        });
      }
    }, q = computed(
      () => ({
        ...b.value.calendar ?? {}
      })
    ), ie = computed(() => (M) => {
      const ge = gl(M);
      return {
        dp__marker_dot: ge.type === "dot",
        dp__marker_line: ge.type === "line"
      };
    }), fe = computed(() => (M) => Me(M, R.value)), C = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: L.value.count > 0 && n.instance !== 0
    })), P = computed(() => (M) => n.hideOffsetDates ? M.current : true), x = async (M, ge) => {
      const { width: r, height: Y } = M.getBoundingClientRect();
      R.value = ge.value;
      let _ = { left: `${r / 2}px` }, V = -50;
      if (await nextTick(), Q.value[0]) {
        const { left: se, width: D } = Q.value[0].getBoundingClientRect();
        se < 0 && (_ = { left: "0" }, V = 0, te.value.left = `${r / 2}px`), window.innerWidth < se + D && (_ = { right: "0" }, V = 0, te.value.left = `${D - r / 2}px`);
      }
      H.value = {
        bottom: `${Y}px`,
        ..._,
        transform: `translateX(${V}%)`
      };
    }, m = async (M, ge, r) => {
      var _, V, se;
      const Y = Ie(E.value[ge][r]);
      Y && ((_ = M.marker) != null && _.customPosition && ((se = (V = M.marker) == null ? void 0 : V.tooltip) != null && se.length) ? H.value = M.marker.customPosition(Y) : await x(Y, M), a("tooltip-open", M.marker));
    }, K = async (M, ge, r) => {
      var Y, _;
      if (oe.value && I.value.enabled && I.value.dragSelect)
        return a("select-date", M);
      a("set-hover-date", M), (_ = (Y = M.marker) == null ? void 0 : Y.tooltip) != null && _.length && await m(M, ge, r);
    }, $ = (M) => {
      R.value && (R.value = null, H.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", M.marker));
    }, ne = (M) => {
      T.value.startX = M.changedTouches[0].screenX, T.value.startY = M.changedTouches[0].screenY;
    }, de = (M) => {
      T.value.endX = M.changedTouches[0].screenX, T.value.endY = M.changedTouches[0].screenY, p();
    }, d = (M) => {
      n.vertical && !n.inline && M.preventDefault();
    }, p = () => {
      const M = n.vertical ? "Y" : "X";
      Math.abs(T.value[`start${M}`] - T.value[`end${M}`]) > 10 && a("handle-swipe", T.value[`start${M}`] > T.value[`end${M}`] ? "right" : "left");
    }, z = (M, ge, r) => {
      M && (Array.isArray(E.value[ge]) ? E.value[ge][r] = M : E.value[ge] = [M]), n.arrowNavigation && i(E.value, "calendar");
    }, u = (M) => {
      n.monthChangeOnScroll && (M.preventDefault(), a("handle-scroll", M));
    }, h3 = (M) => y.value.type === "local" ? getWeek(M.value, { weekStartsOn: +n.weekStart }) : y.value.type === "iso" ? getISOWeek(M.value) : typeof y.value.type == "function" ? y.value.type(M.value) : "", N = (M) => {
      const ge = M[0];
      return y.value.hideOnOffsetDates ? M.some((r) => r.current) ? h3(ge) : "" : h3(ge);
    }, s = (M, ge, r = true) => {
      r && Dl() || I.value.enabled || (yt(M, k.value), a("select-date", ge));
    }, le = (M) => {
      yt(M, k.value);
    }, pe = (M) => {
      I.value.enabled && I.value.dragSelect ? (oe.value = true, a("select-date", M)) : I.value.enabled && a("select-date", M);
    };
    return t({ triggerTransition: O }), (M, ge) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(C.value)
    }, [
      createBaseVNode("div", {
        ref_key: "calendarWrapRef",
        ref: U,
        class: normalizeClass(q.value),
        role: "grid"
      }, [
        createBaseVNode("div", Or, [
          M.weekNumbers ? (openBlock(), createElementBlock("div", _r, toDisplayString(M.weekNumName), 1)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(S.value, (r, Y) => {
            var _, V;
            return openBlock(), createElementBlock("div", {
              key: Y,
              class: "dp__calendar_header_item",
              role: "gridcell",
              "data-test": "calendar-header",
              "aria-label": (V = (_ = unref(v)) == null ? void 0 : _.weekDay) == null ? void 0 : V.call(_, Y)
            }, [
              M.$slots["calendar-header"] ? renderSlot(M.$slots, "calendar-header", {
                key: 0,
                day: r,
                index: Y
              }) : createCommentVNode("", true),
              M.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(r), 1)
              ], 64))
            ], 8, Br);
          }), 128))
        ]),
        Yr,
        createVNode(Transition, {
          name: B.value,
          css: !!M.transitions
        }, {
          default: withCtx(() => [
            f.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "dp__calendar",
              role: "rowgroup",
              onMouseleave: ge[1] || (ge[1] = (r) => oe.value = false)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(X.value, (r, Y) => (openBlock(), createElementBlock("div", {
                key: Y,
                class: "dp__calendar_row",
                role: "row"
              }, [
                M.weekNumbers ? (openBlock(), createElementBlock("div", Ir, [
                  createBaseVNode("div", Nr, toDisplayString(N(r.days)), 1)
                ])) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(r.days, (_, V) => {
                  var se, D, F;
                  return openBlock(), createElementBlock("div", {
                    id: unref(Yn)(_.value),
                    ref_for: true,
                    ref: (ce2) => z(ce2, Y, V),
                    key: V + Y,
                    role: "gridcell",
                    class: "dp__calendar_item",
                    "aria-pressed": (_.classData.dp__active_date || _.classData.dp__range_start || _.classData.dp__range_start) ?? void 0,
                    "aria-disabled": _.classData.dp__cell_disabled || void 0,
                    "aria-label": (D = (se = unref(v)) == null ? void 0 : se.day) == null ? void 0 : D.call(se, _),
                    tabindex: "0",
                    "data-test": _.value,
                    onClick: withModifiers((ce2) => s(ce2, _), ["prevent"]),
                    onTouchend: (ce2) => s(ce2, _, false),
                    onKeydown: (ce2) => unref(Ke)(ce2, () => M.$emit("select-date", _)),
                    onMouseenter: (ce2) => K(_, Y, V),
                    onMouseleave: (ce2) => $(_),
                    onMousedown: (ce2) => pe(_),
                    onMouseup: ge[0] || (ge[0] = (ce2) => oe.value = false)
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__cell_inner", _.classData])
                    }, [
                      M.$slots.day && P.value(_) ? renderSlot(M.$slots, "day", {
                        key: 0,
                        day: +_.text,
                        date: _.value
                      }) : createCommentVNode("", true),
                      M.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createTextVNode(toDisplayString(_.text), 1)
                      ], 64)),
                      _.marker && P.value(_) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                        M.$slots.marker ? renderSlot(M.$slots, "marker", {
                          key: 0,
                          marker: _.marker,
                          day: +_.text,
                          date: _.value
                        }) : (openBlock(), createElementBlock("div", {
                          key: 1,
                          class: normalizeClass(ie.value(_.marker)),
                          style: normalizeStyle(_.marker.color ? { backgroundColor: _.marker.color } : {})
                        }, null, 6))
                      ], 64)) : createCommentVNode("", true),
                      fe.value(_.value) ? (openBlock(), createElementBlock("div", {
                        key: 3,
                        ref_for: true,
                        ref_key: "activeTooltip",
                        ref: Q,
                        class: "dp__marker_tooltip",
                        style: normalizeStyle(H.value)
                      }, [
                        (F = _.marker) != null && F.tooltip ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: "dp__tooltip_content",
                          onClick: le
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_.marker.tooltip, (ce2, he) => (openBlock(), createElementBlock("div", {
                            key: he,
                            class: "dp__tooltip_text"
                          }, [
                            M.$slots["marker-tooltip"] ? renderSlot(M.$slots, "marker-tooltip", {
                              key: 0,
                              tooltip: ce2,
                              day: _.value
                            }) : createCommentVNode("", true),
                            M.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createBaseVNode("div", {
                                class: "dp__tooltip_mark",
                                style: normalizeStyle(ce2.color ? { backgroundColor: ce2.color } : {})
                              }, null, 4),
                              createBaseVNode("div", null, toDisplayString(ce2.text), 1)
                            ], 64))
                          ]))), 128)),
                          createBaseVNode("div", {
                            class: "dp__arrow_bottom_tp",
                            style: normalizeStyle(te.value)
                          }, null, 4)
                        ])) : createCommentVNode("", true)
                      ], 4)) : createCommentVNode("", true)
                    ], 2)
                  ], 40, Er);
                }), 128))
              ]))), 128))
            ], 32)) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ], 2)
    ], 2));
  }
});
var fn = (e) => Array.isArray(e);
var Lr = (e, t, l, a) => {
  const n = ref([]), i = ref(/* @__PURE__ */ new Date()), c = ref(), k = () => ne(e.isTextInputDate), { modelValue: v, calendars: L, time: y, today: I } = Jt(e, t, k), {
    defaultedMultiCalendars: b,
    defaultedStartTime: R,
    defaultedRange: H,
    defaultedConfig: E,
    defaultedTz: U,
    propDates: f,
    defaultedMultiDates: B
  } = Ce(e), { validateMonthYearInRange: T, isDisabled: Q, isDateRangeAllowed: te, checkMinMaxRange: oe } = kt(e), { updateTimeValues: X, getSetDateTime: S, setTime: ae, assignStartTime: O, validateTime: q, disabledTimesConfig: ie } = Hn(e, y, v, a), fe = computed(
    () => (w) => L.value[w] ? L.value[w].month : 0
  ), C = computed(
    () => (w) => L.value[w] ? L.value[w].year : 0
  ), P = (w) => !E.value.keepViewOnOffsetClick || w ? true : !c.value, x = (w, g, W3, re = false) => {
    var Ae, Fe2;
    P(re) && (L.value[w] || (L.value[w] = { month: 0, year: 0 }), L.value[w].month = on(g) ? (Ae = L.value[w]) == null ? void 0 : Ae.month : g, L.value[w].year = on(W3) ? (Fe2 = L.value[w]) == null ? void 0 : Fe2.year : W3);
  }, m = () => {
    e.autoApply && t("select-date");
  };
  onMounted(() => {
    e.shadow || (v.value || (M(), R.value && O(R.value)), ne(true), e.focusStartDate && e.startDate && M());
  });
  const K = computed(() => {
    var w;
    return (w = e.flow) != null && w.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), $ = () => {
    e.autoApply && K.value && t("auto-apply", e.partialFlow ? e.flowStep !== e.flow.length : false);
  }, ne = (w = false) => {
    if (v.value)
      return Array.isArray(v.value) ? (n.value = v.value, N(w)) : p(v.value, w);
    if (b.value.count && w && !e.startDate)
      return d(G(), w);
  }, de = () => Array.isArray(v.value) && H.value.enabled ? getMonth(v.value[0]) === getMonth(v.value[1] ?? v.value[0]) : false, d = (w = /* @__PURE__ */ new Date(), g = false) => {
    if ((!b.value.count || !b.value.static || g) && x(0, getMonth(w), getYear(w)), b.value.count && (!b.value.solo || !v.value || de()))
      for (let W3 = 1; W3 < b.value.count; W3++) {
        const re = set(G(), { month: fe.value(W3 - 1), year: C.value(W3 - 1) }), Ae = add(re, { months: 1 });
        L.value[W3] = { month: getMonth(Ae), year: getYear(Ae) };
      }
  }, p = (w, g) => {
    d(w), ae("hours", getHours(w)), ae("minutes", getMinutes(w)), ae("seconds", getSeconds(w)), b.value.count && g && pe();
  }, z = (w) => {
    if (b.value.count) {
      if (b.value.solo) return 0;
      const g = getMonth(w[0]), W3 = getMonth(w[1]);
      return Math.abs(W3 - g) < b.value.count ? 0 : 1;
    }
    return 1;
  }, u = (w, g) => {
    w[1] && H.value.showLastInRange ? d(w[z(w)], g) : d(w[0], g);
    const W3 = (re, Ae) => [
      re(w[0]),
      w[1] ? re(w[1]) : y[Ae][1]
    ];
    ae("hours", W3(getHours, "hours")), ae("minutes", W3(getMinutes, "minutes")), ae("seconds", W3(getSeconds, "seconds"));
  }, h3 = (w, g) => {
    if ((H.value.enabled || e.weekPicker) && !B.value.enabled)
      return u(w, g);
    if (B.value.enabled && g) {
      const W3 = w[w.length - 1];
      return p(W3, g);
    }
  }, N = (w) => {
    const g = v.value;
    h3(g, w), b.value.count && b.value.solo && pe();
  }, s = (w, g) => {
    const W3 = set(G(), { month: fe.value(g), year: C.value(g) }), re = w < 0 ? addMonths(W3, 1) : subMonths(W3, 1);
    T(getMonth(re), getYear(re), w < 0, e.preventMinMaxNavigation) && (x(g, getMonth(re), getYear(re)), t("update-month-year", { instance: g, month: getMonth(re), year: getYear(re) }), b.value.count && !b.value.solo && le(g), l());
  }, le = (w) => {
    for (let g = w - 1; g >= 0; g--) {
      const W3 = subMonths(set(G(), { month: fe.value(g + 1), year: C.value(g + 1) }), 1);
      x(g, getMonth(W3), getYear(W3));
    }
    for (let g = w + 1; g <= b.value.count - 1; g++) {
      const W3 = addMonths(set(G(), { month: fe.value(g - 1), year: C.value(g - 1) }), 1);
      x(g, getMonth(W3), getYear(W3));
    }
  }, pe = () => {
    if (Array.isArray(v.value) && v.value.length === 2) {
      const w = G(
        G(v.value[1] ? v.value[1] : addMonths(v.value[0], 1))
      ), [g, W3] = [getMonth(v.value[0]), getYear(v.value[0])], [re, Ae] = [getMonth(v.value[1]), getYear(v.value[1])];
      (g !== re || g === re && W3 !== Ae) && b.value.solo && x(1, getMonth(w), getYear(w));
    } else v.value && !Array.isArray(v.value) && (x(0, getMonth(v.value), getYear(v.value)), d(G()));
  }, M = () => {
    e.startDate && (x(0, getMonth(G(e.startDate)), getYear(G(e.startDate))), b.value.count && le(0));
  }, ge = (w, g) => {
    if (e.monthChangeOnScroll) {
      const W3 = (/* @__PURE__ */ new Date()).getTime() - i.value.getTime(), re = Math.abs(w.deltaY);
      let Ae = 500;
      re > 1 && (Ae = 100), re > 100 && (Ae = 0), W3 > Ae && (i.value = /* @__PURE__ */ new Date(), s(e.monthChangeOnScroll !== "inverse" ? -w.deltaY : w.deltaY, g));
    }
  }, r = (w, g, W3 = false) => {
    e.monthChangeOnArrows && e.vertical === W3 && Y(w, g);
  }, Y = (w, g) => {
    s(w === "right" ? -1 : 1, g);
  }, _ = (w) => {
    if (f.value.markers)
      return sa(w.value, f.value.markers);
  }, V = (w, g) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [w == 0, true];
      case "fair":
        return [w == 0 || g > w, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, se = (w, g, W3, re) => {
    if (e.sixWeeks && w.length < 6) {
      const Ae = 6 - w.length, Fe2 = (g.getDay() + 7 - re) % 7, xt2 = 6 - (W3.getDay() + 7 - re) % 7, [zt2, Da2] = V(Fe2, xt2);
      for (let Dt2 = 1; Dt2 <= Ae; Dt2++)
        if (Da2 ? !!(Dt2 % 2) == zt2 : zt2) {
          const ea = w[0].days[0], Ma2 = D(addDays(ea.value, -7), getMonth(g));
          w.unshift({ days: Ma2 });
        } else {
          const ea = w[w.length - 1], Ma2 = ea.days[ea.days.length - 1], Vn2 = D(addDays(Ma2.value, 1), getMonth(g));
          w.push({ days: Vn2 });
        }
    }
    return w;
  }, D = (w, g) => {
    const W3 = G(w), re = [];
    for (let Ae = 0; Ae < 7; Ae++) {
      const Fe2 = addDays(W3, Ae), wt2 = getMonth(Fe2) !== g;
      re.push({
        text: e.hideOffsetDates && wt2 ? "" : Fe2.getDate(),
        value: Fe2,
        current: !wt2,
        classData: {}
      });
    }
    return re;
  }, F = (w, g) => {
    const W3 = [], re = new Date(g, w), Ae = new Date(g, w + 1, 0), Fe2 = e.weekStart, wt2 = startOfWeek(re, { weekStartsOn: Fe2 }), xt2 = (zt2) => {
      const Da2 = D(zt2, w);
      if (W3.push({ days: Da2 }), !W3[W3.length - 1].days.some(
        (Dt2) => Me(Ge(Dt2.value), Ge(Ae))
      )) {
        const Dt2 = addDays(zt2, 7);
        xt2(Dt2);
      }
    };
    return xt2(wt2), se(W3, re, Ae, Fe2);
  }, ce2 = (w) => {
    const g = gt(G(w.value), y.hours, y.minutes, Xe2());
    t("date-update", g), B.value.enabled ? Xa(g, v, B.value.limit) : v.value = g, a(), nextTick().then(() => {
      $();
    });
  }, he = (w) => H.value.noDisabledRange ? Rn(n.value[0], w).some((W3) => Q(W3)) : false, et2 = () => {
    n.value = v.value ? v.value.slice() : [], n.value.length === 2 && !(H.value.fixedStart || H.value.fixedEnd) && (n.value = []);
  }, ve = (w, g) => {
    const W3 = [
      G(w.value),
      addDays(G(w.value), +H.value.autoRange)
    ];
    te(W3) ? (g && vt2(w.value), n.value = W3) : t("invalid-date", w.value);
  }, vt2 = (w) => {
    const g = getMonth(G(w)), W3 = getYear(G(w));
    if (x(0, g, W3), b.value.count > 0)
      for (let re = 1; re < b.value.count; re++) {
        const Ae = Al(
          set(G(w), { year: C.value(re - 1), month: fe.value(re - 1) })
        );
        x(re, Ae.month, Ae.year);
      }
  }, ot2 = (w) => {
    if (he(w.value) || !oe(w.value, v.value, H.value.fixedStart ? 0 : 1))
      return t("invalid-date", w.value);
    n.value = Fn(G(w.value), v, t, H);
  }, Ft2 = (w, g) => {
    if (et2(), H.value.autoRange) return ve(w, g);
    if (H.value.fixedStart || H.value.fixedEnd) return ot2(w);
    n.value[0] ? oe(G(w.value), v.value) && !he(w.value) ? Oe(G(w.value), G(n.value[0])) ? (n.value.unshift(G(w.value)), t("range-end", n.value[0])) : (n.value[1] = G(w.value), t("range-end", n.value[1])) : (e.autoApply && t("auto-apply-invalid", w.value), t("invalid-date", w.value)) : (n.value[0] = G(w.value), t("range-start", n.value[0]));
  }, Xe2 = (w = true) => e.enableSeconds ? Array.isArray(y.seconds) ? w ? y.seconds[0] : y.seconds[1] : y.seconds : 0, Lt2 = (w) => {
    n.value[w] = gt(
      n.value[w],
      y.hours[w],
      y.minutes[w],
      Xe2(w !== 1)
    );
  }, pa2 = () => {
    var w, g;
    n.value[0] && n.value[1] && +((w = n.value) == null ? void 0 : w[0]) > +((g = n.value) == null ? void 0 : g[1]) && (n.value.reverse(), t("range-start", n.value[0]), t("range-end", n.value[1]));
  }, Zt2 = () => {
    n.value.length && (n.value[0] && !n.value[1] ? Lt2(0) : (Lt2(0), Lt2(1), a()), pa2(), v.value = n.value.slice(), va(n.value, t, e.autoApply, e.modelAuto));
  }, ya2 = (w, g = false) => {
    if (Q(w.value) || !w.current && e.hideOffsetDates) return t("invalid-date", w.value);
    if (c.value = JSON.parse(JSON.stringify(w)), !H.value.enabled) return ce2(w);
    fn(y.hours) && fn(y.minutes) && !B.value.enabled && (Ft2(w, g), Zt2());
  }, ga2 = (w, g) => {
    var re;
    x(w, g.month, g.year, true), b.value.count && !b.value.solo && le(w), t("update-month-year", { instance: w, month: g.month, year: g.year }), l(b.value.solo ? w : void 0);
    const W3 = (re = e.flow) != null && re.length ? e.flow[e.flowStep] : void 0;
    !g.fromNav && (W3 === He.month || W3 === He.year) && a();
  }, ha2 = (w, g) => {
    En({
      value: w,
      modelValue: v,
      range: H.value.enabled,
      timezone: g ? void 0 : U.value.timezone
    }), m(), e.multiCalendars && nextTick().then(() => ne(true));
  }, ba2 = () => {
    const w = ja(G(), U.value);
    H.value.enabled ? v.value && Array.isArray(v.value) && v.value[0] ? v.value = Oe(w, v.value[0]) ? [w, v.value[0]] : [v.value[0], w] : v.value = [w] : v.value = w, m();
  }, ka2 = () => {
    if (Array.isArray(v.value))
      if (B.value.enabled) {
        const w = wa2();
        v.value[v.value.length - 1] = S(w);
      } else
        v.value = v.value.map((w, g) => w && S(w, g));
    else
      v.value = S(v.value);
    t("time-update");
  }, wa2 = () => Array.isArray(v.value) && v.value.length ? v.value[v.value.length - 1] : null;
  return {
    calendars: L,
    modelValue: v,
    month: fe,
    year: C,
    time: y,
    disabledTimesConfig: ie,
    today: I,
    validateTime: q,
    getCalendarDays: F,
    getMarker: _,
    handleScroll: ge,
    handleSwipe: Y,
    handleArrow: r,
    selectDate: ya2,
    updateMonthYear: ga2,
    presetDate: ha2,
    selectCurrentDate: ba2,
    updateTime: (w, g = true, W3 = false) => {
      X(w, g, W3, ka2);
    },
    assignMonthAndYear: d
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
      calendars: i,
      month: c,
      year: k,
      modelValue: v,
      time: L,
      disabledTimesConfig: y,
      today: I,
      validateTime: b,
      getCalendarDays: R,
      getMarker: H,
      handleArrow: E,
      handleScroll: U,
      handleSwipe: f,
      selectDate: B,
      updateMonthYear: T,
      presetDate: Q,
      selectCurrentDate: te,
      updateTime: oe,
      assignMonthAndYear: X
    } = Lr(n, a, de, d), S = useSlots(), { setHoverDate: ae, getDayClassData: O, clearHoverDate: q } = lo(v, n), { defaultedMultiCalendars: ie } = Ce(n), fe = ref([]), C = ref([]), P = ref(null), x = Je(S, "calendar"), m = Je(S, "monthYear"), K = Je(S, "timePicker"), $ = (r) => {
      n.shadow || a("mount", r);
    };
    watch(
      i,
      () => {
        n.shadow || setTimeout(() => {
          a("recalculate-position");
        }, 0);
      },
      { deep: true }
    ), watch(
      ie,
      (r, Y) => {
        r.count - Y.count > 0 && X();
      },
      { deep: true }
    );
    const ne = computed(() => (r) => R(c.value(r), k.value(r)).map((Y) => ({
      ...Y,
      days: Y.days.map((_) => (_.marker = H(_), _.classData = O(_), _))
    })));
    function de(r) {
      var Y;
      r || r === 0 ? (Y = C.value[r]) == null || Y.triggerTransition(c.value(r), k.value(r)) : C.value.forEach((_, V) => _.triggerTransition(c.value(V), k.value(V)));
    }
    function d() {
      a("update-flow-step");
    }
    const p = (r, Y = false) => {
      B(r, Y), n.spaceConfirm && a("select-date");
    }, z = (r, Y, _ = 0) => {
      var V;
      (V = fe.value[_]) == null || V.toggleMonthPicker(r, Y);
    }, u = (r, Y, _ = 0) => {
      var V;
      (V = fe.value[_]) == null || V.toggleYearPicker(r, Y);
    }, h3 = (r, Y, _) => {
      var V;
      (V = P.value) == null || V.toggleTimePicker(r, Y, _);
    }, N = (r, Y) => {
      var _;
      if (!n.range) {
        const V = v.value ? v.value : I, se = Y ? new Date(Y) : V, D = r ? startOfWeek(se, { weekStartsOn: 1 }) : endOfWeek(se, { weekStartsOn: 1 });
        B({
          value: D,
          current: getMonth(se) === c.value(0),
          text: "",
          classData: {}
        }), (_ = document.getElementById(Yn(D))) == null || _.focus();
      }
    }, s = (r) => {
      var Y;
      (Y = fe.value[0]) == null || Y.handleMonthYearChange(r, true);
    }, le = (r) => {
      T(0, { month: c.value(0), year: k.value(0) + (r ? 1 : -1), fromNav: true });
    }, pe = (r, Y) => {
      r === He.time && a(`time-picker-${Y ? "open" : "close"}`), a("overlay-toggle", { open: Y, overlay: r });
    }, M = (r) => {
      a("overlay-toggle", { open: false, overlay: r }), a("focus-menu");
    };
    return t({
      clearHoverDate: q,
      presetDate: Q,
      selectCurrentDate: te,
      toggleMonthPicker: z,
      toggleYearPicker: u,
      toggleTimePicker: h3,
      handleArrow: E,
      updateMonthYear: T,
      getSidebarProps: () => ({
        modelValue: v,
        month: c,
        year: k,
        time: L,
        updateTime: oe,
        updateMonthYear: T,
        selectDate: B,
        presetDate: Q
      }),
      changeMonth: s,
      changeYear: le,
      selectWeekDate: N
    }), (r, Y) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(fa, {
        "multi-calendars": unref(ie).count,
        collapse: r.collapse
      }, {
        default: withCtx(({ instance: _, index: V }) => [
          r.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Cr, mergeProps({
            key: 0,
            ref: (se) => {
              se && (fe.value[V] = se);
            },
            months: unref(Mn)(r.formatLocale, r.locale, r.monthNameFormat),
            years: unref(Ka)(r.yearRange, r.locale, r.reverseYears),
            month: unref(c)(_),
            year: unref(k)(_),
            instance: _
          }, r.$props, {
            onMount: Y[0] || (Y[0] = (se) => $(unref(Tt).header)),
            onResetFlow: Y[1] || (Y[1] = (se) => r.$emit("reset-flow")),
            onUpdateMonthYear: (se) => unref(T)(_, se),
            onOverlayClosed: M,
            onOverlayOpened: Y[2] || (Y[2] = (se) => r.$emit("overlay-toggle", { open: true, overlay: se }))
          }), createSlots({ _: 2 }, [
            renderList(unref(m), (se, D) => ({
              name: se,
              fn: withCtx((F) => [
                renderSlot(r.$slots, se, normalizeProps(guardReactiveProps(F)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Fr, mergeProps({
            ref: (se) => {
              se && (C.value[V] = se);
            },
            "mapped-dates": ne.value(_),
            month: unref(c)(_),
            year: unref(k)(_),
            instance: _
          }, r.$props, {
            onSelectDate: (se) => unref(B)(se, _ !== 1),
            onHandleSpace: (se) => p(se, _ !== 1),
            onSetHoverDate: Y[3] || (Y[3] = (se) => unref(ae)(se)),
            onHandleScroll: (se) => unref(U)(se, _),
            onHandleSwipe: (se) => unref(f)(se, _),
            onMount: Y[4] || (Y[4] = (se) => $(unref(Tt).calendar)),
            onResetFlow: Y[5] || (Y[5] = (se) => r.$emit("reset-flow")),
            onTooltipOpen: Y[6] || (Y[6] = (se) => r.$emit("tooltip-open", se)),
            onTooltipClose: Y[7] || (Y[7] = (se) => r.$emit("tooltip-close", se))
          }), createSlots({ _: 2 }, [
            renderList(unref(x), (se, D) => ({
              name: se,
              fn: withCtx((F) => [
                renderSlot(r.$slots, se, normalizeProps(guardReactiveProps({ ...F })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      r.enableTimePicker ? (openBlock(), createElementBlock("div", zr, [
        r.$slots["time-picker"] ? renderSlot(r.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(L), updateTime: unref(oe) }))) : (openBlock(), createBlock(zn, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: P
        }, r.$props, {
          hours: unref(L).hours,
          minutes: unref(L).minutes,
          seconds: unref(L).seconds,
          "internal-model-value": r.internalModelValue,
          "disabled-times-config": unref(y),
          "validate-time": unref(b),
          onMount: Y[8] || (Y[8] = (_) => $(unref(Tt).timePicker)),
          "onUpdate:hours": Y[9] || (Y[9] = (_) => unref(oe)(_)),
          "onUpdate:minutes": Y[10] || (Y[10] = (_) => unref(oe)(_, false)),
          "onUpdate:seconds": Y[11] || (Y[11] = (_) => unref(oe)(_, false, true)),
          onResetFlow: Y[12] || (Y[12] = (_) => r.$emit("reset-flow")),
          onOverlayClosed: Y[13] || (Y[13] = (_) => pe(_, false)),
          onOverlayOpened: Y[14] || (Y[14] = (_) => pe(_, true)),
          onAmPmChange: Y[15] || (Y[15] = (_) => r.$emit("am-pm-change", _))
        }), createSlots({ _: 2 }, [
          renderList(unref(K), (_, V) => ({
            name: _,
            fn: withCtx((se) => [
              renderSlot(r.$slots, _, normalizeProps(guardReactiveProps(se)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Ur = (e, t) => {
  const l = ref(), {
    defaultedMultiCalendars: a,
    defaultedConfig: n,
    defaultedHighlight: i,
    defaultedRange: c,
    propDates: k,
    defaultedFilters: v,
    defaultedMultiDates: L
  } = Ce(e), { modelValue: y, year: I, month: b, calendars: R } = Jt(e, t), { isDisabled: H } = kt(e), { selectYear: E, groupedYears: U, showYearPicker: f, isDisabled: B, toggleYearPicker: T, handleYearSelect: Q, handleYear: te } = Ln({
    modelValue: y,
    multiCalendars: a,
    range: c,
    highlight: i,
    calendars: R,
    propDates: k,
    month: b,
    year: I,
    filters: v,
    props: e,
    emit: t
  }), oe = (m, K) => [m, K].map(($) => format($, "MMMM", { locale: e.formatLocale })).join("-"), X = computed(() => (m) => y.value ? Array.isArray(y.value) ? y.value.some((K) => isSameQuarter(m, K)) : isSameQuarter(y.value, m) : false), S = (m) => {
    if (c.value.enabled) {
      if (Array.isArray(y.value)) {
        const K = Me(m, y.value[0]) || Me(m, y.value[1]);
        return da(y.value, l.value, m) && !K;
      }
      return false;
    }
    return false;
  }, ae = (m, K) => m.quarter === getQuarter(K) && m.year === getYear(K), O = (m) => typeof i.value == "function" ? i.value({ quarter: getQuarter(m), year: getYear(m) }) : !!i.value.quarters.find((K) => ae(K, m)), q = computed(() => (m) => {
    const K = set(/* @__PURE__ */ new Date(), { year: I.value(m) });
    return eachQuarterOfInterval({
      start: startOfYear(K),
      end: endOfYear(K)
    }).map(($) => {
      const ne = startOfQuarter($), de = endOfQuarter($), d = H($), p = S(ne), z = O(ne);
      return {
        text: oe(ne, de),
        value: ne,
        active: X.value(ne),
        highlighted: z,
        disabled: d,
        isBetween: p
      };
    });
  }), ie = (m) => {
    Xa(m, y, L.value.limit), t("auto-apply", true);
  }, fe = (m) => {
    y.value = Ja(y, m, t), va(y.value, t, e.autoApply, e.modelAuto);
  }, C = (m) => {
    y.value = m, t("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a,
    groupedYears: U,
    year: I,
    isDisabled: B,
    quarters: q,
    showYearPicker: f,
    modelValue: y,
    setHoverDate: (m) => {
      l.value = m;
    },
    selectYear: E,
    selectQuarter: (m, K, $) => {
      if (!$)
        return R.value[K].month = getMonth(endOfQuarter(m)), L.value.enabled ? ie(m) : c.value.enabled ? fe(m) : C(m);
    },
    toggleYearPicker: T,
    handleYearSelect: Q,
    handleYear: te
  };
};
var Vr = { class: "dp--quarter-items" };
var Wr = ["data-test", "disabled", "onClick", "onMouseover"];
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
    const a = l, n = e, i = useSlots(), c = Je(i, "yearMode"), {
      defaultedMultiCalendars: k,
      defaultedConfig: v,
      groupedYears: L,
      year: y,
      isDisabled: I,
      quarters: b,
      modelValue: R,
      showYearPicker: H,
      setHoverDate: E,
      selectQuarter: U,
      toggleYearPicker: f,
      handleYearSelect: B,
      handleYear: T
    } = Ur(n, a);
    return t({ getSidebarProps: () => ({
      modelValue: R,
      year: y,
      selectQuarter: U,
      handleYearSelect: B,
      handleYear: T
    }) }), (te, oe) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(k).count,
      collapse: te.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: X }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(v).modeHeight}px` })
        }, [
          te.$slots["top-extra"] ? renderSlot(te.$slots, "top-extra", {
            key: 0,
            value: te.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(Nn, mergeProps(te.$props, {
              items: unref(L)(X),
              instance: X,
              "show-year-picker": unref(H)[X],
              year: unref(y)(X),
              "is-disabled": (S) => unref(I)(X, S),
              onHandleYear: (S) => unref(T)(X, S),
              onYearSelect: (S) => unref(B)(S, X),
              onToggleYearPicker: (S) => unref(f)(X, S == null ? void 0 : S.flow, S == null ? void 0 : S.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(c), (S, ae) => ({
                name: S,
                fn: withCtx((O) => [
                  renderSlot(te.$slots, S, normalizeProps(guardReactiveProps(O)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Vr, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(b)(X), (S, ae) => (openBlock(), createElementBlock("div", { key: ae }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": S.active,
                  "dp--qr-btn-between": S.isBetween,
                  "dp--qr-btn-disabled": S.disabled,
                  "dp--highlighted": S.highlighted
                }]),
                "data-test": S.value,
                disabled: S.disabled,
                onClick: (O) => unref(U)(S.value, X, S.disabled),
                onMouseover: (O) => unref(E)(S.value)
              }, [
                te.$slots.quarter ? renderSlot(te.$slots, "quarter", {
                  key: 0,
                  value: S.value,
                  text: S.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(S.text), 1)
                ], 64))
              ], 42, Wr)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var Kr = ["id", "tabindex", "role", "aria-label"];
var Gr = {
  key: 0,
  class: "dp--menu-load-container"
};
var Qr = createBaseVNode("span", { class: "dp--menu-loader" }, null, -1);
var qr = [
  Qr
];
var Xr = {
  key: 1,
  class: "dp--menu-header"
};
var Jr = {
  key: 0,
  class: "dp__sidebar_left"
};
var Zr = ["data-test", "onClick", "onKeydown"];
var xr = {
  key: 2,
  class: "dp__sidebar_right"
};
var eo = {
  key: 3,
  class: "dp__action_extra"
};
var vn = defineComponent({
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
    const a = l, n = e, i = ref(null), c = computed(() => {
      const { openOnTop: D, ...F } = n;
      return {
        ...F,
        flowStep: ae.value,
        collapse: n.collapse,
        noOverlayFocus: n.noOverlayFocus,
        menuWrapRef: i.value
      };
    }), { setMenuFocused: k, setShiftKey: v, control: L } = In(), y = useSlots(), { defaultedTextInput: I, defaultedInline: b, defaultedConfig: R, defaultedUI: H } = Ce(n), E = ref(null), U = ref(0), f = ref(null), B = ref(false), T = ref(null);
    onMounted(() => {
      if (!n.shadow) {
        B.value = true, Q(), window.addEventListener("resize", Q);
        const D = Ie(i);
        if (D && !I.value.enabled && !b.value.enabled && (k(true), x()), D) {
          const F = (ce2) => {
            R.value.allowPreventDefault && ce2.preventDefault(), yt(ce2, R.value, true);
          };
          D.addEventListener("pointerdown", F), D.addEventListener("mousedown", F);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", Q);
    });
    const Q = () => {
      const D = Ie(f);
      D && (U.value = D.getBoundingClientRect().width);
    }, { arrowRight: te, arrowLeft: oe, arrowDown: X, arrowUp: S } = bt(), { flowStep: ae, updateFlowStep: O, childMount: q, resetFlow: ie, handleFlow: fe } = ro(n, a, T), C = computed(() => n.monthPicker ? rr : n.yearPicker ? sr : n.timePicker ? $r : n.quarterPicker ? jr : Hr), P = computed(() => {
      var ce2;
      if (R.value.arrowLeft) return R.value.arrowLeft;
      const D = (ce2 = i.value) == null ? void 0 : ce2.getBoundingClientRect(), F = n.getInputRect();
      return (F == null ? void 0 : F.width) < (U == null ? void 0 : U.value) && (F == null ? void 0 : F.left) <= ((D == null ? void 0 : D.left) ?? 0) ? `${(F == null ? void 0 : F.width) / 2}px` : (F == null ? void 0 : F.right) >= ((D == null ? void 0 : D.right) ?? 0) && (F == null ? void 0 : F.width) < (U == null ? void 0 : U.value) ? `${(U == null ? void 0 : U.value) - (F == null ? void 0 : F.width) / 2}px` : "50%";
    }), x = () => {
      const D = Ie(i);
      D && D.focus({ preventScroll: true });
    }, m = computed(() => {
      var D;
      return ((D = T.value) == null ? void 0 : D.getSidebarProps()) || {};
    }), K = () => {
      n.openOnTop && a("recalculate-position");
    }, $ = Je(y, "action"), ne = computed(() => n.monthPicker || n.yearPicker ? Je(y, "monthYear") : n.timePicker ? Je(y, "timePicker") : Je(y, "shared")), de = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), d = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly,
      "dp-menu-loading": n.loading
    })), p = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !b.value.enabled,
        dp__relative: b.value.enabled,
        ...H.value.menu ?? {}
      })
    ), z = (D) => {
      yt(D, R.value, true);
    }, u = () => {
      n.escClose && a("close-picker");
    }, h3 = (D) => {
      if (n.arrowNavigation) {
        if (D === je.up) return S();
        if (D === je.down) return X();
        if (D === je.left) return oe();
        if (D === je.right) return te();
      } else D === je.left || D === je.up ? M("handleArrow", je.left, 0, D === je.up) : M("handleArrow", je.right, 0, D === je.down);
    }, N = (D) => {
      v(D.shiftKey), !n.disableMonthYearSelect && D.code === Pe.tab && D.target.classList.contains("dp__menu") && L.value.shiftKeyInMenu && (D.preventDefault(), yt(D, R.value, true), a("close-picker"));
    }, s = () => {
      x(), a("time-picker-close");
    }, le = (D) => {
      var F, ce2, he;
      (F = T.value) == null || F.toggleTimePicker(false, false), (ce2 = T.value) == null || ce2.toggleMonthPicker(false, false, D), (he = T.value) == null || he.toggleYearPicker(false, false, D);
    }, pe = (D, F = 0) => {
      var ce2, he, et2;
      return D === "month" ? (ce2 = T.value) == null ? void 0 : ce2.toggleMonthPicker(false, true, F) : D === "year" ? (he = T.value) == null ? void 0 : he.toggleYearPicker(false, true, F) : D === "time" ? (et2 = T.value) == null ? void 0 : et2.toggleTimePicker(true, false) : le(F);
    }, M = (D, ...F) => {
      var ce2, he;
      (ce2 = T.value) != null && ce2[D] && ((he = T.value) == null || he[D](...F));
    }, ge = () => {
      M("selectCurrentDate");
    }, r = (D, F) => {
      M("presetDate", D, F);
    }, Y = () => {
      M("clearHoverDate");
    }, _ = (D, F) => {
      M("updateMonthYear", D, F);
    }, V = (D, F) => {
      D.preventDefault(), h3(F);
    }, se = (D) => {
      var F, ce2, he;
      if (N(D), D.key === Pe.home || D.key === Pe.end)
        return M(
          "selectWeekDate",
          D.key === Pe.home,
          D.target.getAttribute("id")
        );
      switch ((D.key === Pe.pageUp || D.key === Pe.pageDown) && (D.shiftKey ? (M("changeYear", D.key === Pe.pageUp), (F = Ea(i.value, "overlay-year")) == null || F.focus()) : (M("changeMonth", D.key === Pe.pageUp), (ce2 = Ea(i.value, D.key === Pe.pageUp ? "action-prev" : "action-next")) == null || ce2.focus()), D.target.getAttribute("id") && ((he = i.value) == null || he.focus({ preventScroll: true }))), D.key) {
        case Pe.esc:
          return u();
        case Pe.arrowLeft:
          return V(D, je.left);
        case Pe.arrowRight:
          return V(D, je.right);
        case Pe.arrowUp:
          return V(D, je.up);
        case Pe.arrowDown:
          return V(D, je.down);
        default:
          return;
      }
    };
    return t({
      updateMonthYear: _,
      switchView: pe,
      handleFlow: fe
    }), (D, F) => {
      var ce2, he, et2;
      return openBlock(), createElementBlock("div", {
        id: D.uid ? `dp-menu-${D.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: i,
        tabindex: unref(b).enabled ? void 0 : "0",
        role: unref(b).enabled ? void 0 : "dialog",
        "aria-label": (ce2 = D.ariaLabels) == null ? void 0 : ce2.menu,
        class: normalizeClass(p.value),
        style: normalizeStyle({ "--dp-arrow-left": P.value }),
        onMouseleave: Y,
        onClick: z,
        onKeydown: se
      }, [
        (D.disabled || D.readonly) && unref(b).enabled || D.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(d.value)
        }, [
          D.loading ? (openBlock(), createElementBlock("div", Gr, qr)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        D.$slots["menu-header"] ? (openBlock(), createElementBlock("div", Xr, [
          renderSlot(D.$slots, "menu-header")
        ])) : createCommentVNode("", true),
        !unref(b).enabled && !D.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(de.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: f,
          class: normalizeClass({
            dp__menu_content_wrapper: ((he = D.presetDates) == null ? void 0 : he.length) || !!D.$slots["left-sidebar"] || !!D.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((et2 = D.presetDates) == null ? void 0 : et2.length) || !!D.$slots["left-sidebar"] || !!D.$slots["right-sidebar"])
          }),
          style: normalizeStyle({ "--dp-menu-width": `${U.value}px` })
        }, [
          D.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Jr, [
            renderSlot(D.$slots, "left-sidebar", normalizeProps(guardReactiveProps(m.value)))
          ])) : createCommentVNode("", true),
          D.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(D.presetDates, (ve, vt2) => (openBlock(), createElementBlock(Fragment, { key: vt2 }, [
              ve.slot ? renderSlot(D.$slots, ve.slot, {
                key: 0,
                presetDate: r,
                label: ve.label,
                value: ve.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(ve.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test": ve.testId ?? void 0,
                onClick: withModifiers((ot2) => r(ve.value, ve.noTz), ["prevent"]),
                onKeydown: (ot2) => unref(Ke)(ot2, () => r(ve.value, ve.noTz), true)
              }, toDisplayString(ve.label), 47, Zr))
            ], 64))), 128))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: E,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(C.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: T
            }, c.value, {
              "flow-step": unref(ae),
              onMount: unref(q),
              onUpdateFlowStep: unref(O),
              onResetFlow: unref(ie),
              onFocusMenu: x,
              onSelectDate: F[0] || (F[0] = (ve) => D.$emit("select-date")),
              onDateUpdate: F[1] || (F[1] = (ve) => D.$emit("date-update", ve)),
              onTooltipOpen: F[2] || (F[2] = (ve) => D.$emit("tooltip-open", ve)),
              onTooltipClose: F[3] || (F[3] = (ve) => D.$emit("tooltip-close", ve)),
              onAutoApply: F[4] || (F[4] = (ve) => D.$emit("auto-apply", ve)),
              onRangeStart: F[5] || (F[5] = (ve) => D.$emit("range-start", ve)),
              onRangeEnd: F[6] || (F[6] = (ve) => D.$emit("range-end", ve)),
              onInvalidFixedRange: F[7] || (F[7] = (ve) => D.$emit("invalid-fixed-range", ve)),
              onTimeUpdate: F[8] || (F[8] = (ve) => D.$emit("time-update")),
              onAmPmChange: F[9] || (F[9] = (ve) => D.$emit("am-pm-change", ve)),
              onTimePickerOpen: F[10] || (F[10] = (ve) => D.$emit("time-picker-open", ve)),
              onTimePickerClose: s,
              onRecalculatePosition: K,
              onUpdateMonthYear: F[11] || (F[11] = (ve) => D.$emit("update-month-year", ve)),
              onAutoApplyInvalid: F[12] || (F[12] = (ve) => D.$emit("auto-apply-invalid", ve)),
              onInvalidDate: F[13] || (F[13] = (ve) => D.$emit("invalid-date", ve)),
              onOverlayToggle: F[14] || (F[14] = (ve) => D.$emit("overlay-toggle", ve)),
              "onUpdate:internalModelValue": F[15] || (F[15] = (ve) => D.$emit("update:internal-model-value", ve))
            }), createSlots({ _: 2 }, [
              renderList(ne.value, (ve, vt2) => ({
                name: ve,
                fn: withCtx((ot2) => [
                  renderSlot(D.$slots, ve, normalizeProps(guardReactiveProps({ ...ot2 })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          D.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", xr, [
            renderSlot(D.$slots, "right-sidebar", normalizeProps(guardReactiveProps(m.value)))
          ])) : createCommentVNode("", true),
          D.$slots["action-extra"] ? (openBlock(), createElementBlock("div", eo, [
            D.$slots["action-extra"] ? renderSlot(D.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: ge
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !D.autoApply || unref(R).keepActionRow ? (openBlock(), createBlock(Jl, mergeProps({
          key: 3,
          "menu-mount": B.value
        }, c.value, {
          "calendar-width": U.value,
          onClosePicker: F[16] || (F[16] = (ve) => D.$emit("close-picker")),
          onSelectDate: F[17] || (F[17] = (ve) => D.$emit("select-date")),
          onInvalidSelect: F[18] || (F[18] = (ve) => D.$emit("invalid-select")),
          onSelectNow: ge
        }), createSlots({ _: 2 }, [
          renderList(unref($), (ve, vt2) => ({
            name: ve,
            fn: withCtx((ot2) => [
              renderSlot(D.$slots, ve, normalizeProps(guardReactiveProps({ ...ot2 })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 46, Kr);
    };
  }
});
var Ct = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(Ct || {});
var to = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: l,
  pickerWrapperRef: a,
  inline: n,
  emit: i,
  props: c,
  slots: k
}) => {
  const { defaultedConfig: v } = Ce(c), L = ref({}), y = ref(false), I = ref({
    top: "0",
    left: "0"
  }), b = ref(false), R = toRef(c, "teleportCenter");
  watch(R, () => {
    I.value = JSON.parse(JSON.stringify({})), te();
  });
  const H = (m) => {
    if (c.teleport) {
      const K = m.getBoundingClientRect();
      return {
        left: K.left + window.scrollX,
        top: K.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, E = (m, K) => {
    I.value.left = `${m + K - L.value.width}px`;
  }, U = (m) => {
    I.value.left = `${m}px`;
  }, f = (m, K) => {
    c.position === Ct.left && U(m), c.position === Ct.right && E(m, K), c.position === Ct.center && (I.value.left = `${m + K / 2 - L.value.width / 2}px`);
  }, B = (m) => {
    const { width: K, height: $ } = m.getBoundingClientRect(), { top: ne, left: de } = c.altPosition ? c.altPosition(m) : H(m);
    return { top: +ne, left: +de, width: K, height: $ };
  }, T = () => {
    I.value.left = "50%", I.value.top = "50%", I.value.transform = "translate(-50%, -50%)", I.value.position = "fixed", delete I.value.opacity;
  }, Q = () => {
    const m = Ie(l), { top: K, left: $, transform: ne } = c.altPosition(m);
    I.value = { top: `${K}px`, left: `${$}px`, transform: ne ?? "" };
  }, te = (m = true) => {
    var K;
    if (!n.value.enabled) {
      if (R.value) return T();
      if (c.altPosition !== null) return Q();
      if (m) {
        const $ = c.teleport ? (K = t.value) == null ? void 0 : K.$el : e.value;
        $ && (L.value = $.getBoundingClientRect()), i("recalculate-position");
      }
      return ie();
    }
  }, oe = ({ inputEl: m, left: K, width: $ }) => {
    window.screen.width > 768 && !y.value && f(K, $), ae(m);
  }, X = (m) => {
    const { top: K, left: $, height: ne, width: de } = B(m);
    I.value.top = `${ne + K + +c.offset}px`, b.value = false, y.value || (I.value.left = `${$ + de / 2 - L.value.width / 2}px`), oe({ inputEl: m, left: $, width: de });
  }, S = (m) => {
    const { top: K, left: $, width: ne } = B(m);
    I.value.top = `${K - +c.offset - L.value.height}px`, b.value = true, oe({ inputEl: m, left: $, width: ne });
  }, ae = (m) => {
    if (c.autoPosition) {
      const { left: K, width: $ } = B(m), { left: ne, right: de } = L.value;
      if (!y.value) {
        if (Math.abs(ne) !== Math.abs(de)) {
          if (ne <= 0)
            return y.value = true, U(K);
          if (de >= document.documentElement.clientWidth)
            return y.value = true, E(K, $);
        }
        return f(K, $);
      }
    }
  }, O = () => {
    const m = Ie(l);
    if (m) {
      const { height: K } = L.value, { top: $, height: ne } = m.getBoundingClientRect(), d = window.innerHeight - $ - ne, p = $;
      return K <= d ? Mt.bottom : K > d && K <= p ? Mt.top : d >= p ? Mt.bottom : Mt.top;
    }
    return Mt.bottom;
  }, q = (m) => O() === Mt.bottom ? X(m) : S(m), ie = () => {
    const m = Ie(l);
    if (m)
      return c.autoPosition ? q(m) : X(m);
  }, fe = function(m) {
    if (m) {
      const K = m.scrollHeight > m.clientHeight, ne = window.getComputedStyle(m).overflowY.indexOf("hidden") !== -1;
      return K && !ne;
    }
    return true;
  }, C = function(m) {
    return !m || m === document.body || m.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : fe(m) ? m : C(
      m.assignedSlot && v.value.shadowDom ? m.assignedSlot.parentNode : m.parentNode
    );
  }, P = (m) => {
    if (m)
      switch (c.position) {
        case Ct.left:
          return { left: 0, transform: "translateX(0)" };
        case Ct.right:
          return { left: `${m.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${m.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: b,
    menuStyle: I,
    xCorrect: y,
    setMenuPosition: te,
    getScrollableParent: C,
    shadowRender: (m, K) => {
      var u, h3, N;
      const $ = document.createElement("div"), ne = (u = Ie(l)) == null ? void 0 : u.getBoundingClientRect();
      $.setAttribute("id", "dp--temp-container");
      const de = (h3 = a.value) != null && h3.clientWidth ? a.value : document.body;
      de.append($);
      const d = P(ne), p = v.value.shadowDom ? Object.keys(k).filter(
        (s) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(s)
      ) : Object.keys(k), z = h(
        m,
        {
          ...K,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...d }
        },
        Object.fromEntries(p.map((s) => [s, k[s]]))
      );
      render(z, $), L.value = (N = z.el) == null ? void 0 : N.getBoundingClientRect(), render(null, $), de.removeChild($);
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
  { name: "tp-inline-arrow-down", use: ["shared", "time"] },
  { name: "menu-header", use: ["menu"] }
];
var ao = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var no = {
  all: () => mt,
  monthYear: () => mt.filter((e) => e.use.includes("month-year")),
  input: () => ao,
  timePicker: () => mt.filter((e) => e.use.includes("time")),
  action: () => mt.filter((e) => e.use.includes("action")),
  calendar: () => mt.filter((e) => e.use.includes("calendar")),
  menu: () => mt.filter((e) => e.use.includes("menu")),
  shared: () => mt.filter((e) => e.use.includes("shared")),
  yearMode: () => mt.filter((e) => e.use.includes("year-mode"))
};
var Je = (e, t, l) => {
  const a = [];
  return no[t]().forEach((n) => {
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
  const { defaultedRange: a, defaultedTz: n } = Ce(e), i = G(qe(G(), n.value.timezone)), c = ref([{ month: getMonth(i), year: getYear(i) }]), k = (b) => {
    const R = {
      hours: getHours(i),
      minutes: getMinutes(i),
      seconds: 0
    };
    return a.value.enabled ? [R[b], R[b]] : R[b];
  }, v = reactive({
    hours: k("hours"),
    minutes: k("minutes"),
    seconds: k("seconds")
  });
  watch(
    a,
    (b, R) => {
      b.enabled !== R.enabled && (v.hours = k("hours"), v.minutes = k("minutes"), v.seconds = k("seconds"));
    },
    { deep: true }
  );
  const L = computed({
    get: () => e.internalModelValue,
    set: (b) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", b);
    }
  }), y = computed(
    () => (b) => c.value[b] ? c.value[b].month : 0
  ), I = computed(
    () => (b) => c.value[b] ? c.value[b].year : 0
  );
  return watch(
    L,
    (b, R) => {
      l && JSON.stringify(b ?? {}) !== JSON.stringify(R ?? {}) && l();
    },
    { deep: true }
  ), {
    calendars: c,
    time: v,
    modelValue: L,
    month: y,
    year: I,
    today: i
  };
};
var lo = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedMultiDates: a,
    defaultedUI: n,
    defaultedHighlight: i,
    defaultedTz: c,
    propDates: k,
    defaultedRange: v
  } = Ce(t), { isDisabled: L } = kt(t), y = ref(null), I = ref(qe(/* @__PURE__ */ new Date(), c.value.timezone)), b = (u) => {
    !u.current && t.hideOffsetDates || (y.value = u.value);
  }, R = () => {
    y.value = null;
  }, H = (u) => Array.isArray(e.value) && v.value.enabled && e.value[0] && y.value ? u ? Be(y.value, e.value[0]) : Oe(y.value, e.value[0]) : true, E = (u, h3) => {
    const N = () => e.value ? h3 ? e.value[0] || null : e.value[1] : null, s = e.value && Array.isArray(e.value) ? N() : null;
    return Me(G(u.value), s);
  }, U = (u) => {
    const h3 = Array.isArray(e.value) ? e.value[0] : null;
    return u ? !Oe(y.value ?? null, h3) : true;
  }, f = (u, h3 = true) => (v.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !u.current ? false : Me(G(u.value), e.value[h3 ? 0 : 1]) : v.value.enabled ? E(u, h3) && U(h3) || Me(u.value, Array.isArray(e.value) ? e.value[0] : null) && H(h3) : false, B = (u, h3) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const N = Me(u.value, y.value);
      return h3 ? Be(e.value[0], u.value) && N : Oe(e.value[0], u.value) && N;
    }
    return false;
  }, T = (u) => !e.value || t.hideOffsetDates && !u.current ? false : v.value.enabled ? t.modelAuto && Array.isArray(e.value) ? Me(u.value, e.value[0] ? e.value[0] : I.value) : false : a.value.enabled && Array.isArray(e.value) ? e.value.some((h3) => Me(h3, u.value)) : Me(u.value, e.value ? e.value : I.value), Q = (u) => {
    if (v.value.autoRange || t.weekPicker) {
      if (y.value) {
        if (t.hideOffsetDates && !u.current) return false;
        const h3 = addDays(y.value, +v.value.autoRange), N = it(G(y.value), t.weekStart);
        return t.weekPicker ? Me(N[1], G(u.value)) : Me(h3, G(u.value));
      }
      return false;
    }
    return false;
  }, te = (u) => {
    if (v.value.autoRange || t.weekPicker) {
      if (y.value) {
        const h3 = addDays(y.value, +v.value.autoRange);
        if (t.hideOffsetDates && !u.current) return false;
        const N = it(G(y.value), t.weekStart);
        return t.weekPicker ? Be(u.value, N[0]) && Oe(u.value, N[1]) : Be(u.value, y.value) && Oe(u.value, h3);
      }
      return false;
    }
    return false;
  }, oe = (u) => {
    if (v.value.autoRange || t.weekPicker) {
      if (y.value) {
        if (t.hideOffsetDates && !u.current) return false;
        const h3 = it(G(y.value), t.weekStart);
        return t.weekPicker ? Me(h3[0], u.value) : Me(y.value, u.value);
      }
      return false;
    }
    return false;
  }, X = (u) => da(e.value, y.value, u.value), S = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, ae = () => t.modelAuto ? $n(t.internalModelValue) : true, O = (u) => {
    if (t.weekPicker) return false;
    const h3 = v.value.enabled ? !f(u) && !f(u, false) : true;
    return !L(u.value) && !T(u) && !(!u.current && t.hideOffsetDates) && h3;
  }, q = (u) => v.value.enabled ? t.modelAuto ? S() && T(u) : false : T(u), ie = (u) => i.value ? wl(u.value, k.value.highlight) : false, fe = (u) => {
    const h3 = L(u.value);
    return h3 && (typeof i.value == "function" ? !i.value(u.value, h3) : !i.value.options.highlightDisabled);
  }, C = (u) => {
    var h3;
    return typeof i.value == "function" ? i.value(u.value) : (h3 = i.value.weekdays) == null ? void 0 : h3.includes(u.value.getDay());
  }, P = (u) => (v.value.enabled || t.weekPicker) && (!(l.value.count > 0) || u.current) && ae() && !(!u.current && t.hideOffsetDates) && !T(u) ? X(u) : false, x = (u) => {
    const { isRangeStart: h3, isRangeEnd: N } = ne(u), s = v.value.enabled ? h3 || N : false;
    return {
      dp__cell_offset: !u.current,
      dp__pointer: !t.disabled && !(!u.current && t.hideOffsetDates) && !L(u.value),
      dp__cell_disabled: L(u.value),
      dp__cell_highlight: !fe(u) && (ie(u) || C(u)) && !q(u) && !s && !oe(u) && !(P(u) && t.weekPicker) && !N,
      dp__cell_highlight_active: !fe(u) && (ie(u) || C(u)) && q(u),
      dp__today: !t.noToday && Me(u.value, I.value) && u.current,
      "dp--past": Oe(u.value, I.value),
      "dp--future": Be(u.value, I.value)
    };
  }, m = (u) => ({
    dp__active_date: q(u),
    dp__date_hover: O(u)
  }), K = (u) => {
    if (e.value && !Array.isArray(e.value)) {
      const h3 = it(e.value, t.weekStart);
      return {
        ...d(u),
        dp__range_start: Me(h3[0], u.value),
        dp__range_end: Me(h3[1], u.value),
        dp__range_between_week: Be(u.value, h3[0]) && Oe(u.value, h3[1])
      };
    }
    return {
      ...d(u)
    };
  }, $ = (u) => {
    if (e.value && Array.isArray(e.value)) {
      const h3 = it(e.value[0], t.weekStart), N = e.value[1] ? it(e.value[1], t.weekStart) : [];
      return {
        ...d(u),
        dp__range_start: Me(h3[0], u.value) || Me(N[0], u.value),
        dp__range_end: Me(h3[1], u.value) || Me(N[1], u.value),
        dp__range_between_week: Be(u.value, h3[0]) && Oe(u.value, h3[1]) || Be(u.value, N[0]) && Oe(u.value, N[1]),
        dp__range_between: Be(u.value, h3[1]) && Oe(u.value, N[0])
      };
    }
    return {
      ...d(u)
    };
  }, ne = (u) => {
    const h3 = l.value.count > 0 ? u.current && f(u) && ae() : f(u) && ae(), N = l.value.count > 0 ? u.current && f(u, false) && ae() : f(u, false) && ae();
    return { isRangeStart: h3, isRangeEnd: N };
  }, de = (u) => {
    const { isRangeStart: h3, isRangeEnd: N } = ne(u);
    return {
      dp__range_start: h3,
      dp__range_end: N,
      dp__range_between: P(u),
      dp__date_hover: Me(u.value, y.value) && !h3 && !N && !t.weekPicker,
      dp__date_hover_start: B(u, true),
      dp__date_hover_end: B(u, false)
    };
  }, d = (u) => ({
    ...de(u),
    dp__cell_auto_range: te(u),
    dp__cell_auto_range_start: oe(u),
    dp__cell_auto_range_end: Q(u)
  }), p = (u) => v.value.enabled ? v.value.autoRange ? d(u) : t.modelAuto ? { ...m(u), ...de(u) } : t.weekPicker ? $(u) : de(u) : t.weekPicker ? K(u) : m(u);
  return {
    setHoverDate: b,
    clearHoverDate: R,
    getDayClassData: (u) => t.hideOffsetDates && !u.current ? {} : {
      ...x(u),
      ...p(u),
      [t.dayClass ? t.dayClass(u.value, t.internalModelValue) : ""]: true,
      ...n.value.calendarCell ?? {}
    }
  };
};
var kt = (e) => {
  const { defaultedFilters: t, defaultedRange: l, propDates: a, defaultedMultiDates: n } = Ce(e), i = (C) => a.value.disabledDates ? typeof a.value.disabledDates == "function" ? a.value.disabledDates(G(C)) : !!sa(C, a.value.disabledDates) : false, c = (C) => a.value.maxDate ? e.yearPicker ? getYear(C) > getYear(a.value.maxDate) : Be(C, a.value.maxDate) : false, k = (C) => a.value.minDate ? e.yearPicker ? getYear(C) < getYear(a.value.minDate) : Oe(C, a.value.minDate) : false, v = (C) => {
    const P = c(C), x = k(C), m = i(C), $ = t.value.months.map((z) => +z).includes(getMonth(C)), ne = e.disabledWeekDays.length ? e.disabledWeekDays.some((z) => +z === getDay(C)) : false, de = R(C), d = getYear(C), p = d < +e.yearRange[0] || d > +e.yearRange[1];
    return !(P || x || m || $ || p || ne || de);
  }, L = (C, P) => Oe(...pt(a.value.minDate, C, P)) || Me(...pt(a.value.minDate, C, P)), y = (C, P) => Be(...pt(a.value.maxDate, C, P)) || Me(...pt(a.value.maxDate, C, P)), I = (C, P, x) => {
    let m = false;
    return a.value.maxDate && x && y(C, P) && (m = true), a.value.minDate && !x && L(C, P) && (m = true), m;
  }, b = (C, P, x, m) => {
    let K = false;
    return m ? a.value.minDate && a.value.maxDate ? K = I(C, P, x) : (a.value.minDate && L(C, P) || a.value.maxDate && y(C, P)) && (K = true) : K = true, K;
  }, R = (C) => Array.isArray(a.value.allowedDates) && !a.value.allowedDates.length ? true : a.value.allowedDates ? !sa(C, a.value.allowedDates) : false, H = (C) => !v(C), E = (C) => l.value.noDisabledRange ? !eachDayOfInterval({ start: C[0], end: C[1] }).some((x) => H(x)) : true, U = (C) => {
    if (C) {
      const P = getYear(C);
      return P >= +e.yearRange[0] && P <= e.yearRange[1];
    }
    return true;
  }, f = (C, P) => !!(Array.isArray(C) && C[P] && (l.value.maxRange || l.value.minRange) && U(C[P])), B = (C, P, x = 0) => {
    if (f(P, x) && U(C)) {
      const m = differenceInCalendarDays(C, P[x]), K = Rn(P[x], C), $ = K.length === 1 ? 0 : K.filter((de) => H(de)).length, ne = Math.abs(m) - (l.value.minMaxRawRange ? 0 : $);
      if (l.value.minRange && l.value.maxRange)
        return ne >= +l.value.minRange && ne <= +l.value.maxRange;
      if (l.value.minRange) return ne >= +l.value.minRange;
      if (l.value.maxRange) return ne <= +l.value.maxRange;
    }
    return true;
  }, T = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, Q = (C) => Array.isArray(C) ? [C[0] ? Pa(C[0]) : null, C[1] ? Pa(C[1]) : null] : Pa(C), te = (C, P, x) => C.find(
    (m) => +m.hours === getHours(P) && m.minutes === "*" ? true : +m.minutes === getMinutes(P) && +m.hours === getHours(P)
  ) && x, oe = (C, P, x) => {
    const [m, K] = C, [$, ne] = P;
    return !te(m, $, x) && !te(K, ne, x) && x;
  }, X = (C, P) => {
    const x = Array.isArray(P) ? P : [P];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? oe(e.disabledTimes, x, C) : !x.some((m) => te(e.disabledTimes, m, C)) : C;
  }, S = (C, P) => {
    const x = Array.isArray(P) ? [St(P[0]), P[1] ? St(P[1]) : void 0] : St(P), m = !e.disabledTimes(x);
    return C && m;
  }, ae = (C, P) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? X(P, C) : S(P, C) : P, O = (C) => {
    let P = true;
    if (!C || T()) return true;
    const x = !a.value.minDate && !a.value.maxDate ? Q(C) : C;
    return (e.maxTime || a.value.maxDate) && (P = un(
      e.maxTime,
      a.value.maxDate,
      "max",
      Ye(x),
      P
    )), (e.minTime || a.value.minDate) && (P = un(
      e.minTime,
      a.value.minDate,
      "min",
      Ye(x),
      P
    )), ae(C, P);
  }, q = (C) => {
    if (!e.monthPicker) return true;
    let P = true;
    const x = G(lt(C));
    if (a.value.minDate && a.value.maxDate) {
      const m = G(lt(a.value.minDate)), K = G(lt(a.value.maxDate));
      return Be(x, m) && Oe(x, K) || Me(x, m) || Me(x, K);
    }
    if (a.value.minDate) {
      const m = G(lt(a.value.minDate));
      P = Be(x, m) || Me(x, m);
    }
    if (a.value.maxDate) {
      const m = G(lt(a.value.maxDate));
      P = Oe(x, m) || Me(x, m);
    }
    return P;
  }, ie = computed(() => (C) => !e.enableTimePicker || e.ignoreTimeValidation ? true : O(C)), fe = computed(() => (C) => e.monthPicker ? Array.isArray(C) && (l.value.enabled || n.value.enabled) ? !C.filter((x) => !q(x)).length : q(C) : true);
  return {
    isDisabled: H,
    validateDate: v,
    validateMonthYearInRange: b,
    isDateRangeAllowed: E,
    checkMinMaxRange: B,
    isValidTime: O,
    isTimeValid: ie,
    isMonthValid: fe
  };
};
var ma = () => {
  const e = computed(() => (a, n) => a == null ? void 0 : a.includes(n)), t = computed(() => (a, n) => a.count ? a.solo ? true : n === 0 : true), l = computed(() => (a, n) => a.count ? a.solo ? true : n === a.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: l };
};
var ro = (e, t, l) => {
  const a = ref(0), n = reactive({
    [Tt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Tt.calendar]: false,
    [Tt.header]: false
  }), i = computed(() => e.monthPicker || e.timePicker), c = (I) => {
    var b;
    if ((b = e.flow) != null && b.length) {
      if (!I && i.value) return y();
      n[I] = true, Object.keys(n).filter((R) => !n[R]).length || y();
    }
  }, k = () => {
    var I, b;
    (I = e.flow) != null && I.length && a.value !== -1 && (a.value += 1, t("flow-step", a.value), y()), ((b = e.flow) == null ? void 0 : b.length) === a.value && nextTick().then(() => v());
  }, v = () => {
    a.value = -1;
  }, L = (I, b, ...R) => {
    var H, E;
    e.flow[a.value] === I && l.value && ((E = (H = l.value)[b]) == null || E.call(H, ...R));
  }, y = (I = 0) => {
    I && (a.value += I), L(He.month, "toggleMonthPicker", true), L(He.year, "toggleYearPicker", true), L(He.calendar, "toggleTimePicker", false, true), L(He.time, "toggleTimePicker", true, true);
    const b = e.flow[a.value];
    (b === He.hours || b === He.minutes || b === He.seconds) && L(b, "toggleTimePicker", true, true, b);
  };
  return { childMount: c, updateFlowStep: k, resetFlow: v, handleFlow: y, flowStep: a };
};
var oo = {
  key: 1,
  class: "dp__input_wrap"
};
var so = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-disabled", "aria-invalid"];
var uo = {
  key: 2,
  class: "dp--clear-btn"
};
var io = ["aria-label"];
var co = defineComponent({
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
    "real-blur",
    "text-input"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, {
      defaultedTextInput: i,
      defaultedAriaLabels: c,
      defaultedInline: k,
      defaultedConfig: v,
      defaultedRange: L,
      defaultedMultiDates: y,
      defaultedUI: I,
      getDefaultPattern: b,
      getDefaultStartTime: R
    } = Ce(n), { checkMinMaxRange: H } = kt(n), E = ref(), U = ref(null), f = ref(false), B = ref(false), T = ref(false), Q = ref(null), te = computed(
      () => ({
        dp__pointer: !n.disabled && !n.readonly && !i.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !i.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: typeof n.state == "boolean" ? n.state : false,
        dp__input_invalid: typeof n.state == "boolean" ? !n.state : false,
        dp__input_focus: f.value || n.isMenuOpen,
        dp__input_reg: !i.value.enabled,
        ...I.value.input ?? {}
      })
    ), oe = () => {
      a("set-input-date", null), n.clearable && n.autoApply && (a("set-empty-date"), E.value = null);
    }, X = (d) => {
      const p = R();
      return Ml(
        d,
        i.value.format ?? b(),
        p ?? Cn({}, n.enableSeconds),
        n.inputValue,
        T.value,
        n.formatLocale
      );
    }, S = (d) => {
      const { rangeSeparator: p } = i.value, [z, u] = d.split(`${p}`);
      if (z) {
        const h3 = X(z.trim()), N = u ? X(u.trim()) : null;
        if (isAfter(h3, N)) return;
        const s = h3 && N ? [h3, N] : [h3];
        H(N, s, 0) && (E.value = h3 ? s : null);
      }
    }, ae = () => {
      T.value = true;
    }, O = (d) => {
      if (L.value.enabled)
        S(d);
      else if (y.value.enabled) {
        const p = d.split(";");
        E.value = p.map((z) => X(z.trim())).filter((z) => z);
      } else
        E.value = X(d);
    }, q = (d) => {
      var z;
      const p = typeof d == "string" ? d : (z = d.target) == null ? void 0 : z.value;
      p !== "" ? (i.value.openMenu && !n.isMenuOpen && a("open"), O(p), a("set-input-date", E.value)) : oe(), T.value = false, a("update:input-value", p), a("text-input", d, E.value);
    }, ie = (d) => {
      i.value.enabled ? (O(d.target.value), i.value.enterSubmit && Fa(E.value) && n.inputValue !== "" ? (a("set-input-date", E.value, true), E.value = null) : i.value.enterSubmit && n.inputValue === "" && (E.value = null, a("clear"))) : P(d);
    }, fe = (d, p) => {
      var z;
      if (Q.value && p && !B.value)
        return d.preventDefault(), B.value = true, (z = Q.value) == null ? void 0 : z.focus();
      i.value.enabled && i.value.tabSubmit && O(d.target.value), i.value.tabSubmit && Fa(E.value) && n.inputValue !== "" ? (a("set-input-date", E.value, true, true), E.value = null) : i.value.tabSubmit && n.inputValue === "" && (E.value = null, a("clear", true));
    }, C = () => {
      f.value = true, a("focus"), nextTick().then(() => {
        var d;
        i.value.enabled && i.value.selectOnFocus && ((d = U.value) == null || d.select());
      });
    }, P = (d) => {
      if (d.preventDefault(), yt(d, v.value, true), i.value.enabled && i.value.openMenu && !k.value.input) {
        if (i.value.openMenu === "open" && !n.isMenuOpen) return a("open");
        if (i.value.openMenu === "toggle") return a("toggle");
      } else i.value.enabled || a("toggle");
    }, x = () => {
      a("real-blur"), f.value = false, (!n.isMenuOpen || k.value.enabled && k.value.input) && a("blur"), n.autoApply && i.value.enabled && E.value && !n.isMenuOpen && (a("set-input-date", E.value), a("select-date"), E.value = null);
    }, m = (d) => {
      yt(d, v.value, true), a("clear");
    }, K = (d, p) => {
      if (d.key === "Tab" && fe(d, p), d.key === "Enter" && ie(d), !i.value.enabled) {
        if (d.code === "Tab") return;
        d.preventDefault();
      }
    }, $ = () => {
      var d;
      (d = U.value) == null || d.focus({ preventScroll: true });
    }, ne = (d) => {
      E.value = d;
    }, de = (d) => {
      d.key === Pe.tab && (B.value = false, fe(d));
    };
    return t({
      focusInput: $,
      setParsedDate: ne
    }), (d, p) => {
      var z, u;
      return openBlock(), createElementBlock("div", { onClick: P }, [
        d.$slots.trigger && !d.$slots["dp-input"] && !unref(k).enabled ? renderSlot(d.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !d.$slots.trigger && (!unref(k).enabled || unref(k).input) ? (openBlock(), createElementBlock("div", oo, [
          d.$slots["dp-input"] && !d.$slots.trigger && (!unref(k).enabled || unref(k).enabled && unref(k).input) ? renderSlot(d.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: q,
            onEnter: ie,
            onTab: fe,
            onClear: m,
            onBlur: x,
            onKeypress: K,
            onPaste: ae,
            onFocus: C,
            openMenu: () => d.$emit("open"),
            closeMenu: () => d.$emit("close"),
            toggleMenu: () => d.$emit("toggle")
          }) : createCommentVNode("", true),
          d.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: d.uid ? `dp-input-${d.uid}` : void 0,
            ref_key: "inputRef",
            ref: U,
            "data-test": "dp-input",
            name: d.name,
            class: normalizeClass(te.value),
            inputmode: unref(i).enabled ? "text" : "none",
            placeholder: d.placeholder,
            disabled: d.disabled,
            readonly: d.readonly,
            required: d.required,
            value: e.inputValue,
            autocomplete: d.autocomplete,
            "aria-disabled": d.disabled || void 0,
            "aria-invalid": d.state === false ? true : void 0,
            onInput: q,
            onBlur: x,
            onFocus: C,
            onKeypress: K,
            onKeydown: p[0] || (p[0] = (h3) => K(h3, true)),
            onPaste: ae
          }, null, 42, so)),
          createBaseVNode("div", {
            onClick: p[3] || (p[3] = (h3) => a("toggle"))
          }, [
            d.$slots["input-icon"] && !d.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: p[1] || (p[1] = (h3) => a("toggle"))
            }, [
              renderSlot(d.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !d.$slots["input-icon"] && !d.hideInputIcon && !d.$slots["dp-input"] ? (openBlock(), createBlock(unref(Et), {
              key: 1,
              "aria-label": (z = unref(c)) == null ? void 0 : z.calendarIcon,
              class: "dp__input_icon dp__input_icons",
              onClick: p[2] || (p[2] = (h3) => a("toggle"))
            }, null, 8, ["aria-label"])) : createCommentVNode("", true)
          ]),
          d.$slots["clear-icon"] && e.inputValue && d.clearable && !d.disabled && !d.readonly ? (openBlock(), createElementBlock("span", uo, [
            renderSlot(d.$slots, "clear-icon", { clear: m })
          ])) : createCommentVNode("", true),
          d.clearable && !d.$slots["clear-icon"] && e.inputValue && !d.disabled && !d.readonly ? (openBlock(), createElementBlock("button", {
            key: 3,
            ref_key: "clearBtnRef",
            ref: Q,
            "aria-label": (u = unref(c)) == null ? void 0 : u.clearInput,
            class: "dp--clear-btn",
            type: "button",
            onBlur: p[4] || (p[4] = (h3) => B.value = false),
            onKeydown: p[5] || (p[5] = (h3) => unref(Ke)(h3, () => m(h3), true, de)),
            onClick: p[6] || (p[6] = withModifiers((h3) => m(h3), ["prevent"]))
          }, [
            createVNode(unref(Dn), {
              class: "dp__input_icons",
              "data-test": "clear-icon"
            })
          ], 40, io)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var fo = typeof window < "u" ? window : void 0;
var Ya = () => {
};
var vo = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var mo = (e, t, l, a) => {
  if (!e) return Ya;
  let n = Ya;
  const i = watch(
    () => unref(e),
    (k) => {
      n(), k && (k.addEventListener(t, l, a), n = () => {
        k.removeEventListener(t, l, a), n = Ya;
      });
    },
    { immediate: true, flush: "post" }
  ), c = () => {
    i(), n();
  };
  return vo(c), c;
};
var po = (e, t, l, a = {}) => {
  const { window: n = fo, event: i = "pointerdown" } = a;
  return n ? mo(n, i, (k) => {
    const v = Ie(e), L = Ie(t);
    !v || !L || v === k.target || k.composedPath().includes(v) || k.composedPath().includes(L) || l(k);
  }, { passive: true }) : void 0;
};
var yo = defineComponent({
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
    "overlay-toggle",
    "text-input"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = l, n = e, i = useSlots(), c = ref(false), k = toRef(n, "modelValue"), v = toRef(n, "timezone"), L = ref(null), y = ref(null), I = ref(null), b = ref(false), R = ref(null), H = ref(false), E = ref(false), U = ref(false), f = ref(false), { setMenuFocused: B, setShiftKey: T } = In(), { clearArrowNav: Q } = bt(), { validateDate: te, isValidTime: oe } = kt(n), {
      defaultedTransitions: X,
      defaultedTextInput: S,
      defaultedInline: ae,
      defaultedConfig: O,
      defaultedRange: q,
      defaultedMultiDates: ie
    } = Ce(n), { menuTransition: fe, showTransition: C } = Xt(X);
    onMounted(() => {
      u(n.modelValue), nextTick().then(() => {
        if (!ae.value.enabled) {
          const g = de(R.value);
          g == null || g.addEventListener("scroll", _), window == null || window.addEventListener("resize", V);
        }
      }), ae.value.enabled && (c.value = true), window == null || window.addEventListener("keyup", se), window == null || window.addEventListener("keydown", D);
    }), onUnmounted(() => {
      if (!ae.value.enabled) {
        const g = de(R.value);
        g == null || g.removeEventListener("scroll", _), window == null || window.removeEventListener("resize", V);
      }
      window == null || window.removeEventListener("keyup", se), window == null || window.removeEventListener("keydown", D);
    });
    const P = Je(i, "all", n.presetDates), x = Je(i, "input");
    watch(
      [k, v],
      () => {
        u(k.value);
      },
      { deep: true }
    );
    const { openOnTop: m, menuStyle: K, xCorrect: $, setMenuPosition: ne, getScrollableParent: de, shadowRender: d } = to({
      menuRef: L,
      menuRefInner: y,
      inputRef: I,
      pickerWrapperRef: R,
      inline: ae,
      emit: a,
      props: n,
      slots: i
    }), {
      inputValue: p,
      internalModelValue: z,
      parseExternalModelValue: u,
      emitModelValue: h3,
      formatInputValue: N,
      checkBeforeEmit: s
    } = Gl(a, n, b), le = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: ae.value.enabled,
        "dp--flex-display-collapsed": U.value,
        dp__flex_display_with_input: ae.value.input
      })
    ), pe = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), M = computed(() => n.teleport ? {
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: !n.teleport || ae.value.enabled
    } : {}), ge = computed(() => ({ class: "dp__outer_menu_wrap" })), r = computed(() => ae.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), Y = () => {
      var g, W3;
      return (W3 = (g = I.value) == null ? void 0 : g.$el) == null ? void 0 : W3.getBoundingClientRect();
    }, _ = () => {
      c.value && (O.value.closeOnScroll ? Xe2() : ne());
    }, V = () => {
      var W3;
      c.value && ne();
      const g = (W3 = y.value) == null ? void 0 : W3.$el.getBoundingClientRect().width;
      U.value = document.body.offsetWidth <= g;
    }, se = (g) => {
      g.key === "Tab" && !ae.value.enabled && !n.teleport && O.value.tabOutClosesMenu && (R.value.contains(document.activeElement) || Xe2()), E.value = g.shiftKey;
    }, D = (g) => {
      E.value = g.shiftKey;
    }, F = () => {
      !n.disabled && !n.readonly && (d(vn, n), ne(false), c.value = true, c.value && a("open"), c.value || Ft2(), u(n.modelValue));
    }, ce2 = () => {
      var g;
      p.value = "", Ft2(), (g = I.value) == null || g.setParsedDate(null), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), O.value.closeOnClearValue && Xe2();
    }, he = () => {
      const g = z.value;
      return !g || !Array.isArray(g) && te(g) ? true : Array.isArray(g) ? ie.value.enabled || g.length === 2 && te(g[0]) && te(g[1]) ? true : q.value.partialRange && !n.timePicker ? te(g[0]) : false : false;
    }, et2 = () => {
      s() && he() ? (h3(), Xe2()) : a("invalid-select", z.value);
    }, ve = (g) => {
      vt2(), h3(), O.value.closeOnAutoApply && !g && Xe2();
    }, vt2 = () => {
      I.value && S.value.enabled && I.value.setParsedDate(z.value);
    }, ot2 = (g = false) => {
      n.autoApply && oe(z.value) && he() && (q.value.enabled && Array.isArray(z.value) ? (q.value.partialRange || z.value.length === 2) && ve(g) : ve(g));
    }, Ft2 = () => {
      S.value.enabled || (z.value = null);
    }, Xe2 = () => {
      ae.value.enabled || (c.value && (c.value = false, $.value = false, B(false), T(false), Q(), a("closed"), p.value && u(k.value)), Ft2(), a("blur"));
    }, Lt2 = (g, W3, re = false) => {
      if (!g) {
        z.value = null;
        return;
      }
      const Ae = Array.isArray(g) ? !g.some((wt2) => !te(wt2)) : te(g), Fe2 = oe(g);
      Ae && Fe2 && (f.value = true, z.value = g, W3 && (H.value = re, et2(), a("text-submit")), nextTick().then(() => {
        f.value = false;
      }));
    }, pa2 = () => {
      n.autoApply && oe(z.value) && h3(), vt2();
    }, Zt2 = () => c.value ? Xe2() : F(), ya2 = (g) => {
      z.value = g;
    }, ga2 = () => {
      S.value.enabled && (b.value = true, N()), a("focus");
    }, ha2 = () => {
      if (S.value.enabled && (b.value = false, u(n.modelValue), H.value)) {
        const g = kl(R.value, E.value);
        g == null || g.focus();
      }
      a("blur");
    }, ba2 = (g) => {
      y.value && y.value.updateMonthYear(0, {
        month: rn(g.month),
        year: rn(g.year)
      });
    }, ka2 = (g) => {
      u(g ?? n.modelValue);
    }, wa2 = (g, W3) => {
      var re;
      (re = y.value) == null || re.switchView(g, W3);
    }, Za2 = (g) => O.value.onClickOutside ? O.value.onClickOutside(g) : Xe2(), w = (g = 0) => {
      var W3;
      (W3 = y.value) == null || W3.handleFlow(g);
    };
    return po(L, I, () => Za2(he)), t({
      closeMenu: Xe2,
      selectDate: et2,
      clearValue: ce2,
      openMenu: F,
      onScroll: _,
      formatInputValue: N,
      // exposed for testing purposes
      updateInternalModelValue: ya2,
      // modify internal modelValue
      setMonthYear: ba2,
      parseModel: ka2,
      switchView: wa2,
      toggleMenu: Zt2,
      handleFlow: w,
      dpWrapMenuRef: L
    }), (g, W3) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: R,
      class: normalizeClass(le.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(co, mergeProps({
        ref_key: "inputRef",
        ref: I,
        "input-value": unref(p),
        "onUpdate:inputValue": W3[0] || (W3[0] = (re) => isRef(p) ? p.value = re : null),
        "is-menu-open": c.value
      }, g.$props, {
        onClear: ce2,
        onOpen: F,
        onSetInputDate: Lt2,
        onSetEmptyDate: unref(h3),
        onSelectDate: et2,
        onToggle: Zt2,
        onClose: Xe2,
        onFocus: ga2,
        onBlur: ha2,
        onRealBlur: W3[1] || (W3[1] = (re) => b.value = false),
        onTextInput: W3[2] || (W3[2] = (re) => g.$emit("text-input", re))
      }), createSlots({ _: 2 }, [
        renderList(unref(x), (re, Ae) => ({
          name: re,
          fn: withCtx((Fe2) => [
            renderSlot(g.$slots, re, normalizeProps(guardReactiveProps(Fe2)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(g.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps(M.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(fe)(unref(m)),
            css: unref(C) && !unref(ae).enabled
          }, {
            default: withCtx(() => [
              c.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: L
              }, ge.value, {
                class: { "dp--menu-wrapper": !unref(ae).enabled },
                style: unref(ae).enabled ? void 0 : unref(K)
              }), [
                createVNode(vn, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: y
                }, g.$props, {
                  "internal-model-value": unref(z),
                  "onUpdate:internalModelValue": W3[3] || (W3[3] = (re) => isRef(z) ? z.value = re : null),
                  class: { [pe.value]: true, "dp--menu-wrapper": g.teleport },
                  "open-on-top": unref(m),
                  "no-overlay-focus": r.value,
                  collapse: U.value,
                  "get-input-rect": Y,
                  "is-text-input-date": f.value,
                  onClosePicker: Xe2,
                  onSelectDate: et2,
                  onAutoApply: ot2,
                  onTimeUpdate: pa2,
                  onFlowStep: W3[4] || (W3[4] = (re) => g.$emit("flow-step", re)),
                  onUpdateMonthYear: W3[5] || (W3[5] = (re) => g.$emit("update-month-year", re)),
                  onInvalidSelect: W3[6] || (W3[6] = (re) => g.$emit("invalid-select", unref(z))),
                  onAutoApplyInvalid: W3[7] || (W3[7] = (re) => g.$emit("invalid-select", re)),
                  onInvalidFixedRange: W3[8] || (W3[8] = (re) => g.$emit("invalid-fixed-range", re)),
                  onRecalculatePosition: unref(ne),
                  onTooltipOpen: W3[9] || (W3[9] = (re) => g.$emit("tooltip-open", re)),
                  onTooltipClose: W3[10] || (W3[10] = (re) => g.$emit("tooltip-close", re)),
                  onTimePickerOpen: W3[11] || (W3[11] = (re) => g.$emit("time-picker-open", re)),
                  onTimePickerClose: W3[12] || (W3[12] = (re) => g.$emit("time-picker-close", re)),
                  onAmPmChange: W3[13] || (W3[13] = (re) => g.$emit("am-pm-change", re)),
                  onRangeStart: W3[14] || (W3[14] = (re) => g.$emit("range-start", re)),
                  onRangeEnd: W3[15] || (W3[15] = (re) => g.$emit("range-end", re)),
                  onDateUpdate: W3[16] || (W3[16] = (re) => g.$emit("date-update", re)),
                  onInvalidDate: W3[17] || (W3[17] = (re) => g.$emit("invalid-date", re)),
                  onOverlayToggle: W3[18] || (W3[18] = (re) => g.$emit("overlay-toggle", re))
                }), createSlots({ _: 2 }, [
                  renderList(unref(P), (re, Ae) => ({
                    name: re,
                    fn: withCtx((Fe2) => [
                      renderSlot(g.$slots, re, normalizeProps(guardReactiveProps({ ...Fe2 })))
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
var Un = (() => {
  const e = yo;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var go = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Un
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(go).forEach(([e, t]) => {
  e !== "default" && (Un[e] = t);
});

// node_modules/.pnpm/@vueuse+integrations@10.11.0_async-validator@4.2.5_focus-trap@7.5.4_qrcode@1.5.3_sortablejs@1.15.2_vue@3.4.34/node_modules/@vueuse/integrations/useQRCode.mjs
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/shared/ssr-window.esm.mjs
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/shared/utils.mjs
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
function elementChildren(element2, selector) {
  if (selector === void 0) {
    selector = "";
  }
  const children = [...element2.children];
  if (element2 instanceof HTMLSlotElement) {
    children.push(...element2.assignedElements());
  }
  if (!selector) {
    return children;
  }
  return children.filter((el2) => el2.matches(selector));
}
function elementIsChildOf(el2, parent) {
  const isChild = parent.contains(el2);
  if (!isChild && parent instanceof HTMLSlotElement) {
    const children = [...element.assignedElements()];
    return children.includes(el2);
  }
  return isChild;
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
function getRotateFix(swiper) {
  return (v) => {
    if (Math.abs(v) > 0 && swiper.browser && swiper.browser.need3dFix && Math.abs(v) % 90 === 0) {
      return v + 1e-3;
    }
    return v;
  };
}

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/shared/swiper-core.mjs
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
    on: on3,
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
  on3("init", () => {
    if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
      createObserver();
      return;
    }
    window2.addEventListener("resize", resizeHandler);
    window2.addEventListener("orientationchange", orientationChangeHandler);
  });
  on3("destroy", () => {
    removeObserver();
    window2.removeEventListener("resize", resizeHandler);
    window2.removeEventListener("orientationchange", orientationChangeHandler);
  });
}
function Observer(_ref) {
  let {
    swiper,
    extendParams,
    on: on3,
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
      childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
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
  on3("init", init);
  on3("destroy", destroy);
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
    if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
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
  mount(element2) {
    const swiper = this;
    if (swiper.mounted) return true;
    let el2 = element2 || swiper.params.el;
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/shared/update-swiper.mjs
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/shared/update-on-virtual-data.mjs
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/swiper-vue.mjs
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
    breakpointsBase: {
      type: String,
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
  emits: ["_beforeBreakpoint", "_containerClasses", "_slideClass", "_slideClasses", "_swiper", "_freeModeNoMomentumRelease", "activeIndexChange", "afterInit", "autoplay", "autoplayStart", "autoplayStop", "autoplayPause", "autoplayResume", "autoplayTimeLeft", "beforeDestroy", "beforeInit", "beforeLoopFix", "beforeResize", "beforeSlideChangeStart", "beforeTransitionStart", "breakpoint", "changeDirection", "click", "disable", "doubleTap", "doubleClick", "destroy", "enable", "fromEdge", "hashChange", "hashSet", "init", "keyPress", "lock", "loopFix", "momentumBounce", "navigationHide", "navigationShow", "navigationPrev", "navigationNext", "observerUpdate", "orientationchange", "paginationHide", "paginationRender", "paginationShow", "paginationUpdate", "progress", "reachBeginning", "reachEnd", "realIndexChange", "resize", "scroll", "scrollbarDragEnd", "scrollbarDragMove", "scrollbarDragStart", "setTransition", "setTranslate", "slidesUpdated", "slideChange", "slideChangeTransitionEnd", "slideChangeTransitionStart", "slideNextTransitionEnd", "slideNextTransitionStart", "slidePrevTransitionEnd", "slidePrevTransitionStart", "slideResetTransitionStart", "slideResetTransitionEnd", "sliderMove", "sliderFirstMove", "slidesLengthChange", "slidesGridLengthChange", "snapGridLengthChange", "snapIndexChange", "swiper", "tap", "toEdge", "touchEnd", "touchMove", "touchMoveOpposite", "touchStart", "transitionEnd", "transitionStart", "unlock", "update", "virtualUpdate", "zoomChange"],
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/modules/mousewheel.mjs
function Mousewheel(_ref) {
  let {
    swiper,
    extendParams,
    on: on3,
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
  on3("init", () => {
    if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
      disable();
    }
    if (swiper.params.mousewheel.enabled) enable();
  });
  on3("destroy", () => {
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/shared/create-element-if-not-defined.mjs
function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        let element2 = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
        if (!element2) {
          element2 = createElement("div", checkProps[key]);
          element2.className = checkProps[key];
          swiper.el.append(element2);
        }
        params[key] = element2;
        originalParams[key] = element2;
      }
    });
  }
  return params;
}

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/modules/navigation.mjs
function Navigation(_ref) {
  let {
    swiper,
    extendParams,
    on: on3,
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
  on3("init", () => {
    if (swiper.params.navigation.enabled === false) {
      disable();
    } else {
      init();
      update2();
    }
  });
  on3("toEdge fromEdge lock unlock", () => {
    update2();
  });
  on3("destroy", () => {
    destroy();
  });
  on3("enable disable", () => {
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
  on3("click", (_s2, e) => {
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/shared/classes-to-selector.mjs
function classesToSelector(classes2) {
  if (classes2 === void 0) {
    classes2 = "";
  }
  return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/modules/pagination.mjs
function Pagination(_ref) {
  let {
    swiper,
    extendParams,
    on: on3,
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
  on3("changeDirection", () => {
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
  on3("init", () => {
    if (swiper.params.pagination.enabled === false) {
      disable();
    } else {
      init();
      render2();
      update2();
    }
  });
  on3("activeIndexChange", () => {
    if (typeof swiper.snapIndex === "undefined") {
      update2();
    }
  });
  on3("snapIndexChange", () => {
    update2();
  });
  on3("snapGridLengthChange", () => {
    render2();
    update2();
  });
  on3("destroy", () => {
    destroy();
  });
  on3("enable disable", () => {
    let {
      el: el2
    } = swiper.pagination;
    if (el2) {
      el2 = makeElementsArray(el2);
      el2.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
    }
  });
  on3("lock unlock", () => {
    update2();
  });
  on3("click", (_s2, e) => {
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/modules/autoplay.mjs
function Autoplay(_ref) {
  let {
    swiper,
    extendParams,
    on: on3,
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
  on3("init", () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      start();
    }
  });
  on3("destroy", () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on3("_freeModeStaticRelease", () => {
    if (pausedByTouch || pausedByInteraction) {
      resume();
    }
  });
  on3("_freeModeNoMomentumRelease", () => {
    if (!swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on3("beforeTransitionStart", (_s2, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on3("sliderFirstMove", () => {
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
  on3("touchEnd", () => {
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
  on3("slideChange", () => {
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/shared/effect-init.mjs
function effectInit(params) {
  const {
    effect,
    swiper,
    on: on3,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams
  } = params;
  on3("beforeInit", () => {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }
    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on3("setTranslate", () => {
    if (swiper.params.effect !== effect) return;
    setTranslate2();
  });
  on3("setTransition", (_s2, duration) => {
    if (swiper.params.effect !== effect) return;
    setTransition2(duration);
  });
  on3("transitionEnd", () => {
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
  on3("virtualUpdate", () => {
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/shared/effect-target.mjs
function effectTarget(effectParams, slideEl) {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = "hidden";
    transformEl.style["-webkit-backface-visibility"] = "hidden";
  }
  return transformEl;
}

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/shared/effect-virtual-transition-end.mjs
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/modules/effect-fade.mjs
function EffectFade(_ref) {
  let {
    swiper,
    extendParams,
    on: on3
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
    on: on3,
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

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/modules/effect-cube.mjs
function EffectCube(_ref) {
  let {
    swiper,
    extendParams,
    on: on3
  } = _ref;
  extendParams({
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  });
  const createSlideShadows = (slideEl, progress, isHorizontal) => {
    let shadowBefore = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
    let shadowAfter = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
    if (!shadowBefore) {
      shadowBefore = createElement("div", `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? "left" : "top"}`.split(" "));
      slideEl.append(shadowBefore);
    }
    if (!shadowAfter) {
      shadowAfter = createElement("div", `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? "right" : "bottom"}`.split(" "));
      slideEl.append(shadowAfter);
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };
  const recreateShadows = () => {
    const isHorizontal = swiper.isHorizontal();
    swiper.slides.forEach((slideEl) => {
      const progress = Math.max(Math.min(slideEl.progress, 1), -1);
      createSlideShadows(slideEl, progress, isHorizontal);
    });
  };
  const setTranslate2 = () => {
    const {
      el: el2,
      wrapperEl,
      slides,
      width: swiperWidth,
      height: swiperHeight,
      rtlTranslate: rtl,
      size: swiperSize,
      browser: browser2
    } = swiper;
    const r = getRotateFix(swiper);
    const params = swiper.params.cubeEffect;
    const isHorizontal = swiper.isHorizontal();
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let wrapperRotate = 0;
    let cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl = swiper.wrapperEl.querySelector(".swiper-cube-shadow");
        if (!cubeShadowEl) {
          cubeShadowEl = createElement("div", "swiper-cube-shadow");
          swiper.wrapperEl.append(cubeShadowEl);
        }
        cubeShadowEl.style.height = `${swiperWidth}px`;
      } else {
        cubeShadowEl = el2.querySelector(".swiper-cube-shadow");
        if (!cubeShadowEl) {
          cubeShadowEl = createElement("div", "swiper-cube-shadow");
          el2.append(cubeShadowEl);
        }
      }
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      let slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt(slideEl.getAttribute("data-swiper-slide-index"), 10);
      }
      let slideAngle = slideIndex * 90;
      let round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      const progress = Math.max(Math.min(slideEl.progress, 1), -1);
      let tx = 0;
      let ty = 0;
      let tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + round * 4 * swiperSize;
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = 3 * swiperSize + swiperSize * 4 * round;
      }
      if (rtl) {
        tx = -tx;
      }
      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }
      const transform = `rotateX(${r(isHorizontal ? 0 : -slideAngle)}deg) rotateY(${r(isHorizontal ? slideAngle : 0)}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
      }
      slideEl.style.transform = transform;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress, isHorizontal);
      }
    }
    wrapperEl.style.transformOrigin = `50% 50% -${swiperSize / 2}px`;
    wrapperEl.style["-webkit-transform-origin"] = `50% 50% -${swiperSize / 2}px`;
    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl.style.transform = `translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${params.shadowScale})`;
      } else {
        const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
        const scale1 = params.shadowScale;
        const scale2 = params.shadowScale / multiplier;
        const offset = params.shadowOffset;
        cubeShadowEl.style.transform = `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-89.99deg)`;
      }
    }
    const zFactor = (browser2.isSafari || browser2.isWebView) && browser2.needPerspectiveFix ? -swiperSize / 2 : 0;
    wrapperEl.style.transform = `translate3d(0px,0,${zFactor}px) rotateX(${r(swiper.isHorizontal() ? 0 : wrapperRotate)}deg) rotateY(${r(swiper.isHorizontal() ? -wrapperRotate : 0)}deg)`;
    wrapperEl.style.setProperty("--swiper-cube-translate-z", `${zFactor}px`);
  };
  const setTransition2 = (duration) => {
    const {
      el: el2,
      slides
    } = swiper;
    slides.forEach((slideEl) => {
      slideEl.style.transitionDuration = `${duration}ms`;
      slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((subEl) => {
        subEl.style.transitionDuration = `${duration}ms`;
      });
    });
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      const shadowEl = el2.querySelector(".swiper-cube-shadow");
      if (shadowEl) shadowEl.style.transitionDuration = `${duration}ms`;
    }
  };
  effectInit({
    effect: "cube",
    swiper,
    on: on3,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    recreateShadows,
    getEffectParams: () => swiper.params.cubeEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: false,
      virtualTranslate: true
    })
  });
}

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/shared/create-shadow.mjs
function createShadow(suffix, slideEl, side) {
  const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ""}${suffix ? ` swiper-slide-shadow-${suffix}` : ""}`;
  const shadowContainer = getSlideTransformEl(slideEl);
  let shadowEl = shadowContainer.querySelector(`.${shadowClass.split(" ").join(".")}`);
  if (!shadowEl) {
    shadowEl = createElement("div", shadowClass.split(" "));
    shadowContainer.append(shadowEl);
  }
  return shadowEl;
}

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/modules/effect-flip.mjs
function EffectFlip(_ref) {
  let {
    swiper,
    extendParams,
    on: on3
  } = _ref;
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true
    }
  });
  const createSlideShadows = (slideEl, progress) => {
    let shadowBefore = swiper.isHorizontal() ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
    let shadowAfter = swiper.isHorizontal() ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
    if (!shadowBefore) {
      shadowBefore = createShadow("flip", slideEl, swiper.isHorizontal() ? "left" : "top");
    }
    if (!shadowAfter) {
      shadowAfter = createShadow("flip", slideEl, swiper.isHorizontal() ? "right" : "bottom");
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };
  const recreateShadows = () => {
    swiper.params.flipEffect;
    swiper.slides.forEach((slideEl) => {
      let progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      createSlideShadows(slideEl, progress);
    });
  };
  const setTranslate2 = () => {
    const {
      slides,
      rtlTranslate: rtl
    } = swiper;
    const params = swiper.params.flipEffect;
    const rotateFix = getRotateFix(swiper);
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      let progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      const offset = slideEl.swiperSlideOffset;
      const rotate = -180 * progress;
      let rotateY = rotate;
      let rotateX = 0;
      let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }
      slideEl.style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress);
      }
      const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateFix(rotateX)}deg) rotateY(${rotateFix(rotateY)}deg)`;
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = transform;
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el2) => {
      el2.style.transitionDuration = `${duration}ms`;
      el2.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements
    });
  };
  effectInit({
    effect: "flip",
    swiper,
    on: on3,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    recreateShadows,
    getEffectParams: () => swiper.params.flipEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/modules/effect-coverflow.mjs
function EffectCoverflow(_ref) {
  let {
    swiper,
    extendParams,
    on: on3
  } = _ref;
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true
    }
  });
  const setTranslate2 = () => {
    const {
      width: swiperWidth,
      height: swiperHeight,
      slides,
      slidesSizesGrid
    } = swiper;
    const params = swiper.params.coverflowEffect;
    const isHorizontal = swiper.isHorizontal();
    const transform = swiper.translate;
    const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    const rotate = isHorizontal ? params.rotate : -params.rotate;
    const translate2 = params.depth;
    const r = getRotateFix(swiper);
    for (let i = 0, length = slides.length; i < length; i += 1) {
      const slideEl = slides[i];
      const slideSize = slidesSizesGrid[i];
      const slideOffset = slideEl.swiperSlideOffset;
      const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
      const offsetMultiplier = typeof params.modifier === "function" ? params.modifier(centerOffset) : centerOffset * params.modifier;
      let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      let translateZ = -translate2 * Math.abs(offsetMultiplier);
      let stretch = params.stretch;
      if (typeof stretch === "string" && stretch.indexOf("%") !== -1) {
        stretch = parseFloat(params.stretch) / 100 * slideSize;
      }
      let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
      let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);
      if (Math.abs(translateX) < 1e-3) translateX = 0;
      if (Math.abs(translateY) < 1e-3) translateY = 0;
      if (Math.abs(translateZ) < 1e-3) translateZ = 0;
      if (Math.abs(rotateY) < 1e-3) rotateY = 0;
      if (Math.abs(rotateX) < 1e-3) rotateX = 0;
      if (Math.abs(scale) < 1e-3) scale = 0;
      const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${r(rotateX)}deg) rotateY(${r(rotateY)}deg) scale(${scale})`;
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = slideTransform;
      slideEl.style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
      if (params.slideShadows) {
        let shadowBeforeEl = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-left") : slideEl.querySelector(".swiper-slide-shadow-top");
        let shadowAfterEl = isHorizontal ? slideEl.querySelector(".swiper-slide-shadow-right") : slideEl.querySelector(".swiper-slide-shadow-bottom");
        if (!shadowBeforeEl) {
          shadowBeforeEl = createShadow("coverflow", slideEl, isHorizontal ? "left" : "top");
        }
        if (!shadowAfterEl) {
          shadowAfterEl = createShadow("coverflow", slideEl, isHorizontal ? "right" : "bottom");
        }
        if (shadowBeforeEl) shadowBeforeEl.style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
        if (shadowAfterEl) shadowAfterEl.style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
      }
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el2) => {
      el2.style.transitionDuration = `${duration}ms`;
      el2.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
  };
  effectInit({
    effect: "coverflow",
    swiper,
    on: on3,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true
    })
  });
}

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/modules/effect-creative.mjs
function EffectCreative(_ref) {
  let {
    swiper,
    extendParams,
    on: on3
  } = _ref;
  extendParams({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: false,
      progressMultiplier: 1,
      perspective: true,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });
  const getTranslateValue = (value) => {
    if (typeof value === "string") return value;
    return `${value}px`;
  };
  const setTranslate2 = () => {
    const {
      slides,
      wrapperEl,
      slidesSizesGrid
    } = swiper;
    const params = swiper.params.creativeEffect;
    const {
      progressMultiplier: multiplier
    } = params;
    const isCenteredSlides = swiper.params.centeredSlides;
    const rotateFix = getRotateFix(swiper);
    if (isCenteredSlides) {
      const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
      wrapperEl.style.transform = `translateX(calc(50% - ${margin}px))`;
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      const slideProgress = slideEl.progress;
      const progress = Math.min(Math.max(slideEl.progress, -params.limitProgress), params.limitProgress);
      let originalProgress = progress;
      if (!isCenteredSlides) {
        originalProgress = Math.min(Math.max(slideEl.originalProgress, -params.limitProgress), params.limitProgress);
      }
      const offset = slideEl.swiperSlideOffset;
      const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
      const r = [0, 0, 0];
      let custom = false;
      if (!swiper.isHorizontal()) {
        t[1] = t[0];
        t[0] = 0;
      }
      let data = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1
      };
      if (progress < 0) {
        data = params.next;
        custom = true;
      } else if (progress > 0) {
        data = params.prev;
        custom = true;
      }
      t.forEach((value, index) => {
        t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
      });
      r.forEach((value, index) => {
        let val = data.rotate[index] * Math.abs(progress * multiplier);
        r[index] = val;
      });
      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      const translateString = t.join(", ");
      const rotateString = `rotateX(${rotateFix(r[0])}deg) rotateY(${rotateFix(r[1])}deg) rotateZ(${rotateFix(r[2])}deg)`;
      const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
      const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
      const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`;
      if (custom && data.shadow || !custom) {
        let shadowEl = slideEl.querySelector(".swiper-slide-shadow");
        if (!shadowEl && data.shadow) {
          shadowEl = createShadow("creative", slideEl);
        }
        if (shadowEl) {
          const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
          shadowEl.style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
        }
      }
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = transform;
      targetEl.style.opacity = opacityString;
      if (data.origin) {
        targetEl.style.transformOrigin = data.origin;
      }
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el2) => {
      el2.style.transitionDuration = `${duration}ms`;
      el2.querySelectorAll(".swiper-slide-shadow").forEach((shadowEl) => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements,
      allSlides: true
    });
  };
  effectInit({
    effect: "creative",
    swiper,
    on: on3,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    perspective: () => swiper.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}

// node_modules/.pnpm/swiper@11.1.7/node_modules/swiper/modules/effect-cards.mjs
function EffectCards(_ref) {
  let {
    swiper,
    extendParams,
    on: on3
  } = _ref;
  extendParams({
    cardsEffect: {
      slideShadows: true,
      rotate: true,
      perSlideRotate: 2,
      perSlideOffset: 8
    }
  });
  const setTranslate2 = () => {
    const {
      slides,
      activeIndex,
      rtlTranslate: rtl
    } = swiper;
    const params = swiper.params.cardsEffect;
    const {
      startTranslate,
      isTouched
    } = swiper.touchEventsData;
    const currentTranslate = rtl ? -swiper.translate : swiper.translate;
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      const slideProgress = slideEl.progress;
      const progress = Math.min(Math.max(slideProgress, -4), 4);
      let offset = slideEl.swiperSlideOffset;
      if (swiper.params.centeredSlides && !swiper.params.cssMode) {
        swiper.wrapperEl.style.transform = `translateX(${swiper.minTranslate()}px)`;
      }
      if (swiper.params.centeredSlides && swiper.params.cssMode) {
        offset -= slides[0].swiperSlideOffset;
      }
      let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let tY = 0;
      const tZ = -100 * Math.abs(progress);
      let scale = 1;
      let rotate = -params.perSlideRotate * progress;
      let tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;
      const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
      const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
      const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
      if (isSwipeToNext || isSwipeToPrev) {
        const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
        rotate += -28 * progress * subProgress;
        scale += -0.5 * subProgress;
        tXAdd += 96 * subProgress;
        tY = `${-25 * subProgress * Math.abs(progress)}%`;
      }
      if (progress < 0) {
        tX = `calc(${tX}px ${rtl ? "-" : "+"} (${tXAdd * Math.abs(progress)}%))`;
      } else if (progress > 0) {
        tX = `calc(${tX}px ${rtl ? "-" : "+"} (-${tXAdd * Math.abs(progress)}%))`;
      } else {
        tX = `${tX}px`;
      }
      if (!swiper.isHorizontal()) {
        const prevY = tY;
        tY = tX;
        tX = prevY;
      }
      const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
      const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${params.rotate ? rtl ? -rotate : rotate : 0}deg)
        scale(${scaleString})
      `;
      if (params.slideShadows) {
        let shadowEl = slideEl.querySelector(".swiper-slide-shadow");
        if (!shadowEl) {
          shadowEl = createShadow("cards", slideEl);
        }
        if (shadowEl) shadowEl.style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
      }
      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = transform;
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el2) => {
      el2.style.transitionDuration = `${duration}ms`;
      el2.querySelectorAll(".swiper-slide-shadow").forEach((shadowEl) => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements
    });
  };
  effectInit({
    effect: "cards",
    swiper,
    on: on3,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}

// node_modules/.pnpm/vue-amazing-ui@1.3.3_async-validator@4.2.5_focus-trap@7.5.4_sortablejs@1.15.2/node_modules/vue-amazing-ui/dist/vue-amazing-ui.js
function e0(l = Date.now(), a = "YYYY-MM-DD HH:mm:ss") {
  try {
    let e;
    if (typeof l == "number" || typeof l == "string") {
      if (e = new Date(l), isNaN(e.getTime())) throw new Error("Invalid date");
    } else e = l;
    const t = (s, u = 2) => String(s).padStart(u, "0"), c = (s) => {
      switch (s) {
        case "YYYY":
          return t(e.getFullYear());
        case "YY":
          return t(e.getFullYear()).slice(2, 4);
        case "MM":
          return t(e.getMonth() + 1);
        case "M":
          return String(e.getMonth() + 1);
        case "DD":
          return t(e.getDate());
        case "D":
          return String(e.getDate());
        case "HH":
          return t(e.getHours());
        case "H":
          return String(e.getHours());
        case "mm":
          return t(e.getMinutes());
        case "m":
          return String(e.getMinutes());
        case "ss":
          return t(e.getSeconds());
        case "s":
          return String(e.getSeconds());
        case "SSS":
          return t(e.getMilliseconds(), 3);
        default:
          return s;
      }
    };
    return a.replace(/(YYYY|YY|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS)/g, c);
  } catch (e) {
    return console.error("Error formatting date:", e), "";
  }
}
function Ml2(l, a = 2, e = ",", t = ".", c = "", s = "") {
  if (typeof l != "number" && typeof l != "string") throw new TypeError("Expected value to be of type number or string");
  if (typeof a != "number") throw new TypeError("Expected precision to be of type number");
  const u = Number(l);
  if (isNaN(u) || !isFinite(u)) return "";
  if (u === 0) return u.toFixed(a);
  let n = u.toFixed(a);
  if (typeof e == "string" && e !== "") {
    const [m, r] = n.split(".");
    n = m.replace(/(\d)(?=(\d{3})+$)/g, "$1" + e) + (r ? t + r : "");
  }
  return c + n + s;
}
function be(l, a = 0, e = false) {
  let t = null;
  const c = { id: requestAnimationFrame(function s(u) {
    if (t || (t = u), u - t >= a) {
      try {
        l();
      } catch (n) {
        console.error("Error executing rafTimeout function:", n);
      }
      e && (t = u, c.id = requestAnimationFrame(s));
    } else c.id = requestAnimationFrame(s);
  }) };
  return c;
}
function ce(l) {
  l && l.id && typeof l.id == "number" ? cancelAnimationFrame(l.id) : console.warn("cancelRaf received an invalid id:", l);
}
function je2(l, a = 300) {
  let e = true;
  return function(...t) {
    return e && (e = false, setTimeout(() => {
      l(...t), e = true;
    }, a)), false;
  };
}
function a0(l, a = 300) {
  let e = null;
  return function(...t) {
    e && clearTimeout(e), e = setTimeout(l(...t), a);
  };
}
function Ue(l, a) {
  if (Number.isNaN(l) || Number.isNaN(a)) throw new Error("Both num1 and num2 must be valid numbers.");
  if (l % 1 == 0 && a % 1 == 0) return l + a;
  const e = String(l).split(".")[1] ?? "", t = String(a).split(".")[1] ?? "", c = Math.max(e.length, t.length), s = Math.pow(10, c), u = l.toFixed(c), n = a.toFixed(c);
  return (+u.replace(".", "") + +n.replace(".", "")) / s;
}
function l0(l, a) {
  l = encodeURI(l);
  let e = "";
  a ? e = a : e = new URL(l).pathname.split("/").pop() || "download";
  const t = new XMLHttpRequest();
  t.open("GET", l, true), t.responseType = "blob", t.onerror = function() {
    console.error("下载文件失败");
  }, t.onload = function() {
    if (t.status === 200) {
      const c = t.response, s = document.createElement("a"), u = document.querySelector("body");
      s.href = window.URL.createObjectURL(c), s.download = e, s.style.display = "none", u == null || u.appendChild(s), s.click(), u == null || u.removeChild(s), window.URL.revokeObjectURL(s.href);
    } else console.error("请求文件失败，状态码：", t.status);
  }, t.send();
}
function t0() {
  document.documentElement.classList.toggle("dark");
}
function Re(l, a, e) {
  onMounted(() => l.addEventListener(a, e)), onUnmounted(() => l.removeEventListener(a, e));
}
function pl2(l, a, e = {}) {
  const t = ref(false);
  let c;
  const s = computed(() => {
    const m = toValue(l);
    return m ? Array.isArray(m) ? m.map((r) => toValue(r)).filter((r) => r) : [m] : [];
  }), u = () => {
    c && (c.disconnect(), c = void 0);
  }, n = () => {
    s.value.length && !t.value && (c = new MutationObserver(a), s.value.forEach((m) => c.observe(m, e)));
  };
  return watch(() => s.value, () => {
    u(), n();
  }, { immediate: true, flush: "post" }), onBeforeUnmount(() => u()), { stop: () => {
    t.value = true, u();
  }, start: () => {
    t.value = false, n();
  } };
}
function o0(l = 100) {
  const a = ref(false);
  let e = 0;
  const t = je2(function() {
    let c = window.pageYOffset || document.documentElement.scrollTop;
    c = c < 0 ? 0 : c, a.value = c > e, e = c;
  }, l);
  return Re(window, "scroll", t), { scrollDown: a };
}
function s0() {
  const l = ref(0), a = ref(0);
  let e = performance.now();
  return requestAnimationFrame(function t(c) {
    if (a.value++, a.value >= 10) {
      const s = c - e;
      l.value = Math.round(1e3 / (s / 10)), e = c, a.value = 0;
    }
    requestAnimationFrame(t);
  }), { fps: l };
}
function n0(l) {
  if (!l || typeof l != "string" || l.trim() === "") throw new Error("Invalid mediaQuery parameter. It must be a non-empty string.");
  const a = ref(window && window.matchMedia(l).matches), e = window.matchMedia(l), t = (c) => {
    a.value = c.matches;
  };
  return onMounted(() => {
    e.addEventListener("change", t);
  }), onBeforeUnmount(() => {
    e.removeEventListener("change", t);
  }), { match: a };
}
function Ke2(l, a, e = {}) {
  let t;
  const c = ref(false), s = computed(() => {
    const m = toValue(l);
    return m ? Array.isArray(m) ? m.map((r) => toValue(r)).filter((r) => r) : [m] : [];
  }), u = () => {
    t && (t.disconnect(), t = void 0);
  }, n = () => {
    s.value.length && !c.value && (t = new ResizeObserver(a), s.value.forEach((m) => t.observe(m, e)));
  };
  return watch(() => s.value, () => {
    u(), n();
  }, { immediate: true, flush: "post" }), onBeforeUnmount(() => u()), { stop: () => {
    c.value = true, u();
  }, start: () => {
    c.value = false, n();
  } };
}
var Fe = (l) => (pushScopeId("data-v-143c9080"), l = l(), popScopeId(), l);
var Kl2 = { key: 0, class: "m-alert-icon" };
var Yl2 = ["src"];
var Ul2 = { key: 1, focusable: "false", class: "u-alert-icon", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Gl2 = [Fe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var Zl2 = { key: 2, focusable: "false", class: "u-alert-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Ql2 = [Fe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var Xl2 = { key: 3, focusable: "false", class: "u-alert-icon", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Jl2 = [Fe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var et = { key: 4, focusable: "false", class: "u-alert-icon", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var at = [Fe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var lt2 = { key: 1, class: "m-big-icon" };
var tt = ["src"];
var ot = { key: 1, focusable: "false", class: "u-alert-icon", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var st = [Fe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), Fe(() => createBaseVNode("path", { d: "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1))];
var nt2 = { key: 2, focusable: "false", class: "u-alert-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var it2 = [Fe(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1)), Fe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var ut = { key: 3, focusable: "false", class: "u-alert-icon", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var ct = [Fe(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), Fe(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var rt2 = { key: 4, focusable: "false", class: "u-alert-icon", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var dt2 = [Fe(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1)), Fe(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var vt = { class: "m-alert-content" };
var pt2 = { class: "u-alert-message" };
var ft = { key: 0, class: "u-alert-description" };
var ht = { key: 0 };
var mt2 = { key: 1, focusable: "false", class: "u-alert-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var gt2 = [Fe(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var W = (l, a) => {
  const e = l.__vccOpts || l;
  for (const [t, c] of a) e[t] = c;
  return e;
};
var sa2 = W(defineComponent({ __name: "Alert", props: { message: { default: "" }, description: { default: "" }, type: { default: "info" }, closable: { type: Boolean, default: false }, closeText: { default: "" }, icon: { default: "" }, showIcon: { type: Boolean, default: false } }, emits: ["close"], setup(l, { emit: a }) {
  const e = l, t = ref(), c = ref(false), s = a, u = useSlots(), n = computed(() => {
    var w;
    const r = (w = u.description) == null ? void 0 : w.call(u);
    return r ? !!(r[0].children !== "v-if" && (r != null && r.length)) : e.description;
  });
  function m(r) {
    c.value = true, s("close", r);
  }
  return watchPostEffect(() => {
    e.closable && !c.value && (t.value.style.height = t.value.offsetHeight + "px");
  }), (r, w) => (openBlock(), createBlock(Transition, { name: "alert-motion" }, { default: withCtx(() => [c.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, ref_key: "alert", ref: t, class: normalizeClass(["m-alert", [`alert-${r.type}`, { "alert-width-description": n.value }]]) }, [r.showIcon ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [n.value ? (openBlock(), createElementBlock("span", lt2, [renderSlot(r.$slots, "icon", {}, () => [r.icon ? (openBlock(), createElementBlock("img", { key: 0, src: r.icon, class: "u-big-icon-img" }, null, 8, tt)) : r.type === "info" ? (openBlock(), createElementBlock("svg", ot, st)) : r.type === "success" ? (openBlock(), createElementBlock("svg", nt2, it2)) : r.type === "warning" ? (openBlock(), createElementBlock("svg", ut, ct)) : r.type === "error" ? (openBlock(), createElementBlock("svg", rt2, dt2)) : createCommentVNode("", true)], true)])) : (openBlock(), createElementBlock("span", Kl2, [renderSlot(r.$slots, "icon", {}, () => [r.icon ? (openBlock(), createElementBlock("img", { key: 0, src: r.icon, class: "u-icon-img" }, null, 8, Yl2)) : r.type === "info" ? (openBlock(), createElementBlock("svg", Ul2, Gl2)) : r.type === "success" ? (openBlock(), createElementBlock("svg", Zl2, Ql2)) : r.type === "warning" ? (openBlock(), createElementBlock("svg", Xl2, Jl2)) : r.type === "error" ? (openBlock(), createElementBlock("svg", et, at)) : createCommentVNode("", true)], true)]))], 64)) : createCommentVNode("", true), createBaseVNode("div", vt, [createBaseVNode("div", pt2, [renderSlot(r.$slots, "message", {}, () => [createTextVNode(toDisplayString(r.message), 1)], true)]), n.value ? (openBlock(), createElementBlock("div", ft, [renderSlot(r.$slots, "description", {}, () => [createTextVNode(toDisplayString(r.description), 1)], true)])) : createCommentVNode("", true)]), r.closable ? (openBlock(), createElementBlock("a", { key: 1, class: "m-alert-close", onClick: m }, [renderSlot(r.$slots, "closeText", {}, () => [r.closeText ? (openBlock(), createElementBlock("span", ht, toDisplayString(r.closeText), 1)) : (openBlock(), createElementBlock("svg", mt2, gt2))], true)])) : createCommentVNode("", true)], 2))]), _: 3 }));
} }), [["__scopeId", "data-v-143c9080"]]);
sa2.install = (l) => {
  l.component(sa2.__name, sa2);
};
var yt2 = ["src", "alt"];
var wt = { key: 1, class: "m-icon" };
var na = W(defineComponent({ __name: "Avatar", props: { shape: { default: "circle" }, size: { default: "default" }, src: { default: "" }, alt: { default: "" }, icon: { default: void 0 } }, setup(l) {
  const a = l, e = ref(window.innerWidth), t = je2(function() {
    e.value = window.innerWidth;
  }, 100);
  Re(window, "resize", t);
  const c = computed(() => {
    if (typeof a.size == "string") return null;
    if (typeof a.size == "number") return u.value ? { width: a.size + "px", height: a.size + "px", lineHeight: a.size + "px", fontSize: a.size / 2 + "px" } : { width: a.size + "px", height: a.size + "px", lineHeight: a.size + "px", fontSize: "18px" };
    if (typeof a.size == "object") {
      let r = 32;
      return e.value >= 1600 && a.size.xxl ? r = a.size.xxl : e.value >= 1200 && a.size.xl ? r = a.size.xl : e.value >= 992 && a.size.lg ? r = a.size.lg : e.value >= 768 && a.size.md ? r = a.size.md : e.value >= 576 && a.size.sm ? r = a.size.sm : e.value < 576 && a.size.xs && (r = a.size.xs), { width: r + "px", height: r + "px", lineHeight: r + "px", fontSize: r / 2 + "px" };
    }
  }), s = useSlots(), u = computed(() => {
    var r;
    if (!a.src) {
      const w = (r = s.icon) == null ? void 0 : r.call(s);
      if (w) return !!(w[0].children !== "v-if" && (w != null && w.length));
    }
    return false;
  }), n = computed(() => {
    var r, w;
    if (!a.src && !u.value) {
      const p = (r = s.default) == null ? void 0 : r.call(s);
      if (p) return !!(p[0].children !== "v-if" && ((w = p[0].children) != null && w.length));
    }
    return false;
  }), m = computed(() => {
    if (typeof a.size == "string") return { transform: "scale(1) translateX(-50%)" };
    if (typeof a.size == "number") {
      const r = Math.min(1, Math.max(0.022222222222222223, (1 + 1 * (a.size - 9)) / 45));
      return { lineHeight: a.size + "px", transform: `scale(${r}) translateX(-50%)` };
    }
  });
  return (r, w) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-avatar", [c.value === null ? "avatar-" + r.size : "", "avatar-" + r.shape, { "avatar-image": r.src }]]), style: normalizeStyle(c.value || {}) }, [r.src ? (openBlock(), createElementBlock("img", { key: 0, class: "u-image", src: r.src, alt: r.alt }, null, 8, yt2)) : createCommentVNode("", true), !r.src && u.value ? (openBlock(), createElementBlock("span", wt, [renderSlot(r.$slots, "icon", {}, void 0, true)])) : createCommentVNode("", true), r.src || u.value || !n.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", { key: 2, class: "m-string", style: normalizeStyle(m.value) }, [renderSlot(r.$slots, "default", {}, void 0, true)], 4))], 6));
} }), [["__scopeId", "data-v-3abc848c"]]);
na.install = (l) => {
  l.component(na.__name, na);
};
var kt2 = ((l) => (pushScopeId("data-v-43827d71"), l = l(), popScopeId(), l))(() => createBaseVNode("span", { class: "m-icon" }, [createBaseVNode("svg", { class: "u-icon", viewBox: "0 0 24 24", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xlinkHref: "http://www.w3.org/1999/xlink" }, [createBaseVNode("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, [createBaseVNode("g", { transform: "translate(-139.000000, -4423.000000)", "fill-rule": "nonzero" }, [createBaseVNode("g", { transform: "translate(120.000000, 4285.000000)" }, [createBaseVNode("g", { transform: "translate(7.000000, 126.000000)" }, [createBaseVNode("g", { transform: "translate(24.000000, 24.000000) scale(1, -1) translate(-24.000000, -24.000000) translate(12.000000, 12.000000)" }, [createBaseVNode("g", { transform: "translate(4.000000, 2.000000)" }, [createBaseVNode("path", { d: "M8,0 C8.51283584,0 8.93550716,0.38604019 8.99327227,0.883378875 L9,1 L9,10.584 L12.2928932,7.29289322 C12.6834175,6.90236893 13.3165825,6.90236893 13.7071068,7.29289322 C14.0675907,7.65337718 14.0953203,8.22060824 13.7902954,8.61289944 L13.7071068,8.70710678 L8.70710678,13.7071068 L8.62544899,13.7803112 L8.618,13.784 L8.59530661,13.8036654 L8.4840621,13.8753288 L8.37133602,13.9287745 L8.22929083,13.9735893 L8.14346259,13.9897165 L8.03324678,13.9994506 L7.9137692,13.9962979 L7.77070917,13.9735893 L7.6583843,13.9401293 L7.57677845,13.9063266 L7.47929125,13.8540045 L7.4048407,13.8036865 L7.38131006,13.7856883 C7.35030318,13.7612383 7.32077858,13.7349921 7.29289322,13.7071068 L2.29289322,8.70710678 L2.20970461,8.61289944 C1.90467972,8.22060824 1.93240926,7.65337718 2.29289322,7.29289322 C2.65337718,6.93240926 3.22060824,6.90467972 3.61289944,7.20970461 L3.70710678,7.29289322 L7,10.585 L7,1 L7.00672773,0.883378875 C7.06449284,0.38604019 7.48716416,0 8,0 Z" }), createBaseVNode("path", { d: "M14.9333333,15.9994506 C15.5224371,15.9994506 16,16.4471659 16,16.9994506 C16,17.5122865 15.5882238,17.9349578 15.0577292,17.9927229 L14.9333333,17.9994506 L1.06666667,17.9994506 C0.477562934,17.9994506 0,17.5517354 0,16.9994506 C0,16.4866148 0.411776203,16.0639435 0.9422708,16.0061783 L1.06666667,15.9994506 L14.9333333,15.9994506 Z" })])])])])])])])], -1));
var ia = W(defineComponent({ __name: "BackTop", props: { bottom: { default: 40 }, right: { default: 40 }, zIndex: { default: 9 }, visibilityHeight: { default: 180 }, to: { default: "body" }, listenTo: { default: void 0 } }, emits: ["click", "show"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.bottom == "number" ? e.bottom + "px" : e.bottom), c = computed(() => typeof e.right == "number" ? e.right + "px" : e.right), s = computed(() => n.value >= e.visibilityHeight), u = ref(null), n = ref(0), m = ref(null), r = ref(null), w = a, p = { childList: true, attributes: true, subtree: true }, g = new MutationObserver(() => {
    var x;
    n.value = ((x = m.value) == null ? void 0 : x.scrollTop) ?? 0;
  });
  watch(() => e.listenTo, () => {
    g.disconnect(), h3(), b();
  }, { flush: "post" }), watch(() => e.to, () => {
    M();
  }, { flush: "post" }), watch(s, (x) => {
    w("show", x);
  }), onMounted(() => {
    b(), M();
  }), onBeforeUnmount(() => {
    var x;
    g.disconnect(), h3(), (x = u.value) == null || x.remove();
  });
  const f = je2(function(x) {
    n.value = x.target.scrollTop;
  }, 100), v = je2(function() {
    var x;
    n.value = ((x = m.value) == null ? void 0 : x.scrollTop) ?? 0;
  }, 100);
  function h3() {
    m.value && (m.value.removeEventListener("scroll", f), window.removeEventListener("resize", v));
  }
  function b() {
    var x;
    e.listenTo === void 0 ? m.value = B((x = u.value) == null ? void 0 : x.parentElement) : typeof e.listenTo == "string" ? m.value = document.getElementsByTagName(e.listenTo)[0] : e.listenTo instanceof HTMLElement && (m.value = e.listenTo), m.value && (g.observe(m.value, p), m.value.addEventListener("scroll", f), window.addEventListener("resize", v));
  }
  function M() {
    var x;
    typeof e.to == "string" ? r.value = document.getElementsByTagName(e.to)[0] : e.to instanceof HTMLElement && (r.value = e.to), (x = r.value) == null || x.appendChild(u.value);
  }
  function B(x) {
    return x ? x.scrollHeight > x.clientHeight ? x : B(x.parentElement) : null;
  }
  function k() {
    m.value && m.value.scrollTo({ top: 0, behavior: "smooth" }), w("click");
  }
  return (x, z) => (openBlock(), createBlock(Transition, { name: "zoom" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { ref_key: "backtop", ref: u, onClick: k, class: "m-backtop", style: normalizeStyle(`bottom: ${t.value}; right: ${c.value}; --z-index: ${x.zIndex};`) }, [renderSlot(x.$slots, "default", {}, () => [kt2], true)], 4), [[vShow, s.value]])]), _: 3 }));
} }), [["__scopeId", "data-v-43827d71"]]);
ia.install = (l) => {
  l.component(ia.__name, ia);
};
var bt2 = { class: "u-status-text" };
var xt = ["title"];
var Mt2 = { key: 0, class: "m-number", style: { transition: "none 0s ease 0s" } };
var _t = { class: "u-number" };
var rl = ((l) => (l.pink = "pink", l.red = "red", l.yellow = "yellow", l.orange = "orange", l.cyan = "cyan", l.green = "green", l.blue = "blue", l.purple = "purple", l.geekblue = "geekblue", l.magenta = "magenta", l.volcano = "volcano", l.gold = "gold", l.lime = "lime", l))(rl || {});
var ua = W(defineComponent({ __name: "Badge", props: { color: { default: "" }, value: { default: void 0 }, max: { default: 99 }, showZero: { type: Boolean, default: false }, dot: { type: Boolean, default: false }, offset: { default: void 0 }, status: { default: void 0 }, text: { default: "" }, valueStyle: { default: () => ({}) }, zIndex: { default: 9 }, title: { default: "" }, ripple: { type: Boolean, default: true } }, setup(l) {
  const a = l, e = computed(() => {
    if (a.color && !Object.keys(rl).includes(a.color)) return a.value !== void 0 && a.value !== 0 || a.showZero && a.value === 0 ? { backgroundColor: a.color } : { color: a.color, backgroundColor: a.color };
  }), t = computed(() => a.color && Object.keys(rl).includes(a.color) ? a.value !== void 0 && a.value !== 0 || a.showZero && a.value === 0 ? `color-${a.color} white` : "color-" + a.color : a.status ? a.value !== void 0 && a.value !== 0 || a.showZero && a.value === 0 ? `status-${a.status} white` : "status-" + a.status : void 0), c = useSlots(), s = computed(() => {
    var p;
    if (a.value !== void 0 || a.dot || !a.color && !a.status) {
      const g = (p = c.default) == null ? void 0 : p.call(c);
      if (g) return !!(g[0].children !== "v-if" && (g != null && g.length));
    }
    return false;
  }), u = computed(() => {
    var p;
    if (!a.color && !a.status) {
      const g = (p = c.value) == null ? void 0 : p.call(c);
      return !!(g != null && g.length);
    }
    return false;
  }), n = computed(() => !!(a.value !== void 0 && a.value !== 0 || a.showZero && a.value === 0 || a.dot)), m = computed(() => {
    var p;
    return (p = a.offset) != null && p.length ? { right: r(a.offset[0]) ? -a.offset[0] + "px" : w(a.offset[0]), marginTop: r(a.offset[1]) ? a.offset[1] + "px" : a.offset[1] } : {};
  });
  function r(p) {
    return typeof p == "number";
  }
  function w(p) {
    return p.includes("-") ? p.replace("-", "") : `-${p}`;
  }
  return (p, g) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-badge", { "badge-status-color": p.value === void 0 && (p.color || p.status) }]), style: normalizeStyle([`--z-index: ${p.zIndex}`, p.value !== void 0 || p.dot ? null : m.value]) }, [p.value !== void 0 || p.dot || !p.color && !p.status ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [s.value ? renderSlot(p.$slots, "default", { key: 0 }, void 0, true) : createCommentVNode("", true), u.value ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["m-value", { "only-number": !s.value }]) }, [renderSlot(p.$slots, "value", {}, void 0, true)], 2)) : (openBlock(), createBlock(Transition, { key: 2, name: "zoom" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-badge-value", [{ "small-num": typeof p.value == "number" && p.value < 10, "only-number": !s.value, "only-dot": n.value && (p.value === void 0 || p.value === 0 && !p.showZero || p.dot) }, t.value]]), style: normalizeStyle([e.value, m.value, p.valueStyle]), title: p.title || (p.value !== void 0 ? String(p.value) : "") }, [p.dot ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", Mt2, [createBaseVNode("span", _t, toDisplayString(typeof p.value == "number" && p.value > p.max ? p.max + "+" : p.value), 1)]))], 14, xt), [[vShow, n.value]])]), _: 1 }))], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("span", { class: normalizeClass(["u-status-dot", [t.value, { "dot-ripple": p.ripple }]]), style: normalizeStyle(e.value) }, null, 6), createBaseVNode("span", bt2, [renderSlot(p.$slots, "default", {}, () => [createTextVNode(toDisplayString(p.text), 1)], true)])], 64))], 6));
} }), [["__scopeId", "data-v-5fb9215d"]]);
ua.install = (l) => {
  l.component(ua.__name, ua);
};
var _l2 = (l) => (pushScopeId("data-v-42762479"), l = l(), popScopeId(), l);
var zt = ["href", "title", "target"];
var Ct2 = { key: 0, class: "u-separator" };
var $t = { key: 1, class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "right", "aria-hidden": "true", focusable: "false" };
var Bt = [_l2(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1))];
var Ft = _l2(() => createBaseVNode("div", { class: "assist" }, null, -1));
var St2 = defineComponent({ __name: "Breadcrumb", props: { routes: { default: () => [] }, fontSize: { default: 14 }, height: { default: 21 }, maxWidth: { default: 180 }, separator: { default: "" }, target: { default: "_self" } }, setup(l) {
  const a = l, e = computed(() => a.routes.length);
  function t(c) {
    var s = c.path;
    if (c.query && JSON.stringify(c.query) !== "{}") {
      const u = c.query;
      Object.keys(u).forEach((n, m) => {
        s = m === 0 ? s + "?" + n + "=" + u[n] : s + "&" + n + "=" + u[n];
      });
    }
    return s;
  }
  return (c, s) => (openBlock(), createElementBlock("div", { class: "m-breadcrumb", style: normalizeStyle(`height: ${c.height}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(c.routes, (u, n) => (openBlock(), createElementBlock("div", { class: "m-bread", key: n }, [createBaseVNode("a", { class: normalizeClass(["u-route", { active: n === e.value - 1 }]), style: normalizeStyle(`font-size: ${c.fontSize}px; max-width: ${c.maxWidth}px;`), href: n === e.value - 1 ? "javascript:;" : t(u), title: u.name, target: n === e.value - 1 ? "_self" : c.target }, toDisplayString(u.name || "--"), 15, zt), n !== e.value - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [c.separator ? (openBlock(), createElementBlock("span", Ct2, toDisplayString(c.separator), 1)) : (openBlock(), createElementBlock("svg", $t, Bt))], 64)) : createCommentVNode("", true)]))), 128)), Ft], 4));
} });
var ca2 = W(St2, [["__scopeId", "data-v-42762479"]]);
ca2.install = (l) => {
  l.component(ca2.__name, ca2);
};
var zl2 = (l) => (pushScopeId("data-v-291bfcad"), l = l(), popScopeId(), l);
var Lt = ["disabled", "href", "target", "onKeydown"];
var At = { key: 0, class: "m-static-circle" };
var Dt = [zl2(() => createBaseVNode("span", { class: "u-spin-circle" }, null, -1))];
var Tt2 = { key: 1, class: "m-dynamic-circle" };
var Et2 = [zl2(() => createBaseVNode("svg", { class: "circular", viewBox: "0 0 50 50", fill: "currentColor" }, [createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" })], -1))];
var Ht2 = { class: "u-text" };
var $e = W(defineComponent({ __name: "Button", props: { type: { default: "default" }, size: { default: "middle" }, ghost: { type: Boolean, default: false }, rippleColor: { default: void 0 }, href: { default: void 0 }, target: { default: "_self" }, disabled: { type: Boolean, default: false }, loading: { type: Boolean, default: false }, loadingType: { default: "dynamic" }, loadingColor: { default: "rgba(0, 0, 0, 0.88)" }, block: { type: Boolean, default: false } }, emits: ["click"], setup(l, { emit: a }) {
  const e = { default: "#1677ff", reverse: "#1677ff", primary: "#1677ff", danger: "#ff4d4f", dashed: "#1677ff", text: "transparent", link: "transparent" }, t = ref(false), c = a;
  function s(m) {
    c("click", m), t.value ? (t.value = false, nextTick(() => {
      t.value = true;
    })) : t.value = true;
  }
  function u(m) {
    s(m);
  }
  function n() {
    t.value = false;
  }
  return (m, r) => (openBlock(), createElementBlock("a", mergeProps({ tabindex: "0", class: ["m-btn", [`btn-${m.type} btn-${m.size}`, { "btn-block": m.block, "btn-ghost": m.ghost, [`loading-${m.size}`]: !m.href && m.loading, "btn-loading": !m.href && m.loading, "btn-disabled": m.disabled }]], style: `--ripple-color: ${m.rippleColor || e[m.type]}; --loading-color: ${m.loadingColor};`, disabled: m.disabled, href: m.href ? m.href : "javascript:void(0);", target: m.href ? m.target : "_self", onClick: s, onKeydown: withKeys(withModifiers(u, ["prevent"]), ["enter"]) }, m.$attrs), [m.href || m.loadingType !== "static" ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", At, Dt)), m.href || m.loadingType !== "dynamic" ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Tt2, Et2)), createBaseVNode("span", Ht2, [renderSlot(m.$slots, "default", {}, void 0, true)]), m.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 2, class: normalizeClass(["m-button-wave", { "button-wave-active": t.value }]), onAnimationend: n }, null, 34))], 16, Lt));
} }), [["__scopeId", "data-v-291bfcad"]]);
$e.install = (l) => {
  l.component($e.__name, $e);
};
var It2 = { key: 2, class: "m-skeleton-image" };
var jt = [((l) => (pushScopeId("data-v-db68d630"), l = l(), popScopeId(), l))(() => createBaseVNode("svg", { viewBox: "0 0 1098 1024", xmlns: "http://www.w3.org/2000/svg", class: "m-skeleton-image-svg" }, [createBaseVNode("path", { class: "u-skeleton-image-path", d: "M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z" })], -1))];
var Vt = { key: 3, class: "m-skeleton-header" };
var Rt2 = { key: 0, class: "m-skeleton-content" };
var Ge2 = W(defineComponent({ __name: "Skeleton", props: { animated: { type: Boolean, default: true }, button: { type: [Boolean, Object], default: false }, avatar: { type: [Boolean, Object], default: false }, input: { type: [Boolean, Object], default: false }, image: { type: Boolean, default: false }, title: { type: [Boolean, Object], default: true }, paragraph: { type: [Boolean, Object], default: true }, loading: { type: Boolean, default: true } }, setup(l) {
  const a = l, e = computed(() => {
    if (typeof a.button == "object") return a.button.size === "large" ? 40 : a.button.size === "small" ? 24 : 32;
  }), t = computed(() => typeof a.avatar == "boolean" ? 8 : typeof a.avatar.size == "number" ? (a.avatar.size - 16) / 2 : { default: 8, small: 4, large: 12 }[a.avatar.size || "default"]), c = computed(() => typeof a.title == "boolean" ? "38%" : typeof a.title.width == "number" ? a.title.width + "px" : a.title.width || "38%"), s = computed(() => typeof a.paragraph == "boolean" ? a.avatar ? 2 : 3 : a.paragraph.rows), u = computed(() => typeof a.paragraph == "boolean" ? Array(s.value) : Array.isArray(a.paragraph.width) ? a.paragraph.width.map((n) => typeof n == "number" ? n + "px" : n) : typeof a.paragraph.width == "number" ? Array(s.value).fill(a.paragraph.width + "px") : Array(s.value).fill(a.paragraph.width));
  return (n, m) => n.loading ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-skeleton", { "m-skeleton-avatar": n.avatar, "m-skeleton-animated": n.animated }]), style: normalizeStyle(`--button-size: ${e.value}px; --title-top: ${t.value}px;`) }, [n.button ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["u-skeleton-button", { "u-button-round": typeof n.button != "boolean" && n.button.shape === "round", "u-button-circle": typeof n.button != "boolean" && n.button.shape === "circle", "u-button-sm": typeof n.button != "boolean" && n.button.size === "small", "u-button-lg": typeof n.button != "boolean" && n.button.size === "large", "u-button-block": typeof n.button != "boolean" && n.button.shape !== "circle" && n.button.block }]) }, null, 2)) : createCommentVNode("", true), n.input ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["u-skeleton-input", { "u-input-sm": typeof n.input != "boolean" && n.input.size === "small", "u-input-lg": typeof n.input != "boolean" && n.input.size === "large" }]) }, null, 2)) : createCommentVNode("", true), n.image ? (openBlock(), createElementBlock("div", It2, jt)) : createCommentVNode("", true), n.avatar ? (openBlock(), createElementBlock("div", Vt, [createBaseVNode("span", { class: normalizeClass(["u-skeleton-avatar", { "u-avatar-sm": typeof n.avatar != "boolean" && n.avatar.size === "small", "u-avatar-lg": typeof n.avatar != "boolean" && n.avatar.size === "large", "u-avatar-square": typeof n.avatar != "boolean" && n.avatar.shape === "square" }]) }, null, 2)])) : createCommentVNode("", true), n.button || n.image || n.input ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 4 }, [n.title || n.paragraph ? (openBlock(), createElementBlock("div", Rt2, [n.title ? (openBlock(), createElementBlock("h3", { key: 0, class: "u-skeleton-title", style: normalizeStyle({ width: c.value }) }, null, 4)) : createCommentVNode("", true), n.paragraph ? (openBlock(), createElementBlock("ul", { key: 1, class: normalizeClass(["m-skeleton-paragraph", { mt24: n.title, mt28: n.title && n.avatar }]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (r) => (openBlock(), createElementBlock("li", { key: r, style: normalizeStyle(`width: ${u.value[r - 1]};`) }, null, 4))), 128))], 2)) : createCommentVNode("", true)])) : createCommentVNode("", true)], 64))], 6)) : renderSlot(n.$slots, "default", { key: 1 }, void 0, true);
} }), [["__scopeId", "data-v-db68d630"]]);
Ge2.install = (l) => {
  l.component(Ge2.__name, Ge2);
};
var Wt = { class: "m-head-wrapper" };
var qt2 = { class: "u-title" };
var Nt = { class: "u-extra" };
var ra = W(defineComponent({ __name: "Card", props: { width: { default: "auto" }, title: { default: void 0 }, extra: { default: void 0 }, bordered: { type: Boolean, default: true }, loading: { type: Boolean, default: false }, size: { default: "default" }, headStyle: { default: () => ({}) }, bodyStyle: { default: () => ({}) } }, setup(l) {
  const a = l, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), t = useSlots(), c = computed(() => {
    var m, r, w, p;
    const s = (m = t.title) == null ? void 0 : m.call(t), u = (r = t.extra) == null ? void 0 : r.call(t);
    let n = 0;
    return s && ((w = s[0].children) != null && w.length) && n++, u && ((p = u[0].children) != null && p.length) && n++, !!n || a.title || a.extra;
  });
  return (s, u) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-card", { bordered: s.bordered, "m-small-card": s.size === "small" }]), style: normalizeStyle(`width: ${e.value};`) }, [c.value ? (openBlock(), createElementBlock("div", { key: 0, class: "m-card-head", style: normalizeStyle(s.headStyle) }, [createBaseVNode("div", Wt, [createBaseVNode("div", qt2, [renderSlot(s.$slots, "title", {}, () => [createTextVNode(toDisplayString(s.title), 1)], true)]), createBaseVNode("div", Nt, [renderSlot(s.$slots, "extra", {}, () => [createTextVNode(toDisplayString(s.extra), 1)], true)])])], 4)) : createCommentVNode("", true), createBaseVNode("div", { class: "m-card-body", style: normalizeStyle(s.bodyStyle) }, [createVNode(unref(Ge2), { title: false, loading: s.loading }, { default: withCtx(() => [renderSlot(s.$slots, "default", {}, void 0, true)]), _: 3 }, 8, ["loading"])], 4)], 6));
} }), [["__scopeId", "data-v-41719071"]]);
ra.install = (l) => {
  l.component(ra.__name, ra);
};
var ke = (l) => (pushScopeId("data-v-2e86389b"), l = l(), popScopeId(), l);
var Pt = { class: "m-spin" };
var Ot = { class: "m-spin-box" };
var Kt = { key: 0, class: "m-loading-dot" };
var Yt2 = [ke(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), ke(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), ke(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), ke(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1))];
var Ut2 = createStaticVNode('<div class="m-spin-dot" data-v-2e86389b><span class="u-spin-item" data-v-2e86389b></span><span class="u-spin-item" data-v-2e86389b></span><span class="u-spin-item" data-v-2e86389b></span><span class="u-spin-item" data-v-2e86389b></span></div>', 1);
var Gt2 = [ke(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1)), ke(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1)), ke(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1)), ke(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1))];
var Zt = createStaticVNode('<div class="m-spin-line" data-v-2e86389b><span class="u-spin-item" data-v-2e86389b></span><span class="u-spin-item" data-v-2e86389b></span><span class="u-spin-item" data-v-2e86389b></span><span class="u-spin-item" data-v-2e86389b></span></div>', 1);
var Qt = [ke(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1)), ke(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1)), ke(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1)), ke(() => createBaseVNode("span", { class: "u-spin-item" }, null, -1))];
var Xt2 = { key: 3, class: "u-quarter-circle" };
var Jt2 = { key: 4, class: "u-half-circle" };
var e1 = { key: 5, class: "u-three-quarters-circle" };
var a1 = { key: 6, class: "m-dynamic-circle" };
var l1 = [ke(() => createBaseVNode("svg", { class: "circular", viewBox: "0 0 50 50" }, [createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" })], -1))];
var t1 = { key: 7, class: "m-magic-ring" };
var o1 = [ke(() => createBaseVNode("div", { class: "m-outer-ring" }, null, -1)), ke(() => createBaseVNode("div", { class: "u-inner-ring" }, null, -1))];
var Se2 = W(defineComponent({ __name: "Spin", props: { spinning: { type: Boolean, default: true }, size: { default: "default" }, tip: { default: void 0 }, indicator: { default: "dot" }, color: { default: "#1677FF" }, ringColor: { default: "#4096FF" }, rotate: { type: Boolean, default: false }, speed: { default: 600 } }, setup: (l) => (a, e) => (openBlock(), createElementBlock("div", { class: normalizeClass(`m-spin-wrap spin-${a.size}`), style: normalizeStyle(`--color: ${a.color}; --ring-color: ${a.ringColor}; --speed: ${a.speed}ms;`) }, [withDirectives(createBaseVNode("div", Pt, [createBaseVNode("div", Ot, [a.indicator === "dot" ? (openBlock(), createElementBlock("div", Kt, Yt2)) : createCommentVNode("", true), a.indicator === "spin-dot" ? (openBlock(), createElementBlock("div", { key: 1, class: normalizeClass(["spin-wrap-box", { "spin-wrap-rotate": a.rotate }]) }, [Ut2, createBaseVNode("div", { class: normalizeClass(["m-spin-dot spin-rotate", { "spin-tip": a.tip }]) }, Gt2, 2)], 2)) : createCommentVNode("", true), a.indicator === "spin-line" ? (openBlock(), createElementBlock("div", { key: 2, class: normalizeClass(["spin-wrap-box", { "spin-wrap-rotate": a.rotate }]) }, [Zt, createBaseVNode("div", { class: normalizeClass(["m-spin-line spin-rotate", { "spin-tip": a.tip }]) }, Qt, 2)], 2)) : createCommentVNode("", true), a.indicator === "quarter-circle" ? (openBlock(), createElementBlock("div", Xt2)) : createCommentVNode("", true), a.indicator === "half-circle" ? (openBlock(), createElementBlock("div", Jt2)) : createCommentVNode("", true), a.indicator === "three-quarters-circle" ? (openBlock(), createElementBlock("div", e1)) : createCommentVNode("", true), a.indicator === "dynamic-circle" ? (openBlock(), createElementBlock("div", a1, l1)) : createCommentVNode("", true), a.indicator === "magic-ring" ? (openBlock(), createElementBlock("div", t1, o1)) : createCommentVNode("", true), withDirectives(createBaseVNode("p", { class: "u-tip" }, toDisplayString(a.tip), 513), [[vShow, a.tip]])])], 512), [[vShow, a.spinning]]), createBaseVNode("div", { class: normalizeClass(["m-spin-content", { "m-spin-mask": a.spinning }]) }, [renderSlot(a.$slots, "default", {}, void 0, true)], 2)], 6)) }), [["__scopeId", "data-v-2e86389b"]]);
Se2.install = (l) => {
  l.component(Se2.__name, Se2);
};
var Cl2 = (l) => (pushScopeId("data-v-96133fe2"), l = l(), popScopeId(), l);
var s1 = ["onClick"];
var n1 = ["onLoad", "src", "alt"];
var i1 = ["src", "alt"];
var u1 = [Cl2(() => createBaseVNode("path", { d: "M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z" }, null, -1))];
var c1 = [Cl2(() => createBaseVNode("path", { d: "M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z" }, null, -1))];
var r1 = ["onClick", "onMouseenter"];
var d1 = defineComponent({ __name: "Carousel", props: { images: { default: () => [] }, width: { default: "100%" }, height: { default: "100vh" }, autoplay: { type: Boolean, default: false }, pauseOnMouseEnter: { type: Boolean, default: false }, effect: { default: "slide" }, interval: { default: 3e3 }, showArrow: { type: Boolean, default: true }, arrowColor: { default: "#FFF" }, arrowSize: { default: 36 }, dots: { type: Boolean, default: true }, dotSize: { default: 10 }, dotColor: { default: "rgba(255, 255, 255, 0.3)" }, dotActiveColor: { default: "#1677FF" }, dotStyle: { default: () => ({}) }, dotActiveStyle: { default: () => ({}) }, dotPosition: { default: "bottom" }, dotsTrigger: { default: "click" }, spinStyle: { default: () => ({}) }, fadeDuration: { default: 500 }, fadeFunction: { default: "cubic-bezier(0.4, 0, 0.2, 1)" }, slideDuration: { default: 800 }, slideFunction: { default: () => [0.65, 0, 0.35, 1] } }, emits: ["change", "click"], setup(l, { expose: a, emit: e }) {
  const t = l, c = ref(0), s = ref(), u = ref(false), n = ref(false), m = ref(), r = ref(), w = ref(), p = ref(1), g = ref(), f = ref(), v = ref(Array(t.images.length).fill(false)), h3 = computed(() => typeof t.width == "number" ? t.width + "px" : t.width), b = computed(() => typeof t.height == "number" ? t.height + "px" : t.height), M = computed(() => t.images.length), B = computed(() => ["left", "right"].includes(t.dotPosition)), k = computed(() => B.value ? f.value : g.value), x = computed(() => t.effect === "slide" ? { transform: (B.value ? "translateY" : "translateX") + `(${-c.value}px)` } : {});
  watch(() => [B.value, t.effect, t.images, t.autoplay, t.interval, t.fadeDuration, t.fadeFunction, v.value[0]], () => {
    $();
  }, { deep: true, flush: "post" });
  const z = e;
  function $() {
    s.value && ce(s.value), m.value && cancelAnimationFrame(m.value), n.value = false, t.effect === "slide" && (c.value = (p.value - 1) * k.value), V();
  }
  function L(j) {
    v.value[j] = true;
  }
  function T(j) {
    M.value > 1 && (j.key !== "ArrowLeft" && j.key !== "ArrowUp" || U(), j.key !== "ArrowRight" && j.key !== "ArrowDown" || G3());
  }
  function V() {
    t.autoplay && M.value > 1 && v.value[0] && (u.value = false, P(), console.log("Carousel Start"));
  }
  function P() {
    u.value || (s.value && ce(s.value), s.value = be(() => {
      n.value = true, t.effect === "slide" ? (ve(c.value % (M.value * k.value) + k.value), p.value = p.value % M.value + 1) : de("left");
    }, t.interval));
  }
  function U() {
    n.value || (n.value = true, s.value && ce(s.value), t.effect === "slide" ? (ne((p.value + M.value - 2) % M.value * k.value), p.value = p.value - 1 > 0 ? p.value - 1 : M.value) : de("right"));
  }
  function G3() {
    n.value || (n.value = true, s.value && ce(s.value), t.effect === "slide" ? (ve(p.value * k.value), p.value = p.value % M.value + 1) : de("left"));
  }
  watch(p, (j) => {
    z("change", j);
  }), Re(document, "visibilitychange", function() {
    console.log("visibilityState", document.visibilityState), document.visibilityState === "hidden" ? (s.value && ce(s.value), c.value = H.value + N.value, n.value = false) : V();
  }), Ke2(w, () => {
    g.value = w.value.offsetWidth, f.value = w.value.offsetHeight, $();
  });
  const E = ref(0), H = ref(0), N = ref(0), te = useTransition(E, { duration: t.slideDuration, transition: t.slideFunction });
  function de(j, Q) {
    p.value = j === "left" ? p.value % M.value + 1 : j === "right" ? p.value - 1 > 0 ? p.value - 1 : M.value : Q, be(() => {
      n.value = false, t.autoplay && P();
    }, t.fadeDuration);
  }
  function O(j) {
    r.value = j, E.value = E.value ? 0 : 1, H.value = c.value, N.value = j - H.value;
  }
  function ue() {
    E.value ? c.value = H.value + N.value * te.value : c.value = H.value + N.value * (1 - te.value);
  }
  function we() {
    c.value >= r.value ? (n.value = false, t.autoplay && P()) : (ue(), m.value = requestAnimationFrame(we));
  }
  function ve(j) {
    c.value === M.value * k.value && (c.value = 0), O(j), m.value = requestAnimationFrame(we);
  }
  function Me2() {
    c.value <= r.value ? (n.value = false, t.autoplay && P()) : (ue(), m.value = requestAnimationFrame(Me2));
  }
  function ne(j) {
    c.value === 0 && (c.value = M.value * k.value), O(j), m.value = requestAnimationFrame(Me2);
  }
  function ze2(j) {
    !n.value && p.value !== j && (n.value = true, s.value && ce(s.value), j < p.value && (t.effect === "slide" ? (ne((j - 1) * k.value), p.value = j) : de("switch", j)), j > p.value && (t.effect === "slide" ? (ve((j - 1) * k.value), p.value = j) : de("switch", j)));
  }
  function Ae(j) {
    z("click", j);
  }
  return a({ to: function(j) {
    j >= 1 && j <= M.value && ze2(j);
  }, prev: function() {
    U();
  }, next: function() {
    G3();
  }, getCurrentIndex: function() {
    return p.value;
  } }), (j, Q) => (openBlock(), createElementBlock("div", { ref_key: "carouselRef", ref: w, class: normalizeClass(["m-carousel", { "carousel-vertical": B.value, "carousel-fade": j.effect === "fade" }]), style: normalizeStyle(`--arrow-color: ${j.arrowColor}; --dot-size: ${j.dotSize}px; --dot-color: ${j.dotColor}; --fade-duration: ${t.fadeDuration}ms; --fade-function: ${t.fadeFunction}; width: ${h3.value}; height: ${b.value};`), onMouseenter: Q[2] || (Q[2] = (le) => j.autoplay && j.pauseOnMouseEnter ? (s.value && ce(s.value), u.value = true, void console.log("Carousel Stop")) : () => false), onMouseleave: Q[3] || (Q[3] = (le) => j.autoplay && j.pauseOnMouseEnter ? V() : () => false) }, [createBaseVNode("div", { class: "m-carousel-flex", style: normalizeStyle(x.value) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(j.images, (le, he) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-image", { "image-fade-active": j.effect === "fade" && p.value === he + 1 }]), onClick: (Ce2) => Ae(le), key: he }, [createVNode(unref(Se2), mergeProps({ spinning: !v.value[he], indicator: "dynamic-circle", ref_for: true }, j.spinStyle), { default: withCtx(() => [(openBlock(), createElementBlock("img", { onLoad: (Ce2) => L(he), src: le.src, key: le.src, alt: le.title, class: "u-image", style: normalizeStyle(`width: ${g.value}px; height: ${f.value}px;`) }, null, 44, n1))]), _: 2 }, 1040, ["spinning"])], 10, s1))), 128)), M.value && j.effect === "slide" ? (openBlock(), createElementBlock("div", { key: 0, class: "m-image", onClick: Q[1] || (Q[1] = (le) => Ae(j.images[0])) }, [createVNode(unref(Se2), mergeProps({ spinning: !v.value[0], indicator: "dynamic-circle" }, j.spinStyle), { default: withCtx(() => [(openBlock(), createElementBlock("img", { onLoad: Q[0] || (Q[0] = (le) => L(0)), src: j.images[0].src, key: j.images[0].src, alt: j.images[0].title, class: "u-image", style: normalizeStyle(`width: ${g.value}px; height: ${f.value}px;`) }, null, 44, i1))]), _: 1 }, 16, ["spinning"])])) : createCommentVNode("", true)], 4), j.showArrow ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [(openBlock(), createElementBlock("svg", { tabindex: "0", class: "arrow-left", style: normalizeStyle(`width: ${j.arrowSize}px; height: ${j.arrowSize}px;`), onClick: U, onKeydown: withModifiers(T, ["prevent"]), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, u1, 36)), (openBlock(), createElementBlock("svg", { tabindex: "0", class: "arrow-right", style: normalizeStyle(`width: ${j.arrowSize}px; height: ${j.arrowSize}px;`), onClick: G3, onKeydown: withModifiers(T, ["prevent"]), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, c1, 36))], 64)) : createCommentVNode("", true), j.dots ? (openBlock(), createElementBlock("div", { key: 1, class: normalizeClass(["m-switch", `switch-${j.dotPosition}`]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(M.value, (le) => (openBlock(), createElementBlock("div", { tabindex: "0", class: "u-dot", style: normalizeStyle([j.dotStyle, p.value === le ? { backgroundColor: j.dotActiveColor, ...j.dotActiveStyle } : {}]), key: le, onClick: (he) => j.dotsTrigger === "click" ? ze2(le) : () => false, onMouseenter: (he) => j.dotsTrigger === "hover" ? function(Ce2) {
    ze2(Ce2);
  }(le) : () => false, onKeydown: withModifiers(T, ["prevent"]) }, null, 44, r1))), 128))], 2)) : createCommentVNode("", true)], 38));
} });
var da2 = W(d1, [["__scopeId", "data-v-96133fe2"]]);
da2.install = (l) => {
  l.component(da2.__name, da2);
};
var v1 = { class: "m-empty" };
var p1 = [createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-1571ea47><g transform="translate(24 31.67)" data-v-1571ea47><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-1571ea47></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-1571ea47></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-1571ea47></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-1571ea47></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-1571ea47></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-1571ea47></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-1571ea47><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-1571ea47></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-1571ea47></path></g></g>', 1)];
var f1 = [createStaticVNode('<g transform="translate(0 1)" fill="none" fill-rule="evenodd" data-v-1571ea47><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" data-v-1571ea47></ellipse><g fill-rule="nonzero" stroke="#d9d9d9" data-v-1571ea47><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" data-v-1571ea47></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" data-v-1571ea47></path></g></g>', 1)];
var h1 = ["src"];
var qe2 = W(defineComponent({ __name: "Empty", props: { description: { default: "暂无数据" }, image: { default: "1" }, imageStyle: { default: () => ({}) } }, setup: (l) => (a, e) => (openBlock(), createElementBlock("div", v1, [a.image === "1" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-empty-1", style: normalizeStyle(a.imageStyle), viewBox: "0 0 184 152", xmlns: "http://www.w3.org/2000/svg" }, p1, 4)) : a.image === "2" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-empty-2", style: normalizeStyle(a.imageStyle), viewBox: "0 0 64 41", xmlns: "http://www.w3.org/2000/svg" }, f1, 4)) : renderSlot(a.$slots, "default", { key: 2 }, () => [createBaseVNode("img", { class: "u-empty", src: a.image, style: normalizeStyle(a.imageStyle), alt: "image" }, null, 12, h1)], true), a.description ? (openBlock(), createElementBlock("p", { key: 3, class: normalizeClass(["u-description", { gray: a.image === "2" }]) }, [renderSlot(a.$slots, "description", {}, () => [createTextVNode(toDisplayString(a.description), 1)], true)], 2)) : createCommentVNode("", true)])) }), [["__scopeId", "data-v-1571ea47"]]);
qe2.install = (l) => {
  l.component(qe2.__name, qe2);
};
var fl2 = (l) => (pushScopeId("data-v-783a3d83"), l = l(), popScopeId(), l);
var m1 = { class: "m-select-search" };
var g1 = ["readonly", "disabled"];
var y1 = ["title"];
var w1 = [fl2(() => createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1))];
var k1 = [fl2(() => createBaseVNode("path", { d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" }, null, -1))];
var b1 = [fl2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var x1 = ["title", "onMouseenter", "onClick"];
var M1 = defineComponent({ __name: "Select", props: { options: { default: () => [] }, label: { default: "label" }, value: { default: "value" }, placeholder: { default: "请选择" }, disabled: { type: Boolean, default: false }, allowClear: { type: Boolean, default: false }, search: { type: Boolean, default: false }, filter: { type: [Function, Boolean], default: true }, width: { default: "auto" }, height: { default: 32 }, maxDisplay: { default: 6 }, modelValue: { default: null } }, emits: ["update:modelValue", "change"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), c = ref(), s = ref(), u = ref(), n = ref(), m = ref(false), r = ref(false), w = ref(), p = ref(false), g = ref(true), f = ref(false), v = ref(false), h3 = ref(false), b = ref(false);
  function M() {
    m.value = true, e.allowClear && (s.value || e.search && n.value) && (g.value = false, f.value = true, e.search && (h3.value = false));
  }
  function B() {
    m.value = false, e.allowClear && f.value && (f.value = false, e.search || (g.value = true)), e.search && (p.value ? (h3.value = true, g.value = false) : (h3.value = false, g.value = true));
  }
  function k($) {
    var L;
    r.value = !!((L = $.target) != null && L.value);
  }
  watchEffect(() => {
    e.search ? (n.value ? c.value = e.options.filter(($) => typeof e.filter == "function" ? e.filter(n.value, $) : $[e.label].includes(n.value)) : c.value = [...e.options], c.value.length && n.value ? w.value = c.value[0][e.value] : w.value = null) : c.value = e.options;
  }), watchEffect(() => {
    (function() {
      if (e.modelValue) {
        const $ = e.options.find((L) => L[e.value] === e.modelValue);
        $ ? (s.value = $[e.label], w.value = $[e.value]) : (s.value = e.modelValue, w.value = null);
      } else s.value = null, w.value = null;
    })();
  }), watch(p, ($) => {
    e.search && !$ && (n.value = void 0, r.value = false);
  });
  const x = a;
  function z() {
    b.value && (u.value.focus(), v.value = true), f.value = false, s.value = null, w.value = null, p.value = false, h3.value = false, g.value = true, x("update:modelValue"), x("change");
  }
  return ($, L) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-select", { "select-disabled": $.disabled }]), style: normalizeStyle(`width: ${t.value}; height: ${$.height}px;`), onClick: L[2] || (L[2] = (T) => $.disabled ? () => false : function() {
    if (u.value.focus(), b.value = true, e.search || (u.value.style.opacity = 0), p.value = !p.value, !w.value && s.value) {
      const V = e.options.find((P) => P[e.label] === s.value);
      w.value = V ? V[e.value] : null;
    }
    e.search && (f.value || (g.value = !p.value, h3.value = p.value));
  }()) }, [createBaseVNode("div", { class: "m-select-wrap", onMouseenter: M, onMouseleave: B }, [createBaseVNode("span", m1, [withDirectives(createBaseVNode("input", { ref_key: "inputRef", ref: u, class: normalizeClass(["u-select-search", { "caret-show": p.value || v.value }]), autocomplete: "off", readonly: !$.search, disabled: $.disabled, onInput: k, "onUpdate:modelValue": L[0] || (L[0] = (T) => n.value = T), onBlur: L[1] || (L[1] = (T) => m.value || !p.value || $.disabled ? () => false : (b.value = false, p.value && (p.value = false), void (e.search && (h3.value = false, g.value = true, r.value = false)))) }, null, 42, g1), [[vModelText, n.value]])]), r.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["u-select-item", { "select-item-gray": !s.value || p.value }]), style: normalizeStyle(`line-height: ${$.height - 2}px;`), title: s.value }, toDisplayString(s.value || $.placeholder), 15, y1)), (openBlock(), createElementBlock("svg", { class: normalizeClass(["u-arrow", { rotate: p.value, show: g.value }]), viewBox: "64 64 896 896", "data-icon": "down", "aria-hidden": "true", focusable: "false" }, w1, 2)), (openBlock(), createElementBlock("svg", { focusable: "false", class: normalizeClass(["u-search", { show: h3.value }]), "data-icon": "search", "aria-hidden": "true", viewBox: "64 64 896 896" }, k1, 2)), (openBlock(), createElementBlock("svg", { onClick: withModifiers(z, ["stop"]), class: normalizeClass(["u-clear", { show: f.value || n.value }]), focusable: "false", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" }, b1, 2))], 32), createVNode(Transition, { name: "slide-up" }, { default: withCtx(() => [p.value && c.value && c.value.length ? (openBlock(), createElementBlock("div", { key: 0, class: "m-options-panel", style: normalizeStyle(`top: ${$.height + 4}px; line-height: ${$.height - 10}px; max-height: ${$.maxDisplay * $.height + 9}px; width: 100%;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(c.value, (T, V) => (openBlock(), createElementBlock("p", { key: V, class: normalizeClass(["u-option", { "option-hover": !T.disabled && T[$.value] === w.value, "option-selected": T[$.label] === s.value, "option-disabled": T.disabled }]), title: T[$.label], onMouseenter: (P) => {
    return U = T[$.value], void (w.value = U);
    var U;
  }, onClick: withModifiers((P) => T.disabled ? () => false : function(U, G3, E) {
    e.modelValue !== U && (s.value = G3, w.value = U, x("update:modelValue", U), x("change", U, G3, E)), v.value = false, u.value.focus(), b.value = true, p.value = false, e.search && (h3.value = false, g.value = true);
  }(T[$.value], T[$.label], V), ["stop"]) }, toDisplayString(T[$.label]), 43, x1))), 128))], 4)) : p.value && c.value && !c.value.length ? (openBlock(), createElementBlock("div", { key: 1, class: "m-empty-wrap", style: normalizeStyle(`top: ${$.height + 4}px; width: ${$.width}px;`) }, [createVNode(unref(qe2), { image: "2", key: "2" })], 4)) : createCommentVNode("", true)]), _: 1 })], 6));
} });
var Ee = W(M1, [["__scopeId", "data-v-783a3d83"]]);
Ee.install = (l) => {
  l.component(Ee.__name, Ee);
};
var _1 = defineComponent({ __name: "Cascader", props: { options: { default: () => [] }, label: { default: "label" }, value: { default: "value" }, children: { default: "children" }, placeholder: { default: "请选择" }, changeOnSelect: { type: Boolean, default: false }, gap: { default: 8 }, width: { default: "auto" }, height: { default: 32 }, disabled: { type: [Boolean, Array], default: false }, allowClear: { type: Boolean, default: false }, search: { type: Boolean, default: false }, filter: { type: [Function, Boolean], default: true }, maxDisplay: { default: 6 }, modelValue: { default: () => [] } }, emits: ["update:modelValue", "change"], setup(l, { emit: a }) {
  const e = l, t = ref([]), c = ref([]), s = ref([]), u = ref([]), n = ref([]);
  function m(v, h3) {
    const b = v.length;
    for (let M = 0; M < b; M++) if (v[M][e.value] === t.value[h3]) return v[M][e.children] || [];
    return [];
  }
  function r(v, h3) {
    const b = v.length;
    for (let M = 0; M < b; M++) if (v[M][e.value] === t.value[h3]) return v[M][e.label];
    return t.value[h3];
  }
  watchEffect(() => {
    s.value = [...e.options];
  }), watchEffect(() => {
    t.value = [...e.modelValue];
  }), watchEffect(() => {
    var v;
    v = t.value, u.value = m(s.value, 0), n.value = [], v.length > 1 && (n.value = m(u.value, 1)), function(h3) {
      c.value[0] = r(s.value, 0), h3.length > 1 && (c.value[1] = r(u.value, 1)), h3.length > 2 && (c.value[2] = r(n.value, 2));
    }(t.value);
  });
  const w = a;
  function p(v, h3) {
    e.changeOnSelect ? (w("update:modelValue", [v]), w("change", [v], [h3])) : (t.value = [v], c.value = [h3]);
  }
  function g(v, h3) {
    e.changeOnSelect ? (w("update:modelValue", [t.value[0], v]), w("change", [t.value[0], v], [c.value[0], h3])) : (t.value = [t.value[0], v], c.value = [c.value[0], h3]);
  }
  function f(v, h3) {
    w("update:modelValue", [...t.value.slice(0, 2), v]), w("change", [...t.value.slice(0, 2), v], [...c.value.slice(0, 2), h3]);
  }
  return (v, h3) => (openBlock(), createElementBlock("div", { class: "m-cascader", style: normalizeStyle(`height: ${v.height}px; gap: ${v.gap}px;`) }, [createVNode(unref(Ee), { options: s.value, label: v.label, value: v.value, placeholder: Array.isArray(v.placeholder) ? v.placeholder[0] : v.placeholder, disabled: Array.isArray(v.disabled) ? v.disabled[0] : v.disabled, "allow-clear": v.allowClear, search: v.search, filter: v.filter, width: Array.isArray(v.width) ? v.width[0] : v.width, height: v.height, "max-display": v.maxDisplay, modelValue: t.value[0], "onUpdate:modelValue": h3[0] || (h3[0] = (b) => t.value[0] = b), onChange: p }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]), createVNode(unref(Ee), { options: u.value, label: v.label, value: v.value, placeholder: Array.isArray(v.placeholder) ? v.placeholder[1] : v.placeholder, disabled: Array.isArray(v.disabled) ? v.disabled[1] : v.disabled, "allow-clear": v.allowClear, search: v.search, filter: v.filter, width: Array.isArray(v.width) ? v.width[1] : v.width, height: v.height, "max-display": v.maxDisplay, modelValue: t.value[1], "onUpdate:modelValue": h3[1] || (h3[1] = (b) => t.value[1] = b), onChange: g }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]), createVNode(unref(Ee), { options: n.value, label: v.label, value: v.value, placeholder: Array.isArray(v.placeholder) ? v.placeholder[2] : v.placeholder, disabled: Array.isArray(v.disabled) ? v.disabled[2] : v.disabled, "allow-clear": v.allowClear, search: v.search, filter: v.filter, width: Array.isArray(v.width) ? v.width[2] : v.width, height: v.height, "max-display": v.maxDisplay, modelValue: t.value[2], "onUpdate:modelValue": h3[2] || (h3[2] = (b) => t.value[2] = b), onChange: f }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"])], 4));
} });
var va2 = W(_1, [["__scopeId", "data-v-e7f7cf98"]]);
va2.install = (l) => {
  l.component(va2.__name, va2);
};
var z1 = ["onClick"];
var C1 = { class: "u-label" };
var $1 = { key: 1, class: "m-checkbox-wrap" };
var B1 = { class: "u-label" };
var F1 = defineComponent({ __name: "Checkbox", props: { options: { default: () => [] }, disabled: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, value: { default: () => [] }, gap: { default: 8 }, width: { default: "auto" }, height: { default: "auto" }, indeterminate: { type: Boolean, default: false }, checked: { type: Boolean, default: false } }, emits: ["update:value", "update:checked", "change"], setup(l, { emit: a }) {
  const e = l, t = computed(() => e.options.length), c = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), s = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), u = computed(() => e.vertical ? { marginBottom: e.gap + "px" } : { marginRight: e.gap + "px" }), n = ref([]);
  watchEffect(() => {
    n.value = e.value;
  });
  const m = a;
  function r() {
    m("update:checked", !e.checked);
  }
  return (w, p) => (openBlock(), createElementBlock("div", { class: "m-checkbox", style: normalizeStyle(`max-width: ${c.value}; max-height: ${s.value};`) }, [t.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(w.options, (g, f) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-checkbox-wrap", { vertical: w.vertical }]), style: normalizeStyle(t.value !== f + 1 ? u.value : ""), key: f }, [createBaseVNode("div", { class: normalizeClass(["m-box", { disabled: w.disabled || g.disabled }]), onClick: (v) => w.disabled || g.disabled ? () => false : function(h3) {
    if (e.value.includes(h3)) {
      const b = n.value.filter((M) => M !== h3);
      m("update:value", b), m("change", b);
    } else {
      const b = [...n.value, h3];
      m("update:value", b), m("change", b);
    }
  }(g.value) }, [createBaseVNode("span", { class: normalizeClass(["u-checkbox", { "u-checkbox-checked": n.value.includes(g.value) }]) }, null, 2), createBaseVNode("span", C1, [renderSlot(w.$slots, "default", { label: g.label }, () => [createTextVNode(toDisplayString(g.label), 1)], true)])], 10, z1)], 6))), 128)) : (openBlock(), createElementBlock("div", $1, [createBaseVNode("div", { class: normalizeClass(["m-box", { disabled: w.disabled }]), onClick: r }, [createBaseVNode("span", { class: normalizeClass(["u-checkbox", { "u-checkbox-checked": w.checked && !w.indeterminate, indeterminate: w.indeterminate }]) }, null, 2), createBaseVNode("span", B1, [renderSlot(w.$slots, "default", {}, () => [createTextVNode("Check all")], true)])], 2)]))], 4));
} });
var pa = W(F1, [["__scopeId", "data-v-282d46eb"]]);
pa.install = (l) => {
  l.component(pa.__name, pa);
};
var S1 = ["onClick", "onKeydown"];
var L1 = { key: 0, class: "m-arrow" };
var A1 = [((l) => (pushScopeId("data-v-df9a2993"), l = l(), popScopeId(), l))(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1))];
var D1 = { class: "u-lang" };
var T1 = defineComponent({ __name: "Collapse", props: { collapseData: { default: () => [] }, activeKey: { default: null }, bordered: { type: Boolean, default: true }, copyable: { type: Boolean, default: false }, lang: { default: "" }, fontSize: { default: 14 }, headerFontSize: { default: 0 }, textFontSize: { default: 0 }, showArrow: { type: Boolean, default: true }, arrowPlacement: { default: "left" }, ghost: { type: Boolean, default: false } }, emits: ["update:activeKey", "change"], setup(l, { emit: a }) {
  const e = l, t = ref(), c = ref(0);
  function s(v) {
    v.style.height = t.value[c.value].offsetHeight + (e.bordered && !e.ghost ? 1 : 0) + "px", v.style.opacity = "1";
  }
  function u(v) {
    v.style.removeProperty("height"), v.style.removeProperty("opacity");
  }
  function n(v) {
    v.style.height = t.value[c.value].offsetHeight + (e.bordered && !e.ghost ? 1 : 0) + "px", v.style.opacity = "1";
  }
  function m(v) {
    v.style.removeProperty("height"), v.style.removeProperty("opacity");
  }
  const r = a;
  function w(v) {
    r("update:activeKey", v), r("change", v);
  }
  function p(v, h3) {
    c.value = h3, g(v) ? Array.isArray(e.activeKey) ? w(e.activeKey.filter((b) => b !== v)) : w(null) : Array.isArray(e.activeKey) ? w([...e.activeKey, v]) : w(v);
  }
  function g(v) {
    return Array.isArray(e.activeKey) ? e.activeKey.includes(v) : e.activeKey === v;
  }
  const f = ref("Copy");
  return (v, h3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-collapse", { "collapse-borderless": !v.bordered, "collapse-arrow-right": v.arrowPlacement === "right", "collapse-ghost": v.ghost }]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(v.collapseData, (b, M) => (openBlock(), createElementBlock("div", { class: "m-collapse-item", key: M }, [createBaseVNode("div", { class: normalizeClass(["m-collapse-header", { "collapse-header-no-arrow": b.showArrow !== void 0 ? !b.showArrow : !v.showArrow }]), tabindex: "0", onClick: (B) => p(b.key || M, M), onKeydown: (B) => function(k, x, z) {
    k.key === "Enter" && p(x, z);
  }(B, b.key || M, M) }, [(b.showArrow !== void 0 ? b.showArrow : v.showArrow) ? (openBlock(), createElementBlock("div", L1, [(openBlock(), createElementBlock("svg", { focusable: "false", class: normalizeClass(["u-arrow", { "arrow-rotate": g(b.key || M) }]), "data-icon": "right", "aria-hidden": "true", viewBox: "64 64 896 896" }, A1, 2))])) : createCommentVNode("", true), createBaseVNode("div", { class: "u-header", style: normalizeStyle(`font-size: ${v.headerFontSize || v.fontSize}px;`) }, [renderSlot(v.$slots, "header", { header: b.header, key: b.key || M }, () => [createTextVNode(toDisplayString(b.header || "--"), 1)], true)], 4)], 42, S1), createVNode(Transition, { name: "collapse", onEnter: s, onAfterEnter: u, onLeave: n, onAfterLeave: m }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-collapse-content", { "u-collapse-copyable": v.copyable }]) }, [createBaseVNode("div", D1, [renderSlot(v.$slots, "lang", { lang: v.lang, key: b.key || M }, () => [createTextVNode(toDisplayString(v.lang), 1)], true)]), createVNode(unref($e), { size: "small", class: "u-copy", type: "primary", onClick: (B) => function(k) {
    navigator.clipboard.writeText(t.value[k].innerText || "").then(() => {
      f.value = "Copied", be(() => {
        f.value = "Copy";
      }, 3e3);
    }, (x) => {
      f.value = x;
    });
  }(M) }, { default: withCtx(() => [createTextVNode(toDisplayString(f.value), 1)]), _: 2 }, 1032, ["onClick"]), createBaseVNode("div", { ref_for: true, ref_key: "text", ref: t, class: "u-text", style: normalizeStyle(`font-size: ${v.textFontSize || v.fontSize}px;`) }, [renderSlot(v.$slots, "text", { text: b.text, key: b.key || M }, () => [createTextVNode(toDisplayString(b.text), 1)], true)], 4)], 2), [[vShow, g(b.key || M)]])]), _: 2 }, 1024)]))), 128))], 2));
} });
var fa2 = W(T1, [["__scopeId", "data-v-df9a2993"]]);
fa2.install = (l) => {
  l.component(fa2.__name, fa2);
};
var E1 = { class: "m-countdown" };
var H1 = { class: "m-time" };
var I1 = { key: 0, class: "u-prefix" };
var j1 = { key: 0, class: "u-suffix" };
var ha = W(defineComponent({ __name: "Countdown", props: { title: { default: "" }, value: { default: void 0 }, future: { type: Boolean, default: true }, format: { default: "HH:mm:ss" }, prefix: { default: "" }, suffix: { default: "" }, titleStyle: { default: () => ({}) }, valueStyle: { default: () => ({}) }, finishedText: { default: "Finished" } }, emits: ["finish"], setup(l, { emit: a }) {
  const e = l, t = useSlots(), c = computed(() => {
    var v;
    const f = (v = t.prefix) == null ? void 0 : v.call(t);
    return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e.prefix;
  }), s = computed(() => {
    var v;
    const f = (v = t.suffix) == null ? void 0 : v.call(t);
    return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e.suffix;
  }), u = ref(0), n = ref(), m = computed(() => ({ showMillisecond: e.format.includes("SSS"), showYear: e.format.includes("Y"), showMonth: e.format.includes("M"), showDay: e.format.includes("D"), showHour: e.format.includes("H"), showMinute: e.format.includes("m"), showSecond: e.format.includes("s") }));
  function r(f) {
    return f < 10 ? "0" + f : String(f);
  }
  function w(f) {
    if (f === null) return "--";
    let v = e.format;
    if (m.value.showMillisecond) {
      var h3 = f % 1e3;
      v = v.replace("SSS", "0".repeat(3 - String(h3).length) + h3);
    }
    if (f = Math.floor(f / 1e3), m.value.showYear) {
      var b = Math.floor(f / 31104e3);
      v = v.includes("YY") ? v.replace("YY", r(b)) : v.replace("Y", String(b));
    } else b = 0;
    if (m.value.showMonth) {
      f -= 60 * b * 60 * 24 * 30 * 12;
      var M = Math.floor(f / 2592e3);
      v = v.includes("MM") ? v.replace("MM", r(M)) : v.replace("M", String(M));
    } else M = 0;
    if (m.value.showDay) {
      f -= 60 * M * 60 * 24 * 30;
      var B = Math.floor(f / 86400);
      v = v.includes("DD") ? v.replace("DD", r(B)) : v.replace("D", String(B));
    } else B = 0;
    if (m.value.showHour) {
      f -= 60 * B * 60 * 24;
      var k = Math.floor(f / 3600);
      v = v.includes("HH") ? v.replace("HH", r(k)) : v.replace("H", String(k));
    } else k = 0;
    if (m.value.showMinute) {
      f -= 60 * k * 60;
      var x = Math.floor(f / 60);
      v = v.includes("mm") ? v.replace("mm", r(x)) : v.replace("m", String(x));
    } else x = 0;
    if (m.value.showSecond) {
      var z = f - 60 * x;
      v = v.includes("ss") ? v.replace("ss", r(z)) : v.replace("s", String(z));
    }
    return v;
  }
  const p = a;
  function g() {
    u.value > Date.now() ? (n.value = u.value - Date.now(), requestAnimationFrame(g)) : (n.value = 0, p("finish"));
  }
  return watchEffect(() => {
    Number.isFinite(e.value) ? (e.future ? e.value >= Date.now() && (u.value = e.value) : e.value >= 0 && (u.value = e.value + Date.now()), requestAnimationFrame(g)) : n.value = null;
  }), (f, v) => (openBlock(), createElementBlock("div", E1, [createBaseVNode("div", { class: "u-title", style: normalizeStyle(f.titleStyle) }, [renderSlot(f.$slots, "title", {}, () => [createTextVNode(toDisplayString(e.title), 1)], true)], 4), createBaseVNode("div", H1, [c.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [c.value || n.value > 0 || n.value === null ? (openBlock(), createElementBlock("span", I1, [renderSlot(f.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(f.prefix), 1)], true)])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), f.finishedText && n.value === 0 && n.value !== null ? (openBlock(), createElementBlock("span", { key: 1, class: "u-time-value", style: normalizeStyle(f.valueStyle) }, [renderSlot(f.$slots, "finish", {}, () => [createTextVNode(toDisplayString(f.finishedText), 1)], true)], 4)) : createCommentVNode("", true), Number.isFinite(n.value) && n.value > 0 ? (openBlock(), createElementBlock("span", { key: 2, class: "u-time-value", style: normalizeStyle(f.valueStyle) }, toDisplayString(w(n.value)), 5)) : createCommentVNode("", true), s.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [s.value || n.value > 0 || n.value === null ? (openBlock(), createElementBlock("span", j1, [renderSlot(f.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(f.suffix), 1)], true)])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)])]));
} }), [["__scopeId", "data-v-304ba240"]]);
ha.install = (l) => {
  l.component(ha.__name, ha);
};
var ma2 = W(defineComponent({ inheritAttrs: false, __name: "DatePicker", props: { width: { default: 180 }, mode: { default: "date" }, showTime: { type: Boolean, default: false }, showToday: { type: Boolean, default: false }, modelType: { default: "format" } }, setup(l) {
  const a = l, e = computed(() => a.mode === "time"), t = computed(() => a.mode === "week"), c = computed(() => a.mode === "month"), s = computed(() => a.mode === "year");
  return (u, n) => (openBlock(), createElementBlock("div", { class: "m-datepicker", style: normalizeStyle(`width: ${u.width}px;`) }, [createVNode(unref(Un), mergeProps({ locale: "zh-CN", "month-change-on-scroll": false, "enable-time-picker": u.showTime, "time-picker": e.value, "week-picker": t.value, "month-picker": c.value, "year-picker": s.value, "now-button-label": "今天", "show-now-button": u.showToday, "auto-apply": "", "text-input": "", "model-type": u.modelType, "day-names": ["一", "二", "三", "四", "五", "六", "七"] }, u.$attrs), null, 16, ["enable-time-picker", "time-picker", "week-picker", "month-picker", "year-picker", "show-now-button", "model-type"])], 4));
} }), [["__scopeId", "data-v-c490582a"]]);
ma2.install = (l) => {
  l.component(ma2.__name, ma2);
};
var V1 = { key: 0, class: "m-desc-header" };
var R1 = { class: "u-title" };
var W1 = { class: "u-extra" };
var q1 = { key: 0 };
var N1 = ["colspan"];
var P1 = { key: 1 };
var O1 = { key: 0 };
var K1 = ["colspan"];
var Y1 = ["colspan"];
var U1 = { key: 1 };
var G1 = defineComponent({ __name: "Descriptions", props: { title: { default: void 0 }, extra: { default: void 0 }, bordered: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, size: { default: "default" }, column: { default: () => ({ xs: 1, sm: 2, md: 3 }) }, labelStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) } }, setup(l) {
  const a = l, e = ref(), t = ref(true), c = ref(), s = ref(true), u = ref(), n = ref(), m = ref(), r = ref(), w = ref(), p = ref(), g = ref(), f = ref([]), v = ref(window.innerWidth), h3 = je2(function() {
    v.value = window.innerWidth;
  }, 100);
  Re(window, "resize", h3);
  const b = useSlots(), M = computed(() => {
    var P, U, G3, E;
    const L = (P = b.title) == null ? void 0 : P.call(b), T = (U = b.extra) == null ? void 0 : U.call(b);
    let V = 0;
    return L && ((G3 = L[0].children) != null && G3.length) && V++, T && ((E = T[0].children) != null && E.length) && V++, !!V || a.title || a.extra;
  }), B = computed(() => typeof a.column == "object" ? v.value >= 1600 && a.column.xxl ? a.column.xxl : v.value >= 1200 && a.column.xl ? a.column.xl : v.value >= 992 && a.column.lg ? a.column.lg : v.value >= 768 && a.column.md ? a.column.md : v.value >= 576 && a.column.sm ? a.column.sm : v.value < 576 && a.column.xs ? a.column.xs : 1 : a.column);
  async function k() {
    t.value = !t.value, await nextTick(), z();
  }
  function x(L) {
    return L.reduce((T, V) => T + V.span, 0);
  }
  async function z() {
    if (u.value = Array.from(e.value.children).filter((L) => L.className === (a.bordered ? "m-desc-item-bordered" : "m-desc-item")), f.value.length && (f.value.splice(0), await nextTick()), u.value && u.value.length) {
      const L = u.value.length;
      let T = [];
      for (let V = 0; V < L; V++) {
        const P = { span: Math.min(u.value[V].dataset.span ?? 1, B.value), element: u.value[V] };
        x(T) < B.value ? (P.span = Math.min(P.span, B.value - x(T)), T.push(P)) : (f.value.push(T), T = [P]);
      }
      if (!a.vertical && !u.value[L - 1].dataset.span && x(T) < B.value) {
        const V = T.length;
        T[V - 1].span = T[V - 1].span + B.value - x(T);
      }
      f.value.push(T), await nextTick(), async function() {
        a.bordered ? f.value.forEach((V, P) => {
          V.forEach((U) => {
            const G3 = Array.from(U.element.children), E = G3[0];
            $(E, a.labelStyle);
            const H = G3[1];
            $(H, a.contentStyle), a.vertical ? (E.colSpan = U.span, H.colSpan = U.span, p.value[P].appendChild(E), g.value[P].appendChild(H)) : (E.colSpan = 1, H.colSpan = 2 * U.span - 1, w.value[P].appendChild(E), w.value[P].appendChild(H));
          });
        }) : u.value.forEach((V, P) => {
          const U = Array.from(V.children);
          $(U[0], a.labelStyle), $(U[1], a.contentStyle), a.vertical ? (m.value[P].appendChild(V.firstChild), r.value[P].appendChild(V.lastChild)) : n.value[P].appendChild(V);
        }), await nextTick(), s.value = false;
      }();
    } else s.value = false;
  }
  function $(L, T) {
    JSON.stringify(T) !== "{}" && Object.keys(T).forEach((V) => {
      L.style[V] || (L.style[V] = T[V]);
    });
  }
  return watch(() => [a.bordered, a.vertical, B.value, a.labelStyle, a.contentStyle], () => {
    s.value || (s.value = true), k();
  }, { deep: true }), c.value = pl2(e, (L) => {
    s.value || (s.value = true, L.some((T) => T.type === "childList") && k());
  }, { childList: true, attributes: true, subtree: true }), onMounted(() => {
    z();
  }), (L, T) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-desc", `desc-${L.size}`]) }, [M.value ? (openBlock(), createElementBlock("div", V1, [createBaseVNode("div", R1, [renderSlot(L.$slots, "title", {}, () => [createTextVNode(toDisplayString(L.title), 1)], true)]), createBaseVNode("div", W1, [renderSlot(L.$slots, "extra", {}, () => [createTextVNode(toDisplayString(L.extra), 1)], true)])])) : createCommentVNode("", true), L.vertical ? (openBlock(), createElementBlock("div", { key: 2, class: normalizeClass(["m-desc-view", { "m-bordered": L.bordered }]) }, [createBaseVNode("table", null, [L.bordered ? (openBlock(), createElementBlock("tbody", U1, [(openBlock(true), createElementBlock(Fragment, null, renderList(f.value.length, (V) => (openBlock(), createElementBlock(Fragment, { key: V }, [createBaseVNode("tr", { ref_for: true, ref_key: "thVerticalBorderedRows", ref: p, class: "tr-bordered" }, null, 512), createBaseVNode("tr", { ref_for: true, ref_key: "tdVerticalBorderedRows", ref: g, class: "tr-bordered" }, null, 512)], 64))), 128))])) : (openBlock(), createElementBlock("tbody", O1, [(openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (V, P) => (openBlock(), createElementBlock(Fragment, { key: P }, [createBaseVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(V, (U, G3) => (openBlock(), createElementBlock("th", { class: "u-item-th", colspan: U.span, key: G3 }, [createBaseVNode("div", { ref_for: true, ref_key: "thVerticalCols", ref: m, class: "m-desc-item" }, null, 512)], 8, K1))), 128))]), createBaseVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(V, (U, G3) => (openBlock(), createElementBlock("td", { class: "u-item-td", colspan: U.span, key: G3 }, [createBaseVNode("div", { ref_for: true, ref_key: "tdVerticalCols", ref: r, class: "m-desc-item" }, null, 512)], 8, Y1))), 128))])], 64))), 128))]))])], 2)) : (openBlock(), createElementBlock("div", { key: 1, class: normalizeClass(["m-desc-view", { "m-bordered": L.bordered }]) }, [createBaseVNode("table", null, [L.bordered ? (openBlock(), createElementBlock("tbody", P1, [(openBlock(true), createElementBlock(Fragment, null, renderList(f.value.length, (V) => (openBlock(), createElementBlock("tr", { ref_for: true, ref_key: "trBorderedRows", ref: w, class: "tr-bordered", key: V }))), 128))])) : (openBlock(), createElementBlock("tbody", q1, [(openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (V, P) => (openBlock(), createElementBlock("tr", { key: P }, [(openBlock(true), createElementBlock(Fragment, null, renderList(V, (U, G3) => (openBlock(), createElementBlock("td", { ref_for: true, ref_key: "tdCols", ref: n, class: "u-item-td", colspan: U.span, key: G3 }, null, 8, N1))), 128))]))), 128))]))])], 2)), withDirectives(createBaseVNode("div", { ref_key: "defaultSlotsRef", ref: e }, [t.value ? renderSlot(L.$slots, "default", { key: 0 }, void 0, true) : renderSlot(L.$slots, "default", { key: 1 }, void 0, true)], 512), [[vShow, false]])], 2));
} });
var ga = W(G1, [["__scopeId", "data-v-c1120c31"]]);
var Z1 = ["data-span"];
var Q1 = ["data-span"];
var ya = W(defineComponent({ __name: "DescriptionsItem", props: { label: { default: void 0 }, span: { default: void 0 }, labelStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) } }, setup: (l) => (a, e) => (openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", { class: "m-desc-item", "data-span": a.span }, [createBaseVNode("span", { class: "u-label", style: normalizeStyle(a.labelStyle) }, [renderSlot(a.$slots, "label", {}, () => [createTextVNode(toDisplayString(a.label), 1)], true)], 4), createBaseVNode("span", { class: "u-content", style: normalizeStyle(a.contentStyle) }, [renderSlot(a.$slots, "default", {}, void 0, true)], 4)], 8, Z1), createBaseVNode("div", { class: "m-desc-item-bordered", "data-span": a.span }, [createBaseVNode("th", { class: "u-label-th", style: normalizeStyle(a.labelStyle) }, [renderSlot(a.$slots, "label", {}, () => [createTextVNode(toDisplayString(a.label), 1)], true)], 4), createBaseVNode("td", { class: "u-content-td", style: normalizeStyle(a.contentStyle) }, [renderSlot(a.$slots, "default", {}, void 0, true)], 4)], 8, Q1)], 64)) }), [["__scopeId", "data-v-43d96902"]]);
ga.install = (l) => {
  l.component(ga.__name, ga);
}, ya.install = (l) => {
  l.component(ya.__name, ya);
};
var hl2 = (l) => (pushScopeId("data-v-1bca82e2"), l = l(), popScopeId(), l);
var X1 = { class: "m-dialog-root" };
var J1 = { class: "m-dialog-mask" };
var eo2 = { class: "m-dialog-header" };
var ao2 = { class: "u-head" };
var lo2 = { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "fullscreen", "aria-hidden": "true", focusable: "false" };
var to2 = [hl2(() => createBaseVNode("path", { d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z" }, null, -1))];
var oo2 = { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "fullscreen-exit", "aria-hidden": "true", focusable: "false" };
var so2 = [hl2(() => createBaseVNode("path", { d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z" }, null, -1))];
var no2 = [hl2(() => createBaseVNode("svg", { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "close", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var io2 = { class: "m-dialog-footer" };
var wa = W(defineComponent({ __name: "Dialog", props: { title: { default: "提示" }, content: { default: "" }, width: { default: 540 }, height: { default: "auto" }, cancelText: { default: "取消" }, okText: { default: "确定" }, okType: { default: "primary" }, footer: { type: Boolean, default: true }, center: { type: Boolean, default: true }, top: { default: 100 }, switchFullscreen: { type: Boolean, default: false }, loading: { type: Boolean, default: false }, bodyStyle: { default: () => ({}) }, show: { type: Boolean, default: false } }, emits: ["update:show", "cancel", "ok"], setup(l, { emit: a }) {
  const e = l, t = ref(false), c = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), s = ref(), u = useSlots(), n = computed(() => {
    var h3;
    return (h3 = u.footer) == null ? void 0 : h3.call(u);
  });
  watch(() => e.show, (v) => {
    v && (nextTick(() => {
      s.value.focus();
    }), t.value = false);
  });
  const m = a;
  function r() {
    m("update:show", false), m("cancel");
  }
  function w() {
    t.value = !t.value;
  }
  function p() {
    m("update:show", false), m("cancel");
  }
  function g() {
    m("update:show", false), m("cancel");
  }
  function f() {
    m("ok");
  }
  return (v, h3) => (openBlock(), createElementBlock("div", X1, [createVNode(Transition, { name: "fade" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", J1, null, 512), [[vShow, v.show]])]), _: 1 }), createVNode(Transition, { name: "zoom" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-dialog-wrap", onClick: withModifiers(r, ["self"]) }, [createBaseVNode("div", { ref_key: "dialogRef", ref: s, tabindex: "-1", class: normalizeClass(["m-dialog", v.center ? "relative-hv-center" : "top-center"]), style: normalizeStyle(`width: ${t.value ? "100%" : e.width + "px"}; top: ${v.center ? "50%" : t.value ? 0 : v.top + "px"};`), onKeydown: withKeys(p, ["esc"]) }, [createBaseVNode("div", { class: "m-dialog-content", style: normalizeStyle(`--height: ${t.value ? "100vh" : c.value}`) }, [createBaseVNode("div", eo2, [createBaseVNode("p", ao2, [renderSlot(v.$slots, "title", {}, () => [createTextVNode(toDisplayString(v.title), 1)], true)])]), v.switchFullscreen ? (openBlock(), createElementBlock("span", { key: 0, class: "m-screen", onClick: w }, [withDirectives((openBlock(), createElementBlock("svg", lo2, to2, 512)), [[vShow, !t.value]]), withDirectives((openBlock(), createElementBlock("svg", oo2, so2, 512)), [[vShow, t.value]])])) : createCommentVNode("", true), createBaseVNode("span", { class: "m-close", onClick: p }, no2), createBaseVNode("div", { class: "m-dialog-body", style: normalizeStyle(v.bodyStyle) }, [renderSlot(v.$slots, "default", {}, () => [createTextVNode(toDisplayString(v.content), 1)], true)], 4), withDirectives(createBaseVNode("div", io2, [renderSlot(v.$slots, "footer", {}, void 0, true), n.value ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(unref($e), { class: "mr8", onClick: g }, { default: withCtx(() => [createTextVNode(toDisplayString(v.cancelText), 1)]), _: 1 }), createVNode(unref($e), { type: v.okType, loading: v.loading, onClick: f }, { default: withCtx(() => [createTextVNode(toDisplayString(v.okText), 1)]), _: 1 }, 8, ["type", "loading"])], 64))], 512), [[vShow, v.footer]])], 4)], 38)], 512), [[vShow, v.show]])]), _: 3 })]));
} }), [["__scopeId", "data-v-1bca82e2"]]);
wa.install = (l) => {
  l.component(wa.__name, wa);
};
var uo2 = { class: "u-divider-text" };
var ka = W(defineComponent({ __name: "Divider", props: { orientation: { default: "center" }, orientationMargin: { default: void 0 }, borderWidth: { default: 1 }, borderStyle: { default: "solid" }, borderColor: { default: "rgba(5, 5, 5, 0.06)" }, vertical: { type: Boolean, default: false }, height: { default: "0.9em" } }, setup(l) {
  const a = l, e = computed(() => typeof a.orientationMargin == "number" ? a.orientationMargin + "px" : a.orientationMargin), t = computed(() => typeof a.height == "number" ? a.height + "px" : a.height), c = useSlots(), s = computed(() => {
    var n, m;
    const u = (n = c.default) == null ? void 0 : n.call(c);
    return !!u && !!(u[0].children !== "v-if" && ((m = u[0].children) != null && m.length));
  });
  return (u, n) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-divider divider-style", [u.vertical ? "m-divider-vertical" : "m-divider-horizontal", { "divider-with-text": s.value, "divider-with-text-center": s.value && u.orientation === "center", "divider-with-text-left": s.value && u.orientation === "left", "divider-with-text-right": s.value && u.orientation === "right", "divider-orientation-margin-left": s.value && u.orientation === "left" && u.orientationMargin !== void 0, "divider-orientation-margin-right": s.value && u.orientation === "right" && u.orientationMargin !== void 0 }]]), style: normalizeStyle(`--border-width: ${u.borderWidth}px; --border-style: ${u.borderStyle}; --border-color: ${u.borderColor}; --margin: ${e.value}; --line-height: ${t.value};`) }, [withDirectives(createBaseVNode("span", uo2, [renderSlot(u.$slots, "default", {}, void 0, true)], 512), [[vShow, s.value]])], 6));
} }), [["__scopeId", "data-v-8933d4b9"]]);
ka.install = (l) => {
  l.component(ka.__name, ka);
};
var $l2 = (l) => (pushScopeId("data-v-5a6f31e2"), l = l(), popScopeId(), l);
var co2 = { class: "m-drawer", tabindex: "-1" };
var ro2 = { class: "m-drawer-content" };
var vo2 = { key: 0, class: "m-drawer-body-wrapper" };
var po2 = { class: "m-header-title" };
var fo2 = [$l2(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var ho = { class: "u-title" };
var mo2 = { class: "m-drawer-extra" };
var go2 = { key: 1, class: "m-drawer-body-wrapper" };
var yo2 = { class: "m-header-title" };
var wo = [$l2(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var ko = { class: "u-title" };
var bo = { class: "m-drawer-extra" };
var ba = W(defineComponent({ __name: "Drawer", props: { width: { default: 378 }, height: { default: 378 }, title: { default: void 0 }, closable: { type: Boolean, default: true }, placement: { default: "right" }, headerStyle: { default: () => ({}) }, bodyStyle: { default: () => ({}) }, extra: { default: void 0 }, footer: { default: void 0 }, footerStyle: { default: () => ({}) }, destroyOnClose: { type: Boolean, default: false }, zIndex: { default: 1e3 }, open: { type: Boolean, default: false } }, emits: ["update:open", "close"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), c = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), s = useSlots(), u = computed(() => {
    var v, h3;
    const p = (v = s.title) == null ? void 0 : v.call(s), g = (h3 = s.extra) == null ? void 0 : h3.call(s);
    let f = 0;
    return p && p.length && f++, g && g.length && f++, !!f || e.title || e.extra || e.closable;
  }), n = computed(() => {
    var g;
    const p = (g = s.footer) == null ? void 0 : g.call(s);
    return p && p.length || e.footer;
  }), m = a;
  function r(p) {
    m("update:open", false), m("close", p);
  }
  function w(p) {
    m("update:open", false), m("close", p);
  }
  return (p, g) => (openBlock(), createElementBlock("div", co2, [createVNode(Transition, { name: "fade" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-drawer-mask", onClick: withModifiers(r, ["self"]) }, null, 512), [[vShow, p.open]])]), _: 1 }), createVNode(Transition, { name: `motion-${p.placement}` }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-drawer-wrapper", `drawer-${p.placement}`]), style: normalizeStyle(`z-index: ${p.zIndex}; ${["top", "bottom"].includes(p.placement) ? "height:" + c.value : "width:" + t.value};`) }, [createBaseVNode("div", ro2, [p.destroyOnClose ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", vo2, [withDirectives(createBaseVNode("div", { class: "m-drawer-header", style: normalizeStyle(p.headerStyle) }, [createBaseVNode("div", po2, [p.closable ? (openBlock(), createElementBlock("svg", { key: 0, focusable: "false", onClick: w, class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, fo2)) : createCommentVNode("", true), createBaseVNode("p", ho, [renderSlot(p.$slots, "title", {}, () => [createTextVNode(toDisplayString(p.title), 1)], true)])]), createBaseVNode("div", mo2, [renderSlot(p.$slots, "extra", {}, () => [createTextVNode(toDisplayString(p.extra), 1)], true)])], 4), [[vShow, u.value]]), createBaseVNode("div", { class: "m-drawer-body", style: normalizeStyle(p.bodyStyle) }, [renderSlot(p.$slots, "default", {}, void 0, true)], 4), withDirectives(createBaseVNode("div", { class: "m-drawer-footer", style: normalizeStyle(p.footerStyle) }, [renderSlot(p.$slots, "footer", {}, () => [createTextVNode(toDisplayString(p.footer), 1)], true)], 4), [[vShow, n.value]])])), p.destroyOnClose && p.open ? (openBlock(), createElementBlock("div", go2, [withDirectives(createBaseVNode("div", { class: "m-drawer-header", style: normalizeStyle(p.headerStyle) }, [createBaseVNode("div", yo2, [(openBlock(), createElementBlock("svg", { focusable: "false", onClick: w, class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, wo)), createBaseVNode("p", ko, [renderSlot(p.$slots, "title", {}, () => [createTextVNode(toDisplayString(p.title), 1)], true)])]), createBaseVNode("div", bo, [renderSlot(p.$slots, "extra", {}, () => [createTextVNode(toDisplayString(p.extra), 1)], true)])], 4), [[vShow, u.value]]), createBaseVNode("div", { class: "m-drawer-body", style: normalizeStyle(p.bodyStyle) }, [renderSlot(p.$slots, "default", {}, void 0, true)], 4), withDirectives(createBaseVNode("div", { class: "m-drawer-footer", style: normalizeStyle(p.footerStyle) }, [renderSlot(p.$slots, "footer", {}, () => [createTextVNode(toDisplayString(p.footer), 1)], true)], 4), [[vShow, n.value]])])) : createCommentVNode("", true)])], 6), [[vShow, p.open]])]), _: 3 }, 8, ["name"])]));
} }), [["__scopeId", "data-v-5a6f31e2"]]);
ba.install = (l) => {
  l.component(ba.__name, ba);
};
var xo = ((l) => (pushScopeId("data-v-79ba06d6"), l = l(), popScopeId(), l))(() => createBaseVNode("div", { class: "m-tooltip-arrow" }, [createBaseVNode("span", { class: "u-tooltip-arrow" })], -1));
var Ze = W(defineComponent({ __name: "Tooltip", props: { maxWidth: { default: 120 }, content: { default: "暂无内容" }, tooltip: { default: "暂无提示" }, fontSize: { default: 14 }, color: { default: "#FFF" }, backgroundColor: { default: "rgba(0, 0, 0, 0.85)" }, overlayStyle: { default: () => ({}) } }, emits: ["openChange"], setup(l, { emit: a }) {
  const e = ref(false), t = ref(), c = ref(0), s = ref(0), u = ref(), n = ref(), m = a;
  function r() {
    (function() {
      const p = u.value.offsetWidth, g = n.value.offsetWidth, f = n.value.offsetHeight;
      c.value = f + 4, s.value = (g - p) / 2;
    })(), t.value && ce(t.value), e.value = true, m("openChange", e.value);
  }
  function w() {
    t.value = be(() => {
      e.value = false, m("openChange", e.value);
    }, 100);
  }
  return (p, g) => (openBlock(), createElementBlock("div", { class: "m-tooltip", onMouseenter: r, onMouseleave: w }, [createBaseVNode("div", { ref_key: "tooltipRef", ref: n, class: normalizeClass(["m-tooltip-content", { "show-tip": e.value }]), style: normalizeStyle(`--tooltip-font-size: ${p.fontSize}px; --tooltip-color: ${p.color}; --tooltip-background-color: ${p.backgroundColor}; max-width: ${p.maxWidth}px; transform-origin: 50% ${c.value}px; top: ${-c.value}px; left: ${-s.value}px;`), onMouseenter: r, onMouseleave: w }, [createBaseVNode("div", { class: "u-tooltip", style: normalizeStyle(p.overlayStyle) }, [renderSlot(p.$slots, "tooltip", {}, () => [createTextVNode(toDisplayString(p.tooltip), 1)], true)], 4), xo], 38), createBaseVNode("span", { ref_key: "contentRef", ref: u }, [renderSlot(p.$slots, "default", {}, () => [createTextVNode(toDisplayString(p.content), 1)], true)], 512)], 32));
} }), [["__scopeId", "data-v-79ba06d6"]]);
Ze.install = (l) => {
  l.component(Ze.__name, Ze);
};
var xa = W(defineComponent({ __name: "Ellipsis", props: { maxWidth: { default: "100%" }, line: { default: void 0 }, expand: { type: Boolean, default: false }, tooltip: { type: Boolean, default: true }, tooltipProps: { default: () => ({}) } }, emits: ["expandChange"], setup(l, { emit: a }) {
  const e = l, t = ref(false), c = ref(false), s = ref(), u = ref(), n = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth);
  function m() {
    const p = s.value.scrollWidth, g = s.value.scrollHeight, f = s.value.clientWidth, v = s.value.clientHeight;
    return p > f || g > v ? (u.value = s.value.offsetWidth + 24, e.expand && (c.value = true), true) : (e.expand && (c.value = false), false);
  }
  watch(() => [e.maxWidth, e.line, e.tooltip], () => {
    e.tooltip && (t.value = m());
  }, { deep: true, flush: "post" }), Ke2(s, () => {
    e.tooltip && (t.value = m());
  }), onMounted(() => {
    e.tooltip && (t.value = m());
  });
  const r = a;
  function w() {
    s.value.style["-webkit-line-clamp"] ? (e.tooltip ? (t.value = false, nextTick(() => {
      s.value.style["-webkit-line-clamp"] = "";
    })) : s.value.style["-webkit-line-clamp"] = "", r("expandChange", true)) : (e.tooltip && (t.value = true), s.value.style["-webkit-line-clamp"] = e.line, r("expandChange", false));
  }
  return (p, g) => t.value ? (openBlock(), createBlock(unref(Ze), mergeProps({ key: 0, "max-width": u.value, overlayStyle: { padding: "8px 12px", textAlign: "justify" } }, p.tooltipProps), { tooltip: withCtx(() => [renderSlot(p.$slots, "tooltip", {}, () => [renderSlot(p.$slots, "default", {}, void 0, true)], true)]), default: withCtx(() => [createBaseVNode("div", mergeProps({ ref_key: "ellipsisRef", ref: s, class: ["m-ellipsis", [p.line ? "ellipsis-line" : "not-ellipsis-line", { "cursor-pointer": c.value }]], style: `-webkit-line-clamp: ${p.line}; max-width: ${n.value};`, onClick: g[0] || (g[0] = (f) => c.value ? w() : () => false) }, p.$attrs), [renderSlot(p.$slots, "default", {}, void 0, true)], 16)]), _: 3 }, 16, ["max-width"])) : (openBlock(), createElementBlock("div", mergeProps({ key: 1, ref_key: "ellipsisRef", ref: s, class: ["m-ellipsis", [p.line ? "ellipsis-line" : "not-ellipsis-line", { "cursor-pointer": c.value }]], style: `-webkit-line-clamp: ${p.line}; max-width: ${n.value};`, onClick: g[1] || (g[1] = (f) => c.value ? w() : () => false) }, p.$attrs), [renderSlot(p.$slots, "default", {}, void 0, true)], 16));
} }), [["__scopeId", "data-v-db7badd2"]]);
xa.install = (l) => {
  l.component(xa.__name, xa);
};
var Ma = W(defineComponent({ __name: "Flex", props: { width: { default: "auto" }, vertical: { type: Boolean, default: false }, wrap: { default: "nowrap" }, justify: { default: "normal" }, align: { default: "normal" }, gap: { default: "small" } }, setup(l) {
  const a = l, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), t = computed(() => {
    if (a.gap === void 0) return 0;
    if (typeof a.gap == "number") return a.gap + "px";
    if (Array.isArray(a.gap)) return a.gap[1] + "px " + a.gap[0] + "px ";
    if (["small", "middle", "large"].includes(a.gap))
      return { small: "8px", middle: "16px", large: "24px" }[a.gap];
  });
  return (c, s) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-flex", { "flex-vertical": c.vertical }]), style: normalizeStyle(`
      width: ${e.value};
      gap: ${t.value};
      margin-bottom: -${Array.isArray(a.gap) && c.wrap ? a.gap[1] : 0}px;
      --wrap: ${c.wrap};
      --justify: ${c.justify};
      --align: ${c.align};
    `) }, [renderSlot(c.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-779347b3"]]);
Ma.install = (l) => {
  l.component(Ma.__name, Ma);
};
var Bl2 = ((l) => (l.primary = "rgba(22, 199, 255, 0.6)", l.info = "rgba(22, 199, 255, 0.6)", l.success = "rgba(82, 196, 26, 0.6)", l.warning = "rgba(250, 173, 20, 0.6)", l.error = "rgba(255, 77, 79, 0.6)", l))(Bl2 || {});
var Fl2 = ((l) => (l.primary = "#1677FF", l.info = "#1677FF", l.success = "#52c41a", l.warning = "#faad14", l.error = "#ff4d4f", l))(Fl2 || {});
var _a2 = W(defineComponent({ __name: "GradientText", props: { gradient: { default: void 0 }, size: { default: 14 }, type: { default: "primary" } }, setup(l) {
  const a = l, e = computed(() => typeof a.gradient == "string" ? { backgroundImage: a.gradient } : {}), t = computed(() => typeof a.gradient == "object" && a.gradient.deg ? typeof a.gradient.deg == "number" ? a.gradient.deg + "deg" : a.gradient.deg : "252deg"), c = computed(() => typeof a.gradient == "object" ? a.gradient.from : Bl2[a.type]), s = computed(() => typeof a.gradient == "object" ? a.gradient.to : Fl2[a.type]), u = computed(() => typeof a.size == "number" ? a.size + "px" : typeof a.size == "string" ? a.size : void 0);
  return (n, m) => (openBlock(), createElementBlock("span", { class: "m-gradient-text", style: normalizeStyle([`--rotate: ${t.value}; --color-start: ${c.value}; --color-end: ${s.value}; --font-size: ${u.value};`, e.value]) }, [renderSlot(n.$slots, "default", {}, void 0, true)], 4));
} }), [["__scopeId", "data-v-0b6116a8"]]);
_a2.install = (l) => {
  l.component(_a2.__name, _a2);
};
var za2 = W(defineComponent({ __name: "Row", props: { width: { default: "auto" }, gutter: { default: 0 }, wrap: { type: Boolean, default: false }, align: { default: "top" }, justify: { default: "start" } }, setup(l) {
  const a = l, e = { top: "flex-start", middle: "center", bottom: "flex-end", stretch: "stretch" }, t = ref(window.innerWidth), c = je2(function() {
    t.value = window.innerWidth;
  }, 100);
  Re(window, "resize", c);
  const s = computed(() => typeof a.gutter == "number" ? a.gutter : Array.isArray(a.gutter) ? typeof a.gutter[0] == "object" ? m(a.gutter[0]) : a.gutter[0] : typeof a.gutter == "object" ? m(a.gutter) : 0), u = computed(() => Array.isArray(a.gutter) ? typeof a.gutter[1] == "object" ? m(a.gutter[1]) : a.gutter[1] : 0), n = computed(() => typeof a.width == "number" ? a.width + "px" : a.width);
  function m(r) {
    return t.value >= 1600 && r.xxl ? r.xxl : t.value >= 1200 && r.xl ? r.xl : t.value >= 992 && r.lg ? r.lg : t.value >= 768 && r.md ? r.md : t.value >= 576 && r.sm ? r.sm : t.value < 576 && r.xs ? r.xs : 0;
  }
  return (r, w) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-row", { "gutter-row": r.gutter }]), style: normalizeStyle(`--xGap: ${s.value / 2}px; --justify: ${r.justify}; --align: ${e[r.align]}; width: ${n.value}; margin-left: -${s.value / 2}px; margin-right: -${s.value / 2}px; row-gap: ${u.value}px;`) }, [renderSlot(r.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-a39c38e6"]]);
var Ca2 = W(defineComponent({ __name: "Col", props: { span: { default: void 0 }, offset: { default: 0 }, flex: { default: void 0 }, order: { default: 0 }, xs: { default: void 0 }, sm: { default: void 0 }, md: { default: void 0 }, lg: { default: void 0 }, xl: { default: void 0 }, xxl: { default: void 0 } }, setup(l) {
  const a = l, e = computed(() => typeof a.flex == "number" ? `${a.flex} ${a.flex} auto` : a.flex), t = computed(() => [{ width: 1600, value: a.xxl }, { width: 1200, value: a.xl }, { width: 992, value: a.lg }, { width: 768, value: a.md }, { width: 576, value: a.sm }, { width: 0, value: a.xs }]), c = ref(window.innerWidth), s = je2(function() {
    c.value = window.innerWidth;
  }, 100);
  Re(window, "resize", s);
  const u = computed(() => {
    for (const n of t.value) if (n.value && c.value >= n.width) return typeof n.value == "object" ? { span: n.value.span || a.span, offset: n.value.offset || a.offset } : { span: n.value, offset: a.offset };
    return { span: a.span, offset: a.offset };
  });
  return (n, m) => (openBlock(), createElementBlock("div", { class: normalizeClass(`m-col col-${u.value.span} offset-${u.value.offset}`), style: normalizeStyle([{ "padding-left": "var(--xGap)", "padding-right": "var(--xGap)" }, `flex: ${e.value}; order: ${n.order};`]) }, [renderSlot(n.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-aba821e5"]]);
za2.install = (l) => {
  l.component(za2.__name, za2);
}, Ca2.install = (l) => {
  l.component(Ca2.__name, Ca2);
};
var Ie2 = W(defineComponent({ __name: "Space", props: { width: { default: "auto" }, align: { default: "start" }, vertical: { type: Boolean, default: false }, gap: { default: "small" }, wrap: { type: Boolean, default: true } }, setup(l) {
  const a = l, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), t = computed(() => {
    if (typeof a.gap == "number") return a.gap + "px";
    if (Array.isArray(a.gap)) return a.gap[1] + "px " + a.gap[0] + "px ";
    if (["small", "middle", "large"].includes(a.gap))
      return { small: "8px", middle: "16px", large: "24px" }[a.gap];
  });
  return (c, s) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-space", [`space-${c.align}`, { "space-vertical": c.vertical, "space-wrap": c.wrap }]]), style: normalizeStyle(`width: ${e.value}; gap: ${t.value}; margin-bottom: -${Array.isArray(a.gap) && c.wrap ? a.gap[1] : 0}px;`) }, [renderSlot(c.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-6a17b70f"]]);
Ie2.install = (l) => {
  l.component(Ie2.__name, Ie2);
};
var Le = (l) => (pushScopeId("data-v-4db6254d"), l = l(), popScopeId(), l);
var Mo = { class: "m-image-wrap" };
var _o = ["onLoad", "src", "alt"];
var zo = ["onClick"];
var Co = { class: "m-image-mask-info" };
var $o = Le(() => createBaseVNode("svg", { class: "u-eye", focusable: "false", "data-icon": "eye", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })], -1));
var Bo = { class: "u-pre" };
var Fo = { class: "m-preview-mask" };
var So = { class: "m-preview-body" };
var Lo = { class: "m-preview-operations" };
var Ao = ["href", "title"];
var Do = [Le(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "close", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var To = [Le(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "zoom-in", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })], -1))];
var Eo = [Le(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "zoom-out", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })], -1))];
var Ho = [Le(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "expand", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z" })], -1))];
var Io = [Le(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "rotate-right", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" }), createBaseVNode("path", { d: "M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" })], -1))];
var jo = [Le(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "rotate-left", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" }), createBaseVNode("path", { d: "M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" })], -1))];
var Vo = [Le(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "swap", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" })], -1))];
var Ro = { class: "u-icon", style: { transform: "rotate(90deg)" }, focusable: "false", "data-icon": "swap", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Wo = [Le(() => createBaseVNode("path", { d: "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" }, null, -1))];
var qo = ["src", "alt", "onLoad"];
var No = [Le(() => createBaseVNode("svg", { focusable: "false", class: "u-switch", "data-icon": "left", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })], -1))];
var Po = [Le(() => createBaseVNode("svg", { focusable: "false", class: "u-switch", "data-icon": "right", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" })], -1))];
var Oo = defineComponent({ __name: "Image", props: { src: { default: "" }, name: { default: "" }, width: { default: 200 }, height: { default: 200 }, bordered: { type: Boolean, default: true }, gap: { default: 8 }, fit: { default: "contain" }, preview: { default: "预览" }, zoomRatio: { default: 0.1 }, minZoomScale: { default: 0.1 }, maxZoomScale: { default: 10 }, resetOnDbclick: { type: Boolean, default: true }, loop: { type: Boolean, default: false }, album: { type: Boolean, default: false } }, setup(l, { expose: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), c = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), s = ref([]);
  watchEffect(() => {
    s.value = Array.isArray(e.src) ? e.src : [{ src: e.src, name: e.name }];
  });
  const u = computed(() => s.value.length), n = ref(Array(u.value).fill(false)), m = ref(Array(u.value).fill(false)), r = ref(), w = ref(0), p = ref(false), g = ref(0), f = ref(1), v = ref(1), h3 = ref(1), b = ref(0), M = ref(0), B = ref(0), k = ref(0);
  function x(O) {
    if (O) {
      if (O.name) return O.name;
      {
        const ue = O.src.split("?")[0].split("/");
        return ue[ue.length - 1];
      }
    }
  }
  function z(O) {
    p.value && u.value > 1 && (O.key !== "ArrowLeft" && O.key !== "ArrowUp" || te(), O.key !== "ArrowRight" && O.key !== "ArrowDown" || de());
  }
  function $(O) {
    f.value = 1, g.value = 0, B.value = 0, k.value = 0, p.value = true, w.value = O, nextTick(() => {
      r.value.focus();
    });
  }
  function L() {
    p.value = false;
  }
  function T() {
    f.value + e.zoomRatio > e.maxZoomScale ? f.value = e.maxZoomScale : f.value = Ue(f.value, e.zoomRatio);
  }
  function V() {
    f.value - e.zoomRatio < e.minZoomScale ? f.value = e.minZoomScale : f.value = Ue(f.value, -e.zoomRatio);
  }
  function P() {
    f.value = 1, v.value = 1, h3.value = 1, g.value = 0, B.value = 0, k.value = 0;
  }
  function U() {
    g.value += 90;
  }
  function G3() {
    g.value -= 90;
  }
  function E() {
    v.value *= -1;
  }
  function H() {
    h3.value *= -1;
  }
  function N(O) {
    const ue = O.deltaY * e.zoomRatio * 0.1;
    f.value === e.minZoomScale && ue > 0 || f.value === e.maxZoomScale && ue < 0 || (f.value - ue < e.minZoomScale ? f.value = e.minZoomScale : f.value - ue > e.maxZoomScale ? f.value = e.maxZoomScale : f.value = Ue(f.value, -ue));
  }
  function te() {
    e.loop ? w.value = (w.value - 1 + u.value) % u.value : w.value > 0 && w.value--, P();
  }
  function de() {
    e.loop ? w.value = (w.value + 1) % u.value : w.value < u.value - 1 && w.value++, P();
  }
  return a({ preview: $ }), (O, ue) => (openBlock(), createElementBlock("div", Mo, [createVNode(unref(Ie2), { gap: O.gap }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (we, ve) => withDirectives((openBlock(), createElementBlock("div", { class: normalizeClass(["m-image", { bordered: O.bordered, "image-hover-mask": n.value[ve] }]), style: normalizeStyle(`width: ${t.value}; height: ${c.value};`), key: ve }, [createVNode(unref(Se2), { spinning: !n.value[ve], indicator: "dynamic-circle" }, { default: withCtx(() => [createBaseVNode("img", { class: "u-image", style: normalizeStyle(`object-fit: ${O.fit};`), onLoad: (Me2) => {
    return ne = ve, void (n.value[ne] = true);
    var ne;
  }, src: we.src, alt: we.name }, null, 44, _o)]), _: 2 }, 1032, ["spinning"]), createBaseVNode("div", { class: "m-image-mask", onClick: (Me2) => $(ve) }, [createBaseVNode("div", Co, [$o, createBaseVNode("p", Bo, [renderSlot(O.$slots, "preview", {}, () => [createTextVNode(toDisplayString(O.preview), 1)], true)])])], 8, zo)], 6)), [[vShow, !O.album || O.album && ve === 0]])), 128))]), _: 3 }, 8, ["gap"]), createVNode(Transition, { name: "fade" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", Fo, null, 512), [[vShow, p.value]])]), _: 1 }), createVNode(Transition, { name: "zoom" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { ref_key: "previewRef", ref: r, class: "m-preview-wrap", tabindex: "-1", onClick: withModifiers(L, ["self"]), onWheel: withModifiers(N, ["prevent"]), onKeydown: [z, withKeys(L, ["esc"])] }, [createBaseVNode("div", So, [createBaseVNode("div", Lo, [createBaseVNode("a", { class: "u-name", href: s.value[w.value].src, target: "_blank", title: x(s.value[w.value]) }, toDisplayString(x(s.value[w.value])), 9, Ao), withDirectives(createBaseVNode("p", { class: "u-preview-progress" }, toDisplayString(w.value + 1) + " / " + toDisplayString(u.value), 513), [[vShow, Array.isArray(O.src)]]), createBaseVNode("div", { class: "u-preview-operation", title: "关闭", onClick: L }, Do), createBaseVNode("div", { class: normalizeClass(["u-preview-operation", { "u-operation-disabled": f.value === O.maxZoomScale }]), title: "放大", onClick: T }, To, 2), createBaseVNode("div", { class: normalizeClass(["u-preview-operation", { "u-operation-disabled": f.value === O.minZoomScale }]), title: "缩小", onClick: V }, Eo, 2), createBaseVNode("div", { class: "u-preview-operation", title: "还原", onClick: P }, Ho), createBaseVNode("div", { class: "u-preview-operation", title: "向右旋转", onClick: U }, Io), createBaseVNode("div", { class: "u-preview-operation", title: "向左旋转", onClick: G3 }, jo), createBaseVNode("div", { class: "u-preview-operation", title: "水平镜像", onClick: E }, Vo), createBaseVNode("div", { class: "u-preview-operation", title: "垂直镜像", onClick: H }, [(openBlock(), createElementBlock("svg", Ro, Wo))])]), createBaseVNode("div", { class: "m-preview-image", style: normalizeStyle(`transform: translate3d(${B.value}px, ${k.value}px, 0px);`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (we, ve) => withDirectives((openBlock(), createBlock(unref(Se2), { spinning: !m.value[ve], indicator: "dynamic-circle", key: ve }, { default: withCtx(() => [createBaseVNode("img", { class: "u-preview-image", style: normalizeStyle(`transform: scale3d(${v.value * f.value}, ${h3.value * f.value}, 1) rotate(${g.value}deg);`), src: we.src, alt: we.name, onMousedown: ue[0] || (ue[0] = withModifiers((Me2) => function(ne) {
    const ze2 = ne.target.getBoundingClientRect(), Ae = ze2.top, j = ze2.bottom, Q = ze2.right, le = ze2.left, he = window.innerWidth, Ce2 = window.innerHeight;
    b.value = ne.clientX, M.value = ne.clientY;
    const pe = B.value, De = k.value;
    window.onmousemove = (ta2) => {
      B.value = pe + ta2.clientX - b.value, k.value = De + ta2.clientY - M.value;
    }, window.onmouseup = () => {
      B.value > pe + he - Q && (B.value = pe + he - Q), B.value < pe - le && (B.value = pe - le), k.value > De + Ce2 - j && (k.value = De + Ce2 - j), k.value < De - Ae && (k.value = De - Ae), window.onmousemove = null;
    };
  }(Me2), ["prevent"])), onLoad: (Me2) => function(ne) {
    m.value[ne] = true;
  }(ve), onDblclick: ue[1] || (ue[1] = (Me2) => O.resetOnDbclick ? P() : () => false) }, null, 44, qo)]), _: 2 }, 1032, ["spinning"])), [[vShow, w.value === ve]])), 128))], 4), u.value > 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", { class: normalizeClass(["m-switch-left", { "u-switch-disabled": w.value === 0 && !O.loop }]), onClick: te }, No, 2), createBaseVNode("div", { class: normalizeClass(["m-switch-right", { "u-switch-disabled": w.value === u.value - 1 && !O.loop }]), onClick: de }, Po, 2)], 64)) : createCommentVNode("", true)])], 544), [[vShow, p.value]])]), _: 1 })]));
} });
var Qe = W(Oo, [["__scopeId", "data-v-4db6254d"]]);
Qe.install = (l) => {
  l.component(Qe.__name, Qe);
};
var nl = (l) => (pushScopeId("data-v-337e31e6"), l = l(), popScopeId(), l);
var Ko = { key: 0, class: "m-prefix" };
var Yo = ["type", "value", "maxlength", "disabled", "onKeydown"];
var Uo = { class: "m-suffix" };
var Go = [nl(() => createBaseVNode("svg", { focusable: "false", class: "u-clear", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })], -1))];
var Zo = { focusable: "false", class: "u-eye", "data-icon": "eye", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Qo = [nl(() => createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" }, null, -1))];
var Xo = { focusable: "false", class: "u-eye", "data-icon": "eye-invisible", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Jo = [nl(() => createBaseVNode("path", { d: "M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" }, null, -1)), nl(() => createBaseVNode("path", { d: "M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" }, null, -1))];
var es = { key: 2, class: "m-count" };
var $a2 = W(defineComponent({ inheritAttrs: false, __name: "Input", props: { width: { default: "100%" }, addonBefore: { default: "" }, addonAfter: { default: "" }, allowClear: { type: Boolean, default: false }, password: { type: Boolean, default: false }, disabled: { type: Boolean, default: false }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, size: { default: "middle" }, prefix: { default: "" }, suffix: { default: "" }, value: { default: "" }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "enter"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), c = computed(() => e.maxlength ? e.value.length + " / " + e.maxlength : e.value.length), s = useSlots(), u = computed(() => {
    var x;
    const k = (x = s.prefix) == null ? void 0 : x.call(s);
    return k ? !!(k[0].children !== "v-if" && (k != null && k.length)) : e.prefix;
  }), n = computed(() => {
    var x;
    const k = (x = s.suffix) == null ? void 0 : x.call(s);
    return k ? !!(k[0].children !== "v-if" && (k != null && k.length)) : e.suffix;
  }), m = computed(() => {
    var x;
    const k = (x = s.addonBefore) == null ? void 0 : x.call(s);
    return k ? !!(k[0].children !== "v-if" && (k != null && k.length)) : e.addonBefore;
  }), r = computed(() => {
    var x;
    const k = (x = s.addonAfter) == null ? void 0 : x.call(s);
    return k ? !!(k[0].children !== "v-if" && (k != null && k.length)) : e.addonAfter;
  }), w = computed(() => "lazy" in e.valueModifiers), p = a;
  function g(k) {
    w.value || (p("update:value", k.target.value), p("change", k));
  }
  function f(k) {
    w.value && (p("update:value", k.target.value), p("change", k));
  }
  function v(k) {
    p("enter", k);
  }
  const h3 = ref();
  function b() {
    p("update:value", ""), h3.value.focus();
  }
  const M = ref(false);
  function B() {
    M.value = !M.value;
  }
  return (k, x) => (openBlock(), createElementBlock("div", { class: "m-input-wrap", style: normalizeStyle(`width: ${t.value};`) }, [m.value ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["m-addon", { before: m.value }]) }, [renderSlot(k.$slots, "addonBefore", {}, () => [createTextVNode(toDisplayString(k.addonBefore), 1)], true)], 2)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["m-input", [`${k.size}`, { disabled: k.disabled, "input-before": m.value, "input-after": r.value }]]), tabindex: "1" }, [u.value ? (openBlock(), createElementBlock("span", Ko, [renderSlot(k.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(k.prefix), 1)], true)])) : createCommentVNode("", true), createBaseVNode("input", mergeProps({ class: "u-input", ref_key: "input", ref: h3, type: k.password && !M.value ? "password" : "text", value: k.value, maxlength: k.maxlength, disabled: k.disabled, onInput: g, onChange: f, onKeydown: withKeys(withModifiers(v, ["prevent"]), ["enter"]) }, k.$attrs), null, 16, Yo), createBaseVNode("span", Uo, [!k.disabled && k.allowClear && k.value ? (openBlock(), createElementBlock("span", { key: 0, class: "m-action", onClick: b }, Go)) : createCommentVNode("", true), k.password ? (openBlock(), createElementBlock("span", { key: 1, class: "m-action", onClick: B }, [withDirectives((openBlock(), createElementBlock("svg", Zo, Qo, 512)), [[vShow, M.value]]), withDirectives((openBlock(), createElementBlock("svg", Xo, Jo, 512)), [[vShow, !M.value]])])) : createCommentVNode("", true), k.showCount ? (openBlock(), createElementBlock("span", es, toDisplayString(c.value), 1)) : createCommentVNode("", true), n.value ? renderSlot(k.$slots, "suffix", { key: 3 }, () => [createTextVNode(toDisplayString(k.suffix), 1)], true) : createCommentVNode("", true)])], 2), r.value ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["m-addon", { after: r.value }]) }, [renderSlot(k.$slots, "addonAfter", {}, () => [createTextVNode(toDisplayString(k.addonAfter), 1)], true)], 2)) : createCommentVNode("", true)], 4));
} }), [["__scopeId", "data-v-337e31e6"]]);
$a2.install = (l) => {
  l.component($a2.__name, $a2);
};
var Sl2 = (l) => (pushScopeId("data-v-05333141"), l = l(), popScopeId(), l);
var as = { class: "m-input-wrap" };
var ls = { key: 0, class: "u-input-prefix" };
var ts = ["disabled"];
var os = { class: "m-handler-wrap" };
var ss = [Sl2(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "up", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" })], -1))];
var ns = [Sl2(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "down", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })], -1))];
var Ba2 = W(defineComponent({ inheritAttrs: false, __name: "InputNumber", props: { width: { default: 90 }, min: { default: -1 / 0 }, max: { default: 1 / 0 }, step: { default: 1 }, precision: { default: 0 }, prefix: { default: "" }, formatter: { type: Function, default: (l) => l }, keyboard: { type: Boolean, default: true }, disabled: { type: Boolean, default: false }, value: { default: null } }, emits: ["update:value", "change"], setup(l, { emit: a }) {
  var v;
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), c = computed(() => {
    var b;
    const h3 = ((b = String(e.step).split(".")[1]) == null ? void 0 : b.length) || 0;
    return Math.max(e.precision, h3);
  }), s = useSlots(), u = computed(() => {
    var b;
    const h3 = (b = s.prefix) == null ? void 0 : b.call(s);
    return h3 ? !!(h3[0].children !== "v-if" && (h3 != null && h3.length)) : e.prefix;
  }), n = ref(e.formatter((v = e.value) == null ? void 0 : v.toFixed(c.value)));
  watch(() => e.value, (h3) => {
    n.value = h3 === null ? null : e.formatter(h3 == null ? void 0 : h3.toFixed(c.value));
  }), watch(n, (h3) => {
    h3 || r(null);
  });
  const m = a;
  function r(h3) {
    m("change", h3), m("update:value", h3);
  }
  function w(h3) {
    var M, B;
    const b = h3.target.value.replace(/,/g, "");
    if (Number.isNaN(parseFloat(b))) n.value = (M = e.value) == null ? void 0 : M.toFixed(c.value);
    else {
      if (parseFloat(b) > e.max) return void r(e.max);
      if (parseFloat(b) < e.min) return void r(e.min);
      parseFloat(b) !== e.value ? r(parseFloat(b)) : n.value = (B = e.value) == null ? void 0 : B.toFixed(c.value);
    }
  }
  function p(h3) {
    h3.key === "ArrowUp" && g(), h3.key === "ArrowDown" && f();
  }
  function g() {
    r(parseFloat(Math.min(e.max, Ue(e.value || 0, +e.step)).toFixed(c.value)));
  }
  function f() {
    r(parseFloat(Math.max(e.min, Ue(e.value || 0, -e.step)).toFixed(c.value)));
  }
  return (h3, b) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-input-number", { "input-number-disabled": h3.disabled }]), tabindex: "1", style: normalizeStyle(`width: ${t.value};`) }, [createBaseVNode("div", as, [u.value ? (openBlock(), createElementBlock("span", ls, [renderSlot(h3.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(h3.prefix), 1)], true)])) : createCommentVNode("", true), h3.keyboard ? withDirectives((openBlock(), createElementBlock("input", mergeProps({ key: 1, class: "u-input-number", autocomplete: "off", disabled: h3.disabled, "onUpdate:modelValue": b[0] || (b[0] = (M) => n.value = M), onKeydown: [b[1] || (b[1] = withKeys(withModifiers(() => {
  }, ["prevent"]), ["up"])), p], onChange: w }, h3.$attrs), null, 16, ts)), [[vModelDynamic, n.value]]) : withDirectives((openBlock(), createElementBlock("input", mergeProps({ key: 2, autocomplete: "off", class: "u-input-number", onChange: w, "onUpdate:modelValue": b[2] || (b[2] = (M) => n.value = M) }, h3.$attrs), null, 16)), [[vModelDynamic, n.value]])]), createBaseVNode("div", os, [createBaseVNode("span", { class: normalizeClass(["m-arrow up-arrow", { disabled: (h3.value || 0) >= h3.max }]), onClick: g }, ss, 2), createBaseVNode("span", { class: normalizeClass(["m-arrow down-arrow", { disabled: (h3.value || 0) <= h3.min }]), onClick: f }, ns, 2)])], 6));
} }), [["__scopeId", "data-v-05333141"]]);
Ba2.install = (l) => {
  l.component(Ba2.__name, Ba2);
};
var is = { class: "m-layout" };
var Fa2 = W(defineComponent({ __name: "Layout", props: { width: { default: 90 }, min: { default: -1 / 0 }, max: { default: 1 / 0 }, step: { default: 1 }, precision: { default: 0 }, prefix: { default: "" }, formatter: { type: Function, default: (l) => l }, keyboard: { type: Boolean, default: true }, disabled: { type: Boolean, default: false }, value: { default: null } }, setup: (l) => (a, e) => (openBlock(), createElementBlock("div", is)) }), [["__scopeId", "data-v-0911edda"]]);
Fa2.install = (l) => {
  l.component(Fa2.__name, Fa2);
};
var us = { class: "m-list" };
var Sa2 = W(defineComponent({ __name: "List", props: { bordered: { type: Boolean, default: false }, dataSource: { default: () => [] }, header: { default: void 0 }, footer: { default: void 0 }, grid: { default: () => ({}) }, vertical: { type: Boolean, default: false }, loading: { type: Boolean, default: false }, loadMore: { default: void 0 }, pagination: { type: [Boolean, Object], default: false }, rowKey: { type: Function, default: void 0 }, size: { default: "middle" }, split: { type: Boolean, default: true } }, setup: (l) => (a, e) => (openBlock(), createElementBlock("div", us)) }), [["__scopeId", "data-v-456cd1f7"]]);
Sa2.install = (l) => {
  l.component(Sa2.__name, Sa2);
};
var aa2 = (l) => (pushScopeId("data-v-9c216e03"), l = l(), popScopeId(), l);
var cs = ["onMouseenter", "onMouseleave"];
var rs = [aa2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var ds = [aa2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var vs = [aa2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var ps = [aa2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var fs = [aa2(() => createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" }, null, -1))];
var hs = { class: "u-content" };
var We = ((l) => (l.info = "#1677FF", l.success = "#52c41a", l.error = "#ff4d4f", l.warning = "#faad14", l.loading = "#1677FF", l))(We || {});
var ms = defineComponent({ __name: "Message", props: { duration: { default: 3e3 }, top: { default: 30 } }, emits: ["close"], setup(l, { expose: a, emit: e }) {
  const t = l, c = ref(), s = ref([]), u = ref([]), n = ref([]), m = computed(() => typeof t.top == "number" ? t.top + "px" : t.top), r = computed(() => s.value.every((f) => !f));
  function w() {
    ce(c.value);
    const f = n.value.length - 1;
    s.value[f] = true, g(f);
  }
  watch(r, (f, v) => {
    !v && f && (c.value = be(() => {
      n.value.splice(0), s.value.splice(0);
    }, 300));
  }), a({ info: function(f) {
    n.value.push({ content: f, mode: "info" }), w();
  }, success: function(f) {
    n.value.push({ content: f, mode: "success" }), w();
  }, error: function(f) {
    n.value.push({ content: f, mode: "error" }), w();
  }, warning: function(f) {
    n.value.push({ content: f, mode: "warning" }), w();
  }, loading: function(f) {
    n.value.push({ content: f, mode: "loading" }), w();
  } });
  const p = e;
  function g(f) {
    u.value[f] = be(() => {
      s.value[f] = false, p("close");
    }, t.duration);
  }
  return (f, v) => (openBlock(), createElementBlock("div", { class: "m-message-wrap", style: normalizeStyle(`top: ${m.value};`) }, [createVNode(TransitionGroup, { name: "slide-fade" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (h3, b) => withDirectives((openBlock(), createElementBlock("div", { class: "m-message", key: b }, [createBaseVNode("div", { class: "m-message-content", onMouseenter: (M) => function(B) {
    ce(u.value[B]);
  }(b), onMouseleave: (M) => function(B) {
    g(B);
  }(b) }, [h3.mode === "info" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-svg", style: normalizeStyle({ fill: We[h3.mode] }), viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true", focusable: "false" }, rs, 4)) : createCommentVNode("", true), h3.mode === "success" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-svg", style: normalizeStyle({ fill: We[h3.mode] }), viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true", focusable: "false" }, ds, 4)) : createCommentVNode("", true), h3.mode === "error" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-svg", style: normalizeStyle({ fill: We[h3.mode] }), viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true", focusable: "false" }, vs, 4)) : createCommentVNode("", true), h3.mode === "warning" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-svg", style: normalizeStyle({ fill: We[h3.mode] }), viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true", focusable: "false" }, ps, 4)) : createCommentVNode("", true), h3.mode === "loading" ? (openBlock(), createElementBlock("svg", { key: 4, class: "u-svg circular", style: normalizeStyle({ stroke: We[h3.mode] }), viewBox: "0 0 50 50", focusable: "false" }, fs, 4)) : createCommentVNode("", true), createBaseVNode("p", hs, toDisplayString(h3.content), 1)], 40, cs)])), [[vShow, s.value[b]]])), 128))]), _: 1 })], 4));
} });
var Xe = W(ms, [["__scopeId", "data-v-9c216e03"]]);
Xe.install = (l) => {
  l.component(Xe.__name, Xe);
};
var Ne = (l) => (pushScopeId("data-v-e1d3c7a0"), l = l(), popScopeId(), l);
var gs = { class: "m-modal-root" };
var ys = { class: "m-modal-mask" };
var ws = { class: "m-modal-body" };
var ks = { class: "m-body" };
var bs = { class: "m-title" };
var xs = { key: 0, focusable: "false", class: "u-icon confirm", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Ms = [Ne(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), Ne(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var _s = { key: 1, focusable: "false", class: "u-icon info", "data-icon": "info-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var zs = [Ne(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var Cs = { key: 2, focusable: "false", class: "u-icon success", "data-icon": "check-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var $s = [Ne(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var Bs = { key: 3, focusable: "false", class: "u-icon error", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Fs = [Ne(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var Ss = { key: 4, focusable: "false", class: "u-icon warning", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Ls = [Ne(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var As = { class: "u-title" };
var Ds = { class: "u-content" };
var Ts = { class: "m-btns" };
var La = W(defineComponent({ __name: "Modal", props: { width: { default: 420 }, cancelText: { default: "取消" }, okText: { default: "确定" }, noticeText: { default: "知道了" }, center: { type: Boolean, default: true }, top: { default: 100 }, loading: { type: Boolean, default: false }, show: { type: Boolean, default: false } }, emits: ["update:show", "cancel", "ok", "know"], setup(l, { expose: a, emit: e }) {
  const t = ref(""), c = ref(), s = ref(), u = e;
  function n() {
    u("update:show", true), nextTick(() => {
      s.value.focus();
    });
  }
  function m() {
    u("update:show", false), u("cancel");
  }
  function r() {
    u("update:show", false), u("cancel");
  }
  function w() {
    u("ok");
  }
  function p() {
    u("update:show", false), u("know");
  }
  return a({ info: function(g) {
    t.value = "info", c.value = g, n();
  }, success: function(g) {
    t.value = "success", c.value = g, n();
  }, error: function(g) {
    t.value = "error", c.value = g, n();
  }, warning: function(g) {
    t.value = "warning", c.value = g, n();
  }, confirm: function(g) {
    t.value = "confirm", c.value = g, n();
  }, erase: function(g) {
    t.value = "erase", c.value = g, n();
  } }), (g, f) => (openBlock(), createElementBlock("div", gs, [createVNode(Transition, { name: "fade" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", ys, null, 512), [[vShow, g.show]])]), _: 1 }), createVNode(Transition, { name: "zoom" }, { default: withCtx(() => {
    var v, h3;
    return [withDirectives(createBaseVNode("div", { class: "m-modal-wrap", onClick: withModifiers(m, ["self"]) }, [createBaseVNode("div", { ref_key: "modalRef", ref: s, tabindex: "-1", class: normalizeClass(["m-modal", g.center ? "relative-hv-center" : "top-center"]), style: normalizeStyle(`width: ${g.width}px; top: ${g.center ? "50%" : g.top + "px"};`), onKeydown: withKeys(r, ["esc"]) }, [createBaseVNode("div", ws, [createBaseVNode("div", ks, [createBaseVNode("div", bs, [t.value === "confirm" || t.value === "erase" ? (openBlock(), createElementBlock("svg", xs, Ms)) : createCommentVNode("", true), t.value === "info" ? (openBlock(), createElementBlock("svg", _s, zs)) : createCommentVNode("", true), t.value === "success" ? (openBlock(), createElementBlock("svg", Cs, $s)) : createCommentVNode("", true), t.value === "error" ? (openBlock(), createElementBlock("svg", Bs, Fs)) : createCommentVNode("", true), t.value === "warning" ? (openBlock(), createElementBlock("svg", Ss, Ls)) : createCommentVNode("", true), createBaseVNode("div", As, toDisplayString((v = c.value) == null ? void 0 : v.title), 1)]), createBaseVNode("div", Ds, toDisplayString((h3 = c.value) == null ? void 0 : h3.content), 1)]), createBaseVNode("div", Ts, [t.value === "confirm" || t.value === "erase" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(unref($e), { class: "mr8", onClick: r }, { default: withCtx(() => [createTextVNode(toDisplayString(g.cancelText), 1)]), _: 1 }), t.value === "confirm" ? (openBlock(), createBlock(unref($e), { key: 0, type: "primary", loading: g.loading, onClick: w }, { default: withCtx(() => [createTextVNode(toDisplayString(g.okText), 1)]), _: 1 }, 8, ["loading"])) : createCommentVNode("", true), t.value === "erase" ? (openBlock(), createBlock(unref($e), { key: 1, type: "danger", loading: g.loading, onClick: w }, { default: withCtx(() => [createTextVNode(toDisplayString(g.okText), 1)]), _: 1 }, 8, ["loading"])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), ["info", "success", "error", "warning"].includes(t.value) ? (openBlock(), createBlock(unref($e), { key: 1, type: "primary", loading: g.loading, onClick: p }, { default: withCtx(() => [createTextVNode(toDisplayString(g.noticeText), 1)]), _: 1 }, 8, ["loading"])) : createCommentVNode("", true)])])], 38)], 512), [[vShow, g.show]])];
  }), _: 1 })]));
} }), [["__scopeId", "data-v-e1d3c7a0"]]);
La.install = (l) => {
  l.component(La.__name, La);
};
var Te = (l) => (pushScopeId("data-v-7cb02f5c"), l = l(), popScopeId(), l);
var Es = ["onMouseenter", "onMouseleave"];
var Hs = { class: "m-notification-content" };
var Is = [Te(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), Te(() => createBaseVNode("path", { d: "M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1))];
var js = [Te(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1)), Te(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var Vs = [Te(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), Te(() => createBaseVNode("path", { d: "M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var Rs = [Te(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1)), Te(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var Ws = ["onClick"];
var qs = [Te(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var Ye2 = ((l) => (l.info = "#1677FF", l.success = "#52c41a", l.error = "#ff4d4f", l.warning = "#faad14", l))(Ye2 || {});
var Ns = defineComponent({ __name: "Notification", props: { message: { default: "温馨提示" }, duration: { default: 4500 }, top: { default: 24 }, bottom: { default: 24 }, placement: { default: "topRight" } }, emits: ["close"], setup(l, { expose: a, emit: e }) {
  const t = l, c = ref(), s = ref([]), u = ref([]), n = ref([]), m = ref(t.placement), r = ref(), w = computed(() => s.value.length === n.value.length);
  function p() {
    ce(c.value), u.value.push(null);
    const v = n.value.length - 1;
    nextTick(() => {
      r.value[v].style.height = r.value[v].offsetHeight + "px", r.value[v].style.opacity = 1;
    }), n.value[v].placement && (m.value = n.value[v].placement), t.duration && (u.value[v] = be(() => {
      f(v);
    }, t.duration));
  }
  watch(w, (v, h3) => {
    !h3 && v && (c.value = be(() => {
      s.value.splice(0), n.value.splice(0);
    }, 300));
  }), a({ open: function(v) {
    n.value.push({ ...v, mode: "open" }), p();
  }, info: function(v) {
    n.value.push({ ...v, mode: "info" }), p();
  }, success: function(v) {
    n.value.push({ ...v, mode: "success" }), p();
  }, error: function(v) {
    n.value.push({ ...v, mode: "error" }), p();
  }, warning: function(v) {
    n.value.push({ ...v, mode: "warning" }), p();
  } });
  const g = e;
  function f(v) {
    s.value.push(v), g("close");
  }
  return (v, h3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-notification-wrapper", m.value]), style: normalizeStyle(`top: ${["topRight", "topLeft"].includes(m.value) ? v.top : "auto"}px; bottom: ${["bottomRight", "bottomLeft"].includes(m.value) ? v.bottom : ""}px;`) }, [createVNode(TransitionGroup, { name: ["topRight", "bottomRight"].includes(m.value) ? "right" : "left" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (b, M) => withDirectives((openBlock(), createElementBlock("div", { ref_for: true, ref_key: "notification", ref: r, class: "m-notification", onMouseenter: (B) => function(k) {
    ce(u.value[k]), u.value[k] = null;
  }(M), onMouseleave: (B) => function(k) {
    t.duration && (u.value[k] = be(() => {
      f(k);
    }, t.duration));
  }(M), key: M }, [createBaseVNode("div", Hs, [b.mode === "info" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-svg", style: normalizeStyle(`fill: ${Ye2[b.mode]}`), viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true", focusable: "false" }, Is, 4)) : createCommentVNode("", true), b.mode === "success" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-svg", style: normalizeStyle(`fill: ${Ye2[b.mode]}`), viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true", focusable: "false" }, js, 4)) : createCommentVNode("", true), b.mode === "warning" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-svg", style: normalizeStyle(`fill: ${Ye2[b.mode]}`), viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true", focusable: "false" }, Vs, 4)) : createCommentVNode("", true), b.mode === "error" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-svg", style: normalizeStyle(`fill: ${Ye2[b.mode]}`), viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true", focusable: "false" }, Rs, 4)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["u-title", { mb4: b.mode !== "open", ml36: b.mode !== "open" }]) }, toDisplayString(b.message || v.message), 3), createBaseVNode("p", { class: normalizeClass(["u-description", { ml36: b.mode !== "open" }]) }, toDisplayString(b.description || "--"), 3), (openBlock(), createElementBlock("svg", { class: "u-close", onClick: (B) => f(M), viewBox: "64 64 896 896", "data-icon": "close", "aria-hidden": "true", focusable: "false" }, qs, 8, Ws))])], 40, Es)), [[vShow, !s.value.includes(M)]])), 128))]), _: 1 }, 8, ["name"])], 6));
} });
var Aa2 = W(Ns, [["__scopeId", "data-v-7cb02f5c"]]);
Aa2.install = (l) => {
  l.component(Aa2.__name, Aa2);
};
var Da = defineComponent({ __name: "NumberAnimation", props: { from: { default: 0 }, to: { default: 1e3 }, duration: { default: 3e3 }, autoplay: { type: Boolean, default: true }, precision: { default: 0 }, prefix: { default: "" }, suffix: { default: "" }, separator: { default: "," }, decimal: { default: "." }, valueStyle: { default: () => ({}) }, transition: { default: "easeInOutCubic" } }, emits: ["started", "finished"], setup(l, { expose: a, emit: e }) {
  const t = l, c = ref(t.from);
  watchEffect(() => {
    c.value = t.from;
  }), watch([() => t.from, () => t.to], () => {
    t.autoplay && u();
  }), onMounted(() => {
    t.autoplay && u();
  });
  const s = useTransition(c, { duration: t.duration, transition: TransitionPresets[t.transition], onFinished: () => m("finished"), onStarted: () => m("started") });
  function u() {
    c.value = t.to;
  }
  const n = computed(() => {
    const { precision: r, separator: w, decimal: p, prefix: g, suffix: f } = t;
    return Ml2(s.value, r, w, p, g, f);
  }), m = e;
  return a({ play: u }), (r, w) => (openBlock(), createElementBlock("span", { style: normalizeStyle(r.valueStyle) }, toDisplayString(n.value), 5));
} });
Da.install = (l) => {
  l.component(Da.__name, Da);
};
var Pe2 = (l) => (pushScopeId("data-v-79e011df"), l = l(), popScopeId(), l);
var Ps = { class: "m-pagination-wrap" };
var Os = { key: 0, class: "mr8" };
var Ks = [Pe2(() => createBaseVNode("svg", { class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "left", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })], -1))];
var Ys = [Pe2(() => createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1)), Pe2(() => createBaseVNode("svg", { class: "u-icon", viewBox: "64 64 896 896", "data-icon": "double-left", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" })], -1))];
var Us = ["onClick"];
var Gs = [Pe2(() => createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1)), Pe2(() => createBaseVNode("svg", { class: "u-icon", viewBox: "64 64 896 896", "data-icon": "double-right", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" })], -1))];
var Zs = [Pe2(() => createBaseVNode("svg", { class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "right", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })], -1))];
var Qs = { key: 2, class: "u-jump-page" };
var Xs = defineComponent({ __name: "Pagination", props: { page: { default: 1 }, pageSize: { default: 10 }, pageSizeOptions: { default: () => [10, 20, 50, 100] }, total: { default: 0 }, pageListNum: { default: 5 }, hideOnSinglePage: { type: Boolean, default: false }, showQuickJumper: { type: Boolean, default: false }, showSizeChanger: { type: Boolean, default: void 0 }, showTotal: { type: Boolean, default: false }, placement: { default: "center" } }, emits: ["change", "pageSizeChange"], setup(l, { emit: a }) {
  const e = l, t = ref(e.page), c = ref(Number(e.pageSizeOptions[0])), s = ref(""), u = ref(false), n = ref(false), m = ref(false), r = ref(false), w = computed(() => Math.ceil(e.total / c.value)), p = computed(() => function(x) {
    var z = [], $ = Math.floor(e.pageListNum / 2), L = { start: x - $, end: x + $ };
    L.start < 1 && (L.end = L.end + (1 - L.start), L.start = 1), L.end > w.value && (L.start = L.start - (L.end - w.value), L.end = w.value), L.start < 1 && (L.start = 1), L.start > 1 ? u.value = true : u.value = false, L.end < w.value ? n.value = true : n.value = false;
    for (let T = L.start; T <= L.end; T++) z.push(T);
    return z;
  }(t.value).filter((x) => x !== 1 && x !== w.value)), g = computed(() => typeof e.showSizeChanger == "boolean" ? e.showSizeChanger : e.total > 50), f = computed(() => e.pageSizeOptions.map((x) => ({ label: x + " 条/页", value: Number(x) }))), v = a;
  function h3() {
    t.value = t.value - e.pageListNum > 0 ? t.value - e.pageListNum : 1;
  }
  function b() {
    t.value = t.value + e.pageListNum < w.value ? t.value + e.pageListNum : w.value;
  }
  function M(x, z) {
    x.key === "Enter" && B(z);
  }
  function B(x) {
    if (x === 0 || x === w.value + 1) return false;
    t.value !== x && (t.value = x);
  }
  function k(x) {
    const z = Math.ceil(e.total / x);
    t.value > z ? (t.value = z, v("pageSizeChange", t.value, x)) : (v("pageSizeChange", t.value, x), v("change", t.value, x));
  }
  return watch(t, (x) => {
    console.log("change:", x), v("change", x, c.value);
  }), onMounted(() => {
    document.onkeydown = (x) => {
      x.key === "Enter" && function() {
        var z = Number(s.value);
        Number.isInteger(z) && (z < 1 && (z = 1), z > w.value && (z = w.value), B(z)), s.value = "";
      }();
    };
  }), onUnmounted(() => {
    document.onkeydown = null;
  }), (x, z) => (openBlock(), createElementBlock("div", { class: normalizeClass([`m-pagination ${x.placement}`, { hidden: x.hideOnSinglePage && x.total <= x.pageSize }]) }, [createBaseVNode("div", Ps, [x.showTotal ? (openBlock(), createElementBlock("span", Os, "共 " + toDisplayString(w.value) + " 页 / " + toDisplayString(x.total) + " 条", 1)) : createCommentVNode("", true), createBaseVNode("span", { class: normalizeClass(["u-item", { disabled: t.value === 1 }]), tabindex: "-1", onKeydown: z[0] || (z[0] = ($) => M($, t.value - 1)), onClick: z[1] || (z[1] = ($) => B(t.value - 1)) }, Ks, 34), createBaseVNode("span", { class: normalizeClass(["u-item", { active: t.value === 1 }]), onClick: z[2] || (z[2] = ($) => B(1)) }, "1", 2), withDirectives(createBaseVNode("span", { class: "m-arrow", ref: "forward", onClick: h3, onMouseenter: z[3] || (z[3] = ($) => m.value = true), onMouseleave: z[4] || (z[4] = ($) => m.value = false) }, Ys, 544), [[vShow, u.value && p.value[0] - 1 > 1]]), (openBlock(true), createElementBlock(Fragment, null, renderList(p.value, ($, L) => (openBlock(), createElementBlock("span", { class: normalizeClass(["u-item", { active: t.value === $ }]), key: L, onClick: (T) => B($) }, toDisplayString($), 11, Us))), 128)), withDirectives(createBaseVNode("span", { class: "m-arrow", ref: "backward", onClick: b, onMouseenter: z[5] || (z[5] = ($) => r.value = true), onMouseleave: z[6] || (z[6] = ($) => r.value = false) }, Gs, 544), [[vShow, n.value && p.value[p.value.length - 1] + 1 < w.value]]), withDirectives(createBaseVNode("span", { class: normalizeClass(["u-item", { active: t.value === w.value }]), onClick: z[7] || (z[7] = ($) => B(w.value)) }, toDisplayString(w.value), 3), [[vShow, w.value !== 1]]), createBaseVNode("span", { class: normalizeClass(["u-item", { disabled: t.value === w.value }]), tabindex: "-1", onKeydown: z[8] || (z[8] = ($) => M($, t.value + 1)), onClick: z[9] || (z[9] = ($) => B(t.value + 1)) }, Zs, 34), g.value ? (openBlock(), createBlock(unref(Ee), { key: 1, class: "u-pagesize-select", options: f.value, onChange: k, modelValue: c.value, "onUpdate:modelValue": z[10] || (z[10] = ($) => c.value = $) }, null, 8, ["options", "modelValue"])) : createCommentVNode("", true), x.showQuickJumper ? (openBlock(), createElementBlock("span", Qs, [createTextVNode(" 跳至 "), withDirectives(createBaseVNode("input", { type: "text", "onUpdate:modelValue": z[11] || (z[11] = ($) => s.value = $) }, null, 512), [[vModelText, s.value]]), createTextVNode(" 页 ")])) : createCommentVNode("", true)])], 2));
} });
var Je2 = W(Xs, [["__scopeId", "data-v-79e011df"]]);
Je2.install = (l) => {
  l.component(Je2.__name, Je2);
};
var la = (l) => (pushScopeId("data-v-70b25deb"), l = l(), popScopeId(), l);
var Js = { class: "m-pop" };
var e2 = { class: "m-pop-message" };
var a2 = { class: "m-icon" };
var l2 = { key: 0, focusable: "false", class: "u-icon", width: "1em", height: "1em", viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true" };
var t2 = [la(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var o2 = { key: 1, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#52c41a" }, viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true" };
var s2 = [la(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var n2 = { key: 2, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#ff4d4f" }, viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true" };
var i2 = [la(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var u2 = { key: 3, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#faad14" }, viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true" };
var c2 = [la(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var r2 = { key: 0, class: "m-pop-description" };
var d2 = { class: "m-pop-buttons" };
var v2 = la(() => createBaseVNode("div", { class: "m-pop-arrow" }, [createBaseVNode("span", { class: "u-pop-arrow" })], -1));
var Ta2 = W(defineComponent({ __name: "Popconfirm", props: { title: { default: "" }, description: { default: "" }, content: { default: "" }, icon: { default: "" }, iconType: { default: "warning" }, maxWidth: { default: "auto" }, cancelText: { default: "取消" }, cancelType: { default: "default" }, cancelProps: {}, okText: { default: "确定" }, okType: { default: "primary" }, okProps: {}, showCancel: { type: Boolean, default: true } }, emits: ["cancel", "ok", "openChange"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth), c = useSlots(), s = computed(() => {
    var M;
    const b = (M = c.description) == null ? void 0 : M.call(c);
    return b ? !!(b[0].children !== "v-if" && (b != null && b.length)) : e.description;
  }), u = ref(false), n = ref(0), m = ref(0), r = ref(), w = ref(), p = a, g = ref(true);
  function f() {
    u.value = !u.value, u.value && (function() {
      const b = r.value.offsetWidth, M = w.value.offsetWidth, B = w.value.offsetHeight;
      n.value = B + 4, m.value = (M - b) / 2;
    }(), w.value.focus()), p("openChange", u.value);
  }
  function v(b) {
    u.value = false, p("openChange", false), p("cancel", b);
  }
  function h3(b) {
    u.value = false, p("openChange", false), p("ok", b);
  }
  return (b, M) => (openBlock(), createElementBlock("div", { class: "m-popconfirm", onMouseenter: M[1] || (M[1] = (B) => u.value ? void (g.value = false) : () => false), onMouseleave: M[2] || (M[2] = (B) => u.value ? (g.value = true, void w.value.focus()) : () => false) }, [createBaseVNode("div", { ref_key: "popRef", ref: w, tabindex: "1", class: normalizeClass(["m-pop-content", { "show-pop": u.value }]), style: normalizeStyle(`max-width: ${t.value}; transform-origin: 50% ${n.value}px; top: ${-n.value}px; left: ${-m.value}px;`), onBlur: M[0] || (M[0] = (B) => u.value && g.value ? (u.value = false, void p("openChange", false)) : () => false), onKeydown: withKeys(v, ["esc"]) }, [createBaseVNode("div", Js, [createBaseVNode("div", e2, [createBaseVNode("span", a2, [renderSlot(b.$slots, "icon", {}, () => [b.iconType === "info" ? (openBlock(), createElementBlock("svg", l2, t2)) : createCommentVNode("", true), b.iconType === "success" ? (openBlock(), createElementBlock("svg", o2, s2)) : createCommentVNode("", true), b.iconType === "error" ? (openBlock(), createElementBlock("svg", n2, i2)) : createCommentVNode("", true), b.iconType === "warning" ? (openBlock(), createElementBlock("svg", u2, c2)) : createCommentVNode("", true)], true)]), createBaseVNode("div", { class: normalizeClass(["m-title", { "font-weight": s.value }]) }, [renderSlot(b.$slots, "title", {}, () => [createTextVNode(toDisplayString(b.title), 1)], true)], 2)]), s.value ? (openBlock(), createElementBlock("div", r2, [renderSlot(b.$slots, "description", {}, () => [createTextVNode(toDisplayString(b.description), 1)], true)])) : createCommentVNode("", true), createBaseVNode("div", d2, [b.showCancel ? (openBlock(), createBlock(unref($e), mergeProps({ key: 0, onClick: v, size: "small", type: b.cancelType }, b.cancelProps), { default: withCtx(() => [renderSlot(b.$slots, "cancelText", {}, () => [createTextVNode(toDisplayString(b.cancelText), 1)], true)]), _: 3 }, 16, ["type"])) : createCommentVNode("", true), createVNode(unref($e), mergeProps({ onClick: h3, size: "small", type: b.okType }, b.okProps), { default: withCtx(() => [renderSlot(b.$slots, "okText", {}, () => [createTextVNode(toDisplayString(b.okText), 1)], true)]), _: 3 }, 16, ["type"])])]), v2], 38), createBaseVNode("div", { ref_key: "contentRef", ref: r, onClick: f }, [renderSlot(b.$slots, "default", {}, () => [createTextVNode(toDisplayString(b.content), 1)], true)], 512)], 32));
} }), [["__scopeId", "data-v-70b25deb"]]);
Ta2.install = (l) => {
  l.component(Ta2.__name, Ta2);
};
var p2 = { class: "m-title" };
var f2 = { class: "m-content" };
var h2 = ((l) => (pushScopeId("data-v-9e84ac04"), l = l(), popScopeId(), l))(() => createBaseVNode("div", { class: "m-pop-arrow" }, [createBaseVNode("span", { class: "u-pop-arrow" })], -1));
var Ea2 = W(defineComponent({ __name: "Popover", props: { title: { default: "" }, content: { default: "" }, maxWidth: { default: "auto" }, trigger: { default: "hover" }, overlayStyle: { default: () => ({}) } }, emits: ["openChange"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth), c = ref(false), s = ref(0), u = ref(0), n = ref(), m = ref(), r = a, w = ref();
  function p() {
    v(), ce(w.value), c.value = true, r("openChange", c.value);
  }
  function g() {
    w.value = be(() => {
      c.value = false, r("openChange", c.value);
    }, 100);
  }
  const f = ref(false);
  function v() {
    const h3 = n.value.offsetWidth, b = m.value.offsetWidth, M = m.value.offsetHeight;
    s.value = M + 4, u.value = (b - h3) / 2;
  }
  return (h3, b) => (openBlock(), createElementBlock("div", { class: "m-popover", onMouseenter: b[6] || (b[6] = (M) => h3.trigger === "hover" ? p() : () => false), onMouseleave: b[7] || (b[7] = (M) => h3.trigger === "hover" ? g() : () => false) }, [createBaseVNode("div", { ref_key: "popRef", ref: m, tabindex: "1", class: normalizeClass(["m-pop-content", { "show-pop": c.value }]), style: normalizeStyle(`max-width: ${t.value}; transform-origin: 50% ${s.value}px; top: ${-s.value}px; left: ${-u.value}px;`), onBlur: b[0] || (b[0] = (M) => h3.trigger === "click" && f.value ? (c.value = false, void r("openChange", false)) : () => false), onMouseenter: b[1] || (b[1] = (M) => h3.trigger === "hover" ? p() : () => false), onMouseleave: b[2] || (b[2] = (M) => h3.trigger === "hover" ? g() : () => false) }, [createBaseVNode("div", { class: "m-pop", style: normalizeStyle(h3.overlayStyle) }, [createBaseVNode("div", p2, [renderSlot(h3.$slots, "title", {}, () => [createTextVNode(toDisplayString(h3.title), 1)], true)]), createBaseVNode("div", f2, [renderSlot(h3.$slots, "content", {}, () => [createTextVNode(toDisplayString(h3.content), 1)], true)])], 4), h2], 38), createBaseVNode("div", { ref_key: "defaultRef", ref: n, onClick: b[3] || (b[3] = (M) => h3.trigger === "click" ? (c.value = !c.value, c.value && v(), void r("openChange", c.value)) : () => false), onMouseenter: b[4] || (b[4] = (M) => h3.trigger === "click" && c.value ? void (f.value = false) : () => false), onMouseleave: b[5] || (b[5] = (M) => h3.trigger === "click" && c.value ? (f.value = true, void m.value.focus()) : () => false) }, [renderSlot(h3.$slots, "default", {}, void 0, true)], 544)], 32));
} }), [["__scopeId", "data-v-9e84ac04"]]);
Ea2.install = (l) => {
  l.component(Ea2.__name, Ea2);
};
var Ll2 = (l) => (pushScopeId("data-v-827732da"), l = l(), popScopeId(), l);
var m2 = { class: "m-progress-inner" };
var g2 = { key: 0, class: "m-success" };
var y2 = { key: 0, focusable: "false", class: "u-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var w2 = [Ll2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var k2 = { key: 1, class: "u-success-info" };
var b2 = { key: 1, class: "u-progress-text" };
var x2 = { class: "u-progress-circle", viewBox: "0 0 100 100" };
var M2 = { key: 0 };
var _2 = { id: "circleGradient", x1: "100%", y1: "0%", x2: "0%", y2: "0%" };
var z2 = ["stop-color"];
var C2 = ["stop-color"];
var $2 = ["d", "stroke-linecap", "stroke-width"];
var B2 = ["d", "stroke-linecap", "stroke-width", "stroke", "opacity"];
var F2 = { key: 0, class: "u-icon", focusable: "false", "data-icon": "check", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var S2 = [Ll2(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1))];
var L2 = { key: 1, class: "u-success-info" };
var A2 = { key: 2, class: "u-progress-text" };
var Ha2 = W(defineComponent({ __name: "Progress", props: { width: { default: "100%" }, percent: { default: 0 }, strokeWidth: { default: 8 }, strokeColor: { default: "#1677FF" }, strokeLinecap: { default: "round" }, showInfo: { type: Boolean, default: true }, success: { default: void 0 }, format: { type: Function, default: (l) => l + "%" }, type: { default: "line" } }, setup(l) {
  const a = l, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), t = computed(() => (100 - a.strokeWidth) * Math.PI), c = computed(() => {
    const g = 100 - a.strokeWidth;
    return `M 50,50 m 0,-${g / 2}
   a ${g / 2},${g / 2} 0 1 1 0,${g}
   a ${g / 2},${g / 2} 0 1 1 0,-${g}`;
  }), s = computed(() => typeof a.strokeColor != "string"), u = computed(() => typeof a.strokeColor == "string" ? a.strokeColor : `linear-gradient(to ${a.strokeColor.direction || "right"}, ${a.strokeColor["0%"] || a.strokeColor.from}, ${a.strokeColor["100%"] || a.strokeColor.to})`), n = computed(() => {
    if (s.value) {
      const g = a.strokeColor;
      return g.direction && g.direction !== "right" ? g["100%"] || g.to : g["0%"] || g.from;
    }
  }), m = computed(() => {
    if (s.value) {
      const g = a.strokeColor;
      return g.direction && g.direction !== "right" ? g["0%"] || g.from : g["100%"] || g.to;
    }
  }), r = computed(() => a.format(a.percent > 100 ? 100 : a.percent)), w = useSlots(), p = computed(() => {
    var f;
    const g = (f = w.success) == null ? void 0 : f.call(w);
    return g && g.length || a.success;
  });
  return (g, f) => g.type === "line" ? (openBlock(), createElementBlock("div", { key: 0, class: "m-progress-line", style: normalizeStyle(`width: ${e.value}; height: ${g.strokeWidth < 24 ? 24 : g.strokeWidth}px;`) }, [createBaseVNode("div", m2, [createBaseVNode("div", { class: normalizeClass(["u-progress-bg", { "line-success": g.percent >= 100 && !s.value }]), style: normalizeStyle(`background: ${u.value}; width: ${g.percent >= 100 ? 100 : g.percent}%; height: ${g.strokeWidth}px; --border-radius: ${g.strokeLinecap === "round" ? "100px" : 0};`) }, null, 6)]), g.showInfo ? (openBlock(), createBlock(Transition, { key: 0, name: "fade", mode: "out-in" }, { default: withCtx(() => [g.percent >= 100 ? (openBlock(), createElementBlock("span", g2, [p.value === void 0 ? (openBlock(), createElementBlock("svg", y2, w2)) : (openBlock(), createElementBlock("p", k2, [renderSlot(g.$slots, "success", {}, () => [createTextVNode(toDisplayString(g.success), 1)], true)]))])) : (openBlock(), createElementBlock("p", b2, [renderSlot(g.$slots, "format", { percent: g.percent }, () => [createTextVNode(toDisplayString(r.value), 1)], true)]))]), _: 3 })) : createCommentVNode("", true)], 4)) : (openBlock(), createElementBlock("div", { key: 1, class: "m-progress-circle", style: normalizeStyle(`width: ${e.value}; height: ${e.value};`) }, [(openBlock(), createElementBlock("svg", x2, [s.value ? (openBlock(), createElementBlock("defs", M2, [createBaseVNode("linearGradient", _2, [createBaseVNode("stop", { offset: "0%", "stop-color": n.value }, null, 8, z2), createBaseVNode("stop", { offset: "100%", "stop-color": m.value }, null, 8, C2)])])) : createCommentVNode("", true), createBaseVNode("path", { d: c.value, "stroke-linecap": g.strokeLinecap, class: "u-progress-circle-trail", "stroke-width": g.strokeWidth, style: normalizeStyle(`stroke-dasharray: ${t.value}px, ${t.value}px;`), "fill-opacity": "0" }, null, 12, $2), createBaseVNode("path", { d: c.value, "stroke-linecap": g.strokeLinecap, class: normalizeClass(["u-progress-circle-path", { "circle-success": g.percent >= 100 && !s.value }]), "stroke-width": g.strokeWidth, stroke: s.value ? "url(#circleGradient)" : u.value, style: normalizeStyle(`stroke-dasharray: ${g.percent / 100 * t.value}px, ${t.value}px;`), opacity: g.percent === 0 ? 0 : 1, "fill-opacity": "0" }, null, 14, B2)])), g.showInfo ? (openBlock(), createBlock(Transition, { key: 0, name: "fade", mode: "out-in" }, { default: withCtx(() => [p.value === void 0 && g.percent >= 100 ? (openBlock(), createElementBlock("svg", F2, S2)) : g.percent >= 100 ? (openBlock(), createElementBlock("p", L2, [renderSlot(g.$slots, "success", {}, () => [createTextVNode(toDisplayString(g.success), 1)], true)])) : (openBlock(), createElementBlock("p", A2, [renderSlot(g.$slots, "format", { percent: g.percent }, () => [createTextVNode(toDisplayString(r.value), 1)], true)]))]), _: 3 })) : createCommentVNode("", true)], 4));
} }), [["__scopeId", "data-v-827732da"]]);
Ha2.install = (l) => {
  l.component(Ha2.__name, Ha2);
};
var D2 = ["src"];
var Ia = W(defineComponent({ __name: "QRCode", props: { value: { default: "" }, size: { default: 160 }, color: { default: "#000" }, bgColor: { default: "#FFF" }, bordered: { type: Boolean, default: true }, borderColor: { default: "#0505050f" }, scale: { default: 8 }, errorLevel: { default: "H" } }, setup(l) {
  const a = l, e = computed(() => useQRCode(a.value, { errorCorrectionLevel: a.errorLevel, type: "image/png", quality: 1, margin: 3, scale: a.scale, color: { dark: a.color, light: a.bgColor } }));
  return (t, c) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-qrcode", { bordered: t.bordered }]), style: normalizeStyle(`width: ${t.size}px; height: ${t.size}px; border-color: ${t.borderColor};`) }, [createBaseVNode("img", { src: e.value.value, class: "u-qrcode", alt: "QRCode" }, null, 8, D2)], 6));
} }), [["__scopeId", "data-v-4830ed95"]]);
Ia.install = (l) => {
  l.component(Ia.__name, Ia);
};
var T2 = ["onClick"];
var E2 = { class: "u-radio-label" };
var H2 = ["onClick"];
var I2 = { class: "u-radio-label" };
var j2 = defineComponent({ __name: "Radio", props: { options: { default: () => [] }, disabled: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, value: { default: null }, gap: { default: 8 }, button: { type: Boolean, default: false }, buttonStyle: { default: "outline" }, buttonSize: { default: "default" } }, emits: ["update:value", "change"], setup(l, { emit: a }) {
  const e = l, t = a;
  function c(s) {
    s !== e.value && (t("update:value", s), t("change", s));
  }
  return (s, u) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio", { "radio-vertical": !s.button && s.vertical, "radio-button-solid": s.buttonStyle === "solid", "radio-button-small": s.button && s.buttonSize === "small", "radio-button-large": s.button && s.buttonSize === "large" }]), style: normalizeStyle(`gap: ${s.button ? 0 : s.gap}px;`) }, [s.button ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(s.options, (n, m) => (openBlock(), createElementBlock("div", { tabindex: "0", class: normalizeClass(["m-radio-button-wrap", { "radio-button-checked": s.value === n.value, "radio-button-disabled": s.disabled || n.disabled }]), key: m, onClick: (r) => s.disabled || n.disabled ? () => false : c(n.value) }, [createBaseVNode("span", I2, [renderSlot(s.$slots, "default", { label: n.label }, () => [createTextVNode(toDisplayString(n.label), 1)], true)])], 10, H2))), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(s.options, (n, m) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio-wrap", { "radio-disabled": s.disabled || n.disabled }]), key: m, onClick: (r) => s.disabled || n.disabled ? () => false : c(n.value) }, [createBaseVNode("span", { class: normalizeClass(["u-radio", { "radio-checked": s.value === n.value }]) }, null, 2), createBaseVNode("span", E2, [renderSlot(s.$slots, "default", { label: n.label }, () => [createTextVNode(toDisplayString(n.label), 1)], true)])], 10, T2))), 128))], 6));
} });
var ja2 = W(j2, [["__scopeId", "data-v-73cc3184"]]);
ja2.install = (l) => {
  l.component(ja2.__name, ja2);
};
var He2 = (l) => (pushScopeId("data-v-3574dfff"), l = l(), popScopeId(), l);
var V2 = ["onClick"];
var R2 = ["onClick", "onMouseenter"];
var W2 = [He2(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1))];
var q2 = [He2(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1))];
var N2 = [He2(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1))];
var P2 = [He2(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1))];
var O2 = ["onClick", "onMouseenter"];
var K2 = [He2(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1))];
var Y2 = [He2(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1))];
var U2 = [He2(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1))];
var G2 = [He2(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1))];
var Va2 = W(defineComponent({ __name: "Rate", props: { allowClear: { type: Boolean, default: true }, allowHalf: { type: Boolean, default: false }, count: { default: 5 }, character: { default: "star-filled" }, size: { default: 20 }, color: { default: "#fadb14" }, gap: { default: 8 }, disabled: { type: Boolean, default: false }, value: { default: 0 } }, emits: ["update:value", "change", "hoverChange"], setup(l, { emit: a }) {
  const e = l, t = ref(e.value), c = ref();
  watch(() => e.value, (r) => {
    t.value = r;
  });
  const s = a;
  function u(r) {
    c.value = null, r !== e.value ? (s("change", r), s("update:value", r)) : e.allowClear ? (c.value = r, s("change", 0), s("update:value", 0)) : s("change", r);
  }
  function n() {
    c.value = null;
  }
  function m() {
    t.value = e.value;
  }
  return (r, w) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-rate", { disabled: r.disabled }]), style: normalizeStyle(`--star-color: ${r.color}; --star-gap: ${r.gap}px;`), onMouseleave: m }, [(openBlock(true), createElementBlock(Fragment, null, renderList(r.count, (p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-star", { "star-half": r.allowHalf && t.value >= p - 0.5 && t.value < p, "star-full": t.value >= p, "temp-gray": !r.allowHalf && c.value === p }]), onClick: (g) => r.allowHalf ? () => false : u(p), key: p }, [r.allowHalf ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["star-first", { "temp-gray-first": c.value === p - 0.5 }]), onClick: withModifiers((g) => u(p - 0.5), ["stop"]), onMouseenter: (g) => {
    return f = p - 0.5, t.value = f, void s("hoverChange", f);
    var f;
  }, onMouseleave: n }, [r.character === "star-filled" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, W2, 4)) : r.character === "star-outlined" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, q2, 4)) : r.character === "heart-filled" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, N2, 4)) : r.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, P2, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-star", style: normalizeStyle(`font-size: ${2 * r.size / 3}px; height: ${r.size}px; line-height: ${r.size}px;`) }, [renderSlot(r.$slots, "character", {}, () => [createTextVNode(toDisplayString(r.character), 1)], true)], 4))], 42, R2)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["star-second", { "temp-gray-second": c.value === p }]), onClick: withModifiers((g) => u(p), ["stop"]), onMouseenter: (g) => {
    return f = p, t.value = f, void s("hoverChange", f);
    var f;
  }, onMouseleave: n }, [r.character === "star-filled" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, K2, 4)) : r.character === "star-outlined" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, Y2, 4)) : r.character === "heart-filled" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, U2, 4)) : r.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-star", style: normalizeStyle(`width: ${r.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, G2, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-star", style: normalizeStyle(`font-size: ${0.66 * r.size}px; height: ${r.size}px;`) }, [renderSlot(r.$slots, "character", {}, () => [createTextVNode(toDisplayString(r.character), 1)], true)], 4))], 42, O2)], 10, V2))), 128))], 38));
} }), [["__scopeId", "data-v-3574dfff"]]);
Va2.install = (l) => {
  l.component(Va2.__name, Va2);
};
var il = (l) => (pushScopeId("data-v-33e867c4"), l = l(), popScopeId(), l);
var Z2 = { class: "m-result" };
var Q2 = { class: "m-image" };
var X2 = { key: 0, focusable: "false", class: "u-svg", style: "fill: #1677ff;", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var J2 = [il(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var en = { key: 1, focusable: "false", class: "u-svg", style: "fill: #52c41a;", "data-icon": "check-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var an = [il(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var ln2 = { key: 2, focusable: "false", class: "u-svg", style: "fill: #faad14;", "data-icon": "warning", "aria-hidden": "true", viewBox: "64 64 896 896" };
var tn = [il(() => createBaseVNode("path", { d: "M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var on2 = { key: 3, focusable: "false", class: "u-svg", style: "fill: #ff4d4f;", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var sn2 = [il(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var nn = { key: 4, class: "u-image", width: "251", height: "294" };
var un2 = [createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-33e867c4><path d="M0 129.023v-2.084C0 58.364 55.591 2.774 124.165 2.774h2.085c68.574 0 124.165 55.59 124.165 124.165v2.084c0 68.575-55.59 124.166-124.165 124.166h-2.085C55.591 253.189 0 197.598 0 129.023" fill="#E4EBF7" data-v-33e867c4></path><path d="M41.417 132.92a8.231 8.231 0 1 1-16.38-1.65 8.231 8.231 0 0 1 16.38 1.65" fill="#FFF" data-v-33e867c4></path><path d="M38.652 136.36l10.425 5.91M49.989 148.505l-12.58 10.73" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path d="M41.536 161.28a5.636 5.636 0 1 1-11.216-1.13 5.636 5.636 0 0 1 11.216 1.13M59.154 145.261a5.677 5.677 0 1 1-11.297-1.138 5.677 5.677 0 0 1 11.297 1.138M100.36 29.516l29.66-.013a4.562 4.562 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 0 0 .005 9.126M111.705 47.754l29.659-.013a4.563 4.563 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 1 0 .005 9.126" fill="#FFF" data-v-33e867c4></path><path d="M114.066 29.503V29.5l15.698-.007a4.563 4.563 0 1 0 .004 9.126l-15.698.007v-.002a4.562 4.562 0 0 0-.004-9.122M185.405 137.723c-.55 5.455-5.418 9.432-10.873 8.882-5.456-.55-9.432-5.418-8.882-10.873.55-5.455 5.418-9.432 10.873-8.882 5.455.55 9.432 5.418 8.882 10.873" fill="#FFF" data-v-33e867c4></path><path d="M180.17 143.772l12.572 7.129M193.841 158.42L178.67 171.36" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path d="M185.55 171.926a6.798 6.798 0 1 1-13.528-1.363 6.798 6.798 0 0 1 13.527 1.363M204.12 155.285a6.848 6.848 0 1 1-13.627-1.375 6.848 6.848 0 0 1 13.626 1.375" fill="#FFF" data-v-33e867c4></path><path d="M152.988 194.074a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0zM225.931 118.217a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM217.09 153.051a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.42 0zM177.84 109.842a2.21 2.21 0 1 1-4.422 0 2.21 2.21 0 0 1 4.421 0zM196.114 94.454a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM202.844 182.523a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0z" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path stroke="#FFF" stroke-width="2" d="M215.125 155.262l-1.902 20.075-10.87 5.958M174.601 176.636l-6.322 9.761H156.98l-4.484 6.449M175.874 127.28V111.56M221.51 119.404l-12.77 7.859-15.228-7.86V96.668" data-v-33e867c4></path><path d="M180.68 29.32C180.68 13.128 193.806 0 210 0c16.193 0 29.32 13.127 29.32 29.32 0 16.194-13.127 29.322-29.32 29.322-16.193 0-29.32-13.128-29.32-29.321" fill="#A26EF4" data-v-33e867c4></path><path d="M221.45 41.706l-21.563-.125a1.744 1.744 0 0 1-1.734-1.754l.071-12.23a1.744 1.744 0 0 1 1.754-1.734l21.562.125c.964.006 1.74.791 1.735 1.755l-.071 12.229a1.744 1.744 0 0 1-1.754 1.734" fill="#FFF" data-v-33e867c4></path><path d="M215.106 29.192c-.015 2.577-2.049 4.654-4.543 4.64-2.494-.014-4.504-2.115-4.489-4.693l.04-6.925c.016-2.577 2.05-4.654 4.543-4.64 2.494.015 4.504 2.116 4.49 4.693l-.04 6.925zm-4.53-14.074a6.877 6.877 0 0 0-6.916 6.837l-.043 7.368a6.877 6.877 0 0 0 13.754.08l.042-7.368a6.878 6.878 0 0 0-6.837-6.917zM167.566 68.367h-3.93a4.73 4.73 0 0 1-4.717-4.717 4.73 4.73 0 0 1 4.717-4.717h3.93a4.73 4.73 0 0 1 4.717 4.717 4.73 4.73 0 0 1-4.717 4.717" fill="#FFF" data-v-33e867c4></path><path d="M168.214 248.838a6.611 6.611 0 0 1-6.61-6.611v-66.108a6.611 6.611 0 0 1 13.221 0v66.108a6.611 6.611 0 0 1-6.61 6.61" fill="#5BA02E" data-v-33e867c4></path><path d="M176.147 248.176a6.611 6.611 0 0 1-6.61-6.61v-33.054a6.611 6.611 0 1 1 13.221 0v33.053a6.611 6.611 0 0 1-6.61 6.611" fill="#92C110" data-v-33e867c4></path><path d="M185.994 293.89h-27.376a3.17 3.17 0 0 1-3.17-3.17v-45.887a3.17 3.17 0 0 1 3.17-3.17h27.376a3.17 3.17 0 0 1 3.17 3.17v45.886a3.17 3.17 0 0 1-3.17 3.17" fill="#F2D7AD" data-v-33e867c4></path><path d="M81.972 147.673s6.377-.927 17.566-1.28c11.729-.371 17.57 1.086 17.57 1.086s3.697-3.855.968-8.424c1.278-12.077 5.982-32.827.335-48.273-1.116-1.339-3.743-1.512-7.536-.62-1.337.315-7.147-.149-7.983-.1l-15.311-.347s-3.487-.17-8.035-.508c-1.512-.113-4.227-1.683-5.458-.338-.406.443-2.425 5.669-1.97 16.077l8.635 35.642s-3.141 3.61 1.219 7.085" fill="#FFF" data-v-33e867c4></path><path d="M75.768 73.325l-.9-6.397 11.982-6.52s7.302-.118 8.038 1.205c.737 1.324-5.616.993-5.616.993s-1.836 1.388-2.615 2.5c-1.654 2.363-.986 6.471-8.318 5.986-1.708.284-2.57 2.233-2.57 2.233" fill="#FFC6A0" data-v-33e867c4></path><path d="M52.44 77.672s14.217 9.406 24.973 14.444c1.061.497-2.094 16.183-11.892 11.811-7.436-3.318-20.162-8.44-21.482-14.496-.71-3.258 2.543-7.643 8.401-11.76M141.862 80.113s-6.693 2.999-13.844 6.876c-3.894 2.11-10.137 4.704-12.33 7.988-6.224 9.314 3.536 11.22 12.947 7.503 6.71-2.651 28.999-12.127 13.227-22.367" fill="#FFB594" data-v-33e867c4></path><path d="M76.166 66.36l3.06 3.881s-2.783 2.67-6.31 5.747c-7.103 6.195-12.803 14.296-15.995 16.44-3.966 2.662-9.754 3.314-12.177-.118-3.553-5.032.464-14.628 31.422-25.95" fill="#FFC6A0" data-v-33e867c4></path><path d="M64.674 85.116s-2.34 8.413-8.912 14.447c.652.548 18.586 10.51 22.144 10.056 5.238-.669 6.417-18.968 1.145-20.531-.702-.208-5.901-1.286-8.853-2.167-.87-.26-1.611-1.71-3.545-.936l-1.98-.869zM128.362 85.826s5.318 1.956 7.325 13.734c-.546.274-17.55 12.35-21.829 7.805-6.534-6.94-.766-17.393 4.275-18.61 4.646-1.121 5.03-1.37 10.23-2.929" fill="#FFF" data-v-33e867c4></path><path d="M78.18 94.656s.911 7.41-4.914 13.078" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M87.397 94.68s3.124 2.572 10.263 2.572c7.14 0 9.074-3.437 9.074-3.437" stroke="#E4EBF7" stroke-width=".932" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M117.184 68.639l-6.781-6.177s-5.355-4.314-9.223-.893c-3.867 3.422 4.463 2.083 5.653 4.165 1.19 2.082.848 1.143-2.083.446-5.603-1.331-2.082.893 2.975 5.355 2.091 1.845 6.992.955 6.992.955l2.467-3.851z" fill="#FFC6A0" data-v-33e867c4></path><path d="M105.282 91.315l-.297-10.937-15.918-.027-.53 10.45c-.026.403.17.788.515.999 2.049 1.251 9.387 5.093 15.799.424.287-.21.443-.554.431-.91" fill="#FFB594" data-v-33e867c4></path><path d="M107.573 74.24c.817-1.147.982-9.118 1.015-11.928a1.046 1.046 0 0 0-.965-1.055l-4.62-.365c-7.71-1.044-17.071.624-18.253 6.346-5.482 5.813-.421 13.244-.421 13.244s1.963 3.566 4.305 6.791c.756 1.041.398-3.731 3.04-5.929 5.524-4.594 15.899-7.103 15.899-7.103" fill="#5C2552" data-v-33e867c4></path><path d="M88.426 83.206s2.685 6.202 11.602 6.522c7.82.28 8.973-7.008 7.434-17.505l-.909-5.483c-6.118-2.897-15.478.54-15.478.54s-.576 2.044-.19 5.504c-2.276 2.066-1.824 5.618-1.824 5.618s-.905-1.922-1.98-2.321c-.86-.32-1.897.089-2.322 1.98-1.04 4.632 3.667 5.145 3.667 5.145" fill="#FFC6A0" data-v-33e867c4></path><path stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" d="M100.843 77.099l1.701-.928-1.015-4.324.674-1.406" data-v-33e867c4></path><path d="M105.546 74.092c-.022.713-.452 1.279-.96 1.263-.51-.016-.904-.607-.882-1.32.021-.713.452-1.278.96-1.263.51.016.904.607.882 1.32M97.592 74.349c-.022.713-.452 1.278-.961 1.263-.509-.016-.904-.607-.882-1.32.022-.713.452-1.279.961-1.263.51.016.904.606.882 1.32" fill="#552950" data-v-33e867c4></path><path d="M91.132 86.786s5.269 4.957 12.679 2.327" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M99.776 81.903s-3.592.232-1.44-2.79c1.59-1.496 4.897-.46 4.897-.46s1.156 3.906-3.457 3.25" fill="#DB836E" data-v-33e867c4></path><path d="M102.88 70.6s2.483.84 3.402.715M93.883 71.975s2.492-1.144 4.778-1.073" stroke="#5C2552" stroke-width="1.526" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M86.32 77.374s.961.879 1.458 2.106c-.377.48-1.033 1.152-.236 1.809M99.337 83.719s1.911.151 2.509-.254" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M87.782 115.821l15.73-3.012M100.165 115.821l10.04-2.008" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M66.508 86.763s-1.598 8.83-6.697 14.078" stroke="#E4EBF7" stroke-width="1.114" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M128.31 87.934s3.013 4.121 4.06 11.785" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M64.09 84.816s-6.03 9.912-13.607 9.903" stroke="#DB836E" stroke-width=".795" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M112.366 65.909l-.142 5.32s5.993 4.472 11.945 9.202c4.482 3.562 8.888 7.455 10.985 8.662 4.804 2.766 8.9 3.355 11.076 1.808 4.071-2.894 4.373-9.878-8.136-15.263-4.271-1.838-16.144-6.36-25.728-9.73" fill="#FFC6A0" data-v-33e867c4></path><path d="M130.532 85.488s4.588 5.757 11.619 6.214" stroke="#DB836E" stroke-width=".75" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M121.708 105.73s-.393 8.564-1.34 13.612" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M115.784 161.512s-3.57-1.488-2.678-7.14" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M101.52 290.246s4.326 2.057 7.408 1.03c2.842-.948 4.564.673 7.132 1.186 2.57.514 6.925 1.108 11.772-1.269-.104-5.551-6.939-4.01-12.048-6.763-2.582-1.39-3.812-4.757-3.625-8.863h-9.471s-1.402 10.596-1.169 14.68" fill="#CBD1D1" data-v-33e867c4></path><path d="M101.496 290.073s2.447 1.281 6.809.658c3.081-.44 3.74.485 7.479 1.039 3.739.554 10.802-.07 11.91-.9.415 1.108-.347 2.077-.347 2.077s-1.523.608-4.847.831c-2.045.137-5.843.293-7.663-.507-1.8-1.385-5.286-1.917-5.77-.243-3.947.958-7.41-.288-7.41-.288l-.16-2.667z" fill="#2B0849" data-v-33e867c4></path><path d="M108.824 276.19h3.116s-.103 6.751 4.57 8.62c-4.673.624-8.62-2.32-7.686-8.62" fill="#A4AABA" data-v-33e867c4></path><path d="M57.65 272.52s-2.122 7.47-4.518 12.396c-1.811 3.724-4.255 7.548 5.505 7.548 6.698 0 9.02-.483 7.479-6.648-1.541-6.164.268-13.296.268-13.296H57.65z" fill="#CBD1D1" data-v-33e867c4></path><path d="M51.54 290.04s2.111 1.178 6.682 1.178c6.128 0 8.31-1.662 8.31-1.662s.605 1.122-.624 2.18c-1 .862-3.624 1.603-7.444 1.559-4.177-.049-5.876-.57-6.786-1.177-.831-.554-.692-1.593-.138-2.078" fill="#2B0849" data-v-33e867c4></path><path d="M58.533 274.438s.034 1.529-.315 2.95c-.352 1.431-1.087 3.127-1.139 4.17-.058 1.16 4.57 1.592 5.194.035.623-1.559 1.303-6.475 1.927-7.306.622-.831-4.94-2.135-5.667.15" fill="#A4AABA" data-v-33e867c4></path><path d="M100.885 277.015l13.306.092s1.291-54.228 1.843-64.056c.552-9.828 3.756-43.13.997-62.788l-12.48-.64-22.725.776s-.433 3.944-1.19 9.921c-.062.493-.677.838-.744 1.358-.075.582.42 1.347.318 1.956-2.35 14.003-6.343 32.926-8.697 46.425-.116.663-1.227 1.004-1.45 2.677-.04.3.21 1.516.112 1.785-6.836 18.643-10.89 47.584-14.2 61.551l14.528-.014s2.185-8.524 4.008-16.878c2.796-12.817 22.987-84.553 22.987-84.553l3-.517 1.037 46.1s-.223 1.228.334 2.008c.558.782-.556 1.117-.39 2.233l.39 1.784s-.446 7.14-.892 11.826c-.446 4.685-.092 38.954-.092 38.954" fill="#7BB2F9" data-v-33e867c4></path><path d="M77.438 220.434c1.146.094 4.016-2.008 6.916-4.91M107.55 223.931s2.758-1.103 6.069-3.862" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M108.459 220.905s2.759-1.104 6.07-3.863" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M76.099 223.557s2.608-.587 6.47-3.346M87.33 150.82c-.27 3.088.297 8.478-4.315 9.073M104.829 149.075s.11 13.936-1.286 14.983c-2.207 1.655-2.975 1.934-2.975 1.934M101.014 149.63s.035 12.81-1.19 24.245M94.93 174.965s7.174-1.655 9.38-1.655M75.671 204.754c-.316 1.55-.64 3.067-.973 4.535 0 0-1.45 1.822-1.003 3.756.446 1.934-.943 2.034-4.96 15.273-1.686 5.559-4.464 18.49-6.313 27.447-.078.38-4.018 18.06-4.093 18.423M77.043 196.743a313.269 313.269 0 0 1-.877 4.729M83.908 151.414l-1.19 10.413s-1.091.148-.496 2.23c.111 1.34-2.66 15.692-5.153 30.267M57.58 272.94h13.238" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M117.377 147.423s-16.955-3.087-35.7.199c.157 2.501-.002 4.128-.002 4.128s14.607-2.802 35.476-.31c.251-2.342.226-4.017.226-4.017" fill="#192064" data-v-33e867c4></path><path d="M107.511 150.353l.004-4.885a.807.807 0 0 0-.774-.81c-2.428-.092-5.04-.108-7.795-.014a.814.814 0 0 0-.784.81l-.003 4.88c0 .456.371.82.827.808a140.76 140.76 0 0 1 7.688.017.81.81 0 0 0 .837-.806" fill="#FFF" data-v-33e867c4></path><path d="M106.402 149.426l.002-3.06a.64.64 0 0 0-.616-.643 94.135 94.135 0 0 0-5.834-.009.647.647 0 0 0-.626.643l-.001 3.056c0 .36.291.648.651.64 1.78-.04 3.708-.041 5.762.012.36.009.662-.279.662-.64" fill="#192064" data-v-33e867c4></path><path d="M101.485 273.933h12.272M102.652 269.075c.006 3.368.04 5.759.11 6.47M102.667 263.125c-.009 1.53-.015 2.98-.016 4.313M102.204 174.024l.893 44.402s.669 1.561-.224 2.677c-.892 1.116 2.455.67.893 2.231-1.562 1.562.893 1.116 0 3.347-.592 1.48-.988 20.987-1.09 34.956" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path></g>', 1)];
var cn2 = { key: 5, class: "u-image", width: "252", height: "294" };
var rn2 = [createStaticVNode('<defs data-v-33e867c4><path d="M0 .387h251.772v251.772H0z" data-v-33e867c4></path></defs><g fill="none" fill-rule="evenodd" data-v-33e867c4><g transform="translate(0 .012)" data-v-33e867c4><mask fill="#fff" data-v-33e867c4></mask><path d="M0 127.32v-2.095C0 56.279 55.892.387 124.838.387h2.096c68.946 0 124.838 55.892 124.838 124.838v2.096c0 68.946-55.892 124.838-124.838 124.838h-2.096C55.892 252.16 0 196.267 0 127.321" fill="#E4EBF7" mask="url(#b)" data-v-33e867c4></path></g><path d="M39.755 130.84a8.276 8.276 0 1 1-16.468-1.66 8.276 8.276 0 0 1 16.468 1.66" fill="#FFF" data-v-33e867c4></path><path d="M36.975 134.297l10.482 5.943M48.373 146.508l-12.648 10.788" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path d="M39.875 159.352a5.667 5.667 0 1 1-11.277-1.136 5.667 5.667 0 0 1 11.277 1.136M57.588 143.247a5.708 5.708 0 1 1-11.358-1.145 5.708 5.708 0 0 1 11.358 1.145M99.018 26.875l29.82-.014a4.587 4.587 0 1 0-.003-9.175l-29.82.013a4.587 4.587 0 1 0 .003 9.176M110.424 45.211l29.82-.013a4.588 4.588 0 0 0-.004-9.175l-29.82.013a4.587 4.587 0 1 0 .004 9.175" fill="#FFF" data-v-33e867c4></path><path d="M112.798 26.861v-.002l15.784-.006a4.588 4.588 0 1 0 .003 9.175l-15.783.007v-.002a4.586 4.586 0 0 0-.004-9.172M184.523 135.668c-.553 5.485-5.447 9.483-10.931 8.93-5.485-.553-9.483-5.448-8.93-10.932.552-5.485 5.447-9.483 10.932-8.93 5.485.553 9.483 5.447 8.93 10.932" fill="#FFF" data-v-33e867c4></path><path d="M179.26 141.75l12.64 7.167M193.006 156.477l-15.255 13.011" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path d="M184.668 170.057a6.835 6.835 0 1 1-13.6-1.372 6.835 6.835 0 0 1 13.6 1.372M203.34 153.325a6.885 6.885 0 1 1-13.7-1.382 6.885 6.885 0 0 1 13.7 1.382" fill="#FFF" data-v-33e867c4></path><path d="M151.931 192.324a2.222 2.222 0 1 1-4.444 0 2.222 2.222 0 0 1 4.444 0zM225.27 116.056a2.222 2.222 0 1 1-4.445 0 2.222 2.222 0 0 1 4.444 0zM216.38 151.08a2.223 2.223 0 1 1-4.446-.001 2.223 2.223 0 0 1 4.446 0zM176.917 107.636a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM195.291 92.165a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM202.058 180.711a2.223 2.223 0 1 1-4.446 0 2.223 2.223 0 0 1 4.446 0z" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path stroke="#FFF" stroke-width="2" d="M214.404 153.302l-1.912 20.184-10.928 5.99M173.661 174.792l-6.356 9.814h-11.36l-4.508 6.484M174.941 125.168v-15.804M220.824 117.25l-12.84 7.901-15.31-7.902V94.39" data-v-33e867c4></path><path d="M166.588 65.936h-3.951a4.756 4.756 0 0 1-4.743-4.742 4.756 4.756 0 0 1 4.743-4.743h3.951a4.756 4.756 0 0 1 4.743 4.743 4.756 4.756 0 0 1-4.743 4.742" fill="#FFF" data-v-33e867c4></path><path d="M174.823 30.03c0-16.281 13.198-29.48 29.48-29.48 16.28 0 29.48 13.199 29.48 29.48 0 16.28-13.2 29.48-29.48 29.48-16.282 0-29.48-13.2-29.48-29.48" fill="#1890FF" data-v-33e867c4></path><path d="M205.952 38.387c.5.5.785 1.142.785 1.928s-.286 1.465-.785 1.964c-.572.5-1.214.75-2 .75-.785 0-1.429-.285-1.929-.785-.572-.5-.82-1.143-.82-1.929s.248-1.428.82-1.928c.5-.5 1.144-.75 1.93-.75.785 0 1.462.25 1.999.75m4.285-19.463c1.428 1.249 2.143 2.963 2.143 5.142 0 1.712-.427 3.13-1.219 4.25-.067.096-.137.18-.218.265-.416.429-1.41 1.346-2.956 2.699a5.07 5.07 0 0 0-1.428 1.75 5.207 5.207 0 0 0-.536 2.357v.5h-4.107v-.5c0-1.357.215-2.536.714-3.5.464-.964 1.857-2.464 4.178-4.536l.43-.5c.643-.785.964-1.643.964-2.535 0-1.18-.358-2.108-1-2.785-.678-.68-1.643-1.001-2.858-1.001-1.536 0-2.642.464-3.357 1.43-.37.5-.621 1.135-.76 1.904a1.999 1.999 0 0 1-1.971 1.63h-.004c-1.277 0-2.257-1.183-1.98-2.43.337-1.518 1.02-2.78 2.073-3.784 1.536-1.5 3.607-2.25 6.25-2.25 2.32 0 4.214.607 5.642 1.894" fill="#FFF" data-v-33e867c4></path><path d="M52.04 76.131s21.81 5.36 27.307 15.945c5.575 10.74-6.352 9.26-15.73 4.935-10.86-5.008-24.7-11.822-11.577-20.88" fill="#FFB594" data-v-33e867c4></path><path d="M90.483 67.504l-.449 2.893c-.753.49-4.748-2.663-4.748-2.663l-1.645.748-1.346-5.684s6.815-4.589 8.917-5.018c2.452-.501 9.884.94 10.7 2.278 0 0 1.32.486-2.227.69-3.548.203-5.043.447-6.79 3.132-1.747 2.686-2.412 3.624-2.412 3.624" fill="#FFC6A0" data-v-33e867c4></path><path d="M128.055 111.367c-2.627-7.724-6.15-13.18-8.917-15.478-3.5-2.906-9.34-2.225-11.366-4.187-1.27-1.231-3.215-1.197-3.215-1.197s-14.98-3.158-16.828-3.479c-2.37-.41-2.124-.714-6.054-1.405-1.57-1.907-2.917-1.122-2.917-1.122l-7.11-1.383c-.853-1.472-2.423-1.023-2.423-1.023l-2.468-.897c-1.645 9.976-7.74 13.796-7.74 13.796 1.795 1.122 15.703 8.3 15.703 8.3l5.107 37.11s-3.321 5.694 1.346 9.109c0 0 19.883-3.743 34.921-.329 0 0 3.047-2.546.972-8.806.523-3.01 1.394-8.263 1.736-11.622.385.772 2.019 1.918 3.14 3.477 0 0 9.407-7.365 11.052-14.012-.832-.723-1.598-1.585-2.267-2.453-.567-.736-.358-2.056-.765-2.717-.669-1.084-1.804-1.378-1.907-1.682" fill="#FFF" data-v-33e867c4></path><path d="M101.09 289.998s4.295 2.041 7.354 1.021c2.821-.94 4.53.668 7.08 1.178 2.55.51 6.874 1.1 11.686-1.26-.103-5.51-6.889-3.98-11.96-6.713-2.563-1.38-3.784-4.722-3.598-8.799h-9.402s-1.392 10.52-1.16 14.573" fill="#CBD1D1" data-v-33e867c4></path><path d="M101.067 289.826s2.428 1.271 6.759.653c3.058-.437 3.712.481 7.423 1.031 3.712.55 10.724-.069 11.823-.894.413 1.1-.343 2.063-.343 2.063s-1.512.603-4.812.824c-2.03.136-5.8.291-7.607-.503-1.787-1.375-5.247-1.903-5.728-.241-3.918.95-7.355-.286-7.355-.286l-.16-2.647z" fill="#2B0849" data-v-33e867c4></path><path d="M108.341 276.044h3.094s-.103 6.702 4.536 8.558c-4.64.618-8.558-2.303-7.63-8.558" fill="#A4AABA" data-v-33e867c4></path><path d="M57.542 272.401s-2.107 7.416-4.485 12.306c-1.798 3.695-4.225 7.492 5.465 7.492 6.648 0 8.953-.48 7.423-6.599-1.53-6.12.266-13.199.266-13.199h-8.669z" fill="#CBD1D1" data-v-33e867c4></path><path d="M51.476 289.793s2.097 1.169 6.633 1.169c6.083 0 8.249-1.65 8.249-1.65s.602 1.114-.619 2.165c-.993.855-3.597 1.591-7.39 1.546-4.145-.048-5.832-.566-6.736-1.168-.825-.55-.687-1.58-.137-2.062" fill="#2B0849" data-v-33e867c4></path><path d="M58.419 274.304s.033 1.519-.314 2.93c-.349 1.42-1.078 3.104-1.13 4.139-.058 1.151 4.537 1.58 5.155.034.62-1.547 1.294-6.427 1.913-7.252.619-.825-4.903-2.119-5.624.15" fill="#A4AABA" data-v-33e867c4></path><path d="M99.66 278.514l13.378.092s1.298-54.52 1.853-64.403c.554-9.882 3.776-43.364 1.002-63.128l-12.547-.644-22.849.78s-.434 3.966-1.195 9.976c-.063.496-.682.843-.749 1.365-.075.585.423 1.354.32 1.966-2.364 14.08-6.377 33.104-8.744 46.677-.116.666-1.234 1.009-1.458 2.691-.04.302.211 1.525.112 1.795-6.873 18.744-10.949 47.842-14.277 61.885l14.607-.014s2.197-8.57 4.03-16.97c2.811-12.886 23.111-85.01 23.111-85.01l3.016-.521 1.043 46.35s-.224 1.234.337 2.02c.56.785-.56 1.123-.392 2.244l.392 1.794s-.449 7.178-.898 11.89c-.448 4.71-.092 39.165-.092 39.165" fill="#7BB2F9" data-v-33e867c4></path><path d="M76.085 221.626c1.153.094 4.038-2.019 6.955-4.935M106.36 225.142s2.774-1.11 6.103-3.883" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M107.275 222.1s2.773-1.11 6.102-3.884" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M74.74 224.767s2.622-.591 6.505-3.365M86.03 151.634c-.27 3.106.3 8.525-4.336 9.123M103.625 149.88s.11 14.012-1.293 15.065c-2.219 1.664-2.99 1.944-2.99 1.944M99.79 150.438s.035 12.88-1.196 24.377M93.673 175.911s7.212-1.664 9.431-1.664M74.31 205.861a212.013 212.013 0 0 1-.979 4.56s-1.458 1.832-1.009 3.776c.449 1.944-.947 2.045-4.985 15.355-1.696 5.59-4.49 18.591-6.348 27.597l-.231 1.12M75.689 197.807a320.934 320.934 0 0 1-.882 4.754M82.591 152.233L81.395 162.7s-1.097.15-.5 2.244c.113 1.346-2.674 15.775-5.18 30.43M56.12 274.418h13.31" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M116.241 148.22s-17.047-3.104-35.893.2c.158 2.514-.003 4.15-.003 4.15s14.687-2.818 35.67-.312c.252-2.355.226-4.038.226-4.038" fill="#192064" data-v-33e867c4></path><path d="M106.322 151.165l.003-4.911a.81.81 0 0 0-.778-.815c-2.44-.091-5.066-.108-7.836-.014a.818.818 0 0 0-.789.815l-.003 4.906a.81.81 0 0 0 .831.813c2.385-.06 4.973-.064 7.73.017a.815.815 0 0 0 .842-.81" fill="#FFF" data-v-33e867c4></path><path d="M105.207 150.233l.002-3.076a.642.642 0 0 0-.619-.646 94.321 94.321 0 0 0-5.866-.01.65.65 0 0 0-.63.647v3.072a.64.64 0 0 0 .654.644 121.12 121.12 0 0 1 5.794.011c.362.01.665-.28.665-.642" fill="#192064" data-v-33e867c4></path><path d="M100.263 275.415h12.338M101.436 270.53c.006 3.387.042 5.79.111 6.506M101.451 264.548a915.75 915.75 0 0 0-.015 4.337M100.986 174.965l.898 44.642s.673 1.57-.225 2.692c-.897 1.122 2.468.673.898 2.243-1.57 1.57.897 1.122 0 3.365-.596 1.489-.994 21.1-1.096 35.146" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M46.876 83.427s-.516 6.045 7.223 5.552c11.2-.712 9.218-9.345 31.54-21.655-.786-2.708-2.447-4.744-2.447-4.744s-11.068 3.11-22.584 8.046c-6.766 2.9-13.395 6.352-13.732 12.801M104.46 91.057l.941-5.372-8.884-11.43-5.037 5.372-1.74 7.834a.321.321 0 0 0 .108.32c.965.8 6.5 5.013 14.347 3.544a.332.332 0 0 0 .264-.268" fill="#FFC6A0" data-v-33e867c4></path><path d="M93.942 79.387s-4.533-2.853-2.432-6.855c1.623-3.09 4.513 1.133 4.513 1.133s.52-3.642 3.121-3.642c.52-1.04 1.561-4.162 1.561-4.162s11.445 2.601 13.526 3.121c0 5.203-2.304 19.424-7.84 19.861-8.892.703-12.449-9.456-12.449-9.456" fill="#FFC6A0" data-v-33e867c4></path><path d="M113.874 73.446c2.601-2.081 3.47-9.722 3.47-9.722s-2.479-.49-6.64-2.05c-4.683-2.081-12.798-4.747-17.48.976-9.668 3.223-2.05 19.823-2.05 19.823l2.713-3.021s-3.935-3.287-2.08-6.243c2.17-3.462 3.92 1.073 3.92 1.073s.637-2.387 3.581-3.342c.355-.71 1.036-2.674 1.432-3.85a1.073 1.073 0 0 1 1.263-.704c2.4.558 8.677 2.019 11.356 2.662.522.125.871.615.82 1.15l-.305 3.248z" fill="#520038" data-v-33e867c4></path><path d="M104.977 76.064c-.103.61-.582 1.038-1.07.956-.489-.083-.801-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.644.698 1.254M112.132 77.694c-.103.61-.582 1.038-1.07.956-.488-.083-.8-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.643.698 1.254" fill="#552950" data-v-33e867c4></path><path stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" d="M110.13 74.84l-.896 1.61-.298 4.357h-2.228" data-v-33e867c4></path><path d="M110.846 74.481s1.79-.716 2.506.537" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M92.386 74.282s.477-1.114 1.113-.716c.637.398 1.274 1.433.558 1.99-.717.556.159 1.67.159 1.67" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M103.287 72.93s1.83 1.113 4.137.954" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M103.685 81.762s2.227 1.193 4.376 1.193M104.64 84.308s.954.398 1.511.318M94.693 81.205s2.308 7.4 10.424 7.639" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M81.45 89.384s.45 5.647-4.935 12.787M69 82.654s-.726 9.282-8.204 14.206" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M129.405 122.865s-5.272 7.403-9.422 10.768" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M119.306 107.329s.452 4.366-2.127 32.062" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M150.028 151.232h-49.837a1.01 1.01 0 0 1-1.01-1.01v-31.688c0-.557.452-1.01 1.01-1.01h49.837c.558 0 1.01.453 1.01 1.01v31.688a1.01 1.01 0 0 1-1.01 1.01" fill="#F2D7AD" data-v-33e867c4></path><path d="M150.29 151.232h-19.863v-33.707h20.784v32.786a.92.92 0 0 1-.92.92" fill="#F4D19D" data-v-33e867c4></path><path d="M123.554 127.896H92.917a.518.518 0 0 1-.425-.816l6.38-9.113c.193-.277.51-.442.85-.442h31.092l-7.26 10.371z" fill="#F2D7AD" data-v-33e867c4></path><path fill="#CC9B6E" d="M123.689 128.447H99.25v-.519h24.169l7.183-10.26.424.298z" data-v-33e867c4></path><path d="M158.298 127.896h-18.669a2.073 2.073 0 0 1-1.659-.83l-7.156-9.541h19.965c.49 0 .95.23 1.244.622l6.69 8.92a.519.519 0 0 1-.415.83" fill="#F4D19D" data-v-33e867c4></path><path fill="#CC9B6E" d="M157.847 128.479h-19.384l-7.857-10.475.415-.31 7.7 10.266h19.126zM130.554 150.685l-.032-8.177.519-.002.032 8.177z" data-v-33e867c4></path><path fill="#CC9B6E" d="M130.511 139.783l-.08-21.414.519-.002.08 21.414zM111.876 140.932l-.498-.143 1.479-5.167.498.143zM108.437 141.06l-2.679-2.935 2.665-3.434.41.318-2.397 3.089 2.384 2.612zM116.607 141.06l-.383-.35 2.383-2.612-2.397-3.089.41-.318 2.665 3.434z" data-v-33e867c4></path><path d="M154.316 131.892l-3.114-1.96.038 3.514-1.043.092c-1.682.115-3.634.23-4.789.23-1.902 0-2.693 2.258 2.23 2.648l-2.645-.596s-2.168 1.317.504 2.3c0 0-1.58 1.217.561 2.58-.584 3.504 5.247 4.058 7.122 3.59 1.876-.47 4.233-2.359 4.487-5.16.28-3.085-.89-5.432-3.35-7.238" fill="#FFC6A0" data-v-33e867c4></path><path d="M153.686 133.577s-6.522.47-8.36.372c-1.836-.098-1.904 2.19 2.359 2.264 3.739.15 5.451-.044 5.451-.044" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M145.16 135.877c-1.85 1.346.561 2.355.561 2.355s3.478.898 6.73.617" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M151.89 141.71s-6.28.111-6.73-2.132c-.223-1.346.45-1.402.45-1.402M146.114 140.868s-1.103 3.16 5.44 3.533M151.202 129.932v3.477M52.838 89.286c3.533-.337 8.423-1.248 13.582-7.754" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M168.567 248.318a6.647 6.647 0 0 1-6.647-6.647v-66.466a6.647 6.647 0 1 1 13.294 0v66.466a6.647 6.647 0 0 1-6.647 6.647" fill="#5BA02E" data-v-33e867c4></path><path d="M176.543 247.653a6.647 6.647 0 0 1-6.646-6.647v-33.232a6.647 6.647 0 1 1 13.293 0v33.232a6.647 6.647 0 0 1-6.647 6.647" fill="#92C110" data-v-33e867c4></path><path d="M186.443 293.613H158.92a3.187 3.187 0 0 1-3.187-3.187v-46.134a3.187 3.187 0 0 1 3.187-3.187h27.524a3.187 3.187 0 0 1 3.187 3.187v46.134a3.187 3.187 0 0 1-3.187 3.187" fill="#F2D7AD" data-v-33e867c4></path><path d="M88.979 89.48s7.776 5.384 16.6 2.842" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path></g>', 2)];
var dn2 = { key: 6, class: "u-image", width: "254", height: "294" };
var vn2 = [createStaticVNode('<defs data-v-33e867c4><path d="M0 .335h253.49v253.49H0z" data-v-33e867c4></path><path d="M0 293.665h253.49V.401H0z" data-v-33e867c4></path></defs><g fill="none" fill-rule="evenodd" data-v-33e867c4><g transform="translate(0 .067)" data-v-33e867c4><mask fill="#fff" data-v-33e867c4></mask><path d="M0 128.134v-2.11C0 56.608 56.273.334 125.69.334h2.11c69.416 0 125.69 56.274 125.69 125.69v2.11c0 69.417-56.274 125.69-125.69 125.69h-2.11C56.273 253.824 0 197.551 0 128.134" fill="#E4EBF7" mask="url(#b)" data-v-33e867c4></path></g><path d="M39.989 132.108a8.332 8.332 0 1 1-16.581-1.671 8.332 8.332 0 0 1 16.58 1.671" fill="#FFF" data-v-33e867c4></path><path d="M37.19 135.59l10.553 5.983M48.665 147.884l-12.734 10.861" stroke="#FFF" stroke-width="2" data-v-33e867c4></path><path d="M40.11 160.816a5.706 5.706 0 1 1-11.354-1.145 5.706 5.706 0 0 1 11.354 1.145M57.943 144.6a5.747 5.747 0 1 1-11.436-1.152 5.747 5.747 0 0 1 11.436 1.153M99.656 27.434l30.024-.013a4.619 4.619 0 1 0-.004-9.238l-30.024.013a4.62 4.62 0 0 0 .004 9.238M111.14 45.896l30.023-.013a4.62 4.62 0 1 0-.004-9.238l-30.024.013a4.619 4.619 0 1 0 .004 9.238" fill="#FFF" data-v-33e867c4></path><path d="M113.53 27.421v-.002l15.89-.007a4.619 4.619 0 1 0 .005 9.238l-15.892.007v-.002a4.618 4.618 0 0 0-.004-9.234M150.167 70.091h-3.979a4.789 4.789 0 0 1-4.774-4.775 4.788 4.788 0 0 1 4.774-4.774h3.979a4.789 4.789 0 0 1 4.775 4.774 4.789 4.789 0 0 1-4.775 4.775" fill="#FFF" data-v-33e867c4></path><path d="M171.687 30.234c0-16.392 13.289-29.68 29.681-29.68 16.392 0 29.68 13.288 29.68 29.68 0 16.393-13.288 29.681-29.68 29.681s-29.68-13.288-29.68-29.68" fill="#FF603B" data-v-33e867c4></path><path d="M203.557 19.435l-.676 15.035a1.514 1.514 0 0 1-3.026 0l-.675-15.035a2.19 2.19 0 1 1 4.377 0m-.264 19.378c.513.477.77 1.1.77 1.87s-.257 1.393-.77 1.907c-.55.476-1.21.733-1.943.733a2.545 2.545 0 0 1-1.87-.77c-.55-.514-.806-1.136-.806-1.87 0-.77.256-1.393.806-1.87.513-.513 1.137-.733 1.87-.733.77 0 1.43.22 1.943.733" fill="#FFF" data-v-33e867c4></path><path d="M119.3 133.275c4.426-.598 3.612-1.204 4.079-4.778.675-5.18-3.108-16.935-8.262-25.118-1.088-10.72-12.598-11.24-12.598-11.24s4.312 4.895 4.196 16.199c1.398 5.243.804 14.45.804 14.45s5.255 11.369 11.78 10.487" fill="#FFB594" data-v-33e867c4></path><path d="M100.944 91.61s1.463-.583 3.211.582c8.08 1.398 10.368 6.706 11.3 11.368 1.864 1.282 1.864 2.33 1.864 3.496.365.777 1.515 3.03 1.515 3.03s-7.225 1.748-10.954 6.758c-1.399-6.41-6.936-25.235-6.936-25.235" fill="#FFF" data-v-33e867c4></path><path d="M94.008 90.5l1.019-5.815-9.23-11.874-5.233 5.581-2.593 9.863s8.39 5.128 16.037 2.246" fill="#FFB594" data-v-33e867c4></path><path d="M82.931 78.216s-4.557-2.868-2.445-6.892c1.632-3.107 4.537 1.139 4.537 1.139s.524-3.662 3.139-3.662c.523-1.046 1.569-4.184 1.569-4.184s11.507 2.615 13.6 3.138c-.001 5.23-2.317 19.529-7.884 19.969-8.94.706-12.516-9.508-12.516-9.508" fill="#FFC6A0" data-v-33e867c4></path><path d="M102.971 72.243c2.616-2.093 3.489-9.775 3.489-9.775s-2.492-.492-6.676-2.062c-4.708-2.092-12.867-4.771-17.575.982-9.54 4.41-2.062 19.93-2.062 19.93l2.729-3.037s-3.956-3.304-2.092-6.277c2.183-3.48 3.943 1.08 3.943 1.08s.64-2.4 3.6-3.36c.356-.714 1.04-2.69 1.44-3.872a1.08 1.08 0 0 1 1.27-.707c2.41.56 8.723 2.03 11.417 2.676.524.126.876.619.825 1.156l-.308 3.266z" fill="#520038" data-v-33e867c4></path><path d="M101.22 76.514c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.961.491.083.805.647.702 1.26M94.26 75.074c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.96.491.082.805.646.702 1.26" fill="#552950" data-v-33e867c4></path><path stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" d="M99.206 73.644l-.9 1.62-.3 4.38h-2.24" data-v-33e867c4></path><path d="M99.926 73.284s1.8-.72 2.52.54" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M81.367 73.084s.48-1.12 1.12-.72c.64.4 1.28 1.44.56 2s.16 1.68.16 1.68" stroke="#DB836E" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M92.326 71.724s1.84 1.12 4.16.96" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M92.726 80.604s2.24 1.2 4.4 1.2M93.686 83.164s.96.4 1.52.32M83.687 80.044s1.786 6.547 9.262 7.954" stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M95.548 91.663s-1.068 2.821-8.298 2.105c-7.23-.717-10.29-5.044-10.29-5.044" stroke="#E4EBF7" stroke-width="1.136" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M78.126 87.478s6.526 4.972 16.47 2.486c0 0 9.577 1.02 11.536 5.322 5.36 11.77.543 36.835 0 39.962 3.496 4.055-.466 8.483-.466 8.483-15.624-3.548-35.81-.6-35.81-.6-4.849-3.546-1.223-9.044-1.223-9.044L62.38 110.32c-2.485-15.227.833-19.803 3.549-20.743 3.03-1.049 8.04-1.282 8.04-1.282.496-.058 1.08-.076 1.37-.233 2.36-1.282 2.787-.583 2.787-.583" fill="#FFF" data-v-33e867c4></path><path d="M65.828 89.81s-6.875.465-7.59 8.156c-.466 8.857 3.03 10.954 3.03 10.954s6.075 22.102 16.796 22.957c8.39-2.176 4.758-6.702 4.661-11.42-.233-11.304-7.108-16.897-7.108-16.897s-4.212-13.75-9.789-13.75" fill="#FFC6A0" data-v-33e867c4></path><path d="M71.716 124.225s.855 11.264 9.828 6.486c4.765-2.536 7.581-13.828 9.789-22.568 1.456-5.768 2.58-12.197 2.58-12.197l-4.973-1.709s-2.408 5.516-7.769 12.275c-4.335 5.467-9.144 11.11-9.455 17.713" fill="#FFC6A0" data-v-33e867c4></path><path d="M108.463 105.191s1.747 2.724-2.331 30.535c2.376 2.216 1.053 6.012-.233 7.51" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M123.262 131.527s-.427 2.732-11.77 1.981c-15.187-1.006-25.326-3.25-25.326-3.25l.933-5.8s.723.215 9.71-.068c11.887-.373 18.714-6.07 24.964-1.022 4.039 3.263 1.489 8.16 1.489 8.16" fill="#FFC6A0" data-v-33e867c4></path><path d="M70.24 90.974s-5.593-4.739-11.054 2.68c-3.318 7.223.517 15.284 2.664 19.578-.31 3.729 2.33 4.311 2.33 4.311s.108.895 1.516 2.68c4.078-7.03 6.72-9.166 13.711-12.546-.328-.656-1.877-3.265-1.825-3.767.175-1.69-1.282-2.623-1.282-2.623s-.286-.156-1.165-2.738c-.788-2.313-2.036-5.177-4.895-7.575" fill="#FFF" data-v-33e867c4></path><path d="M90.232 288.027s4.855 2.308 8.313 1.155c3.188-1.063 5.12.755 8.002 1.331 2.881.577 7.769 1.243 13.207-1.424-.117-6.228-7.786-4.499-13.518-7.588-2.895-1.56-4.276-5.336-4.066-9.944H91.544s-1.573 11.89-1.312 16.47" fill="#CBD1D1" data-v-33e867c4></path><path d="M90.207 287.833s2.745 1.437 7.639.738c3.456-.494 3.223.66 7.418 1.282 4.195.621 13.092-.194 14.334-1.126.466 1.242-.388 2.33-.388 2.33s-1.709.682-5.438.932c-2.295.154-8.098.276-10.14-.621-2.02-1.554-4.894-1.515-6.06-.234-4.427 1.075-7.184-.31-7.184-.31l-.181-2.991z" fill="#2B0849" data-v-33e867c4></path><path d="M98.429 272.257h3.496s-.117 7.574 5.127 9.671c-5.244.7-9.672-2.602-8.623-9.671" fill="#A4AABA" data-v-33e867c4></path><path d="M44.425 272.046s-2.208 7.774-4.702 12.899c-1.884 3.874-4.428 7.854 5.729 7.854 6.97 0 9.385-.503 7.782-6.917-1.604-6.415.279-13.836.279-13.836h-9.088z" fill="#CBD1D1" data-v-33e867c4></path><path d="M38.066 290.277s2.198 1.225 6.954 1.225c6.376 0 8.646-1.73 8.646-1.73s.63 1.168-.649 2.27c-1.04.897-3.77 1.668-7.745 1.621-4.347-.05-6.115-.593-7.062-1.224-.864-.577-.72-1.657-.144-2.162" fill="#2B0849" data-v-33e867c4></path><path d="M45.344 274.041s.035 1.592-.329 3.07c-.365 1.49-1.13 3.255-1.184 4.34-.061 1.206 4.755 1.657 5.403.036.65-1.622 1.357-6.737 2.006-7.602.648-.865-5.14-2.222-5.896.156" fill="#A4AABA" data-v-33e867c4></path><path d="M89.476 277.57l13.899.095s1.349-56.643 1.925-66.909c.576-10.267 3.923-45.052 1.042-65.585l-13.037-.669-23.737.81s-.452 4.12-1.243 10.365c-.065.515-.708.874-.777 1.417-.078.608.439 1.407.332 2.044-2.455 14.627-5.797 32.736-8.256 46.837-.121.693-1.282 1.048-1.515 2.796-.042.314.22 1.584.116 1.865-7.14 19.473-12.202 52.601-15.66 67.19l15.176-.015s2.282-10.145 4.185-18.871c2.922-13.389 24.012-88.32 24.012-88.32l3.133-.954-.158 48.568s-.233 1.282.35 2.098c.583.815-.581 1.167-.408 2.331l.408 1.864s-.466 7.458-.932 12.352c-.467 4.895 1.145 40.69 1.145 40.69" fill="#7BB2F9" data-v-33e867c4></path><path d="M64.57 218.881c1.197.099 4.195-2.097 7.225-5.127M96.024 222.534s2.881-1.152 6.34-4.034" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M96.973 219.373s2.882-1.153 6.34-4.034" stroke="#648BD8" stroke-width="1.032" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M63.172 222.144s2.724-.614 6.759-3.496M74.903 146.166c-.281 3.226.31 8.856-4.506 9.478M93.182 144.344s.115 14.557-1.344 15.65c-2.305 1.73-3.107 2.02-3.107 2.02M89.197 144.923s.269 13.144-1.01 25.088M83.525 170.71s6.81-1.051 9.116-1.051M46.026 270.045l-.892 4.538M46.937 263.289l-.815 4.157M62.725 202.503c-.33 1.618-.102 1.904-.449 3.438 0 0-2.756 1.903-2.29 3.923.466 2.02-.31 3.424-4.505 17.252-1.762 5.807-4.233 18.922-6.165 28.278-.03.144-.521 2.646-1.14 5.8M64.158 194.136c-.295 1.658-.6 3.31-.917 4.938M71.33 146.787l-1.244 10.877s-1.14.155-.519 2.33c.117 1.399-2.778 16.39-5.382 31.615M44.242 273.727H58.07" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M106.18 142.117c-3.028-.489-18.825-2.744-36.219.2a.625.625 0 0 0-.518.644c.063 1.307.044 2.343.015 2.995a.617.617 0 0 0 .716.636c3.303-.534 17.037-2.412 35.664-.266.347.04.66-.214.692-.56.124-1.347.16-2.425.17-3.029a.616.616 0 0 0-.52-.62" fill="#192064" data-v-33e867c4></path><path d="M96.398 145.264l.003-5.102a.843.843 0 0 0-.809-.847 114.104 114.104 0 0 0-8.141-.014.85.85 0 0 0-.82.847l-.003 5.097c0 .476.388.857.864.845 2.478-.064 5.166-.067 8.03.017a.848.848 0 0 0 .876-.843" fill="#FFF" data-v-33e867c4></path><path d="M95.239 144.296l.002-3.195a.667.667 0 0 0-.643-.672c-1.9-.061-3.941-.073-6.094-.01a.675.675 0 0 0-.654.672l-.002 3.192c0 .376.305.677.68.669 1.859-.042 3.874-.043 6.02.012.376.01.69-.291.691-.668" fill="#192064" data-v-33e867c4></path><path d="M90.102 273.522h12.819M91.216 269.761c.006 3.519-.072 5.55 0 6.292M90.923 263.474c-.009 1.599-.016 2.558-.016 4.505M90.44 170.404l.932 46.38s.7 1.631-.233 2.796c-.932 1.166 2.564.7.932 2.33-1.63 1.633.933 1.166 0 3.497-.618 1.546-1.031 21.921-1.138 36.513" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M73.736 98.665l2.214 4.312s2.098.816 1.865 2.68l.816 2.214M64.297 116.611c.233-.932 2.176-7.147 12.585-10.488M77.598 90.042s7.691 6.137 16.547 2.72" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M91.974 86.954s5.476-.816 7.574-4.545c1.297-.345.72 2.212-.33 3.671-.7.971-1.01 1.554-1.01 1.554s.194.31.155.816c-.053.697-.175.653-.272 1.048-.081.335.108.657 0 1.049-.046.17-.198.5-.382.878-.12.249-.072.687-.2.948-.231.469-1.562 1.87-2.622 2.855-3.826 3.554-5.018 1.644-6.001-.408-.894-1.865-.661-5.127-.874-6.875-.35-2.914-2.622-3.03-1.923-4.429.343-.685 2.87.69 3.263 1.748.757 2.04 2.952 1.807 2.622 1.69" fill="#FFC6A0" data-v-33e867c4></path><path d="M99.8 82.429c-.465.077-.35.272-.97 1.243-.622.971-4.817 2.932-6.39 3.224-2.589.48-2.278-1.56-4.254-2.855-1.69-1.107-3.562-.638-1.398 1.398.99.932.932 1.107 1.398 3.205.335 1.506-.64 3.67.7 5.593" stroke="#DB836E" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M79.543 108.673c-2.1 2.926-4.266 6.175-5.557 8.762" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M87.72 124.768s-2.098-1.942-5.127-2.719c-3.03-.777-3.574-.155-5.516.078-1.942.233-3.885-.932-3.652.7.233 1.63 5.05 1.01 5.206 2.097.155 1.087-6.37 2.796-8.313 2.175-.777.777.466 1.864 2.02 2.175.233 1.554 2.253 1.554 2.253 1.554s.699 1.01 2.641 1.088c2.486 1.32 8.934-.7 10.954-1.554 2.02-.855-.466-5.594-.466-5.594" fill="#FFC6A0" data-v-33e867c4></path><path d="M73.425 122.826s.66 1.127 3.167 1.418c2.315.27 2.563.583 2.563.583s-2.545 2.894-9.07 2.272M72.416 129.274s3.826.097 4.933-.718M74.98 130.75s1.961.136 3.36-.505M77.232 131.916s1.748.019 2.914-.505M73.328 122.321s-.595-1.032 1.262-.427c1.671.544 2.833.055 5.128.155 1.389.061 3.067-.297 3.982.15 1.606.784 3.632 2.181 3.632 2.181s10.526 1.204 19.033-1.127M78.864 108.104s-8.39 2.758-13.168 12.12" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M109.278 112.533s3.38-3.613 7.575-4.662" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M107.375 123.006s9.697-2.745 11.445-.88" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M194.605 83.656l3.971-3.886M187.166 90.933l3.736-3.655M191.752 84.207l-4.462-4.56M198.453 91.057l-4.133-4.225M129.256 163.074l3.718-3.718M122.291 170.039l3.498-3.498M126.561 163.626l-4.27-4.27M132.975 170.039l-3.955-3.955" stroke="#BFCDDD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-33e867c4></path><path d="M190.156 211.779h-1.604a4.023 4.023 0 0 1-4.011-4.011V175.68a4.023 4.023 0 0 1 4.01-4.01h1.605a4.023 4.023 0 0 1 4.011 4.01v32.088a4.023 4.023 0 0 1-4.01 4.01" fill="#A3B4C6" data-v-33e867c4></path><path d="M237.824 212.977a4.813 4.813 0 0 1-4.813 4.813h-86.636a4.813 4.813 0 0 1 0-9.626h86.636a4.813 4.813 0 0 1 4.813 4.813" fill="#A3B4C6" data-v-33e867c4></path><mask fill="#fff" data-v-33e867c4></mask><path fill="#A3B4C6" mask="url(#d)" d="M154.098 190.096h70.513v-84.617h-70.513z" data-v-33e867c4></path><path d="M224.928 190.096H153.78a3.219 3.219 0 0 1-3.208-3.209V167.92a3.219 3.219 0 0 1 3.208-3.21h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.219 3.219 0 0 1-3.21 3.209M224.928 130.832H153.78a3.218 3.218 0 0 1-3.208-3.208v-18.968a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.218 3.218 0 0 1-3.21 3.208" fill="#BFCDDD" mask="url(#d)" data-v-33e867c4></path><path d="M159.563 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 120.546h-22.461a.802.802 0 0 1-.802-.802v-3.208c0-.443.359-.803.802-.803h22.46c.444 0 .803.36.803.803v3.208c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-33e867c4></path><path d="M224.928 160.464H153.78a3.218 3.218 0 0 1-3.208-3.209v-18.967a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.209v18.967a3.218 3.218 0 0 1-3.21 3.209" fill="#BFCDDD" mask="url(#d)" data-v-33e867c4></path><path d="M173.455 130.832h49.301M164.984 130.832h6.089M155.952 130.832h6.75M173.837 160.613h49.3M165.365 160.613h6.089M155.57 160.613h6.751" stroke="#7C90A5" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-33e867c4></path><path d="M159.563 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M166.98 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M174.397 151.038a2.407 2.407 0 1 1 .001-4.814 2.407 2.407 0 0 1 0 4.814M222.539 151.038h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802M159.563 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 179.987h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-33e867c4></path><path d="M203.04 221.108h-27.372a2.413 2.413 0 0 1-2.406-2.407v-11.448a2.414 2.414 0 0 1 2.406-2.407h27.372a2.414 2.414 0 0 1 2.407 2.407V218.7a2.413 2.413 0 0 1-2.407 2.407" fill="#BFCDDD" mask="url(#d)" data-v-33e867c4></path><path d="M177.259 207.217v11.52M201.05 207.217v11.52" stroke="#A3B4C6" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-33e867c4></path><path d="M162.873 267.894a9.422 9.422 0 0 1-9.422-9.422v-14.82a9.423 9.423 0 0 1 18.845 0v14.82a9.423 9.423 0 0 1-9.423 9.422" fill="#5BA02E" mask="url(#d)" data-v-33e867c4></path><path d="M171.22 267.83a9.422 9.422 0 0 1-9.422-9.423v-3.438a9.423 9.423 0 0 1 18.845 0v3.438a9.423 9.423 0 0 1-9.422 9.423" fill="#92C110" mask="url(#d)" data-v-33e867c4></path><path d="M181.31 293.666h-27.712a3.209 3.209 0 0 1-3.209-3.21V269.79a3.209 3.209 0 0 1 3.209-3.21h27.711a3.209 3.209 0 0 1 3.209 3.21v20.668a3.209 3.209 0 0 1-3.209 3.209" fill="#F2D7AD" mask="url(#d)" data-v-33e867c4></path></g>', 2)];
var pn = { class: "m-title" };
var fn2 = { class: "m-subtitle" };
var hn = { class: "m-extra" };
var mn = { key: 0, class: "m-content" };
var Ra2 = W(defineComponent({ __name: "Result", props: { status: { default: "info" }, title: { default: "" }, subTitle: { default: "" } }, setup(l) {
  const a = useSlots(), e = computed(() => {
    var c;
    const t = (c = a.default) == null ? void 0 : c.call(a);
    return !!t && !!(t[0].children !== "v-if" && (t != null && t.length));
  });
  return (t, c) => (openBlock(), createElementBlock("div", Z2, [createBaseVNode("div", Q2, [renderSlot(t.$slots, "image", {}, () => [t.status === "info" ? (openBlock(), createElementBlock("svg", X2, J2)) : createCommentVNode("", true), t.status === "success" ? (openBlock(), createElementBlock("svg", en, an)) : createCommentVNode("", true), t.status === "warning" ? (openBlock(), createElementBlock("svg", ln2, tn)) : createCommentVNode("", true), t.status === "error" ? (openBlock(), createElementBlock("svg", on2, sn2)) : createCommentVNode("", true), t.status === "403" ? (openBlock(), createElementBlock("svg", nn, un2)) : createCommentVNode("", true), t.status === "404" ? (openBlock(), createElementBlock("svg", cn2, rn2)) : createCommentVNode("", true), t.status === "500" ? (openBlock(), createElementBlock("svg", dn2, vn2)) : createCommentVNode("", true)], true)]), createBaseVNode("div", pn, [renderSlot(t.$slots, "title", {}, () => [createTextVNode(toDisplayString(t.title), 1)], true)]), createBaseVNode("div", fn2, [renderSlot(t.$slots, "subTitle", {}, () => [createTextVNode(toDisplayString(t.subTitle), 1)], true)]), createBaseVNode("div", hn, [renderSlot(t.$slots, "extra", {}, void 0, true)]), e.value ? (openBlock(), createElementBlock("div", mn, [renderSlot(t.$slots, "default", {}, void 0, true)])) : createCommentVNode("", true)]));
} }), [["__scopeId", "data-v-33e867c4"]]);
Ra2.install = (l) => {
  l.component(Ra2.__name, Ra2);
};
var Wa2 = W(defineComponent({ __name: "Scrollbar", props: { contentStyle: { default: () => ({}) }, size: { default: 5 }, trigger: { default: "hover" }, horizontal: { type: Boolean, default: false } }, emits: ["scroll"], setup(l, { expose: a, emit: e }) {
  const t = l, c = ref(), s = ref(), u = ref(), n = ref(), m = ref(), r = ref(false), w = ref(0), p = ref(0), g = ref(0), f = ref(0), v = ref(0), h3 = ref(0), b = ref(0), M = ref(0), B = ref(0), k = ref(0), x = ref(0), z = ref(0), $ = ref(false), L = ref(false), T = ref(false), V = ref(0), P = ref(0), U = ref(0), G3 = ref(0), E = { width: "fit-content" }, H = e, N = computed(() => w.value > g.value), te = computed(() => p.value > f.value), de = computed(() => N.value || t.horizontal && te.value), O = computed(() => {
    if (N.value && v.value && b.value && B.value) {
      const Q = Math.min(v.value, B.value * v.value / b.value + 1.5 * t.size);
      return Number(Q.toFixed(4));
    }
    return 0;
  }), ue = computed(() => v.value && b.value && B.value ? x.value / (b.value - v.value) * (B.value - O.value) : 0), we = computed(() => {
    if (t.horizontal && te.value && h3.value && M.value && k.value) {
      const Q = k.value * h3.value / M.value + 1.5 * t.size;
      return Number(Q.toFixed(4));
    }
    return 0;
  }), ve = computed(() => h3.value && M.value && k.value ? z.value / (M.value - h3.value) * (k.value - we.value) : 0);
  function Me2() {
    x.value = s.value.scrollTop, z.value = s.value.scrollLeft;
  }
  function ne() {
    Me2(), w.value = s.value.scrollHeight, p.value = s.value.scrollWidth, g.value = s.value.clientHeight, f.value = s.value.clientWidth, v.value = s.value.offsetHeight, h3.value = s.value.offsetWidth, b.value = u.value.offsetHeight, M.value = u.value.offsetWidth, B.value = n.value.offsetHeight, k.value = m.value.offsetWidth;
  }
  onMounted(() => {
    ne();
  }), Re(window, "resize", ne);
  function ze2(Q) {
    H("scroll", Q), Me2();
  }
  function Ae(Q) {
    $.value = true, V.value = x.value, U.value = Q.clientY, window.onmousemove = (le) => {
      const he = (le.clientY - U.value) * (b.value - v.value) / (v.value - O.value), Ce2 = b.value - v.value;
      let pe = V.value + he;
      pe = Math.min(Ce2, pe), pe = Math.max(pe, 0), s.value.scrollTop = pe;
    }, window.onmouseup = () => {
      window.onmousemove = null, $.value = false, t.trigger === "hover" && T.value && (r.value = false, T.value = false);
    };
  }
  function j(Q) {
    L.value = true, P.value = z.value, G3.value = Q.clientX, window.onmousemove = (le) => {
      const he = (le.clientX - G3.value) * (M.value - h3.value) / (h3.value - we.value), Ce2 = M.value - h3.value;
      let pe = P.value + he;
      pe = Math.min(Ce2, pe), pe = Math.max(pe, 0), s.value.scrollLeft = pe;
    }, window.onmouseup = () => {
      window.onmousemove = null, L.value = false, t.trigger === "hover" && T.value && (r.value = false, T.value = false);
    };
  }
  return pl2(c, ne, { childList: true, attributes: true, subtree: true }), a({ scrollTo: function(...Q) {
    var le;
    (le = s.value) == null || le.scrollTo(...Q);
  }, scrollBy: function(...Q) {
    var le;
    (le = s.value) == null || le.scrollBy(...Q);
  } }), (Q, le) => (openBlock(), createElementBlock("div", { ref_key: "scrollbarRef", ref: c, class: "m-scrollbar", style: normalizeStyle(`--scrollbar-size: ${Q.size}px;`), onMouseenter: le[0] || (le[0] = (he) => de.value && Q.trigger === "hover" ? void (t.horizontal ? L.value ? T.value = false : r.value = true : $.value ? T.value = false : r.value = true) : () => false), onMouseleave: le[1] || (le[1] = (he) => de.value && Q.trigger === "hover" ? void (t.horizontal ? L.value ? T.value = true : r.value = false : $.value ? T.value = true : r.value = false) : () => false) }, [createBaseVNode("div", { ref_key: "containerRef", ref: s, class: "m-scrollbar-container", onScroll: ze2 }, [createBaseVNode("div", { ref_key: "contentRef", ref: u, class: "m-scrollbar-content", style: normalizeStyle([Q.horizontal ? { ...E, ...Q.contentStyle } : Q.contentStyle]) }, [renderSlot(Q.$slots, "default", {}, void 0, true)], 4)], 544), createBaseVNode("div", { ref_key: "railVerticalRef", ref: n, class: "m-scrollbar-rail rail-vertical" }, [createVNode(Transition, { name: "fade" }, { default: withCtx(() => [Q.trigger === "none" || r.value ? (openBlock(), createElementBlock("div", { key: 0, class: "m-scrollbar-track", style: normalizeStyle(`top: ${ue.value}px; height: ${O.value}px;`), onMousedown: withModifiers(Ae, ["prevent", "stop"]) }, null, 36)) : createCommentVNode("", true)]), _: 1 })], 512), withDirectives(createBaseVNode("div", { ref_key: "railHorizontalRef", ref: m, class: "m-scrollbar-rail rail-horizontal" }, [createVNode(Transition, { name: "fade" }, { default: withCtx(() => [Q.trigger === "none" || r.value ? (openBlock(), createElementBlock("div", { key: 0, class: "m-scrollbar-track", style: normalizeStyle(`left: ${ve.value}px; width: ${we.value}px;`), onMousedown: withModifiers(j, ["prevent", "stop"]) }, null, 36)) : createCommentVNode("", true)]), _: 1 })], 512), [[vShow, Q.horizontal]])], 36));
} }), [["__scopeId", "data-v-d12c71a8"]]);
Wa2.install = (l) => {
  l.component(Wa2.__name, Wa2);
};
var gn = { class: "m-segmented-group" };
var yn = ["onClick"];
var wn = ["checked", "disabled"];
var kn = ["title"];
var bn = defineComponent({ __name: "Segmented", props: { block: { type: Boolean, default: false }, disabled: { type: Boolean, default: false }, options: { default: () => [] }, size: { default: "middle" }, value: { default: void 0 } }, emits: ["update:value", "change"], setup(l, { emit: a }) {
  const e = l, t = a;
  function c(n) {
    return typeof n == "object" && (n == null ? void 0 : n.disabled) || false;
  }
  function s(n) {
    return typeof n == "object" ? n.value : n;
  }
  function u(n) {
    return typeof n == "object" ? n.label : n;
  }
  return (n, m) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-segmented", { "segmented-small": n.size == "small", "segmented-large": n.size == "large", "segmented-block": n.block }]) }, [createBaseVNode("div", gn, [(openBlock(true), createElementBlock(Fragment, null, renderList(n.options, (r, w) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-segmented-item", { "segmented-item-selected": n.value === s(r), "segmented-item-disabled": n.disabled || c(r), "segmented-item-block": n.block }]), key: w, onClick: (p) => {
    return n.disabled || c(r) ? () => false : void ((g = s(r)) !== e.value && (t("update:value", g), t("change", g)));
    var g;
  } }, [createBaseVNode("input", { class: "segmented-item-input", type: "radio", checked: n.value === s(r), disabled: n.disabled || c(r) }, null, 8, wn), createBaseVNode("div", { class: "segmented-item-label", title: typeof r == "object" && r.payload ? void 0 : String(u(r)) }, [renderSlot(n.$slots, "label", { label: u(r), payload: typeof r == "object" ? r.payload : {} }, () => [createTextVNode(toDisplayString(u(r)), 1)], true)], 8, kn)], 10, yn))), 128))])], 2));
} });
var qa2 = W(bn, [["__scopeId", "data-v-3f27a52f"]]);
qa2.install = (l) => {
  l.component(qa2.__name, qa2);
};
var Al2 = (l) => (pushScopeId("data-v-fa28d133"), l = l(), popScopeId(), l);
var xn = Al2(() => createBaseVNode("div", { class: "m-arrow" }, null, -1));
var Mn2 = Al2(() => createBaseVNode("div", { class: "m-arrow" }, null, -1));
var Na2 = W(defineComponent({ __name: "Slider", props: { width: { default: "100%" }, min: { default: 0 }, max: { default: 100 }, disabled: { type: Boolean, default: false }, range: { type: Boolean, default: false }, step: { default: 1 }, formatTooltip: { type: Function, default: (l) => l }, tooltip: { type: Boolean, default: true }, value: { default: 0 } }, emits: ["update:value", "change"], setup(l, { emit: a }) {
  const e = l, t = ref(false), c = ref(), s = ref(0), u = ref(0), n = ref(), m = ref(), r = ref(), w = ref(), p = ref(), g = ref(), f = computed(() => {
    var H;
    return ((H = e.step.toString().split(".")[1]) == null ? void 0 : H.length) ?? 0;
  }), v = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), h3 = computed(() => {
    let E;
    if (u.value === m.value ? E = e.max : (E = z(G3(u.value, "/") * e.step + e.min, f.value), e.step > 1 && (E = Math.round(E / e.step) * e.step)), e.range) {
      let H = z(G3(s.value, "/") * e.step + e.min, f.value);
      return e.step > 1 && (H = Math.round(H / e.step) * e.step), [H, E];
    }
    return E;
  }), b = computed(() => e.range ? e.formatTooltip(h3.value[0]) : null), M = computed(() => e.range ? e.formatTooltip(h3.value[1]) : e.formatTooltip(h3.value)), B = a;
  function k() {
    m.value = n.value.offsetWidth;
  }
  function x() {
    if (e.range) {
      const H = G3((((E = e.value[0]) < e.min ? e.min : E) - e.min) / e.step, "*");
      s.value = z(H, 2);
      const N = G3((function(te) {
        return te > e.max ? e.max : te;
      }(e.value[1]) - e.min) / e.step, "*");
      u.value = z(N, 2);
    } else {
      const H = G3((function(N) {
        return N < e.min ? e.min : N > e.max ? e.max : N;
      }(e.value) - e.min) / e.step, "*");
      u.value = z(H, 2);
    }
    var E;
  }
  function z(E, H) {
    return parseFloat(E.toFixed(H));
  }
  function $(E) {
    E.classList.remove("show-handle-tooltip");
  }
  function L(E, H) {
    E.focus(), e.tooltip && H.classList.add("show-handle-tooltip");
  }
  function T() {
    const E = n.value.getBoundingClientRect().left;
    window.onmousemove = (H) => {
      e.tooltip && w.value.classList.add("show-handle-tooltip");
      const N = Math.round(G3(H.clientX - E, "/")), te = z(G3(N, "*"), 2);
      te < 0 ? s.value = 0 : te >= 0 && te <= u.value ? s.value = te : (s.value = u.value, p.value.focus(), V());
    }, window.onmouseup = () => {
      e.tooltip && w.value.classList.remove("show-handle-tooltip"), window.onmousemove = null;
    };
  }
  function V() {
    const E = n.value.getBoundingClientRect().left;
    window.onmousemove = (H) => {
      e.tooltip && g.value.classList.add("show-handle-tooltip");
      const N = Math.round(G3(H.clientX - E, "/")), te = z(G3(N, "*"), 2);
      te > m.value ? u.value = m.value : s.value <= te && te <= m.value ? u.value = te : (u.value = s.value, e.range && (r.value.focus(), T()));
    }, window.onmouseup = () => {
      e.tooltip && g.value.classList.remove("show-handle-tooltip"), window.onmousemove = null;
    };
  }
  function P(E, H) {
    const N = G3(E, "-");
    H === "left" ? s.value = N < 0 ? 0 : N : N >= s.value ? u.value = N : (u.value = s.value, s.value = N, r.value.focus());
  }
  function U(E, H) {
    const N = G3(E, "+");
    H === "right" ? N > m.value ? u.value = m.value : u.value = N : N <= u.value ? s.value = N : (s.value = u.value, u.value = N, p.value.focus());
  }
  function G3(E, H) {
    return H === "+" ? E + m.value * e.step / (e.max - e.min) : H === "-" ? E - m.value * e.step / (e.max - e.min) : H === "*" ? E * m.value * e.step / (e.max - e.min) : H === "/" ? E * (e.max - e.min) / (m.value * e.step) : E;
  }
  return watch(() => e.value, () => {
    x();
  }), watch(h3, (E) => {
    B("update:value", E), B("change", E);
  }), Ke2(n, () => {
    k(), x();
  }), onMounted(() => {
    k(), x();
  }), (E, H) => (openBlock(), createElementBlock("div", { ref_key: "sliderRef", ref: n, class: normalizeClass(["m-slider", { disabled: E.disabled }]), style: normalizeStyle(`width: ${v.value};`) }, [createBaseVNode("div", { class: "u-slider-rail", onClick: H[0] || (H[0] = withModifiers((N) => E.disabled ? () => false : function(te) {
    t.value ? (ce(c.value), c.value = null) : t.value = true, c.value = be(() => {
      t.value = false;
    }, 200);
    const de = Math.round(G3(te.layerX, "/")), O = z(G3(de, "*"), 2);
    e.range ? O <= s.value ? (s.value = O, L(r.value, w.value)) : O >= u.value ? (u.value = O, L(p.value, g.value)) : O - s.value < u.value - O ? (s.value = O, L(r.value, w.value)) : (u.value = O, L(p.value, g.value)) : (u.value = O, L(p.value, g.value));
  }(N), ["self"])) }), createBaseVNode("div", { class: normalizeClass(["u-slider-track", { trackTransition: t.value }]), style: normalizeStyle(`left: ${s.value}px; right: auto; width: ${u.value - s.value}px;`) }, null, 6), E.range ? (openBlock(), createElementBlock("div", { key: 0, tabindex: "0", ref_key: "leftHandle", ref: r, class: normalizeClass(["m-slider-handle", { handleTransition: t.value }]), style: normalizeStyle(`left: ${s.value}px; right: auto; transform: translate(-50%, -50%);`), onKeydown: [H[1] || (H[1] = withKeys(withModifiers((N) => E.disabled ? () => false : P(s.value, "left"), ["prevent"]), ["left"])), H[2] || (H[2] = withKeys(withModifiers((N) => E.disabled ? () => false : U(s.value, "left"), ["prevent"]), ["right"])), H[3] || (H[3] = withKeys(withModifiers((N) => E.disabled ? () => false : P(s.value, "left"), ["prevent"]), ["down"])), H[4] || (H[4] = withKeys(withModifiers((N) => E.disabled ? () => false : U(s.value, "left"), ["prevent"]), ["up"]))], onMousedown: H[5] || (H[5] = (N) => E.disabled ? () => false : T()), onBlur: H[6] || (H[6] = (N) => E.tooltip && !E.disabled ? $(w.value) : () => false) }, [E.tooltip ? (openBlock(), createElementBlock("div", { key: 0, ref_key: "leftTooltip", ref: w, class: "m-handle-tooltip" }, [createTextVNode(toDisplayString(b.value) + " ", 1), xn], 512)) : createCommentVNode("", true)], 38)) : createCommentVNode("", true), createBaseVNode("div", { tabindex: "0", ref_key: "rightHandle", ref: p, class: normalizeClass(["m-slider-handle", { handleTransition: t.value }]), style: normalizeStyle(`left: ${u.value}px; right: auto; transform: translate(-50%, -50%);`), onKeydown: [H[7] || (H[7] = withKeys(withModifiers((N) => E.disabled ? () => false : P(u.value, "right"), ["prevent"]), ["left"])), H[8] || (H[8] = withKeys(withModifiers((N) => E.disabled ? () => false : U(u.value, "right"), ["prevent"]), ["right"])), H[9] || (H[9] = withKeys(withModifiers((N) => E.disabled ? () => false : P(u.value, "right"), ["prevent"]), ["down"])), H[10] || (H[10] = withKeys(withModifiers((N) => E.disabled ? () => false : U(u.value, "right"), ["prevent"]), ["up"]))], onMousedown: H[11] || (H[11] = (N) => E.disabled ? () => false : V()), onBlur: H[12] || (H[12] = (N) => E.tooltip && !E.disabled ? $(g.value) : () => false) }, [E.tooltip ? (openBlock(), createElementBlock("div", { key: 0, ref_key: "rightTooltip", ref: g, class: "m-handle-tooltip" }, [createTextVNode(toDisplayString(M.value) + " ", 1), Mn2], 512)) : createCommentVNode("", true)], 38)], 6));
} }), [["__scopeId", "data-v-fa28d133"]]);
Na2.install = (l) => {
  l.component(Na2.__name, Na2);
};
var _n2 = { class: "m-statistic" };
var zn2 = { class: "u-title" };
var Cn2 = { key: 0, class: "u-prefix" };
var $n2 = { class: "u-content-value" };
var Bn2 = { key: 1, class: "u-suffix" };
var Pa2 = W(defineComponent({ __name: "Statistic", props: { title: { default: "" }, value: { default: "" }, valueStyle: { default: () => ({}) }, precision: { default: 0 }, prefix: { default: "" }, suffix: { default: "" }, separator: { default: "," }, formatter: { type: Function, default: (l) => l } }, setup(l) {
  const a = l, e = computed(() => a.formatter(Ml2(a.value, a.precision, a.separator))), t = useSlots(), c = computed(() => {
    var n;
    const u = (n = t.prefix) == null ? void 0 : n.call(t);
    return u ? !!(u[0].children !== "v-if" && (u != null && u.length)) : a.prefix;
  }), s = computed(() => {
    var n;
    const u = (n = t.suffix) == null ? void 0 : n.call(t);
    return u ? !!(u[0].children !== "v-if" && (u != null && u.length)) : a.suffix;
  });
  return (u, n) => (openBlock(), createElementBlock("div", _n2, [createBaseVNode("div", zn2, [renderSlot(u.$slots, "title", {}, () => [createTextVNode(toDisplayString(u.title), 1)], true)]), createBaseVNode("div", { class: "m-content", style: normalizeStyle(u.valueStyle) }, [c.value ? (openBlock(), createElementBlock("span", Cn2, [renderSlot(u.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(u.prefix), 1)], true)])) : createCommentVNode("", true), createBaseVNode("span", $n2, [renderSlot(u.$slots, "default", {}, () => [createTextVNode(toDisplayString(e.value), 1)], true)]), s.value ? (openBlock(), createElementBlock("span", Bn2, [renderSlot(u.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(u.suffix), 1)], true)])) : createCommentVNode("", true)], 4)]));
} }), [["__scopeId", "data-v-10985d8a"]]);
Pa2.install = (l) => {
  l.component(Pa2.__name, Pa2);
};
var Dl2 = (l) => (pushScopeId("data-v-8f96e2ec"), l = l(), popScopeId(), l);
var Fn2 = ["onClick"];
var Sn2 = Dl2(() => createBaseVNode("div", { class: "m-steps-tail" }, null, -1));
var Ln2 = { class: "m-steps-icon" };
var An2 = { key: 0, class: "u-num" };
var Dn2 = { key: 1, class: "u-icon", viewBox: "64 64 896 896", "data-icon": "check", "aria-hidden": "true", focusable: "false" };
var Tn2 = [Dl2(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1))];
var En2 = { key: 1, class: "u-dot" };
var Hn2 = { class: "m-steps-content" };
var In2 = { class: "u-steps-title" };
var jn = defineComponent({ __name: "Steps", props: { steps: { default: () => [] }, width: { default: "auto" }, size: { default: "default" }, vertical: { type: Boolean, default: false }, labelPlacement: { default: "right" }, dotted: { type: Boolean, default: false }, current: { default: 1 } }, emits: ["update:current", "change"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), c = computed(() => e.steps.length), s = computed(() => e.current < 1 ? 1 : e.current > c.value + 1 ? c.value + 1 : e.current), u = a;
  return (n, m) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-steps", { "steps-small": n.size === "small", "steps-vertical": n.vertical, "steps-label-bottom": !n.vertical && (n.labelPlacement === "bottom" || n.dotted), "steps-dotted": n.dotted }]), style: normalizeStyle(`width: ${t.value};`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(n.steps, (r, w) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-steps-item", { "steps-finish": s.value > w + 1, "steps-process": s.value === w + 1, "steps-wait": s.value < w + 1 }]), key: w }, [createBaseVNode("div", { tabindex: "0", class: "m-steps-info-wrap", onClick: (p) => function(g) {
    s.value !== g && (u("update:current", g), u("change", g));
  }(w + 1) }, [Sn2, createBaseVNode("div", Ln2, [n.dotted ? (openBlock(), createElementBlock("span", En2)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [s.value <= w + 1 ? (openBlock(), createElementBlock("span", An2, toDisplayString(w + 1), 1)) : (openBlock(), createElementBlock("svg", Dn2, Tn2))], 64))]), createBaseVNode("div", Hn2, [createBaseVNode("div", In2, toDisplayString(r.title), 1), withDirectives(createBaseVNode("div", { class: "u-steps-description" }, toDisplayString(r.description), 513), [[vShow, r.description]])])], 8, Fn2)], 2))), 128))], 6));
} });
var Oa2 = W(jn, [["__scopeId", "data-v-8f96e2ec"]]);
Oa2.install = (l) => {
  l.component(Oa2.__name, Oa2);
};
var Vn = ["href", "target"];
var Rn2 = ["src", "alt"];
var Wn = ["href", "target"];
var qn = ["src", "alt"];
var Nn2 = ["href", "target"];
var Pn2 = ["src", "alt"];
var On2 = defineComponent({ __name: "Swiper", props: { images: { default: () => [] }, width: { default: "100%" }, height: { default: "100%" }, type: { default: "banner" }, navigation: { type: Boolean, default: false }, effect: { default: "slide" }, delay: { default: 3e3 }, speed: { default: 300 }, loop: { type: Boolean, default: true }, pauseOnMouseEnter: { type: Boolean, default: false }, swipe: { type: Boolean, default: true }, preloaderColor: { default: "theme" } }, emits: ["swiper", "change"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), c = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), s = computed(() => {
    const f = [Navigation, Pagination, Autoplay], v = { fade: EffectFade, cube: EffectCube, flip: EffectFlip, coverflow: EffectCoverflow, cards: EffectCards, creative: EffectCreative };
    return e.effect !== "slide" && f.push(v[e.effect]), f;
  }), u = ref({ delay: e.delay, disableOnInteraction: false, pauseOnMouseEnter: e.pauseOnMouseEnter }), n = ref([Autoplay]), m = ref({ delay: 0, disableOnInteraction: false }), r = ref([Navigation, Pagination, Mousewheel]), w = a;
  function p(f) {
    w("swiper", f), e.type === "carousel" && e.pauseOnMouseEnter && (f.el.onmouseenter = () => {
      f.autoplay.stop();
    }, f.el.onmouseleave = () => {
      f.autoplay.start();
    });
  }
  function g(f) {
    if (f.title) return f.title;
    {
      const v = f.src.split("?")[0].split("/");
      return v[v.length - 1];
    }
  }
  return (f, v) => (openBlock(), createElementBlock(Fragment, null, [f.type === "banner" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 0, class: { "swiper-no-swiping": !f.swipe }, style: `width: ${t.value}; height: ${c.value};`, modules: s.value, navigation: f.navigation, "slides-per-view": 1, autoplay: u.value, effect: f.effect, speed: f.speed, loop: f.loop, lazy: "", onSwiper: p, onSlideChange: v[0] || (v[0] = (h3) => f.$emit("change", h3)) }, f.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(f.images, (h3, b) => (openBlock(), createBlock(unref(SwiperSlide), { key: b }, { default: withCtx(() => [createBaseVNode("a", { href: h3.link ? h3.link : "javascript:;", target: h3.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { class: "u-image", src: h3.src, alt: g(h3), loading: "lazy" }, null, 8, Rn2)], 8, Vn), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${f.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["class", "style", "modules", "navigation", "autoplay", "effect", "speed", "loop"])) : createCommentVNode("", true), f.type === "carousel" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 1, class: "swiper-no-swiping", style: `width: ${t.value}; height: ${c.value};`, modules: n.value, autoplay: m.value, speed: f.speed, loop: f.loop, lazy: "", onSwiper: p, onSlideChange: v[1] || (v[1] = (h3) => f.$emit("change", h3)) }, f.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(f.images, (h3, b) => (openBlock(), createBlock(unref(SwiperSlide), { key: b }, { default: withCtx(() => [createBaseVNode("a", { href: h3.link ? h3.link : "javascript:;", target: h3.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { class: "u-image", src: h3.src, alt: g(h3), loading: "lazy" }, null, 8, qn)], 8, Wn), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${f.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["style", "modules", "autoplay", "speed", "loop"])) : createCommentVNode("", true), f.type === "broadcast" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 2, style: `width: ${t.value}; height: ${c.value};`, modules: r.value, navigation: f.navigation, speed: f.speed, loop: f.loop, lazy: "", onSwiper: p, onSlideChange: v[2] || (v[2] = (h3) => f.$emit("change", h3)) }, f.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(f.images, (h3, b) => (openBlock(), createBlock(unref(SwiperSlide), { key: b }, { default: withCtx(() => [createBaseVNode("a", { href: h3.link ? h3.link : "javascript:;", target: h3.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { class: "u-image", src: h3.src, alt: g(h3), loading: "lazy" }, null, 8, Pn2)], 8, Nn2), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${f.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["style", "modules", "navigation", "speed", "loop"])) : createCommentVNode("", true)], 64));
} });
var Ka2 = W(On2, [["__scopeId", "data-v-499fdb9b"]]);
Ka2.install = (l) => {
  l.component(Ka2.__name, Ka2);
};
var Kn = { class: "m-switch-wrap" };
var Ya2 = W(defineComponent({ __name: "Switch", props: { onInfo: { default: "" }, offInfo: { default: "" }, disabled: { type: Boolean, default: false }, checked: { type: Boolean, default: false }, nodeStyle: { default: () => ({}) } }, emits: ["update:checked", "change"], setup(l, { emit: a }) {
  const e = l, t = a;
  return (c, s) => (openBlock(), createElementBlock("div", Kn, [createBaseVNode("div", { onClick: s[0] || (s[0] = (u) => c.disabled ? () => false : (t("update:checked", !e.checked), void t("change", !e.checked))), class: normalizeClass(["m-switch", { "switch-checked": c.checked, disabled: c.disabled }]) }, [createBaseVNode("div", { class: normalizeClass(["u-switch-inner", c.checked ? "inner-checked" : "inner-unchecked"]) }, toDisplayString(c.checked ? c.onInfo : c.offInfo), 3), createBaseVNode("div", { class: normalizeClass(["u-node", { "node-checked": c.checked }]), style: normalizeStyle(c.nodeStyle) }, [renderSlot(c.$slots, "node", {}, void 0, true)], 6)], 2)]));
} }), [["__scopeId", "data-v-090bf09a"]]);
Ya2.install = (l) => {
  l.component(Ya2.__name, Ya2);
};
var Yn2 = { class: "m-table-wrap" };
var Un2 = { class: "m-table" };
var Gn = { class: "m-tr" };
var Zn = { class: "m-body" };
var Qn = { class: "m-tr-loading" };
var Xn = { class: "m-tr-empty" };
var Jn = ["colspan"];
var e4 = ["title"];
var a4 = { key: 1 };
var l4 = defineComponent({ __name: "Table", props: { columns: { default: () => [] }, dataSource: { default: () => [] }, pagination: { default: () => ({}) }, showPagination: { type: Boolean, default: true }, total: { default: 0 }, loading: { type: Boolean, default: false } }, emits: ["change"], setup(l, { emit: a }) {
  const e = a;
  function t(c, s) {
    e("change", c, s);
  }
  return (c, s) => (openBlock(), createElementBlock("div", Yn2, [createBaseVNode("table", Un2, [createBaseVNode("thead", null, [createBaseVNode("tr", Gn, [(openBlock(true), createElementBlock(Fragment, null, renderList(c.columns, (u, n) => (openBlock(), createElementBlock("th", { class: "m-th", style: normalizeStyle(`width: ${typeof u.width == "number" ? u.width + "px" : u.width};`), key: n }, toDisplayString(u.title), 5))), 128))])]), createBaseVNode("tbody", Zn, [withDirectives(createBaseVNode("tr", Qn, [createVNode(unref(Se2), { class: "m-loading", size: "small", colspan: c.columns.length }, null, 8, ["colspan"])], 512), [[vShow, c.loading]]), withDirectives(createBaseVNode("tr", Xn, [createBaseVNode("td", { class: "m-td-empty", colspan: c.columns.length }, [createVNode(unref(qe2), { class: "empty", image: "2" })], 8, Jn)], 512), [[vShow, !c.total]]), (openBlock(true), createElementBlock(Fragment, null, renderList(c.dataSource, (u, n) => (openBlock(), createElementBlock("tr", { class: "m-tr", key: n }, [(openBlock(true), createElementBlock(Fragment, null, renderList(c.columns, (m, r) => (openBlock(), createElementBlock("td", { class: "m-td", key: r, title: u[m.dataIndex] }, [m.slot ? renderSlot(c.$slots, m.slot, mergeProps({ key: 0, ref_for: true }, u, { index: n }), () => [createTextVNode(toDisplayString(u[m.dataIndex] || "--"), 1)], true) : (openBlock(), createElementBlock("span", a4, toDisplayString(u[m.dataIndex] || "--"), 1))], 8, e4))), 128))]))), 128))])]), c.showPagination && c.total ? (openBlock(), createBlock(unref(Je2), { key: 0, class: "mt20", onChange: t, total: c.total, page: c.pagination.page, pageSize: c.pagination.pageSize, pageSizeOptions: c.pagination.pageSizeOptions, pageListNum: c.pagination.pageListNum, hideOnSinglePage: c.pagination.hideOnSinglePage, showQuickJumper: c.pagination.showQuickJumper, showSizeChanger: c.pagination.showSizeChanger, showTotal: c.pagination.showTotal, placement: c.pagination.placement }, null, 8, ["total", "page", "pageSize", "pageSizeOptions", "pageListNum", "hideOnSinglePage", "showQuickJumper", "showSizeChanger", "showTotal", "placement"])) : createCommentVNode("", true)]));
} });
var Ua2 = W(l4, [["__scopeId", "data-v-0d405827"]]);
Ua2.install = (l) => {
  l.component(Ua2.__name, Ua2);
};
var t4 = { class: "m-tabs" };
var o4 = { class: "m-tabs-nav" };
var s4 = ["onClick"];
var n4 = { class: "m-tabs-page" };
var i4 = defineComponent({ __name: "Tabs", props: { tabPages: { default: () => [] }, centered: { type: Boolean, default: false }, size: { default: "middle" }, type: { default: "line" }, gutter: { default: void 0 }, activeKey: { default: "" } }, emits: ["update:activeKey", "change"], setup(l, { emit: a }) {
  const e = l, t = ref(), c = ref(0), s = ref(0), u = ref(), n = ref(), m = ref(), r = ref(), w = ref(), p = ref(false), g = ref(0), f = ref(0), v = computed(() => e.tabPages.findIndex((k) => k.key === e.activeKey));
  watch(() => e.activeKey, () => {
    M();
  }, { flush: "post" }), Ke2([u, m], () => {
    B();
  }), onMounted(() => {
    B();
  });
  const h3 = a, b = ref(false);
  function M() {
    const k = t.value[v.value];
    if (k) {
      if (c.value = k.offsetLeft, s.value = k.offsetWidth, p.value) {
        c.value < f.value && (b.value = true, f.value = c.value, w.value && ce(w.value), w.value = be(() => {
          b.value = false;
        }, 150));
        const x = c.value + s.value - n.value;
        x > f.value && (b.value = true, f.value = x, w.value && ce(w.value), w.value = be(() => {
          b.value = false;
        }, 150));
      }
    } else c.value = 0, s.value = 0;
  }
  function B() {
    n.value = u.value.offsetWidth, r.value = m.value.offsetWidth, r.value > n.value ? (p.value = true, g.value = r.value - n.value, f.value = g.value) : (p.value = false, f.value = 0), M();
  }
  return (k, x) => (openBlock(), createElementBlock("div", t4, [createBaseVNode("div", o4, [createBaseVNode("div", { ref_key: "wrap", ref: u, class: normalizeClass(["m-tabs-nav-wrap", { "tabs-center": k.centered, "before-shadow-active": p.value && f.value > 0, "after-shadow-active": p.value && f.value < g.value }]) }, [createBaseVNode("div", { ref_key: "nav", ref: m, class: normalizeClass(["m-tabs-nav-list", { transition: b.value }]), onWheel: x[0] || (x[0] = withModifiers((z) => p.value ? function($) {
    if ($.deltaX !== 0) {
      const L = 1 * $.deltaX;
      f.value + L > g.value ? f.value = g.value : f.value + L < 0 ? f.value = 0 : f.value += L;
    }
  }(z) : () => false, ["stop", "prevent"])), style: normalizeStyle(`transform: translate(${-f.value}px, 0)`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(k.tabPages, (z, $) => (openBlock(), createElementBlock("div", { ref_for: true, ref_key: "tabs", ref: t, class: normalizeClass(["u-tab", [`u-tab-${k.size}`, { "u-tab-card": k.type === "card", "u-tab-disabled": z.disabled }, { "u-tab-line-active": k.activeKey === z.key && k.type === "line" }, { "u-tab-card-active": k.activeKey === z.key && k.type === "card" }]]), style: normalizeStyle(`margin-left: ${$ !== 0 ? k.gutter : null}px;`), onClick: (L) => {
    return z.disabled ? () => false : (T = z.key, h3("update:activeKey", T), void h3("change", T));
    var T;
  }, key: $ }, toDisplayString(z.tab), 15, s4))), 128)), createBaseVNode("div", { class: normalizeClass(["u-tab-bar", { "u-card-hidden": k.type === "card" }]), style: normalizeStyle(`left: ${c.value}px; width: ${s.value}px;`) }, null, 6)], 38)], 2)]), createBaseVNode("div", n4, [(openBlock(true), createElementBlock(Fragment, null, renderList(k.tabPages, (z) => withDirectives((openBlock(), createElementBlock("div", { class: "m-tabs-content", key: z.key }, [renderSlot(k.$slots, z.key, {}, () => [createTextVNode(toDisplayString(z.content), 1)], true)])), [[vShow, k.activeKey === z.key]])), 128))])]));
} });
var Ga2 = W(i4, [["__scopeId", "data-v-d63321e5"]]);
Ga2.install = (l) => {
  l.component(Ga2.__name, Ga2);
};
var ml2 = (l) => (pushScopeId("data-v-fab61bdd"), l = l(), popScopeId(), l);
var u4 = { key: 0, class: "m-icon" };
var c4 = { class: "u-tag" };
var r4 = [ml2(() => createBaseVNode("svg", { focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var d4 = { class: "u-tag" };
var v4 = ["onClick"];
var p4 = [ml2(() => createBaseVNode("svg", { focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var f4 = [ml2(() => createBaseVNode("svg", { focusable: "false", class: "u-plus", "data-icon": "plus", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }), createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })], -1))];
var h4 = defineComponent({ __name: "Tag", props: { closable: { type: Boolean, default: false }, color: { default: "" }, icon: { default: "" }, size: { default: "middle" }, bordered: { type: Boolean, default: true }, dynamic: { type: Boolean, default: false }, value: { default: () => [] }, spaceWidth: { default: "auto" }, spaceAlign: { default: "start" }, spaceDirection: { default: "horizontal" }, spaceGap: { default: "small" } }, emits: ["update:value", "close", "dynamicClose"], setup(l, { emit: a }) {
  const e = l, t = computed(() => {
    if (e.dynamic && e.value.length) {
      if (typeof e.value[0] == "string") return true;
      if (typeof e.value[0] == "object") return false;
    }
    return null;
  }), c = computed(() => e.dynamic && e.value.length ? t.value ? e.value.map((k) => ({ label: k, closable: true })) : e.value.map((k) => ({ closable: true, ...k })) : []), s = useSlots(), u = computed(() => {
    var k;
    if (!e.dynamic) {
      const x = (k = s.icon) == null ? void 0 : k.call(s);
      return x ? !!(x[0].children !== "v-if" && (x != null && x.length)) : e.icon;
    }
    return false;
  }), n = ref(), m = ref(false), r = ref(""), w = ["success", "processing", "error", "warning", "default", "pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"], p = ref(false), g = ref(), f = ref(Array(e.value.length).fill(1));
  watchEffect(() => {
    if (e.dynamic) {
      const k = e.value.length;
      f.value = Array(k).fill(1), nextTick(() => {
        if (g.value) for (let x = 0; x < k; x++) f.value[x] = g.value[x].offsetWidth;
      });
    }
  });
  const v = a;
  function h3(k) {
    p.value = true, v("close", k);
  }
  function b() {
    m.value = true, nextTick(() => {
      n.value.focus();
    });
  }
  function M() {
    t.value ? v("update:value", [...e.value, r.value]) : v("update:value", [...e.value, { label: r.value }]), m.value = false, n.value = "";
  }
  function B(k) {
    k.key === "Enter" && n.value.blur();
  }
  return (k, x) => k.dynamic ? (openBlock(), createBlock(unref(Ie2), { key: 1, width: k.spaceWidth, align: k.spaceAlign, direction: k.spaceDirection, gap: k.spaceGap }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(c.value, (z, $) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-tag", [`tag-${z.size || k.size}`, (z.color || k.color) && w.includes(z.color || k.color) ? "tag-" + (z.color || k.color) : "", { "tag-borderless": z.bordered !== void 0 && !z.bordered, "has-color": (z.color || k.color) && !w.includes(z.color || k.color) }]]), style: normalizeStyle(`background-color: ${!z.color && !k.color || w.includes(z.color || k.color) ? "" : z.color || k.color};`), key: $ }, [withDirectives(createBaseVNode("span", { class: "m-icon", ref_for: true, ref_key: "tagsIconRef", ref: g }, [renderSlot(k.$slots, "icon", { index: $ }, () => [createTextVNode(toDisplayString(z.icon), 1)], true)], 512), [[vShow, f.value[$]]]), createBaseVNode("span", d4, [renderSlot(k.$slots, "default", { label: z.label, index: $ }, () => [createTextVNode(toDisplayString(z.label), 1)], true)]), z.closable || k.closable ? (openBlock(), createElementBlock("span", { key: 0, class: "m-close", onClick: (L) => function(T, V) {
    const P = e.value.filter((U, G3) => G3 !== V);
    v("update:value", P), v("dynamicClose", T, V);
  }(z, $) }, p4, 8, v4)) : createCommentVNode("", true)], 6))), 128)), m.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-tag", [`tag-${k.size}`, { "m-plus": k.dynamic }]]), onClick: b }, f4, 2)), withDirectives(createBaseVNode("input", { ref_key: "inputRef", ref: n, class: normalizeClass(["u-input", `input-${k.size}`]), type: "text", "onUpdate:modelValue": x[0] || (x[0] = (z) => r.value = z), onBlur: x[1] || (x[1] = (z) => m.value = false), onChange: M, onKeydown: B }, null, 34), [[vShow, m.value], [vModelText, r.value]])]), _: 3 }, 8, ["width", "align", "direction", "gap"])) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-tag", [`tag-${k.size}`, k.color && w.includes(k.color) ? "tag-" + k.color : "", { "tag-borderless": !k.bordered, "has-color": k.color && !w.includes(k.color), hidden: p.value }]]), style: normalizeStyle(`background-color: ${k.color && !w.includes(k.color) ? k.color : ""};`) }, [u.value ? (openBlock(), createElementBlock("span", u4, [renderSlot(k.$slots, "icon", {}, () => [createTextVNode(toDisplayString(k.icon), 1)], true)])) : createCommentVNode("", true), createBaseVNode("span", c4, [renderSlot(k.$slots, "default", {}, void 0, true)]), k.closable ? (openBlock(), createElementBlock("span", { key: 1, class: "m-close", onClick: h3 }, r4)) : createCommentVNode("", true)], 6));
} });
var Za = W(h4, [["__scopeId", "data-v-fab61bdd"]]);
Za.install = (l) => {
  l.component(Za.__name, Za);
};
var m4 = ["data-count"];
var g4 = ["value", "maxlength", "disabled", "onKeydown"];
var y4 = [((l) => (pushScopeId("data-v-9f1d14be"), l = l(), popScopeId(), l))(() => createBaseVNode("svg", { focusable: "false", class: "u-clear", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })], -1))];
var Qa2 = W(defineComponent({ inheritAttrs: false, __name: "Textarea", props: { width: { default: "100%" }, allowClear: { type: Boolean, default: false }, autoSize: { type: [Boolean, Object], default: false }, disabled: { type: Boolean, default: false }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, value: { default: "" }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "enter"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), c = computed(() => {
    if (typeof e.autoSize == "object") {
      const h3 = { resize: "none" };
      return "minRows" in e.autoSize && (h3["min-height"] = 22 * e.autoSize.minRows + 10 + "px"), "maxRows" in e.autoSize && (h3["max-height"] = 22 * e.autoSize.maxRows + 10 + "px"), h3;
    }
    if (typeof e.autoSize == "boolean") return e.autoSize ? { "max-height": "9000000000000000px", resize: "none" } : {};
  }), s = computed(() => e.maxlength ? e.value.length + " / " + e.maxlength : e.value.length), u = computed(() => "lazy" in e.valueModifiers);
  watch(() => e.value, () => {
    JSON.stringify(c.value) !== "{}" && (m.value = 32, nextTick(() => {
      r();
    }));
  }, { flush: "post" });
  const n = ref(), m = ref(32);
  function r() {
    m.value = n.value.scrollHeight + 2;
  }
  onMounted(() => {
    r();
  });
  const w = a;
  function p(h3) {
    u.value || (w("update:value", h3.target.value), w("change", h3));
  }
  function g(h3) {
    u.value && (w("update:value", h3.target.value), w("change", h3));
  }
  function f(h3) {
    w("enter", h3);
  }
  function v() {
    w("update:value", ""), n.value.focus();
  }
  return (h3, b) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-textarea", { "show-count": h3.showCount }]), style: normalizeStyle(`width: ${t.value};`), "data-count": s.value }, [createBaseVNode("textarea", mergeProps({ ref_key: "textarea", ref: n, type: "hidden", class: ["u-textarea", { disabled: h3.disabled }], style: [`height: ${h3.autoSize ? m.value : ""}px`, c.value], value: h3.value, maxlength: h3.maxlength, disabled: h3.disabled, onInput: p, onChange: g, onKeydown: withKeys(withModifiers(f, ["prevent"]), ["enter"]) }, h3.$attrs), null, 16, g4), !h3.disabled && h3.allowClear && h3.value ? (openBlock(), createElementBlock("span", { key: 0, class: "m-clear", onClick: v }, y4)) : createCommentVNode("", true)], 14, m4));
} }), [["__scopeId", "data-v-9f1d14be"]]);
Qa2.install = (l) => {
  l.component(Qa2.__name, Qa2);
};
var w4 = ["title", "href", "target", "onClick"];
var k4 = ["title", "href", "target", "onClick"];
var b4 = defineComponent({ __name: "TextScroll", props: { scrollText: { default: () => [] }, single: { type: Boolean, default: false }, width: { default: "100%" }, height: { default: 50 }, boardStyle: { default: () => ({}) }, textStyle: { default: () => ({}) }, amount: { default: 4 }, gap: { default: 20 }, interval: { default: 10 }, step: { default: 1 }, vertical: { type: Boolean, default: false }, verticalInterval: { default: 3e3 } }, emits: ["click"], setup(l, { emit: a }) {
  const e = l, t = computed(() => e.single ? [e.scrollText, e.scrollText] : [...e.scrollText]), c = computed(() => t.value.length || 0), s = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), u = computed(() => e.single ? 1 : e.amount), n = ref(0), m = ref(), r = ref(), w = ref(true), p = ref(), g = ref(0);
  function f() {
    e.vertical ? w.value = true : g.value = parseFloat((p.value.offsetWidth / u.value).toFixed(2)), m.value && ce(m.value), r.value && ce(r.value), v();
  }
  function v() {
    e.vertical ? c.value > 1 && (r.value && ce(r.value), k()) : c.value > u.value && (m.value && ce(m.value), m.value = be(() => {
      n.value >= g.value ? (t.value.push(t.value.shift()), n.value = 0) : n.value += e.step;
    }, e.interval, true));
  }
  function h3() {
    e.vertical ? r.value && ce(r.value) : m.value && ce(m.value);
  }
  watch(() => [t, e.width, e.amount, e.gap, e.step, e.interval, e.vertical, e.verticalInterval], () => {
    f();
  }, { deep: true, flush: "post" }), Ke2(p, () => {
    f();
  }), onMounted(() => {
    f();
  });
  const b = a;
  function M(x) {
    b("click", x);
  }
  const B = ref(0);
  function k() {
    r.value = be(() => {
      w.value && (w.value = false), B.value = (B.value + 1) % c.value, k();
    }, w.value ? e.verticalInterval : e.verticalInterval + 1e3);
  }
  return (x, z) => x.vertical ? (openBlock(), createElementBlock("div", { key: 1, class: "m-slider-vertical", style: normalizeStyle([x.boardStyle, `height: ${x.height}px; width: ${s.value}; --enter-move: ${x.height}px; --leave-move: ${-x.height}px; --gap: ${x.gap}px;`]) }, [createVNode(TransitionGroup, { name: "slide" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(t.value, ($, L) => withDirectives((openBlock(), createElementBlock("div", { class: "m-scroll-view", key: L }, [createBaseVNode("a", { class: "u-slider", style: normalizeStyle(x.textStyle), title: $.title, href: $.link ? $.link : "javascript:;", target: $.link ? "_blank" : "_self", onMouseenter: h3, onMouseleave: v, onClick: (T) => M($) }, toDisplayString($.title || "--"), 45, k4)])), [[vShow, B.value === L]])), 128))]), _: 1 })], 4)) : (openBlock(), createElementBlock("div", { key: 0, ref_key: "horizonRef", ref: p, class: "m-slider-horizon", style: normalizeStyle([x.boardStyle, `height: ${x.height}px; width: ${s.value}; --gap: ${x.gap}px;`]) }, [createBaseVNode("div", { class: "m-scroll-view", style: normalizeStyle(`will-change: transform; transform: translateX(${-n.value}px);`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(t.value, ($, L) => (openBlock(), createElementBlock("a", { class: "u-slide-title", style: normalizeStyle([x.textStyle, `width: ${g.value - x.gap}px;`]), key: L, title: $.title, href: $.link ? $.link : "javascript:;", target: $.link ? "_blank" : "_self", onMouseenter: h3, onMouseleave: v, onClick: (T) => M($) }, toDisplayString($.title || "--"), 45, w4))), 128))], 4)], 4));
} });
var Xa2 = W(b4, [["__scopeId", "data-v-0611b603"]]);
Xa2.install = (l) => {
  l.component(Xa2.__name, Xa2);
};
var x4 = { class: "m-timeline" };
var M4 = defineComponent({ __name: "Timeline", props: { timelineData: { default: () => [] }, width: { default: "100%" }, lineStyle: { default: "solid" }, mode: { default: "left" }, position: { default: "left" } }, setup(l) {
  const a = l, e = ref(), t = ref([]), c = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), s = computed(() => a.timelineData.length);
  return watchEffect(() => {
    (function() {
      for (let u = 0; u < s.value; u++) t.value[u] = getComputedStyle(e.value[u].firstElementChild || e.value[u], null).getPropertyValue("line-height");
    })();
  }, { flush: "post" }), watchEffect(() => {
    if (a.mode === "center") for (let u = 0; u < s.value; u++) (u + 1) % 2 ? a.position === "left" ? e.value[u].classList.add("alternate-left-desc") : e.value[u].classList.add("alternate-right-desc") : a.position === "left" ? e.value[u].classList.add("alternate-right-desc") : e.value[u].classList.add("alternate-left-desc");
  }, { flush: "post" }), (u, n) => (openBlock(), createElementBlock("div", { class: "m-timeline-area", style: normalizeStyle(`width: ${c.value};`) }, [createBaseVNode("div", x4, [(openBlock(true), createElementBlock(Fragment, null, renderList(u.timelineData, (m, r) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-timeline-item", { last: r === u.timelineData.length - 1 }]), key: r }, [createBaseVNode("span", { class: normalizeClass(`u-tail ${u.mode}-tail`), style: normalizeStyle(`border-left-style: ${u.lineStyle};`) }, null, 6), createBaseVNode("div", { class: normalizeClass(`m-dot ${u.mode}-dot`), style: normalizeStyle(`height: ${t.value[r]}`) }, [renderSlot(u.$slots, "dot", { index: r }, () => [m.color === "red" ? (openBlock(), createElementBlock("span", { key: 0, class: "u-dot", style: normalizeStyle({ borderColor: "#ff4d4f" }) }, null, 4)) : m.color === "gray" ? (openBlock(), createElementBlock("span", { key: 1, class: "u-dot", style: normalizeStyle({ borderColor: "#00000040" }) }, null, 4)) : m.color === "green" ? (openBlock(), createElementBlock("span", { key: 2, class: "u-dot", style: normalizeStyle({ borderColor: "#52c41a" }) }, null, 4)) : m.color === "blue" ? (openBlock(), createElementBlock("span", { key: 3, class: "u-dot", style: normalizeStyle({ borderColor: "#1677ff" }) }, null, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-dot", style: normalizeStyle({ borderColor: m.color || "#1677ff" }) }, null, 4))], true)], 6), createBaseVNode("div", { ref_for: true, ref_key: "desc", ref: e, class: normalizeClass(`u-desc ${u.mode}-desc`) }, [renderSlot(u.$slots, "desc", { index: r }, () => [createTextVNode(toDisplayString(m.desc || "--"), 1)], true)], 2)], 2))), 128))])], 4));
} });
var Ja2 = W(M4, [["__scopeId", "data-v-818d20dd"]]);
Ja2.install = (l) => {
  l.component(Ja2.__name, Ja2);
};
var _4 = { class: "m-timepicker" };
var el = W(defineComponent({ __name: "TimePicker", props: { timelineData: { default: () => [] }, width: { default: "100%" }, lineStyle: { default: "solid" }, mode: { default: "left" }, position: { default: "left" } }, setup: (l) => (a, e) => (openBlock(), createElementBlock("div", _4)) }), [["__scopeId", "data-v-0372b938"]]);
el.install = (l) => {
  l.component(el.__name, el);
};
var Oe2 = (l) => (pushScopeId("data-v-5c2a8bc9"), l = l(), popScopeId(), l);
var z4 = { class: "m-upload-list" };
var C4 = { class: "m-upload" };
var $4 = ["onDrop", "onClick"];
var B4 = ["accept", "multiple", "onChange"];
var F4 = Oe2(() => createBaseVNode("svg", { focusable: "false", class: "u-plus", "data-icon": "plus", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("defs"), createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }), createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })], -1));
var S4 = { class: "u-tip" };
var L4 = { class: "m-file-uploading" };
var A4 = { key: 0, class: "m-file-preview" };
var D4 = { key: 1, class: "u-file", focusable: "false", "data-icon": "file-pdf", "aria-hidden": "true", viewBox: "64 64 896 896" };
var T4 = [Oe2(() => createBaseVNode("path", { d: "M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1))];
var E4 = { key: 2, class: "u-file", focusable: "false", "data-icon": "file", "aria-hidden": "true", viewBox: "64 64 896 896" };
var H4 = [Oe2(() => createBaseVNode("path", { d: "M534 352V136H232v752h560V394H576a42 42 0 01-42-42z", fill: "#e6f7ff" }, null, -1)), Oe2(() => createBaseVNode("path", { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1))];
var I4 = { class: "m-file-mask" };
var j4 = ["onClick"];
var V4 = [Oe2(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "eye", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })], -1))];
var R4 = ["onClick"];
var W4 = [Oe2(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "delete", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" })], -1))];
var q4 = defineComponent({ __name: "Upload", props: { accept: { default: "*" }, multiple: { type: Boolean, default: false }, maxCount: { default: 1 }, tip: { default: "Upload" }, uploadingTip: { default: "Uploading" }, gap: { default: 8 }, fit: { default: "contain" }, errorInfo: { default: "" }, beforeUpload: { type: Function, default: () => true }, uploadMode: { default: "base64" }, customRequest: { type: Function, default: () => {
} }, disabled: { type: Boolean, default: false }, fileList: { default: () => [] } }, emits: ["update:fileList", "change", "remove"], setup(l, { emit: a }) {
  const e = l, t = ref([]), c = ref(1), s = ref(Array(e.maxCount).fill(false)), u = ref();
  function n(f) {
    return /\.(jpg|jpeg|png|gif)$/i.test(f) || /^data:image/.test(f);
  }
  watchEffect(() => {
    (function() {
      t.value = [...e.fileList], t.value.length > e.maxCount && t.value.splice(e.maxCount), e.disabled ? c.value = t.value.length : t.value.length < e.maxCount ? c.value = e.fileList.length + 1 : c.value = e.maxCount;
    })();
  });
  const m = a, r = function(f, v) {
    e.beforeUpload(f) ? (e.maxCount > c.value && c.value++, e.uploadMode === "base64" && (s.value[v] = true, function(h3, b) {
      var M = new FileReader();
      M.readAsDataURL(h3), M.onloadstart = function(B) {
        console.log("开始读取 onloadstart:", B);
      }, M.onabort = function(B) {
        console.log("读取中止 onabort:", B);
      }, M.onerror = function(B) {
        console.log("读取错误 onerror:", B);
      }, M.onprogress = function(B) {
        B.loaded === B.total && (s.value[b] = false);
      }, M.onload = function(B) {
        var k;
        t.value.push({ name: h3.name, url: (k = B.target) == null ? void 0 : k.result }), m("update:fileList", t.value), m("change", t.value);
      }, M.onloadend = function(B) {
        console.log("读取结束 onloadend:", B);
      };
    }(f, v)), e.uploadMode === "custom" && (s.value[v] = true, function(h3, b) {
      e.customRequest(h3).then((M) => {
        t.value.push(M), m("update:fileList", t.value), m("change", t.value);
      }).catch((M) => {
        e.maxCount > 1 && (c.value = t.value.length + 1), g(M);
      }).finally(() => {
        s.value[b] = false;
      });
    }(f, v))) : nextTick(() => {
      g(e.errorInfo);
    });
  }, w = ref(), p = ref();
  function g(f) {
    p.value.error(f);
  }
  return (f, v) => (openBlock(), createElementBlock("div", z4, [createVNode(unref(Ie2), { gap: f.gap }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(c.value, (h3) => {
    return openBlock(), createElementBlock("div", { class: "m-upload-item", key: h3 }, [createBaseVNode("div", C4, [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-upload-wrap", { "upload-disabled": f.disabled }]), onDragenter: v[1] || (v[1] = withModifiers(() => {
    }, ["stop", "prevent"])), onDragover: v[2] || (v[2] = withModifiers(() => {
    }, ["stop", "prevent"])), onDrop: withModifiers((M) => f.disabled ? () => false : function(B, k) {
      var z;
      const x = (z = B.dataTransfer) == null ? void 0 : z.files;
      if (x != null && x.length) {
        const $ = x.length;
        for (let L = 0; L < $ && k + L <= e.maxCount; L++) r(x[L], k + L);
        u.value[k].value = "";
      }
    }(M, h3 - 1), ["stop", "prevent"]), onClick: (M) => f.disabled ? () => false : function(B) {
      u.value[B].click();
    }(h3 - 1) }, [createBaseVNode("input", { ref_for: true, ref_key: "uploadInput", ref: u, type: "file", onClick: v[0] || (v[0] = withModifiers(() => {
    }, ["stop"])), accept: f.accept, multiple: f.multiple, onChange: (M) => function(B, k) {
      const x = B.target.files;
      if (x != null && x.length) {
        const z = x.length;
        for (let $ = 0; $ < z && k + $ < e.maxCount; $++) r(x[$], k + $);
        u.value[k].value = "";
      }
    }(M, h3 - 1), style: { display: "none" } }, null, 40, B4), createBaseVNode("div", null, [F4, createBaseVNode("p", S4, [renderSlot(f.$slots, "default", {}, () => [createTextVNode(toDisplayString(f.tip), 1)], true)])])], 42, $4), [[vShow, !s.value[h3 - 1] && !t.value[h3 - 1]]]), withDirectives(createBaseVNode("div", L4, [createVNode(unref(Se2), { class: "u-spin", tip: f.uploadingTip, size: "small", indicator: "dynamic-circle" }, null, 8, ["tip"])], 512), [[vShow, s.value[h3 - 1]]]), t.value[h3 - 1] ? (openBlock(), createElementBlock("div", A4, [n(t.value[h3 - 1].url) ? (openBlock(), createBlock(unref(Qe), { key: 0, ref_for: true, ref_key: "imageRef", ref: w, bordered: false, width: 82, height: 82, src: t.value[h3 - 1].url, name: t.value[h3 - 1].name }, null, 8, ["src", "name"])) : (b = t.value[h3 - 1].url, /\.pdf$/i.test(b) || /^data:application\/pdf/.test(b) ? (openBlock(), createElementBlock("svg", D4, T4)) : (openBlock(), createElementBlock("svg", E4, H4))), createBaseVNode("div", I4, [createBaseVNode("a", { class: "m-icon", title: "预览", onClick: (M) => function(B, k) {
      if (console.log("isImage", n(k)), n(k)) {
        const x = t.value.slice(0, B).filter((z) => !n(z.url));
        w.value[B - x.length].preview(0);
      } else window.open(k);
    }(h3 - 1, t.value[h3 - 1].url) }, V4, 8, j4), withDirectives(createBaseVNode("a", { class: "m-icon", title: "删除", onClick: withModifiers((M) => function(B) {
      t.value.length < e.maxCount && c.value--;
      const k = t.value.splice(B, 1);
      m("remove", k), m("update:fileList", t.value), m("change", t.value);
    }(h3 - 1), ["prevent", "stop"]) }, W4, 8, R4), [[vShow, !f.disabled]])])])) : createCommentVNode("", true)])]);
    var b;
  }), 128))]), _: 3 }, 8, ["gap"]), createVNode(unref(Xe), { ref_key: "message", ref: p, duration: 3e3, top: 30 }, null, 512)]));
} });
var al = W(q4, [["__scopeId", "data-v-5c2a8bc9"]]);
al.install = (l) => {
  l.component(al.__name, al);
};
var N4 = ["src", "poster", "autoplay", "controls", "loop", "muted", "preload"];
var P4 = [((l) => (pushScopeId("data-v-4b9dcf19"), l = l(), popScopeId(), l))(() => createBaseVNode("svg", { class: "u-svg", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 34 34" }, [createBaseVNode("path", { d: `M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039
          C31.913,19.675,31.913,14.325,28.26,11.961z` })], -1))];
var ll = W(defineComponent({ __name: "Video", props: { src: { default: "" }, poster: { default: "" }, second: { default: 0.5 }, width: { default: 800 }, height: { default: 450 }, autoplay: { type: Boolean, default: false }, controls: { type: Boolean, default: true }, loop: { type: Boolean, default: false }, muted: { type: Boolean, default: false }, preload: { default: "metadata" }, showPlay: { type: Boolean, default: true }, fit: { default: "contain" } }, setup(l) {
  const a = l, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), t = computed(() => typeof a.height == "number" ? a.height + "px" : a.height), c = ref(), s = ref(a.poster), u = ref(true), n = ref(false);
  function m() {
    var r, w;
    u.value && (c.value.currentTime = 0, u.value = false), a.autoplay ? (r = c.value) == null || r.pause() : (n.value = true, (w = c.value) == null || w.play());
  }
  return onMounted(() => {
    a.autoplay && (n.value = true, u.value = false);
  }), (r, w) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-video", { "video-hover": !n.value }]), style: normalizeStyle(`width: ${e.value}; height: ${t.value};`) }, [createBaseVNode("video", mergeProps({ ref_key: "veoRef", ref: c, class: "u-video", style: `object-fit: ${r.fit};`, src: r.src, poster: s.value, autoplay: r.autoplay, controls: !u.value && r.controls, loop: r.loop, muted: r.autoplay || r.muted, preload: r.preload, crossorigin: "anonymous", onLoadedmetadata: w[0] || (w[0] = (p) => r.poster ? () => false : function() {
    c.value.currentTime = a.second;
    const g = document.createElement("canvas"), f = g.getContext("2d");
    g.width = c.value.videoWidth, g.height = c.value.videoHeight, f == null || f.drawImage(c.value, 0, 0, g.width, g.height), s.value = g.toDataURL("image/png");
  }()), onPause: w[1] || (w[1] = (p) => r.showPlay ? void (n.value = false) : () => false), onPlaying: w[2] || (w[2] = (p) => r.showPlay ? void (n.value = true) : () => false), onClickOnce: withModifiers(m, ["prevent"]) }, r.$attrs), " 您的浏览器不支持video标签。 ", 16, N4), withDirectives(createBaseVNode("span", { class: normalizeClass(["m-icon-play", { hidden: n.value }]) }, P4, 2), [[vShow, u.value || r.showPlay]])], 6));
} }), [["__scopeId", "data-v-4b9dcf19"]]);
ll.install = (l) => {
  l.component(ll.__name, ll);
};
var O4 = ["src", "alt", "onLoad"];
var K4 = defineComponent({ __name: "Waterfall", props: { images: { default: () => [] }, columnCount: { default: 3 }, columnGap: { default: 20 }, width: { default: "100%" }, borderRadius: { default: 8 }, backgroundColor: { default: "#F2F4F8" } }, setup(l) {
  const a = l, e = ref(), t = ref(), c = ref(Array(a.images.length).fill(false)), s = ref(), u = ref([]), n = ref(Array(a.columnCount).fill(0)), m = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), r = computed(() => Math.max(...n.value) + a.columnGap), w = computed(() => a.images.length), p = ref(0);
  async function g(h3) {
    s.value = (t.value - (a.columnCount + 1) * a.columnGap) / a.columnCount, u.value.splice(0);
    for (let b = 0; b < w.value; b++) {
      if (h3 !== p.value) return false;
      await f(a.images[b].src, b);
    }
  }
  function f(h3, b) {
    return new Promise((M) => {
      const B = new Image();
      B.src = h3, B.onload = function() {
        const k = B.height / (B.width / s.value);
        u.value[b] = { width: s.value, height: k, ...v(b, k) }, M("load");
      };
    });
  }
  function v(h3, b) {
    if (h3 < a.columnCount) return n.value[h3] = a.columnGap + b, { top: a.columnGap, left: (s.value + a.columnGap) * h3 + a.columnGap };
    {
      const M = Math.min(...n.value);
      let B = 0;
      for (let k = 0; k < a.columnCount; k++) if (n.value[k] === M) {
        B = k;
        break;
      }
      return n.value[B] = M + a.columnGap + b, { top: M + a.columnGap, left: (s.value + a.columnGap) * B + a.columnGap };
    }
  }
  return watch(() => [a.images, a.columnCount, a.columnGap, a.width], () => {
    t.value = e.value.offsetWidth, n.value = Array(a.columnCount).fill(0), p.value++, g(p.value);
  }, { deep: true, flush: "post" }), onMounted(() => {
    t.value = e.value.offsetWidth, g(p.value);
  }), Ke2(e, function() {
    const h3 = e.value.offsetWidth;
    a.images.length && h3 !== t.value && (t.value = h3, p.value++, g(p.value));
  }), (h3, b) => (openBlock(), createElementBlock("div", { class: "m-waterfall", ref_key: "waterfallRef", ref: e, style: normalizeStyle(`--border-radius: ${h3.borderRadius}px; background-color: ${h3.backgroundColor}; width: ${m.value}; height: ${r.value}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(u.value, (M, B) => (openBlock(), createBlock(unref(Se2), { class: "m-image", style: normalizeStyle(`width: ${M.width}px; height: ${M.height}px; top: ${M && M.top}px; left: ${M && M.left}px;`), spinning: !c.value[B], size: "small", indicator: "dynamic-circle", key: B }, { default: withCtx(() => [createBaseVNode("img", { class: "u-image", src: h3.images[B].src, alt: h3.images[B].title, onLoad: (k) => function(x) {
    c.value[x] = true;
  }(B) }, null, 40, O4)]), _: 2 }, 1032, ["style", "spinning"]))), 128))], 4));
} });
var tl = W(K4, [["__scopeId", "data-v-45e82f09"]]);
tl.install = (l) => {
  l.component(tl.__name, tl);
};
var ol = defineComponent({ __name: "Watermark", props: { width: { default: void 0 }, height: { default: void 0 }, layout: { default: "alternate" }, rotate: { default: -22 }, zIndex: { default: 90 }, image: { default: void 0 }, content: { default: "" }, fullscreen: { type: Boolean, default: false }, color: { default: "rgba(0,0,0,.15)" }, fontSize: { default: 16 }, fontWeight: { default: "normal" }, fontFamily: { default: "sans-serif" }, fontStyle: { default: "normal" }, gap: { default: () => [100, 100] }, offset: { default: () => [50, 50] } }, setup(l) {
  const a = l, e = shallowRef(), t = shallowRef(), c = shallowRef(document.documentElement), s = shallowRef(false), u = computed(() => {
    var x;
    return ((x = a.gap) == null ? void 0 : x[0]) ?? 100;
  }), n = computed(() => {
    var x;
    return ((x = a.gap) == null ? void 0 : x[1]) ?? 100;
  }), m = computed(() => u.value / 2), r = computed(() => n.value / 2), w = computed(() => {
    var x;
    return ((x = a.offset) == null ? void 0 : x[0]) ?? m.value;
  }), p = computed(() => {
    var x;
    return ((x = a.offset) == null ? void 0 : x[1]) ?? r.value;
  }), g = computed(() => ({ parallel: 1, alternate: 2 })[a.layout]), f = computed(() => {
    const x = { zIndex: a.zIndex ?? 9, position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", backgroundRepeat: "repeat" };
    let z = w.value - m.value, $ = p.value - r.value;
    return z > 0 && (x.left = `${z}px`, x.width = `calc(100% - ${z}px)`, z = 0), $ > 0 && (x.top = `${$}px`, x.height = `calc(100% - ${$}px)`, $ = 0), x.backgroundPosition = `${z}px ${$}px`, x;
  });
  function v() {
    t.value && (t.value.remove(), t.value = void 0);
  }
  function h3(x, z) {
    var L;
    var $;
    e.value && t.value && (s.value = true, t.value.setAttribute("style", ($ = { ...f.value, backgroundImage: `url('${x}')`, backgroundSize: (u.value + z) * g.value + "px" }, Object.keys($).map((T) => `${function(V) {
      return V.replace(/([A-Z])/g, "-$1").toLowerCase();
    }(T)}: ${$[T]};`).join(" "))), a.fullscreen ? (c.value.setAttribute("style", "position: relative"), c.value.append(t.value)) : (L = e.value) == null || L.append(t.value), setTimeout(() => {
      s.value = false;
    }));
  }
  function b() {
    return window.devicePixelRatio || 1;
  }
  function M(x, z, $, L, T) {
    const V = b(), P = a.content, U = a.fontSize, G3 = a.fontWeight, E = a.fontFamily, H = a.fontStyle, N = a.color, te = Number(U) * V;
    x.font = `${H} normal ${G3} ${te}px/${T}px ${E}`, x.fillStyle = N, x.textAlign = "center", x.textBaseline = "top", x.translate(L / 2, 0);
    const de = Array.isArray(P) ? P : [P];
    de == null || de.forEach((O, ue) => {
      x.fillText(O ?? "", z, $ + ue * (te + 3 * V));
    });
  }
  function B() {
    const x = document.createElement("canvas"), z = x.getContext("2d"), $ = a.image, L = a.rotate ?? -22;
    if (z) {
      t.value || (t.value = document.createElement("div"));
      const T = b(), [V, P] = function(ne) {
        let ze2 = 120, Ae = 64;
        const j = a.content, Q = a.image, le = a.width, he = a.height, Ce2 = a.fontSize, pe = a.fontFamily;
        if (!Q && ne.measureText) {
          ne.font = `${Number(Ce2)}px ${pe}`;
          const De = Array.isArray(j) ? j : [j], ta2 = De.map((Tl2) => ne.measureText(Tl2).width);
          ze2 = Math.ceil(Math.max(...ta2)), Ae = Number(Ce2) * De.length + 3 * (De.length - 1);
        }
        return [le ?? ze2, he ?? Ae];
      }(z), U = (u.value + V) * T, G3 = (n.value + P) * T;
      x.setAttribute("width", U * g.value + "px"), x.setAttribute("height", G3 * g.value + "px");
      const E = u.value * T / 2, H = n.value * T / 2, N = V * T, te = P * T, de = (N + u.value * T) / 2, O = (te + n.value * T) / 2, ue = E + U, we = H + G3, ve = de + U, Me2 = O + G3;
      if (z.save(), k(z, de, O, L), $) {
        const ne = new Image();
        ne.onload = () => {
          z.drawImage(ne, E, H, N, te), z.restore(), k(z, ve, Me2, L), z.drawImage(ne, ue, we, N, te), h3(x.toDataURL(), V);
        }, ne.crossOrigin = "anonymous", ne.referrerPolicy = "no-referrer", ne.src = $;
      } else M(z, E, H, N, te), z.restore(), k(z, ve, Me2, L), M(z, ue, we, N, te), h3(x.toDataURL(), V);
    }
  }
  function k(x, z, $, L) {
    x.translate(z, $), x.rotate(Math.PI / 180 * Number(L)), x.translate(-z, -$);
  }
  return onMounted(() => {
    B();
  }), watch(() => [a], () => {
    B();
  }, { deep: true, flush: "post" }), onBeforeUnmount(() => {
    v();
  }), pl2(a.fullscreen ? c : e, function(x) {
    s.value || x.forEach((z) => {
      (function($, L) {
        let T = false;
        return $.removedNodes.length && (T = Array.from($.removedNodes).some((V) => V === L)), $.type === "attributes" && $.target === L && (T = true), T;
      })(z, t.value) && (v(), B());
    });
  }, { subtree: true, childList: true, attributes: true, attributeFilter: ["style", "class"] }), (x, z) => (openBlock(), createElementBlock("div", { ref_key: "containerRef", ref: e, style: { position: "relative" } }, [renderSlot(x.$slots, "default")], 512));
} });
ol.install = (l) => {
  l.component(ol.__name, ol);
};
var Y4 = [sa2, na, ia, ua, ca2, $e, ra, da2, va2, pa, Ca2, fa2, ha, ma2, ga, ya, wa, ka, ba, xa, qe2, Ma, _a2, Qe, $a2, Ba2, Fa2, Sa2, Xe, La, Aa2, Da, Je2, Ta2, Ea2, Ha2, Ia, ja2, Va2, Ra2, za2, Wa2, qa2, Ee, Ge2, Na2, Ie2, Se2, Pa2, Oa2, Ka2, Ya2, Ua2, Ga2, Za, Qa2, Xa2, Ja2, el, Ze, al, ll, tl, ol];
var i0 = { install: function(l) {
  Y4.forEach((a) => l.component(a.__name, a));
} };
export {
  sa2 as Alert,
  na as Avatar,
  ia as BackTop,
  ua as Badge,
  ca2 as Breadcrumb,
  $e as Button,
  ra as Card,
  da2 as Carousel,
  va2 as Cascader,
  pa as Checkbox,
  Ca2 as Col,
  fa2 as Collapse,
  ha as Countdown,
  ma2 as DatePicker,
  ga as Descriptions,
  ya as DescriptionsItem,
  wa as Dialog,
  ka as Divider,
  ba as Drawer,
  xa as Ellipsis,
  qe2 as Empty,
  Ma as Flex,
  _a2 as GradientText,
  Qe as Image,
  $a2 as Input,
  Ba2 as InputNumber,
  Fa2 as Layout,
  Sa2 as List,
  Xe as Message,
  La as Modal,
  Aa2 as Notification,
  Da as NumberAnimation,
  Je2 as Pagination,
  Ta2 as Popconfirm,
  Ea2 as Popover,
  Ha2 as Progress,
  Ia as QRCode,
  ja2 as Radio,
  Va2 as Rate,
  Ra2 as Result,
  za2 as Row,
  Wa2 as Scrollbar,
  qa2 as Segmented,
  Ee as Select,
  Ge2 as Skeleton,
  Na2 as Slider,
  Ie2 as Space,
  Se2 as Spin,
  Pa2 as Statistic,
  Oa2 as Steps,
  Ka2 as Swiper,
  Ya2 as Switch,
  Ua2 as Table,
  Ga2 as Tabs,
  Za as Tag,
  Xa2 as TextScroll,
  Qa2 as Textarea,
  el as TimePicker,
  Ja2 as Timeline,
  Ze as Tooltip,
  al as Upload,
  ll as Video,
  tl as Waterfall,
  ol as Watermark,
  Ue as add,
  ce as cancelRaf,
  e0 as dateFormat,
  a0 as debounce,
  i0 as default,
  l0 as downloadFile,
  Ml2 as formatNumber,
  be as rafTimeout,
  je2 as throttle,
  t0 as toggleDark,
  Re as useEventListener,
  s0 as useFps,
  n0 as useMediaQuery,
  pl2 as useMutationObserver,
  Ke2 as useResizeObserver,
  o0 as useScrollDirection
};
//# sourceMappingURL=vue-amazing-ui.js.map
