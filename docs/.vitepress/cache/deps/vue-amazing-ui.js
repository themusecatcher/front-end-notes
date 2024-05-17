import {
  TransitionPresets,
  isClient,
  toRef as toRef2,
  useTransition
} from "./chunk-U4YG4YF4.js";
import "./chunk-QT3Z7FRT.js";
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
} from "./chunk-D4D2XWKF.js";
import {
  __commonJS,
  __publicField,
  __toESM
} from "./chunk-UV5CTPV7.js";

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
      if (!version)
        throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40)
        throw new Error('"version" should be in range from 1 to 40');
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
      if (reserved)
        this.reservedBit[index] = true;
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
      if (version === 1)
        return [];
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
            if (sameCountCol >= 5)
              points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module2;
            sameCountCol = 1;
          }
          module2 = data.get(col, row);
          if (module2 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5)
              points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module2;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5)
          points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5)
          points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0)
            points++;
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
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93))
            points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93))
            points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i = 0; i < modulesCount; i++)
        darkCount += data.data[i];
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
          if (data.isReserved(row, col))
            continue;
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
      if (n < 1)
        throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports.mul = function mul(x, y) {
      if (x === 0 || y === 0)
        return 0;
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
        while (offset < result.length && result[offset] === 0)
          offset++;
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
      if (this.degree)
        this.initialize(this.degree);
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
      if (!mode.ccBits)
        throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10)
        return mode.ccBits[0];
      else if (version < 27)
        return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr))
        return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr))
        return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr))
        return exports.KANJI;
      else
        return exports.BYTE;
    };
    exports.toString = function toString(mode) {
      if (mode && mode.id)
        return mode.id;
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
      if (typeof mode === "undefined")
        mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED)
        return dataTotalCodewordsBits;
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
              if (table[prevNodeId])
                table[prevNodeId].lastCount = node.length;
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
          if (row + r <= -1 || size <= row + r)
            continue;
          for (let c = -1; c <= 7; c++) {
            if (col + c <= -1 || size <= col + c)
              continue;
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
        if (col === 6)
          col--;
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
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b = 0; b < ecTotalBlocks; b++) {
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b] = buffer.slice(offset, offset + dataSize);
        ecData[b] = rs.encode(dcData[b]);
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
      if (hexCode.length === 6)
        hexCode.push("F", "F");
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
      if (!options)
        options = {};
      if (!options.color)
        options.color = {};
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
      if (!canvas.style)
        canvas.style = {};
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
      if (!opts)
        opts = {};
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
      if (typeof y !== "undefined")
        str += " " + y;
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
        if (!col && !newRow)
          newRow = true;
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
  if (isNaN(amount))
    return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  _date.setDate(_date.getDate() + amount);
  return _date;
}

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/addMonths.mjs
function addMonths(date, amount) {
  const _date = toDate(date);
  if (isNaN(amount))
    return constructFrom(date, NaN);
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
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
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

// node_modules/.pnpm/date-fns@3.6.0/node_modules/date-fns/eachDayOfInterval.mjs
function eachDayOfInterval(interval, options) {
  const startDate = toDate(interval.start);
  const endDate = toDate(interval.end);
  let reversed = +startDate > +endDate;
  const endTime = reversed ? +startDate : +endDate;
  const currentDate = reversed ? endDate : startDate;
  currentDate.setHours(0, 0, 0, 0);
  let step = (options == null ? void 0 : options.step) ?? 1;
  if (!step)
    return [];
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
  if (!step)
    return [];
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
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
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
    if (!matchResult)
      return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
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
  var _a2, _b, _c, _d;
  const _date = toDate(date);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
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
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
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
      if (hours === 0)
        hours = 12;
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
    if (hours === 0)
      hours = 24;
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
  if (throwTokens.includes(token))
    throw new RangeError(_message);
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
  var _a2, _b, _c, _d, _e2, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
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
    if (!part.isToken)
      return part.value;
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
    if (flags.timestampIsSet)
      return date;
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
  var _a2, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
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
    if (flags.timestampIsSet)
      return date;
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
    if (flags.timestampIsSet)
      return date;
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
  var _a2, _b, _c, _d, _e2, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions2();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a2 = options == null ? void 0 : options.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
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

// node_modules/.pnpm/@vuepic+vue-datepicker@8.5.0_vue@3.4.27/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Ot() {
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
Ot.compatConfig = {
  MODE: 3
};
function yn() {
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
yn.compatConfig = {
  MODE: 3
};
function Ea() {
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
Ea.compatConfig = {
  MODE: 3
};
function Fa() {
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
Fa.compatConfig = {
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
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      createBaseVNode("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
La.compatConfig = {
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
      class: "dp__icon"
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
var ot = (e, t) => t ? new Date(e.toLocaleString("en-US", { timeZone: t })) : new Date(e);
var hn = (e, t) => {
  const r = Oa(e, t);
  return r || K();
};
var al = (e, t) => t.dateInTz ? ot(new Date(e), t.dateInTz) : K(e);
var Oa = (e, t) => {
  if (!e)
    return null;
  if (!t)
    return K(e);
  const r = K(e);
  return t.exactMatch ? al(e, t) : ot(r, t.timezone);
};
var nl = (e) => {
  if (!e)
    return 0;
  const t = /* @__PURE__ */ new Date(), r = new Date(t.toLocaleString("en-US", { timeZone: "UTC" })), n = new Date(t.toLocaleString("en-US", { timeZone: e })), a = n.getTimezoneOffset() / 60;
  return (+r - +n) / (1e3 * 60 * 60) - a;
};
function en(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function ll(e) {
  return (t) => format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "EEEEEE", { locale: e });
}
var rl = (e, t, r) => {
  const n = [1, 2, 3, 4, 5, 6, 7];
  let a;
  if (e !== null)
    try {
      a = n.map(ll(e));
    } catch {
      a = n.map(en(t));
    }
  else
    a = n.map(en(t));
  const f = a.slice(0, r), v = a.slice(r + 1, a.length);
  return [a[r]].concat(...v).concat(...f);
};
var Ha = (e, t, r) => {
  const n = [];
  for (let a = +e[0]; a <= +e[1]; a++)
    n.push({ value: +a, text: Mn(a, t) });
  return r ? n.reverse() : n;
};
var bn = (e, t, r) => {
  const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((f) => {
    const v = f < 10 ? `0${f}` : f;
    return /* @__PURE__ */ new Date(`2017-${v}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const f = r === "long" ? "MMMM" : "MMM";
      return n.map((v, o) => {
        const O = format(ot(v, "UTC"), f, { locale: e });
        return {
          text: O.charAt(0).toUpperCase() + O.substring(1),
          value: o
        };
      });
    } catch {
    }
  const a = new Intl.DateTimeFormat(t, { month: r, timeZone: "UTC" });
  return n.map((f, v) => {
    const o = a.format(f);
    return {
      text: o.charAt(0).toUpperCase() + o.substring(1),
      value: v
    };
  });
};
var ol = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ie = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var sl = (e) => ({ type: "dot", ...e ?? {} });
var kn = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var za = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Be = (e) => e;
var tn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var an = (e) => e === null;
var wn = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var ul = (e) => {
  const t = [], r = (n) => n.filter((a) => a);
  for (let n = 0; n < e.length; n += 3) {
    const a = [e[n], e[n + 1], e[n + 2]];
    t.push(r(a));
  }
  return t;
};
var Ht = (e, t, r) => {
  const n = r != null, a = t != null;
  if (!n && !a)
    return false;
  const f = +r, v = +t;
  return n && a ? +e > f || +e < v : n ? +e > f : a ? +e < v : false;
};
var Rt = (e, t) => ul(e).map((r) => r.map((n) => {
  const { active: a, disabled: f, isBetween: v, highlighted: o } = t(n);
  return {
    ...n,
    active: a,
    disabled: f,
    className: {
      dp__overlay_cell_active: a,
      dp__overlay_cell: !a,
      dp__overlay_cell_disabled: f,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: f && a,
      dp__cell_in_between: v,
      "dp--highlighted": o
    }
  };
}));
var ft = (e, t, r = false) => {
  e && t.allowStopPropagation && (r && e.stopImmediatePropagation(), e.stopPropagation());
};
var il = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function dl(e, t) {
  let r = [...document.querySelectorAll(il())];
  r = r.filter((a) => !e.contains(a) || a.hasAttribute("data-datepicker-instance"));
  const n = r.indexOf(e);
  if (n >= 0 && (t ? n - 1 >= 0 : n + 1 <= r.length))
    return r[n + (t ? -1 : 1)];
}
var cl = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var Mn = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var Ua = (e) => format(e, "dd-MM-yyyy");
var ka = (e) => Array.isArray(e);
var aa = (e, t) => t.get(Ua(e));
var fl = (e, t) => e ? t ? t instanceof Map ? !!aa(e, t) : t(K(e)) : false : true;
var nn = (e, t, r, n, a, f) => {
  const v = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: f });
  return isValid(v) && isDate(v) ? n || a ? v : set(v, {
    hours: +r.hours,
    minutes: +(r == null ? void 0 : r.minutes),
    seconds: +(r == null ? void 0 : r.seconds),
    milliseconds: 0
  }) : null;
};
var vl = (e, t, r, n, a, f) => {
  const v = Array.isArray(r) ? r[0] : r;
  if (typeof t == "string")
    return nn(e, t, v, n, a, f);
  if (Array.isArray(t)) {
    let o = null;
    for (const O of t)
      if (o = nn(e, O, v, n, a, f), o)
        break;
    return o;
  }
  return typeof t == "function" ? t(e) : null;
};
var K = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var ml = (e, t, r) => {
  if (t) {
    const a = (e.getMonth() + 1).toString().padStart(2, "0"), f = e.getDate().toString().padStart(2, "0"), v = e.getHours().toString().padStart(2, "0"), o = e.getMinutes().toString().padStart(2, "0"), O = r ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${a}-${f}T${v}:${o}:${O}.000Z`;
  }
  const n = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
  return new Date(n).toISOString();
};
var Qe = (e) => {
  let t = K(JSON.parse(JSON.stringify(e)));
  return t = setHours(t, 0), t = setMinutes(t, 0), t = setSeconds(t, 0), t = setMilliseconds(t, 0), t;
};
var vt = (e, t, r, n) => {
  let a = e ? K(e) : K();
  return (t || t === 0) && (a = setHours(a, +t)), (r || r === 0) && (a = setMinutes(a, +r)), (n || n === 0) && (a = setSeconds(a, +n)), setMilliseconds(a, 0);
};
var Ce = (e, t) => !e || !t ? false : isBefore(Qe(e), Qe(t));
var be = (e, t) => !e || !t ? false : isEqual(Qe(e), Qe(t));
var Oe = (e, t) => !e || !t ? false : isAfter(Qe(e), Qe(t));
var ra = (e, t, r) => e != null && e[0] && (e != null && e[1]) ? Oe(r, e[0]) && Ce(r, e[1]) : e != null && e[0] && t ? Oe(r, e[0]) && Ce(r, t) || Ce(r, e[0]) && Oe(r, t) : false;
var Ze = (e) => {
  const t = set(new Date(e), { date: 1 });
  return Qe(t);
};
var wa = (e, t, r) => t && (r || r === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((n) => n === t ? [n, r] : [n, isNaN(+e[n]) ? void 0 : +e[n]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
};
var wt = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
});
var Dn = (e, t) => {
  if (t) {
    const r = getYear(K(t));
    if (r > e)
      return 12;
    if (r === e)
      return getMonth(K(t));
  }
};
var $n = (e, t) => {
  if (t) {
    const r = getYear(K(t));
    return r < e ? -1 : r === e ? getMonth(K(t)) : void 0;
  }
};
var Ct = (e) => {
  if (e)
    return getYear(K(e));
};
var An = (e, t) => {
  const r = Oe(e, t) ? t : e, n = Oe(t, e) ? t : e;
  return eachDayOfInterval({ start: r, end: n });
};
var pl = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var st = (e, t) => {
  const r = startOfWeek(e, { weekStartsOn: +t }), n = endOfWeek(e, { weekStartsOn: +t });
  return [r, n];
};
var Tn = (e, t) => {
  const r = {
    hours: getHours(K()),
    minutes: getMinutes(K()),
    seconds: t ? getSeconds(K()) : 0
  };
  return Object.assign(r, e);
};
var ct = (e, t, r) => [set(K(e), { date: 1 }), set(K(), { month: t, year: r, date: 1 })];
var ut = (e, t, r) => {
  let n = e ? K(e) : K();
  return (t || t === 0) && (n = setMonth(n, t)), r && (n = setYear(n, r)), n;
};
var Sn = (e, t, r, n, a) => {
  if (!n || a && !t || !a && !r)
    return false;
  const f = a ? addMonths(e, 1) : subMonths(e, 1), v = [getMonth(f), getYear(f)];
  return a ? !yl(...v, t) : !gl(...v, r);
};
var gl = (e, t, r) => Ce(...ct(r, e, t)) || be(...ct(r, e, t));
var yl = (e, t, r) => Oe(...ct(r, e, t)) || be(...ct(r, e, t));
var Pn = (e, t, r, n, a, f, v) => {
  if (typeof t == "function" && !v)
    return t(e);
  const o = r ? { locale: r } : void 0;
  return Array.isArray(e) ? `${format(e[0], f, o)}${a && !e[1] ? "" : n}${e[1] ? format(e[1], f, o) : ""}` : format(e, f, o);
};
var $t = (e) => {
  if (e)
    return null;
  throw new Error(za.prop("partial-range"));
};
var Jt = (e, t) => {
  if (t)
    return e();
  throw new Error(za.prop("range"));
};
var Ba = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var hl = (e, t) => set(t ?? K(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var Ma = (e, t, r, n) => {
  if (!e)
    return true;
  if (n) {
    const a = r === "max" ? isBefore(e, t) : isAfter(e, t), f = { seconds: 0, milliseconds: 0 };
    return a || isEqual(set(e, f), set(t, f));
  }
  return r === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
};
var Da = (e, t, r) => e ? hl(e, t) : K(r ?? t);
var ln = (e, t, r, n, a) => {
  if (Array.isArray(n)) {
    const v = Da(e, n[0], t), o = Da(e, n[1], t);
    return Ma(n[0], v, r, !!t) && Ma(n[1], o, r, !!t) && a;
  }
  const f = Da(e, n, t);
  return Ma(n, f, r, !!t) && a;
};
var $a = (e) => set(K(), wt(e));
var bl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((r) => getYear(K(r)) === t).map((r) => getMonth(r)) : [];
var Rn = (e, t, r) => typeof e == "function" ? e({ month: t, year: r }) : !!e.months.find((n) => n.month === t && n.year === r);
var Ka = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var Et = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Cn = () => {
  const e = (n) => {
    Et.menuFocused = n;
  }, t = (n) => {
    Et.shiftKeyInMenu !== n && (Et.shiftKeyInMenu = n);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Et.shiftKeyInMenu, menuFocused: Et.menuFocused })),
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
var Aa = ref(null);
var Zt = ref(false);
var Ta = ref(false);
var Sa = ref(false);
var Pa = ref(false);
var Fe = ref(0);
var _e = ref(0);
var pt = () => {
  const e = computed(() => Zt.value ? [...Se.selectionGrid, Se.actionRow].filter((C) => C.length) : Ta.value ? [
    ...Se.timePicker[0],
    ...Se.timePicker[1],
    Pa.value ? [] : [Aa.value],
    Se.actionRow
  ].filter((C) => C.length) : Sa.value ? [...Se.monthPicker, Se.actionRow] : [Se.monthYear, ...Se.calendar, Se.time, Se.actionRow].filter((C) => C.length)), t = (C) => {
    Fe.value = C ? Fe.value + 1 : Fe.value - 1;
    let L = null;
    e.value[_e.value] && (L = e.value[_e.value][Fe.value]), !L && e.value[_e.value + (C ? 1 : -1)] ? (_e.value = _e.value + (C ? 1 : -1), Fe.value = C ? 0 : e.value[_e.value].length - 1) : L || (Fe.value = C ? Fe.value - 1 : Fe.value + 1);
  }, r = (C) => {
    if (_e.value === 0 && !C || _e.value === e.value.length && C)
      return;
    _e.value = C ? _e.value + 1 : _e.value - 1, e.value[_e.value] ? e.value[_e.value] && !e.value[_e.value][Fe.value] && Fe.value !== 0 && (Fe.value = e.value[_e.value].length - 1) : _e.value = C ? _e.value - 1 : _e.value + 1;
  }, n = (C) => {
    let L = null;
    e.value[_e.value] && (L = e.value[_e.value][Fe.value]), L ? L.focus({ preventScroll: !Zt.value }) : Fe.value = C ? Fe.value - 1 : Fe.value + 1;
  }, a = () => {
    t(true), n(true);
  }, f = () => {
    t(false), n(false);
  }, v = () => {
    r(false), n(true);
  }, o = () => {
    r(true), n(true);
  }, O = (C, L) => {
    Se[L] = C;
  }, B = (C, L) => {
    Se[L] = C;
  }, y = () => {
    Fe.value = 0, _e.value = 0;
  };
  return {
    buildMatrix: O,
    buildMultiLevelMatrix: B,
    setTimePickerBackRef: (C) => {
      Aa.value = C;
    },
    setSelectionGrid: (C) => {
      Zt.value = C, y(), C || (Se.selectionGrid = []);
    },
    setTimePicker: (C, L = false) => {
      Ta.value = C, Pa.value = L, y(), C || (Se.timePicker[0] = [], Se.timePicker[1] = []);
    },
    setTimePickerElements: (C, L = 0) => {
      Se.timePicker[L] = C;
    },
    arrowRight: a,
    arrowLeft: f,
    arrowUp: v,
    arrowDown: o,
    clearArrowNav: () => {
      Se.monthYear = [], Se.calendar = [], Se.time = [], Se.actionRow = [], Se.selectionGrid = [], Se.timePicker[0] = [], Se.timePicker[1] = [], Zt.value = false, Ta.value = false, Pa.value = false, Sa.value = false, y(), Aa.value = null;
    },
    setMonthPicker: (C) => {
      Sa.value = C, y();
    },
    refSets: Se
    // exposed for testing
  };
};
var rn = (e) => ({
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
var kl = (e) => ({
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
var on = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var wl = (e) => {
  const t = typeof e == "object" && e, r = {
    static: true,
    solo: false
  };
  if (!e)
    return { ...r, count: on(false) };
  const n = t ? e : {}, a = t ? n.count ?? true : e, f = on(a);
  return Object.assign(r, n, { count: f });
};
var Ml = (e, t, r) => e || (typeof r == "string" ? r : t);
var Dl = (e) => typeof e == "boolean" ? e ? rn({}) : false : rn(e);
var $l = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var Al = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Tl = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var Sl = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var Pl = (e) => ({ ...{
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
  keepViewOnOffsetClick: false
}, ...e ?? {} });
var Rl = (e) => {
  const t = {
    dates: Array.isArray(e) ? e.map((r) => K(r)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: false }
  };
  return typeof e == "function" ? e : { ...t, ...e ?? {} };
};
var Cl = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var _l = (e, t) => {
  const r = {
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
  return typeof e == "object" ? { enabled: true, ...r, ...e } : {
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
var Ol = (e, t) => e ? typeof e == "string" ? { timezone: e, exactMatch: false, dateInTz: void 0, emitTimezone: t, convertModel: true } : {
  timezone: e.timezone,
  exactMatch: e.exactMatch ?? false,
  dateInTz: e.dateInTz ?? void 0,
  emitTimezone: t ?? e.emitTimezone,
  convertModel: e.convertModel ?? true
} : { timezone: void 0, exactMatch: false, emitTimezone: t };
var Ra = (e, t) => new Map(
  e.map((r) => {
    const n = hn(r, t);
    return [Ua(n), n];
  })
);
var Bl = (e, t) => e.length ? new Map(
  e.map((r) => {
    const n = hn(r.date, t);
    return [Ua(n), r];
  })
) : null;
var Yl = (e, t, r, n, a, f, v) => ({
  minDate: Oa(e, v),
  maxDate: Oa(t, v),
  disabledDates: ka(r) ? Ra(r, v) : r,
  allowedDates: ka(n) ? Ra(n, v) : null,
  highlight: typeof a == "object" && ka(a == null ? void 0 : a.dates) ? Ra(a.dates, v) : a,
  markers: Bl(f, v)
});
var Il = (e, t) => typeof e == "boolean" ? { enabled: e, dragSelect: true, limit: +t } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? true
};
var Re = (e) => {
  const t = () => {
    const z = e.enableSeconds ? ":ss" : "", F = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${F}${z}` : `hh${F}${z} aa`;
  }, r = () => {
    var z;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((z = W.value) == null ? void 0 : z.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, n = (z) => Tn(z, e.enableSeconds), a = () => Y.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [n(e.startTime[0]), n(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? n(e.startTime) : null, f = computed(() => wl(e.multiCalendars)), v = computed(() => a()), o = computed(() => kl(e.ariaLabels)), O = computed(() => Al(e.filters)), B = computed(() => Dl(e.transitions)), y = computed(() => Tl(e.actionRow)), T = computed(
    () => Ml(e.previewFormat, e.format, r())
  ), b = computed(() => $l(e.textInput)), P = computed(() => Sl(e.inline)), V3 = computed(() => Pl(e.config)), D = computed(() => Rl(e.highlight)), W = computed(() => Cl(e.weekNumbers)), C = computed(() => Ol(e.timezone, e.emitTimezone)), L = computed(() => Il(e.multiDates, e.multiDatesLimit)), N = computed(
    () => Yl(
      e.minDate,
      e.maxDate,
      e.disabledDates,
      e.allowedDates,
      D.value,
      e.markers,
      C.value
    )
  ), Y = computed(
    () => _l(e.range, {
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
  );
  return {
    defaultedTransitions: B,
    defaultedMultiCalendars: f,
    defaultedStartTime: v,
    defaultedAriaLabels: o,
    defaultedFilters: O,
    defaultedActionRow: y,
    defaultedPreviewFormat: T,
    defaultedTextInput: b,
    defaultedInline: P,
    defaultedConfig: V3,
    defaultedHighlight: D,
    defaultedWeekNumbers: W,
    defaultedRange: Y,
    propDates: N,
    defaultedTz: C,
    defaultedMultiDates: L,
    getDefaultPattern: r,
    getDefaultStartTime: a
  };
};
var Je = ((e) => (e.month = "month", e.year = "year", e))(Je || {});
var ht = ((e) => (e.top = "top", e.bottom = "bottom", e))(ht || {});
var Mt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Mt || {});
var at = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(at || {});
var Nl = ["timestamp", "date", "iso"];
var El = (e, t, r) => {
  const n = ref(), { defaultedTextInput: a, defaultedRange: f, defaultedTz: v, defaultedMultiDates: o, getDefaultPattern: O } = Re(t), B = ref(""), y = toRef(t, "format"), T = toRef(t, "formatLocale");
  watch(
    n,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", n.value, R(true));
    },
    { deep: true }
  ), watch(y, () => {
    p();
  });
  const b = (d) => v.value.timezone && v.value.convertModel ? ot(d, v.value.timezone) : d, P = (d) => {
    if (v.value.timezone && v.value.convertModel) {
      const le = nl(v.value.timezone);
      return addHours(d, le);
    }
    return d;
  }, V3 = (d, le, l = false) => Pn(
    d,
    t.format,
    t.formatLocale,
    a.value.rangeSeparator,
    t.modelAuto,
    le ?? O(),
    l
  ), D = (d) => d ? t.modelType ? I(d) : {
    hours: getHours(d),
    minutes: getMinutes(d),
    seconds: t.enableSeconds ? getSeconds(d) : 0
  } : null, W = (d) => t.modelType ? I(d) : { month: getMonth(d), year: getYear(d) }, C = (d) => Array.isArray(d) ? o.value.enabled ? d.map((le) => L(le, setYear(K(), le))) : Jt(
    () => [
      setYear(K(), d[0]),
      d[1] ? setYear(K(), d[1]) : $t(f.value.partialRange)
    ],
    f.value.enabled
  ) : setYear(K(), +d), L = (d, le) => (typeof d == "string" || typeof d == "number") && t.modelType ? X(d) : le, N = (d) => Array.isArray(d) ? [
    L(
      d[0],
      vt(null, +d[0].hours, +d[0].minutes, d[0].seconds)
    ),
    L(
      d[1],
      vt(null, +d[1].hours, +d[1].minutes, d[1].seconds)
    )
  ] : L(d, vt(null, d.hours, d.minutes, d.seconds)), Y = (d) => {
    const le = set(K(), { date: 1 });
    return Array.isArray(d) ? o.value.enabled ? d.map((l) => L(l, ut(le, +l.month, +l.year))) : Jt(
      () => [
        L(d[0], ut(le, +d[0].month, +d[0].year)),
        L(
          d[1],
          d[1] ? ut(le, +d[1].month, +d[1].year) : $t(f.value.partialRange)
        )
      ],
      f.value.enabled
    ) : L(d, ut(le, +d.month, +d.year));
  }, z = (d) => {
    if (Array.isArray(d))
      return d.map((le) => X(le));
    throw new Error(za.dateArr("multi-dates"));
  }, F = (d) => {
    if (Array.isArray(d) && f.value.enabled) {
      const le = d[0], l = d[1];
      return [
        K(Array.isArray(le) ? le[0] : null),
        K(Array.isArray(l) ? l[0] : null)
      ];
    }
    return K(d[0]);
  }, Z = (d) => t.modelAuto ? Array.isArray(d) ? [X(d[0]), X(d[1])] : t.autoApply ? [X(d)] : [X(d), null] : Array.isArray(d) ? Jt(
    () => d[1] ? [
      X(d[0]),
      d[1] ? X(d[1]) : $t(f.value.partialRange)
    ] : [X(d[0])],
    f.value.enabled
  ) : X(d), h3 = () => {
    Array.isArray(n.value) && f.value.enabled && n.value.length === 1 && n.value.push($t(f.value.partialRange));
  }, ie = () => {
    const d = n.value;
    return [
      I(d[0]),
      d[1] ? I(d[1]) : $t(f.value.partialRange)
    ];
  }, oe = () => n.value[1] ? ie() : I(Be(n.value[0])), re = () => (n.value || []).map((d) => I(d)), _ = (d = false) => (d || h3(), t.modelAuto ? oe() : o.value.enabled ? re() : Array.isArray(n.value) ? Jt(() => ie(), f.value.enabled) : I(Be(n.value))), H = (d) => !d || Array.isArray(d) && !d.length ? null : t.timePicker ? N(Be(d)) : t.monthPicker ? Y(Be(d)) : t.yearPicker ? C(Be(d)) : o.value.enabled ? z(Be(d)) : t.weekPicker ? F(Be(d)) : Z(Be(d)), te = (d) => {
    const le = H(d);
    Ba(Be(le)) ? (n.value = Be(le), p()) : (n.value = null, B.value = "");
  }, E = () => {
    const d = (le) => format(le, a.value.format);
    return `${d(n.value[0])} ${a.value.rangeSeparator} ${n.value[1] ? d(n.value[1]) : ""}`;
  }, c = () => r.value && n.value ? Array.isArray(n.value) ? E() : format(n.value, a.value.format) : V3(n.value), A = () => n.value ? o.value.enabled ? n.value.map((d) => V3(d)).join("; ") : a.value.enabled && typeof a.value.format == "string" ? c() : V3(n.value) : "", p = () => {
    !t.format || typeof t.format == "string" || a.value.enabled && typeof a.value.format == "string" ? B.value = A() : B.value = t.format(n.value);
  }, X = (d) => {
    if (t.utc) {
      const le = new Date(d);
      return t.utc === "preserve" ? new Date(le.getTime() + le.getTimezoneOffset() * 6e4) : le;
    }
    return t.modelType ? Nl.includes(t.modelType) ? b(new Date(d)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? b(
      parse(d, O(), /* @__PURE__ */ new Date(), { locale: T.value })
    ) : b(
      parse(d, t.modelType, /* @__PURE__ */ new Date(), { locale: T.value })
    ) : b(new Date(d));
  }, I = (d) => d ? t.utc ? ml(d, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +P(d) : t.modelType === "iso" ? P(d).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? V3(P(d)) : V3(P(d), t.modelType, true) : P(d) : "", m = (d, le = false, l = false) => {
    if (l)
      return d;
    if (e("update:model-value", d), v.value.emitTimezone && le) {
      const S = Array.isArray(d) ? d.map((x) => ot(Be(x), v.value.emitTimezone)) : ot(Be(d), v.value.emitTimezone);
      e("update:model-timezone-value", S);
    }
  }, U = (d) => Array.isArray(n.value) ? o.value.enabled ? n.value.map((le) => d(le)) : [
    d(n.value[0]),
    n.value[1] ? d(n.value[1]) : $t(f.value.partialRange)
  ] : d(Be(n.value)), ne = () => {
    if (Array.isArray(n.value)) {
      const d = st(n.value[0], t.weekStart), le = n.value[1] ? st(n.value[1], t.weekStart) : [];
      return [d.map((l) => K(l)), le.map((l) => K(l))];
    }
    return st(n.value, t.weekStart).map((d) => K(d));
  }, u = (d, le) => m(Be(U(d)), false, le), k = (d) => {
    const le = ne();
    return d ? le : e("update:model-value", ne());
  }, R = (d = false) => (p(), t.monthPicker ? u(W, d) : t.timePicker ? u(D, d) : t.yearPicker ? u(getYear, d) : t.weekPicker ? k(d) : m(_(d), true, d));
  return {
    inputValue: B,
    internalModelValue: n,
    checkBeforeEmit: () => n.value ? f.value.enabled ? f.value.partialRange ? n.value.length >= 1 : n.value.length === 2 : !!n.value : false,
    parseExternalModelValue: te,
    formatInputValue: p,
    emitModelValue: R
  };
};
var Fl = (e, t) => {
  const { defaultedFilters: r, propDates: n } = Re(e), { validateMonthYearInRange: a } = gt(e), f = (y, T) => {
    let b = y;
    return r.value.months.includes(getMonth(b)) ? (b = T ? addMonths(y, 1) : subMonths(y, 1), f(b, T)) : b;
  }, v = (y, T) => {
    let b = y;
    return r.value.years.includes(getYear(b)) ? (b = T ? addYears(y, 1) : subYears(y, 1), v(b, T)) : b;
  }, o = (y, T = false) => {
    const b = set(K(), { month: e.month, year: e.year });
    let P = y ? addMonths(b, 1) : subMonths(b, 1);
    e.disableYearSelect && (P = setYear(P, e.year));
    let V3 = getMonth(P), D = getYear(P);
    r.value.months.includes(V3) && (P = f(P, y), V3 = getMonth(P), D = getYear(P)), r.value.years.includes(D) && (P = v(P, y), D = getYear(P)), a(V3, D, y, e.preventMinMaxNavigation) && O(V3, D, T);
  }, O = (y, T, b) => {
    t("update-month-year", { month: y, year: T, fromNav: b });
  }, B = computed(() => (y) => Sn(
    set(K(), { month: e.month, year: e.year }),
    n.value.maxDate,
    n.value.minDate,
    e.preventMinMaxNavigation,
    y
  ));
  return { handleMonthYearChange: o, isDisabled: B, updateMonthYear: O };
};
var At = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(At || {});
var Ll = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: r,
  pickerWrapperRef: n,
  inline: a,
  emit: f,
  props: v,
  slots: o
}) => {
  const O = ref({}), B = ref(false), y = ref({
    top: "0",
    left: "0"
  }), T = ref(false), b = toRef(v, "teleportCenter");
  watch(b, () => {
    y.value = JSON.parse(JSON.stringify({})), Y();
  });
  const P = (c) => {
    if (v.teleport) {
      const A = c.getBoundingClientRect();
      return {
        left: A.left + window.scrollX,
        top: A.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, V3 = (c, A) => {
    y.value.left = `${c + A - O.value.width}px`;
  }, D = (c) => {
    y.value.left = `${c}px`;
  }, W = (c, A) => {
    v.position === At.left && D(c), v.position === At.right && V3(c, A), v.position === At.center && (y.value.left = `${c + A / 2 - O.value.width / 2}px`);
  }, C = (c) => {
    const { width: A, height: p } = c.getBoundingClientRect(), { top: X, left: I } = v.altPosition ? v.altPosition(c) : P(c);
    return { top: +X, left: +I, width: A, height: p };
  }, L = () => {
    y.value.left = "50%", y.value.top = "50%", y.value.transform = "translate(-50%, -50%)", y.value.position = "fixed", delete y.value.opacity;
  }, N = () => {
    const c = Ie(r), { top: A, left: p, transform: X } = v.altPosition(c);
    y.value = { top: `${A}px`, left: `${p}px`, transform: X ?? "" };
  }, Y = (c = true) => {
    var A;
    if (!a.value.enabled) {
      if (b.value)
        return L();
      if (v.altPosition !== null)
        return N();
      if (c) {
        const p = v.teleport ? (A = t.value) == null ? void 0 : A.$el : e.value;
        p && (O.value = p.getBoundingClientRect()), f("recalculate-position");
      }
      return re();
    }
  }, z = ({ inputEl: c, left: A, width: p }) => {
    window.screen.width > 768 && !B.value && W(A, p), h3(c);
  }, F = (c) => {
    const { top: A, left: p, height: X, width: I } = C(c);
    y.value.top = `${X + A + +v.offset}px`, T.value = false, B.value || (y.value.left = `${p + I / 2 - O.value.width / 2}px`), z({ inputEl: c, left: p, width: I });
  }, Z = (c) => {
    const { top: A, left: p, width: X } = C(c);
    y.value.top = `${A - +v.offset - O.value.height}px`, T.value = true, z({ inputEl: c, left: p, width: X });
  }, h3 = (c) => {
    if (v.autoPosition) {
      const { left: A, width: p } = C(c), { left: X, right: I } = O.value;
      if (!B.value) {
        if (Math.abs(X) !== Math.abs(I)) {
          if (X <= 0)
            return B.value = true, D(A);
          if (I >= document.documentElement.clientWidth)
            return B.value = true, V3(A, p);
        }
        return W(A, p);
      }
    }
  }, ie = () => {
    const c = Ie(r);
    if (c) {
      const { height: A } = O.value, { top: p, height: X } = c.getBoundingClientRect(), m = window.innerHeight - p - X, U = p;
      return A <= m ? ht.bottom : A > m && A <= U ? ht.top : m >= U ? ht.bottom : ht.top;
    }
    return ht.bottom;
  }, oe = (c) => ie() === ht.bottom ? F(c) : Z(c), re = () => {
    const c = Ie(r);
    if (c)
      return v.autoPosition ? oe(c) : F(c);
  }, _ = function(c) {
    if (c) {
      const A = c.scrollHeight > c.clientHeight, X = window.getComputedStyle(c).overflowY.indexOf("hidden") !== -1;
      return A && !X;
    }
    return true;
  }, H = function(c) {
    return !c || c === document.body || c.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : _(c) ? c : H(c.assignedSlot ? c.assignedSlot.parentNode : c.parentNode);
  }, te = (c) => {
    if (c)
      switch (v.position) {
        case At.left:
          return { left: 0, transform: "translateX(0)" };
        case At.right:
          return { left: `${c.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${c.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: T,
    menuStyle: y,
    xCorrect: B,
    setMenuPosition: Y,
    getScrollableParent: H,
    shadowRender: (c, A) => {
      var ne, u, k;
      const p = document.createElement("div"), X = (ne = Ie(r)) == null ? void 0 : ne.getBoundingClientRect();
      p.setAttribute("id", "dp--temp-container");
      const I = (u = n.value) != null && u.clientWidth ? n.value : document.body;
      I.append(p);
      const m = te(X), U = h(
        c,
        {
          ...A,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...m }
        },
        Object.fromEntries(
          Object.keys(o).filter((R) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(R)).map((R) => [R, o[R]])
        )
      );
      render(U, p), O.value = (k = U.el) == null ? void 0 : k.getBoundingClientRect(), render(null, p), I.removeChild(p);
    }
  };
};
var dt = [
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
  { name: "minutes-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-value", use: ["calendar", "time", "shared"] },
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
  { name: "top-extra", use: ["shared", "month-year"] }
];
var Vl = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var Wl = {
  all: () => dt,
  monthYear: () => dt.filter((e) => e.use.includes("month-year")),
  input: () => Vl,
  timePicker: () => dt.filter((e) => e.use.includes("time")),
  action: () => dt.filter((e) => e.use.includes("action")),
  calendar: () => dt.filter((e) => e.use.includes("calendar")),
  menu: () => dt.filter((e) => e.use.includes("menu")),
  shared: () => dt.filter((e) => e.use.includes("shared")),
  yearMode: () => dt.filter((e) => e.use.includes("year-mode"))
};
var Ge = (e, t, r) => {
  const n = [];
  return Wl[t]().forEach((a) => {
    e[a.name] && n.push(a.name);
  }), r != null && r.length && r.forEach((a) => {
    a.slot && n.push(a.slot);
  }), n;
};
var Ut = (e) => {
  const t = computed(() => (n) => e.value ? n ? e.value.open : e.value.close : ""), r = computed(() => (n) => e.value ? n ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: t, showTransition: !!e.value, menuTransition: r };
};
var Kt = (e, t) => {
  const { defaultedRange: r, defaultedTz: n } = Re(e), a = K(ot(K(), n.value.timezone)), f = ref([{ month: getMonth(a), year: getYear(a) }]), v = reactive({
    hours: r.value.enabled ? [getHours(a), getHours(a)] : getHours(a),
    minutes: r.value.enabled ? [getMinutes(a), getMinutes(a)] : getMinutes(a),
    seconds: r.value.enabled ? [0, 0] : 0
  }), o = computed({
    get: () => e.internalModelValue,
    set: (y) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", y);
    }
  }), O = computed(
    () => (y) => f.value[y] ? f.value[y].month : 0
  ), B = computed(
    () => (y) => f.value[y] ? f.value[y].year : 0
  );
  return {
    calendars: f,
    time: v,
    modelValue: o,
    month: O,
    year: B,
    today: a
  };
};
var Hl = (e, t) => {
  const { defaultedMultiCalendars: r, defaultedMultiDates: n, defaultedHighlight: a, defaultedTz: f, propDates: v, defaultedRange: o } = Re(t), { isDisabled: O } = gt(t), B = ref(null), y = ref(ot(/* @__PURE__ */ new Date(), f.value.timezone)), T = (u) => {
    !u.current && t.hideOffsetDates || (B.value = u.value);
  }, b = () => {
    B.value = null;
  }, P = (u) => Array.isArray(e.value) && o.value.enabled && e.value[0] && B.value ? u ? Oe(B.value, e.value[0]) : Ce(B.value, e.value[0]) : true, V3 = (u, k) => {
    const R = () => e.value ? k ? e.value[0] || null : e.value[1] : null, de2 = e.value && Array.isArray(e.value) ? R() : null;
    return be(K(u.value), de2);
  }, D = (u) => {
    const k = Array.isArray(e.value) ? e.value[0] : null;
    return u ? !Ce(B.value ?? null, k) : true;
  }, W = (u, k = true) => (o.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !u.current ? false : be(K(u.value), e.value[k ? 0 : 1]) : o.value.enabled ? V3(u, k) && D(k) || be(u.value, Array.isArray(e.value) ? e.value[0] : null) && P(k) : false, C = (u, k) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const R = be(u.value, B.value);
      return k ? Oe(e.value[0], u.value) && R : Ce(e.value[0], u.value) && R;
    }
    return false;
  }, L = (u) => !e.value || t.hideOffsetDates && !u.current ? false : o.value.enabled ? t.modelAuto && Array.isArray(e.value) ? be(u.value, e.value[0] ? e.value[0] : y.value) : false : n.value.enabled && Array.isArray(e.value) ? e.value.some((k) => be(k, u.value)) : be(u.value, e.value ? e.value : y.value), N = (u) => {
    if (o.value.autoRange || t.weekPicker) {
      if (B.value) {
        if (t.hideOffsetDates && !u.current)
          return false;
        const k = addDays(B.value, +o.value.autoRange), R = st(K(B.value), t.weekStart);
        return t.weekPicker ? be(R[1], K(u.value)) : be(k, K(u.value));
      }
      return false;
    }
    return false;
  }, Y = (u) => {
    if (o.value.autoRange || t.weekPicker) {
      if (B.value) {
        const k = addDays(B.value, +o.value.autoRange);
        if (t.hideOffsetDates && !u.current)
          return false;
        const R = st(K(B.value), t.weekStart);
        return t.weekPicker ? Oe(u.value, R[0]) && Ce(u.value, R[1]) : Oe(u.value, B.value) && Ce(u.value, k);
      }
      return false;
    }
    return false;
  }, z = (u) => {
    if (o.value.autoRange || t.weekPicker) {
      if (B.value) {
        if (t.hideOffsetDates && !u.current)
          return false;
        const k = st(K(B.value), t.weekStart);
        return t.weekPicker ? be(k[0], u.value) : be(B.value, u.value);
      }
      return false;
    }
    return false;
  }, F = (u) => ra(e.value, B.value, u.value), Z = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, h3 = () => t.modelAuto ? kn(t.internalModelValue) : true, ie = (u) => {
    if (t.weekPicker)
      return false;
    const k = o.value.enabled ? !W(u) && !W(u, false) : true;
    return !O(u.value) && !L(u) && !(!u.current && t.hideOffsetDates) && k;
  }, oe = (u) => o.value.enabled ? t.modelAuto ? Z() && L(u) : false : L(u), re = (u) => a.value ? fl(u.value, v.value.highlight) : false, _ = (u) => {
    const k = O(u.value);
    return k && (typeof a.value == "function" ? !a.value(u.value, k) : !a.value.options.highlightDisabled);
  }, H = (u) => {
    var k;
    return typeof a.value == "function" ? a.value(u.value) : (k = a.value.weekdays) == null ? void 0 : k.includes(u.value.getDay());
  }, te = (u) => (o.value.enabled || t.weekPicker) && (!(r.value.count > 0) || u.current) && h3() && !(!u.current && t.hideOffsetDates) && !L(u) ? F(u) : false, E = (u) => {
    const { isRangeStart: k, isRangeEnd: R } = X(u), de2 = o.value.enabled ? k || R : false;
    return {
      dp__cell_offset: !u.current,
      dp__pointer: !t.disabled && !(!u.current && t.hideOffsetDates) && !O(u.value),
      dp__cell_disabled: O(u.value),
      dp__cell_highlight: !_(u) && (re(u) || H(u)) && !oe(u) && !de2 && !z(u) && !(te(u) && t.weekPicker) && !R,
      dp__cell_highlight_active: !_(u) && (re(u) || H(u)) && oe(u),
      dp__today: !t.noToday && be(u.value, y.value) && u.current,
      "dp--past": Ce(u.value, y.value),
      "dp--future": Oe(u.value, y.value)
    };
  }, c = (u) => ({
    dp__active_date: oe(u),
    dp__date_hover: ie(u)
  }), A = (u) => {
    if (e.value && !Array.isArray(e.value)) {
      const k = st(e.value, t.weekStart);
      return {
        ...m(u),
        dp__range_start: be(k[0], u.value),
        dp__range_end: be(k[1], u.value),
        dp__range_between_week: Oe(u.value, k[0]) && Ce(u.value, k[1])
      };
    }
    return {
      ...m(u)
    };
  }, p = (u) => {
    if (e.value && Array.isArray(e.value)) {
      const k = st(e.value[0], t.weekStart), R = e.value[1] ? st(e.value[1], t.weekStart) : [];
      return {
        ...m(u),
        dp__range_start: be(k[0], u.value) || be(R[0], u.value),
        dp__range_end: be(k[1], u.value) || be(R[1], u.value),
        dp__range_between_week: Oe(u.value, k[0]) && Ce(u.value, k[1]) || Oe(u.value, R[0]) && Ce(u.value, R[1]),
        dp__range_between: Oe(u.value, k[1]) && Ce(u.value, R[0])
      };
    }
    return {
      ...m(u)
    };
  }, X = (u) => {
    const k = r.value.count > 0 ? u.current && W(u) && h3() : W(u) && h3(), R = r.value.count > 0 ? u.current && W(u, false) && h3() : W(u, false) && h3();
    return { isRangeStart: k, isRangeEnd: R };
  }, I = (u) => {
    const { isRangeStart: k, isRangeEnd: R } = X(u);
    return {
      dp__range_start: k,
      dp__range_end: R,
      dp__range_between: te(u),
      dp__date_hover: be(u.value, B.value) && !k && !R && !t.weekPicker,
      dp__date_hover_start: C(u, true),
      dp__date_hover_end: C(u, false)
    };
  }, m = (u) => ({
    ...I(u),
    dp__cell_auto_range: Y(u),
    dp__cell_auto_range_start: z(u),
    dp__cell_auto_range_end: N(u)
  }), U = (u) => o.value.enabled ? o.value.autoRange ? m(u) : t.modelAuto ? { ...c(u), ...I(u) } : t.weekPicker ? p(u) : I(u) : t.weekPicker ? A(u) : c(u);
  return {
    setHoverDate: T,
    clearHoverDate: b,
    getDayClassData: (u) => t.hideOffsetDates && !u.current ? {} : {
      ...E(u),
      ...U(u),
      [t.dayClass ? t.dayClass(u.value) : ""]: true,
      [t.calendarCellClassName]: !!t.calendarCellClassName
    }
  };
};
var gt = (e) => {
  const { defaultedFilters: t, defaultedRange: r, propDates: n, defaultedMultiDates: a } = Re(e), f = (_) => n.value.disabledDates ? typeof n.value.disabledDates == "function" ? n.value.disabledDates(K(_)) : !!aa(_, n.value.disabledDates) : false, v = (_) => {
    const H = n.value.maxDate ? Oe(_, n.value.maxDate) : false, te = n.value.minDate ? Ce(_, n.value.minDate) : false, E = f(_), A = t.value.months.map((U) => +U).includes(getMonth(_)), p = e.disabledWeekDays.length ? e.disabledWeekDays.some((U) => +U === getDay(_)) : false, X = T(_), I = getYear(_), m = I < +e.yearRange[0] || I > +e.yearRange[1];
    return !(H || te || E || A || m || p || X);
  }, o = (_, H) => Ce(...ct(n.value.minDate, _, H)) || be(...ct(n.value.minDate, _, H)), O = (_, H) => Oe(...ct(n.value.maxDate, _, H)) || be(...ct(n.value.maxDate, _, H)), B = (_, H, te) => {
    let E = false;
    return n.value.maxDate && te && O(_, H) && (E = true), n.value.minDate && !te && o(_, H) && (E = true), E;
  }, y = (_, H, te, E) => {
    let c = false;
    return E ? n.value.minDate && n.value.maxDate ? c = B(_, H, te) : (n.value.minDate && o(_, H) || n.value.maxDate && O(_, H)) && (c = true) : c = true, c;
  }, T = (_) => Array.isArray(n.value.allowedDates) && !n.value.allowedDates.length ? true : n.value.allowedDates ? !aa(_, n.value.allowedDates) : false, b = (_) => !v(_), P = (_) => r.value.noDisabledRange ? !eachDayOfInterval({ start: _[0], end: _[1] }).some((te) => b(te)) : true, V3 = (_) => {
    if (_) {
      const H = getYear(_);
      return H >= +e.yearRange[0] && H <= e.yearRange[1];
    }
    return true;
  }, D = (_, H) => !!(Array.isArray(_) && _[H] && (r.value.maxRange || r.value.minRange) && V3(_[H])), W = (_, H, te = 0) => {
    if (D(H, te) && V3(_)) {
      const E = differenceInCalendarDays(_, H[te]), c = An(H[te], _), A = c.length === 1 ? 0 : c.filter((X) => b(X)).length, p = Math.abs(E) - (r.value.minMaxRawRange ? 0 : A);
      if (r.value.minRange && r.value.maxRange)
        return p >= +r.value.minRange && p <= +r.value.maxRange;
      if (r.value.minRange)
        return p >= +r.value.minRange;
      if (r.value.maxRange)
        return p <= +r.value.maxRange;
    }
    return true;
  }, C = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, L = (_) => Array.isArray(_) ? [_[0] ? $a(_[0]) : null, _[1] ? $a(_[1]) : null] : $a(_), N = (_, H, te) => _.find(
    (E) => +E.hours === getHours(H) && E.minutes === "*" ? true : +E.minutes === getMinutes(H) && +E.hours === getHours(H)
  ) && te, Y = (_, H, te) => {
    const [E, c] = _, [A, p] = H;
    return !N(E, A, te) && !N(c, p, te) && te;
  }, z = (_, H) => {
    const te = Array.isArray(H) ? H : [H];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? Y(e.disabledTimes, te, _) : !te.some((E) => N(e.disabledTimes, E, _)) : _;
  }, F = (_, H) => {
    const te = Array.isArray(H) ? [wt(H[0]), H[1] ? wt(H[1]) : void 0] : wt(H), E = !e.disabledTimes(te);
    return _ && E;
  }, Z = (_, H) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? z(H, _) : F(H, _) : H, h3 = (_) => {
    let H = true;
    if (!_ || C())
      return true;
    const te = !n.value.minDate && !n.value.maxDate ? L(_) : _;
    return (e.maxTime || n.value.maxDate) && (H = ln(
      e.maxTime,
      n.value.maxDate,
      "max",
      Be(te),
      H
    )), (e.minTime || n.value.minDate) && (H = ln(
      e.minTime,
      n.value.minDate,
      "min",
      Be(te),
      H
    )), Z(_, H);
  }, ie = (_) => {
    if (!e.monthPicker)
      return true;
    let H = true;
    const te = K(Ze(_));
    if (n.value.minDate && n.value.maxDate) {
      const E = K(Ze(n.value.minDate)), c = K(Ze(n.value.maxDate));
      return Oe(te, E) && Ce(te, c) || be(te, E) || be(te, c);
    }
    if (n.value.minDate) {
      const E = K(Ze(n.value.minDate));
      H = Oe(te, E) || be(te, E);
    }
    if (n.value.maxDate) {
      const E = K(Ze(n.value.maxDate));
      H = Ce(te, E) || be(te, E);
    }
    return H;
  }, oe = computed(() => (_) => !e.enableTimePicker || e.ignoreTimeValidation ? true : h3(_)), re = computed(() => (_) => e.monthPicker ? Array.isArray(_) && (r.value.enabled || a.value.enabled) ? !_.filter((te) => !ie(te)).length : ie(_) : true);
  return {
    isDisabled: b,
    validateDate: v,
    validateMonthYearInRange: y,
    isDateRangeAllowed: P,
    checkMinMaxRange: W,
    isValidTime: h3,
    isTimeValid: oe,
    isMonthValid: re
  };
};
var oa = () => {
  const e = computed(() => (n, a) => n == null ? void 0 : n.includes(a)), t = computed(() => (n, a) => n.count ? n.solo ? true : a === 0 : true), r = computed(() => (n, a) => n.count ? n.solo ? true : a === n.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: r };
};
var zl = (e, t, r) => {
  const n = ref(0), a = reactive({
    [Mt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Mt.calendar]: false,
    [Mt.header]: false
  }), f = computed(() => e.monthPicker), v = (T) => {
    var b;
    if ((b = e.flow) != null && b.length) {
      if (!T && f.value)
        return y();
      a[T] = true, Object.keys(a).filter((P) => !a[P]).length || y();
    }
  }, o = () => {
    var T;
    (T = e.flow) != null && T.length && n.value !== -1 && (n.value += 1, t("flow-step", n.value), y());
  }, O = () => {
    n.value = -1;
  }, B = (T, b, ...P) => {
    var V3, D;
    e.flow[n.value] === T && r.value && ((D = (V3 = r.value)[b]) == null || D.call(V3, ...P));
  }, y = () => {
    B(at.month, "toggleMonthPicker", true), B(at.year, "toggleYearPicker", true), B(at.calendar, "toggleTimePicker", false, true), B(at.time, "toggleTimePicker", true, true);
    const T = e.flow[n.value];
    (T === at.hours || T === at.minutes || T === at.seconds) && B(T, "toggleTimePicker", true, true, T);
  };
  return { childMount: v, updateFlowStep: o, resetFlow: O, flowStep: n };
};
var sa = {
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
  dayClass: { type: Function, default: null },
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
  enableMinutes: { type: Boolean, default: true }
};
var tt = {
  ...sa,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  noOverlayFocus: { type: Boolean, default: false },
  collapse: { type: Boolean, default: false },
  menuWrapRef: { type: Object, default: null },
  getInputRect: { type: Function, default: () => ({}) }
};
var Ul = {
  key: 1,
  class: "dp__input_wrap"
};
var Kl = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var jl = {
  key: 2,
  class: "dp__clear_icon"
};
var Gl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...sa
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
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, {
      defaultedTextInput: f,
      defaultedAriaLabels: v,
      defaultedInline: o,
      defaultedConfig: O,
      defaultedRange: B,
      defaultedMultiDates: y,
      getDefaultPattern: T,
      getDefaultStartTime: b
    } = Re(a), { checkMinMaxRange: P } = gt(a), V3 = ref(), D = ref(null), W = ref(false), C = ref(false), L = computed(
      () => ({
        dp__pointer: !a.disabled && !a.readonly && !f.value.enabled,
        dp__disabled: a.disabled,
        dp__input_readonly: !f.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !a.hideInputIcon,
        dp__input_valid: !!a.state,
        dp__input_invalid: a.state === false,
        dp__input_focus: W.value || a.isMenuOpen,
        dp__input_reg: !f.value.enabled,
        [a.inputClassName]: !!a.inputClassName
      })
    ), N = () => {
      n("set-input-date", null), a.clearable && a.autoApply && (n("set-empty-date"), V3.value = null);
    }, Y = (p) => {
      const X = b();
      return vl(
        p,
        f.value.format ?? T(),
        X ?? Tn({}, a.enableSeconds),
        a.inputValue,
        C.value,
        a.formatLocale
      );
    }, z = (p) => {
      const { rangeSeparator: X } = f.value, [I, m] = p.split(`${X}`);
      if (I) {
        const U = Y(I.trim()), ne = m ? Y(m.trim()) : null;
        if (isAfter(U, ne))
          return;
        const u = U && ne ? [U, ne] : [U];
        P(ne, u, 0) && (V3.value = U ? u : null);
      }
    }, F = () => {
      C.value = true;
    }, Z = (p) => {
      if (B.value.enabled)
        z(p);
      else if (y.value.enabled) {
        const X = p.split(";");
        V3.value = X.map((I) => Y(I.trim())).filter((I) => I);
      } else
        V3.value = Y(p);
    }, h3 = (p) => {
      var I;
      const X = typeof p == "string" ? p : (I = p.target) == null ? void 0 : I.value;
      X !== "" ? (f.value.openMenu && !a.isMenuOpen && n("open"), Z(X), n("set-input-date", V3.value)) : N(), C.value = false, n("update:input-value", X);
    }, ie = (p) => {
      f.value.enabled ? (Z(p.target.value), f.value.enterSubmit && Ba(V3.value) && a.inputValue !== "" ? (n("set-input-date", V3.value, true), V3.value = null) : f.value.enterSubmit && a.inputValue === "" && (V3.value = null, n("clear"))) : _(p);
    }, oe = (p) => {
      f.value.enabled && f.value.tabSubmit && Z(p.target.value), f.value.tabSubmit && Ba(V3.value) && a.inputValue !== "" ? (n("set-input-date", V3.value, true, true), V3.value = null) : f.value.tabSubmit && a.inputValue === "" && (V3.value = null, n("clear", true));
    }, re = () => {
      W.value = true, n("focus"), nextTick().then(() => {
        var p;
        f.value.enabled && f.value.selectOnFocus && ((p = D.value) == null || p.select());
      });
    }, _ = (p) => {
      p.preventDefault(), ft(p, O.value, true), f.value.enabled && f.value.openMenu && !o.value.input && !a.isMenuOpen ? n("open") : f.value.enabled || n("toggle");
    }, H = () => {
      n("real-blur"), W.value = false, (!a.isMenuOpen || o.value.enabled && o.value.input) && n("blur"), a.autoApply && f.value.enabled && V3.value && !a.isMenuOpen && (n("set-input-date", V3.value), n("select-date"), V3.value = null);
    }, te = (p) => {
      ft(p, O.value, true), n("clear");
    }, E = (p) => {
      if (!f.value.enabled) {
        if (p.code === "Tab")
          return;
        p.preventDefault();
      }
    };
    return t({
      focusInput: () => {
        var p;
        (p = D.value) == null || p.focus({ preventScroll: true });
      },
      setParsedDate: (p) => {
        V3.value = p;
      }
    }), (p, X) => {
      var I;
      return openBlock(), createElementBlock("div", { onClick: _ }, [
        p.$slots.trigger && !p.$slots["dp-input"] && !unref(o).enabled ? renderSlot(p.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !p.$slots.trigger && (!unref(o).enabled || unref(o).input) ? (openBlock(), createElementBlock("div", Ul, [
          p.$slots["dp-input"] && !p.$slots.trigger && (!unref(o).enabled || unref(o).enabled && unref(o).input) ? renderSlot(p.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: h3,
            onEnter: ie,
            onTab: oe,
            onClear: te,
            onBlur: H,
            onKeypress: E,
            onPaste: F,
            openMenu: () => p.$emit("open"),
            closeMenu: () => p.$emit("close"),
            toggleMenu: () => p.$emit("toggle")
          }) : createCommentVNode("", true),
          p.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: p.uid ? `dp-input-${p.uid}` : void 0,
            ref_key: "inputRef",
            ref: D,
            "data-test": "dp-input",
            name: p.name,
            class: normalizeClass(L.value),
            inputmode: unref(f).enabled ? "text" : "none",
            placeholder: p.placeholder,
            disabled: p.disabled,
            readonly: p.readonly,
            required: p.required,
            value: e.inputValue,
            autocomplete: p.autocomplete,
            "aria-label": (I = unref(v)) == null ? void 0 : I.input,
            "aria-disabled": p.disabled || void 0,
            "aria-invalid": p.state === false ? true : void 0,
            onInput: h3,
            onKeydown: [
              withKeys(ie, ["enter"]),
              withKeys(oe, ["tab"]),
              E
            ],
            onBlur: H,
            onFocus: re,
            onKeypress: E,
            onPaste: F
          }, null, 42, Kl)),
          createBaseVNode("div", {
            onClick: X[2] || (X[2] = (m) => n("toggle"))
          }, [
            p.$slots["input-icon"] && !p.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: X[0] || (X[0] = (m) => n("toggle"))
            }, [
              renderSlot(p.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !p.$slots["input-icon"] && !p.hideInputIcon && !p.$slots["dp-input"] ? (openBlock(), createBlock(unref(Ot), {
              key: 1,
              class: "dp__input_icon dp__input_icons",
              onClick: X[1] || (X[1] = (m) => n("toggle"))
            })) : createCommentVNode("", true)
          ]),
          p.$slots["clear-icon"] && e.inputValue && p.clearable && !p.disabled && !p.readonly ? (openBlock(), createElementBlock("span", jl, [
            renderSlot(p.$slots, "clear-icon", { clear: te })
          ])) : createCommentVNode("", true),
          p.clearable && !p.$slots["clear-icon"] && e.inputValue && !p.disabled && !p.readonly ? (openBlock(), createBlock(unref(yn), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            "data-test": "clear-icon",
            onClick: X[3] || (X[3] = withModifiers((m) => te(m), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var Ql = ["title"];
var ql = ["disabled"];
var Xl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...tt
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: t }) {
    const r = t, n = e, {
      defaultedActionRow: a,
      defaultedPreviewFormat: f,
      defaultedMultiCalendars: v,
      defaultedTextInput: o,
      defaultedInline: O,
      defaultedRange: B,
      defaultedMultiDates: y,
      getDefaultPattern: T
    } = Re(n), { isTimeValid: b, isMonthValid: P } = gt(n), { buildMatrix: V3 } = pt(), D = ref(null), W = ref(null), C = ref(false), L = ref({}), N = ref(null), Y = ref(null);
    onMounted(() => {
      n.arrowNavigation && V3([Ie(D), Ie(W)], "actionRow"), z(), window.addEventListener("resize", z);
    }), onUnmounted(() => {
      window.removeEventListener("resize", z);
    });
    const z = () => {
      C.value = false, setTimeout(() => {
        var A, p;
        const E = (A = N.value) == null ? void 0 : A.getBoundingClientRect(), c = (p = Y.value) == null ? void 0 : p.getBoundingClientRect();
        E && c && (L.value.maxWidth = `${c.width - E.width - 20}px`), C.value = true;
      }, 0);
    }, F = computed(() => B.value.enabled && !B.value.partialRange && n.internalModelValue ? n.internalModelValue.length === 2 : true), Z = computed(
      () => !b.value(n.internalModelValue) || !P.value(n.internalModelValue) || !F.value
    ), h3 = () => {
      const E = f.value;
      return n.timePicker || n.monthPicker, E(Be(n.internalModelValue));
    }, ie = () => {
      const E = n.internalModelValue;
      return v.value.count > 0 ? `${oe(E[0])} - ${oe(E[1])}` : [oe(E[0]), oe(E[1])];
    }, oe = (E) => Pn(
      E,
      f.value,
      n.formatLocale,
      o.value.rangeSeparator,
      n.modelAuto,
      T()
    ), re = computed(() => !n.internalModelValue || !n.menuMount ? "" : typeof f.value == "string" ? Array.isArray(n.internalModelValue) ? n.internalModelValue.length === 2 && n.internalModelValue[1] ? ie() : y.value.enabled ? n.internalModelValue.map((E) => `${oe(E)}`) : n.modelAuto ? `${oe(n.internalModelValue[0])}` : `${oe(n.internalModelValue[0])} -` : oe(n.internalModelValue) : h3()), _ = () => y.value.enabled ? "; " : " - ", H = computed(
      () => Array.isArray(re.value) ? re.value.join(_()) : re.value
    ), te = () => {
      b.value(n.internalModelValue) && P.value(n.internalModelValue) && F.value ? r("select-date") : r("invalid-select");
    };
    return (E, c) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: Y,
      class: "dp__action_row"
    }, [
      E.$slots["action-row"] ? renderSlot(E.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: E.internalModelValue,
        disabled: Z.value,
        selectDate: () => E.$emit("select-date"),
        closePicker: () => E.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(a).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: H.value,
          style: normalizeStyle(L.value)
        }, [
          E.$slots["action-preview"] && C.value ? renderSlot(E.$slots, "action-preview", {
            key: 0,
            value: E.internalModelValue
          }) : createCommentVNode("", true),
          !E.$slots["action-preview"] && C.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(H.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, Ql)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: N,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          E.$slots["action-buttons"] ? renderSlot(E.$slots, "action-buttons", {
            key: 0,
            value: E.internalModelValue
          }) : createCommentVNode("", true),
          E.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(O).enabled && unref(a).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: D,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: c[0] || (c[0] = (A) => E.$emit("close-picker")),
              onKeydown: [
                c[1] || (c[1] = withKeys((A) => E.$emit("close-picker"), ["enter"])),
                c[2] || (c[2] = withKeys((A) => E.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(E.cancelText), 545)) : createCommentVNode("", true),
            unref(a).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: c[3] || (c[3] = (A) => E.$emit("select-now")),
              onKeydown: [
                c[4] || (c[4] = withKeys((A) => E.$emit("select-now"), ["enter"])),
                c[5] || (c[5] = withKeys((A) => E.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(E.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(a).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: W,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: Z.value,
              "data-test": "select-button",
              onKeydown: [
                withKeys(te, ["enter"]),
                withKeys(te, ["space"])
              ],
              onClick: te
            }, toDisplayString(E.selectText), 41, ql)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
});
var Jl = ["onKeydown"];
var Zl = { class: "dp__selection_grid_header" };
var xl = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"];
var er = ["aria-label"];
var jt = defineComponent({
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
  setup(e, { expose: t, emit: r }) {
    const { setSelectionGrid: n, buildMultiLevelMatrix: a, setMonthPicker: f } = pt(), v = r, o = e, { defaultedAriaLabels: O, defaultedTextInput: B, defaultedConfig: y } = Re(
      o
    ), { hideNavigationButtons: T } = oa(), b = ref(false), P = ref(null), V3 = ref(null), D = ref([]), W = ref(), C = ref(null), L = ref(0), N = ref(null);
    onBeforeUpdate(() => {
      P.value = null;
    }), onMounted(() => {
      nextTick().then(() => re()), o.noOverlayFocus || z(), Y(true);
    }), onUnmounted(() => Y(false));
    const Y = (I) => {
      var m;
      o.arrowNavigation && ((m = o.headerRefs) != null && m.length ? f(I) : n(I));
    }, z = () => {
      var m;
      const I = Ie(V3);
      I && (B.value.enabled || (P.value ? (m = P.value) == null || m.focus({ preventScroll: true }) : I.focus({ preventScroll: true })), b.value = I.clientHeight < I.scrollHeight);
    }, F = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !o.useRelative,
        "dp--overlay-relative": o.useRelative
      })
    ), Z = computed(
      () => o.useRelative ? { height: `${o.height}px`, width: "260px" } : void 0
    ), h3 = computed(() => ({
      dp__overlay_col: true
    })), ie = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: b.value,
        dp__button_bottom: o.isLast
      })
    ), oe = computed(() => {
      var I, m;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((I = o.items) == null ? void 0 : I.length) <= 6,
        dp__container_block: ((m = o.items) == null ? void 0 : m.length) > 6
      };
    });
    watch(
      () => o.items,
      () => re(false),
      { deep: true }
    );
    const re = (I = true) => {
      nextTick().then(() => {
        const m = Ie(P), U = Ie(V3), ne = Ie(C), u = Ie(N), k = ne ? ne.getBoundingClientRect().height : 0;
        U && (U.getBoundingClientRect().height ? L.value = U.getBoundingClientRect().height - k : L.value = y.value.modeHeight - k), m && u && I && (u.scrollTop = m.offsetTop - u.offsetTop - (L.value / 2 - m.getBoundingClientRect().height) - k);
      });
    }, _ = (I) => {
      I.disabled || v("selected", I.value);
    }, H = () => {
      v("toggle"), v("reset-flow");
    }, te = () => {
      o.escClose && H();
    }, E = (I, m, U, ne) => {
      I && ((m.active || m.value === o.focusValue) && (P.value = I), o.arrowNavigation && (Array.isArray(D.value[U]) ? D.value[U][ne] = I : D.value[U] = [I], c()));
    }, c = () => {
      var m, U;
      const I = (m = o.headerRefs) != null && m.length ? [o.headerRefs].concat(D.value) : D.value.concat([o.skipButtonRef ? [] : [C.value]]);
      a(Be(I), (U = o.headerRefs) != null && U.length ? "monthPicker" : "selectionGrid");
    }, A = (I) => {
      o.arrowNavigation || ft(I, y.value, true);
    }, p = (I) => {
      W.value = I, v("hover-value", I);
    }, X = () => {
      if (H(), !o.isLast) {
        const I = cl(o.menuWrapRef ?? null, "action-row");
        if (I) {
          const m = wn(I);
          m == null || m.focus();
        }
      }
    };
    return t({ focusGrid: z }), (I, m) => {
      var U;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: V3,
        class: normalizeClass(F.value),
        style: normalizeStyle(Z.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(te, ["prevent"]), ["esc"]),
          m[0] || (m[0] = withKeys(withModifiers((ne) => A(ne), ["prevent"]), ["left"])),
          m[1] || (m[1] = withKeys(withModifiers((ne) => A(ne), ["prevent"]), ["up"])),
          m[2] || (m[2] = withKeys(withModifiers((ne) => A(ne), ["prevent"]), ["down"])),
          m[3] || (m[3] = withKeys(withModifiers((ne) => A(ne), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: N,
          class: normalizeClass(oe.value),
          role: "grid",
          style: normalizeStyle({ "--dp-overlay-height": `${L.value}px` })
        }, [
          createBaseVNode("div", Zl, [
            renderSlot(I.$slots, "header")
          ]),
          I.$slots.overlay ? renderSlot(I.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(I.items, (ne, u) => (openBlock(), createElementBlock("div", {
            key: u,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: I.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(ne, (k, R) => (openBlock(), createElementBlock("div", {
              key: k.value,
              ref_for: true,
              ref: (de2) => E(de2, k, u, R),
              role: "gridcell",
              class: normalizeClass(h3.value),
              "aria-selected": k.active || void 0,
              "aria-disabled": k.disabled || void 0,
              tabindex: "0",
              "data-test": k.text,
              onClick: (de2) => _(k),
              onKeydown: [
                withKeys(withModifiers((de2) => _(k), ["prevent"]), ["enter"]),
                withKeys(withModifiers((de2) => _(k), ["prevent"]), ["space"])
              ],
              onMouseover: (de2) => p(k.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(k.className)
              }, [
                I.$slots.item ? renderSlot(I.$slots, "item", {
                  key: 0,
                  item: k
                }) : createCommentVNode("", true),
                I.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(k.text), 1)
                ], 64))
              ], 2)
            ], 42, xl))), 128))
          ], 2))), 128))
        ], 6),
        I.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: C,
          type: "button",
          "aria-label": (U = unref(O)) == null ? void 0 : U.toggleOverlay,
          class: normalizeClass(ie.value),
          tabindex: "0",
          onClick: H,
          onKeydown: [
            withKeys(H, ["enter"]),
            withKeys(X, ["tab"])
          ]
        }, [
          renderSlot(I.$slots, "button-icon")
        ], 42, er)), [
          [vShow, !unref(T)(I.hideNavigation, I.type)]
        ]) : createCommentVNode("", true)
      ], 46, Jl);
    };
  }
});
var ua = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean },
    collapse: { type: Boolean }
  },
  setup(e) {
    const t = e, r = computed(
      () => t.multiCalendars > 0 ? [...Array(t.multiCalendars).keys()] : [0]
    ), n = computed(() => ({
      dp__instance_calendar: t.multiCalendars > 0
    }));
    return (a, f) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !a.stretch,
        "dp--menu--inner-stretched": a.stretch,
        dp__flex_display: a.multiCalendars > 0,
        "dp--flex-display-collapsed": a.collapse
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(r.value, (v, o) => (openBlock(), createElementBlock("div", {
        key: v,
        class: normalizeClass(n.value)
      }, [
        renderSlot(a.$slots, "default", {
          instance: v,
          index: o
        })
      ], 2))), 128))
    ], 2));
  }
});
var tr = ["aria-label", "aria-disabled"];
var Ft = defineComponent({
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
    const r = t, n = ref(null);
    return onMounted(() => r("set-ref", n)), (a, f) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: n,
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": a.ariaLabel,
      "aria-disabled": a.disabled || void 0,
      onClick: f[0] || (f[0] = (v) => a.$emit("activate")),
      onKeydown: [
        f[1] || (f[1] = withKeys(withModifiers((v) => a.$emit("activate"), ["prevent"]), ["enter"])),
        f[2] || (f[2] = withKeys(withModifiers((v) => a.$emit("activate"), ["prevent"]), ["space"]))
      ]
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: a.disabled }])
      }, [
        renderSlot(a.$slots, "default")
      ], 2)
    ], 40, tr));
  }
});
var ar = { class: "dp--year-mode-picker" };
var nr = ["aria-label", "data-test"];
var _n = defineComponent({
  __name: "YearModePicker",
  props: {
    ...tt,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e, { emit: t }) {
    const r = t, n = e, { showRightIcon: a, showLeftIcon: f } = oa(), { defaultedConfig: v, defaultedMultiCalendars: o, defaultedAriaLabels: O, defaultedTransitions: B } = Re(n), { showTransition: y, transitionName: T } = Ut(B), b = (D = false, W) => {
      r("toggle-year-picker", { flow: D, show: W });
    }, P = (D) => {
      r("year-select", D);
    }, V3 = (D = false) => {
      r("handle-year", D);
    };
    return (D, W) => {
      var C, L, N;
      return openBlock(), createElementBlock("div", ar, [
        unref(f)(unref(o), e.instance) ? (openBlock(), createBlock(Ft, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": (C = unref(O)) == null ? void 0 : C.prevYear,
          disabled: e.isDisabled(false),
          onActivate: W[0] || (W[0] = (Y) => V3(false))
        }, {
          default: withCtx(() => [
            D.$slots["arrow-left"] ? renderSlot(D.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
            D.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ea), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createBaseVNode("button", {
          ref: "mpYearButtonRef",
          class: "dp__btn dp--year-select",
          type: "button",
          "aria-label": (L = unref(O)) == null ? void 0 : L.openYearsOverlay,
          "data-test": `year-mode-btn-${e.instance}`,
          onClick: W[1] || (W[1] = () => b(false)),
          onKeydown: W[2] || (W[2] = withKeys(() => b(false), ["enter"]))
        }, [
          D.$slots.year ? renderSlot(D.$slots, "year", {
            key: 0,
            year: e.year
          }) : createCommentVNode("", true),
          D.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e.year), 1)
          ], 64))
        ], 40, nr),
        unref(a)(unref(o), e.instance) ? (openBlock(), createBlock(Ft, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": (N = unref(O)) == null ? void 0 : N.nextYear,
          disabled: e.isDisabled(true),
          onActivate: W[3] || (W[3] = (Y) => V3(true))
        }, {
          default: withCtx(() => [
            D.$slots["arrow-right"] ? renderSlot(D.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
            D.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Fa), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(T)(e.showYearPicker),
          css: unref(y)
        }, {
          default: withCtx(() => [
            e.showYearPicker ? (openBlock(), createBlock(jt, {
              key: 0,
              items: e.items,
              "text-input": D.textInput,
              "esc-close": D.escClose,
              config: D.config,
              "is-last": D.autoApply && !unref(v).keepActionRow,
              "hide-navigation": D.hideNavigation,
              "aria-labels": D.ariaLabels,
              type: "year",
              onToggle: b,
              onSelected: W[4] || (W[4] = (Y) => P(Y))
            }, createSlots({
              "button-icon": withCtx(() => [
                D.$slots["calendar-icon"] ? renderSlot(D.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                D.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ot), { key: 1 }))
              ]),
              _: 2
            }, [
              D.$slots["year-overlay-value"] ? {
                name: "item",
                fn: withCtx(({ item: Y }) => [
                  renderSlot(D.$slots, "year-overlay-value", {
                    text: Y.text,
                    value: Y.value
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
var ja = (e, t, r) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((n) => be(e, n))) {
      const n = t.value.filter((a) => !be(a, e));
      t.value = n.length ? n : null;
    } else
      (r && +r > t.value.length || !r) && t.value.push(e);
  else
    t.value = [e];
};
var Ga = (e, t, r) => {
  let n = e.value ? e.value.slice() : [];
  return n.length === 2 && n[1] !== null && (n = []), n.length ? Ce(t, n[0]) ? (n.unshift(t), r("range-start", n[0]), r("range-start", n[1])) : (n[1] = t, r("range-end", t)) : (n = [t], r("range-start", t)), n;
};
var ia = (e, t, r, n) => {
  e && (e[0] && e[1] && r && t("auto-apply"), e[0] && !e[1] && n && r && t("auto-apply"));
};
var On = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => ot(K(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = ot(K(e.value), e.timezone));
};
var Bn = (e, t, r, n) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && n.value.partialRange) ? n.value.fixedStart && (Oe(e, t.value[0]) || be(e, t.value[0])) ? [t.value[0], e] : n.value.fixedEnd && (Ce(e, t.value[1]) || be(e, t.value[1])) ? [e, t.value[1]] : (r("invalid-fixed-range", e), t.value) : [];
var Yn = ({
  multiCalendars: e,
  highlight: t,
  propDates: r,
  calendars: n,
  modelValue: a,
  props: f,
  filters: v,
  year: o,
  month: O,
  emit: B
}) => {
  const y = computed(() => Ha(f.yearRange, f.locale, f.reverseYears)), T = ref([false]), b = computed(() => (F, Z) => {
    const h3 = set(Ze(/* @__PURE__ */ new Date()), {
      month: O.value(F),
      year: o.value(F)
    });
    return Sn(
      h3,
      r.value.maxDate,
      r.value.minDate,
      f.preventMinMaxNavigation,
      Z
    );
  }), P = () => {
    for (let F = 0; F < e.value.count; F++)
      if (F === 0)
        n.value[F] = n.value[0];
      else {
        const Z = set(K(), n.value[F - 1]);
        n.value[F] = { month: getMonth(Z), year: getYear(addYears(Z, 1)) };
      }
  }, V3 = (F) => {
    if (!F)
      return P();
    const Z = set(K(), n.value[F]);
    return n.value[0].year = getYear(subYears(Z, e.value.count - 1)), P();
  }, D = (F) => f.focusStartDate ? F[0] : F[1] ? F[1] : F[0], W = () => {
    if (a.value) {
      const F = Array.isArray(a.value) ? D(a.value) : a.value;
      n.value[0] = { month: getMonth(F), year: getYear(F) };
    }
  };
  onMounted(() => {
    W(), e.value.count && P();
  });
  const C = (F, Z) => {
    n.value[Z].year = F, e.value.count && !e.value.solo && V3(Z);
  }, L = computed(() => (F) => Rt(y.value, (Z) => {
    var re;
    const h3 = o.value(F) === Z.value, ie = Ht(
      Z.value,
      Ct(r.value.minDate),
      Ct(r.value.maxDate)
    ) || ((re = v.value.years) == null ? void 0 : re.includes(o.value(F))), oe = Ka(t.value, Z.value);
    return { active: h3, disabled: ie, highlighted: oe };
  })), N = (F, Z) => {
    C(F, Z), z(Z);
  }, Y = (F, Z = false) => {
    if (!b.value(F, Z)) {
      const h3 = Z ? o.value(F) + 1 : o.value(F) - 1;
      C(h3, F);
    }
  }, z = (F, Z = false, h3) => {
    Z || B("reset-flow"), h3 !== void 0 ? T.value[F] = h3 : T.value[F] = !T.value[F], T.value || B("overlay-closed");
  };
  return {
    isDisabled: b,
    groupedYears: L,
    showYearPicker: T,
    selectYear: C,
    toggleYearPicker: z,
    handleYearSelect: N,
    handleYear: Y
  };
};
var lr = (e, t) => {
  const {
    defaultedMultiCalendars: r,
    defaultedAriaLabels: n,
    defaultedTransitions: a,
    defaultedConfig: f,
    defaultedRange: v,
    defaultedHighlight: o,
    propDates: O,
    defaultedTz: B,
    defaultedFilters: y,
    defaultedMultiDates: T
  } = Re(e), { modelValue: b, year: P, month: V3, calendars: D } = Kt(e, t), W = computed(() => bn(e.formatLocale, e.locale, e.monthNameFormat)), C = ref(null), { checkMinMaxRange: L } = gt(e), {
    selectYear: N,
    groupedYears: Y,
    showYearPicker: z,
    toggleYearPicker: F,
    handleYearSelect: Z,
    handleYear: h3,
    isDisabled: ie
  } = Yn({
    modelValue: b,
    multiCalendars: r,
    highlight: o,
    calendars: D,
    year: P,
    propDates: O,
    month: V3,
    filters: y,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (b.value && e.focusStartDate || !b.value) && N(getYear(K(e.startDate)), 0);
  });
  const oe = (k) => k ? { month: getMonth(k), year: getYear(k) } : { month: null, year: null }, re = () => b.value ? Array.isArray(b.value) ? b.value.map((k) => oe(k)) : oe(b.value) : oe(), _ = (k, R) => {
    const de2 = D.value[k], d = re();
    return Array.isArray(d) ? d.some((le) => le.year === (de2 == null ? void 0 : de2.year) && le.month === R) : (de2 == null ? void 0 : de2.year) === d.year && R === d.month;
  }, H = (k, R, de2) => {
    var le, l;
    const d = re();
    return Array.isArray(d) ? P.value(R) === ((le = d[de2]) == null ? void 0 : le.year) && k === ((l = d[de2]) == null ? void 0 : l.month) : false;
  }, te = (k, R) => {
    if (v.value.enabled) {
      const de2 = re();
      if (Array.isArray(b.value) && Array.isArray(de2)) {
        const d = H(k, R, 0) || H(k, R, 1), le = ut(Ze(K()), k, P.value(R));
        return ra(b.value, C.value, le) && !d;
      }
      return false;
    }
    return false;
  }, E = computed(() => (k) => Rt(W.value, (R) => {
    var S;
    const de2 = _(k, R.value), d = Ht(
      R.value,
      Dn(P.value(k), O.value.minDate),
      $n(P.value(k), O.value.maxDate)
    ) || bl(O.value.disabledDates, P.value(k)).includes(R.value) || ((S = y.value.months) == null ? void 0 : S.includes(R.value)), le = te(R.value, k), l = Rn(o.value, R.value, P.value(k));
    return { active: de2, disabled: d, isBetween: le, highlighted: l };
  })), c = (k, R) => ut(Ze(K()), k, P.value(R)), A = (k, R) => {
    const de2 = b.value ? b.value : Ze(/* @__PURE__ */ new Date());
    b.value = ut(de2, k, P.value(R)), t("auto-apply"), t("update-flow-step");
  }, p = (k, R) => {
    const de2 = c(k, R);
    v.value.fixedEnd || v.value.fixedStart ? b.value = Bn(de2, b, t, v) : b.value ? L(de2, b.value) && (b.value = Ga(b, c(k, R), t)) : b.value = [c(k, R)], nextTick().then(() => {
      ia(b.value, t, e.autoApply, e.modelAuto);
    });
  }, X = (k, R) => {
    ja(c(k, R), b, T.value.limit), t("auto-apply", true);
  }, I = (k, R) => (D.value[R].month = k, U(R, D.value[R].year, k), T.value.enabled ? X(k, R) : v.value.enabled ? p(k, R) : A(k, R)), m = (k, R) => {
    N(k, R), U(R, k, null);
  }, U = (k, R, de2) => {
    let d = de2;
    if (!d && d !== 0) {
      const le = re();
      d = Array.isArray(le) ? le[k].month : le.month;
    }
    t("update-month-year", { instance: k, year: R, month: d });
  };
  return {
    groupedMonths: E,
    groupedYears: Y,
    year: P,
    isDisabled: ie,
    defaultedMultiCalendars: r,
    defaultedAriaLabels: n,
    defaultedTransitions: a,
    defaultedConfig: f,
    showYearPicker: z,
    modelValue: b,
    presetDate: (k, R) => {
      On({
        value: k,
        modelValue: b,
        range: v.value.enabled,
        timezone: R ? void 0 : B.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (k, R) => {
      C.value = c(k, R);
    },
    selectMonth: I,
    selectYear: m,
    toggleYearPicker: F,
    handleYearSelect: Z,
    handleYear: h3,
    getModelMonthYear: re
  };
};
var rr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...tt
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
    "invalid-fixed-range"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = useSlots(), f = Ge(a, "yearMode"), v = e;
    onMounted(() => {
      v.shadow || n("mount", null);
    });
    const {
      groupedMonths: o,
      groupedYears: O,
      year: B,
      isDisabled: y,
      defaultedMultiCalendars: T,
      defaultedConfig: b,
      showYearPicker: P,
      modelValue: V3,
      presetDate: D,
      setHoverDate: W,
      selectMonth: C,
      selectYear: L,
      toggleYearPicker: N,
      handleYearSelect: Y,
      handleYear: z,
      getModelMonthYear: F
    } = lr(v, n);
    return t({ getSidebarProps: () => ({
      modelValue: V3,
      year: B,
      getModelMonthYear: F,
      selectMonth: C,
      selectYear: L,
      handleYear: z
    }), presetDate: D, toggleYearPicker: (h3) => N(0, h3) }), (h3, ie) => (openBlock(), createBlock(ua, {
      "multi-calendars": unref(T).count,
      collapse: h3.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: oe }) => [
        h3.$slots["top-extra"] ? renderSlot(h3.$slots, "top-extra", {
          key: 0,
          value: h3.internalModelValue
        }) : createCommentVNode("", true),
        h3.$slots["month-year"] ? renderSlot(h3.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(B),
          months: unref(o)(oe),
          years: unref(O)(oe),
          selectMonth: unref(C),
          selectYear: unref(L),
          instance: oe
        }))) : (openBlock(), createBlock(jt, {
          key: 2,
          items: unref(o)(oe),
          "arrow-navigation": h3.arrowNavigation,
          "is-last": h3.autoApply && !unref(b).keepActionRow,
          "esc-close": h3.escClose,
          height: unref(b).modeHeight,
          config: h3.config,
          "no-overlay-focus": !!(h3.noOverlayFocus || h3.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (re) => unref(C)(re, oe),
          onHoverValue: (re) => unref(W)(re, oe)
        }, createSlots({
          header: withCtx(() => [
            createVNode(_n, mergeProps(h3.$props, {
              items: unref(O)(oe),
              instance: oe,
              "show-year-picker": unref(P)[oe],
              year: unref(B)(oe),
              "is-disabled": (re) => unref(y)(oe, re),
              onHandleYear: (re) => unref(z)(oe, re),
              onYearSelect: (re) => unref(Y)(re, oe),
              onToggleYearPicker: (re) => unref(N)(oe, re == null ? void 0 : re.flow, re == null ? void 0 : re.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(f), (re, _) => ({
                name: re,
                fn: withCtx((H) => [
                  renderSlot(h3.$slots, re, normalizeProps(guardReactiveProps(H)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, [
          h3.$slots["month-overlay-value"] ? {
            name: "item",
            fn: withCtx(({ item: re }) => [
              renderSlot(h3.$slots, "month-overlay-value", {
                text: re.text,
                value: re.value
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
  const { modelValue: r } = Kt(e, t), n = ref(null), { defaultedHighlight: a, defaultedMultiDates: f, defaultedFilters: v, defaultedRange: o, propDates: O } = Re(e), B = ref();
  onMounted(() => {
    e.startDate && (r.value && e.focusStartDate || !r.value) && (B.value = getYear(K(e.startDate)));
  });
  const y = (W) => Array.isArray(r.value) ? r.value.some((C) => getYear(C) === W) : r.value ? getYear(r.value) === W : false, T = (W) => o.value.enabled && Array.isArray(r.value) ? ra(r.value, n.value, P(W)) : false, b = computed(() => Rt(Ha(e.yearRange, e.locale, e.reverseYears), (W) => {
    const C = y(W.value), L = Ht(
      W.value,
      Ct(O.value.minDate),
      Ct(O.value.maxDate)
    ) || v.value.years.includes(W.value), N = T(W.value) && !C, Y = Ka(a.value, W.value);
    return { active: C, disabled: L, isBetween: N, highlighted: Y };
  })), P = (W) => setYear(Ze(/* @__PURE__ */ new Date()), W);
  return {
    groupedYears: b,
    modelValue: r,
    focusYear: B,
    setHoverValue: (W) => {
      n.value = setYear(Ze(/* @__PURE__ */ new Date()), W);
    },
    selectYear: (W) => {
      var C;
      if (t("update-month-year", { instance: 0, year: W }), f.value.enabled)
        return r.value ? Array.isArray(r.value) && (((C = r.value) == null ? void 0 : C.map((N) => getYear(N))).includes(W) ? r.value = r.value.filter((N) => getYear(N) !== W) : r.value.push(setYear(Qe(K()), W))) : r.value = [setYear(Qe(K()), W)], t("auto-apply", true);
      o.value.enabled ? (r.value = Ga(r, P(W), t), nextTick().then(() => {
        ia(r.value, t, e.autoApply, e.modelAuto);
      })) : (r.value = P(W), t("auto-apply"));
    }
  };
};
var sr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...tt
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { groupedYears: f, modelValue: v, focusYear: o, selectYear: O, setHoverValue: B } = or(a, n), { defaultedConfig: y } = Re(a);
    return t({ getSidebarProps: () => ({
      modelValue: v,
      selectYear: O
    }) }), (b, P) => (openBlock(), createElementBlock("div", null, [
      b.$slots["top-extra"] ? renderSlot(b.$slots, "top-extra", {
        key: 0,
        value: b.internalModelValue
      }) : createCommentVNode("", true),
      b.$slots["month-year"] ? renderSlot(b.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(f),
        selectYear: unref(O)
      }))) : (openBlock(), createBlock(jt, {
        key: 2,
        items: unref(f),
        "is-last": b.autoApply && !unref(y).keepActionRow,
        height: unref(y).modeHeight,
        config: b.config,
        "no-overlay-focus": !!(b.noOverlayFocus || b.textInput),
        "focus-value": unref(o),
        type: "year",
        "use-relative": "",
        onSelected: unref(O),
        onHoverValue: unref(B)
      }, createSlots({ _: 2 }, [
        b.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: V3 }) => [
            renderSlot(b.$slots, "year-overlay-value", {
              text: V3.text,
              value: V3.value
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
var ir = ["data-test", "aria-label", "onKeydown", "onClick"];
var dr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var cr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var fr = ["aria-label", "disabled", "data-test", "onKeydown", "onClick"];
var vr = ["data-test", "aria-label", "onKeydown", "onClick"];
var mr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var pr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var gr = { key: 0 };
var yr = ["aria-label", "onKeydown"];
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
    ...tt
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
    "am-pm-change"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { setTimePickerElements: f, setTimePickerBackRef: v } = pt(), { defaultedAriaLabels: o, defaultedTransitions: O, defaultedFilters: B, defaultedConfig: y, defaultedRange: T } = Re(a), { transitionName: b, showTransition: P } = Ut(O), V3 = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), D = ref("AM"), W = ref(null), C = ref([]);
    onMounted(() => {
      n("mounted");
    });
    const L = (l) => set(/* @__PURE__ */ new Date(), {
      hours: l.hours,
      minutes: l.minutes,
      seconds: a.enableSeconds ? l.seconds : 0,
      milliseconds: 0
    }), N = computed(
      () => (l) => E(l, a[l]) || z(l, a[l])
    ), Y = computed(() => ({ hours: a.hours, minutes: a.minutes, seconds: a.seconds })), z = (l, S) => T.value.enabled && !T.value.disableTimeRangeValidation ? !a.validateTime(l, S) : false, F = (l, S) => {
      if (T.value.enabled && !T.value.disableTimeRangeValidation) {
        const x = S ? +a[`${l}Increment`] : -+a[`${l}Increment`], J = a[l] + x;
        return !a.validateTime(l, J);
      }
      return false;
    }, Z = computed(() => (l) => !I(+a[l] + +a[`${l}Increment`], l) || F(l, true)), h3 = computed(() => (l) => !I(+a[l] - +a[`${l}Increment`], l) || F(l, false)), ie = (l, S) => add(set(K(), l), S), oe = (l, S) => sub(set(K(), l), S), re = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !a.timePickerInline,
        dp__time_col_reg_block: !a.enableSeconds && a.is24 && !a.timePickerInline,
        dp__time_col_reg_inline: !a.enableSeconds && a.is24 && a.timePickerInline,
        dp__time_col_reg_with_button: !a.enableSeconds && !a.is24,
        dp__time_col_sec: a.enableSeconds && a.is24,
        dp__time_col_sec_with_button: a.enableSeconds && !a.is24
      })
    ), _ = computed(() => {
      const l = [{ type: "hours" }];
      return a.enableMinutes && l.push({ type: "", separator: true }, {
        type: "minutes"
      }), a.enableSeconds && l.push({ type: "", separator: true }, {
        type: "seconds"
      }), l;
    }), H = computed(() => _.value.filter((l) => !l.separator)), te = computed(() => (l) => {
      if (l === "hours") {
        const S = k(+a.hours);
        return { text: S < 10 ? `0${S}` : `${S}`, value: S };
      }
      return { text: a[l] < 10 ? `0${a[l]}` : `${a[l]}`, value: a[l] };
    }), E = (l, S) => {
      var J;
      if (!a.disabledTimesConfig)
        return false;
      const x = a.disabledTimesConfig(a.order, l === "hours" ? S : void 0);
      return x[l] ? !!((J = x[l]) != null && J.includes(S)) : true;
    }, c = (l, S) => S !== "hours" || D.value === "AM" ? l : l + 12, A = (l) => {
      const S = a.is24 ? 24 : 12, x = l === "hours" ? S : 60, J = +a[`${l}GridIncrement`], ae = l === "hours" && !a.is24 ? J : 0, g = [];
      for (let $ = ae; $ < x; $ += J)
        g.push({ value: a.is24 ? $ : c($, l), text: $ < 10 ? `0${$}` : `${$}` });
      return l === "hours" && !a.is24 && g.push({ value: 0, text: "12" }), Rt(g, ($) => ({ active: false, disabled: B.value.times[l].includes($.value) || !I($.value, l) || E(l, $.value) || z(l, $.value) }));
    }, p = (l) => l >= 0 ? l : 59, X = (l) => l >= 0 ? l : 23, I = (l, S) => {
      const x = a.minTime ? L(wa(a.minTime)) : null, J = a.maxTime ? L(wa(a.maxTime)) : null, ae = L(
        wa(
          Y.value,
          S,
          S === "minutes" || S === "seconds" ? p(l) : X(l)
        )
      );
      return x && J ? (isBefore(ae, J) || isEqual(ae, J)) && (isAfter(ae, x) || isEqual(ae, x)) : x ? isAfter(ae, x) || isEqual(ae, x) : J ? isBefore(ae, J) || isEqual(ae, J) : true;
    }, m = (l) => a[`no${l[0].toUpperCase() + l.slice(1)}Overlay`], U = (l) => {
      m(l) || (V3[l] = !V3[l], V3[l] || n("overlay-closed"));
    }, ne = (l) => l === "hours" ? getHours : l === "minutes" ? getMinutes : getSeconds, u = (l, S = true) => {
      const x = S ? ie : oe, J = S ? +a[`${l}Increment`] : -+a[`${l}Increment`];
      I(+a[l] + J, l) && n(
        `update:${l}`,
        ne(l)(x({ [l]: +a[l] }, { [l]: +a[`${l}Increment`] }))
      );
    }, k = (l) => a.is24 ? l : (l >= 12 ? D.value = "PM" : D.value = "AM", ol(l)), R = () => {
      D.value === "PM" ? (D.value = "AM", n("update:hours", a.hours - 12)) : (D.value = "PM", n("update:hours", a.hours + 12)), n("am-pm-change", D.value);
    }, de2 = (l) => {
      V3[l] = true;
    }, d = (l, S, x) => {
      if (l && a.arrowNavigation) {
        Array.isArray(C.value[S]) ? C.value[S][x] = l : C.value[S] = [l];
        const J = C.value.reduce(
          (ae, g) => g.map(($, ge) => [...ae[ge] || [], g[ge]]),
          []
        );
        v(a.closeTimePickerBtn), W.value && (J[1] = J[1].concat(W.value)), f(J, a.order);
      }
    }, le = (l, S) => (U(l), n(`update:${l}`, S));
    return t({ openChildCmp: de2 }), (l, S) => {
      var x;
      return l.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", ur, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_.value, (J, ae) => {
          var g, $, ge;
          return openBlock(), createElementBlock("div", {
            key: ae,
            class: normalizeClass(re.value)
          }, [
            J.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (me) => d(me, ae, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !l.timePickerInline,
                  dp__inc_dec_button_inline: l.timePickerInline,
                  dp__tp_inline_btn_top: l.timePickerInline,
                  dp__inc_dec_button_disabled: Z.value(J.type)
                }),
                "data-test": `${J.type}-time-inc-btn-${a.order}`,
                "aria-label": (g = unref(o)) == null ? void 0 : g.incrementValue(J.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((me) => u(J.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((me) => u(J.type), ["prevent"]), ["space"])
                ],
                onClick: (me) => u(J.type)
              }, [
                a.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  dr,
                  cr
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  l.$slots["arrow-up"] ? renderSlot(l.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  l.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
                ], 64))
              ], 42, ir),
              createBaseVNode("button", {
                ref_for: true,
                ref: (me) => d(me, ae, 1),
                type: "button",
                "aria-label": ($ = unref(o)) == null ? void 0 : $.openTpOverlay(J.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !l.timePickerInline,
                  dp__time_display_inline: l.timePickerInline,
                  "dp--time-invalid": N.value(J.type),
                  "dp--time-overlay-btn": !N.value(J.type)
                }),
                disabled: m(J.type),
                tabindex: "0",
                "data-test": `${J.type}-toggle-overlay-btn-${a.order}`,
                onKeydown: [
                  withKeys(withModifiers((me) => U(J.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((me) => U(J.type), ["prevent"]), ["space"])
                ],
                onClick: (me) => U(J.type)
              }, [
                l.$slots[J.type] ? renderSlot(l.$slots, J.type, {
                  key: 0,
                  text: te.value(J.type).text,
                  value: te.value(J.type).value
                }) : createCommentVNode("", true),
                l.$slots[J.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(te.value(J.type).text), 1)
                ], 64))
              ], 42, fr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (me) => d(me, ae, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !l.timePickerInline,
                  dp__inc_dec_button_inline: l.timePickerInline,
                  dp__tp_inline_btn_bottom: l.timePickerInline,
                  dp__inc_dec_button_disabled: h3.value(J.type)
                }),
                "data-test": `${J.type}-time-dec-btn-${a.order}`,
                "aria-label": (ge = unref(o)) == null ? void 0 : ge.decrementValue(J.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((me) => u(J.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((me) => u(J.type, false), ["prevent"]), ["space"])
                ],
                onClick: (me) => u(J.type, false)
              }, [
                a.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  mr,
                  pr
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  l.$slots["arrow-down"] ? renderSlot(l.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  l.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
                ], 64))
              ], 42, vr)
            ], 64))
          ], 2);
        }), 128)),
        l.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", gr, [
          l.$slots["am-pm-button"] ? renderSlot(l.$slots, "am-pm-button", {
            key: 0,
            toggle: R,
            value: D.value
          }) : createCommentVNode("", true),
          l.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: W,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (x = unref(o)) == null ? void 0 : x.amPmButton,
            tabindex: "0",
            onClick: R,
            onKeydown: [
              withKeys(withModifiers(R, ["prevent"]), ["enter"]),
              withKeys(withModifiers(R, ["prevent"]), ["space"])
            ]
          }, toDisplayString(D.value), 41, yr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(H.value, (J, ae) => (openBlock(), createBlock(Transition, {
          key: ae,
          name: unref(b)(V3[J.type]),
          css: unref(P)
        }, {
          default: withCtx(() => [
            V3[J.type] ? (openBlock(), createBlock(jt, {
              key: 0,
              items: A(J.type),
              "is-last": l.autoApply && !unref(y).keepActionRow,
              "esc-close": l.escClose,
              type: J.type,
              "text-input": l.textInput,
              config: l.config,
              "arrow-navigation": l.arrowNavigation,
              "aria-labels": l.ariaLabels,
              onSelected: (g) => le(J.type, g),
              onToggle: (g) => U(J.type),
              onResetFlow: S[0] || (S[0] = (g) => l.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                l.$slots["clock-icon"] ? renderSlot(l.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                l.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(l.timePickerInline ? unref(Ot) : unref(La)), { key: 1 }))
              ]),
              _: 2
            }, [
              l.$slots[`${J.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: g }) => [
                  renderSlot(l.$slots, `${J.type}-overlay-value`, {
                    text: g.text,
                    value: g.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "aria-labels", "onSelected", "onToggle"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var br = { class: "dp--tp-wrap" };
var kr = ["aria-label", "tabindex"];
var wr = ["tabindex"];
var Mr = ["aria-label"];
var In = defineComponent({
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
    ...tt
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
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { buildMatrix: f, setTimePicker: v } = pt(), o = useSlots(), { defaultedTransitions: O, defaultedAriaLabels: B, defaultedTextInput: y, defaultedConfig: T, defaultedRange: b } = Re(a), { transitionName: P, showTransition: V3 } = Ut(O), { hideNavigationButtons: D } = oa(), W = ref(null), C = ref(null), L = ref([]), N = ref(null);
    onMounted(() => {
      n("mount"), !a.timePicker && a.arrowNavigation ? f([Ie(W.value)], "time") : v(true, a.timePicker);
    });
    const Y = computed(() => b.value.enabled && a.modelAuto ? kn(a.internalModelValue) : true), z = ref(false), F = (c) => ({
      hours: Array.isArray(a.hours) ? a.hours[c] : a.hours,
      minutes: Array.isArray(a.minutes) ? a.minutes[c] : a.minutes,
      seconds: Array.isArray(a.seconds) ? a.seconds[c] : a.seconds
    }), Z = computed(() => {
      const c = [];
      if (b.value.enabled)
        for (let A = 0; A < 2; A++)
          c.push(F(A));
      else
        c.push(F(0));
      return c;
    }), h3 = (c, A = false, p = "") => {
      A || n("reset-flow"), z.value = c, n(c ? "overlay-opened" : "overlay-closed"), a.arrowNavigation && v(c), nextTick(() => {
        p !== "" && L.value[0] && L.value[0].openChildCmp(p);
      });
    }, ie = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: a.autoApply && !T.value.keepActionRow
    })), oe = Ge(o, "timePicker"), re = (c, A, p) => b.value.enabled ? A === 0 ? [c, Z.value[1][p]] : [Z.value[0][p], c] : c, _ = (c) => {
      n("update:hours", c);
    }, H = (c) => {
      n("update:minutes", c);
    }, te = (c) => {
      n("update:seconds", c);
    }, E = () => {
      if (N.value && !y.value.enabled && !a.noOverlayFocus) {
        const c = wn(N.value);
        c && c.focus({ preventScroll: true });
      }
    };
    return t({ toggleTimePicker: h3 }), (c, A) => {
      var p;
      return openBlock(), createElementBlock("div", br, [
        !c.timePicker && !c.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: W,
          type: "button",
          class: normalizeClass(ie.value),
          "aria-label": (p = unref(B)) == null ? void 0 : p.openTimePicker,
          tabindex: c.noOverlayFocus ? void 0 : 0,
          "data-test": "open-time-picker-btn",
          onKeydown: [
            A[0] || (A[0] = withKeys((X) => h3(true), ["enter"])),
            A[1] || (A[1] = withKeys((X) => h3(true), ["space"]))
          ],
          onClick: A[2] || (A[2] = (X) => h3(true))
        }, [
          c.$slots["clock-icon"] ? renderSlot(c.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          c.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(La), { key: 1 }))
        ], 42, kr)), [
          [vShow, !unref(D)(c.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(P)(z.value),
          css: unref(V3) && !c.timePickerInline
        }, {
          default: withCtx(() => {
            var X;
            return [
              z.value || c.timePicker || c.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: N,
                class: normalizeClass({
                  dp__overlay: !c.timePickerInline,
                  "dp--overlay-absolute": !a.timePicker && !c.timePickerInline,
                  "dp--overlay-relative": a.timePicker
                }),
                style: normalizeStyle(c.timePicker ? { height: `${unref(T).modeHeight}px` } : void 0),
                tabindex: c.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    c.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  c.$slots["time-picker-overlay"] ? renderSlot(c.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: _,
                    setMinutes: H,
                    setSeconds: te
                  }) : createCommentVNode("", true),
                  c.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(c.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(Z.value, (I, m) => withDirectives((openBlock(), createBlock(hr, mergeProps({ key: m }, {
                      ...c.$props,
                      order: m,
                      hours: I.hours,
                      minutes: I.minutes,
                      seconds: I.seconds,
                      closeTimePickerBtn: C.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: m === 0 ? c.fixedStart : c.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: L,
                      "validate-time": (U, ne) => e.validateTime(U, re(ne, m, U)),
                      "onUpdate:hours": (U) => _(re(U, m, "hours")),
                      "onUpdate:minutes": (U) => H(re(U, m, "minutes")),
                      "onUpdate:seconds": (U) => te(re(U, m, "seconds")),
                      onMounted: E,
                      onOverlayClosed: E,
                      onAmPmChange: A[3] || (A[3] = (U) => c.$emit("am-pm-change", U))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(oe), (U, ne) => ({
                        name: U,
                        fn: withCtx((u) => [
                          renderSlot(c.$slots, U, normalizeProps(guardReactiveProps(u)))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, m === 0 ? true : Y.value]
                    ])), 128))
                  ], 2)),
                  !c.timePicker && !c.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: C,
                    type: "button",
                    class: normalizeClass(ie.value),
                    "aria-label": (X = unref(B)) == null ? void 0 : X.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      A[4] || (A[4] = withKeys((I) => h3(false), ["enter"])),
                      A[5] || (A[5] = withKeys((I) => h3(false), ["space"]))
                    ],
                    onClick: A[6] || (A[6] = (I) => h3(false))
                  }, [
                    c.$slots["calendar-icon"] ? renderSlot(c.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    c.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ot), { key: 1 }))
                  ], 42, Mr)), [
                    [vShow, !unref(D)(c.hideNavigation, "time")]
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
var Nn = (e, t, r, n) => {
  const { defaultedRange: a } = Re(e), f = (N, Y) => Array.isArray(t[N]) ? t[N][Y] : t[N], v = (N) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[N] : t.seconds : 0, o = (N, Y) => N ? Y !== void 0 ? vt(N, f("hours", Y), f("minutes", Y), v(Y)) : vt(N, t.hours, t.minutes, v()) : setSeconds(K(), v(Y)), O = (N, Y) => {
    t[N] = Y;
  }, B = computed(() => e.modelAuto && a.value.enabled ? Array.isArray(r.value) ? r.value.length > 1 : false : a.value.enabled), y = (N, Y) => {
    const z = Object.fromEntries(
      Object.keys(t).map((F) => F === N ? [F, Y] : [F, t[F]].slice())
    );
    if (B.value && !a.value.disableTimeRangeValidation) {
      const F = (h3) => r.value ? vt(
        r.value[h3],
        z.hours[h3],
        z.minutes[h3],
        z.seconds[h3]
      ) : null, Z = (h3) => setMilliseconds(r.value[h3], 0);
      return !(be(F(0), F(1)) && (isAfter(F(0), Z(1)) || isBefore(F(1), Z(0))));
    }
    return true;
  }, T = (N, Y) => {
    y(N, Y) && (O(N, Y), n && n());
  }, b = (N) => {
    T("hours", N);
  }, P = (N) => {
    T("minutes", N);
  }, V3 = (N) => {
    T("seconds", N);
  }, D = (N, Y, z, F) => {
    Y && b(N), !Y && !z && P(N), z && V3(N), r.value && F(r.value);
  }, W = (N) => {
    if (N) {
      const Y = Array.isArray(N), z = Y ? [+N[0].hours, +N[1].hours] : +N.hours, F = Y ? [+N[0].minutes, +N[1].minutes] : +N.minutes, Z = Y ? [+N[0].seconds, +N[1].seconds] : +N.seconds;
      O("hours", z), O("minutes", F), e.enableSeconds && O("seconds", Z);
    }
  }, C = (N, Y) => {
    const z = {
      hours: Array.isArray(t.hours) ? t.hours[N] : t.hours,
      disabledArr: []
    };
    return (Y || Y === 0) && (z.hours = Y), Array.isArray(e.disabledTimes) && (z.disabledArr = a.value.enabled && Array.isArray(e.disabledTimes[N]) ? e.disabledTimes[N] : e.disabledTimes), z;
  }, L = computed(() => (N, Y) => {
    var z;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: F, hours: Z } = C(N, Y), h3 = F.filter((ie) => +ie.hours === Z);
      return ((z = h3[0]) == null ? void 0 : z.minutes) === "*" ? { hours: [Z], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (h3 == null ? void 0 : h3.map((ie) => +ie.minutes)) ?? [],
        seconds: (h3 == null ? void 0 : h3.map((ie) => ie.seconds ? +ie.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: O,
    updateHours: b,
    updateMinutes: P,
    updateSeconds: V3,
    getSetDateTime: o,
    updateTimeValues: D,
    getSecondsValue: v,
    assignStartTime: W,
    validateTime: y,
    disabledTimesConfig: L
  };
};
var Dr = (e, t) => {
  const { modelValue: r, time: n } = Kt(e, t), { defaultedStartTime: a, defaultedRange: f } = Re(e), { updateTimeValues: v, getSetDateTime: o, setTime: O, assignStartTime: B, disabledTimesConfig: y, validateTime: T } = Nn(e, n, r), b = (Y) => {
    const { hours: z, minutes: F, seconds: Z } = Y;
    return { hours: +z, minutes: +F, seconds: Z ? +Z : 0 };
  }, P = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const z = b(e.startTime[0]), F = b(e.startTime[1]);
        return [set(K(), z), set(K(), F)];
      }
      const Y = b(e.startTime);
      return set(K(), Y);
    }
    return f.value.enabled ? [null, null] : null;
  }, V3 = () => {
    if (f.value.enabled) {
      const [Y, z] = P();
      r.value = [o(Y, 0), o(z, 1)];
    } else
      r.value = o(P());
  }, D = (Y) => Array.isArray(Y) ? [wt(K(Y[0])), wt(K(Y[1]))] : [wt(Y ?? K())], W = (Y, z, F) => {
    O("hours", Y), O("minutes", z), O("seconds", e.enableSeconds ? F : 0);
  }, C = () => {
    const [Y, z] = D(r.value);
    return f.value.enabled ? W(
      [Y.hours, z.hours],
      [Y.minutes, z.minutes],
      [Y.seconds, z.seconds]
    ) : W(Y.hours, Y.minutes, Y.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return B(a.value), r.value ? C() : V3();
  });
  const L = () => {
    Array.isArray(r.value) ? r.value = r.value.map((Y, z) => Y && o(Y, z)) : r.value = o(r.value), t("time-update");
  };
  return {
    modelValue: r,
    time: n,
    disabledTimesConfig: y,
    updateTime: (Y, z = true, F = false) => {
      v(Y, z, F, L);
    },
    validateTime: T
  };
};
var $r = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...tt
  },
  emits: ["update:internal-model-value", "time-update", "am-pm-change"],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, f = useSlots(), v = Ge(f, "timePicker"), { time: o, modelValue: O, disabledTimesConfig: B, updateTime: y, validateTime: T } = Dr(a, n);
    return t({ getSidebarProps: () => ({
      modelValue: O,
      time: o,
      updateTime: y
    }) }), (P, V3) => (openBlock(), createBlock(ua, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(In, mergeProps(P.$props, {
          hours: unref(o).hours,
          minutes: unref(o).minutes,
          seconds: unref(o).seconds,
          "internal-model-value": P.internalModelValue,
          "disabled-times-config": unref(B),
          "validate-time": unref(T),
          "onUpdate:hours": V3[0] || (V3[0] = (D) => unref(y)(D)),
          "onUpdate:minutes": V3[1] || (V3[1] = (D) => unref(y)(D, false)),
          "onUpdate:seconds": V3[2] || (V3[2] = (D) => unref(y)(D, false, true)),
          onAmPmChange: V3[3] || (V3[3] = (D) => P.$emit("am-pm-change", D))
        }), createSlots({ _: 2 }, [
          renderList(unref(v), (D, W) => ({
            name: D,
            fn: withCtx((C) => [
              renderSlot(P.$slots, D, normalizeProps(guardReactiveProps(C)))
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
var Rr = ["aria-label", "data-test", "onClick", "onKeydown"];
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
    ...tt
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed"],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, {
      defaultedTransitions: f,
      defaultedAriaLabels: v,
      defaultedMultiCalendars: o,
      defaultedFilters: O,
      defaultedConfig: B,
      defaultedHighlight: y,
      propDates: T
    } = Re(a), { transitionName: b, showTransition: P } = Ut(f), { buildMatrix: V3 } = pt(), { handleMonthYearChange: D, isDisabled: W, updateMonthYear: C } = Fl(a, n), { showLeftIcon: L, showRightIcon: N } = oa(), Y = ref(false), z = ref(false), F = ref([null, null, null, null]);
    onMounted(() => {
      n("mount");
    });
    const Z = (m) => ({
      get: () => a[m],
      set: (U) => {
        const ne = m === Je.month ? Je.year : Je.month;
        n("update-month-year", { [m]: U, [ne]: a[ne] }), m === Je.month ? E(true) : c(true);
      }
    }), h3 = computed(Z(Je.month)), ie = computed(Z(Je.year)), oe = computed(() => (m) => ({
      month: a.month,
      year: a.year,
      items: m === Je.month ? a.months : a.years,
      instance: a.instance,
      updateMonthYear: C,
      toggle: m === Je.month ? E : c
    })), re = computed(() => {
      const m = a.months.find((U) => U.value === a.month);
      return m || { text: "", value: 0 };
    }), _ = computed(() => Rt(a.months, (m) => {
      const U = a.month === m.value, ne = Ht(
        m.value,
        Dn(a.year, T.value.minDate),
        $n(a.year, T.value.maxDate)
      ) || O.value.months.includes(m.value), u = Rn(y.value, m.value, a.year);
      return { active: U, disabled: ne, highlighted: u };
    })), H = computed(() => Rt(a.years, (m) => {
      const U = a.year === m.value, ne = Ht(
        m.value,
        Ct(T.value.minDate),
        Ct(T.value.maxDate)
      ) || O.value.years.includes(m.value), u = Ka(y.value, m.value);
      return { active: U, disabled: ne, highlighted: u };
    })), te = (m, U) => {
      U !== void 0 ? m.value = U : m.value = !m.value, m.value || n("overlay-closed");
    }, E = (m = false, U) => {
      A(m), te(Y, U);
    }, c = (m = false, U) => {
      A(m), te(z, U);
    }, A = (m) => {
      m || n("reset-flow");
    }, p = (m, U) => {
      a.arrowNavigation && (F.value[U] = Ie(m), V3(F.value, "monthYear"));
    }, X = computed(() => {
      var m, U;
      return [
        {
          type: Je.month,
          index: 1,
          toggle: E,
          modelValue: h3.value,
          updateModelValue: (ne) => h3.value = ne,
          text: re.value.text,
          showSelectionGrid: Y.value,
          items: _.value,
          ariaLabel: (m = v.value) == null ? void 0 : m.openMonthsOverlay
        },
        {
          type: Je.year,
          index: 2,
          toggle: c,
          modelValue: ie.value,
          updateModelValue: (ne) => ie.value = ne,
          text: Mn(a.year, a.locale),
          showSelectionGrid: z.value,
          items: H.value,
          ariaLabel: (U = v.value) == null ? void 0 : U.openYearsOverlay
        }
      ];
    }), I = computed(() => a.disableYearSelect ? [X.value[0]] : a.yearFirst ? [...X.value].reverse() : X.value);
    return t({
      toggleMonthPicker: E,
      toggleYearPicker: c,
      handleMonthYearChange: D
    }), (m, U) => {
      var ne, u, k;
      return openBlock(), createElementBlock("div", Ar, [
        m.$slots["month-year"] ? (openBlock(), createElementBlock("div", Tr, [
          renderSlot(m.$slots, "month-year", normalizeProps(guardReactiveProps({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(C), handleMonthYearChange: unref(D), instance: e.instance })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          m.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Sr, [
            renderSlot(m.$slots, "top-extra", { value: m.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", Pr, [
            unref(L)(unref(o), e.instance) && !m.vertical ? (openBlock(), createBlock(Ft, {
              key: 0,
              "aria-label": (ne = unref(v)) == null ? void 0 : ne.prevMonth,
              disabled: unref(W)(false),
              onActivate: U[0] || (U[0] = (R) => unref(D)(false, true)),
              onSetRef: U[1] || (U[1] = (R) => p(R, 0))
            }, {
              default: withCtx(() => [
                m.$slots["arrow-left"] ? renderSlot(m.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                m.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ea), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: m.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(I.value, (R, de2) => (openBlock(), createElementBlock(Fragment, {
                key: R.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (d) => p(d, de2 + 1),
                  type: "button",
                  class: "dp__btn dp__month_year_select",
                  tabindex: "0",
                  "aria-label": R.ariaLabel,
                  "data-test": `${R.type}-toggle-overlay-${e.instance}`,
                  onClick: R.toggle,
                  onKeydown: [
                    withKeys(withModifiers(R.toggle, ["prevent"]), ["enter"]),
                    withKeys(withModifiers(R.toggle, ["prevent"]), ["space"])
                  ]
                }, [
                  m.$slots[R.type] ? renderSlot(m.$slots, R.type, {
                    key: 0,
                    text: R.text,
                    value: a[R.type]
                  }) : createCommentVNode("", true),
                  m.$slots[R.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(R.text), 1)
                  ], 64))
                ], 40, Rr),
                createVNode(Transition, {
                  name: unref(b)(R.showSelectionGrid),
                  css: unref(P)
                }, {
                  default: withCtx(() => [
                    R.showSelectionGrid ? (openBlock(), createBlock(jt, {
                      key: 0,
                      items: R.items,
                      "arrow-navigation": m.arrowNavigation,
                      "hide-navigation": m.hideNavigation,
                      "is-last": m.autoApply && !unref(B).keepActionRow,
                      "skip-button-ref": false,
                      config: m.config,
                      type: R.type,
                      "header-refs": [],
                      "esc-close": m.escClose,
                      "menu-wrap-ref": m.menuWrapRef,
                      "text-input": m.textInput,
                      "aria-labels": m.ariaLabels,
                      onSelected: R.updateModelValue,
                      onToggle: R.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        m.$slots["calendar-icon"] ? renderSlot(m.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        m.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ot), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      m.$slots[`${R.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: d }) => [
                          renderSlot(m.$slots, `${R.type}-overlay-value`, {
                            text: d.text,
                            value: d.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      m.$slots[`${R.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(m.$slots, `${R.type}-overlay`, normalizeProps(guardReactiveProps(oe.value(R.type))))
                        ]),
                        key: "1"
                      } : void 0,
                      m.$slots[`${R.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(m.$slots, `${R.type}-overlay-header`, {
                            toggle: R.toggle
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
            unref(L)(unref(o), e.instance) && m.vertical ? (openBlock(), createBlock(Ft, {
              key: 1,
              "aria-label": (u = unref(v)) == null ? void 0 : u.prevMonth,
              disabled: unref(W)(false),
              onActivate: U[2] || (U[2] = (R) => unref(D)(false, true))
            }, {
              default: withCtx(() => [
                m.$slots["arrow-up"] ? renderSlot(m.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                m.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            unref(N)(unref(o), e.instance) ? (openBlock(), createBlock(Ft, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(W)(true),
              "aria-label": (k = unref(v)) == null ? void 0 : k.nextMonth,
              onActivate: U[3] || (U[3] = (R) => unref(D)(true, true)),
              onSetRef: U[4] || (U[4] = (R) => p(R, m.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                m.$slots[m.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(m.$slots, m.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                m.$slots[m.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(m.vertical ? unref(Wa) : unref(Fa)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
          ])
        ], 64))
      ]);
    };
  }
});
var _r = ["aria-label"];
var Or = {
  class: "dp__calendar_header",
  role: "row"
};
var Br = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Yr = ["aria-label"];
var Ir = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Nr = ["aria-label"];
var Er = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var Fr = { class: "dp__cell_inner" };
var Lr = ["id", "aria-selected", "aria-disabled", "aria-label", "data-test", "onClick", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
var Vr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...tt
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
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { buildMultiLevelMatrix: f } = pt(), {
      defaultedTransitions: v,
      defaultedConfig: o,
      defaultedAriaLabels: O,
      defaultedMultiCalendars: B,
      defaultedWeekNumbers: y,
      defaultedMultiDates: T
    } = Re(a), b = ref(null), P = ref({
      bottom: "",
      left: "",
      transform: ""
    }), V3 = ref([]), D = ref(null), W = ref(true), C = ref(""), L = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), N = ref([]), Y = ref({ left: "50%" }), z = ref(false), F = computed(() => a.calendar ? a.calendar(a.mappedDates) : a.mappedDates), Z = computed(() => a.dayNames ? Array.isArray(a.dayNames) ? a.dayNames : a.dayNames(a.locale, +a.weekStart) : rl(a.formatLocale, a.locale, +a.weekStart));
    onMounted(() => {
      n("mount", { cmp: "calendar", refs: V3 }), o.value.noSwipe || D.value && (D.value.addEventListener("touchstart", X, { passive: false }), D.value.addEventListener("touchend", I, { passive: false }), D.value.addEventListener("touchmove", m, { passive: false })), a.monthChangeOnScroll && D.value && D.value.addEventListener("wheel", u, { passive: false });
    });
    const h3 = (l) => l ? a.vertical ? "vNext" : "next" : a.vertical ? "vPrevious" : "previous", ie = (l, S) => {
      if (a.transitions) {
        const x = Qe(ut(K(), a.month, a.year));
        C.value = Oe(Qe(ut(K(), l, S)), x) ? v.value[h3(true)] : v.value[h3(false)], W.value = false, nextTick(() => {
          W.value = true;
        });
      }
    }, oe = computed(
      () => ({
        [a.calendarClassName]: !!a.calendarClassName
      })
    ), re = computed(() => (l) => {
      const S = sl(l);
      return {
        dp__marker_dot: S.type === "dot",
        dp__marker_line: S.type === "line"
      };
    }), _ = computed(() => (l) => be(l, b.value)), H = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: B.value.count > 0 && a.instance !== 0
    })), te = computed(() => (l) => a.hideOffsetDates ? l.current : true), E = (l) => format(l, "yyyy-MM-dd"), c = async (l, S, x) => {
      const J = Ie(V3.value[S][x]);
      if (J) {
        const { width: ae, height: g } = J.getBoundingClientRect();
        b.value = l.value;
        let $ = { left: `${ae / 2}px` }, ge = -50;
        if (await nextTick(), N.value[0]) {
          const { left: me, width: Ee2 } = N.value[0].getBoundingClientRect();
          me < 0 && ($ = { left: "0" }, ge = 0, Y.value.left = `${ae / 2}px`), window.innerWidth < me + Ee2 && ($ = { right: "0" }, ge = 0, Y.value.left = `${Ee2 - ae / 2}px`);
        }
        P.value = {
          bottom: `${g}px`,
          ...$,
          transform: `translateX(${ge}%)`
        }, n("tooltip-open", l.marker);
      }
    }, A = async (l, S, x) => {
      var J, ae;
      if (z.value && T.value.enabled && T.value.dragSelect)
        return n("select-date", l);
      n("set-hover-date", l), (ae = (J = l.marker) == null ? void 0 : J.tooltip) != null && ae.length && await c(l, S, x);
    }, p = (l) => {
      b.value && (b.value = null, P.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), n("tooltip-close", l.marker));
    }, X = (l) => {
      L.value.startX = l.changedTouches[0].screenX, L.value.startY = l.changedTouches[0].screenY;
    }, I = (l) => {
      L.value.endX = l.changedTouches[0].screenX, L.value.endY = l.changedTouches[0].screenY, U();
    }, m = (l) => {
      a.vertical && !a.inline && l.preventDefault();
    }, U = () => {
      const l = a.vertical ? "Y" : "X";
      Math.abs(L.value[`start${l}`] - L.value[`end${l}`]) > 10 && n("handle-swipe", L.value[`start${l}`] > L.value[`end${l}`] ? "right" : "left");
    }, ne = (l, S, x) => {
      l && (Array.isArray(V3.value[S]) ? V3.value[S][x] = l : V3.value[S] = [l]), a.arrowNavigation && f(V3.value, "calendar");
    }, u = (l) => {
      a.monthChangeOnScroll && (l.preventDefault(), n("handle-scroll", l));
    }, k = (l) => y.value.type === "local" ? getWeek(l.value, { weekStartsOn: +a.weekStart }) : y.value.type === "iso" ? getISOWeek(l.value) : typeof y.value.type == "function" ? y.value.type(l.value) : "", R = (l) => {
      const S = l[0];
      return y.value.hideOnOffsetDates ? l.some((x) => x.current) ? k(S) : "" : k(S);
    }, de2 = (l, S) => {
      T.value.enabled || (ft(l, o.value), n("select-date", S));
    }, d = (l) => {
      ft(l, o.value);
    }, le = (l) => {
      T.value.enabled && T.value.dragSelect ? (z.value = true, n("select-date", l)) : T.value.enabled && n("select-date", l);
    };
    return t({ triggerTransition: ie }), (l, S) => {
      var x;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(H.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: D,
          role: "grid",
          class: normalizeClass(oe.value),
          "aria-label": (x = unref(O)) == null ? void 0 : x.calendarWrap
        }, [
          createBaseVNode("div", Or, [
            l.weekNumbers ? (openBlock(), createElementBlock("div", Br, toDisplayString(l.weekNumName), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(Z.value, (J, ae) => {
              var g, $;
              return openBlock(), createElementBlock("div", {
                key: ae,
                class: "dp__calendar_header_item",
                role: "gridcell",
                "data-test": "calendar-header",
                "aria-label": ($ = (g = unref(O)) == null ? void 0 : g.weekDay) == null ? void 0 : $.call(g, ae)
              }, [
                l.$slots["calendar-header"] ? renderSlot(l.$slots, "calendar-header", {
                  key: 0,
                  day: J,
                  index: ae
                }) : createCommentVNode("", true),
                l.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(J), 1)
                ], 64))
              ], 8, Yr);
            }), 128))
          ]),
          Ir,
          createVNode(Transition, {
            name: C.value,
            css: !!l.transitions
          }, {
            default: withCtx(() => {
              var J;
              return [
                W.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "dp__calendar",
                  role: "rowgroup",
                  "aria-label": ((J = unref(O)) == null ? void 0 : J.calendarDays) || void 0,
                  onMouseleave: S[1] || (S[1] = (ae) => z.value = false)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(F.value, (ae, g) => (openBlock(), createElementBlock("div", {
                    key: g,
                    class: "dp__calendar_row",
                    role: "row"
                  }, [
                    l.weekNumbers ? (openBlock(), createElementBlock("div", Er, [
                      createBaseVNode("div", Fr, toDisplayString(R(ae.days)), 1)
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(ae.days, ($, ge) => {
                      var me, Ee2, ue2;
                      return openBlock(), createElementBlock("div", {
                        id: E($.value),
                        ref_for: true,
                        ref: (Te2) => ne(Te2, g, ge),
                        key: ge + g,
                        role: "gridcell",
                        class: "dp__calendar_item",
                        "aria-selected": ($.classData.dp__active_date || $.classData.dp__range_start || $.classData.dp__range_start) ?? void 0,
                        "aria-disabled": $.classData.dp__cell_disabled || void 0,
                        "aria-label": (Ee2 = (me = unref(O)) == null ? void 0 : me.day) == null ? void 0 : Ee2.call(me, $),
                        tabindex: "0",
                        "data-test": $.value,
                        onClick: withModifiers((Te2) => de2(Te2, $), ["prevent"]),
                        onKeydown: [
                          withKeys((Te2) => l.$emit("select-date", $), ["enter"]),
                          withKeys((Te2) => l.$emit("handle-space", $), ["space"])
                        ],
                        onMouseenter: (Te2) => A($, g, ge),
                        onMouseleave: (Te2) => p($),
                        onMousedown: (Te2) => le($),
                        onMouseup: S[0] || (S[0] = (Te2) => z.value = false)
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(["dp__cell_inner", $.classData])
                        }, [
                          l.$slots.day && te.value($) ? renderSlot(l.$slots, "day", {
                            key: 0,
                            day: +$.text,
                            date: $.value
                          }) : createCommentVNode("", true),
                          l.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            createTextVNode(toDisplayString($.text), 1)
                          ], 64)),
                          $.marker && te.value($) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                            l.$slots.marker ? renderSlot(l.$slots, "marker", {
                              key: 0,
                              marker: $.marker,
                              day: +$.text,
                              date: $.value
                            }) : (openBlock(), createElementBlock("div", {
                              key: 1,
                              class: normalizeClass(re.value($.marker)),
                              style: normalizeStyle($.marker.color ? { backgroundColor: $.marker.color } : {})
                            }, null, 6))
                          ], 64)) : createCommentVNode("", true),
                          _.value($.value) ? (openBlock(), createElementBlock("div", {
                            key: 3,
                            ref_for: true,
                            ref_key: "activeTooltip",
                            ref: N,
                            class: "dp__marker_tooltip",
                            style: normalizeStyle(P.value)
                          }, [
                            (ue2 = $.marker) != null && ue2.tooltip ? (openBlock(), createElementBlock("div", {
                              key: 0,
                              class: "dp__tooltip_content",
                              onClick: d
                            }, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList($.marker.tooltip, (Te2, Ue2) => (openBlock(), createElementBlock("div", {
                                key: Ue2,
                                class: "dp__tooltip_text"
                              }, [
                                l.$slots["marker-tooltip"] ? renderSlot(l.$slots, "marker-tooltip", {
                                  key: 0,
                                  tooltip: Te2,
                                  day: $.value
                                }) : createCommentVNode("", true),
                                l.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                  createBaseVNode("div", {
                                    class: "dp__tooltip_mark",
                                    style: normalizeStyle(Te2.color ? { backgroundColor: Te2.color } : {})
                                  }, null, 4),
                                  createBaseVNode("div", null, toDisplayString(Te2.text), 1)
                                ], 64))
                              ]))), 128)),
                              createBaseVNode("div", {
                                class: "dp__arrow_bottom_tp",
                                style: normalizeStyle(Y.value)
                              }, null, 4)
                            ])) : createCommentVNode("", true)
                          ], 4)) : createCommentVNode("", true)
                        ], 2)
                      ], 40, Lr);
                    }), 128))
                  ]))), 128))
                ], 40, Nr)) : createCommentVNode("", true)
              ];
            }),
            _: 3
          }, 8, ["name", "css"])
        ], 10, _r)
      ], 2);
    };
  }
});
var sn = (e) => Array.isArray(e);
var Wr = (e, t, r, n) => {
  const a = ref([]), f = ref(/* @__PURE__ */ new Date()), v = ref(), { modelValue: o, calendars: O, time: B, today: y } = Kt(e, t), {
    defaultedMultiCalendars: T,
    defaultedStartTime: b,
    defaultedRange: P,
    defaultedConfig: V3,
    defaultedTz: D,
    propDates: W,
    defaultedMultiDates: C
  } = Re(e), { validateMonthYearInRange: L, isDisabled: N, isDateRangeAllowed: Y, checkMinMaxRange: z } = gt(e), { updateTimeValues: F, getSetDateTime: Z, setTime: h3, assignStartTime: ie, validateTime: oe, disabledTimesConfig: re } = Nn(e, B, o, n), _ = computed(
    () => (s) => O.value[s] ? O.value[s].month : 0
  ), H = computed(
    () => (s) => O.value[s] ? O.value[s].year : 0
  ), te = (s) => !V3.value.keepViewOnOffsetClick || s ? true : !v.value, E = (s, w, G, ve = false) => {
    var De, je2;
    te(ve) && (O.value[s] || (O.value[s] = { month: 0, year: 0 }), O.value[s].month = an(w) ? (De = O.value[s]) == null ? void 0 : De.month : w, O.value[s].year = an(G) ? (je2 = O.value[s]) == null ? void 0 : je2.year : G);
  }, c = () => {
    e.autoApply && t("select-date");
  };
  watch(
    o,
    (s, w) => {
      JSON.stringify(s) !== JSON.stringify(w) && X();
    },
    { deep: true }
  ), onMounted(() => {
    e.shadow || (o.value || (l(), b.value && ie(b.value)), X(true), e.focusStartDate && e.startDate && l());
  });
  const A = computed(() => {
    var s;
    return (s = e.flow) != null && s.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), p = () => {
    e.autoApply && A.value && t("auto-apply");
  }, X = (s = false) => {
    if (o.value)
      return Array.isArray(o.value) ? (a.value = o.value, R(s)) : U(o.value, s);
    if (T.value.count && s && !e.startDate)
      return m(K(), s);
  }, I = () => Array.isArray(o.value) && P.value.enabled ? getMonth(o.value[0]) === getMonth(o.value[1] ?? o.value[0]) : false, m = (s, w = false) => {
    if ((!T.value.count || !T.value.static || w) && E(0, getMonth(s), getYear(s)), T.value.count && (!T.value.solo || !o.value || I()))
      for (let G = 1; G < T.value.count; G++) {
        const ve = set(K(), { month: _.value(G - 1), year: H.value(G - 1) }), De = add(ve, { months: 1 });
        O.value[G] = { month: getMonth(De), year: getYear(De) };
      }
  }, U = (s, w) => {
    m(s), h3("hours", getHours(s)), h3("minutes", getMinutes(s)), h3("seconds", getSeconds(s)), T.value.count && w && le();
  }, ne = (s) => {
    if (T.value.count) {
      if (T.value.solo)
        return 0;
      const w = getMonth(s[0]), G = getMonth(s[1]);
      return Math.abs(G - w) < T.value.count ? 0 : 1;
    }
    return 1;
  }, u = (s, w) => {
    s[1] && P.value.showLastInRange ? m(s[ne(s)], w) : m(s[0], w);
    const G = (ve, De) => [
      ve(s[0]),
      s[1] ? ve(s[1]) : B[De][1]
    ];
    h3("hours", G(getHours, "hours")), h3("minutes", G(getMinutes, "minutes")), h3("seconds", G(getSeconds, "seconds"));
  }, k = (s, w) => {
    if ((P.value.enabled || e.weekPicker) && !C.value.enabled)
      return u(s, w);
    if (C.value.enabled && w) {
      const G = s[s.length - 1];
      return U(G, w);
    }
  }, R = (s) => {
    const w = o.value;
    k(w, s), T.value.count && T.value.solo && le();
  }, de2 = (s, w) => {
    const G = set(K(), { month: _.value(w), year: H.value(w) }), ve = s < 0 ? addMonths(G, 1) : subMonths(G, 1);
    L(getMonth(ve), getYear(ve), s < 0, e.preventMinMaxNavigation) && (E(w, getMonth(ve), getYear(ve)), t("update-month-year", { instance: w, month: getMonth(ve), year: getYear(ve) }), T.value.count && !T.value.solo && d(w), r());
  }, d = (s) => {
    for (let w = s - 1; w >= 0; w--) {
      const G = subMonths(set(K(), { month: _.value(w + 1), year: H.value(w + 1) }), 1);
      E(w, getMonth(G), getYear(G));
    }
    for (let w = s + 1; w <= T.value.count - 1; w++) {
      const G = addMonths(set(K(), { month: _.value(w - 1), year: H.value(w - 1) }), 1);
      E(w, getMonth(G), getYear(G));
    }
  }, le = () => {
    if (Array.isArray(o.value) && o.value.length === 2) {
      const s = K(
        K(o.value[1] ? o.value[1] : addMonths(o.value[0], 1))
      ), [w, G] = [getMonth(o.value[0]), getYear(o.value[0])], [ve, De] = [getMonth(o.value[1]), getYear(o.value[1])];
      (w !== ve || w === ve && G !== De) && T.value.solo && E(1, getMonth(s), getYear(s));
    } else
      o.value && !Array.isArray(o.value) && (E(0, getMonth(o.value), getYear(o.value)), m(K()));
  }, l = () => {
    e.startDate && (E(0, getMonth(K(e.startDate)), getYear(K(e.startDate))), T.value.count && d(0));
  }, S = (s, w) => {
    if (e.monthChangeOnScroll) {
      const G = (/* @__PURE__ */ new Date()).getTime() - f.value.getTime(), ve = Math.abs(s.deltaY);
      let De = 500;
      ve > 1 && (De = 100), ve > 100 && (De = 0), G > De && (f.value = /* @__PURE__ */ new Date(), de2(e.monthChangeOnScroll !== "inverse" ? -s.deltaY : s.deltaY, w));
    }
  }, x = (s, w, G = false) => {
    e.monthChangeOnArrows && e.vertical === G && J(s, w);
  }, J = (s, w) => {
    de2(s === "right" ? -1 : 1, w);
  }, ae = (s) => {
    if (W.value.markers)
      return aa(s.value, W.value.markers);
  }, g = (s, w) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [s == 0, true];
      case "fair":
        return [s == 0 || w > s, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, $ = (s, w, G, ve) => {
    if (e.sixWeeks && s.length < 6) {
      const De = 6 - s.length, je2 = (w.getDay() + 7 - ve) % 7, qt2 = 6 - (G.getDay() + 7 - ve) % 7, [Nt2, ha2] = g(je2, qt2);
      for (let yt2 = 1; yt2 <= De; yt2++)
        if (ha2 ? !!(yt2 % 2) == Nt2 : Nt2) {
          const Xt2 = s[0].days[0], ba2 = ge(addDays(Xt2.value, -7), getMonth(w));
          s.unshift({ days: ba2 });
        } else {
          const Xt2 = s[s.length - 1], ba2 = Xt2.days[Xt2.days.length - 1], Fn = ge(addDays(ba2.value, 1), getMonth(w));
          s.push({ days: Fn });
        }
    }
    return s;
  }, ge = (s, w) => {
    const G = K(s), ve = [];
    for (let De = 0; De < 7; De++) {
      const je2 = addDays(G, De), It2 = getMonth(je2) !== w;
      ve.push({
        text: e.hideOffsetDates && It2 ? "" : je2.getDate(),
        value: je2,
        current: !It2,
        classData: {}
      });
    }
    return ve;
  }, me = (s, w) => {
    const G = [], ve = new Date(w, s), De = new Date(w, s + 1, 0), je2 = e.weekStart, It2 = startOfWeek(ve, { weekStartsOn: je2 }), qt2 = (Nt2) => {
      const ha2 = ge(Nt2, s);
      if (G.push({ days: ha2 }), !G[G.length - 1].days.some(
        (yt2) => be(Qe(yt2.value), Qe(De))
      )) {
        const yt2 = addDays(Nt2, 7);
        qt2(yt2);
      }
    };
    return qt2(It2), $(G, ve, De, je2);
  }, Ee2 = (s) => {
    const w = vt(K(s.value), B.hours, B.minutes, Ke());
    t("date-update", w), C.value.enabled ? ja(w, o, C.value.limit) : o.value = w, n(), nextTick().then(() => {
      p();
    });
  }, ue2 = (s) => P.value.noDisabledRange ? An(a.value[0], s).some((G) => N(G)) : false, Te2 = () => {
    a.value = o.value ? o.value.slice() : [], a.value.length === 2 && !(P.value.fixedStart || P.value.fixedEnd) && (a.value = []);
  }, Ue2 = (s, w) => {
    const G = [
      K(s.value),
      addDays(K(s.value), +P.value.autoRange)
    ];
    Y(G) ? (w && Gt2(s.value), a.value = G) : t("invalid-date", s.value);
  }, Gt2 = (s) => {
    const w = getMonth(K(s)), G = getYear(K(s));
    if (E(0, w, G), T.value.count > 0)
      for (let ve = 1; ve < T.value.count; ve++) {
        const De = pl(
          set(K(s), { year: _.value(ve - 1), month: H.value(ve - 1) })
        );
        E(ve, De.month, De.year);
      }
  }, da2 = (s) => {
    if (ue2(s.value) || !z(s.value, o.value, P.value.fixedStart ? 0 : 1))
      return t("invalid-date", s.value);
    a.value = Bn(K(s.value), o, t, P);
  }, Bt2 = (s, w) => {
    if (Te2(), P.value.autoRange)
      return Ue2(s, w);
    if (P.value.fixedStart || P.value.fixedEnd)
      return da2(s);
    a.value[0] ? z(K(s.value), o.value) && !ue2(s.value) ? Ce(K(s.value), K(a.value[0])) ? (a.value.unshift(K(s.value)), t("range-end", a.value[0])) : (a.value[1] = K(s.value), t("range-end", a.value[1])) : (e.autoApply && t("auto-apply-invalid", s.value), t("invalid-date", s.value)) : (a.value[0] = K(s.value), t("range-start", a.value[0]));
  }, Ke = (s = true) => e.enableSeconds ? Array.isArray(B.seconds) ? s ? B.seconds[0] : B.seconds[1] : B.seconds : 0, Yt2 = (s) => {
    a.value[s] = vt(
      a.value[s],
      B.hours[s],
      B.minutes[s],
      Ke(s !== 1)
    );
  }, ca2 = () => {
    var s, w;
    a.value[0] && a.value[1] && +((s = a.value) == null ? void 0 : s[0]) > +((w = a.value) == null ? void 0 : w[1]) && (a.value.reverse(), t("range-start", a.value[0]), t("range-end", a.value[1]));
  }, Qt2 = () => {
    a.value.length && (a.value[0] && !a.value[1] ? Yt2(0) : (Yt2(0), Yt2(1), n()), ca2(), o.value = a.value.slice(), ia(a.value, t, e.autoApply, e.modelAuto));
  }, fa2 = (s, w = false) => {
    if (N(s.value) || !s.current && e.hideOffsetDates)
      return t("invalid-date", s.value);
    if (v.value = JSON.parse(JSON.stringify(s)), !P.value.enabled)
      return Ee2(s);
    sn(B.hours) && sn(B.minutes) && !C.value.enabled && (Bt2(s, w), Qt2());
  }, va2 = (s, w) => {
    var ve;
    E(s, w.month, w.year, true), T.value.count && !T.value.solo && d(s), t("update-month-year", { instance: s, month: w.month, year: w.year }), r(T.value.solo ? s : void 0);
    const G = (ve = e.flow) != null && ve.length ? e.flow[e.flowStep] : void 0;
    !w.fromNav && (G === at.month || G === at.year) && n();
  }, ma2 = (s, w) => {
    On({
      value: s,
      modelValue: o,
      range: P.value.enabled,
      timezone: w ? void 0 : D.value.timezone
    }), c(), e.multiCalendars && nextTick().then(() => X(true));
  }, pa2 = () => {
    P.value.enabled ? o.value && Array.isArray(o.value) && o.value[0] ? o.value = Ce(K(), o.value[0]) ? [K(), o.value[0]] : [o.value[0], K()] : o.value = [K()] : o.value = K(), c();
  }, ga2 = () => {
    if (Array.isArray(o.value))
      if (C.value.enabled) {
        const s = ya2();
        o.value[o.value.length - 1] = Z(s);
      } else
        o.value = o.value.map((s, w) => s && Z(s, w));
    else
      o.value = Z(o.value);
    t("time-update");
  }, ya2 = () => Array.isArray(o.value) && o.value.length ? o.value[o.value.length - 1] : null;
  return {
    calendars: O,
    modelValue: o,
    month: _,
    year: H,
    time: B,
    disabledTimesConfig: re,
    today: y,
    validateTime: oe,
    getCalendarDays: me,
    getMarker: ae,
    handleScroll: S,
    handleSwipe: J,
    handleArrow: x,
    selectDate: fa2,
    updateMonthYear: va2,
    presetDate: ma2,
    selectCurrentDate: pa2,
    updateTime: (s, w = true, G = false) => {
      F(s, w, G, ga2);
    }
  };
};
var Hr = { key: 0 };
var zr = defineComponent({
  __name: "DatePicker",
  props: {
    ...tt
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
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, {
      calendars: f,
      month: v,
      year: o,
      modelValue: O,
      time: B,
      disabledTimesConfig: y,
      today: T,
      validateTime: b,
      getCalendarDays: P,
      getMarker: V3,
      handleArrow: D,
      handleScroll: W,
      handleSwipe: C,
      selectDate: L,
      updateMonthYear: N,
      presetDate: Y,
      selectCurrentDate: z,
      updateTime: F
    } = Wr(a, n, I, m), Z = useSlots(), { setHoverDate: h3, getDayClassData: ie, clearHoverDate: oe } = Hl(O, a), { defaultedMultiCalendars: re } = Re(a), _ = ref([]), H = ref([]), te = ref(null), E = Ge(Z, "calendar"), c = Ge(Z, "monthYear"), A = Ge(Z, "timePicker"), p = (l) => {
      a.shadow || n("mount", l);
    };
    watch(
      f,
      () => {
        a.shadow || setTimeout(() => {
          n("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const X = computed(() => (l) => P(v.value(l), o.value(l)).map((S) => ({
      ...S,
      days: S.days.map((x) => (x.marker = V3(x), x.classData = ie(x), x))
    })));
    function I(l) {
      var S;
      l || l === 0 ? (S = H.value[l]) == null || S.triggerTransition(v.value(l), o.value(l)) : H.value.forEach((x, J) => x.triggerTransition(v.value(J), o.value(J)));
    }
    function m() {
      n("update-flow-step");
    }
    const U = (l, S = false) => {
      L(l, S), a.spaceConfirm && n("select-date");
    };
    return t({
      clearHoverDate: oe,
      presetDate: Y,
      selectCurrentDate: z,
      toggleMonthPicker: (l, S, x = 0) => {
        var J;
        (J = _.value[x]) == null || J.toggleMonthPicker(l, S);
      },
      toggleYearPicker: (l, S, x = 0) => {
        var J;
        (J = _.value[x]) == null || J.toggleYearPicker(l, S);
      },
      toggleTimePicker: (l, S, x) => {
        var J;
        (J = te.value) == null || J.toggleTimePicker(l, S, x);
      },
      handleArrow: D,
      updateMonthYear: N,
      getSidebarProps: () => ({
        modelValue: O,
        month: v,
        year: o,
        time: B,
        updateTime: F,
        updateMonthYear: N,
        selectDate: L,
        presetDate: Y
      }),
      changeMonth: (l) => {
        var S;
        (S = _.value[0]) == null || S.handleMonthYearChange(l, true);
      },
      changeYear: (l) => {
        N(0, { month: v.value(0), year: o.value(0) + (l ? 1 : -1), fromNav: true });
      },
      selectWeekDate: (l) => {
        if (!a.range) {
          const S = O.value ? O.value : T, x = l ? startOfWeek(S, { weekStartsOn: 1 }) : endOfWeek(S, { weekStartsOn: 1 });
          L({
            value: x,
            current: getMonth(S) === v.value(0),
            text: "",
            classData: {}
          });
        }
      }
    }), (l, S) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(ua, {
        "multi-calendars": unref(re).count,
        collapse: l.collapse
      }, {
        default: withCtx(({ instance: x, index: J }) => [
          l.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Cr, mergeProps({
            key: 0,
            ref: (ae) => {
              ae && (_.value[J] = ae);
            },
            months: unref(bn)(l.formatLocale, l.locale, l.monthNameFormat),
            years: unref(Ha)(l.yearRange, l.locale, l.reverseYears),
            month: unref(v)(x),
            year: unref(o)(x),
            instance: x
          }, l.$props, {
            onMount: S[0] || (S[0] = (ae) => p(unref(Mt).header)),
            onResetFlow: S[1] || (S[1] = (ae) => l.$emit("reset-flow")),
            onUpdateMonthYear: (ae) => unref(N)(x, ae),
            onOverlayClosed: S[2] || (S[2] = (ae) => l.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(c), (ae, g) => ({
              name: ae,
              fn: withCtx(($) => [
                renderSlot(l.$slots, ae, normalizeProps(guardReactiveProps($)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Vr, mergeProps({
            ref: (ae) => {
              ae && (H.value[J] = ae);
            },
            "mapped-dates": X.value(x),
            month: unref(v)(x),
            year: unref(o)(x),
            instance: x
          }, l.$props, {
            onSelectDate: (ae) => unref(L)(ae, x !== 1),
            onHandleSpace: (ae) => U(ae, x !== 1),
            onSetHoverDate: S[3] || (S[3] = (ae) => unref(h3)(ae)),
            onHandleScroll: (ae) => unref(W)(ae, x),
            onHandleSwipe: (ae) => unref(C)(ae, x),
            onMount: S[4] || (S[4] = (ae) => p(unref(Mt).calendar)),
            onResetFlow: S[5] || (S[5] = (ae) => l.$emit("reset-flow")),
            onTooltipOpen: S[6] || (S[6] = (ae) => l.$emit("tooltip-open", ae)),
            onTooltipClose: S[7] || (S[7] = (ae) => l.$emit("tooltip-close", ae))
          }), createSlots({ _: 2 }, [
            renderList(unref(E), (ae, g) => ({
              name: ae,
              fn: withCtx(($) => [
                renderSlot(l.$slots, ae, normalizeProps(guardReactiveProps({ ...$ })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      l.enableTimePicker ? (openBlock(), createElementBlock("div", Hr, [
        l.$slots["time-picker"] ? renderSlot(l.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(B), updateTime: unref(F) }))) : (openBlock(), createBlock(In, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: te
        }, l.$props, {
          hours: unref(B).hours,
          minutes: unref(B).minutes,
          seconds: unref(B).seconds,
          "internal-model-value": l.internalModelValue,
          "disabled-times-config": unref(y),
          "validate-time": unref(b),
          onMount: S[8] || (S[8] = (x) => p(unref(Mt).timePicker)),
          "onUpdate:hours": S[9] || (S[9] = (x) => unref(F)(x)),
          "onUpdate:minutes": S[10] || (S[10] = (x) => unref(F)(x, false)),
          "onUpdate:seconds": S[11] || (S[11] = (x) => unref(F)(x, false, true)),
          onResetFlow: S[12] || (S[12] = (x) => l.$emit("reset-flow")),
          onOverlayClosed: S[13] || (S[13] = (x) => l.$emit("time-picker-close")),
          onOverlayOpened: S[14] || (S[14] = (x) => l.$emit("time-picker-open", x)),
          onAmPmChange: S[15] || (S[15] = (x) => l.$emit("am-pm-change", x))
        }), createSlots({ _: 2 }, [
          renderList(unref(A), (x, J) => ({
            name: x,
            fn: withCtx((ae) => [
              renderSlot(l.$slots, x, normalizeProps(guardReactiveProps(ae)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Ur = (e, t) => {
  const r = ref(), {
    defaultedMultiCalendars: n,
    defaultedConfig: a,
    defaultedHighlight: f,
    defaultedRange: v,
    propDates: o,
    defaultedFilters: O,
    defaultedMultiDates: B
  } = Re(e), { modelValue: y, year: T, month: b, calendars: P } = Kt(e, t), { isDisabled: V3 } = gt(e), { selectYear: D, groupedYears: W, showYearPicker: C, isDisabled: L, toggleYearPicker: N, handleYearSelect: Y, handleYear: z } = Yn({
    modelValue: y,
    multiCalendars: n,
    highlight: f,
    calendars: P,
    propDates: o,
    month: b,
    year: T,
    filters: O,
    props: e,
    emit: t
  }), F = (A, p) => [A, p].map((X) => format(X, "MMMM", { locale: e.formatLocale })).join("-"), Z = computed(() => (A) => y.value ? Array.isArray(y.value) ? y.value.some((p) => isSameQuarter(A, p)) : isSameQuarter(y.value, A) : false), h3 = (A) => {
    if (v.value.enabled) {
      if (Array.isArray(y.value)) {
        const p = be(A, y.value[0]) || be(A, y.value[1]);
        return ra(y.value, r.value, A) && !p;
      }
      return false;
    }
    return false;
  }, ie = (A, p) => A.quarter === getQuarter(p) && A.year === getYear(p), oe = (A) => typeof f.value == "function" ? f.value({ quarter: getQuarter(A), year: getYear(A) }) : !!f.value.quarters.find((p) => ie(p, A)), re = computed(() => (A) => {
    const p = set(/* @__PURE__ */ new Date(), { year: T.value(A) });
    return eachQuarterOfInterval({
      start: startOfYear(p),
      end: endOfYear(p)
    }).map((X) => {
      const I = startOfQuarter(X), m = endOfQuarter(X), U = V3(X), ne = h3(I), u = oe(I);
      return {
        text: F(I, m),
        value: I,
        active: Z.value(I),
        highlighted: u,
        disabled: U,
        isBetween: ne
      };
    });
  }), _ = (A) => {
    ja(A, y, B.value.limit), t("auto-apply", true);
  }, H = (A) => {
    y.value = Ga(y, A, t), ia(y.value, t, e.autoApply, e.modelAuto);
  }, te = (A) => {
    y.value = A, t("auto-apply");
  };
  return {
    defaultedConfig: a,
    defaultedMultiCalendars: n,
    groupedYears: W,
    year: T,
    isDisabled: L,
    quarters: re,
    showYearPicker: C,
    modelValue: y,
    setHoverDate: (A) => {
      r.value = A;
    },
    selectYear: D,
    selectQuarter: (A, p, X) => {
      if (!X)
        return P.value[p].month = getMonth(endOfQuarter(A)), B.value.enabled ? _(A) : v.value.enabled ? H(A) : te(A);
    },
    toggleYearPicker: N,
    handleYearSelect: Y,
    handleYear: z
  };
};
var Kr = { class: "dp--quarter-items" };
var jr = ["data-test", "disabled", "onClick", "onMouseover"];
var Gr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...tt
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "overlay-closed",
    "auto-apply",
    "range-start",
    "range-end"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, f = useSlots(), v = Ge(f, "yearMode"), {
      defaultedMultiCalendars: o,
      defaultedConfig: O,
      groupedYears: B,
      year: y,
      isDisabled: T,
      quarters: b,
      modelValue: P,
      showYearPicker: V3,
      setHoverDate: D,
      selectQuarter: W,
      toggleYearPicker: C,
      handleYearSelect: L,
      handleYear: N
    } = Ur(a, n);
    return t({ getSidebarProps: () => ({
      modelValue: P,
      year: y,
      selectQuarter: W,
      handleYearSelect: L,
      handleYear: N
    }) }), (z, F) => (openBlock(), createBlock(ua, {
      "multi-calendars": unref(o).count,
      collapse: z.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: Z }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(O).modeHeight}px` })
        }, [
          z.$slots["top-extra"] ? renderSlot(z.$slots, "top-extra", {
            key: 0,
            value: z.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(_n, mergeProps(z.$props, {
              items: unref(B)(Z),
              instance: Z,
              "show-year-picker": unref(V3)[Z],
              year: unref(y)(Z),
              "is-disabled": (h3) => unref(T)(Z, h3),
              onHandleYear: (h3) => unref(N)(Z, h3),
              onYearSelect: (h3) => unref(L)(h3, Z),
              onToggleYearPicker: (h3) => unref(C)(Z, h3 == null ? void 0 : h3.flow, h3 == null ? void 0 : h3.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(v), (h3, ie) => ({
                name: h3,
                fn: withCtx((oe) => [
                  renderSlot(z.$slots, h3, normalizeProps(guardReactiveProps(oe)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Kr, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(b)(Z), (h3, ie) => (openBlock(), createElementBlock("div", { key: ie }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": h3.active,
                  "dp--qr-btn-between": h3.isBetween,
                  "dp--qr-btn-disabled": h3.disabled,
                  "dp--highlighted": h3.highlighted
                }]),
                "data-test": h3.value,
                disabled: h3.disabled,
                onClick: (oe) => unref(W)(h3.value, Z, h3.disabled),
                onMouseover: (oe) => unref(D)(h3.value)
              }, [
                z.$slots.quarter ? renderSlot(z.$slots, "quarter", {
                  key: 0,
                  value: h3.value,
                  text: h3.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(h3.text), 1)
                ], 64))
              ], 42, jr)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var Qr = ["id", "aria-label"];
var qr = {
  key: 0,
  class: "dp--menu-load-container"
};
var Xr = createBaseVNode("span", { class: "dp--menu-loader" }, null, -1);
var Jr = [
  Xr
];
var Zr = {
  key: 0,
  class: "dp__sidebar_left"
};
var xr = ["data-test", "onClick", "onKeydown"];
var eo = {
  key: 2,
  class: "dp__sidebar_right"
};
var to = {
  key: 3,
  class: "dp__action_extra"
};
var un = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...sa,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    noOverlayFocus: { type: Boolean, default: false },
    collapse: { type: Boolean, default: false },
    getInputRect: { type: Function, default: () => ({}) }
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
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, f = ref(null), v = computed(() => {
      const { openOnTop: g, ...$ } = a;
      return {
        ...$,
        flowStep: h3.value,
        collapse: a.collapse,
        noOverlayFocus: a.noOverlayFocus,
        menuWrapRef: f.value
      };
    }), { setMenuFocused: o, setShiftKey: O, control: B } = Cn(), y = useSlots(), { defaultedTextInput: T, defaultedInline: b, defaultedConfig: P } = Re(a), V3 = ref(null), D = ref(0), W = ref(null), C = ref(false), L = ref(null);
    onMounted(() => {
      if (!a.shadow) {
        C.value = true, N(), window.addEventListener("resize", N);
        const g = Ie(f);
        if (g && !T.value.enabled && !b.value.enabled && (o(true), te()), g) {
          const $ = (ge) => {
            P.value.allowPreventDefault && ge.preventDefault(), ft(ge, P.value, true);
          };
          g.addEventListener("pointerdown", $), g.addEventListener("mousedown", $);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", N);
    });
    const N = () => {
      const g = Ie(W);
      g && (D.value = g.getBoundingClientRect().width);
    }, { arrowRight: Y, arrowLeft: z, arrowDown: F, arrowUp: Z } = pt(), { flowStep: h3, updateFlowStep: ie, childMount: oe, resetFlow: re } = zl(a, n, L), _ = computed(() => a.monthPicker ? rr : a.yearPicker ? sr : a.timePicker ? $r : a.quarterPicker ? Gr : zr), H = computed(() => {
      var ge;
      if (P.value.arrowLeft)
        return P.value.arrowLeft;
      const g = (ge = f.value) == null ? void 0 : ge.getBoundingClientRect(), $ = a.getInputRect();
      return $.width < D.value && $.left <= ((g == null ? void 0 : g.left) ?? 0) ? `${$.width / 2}px` : "50%";
    }), te = () => {
      const g = Ie(f);
      g && g.focus({ preventScroll: true });
    }, E = computed(() => {
      var g;
      return ((g = L.value) == null ? void 0 : g.getSidebarProps()) || {};
    }), c = () => {
      a.openOnTop && n("recalculate-position");
    }, A = Ge(y, "action"), p = computed(() => a.monthPicker || a.yearPicker ? Ge(y, "monthYear") : a.timePicker ? Ge(y, "timePicker") : Ge(y, "shared")), X = computed(() => a.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), I = computed(() => ({
      dp__menu_disabled: a.disabled,
      dp__menu_readonly: a.readonly,
      "dp-menu-loading": a.loading
    })), m = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !b.value.enabled,
        dp__relative: b.value.enabled,
        [a.menuClassName]: !!a.menuClassName
      })
    ), U = (g) => {
      ft(g, P.value, true);
    }, ne = () => {
      a.escClose && n("close-picker");
    }, u = (g) => {
      if (a.arrowNavigation) {
        if (g === "up")
          return Z();
        if (g === "down")
          return F();
        if (g === "left")
          return z();
        if (g === "right")
          return Y();
      } else
        g === "left" || g === "up" ? le("handleArrow", "left", 0, g === "up") : le("handleArrow", "right", 0, g === "down");
    }, k = (g) => {
      O(g.shiftKey), !a.disableMonthYearSelect && g.code === "Tab" && g.target.classList.contains("dp__menu") && B.value.shiftKeyInMenu && (g.preventDefault(), ft(g, P.value, true), n("close-picker"));
    }, R = () => {
      te(), n("time-picker-close");
    }, de2 = (g) => {
      var $, ge, me;
      ($ = L.value) == null || $.toggleTimePicker(false, false), (ge = L.value) == null || ge.toggleMonthPicker(false, false, g), (me = L.value) == null || me.toggleYearPicker(false, false, g);
    }, d = (g, $ = 0) => {
      var ge, me, Ee2;
      return g === "month" ? (ge = L.value) == null ? void 0 : ge.toggleMonthPicker(false, true, $) : g === "year" ? (me = L.value) == null ? void 0 : me.toggleYearPicker(false, true, $) : g === "time" ? (Ee2 = L.value) == null ? void 0 : Ee2.toggleTimePicker(true, false) : de2($);
    }, le = (g, ...$) => {
      var ge, me;
      (ge = L.value) != null && ge[g] && ((me = L.value) == null || me[g](...$));
    }, l = () => {
      le("selectCurrentDate");
    }, S = (g, $) => {
      le("presetDate", g, $);
    }, x = () => {
      le("clearHoverDate");
    }, J = (g, $) => {
      le("updateMonthYear", g, $);
    }, ae = (g) => {
      if (k(g), g.key === "Home" || g.key === "End")
        return le("selectWeekDate", g.key === "Home");
      if (g.key === "PageUp" || g.key === "PageDown")
        return g.shiftKey ? le("changeYear", g.key === "PageUp") : le("changeMonth", g.key === "PageUp");
    };
    return t({
      updateMonthYear: J,
      switchView: d
    }), (g, $) => {
      var ge, me, Ee2;
      return openBlock(), createElementBlock("div", {
        id: g.uid ? `dp-menu-${g.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: f,
        tabindex: "0",
        role: "dialog",
        "aria-label": (ge = g.ariaLabels) == null ? void 0 : ge.menu,
        class: normalizeClass(m.value),
        style: normalizeStyle({ "--dp-arrow-left": H.value }),
        onMouseleave: x,
        onClick: U,
        onKeydown: [
          withKeys(ne, ["esc"]),
          $[18] || ($[18] = withKeys(withModifiers((ue2) => u("left"), ["prevent"]), ["left"])),
          $[19] || ($[19] = withKeys(withModifiers((ue2) => u("up"), ["prevent"]), ["up"])),
          $[20] || ($[20] = withKeys(withModifiers((ue2) => u("down"), ["prevent"]), ["down"])),
          $[21] || ($[21] = withKeys(withModifiers((ue2) => u("right"), ["prevent"]), ["right"])),
          ae
        ]
      }, [
        (g.disabled || g.readonly) && unref(b).enabled || g.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(I.value)
        }, [
          g.loading ? (openBlock(), createElementBlock("div", qr, Jr)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        !unref(b).enabled && !g.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(X.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: W,
          class: normalizeClass({
            dp__menu_content_wrapper: ((me = g.presetDates) == null ? void 0 : me.length) || !!g.$slots["left-sidebar"] || !!g.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((Ee2 = g.presetDates) == null ? void 0 : Ee2.length) || !!g.$slots["left-sidebar"] || !!g.$slots["right-sidebar"])
          }),
          style: normalizeStyle({ "--dp-menu-width": `${D.value}px` })
        }, [
          g.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Zr, [
            renderSlot(g.$slots, "left-sidebar", normalizeProps(guardReactiveProps(E.value)))
          ])) : createCommentVNode("", true),
          g.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(g.presetDates, (ue2, Te2) => (openBlock(), createElementBlock(Fragment, { key: Te2 }, [
              ue2.slot ? renderSlot(g.$slots, ue2.slot, {
                key: 0,
                presetDate: S,
                label: ue2.label,
                value: ue2.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(ue2.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test": ue2.testId ?? void 0,
                onClick: withModifiers((Ue2) => S(ue2.value, ue2.noTz), ["prevent"]),
                onKeydown: [
                  withKeys(withModifiers((Ue2) => S(ue2.value, ue2.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((Ue2) => S(ue2.value, ue2.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(ue2.label), 47, xr))
            ], 64))), 128))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: V3,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(_.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: L
            }, v.value, {
              "flow-step": unref(h3),
              onMount: unref(oe),
              onUpdateFlowStep: unref(ie),
              onResetFlow: unref(re),
              onFocusMenu: te,
              onSelectDate: $[0] || ($[0] = (ue2) => g.$emit("select-date")),
              onDateUpdate: $[1] || ($[1] = (ue2) => g.$emit("date-update", ue2)),
              onTooltipOpen: $[2] || ($[2] = (ue2) => g.$emit("tooltip-open", ue2)),
              onTooltipClose: $[3] || ($[3] = (ue2) => g.$emit("tooltip-close", ue2)),
              onAutoApply: $[4] || ($[4] = (ue2) => g.$emit("auto-apply", ue2)),
              onRangeStart: $[5] || ($[5] = (ue2) => g.$emit("range-start", ue2)),
              onRangeEnd: $[6] || ($[6] = (ue2) => g.$emit("range-end", ue2)),
              onInvalidFixedRange: $[7] || ($[7] = (ue2) => g.$emit("invalid-fixed-range", ue2)),
              onTimeUpdate: $[8] || ($[8] = (ue2) => g.$emit("time-update")),
              onAmPmChange: $[9] || ($[9] = (ue2) => g.$emit("am-pm-change", ue2)),
              onTimePickerOpen: $[10] || ($[10] = (ue2) => g.$emit("time-picker-open", ue2)),
              onTimePickerClose: R,
              onRecalculatePosition: c,
              onUpdateMonthYear: $[11] || ($[11] = (ue2) => g.$emit("update-month-year", ue2)),
              onAutoApplyInvalid: $[12] || ($[12] = (ue2) => g.$emit("auto-apply-invalid", ue2)),
              onInvalidDate: $[13] || ($[13] = (ue2) => g.$emit("invalid-date", ue2)),
              "onUpdate:internalModelValue": $[14] || ($[14] = (ue2) => g.$emit("update:internal-model-value", ue2))
            }), createSlots({ _: 2 }, [
              renderList(p.value, (ue2, Te2) => ({
                name: ue2,
                fn: withCtx((Ue2) => [
                  renderSlot(g.$slots, ue2, normalizeProps(guardReactiveProps({ ...Ue2 })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          g.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", eo, [
            renderSlot(g.$slots, "right-sidebar", normalizeProps(guardReactiveProps(E.value)))
          ])) : createCommentVNode("", true),
          g.$slots["action-extra"] ? (openBlock(), createElementBlock("div", to, [
            g.$slots["action-extra"] ? renderSlot(g.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: l
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !g.autoApply || unref(P).keepActionRow ? (openBlock(), createBlock(Xl, mergeProps({
          key: 2,
          "menu-mount": C.value
        }, v.value, {
          "calendar-width": D.value,
          onClosePicker: $[15] || ($[15] = (ue2) => g.$emit("close-picker")),
          onSelectDate: $[16] || ($[16] = (ue2) => g.$emit("select-date")),
          onInvalidSelect: $[17] || ($[17] = (ue2) => g.$emit("invalid-select")),
          onSelectNow: l
        }), createSlots({ _: 2 }, [
          renderList(unref(A), (ue2, Te2) => ({
            name: ue2,
            fn: withCtx((Ue2) => [
              renderSlot(g.$slots, ue2, normalizeProps(guardReactiveProps({ ...Ue2 })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 46, Qr);
    };
  }
});
var ao = typeof window < "u" ? window : void 0;
var Ca = () => {
};
var no = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var lo = (e, t, r, n) => {
  if (!e)
    return Ca;
  let a = Ca;
  const f = watch(
    () => unref(e),
    (o) => {
      a(), o && (o.addEventListener(t, r, n), a = () => {
        o.removeEventListener(t, r, n), a = Ca;
      });
    },
    { immediate: true, flush: "post" }
  ), v = () => {
    f(), a();
  };
  return no(v), v;
};
var ro = (e, t, r, n = {}) => {
  const { window: a = ao, event: f = "pointerdown" } = n;
  return a ? lo(a, f, (o) => {
    const O = Ie(e), B = Ie(t);
    !O || !B || O === o.target || o.composedPath().includes(O) || o.composedPath().includes(B) || r(o);
  }, { passive: true }) : void 0;
};
var oo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...sa
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
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, f = useSlots(), v = ref(false), o = toRef(a, "modelValue"), O = toRef(a, "timezone"), B = ref(null), y = ref(null), T = ref(null), b = ref(false), P = ref(null), V3 = ref(false), D = ref(false), W = ref(false), { setMenuFocused: C, setShiftKey: L } = Cn(), { clearArrowNav: N } = pt(), { validateDate: Y, isValidTime: z } = gt(a), {
      defaultedTransitions: F,
      defaultedTextInput: Z,
      defaultedInline: h3,
      defaultedConfig: ie,
      defaultedRange: oe,
      defaultedMultiDates: re
    } = Re(a), { menuTransition: _, showTransition: H } = Ut(F);
    onMounted(() => {
      u(a.modelValue), nextTick().then(() => {
        if (!h3.value.enabled) {
          const s = I(P.value);
          s == null || s.addEventListener("scroll", ae), window == null || window.addEventListener("resize", g);
        }
      }), h3.value.enabled && (v.value = true), window == null || window.addEventListener("keyup", $), window == null || window.addEventListener("keydown", ge);
    }), onUnmounted(() => {
      if (!h3.value.enabled) {
        const s = I(P.value);
        s == null || s.removeEventListener("scroll", ae), window == null || window.removeEventListener("resize", g);
      }
      window == null || window.removeEventListener("keyup", $), window == null || window.removeEventListener("keydown", ge);
    });
    const te = Ge(f, "all", a.presetDates), E = Ge(f, "input");
    watch(
      [o, O],
      () => {
        u(o.value);
      },
      { deep: true }
    );
    const { openOnTop: c, menuStyle: A, xCorrect: p, setMenuPosition: X, getScrollableParent: I, shadowRender: m } = Ll({
      menuRef: B,
      menuRefInner: y,
      inputRef: T,
      pickerWrapperRef: P,
      inline: h3,
      emit: n,
      props: a,
      slots: f
    }), {
      inputValue: U,
      internalModelValue: ne,
      parseExternalModelValue: u,
      emitModelValue: k,
      formatInputValue: R,
      checkBeforeEmit: de2
    } = El(n, a, b), d = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: a.dark,
        dp__theme_light: !a.dark,
        dp__flex_display: h3.value.enabled,
        "dp--flex-display-collapsed": W.value,
        dp__flex_display_with_input: h3.value.input
      })
    ), le = computed(() => a.dark ? "dp__theme_dark" : "dp__theme_light"), l = computed(() => a.teleport ? {
      to: typeof a.teleport == "boolean" ? "body" : a.teleport,
      disabled: !a.teleport || h3.value.enabled
    } : {}), S = computed(() => ({ class: "dp__outer_menu_wrap" })), x = computed(() => h3.value.enabled && (a.timePicker || a.monthPicker || a.yearPicker || a.quarterPicker)), J = () => {
      var s, w;
      return (w = (s = T.value) == null ? void 0 : s.$el) == null ? void 0 : w.getBoundingClientRect();
    }, ae = () => {
      v.value && (ie.value.closeOnScroll ? Ke() : X());
    }, g = () => {
      var w;
      v.value && X();
      const s = (w = y.value) == null ? void 0 : w.$el.getBoundingClientRect().width;
      W.value = document.body.offsetWidth <= s;
    }, $ = (s) => {
      s.key === "Tab" && !h3.value.enabled && !a.teleport && ie.value.tabOutClosesMenu && (P.value.contains(document.activeElement) || Ke()), D.value = s.shiftKey;
    }, ge = (s) => {
      D.value = s.shiftKey;
    }, me = () => {
      !a.disabled && !a.readonly && (m(un, a), X(false), v.value = true, v.value && n("open"), v.value || Bt2(), u(a.modelValue));
    }, Ee2 = () => {
      var s;
      U.value = "", Bt2(), (s = T.value) == null || s.setParsedDate(null), n("update:model-value", null), n("update:model-timezone-value", null), n("cleared"), ie.value.closeOnClearValue && Ke();
    }, ue2 = () => {
      const s = ne.value;
      return !s || !Array.isArray(s) && Y(s) ? true : Array.isArray(s) ? re.value.enabled || s.length === 2 && Y(s[0]) && Y(s[1]) ? true : oe.value.partialRange && !a.timePicker ? Y(s[0]) : false : false;
    }, Te2 = () => {
      de2() && ue2() ? (k(), Ke()) : n("invalid-select", ne.value);
    }, Ue2 = (s) => {
      Gt2(), k(), ie.value.closeOnAutoApply && !s && Ke();
    }, Gt2 = () => {
      T.value && Z.value.enabled && T.value.setParsedDate(ne.value);
    }, da2 = (s = false) => {
      a.autoApply && z(ne.value) && ue2() && (oe.value.enabled && Array.isArray(ne.value) ? (oe.value.partialRange || ne.value.length === 2) && Ue2(s) : Ue2(s));
    }, Bt2 = () => {
      Z.value.enabled || (ne.value = null);
    }, Ke = () => {
      h3.value.enabled || (v.value && (v.value = false, p.value = false, C(false), L(false), N(), n("closed"), U.value && u(o.value)), Bt2(), n("blur"));
    }, Yt2 = (s, w, G = false) => {
      if (!s) {
        ne.value = null;
        return;
      }
      const ve = Array.isArray(s) ? !s.some((je2) => !Y(je2)) : Y(s), De = z(s);
      ve && De && (ne.value = s, w && (V3.value = G, Te2(), n("text-submit")));
    }, ca2 = () => {
      a.autoApply && z(ne.value) && k(), Gt2();
    }, Qt2 = () => v.value ? Ke() : me(), fa2 = (s) => {
      ne.value = s;
    }, va2 = () => {
      Z.value.enabled && (b.value = true, R()), n("focus");
    }, ma2 = () => {
      if (Z.value.enabled && (b.value = false, u(a.modelValue), V3.value)) {
        const s = dl(P.value, D.value);
        s == null || s.focus();
      }
      n("blur");
    }, pa2 = (s) => {
      y.value && y.value.updateMonthYear(0, {
        month: tn(s.month),
        year: tn(s.year)
      });
    }, ga2 = (s) => {
      u(s ?? a.modelValue);
    }, ya2 = (s, w) => {
      var G;
      (G = y.value) == null || G.switchView(s, w);
    }, Qa = (s) => ie.value.onClickOutside ? ie.value.onClickOutside(s) : Ke();
    return ro(B, T, () => Qa(ue2)), t({
      closeMenu: Ke,
      selectDate: Te2,
      clearValue: Ee2,
      openMenu: me,
      onScroll: ae,
      formatInputValue: R,
      // exposed for testing purposes
      updateInternalModelValue: fa2,
      // modify internal modelValue
      setMonthYear: pa2,
      parseModel: ga2,
      switchView: ya2,
      toggleMenu: Qt2
    }), (s, w) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: P,
      class: normalizeClass(d.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(Gl, mergeProps({
        ref_key: "inputRef",
        ref: T,
        "input-value": unref(U),
        "onUpdate:inputValue": w[0] || (w[0] = (G) => isRef(U) ? U.value = G : null),
        "is-menu-open": v.value
      }, s.$props, {
        onClear: Ee2,
        onOpen: me,
        onSetInputDate: Yt2,
        onSetEmptyDate: unref(k),
        onSelectDate: Te2,
        onToggle: Qt2,
        onClose: Ke,
        onFocus: va2,
        onBlur: ma2,
        onRealBlur: w[1] || (w[1] = (G) => b.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(E), (G, ve) => ({
          name: G,
          fn: withCtx((De) => [
            renderSlot(s.$slots, G, normalizeProps(guardReactiveProps(De)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(s.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps(l.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(_)(unref(c)),
            css: unref(H) && !unref(h3).enabled
          }, {
            default: withCtx(() => [
              v.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: B
              }, S.value, {
                class: { "dp--menu-wrapper": !unref(h3).enabled },
                style: unref(h3).enabled ? void 0 : unref(A)
              }), [
                createVNode(un, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: y
                }, s.$props, {
                  "internal-model-value": unref(ne),
                  "onUpdate:internalModelValue": w[2] || (w[2] = (G) => isRef(ne) ? ne.value = G : null),
                  class: { [le.value]: true, "dp--menu-wrapper": s.teleport },
                  "open-on-top": unref(c),
                  "no-overlay-focus": x.value,
                  collapse: W.value,
                  "get-input-rect": J,
                  onClosePicker: Ke,
                  onSelectDate: Te2,
                  onAutoApply: da2,
                  onTimeUpdate: ca2,
                  onFlowStep: w[3] || (w[3] = (G) => s.$emit("flow-step", G)),
                  onUpdateMonthYear: w[4] || (w[4] = (G) => s.$emit("update-month-year", G)),
                  onInvalidSelect: w[5] || (w[5] = (G) => s.$emit("invalid-select", unref(ne))),
                  onAutoApplyInvalid: w[6] || (w[6] = (G) => s.$emit("invalid-select", G)),
                  onInvalidFixedRange: w[7] || (w[7] = (G) => s.$emit("invalid-fixed-range", G)),
                  onRecalculatePosition: unref(X),
                  onTooltipOpen: w[8] || (w[8] = (G) => s.$emit("tooltip-open", G)),
                  onTooltipClose: w[9] || (w[9] = (G) => s.$emit("tooltip-close", G)),
                  onTimePickerOpen: w[10] || (w[10] = (G) => s.$emit("time-picker-open", G)),
                  onTimePickerClose: w[11] || (w[11] = (G) => s.$emit("time-picker-close", G)),
                  onAmPmChange: w[12] || (w[12] = (G) => s.$emit("am-pm-change", G)),
                  onRangeStart: w[13] || (w[13] = (G) => s.$emit("range-start", G)),
                  onRangeEnd: w[14] || (w[14] = (G) => s.$emit("range-end", G)),
                  onDateUpdate: w[15] || (w[15] = (G) => s.$emit("date-update", G)),
                  onInvalidDate: w[16] || (w[16] = (G) => s.$emit("invalid-date", G))
                }), createSlots({ _: 2 }, [
                  renderList(unref(te), (G, ve) => ({
                    name: G,
                    fn: withCtx((De) => [
                      renderSlot(s.$slots, G, normalizeProps(guardReactiveProps({ ...De })))
                    ])
                  }))
                ]), 1040, ["internal-model-value", "class", "open-on-top", "no-overlay-focus", "collapse", "onRecalculatePosition"])
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
var En = (() => {
  const e = oo;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var so = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: En
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(so).forEach(([e, t]) => {
  e !== "default" && (En[e] = t);
});

// node_modules/.pnpm/@vueuse+integrations@10.9.0_async-validator@4.2.5_focus-trap@7.5.4_qrcode@1.5.3_sortablejs@1.15.2_vue@3.4.27/node_modules/@vueuse/integrations/useQRCode.mjs
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

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/shared/ssr-window.esm.mjs
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
    if (typeof target[key] === "undefined")
      target[key] = src[key];
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

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/shared/utils.mjs
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
    if (window2.WebKitCSSMatrix)
      curTransform = transformMatrix.m41;
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[12]);
    else
      curTransform = parseFloat(matrix[4]);
  }
  if (axis === "y") {
    if (window2.WebKitCSSMatrix)
      curTransform = transformMatrix.m42;
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[13]);
    else
      curTransform = parseFloat(matrix[5]);
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
      if (prev.matches(selector))
        prevEls.push(prev);
    } else
      prevEls.push(prev);
    el2 = prev;
  }
  return prevEls;
}
function elementNextAll(el2, selector) {
  const nextEls = [];
  while (el2.nextElementSibling) {
    const next = el2.nextElementSibling;
    if (selector) {
      if (next.matches(selector))
        nextEls.push(next);
    } else
      nextEls.push(next);
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
      if (child.nodeType === 1)
        i += 1;
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
      if (parent.matches(selector))
        parents.push(parent);
    } else {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}
function elementTransitionEnd(el2, callback) {
  function fireCallBack(e) {
    if (e.target !== el2)
      return;
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

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/shared/swiper-core.mjs
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
  const ua3 = userAgent || window2.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window2.screen.width;
  const screenHeight = window2.screen.height;
  const android = ua3.match(/(Android);?[\s\/]+([\d.]+)?/);
  let ipad = ua3.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua3.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua3.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === "Win32";
  let macos = platform === "MacIntel";
  const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua3.match(/(Version)\/([\d.]+)/);
    if (!ipad)
      ipad = [0, 1, "13_0_0"];
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
    const ua3 = window2.navigator.userAgent.toLowerCase();
    return ua3.indexOf("safari") >= 0 && ua3.indexOf("chrome") < 0 && ua3.indexOf("android") < 0;
  }
  if (isSafari()) {
    const ua3 = String(window2.navigator.userAgent);
    if (ua3.includes("Version/")) {
      const [major, minor] = ua3.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
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
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    emit("beforeResize");
    emit("resize");
  };
  const createObserver = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
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
          if (target && target !== swiper.el)
            return;
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
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
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
      if (swiper.__preventObserver__)
        return;
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
    if (!swiper.params.observer)
      return;
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
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (typeof handler !== "function")
      return self;
    const method = priority ? "unshift" : "push";
    events2.split(" ").forEach((event2) => {
      if (!self.eventsListeners[event2])
        self.eventsListeners[event2] = [];
      self.eventsListeners[event2][method](handler);
    });
    return self;
  },
  once(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (typeof handler !== "function")
      return self;
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
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (typeof handler !== "function")
      return self;
    const method = priority ? "unshift" : "push";
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny(handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsAnyListeners)
      return self;
    const index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },
  off(events2, handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsListeners)
      return self;
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
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsListeners)
      return self;
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
  if (Number.isNaN(width))
    width = 0;
  if (Number.isNaN(height))
    height = 0;
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
    if (slides[i])
      slide2 = slides[i];
    if (gridEnabled) {
      swiper.grid.updateSlide(i, slide2, slides);
    }
    if (slides[i] && elementStyle(slide2, "display") === "none")
      continue;
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
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
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
      if (prevSlideSize === 0 && i !== 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1e3)
        slidePosition = 0;
      if (params.roundLengths)
        slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0)
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths)
        slidePosition = Math.floor(slidePosition);
      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0)
        snapGrid.push(slidePosition);
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
      if (params.roundLengths)
        slidesGridItem = Math.floor(slidesGridItem);
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
  if (snapGrid.length === 0)
    snapGrid = [0];
  if (spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
    slides.filter((_, slideIndex) => {
      if (!params.cssMode || params.loop)
        return true;
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
      if (snap <= 0)
        return -offsetBefore;
      if (snap > maxSnap)
        return maxSnap + offsetAfter;
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
    if (swiper.params.watchOverflow)
      swiper.checkOverflow();
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
      if (!hasClassBackfaceClassAdded)
        swiper.el.classList.add(backFaceHiddenClass);
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
        if (index > swiper.slides.length && !isVirtual)
          break;
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
  if (newHeight || newHeight === 0)
    swiper.wrapperEl.style.height = `${newHeight}px`;
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
  if (slides.length === 0)
    return;
  if (typeof slides[0].swiperSlideOffset === "undefined")
    swiper.updateSlidesOffset();
  let offsetCenter = -translate2;
  if (rtl)
    offsetCenter = translate2;
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
    if (isBeginningRounded)
      progress = 0;
    if (isEndRounded)
      progress = 1;
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
    if (progressLoop > 1)
      progressLoop -= 1;
  }
  Object.assign(swiper, {
    progress,
    progressLoop,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
    swiper.updateSlidesProgress(translate2);
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
      if (slideIndex < 0)
        slideIndex = swiper.virtual.slides.length + slideIndex;
      if (slideIndex >= swiper.virtual.slides.length)
        slideIndex -= swiper.virtual.slides.length;
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
  if (!swiper || swiper.destroyed || !swiper.params)
    return;
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
            if (lazyEl)
              lazyEl.remove();
          }
        });
      }
    }
    if (lazyEl)
      lazyEl.remove();
  }
};
var unlazy = (swiper, index) => {
  if (!swiper.slides[index])
    return;
  const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
  if (imageEl)
    imageEl.removeAttribute("loading");
};
var preload = (swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params)
    return;
  let amount = swiper.params.lazyPreloadPrevNext;
  const len = swiper.slides.length;
  if (!len || !amount || amount < 0)
    return;
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
      if (preloadColumns.includes(slideEl.column))
        unlazy(swiper, i);
    });
    return;
  }
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind || swiper.params.loop) {
    for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      const realIndex = (i % len + len) % len;
      if (realIndex < activeIndex || realIndex > slideIndexLastInView)
        unlazy(swiper, realIndex);
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
    if (activeIndex < 0 || typeof activeIndex === "undefined")
      activeIndex = 0;
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
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
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
  if (rtl)
    currentTranslate = -currentTranslate;
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
  if (translateBounds && translate2 > minTranslate2)
    newTranslate = minTranslate2;
  else if (translateBounds && translate2 < maxTranslate2)
    newTranslate = maxTranslate2;
  else
    newTranslate = translate2;
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
          if (!swiper || swiper.destroyed)
            return;
          if (e.target !== this)
            return;
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
    if (activeIndex > previousIndex)
      dir = "next";
    else if (activeIndex < previousIndex)
      dir = "prev";
    else
      dir = "reset";
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
  if (params.cssMode)
    return;
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
  if (params.cssMode)
    return;
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
  if (slideIndex < 0)
    slideIndex = 0;
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
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
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
  if (slideIndex > activeIndex)
    direction = "next";
  else if (slideIndex < activeIndex)
    direction = "prev";
  else
    direction = "reset";
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
        if (!swiper || swiper.destroyed)
          return;
        if (e.target !== this)
          return;
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
  if (swiper.destroyed)
    return;
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
  if (!enabled || swiper.destroyed)
    return swiper;
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
    if (animating && !isVirtual && params.loopPreventsSliding)
      return false;
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
  if (!enabled || swiper.destroyed)
    return swiper;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding)
      return false;
    swiper.loopFix({
      direction: "prev"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0)
      return -Math.floor(Math.abs(val));
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
    if (prevIndex < 0)
      prevIndex = swiper.activeIndex - 1;
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
  if (swiper.destroyed)
    return;
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
  if (swiper.destroyed)
    return;
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
  if (swiper.destroyed)
    return;
  const {
    params,
    slidesEl
  } = swiper;
  const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.clickedIndex;
  let realIndex;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  if (params.loop) {
    if (swiper.animating)
      return;
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
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
    return;
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
  if (!swiper.params.loop)
    return;
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
          if (slides[i3].column === colIndexToPrepend)
            prependSlidesIndexes.push(i3);
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
          if (slide2.column === index)
            appendSlidesIndexes.push(slideIndex);
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
        if (!c.destroyed && c.params.loop)
          c.loopFix({
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
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
    return;
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
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode)
    return;
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
    if (!el2 || el2 === getDocument() || el2 === getWindow())
      return null;
    if (el2.assignedSlot)
      el2 = el2.assignedSlot;
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
  if (e.originalEvent)
    e = e.originalEvent;
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
  if (!enabled)
    return;
  if (!params.simulateTouch && e.pointerType === "mouse")
    return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let targetEl = e.target;
  if (params.touchEventsTarget === "wrapper") {
    if (!swiper.wrapperEl.contains(targetEl))
      return;
  }
  if ("which" in e && e.which === 3)
    return;
  if ("button" in e && e.button > 0)
    return;
  if (data.isTouched && data.isMoved)
    return;
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
    if (!targetEl.closest(params.swipeHandler))
      return;
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
  if (params.threshold > 0)
    data.allowThresholdMove = false;
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
  if (!enabled)
    return;
  if (!params.simulateTouch && event2.pointerType === "mouse")
    return;
  let e = event2;
  if (e.originalEvent)
    e = e.originalEvent;
  if (e.type === "pointermove") {
    if (data.touchId !== null)
      return;
    const id = e.pointerId;
    if (id !== data.pointerId)
      return;
  }
  let targetTouch;
  if (e.type === "touchmove") {
    targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
    if (!targetTouch || targetTouch.identifier !== data.touchId)
      return;
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
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold)
    return;
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
  if (!params.followFinger || params.cssMode)
    return;
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
  if (e.originalEvent)
    e = e.originalEvent;
  let targetTouch;
  const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
  if (!isTouchEvent) {
    if (data.touchId !== null)
      return;
    if (e.pointerId !== data.pointerId)
      return;
    targetTouch = e;
  } else {
    targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
    if (!targetTouch || targetTouch.identifier !== data.touchId)
      return;
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
  if (!enabled)
    return;
  if (!params.simulateTouch && e.pointerType === "mouse")
    return;
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
    if (!swiper.destroyed)
      swiper.allowClick = true;
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
      if (ratio >= params.longSwipesRatio)
        swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
      else
        swiper.slideTo(stopIndex);
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
  if (el2 && el2.offsetWidth === 0)
    return;
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
  if (!swiper.enabled)
    return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks)
      e.preventDefault();
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
  if (!enabled)
    return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  if (swiper.translate === 0)
    swiper.translate = 0;
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
  if (swiper.documentTouchHandlerProceeded)
    return;
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
  if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
    return;
  const breakpoint = swiper.getBreakpoint(breakpoints2, swiper.params.breakpointsBase, swiper.el);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint)
    return;
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
    if (typeof breakpointParams[prop] === "undefined")
      return;
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
  if (!breakpoints2 || base === "container" && !containerEl)
    return void 0;
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
    if (!params[moduleParamName])
      params[moduleParamName] = {
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
    if (!params)
      params = {};
    params = extend2({}, params);
    if (el2 && !params.el)
      params.el = el2;
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
    if (swiper.enabled)
      return;
    swiper.enabled = true;
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }
    swiper.emit("enable");
  }
  disable() {
    const swiper = this;
    if (!swiper.enabled)
      return;
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
    if (!swiper.params._emitClasses || !swiper.el)
      return;
    const cls = swiper.el.className.split(" ").filter((className) => {
      return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
    });
    swiper.emit("_containerClasses", cls.join(" "));
  }
  getSlideClasses(slideEl) {
    const swiper = this;
    if (swiper.destroyed)
      return "";
    return slideEl.className.split(" ").filter((className) => {
      return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
    }).join(" ");
  }
  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el)
      return;
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
    if (typeof params.slidesPerView === "number")
      return params.slidesPerView;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += Math.ceil(slides[i].swiperSlideSize);
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
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
    if (!swiper || swiper.destroyed)
      return;
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
    if (needUpdate)
      swiper.update();
    return swiper;
  }
  changeLanguageDirection(direction) {
    const swiper = this;
    if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr")
      return;
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
    if (swiper.mounted)
      return true;
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
    if (swiper.initialized)
      return swiper;
    const mounted = swiper.mount(el2);
    if (mounted === false)
      return swiper;
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
      el2.removeAttribute("style");
      wrapperEl.removeAttribute("style");
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
      swiper.el.swiper = null;
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
    if (!_Swiper.prototype.__modules__)
      _Swiper.prototype.__modules__ = [];
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

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/shared/update-swiper.mjs
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
    if (typeof target[key] === "undefined")
      target[key] = src[key];
    else if (isObject3(src[key]) && isObject3(target[key]) && Object.keys(src[key]).length > 0) {
      if (src[key].__swiper__)
        target[key] = src[key];
      else
        extend3(target[key], src[key]);
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
    if (unique.indexOf(c) < 0)
      unique.push(c);
  });
  return unique.join(" ");
}
function wrapperClass(className) {
  if (className === void 0) {
    className = "";
  }
  if (!className)
    return "swiper-wrapper";
  if (!className.includes("swiper-wrapper"))
    return `swiper-wrapper ${className}`;
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
    if (!swiper[mod])
      return;
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
    if (slides)
      virtual.slides = slides;
    virtual.update(true);
  }
  if (changedParams.includes("children") && slides && currentParams.loop) {
    loopNeedReloop = true;
  }
  if (needThumbsInit) {
    const initialized = thumbs.init();
    if (initialized)
      thumbs.update(true);
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
    if (paginationEl)
      currentParams.pagination.el = paginationEl;
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
    if (scrollbarEl)
      currentParams.scrollbar.el = scrollbarEl;
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
    if (nextEl)
      currentParams.navigation.nextEl = nextEl;
    if (prevEl)
      currentParams.navigation.prevEl = prevEl;
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

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/shared/update-on-virtual-data.mjs
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
    if (typeof obj[key] === "undefined")
      return;
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
    if (params[key] === true)
      params[key] = {};
    if (params[key] === false)
      delete params[key];
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
  if (!oldParams)
    return keys;
  const addKey = (key) => {
    if (keys.indexOf(key) < 0)
      keys.push(key);
  };
  if (children && oldChildren) {
    const oldChildrenKeys = oldChildren.map(getKey);
    const childrenKeys = children.map(getKey);
    if (oldChildrenKeys.join("") !== childrenKeys.join(""))
      addKey("children");
    if (oldChildren.length !== children.length)
      addKey("children");
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
            if (swiperParams[key][oldKey] !== oldParams[key][oldKey])
              addKey(key);
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
  if (!swiper || swiper.destroyed || !swiper.params.virtual || swiper.params.virtual && !swiper.params.virtual.enabled)
    return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();
  if (swiper.parallax && swiper.params.parallax && swiper.params.parallax.enabled) {
    swiper.parallax.setTranslate();
  }
};

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/swiper-vue.mjs
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
      if (slotName === "default")
        slotName = "container-end";
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
    if (typeof originalSlots[slotName] !== "function")
      return;
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
  if (!virtualData)
    return null;
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
    if (i >= from && i <= to3) {
      slidesToRender.push(slides[getSlideIndex(i)]);
    }
  }
  return slidesToRender.map((slide2) => {
    if (!slide2.props)
      slide2.props = {};
    if (!slide2.props.style)
      slide2.props.style = {};
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
      if (!swiperElRef.value)
        return;
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
        if (!slide2.props)
          slide2.props = {};
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
      if (!swiperRef || !swiperRef.value)
        return;
      swiperRef.value.on("_slideClass", updateClasses);
      eventAttached = true;
    });
    onBeforeUpdate(() => {
      if (eventAttached || !swiperRef || !swiperRef.value)
        return;
      swiperRef.value.on("_slideClass", updateClasses);
      eventAttached = true;
    });
    onUpdated(() => {
      if (!slideElRef.value || !swiperRef || !swiperRef.value)
        return;
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
      if (!swiperRef || !swiperRef.value)
        return;
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

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/modules/mousewheel.mjs
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
    if (!swiper.enabled)
      return;
    swiper.mouseEntered = true;
  }
  function handleMouseLeave() {
    if (!swiper.enabled)
      return;
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
    if (!swiper.enabled)
      return;
    if (event2.target.closest(`.${swiper.params.mousewheel.noMousewheelClass}`))
      return;
    const params = swiper.params.mousewheel;
    if (swiper.params.cssMode) {
      e.preventDefault();
    }
    let targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== "container") {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    const targetElContainsTarget = targetEl && targetEl.contains(e.target);
    if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges)
      return true;
    if (e.originalEvent)
      e = e.originalEvent;
    let delta = 0;
    const rtlFactor = swiper.rtlTranslate ? -1 : 1;
    const data = normalize(e);
    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY))
          delta = -data.pixelX * rtlFactor;
        else
          return true;
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX))
        delta = -data.pixelY;
      else
        return true;
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }
    if (delta === 0)
      return true;
    if (params.invert)
      delta = -delta;
    let positions = swiper.getTranslate() + delta * params.sensitivity;
    if (positions >= swiper.minTranslate())
      positions = swiper.minTranslate();
    if (positions <= swiper.maxTranslate())
      positions = swiper.maxTranslate();
    disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
    if (disableParentSwiper && swiper.params.nested)
      e.stopPropagation();
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
        if (position >= swiper.minTranslate())
          position = swiper.minTranslate();
        if (position <= swiper.maxTranslate())
          position = swiper.maxTranslate();
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
        if (!ignoreWheelEvents)
          emit("scroll", e);
        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction)
          swiper.autoplay.stop();
        if (params.releaseOnEdges && (position === swiper.minTranslate() || position === swiper.maxTranslate())) {
          return true;
        }
      }
    }
    if (e.preventDefault)
      e.preventDefault();
    else
      e.returnValue = false;
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
    if (swiper.mousewheel.enabled)
      return false;
    events2("addEventListener");
    swiper.mousewheel.enabled = true;
    return true;
  }
  function disable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.addEventListener(event, handle);
      return true;
    }
    if (!swiper.mousewheel.enabled)
      return false;
    events2("removeEventListener");
    swiper.mousewheel.enabled = false;
    return true;
  }
  on2("init", () => {
    if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
      disable();
    }
    if (swiper.params.mousewheel.enabled)
      enable();
  });
  on2("destroy", () => {
    if (swiper.params.cssMode) {
      enable();
    }
    if (swiper.mousewheel.enabled)
      disable();
  });
  Object.assign(swiper.mousewheel, {
    enable,
    disable
  });
}

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/shared/create-element-if-not-defined.mjs
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

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/modules/navigation.mjs
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
      if (res)
        return res;
    }
    if (el2) {
      if (typeof el2 === "string")
        res = [...document.querySelectorAll(el2)];
      if (swiper.params.uniqueNavElements && typeof el2 === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el2).length === 1) {
        res = swiper.el.querySelector(el2);
      } else if (res && res.length === 1) {
        res = res[0];
      }
    }
    if (el2 && !res)
      return el2;
    return res;
  }
  function toggleEl(el2, disabled) {
    const params = swiper.params.navigation;
    el2 = makeElementsArray(el2);
    el2.forEach((subEl) => {
      if (subEl) {
        subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
        if (subEl.tagName === "BUTTON")
          subEl.disabled = disabled;
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
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
      return;
    swiper.slidePrev();
    emit("navigationPrev");
  }
  function onNextClick(e) {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind)
      return;
    swiper.slideNext();
    emit("navigationNext");
  }
  function init() {
    const params = swiper.params.navigation;
    swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    });
    if (!(params.nextEl || params.prevEl))
      return;
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
  on2("click", (_s, e) => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const targetEl = e.target;
    if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl)))
        return;
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

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/shared/classes-to-selector.mjs
function classesToSelector(classes2) {
  if (classes2 === void 0) {
    classes2 = "";
  }
  return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/modules/pagination.mjs
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
    if (!bulletEl)
      return;
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
      if (swiper.realIndex === index)
        return;
      swiper.slideToLoop(index);
    } else {
      swiper.slideTo(index);
    }
  }
  function update2() {
    const rtl = swiper.rtl;
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
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
        if (subElIndex === 0)
          emit("paginationRender", subEl);
      } else {
        if (subElIndex === 0)
          emit("paginationRender", subEl);
        emit("paginationUpdate", subEl);
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
      }
    });
  }
  function render2() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
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
    if (!params.el)
      return;
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
    if (!el2 || el2.length === 0)
      return;
    if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el2) && el2.length > 1) {
      el2 = [...swiper.el.querySelectorAll(params.el)];
      if (el2.length > 1) {
        el2 = el2.filter((subEl) => {
          if (elementParents(subEl, ".swiper")[0] !== swiper.el)
            return false;
          return true;
        })[0];
      }
    }
    if (Array.isArray(el2) && el2.length === 1)
      el2 = el2[0];
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
    if (isPaginationDisabled())
      return;
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
    if (swiper.pagination.bullets)
      swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
  }
  on2("changeDirection", () => {
    if (!swiper.pagination || !swiper.pagination.el)
      return;
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
  on2("click", (_s, e) => {
    const targetEl = e.target;
    const el2 = makeElementsArray(swiper.pagination.el);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el2 && el2.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
        return;
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

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/modules/autoplay.mjs
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
    if (!swiper || swiper.destroyed || !swiper.wrapperEl)
      return;
    if (e.target !== swiper.wrapperEl)
      return;
    swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
    if (pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) {
      return;
    }
    resume();
  }
  const calcTimeLeft = () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
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
    if (!activeSlideEl)
      return void 0;
    const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
    return currentSlideDelay;
  };
  const run = (delayForce) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
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
      if (!swiper || swiper.destroyed)
        return;
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
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
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
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop)
      return;
    if (autoplayTimeLeft < 0)
      autoplayTimeLeft = 0;
    proceed();
  };
  const resume = () => {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running)
      return;
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
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
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
    if (e.pointerType !== "mouse")
      return;
    pausedByInteraction = true;
    pausedByPointerEnter = true;
    if (swiper.animating || swiper.autoplay.paused)
      return;
    pause(true);
  };
  const onPointerLeave = (e) => {
    if (e.pointerType !== "mouse")
      return;
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
    swiper.el.removeEventListener("pointerenter", onPointerEnter);
    swiper.el.removeEventListener("pointerleave", onPointerLeave);
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
  on2("beforeTransitionStart", (_s, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on2("sliderFirstMove", () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
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
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched)
      return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode)
      resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on2("slideChange", () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    slideChanged = true;
  });
  Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume
  });
}

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/shared/effect-init.mjs
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
    if (swiper.params.effect !== effect)
      return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }
    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on2("setTranslate", () => {
    if (swiper.params.effect !== effect)
      return;
    setTranslate2();
  });
  on2("setTransition", (_s, duration) => {
    if (swiper.params.effect !== effect)
      return;
    setTransition2(duration);
  });
  on2("transitionEnd", () => {
    if (swiper.params.effect !== effect)
      return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows)
        return;
      swiper.slides.forEach((slideEl) => {
        slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => shadowEl.remove());
      });
      recreateShadows();
    }
  });
  let requireUpdateOnVirtual;
  on2("virtualUpdate", () => {
    if (swiper.params.effect !== effect)
      return;
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

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/shared/effect-target.mjs
function effectTarget(effectParams, slideEl) {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = "hidden";
    transformEl.style["-webkit-backface-visibility"] = "hidden";
  }
  return transformEl;
}

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/shared/effect-virtual-transition-end.mjs
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
        if (eventTriggered)
          return;
        if (!swiper || swiper.destroyed)
          return;
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

// node_modules/.pnpm/swiper@11.1.3/node_modules/swiper/modules/effect-fade.mjs
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
      if (!swiper.params.virtualTranslate)
        tx -= swiper.translate;
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

// node_modules/.pnpm/vue-amazing-ui@0.1.39_async-validator@4.2.5_focus-trap@7.5.4_sortablejs@1.15.2/node_modules/vue-amazing-ui/dist/vue-amazing-ui.js
function Uo(l = Date.now(), a = "YYYY-MM-DD HH:mm:ss") {
  if (typeof l == "number" || typeof l == "string")
    var e = new Date(l);
  else
    e = l;
  let t = a;
  if (t.includes("SSS")) {
    const u = String(e.getMilliseconds());
    t = t.replace("SSS", u.padStart(3, "0"));
  }
  if (t.includes("YY")) {
    const u = String(e.getFullYear());
    t = t.includes("YYYY") ? t.replace("YYYY", u) : t.replace("YY", u.slice(2, 4));
  }
  if (t.includes("M")) {
    const u = String(e.getMonth() + 1);
    t = t.includes("MM") ? t.replace("MM", u.padStart(2, "0")) : t.replace("M", u);
  }
  if (t.includes("D")) {
    const u = String(e.getDate());
    t = t.includes("DD") ? t.replace("DD", u.padStart(2, "0")) : t.replace("D", u);
  }
  if (t.includes("H")) {
    const u = String(e.getHours());
    t = t.includes("HH") ? t.replace("HH", u.padStart(2, "0")) : t.replace("H", u);
  }
  if (t.includes("m")) {
    const u = String(e.getMinutes());
    t = t.includes("mm") ? t.replace("mm", u.padStart(2, "0")) : t.replace("m", u);
  }
  if (t.includes("s")) {
    const u = String(e.getSeconds());
    t = t.includes("ss") ? t.replace("ss", u.padStart(2, "0")) : t.replace("s", u);
  }
  return t;
}
var fe = typeof window < "u" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {
};
var e1 = typeof window < "u" ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {
};
function ue(l, a = 0, e = false) {
  const t = typeof window < "u" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {
  };
  let u = null;
  const r = { id: t(function c(s) {
    u || (u = s), s - u >= a ? (l(), e && (u = null, r.id = t(c))) : r.id = t(c);
  }) };
  return r;
}
function be2(l) {
  const a = typeof window < "u" ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {
  };
  l && l.id && a(l.id);
}
function Ko(l, a = 300) {
  let e = true;
  return function() {
    return e && (e = false, ue(() => {
      l(), e = true;
    }, a)), false;
  };
}
function Zo(l, a = 300) {
  let e = null;
  return function() {
    e && be2(e), e = ue(l, a);
  };
}
function Go(l, a) {
  const e = String(l).split(".")[1], t = String(a).split(".")[1], u = Math.max((e == null ? void 0 : e.length) || 0, (t == null ? void 0 : t.length) || 0), r = l.toFixed(u), c = a.toFixed(u);
  return (+r.replace(".", "") + +c.replace(".", "")) / Math.pow(10, u);
}
function Jo(l, a) {
  let e = "";
  if (a)
    e = a;
  else {
    const u = l.split("?")[0].split("/");
    e = u[u.length - 1];
  }
  const t = new XMLHttpRequest();
  t.open("GET", l, true), t.responseType = "blob", t.onload = function() {
    if (t.status === 200) {
      const u = t.response, r = document.createElement("a"), c = document.querySelector("body");
      r.href = window.URL.createObjectURL(u), r.download = e, r.style.display = "none", c == null || c.appendChild(r), r.click(), c == null || c.removeChild(r), window.URL.revokeObjectURL(r.href);
    }
  }, t.send();
}
function _1(l, a = 2, e = ",", t = ".", u = "", r = "") {
  if (Number(l) === 0)
    return Number(l).toFixed(a);
  if (!l)
    return "";
  l = Number(l).toFixed(a);
  const c = (l += "").split(".");
  let s = c[0];
  const p = c.length > 1 ? t + c[1] : "", n = /(\d+)(\d{3})/;
  if (e && (h3 = e, Object.prototype.toString.call(h3) !== "[object Number]"))
    for (; n.test(s); )
      s = s.replace(n, "$1" + e + "$2");
  var h3;
  return u + s + p + r;
}
function Xo() {
  document.documentElement.classList.toggle("dark");
}
var de = (l) => (pushScopeId("data-v-16c306a5"), l = l(), popScopeId(), l);
var C1 = { key: 0, class: "m-icon" };
var $1 = ["src"];
var B1 = { key: 1, focusable: "false", class: "u-icon", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var F1 = [de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var S1 = { key: 2, focusable: "false", class: "u-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var L1 = [de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var A1 = { key: 3, focusable: "false", class: "u-icon", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var D1 = [de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var E1 = { key: 4, focusable: "false", class: "u-icon", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var H1 = [de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var I1 = { key: 1, class: "m-big-icon" };
var T1 = ["src"];
var j1 = { key: 1, focusable: "false", class: "u-icon", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var V1 = [de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), de(() => createBaseVNode("path", { d: "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1))];
var R1 = { key: 2, focusable: "false", class: "u-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var W1 = [de(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1)), de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var N1 = { key: 3, focusable: "false", class: "u-icon", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var O1 = [de(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), de(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var q1 = { key: 4, focusable: "false", class: "u-icon", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var P1 = [de(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1)), de(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var Y1 = { class: "m-content" };
var U1 = { class: "u-message" };
var K1 = { key: 0, class: "u-description" };
var Z1 = { key: 0 };
var G1 = { key: 1, focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var J1 = [de(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var V = (l, a) => {
  const e = l.__vccOpts || l;
  for (const [t, u] of a)
    e[t] = u;
  return e;
};
var aa2 = V(defineComponent({ __name: "Alert", props: { message: { default: "" }, description: { default: "" }, type: { default: "info" }, closable: { type: Boolean, default: false }, closeText: { default: "" }, icon: { default: "" }, showIcon: { type: Boolean, default: false } }, emits: ["close"], setup(l, { emit: a }) {
  const e = l, t = ref(), u = ref(), r = useSlots(), c = computed(() => {
    var h3;
    const n = (h3 = r.description) == null ? void 0 : h3.call(r);
    return n ? !!(n[0].children !== "v-if" && (n != null && n.length)) : e.description;
  });
  ref(), watch(() => [e.message, e.description], () => {
    e.closable && (u.value.style.height = t.value.offsetHeight + "px", u.value.style.opacity = 1);
  }, { deep: true, flush: "post" }), onMounted(() => {
    e.closable && (u.value.style.height = t.value.offsetHeight + "px", u.value.style.opacity = 1);
  });
  const s = a;
  function p(n) {
    u.value.style.height = 0, u.value.style.opacity = 0, s("close", n);
  }
  return (n, h3) => (openBlock(), createElementBlock("div", { ref_key: "wrapper", ref: u, class: "m-alert-wrapper" }, [createBaseVNode("div", { ref_key: "alert", ref: t, class: normalizeClass(["m-alert", [`${n.type}`, { "width-description": c.value }]]) }, [n.showIcon ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [c.value ? (openBlock(), createElementBlock("span", I1, [renderSlot(n.$slots, "icon", {}, () => [n.icon ? (openBlock(), createElementBlock("img", { key: 0, src: n.icon, class: "u-big-icon-img" }, null, 8, T1)) : n.type === "info" ? (openBlock(), createElementBlock("svg", j1, V1)) : n.type === "success" ? (openBlock(), createElementBlock("svg", R1, W1)) : n.type === "warning" ? (openBlock(), createElementBlock("svg", N1, O1)) : n.type === "error" ? (openBlock(), createElementBlock("svg", q1, P1)) : createCommentVNode("", true)], true)])) : (openBlock(), createElementBlock("span", C1, [renderSlot(n.$slots, "icon", {}, () => [n.icon ? (openBlock(), createElementBlock("img", { key: 0, src: n.icon, class: "u-icon-img" }, null, 8, $1)) : n.type === "info" ? (openBlock(), createElementBlock("svg", B1, F1)) : n.type === "success" ? (openBlock(), createElementBlock("svg", S1, L1)) : n.type === "warning" ? (openBlock(), createElementBlock("svg", A1, D1)) : n.type === "error" ? (openBlock(), createElementBlock("svg", E1, H1)) : createCommentVNode("", true)], true)]))], 64)) : createCommentVNode("", true), createBaseVNode("div", Y1, [createBaseVNode("div", U1, [renderSlot(n.$slots, "message", {}, () => [createTextVNode(toDisplayString(n.message), 1)], true)]), c.value ? (openBlock(), createElementBlock("div", K1, [renderSlot(n.$slots, "description", {}, () => [createTextVNode(toDisplayString(n.description), 1)], true)])) : createCommentVNode("", true)]), n.closable ? (openBlock(), createElementBlock("a", { key: 1, class: "m-close", onClick: p }, [renderSlot(n.$slots, "closeText", {}, () => [n.closeText ? (openBlock(), createElementBlock("span", Z1, toDisplayString(n.closeText), 1)) : (openBlock(), createElementBlock("svg", G1, J1))], true)])) : createCommentVNode("", true)], 2)], 512));
} }), [["__scopeId", "data-v-16c306a5"]]);
aa2.install = (l) => {
  l.component(aa2.__name, aa2);
};
var X1 = ["src", "alt"];
var Q1 = { key: 1, class: "m-icon" };
var la = V(defineComponent({ __name: "Avatar", props: { shape: { default: "circle" }, size: { default: "default" }, src: { default: "" }, alt: { default: "" }, icon: { default: void 0 } }, setup(l) {
  const a = l, e = ref(document.documentElement.clientWidth);
  function t() {
    e.value = document.documentElement.clientWidth;
  }
  onMounted(() => {
    window.addEventListener("resize", t);
  }), onUnmounted(() => {
    window.removeEventListener("resize", t);
  });
  const u = computed(() => {
    if (typeof a.size == "string")
      return null;
    if (typeof a.size == "number")
      return c.value ? { width: a.size + "px", height: a.size + "px", lineHeight: a.size + "px", fontSize: a.size / 2 + "px" } : { width: a.size + "px", height: a.size + "px", lineHeight: a.size + "px", fontSize: "18px" };
    if (typeof a.size == "object") {
      let n = 32;
      return e.value >= 1600 && a.size.xxl ? n = a.size.xxl : e.value >= 1200 && a.size.xl ? n = a.size.xl : e.value >= 992 && a.size.lg ? n = a.size.lg : e.value >= 768 && a.size.md ? n = a.size.md : e.value >= 576 && a.size.sm ? n = a.size.sm : e.value < 576 && a.size.xs && (n = a.size.xs), { width: n + "px", height: n + "px", lineHeight: n + "px", fontSize: n / 2 + "px" };
    }
  }), r = useSlots(), c = computed(() => {
    var n;
    if (!a.src) {
      const h3 = (n = r.icon) == null ? void 0 : n.call(r);
      if (h3)
        return !!(h3[0].children !== "v-if" && (h3 != null && h3.length));
    }
    return false;
  }), s = computed(() => {
    var n, h3;
    if (!a.src && !c.value) {
      const k = (n = r.default) == null ? void 0 : n.call(r);
      if (k)
        return !!(k[0].children !== "v-if" && ((h3 = k[0].children) != null && h3.length));
    }
    return false;
  }), p = computed(() => {
    if (typeof a.size == "string")
      return { transform: "scale(1) translateX(-50%)" };
    if (typeof a.size == "number") {
      const n = Math.min(1, Math.max(0.022222222222222223, (1 + 1 * (a.size - 9)) / 45));
      return { lineHeight: a.size + "px", transform: `scale(${n}) translateX(-50%)` };
    }
  });
  return (n, h3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-avatar", [u.value === null ? "avatar-" + n.size : "", "avatar-" + n.shape, { "avatar-image": n.src }]]), style: normalizeStyle(u.value || {}) }, [n.src ? (openBlock(), createElementBlock("img", { key: 0, class: "u-image", src: n.src, alt: n.alt }, null, 8, X1)) : createCommentVNode("", true), !n.src && c.value ? (openBlock(), createElementBlock("span", Q1, [renderSlot(n.$slots, "icon", {}, void 0, true)])) : createCommentVNode("", true), n.src || c.value || !s.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", { key: 2, class: "m-string", style: normalizeStyle(p.value) }, [renderSlot(n.$slots, "default", {}, void 0, true)], 4))], 6));
} }), [["__scopeId", "data-v-cbcb60ab"]]);
la.install = (l) => {
  l.component(la.__name, la);
};
var el = ((l) => (pushScopeId("data-v-05696e1d"), l = l(), popScopeId(), l))(() => createBaseVNode("span", { class: "m-icon" }, [createBaseVNode("svg", { class: "u-icon", viewBox: "0 0 24 24", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xlinkHref: "http://www.w3.org/1999/xlink" }, [createBaseVNode("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, [createBaseVNode("g", { transform: "translate(-139.000000, -4423.000000)", "fill-rule": "nonzero" }, [createBaseVNode("g", { transform: "translate(120.000000, 4285.000000)" }, [createBaseVNode("g", { transform: "translate(7.000000, 126.000000)" }, [createBaseVNode("g", { transform: "translate(24.000000, 24.000000) scale(1, -1) translate(-24.000000, -24.000000) translate(12.000000, 12.000000)" }, [createBaseVNode("g", { transform: "translate(4.000000, 2.000000)" }, [createBaseVNode("path", { d: "M8,0 C8.51283584,0 8.93550716,0.38604019 8.99327227,0.883378875 L9,1 L9,10.584 L12.2928932,7.29289322 C12.6834175,6.90236893 13.3165825,6.90236893 13.7071068,7.29289322 C14.0675907,7.65337718 14.0953203,8.22060824 13.7902954,8.61289944 L13.7071068,8.70710678 L8.70710678,13.7071068 L8.62544899,13.7803112 L8.618,13.784 L8.59530661,13.8036654 L8.4840621,13.8753288 L8.37133602,13.9287745 L8.22929083,13.9735893 L8.14346259,13.9897165 L8.03324678,13.9994506 L7.9137692,13.9962979 L7.77070917,13.9735893 L7.6583843,13.9401293 L7.57677845,13.9063266 L7.47929125,13.8540045 L7.4048407,13.8036865 L7.38131006,13.7856883 C7.35030318,13.7612383 7.32077858,13.7349921 7.29289322,13.7071068 L2.29289322,8.70710678 L2.20970461,8.61289944 C1.90467972,8.22060824 1.93240926,7.65337718 2.29289322,7.29289322 C2.65337718,6.93240926 3.22060824,6.90467972 3.61289944,7.20970461 L3.70710678,7.29289322 L7,10.585 L7,1 L7.00672773,0.883378875 C7.06449284,0.38604019 7.48716416,0 8,0 Z" }), createBaseVNode("path", { d: "M14.9333333,15.9994506 C15.5224371,15.9994506 16,16.4471659 16,16.9994506 C16,17.5122865 15.5882238,17.9349578 15.0577292,17.9927229 L14.9333333,17.9994506 L1.06666667,17.9994506 C0.477562934,17.9994506 0,17.5517354 0,16.9994506 C0,16.4866148 0.411776203,16.0639435 0.9422708,16.0061783 L1.06666667,15.9994506 L14.9333333,15.9994506 Z" })])])])])])])])], -1));
var ta = V(defineComponent({ __name: "BackTop", props: { bottom: { default: 40 }, right: { default: 40 }, visibilityHeight: { default: 180 }, to: { default: "body" }, listenTo: { default: void 0 } }, emits: ["click", "show"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.bottom == "number" ? e.bottom + "px" : e.bottom), u = computed(() => typeof e.right == "number" ? e.right + "px" : e.right), r = ref(), c = ref(0), s = ref();
  watchEffect(() => {
    nextTick(() => {
      var w;
      e.listenTo === void 0 ? s.value = h3((w = r.value) == null ? void 0 : w.parentElement) : typeof e.listenTo == "string" ? s.value = typeof document < "u" ? document.getElementsByTagName(e.listenTo)[0] : null : e.listenTo instanceof HTMLElement && (s.value = e.listenTo), s.value && (function(i) {
        const b = { attributes: true, subtree: true };
        new MutationObserver(function(m, y) {
          c.value = s.value.scrollTop;
        }).observe(i, b);
      }(s.value), s.value.addEventListener("scroll", (i) => {
        c.value = i.target.scrollTop;
      }));
    });
  });
  const p = ref();
  watchEffect(() => {
    nextTick(() => {
      typeof e.to == "string" ? p.value = typeof document < "u" ? document.getElementsByTagName(e.to)[0] : null : e.to instanceof HTMLElement && (p.value = e.to), p.value && p.value.insertAdjacentElement("beforeend", r.value);
    });
  }), onBeforeUnmount(() => {
    r.value.remove();
  });
  const n = computed(() => c.value >= e.visibilityHeight);
  function h3(w) {
    return w ? w.scrollHeight > w.clientHeight ? w : h3(w.parentElement) : null;
  }
  const k = a;
  function M() {
    s.value && s.value.scrollTo({ top: 0, behavior: "smooth" }), k("click");
  }
  return watch(n, (w) => {
    k("show", w);
  }), (w, i) => (openBlock(), createBlock(Transition, null, { default: withCtx(() => [withDirectives(createBaseVNode("div", { ref_key: "backtop", ref: r, onClick: M, class: "m-backtop", style: normalizeStyle(`bottom: ${t.value}; right: ${u.value};`) }, [renderSlot(w.$slots, "default", {}, () => [el], true)], 4), [[vShow, n.value]])]), _: 3 }));
} }), [["__scopeId", "data-v-05696e1d"]]);
ta.install = (l) => {
  l.component(ta.__name, ta);
};
var al2 = { class: "u-status-text" };
var ll2 = { key: 0 };
var tl = ["title"];
var ol2 = { key: 0, class: "m-number", style: { transition: "none 0s ease 0s" } };
var sl2 = { class: "u-number" };
var oa2 = V(defineComponent({ __name: "Badge", props: { color: { default: "" }, count: { default: 0 }, max: { default: 99 }, showZero: { type: Boolean, default: false }, dot: { type: Boolean, default: false }, status: { default: void 0 }, text: { default: "" }, countStyle: { default: () => ({}) }, title: { default: "" }, ripple: { type: Boolean, default: true } }, setup(l) {
  const a = l, e = ["pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"], t = computed(() => {
    if (a.color && !e.includes(a.color))
      return { color: a.color, backgroundColor: a.color };
  }), u = useSlots(), r = computed(() => {
    var s;
    if (!a.status && !a.color) {
      const p = (s = u.default) == null ? void 0 : s.call(u);
      if (p)
        return !!(p[0].children !== "v-if" && (p != null && p.length));
    }
    return false;
  }), c = computed(() => {
    var s;
    if (!a.status && !a.color) {
      const p = (s = u.count) == null ? void 0 : s.call(u);
      return !!(p != null && p.length);
    }
    return false;
  });
  return (s, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-badge", { "badge-status": s.status }]) }, [s.status || s.color ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("span", { class: normalizeClass(["u-status-dot", [`status-${s.status || s.color}`, { "dot-ripple": s.ripple }]]), style: normalizeStyle(t.value) }, null, 6), createBaseVNode("span", al2, [renderSlot(s.$slots, "default", {}, () => [createTextVNode(toDisplayString(s.text), 1)], true)])], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [r.value ? (openBlock(), createElementBlock("span", ll2, [renderSlot(s.$slots, "default", {}, void 0, true)])) : createCommentVNode("", true), c.value ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["m-count", { "only-number": !r.value }]) }, [renderSlot(s.$slots, "count", {}, void 0, true)], 2)) : (openBlock(), createBlock(Transition, { key: 2, name: "zoom" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-badge-count", { "small-num": s.count < 10, "only-number": !r.value, "only-dot": s.count === 0 && !s.showZero }]), style: normalizeStyle(s.countStyle), title: s.title || String(s.count) }, [s.dot ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", ol2, [createBaseVNode("span", sl2, toDisplayString(s.count > s.max ? s.max + "+" : s.count), 1)]))], 14, tl), [[vShow, s.showZero || s.count !== 0 || s.dot]])]), _: 1 }))], 64))], 2));
} }), [["__scopeId", "data-v-251706ce"]]);
oa2.install = (l) => {
  l.component(oa2.__name, oa2);
};
var r1 = (l) => (pushScopeId("data-v-48d2adb6"), l = l(), popScopeId(), l);
var nl2 = ["href", "title", "target"];
var il2 = { key: 0, class: "u-separator" };
var ul2 = { key: 1, class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "right", "aria-hidden": "true", focusable: "false" };
var cl2 = [r1(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1))];
var dl2 = r1(() => createBaseVNode("div", { class: "assist" }, null, -1));
var sa2 = V(defineComponent({ __name: "Breadcrumb", props: { routes: { default: () => [] }, fontSize: { default: 14 }, height: { default: 21 }, maxWidth: { default: 180 }, separator: { default: "" }, target: { default: "_self" } }, setup(l) {
  const a = l, e = computed(() => a.routes.length);
  function t(u) {
    var r = u.path;
    if (u.query && JSON.stringify(u.query) !== "{}") {
      const c = u.query;
      Object.keys(c).forEach((s, p) => {
        r = p === 0 ? r + "?" + s + "=" + c[s] : r + "&" + s + "=" + c[s];
      });
    }
    return r;
  }
  return (u, r) => (openBlock(), createElementBlock("div", { class: "m-breadcrumb", style: normalizeStyle(`height: ${u.height}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(u.routes, (c, s) => (openBlock(), createElementBlock("div", { class: "m-bread", key: s }, [createBaseVNode("a", { class: normalizeClass(["u-route", { active: s === e.value - 1 }]), style: normalizeStyle(`font-size: ${u.fontSize}px; max-width: ${u.maxWidth}px;`), href: s === e.value - 1 ? "javascript:;" : t(c), title: c.name, target: s === e.value - 1 ? "_self" : u.target }, toDisplayString(c.name || "--"), 15, nl2), s !== e.value - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [u.separator ? (openBlock(), createElementBlock("span", il2, toDisplayString(u.separator), 1)) : (openBlock(), createElementBlock("svg", ul2, cl2))], 64)) : createCommentVNode("", true)]))), 128)), dl2], 4));
} }), [["__scopeId", "data-v-48d2adb6"]]);
sa2.install = (l) => {
  l.component(sa2.__name, sa2);
};
var rl2 = ["href", "target", "disabled"];
var vl2 = { class: "u-text" };
var Me = V(defineComponent({ __name: "Button", props: { name: { default: "按钮" }, type: { default: "default" }, effect: { default: "fade" }, size: { default: "middle" }, route: { default: () => ({}) }, target: { default: "_self" }, disabled: { type: Boolean, default: false }, loading: { type: Boolean, default: false }, center: { type: Boolean, default: false } }, emits: ["click"], setup(l, { emit: a }) {
  const e = l, t = computed(() => JSON.stringify(e.route) !== "{}"), u = a;
  function r(s) {
    t.value || u("click", s);
  }
  function c(s) {
    var p = s.path;
    if (s.query && JSON.stringify(s.query) !== "{}") {
      const n = s.query;
      Object.keys(n).forEach((h3, k) => {
        p = k === 0 ? p + "?" + h3 + "=" + n[h3] : p + "&" + h3 + "=" + n[h3];
      });
    }
    return p;
  }
  return (s, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-btn-wrap", { center: s.center }]) }, [createBaseVNode("a", { onClick: r, href: c(s.route), target: t.value ? s.target : "_self", disabled: s.disabled, class: normalizeClass(["m-btn", [s.type, s.size, { [s.effect]: s.type === "default", disabled: s.disabled, "m-btn-loading": !t.value && s.loading }]]) }, [withDirectives(createBaseVNode("span", { class: normalizeClass(["m-loading-icon", { [`loading-${s.size}`]: s.loading }]) }, [createBaseVNode("span", { class: normalizeClass(["u-spin-circle", `spin-${s.size}`]) }, null, 2)], 2), [[vShow, !t.value]]), createBaseVNode("span", vl2, [renderSlot(s.$slots, "default", {}, () => [createTextVNode(toDisplayString(s.name), 1)], true)])], 10, rl2)], 2));
} }), [["__scopeId", "data-v-2ce0a6fe"]]);
Me.install = (l) => {
  l.component(Me.__name, Me);
};
var pl2 = { class: "m-head-wrapper" };
var fl2 = { class: "u-title" };
var hl2 = { class: "u-extra" };
var na = V(defineComponent({ __name: "Card", props: { width: { default: "auto" }, bordered: { type: Boolean, default: true }, extra: { default: "" }, size: { default: "default" }, title: { default: "" }, headStyle: { default: () => ({}) }, bodyStyle: { default: () => ({}) } }, setup(l) {
  const a = l, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), t = useSlots(), u = computed(() => {
    var p, n, h3, k;
    const r = (p = t.title) == null ? void 0 : p.call(t), c = (n = t.extra) == null ? void 0 : n.call(t);
    let s = 0;
    return r && ((h3 = r[0].children) != null && h3.length) && s++, c && ((k = c[0].children) != null && k.length) && s++, !!s || a.title || a.extra;
  });
  return (r, c) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-card", { bordered: r.bordered, "m-small-card": r.size === "small" }]), style: normalizeStyle(`width: ${e.value};`) }, [u.value ? (openBlock(), createElementBlock("div", { key: 0, class: "m-card-head", style: normalizeStyle(r.headStyle) }, [createBaseVNode("div", pl2, [createBaseVNode("div", fl2, [renderSlot(r.$slots, "title", {}, () => [createTextVNode(toDisplayString(r.title), 1)], true)]), createBaseVNode("div", hl2, [renderSlot(r.$slots, "extra", {}, () => [createTextVNode(toDisplayString(r.extra), 1)], true)])])], 4)) : createCommentVNode("", true), createBaseVNode("div", { class: "m-card-body", style: normalizeStyle(r.bodyStyle) }, [renderSlot(r.$slots, "default", {}, void 0, true)], 4)], 6));
} }), [["__scopeId", "data-v-d6040459"]]);
na.install = (l) => {
  l.component(na.__name, na);
};
var Ne = (l) => (pushScopeId("data-v-3c9c7b59"), l = l(), popScopeId(), l);
var ml2 = { class: "m-spin" };
var gl2 = { class: "m-spin-box" };
var yl2 = { key: 0, class: "m-spin-dot" };
var bl2 = [Ne(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), Ne(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), Ne(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), Ne(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1))];
var kl2 = { key: 1, class: "u-quarter-circle" };
var wl2 = { key: 2, class: "u-three-quarters-circle" };
var xl2 = { key: 3, class: "m-dynamic-circle" };
var Ml2 = [Ne(() => createBaseVNode("svg", { class: "circular", viewBox: "0 0 50 50" }, [createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" })], -1))];
var ce = V(defineComponent({ __name: "Spin", props: { spinning: { type: Boolean, default: true }, size: { default: "default" }, tip: { default: "" }, indicator: { default: "dot" }, color: { default: "#1677FF" } }, setup: (l) => (a, e) => (openBlock(), createElementBlock("div", { class: normalizeClass(`m-spin-wrap ${a.size}`), style: normalizeStyle(`--color: ${a.color};`) }, [withDirectives(createBaseVNode("div", ml2, [createBaseVNode("div", gl2, [a.indicator === "dot" ? (openBlock(), createElementBlock("div", yl2, bl2)) : createCommentVNode("", true), a.indicator === "quarter-circle" ? (openBlock(), createElementBlock("div", kl2)) : createCommentVNode("", true), a.indicator === "three-quarters-circle" ? (openBlock(), createElementBlock("div", wl2)) : createCommentVNode("", true), a.indicator === "dynamic-circle" ? (openBlock(), createElementBlock("div", xl2, Ml2)) : createCommentVNode("", true), withDirectives(createBaseVNode("p", { class: "u-tip" }, toDisplayString(a.tip), 513), [[vShow, a.tip]])])], 512), [[vShow, a.spinning]]), createBaseVNode("div", { class: normalizeClass(["m-spin-content", { "m-spin-mask": a.spinning }]) }, [renderSlot(a.$slots, "default", {}, void 0, true)], 2)], 6)) }), [["__scopeId", "data-v-3c9c7b59"]]);
ce.install = (l) => {
  l.component(ce.__name, ce);
};
var v1 = (l) => (pushScopeId("data-v-c9dc3cb6"), l = l(), popScopeId(), l);
var zl2 = ["href", "target"];
var _l2 = ["onLoad", "src", "alt"];
var Cl2 = { key: 0, class: "m-image" };
var $l2 = ["href", "target"];
var Bl2 = ["src", "alt"];
var Fl2 = [v1(() => createBaseVNode("path", { d: "M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z" }, null, -1))];
var Sl2 = [v1(() => createBaseVNode("path", { d: "M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z" }, null, -1))];
var Ll2 = { key: 1, class: "m-switch" };
var Al2 = ["onClick"];
var ia2 = V(defineComponent({ __name: "Carousel", props: { images: { default: () => [] }, interval: { default: 3e3 }, width: { default: "100%" }, height: { default: "100vh" }, navigation: { type: Boolean, default: true }, navColor: { default: "#FFF" }, navSize: { default: 36 }, pagination: { type: Boolean, default: true }, pageActiveColor: { default: "#1677FF" }, pageSize: { default: 10 }, pageStyle: { default: () => ({}) }, disableOnInteraction: { type: Boolean, default: true }, pauseOnMouseEnter: { type: Boolean, default: true } }, setup(l) {
  const a = l, e = ref(true), t = ref(0), u = ref(false), r = ref(), c = ref(), s = ref(), p = ref(false), n = ref(), h3 = ref(1), k = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), M = computed(() => typeof a.height == "number" ? a.height + "px" : a.height), w = computed(() => (a.images.length + 1) * z.value), i = computed(() => a.images.length), b = ref(Array(i.value).fill(false)), m = ref(), y = ref(60), f = computed(() => y.value === 60 ? 12 : y.value / 60 * 12);
  function g(D) {
    b.value[D] = true;
  }
  watch(() => b.value[0], (D) => {
    D && S();
  });
  const z = ref(), $ = ref();
  function H(D) {
    D.preventDefault(), i.value > 1 && (D.key !== "ArrowLeft" && D.key !== "ArrowUp" || we(), D.key !== "ArrowRight" && D.key !== "ArrowDown" || xe());
  }
  function S() {
    i.value > 1 && b.value[0] && (e.value = true, u.value = false, K3(), console.log("imageSlider start"));
  }
  function I() {
    e1(c.value), u.value = true, t.value = Math.ceil(t.value / z.value) * z.value;
  }
  function E() {
    e1(c.value), u.value = true, t.value = Math.floor(t.value / z.value) * z.value;
  }
  function K3() {
    r.value = ue(() => {
      const D = t.value % (i.value * z.value) + z.value;
      h3.value = h3.value % i.value + 1, function(q) {
        t.value === i.value * z.value && (t.value = 0), s.value = q, c.value = fe(ve);
      }(D);
    }, a.interval);
  }
  function ae(D) {
    e.value ? I() : (E(), e.value = true), u.value = false, function(q) {
      t.value === i.value * z.value && (t.value = 0), s.value = q, c.value = fe(ie);
    }(D);
  }
  function re(D) {
    e.value ? (I(), e.value = false) : E(), u.value = false, function(q) {
      t.value === 0 && (t.value = i.value * z.value), s.value = q, c.value = fe(pe);
    }(D);
  }
  function we() {
    const D = (h3.value + i.value - 2) % i.value * z.value;
    h3.value = h3.value - 1 > 0 ? h3.value - 1 : i.value, re(D);
  }
  function xe() {
    const D = h3.value * z.value;
    h3.value = h3.value % i.value + 1, ae(D);
  }
  function ve() {
    if (t.value >= s.value)
      K3();
    else {
      var D = Math.ceil((s.value - t.value) / f.value);
      t.value += D, c.value = fe(ve);
    }
  }
  function ie() {
    if (t.value >= s.value)
      p.value && (p.value = false, a.disableOnInteraction || a.pauseOnMouseEnter || S());
    else {
      var D = Math.ceil((s.value - t.value) / f.value);
      t.value += D, c.value = fe(ie);
    }
  }
  function pe() {
    if (t.value <= s.value)
      p.value && (p.value = false, a.disableOnInteraction || a.pauseOnMouseEnter || S());
    else {
      var D = Math.floor((s.value - t.value) / f.value);
      t.value += D, c.value = fe(pe);
    }
  }
  return onMounted(() => {
    var D;
    D = null, m.value = fe(function q(Z) {
      D ? (y.value = Math.floor(1e3 / (Z - D)), console.log("fps", y.value)) : (m.value > 10 && (D = Z), m.value = fe(q));
    }), z.value = n.value.offsetWidth, $.value = n.value.offsetHeight, document.addEventListener("keydown", H);
  }), onUnmounted(() => {
    document.removeEventListener("keydown", H);
  }), (D, q) => (openBlock(), createElementBlock("div", { class: "m-slider", ref_key: "carousel", ref: n, style: normalizeStyle(`--navColor: ${D.navColor}; --pageActiveColor: ${D.pageActiveColor}; width: ${k.value}; height: ${M.value};`), onMouseenter: q[1] || (q[1] = (Z) => D.pauseOnMouseEnter ? (be2(r.value), r.value = null, e.value ? I() : E(), void console.log("imageSlider stop")) : () => false), onMouseleave: q[2] || (q[2] = (Z) => D.pauseOnMouseEnter ? S() : () => false) }, [createBaseVNode("div", { class: normalizeClass({ transition: u.value }), style: normalizeStyle(`width: ${w.value}px; height: 100%; will-change: transform; transform: translateX(${-t.value}px);`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(D.images, (Z, le) => (openBlock(), createElementBlock("div", { class: "m-image", key: le }, [createVNode(unref(ce), { spinning: !b.value[le], indicator: "dynamic-circle" }, { default: withCtx(() => [createBaseVNode("a", { href: Z.link ? Z.link : "javascript:;", target: Z.link ? "_blank" : "_self", class: "m-link" }, [(openBlock(), createElementBlock("img", { onLoad: (te) => g(le), src: Z.src, key: Z.src, alt: Z.title, class: "u-img", style: normalizeStyle(`width: ${z.value}px; height: ${$.value}px;`) }, null, 44, _l2))], 8, zl2)]), _: 2 }, 1032, ["spinning"])]))), 128)), i.value ? (openBlock(), createElementBlock("div", Cl2, [createVNode(unref(ce), { spinning: !b.value[0], indicator: "dynamic-circle" }, { default: withCtx(() => [createBaseVNode("a", { href: D.images[0].link ? D.images[0].link : "javascript:;", target: D.images[0].link ? "_blank" : "_self", class: "m-link" }, [(openBlock(), createElementBlock("img", { onLoad: q[0] || (q[0] = (Z) => g(0)), src: D.images[0].src, key: D.images[0].src, alt: D.images[0].title, class: "u-img", style: normalizeStyle(`width: ${z.value}px; height: ${$.value}px;`) }, null, 44, Bl2))], 8, $l2)]), _: 1 }, 8, ["spinning"])])) : createCommentVNode("", true)], 6), D.navigation ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [(openBlock(), createElementBlock("svg", { class: "arrow-left", style: normalizeStyle(`width: ${D.navSize}px; height: ${D.navSize}px;`), onClick: we, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, Fl2, 4)), (openBlock(), createElementBlock("svg", { class: "arrow-right", style: normalizeStyle(`width: ${D.navSize}px; height: ${D.navSize}px;`), onClick: xe, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, Sl2, 4))], 64)) : createCommentVNode("", true), D.pagination ? (openBlock(), createElementBlock("div", Ll2, [(openBlock(true), createElementBlock(Fragment, null, renderList(i.value, (Z) => (openBlock(), createElementBlock("div", { onClick: (le) => function(te) {
    if (h3.value !== te) {
      p.value = true;
      const Q = (te - 1) * z.value;
      te < h3.value && (h3.value = te, re(Q)), te > h3.value && (h3.value = te, ae(Q));
    }
  }(Z), class: normalizeClass(["u-circle", { active: h3.value === Z }]), style: normalizeStyle([{ width: `${D.pageSize}px`, height: `${D.pageSize}px` }, D.pageStyle]), key: Z }, null, 14, Al2))), 128))])) : createCommentVNode("", true)], 36));
} }), [["__scopeId", "data-v-c9dc3cb6"]]);
ia2.install = (l) => {
  l.component(ia2.__name, ia2);
};
var Dl2 = { class: "m-empty" };
var El2 = [createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-fca5069e><g transform="translate(24 31.67)" data-v-fca5069e><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-fca5069e></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-fca5069e></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-fca5069e></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-fca5069e></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-fca5069e></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-fca5069e></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-fca5069e><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-fca5069e></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-fca5069e></path></g></g>', 1)];
var Hl2 = [createStaticVNode('<g transform="translate(0 1)" fill="none" fill-rule="evenodd" data-v-fca5069e><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" data-v-fca5069e></ellipse><g fill-rule="nonzero" stroke="#d9d9d9" data-v-fca5069e><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" data-v-fca5069e></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" data-v-fca5069e></path></g></g>', 1)];
var Il2 = ["src"];
var He = V(defineComponent({ __name: "Empty", props: { description: { default: "暂无数据" }, image: { default: "1" }, imageStyle: { default: () => ({}) } }, setup: (l) => (a, e) => (openBlock(), createElementBlock("div", Dl2, [a.image === "1" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-empty-1", style: normalizeStyle(a.imageStyle), viewBox: "0 0 184 152", xmlns: "http://www.w3.org/2000/svg" }, El2, 4)) : a.image === "2" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-empty-2", style: normalizeStyle(a.imageStyle), viewBox: "0 0 64 41", xmlns: "http://www.w3.org/2000/svg" }, Hl2, 4)) : renderSlot(a.$slots, "default", { key: 2 }, () => [createBaseVNode("img", { class: "u-empty", src: a.image, style: normalizeStyle(a.imageStyle), alt: "image" }, null, 12, Il2)], true), a.description ? (openBlock(), createElementBlock("p", { key: 3, class: normalizeClass(["u-description", { gray: a.image === "2" }]) }, [renderSlot(a.$slots, "description", {}, () => [createTextVNode(toDisplayString(a.description), 1)], true)], 2)) : createCommentVNode("", true)])) }), [["__scopeId", "data-v-fca5069e"]]);
He.install = (l) => {
  l.component(He.__name, He);
};
var l1 = (l) => (pushScopeId("data-v-d91f7b09"), l = l(), popScopeId(), l);
var Tl2 = ["title"];
var jl2 = ["placeholder"];
var Vl2 = [l1(() => createBaseVNode("path", { d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" }, null, -1))];
var Rl2 = [l1(() => createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1))];
var Wl2 = [l1(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var Nl2 = ["title", "onMouseenter", "onClick"];
var Se2 = V(defineComponent({ __name: "Select", props: { options: { default: () => [] }, label: { default: "label" }, value: { default: "value" }, placeholder: { default: "请选择" }, disabled: { type: Boolean, default: false }, allowClear: { type: Boolean, default: false }, search: { type: Boolean, default: false }, filter: { type: [Function, Boolean], default: true }, width: { default: 120 }, height: { default: 32 }, maxDisplay: { default: 6 }, modelValue: { default: null } }, emits: ["update:modelValue", "change"], setup(l, { emit: a }) {
  const e = l, t = ref(), u = ref(), r = ref(), c = ref(), s = ref(false), p = ref(true), n = ref(true), h3 = ref(false), k = ref(false), M = ref();
  function w() {
    e.allowClear && u.value && (n.value = false, h3.value = true, e.search && (k.value = false));
  }
  function i() {
    e.allowClear && h3.value && (h3.value = false, e.search || (n.value = true)), e.search && (s.value ? (k.value = true, n.value = false, M.value.focus()) : (k.value = false, n.value = true));
  }
  function b() {
    p.value = false;
  }
  function m() {
    c.value = null, p.value = true, M.value.focus();
  }
  watchEffect(() => {
    e.search ? (t.value = e.options.filter((g) => typeof e.filter == "function" ? e.filter(r.value, g) : g[e.label].includes(r.value)), t.value.length && r.value ? c.value = t.value[0][e.value] : c.value = null) : t.value = e.options;
  }), watchEffect(() => {
    (function() {
      if (e.modelValue) {
        const g = e.options.find((z) => z[e.value] === e.modelValue);
        g ? (u.value = g[e.label], c.value = g[e.value]) : (u.value = e.modelValue, c.value = null);
      } else
        u.value = null, c.value = null;
      e.search && (r.value = u.value);
    })();
  }), watch(s, (g) => {
    !g && e.search && (r.value = u.value);
  });
  const y = a;
  function f() {
    h3.value = false, u.value = null, c.value = null, s.value = false, n.value = true, y("update:modelValue"), y("change");
  }
  return (g, z) => (openBlock(), createElementBlock("div", { class: "m-select", style: normalizeStyle(`height: ${g.height}px;`) }, [createBaseVNode("div", { class: normalizeClass(["m-select-wrap", { hover: !g.disabled, focus: s.value, disabled: g.disabled }]), style: normalizeStyle(`width: ${g.width}px; height: ${g.height}px;`), tabindex: "1", ref_key: "selectRef", ref: M, onMouseenter: w, onMouseleave: i, onBlur: z[1] || (z[1] = ($) => p.value && !g.disabled ? (s.value && (s.value = false), void (e.search && (k.value = false, n.value = true))) : () => false), onClick: z[2] || (z[2] = ($) => g.disabled ? () => false : function() {
    if (s.value = !s.value, r.value = "", !c.value && u.value) {
      const H = e.options.find((S) => S[e.label] === u.value);
      c.value = H ? H[e.value] : null;
    }
    e.search && (h3.value || (n.value = !s.value, k.value = s.value));
  }()) }, [g.search ? withDirectives((openBlock(), createElementBlock("input", { key: 1, class: "u-search", style: normalizeStyle(`line-height: ${g.height - 2}px;`), autocomplete: "off", "onUpdate:modelValue": z[0] || (z[0] = ($) => r.value = $), placeholder: u.value || g.placeholder }, null, 12, jl2)), [[vModelText, r.value, void 0, { number: true, trim: true }]]) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["u-select-input", { placeholder: !u.value }]), style: normalizeStyle(`line-height: ${g.height - 2}px;`), title: u.value }, toDisplayString(u.value || g.placeholder), 15, Tl2)), (openBlock(), createElementBlock("svg", { focusable: "false", class: normalizeClass(["u-svg", { show: k.value }]), "data-icon": "search", "aria-hidden": "true", viewBox: "64 64 896 896" }, Vl2, 2)), (openBlock(), createElementBlock("svg", { class: normalizeClass(["u-svg", { rotate: s.value, show: n.value }]), viewBox: "64 64 896 896", "data-icon": "down", "aria-hidden": "true", focusable: "false" }, Rl2, 2)), (openBlock(), createElementBlock("svg", { onClick: withModifiers(f, ["stop"]), class: normalizeClass(["close", { show: h3.value }]), focusable: "false", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" }, Wl2, 2))], 38), createVNode(TransitionGroup, { name: "fade", tag: "div" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-options-panel", onMouseenter: b, onMouseleave: m, key: "1", style: normalizeStyle(`top: ${g.height + 4}px; line-height: ${g.height - 10}px; max-height: ${g.maxDisplay * g.height + 9}px; width: ${g.width}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(t.value, ($, H) => (openBlock(), createElementBlock("p", { key: H, class: normalizeClass(["u-option", { "option-hover": !$.disabled && $[g.value] === c.value, "option-selected": $[g.label] === u.value, "option-disabled": $.disabled }]), title: $[g.label], onMouseenter: (S) => {
    return I = $[g.value], void (c.value = I);
    var I;
  }, onClick: (S) => $.disabled ? () => false : function(I, E, K3) {
    e.modelValue !== I && (u.value = E, c.value = I, y("update:modelValue", I), y("change", I, E, K3)), s.value = false, e.search && (k.value = false, n.value = true);
  }($[g.value], $[g.label], H) }, toDisplayString($[g.label]), 43, Nl2))), 128))], 36), [[vShow, s.value && t.value && t.value.length]]), withDirectives(createBaseVNode("div", { key: "2", class: "m-empty-wrap", style: normalizeStyle(`top: ${g.height + 4}px; width: ${g.width}px;`) }, [createVNode(unref(He), { image: "2", key: "2" })], 4), [[vShow, s.value && t.value && !t.value.length]])]), _: 1 })], 4));
} }), [["__scopeId", "data-v-d91f7b09"]]);
Se2.install = (l) => {
  l.component(Se2.__name, Se2);
};
var ua2 = V(defineComponent({ __name: "Cascader", props: { options: { default: () => [] }, label: { default: "label" }, value: { default: "value" }, children: { default: "children" }, placeholder: { default: "请选择" }, changeOnSelect: { type: Boolean, default: false }, gap: { default: 8 }, width: { default: 120 }, height: { default: 32 }, disabled: { type: [Boolean, Array], default: false }, allowClear: { type: Boolean, default: false }, search: { type: Boolean, default: false }, filter: { type: [Function, Boolean], default: true }, maxDisplay: { default: 6 }, selectedValue: { default: () => [] } }, emits: ["update:selectedValue", "change"], setup(l, { emit: a }) {
  const e = l, t = ref([]), u = ref([]), r = ref([]), c = ref([]), s = ref([]);
  function p(i, b) {
    const m = i.length;
    for (let y = 0; y < m; y++)
      if (i[y][e.value] === t.value[b])
        return i[y][e.children] || [];
    return [];
  }
  function n(i, b) {
    const m = i.length;
    for (let y = 0; y < m; y++)
      if (i[y][e.value] === t.value[b])
        return i[y][e.label];
    return t.value[b];
  }
  watchEffect(() => {
    r.value = [...e.options];
  }), watchEffect(() => {
    t.value = [...e.selectedValue];
  }), watchEffect(() => {
    var i;
    i = t.value, c.value = p(r.value, 0), s.value = [], i.length > 1 && (s.value = p(c.value, 1)), function(b) {
      u.value[0] = n(r.value, 0), b.length > 1 && (u.value[1] = n(c.value, 1)), b.length > 2 && (u.value[2] = n(s.value, 2));
    }(t.value);
  });
  const h3 = a;
  function k(i, b) {
    e.changeOnSelect ? (h3("update:selectedValue", [i]), h3("change", [i], [b])) : (t.value = [i], u.value = [b]);
  }
  function M(i, b) {
    e.changeOnSelect ? (h3("update:selectedValue", [t.value[0], i]), h3("change", [t.value[0], i], [u.value[0], b])) : (t.value = [t.value[0], i], u.value = [u.value[0], b]);
  }
  function w(i, b) {
    h3("update:selectedValue", [...t.value.slice(0, 2), i]), h3("change", [...t.value.slice(0, 2), i], [...u.value.slice(0, 2), b]);
  }
  return (i, b) => (openBlock(), createElementBlock("div", { class: "m-cascader", style: normalizeStyle(`height: ${i.height}px; gap: ${i.gap}px;`) }, [createVNode(unref(Se2), { options: r.value, label: i.label, value: i.value, placeholder: Array.isArray(i.placeholder) ? i.placeholder[0] : i.placeholder, disabled: Array.isArray(i.disabled) ? i.disabled[0] : i.disabled, "allow-clear": i.allowClear, search: i.search, filter: i.filter, width: Array.isArray(i.width) ? i.width[0] : i.width, height: i.height, "max-display": i.maxDisplay, modelValue: t.value[0], "onUpdate:modelValue": b[0] || (b[0] = (m) => t.value[0] = m), onChange: k }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]), createVNode(unref(Se2), { options: c.value, label: i.label, value: i.value, placeholder: Array.isArray(i.placeholder) ? i.placeholder[1] : i.placeholder, disabled: Array.isArray(i.disabled) ? i.disabled[1] : i.disabled, "allow-clear": i.allowClear, search: i.search, filter: i.filter, width: Array.isArray(i.width) ? i.width[1] : i.width, height: i.height, "max-display": i.maxDisplay, modelValue: t.value[1], "onUpdate:modelValue": b[1] || (b[1] = (m) => t.value[1] = m), onChange: M }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]), createVNode(unref(Se2), { options: s.value, label: i.label, value: i.value, placeholder: Array.isArray(i.placeholder) ? i.placeholder[2] : i.placeholder, disabled: Array.isArray(i.disabled) ? i.disabled[2] : i.disabled, "allow-clear": i.allowClear, search: i.search, filter: i.filter, width: Array.isArray(i.width) ? i.width[2] : i.width, height: i.height, "max-display": i.maxDisplay, modelValue: t.value[2], "onUpdate:modelValue": b[2] || (b[2] = (m) => t.value[2] = m), onChange: w }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"])], 4));
} }), [["__scopeId", "data-v-3cd9d99b"]]);
ua2.install = (l) => {
  l.component(ua2.__name, ua2);
};
var Ol2 = ["onClick"];
var ql2 = { class: "u-label" };
var Pl2 = { key: 1, class: "m-checkbox-wrap" };
var Yl2 = { class: "u-label" };
var ca = V(defineComponent({ __name: "Checkbox", props: { options: { default: () => [] }, disabled: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, value: { default: () => [] }, gap: { default: 8 }, width: { default: "auto" }, height: { default: "auto" }, indeterminate: { type: Boolean, default: false }, checked: { type: Boolean, default: false } }, emits: ["update:value", "update:checked", "change"], setup(l, { emit: a }) {
  const e = l, t = computed(() => e.options.length), u = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), r = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), c = computed(() => e.vertical ? { marginBottom: e.gap + "px" } : { marginRight: e.gap + "px" }), s = ref([]);
  watchEffect(() => {
    s.value = e.value;
  });
  const p = a;
  function n() {
    p("update:checked", !e.checked);
  }
  return (h3, k) => (openBlock(), createElementBlock("div", { class: "m-checkbox", style: normalizeStyle(`max-width: ${u.value}; max-height: ${r.value};`) }, [t.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(h3.options, (M, w) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-checkbox-wrap", { vertical: h3.vertical }]), style: normalizeStyle(t.value !== w + 1 ? c.value : ""), key: w }, [createBaseVNode("div", { class: normalizeClass(["m-box", { disabled: h3.disabled || M.disabled }]), onClick: (i) => h3.disabled || M.disabled ? () => false : function(b) {
    if (e.value.includes(b)) {
      const m = s.value.filter((y) => y !== b);
      p("update:value", m), p("change", m);
    } else {
      const m = [...s.value, b];
      p("update:value", m), p("change", m);
    }
  }(M.value) }, [createBaseVNode("span", { class: normalizeClass(["u-checkbox", { "u-checkbox-checked": s.value.includes(M.value) }]) }, null, 2), createBaseVNode("span", ql2, [renderSlot(h3.$slots, "default", { label: M.label }, () => [createTextVNode(toDisplayString(M.label), 1)], true)])], 10, Ol2)], 6))), 128)) : (openBlock(), createElementBlock("div", Pl2, [createBaseVNode("div", { class: normalizeClass(["m-box", { disabled: h3.disabled }]), onClick: n }, [createBaseVNode("span", { class: normalizeClass(["u-checkbox", { "u-checkbox-checked": h3.checked && !h3.indeterminate, indeterminate: h3.indeterminate }]) }, null, 2), createBaseVNode("span", Yl2, [renderSlot(h3.$slots, "default", {}, () => [createTextVNode("Check all")], true)])], 2)]))], 4));
} }), [["__scopeId", "data-v-8d9d5717"]]);
ca.install = (l) => {
  l.component(ca.__name, ca);
};
var da = V(defineComponent({ __name: "Col", props: { span: { default: void 0 }, offset: { default: 0 }, flex: { default: "" }, xs: { default: void 0 }, sm: { default: void 0 }, md: { default: void 0 }, lg: { default: void 0 }, xl: { default: void 0 }, xxl: { default: void 0 } }, setup(l) {
  const a = l, e = computed(() => typeof a.flex == "number" ? `${a.flex} ${a.flex} auto` : a.flex), t = computed(() => u.value >= 1600 && a.xxl ? typeof a.xxl == "object" ? a.xxl : { span: a.xxl, offset: void 0 } : u.value >= 1200 && a.xl ? typeof a.xl == "object" ? a.xl : { span: a.xl, offset: void 0 } : u.value >= 992 && a.lg ? typeof a.lg == "object" ? a.lg : { span: a.lg, offset: void 0 } : u.value >= 768 && a.md ? typeof a.md == "object" ? a.md : { span: a.md, offset: void 0 } : u.value >= 576 && a.sm ? typeof a.sm == "object" ? a.sm : { span: a.sm, offset: void 0 } : u.value < 576 && a.xs ? typeof a.xs == "object" ? a.xs : { span: a.xs, offset: void 0 } : void 0), u = ref(document.documentElement.clientWidth);
  function r() {
    u.value = document.documentElement.clientWidth;
  }
  return onMounted(() => {
    window.addEventListener("resize", r);
  }), onUnmounted(() => {
    window.removeEventListener("resize", r);
  }), (c, s) => {
    var p, n;
    return openBlock(), createElementBlock("div", { class: normalizeClass(`m-col col-${((p = t.value) == null ? void 0 : p.span) || c.span} offset-${((n = t.value) == null ? void 0 : n.offset) || c.offset}`), style: normalizeStyle([{ "padding-left": "var(--xGap)", "padding-right": "var(--xGap)" }, `flex: ${e.value}`]) }, [renderSlot(c.$slots, "default", {}, void 0, true)], 6);
  };
} }), [["__scopeId", "data-v-c7ddaac6"]]);
da.install = (l) => {
  l.component(da.__name, da);
};
var Ul2 = { class: "m-collapse" };
var Kl2 = ["onClick"];
var Zl2 = { key: 0, focusable: "false", class: "u-arrow", "data-icon": "right", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Gl2 = [((l) => (pushScopeId("data-v-984d3862"), l = l(), popScopeId(), l))(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1))];
var Jl2 = { class: "u-lang" };
var ra2 = V(defineComponent({ __name: "Collapse", props: { collapseData: { default: () => [] }, activeKey: { default: null }, copyable: { type: Boolean, default: false }, lang: { default: "" }, fontSize: { default: 14 }, headerFontSize: { default: 0 }, textFontSize: { default: 0 }, showArrow: { type: Boolean, default: true } }, emits: ["update:activeKey", "change"], setup(l, { emit: a }) {
  const e = l, t = ref(), u = ref([]), r = computed(() => e.collapseData.length);
  function c() {
    for (let k = 0; k < r.value; k++)
      u.value[k] = t.value[k].offsetHeight;
  }
  watch(() => e.collapseData, (k) => {
    c();
  }, { deep: true, flush: "post" }), onMounted(() => {
    c();
  });
  const s = a;
  function p(k) {
    s("update:activeKey", k), s("change", k);
  }
  function n(k) {
    return Array.isArray(e.activeKey) ? e.activeKey.includes(k) : e.activeKey === k;
  }
  const h3 = ref("Copy");
  return (k, M) => {
    const w = resolveComponent("Button");
    return openBlock(), createElementBlock("div", Ul2, [(openBlock(true), createElementBlock(Fragment, null, renderList(k.collapseData, (i, b) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-collapse-item", { "u-collapse-item-active": n(i.key || b) }]), key: b }, [createBaseVNode("div", { class: "u-collapse-header", onClick: (m) => {
      var y;
      n(y = i.key || b) ? Array.isArray(e.activeKey) ? p(e.activeKey.filter((f) => f !== y)) : p(null) : Array.isArray(e.activeKey) ? p([...e.activeKey, y]) : p(y);
    } }, [k.showArrow ? (openBlock(), createElementBlock("svg", Zl2, Gl2)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["u-header", { ml24: k.showArrow }]), style: normalizeStyle(`font-size: ${k.headerFontSize || k.fontSize}px;`) }, [renderSlot(k.$slots, "header", { header: i.header, key: i.key || b }, () => [createTextVNode(toDisplayString(i.header || "--"), 1)], true)], 6)], 8, Kl2), createBaseVNode("div", { class: normalizeClass(["u-collapse-content", { "u-collapse-copyable": k.copyable }]), style: normalizeStyle(`height: ${n(i.key || b) ? u.value[b] : 0}px; opacity: ${n(i.key || b) ? 1 : 0};`) }, [createBaseVNode("div", Jl2, [renderSlot(k.$slots, "lang", { lang: k.lang, key: i.key || b }, () => [createTextVNode(toDisplayString(k.lang), 1)], true)]), createVNode(w, { size: "small", class: "u-copy", type: "primary", onClick: (m) => function(y) {
      navigator.clipboard.writeText(t.value[y].innerText || "").then(() => {
        h3.value = "Copied", ue(() => {
          h3.value = "Copy";
        }, 3e3);
      }, (f) => {
        h3.value = f;
      });
    }(b) }, { default: withCtx(() => [createTextVNode(toDisplayString(h3.value), 1)]), _: 2 }, 1032, ["onClick"]), createBaseVNode("div", { ref_for: true, ref_key: "text", ref: t, class: "u-text", style: normalizeStyle(`font-size: ${k.textFontSize || k.fontSize}px;`) }, [renderSlot(k.$slots, "text", { text: i.text, key: i.key || b }, () => [createTextVNode(toDisplayString(i.text), 1)], true)], 4)], 6)], 2))), 128))]);
  };
} }), [["__scopeId", "data-v-984d3862"]]);
ra2.install = (l) => {
  l.component(ra2.__name, ra2);
};
var Xl2 = { class: "m-countdown" };
var Ql2 = { class: "m-time" };
var et = { key: 0, class: "u-prefix" };
var at2 = { key: 0, class: "u-suffix" };
var va = V(defineComponent({ __name: "Countdown", props: { title: { default: "" }, value: { default: void 0 }, future: { type: Boolean, default: true }, format: { default: "HH:mm:ss" }, prefix: { default: "" }, suffix: { default: "" }, titleStyle: { default: () => ({}) }, valueStyle: { default: () => ({}) }, finishedText: { default: "Finished" } }, emits: ["finish"], setup(l, { emit: a }) {
  const e = l, t = useSlots(), u = computed(() => {
    var i;
    const w = (i = t.prefix) == null ? void 0 : i.call(t);
    return w ? !!(w[0].children !== "v-if" && (w != null && w.length)) : e.prefix;
  }), r = computed(() => {
    var i;
    const w = (i = t.suffix) == null ? void 0 : i.call(t);
    return w ? !!(w[0].children !== "v-if" && (w != null && w.length)) : e.suffix;
  }), c = ref(0), s = ref(), p = computed(() => ({ showMillisecond: e.format.includes("SSS"), showYear: e.format.includes("Y"), showMonth: e.format.includes("M"), showDay: e.format.includes("D"), showHour: e.format.includes("H"), showMinute: e.format.includes("m"), showSecond: e.format.includes("s") }));
  function n(w) {
    return w < 10 ? "0" + w : String(w);
  }
  function h3(w) {
    if (w === null)
      return "--";
    let i = e.format;
    if (p.value.showMillisecond) {
      var b = w % 1e3;
      i = i.replace("SSS", "0".repeat(3 - String(b).length) + b);
    }
    if (w = Math.floor(w / 1e3), p.value.showYear) {
      var m = Math.floor(w / 31104e3);
      i = i.includes("YY") ? i.replace("YY", n(m)) : i.replace("Y", String(m));
    } else
      m = 0;
    if (p.value.showMonth) {
      w -= 60 * m * 60 * 24 * 30 * 12;
      var y = Math.floor(w / 2592e3);
      i = i.includes("MM") ? i.replace("MM", n(y)) : i.replace("M", String(y));
    } else
      y = 0;
    if (p.value.showDay) {
      w -= 60 * y * 60 * 24 * 30;
      var f = Math.floor(w / 86400);
      i = i.includes("DD") ? i.replace("DD", n(f)) : i.replace("D", String(f));
    } else
      f = 0;
    if (p.value.showHour) {
      w -= 60 * f * 60 * 24;
      var g = Math.floor(w / 3600);
      i = i.includes("HH") ? i.replace("HH", n(g)) : i.replace("H", String(g));
    } else
      g = 0;
    if (p.value.showMinute) {
      w -= 60 * g * 60;
      var z = Math.floor(w / 60);
      i = i.includes("mm") ? i.replace("mm", n(z)) : i.replace("m", String(z));
    } else
      z = 0;
    if (p.value.showSecond) {
      var $ = w - 60 * z;
      i = i.includes("ss") ? i.replace("ss", n($)) : i.replace("s", String($));
    }
    return i;
  }
  const k = a;
  function M() {
    c.value > Date.now() ? (s.value = c.value - Date.now(), fe(M)) : (s.value = 0, k("finish"));
  }
  return watchEffect(() => {
    Number.isFinite(e.value) ? (e.future ? e.value >= Date.now() && (c.value = e.value) : e.value >= 0 && (c.value = e.value + Date.now()), fe(M)) : s.value = null;
  }), (w, i) => (openBlock(), createElementBlock("div", Xl2, [createBaseVNode("div", { class: "u-title", style: normalizeStyle(w.titleStyle) }, [renderSlot(w.$slots, "title", {}, () => [createTextVNode(toDisplayString(e.title), 1)], true)], 4), createBaseVNode("div", Ql2, [u.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [u.value || s.value > 0 || s.value === null ? (openBlock(), createElementBlock("span", et, [renderSlot(w.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(w.prefix), 1)], true)])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), w.finishedText && s.value === 0 && s.value !== null ? (openBlock(), createElementBlock("span", { key: 1, class: "u-time-value", style: normalizeStyle(w.valueStyle) }, [renderSlot(w.$slots, "finish", {}, () => [createTextVNode(toDisplayString(w.finishedText), 1)], true)], 4)) : createCommentVNode("", true), Number.isFinite(s.value) && s.value > 0 ? (openBlock(), createElementBlock("span", { key: 2, class: "u-time-value", style: normalizeStyle(w.valueStyle) }, toDisplayString(h3(s.value)), 5)) : createCommentVNode("", true), r.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [r.value || s.value > 0 || s.value === null ? (openBlock(), createElementBlock("span", at2, [renderSlot(w.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(w.suffix), 1)], true)])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)])]));
} }), [["__scopeId", "data-v-8c15239b"]]);
va.install = (l) => {
  l.component(va.__name, va);
};
var pa = V(defineComponent({ inheritAttrs: false, __name: "DatePicker", props: { width: { default: 180 }, mode: { default: "date" }, showTime: { type: Boolean, default: false }, showToday: { type: Boolean, default: false }, modelType: { default: "format" } }, setup(l) {
  const a = l, e = computed(() => a.mode === "time"), t = computed(() => a.mode === "week"), u = computed(() => a.mode === "month"), r = computed(() => a.mode === "year");
  return (c, s) => (openBlock(), createElementBlock("div", { class: "m-datepicker", style: normalizeStyle(`width: ${c.width}px;`) }, [createVNode(unref(En), mergeProps({ locale: "zh-CN", "month-change-on-scroll": false, "enable-time-picker": c.showTime, "time-picker": e.value, "week-picker": t.value, "month-picker": u.value, "year-picker": r.value, "now-button-label": "今天", "show-now-button": c.showToday, "auto-apply": "", "text-input": "", "model-type": c.modelType, "day-names": ["一", "二", "三", "四", "五", "六", "七"] }, c.$attrs), null, 16, ["enable-time-picker", "time-picker", "week-picker", "month-picker", "year-picker", "show-now-button", "model-type"])], 4));
} }), [["__scopeId", "data-v-0d6eaa9a"]]);
pa.install = (l) => {
  l.component(pa.__name, pa);
};
var lt = { class: "m-header" };
var tt2 = { class: "u-title" };
var ot2 = { class: "u-extra" };
var st2 = { key: 0 };
var nt = ["colspan"];
var it = { key: 1 };
var fa = V(defineComponent({ __name: "Descriptions", props: { title: { default: "" }, bordered: { type: Boolean, default: false }, column: { default: () => ({ xs: 1, sm: 2, md: 3 }) }, extra: { default: "" }, size: { default: "default" }, labelStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) } }, setup(l) {
  const a = l, e = ref(document.documentElement.clientWidth), t = computed(() => typeof a.column == "object" ? e.value >= 1600 && a.column.xxl ? a.column.xxl : e.value >= 1200 && a.column.xl ? a.column.xl : e.value >= 992 && a.column.lg ? a.column.lg : e.value >= 768 && a.column.md ? a.column.md : e.value >= 576 && a.column.sm ? a.column.sm : e.value < 576 && a.column.xs ? a.column.xs : 1 : a.column), u = ref(), r = ref(), c = ref(), s = ref(), p = ref([]), n = computed(() => p.value.length);
  function h3() {
    e.value = document.documentElement.clientWidth;
  }
  function k(i, b) {
    const m = i.length;
    let y = [];
    for (let f = 0; f < m; f++) {
      const g = { span: Math.min(i[f].dataset.span, b), element: i[f] };
      M(y) < b ? (g.span = Math.min(g.span, b - M(y)), f === m - 1 && (g.span = b - M(y)), y.push(g), f === m - 1 && p.value.push(y)) : (p.value.push(y), y = [g], f === m - 1 && (g.span = b, p.value.push(y)));
    }
    a.bordered ? nextTick(() => {
      p.value.forEach((f, g) => {
        f.forEach((z) => {
          const $ = Array.from(z.element.children), H = $[0].cloneNode(true);
          H.colSpan = 1, w(H, a.labelStyle), w(H, JSON.parse(z.element.dataset.labelStyle));
          const S = $[1].cloneNode(true);
          S.colSpan = 2 * z.span - 1, w(S, a.contentStyle), w(S, JSON.parse(z.element.dataset.contentStyle)), s.value[g].appendChild(H), s.value[g].appendChild(S);
        });
      });
    }) : nextTick(() => {
      i.forEach((f, g) => {
        const z = Array.from(f.children), $ = z[0];
        w($, a.labelStyle), w($, JSON.parse(f.dataset.labelStyle));
        const H = z[1];
        w(H, a.contentStyle), w(H, JSON.parse(f.dataset.contentStyle)), c.value[g].appendChild(f);
      });
    });
  }
  function M(i) {
    return i.reduce((b, m) => b + m.span, 0);
  }
  function w(i, b) {
    JSON.stringify(b) !== "{}" && Object.keys(b).forEach((m) => {
      i.style[m] = b[m];
    });
  }
  return watchEffect(() => {
    a.bordered ? r.value = Array.from(u.value.children).filter((i) => i.className === "m-desc-item-bordered") : r.value = Array.from(u.value.children).filter((i) => i.className === "m-desc-item");
  }, { flush: "post" }), watch(r, (i) => {
    p.value = [], nextTick(() => {
      k(i, t.value);
    });
  }), watch(t, (i) => {
    p.value = [], nextTick(() => {
      k(r.value, i);
    });
  }), onMounted(() => {
    window.addEventListener("resize", h3);
  }), onUnmounted(() => {
    window.removeEventListener("resize", h3);
  }), (i, b) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-desc", `desc-${i.size}`]) }, [createBaseVNode("div", lt, [createBaseVNode("div", tt2, [renderSlot(i.$slots, "title", {}, () => [createTextVNode(toDisplayString(i.title), 1)], true)]), createBaseVNode("div", ot2, [renderSlot(i.$slots, "extra", {}, () => [createTextVNode(toDisplayString(i.extra), 1)], true)])]), withDirectives(createBaseVNode("div", { ref_key: "view", ref: u }, [renderSlot(i.$slots, "default", {}, void 0, true)], 512), [[vShow, false]]), createBaseVNode("div", { class: normalizeClass(["m-desc-view", { "m-bordered": i.bordered }]) }, [createBaseVNode("table", null, [i.bordered ? (openBlock(), createElementBlock("tbody", it, [n.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(n.value, (m) => (openBlock(), createElementBlock("tr", { ref_for: true, ref_key: "rows", ref: s, class: "tr-bordered", key: m }))), 128)) : createCommentVNode("", true)])) : (openBlock(), createElementBlock("tbody", st2, [(openBlock(true), createElementBlock(Fragment, null, renderList(p.value, (m, y) => (openBlock(), createElementBlock("tr", { key: y }, [(openBlock(true), createElementBlock(Fragment, null, renderList(m, (f, g) => (openBlock(), createElementBlock("td", { ref_for: true, ref_key: "cols", ref: c, class: "u-item-td", colspan: f.span, key: g }, null, 8, nt))), 128))]))), 128))]))])], 2)], 2));
} }), [["__scopeId", "data-v-727ec71d"]]);
fa.install = (l) => {
  l.component(fa.__name, fa);
};
var ut2 = ["data-span", "data-label-style", "data-content-style"];
var ct2 = { class: "u-label" };
var dt2 = { class: "u-content" };
var rt = ["data-span", "data-label-style", "data-content-style"];
var vt2 = { class: "u-label-th" };
var pt2 = { class: "u-content-td" };
var ha = V(defineComponent({ __name: "DescriptionsItem", props: { label: { default: "" }, span: { default: 1 }, labelStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) } }, setup: (l) => (a, e) => (openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", { class: "m-desc-item", "data-span": a.span, "data-label-style": JSON.stringify(a.labelStyle), "data-content-style": JSON.stringify(a.contentStyle) }, [createBaseVNode("span", ct2, [renderSlot(a.$slots, "label", {}, () => [createTextVNode(toDisplayString(a.label), 1)], true)]), createBaseVNode("span", dt2, [renderSlot(a.$slots, "default", {}, void 0, true)])], 8, ut2), createBaseVNode("div", { class: "m-desc-item-bordered", "data-span": a.span, "data-label-style": JSON.stringify(a.labelStyle), "data-content-style": JSON.stringify(a.contentStyle) }, [createBaseVNode("th", vt2, [renderSlot(a.$slots, "label", {}, () => [createTextVNode(toDisplayString(a.label), 1)], true)]), createBaseVNode("td", pt2, [renderSlot(a.$slots, "default", {}, void 0, true)])], 8, rt)], 64)) }), [["__scopeId", "data-v-d38b635d"]]);
ha.install = (l) => {
  l.component(ha.__name, ha);
};
var t1 = (l) => (pushScopeId("data-v-b1ef1a5c"), l = l(), popScopeId(), l);
var ft2 = { class: "m-dialog-root" };
var ht2 = { class: "m-dialog-mask" };
var mt = { class: "m-dialog-header" };
var gt2 = { class: "u-head" };
var yt = { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "fullscreen", "aria-hidden": "true", focusable: "false" };
var bt = [t1(() => createBaseVNode("path", { d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z" }, null, -1))];
var kt = { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "fullscreen-exit", "aria-hidden": "true", focusable: "false" };
var wt2 = [t1(() => createBaseVNode("path", { d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z" }, null, -1))];
var xt = [t1(() => createBaseVNode("svg", { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "close", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var Mt2 = { class: "m-dialog-footer" };
var ma = V(defineComponent({ __name: "Dialog", props: { title: { default: "提示" }, content: { default: "" }, width: { default: 540 }, height: { default: "auto" }, switchFullscreen: { type: Boolean, default: false }, cancelText: { default: "取消" }, okText: { default: "确定" }, footer: { type: Boolean, default: false }, center: { type: Boolean, default: true }, top: { default: 100 }, loading: { type: Boolean, default: false }, bodyStyle: { default: () => ({}) }, visible: { type: Boolean, default: false } }, emits: ["close", "cancel", "ok"], setup(l, { emit: a }) {
  const e = l, t = ref(false), u = computed(() => typeof e.height == "number" ? e.height + "px" : e.height);
  watch(() => e.visible, (k) => {
    k && (t.value = false);
  });
  const r = a;
  function c() {
    e.loading || r("close");
  }
  function s() {
    t.value = !t.value;
  }
  function p() {
    r("close");
  }
  function n() {
    r("cancel");
  }
  function h3() {
    r("ok");
  }
  return (k, M) => (openBlock(), createElementBlock("div", ft2, [createVNode(Transition, { name: "mask" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", ht2, null, 512), [[vShow, k.visible]])]), _: 1 }), createVNode(Transition, null, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-dialog-wrap", onClick: withModifiers(c, ["self"]) }, [createBaseVNode("div", { ref: "dialog", class: normalizeClass(["m-dialog", k.center ? "relative-hv-center" : "top-center"]), style: normalizeStyle(`width: ${t.value ? "100%" : e.width + "px"}; top: ${k.center ? "50%" : t.value ? 0 : k.top + "px"};`) }, [createBaseVNode("div", { class: normalizeClass(["m-dialog-content", { loading: k.loading }]), style: normalizeStyle(`--height: ${t.value ? "100vh" : u.value}`) }, [createVNode(unref(ce), { class: "u-spin", spinning: k.loading, size: "small" }, null, 8, ["spinning"]), createBaseVNode("div", mt, [createBaseVNode("p", gt2, [renderSlot(k.$slots, "title", {}, () => [createTextVNode(toDisplayString(k.title), 1)], true)])]), k.switchFullscreen ? (openBlock(), createElementBlock("span", { key: 0, class: "m-screen", onClick: s }, [withDirectives((openBlock(), createElementBlock("svg", yt, bt, 512)), [[vShow, !t.value]]), withDirectives((openBlock(), createElementBlock("svg", kt, wt2, 512)), [[vShow, t.value]])])) : createCommentVNode("", true), createBaseVNode("span", { class: "m-close", onClick: p }, xt), createBaseVNode("div", { class: "m-dialog-body", style: normalizeStyle(k.bodyStyle) }, [renderSlot(k.$slots, "default", {}, () => [createTextVNode(toDisplayString(k.content), 1)], true)], 4), withDirectives(createBaseVNode("div", Mt2, [createVNode(unref(Me), { class: "mr8", onClick: n }, { default: withCtx(() => [createTextVNode(toDisplayString(k.cancelText), 1)]), _: 1 }), createVNode(unref(Me), { type: "primary", onClick: h3 }, { default: withCtx(() => [createTextVNode(toDisplayString(k.okText), 1)]), _: 1 })], 512), [[vShow, k.footer]])], 6)], 6)], 512), [[vShow, k.visible]])]), _: 3 })]));
} }), [["__scopeId", "data-v-b1ef1a5c"]]);
ma.install = (l) => {
  l.component(ma.__name, ma);
};
var zt = { key: 2, class: "u-text" };
var _t = { key: 1, class: "m-divider-vertical" };
var ga = V(defineComponent({ __name: "Divider", props: { dashed: { type: Boolean, default: false }, orientation: { default: "center" }, orientationMargin: { default: "" }, borderWidth: { default: 1 }, type: { default: "horizontal" } }, setup(l) {
  const a = l, e = computed(() => {
    if (a.orientationMargin !== "")
      return typeof a.orientationMargin == "number" ? a.orientationMargin + "px" : a.orientationMargin;
  }), t = useSlots(), u = computed(() => {
    var c, s;
    const r = (c = t.default) == null ? void 0 : c.call(t);
    return !!r && !!(r[0].children !== "v-if" && ((s = r[0].children) != null && s.length));
  });
  return (r, c) => r.type === "horizontal" ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass([`m-divider-horizontal ${r.orientation}`, { dashed: r.dashed, margin24: !u.value, marginLeft: r.orientationMargin !== "" && r.orientation === "left", marginRight: r.orientationMargin !== "" && r.orientation === "right" }]), style: normalizeStyle(`--border-width: ${r.borderWidth}px;`) }, [r.orientation === "left" ? withDirectives((openBlock(), createElementBlock("span", { key: 0, class: "u-text", style: normalizeStyle(`margin-left: ${e.value};`) }, [renderSlot(r.$slots, "default", {}, void 0, true)], 4)), [[vShow, u.value]]) : r.orientation === "right" ? withDirectives((openBlock(), createElementBlock("span", { key: 1, class: "u-text", style: normalizeStyle(`margin-right: ${e.value};`) }, [renderSlot(r.$slots, "default", {}, void 0, true)], 4)), [[vShow, u.value]]) : withDirectives((openBlock(), createElementBlock("span", zt, [renderSlot(r.$slots, "default", {}, void 0, true)], 512)), [[vShow, u.value]])], 6)) : (openBlock(), createElementBlock("div", _t));
} }), [["__scopeId", "data-v-42a50a74"]]);
ga.install = (l) => {
  l.component(ga.__name, ga);
};
var p1 = (l) => (pushScopeId("data-v-84da70c0"), l = l(), popScopeId(), l);
var Ct2 = { class: "m-drawer", tabindex: "-1" };
var $t2 = { class: "m-drawer-content" };
var Bt = { key: 0, class: "m-drawer-body-wrapper" };
var Ft2 = { class: "m-drawer-header" };
var St = { class: "m-header-title" };
var Lt = [p1(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var At2 = { class: "u-title" };
var Dt = { class: "m-drawer-extra" };
var Et2 = { class: "m-drawer-body" };
var Ht2 = { key: 1, class: "m-drawer-body-wrapper" };
var It = { class: "m-drawer-header" };
var Tt = { class: "m-header-title" };
var jt2 = [p1(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var Vt = { class: "u-title" };
var Rt2 = { class: "m-drawer-extra" };
var Wt = { class: "m-drawer-body" };
var ya = V(defineComponent({ __name: "Drawer", props: { title: { default: "" }, width: { default: 378 }, height: { default: 378 }, closable: { type: Boolean, default: true }, destroyOnClose: { type: Boolean, default: false }, extra: { default: "" }, placement: { default: "right" }, zIndex: { default: 1e3 }, open: { type: Boolean, default: false } }, emits: ["update:open", "close"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), u = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), r = a;
  function c(p) {
    s(p);
  }
  function s(p) {
    r("update:open", false), r("close", p);
  }
  return (p, n) => (openBlock(), createElementBlock("div", Ct2, [createVNode(Transition, { name: "fade" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-drawer-mask", onClick: withModifiers(c, ["self"]) }, null, 512), [[vShow, p.open]])]), _: 1 }), createVNode(Transition, { name: `motion-${p.placement}` }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-drawer-wrapper", `drawer-${p.placement}`]), style: normalizeStyle(`z-index: ${p.zIndex}; ${["top", "bottom"].includes(p.placement) ? "height:" + u.value : "width:" + t.value};`) }, [createBaseVNode("div", $t2, [p.destroyOnClose ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Bt, [createBaseVNode("div", Ft2, [createBaseVNode("div", St, [p.closable ? (openBlock(), createElementBlock("svg", { key: 0, focusable: "false", onClick: s, class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, Lt)) : createCommentVNode("", true), createBaseVNode("p", At2, [renderSlot(p.$slots, "title", {}, () => [createTextVNode(toDisplayString(p.title), 1)], true)])]), createBaseVNode("div", Dt, [renderSlot(p.$slots, "extra", {}, () => [createTextVNode(toDisplayString(p.extra), 1)], true)])]), createBaseVNode("div", Et2, [renderSlot(p.$slots, "default", {}, void 0, true)])])), p.destroyOnClose && p.open ? (openBlock(), createElementBlock("div", Ht2, [createBaseVNode("div", It, [createBaseVNode("div", Tt, [(openBlock(), createElementBlock("svg", { focusable: "false", onClick: s, class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, jt2)), createBaseVNode("p", Vt, [renderSlot(p.$slots, "title", {}, () => [createTextVNode(toDisplayString(p.title), 1)], true)])]), createBaseVNode("div", Rt2, [renderSlot(p.$slots, "extra", {}, () => [createTextVNode(toDisplayString(p.extra), 1)], true)])]), createBaseVNode("div", Wt, [renderSlot(p.$slots, "default", {}, void 0, true)])])) : createCommentVNode("", true)])], 6), [[vShow, p.open]])]), _: 3 }, 8, ["name"])]));
} }), [["__scopeId", "data-v-84da70c0"]]);
ya.install = (l) => {
  l.component(ya.__name, ya);
};
var Nt = ((l) => (pushScopeId("data-v-7a945ab5"), l = l(), popScopeId(), l))(() => createBaseVNode("div", { class: "m-tooltip-arrow" }, [createBaseVNode("span", { class: "u-tooltip-arrow" })], -1));
var qe = V(defineComponent({ __name: "Tooltip", props: { maxWidth: { default: 120 }, content: { default: "暂无内容" }, tooltip: { default: "暂无提示" }, fontSize: { default: 14 }, color: { default: "#FFF" }, backgroundColor: { default: "rgba(0, 0, 0, .85)" }, overlayStyle: { default: () => ({}) } }, emits: ["openChange"], setup(l, { emit: a }) {
  const e = ref(false), t = ref(), u = ref(0), r = ref(0), c = ref(), s = ref(), p = a;
  function n() {
    (function() {
      const k = c.value.offsetWidth, M = s.value.offsetWidth, w = s.value.offsetHeight;
      u.value = w + 4, r.value = (M - k) / 2;
    })(), be2(t.value), e.value = true, p("openChange", e.value);
  }
  function h3() {
    t.value = ue(() => {
      e.value = false, p("openChange", e.value);
    }, 100);
  }
  return (k, M) => (openBlock(), createElementBlock("div", { class: "m-tooltip", onMouseenter: n, onMouseleave: h3 }, [createBaseVNode("div", { ref_key: "tooltipRef", ref: s, class: normalizeClass(["m-tooltip-content", { "show-tip": e.value }]), style: normalizeStyle(`--tooltip-font-size: ${k.fontSize}px; --tooltip-color: ${k.color}; --tooltip-background-color: ${k.backgroundColor}; max-width: ${k.maxWidth}px; top: ${-u.value}px; left: ${-r.value}px;`), onMouseenter: n, onMouseleave: h3 }, [createBaseVNode("div", { class: "u-tooltip", style: normalizeStyle(k.overlayStyle) }, [renderSlot(k.$slots, "tooltip", {}, () => [createTextVNode(toDisplayString(k.tooltip), 1)], true)], 4), Nt], 38), createBaseVNode("div", { ref_key: "contentRef", ref: c }, [renderSlot(k.$slots, "default", {}, () => [createTextVNode(toDisplayString(k.content), 1)], true)], 512)], 32));
} }), [["__scopeId", "data-v-7a945ab5"]]);
qe.install = (l) => {
  l.component(qe.__name, qe);
};
var ba = V(defineComponent({ __name: "Ellipsis", props: { maxWidth: { default: "100%" }, line: { default: void 0 }, expand: { type: Boolean, default: false }, tooltip: { type: Boolean, default: true }, tooltipMaxWidth: { default: void 0 }, tooltipFontSize: { default: 14 }, tooltipColor: { default: "#FFF" }, tooltipBackgroundColor: { default: "rgba(0, 0, 0, .85)" }, tooltipOverlayStyle: { default: () => ({ padding: "8px 12px", textAlign: "justify" }) } }, emits: ["expandChange"], setup(l, { emit: a }) {
  const e = l, t = ref(), u = ref(), r = ref(), c = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth);
  watchEffect(() => {
    t.value = e.tooltip;
  }), watchEffect(() => {
    e.tooltip && (e.tooltipMaxWidth ? r.value = e.tooltipMaxWidth : r.value = u.value.offsetWidth + 24);
  }, { flush: "post" });
  const s = a;
  function p() {
    u.value.style["-webkit-line-clamp"] ? (e.tooltip ? (t.value = false, nextTick(() => {
      u.value.style["-webkit-line-clamp"] = "";
    })) : u.value.style["-webkit-line-clamp"] = "", s("expandChange", true)) : (e.tooltip && (t.value = true), u.value.style["-webkit-line-clamp"] = e.line, s("expandChange", false));
  }
  return (n, h3) => t.value ? (openBlock(), createBlock(unref(qe), { key: 0, "max-width": r.value, fontSize: n.tooltipFontSize, color: n.tooltipColor, backgroundColor: n.tooltipBackgroundColor, overlayStyle: n.tooltipOverlayStyle }, { tooltip: withCtx(() => [renderSlot(n.$slots, "tooltip", {}, () => [renderSlot(n.$slots, "default", {}, void 0, true)], true)]), default: withCtx(() => [createBaseVNode("div", mergeProps({ ref_key: "ellipsis", ref: u, class: ["m-ellipsis", [n.line ? "ellipsis-line" : "not-ellipsis-line", { "cursor-pointer": n.expand }]], style: `-webkit-line-clamp: ${n.line}; max-width: ${c.value};`, onClick: h3[0] || (h3[0] = (k) => n.expand ? p() : () => false) }, n.$attrs), [renderSlot(n.$slots, "default", {}, void 0, true)], 16)]), _: 3 }, 8, ["max-width", "fontSize", "color", "backgroundColor", "overlayStyle"])) : (openBlock(), createElementBlock("div", mergeProps({ key: 1, ref_key: "ellipsis", ref: u, class: ["m-ellipsis", [n.line ? "ellipsis-line" : "not-ellipsis-line", { "cursor-pointer": n.expand }]], style: `-webkit-line-clamp: ${n.line}; max-width: ${c.value};`, onClick: h3[1] || (h3[1] = (k) => n.expand ? p() : () => false) }, n.$attrs), [renderSlot(n.$slots, "default", {}, void 0, true)], 16));
} }), [["__scopeId", "data-v-6c81a077"]]);
ba.install = (l) => {
  l.component(ba.__name, ba);
};
var ka2 = V(defineComponent({ __name: "Flex", props: { width: { default: "auto" }, vertical: { type: Boolean, default: false }, wrap: { default: "nowrap" }, justify: { default: "normal" }, align: { default: "normal" }, gap: { default: void 0 } }, setup(l) {
  const a = l, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), t = computed(() => {
    if (a.gap === void 0)
      return 0;
    if (typeof a.gap == "number")
      return a.gap + "px";
    if (Array.isArray(a.gap))
      return a.gap[1] + "px " + a.gap[0] + "px ";
    if (["small", "middle", "large"].includes(a.gap))
      return { small: "8px", middle: "16px", large: "24px" }[a.gap];
  });
  return (u, r) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-flex", { "flex-vertical": u.vertical }]), style: normalizeStyle(`
      width: ${e.value};
      gap: ${t.value};
      margin-bottom: -${Array.isArray(a.gap) && u.wrap ? a.gap[1] : 0}px;
      --wrap: ${u.wrap};
      --justify: ${u.justify};
      --align: ${u.align};
    `) }, [renderSlot(u.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-145d6ac2"]]);
ka2.install = (l) => {
  l.component(ka2.__name, ka2);
};
var Le = V(defineComponent({ __name: "Space", props: { width: { default: "auto" }, align: { default: "start" }, direction: { default: "horizontal" }, size: { default: "small" }, wrap: { type: Boolean, default: true } }, setup(l) {
  const a = l, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), t = computed(() => {
    if (typeof a.size == "number")
      return a.size + "px";
    if (Array.isArray(a.size))
      return a.size[1] + "px " + a.size[0] + "px ";
    if (["small", "middle", "large"].includes(a.size))
      return { small: "8px", middle: "16px", large: "24px" }[a.size];
  });
  return (u, r) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-space", [`${u.direction} ${u.align}`, { wrap: u.wrap }]]), style: normalizeStyle(`width: ${e.value}; gap: ${t.value}; margin-bottom: -${Array.isArray(a.size) && u.wrap ? a.size[1] : 0}px;`) }, [renderSlot(u.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-15e6c265"]]);
Le.install = (l) => {
  l.component(Le.__name, Le);
};
var ke = (l) => (pushScopeId("data-v-f7604d80"), l = l(), popScopeId(), l);
var Ot2 = { class: "m-image-wrap" };
var qt = ["onLoad", "src", "alt"];
var Pt = ["onClick"];
var Yt = { class: "m-image-mask-info" };
var Ut2 = ke(() => createBaseVNode("svg", { class: "u-eye", focusable: "false", "data-icon": "eye", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })], -1));
var Kt2 = { class: "u-pre" };
var Zt2 = { class: "m-preview-mask" };
var Gt = { class: "m-preview-body" };
var Jt2 = { class: "m-preview-operations" };
var Xt = ["href", "title"];
var Qt = [ke(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "close", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var e2 = [ke(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "zoom-in", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })], -1))];
var a2 = [ke(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "zoom-out", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })], -1))];
var l2 = [ke(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "expand", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z" })], -1))];
var t2 = [ke(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "rotate-right", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" }), createBaseVNode("path", { d: "M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" })], -1))];
var o2 = [ke(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "rotate-left", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" }), createBaseVNode("path", { d: "M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" })], -1))];
var s2 = [ke(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "swap", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" })], -1))];
var n2 = { class: "u-icon", style: { transform: "rotate(90deg)" }, focusable: "false", "data-icon": "swap", "aria-hidden": "true", viewBox: "64 64 896 896" };
var i2 = [ke(() => createBaseVNode("path", { d: "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" }, null, -1))];
var u2 = ["src", "alt", "onLoad"];
var c2 = [ke(() => createBaseVNode("svg", { focusable: "false", class: "u-switch", "data-icon": "left", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })], -1))];
var d2 = [ke(() => createBaseVNode("svg", { focusable: "false", class: "u-switch", "data-icon": "right", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" })], -1))];
var r2 = defineComponent({ __name: "Image", props: { src: { default: "" }, name: { default: "" }, width: { default: 200 }, height: { default: 200 }, bordered: { type: Boolean, default: true }, gap: { default: 8 }, fit: { default: "contain" }, preview: { default: "预览" }, zoomRatio: { default: 0.1 }, minZoomScale: { default: 0.1 }, maxZoomScale: { default: 10 }, resetOnDbclick: { type: Boolean, default: true }, loop: { type: Boolean, default: false }, album: { type: Boolean, default: false } }, setup(l, { expose: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), u = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), r = ref([]);
  watchEffect(() => {
    r.value = Array.isArray(e.src) ? e.src : [{ src: e.src, name: e.name }];
  });
  const c = computed(() => r.value.length);
  onMounted(() => {
    document.addEventListener("keydown", g);
  }), onUnmounted(() => {
    document.removeEventListener("keydown", g);
  });
  const s = ref(Array(c.value).fill(false)), p = ref(Array(c.value).fill(false)), n = ref(0), h3 = ref(false), k = ref(0), M = ref(1), w = ref(1), i = ref(1), b = ref(0), m = ref(0), y = ref(0), f = ref(0);
  function g(D) {
    D.preventDefault(), h3.value && c.value > 1 && (D.key !== "ArrowLeft" && D.key !== "ArrowUp" || ie(), D.key !== "ArrowRight" && D.key !== "ArrowDown" || pe());
  }
  function z(D) {
    if (D) {
      if (D.name)
        return D.name;
      {
        const q = D.src.split("?")[0].split("/");
        return q[q.length - 1];
      }
    }
  }
  function $(D) {
    M.value = 1, k.value = 0, y.value = 0, f.value = 0, h3.value = true, n.value = D;
  }
  function H(D, q) {
    const Z = String(D).split(".")[1], le = String(q).split(".")[1];
    let te = Math.max((Z == null ? void 0 : Z.length) || 0, (le == null ? void 0 : le.length) || 0), Q = D.toFixed(te), ze = q.toFixed(te);
    return (+Q.replace(".", "") + +ze.replace(".", "")) / Math.pow(10, te);
  }
  function S() {
    h3.value = false;
  }
  function I() {
    M.value + e.zoomRatio > e.maxZoomScale ? M.value = e.maxZoomScale : M.value = H(M.value, e.zoomRatio);
  }
  function E() {
    M.value - e.zoomRatio < e.minZoomScale ? M.value = e.minZoomScale : M.value = H(M.value, -e.zoomRatio);
  }
  function K3() {
    M.value = 1, w.value = 1, i.value = 1, k.value = 0, y.value = 0, f.value = 0;
  }
  function ae() {
    k.value += 90;
  }
  function re() {
    k.value -= 90;
  }
  function we() {
    w.value *= -1;
  }
  function xe() {
    i.value *= -1;
  }
  function ve(D) {
    console.log("e", D);
    const q = D.deltaY * e.zoomRatio * 0.1;
    M.value === e.minZoomScale && q > 0 || M.value === e.maxZoomScale && q < 0 || (M.value - q < e.minZoomScale ? M.value = e.minZoomScale : M.value - q > e.maxZoomScale ? M.value = e.maxZoomScale : M.value = H(M.value, -q));
  }
  function ie() {
    e.loop ? n.value = (n.value - 1 + c.value) % c.value : n.value > 0 && n.value--, K3();
  }
  function pe() {
    e.loop ? n.value = (n.value + 1) % c.value : n.value < c.value - 1 && n.value++, K3();
  }
  return a({ onPreview: $ }), (D, q) => (openBlock(), createElementBlock("div", Ot2, [createVNode(unref(Le), { size: D.gap }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(r.value, (Z, le) => withDirectives((openBlock(), createElementBlock("div", { class: normalizeClass(["m-image", { bordered: D.bordered, "image-hover-mask": s.value[le] }]), style: normalizeStyle(`width: ${t.value}; height: ${u.value};`), key: le }, [createVNode(unref(ce), { spinning: !s.value[le], indicator: "dynamic-circle" }, { default: withCtx(() => [createBaseVNode("img", { class: "u-image", style: normalizeStyle(`width: calc(${t.value} - 2px); height: calc(${u.value} - 2px); object-fit: ${D.fit};`), onLoad: (te) => {
    return Q = le, void (s.value[Q] = true);
    var Q;
  }, src: Z.src, alt: Z.name }, null, 44, qt)]), _: 2 }, 1032, ["spinning"]), createBaseVNode("div", { class: "m-image-mask", onClick: (te) => $(le) }, [createBaseVNode("div", Yt, [Ut2, createBaseVNode("p", Kt2, [renderSlot(D.$slots, "preview", {}, () => [createTextVNode(toDisplayString(D.preview), 1)], true)])])], 8, Pt)], 6)), [[vShow, !D.album || D.album && le === 0]])), 128))]), _: 3 }, 8, ["size"]), createVNode(Transition, { name: "mask" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", Zt2, null, 512), [[vShow, h3.value]])]), _: 1 }), createVNode(Transition, { name: "preview" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-preview-wrap", onClick: withModifiers(S, ["self"]), onWheel: withModifiers(ve, ["prevent"]) }, [createBaseVNode("div", Gt, [createBaseVNode("div", Jt2, [createBaseVNode("a", { class: "u-name", href: r.value[n.value].src, target: "_blank", title: z(r.value[n.value]) }, toDisplayString(z(r.value[n.value])), 9, Xt), withDirectives(createBaseVNode("p", { class: "u-preview-progress" }, toDisplayString(n.value + 1) + " / " + toDisplayString(c.value), 513), [[vShow, Array.isArray(D.src)]]), createBaseVNode("div", { class: "u-preview-operation", title: "关闭", onClick: S }, Qt), createBaseVNode("div", { class: normalizeClass(["u-preview-operation", { "u-operation-disabled": M.value === D.maxZoomScale }]), title: "放大", onClick: I }, e2, 2), createBaseVNode("div", { class: normalizeClass(["u-preview-operation", { "u-operation-disabled": M.value === D.minZoomScale }]), title: "缩小", onClick: E }, a2, 2), createBaseVNode("div", { class: "u-preview-operation", title: "还原", onClick: K3 }, l2), createBaseVNode("div", { class: "u-preview-operation", title: "向右旋转", onClick: ae }, t2), createBaseVNode("div", { class: "u-preview-operation", title: "向左旋转", onClick: re }, o2), createBaseVNode("div", { class: "u-preview-operation", title: "水平镜像", onClick: we }, s2), createBaseVNode("div", { class: "u-preview-operation", title: "垂直镜像", onClick: xe }, [(openBlock(), createElementBlock("svg", n2, i2))])]), createBaseVNode("div", { class: "m-preview-image", style: normalizeStyle(`transform: translate3d(${y.value}px, ${f.value}px, 0px);`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(r.value, (Z, le) => withDirectives((openBlock(), createBlock(unref(ce), { spinning: !p.value[le], indicator: "dynamic-circle", key: le }, { default: withCtx(() => [createBaseVNode("img", { class: "u-preview-image", style: normalizeStyle(`transform: scale3d(${w.value * M.value}, ${i.value * M.value}, 1) rotate(${k.value}deg);`), src: Z.src, alt: Z.name, onMousedown: q[0] || (q[0] = withModifiers((te) => function(Q) {
    const ze = Q.target.getBoundingClientRect(), Ve = ze.top, De = ze.bottom, Je2 = ze.right, Xe = ze.left, Qe2 = document.documentElement.clientWidth, Re2 = document.documentElement.clientHeight;
    b.value = Q.clientX, m.value = Q.clientY;
    const Fe2 = y.value, _e2 = f.value;
    document.onmousemove = (ea) => {
      y.value = Fe2 + ea.clientX - b.value, f.value = _e2 + ea.clientY - m.value;
    }, document.onmouseup = () => {
      y.value > Fe2 + Qe2 - Je2 && (y.value = Fe2 + Qe2 - Je2), y.value < Fe2 - Xe && (y.value = Fe2 - Xe), f.value > _e2 + Re2 - De && (f.value = _e2 + Re2 - De), f.value < _e2 - Ve && (f.value = _e2 - Ve), document.onmousemove = null;
    };
  }(te), ["prevent"])), onLoad: (te) => function(Q) {
    p.value[Q] = true;
  }(le), onDblclick: q[1] || (q[1] = (te) => D.resetOnDbclick ? K3() : () => false) }, null, 44, u2)]), _: 2 }, 1032, ["spinning"])), [[vShow, n.value === le]])), 128))], 4), c.value > 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", { class: normalizeClass(["m-switch-left", { "u-switch-disabled": n.value === 0 && !D.loop }]), onClick: ie }, c2, 2), createBaseVNode("div", { class: normalizeClass(["m-switch-right", { "u-switch-disabled": n.value === c.value - 1 && !D.loop }]), onClick: pe }, d2, 2)], 64)) : createCommentVNode("", true)])], 544), [[vShow, h3.value]])]), _: 1 })]));
} });
var Pe = V(r2, [["__scopeId", "data-v-f7604d80"]]);
Pe.install = (l) => {
  l.component(Pe.__name, Pe);
};
var Za = (l) => (pushScopeId("data-v-615b7abe"), l = l(), popScopeId(), l);
var v2 = { key: 0, class: "m-prefix" };
var p2 = ["type", "value", "maxlength", "disabled"];
var f2 = { class: "m-suffix" };
var h2 = [Za(() => createBaseVNode("svg", { focusable: "false", class: "u-clear", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })], -1))];
var m2 = { focusable: "false", class: "u-eye", "data-icon": "eye", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var g2 = [Za(() => createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" }, null, -1))];
var y2 = { focusable: "false", class: "u-eye", "data-icon": "eye-invisible", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var b2 = [Za(() => createBaseVNode("path", { d: "M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" }, null, -1)), Za(() => createBaseVNode("path", { d: "M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" }, null, -1))];
var k2 = { key: 2, class: "m-count" };
var wa2 = V(defineComponent({ inheritAttrs: false, __name: "Input", props: { width: { default: "100%" }, addonBefore: { default: "" }, addonAfter: { default: "" }, allowClear: { type: Boolean, default: false }, password: { type: Boolean, default: false }, disabled: { type: Boolean, default: false }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, size: { default: "middle" }, prefix: { default: "" }, suffix: { default: "" }, value: { default: "" }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "enter"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), u = computed(() => e.maxlength ? e.value.length + " / " + e.maxlength : e.value.length), r = useSlots(), c = computed(() => {
    var g;
    const f = (g = r.prefix) == null ? void 0 : g.call(r);
    return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e.prefix;
  }), s = computed(() => {
    var g;
    const f = (g = r.suffix) == null ? void 0 : g.call(r);
    return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e.suffix;
  }), p = computed(() => {
    var g;
    const f = (g = r.addonBefore) == null ? void 0 : g.call(r);
    return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e.addonBefore;
  }), n = computed(() => {
    var g;
    const f = (g = r.addonAfter) == null ? void 0 : g.call(r);
    return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e.addonAfter;
  }), h3 = a;
  function k(f) {
    "lazy" in e.valueModifiers || (h3("update:value", f.target.value), h3("change", f));
  }
  function M(f) {
    "lazy" in e.valueModifiers && (h3("update:value", f.target.value), h3("change", f));
  }
  function w(f) {
    f.key === "Enter" && (f.preventDefault(), h3("enter", f));
  }
  const i = ref();
  function b() {
    h3("update:value", ""), i.value.focus();
  }
  const m = ref(false);
  function y() {
    m.value = !m.value;
  }
  return (f, g) => (openBlock(), createElementBlock("div", { class: "m-input-wrap", style: normalizeStyle(`width: ${t.value};`) }, [p.value ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["m-addon", { before: p.value }]) }, [renderSlot(f.$slots, "addonBefore", {}, () => [createTextVNode(toDisplayString(f.addonBefore), 1)], true)], 2)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["m-input", [`${f.size}`, { disabled: f.disabled, "input-before": p.value, "input-after": n.value }]]), tabindex: "1" }, [c.value ? (openBlock(), createElementBlock("span", v2, [renderSlot(f.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(f.prefix), 1)], true)])) : createCommentVNode("", true), createBaseVNode("input", mergeProps({ class: "u-input", ref_key: "input", ref: i, type: f.password && !m.value ? "password" : "text", value: f.value, password: "", maxlength: f.maxlength, disabled: f.disabled, onInput: k, onChange: M, onKeydown: w }, f.$attrs), null, 16, p2), createBaseVNode("span", f2, [!f.disabled && f.allowClear && f.value ? (openBlock(), createElementBlock("span", { key: 0, class: "m-action", onClick: b }, h2)) : createCommentVNode("", true), f.password ? (openBlock(), createElementBlock("span", { key: 1, class: "m-action", onClick: y }, [withDirectives((openBlock(), createElementBlock("svg", m2, g2, 512)), [[vShow, m.value]]), withDirectives((openBlock(), createElementBlock("svg", y2, b2, 512)), [[vShow, !m.value]])])) : createCommentVNode("", true), f.showCount ? (openBlock(), createElementBlock("span", k2, toDisplayString(u.value), 1)) : createCommentVNode("", true), s.value ? renderSlot(f.$slots, "suffix", { key: 3 }, () => [createTextVNode(toDisplayString(f.suffix), 1)], true) : createCommentVNode("", true)])], 2), n.value ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["m-addon", { after: n.value }]) }, [renderSlot(f.$slots, "addonAfter", {}, () => [createTextVNode(toDisplayString(f.addonAfter), 1)], true)], 2)) : createCommentVNode("", true)], 4));
} }), [["__scopeId", "data-v-615b7abe"]]);
wa2.install = (l) => {
  l.component(wa2.__name, wa2);
};
var f1 = (l) => (pushScopeId("data-v-d152c72b"), l = l(), popScopeId(), l);
var w2 = { class: "m-input-wrap" };
var x2 = { key: 0, class: "u-input-prefix" };
var M2 = { class: "m-handler-wrap" };
var z2 = [f1(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "up", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" })], -1))];
var _2 = [f1(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "down", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })], -1))];
var C2 = defineComponent({ inheritAttrs: false, __name: "InputNumber", props: { width: { default: 90 }, min: { default: -1 / 0 }, max: { default: 1 / 0 }, step: { default: 1 }, precision: { default: 0 }, prefix: { default: "" }, formatter: { type: Function, default: (l) => l }, keyboard: { type: Boolean, default: true }, value: { default: null } }, emits: ["update:value", "change"], setup(l, { emit: a }) {
  var b;
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), u = computed(() => {
    var y;
    const m = ((y = String(e.step).split(".")[1]) == null ? void 0 : y.length) || 0;
    return Math.max(e.precision, m);
  }), r = useSlots(), c = computed(() => {
    var y;
    const m = (y = r.prefix) == null ? void 0 : y.call(r);
    return m ? !!(m[0].children !== "v-if" && (m != null && m.length)) : e.prefix;
  }), s = ref(e.formatter((b = e.value) == null ? void 0 : b.toFixed(u.value)));
  watch(() => e.value, (m) => {
    s.value = e.formatter(m == null ? void 0 : m.toFixed(u.value));
  }), watch(s, (m) => {
    m || n(null);
  });
  const p = a;
  function n(m) {
    p("change", m), p("update:value", m);
  }
  function h3(m) {
    var f, g;
    const y = m.target.value.replaceAll(",", "");
    if (Number.isNaN(parseFloat(y)))
      s.value = (f = e.value) == null ? void 0 : f.toFixed(u.value);
    else {
      if (parseFloat(y) > e.max)
        return void n(e.max);
      if (parseFloat(y) < e.min)
        return void n(e.min);
      parseFloat(y) !== e.value ? n(parseFloat(y)) : s.value = (g = e.value) == null ? void 0 : g.toFixed(u.value);
    }
  }
  function k(m, y) {
    const f = String(m).split(".")[1], g = String(y).split(".")[1];
    let z = Math.max((f == null ? void 0 : f.length) || 0, (g == null ? void 0 : g.length) || 0), $ = m.toFixed(z), H = y.toFixed(z);
    return (+$.replace(".", "") + +H.replace(".", "")) / Math.pow(10, z);
  }
  function M(m) {
    m.key === "ArrowUp" && w(), m.key === "ArrowDown" && i();
  }
  function w() {
    n(parseFloat(Math.min(e.max, k(e.value || 0, +e.step)).toFixed(u.value)));
  }
  function i() {
    n(parseFloat(Math.max(e.min, k(e.value || 0, -e.step)).toFixed(u.value)));
  }
  return (m, y) => (openBlock(), createElementBlock("div", { class: "m-input-number", tabindex: "1", style: normalizeStyle(`width: ${t.value};`) }, [createBaseVNode("div", w2, [c.value ? (openBlock(), createElementBlock("span", x2, [renderSlot(m.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(m.prefix), 1)], true)])) : createCommentVNode("", true), m.keyboard ? withDirectives((openBlock(), createElementBlock("input", mergeProps({ key: 1, autocomplete: "off", class: "u-input-number", onChange: h3, "onUpdate:modelValue": y[0] || (y[0] = (f) => s.value = f), onKeydown: [y[1] || (y[1] = withKeys(withModifiers(() => {
  }, ["prevent"]), ["up"])), M] }, m.$attrs), null, 16)), [[vModelDynamic, s.value]]) : withDirectives((openBlock(), createElementBlock("input", mergeProps({ key: 2, autocomplete: "off", class: "u-input-number", onChange: h3, "onUpdate:modelValue": y[2] || (y[2] = (f) => s.value = f) }, m.$attrs), null, 16)), [[vModelDynamic, s.value]])]), createBaseVNode("div", M2, [createBaseVNode("span", { class: normalizeClass(["u-up-arrow", { disabled: (m.value || 0) >= m.max }]), onClick: w }, z2, 2), createBaseVNode("span", { class: normalizeClass(["u-down-arrow", { disabled: (m.value || 0) <= m.min }]), onClick: i }, _2, 2)])], 4));
} });
var xa = V(C2, [["__scopeId", "data-v-d152c72b"]]);
xa.install = (l) => {
  l.component(xa.__name, xa);
};
var Ze2 = (l) => (pushScopeId("data-v-94d4249f"), l = l(), popScopeId(), l);
var $2 = ["onMouseenter", "onMouseleave"];
var B2 = [Ze2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var F2 = [Ze2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var S2 = [Ze2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var L2 = [Ze2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var A2 = [Ze2(() => createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" }, null, -1))];
var D2 = { class: "u-content" };
var Ee = ((l) => (l.info = "#1677FF", l.success = "#52c41a", l.error = "#ff4d4f", l.warning = "#faad14", l.loading = "#1677FF", l))(Ee || {});
var Ye = V(defineComponent({ __name: "Message", props: { duration: { default: 3e3 }, top: { default: 30 } }, emits: ["close"], setup(l, { expose: a, emit: e }) {
  const t = l, u = ref(), r = ref([]), c = ref([]), s = ref([]), p = computed(() => typeof t.top == "number" ? t.top + "px" : t.top), n = computed(() => r.value.every((w) => !w));
  function h3() {
    be2(u.value);
    const w = s.value.length - 1;
    r.value[w] = true, M(w);
  }
  watch(n, (w, i) => {
    !i && w && (u.value = ue(() => {
      s.value.splice(0), r.value.splice(0);
    }, 300));
  }), a({ info: function(w) {
    s.value.push({ content: w, mode: "info" }), h3();
  }, success: function(w) {
    s.value.push({ content: w, mode: "success" }), h3();
  }, error: function(w) {
    s.value.push({ content: w, mode: "error" }), h3();
  }, warning: function(w) {
    s.value.push({ content: w, mode: "warning" }), h3();
  }, loading: function(w) {
    s.value.push({ content: w, mode: "loading" }), h3();
  } });
  const k = e;
  function M(w) {
    c.value[w] = ue(() => {
      r.value[w] = false, k("close");
    }, t.duration);
  }
  return (w, i) => (openBlock(), createElementBlock("div", { class: "m-message-wrap", style: normalizeStyle(`top: ${p.value};`) }, [createVNode(TransitionGroup, { name: "slide-fade" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (b, m) => withDirectives((openBlock(), createElementBlock("div", { class: "m-message", key: m }, [createBaseVNode("div", { class: "m-message-content", onMouseenter: (y) => function(f) {
    be2(c.value[f]);
  }(m), onMouseleave: (y) => function(f) {
    M(f);
  }(m) }, [b.mode === "info" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-svg", style: normalizeStyle({ fill: Ee[b.mode] }), viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true", focusable: "false" }, B2, 4)) : createCommentVNode("", true), b.mode === "success" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-svg", style: normalizeStyle({ fill: Ee[b.mode] }), viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true", focusable: "false" }, F2, 4)) : createCommentVNode("", true), b.mode === "error" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-svg", style: normalizeStyle({ fill: Ee[b.mode] }), viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true", focusable: "false" }, S2, 4)) : createCommentVNode("", true), b.mode === "warning" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-svg", style: normalizeStyle({ fill: Ee[b.mode] }), viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true", focusable: "false" }, L2, 4)) : createCommentVNode("", true), b.mode === "loading" ? (openBlock(), createElementBlock("svg", { key: 4, class: "u-svg circular", style: normalizeStyle({ stroke: Ee[b.mode] }), viewBox: "0 0 50 50", focusable: "false" }, A2, 4)) : createCommentVNode("", true), createBaseVNode("p", D2, toDisplayString(b.content), 1)], 40, $2)])), [[vShow, r.value[m]]])), 128))]), _: 1 })], 4));
} }), [["__scopeId", "data-v-94d4249f"]]);
Ye.install = (l) => {
  l.component(Ye.__name, Ye);
};
var Ie2 = (l) => (pushScopeId("data-v-7209d377"), l = l(), popScopeId(), l);
var E2 = { class: "m-modal-root" };
var H2 = { class: "m-modal-mask" };
var I2 = { class: "m-body" };
var T2 = { class: "m-title" };
var j2 = { key: 0, focusable: "false", class: "u-icon confirm", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var V2 = [Ie2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), Ie2(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var R2 = { key: 1, focusable: "false", class: "u-icon info", "data-icon": "info-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var W2 = [Ie2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var N2 = { key: 2, focusable: "false", class: "u-icon success", "data-icon": "check-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var O2 = [Ie2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var q2 = { key: 3, focusable: "false", class: "u-icon error", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var P2 = [Ie2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var Y2 = { key: 4, focusable: "false", class: "u-icon warning", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var U2 = [Ie2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var K2 = { class: "u-title" };
var Z2 = { class: "u-content" };
var G2 = { class: "m-btns" };
var Ma2 = V(defineComponent({ __name: "Modal", props: { width: { default: 420 }, cancelText: { default: "取消" }, okText: { default: "确定" }, noticeText: { default: "知道了" }, center: { type: Boolean, default: true }, top: { default: 100 }, loading: { type: Boolean, default: false }, visible: { type: Boolean, default: false } }, emits: ["cancel", "ok", "know"], setup(l, { expose: a, emit: e }) {
  const t = ref(""), u = ref();
  a({ info: function(h3) {
    t.value = "info", u.value = h3;
  }, success: function(h3) {
    t.value = "success", u.value = h3;
  }, error: function(h3) {
    t.value = "error", u.value = h3;
  }, warning: function(h3) {
    t.value = "warning", u.value = h3;
  }, confirm: function(h3) {
    t.value = "confirm", u.value = h3;
  }, erase: function(h3) {
    t.value = "erase", u.value = h3;
  } });
  const r = e;
  function c() {
    r("cancel");
  }
  function s() {
    r("cancel");
  }
  function p() {
    r("ok");
  }
  function n() {
    r("know");
  }
  return (h3, k) => (openBlock(), createElementBlock("div", E2, [createVNode(Transition, { name: "mask" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", H2, null, 512), [[vShow, h3.visible]])]), _: 1 }), createVNode(Transition, null, { default: withCtx(() => {
    var M, w;
    return [withDirectives(createBaseVNode("div", { class: "m-modal-wrap", onClick: withModifiers(c, ["self"]) }, [createBaseVNode("div", { class: normalizeClass(["m-modal", h3.center ? "relative-hv-center" : "top-center"]), style: normalizeStyle(`width: ${h3.width}px; top: ${h3.center ? "50%" : h3.top + "px"};`) }, [createBaseVNode("div", { class: normalizeClass(["m-modal-body", { loading: h3.loading }]) }, [createVNode(unref(ce), { class: "u-spin", spinning: h3.loading, size: "small" }, null, 8, ["spinning"]), createBaseVNode("div", I2, [createBaseVNode("div", T2, [t.value === "confirm" || t.value === "erase" ? (openBlock(), createElementBlock("svg", j2, V2)) : createCommentVNode("", true), t.value === "info" ? (openBlock(), createElementBlock("svg", R2, W2)) : createCommentVNode("", true), t.value === "success" ? (openBlock(), createElementBlock("svg", N2, O2)) : createCommentVNode("", true), t.value === "error" ? (openBlock(), createElementBlock("svg", q2, P2)) : createCommentVNode("", true), t.value === "warning" ? (openBlock(), createElementBlock("svg", Y2, U2)) : createCommentVNode("", true), createBaseVNode("div", K2, toDisplayString((M = u.value) == null ? void 0 : M.title), 1)]), createBaseVNode("div", Z2, toDisplayString((w = u.value) == null ? void 0 : w.content), 1)]), createBaseVNode("div", G2, [t.value === "confirm" || t.value === "erase" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(unref(Me), { class: "mr8", onClick: s }, { default: withCtx(() => [createTextVNode(toDisplayString(h3.cancelText), 1)]), _: 1 }), t.value === "confirm" ? (openBlock(), createBlock(unref(Me), { key: 0, type: "primary", onClick: p }, { default: withCtx(() => [createTextVNode(toDisplayString(h3.okText), 1)]), _: 1 })) : createCommentVNode("", true), t.value === "erase" ? (openBlock(), createBlock(unref(Me), { key: 1, type: "danger", onClick: p }, { default: withCtx(() => [createTextVNode(toDisplayString(h3.okText), 1)]), _: 1 })) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), ["info", "success", "error", "warning"].includes(t.value) ? (openBlock(), createBlock(unref(Me), { key: 1, type: "primary", onClick: n }, { default: withCtx(() => [createTextVNode(toDisplayString(h3.noticeText), 1)]), _: 1 })) : createCommentVNode("", true)])], 2)], 6)], 512), [[vShow, h3.visible]])];
  }), _: 1 })]));
} }), [["__scopeId", "data-v-7209d377"]]);
Ma2.install = (l) => {
  l.component(Ma2.__name, Ma2);
};
var $e = (l) => (pushScopeId("data-v-c4bfb0a2"), l = l(), popScopeId(), l);
var J2 = ["onMouseenter", "onMouseleave"];
var X2 = { class: "m-notification-content" };
var Q2 = [$e(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), $e(() => createBaseVNode("path", { d: "M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1))];
var e0 = [$e(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1)), $e(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var a0 = [$e(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), $e(() => createBaseVNode("path", { d: "M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var l0 = [$e(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1)), $e(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var t0 = ["onClick"];
var o0 = [$e(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var Oe2 = ((l) => (l.info = "#1677FF", l.success = "#52c41a", l.error = "#ff4d4f", l.warning = "#faad14", l))(Oe2 || {});
var za2 = V(defineComponent({ __name: "Notification", props: { message: { default: "温馨提示" }, duration: { default: 4500 }, top: { default: 24 }, bottom: { default: 24 }, placement: { default: "topRight" } }, emits: ["close"], setup(l, { expose: a, emit: e }) {
  const t = l, u = ref(), r = ref([]), c = ref([]), s = ref([]), p = ref(t.placement), n = ref(), h3 = computed(() => r.value.length === s.value.length);
  function k() {
    be2(u.value), c.value.push(null);
    const i = s.value.length - 1;
    nextTick(() => {
      n.value[i].style.height = n.value[i].offsetHeight + "px", n.value[i].style.opacity = 1;
    }), s.value[i].placement && (p.value = s.value[i].placement), t.duration && (c.value[i] = ue(() => {
      w(i);
    }, t.duration));
  }
  watch(h3, (i, b) => {
    !b && i && (u.value = ue(() => {
      r.value.splice(0), s.value.splice(0);
    }, 300));
  }), a({ open: function(i) {
    s.value.push({ ...i, mode: "open" }), k();
  }, info: function(i) {
    s.value.push({ ...i, mode: "info" }), k();
  }, success: function(i) {
    s.value.push({ ...i, mode: "success" }), k();
  }, error: function(i) {
    s.value.push({ ...i, mode: "error" }), k();
  }, warning: function(i) {
    s.value.push({ ...i, mode: "warning" }), k();
  } });
  const M = e;
  function w(i) {
    r.value.push(i), M("close");
  }
  return (i, b) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-notification-wrapper", p.value]), style: normalizeStyle(`top: ${["topRight", "topLeft"].includes(p.value) ? i.top : "auto"}px; bottom: ${["bottomRight", "bottomLeft"].includes(p.value) ? i.bottom : ""}px;`) }, [createVNode(TransitionGroup, { name: ["topRight", "bottomRight"].includes(p.value) ? "right" : "left" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (m, y) => withDirectives((openBlock(), createElementBlock("div", { ref_for: true, ref_key: "notification", ref: n, class: "m-notification", onMouseenter: (f) => function(g) {
    be2(c.value[g]), c.value[g] = null;
  }(y), onMouseleave: (f) => function(g) {
    t.duration && (c.value[g] = ue(() => {
      w(g);
    }, t.duration));
  }(y), key: y }, [createBaseVNode("div", X2, [m.mode === "info" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-svg", style: normalizeStyle(`fill: ${Oe2[m.mode]}`), viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true", focusable: "false" }, Q2, 4)) : createCommentVNode("", true), m.mode === "success" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-svg", style: normalizeStyle(`fill: ${Oe2[m.mode]}`), viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true", focusable: "false" }, e0, 4)) : createCommentVNode("", true), m.mode === "warning" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-svg", style: normalizeStyle(`fill: ${Oe2[m.mode]}`), viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true", focusable: "false" }, a0, 4)) : createCommentVNode("", true), m.mode === "error" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-svg", style: normalizeStyle(`fill: ${Oe2[m.mode]}`), viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true", focusable: "false" }, l0, 4)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["u-title", { mb4: m.mode !== "open", ml36: m.mode !== "open" }]) }, toDisplayString(m.message || i.message), 3), createBaseVNode("p", { class: normalizeClass(["u-description", { ml36: m.mode !== "open" }]) }, toDisplayString(m.description || "--"), 3), (openBlock(), createElementBlock("svg", { class: "u-close", onClick: (f) => w(y), viewBox: "64 64 896 896", "data-icon": "close", "aria-hidden": "true", focusable: "false" }, o0, 8, t0))])], 40, J2)), [[vShow, !r.value.includes(y)]])), 128))]), _: 1 }, 8, ["name"])], 6));
} }), [["__scopeId", "data-v-c4bfb0a2"]]);
za2.install = (l) => {
  l.component(za2.__name, za2);
};
var _a = defineComponent({ __name: "NumberAnimation", props: { from: { default: 0 }, to: { default: 1e3 }, duration: { default: 3e3 }, autoplay: { type: Boolean, default: true }, precision: { default: 0 }, prefix: { default: "" }, suffix: { default: "" }, separator: { default: "," }, decimal: { default: "." }, valueStyle: { default: () => ({}) }, transition: { default: "easeInOutCubic" } }, emits: ["started", "finished"], setup(l, { expose: a, emit: e }) {
  const t = l, u = ref(t.from);
  watchEffect(() => {
    u.value = t.from;
  }), watch([() => t.from, () => t.to], () => {
    t.autoplay && c();
  }), onMounted(() => {
    t.autoplay && c();
  });
  const r = useTransition(u, { duration: t.duration, transition: TransitionPresets[t.transition], onFinished: () => p("finished"), onStarted: () => p("started") });
  function c() {
    u.value = t.to;
  }
  const s = computed(() => function(n) {
    const { precision: h3, decimal: k, separator: M, suffix: w, prefix: i } = t;
    if (n === 0)
      return n.toFixed(h3);
    if (!n)
      return "";
    n = Number(n).toFixed(h3);
    const b = (n += "").split(".");
    let m = b[0];
    const y = b.length > 1 ? k + b[1] : "", f = /(\d+)(\d{3})/;
    if (M && (g = M, Object.prototype.toString.call(g) !== "[object Number]"))
      for (; f.test(m); )
        m = m.replace(f, "$1" + M + "$2");
    var g;
    return i + m + y + w;
  }(r.value)), p = e;
  return a({ play: c }), (n, h3) => (openBlock(), createElementBlock("span", { style: normalizeStyle(n.valueStyle) }, toDisplayString(s.value), 5));
} });
_a.install = (l) => {
  l.component(_a.__name, _a);
};
var Te = (l) => (pushScopeId("data-v-80b1a1f1"), l = l(), popScopeId(), l);
var s0 = { class: "m-pagination-wrap" };
var n0 = { key: 0, class: "mr8" };
var i0 = [Te(() => createBaseVNode("svg", { class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "left", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })], -1))];
var u0 = [Te(() => createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1)), Te(() => createBaseVNode("svg", { class: "u-icon", viewBox: "64 64 896 896", "data-icon": "double-left", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" })], -1))];
var c0 = ["onClick"];
var d0 = [Te(() => createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1)), Te(() => createBaseVNode("svg", { class: "u-icon", viewBox: "64 64 896 896", "data-icon": "double-right", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" })], -1))];
var r0 = [Te(() => createBaseVNode("svg", { class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "right", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })], -1))];
var v0 = { key: 1, class: "u-jump-page" };
var Ue = V(defineComponent({ __name: "Pagination", props: { current: { default: 1 }, pageSize: { default: 10 }, total: { default: 0 }, pageListNum: { default: 5 }, hideOnSinglePage: { type: Boolean, default: false }, showQuickJumper: { type: Boolean, default: false }, showTotal: { type: Boolean, default: false }, placement: { default: "center" } }, emits: ["change"], setup(l, { emit: a }) {
  const e = l, t = ref(e.current), u = ref(""), r = ref(false), c = ref(false), s = ref(false), p = ref(false), n = computed(() => Math.ceil(e.total / e.pageSize)), h3 = computed(() => function(b) {
    var m = [], y = Math.floor(e.pageListNum / 2), f = { start: b - y, end: b + y };
    f.start < 1 && (f.end = f.end + (1 - f.start), f.start = 1), f.end > n.value && (f.start = f.start - (f.end - n.value), f.end = n.value), f.start < 1 && (f.start = 1), f.start > 1 ? r.value = true : r.value = false, f.end < n.value ? c.value = true : c.value = false;
    for (let g = f.start; g <= f.end; g++)
      m.push(g);
    return m;
  }(t.value).filter((b) => b !== 1 && b !== n.value)), k = a;
  function M() {
    t.value = t.value - e.pageListNum > 0 ? t.value - e.pageListNum : 1;
  }
  function w() {
    t.value = t.value + e.pageListNum < n.value ? t.value + e.pageListNum : n.value;
  }
  function i(b) {
    if (b === 0 || b === n.value + 1)
      return false;
    t.value !== b && (t.value = b);
  }
  return watch(t, (b) => {
    console.log("change:", b), k("change", { page: b, pageSize: e.pageSize });
  }), onMounted(() => {
    document.onkeydown = (b) => {
      b && b.key === "Enter" && function() {
        var m = Number(u.value);
        Number.isInteger(m) && (m < 1 && (m = 1), m > n.value && (m = n.value), i(m)), u.value = "";
      }();
    };
  }), onUnmounted(() => {
    document.onkeydown = null;
  }), (b, m) => (openBlock(), createElementBlock("div", { class: normalizeClass([`m-pagination ${b.placement}`, { hidden: b.hideOnSinglePage && b.total <= b.pageSize }]) }, [createBaseVNode("div", s0, [b.showTotal ? (openBlock(), createElementBlock("span", n0, "共 " + toDisplayString(n.value) + " 页 / " + toDisplayString(b.total) + " 条", 1)) : createCommentVNode("", true), createBaseVNode("span", { class: normalizeClass(["u-item", { disabled: t.value === 1 }]), onClick: m[0] || (m[0] = (y) => i(t.value - 1)) }, i0, 2), createBaseVNode("span", { class: normalizeClass(["u-item", { active: t.value === 1 }]), onClick: m[1] || (m[1] = (y) => i(1)) }, "1", 2), withDirectives(createBaseVNode("span", { class: "m-arrow", ref: "forward", onClick: M, onMouseenter: m[2] || (m[2] = (y) => s.value = true), onMouseleave: m[3] || (m[3] = (y) => s.value = false) }, u0, 544), [[vShow, r.value && h3.value[0] - 1 > 1]]), (openBlock(true), createElementBlock(Fragment, null, renderList(h3.value, (y, f) => (openBlock(), createElementBlock("span", { class: normalizeClass(["u-item", { active: t.value === y }]), key: f, onClick: (g) => i(y) }, toDisplayString(y), 11, c0))), 128)), withDirectives(createBaseVNode("span", { class: "m-arrow", ref: "backward", onClick: w, onMouseenter: m[4] || (m[4] = (y) => p.value = true), onMouseleave: m[5] || (m[5] = (y) => p.value = false) }, d0, 544), [[vShow, c.value && h3.value[h3.value.length - 1] + 1 < n.value]]), withDirectives(createBaseVNode("span", { class: normalizeClass(["u-item", { active: t.value === n.value }]), onClick: m[6] || (m[6] = (y) => i(n.value)) }, toDisplayString(n.value), 3), [[vShow, n.value !== 1]]), createBaseVNode("span", { class: normalizeClass(["u-item", { disabled: t.value === n.value }]), onClick: m[7] || (m[7] = (y) => i(t.value + 1)) }, r0, 2), b.showQuickJumper ? (openBlock(), createElementBlock("span", v0, [createTextVNode("跳至"), withDirectives(createBaseVNode("input", { type: "text", "onUpdate:modelValue": m[8] || (m[8] = (y) => u.value = y) }, null, 512), [[vModelText, u.value]]), createTextVNode("页")])) : createCommentVNode("", true)])], 2));
} }), [["__scopeId", "data-v-80b1a1f1"]]);
Ue.install = (l) => {
  l.component(Ue.__name, Ue);
};
var Ge2 = (l) => (pushScopeId("data-v-dccfd6e1"), l = l(), popScopeId(), l);
var p0 = { class: "m-popconfirm" };
var f0 = { class: "m-pop" };
var h0 = { class: "m-pop-message" };
var m0 = { class: "m-icon" };
var g0 = { key: 0, focusable: "false", class: "u-icon", width: "1em", height: "1em", viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true" };
var y0 = [Ge2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var b0 = { key: 1, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#52c41a" }, viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true" };
var k0 = [Ge2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var w0 = { key: 2, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#ff4d4f" }, viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true" };
var x0 = [Ge2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var M0 = { key: 3, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#faad14" }, viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true" };
var z0 = [Ge2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var _0 = { key: 0, class: "m-pop-description" };
var C0 = { class: "m-pop-buttons" };
var $0 = Ge2(() => createBaseVNode("div", { class: "m-pop-arrow" }, [createBaseVNode("span", { class: "u-pop-arrow" })], -1));
var Ca2 = V(defineComponent({ __name: "Popconfirm", props: { title: { default: "" }, description: { default: "" }, content: { default: "" }, icon: { default: "" }, iconType: { default: "warning" }, maxWidth: { default: "auto" }, cancelText: { default: "取消" }, cancelType: { default: "default" }, okText: { default: "确定" }, okType: { default: "primary" }, showCancel: { type: Boolean, default: true } }, emits: ["cancel", "ok", "openChange"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth), u = useSlots(), r = computed(() => {
    var g;
    const f = (g = u.description) == null ? void 0 : g.call(u);
    return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e.description;
  }), c = ref(false), s = ref(0), p = ref(0), n = ref(), h3 = ref(), k = ref(false);
  function M() {
    k.value = false;
  }
  function w() {
    k.value = true, h3.value.focus();
  }
  const i = a;
  function b() {
    c.value = !c.value, c.value && function() {
      const f = n.value.offsetWidth, g = h3.value.offsetWidth, z = h3.value.offsetHeight;
      s.value = z + 4, p.value = (g - f) / 2;
    }(), i("openChange", c.value);
  }
  function m(f) {
    c.value = false, i("openChange", false), i("cancel", f);
  }
  function y(f) {
    c.value = false, i("openChange", false), i("ok", f);
  }
  return (f, g) => {
    const z = resolveComponent("Button");
    return openBlock(), createElementBlock("div", p0, [createBaseVNode("div", { ref_key: "popRef", ref: h3, tabindex: "1", class: normalizeClass(["m-pop-content", { "show-pop": c.value }]), style: normalizeStyle(`max-width: ${t.value}; top: ${-s.value}px; left: ${-p.value}px;`), onBlur: g[0] || (g[0] = ($) => k.value ? (c.value = false, void i("openChange", false)) : () => false) }, [createBaseVNode("div", f0, [createBaseVNode("div", h0, [createBaseVNode("span", m0, [renderSlot(f.$slots, "icon", {}, () => [f.iconType === "info" ? (openBlock(), createElementBlock("svg", g0, y0)) : createCommentVNode("", true), f.iconType === "success" ? (openBlock(), createElementBlock("svg", b0, k0)) : createCommentVNode("", true), f.iconType === "error" ? (openBlock(), createElementBlock("svg", w0, x0)) : createCommentVNode("", true), f.iconType === "warning" ? (openBlock(), createElementBlock("svg", M0, z0)) : createCommentVNode("", true)], true)]), createBaseVNode("div", { class: normalizeClass(["m-title", { "font-weight": r.value }]) }, [renderSlot(f.$slots, "title", {}, () => [createTextVNode(toDisplayString(f.title), 1)], true)], 2)]), r.value ? (openBlock(), createElementBlock("div", _0, [renderSlot(f.$slots, "description", {}, () => [createTextVNode(toDisplayString(f.description), 1)], true)])) : createCommentVNode("", true), createBaseVNode("div", C0, [f.showCancel ? (openBlock(), createBlock(z, { key: 0, onClick: m, size: "small", type: f.cancelType }, { default: withCtx(() => [createTextVNode(toDisplayString(f.cancelText), 1)]), _: 1 }, 8, ["type"])) : createCommentVNode("", true), createVNode(z, { onClick: y, size: "small", type: f.okType }, { default: withCtx(() => [createTextVNode(toDisplayString(f.okText), 1)]), _: 1 }, 8, ["type"])])]), $0], 38), createBaseVNode("div", { ref_key: "contentRef", ref: n, onClick: b, onMouseenter: M, onMouseleave: w }, [renderSlot(f.$slots, "default", {}, () => [createTextVNode(toDisplayString(f.content), 1)], true)], 544)]);
  };
} }), [["__scopeId", "data-v-dccfd6e1"]]);
Ca2.install = (l) => {
  l.component(Ca2.__name, Ca2);
};
var B0 = { class: "m-title" };
var F0 = { class: "m-content" };
var S0 = ((l) => (pushScopeId("data-v-e14f6c1e"), l = l(), popScopeId(), l))(() => createBaseVNode("div", { class: "m-pop-arrow" }, [createBaseVNode("span", { class: "u-pop-arrow" })], -1));
var $a2 = V(defineComponent({ __name: "Popover", props: { title: { default: "" }, content: { default: "" }, maxWidth: { default: "auto" }, trigger: { default: "hover" }, overlayStyle: { default: () => ({}) } }, emits: ["openChange"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth), u = ref(false), r = ref(0), c = ref(0), s = ref(), p = ref();
  function n() {
    const b = s.value.offsetWidth, m = p.value.offsetWidth, y = p.value.offsetHeight;
    r.value = y + 4, c.value = (m - b) / 2;
  }
  const h3 = a, k = ref();
  function M() {
    n(), be2(k.value), u.value = true, h3("openChange", u.value);
  }
  function w() {
    k.value = ue(() => {
      u.value = false, h3("openChange", u.value);
    }, 100);
  }
  const i = ref(false);
  return (b, m) => (openBlock(), createElementBlock("div", { class: "m-popover", onMouseenter: m[6] || (m[6] = (y) => b.trigger === "hover" ? M() : () => false), onMouseleave: m[7] || (m[7] = (y) => b.trigger === "hover" ? w() : () => false) }, [createBaseVNode("div", { ref_key: "popRef", ref: p, tabindex: "1", class: normalizeClass(["m-pop-content", { "show-pop": u.value }]), style: normalizeStyle(`max-width: ${t.value}; top: ${-r.value}px; left: ${-c.value}px;`), onBlur: m[0] || (m[0] = (y) => b.trigger === "click" && i.value ? (u.value = false, void h3("openChange", false)) : () => false), onMouseenter: m[1] || (m[1] = (y) => b.trigger === "hover" ? M() : () => false), onMouseleave: m[2] || (m[2] = (y) => b.trigger === "hover" ? w() : () => false) }, [createBaseVNode("div", { class: "m-pop", style: normalizeStyle(b.overlayStyle) }, [createBaseVNode("div", B0, [renderSlot(b.$slots, "title", {}, () => [createTextVNode(toDisplayString(b.title), 1)], true)]), createBaseVNode("div", F0, [renderSlot(b.$slots, "content", {}, () => [createTextVNode(toDisplayString(b.content), 1)], true)])], 4), S0], 38), createBaseVNode("div", { ref_key: "defaultRef", ref: s, onClick: m[3] || (m[3] = (y) => b.trigger === "click" ? (u.value = !u.value, u.value && n(), void h3("openChange", u.value)) : () => false), onMouseenter: m[4] || (m[4] = (y) => b.trigger === "click" ? void (i.value = false) : () => false), onMouseleave: m[5] || (m[5] = (y) => b.trigger === "click" ? (i.value = true, void p.value.focus()) : () => false) }, [renderSlot(b.$slots, "default", {}, void 0, true)], 544)], 32));
} }), [["__scopeId", "data-v-e14f6c1e"]]);
$a2.install = (l) => {
  l.component($a2.__name, $a2);
};
var h1 = (l) => (pushScopeId("data-v-bd17e19a"), l = l(), popScopeId(), l);
var L0 = { class: "m-progress-inner" };
var A0 = { key: 0, class: "m-success" };
var D0 = [h1(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" })], -1))];
var E0 = { key: 1, class: "u-progress-text" };
var H0 = { class: "u-progress-circle", viewBox: "0 0 100 100" };
var I0 = ["d", "stroke-width"];
var T0 = ["d", "stroke-width", "stroke", "opacity"];
var j0 = { key: 0, class: "u-icon", focusable: "false", "data-icon": "check", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var V0 = [h1(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1))];
var R0 = { key: 1, class: "u-progress-text" };
var Ba2 = V(defineComponent({ __name: "Progress", props: { width: { default: "100%" }, percent: { default: 0 }, strokeColor: { default: "#1677FF" }, strokeWidth: { default: 8 }, showInfo: { type: Boolean, default: true }, format: { type: Function, default: (l) => l + "%" }, type: { default: "line" } }, setup(l) {
  const a = l, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), t = computed(() => (100 - a.strokeWidth) * Math.PI), u = computed(() => {
    const s = 100 - a.strokeWidth;
    return `M 50,50 m 0,-${s / 2}
   a ${s / 2},${s / 2} 0 1 1 0,${s}
   a ${s / 2},${s / 2} 0 1 1 0,-${s}`;
  }), r = computed(() => typeof a.strokeColor == "string" ? a.strokeColor : `linear-gradient(to ${a.strokeColor.direction || "right"}, ${a.strokeColor["0%"] || a.strokeColor.from}, ${a.strokeColor["100%"] || a.strokeColor.to})`), c = computed(() => a.format(a.percent > 100 ? 100 : a.percent));
  return (s, p) => s.type === "line" ? (openBlock(), createElementBlock("div", { key: 0, class: "m-progress-line", style: normalizeStyle(`width: ${e.value}; height: ${s.strokeWidth < 24 ? 24 : s.strokeWidth}px;`) }, [createBaseVNode("div", L0, [createBaseVNode("div", { class: normalizeClass(["u-progress-bg", { "u-success-bg": s.percent >= 100 }]), style: normalizeStyle(`background: ${r.value}; width: ${s.percent >= 100 ? 100 : s.percent}%; height: ${s.strokeWidth}px;`) }, null, 6)]), s.showInfo ? (openBlock(), createBlock(Transition, { key: 0, mode: "out-in" }, { default: withCtx(() => [s.percent >= 100 ? (openBlock(), createElementBlock("span", A0, D0)) : (openBlock(), createElementBlock("p", E0, [renderSlot(s.$slots, "format", { percent: s.percent }, () => [createTextVNode(toDisplayString(c.value), 1)], true)]))]), _: 3 })) : createCommentVNode("", true)], 4)) : (openBlock(), createElementBlock("div", { key: 1, class: "m-progress-circle", style: normalizeStyle(`width: ${e.value}; height: ${e.value};`) }, [(openBlock(), createElementBlock("svg", H0, [createBaseVNode("path", { d: u.value, "stroke-linecap": "round", class: "u-progress-circle-trail", "stroke-width": s.strokeWidth, style: normalizeStyle(`stroke-dasharray: ${t.value}px, ${t.value}px;`), "fill-opacity": "0" }, null, 12, I0), createBaseVNode("path", { d: u.value, "stroke-linecap": "round", class: normalizeClass(["u-progress-circle-path", { success: s.percent >= 100 }]), "stroke-width": s.strokeWidth, stroke: r.value, style: normalizeStyle(`stroke-dasharray: ${s.percent / 100 * t.value}px, ${t.value}px;`), opacity: s.percent === 0 ? 0 : 1, "fill-opacity": "0" }, null, 14, T0)])), s.showInfo ? (openBlock(), createBlock(Transition, { key: 0, mode: "out-in" }, { default: withCtx(() => [s.percent >= 100 ? (openBlock(), createElementBlock("svg", j0, V0)) : (openBlock(), createElementBlock("p", R0, [renderSlot(s.$slots, "format", { percent: s.percent }, () => [createTextVNode(toDisplayString(c.value), 1)], true)]))]), _: 3 })) : createCommentVNode("", true)], 4));
} }), [["__scopeId", "data-v-bd17e19a"]]);
Ba2.install = (l) => {
  l.component(Ba2.__name, Ba2);
};
var W0 = ["src"];
var Fa2 = V(defineComponent({ __name: "QRCode", props: { value: { default: "" }, size: { default: 160 }, color: { default: "#000" }, bgColor: { default: "#FFF" }, bordered: { type: Boolean, default: true }, borderColor: { default: "#0505050f" }, scale: { default: 8 }, errorLevel: { default: "H" } }, setup(l) {
  const a = l, e = computed(() => useQRCode(a.value, { errorCorrectionLevel: a.errorLevel, type: "image/png", quality: 1, margin: 3, scale: a.scale, color: { dark: a.color, light: a.bgColor } }));
  return (t, u) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-qrcode", { bordered: t.bordered }]), style: normalizeStyle(`width: ${t.size}px; height: ${t.size}px; border-color: ${t.borderColor};`) }, [createBaseVNode("img", { src: e.value.value, class: "u-qrcode", alt: "QRCode" }, null, 8, W0)], 6));
} }), [["__scopeId", "data-v-dc8d00cb"]]);
Fa2.install = (l) => {
  l.component(Fa2.__name, Fa2);
};
var N0 = ["onClick"];
var O0 = { class: "u-label" };
var q0 = ["onClick"];
var P0 = { class: "u-label" };
var Sa2 = V(defineComponent({ __name: "Radio", props: { options: { default: () => [] }, disabled: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, value: { default: null }, gap: { default: 8 }, button: { type: Boolean, default: false }, buttonStyle: { default: "outline" } }, emits: ["update:value", "change"], setup(l, { emit: a }) {
  const e = l, t = computed(() => e.options.length), u = computed(() => e.vertical ? { marginBottom: e.gap + "px" } : { marginRight: e.gap + "px" }), r = a;
  function c(s) {
    s !== e.value && (r("update:value", s), r("change", s));
  }
  return (s, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio", { "m-radio-button-solid": s.buttonStyle === "solid" }]) }, [s.button ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(s.options, (n, h3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio-button-wrap", { "m-radio-button-checked": s.value === n.value, "m-radio-button-disabled": s.disabled || n.disabled }]), key: h3, onClick: (k) => s.disabled || n.disabled ? () => false : c(n.value) }, [createBaseVNode("span", P0, [renderSlot(s.$slots, "default", { label: n.label }, () => [createTextVNode(toDisplayString(n.label), 1)], true)])], 10, q0))), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(s.options, (n, h3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio-wrap", { vertical: s.vertical }]), style: normalizeStyle(t.value !== h3 + 1 ? u.value : ""), key: h3 }, [createBaseVNode("div", { class: normalizeClass(["m-box", { "m-radio-disabled": s.disabled || n.disabled }]), onClick: (k) => s.disabled || n.disabled ? () => false : c(n.value) }, [createBaseVNode("span", { class: normalizeClass(["u-radio", { "u-radio-checked": s.value === n.value }]) }, null, 2), createBaseVNode("span", O0, [renderSlot(s.$slots, "default", { label: n.label }, () => [createTextVNode(toDisplayString(n.label), 1)], true)])], 10, N0)], 6))), 128))], 2));
} }), [["__scopeId", "data-v-5a3af575"]]);
Sa2.install = (l) => {
  l.component(Sa2.__name, Sa2);
};
var Be2 = (l) => (pushScopeId("data-v-3840d4df"), l = l(), popScopeId(), l);
var Y0 = ["onClick"];
var U0 = ["onClick", "onMouseenter"];
var K0 = [Be2(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1))];
var Z0 = [Be2(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1))];
var G0 = [Be2(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1))];
var J0 = [Be2(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1))];
var X0 = ["onClick", "onMouseenter"];
var Q0 = [Be2(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1))];
var e4 = [Be2(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1))];
var a4 = [Be2(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1))];
var l4 = [Be2(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1))];
var La2 = V(defineComponent({ __name: "Rate", props: { allowClear: { type: Boolean, default: true }, allowHalf: { type: Boolean, default: false }, count: { default: 5 }, character: { default: "star-filled" }, size: { default: 20 }, color: { default: "#fadb14" }, gap: { default: 8 }, disabled: { type: Boolean, default: false }, value: { default: 0 } }, emits: ["update:value", "change", "hoverChange"], setup(l, { emit: a }) {
  const e = l, t = ref(e.value), u = ref();
  watch(() => e.value, (n) => {
    t.value = n;
  });
  const r = a;
  function c(n) {
    u.value = null, n !== e.value ? (r("change", n), r("update:value", n)) : e.allowClear ? (u.value = n, r("change", 0), r("update:value", 0)) : r("change", n);
  }
  function s() {
    u.value = null;
  }
  function p() {
    t.value = e.value;
  }
  return (n, h3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-rate", { disabled: n.disabled }]), style: normalizeStyle(`--color: ${n.color};`), onMouseleave: p }, [(openBlock(true), createElementBlock(Fragment, null, renderList(n.count, (k) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-star", { "u-star-half": n.allowHalf && t.value >= k - 0.5 && t.value < k, "u-star-full": t.value >= k, "temp-gray": !n.allowHalf && u.value === k }]), style: normalizeStyle(`margin-right: ${k !== n.count ? n.gap : 0}px;`), onClick: (M) => n.allowHalf ? void M.preventDefault() : c(k), key: k }, [n.allowHalf ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["u-star-first", { "temp-gray-first": u.value === k - 0.5 }]), onClick: withModifiers((M) => c(k - 0.5), ["stop"]), onMouseenter: (M) => {
    return w = k - 0.5, t.value = w, void r("hoverChange", w);
    var w;
  }, onMouseleave: s }, [n.character === "star-filled" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-star", style: normalizeStyle(`width: ${n.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, K0, 4)) : n.character === "star-outlined" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-star", style: normalizeStyle(`width: ${n.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, Z0, 4)) : n.character === "heart-filled" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-star", style: normalizeStyle(`width: ${n.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, G0, 4)) : n.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-star", style: normalizeStyle(`width: ${n.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, J0, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-star", style: normalizeStyle(`font-size: ${0.66 * n.size}px; height: ${n.size}px;`) }, [renderSlot(n.$slots, "character", {}, () => [createTextVNode(toDisplayString(n.character), 1)], true)], 4))], 42, U0)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["u-star-second", { "temp-gray-second": u.value === k }]), onClick: withModifiers((M) => c(k), ["stop"]), onMouseenter: (M) => {
    return w = k, t.value = w, void r("hoverChange", w);
    var w;
  }, onMouseleave: s }, [n.character === "star-filled" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-star", style: normalizeStyle(`width: ${n.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, Q0, 4)) : n.character === "star-outlined" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-star", style: normalizeStyle(`width: ${n.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, e4, 4)) : n.character === "heart-filled" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-star", style: normalizeStyle(`width: ${n.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, a4, 4)) : n.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-star", style: normalizeStyle(`width: ${n.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, l4, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-star", style: normalizeStyle(`font-size: ${0.66 * n.size}px; height: ${n.size}px;`) }, [renderSlot(n.$slots, "character", {}, () => [createTextVNode(toDisplayString(n.character), 1)], true)], 4))], 42, X0)], 14, Y0))), 128))], 38));
} }), [["__scopeId", "data-v-3840d4df"]]);
La2.install = (l) => {
  l.component(La2.__name, La2);
};
var Ja = (l) => (pushScopeId("data-v-3aeb057e"), l = l(), popScopeId(), l);
var t4 = { class: "m-result" };
var o4 = { class: "m-image" };
var s4 = { key: 0, focusable: "false", class: "u-svg", style: "fill: #1677ff;", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var n4 = [Ja(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var i4 = { key: 1, focusable: "false", class: "u-svg", style: "fill: #52c41a;", "data-icon": "check-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var u4 = [Ja(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var c4 = { key: 2, focusable: "false", class: "u-svg", style: "fill: #faad14;", "data-icon": "warning", "aria-hidden": "true", viewBox: "64 64 896 896" };
var d4 = [Ja(() => createBaseVNode("path", { d: "M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var r4 = { key: 3, focusable: "false", class: "u-svg", style: "fill: #ff4d4f;", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var v4 = [Ja(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var p4 = { key: 4, class: "u-image", width: "251", height: "294" };
var f4 = [createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-3aeb057e><path d="M0 129.023v-2.084C0 58.364 55.591 2.774 124.165 2.774h2.085c68.574 0 124.165 55.59 124.165 124.165v2.084c0 68.575-55.59 124.166-124.165 124.166h-2.085C55.591 253.189 0 197.598 0 129.023" fill="#E4EBF7" data-v-3aeb057e></path><path d="M41.417 132.92a8.231 8.231 0 1 1-16.38-1.65 8.231 8.231 0 0 1 16.38 1.65" fill="#FFF" data-v-3aeb057e></path><path d="M38.652 136.36l10.425 5.91M49.989 148.505l-12.58 10.73" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path d="M41.536 161.28a5.636 5.636 0 1 1-11.216-1.13 5.636 5.636 0 0 1 11.216 1.13M59.154 145.261a5.677 5.677 0 1 1-11.297-1.138 5.677 5.677 0 0 1 11.297 1.138M100.36 29.516l29.66-.013a4.562 4.562 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 0 0 .005 9.126M111.705 47.754l29.659-.013a4.563 4.563 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 1 0 .005 9.126" fill="#FFF" data-v-3aeb057e></path><path d="M114.066 29.503V29.5l15.698-.007a4.563 4.563 0 1 0 .004 9.126l-15.698.007v-.002a4.562 4.562 0 0 0-.004-9.122M185.405 137.723c-.55 5.455-5.418 9.432-10.873 8.882-5.456-.55-9.432-5.418-8.882-10.873.55-5.455 5.418-9.432 10.873-8.882 5.455.55 9.432 5.418 8.882 10.873" fill="#FFF" data-v-3aeb057e></path><path d="M180.17 143.772l12.572 7.129M193.841 158.42L178.67 171.36" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path d="M185.55 171.926a6.798 6.798 0 1 1-13.528-1.363 6.798 6.798 0 0 1 13.527 1.363M204.12 155.285a6.848 6.848 0 1 1-13.627-1.375 6.848 6.848 0 0 1 13.626 1.375" fill="#FFF" data-v-3aeb057e></path><path d="M152.988 194.074a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0zM225.931 118.217a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM217.09 153.051a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.42 0zM177.84 109.842a2.21 2.21 0 1 1-4.422 0 2.21 2.21 0 0 1 4.421 0zM196.114 94.454a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM202.844 182.523a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0z" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path stroke="#FFF" stroke-width="2" d="M215.125 155.262l-1.902 20.075-10.87 5.958M174.601 176.636l-6.322 9.761H156.98l-4.484 6.449M175.874 127.28V111.56M221.51 119.404l-12.77 7.859-15.228-7.86V96.668" data-v-3aeb057e></path><path d="M180.68 29.32C180.68 13.128 193.806 0 210 0c16.193 0 29.32 13.127 29.32 29.32 0 16.194-13.127 29.322-29.32 29.322-16.193 0-29.32-13.128-29.32-29.321" fill="#A26EF4" data-v-3aeb057e></path><path d="M221.45 41.706l-21.563-.125a1.744 1.744 0 0 1-1.734-1.754l.071-12.23a1.744 1.744 0 0 1 1.754-1.734l21.562.125c.964.006 1.74.791 1.735 1.755l-.071 12.229a1.744 1.744 0 0 1-1.754 1.734" fill="#FFF" data-v-3aeb057e></path><path d="M215.106 29.192c-.015 2.577-2.049 4.654-4.543 4.64-2.494-.014-4.504-2.115-4.489-4.693l.04-6.925c.016-2.577 2.05-4.654 4.543-4.64 2.494.015 4.504 2.116 4.49 4.693l-.04 6.925zm-4.53-14.074a6.877 6.877 0 0 0-6.916 6.837l-.043 7.368a6.877 6.877 0 0 0 13.754.08l.042-7.368a6.878 6.878 0 0 0-6.837-6.917zM167.566 68.367h-3.93a4.73 4.73 0 0 1-4.717-4.717 4.73 4.73 0 0 1 4.717-4.717h3.93a4.73 4.73 0 0 1 4.717 4.717 4.73 4.73 0 0 1-4.717 4.717" fill="#FFF" data-v-3aeb057e></path><path d="M168.214 248.838a6.611 6.611 0 0 1-6.61-6.611v-66.108a6.611 6.611 0 0 1 13.221 0v66.108a6.611 6.611 0 0 1-6.61 6.61" fill="#5BA02E" data-v-3aeb057e></path><path d="M176.147 248.176a6.611 6.611 0 0 1-6.61-6.61v-33.054a6.611 6.611 0 1 1 13.221 0v33.053a6.611 6.611 0 0 1-6.61 6.611" fill="#92C110" data-v-3aeb057e></path><path d="M185.994 293.89h-27.376a3.17 3.17 0 0 1-3.17-3.17v-45.887a3.17 3.17 0 0 1 3.17-3.17h27.376a3.17 3.17 0 0 1 3.17 3.17v45.886a3.17 3.17 0 0 1-3.17 3.17" fill="#F2D7AD" data-v-3aeb057e></path><path d="M81.972 147.673s6.377-.927 17.566-1.28c11.729-.371 17.57 1.086 17.57 1.086s3.697-3.855.968-8.424c1.278-12.077 5.982-32.827.335-48.273-1.116-1.339-3.743-1.512-7.536-.62-1.337.315-7.147-.149-7.983-.1l-15.311-.347s-3.487-.17-8.035-.508c-1.512-.113-4.227-1.683-5.458-.338-.406.443-2.425 5.669-1.97 16.077l8.635 35.642s-3.141 3.61 1.219 7.085" fill="#FFF" data-v-3aeb057e></path><path d="M75.768 73.325l-.9-6.397 11.982-6.52s7.302-.118 8.038 1.205c.737 1.324-5.616.993-5.616.993s-1.836 1.388-2.615 2.5c-1.654 2.363-.986 6.471-8.318 5.986-1.708.284-2.57 2.233-2.57 2.233" fill="#FFC6A0" data-v-3aeb057e></path><path d="M52.44 77.672s14.217 9.406 24.973 14.444c1.061.497-2.094 16.183-11.892 11.811-7.436-3.318-20.162-8.44-21.482-14.496-.71-3.258 2.543-7.643 8.401-11.76M141.862 80.113s-6.693 2.999-13.844 6.876c-3.894 2.11-10.137 4.704-12.33 7.988-6.224 9.314 3.536 11.22 12.947 7.503 6.71-2.651 28.999-12.127 13.227-22.367" fill="#FFB594" data-v-3aeb057e></path><path d="M76.166 66.36l3.06 3.881s-2.783 2.67-6.31 5.747c-7.103 6.195-12.803 14.296-15.995 16.44-3.966 2.662-9.754 3.314-12.177-.118-3.553-5.032.464-14.628 31.422-25.95" fill="#FFC6A0" data-v-3aeb057e></path><path d="M64.674 85.116s-2.34 8.413-8.912 14.447c.652.548 18.586 10.51 22.144 10.056 5.238-.669 6.417-18.968 1.145-20.531-.702-.208-5.901-1.286-8.853-2.167-.87-.26-1.611-1.71-3.545-.936l-1.98-.869zM128.362 85.826s5.318 1.956 7.325 13.734c-.546.274-17.55 12.35-21.829 7.805-6.534-6.94-.766-17.393 4.275-18.61 4.646-1.121 5.03-1.37 10.23-2.929" fill="#FFF" data-v-3aeb057e></path><path d="M78.18 94.656s.911 7.41-4.914 13.078" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M87.397 94.68s3.124 2.572 10.263 2.572c7.14 0 9.074-3.437 9.074-3.437" stroke="#E4EBF7" stroke-width=".932" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M117.184 68.639l-6.781-6.177s-5.355-4.314-9.223-.893c-3.867 3.422 4.463 2.083 5.653 4.165 1.19 2.082.848 1.143-2.083.446-5.603-1.331-2.082.893 2.975 5.355 2.091 1.845 6.992.955 6.992.955l2.467-3.851z" fill="#FFC6A0" data-v-3aeb057e></path><path d="M105.282 91.315l-.297-10.937-15.918-.027-.53 10.45c-.026.403.17.788.515.999 2.049 1.251 9.387 5.093 15.799.424.287-.21.443-.554.431-.91" fill="#FFB594" data-v-3aeb057e></path><path d="M107.573 74.24c.817-1.147.982-9.118 1.015-11.928a1.046 1.046 0 0 0-.965-1.055l-4.62-.365c-7.71-1.044-17.071.624-18.253 6.346-5.482 5.813-.421 13.244-.421 13.244s1.963 3.566 4.305 6.791c.756 1.041.398-3.731 3.04-5.929 5.524-4.594 15.899-7.103 15.899-7.103" fill="#5C2552" data-v-3aeb057e></path><path d="M88.426 83.206s2.685 6.202 11.602 6.522c7.82.28 8.973-7.008 7.434-17.505l-.909-5.483c-6.118-2.897-15.478.54-15.478.54s-.576 2.044-.19 5.504c-2.276 2.066-1.824 5.618-1.824 5.618s-.905-1.922-1.98-2.321c-.86-.32-1.897.089-2.322 1.98-1.04 4.632 3.667 5.145 3.667 5.145" fill="#FFC6A0" data-v-3aeb057e></path><path stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" d="M100.843 77.099l1.701-.928-1.015-4.324.674-1.406" data-v-3aeb057e></path><path d="M105.546 74.092c-.022.713-.452 1.279-.96 1.263-.51-.016-.904-.607-.882-1.32.021-.713.452-1.278.96-1.263.51.016.904.607.882 1.32M97.592 74.349c-.022.713-.452 1.278-.961 1.263-.509-.016-.904-.607-.882-1.32.022-.713.452-1.279.961-1.263.51.016.904.606.882 1.32" fill="#552950" data-v-3aeb057e></path><path d="M91.132 86.786s5.269 4.957 12.679 2.327" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M99.776 81.903s-3.592.232-1.44-2.79c1.59-1.496 4.897-.46 4.897-.46s1.156 3.906-3.457 3.25" fill="#DB836E" data-v-3aeb057e></path><path d="M102.88 70.6s2.483.84 3.402.715M93.883 71.975s2.492-1.144 4.778-1.073" stroke="#5C2552" stroke-width="1.526" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M86.32 77.374s.961.879 1.458 2.106c-.377.48-1.033 1.152-.236 1.809M99.337 83.719s1.911.151 2.509-.254" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M87.782 115.821l15.73-3.012M100.165 115.821l10.04-2.008" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M66.508 86.763s-1.598 8.83-6.697 14.078" stroke="#E4EBF7" stroke-width="1.114" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M128.31 87.934s3.013 4.121 4.06 11.785" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M64.09 84.816s-6.03 9.912-13.607 9.903" stroke="#DB836E" stroke-width=".795" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M112.366 65.909l-.142 5.32s5.993 4.472 11.945 9.202c4.482 3.562 8.888 7.455 10.985 8.662 4.804 2.766 8.9 3.355 11.076 1.808 4.071-2.894 4.373-9.878-8.136-15.263-4.271-1.838-16.144-6.36-25.728-9.73" fill="#FFC6A0" data-v-3aeb057e></path><path d="M130.532 85.488s4.588 5.757 11.619 6.214" stroke="#DB836E" stroke-width=".75" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M121.708 105.73s-.393 8.564-1.34 13.612" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M115.784 161.512s-3.57-1.488-2.678-7.14" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M101.52 290.246s4.326 2.057 7.408 1.03c2.842-.948 4.564.673 7.132 1.186 2.57.514 6.925 1.108 11.772-1.269-.104-5.551-6.939-4.01-12.048-6.763-2.582-1.39-3.812-4.757-3.625-8.863h-9.471s-1.402 10.596-1.169 14.68" fill="#CBD1D1" data-v-3aeb057e></path><path d="M101.496 290.073s2.447 1.281 6.809.658c3.081-.44 3.74.485 7.479 1.039 3.739.554 10.802-.07 11.91-.9.415 1.108-.347 2.077-.347 2.077s-1.523.608-4.847.831c-2.045.137-5.843.293-7.663-.507-1.8-1.385-5.286-1.917-5.77-.243-3.947.958-7.41-.288-7.41-.288l-.16-2.667z" fill="#2B0849" data-v-3aeb057e></path><path d="M108.824 276.19h3.116s-.103 6.751 4.57 8.62c-4.673.624-8.62-2.32-7.686-8.62" fill="#A4AABA" data-v-3aeb057e></path><path d="M57.65 272.52s-2.122 7.47-4.518 12.396c-1.811 3.724-4.255 7.548 5.505 7.548 6.698 0 9.02-.483 7.479-6.648-1.541-6.164.268-13.296.268-13.296H57.65z" fill="#CBD1D1" data-v-3aeb057e></path><path d="M51.54 290.04s2.111 1.178 6.682 1.178c6.128 0 8.31-1.662 8.31-1.662s.605 1.122-.624 2.18c-1 .862-3.624 1.603-7.444 1.559-4.177-.049-5.876-.57-6.786-1.177-.831-.554-.692-1.593-.138-2.078" fill="#2B0849" data-v-3aeb057e></path><path d="M58.533 274.438s.034 1.529-.315 2.95c-.352 1.431-1.087 3.127-1.139 4.17-.058 1.16 4.57 1.592 5.194.035.623-1.559 1.303-6.475 1.927-7.306.622-.831-4.94-2.135-5.667.15" fill="#A4AABA" data-v-3aeb057e></path><path d="M100.885 277.015l13.306.092s1.291-54.228 1.843-64.056c.552-9.828 3.756-43.13.997-62.788l-12.48-.64-22.725.776s-.433 3.944-1.19 9.921c-.062.493-.677.838-.744 1.358-.075.582.42 1.347.318 1.956-2.35 14.003-6.343 32.926-8.697 46.425-.116.663-1.227 1.004-1.45 2.677-.04.3.21 1.516.112 1.785-6.836 18.643-10.89 47.584-14.2 61.551l14.528-.014s2.185-8.524 4.008-16.878c2.796-12.817 22.987-84.553 22.987-84.553l3-.517 1.037 46.1s-.223 1.228.334 2.008c.558.782-.556 1.117-.39 2.233l.39 1.784s-.446 7.14-.892 11.826c-.446 4.685-.092 38.954-.092 38.954" fill="#7BB2F9" data-v-3aeb057e></path><path d="M77.438 220.434c1.146.094 4.016-2.008 6.916-4.91M107.55 223.931s2.758-1.103 6.069-3.862" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M108.459 220.905s2.759-1.104 6.07-3.863" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M76.099 223.557s2.608-.587 6.47-3.346M87.33 150.82c-.27 3.088.297 8.478-4.315 9.073M104.829 149.075s.11 13.936-1.286 14.983c-2.207 1.655-2.975 1.934-2.975 1.934M101.014 149.63s.035 12.81-1.19 24.245M94.93 174.965s7.174-1.655 9.38-1.655M75.671 204.754c-.316 1.55-.64 3.067-.973 4.535 0 0-1.45 1.822-1.003 3.756.446 1.934-.943 2.034-4.96 15.273-1.686 5.559-4.464 18.49-6.313 27.447-.078.38-4.018 18.06-4.093 18.423M77.043 196.743a313.269 313.269 0 0 1-.877 4.729M83.908 151.414l-1.19 10.413s-1.091.148-.496 2.23c.111 1.34-2.66 15.692-5.153 30.267M57.58 272.94h13.238" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M117.377 147.423s-16.955-3.087-35.7.199c.157 2.501-.002 4.128-.002 4.128s14.607-2.802 35.476-.31c.251-2.342.226-4.017.226-4.017" fill="#192064" data-v-3aeb057e></path><path d="M107.511 150.353l.004-4.885a.807.807 0 0 0-.774-.81c-2.428-.092-5.04-.108-7.795-.014a.814.814 0 0 0-.784.81l-.003 4.88c0 .456.371.82.827.808a140.76 140.76 0 0 1 7.688.017.81.81 0 0 0 .837-.806" fill="#FFF" data-v-3aeb057e></path><path d="M106.402 149.426l.002-3.06a.64.64 0 0 0-.616-.643 94.135 94.135 0 0 0-5.834-.009.647.647 0 0 0-.626.643l-.001 3.056c0 .36.291.648.651.64 1.78-.04 3.708-.041 5.762.012.36.009.662-.279.662-.64" fill="#192064" data-v-3aeb057e></path><path d="M101.485 273.933h12.272M102.652 269.075c.006 3.368.04 5.759.11 6.47M102.667 263.125c-.009 1.53-.015 2.98-.016 4.313M102.204 174.024l.893 44.402s.669 1.561-.224 2.677c-.892 1.116 2.455.67.893 2.231-1.562 1.562.893 1.116 0 3.347-.592 1.48-.988 20.987-1.09 34.956" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path></g>', 1)];
var h4 = { key: 5, class: "u-image", width: "252", height: "294" };
var m4 = [createStaticVNode('<defs data-v-3aeb057e><path d="M0 .387h251.772v251.772H0z" data-v-3aeb057e></path></defs><g fill="none" fill-rule="evenodd" data-v-3aeb057e><g transform="translate(0 .012)" data-v-3aeb057e><mask fill="#fff" data-v-3aeb057e></mask><path d="M0 127.32v-2.095C0 56.279 55.892.387 124.838.387h2.096c68.946 0 124.838 55.892 124.838 124.838v2.096c0 68.946-55.892 124.838-124.838 124.838h-2.096C55.892 252.16 0 196.267 0 127.321" fill="#E4EBF7" mask="url(#b)" data-v-3aeb057e></path></g><path d="M39.755 130.84a8.276 8.276 0 1 1-16.468-1.66 8.276 8.276 0 0 1 16.468 1.66" fill="#FFF" data-v-3aeb057e></path><path d="M36.975 134.297l10.482 5.943M48.373 146.508l-12.648 10.788" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path d="M39.875 159.352a5.667 5.667 0 1 1-11.277-1.136 5.667 5.667 0 0 1 11.277 1.136M57.588 143.247a5.708 5.708 0 1 1-11.358-1.145 5.708 5.708 0 0 1 11.358 1.145M99.018 26.875l29.82-.014a4.587 4.587 0 1 0-.003-9.175l-29.82.013a4.587 4.587 0 1 0 .003 9.176M110.424 45.211l29.82-.013a4.588 4.588 0 0 0-.004-9.175l-29.82.013a4.587 4.587 0 1 0 .004 9.175" fill="#FFF" data-v-3aeb057e></path><path d="M112.798 26.861v-.002l15.784-.006a4.588 4.588 0 1 0 .003 9.175l-15.783.007v-.002a4.586 4.586 0 0 0-.004-9.172M184.523 135.668c-.553 5.485-5.447 9.483-10.931 8.93-5.485-.553-9.483-5.448-8.93-10.932.552-5.485 5.447-9.483 10.932-8.93 5.485.553 9.483 5.447 8.93 10.932" fill="#FFF" data-v-3aeb057e></path><path d="M179.26 141.75l12.64 7.167M193.006 156.477l-15.255 13.011" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path d="M184.668 170.057a6.835 6.835 0 1 1-13.6-1.372 6.835 6.835 0 0 1 13.6 1.372M203.34 153.325a6.885 6.885 0 1 1-13.7-1.382 6.885 6.885 0 0 1 13.7 1.382" fill="#FFF" data-v-3aeb057e></path><path d="M151.931 192.324a2.222 2.222 0 1 1-4.444 0 2.222 2.222 0 0 1 4.444 0zM225.27 116.056a2.222 2.222 0 1 1-4.445 0 2.222 2.222 0 0 1 4.444 0zM216.38 151.08a2.223 2.223 0 1 1-4.446-.001 2.223 2.223 0 0 1 4.446 0zM176.917 107.636a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM195.291 92.165a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM202.058 180.711a2.223 2.223 0 1 1-4.446 0 2.223 2.223 0 0 1 4.446 0z" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path stroke="#FFF" stroke-width="2" d="M214.404 153.302l-1.912 20.184-10.928 5.99M173.661 174.792l-6.356 9.814h-11.36l-4.508 6.484M174.941 125.168v-15.804M220.824 117.25l-12.84 7.901-15.31-7.902V94.39" data-v-3aeb057e></path><path d="M166.588 65.936h-3.951a4.756 4.756 0 0 1-4.743-4.742 4.756 4.756 0 0 1 4.743-4.743h3.951a4.756 4.756 0 0 1 4.743 4.743 4.756 4.756 0 0 1-4.743 4.742" fill="#FFF" data-v-3aeb057e></path><path d="M174.823 30.03c0-16.281 13.198-29.48 29.48-29.48 16.28 0 29.48 13.199 29.48 29.48 0 16.28-13.2 29.48-29.48 29.48-16.282 0-29.48-13.2-29.48-29.48" fill="#1890FF" data-v-3aeb057e></path><path d="M205.952 38.387c.5.5.785 1.142.785 1.928s-.286 1.465-.785 1.964c-.572.5-1.214.75-2 .75-.785 0-1.429-.285-1.929-.785-.572-.5-.82-1.143-.82-1.929s.248-1.428.82-1.928c.5-.5 1.144-.75 1.93-.75.785 0 1.462.25 1.999.75m4.285-19.463c1.428 1.249 2.143 2.963 2.143 5.142 0 1.712-.427 3.13-1.219 4.25-.067.096-.137.18-.218.265-.416.429-1.41 1.346-2.956 2.699a5.07 5.07 0 0 0-1.428 1.75 5.207 5.207 0 0 0-.536 2.357v.5h-4.107v-.5c0-1.357.215-2.536.714-3.5.464-.964 1.857-2.464 4.178-4.536l.43-.5c.643-.785.964-1.643.964-2.535 0-1.18-.358-2.108-1-2.785-.678-.68-1.643-1.001-2.858-1.001-1.536 0-2.642.464-3.357 1.43-.37.5-.621 1.135-.76 1.904a1.999 1.999 0 0 1-1.971 1.63h-.004c-1.277 0-2.257-1.183-1.98-2.43.337-1.518 1.02-2.78 2.073-3.784 1.536-1.5 3.607-2.25 6.25-2.25 2.32 0 4.214.607 5.642 1.894" fill="#FFF" data-v-3aeb057e></path><path d="M52.04 76.131s21.81 5.36 27.307 15.945c5.575 10.74-6.352 9.26-15.73 4.935-10.86-5.008-24.7-11.822-11.577-20.88" fill="#FFB594" data-v-3aeb057e></path><path d="M90.483 67.504l-.449 2.893c-.753.49-4.748-2.663-4.748-2.663l-1.645.748-1.346-5.684s6.815-4.589 8.917-5.018c2.452-.501 9.884.94 10.7 2.278 0 0 1.32.486-2.227.69-3.548.203-5.043.447-6.79 3.132-1.747 2.686-2.412 3.624-2.412 3.624" fill="#FFC6A0" data-v-3aeb057e></path><path d="M128.055 111.367c-2.627-7.724-6.15-13.18-8.917-15.478-3.5-2.906-9.34-2.225-11.366-4.187-1.27-1.231-3.215-1.197-3.215-1.197s-14.98-3.158-16.828-3.479c-2.37-.41-2.124-.714-6.054-1.405-1.57-1.907-2.917-1.122-2.917-1.122l-7.11-1.383c-.853-1.472-2.423-1.023-2.423-1.023l-2.468-.897c-1.645 9.976-7.74 13.796-7.74 13.796 1.795 1.122 15.703 8.3 15.703 8.3l5.107 37.11s-3.321 5.694 1.346 9.109c0 0 19.883-3.743 34.921-.329 0 0 3.047-2.546.972-8.806.523-3.01 1.394-8.263 1.736-11.622.385.772 2.019 1.918 3.14 3.477 0 0 9.407-7.365 11.052-14.012-.832-.723-1.598-1.585-2.267-2.453-.567-.736-.358-2.056-.765-2.717-.669-1.084-1.804-1.378-1.907-1.682" fill="#FFF" data-v-3aeb057e></path><path d="M101.09 289.998s4.295 2.041 7.354 1.021c2.821-.94 4.53.668 7.08 1.178 2.55.51 6.874 1.1 11.686-1.26-.103-5.51-6.889-3.98-11.96-6.713-2.563-1.38-3.784-4.722-3.598-8.799h-9.402s-1.392 10.52-1.16 14.573" fill="#CBD1D1" data-v-3aeb057e></path><path d="M101.067 289.826s2.428 1.271 6.759.653c3.058-.437 3.712.481 7.423 1.031 3.712.55 10.724-.069 11.823-.894.413 1.1-.343 2.063-.343 2.063s-1.512.603-4.812.824c-2.03.136-5.8.291-7.607-.503-1.787-1.375-5.247-1.903-5.728-.241-3.918.95-7.355-.286-7.355-.286l-.16-2.647z" fill="#2B0849" data-v-3aeb057e></path><path d="M108.341 276.044h3.094s-.103 6.702 4.536 8.558c-4.64.618-8.558-2.303-7.63-8.558" fill="#A4AABA" data-v-3aeb057e></path><path d="M57.542 272.401s-2.107 7.416-4.485 12.306c-1.798 3.695-4.225 7.492 5.465 7.492 6.648 0 8.953-.48 7.423-6.599-1.53-6.12.266-13.199.266-13.199h-8.669z" fill="#CBD1D1" data-v-3aeb057e></path><path d="M51.476 289.793s2.097 1.169 6.633 1.169c6.083 0 8.249-1.65 8.249-1.65s.602 1.114-.619 2.165c-.993.855-3.597 1.591-7.39 1.546-4.145-.048-5.832-.566-6.736-1.168-.825-.55-.687-1.58-.137-2.062" fill="#2B0849" data-v-3aeb057e></path><path d="M58.419 274.304s.033 1.519-.314 2.93c-.349 1.42-1.078 3.104-1.13 4.139-.058 1.151 4.537 1.58 5.155.034.62-1.547 1.294-6.427 1.913-7.252.619-.825-4.903-2.119-5.624.15" fill="#A4AABA" data-v-3aeb057e></path><path d="M99.66 278.514l13.378.092s1.298-54.52 1.853-64.403c.554-9.882 3.776-43.364 1.002-63.128l-12.547-.644-22.849.78s-.434 3.966-1.195 9.976c-.063.496-.682.843-.749 1.365-.075.585.423 1.354.32 1.966-2.364 14.08-6.377 33.104-8.744 46.677-.116.666-1.234 1.009-1.458 2.691-.04.302.211 1.525.112 1.795-6.873 18.744-10.949 47.842-14.277 61.885l14.607-.014s2.197-8.57 4.03-16.97c2.811-12.886 23.111-85.01 23.111-85.01l3.016-.521 1.043 46.35s-.224 1.234.337 2.02c.56.785-.56 1.123-.392 2.244l.392 1.794s-.449 7.178-.898 11.89c-.448 4.71-.092 39.165-.092 39.165" fill="#7BB2F9" data-v-3aeb057e></path><path d="M76.085 221.626c1.153.094 4.038-2.019 6.955-4.935M106.36 225.142s2.774-1.11 6.103-3.883" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M107.275 222.1s2.773-1.11 6.102-3.884" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M74.74 224.767s2.622-.591 6.505-3.365M86.03 151.634c-.27 3.106.3 8.525-4.336 9.123M103.625 149.88s.11 14.012-1.293 15.065c-2.219 1.664-2.99 1.944-2.99 1.944M99.79 150.438s.035 12.88-1.196 24.377M93.673 175.911s7.212-1.664 9.431-1.664M74.31 205.861a212.013 212.013 0 0 1-.979 4.56s-1.458 1.832-1.009 3.776c.449 1.944-.947 2.045-4.985 15.355-1.696 5.59-4.49 18.591-6.348 27.597l-.231 1.12M75.689 197.807a320.934 320.934 0 0 1-.882 4.754M82.591 152.233L81.395 162.7s-1.097.15-.5 2.244c.113 1.346-2.674 15.775-5.18 30.43M56.12 274.418h13.31" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M116.241 148.22s-17.047-3.104-35.893.2c.158 2.514-.003 4.15-.003 4.15s14.687-2.818 35.67-.312c.252-2.355.226-4.038.226-4.038" fill="#192064" data-v-3aeb057e></path><path d="M106.322 151.165l.003-4.911a.81.81 0 0 0-.778-.815c-2.44-.091-5.066-.108-7.836-.014a.818.818 0 0 0-.789.815l-.003 4.906a.81.81 0 0 0 .831.813c2.385-.06 4.973-.064 7.73.017a.815.815 0 0 0 .842-.81" fill="#FFF" data-v-3aeb057e></path><path d="M105.207 150.233l.002-3.076a.642.642 0 0 0-.619-.646 94.321 94.321 0 0 0-5.866-.01.65.65 0 0 0-.63.647v3.072a.64.64 0 0 0 .654.644 121.12 121.12 0 0 1 5.794.011c.362.01.665-.28.665-.642" fill="#192064" data-v-3aeb057e></path><path d="M100.263 275.415h12.338M101.436 270.53c.006 3.387.042 5.79.111 6.506M101.451 264.548a915.75 915.75 0 0 0-.015 4.337M100.986 174.965l.898 44.642s.673 1.57-.225 2.692c-.897 1.122 2.468.673.898 2.243-1.57 1.57.897 1.122 0 3.365-.596 1.489-.994 21.1-1.096 35.146" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M46.876 83.427s-.516 6.045 7.223 5.552c11.2-.712 9.218-9.345 31.54-21.655-.786-2.708-2.447-4.744-2.447-4.744s-11.068 3.11-22.584 8.046c-6.766 2.9-13.395 6.352-13.732 12.801M104.46 91.057l.941-5.372-8.884-11.43-5.037 5.372-1.74 7.834a.321.321 0 0 0 .108.32c.965.8 6.5 5.013 14.347 3.544a.332.332 0 0 0 .264-.268" fill="#FFC6A0" data-v-3aeb057e></path><path d="M93.942 79.387s-4.533-2.853-2.432-6.855c1.623-3.09 4.513 1.133 4.513 1.133s.52-3.642 3.121-3.642c.52-1.04 1.561-4.162 1.561-4.162s11.445 2.601 13.526 3.121c0 5.203-2.304 19.424-7.84 19.861-8.892.703-12.449-9.456-12.449-9.456" fill="#FFC6A0" data-v-3aeb057e></path><path d="M113.874 73.446c2.601-2.081 3.47-9.722 3.47-9.722s-2.479-.49-6.64-2.05c-4.683-2.081-12.798-4.747-17.48.976-9.668 3.223-2.05 19.823-2.05 19.823l2.713-3.021s-3.935-3.287-2.08-6.243c2.17-3.462 3.92 1.073 3.92 1.073s.637-2.387 3.581-3.342c.355-.71 1.036-2.674 1.432-3.85a1.073 1.073 0 0 1 1.263-.704c2.4.558 8.677 2.019 11.356 2.662.522.125.871.615.82 1.15l-.305 3.248z" fill="#520038" data-v-3aeb057e></path><path d="M104.977 76.064c-.103.61-.582 1.038-1.07.956-.489-.083-.801-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.644.698 1.254M112.132 77.694c-.103.61-.582 1.038-1.07.956-.488-.083-.8-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.643.698 1.254" fill="#552950" data-v-3aeb057e></path><path stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" d="M110.13 74.84l-.896 1.61-.298 4.357h-2.228" data-v-3aeb057e></path><path d="M110.846 74.481s1.79-.716 2.506.537" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M92.386 74.282s.477-1.114 1.113-.716c.637.398 1.274 1.433.558 1.99-.717.556.159 1.67.159 1.67" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M103.287 72.93s1.83 1.113 4.137.954" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M103.685 81.762s2.227 1.193 4.376 1.193M104.64 84.308s.954.398 1.511.318M94.693 81.205s2.308 7.4 10.424 7.639" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M81.45 89.384s.45 5.647-4.935 12.787M69 82.654s-.726 9.282-8.204 14.206" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M129.405 122.865s-5.272 7.403-9.422 10.768" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M119.306 107.329s.452 4.366-2.127 32.062" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M150.028 151.232h-49.837a1.01 1.01 0 0 1-1.01-1.01v-31.688c0-.557.452-1.01 1.01-1.01h49.837c.558 0 1.01.453 1.01 1.01v31.688a1.01 1.01 0 0 1-1.01 1.01" fill="#F2D7AD" data-v-3aeb057e></path><path d="M150.29 151.232h-19.863v-33.707h20.784v32.786a.92.92 0 0 1-.92.92" fill="#F4D19D" data-v-3aeb057e></path><path d="M123.554 127.896H92.917a.518.518 0 0 1-.425-.816l6.38-9.113c.193-.277.51-.442.85-.442h31.092l-7.26 10.371z" fill="#F2D7AD" data-v-3aeb057e></path><path fill="#CC9B6E" d="M123.689 128.447H99.25v-.519h24.169l7.183-10.26.424.298z" data-v-3aeb057e></path><path d="M158.298 127.896h-18.669a2.073 2.073 0 0 1-1.659-.83l-7.156-9.541h19.965c.49 0 .95.23 1.244.622l6.69 8.92a.519.519 0 0 1-.415.83" fill="#F4D19D" data-v-3aeb057e></path><path fill="#CC9B6E" d="M157.847 128.479h-19.384l-7.857-10.475.415-.31 7.7 10.266h19.126zM130.554 150.685l-.032-8.177.519-.002.032 8.177z" data-v-3aeb057e></path><path fill="#CC9B6E" d="M130.511 139.783l-.08-21.414.519-.002.08 21.414zM111.876 140.932l-.498-.143 1.479-5.167.498.143zM108.437 141.06l-2.679-2.935 2.665-3.434.41.318-2.397 3.089 2.384 2.612zM116.607 141.06l-.383-.35 2.383-2.612-2.397-3.089.41-.318 2.665 3.434z" data-v-3aeb057e></path><path d="M154.316 131.892l-3.114-1.96.038 3.514-1.043.092c-1.682.115-3.634.23-4.789.23-1.902 0-2.693 2.258 2.23 2.648l-2.645-.596s-2.168 1.317.504 2.3c0 0-1.58 1.217.561 2.58-.584 3.504 5.247 4.058 7.122 3.59 1.876-.47 4.233-2.359 4.487-5.16.28-3.085-.89-5.432-3.35-7.238" fill="#FFC6A0" data-v-3aeb057e></path><path d="M153.686 133.577s-6.522.47-8.36.372c-1.836-.098-1.904 2.19 2.359 2.264 3.739.15 5.451-.044 5.451-.044" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M145.16 135.877c-1.85 1.346.561 2.355.561 2.355s3.478.898 6.73.617" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M151.89 141.71s-6.28.111-6.73-2.132c-.223-1.346.45-1.402.45-1.402M146.114 140.868s-1.103 3.16 5.44 3.533M151.202 129.932v3.477M52.838 89.286c3.533-.337 8.423-1.248 13.582-7.754" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M168.567 248.318a6.647 6.647 0 0 1-6.647-6.647v-66.466a6.647 6.647 0 1 1 13.294 0v66.466a6.647 6.647 0 0 1-6.647 6.647" fill="#5BA02E" data-v-3aeb057e></path><path d="M176.543 247.653a6.647 6.647 0 0 1-6.646-6.647v-33.232a6.647 6.647 0 1 1 13.293 0v33.232a6.647 6.647 0 0 1-6.647 6.647" fill="#92C110" data-v-3aeb057e></path><path d="M186.443 293.613H158.92a3.187 3.187 0 0 1-3.187-3.187v-46.134a3.187 3.187 0 0 1 3.187-3.187h27.524a3.187 3.187 0 0 1 3.187 3.187v46.134a3.187 3.187 0 0 1-3.187 3.187" fill="#F2D7AD" data-v-3aeb057e></path><path d="M88.979 89.48s7.776 5.384 16.6 2.842" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path></g>', 2)];
var g4 = { key: 6, class: "u-image", width: "254", height: "294" };
var y4 = [createStaticVNode('<defs data-v-3aeb057e><path d="M0 .335h253.49v253.49H0z" data-v-3aeb057e></path><path d="M0 293.665h253.49V.401H0z" data-v-3aeb057e></path></defs><g fill="none" fill-rule="evenodd" data-v-3aeb057e><g transform="translate(0 .067)" data-v-3aeb057e><mask fill="#fff" data-v-3aeb057e></mask><path d="M0 128.134v-2.11C0 56.608 56.273.334 125.69.334h2.11c69.416 0 125.69 56.274 125.69 125.69v2.11c0 69.417-56.274 125.69-125.69 125.69h-2.11C56.273 253.824 0 197.551 0 128.134" fill="#E4EBF7" mask="url(#b)" data-v-3aeb057e></path></g><path d="M39.989 132.108a8.332 8.332 0 1 1-16.581-1.671 8.332 8.332 0 0 1 16.58 1.671" fill="#FFF" data-v-3aeb057e></path><path d="M37.19 135.59l10.553 5.983M48.665 147.884l-12.734 10.861" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path d="M40.11 160.816a5.706 5.706 0 1 1-11.354-1.145 5.706 5.706 0 0 1 11.354 1.145M57.943 144.6a5.747 5.747 0 1 1-11.436-1.152 5.747 5.747 0 0 1 11.436 1.153M99.656 27.434l30.024-.013a4.619 4.619 0 1 0-.004-9.238l-30.024.013a4.62 4.62 0 0 0 .004 9.238M111.14 45.896l30.023-.013a4.62 4.62 0 1 0-.004-9.238l-30.024.013a4.619 4.619 0 1 0 .004 9.238" fill="#FFF" data-v-3aeb057e></path><path d="M113.53 27.421v-.002l15.89-.007a4.619 4.619 0 1 0 .005 9.238l-15.892.007v-.002a4.618 4.618 0 0 0-.004-9.234M150.167 70.091h-3.979a4.789 4.789 0 0 1-4.774-4.775 4.788 4.788 0 0 1 4.774-4.774h3.979a4.789 4.789 0 0 1 4.775 4.774 4.789 4.789 0 0 1-4.775 4.775" fill="#FFF" data-v-3aeb057e></path><path d="M171.687 30.234c0-16.392 13.289-29.68 29.681-29.68 16.392 0 29.68 13.288 29.68 29.68 0 16.393-13.288 29.681-29.68 29.681s-29.68-13.288-29.68-29.68" fill="#FF603B" data-v-3aeb057e></path><path d="M203.557 19.435l-.676 15.035a1.514 1.514 0 0 1-3.026 0l-.675-15.035a2.19 2.19 0 1 1 4.377 0m-.264 19.378c.513.477.77 1.1.77 1.87s-.257 1.393-.77 1.907c-.55.476-1.21.733-1.943.733a2.545 2.545 0 0 1-1.87-.77c-.55-.514-.806-1.136-.806-1.87 0-.77.256-1.393.806-1.87.513-.513 1.137-.733 1.87-.733.77 0 1.43.22 1.943.733" fill="#FFF" data-v-3aeb057e></path><path d="M119.3 133.275c4.426-.598 3.612-1.204 4.079-4.778.675-5.18-3.108-16.935-8.262-25.118-1.088-10.72-12.598-11.24-12.598-11.24s4.312 4.895 4.196 16.199c1.398 5.243.804 14.45.804 14.45s5.255 11.369 11.78 10.487" fill="#FFB594" data-v-3aeb057e></path><path d="M100.944 91.61s1.463-.583 3.211.582c8.08 1.398 10.368 6.706 11.3 11.368 1.864 1.282 1.864 2.33 1.864 3.496.365.777 1.515 3.03 1.515 3.03s-7.225 1.748-10.954 6.758c-1.399-6.41-6.936-25.235-6.936-25.235" fill="#FFF" data-v-3aeb057e></path><path d="M94.008 90.5l1.019-5.815-9.23-11.874-5.233 5.581-2.593 9.863s8.39 5.128 16.037 2.246" fill="#FFB594" data-v-3aeb057e></path><path d="M82.931 78.216s-4.557-2.868-2.445-6.892c1.632-3.107 4.537 1.139 4.537 1.139s.524-3.662 3.139-3.662c.523-1.046 1.569-4.184 1.569-4.184s11.507 2.615 13.6 3.138c-.001 5.23-2.317 19.529-7.884 19.969-8.94.706-12.516-9.508-12.516-9.508" fill="#FFC6A0" data-v-3aeb057e></path><path d="M102.971 72.243c2.616-2.093 3.489-9.775 3.489-9.775s-2.492-.492-6.676-2.062c-4.708-2.092-12.867-4.771-17.575.982-9.54 4.41-2.062 19.93-2.062 19.93l2.729-3.037s-3.956-3.304-2.092-6.277c2.183-3.48 3.943 1.08 3.943 1.08s.64-2.4 3.6-3.36c.356-.714 1.04-2.69 1.44-3.872a1.08 1.08 0 0 1 1.27-.707c2.41.56 8.723 2.03 11.417 2.676.524.126.876.619.825 1.156l-.308 3.266z" fill="#520038" data-v-3aeb057e></path><path d="M101.22 76.514c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.961.491.083.805.647.702 1.26M94.26 75.074c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.96.491.082.805.646.702 1.26" fill="#552950" data-v-3aeb057e></path><path stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" d="M99.206 73.644l-.9 1.62-.3 4.38h-2.24" data-v-3aeb057e></path><path d="M99.926 73.284s1.8-.72 2.52.54" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M81.367 73.084s.48-1.12 1.12-.72c.64.4 1.28 1.44.56 2s.16 1.68.16 1.68" stroke="#DB836E" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M92.326 71.724s1.84 1.12 4.16.96" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M92.726 80.604s2.24 1.2 4.4 1.2M93.686 83.164s.96.4 1.52.32M83.687 80.044s1.786 6.547 9.262 7.954" stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M95.548 91.663s-1.068 2.821-8.298 2.105c-7.23-.717-10.29-5.044-10.29-5.044" stroke="#E4EBF7" stroke-width="1.136" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M78.126 87.478s6.526 4.972 16.47 2.486c0 0 9.577 1.02 11.536 5.322 5.36 11.77.543 36.835 0 39.962 3.496 4.055-.466 8.483-.466 8.483-15.624-3.548-35.81-.6-35.81-.6-4.849-3.546-1.223-9.044-1.223-9.044L62.38 110.32c-2.485-15.227.833-19.803 3.549-20.743 3.03-1.049 8.04-1.282 8.04-1.282.496-.058 1.08-.076 1.37-.233 2.36-1.282 2.787-.583 2.787-.583" fill="#FFF" data-v-3aeb057e></path><path d="M65.828 89.81s-6.875.465-7.59 8.156c-.466 8.857 3.03 10.954 3.03 10.954s6.075 22.102 16.796 22.957c8.39-2.176 4.758-6.702 4.661-11.42-.233-11.304-7.108-16.897-7.108-16.897s-4.212-13.75-9.789-13.75" fill="#FFC6A0" data-v-3aeb057e></path><path d="M71.716 124.225s.855 11.264 9.828 6.486c4.765-2.536 7.581-13.828 9.789-22.568 1.456-5.768 2.58-12.197 2.58-12.197l-4.973-1.709s-2.408 5.516-7.769 12.275c-4.335 5.467-9.144 11.11-9.455 17.713" fill="#FFC6A0" data-v-3aeb057e></path><path d="M108.463 105.191s1.747 2.724-2.331 30.535c2.376 2.216 1.053 6.012-.233 7.51" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M123.262 131.527s-.427 2.732-11.77 1.981c-15.187-1.006-25.326-3.25-25.326-3.25l.933-5.8s.723.215 9.71-.068c11.887-.373 18.714-6.07 24.964-1.022 4.039 3.263 1.489 8.16 1.489 8.16" fill="#FFC6A0" data-v-3aeb057e></path><path d="M70.24 90.974s-5.593-4.739-11.054 2.68c-3.318 7.223.517 15.284 2.664 19.578-.31 3.729 2.33 4.311 2.33 4.311s.108.895 1.516 2.68c4.078-7.03 6.72-9.166 13.711-12.546-.328-.656-1.877-3.265-1.825-3.767.175-1.69-1.282-2.623-1.282-2.623s-.286-.156-1.165-2.738c-.788-2.313-2.036-5.177-4.895-7.575" fill="#FFF" data-v-3aeb057e></path><path d="M90.232 288.027s4.855 2.308 8.313 1.155c3.188-1.063 5.12.755 8.002 1.331 2.881.577 7.769 1.243 13.207-1.424-.117-6.228-7.786-4.499-13.518-7.588-2.895-1.56-4.276-5.336-4.066-9.944H91.544s-1.573 11.89-1.312 16.47" fill="#CBD1D1" data-v-3aeb057e></path><path d="M90.207 287.833s2.745 1.437 7.639.738c3.456-.494 3.223.66 7.418 1.282 4.195.621 13.092-.194 14.334-1.126.466 1.242-.388 2.33-.388 2.33s-1.709.682-5.438.932c-2.295.154-8.098.276-10.14-.621-2.02-1.554-4.894-1.515-6.06-.234-4.427 1.075-7.184-.31-7.184-.31l-.181-2.991z" fill="#2B0849" data-v-3aeb057e></path><path d="M98.429 272.257h3.496s-.117 7.574 5.127 9.671c-5.244.7-9.672-2.602-8.623-9.671" fill="#A4AABA" data-v-3aeb057e></path><path d="M44.425 272.046s-2.208 7.774-4.702 12.899c-1.884 3.874-4.428 7.854 5.729 7.854 6.97 0 9.385-.503 7.782-6.917-1.604-6.415.279-13.836.279-13.836h-9.088z" fill="#CBD1D1" data-v-3aeb057e></path><path d="M38.066 290.277s2.198 1.225 6.954 1.225c6.376 0 8.646-1.73 8.646-1.73s.63 1.168-.649 2.27c-1.04.897-3.77 1.668-7.745 1.621-4.347-.05-6.115-.593-7.062-1.224-.864-.577-.72-1.657-.144-2.162" fill="#2B0849" data-v-3aeb057e></path><path d="M45.344 274.041s.035 1.592-.329 3.07c-.365 1.49-1.13 3.255-1.184 4.34-.061 1.206 4.755 1.657 5.403.036.65-1.622 1.357-6.737 2.006-7.602.648-.865-5.14-2.222-5.896.156" fill="#A4AABA" data-v-3aeb057e></path><path d="M89.476 277.57l13.899.095s1.349-56.643 1.925-66.909c.576-10.267 3.923-45.052 1.042-65.585l-13.037-.669-23.737.81s-.452 4.12-1.243 10.365c-.065.515-.708.874-.777 1.417-.078.608.439 1.407.332 2.044-2.455 14.627-5.797 32.736-8.256 46.837-.121.693-1.282 1.048-1.515 2.796-.042.314.22 1.584.116 1.865-7.14 19.473-12.202 52.601-15.66 67.19l15.176-.015s2.282-10.145 4.185-18.871c2.922-13.389 24.012-88.32 24.012-88.32l3.133-.954-.158 48.568s-.233 1.282.35 2.098c.583.815-.581 1.167-.408 2.331l.408 1.864s-.466 7.458-.932 12.352c-.467 4.895 1.145 40.69 1.145 40.69" fill="#7BB2F9" data-v-3aeb057e></path><path d="M64.57 218.881c1.197.099 4.195-2.097 7.225-5.127M96.024 222.534s2.881-1.152 6.34-4.034" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M96.973 219.373s2.882-1.153 6.34-4.034" stroke="#648BD8" stroke-width="1.032" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M63.172 222.144s2.724-.614 6.759-3.496M74.903 146.166c-.281 3.226.31 8.856-4.506 9.478M93.182 144.344s.115 14.557-1.344 15.65c-2.305 1.73-3.107 2.02-3.107 2.02M89.197 144.923s.269 13.144-1.01 25.088M83.525 170.71s6.81-1.051 9.116-1.051M46.026 270.045l-.892 4.538M46.937 263.289l-.815 4.157M62.725 202.503c-.33 1.618-.102 1.904-.449 3.438 0 0-2.756 1.903-2.29 3.923.466 2.02-.31 3.424-4.505 17.252-1.762 5.807-4.233 18.922-6.165 28.278-.03.144-.521 2.646-1.14 5.8M64.158 194.136c-.295 1.658-.6 3.31-.917 4.938M71.33 146.787l-1.244 10.877s-1.14.155-.519 2.33c.117 1.399-2.778 16.39-5.382 31.615M44.242 273.727H58.07" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M106.18 142.117c-3.028-.489-18.825-2.744-36.219.2a.625.625 0 0 0-.518.644c.063 1.307.044 2.343.015 2.995a.617.617 0 0 0 .716.636c3.303-.534 17.037-2.412 35.664-.266.347.04.66-.214.692-.56.124-1.347.16-2.425.17-3.029a.616.616 0 0 0-.52-.62" fill="#192064" data-v-3aeb057e></path><path d="M96.398 145.264l.003-5.102a.843.843 0 0 0-.809-.847 114.104 114.104 0 0 0-8.141-.014.85.85 0 0 0-.82.847l-.003 5.097c0 .476.388.857.864.845 2.478-.064 5.166-.067 8.03.017a.848.848 0 0 0 .876-.843" fill="#FFF" data-v-3aeb057e></path><path d="M95.239 144.296l.002-3.195a.667.667 0 0 0-.643-.672c-1.9-.061-3.941-.073-6.094-.01a.675.675 0 0 0-.654.672l-.002 3.192c0 .376.305.677.68.669 1.859-.042 3.874-.043 6.02.012.376.01.69-.291.691-.668" fill="#192064" data-v-3aeb057e></path><path d="M90.102 273.522h12.819M91.216 269.761c.006 3.519-.072 5.55 0 6.292M90.923 263.474c-.009 1.599-.016 2.558-.016 4.505M90.44 170.404l.932 46.38s.7 1.631-.233 2.796c-.932 1.166 2.564.7.932 2.33-1.63 1.633.933 1.166 0 3.497-.618 1.546-1.031 21.921-1.138 36.513" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M73.736 98.665l2.214 4.312s2.098.816 1.865 2.68l.816 2.214M64.297 116.611c.233-.932 2.176-7.147 12.585-10.488M77.598 90.042s7.691 6.137 16.547 2.72" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M91.974 86.954s5.476-.816 7.574-4.545c1.297-.345.72 2.212-.33 3.671-.7.971-1.01 1.554-1.01 1.554s.194.31.155.816c-.053.697-.175.653-.272 1.048-.081.335.108.657 0 1.049-.046.17-.198.5-.382.878-.12.249-.072.687-.2.948-.231.469-1.562 1.87-2.622 2.855-3.826 3.554-5.018 1.644-6.001-.408-.894-1.865-.661-5.127-.874-6.875-.35-2.914-2.622-3.03-1.923-4.429.343-.685 2.87.69 3.263 1.748.757 2.04 2.952 1.807 2.622 1.69" fill="#FFC6A0" data-v-3aeb057e></path><path d="M99.8 82.429c-.465.077-.35.272-.97 1.243-.622.971-4.817 2.932-6.39 3.224-2.589.48-2.278-1.56-4.254-2.855-1.69-1.107-3.562-.638-1.398 1.398.99.932.932 1.107 1.398 3.205.335 1.506-.64 3.67.7 5.593" stroke="#DB836E" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M79.543 108.673c-2.1 2.926-4.266 6.175-5.557 8.762" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M87.72 124.768s-2.098-1.942-5.127-2.719c-3.03-.777-3.574-.155-5.516.078-1.942.233-3.885-.932-3.652.7.233 1.63 5.05 1.01 5.206 2.097.155 1.087-6.37 2.796-8.313 2.175-.777.777.466 1.864 2.02 2.175.233 1.554 2.253 1.554 2.253 1.554s.699 1.01 2.641 1.088c2.486 1.32 8.934-.7 10.954-1.554 2.02-.855-.466-5.594-.466-5.594" fill="#FFC6A0" data-v-3aeb057e></path><path d="M73.425 122.826s.66 1.127 3.167 1.418c2.315.27 2.563.583 2.563.583s-2.545 2.894-9.07 2.272M72.416 129.274s3.826.097 4.933-.718M74.98 130.75s1.961.136 3.36-.505M77.232 131.916s1.748.019 2.914-.505M73.328 122.321s-.595-1.032 1.262-.427c1.671.544 2.833.055 5.128.155 1.389.061 3.067-.297 3.982.15 1.606.784 3.632 2.181 3.632 2.181s10.526 1.204 19.033-1.127M78.864 108.104s-8.39 2.758-13.168 12.12" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M109.278 112.533s3.38-3.613 7.575-4.662" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M107.375 123.006s9.697-2.745 11.445-.88" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M194.605 83.656l3.971-3.886M187.166 90.933l3.736-3.655M191.752 84.207l-4.462-4.56M198.453 91.057l-4.133-4.225M129.256 163.074l3.718-3.718M122.291 170.039l3.498-3.498M126.561 163.626l-4.27-4.27M132.975 170.039l-3.955-3.955" stroke="#BFCDDD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M190.156 211.779h-1.604a4.023 4.023 0 0 1-4.011-4.011V175.68a4.023 4.023 0 0 1 4.01-4.01h1.605a4.023 4.023 0 0 1 4.011 4.01v32.088a4.023 4.023 0 0 1-4.01 4.01" fill="#A3B4C6" data-v-3aeb057e></path><path d="M237.824 212.977a4.813 4.813 0 0 1-4.813 4.813h-86.636a4.813 4.813 0 0 1 0-9.626h86.636a4.813 4.813 0 0 1 4.813 4.813" fill="#A3B4C6" data-v-3aeb057e></path><mask fill="#fff" data-v-3aeb057e></mask><path fill="#A3B4C6" mask="url(#d)" d="M154.098 190.096h70.513v-84.617h-70.513z" data-v-3aeb057e></path><path d="M224.928 190.096H153.78a3.219 3.219 0 0 1-3.208-3.209V167.92a3.219 3.219 0 0 1 3.208-3.21h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.219 3.219 0 0 1-3.21 3.209M224.928 130.832H153.78a3.218 3.218 0 0 1-3.208-3.208v-18.968a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.218 3.218 0 0 1-3.21 3.208" fill="#BFCDDD" mask="url(#d)" data-v-3aeb057e></path><path d="M159.563 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 120.546h-22.461a.802.802 0 0 1-.802-.802v-3.208c0-.443.359-.803.802-.803h22.46c.444 0 .803.36.803.803v3.208c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-3aeb057e></path><path d="M224.928 160.464H153.78a3.218 3.218 0 0 1-3.208-3.209v-18.967a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.209v18.967a3.218 3.218 0 0 1-3.21 3.209" fill="#BFCDDD" mask="url(#d)" data-v-3aeb057e></path><path d="M173.455 130.832h49.301M164.984 130.832h6.089M155.952 130.832h6.75M173.837 160.613h49.3M165.365 160.613h6.089M155.57 160.613h6.751" stroke="#7C90A5" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-3aeb057e></path><path d="M159.563 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M166.98 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M174.397 151.038a2.407 2.407 0 1 1 .001-4.814 2.407 2.407 0 0 1 0 4.814M222.539 151.038h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802M159.563 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 179.987h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-3aeb057e></path><path d="M203.04 221.108h-27.372a2.413 2.413 0 0 1-2.406-2.407v-11.448a2.414 2.414 0 0 1 2.406-2.407h27.372a2.414 2.414 0 0 1 2.407 2.407V218.7a2.413 2.413 0 0 1-2.407 2.407" fill="#BFCDDD" mask="url(#d)" data-v-3aeb057e></path><path d="M177.259 207.217v11.52M201.05 207.217v11.52" stroke="#A3B4C6" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-3aeb057e></path><path d="M162.873 267.894a9.422 9.422 0 0 1-9.422-9.422v-14.82a9.423 9.423 0 0 1 18.845 0v14.82a9.423 9.423 0 0 1-9.423 9.422" fill="#5BA02E" mask="url(#d)" data-v-3aeb057e></path><path d="M171.22 267.83a9.422 9.422 0 0 1-9.422-9.423v-3.438a9.423 9.423 0 0 1 18.845 0v3.438a9.423 9.423 0 0 1-9.422 9.423" fill="#92C110" mask="url(#d)" data-v-3aeb057e></path><path d="M181.31 293.666h-27.712a3.209 3.209 0 0 1-3.209-3.21V269.79a3.209 3.209 0 0 1 3.209-3.21h27.711a3.209 3.209 0 0 1 3.209 3.21v20.668a3.209 3.209 0 0 1-3.209 3.209" fill="#F2D7AD" mask="url(#d)" data-v-3aeb057e></path></g>', 2)];
var b4 = { class: "m-title" };
var k4 = { class: "m-subtitle" };
var w4 = { class: "m-extra" };
var x4 = { key: 0, class: "m-content" };
var Aa2 = V(defineComponent({ __name: "Result", props: { status: { default: "info" }, title: { default: "" }, subTitle: { default: "" } }, setup(l) {
  const a = useSlots(), e = computed(() => {
    var u;
    const t = (u = a.default) == null ? void 0 : u.call(a);
    return !!t && !!(t[0].children !== "v-if" && (t != null && t.length));
  });
  return (t, u) => (openBlock(), createElementBlock("div", t4, [createBaseVNode("div", o4, [renderSlot(t.$slots, "image", {}, () => [t.status === "info" ? (openBlock(), createElementBlock("svg", s4, n4)) : createCommentVNode("", true), t.status === "success" ? (openBlock(), createElementBlock("svg", i4, u4)) : createCommentVNode("", true), t.status === "warning" ? (openBlock(), createElementBlock("svg", c4, d4)) : createCommentVNode("", true), t.status === "error" ? (openBlock(), createElementBlock("svg", r4, v4)) : createCommentVNode("", true), t.status === "403" ? (openBlock(), createElementBlock("svg", p4, f4)) : createCommentVNode("", true), t.status === "404" ? (openBlock(), createElementBlock("svg", h4, m4)) : createCommentVNode("", true), t.status === "500" ? (openBlock(), createElementBlock("svg", g4, y4)) : createCommentVNode("", true)], true)]), createBaseVNode("div", b4, [renderSlot(t.$slots, "title", {}, () => [createTextVNode(toDisplayString(t.title), 1)], true)]), createBaseVNode("div", k4, [renderSlot(t.$slots, "subTitle", {}, () => [createTextVNode(toDisplayString(t.subTitle), 1)], true)]), createBaseVNode("div", w4, [renderSlot(t.$slots, "extra", {}, void 0, true)]), e.value ? (openBlock(), createElementBlock("div", x4, [renderSlot(t.$slots, "default", {}, void 0, true)])) : createCommentVNode("", true)]));
} }), [["__scopeId", "data-v-3aeb057e"]]);
Aa2.install = (l) => {
  l.component(Aa2.__name, Aa2);
};
var Da2 = V(defineComponent({ __name: "Row", props: { width: { default: "auto" }, gutter: { default: 0 }, wrap: { type: Boolean, default: false }, align: { default: "top" }, justify: { default: "start" } }, setup(l) {
  const a = l, e = { top: "flex-start", middle: "center", bottom: "flex-end", stretch: "stretch" }, t = computed(() => typeof a.gutter == "number" ? a.gutter : Array.isArray(a.gutter) ? typeof a.gutter[0] == "object" ? c.value >= 1600 && a.gutter[0].xxl ? a.gutter[0].xxl : c.value >= 1200 && a.gutter[0].xl ? a.gutter[0].xl : c.value >= 992 && a.gutter[0].lg ? a.gutter[0].lg : c.value >= 768 && a.gutter[0].md ? a.gutter[0].md : c.value >= 576 && a.gutter[0].sm ? a.gutter[0].sm : c.value < 576 && a.gutter[0].xs ? a.gutter[0].xs : 16 : a.gutter[0] : typeof a.gutter == "object" ? c.value >= 1600 && a.gutter.xxl ? a.gutter.xxl : c.value >= 1200 && a.gutter.xl ? a.gutter.xl : c.value >= 992 && a.gutter.lg ? a.gutter.lg : c.value >= 768 && a.gutter.md ? a.gutter.md : c.value >= 576 && a.gutter.sm ? a.gutter.sm : c.value < 576 && a.gutter.xs ? a.gutter.xs : 16 : 0), u = computed(() => Array.isArray(a.gutter) ? typeof a.gutter[1] == "object" ? c.value >= 1600 && a.gutter[1].xxl ? a.gutter[1].xxl : c.value >= 1200 && a.gutter[1].xl ? a.gutter[1].xl : c.value >= 992 && a.gutter[1].lg ? a.gutter[1].lg : c.value >= 768 && a.gutter[1].md ? a.gutter[1].md : c.value >= 576 && a.gutter[1].sm ? a.gutter[1].sm : c.value < 576 && a.gutter[1].xs ? a.gutter[1].xs : 16 : a.gutter[1] : 0), r = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), c = ref(document.documentElement.clientWidth);
  function s() {
    c.value = document.documentElement.clientWidth;
  }
  return onMounted(() => {
    window.addEventListener("resize", s);
  }), onUnmounted(() => {
    window.removeEventListener("resize", s);
  }), (p, n) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-row", { "gutter-row": p.gutter }]), style: normalizeStyle(`--xGap: ${t.value / 2}px; --justify: ${p.justify}; --align: ${e[p.align]}; width: ${r.value}; margin-left: -${t.value / 2}px; margin-right: -${t.value / 2}px; row-gap: ${u.value}px;`) }, [renderSlot(p.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-aee57bbb"]]);
Da2.install = (l) => {
  l.component(Da2.__name, Da2);
};
var m1 = (l) => (pushScopeId("data-v-1caf82a3"), l = l(), popScopeId(), l);
var M4 = { key: 0, class: "m-handle-tooltip" };
var z4 = m1(() => createBaseVNode("div", { class: "m-arrow" }, null, -1));
var _4 = { key: 0, class: "m-handle-tooltip" };
var C4 = m1(() => createBaseVNode("div", { class: "m-arrow" }, null, -1));
var Ea2 = V(defineComponent({ __name: "Slider", props: { width: { default: "100%" }, min: { default: 0 }, max: { default: 100 }, disabled: { type: Boolean, default: false }, range: { type: Boolean, default: false }, step: { default: 1 }, tipFormatter: { type: Function, default: (l) => l }, hideTip: { type: Boolean, default: false }, value: { default: 0 } }, emits: ["update:value", "change"], setup(l, { emit: a }) {
  const e = l, t = ref(false), u = ref(), r = ref(0), c = ref(0), s = ref(), p = ref(), n = ref(), h3 = ref(), k = computed(() => y(p.value / (e.max - e.min) * e.step)), M = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), w = computed(() => {
    const S = Math.round(c.value / k.value * e.step + e.min);
    return e.range ? [Math.round(r.value / k.value * e.step + e.min), S] : S;
  }), i = computed(() => e.range ? e.tipFormatter(w.value[0]) : null), b = computed(() => e.range ? e.tipFormatter(w.value[1]) : e.tipFormatter(w.value)), m = a;
  function y(S) {
    return parseFloat(S.toFixed(2));
  }
  function f() {
    e.range ? (r.value = y((e.value[0] - e.min) / e.step * k.value), c.value = y((e.value[1] - e.min) / e.step * k.value)) : c.value = y((e.value - e.min) / e.step * k.value);
  }
  function g() {
    const S = s.value.getBoundingClientRect().left;
    document.onmousemove = (I) => {
      const E = y(Math.round((I.clientX - S) / k.value) * k.value);
      E < 0 ? r.value = 0 : E >= 0 && E <= c.value ? r.value = E : (r.value = c.value, h3.value.focus(), z());
    }, document.onmouseup = () => {
      document.onmousemove = null;
    };
  }
  function z() {
    const S = s.value.getBoundingClientRect().left;
    document.onmousemove = (I) => {
      const E = y(Math.round((I.clientX - S) / k.value) * k.value);
      E > p.value ? c.value = p.value : r.value <= E && E <= p.value ? c.value = E : (c.value = r.value, n.value.focus(), g());
    }, document.onmouseup = () => {
      document.onmousemove = null;
    };
  }
  function $(S, I) {
    const E = S - k.value;
    I === "left" ? r.value = E < 0 ? 0 : E : E >= r.value ? c.value = E : (c.value = r.value, r.value = E, n.value.focus());
  }
  function H(S, I) {
    const E = S + k.value;
    I === "right" ? E > p.value ? c.value = p.value : c.value = E : E <= c.value ? r.value = E : (r.value = c.value, c.value = E, h3.value.focus());
  }
  return watch(() => e.value, () => {
    f();
  }), watch(w, (S) => {
    m("update:value", S), m("change", S);
  }), onMounted(() => {
    p.value = s.value.offsetWidth, f();
  }), (S, I) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-slider", { disabled: S.disabled }]), ref_key: "slider", ref: s, style: normalizeStyle(`width: ${M.value};`) }, [createBaseVNode("div", { class: "u-slider-rail", onClick: I[0] || (I[0] = withModifiers((E) => S.disabled ? () => false : function(K3) {
    t.value ? (be2(u.value), u.value = null) : t.value = true, u.value = ue(() => {
      t.value = false;
    }, 300);
    const ae = Math.round(K3.layerX / k.value) * k.value;
    e.range ? ae <= r.value ? (r.value = ae, n.value.focus()) : ae >= c.value ? (c.value = ae, h3.value.focus()) : ae - r.value < c.value - ae ? (r.value = ae, n.value.focus()) : (c.value = ae, h3.value.focus()) : (c.value = ae, h3.value.focus());
  }(E), ["self"])) }), createBaseVNode("div", { class: normalizeClass(["u-slider-track", { trackTransition: t.value }]), style: normalizeStyle(`left: ${r.value}px; right: auto; width: ${c.value - r.value}px;`) }, null, 6), S.range ? (openBlock(), createElementBlock("div", { key: 0, tabindex: "0", ref_key: "leftHandle", ref: n, class: normalizeClass(["u-slider-handle", { handleTransition: t.value }]), style: normalizeStyle(`left: ${r.value}px; right: auto; transform: translate(-50%, -50%);`), onKeydown: [I[1] || (I[1] = withKeys(withModifiers((E) => S.disabled ? () => false : $(r.value, "left"), ["prevent"]), ["left"])), I[2] || (I[2] = withKeys(withModifiers((E) => S.disabled ? () => false : H(r.value, "left"), ["prevent"]), ["right"])), I[3] || (I[3] = withKeys(withModifiers((E) => S.disabled ? () => false : $(r.value, "left"), ["prevent"]), ["down"])), I[4] || (I[4] = withKeys(withModifiers((E) => S.disabled ? () => false : H(r.value, "left"), ["prevent"]), ["up"]))], onMousedown: I[5] || (I[5] = (E) => S.disabled ? () => false : g()) }, [S.hideTip ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", M4, [createTextVNode(toDisplayString(i.value) + " ", 1), z4]))], 38)) : createCommentVNode("", true), createBaseVNode("div", { tabindex: "0", ref_key: "rightHandle", ref: h3, class: normalizeClass(["u-slider-handle", { handleTransition: t.value }]), style: normalizeStyle(`left: ${c.value}px; right: auto; transform: translate(-50%, -50%);`), onKeydown: [I[6] || (I[6] = withKeys(withModifiers((E) => S.disabled ? () => false : $(c.value, "right"), ["prevent"]), ["left"])), I[7] || (I[7] = withKeys(withModifiers((E) => S.disabled ? () => false : H(c.value, "right"), ["prevent"]), ["right"])), I[8] || (I[8] = withKeys(withModifiers((E) => S.disabled ? () => false : $(c.value, "right"), ["prevent"]), ["down"])), I[9] || (I[9] = withKeys(withModifiers((E) => S.disabled ? () => false : H(c.value, "right"), ["prevent"]), ["up"]))], onMousedown: I[10] || (I[10] = (E) => S.disabled ? () => false : z()) }, [S.hideTip ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", _4, [createTextVNode(toDisplayString(b.value) + " ", 1), C4]))], 38)], 6));
} }), [["__scopeId", "data-v-1caf82a3"]]);
Ea2.install = (l) => {
  l.component(Ea2.__name, Ea2);
};
var $4 = { class: "m-statistic" };
var B4 = { class: "u-title" };
var F4 = { key: 0, class: "u-prefix" };
var S4 = { class: "u-content-value" };
var L4 = { key: 1, class: "u-suffix" };
var Ha2 = V(defineComponent({ __name: "Statistic", props: { title: { default: "" }, value: { default: "" }, valueStyle: { default: () => ({}) }, precision: { default: 0 }, prefix: { default: "" }, suffix: { default: "" }, separator: { default: "," }, formatter: { type: Function, default: (l) => l } }, setup(l) {
  const a = l, e = computed(() => a.formatter(_1(a.value, a.precision, a.separator))), t = useSlots(), u = computed(() => {
    var s;
    const c = (s = t.prefix) == null ? void 0 : s.call(t);
    return c ? !!(c[0].children !== "v-if" && (c != null && c.length)) : a.prefix;
  }), r = computed(() => {
    var s;
    const c = (s = t.suffix) == null ? void 0 : s.call(t);
    return c ? !!(c[0].children !== "v-if" && (c != null && c.length)) : a.suffix;
  });
  return (c, s) => (openBlock(), createElementBlock("div", $4, [createBaseVNode("div", B4, [renderSlot(c.$slots, "title", {}, () => [createTextVNode(toDisplayString(c.title), 1)], true)]), createBaseVNode("div", { class: "m-content", style: normalizeStyle(c.valueStyle) }, [u.value ? (openBlock(), createElementBlock("span", F4, [renderSlot(c.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(c.prefix), 1)], true)])) : createCommentVNode("", true), createBaseVNode("span", S4, [renderSlot(c.$slots, "default", {}, () => [createTextVNode(toDisplayString(e.value), 1)], true)]), r.value ? (openBlock(), createElementBlock("span", L4, [renderSlot(c.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(c.suffix), 1)], true)])) : createCommentVNode("", true)], 4)]));
} }), [["__scopeId", "data-v-39869a0d"]]);
Ha2.install = (l) => {
  l.component(Ha2.__name, Ha2);
};
var A4 = { class: "m-steps" };
var D4 = ["onClick"];
var E4 = { class: "m-steps-icon" };
var H4 = { key: 0, class: "u-num" };
var I4 = { key: 1, class: "u-icon", viewBox: "64 64 896 896", "data-icon": "check", "aria-hidden": "true", focusable: "false" };
var T4 = [((l) => (pushScopeId("data-v-c696fb2e"), l = l(), popScopeId(), l))(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1))];
var j4 = { class: "m-steps-content" };
var V4 = { class: "u-steps-title" };
var Ia = V(defineComponent({ __name: "Steps", props: { steps: { default: () => [] }, current: { default: 1 }, width: { default: "100%" }, descMaxWidth: { default: 120 } }, emits: ["update:current", "change"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), u = computed(() => e.steps.length), r = computed(() => e.current < 1 ? 1 : e.current > u.value + 1 ? u.value + 1 : e.current), c = a;
  return (s, p) => (openBlock(), createElementBlock("div", { class: "m-steps-area", style: normalizeStyle(`width: ${t.value};`) }, [createBaseVNode("div", A4, [(openBlock(true), createElementBlock(Fragment, null, renderList(s.steps, (n, h3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-steps-item", { finish: r.value > h3 + 1, process: r.value === h3 + 1, wait: r.value < h3 + 1 }]), key: h3 }, [createBaseVNode("div", { class: "m-info-wrap", onClick: (k) => function(M) {
    r.value !== M && (c("update:current", M), c("change", M));
  }(h3 + 1) }, [createBaseVNode("div", E4, [r.value <= h3 + 1 ? (openBlock(), createElementBlock("span", H4, toDisplayString(h3 + 1), 1)) : (openBlock(), createElementBlock("svg", I4, T4))]), createBaseVNode("div", j4, [createBaseVNode("div", V4, toDisplayString(n.title), 1), withDirectives(createBaseVNode("div", { class: "u-steps-description", style: normalizeStyle(`max-width: ${s.descMaxWidth}px;`) }, toDisplayString(n.description), 5), [[vShow, n.description]])])], 8, D4)], 2))), 128))])], 4));
} }), [["__scopeId", "data-v-c696fb2e"]]);
Ia.install = (l) => {
  l.component(Ia.__name, Ia);
};
var R4 = ["href", "target"];
var W4 = ["src", "alt"];
var N4 = ["href", "target"];
var O4 = ["src", "alt"];
var q4 = ["href", "target"];
var P4 = ["src", "alt"];
var Ta2 = V(defineComponent({ __name: "Swiper", props: { images: { default: () => [] }, width: { default: "100%" }, height: { default: "100vh" }, type: { default: "banner" }, navigation: { type: Boolean, default: true }, delay: { default: 3e3 }, swipe: { type: Boolean, default: true }, preloaderColor: { default: "theme" } }, emits: ["swiper", "change"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), u = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), r = ref([Navigation, Pagination, Autoplay, EffectFade]), c = ref({ delay: e.delay, disableOnInteraction: false, pauseOnMouseEnter: true }), s = ref([Autoplay]), p = ref({ delay: 0, disableOnInteraction: false }), n = ref([Navigation, Pagination, Mousewheel]), h3 = a;
  function k(M) {
    h3("swiper", M), e.type === "carousel" && (M.el.onmouseenter = () => {
      M.autoplay.stop();
    }, M.el.onmouseleave = () => {
      M.autoplay.start();
    });
  }
  return (M, w) => (openBlock(), createElementBlock(Fragment, null, [M.type === "banner" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 0, class: { "swiper-no-swiping": !M.swipe }, modules: r.value, navigation: M.navigation, "slides-per-view": 1, autoplay: c.value, lazy: "", loop: "", onSwiper: k, onSlideChange: w[0] || (w[0] = (i) => M.$emit("change")) }, M.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(M.images, (i, b) => (openBlock(), createBlock(unref(SwiperSlide), { key: b }, { default: withCtx(() => [createBaseVNode("a", { href: i.link ? i.link : "javascript:;", target: i.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { src: i.src, class: "u-img", style: normalizeStyle(`width: ${t.value}; height: ${u.value};`), alt: i.title, loading: "lazy" }, null, 12, W4)], 8, R4), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${M.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["class", "modules", "navigation", "autoplay"])) : createCommentVNode("", true), M.type === "carousel" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 1, class: "swiper-no-swiping", modules: s.value, autoplay: p.value, lazy: "", loop: "", onSwiper: k, onSlideChange: w[1] || (w[1] = (i) => M.$emit("change")) }, M.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(M.images, (i, b) => (openBlock(), createBlock(unref(SwiperSlide), { key: b }, { default: withCtx(() => [createBaseVNode("a", { href: i.link ? i.link : "javascript:;", target: i.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { src: i.src, class: "u-img", style: normalizeStyle(`width: ${t.value}; height: ${u.value};`), alt: i.title, loading: "lazy" }, null, 12, O4)], 8, N4), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${M.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["modules", "autoplay"])) : createCommentVNode("", true), M.type === "broadcast" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 2, modules: n.value, navigation: M.navigation, lazy: "", onSwiper: k, onSlideChange: w[2] || (w[2] = (i) => M.$emit("change")) }, M.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(M.images, (i, b) => (openBlock(), createBlock(unref(SwiperSlide), { key: b }, { default: withCtx(() => [createBaseVNode("a", { href: i.link ? i.link : "javascript:;", target: i.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { src: i.src, class: "u-img", style: normalizeStyle(`width: ${t.value}; height: ${u.value};`), alt: i.title, loading: "lazy" }, null, 12, P4)], 8, q4), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${M.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["modules", "navigation"])) : createCommentVNode("", true)], 64));
} }), [["__scopeId", "data-v-d6a3d8a5"]]);
Ta2.install = (l) => {
  l.component(Ta2.__name, Ta2);
};
var Y4 = { class: "m-switch-wrap" };
var ja2 = V(defineComponent({ __name: "Switch", props: { onInfo: { default: "" }, offInfo: { default: "" }, disabled: { type: Boolean, default: false }, checked: { type: Boolean, default: false }, nodeStyle: { default: () => ({}) } }, emits: ["update:checked", "change"], setup(l, { emit: a }) {
  const e = l, t = a;
  return (u, r) => (openBlock(), createElementBlock("div", Y4, [createBaseVNode("div", { onClick: r[0] || (r[0] = (c) => u.disabled ? () => false : (t("update:checked", !e.checked), void t("change", !e.checked))), class: normalizeClass(["m-switch", { "switch-checked": u.checked, disabled: u.disabled }]) }, [createBaseVNode("div", { class: normalizeClass(["u-switch-inner", u.checked ? "inner-checked" : "inner-unchecked"]) }, toDisplayString(u.checked ? u.onInfo : u.offInfo), 3), createBaseVNode("div", { class: normalizeClass(["u-node", { "node-checked": u.checked }]), style: normalizeStyle(u.nodeStyle) }, [renderSlot(u.$slots, "node", {}, void 0, true)], 6)], 2)]));
} }), [["__scopeId", "data-v-b0415d28"]]);
ja2.install = (l) => {
  l.component(ja2.__name, ja2);
};
var U4 = { class: "m-table-wrap" };
var K4 = { class: "m-table" };
var Z4 = { class: "m-tr" };
var G4 = { class: "m-body" };
var J4 = { class: "m-tr-loading" };
var X4 = { class: "m-tr-empty" };
var Q4 = ["colspan"];
var eo2 = ["title"];
var ao2 = { key: 1 };
var Va2 = V(defineComponent({ __name: "Table", props: { columns: { default: () => [] }, dataSource: { default: () => [] }, pagination: { default: () => ({ page: 1, pageSize: 10 }) }, showPagination: { type: Boolean, default: true }, hideOnSinglePage: { type: Boolean, default: false }, total: { default: 0 }, loading: { type: Boolean, default: false } }, emits: ["change"], setup(l, { emit: a }) {
  const e = a;
  function t(u) {
    e("change", u);
  }
  return (u, r) => (openBlock(), createElementBlock("div", U4, [createBaseVNode("table", K4, [createBaseVNode("thead", null, [createBaseVNode("tr", Z4, [(openBlock(true), createElementBlock(Fragment, null, renderList(u.columns, (c, s) => (openBlock(), createElementBlock("th", { class: "m-th", style: normalizeStyle(`width: ${typeof c.width == "number" ? c.width + "px" : c.width};`), key: s }, toDisplayString(c.title), 5))), 128))])]), createBaseVNode("tbody", G4, [withDirectives(createBaseVNode("tr", J4, [createVNode(unref(ce), { class: "m-loading", size: "small", colspan: u.columns.length }, null, 8, ["colspan"])], 512), [[vShow, u.loading]]), withDirectives(createBaseVNode("tr", X4, [createBaseVNode("td", { class: "m-td-empty", colspan: u.columns.length }, [createVNode(unref(He), { class: "empty", image: "2" })], 8, Q4)], 512), [[vShow, !u.total]]), (openBlock(true), createElementBlock(Fragment, null, renderList(u.dataSource, (c, s) => (openBlock(), createElementBlock("tr", { class: "m-tr", key: s }, [(openBlock(true), createElementBlock(Fragment, null, renderList(u.columns, (p, n) => (openBlock(), createElementBlock("td", { class: "m-td", key: n, title: c[p.dataIndex] }, [p.slot ? renderSlot(u.$slots, p.slot, mergeProps({ key: 0, ref_for: true }, c, { index: s }), () => [createTextVNode(toDisplayString(c[p.dataIndex] || "--"), 1)], true) : (openBlock(), createElementBlock("span", ao2, toDisplayString(c[p.dataIndex] || "--"), 1))], 8, eo2))), 128))]))), 128))])]), u.showPagination && u.total ? (openBlock(), createBlock(unref(Ue), { key: 0, class: "mt20", onChange: t, current: u.pagination.page, pageSize: u.pagination.pageSize, total: u.total, hideOnSinglePage: u.hideOnSinglePage, showQuickJumper: true, showTotal: true, placement: "right" }, null, 8, ["current", "pageSize", "total", "hideOnSinglePage"])) : createCommentVNode("", true)]));
} }), [["__scopeId", "data-v-bb4358d9"]]);
Va2.install = (l) => {
  l.component(Va2.__name, Va2);
};
var lo2 = { class: "m-tabs" };
var to2 = { class: "m-tabs-nav" };
var oo2 = ["onClick"];
var so2 = { class: "m-tabs-page" };
var Ra2 = V(defineComponent({ __name: "Tabs", props: { tabPages: { default: () => [] }, centered: { type: Boolean, default: false }, size: { default: "middle" }, type: { default: "line" }, gutter: { default: void 0 }, activeKey: { default: "" } }, emits: ["update:activeKey", "change"], setup(l, { emit: a }) {
  const e = l, t = ref(), u = ref(0), r = ref(0), c = ref(), s = ref(), p = ref(), n = ref(), h3 = ref(false), k = ref(0), M = ref(0), w = computed(() => e.tabPages.findIndex((y) => y.key === e.activeKey));
  watch(() => [e.tabPages, e.gutter, e.size, e.type], () => {
    ue(() => {
      m();
    }, 300);
  }, { deep: true, flush: "post" }), watch(() => e.activeKey, () => {
    e.type === "line" && b();
  }, { flush: "post" }), onMounted(() => {
    m();
  });
  const i = a;
  function b() {
    const y = t.value[w.value];
    y ? (u.value = y.offsetLeft, r.value = y.offsetWidth, h3.value && (u.value < M.value && (M.value = u.value), u.value + r.value - s.value > M.value && (M.value = u.value + r.value - s.value))) : (u.value = 0, r.value = 0);
  }
  function m() {
    s.value = c.value.offsetWidth, n.value = p.value.offsetWidth, n.value > s.value && (h3.value = true, k.value = n.value - s.value), e.type === "line" && b();
  }
  return (y, f) => (openBlock(), createElementBlock("div", lo2, [createBaseVNode("div", to2, [createBaseVNode("div", { ref_key: "wrap", ref: c, class: normalizeClass(["m-tabs-nav-wrap", { "tabs-center": y.centered, "before-shadow-active": M.value > 0, "after-shadow-active": M.value < k.value }]) }, [createBaseVNode("div", { ref_key: "nav", ref: p, class: "m-tabs-nav-list", onWheel: f[0] || (f[0] = (g) => h3.value ? function(z) {
    if (z.deltaX !== 0) {
      z.preventDefault();
      const $ = 1 * z.deltaX;
      M.value + $ > k.value ? M.value = k.value : M.value + $ < 0 ? M.value = 0 : M.value += $;
    }
  }(g) : () => false), style: normalizeStyle(`transform: translate(${-M.value}px, 0)`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(y.tabPages, (g, z) => (openBlock(), createElementBlock("div", { ref_for: true, ref_key: "tabs", ref: t, class: normalizeClass(["u-tab", [`u-tab-${y.size}`, { "u-tab-card": y.type === "card", "u-tab-disabled": g.disabled }, { "u-tab-line-active": y.activeKey === g.key && y.type === "line" }, { "u-tab-card-active": y.activeKey === g.key && y.type === "card" }]]), style: normalizeStyle(`margin-left: ${z !== 0 ? y.gutter : null}px;`), onClick: ($) => {
    return g.disabled ? () => false : (H = g.key, i("update:activeKey", H), void i("change", H));
    var H;
  }, key: z }, toDisplayString(g.tab), 15, oo2))), 128)), createBaseVNode("div", { class: normalizeClass(["u-tab-bar", { "u-card-hidden": y.type === "card" }]), style: normalizeStyle(`left: ${u.value}px; width: ${r.value}px;`) }, null, 6)], 36)], 2)]), createBaseVNode("div", so2, [(openBlock(true), createElementBlock(Fragment, null, renderList(y.tabPages, (g) => withDirectives((openBlock(), createElementBlock("div", { class: "m-tabs-content", key: g.key }, [renderSlot(y.$slots, g.key, {}, () => [createTextVNode(toDisplayString(g.content), 1)], true)])), [[vShow, y.activeKey === g.key]])), 128))])]));
} }), [["__scopeId", "data-v-fe00a524"]]);
Ra2.install = (l) => {
  l.component(Ra2.__name, Ra2);
};
var o1 = (l) => (pushScopeId("data-v-a9350280"), l = l(), popScopeId(), l);
var no2 = { key: 0, class: "m-icon" };
var io = { class: "u-tag" };
var uo = [o1(() => createBaseVNode("svg", { focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var co = { class: "u-tag" };
var ro2 = ["onClick"];
var vo = [o1(() => createBaseVNode("svg", { focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var po = [o1(() => createBaseVNode("svg", { focusable: "false", class: "u-plus", "data-icon": "plus", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }), createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })], -1))];
var Wa2 = V(defineComponent({ __name: "Tag", props: { closable: { type: Boolean, default: false }, color: { default: "" }, icon: { default: "" }, size: { default: "middle" }, bordered: { type: Boolean, default: true }, dynamic: { type: Boolean, default: false }, value: { default: () => [] }, spaceWidth: { default: "auto" }, spaceAlign: { default: "start" }, spaceDirection: { default: "horizontal" }, spaceSize: { default: "small" } }, emits: ["update:value", "close", "dynamicClose"], setup(l, { emit: a }) {
  const e = l, t = computed(() => {
    if (e.dynamic && e.value.length) {
      if (typeof e.value[0] == "string")
        return true;
      if (typeof e.value[0] == "object")
        return false;
    }
    return null;
  }), u = computed(() => e.dynamic && e.value.length ? t.value ? e.value.map((g) => ({ label: g, closable: true })) : e.value.map((g) => ({ closable: true, ...g })) : []), r = useSlots(), c = computed(() => {
    var g;
    if (!e.dynamic) {
      const z = (g = r.icon) == null ? void 0 : g.call(r);
      return z ? !!(z[0].children !== "v-if" && (z != null && z.length)) : e.icon;
    }
    return false;
  }), s = ref(), p = ref(false), n = ref(""), h3 = ["success", "processing", "error", "warning", "default", "pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"], k = ref(false), M = ref(), w = ref(Array(e.value.length).fill(1));
  watchEffect(() => {
    if (e.dynamic) {
      const g = e.value.length;
      w.value = Array(g).fill(1), nextTick(() => {
        if (M.value)
          for (let z = 0; z < g; z++)
            w.value[z] = M.value[z].offsetWidth;
      });
    }
  });
  const i = a;
  function b(g) {
    k.value = true, i("close", g);
  }
  function m() {
    p.value = true, nextTick(() => {
      s.value.focus();
    });
  }
  function y() {
    t.value ? i("update:value", [...e.value, n.value]) : i("update:value", [...e.value, { label: n.value }]), p.value = false, s.value = "";
  }
  function f(g) {
    g.key === "Enter" && s.value.blur();
  }
  return (g, z) => g.dynamic ? (openBlock(), createBlock(unref(Le), { key: 1, width: g.spaceWidth, align: g.spaceAlign, direction: g.spaceDirection, size: g.spaceSize }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(u.value, ($, H) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-tag", [`tag-${$.size || g.size}`, ($.color || g.color) && h3.includes($.color || g.color) ? "tag-" + ($.color || g.color) : "", { "tag-borderless": $.bordered !== void 0 && !$.bordered, "has-color": ($.color || g.color) && !h3.includes($.color || g.color) }]]), style: normalizeStyle(`background-color: ${!$.color && !g.color || h3.includes($.color || g.color) ? "" : $.color || g.color};`), key: H }, [withDirectives(createBaseVNode("span", { class: "m-icon", ref_for: true, ref_key: "tagsIconRef", ref: M }, [renderSlot(g.$slots, "icon", { index: H }, () => [createTextVNode(toDisplayString($.icon), 1)], true)], 512), [[vShow, w.value[H]]]), createBaseVNode("span", co, [renderSlot(g.$slots, "default", { label: $.label, index: H }, () => [createTextVNode(toDisplayString($.label), 1)], true)]), $.closable || g.closable ? (openBlock(), createElementBlock("span", { key: 0, class: "m-close", onClick: (S) => function(I, E) {
    const K3 = e.value.filter((ae, re) => re !== E);
    i("update:value", K3), i("dynamicClose", I, E);
  }($, H) }, vo, 8, ro2)) : createCommentVNode("", true)], 6))), 128)), p.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-tag", [`tag-${g.size}`, { "m-plus": g.dynamic }]]), onClick: m }, po, 2)), withDirectives(createBaseVNode("input", { ref_key: "inputRef", ref: s, class: normalizeClass(["u-input", `input-${g.size}`]), type: "text", "onUpdate:modelValue": z[0] || (z[0] = ($) => n.value = $), onBlur: z[1] || (z[1] = ($) => p.value = false), onChange: y, onKeydown: f }, null, 34), [[vShow, p.value], [vModelText, n.value]])]), _: 3 }, 8, ["width", "align", "direction", "size"])) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-tag", [`tag-${g.size}`, g.color && h3.includes(g.color) ? "tag-" + g.color : "", { "tag-borderless": !g.bordered, "has-color": g.color && !h3.includes(g.color), hidden: k.value }]]), style: normalizeStyle(`background-color: ${g.color && !h3.includes(g.color) ? g.color : ""};`) }, [c.value ? (openBlock(), createElementBlock("span", no2, [renderSlot(g.$slots, "icon", {}, () => [createTextVNode(toDisplayString(g.icon), 1)], true)])) : createCommentVNode("", true), createBaseVNode("span", io, [renderSlot(g.$slots, "default", {}, void 0, true)]), g.closable ? (openBlock(), createElementBlock("span", { key: 1, class: "m-close", onClick: b }, uo)) : createCommentVNode("", true)], 6));
} }), [["__scopeId", "data-v-a9350280"]]);
Wa2.install = (l) => {
  l.component(Wa2.__name, Wa2);
};
var fo = ["data-count"];
var ho = ["value", "maxlength", "disabled"];
var mo = [((l) => (pushScopeId("data-v-424cb57c"), l = l(), popScopeId(), l))(() => createBaseVNode("svg", { focusable: "false", class: "u-clear", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })], -1))];
var Na = V(defineComponent({ inheritAttrs: false, __name: "Textarea", props: { width: { default: "100%" }, allowClear: { type: Boolean, default: false }, autoSize: { type: [Boolean, Object], default: false }, disabled: { type: Boolean, default: false }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, value: { default: "" }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "enter"], setup(l, { emit: a }) {
  const e = l, t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), u = computed(() => {
    if (typeof e.autoSize == "object") {
      const i = { resize: "none" };
      return "minRows" in e.autoSize && (i["min-height"] = 22 * e.autoSize.minRows + 10 + "px"), "maxRows" in e.autoSize && (i["max-height"] = 22 * e.autoSize.maxRows + 10 + "px"), i;
    }
    if (typeof e.autoSize == "boolean")
      return e.autoSize ? { "max-height": "9000000000000000px", resize: "none" } : {};
  }), r = computed(() => e.maxlength ? e.value.length + " / " + e.maxlength : e.value.length);
  watch(() => e.value, () => {
    JSON.stringify(u.value) !== "{}" && (s.value = 32, nextTick(() => {
      p();
    }));
  });
  const c = ref(), s = ref(32);
  function p() {
    s.value = c.value.scrollHeight + 2;
  }
  onMounted(() => {
    p();
  });
  const n = a;
  function h3(i) {
    "lazy" in e.valueModifiers || (n("update:value", i.target.value), n("change", i));
  }
  function k(i) {
    "lazy" in e.valueModifiers && (n("update:value", i.target.value), n("change", i));
  }
  function M(i) {
    i.key === "Enter" && (i.preventDefault(), n("enter", i));
  }
  function w() {
    n("update:value", ""), c.value.focus();
  }
  return (i, b) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-textarea", { "show-count": i.showCount }]), style: normalizeStyle(`width: ${t.value};`), "data-count": r.value }, [createBaseVNode("textarea", mergeProps({ ref_key: "textarea", ref: c, type: "hidden", class: ["u-textarea", { disabled: i.disabled }], style: [`height: ${i.autoSize ? s.value : ""}px`, u.value], value: i.value, maxlength: i.maxlength, disabled: i.disabled, onInput: h3, onChange: k, onKeydown: M }, i.$attrs), null, 16, ho), !i.disabled && i.allowClear && i.value ? (openBlock(), createElementBlock("span", { key: 0, class: "m-clear", onClick: w }, mo)) : createCommentVNode("", true)], 14, fo));
} }), [["__scopeId", "data-v-424cb57c"]]);
Na.install = (l) => {
  l.component(Na.__name, Na);
};
var go = ["title", "href", "target", "onClick"];
var yo = ["title", "href", "target", "onClick"];
var Oa2 = V(defineComponent({ __name: "TextScroll", props: { scrollText: {}, single: { type: Boolean, default: false }, width: { default: "100%" }, height: { default: 60 }, fontSize: { default: 16 }, fontWeight: { default: 400 }, color: { default: "rgba(0, 0, 0, .88)" }, backgroundColor: { default: "#FFF" }, amount: { default: 4 }, gap: { default: 20 }, vertical: { type: Boolean, default: false }, interval: { default: 3e3 } }, emits: ["click"], setup(l, { emit: a }) {
  const e = l, t = ref(0), u = ref(0), r = ref(), c = ref(60), s = computed(() => e.single ? [e.scrollText, e.scrollText] : [...e.scrollText]), p = computed(() => s.value.length), n = computed(() => e.single ? 1 : e.amount), h3 = computed(() => c.value === 60 ? 1 : 60 / c.value);
  watch(() => [s, e.width, e.amount, e.gap, e.vertical, e.interval], () => {
    e.vertical ? ($.value && be2($.value), m()) : w();
  }, { deep: true, flush: "post" });
  const k = ref(), M = ref(0);
  function w() {
    const S = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var I = null;
    u.value = S(function E(K3) {
      if (I)
        return c.value = Math.floor(1e3 / (K3 - I)), console.log("fps", c.value), M.value = parseFloat((k.value.offsetWidth / n.value).toFixed(2)), void m();
      u.value > 10 && (I = K3), u.value = S(E);
    });
  }
  function i() {
    t.value >= M.value ? (s.value.push(s.value.shift()), t.value = 0) : t.value += h3.value, r.value = fe(i);
  }
  const b = computed(() => typeof e.width == "number" ? e.width + "px" : e.width);
  function m() {
    e.vertical ? p.value > 1 && H() : s.value.length > n.value && (r.value = fe(i));
  }
  function y() {
    e.vertical ? p.value > 1 && be2($.value) : e1(r.value);
  }
  onMounted(() => {
    e.vertical ? m() : w();
  });
  const f = a;
  function g(S) {
    f("click", S);
  }
  const z = ref(0);
  var $ = ref(null);
  function H() {
    $.value = ue(() => {
      z.value === p.value - 1 ? z.value = 0 : z.value++, H();
    }, e.interval);
  }
  return (S, I) => S.vertical ? (openBlock(), createElementBlock("div", { key: 1, class: "m-slider-vertical", onMouseenter: y, onMouseleave: m, style: normalizeStyle(`height: ${S.height}px; width: ${b.value}; background: ${S.backgroundColor}; --fontSize: ${S.fontSize}px; --fontWeight: ${S.fontWeight}; --color: ${S.color};`) }, [createVNode(TransitionGroup, { name: "slide" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (E, K3) => withDirectives((openBlock(), createElementBlock("div", { class: "m-slider", style: normalizeStyle(`width: calc(${b.value} - ${2 * S.gap}px); height: ${S.height}px;`), key: K3 }, [createBaseVNode("a", { class: "u-slider", title: E.title, href: E.link ? E.link : "javascript:;", target: E.link ? "_blank" : "_self", onClick: (ae) => g(E.title) }, toDisplayString(E.title || "--"), 9, yo)], 4)), [[vShow, z.value === K3]])), 128))]), _: 1 })], 36)) : (openBlock(), createElementBlock("div", { key: 0, ref_key: "horizonRef", ref: k, class: "m-slider-horizon", onMouseenter: y, onMouseleave: m, style: normalizeStyle(`height: ${S.height}px; width: ${b.value}; background: ${S.backgroundColor}; --fontSize: ${S.fontSize}px; --fontWeight: ${S.fontWeight}; --color: ${S.color};`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (E, K3) => (openBlock(), createElementBlock("a", { style: normalizeStyle(`will-change: transform; transform: translateX(${-t.value}px); width: ${M.value - S.gap}px; margin-left: ${S.gap}px;`), class: "u-slide-title", key: K3, title: E.title, href: E.link ? E.link : "javascript:;", target: E.link ? "_blank" : "_self", onClick: (ae) => g(E.title) }, toDisplayString(E.title || "--"), 13, go))), 128))], 36));
} }), [["__scopeId", "data-v-af1a5b9a"]]);
Oa2.install = (l) => {
  l.component(Oa2.__name, Oa2);
};
var bo = { class: "m-timeline" };
var qa = V(defineComponent({ __name: "Timeline", props: { timelineData: { default: () => [] }, width: { default: "100%" }, lineStyle: { default: "solid" }, mode: { default: "left" }, position: { default: "left" } }, setup(l) {
  const a = l, e = ref(), t = ref([]), u = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), r = computed(() => a.timelineData.length);
  return watchEffect(() => {
    (function() {
      for (let c = 0; c < r.value; c++)
        t.value[c] = getComputedStyle(e.value[c].firstElementChild || e.value[c], null).getPropertyValue("line-height");
    })();
  }, { flush: "post" }), watchEffect(() => {
    if (a.mode === "center")
      for (let c = 0; c < r.value; c++)
        (c + 1) % 2 ? a.position === "left" ? e.value[c].classList.add("alternate-left-desc") : e.value[c].classList.add("alternate-right-desc") : a.position === "left" ? e.value[c].classList.add("alternate-right-desc") : e.value[c].classList.add("alternate-left-desc");
  }, { flush: "post" }), (c, s) => (openBlock(), createElementBlock("div", { class: "m-timeline-area", style: normalizeStyle(`width: ${u.value};`) }, [createBaseVNode("div", bo, [(openBlock(true), createElementBlock(Fragment, null, renderList(c.timelineData, (p, n) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-timeline-item", { last: n === c.timelineData.length - 1 }]), key: n }, [createBaseVNode("span", { class: normalizeClass(`u-tail ${c.mode}-tail`), style: normalizeStyle(`border-left-style: ${c.lineStyle};`) }, null, 6), createBaseVNode("div", { class: normalizeClass(`m-dot ${c.mode}-dot`), style: normalizeStyle(`height: ${t.value[n]}`) }, [renderSlot(c.$slots, "dot", { index: n }, () => [p.color === "red" ? (openBlock(), createElementBlock("span", { key: 0, class: "u-dot", style: normalizeStyle({ borderColor: "#ff4d4f" }) }, null, 4)) : p.color === "gray" ? (openBlock(), createElementBlock("span", { key: 1, class: "u-dot", style: normalizeStyle({ borderColor: "#00000040" }) }, null, 4)) : p.color === "green" ? (openBlock(), createElementBlock("span", { key: 2, class: "u-dot", style: normalizeStyle({ borderColor: "#52c41a" }) }, null, 4)) : p.color === "blue" ? (openBlock(), createElementBlock("span", { key: 3, class: "u-dot", style: normalizeStyle({ borderColor: "#1677ff" }) }, null, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-dot", style: normalizeStyle({ borderColor: p.color || "#1677ff" }) }, null, 4))], true)], 6), createBaseVNode("div", { ref_for: true, ref_key: "desc", ref: e, class: normalizeClass(`u-desc ${c.mode}-desc`) }, [renderSlot(c.$slots, "desc", { index: n }, () => [createTextVNode(toDisplayString(p.desc || "--"), 1)], true)], 2)], 2))), 128))])], 4));
} }), [["__scopeId", "data-v-b7773841"]]);
qa.install = (l) => {
  l.component(qa.__name, qa);
};
var je = (l) => (pushScopeId("data-v-f6bbe87f"), l = l(), popScopeId(), l);
var ko = { class: "m-upload-list" };
var wo = { class: "m-upload" };
var xo = ["onDrop", "onClick"];
var Mo = ["accept", "multiple", "onChange"];
var zo = je(() => createBaseVNode("svg", { focusable: "false", class: "u-plus", "data-icon": "plus", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("defs"), createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }), createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })], -1));
var _o = { class: "u-tip" };
var Co = { class: "m-file-uploading" };
var $o = { key: 0, class: "m-file-preview" };
var Bo = { key: 1, class: "u-file", focusable: "false", "data-icon": "file-pdf", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Fo = [je(() => createBaseVNode("path", { d: "M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1))];
var So = { key: 2, class: "u-file", focusable: "false", "data-icon": "file", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Lo = [je(() => createBaseVNode("path", { d: "M534 352V136H232v752h560V394H576a42 42 0 01-42-42z", fill: "#e6f7ff" }, null, -1)), je(() => createBaseVNode("path", { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1))];
var Ao = { class: "m-file-mask" };
var Do = ["onClick"];
var Eo = [je(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "eye", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })], -1))];
var Ho = ["onClick"];
var Io = [je(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "delete", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" })], -1))];
var Pa2 = V(defineComponent({ __name: "Upload", props: { accept: { default: "*" }, multiple: { type: Boolean, default: false }, maxCount: { default: 1 }, tip: { default: "Upload" }, uploadingTip: { default: "Uploading" }, gap: { default: 8 }, fit: { default: "contain" }, errorInfo: { default: "" }, beforeUpload: { type: Function, default: () => true }, uploadMode: { default: "base64" }, customRequest: { type: Function, default: () => {
} }, disabled: { type: Boolean, default: false }, fileList: { default: () => [] } }, emits: ["update:fileList", "change", "remove"], setup(l, { emit: a }) {
  const e = l, t = ref([]), u = ref(1), r = ref(Array(e.maxCount).fill(false)), c = ref();
  function s(w) {
    return /\.(jpg|jpeg|png|gif)$/i.test(w) || /^data:image/.test(w);
  }
  watchEffect(() => {
    (function() {
      t.value = [...e.fileList], t.value.length > e.maxCount && t.value.splice(e.maxCount), e.disabled ? u.value = t.value.length : t.value.length < e.maxCount ? u.value = e.fileList.length + 1 : u.value = e.maxCount;
    })();
  });
  const p = a, n = function(w, i) {
    e.beforeUpload(w) ? (e.maxCount > u.value && u.value++, e.uploadMode === "base64" && (r.value[i] = true, function(b, m) {
      var y = new FileReader();
      y.readAsDataURL(b), y.onloadstart = function(f) {
        console.log("开始读取 onloadstart:", f);
      }, y.onabort = function(f) {
        console.log("读取中止 onabort:", f);
      }, y.onerror = function(f) {
        console.log("读取错误 onerror:", f);
      }, y.onprogress = function(f) {
        f.loaded === f.total && (r.value[m] = false);
      }, y.onload = function(f) {
        var g;
        t.value.push({ name: b.name, url: (g = f.target) == null ? void 0 : g.result }), p("update:fileList", t.value), p("change", t.value);
      }, y.onloadend = function(f) {
        console.log("读取结束 onloadend:", f);
      };
    }(w, i)), e.uploadMode === "custom" && (r.value[i] = true, function(b, m) {
      e.customRequest(b).then((y) => {
        t.value.push(y), p("update:fileList", t.value), p("change", t.value);
      }).catch((y) => {
        e.maxCount > 1 && (u.value = t.value.length + 1), M(y);
      }).finally(() => {
        r.value[m] = false;
      });
    }(w, i))) : nextTick(() => {
      M(e.errorInfo);
    });
  }, h3 = ref(), k = ref();
  function M(w) {
    k.value.error(w);
  }
  return (w, i) => (openBlock(), createElementBlock("div", ko, [createVNode(unref(Le), { size: w.gap }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(u.value, (b) => {
    return openBlock(), createElementBlock("div", { class: "m-upload-item", key: b }, [createBaseVNode("div", wo, [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-upload-wrap", { "upload-disabled": w.disabled }]), onDragenter: i[1] || (i[1] = withModifiers(() => {
    }, ["stop", "prevent"])), onDragover: i[2] || (i[2] = withModifiers(() => {
    }, ["stop", "prevent"])), onDrop: withModifiers((y) => w.disabled ? () => false : function(f, g) {
      var $;
      const z = ($ = f.dataTransfer) == null ? void 0 : $.files;
      if (z != null && z.length) {
        const H = z.length;
        for (let S = 0; S < H && g + S <= e.maxCount; S++)
          n(z[S], g + S);
        c.value[g].value = "";
      }
    }(y, b - 1), ["stop", "prevent"]), onClick: (y) => {
      return w.disabled ? () => false : (f = b - 1, void c.value[f].click());
      var f;
    } }, [createBaseVNode("input", { ref_for: true, ref_key: "uploadInput", ref: c, type: "file", onClick: i[0] || (i[0] = withModifiers(() => {
    }, ["stop"])), accept: w.accept, multiple: w.multiple, onChange: (y) => function(f, g) {
      const z = f.target.files;
      if (z != null && z.length) {
        const $ = z.length;
        for (let H = 0; H < $ && g + H < e.maxCount; H++)
          n(z[H], g + H);
        c.value[g].value = "";
      }
    }(y, b - 1), style: { display: "none" } }, null, 40, Mo), createBaseVNode("div", null, [zo, createBaseVNode("p", _o, [renderSlot(w.$slots, "default", {}, () => [createTextVNode(toDisplayString(w.tip), 1)], true)])])], 42, xo), [[vShow, !r.value[b - 1] && !t.value[b - 1]]]), withDirectives(createBaseVNode("div", Co, [createVNode(unref(ce), { class: "u-spin", tip: w.uploadingTip, size: "small", indicator: "dynamic-circle" }, null, 8, ["tip"])], 512), [[vShow, r.value[b - 1]]]), t.value[b - 1] ? (openBlock(), createElementBlock("div", $o, [s(t.value[b - 1].url) ? (openBlock(), createBlock(unref(Pe), { key: 0, ref_for: true, ref_key: "imageRef", ref: h3, bordered: false, width: 82, height: 82, src: t.value[b - 1].url, name: t.value[b - 1].name }, null, 8, ["src", "name"])) : (m = t.value[b - 1].url, /\.pdf$/i.test(m) || /^data:application\/pdf/.test(m) ? (openBlock(), createElementBlock("svg", Bo, Fo)) : (openBlock(), createElementBlock("svg", So, Lo))), createBaseVNode("div", Ao, [createBaseVNode("a", { class: "m-icon", title: "预览", onClick: (y) => function(f, g) {
      if (console.log("isImage", s(g)), s(g)) {
        const z = t.value.slice(0, f).filter(($) => !s($.url));
        h3.value[f - z.length].onPreview(0);
      } else
        window.open(g);
    }(b - 1, t.value[b - 1].url) }, Eo, 8, Do), withDirectives(createBaseVNode("a", { class: "m-icon", title: "删除", onClick: withModifiers((y) => function(f) {
      t.value.length < e.maxCount && u.value--;
      const g = t.value.splice(f, 1);
      p("remove", g), p("update:fileList", t.value), p("change", t.value);
    }(b - 1), ["prevent", "stop"]) }, Io, 8, Ho), [[vShow, !w.disabled]])])])) : createCommentVNode("", true)])]);
    var m;
  }), 128))]), _: 3 }, 8, ["size"]), createVNode(unref(Ye), { ref_key: "message", ref: k, duration: 3e3, top: 30 }, null, 512)]));
} }), [["__scopeId", "data-v-f6bbe87f"]]);
Pa2.install = (l) => {
  l.component(Pa2.__name, Pa2);
};
var To = ["src", "poster", "width", "height", "autoplay", "controls", "loop", "muted", "preload"];
var jo = [((l) => (pushScopeId("data-v-2a50470f"), l = l(), popScopeId(), l))(() => createBaseVNode("svg", { class: "u-svg", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 34 34" }, [createBaseVNode("path", { d: `M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039
          C31.913,19.675,31.913,14.325,28.26,11.961z` })], -1))];
var Ya = V(defineComponent({ __name: "Video", props: { src: { default: "" }, poster: { default: "" }, second: { default: 0.5 }, width: { default: 800 }, height: { default: 450 }, autoplay: { type: Boolean, default: false }, controls: { type: Boolean, default: true }, loop: { type: Boolean, default: false }, muted: { type: Boolean, default: false }, preload: { default: "metadata" }, showPlay: { type: Boolean, default: true }, fit: { default: "contain" } }, setup(l) {
  const a = l, e = ref(a.poster), t = ref(true), u = ref(false), r = ref();
  function c() {
    var s, p;
    t.value && (r.value.currentTime = 0, t.value = false), a.autoplay ? (s = r.value) == null || s.pause() : (u.value = true, (p = r.value) == null || p.play());
  }
  return onMounted(() => {
    a.autoplay && (u.value = true, t.value = false);
  }), (s, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-video", { "u-video-hover": !u.value }]), style: normalizeStyle(`width: ${s.width}px; height: ${s.height}px;`) }, [createBaseVNode("video", mergeProps({ ref_key: "veo", ref: r, style: `object-fit: ${s.fit};`, src: s.src, poster: e.value, width: s.width, height: s.height, autoplay: s.autoplay, controls: !t.value && s.controls, loop: s.loop, muted: s.autoplay || s.muted, preload: s.preload, crossorigin: "anonymous", onLoadedmetadata: p[0] || (p[0] = (n) => s.poster ? () => false : function() {
    r.value.currentTime = a.second;
    const h3 = document.createElement("canvas"), k = h3.getContext("2d");
    h3.width = r.value.videoWidth, h3.height = r.value.videoHeight, k == null || k.drawImage(r.value, 0, 0, h3.width, h3.height), e.value = h3.toDataURL("image/png");
  }()), onPause: p[1] || (p[1] = (n) => s.showPlay ? void (u.value = false) : () => false), onPlaying: p[2] || (p[2] = (n) => s.showPlay ? void (u.value = true) : () => false), onClickOnce: withModifiers(c, ["prevent"]) }, s.$attrs), " 您的浏览器不支持video标签。 ", 16, To), withDirectives(createBaseVNode("span", { class: normalizeClass(["m-icon-play", { hidden: u.value }]) }, jo, 2), [[vShow, t.value || s.showPlay]])], 6));
} }), [["__scopeId", "data-v-2a50470f"]]);
Ya.install = (l) => {
  l.component(Ya.__name, Ya);
};
var Vo = ["src", "alt", "onLoad"];
var Ua2 = V(defineComponent({ __name: "Waterfall", props: { images: { default: () => [] }, columnCount: { default: 3 }, columnGap: { default: 20 }, width: { default: "100%" }, borderRadius: { default: 8 }, backgroundColor: { default: "#F2F4F8" } }, setup(l) {
  const a = l, e = ref([]), t = ref(Array(a.columnCount).fill(0)), u = shallowRef(), r = ref(), c = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), s = computed(() => Math.max(...t.value) + a.columnGap), p = computed(() => a.images.length), n = ref(Array(p.value)), h3 = ref(false);
  async function k() {
    r.value = (u.value.offsetWidth - (a.columnCount + 1) * a.columnGap) / a.columnCount, e.value.splice(0);
    for (let i = 0; i < p.value; i++)
      await M(a.images[i].src, i);
  }
  function M(i, b) {
    return new Promise((m) => {
      const y = new Image();
      y.src = i, y.onload = function() {
        h3.value || (n.value[b] = false);
        var f = y.height / (y.width / r.value);
        e.value[b] = { width: r.value, height: f, ...w(b, f) }, m("load");
      };
    });
  }
  function w(i, b) {
    if (i < a.columnCount)
      return t.value[i] = a.columnGap + b, { top: a.columnGap, left: (r.value + a.columnGap) * i + a.columnGap };
    {
      const m = Math.min(...t.value);
      let y = 0;
      for (let f = 0; f < a.columnCount; f++)
        if (t.value[f] === m) {
          y = f;
          break;
        }
      return t.value[y] = m + a.columnGap + b, { top: m + a.columnGap, left: (r.value + a.columnGap) * y + a.columnGap };
    }
  }
  return watch(() => [a.columnCount, a.columnGap, a.width], () => {
    h3.value = true, t.value = Array(a.columnCount).fill(0), k();
  }, { deep: true, flush: "post" }), watchPostEffect(() => {
    a.images.length && k();
  }), (i, b) => (openBlock(), createElementBlock("div", { class: "m-waterfall", ref_key: "waterfall", ref: u, style: normalizeStyle(`--borderRadius: ${i.borderRadius}px; background-color: ${i.backgroundColor}; width: ${c.value}; height: ${s.value}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(e.value, (m, y) => withDirectives((openBlock(), createBlock(unref(ce), { class: "m-image", style: normalizeStyle(`width: ${m.width}px; height: ${m.height}px; top: ${m && m.top}px; left: ${m && m.left}px;`), spinning: !n.value[y], size: "small", indicator: "dynamic-circle", key: y }, { default: withCtx(() => [createBaseVNode("img", { class: "u-image", src: i.images[y].src, alt: i.images[y].title, onLoad: (f) => function(g) {
    n.value[g] = true;
  }(y) }, null, 40, Vo)]), _: 2 }, 1032, ["style", "spinning"])), [[vShow, n.value[y] !== void 0]])), 128))], 4));
} }), [["__scopeId", "data-v-9762d446"]]);
Ua2.install = (l) => {
  l.component(Ua2.__name, Ua2);
};
var Ka2 = defineComponent({ __name: "Watermark", props: { width: { default: void 0 }, height: { default: void 0 }, layout: { default: "alternate" }, rotate: { default: -22 }, zIndex: { default: 9 }, image: { default: void 0 }, content: { default: "" }, fullscreen: { type: Boolean, default: false }, color: { default: "rgba(0,0,0,.15)" }, fontSize: { default: 16 }, fontWeight: { default: "normal" }, fontFamily: { default: "sans-serif" }, fontStyle: { default: "normal" }, gap: { default: () => [100, 100] }, offset: { default: () => [50, 50] } }, setup(l) {
  const a = l, e = shallowRef(), t = shallowRef(), u = shallowRef(document.documentElement), r = shallowRef(false), c = computed(() => {
    var z;
    return ((z = a.gap) == null ? void 0 : z[0]) ?? 100;
  }), s = computed(() => {
    var z;
    return ((z = a.gap) == null ? void 0 : z[1]) ?? 100;
  }), p = computed(() => c.value / 2), n = computed(() => s.value / 2), h3 = computed(() => {
    var z;
    return ((z = a.offset) == null ? void 0 : z[0]) ?? p.value;
  }), k = computed(() => {
    var z;
    return ((z = a.offset) == null ? void 0 : z[1]) ?? n.value;
  }), M = computed(() => ({ parallel: 1, alternate: 2 })[a.layout]), w = computed(() => {
    const z = { zIndex: a.zIndex ?? 9, position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", backgroundRepeat: "repeat" };
    let $ = h3.value - p.value, H = k.value - n.value;
    return $ > 0 && (z.left = `${$}px`, z.width = `calc(100% - ${$}px)`, $ = 0), H > 0 && (z.top = `${H}px`, z.height = `calc(100% - ${H}px)`, H = 0), z.backgroundPosition = `${$}px ${H}px`, z;
  });
  function i() {
    t.value && (t.value.remove(), t.value = void 0);
  }
  function b(z, $) {
    var S;
    var H;
    e.value && t.value && (r.value = true, t.value.setAttribute("style", (H = { ...w.value, backgroundImage: `url('${z}')`, backgroundSize: (c.value + $) * M.value + "px" }, Object.keys(H).map((I) => `${function(E) {
      return E.replace(/([A-Z])/g, "-$1").toLowerCase();
    }(I)}: ${H[I]};`).join(" "))), a.fullscreen ? (u.value.setAttribute("style", "position: relative"), u.value.append(t.value)) : (S = e.value) == null || S.append(t.value), setTimeout(() => {
      r.value = false;
    }));
  }
  function m() {
    return window.devicePixelRatio || 1;
  }
  function y(z, $, H, S, I) {
    const E = m(), K3 = a.content, ae = a.fontSize, re = a.fontWeight, we = a.fontFamily, xe = a.fontStyle, ve = a.color, ie = Number(ae) * E;
    z.font = `${xe} normal ${re} ${ie}px/${I}px ${we}`, z.fillStyle = ve, z.textAlign = "center", z.textBaseline = "top", z.translate(S / 2, 0);
    const pe = Array.isArray(K3) ? K3 : [K3];
    pe == null || pe.forEach((D, q) => {
      z.fillText(D ?? "", $, H + q * (ie + 3 * E));
    });
  }
  function f() {
    const z = document.createElement("canvas"), $ = z.getContext("2d"), H = a.image, S = a.rotate ?? -22;
    if ($) {
      t.value || (t.value = document.createElement("div"));
      const I = m(), [E, K3] = function(Q) {
        let ze = 120, Ve = 64;
        const De = a.content, Je2 = a.image, Xe = a.width, Qe2 = a.height, Re2 = a.fontSize, Fe2 = a.fontFamily;
        if (!Je2 && Q.measureText) {
          Q.font = `${Number(Re2)}px ${Fe2}`;
          const _e2 = Array.isArray(De) ? De : [De], ea = _e2.map((g1) => Q.measureText(g1).width);
          ze = Math.ceil(Math.max(...ea)), Ve = Number(Re2) * _e2.length + 3 * (_e2.length - 1);
        }
        return [Xe ?? ze, Qe2 ?? Ve];
      }($), ae = (c.value + E) * I, re = (s.value + K3) * I;
      z.setAttribute("width", ae * M.value + "px"), z.setAttribute("height", re * M.value + "px");
      const we = c.value * I / 2, xe = s.value * I / 2, ve = E * I, ie = K3 * I, pe = (ve + c.value * I) / 2, D = (ie + s.value * I) / 2, q = we + ae, Z = xe + re, le = pe + ae, te = D + re;
      if ($.save(), g($, pe, D, S), H) {
        const Q = new Image();
        Q.onload = () => {
          $.drawImage(Q, we, xe, ve, ie), $.restore(), g($, le, te, S), $.drawImage(Q, q, Z, ve, ie), b(z.toDataURL(), E);
        }, Q.crossOrigin = "anonymous", Q.referrerPolicy = "no-referrer", Q.src = H;
      } else
        y($, we, xe, ve, ie), $.restore(), g($, le, te, S), y($, q, Z, ve, ie), b(z.toDataURL(), E);
    }
  }
  function g(z, $, H, S) {
    z.translate($, H), z.rotate(Math.PI / 180 * Number(S)), z.translate(-$, -H);
  }
  return onMounted(() => {
    f();
  }), watch(() => [a], () => {
    f();
  }, { deep: true, flush: "post" }), onBeforeUnmount(() => {
    i();
  }), function(z, $, H) {
    let S;
    const I = () => {
      S && (S.disconnect(), S = void 0);
    }, E = watch(() => unref(z), (K3) => {
      I(), window && K3 && (S = new MutationObserver($), S.observe(K3, H));
    }, { immediate: true });
  }(a.fullscreen ? u : e, function(z) {
    r.value || z.forEach(($) => {
      (function(H, S) {
        let I = false;
        return H.removedNodes.length && (I = Array.from(H.removedNodes).some((E) => E === S)), H.type === "attributes" && H.target === S && (I = true), I;
      })($, t.value) && (i(), f());
    });
  }, { subtree: true, childList: true, attributes: true, attributeFilter: ["style", "class"] }), (z, $) => (openBlock(), createElementBlock("div", { ref_key: "containerRef", ref: e, style: { position: "relative" } }, [renderSlot(z.$slots, "default")], 512));
} });
Ka2.install = (l) => {
  l.component(Ka2.__name, Ka2);
};
var Ro = [aa2, la, ta, oa2, sa2, Me, na, ia2, ua2, ca, da, ra2, va, pa, fa, ha, ma, ga, ya, ba, He, ka2, Pe, wa2, xa, Ye, Ma2, za2, _a, Ue, Ca2, $a2, Ba2, Fa2, Sa2, La2, Aa2, Da2, Se2, Ea2, Le, ce, Ha2, Ia, Ta2, ja2, Va2, Ra2, Wa2, Na, Oa2, qa, qe, Pa2, Ya, Ua2, Ka2];
var Qo = { install: (l) => {
  Ro.forEach((a) => l.component(a.__name, a));
} };
export {
  aa2 as Alert,
  la as Avatar,
  ta as BackTop,
  oa2 as Badge,
  sa2 as Breadcrumb,
  Me as Button,
  na as Card,
  ia2 as Carousel,
  ua2 as Cascader,
  ca as Checkbox,
  da as Col,
  ra2 as Collapse,
  va as Countdown,
  pa as DatePicker,
  fa as Descriptions,
  ha as DescriptionsItem,
  ma as Dialog,
  ga as Divider,
  ya as Drawer,
  ba as Ellipsis,
  He as Empty,
  ka2 as Flex,
  Pe as Image,
  wa2 as Input,
  xa as InputNumber,
  Ye as Message,
  Ma2 as Modal,
  za2 as Notification,
  _a as NumberAnimation,
  Ue as Pagination,
  Ca2 as Popconfirm,
  $a2 as Popover,
  Ba2 as Progress,
  Fa2 as QRCode,
  Sa2 as Radio,
  La2 as Rate,
  Aa2 as Result,
  Da2 as Row,
  Se2 as Select,
  Ea2 as Slider,
  Le as Space,
  ce as Spin,
  Ha2 as Statistic,
  Ia as Steps,
  Ta2 as Swiper,
  ja2 as Switch,
  Va2 as Table,
  Ra2 as Tabs,
  Wa2 as Tag,
  Oa2 as TextScroll,
  Na as Textarea,
  qa as Timeline,
  qe as Tooltip,
  Pa2 as Upload,
  Ya as Video,
  Ua2 as Waterfall,
  Ka2 as Watermark,
  Go as add,
  e1 as cancelAnimationFrame,
  be2 as cancelRaf,
  Uo as dateFormat,
  Zo as debounce,
  Qo as default,
  Jo as downloadFile,
  _1 as formatNumber,
  ue as rafTimeout,
  fe as requestAnimationFrame,
  Ko as throttle,
  Xo as toggleDark
};
//# sourceMappingURL=vue-amazing-ui.js.map
