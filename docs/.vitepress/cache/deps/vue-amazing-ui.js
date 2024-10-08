import {
  TransitionPresets,
  isClient,
  toRef as toRef2,
  useTransition
} from "./chunk-WYXPEXRY.js";
import "./chunk-FWXUNOVW.js";
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
  provide,
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
  vModelText,
  vShow,
  watch,
  watchEffect,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-DNZWIXCN.js";
import {
  __commonJS,
  __publicField,
  __toESM
} from "./chunk-EQCVQC35.js";

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/can-promise.js"(exports, module) {
    module.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/galois-field.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/polynomial.js"(exports) {
    var GF = require_galois_field();
    exports.mul = function mul(p12, p2) {
      const coeff = new Uint8Array(p12.length + p2.length - 1);
      for (let i = 0; i < p12.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i + j] ^= GF.mul(p12[i], p2[j]);
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version-check.js"(exports) {
    exports.isValid = function isValid2(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/regex.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/format-info.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        this.data = new TextEncoder().encode(data);
      } else {
        this.data = new Uint8Array(data);
      }
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/segments.js"(exports) {
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
      return segs.sort(function(s12, s2) {
        return s12.index - s2.index;
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/qrcode.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utils.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/canvas.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
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

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/browser.js"(exports) {
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

// node_modules/.pnpm/@vuepic+vue-datepicker@9.0.3_vue@3.5.8/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
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
function Mn() {
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
Mn.compatConfig = {
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
var fl = (e, t, l) => {
  const a = t.dateInTz ? qe(new Date(e), t.dateInTz) : G(e);
  return l ? Ge(a, true) : a;
};
var Na = (e, t, l) => {
  if (!e) return null;
  const a = l ? Ge(G(e), true) : G(e);
  return t ? t.exactMatch ? fl(e, t, l) : qe(a, t.timezone) : a;
};
var vl = (e) => {
  if (!e) return 0;
  const t = /* @__PURE__ */ new Date(), l = new Date(t.toLocaleString("en-US", { timeZone: "UTC" })), a = new Date(t.toLocaleString("en-US", { timeZone: e })), n = a.getTimezoneOffset() / 60;
  return (+l - +a) / (1e3 * 60 * 60) - n;
};
var nt = ((e) => (e.month = "month", e.year = "year", e))(nt || {});
var Mt = ((e) => (e.top = "top", e.bottom = "bottom", e))(Mt || {});
var Tt = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(Tt || {});
var He = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(He || {});
var ml = ["timestamp", "date", "iso"];
var je = ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(je || {});
var Pe = ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Pe || {});
function ln(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function pl(e) {
  return (t) => format(qe(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "UTC"), "EEEEEE", { locale: e });
}
var yl = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e !== null)
    try {
      n = a.map(pl(e));
    } catch {
      n = a.map(ln(t));
    }
  else
    n = a.map(ln(t));
  const i = n.slice(0, l), d = n.slice(l + 1, n.length);
  return [n[l]].concat(...d).concat(...i);
};
var Ka = (e, t, l) => {
  const a = [];
  for (let n = +e[0]; n <= +e[1]; n++)
    a.push({ value: +n, text: Sn(n, t) });
  return l ? a.reverse() : a;
};
var $n = (e, t, l) => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
    const d = i < 10 ? `0${i}` : i;
    return /* @__PURE__ */ new Date(`2017-${d}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const i = l === "long" ? "LLLL" : "LLL";
      return a.map((d, b) => {
        const c = format(qe(d, "UTC"), i, { locale: e });
        return {
          text: c.charAt(0).toUpperCase() + c.substring(1),
          value: b
        };
      });
    } catch {
    }
  const n = new Intl.DateTimeFormat(t, { month: l, timeZone: "UTC" });
  return a.map((i, d) => {
    const b = n.format(i);
    return {
      text: b.charAt(0).toUpperCase() + b.substring(1),
      value: d
    };
  });
};
var gl = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ie = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var hl = (e) => ({ type: "dot", ...e ?? {} });
var An = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Ga = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Ye = (e) => e;
var rn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var on = (e) => e === null;
var Tn = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var bl = (e) => {
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
  const i = +l, d = +t;
  return a && n ? +e > i || +e < d : a ? +e > i : n ? +e < d : false;
};
var Yt = (e, t) => bl(e).map((l) => l.map((a) => {
  const { active: n, disabled: i, isBetween: d, highlighted: b } = t(a);
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
      dp__cell_in_between: d,
      "dp--highlighted": b
    }
  };
}));
var yt = (e, t, l = false) => {
  e && t.allowStopPropagation && (l && e.stopImmediatePropagation(), e.stopPropagation());
};
var kl = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function wl(e, t) {
  let l = [...document.querySelectorAll(kl())];
  l = l.filter((n) => !e.contains(n) || n.hasAttribute("data-datepicker-instance"));
  const a = l.indexOf(e);
  if (a >= 0 && (t ? a - 1 >= 0 : a + 1 <= l.length))
    return l[a + (t ? -1 : 1)];
}
var Ea = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var Sn = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var Qa = (e) => format(e, "dd-MM-yyyy");
var $a = (e) => Array.isArray(e);
var sa = (e, t) => t.get(Qa(e));
var Dl = (e, t) => e ? t ? t instanceof Map ? !!sa(e, t) : t(G(e)) : false : true;
var Ke = (e, t, l = false, a) => {
  if (e.key === Pe.enter || e.key === Pe.space)
    return l && e.preventDefault(), t();
  if (a) return a(e);
};
var sn = () => ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].some(
  (e) => navigator.userAgent.includes(e)
) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
var un = (e, t, l, a, n, i) => {
  const d = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: i });
  return isValid(d) && isDate(d) ? a || n ? d : set(d, {
    hours: +l.hours,
    minutes: +(l == null ? void 0 : l.minutes),
    seconds: +(l == null ? void 0 : l.seconds),
    milliseconds: 0
  }) : null;
};
var Ml = (e, t, l, a, n, i) => {
  const d = Array.isArray(l) ? l[0] : l;
  if (typeof t == "string")
    return un(e, t, d, a, n, i);
  if (Array.isArray(t)) {
    let b = null;
    for (const c of t)
      if (b = un(e, c, d, a, n, i), b)
        break;
    return b;
  }
  return typeof t == "function" ? t(e) : null;
};
var G = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var $l = (e, t, l) => {
  if (t) {
    const n = (e.getMonth() + 1).toString().padStart(2, "0"), i = e.getDate().toString().padStart(2, "0"), d = e.getHours().toString().padStart(2, "0"), b = e.getMinutes().toString().padStart(2, "0"), c = l ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${n}-${i}T${d}:${b}:${c}.000Z`;
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
var Pn = (e, t) => {
  if (t) {
    const l = getYear(G(t));
    if (l > e) return 12;
    if (l === e) return getMonth(G(t));
  }
};
var Rn = (e, t) => {
  if (t) {
    const l = getYear(G(t));
    return l < e ? -1 : l === e ? getMonth(G(t)) : void 0;
  }
};
var It = (e) => {
  if (e) return getYear(G(e));
};
var Cn = (e, t) => {
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
var On = (e, t) => {
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
var _n = (e, t, l, a, n) => {
  if (!a || n && !t || !n && !l) return false;
  const i = n ? addMonths(e, 1) : subMonths(e, 1), d = [getMonth(i), getYear(i)];
  return n ? !Sl(...d, t) : !Tl(...d, l);
};
var Tl = (e, t, l) => Oe(...pt(l, e, t)) || Me(...pt(l, e, t));
var Sl = (e, t, l) => Be(...pt(l, e, t)) || Me(...pt(l, e, t));
var Bn = (e, t, l, a, n, i, d) => {
  if (typeof t == "function" && !d) return t(e);
  const b = l ? { locale: l } : void 0;
  return Array.isArray(e) ? `${format(e[0], i, b)}${n && !e[1] ? "" : a}${e[1] ? format(e[1], i, b) : ""}` : format(e, i, b);
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
var dn = (e, t, l, a, n) => {
  if (Array.isArray(a)) {
    const d = Sa(e, a[0], t), b = Sa(e, a[1], t);
    return Ta(a[0], d, l, !!t) && Ta(a[1], b, l, !!t) && n;
  }
  const i = Sa(e, a, t);
  return Ta(a, i, l, !!t) && n;
};
var Pa = (e) => set(G(), St(e));
var Rl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((l) => getYear(G(l)) === t).map((l) => getMonth(l)) : [];
var Yn = (e, t, l) => typeof e == "function" ? e({ month: t, year: l }) : !!e.months.find((a) => a.month === t && a.year === l);
var qa = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var In = (e) => format(e, "yyyy-MM-dd");
var Ht = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Nn = () => {
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
  }, d = () => {
    l(false), a(true);
  }, b = () => {
    l(true), a(true);
  }, c = (f, B) => {
    Se[B] = f;
  }, L = (f, B) => {
    Se[B] = f;
  }, v = () => {
    ze.value = 0, _e.value = 0;
  };
  return {
    buildMatrix: c,
    buildMultiLevelMatrix: L,
    setTimePickerBackRef: (f) => {
      Ra.value = f;
    },
    setSelectionGrid: (f) => {
      aa.value = f, v(), f || (Se.selectionGrid = []);
    },
    setTimePicker: (f, B = false) => {
      Ca.value = f, _a.value = B, v(), f || (Se.timePicker[0] = [], Se.timePicker[1] = []);
    },
    setTimePickerElements: (f, B = 0) => {
      Se.timePicker[B] = f;
    },
    arrowRight: n,
    arrowLeft: i,
    arrowUp: d,
    arrowDown: b,
    clearArrowNav: () => {
      Se.monthYear = [], Se.calendar = [], Se.time = [], Se.actionRow = [], Se.selectionGrid = [], Se.timePicker[0] = [], Se.timePicker[1] = [], aa.value = false, Ca.value = false, _a.value = false, Oa.value = false, v(), Ra.value = null;
    },
    setMonthPicker: (f) => {
      Oa.value = f, v();
    },
    refSets: Se
    // exposed for testing
  };
};
var cn = (e) => ({
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
var fn = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var Ol = (e) => {
  const t = typeof e == "object" && e, l = {
    static: true,
    solo: false
  };
  if (!e) return { ...l, count: fn(false) };
  const a = t ? e : {}, n = t ? a.count ?? true : e, i = fn(n);
  return Object.assign(l, a, { count: i });
};
var _l = (e, t, l) => e || (typeof l == "string" ? l : t);
var Bl = (e) => typeof e == "boolean" ? e ? cn({}) : false : cn(e);
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
      const a = l, n = e[a], i = typeof e[a] == "string" ? { [n]: true } : Object.fromEntries(n.map((d) => [d, true]));
      return [l, i];
    })
  )
});
var Ce = (e) => {
  const t = () => {
    const oe = e.enableSeconds ? ":ss" : "", ee = e.enableMinutes ? ":mm" : "";
    return e.is24 ? `HH${ee}${oe}` : `hh${ee}${oe} aa`;
  }, l = () => {
    var oe;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((oe = U.value) == null ? void 0 : oe.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, a = (oe) => On(oe, e.enableSeconds), n = () => Q.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [a(e.startTime[0]), a(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? a(e.startTime) : null, i = computed(() => Ol(e.multiCalendars)), d = computed(() => n()), b = computed(() => Cl(e.ariaLabels)), c = computed(() => Il(e.filters)), L = computed(() => Bl(e.transitions)), v = computed(() => Nl(e.actionRow)), _ = computed(
    () => _l(e.previewFormat, e.format, l())
  ), h2 = computed(() => Yl(e.textInput)), C = computed(() => El(e.inline)), H = computed(() => Fl(e.config)), E = computed(() => Ll(e.highlight)), U = computed(() => zl(e.weekNumbers)), f = computed(() => Ul(e.timezone)), B = computed(() => jl(e.multiDates)), P = computed(
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
  ), Q = computed(() => Hl(e.range)), ae = computed(() => Kl(e.ui));
  return {
    defaultedTransitions: L,
    defaultedMultiCalendars: i,
    defaultedStartTime: d,
    defaultedAriaLabels: b,
    defaultedFilters: c,
    defaultedActionRow: v,
    defaultedPreviewFormat: _,
    defaultedTextInput: h2,
    defaultedInline: C,
    defaultedConfig: H,
    defaultedHighlight: E,
    defaultedWeekNumbers: U,
    defaultedRange: Q,
    propDates: P,
    defaultedTz: f,
    defaultedMultiDates: B,
    defaultedUI: ae,
    getDefaultPattern: l,
    getDefaultStartTime: n
  };
};
var Gl = (e, t, l) => {
  const a = ref(), { defaultedTextInput: n, defaultedRange: i, defaultedTz: d, defaultedMultiDates: b, getDefaultPattern: c } = Ce(t), L = ref(""), v = toRef(t, "format"), _ = toRef(t, "formatLocale");
  watch(
    a,
    () => {
      typeof t.onInternalModelChange == "function" && e("internal-model-change", a.value, M(true));
    },
    { deep: true }
  ), watch(i, (u, le) => {
    u.enabled !== le.enabled && (a.value = null);
  }), watch(v, () => {
    X();
  });
  const h2 = (u) => d.value.timezone && d.value.convertModel ? qe(u, d.value.timezone) : u, C = (u) => {
    if (d.value.timezone && d.value.convertModel) {
      const le = vl(d.value.timezone);
      return addHours(u, le);
    }
    return u;
  }, H = (u, le, me = false) => Bn(
    u,
    t.format,
    t.formatLocale,
    n.value.rangeSeparator,
    t.modelAuto,
    le ?? c(),
    me
  ), E = (u) => u ? t.modelType ? p(u) : {
    hours: getHours(u),
    minutes: getMinutes(u),
    seconds: t.enableSeconds ? getSeconds(u) : 0
  } : null, U = (u) => t.modelType ? p(u) : { month: getMonth(u), year: getYear(u) }, f = (u) => Array.isArray(u) ? b.value.enabled ? u.map((le) => B(le, setYear(G(), le))) : ta(
    () => [
      setYear(G(), u[0]),
      u[1] ? setYear(G(), u[1]) : Rt(i.value.partialRange)
    ],
    i.value.enabled
  ) : setYear(G(), +u), B = (u, le) => (typeof u == "string" || typeof u == "number") && t.modelType ? A(u) : le, P = (u) => Array.isArray(u) ? [
    B(
      u[0],
      gt(null, +u[0].hours, +u[0].minutes, u[0].seconds)
    ),
    B(
      u[1],
      gt(null, +u[1].hours, +u[1].minutes, u[1].seconds)
    )
  ] : B(u, gt(null, u.hours, u.minutes, u.seconds)), Q = (u) => {
    const le = set(G(), { date: 1 });
    return Array.isArray(u) ? b.value.enabled ? u.map((me) => B(me, dt(le, +me.month, +me.year))) : ta(
      () => [
        B(u[0], dt(le, +u[0].month, +u[0].year)),
        B(
          u[1],
          u[1] ? dt(le, +u[1].month, +u[1].year) : Rt(i.value.partialRange)
        )
      ],
      i.value.enabled
    ) : B(u, dt(le, +u.month, +u.year));
  }, ae = (u) => {
    if (Array.isArray(u))
      return u.map((le) => A(le));
    throw new Error(Ga.dateArr("multi-dates"));
  }, oe = (u) => {
    if (Array.isArray(u) && i.value.enabled) {
      const le = u[0], me = u[1];
      return [
        G(Array.isArray(le) ? le[0] : null),
        Array.isArray(me) && me.length ? G(me[0]) : null
      ];
    }
    return G(u[0]);
  }, ee = (u) => t.modelAuto ? Array.isArray(u) ? [A(u[0]), A(u[1])] : t.autoApply ? [A(u)] : [A(u), null] : Array.isArray(u) ? ta(
    () => u[1] ? [
      A(u[0]),
      u[1] ? A(u[1]) : Rt(i.value.partialRange)
    ] : [A(u[0])],
    i.value.enabled
  ) : A(u), S = () => {
    Array.isArray(a.value) && i.value.enabled && a.value.length === 1 && a.value.push(Rt(i.value.partialRange));
  }, x = () => {
    const u = a.value;
    return [
      p(u[0]),
      u[1] ? p(u[1]) : Rt(i.value.partialRange)
    ];
  }, Y = () => a.value[1] ? x() : p(Ye(a.value[0])), q = () => (a.value || []).map((u) => p(u)), de = (u = false) => (u || S(), t.modelAuto ? Y() : b.value.enabled ? q() : Array.isArray(a.value) ? ta(() => x(), i.value.enabled) : p(Ye(a.value))), ve = (u) => !u || Array.isArray(u) && !u.length ? null : t.timePicker ? P(Ye(u)) : t.monthPicker ? Q(Ye(u)) : t.yearPicker ? f(Ye(u)) : b.value.enabled ? ae(Ye(u)) : t.weekPicker ? oe(Ye(u)) : ee(Ye(u)), y = (u) => {
    const le = ve(u);
    Fa(Ye(le)) ? (a.value = Ye(le), X()) : (a.value = null, L.value = "");
  }, z = () => {
    const u = (le) => format(le, n.value.format);
    return `${u(a.value[0])} ${n.value.rangeSeparator} ${a.value[1] ? u(a.value[1]) : ""}`;
  }, te = () => l.value && a.value ? Array.isArray(a.value) ? z() : format(a.value, n.value.format) : H(a.value), g = () => a.value ? b.value.enabled ? a.value.map((u) => H(u)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? te() : H(a.value) : "", X = () => {
    !t.format || typeof t.format == "string" || n.value.enabled && typeof n.value.format == "string" ? L.value = g() : L.value = t.format(a.value);
  }, A = (u) => {
    if (t.utc) {
      const le = new Date(u);
      return t.utc === "preserve" ? new Date(le.getTime() + le.getTimezoneOffset() * 6e4) : le;
    }
    return t.modelType ? ml.includes(t.modelType) ? h2(new Date(u)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? h2(
      parse(u, c(), /* @__PURE__ */ new Date(), { locale: _.value })
    ) : h2(
      parse(u, t.modelType, /* @__PURE__ */ new Date(), { locale: _.value })
    ) : h2(new Date(u));
  }, p = (u) => u ? t.utc ? $l(u, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +C(u) : t.modelType === "iso" ? C(u).toISOString() : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? H(C(u)) : H(C(u), t.modelType, true) : C(u) : "", se = (u, le = false, me = false) => {
    if (me) return u;
    if (e("update:model-value", u), d.value.emitTimezone && le) {
      const $ = Array.isArray(u) ? u.map((ge) => qe(Ye(ge), d.value.emitTimezone)) : qe(Ye(u), d.value.emitTimezone);
      e("update:model-timezone-value", $);
    }
  }, I = (u) => Array.isArray(a.value) ? b.value.enabled ? a.value.map((le) => u(le)) : [
    u(a.value[0]),
    a.value[1] ? u(a.value[1]) : Rt(i.value.partialRange)
  ] : u(Ye(a.value)), D = () => {
    if (Array.isArray(a.value)) {
      const u = it(a.value[0], t.weekStart), le = a.value[1] ? it(a.value[1], t.weekStart) : [];
      return [u.map((me) => G(me)), le.map((me) => G(me))];
    }
    return it(a.value, t.weekStart).map((u) => G(u));
  }, V = (u, le) => se(Ye(I(u)), false, le), s = (u) => {
    const le = D();
    return u ? le : e("update:model-value", D());
  }, M = (u = false) => (u || X(), t.monthPicker ? V(U, u) : t.timePicker ? V(E, u) : t.yearPicker ? V(getYear, u) : t.weekPicker ? s(u) : se(de(u), true, u));
  return {
    inputValue: L,
    internalModelValue: a,
    checkBeforeEmit: () => a.value ? i.value.enabled ? i.value.partialRange ? a.value.length >= 1 : a.value.length === 2 : !!a.value : false,
    parseExternalModelValue: y,
    formatInputValue: X,
    emitModelValue: M
  };
};
var Ql = (e, t) => {
  const { defaultedFilters: l, propDates: a } = Ce(e), { validateMonthYearInRange: n } = kt(e), i = (v, _) => {
    let h2 = v;
    return l.value.months.includes(getMonth(h2)) ? (h2 = _ ? addMonths(v, 1) : subMonths(v, 1), i(h2, _)) : h2;
  }, d = (v, _) => {
    let h2 = v;
    return l.value.years.includes(getYear(h2)) ? (h2 = _ ? addYears(v, 1) : subYears(v, 1), d(h2, _)) : h2;
  }, b = (v, _ = false) => {
    const h2 = set(G(), { month: e.month, year: e.year });
    let C = v ? addMonths(h2, 1) : subMonths(h2, 1);
    e.disableYearSelect && (C = setYear(C, e.year));
    let H = getMonth(C), E = getYear(C);
    l.value.months.includes(H) && (C = i(C, v), H = getMonth(C), E = getYear(C)), l.value.years.includes(E) && (C = d(C, v), E = getYear(C)), n(H, E, v, e.preventMinMaxNavigation) && c(H, E, _);
  }, c = (v, _, h2) => {
    t("update-month-year", { month: v, year: _, fromNav: h2 });
  }, L = computed(() => (v) => _n(
    set(G(), { month: e.month, year: e.year }),
    a.value.maxDate,
    a.value.minDate,
    e.preventMinMaxNavigation,
    v
  ));
  return { handleMonthYearChange: b, isDisabled: L, updateMonthYear: c };
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
      defaultedMultiCalendars: d,
      defaultedTextInput: b,
      defaultedInline: c,
      defaultedRange: L,
      defaultedMultiDates: v
    } = Ce(a), { isTimeValid: _, isMonthValid: h2 } = kt(a), { buildMatrix: C } = bt(), H = ref(null), E = ref(null), U = ref(false), f = ref({}), B = ref(null), P = ref(null);
    onMounted(() => {
      a.arrowNavigation && C([Ie(H), Ie(E)], "actionRow"), Q(), window.addEventListener("resize", Q);
    }), onUnmounted(() => {
      window.removeEventListener("resize", Q);
    });
    const Q = () => {
      U.value = false, setTimeout(() => {
        var te, g;
        const y = (te = B.value) == null ? void 0 : te.getBoundingClientRect(), z = (g = P.value) == null ? void 0 : g.getBoundingClientRect();
        y && z && (f.value.maxWidth = `${z.width - y.width - 20}px`), U.value = true;
      }, 0);
    }, ae = computed(() => L.value.enabled && !L.value.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), oe = computed(
      () => !_.value(a.internalModelValue) || !h2.value(a.internalModelValue) || !ae.value
    ), ee = () => {
      const y = i.value;
      return a.timePicker || a.monthPicker, y(Ye(a.internalModelValue));
    }, S = () => {
      const y = a.internalModelValue;
      return d.value.count > 0 ? `${x(y[0])} - ${x(y[1])}` : [x(y[0]), x(y[1])];
    }, x = (y) => Bn(
      y,
      i.value,
      a.formatLocale,
      b.value.rangeSeparator,
      a.modelAuto,
      i.value
    ), Y = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof i.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? S() : v.value.enabled ? a.internalModelValue.map((y) => `${x(y)}`) : a.modelAuto ? `${x(a.internalModelValue[0])}` : `${x(a.internalModelValue[0])} -` : x(a.internalModelValue) : ee()), q = () => v.value.enabled ? "; " : " - ", de = computed(
      () => Array.isArray(Y.value) ? Y.value.join(q()) : Y.value
    ), ve = () => {
      _.value(a.internalModelValue) && h2.value(a.internalModelValue) && ae.value ? l("select-date") : l("invalid-select");
    };
    return (y, z) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: P,
      class: "dp__action_row"
    }, [
      y.$slots["action-row"] ? renderSlot(y.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: y.internalModelValue,
        disabled: oe.value,
        selectDate: () => y.$emit("select-date"),
        closePicker: () => y.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(n).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: de.value,
          style: normalizeStyle(f.value)
        }, [
          y.$slots["action-preview"] && U.value ? renderSlot(y.$slots, "action-preview", {
            key: 0,
            value: y.internalModelValue
          }) : createCommentVNode("", true),
          !y.$slots["action-preview"] && U.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(de.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, ql)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: B,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          y.$slots["action-buttons"] ? renderSlot(y.$slots, "action-buttons", {
            key: 0,
            value: y.internalModelValue
          }) : createCommentVNode("", true),
          y.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(c).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: H,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: z[0] || (z[0] = (te) => y.$emit("close-picker")),
              onKeydown: z[1] || (z[1] = (te) => unref(Ke)(te, () => y.$emit("close-picker")))
            }, toDisplayString(y.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: z[2] || (z[2] = (te) => y.$emit("select-now")),
              onKeydown: z[3] || (z[3] = (te) => unref(Ke)(te, () => y.$emit("select-now")))
            }, toDisplayString(y.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: E,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: oe.value,
              "data-test": "select-button",
              onKeydown: z[4] || (z[4] = (te) => unref(Ke)(te, () => ve())),
              onClick: ve
            }, toDisplayString(y.selectText), 41, Xl)) : createCommentVNode("", true)
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
    const { setSelectionGrid: a, buildMultiLevelMatrix: n, setMonthPicker: i } = bt(), d = l, b = e, { defaultedAriaLabels: c, defaultedTextInput: L, defaultedConfig: v } = Ce(
      b
    ), { hideNavigationButtons: _ } = ma(), h2 = ref(false), C = ref(null), H = ref(null), E = ref([]), U = ref(), f = ref(null), B = ref(0), P = ref(null);
    onBeforeUpdate(() => {
      C.value = null;
    }), onMounted(() => {
      nextTick().then(() => q()), b.noOverlayFocus || ae(), Q(true);
    }), onUnmounted(() => Q(false));
    const Q = (I) => {
      var D;
      b.arrowNavigation && ((D = b.headerRefs) != null && D.length ? i(I) : a(I));
    }, ae = () => {
      var D;
      const I = Ie(H);
      I && (L.value.enabled || (C.value ? (D = C.value) == null || D.focus({ preventScroll: true }) : I.focus({ preventScroll: true })), h2.value = I.clientHeight < I.scrollHeight);
    }, oe = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !b.useRelative,
        "dp--overlay-relative": b.useRelative
      })
    ), ee = computed(
      () => b.useRelative ? { height: `${b.height}px`, width: "var(--dp-menu-min-width)" } : void 0
    ), S = computed(() => ({
      dp__overlay_col: true
    })), x = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: h2.value,
        dp__button_bottom: b.isLast
      })
    ), Y = computed(() => {
      var I, D;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((I = b.items) == null ? void 0 : I.length) <= 6,
        dp__container_block: ((D = b.items) == null ? void 0 : D.length) > 6
      };
    });
    watch(
      () => b.items,
      () => q(false),
      { deep: true }
    );
    const q = (I = true) => {
      nextTick().then(() => {
        const D = Ie(C), V = Ie(H), s = Ie(f), M = Ie(P), F = s ? s.getBoundingClientRect().height : 0;
        V && (V.getBoundingClientRect().height ? B.value = V.getBoundingClientRect().height - F : B.value = v.value.modeHeight - F), D && M && I && (M.scrollTop = D.offsetTop - M.offsetTop - (B.value / 2 - D.getBoundingClientRect().height) - F);
      });
    }, de = (I) => {
      I.disabled || d("selected", I.value);
    }, ve = () => {
      d("toggle"), d("reset-flow");
    }, y = () => {
      b.escClose && ve();
    }, z = (I, D, V, s) => {
      I && ((D.active || D.value === b.focusValue) && (C.value = I), b.arrowNavigation && (Array.isArray(E.value[V]) ? E.value[V][s] = I : E.value[V] = [I], te()));
    }, te = () => {
      var D, V;
      const I = (D = b.headerRefs) != null && D.length ? [b.headerRefs].concat(E.value) : E.value.concat([b.skipButtonRef ? [] : [f.value]]);
      n(Ye(I), (V = b.headerRefs) != null && V.length ? "monthPicker" : "selectionGrid");
    }, g = (I) => {
      b.arrowNavigation || yt(I, v.value, true);
    }, X = (I) => {
      U.value = I, d("hover-value", I);
    }, A = () => {
      if (ve(), !b.isLast) {
        const I = Ea(b.menuWrapRef ?? null, "action-row");
        if (I) {
          const D = Tn(I);
          D == null || D.focus();
        }
      }
    }, p = (I) => {
      switch (I.key) {
        case Pe.esc:
          return y();
        case Pe.arrowLeft:
          return g(I);
        case Pe.arrowRight:
          return g(I);
        case Pe.arrowUp:
          return g(I);
        case Pe.arrowDown:
          return g(I);
        default:
          return;
      }
    }, se = (I) => {
      if (I.key === Pe.enter) return ve();
      if (I.key === Pe.tab) return A();
    };
    return t({ focusGrid: ae }), (I, D) => {
      var V;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: H,
        class: normalizeClass(oe.value),
        style: normalizeStyle(ee.value),
        role: I.useRelative ? void 0 : "dialog",
        "aria-label": I.overlayLabel,
        tabindex: I.useRelative ? void 0 : "0",
        onKeydown: p,
        onClick: D[0] || (D[0] = withModifiers(() => {
        }, ["prevent"]))
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: P,
          class: normalizeClass(Y.value),
          style: normalizeStyle({ "--dp-overlay-height": `${B.value}px` }),
          role: "grid"
        }, [
          createBaseVNode("div", xl, [
            renderSlot(I.$slots, "header")
          ]),
          I.$slots.overlay ? renderSlot(I.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(I.items, (s, M) => (openBlock(), createElementBlock("div", {
            key: M,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: I.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(s, (F, u) => (openBlock(), createElementBlock("div", {
              key: F.value,
              ref_for: true,
              ref: (le) => z(le, F, M, u),
              role: "gridcell",
              class: normalizeClass(S.value),
              "aria-selected": F.active || void 0,
              "aria-disabled": F.disabled || void 0,
              tabindex: "0",
              "data-test": F.text,
              onClick: withModifiers((le) => de(F), ["prevent"]),
              onKeydown: (le) => unref(Ke)(le, () => de(F), true),
              onMouseover: (le) => X(F.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(F.className)
              }, [
                I.$slots.item ? renderSlot(I.$slots, "item", {
                  key: 0,
                  item: F
                }) : createCommentVNode("", true),
                I.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(F.text), 1)
                ], 64))
              ], 2)
            ], 42, er))), 128))
          ], 2))), 128))
        ], 6),
        I.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: f,
          type: "button",
          "aria-label": (V = unref(c)) == null ? void 0 : V.toggleOverlay,
          class: normalizeClass(x.value),
          tabindex: "0",
          onClick: ve,
          onKeydown: se
        }, [
          renderSlot(I.$slots, "button-icon")
        ], 42, tr)), [
          [vShow, !unref(_)(I.hideNavigation, I.type)]
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
      (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (d, b) => (openBlock(), createElementBlock("div", {
        key: d,
        class: normalizeClass(a.value)
      }, [
        renderSlot(n.$slots, "default", {
          instance: d,
          index: b
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
      onClick: i[0] || (i[0] = (d) => n.$emit("activate")),
      onKeydown: i[1] || (i[1] = (d) => unref(Ke)(d, () => n.$emit("activate"), true))
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
var En = defineComponent({
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
    const l = t, a = e, { showRightIcon: n, showLeftIcon: i } = ma(), { defaultedConfig: d, defaultedMultiCalendars: b, defaultedAriaLabels: c, defaultedTransitions: L, defaultedUI: v } = Ce(a), { showTransition: _, transitionName: h2 } = Xt(L), C = ref(false), H = (f = false, B) => {
      C.value = !C.value, l("toggle-year-picker", { flow: f, show: B });
    }, E = (f) => {
      C.value = false, l("year-select", f);
    }, U = (f = false) => {
      l("handle-year", f);
    };
    return (f, B) => {
      var P, Q, ae, oe, ee;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          class: normalizeClass(["dp--year-mode-picker", { "dp--hidden-el": C.value }])
        }, [
          unref(i)(unref(b), e.instance) ? (openBlock(), createBlock(Ut, {
            key: 0,
            ref: "mpPrevIconRef",
            "aria-label": (P = unref(c)) == null ? void 0 : P.prevYear,
            disabled: e.isDisabled(false),
            class: normalizeClass((Q = unref(v)) == null ? void 0 : Q.navBtnPrev),
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
            "aria-label": `${e.year}-${(ae = unref(c)) == null ? void 0 : ae.openYearsOverlay}`,
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
          unref(n)(unref(b), e.instance) ? (openBlock(), createBlock(Ut, {
            key: 1,
            ref: "mpNextIconRef",
            "aria-label": (oe = unref(c)) == null ? void 0 : oe.nextYear,
            disabled: e.isDisabled(true),
            class: normalizeClass((ee = unref(v)) == null ? void 0 : ee.navBtnNext),
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
          name: unref(h2)(e.showYearPicker),
          css: unref(_)
        }, {
          default: withCtx(() => {
            var S, x;
            return [
              e.showYearPicker ? (openBlock(), createBlock(qt, {
                key: 0,
                items: e.items,
                "text-input": f.textInput,
                "esc-close": f.escClose,
                config: f.config,
                "is-last": f.autoApply && !unref(d).keepActionRow,
                "hide-navigation": f.hideNavigation,
                "aria-labels": f.ariaLabels,
                "overlay-label": (x = (S = unref(c)) == null ? void 0 : S.yearPicker) == null ? void 0 : x.call(S, true),
                type: "year",
                onToggle: H,
                onSelected: B[4] || (B[4] = (Y) => E(Y))
              }, createSlots({
                "button-icon": withCtx(() => [
                  f.$slots["calendar-icon"] ? renderSlot(f.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                  f.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                ]),
                _: 2
              }, [
                f.$slots["year-overlay-value"] ? {
                  name: "item",
                  fn: withCtx(({ item: Y }) => [
                    renderSlot(f.$slots, "year-overlay-value", {
                      text: Y.text,
                      value: Y.value
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
var Fn = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => qe(G(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = qe(G(e.value), e.timezone));
};
var Ln = (e, t, l, a) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && a.value.partialRange) ? a.value.fixedStart && (Be(e, t.value[0]) || Me(e, t.value[0])) ? [t.value[0], e] : a.value.fixedEnd && (Oe(e, t.value[1]) || Me(e, t.value[1])) ? [e, t.value[1]] : (l("invalid-fixed-range", e), t.value) : [];
var zn = ({
  multiCalendars: e,
  range: t,
  highlight: l,
  propDates: a,
  calendars: n,
  modelValue: i,
  props: d,
  filters: b,
  year: c,
  month: L,
  emit: v
}) => {
  const _ = computed(() => Ka(d.yearRange, d.locale, d.reverseYears)), h2 = ref([false]), C = computed(() => (Y, q) => {
    const de = set(lt(/* @__PURE__ */ new Date()), {
      month: L.value(Y),
      year: c.value(Y)
    }), ve = q ? endOfYear(de) : startOfYear(de);
    return _n(
      ve,
      a.value.maxDate,
      a.value.minDate,
      d.preventMinMaxNavigation,
      q
    );
  }), H = () => Array.isArray(i.value) && e.value.solo && i.value[1], E = () => {
    for (let Y = 0; Y < e.value.count; Y++)
      if (Y === 0)
        n.value[Y] = n.value[0];
      else if (Y === e.value.count - 1 && H())
        n.value[Y] = {
          month: getMonth(i.value[1]),
          year: getYear(i.value[1])
        };
      else {
        const q = set(G(), n.value[Y - 1]);
        n.value[Y] = { month: getMonth(q), year: getYear(addYears(q, 1)) };
      }
  }, U = (Y) => {
    if (!Y) return E();
    const q = set(G(), n.value[Y]);
    return n.value[0].year = getYear(subYears(q, e.value.count - 1)), E();
  }, f = (Y, q) => {
    const de = differenceInYears(q, Y);
    return t.value.showLastInRange && de > 1 ? q : Y;
  }, B = (Y) => d.focusStartDate || e.value.solo ? Y[0] : Y[1] ? f(Y[0], Y[1]) : Y[0], P = () => {
    if (i.value) {
      const Y = Array.isArray(i.value) ? B(i.value) : i.value;
      n.value[0] = { month: getMonth(Y), year: getYear(Y) };
    }
  }, Q = () => {
    P(), e.value.count && E();
  };
  watch(i, (Y, q) => {
    d.isTextInputDate && JSON.stringify(Y ?? {}) !== JSON.stringify(q ?? {}) && Q();
  }), onMounted(() => {
    Q();
  });
  const ae = (Y, q) => {
    n.value[q].year = Y, v("update-month-year", { instance: q, year: Y, month: n.value[q].month }), e.value.count && !e.value.solo && U(q);
  }, oe = computed(() => (Y) => Yt(_.value, (q) => {
    var z;
    const de = c.value(Y) === q.value, ve = Gt(
      q.value,
      It(a.value.minDate),
      It(a.value.maxDate)
    ) || ((z = b.value.years) == null ? void 0 : z.includes(c.value(Y))), y = qa(l.value, q.value);
    return { active: de, disabled: ve, highlighted: y };
  })), ee = (Y, q) => {
    ae(Y, q), x(q);
  }, S = (Y, q = false) => {
    if (!C.value(Y, q)) {
      const de = q ? c.value(Y) + 1 : c.value(Y) - 1;
      ae(de, Y);
    }
  }, x = (Y, q = false, de) => {
    q || v("reset-flow"), de !== void 0 ? h2.value[Y] = de : h2.value[Y] = !h2.value[Y], h2.value[Y] ? v("overlay-toggle", { open: true, overlay: He.year }) : (v("overlay-closed"), v("overlay-toggle", { open: false, overlay: He.year }));
  };
  return {
    isDisabled: C,
    groupedYears: oe,
    showYearPicker: h2,
    selectYear: ae,
    toggleYearPicker: x,
    handleYearSelect: ee,
    handleYear: S
  };
};
var lr = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: i,
    defaultedRange: d,
    defaultedHighlight: b,
    propDates: c,
    defaultedTz: L,
    defaultedFilters: v,
    defaultedMultiDates: _
  } = Ce(e), h2 = () => {
    e.isTextInputDate && Q(getYear(G(e.startDate)), 0);
  }, { modelValue: C, year: H, month: E, calendars: U } = Jt(e, t, h2), f = computed(() => $n(e.formatLocale, e.locale, e.monthNameFormat)), B = ref(null), { checkMinMaxRange: P } = kt(e), {
    selectYear: Q,
    groupedYears: ae,
    showYearPicker: oe,
    toggleYearPicker: ee,
    handleYearSelect: S,
    handleYear: x,
    isDisabled: Y
  } = zn({
    modelValue: C,
    multiCalendars: l,
    range: d,
    highlight: b,
    calendars: U,
    year: H,
    propDates: c,
    month: E,
    filters: v,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (C.value && e.focusStartDate || !C.value) && Q(getYear(G(e.startDate)), 0);
  });
  const q = (M) => M ? { month: getMonth(M), year: getYear(M) } : { month: null, year: null }, de = () => C.value ? Array.isArray(C.value) ? C.value.map((M) => q(M)) : q(C.value) : q(), ve = (M, F) => {
    const u = U.value[M], le = de();
    return Array.isArray(le) ? le.some((me) => me.year === (u == null ? void 0 : u.year) && me.month === F) : (u == null ? void 0 : u.year) === le.year && F === le.month;
  }, y = (M, F, u) => {
    var me, $;
    const le = de();
    return Array.isArray(le) ? H.value(F) === ((me = le[u]) == null ? void 0 : me.year) && M === (($ = le[u]) == null ? void 0 : $.month) : false;
  }, z = (M, F) => {
    if (d.value.enabled) {
      const u = de();
      if (Array.isArray(C.value) && Array.isArray(u)) {
        const le = y(M, F, 0) || y(M, F, 1), me = dt(lt(G()), M, H.value(F));
        return da(C.value, B.value, me) && !le;
      }
      return false;
    }
    return false;
  }, te = computed(() => (M) => Yt(f.value, (F) => {
    var ge;
    const u = ve(M, F.value), le = Gt(
      F.value,
      Pn(H.value(M), c.value.minDate),
      Rn(H.value(M), c.value.maxDate)
    ) || Rl(c.value.disabledDates, H.value(M)).includes(F.value) || ((ge = v.value.months) == null ? void 0 : ge.includes(F.value)), me = z(F.value, M), $ = Yn(b.value, F.value, H.value(M));
    return { active: u, disabled: le, isBetween: me, highlighted: $ };
  })), g = (M, F) => dt(lt(G()), M, H.value(F)), X = (M, F) => {
    const u = C.value ? C.value : lt(/* @__PURE__ */ new Date());
    C.value = dt(u, M, H.value(F)), t("auto-apply"), t("update-flow-step");
  }, A = (M, F) => {
    const u = g(M, F);
    d.value.fixedEnd || d.value.fixedStart ? C.value = Ln(u, C, t, d) : C.value ? P(u, C.value) && (C.value = Ja(C, g(M, F), t)) : C.value = [g(M, F)], nextTick().then(() => {
      va(C.value, t, e.autoApply, e.modelAuto);
    });
  }, p = (M, F) => {
    Xa(g(M, F), C, _.value.limit), t("auto-apply", true);
  }, se = (M, F) => (U.value[F].month = M, D(F, U.value[F].year, M), _.value.enabled ? p(M, F) : d.value.enabled ? A(M, F) : X(M, F)), I = (M, F) => {
    Q(M, F), D(F, M, null);
  }, D = (M, F, u) => {
    let le = u;
    if (!le && le !== 0) {
      const me = de();
      le = Array.isArray(me) ? me[M].month : me.month;
    }
    t("update-month-year", { instance: M, year: F, month: le });
  };
  return {
    groupedMonths: te,
    groupedYears: ae,
    year: H,
    isDisabled: Y,
    defaultedMultiCalendars: l,
    defaultedAriaLabels: a,
    defaultedTransitions: n,
    defaultedConfig: i,
    showYearPicker: oe,
    modelValue: C,
    presetDate: (M, F) => {
      Fn({
        value: M,
        modelValue: C,
        range: d.value.enabled,
        timezone: F ? void 0 : L.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (M, F) => {
      B.value = g(M, F);
    },
    selectMonth: se,
    selectYear: I,
    toggleYearPicker: ee,
    handleYearSelect: S,
    handleYear: x,
    getModelMonthYear: de
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
    const a = l, n = useSlots(), i = Je(n, "yearMode"), d = e;
    onMounted(() => {
      d.shadow || a("mount", null);
    });
    const {
      groupedMonths: b,
      groupedYears: c,
      year: L,
      isDisabled: v,
      defaultedMultiCalendars: _,
      defaultedConfig: h2,
      showYearPicker: C,
      modelValue: H,
      presetDate: E,
      setHoverDate: U,
      selectMonth: f,
      selectYear: B,
      toggleYearPicker: P,
      handleYearSelect: Q,
      handleYear: ae,
      getModelMonthYear: oe
    } = lr(d, a);
    return t({ getSidebarProps: () => ({
      modelValue: H,
      year: L,
      getModelMonthYear: oe,
      selectMonth: f,
      selectYear: B,
      handleYear: ae
    }), presetDate: E, toggleYearPicker: (S) => P(0, S) }), (S, x) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(_).count,
      collapse: S.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: Y }) => [
        S.$slots["top-extra"] ? renderSlot(S.$slots, "top-extra", {
          key: 0,
          value: S.internalModelValue
        }) : createCommentVNode("", true),
        S.$slots["month-year"] ? renderSlot(S.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
          year: unref(L),
          months: unref(b)(Y),
          years: unref(c)(Y),
          selectMonth: unref(f),
          selectYear: unref(B),
          instance: Y
        }))) : (openBlock(), createBlock(qt, {
          key: 2,
          items: unref(b)(Y),
          "arrow-navigation": S.arrowNavigation,
          "is-last": S.autoApply && !unref(h2).keepActionRow,
          "esc-close": S.escClose,
          height: unref(h2).modeHeight,
          config: S.config,
          "no-overlay-focus": !!(S.noOverlayFocus || S.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (q) => unref(f)(q, Y),
          onHoverValue: (q) => unref(U)(q, Y)
        }, createSlots({
          header: withCtx(() => [
            createVNode(En, mergeProps(S.$props, {
              items: unref(c)(Y),
              instance: Y,
              "show-year-picker": unref(C)[Y],
              year: unref(L)(Y),
              "is-disabled": (q) => unref(v)(Y, q),
              onHandleYear: (q) => unref(ae)(Y, q),
              onYearSelect: (q) => unref(Q)(q, Y),
              onToggleYearPicker: (q) => unref(P)(Y, q == null ? void 0 : q.flow, q == null ? void 0 : q.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(i), (q, de) => ({
                name: q,
                fn: withCtx((ve) => [
                  renderSlot(S.$slots, q, normalizeProps(guardReactiveProps(ve)))
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
    e.isTextInputDate && (v.value = getYear(G(e.startDate)));
  }, { modelValue: a } = Jt(e, t, l), n = ref(null), { defaultedHighlight: i, defaultedMultiDates: d, defaultedFilters: b, defaultedRange: c, propDates: L } = Ce(e), v = ref();
  onMounted(() => {
    e.startDate && (a.value && e.focusStartDate || !a.value) && (v.value = getYear(G(e.startDate)));
  });
  const _ = (f) => Array.isArray(a.value) ? a.value.some((B) => getYear(B) === f) : a.value ? getYear(a.value) === f : false, h2 = (f) => c.value.enabled && Array.isArray(a.value) ? da(a.value, n.value, H(f)) : false, C = computed(() => Yt(Ka(e.yearRange, e.locale, e.reverseYears), (f) => {
    const B = _(f.value), P = Gt(
      f.value,
      It(L.value.minDate),
      It(L.value.maxDate)
    ) || b.value.years.includes(f.value), Q = h2(f.value) && !B, ae = qa(i.value, f.value);
    return { active: B, disabled: P, isBetween: Q, highlighted: ae };
  })), H = (f) => setYear(lt(startOfYear(/* @__PURE__ */ new Date())), f);
  return {
    groupedYears: C,
    modelValue: a,
    focusYear: v,
    setHoverValue: (f) => {
      n.value = setYear(lt(/* @__PURE__ */ new Date()), f);
    },
    selectYear: (f) => {
      var B;
      if (t("update-month-year", { instance: 0, year: f }), d.value.enabled)
        return a.value ? Array.isArray(a.value) && (((B = a.value) == null ? void 0 : B.map((Q) => getYear(Q))).includes(f) ? a.value = a.value.filter((Q) => getYear(Q) !== f) : a.value.push(setYear(Ge(G()), f))) : a.value = [setYear(Ge(startOfYear(G())), f)], t("auto-apply", true);
      c.value.enabled ? (a.value = Ja(a, H(f), t), nextTick().then(() => {
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
    const a = l, n = e, { groupedYears: i, modelValue: d, focusYear: b, selectYear: c, setHoverValue: L } = or(n, a), { defaultedConfig: v } = Ce(n);
    return t({ getSidebarProps: () => ({
      modelValue: d,
      selectYear: c
    }) }), (h2, C) => (openBlock(), createElementBlock("div", null, [
      h2.$slots["top-extra"] ? renderSlot(h2.$slots, "top-extra", {
        key: 0,
        value: h2.internalModelValue
      }) : createCommentVNode("", true),
      h2.$slots["month-year"] ? renderSlot(h2.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(i),
        selectYear: unref(c)
      }))) : (openBlock(), createBlock(qt, {
        key: 2,
        items: unref(i),
        "is-last": h2.autoApply && !unref(v).keepActionRow,
        height: unref(v).modeHeight,
        config: h2.config,
        "no-overlay-focus": !!(h2.noOverlayFocus || h2.textInput),
        "focus-value": unref(b),
        type: "year",
        "use-relative": "",
        onSelected: unref(c),
        onHoverValue: unref(L)
      }, createSlots({ _: 2 }, [
        h2.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: H }) => [
            renderSlot(h2.$slots, "year-overlay-value", {
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
var dr = ["aria-label", "disabled", "data-test", "onKeydown", "onClick"];
var cr = ["data-test", "aria-label", "onKeydown", "onClick", "onMousedown"];
var fr = { key: 0 };
var vr = ["aria-label"];
var mr = defineComponent({
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
    const a = l, n = e, { setTimePickerElements: i, setTimePickerBackRef: d } = bt(), { defaultedAriaLabels: b, defaultedTransitions: c, defaultedFilters: L, defaultedConfig: v, defaultedRange: _ } = Ce(n), { transitionName: h2, showTransition: C } = Xt(c), H = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), E = ref("AM"), U = ref(null), f = ref([]), B = ref(), P = ref(false);
    onMounted(() => {
      a("mounted");
    });
    const Q = (r) => set(/* @__PURE__ */ new Date(), {
      hours: r.hours,
      minutes: r.minutes,
      seconds: n.enableSeconds ? r.seconds : 0,
      milliseconds: 0
    }), ae = computed(
      () => (r) => g(r, n[r]) || ee(r, n[r])
    ), oe = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), ee = (r, R) => _.value.enabled && !_.value.disableTimeRangeValidation ? !n.validateTime(r, R) : false, S = (r, R) => {
      if (_.value.enabled && !_.value.disableTimeRangeValidation) {
        const O = R ? +n[`${r}Increment`] : -+n[`${r}Increment`], W = n[r] + O;
        return !n.validateTime(r, W);
      }
      return false;
    }, x = computed(() => (r) => !I(+n[r] + +n[`${r}Increment`], r) || S(r, true)), Y = computed(() => (r) => !I(+n[r] - +n[`${r}Increment`], r) || S(r, false)), q = (r, R) => add(set(G(), r), R), de = (r, R) => sub(set(G(), r), R), ve = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })
    ), y = computed(() => {
      const r = [{ type: "hours" }];
      return n.enableMinutes && r.push({ type: "", separator: true }, {
        type: "minutes"
      }), n.enableSeconds && r.push({ type: "", separator: true }, {
        type: "seconds"
      }), r;
    }), z = computed(() => y.value.filter((r) => !r.separator)), te = computed(() => (r) => {
      if (r === "hours") {
        const R = u(+n.hours);
        return { text: R < 10 ? `0${R}` : `${R}`, value: R };
      }
      return { text: n[r] < 10 ? `0${n[r]}` : `${n[r]}`, value: n[r] };
    }), g = (r, R) => {
      var W;
      if (!n.disabledTimesConfig) return false;
      const O = n.disabledTimesConfig(n.order, r === "hours" ? R : void 0);
      return O[r] ? !!((W = O[r]) != null && W.includes(R)) : true;
    }, X = (r, R) => R !== "hours" || E.value === "AM" ? r : r + 12, A = (r) => {
      const R = n.is24 ? 24 : 12, O = r === "hours" ? R : 60, W = +n[`${r}GridIncrement`], ue = r === "hours" && !n.is24 ? W : 0, w = [];
      for (let N2 = ue; N2 < O; N2 += W)
        w.push({ value: n.is24 ? N2 : X(N2, r), text: N2 < 10 ? `0${N2}` : `${N2}` });
      return r === "hours" && !n.is24 && w.unshift({ value: E.value === "PM" ? 12 : 0, text: "12" }), Yt(w, (N2) => ({ active: false, disabled: L.value.times[r].includes(N2.value) || !I(N2.value, r) || g(r, N2.value) || ee(r, N2.value) }));
    }, p = (r) => r >= 0 ? r : 59, se = (r) => r >= 0 ? r : 23, I = (r, R) => {
      const O = n.minTime ? Q(Aa(n.minTime)) : null, W = n.maxTime ? Q(Aa(n.maxTime)) : null, ue = Q(
        Aa(
          oe.value,
          R,
          R === "minutes" || R === "seconds" ? p(r) : se(r)
        )
      );
      return O && W ? (isBefore(ue, W) || isEqual(ue, W)) && (isAfter(ue, O) || isEqual(ue, O)) : O ? isAfter(ue, O) || isEqual(ue, O) : W ? isBefore(ue, W) || isEqual(ue, W) : true;
    }, D = (r) => n[`no${r[0].toUpperCase() + r.slice(1)}Overlay`], V = (r) => {
      D(r) || (H[r] = !H[r], H[r] ? (P.value = true, a("overlay-opened", r)) : (P.value = false, a("overlay-closed", r)));
    }, s = (r) => r === "hours" ? getHours : r === "minutes" ? getMinutes : getSeconds, M = () => {
      B.value && clearTimeout(B.value);
    }, F = (r, R = true, O) => {
      const W = R ? q : de, ue = R ? +n[`${r}Increment`] : -+n[`${r}Increment`];
      I(+n[r] + ue, r) && a(
        `update:${r}`,
        s(r)(W({ [r]: +n[r] }, { [r]: +n[`${r}Increment`] }))
      ), !(O != null && O.keyboard) && v.value.timeArrowHoldThreshold && (B.value = setTimeout(() => {
        F(r, R);
      }, v.value.timeArrowHoldThreshold));
    }, u = (r) => n.is24 ? r : (r >= 12 ? E.value = "PM" : E.value = "AM", gl(r)), le = () => {
      E.value === "PM" ? (E.value = "AM", a("update:hours", n.hours - 12)) : (E.value = "PM", a("update:hours", n.hours + 12)), a("am-pm-change", E.value);
    }, me = (r) => {
      H[r] = true;
    }, $ = (r, R, O) => {
      if (r && n.arrowNavigation) {
        Array.isArray(f.value[R]) ? f.value[R][O] = r : f.value[R] = [r];
        const W = f.value.reduce(
          (ue, w) => w.map((N2, ce) => [...ue[ce] || [], w[ce]]),
          []
        );
        d(n.closeTimePickerBtn), U.value && (W[1] = W[1].concat(U.value)), i(W, n.order);
      }
    }, ge = (r, R) => (V(r), a(`update:${r}`, R));
    return t({ openChildCmp: me }), (r, R) => {
      var O;
      return r.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", ur, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(y.value, (W, ue) => {
          var w, N2, ce;
          return openBlock(), createElementBlock("div", {
            key: ue,
            class: normalizeClass(ve.value)
          }, [
            W.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              P.value ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(":")
              ], 64))
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (he2) => $(he2, ue, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !r.timePickerInline,
                  dp__inc_dec_button_inline: r.timePickerInline,
                  dp__tp_inline_btn_top: r.timePickerInline,
                  dp__inc_dec_button_disabled: x.value(W.type),
                  "dp--hidden-el": P.value
                }),
                "data-test": `${W.type}-time-inc-btn-${n.order}`,
                "aria-label": (w = unref(b)) == null ? void 0 : w.incrementValue(W.type),
                tabindex: "0",
                onKeydown: (he2) => unref(Ke)(he2, () => F(W.type, true, { keyboard: true }), true),
                onClick: (he2) => unref(v).timeArrowHoldThreshold ? void 0 : F(W.type, true),
                onMousedown: (he2) => unref(v).timeArrowHoldThreshold ? F(W.type, true) : void 0,
                onMouseup: M
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  r.$slots["tp-inline-arrow-up"] ? renderSlot(r.$slots, "tp-inline-arrow-up", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    R[2] || (R[2] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1)),
                    R[3] || (R[3] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1))
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-up"] ? renderSlot(r.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
                ], 64))
              ], 42, ir),
              createBaseVNode("button", {
                ref_for: true,
                ref: (he2) => $(he2, ue, 1),
                type: "button",
                "aria-label": `${te.value(W.type).text}-${(N2 = unref(b)) == null ? void 0 : N2.openTpOverlay(W.type)}`,
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !r.timePickerInline,
                  dp__time_display_inline: r.timePickerInline,
                  "dp--time-invalid": ae.value(W.type),
                  "dp--time-overlay-btn": !ae.value(W.type),
                  "dp--hidden-el": P.value
                }),
                disabled: D(W.type),
                tabindex: "0",
                "data-test": `${W.type}-toggle-overlay-btn-${n.order}`,
                onKeydown: (he2) => unref(Ke)(he2, () => V(W.type), true),
                onClick: (he2) => V(W.type)
              }, [
                r.$slots[W.type] ? renderSlot(r.$slots, W.type, {
                  key: 0,
                  text: te.value(W.type).text,
                  value: te.value(W.type).value
                }) : createCommentVNode("", true),
                r.$slots[W.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(te.value(W.type).text), 1)
                ], 64))
              ], 42, dr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (he2) => $(he2, ue, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !r.timePickerInline,
                  dp__inc_dec_button_inline: r.timePickerInline,
                  dp__tp_inline_btn_bottom: r.timePickerInline,
                  dp__inc_dec_button_disabled: Y.value(W.type),
                  "dp--hidden-el": P.value
                }),
                "data-test": `${W.type}-time-dec-btn-${n.order}`,
                "aria-label": (ce = unref(b)) == null ? void 0 : ce.decrementValue(W.type),
                tabindex: "0",
                onKeydown: (he2) => unref(Ke)(he2, () => F(W.type, false, { keyboard: true }), true),
                onClick: (he2) => unref(v).timeArrowHoldThreshold ? void 0 : F(W.type, false),
                onMousedown: (he2) => unref(v).timeArrowHoldThreshold ? F(W.type, false) : void 0,
                onMouseup: M
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  r.$slots["tp-inline-arrow-down"] ? renderSlot(r.$slots, "tp-inline-arrow-down", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    R[4] || (R[4] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1)),
                    R[5] || (R[5] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1))
                  ], 64))
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  r.$slots["arrow-down"] ? renderSlot(r.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wa), { key: 1 }))
                ], 64))
              ], 42, cr)
            ], 64))
          ], 2);
        }), 128)),
        r.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", fr, [
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
            "aria-label": (O = unref(b)) == null ? void 0 : O.amPmButton,
            tabindex: "0",
            onClick: le,
            onKeydown: R[0] || (R[0] = (W) => unref(Ke)(W, () => le(), true))
          }, toDisplayString(E.value), 41, vr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(z.value, (W, ue) => (openBlock(), createBlock(Transition, {
          key: ue,
          name: unref(h2)(H[W.type]),
          css: unref(C)
        }, {
          default: withCtx(() => {
            var w, N2;
            return [
              H[W.type] ? (openBlock(), createBlock(qt, {
                key: 0,
                items: A(W.type),
                "is-last": r.autoApply && !unref(v).keepActionRow,
                "esc-close": r.escClose,
                type: W.type,
                "text-input": r.textInput,
                config: r.config,
                "arrow-navigation": r.arrowNavigation,
                "aria-labels": r.ariaLabels,
                "overlay-label": (N2 = (w = unref(b)).timeOverlay) == null ? void 0 : N2.call(w, W.type),
                onSelected: (ce) => ge(W.type, ce),
                onToggle: (ce) => V(W.type),
                onResetFlow: R[1] || (R[1] = (ce) => r.$emit("reset-flow"))
              }, createSlots({
                "button-icon": withCtx(() => [
                  r.$slots["clock-icon"] ? renderSlot(r.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                  r.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(r.timePickerInline ? unref(Et) : unref(Ua)), { key: 1 }))
                ]),
                _: 2
              }, [
                r.$slots[`${W.type}-overlay-value`] ? {
                  name: "item",
                  fn: withCtx(({ item: ce }) => [
                    renderSlot(r.$slots, `${W.type}-overlay-value`, {
                      text: ce.text,
                      value: ce.value
                    })
                  ]),
                  key: "0"
                } : void 0,
                r.$slots[`${W.type}-overlay-header`] ? {
                  name: "header",
                  fn: withCtx(() => [
                    renderSlot(r.$slots, `${W.type}-overlay-header`, {
                      toggle: () => V(W.type)
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
var pr = { class: "dp--tp-wrap" };
var yr = ["aria-label", "tabindex"];
var gr = ["role", "aria-label", "tabindex"];
var hr = ["aria-label"];
var Hn = defineComponent({
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
    const a = l, n = e, { buildMatrix: i, setTimePicker: d } = bt(), b = useSlots(), { defaultedTransitions: c, defaultedAriaLabels: L, defaultedTextInput: v, defaultedConfig: _, defaultedRange: h2 } = Ce(n), { transitionName: C, showTransition: H } = Xt(c), { hideNavigationButtons: E } = ma(), U = ref(null), f = ref(null), B = ref([]), P = ref(null), Q = ref(false);
    onMounted(() => {
      a("mount"), !n.timePicker && n.arrowNavigation ? i([Ie(U.value)], "time") : d(true, n.timePicker);
    });
    const ae = computed(() => h2.value.enabled && n.modelAuto ? An(n.internalModelValue) : true), oe = ref(false), ee = (A) => ({
      hours: Array.isArray(n.hours) ? n.hours[A] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[A] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[A] : n.seconds
    }), S = computed(() => {
      const A = [];
      if (h2.value.enabled)
        for (let p = 0; p < 2; p++)
          A.push(ee(p));
      else
        A.push(ee(0));
      return A;
    }), x = (A, p = false, se = "") => {
      p || a("reset-flow"), oe.value = A, a(A ? "overlay-opened" : "overlay-closed", He.time), n.arrowNavigation && d(A), nextTick(() => {
        se !== "" && B.value[0] && B.value[0].openChildCmp(se);
      });
    }, Y = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !_.value.keepActionRow
    })), q = Je(b, "timePicker"), de = (A, p, se) => h2.value.enabled ? p === 0 ? [A, S.value[1][se]] : [S.value[0][se], A] : A, ve = (A) => {
      a("update:hours", A);
    }, y = (A) => {
      a("update:minutes", A);
    }, z = (A) => {
      a("update:seconds", A);
    }, te = () => {
      if (P.value && !v.value.enabled && !n.noOverlayFocus) {
        const A = Tn(P.value);
        A && A.focus({ preventScroll: true });
      }
    }, g = (A) => {
      Q.value = false, a("overlay-closed", A);
    }, X = (A) => {
      Q.value = true, a("overlay-opened", A);
    };
    return t({ toggleTimePicker: x }), (A, p) => {
      var se;
      return openBlock(), createElementBlock("div", pr, [
        !A.timePicker && !A.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: U,
          type: "button",
          class: normalizeClass({ ...Y.value, "dp--hidden-el": oe.value }),
          "aria-label": (se = unref(L)) == null ? void 0 : se.openTimePicker,
          tabindex: A.noOverlayFocus ? void 0 : 0,
          "data-test": "open-time-picker-btn",
          onKeydown: p[0] || (p[0] = (I) => unref(Ke)(I, () => x(true))),
          onClick: p[1] || (p[1] = (I) => x(true))
        }, [
          A.$slots["clock-icon"] ? renderSlot(A.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          A.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ua), { key: 1 }))
        ], 42, yr)), [
          [vShow, !unref(E)(A.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(C)(oe.value),
          css: unref(H) && !A.timePickerInline
        }, {
          default: withCtx(() => {
            var I, D;
            return [
              oe.value || A.timePicker || A.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: P,
                role: A.timePickerInline ? void 0 : "dialog",
                class: normalizeClass({
                  dp__overlay: !A.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !A.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle(A.timePicker ? { height: `${unref(_).modeHeight}px` } : void 0),
                "aria-label": (I = unref(L)) == null ? void 0 : I.timePicker,
                tabindex: A.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    A.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  A.$slots["time-picker-overlay"] ? renderSlot(A.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: ve,
                    setMinutes: y,
                    setSeconds: z
                  }) : createCommentVNode("", true),
                  A.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(A.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(S.value, (V, s) => withDirectives((openBlock(), createBlock(mr, mergeProps({
                      key: s,
                      ref_for: true
                    }, {
                      ...A.$props,
                      order: s,
                      hours: V.hours,
                      minutes: V.minutes,
                      seconds: V.seconds,
                      closeTimePickerBtn: f.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: s === 0 ? unref(h2).fixedStart : unref(h2).fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: B,
                      "validate-time": (M, F) => e.validateTime(M, de(F, s, M)),
                      "onUpdate:hours": (M) => ve(de(M, s, "hours")),
                      "onUpdate:minutes": (M) => y(de(M, s, "minutes")),
                      "onUpdate:seconds": (M) => z(de(M, s, "seconds")),
                      onMounted: te,
                      onOverlayClosed: g,
                      onOverlayOpened: X,
                      onAmPmChange: p[2] || (p[2] = (M) => A.$emit("am-pm-change", M))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(q), (M, F) => ({
                        name: M,
                        fn: withCtx((u) => [
                          renderSlot(A.$slots, M, mergeProps({ ref_for: true }, u))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, s === 0 ? true : ae.value]
                    ])), 128))
                  ], 2)),
                  !A.timePicker && !A.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: f,
                    type: "button",
                    class: normalizeClass({ ...Y.value, "dp--hidden-el": Q.value }),
                    "aria-label": (D = unref(L)) == null ? void 0 : D.closeTimePicker,
                    tabindex: "0",
                    onKeydown: p[3] || (p[3] = (V) => unref(Ke)(V, () => x(false))),
                    onClick: p[4] || (p[4] = (V) => x(false))
                  }, [
                    A.$slots["calendar-icon"] ? renderSlot(A.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    A.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                  ], 42, hr)), [
                    [vShow, !unref(E)(A.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, gr)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Un = (e, t, l, a) => {
  const { defaultedRange: n } = Ce(e), i = (P, Q) => Array.isArray(t[P]) ? t[P][Q] : t[P], d = (P) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[P] : t.seconds : 0, b = (P, Q) => P ? Q !== void 0 ? gt(P, i("hours", Q), i("minutes", Q), d(Q)) : gt(P, t.hours, t.minutes, d()) : setSeconds(G(), d(Q)), c = (P, Q) => {
    t[P] = Q;
  }, L = computed(() => e.modelAuto && n.value.enabled ? Array.isArray(l.value) ? l.value.length > 1 : false : n.value.enabled), v = (P, Q) => {
    const ae = Object.fromEntries(
      Object.keys(t).map((oe) => oe === P ? [oe, Q] : [oe, t[oe]].slice())
    );
    if (L.value && !n.value.disableTimeRangeValidation) {
      const oe = (S) => l.value ? gt(
        l.value[S],
        ae.hours[S],
        ae.minutes[S],
        ae.seconds[S]
      ) : null, ee = (S) => setMilliseconds(l.value[S], 0);
      return !(Me(oe(0), oe(1)) && (isAfter(oe(0), ee(1)) || isBefore(oe(1), ee(0))));
    }
    return true;
  }, _ = (P, Q) => {
    v(P, Q) && (c(P, Q), a && a());
  }, h2 = (P) => {
    _("hours", P);
  }, C = (P) => {
    _("minutes", P);
  }, H = (P) => {
    _("seconds", P);
  }, E = (P, Q, ae, oe) => {
    Q && h2(P), !Q && !ae && C(P), ae && H(P), l.value && oe(l.value);
  }, U = (P) => {
    if (P) {
      const Q = Array.isArray(P), ae = Q ? [+P[0].hours, +P[1].hours] : +P.hours, oe = Q ? [+P[0].minutes, +P[1].minutes] : +P.minutes, ee = Q ? [+P[0].seconds, +P[1].seconds] : +P.seconds;
      c("hours", ae), c("minutes", oe), e.enableSeconds && c("seconds", ee);
    }
  }, f = (P, Q) => {
    const ae = {
      hours: Array.isArray(t.hours) ? t.hours[P] : t.hours,
      disabledArr: []
    };
    return (Q || Q === 0) && (ae.hours = Q), Array.isArray(e.disabledTimes) && (ae.disabledArr = n.value.enabled && Array.isArray(e.disabledTimes[P]) ? e.disabledTimes[P] : e.disabledTimes), ae;
  }, B = computed(() => (P, Q) => {
    var ae;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: oe, hours: ee } = f(P, Q), S = oe.filter((x) => +x.hours === ee);
      return ((ae = S[0]) == null ? void 0 : ae.minutes) === "*" ? { hours: [ee], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (S == null ? void 0 : S.map((x) => +x.minutes)) ?? [],
        seconds: (S == null ? void 0 : S.map((x) => x.seconds ? +x.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: c,
    updateHours: h2,
    updateMinutes: C,
    updateSeconds: H,
    getSetDateTime: b,
    updateTimeValues: E,
    getSecondsValue: d,
    assignStartTime: U,
    validateTime: v,
    disabledTimesConfig: B
  };
};
var br = (e, t) => {
  const l = () => {
    e.isTextInputDate && Q();
  }, { modelValue: a, time: n } = Jt(e, t, l), { defaultedStartTime: i, defaultedRange: d, defaultedTz: b } = Ce(e), { updateTimeValues: c, getSetDateTime: L, setTime: v, assignStartTime: _, disabledTimesConfig: h2, validateTime: C } = Un(e, n, a, H);
  function H() {
    t("update-flow-step");
  }
  const E = (ee) => {
    const { hours: S, minutes: x, seconds: Y } = ee;
    return { hours: +S, minutes: +x, seconds: Y ? +Y : 0 };
  }, U = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const S = E(e.startTime[0]), x = E(e.startTime[1]);
        return [set(G(), S), set(G(), x)];
      }
      const ee = E(e.startTime);
      return set(G(), ee);
    }
    return d.value.enabled ? [null, null] : null;
  }, f = () => {
    if (d.value.enabled) {
      const [ee, S] = U();
      a.value = [
        qe(L(ee, 0), b.value.timezone),
        qe(L(S, 1), b.value.timezone)
      ];
    } else
      a.value = qe(L(U()), b.value.timezone);
  }, B = (ee) => Array.isArray(ee) ? [St(G(ee[0])), St(G(ee[1]))] : [St(ee ?? G())], P = (ee, S, x) => {
    v("hours", ee), v("minutes", S), v("seconds", e.enableSeconds ? x : 0);
  }, Q = () => {
    const [ee, S] = B(a.value);
    return d.value.enabled ? P(
      [ee.hours, S.hours],
      [ee.minutes, S.minutes],
      [ee.seconds, S.seconds]
    ) : P(ee.hours, ee.minutes, ee.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return _(i.value), a.value ? Q() : f();
  });
  const ae = () => {
    Array.isArray(a.value) ? a.value = a.value.map((ee, S) => ee && L(ee, S)) : a.value = L(a.value), t("time-update");
  };
  return {
    modelValue: a,
    time: n,
    disabledTimesConfig: h2,
    updateTime: (ee, S = true, x = false) => {
      c(ee, S, x, ae);
    },
    validateTime: C
  };
};
var kr = defineComponent({
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
    const a = l, n = e, i = useSlots(), d = Je(i, "timePicker"), b = ref(null), { time: c, modelValue: L, disabledTimesConfig: v, updateTime: _, validateTime: h2 } = br(n, a);
    return onMounted(() => {
      n.shadow || a("mount", null);
    }), t({ getSidebarProps: () => ({
      modelValue: L,
      time: c,
      updateTime: _
    }), toggleTimePicker: (E, U = false, f = "") => {
      var B;
      (B = b.value) == null || B.toggleTimePicker(E, U, f);
    } }), (E, U) => (openBlock(), createBlock(fa, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Hn, mergeProps({
          ref_key: "tpRef",
          ref: b
        }, E.$props, {
          hours: unref(c).hours,
          minutes: unref(c).minutes,
          seconds: unref(c).seconds,
          "internal-model-value": E.internalModelValue,
          "disabled-times-config": unref(v),
          "validate-time": unref(h2),
          "onUpdate:hours": U[0] || (U[0] = (f) => unref(_)(f)),
          "onUpdate:minutes": U[1] || (U[1] = (f) => unref(_)(f, false)),
          "onUpdate:seconds": U[2] || (U[2] = (f) => unref(_)(f, false, true)),
          onAmPmChange: U[3] || (U[3] = (f) => E.$emit("am-pm-change", f)),
          onResetFlow: U[4] || (U[4] = (f) => E.$emit("reset-flow")),
          onOverlayClosed: U[5] || (U[5] = (f) => E.$emit("overlay-toggle", { open: false, overlay: f })),
          onOverlayOpened: U[6] || (U[6] = (f) => E.$emit("overlay-toggle", { open: true, overlay: f }))
        }), createSlots({ _: 2 }, [
          renderList(unref(d), (f, B) => ({
            name: f,
            fn: withCtx((P) => [
              renderSlot(E.$slots, f, normalizeProps(guardReactiveProps(P)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
});
var wr = { class: "dp--header-wrap" };
var Dr = {
  key: 0,
  class: "dp__month_year_wrap"
};
var Mr = { key: 0 };
var $r = { class: "dp__month_year_wrap" };
var Ar = ["data-dp-element", "aria-label", "data-test", "onClick", "onKeydown"];
var Tr = defineComponent({
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
      defaultedAriaLabels: d,
      defaultedMultiCalendars: b,
      defaultedFilters: c,
      defaultedConfig: L,
      defaultedHighlight: v,
      propDates: _,
      defaultedUI: h2
    } = Ce(n), { transitionName: C, showTransition: H } = Xt(i), { buildMatrix: E } = bt(), { handleMonthYearChange: U, isDisabled: f, updateMonthYear: B } = Ql(n, a), { showLeftIcon: P, showRightIcon: Q } = ma(), ae = ref(false), oe = ref(false), ee = ref(false), S = ref([null, null, null, null]);
    onMounted(() => {
      a("mount");
    });
    const x = (D) => ({
      get: () => n[D],
      set: (V) => {
        const s = D === nt.month ? nt.year : nt.month;
        a("update-month-year", { [D]: V, [s]: n[s] }), D === nt.month ? g(true) : X(true);
      }
    }), Y = computed(x(nt.month)), q = computed(x(nt.year)), de = computed(() => (D) => ({
      month: n.month,
      year: n.year,
      items: D === nt.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: B,
      toggle: D === nt.month ? g : X
    })), ve = computed(() => {
      const D = n.months.find((V) => V.value === n.month);
      return D || { text: "", value: 0 };
    }), y = computed(() => Yt(n.months, (D) => {
      const V = n.month === D.value, s = Gt(
        D.value,
        Pn(n.year, _.value.minDate),
        Rn(n.year, _.value.maxDate)
      ) || c.value.months.includes(D.value), M = Yn(v.value, D.value, n.year);
      return { active: V, disabled: s, highlighted: M };
    })), z = computed(() => Yt(n.years, (D) => {
      const V = n.year === D.value, s = Gt(
        D.value,
        It(_.value.minDate),
        It(_.value.maxDate)
      ) || c.value.years.includes(D.value), M = qa(v.value, D.value);
      return { active: V, disabled: s, highlighted: M };
    })), te = (D, V, s) => {
      s !== void 0 ? D.value = s : D.value = !D.value, D.value ? (ee.value = true, a("overlay-opened", V)) : (ee.value = false, a("overlay-closed", V));
    }, g = (D = false, V) => {
      A(D), te(ae, He.month, V);
    }, X = (D = false, V) => {
      A(D), te(oe, He.year, V);
    }, A = (D) => {
      D || a("reset-flow");
    }, p = (D, V) => {
      n.arrowNavigation && (S.value[V] = Ie(D), E(S.value, "monthYear"));
    }, se = computed(() => {
      var D, V, s, M, F, u;
      return [
        {
          type: nt.month,
          index: 1,
          toggle: g,
          modelValue: Y.value,
          updateModelValue: (le) => Y.value = le,
          text: ve.value.text,
          showSelectionGrid: ae.value,
          items: y.value,
          ariaLabel: (D = d.value) == null ? void 0 : D.openMonthsOverlay,
          overlayLabel: ((s = (V = d.value).monthPicker) == null ? void 0 : s.call(V, true)) ?? void 0
        },
        {
          type: nt.year,
          index: 2,
          toggle: X,
          modelValue: q.value,
          updateModelValue: (le) => q.value = le,
          text: Sn(n.year, n.locale),
          showSelectionGrid: oe.value,
          items: z.value,
          ariaLabel: (M = d.value) == null ? void 0 : M.openYearsOverlay,
          overlayLabel: ((u = (F = d.value).yearPicker) == null ? void 0 : u.call(F, true)) ?? void 0
        }
      ];
    }), I = computed(() => n.disableYearSelect ? [se.value[0]] : n.yearFirst ? [...se.value].reverse() : se.value);
    return t({
      toggleMonthPicker: g,
      toggleYearPicker: X,
      handleMonthYearChange: U
    }), (D, V) => {
      var s, M, F, u, le, me;
      return openBlock(), createElementBlock("div", wr, [
        D.$slots["month-year"] ? (openBlock(), createElementBlock("div", Dr, [
          renderSlot(D.$slots, "month-year", normalizeProps(guardReactiveProps({ month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(B), handleMonthYearChange: unref(U), instance: e.instance })))
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          D.$slots["top-extra"] ? (openBlock(), createElementBlock("div", Mr, [
            renderSlot(D.$slots, "top-extra", { value: D.internalModelValue })
          ])) : createCommentVNode("", true),
          createBaseVNode("div", $r, [
            unref(P)(unref(b), e.instance) && !D.vertical ? (openBlock(), createBlock(Ut, {
              key: 0,
              "aria-label": (s = unref(d)) == null ? void 0 : s.prevMonth,
              disabled: unref(f)(false),
              class: normalizeClass((M = unref(h2)) == null ? void 0 : M.navBtnPrev),
              "el-name": "action-prev",
              onActivate: V[0] || (V[0] = ($) => unref(U)(false, true)),
              onSetRef: V[1] || (V[1] = ($) => p($, 0))
            }, {
              default: withCtx(() => [
                D.$slots["arrow-left"] ? renderSlot(D.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                D.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(za), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: D.disableYearSelect
              }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(I.value, ($, ge) => (openBlock(), createElementBlock(Fragment, {
                key: $.type
              }, [
                createBaseVNode("button", {
                  ref_for: true,
                  ref: (r) => p(r, ge + 1),
                  type: "button",
                  "data-dp-element": `overlay-${$.type}`,
                  class: normalizeClass(["dp__btn dp__month_year_select", { "dp--hidden-el": ee.value }]),
                  "aria-label": `${$.text}-${$.ariaLabel}`,
                  "data-test": `${$.type}-toggle-overlay-${e.instance}`,
                  onClick: $.toggle,
                  onKeydown: (r) => unref(Ke)(r, () => $.toggle(), true)
                }, [
                  D.$slots[$.type] ? renderSlot(D.$slots, $.type, {
                    key: 0,
                    text: $.text,
                    value: n[$.type]
                  }) : createCommentVNode("", true),
                  D.$slots[$.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString($.text), 1)
                  ], 64))
                ], 42, Ar),
                createVNode(Transition, {
                  name: unref(C)($.showSelectionGrid),
                  css: unref(H)
                }, {
                  default: withCtx(() => [
                    $.showSelectionGrid ? (openBlock(), createBlock(qt, {
                      key: 0,
                      items: $.items,
                      "arrow-navigation": D.arrowNavigation,
                      "hide-navigation": D.hideNavigation,
                      "is-last": D.autoApply && !unref(L).keepActionRow,
                      "skip-button-ref": false,
                      config: D.config,
                      type: $.type,
                      "header-refs": [],
                      "esc-close": D.escClose,
                      "menu-wrap-ref": D.menuWrapRef,
                      "text-input": D.textInput,
                      "aria-labels": D.ariaLabels,
                      "overlay-label": $.overlayLabel,
                      onSelected: $.updateModelValue,
                      onToggle: $.toggle
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        D.$slots["calendar-icon"] ? renderSlot(D.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        D.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      D.$slots[`${$.type}-overlay-value`] ? {
                        name: "item",
                        fn: withCtx(({ item: r }) => [
                          renderSlot(D.$slots, `${$.type}-overlay-value`, {
                            text: r.text,
                            value: r.value
                          })
                        ]),
                        key: "0"
                      } : void 0,
                      D.$slots[`${$.type}-overlay`] ? {
                        name: "overlay",
                        fn: withCtx(() => [
                          renderSlot(D.$slots, `${$.type}-overlay`, mergeProps({ ref_for: true }, de.value($.type)))
                        ]),
                        key: "1"
                      } : void 0,
                      D.$slots[`${$.type}-overlay-header`] ? {
                        name: "header",
                        fn: withCtx(() => [
                          renderSlot(D.$slots, `${$.type}-overlay-header`, {
                            toggle: $.toggle
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
            unref(P)(unref(b), e.instance) && D.vertical ? (openBlock(), createBlock(Ut, {
              key: 1,
              "aria-label": (F = unref(d)) == null ? void 0 : F.prevMonth,
              "el-name": "action-prev",
              disabled: unref(f)(false),
              class: normalizeClass((u = unref(h2)) == null ? void 0 : u.navBtnPrev),
              onActivate: V[2] || (V[2] = ($) => unref(U)(false, true))
            }, {
              default: withCtx(() => [
                D.$slots["arrow-up"] ? renderSlot(D.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                D.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Va), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
            unref(Q)(unref(b), e.instance) ? (openBlock(), createBlock(Ut, {
              key: 2,
              ref: "rightIcon",
              "el-name": "action-next",
              disabled: unref(f)(true),
              "aria-label": (le = unref(d)) == null ? void 0 : le.nextMonth,
              class: normalizeClass((me = unref(h2)) == null ? void 0 : me.navBtnNext),
              onActivate: V[3] || (V[3] = ($) => unref(U)(true, true)),
              onSetRef: V[4] || (V[4] = ($) => p($, D.disableYearSelect ? 2 : 3))
            }, {
              default: withCtx(() => [
                D.$slots[D.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(D.$slots, D.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                D.$slots[D.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(D.vertical ? unref(Wa) : unref(Ha)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label", "class"])) : createCommentVNode("", true)
          ])
        ], 64))
      ]);
    };
  }
});
var Sr = {
  class: "dp__calendar_header",
  role: "row"
};
var Pr = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Rr = ["aria-label"];
var Cr = {
  key: 0,
  class: "dp__calendar_item dp__week_num",
  role: "gridcell"
};
var Or = { class: "dp__cell_inner" };
var _r = ["id", "aria-pressed", "aria-disabled", "aria-label", "tabindex", "data-test", "onClick", "onTouchend", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
var Br = defineComponent({
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
      defaultedTransitions: d,
      defaultedConfig: b,
      defaultedAriaLabels: c,
      defaultedMultiCalendars: L,
      defaultedWeekNumbers: v,
      defaultedMultiDates: _,
      defaultedUI: h2
    } = Ce(n), C = ref(null), H = ref({
      bottom: "",
      left: "",
      transform: ""
    }), E = ref([]), U = ref(null), f = ref(true), B = ref(""), P = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), Q = ref([]), ae = ref({ left: "50%" }), oe = ref(false), ee = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), S = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : yl(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: E }), b.value.noSwipe || U.value && (U.value.addEventListener("touchstart", p, { passive: false }), U.value.addEventListener("touchend", se, { passive: false }), U.value.addEventListener("touchmove", I, { passive: false })), n.monthChangeOnScroll && U.value && U.value.addEventListener("wheel", s, { passive: false });
    });
    const x = ($) => $ ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", Y = ($, ge) => {
      if (n.transitions) {
        const r = Ge(dt(G(), n.month, n.year));
        B.value = Be(Ge(dt(G(), $, ge)), r) ? d.value[x(true)] : d.value[x(false)], f.value = false, nextTick(() => {
          f.value = true;
        });
      }
    }, q = computed(
      () => ({
        ...h2.value.calendar ?? {}
      })
    ), de = computed(() => ($) => {
      const ge = hl($);
      return {
        dp__marker_dot: ge.type === "dot",
        dp__marker_line: ge.type === "line"
      };
    }), ve = computed(() => ($) => Me($, C.value)), y = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: L.value.count > 0 && n.instance !== 0
    })), z = computed(() => ($) => n.hideOffsetDates ? $.current : true), te = async ($, ge) => {
      const { width: r, height: R } = $.getBoundingClientRect();
      C.value = ge.value;
      let O = { left: `${r / 2}px` }, W = -50;
      if (await nextTick(), Q.value[0]) {
        const { left: ue, width: w } = Q.value[0].getBoundingClientRect();
        ue < 0 && (O = { left: "0" }, W = 0, ae.value.left = `${r / 2}px`), window.innerWidth < ue + w && (O = { right: "0" }, W = 0, ae.value.left = `${w - r / 2}px`);
      }
      H.value = {
        bottom: `${R}px`,
        ...O,
        transform: `translateX(${W}%)`
      };
    }, g = async ($, ge, r) => {
      var O, W, ue;
      const R = Ie(E.value[ge][r]);
      R && ((O = $.marker) != null && O.customPosition && ((ue = (W = $.marker) == null ? void 0 : W.tooltip) != null && ue.length) ? H.value = $.marker.customPosition(R) : await te(R, $), a("tooltip-open", $.marker));
    }, X = async ($, ge, r) => {
      var R, O;
      if (oe.value && _.value.enabled && _.value.dragSelect)
        return a("select-date", $);
      a("set-hover-date", $), (O = (R = $.marker) == null ? void 0 : R.tooltip) != null && O.length && await g($, ge, r);
    }, A = ($) => {
      C.value && (C.value = null, H.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", $.marker));
    }, p = ($) => {
      P.value.startX = $.changedTouches[0].screenX, P.value.startY = $.changedTouches[0].screenY;
    }, se = ($) => {
      P.value.endX = $.changedTouches[0].screenX, P.value.endY = $.changedTouches[0].screenY, D();
    }, I = ($) => {
      n.vertical && !n.inline && $.preventDefault();
    }, D = () => {
      const $ = n.vertical ? "Y" : "X";
      Math.abs(P.value[`start${$}`] - P.value[`end${$}`]) > 10 && a("handle-swipe", P.value[`start${$}`] > P.value[`end${$}`] ? "right" : "left");
    }, V = ($, ge, r) => {
      $ && (Array.isArray(E.value[ge]) ? E.value[ge][r] = $ : E.value[ge] = [$]), n.arrowNavigation && i(E.value, "calendar");
    }, s = ($) => {
      n.monthChangeOnScroll && ($.preventDefault(), a("handle-scroll", $));
    }, M = ($) => v.value.type === "local" ? getWeek($.value, { weekStartsOn: +n.weekStart }) : v.value.type === "iso" ? getISOWeek($.value) : typeof v.value.type == "function" ? v.value.type($.value) : "", F = ($) => {
      const ge = $[0];
      return v.value.hideOnOffsetDates ? $.some((r) => r.current) ? M(ge) : "" : M(ge);
    }, u = ($, ge, r = true) => {
      r && sn() || !r && !sn() || _.value.enabled || (yt($, b.value), a("select-date", ge));
    }, le = ($) => {
      yt($, b.value);
    }, me = ($) => {
      _.value.enabled && _.value.dragSelect ? (oe.value = true, a("select-date", $)) : _.value.enabled && a("select-date", $);
    };
    return t({ triggerTransition: Y }), ($, ge) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(y.value)
    }, [
      createBaseVNode("div", {
        ref_key: "calendarWrapRef",
        ref: U,
        class: normalizeClass(q.value),
        role: "grid"
      }, [
        createBaseVNode("div", Sr, [
          $.weekNumbers ? (openBlock(), createElementBlock("div", Pr, toDisplayString($.weekNumName), 1)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(S.value, (r, R) => {
            var O, W;
            return openBlock(), createElementBlock("div", {
              key: R,
              class: "dp__calendar_header_item",
              role: "gridcell",
              "data-test": "calendar-header",
              "aria-label": (W = (O = unref(c)) == null ? void 0 : O.weekDay) == null ? void 0 : W.call(O, R)
            }, [
              $.$slots["calendar-header"] ? renderSlot($.$slots, "calendar-header", {
                key: 0,
                day: r,
                index: R
              }) : createCommentVNode("", true),
              $.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(r), 1)
              ], 64))
            ], 8, Rr);
          }), 128))
        ]),
        ge[2] || (ge[2] = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1)),
        createVNode(Transition, {
          name: B.value,
          css: !!$.transitions
        }, {
          default: withCtx(() => [
            f.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "dp__calendar",
              role: "rowgroup",
              onMouseleave: ge[1] || (ge[1] = (r) => oe.value = false)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(ee.value, (r, R) => (openBlock(), createElementBlock("div", {
                key: R,
                class: "dp__calendar_row",
                role: "row"
              }, [
                $.weekNumbers ? (openBlock(), createElementBlock("div", Cr, [
                  createBaseVNode("div", Or, toDisplayString(F(r.days)), 1)
                ])) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(r.days, (O, W) => {
                  var ue, w, N2;
                  return openBlock(), createElementBlock("div", {
                    id: unref(In)(O.value),
                    ref_for: true,
                    ref: (ce) => V(ce, R, W),
                    key: W + R,
                    role: "gridcell",
                    class: "dp__calendar_item",
                    "aria-pressed": (O.classData.dp__active_date || O.classData.dp__range_start || O.classData.dp__range_start) ?? void 0,
                    "aria-disabled": O.classData.dp__cell_disabled || void 0,
                    "aria-label": (w = (ue = unref(c)) == null ? void 0 : ue.day) == null ? void 0 : w.call(ue, O),
                    tabindex: !O.current && $.hideOffsetDates ? void 0 : 0,
                    "data-test": O.value,
                    onClick: withModifiers((ce) => u(ce, O), ["prevent"]),
                    onTouchend: (ce) => u(ce, O, false),
                    onKeydown: (ce) => unref(Ke)(ce, () => $.$emit("select-date", O)),
                    onMouseenter: (ce) => X(O, R, W),
                    onMouseleave: (ce) => A(O),
                    onMousedown: (ce) => me(O),
                    onMouseup: ge[0] || (ge[0] = (ce) => oe.value = false)
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__cell_inner", O.classData])
                    }, [
                      $.$slots.day && z.value(O) ? renderSlot($.$slots, "day", {
                        key: 0,
                        day: +O.text,
                        date: O.value
                      }) : createCommentVNode("", true),
                      $.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createTextVNode(toDisplayString(O.text), 1)
                      ], 64)),
                      O.marker && z.value(O) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                        $.$slots.marker ? renderSlot($.$slots, "marker", {
                          key: 0,
                          marker: O.marker,
                          day: +O.text,
                          date: O.value
                        }) : (openBlock(), createElementBlock("div", {
                          key: 1,
                          class: normalizeClass(de.value(O.marker)),
                          style: normalizeStyle(O.marker.color ? { backgroundColor: O.marker.color } : {})
                        }, null, 6))
                      ], 64)) : createCommentVNode("", true),
                      ve.value(O.value) ? (openBlock(), createElementBlock("div", {
                        key: 3,
                        ref_for: true,
                        ref_key: "activeTooltip",
                        ref: Q,
                        class: "dp__marker_tooltip",
                        style: normalizeStyle(H.value)
                      }, [
                        (N2 = O.marker) != null && N2.tooltip ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: "dp__tooltip_content",
                          onClick: le
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(O.marker.tooltip, (ce, he2) => (openBlock(), createElementBlock("div", {
                            key: he2,
                            class: "dp__tooltip_text"
                          }, [
                            $.$slots["marker-tooltip"] ? renderSlot($.$slots, "marker-tooltip", {
                              key: 0,
                              tooltip: ce,
                              day: O.value
                            }) : createCommentVNode("", true),
                            $.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createBaseVNode("div", {
                                class: "dp__tooltip_mark",
                                style: normalizeStyle(ce.color ? { backgroundColor: ce.color } : {})
                              }, null, 4),
                              createBaseVNode("div", null, toDisplayString(ce.text), 1)
                            ], 64))
                          ]))), 128)),
                          createBaseVNode("div", {
                            class: "dp__arrow_bottom_tp",
                            style: normalizeStyle(ae.value)
                          }, null, 4)
                        ])) : createCommentVNode("", true)
                      ], 4)) : createCommentVNode("", true)
                    ], 2)
                  ], 40, _r);
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
var vn = (e) => Array.isArray(e);
var Yr = (e, t, l, a) => {
  const n = ref([]), i = ref(/* @__PURE__ */ new Date()), d = ref(), b = () => p(e.isTextInputDate), { modelValue: c, calendars: L, time: v, today: _ } = Jt(e, t, b), {
    defaultedMultiCalendars: h2,
    defaultedStartTime: C,
    defaultedRange: H,
    defaultedConfig: E,
    defaultedTz: U,
    propDates: f,
    defaultedMultiDates: B
  } = Ce(e), { validateMonthYearInRange: P, isDisabled: Q, isDateRangeAllowed: ae, checkMinMaxRange: oe } = kt(e), { updateTimeValues: ee, getSetDateTime: S, setTime: x, assignStartTime: Y, validateTime: q, disabledTimesConfig: de } = Un(e, v, c, a), ve = computed(
    () => (k) => L.value[k] ? L.value[k].month : 0
  ), y = computed(
    () => (k) => L.value[k] ? L.value[k].year : 0
  ), z = (k) => !E.value.keepViewOnOffsetClick || k ? true : !d.value, te = (k, m, j, re = false) => {
    var Ae2, Fe;
    z(re) && (L.value[k] || (L.value[k] = { month: 0, year: 0 }), L.value[k].month = on(m) ? (Ae2 = L.value[k]) == null ? void 0 : Ae2.month : m, L.value[k].year = on(j) ? (Fe = L.value[k]) == null ? void 0 : Fe.year : j);
  }, g = () => {
    e.autoApply && t("select-date");
  };
  onMounted(() => {
    e.shadow || (c.value || ($(), C.value && Y(C.value)), p(true), e.focusStartDate && e.startDate && $());
  });
  const X = computed(() => {
    var k;
    return (k = e.flow) != null && k.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), A = () => {
    e.autoApply && X.value && t("auto-apply", e.partialFlow ? e.flowStep !== e.flow.length : false);
  }, p = (k = false) => {
    if (c.value)
      return Array.isArray(c.value) ? (n.value = c.value, F(k)) : D(c.value, k);
    if (h2.value.count && k && !e.startDate)
      return I(G(), k);
  }, se = () => Array.isArray(c.value) && H.value.enabled ? getMonth(c.value[0]) === getMonth(c.value[1] ?? c.value[0]) : false, I = (k = /* @__PURE__ */ new Date(), m = false) => {
    if ((!h2.value.count || !h2.value.static || m) && te(0, getMonth(k), getYear(k)), h2.value.count && (!h2.value.solo || !c.value || se()))
      for (let j = 1; j < h2.value.count; j++) {
        const re = set(G(), { month: ve.value(j - 1), year: y.value(j - 1) }), Ae2 = add(re, { months: 1 });
        L.value[j] = { month: getMonth(Ae2), year: getYear(Ae2) };
      }
  }, D = (k, m) => {
    I(k), x("hours", getHours(k)), x("minutes", getMinutes(k)), x("seconds", getSeconds(k)), h2.value.count && m && me();
  }, V = (k) => {
    if (h2.value.count) {
      if (h2.value.solo) return 0;
      const m = getMonth(k[0]), j = getMonth(k[1]);
      return Math.abs(j - m) < h2.value.count ? 0 : 1;
    }
    return 1;
  }, s = (k, m) => {
    k[1] && H.value.showLastInRange ? I(k[V(k)], m) : I(k[0], m);
    const j = (re, Ae2) => [
      re(k[0]),
      k[1] ? re(k[1]) : v[Ae2][1]
    ];
    x("hours", j(getHours, "hours")), x("minutes", j(getMinutes, "minutes")), x("seconds", j(getSeconds, "seconds"));
  }, M = (k, m) => {
    if ((H.value.enabled || e.weekPicker) && !B.value.enabled)
      return s(k, m);
    if (B.value.enabled && m) {
      const j = k[k.length - 1];
      return D(j, m);
    }
  }, F = (k) => {
    const m = c.value;
    M(m, k), h2.value.count && h2.value.solo && me();
  }, u = (k, m) => {
    const j = set(G(), { month: ve.value(m), year: y.value(m) }), re = k < 0 ? addMonths(j, 1) : subMonths(j, 1);
    P(getMonth(re), getYear(re), k < 0, e.preventMinMaxNavigation) && (te(m, getMonth(re), getYear(re)), t("update-month-year", { instance: m, month: getMonth(re), year: getYear(re) }), h2.value.count && !h2.value.solo && le(m), l());
  }, le = (k) => {
    for (let m = k - 1; m >= 0; m--) {
      const j = subMonths(set(G(), { month: ve.value(m + 1), year: y.value(m + 1) }), 1);
      te(m, getMonth(j), getYear(j));
    }
    for (let m = k + 1; m <= h2.value.count - 1; m++) {
      const j = addMonths(set(G(), { month: ve.value(m - 1), year: y.value(m - 1) }), 1);
      te(m, getMonth(j), getYear(j));
    }
  }, me = () => {
    if (Array.isArray(c.value) && c.value.length === 2) {
      const k = G(
        G(c.value[1] ? c.value[1] : addMonths(c.value[0], 1))
      ), [m, j] = [getMonth(c.value[0]), getYear(c.value[0])], [re, Ae2] = [getMonth(c.value[1]), getYear(c.value[1])];
      (m !== re || m === re && j !== Ae2) && h2.value.solo && te(1, getMonth(k), getYear(k));
    } else c.value && !Array.isArray(c.value) && (te(0, getMonth(c.value), getYear(c.value)), I(G()));
  }, $ = () => {
    e.startDate && (te(0, getMonth(G(e.startDate)), getYear(G(e.startDate))), h2.value.count && le(0));
  }, ge = (k, m) => {
    if (e.monthChangeOnScroll) {
      const j = (/* @__PURE__ */ new Date()).getTime() - i.value.getTime(), re = Math.abs(k.deltaY);
      let Ae2 = 500;
      re > 1 && (Ae2 = 100), re > 100 && (Ae2 = 0), j > Ae2 && (i.value = /* @__PURE__ */ new Date(), u(e.monthChangeOnScroll !== "inverse" ? -k.deltaY : k.deltaY, m));
    }
  }, r = (k, m, j = false) => {
    e.monthChangeOnArrows && e.vertical === j && R(k, m);
  }, R = (k, m) => {
    u(k === "right" ? -1 : 1, m);
  }, O = (k) => {
    if (f.value.markers)
      return sa(k.value, f.value.markers);
  }, W = (k, m) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [k == 0, true];
      case "fair":
        return [k == 0 || m > k, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, ue = (k, m, j, re) => {
    if (e.sixWeeks && k.length < 6) {
      const Ae2 = 6 - k.length, Fe = (m.getDay() + 7 - re) % 7, xt2 = 6 - (j.getDay() + 7 - re) % 7, [zt2, Da2] = W(Fe, xt2);
      for (let Dt2 = 1; Dt2 <= Ae2; Dt2++)
        if (Da2 ? !!(Dt2 % 2) == zt2 : zt2) {
          const ea2 = k[0].days[0], Ma2 = w(addDays(ea2.value, -7), getMonth(m));
          k.unshift({ days: Ma2 });
        } else {
          const ea2 = k[k.length - 1], Ma2 = ea2.days[ea2.days.length - 1], Wn2 = w(addDays(Ma2.value, 1), getMonth(m));
          k.push({ days: Wn2 });
        }
    }
    return k;
  }, w = (k, m) => {
    const j = G(k), re = [];
    for (let Ae2 = 0; Ae2 < 7; Ae2++) {
      const Fe = addDays(j, Ae2), wt2 = getMonth(Fe) !== m;
      re.push({
        text: e.hideOffsetDates && wt2 ? "" : Fe.getDate(),
        value: Fe,
        current: !wt2,
        classData: {}
      });
    }
    return re;
  }, N2 = (k, m) => {
    const j = [], re = new Date(m, k), Ae2 = new Date(m, k + 1, 0), Fe = e.weekStart, wt2 = startOfWeek(re, { weekStartsOn: Fe }), xt2 = (zt2) => {
      const Da2 = w(zt2, k);
      if (j.push({ days: Da2 }), !j[j.length - 1].days.some(
        (Dt2) => Me(Ge(Dt2.value), Ge(Ae2))
      )) {
        const Dt2 = addDays(zt2, 7);
        xt2(Dt2);
      }
    };
    return xt2(wt2), ue(j, re, Ae2, Fe);
  }, ce = (k) => {
    const m = gt(G(k.value), v.hours, v.minutes, Xe2());
    t("date-update", m), B.value.enabled ? Xa(m, c, B.value.limit) : c.value = m, a(), nextTick().then(() => {
      A();
    });
  }, he2 = (k) => H.value.noDisabledRange ? Cn(n.value[0], k).some((j) => Q(j)) : false, et2 = () => {
    n.value = c.value ? c.value.slice() : [], n.value.length === 2 && !(H.value.fixedStart || H.value.fixedEnd) && (n.value = []);
  }, fe = (k, m) => {
    const j = [
      G(k.value),
      addDays(G(k.value), +H.value.autoRange)
    ];
    ae(j) ? (m && vt2(k.value), n.value = j) : t("invalid-date", k.value);
  }, vt2 = (k) => {
    const m = getMonth(G(k)), j = getYear(G(k));
    if (te(0, m, j), h2.value.count > 0)
      for (let re = 1; re < h2.value.count; re++) {
        const Ae2 = Al(
          set(G(k), { year: y.value(re - 1), month: ve.value(re - 1) })
        );
        te(re, Ae2.month, Ae2.year);
      }
  }, ot2 = (k) => {
    if (he2(k.value) || !oe(k.value, c.value, H.value.fixedStart ? 0 : 1))
      return t("invalid-date", k.value);
    n.value = Ln(G(k.value), c, t, H);
  }, Ft2 = (k, m) => {
    if (et2(), H.value.autoRange) return fe(k, m);
    if (H.value.fixedStart || H.value.fixedEnd) return ot2(k);
    n.value[0] ? oe(G(k.value), c.value) && !he2(k.value) ? Oe(G(k.value), G(n.value[0])) ? (n.value.unshift(G(k.value)), t("range-end", n.value[0])) : (n.value[1] = G(k.value), t("range-end", n.value[1])) : (e.autoApply && t("auto-apply-invalid", k.value), t("invalid-date", k.value)) : (n.value[0] = G(k.value), t("range-start", n.value[0]));
  }, Xe2 = (k = true) => e.enableSeconds ? Array.isArray(v.seconds) ? k ? v.seconds[0] : v.seconds[1] : v.seconds : 0, Lt2 = (k) => {
    n.value[k] = gt(
      n.value[k],
      v.hours[k],
      v.minutes[k],
      Xe2(k !== 1)
    );
  }, pa2 = () => {
    var k, m;
    n.value[0] && n.value[1] && +((k = n.value) == null ? void 0 : k[0]) > +((m = n.value) == null ? void 0 : m[1]) && (n.value.reverse(), t("range-start", n.value[0]), t("range-end", n.value[1]));
  }, Zt2 = () => {
    n.value.length && (n.value[0] && !n.value[1] ? Lt2(0) : (Lt2(0), Lt2(1), a()), pa2(), c.value = n.value.slice(), va(n.value, t, e.autoApply, e.modelAuto));
  }, ya2 = (k, m = false) => {
    if (Q(k.value) || !k.current && e.hideOffsetDates) return t("invalid-date", k.value);
    if (d.value = JSON.parse(JSON.stringify(k)), !H.value.enabled) return ce(k);
    vn(v.hours) && vn(v.minutes) && !B.value.enabled && (Ft2(k, m), Zt2());
  }, ga2 = (k, m) => {
    var re;
    te(k, m.month, m.year, true), h2.value.count && !h2.value.solo && le(k), t("update-month-year", { instance: k, month: m.month, year: m.year }), l(h2.value.solo ? k : void 0);
    const j = (re = e.flow) != null && re.length ? e.flow[e.flowStep] : void 0;
    !m.fromNav && (j === He.month || j === He.year) && a();
  }, ha2 = (k, m) => {
    Fn({
      value: k,
      modelValue: c,
      range: H.value.enabled,
      timezone: m ? void 0 : U.value.timezone
    }), g(), e.multiCalendars && nextTick().then(() => p(true));
  }, ba2 = () => {
    const k = ja(G(), U.value);
    H.value.enabled ? c.value && Array.isArray(c.value) && c.value[0] ? c.value = Oe(k, c.value[0]) ? [k, c.value[0]] : [c.value[0], k] : c.value = [k] : c.value = k, g();
  }, ka2 = () => {
    if (Array.isArray(c.value))
      if (B.value.enabled) {
        const k = wa2();
        c.value[c.value.length - 1] = S(k);
      } else
        c.value = c.value.map((k, m) => k && S(k, m));
    else
      c.value = S(c.value);
    t("time-update");
  }, wa2 = () => Array.isArray(c.value) && c.value.length ? c.value[c.value.length - 1] : null;
  return {
    calendars: L,
    modelValue: c,
    month: ve,
    year: y,
    time: v,
    disabledTimesConfig: de,
    today: _,
    validateTime: q,
    getCalendarDays: N2,
    getMarker: O,
    handleScroll: ge,
    handleSwipe: R,
    handleArrow: r,
    selectDate: ya2,
    updateMonthYear: ga2,
    presetDate: ha2,
    selectCurrentDate: ba2,
    updateTime: (k, m = true, j = false) => {
      ee(k, m, j, ka2);
    },
    assignMonthAndYear: I
  };
};
var Ir = { key: 0 };
var Nr = defineComponent({
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
      month: d,
      year: b,
      modelValue: c,
      time: L,
      disabledTimesConfig: v,
      today: _,
      validateTime: h2,
      getCalendarDays: C,
      getMarker: H,
      handleArrow: E,
      handleScroll: U,
      handleSwipe: f,
      selectDate: B,
      updateMonthYear: P,
      presetDate: Q,
      selectCurrentDate: ae,
      updateTime: oe,
      assignMonthAndYear: ee
    } = Yr(n, a, se, I), S = useSlots(), { setHoverDate: x, getDayClassData: Y, clearHoverDate: q } = Jr(c, n), { defaultedMultiCalendars: de } = Ce(n), ve = ref([]), y = ref([]), z = ref(null), te = Je(S, "calendar"), g = Je(S, "monthYear"), X = Je(S, "timePicker"), A = (r) => {
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
      de,
      (r, R) => {
        r.count - R.count > 0 && ee();
      },
      { deep: true }
    );
    const p = computed(() => (r) => C(d.value(r), b.value(r)).map((R) => ({
      ...R,
      days: R.days.map((O) => (O.marker = H(O), O.classData = Y(O), O))
    })));
    function se(r) {
      var R;
      r || r === 0 ? (R = y.value[r]) == null || R.triggerTransition(d.value(r), b.value(r)) : y.value.forEach((O, W) => O.triggerTransition(d.value(W), b.value(W)));
    }
    function I() {
      a("update-flow-step");
    }
    const D = (r, R = false) => {
      B(r, R), n.spaceConfirm && a("select-date");
    }, V = (r, R, O = 0) => {
      var W;
      (W = ve.value[O]) == null || W.toggleMonthPicker(r, R);
    }, s = (r, R, O = 0) => {
      var W;
      (W = ve.value[O]) == null || W.toggleYearPicker(r, R);
    }, M = (r, R, O) => {
      var W;
      (W = z.value) == null || W.toggleTimePicker(r, R, O);
    }, F = (r, R) => {
      var O;
      if (!n.range) {
        const W = c.value ? c.value : _, ue = R ? new Date(R) : W, w = r ? startOfWeek(ue, { weekStartsOn: 1 }) : endOfWeek(ue, { weekStartsOn: 1 });
        B({
          value: w,
          current: getMonth(ue) === d.value(0),
          text: "",
          classData: {}
        }), (O = document.getElementById(In(w))) == null || O.focus();
      }
    }, u = (r) => {
      var R;
      (R = ve.value[0]) == null || R.handleMonthYearChange(r, true);
    }, le = (r) => {
      P(0, { month: d.value(0), year: b.value(0) + (r ? 1 : -1), fromNav: true });
    }, me = (r, R) => {
      r === He.time && a(`time-picker-${R ? "open" : "close"}`), a("overlay-toggle", { open: R, overlay: r });
    }, $ = (r) => {
      a("overlay-toggle", { open: false, overlay: r }), a("focus-menu");
    };
    return t({
      clearHoverDate: q,
      presetDate: Q,
      selectCurrentDate: ae,
      toggleMonthPicker: V,
      toggleYearPicker: s,
      toggleTimePicker: M,
      handleArrow: E,
      updateMonthYear: P,
      getSidebarProps: () => ({
        modelValue: c,
        month: d,
        year: b,
        time: L,
        updateTime: oe,
        updateMonthYear: P,
        selectDate: B,
        presetDate: Q
      }),
      changeMonth: u,
      changeYear: le,
      selectWeekDate: F
    }), (r, R) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(fa, {
        "multi-calendars": unref(de).count,
        collapse: r.collapse
      }, {
        default: withCtx(({ instance: O, index: W }) => [
          r.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Tr, mergeProps({
            key: 0,
            ref: (ue) => {
              ue && (ve.value[W] = ue);
            },
            months: unref($n)(r.formatLocale, r.locale, r.monthNameFormat),
            years: unref(Ka)(r.yearRange, r.locale, r.reverseYears),
            month: unref(d)(O),
            year: unref(b)(O),
            instance: O
          }, r.$props, {
            onMount: R[0] || (R[0] = (ue) => A(unref(Tt).header)),
            onResetFlow: R[1] || (R[1] = (ue) => r.$emit("reset-flow")),
            onUpdateMonthYear: (ue) => unref(P)(O, ue),
            onOverlayClosed: $,
            onOverlayOpened: R[2] || (R[2] = (ue) => r.$emit("overlay-toggle", { open: true, overlay: ue }))
          }), createSlots({ _: 2 }, [
            renderList(unref(g), (ue, w) => ({
              name: ue,
              fn: withCtx((N2) => [
                renderSlot(r.$slots, ue, normalizeProps(guardReactiveProps(N2)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Br, mergeProps({
            ref: (ue) => {
              ue && (y.value[W] = ue);
            },
            "mapped-dates": p.value(O),
            month: unref(d)(O),
            year: unref(b)(O),
            instance: O
          }, r.$props, {
            onSelectDate: (ue) => unref(B)(ue, O !== 1),
            onHandleSpace: (ue) => D(ue, O !== 1),
            onSetHoverDate: R[3] || (R[3] = (ue) => unref(x)(ue)),
            onHandleScroll: (ue) => unref(U)(ue, O),
            onHandleSwipe: (ue) => unref(f)(ue, O),
            onMount: R[4] || (R[4] = (ue) => A(unref(Tt).calendar)),
            onResetFlow: R[5] || (R[5] = (ue) => r.$emit("reset-flow")),
            onTooltipOpen: R[6] || (R[6] = (ue) => r.$emit("tooltip-open", ue)),
            onTooltipClose: R[7] || (R[7] = (ue) => r.$emit("tooltip-close", ue))
          }), createSlots({ _: 2 }, [
            renderList(unref(te), (ue, w) => ({
              name: ue,
              fn: withCtx((N2) => [
                renderSlot(r.$slots, ue, normalizeProps(guardReactiveProps({ ...N2 })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      r.enableTimePicker ? (openBlock(), createElementBlock("div", Ir, [
        r.$slots["time-picker"] ? renderSlot(r.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(L), updateTime: unref(oe) }))) : (openBlock(), createBlock(Hn, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: z
        }, r.$props, {
          hours: unref(L).hours,
          minutes: unref(L).minutes,
          seconds: unref(L).seconds,
          "internal-model-value": r.internalModelValue,
          "disabled-times-config": unref(v),
          "validate-time": unref(h2),
          onMount: R[8] || (R[8] = (O) => A(unref(Tt).timePicker)),
          "onUpdate:hours": R[9] || (R[9] = (O) => unref(oe)(O)),
          "onUpdate:minutes": R[10] || (R[10] = (O) => unref(oe)(O, false)),
          "onUpdate:seconds": R[11] || (R[11] = (O) => unref(oe)(O, false, true)),
          onResetFlow: R[12] || (R[12] = (O) => r.$emit("reset-flow")),
          onOverlayClosed: R[13] || (R[13] = (O) => me(O, false)),
          onOverlayOpened: R[14] || (R[14] = (O) => me(O, true)),
          onAmPmChange: R[15] || (R[15] = (O) => r.$emit("am-pm-change", O))
        }), createSlots({ _: 2 }, [
          renderList(unref(X), (O, W) => ({
            name: O,
            fn: withCtx((ue) => [
              renderSlot(r.$slots, O, normalizeProps(guardReactiveProps(ue)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Er = (e, t) => {
  const l = ref(), {
    defaultedMultiCalendars: a,
    defaultedConfig: n,
    defaultedHighlight: i,
    defaultedRange: d,
    propDates: b,
    defaultedFilters: c,
    defaultedMultiDates: L
  } = Ce(e), { modelValue: v, year: _, month: h2, calendars: C } = Jt(e, t), { isDisabled: H } = kt(e), { selectYear: E, groupedYears: U, showYearPicker: f, isDisabled: B, toggleYearPicker: P, handleYearSelect: Q, handleYear: ae } = zn({
    modelValue: v,
    multiCalendars: a,
    range: d,
    highlight: i,
    calendars: C,
    propDates: b,
    month: h2,
    year: _,
    filters: c,
    props: e,
    emit: t
  }), oe = (g, X) => [g, X].map((A) => format(A, "MMMM", { locale: e.formatLocale })).join("-"), ee = computed(() => (g) => v.value ? Array.isArray(v.value) ? v.value.some((X) => isSameQuarter(g, X)) : isSameQuarter(v.value, g) : false), S = (g) => {
    if (d.value.enabled) {
      if (Array.isArray(v.value)) {
        const X = Me(g, v.value[0]) || Me(g, v.value[1]);
        return da(v.value, l.value, g) && !X;
      }
      return false;
    }
    return false;
  }, x = (g, X) => g.quarter === getQuarter(X) && g.year === getYear(X), Y = (g) => typeof i.value == "function" ? i.value({ quarter: getQuarter(g), year: getYear(g) }) : !!i.value.quarters.find((X) => x(X, g)), q = computed(() => (g) => {
    const X = set(/* @__PURE__ */ new Date(), { year: _.value(g) });
    return eachQuarterOfInterval({
      start: startOfYear(X),
      end: endOfYear(X)
    }).map((A) => {
      const p = startOfQuarter(A), se = endOfQuarter(A), I = H(A), D = S(p), V = Y(p);
      return {
        text: oe(p, se),
        value: p,
        active: ee.value(p),
        highlighted: V,
        disabled: I,
        isBetween: D
      };
    });
  }), de = (g) => {
    Xa(g, v, L.value.limit), t("auto-apply", true);
  }, ve = (g) => {
    v.value = Ja(v, g, t), va(v.value, t, e.autoApply, e.modelAuto);
  }, y = (g) => {
    v.value = g, t("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a,
    groupedYears: U,
    year: _,
    isDisabled: B,
    quarters: q,
    showYearPicker: f,
    modelValue: v,
    setHoverDate: (g) => {
      l.value = g;
    },
    selectYear: E,
    selectQuarter: (g, X, A) => {
      if (!A)
        return C.value[X].month = getMonth(endOfQuarter(g)), L.value.enabled ? de(g) : d.value.enabled ? ve(g) : y(g);
    },
    toggleYearPicker: P,
    handleYearSelect: Q,
    handleYear: ae
  };
};
var Fr = { class: "dp--quarter-items" };
var Lr = ["data-test", "disabled", "onClick", "onMouseover"];
var zr = defineComponent({
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
    const a = l, n = e, i = useSlots(), d = Je(i, "yearMode"), {
      defaultedMultiCalendars: b,
      defaultedConfig: c,
      groupedYears: L,
      year: v,
      isDisabled: _,
      quarters: h2,
      modelValue: C,
      showYearPicker: H,
      setHoverDate: E,
      selectQuarter: U,
      toggleYearPicker: f,
      handleYearSelect: B,
      handleYear: P
    } = Er(n, a);
    return t({ getSidebarProps: () => ({
      modelValue: C,
      year: v,
      selectQuarter: U,
      handleYearSelect: B,
      handleYear: P
    }) }), (ae, oe) => (openBlock(), createBlock(fa, {
      "multi-calendars": unref(b).count,
      collapse: ae.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: ee }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(c).modeHeight}px` })
        }, [
          ae.$slots["top-extra"] ? renderSlot(ae.$slots, "top-extra", {
            key: 0,
            value: ae.internalModelValue
          }) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            createVNode(En, mergeProps(ae.$props, {
              items: unref(L)(ee),
              instance: ee,
              "show-year-picker": unref(H)[ee],
              year: unref(v)(ee),
              "is-disabled": (S) => unref(_)(ee, S),
              onHandleYear: (S) => unref(P)(ee, S),
              onYearSelect: (S) => unref(B)(S, ee),
              onToggleYearPicker: (S) => unref(f)(ee, S == null ? void 0 : S.flow, S == null ? void 0 : S.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(d), (S, x) => ({
                name: S,
                fn: withCtx((Y) => [
                  renderSlot(ae.$slots, S, normalizeProps(guardReactiveProps(Y)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Fr, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(h2)(ee), (S, x) => (openBlock(), createElementBlock("div", { key: x }, [
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
                onClick: (Y) => unref(U)(S.value, ee, S.disabled),
                onMouseover: (Y) => unref(E)(S.value)
              }, [
                ae.$slots.quarter ? renderSlot(ae.$slots, "quarter", {
                  key: 0,
                  value: S.value,
                  text: S.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(S.text), 1)
                ], 64))
              ], 42, Lr)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var Hr = ["id", "tabindex", "role", "aria-label"];
var Ur = {
  key: 0,
  class: "dp--menu-load-container"
};
var Vr = {
  key: 1,
  class: "dp--menu-header"
};
var Wr = {
  key: 0,
  class: "dp__sidebar_left"
};
var jr = ["data-test", "onClick", "onKeydown"];
var Kr = {
  key: 2,
  class: "dp__sidebar_right"
};
var Gr = {
  key: 3,
  class: "dp__action_extra"
};
var mn = defineComponent({
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
    const a = l, n = e, i = ref(null), d = computed(() => {
      const { openOnTop: w, ...N2 } = n;
      return {
        ...N2,
        flowStep: x.value,
        collapse: n.collapse,
        noOverlayFocus: n.noOverlayFocus,
        menuWrapRef: i.value
      };
    }), { setMenuFocused: b, setShiftKey: c, control: L } = Nn(), v = useSlots(), { defaultedTextInput: _, defaultedInline: h2, defaultedConfig: C, defaultedUI: H } = Ce(n), E = ref(null), U = ref(0), f = ref(null), B = ref(false), P = ref(null);
    onMounted(() => {
      if (!n.shadow) {
        B.value = true, Q(), window.addEventListener("resize", Q);
        const w = Ie(i);
        if (w && !_.value.enabled && !h2.value.enabled && (b(true), te()), w) {
          const N2 = (ce) => {
            C.value.allowPreventDefault && ce.preventDefault(), yt(ce, C.value, true);
          };
          w.addEventListener("pointerdown", N2), w.addEventListener("mousedown", N2);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", Q);
    });
    const Q = () => {
      const w = Ie(f);
      w && (U.value = w.getBoundingClientRect().width);
    }, { arrowRight: ae, arrowLeft: oe, arrowDown: ee, arrowUp: S } = bt(), { flowStep: x, updateFlowStep: Y, childMount: q, resetFlow: de, handleFlow: ve } = Zr(n, a, P), y = computed(() => n.monthPicker ? rr : n.yearPicker ? sr : n.timePicker ? kr : n.quarterPicker ? zr : Nr), z = computed(() => {
      var ce;
      if (C.value.arrowLeft) return C.value.arrowLeft;
      const w = (ce = i.value) == null ? void 0 : ce.getBoundingClientRect(), N2 = n.getInputRect();
      return (N2 == null ? void 0 : N2.width) < (U == null ? void 0 : U.value) && (N2 == null ? void 0 : N2.left) <= ((w == null ? void 0 : w.left) ?? 0) ? `${(N2 == null ? void 0 : N2.width) / 2}px` : (N2 == null ? void 0 : N2.right) >= ((w == null ? void 0 : w.right) ?? 0) && (N2 == null ? void 0 : N2.width) < (U == null ? void 0 : U.value) ? `${(U == null ? void 0 : U.value) - (N2 == null ? void 0 : N2.width) / 2}px` : "50%";
    }), te = () => {
      const w = Ie(i);
      w && w.focus({ preventScroll: true });
    }, g = computed(() => {
      var w;
      return ((w = P.value) == null ? void 0 : w.getSidebarProps()) || {};
    }), X = () => {
      n.openOnTop && a("recalculate-position");
    }, A = Je(v, "action"), p = computed(() => n.monthPicker || n.yearPicker ? Je(v, "monthYear") : n.timePicker ? Je(v, "timePicker") : Je(v, "shared")), se = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), I = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly,
      "dp-menu-loading": n.loading
    })), D = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !h2.value.enabled,
        dp__relative: h2.value.enabled,
        ...H.value.menu ?? {}
      })
    ), V = (w) => {
      yt(w, C.value, true);
    }, s = () => {
      n.escClose && a("close-picker");
    }, M = (w) => {
      if (n.arrowNavigation) {
        if (w === je.up) return S();
        if (w === je.down) return ee();
        if (w === je.left) return oe();
        if (w === je.right) return ae();
      } else w === je.left || w === je.up ? $("handleArrow", je.left, 0, w === je.up) : $("handleArrow", je.right, 0, w === je.down);
    }, F = (w) => {
      c(w.shiftKey), !n.disableMonthYearSelect && w.code === Pe.tab && w.target.classList.contains("dp__menu") && L.value.shiftKeyInMenu && (w.preventDefault(), yt(w, C.value, true), a("close-picker"));
    }, u = () => {
      te(), a("time-picker-close");
    }, le = (w) => {
      var N2, ce, he2;
      (N2 = P.value) == null || N2.toggleTimePicker(false, false), (ce = P.value) == null || ce.toggleMonthPicker(false, false, w), (he2 = P.value) == null || he2.toggleYearPicker(false, false, w);
    }, me = (w, N2 = 0) => {
      var ce, he2, et2;
      return w === "month" ? (ce = P.value) == null ? void 0 : ce.toggleMonthPicker(false, true, N2) : w === "year" ? (he2 = P.value) == null ? void 0 : he2.toggleYearPicker(false, true, N2) : w === "time" ? (et2 = P.value) == null ? void 0 : et2.toggleTimePicker(true, false) : le(N2);
    }, $ = (w, ...N2) => {
      var ce, he2;
      (ce = P.value) != null && ce[w] && ((he2 = P.value) == null || he2[w](...N2));
    }, ge = () => {
      $("selectCurrentDate");
    }, r = (w, N2) => {
      $("presetDate", w, N2);
    }, R = () => {
      $("clearHoverDate");
    }, O = (w, N2) => {
      $("updateMonthYear", w, N2);
    }, W = (w, N2) => {
      w.preventDefault(), M(N2);
    }, ue = (w) => {
      var N2, ce, he2;
      if (F(w), w.key === Pe.home || w.key === Pe.end)
        return $(
          "selectWeekDate",
          w.key === Pe.home,
          w.target.getAttribute("id")
        );
      switch ((w.key === Pe.pageUp || w.key === Pe.pageDown) && (w.shiftKey ? ($("changeYear", w.key === Pe.pageUp), (N2 = Ea(i.value, "overlay-year")) == null || N2.focus()) : ($("changeMonth", w.key === Pe.pageUp), (ce = Ea(i.value, w.key === Pe.pageUp ? "action-prev" : "action-next")) == null || ce.focus()), w.target.getAttribute("id") && ((he2 = i.value) == null || he2.focus({ preventScroll: true }))), w.key) {
        case Pe.esc:
          return s();
        case Pe.arrowLeft:
          return W(w, je.left);
        case Pe.arrowRight:
          return W(w, je.right);
        case Pe.arrowUp:
          return W(w, je.up);
        case Pe.arrowDown:
          return W(w, je.down);
        default:
          return;
      }
    };
    return t({
      updateMonthYear: O,
      switchView: me,
      handleFlow: ve
    }), (w, N2) => {
      var ce, he2, et2;
      return openBlock(), createElementBlock("div", {
        id: w.uid ? `dp-menu-${w.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: i,
        tabindex: unref(h2).enabled ? void 0 : "0",
        role: unref(h2).enabled ? void 0 : "dialog",
        "aria-label": (ce = w.ariaLabels) == null ? void 0 : ce.menu,
        class: normalizeClass(D.value),
        style: normalizeStyle({ "--dp-arrow-left": z.value }),
        onMouseleave: R,
        onClick: V,
        onKeydown: ue
      }, [
        (w.disabled || w.readonly) && unref(h2).enabled || w.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(I.value)
        }, [
          w.loading ? (openBlock(), createElementBlock("div", Ur, N2[19] || (N2[19] = [
            createBaseVNode("span", { class: "dp--menu-loader" }, null, -1)
          ]))) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        w.$slots["menu-header"] ? (openBlock(), createElementBlock("div", Vr, [
          renderSlot(w.$slots, "menu-header")
        ])) : createCommentVNode("", true),
        !unref(h2).enabled && !w.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(se.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: f,
          class: normalizeClass({
            dp__menu_content_wrapper: ((he2 = w.presetDates) == null ? void 0 : he2.length) || !!w.$slots["left-sidebar"] || !!w.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && (((et2 = w.presetDates) == null ? void 0 : et2.length) || !!w.$slots["left-sidebar"] || !!w.$slots["right-sidebar"])
          }),
          style: normalizeStyle({ "--dp-menu-width": `${U.value}px` })
        }, [
          w.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Wr, [
            renderSlot(w.$slots, "left-sidebar", normalizeProps(guardReactiveProps(g.value)))
          ])) : createCommentVNode("", true),
          w.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(w.presetDates, (fe, vt2) => (openBlock(), createElementBlock(Fragment, { key: vt2 }, [
              fe.slot ? renderSlot(w.$slots, fe.slot, {
                key: 0,
                presetDate: r,
                label: fe.label,
                value: fe.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(fe.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                "data-test": fe.testId ?? void 0,
                onClick: withModifiers((ot2) => r(fe.value, fe.noTz), ["prevent"]),
                onKeydown: (ot2) => unref(Ke)(ot2, () => r(fe.value, fe.noTz), true)
              }, toDisplayString(fe.label), 47, jr))
            ], 64))), 128))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: E,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(y.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: P
            }, d.value, {
              "flow-step": unref(x),
              onMount: unref(q),
              onUpdateFlowStep: unref(Y),
              onResetFlow: unref(de),
              onFocusMenu: te,
              onSelectDate: N2[0] || (N2[0] = (fe) => w.$emit("select-date")),
              onDateUpdate: N2[1] || (N2[1] = (fe) => w.$emit("date-update", fe)),
              onTooltipOpen: N2[2] || (N2[2] = (fe) => w.$emit("tooltip-open", fe)),
              onTooltipClose: N2[3] || (N2[3] = (fe) => w.$emit("tooltip-close", fe)),
              onAutoApply: N2[4] || (N2[4] = (fe) => w.$emit("auto-apply", fe)),
              onRangeStart: N2[5] || (N2[5] = (fe) => w.$emit("range-start", fe)),
              onRangeEnd: N2[6] || (N2[6] = (fe) => w.$emit("range-end", fe)),
              onInvalidFixedRange: N2[7] || (N2[7] = (fe) => w.$emit("invalid-fixed-range", fe)),
              onTimeUpdate: N2[8] || (N2[8] = (fe) => w.$emit("time-update")),
              onAmPmChange: N2[9] || (N2[9] = (fe) => w.$emit("am-pm-change", fe)),
              onTimePickerOpen: N2[10] || (N2[10] = (fe) => w.$emit("time-picker-open", fe)),
              onTimePickerClose: u,
              onRecalculatePosition: X,
              onUpdateMonthYear: N2[11] || (N2[11] = (fe) => w.$emit("update-month-year", fe)),
              onAutoApplyInvalid: N2[12] || (N2[12] = (fe) => w.$emit("auto-apply-invalid", fe)),
              onInvalidDate: N2[13] || (N2[13] = (fe) => w.$emit("invalid-date", fe)),
              onOverlayToggle: N2[14] || (N2[14] = (fe) => w.$emit("overlay-toggle", fe)),
              "onUpdate:internalModelValue": N2[15] || (N2[15] = (fe) => w.$emit("update:internal-model-value", fe))
            }), createSlots({ _: 2 }, [
              renderList(p.value, (fe, vt2) => ({
                name: fe,
                fn: withCtx((ot2) => [
                  renderSlot(w.$slots, fe, normalizeProps(guardReactiveProps({ ...ot2 })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          w.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Kr, [
            renderSlot(w.$slots, "right-sidebar", normalizeProps(guardReactiveProps(g.value)))
          ])) : createCommentVNode("", true),
          w.$slots["action-extra"] ? (openBlock(), createElementBlock("div", Gr, [
            w.$slots["action-extra"] ? renderSlot(w.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: ge
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !w.autoApply || unref(C).keepActionRow ? (openBlock(), createBlock(Jl, mergeProps({
          key: 3,
          "menu-mount": B.value
        }, d.value, {
          "calendar-width": U.value,
          onClosePicker: N2[16] || (N2[16] = (fe) => w.$emit("close-picker")),
          onSelectDate: N2[17] || (N2[17] = (fe) => w.$emit("select-date")),
          onInvalidSelect: N2[18] || (N2[18] = (fe) => w.$emit("invalid-select")),
          onSelectNow: ge
        }), createSlots({ _: 2 }, [
          renderList(unref(A), (fe, vt2) => ({
            name: fe,
            fn: withCtx((ot2) => [
              renderSlot(w.$slots, fe, normalizeProps(guardReactiveProps({ ...ot2 })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 46, Hr);
    };
  }
});
var Ct = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(Ct || {});
var Qr = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: l,
  pickerWrapperRef: a,
  inline: n,
  emit: i,
  props: d,
  slots: b
}) => {
  const { defaultedConfig: c } = Ce(d), L = ref({}), v = ref(false), _ = ref({
    top: "0",
    left: "0"
  }), h2 = ref(false), C = toRef(d, "teleportCenter");
  watch(C, () => {
    _.value = JSON.parse(JSON.stringify({})), ae();
  });
  const H = (g) => {
    if (d.teleport) {
      const X = g.getBoundingClientRect();
      return {
        left: X.left + window.scrollX,
        top: X.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, E = (g, X) => {
    _.value.left = `${g + X - L.value.width}px`;
  }, U = (g) => {
    _.value.left = `${g}px`;
  }, f = (g, X) => {
    d.position === Ct.left && U(g), d.position === Ct.right && E(g, X), d.position === Ct.center && (_.value.left = `${g + X / 2 - L.value.width / 2}px`);
  }, B = (g) => {
    const { width: X, height: A } = g.getBoundingClientRect(), { top: p, left: se } = d.altPosition ? d.altPosition(g) : H(g);
    return { top: +p, left: +se, width: X, height: A };
  }, P = () => {
    _.value.left = "50%", _.value.top = "50%", _.value.transform = "translate(-50%, -50%)", _.value.position = "fixed", delete _.value.opacity;
  }, Q = () => {
    const g = Ie(l), { top: X, left: A, transform: p } = d.altPosition(g);
    _.value = { top: `${X}px`, left: `${A}px`, transform: p ?? "" };
  }, ae = (g = true) => {
    var X;
    if (!n.value.enabled) {
      if (C.value) return P();
      if (d.altPosition !== null) return Q();
      if (g) {
        const A = d.teleport ? (X = t.value) == null ? void 0 : X.$el : e.value;
        A && (L.value = A.getBoundingClientRect()), i("recalculate-position");
      }
      return de();
    }
  }, oe = ({ inputEl: g, left: X, width: A }) => {
    window.screen.width > 768 && !v.value && f(X, A), x(g);
  }, ee = (g) => {
    const { top: X, left: A, height: p, width: se } = B(g);
    _.value.top = `${p + X + +d.offset}px`, h2.value = false, v.value || (_.value.left = `${A + se / 2 - L.value.width / 2}px`), oe({ inputEl: g, left: A, width: se });
  }, S = (g) => {
    const { top: X, left: A, width: p } = B(g);
    _.value.top = `${X - +d.offset - L.value.height}px`, h2.value = true, oe({ inputEl: g, left: A, width: p });
  }, x = (g) => {
    if (d.autoPosition) {
      const { left: X, width: A } = B(g), { left: p, right: se } = L.value;
      if (!v.value) {
        if (Math.abs(p) !== Math.abs(se)) {
          if (p <= 0)
            return v.value = true, U(X);
          if (se >= document.documentElement.clientWidth)
            return v.value = true, E(X, A);
        }
        return f(X, A);
      }
    }
  }, Y = () => {
    const g = Ie(l);
    if (g) {
      const { height: X } = L.value, { top: A, height: p } = g.getBoundingClientRect(), I = window.innerHeight - A - p, D = A;
      return X <= I ? Mt.bottom : X > I && X <= D ? Mt.top : I >= D ? Mt.bottom : Mt.top;
    }
    return Mt.bottom;
  }, q = (g) => Y() === Mt.bottom ? ee(g) : S(g), de = () => {
    const g = Ie(l);
    if (g)
      return d.autoPosition ? q(g) : ee(g);
  }, ve = function(g) {
    if (g) {
      const X = g.scrollHeight > g.clientHeight, p = window.getComputedStyle(g).overflowY.indexOf("hidden") !== -1;
      return X && !p;
    }
    return true;
  }, y = function(g) {
    return !g || g === document.body || g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : ve(g) ? g : y(
      g.assignedSlot && c.value.shadowDom ? g.assignedSlot.parentNode : g.parentNode
    );
  }, z = (g) => {
    if (g)
      switch (d.position) {
        case Ct.left:
          return { left: 0, transform: "translateX(0)" };
        case Ct.right:
          return { left: `${g.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${g.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: h2,
    menuStyle: _,
    xCorrect: v,
    setMenuPosition: ae,
    getScrollableParent: y,
    shadowRender: (g, X) => {
      var s, M, F;
      const A = document.createElement("div"), p = (s = Ie(l)) == null ? void 0 : s.getBoundingClientRect();
      A.setAttribute("id", "dp--temp-container");
      const se = (M = a.value) != null && M.clientWidth ? a.value : document.body;
      se.append(A);
      const I = z(p), D = c.value.shadowDom ? Object.keys(b).filter(
        (u) => ["right-sidebar", "left-sidebar", "top-extra", "action-extra"].includes(u)
      ) : Object.keys(b), V = h(
        g,
        {
          ...X,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...I }
        },
        Object.fromEntries(D.map((u) => [u, b[u]]))
      );
      render(V, A), L.value = (F = V.el) == null ? void 0 : F.getBoundingClientRect(), render(null, A), se.removeChild(A);
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
var qr = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var Xr = {
  all: () => mt,
  monthYear: () => mt.filter((e) => e.use.includes("month-year")),
  input: () => qr,
  timePicker: () => mt.filter((e) => e.use.includes("time")),
  action: () => mt.filter((e) => e.use.includes("action")),
  calendar: () => mt.filter((e) => e.use.includes("calendar")),
  menu: () => mt.filter((e) => e.use.includes("menu")),
  shared: () => mt.filter((e) => e.use.includes("shared")),
  yearMode: () => mt.filter((e) => e.use.includes("year-mode"))
};
var Je = (e, t, l) => {
  const a = [];
  return Xr[t]().forEach((n) => {
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
  const { defaultedRange: a, defaultedTz: n } = Ce(e), i = G(qe(G(), n.value.timezone)), d = ref([{ month: getMonth(i), year: getYear(i) }]), b = (h2) => {
    const C = {
      hours: getHours(i),
      minutes: getMinutes(i),
      seconds: 0
    };
    return a.value.enabled ? [C[h2], C[h2]] : C[h2];
  }, c = reactive({
    hours: b("hours"),
    minutes: b("minutes"),
    seconds: b("seconds")
  });
  watch(
    a,
    (h2, C) => {
      h2.enabled !== C.enabled && (c.hours = b("hours"), c.minutes = b("minutes"), c.seconds = b("seconds"));
    },
    { deep: true }
  );
  const L = computed({
    get: () => e.internalModelValue,
    set: (h2) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", h2);
    }
  }), v = computed(
    () => (h2) => d.value[h2] ? d.value[h2].month : 0
  ), _ = computed(
    () => (h2) => d.value[h2] ? d.value[h2].year : 0
  );
  return watch(
    L,
    (h2, C) => {
      l && JSON.stringify(h2 ?? {}) !== JSON.stringify(C ?? {}) && l();
    },
    { deep: true }
  ), {
    calendars: d,
    time: c,
    modelValue: L,
    month: v,
    year: _,
    today: i
  };
};
var Jr = (e, t) => {
  const {
    defaultedMultiCalendars: l,
    defaultedMultiDates: a,
    defaultedUI: n,
    defaultedHighlight: i,
    defaultedTz: d,
    propDates: b,
    defaultedRange: c
  } = Ce(t), { isDisabled: L } = kt(t), v = ref(null), _ = ref(qe(/* @__PURE__ */ new Date(), d.value.timezone)), h2 = (s) => {
    !s.current && t.hideOffsetDates || (v.value = s.value);
  }, C = () => {
    v.value = null;
  }, H = (s) => Array.isArray(e.value) && c.value.enabled && e.value[0] && v.value ? s ? Be(v.value, e.value[0]) : Oe(v.value, e.value[0]) : true, E = (s, M) => {
    const F = () => e.value ? M ? e.value[0] || null : e.value[1] : null, u = e.value && Array.isArray(e.value) ? F() : null;
    return Me(G(s.value), u);
  }, U = (s) => {
    const M = Array.isArray(e.value) ? e.value[0] : null;
    return s ? !Oe(v.value ?? null, M) : true;
  }, f = (s, M = true) => (c.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !s.current ? false : Me(G(s.value), e.value[M ? 0 : 1]) : c.value.enabled ? E(s, M) && U(M) || Me(s.value, Array.isArray(e.value) ? e.value[0] : null) && H(M) : false, B = (s, M) => {
    if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
      const F = Me(s.value, v.value);
      return M ? Be(e.value[0], s.value) && F : Oe(e.value[0], s.value) && F;
    }
    return false;
  }, P = (s) => !e.value || t.hideOffsetDates && !s.current ? false : c.value.enabled ? t.modelAuto && Array.isArray(e.value) ? Me(s.value, e.value[0] ? e.value[0] : _.value) : false : a.value.enabled && Array.isArray(e.value) ? e.value.some((M) => Me(M, s.value)) : Me(s.value, e.value ? e.value : _.value), Q = (s) => {
    if (c.value.autoRange || t.weekPicker) {
      if (v.value) {
        if (t.hideOffsetDates && !s.current) return false;
        const M = addDays(v.value, +c.value.autoRange), F = it(G(v.value), t.weekStart);
        return t.weekPicker ? Me(F[1], G(s.value)) : Me(M, G(s.value));
      }
      return false;
    }
    return false;
  }, ae = (s) => {
    if (c.value.autoRange || t.weekPicker) {
      if (v.value) {
        const M = addDays(v.value, +c.value.autoRange);
        if (t.hideOffsetDates && !s.current) return false;
        const F = it(G(v.value), t.weekStart);
        return t.weekPicker ? Be(s.value, F[0]) && Oe(s.value, F[1]) : Be(s.value, v.value) && Oe(s.value, M);
      }
      return false;
    }
    return false;
  }, oe = (s) => {
    if (c.value.autoRange || t.weekPicker) {
      if (v.value) {
        if (t.hideOffsetDates && !s.current) return false;
        const M = it(G(v.value), t.weekStart);
        return t.weekPicker ? Me(M[0], s.value) : Me(v.value, s.value);
      }
      return false;
    }
    return false;
  }, ee = (s) => da(e.value, v.value, s.value), S = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, x = () => t.modelAuto ? An(t.internalModelValue) : true, Y = (s) => {
    if (t.weekPicker) return false;
    const M = c.value.enabled ? !f(s) && !f(s, false) : true;
    return !L(s.value) && !P(s) && !(!s.current && t.hideOffsetDates) && M;
  }, q = (s) => c.value.enabled ? t.modelAuto ? S() && P(s) : false : P(s), de = (s) => i.value ? Dl(s.value, b.value.highlight) : false, ve = (s) => {
    const M = L(s.value);
    return M && (typeof i.value == "function" ? !i.value(s.value, M) : !i.value.options.highlightDisabled);
  }, y = (s) => {
    var M;
    return typeof i.value == "function" ? i.value(s.value) : (M = i.value.weekdays) == null ? void 0 : M.includes(s.value.getDay());
  }, z = (s) => (c.value.enabled || t.weekPicker) && (!(l.value.count > 0) || s.current) && x() && !(!s.current && t.hideOffsetDates) && !P(s) ? ee(s) : false, te = (s) => {
    const { isRangeStart: M, isRangeEnd: F } = p(s), u = c.value.enabled ? M || F : false;
    return {
      dp__cell_offset: !s.current,
      dp__pointer: !t.disabled && !(!s.current && t.hideOffsetDates) && !L(s.value),
      dp__cell_disabled: L(s.value),
      dp__cell_highlight: !ve(s) && (de(s) || y(s)) && !q(s) && !u && !oe(s) && !(z(s) && t.weekPicker) && !F,
      dp__cell_highlight_active: !ve(s) && (de(s) || y(s)) && q(s),
      dp__today: !t.noToday && Me(s.value, _.value) && s.current,
      "dp--past": Oe(s.value, _.value),
      "dp--future": Be(s.value, _.value)
    };
  }, g = (s) => ({
    dp__active_date: q(s),
    dp__date_hover: Y(s)
  }), X = (s) => {
    if (e.value && !Array.isArray(e.value)) {
      const M = it(e.value, t.weekStart);
      return {
        ...I(s),
        dp__range_start: Me(M[0], s.value),
        dp__range_end: Me(M[1], s.value),
        dp__range_between_week: Be(s.value, M[0]) && Oe(s.value, M[1])
      };
    }
    return {
      ...I(s)
    };
  }, A = (s) => {
    if (e.value && Array.isArray(e.value)) {
      const M = it(e.value[0], t.weekStart), F = e.value[1] ? it(e.value[1], t.weekStart) : [];
      return {
        ...I(s),
        dp__range_start: Me(M[0], s.value) || Me(F[0], s.value),
        dp__range_end: Me(M[1], s.value) || Me(F[1], s.value),
        dp__range_between_week: Be(s.value, M[0]) && Oe(s.value, M[1]) || Be(s.value, F[0]) && Oe(s.value, F[1]),
        dp__range_between: Be(s.value, M[1]) && Oe(s.value, F[0])
      };
    }
    return {
      ...I(s)
    };
  }, p = (s) => {
    const M = l.value.count > 0 ? s.current && f(s) && x() : f(s) && x(), F = l.value.count > 0 ? s.current && f(s, false) && x() : f(s, false) && x();
    return { isRangeStart: M, isRangeEnd: F };
  }, se = (s) => {
    const { isRangeStart: M, isRangeEnd: F } = p(s);
    return {
      dp__range_start: M,
      dp__range_end: F,
      dp__range_between: z(s),
      dp__date_hover: Me(s.value, v.value) && !M && !F && !t.weekPicker,
      dp__date_hover_start: B(s, true),
      dp__date_hover_end: B(s, false)
    };
  }, I = (s) => ({
    ...se(s),
    dp__cell_auto_range: ae(s),
    dp__cell_auto_range_start: oe(s),
    dp__cell_auto_range_end: Q(s)
  }), D = (s) => c.value.enabled ? c.value.autoRange ? I(s) : t.modelAuto ? { ...g(s), ...se(s) } : t.weekPicker ? A(s) : se(s) : t.weekPicker ? X(s) : g(s);
  return {
    setHoverDate: h2,
    clearHoverDate: C,
    getDayClassData: (s) => t.hideOffsetDates && !s.current ? {} : {
      ...te(s),
      ...D(s),
      [t.dayClass ? t.dayClass(s.value, t.internalModelValue) : ""]: true,
      ...n.value.calendarCell ?? {}
    }
  };
};
var kt = (e) => {
  const { defaultedFilters: t, defaultedRange: l, propDates: a, defaultedMultiDates: n } = Ce(e), i = (y) => a.value.disabledDates ? typeof a.value.disabledDates == "function" ? a.value.disabledDates(G(y)) : !!sa(y, a.value.disabledDates) : false, d = (y) => a.value.maxDate ? e.yearPicker ? getYear(y) > getYear(a.value.maxDate) : Be(y, a.value.maxDate) : false, b = (y) => a.value.minDate ? e.yearPicker ? getYear(y) < getYear(a.value.minDate) : Oe(y, a.value.minDate) : false, c = (y) => {
    const z = d(y), te = b(y), g = i(y), A = t.value.months.map((V) => +V).includes(getMonth(y)), p = e.disabledWeekDays.length ? e.disabledWeekDays.some((V) => +V === getDay(y)) : false, se = C(y), I = getYear(y), D = I < +e.yearRange[0] || I > +e.yearRange[1];
    return !(z || te || g || A || D || p || se);
  }, L = (y, z) => Oe(...pt(a.value.minDate, y, z)) || Me(...pt(a.value.minDate, y, z)), v = (y, z) => Be(...pt(a.value.maxDate, y, z)) || Me(...pt(a.value.maxDate, y, z)), _ = (y, z, te) => {
    let g = false;
    return a.value.maxDate && te && v(y, z) && (g = true), a.value.minDate && !te && L(y, z) && (g = true), g;
  }, h2 = (y, z, te, g) => {
    let X = false;
    return g && (a.value.minDate || a.value.maxDate) ? a.value.minDate && a.value.maxDate ? X = _(y, z, te) : (a.value.minDate && L(y, z) || a.value.maxDate && v(y, z)) && (X = true) : X = true, X;
  }, C = (y) => Array.isArray(a.value.allowedDates) && !a.value.allowedDates.length ? true : a.value.allowedDates ? !sa(y, a.value.allowedDates) : false, H = (y) => !c(y), E = (y) => l.value.noDisabledRange ? !eachDayOfInterval({ start: y[0], end: y[1] }).some((te) => H(te)) : true, U = (y) => {
    if (y) {
      const z = getYear(y);
      return z >= +e.yearRange[0] && z <= e.yearRange[1];
    }
    return true;
  }, f = (y, z) => !!(Array.isArray(y) && y[z] && (l.value.maxRange || l.value.minRange) && U(y[z])), B = (y, z, te = 0) => {
    if (f(z, te) && U(y)) {
      const g = differenceInCalendarDays(y, z[te]), X = Cn(z[te], y), A = X.length === 1 ? 0 : X.filter((se) => H(se)).length, p = Math.abs(g) - (l.value.minMaxRawRange ? 0 : A);
      if (l.value.minRange && l.value.maxRange)
        return p >= +l.value.minRange && p <= +l.value.maxRange;
      if (l.value.minRange) return p >= +l.value.minRange;
      if (l.value.maxRange) return p <= +l.value.maxRange;
    }
    return true;
  }, P = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, Q = (y) => Array.isArray(y) ? [y[0] ? Pa(y[0]) : null, y[1] ? Pa(y[1]) : null] : Pa(y), ae = (y, z, te) => y.find(
    (g) => +g.hours === getHours(z) && g.minutes === "*" ? true : +g.minutes === getMinutes(z) && +g.hours === getHours(z)
  ) && te, oe = (y, z, te) => {
    const [g, X] = y, [A, p] = z;
    return !ae(g, A, te) && !ae(X, p, te) && te;
  }, ee = (y, z) => {
    const te = Array.isArray(z) ? z : [z];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? oe(e.disabledTimes, te, y) : !te.some((g) => ae(e.disabledTimes, g, y)) : y;
  }, S = (y, z) => {
    const te = Array.isArray(z) ? [St(z[0]), z[1] ? St(z[1]) : void 0] : St(z), g = !e.disabledTimes(te);
    return y && g;
  }, x = (y, z) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? ee(z, y) : S(z, y) : z, Y = (y) => {
    let z = true;
    if (!y || P()) return true;
    const te = !a.value.minDate && !a.value.maxDate ? Q(y) : y;
    return (e.maxTime || a.value.maxDate) && (z = dn(
      e.maxTime,
      a.value.maxDate,
      "max",
      Ye(te),
      z
    )), (e.minTime || a.value.minDate) && (z = dn(
      e.minTime,
      a.value.minDate,
      "min",
      Ye(te),
      z
    )), x(y, z);
  }, q = (y) => {
    if (!e.monthPicker) return true;
    let z = true;
    const te = G(lt(y));
    if (a.value.minDate && a.value.maxDate) {
      const g = G(lt(a.value.minDate)), X = G(lt(a.value.maxDate));
      return Be(te, g) && Oe(te, X) || Me(te, g) || Me(te, X);
    }
    if (a.value.minDate) {
      const g = G(lt(a.value.minDate));
      z = Be(te, g) || Me(te, g);
    }
    if (a.value.maxDate) {
      const g = G(lt(a.value.maxDate));
      z = Oe(te, g) || Me(te, g);
    }
    return z;
  }, de = computed(() => (y) => !e.enableTimePicker || e.ignoreTimeValidation ? true : Y(y)), ve = computed(() => (y) => e.monthPicker ? Array.isArray(y) && (l.value.enabled || n.value.enabled) ? !y.filter((te) => !q(te)).length : q(y) : true);
  return {
    isDisabled: H,
    validateDate: c,
    validateMonthYearInRange: h2,
    isDateRangeAllowed: E,
    checkMinMaxRange: B,
    isValidTime: Y,
    isTimeValid: de,
    isMonthValid: ve
  };
};
var ma = () => {
  const e = computed(() => (a, n) => a == null ? void 0 : a.includes(n)), t = computed(() => (a, n) => a.count ? a.solo ? true : n === 0 : true), l = computed(() => (a, n) => a.count ? a.solo ? true : n === a.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: l };
};
var Zr = (e, t, l) => {
  const a = ref(0), n = reactive({
    [Tt.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [Tt.calendar]: false,
    [Tt.header]: false
  }), i = computed(() => e.monthPicker || e.timePicker), d = (_) => {
    var h2;
    if ((h2 = e.flow) != null && h2.length) {
      if (!_ && i.value) return v();
      n[_] = true, Object.keys(n).filter((C) => !n[C]).length || v();
    }
  }, b = () => {
    var _, h2;
    (_ = e.flow) != null && _.length && a.value !== -1 && (a.value += 1, t("flow-step", a.value), v()), ((h2 = e.flow) == null ? void 0 : h2.length) === a.value && nextTick().then(() => c());
  }, c = () => {
    a.value = -1;
  }, L = (_, h2, ...C) => {
    var H, E;
    e.flow[a.value] === _ && l.value && ((E = (H = l.value)[h2]) == null || E.call(H, ...C));
  }, v = (_ = 0) => {
    _ && (a.value += _), L(He.month, "toggleMonthPicker", true), L(He.year, "toggleYearPicker", true), L(He.calendar, "toggleTimePicker", false, true), L(He.time, "toggleTimePicker", true, true);
    const h2 = e.flow[a.value];
    (h2 === He.hours || h2 === He.minutes || h2 === He.seconds) && L(h2, "toggleTimePicker", true, true, h2);
  };
  return { childMount: d, updateFlowStep: b, resetFlow: c, handleFlow: v, flowStep: a };
};
var xr = {
  key: 1,
  class: "dp__input_wrap"
};
var eo = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var to = {
  key: 2,
  class: "dp--clear-btn"
};
var ao = ["aria-label"];
var no = defineComponent({
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
      defaultedAriaLabels: d,
      defaultedInline: b,
      defaultedConfig: c,
      defaultedRange: L,
      defaultedMultiDates: v,
      defaultedUI: _,
      getDefaultPattern: h2,
      getDefaultStartTime: C
    } = Ce(n), { checkMinMaxRange: H } = kt(n), E = ref(), U = ref(null), f = ref(false), B = ref(false), P = computed(
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
        ..._.value.input ?? {}
      })
    ), Q = () => {
      a("set-input-date", null), n.clearable && n.autoApply && (a("set-empty-date"), E.value = null);
    }, ae = (p) => {
      const se = C();
      return Ml(
        p,
        i.value.format ?? h2(),
        se ?? On({}, n.enableSeconds),
        n.inputValue,
        B.value,
        n.formatLocale
      );
    }, oe = (p) => {
      const { rangeSeparator: se } = i.value, [I, D] = p.split(`${se}`);
      if (I) {
        const V = ae(I.trim()), s = D ? ae(D.trim()) : null;
        if (isAfter(V, s)) return;
        const M = V && s ? [V, s] : [V];
        H(s, M, 0) && (E.value = V ? M : null);
      }
    }, ee = () => {
      B.value = true;
    }, S = (p) => {
      if (L.value.enabled)
        oe(p);
      else if (v.value.enabled) {
        const se = p.split(";");
        E.value = se.map((I) => ae(I.trim())).filter((I) => I);
      } else
        E.value = ae(p);
    }, x = (p) => {
      var I;
      const se = typeof p == "string" ? p : (I = p.target) == null ? void 0 : I.value;
      se !== "" ? (i.value.openMenu && !n.isMenuOpen && a("open"), S(se), a("set-input-date", E.value)) : Q(), B.value = false, a("update:input-value", se), a("text-input", p, E.value);
    }, Y = (p) => {
      i.value.enabled ? (S(p.target.value), i.value.enterSubmit && Fa(E.value) && n.inputValue !== "" ? (a("set-input-date", E.value, true), E.value = null) : i.value.enterSubmit && n.inputValue === "" && (E.value = null, a("clear"))) : ve(p);
    }, q = (p, se) => {
      i.value.enabled && i.value.tabSubmit && !se && S(p.target.value), i.value.tabSubmit && Fa(E.value) && n.inputValue !== "" ? (a("set-input-date", E.value, true, true), E.value = null) : i.value.tabSubmit && n.inputValue === "" && (E.value = null, a("clear", true));
    }, de = () => {
      f.value = true, a("focus"), nextTick().then(() => {
        var p;
        i.value.enabled && i.value.selectOnFocus && ((p = U.value) == null || p.select());
      });
    }, ve = (p) => {
      if (yt(p, c.value, true), i.value.enabled && i.value.openMenu && !b.value.input) {
        if (i.value.openMenu === "open" && !n.isMenuOpen) return a("open");
        if (i.value.openMenu === "toggle") return a("toggle");
      } else i.value.enabled || a("toggle");
    }, y = () => {
      a("real-blur"), f.value = false, (!n.isMenuOpen || b.value.enabled && b.value.input) && a("blur"), n.autoApply && i.value.enabled && E.value && !n.isMenuOpen && (a("set-input-date", E.value), a("select-date"), E.value = null);
    }, z = (p) => {
      yt(p, c.value, true), a("clear");
    }, te = (p) => {
      if (p.key === "Tab" && q(p), p.key === "Enter" && Y(p), !i.value.enabled) {
        if (p.code === "Tab") return;
        p.preventDefault();
      }
    }, g = () => {
      var p;
      (p = U.value) == null || p.focus({ preventScroll: true });
    }, X = (p) => {
      E.value = p;
    }, A = (p) => {
      p.key === Pe.tab && q(p, true);
    };
    return t({
      focusInput: g,
      setParsedDate: X
    }), (p, se) => {
      var I, D, V;
      return openBlock(), createElementBlock("div", { onClick: ve }, [
        p.$slots.trigger && !p.$slots["dp-input"] && !unref(b).enabled ? renderSlot(p.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !p.$slots.trigger && (!unref(b).enabled || unref(b).input) ? (openBlock(), createElementBlock("div", xr, [
          p.$slots["dp-input"] && !p.$slots.trigger && (!unref(b).enabled || unref(b).enabled && unref(b).input) ? renderSlot(p.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: x,
            onEnter: Y,
            onTab: q,
            onClear: z,
            onBlur: y,
            onKeypress: te,
            onPaste: ee,
            onFocus: de,
            openMenu: () => p.$emit("open"),
            closeMenu: () => p.$emit("close"),
            toggleMenu: () => p.$emit("toggle")
          }) : createCommentVNode("", true),
          p.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: p.uid ? `dp-input-${p.uid}` : void 0,
            ref_key: "inputRef",
            ref: U,
            "data-test": "dp-input",
            name: p.name,
            class: normalizeClass(P.value),
            inputmode: unref(i).enabled ? "text" : "none",
            placeholder: p.placeholder,
            disabled: p.disabled,
            readonly: p.readonly,
            required: p.required,
            value: e.inputValue,
            autocomplete: p.autocomplete,
            "aria-label": (I = unref(d)) == null ? void 0 : I.input,
            "aria-disabled": p.disabled || void 0,
            "aria-invalid": p.state === false ? true : void 0,
            onInput: x,
            onBlur: y,
            onFocus: de,
            onKeypress: te,
            onKeydown: se[0] || (se[0] = (s) => te(s)),
            onPaste: ee
          }, null, 42, eo)),
          createBaseVNode("div", {
            onClick: se[3] || (se[3] = (s) => a("toggle"))
          }, [
            p.$slots["input-icon"] && !p.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: se[1] || (se[1] = (s) => a("toggle"))
            }, [
              renderSlot(p.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !p.$slots["input-icon"] && !p.hideInputIcon && !p.$slots["dp-input"] ? (openBlock(), createBlock(unref(Et), {
              key: 1,
              "aria-label": (D = unref(d)) == null ? void 0 : D.calendarIcon,
              class: "dp__input_icon dp__input_icons",
              onClick: se[2] || (se[2] = (s) => a("toggle"))
            }, null, 8, ["aria-label"])) : createCommentVNode("", true)
          ]),
          p.$slots["clear-icon"] && e.inputValue && p.clearable && !p.disabled && !p.readonly ? (openBlock(), createElementBlock("span", to, [
            renderSlot(p.$slots, "clear-icon", { clear: z })
          ])) : createCommentVNode("", true),
          p.clearable && !p.$slots["clear-icon"] && e.inputValue && !p.disabled && !p.readonly ? (openBlock(), createElementBlock("button", {
            key: 3,
            "aria-label": (V = unref(d)) == null ? void 0 : V.clearInput,
            class: "dp--clear-btn",
            type: "button",
            onKeydown: se[4] || (se[4] = (s) => unref(Ke)(s, () => z(s), true, A)),
            onClick: se[5] || (se[5] = withModifiers((s) => z(s), ["prevent"]))
          }, [
            createVNode(unref(Mn), {
              class: "dp__input_icons",
              "data-test": "clear-icon"
            })
          ], 40, ao)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var lo = typeof window < "u" ? window : void 0;
var Ya = () => {
};
var ro = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var oo = (e, t, l, a) => {
  if (!e) return Ya;
  let n = Ya;
  const i = watch(
    () => unref(e),
    (b) => {
      n(), b && (b.addEventListener(t, l, a), n = () => {
        b.removeEventListener(t, l, a), n = Ya;
      });
    },
    { immediate: true, flush: "post" }
  ), d = () => {
    i(), n();
  };
  return ro(d), d;
};
var so = (e, t, l, a = {}) => {
  const { window: n = lo, event: i = "pointerdown" } = a;
  return n ? oo(n, i, (b) => {
    const c = Ie(e), L = Ie(t);
    !c || !L || c === b.target || b.composedPath().includes(c) || b.composedPath().includes(L) || l(b);
  }, { passive: true }) : void 0;
};
var uo = defineComponent({
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
    const a = l, n = e, i = useSlots(), d = ref(false), b = toRef(n, "modelValue"), c = toRef(n, "timezone"), L = ref(null), v = ref(null), _ = ref(null), h2 = ref(false), C = ref(null), H = ref(false), E = ref(false), U = ref(false), f = ref(false), { setMenuFocused: B, setShiftKey: P } = Nn(), { clearArrowNav: Q } = bt(), { validateDate: ae, isValidTime: oe } = kt(n), {
      defaultedTransitions: ee,
      defaultedTextInput: S,
      defaultedInline: x,
      defaultedConfig: Y,
      defaultedRange: q,
      defaultedMultiDates: de
    } = Ce(n), { menuTransition: ve, showTransition: y } = Xt(ee);
    onMounted(() => {
      s(n.modelValue), nextTick().then(() => {
        if (!x.value.enabled) {
          const m = se(C.value);
          m == null || m.addEventListener("scroll", O), window == null || window.addEventListener("resize", W);
        }
      }), x.value.enabled && (d.value = true), window == null || window.addEventListener("keyup", ue), window == null || window.addEventListener("keydown", w);
    }), onUnmounted(() => {
      if (!x.value.enabled) {
        const m = se(C.value);
        m == null || m.removeEventListener("scroll", O), window == null || window.removeEventListener("resize", W);
      }
      window == null || window.removeEventListener("keyup", ue), window == null || window.removeEventListener("keydown", w);
    });
    const z = Je(i, "all", n.presetDates), te = Je(i, "input");
    watch(
      [b, c],
      () => {
        s(b.value);
      },
      { deep: true }
    );
    const { openOnTop: g, menuStyle: X, xCorrect: A, setMenuPosition: p, getScrollableParent: se, shadowRender: I } = Qr({
      menuRef: L,
      menuRefInner: v,
      inputRef: _,
      pickerWrapperRef: C,
      inline: x,
      emit: a,
      props: n,
      slots: i
    }), {
      inputValue: D,
      internalModelValue: V,
      parseExternalModelValue: s,
      emitModelValue: M,
      formatInputValue: F,
      checkBeforeEmit: u
    } = Gl(a, n, h2), le = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: x.value.enabled,
        "dp--flex-display-collapsed": U.value,
        dp__flex_display_with_input: x.value.input
      })
    ), me = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), $ = computed(() => n.teleport ? {
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: !n.teleport || x.value.enabled
    } : {}), ge = computed(() => ({ class: "dp__outer_menu_wrap" })), r = computed(() => x.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), R = () => {
      var m, j;
      return (j = (m = _.value) == null ? void 0 : m.$el) == null ? void 0 : j.getBoundingClientRect();
    }, O = () => {
      d.value && (Y.value.closeOnScroll ? Xe2() : p());
    }, W = () => {
      var j;
      d.value && p();
      const m = (j = v.value) == null ? void 0 : j.$el.getBoundingClientRect().width;
      U.value = document.body.offsetWidth <= m;
    }, ue = (m) => {
      m.key === "Tab" && !x.value.enabled && !n.teleport && Y.value.tabOutClosesMenu && (C.value.contains(document.activeElement) || Xe2()), E.value = m.shiftKey;
    }, w = (m) => {
      E.value = m.shiftKey;
    }, N2 = () => {
      !n.disabled && !n.readonly && (I(mn, n), p(false), d.value = true, d.value && a("open"), d.value || Ft2(), s(n.modelValue));
    }, ce = () => {
      var m;
      D.value = "", Ft2(), (m = _.value) == null || m.setParsedDate(null), a("update:model-value", null), a("update:model-timezone-value", null), a("cleared"), Y.value.closeOnClearValue && Xe2();
    }, he2 = () => {
      const m = V.value;
      return !m || !Array.isArray(m) && ae(m) ? true : Array.isArray(m) ? de.value.enabled || m.length === 2 && ae(m[0]) && ae(m[1]) ? true : q.value.partialRange && !n.timePicker ? ae(m[0]) : false : false;
    }, et2 = () => {
      u() && he2() ? (M(), Xe2()) : a("invalid-select", V.value);
    }, fe = (m) => {
      vt2(), M(), Y.value.closeOnAutoApply && !m && Xe2();
    }, vt2 = () => {
      _.value && S.value.enabled && _.value.setParsedDate(V.value);
    }, ot2 = (m = false) => {
      n.autoApply && oe(V.value) && he2() && (q.value.enabled && Array.isArray(V.value) ? (q.value.partialRange || V.value.length === 2) && fe(m) : fe(m));
    }, Ft2 = () => {
      S.value.enabled || (V.value = null);
    }, Xe2 = () => {
      x.value.enabled || (d.value && (d.value = false, A.value = false, B(false), P(false), Q(), a("closed"), D.value && s(b.value)), Ft2(), a("blur"));
    }, Lt2 = (m, j, re = false) => {
      if (!m) {
        V.value = null;
        return;
      }
      const Ae2 = Array.isArray(m) ? !m.some((wt2) => !ae(wt2)) : ae(m), Fe = oe(m);
      Ae2 && Fe ? (f.value = true, V.value = m, j && (H.value = re, et2(), a("text-submit")), nextTick().then(() => {
        f.value = false;
      })) : a("invalid-date", m);
    }, pa2 = () => {
      n.autoApply && oe(V.value) && M(), vt2();
    }, Zt2 = () => d.value ? Xe2() : N2(), ya2 = (m) => {
      V.value = m;
    }, ga2 = () => {
      S.value.enabled && (h2.value = true, F()), a("focus");
    }, ha2 = () => {
      if (S.value.enabled && (h2.value = false, s(n.modelValue), H.value)) {
        const m = wl(C.value, E.value);
        m == null || m.focus();
      }
      a("blur");
    }, ba2 = (m) => {
      v.value && v.value.updateMonthYear(0, {
        month: rn(m.month),
        year: rn(m.year)
      });
    }, ka2 = (m) => {
      s(m ?? n.modelValue);
    }, wa2 = (m, j) => {
      var re;
      (re = v.value) == null || re.switchView(m, j);
    }, Za2 = (m) => Y.value.onClickOutside ? Y.value.onClickOutside(m) : Xe2(), k = (m = 0) => {
      var j;
      (j = v.value) == null || j.handleFlow(m);
    };
    return so(L, _, () => Za2(he2)), t({
      closeMenu: Xe2,
      selectDate: et2,
      clearValue: ce,
      openMenu: N2,
      onScroll: O,
      formatInputValue: F,
      // exposed for testing purposes
      updateInternalModelValue: ya2,
      // modify internal modelValue
      setMonthYear: ba2,
      parseModel: ka2,
      switchView: wa2,
      toggleMenu: Zt2,
      handleFlow: k,
      dpWrapMenuRef: L
    }), (m, j) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: C,
      class: normalizeClass(le.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(no, mergeProps({
        ref_key: "inputRef",
        ref: _,
        "input-value": unref(D),
        "onUpdate:inputValue": j[0] || (j[0] = (re) => isRef(D) ? D.value = re : null),
        "is-menu-open": d.value
      }, m.$props, {
        onClear: ce,
        onOpen: N2,
        onSetInputDate: Lt2,
        onSetEmptyDate: unref(M),
        onSelectDate: et2,
        onToggle: Zt2,
        onClose: Xe2,
        onFocus: ga2,
        onBlur: ha2,
        onRealBlur: j[1] || (j[1] = (re) => h2.value = false),
        onTextInput: j[2] || (j[2] = (re) => m.$emit("text-input", re))
      }), createSlots({ _: 2 }, [
        renderList(unref(te), (re, Ae2) => ({
          name: re,
          fn: withCtx((Fe) => [
            renderSlot(m.$slots, re, normalizeProps(guardReactiveProps(Fe)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(m.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps($.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(ve)(unref(g)),
            css: unref(y) && !unref(x).enabled
          }, {
            default: withCtx(() => [
              d.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: L
              }, ge.value, {
                class: { "dp--menu-wrapper": !unref(x).enabled },
                style: unref(x).enabled ? void 0 : unref(X)
              }), [
                createVNode(mn, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: v
                }, m.$props, {
                  "internal-model-value": unref(V),
                  "onUpdate:internalModelValue": j[3] || (j[3] = (re) => isRef(V) ? V.value = re : null),
                  class: { [me.value]: true, "dp--menu-wrapper": m.teleport },
                  "open-on-top": unref(g),
                  "no-overlay-focus": r.value,
                  collapse: U.value,
                  "get-input-rect": R,
                  "is-text-input-date": f.value,
                  onClosePicker: Xe2,
                  onSelectDate: et2,
                  onAutoApply: ot2,
                  onTimeUpdate: pa2,
                  onFlowStep: j[4] || (j[4] = (re) => m.$emit("flow-step", re)),
                  onUpdateMonthYear: j[5] || (j[5] = (re) => m.$emit("update-month-year", re)),
                  onInvalidSelect: j[6] || (j[6] = (re) => m.$emit("invalid-select", unref(V))),
                  onAutoApplyInvalid: j[7] || (j[7] = (re) => m.$emit("invalid-select", re)),
                  onInvalidFixedRange: j[8] || (j[8] = (re) => m.$emit("invalid-fixed-range", re)),
                  onRecalculatePosition: unref(p),
                  onTooltipOpen: j[9] || (j[9] = (re) => m.$emit("tooltip-open", re)),
                  onTooltipClose: j[10] || (j[10] = (re) => m.$emit("tooltip-close", re)),
                  onTimePickerOpen: j[11] || (j[11] = (re) => m.$emit("time-picker-open", re)),
                  onTimePickerClose: j[12] || (j[12] = (re) => m.$emit("time-picker-close", re)),
                  onAmPmChange: j[13] || (j[13] = (re) => m.$emit("am-pm-change", re)),
                  onRangeStart: j[14] || (j[14] = (re) => m.$emit("range-start", re)),
                  onRangeEnd: j[15] || (j[15] = (re) => m.$emit("range-end", re)),
                  onDateUpdate: j[16] || (j[16] = (re) => m.$emit("date-update", re)),
                  onInvalidDate: j[17] || (j[17] = (re) => m.$emit("invalid-date", re)),
                  onOverlayToggle: j[18] || (j[18] = (re) => m.$emit("overlay-toggle", re))
                }), createSlots({ _: 2 }, [
                  renderList(unref(z), (re, Ae2) => ({
                    name: re,
                    fn: withCtx((Fe) => [
                      renderSlot(m.$slots, re, normalizeProps(guardReactiveProps({ ...Fe })))
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
var Vn = (() => {
  const e = uo;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var io = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Vn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(io).forEach(([e, t]) => {
  e !== "default" && (Vn[e] = t);
});

// node_modules/.pnpm/@vueuse+integrations@11.1.0_async-validator@4.2.5_focus-trap@7.6.0_qrcode@1.5.4_sortablejs@1.15.3_vue@3.5.8/node_modules/@vueuse/integrations/useQRCode.mjs
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/shared/ssr-window.esm.mjs
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/shared/utils.mjs
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
function getComputedStyle2(el) {
  const window2 = getWindow();
  let style;
  if (window2.getComputedStyle) {
    style = window2.getComputedStyle(el, null);
  }
  if (!style && el.currentStyle) {
    style = el.currentStyle;
  }
  if (!style) {
    style = el.style;
  }
  return style;
}
function getTranslate(el, axis) {
  if (axis === void 0) {
    axis = "x";
  }
  const window2 = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle2(el);
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
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
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
  const children = [...element.children];
  if (element instanceof HTMLSlotElement) {
    children.push(...element.assignedElements());
  }
  if (!selector) {
    return children;
  }
  return children.filter((el) => el.matches(selector));
}
function elementIsChildOf(el, parent) {
  const isChild = parent.contains(el);
  if (!isChild && parent instanceof HTMLSlotElement) {
    const children = [...parent.assignedElements()];
    return children.includes(el);
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
  const el = document.createElement(tag);
  el.classList.add(...Array.isArray(classes2) ? classes2 : classesToTokens(classes2));
  return el;
}
function elementPrevAll(el, selector) {
  const prevEls = [];
  while (el.previousElementSibling) {
    const prev = el.previousElementSibling;
    if (selector) {
      if (prev.matches(selector)) prevEls.push(prev);
    } else prevEls.push(prev);
    el = prev;
  }
  return prevEls;
}
function elementNextAll(el, selector) {
  const nextEls = [];
  while (el.nextElementSibling) {
    const next = el.nextElementSibling;
    if (selector) {
      if (next.matches(selector)) nextEls.push(next);
    } else nextEls.push(next);
    el = next;
  }
  return nextEls;
}
function elementStyle(el, prop) {
  const window2 = getWindow();
  return window2.getComputedStyle(el, null).getPropertyValue(prop);
}
function elementIndex(el) {
  let child = el;
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
function elementParents(el, selector) {
  const parents = [];
  let parent = el.parentElement;
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
function elementTransitionEnd(el, callback) {
  function fireCallBack(e) {
    if (e.target !== el) return;
    callback.call(el, e);
    el.removeEventListener("transitionend", fireCallBack);
  }
  if (callback) {
    el.addEventListener("transitionend", fireCallBack);
  }
}
function elementOuterSize(el, size, includeMargins) {
  const window2 = getWindow();
  if (includeMargins) {
    return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
  }
  return el.offsetWidth;
}
function makeElementsArray(el) {
  return (Array.isArray(el) ? el : [el]).filter((e) => !!e);
}
function getRotateFix(swiper) {
  return (v) => {
    if (Math.abs(v) > 0 && swiper.browser && swiper.browser.need3dFix && Math.abs(v) % 90 === 0) {
      return v + 1e-3;
    }
    return v;
  };
}

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/shared/swiper-core.mjs
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
  const el = swiper.el;
  if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el.clientWidth;
  }
  if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }
  width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
  height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
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
    const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
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
function updateClickedSlide(el, path) {
  const swiper = this;
  const params = swiper.params;
  let slide2 = el.closest(`.${params.slideClass}, swiper-slide`);
  if (!slide2 && swiper.isElement && path && path.length > 1 && path.includes(el)) {
    [...path.slice(path.indexOf(el) + 1, path.length)].forEach((pathEl) => {
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
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  const isInitialVirtual = isVirtual && initial;
  if (!isInitialVirtual && (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate)) {
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
    slides.forEach((el, index) => {
      el.setAttribute("data-swiper-slide-index", index);
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
    activeSlideIndex = swiper.getSlideIndex(slides.filter((el) => el.classList.contains(params.slideActiveClass))[0]);
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
        for (let i2 = slides.length - 1; i2 >= 0; i2 -= 1) {
          if (slides[i2].column === colIndexToPrepend) prependSlidesIndexes.push(i2);
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
  const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el.style.cursor = "move";
  el.style.cursor = moving ? "grabbing" : "grab";
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
  function __closestFrom(el) {
    if (!el || el === getDocument() || el === getWindow()) return null;
    if (el.assignedSlot) el = el.assignedSlot;
    const found = el.closest(selector);
    if (!found && !el.getRootNode) {
      return null;
    }
    return found || __closestFrom(el.getRootNode().host);
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
  if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl && (e.pointerType === "mouse" || e.pointerType !== "mouse" && !targetEl.matches(data.focusableElements))) {
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
  if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== e.target && e.pointerType !== "mouse") {
    document2.activeElement.blur();
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
    if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) {
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
    if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) {
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
    el
  } = swiper;
  if (el && el.offsetWidth === 0) return;
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
    el,
    wrapperEl,
    device
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
  const swiperMethod = method;
  if (!el || typeof el === "string") return;
  document2[domMethod]("touchstart", swiper.onDocumentTouchStart, {
    passive: false,
    capture
  });
  el[domMethod]("touchstart", swiper.onTouchStart, {
    passive: false
  });
  el[domMethod]("pointerdown", swiper.onTouchStart, {
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
    el[domMethod]("click", swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]("scroll", swiper.onScroll);
  }
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
  } else {
    swiper[swiperMethod]("observerUpdate", onResize, true);
  }
  el[domMethod]("load", swiper.onLoad, {
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
    el
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
    el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el.classList.add(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
      el.classList.add(`${params.containerModifierClass}grid-column`);
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
    el,
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
  el.classList.add(...classNames);
  swiper.emitContainerClasses();
}
function removeClasses() {
  const swiper = this;
  const {
    el,
    classNames
  } = swiper;
  if (!el || typeof el === "string") return;
  el.classList.remove(...classNames);
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
    let el;
    let params;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
      params = args[0];
    } else {
      [el, params] = args;
    }
    if (!params) params = {};
    params = extend2({}, params);
    if (el && !params.el) params.el = el;
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
      el,
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
    let el = element || swiper.params.el;
    if (typeof el === "string") {
      el = document.querySelector(el);
    }
    if (!el) {
      return false;
    }
    el.swiper = swiper;
    if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) {
      swiper.isElement = true;
    }
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
    };
    const getWrapper = () => {
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        const res = el.shadowRoot.querySelector(getWrapperSelector());
        return res;
      }
      return elementChildren(el, getWrapperSelector())[0];
    };
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = createElement("div", swiper.params.wrapperClass);
      el.append(wrapperEl);
      elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl) => {
        wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      el,
      wrapperEl,
      slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
      hostEl: swiper.isElement ? el.parentNode.host : el,
      mounted: true,
      // RTL
      rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
      rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
      wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
    });
    return true;
  }
  init(el) {
    const swiper = this;
    if (swiper.initialized) return swiper;
    const mounted = swiper.mount(el);
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
      el,
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
      if (el && typeof el !== "string") {
        el.removeAttribute("style");
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/shared/update-swiper.mjs
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/shared/update-on-virtual-data.mjs
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
    el,
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
  swiper.init(el);
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/swiper-vue.mjs
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
    function updateClasses(swiper, el, classNames) {
      if (el === slideElRef.value) {
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/modules/mousewheel.mjs
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
              if (swiper.destroyed || !swiper.params) return;
              swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
            }, 0);
          }
          if (!timeout) {
            timeout = nextTick2(() => {
              if (swiper.destroyed || !swiper.params) return;
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/shared/create-element-if-not-defined.mjs
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/modules/navigation.mjs
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
  function getEl(el) {
    let res;
    if (el && typeof el === "string" && swiper.isElement) {
      res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
      if (res) return res;
    }
    if (el) {
      if (typeof el === "string") res = [...document.querySelectorAll(el)];
      if (swiper.params.uniqueNavElements && typeof el === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
        res = swiper.el.querySelector(el);
      } else if (res && res.length === 1) {
        res = res[0];
      }
    }
    if (el && !res) return el;
    return res;
  }
  function toggleEl(el, disabled) {
    const params = swiper.params.navigation;
    el = makeElementsArray(el);
    el.forEach((subEl) => {
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
    const initButton = (el, dir) => {
      if (el) {
        el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el) {
        el.classList.add(...params.lockClass.split(" "));
      }
    };
    nextEl.forEach((el) => initButton(el, "next"));
    prevEl.forEach((el) => initButton(el, "prev"));
  }
  function destroy() {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const destroyButton = (el, dir) => {
      el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
    };
    nextEl.forEach((el) => destroyButton(el, "next"));
    prevEl.forEach((el) => destroyButton(el, "prev"));
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
    [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.add(swiper.params.navigation.lockClass));
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
      [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper.params.navigation.hiddenClass));
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/shared/classes-to-selector.mjs
function classesToSelector(classes2) {
  if (classes2 === void 0) {
    classes2 = "";
  }
  return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/modules/pagination.mjs
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
  function getMoveDirection(prevIndex, nextIndex, length) {
    prevIndex = prevIndex % length;
    nextIndex = nextIndex % length;
    if (nextIndex === prevIndex + 1) {
      return "next";
    } else if (nextIndex === prevIndex - 1) {
      return "previous";
    }
    return;
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
      const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
      if (moveDirection === "next") {
        swiper.slideNext();
      } else if (moveDirection === "previous") {
        swiper.slidePrev();
      } else {
        swiper.slideToLoop(index);
      }
    } else {
      swiper.slideTo(index);
    }
  }
  function update2() {
    const rtl = swiper.rtl;
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el = swiper.pagination.el;
    el = makeElementsArray(el);
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
        el.forEach((subEl) => {
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
      if (el.length > 1) {
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
    el.forEach((subEl, subElIndex) => {
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
    let el = swiper.pagination.el;
    el = makeElementsArray(el);
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
    el.forEach((subEl) => {
      if (params.type !== "custom") {
        subEl.innerHTML = paginationHTML || "";
      }
      if (params.type === "bullets") {
        swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
      }
    });
    if (params.type !== "custom") {
      emit("paginationRender", el[0]);
    }
  }
  function init() {
    swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: "swiper-pagination"
    });
    const params = swiper.params.pagination;
    if (!params.el) return;
    let el;
    if (typeof params.el === "string" && swiper.isElement) {
      el = swiper.el.querySelector(params.el);
    }
    if (!el && typeof params.el === "string") {
      el = [...document.querySelectorAll(params.el)];
    }
    if (!el) {
      el = params.el;
    }
    if (!el || el.length === 0) return;
    if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
      el = [...swiper.el.querySelectorAll(params.el)];
      if (el.length > 1) {
        el = el.filter((subEl) => {
          if (elementParents(subEl, ".swiper")[0] !== swiper.el) return false;
          return true;
        })[0];
      }
    }
    if (Array.isArray(el) && el.length === 1) el = el[0];
    Object.assign(swiper.pagination, {
      el
    });
    el = makeElementsArray(el);
    el.forEach((subEl) => {
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
    let el = swiper.pagination.el;
    if (el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
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
      el
    } = swiper.pagination;
    el = makeElementsArray(el);
    el.forEach((subEl) => {
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
      el
    } = swiper.pagination;
    if (el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
    }
  });
  on3("lock unlock", () => {
    update2();
  });
  on3("click", (_s2, e) => {
    const targetEl = e.target;
    const el = makeElementsArray(swiper.pagination.el);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
      const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit("paginationShow");
      } else {
        emit("paginationHide");
      }
      el.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
    }
    init();
    render2();
    update2();
  };
  const disable = () => {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/modules/autoplay.mjs
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/shared/effect-init.mjs
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/shared/effect-target.mjs
function effectTarget(effectParams, slideEl) {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = "hidden";
    transformEl.style["-webkit-backface-visibility"] = "hidden";
  }
  return transformEl;
}

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/shared/effect-virtual-transition-end.mjs
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
  const getSlide = (el) => {
    if (!el.parentElement) {
      const slide2 = swiper.slides.filter((slideEl) => slideEl.shadowRoot && slideEl.shadowRoot === el.parentNode)[0];
      return slide2;
    }
    return el.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter((transformEl) => {
        const el = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
        return swiper.getSlideIndex(el) === activeIndex;
      });
    }
    transitionEndTarget.forEach((el) => {
      elementTransitionEnd(el, () => {
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/modules/effect-fade.mjs
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
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/modules/effect-cube.mjs
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
      el,
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
        cubeShadowEl = el.querySelector(".swiper-cube-shadow");
        if (!cubeShadowEl) {
          cubeShadowEl = createElement("div", "swiper-cube-shadow");
          el.append(cubeShadowEl);
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
      el,
      slides
    } = swiper;
    slides.forEach((slideEl) => {
      slideEl.style.transitionDuration = `${duration}ms`;
      slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((subEl) => {
        subEl.style.transitionDuration = `${duration}ms`;
      });
    });
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      const shadowEl = el.querySelector(".swiper-cube-shadow");
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/shared/create-shadow.mjs
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/modules/effect-flip.mjs
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
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => {
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/modules/effect-coverflow.mjs
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
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => {
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/modules/effect-creative.mjs
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
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll(".swiper-slide-shadow").forEach((shadowEl) => {
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

// node_modules/.pnpm/swiper@11.1.14/node_modules/swiper/modules/effect-cards.mjs
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
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll(".swiper-slide-shadow").forEach((shadowEl) => {
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

// node_modules/.pnpm/vue-amazing-ui@1.7.0_async-validator@4.2.5_focus-trap@7.6.0_rollup@4.22.4_sortablejs@1.15.3/node_modules/vue-amazing-ui/dist/vue-amazing-ui.js
function In2(d = Date.now(), a = "YYYY-MM-DD HH:mm:ss") {
  try {
    let e;
    if (typeof d == "number" || typeof d == "string") {
      if (e = new Date(d), isNaN(e.getTime())) throw new Error("Invalid date");
    } else e = d;
    const l = (n, u = 2) => String(n).padStart(u, "0"), t = (n) => {
      switch (n) {
        case "YYYY":
          return l(e.getFullYear());
        case "YY":
          return l(e.getFullYear()).slice(2, 4);
        case "MM":
          return l(e.getMonth() + 1);
        case "M":
          return String(e.getMonth() + 1);
        case "DD":
          return l(e.getDate());
        case "D":
          return String(e.getDate());
        case "HH":
          return l(e.getHours());
        case "H":
          return String(e.getHours());
        case "mm":
          return l(e.getMinutes());
        case "m":
          return String(e.getMinutes());
        case "ss":
          return l(e.getSeconds());
        case "s":
          return String(e.getSeconds());
        case "SSS":
          return l(e.getMilliseconds(), 3);
        default:
          return n;
      }
    };
    return a.replace(/(YYYY|YY|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS)/g, t);
  } catch (e) {
    return console.error("Error formatting date:", e), "";
  }
}
function ol(d, a = 2, e = ",", l = ".", t, n) {
  typeof d != "number" && typeof d != "string" && console.warn("Expected value to be of type number or string"), typeof a != "number" && console.warn("Expected precision to be of type number");
  const u = Number(d);
  if (isNaN(u) || !isFinite(u)) return "";
  if (u === 0) return u.toFixed(a);
  let o = u.toFixed(a);
  if (typeof e == "string" && e !== "") {
    const [f, v] = o.split(".");
    o = f.replace(/(\d)(?=(\d{3})+$)/g, "$1" + e) + (v ? l + v : "");
  }
  return (t || "") + o + (n || "");
}
function xe(d, a = 0, e = false) {
  let l = null;
  const t = { id: requestAnimationFrame(function n(u) {
    if (l || (l = u), u - l >= a) {
      try {
        d();
      } catch (o) {
        console.error("Error executing rafTimeout function:", o);
      }
      e && (l = u, t.id = requestAnimationFrame(n));
    } else t.id = requestAnimationFrame(n);
  }) };
  return t;
}
function be(d) {
  d && d.id && typeof d.id == "number" ? cancelAnimationFrame(d.id) : console.warn("cancelRaf received an invalid id:", d);
}
function El2(d, a = 300) {
  let e = true;
  return function(...l) {
    return e && (d(...l), e = false, setTimeout(() => {
      e = true;
    }, a)), false;
  };
}
function Tl2(d, a = 300) {
  let e = null;
  return function(...l) {
    e && clearTimeout(e), e = setTimeout(() => {
      d(...l);
    }, a);
  };
}
function Ne(d, a) {
  if (Number.isNaN(d) || Number.isNaN(a)) throw new Error("Both num1 and num2 must be valid numbers.");
  if (d % 1 == 0 && a % 1 == 0) return d + a;
  const e = String(d).split(".")[1] ?? "", l = String(a).split(".")[1] ?? "", t = Math.max(e.length, l.length), n = Math.pow(10, t), u = d.toFixed(t), o = a.toFixed(t);
  return (+u.replace(".", "") + +o.replace(".", "")) / n;
}
function Pn2(d, a) {
  d = encodeURI(d);
  let e = "";
  a ? e = a : e = new URL(d).pathname.split("/").pop() || "download";
  const l = new XMLHttpRequest();
  l.open("GET", d, true), l.responseType = "blob", l.onerror = function() {
    console.error("下载文件失败");
  }, l.onload = function() {
    if (l.status === 200) {
      const t = l.response, n = document.createElement("a"), u = document.querySelector("body");
      n.href = window.URL.createObjectURL(t), n.download = e, n.style.display = "none", u == null || u.appendChild(n), n.click(), u == null || u.removeChild(n), window.URL.revokeObjectURL(n.href);
    } else console.error("请求文件失败，状态码：", l.status);
  }, l.send();
}
function Vn2() {
  const d = document.documentElement;
  d.classList.toggle("dark"), d.classList.contains("dark") ? d.style.colorScheme = "dark" : d.style.colorScheme = "light";
}
function Ie2(d, a, e) {
  onMounted(() => d.addEventListener(a, e)), onUnmounted(() => d.removeEventListener(a, e));
}
function Ka2(d, a, e = {}) {
  const l = ref(false);
  let t;
  const n = computed(() => {
    const f = toValue(d);
    return f ? Array.isArray(f) ? f.map((v) => toValue(v)).filter((v) => v) : [f] : [];
  }), u = () => {
    t && (t.disconnect(), t = void 0);
  }, o = () => {
    n.value.length && !l.value && (t = new MutationObserver(a), n.value.forEach((f) => t.observe(f, e)));
  };
  return watch(() => n.value, () => {
    u(), o();
  }, { immediate: true, flush: "post" }), onBeforeUnmount(() => u()), { stop: () => {
    l.value = true, u();
  }, start: () => {
    l.value = false, o();
  } };
}
function Rn2(d = 100) {
  const a = ref(false);
  let e = 0;
  const l = El2(function() {
    let t = window.pageYOffset || document.documentElement.scrollTop;
    t = t < 0 ? 0 : t, a.value = t > e, e = t;
  }, d);
  return Ie2(window, "scroll", l), { scrollDown: a };
}
function jn() {
  const d = ref(0), a = ref(0);
  let e = performance.now();
  const l = (t) => {
    if (a.value++, a.value >= 10) {
      const n = t - e;
      d.value = Math.round(1e3 / (n / 10)), e = t, a.value = 0;
    }
    requestAnimationFrame(l);
  };
  return requestAnimationFrame(l), { fps: d };
}
function Wn(d) {
  if (!d || typeof d != "string" || d.trim() === "") throw new Error("Invalid mediaQuery parameter. It must be a non-empty string.");
  const a = ref(window && window.matchMedia(d).matches), e = window.matchMedia(d), l = (t) => {
    a.value = t.matches;
  };
  return onMounted(() => {
    e.addEventListener("change", l);
  }), onBeforeUnmount(() => {
    e.removeEventListener("change", l);
  }), { match: a };
}
function je2(d, a, e = {}) {
  let l;
  const t = ref(false), n = computed(() => {
    const f = toValue(d);
    return f ? Array.isArray(f) ? f.map((v) => toValue(v)).filter((v) => v) : [f] : [];
  }), u = () => {
    l && (l.disconnect(), l = void 0);
  }, o = () => {
    n.value.length && !t.value && (l = new ResizeObserver(a), n.value.forEach((f) => l.observe(f, e)));
  };
  return watch(() => n.value, () => {
    u(), o();
  }, { immediate: true, flush: "post" }), onBeforeUnmount(() => u()), { stop: () => {
    t.value = true, u();
  }, start: () => {
    t.value = false, o();
  } };
}
function he(d = "default") {
  const a = useSlots(), e = (l) => {
    var n;
    const t = (n = a[l]) == null ? void 0 : n.call(a);
    if (t && (t != null && t.length)) {
      const u = t[0];
      if (typeof u.children == "string") return u.children !== "v-if" && u.children.trim() !== "";
      if (u.children !== null) return !!u.children;
      if (u.type === "img" || typeof u.type != "string") return true;
    }
    return false;
  };
  if (Array.isArray(d)) {
    const l = reactive({});
    return d.forEach((t) => {
      const n = computed(() => e(t));
      l[t] = n;
    }), l;
  }
  return computed(() => e(d));
}
var Hl2 = { key: 0, class: "m-alert-icon" };
var Il2 = ["src"];
var Pl2 = { key: 1, class: "icon-svg", focusable: "false", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Vl2 = { key: 2, class: "icon-svg", focusable: "false", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Rl2 = { key: 3, class: "icon-svg", focusable: "false", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var jl2 = { key: 4, class: "icon-svg", focusable: "false", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Wl2 = { key: 1, class: "m-big-icon" };
var Nl2 = ["src"];
var ql2 = { key: 1, class: "icon-svg", focusable: "false", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Ol2 = { key: 2, class: "icon-svg", focusable: "false", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Kl2 = { key: 3, class: "icon-svg", focusable: "false", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Yl2 = { key: 4, class: "icon-svg", focusable: "false", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Ul2 = { class: "m-alert-content" };
var Gl2 = { class: "alert-message" };
var Zl2 = { key: 0, class: "alert-description" };
var Xl2 = { class: "m-alert-actions" };
var Ql2 = ["onKeydown"];
var Jl2 = { key: 0 };
var et = { key: 1, class: "alert-close", focusable: "false", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var N = (d, a) => {
  const e = d.__vccOpts || d;
  for (const [l, t] of a) e[l] = t;
  return e;
};
var Xe = N(defineComponent({ __name: "Alert", props: { message: { default: void 0 }, description: { default: void 0 }, type: { default: "info" }, closable: { type: Boolean, default: false }, closeText: { default: void 0 }, icon: { default: void 0 }, showIcon: { type: Boolean, default: false }, actions: { default: void 0 } }, emits: ["close"], setup(d, { emit: a }) {
  const e = d, l = ref(), t = ref(false), n = a, u = he(["description"]), o = computed(() => u.description || e.description);
  async function f(v) {
    l.value.style.maxHeight = l.value.offsetHeight + "px", await nextTick(), t.value = true, n("close", v);
  }
  return (v, h2) => (openBlock(), createBlock(Transition, { name: "alert-motion" }, { default: withCtx(() => [t.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, ref_key: "alertRef", ref: l, class: normalizeClass(["m-alert", [`alert-${v.type}`, { "alert-width-description": o.value }]]) }, [v.showIcon ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [o.value ? (openBlock(), createElementBlock("span", Wl2, [renderSlot(v.$slots, "icon", {}, () => [v.icon ? (openBlock(), createElementBlock("img", { key: 0, src: v.icon, class: "big-icon-img" }, null, 8, Nl2)) : v.type === "info" ? (openBlock(), createElementBlock("svg", ql2, h2[4] || (h2[4] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1), createBaseVNode("path", { d: "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1)]))) : v.type === "success" ? (openBlock(), createElementBlock("svg", Ol2, h2[5] || (h2[5] = [createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1), createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)]))) : v.type === "warning" ? (openBlock(), createElementBlock("svg", Kl2, h2[6] || (h2[6] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1), createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1)]))) : v.type === "error" ? (openBlock(), createElementBlock("svg", Yl2, h2[7] || (h2[7] = [createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1), createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)]))) : createCommentVNode("", true)], true)])) : (openBlock(), createElementBlock("span", Hl2, [renderSlot(v.$slots, "icon", {}, () => [v.icon ? (openBlock(), createElementBlock("img", { key: 0, src: v.icon, class: "icon-img" }, null, 8, Il2)) : v.type === "info" ? (openBlock(), createElementBlock("svg", Pl2, h2[0] || (h2[0] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1)]))) : v.type === "success" ? (openBlock(), createElementBlock("svg", Vl2, h2[1] || (h2[1] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1)]))) : v.type === "warning" ? (openBlock(), createElementBlock("svg", Rl2, h2[2] || (h2[2] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1)]))) : v.type === "error" ? (openBlock(), createElementBlock("svg", jl2, h2[3] || (h2[3] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1)]))) : createCommentVNode("", true)], true)]))], 64)) : createCommentVNode("", true), createBaseVNode("div", Ul2, [createBaseVNode("div", Gl2, [renderSlot(v.$slots, "message", {}, () => [createTextVNode(toDisplayString(v.message), 1)], true)]), o.value ? (openBlock(), createElementBlock("div", Zl2, [renderSlot(v.$slots, "description", {}, () => [createTextVNode(toDisplayString(v.description), 1)], true)])) : createCommentVNode("", true)]), createBaseVNode("div", Xl2, [renderSlot(v.$slots, "actions", {}, void 0, true)]), v.closable ? (openBlock(), createElementBlock("a", { key: 1, tabindex: "0", class: "m-alert-close", onClick: f, onKeydown: withKeys(withModifiers(f, ["prevent"]), ["enter"]) }, [renderSlot(v.$slots, "closeText", {}, () => [v.closeText ? (openBlock(), createElementBlock("span", Jl2, toDisplayString(v.closeText), 1)) : (openBlock(), createElementBlock("svg", et, h2[8] || (h2[8] = [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1)])))], true)], 40, Ql2)) : createCommentVNode("", true)], 2))]), _: 3 }));
} }), [["__scopeId", "data-v-2ce6d56a"]]);
Xe.install = (d) => {
  d.component(Xe.__name, Xe);
};
var at = ["src", "alt"];
var qe2 = N(defineComponent({ __name: "Avatar", props: { shape: { default: "circle" }, size: { default: "default" }, src: { default: void 0 }, alt: { default: void 0 }, icon: { default: void 0 } }, setup(d) {
  const a = d, e = ref(window.innerWidth);
  Ie2(window, "resize", function() {
    e.value = window.innerWidth;
  });
  const l = he(["default", "icon"]), t = computed(() => !a.src && !!(l.icon || a.icon)), n = computed(() => {
    if (typeof a.size == "number") return t.value ? { width: a.size + "px", height: a.size + "px", lineHeight: a.size + "px", fontSize: a.size / 2 + "px" } : { width: a.size + "px", height: a.size + "px", lineHeight: a.size + "px", fontSize: "18px" };
    if (typeof a.size == "object") {
      let f = 32;
      return e.value >= 1600 && a.size.xxl ? f = a.size.xxl : e.value >= 1200 && a.size.xl ? f = a.size.xl : e.value >= 992 && a.size.lg ? f = a.size.lg : e.value >= 768 && a.size.md ? f = a.size.md : e.value >= 576 && a.size.sm ? f = a.size.sm : e.value < 576 && a.size.xs && (f = a.size.xs), { width: f + "px", height: f + "px", lineHeight: f + "px", fontSize: f / 2 + "px" };
    }
    return {};
  }), u = computed(() => !a.src && !t.value && l.default), o = computed(() => {
    if (typeof a.size == "string") return { transform: "scale(1) translateX(-50%)" };
    if (typeof a.size == "number") {
      const f = Math.min(1, Math.max(0.022222222222222223, (1 + 1 * (a.size - 9)) / 45));
      return { lineHeight: a.size + "px", transform: `scale(${f}) translateX(-50%)` };
    }
    return {};
  });
  return (f, v) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-avatar", [`avatar-${f.shape}`, { [`avatar-${f.size}`]: typeof f.size == "string", "avatar-image": f.src }]]), style: normalizeStyle(n.value) }, [f.src ? (openBlock(), createElementBlock("img", { key: 0, class: "avatar-image", src: f.src, alt: f.alt }, null, 8, at)) : createCommentVNode("", true), !f.src && t.value ? renderSlot(f.$slots, "icon", { key: 1 }, () => [(openBlock(), createBlock(resolveDynamicComponent(f.icon)))], true) : createCommentVNode("", true), f.src || t.value || !u.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", { key: 2, class: "avatar-string", style: normalizeStyle(o.value) }, [renderSlot(f.$slots, "default", {}, void 0, true)], 4))], 6));
} }), [["__scopeId", "data-v-4a9d5802"]]);
qe2.install = (d) => {
  d.component(qe2.__name, qe2);
};
var lt2 = { key: 0, class: "tooltip-arrow" };
var Ve = N(defineComponent({ __name: "Tooltip", props: { maxWidth: { default: 240 }, content: { default: void 0 }, contentStyle: { default: () => ({}) }, tooltip: { default: void 0 }, tooltipStyle: { default: () => ({}) }, bgColor: { default: "rgba(0, 0, 0, 0.85)" }, arrow: { type: Boolean, default: true }, trigger: { default: "hover" }, showDelay: { default: 100 }, hideDelay: { default: 100 }, show: { type: Boolean, default: false } }, emits: ["update:show", "openChange"], setup(d, { emit: a }) {
  const e = d, l = ref(false), t = ref(), n = ref(0), u = ref(0), o = ref(), f = ref(), v = ref(false), h2 = a, w = he(["tooltip"]), m = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth), g = computed(() => w.tooltip || e.tooltip);
  function p() {
    const M = o.value.offsetWidth, y = f.value.offsetWidth, c = f.value.offsetHeight;
    n.value = c + (e.arrow ? 4 : 6), u.value = (y - M) / 2;
  }
  function k() {
    t.value && be(t.value), l.value || (p(), xe(() => {
      l.value = true, h2("update:show", true), h2("openChange", true);
    }, e.showDelay));
  }
  function z() {
    t.value = xe(() => {
      l.value = false, h2("update:show", false), h2("openChange", false);
    }, e.hideDelay);
  }
  return watch(m, () => {
    p();
  }, { flush: "post" }), watchEffect(() => {
    l.value = e.show;
  }), (M, y) => (openBlock(), createElementBlock("div", { class: "m-tooltip-wrap", onMouseenter: y[6] || (y[6] = (c) => M.trigger === "hover" ? k() : () => false), onMouseleave: y[7] || (y[7] = (c) => M.trigger === "hover" ? z() : () => false) }, [createBaseVNode("div", { ref_key: "tooltipRef", ref: f, tabindex: "1", class: normalizeClass(["m-tooltip-card", { "tooltip-padding": M.arrow, "tooltip-visible": l.value && g.value }]), style: normalizeStyle(`--tooltip-max-width: ${m.value}; --tooltip-background-color: ${M.bgColor}; transform-origin: 50% ${n.value}px; top: ${-n.value}px; left: ${-u.value}px;`), onBlur: y[0] || (y[0] = (c) => M.trigger === "click" && v.value ? (l.value = false, h2("update:show", false), void h2("openChange", false)) : () => false), onMouseenter: y[1] || (y[1] = (c) => M.trigger === "hover" ? k() : () => false), onMouseleave: y[2] || (y[2] = (c) => M.trigger === "hover" ? z() : () => false) }, [createBaseVNode("div", { class: "tooltip-card", style: normalizeStyle(M.tooltipStyle) }, [renderSlot(M.$slots, "tooltip", {}, () => [createTextVNode(toDisplayString(M.tooltip), 1)], true)], 4), M.arrow ? (openBlock(), createElementBlock("div", lt2)) : createCommentVNode("", true)], 38), createBaseVNode("span", { ref_key: "contentRef", ref: o, class: "tooltip-content", style: normalizeStyle(M.contentStyle), onClick: y[3] || (y[3] = (c) => M.trigger === "click" ? void (l.value ? z() : k()) : () => false), onMouseenter: y[4] || (y[4] = (c) => M.trigger === "click" && l.value ? void (v.value = false) : () => false), onMouseleave: y[5] || (y[5] = (c) => M.trigger === "click" && l.value ? (v.value = true, void f.value.focus()) : () => false) }, [renderSlot(M.$slots, "default", {}, () => [createTextVNode(toDisplayString(M.content), 1)], true)], 36)], 32));
} }), [["__scopeId", "data-v-ae61f4b8"]]);
Ve.install = (d) => {
  d.component(Ve.__name, Ve);
};
var tt = { key: 0, class: "backtop-description" };
var Qe = N(defineComponent({ __name: "BackTop", props: { icon: { default: void 0 }, description: { default: void 0 }, tooltip: { default: void 0 }, tooltipProps: { default: () => ({}) }, type: { default: "default" }, shape: { default: "circle" }, bottom: { default: 40 }, right: { default: 40 }, zIndex: { default: 9 }, visibilityHeight: { default: 180 }, to: { default: "body" }, listenTo: { default: void 0 } }, emits: ["click", "show"], setup(d, { emit: a }) {
  const e = d, l = ref(null), t = ref(0), n = ref(null), u = ref(null), o = a, f = he(["tooltip", "icon", "description"]), v = { childList: true, attributes: true, subtree: true }, h2 = new MutationObserver(() => {
    var C;
    t.value = ((C = n.value) == null ? void 0 : C.scrollTop) ?? 0;
  }), w = computed(() => ({ bottom: typeof e.bottom == "number" ? e.bottom + "px" : e.bottom, right: typeof e.right == "number" ? e.right + "px" : e.right, zIndex: e.zIndex })), m = computed(() => t.value >= e.visibilityHeight), g = computed(() => f.tooltip || e.tooltip), p = computed(() => f.description || e.description);
  function k(C) {
    t.value = C.target.scrollTop;
  }
  function z() {
    var C;
    t.value = ((C = n.value) == null ? void 0 : C.scrollTop) ?? 0;
  }
  function M() {
    n.value && (n.value.removeEventListener("scroll", k), window.removeEventListener("resize", z));
  }
  function y() {
    var C;
    e.listenTo === void 0 ? n.value = $((C = l.value) == null ? void 0 : C.parentElement) : typeof e.listenTo == "string" ? n.value = document.getElementsByTagName(e.listenTo)[0] : e.listenTo instanceof HTMLElement && (n.value = e.listenTo), n.value && (h2.observe(n.value, v), n.value.addEventListener("scroll", k), window.addEventListener("resize", z));
  }
  function c() {
    var C;
    typeof e.to == "string" ? u.value = document.getElementsByTagName(e.to)[0] : e.to instanceof HTMLElement && (u.value = e.to), (C = u.value) == null || C.appendChild(l.value);
  }
  function $(C) {
    return C ? C.scrollHeight > C.clientHeight ? C : $(C.parentElement) : null;
  }
  function x() {
    n.value && n.value.scrollTo({ top: 0, behavior: "smooth" }), o("click");
  }
  return watch(() => e.listenTo, () => {
    h2.disconnect(), M(), y();
  }, { flush: "post" }), watch(() => e.to, () => {
    c();
  }, { flush: "post" }), watch(m, (C) => {
    o("show", C);
  }), onMounted(() => {
    y(), c();
  }), onBeforeUnmount(() => {
    var C;
    h2.disconnect(), M(), (C = l.value) == null || C.remove();
  }), (C, L) => (openBlock(), createBlock(Transition, { name: "zoom" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { ref_key: "backtopRef", ref: l, class: "m-backtop-wrap", style: normalizeStyle(w.value), onClick: x }, [createVNode(unref(Ve), mergeProps({ style: { "border-radius": "22px" }, "content-style": { borderRadius: "22px" } }, C.tooltipProps), createSlots({ default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(["m-backtop", `backtop-${C.type} backtop-${C.shape}`]) }, [renderSlot(C.$slots, "default", {}, () => [createBaseVNode("span", { class: normalizeClass(["backtop-icon", { "icon-description": p.value }]) }, [renderSlot(C.$slots, "icon", {}, () => [L[0] || (L[0] = createBaseVNode("svg", { width: "1em", height: "1em", viewBox: "0 0 24 24", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xlinkHref: "http://www.w3.org/1999/xlink" }, [createBaseVNode("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, [createBaseVNode("g", { transform: "translate(-139.000000, -4423.000000)", "fill-rule": "nonzero" }, [createBaseVNode("g", { transform: "translate(120.000000, 4285.000000)" }, [createBaseVNode("g", { transform: "translate(7.000000, 126.000000)" }, [createBaseVNode("g", { transform: "translate(24.000000, 24.000000) scale(1, -1) translate(-24.000000, -24.000000) translate(12.000000, 12.000000)" }, [createBaseVNode("g", { transform: "translate(4.000000, 2.000000)" }, [createBaseVNode("path", { d: "M8,0 C8.51283584,0 8.93550716,0.38604019 8.99327227,0.883378875 L9,1 L9,10.584 L12.2928932,7.29289322 C12.6834175,6.90236893 13.3165825,6.90236893 13.7071068,7.29289322 C14.0675907,7.65337718 14.0953203,8.22060824 13.7902954,8.61289944 L13.7071068,8.70710678 L8.70710678,13.7071068 L8.62544899,13.7803112 L8.618,13.784 L8.59530661,13.8036654 L8.4840621,13.8753288 L8.37133602,13.9287745 L8.22929083,13.9735893 L8.14346259,13.9897165 L8.03324678,13.9994506 L7.9137692,13.9962979 L7.77070917,13.9735893 L7.6583843,13.9401293 L7.57677845,13.9063266 L7.47929125,13.8540045 L7.4048407,13.8036865 L7.38131006,13.7856883 C7.35030318,13.7612383 7.32077858,13.7349921 7.29289322,13.7071068 L2.29289322,8.70710678 L2.20970461,8.61289944 C1.90467972,8.22060824 1.93240926,7.65337718 2.29289322,7.29289322 C2.65337718,6.93240926 3.22060824,6.90467972 3.61289944,7.20970461 L3.70710678,7.29289322 L7,10.585 L7,1 L7.00672773,0.883378875 C7.06449284,0.38604019 7.48716416,0 8,0 Z" }), createBaseVNode("path", { d: "M14.9333333,15.9994506 C15.5224371,15.9994506 16,16.4471659 16,16.9994506 C16,17.5122865 15.5882238,17.9349578 15.0577292,17.9927229 L14.9333333,17.9994506 L1.06666667,17.9994506 C0.477562934,17.9994506 0,17.5517354 0,16.9994506 C0,16.4866148 0.411776203,16.0639435 0.9422708,16.0061783 L1.06666667,15.9994506 L14.9333333,15.9994506 Z" })])])])])])])], -1))], true)], 2), p.value ? (openBlock(), createElementBlock("span", tt, [renderSlot(C.$slots, "description", {}, () => [createTextVNode(toDisplayString(C.description), 1)], true)])) : createCommentVNode("", true)], true)], 2)]), _: 2 }, [g.value ? { name: "tooltip", fn: withCtx(() => [renderSlot(C.$slots, "tooltip", {}, () => [createTextVNode(toDisplayString(C.tooltip), 1)], true)]), key: "0" } : void 0]), 1040)], 4), [[vShow, m.value]])]), _: 3 }));
} }), [["__scopeId", "data-v-d085ca16"]]);
Qe.install = (d) => {
  d.component(Qe.__name, Qe);
};
var ot = { class: "status-text" };
var st = ["title"];
var it2 = { key: 0, class: "m-number", style: { transition: "none 0s ease 0s" } };
var nt2 = { class: "u-number" };
var Za = ((d) => (d.pink = "pink", d.red = "red", d.yellow = "yellow", d.orange = "orange", d.cyan = "cyan", d.green = "green", d.blue = "blue", d.purple = "purple", d.geekblue = "geekblue", d.magenta = "magenta", d.volcano = "volcano", d.gold = "gold", d.lime = "lime", d))(Za || {});
var Je2 = N(defineComponent({ __name: "Badge", props: { color: { default: void 0 }, value: { default: void 0 }, max: { default: 99 }, showZero: { type: Boolean, default: false }, dot: { type: Boolean, default: false }, offset: { default: void 0 }, status: { default: void 0 }, text: { default: void 0 }, valueStyle: { default: () => ({}) }, zIndex: { default: 9 }, title: { default: void 0 }, ripple: { type: Boolean, default: true } }, setup(d) {
  const a = d, e = computed(() => {
    if (a.color && !Object.keys(Za).includes(a.color)) return a.value !== void 0 && a.value !== 0 || a.showZero && a.value === 0 ? { backgroundColor: a.color } : { color: a.color, backgroundColor: a.color };
  }), l = computed(() => a.color && Object.keys(Za).includes(a.color) ? a.value !== void 0 && a.value !== 0 || a.showZero && a.value === 0 ? `color-${a.color} white` : "color-" + a.color : a.status ? a.value !== void 0 && a.value !== 0 || a.showZero && a.value === 0 ? `status-${a.status} white` : "status-" + a.status : void 0), t = he(["default", "value"]), n = computed(() => !(a.value === void 0 && !a.dot && (a.color || a.status)) && t.default), u = computed(() => !a.color && !a.status && t.value), o = computed(() => !!(a.value !== void 0 && a.value !== 0 || a.showZero && a.value === 0 || a.dot)), f = computed(() => a.value === void 0 || a.value === 0 && !a.showZero || a.dot), v = computed(() => {
    var m;
    return (m = a.offset) != null && m.length ? { right: h2(a.offset[0]) ? -a.offset[0] + "px" : w(a.offset[0]), marginTop: h2(a.offset[1]) ? a.offset[1] + "px" : a.offset[1] } : {};
  });
  function h2(m) {
    return typeof m == "number";
  }
  function w(m) {
    return m.includes("-") ? m.replace("-", "") : `-${m}`;
  }
  return (m, g) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-badge", { "badge-status-color": m.value === void 0 && (m.color || m.status) }]), style: normalizeStyle([`--z-index: ${m.zIndex}`, m.value !== void 0 || m.dot ? null : v.value]) }, [m.value !== void 0 || m.dot || !m.color && !m.status ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [n.value ? renderSlot(m.$slots, "default", { key: 0 }, void 0, true) : createCommentVNode("", true), u.value ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["m-value", { "only-number": !n.value }]) }, [renderSlot(m.$slots, "value", {}, void 0, true)], 2)) : (openBlock(), createBlock(Transition, { key: 2, name: "zoom" }, { default: withCtx(() => [o.value ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-badge-value", [{ "small-num": typeof m.value == "number" && m.value < 10, "only-number": !n.value, "only-dot": f.value }, l.value]]), style: normalizeStyle([e.value, v.value, m.valueStyle]), title: m.title || (m.value !== void 0 ? String(m.value) : "") }, [m.dot ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", it2, [createBaseVNode("span", nt2, toDisplayString(typeof m.value == "number" && m.value > m.max ? m.max + "+" : m.value), 1)]))], 14, st)) : createCommentVNode("", true)]), _: 1 }))], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("span", { class: normalizeClass(["status-dot", [l.value, { "dot-ripple": m.ripple }]]), style: normalizeStyle(e.value) }, null, 6), createBaseVNode("span", ot, [renderSlot(m.$slots, "default", {}, () => [createTextVNode(toDisplayString(m.text), 1)], true)])], 64))], 6));
} }), [["__scopeId", "data-v-03868f18"]]);
Je2.install = (d) => {
  d.component(Je2.__name, Je2);
};
var ut = ["href", "target", "title"];
var dt2 = ["title"];
var rt2 = { key: 0 };
var ct = { key: 1, focusable: "false", "data-icon": "right", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var vt = defineComponent({ __name: "Breadcrumb", props: { routes: { default: () => [] }, breadcrumbClass: { default: void 0 }, breadcrumbStyle: { default: () => ({}) }, maxWidth: { default: "100%" }, separator: { default: void 0 }, separatorStyle: { default: () => ({}) }, target: { default: "_self" } }, setup(d) {
  const a = d, e = computed(() => a.routes.length);
  function l(t) {
    var n = t.path;
    if (t.query && JSON.stringify(t.query) !== "{}") {
      const u = t.query;
      Object.keys(u).forEach((o, f) => {
        n = f === 0 ? n + "?" + o + "=" + u[o] : n + "&" + o + "=" + u[o];
      });
    }
    return n;
  }
  return (t, n) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-breadcrumb", t.breadcrumbClass]), style: normalizeStyle(t.breadcrumbStyle) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(t.routes, (u, o) => (openBlock(), createElementBlock("div", { class: "m-breadcrumb-item", key: o }, [u.path ? (openBlock(), createElementBlock("a", { key: 0, class: normalizeClass(["breadcrumb-link link-hover", { "link-active": o === e.value - 1 }]), style: normalizeStyle(`max-width: ${t.maxWidth}px;`), href: l(u), target: t.target, title: u.name }, toDisplayString(u.name), 15, ut)) : (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["breadcrumb-link", { "link-active": o === e.value - 1 }]), style: normalizeStyle(`max-width: ${t.maxWidth}px;`), title: u.name }, toDisplayString(u.name), 15, dt2)), o < e.value - 1 ? (openBlock(), createElementBlock("span", { key: 2, class: "breadcrumb-separator", style: normalizeStyle(t.separatorStyle) }, [renderSlot(t.$slots, "separator", { index: o }, () => [t.separator ? (openBlock(), createElementBlock("span", rt2, toDisplayString(t.separator), 1)) : (openBlock(), createElementBlock("svg", ct, n[0] || (n[0] = [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1)])))], true)], 4)) : createCommentVNode("", true)]))), 128))], 6));
} });
var ea = N(vt, [["__scopeId", "data-v-30e480b1"]]);
ea.install = (d) => {
  d.component(ea.__name, ea);
};
var pt2 = ["disabled", "href", "target", "onKeydown"];
var ft = { key: 0, class: "btn-loading" };
var ht = { key: 0, class: "m-ring-circle" };
var mt2 = { key: 1, class: "m-dynamic-circle" };
var gt2 = { key: 1, class: "btn-icon" };
var yt2 = { key: 2, class: "btn-content" };
var $e = N(defineComponent({ __name: "Button", props: { type: { default: "default" }, shape: { default: "default" }, icon: { default: void 0 }, size: { default: "middle" }, ghost: { type: Boolean, default: false }, buttonClass: { default: void 0 }, rippleColor: { default: void 0 }, href: { default: void 0 }, target: { default: "_self" }, disabled: { type: Boolean, default: false }, loading: { type: Boolean, default: false }, loadingType: { default: "dynamic" }, block: { type: Boolean, default: false } }, emits: ["click"], setup(d, { emit: a }) {
  const e = { default: "#1677ff", reverse: "#1677ff", primary: "#1677ff", danger: "#ff4d4f", dashed: "#1677ff", text: "transparent", link: "transparent" }, l = ref(false), t = a, n = he(["icon", "default"]), u = computed(() => n.icon && !n.default);
  function o(h2) {
    l.value ? (l.value = false, nextTick(() => {
      l.value = true;
    })) : l.value = true, t("click", h2);
  }
  function f(h2) {
    o(h2);
  }
  function v() {
    l.value = false;
  }
  return (h2, w) => (openBlock(), createElementBlock("a", { tabindex: "0", class: normalizeClass(["m-btn", [`btn-${h2.type} btn-${h2.size}`, { [`loading-${h2.size}`]: !h2.href && h2.loading, "btn-icon-only": u.value, "btn-circle": h2.shape === "circle", "btn-round": h2.shape === "round", "btn-loading-blur": !h2.href && h2.loading, "btn-ghost": h2.ghost, "btn-block": h2.block, "btn-disabled": h2.disabled }, h2.buttonClass]]), style: normalizeStyle(`--ripple-color: ${h2.rippleColor || e[h2.type]};`), disabled: h2.disabled, href: h2.href ? h2.href : "javascript:void(0);", target: h2.href ? h2.target : "_self", onClick: o, onKeydown: withKeys(withModifiers(f, ["prevent"]), ["enter"]) }, [h2.loading || !unref(n).icon ? (openBlock(), createElementBlock("div", ft, [h2.href || h2.loadingType !== "static" ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", ht, w[0] || (w[0] = [createBaseVNode("svg", { class: "circle", width: "1em", height: "1em", fill: "currentColor", viewBox: "0 0 100 100" }, [createBaseVNode("path", { d: "M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90", "stroke-linecap": "round", class: "path", "fill-opacity": "0" })], -1)]))), h2.href || h2.loadingType !== "dynamic" ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", mt2, w[1] || (w[1] = [createBaseVNode("svg", { class: "circle", viewBox: "0 0 50 50", width: "1em", height: "1em", fill: "currentColor" }, [createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" })], -1)])))])) : createCommentVNode("", true), !h2.loading && unref(n).icon ? (openBlock(), createElementBlock("span", gt2, [renderSlot(h2.$slots, "icon", {}, void 0, true)])) : createCommentVNode("", true), unref(n).default ? (openBlock(), createElementBlock("span", yt2, [renderSlot(h2.$slots, "default", {}, void 0, true)])) : createCommentVNode("", true), h2.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 3, class: normalizeClass(["button-wave", { "wave-active": l.value }]), onAnimationend: v }, null, 34))], 46, pt2));
} }), [["__scopeId", "data-v-772c4a86"]]);
$e.install = (d) => {
  d.component($e.__name, $e);
};
var bt2 = { key: 2, class: "skeleton-image" };
var wt = { key: 3, class: "skeleton-header" };
var kt2 = { key: 0, class: "skeleton-content" };
var Oe2 = N(defineComponent({ __name: "Skeleton", props: { animated: { type: Boolean, default: true }, button: { type: [Boolean, Object], default: false }, avatar: { type: [Boolean, Object], default: false }, input: { type: [Boolean, Object], default: false }, image: { type: Boolean, default: false }, title: { type: [Boolean, Object], default: true }, paragraph: { type: [Boolean, Object], default: true }, loading: { type: Boolean, default: true } }, setup(d) {
  const a = d, e = computed(() => {
    if (typeof a.button == "object") return a.button.size === "large" ? 40 : a.button.size === "small" ? 24 : 32;
  }), l = computed(() => typeof a.avatar == "boolean" ? 8 : typeof a.avatar.size == "number" ? (a.avatar.size - 16) / 2 : { small: 4, middle: 8, large: 12 }[a.avatar.size || "middle"]), t = computed(() => typeof a.title == "boolean" ? "38%" : typeof a.title.width == "number" ? a.title.width + "px" : a.title.width || "38%"), n = computed(() => typeof a.paragraph == "boolean" ? a.avatar ? 2 : 3 : a.avatar ? a.paragraph.rows || 2 : a.paragraph.rows || 3), u = computed(() => {
    if (typeof a.paragraph == "object") {
      if (Array.isArray(a.paragraph.width)) return a.paragraph.width.map((o) => typeof o == "number" ? o + "px" : o);
      if (typeof a.paragraph.width == "number") return Array(n.value).fill(a.paragraph.width + "px");
      if (typeof a.paragraph.width == "string") return Array(n.value).fill(a.paragraph.width);
    }
    return Array(n.value);
  });
  return (o, f) => o.loading ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-skeleton", { "skeleton-avatar": o.avatar, "skeleton-animated": o.animated }]), style: normalizeStyle(`--button-size: ${e.value}px; --title-top: ${l.value}px;`) }, [o.button ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["skeleton-button", { "button-round": typeof o.button != "boolean" && o.button.shape === "round", "button-circle": typeof o.button != "boolean" && o.button.shape === "circle", "button-sm": typeof o.button != "boolean" && o.button.size === "small", "button-lg": typeof o.button != "boolean" && o.button.size === "large", "button-block": typeof o.button != "boolean" && o.button.shape !== "circle" && o.button.block }]) }, null, 2)) : createCommentVNode("", true), o.input ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["skeleton-input", { "input-sm": typeof o.input != "boolean" && o.input.size === "small", "input-lg": typeof o.input != "boolean" && o.input.size === "large" }]) }, null, 2)) : createCommentVNode("", true), o.image ? (openBlock(), createElementBlock("div", bt2, f[0] || (f[0] = [createBaseVNode("svg", { class: "image-svg", viewBox: "0 0 1098 1024", xmlns: "http://www.w3.org/2000/svg" }, [createBaseVNode("path", { class: "svg-path", d: "M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z" })], -1)]))) : createCommentVNode("", true), o.avatar ? (openBlock(), createElementBlock("div", wt, [createBaseVNode("span", { class: normalizeClass(["skeleton-avatar", { "avatar-sm": typeof o.avatar != "boolean" && o.avatar.size === "small", "avatar-lg": typeof o.avatar != "boolean" && o.avatar.size === "large", "avatar-square": typeof o.avatar != "boolean" && o.avatar.shape === "square" }]) }, null, 2)])) : createCommentVNode("", true), o.button || o.image || o.input ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 4 }, [o.title || o.paragraph ? (openBlock(), createElementBlock("div", kt2, [o.title ? (openBlock(), createElementBlock("h3", { key: 0, class: "skeleton-title", style: normalizeStyle({ width: t.value }) }, null, 4)) : createCommentVNode("", true), o.paragraph ? (openBlock(), createElementBlock("ul", { key: 1, class: normalizeClass(["skeleton-paragraph", { mt24: o.title, mt28: o.title && o.avatar }]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (v) => (openBlock(), createElementBlock("li", { key: v, style: normalizeStyle(`width: ${u.value[v - 1]};`) }, null, 4))), 128))], 2)) : createCommentVNode("", true)])) : createCommentVNode("", true)], 64))], 6)) : renderSlot(o.$slots, "default", { key: 1 }, void 0, true);
} }), [["__scopeId", "data-v-27e03b6b"]]);
Oe2.install = (d) => {
  d.component(Oe2.__name, Oe2);
};
var xt = { class: "m-head-wrapper" };
var Mt2 = { key: 0, class: "head-title" };
var _t = { key: 1, class: "head-extra" };
var aa2 = N(defineComponent({ __name: "Card", props: { width: { default: "auto" }, bordered: { type: Boolean, default: true }, size: { default: "middle" }, hoverable: { type: Boolean, default: false }, loading: { type: Boolean, default: false }, skeletonProps: { default: () => ({}) }, title: { default: void 0 }, extra: { default: void 0 }, headStyle: { default: () => ({}) }, bodyStyle: { default: () => ({}) } }, setup(d) {
  const a = d, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), l = he(["title", "extra"]), t = computed(() => l.title || l.extra || a.title || a.extra), n = computed(() => !!(l.title || a.title)), u = computed(() => !!(l.extra || a.extra));
  return (o, f) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-card", { "card-bordered": o.bordered, "card-small": o.size === "small", "card-middle": o.size === "middle", "card-large": o.size === "large", "card-hoverable": o.hoverable }]), style: normalizeStyle(`width: ${e.value};`) }, [t.value ? (openBlock(), createElementBlock("div", { key: 0, class: "m-card-head", style: normalizeStyle(o.headStyle) }, [createBaseVNode("div", xt, [n.value ? (openBlock(), createElementBlock("div", Mt2, [renderSlot(o.$slots, "title", {}, () => [createTextVNode(toDisplayString(o.title), 1)], true)])) : createCommentVNode("", true), u.value ? (openBlock(), createElementBlock("div", _t, [renderSlot(o.$slots, "extra", {}, () => [createTextVNode(toDisplayString(o.extra), 1)], true)])) : createCommentVNode("", true)])], 4)) : createCommentVNode("", true), createBaseVNode("div", { class: "m-card-body", style: normalizeStyle(o.bodyStyle) }, [createVNode(unref(Oe2), mergeProps({ title: false, loading: o.loading }, o.skeletonProps), { default: withCtx(() => [renderSlot(o.$slots, "default", {}, void 0, true)]), _: 3 }, 16, ["loading"])], 4)], 6));
} }), [["__scopeId", "data-v-6685708e"]]);
aa2.install = (d) => {
  d.component(aa2.__name, aa2);
};
var Ct2 = { class: "m-spin" };
var zt = { class: "m-spin-box" };
var $t = { key: 0, class: "m-loading-dot" };
var Bt = { key: 3, class: "m-ring-circle" };
var St2 = { class: "circle", viewBox: "0 0 100 100" };
var Lt = ["d"];
var Ft = { key: 4, class: "m-ring-rail" };
var At = { class: "circle", viewBox: "0 0 100 100" };
var Dt = ["d", "stroke"];
var Et2 = ["d"];
var Tt2 = { key: 5, class: "m-dynamic-circle" };
var Ht2 = { key: 6, class: "m-magic-ring" };
var Be2 = N(defineComponent({ __name: "Spin", props: { spinning: { type: Boolean, default: true }, size: { default: "middle" }, tip: { default: void 0 }, indicator: { default: "dot" }, color: { default: "#1677ff" }, spinCircleWidth: { default: 12 }, spinCirclePercent: { default: 33 }, ringRailColor: { default: "rgba(0, 0, 0, 0.12)" }, magicRingColor: { default: "#4096ff" }, rotate: { type: Boolean, default: false }, speed: { default: 800 } }, setup(d) {
  const a = d, e = computed(() => (100 - a.spinCircleWidth) * Math.PI), l = computed(() => {
    const t = 100 - a.spinCircleWidth;
    return `M 50,50 m 0,-${t / 2}
   a ${t / 2},${t / 2} 0 1 1 0,${t}
   a ${t / 2},${t / 2} 0 1 1 0,-${t}`;
  });
  return (t, n) => (openBlock(), createElementBlock("div", { class: normalizeClass(`m-spin-wrap spin-${t.size}`), style: normalizeStyle(`--color: ${t.color}; --magic-ring-color: ${t.magicRingColor}; --spin-circle-width: ${t.spinCircleWidth}; --speed: ${t.speed}ms;`) }, [withDirectives(createBaseVNode("div", Ct2, [createBaseVNode("div", zt, [t.indicator === "dot" ? (openBlock(), createElementBlock("div", $t, n[0] || (n[0] = [createBaseVNode("span", { class: "dot-item" }, null, -1), createBaseVNode("span", { class: "dot-item" }, null, -1), createBaseVNode("span", { class: "dot-item" }, null, -1), createBaseVNode("span", { class: "dot-item" }, null, -1)]))) : createCommentVNode("", true), t.indicator === "spin-dot" ? (openBlock(), createElementBlock("div", { key: 1, class: normalizeClass(["spin-wrap-box", { "spin-box-rotate": t.rotate }]) }, [n[2] || (n[2] = createStaticVNode('<div class="m-spin-dot" data-v-a580bdac><span class="spin-item" data-v-a580bdac></span><span class="spin-item" data-v-a580bdac></span><span class="spin-item" data-v-a580bdac></span><span class="spin-item" data-v-a580bdac></span></div>', 1)), createBaseVNode("div", { class: normalizeClass(["m-spin-dot spin-rotate", { "has-tip": t.tip }]) }, n[1] || (n[1] = [createBaseVNode("span", { class: "spin-item" }, null, -1), createBaseVNode("span", { class: "spin-item" }, null, -1), createBaseVNode("span", { class: "spin-item" }, null, -1), createBaseVNode("span", { class: "spin-item" }, null, -1)]), 2)], 2)) : createCommentVNode("", true), t.indicator === "spin-line" ? (openBlock(), createElementBlock("div", { key: 2, class: normalizeClass(["spin-wrap-box", { "spin-box-rotate": t.rotate }]) }, [n[4] || (n[4] = createStaticVNode('<div class="m-spin-line" data-v-a580bdac><span class="spin-item" data-v-a580bdac></span><span class="spin-item" data-v-a580bdac></span><span class="spin-item" data-v-a580bdac></span><span class="spin-item" data-v-a580bdac></span></div>', 1)), createBaseVNode("div", { class: normalizeClass(["m-spin-line spin-rotate", { "has-tip": t.tip }]) }, n[3] || (n[3] = [createBaseVNode("span", { class: "spin-item" }, null, -1), createBaseVNode("span", { class: "spin-item" }, null, -1), createBaseVNode("span", { class: "spin-item" }, null, -1), createBaseVNode("span", { class: "spin-item" }, null, -1)]), 2)], 2)) : createCommentVNode("", true), t.indicator === "ring-circle" ? (openBlock(), createElementBlock("div", Bt, [(openBlock(), createElementBlock("svg", St2, [createBaseVNode("path", { d: l.value, "stroke-linecap": "round", class: "path", style: normalizeStyle(`stroke-dasharray: ${t.spinCirclePercent / 100 * e.value}px, ${e.value}px;`), "fill-opacity": "0" }, null, 12, Lt)]))])) : createCommentVNode("", true), t.indicator === "ring-rail" ? (openBlock(), createElementBlock("div", Ft, [(openBlock(), createElementBlock("svg", At, [createBaseVNode("path", { d: l.value, stroke: t.ringRailColor, "stroke-linecap": "round", class: "trail", style: normalizeStyle(`stroke-dasharray: ${e.value}px, ${e.value}px;`), "fill-opacity": "0" }, null, 12, Dt), createBaseVNode("path", { d: l.value, "stroke-linecap": "round", class: "path", style: normalizeStyle(`stroke-dasharray: ${t.spinCirclePercent / 100 * e.value}px, ${e.value}px;`), "fill-opacity": "0" }, null, 12, Et2)]))])) : createCommentVNode("", true), t.indicator === "dynamic-circle" ? (openBlock(), createElementBlock("div", Tt2, n[5] || (n[5] = [createBaseVNode("svg", { class: "circle", viewBox: "0 0 50 50" }, [createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" })], -1)]))) : createCommentVNode("", true), t.indicator === "magic-ring" ? (openBlock(), createElementBlock("div", Ht2, n[6] || (n[6] = [createBaseVNode("div", { class: "outer-ring" }, null, -1), createBaseVNode("div", { class: "inner-ring" }, null, -1)]))) : createCommentVNode("", true), withDirectives(createBaseVNode("p", { class: "spin-tip" }, toDisplayString(t.tip), 513), [[vShow, t.tip]])])], 512), [[vShow, t.spinning]]), createBaseVNode("div", { class: normalizeClass(["spin-content", { "spin-blur": t.spinning }]) }, [renderSlot(t.$slots, "default", {}, void 0, true)], 2)], 6));
} }), [["__scopeId", "data-v-a580bdac"]]);
Be2.install = (d) => {
  d.component(Be2.__name, Be2);
};
var It2 = ["onClick"];
var Pt = ["onLoad", "src", "alt"];
var Vt = ["src", "alt"];
var Rt2 = ["onClick", "onMouseenter"];
var jt = defineComponent({ __name: "Carousel", props: { images: { default: () => [] }, width: { default: "100%" }, height: { default: "100vh" }, autoplay: { type: Boolean, default: false }, pauseOnMouseEnter: { type: Boolean, default: false }, effect: { default: "slide" }, interval: { default: 3e3 }, showArrow: { type: Boolean, default: true }, arrowColor: { default: "#FFF" }, arrowSize: { default: 36 }, dots: { type: Boolean, default: true }, dotSize: { default: 10 }, dotColor: { default: "rgba(255, 255, 255, 0.3)" }, dotActiveColor: { default: "#1677FF" }, dotStyle: { default: () => ({}) }, dotActiveStyle: { default: () => ({}) }, dotPosition: { default: "bottom" }, dotsTrigger: { default: "click" }, spinProps: { default: () => ({}) }, fadeDuration: { default: 500 }, fadeFunction: { default: "cubic-bezier(0.4, 0, 0.2, 1)" }, slideDuration: { default: 800 }, slideFunction: { default: () => [0.65, 0, 0.35, 1] } }, emits: ["change", "click"], setup(d, { expose: a, emit: e }) {
  const l = d, t = ref(0), n = ref(), u = ref(false), o = ref(false), f = ref(), v = ref(), h2 = ref(), w = ref(1), m = ref(), g = ref(), p = ref(Array(l.images.length).fill(false)), k = computed(() => typeof l.width == "number" ? l.width + "px" : l.width), z = computed(() => typeof l.height == "number" ? l.height + "px" : l.height), M = computed(() => l.images.length), y = computed(() => ["left", "right"].includes(l.dotPosition)), c = computed(() => y.value ? g.value : m.value), $ = computed(() => l.effect === "slide" ? { transform: (y.value ? "translateY" : "translateX") + `(${-t.value}px)` } : {});
  watch(() => [y.value, l.effect, l.images, l.autoplay, l.interval, l.fadeDuration, l.fadeFunction, p.value[0]], () => {
    C();
  }, { deep: true, flush: "post" });
  const x = e;
  function C() {
    n.value && be(n.value), f.value && cancelAnimationFrame(f.value), o.value = false, l.effect === "slide" && (t.value = (w.value - 1) * c.value), P();
  }
  function L(j) {
    p.value[j] = true;
  }
  function T(j) {
    M.value > 1 && (j.key !== "ArrowLeft" && j.key !== "ArrowUp" || Z(), j.key !== "ArrowRight" && j.key !== "ArrowDown" || U());
  }
  function P() {
    l.autoplay && M.value > 1 && p.value[0] && (u.value = false, q(), console.log("Carousel Start"));
  }
  function q() {
    u.value || (n.value && be(n.value), n.value = xe(() => {
      o.value = true, l.effect === "slide" ? (X(t.value % (M.value * c.value) + c.value), w.value = w.value % M.value + 1) : A("left");
    }, l.interval));
  }
  function Z() {
    o.value || (o.value = true, n.value && be(n.value), l.effect === "slide" ? (ie((w.value + M.value - 2) % M.value * c.value), w.value = w.value - 1 > 0 ? w.value - 1 : M.value) : A("right"));
  }
  function U() {
    o.value || (o.value = true, n.value && be(n.value), l.effect === "slide" ? (X(w.value * c.value), w.value = w.value % M.value + 1) : A("left"));
  }
  watch(w, (j) => {
    x("change", j);
  }), Ie2(document, "visibilitychange", function() {
    console.log("visibilityState", document.visibilityState), document.visibilityState === "hidden" ? (n.value && be(n.value), t.value = J.value + Q.value, o.value = false) : P();
  }), je2(h2, () => {
    m.value = h2.value.offsetWidth, g.value = h2.value.offsetHeight, C();
  });
  const le = ref(0), J = ref(0), Q = ref(0), R = useTransition(le, { duration: l.slideDuration, transition: l.slideFunction });
  function A(j, pe) {
    w.value = j === "left" ? w.value % M.value + 1 : j === "right" ? w.value - 1 > 0 ? w.value - 1 : M.value : pe, xe(() => {
      o.value = false, l.autoplay && q();
    }, l.fadeDuration);
  }
  function H(j) {
    v.value = j, le.value = le.value ? 0 : 1, J.value = t.value, Q.value = j - J.value;
  }
  function re() {
    le.value ? t.value = J.value + Q.value * R.value : t.value = J.value + Q.value * (1 - R.value);
  }
  function V() {
    t.value >= v.value ? (o.value = false, l.autoplay && q()) : (re(), f.value = requestAnimationFrame(V));
  }
  function X(j) {
    t.value === M.value * c.value && (t.value = 0), H(j), f.value = requestAnimationFrame(V);
  }
  function ne() {
    t.value <= v.value ? (o.value = false, l.autoplay && q()) : (re(), f.value = requestAnimationFrame(ne));
  }
  function ie(j) {
    t.value === 0 && (t.value = M.value * c.value), H(j), f.value = requestAnimationFrame(ne);
  }
  function de(j) {
    !o.value && w.value !== j && (o.value = true, n.value && be(n.value), j < w.value && (l.effect === "slide" ? (ie((j - 1) * c.value), w.value = j) : A("switch", j)), j > w.value && (l.effect === "slide" ? (X((j - 1) * c.value), w.value = j) : A("switch", j)));
  }
  function Me2(j) {
    x("click", j);
  }
  return a({ to: function(j) {
    j >= 1 && j <= M.value && de(j);
  }, prev: function() {
    Z();
  }, next: function() {
    U();
  }, getCurrentIndex: function() {
    return w.value;
  } }), (j, pe) => (openBlock(), createElementBlock("div", { ref_key: "carouselRef", ref: h2, class: normalizeClass(["m-carousel", { "carousel-vertical": y.value, "carousel-fade": j.effect === "fade" }]), style: normalizeStyle(`--arrow-color: ${j.arrowColor}; --dot-size: ${j.dotSize}px; --dot-color: ${j.dotColor}; --fade-duration: ${l.fadeDuration}ms; --fade-function: ${l.fadeFunction}; width: ${k.value}; height: ${z.value};`), onMouseenter: pe[2] || (pe[2] = (ye) => j.autoplay && j.pauseOnMouseEnter ? (n.value && be(n.value), u.value = true, void console.log("Carousel Stop")) : () => false), onMouseleave: pe[3] || (pe[3] = (ye) => j.autoplay && j.pauseOnMouseEnter ? P() : () => false) }, [createBaseVNode("div", { class: "m-carousel-flex", style: normalizeStyle($.value) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(j.images, (ye, _e2) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-image", { "image-fade-active": j.effect === "fade" && w.value === _e2 + 1 }]), onClick: (Ce2) => Me2(ye), key: _e2 }, [createVNode(unref(Be2), mergeProps({ spinning: !p.value[_e2], indicator: "dynamic-circle", ref_for: true }, j.spinProps), { default: withCtx(() => [(openBlock(), createElementBlock("img", { onLoad: (Ce2) => L(_e2), src: ye.src, key: ye.src, alt: ye.title, class: "u-image", style: normalizeStyle(`width: ${m.value}px; height: ${g.value}px;`) }, null, 44, Pt))]), _: 2 }, 1040, ["spinning"])], 10, It2))), 128)), M.value && j.effect === "slide" ? (openBlock(), createElementBlock("div", { key: 0, class: "m-image", onClick: pe[1] || (pe[1] = (ye) => Me2(j.images[0])) }, [createVNode(unref(Be2), mergeProps({ spinning: !p.value[0], indicator: "dynamic-circle" }, j.spinProps), { default: withCtx(() => [(openBlock(), createElementBlock("img", { onLoad: pe[0] || (pe[0] = (ye) => L(0)), src: j.images[0].src, key: j.images[0].src, alt: j.images[0].title, class: "u-image", style: normalizeStyle(`width: ${m.value}px; height: ${g.value}px;`) }, null, 44, Vt))]), _: 1 }, 16, ["spinning"])])) : createCommentVNode("", true)], 4), j.showArrow ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [(openBlock(), createElementBlock("svg", { tabindex: "0", class: "arrow-left", style: normalizeStyle(`width: ${j.arrowSize}px; height: ${j.arrowSize}px;`), onClick: Z, onKeydown: withModifiers(T, ["prevent"]), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, pe[4] || (pe[4] = [createBaseVNode("path", { d: "M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z" }, null, -1)]), 36)), (openBlock(), createElementBlock("svg", { tabindex: "0", class: "arrow-right", style: normalizeStyle(`width: ${j.arrowSize}px; height: ${j.arrowSize}px;`), onClick: U, onKeydown: withModifiers(T, ["prevent"]), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, pe[5] || (pe[5] = [createBaseVNode("path", { d: "M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z" }, null, -1)]), 36))], 64)) : createCommentVNode("", true), j.dots ? (openBlock(), createElementBlock("div", { key: 1, class: normalizeClass(["m-switch", `switch-${j.dotPosition}`]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(M.value, (ye) => (openBlock(), createElementBlock("div", { tabindex: "0", class: "u-dot", style: normalizeStyle([j.dotStyle, w.value === ye ? { backgroundColor: j.dotActiveColor, ...j.dotActiveStyle } : {}]), key: ye, onClick: (_e2) => j.dotsTrigger === "click" ? de(ye) : () => false, onMouseenter: (_e2) => j.dotsTrigger === "hover" ? function(Ce2) {
    de(Ce2);
  }(ye) : () => false, onKeydown: withModifiers(T, ["prevent"]) }, null, 44, Rt2))), 128))], 2)) : createCommentVNode("", true)], 38));
} });
var la = N(jt, [["__scopeId", "data-v-7a3c9527"]]);
la.install = (d) => {
  d.component(la.__name, la);
};
var Wt = ["src"];
var Nt = { key: 1, class: "empty-footer" };
var Ee = N(defineComponent({ __name: "Empty", props: { description: { default: "暂无数据" }, descriptionStyle: { default: () => ({}) }, image: { default: "filled" }, imageStyle: { default: () => ({}) }, footer: { default: void 0 } }, setup(d) {
  const a = d, e = he(["default", "description", "footer"]), l = computed(() => e.description || a.description), t = computed(() => e.footer || a.footer);
  return (n, u) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-empty", { "empty-image-outlined": n.image === "outlined" }]) }, [createBaseVNode("div", { class: "m-empty-image", style: normalizeStyle(n.imageStyle) }, [unref(e).default ? renderSlot(n.$slots, "default", { key: 0 }, void 0, true) : n.image === "filled" ? (openBlock(), createElementBlock("svg", { key: 1, class: "empty-filled", style: normalizeStyle(n.imageStyle), viewBox: "0 0 184 152", xmlns: "http://www.w3.org/2000/svg" }, u[0] || (u[0] = [createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-e135a472><g transform="translate(24 31.67)" data-v-e135a472><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-e135a472></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-e135a472></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-e135a472></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-e135a472></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-e135a472></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-e135a472></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-e135a472><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-e135a472></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-e135a472></path></g></g>', 1)]), 4)) : n.image === "outlined" ? (openBlock(), createElementBlock("svg", { key: 2, class: "empty-outlined", style: normalizeStyle(n.imageStyle), viewBox: "0 0 64 41", xmlns: "http://www.w3.org/2000/svg" }, u[1] || (u[1] = [createStaticVNode('<g transform="translate(0 1)" fill="none" fill-rule="evenodd" data-v-e135a472><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" data-v-e135a472></ellipse><g fill-rule="nonzero" stroke="#d9d9d9" data-v-e135a472><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" data-v-e135a472></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" data-v-e135a472></path></g></g>', 1)]), 4)) : n.image ? (openBlock(), createElementBlock("img", { key: 3, class: "empty-image", src: n.image, alt: "empty" }, null, 8, Wt)) : createCommentVNode("", true)], 4), l.value ? (openBlock(), createElementBlock("p", { key: 0, class: "empty-description", style: normalizeStyle(n.descriptionStyle) }, [renderSlot(n.$slots, "description", {}, () => [createTextVNode(toDisplayString(n.description), 1)], true)], 4)) : createCommentVNode("", true), t.value ? (openBlock(), createElementBlock("div", Nt, [renderSlot(n.$slots, "footer", {}, () => [createTextVNode(toDisplayString(n.footer), 1)], true)])) : createCommentVNode("", true)], 2));
} }), [["__scopeId", "data-v-e135a472"]]);
Ee.install = (d) => {
  d.component(Ee.__name, Ee);
};
var Te = N(defineComponent({ __name: "Scrollbar", props: { contentClass: { default: void 0 }, contentStyle: { default: () => ({}) }, size: { default: 5 }, trigger: { default: "hover" }, autoHide: { type: Boolean, default: true }, delay: { default: 1e3 }, horizontal: { type: Boolean, default: false } }, emits: ["scroll"], setup(d, { expose: a, emit: e }) {
  const l = d, t = ref(), n = ref(), u = ref(), o = ref(), f = ref(), v = ref(false), h2 = ref(0), w = ref(0), m = ref(0), g = ref(0), p = ref(0), k = ref(0), z = ref(0), M = ref(0), y = ref(0), c = ref(0), $ = ref(0), x = ref(0), C = ref(false), L = ref(false), T = ref(false), P = ref(0), q = ref(0), Z = ref(0), U = ref(0), le = { width: "fit-content" }, J = ref(false), Q = ref(false), R = e, A = computed(() => l.trigger === "hover" && l.autoHide), H = computed(() => h2.value > m.value), re = computed(() => w.value > g.value), V = computed(() => H.value || l.horizontal && re.value), X = computed(() => {
    if (H.value && p.value && z.value && y.value) {
      const ce = Math.min(p.value, y.value * p.value / z.value + 1.5 * l.size);
      return Number(ce.toFixed(4));
    }
    return 0;
  }), ne = computed(() => p.value && z.value && y.value ? $.value / (z.value - p.value) * (y.value - X.value) : 0), ie = computed(() => {
    if (l.horizontal && re.value && k.value && M.value && c.value) {
      const ce = c.value * k.value / M.value + 1.5 * l.size;
      return Number(ce.toFixed(4));
    }
    return 0;
  }), de = computed(() => k.value && M.value && c.value ? x.value / (M.value - k.value) * (c.value - ie.value) : 0);
  Ie2(window, "resize", pe), Ka2(t, pe, { childList: true, attributes: true, subtree: true });
  const Me2 = Tl2(function() {
    J.value || (v.value = false);
  }, l.delay);
  function j() {
    $.value = n.value.scrollTop, x.value = n.value.scrollLeft;
  }
  function pe() {
    j(), h2.value = n.value.scrollHeight, w.value = n.value.scrollWidth, m.value = n.value.clientHeight, g.value = n.value.clientWidth, p.value = n.value.offsetHeight, k.value = n.value.offsetWidth, z.value = u.value.offsetHeight, M.value = u.value.offsetWidth, y.value = o.value.offsetHeight, c.value = f.value.offsetWidth;
  }
  function ye(ce) {
    A.value && (v.value = true, L.value || C.value || Me2()), R("scroll", ce), j();
  }
  function _e2() {
    J.value = true;
  }
  function Ce2() {
    L.value || C.value ? Q.value = true : (J.value = false, Me2());
  }
  function Fe(ce) {
    C.value = true, P.value = $.value, Z.value = ce.clientY, window.onmousemove = (fe) => {
      const Se2 = (fe.clientY - Z.value) * (z.value - p.value) / (p.value - X.value), Ya2 = z.value - p.value;
      let Le = P.value + Se2;
      Le = Math.min(Ya2, Le), Le = Math.max(Le, 0), n.value.scrollTop = Le;
    }, window.onmouseup = () => {
      window.onmousemove = null, C.value = false, l.trigger === "hover" && T.value && (v.value = false, T.value = false), A.value && Q.value && (Q.value = false, J.value = false, Me2());
    };
  }
  function Pe2(ce) {
    L.value = true, q.value = x.value, U.value = ce.clientX, window.onmousemove = (fe) => {
      const Se2 = (fe.clientX - U.value) * (M.value - k.value) / (k.value - ie.value), Ya2 = M.value - k.value;
      let Le = q.value + Se2;
      Le = Math.min(Ya2, Le), Le = Math.max(Le, 0), n.value.scrollLeft = Le;
    }, window.onmouseup = () => {
      window.onmousemove = null, L.value = false, l.trigger === "hover" && T.value && (v.value = false, T.value = false), A.value && Q.value && (Q.value = false, J.value = false, Me2());
    };
  }
  return onMounted(() => {
    pe();
  }), a({ scrollTo: function(...ce) {
    var fe;
    (fe = n.value) == null || fe.scrollTo(...ce);
  }, scrollBy: function(...ce) {
    var fe;
    (fe = n.value) == null || fe.scrollBy(...ce);
  } }), (ce, fe) => (openBlock(), createElementBlock("div", { ref_key: "scrollbarRef", ref: t, class: "m-scrollbar", style: normalizeStyle(`--scrollbar-size: ${ce.size}px;`), onMouseenter: fe[4] || (fe[4] = (Se2) => V.value && ce.trigger === "hover" ? void (L.value || C.value ? T.value = false : A.value || (v.value = true)) : () => false), onMouseleave: fe[5] || (fe[5] = (Se2) => V.value && ce.trigger === "hover" ? void (L.value || C.value ? T.value = true : A.value || (v.value = false)) : () => false) }, [createBaseVNode("div", { ref_key: "containerRef", ref: n, class: "scrollbar-container", onScroll: ye }, [createBaseVNode("div", { ref_key: "contentRef", ref: u, class: normalizeClass(["scrollbar-content", ce.contentClass]), style: normalizeStyle([ce.horizontal ? { ...le, ...ce.contentStyle } : ce.contentStyle]) }, [renderSlot(ce.$slots, "default", {}, void 0, true)], 6)], 544), createBaseVNode("div", { ref_key: "railVerticalRef", ref: o, class: "scrollbar-rail rail-vertical" }, [createBaseVNode("div", { class: normalizeClass(["scrollbar-track", { "track-visible": ce.trigger === "none" || v.value }]), style: normalizeStyle(`top: ${ne.value}px; height: ${X.value}px;`), onMouseenter: fe[0] || (fe[0] = (Se2) => A.value ? _e2() : () => false), onMouseleave: fe[1] || (fe[1] = (Se2) => A.value ? Ce2() : () => false), onMousedown: withModifiers(Fe, ["prevent", "stop"]) }, null, 38)], 512), withDirectives(createBaseVNode("div", { ref_key: "railHorizontalRef", ref: f, class: "scrollbar-rail rail-horizontal" }, [createBaseVNode("div", { class: normalizeClass(["scrollbar-track", { "track-visible": ce.trigger === "none" || v.value }]), style: normalizeStyle(`left: ${de.value}px; width: ${ie.value}px;`), onMouseenter: fe[2] || (fe[2] = (Se2) => A.value ? _e2() : () => false), onMouseleave: fe[3] || (fe[3] = (Se2) => A.value ? Ce2() : () => false), onMousedown: withModifiers(Pe2, ["prevent", "stop"]) }, null, 38)], 512), [[vShow, ce.horizontal]])], 36));
} }), [["__scopeId", "data-v-f356992d"]]);
Te.install = (d) => {
  d.component(Te.__name, Te);
};
var qt2 = { class: "m-select-search" };
var Ot = ["readonly", "disabled"];
var Kt = ["title"];
var Yt2 = ["title", "onMouseenter", "onClick"];
var Ut2 = defineComponent({ __name: "Select", props: { options: { default: () => [] }, label: { default: "label" }, value: { default: "value" }, placeholder: { default: "请选择" }, disabled: { type: Boolean, default: false }, allowClear: { type: Boolean, default: false }, search: { type: Boolean, default: false }, filter: { type: [Function, Boolean], default: true }, width: { default: "auto" }, height: { default: 32 }, maxDisplay: { default: 6 }, scrollbarProps: { default: () => ({}) }, modelValue: { default: null } }, emits: ["update:modelValue", "change"], setup(d, { emit: a }) {
  const e = d, l = ref(), t = ref(), n = ref(), u = ref(), o = ref(false), f = ref(false), v = ref(), h2 = ref(false), w = ref(true), m = ref(false), g = ref(false), p = ref(false), k = ref(false), z = computed(() => typeof e.width == "number" ? e.width + "px" : e.width);
  function M() {
    o.value = true, e.allowClear && (t.value || e.search && u.value) && (w.value = false, m.value = true, e.search && (p.value = false));
  }
  function y() {
    o.value = false, e.allowClear && m.value && (m.value = false, e.search || (w.value = true)), e.search && (h2.value ? (p.value = true, w.value = false) : (p.value = false, w.value = true));
  }
  function c(L) {
    var T;
    f.value = !!((T = L.target) != null && T.value);
  }
  watchEffect(() => {
    e.search ? (u.value ? (h2.value = true, l.value = e.options.filter((L) => typeof e.filter == "function" ? e.filter(u.value, L) : L[e.label].includes(u.value))) : l.value = [...e.options], l.value.length && u.value ? v.value = l.value[0][e.value] : v.value = null) : l.value = e.options;
  }), watchEffect(() => {
    (function() {
      if (e.modelValue) {
        const L = e.options.find((T) => T[e.value] === e.modelValue);
        L ? (t.value = L[e.label], v.value = L[e.value]) : (t.value = e.modelValue, v.value = null);
      } else t.value = null, v.value = null;
    })();
  }), watch(h2, (L) => {
    e.search && !L && (u.value = void 0, f.value = false);
  });
  const $ = a;
  function x() {
    k.value && (C(), g.value = true), m.value = false, t.value = null, v.value = null, h2.value = false, p.value = false, w.value = true, $("update:modelValue"), $("change");
  }
  function C() {
    n.value.focus(), k.value = true;
  }
  return (L, T) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-select", { "select-focused": k.value, "search-select": L.search, "select-disabled": L.disabled }]), style: normalizeStyle(`width: ${z.value}; height: ${L.height}px;`), onClick: T[3] || (T[3] = (P) => L.disabled ? () => false : function() {
    if (C(), e.search || (n.value.style.opacity = 0), h2.value = !h2.value, !v.value && t.value) {
      const q = e.options.find((Z) => Z[e.label] === t.value);
      v.value = q ? q[e.value] : null;
    }
    e.search && (m.value || (w.value = !h2.value, p.value = h2.value));
  }()) }, [createBaseVNode("div", { class: "m-select-wrap", onMouseenter: M, onMouseleave: y }, [createBaseVNode("span", qt2, [withDirectives(createBaseVNode("input", { ref_key: "inputRef", ref: n, class: normalizeClass(["select-search", { "caret-show": h2.value || g.value }]), type: "text", autocomplete: "off", readonly: !L.search, disabled: L.disabled, onInput: c, "onUpdate:modelValue": T[0] || (T[0] = (P) => u.value = P), onBlur: T[1] || (T[1] = (P) => o.value || !h2.value || L.disabled ? () => false : (k.value = false, h2.value && (h2.value = false), void (e.search && (p.value = false, w.value = true, f.value = false)))) }, null, 42, Ot), [[vModelText, u.value]])]), f.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["select-item", { "select-placeholder": !t.value || h2.value }]), style: normalizeStyle(`line-height: ${L.height - 2}px;`), title: t.value }, toDisplayString(t.value || L.placeholder), 15, Kt)), (openBlock(), createElementBlock("svg", { class: normalizeClass(["arrow-svg", { "arrow-rotate": h2.value, show: w.value }]), focusable: "false", "data-icon": "down", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, T[4] || (T[4] = [createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1)]), 2)), (openBlock(), createElementBlock("svg", { class: normalizeClass(["search-svg", { show: p.value }]), focusable: "false", "data-icon": "search", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, T[5] || (T[5] = [createBaseVNode("path", { d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" }, null, -1)]), 2)), (openBlock(), createElementBlock("svg", { class: normalizeClass(["clear-svg", { show: m.value }]), focusable: "false", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", "fill-rule": "evenodd", viewBox: "64 64 896 896", onClick: withModifiers(x, ["stop"]) }, T[6] || (T[6] = [createBaseVNode("path", { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" }, null, -1)]), 2))], 32), createVNode(Transition, { name: "slide-up" }, { default: withCtx(() => [h2.value && l.value && l.value.length ? (openBlock(), createElementBlock("div", { key: 0, class: "m-options-panel", style: normalizeStyle(`top: ${L.height + 4}px;`), onMouseleave: T[2] || (T[2] = (P) => o.value = false) }, [createVNode(unref(Te), mergeProps({ "content-style": { padding: "4px" }, style: `max-height: ${L.maxDisplay * L.height}px;` }, L.scrollbarProps), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (P, q) => (openBlock(), createElementBlock("p", { key: q, class: normalizeClass(["select-option", { "option-hover": !P.disabled && P[L.value] === v.value, "option-selected": P[L.label] === t.value, "option-disabled": P.disabled }]), title: P[L.label], onMouseenter: (Z) => {
    return U = P[L.value], le = P.disabled, o.value = !!le, void (v.value = U);
    var U, le;
  }, onClick: withModifiers((Z) => P.disabled ? C() : function(U, le, J) {
    e.modelValue !== U && (t.value = le, v.value = U, $("update:modelValue", U), $("change", U, le, J)), g.value = false;
  }(P[L.value], P[L.label], q), ["stop"]) }, toDisplayString(P[L.label]), 43, Yt2))), 128))]), _: 1 }, 16, ["style"])], 36)) : h2.value && l.value && !l.value.length ? (openBlock(), createElementBlock("div", { key: 1, class: "options-empty", style: normalizeStyle(`top: ${L.height + 4}px; width: ${L.width}px;`) }, [createVNode(unref(Ee), { image: "outlined" })], 4)) : createCommentVNode("", true)]), _: 1 })], 6));
} });
var Ae = N(Ut2, [["__scopeId", "data-v-8dad8c19"]]);
Ae.install = (d) => {
  d.component(Ae.__name, Ae);
};
var Gt2 = defineComponent({ __name: "Cascader", props: { options: { default: () => [] }, label: { default: "label" }, value: { default: "value" }, children: { default: "children" }, placeholder: { default: "请选择" }, changeOnSelect: { type: Boolean, default: false }, gap: { default: 8 }, width: { default: "auto" }, height: { default: 32 }, disabled: { type: [Boolean, Array], default: false }, allowClear: { type: Boolean, default: false }, search: { type: Boolean, default: false }, filter: { type: [Function, Boolean], default: true }, maxDisplay: { default: 6 }, modelValue: { default: () => [] } }, emits: ["update:modelValue", "change"], setup(d, { emit: a }) {
  const e = d, l = ref([]), t = ref([]), n = ref([]), u = ref([]), o = ref([]);
  function f(p, k) {
    const z = p.length;
    for (let M = 0; M < z; M++) if (p[M][e.value] === l.value[k]) return p[M][e.children] || [];
    return [];
  }
  function v(p, k) {
    const z = p.length;
    for (let M = 0; M < z; M++) if (p[M][e.value] === l.value[k]) return p[M][e.label];
    return l.value[k];
  }
  watchEffect(() => {
    n.value = [...e.options];
  }), watchEffect(() => {
    l.value = [...e.modelValue];
  }), watchEffect(() => {
    var p;
    p = l.value, u.value = f(n.value, 0), o.value = [], p.length > 1 && (o.value = f(u.value, 1)), function(k) {
      t.value[0] = v(n.value, 0), k.length > 1 && (t.value[1] = v(u.value, 1)), k.length > 2 && (t.value[2] = v(o.value, 2));
    }(l.value);
  });
  const h2 = a;
  function w(p, k) {
    e.changeOnSelect ? (h2("update:modelValue", [p]), h2("change", [p], [k])) : (l.value = [p], t.value = [k]);
  }
  function m(p, k) {
    e.changeOnSelect ? (h2("update:modelValue", [l.value[0], p]), h2("change", [l.value[0], p], [t.value[0], k])) : (l.value = [l.value[0], p], t.value = [t.value[0], k]);
  }
  function g(p, k) {
    h2("update:modelValue", [...l.value.slice(0, 2), p]), h2("change", [...l.value.slice(0, 2), p], [...t.value.slice(0, 2), k]);
  }
  return (p, k) => (openBlock(), createElementBlock("div", { class: "m-cascader", style: normalizeStyle(`height: ${p.height}px; gap: ${p.gap}px;`) }, [createVNode(unref(Ae), { options: n.value, label: p.label, value: p.value, placeholder: Array.isArray(p.placeholder) ? p.placeholder[0] : p.placeholder, disabled: Array.isArray(p.disabled) ? p.disabled[0] : p.disabled, "allow-clear": p.allowClear, search: p.search, filter: p.filter, width: Array.isArray(p.width) ? p.width[0] : p.width, height: p.height, "max-display": p.maxDisplay, modelValue: l.value[0], "onUpdate:modelValue": k[0] || (k[0] = (z) => l.value[0] = z), onChange: w }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]), createVNode(unref(Ae), { options: u.value, label: p.label, value: p.value, placeholder: Array.isArray(p.placeholder) ? p.placeholder[1] : p.placeholder, disabled: Array.isArray(p.disabled) ? p.disabled[1] : p.disabled, "allow-clear": p.allowClear, search: p.search, filter: p.filter, width: Array.isArray(p.width) ? p.width[1] : p.width, height: p.height, "max-display": p.maxDisplay, modelValue: l.value[1], "onUpdate:modelValue": k[1] || (k[1] = (z) => l.value[1] = z), onChange: m }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]), createVNode(unref(Ae), { options: o.value, label: p.label, value: p.value, placeholder: Array.isArray(p.placeholder) ? p.placeholder[2] : p.placeholder, disabled: Array.isArray(p.disabled) ? p.disabled[2] : p.disabled, "allow-clear": p.allowClear, search: p.search, filter: p.filter, width: Array.isArray(p.width) ? p.width[2] : p.width, height: p.height, "max-display": p.maxDisplay, modelValue: l.value[2], "onUpdate:modelValue": k[2] || (k[2] = (z) => l.value[2] = z), onChange: g }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"])], 4));
} });
var ta2 = N(Gt2, [["__scopeId", "data-v-911a9276"]]);
ta2.install = (d) => {
  d.component(ta2.__name, ta2);
};
var Zt = ["onClick"];
var Xt2 = { class: "checkbox-label" };
var Qt = { key: 1, class: "m-checkbox-wrap" };
var Jt2 = { class: "checkbox-label" };
var e1 = defineComponent({ __name: "Checkbox", props: { options: { default: () => [] }, disabled: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, value: { default: () => [] }, gap: { default: 8 }, width: { default: "auto" }, height: { default: "auto" }, indeterminate: { type: Boolean, default: false }, checked: { type: Boolean, default: false } }, emits: ["update:value", "update:checked", "change"], setup(d, { emit: a }) {
  const e = d, l = computed(() => e.options.length), t = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), n = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), u = computed(() => e.vertical ? { marginBottom: e.gap + "px" } : { marginRight: e.gap + "px" }), o = ref([]);
  watchEffect(() => {
    o.value = e.value;
  });
  const f = a;
  function v() {
    f("update:checked", !e.checked);
  }
  return (h2, w) => (openBlock(), createElementBlock("div", { class: "m-checkbox", style: normalizeStyle(`max-width: ${t.value}; max-height: ${n.value};`) }, [l.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(h2.options, (m, g) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-checkbox-wrap", { "checkbox-vertical": h2.vertical }]), style: normalizeStyle(l.value !== g + 1 ? u.value : ""), key: g }, [createBaseVNode("div", { class: normalizeClass(["m-checkbox-box", { "checkbox-disabled": h2.disabled || m.disabled }]), onClick: (p) => h2.disabled || m.disabled ? () => false : function(k) {
    if (e.value.includes(k)) {
      const z = o.value.filter((M) => M !== k);
      f("update:value", z), f("change", z);
    } else {
      const z = [...o.value, k];
      f("update:value", z), f("change", z);
    }
  }(m.value) }, [createBaseVNode("span", { class: normalizeClass(["checkbox-box", { "checkbox-checked": o.value.includes(m.value) }]) }, null, 2), createBaseVNode("span", Xt2, [renderSlot(h2.$slots, "default", { label: m.label }, () => [createTextVNode(toDisplayString(m.label), 1)], true)])], 10, Zt)], 6))), 128)) : (openBlock(), createElementBlock("div", Qt, [createBaseVNode("div", { class: normalizeClass(["m-checkbox-box", { "checkbox-disabled": h2.disabled }]), onClick: v }, [createBaseVNode("span", { class: normalizeClass(["checkbox-box", { "checkbox-checked": h2.checked && !h2.indeterminate, indeterminate: h2.indeterminate }]) }, null, 2), createBaseVNode("span", Jt2, [renderSlot(h2.$slots, "default", {}, () => [w[0] || (w[0] = createTextVNode("Check all"))], true)])], 2)]))], 4));
} });
var oa = N(e1, [["__scopeId", "data-v-499c14da"]]);
oa.install = (d) => {
  d.component(oa.__name, oa);
};
var a1 = ["onClick", "onKeydown"];
var l1 = { class: "collapse-header" };
var t1 = { class: "collapse-extra" };
var o1 = { class: "collapse-lang" };
var s1 = defineComponent({ __name: "Collapse", props: { collapseData: { default: () => [] }, activeKey: { default: null }, disabled: { type: Boolean, default: false }, collapseStyle: { default: () => ({}) }, bordered: { type: Boolean, default: true }, copyable: { type: Boolean, default: false }, copyProps: { default: () => ({}) }, lang: { default: void 0 }, itemStyle: { default: () => ({}) }, headerStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) }, arrow: { default: void 0 }, showArrow: { type: Boolean, default: true }, arrowPlacement: { default: "left" }, arrowStyle: { default: () => ({}) }, extra: { default: void 0 }, ghost: { type: Boolean, default: false } }, emits: ["update:activeKey", "change"], setup(d, { emit: a }) {
  const e = d, l = ref();
  function t(w) {
    w.style.height = w.lastElementChild.offsetHeight + (e.bordered && !e.ghost ? 1 : 0) + "px", w.style.opacity = "1";
  }
  function n(w) {
    w.style.removeProperty("height"), w.style.removeProperty("opacity");
  }
  const u = a;
  function o(w) {
    u("update:activeKey", w), u("change", w);
  }
  function f(w) {
    v(w) ? Array.isArray(e.activeKey) ? o(e.activeKey.filter((m) => m !== w)) : o(null) : Array.isArray(e.activeKey) ? o([...e.activeKey, w]) : o(w);
  }
  function v(w) {
    return Array.isArray(e.activeKey) ? e.activeKey.includes(w) : e.activeKey === w;
  }
  const h2 = ref("Copy");
  return (w, m) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-collapse", { "collapse-borderless": !w.bordered, "collapse-arrow-right": w.arrowPlacement === "right", "collapse-ghost": w.ghost }]), style: normalizeStyle(w.collapseStyle) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(w.collapseData, (g, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-collapse-item", { "collapse-item-disabled": g.disabled === void 0 ? w.disabled : g.disabled }]), style: normalizeStyle(w.itemStyle), key: p }, [createBaseVNode("div", { tabindex: "0", class: normalizeClass(["m-collapse-header", { "collapse-header-no-arrow": g.showArrow !== void 0 ? !g.showArrow : !w.showArrow }]), style: normalizeStyle(w.headerStyle), onClick: (k) => (g.disabled === void 0 ? w.disabled : g.disabled) ? () => false : f(g.key || p), onKeydown: withKeys((k) => f(g.key || p), ["enter"]) }, [(g.showArrow !== void 0 ? g.showArrow : w.showArrow) ? (openBlock(), createElementBlock("div", { key: 0, class: "collapse-arrow", style: normalizeStyle(w.arrowStyle) }, [renderSlot(w.$slots, "arrow", { key: g.key || p, active: v(g.key || p) }, () => [(openBlock(), createElementBlock("svg", { class: normalizeClass(["arrow-svg", { "arrow-rotate": v(g.key || p) }]), focusable: "false", "data-icon": "right", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, m[0] || (m[0] = [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1)]), 2))], true)], 4)) : createCommentVNode("", true), createBaseVNode("div", l1, [renderSlot(w.$slots, "header", { header: g.header, key: g.key || p, active: v(g.key || p) }, () => [createTextVNode(toDisplayString(g.header || "--"), 1)], true)]), createBaseVNode("div", t1, [renderSlot(w.$slots, "extra", { extra: g.extra, key: g.key || p, active: v(g.key || p) }, () => [createTextVNode(toDisplayString(g.extra || w.extra), 1)], true)])], 46, a1), createVNode(Transition, { name: "collapse", onEnter: t, onAfterEnter: n, onLeave: t, onAfterLeave: n }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-collapse-content", { "collapse-copyable": w.copyable }]) }, [createBaseVNode("div", o1, [renderSlot(w.$slots, "lang", { lang: w.lang, key: g.key || p, active: v(g.key || p) }, () => [createTextVNode(toDisplayString(w.lang), 1)], true)]), createVNode(unref($e), mergeProps({ class: "collapse-copy", size: "small", type: "primary", onClick: (k) => function(z) {
    navigator.clipboard.writeText(l.value[z].innerText || "").then(() => {
      h2.value = "Copied", xe(() => {
        h2.value = "Copy";
      }, 3e3);
    }, (M) => {
      h2.value = M;
    });
  }(p), ref_for: true }, w.copyProps), { default: withCtx(() => [createTextVNode(toDisplayString(h2.value), 1)]), _: 2 }, 1040, ["onClick"]), createBaseVNode("div", { ref_for: true, ref_key: "contentRef", ref: l, class: "collapse-content", style: normalizeStyle(w.contentStyle) }, [renderSlot(w.$slots, "content", { content: g.content, key: g.key || p, active: v(g.key || p) }, () => [createTextVNode(toDisplayString(g.content), 1)], true)], 4)], 2), [[vShow, v(g.key || p)]])]), _: 2 }, 1024)], 6))), 128))], 6));
} });
var sa2 = N(s1, [["__scopeId", "data-v-43a4ef15"]]);
sa2.install = (d) => {
  d.component(sa2.__name, sa2);
};
var i1 = { class: "m-countdown" };
var n1 = { class: "countdown-time" };
var u1 = { key: 0, class: "time-prefix" };
var d1 = { key: 0, class: "time-suffix" };
var ia = N(defineComponent({ __name: "Countdown", props: { title: { default: void 0 }, titleStyle: { default: () => ({}) }, prefix: { default: void 0 }, suffix: { default: void 0 }, finishedText: { default: void 0 }, future: { type: Boolean, default: true }, format: { default: "HH:mm:ss" }, value: { default: 0 }, valueStyle: { default: () => ({}) }, active: { type: Boolean, default: true } }, emits: ["finish"], setup(d, { expose: a, emit: e }) {
  const l = d, t = ref(0), n = ref(0), u = ref(null), o = e, f = he(["title", "prefix", "suffix"]), v = computed(() => f.title || l.title), h2 = computed(() => f.prefix || l.prefix), w = computed(() => f.suffix || l.suffix), m = computed(() => ({ showMillisecond: l.format.includes("SSS"), showYear: l.format.includes("Y"), showMonth: l.format.includes("M"), showDay: l.format.includes("D"), showHour: l.format.includes("H"), showMinute: l.format.includes("m"), showSecond: l.format.includes("s") }));
  function g() {
    Number.isFinite(l.value) ? (l.future ? l.value > Date.now() ? t.value = l.value : p() : l.value > 0 ? t.value = l.value + Date.now() : p(), n.value = t.value - Date.now(), (l.future || !l.future && l.active) && (u.value && cancelAnimationFrame(u.value), u.value = requestAnimationFrame(k))) : n.value = 0;
  }
  function p() {
    n.value = 0, o("finish");
  }
  function k() {
    t.value > Date.now() ? (n.value = t.value - Date.now(), u.value = requestAnimationFrame(k)) : p();
  }
  function z(y, c = 2) {
    return String(y).padStart(c, "0");
  }
  function M(y) {
    let c = l.format;
    if (m.value.showMillisecond) {
      var $ = y % 1e3;
      c = c.replace("SSS", z($, 3));
    }
    if (y = Math.floor(y / 1e3), m.value.showYear) {
      var x = Math.floor(y / 31104e3);
      c = c.includes("YY") ? c.replace("YY", z(x)) : c.replace("Y", String(x));
    } else x = 0;
    if (m.value.showMonth) {
      y -= 60 * x * 60 * 24 * 30 * 12;
      var C = Math.floor(y / 2592e3);
      c = c.includes("MM") ? c.replace("MM", z(C)) : c.replace("M", String(C));
    } else C = 0;
    if (m.value.showDay) {
      y -= 60 * C * 60 * 24 * 30;
      var L = Math.floor(y / 86400);
      c = c.includes("DD") ? c.replace("DD", z(L)) : c.replace("D", String(L));
    } else L = 0;
    if (m.value.showHour) {
      y -= 60 * L * 60 * 24;
      var T = Math.floor(y / 3600);
      c = c.includes("HH") ? c.replace("HH", z(T)) : c.replace("H", String(T));
    } else T = 0;
    if (m.value.showMinute) {
      y -= 60 * T * 60;
      var P = Math.floor(y / 60);
      c = c.includes("mm") ? c.replace("mm", z(P)) : c.replace("m", String(P));
    } else P = 0;
    if (m.value.showSecond) {
      var q = y - 60 * P;
      c = c.includes("ss") ? c.replace("ss", z(q)) : c.replace("s", String(q));
    }
    return c;
  }
  return watch(() => l.active, (y) => {
    l.future || (y ? (t.value = n.value + Date.now(), u.value = requestAnimationFrame(k)) : (u.value && cancelAnimationFrame(u.value), u.value = null));
  }), watch(() => [l.value, l.future], () => {
    g();
  }, { deep: true }), onMounted(() => {
    g();
  }), a({ reset: function() {
    g();
  } }), (y, c) => (openBlock(), createElementBlock("div", i1, [v.value ? (openBlock(), createElementBlock("div", { key: 0, class: "countdown-title", style: normalizeStyle(y.titleStyle) }, [renderSlot(y.$slots, "title", {}, () => [createTextVNode(toDisplayString(l.title), 1)], true)], 4)) : createCommentVNode("", true), createBaseVNode("div", n1, [h2.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [h2.value || n.value > 0 ? (openBlock(), createElementBlock("span", u1, [renderSlot(y.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(y.prefix), 1)], true)])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), y.finishedText && n.value === 0 ? (openBlock(), createElementBlock("span", { key: 1, class: "time-value", style: normalizeStyle(y.valueStyle) }, [renderSlot(y.$slots, "finish", {}, () => [createTextVNode(toDisplayString(y.finishedText), 1)], true)], 4)) : (openBlock(), createElementBlock("span", { key: 2, class: "time-value", style: normalizeStyle(y.valueStyle) }, toDisplayString(M(n.value)), 5)), w.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [w.value || n.value > 0 ? (openBlock(), createElementBlock("span", d1, [renderSlot(y.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(y.suffix), 1)], true)])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)])]));
} }), [["__scopeId", "data-v-8c5dfc0d"]]);
ia.install = (d) => {
  d.component(ia.__name, ia);
};
var na = N(defineComponent({ inheritAttrs: false, __name: "DatePicker", props: { width: { default: 180 }, mode: { default: "date" }, showTime: { type: Boolean, default: false }, showToday: { type: Boolean, default: false }, modelType: { default: "format" } }, setup(d) {
  const a = d, e = computed(() => a.mode === "time"), l = computed(() => a.mode === "week"), t = computed(() => a.mode === "month"), n = computed(() => a.mode === "year");
  return (u, o) => (openBlock(), createElementBlock("div", { class: "m-datepicker", style: normalizeStyle(`width: ${u.width}px;`) }, [createVNode(unref(Vn), mergeProps({ locale: "zh-CN", "month-change-on-scroll": false, "enable-time-picker": u.showTime, "time-picker": e.value, "week-picker": l.value, "month-picker": t.value, "year-picker": n.value, "now-button-label": "今天", "show-now-button": u.showToday, "auto-apply": "", "text-input": "", "model-type": u.modelType, "day-names": ["一", "二", "三", "四", "五", "六", "七"] }, u.$attrs), null, 16, ["enable-time-picker", "time-picker", "week-picker", "month-picker", "year-picker", "show-now-button", "model-type"])], 4));
} }), [["__scopeId", "data-v-3d9bfb6f"]]);
na.install = (d) => {
  d.component(na.__name, na);
};
var r1 = { key: 0, class: "m-descriptions-header" };
var c1 = { class: "descriptions-title" };
var v1 = { class: "descriptions-extra" };
var p1 = { key: 0 };
var f1 = ["colspan"];
var h1 = { key: 1 };
var m1 = { key: 0 };
var g1 = ["colspan"];
var y1 = ["colspan"];
var b1 = { key: 1 };
var w1 = defineComponent({ __name: "Descriptions", props: { title: { default: void 0 }, extra: { default: void 0 }, bordered: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, size: { default: "default" }, column: { default: () => ({ xs: 1, sm: 2, md: 3 }) }, labelStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) } }, setup(d) {
  const a = d, e = ref(), l = ref(true), t = ref(), n = ref(true), u = ref(), o = ref(), f = ref(), v = ref(), h2 = ref(), w = ref(), m = ref(), g = ref([]), p = ref(window.innerWidth);
  Ie2(window, "resize", function() {
    p.value = window.innerWidth;
  });
  const k = he(["title", "extra"]), z = computed(() => k.title || k.extra || a.title || a.extra), M = computed(() => typeof a.column == "object" ? p.value >= 1600 && a.column.xxl ? a.column.xxl : p.value >= 1200 && a.column.xl ? a.column.xl : p.value >= 992 && a.column.lg ? a.column.lg : p.value >= 768 && a.column.md ? a.column.md : p.value >= 576 && a.column.sm ? a.column.sm : p.value < 576 && a.column.xs ? a.column.xs : 1 : a.column);
  async function y() {
    l.value = !l.value, await nextTick(), $();
  }
  function c(C) {
    return C.reduce((L, T) => L + T.span, 0);
  }
  async function $() {
    if (u.value = Array.from(e.value.children).filter((C) => C.className === (a.bordered ? "descriptions-item-bordered" : "descriptions-item")), g.value.length && (g.value.splice(0), await nextTick()), u.value && u.value.length) {
      const C = u.value.length;
      let L = [];
      for (let T = 0; T < C; T++) {
        const P = { span: Math.min(u.value[T].dataset.span ?? 1, M.value), element: u.value[T] };
        c(L) < M.value ? (P.span = Math.min(P.span, M.value - c(L)), L.push(P)) : (g.value.push(L), L = [P]);
      }
      if (!a.vertical && !u.value[C - 1].dataset.span && c(L) < M.value) {
        const T = L.length;
        L[T - 1].span = L[T - 1].span + M.value - c(L);
      }
      g.value.push(L), await nextTick(), async function() {
        a.bordered ? g.value.forEach((T, P) => {
          T.forEach((q) => {
            const Z = Array.from(q.element.children), U = Z[0];
            x(U, a.labelStyle);
            const le = Z[1];
            x(le, a.contentStyle), a.vertical ? (U.colSpan = q.span, le.colSpan = q.span, w.value[P].appendChild(U), m.value[P].appendChild(le)) : (U.colSpan = 1, le.colSpan = 2 * q.span - 1, h2.value[P].appendChild(U), h2.value[P].appendChild(le));
          });
        }) : u.value.forEach((T, P) => {
          const q = Array.from(T.children);
          x(q[0], a.labelStyle), x(q[1], a.contentStyle), a.vertical ? (f.value[P].appendChild(T.firstChild), v.value[P].appendChild(T.lastChild)) : o.value[P].appendChild(T);
        }), await nextTick(), n.value = false;
      }();
    } else n.value = false;
  }
  function x(C, L) {
    JSON.stringify(L) !== "{}" && Object.keys(L).forEach((T) => {
      C.style[T] || (C.style[T] = L[T]);
    });
  }
  return watch(() => [a.bordered, a.vertical, M.value, a.labelStyle, a.contentStyle], () => {
    n.value || (n.value = true), y();
  }, { deep: true }), t.value = Ka2(e, (C) => {
    n.value || (n.value = true, C.some((L) => L.type === "childList") && y());
  }, { childList: true, attributes: true, subtree: true }), onMounted(() => {
    $();
  }), (C, L) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-descriptions", `descriptions-${C.size}`]) }, [z.value ? (openBlock(), createElementBlock("div", r1, [createBaseVNode("div", c1, [renderSlot(C.$slots, "title", {}, () => [createTextVNode(toDisplayString(C.title), 1)], true)]), createBaseVNode("div", v1, [renderSlot(C.$slots, "extra", {}, () => [createTextVNode(toDisplayString(C.extra), 1)], true)])])) : createCommentVNode("", true), C.vertical ? (openBlock(), createElementBlock("div", { key: 2, class: normalizeClass(["m-descriptions-view", { "descriptions-bordered": C.bordered }]) }, [createBaseVNode("table", null, [C.bordered ? (openBlock(), createElementBlock("tbody", b1, [(openBlock(true), createElementBlock(Fragment, null, renderList(g.value.length, (T) => (openBlock(), createElementBlock(Fragment, { key: T }, [createBaseVNode("tr", { ref_for: true, ref_key: "thVerticalBorderedRows", ref: w, class: "descriptions-bordered-tr" }, null, 512), createBaseVNode("tr", { ref_for: true, ref_key: "tdVerticalBorderedRows", ref: m, class: "descriptions-bordered-tr" }, null, 512)], 64))), 128))])) : (openBlock(), createElementBlock("tbody", m1, [(openBlock(true), createElementBlock(Fragment, null, renderList(g.value, (T, P) => (openBlock(), createElementBlock(Fragment, { key: P }, [createBaseVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(T, (q, Z) => (openBlock(), createElementBlock("th", { class: "descriptions-item-th", colspan: q.span, key: Z }, [createBaseVNode("div", { ref_for: true, ref_key: "thVerticalCols", ref: f, class: "descriptions-item" }, null, 512)], 8, g1))), 128))]), createBaseVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(T, (q, Z) => (openBlock(), createElementBlock("td", { class: "descriptions-item-td", colspan: q.span, key: Z }, [createBaseVNode("div", { ref_for: true, ref_key: "tdVerticalCols", ref: v, class: "descriptions-item" }, null, 512)], 8, y1))), 128))])], 64))), 128))]))])], 2)) : (openBlock(), createElementBlock("div", { key: 1, class: normalizeClass(["m-descriptions-view", { "descriptions-bordered": C.bordered }]) }, [createBaseVNode("table", null, [C.bordered ? (openBlock(), createElementBlock("tbody", h1, [(openBlock(true), createElementBlock(Fragment, null, renderList(g.value.length, (T) => (openBlock(), createElementBlock("tr", { ref_for: true, ref_key: "trBorderedRows", ref: h2, class: "descriptions-bordered-tr", key: T }))), 128))])) : (openBlock(), createElementBlock("tbody", p1, [(openBlock(true), createElementBlock(Fragment, null, renderList(g.value, (T, P) => (openBlock(), createElementBlock("tr", { key: P }, [(openBlock(true), createElementBlock(Fragment, null, renderList(T, (q, Z) => (openBlock(), createElementBlock("td", { ref_for: true, ref_key: "tdCols", ref: o, class: "descriptions-item-td", colspan: q.span, key: Z }, null, 8, f1))), 128))]))), 128))]))])], 2)), withDirectives(createBaseVNode("div", { ref_key: "defaultSlotsRef", ref: e }, [l.value ? renderSlot(C.$slots, "default", { key: 0 }, void 0, true) : renderSlot(C.$slots, "default", { key: 1 }, void 0, true)], 512), [[vShow, false]])], 2));
} });
var sl = N(w1, [["__scopeId", "data-v-b297c5c9"]]);
var k1 = ["data-span"];
var x1 = ["data-span"];
var il = N(defineComponent({ __name: "DescriptionsItem", props: { label: { default: void 0 }, span: { default: void 0 }, labelStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) } }, setup: (d) => (a, e) => (openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", { class: "descriptions-item", "data-span": a.span }, [createBaseVNode("span", { class: "descriptions-label", style: normalizeStyle(a.labelStyle) }, [renderSlot(a.$slots, "label", {}, () => [createTextVNode(toDisplayString(a.label), 1)], true)], 4), createBaseVNode("span", { class: "descriptions-content", style: normalizeStyle(a.contentStyle) }, [renderSlot(a.$slots, "default", {}, void 0, true)], 4)], 8, k1), createBaseVNode("tr", { class: "descriptions-item-bordered", "data-span": a.span }, [createBaseVNode("th", { class: "descriptions-label-th", style: normalizeStyle(a.labelStyle) }, [renderSlot(a.$slots, "label", {}, () => [createTextVNode(toDisplayString(a.label), 1)], true)], 4), createBaseVNode("td", { class: "descriptions-content-td", style: normalizeStyle(a.contentStyle) }, [renderSlot(a.$slots, "default", {}, void 0, true)], 4)], 8, x1)], 64)) }), [["__scopeId", "data-v-7e38e589"]]);
[sl, il].forEach((d) => {
  d.install = (a) => {
    a.component(d.__name, d);
  };
});
var M1 = { class: "m-dialog-mask" };
var _1 = { class: "m-dialog-header" };
var C1 = { class: "dialog-head" };
var z1 = { focusable: "false", "data-icon": "fullscreen", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var $1 = { focusable: "false", "data-icon": "fullscreen-exit", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var B1 = { key: 1, class: "m-dialog-footer" };
var ua = N(defineComponent({ __name: "Dialog", props: { title: { default: void 0 }, content: { default: void 0 }, width: { default: 540 }, height: { default: "auto" }, cancelText: { default: "取消" }, cancelProps: { default: () => ({}) }, okText: { default: "确定" }, okType: { default: "primary" }, okProps: { default: () => ({}) }, bodyStyle: { default: () => ({}) }, footer: { type: Boolean, default: true }, centered: { type: Boolean, default: true }, top: { default: 100 }, switchFullscreen: { type: Boolean, default: false }, loading: { type: Boolean, default: false }, show: { type: Boolean, default: false } }, emits: ["update:show", "cancel", "ok"], setup(d, { emit: a }) {
  const e = d, l = ref(false), t = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), n = computed(() => ({ width: l.value ? "100%" : e.width + "px", top: e.centered ? "50%" : l.value ? 0 : typeof e.top == "number" ? e.top + "px" : e.top })), u = ref();
  watch(() => e.show, (g) => {
    g && (nextTick(() => {
      u.value.focus();
    }), l.value = false);
  });
  const o = a;
  function f() {
    o("update:show", false), o("cancel");
  }
  function v() {
    l.value = !l.value;
  }
  function h2() {
    o("update:show", false), o("cancel");
  }
  function w() {
    o("update:show", false), o("cancel");
  }
  function m() {
    o("ok");
  }
  return (g, p) => (openBlock(), createElementBlock("div", null, [createVNode(Transition, { name: "fade" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", M1, null, 512), [[vShow, g.show]])]), _: 1 }), createVNode(Transition, { name: "zoom" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { ref_key: "dialogRef", ref: u, tabindex: "-1", class: "m-dialog-wrap", onClick: withModifiers(f, ["self"]), onKeydown: withKeys(h2, ["esc"]) }, [createBaseVNode("div", { class: normalizeClass(["m-dialog", [g.centered ? "horizontal-vertical-centered" : "fix-height-centered"]]), style: normalizeStyle(n.value) }, [createBaseVNode("div", { class: "m-dialog-content", style: normalizeStyle(`--height: ${l.value ? "100vh" : t.value}`) }, [createBaseVNode("div", _1, [createBaseVNode("p", C1, [renderSlot(g.$slots, "title", {}, () => [createTextVNode(toDisplayString(g.title), 1)], true)])]), g.switchFullscreen ? (openBlock(), createElementBlock("span", { key: 0, class: "m-fullscreen-action", onClick: v }, [withDirectives((openBlock(), createElementBlock("svg", z1, p[0] || (p[0] = [createBaseVNode("path", { d: "M290 236.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0013.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 000 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 00-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z" }, null, -1)]), 512)), [[vShow, !l.value]]), withDirectives((openBlock(), createElementBlock("svg", $1, p[1] || (p[1] = [createBaseVNode("path", { d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 000 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 00391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 00-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z" }, null, -1)]), 512)), [[vShow, l.value]])])) : createCommentVNode("", true), createBaseVNode("span", { class: "m-close-action", onClick: h2 }, p[2] || (p[2] = [createBaseVNode("svg", { width: "1em", height: "1em", fill: "currentColor", viewBox: "64 64 896 896", "data-icon": "close", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1)])), createBaseVNode("div", { class: "m-dialog-body", style: normalizeStyle(g.bodyStyle) }, [renderSlot(g.$slots, "default", {}, () => [createTextVNode(toDisplayString(g.content), 1)], true)], 4), g.footer ? (openBlock(), createElementBlock("div", B1, [renderSlot(g.$slots, "footer", {}, () => [createVNode(unref($e), mergeProps({ class: "mr8", onClick: w }, g.cancelProps), { default: withCtx(() => [createTextVNode(toDisplayString(g.cancelText), 1)]), _: 1 }, 16), createVNode(unref($e), mergeProps({ type: g.okType, loading: g.loading, onClick: m }, g.okProps), { default: withCtx(() => [createTextVNode(toDisplayString(g.okText), 1)]), _: 1 }, 16, ["type", "loading"])], true)])) : createCommentVNode("", true)], 4)], 6)], 544), [[vShow, g.show]])]), _: 3 })]));
} }), [["__scopeId", "data-v-bfa0dc7b"]]);
ua.install = (d) => {
  d.component(ua.__name, ua);
};
var S1 = { key: 0, class: "divider-text" };
var da2 = N(defineComponent({ __name: "Divider", props: { orientation: { default: "center" }, orientationMargin: { default: void 0 }, borderWidth: { default: 1 }, borderStyle: { default: "solid" }, borderColor: { default: "rgba(5, 5, 5, 0.06)" }, vertical: { type: Boolean, default: false }, height: { default: "0.9em" } }, setup(d) {
  const a = d, e = computed(() => typeof a.orientationMargin == "number" ? a.orientationMargin + "px" : a.orientationMargin), l = computed(() => typeof a.height == "number" ? a.height + "px" : a.height), t = he(["default"]), n = computed(() => t.default);
  return (u, o) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-divider", [u.vertical ? "divider-vertical" : "divider-horizontal", { "divider-with-text": n.value, "divider-with-text-center": n.value && u.orientation === "center", "divider-with-text-left": n.value && u.orientation === "left", "divider-with-text-right": n.value && u.orientation === "right", "divider-orientation-margin-left": n.value && u.orientation === "left" && u.orientationMargin !== void 0, "divider-orientation-margin-right": n.value && u.orientation === "right" && u.orientationMargin !== void 0 }]]), style: normalizeStyle(`--border-width: ${u.borderWidth}px; --border-style: ${u.borderStyle}; --border-color: ${u.borderColor}; --margin: ${e.value}; --line-height: ${l.value};`) }, [n.value ? (openBlock(), createElementBlock("span", S1, [renderSlot(u.$slots, "default", {}, void 0, true)])) : createCommentVNode("", true)], 6));
} }), [["__scopeId", "data-v-71c0ad06"]]);
da2.install = (d) => {
  d.component(da2.__name, da2);
};
var L1 = { class: "m-drawer-content" };
var F1 = { key: 0, class: "m-drawer-body-wrapper" };
var A1 = { class: "m-header-title" };
var D1 = { key: 1, class: "header-title" };
var E1 = { key: 0, class: "header-extra" };
var T1 = { key: 1, class: "m-drawer-body-wrapper" };
var H1 = { class: "m-header-title" };
var I1 = { key: 1, class: "header-title" };
var P1 = { key: 0, class: "header-extra" };
var ra = N(defineComponent({ __name: "Drawer", props: { width: { default: 378 }, height: { default: 378 }, title: { default: void 0 }, closable: { type: Boolean, default: true }, placement: { default: "right" }, headerClass: { default: void 0 }, headerStyle: { default: () => ({}) }, scrollbarProps: { default: () => ({}) }, bodyClass: { default: void 0 }, bodyStyle: { default: () => ({}) }, extra: { default: void 0 }, footer: { default: void 0 }, footerClass: { default: void 0 }, footerStyle: { default: () => ({}) }, destroyOnClose: { type: Boolean, default: false }, zIndex: { default: 1e3 }, open: { type: Boolean, default: false } }, emits: ["update:open", "close"], setup(d, { emit: a }) {
  const e = d, l = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), t = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), n = computed(() => ["top", "bottom"].includes(e.placement) ? { zIndex: e.zIndex, height: t.value } : { zIndex: e.zIndex, width: l.value }), u = he(["title", "extra", "footer"]), o = computed(() => u.title || u.extra || e.title || e.extra || e.closable), f = computed(() => u.title || e.title), v = computed(() => u.extra || e.extra), h2 = computed(() => u.footer || e.footer), w = ref();
  watch(() => e.open, (k) => {
    k && nextTick(() => {
      w.value.focus();
    });
  });
  const m = a;
  function g(k) {
    m("update:open", false), m("close", k);
  }
  function p(k) {
    m("update:open", false), m("close", k);
  }
  return (k, z) => (openBlock(), createElementBlock("div", { ref_key: "drawerRef", ref: w, tabindex: "-1", class: "m-drawer", onKeydown: withKeys(p, ["esc"]) }, [createVNode(Transition, { name: "fade" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-drawer-mask", onClick: withModifiers(g, ["self"]) }, null, 512), [[vShow, k.open]])]), _: 1 }), createVNode(Transition, { name: `motion-${k.placement}` }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-drawer-wrap", `drawer-${k.placement}`]), style: normalizeStyle(n.value) }, [createBaseVNode("div", L1, [k.destroyOnClose ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", F1, [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-drawer-header", k.headerClass]), style: normalizeStyle(k.headerStyle) }, [createBaseVNode("div", A1, [k.closable ? (openBlock(), createElementBlock("svg", { key: 0, focusable: "false", class: "svg-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896", onClick: p }, z[0] || (z[0] = [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1)]))) : createCommentVNode("", true), f.value ? (openBlock(), createElementBlock("div", D1, [renderSlot(k.$slots, "title", {}, () => [createTextVNode(toDisplayString(k.title), 1)], true)])) : createCommentVNode("", true)]), v.value ? (openBlock(), createElementBlock("div", E1, [renderSlot(k.$slots, "extra", {}, () => [createTextVNode(toDisplayString(k.extra), 1)], true)])) : createCommentVNode("", true)], 6), [[vShow, o.value]]), createVNode(unref(Te), mergeProps({ "content-style": { height: "100%" } }, k.scrollbarProps), { default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(["m-drawer-body", k.bodyClass]), style: normalizeStyle(k.bodyStyle) }, [renderSlot(k.$slots, "default", {}, void 0, true)], 6)]), _: 3 }, 16), h2.value ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-drawer-footer", k.footerClass]), style: normalizeStyle(k.footerStyle) }, [renderSlot(k.$slots, "footer", {}, () => [createTextVNode(toDisplayString(k.footer), 1)], true)], 6)) : createCommentVNode("", true)])), k.destroyOnClose && k.open ? (openBlock(), createElementBlock("div", T1, [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-drawer-header", k.headerClass]), style: normalizeStyle(k.headerStyle) }, [createBaseVNode("div", H1, [k.closable ? (openBlock(), createElementBlock("svg", { key: 0, focusable: "false", class: "svg-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896", onClick: p }, z[1] || (z[1] = [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1)]))) : createCommentVNode("", true), f.value ? (openBlock(), createElementBlock("div", I1, [renderSlot(k.$slots, "title", {}, () => [createTextVNode(toDisplayString(k.title), 1)], true)])) : createCommentVNode("", true)]), v.value ? (openBlock(), createElementBlock("div", P1, [renderSlot(k.$slots, "extra", {}, () => [createTextVNode(toDisplayString(k.extra), 1)], true)])) : createCommentVNode("", true)], 6), [[vShow, o.value]]), createVNode(unref(Te), mergeProps({ "content-style": { height: "100%" } }, k.scrollbarProps), { default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(["m-drawer-body", k.bodyClass]), style: normalizeStyle(k.bodyStyle) }, [renderSlot(k.$slots, "default", {}, void 0, true)], 6)]), _: 3 }, 16), h2.value ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-drawer-footer", k.footerClass]), style: normalizeStyle(k.footerStyle) }, [renderSlot(k.$slots, "footer", {}, () => [createTextVNode(toDisplayString(k.footer), 1)], true)], 6)) : createCommentVNode("", true)])) : createCommentVNode("", true)])], 6), [[vShow, k.open]])]), _: 3 }, 8, ["name"])], 544));
} }), [["__scopeId", "data-v-f4428b98"]]);
ra.install = (d) => {
  d.component(ra.__name, ra);
};
var ca2 = N(defineComponent({ __name: "Ellipsis", props: { maxWidth: { default: "100%" }, line: { default: void 0 }, expand: { type: Boolean, default: false }, tooltip: { type: Boolean, default: true }, tooltipProps: { default: () => ({}) } }, emits: ["expandChange"], setup(d, { emit: a }) {
  const e = d, l = ref(false), t = ref(false), n = ref(), u = ref(false), o = ref(), f = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth);
  function v() {
    if (e.tooltip) {
      const m = n.value.scrollWidth, g = n.value.scrollHeight, p = n.value.clientWidth, k = n.value.clientHeight;
      m > p || g > k ? (o.value = n.value.offsetWidth + 24, e.expand && (t.value = true), l.value = true) : (e.expand && (t.value = false), l.value = false);
    }
  }
  watch(() => [e.maxWidth, e.line, e.tooltip], () => {
    v();
  }, { deep: true, flush: "post" }), je2(n, () => {
    u.value ? setTimeout(() => {
      u.value = false;
    }) : v();
  }), onMounted(() => {
    v();
  });
  const h2 = a;
  async function w() {
    n.value.style["-webkit-line-clamp"] ? (e.tooltip && l.value && (u.value = true, l.value = false, await nextTick()), n.value.style.removeProperty("-webkit-line-clamp"), h2("expandChange", true)) : (e.tooltip && !l.value && (l.value = true), h2("expandChange", false));
  }
  return (m, g) => l.value ? (openBlock(), createBlock(unref(Ve), mergeProps({ key: 0, style: `max-width: ${f.value}`, "max-width": o.value, "content-style": { maxWidth: f.value }, "tooltip-style": { padding: "8px 12px", textAlign: "justify" } }, m.tooltipProps), { tooltip: withCtx(() => [renderSlot(m.$slots, "tooltip", {}, () => [renderSlot(m.$slots, "default", {}, void 0, true)], true)]), default: withCtx(() => [createBaseVNode("div", mergeProps({ ref_key: "ellipsisRef", ref: n, class: ["m-ellipsis", [m.line ? "ellipsis-line" : "not-ellipsis-line", { "ellipsis-cursor-pointer": t.value }]], style: `-webkit-line-clamp: ${m.line}; max-width: ${f.value};`, onClick: g[0] || (g[0] = (p) => t.value ? w() : () => false) }, m.$attrs), [renderSlot(m.$slots, "default", {}, void 0, true)], 16)]), _: 3 }, 16, ["style", "max-width", "content-style"])) : (openBlock(), createElementBlock("div", mergeProps({ key: 1, ref_key: "ellipsisRef", ref: n, class: ["m-ellipsis", [m.line ? "ellipsis-line" : "not-ellipsis-line", { "ellipsis-cursor-pointer": t.value }]], style: `-webkit-line-clamp: ${m.line}; max-width: ${f.value};`, onClick: g[1] || (g[1] = (p) => t.value ? w() : () => false) }, m.$attrs), [renderSlot(m.$slots, "default", {}, void 0, true)], 16));
} }), [["__scopeId", "data-v-5dc78c37"]]);
ca2.install = (d) => {
  d.component(ca2.__name, ca2);
};
var va2 = N(defineComponent({ __name: "Flex", props: { width: { default: "auto" }, vertical: { type: Boolean, default: false }, wrap: { default: "nowrap" }, justify: { default: "normal" }, align: { default: "normal" }, gap: { default: "middle" } }, setup(d) {
  const a = d, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), l = computed(() => {
    if (a.gap === void 0) return 0;
    if (typeof a.gap == "number") return a.gap + "px";
    if (Array.isArray(a.gap)) return a.gap[1] + "px " + a.gap[0] + "px ";
    if (["small", "middle", "large"].includes(a.gap))
      return { small: "8px", middle: "16px", large: "24px" }[a.gap];
  });
  return (t, n) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-flex", { "flex-vertical": t.vertical }]), style: normalizeStyle(`
      width: ${e.value};
      gap: ${l.value};
      margin-bottom: -${Array.isArray(a.gap) && t.wrap ? a.gap[1] : 0}px;
      --wrap: ${t.wrap};
      --justify: ${t.justify};
      --align: ${t.align};
    `) }, [renderSlot(t.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-a6483880"]]);
va2.install = (d) => {
  d.component(va2.__name, va2);
};
var V1 = { class: "m-float-button" };
var pa = N(defineComponent({ __name: "FloatButton", props: { icon: { default: void 0 }, description: { default: void 0 }, tooltip: { default: void 0 }, type: { default: "default" }, shape: { default: "circle" }, href: { default: void 0 }, target: { default: "_self" }, badge: { default: void 0 } }, emits: ["click"], setup: (d, { emit: a }) => (e, l) => (openBlock(), createElementBlock("span", V1)) }), [["__scopeId", "data-v-4f8b951d"]]);
pa.install = (d) => {
  d.component(pa.__name, pa);
};
var nl = ((d) => (d.primary = "rgba(22, 199, 255, 0.6)", d.info = "rgba(22, 199, 255, 0.6)", d.success = "rgba(82, 196, 26, 0.6)", d.warning = "rgba(250, 173, 20, 0.6)", d.error = "rgba(255, 77, 79, 0.6)", d))(nl || {});
var ul = ((d) => (d.primary = "#1677FF", d.info = "#1677FF", d.success = "#52c41a", d.warning = "#faad14", d.error = "#ff4d4f", d))(ul || {});
var fa2 = N(defineComponent({ __name: "GradientText", props: { gradient: { default: void 0 }, size: { default: 14 }, type: { default: "primary" } }, setup(d) {
  const a = d, e = computed(() => typeof a.gradient == "string" ? { backgroundImage: a.gradient } : {}), l = computed(() => typeof a.gradient == "object" && a.gradient.deg ? typeof a.gradient.deg == "number" ? a.gradient.deg + "deg" : a.gradient.deg : "252deg"), t = computed(() => typeof a.gradient == "object" ? a.gradient.from : nl[a.type]), n = computed(() => typeof a.gradient == "object" ? a.gradient.to : ul[a.type]), u = computed(() => typeof a.size == "number" ? a.size + "px" : typeof a.size == "string" ? a.size : void 0);
  return (o, f) => (openBlock(), createElementBlock("span", { class: "m-gradient-text", style: normalizeStyle([`--rotate: ${l.value}; --color-start: ${t.value}; --color-end: ${n.value}; --font-size: ${u.value};`, e.value]) }, [renderSlot(o.$slots, "default", {}, void 0, true)], 4));
} }), [["__scopeId", "data-v-52b87413"]]);
fa2.install = (d) => {
  d.component(fa2.__name, fa2);
};
var dl = N(defineComponent({ __name: "Row", props: { width: { default: "auto" }, gutter: { default: 0 }, wrap: { type: Boolean, default: false }, align: { default: "top" }, justify: { default: "start" } }, setup(d) {
  const a = d, e = { top: "flex-start", middle: "center", bottom: "flex-end", stretch: "stretch" }, l = ref(window.innerWidth);
  Ie2(window, "resize", function() {
    l.value = window.innerWidth;
  });
  const t = computed(() => typeof a.gutter == "number" ? a.gutter : Array.isArray(a.gutter) ? typeof a.gutter[0] == "object" ? o(a.gutter[0]) : a.gutter[0] : typeof a.gutter == "object" ? o(a.gutter) : 0), n = computed(() => Array.isArray(a.gutter) ? typeof a.gutter[1] == "object" ? o(a.gutter[1]) : a.gutter[1] : 0), u = computed(() => typeof a.width == "number" ? a.width + "px" : a.width);
  function o(f) {
    return l.value >= 1600 && f.xxl ? f.xxl : l.value >= 1200 && f.xl ? f.xl : l.value >= 992 && f.lg ? f.lg : l.value >= 768 && f.md ? f.md : l.value >= 576 && f.sm ? f.sm : l.value < 576 && f.xs ? f.xs : 0;
  }
  return (f, v) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-grid-row", { "gutter-row": f.gutter }]), style: normalizeStyle(`--xGap: ${t.value / 2}px; --justify: ${f.justify}; --align: ${e[f.align]}; width: ${u.value}; margin-left: -${t.value / 2}px; margin-right: -${t.value / 2}px; row-gap: ${n.value}px;`) }, [renderSlot(f.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-64bc2fc9"]]);
var rl = N(defineComponent({ __name: "Col", props: { span: { default: void 0 }, offset: { default: 0 }, flex: { default: void 0 }, order: { default: 0 }, xs: { default: void 0 }, sm: { default: void 0 }, md: { default: void 0 }, lg: { default: void 0 }, xl: { default: void 0 }, xxl: { default: void 0 } }, setup(d) {
  const a = d, e = computed(() => typeof a.flex == "number" ? `${a.flex} ${a.flex} auto` : a.flex), l = computed(() => [{ width: 1600, value: a.xxl }, { width: 1200, value: a.xl }, { width: 992, value: a.lg }, { width: 768, value: a.md }, { width: 576, value: a.sm }, { width: 0, value: a.xs }]), t = ref(window.innerWidth);
  Ie2(window, "resize", function() {
    t.value = window.innerWidth;
  });
  const n = computed(() => {
    for (const u of l.value) if (u.value && t.value >= u.width) return typeof u.value == "object" ? { span: u.value.span || a.span, offset: u.value.offset || a.offset } : { span: u.value, offset: a.offset };
    return { span: a.span, offset: a.offset };
  });
  return (u, o) => (openBlock(), createElementBlock("div", { class: normalizeClass(`grid-col col-${n.value.span} offset-${n.value.offset}`), style: normalizeStyle([{ "padding-left": "var(--xGap)", "padding-right": "var(--xGap)" }, `flex: ${e.value}; order: ${u.order};`]) }, [renderSlot(u.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-a6c2e712"]]);
[dl, rl].forEach((d) => {
  d.install = (a) => {
    a.component(d.__name, d);
  };
});
var He2 = N(defineComponent({ __name: "Space", props: { width: { default: "auto" }, align: { default: "start" }, vertical: { type: Boolean, default: false }, gap: { default: "middle" }, wrap: { type: Boolean, default: true } }, setup(d) {
  const a = d, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), l = computed(() => {
    if (typeof a.gap == "number") return a.gap + "px";
    if (Array.isArray(a.gap)) return a.gap[1] + "px " + a.gap[0] + "px ";
    if (["small", "middle", "large"].includes(a.gap))
      return { small: "8px", middle: "16px", large: "24px" }[a.gap];
  });
  return (t, n) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-space", [`space-${t.align}`, { "space-vertical": t.vertical, "space-wrap": t.wrap }]]), style: normalizeStyle(`width: ${e.value}; gap: ${l.value}; margin-bottom: -${Array.isArray(a.gap) && t.wrap ? a.gap[1] : 0}px;`) }, [renderSlot(t.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-d8305740"]]);
He2.install = (d) => {
  d.component(He2.__name, He2);
};
var R1 = { class: "m-image-wrap" };
var j1 = ["onLoad", "src", "alt"];
var W1 = ["onClick"];
var N1 = { class: "image-mask-info" };
var q1 = { class: "mask-pre" };
var O1 = { class: "m-preview-mask" };
var K1 = { class: "m-preview-body" };
var Y1 = { class: "m-preview-operations" };
var U1 = ["href", "title"];
var G1 = { class: "icon-svg", style: { transform: "rotate(90deg)" }, focusable: "false", "data-icon": "swap", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Z1 = ["src", "alt", "onLoad"];
var X1 = defineComponent({ __name: "Image", props: { src: { default: void 0 }, name: { default: void 0 }, width: { default: 100 }, height: { default: 100 }, bordered: { type: Boolean, default: true }, fit: { default: "contain" }, preview: { default: "预览" }, spaceProps: { default: () => ({}) }, spinProps: { default: () => ({}) }, zoomRatio: { default: 0.1 }, minZoomScale: { default: 0.1 }, maxZoomScale: { default: 10 }, resetOnDbclick: { type: Boolean, default: true }, loop: { type: Boolean, default: false }, album: { type: Boolean, default: false } }, setup(d, { expose: a }) {
  const e = d, l = ref([]);
  watchEffect(() => {
    l.value = Array.isArray(e.src) ? e.src : [{ src: e.src, name: e.name }];
  });
  const t = computed(() => l.value.length), n = ref(Array(t.value).fill(false)), u = ref(Array(t.value).fill(false)), o = ref(), f = ref(0), v = ref(false), h2 = ref(0), w = ref(1), m = ref(1), g = ref(1), p = ref(0), k = ref(0), z = ref(0), M = ref(0);
  function y(A) {
    if (A) {
      if (A.name) return A.name;
      {
        const H = A.src.split("?")[0].split("/");
        return H[H.length - 1];
      }
    }
  }
  function c(A, H) {
    return Array.isArray(A) ? typeof A[H] == "number" ? A[H] + "px" : A[H] : typeof A == "number" ? A + "px" : A;
  }
  function $(A) {
    v.value && t.value > 1 && (A.key !== "ArrowLeft" && A.key !== "ArrowUp" || Q(), A.key !== "ArrowRight" && A.key !== "ArrowDown" || R());
  }
  function x(A) {
    w.value = 1, h2.value = 0, z.value = 0, M.value = 0, v.value = true, f.value = A, nextTick(() => {
      o.value.focus();
    });
  }
  function C() {
    v.value = false;
  }
  function L() {
    w.value + e.zoomRatio > e.maxZoomScale ? w.value = e.maxZoomScale : w.value = Ne(w.value, e.zoomRatio);
  }
  function T() {
    w.value - e.zoomRatio < e.minZoomScale ? w.value = e.minZoomScale : w.value = Ne(w.value, -e.zoomRatio);
  }
  function P() {
    w.value = 1, m.value = 1, g.value = 1, h2.value = 0, z.value = 0, M.value = 0;
  }
  function q() {
    h2.value += 90;
  }
  function Z() {
    h2.value -= 90;
  }
  function U() {
    m.value *= -1;
  }
  function le() {
    g.value *= -1;
  }
  function J(A) {
    const H = A.deltaY * e.zoomRatio * 0.1;
    w.value === e.minZoomScale && H > 0 || w.value === e.maxZoomScale && H < 0 || (w.value - H < e.minZoomScale ? w.value = e.minZoomScale : w.value - H > e.maxZoomScale ? w.value = e.maxZoomScale : w.value = Ne(w.value, -H));
  }
  function Q() {
    e.loop ? f.value = (f.value - 1 + t.value) % t.value : f.value > 0 && f.value--, P();
  }
  function R() {
    e.loop ? f.value = (f.value + 1) % t.value : f.value < t.value - 1 && f.value++, P();
  }
  return a({ preview: x }), (A, H) => (openBlock(), createElementBlock("div", R1, [createVNode(unref(He2), mergeProps({ gap: "small" }, A.spaceProps), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (re, V) => withDirectives((openBlock(), createElementBlock("div", { class: normalizeClass(["m-image", { "image-bordered": A.bordered, "image-hover-mask": n.value[V] }]), style: normalizeStyle(`width: ${c(e.width, V)}; height: ${c(e.height, V)};`), key: V }, [createVNode(unref(Be2), mergeProps({ spinning: !n.value[V], indicator: "dynamic-circle", size: "small", ref_for: true }, A.spinProps), { default: withCtx(() => [createBaseVNode("img", { class: "u-image", style: normalizeStyle(`object-fit: ${A.fit};`), onLoad: (X) => {
    return ne = V, void (n.value[ne] = true);
    var ne;
  }, src: re.src, alt: y(re) }, null, 44, j1)]), _: 2 }, 1040, ["spinning"]), createBaseVNode("div", { class: "m-image-mask", onClick: (X) => x(V) }, [createBaseVNode("div", N1, [H[2] || (H[2] = createBaseVNode("svg", { class: "eye-svg", focusable: "false", "data-icon": "eye", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })], -1)), createBaseVNode("p", q1, [renderSlot(A.$slots, "preview", {}, () => [createTextVNode(toDisplayString(A.preview), 1)], true)])])], 8, W1)], 6)), [[vShow, !A.album || A.album && V === 0]])), 128))]), _: 3 }, 16), createVNode(Transition, { name: "fade" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", O1, null, 512), [[vShow, v.value]])]), _: 1 }), createVNode(Transition, { name: "zoom" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { ref_key: "previewRef", ref: o, class: "m-preview-wrap", tabindex: "-1", onClick: withModifiers(C, ["self"]), onWheel: withModifiers(J, ["prevent"]), onKeydown: [$, withKeys(C, ["esc"])] }, [createBaseVNode("div", K1, [createBaseVNode("div", Y1, [createBaseVNode("a", { class: "previe-name", href: l.value[f.value].src, target: "_blank", title: y(l.value[f.value]) }, toDisplayString(y(l.value[f.value])), 9, U1), withDirectives(createBaseVNode("p", { class: "preview-progress" }, toDisplayString(f.value + 1) + " / " + toDisplayString(t.value), 513), [[vShow, Array.isArray(A.src)]]), createBaseVNode("div", { class: "preview-operation", title: "关闭", onClick: C }, H[3] || (H[3] = [createBaseVNode("svg", { class: "icon-svg", focusable: "false", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1)])), createBaseVNode("div", { class: normalizeClass(["preview-operation", { "operation-disabled": w.value === A.maxZoomScale }]), title: "放大", onClick: L }, H[4] || (H[4] = [createBaseVNode("svg", { class: "icon-svg", focusable: "false", "data-icon": "zoom-in", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })], -1)]), 2), createBaseVNode("div", { class: normalizeClass(["preview-operation", { "operation-disabled": w.value === A.minZoomScale }]), title: "缩小", onClick: T }, H[5] || (H[5] = [createBaseVNode("svg", { class: "icon-svg", focusable: "false", "data-icon": "zoom-out", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })], -1)]), 2), createBaseVNode("div", { class: "preview-operation", title: "还原", onClick: P }, H[6] || (H[6] = [createBaseVNode("svg", { class: "icon-svg", focusable: "false", "data-icon": "expand", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z" })], -1)])), createBaseVNode("div", { class: "preview-operation", title: "向右旋转", onClick: q }, H[7] || (H[7] = [createBaseVNode("svg", { class: "icon-svg", focusable: "false", "data-icon": "rotate-right", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" }), createBaseVNode("path", { d: "M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" })], -1)])), createBaseVNode("div", { class: "preview-operation", title: "向左旋转", onClick: Z }, H[8] || (H[8] = [createBaseVNode("svg", { class: "icon-svg", focusable: "false", "data-icon": "rotate-left", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" }), createBaseVNode("path", { d: "M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" })], -1)])), createBaseVNode("div", { class: "preview-operation", title: "水平镜像", onClick: U }, H[9] || (H[9] = [createBaseVNode("svg", { class: "icon-svg", focusable: "false", "data-icon": "swap", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" })], -1)])), createBaseVNode("div", { class: "preview-operation", title: "垂直镜像", onClick: le }, [(openBlock(), createElementBlock("svg", G1, H[10] || (H[10] = [createBaseVNode("path", { d: "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" }, null, -1)])))])]), createBaseVNode("div", { class: "m-preview-image", style: normalizeStyle(`transform: translate3d(${z.value}px, ${M.value}px, 0px);`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (re, V) => withDirectives((openBlock(), createBlock(unref(Be2), { spinning: !u.value[V], indicator: "dynamic-circle", key: V }, { default: withCtx(() => [createBaseVNode("img", { class: "preview-image", style: normalizeStyle(`transform: scale3d(${m.value * w.value}, ${g.value * w.value}, 1) rotate(${h2.value}deg);`), src: re.src, alt: y(re), onMousedown: H[0] || (H[0] = withModifiers((X) => function(ne) {
    const ie = ne.target.getBoundingClientRect(), de = ie.top, Me2 = ie.bottom, j = ie.right, pe = ie.left, ye = window.innerWidth, _e2 = window.innerHeight;
    p.value = ne.clientX, k.value = ne.clientY;
    const Ce2 = z.value, Fe = M.value;
    window.onmousemove = (Pe2) => {
      z.value = Ce2 + Pe2.clientX - p.value, M.value = Fe + Pe2.clientY - k.value;
    }, window.onmouseup = () => {
      z.value > Ce2 + ye - j && (z.value = Ce2 + ye - j), z.value < Ce2 - pe && (z.value = Ce2 - pe), M.value > Fe + _e2 - Me2 && (M.value = Fe + _e2 - Me2), M.value < Fe - de && (M.value = Fe - de), window.onmousemove = null;
    };
  }(X), ["prevent"])), onLoad: (X) => function(ne) {
    u.value[ne] = true;
  }(V), onDblclick: H[1] || (H[1] = (X) => A.resetOnDbclick ? P() : () => false) }, null, 44, Z1)]), _: 2 }, 1032, ["spinning"])), [[vShow, f.value === V]])), 128))], 4), t.value > 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", { class: normalizeClass(["switch-left", { "switch-disabled": f.value === 0 && !A.loop }]), onClick: Q }, H[11] || (H[11] = [createBaseVNode("svg", { class: "switch-svg", focusable: "false", "data-icon": "left", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })], -1)]), 2), createBaseVNode("div", { class: normalizeClass(["switch-right", { "switch-disabled": f.value === t.value - 1 && !A.loop }]), onClick: R }, H[12] || (H[12] = [createBaseVNode("svg", { class: "switch-svg", focusable: "false", "data-icon": "right", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" })], -1)]), 2)], 64)) : createCommentVNode("", true)])], 544), [[vShow, v.value]])]), _: 1 })]));
} });
var Ke2 = N(X1, [["__scopeId", "data-v-52795302"]]);
Ke2.install = (d) => {
  d.component(Ke2.__name, Ke2);
};
var Q1 = { key: 0, class: "input-prefix" };
var J1 = ["type", "value", "placeholder", "maxlength", "disabled", "onKeydown"];
var eo2 = { key: 1, class: "input-suffix" };
var ao2 = { class: "eye-svg", focusable: "false", "data-icon": "eye", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var lo2 = { class: "eye-svg", focusable: "false", "data-icon": "eye-invisible", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var to2 = { key: 2, class: "input-count" };
var oo2 = { key: 3, class: "m-suffix" };
var Ye2 = N(defineComponent({ __name: "Input", props: { width: { default: "100%" }, size: { default: "middle" }, addonBefore: { default: void 0 }, addonAfter: { default: void 0 }, prefix: { default: void 0 }, suffix: { default: void 0 }, allowClear: { type: Boolean, default: false }, password: { type: Boolean, default: false }, disabled: { type: Boolean, default: false }, placeholder: { default: void 0 }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, value: { default: void 0 }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "enter"], setup(d, { emit: a }) {
  const e = d, l = ref(), t = ref(false), n = a, u = he(["prefix", "suffix", "addonBefore", "addonAfter"]), o = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), f = computed(() => !e.disabled && e.allowClear), v = computed(() => e.maxlength ? (e.value ? e.value.length : 0) + " / " + e.maxlength : e.value ? e.value.length : 0), h2 = computed(() => u.prefix || e.prefix), w = computed(() => u.suffix || e.suffix), m = computed(() => f.value || e.password || e.showCount || w.value), g = computed(() => u.addonBefore || e.addonBefore), p = computed(() => u.addonAfter || e.addonAfter), k = computed(() => "lazy" in e.valueModifiers);
  function z(x) {
    k.value || (n("update:value", x.target.value), n("change", x));
  }
  function M(x) {
    k.value && (n("update:value", x.target.value), n("change", x));
  }
  function y(x) {
    n("enter", x), k.value && (l.value.blur(), nextTick(() => {
      l.value.focus();
    }));
  }
  function c() {
    n("update:value", ""), l.value.focus();
  }
  function $() {
    t.value = !t.value;
  }
  return (x, C) => (openBlock(), createElementBlock("div", { class: "m-input-wrap", style: normalizeStyle(`width: ${o.value};`) }, [g.value ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["m-addon", { "addon-before": g.value }]) }, [renderSlot(x.$slots, "addonBefore", {}, () => [createTextVNode(toDisplayString(x.addonBefore), 1)], true)], 2)) : createCommentVNode("", true), createBaseVNode("div", { tabindex: "1", class: normalizeClass(["m-input", [`input-${x.size}`, { "input-before": g.value, "input-after": p.value, "input-disabled": x.disabled }]]) }, [h2.value ? (openBlock(), createElementBlock("span", Q1, [renderSlot(x.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(x.prefix), 1)], true)])) : createCommentVNode("", true), createBaseVNode("input", { ref_key: "inputRef", ref: l, class: "u-input", type: x.password && !t.value ? "password" : "text", value: x.value, placeholder: x.placeholder, maxlength: x.maxlength, disabled: x.disabled, onInput: z, onChange: M, onKeydown: withKeys(withModifiers(y, ["prevent"]), ["enter"]) }, null, 40, J1), m.value ? (openBlock(), createElementBlock("span", eo2, [f.value ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["m-actions", { "clear-hidden": !x.value }]), onClick: c }, C[0] || (C[0] = [createBaseVNode("svg", { class: "clear-svg", focusable: "false", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })], -1)]), 2)) : createCommentVNode("", true), x.password ? (openBlock(), createElementBlock("span", { key: 1, class: "m-actions", onClick: $ }, [withDirectives((openBlock(), createElementBlock("svg", ao2, C[1] || (C[1] = [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" }, null, -1)]), 512)), [[vShow, t.value]]), withDirectives((openBlock(), createElementBlock("svg", lo2, C[2] || (C[2] = [createBaseVNode("path", { d: "M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" }, null, -1), createBaseVNode("path", { d: "M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" }, null, -1)]), 512)), [[vShow, !t.value]])])) : createCommentVNode("", true), x.showCount ? (openBlock(), createElementBlock("span", to2, toDisplayString(v.value), 1)) : createCommentVNode("", true), w.value ? (openBlock(), createElementBlock("span", oo2, [renderSlot(x.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(x.suffix), 1)], true)])) : createCommentVNode("", true)])) : createCommentVNode("", true)], 2), p.value ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["m-addon", { "addon-after": p.value }]) }, [renderSlot(x.$slots, "addonAfter", {}, () => [createTextVNode(toDisplayString(x.addonAfter), 1)], true)], 2)) : createCommentVNode("", true)], 4));
} }), [["__scopeId", "data-v-c272f6c9"]]);
Ye2.install = (d) => {
  d.component(Ye2.__name, Ye2);
};
var so2 = { class: "m-input-number-wrap" };
var io2 = { key: 0, class: "input-prefix" };
var no2 = ["disabled", "placeholder"];
var uo2 = { class: "m-handler-wrap" };
var ha = N(defineComponent({ __name: "InputNumber", props: { width: { default: 90 }, min: { default: -1 / 0 }, max: { default: 1 / 0 }, step: { default: 1 }, precision: { default: 0 }, prefix: { default: void 0 }, formatter: { type: Function, default: void 0 }, parser: { type: Function, default: void 0 }, keyboard: { type: Boolean, default: true }, disabled: { type: Boolean, default: false }, placeholder: { default: void 0 }, value: { default: void 0 }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change"], setup(d, { emit: a }) {
  const e = d, l = ref(), t = ref(), n = a, u = he(["prefix"]), o = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), f = computed(() => {
    var $;
    const c = (($ = String(e.step).split(".")[1]) == null ? void 0 : $.length) || 0;
    return Math.max(e.precision, c);
  }), v = computed(() => u.prefix || e.prefix), h2 = computed(() => "lazy" in e.valueModifiers);
  function w(c) {
    n("change", c), n("update:value", c);
  }
  function m() {
    var c, $;
    return e.formatter ? e.formatter((c = e.value) == null ? void 0 : c.toFixed(f.value)) : ($ = e.value) == null ? void 0 : $.toFixed(f.value);
  }
  function g(c) {
    let $ = parseFloat(c);
    return $ > e.max && ($ = e.max), $ < e.min && ($ = e.min), $;
  }
  function p(c) {
    if (Number.isNaN(parseFloat(c))) e.value ? t.value = m() : e.formatter && (t.value = e.formatter(c));
    else {
      const $ = g(c);
      $ !== e.value ? w($) : t.value = m();
    }
  }
  function k(c) {
    if (!h2.value) {
      const $ = c.target, x = e.parser ? String(e.parser($.value)) : $.value;
      x && !Number.isNaN(g(x)) && g(x) !== e.value && p(x), x || e.value === void 0 || w(void 0);
    }
  }
  function z(c) {
    const $ = c.target;
    p(e.parser ? String(e.parser($.value)) : $.value);
  }
  function M() {
    w(parseFloat(Math.min(e.max, Ne(e.value || 0, +e.step)).toFixed(f.value)));
  }
  function y() {
    w(parseFloat(Math.max(e.min, Ne(e.value || 0, -e.step)).toFixed(f.value)));
  }
  return watch(() => [e.value, f.value, e.formatter], async () => {
    if (e.value) if (l.value) {
      const { selectionStart: c, selectionEnd: $, value: x } = l.value, C = x.slice(0, c), L = x.slice($);
      t.value = m(), await nextTick(), function(T, P, q) {
        const { value: Z } = l.value;
        let U = Z.length;
        if (Z.endsWith(q)) U = Z.length - q.length;
        else if (Z.startsWith(P)) U = P.length;
        else {
          const le = P[T - 1], J = Z.indexOf(le, T - 1);
          J !== -1 && (U = J + 1);
        }
        l.value.setSelectionRange(U, U);
      }(c, C, L);
    } else t.value = m();
  }, { immediate: true, flush: "post", deep: true }), (c, $) => (openBlock(), createElementBlock("div", { tabindex: "1", class: normalizeClass(["m-input-number", { "input-number-disabled": c.disabled }]), style: normalizeStyle(`width: ${o.value};`) }, [createBaseVNode("div", so2, [v.value ? (openBlock(), createElementBlock("span", io2, [renderSlot(c.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(c.prefix), 1)], true)])) : createCommentVNode("", true), withDirectives(createBaseVNode("input", { ref_key: "inputRef", ref: l, class: "input-number", autocomplete: "off", disabled: c.disabled, placeholder: c.placeholder, "onUpdate:modelValue": $[0] || ($[0] = (x) => t.value = x), onInput: k, onChange: z, onKeydown: [$[1] || ($[1] = withKeys(withModifiers(() => {
  }, ["prevent"]), ["up"])), $[2] || ($[2] = (x) => {
    return c.keyboard ? ((C = x).key === "ArrowUp" && M(), void (C.key === "ArrowDown" && y())) : () => false;
    var C;
  })] }, null, 40, no2), [[vModelText, t.value]])]), createBaseVNode("div", uo2, [createBaseVNode("span", { class: normalizeClass(["m-arrow up-arrow", { "arrow-disabled": (c.value || 0) >= c.max }]), onClick: M }, $[3] || ($[3] = [createBaseVNode("svg", { class: "icon-svg", focusable: "false", "data-icon": "up", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" })], -1)]), 2), createBaseVNode("span", { class: normalizeClass(["m-arrow down-arrow", { "arrow-disabled": (c.value || 0) <= c.min }]), onClick: y }, $[4] || ($[4] = [createBaseVNode("svg", { class: "icon-svg", focusable: "false", "data-icon": "down", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })], -1)]), 2)])], 6));
} }), [["__scopeId", "data-v-3614ede8"]]);
ha.install = (d) => {
  d.component(ha.__name, ha);
};
var ro2 = { key: 0, class: "m-prefix" };
var co = ["value", "placeholder", "maxlength", "disabled", "onKeydown"];
var vo = { key: 1, class: "input-search-suffix" };
var po = { key: 1, class: "input-search-count" };
var fo = { key: 2, class: "m-suffix" };
var ho = ["onKeydown"];
var ma2 = N(defineComponent({ __name: "InputSearch", props: { width: { default: "100%" }, icon: { type: Boolean, default: true }, search: { default: void 0 }, searchProps: { default: () => ({}) }, size: { default: "middle" }, allowClear: { type: Boolean, default: false }, addonBefore: { default: void 0 }, prefix: { default: void 0 }, suffix: { default: void 0 }, loading: { type: Boolean, default: false }, disabled: { type: Boolean, default: false }, placeholder: { default: void 0 }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, value: { default: void 0 }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "search"], setup(d, { emit: a }) {
  const e = d, l = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), t = computed(() => !e.disabled && e.allowClear), n = computed(() => e.maxlength ? (e.value ? e.value.length : 0) + " / " + e.maxlength : e.value ? e.value.length : 0), u = he(["prefix", "suffix", "addonBefore"]), o = computed(() => u.prefix || e.prefix), f = computed(() => u.suffix || e.suffix), v = computed(() => t.value || e.showCount || f.value), h2 = computed(() => u.addonBefore || e.addonBefore), w = computed(() => "lazy" in e.valueModifiers), m = a;
  function g(c) {
    w.value || (m("update:value", c.target.value), m("change", c));
  }
  function p(c) {
    w.value && (m("update:value", c.target.value), m("change", c));
  }
  const k = ref();
  function z() {
    m("update:value", ""), k.value.focus();
  }
  async function M(c) {
    w.value ? (w.value && (k.value.blur(), await nextTick(), k.value.focus()), m("search", e.value)) : y();
  }
  function y() {
    m("search", e.value);
  }
  return (c, $) => (openBlock(), createElementBlock("div", { class: "m-input-search-wrap", style: normalizeStyle(`width: ${l.value};`) }, [h2.value ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["m-addon-before", `addon-before-${c.size}`]) }, [renderSlot(c.$slots, "addonBefore", {}, () => [createTextVNode(toDisplayString(c.addonBefore), 1)], true)], 2)) : createCommentVNode("", true), createBaseVNode("div", { tabindex: "1", class: normalizeClass(["m-input-search", [`input-search-${c.size}`, { "input-search-before": h2.value, "input-search-disabled": c.disabled }]]) }, [o.value ? (openBlock(), createElementBlock("span", ro2, [renderSlot(c.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(c.prefix), 1)], true)])) : createCommentVNode("", true), createBaseVNode("input", { ref_key: "input", ref: k, class: "input-search", type: "text", value: c.value, placeholder: c.placeholder, maxlength: c.maxlength, disabled: c.disabled, onInput: g, onChange: p, onKeydown: withKeys(withModifiers(M, ["prevent"]), ["enter"]) }, null, 40, co), v.value ? (openBlock(), createElementBlock("span", vo, [t.value ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["m-clear", { "clear-hidden": !c.value }]), onClick: z }, $[0] || ($[0] = [createBaseVNode("svg", { class: "clear-svg", focusable: "false", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })], -1)]), 2)) : createCommentVNode("", true), c.showCount ? (openBlock(), createElementBlock("span", po, toDisplayString(n.value), 1)) : createCommentVNode("", true), f.value ? (openBlock(), createElementBlock("span", fo, [renderSlot(c.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(c.suffix), 1)], true)])) : createCommentVNode("", true)])) : createCommentVNode("", true)], 2), createBaseVNode("span", { class: "m-search-button", onClick: y, onKeydown: withKeys(withModifiers(y, ["prevent"]), ["enter"]) }, [renderSlot(c.$slots, "search", {}, () => [createVNode(unref($e), mergeProps({ class: "search-btn", size: c.size, disabled: c.disabled, loading: c.loading }, c.searchProps), createSlots({ default: withCtx(() => [createTextVNode(" " + toDisplayString(c.search), 1)]), _: 2 }, [c.icon ? { name: "icon", fn: withCtx(() => [$[1] || ($[1] = createBaseVNode("svg", { focusable: "false", "data-icon": "search", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" })], -1))]), key: "0" } : void 0]), 1040, ["size", "disabled", "loading"])], true)], 40, ho)], 4));
} }), [["__scopeId", "data-v-ef1ed399"]]);
ma2.install = (d) => {
  d.component(ma2.__name, ma2);
};
var mo = { class: "m-layout" };
var cl = N(defineComponent({ __name: "Layout", props: { class: { default: void 0 }, style: { default: () => ({}) } }, setup: (d) => (a, e) => (openBlock(), createElementBlock("div", mo)) }), [["__scopeId", "data-v-01b6992e"]]);
var go = { class: "m-layout" };
var vl2 = N(defineComponent({ __name: "LayoutHeader", props: { class: { default: void 0 }, style: { default: () => ({}) } }, setup: (d) => (a, e) => (openBlock(), createElementBlock("div", go)) }), [["__scopeId", "data-v-a8f3bba9"]]);
var yo = { class: "m-layout" };
var pl2 = N(defineComponent({ __name: "LayoutSider", props: { class: { default: void 0 }, style: { default: () => ({}) } }, setup: (d) => (a, e) => (openBlock(), createElementBlock("div", yo)) }), [["__scopeId", "data-v-cfb7087f"]]);
var bo = { class: "m-layout" };
var fl2 = N(defineComponent({ __name: "LayoutContent", props: { class: { default: void 0 }, style: { default: () => ({}) } }, setup: (d) => (a, e) => (openBlock(), createElementBlock("div", bo)) }), [["__scopeId", "data-v-44945a30"]]);
var wo = { class: "m-layout" };
var hl2 = N(defineComponent({ __name: "LayoutFooter", props: { class: { default: void 0 }, style: { default: () => ({}) } }, setup: (d) => (a, e) => (openBlock(), createElementBlock("div", wo)) }), [["__scopeId", "data-v-142f0558"]]);
[cl, vl2, pl2, fl2, hl2].forEach((d) => {
  d.install = (a) => {
    a.component(d.__name, d);
  };
});
var ko = { key: 0, class: "pagination-total-text" };
var xo = ["onClick"];
var Mo = { key: 1, class: "m-pagination-options" };
var _o = { key: 1, class: "pagination-jump-page" };
var Co = defineComponent({ __name: "Pagination", props: { page: { default: 1 }, pageSize: { default: 10 }, total: { default: 0 }, disabled: { type: Boolean, default: false }, pageAmount: { default: 5 }, hideOnSinglePage: { type: Boolean, default: false }, showQuickJumper: { type: Boolean, default: false }, showSizeChanger: { type: Boolean, default: void 0 }, pageSizeOptions: { default: () => [10, 20, 50, 100] }, showTotal: { type: [Boolean, Function], default: false }, placement: { default: "center" } }, emits: ["update:page", "update:pageSize", "change", "pageSizeChange"], setup(d, { emit: a }) {
  const e = d, l = ref(e.page), t = ref(e.pageSize), n = ref(), u = ref(false), o = ref(false), f = computed(() => Math.ceil(e.total / t.value)), v = computed(() => {
    if (typeof e.showTotal != "boolean") {
      const M = (l.value - 1) * t.value + 1, y = l.value * t.value > e.total ? e.total : l.value * t.value;
      return e.showTotal(e.total, [M, y]);
    }
    return e.showTotal ? `共 ${e.total} 条` : null;
  }), h2 = computed(() => function(M) {
    var y = [], c = Math.floor(e.pageAmount / 2), $ = { start: M - c, end: M + c };
    $.start < 1 && ($.end = $.end + (1 - $.start), $.start = 1), $.end > f.value && ($.start = $.start - ($.end - f.value), $.end = f.value), $.start < 1 && ($.start = 1), $.start > 1 ? u.value = true : u.value = false, $.end < f.value ? o.value = true : o.value = false;
    for (let x = $.start; x <= $.end; x++) y.push(x);
    return y;
  }(l.value).filter((M) => M !== 1 && M !== f.value)), w = computed(() => typeof e.showSizeChanger == "boolean" ? e.showSizeChanger : e.total > 50), m = computed(() => {
    const M = [t.value, ...e.pageSizeOptions].map((y) => Number(y));
    return [...new Set(M)].sort((y, c) => y - c).map((y) => ({ label: `${y} 条/页`, value: y }));
  });
  watch(() => e.page, (M) => {
    l.value = M;
  }), watch(() => e.pageSize, (M) => {
    t.value = M;
  });
  const g = a;
  function p() {
    let M = Number(n.value);
    n.value && Number.isInteger(M) && (M < 1 && (M = 1), M > f.value && (M = f.value), k(M)), nextTick(() => {
      n.value = void 0;
    });
  }
  function k(M) {
    if (M === 0 || M === f.value + 1) return false;
    l.value !== M && (l.value = M, g("update:page", l.value), g("change", l.value, t.value));
  }
  function z(M) {
    t.value = M;
    const y = Math.ceil(e.total / M);
    l.value > y && (l.value = y), g("update:page", l.value), g("update:pageSize", t.value), g("pageSizeChange", l.value, t.value), g("change", l.value, t.value);
  }
  return (M, y) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-pagination", [`pagination-${M.placement}`, { "pagination-disabled": M.disabled, "pagination-hidden": !M.total || M.hideOnSinglePage && M.total <= t.value }]]) }, [v.value ? (openBlock(), createElementBlock("span", ko, toDisplayString(v.value), 1)) : createCommentVNode("", true), createBaseVNode("span", { tabindex: "0", class: normalizeClass(["pagination-prev", { "item-disabled": l.value === 1 }]), onKeydown: y[0] || (y[0] = withKeys(withModifiers((c) => M.disabled ? () => false : k(l.value - 1), ["prevent"]), ["enter"])), onClick: y[1] || (y[1] = (c) => M.disabled || l.value === 1 ? () => false : k(l.value - 1)) }, y[10] || (y[10] = [createBaseVNode("svg", { class: "arrow-svg", viewBox: "64 64 896 896", "data-icon": "left", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })], -1)]), 34), createBaseVNode("span", { tabindex: "0", class: normalizeClass(["pagination-item", { "item-active": l.value === 1 }]), onClick: y[2] || (y[2] = (c) => M.disabled ? () => false : k(1)) }, " 1 ", 2), withDirectives(createBaseVNode("span", { tabindex: "0", ref: "forward", class: "pagintion-item-link", onClick: y[3] || (y[3] = (c) => M.disabled ? () => false : (l.value = l.value - e.pageAmount > 0 ? l.value - e.pageAmount : 1, g("update:page", l.value), void g("change", l.value, t.value))) }, y[11] || (y[11] = [createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1), createBaseVNode("svg", { class: "u-icon", viewBox: "64 64 896 896", "data-icon": "double-left", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" })], -1)]), 512), [[vShow, u.value && h2.value[0] - 1 > 1]]), (openBlock(true), createElementBlock(Fragment, null, renderList(h2.value, (c, $) => (openBlock(), createElementBlock("span", { tabindex: "0", class: normalizeClass(["pagination-item", { "item-active": l.value === c }]), key: $, onClick: (x) => M.disabled ? () => false : k(c) }, toDisplayString(c), 11, xo))), 128)), withDirectives(createBaseVNode("span", { tabindex: "0", ref: "backward", class: "pagintion-item-link", onClick: y[4] || (y[4] = (c) => M.disabled ? () => false : (l.value = l.value + e.pageAmount < f.value ? l.value + e.pageAmount : f.value, g("update:page", l.value), void g("change", l.value, t.value))) }, y[12] || (y[12] = [createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1), createBaseVNode("svg", { class: "u-icon", viewBox: "64 64 896 896", "data-icon": "double-right", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" })], -1)]), 512), [[vShow, o.value && h2.value[h2.value.length - 1] + 1 < f.value]]), withDirectives(createBaseVNode("span", { tabindex: "0", class: normalizeClass(["pagination-item", { "item-active": l.value === f.value }]), onClick: y[5] || (y[5] = (c) => M.disabled ? () => false : k(f.value)) }, toDisplayString(f.value), 3), [[vShow, f.value !== 1]]), createBaseVNode("span", { tabindex: "0", class: normalizeClass(["pagination-next", { "item-disabled": l.value === f.value }]), onKeydown: y[6] || (y[6] = withKeys(withModifiers((c) => M.disabled ? () => false : k(l.value + 1), ["prevent"]), ["enter"])), onClick: y[7] || (y[7] = (c) => M.disabled || l.value === f.value ? () => false : k(l.value + 1)) }, y[13] || (y[13] = [createBaseVNode("svg", { class: "arrow-svg", viewBox: "64 64 896 896", "data-icon": "right", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })], -1)]), 34), w.value || M.showQuickJumper ? (openBlock(), createElementBlock("span", Mo, [w.value ? (openBlock(), createBlock(unref(Ae), { key: 0, class: normalizeClass({ mr8: M.showQuickJumper }), disabled: M.disabled, options: m.value, onChange: z, modelValue: t.value, "onUpdate:modelValue": y[8] || (y[8] = (c) => t.value = c) }, null, 8, ["class", "disabled", "options", "modelValue"])) : createCommentVNode("", true), M.showQuickJumper ? (openBlock(), createElementBlock("span", _o, [y[14] || (y[14] = createTextVNode(" 跳至")), createVNode(unref(Ye2), { width: 50, disabled: M.disabled, value: n.value, "onUpdate:value": y[9] || (y[9] = (c) => n.value = c), valueModifiers: { lazy: true }, onChange: p, onEnter: p }, null, 8, ["disabled", "value"]), y[15] || (y[15] = createTextVNode("页 "))])) : createCommentVNode("", true)])) : createCommentVNode("", true)], 2));
} });
var Re = N(Co, [["__scopeId", "data-v-e6fcd836"]]);
Re.install = (d) => {
  d.component(Re.__name, Re);
};
var zo = { key: 0, class: "list-header" };
var $o = { key: 2, class: "list-empty" };
var Bo = { key: 3, class: "list-footer" };
var So = { key: 4, class: "list-pagination" };
var ml2 = N(defineComponent({ __name: "List", props: { bordered: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, split: { type: Boolean, default: true }, size: { default: "middle" }, loading: { type: Boolean, default: false }, hoverable: { type: Boolean, default: false }, header: { default: void 0 }, footer: { default: void 0 }, spinProps: { default: () => ({}) }, emptyProps: { default: () => ({}) }, showPagination: { type: Boolean, default: false }, pagination: { default: () => ({}) } }, setup(d) {
  const a = d, e = he(["header", "default", "footer"]), l = computed(() => e.header || a.header), t = computed(() => e.footer || a.footer);
  return (n, u) => (openBlock(), createBlock(unref(Be2), mergeProps({ size: "small", spinning: n.loading }, n.spinProps), { default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(["m-list", { "list-bordered": n.bordered, "list-vertical": n.vertical, "list-split": n.split, "list-small": n.size === "small", "list-large": n.size === "large", "list-hoverable": n.hoverable }]) }, [l.value ? (openBlock(), createElementBlock("div", zo, [renderSlot(n.$slots, "header", {}, () => [createTextVNode(toDisplayString(n.header), 1)], true)])) : createCommentVNode("", true), unref(e).default ? renderSlot(n.$slots, "default", { key: 1 }, void 0, true) : (openBlock(), createElementBlock("div", $o, [createVNode(unref(Ee), mergeProps({ image: "outlined" }, n.emptyProps), null, 16)])), t.value ? (openBlock(), createElementBlock("div", Bo, [renderSlot(n.$slots, "footer", {}, () => [createTextVNode(toDisplayString(n.footer), 1)], true)])) : createCommentVNode("", true), n.showPagination ? (openBlock(), createElementBlock("div", So, [createVNode(unref(Re), mergeProps({ placement: "right" }, n.pagination), null, 16)])) : createCommentVNode("", true)], 2)]), _: 3 }, 16, ["spinning"]));
} }), [["__scopeId", "data-v-1e475fb2"]]);
var Lo = { class: "m-list-item" };
var Fo = { class: "m-list-item-main" };
var Ao = { key: 0, class: "m-list-item-meta" };
var Do = { key: 1, class: "m-list-item-content" };
var gl2 = N(defineComponent({ __name: "ListItem", props: { avatar: { default: void 0 }, avatarProps: { default: () => ({}) }, title: { default: void 0 }, description: { default: void 0 }, actions: { default: void 0 }, extra: { default: void 0 }, avatarStyle: { default: () => ({}) }, titleStyle: { default: () => ({}) }, descriptionStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) }, actionsStyle: { default: () => ({}) }, extraStyle: { default: () => ({}) } }, setup(d) {
  const a = d, e = he(["avatar", "title", "description", "default", "actions", "extra"]), l = computed(() => e.avatar || a.avatar || JSON.stringify(a.avatarProps) !== "{}"), t = computed(() => e.title || e.description || a.title || a.description), n = computed(() => e.extra || a.extra);
  return (u, o) => (openBlock(), createElementBlock("div", Lo, [createBaseVNode("div", Fo, [l.value || t.value ? (openBlock(), createElementBlock("div", Ao, [l.value ? (openBlock(), createElementBlock("div", { key: 0, class: "m-list-item-avatar", style: normalizeStyle(u.avatarStyle) }, [renderSlot(u.$slots, "avatar", {}, () => [createVNode(unref(qe2), normalizeProps(guardReactiveProps(u.avatarProps)), { default: withCtx(() => [createTextVNode(toDisplayString(u.avatar), 1)]), _: 1 }, 16)], true)], 4)) : createCommentVNode("", true), t.value ? (openBlock(), createElementBlock("div", Do, [createBaseVNode("p", { class: "list-item-title", style: normalizeStyle(u.titleStyle) }, [renderSlot(u.$slots, "title", {}, () => [createTextVNode(toDisplayString(u.title), 1)], true)], 4), createBaseVNode("div", { class: "list-item-description", style: normalizeStyle(u.descriptionStyle) }, [renderSlot(u.$slots, "description", {}, () => [createTextVNode(toDisplayString(u.description), 1)], true)], 4)])) : createCommentVNode("", true)])) : createCommentVNode("", true), unref(e).default ? (openBlock(), createElementBlock("div", { key: 1, style: normalizeStyle(u.contentStyle) }, [renderSlot(u.$slots, "default", {}, void 0, true)], 4)) : createCommentVNode("", true), unref(e).actions ? (openBlock(), createElementBlock("div", { key: 2, class: "list-item-actions", style: normalizeStyle(u.actionsStyle) }, [renderSlot(u.$slots, "actions", {}, void 0, true)], 4)) : createCommentVNode("", true)]), n.value ? (openBlock(), createElementBlock("div", { key: 0, class: "list-item-extra", style: normalizeStyle(u.extraStyle) }, [renderSlot(u.$slots, "extra", {}, () => [createTextVNode(toDisplayString(u.extra), 1)], true)], 4)) : createCommentVNode("", true)]));
} }), [["__scopeId", "data-v-6cc68a17"]]);
[ml2, gl2].forEach((d) => {
  d.install = (a) => {
    a.component(d.__name, d);
  };
});
var ga = N(defineComponent({ __name: "LoadingBar", props: { containerClass: { default: void 0 }, containerStyle: { default: () => ({}) }, loadingBarSize: { default: 2 }, colorLoading: { default: "#1677ff" }, colorFinish: { default: "#1677ff" }, colorError: { default: "#ff4d4f" }, to: { default: "body" } }, setup(d, { expose: a }) {
  const e = ref(false), l = ref(), t = ref(false), n = ref(false), u = ref(false);
  async function o() {
    e.value = false, n.value = false, u.value = false;
  }
  async function f(w = 0, m = 80, g = "starting") {
    t.value = true, await o(), n.value || (e.value = true, await nextTick(), l.value && (l.value.style.transition = "none", l.value.style.maxWidth = `${w}%`, l.value.offsetWidth, l.value.className = `loading-bar loading-bar-${g}`, l.value.style.transition = "", l.value.style.maxWidth = `${m}%`));
  }
  function v() {
    u.value && (e.value = false);
  }
  async function h2() {
    await o();
  }
  return a({ start: f, finish: async function() {
    n.value || u.value || (t.value && await nextTick(), n.value = true, l.value && (l.value.className = "loading-bar loading-bar-finishing", l.value.style.maxWidth = "100%", l.value.offsetWidth, e.value = false));
  }, error: function() {
    if (!n.value && !u.value) if (e.value) {
      if (u.value = true, !l.value) return;
      l.value.className = "loading-bar loading-bar-error", l.value.style.maxWidth = "100%", l.value.offsetWidth, e.value = false;
    } else f(100, 100, "error").then(() => {
      u.value = true;
    });
  } }), (w, m) => (openBlock(), createBlock(Teleport, { disabled: !w.to, to: w.to }, [createVNode(Transition, { name: "fade-in", onAfterEnter: v, onAfterLeave: h2 }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-loading-bar-container", w.containerClass]), style: normalizeStyle(w.containerStyle) }, [createBaseVNode("div", { ref_key: "loadingBarRef", ref: l, class: "loading-bar", style: normalizeStyle(`--loading-bar-size: ${w.loadingBarSize}px; --color-loading: ${w.colorLoading}; --color-finish: ${w.colorFinish}; --color-error: ${w.colorError}; max-width: 100%;`) }, null, 4)], 6), [[vShow, e.value]])]), _: 1 })], 8, ["disabled", "to"]));
} }), [["__scopeId", "data-v-2e605526"]]);
ga.install = (d) => {
  d.component(ga.__name, ga);
};
var Eo = ["onMouseenter", "onMouseleave", "onClick"];
var To = { key: 1, class: "icon-svg", focusable: "false", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Ho = { key: 2, class: "icon-svg", focusable: "false", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Io = { key: 3, class: "icon-svg", focusable: "false", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", "fill-rule": "evenodd", viewBox: "64 64 896 896" };
var Po = { key: 4, class: "icon-svg", focusable: "false", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Vo = { key: 5, width: "1em", height: "1em", fill: "currentColor", class: "icon-svg circle", viewBox: "0 0 50 50" };
var Ro = { class: "message-content" };
var jo = defineComponent({ __name: "Message", props: { content: { default: void 0 }, duration: { default: 3e3 }, top: { default: 30 } }, emits: ["click", "close"], setup(d, { expose: a, emit: e }) {
  const l = d, t = ref(), n = ref([]), u = ref([]), o = ref([]), f = ref(null), v = e, h2 = computed(() => typeof l.top == "number" ? l.top + "px" : l.top), w = computed(() => n.value.every((p) => !p));
  function m(p) {
    f.value !== null && (u.value[p] = xe(() => {
      n.value[p] = false, o.value[p].onClose && o.value[p].onClose(), v("close");
    }, f.value));
  }
  function g() {
    t.value && be(t.value);
    const p = o.value.length - 1, k = o.value[p];
    n.value[p] = true, k.duration !== null ? (f.value = k.duration || l.duration, m(p)) : f.value = null;
  }
  return watch(w, (p, k) => {
    !k && p && (t.value = xe(() => {
      o.value.splice(0), n.value.splice(0);
    }, 300));
  }), a({ open: function(p) {
    typeof p == "string" ? o.value.push({ content: p, mode: "open" }) : o.value.push({ ...p, mode: "open" }), g();
  }, info: function(p) {
    typeof p == "string" ? o.value.push({ content: p, mode: "info" }) : o.value.push({ ...p, mode: "info" }), g();
  }, success: function(p) {
    typeof p == "string" ? o.value.push({ content: p, mode: "success" }) : o.value.push({ ...p, mode: "success" }), g();
  }, error: function(p) {
    typeof p == "string" ? o.value.push({ content: p, mode: "error" }) : o.value.push({ ...p, mode: "error" }), g();
  }, warning: function(p) {
    typeof p == "string" ? o.value.push({ content: p, mode: "warning" }) : o.value.push({ ...p, mode: "warning" }), g();
  }, loading: function(p) {
    typeof p == "string" ? o.value.push({ content: p, mode: "loading" }) : o.value.push({ ...p, mode: "loading" }), g();
  } }), (p, k) => (openBlock(), createElementBlock("div", { class: "m-message-wrap", style: normalizeStyle(`top: ${h2.value};`) }, [createVNode(TransitionGroup, { name: "slide-fade" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (z, M) => withDirectives((openBlock(), createElementBlock("div", { class: normalizeClass(["m-message", z.class]), style: normalizeStyle(z.style), key: M }, [createBaseVNode("div", { class: normalizeClass(["m-message-content", `icon-${z.mode}`]), onMouseenter: (y) => function(c) {
    u.value[c] && be(u.value[c]);
  }(M), onMouseleave: (y) => function(c) {
    m(c);
  }(M), onClick: (y) => function(c, $) {
    o.value[$].onClick && o.value[$].onClick(), v("click", c);
  }(y, M) }, [z.icon ? (openBlock(), createBlock(resolveDynamicComponent(z.icon), { key: 0, class: "icon-svg" })) : z.mode === "info" ? (openBlock(), createElementBlock("svg", To, k[0] || (k[0] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1)]))) : z.mode === "success" ? (openBlock(), createElementBlock("svg", Ho, k[1] || (k[1] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1)]))) : z.mode === "error" ? (openBlock(), createElementBlock("svg", Io, k[2] || (k[2] = [createBaseVNode("path", { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" }, null, -1)]))) : z.mode === "warning" ? (openBlock(), createElementBlock("svg", Po, k[3] || (k[3] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1)]))) : z.mode === "loading" ? (openBlock(), createElementBlock("svg", Vo, k[4] || (k[4] = [createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" }, null, -1)]))) : createCommentVNode("", true), createBaseVNode("div", Ro, toDisplayString(z.content || p.content), 1)], 42, Eo)], 6)), [[vShow, n.value[M]]])), 128))]), _: 1 })], 4));
} });
var Ue = N(jo, [["__scopeId", "data-v-8c7262e8"]]);
Ue.install = (d) => {
  d.component(Ue.__name, Ue);
};
var Wo = { class: "m-modal-root" };
var No = { class: "m-modal-mask" };
var qo = { class: "m-modal-body-wrap" };
var Oo = { class: "m-modal-body" };
var Ko = { key: 1, class: "icon-svg", focusable: "false", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Yo = { key: 2, class: "icon-svg", focusable: "false", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Uo = { key: 3, class: "icon-svg", focusable: "false", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Go = { key: 4, class: "icon-svg", focusable: "false", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", "fill-rule": "evenodd", viewBox: "64 64 896 896" };
var Zo = { key: 5, class: "icon-svg", focusable: "false", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Xo = { class: "modal-title" };
var Qo = { class: "modal-content" };
var Jo = { class: "modal-btns" };
var ya = N(defineComponent({ __name: "Modal", props: { width: { default: 420 }, title: { default: void 0 }, content: { default: void 0 }, icon: { default: void 0 }, cancelText: { default: "取消" }, cancelProps: { default: () => ({}) }, okText: { default: "确定" }, okType: { default: "primary" }, okProps: { default: () => ({}) }, noticeText: { default: "知道了" }, noticeProps: { default: () => ({}) }, centered: { type: Boolean, default: true }, top: { default: 100 }, loading: { type: Boolean, default: false }, open: { type: Boolean, default: false } }, emits: ["update:open", "cancel", "ok", "know"], setup(d, { expose: a, emit: e }) {
  const l = d, t = ref(), n = ref(), u = ref(), o = ref(), f = ref(), v = ref(), h2 = ref(), w = ref(), m = e;
  async function g() {
    var y, c, $;
    ((y = v.value) == null ? void 0 : y.width) !== void 0 ? u.value = typeof v.value.width == "number" ? v.value.width + "px" : v.value.width : u.value = typeof l.width == "number" ? l.width + "px" : l.width, ((c = v.value) == null ? void 0 : c.centered) !== void 0 ? o.value = v.value.centered : o.value = l.centered, (($ = v.value) == null ? void 0 : $.top) !== void 0 ? f.value = typeof v.value.top == "number" ? v.value.top + "px" : v.value.top : f.value = typeof l.top == "number" ? l.top + "px" : l.top, t.value = true, m("update:open", true), await nextTick(), w.value.focus();
  }
  function p() {
    t.value = false, m("update:open", false), m("cancel");
  }
  function k() {
    var y;
    (y = v.value) != null && y.onCancel && v.value.onCancel(), t.value = false, m("update:open", false), m("cancel");
  }
  async function z() {
    var y;
    (y = v.value) != null && y.onOk && (n.value = true, await v.value.onOk(), n.value = false), t.value = false, m("update:open", false), m("ok");
  }
  function M() {
    var y;
    (y = v.value) != null && y.onKnow && v.value.onKnow(), t.value = false, m("update:open", false), m("know");
  }
  return watchEffect(() => {
    t.value = l.open;
  }), watchEffect(() => {
    n.value = l.loading;
  }), a({ info: function(y) {
    h2.value = "info", v.value = y, g();
  }, success: function(y) {
    h2.value = "success", v.value = y, g();
  }, error: function(y) {
    h2.value = "error", v.value = y, g();
  }, warning: function(y) {
    h2.value = "warning", v.value = y, g();
  }, confirm: function(y) {
    h2.value = "confirm", v.value = y, g();
  }, erase: function(y) {
    h2.value = "erase", v.value = y, g();
  } }), (y, c) => (openBlock(), createElementBlock("div", Wo, [createVNode(Transition, { name: "fade" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", No, null, 512), [[vShow, t.value]])]), _: 1 }), createVNode(Transition, { name: "zoom" }, { default: withCtx(() => {
    var $, x, C, L, T, P, q, Z, U, le;
    return [withDirectives(createBaseVNode("div", { class: "m-modal-wrap", onClick: withModifiers(p, ["self"]) }, [createBaseVNode("div", { ref_key: "modalRef", ref: w, tabindex: "-1", class: normalizeClass(["m-modal", [o.value ? "relative-hv-center" : "top-center", ($ = v.value) == null ? void 0 : $.class]]), style: normalizeStyle([`width: ${u.value}; top: ${o.value ? "50%" : f.value};`, (x = v.value) == null ? void 0 : x.style]), onKeydown: withKeys(k, ["esc"]) }, [createBaseVNode("div", qo, [createBaseVNode("div", Oo, [createBaseVNode("div", { class: normalizeClass(["modal-header", `icon-${h2.value}`]) }, [(C = v.value) != null && C.icon || y.icon ? (openBlock(), createBlock(resolveDynamicComponent(((L = v.value) == null ? void 0 : L.icon) || y.icon), { key: 0, class: "icon-svg" })) : h2.value === "confirm" || h2.value === "erase" ? (openBlock(), createElementBlock("svg", Ko, c[0] || (c[0] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1), createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1)]))) : h2.value === "info" ? (openBlock(), createElementBlock("svg", Yo, c[1] || (c[1] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1)]))) : h2.value === "success" ? (openBlock(), createElementBlock("svg", Uo, c[2] || (c[2] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1)]))) : h2.value === "error" ? (openBlock(), createElementBlock("svg", Go, c[3] || (c[3] = [createBaseVNode("path", { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" }, null, -1)]))) : h2.value === "warning" ? (openBlock(), createElementBlock("svg", Zo, c[4] || (c[4] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1)]))) : createCommentVNode("", true), createBaseVNode("div", Xo, toDisplayString(((T = v.value) == null ? void 0 : T.title) || y.title), 1)], 2), createBaseVNode("div", Qo, toDisplayString(((P = v.value) == null ? void 0 : P.content) || y.content), 1)]), createBaseVNode("div", Jo, [["confirm", "erase"].includes(h2.value) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(unref($e), mergeProps({ class: "mr8", onClick: k }, ((q = v.value) == null ? void 0 : q.cancelProps) || y.cancelProps), { default: withCtx(() => {
      var J;
      return [createTextVNode(toDisplayString(((J = v.value) == null ? void 0 : J.cancelText) || y.cancelText), 1)];
    }), _: 1 }, 16), createVNode(unref($e), mergeProps({ type: ((Z = v.value) == null ? void 0 : Z.okType) || y.okType, loading: n.value, onClick: z }, ((U = v.value) == null ? void 0 : U.okProps) || y.okProps), { default: withCtx(() => {
      var J;
      return [createTextVNode(toDisplayString(((J = v.value) == null ? void 0 : J.okText) || y.okText), 1)];
    }), _: 1 }, 16, ["type", "loading"])], 64)) : createCommentVNode("", true), ["info", "success", "error", "warning"].includes(h2.value) ? (openBlock(), createBlock(unref($e), mergeProps({ key: 1, type: "primary", loading: n.value, onClick: M }, ((le = v.value) == null ? void 0 : le.noticeProps) || y.noticeProps), { default: withCtx(() => {
      var J;
      return [createTextVNode(toDisplayString(((J = v.value) == null ? void 0 : J.noticeText) || y.noticeText), 1)];
    }), _: 1 }, 16, ["loading"])) : createCommentVNode("", true)])])], 38)], 512), [[vShow, t.value]])];
  }), _: 1 })]));
} }), [["__scopeId", "data-v-ab591a72"]]);
ya.install = (d) => {
  d.component(ya.__name, ya);
};
var es = ["onMouseenter", "onMouseleave"];
var as = { key: 1, class: "icon-svg", viewBox: "64 64 896 896", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", focusable: "false" };
var ls = { key: 2, class: "icon-svg", viewBox: "64 64 896 896", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", focusable: "false" };
var ts = { key: 3, class: "icon-svg", viewBox: "64 64 896 896", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", focusable: "false" };
var os = { key: 4, class: "icon-svg", viewBox: "64 64 896 896", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", focusable: "false" };
var ss = { class: "notification-content" };
var is = { class: "notification-title" };
var ns = { class: "notification-description" };
var us = ["onClick"];
var ds = defineComponent({ __name: "Notification", props: { title: { default: void 0 }, description: { default: void 0 }, duration: { default: 4500 }, top: { default: 24 }, bottom: { default: 24 }, placement: { default: "topRight" } }, emits: ["close"], setup(d, { expose: a, emit: e }) {
  const l = d, t = ref(), n = ref([]), u = ref([]), o = ref([]), f = ref(null), v = ref(), h2 = ref(), w = e, m = computed(() => ["topRight", "topLeft"].includes(v.value) ? { top: l.top + "px" } : {}), g = computed(() => ["bottomRight", "bottomLeft"].includes(v.value) ? { bottom: l.bottom + "px" } : {}), p = computed(() => n.value.length === o.value.length);
  function k(c) {
    (function($) {
      u.value[$] && be(u.value[$]), u.value[$] = null;
    })(c);
  }
  function z(c) {
    f.value !== null && (u.value[c] = xe(() => {
      M(c);
    }, f.value));
  }
  async function M(c) {
    h2.value[c].style.maxHeight = h2.value[c].offsetHeight + "px", await nextTick(), n.value.push(c), o.value[c].onClose && o.value[c].onClose(), w("close");
  }
  function y() {
    t.value && be(t.value), u.value.push(null);
    const c = o.value.length - 1, $ = o.value[c];
    $.placement && (v.value = $.placement), $.duration !== null ? (f.value = $.duration || l.duration, z(c)) : f.value = null;
  }
  return watch(p, (c, $) => {
    !$ && c && (t.value = xe(() => {
      n.value.splice(0), o.value.splice(0);
    }, 300));
  }, { flush: "post" }), watchEffect(() => {
    v.value = l.placement;
  }), a({ open: function(c) {
    o.value.push({ ...c, mode: "open" }), y();
  }, info: function(c) {
    o.value.push({ ...c, mode: "info" }), y();
  }, success: function(c) {
    o.value.push({ ...c, mode: "success" }), y();
  }, error: function(c) {
    o.value.push({ ...c, mode: "error" }), y();
  }, warning: function(c) {
    o.value.push({ ...c, mode: "warning" }), y();
  } }), (c, $) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-notification-wrap", `notification-${v.value}`]), style: normalizeStyle({ ...m.value, ...g.value }) }, [createVNode(TransitionGroup, { name: ["topRight", "bottomRight"].includes(v.value) ? "right" : "left" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (x, C) => withDirectives((openBlock(), createElementBlock("div", { ref_for: true, ref_key: "notificationRef", ref: h2, class: normalizeClass(["m-notification-content", [`icon-${x.mode}`, x.class]]), style: normalizeStyle(x.style), key: C, onMouseenter: (L) => k(C), onMouseleave: (L) => function(T) {
    n.value.includes(T) || z(T);
  }(C) }, [x.icon ? (openBlock(), createBlock(resolveDynamicComponent(x.icon), { key: 0, class: "icon-svg" })) : x.mode === "info" ? (openBlock(), createElementBlock("svg", as, $[0] || ($[0] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1), createBaseVNode("path", { d: "M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1)]))) : x.mode === "success" ? (openBlock(), createElementBlock("svg", ls, $[1] || ($[1] = [createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1), createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)]))) : x.mode === "warning" ? (openBlock(), createElementBlock("svg", ts, $[2] || ($[2] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1), createBaseVNode("path", { d: "M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1)]))) : x.mode === "error" ? (openBlock(), createElementBlock("svg", os, $[3] || ($[3] = [createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1), createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)]))) : createCommentVNode("", true), createBaseVNode("div", ss, [createBaseVNode("div", is, toDisplayString(x.title || c.title), 1), createBaseVNode("div", ns, toDisplayString(x.description || c.description), 1)]), createBaseVNode("a", { tabindex: "0", class: "notification-close", onClick: (L) => M(C) }, $[4] || ($[4] = [createBaseVNode("svg", { class: "close-svg", viewBox: "64 64 896 896", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1)]), 8, us)], 46, es)), [[vShow, !n.value.includes(C)]])), 128))]), _: 1 }, 8, ["name"])], 6));
} });
var ba = N(ds, [["__scopeId", "data-v-53b8ddd8"]]);
ba.install = (d) => {
  d.component(ba.__name, ba);
};
var wa = defineComponent({ __name: "NumberAnimation", props: { from: { default: 0 }, to: { default: 1e3 }, duration: { default: 3e3 }, autoplay: { type: Boolean, default: true }, precision: { default: 0 }, prefix: { default: void 0 }, suffix: { default: void 0 }, separator: { default: "," }, decimal: { default: "." }, valueStyle: { default: () => ({}) }, transition: { default: "easeInOutCubic" } }, emits: ["started", "finished"], setup(d, { expose: a, emit: e }) {
  const l = d, t = ref(l.from);
  watchEffect(() => {
    t.value = l.from;
  }), watch([() => l.from, () => l.to], () => {
    l.autoplay && u();
  }), onMounted(() => {
    l.autoplay && u();
  });
  const n = useTransition(t, { duration: l.duration, transition: TransitionPresets[l.transition], onFinished: () => f("finished"), onStarted: () => f("started") });
  function u() {
    t.value = l.to;
  }
  const o = computed(() => {
    const { precision: v, separator: h2, decimal: w, prefix: m, suffix: g } = l;
    return ol(n.value, v, h2, w, m, g);
  }), f = e;
  return a({ play: u }), (v, h2) => (openBlock(), createElementBlock("span", { style: normalizeStyle(v.valueStyle) }, toDisplayString(o.value), 5));
} });
wa.install = (d) => {
  d.component(wa.__name, wa);
};
var rs = { class: "m-popconfirm-message" };
var cs = { key: 0, class: "icon-svg", focusable: "false", width: "1em", height: "1em", fill: "currentColor", viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true" };
var vs = { key: 1, class: "icon-svg", focusable: "false", width: "1em", height: "1em", fill: "currentColor", viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true" };
var ps = { key: 2, class: "icon-svg", focusable: "false", width: "1em", height: "1em", fill: "currentColor", viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true" };
var fs = { key: 3, class: "icon-svg", focusable: "false", width: "1em", height: "1em", fill: "currentColor", viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true" };
var hs = { class: "popconfirm-buttons" };
var ms = { key: 0, class: "popconfirm-arrow" };
var ka = N(defineComponent({ __name: "Popconfirm", props: { maxWidth: { default: "auto" }, title: { default: void 0 }, titleStyle: { default: () => ({}) }, description: { default: void 0 }, descriptionStyle: { default: () => ({}) }, bgColor: { default: "#fff" }, popconfirmStyle: { default: () => ({}) }, content: { default: void 0 }, icon: { default: void 0 }, iconType: { default: "warning" }, iconStyle: {}, cancelText: { default: "取消" }, cancelType: { default: "default" }, cancelProps: { default: () => ({}) }, okText: { default: "确定" }, okType: { default: "primary" }, okProps: { default: () => ({}) }, showCancel: { type: Boolean, default: true }, arrow: { type: Boolean, default: true }, trigger: { default: "click" }, showDelay: { default: 100 }, hideDelay: { default: 100 }, show: { type: Boolean, default: false } }, emits: ["update:show", "cancel", "ok", "openChange"], setup(d, { emit: a }) {
  const e = d, l = ref(false), t = ref(0), n = ref(0), u = ref(), o = ref(), f = ref(), v = ref(true), h2 = a, w = he(["description"]), m = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth);
  watch(m, () => {
    p();
  }, { flush: "post" });
  const g = computed(() => w.description || e.description);
  function p() {
    const x = u.value.offsetWidth, C = o.value.offsetWidth, L = o.value.offsetHeight;
    t.value = L + (e.arrow ? 4 : 6), n.value = (C - x) / 2;
  }
  function k() {
    f.value && be(f.value), l.value || (p(), xe(() => {
      l.value = true, h2("update:show", true), h2("openChange", true);
    }, e.showDelay));
  }
  function z() {
    f.value = xe(() => {
      l.value = false, h2("update:show", false), h2("openChange", false);
    }, e.hideDelay);
  }
  function M() {
    v.value = false;
  }
  function y() {
    v.value = true, o.value.focus();
  }
  function c(x) {
    h2("cancel", x), z();
  }
  function $(x) {
    h2("ok", x), z();
  }
  return (x, C) => (openBlock(), createElementBlock("div", { class: "m-popconfirm-wrap", onMouseenter: C[6] || (C[6] = (L) => x.trigger === "hover" ? k() : M()), onMouseleave: C[7] || (C[7] = (L) => x.trigger === "hover" ? z() : y()) }, [createBaseVNode("div", { ref_key: "popconfirmRef", ref: o, tabindex: "1", class: normalizeClass(["m-popconfirm-content", { "popconfirm-padding": x.arrow, "popconfirm-visible": l.value }]), style: normalizeStyle(`max-width: ${m.value}; --popover-background-color: ${x.bgColor}; transform-origin: 50% ${t.value}px; top: ${-t.value}px; left: ${-n.value}px;`), onBlur: C[0] || (C[0] = (L) => x.trigger === "click" && v.value ? z() : () => false), onMouseenter: C[1] || (C[1] = (L) => x.trigger === "hover" ? k() : () => false), onMouseleave: C[2] || (C[2] = (L) => x.trigger === "hover" ? z() : () => false), onKeydown: withKeys(c, ["esc"]) }, [createBaseVNode("div", { class: "m-popconfirm", style: normalizeStyle(x.popconfirmStyle) }, [createBaseVNode("div", rs, [createBaseVNode("span", { class: normalizeClass(["m-popconfirm-icon", `icon-${x.iconType}`]), style: normalizeStyle(x.iconStyle) }, [renderSlot(x.$slots, "icon", {}, () => [x.iconType === "info" ? (openBlock(), createElementBlock("svg", cs, C[8] || (C[8] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1)]))) : createCommentVNode("", true), x.iconType === "success" ? (openBlock(), createElementBlock("svg", vs, C[9] || (C[9] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1)]))) : createCommentVNode("", true), x.iconType === "danger" ? (openBlock(), createElementBlock("svg", ps, C[10] || (C[10] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1)]))) : createCommentVNode("", true), x.iconType === "warning" ? (openBlock(), createElementBlock("svg", fs, C[11] || (C[11] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1)]))) : createCommentVNode("", true)], true)], 6), createBaseVNode("div", { class: normalizeClass(["popconfirm-title", { "title-font-weight": g.value }]), style: normalizeStyle(x.titleStyle) }, [renderSlot(x.$slots, "title", {}, () => [createTextVNode(toDisplayString(x.title), 1)], true)], 6)]), g.value ? (openBlock(), createElementBlock("div", { key: 0, class: "popconfirm-description", style: normalizeStyle(x.descriptionStyle) }, [renderSlot(x.$slots, "description", {}, () => [createTextVNode(toDisplayString(x.description), 1)], true)], 4)) : createCommentVNode("", true), createBaseVNode("div", hs, [x.showCancel ? (openBlock(), createBlock(unref($e), mergeProps({ key: 0, size: "small", type: x.cancelType, onClick: c }, x.cancelProps), { default: withCtx(() => [renderSlot(x.$slots, "cancelText", {}, () => [createTextVNode(toDisplayString(x.cancelText), 1)], true)]), _: 3 }, 16, ["type"])) : createCommentVNode("", true), createVNode(unref($e), mergeProps({ size: "small", type: x.okType, onClick: $ }, x.okProps), { default: withCtx(() => [renderSlot(x.$slots, "okText", {}, () => [createTextVNode(toDisplayString(x.okText), 1)], true)]), _: 3 }, 16, ["type"])])], 4), x.arrow ? (openBlock(), createElementBlock("div", ms)) : createCommentVNode("", true)], 38), createBaseVNode("div", { ref_key: "contentRef", ref: u, onClick: C[3] || (C[3] = (L) => x.trigger === "click" ? void (l.value ? z() : k()) : () => false), onMouseenter: C[4] || (C[4] = (L) => x.trigger === "click" && l.value ? M() : () => false), onMouseleave: C[5] || (C[5] = (L) => x.trigger === "click" && l.value ? y() : () => false) }, [renderSlot(x.$slots, "default", {}, () => [createTextVNode(toDisplayString(x.content), 1)], true)], 544)], 32));
} }), [["__scopeId", "data-v-0df5d929"]]);
ka.install = (d) => {
  d.component(ka.__name, ka);
};
var gs = { key: 0, class: "popover-arrow" };
var xa = N(defineComponent({ __name: "Popover", props: { maxWidth: { default: "auto" }, title: { default: void 0 }, titleStyle: { default: () => ({}) }, content: { default: void 0 }, contentStyle: { default: () => ({}) }, bgColor: { default: "#fff" }, popoverStyle: { default: () => ({}) }, arrow: { type: Boolean, default: true }, trigger: { default: "hover" }, showDelay: { default: 100 }, hideDelay: { default: 100 }, show: { type: Boolean, default: false } }, emits: ["update:show", "openChange"], setup(d, { emit: a }) {
  const e = d, l = ref(false), t = ref(0), n = ref(0), u = ref(), o = ref(), f = ref(), v = ref(false), h2 = a, w = he(["title", "content"]), m = computed(() => typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth), g = computed(() => w.title || e.title), p = computed(() => w.content || e.content);
  function k() {
    const y = u.value.offsetWidth, c = o.value.offsetWidth, $ = o.value.offsetHeight;
    t.value = $ + (e.arrow ? 4 : 6), n.value = (c - y) / 2;
  }
  function z() {
    f.value && be(f.value), l.value || (k(), xe(() => {
      l.value = true, h2("update:show", true), h2("openChange", true);
    }, e.showDelay));
  }
  function M() {
    f.value = xe(() => {
      l.value = false, h2("update:show", false), h2("openChange", false);
    }, e.hideDelay);
  }
  return watch(m, () => {
    k();
  }, { flush: "post" }), watchEffect(() => {
    l.value = e.show;
  }), (y, c) => (openBlock(), createElementBlock("div", { class: "m-popover-wrap", onMouseenter: c[6] || (c[6] = ($) => y.trigger === "hover" ? z() : () => false), onMouseleave: c[7] || (c[7] = ($) => y.trigger === "hover" ? M() : () => false) }, [createBaseVNode("div", { ref_key: "popoverRef", ref: o, tabindex: "1", class: normalizeClass(["m-pop-content", { "popover-padding": y.arrow, "popover-visible": l.value }]), style: normalizeStyle(`max-width: ${m.value}; --popover-background-color: ${y.bgColor}; transform-origin: 50% ${t.value}px; top: ${-t.value}px; left: ${-n.value}px;`), onBlur: c[0] || (c[0] = ($) => y.trigger === "click" && v.value ? (l.value = false, h2("update:show", false), void h2("openChange", false)) : () => false), onMouseenter: c[1] || (c[1] = ($) => y.trigger === "hover" ? z() : () => false), onMouseleave: c[2] || (c[2] = ($) => y.trigger === "hover" ? M() : () => false) }, [createBaseVNode("div", { class: "m-popover", style: normalizeStyle(y.popoverStyle) }, [g.value ? (openBlock(), createElementBlock("div", { key: 0, class: "popover-title", style: normalizeStyle(y.titleStyle) }, [renderSlot(y.$slots, "title", {}, () => [createTextVNode(toDisplayString(y.title), 1)], true)], 4)) : createCommentVNode("", true), p.value ? (openBlock(), createElementBlock("div", { key: 1, class: "popover-content", style: normalizeStyle(y.contentStyle) }, [renderSlot(y.$slots, "content", {}, () => [createTextVNode(toDisplayString(y.content), 1)], true)], 4)) : createCommentVNode("", true)], 4), y.arrow ? (openBlock(), createElementBlock("div", gs)) : createCommentVNode("", true)], 38), createBaseVNode("div", { ref_key: "defaultRef", ref: u, onClick: c[3] || (c[3] = ($) => y.trigger === "click" ? void (l.value ? M() : z()) : () => false), onMouseenter: c[4] || (c[4] = ($) => y.trigger === "click" && l.value ? void (v.value = false) : () => false), onMouseleave: c[5] || (c[5] = ($) => y.trigger === "click" && l.value ? (v.value = true, void o.value.focus()) : () => false) }, [renderSlot(y.$slots, "default", {}, void 0, true)], 544)], 32));
} }), [["__scopeId", "data-v-511dbc5c"]]);
xa.install = (d) => {
  d.component(xa.__name, xa);
};
var ys = { class: "m-progress-inner" };
var bs = { key: 0, class: "progress-success" };
var ws = { key: 0, class: "icon-svg", focusable: "false", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var ks = { key: 1, class: "progress-success-info" };
var xs = { key: 1, class: "progress-text" };
var Ms = { class: "progress-circle", viewBox: "0 0 100 100" };
var _s = { key: 0 };
var Cs = { id: "circleGradient", x1: "100%", y1: "0%", x2: "0%", y2: "0%" };
var zs = ["stop-color"];
var $s = ["stop-color"];
var Bs = ["d", "stroke-linecap", "stroke-width"];
var Ss = ["d", "stroke-linecap", "stroke-width", "stroke", "opacity"];
var Ls = { key: 0, class: "icon-svg", focusable: "false", "data-icon": "check", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Fs = { key: 1, class: "progress-success-info" };
var As = { key: 2, class: "progress-text" };
var Ma = N(defineComponent({ __name: "Progress", props: { width: { default: "100%" }, percent: { default: 0 }, strokeWidth: { default: 8 }, strokeColor: { default: "#1677FF" }, strokeLinecap: { default: "round" }, showInfo: { type: Boolean, default: true }, success: { default: void 0 }, format: { type: Function, default: (d) => d + "%" }, type: { default: "line" } }, setup(d) {
  const a = d, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), l = computed(() => (100 - a.strokeWidth) * Math.PI), t = computed(() => {
    const m = 100 - a.strokeWidth;
    return `M 50,50 m 0,-${m / 2}
   a ${m / 2},${m / 2} 0 1 1 0,${m}
   a ${m / 2},${m / 2} 0 1 1 0,-${m}`;
  }), n = computed(() => typeof a.strokeColor != "string"), u = computed(() => typeof a.strokeColor == "string" ? a.strokeColor : `linear-gradient(to ${a.strokeColor.direction || "right"}, ${a.strokeColor["0%"] || a.strokeColor.from}, ${a.strokeColor["100%"] || a.strokeColor.to})`), o = computed(() => {
    if (n.value) {
      const m = a.strokeColor;
      return m.direction && m.direction !== "right" ? m["100%"] || m.to : m["0%"] || m.from;
    }
  }), f = computed(() => {
    if (n.value) {
      const m = a.strokeColor;
      return m.direction && m.direction !== "right" ? m["0%"] || m.from : m["100%"] || m.to;
    }
  }), v = computed(() => a.format(a.percent > 100 ? 100 : a.percent)), h2 = he(["success"]), w = computed(() => h2.success || a.success);
  return (m, g) => m.type === "line" ? (openBlock(), createElementBlock("div", { key: 0, class: "m-progress-line", style: normalizeStyle(`width: ${e.value}; height: ${m.strokeWidth < 24 ? 24 : m.strokeWidth}px;`) }, [createBaseVNode("div", ys, [createBaseVNode("div", { class: normalizeClass(["progress-bg", { "line-success": m.percent >= 100 && !n.value }]), style: normalizeStyle(`background: ${u.value}; width: ${m.percent >= 100 ? 100 : m.percent}%; height: ${m.strokeWidth}px; --border-radius: ${m.strokeLinecap === "round" ? "100px" : 0};`) }, null, 6)]), m.showInfo ? (openBlock(), createBlock(Transition, { key: 0, name: "fade", mode: "out-in" }, { default: withCtx(() => [m.percent >= 100 ? (openBlock(), createElementBlock("span", bs, [w.value === void 0 ? (openBlock(), createElementBlock("svg", ws, g[0] || (g[0] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1)]))) : (openBlock(), createElementBlock("p", ks, [renderSlot(m.$slots, "success", {}, () => [createTextVNode(toDisplayString(m.success), 1)], true)]))])) : (openBlock(), createElementBlock("p", xs, [renderSlot(m.$slots, "format", { percent: m.percent }, () => [createTextVNode(toDisplayString(v.value), 1)], true)]))]), _: 3 })) : createCommentVNode("", true)], 4)) : (openBlock(), createElementBlock("div", { key: 1, class: "m-progress-circle", style: normalizeStyle(`width: ${e.value}; height: ${e.value};`) }, [(openBlock(), createElementBlock("svg", Ms, [n.value ? (openBlock(), createElementBlock("defs", _s, [createBaseVNode("linearGradient", Cs, [createBaseVNode("stop", { offset: "0%", "stop-color": o.value }, null, 8, zs), createBaseVNode("stop", { offset: "100%", "stop-color": f.value }, null, 8, $s)])])) : createCommentVNode("", true), createBaseVNode("path", { d: t.value, "stroke-linecap": m.strokeLinecap, class: "circle-trail", "stroke-width": m.strokeWidth, style: normalizeStyle(`stroke-dasharray: ${l.value}px, ${l.value}px;`), "fill-opacity": "0" }, null, 12, Bs), createBaseVNode("path", { d: t.value, "stroke-linecap": m.strokeLinecap, class: normalizeClass(["circle-path", { "circle-path-success": m.percent >= 100 && !n.value }]), "stroke-width": m.strokeWidth, stroke: n.value ? "url(#circleGradient)" : u.value, style: normalizeStyle(`stroke-dasharray: ${m.percent / 100 * l.value}px, ${l.value}px;`), opacity: m.percent === 0 ? 0 : 1, "fill-opacity": "0" }, null, 14, Ss)])), m.showInfo ? (openBlock(), createBlock(Transition, { key: 0, name: "fade", mode: "out-in" }, { default: withCtx(() => [w.value === void 0 && m.percent >= 100 ? (openBlock(), createElementBlock("svg", Ls, g[1] || (g[1] = [createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1)]))) : m.percent >= 100 ? (openBlock(), createElementBlock("p", Fs, [renderSlot(m.$slots, "success", {}, () => [createTextVNode(toDisplayString(m.success), 1)], true)])) : (openBlock(), createElementBlock("p", As, [renderSlot(m.$slots, "format", { percent: m.percent }, () => [createTextVNode(toDisplayString(v.value), 1)], true)]))]), _: 3 })) : createCommentVNode("", true)], 4));
} }), [["__scopeId", "data-v-12941e64"]]);
Ma.install = (d) => {
  d.component(Ma.__name, Ma);
};
var Ds = ["src"];
var _a2 = N(defineComponent({ __name: "QRCode", props: { value: { default: void 0 }, size: { default: 160 }, color: { default: "#000" }, bgColor: { default: "#FFF" }, bordered: { type: Boolean, default: true }, borderColor: { default: "#0505050f" }, scale: { default: 8 }, errorLevel: { default: "H" } }, setup(d) {
  const a = d, e = computed(() => useQRCode(a.value || "", { errorCorrectionLevel: a.errorLevel, type: "image/png", quality: 1, margin: 3, scale: a.scale, color: { dark: a.color, light: a.bgColor } }));
  return (l, t) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-qrcode", { "qrcode-bordered": l.bordered }]), style: normalizeStyle(`width: ${l.size}px; height: ${l.size}px; border-color: ${l.borderColor};`) }, [createBaseVNode("img", { src: e.value.value, class: "qrcode-image", alt: "QRCode" }, null, 8, Ds)], 6));
} }), [["__scopeId", "data-v-885ceed3"]]);
_a2.install = (d) => {
  d.component(_a2.__name, _a2);
};
var Es = ["onClick"];
var Ts = { class: "radio-label" };
var Hs = ["onClick"];
var Is = { class: "radio-label" };
var Ps = defineComponent({ __name: "Radio", props: { options: { default: () => [] }, disabled: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, value: { default: null }, gap: { default: 8 }, button: { type: Boolean, default: false }, buttonStyle: { default: "outline" }, buttonSize: { default: "middle" } }, emits: ["update:value", "change"], setup(d, { emit: a }) {
  const e = d, l = a;
  function t(n) {
    n !== e.value && (l("update:value", n), l("change", n));
  }
  return (n, u) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio", { "radio-vertical": !n.button && n.vertical, "radio-button-solid": n.buttonStyle === "solid", "radio-button-small": n.button && n.buttonSize === "small", "radio-button-large": n.button && n.buttonSize === "large" }]), style: normalizeStyle(`gap: ${n.button ? 0 : n.gap}px;`) }, [n.button ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(n.options, (o, f) => (openBlock(), createElementBlock("div", { tabindex: "0", class: normalizeClass(["m-radio-button-wrap", { "radio-button-checked": n.value === o.value, "radio-button-disabled": n.disabled || o.disabled }]), key: f, onClick: (v) => n.disabled || o.disabled ? () => false : t(o.value) }, [createBaseVNode("span", Is, [renderSlot(n.$slots, "default", { label: o.label }, () => [createTextVNode(toDisplayString(o.label), 1)], true)])], 10, Hs))), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(n.options, (o, f) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio-wrap", { "radio-disabled": n.disabled || o.disabled }]), key: f, onClick: (v) => n.disabled || o.disabled ? () => false : t(o.value) }, [createBaseVNode("span", { class: normalizeClass(["radio-handle", { "radio-checked": n.value === o.value }]) }, null, 2), createBaseVNode("span", Ts, [renderSlot(n.$slots, "default", { label: o.label }, () => [createTextVNode(toDisplayString(o.label), 1)], true)])], 10, Es))), 128))], 6));
} });
var Ca2 = N(Ps, [["__scopeId", "data-v-17983c9e"]]);
Ca2.install = (d) => {
  d.component(Ca2.__name, Ca2);
};
var Vs = ["onClick"];
var Rs = ["onClick", "onMouseenter"];
var js = { key: 0, class: "icon-character", focusable: "false", "data-icon": "star", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Ws = { key: 1, class: "icon-character", focusable: "false", "data-icon": "star", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Ns = { key: 2, class: "icon-character", focusable: "false", "data-icon": "heart", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var qs = { key: 3, class: "icon-character", focusable: "false", "data-icon": "heart", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Os = { key: 4, class: "icon-character" };
var Ks = ["onClick", "onMouseenter"];
var Ys = { key: 0, class: "icon-character", focusable: "false", "data-icon": "star", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Us = { key: 1, class: "icon-character", focusable: "false", "data-icon": "star", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Gs = { key: 2, class: "icon-character", focusable: "false", "data-icon": "heart", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Zs = { key: 3, class: "icon-character", focusable: "false", "data-icon": "heart", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Xs = { key: 4, class: "icon-character" };
var za2 = N(defineComponent({ __name: "Rate", props: { allowClear: { type: Boolean, default: true }, allowHalf: { type: Boolean, default: false }, count: { default: 5 }, character: { default: "star-filled" }, size: { default: 20 }, color: { default: "#fadb14" }, gap: { default: 8 }, disabled: { type: Boolean, default: false }, value: { default: 0 } }, emits: ["update:value", "change", "hoverChange"], setup(d, { emit: a }) {
  const e = d, l = ref(e.value), t = ref();
  watch(() => e.value, (v) => {
    l.value = v;
  });
  const n = a;
  function u(v) {
    t.value = null, v !== e.value ? (n("change", v), n("update:value", v)) : e.allowClear ? (t.value = v, n("change", 0), n("update:value", 0)) : n("change", v);
  }
  function o() {
    t.value = null;
  }
  function f() {
    l.value = e.value;
  }
  return (v, h2) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-rate", { "rate-disabled": v.disabled }]), style: normalizeStyle(`--star-color: ${v.color}; --star-gap: ${v.gap}px; --star-size: ${v.size}px;`), onMouseleave: f }, [(openBlock(true), createElementBlock(Fragment, null, renderList(v.count, (w) => (openBlock(), createElementBlock("div", { class: normalizeClass(["rate-star", { "star-half": v.allowHalf && l.value >= w - 0.5 && l.value < w, "star-full": l.value >= w, "temp-gray": !v.allowHalf && t.value === w }]), onClick: (m) => v.allowHalf ? () => false : u(w), key: w }, [v.allowHalf ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["star-first", { "temp-gray-first": t.value === w - 0.5 }]), onClick: withModifiers((m) => u(w - 0.5), ["stop"]), onMouseenter: (m) => {
    return g = w - 0.5, l.value = g, void n("hoverChange", g);
    var g;
  }, onMouseleave: o }, [renderSlot(v.$slots, "character", {}, () => [v.character === "star-filled" ? (openBlock(), createElementBlock("svg", js, h2[0] || (h2[0] = [createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1)]))) : v.character === "star-outlined" ? (openBlock(), createElementBlock("svg", Ws, h2[1] || (h2[1] = [createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1)]))) : v.character === "heart-filled" ? (openBlock(), createElementBlock("svg", Ns, h2[2] || (h2[2] = [createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1)]))) : v.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", qs, h2[3] || (h2[3] = [createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1)]))) : v.character ? (openBlock(), createElementBlock("span", Os, toDisplayString(v.character), 1)) : createCommentVNode("", true)], true)], 42, Rs)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["star-second", { "temp-gray-second": t.value === w }]), onClick: withModifiers((m) => u(w), ["stop"]), onMouseenter: (m) => {
    return g = w, l.value = g, void n("hoverChange", g);
    var g;
  }, onMouseleave: o }, [renderSlot(v.$slots, "character", {}, () => [v.character === "star-filled" ? (openBlock(), createElementBlock("svg", Ys, h2[4] || (h2[4] = [createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1)]))) : v.character === "star-outlined" ? (openBlock(), createElementBlock("svg", Us, h2[5] || (h2[5] = [createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1)]))) : v.character === "heart-filled" ? (openBlock(), createElementBlock("svg", Gs, h2[6] || (h2[6] = [createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1)]))) : v.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", Zs, h2[7] || (h2[7] = [createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1)]))) : (openBlock(), createElementBlock("span", Xs, toDisplayString(v.character), 1))], true)], 42, Ks)], 10, Vs))), 128))], 38));
} }), [["__scopeId", "data-v-5bfb895d"]]);
za2.install = (d) => {
  d.component(za2.__name, za2);
};
var Qs = { class: "m-result" };
var Js = { class: "result-image" };
var ei = { key: 0, class: "icon-svg icon-info", focusable: "false", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var ai = { key: 1, class: "icon-svg icon-success", focusable: "false", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var li = { key: 2, class: "icon-svg icon-warning", focusable: "false", "data-icon": "warning", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var ti = { key: 3, class: "icon-svg icon-error", focusable: "false", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var oi = { key: 4, class: "result-icon", width: "251", height: "294" };
var si = { key: 5, class: "result-icon", width: "252", height: "294" };
var ii = { key: 6, class: "result-icon", width: "254", height: "294" };
var ni = { key: 0, class: "result-title" };
var ui = { key: 1, class: "result-subtitle" };
var di = { key: 2, class: "result-extra" };
var ri = { key: 3, class: "result-content" };
var $a2 = N(defineComponent({ __name: "Result", props: { icon: { default: void 0 }, status: { default: "info" }, title: { default: void 0 }, subTitle: { default: void 0 }, extra: { default: void 0 } }, setup(d) {
  const a = d, e = he(["title", "subTitle", "extra", "default"]), l = computed(() => e.title || a.title), t = computed(() => e.subTitle || a.subTitle), n = computed(() => e.extra || a.extra);
  return (u, o) => (openBlock(), createElementBlock("div", Qs, [createBaseVNode("div", Js, [renderSlot(u.$slots, "icon", {}, () => [u.status === "info" ? (openBlock(), createElementBlock("svg", ei, o[0] || (o[0] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1)]))) : createCommentVNode("", true), u.status === "success" ? (openBlock(), createElementBlock("svg", ai, o[1] || (o[1] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1)]))) : createCommentVNode("", true), u.status === "warning" ? (openBlock(), createElementBlock("svg", li, o[2] || (o[2] = [createBaseVNode("path", { d: "M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1)]))) : createCommentVNode("", true), u.status === "error" ? (openBlock(), createElementBlock("svg", ti, o[3] || (o[3] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1)]))) : createCommentVNode("", true), u.status === "403" ? (openBlock(), createElementBlock("svg", oi, o[4] || (o[4] = [createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-b826dc35><path d="M0 129.023v-2.084C0 58.364 55.591 2.774 124.165 2.774h2.085c68.574 0 124.165 55.59 124.165 124.165v2.084c0 68.575-55.59 124.166-124.165 124.166h-2.085C55.591 253.189 0 197.598 0 129.023" fill="#E4EBF7" data-v-b826dc35></path><path d="M41.417 132.92a8.231 8.231 0 1 1-16.38-1.65 8.231 8.231 0 0 1 16.38 1.65" fill="#FFF" data-v-b826dc35></path><path d="M38.652 136.36l10.425 5.91M49.989 148.505l-12.58 10.73" stroke="#FFF" stroke-width="2" data-v-b826dc35></path><path d="M41.536 161.28a5.636 5.636 0 1 1-11.216-1.13 5.636 5.636 0 0 1 11.216 1.13M59.154 145.261a5.677 5.677 0 1 1-11.297-1.138 5.677 5.677 0 0 1 11.297 1.138M100.36 29.516l29.66-.013a4.562 4.562 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 0 0 .005 9.126M111.705 47.754l29.659-.013a4.563 4.563 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 1 0 .005 9.126" fill="#FFF" data-v-b826dc35></path><path d="M114.066 29.503V29.5l15.698-.007a4.563 4.563 0 1 0 .004 9.126l-15.698.007v-.002a4.562 4.562 0 0 0-.004-9.122M185.405 137.723c-.55 5.455-5.418 9.432-10.873 8.882-5.456-.55-9.432-5.418-8.882-10.873.55-5.455 5.418-9.432 10.873-8.882 5.455.55 9.432 5.418 8.882 10.873" fill="#FFF" data-v-b826dc35></path><path d="M180.17 143.772l12.572 7.129M193.841 158.42L178.67 171.36" stroke="#FFF" stroke-width="2" data-v-b826dc35></path><path d="M185.55 171.926a6.798 6.798 0 1 1-13.528-1.363 6.798 6.798 0 0 1 13.527 1.363M204.12 155.285a6.848 6.848 0 1 1-13.627-1.375 6.848 6.848 0 0 1 13.626 1.375" fill="#FFF" data-v-b826dc35></path><path d="M152.988 194.074a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0zM225.931 118.217a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM217.09 153.051a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.42 0zM177.84 109.842a2.21 2.21 0 1 1-4.422 0 2.21 2.21 0 0 1 4.421 0zM196.114 94.454a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM202.844 182.523a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0z" stroke="#FFF" stroke-width="2" data-v-b826dc35></path><path stroke="#FFF" stroke-width="2" d="M215.125 155.262l-1.902 20.075-10.87 5.958M174.601 176.636l-6.322 9.761H156.98l-4.484 6.449M175.874 127.28V111.56M221.51 119.404l-12.77 7.859-15.228-7.86V96.668" data-v-b826dc35></path><path d="M180.68 29.32C180.68 13.128 193.806 0 210 0c16.193 0 29.32 13.127 29.32 29.32 0 16.194-13.127 29.322-29.32 29.322-16.193 0-29.32-13.128-29.32-29.321" fill="#A26EF4" data-v-b826dc35></path><path d="M221.45 41.706l-21.563-.125a1.744 1.744 0 0 1-1.734-1.754l.071-12.23a1.744 1.744 0 0 1 1.754-1.734l21.562.125c.964.006 1.74.791 1.735 1.755l-.071 12.229a1.744 1.744 0 0 1-1.754 1.734" fill="#FFF" data-v-b826dc35></path><path d="M215.106 29.192c-.015 2.577-2.049 4.654-4.543 4.64-2.494-.014-4.504-2.115-4.489-4.693l.04-6.925c.016-2.577 2.05-4.654 4.543-4.64 2.494.015 4.504 2.116 4.49 4.693l-.04 6.925zm-4.53-14.074a6.877 6.877 0 0 0-6.916 6.837l-.043 7.368a6.877 6.877 0 0 0 13.754.08l.042-7.368a6.878 6.878 0 0 0-6.837-6.917zM167.566 68.367h-3.93a4.73 4.73 0 0 1-4.717-4.717 4.73 4.73 0 0 1 4.717-4.717h3.93a4.73 4.73 0 0 1 4.717 4.717 4.73 4.73 0 0 1-4.717 4.717" fill="#FFF" data-v-b826dc35></path><path d="M168.214 248.838a6.611 6.611 0 0 1-6.61-6.611v-66.108a6.611 6.611 0 0 1 13.221 0v66.108a6.611 6.611 0 0 1-6.61 6.61" fill="#5BA02E" data-v-b826dc35></path><path d="M176.147 248.176a6.611 6.611 0 0 1-6.61-6.61v-33.054a6.611 6.611 0 1 1 13.221 0v33.053a6.611 6.611 0 0 1-6.61 6.611" fill="#92C110" data-v-b826dc35></path><path d="M185.994 293.89h-27.376a3.17 3.17 0 0 1-3.17-3.17v-45.887a3.17 3.17 0 0 1 3.17-3.17h27.376a3.17 3.17 0 0 1 3.17 3.17v45.886a3.17 3.17 0 0 1-3.17 3.17" fill="#F2D7AD" data-v-b826dc35></path><path d="M81.972 147.673s6.377-.927 17.566-1.28c11.729-.371 17.57 1.086 17.57 1.086s3.697-3.855.968-8.424c1.278-12.077 5.982-32.827.335-48.273-1.116-1.339-3.743-1.512-7.536-.62-1.337.315-7.147-.149-7.983-.1l-15.311-.347s-3.487-.17-8.035-.508c-1.512-.113-4.227-1.683-5.458-.338-.406.443-2.425 5.669-1.97 16.077l8.635 35.642s-3.141 3.61 1.219 7.085" fill="#FFF" data-v-b826dc35></path><path d="M75.768 73.325l-.9-6.397 11.982-6.52s7.302-.118 8.038 1.205c.737 1.324-5.616.993-5.616.993s-1.836 1.388-2.615 2.5c-1.654 2.363-.986 6.471-8.318 5.986-1.708.284-2.57 2.233-2.57 2.233" fill="#FFC6A0" data-v-b826dc35></path><path d="M52.44 77.672s14.217 9.406 24.973 14.444c1.061.497-2.094 16.183-11.892 11.811-7.436-3.318-20.162-8.44-21.482-14.496-.71-3.258 2.543-7.643 8.401-11.76M141.862 80.113s-6.693 2.999-13.844 6.876c-3.894 2.11-10.137 4.704-12.33 7.988-6.224 9.314 3.536 11.22 12.947 7.503 6.71-2.651 28.999-12.127 13.227-22.367" fill="#FFB594" data-v-b826dc35></path><path d="M76.166 66.36l3.06 3.881s-2.783 2.67-6.31 5.747c-7.103 6.195-12.803 14.296-15.995 16.44-3.966 2.662-9.754 3.314-12.177-.118-3.553-5.032.464-14.628 31.422-25.95" fill="#FFC6A0" data-v-b826dc35></path><path d="M64.674 85.116s-2.34 8.413-8.912 14.447c.652.548 18.586 10.51 22.144 10.056 5.238-.669 6.417-18.968 1.145-20.531-.702-.208-5.901-1.286-8.853-2.167-.87-.26-1.611-1.71-3.545-.936l-1.98-.869zM128.362 85.826s5.318 1.956 7.325 13.734c-.546.274-17.55 12.35-21.829 7.805-6.534-6.94-.766-17.393 4.275-18.61 4.646-1.121 5.03-1.37 10.23-2.929" fill="#FFF" data-v-b826dc35></path><path d="M78.18 94.656s.911 7.41-4.914 13.078" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M87.397 94.68s3.124 2.572 10.263 2.572c7.14 0 9.074-3.437 9.074-3.437" stroke="#E4EBF7" stroke-width=".932" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M117.184 68.639l-6.781-6.177s-5.355-4.314-9.223-.893c-3.867 3.422 4.463 2.083 5.653 4.165 1.19 2.082.848 1.143-2.083.446-5.603-1.331-2.082.893 2.975 5.355 2.091 1.845 6.992.955 6.992.955l2.467-3.851z" fill="#FFC6A0" data-v-b826dc35></path><path d="M105.282 91.315l-.297-10.937-15.918-.027-.53 10.45c-.026.403.17.788.515.999 2.049 1.251 9.387 5.093 15.799.424.287-.21.443-.554.431-.91" fill="#FFB594" data-v-b826dc35></path><path d="M107.573 74.24c.817-1.147.982-9.118 1.015-11.928a1.046 1.046 0 0 0-.965-1.055l-4.62-.365c-7.71-1.044-17.071.624-18.253 6.346-5.482 5.813-.421 13.244-.421 13.244s1.963 3.566 4.305 6.791c.756 1.041.398-3.731 3.04-5.929 5.524-4.594 15.899-7.103 15.899-7.103" fill="#5C2552" data-v-b826dc35></path><path d="M88.426 83.206s2.685 6.202 11.602 6.522c7.82.28 8.973-7.008 7.434-17.505l-.909-5.483c-6.118-2.897-15.478.54-15.478.54s-.576 2.044-.19 5.504c-2.276 2.066-1.824 5.618-1.824 5.618s-.905-1.922-1.98-2.321c-.86-.32-1.897.089-2.322 1.98-1.04 4.632 3.667 5.145 3.667 5.145" fill="#FFC6A0" data-v-b826dc35></path><path stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" d="M100.843 77.099l1.701-.928-1.015-4.324.674-1.406" data-v-b826dc35></path><path d="M105.546 74.092c-.022.713-.452 1.279-.96 1.263-.51-.016-.904-.607-.882-1.32.021-.713.452-1.278.96-1.263.51.016.904.607.882 1.32M97.592 74.349c-.022.713-.452 1.278-.961 1.263-.509-.016-.904-.607-.882-1.32.022-.713.452-1.279.961-1.263.51.016.904.606.882 1.32" fill="#552950" data-v-b826dc35></path><path d="M91.132 86.786s5.269 4.957 12.679 2.327" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M99.776 81.903s-3.592.232-1.44-2.79c1.59-1.496 4.897-.46 4.897-.46s1.156 3.906-3.457 3.25" fill="#DB836E" data-v-b826dc35></path><path d="M102.88 70.6s2.483.84 3.402.715M93.883 71.975s2.492-1.144 4.778-1.073" stroke="#5C2552" stroke-width="1.526" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M86.32 77.374s.961.879 1.458 2.106c-.377.48-1.033 1.152-.236 1.809M99.337 83.719s1.911.151 2.509-.254" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M87.782 115.821l15.73-3.012M100.165 115.821l10.04-2.008" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M66.508 86.763s-1.598 8.83-6.697 14.078" stroke="#E4EBF7" stroke-width="1.114" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M128.31 87.934s3.013 4.121 4.06 11.785" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M64.09 84.816s-6.03 9.912-13.607 9.903" stroke="#DB836E" stroke-width=".795" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M112.366 65.909l-.142 5.32s5.993 4.472 11.945 9.202c4.482 3.562 8.888 7.455 10.985 8.662 4.804 2.766 8.9 3.355 11.076 1.808 4.071-2.894 4.373-9.878-8.136-15.263-4.271-1.838-16.144-6.36-25.728-9.73" fill="#FFC6A0" data-v-b826dc35></path><path d="M130.532 85.488s4.588 5.757 11.619 6.214" stroke="#DB836E" stroke-width=".75" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M121.708 105.73s-.393 8.564-1.34 13.612" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M115.784 161.512s-3.57-1.488-2.678-7.14" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M101.52 290.246s4.326 2.057 7.408 1.03c2.842-.948 4.564.673 7.132 1.186 2.57.514 6.925 1.108 11.772-1.269-.104-5.551-6.939-4.01-12.048-6.763-2.582-1.39-3.812-4.757-3.625-8.863h-9.471s-1.402 10.596-1.169 14.68" fill="#CBD1D1" data-v-b826dc35></path><path d="M101.496 290.073s2.447 1.281 6.809.658c3.081-.44 3.74.485 7.479 1.039 3.739.554 10.802-.07 11.91-.9.415 1.108-.347 2.077-.347 2.077s-1.523.608-4.847.831c-2.045.137-5.843.293-7.663-.507-1.8-1.385-5.286-1.917-5.77-.243-3.947.958-7.41-.288-7.41-.288l-.16-2.667z" fill="#2B0849" data-v-b826dc35></path><path d="M108.824 276.19h3.116s-.103 6.751 4.57 8.62c-4.673.624-8.62-2.32-7.686-8.62" fill="#A4AABA" data-v-b826dc35></path><path d="M57.65 272.52s-2.122 7.47-4.518 12.396c-1.811 3.724-4.255 7.548 5.505 7.548 6.698 0 9.02-.483 7.479-6.648-1.541-6.164.268-13.296.268-13.296H57.65z" fill="#CBD1D1" data-v-b826dc35></path><path d="M51.54 290.04s2.111 1.178 6.682 1.178c6.128 0 8.31-1.662 8.31-1.662s.605 1.122-.624 2.18c-1 .862-3.624 1.603-7.444 1.559-4.177-.049-5.876-.57-6.786-1.177-.831-.554-.692-1.593-.138-2.078" fill="#2B0849" data-v-b826dc35></path><path d="M58.533 274.438s.034 1.529-.315 2.95c-.352 1.431-1.087 3.127-1.139 4.17-.058 1.16 4.57 1.592 5.194.035.623-1.559 1.303-6.475 1.927-7.306.622-.831-4.94-2.135-5.667.15" fill="#A4AABA" data-v-b826dc35></path><path d="M100.885 277.015l13.306.092s1.291-54.228 1.843-64.056c.552-9.828 3.756-43.13.997-62.788l-12.48-.64-22.725.776s-.433 3.944-1.19 9.921c-.062.493-.677.838-.744 1.358-.075.582.42 1.347.318 1.956-2.35 14.003-6.343 32.926-8.697 46.425-.116.663-1.227 1.004-1.45 2.677-.04.3.21 1.516.112 1.785-6.836 18.643-10.89 47.584-14.2 61.551l14.528-.014s2.185-8.524 4.008-16.878c2.796-12.817 22.987-84.553 22.987-84.553l3-.517 1.037 46.1s-.223 1.228.334 2.008c.558.782-.556 1.117-.39 2.233l.39 1.784s-.446 7.14-.892 11.826c-.446 4.685-.092 38.954-.092 38.954" fill="#7BB2F9" data-v-b826dc35></path><path d="M77.438 220.434c1.146.094 4.016-2.008 6.916-4.91M107.55 223.931s2.758-1.103 6.069-3.862" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M108.459 220.905s2.759-1.104 6.07-3.863" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M76.099 223.557s2.608-.587 6.47-3.346M87.33 150.82c-.27 3.088.297 8.478-4.315 9.073M104.829 149.075s.11 13.936-1.286 14.983c-2.207 1.655-2.975 1.934-2.975 1.934M101.014 149.63s.035 12.81-1.19 24.245M94.93 174.965s7.174-1.655 9.38-1.655M75.671 204.754c-.316 1.55-.64 3.067-.973 4.535 0 0-1.45 1.822-1.003 3.756.446 1.934-.943 2.034-4.96 15.273-1.686 5.559-4.464 18.49-6.313 27.447-.078.38-4.018 18.06-4.093 18.423M77.043 196.743a313.269 313.269 0 0 1-.877 4.729M83.908 151.414l-1.19 10.413s-1.091.148-.496 2.23c.111 1.34-2.66 15.692-5.153 30.267M57.58 272.94h13.238" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M117.377 147.423s-16.955-3.087-35.7.199c.157 2.501-.002 4.128-.002 4.128s14.607-2.802 35.476-.31c.251-2.342.226-4.017.226-4.017" fill="#192064" data-v-b826dc35></path><path d="M107.511 150.353l.004-4.885a.807.807 0 0 0-.774-.81c-2.428-.092-5.04-.108-7.795-.014a.814.814 0 0 0-.784.81l-.003 4.88c0 .456.371.82.827.808a140.76 140.76 0 0 1 7.688.017.81.81 0 0 0 .837-.806" fill="#FFF" data-v-b826dc35></path><path d="M106.402 149.426l.002-3.06a.64.64 0 0 0-.616-.643 94.135 94.135 0 0 0-5.834-.009.647.647 0 0 0-.626.643l-.001 3.056c0 .36.291.648.651.64 1.78-.04 3.708-.041 5.762.012.36.009.662-.279.662-.64" fill="#192064" data-v-b826dc35></path><path d="M101.485 273.933h12.272M102.652 269.075c.006 3.368.04 5.759.11 6.47M102.667 263.125c-.009 1.53-.015 2.98-.016 4.313M102.204 174.024l.893 44.402s.669 1.561-.224 2.677c-.892 1.116 2.455.67.893 2.231-1.562 1.562.893 1.116 0 3.347-.592 1.48-.988 20.987-1.09 34.956" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path></g>', 1)]))) : createCommentVNode("", true), u.status === "404" ? (openBlock(), createElementBlock("svg", si, o[5] || (o[5] = [createStaticVNode('<defs data-v-b826dc35><path d="M0 .387h251.772v251.772H0z" data-v-b826dc35></path></defs><g fill="none" fill-rule="evenodd" data-v-b826dc35><g transform="translate(0 .012)" data-v-b826dc35><mask fill="#fff" data-v-b826dc35></mask><path d="M0 127.32v-2.095C0 56.279 55.892.387 124.838.387h2.096c68.946 0 124.838 55.892 124.838 124.838v2.096c0 68.946-55.892 124.838-124.838 124.838h-2.096C55.892 252.16 0 196.267 0 127.321" fill="#E4EBF7" mask="url(#b)" data-v-b826dc35></path></g><path d="M39.755 130.84a8.276 8.276 0 1 1-16.468-1.66 8.276 8.276 0 0 1 16.468 1.66" fill="#FFF" data-v-b826dc35></path><path d="M36.975 134.297l10.482 5.943M48.373 146.508l-12.648 10.788" stroke="#FFF" stroke-width="2" data-v-b826dc35></path><path d="M39.875 159.352a5.667 5.667 0 1 1-11.277-1.136 5.667 5.667 0 0 1 11.277 1.136M57.588 143.247a5.708 5.708 0 1 1-11.358-1.145 5.708 5.708 0 0 1 11.358 1.145M99.018 26.875l29.82-.014a4.587 4.587 0 1 0-.003-9.175l-29.82.013a4.587 4.587 0 1 0 .003 9.176M110.424 45.211l29.82-.013a4.588 4.588 0 0 0-.004-9.175l-29.82.013a4.587 4.587 0 1 0 .004 9.175" fill="#FFF" data-v-b826dc35></path><path d="M112.798 26.861v-.002l15.784-.006a4.588 4.588 0 1 0 .003 9.175l-15.783.007v-.002a4.586 4.586 0 0 0-.004-9.172M184.523 135.668c-.553 5.485-5.447 9.483-10.931 8.93-5.485-.553-9.483-5.448-8.93-10.932.552-5.485 5.447-9.483 10.932-8.93 5.485.553 9.483 5.447 8.93 10.932" fill="#FFF" data-v-b826dc35></path><path d="M179.26 141.75l12.64 7.167M193.006 156.477l-15.255 13.011" stroke="#FFF" stroke-width="2" data-v-b826dc35></path><path d="M184.668 170.057a6.835 6.835 0 1 1-13.6-1.372 6.835 6.835 0 0 1 13.6 1.372M203.34 153.325a6.885 6.885 0 1 1-13.7-1.382 6.885 6.885 0 0 1 13.7 1.382" fill="#FFF" data-v-b826dc35></path><path d="M151.931 192.324a2.222 2.222 0 1 1-4.444 0 2.222 2.222 0 0 1 4.444 0zM225.27 116.056a2.222 2.222 0 1 1-4.445 0 2.222 2.222 0 0 1 4.444 0zM216.38 151.08a2.223 2.223 0 1 1-4.446-.001 2.223 2.223 0 0 1 4.446 0zM176.917 107.636a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM195.291 92.165a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM202.058 180.711a2.223 2.223 0 1 1-4.446 0 2.223 2.223 0 0 1 4.446 0z" stroke="#FFF" stroke-width="2" data-v-b826dc35></path><path stroke="#FFF" stroke-width="2" d="M214.404 153.302l-1.912 20.184-10.928 5.99M173.661 174.792l-6.356 9.814h-11.36l-4.508 6.484M174.941 125.168v-15.804M220.824 117.25l-12.84 7.901-15.31-7.902V94.39" data-v-b826dc35></path><path d="M166.588 65.936h-3.951a4.756 4.756 0 0 1-4.743-4.742 4.756 4.756 0 0 1 4.743-4.743h3.951a4.756 4.756 0 0 1 4.743 4.743 4.756 4.756 0 0 1-4.743 4.742" fill="#FFF" data-v-b826dc35></path><path d="M174.823 30.03c0-16.281 13.198-29.48 29.48-29.48 16.28 0 29.48 13.199 29.48 29.48 0 16.28-13.2 29.48-29.48 29.48-16.282 0-29.48-13.2-29.48-29.48" fill="#1890FF" data-v-b826dc35></path><path d="M205.952 38.387c.5.5.785 1.142.785 1.928s-.286 1.465-.785 1.964c-.572.5-1.214.75-2 .75-.785 0-1.429-.285-1.929-.785-.572-.5-.82-1.143-.82-1.929s.248-1.428.82-1.928c.5-.5 1.144-.75 1.93-.75.785 0 1.462.25 1.999.75m4.285-19.463c1.428 1.249 2.143 2.963 2.143 5.142 0 1.712-.427 3.13-1.219 4.25-.067.096-.137.18-.218.265-.416.429-1.41 1.346-2.956 2.699a5.07 5.07 0 0 0-1.428 1.75 5.207 5.207 0 0 0-.536 2.357v.5h-4.107v-.5c0-1.357.215-2.536.714-3.5.464-.964 1.857-2.464 4.178-4.536l.43-.5c.643-.785.964-1.643.964-2.535 0-1.18-.358-2.108-1-2.785-.678-.68-1.643-1.001-2.858-1.001-1.536 0-2.642.464-3.357 1.43-.37.5-.621 1.135-.76 1.904a1.999 1.999 0 0 1-1.971 1.63h-.004c-1.277 0-2.257-1.183-1.98-2.43.337-1.518 1.02-2.78 2.073-3.784 1.536-1.5 3.607-2.25 6.25-2.25 2.32 0 4.214.607 5.642 1.894" fill="#FFF" data-v-b826dc35></path><path d="M52.04 76.131s21.81 5.36 27.307 15.945c5.575 10.74-6.352 9.26-15.73 4.935-10.86-5.008-24.7-11.822-11.577-20.88" fill="#FFB594" data-v-b826dc35></path><path d="M90.483 67.504l-.449 2.893c-.753.49-4.748-2.663-4.748-2.663l-1.645.748-1.346-5.684s6.815-4.589 8.917-5.018c2.452-.501 9.884.94 10.7 2.278 0 0 1.32.486-2.227.69-3.548.203-5.043.447-6.79 3.132-1.747 2.686-2.412 3.624-2.412 3.624" fill="#FFC6A0" data-v-b826dc35></path><path d="M128.055 111.367c-2.627-7.724-6.15-13.18-8.917-15.478-3.5-2.906-9.34-2.225-11.366-4.187-1.27-1.231-3.215-1.197-3.215-1.197s-14.98-3.158-16.828-3.479c-2.37-.41-2.124-.714-6.054-1.405-1.57-1.907-2.917-1.122-2.917-1.122l-7.11-1.383c-.853-1.472-2.423-1.023-2.423-1.023l-2.468-.897c-1.645 9.976-7.74 13.796-7.74 13.796 1.795 1.122 15.703 8.3 15.703 8.3l5.107 37.11s-3.321 5.694 1.346 9.109c0 0 19.883-3.743 34.921-.329 0 0 3.047-2.546.972-8.806.523-3.01 1.394-8.263 1.736-11.622.385.772 2.019 1.918 3.14 3.477 0 0 9.407-7.365 11.052-14.012-.832-.723-1.598-1.585-2.267-2.453-.567-.736-.358-2.056-.765-2.717-.669-1.084-1.804-1.378-1.907-1.682" fill="#FFF" data-v-b826dc35></path><path d="M101.09 289.998s4.295 2.041 7.354 1.021c2.821-.94 4.53.668 7.08 1.178 2.55.51 6.874 1.1 11.686-1.26-.103-5.51-6.889-3.98-11.96-6.713-2.563-1.38-3.784-4.722-3.598-8.799h-9.402s-1.392 10.52-1.16 14.573" fill="#CBD1D1" data-v-b826dc35></path><path d="M101.067 289.826s2.428 1.271 6.759.653c3.058-.437 3.712.481 7.423 1.031 3.712.55 10.724-.069 11.823-.894.413 1.1-.343 2.063-.343 2.063s-1.512.603-4.812.824c-2.03.136-5.8.291-7.607-.503-1.787-1.375-5.247-1.903-5.728-.241-3.918.95-7.355-.286-7.355-.286l-.16-2.647z" fill="#2B0849" data-v-b826dc35></path><path d="M108.341 276.044h3.094s-.103 6.702 4.536 8.558c-4.64.618-8.558-2.303-7.63-8.558" fill="#A4AABA" data-v-b826dc35></path><path d="M57.542 272.401s-2.107 7.416-4.485 12.306c-1.798 3.695-4.225 7.492 5.465 7.492 6.648 0 8.953-.48 7.423-6.599-1.53-6.12.266-13.199.266-13.199h-8.669z" fill="#CBD1D1" data-v-b826dc35></path><path d="M51.476 289.793s2.097 1.169 6.633 1.169c6.083 0 8.249-1.65 8.249-1.65s.602 1.114-.619 2.165c-.993.855-3.597 1.591-7.39 1.546-4.145-.048-5.832-.566-6.736-1.168-.825-.55-.687-1.58-.137-2.062" fill="#2B0849" data-v-b826dc35></path><path d="M58.419 274.304s.033 1.519-.314 2.93c-.349 1.42-1.078 3.104-1.13 4.139-.058 1.151 4.537 1.58 5.155.034.62-1.547 1.294-6.427 1.913-7.252.619-.825-4.903-2.119-5.624.15" fill="#A4AABA" data-v-b826dc35></path><path d="M99.66 278.514l13.378.092s1.298-54.52 1.853-64.403c.554-9.882 3.776-43.364 1.002-63.128l-12.547-.644-22.849.78s-.434 3.966-1.195 9.976c-.063.496-.682.843-.749 1.365-.075.585.423 1.354.32 1.966-2.364 14.08-6.377 33.104-8.744 46.677-.116.666-1.234 1.009-1.458 2.691-.04.302.211 1.525.112 1.795-6.873 18.744-10.949 47.842-14.277 61.885l14.607-.014s2.197-8.57 4.03-16.97c2.811-12.886 23.111-85.01 23.111-85.01l3.016-.521 1.043 46.35s-.224 1.234.337 2.02c.56.785-.56 1.123-.392 2.244l.392 1.794s-.449 7.178-.898 11.89c-.448 4.71-.092 39.165-.092 39.165" fill="#7BB2F9" data-v-b826dc35></path><path d="M76.085 221.626c1.153.094 4.038-2.019 6.955-4.935M106.36 225.142s2.774-1.11 6.103-3.883" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M107.275 222.1s2.773-1.11 6.102-3.884" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M74.74 224.767s2.622-.591 6.505-3.365M86.03 151.634c-.27 3.106.3 8.525-4.336 9.123M103.625 149.88s.11 14.012-1.293 15.065c-2.219 1.664-2.99 1.944-2.99 1.944M99.79 150.438s.035 12.88-1.196 24.377M93.673 175.911s7.212-1.664 9.431-1.664M74.31 205.861a212.013 212.013 0 0 1-.979 4.56s-1.458 1.832-1.009 3.776c.449 1.944-.947 2.045-4.985 15.355-1.696 5.59-4.49 18.591-6.348 27.597l-.231 1.12M75.689 197.807a320.934 320.934 0 0 1-.882 4.754M82.591 152.233L81.395 162.7s-1.097.15-.5 2.244c.113 1.346-2.674 15.775-5.18 30.43M56.12 274.418h13.31" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M116.241 148.22s-17.047-3.104-35.893.2c.158 2.514-.003 4.15-.003 4.15s14.687-2.818 35.67-.312c.252-2.355.226-4.038.226-4.038" fill="#192064" data-v-b826dc35></path><path d="M106.322 151.165l.003-4.911a.81.81 0 0 0-.778-.815c-2.44-.091-5.066-.108-7.836-.014a.818.818 0 0 0-.789.815l-.003 4.906a.81.81 0 0 0 .831.813c2.385-.06 4.973-.064 7.73.017a.815.815 0 0 0 .842-.81" fill="#FFF" data-v-b826dc35></path><path d="M105.207 150.233l.002-3.076a.642.642 0 0 0-.619-.646 94.321 94.321 0 0 0-5.866-.01.65.65 0 0 0-.63.647v3.072a.64.64 0 0 0 .654.644 121.12 121.12 0 0 1 5.794.011c.362.01.665-.28.665-.642" fill="#192064" data-v-b826dc35></path><path d="M100.263 275.415h12.338M101.436 270.53c.006 3.387.042 5.79.111 6.506M101.451 264.548a915.75 915.75 0 0 0-.015 4.337M100.986 174.965l.898 44.642s.673 1.57-.225 2.692c-.897 1.122 2.468.673.898 2.243-1.57 1.57.897 1.122 0 3.365-.596 1.489-.994 21.1-1.096 35.146" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M46.876 83.427s-.516 6.045 7.223 5.552c11.2-.712 9.218-9.345 31.54-21.655-.786-2.708-2.447-4.744-2.447-4.744s-11.068 3.11-22.584 8.046c-6.766 2.9-13.395 6.352-13.732 12.801M104.46 91.057l.941-5.372-8.884-11.43-5.037 5.372-1.74 7.834a.321.321 0 0 0 .108.32c.965.8 6.5 5.013 14.347 3.544a.332.332 0 0 0 .264-.268" fill="#FFC6A0" data-v-b826dc35></path><path d="M93.942 79.387s-4.533-2.853-2.432-6.855c1.623-3.09 4.513 1.133 4.513 1.133s.52-3.642 3.121-3.642c.52-1.04 1.561-4.162 1.561-4.162s11.445 2.601 13.526 3.121c0 5.203-2.304 19.424-7.84 19.861-8.892.703-12.449-9.456-12.449-9.456" fill="#FFC6A0" data-v-b826dc35></path><path d="M113.874 73.446c2.601-2.081 3.47-9.722 3.47-9.722s-2.479-.49-6.64-2.05c-4.683-2.081-12.798-4.747-17.48.976-9.668 3.223-2.05 19.823-2.05 19.823l2.713-3.021s-3.935-3.287-2.08-6.243c2.17-3.462 3.92 1.073 3.92 1.073s.637-2.387 3.581-3.342c.355-.71 1.036-2.674 1.432-3.85a1.073 1.073 0 0 1 1.263-.704c2.4.558 8.677 2.019 11.356 2.662.522.125.871.615.82 1.15l-.305 3.248z" fill="#520038" data-v-b826dc35></path><path d="M104.977 76.064c-.103.61-.582 1.038-1.07.956-.489-.083-.801-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.644.698 1.254M112.132 77.694c-.103.61-.582 1.038-1.07.956-.488-.083-.8-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.643.698 1.254" fill="#552950" data-v-b826dc35></path><path stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" d="M110.13 74.84l-.896 1.61-.298 4.357h-2.228" data-v-b826dc35></path><path d="M110.846 74.481s1.79-.716 2.506.537" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M92.386 74.282s.477-1.114 1.113-.716c.637.398 1.274 1.433.558 1.99-.717.556.159 1.67.159 1.67" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M103.287 72.93s1.83 1.113 4.137.954" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M103.685 81.762s2.227 1.193 4.376 1.193M104.64 84.308s.954.398 1.511.318M94.693 81.205s2.308 7.4 10.424 7.639" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M81.45 89.384s.45 5.647-4.935 12.787M69 82.654s-.726 9.282-8.204 14.206" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M129.405 122.865s-5.272 7.403-9.422 10.768" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M119.306 107.329s.452 4.366-2.127 32.062" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M150.028 151.232h-49.837a1.01 1.01 0 0 1-1.01-1.01v-31.688c0-.557.452-1.01 1.01-1.01h49.837c.558 0 1.01.453 1.01 1.01v31.688a1.01 1.01 0 0 1-1.01 1.01" fill="#F2D7AD" data-v-b826dc35></path><path d="M150.29 151.232h-19.863v-33.707h20.784v32.786a.92.92 0 0 1-.92.92" fill="#F4D19D" data-v-b826dc35></path><path d="M123.554 127.896H92.917a.518.518 0 0 1-.425-.816l6.38-9.113c.193-.277.51-.442.85-.442h31.092l-7.26 10.371z" fill="#F2D7AD" data-v-b826dc35></path><path fill="#CC9B6E" d="M123.689 128.447H99.25v-.519h24.169l7.183-10.26.424.298z" data-v-b826dc35></path><path d="M158.298 127.896h-18.669a2.073 2.073 0 0 1-1.659-.83l-7.156-9.541h19.965c.49 0 .95.23 1.244.622l6.69 8.92a.519.519 0 0 1-.415.83" fill="#F4D19D" data-v-b826dc35></path><path fill="#CC9B6E" d="M157.847 128.479h-19.384l-7.857-10.475.415-.31 7.7 10.266h19.126zM130.554 150.685l-.032-8.177.519-.002.032 8.177z" data-v-b826dc35></path><path fill="#CC9B6E" d="M130.511 139.783l-.08-21.414.519-.002.08 21.414zM111.876 140.932l-.498-.143 1.479-5.167.498.143zM108.437 141.06l-2.679-2.935 2.665-3.434.41.318-2.397 3.089 2.384 2.612zM116.607 141.06l-.383-.35 2.383-2.612-2.397-3.089.41-.318 2.665 3.434z" data-v-b826dc35></path><path d="M154.316 131.892l-3.114-1.96.038 3.514-1.043.092c-1.682.115-3.634.23-4.789.23-1.902 0-2.693 2.258 2.23 2.648l-2.645-.596s-2.168 1.317.504 2.3c0 0-1.58 1.217.561 2.58-.584 3.504 5.247 4.058 7.122 3.59 1.876-.47 4.233-2.359 4.487-5.16.28-3.085-.89-5.432-3.35-7.238" fill="#FFC6A0" data-v-b826dc35></path><path d="M153.686 133.577s-6.522.47-8.36.372c-1.836-.098-1.904 2.19 2.359 2.264 3.739.15 5.451-.044 5.451-.044" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M145.16 135.877c-1.85 1.346.561 2.355.561 2.355s3.478.898 6.73.617" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M151.89 141.71s-6.28.111-6.73-2.132c-.223-1.346.45-1.402.45-1.402M146.114 140.868s-1.103 3.16 5.44 3.533M151.202 129.932v3.477M52.838 89.286c3.533-.337 8.423-1.248 13.582-7.754" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M168.567 248.318a6.647 6.647 0 0 1-6.647-6.647v-66.466a6.647 6.647 0 1 1 13.294 0v66.466a6.647 6.647 0 0 1-6.647 6.647" fill="#5BA02E" data-v-b826dc35></path><path d="M176.543 247.653a6.647 6.647 0 0 1-6.646-6.647v-33.232a6.647 6.647 0 1 1 13.293 0v33.232a6.647 6.647 0 0 1-6.647 6.647" fill="#92C110" data-v-b826dc35></path><path d="M186.443 293.613H158.92a3.187 3.187 0 0 1-3.187-3.187v-46.134a3.187 3.187 0 0 1 3.187-3.187h27.524a3.187 3.187 0 0 1 3.187 3.187v46.134a3.187 3.187 0 0 1-3.187 3.187" fill="#F2D7AD" data-v-b826dc35></path><path d="M88.979 89.48s7.776 5.384 16.6 2.842" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path></g>', 2)]))) : createCommentVNode("", true), u.status === "500" ? (openBlock(), createElementBlock("svg", ii, o[6] || (o[6] = [createStaticVNode('<defs data-v-b826dc35><path d="M0 .335h253.49v253.49H0z" data-v-b826dc35></path><path d="M0 293.665h253.49V.401H0z" data-v-b826dc35></path></defs><g fill="none" fill-rule="evenodd" data-v-b826dc35><g transform="translate(0 .067)" data-v-b826dc35><mask fill="#fff" data-v-b826dc35></mask><path d="M0 128.134v-2.11C0 56.608 56.273.334 125.69.334h2.11c69.416 0 125.69 56.274 125.69 125.69v2.11c0 69.417-56.274 125.69-125.69 125.69h-2.11C56.273 253.824 0 197.551 0 128.134" fill="#E4EBF7" mask="url(#b)" data-v-b826dc35></path></g><path d="M39.989 132.108a8.332 8.332 0 1 1-16.581-1.671 8.332 8.332 0 0 1 16.58 1.671" fill="#FFF" data-v-b826dc35></path><path d="M37.19 135.59l10.553 5.983M48.665 147.884l-12.734 10.861" stroke="#FFF" stroke-width="2" data-v-b826dc35></path><path d="M40.11 160.816a5.706 5.706 0 1 1-11.354-1.145 5.706 5.706 0 0 1 11.354 1.145M57.943 144.6a5.747 5.747 0 1 1-11.436-1.152 5.747 5.747 0 0 1 11.436 1.153M99.656 27.434l30.024-.013a4.619 4.619 0 1 0-.004-9.238l-30.024.013a4.62 4.62 0 0 0 .004 9.238M111.14 45.896l30.023-.013a4.62 4.62 0 1 0-.004-9.238l-30.024.013a4.619 4.619 0 1 0 .004 9.238" fill="#FFF" data-v-b826dc35></path><path d="M113.53 27.421v-.002l15.89-.007a4.619 4.619 0 1 0 .005 9.238l-15.892.007v-.002a4.618 4.618 0 0 0-.004-9.234M150.167 70.091h-3.979a4.789 4.789 0 0 1-4.774-4.775 4.788 4.788 0 0 1 4.774-4.774h3.979a4.789 4.789 0 0 1 4.775 4.774 4.789 4.789 0 0 1-4.775 4.775" fill="#FFF" data-v-b826dc35></path><path d="M171.687 30.234c0-16.392 13.289-29.68 29.681-29.68 16.392 0 29.68 13.288 29.68 29.68 0 16.393-13.288 29.681-29.68 29.681s-29.68-13.288-29.68-29.68" fill="#FF603B" data-v-b826dc35></path><path d="M203.557 19.435l-.676 15.035a1.514 1.514 0 0 1-3.026 0l-.675-15.035a2.19 2.19 0 1 1 4.377 0m-.264 19.378c.513.477.77 1.1.77 1.87s-.257 1.393-.77 1.907c-.55.476-1.21.733-1.943.733a2.545 2.545 0 0 1-1.87-.77c-.55-.514-.806-1.136-.806-1.87 0-.77.256-1.393.806-1.87.513-.513 1.137-.733 1.87-.733.77 0 1.43.22 1.943.733" fill="#FFF" data-v-b826dc35></path><path d="M119.3 133.275c4.426-.598 3.612-1.204 4.079-4.778.675-5.18-3.108-16.935-8.262-25.118-1.088-10.72-12.598-11.24-12.598-11.24s4.312 4.895 4.196 16.199c1.398 5.243.804 14.45.804 14.45s5.255 11.369 11.78 10.487" fill="#FFB594" data-v-b826dc35></path><path d="M100.944 91.61s1.463-.583 3.211.582c8.08 1.398 10.368 6.706 11.3 11.368 1.864 1.282 1.864 2.33 1.864 3.496.365.777 1.515 3.03 1.515 3.03s-7.225 1.748-10.954 6.758c-1.399-6.41-6.936-25.235-6.936-25.235" fill="#FFF" data-v-b826dc35></path><path d="M94.008 90.5l1.019-5.815-9.23-11.874-5.233 5.581-2.593 9.863s8.39 5.128 16.037 2.246" fill="#FFB594" data-v-b826dc35></path><path d="M82.931 78.216s-4.557-2.868-2.445-6.892c1.632-3.107 4.537 1.139 4.537 1.139s.524-3.662 3.139-3.662c.523-1.046 1.569-4.184 1.569-4.184s11.507 2.615 13.6 3.138c-.001 5.23-2.317 19.529-7.884 19.969-8.94.706-12.516-9.508-12.516-9.508" fill="#FFC6A0" data-v-b826dc35></path><path d="M102.971 72.243c2.616-2.093 3.489-9.775 3.489-9.775s-2.492-.492-6.676-2.062c-4.708-2.092-12.867-4.771-17.575.982-9.54 4.41-2.062 19.93-2.062 19.93l2.729-3.037s-3.956-3.304-2.092-6.277c2.183-3.48 3.943 1.08 3.943 1.08s.64-2.4 3.6-3.36c.356-.714 1.04-2.69 1.44-3.872a1.08 1.08 0 0 1 1.27-.707c2.41.56 8.723 2.03 11.417 2.676.524.126.876.619.825 1.156l-.308 3.266z" fill="#520038" data-v-b826dc35></path><path d="M101.22 76.514c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.961.491.083.805.647.702 1.26M94.26 75.074c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.96.491.082.805.646.702 1.26" fill="#552950" data-v-b826dc35></path><path stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" d="M99.206 73.644l-.9 1.62-.3 4.38h-2.24" data-v-b826dc35></path><path d="M99.926 73.284s1.8-.72 2.52.54" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M81.367 73.084s.48-1.12 1.12-.72c.64.4 1.28 1.44.56 2s.16 1.68.16 1.68" stroke="#DB836E" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M92.326 71.724s1.84 1.12 4.16.96" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M92.726 80.604s2.24 1.2 4.4 1.2M93.686 83.164s.96.4 1.52.32M83.687 80.044s1.786 6.547 9.262 7.954" stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M95.548 91.663s-1.068 2.821-8.298 2.105c-7.23-.717-10.29-5.044-10.29-5.044" stroke="#E4EBF7" stroke-width="1.136" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M78.126 87.478s6.526 4.972 16.47 2.486c0 0 9.577 1.02 11.536 5.322 5.36 11.77.543 36.835 0 39.962 3.496 4.055-.466 8.483-.466 8.483-15.624-3.548-35.81-.6-35.81-.6-4.849-3.546-1.223-9.044-1.223-9.044L62.38 110.32c-2.485-15.227.833-19.803 3.549-20.743 3.03-1.049 8.04-1.282 8.04-1.282.496-.058 1.08-.076 1.37-.233 2.36-1.282 2.787-.583 2.787-.583" fill="#FFF" data-v-b826dc35></path><path d="M65.828 89.81s-6.875.465-7.59 8.156c-.466 8.857 3.03 10.954 3.03 10.954s6.075 22.102 16.796 22.957c8.39-2.176 4.758-6.702 4.661-11.42-.233-11.304-7.108-16.897-7.108-16.897s-4.212-13.75-9.789-13.75" fill="#FFC6A0" data-v-b826dc35></path><path d="M71.716 124.225s.855 11.264 9.828 6.486c4.765-2.536 7.581-13.828 9.789-22.568 1.456-5.768 2.58-12.197 2.58-12.197l-4.973-1.709s-2.408 5.516-7.769 12.275c-4.335 5.467-9.144 11.11-9.455 17.713" fill="#FFC6A0" data-v-b826dc35></path><path d="M108.463 105.191s1.747 2.724-2.331 30.535c2.376 2.216 1.053 6.012-.233 7.51" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M123.262 131.527s-.427 2.732-11.77 1.981c-15.187-1.006-25.326-3.25-25.326-3.25l.933-5.8s.723.215 9.71-.068c11.887-.373 18.714-6.07 24.964-1.022 4.039 3.263 1.489 8.16 1.489 8.16" fill="#FFC6A0" data-v-b826dc35></path><path d="M70.24 90.974s-5.593-4.739-11.054 2.68c-3.318 7.223.517 15.284 2.664 19.578-.31 3.729 2.33 4.311 2.33 4.311s.108.895 1.516 2.68c4.078-7.03 6.72-9.166 13.711-12.546-.328-.656-1.877-3.265-1.825-3.767.175-1.69-1.282-2.623-1.282-2.623s-.286-.156-1.165-2.738c-.788-2.313-2.036-5.177-4.895-7.575" fill="#FFF" data-v-b826dc35></path><path d="M90.232 288.027s4.855 2.308 8.313 1.155c3.188-1.063 5.12.755 8.002 1.331 2.881.577 7.769 1.243 13.207-1.424-.117-6.228-7.786-4.499-13.518-7.588-2.895-1.56-4.276-5.336-4.066-9.944H91.544s-1.573 11.89-1.312 16.47" fill="#CBD1D1" data-v-b826dc35></path><path d="M90.207 287.833s2.745 1.437 7.639.738c3.456-.494 3.223.66 7.418 1.282 4.195.621 13.092-.194 14.334-1.126.466 1.242-.388 2.33-.388 2.33s-1.709.682-5.438.932c-2.295.154-8.098.276-10.14-.621-2.02-1.554-4.894-1.515-6.06-.234-4.427 1.075-7.184-.31-7.184-.31l-.181-2.991z" fill="#2B0849" data-v-b826dc35></path><path d="M98.429 272.257h3.496s-.117 7.574 5.127 9.671c-5.244.7-9.672-2.602-8.623-9.671" fill="#A4AABA" data-v-b826dc35></path><path d="M44.425 272.046s-2.208 7.774-4.702 12.899c-1.884 3.874-4.428 7.854 5.729 7.854 6.97 0 9.385-.503 7.782-6.917-1.604-6.415.279-13.836.279-13.836h-9.088z" fill="#CBD1D1" data-v-b826dc35></path><path d="M38.066 290.277s2.198 1.225 6.954 1.225c6.376 0 8.646-1.73 8.646-1.73s.63 1.168-.649 2.27c-1.04.897-3.77 1.668-7.745 1.621-4.347-.05-6.115-.593-7.062-1.224-.864-.577-.72-1.657-.144-2.162" fill="#2B0849" data-v-b826dc35></path><path d="M45.344 274.041s.035 1.592-.329 3.07c-.365 1.49-1.13 3.255-1.184 4.34-.061 1.206 4.755 1.657 5.403.036.65-1.622 1.357-6.737 2.006-7.602.648-.865-5.14-2.222-5.896.156" fill="#A4AABA" data-v-b826dc35></path><path d="M89.476 277.57l13.899.095s1.349-56.643 1.925-66.909c.576-10.267 3.923-45.052 1.042-65.585l-13.037-.669-23.737.81s-.452 4.12-1.243 10.365c-.065.515-.708.874-.777 1.417-.078.608.439 1.407.332 2.044-2.455 14.627-5.797 32.736-8.256 46.837-.121.693-1.282 1.048-1.515 2.796-.042.314.22 1.584.116 1.865-7.14 19.473-12.202 52.601-15.66 67.19l15.176-.015s2.282-10.145 4.185-18.871c2.922-13.389 24.012-88.32 24.012-88.32l3.133-.954-.158 48.568s-.233 1.282.35 2.098c.583.815-.581 1.167-.408 2.331l.408 1.864s-.466 7.458-.932 12.352c-.467 4.895 1.145 40.69 1.145 40.69" fill="#7BB2F9" data-v-b826dc35></path><path d="M64.57 218.881c1.197.099 4.195-2.097 7.225-5.127M96.024 222.534s2.881-1.152 6.34-4.034" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M96.973 219.373s2.882-1.153 6.34-4.034" stroke="#648BD8" stroke-width="1.032" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M63.172 222.144s2.724-.614 6.759-3.496M74.903 146.166c-.281 3.226.31 8.856-4.506 9.478M93.182 144.344s.115 14.557-1.344 15.65c-2.305 1.73-3.107 2.02-3.107 2.02M89.197 144.923s.269 13.144-1.01 25.088M83.525 170.71s6.81-1.051 9.116-1.051M46.026 270.045l-.892 4.538M46.937 263.289l-.815 4.157M62.725 202.503c-.33 1.618-.102 1.904-.449 3.438 0 0-2.756 1.903-2.29 3.923.466 2.02-.31 3.424-4.505 17.252-1.762 5.807-4.233 18.922-6.165 28.278-.03.144-.521 2.646-1.14 5.8M64.158 194.136c-.295 1.658-.6 3.31-.917 4.938M71.33 146.787l-1.244 10.877s-1.14.155-.519 2.33c.117 1.399-2.778 16.39-5.382 31.615M44.242 273.727H58.07" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M106.18 142.117c-3.028-.489-18.825-2.744-36.219.2a.625.625 0 0 0-.518.644c.063 1.307.044 2.343.015 2.995a.617.617 0 0 0 .716.636c3.303-.534 17.037-2.412 35.664-.266.347.04.66-.214.692-.56.124-1.347.16-2.425.17-3.029a.616.616 0 0 0-.52-.62" fill="#192064" data-v-b826dc35></path><path d="M96.398 145.264l.003-5.102a.843.843 0 0 0-.809-.847 114.104 114.104 0 0 0-8.141-.014.85.85 0 0 0-.82.847l-.003 5.097c0 .476.388.857.864.845 2.478-.064 5.166-.067 8.03.017a.848.848 0 0 0 .876-.843" fill="#FFF" data-v-b826dc35></path><path d="M95.239 144.296l.002-3.195a.667.667 0 0 0-.643-.672c-1.9-.061-3.941-.073-6.094-.01a.675.675 0 0 0-.654.672l-.002 3.192c0 .376.305.677.68.669 1.859-.042 3.874-.043 6.02.012.376.01.69-.291.691-.668" fill="#192064" data-v-b826dc35></path><path d="M90.102 273.522h12.819M91.216 269.761c.006 3.519-.072 5.55 0 6.292M90.923 263.474c-.009 1.599-.016 2.558-.016 4.505M90.44 170.404l.932 46.38s.7 1.631-.233 2.796c-.932 1.166 2.564.7.932 2.33-1.63 1.633.933 1.166 0 3.497-.618 1.546-1.031 21.921-1.138 36.513" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M73.736 98.665l2.214 4.312s2.098.816 1.865 2.68l.816 2.214M64.297 116.611c.233-.932 2.176-7.147 12.585-10.488M77.598 90.042s7.691 6.137 16.547 2.72" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M91.974 86.954s5.476-.816 7.574-4.545c1.297-.345.72 2.212-.33 3.671-.7.971-1.01 1.554-1.01 1.554s.194.31.155.816c-.053.697-.175.653-.272 1.048-.081.335.108.657 0 1.049-.046.17-.198.5-.382.878-.12.249-.072.687-.2.948-.231.469-1.562 1.87-2.622 2.855-3.826 3.554-5.018 1.644-6.001-.408-.894-1.865-.661-5.127-.874-6.875-.35-2.914-2.622-3.03-1.923-4.429.343-.685 2.87.69 3.263 1.748.757 2.04 2.952 1.807 2.622 1.69" fill="#FFC6A0" data-v-b826dc35></path><path d="M99.8 82.429c-.465.077-.35.272-.97 1.243-.622.971-4.817 2.932-6.39 3.224-2.589.48-2.278-1.56-4.254-2.855-1.69-1.107-3.562-.638-1.398 1.398.99.932.932 1.107 1.398 3.205.335 1.506-.64 3.67.7 5.593" stroke="#DB836E" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M79.543 108.673c-2.1 2.926-4.266 6.175-5.557 8.762" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M87.72 124.768s-2.098-1.942-5.127-2.719c-3.03-.777-3.574-.155-5.516.078-1.942.233-3.885-.932-3.652.7.233 1.63 5.05 1.01 5.206 2.097.155 1.087-6.37 2.796-8.313 2.175-.777.777.466 1.864 2.02 2.175.233 1.554 2.253 1.554 2.253 1.554s.699 1.01 2.641 1.088c2.486 1.32 8.934-.7 10.954-1.554 2.02-.855-.466-5.594-.466-5.594" fill="#FFC6A0" data-v-b826dc35></path><path d="M73.425 122.826s.66 1.127 3.167 1.418c2.315.27 2.563.583 2.563.583s-2.545 2.894-9.07 2.272M72.416 129.274s3.826.097 4.933-.718M74.98 130.75s1.961.136 3.36-.505M77.232 131.916s1.748.019 2.914-.505M73.328 122.321s-.595-1.032 1.262-.427c1.671.544 2.833.055 5.128.155 1.389.061 3.067-.297 3.982.15 1.606.784 3.632 2.181 3.632 2.181s10.526 1.204 19.033-1.127M78.864 108.104s-8.39 2.758-13.168 12.12" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M109.278 112.533s3.38-3.613 7.575-4.662" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M107.375 123.006s9.697-2.745 11.445-.88" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M194.605 83.656l3.971-3.886M187.166 90.933l3.736-3.655M191.752 84.207l-4.462-4.56M198.453 91.057l-4.133-4.225M129.256 163.074l3.718-3.718M122.291 170.039l3.498-3.498M126.561 163.626l-4.27-4.27M132.975 170.039l-3.955-3.955" stroke="#BFCDDD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b826dc35></path><path d="M190.156 211.779h-1.604a4.023 4.023 0 0 1-4.011-4.011V175.68a4.023 4.023 0 0 1 4.01-4.01h1.605a4.023 4.023 0 0 1 4.011 4.01v32.088a4.023 4.023 0 0 1-4.01 4.01" fill="#A3B4C6" data-v-b826dc35></path><path d="M237.824 212.977a4.813 4.813 0 0 1-4.813 4.813h-86.636a4.813 4.813 0 0 1 0-9.626h86.636a4.813 4.813 0 0 1 4.813 4.813" fill="#A3B4C6" data-v-b826dc35></path><mask fill="#fff" data-v-b826dc35></mask><path fill="#A3B4C6" mask="url(#d)" d="M154.098 190.096h70.513v-84.617h-70.513z" data-v-b826dc35></path><path d="M224.928 190.096H153.78a3.219 3.219 0 0 1-3.208-3.209V167.92a3.219 3.219 0 0 1 3.208-3.21h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.219 3.219 0 0 1-3.21 3.209M224.928 130.832H153.78a3.218 3.218 0 0 1-3.208-3.208v-18.968a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.218 3.218 0 0 1-3.21 3.208" fill="#BFCDDD" mask="url(#d)" data-v-b826dc35></path><path d="M159.563 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 120.546h-22.461a.802.802 0 0 1-.802-.802v-3.208c0-.443.359-.803.802-.803h22.46c.444 0 .803.36.803.803v3.208c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-b826dc35></path><path d="M224.928 160.464H153.78a3.218 3.218 0 0 1-3.208-3.209v-18.967a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.209v18.967a3.218 3.218 0 0 1-3.21 3.209" fill="#BFCDDD" mask="url(#d)" data-v-b826dc35></path><path d="M173.455 130.832h49.301M164.984 130.832h6.089M155.952 130.832h6.75M173.837 160.613h49.3M165.365 160.613h6.089M155.57 160.613h6.751" stroke="#7C90A5" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-b826dc35></path><path d="M159.563 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M166.98 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M174.397 151.038a2.407 2.407 0 1 1 .001-4.814 2.407 2.407 0 0 1 0 4.814M222.539 151.038h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802M159.563 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 179.987h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-b826dc35></path><path d="M203.04 221.108h-27.372a2.413 2.413 0 0 1-2.406-2.407v-11.448a2.414 2.414 0 0 1 2.406-2.407h27.372a2.414 2.414 0 0 1 2.407 2.407V218.7a2.413 2.413 0 0 1-2.407 2.407" fill="#BFCDDD" mask="url(#d)" data-v-b826dc35></path><path d="M177.259 207.217v11.52M201.05 207.217v11.52" stroke="#A3B4C6" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-b826dc35></path><path d="M162.873 267.894a9.422 9.422 0 0 1-9.422-9.422v-14.82a9.423 9.423 0 0 1 18.845 0v14.82a9.423 9.423 0 0 1-9.423 9.422" fill="#5BA02E" mask="url(#d)" data-v-b826dc35></path><path d="M171.22 267.83a9.422 9.422 0 0 1-9.422-9.423v-3.438a9.423 9.423 0 0 1 18.845 0v3.438a9.423 9.423 0 0 1-9.422 9.423" fill="#92C110" mask="url(#d)" data-v-b826dc35></path><path d="M181.31 293.666h-27.712a3.209 3.209 0 0 1-3.209-3.21V269.79a3.209 3.209 0 0 1 3.209-3.21h27.711a3.209 3.209 0 0 1 3.209 3.21v20.668a3.209 3.209 0 0 1-3.209 3.209" fill="#F2D7AD" mask="url(#d)" data-v-b826dc35></path></g>', 2)]))) : createCommentVNode("", true)], true)]), l.value ? (openBlock(), createElementBlock("div", ni, [renderSlot(u.$slots, "title", {}, () => [createTextVNode(toDisplayString(u.title), 1)], true)])) : createCommentVNode("", true), t.value ? (openBlock(), createElementBlock("div", ui, [renderSlot(u.$slots, "subTitle", {}, () => [createTextVNode(toDisplayString(u.subTitle), 1)], true)])) : createCommentVNode("", true), n.value ? (openBlock(), createElementBlock("div", di, [renderSlot(u.$slots, "extra", {}, () => [createTextVNode(toDisplayString(u.extra), 1)], true)])) : createCommentVNode("", true), unref(e).default ? (openBlock(), createElementBlock("div", ri, [renderSlot(u.$slots, "default", {}, void 0, true)])) : createCommentVNode("", true)]));
} }), [["__scopeId", "data-v-b826dc35"]]);
$a2.install = (d) => {
  d.component($a2.__name, $a2);
};
var ci = { class: "m-segmented-group" };
var vi = ["onClick"];
var pi = ["checked", "disabled"];
var fi = ["title"];
var hi = defineComponent({ __name: "Segmented", props: { block: { type: Boolean, default: false }, disabled: { type: Boolean, default: false }, options: { default: () => [] }, size: { default: "middle" }, value: { default: void 0 } }, emits: ["update:value", "change"], setup(d, { emit: a }) {
  const e = d, l = a;
  function t(o) {
    return typeof o == "object" && (o == null ? void 0 : o.disabled) || false;
  }
  function n(o) {
    return typeof o == "object" ? o.value : o;
  }
  function u(o) {
    return typeof o == "object" ? o.label : o;
  }
  return (o, f) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-segmented", { "segmented-small": o.size == "small", "segmented-large": o.size == "large", "segmented-block": o.block }]) }, [createBaseVNode("div", ci, [(openBlock(true), createElementBlock(Fragment, null, renderList(o.options, (v, h2) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-segmented-item", { "segmented-item-selected": o.value === n(v), "segmented-item-disabled": o.disabled || t(v), "segmented-item-block": o.block }]), key: h2, onClick: (w) => {
    return o.disabled || t(v) ? () => false : void ((m = n(v)) !== e.value && (l("update:value", m), l("change", m)));
    var m;
  } }, [createBaseVNode("input", { type: "radio", class: "segmented-item-input", checked: o.value === n(v), disabled: o.disabled || t(v) }, null, 8, pi), createBaseVNode("div", { class: "segmented-item-label", title: typeof v == "object" && v.payload ? void 0 : String(u(v)) }, [renderSlot(o.$slots, "label", { label: u(v), payload: typeof v == "object" ? v.payload : {} }, () => [createTextVNode(toDisplayString(u(v)), 1)], true)], 8, fi)], 10, vi))), 128))])], 2));
} });
var Ba2 = N(hi, [["__scopeId", "data-v-838ba264"]]);
Ba2.install = (d) => {
  d.component(Ba2.__name, Ba2);
};
var Sa2 = N(defineComponent({ __name: "Slider", props: { width: { default: "100%" }, height: { default: "100%" }, vertical: { type: Boolean, default: false }, min: { default: 0 }, max: { default: 100 }, disabled: { type: Boolean, default: false }, range: { type: Boolean, default: false }, step: { default: 1 }, formatTooltip: { type: Function, default: (d) => d }, tooltip: { type: Boolean, default: true }, value: { default: 0 } }, emits: ["update:value", "change"], setup(d, { emit: a }) {
  const e = d, l = ref(), t = ref(), n = ref(), u = ref(0), o = ref(0), f = ref(), v = ref(), h2 = ref(), w = ref(), m = a, g = computed(() => e.vertical ? n.value : t.value), p = computed(() => e.vertical ? { height: typeof e.height == "number" ? e.height + "px" : e.height } : { width: typeof e.width == "number" ? e.width + "px" : e.width }), k = computed(() => e.vertical ? { bottom: u.value + "px", top: "auto", height: o.value - u.value + "px" } : { left: u.value + "px", right: "auto", width: o.value - u.value + "px" }), z = computed(() => e.vertical ? { bottom: u.value + "px", top: "auto", transform: "translate(-50%, 50%)" } : { left: u.value + "px", right: "auto", transform: "translate(-50%, -50%)" }), M = computed(() => e.vertical ? { bottom: o.value + "px", top: "auto", transform: "translate(-50%, 50%)" } : { left: o.value + "px", right: "auto", transform: "translate(-50%, -50%)" }), y = computed(() => {
    var A;
    return ((A = e.step.toString().split(".")[1]) == null ? void 0 : A.length) ?? 0;
  }), c = computed(() => {
    let R;
    if (o.value === g.value ? R = e.max : (R = T(Q(o.value, "/") * e.step + e.min, y.value), e.step > 1 && (R = Math.round(R / e.step) * e.step)), e.range) {
      let A = T(Q(u.value, "/") * e.step + e.min, y.value);
      return e.step > 1 && (A = Math.round(A / e.step) * e.step), [A, R];
    }
    return R;
  }), $ = computed(() => e.range ? e.formatTooltip(c.value[0]) : null), x = computed(() => e.range ? e.formatTooltip(c.value[1]) : e.formatTooltip(c.value));
  function C() {
    t.value = l.value.offsetWidth, n.value = l.value.offsetHeight;
  }
  function L() {
    if (e.range) {
      const R = Q((function(H) {
        return H < e.min ? e.min : H;
      }(e.value[0]) - e.min) / e.step, "*");
      u.value = T(R, 2);
      const A = Q((function(H) {
        return H > e.max ? e.max : H;
      }(e.value[1]) - e.min) / e.step, "*");
      o.value = T(A, 2);
    } else {
      const R = Q((function(A) {
        return A < e.min ? e.min : A > e.max ? e.max : A;
      }(e.value) - e.min) / e.step, "*");
      o.value = T(R, 2);
    }
  }
  function T(R, A) {
    return parseFloat(R.toFixed(A));
  }
  function P(R) {
    R.classList.remove("show-handle-tooltip");
  }
  function q(R, A) {
    R.focus(), e.tooltip && A.classList.add("show-handle-tooltip");
  }
  function Z() {
    let R;
    R = e.vertical ? l.value.getBoundingClientRect().bottom : l.value.getBoundingClientRect().left, window.onmousemove = (A) => {
      let H;
      if (e.tooltip && v.value.classList.add("show-handle-tooltip"), e.vertical) {
        const re = Math.round(Q(R - A.clientY, "/"));
        H = T(Q(re, "*"), 2);
      } else {
        const re = Math.round(Q(A.clientX - R, "/"));
        H = T(Q(re, "*"), 2);
      }
      H < 0 ? u.value = 0 : H >= 0 && H <= o.value ? u.value = H : (u.value = o.value, h2.value.focus(), U());
    }, window.onmouseup = () => {
      e.tooltip && v.value.classList.remove("show-handle-tooltip"), window.onmousemove = null;
    };
  }
  function U() {
    let R;
    R = e.vertical ? l.value.getBoundingClientRect().bottom : l.value.getBoundingClientRect().left, window.onmousemove = (A) => {
      let H;
      if (e.tooltip && w.value.classList.add("show-handle-tooltip"), e.vertical) {
        const re = Math.round(Q(R - A.clientY, "/"));
        H = T(Q(re, "*"), 2);
      } else {
        const re = Math.round(Q(A.clientX - R, "/"));
        H = T(Q(re, "*"), 2);
      }
      H > g.value ? o.value = g.value : u.value <= H && H <= g.value ? o.value = H : (o.value = u.value, e.range && (f.value.focus(), Z()));
    }, window.onmouseup = () => {
      e.tooltip && w.value.classList.remove("show-handle-tooltip"), window.onmousemove = null;
    };
  }
  function le(R, A) {
    const H = Q(R, "-");
    A === "low" ? u.value = H < 0 ? 0 : H : H >= u.value ? o.value = H : (o.value = u.value, u.value = H, f.value.focus());
  }
  function J(R, A) {
    const H = Q(R, "+");
    A === "high" ? H > g.value ? o.value = g.value : o.value = H : H <= o.value ? u.value = H : (u.value = o.value, o.value = H, h2.value.focus());
  }
  function Q(R, A) {
    return A === "+" ? R + g.value * e.step / (e.max - e.min) : A === "-" ? R - g.value * e.step / (e.max - e.min) : A === "*" ? R * g.value * e.step / (e.max - e.min) : A === "/" ? R * (e.max - e.min) / (g.value * e.step) : R;
  }
  return watch(() => [e.min, e.max, e.step, e.vertical, e.value], () => {
    L();
  }, { deep: true }), watch(c, (R) => {
    m("update:value", R), m("change", R);
  }), je2(l, () => {
    C(), L();
  }), onMounted(() => {
    C(), L();
  }), (R, A) => (openBlock(), createElementBlock("div", { ref_key: "sliderRef", ref: l, class: normalizeClass(["m-slider", { "slider-horizontal": !R.vertical, "slider-vertical": R.vertical, "slider-disabled": R.disabled }]), style: normalizeStyle(p.value), onClick: A[12] || (A[12] = (H) => R.disabled ? () => false : function(re) {
    let V;
    if (e.vertical) {
      const X = l.value.getBoundingClientRect().bottom, ne = Math.round(Q(X - re.clientY, "/"));
      V = T(Q(ne, "*"), 2);
    } else {
      const X = l.value.getBoundingClientRect().left, ne = Math.round(Q(re.clientX - X, "/"));
      V = T(Q(ne, "*"), 2);
    }
    e.range ? V <= u.value ? (u.value = V, q(f.value, v.value)) : V >= o.value ? (o.value = V, q(h2.value, w.value)) : V - u.value < o.value - V ? (u.value = V, q(f.value, v.value)) : (o.value = V, q(h2.value, w.value)) : (o.value = V, q(h2.value, w.value));
  }(H)) }, [A[15] || (A[15] = createBaseVNode("div", { class: "slider-rail" }, null, -1)), createBaseVNode("div", { class: "slider-track", style: normalizeStyle(k.value) }, null, 4), R.range ? (openBlock(), createElementBlock("div", { key: 0, tabindex: "0", ref_key: "lowHandle", ref: f, class: "slider-handle", style: normalizeStyle(z.value), onKeydown: [A[0] || (A[0] = withKeys(withModifiers((H) => R.disabled ? () => false : le(u.value, "low"), ["prevent"]), ["left"])), A[1] || (A[1] = withKeys(withModifiers((H) => R.disabled ? () => false : J(u.value, "low"), ["prevent"]), ["right"])), A[2] || (A[2] = withKeys(withModifiers((H) => R.disabled ? () => false : le(u.value, "low"), ["prevent"]), ["down"])), A[3] || (A[3] = withKeys(withModifiers((H) => R.disabled ? () => false : J(u.value, "low"), ["prevent"]), ["up"]))], onMousedown: A[4] || (A[4] = (H) => R.disabled ? () => false : Z()), onBlur: A[5] || (A[5] = (H) => R.tooltip && !R.disabled ? P(v.value) : () => false) }, [R.tooltip ? (openBlock(), createElementBlock("div", { key: 0, ref_key: "lowTooltip", ref: v, class: "handle-tooltip" }, [createTextVNode(toDisplayString($.value) + " ", 1), A[13] || (A[13] = createBaseVNode("div", { class: "tooltip-arrow" }, null, -1))], 512)) : createCommentVNode("", true)], 36)) : createCommentVNode("", true), createBaseVNode("div", { tabindex: "0", ref_key: "highHandle", ref: h2, class: "slider-handle", style: normalizeStyle(M.value), onKeydown: [A[6] || (A[6] = withKeys(withModifiers((H) => R.disabled ? () => false : le(o.value, "high"), ["prevent"]), ["left"])), A[7] || (A[7] = withKeys(withModifiers((H) => R.disabled ? () => false : J(o.value, "high"), ["prevent"]), ["right"])), A[8] || (A[8] = withKeys(withModifiers((H) => R.disabled ? () => false : le(o.value, "high"), ["prevent"]), ["down"])), A[9] || (A[9] = withKeys(withModifiers((H) => R.disabled ? () => false : J(o.value, "high"), ["prevent"]), ["up"]))], onMousedown: A[10] || (A[10] = (H) => R.disabled ? () => false : U()), onBlur: A[11] || (A[11] = (H) => R.tooltip && !R.disabled ? P(w.value) : () => false) }, [R.tooltip ? (openBlock(), createElementBlock("div", { key: 0, ref_key: "highTooltip", ref: w, class: "handle-tooltip" }, [createTextVNode(toDisplayString(x.value) + " ", 1), A[14] || (A[14] = createBaseVNode("div", { class: "tooltip-arrow" }, null, -1))], 512)) : createCommentVNode("", true)], 36)], 6));
} }), [["__scopeId", "data-v-32259142"]]);
Sa2.install = (d) => {
  d.component(Sa2.__name, Sa2);
};
var mi = { class: "m-statistic" };
var gi = { key: 0, class: "statistic-title" };
var yi = { key: 0, class: "statistic-prefix" };
var bi = { class: "statistic-value" };
var wi = { key: 1, class: "statistic-suffix" };
var La = N(defineComponent({ __name: "Statistic", props: { title: { default: void 0 }, value: { default: void 0 }, valueStyle: { default: () => ({}) }, precision: { default: 0 }, prefix: { default: void 0 }, suffix: { default: void 0 }, separator: { default: "," }, formatter: { type: Function, default: (d) => d } }, setup(d) {
  const a = d, e = computed(() => a.formatter(ol(a.value || "", a.precision, a.separator))), l = he(["title", "prefix", "suffix"]), t = computed(() => l.title || a.title), n = computed(() => l.prefix || a.prefix), u = computed(() => l.suffix || a.suffix);
  return (o, f) => (openBlock(), createElementBlock("div", mi, [t.value ? (openBlock(), createElementBlock("div", gi, [renderSlot(o.$slots, "title", {}, () => [createTextVNode(toDisplayString(o.title), 1)], true)])) : createCommentVNode("", true), createBaseVNode("div", { class: "statistic-content", style: normalizeStyle(o.valueStyle) }, [n.value ? (openBlock(), createElementBlock("span", yi, [renderSlot(o.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(o.prefix), 1)], true)])) : createCommentVNode("", true), createBaseVNode("span", bi, [renderSlot(o.$slots, "default", {}, () => [createTextVNode(toDisplayString(e.value), 1)], true)]), u.value ? (openBlock(), createElementBlock("span", wi, [renderSlot(o.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(o.suffix), 1)], true)])) : createCommentVNode("", true)], 4)]));
} }), [["__scopeId", "data-v-f3184a0b"]]);
La.install = (d) => {
  d.component(La.__name, La);
};
var ki = ["onClick"];
var xi = { class: "steps-icon" };
var Mi = { key: 0, class: "steps-num" };
var _i = { key: 1, class: "icon-svg", focusable: "false", "data-icon": "check", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Ci = { key: 1, class: "steps-dot" };
var zi = { class: "m-steps-content" };
var $i = { class: "steps-title" };
var Bi = { key: 0, class: "steps-description" };
var Si = defineComponent({ __name: "Steps", props: { steps: { default: () => [] }, width: { default: "auto" }, size: { default: "default" }, vertical: { type: Boolean, default: false }, labelPlacement: { default: "right" }, dotted: { type: Boolean, default: false }, current: { default: 1 } }, emits: ["update:current", "change"], setup(d, { emit: a }) {
  const e = d, l = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), t = computed(() => e.steps.length), n = computed(() => e.current < 1 ? 1 : e.current > t.value + 1 ? t.value + 1 : e.current), u = a;
  return (o, f) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-steps", { "steps-small": o.size === "small", "steps-vertical": o.vertical, "steps-label-bottom": !o.vertical && (o.labelPlacement === "bottom" || o.dotted), "steps-dotted": o.dotted }]), style: normalizeStyle(`width: ${l.value};`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(o.steps, (v, h2) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-steps-item", { "steps-finish": n.value > h2 + 1, "steps-process": n.value === h2 + 1, "steps-wait": n.value < h2 + 1 }]), key: h2 }, [createBaseVNode("div", { tabindex: "0", class: "steps-info-wrap", onClick: (w) => function(m) {
    n.value !== m && (u("update:current", m), u("change", m));
  }(h2 + 1) }, [f[1] || (f[1] = createBaseVNode("div", { class: "steps-tail" }, null, -1)), createBaseVNode("div", xi, [o.dotted ? (openBlock(), createElementBlock("span", Ci)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [n.value <= h2 + 1 ? (openBlock(), createElementBlock("span", Mi, toDisplayString(h2 + 1), 1)) : (openBlock(), createElementBlock("svg", _i, f[0] || (f[0] = [createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1)])))], 64))]), createBaseVNode("div", zi, [createBaseVNode("div", $i, toDisplayString(v.title), 1), v.description ? (openBlock(), createElementBlock("div", Bi, toDisplayString(v.description), 1)) : createCommentVNode("", true)])], 8, ki)], 2))), 128))], 6));
} });
var Fa2 = N(Si, [["__scopeId", "data-v-2daacb92"]]);
Fa2.install = (d) => {
  d.component(Fa2.__name, Fa2);
};
var Li = ["href", "target"];
var Fi = ["src", "alt"];
var Ai = ["href", "target"];
var Di = ["src", "alt"];
var Ei = ["href", "target"];
var Ti = ["src", "alt"];
var Hi = defineComponent({ __name: "Swiper", props: { images: { default: () => [] }, width: { default: "100%" }, height: { default: "100%" }, mode: { default: "banner" }, navigation: { type: Boolean, default: false }, effect: { default: "slide" }, delay: { default: 3e3 }, speed: { default: 300 }, loop: { type: Boolean, default: true }, pauseOnMouseEnter: { type: Boolean, default: false }, swipe: { type: Boolean, default: true }, preloaderColor: { default: "theme" } }, emits: ["swiper", "change"], setup(d, { emit: a }) {
  const e = d, l = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), t = computed(() => typeof e.height == "number" ? e.height + "px" : e.height), n = computed(() => {
    const g = [Navigation, Pagination, Autoplay], p = { fade: EffectFade, cube: EffectCube, flip: EffectFlip, coverflow: EffectCoverflow, cards: EffectCards, creative: EffectCreative };
    return e.effect !== "slide" && g.push(p[e.effect]), g;
  }), u = ref({ delay: e.delay, disableOnInteraction: false, pauseOnMouseEnter: e.pauseOnMouseEnter }), o = ref([Autoplay]), f = ref({ delay: 0, disableOnInteraction: false }), v = ref([Navigation, Pagination, Mousewheel]), h2 = a;
  function w(g) {
    h2("swiper", g), e.mode === "carousel" && e.pauseOnMouseEnter && (g.el.onmouseenter = () => {
      g.autoplay.stop();
    }, g.el.onmouseleave = () => {
      g.autoplay.start();
    });
  }
  function m(g) {
    if (g.name) return g.name;
    {
      const p = g.src.split("?")[0].split("/");
      return p[p.length - 1];
    }
  }
  return (g, p) => (openBlock(), createElementBlock(Fragment, null, [g.mode === "banner" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 0, class: { "swiper-no-swiping": !g.swipe }, style: `width: ${l.value}; height: ${t.value};`, modules: n.value, navigation: g.navigation, "slides-per-view": 1, autoplay: u.value, effect: g.effect, speed: g.speed, loop: g.loop, lazy: "", onSwiper: w, onSlideChange: p[0] || (p[0] = (k) => g.$emit("change", k)) }, g.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(g.images, (k, z) => (openBlock(), createBlock(unref(SwiperSlide), { key: z }, { default: withCtx(() => [createBaseVNode("a", { class: "image-link", href: k.link ? k.link : "javascript:;", target: k.link ? "_blank" : "_self" }, [createBaseVNode("img", { class: "u-image", src: k.src, alt: m(k), loading: "lazy" }, null, 8, Fi)], 8, Li), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${g.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["class", "style", "modules", "navigation", "autoplay", "effect", "speed", "loop"])) : createCommentVNode("", true), g.mode === "carousel" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 1, class: "swiper-no-swiping", style: `width: ${l.value}; height: ${t.value};`, modules: o.value, autoplay: f.value, speed: g.speed, loop: g.loop, lazy: "", onSwiper: w, onSlideChange: p[1] || (p[1] = (k) => g.$emit("change", k)) }, g.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(g.images, (k, z) => (openBlock(), createBlock(unref(SwiperSlide), { key: z }, { default: withCtx(() => [createBaseVNode("a", { class: "image-link", href: k.link ? k.link : "javascript:;", target: k.link ? "_blank" : "_self" }, [createBaseVNode("img", { class: "u-image", src: k.src, alt: m(k), loading: "lazy" }, null, 8, Di)], 8, Ai), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${g.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["style", "modules", "autoplay", "speed", "loop"])) : createCommentVNode("", true), g.mode === "broadcast" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 2, style: `width: ${l.value}; height: ${t.value};`, modules: v.value, navigation: g.navigation, speed: g.speed, loop: g.loop, lazy: "", onSwiper: w, onSlideChange: p[2] || (p[2] = (k) => g.$emit("change", k)) }, g.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(g.images, (k, z) => (openBlock(), createBlock(unref(SwiperSlide), { key: z }, { default: withCtx(() => [createBaseVNode("a", { href: k.link ? k.link : "javascript:;", target: k.link ? "_blank" : "_self", class: "image-link" }, [createBaseVNode("img", { class: "u-image", src: k.src, alt: m(k), loading: "lazy" }, null, 8, Ti)], 8, Ei), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${g.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["style", "modules", "navigation", "speed", "loop"])) : createCommentVNode("", true)], 64));
} });
var Aa2 = N(Hi, [["__scopeId", "data-v-c21a7314"]]);
Aa2.install = (d) => {
  d.component(Aa2.__name, Aa2);
};
var Ii = { class: "switch-inner" };
var Pi = { class: "inner-checked" };
var Vi = { class: "inner-unchecked" };
var Ri = { key: 0, class: "circular", viewBox: "0 0 50 50" };
var Da = N(defineComponent({ __name: "Switch", props: { checked: { default: void 0 }, checkedValue: { type: [Boolean, String, Number], default: true }, unchecked: { default: void 0 }, uncheckedValue: { type: [Boolean, String, Number], default: false }, loading: { type: Boolean, default: false }, disabled: { type: Boolean, default: false }, size: { default: "middle" }, rippleColor: { default: "#1677ff" }, circleStyle: { default: () => ({}) }, modelValue: { type: [Boolean, String, Number], default: false } }, emits: ["update:modelValue", "change"], setup(d, { emit: a }) {
  const e = d, l = ref(false), t = a;
  function n() {
    l.value = false;
  }
  return (u, o) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-switch", { "switch-loading": u.loading, "switch-small": u.size === "small", "switch-large": u.size === "large", "switch-checked": u.modelValue === u.checkedValue, "switch-disabled": u.disabled }]), style: normalizeStyle(`--ripple-color: ${u.rippleColor};`), onClick: o[0] || (o[0] = (f) => u.disabled || u.loading ? () => false : (e.modelValue === e.checkedValue ? (t("update:modelValue", e.uncheckedValue), t("change", e.uncheckedValue)) : (t("update:modelValue", e.checkedValue), t("change", e.checkedValue)), void (l.value ? (l.value = false, nextTick(() => {
    l.value = true;
  })) : l.value = true))) }, [createBaseVNode("div", Ii, [createBaseVNode("span", Pi, [renderSlot(u.$slots, "checked", {}, () => [createTextVNode(toDisplayString(u.checked), 1)], true)]), createBaseVNode("span", Vi, [renderSlot(u.$slots, "unchecked", {}, () => [createTextVNode(toDisplayString(u.unchecked), 1)], true)])]), createBaseVNode("div", { class: "switch-circle", style: normalizeStyle(u.circleStyle) }, [u.loading ? (openBlock(), createElementBlock("svg", Ri, o[1] || (o[1] = [createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" }, null, -1)]))) : createCommentVNode("", true), renderSlot(u.$slots, "node", { checked: u.modelValue }, void 0, true)], 4), u.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["switch-wave", { "wave-active": l.value }]), onAnimationend: n }, null, 34))], 6));
} }), [["__scopeId", "data-v-a0c4277c"]]);
Da.install = (d) => {
  d.component(Da.__name, Da);
};
var ji = { class: "m-table-wrap" };
var Wi = { class: "m-table" };
var Ni = { class: "table-tr" };
var qi = { class: "m-table-body" };
var Oi = { class: "table-loading" };
var Ki = { class: "table-empty-wrap" };
var Yi = ["colspan"];
var Ui = ["title"];
var Gi = { key: 1 };
var Zi = defineComponent({ __name: "Table", props: { columns: { default: () => [] }, dataSource: { default: () => [] }, loading: { type: Boolean, default: false }, spinProps: { default: () => ({}) }, emptyProps: { default: () => ({}) }, showPagination: { type: Boolean, default: true }, pagination: { default: () => ({}) } }, emits: ["change"], setup(d, { emit: a }) {
  const e = a;
  function l(t, n) {
    e("change", t, n);
  }
  return (t, n) => (openBlock(), createElementBlock("div", ji, [createBaseVNode("table", Wi, [createBaseVNode("thead", null, [createBaseVNode("tr", Ni, [(openBlock(true), createElementBlock(Fragment, null, renderList(t.columns, (u, o) => (openBlock(), createElementBlock("th", { class: "table-th", style: normalizeStyle(`width: ${typeof u.width == "number" ? u.width + "px" : u.width};`), key: o }, toDisplayString(u.title), 5))), 128))])]), createBaseVNode("tbody", qi, [withDirectives(createBaseVNode("tr", Oi, [createVNode(unref(Be2), mergeProps({ class: "loading", size: "small", colspan: t.columns.length }, t.spinProps), null, 16, ["colspan"])], 512), [[vShow, t.loading]]), withDirectives(createBaseVNode("tr", Ki, [createBaseVNode("td", { class: "table-empty", colspan: t.columns.length }, [createVNode(unref(Ee), mergeProps({ class: "empty", image: "outlined" }, t.emptyProps), null, 16)], 8, Yi)], 512), [[vShow, !t.dataSource.length]]), (openBlock(true), createElementBlock(Fragment, null, renderList(t.dataSource, (u, o) => (openBlock(), createElementBlock("tr", { class: "table-tr", key: o }, [(openBlock(true), createElementBlock(Fragment, null, renderList(t.columns, (f, v) => (openBlock(), createElementBlock("td", { class: "m-td", key: v, title: u[f.dataIndex] }, [f.slot ? renderSlot(t.$slots, f.slot, mergeProps({ key: 0, ref_for: true }, u, { index: o }), () => [createTextVNode(toDisplayString(u[f.dataIndex] || "--"), 1)], true) : (openBlock(), createElementBlock("span", Gi, toDisplayString(u[f.dataIndex] || "--"), 1))], 8, Ui))), 128))]))), 128))])]), t.showPagination ? (openBlock(), createBlock(unref(Re), mergeProps({ key: 0, class: "mt16", onChange: l }, t.pagination), null, 16)) : createCommentVNode("", true)]));
} });
var Ea2 = N(Zi, [["__scopeId", "data-v-9b65379b"]]);
Ea2.install = (d) => {
  d.component(Ea2.__name, Ea2);
};
var Xi = { key: 0, class: "tabs-prefix" };
var Qi = ["onClick"];
var Ji = { key: 1, class: "tabs-suffix" };
var en = defineComponent({ __name: "Tabs", props: { tabPages: { default: () => [] }, prefix: { default: void 0 }, suffix: { default: void 0 }, animated: { type: Boolean, default: true }, centered: { type: Boolean, default: false }, size: { default: "middle" }, type: { default: "line" }, tabGutter: { default: void 0 }, tabStyle: { default: () => ({}) }, tabPosition: { default: "top" }, contentStyle: { default: () => ({}) }, activeKey: { default: void 0 } }, emits: ["update:activeKey", "change"], setup(d, { emit: a }) {
  const e = d, l = ref(), t = ref(0), n = ref(0), u = ref(0), o = ref(0), f = ref(), v = ref(), h2 = ref(), w = ref(), m = ref(), g = ref(), p = ref(false), k = ref(0), z = ref(0), M = ref(0), y = ref(false), c = a, $ = he(["prefix", "suffix"]), x = computed(() => e.tabPages.findIndex((V, X) => A(V.key, X) === e.activeKey)), C = computed(() => !!($.prefix || e.prefix)), L = computed(() => !!($.suffix || e.suffix)), T = computed(() => ["top", "bottom"].includes(e.tabPosition) ? p.value && z.value > 0 : p.value && M.value > 0), P = computed(() => ["top", "bottom"].includes(e.tabPosition) ? p.value && z.value < k.value : p.value && M.value < k.value), q = computed(() => ["top", "bottom"].includes(e.tabPosition) ? { transform: `translate(${-z.value}px, 0)` } : { transform: `translate(0, ${-M.value}px)` }), Z = computed(() => ["top", "bottom"].includes(e.tabPosition) ? { marginLeft: `${e.tabGutter}px` } : { marginTop: `${e.tabGutter}px` }), U = computed(() => ["top", "bottom"].includes(e.tabPosition) ? { left: `${t.value}px`, width: `${u.value}px` } : { top: `${n.value}px`, height: `${o.value}px` }), le = computed(() => e.animated && ["top", "bottom"].includes(e.tabPosition) ? { marginLeft: `-${100 * x.value}%` } : {}), J = computed(() => e.animated && ["top", "bottom"].includes(e.tabPosition) ? { visibility: "hidden", height: "0px", overflowY: "hidden" } : { display: "none" });
  function Q() {
    console.log("getnavsize"), ["top", "bottom"].includes(e.tabPosition) ? function() {
      v.value = f.value.offsetWidth, m.value = w.value.offsetWidth, m.value > v.value ? (p.value = true, k.value = m.value - v.value, z.value = k.value) : (p.value = false, z.value = 0), R();
    }() : function() {
      h2.value = f.value.offsetHeight, g.value = w.value.offsetHeight, g.value > h2.value ? (p.value = true, k.value = g.value - h2.value, M.value = k.value) : (p.value = false, M.value = 0), R();
    }();
  }
  function R() {
    ["top", "bottom"].includes(e.tabPosition) ? function() {
      const V = l.value[x.value];
      if (V) {
        if (t.value = V.offsetLeft, u.value = V.offsetWidth, p.value) {
          t.value < z.value && (y.value = true, z.value = t.value);
          const X = t.value + u.value - v.value;
          X > z.value && (y.value = true, z.value = X);
        }
      } else t.value = 0, u.value = 0;
    }() : function() {
      const V = l.value[x.value];
      if (V) {
        if (n.value = V.offsetTop, o.value = V.offsetHeight, p.value) {
          n.value < M.value && (y.value = true, M.value = n.value);
          const X = n.value + o.value - h2.value;
          X > M.value && (y.value = true, M.value = X);
        }
      } else n.value = 0, o.value = 0;
    }();
  }
  function A(V, X) {
    return V === void 0 ? X : V;
  }
  function H(V) {
    V.stopPropagation(), V.preventDefault(), (V.deltaX || V.deltaY) && (["top", "bottom"].includes(e.tabPosition) ? function(X) {
      const ne = 1 * (X.deltaX || X.deltaY);
      z.value + ne > k.value ? z.value = k.value : z.value + ne < 0 ? z.value = 0 : z.value += ne;
    }(V) : function(X) {
      const ne = 1 * (X.deltaX || X.deltaY);
      M.value + ne > k.value ? M.value = k.value : M.value + ne < 0 ? M.value = 0 : M.value += ne, console.log("scrollLeft", z.value), console.log("scrollTop", M.value), console.log("scrollMax", k.value);
    }(V));
  }
  function re(V, X) {
    return e.activeKey !== A(V, X) ? J.value : {};
  }
  return watch(() => e.activeKey, () => {
    R();
  }, { flush: "post" }), je2([f, w], () => {
    Q();
  }), onMounted(() => {
    Q();
  }), (V, X) => {
    var ne;
    return openBlock(), createElementBlock("div", { class: normalizeClass(["m-tabs", [`tabs-${V.tabPosition} tabs-${V.size}`, { "tabs-card": V.type === "card" }]]) }, [createBaseVNode("div", { class: "m-tabs-nav", style: normalizeStyle(V.tabStyle) }, [C.value ? (openBlock(), createElementBlock("div", Xi, [renderSlot(V.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(V.prefix), 1)], true)])) : createCommentVNode("", true), createBaseVNode("div", { ref_key: "wrapRef", ref: f, class: normalizeClass(["tabs-nav-wrap", { "tabs-center": V.centered, "before-shadow-active": T.value, "after-shadow-active": P.value }]) }, [createBaseVNode("div", { ref_key: "navRef", ref: w, class: normalizeClass(["tabs-nav-list", { "nav-transition": y.value }]), onTransitionend: X[0] || (X[0] = (ie) => y.value = false), style: normalizeStyle(q.value), onWheel: X[1] || (X[1] = (ie) => p.value ? H(ie) : () => false) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(V.tabPages, (ie, de) => (openBlock(), createElementBlock("div", { ref_for: true, ref_key: "tabsRef", ref: l, class: normalizeClass(["tab-item", { "tab-line-active": V.type === "line" && V.activeKey === A(ie.key, de), "tab-card-active": V.type === "card" && V.activeKey === A(ie.key, de), "tab-disabled": ie.disabled }]), style: normalizeStyle(de > 0 && V.tabGutter !== void 0 ? Z.value : {}), onClick: (Me2) => {
      return ie.disabled ? () => false : (j = A(ie.key, de), c("update:activeKey", j), void c("change", j));
      var j;
    }, key: de }, [renderSlot(V.$slots, "tab", { key: A(ie.key, de), tab: ie.tab }, () => [ie.icon ? (openBlock(), createBlock(resolveDynamicComponent(ie.icon), { key: 0 })) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(ie.tab), 1)], true)], 14, Qi))), 128)), createBaseVNode("div", { class: normalizeClass(["tab-bar", { "tab-bar-disabled": (ne = V.tabPages[x.value]) == null ? void 0 : ne.disabled, "card-hidden": V.type === "card" }]), style: normalizeStyle(U.value) }, null, 6)], 38)], 2), L.value ? (openBlock(), createElementBlock("div", Ji, [renderSlot(V.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(V.suffix), 1)], true)])) : createCommentVNode("", true)], 4), createBaseVNode("div", { class: "m-tabs-page", style: normalizeStyle(V.contentStyle) }, [createBaseVNode("div", { class: normalizeClass(["tabs-content-wrap", { "tabs-content-animated": V.animated && ["top", "bottom"].includes(V.tabPosition) }]), style: normalizeStyle(le.value) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(V.tabPages, (ie, de) => (openBlock(), createElementBlock("div", { class: "tabs-content", style: normalizeStyle(re(ie.key, de)), key: ie.key || de }, [renderSlot(V.$slots, "content", { key: A(ie.key, de), content: ie.content }, () => [createTextVNode(toDisplayString(ie.content), 1)], true)], 4))), 128))], 6)], 4)], 2);
  };
} });
var Ta2 = N(en, [["__scopeId", "data-v-d71d11ba"]]);
Ta2.install = (d) => {
  d.component(Ta2.__name, Ta2);
};
var an = { key: 0, class: "tag-icon" };
var ln2 = { class: "tag-content" };
var tn = { class: "tag-content" };
var on2 = ["onClick"];
var sn2 = defineComponent({ __name: "Tag", props: { closable: { type: Boolean, default: false }, color: { default: void 0 }, icon: { default: void 0 }, size: { default: "middle" }, bordered: { type: Boolean, default: true }, dynamic: { type: Boolean, default: false }, value: { default: () => [] }, spaceProps: { default: () => ({}) } }, emits: ["update:value", "close", "dynamicClose"], setup(d, { emit: a }) {
  const e = d, l = computed(() => {
    if (e.dynamic && e.value.length) {
      if (typeof e.value[0] == "string") return true;
      if (typeof e.value[0] == "object") return false;
    }
    return null;
  }), t = computed(() => e.dynamic && e.value.length ? l.value ? e.value.map((c) => ({ label: c, closable: true })) : e.value.map((c) => ({ closable: true, ...c })) : []), n = he(["icon"]), u = computed(() => !e.dynamic && (n.icon || e.icon)), o = ref(), f = ref(false), v = ref(""), h2 = ["success", "processing", "error", "warning", "default", "pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"], w = ref(false), m = ref(), g = ref(Array(e.value.length).fill(1));
  watchEffect(() => {
    if (e.dynamic) {
      const c = e.value.length;
      g.value = Array(c).fill(1), nextTick(() => {
        if (m.value) for (let $ = 0; $ < c; $++) g.value[$] = m.value[$].offsetWidth;
      });
    }
  });
  const p = a;
  function k(c) {
    w.value = true, p("close", c);
  }
  function z() {
    f.value = true, nextTick(() => {
      o.value.focus();
    });
  }
  function M() {
    l.value ? p("update:value", [...e.value, v.value]) : p("update:value", [...e.value, { label: v.value }]), f.value = false, o.value = "";
  }
  function y(c) {
    c.key === "Enter" && o.value.blur();
  }
  return (c, $) => c.dynamic ? (openBlock(), createBlock(unref(He2), mergeProps({ key: 1, gap: "small" }, c.spaceProps), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(t.value, (x, C) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-tag", [`tag-${x.size || c.size}`, (x.color || c.color) && h2.includes(x.color || c.color) ? `tag-${x.color || c.color}` : "", { "tag-borderless": x.bordered !== void 0 && !x.bordered, "tag-has-color": (x.color || c.color) && !h2.includes(x.color || c.color) }]]), style: normalizeStyle(`background-color: ${!x.color && !c.color || h2.includes(x.color || c.color) ? "" : x.color || c.color};`), key: C }, [g.value[C] ? (openBlock(), createElementBlock("span", { key: 0, ref_for: true, ref_key: "tagsIconRef", ref: m, class: "tag-icon" }, [renderSlot(c.$slots, "icon", { index: C }, () => [createTextVNode(toDisplayString(x.icon), 1)], true)], 512)) : createCommentVNode("", true), createBaseVNode("span", tn, [renderSlot(c.$slots, "default", { label: x.label, index: C }, () => [createTextVNode(toDisplayString(x.label), 1)], true)]), x.closable || c.closable ? (openBlock(), createElementBlock("span", { key: 1, class: "tag-close", onClick: (L) => function(T, P) {
    const q = e.value.filter((Z, U) => U !== P);
    p("update:value", q), p("dynamicClose", T, P);
  }(x, C) }, $[3] || ($[3] = [createBaseVNode("svg", { focusable: "false", class: "close-svg", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1)]), 8, on2)) : createCommentVNode("", true)], 6))), 128)), f.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-tag", [`tag-${c.size}`, { "tag-plus": c.dynamic }]]), onClick: z }, $[4] || ($[4] = [createBaseVNode("svg", { focusable: "false", class: "plus-svg", "data-icon": "plus", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }), createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })], -1)]), 2)), f.value ? withDirectives((openBlock(), createElementBlock("input", { key: 1, ref_key: "inputRef", ref: o, class: normalizeClass(["tag-input", `input-${c.size}`]), type: "text", "onUpdate:modelValue": $[0] || ($[0] = (x) => v.value = x), onBlur: $[1] || ($[1] = (x) => f.value = false), onChange: M, onKeydown: y }, null, 34)), [[vModelText, v.value]]) : createCommentVNode("", true)]), _: 3 }, 16)) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-tag", [`tag-${c.size}`, c.color && h2.includes(c.color) ? `tag-${c.color}` : "", { "tag-borderless": !c.bordered, "tag-has-color": c.color && !h2.includes(c.color), "tag-hidden": w.value }]]), style: normalizeStyle(`background-color: ${c.color && !h2.includes(c.color) ? c.color : ""};`) }, [u.value ? (openBlock(), createElementBlock("span", an, [renderSlot(c.$slots, "icon", {}, () => [createTextVNode(toDisplayString(c.icon), 1)], true)])) : createCommentVNode("", true), createBaseVNode("span", ln2, [renderSlot(c.$slots, "default", {}, void 0, true)]), c.closable ? (openBlock(), createElementBlock("span", { key: 1, class: "tag-close", onClick: k }, $[2] || ($[2] = [createBaseVNode("svg", { focusable: "false", class: "close-svg", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1)]))) : createCommentVNode("", true)], 6));
} });
var Ha2 = N(sn2, [["__scopeId", "data-v-7fdb5597"]]);
Ha2.install = (d) => {
  d.component(Ha2.__name, Ha2);
};
var nn = ["data-count"];
var un2 = ["value", "placeholder", "maxlength", "disabled"];
var Ia = N(defineComponent({ __name: "Textarea", props: { width: { default: "100%" }, allowClear: { type: Boolean, default: false }, autoSize: { type: [Boolean, Object], default: false }, disabled: { type: Boolean, default: false }, placeholder: { default: void 0 }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, value: { default: "" }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "enter"], setup(d, { emit: a }) {
  const e = d, l = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), t = computed(() => {
    if (typeof e.autoSize == "object") {
      const z = { height: v.value + "px", resize: "none" };
      return "minRows" in e.autoSize && (z["min-height"] = 22 * e.autoSize.minRows + 10 + "px"), "maxRows" in e.autoSize && (z["max-height"] = 22 * e.autoSize.maxRows + 10 + "px"), z;
    }
    if (typeof e.autoSize == "boolean") return e.autoSize ? { height: v.value + "px", resize: "none" } : {};
  }), n = computed(() => !e.disabled && e.allowClear && e.value), u = computed(() => e.maxlength ? e.value.length + " / " + e.maxlength : e.value.length), o = computed(() => "lazy" in e.valueModifiers);
  watch(() => e.value, () => {
    JSON.stringify(t.value) !== "{}" && (v.value = 32, nextTick(() => {
      h2();
    }));
  }, { flush: "post" });
  const f = ref(), v = ref(32);
  function h2() {
    v.value = f.value.scrollHeight + 2;
  }
  onMounted(() => {
    h2();
  });
  const w = a;
  function m(z) {
    o.value || (w("update:value", z.target.value), w("change", z));
  }
  function g(z) {
    o.value && (w("update:value", z.target.value), w("change", z));
  }
  function p(z) {
    w("enter", z), o.value && (f.value.blur(), nextTick(() => {
      f.value.focus();
    }));
  }
  function k() {
    w("update:value", ""), f.value.focus();
  }
  return (z, M) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-textarea", { "show-count": z.showCount }]), style: normalizeStyle(`width: ${l.value};`), "data-count": u.value }, [createBaseVNode("textarea", { ref_key: "textarea", ref: f, type: "hidden", class: normalizeClass(["u-textarea", { "clear-class": n.value, "textarea-disabled": z.disabled }]), style: normalizeStyle(t.value), value: z.value, placeholder: z.placeholder, maxlength: z.maxlength, disabled: z.disabled, onInput: m, onChange: g, onKeydown: withKeys(p, ["enter"]) }, null, 46, un2), n.value ? (openBlock(), createElementBlock("svg", { key: 0, class: "clear-svg", onClick: k, focusable: "false", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, M[0] || (M[0] = [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1)]))) : createCommentVNode("", true)], 14, nn));
} }), [["__scopeId", "data-v-edf9afe9"]]);
Ia.install = (d) => {
  d.component(Ia.__name, Ia);
};
var dn2 = ["title", "href", "target", "onClick"];
var rn2 = ["title", "href", "target", "onClick"];
var cn2 = defineComponent({ __name: "TextScroll", props: { scrollText: { default: () => [] }, single: { type: Boolean, default: false }, width: { default: "100%" }, height: { default: 50 }, boardStyle: { default: () => ({}) }, textStyle: { default: () => ({}) }, amount: { default: 4 }, gap: { default: 20 }, interval: { default: 10 }, step: { default: 1 }, vertical: { type: Boolean, default: false }, verticalInterval: { default: 3e3 } }, emits: ["click"], setup(d, { emit: a }) {
  const e = d, l = computed(() => {
    if (e.single) return [e.scrollText, e.scrollText];
    {
      const x = e.scrollText;
      return x.length === e.amount ? [...x, ...x] : [...x];
    }
  }), t = computed(() => l.value.length || 0), n = computed(() => typeof e.width == "number" ? e.width + "px" : e.width), u = computed(() => e.single ? 1 : e.amount), o = ref(), f = ref(), v = ref(0), h2 = ref(0), w = ref(), m = ref(), g = ref(true);
  function p() {
    e.vertical ? g.value = true : h2.value = parseFloat((o.value.offsetWidth / u.value).toFixed(2)), w.value && be(w.value), m.value && be(m.value), k();
  }
  function k() {
    e.vertical ? t.value > 1 && (m.value && be(m.value), $()) : t.value > u.value && (w.value && be(w.value), w.value = xe(() => {
      v.value >= h2.value ? (l.value.push(l.value.shift()), v.value = 0) : v.value += e.step;
    }, e.interval, true));
  }
  function z() {
    e.vertical ? m.value && be(m.value) : w.value && be(w.value);
  }
  watch(() => [l, e.width, e.amount, e.gap, e.step, e.interval, e.vertical, e.verticalInterval], () => {
    p();
  }, { deep: true, flush: "post" }), je2([o, f], () => {
    p();
  });
  const M = a;
  function y(x) {
    M("click", x);
  }
  const c = ref(0);
  function $() {
    m.value = xe(() => {
      g.value && (g.value = false), c.value = (c.value + 1) % t.value, $();
    }, g.value ? e.verticalInterval : e.verticalInterval + 1e3);
  }
  return (x, C) => x.vertical ? (openBlock(), createElementBlock("div", { key: 1, ref_key: "verticalRef", ref: f, class: "m-slider-vertical", style: normalizeStyle([x.boardStyle, ` --enter-move: ${x.height}px; --leave-move: ${-x.height}px; --tex-gap: ${x.gap}px; height: ${x.height}px; width: ${n.value};`]) }, [createVNode(TransitionGroup, { name: "slide" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (L, T) => withDirectives((openBlock(), createElementBlock("div", { class: "m-scroll-view", key: T }, [createBaseVNode("a", { class: "slide-text", style: normalizeStyle(x.textStyle), title: L.title, href: L.link ? L.link : "javascript:;", target: L.link ? "_blank" : "_self", onMouseenter: z, onMouseleave: k, onClick: (P) => y(L) }, toDisplayString(L.title || "--"), 45, rn2)])), [[vShow, c.value === T]])), 128))]), _: 1 })], 4)) : (openBlock(), createElementBlock("div", { key: 0, ref_key: "horizontalRef", ref: o, class: "m-slider-horizontal", style: normalizeStyle([x.boardStyle, `--text-gap: ${x.gap}px; height: ${x.height}px; width: ${n.value};`]) }, [createBaseVNode("div", { class: "m-scroll-view", style: normalizeStyle(`will-change: transform; transform: translateX(${-v.value}px);`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (L, T) => (openBlock(), createElementBlock("a", { class: "slide-text", style: normalizeStyle([x.textStyle, `width: ${h2.value}px;`]), key: T, title: L.title, href: L.link ? L.link : "javascript:;", target: L.link ? "_blank" : "_self", onMouseenter: z, onMouseleave: k, onClick: (P) => y(L) }, toDisplayString(L.title || "--"), 45, dn2))), 128))], 4)], 4));
} });
var Pa2 = N(cn2, [["__scopeId", "data-v-1ecc3b2c"]]);
Pa2.install = (d) => {
  d.component(Pa2.__name, Pa2);
};
var vn2 = defineComponent({ __name: "Timeline", props: { timelineData: { default: () => [] }, width: { default: "100%" }, lineStyle: { default: "solid" }, mode: { default: "left" }, position: { default: "left" } }, setup(d) {
  const a = d, e = ref(), l = ref([]), t = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), n = computed(() => a.timelineData.length);
  return watchEffect(() => {
    (function() {
      for (let u = 0; u < n.value; u++) l.value[u] = getComputedStyle(e.value[u].firstElementChild || e.value[u], null).getPropertyValue("line-height");
    })();
  }, { flush: "post" }), watchEffect(() => {
    if (a.mode === "center") for (let u = 0; u < n.value; u++) (u + 1) % 2 ? a.position === "left" ? e.value[u].classList.add("desc-alternate-left") : e.value[u].classList.add("desc-alternate-right") : a.position === "left" ? e.value[u].classList.add("desc-alternate-right") : e.value[u].classList.add("desc-alternate-left");
  }, { flush: "post" }), (u, o) => (openBlock(), createElementBlock("div", { class: "m-timeline", style: normalizeStyle(`width: ${t.value};`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(u.timelineData, (f, v) => (openBlock(), createElementBlock("div", { class: normalizeClass(["timeline-item", { "item-last": v === u.timelineData.length - 1 }]), key: v }, [createBaseVNode("span", { class: normalizeClass(["timeline-tail", `tail-${u.mode}`]), style: normalizeStyle(`border-left-style: ${u.lineStyle};`) }, null, 6), createBaseVNode("div", { class: normalizeClass(["timeline-dot", `dot-${u.mode}`]), style: normalizeStyle(`height: ${l.value[v]}`) }, [renderSlot(u.$slots, "dot", { index: v }, () => [f.color === "red" ? (openBlock(), createElementBlock("span", { key: 0, class: "dot-item", style: normalizeStyle({ borderColor: "#ff4d4f" }) }, null, 4)) : f.color === "gray" ? (openBlock(), createElementBlock("span", { key: 1, class: "dot-item", style: normalizeStyle({ borderColor: "#00000040" }) }, null, 4)) : f.color === "green" ? (openBlock(), createElementBlock("span", { key: 2, class: "dot-item", style: normalizeStyle({ borderColor: "#52c41a" }) }, null, 4)) : f.color === "blue" ? (openBlock(), createElementBlock("span", { key: 3, class: "dot-item", style: normalizeStyle({ borderColor: "#1677ff" }) }, null, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "dot-item", style: normalizeStyle({ borderColor: f.color || "#1677ff" }) }, null, 4))], true)], 6), createBaseVNode("div", { ref_for: true, ref_key: "desc", ref: e, class: normalizeClass(`timeline-desc desc-${u.mode}`) }, [renderSlot(u.$slots, "desc", { index: v }, () => [createTextVNode(toDisplayString(f.desc || "--"), 1)], true)], 2)], 2))), 128))], 4));
} });
var Va2 = N(vn2, [["__scopeId", "data-v-87209f60"]]);
Va2.install = (d) => {
  d.component(Va2.__name, Va2);
};
var pn = { class: "m-timepicker" };
var Ra2 = N(defineComponent({ __name: "TimePicker", props: { allowClear: { type: Boolean, default: true }, bordered: { type: Boolean, default: true }, disabled: { type: Boolean, default: false }, disabledTime: { default: void 0 }, format: { default: "HH:mm:ss" }, hideDisabledOptions: { type: Boolean, default: false }, hourStep: { default: 1 }, minuteStep: { default: 1 }, secondStep: { default: 1 }, placeholder: { default: "请选择时间" }, showNow: { type: Boolean, default: false }, use12Hours: { type: Boolean, default: false }, value: { default: null }, valueFormat: { default: "HH:mm:ss" } }, emits: ["update:value", "change"], setup: (d, { emit: a }) => (e, l) => (openBlock(), createElementBlock("div", pn)) }), [["__scopeId", "data-v-5f09b56a"]]);
Ra2.install = (d) => {
  d.component(Ra2.__name, Ra2);
};
var fn2 = { class: "m-upload-wrap" };
var hn = { class: "m-upload" };
var mn2 = ["onDrop", "onClick"];
var gn = ["accept", "multiple", "onChange"];
var yn = { class: "upload-tip" };
var bn = { class: "file-uploading" };
var wn = { key: 0, class: "file-preview" };
var kn = { key: 1, class: "file-svg", focusable: "false", "data-icon": "file-pdf", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var xn = { key: 2, class: "file-svg", focusable: "false", "data-icon": "file", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Mn2 = { class: "file-mask" };
var _n2 = ["onClick"];
var Cn2 = ["onClick"];
var zn2 = defineComponent({ __name: "Upload", props: { accept: { default: "*" }, multiple: { type: Boolean, default: false }, maxCount: { default: 1 }, tip: { default: "Upload" }, fit: { default: "contain" }, spaceProps: { default: () => ({}) }, spinProps: { default: () => ({}) }, imageProps: { default: () => ({}) }, messageProps: { default: () => ({}) }, actionMessage: { default: () => ({ upload: "上传成功", remove: "删除成功" }) }, beforeUpload: { type: Function, default: () => true }, uploadMode: { default: "base64" }, customRequest: { type: Function, default: () => {
} }, disabled: { type: Boolean, default: false }, fileList: { default: () => [] } }, emits: ["update:fileList", "change", "remove"], setup(d, { expose: a, emit: e }) {
  const l = d, t = ref([]), n = ref(1), u = ref(Array(l.maxCount).fill(false)), o = ref();
  function f(g) {
    return /\.(jpg|jpeg|png|gif)$/i.test(g) || /^data:image/.test(g);
  }
  watchEffect(() => {
    (function() {
      t.value = [...l.fileList], t.value.length > l.maxCount && t.value.splice(l.maxCount), l.disabled ? n.value = t.value.length : t.value.length < l.maxCount ? n.value = l.fileList.length + 1 : n.value = l.maxCount;
    })();
  });
  const v = e, h2 = (g, p) => {
    l.beforeUpload(g) && (l.maxCount > n.value && n.value++, l.uploadMode === "base64" && (u.value[p] = true, function(k, z) {
      var M = new FileReader();
      M.readAsDataURL(k), M.onloadstart = function(y) {
      }, M.onabort = function(y) {
      }, M.onerror = function(y) {
      }, M.onprogress = function(y) {
        y.loaded === y.total && (u.value[z] = false);
      }, M.onload = function(y) {
        var c;
        t.value.push({ name: k.name, url: (c = y.target) == null ? void 0 : c.result }), l.actionMessage.upload && m.value.success(l.actionMessage.upload), v("update:fileList", t.value), v("change", t.value);
      }, M.onloadend = function(y) {
      };
    }(g, p)), l.uploadMode === "custom" && (u.value[p] = true, function(k, z) {
      l.customRequest(k).then((M) => {
        t.value.push(M), l.actionMessage.upload && m.value.success(l.actionMessage.upload), v("update:fileList", t.value), v("change", t.value);
      }).catch((M) => {
        l.maxCount > 1 && (n.value = t.value.length + 1), m.value.error(M);
      }).finally(() => {
        u.value[z] = false;
      });
    }(g, p)));
  }, w = ref(), m = ref();
  return a({ info: function(g) {
    m.value.info(g);
  }, success: function(g) {
    m.value.success(g);
  }, error: function(g) {
    m.value.error(g);
  }, warning: function(g) {
    m.value.warning(g);
  }, loading: function(g) {
    m.value.loading(g);
  } }), (g, p) => (openBlock(), createElementBlock("div", fn2, [createVNode(unref(He2), mergeProps({ gap: "small" }, g.spaceProps), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (k) => {
    return openBlock(), createElementBlock("div", { class: "m-upload-item", key: k }, [createBaseVNode("div", hn, [withDirectives(createBaseVNode("div", { class: normalizeClass(["upload-item", { "upload-disabled": g.disabled }]), onDragenter: p[1] || (p[1] = withModifiers(() => {
    }, ["stop", "prevent"])), onDragover: p[2] || (p[2] = withModifiers(() => {
    }, ["stop", "prevent"])), onDrop: withModifiers((M) => g.disabled ? () => false : function(y, c) {
      var x;
      const $ = (x = y.dataTransfer) == null ? void 0 : x.files;
      if ($ != null && $.length) {
        const C = $.length;
        for (let L = 0; L < C && c + L <= l.maxCount; L++) h2($[L], c + L);
        o.value[c].value = "";
      }
    }(M, k - 1), ["stop", "prevent"]), onClick: (M) => g.disabled ? () => false : function(y) {
      o.value[y].click();
    }(k - 1) }, [createBaseVNode("input", { ref_for: true, ref_key: "uploadInput", ref: o, type: "file", onClick: p[0] || (p[0] = withModifiers(() => {
    }, ["stop"])), accept: g.accept, multiple: g.multiple, onChange: (M) => function(y, c) {
      const $ = y.target.files;
      if ($ != null && $.length) {
        const x = $.length;
        for (let C = 0; C < x && c + C < l.maxCount; C++) h2($[C], c + C);
        o.value[c].value = "";
      }
    }(M, k - 1), style: { display: "none" } }, null, 40, gn), createBaseVNode("div", null, [p[3] || (p[3] = createBaseVNode("svg", { focusable: "false", class: "plus-svg", "data-icon": "plus", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("defs"), createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }), createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })], -1)), createBaseVNode("p", yn, [renderSlot(g.$slots, "default", {}, () => [createTextVNode(toDisplayString(g.tip), 1)], true)])])], 42, mn2), [[vShow, !u.value[k - 1] && !t.value[k - 1]]]), withDirectives(createBaseVNode("div", bn, [createVNode(unref(Be2), mergeProps({ class: "spin-uploading", tip: "uploading", size: "small", indicator: "spin-line", ref_for: true }, g.spinProps), null, 16)], 512), [[vShow, u.value[k - 1]]]), t.value[k - 1] ? (openBlock(), createElementBlock("div", wn, [f(t.value[k - 1].url) ? (openBlock(), createBlock(unref(Ke2), mergeProps({ key: 0, ref_for: true, ref_key: "imageRef", ref: w, bordered: false, width: 82, height: 82, src: t.value[k - 1].url, name: t.value[k - 1].name }, g.imageProps), null, 16, ["src", "name"])) : (z = t.value[k - 1].url, /\.pdf$/i.test(z) || /^data:application\/pdf/.test(z) ? (openBlock(), createElementBlock("svg", kn, p[4] || (p[4] = [createBaseVNode("path", { d: "M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1)]))) : (openBlock(), createElementBlock("svg", xn, p[5] || (p[5] = [createBaseVNode("path", { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1)])))), createBaseVNode("div", Mn2, [createBaseVNode("a", { class: "file-icon", title: "预览", onClick: (M) => function(y, c) {
      if (f(c)) {
        const $ = t.value.slice(0, y).filter((x) => !f(x.url));
        w.value[y - $.length].preview(0);
      } else window.open(c);
    }(k - 1, t.value[k - 1].url) }, p[6] || (p[6] = [createBaseVNode("svg", { class: "icon-svg", focusable: "false", "data-icon": "eye", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })], -1)]), 8, _n2), withDirectives(createBaseVNode("a", { class: "file-icon", title: "删除", onClick: withModifiers((M) => function(y) {
      t.value.length < l.maxCount && n.value--;
      const c = t.value.splice(y, 1);
      l.actionMessage.remove && m.value.success(l.actionMessage.remove), v("remove", c), v("update:fileList", t.value), v("change", t.value);
    }(k - 1), ["prevent", "stop"]) }, p[7] || (p[7] = [createBaseVNode("svg", { class: "icon-svg", focusable: "false", "data-icon": "delete", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" })], -1)]), 8, Cn2), [[vShow, !g.disabled]])])])) : createCommentVNode("", true)])]);
    var z;
  }), 128))]), _: 3 }, 16), createVNode(unref(Ue), mergeProps({ ref_key: "messageRef", ref: m }, g.messageProps), null, 16)]));
} });
var ja2 = N(zn2, [["__scopeId", "data-v-1416d161"]]);
ja2.install = (d) => {
  d.component(ja2.__name, ja2);
};
var $n2 = ["src", "poster", "autoplay", "controls", "loop", "muted", "preload"];
var Wa2 = N(defineComponent({ __name: "Video", props: { src: { default: void 0 }, poster: { default: void 0 }, second: { default: 0.5 }, width: { default: 800 }, height: { default: 450 }, autoplay: { type: Boolean, default: false }, controls: { type: Boolean, default: true }, loop: { type: Boolean, default: false }, muted: { type: Boolean, default: false }, preload: { default: "metadata" }, showPlay: { type: Boolean, default: true }, fit: { default: "contain" } }, setup(d) {
  const a = d, e = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), l = computed(() => typeof a.height == "number" ? a.height + "px" : a.height), t = ref(), n = ref(), u = ref(true), o = ref(false);
  function f() {
    var v, h2;
    u.value && (t.value.currentTime = 0, u.value = false), a.autoplay ? (v = t.value) == null || v.pause() : (o.value = true, (h2 = t.value) == null || h2.play());
  }
  return onMounted(() => {
    a.autoplay && (o.value = true, u.value = false);
  }), (v, h2) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-video", { "video-hover": !o.value }]), style: normalizeStyle(`width: ${e.value}; height: ${l.value};`) }, [createBaseVNode("video", mergeProps({ ref_key: "veoRef", ref: t, class: "u-video", style: `object-fit: ${v.fit};`, src: v.src, poster: v.poster ? v.poster : n.value, autoplay: v.autoplay, controls: !u.value && v.controls, loop: v.loop, muted: v.autoplay || v.muted, preload: v.preload, crossorigin: "anonymous", onLoadedmetadata: h2[0] || (h2[0] = (w) => v.poster ? () => false : function() {
    t.value.currentTime = a.second;
    const m = document.createElement("canvas"), g = m.getContext("2d");
    m.width = t.value.videoWidth, m.height = t.value.videoHeight, g == null || g.drawImage(t.value, 0, 0, m.width, m.height), n.value = m.toDataURL("image/png");
  }()), onPause: h2[1] || (h2[1] = (w) => v.showPlay ? void (o.value = false) : () => false), onPlaying: h2[2] || (h2[2] = (w) => v.showPlay ? void (o.value = true) : () => false), onClickOnce: withModifiers(f, ["prevent"]) }, v.$attrs), " 您的浏览器不支持video标签。 ", 16, $n2), withDirectives(createBaseVNode("span", { class: normalizeClass(["icon-play", { "icon-hidden": o.value }]) }, h2[3] || (h2[3] = [createBaseVNode("svg", { class: "play-svg", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 34 34" }, [createBaseVNode("path", { d: `M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039
          C31.913,19.675,31.913,14.325,28.26,11.961z` })], -1)]), 2), [[vShow, u.value || v.showPlay]])], 6));
} }), [["__scopeId", "data-v-b849dae6"]]);
Wa2.install = (d) => {
  d.component(Wa2.__name, Wa2);
};
var Bn2 = ["src", "alt", "onLoad"];
var Sn2 = defineComponent({ __name: "Waterfall", props: { images: { default: () => [] }, columnCount: { default: 3 }, columnGap: { default: 20 }, width: { default: "100%" }, borderRadius: { default: 8 }, backgroundColor: { default: "#F2F4F8" }, spinProps: { default: () => ({}) } }, setup(d) {
  const a = d, e = ref(), l = ref(), t = ref(Array(a.images.length).fill(false)), n = ref(), u = ref([]), o = ref(Array(a.columnCount).fill(0)), f = computed(() => typeof a.width == "number" ? a.width + "px" : a.width), v = computed(() => Math.max(...o.value) + a.columnGap), h2 = computed(() => a.images.length), w = ref(0);
  async function m(z) {
    n.value = (l.value - (a.columnCount + 1) * a.columnGap) / a.columnCount, u.value.splice(0);
    for (let M = 0; M < h2.value; M++) {
      if (z !== w.value) return false;
      await g(a.images[M].src, M);
    }
  }
  function g(z, M) {
    return new Promise((y) => {
      const c = new Image();
      c.src = z, c.onload = function() {
        const $ = c.height / (c.width / n.value);
        u.value[M] = { width: n.value, height: $, ...p(M, $) }, y("load");
      };
    });
  }
  function p(z, M) {
    if (z < a.columnCount) return o.value[z] = a.columnGap + M, { top: a.columnGap, left: (n.value + a.columnGap) * z + a.columnGap };
    {
      const y = Math.min(...o.value);
      let c = 0;
      for (let $ = 0; $ < a.columnCount; $++) if (o.value[$] === y) {
        c = $;
        break;
      }
      return o.value[c] = y + a.columnGap + M, { top: y + a.columnGap, left: (n.value + a.columnGap) * c + a.columnGap };
    }
  }
  function k(z) {
    if (z) {
      if (z.name) return z.name;
      {
        const M = z.src.split("?")[0].split("/");
        return M[M.length - 1];
      }
    }
  }
  return watch(() => [a.images, a.columnCount, a.columnGap, a.width], () => {
    l.value = e.value.offsetWidth, o.value = Array(a.columnCount).fill(0), w.value++, m(w.value);
  }, { deep: true, flush: "post" }), onMounted(() => {
    l.value = e.value.offsetWidth, m(w.value);
  }), je2(e, function() {
    const z = e.value.offsetWidth;
    a.images.length && z !== l.value && (l.value = z, w.value++, m(w.value));
  }), (z, M) => (openBlock(), createElementBlock("div", { ref_key: "waterfallRef", ref: e, class: "m-waterfall", style: normalizeStyle(`--border-radius: ${z.borderRadius}px; background-color: ${z.backgroundColor}; width: ${f.value}; height: ${v.value}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(u.value, (y, c) => (openBlock(), createBlock(unref(Be2), mergeProps({ class: "waterfall-image", style: `width: ${y.width}px; height: ${y.height}px; top: ${y && y.top}px; left: ${y && y.left}px;`, spinning: !t.value[c], size: "small", indicator: "dynamic-circle", ref_for: true }, z.spinProps, { key: c }), { default: withCtx(() => [createBaseVNode("img", { class: "u-image", src: z.images[c].src, alt: k(z.images[c]), onLoad: ($) => function(x) {
    t.value[x] = true;
  }(c) }, null, 40, Bn2)]), _: 2 }, 1040, ["style", "spinning"]))), 128))], 4));
} });
var Na2 = N(Sn2, [["__scopeId", "data-v-d1149e61"]]);
Na2.install = (d) => {
  d.component(Na2.__name, Na2);
};
var qa2 = defineComponent({ __name: "Watermark", props: { width: { default: void 0 }, height: { default: void 0 }, layout: { default: "alternate" }, rotate: { default: -22 }, zIndex: { default: 90 }, image: { default: void 0 }, content: { default: void 0 }, fullscreen: { type: Boolean, default: false }, textStyle: { default: () => ({ color: "rgba(0, 0, 0, 0.15)", fontSize: 16, fontWeight: "normal", fontFamily: "sans-serif", fontStyle: "normal" }) }, gap: { default: () => [100, 100] }, offset: { default: () => [50, 50] } }, setup(d) {
  const a = d, e = shallowRef(), l = shallowRef(), t = shallowRef(document.documentElement), n = shallowRef(t.value.classList.contains("dark")), u = shallowRef(false), o = computed(() => {
    var x;
    return ((x = a.gap) == null ? void 0 : x[0]) ?? 100;
  }), f = computed(() => {
    var x;
    return ((x = a.gap) == null ? void 0 : x[1]) ?? 100;
  }), v = computed(() => o.value / 2), h2 = computed(() => f.value / 2), w = computed(() => {
    var x;
    return ((x = a.offset) == null ? void 0 : x[0]) ?? v.value;
  }), m = computed(() => {
    var x;
    return ((x = a.offset) == null ? void 0 : x[1]) ?? h2.value;
  }), g = computed(() => ({ parallel: 1, alternate: 2 })[a.layout]), p = computed(() => {
    const x = { zIndex: a.zIndex ?? 9, position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", backgroundRepeat: "repeat" };
    n.value && (x.filter = "invert(1) hue-rotate(180deg)");
    let C = w.value - v.value, L = m.value - h2.value;
    return C > 0 && (x.left = `${C}px`, x.width = `calc(100% - ${C}px)`, C = 0), L > 0 && (x.top = `${L}px`, x.height = `calc(100% - ${L}px)`, L = 0), x.backgroundPosition = `${C}px ${L}px`, x;
  });
  function k() {
    l.value && (l.value.remove(), l.value = void 0);
  }
  function z(x, C) {
    var T;
    var L;
    e.value && l.value && (u.value = true, l.value.setAttribute("style", (L = { ...p.value, backgroundImage: `url('${x}')`, backgroundSize: (o.value + C) * g.value + "px" }, Object.keys(L).map((P) => `${function(q) {
      return q.replace(/([A-Z])/g, "-$1").toLowerCase();
    }(P)}: ${L[P]};`).join(" "))), a.fullscreen ? (t.value.setAttribute("style", "position: relative"), t.value.append(l.value)) : (T = e.value) == null || T.append(l.value), setTimeout(() => {
      u.value = false;
    }));
  }
  function M() {
    return window.devicePixelRatio || 1;
  }
  function y(x, C, L, T, P) {
    const q = M(), Z = a.content, U = a.textStyle.fontSize ?? 16, le = a.textStyle.fontWeight ?? "normal", J = a.textStyle.fontFamily ?? "sans-serif", Q = a.textStyle.fontStyle ?? "normal", R = a.textStyle.color ?? "rgba(0, 0, 0, 0.15)", A = Number(U) * q;
    x.font = `${Q} normal ${le} ${A}px/${P}px ${J}`, x.fillStyle = R, x.textAlign = "center", x.textBaseline = "top", x.translate(T / 2, 0);
    const H = Array.isArray(Z) ? Z : [Z];
    H == null || H.forEach((re, V) => {
      x.fillText(re ?? "", C, L + V * (A + 3 * q));
    });
  }
  function c() {
    const x = document.createElement("canvas"), C = x.getContext("2d"), L = a.image, T = a.rotate ?? -22;
    if (C) {
      l.value || (l.value = document.createElement("div"));
      const P = M(), [q, Z] = function(de) {
        let Me2 = 120, j = 64;
        const pe = a.content, ye = a.image, _e2 = a.width, Ce2 = a.height, Fe = a.textStyle.fontSize ?? 16, Pe2 = a.textStyle.fontFamily ?? "sans-serif";
        if (!ye && de.measureText) {
          de.font = `${Number(Fe)}px ${Pe2}`;
          const ce = Array.isArray(pe) ? pe : [pe], fe = ce.map((Se2) => de.measureText(Se2).width);
          Me2 = Math.ceil(Math.max(...fe)), j = Number(Fe) * ce.length + 3 * (ce.length - 1);
        }
        return [_e2 ?? Me2, Ce2 ?? j];
      }(C), U = (o.value + q) * P, le = (f.value + Z) * P;
      x.setAttribute("width", U * g.value + "px"), x.setAttribute("height", le * g.value + "px");
      const J = o.value * P / 2, Q = f.value * P / 2, R = q * P, A = Z * P, H = (R + o.value * P) / 2, re = (A + f.value * P) / 2, V = J + U, X = Q + le, ne = H + U, ie = re + le;
      if (C.save(), $(C, H, re, T), L) {
        const de = new Image();
        de.onload = () => {
          C.drawImage(de, J, Q, R, A), C.restore(), $(C, ne, ie, T), C.drawImage(de, V, X, R, A), z(x.toDataURL(), q);
        }, de.crossOrigin = "anonymous", de.referrerPolicy = "no-referrer", de.src = L;
      } else y(C, J, Q, R, A), C.restore(), $(C, ne, ie, T), y(C, V, X, R, A), z(x.toDataURL(), q);
    }
  }
  function $(x, C, L, T) {
    x.translate(C, L), x.rotate(Math.PI / 180 * Number(T)), x.translate(-C, -L);
  }
  return watch(() => [a], () => {
    c();
  }, { deep: true, flush: "post" }), onMounted(() => {
    c();
  }), onBeforeUnmount(() => {
    k();
  }), Ka2(t, () => {
    n.value = t.value.classList.contains("dark"), k(), c();
  }, { attributeFilter: ["class"] }), Ka2(a.fullscreen ? t : e, function(x) {
    u.value || x.forEach((C) => {
      (function(L, T) {
        let P = false;
        return L.removedNodes.length && (P = Array.from(L.removedNodes).some((q) => q === T)), L.type === "attributes" && L.target === T && (P = true), P;
      })(C, l.value) && (k(), c());
    });
  }, { subtree: true, childList: true, attributes: true, attributeFilter: ["style", "class"] }), (x, C) => (openBlock(), createElementBlock("div", { ref_key: "containerRef", ref: e, style: { position: "relative" } }, [renderSlot(x.$slots, "default")], 512));
} });
qa2.install = (d) => {
  d.component(qa2.__name, qa2);
};
var Ln2 = [Xe, qe2, Qe, Je2, ea, $e, aa2, la, ta2, oa, sa2, ia, na, sl, il, ua, da2, ra, ca2, Ee, va2, pa, fa2, dl, rl, Ke2, Ye2, ha, ma2, cl, vl2, pl2, fl2, hl2, ml2, gl2, ga, Ue, ya, ba, wa, Re, ka, xa, Ma, _a2, Ca2, za2, $a2, Te, Ba2, Ae, Oe2, Sa2, He2, Be2, La, Fa2, Aa2, Da, Ea2, Ta2, Ha2, Ia, Pa2, Va2, Ra2, Ve, ja2, Wa2, Na2, qa2];
var Nn2 = { install: function(d) {
  Ln2.forEach((a) => d.component(a.__name, a));
} };
export {
  Xe as Alert,
  qe2 as Avatar,
  Qe as BackTop,
  Je2 as Badge,
  ea as Breadcrumb,
  $e as Button,
  aa2 as Card,
  la as Carousel,
  ta2 as Cascader,
  oa as Checkbox,
  rl as Col,
  sa2 as Collapse,
  ia as Countdown,
  na as DatePicker,
  sl as Descriptions,
  il as DescriptionsItem,
  ua as Dialog,
  da2 as Divider,
  ra as Drawer,
  ca2 as Ellipsis,
  Ee as Empty,
  va2 as Flex,
  pa as FloatButton,
  fa2 as GradientText,
  Ke2 as Image,
  Ye2 as Input,
  ha as InputNumber,
  ma2 as InputSearch,
  cl as Layout,
  fl2 as LayoutContent,
  hl2 as LayoutFooter,
  vl2 as LayoutHeader,
  pl2 as LayoutSider,
  ml2 as List,
  gl2 as ListItem,
  ga as LoadingBar,
  Ue as Message,
  ya as Modal,
  ba as Notification,
  wa as NumberAnimation,
  Re as Pagination,
  ka as Popconfirm,
  xa as Popover,
  Ma as Progress,
  _a2 as QRCode,
  Ca2 as Radio,
  za2 as Rate,
  $a2 as Result,
  dl as Row,
  Te as Scrollbar,
  Ba2 as Segmented,
  Ae as Select,
  Oe2 as Skeleton,
  Sa2 as Slider,
  He2 as Space,
  Be2 as Spin,
  La as Statistic,
  Fa2 as Steps,
  Aa2 as Swiper,
  Da as Switch,
  Ea2 as Table,
  Ta2 as Tabs,
  Ha2 as Tag,
  Pa2 as TextScroll,
  Ia as Textarea,
  Ra2 as TimePicker,
  Va2 as Timeline,
  Ve as Tooltip,
  ja2 as Upload,
  Wa2 as Video,
  Na2 as Waterfall,
  qa2 as Watermark,
  Ne as add,
  be as cancelRaf,
  In2 as dateFormat,
  Tl2 as debounce,
  Nn2 as default,
  Pn2 as downloadFile,
  ol as formatNumber,
  xe as rafTimeout,
  El2 as throttle,
  Vn2 as toggleDark,
  Ie2 as useEventListener,
  jn as useFps,
  Wn as useMediaQuery,
  Ka2 as useMutationObserver,
  je2 as useResizeObserver,
  Rn2 as useScrollDirection,
  he as useSlotsExist
};
//# sourceMappingURL=vue-amazing-ui.js.map
