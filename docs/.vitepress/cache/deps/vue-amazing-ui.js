import {
  TransitionPresets,
  isClient,
  toRef as toRef2,
  useTransition
} from "./chunk-ANVRIS6E.js";
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
  init_vue_runtime_esm_bundler,
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
  toDisplayString,
  toRef,
  unref,
  useSlots,
  vModelDynamic,
  vModelText,
  vShow,
  watch,
  watchEffect,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-D4ROFVM7.js";
import {
  __commonJS,
  __toESM
} from "./chunk-ROME4SDB.js";

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
      } catch (e3) {
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
        for (let i3 = 0; i3 < length; i3++) {
          this.putBit((num >>> length - i3 - 1 & 1) === 1);
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
      for (let i3 = 1; i3 < posCount - 1; i3++) {
        positions[i3] = positions[i3 - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i3 = 0; i3 < posLength; i3++) {
        for (let j = 0; j < posLength; j++) {
          if (i3 === 0 && j === 0 || // top-left
          i3 === 0 && j === posLength - 1 || // bottom-left
          i3 === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i3], pos[j]]);
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
      for (let i3 = 0; i3 < modulesCount; i3++)
        darkCount += data.data[i3];
      const k3 = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k3 * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i3, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i3 + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i3 % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i3 + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i3 / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i3 * j % 2 + i3 * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i3 * j % 2 + i3 * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i3 * j % 3 + (i3 + j) % 2) % 2 === 0;
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
      let x3 = 1;
      for (let i3 = 0; i3 < 255; i3++) {
        EXP_TABLE[i3] = x3;
        LOG_TABLE[x3] = i3;
        x3 <<= 1;
        if (x3 & 256) {
          x3 ^= 285;
        }
      }
      for (let i3 = 255; i3 < 512; i3++) {
        EXP_TABLE[i3] = EXP_TABLE[i3 - 255];
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
    exports.mul = function mul(x3, y3) {
      if (x3 === 0 || y3 === 0)
        return 0;
      return EXP_TABLE[LOG_TABLE[x3] + LOG_TABLE[y3]];
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.3/node_modules/qrcode/lib/core/polynomial.js"(exports) {
    var GF = require_galois_field();
    exports.mul = function mul(p12, p22) {
      const coeff = new Uint8Array(p12.length + p22.length - 1);
      for (let i3 = 0; i3 < p12.length; i3++) {
        for (let j = 0; j < p22.length; j++) {
          coeff[i3 + j] ^= GF.mul(p12[i3], p22[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i3 = 0; i3 < divisor.length; i3++) {
          result[i3] ^= GF.mul(divisor[i3], coeff);
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
      for (let i3 = 0; i3 < degree; i3++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i3)]));
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
      } catch (e3) {
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
      let d3 = version << 12;
      while (Utils.getBCHDigit(d3) - G18_BCH >= 0) {
        d3 ^= G18 << Utils.getBCHDigit(d3) - G18_BCH;
      }
      return version << 12 | d3;
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
      let d3 = data << 10;
      while (Utils.getBCHDigit(d3) - G15_BCH >= 0) {
        d3 ^= G15 << Utils.getBCHDigit(d3) - G15_BCH;
      }
      return (data << 10 | d3) ^ G15_MASK;
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
      let i3, group, value;
      for (i3 = 0; i3 + 3 <= this.data.length; i3 += 3) {
        group = this.data.substr(i3, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i3;
      if (remainingNum > 0) {
        group = this.data.substr(i3);
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
      let i3;
      for (i3 = 0; i3 + 2 <= this.data.length; i3 += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i3]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i3 + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i3]), 6);
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
      for (let i3 = 0, l = this.data.length; i3 < l; i3++) {
        bitBuffer.put(this.data[i3], 8);
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
      let i3;
      for (i3 = 0; i3 < this.data.length; i3++) {
        let value = Utils.toSJIS(this.data[i3]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i3] + "\nMake sure your charset is UTF-8"
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
      single_source_shortest_paths: function(graph, s3, d3) {
        var predecessors = {};
        var costs = {};
        costs[s3] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s3, 0);
        var closest, u3, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u3 = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u3] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u3;
              }
            }
          }
        }
        if (typeof d3 !== "undefined" && typeof costs[d3] === "undefined") {
          var msg = ["Could not find a path from ", s3, " to ", d3, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d3) {
        var nodes = [];
        var u3 = d3;
        var predecessor;
        while (u3) {
          nodes.push(u3);
          predecessor = predecessors[u3];
          u3 = predecessors[u3];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s3, d3) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s3, d3);
        return dijkstra.extract_shortest_path_from_predecessor_list(
          predecessors,
          d3
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T3 = dijkstra.PriorityQueue, t3 = {}, key;
          opts = opts || {};
          for (key in T3) {
            if (T3.hasOwnProperty(key)) {
              t3[key] = T3[key];
            }
          }
          t3.queue = [];
          t3.sorter = opts.sorter || T3.default_sorter;
          return t3;
        },
        default_sorter: function(a3, b3) {
          return a3.cost - b3.cost;
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
      return segs.sort(function(s12, s23) {
        return s12.index - s23.index;
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
      for (let i3 = 0; i3 < segs.length; i3++) {
        const seg = segs[i3];
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
      for (let i3 = 0; i3 < nodes.length; i3++) {
        const nodeGroup = nodes[i3];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i3 + j;
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
      for (let i3 = 1; i3 < path.length - 1; i3++) {
        optimizedSegs.push(graph.table[path[i3]].node);
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
      for (let i3 = 0; i3 < pos.length; i3++) {
        const row = pos[i3][0];
        const col = pos[i3][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r)
            continue;
          for (let c3 = -1; c3 <= 7; c3++) {
            if (col + c3 <= -1 || size <= col + c3)
              continue;
            if (r >= 0 && r <= 6 && (c3 === 0 || c3 === 6) || c3 >= 0 && c3 <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c3 >= 2 && c3 <= 4) {
              matrix.set(row + r, col + c3, true, true);
            } else {
              matrix.set(row + r, col + c3, false, true);
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
      for (let i3 = 0; i3 < pos.length; i3++) {
        const row = pos[i3][0];
        const col = pos[i3][1];
        for (let r = -2; r <= 2; r++) {
          for (let c3 = -2; c3 <= 2; c3++) {
            if (r === -2 || r === 2 || c3 === -2 || c3 === 2 || r === 0 && c3 === 0) {
              matrix.set(row + r, col + c3, true, true);
            } else {
              matrix.set(row + r, col + c3, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i3 = 0; i3 < 18; i3++) {
        row = Math.floor(i3 / 3);
        col = i3 % 3 + size - 8 - 3;
        mod = (bits >> i3 & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i3, mod;
      for (i3 = 0; i3 < 15; i3++) {
        mod = (bits >> i3 & 1) === 1;
        if (i3 < 6) {
          matrix.set(i3, 8, mod, true);
        } else if (i3 < 8) {
          matrix.set(i3 + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i3, 8, mod, true);
        }
        if (i3 < 8) {
          matrix.set(8, size - i3 - 1, mod, true);
        } else if (i3 < 9) {
          matrix.set(8, 15 - i3 - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i3 - 1, mod, true);
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
          for (let c3 = 0; c3 < 2; c3++) {
            if (!matrix.isReserved(row, col - c3)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c3, dark);
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
      for (let i3 = 0; i3 < remainingByte; i3++) {
        buffer.put(i3 % 2 ? 17 : 236, 8);
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
      for (let b3 = 0; b3 < ecTotalBlocks; b3++) {
        const dataSize = b3 < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b3] = buffer.slice(offset, offset + dataSize);
        ecData[b3] = rs.encode(dcData[b3]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i3, r;
      for (i3 = 0; i3 < maxDataSize; i3++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i3 < dcData[r].length) {
            data[index++] = dcData[r][i3];
          }
        }
      }
      for (i3 = 0; i3 < ecCount; i3++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i3];
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
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c3) {
          return [c3, c3];
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
      for (let i3 = 0; i3 < symbolSize; i3++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i3 * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i3 >= scaledMargin && j >= scaledMargin && i3 < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i3 - scaledMargin) / scale);
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
      } catch (e3) {
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
    function svgCmd(cmd, x3, y3) {
      let str = cmd + x3;
      if (typeof y3 !== "undefined")
        str += " " + y3;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i3 = 0; i3 < data.length; i3++) {
        const col = Math.floor(i3 % size);
        const row = Math.floor(i3 / size);
        if (!col && !newRow)
          newRow = true;
        if (data[i3]) {
          lineLength++;
          if (!(i3 > 0 && col > 0 && data[i3 - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i3 + 1])) {
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
          } catch (e3) {
            reject(e3);
          }
        });
      }
      try {
        const data = QRCode2.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e3) {
        cb(e3);
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

// node_modules/.pnpm/vue-amazing-ui@0.1.17/node_modules/vue-amazing-ui/dist/vue-amazing-ui.js
init_vue_runtime_esm_bundler();

// node_modules/.pnpm/@vuepic+vue-datepicker@6.1.0_vue@3.3.4/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
init_vue_runtime_esm_bundler();

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof(o);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/toInteger/index.js
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/requiredArgs/index.js
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/toDate/index.js
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return /* @__PURE__ */ new Date(NaN);
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/addDays/index.js
function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  date.setDate(date.getDate() + amount);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/addMonths/index.js
function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  var dayOfMonth = date.getDate();
  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/add/index.js
function add(dirtyDate, duration) {
  requiredArgs(2, arguments);
  if (!duration || _typeof(duration) !== "object")
    return /* @__PURE__ */ new Date(NaN);
  var years = duration.years ? toInteger(duration.years) : 0;
  var months = duration.months ? toInteger(duration.months) : 0;
  var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
  var days = duration.days ? toInteger(duration.days) : 0;
  var hours = duration.hours ? toInteger(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
  var date = toDate(dirtyDate);
  var dateWithMonths = months || years ? addMonths(date, months + years * 12) : date;
  var dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
  var minutesToAdd = minutes + hours * 60;
  var secondsToAdd = seconds + minutesToAdd * 60;
  var msToAdd = secondsToAdd * 1e3;
  var finalDate = new Date(dateWithDays.getTime() + msToAdd);
  return finalDate;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/addMilliseconds/index.js
function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/defaultOptions/index.js
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfWeek/index.js
function startOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfISOWeek/index.js
function startOfISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  return startOfWeek(dirtyDate, {
    weekStartsOn: 1
  });
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getISOWeekYear/index.js
function getISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfISOWeekYear/index.js
function startOfISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getISOWeekYear(dirtyDate);
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = startOfISOWeek(fourthOfJanuary);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfDay/index.js
function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/differenceInCalendarDays/index.js
var MILLISECONDS_IN_DAY = 864e5;
function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/addYears/index.js
function addYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/constants/index.js
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var millisecondsInSecond = 1e3;
var minTime = -maxTime;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isDate/index.js
function isDate(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || _typeof(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isValid/index.js
function isValid(dirtyDate) {
  requiredArgs(1, arguments);
  if (!isDate(dirtyDate) && typeof dirtyDate !== "number") {
    return false;
  }
  var date = toDate(dirtyDate);
  return !isNaN(Number(date));
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/eachDayOfInterval/index.js
function eachDayOfInterval(dirtyInterval, options) {
  var _options$step;
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  var step = Number((_options$step = options === null || options === void 0 ? void 0 : options.step) !== null && _options$step !== void 0 ? _options$step : 1);
  if (step < 1 || isNaN(step))
    throw new RangeError("`options.step` must be a number greater than 1");
  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }
  return dates;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/endOfWeek/index.js
function endOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/subMilliseconds/index.js
function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js
var MILLISECONDS_IN_DAY2 = 864e5;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY2) + 1;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js
function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js
function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js
function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js
var MILLISECONDS_IN_WEEK = 6048e5;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js
function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = /* @__PURE__ */ new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = /* @__PURE__ */ new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js
function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getUTCWeekYear(dirtyDate, options);
  var firstWeek = /* @__PURE__ */ new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, options);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/getUTCWeek/index.js
var MILLISECONDS_IN_WEEK2 = 6048e5;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK2) + 1;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/addLeadingZeros/index.js
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign + output;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/format/lightFormatters/index.js
var formatters = {
  // Year
  y: function y(date, token) {
    var signedYear = date.getUTCFullYear();
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d: function d(date, token) {
    return addLeadingZeros(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
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
  h: function h2(date, token) {
    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function H(date, token) {
    return addLeadingZeros(date.getUTCHours(), token.length);
  },
  // Minute
  m: function m(date, token) {
    return addLeadingZeros(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function s(date, token) {
    return addLeadingZeros(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds2 = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds2 * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
var lightFormatters_default = formatters;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/format/formatters/index.js
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
var formatters2 = {
  // Era
  G: function G(date, token, localize2) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, {
          width: "abbreviated"
        });
      case "GGGGG":
        return localize2.era(era, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return localize2.era(era, {
          width: "wide"
        });
    }
  },
  // Year
  y: function y2(date, token, localize2) {
    if (token === "yo") {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, {
        unit: "year"
      });
    }
    return lightFormatters_default.y(date, token);
  },
  // Local week-numbering year
  Y: function Y(date, token, localize2, options) {
    var signedWeekYear = getUTCWeekYear(date, options);
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, {
        unit: "year"
      });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function R(date, token) {
    var isoWeekYear = getUTCISOWeekYear(date);
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
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function Q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
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
  q: function q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
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
  M: function M2(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters_default.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
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
        return localize2.month(month, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone month
  L: function L(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
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
        return localize2.month(month, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Local week of year
  w: function w(date, token, localize2, options) {
    var week = getUTCWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, {
        unit: "week"
      });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function I(date, token, localize2) {
    var isoWeek = getUTCISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, {
        unit: "week"
      });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function d2(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getUTCDate(), {
        unit: "date"
      });
    }
    return lightFormatters_default.d(date, token);
  },
  // Day of year
  D: function D(date, token, localize2) {
    var dayOfYear = getUTCDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, {
        unit: "dayOfYear"
      });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function E(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
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
  e: function e(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
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
  c: function c(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
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
  i: function i(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, {
          unit: "day"
        });
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
  a: function a2(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
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
  b: function b(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
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
  B: function B(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
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
  h: function h3(date, token, localize2) {
    if (token === "ho") {
      var hours = date.getUTCHours() % 12;
      if (hours === 0)
        hours = 12;
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return lightFormatters_default.h(date, token);
  },
  // Hour [0-23]
  H: function H2(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getUTCHours(), {
        unit: "hour"
      });
    }
    return lightFormatters_default.H(date, token);
  },
  // Hour [0-11]
  K: function K(date, token, localize2) {
    var hours = date.getUTCHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function k(date, token, localize2) {
    var hours = date.getUTCHours();
    if (hours === 0)
      hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function m2(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getUTCMinutes(), {
        unit: "minute"
      });
    }
    return lightFormatters_default.m(date, token);
  },
  // Second
  s: function s2(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getUTCSeconds(), {
        unit: "second"
      });
    }
    return lightFormatters_default.s(date, token);
  },
  // Fraction of second
  S: function S2(date, token) {
    return lightFormatters_default.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
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
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
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
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
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
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
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
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || "";
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || "";
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
var formatters_default = formatters2;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/format/longFormatters/index.js
var dateLongFormatter = function dateLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "P":
      return formatLong2.date({
        width: "short"
      });
    case "PP":
      return formatLong2.date({
        width: "medium"
      });
    case "PPP":
      return formatLong2.date({
        width: "long"
      });
    case "PPPP":
    default:
      return formatLong2.date({
        width: "full"
      });
  }
};
var timeLongFormatter = function timeLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "p":
      return formatLong2.time({
        width: "short"
      });
    case "pp":
      return formatLong2.time({
        width: "medium"
      });
    case "ppp":
      return formatLong2.time({
        width: "long"
      });
    case "pppp":
    default:
      return formatLong2.time({
        width: "full"
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter2(pattern, formatLong2) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({
        width: "short"
      });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({
        width: "full"
      });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
var longFormatters_default = longFormatters;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/protectedTokens/index.js
var protectedDayOfYearTokens = ["D", "DD"];
var protectedWeekYearTokens = ["YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format2, input) {
  if (token === "YYYY") {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "YY") {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "D") {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "DD") {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js
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
var formatDistance = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
var formatDistance_default = formatDistance;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js
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
var formatLong_default = formatLong;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = function formatRelative2(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
var formatRelative_default = formatRelative;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js
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
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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
var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
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
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
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
var localize_default = localize;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/en-US/_lib/match/index.js
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
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
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
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
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
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
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
var match_default = match;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/locale/en-US/index.js
var locale = {
  code: "en-US",
  formatDistance: formatDistance_default,
  formatLong: formatLong_default,
  formatRelative: formatRelative_default,
  localize: localize_default,
  match: match_default,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var en_US_default = locale;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/defaultLocale/index.js
var defaultLocale_default = en_US_default;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/format/index.js
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (!locale2.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale2.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      var longFormatter = longFormatters_default[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map(function(substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = formatters_default[firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale2.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
    }
    return substring;
  }).join("");
  return result;
}
function cleanEscapedString(input) {
  var matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/assign/index.js
function assign(target, object) {
  if (target == null) {
    throw new TypeError("assign requires that input parameter not be null or undefined");
  }
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      ;
      target[property] = object[property];
    }
  }
  return target;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/formatDistanceStrict/index.js
var MILLISECONDS_IN_MINUTE = 1e3 * 60;
var MINUTES_IN_DAY = 60 * 24;
var MINUTES_IN_MONTH = MINUTES_IN_DAY * 30;
var MINUTES_IN_YEAR = MINUTES_IN_DAY * 365;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getDay/index.js
function getDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var day = date.getDay();
  return day;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getDaysInMonth/index.js
function getDaysInMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth2 = /* @__PURE__ */ new Date(0);
  lastDayOfMonth2.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth2.setHours(0, 0, 0, 0);
  return lastDayOfMonth2.getDate();
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getHours/index.js
function getHours(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var hours = date.getHours();
  return hours;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getISOWeek/index.js
var MILLISECONDS_IN_WEEK3 = 6048e5;
function getISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfISOWeek(date).getTime() - startOfISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK3) + 1;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getMinutes/index.js
function getMinutes(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var minutes = date.getMinutes();
  return minutes;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getMonth/index.js
function getMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  return month;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getOverlappingDaysInIntervals/index.js
var MILLISECONDS_IN_DAY3 = 24 * 60 * 60 * 1e3;

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getSeconds/index.js
function getSeconds(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var seconds = date.getSeconds();
  return seconds;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getWeekYear/index.js
function getWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = /* @__PURE__ */ new Date(0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = /* @__PURE__ */ new Date(0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfWeekYear/index.js
function startOfWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getWeekYear(dirtyDate, options);
  var firstWeek = /* @__PURE__ */ new Date(0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  var date = startOfWeek(firstWeek, options);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getWeek/index.js
var MILLISECONDS_IN_WEEK4 = 6048e5;
function getWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfWeek(date, options).getTime() - startOfWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK4) + 1;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getYear/index.js
function getYear(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getFullYear();
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isAfter/index.js
function isAfter(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime();
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isBefore/index.js
function isBefore(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isEqual/index.js
function isEqual(dirtyLeftDate, dirtyRightDate) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyLeftDate);
  var dateRight = toDate(dirtyRightDate);
  return dateLeft.getTime() === dateRight.getTime();
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++)
    arr2[i3] = arr[i3];
  return arr2;
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it2 = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it2) {
    if (Array.isArray(o) || (it2 = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it2)
        o = it2;
      var i3 = 0;
      var F = function F3() {
      };
      return {
        s: F,
        n: function n() {
          if (i3 >= o.length)
            return {
              done: true
            };
          return {
            done: false,
            value: o[i3++]
          };
        },
        e: function e3(_e3) {
          throw _e3;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function s3() {
      it2 = it2.call(o);
    },
    n: function n() {
      var step = it2.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e3(_e22) {
      didErr = true;
      err = _e22;
    },
    f: function f() {
      try {
        if (!normalCompletion && it2["return"] != null)
          it2["return"]();
      } finally {
        if (didErr)
          throw err;
      }
    }
  };
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o, p);
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/inherits.js
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o);
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e3) {
    return false;
  }
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/createSuper.js
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

// node_modules/.pnpm/@babel+runtime@7.23.2/node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/Setter.js
var TIMEZONE_UNIT_PRIORITY = 10;
var Setter = function() {
  function Setter2() {
    _classCallCheck(this, Setter2);
    _defineProperty(this, "priority", void 0);
    _defineProperty(this, "subPriority", 0);
  }
  _createClass(Setter2, [{
    key: "validate",
    value: function validate(_utcDate, _options) {
      return true;
    }
  }]);
  return Setter2;
}();
var ValueSetter = function(_Setter) {
  _inherits(ValueSetter2, _Setter);
  var _super = _createSuper(ValueSetter2);
  function ValueSetter2(value, validateValue, setValue, priority, subPriority) {
    var _this;
    _classCallCheck(this, ValueSetter2);
    _this = _super.call(this);
    _this.value = value;
    _this.validateValue = validateValue;
    _this.setValue = setValue;
    _this.priority = priority;
    if (subPriority) {
      _this.subPriority = subPriority;
    }
    return _this;
  }
  _createClass(ValueSetter2, [{
    key: "validate",
    value: function validate(utcDate, options) {
      return this.validateValue(utcDate, this.value, options);
    }
  }, {
    key: "set",
    value: function set2(utcDate, flags, options) {
      return this.setValue(utcDate, flags, this.value, options);
    }
  }]);
  return ValueSetter2;
}(Setter);
var DateToSystemTimezoneSetter = function(_Setter2) {
  _inherits(DateToSystemTimezoneSetter2, _Setter2);
  var _super2 = _createSuper(DateToSystemTimezoneSetter2);
  function DateToSystemTimezoneSetter2() {
    var _this2;
    _classCallCheck(this, DateToSystemTimezoneSetter2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this2), "priority", TIMEZONE_UNIT_PRIORITY);
    _defineProperty(_assertThisInitialized(_this2), "subPriority", -1);
    return _this2;
  }
  _createClass(DateToSystemTimezoneSetter2, [{
    key: "set",
    value: function set2(date, flags) {
      if (flags.timestampIsSet) {
        return date;
      }
      var convertedDate = /* @__PURE__ */ new Date(0);
      convertedDate.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
      convertedDate.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
      return convertedDate;
    }
  }]);
  return DateToSystemTimezoneSetter2;
}(Setter);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/Parser.js
var Parser = function() {
  function Parser2() {
    _classCallCheck(this, Parser2);
    _defineProperty(this, "incompatibleTokens", void 0);
    _defineProperty(this, "priority", void 0);
    _defineProperty(this, "subPriority", void 0);
  }
  _createClass(Parser2, [{
    key: "run",
    value: function run(dateString, token, match2, options) {
      var result = this.parse(dateString, token, match2, options);
      if (!result) {
        return null;
      }
      return {
        setter: new ValueSetter(result.value, this.validate, this.set, this.priority, this.subPriority),
        rest: result.rest
      };
    }
  }, {
    key: "validate",
    value: function validate(_utcDate, _value, _options) {
      return true;
    }
  }]);
  return Parser2;
}();

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/EraParser.js
var EraParser = function(_Parser) {
  _inherits(EraParser2, _Parser);
  var _super = _createSuper(EraParser2);
  function EraParser2() {
    var _this;
    _classCallCheck(this, EraParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 140);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["R", "u", "t", "T"]);
    return _this;
  }
  _createClass(EraParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "G":
        case "GG":
        case "GGG":
          return match2.era(dateString, {
            width: "abbreviated"
          }) || match2.era(dateString, {
            width: "narrow"
          });
        case "GGGGG":
          return match2.era(dateString, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return match2.era(dateString, {
            width: "wide"
          }) || match2.era(dateString, {
            width: "abbreviated"
          }) || match2.era(dateString, {
            width: "narrow"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      flags.era = value;
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return EraParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/constants.js
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/utils.js
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
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  var sign = matchResult[1] === "+" ? 1 : -1;
  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
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
  var isCommonEra = currentYear > 0;
  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  var result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    var rangeEnd = absCurrentYear + 50;
    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
    var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/YearParser.js
var YearParser = function(_Parser) {
  _inherits(YearParser2, _Parser);
  var _super = _createSuper(YearParser2);
  function YearParser2() {
    var _this;
    _classCallCheck(this, YearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(YearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(year) {
        return {
          year,
          isTwoDigitYear: token === "yy"
        };
      };
      switch (token) {
        case "y":
          return mapValue(parseNDigits(4, dateString), valueCallback3);
        case "yo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "year"
          }), valueCallback3);
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      var currentYear = date.getUTCFullYear();
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
      var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return YearParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/LocalWeekYearParser.js
var LocalWeekYearParser = function(_Parser) {
  _inherits(LocalWeekYearParser2, _Parser);
  var _super = _createSuper(LocalWeekYearParser2);
  function LocalWeekYearParser2() {
    var _this;
    _classCallCheck(this, LocalWeekYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]);
    return _this;
  }
  _createClass(LocalWeekYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(year) {
        return {
          year,
          isTwoDigitYear: token === "YY"
        };
      };
      switch (token) {
        case "Y":
          return mapValue(parseNDigits(4, dateString), valueCallback3);
        case "Yo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "year"
          }), valueCallback3);
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
  }, {
    key: "set",
    value: function set2(date, flags, value, options) {
      var currentYear = getUTCWeekYear(date, options);
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
        date.setUTCHours(0, 0, 0, 0);
        return startOfUTCWeek(date, options);
      }
      var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
      date.setUTCHours(0, 0, 0, 0);
      return startOfUTCWeek(date, options);
    }
  }]);
  return LocalWeekYearParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/ISOWeekYearParser.js
var ISOWeekYearParser = function(_Parser) {
  _inherits(ISOWeekYearParser2, _Parser);
  var _super = _createSuper(ISOWeekYearParser2);
  function ISOWeekYearParser2() {
    var _this;
    _classCallCheck(this, ISOWeekYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(ISOWeekYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      if (token === "R") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
  }, {
    key: "set",
    value: function set2(_date, _flags, value) {
      var firstWeekOfYear = /* @__PURE__ */ new Date(0);
      firstWeekOfYear.setUTCFullYear(value, 0, 4);
      firstWeekOfYear.setUTCHours(0, 0, 0, 0);
      return startOfUTCISOWeek(firstWeekOfYear);
    }
  }]);
  return ISOWeekYearParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/ExtendedYearParser.js
var ExtendedYearParser = function(_Parser) {
  _inherits(ExtendedYearParser2, _Parser);
  var _super = _createSuper(ExtendedYearParser2);
  function ExtendedYearParser2() {
    var _this;
    _classCallCheck(this, ExtendedYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(ExtendedYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      if (token === "u") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return ExtendedYearParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/QuarterParser.js
var QuarterParser = function(_Parser) {
  _inherits(QuarterParser2, _Parser);
  var _super = _createSuper(QuarterParser2);
  function QuarterParser2() {
    var _this;
    _classCallCheck(this, QuarterParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 120);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(QuarterParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "Q":
        case "QQ":
          return parseNDigits(token.length, dateString);
        case "Qo":
          return match2.ordinalNumber(dateString, {
            unit: "quarter"
          });
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
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 4;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return QuarterParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/StandAloneQuarterParser.js
var StandAloneQuarterParser = function(_Parser) {
  _inherits(StandAloneQuarterParser2, _Parser);
  var _super = _createSuper(StandAloneQuarterParser2);
  function StandAloneQuarterParser2() {
    var _this;
    _classCallCheck(this, StandAloneQuarterParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 120);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(StandAloneQuarterParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "q":
        case "qq":
          return parseNDigits(token.length, dateString);
        case "qo":
          return match2.ordinalNumber(dateString, {
            unit: "quarter"
          });
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
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 4;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneQuarterParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/MonthParser.js
var MonthParser = function(_Parser) {
  _inherits(MonthParser2, _Parser);
  var _super = _createSuper(MonthParser2);
  function MonthParser2() {
    var _this;
    _classCallCheck(this, MonthParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]);
    _defineProperty(_assertThisInitialized(_this), "priority", 110);
    return _this;
  }
  _createClass(MonthParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(value) {
        return value - 1;
      };
      switch (token) {
        case "M":
          return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback3);
        case "MM":
          return mapValue(parseNDigits(2, dateString), valueCallback3);
        case "Mo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "month"
          }), valueCallback3);
        case "MMM":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMMM":
          return match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return match2.month(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return MonthParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/StandAloneMonthParser.js
var StandAloneMonthParser = function(_Parser) {
  _inherits(StandAloneMonthParser2, _Parser);
  var _super = _createSuper(StandAloneMonthParser2);
  function StandAloneMonthParser2() {
    var _this;
    _classCallCheck(this, StandAloneMonthParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 110);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(StandAloneMonthParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(value) {
        return value - 1;
      };
      switch (token) {
        case "L":
          return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback3);
        case "LL":
          return mapValue(parseNDigits(2, dateString), valueCallback3);
        case "Lo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "month"
          }), valueCallback3);
        case "LLL":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLLL":
          return match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return match2.month(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneMonthParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/setUTCWeek/index.js
function setUTCWeek(dirtyDate, dirtyWeek, options) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var week = toInteger(dirtyWeek);
  var diff = getUTCWeek(date, options) - week;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/LocalWeekParser.js
var LocalWeekParser = function(_Parser) {
  _inherits(LocalWeekParser2, _Parser);
  var _super = _createSuper(LocalWeekParser2);
  function LocalWeekParser2() {
    var _this;
    _classCallCheck(this, LocalWeekParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 100);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]);
    return _this;
  }
  _createClass(LocalWeekParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "w":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "wo":
          return match2.ordinalNumber(dateString, {
            unit: "week"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 53;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      return startOfUTCWeek(setUTCWeek(date, value, options), options);
    }
  }]);
  return LocalWeekParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/setUTCISOWeek/index.js
function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var isoWeek = toInteger(dirtyISOWeek);
  var diff = getUTCISOWeek(date) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/ISOWeekParser.js
var ISOWeekParser = function(_Parser) {
  _inherits(ISOWeekParser2, _Parser);
  var _super = _createSuper(ISOWeekParser2);
  function ISOWeekParser2() {
    var _this;
    _classCallCheck(this, ISOWeekParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 100);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(ISOWeekParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "I":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "Io":
          return match2.ordinalNumber(dateString, {
            unit: "week"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 53;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      return startOfUTCISOWeek(setUTCISOWeek(date, value));
    }
  }]);
  return ISOWeekParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/DateParser.js
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DateParser = function(_Parser) {
  _inherits(DateParser2, _Parser);
  var _super = _createSuper(DateParser2);
  function DateParser2() {
    var _this;
    _classCallCheck(this, DateParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "subPriority", 1);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(DateParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "d":
          return parseNumericPattern(numericPatterns.date, dateString);
        case "do":
          return match2.ordinalNumber(dateString, {
            unit: "date"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(date, value) {
      var year = date.getUTCFullYear();
      var isLeapYear2 = isLeapYearIndex(year);
      var month = date.getUTCMonth();
      if (isLeapYear2) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month];
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCDate(value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DateParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/DayOfYearParser.js
var DayOfYearParser = function(_Parser) {
  _inherits(DayOfYearParser2, _Parser);
  var _super = _createSuper(DayOfYearParser2);
  function DayOfYearParser2() {
    var _this;
    _classCallCheck(this, DayOfYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "subpriority", 1);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(DayOfYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "D":
        case "DD":
          return parseNumericPattern(numericPatterns.dayOfYear, dateString);
        case "Do":
          return match2.ordinalNumber(dateString, {
            unit: "date"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(date, value) {
      var year = date.getUTCFullYear();
      var isLeapYear2 = isLeapYearIndex(year);
      if (isLeapYear2) {
        return value >= 1 && value <= 366;
      } else {
        return value >= 1 && value <= 365;
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth(0, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DayOfYearParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/setUTCDay/index.js
function setUTCDay(dirtyDate, dirtyDay, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(2, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = toInteger(dirtyDay);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/DayParser.js
var DayParser = function(_Parser) {
  _inherits(DayParser2, _Parser);
  var _super = _createSuper(DayParser2);
  function DayParser2() {
    var _this;
    _classCallCheck(this, DayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(DayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "E":
        case "EE":
        case "EEE":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEE":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEE":
        default:
          return match2.day(dateString, {
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
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DayParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/LocalDayParser.js
var LocalDayParser = function(_Parser) {
  _inherits(LocalDayParser2, _Parser);
  var _super = _createSuper(LocalDayParser2);
  function LocalDayParser2() {
    var _this;
    _classCallCheck(this, LocalDayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]);
    return _this;
  }
  _createClass(LocalDayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2, options) {
      var valueCallback3 = function valueCallback4(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "e":
        case "ee":
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
        case "eo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "day"
          }), valueCallback3);
        case "eee":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeee":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeee":
        default:
          return match2.day(dateString, {
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
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return LocalDayParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/StandAloneLocalDayParser.js
var StandAloneLocalDayParser = function(_Parser) {
  _inherits(StandAloneLocalDayParser2, _Parser);
  var _super = _createSuper(StandAloneLocalDayParser2);
  function StandAloneLocalDayParser2() {
    var _this;
    _classCallCheck(this, StandAloneLocalDayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]);
    return _this;
  }
  _createClass(StandAloneLocalDayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2, options) {
      var valueCallback3 = function valueCallback4(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "c":
        case "cc":
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
        case "co":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "day"
          }), valueCallback3);
        case "ccc":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "ccccc":
          return match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "cccc":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneLocalDayParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/_lib/setUTCISODay/index.js
function setUTCISODay(dirtyDate, dirtyDay) {
  requiredArgs(2, arguments);
  var day = toInteger(dirtyDay);
  if (day % 7 === 0) {
    day = day - 7;
  }
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/ISODayParser.js
var ISODayParser = function(_Parser) {
  _inherits(ISODayParser2, _Parser);
  var _super = _createSuper(ISODayParser2);
  function ISODayParser2() {
    var _this;
    _classCallCheck(this, ISODayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(ISODayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(value) {
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
          return match2.ordinalNumber(dateString, {
            unit: "day"
          });
        case "iii":
          return mapValue(match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
        case "iiiii":
          return mapValue(match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
        case "iiiiii":
          return mapValue(match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
        case "iiii":
        default:
          return mapValue(match2.day(dateString, {
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
          }), valueCallback3);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 7;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date = setUTCISODay(date, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return ISODayParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/AMPMParser.js
var AMPMParser = function(_Parser) {
  _inherits(AMPMParser2, _Parser);
  var _super = _createSuper(AMPMParser2);
  function AMPMParser2() {
    var _this;
    _classCallCheck(this, AMPMParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 80);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass(AMPMParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
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
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return AMPMParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/AMPMMidnightParser.js
var AMPMMidnightParser = function(_Parser) {
  _inherits(AMPMMidnightParser2, _Parser);
  var _super = _createSuper(AMPMMidnightParser2);
  function AMPMMidnightParser2() {
    var _this;
    _classCallCheck(this, AMPMMidnightParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 80);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass(AMPMMidnightParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
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
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return AMPMMidnightParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/DayPeriodParser.js
var DayPeriodParser = function(_Parser) {
  _inherits(DayPeriodParser2, _Parser);
  var _super = _createSuper(DayPeriodParser2);
  function DayPeriodParser2() {
    var _this;
    _classCallCheck(this, DayPeriodParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 80);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["a", "b", "t", "T"]);
    return _this;
  }
  _createClass(DayPeriodParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
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
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return DayPeriodParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/Hour1to12Parser.js
var Hour1to12Parser = function(_Parser) {
  _inherits(Hour1to12Parser2, _Parser);
  var _super = _createSuper(Hour1to12Parser2);
  function Hour1to12Parser2() {
    var _this;
    _classCallCheck(this, Hour1to12Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["H", "K", "k", "t", "T"]);
    return _this;
  }
  _createClass(Hour1to12Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "h":
          return parseNumericPattern(numericPatterns.hour12h, dateString);
        case "ho":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 12;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      var isPM = date.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else if (!isPM && value === 12) {
        date.setUTCHours(0, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }
      return date;
    }
  }]);
  return Hour1to12Parser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/Hour0to23Parser.js
var Hour0to23Parser = function(_Parser) {
  _inherits(Hour0to23Parser2, _Parser);
  var _super = _createSuper(Hour0to23Parser2);
  function Hour0to23Parser2() {
    var _this;
    _classCallCheck(this, Hour0to23Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
    return _this;
  }
  _createClass(Hour0to23Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "H":
          return parseNumericPattern(numericPatterns.hour23h, dateString);
        case "Ho":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 23;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(value, 0, 0, 0);
      return date;
    }
  }]);
  return Hour0to23Parser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/Hour0To11Parser.js
var Hour0To11Parser = function(_Parser) {
  _inherits(Hour0To11Parser2, _Parser);
  var _super = _createSuper(Hour0To11Parser2);
  function Hour0To11Parser2() {
    var _this;
    _classCallCheck(this, Hour0To11Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["h", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass(Hour0To11Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "K":
          return parseNumericPattern(numericPatterns.hour11h, dateString);
        case "Ko":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      var isPM = date.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }
      return date;
    }
  }]);
  return Hour0To11Parser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/Hour1To24Parser.js
var Hour1To24Parser = function(_Parser) {
  _inherits(Hour1To24Parser2, _Parser);
  var _super = _createSuper(Hour1To24Parser2);
  function Hour1To24Parser2() {
    var _this;
    _classCallCheck(this, Hour1To24Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
    return _this;
  }
  _createClass(Hour1To24Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "k":
          return parseNumericPattern(numericPatterns.hour24h, dateString);
        case "ko":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 24;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      var hours = value <= 24 ? value % 24 : value;
      date.setUTCHours(hours, 0, 0, 0);
      return date;
    }
  }]);
  return Hour1To24Parser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/MinuteParser.js
var MinuteParser = function(_Parser) {
  _inherits(MinuteParser2, _Parser);
  var _super = _createSuper(MinuteParser2);
  function MinuteParser2() {
    var _this;
    _classCallCheck(this, MinuteParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 60);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass(MinuteParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "m":
          return parseNumericPattern(numericPatterns.minute, dateString);
        case "mo":
          return match2.ordinalNumber(dateString, {
            unit: "minute"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 59;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMinutes(value, 0, 0);
      return date;
    }
  }]);
  return MinuteParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/SecondParser.js
var SecondParser = function(_Parser) {
  _inherits(SecondParser2, _Parser);
  var _super = _createSuper(SecondParser2);
  function SecondParser2() {
    var _this;
    _classCallCheck(this, SecondParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 50);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass(SecondParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "s":
          return parseNumericPattern(numericPatterns.second, dateString);
        case "so":
          return match2.ordinalNumber(dateString, {
            unit: "second"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 59;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCSeconds(value, 0);
      return date;
    }
  }]);
  return SecondParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/FractionOfSecondParser.js
var FractionOfSecondParser = function(_Parser) {
  _inherits(FractionOfSecondParser2, _Parser);
  var _super = _createSuper(FractionOfSecondParser2);
  function FractionOfSecondParser2() {
    var _this;
    _classCallCheck(this, FractionOfSecondParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 30);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass(FractionOfSecondParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      var valueCallback3 = function valueCallback4(value) {
        return Math.floor(value * Math.pow(10, -token.length + 3));
      };
      return mapValue(parseNDigits(token.length, dateString), valueCallback3);
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMilliseconds(value);
      return date;
    }
  }]);
  return FractionOfSecondParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/ISOTimezoneWithZParser.js
var ISOTimezoneWithZParser = function(_Parser) {
  _inherits(ISOTimezoneWithZParser2, _Parser);
  var _super = _createSuper(ISOTimezoneWithZParser2);
  function ISOTimezoneWithZParser2() {
    var _this;
    _classCallCheck(this, ISOTimezoneWithZParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 10);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T", "x"]);
    return _this;
  }
  _createClass(ISOTimezoneWithZParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      switch (token) {
        case "X":
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString);
        case "XX":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "XXXX":
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString);
        case "XXXXX":
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString);
        case "XXX":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      if (flags.timestampIsSet) {
        return date;
      }
      return new Date(date.getTime() - value);
    }
  }]);
  return ISOTimezoneWithZParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/ISOTimezoneParser.js
var ISOTimezoneParser = function(_Parser) {
  _inherits(ISOTimezoneParser2, _Parser);
  var _super = _createSuper(ISOTimezoneParser2);
  function ISOTimezoneParser2() {
    var _this;
    _classCallCheck(this, ISOTimezoneParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 10);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T", "X"]);
    return _this;
  }
  _createClass(ISOTimezoneParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      switch (token) {
        case "x":
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString);
        case "xx":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "xxxx":
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString);
        case "xxxxx":
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString);
        case "xxx":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      if (flags.timestampIsSet) {
        return date;
      }
      return new Date(date.getTime() - value);
    }
  }]);
  return ISOTimezoneParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/TimestampSecondsParser.js
var TimestampSecondsParser = function(_Parser) {
  _inherits(TimestampSecondsParser2, _Parser);
  var _super = _createSuper(TimestampSecondsParser2);
  function TimestampSecondsParser2() {
    var _this;
    _classCallCheck(this, TimestampSecondsParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 40);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", "*");
    return _this;
  }
  _createClass(TimestampSecondsParser2, [{
    key: "parse",
    value: function parse2(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
  }, {
    key: "set",
    value: function set2(_date, _flags, value) {
      return [new Date(value * 1e3), {
        timestampIsSet: true
      }];
    }
  }]);
  return TimestampSecondsParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/TimestampMillisecondsParser.js
var TimestampMillisecondsParser = function(_Parser) {
  _inherits(TimestampMillisecondsParser2, _Parser);
  var _super = _createSuper(TimestampMillisecondsParser2);
  function TimestampMillisecondsParser2() {
    var _this;
    _classCallCheck(this, TimestampMillisecondsParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 20);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", "*");
    return _this;
  }
  _createClass(TimestampMillisecondsParser2, [{
    key: "parse",
    value: function parse2(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
  }, {
    key: "set",
    value: function set2(_date, _flags, value) {
      return [new Date(value), {
        timestampIsSet: true
      }];
    }
  }]);
  return TimestampMillisecondsParser2;
}(Parser);

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/_lib/parsers/index.js
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parse/index.js
var formattingTokensRegExp2 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp2 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp2 = /^'([^]*?)'?$/;
var doubleQuoteRegExp2 = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp2 = /[a-zA-Z]/;
function parse(dirtyDateString, dirtyFormatString, dirtyReferenceDate, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(3, arguments);
  var dateString = String(dirtyDateString);
  var formatString = String(dirtyFormatString);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
  if (!locale2.match) {
    throw new RangeError("locale must contain match property");
  }
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (formatString === "") {
    if (dateString === "") {
      return toDate(dirtyReferenceDate);
    } else {
      return /* @__PURE__ */ new Date(NaN);
    }
  }
  var subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2
  };
  var setters = [new DateToSystemTimezoneSetter()];
  var tokens = formatString.match(longFormattingTokensRegExp2).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter in longFormatters_default) {
      var longFormatter = longFormatters_default[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp2);
  var usedTokens = [];
  var _iterator = _createForOfIteratorHelper(tokens), _step;
  try {
    var _loop = function _loop2() {
      var token = _step.value;
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token)) {
        throwProtectedError(token, formatString, dirtyDateString);
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
        throwProtectedError(token, formatString, dirtyDateString);
      }
      var firstCharacter = token[0];
      var parser = parsers[firstCharacter];
      if (parser) {
        var incompatibleTokens = parser.incompatibleTokens;
        if (Array.isArray(incompatibleTokens)) {
          var incompatibleToken = usedTokens.find(function(usedToken) {
            return incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter;
          });
          if (incompatibleToken) {
            throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
          }
        } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
          throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
        }
        usedTokens.push({
          token: firstCharacter,
          fullToken: token
        });
        var parseResult = parser.run(dateString, token, locale2.match, subFnOptions);
        if (!parseResult) {
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
        }
        setters.push(parseResult.setter);
        dateString = parseResult.rest;
      } else {
        if (firstCharacter.match(unescapedLatinCharacterRegExp2)) {
          throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
        }
        if (token === "''") {
          token = "'";
        } else if (firstCharacter === "'") {
          token = cleanEscapedString2(token);
        }
        if (dateString.indexOf(token) === 0) {
          dateString = dateString.slice(token.length);
        } else {
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
        }
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _ret = _loop();
      if (_typeof(_ret) === "object")
        return _ret.v;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var uniquePrioritySetters = setters.map(function(setter2) {
    return setter2.priority;
  }).sort(function(a3, b3) {
    return b3 - a3;
  }).filter(function(priority, index, array) {
    return array.indexOf(priority) === index;
  }).map(function(priority) {
    return setters.filter(function(setter2) {
      return setter2.priority === priority;
    }).sort(function(a3, b3) {
      return b3.subPriority - a3.subPriority;
    });
  }).map(function(setterArray) {
    return setterArray[0];
  });
  var date = toDate(dirtyReferenceDate);
  if (isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var utcDate = subMilliseconds(date, getTimezoneOffsetInMilliseconds(date));
  var flags = {};
  var _iterator2 = _createForOfIteratorHelper(uniquePrioritySetters), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var setter = _step2.value;
      if (!setter.validate(utcDate, subFnOptions)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      var result = setter.set(utcDate, flags, subFnOptions);
      if (Array.isArray(result)) {
        utcDate = result[0];
        assign(flags, result[1]);
      } else {
        utcDate = result;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return utcDate;
}
function cleanEscapedString2(input) {
  return input.match(escapedStringRegExp2)[1].replace(doubleQuoteRegExp2, "'");
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/subDays/index.js
function subDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addDays(dirtyDate, -amount);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/parseISO/index.js
function parseISO(argument, options) {
  var _options$additionalDi;
  requiredArgs(1, arguments);
  var additionalDigits = toInteger((_options$additionalDi = options === null || options === void 0 ? void 0 : options.additionalDigits) !== null && _options$additionalDi !== void 0 ? _options$additionalDi : 2);
  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  }
  if (!(typeof argument === "string" || Object.prototype.toString.call(argument) === "[object String]")) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var dateStrings = splitDateString(argument);
  var date;
  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }
  if (!date || isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var timestamp = date.getTime();
  var time = 0;
  var offset;
  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) {
      return /* @__PURE__ */ new Date(NaN);
    }
  }
  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) {
      return /* @__PURE__ */ new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time);
    var result = /* @__PURE__ */ new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }
  return new Date(timestamp + time + offset);
}
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString;
  if (array.length > 2) {
    return dateStrings;
  }
  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }
  if (timeString) {
    var token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }
  return dateStrings;
}
function parseYear(dateString, additionalDigits) {
  var regex = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + additionalDigits) + "})|(\\d{2}|[+-]\\d{" + (2 + additionalDigits) + "})$)");
  var captures = dateString.match(regex);
  if (!captures)
    return {
      year: NaN,
      restDateString: ""
    };
  var year = captures[1] ? parseInt(captures[1]) : null;
  var century = captures[2] ? parseInt(captures[2]) : null;
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}
function parseDate(dateString, year) {
  if (year === null)
    return /* @__PURE__ */ new Date(NaN);
  var captures = dateString.match(dateRegex);
  if (!captures)
    return /* @__PURE__ */ new Date(NaN);
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;
  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = /* @__PURE__ */ new Date(0);
    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}
function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}
function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures)
    return NaN;
  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);
  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }
  return hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1e3;
}
function parseTimeUnit(value) {
  return value && parseFloat(value.replace(",", ".")) || 0;
}
function parseTimezone(timezoneString) {
  if (timezoneString === "Z")
    return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures)
    return 0;
  var sign = captures[1] === "+" ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;
  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }
  return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = /* @__PURE__ */ new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex2(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex2(year) ? 29 : 28));
}
function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex2(year) ? 366 : 365);
}
function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}
function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }
  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}
function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/setMonth/index.js
function setMonth(dirtyDate, dirtyMonth) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var month = toInteger(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();
  var dateWithDesiredMonth = /* @__PURE__ */ new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/set/index.js
function set(dirtyDate, values) {
  requiredArgs(2, arguments);
  if (_typeof(values) !== "object" || values === null) {
    throw new RangeError("values parameter must be an object");
  }
  var date = toDate(dirtyDate);
  if (isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (values.year != null) {
    date.setFullYear(values.year);
  }
  if (values.month != null) {
    date = setMonth(date, values.month);
  }
  if (values.date != null) {
    date.setDate(toInteger(values.date));
  }
  if (values.hours != null) {
    date.setHours(toInteger(values.hours));
  }
  if (values.minutes != null) {
    date.setMinutes(toInteger(values.minutes));
  }
  if (values.seconds != null) {
    date.setSeconds(toInteger(values.seconds));
  }
  if (values.milliseconds != null) {
    date.setMilliseconds(toInteger(values.milliseconds));
  }
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/setHours/index.js
function setHours(dirtyDate, dirtyHours) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var hours = toInteger(dirtyHours);
  date.setHours(hours);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/setMilliseconds/index.js
function setMilliseconds(dirtyDate, dirtyMilliseconds) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var milliseconds2 = toInteger(dirtyMilliseconds);
  date.setMilliseconds(milliseconds2);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/setMinutes/index.js
function setMinutes(dirtyDate, dirtyMinutes) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var minutes = toInteger(dirtyMinutes);
  date.setMinutes(minutes);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/setSeconds/index.js
function setSeconds(dirtyDate, dirtySeconds) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var seconds = toInteger(dirtySeconds);
  date.setSeconds(seconds);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/setYear/index.js
function setYear(dirtyDate, dirtyYear) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var year = toInteger(dirtyYear);
  if (isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  date.setFullYear(year);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/subMonths/index.js
function subMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, -amount);
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/sub/index.js
function sub(date, duration) {
  requiredArgs(2, arguments);
  if (!duration || _typeof(duration) !== "object")
    return /* @__PURE__ */ new Date(NaN);
  var years = duration.years ? toInteger(duration.years) : 0;
  var months = duration.months ? toInteger(duration.months) : 0;
  var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
  var days = duration.days ? toInteger(duration.days) : 0;
  var hours = duration.hours ? toInteger(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
  var dateWithoutMonths = subMonths(date, months + years * 12);
  var dateWithoutDays = subDays(dateWithoutMonths, days + weeks * 7);
  var minutestoSub = minutes + hours * 60;
  var secondstoSub = seconds + minutestoSub * 60;
  var mstoSub = secondstoSub * 1e3;
  var finalDate = new Date(dateWithoutDays.getTime() - mstoSub);
  return finalDate;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/subYears/index.js
function subYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addYears(dirtyDate, -amount);
}

// node_modules/.pnpm/@vuepic+vue-datepicker@6.1.0_vue@3.3.4/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function It() {
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
It.compatConfig = {
  MODE: 3
};
function ba() {
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
ba.compatConfig = {
  MODE: 3
};
function Rn() {
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
Rn.compatConfig = {
  MODE: 3
};
function On() {
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
On.compatConfig = {
  MODE: 3
};
function Nn() {
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
Nn.compatConfig = {
  MODE: 3
};
function Yn() {
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
Yn.compatConfig = {
  MODE: 3
};
function In() {
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
In.compatConfig = {
  MODE: 3
};
function Bn(e3) {
  return e3 && e3.__esModule && Object.prototype.hasOwnProperty.call(e3, "default") ? e3.default : e3;
}
var ka = { exports: {} };
(function(e3) {
  function n(a3) {
    return a3 && a3.__esModule ? a3 : {
      default: a3
    };
  }
  e3.exports = n, e3.exports.__esModule = true, e3.exports.default = e3.exports;
})(ka);
var xa = ka.exports;
var wn = { exports: {} };
(function(e3, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t3) {
    if (t3 === null || t3 === true || t3 === false)
      return NaN;
    var r = Number(t3);
    return isNaN(r) ? r : r < 0 ? Math.ceil(r) : Math.floor(r);
  }
  e3.exports = n.default;
})(wn, wn.exports);
var Qa = wn.exports;
var er = Bn(Qa);
var Dn = { exports: {} };
(function(e3, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t3) {
    var r = new Date(Date.UTC(t3.getFullYear(), t3.getMonth(), t3.getDate(), t3.getHours(), t3.getMinutes(), t3.getSeconds(), t3.getMilliseconds()));
    return r.setUTCFullYear(t3.getFullYear()), t3.getTime() - r.getTime();
  }
  e3.exports = n.default;
})(Dn, Dn.exports);
var tr = Dn.exports;
var Gn = Bn(tr);
function nr(e3, n) {
  var a3 = or(n);
  return a3.formatToParts ? rr(a3, e3) : lr(a3, e3);
}
var ar = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function rr(e3, n) {
  try {
    for (var a3 = e3.formatToParts(n), t3 = [], r = 0; r < a3.length; r++) {
      var l = ar[a3[r].type];
      l >= 0 && (t3[l] = parseInt(a3[r].value, 10));
    }
    return t3;
  } catch (c3) {
    if (c3 instanceof RangeError)
      return [NaN];
    throw c3;
  }
}
function lr(e3, n) {
  var a3 = e3.format(n).replace(/\u200E/g, ""), t3 = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a3);
  return [t3[3], t3[1], t3[2], t3[4], t3[5], t3[6]];
}
var sn = {};
function or(e3) {
  if (!sn[e3]) {
    var n = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), a3 = n === "06/25/2014, 00:00:00" || n === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
    sn[e3] = a3 ? new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: e3,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : new Intl.DateTimeFormat("en-US", {
      hourCycle: "h23",
      timeZone: e3,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  return sn[e3];
}
function En(e3, n, a3, t3, r, l, c3) {
  var y3 = /* @__PURE__ */ new Date(0);
  return y3.setUTCFullYear(e3, n, a3), y3.setUTCHours(t3, r, l, c3), y3;
}
var Zn = 36e5;
var sr = 6e4;
var un = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function Fn(e3, n, a3) {
  var t3, r;
  if (!e3 || (t3 = un.timezoneZ.exec(e3), t3))
    return 0;
  var l;
  if (t3 = un.timezoneHH.exec(e3), t3)
    return l = parseInt(t3[1], 10), qn(l) ? -(l * Zn) : NaN;
  if (t3 = un.timezoneHHMM.exec(e3), t3) {
    l = parseInt(t3[1], 10);
    var c3 = parseInt(t3[2], 10);
    return qn(l, c3) ? (r = Math.abs(l) * Zn + c3 * sr, l > 0 ? -r : r) : NaN;
  }
  if (dr(e3)) {
    n = new Date(n || Date.now());
    var y3 = a3 ? n : ur(n), D3 = Mn(y3, e3), S3 = a3 ? D3 : ir(n, D3, e3);
    return -S3;
  }
  return NaN;
}
function ur(e3) {
  return En(
    e3.getFullYear(),
    e3.getMonth(),
    e3.getDate(),
    e3.getHours(),
    e3.getMinutes(),
    e3.getSeconds(),
    e3.getMilliseconds()
  );
}
function Mn(e3, n) {
  var a3 = nr(e3, n), t3 = En(
    a3[0],
    a3[1] - 1,
    a3[2],
    a3[3] % 24,
    a3[4],
    a3[5],
    0
  ).getTime(), r = e3.getTime(), l = r % 1e3;
  return r -= l >= 0 ? l : 1e3 + l, t3 - r;
}
function ir(e3, n, a3) {
  var t3 = e3.getTime(), r = t3 - n, l = Mn(new Date(r), a3);
  if (n === l)
    return n;
  r -= l - n;
  var c3 = Mn(new Date(r), a3);
  return l === c3 ? l : Math.max(l, c3);
}
function qn(e3, n) {
  return -23 <= e3 && e3 <= 23 && (n == null || 0 <= n && n <= 59);
}
var Xn = {};
function dr(e3) {
  if (Xn[e3])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e3 }), Xn[e3] = true, true;
  } catch {
    return false;
  }
}
var wa = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var dn = 36e5;
var Jn = 6e4;
var cr = 2;
var Ye = {
  dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
  datePattern: /^([0-9W+-]+)(.*)/,
  plainTime: /:/,
  // year tokens
  YY: /^(\d{2})$/,
  YYY: [
    /^([+-]\d{2})$/,
    // 0 additional digits
    /^([+-]\d{3})$/,
    // 1 additional digit
    /^([+-]\d{4})$/
    // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [
    /^([+-]\d{4})/,
    // 0 additional digits
    /^([+-]\d{5})/,
    // 1 additional digit
    /^([+-]\d{6})/
    // 2 additional digits
  ],
  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,
  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // time zone tokens (to identify the presence of a tz)
  timeZone: wa
};
function $n(e3, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e3 === null)
    return /* @__PURE__ */ new Date(NaN);
  var a3 = n || {}, t3 = a3.additionalDigits == null ? cr : er(a3.additionalDigits);
  if (t3 !== 2 && t3 !== 1 && t3 !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e3 instanceof Date || typeof e3 == "object" && Object.prototype.toString.call(e3) === "[object Date]")
    return new Date(e3.getTime());
  if (typeof e3 == "number" || Object.prototype.toString.call(e3) === "[object Number]")
    return new Date(e3);
  if (!(typeof e3 == "string" || Object.prototype.toString.call(e3) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var r = fr(e3), l = vr(r.date, t3), c3 = l.year, y3 = l.restDateString, D3 = mr(y3, c3);
  if (isNaN(D3))
    return /* @__PURE__ */ new Date(NaN);
  if (D3) {
    var S3 = D3.getTime(), g = 0, Y3;
    if (r.time && (g = gr(r.time), isNaN(g)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || a3.timeZone) {
      if (Y3 = Fn(r.timeZone || a3.timeZone, new Date(S3 + g)), isNaN(Y3))
        return /* @__PURE__ */ new Date(NaN);
    } else
      Y3 = Gn(new Date(S3 + g)), Y3 = Gn(new Date(S3 + g + Y3));
    return new Date(S3 + g + Y3);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function fr(e3) {
  var n = {}, a3 = Ye.dateTimePattern.exec(e3), t3;
  if (a3 ? (n.date = a3[1], t3 = a3[3]) : (a3 = Ye.datePattern.exec(e3), a3 ? (n.date = a3[1], t3 = a3[2]) : (n.date = null, t3 = e3)), t3) {
    var r = Ye.timeZone.exec(t3);
    r ? (n.time = t3.replace(r[1], ""), n.timeZone = r[1].trim()) : n.time = t3;
  }
  return n;
}
function vr(e3, n) {
  var a3 = Ye.YYY[n], t3 = Ye.YYYYY[n], r;
  if (r = Ye.YYYY.exec(e3) || t3.exec(e3), r) {
    var l = r[1];
    return {
      year: parseInt(l, 10),
      restDateString: e3.slice(l.length)
    };
  }
  if (r = Ye.YY.exec(e3) || a3.exec(e3), r) {
    var c3 = r[1];
    return {
      year: parseInt(c3, 10) * 100,
      restDateString: e3.slice(c3.length)
    };
  }
  return {
    year: null
  };
}
function mr(e3, n) {
  if (n === null)
    return null;
  var a3, t3, r, l;
  if (e3.length === 0)
    return t3 = /* @__PURE__ */ new Date(0), t3.setUTCFullYear(n), t3;
  if (a3 = Ye.MM.exec(e3), a3)
    return t3 = /* @__PURE__ */ new Date(0), r = parseInt(a3[1], 10) - 1, Qn(n, r) ? (t3.setUTCFullYear(n, r), t3) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Ye.DDD.exec(e3), a3) {
    t3 = /* @__PURE__ */ new Date(0);
    var c3 = parseInt(a3[1], 10);
    return pr(n, c3) ? (t3.setUTCFullYear(n, 0, c3), t3) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Ye.MMDD.exec(e3), a3) {
    t3 = /* @__PURE__ */ new Date(0), r = parseInt(a3[1], 10) - 1;
    var y3 = parseInt(a3[2], 10);
    return Qn(n, r, y3) ? (t3.setUTCFullYear(n, r, y3), t3) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Ye.Www.exec(e3), a3)
    return l = parseInt(a3[1], 10) - 1, ea(n, l) ? xn(n, l) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Ye.WwwD.exec(e3), a3) {
    l = parseInt(a3[1], 10) - 1;
    var D3 = parseInt(a3[2], 10) - 1;
    return ea(n, l, D3) ? xn(n, l, D3) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function gr(e3) {
  var n, a3, t3;
  if (n = Ye.HH.exec(e3), n)
    return a3 = parseFloat(n[1].replace(",", ".")), cn(a3) ? a3 % 24 * dn : NaN;
  if (n = Ye.HHMM.exec(e3), n)
    return a3 = parseInt(n[1], 10), t3 = parseFloat(n[2].replace(",", ".")), cn(a3, t3) ? a3 % 24 * dn + t3 * Jn : NaN;
  if (n = Ye.HHMMSS.exec(e3), n) {
    a3 = parseInt(n[1], 10), t3 = parseInt(n[2], 10);
    var r = parseFloat(n[3].replace(",", "."));
    return cn(a3, t3, r) ? a3 % 24 * dn + t3 * Jn + r * 1e3 : NaN;
  }
  return null;
}
function xn(e3, n, a3) {
  n = n || 0, a3 = a3 || 0;
  var t3 = /* @__PURE__ */ new Date(0);
  t3.setUTCFullYear(e3, 0, 4);
  var r = t3.getUTCDay() || 7, l = n * 7 + a3 + 1 - r;
  return t3.setUTCDate(t3.getUTCDate() + l), t3;
}
var yr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var hr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Da(e3) {
  return e3 % 400 === 0 || e3 % 4 === 0 && e3 % 100 !== 0;
}
function Qn(e3, n, a3) {
  if (n < 0 || n > 11)
    return false;
  if (a3 != null) {
    if (a3 < 1)
      return false;
    var t3 = Da(e3);
    if (t3 && a3 > hr[n] || !t3 && a3 > yr[n])
      return false;
  }
  return true;
}
function pr(e3, n) {
  if (n < 1)
    return false;
  var a3 = Da(e3);
  return !(a3 && n > 366 || !a3 && n > 365);
}
function ea(e3, n, a3) {
  return !(n < 0 || n > 52 || a3 != null && (a3 < 0 || a3 > 6));
}
function cn(e3, n, a3) {
  return !(e3 != null && (e3 < 0 || e3 >= 25) || n != null && (n < 0 || n >= 60) || a3 != null && (a3 < 0 || a3 >= 60));
}
var Tn = { exports: {} };
var An = { exports: {} };
(function(e3, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t3, r) {
    if (t3 == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var l in r)
      Object.prototype.hasOwnProperty.call(r, l) && (t3[l] = r[l]);
    return t3;
  }
  e3.exports = n.default;
})(An, An.exports);
var br = An.exports;
(function(e3, n) {
  var a3 = xa.default;
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = r;
  var t3 = a3(br);
  function r(l) {
    return (0, t3.default)({}, l);
  }
  e3.exports = n.default;
})(Tn, Tn.exports);
var kr = Tn.exports;
var wr = Bn(kr);
function Dr(e3, n, a3) {
  var t3 = $n(e3, a3), r = Fn(n, t3, true), l = new Date(t3.getTime() - r), c3 = /* @__PURE__ */ new Date(0);
  return c3.setFullYear(l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate()), c3.setHours(l.getUTCHours(), l.getUTCMinutes(), l.getUTCSeconds(), l.getUTCMilliseconds()), c3;
}
function Mr(e3, n, a3) {
  if (typeof e3 == "string" && !e3.match(wa)) {
    var t3 = wr(a3);
    return t3.timeZone = n, $n(e3, t3);
  }
  var r = $n(e3, a3), l = En(
    r.getFullYear(),
    r.getMonth(),
    r.getDate(),
    r.getHours(),
    r.getMinutes(),
    r.getSeconds(),
    r.getMilliseconds()
  ).getTime(), c3 = Fn(n, new Date(l));
  return new Date(l + c3);
}
function ta(e3) {
  return (n) => new Intl.DateTimeFormat(e3, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`)).slice(0, 2);
}
function $r(e3) {
  return (n) => format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`), "EEEEEE", { locale: e3 });
}
var Tr = (e3, n, a3) => {
  const t3 = [1, 2, 3, 4, 5, 6, 7];
  let r;
  if (e3 !== null)
    try {
      r = t3.map($r(e3));
    } catch {
      r = t3.map(ta(n));
    }
  else
    r = t3.map(ta(n));
  const l = r.slice(0, a3), c3 = r.slice(a3 + 1, r.length);
  return [r[a3]].concat(...c3).concat(...l);
};
var Vn = (e3, n) => {
  const a3 = [];
  for (let t3 = +e3[0]; t3 <= +e3[1]; t3++)
    a3.push({ value: +t3, text: `${t3}` });
  return n ? a3.reverse() : a3;
};
var Ma = (e3, n, a3) => {
  const t3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((l) => {
    const c3 = l < 10 ? `0${l}` : l;
    return /* @__PURE__ */ new Date(`2017-${c3}-01T00:00:00+00:00`);
  });
  if (e3 !== null)
    try {
      const l = a3 === "long" ? "MMMM" : "MMM";
      return t3.map((c3, y3) => {
        const D3 = format(c3, l, { locale: e3 });
        return {
          text: D3.charAt(0).toUpperCase() + D3.substring(1),
          value: y3
        };
      });
    } catch {
    }
  const r = new Intl.DateTimeFormat(n, { month: a3, timeZone: "UTC" });
  return t3.map((l, c3) => {
    const y3 = r.format(l);
    return {
      text: y3.charAt(0).toUpperCase() + y3.substring(1),
      value: c3
    };
  });
};
var Ar = (e3) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e3];
var Ae = (e3) => {
  const n = unref(e3);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
};
var Sr = (e3) => Object.assign({ type: "dot" }, e3);
var $a = (e3) => Array.isArray(e3) ? !!e3[0] && !!e3[1] : false;
var Gt = {
  prop: (e3) => `"${e3}" prop must be enabled!`,
  dateArr: (e3) => `You need to use array as "model-value" binding in order to support "${e3}"`
};
var $e = (e3) => e3;
var na = (e3) => e3 === 0 ? e3 : !e3 || isNaN(+e3) ? null : +e3;
var aa = (e3) => e3 === null;
var _r = (e3) => {
  if (e3)
    return [...e3.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var Pr = (e3) => {
  const n = [], a3 = (t3) => t3.filter((r) => r);
  for (let t3 = 0; t3 < e3.length; t3 += 3) {
    const r = [e3[t3], e3[t3 + 1], e3[t3 + 2]];
    n.push(a3(r));
  }
  return n;
};
var Rt = (e3, n, a3) => {
  const t3 = a3 ?? a3 === 0, r = n ?? n === 0;
  if (!t3 && !r)
    return false;
  const l = +a3, c3 = +n;
  return t3 && r ? +e3 > l || +e3 < c3 : t3 ? +e3 > l : r ? +e3 < c3 : false;
};
var kt = (e3, n) => Pr(e3).map((a3) => a3.map((t3) => {
  const { active: r, disabled: l, isBetween: c3 } = n(t3);
  return {
    ...t3,
    active: r,
    disabled: l,
    className: {
      dp__overlay_cell_active: r,
      dp__overlay_cell: !r,
      dp__overlay_cell_disabled: l,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: l && r,
      dp__cell_in_between: c3
    }
  };
}));
var tt = (e3, n, a3 = false) => {
  e3 && n.allowStopPropagation && (a3 && e3.stopImmediatePropagation(), e3.stopPropagation());
};
var ra = (e3, n, a3, t3, r) => {
  const l = parse(e3, n.slice(0, e3.length), /* @__PURE__ */ new Date());
  return isValid(l) && isDate(l) ? t3 || r ? l : set(l, {
    hours: +a3.hours,
    minutes: +(a3 == null ? void 0 : a3.minutes),
    seconds: +(a3 == null ? void 0 : a3.seconds),
    milliseconds: 0
  }) : null;
};
var Cr = (e3, n, a3, t3, r) => {
  const l = Array.isArray(a3) ? a3[0] : a3;
  if (typeof n == "string")
    return ra(e3, n, l, t3, r);
  if (Array.isArray(n)) {
    let c3 = null;
    for (const y3 of n)
      if (c3 = ra(e3, y3, l, t3, r), c3)
        break;
    return c3;
  }
  return typeof n == "function" ? n(e3) : null;
};
var P = (e3) => e3 ? new Date(e3) : /* @__PURE__ */ new Date();
var Rr = (e3, n, a3) => {
  if (n) {
    const r = (e3.getMonth() + 1).toString().padStart(2, "0"), l = e3.getDate().toString().padStart(2, "0"), c3 = e3.getHours().toString().padStart(2, "0"), y3 = e3.getMinutes().toString().padStart(2, "0"), D3 = a3 ? e3.getSeconds().toString().padStart(2, "0") : "00";
    return `${e3.getFullYear()}-${r}-${l}T${c3}:${y3}:${D3}.000Z`;
  }
  const t3 = Date.UTC(
    e3.getUTCFullYear(),
    e3.getUTCMonth(),
    e3.getUTCDate(),
    e3.getUTCHours(),
    e3.getUTCMinutes(),
    e3.getUTCSeconds()
  );
  return new Date(t3).toISOString();
};
var He = (e3) => {
  let n = P(JSON.parse(JSON.stringify(e3)));
  return n = setHours(n, 0), n = setMinutes(n, 0), n = setSeconds(n, 0), n = setMilliseconds(n, 0), n;
};
var nt = (e3, n, a3, t3) => {
  let r = e3 ? P(e3) : P();
  return (n || n === 0) && (r = setHours(r, +n)), (a3 || a3 === 0) && (r = setMinutes(r, +a3)), (t3 || t3 === 0) && (r = setSeconds(r, +t3)), setMilliseconds(r, 0);
};
var Pe = (e3, n) => !e3 || !n ? false : isBefore(He(e3), He(n));
var ge = (e3, n) => !e3 || !n ? false : isEqual(He(e3), He(n));
var Re = (e3, n) => !e3 || !n ? false : isAfter(He(e3), He(n));
var Hn = (e3, n, a3) => e3 != null && e3[0] && (e3 != null && e3[1]) ? Re(a3, e3[0]) && Pe(a3, e3[1]) : e3 != null && e3[0] && n ? Re(a3, e3[0]) && Pe(a3, n) || Pe(a3, e3[0]) && Re(a3, n) : false;
var We = (e3) => {
  const n = set(new Date(e3), { date: 1 });
  return He(n);
};
var fn = (e3, n, a3) => n && (a3 || a3 === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((t3) => t3 === n ? [t3, a3] : [t3, isNaN(+e3[t3]) ? void 0 : +e3[t3]])
) : {
  hours: isNaN(+e3.hours) ? void 0 : +e3.hours,
  minutes: isNaN(+e3.minutes) ? void 0 : +e3.minutes,
  seconds: isNaN(+e3.seconds) ? void 0 : +e3.seconds
};
var vt = (e3) => ({
  hours: getHours(e3),
  minutes: getMinutes(e3),
  seconds: getSeconds(e3)
});
var Ta = (e3, n) => {
  if (n) {
    const a3 = getYear(P(n));
    if (a3 > e3)
      return 12;
    if (a3 === e3)
      return getMonth(P(n));
  }
};
var Aa = (e3, n) => {
  if (n) {
    const a3 = getYear(P(n));
    return a3 < e3 ? -1 : a3 === e3 ? getMonth(P(n)) : void 0;
  }
};
var wt = (e3) => {
  if (e3)
    return getYear(P(e3));
};
var Ge = (e3, n) => n ? Dr(e3, n) : e3;
var Sa = (e3, n) => n ? Mr(e3, n) : e3;
var la = (e3) => e3 instanceof Date ? e3 : parseISO(e3);
var _a = (e3, n) => {
  const a3 = Re(e3, n) ? n : e3, t3 = Re(n, e3) ? n : e3;
  return eachDayOfInterval({ start: a3, end: t3 });
};
var Or = (e3) => {
  const n = addMonths(e3, 1);
  return { month: getMonth(n), year: getYear(n) };
};
var jt = (e3, n, a3) => {
  const t3 = startOfWeek(Ge(e3, n), { weekStartsOn: +a3 }), r = endOfWeek(Ge(e3, n), { weekStartsOn: +a3 });
  return [t3, r];
};
var Pa = (e3, n) => {
  const a3 = {
    hours: getHours(P()),
    minutes: getMinutes(P()),
    seconds: n ? getSeconds(P()) : 0
  };
  return Object.assign(a3, e3);
};
var et = (e3, n, a3) => [set(P(e3), { date: 1 }), set(P(), { month: n, year: a3, date: 1 })];
var Je = (e3, n, a3) => {
  let t3 = e3 ? P(e3) : P();
  return (n || n === 0) && (t3 = setMonth(t3, n)), a3 && (t3 = setYear(t3, a3)), t3;
};
var Ca = (e3, n, a3, t3, r) => {
  if (!t3 || r && !n || !r && !a3)
    return false;
  const l = r ? addMonths(e3, 1) : subMonths(e3, 1), c3 = [getMonth(l), getYear(l)];
  return r ? !Yr(...c3, n) : !Nr(...c3, a3);
};
var Nr = (e3, n, a3) => Pe(...et(a3, e3, n)) || ge(...et(a3, e3, n));
var Yr = (e3, n, a3) => Re(...et(a3, e3, n)) || ge(...et(a3, e3, n));
var Ra = (e3, n, a3, t3, r, l) => {
  if (typeof n == "function")
    return n(e3);
  const c3 = a3 ? { locale: a3 } : void 0;
  return Array.isArray(e3) ? `${format(e3[0], l, c3)}${r && !e3[1] ? "" : t3}${e3[1] ? format(e3[1], l, c3) : ""}` : format(e3, l, c3);
};
var yt = (e3) => {
  if (e3)
    return null;
  throw new Error(Gt.prop("partial-range"));
};
var Ht = (e3, n) => {
  if (n)
    return e3();
  throw new Error(Gt.prop("range"));
};
var Sn = (e3) => Array.isArray(e3) ? isValid(e3[0]) && (e3[1] ? isValid(e3[1]) : true) : e3 ? isValid(e3) : false;
var Ir = (e3) => set(P(), {
  hours: +e3.hours || 0,
  minutes: +e3.minutes || 0,
  seconds: +e3.seconds || 0
});
var vn = (e3, n, a3, t3) => {
  if (!e3)
    return true;
  if (t3) {
    const r = a3 === "max" ? isBefore(e3, n) : isAfter(e3, n), l = { seconds: 0, milliseconds: 0 };
    return r || isEqual(set(e3, l), set(n, l));
  }
  return a3 === "max" ? e3.getTime() <= n.getTime() : e3.getTime() >= n.getTime();
};
var oa = (e3, n, a3, t3, r) => {
  const l = e3 ? Ir(e3) : P(n);
  return Array.isArray(t3) ? vn(t3[0], l, a3, !!n) && vn(t3[1], l, a3, !!n) && r : vn(t3, l, a3, !!n) && r;
};
var mn = (e3) => set(P(), vt(e3));
var Br = (e3, n) => Array.isArray(e3) ? e3.map((a3) => P(a3)).filter((a3) => getYear(P(a3)) === n).map((a3) => getMonth(a3)) : [];
var At = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Oa = () => {
  const e3 = (t3) => {
    At.menuFocused = t3;
  }, n = (t3) => {
    At.shiftKeyInMenu !== t3 && (At.shiftKeyInMenu = t3);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: At.shiftKeyInMenu, menuFocused: At.menuFocused })),
    setMenuFocused: e3,
    setShiftKey: n
  };
};
var ke = reactive({
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
var gn = ref(null);
var Ut = ref(false);
var yn = ref(false);
var hn = ref(false);
var pn = ref(false);
var Oe = ref(0);
var _e = ref(0);
var lt = () => {
  const e3 = computed(() => Ut.value ? [...ke.selectionGrid, ke.actionRow].filter((p) => p.length) : yn.value ? [
    ...ke.timePicker[0],
    ...ke.timePicker[1],
    pn.value ? [] : [gn.value],
    ke.actionRow
  ].filter((p) => p.length) : hn.value ? [...ke.monthPicker, ke.actionRow] : [ke.monthYear, ...ke.calendar, ke.time, ke.actionRow].filter((p) => p.length)), n = (p) => {
    Oe.value = p ? Oe.value + 1 : Oe.value - 1;
    let M3 = null;
    e3.value[_e.value] && (M3 = e3.value[_e.value][Oe.value]), M3 || (Oe.value = p ? Oe.value - 1 : Oe.value + 1);
  }, a3 = (p) => {
    if (_e.value === 0 && !p || _e.value === e3.value.length && p)
      return;
    _e.value = p ? _e.value + 1 : _e.value - 1, e3.value[_e.value] ? e3.value[_e.value] && !e3.value[_e.value][Oe.value] && Oe.value !== 0 && (Oe.value = e3.value[_e.value].length - 1) : _e.value = p ? _e.value - 1 : _e.value + 1;
  }, t3 = (p) => {
    let M3 = null;
    e3.value[_e.value] && (M3 = e3.value[_e.value][Oe.value]), M3 ? M3.focus({ preventScroll: !Ut.value }) : Oe.value = p ? Oe.value - 1 : Oe.value + 1;
  }, r = () => {
    n(true), t3(true);
  }, l = () => {
    n(false), t3(false);
  }, c3 = () => {
    a3(false), t3(true);
  }, y3 = () => {
    a3(true), t3(true);
  }, D3 = (p, M3) => {
    ke[M3] = p;
  }, S3 = (p, M3) => {
    ke[M3] = p;
  }, g = () => {
    Oe.value = 0, _e.value = 0;
  };
  return {
    buildMatrix: D3,
    buildMultiLevelMatrix: S3,
    setTimePickerBackRef: (p) => {
      gn.value = p;
    },
    setSelectionGrid: (p) => {
      Ut.value = p, g(), p || (ke.selectionGrid = []);
    },
    setTimePicker: (p, M3 = false) => {
      yn.value = p, pn.value = M3, g(), p || (ke.timePicker[0] = [], ke.timePicker[1] = []);
    },
    setTimePickerElements: (p, M3 = 0) => {
      ke.timePicker[M3] = p;
    },
    arrowRight: r,
    arrowLeft: l,
    arrowUp: c3,
    arrowDown: y3,
    clearArrowNav: () => {
      ke.monthYear = [], ke.calendar = [], ke.time = [], ke.actionRow = [], ke.selectionGrid = [], ke.timePicker[0] = [], ke.timePicker[1] = [], Ut.value = false, yn.value = false, pn.value = false, hn.value = false, g(), gn.value = null;
    },
    setMonthPicker: (p) => {
      hn.value = p, g();
    },
    refSets: ke
    // exposed for testing
  };
};
var sa = (e3) => ({
  menuAppearTop: "dp-menu-appear-top",
  menuAppearBottom: "dp-menu-appear-bottom",
  open: "dp-slide-down",
  close: "dp-slide-up",
  next: "calendar-next",
  previous: "calendar-prev",
  vNext: "dp-slide-up",
  vPrevious: "dp-slide-down",
  ...e3 ?? {}
});
var Er = (e3) => ({
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
  calendarWrap: "Calendar wrapper",
  calendarDays: "Calendar days",
  openTimePicker: "Open time picker",
  closeTimePicker: "Close time Picker",
  incrementValue: (n) => `Increment ${n}`,
  decrementValue: (n) => `Decrement ${n}`,
  openTpOverlay: (n) => `Open ${n} overlay`,
  amPmButton: "Switch AM/PM mode",
  openYearsOverlay: "Open years overlay",
  openMonthsOverlay: "Open months overlay",
  nextMonth: "Next month",
  prevMonth: "Previous month",
  nextYear: "Next year",
  prevYear: "Previous year",
  day: () => "",
  ...e3 ?? {}
});
var ua = (e3) => e3 ? typeof e3 == "boolean" ? e3 ? 2 : 0 : +e3 >= 2 ? +e3 : 2 : 0;
var Fr = (e3) => {
  const n = typeof e3 == "object" && e3, a3 = {
    static: true,
    solo: false
  };
  if (!e3)
    return { ...a3, count: ua(false) };
  const t3 = n ? e3 : {}, r = n ? t3.count ?? true : e3, l = ua(r);
  return Object.assign(a3, t3, { count: l });
};
var Vr = (e3, n, a3) => e3 || (typeof a3 == "string" ? a3 : n);
var Hr = (e3) => typeof e3 == "boolean" ? e3 ? sa({}) : false : sa(e3);
var Ur = (e3) => {
  const n = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    rangeSeparator: " - "
  };
  return typeof e3 == "object" ? { ...n, ...e3 ?? {}, enabled: true } : { ...n, enabled: e3 };
};
var Lr = (e3) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e3 ?? {}
});
var Wr = (e3) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e3 ?? {}
});
var zr = (e3) => {
  const n = { input: false };
  return typeof e3 == "object" ? { ...n, ...e3 ?? {}, enabled: true } : {
    enabled: e3,
    ...n
  };
};
var jr = (e3) => ({ ...{
  allowStopPropagation: true,
  closeOnScroll: false,
  modeHeight: 255,
  allowPreventDefault: false,
  closeOnClearValue: true,
  closeOnAutoApply: true,
  noSwipe: false,
  keepActionRow: false,
  onClickOutside: void 0
}, ...e3 ?? {} });
var Se = (e3) => {
  const n = () => {
    const J = e3.enableSeconds ? ":ss" : "";
    return e3.is24 ? `HH:mm${J}` : `hh:mm${J} aa`;
  }, a3 = () => e3.format ? e3.format : e3.monthPicker ? "MM/yyyy" : e3.timePicker ? n() : e3.weekPicker ? "MM/dd/yyyy" : e3.yearPicker ? "yyyy" : e3.enableTimePicker ? `MM/dd/yyyy, ${n()}` : "MM/dd/yyyy", t3 = (J) => Pa(J, e3.enableSeconds), r = () => e3.range ? e3.startTime && Array.isArray(e3.startTime) ? [t3(e3.startTime[0]), t3(e3.startTime[1])] : null : e3.startTime && !Array.isArray(e3.startTime) ? t3(e3.startTime) : null, l = computed(() => Fr(e3.multiCalendars)), c3 = computed(() => r()), y3 = computed(() => Er(e3.ariaLabels)), D3 = computed(() => Lr(e3.filters)), S3 = computed(() => Hr(e3.transitions)), g = computed(() => Wr(e3.actionRow)), Y3 = computed(
    () => Vr(e3.previewFormat, e3.format, a3())
  ), R3 = computed(() => Ur(e3.textInput)), G3 = computed(() => zr(e3.inline)), q3 = computed(() => jr(e3.config));
  return {
    defaultedTransitions: S3,
    defaultedMultiCalendars: l,
    defaultedStartTime: c3,
    defaultedAriaLabels: y3,
    defaultedFilters: D3,
    defaultedActionRow: g,
    defaultedPreviewFormat: Y3,
    defaultedTextInput: R3,
    defaultedInline: G3,
    defaultedConfig: q3,
    getDefaultPattern: a3,
    getDefaultStartTime: r
  };
};
var Kr = (e3, n, a3) => {
  const t3 = ref(), { defaultedTextInput: r, getDefaultPattern: l } = Se(n), c3 = ref(""), y3 = toRef(n, "format");
  watch(t3, () => {
    e3("internal-model-change", t3.value);
  }), watch(y3, () => {
    v();
  });
  const D3 = (s3) => Sa(s3, n.timezone), S3 = (s3) => Ge(s3, n.timezone), g = (s3, u3) => Ra(
    s3,
    n.format,
    n.formatLocale,
    r.value.rangeSeparator,
    n.modelAuto,
    u3 ?? l()
  ), Y3 = (s3) => {
    const u3 = s3 ?? P();
    return n.modelType ? f(u3) : {
      hours: getHours(u3),
      minutes: getMinutes(u3),
      seconds: n.enableSeconds ? getSeconds(u3) : 0
    };
  }, R3 = (s3) => n.modelType ? f(s3) : { month: getMonth(s3), year: getYear(s3) }, G3 = (s3) => Array.isArray(s3) ? Ht(
    () => [
      setYear(P(), s3[0]),
      s3[1] ? setYear(P(), s3[1]) : yt(n.partialRange)
    ],
    n.range
  ) : setYear(P(), +s3), q3 = (s3, u3) => (typeof s3 == "string" || typeof s3 == "number") && n.modelType ? I3(s3) : u3, J = (s3) => Array.isArray(s3) ? [
    q3(
      s3[0],
      nt(null, +s3[0].hours, +s3[0].minutes, s3[0].seconds)
    ),
    q3(
      s3[1],
      nt(null, +s3[1].hours, +s3[1].minutes, s3[1].seconds)
    )
  ] : q3(s3, nt(null, s3.hours, s3.minutes, s3.seconds)), Q3 = (s3) => Array.isArray(s3) ? n.multiDates ? s3.map((u3) => q3(u3, Je(null, +u3.month, +u3.year))) : Ht(
    () => [
      q3(s3[0], Je(null, +s3[0].month, +s3[0].year)),
      q3(
        s3[1],
        s3[1] ? Je(null, +s3[1].month, +s3[1].year) : yt(n.partialRange)
      )
    ],
    n.range
  ) : q3(s3, Je(null, +s3.month, +s3.year)), p = (s3) => {
    if (Array.isArray(s3))
      return s3.map((u3) => I3(u3));
    throw new Error(Gt.dateArr("multi-dates"));
  }, M3 = (s3) => {
    if (Array.isArray(s3))
      return [P(s3[0]), P(s3[1])];
    throw new Error(Gt.dateArr("week-picker"));
  }, E3 = (s3) => n.modelAuto ? Array.isArray(s3) ? [I3(s3[0]), I3(s3[1])] : n.autoApply ? [I3(s3)] : [I3(s3), null] : Array.isArray(s3) ? Ht(
    () => [
      I3(s3[0]),
      s3[1] ? I3(s3[1]) : yt(n.partialRange)
    ],
    n.range
  ) : I3(s3), z3 = () => {
    Array.isArray(t3.value) && n.range && t3.value.length === 1 && t3.value.push(yt(n.partialRange));
  }, K3 = () => {
    const s3 = t3.value;
    return [
      f(s3[0]),
      s3[1] ? f(s3[1]) : yt(n.partialRange)
    ];
  }, _ = () => t3.value[1] ? K3() : f($e(t3.value[0])), re2 = () => (t3.value || []).map((s3) => f(s3)), x3 = () => (z3(), n.modelAuto ? _() : n.multiDates ? re2() : Array.isArray(t3.value) ? Ht(() => K3(), n.range) : f($e(t3.value))), L3 = (s3) => !s3 || Array.isArray(s3) && !s3.length ? null : n.timePicker ? J($e(s3)) : n.monthPicker ? Q3($e(s3)) : n.yearPicker ? G3($e(s3)) : n.multiDates ? p($e(s3)) : n.weekPicker ? M3($e(s3)) : E3($e(s3)), h5 = (s3) => {
    const u3 = L3(s3);
    Sn($e(u3)) ? (t3.value = $e(u3), v()) : (t3.value = null, c3.value = "");
  }, T3 = () => {
    const s3 = (u3) => format(u3, r.value.format);
    return `${s3(t3.value[0])} ${r.value.rangeSeparator} ${t3.value[1] ? s3(t3.value[1]) : ""}`;
  }, H3 = () => a3.value && t3.value ? Array.isArray(t3.value) ? T3() : format(t3.value, r.value.format) : g(t3.value), ee = () => t3.value ? n.multiDates ? t3.value.map((s3) => g(s3)).join("; ") : r.value.enabled && typeof r.value.format == "string" ? H3() : g(t3.value) : "", v = () => {
    !n.format || typeof n.format == "string" || r.value.enabled && typeof r.value.format == "string" ? c3.value = ee() : c3.value = n.format(t3.value);
  }, I3 = (s3) => {
    if (n.utc) {
      const u3 = new Date(s3);
      return n.utc === "preserve" ? new Date(u3.getTime() + u3.getTimezoneOffset() * 6e4) : u3;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? S3(new Date(s3)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse(s3, l(), /* @__PURE__ */ new Date()) : S3(parse(s3, n.modelType, /* @__PURE__ */ new Date())) : S3(new Date(s3));
  }, f = (s3) => s3 ? n.utc ? Rr(s3, n.utc === "preserve", n.enableSeconds) : n.modelType ? n.modelType === "timestamp" ? +D3(s3) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? g(D3(s3)) : g(D3(s3), n.modelType) : D3(s3) : "", k3 = (s3, u3 = false) => {
    if (e3("update:model-value", s3), n.emitTimezone && u3) {
      const C = Array.isArray(s3) ? s3.map((O3) => Ge($e(O3)), n.emitTimezone) : Ge($e(s3), n.emitTimezone);
      e3("update:model-timezone-value", C);
    }
  }, d3 = (s3) => Array.isArray(t3.value) ? n.multiDates ? t3.value.map((u3) => s3(u3)) : [
    s3(t3.value[0]),
    t3.value[1] ? s3(t3.value[1]) : yt(n.partialRange)
  ] : s3($e(t3.value)), o = (s3) => k3($e(d3(s3)));
  return {
    inputValue: c3,
    internalModelValue: t3,
    checkBeforeEmit: () => t3.value ? n.range ? n.partialRange ? t3.value.length >= 1 : t3.value.length === 2 : !!t3.value : false,
    parseExternalModelValue: h5,
    formatInputValue: v,
    emitModelValue: () => (v(), n.monthPicker ? o(R3) : n.timePicker ? o(Y3) : n.yearPicker ? o(getYear) : n.weekPicker ? k3(t3.value, true) : k3(x3(), true))
  };
};
var Gr = (e3, n) => {
  const { defaultedFilters: a3 } = Se(e3), { validateMonthYearInRange: t3 } = Et(e3), r = (S3, g) => {
    let Y3 = S3;
    return a3.value.months.includes(getMonth(Y3)) ? (Y3 = g ? addMonths(S3, 1) : subMonths(S3, 1), r(Y3, g)) : Y3;
  }, l = (S3, g) => {
    let Y3 = S3;
    return a3.value.years.includes(getYear(Y3)) ? (Y3 = g ? addYears(S3, 1) : subYears(S3, 1), l(Y3, g)) : Y3;
  }, c3 = (S3, g = false) => {
    const Y3 = set(/* @__PURE__ */ new Date(), { month: e3.month, year: e3.year });
    let R3 = S3 ? addMonths(Y3, 1) : subMonths(Y3, 1);
    e3.disableYearSelect && (R3 = setYear(R3, e3.year));
    let G3 = getMonth(R3), q3 = getYear(R3);
    a3.value.months.includes(G3) && (R3 = r(R3, S3), G3 = getMonth(R3), q3 = getYear(R3)), a3.value.years.includes(q3) && (R3 = l(R3, S3), q3 = getYear(R3)), t3(G3, q3, S3, e3.preventMinMaxNavigation) && y3(G3, q3, g);
  }, y3 = (S3, g, Y3) => {
    n("update-month-year", { month: S3, year: g, fromNav: Y3 });
  }, D3 = computed(() => (S3) => Ca(
    set(/* @__PURE__ */ new Date(), { month: e3.month, year: e3.year }),
    e3.maxDate,
    e3.minDate,
    e3.preventMinMaxNavigation,
    S3
  ));
  return { handleMonthYearChange: c3, isDisabled: D3, updateMonthYear: y3 };
};
var ht = ((e3) => (e3.center = "center", e3.left = "left", e3.right = "right", e3))(ht || {});
var Le = ((e3) => (e3.month = "month", e3.year = "year", e3))(Le || {});
var ut = ((e3) => (e3.top = "top", e3.bottom = "bottom", e3))(ut || {});
var mt = ((e3) => (e3.header = "header", e3.calendar = "calendar", e3.timePicker = "timePicker", e3))(mt || {});
var je = ((e3) => (e3.month = "month", e3.year = "year", e3.calendar = "calendar", e3.time = "time", e3.minutes = "minutes", e3.hours = "hours", e3.seconds = "seconds", e3))(je || {});
var Zr = ({
  menuRef: e3,
  menuRefInner: n,
  inputRef: a3,
  pickerWrapperRef: t3,
  inline: r,
  emit: l,
  props: c3,
  slots: y3
}) => {
  const D3 = ref({}), S3 = ref(false), g = ref({
    top: "0",
    left: "0"
  }), Y3 = ref(false), R3 = toRef(c3, "teleportCenter");
  watch(R3, () => {
    g.value = JSON.parse(JSON.stringify({})), z3();
  });
  const G3 = (f) => {
    if (c3.teleport) {
      const k3 = f.getBoundingClientRect();
      return {
        left: k3.left + window.scrollX,
        top: k3.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, q3 = (f, k3) => {
    g.value.left = `${f + k3 - D3.value.width}px`;
  }, J = (f) => {
    g.value.left = `${f}px`;
  }, Q3 = (f, k3) => {
    c3.position === ht.left && J(f), c3.position === ht.right && q3(f, k3), c3.position === ht.center && (g.value.left = `${f + k3 / 2 - D3.value.width / 2}px`);
  }, p = (f) => {
    const { width: k3, height: d3 } = f.getBoundingClientRect(), { top: o, left: $ } = c3.altPosition ? c3.altPosition(f) : G3(f);
    return { top: +o, left: +$, width: k3, height: d3 };
  }, M3 = () => {
    g.value.left = "50%", g.value.top = "50%", g.value.transform = "translate(-50%, -50%)", g.value.position = "fixed", delete g.value.opacity;
  }, E3 = () => {
    const f = Ae(a3), { top: k3, left: d3, transform: o } = c3.altPosition(f);
    g.value = { top: `${k3}px`, left: `${d3}px`, transform: o ?? "" };
  }, z3 = (f = true) => {
    var k3;
    if (!r.value.enabled) {
      if (R3.value)
        return M3();
      if (c3.altPosition !== null)
        return E3();
      if (f) {
        const d3 = c3.teleport ? (k3 = n.value) == null ? void 0 : k3.$el : e3.value;
        d3 && (D3.value = d3.getBoundingClientRect()), l("recalculate-position");
      }
      return T3();
    }
  }, K3 = ({ inputEl: f, left: k3, width: d3 }) => {
    window.screen.width > 768 && !S3.value && Q3(k3, d3), x3(f);
  }, _ = (f) => {
    const { top: k3, left: d3, height: o, width: $ } = p(f);
    g.value.top = `${o + k3 + +c3.offset}px`, Y3.value = false, S3.value || (g.value.left = `${d3 + $ / 2 - D3.value.width / 2}px`), K3({ inputEl: f, left: d3, width: $ });
  }, re2 = (f) => {
    const { top: k3, left: d3, width: o } = p(f);
    g.value.top = `${k3 - +c3.offset - D3.value.height}px`, Y3.value = true, K3({ inputEl: f, left: d3, width: o });
  }, x3 = (f) => {
    if (c3.autoPosition) {
      const { left: k3, width: d3 } = p(f), { left: o, right: $ } = D3.value;
      if (!S3.value) {
        if (Math.abs(o) !== Math.abs($)) {
          if (o <= 0)
            return S3.value = true, J(k3);
          if ($ >= document.documentElement.clientWidth)
            return S3.value = true, q3(k3, d3);
        }
        return Q3(k3, d3);
      }
    }
  }, L3 = () => {
    const f = Ae(a3);
    if (f) {
      const { height: k3 } = D3.value, { top: d3, height: o } = f.getBoundingClientRect(), X3 = window.innerHeight - d3 - o, s3 = d3;
      return k3 <= X3 ? ut.bottom : k3 > X3 && k3 <= s3 ? ut.top : X3 >= s3 ? ut.bottom : ut.top;
    }
    return ut.bottom;
  }, h5 = (f) => L3() === ut.bottom ? _(f) : re2(f), T3 = () => {
    const f = Ae(a3);
    if (f)
      return c3.autoPosition ? h5(f) : _(f);
  }, H3 = function(f) {
    if (f) {
      const k3 = f.scrollHeight > f.clientHeight, o = window.getComputedStyle(f).overflowY.indexOf("hidden") !== -1;
      return k3 && !o;
    }
    return true;
  }, ee = function(f) {
    return !f || f === document.body || f.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : H3(f) ? f : ee(f.parentNode);
  }, v = (f) => {
    if (f)
      switch (c3.position) {
        case ht.left:
          return { left: 0, transform: "translateX(0)" };
        case ht.right:
          return { left: `${f.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${f.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: Y3,
    menuStyle: g,
    xCorrect: S3,
    setMenuPosition: z3,
    getScrollableParent: ee,
    shadowRender: (f, k3) => {
      var C, O3, A;
      const d3 = document.createElement("div"), o = (C = Ae(a3)) == null ? void 0 : C.getBoundingClientRect();
      d3.setAttribute("id", "dp--temp-container");
      const $ = (O3 = t3.value) != null && O3.clientWidth ? t3.value : document.body;
      $.append(d3);
      const X3 = document.getElementById("dp--temp-container"), s3 = v(o), u3 = h(
        f,
        {
          ...k3,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...s3 }
        },
        Object.fromEntries(Object.keys(y3).map((te) => [te, y3[te]]))
      );
      render(u3, X3), D3.value = (A = u3.el) == null ? void 0 : A.getBoundingClientRect(), render(null, X3), $.removeChild(X3);
    }
  };
};
var st = [
  { name: "clock-icon", use: ["time", "calendar", "shared"] },
  { name: "arrow-left", use: ["month-year", "calendar", "shared"] },
  { name: "arrow-right", use: ["month-year", "calendar", "shared"] },
  { name: "arrow-up", use: ["time", "calendar", "month-year", "shared"] },
  { name: "arrow-down", use: ["time", "calendar", "month-year", "shared"] },
  { name: "calendar-icon", use: ["month-year", "time", "calendar", "shared"] },
  { name: "day", use: ["calendar", "shared"] },
  { name: "month-overlay-value", use: ["calendar", "month-year", "shared"] },
  { name: "year-overlay-value", use: ["calendar", "month-year", "shared"] },
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
  { name: "year", use: ["calendar", "month-year", "shared"] },
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
  { name: "marker", use: ["calendar", "shared"] }
];
var qr = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var Xr = {
  all: () => st,
  monthYear: () => st.filter((e3) => e3.use.includes("month-year")),
  input: () => qr,
  timePicker: () => st.filter((e3) => e3.use.includes("time")),
  action: () => st.filter((e3) => e3.use.includes("action")),
  calendar: () => st.filter((e3) => e3.use.includes("calendar")),
  menu: () => st.filter((e3) => e3.use.includes("menu")),
  shared: () => st.filter((e3) => e3.use.includes("shared"))
};
var ze = (e3, n, a3) => {
  const t3 = [];
  return Xr[n]().forEach((r) => {
    e3[r.name] && t3.push(r.name);
  }), a3 != null && a3.length && a3.forEach((r) => {
    r.slot && t3.push(r.slot);
  }), t3;
};
var Bt = (e3) => {
  const n = computed(() => (t3) => e3.value ? t3 ? e3.value.open : e3.value.close : ""), a3 = computed(() => (t3) => e3.value ? t3 ? e3.value.menuAppearTop : e3.value.menuAppearBottom : "");
  return { transitionName: n, showTransition: !!e3.value, menuTransition: a3 };
};
var Zt = (e3, n) => {
  const a3 = ref([{ month: getMonth(P()), year: getYear(P()) }]), t3 = reactive({
    hours: e3.range ? [getHours(P()), getHours(P())] : getHours(P()),
    minutes: e3.range ? [getMinutes(P()), getMinutes(P())] : getMinutes(P()),
    seconds: e3.range ? [0, 0] : 0
  }), r = computed({
    get: () => e3.internalModelValue,
    set: (y3) => {
      !e3.readonly && !e3.disabled && n("update:internal-model-value", y3);
    }
  }), l = computed(
    () => (y3) => a3.value[y3] ? a3.value[y3].month : 0
  ), c3 = computed(
    () => (y3) => a3.value[y3] ? a3.value[y3].year : 0
  );
  return {
    calendars: a3,
    time: t3,
    modelValue: r,
    month: l,
    year: c3
  };
};
var Jr = (e3, n) => {
  const { defaultedMultiCalendars: a3 } = Se(n), { isDisabled: t3, matchDate: r } = Et(n), l = ref(null), c3 = ref(P()), y3 = (o) => {
    !o.current && n.hideOffsetDates || (l.value = o.value);
  }, D3 = () => {
    l.value = null;
  }, S3 = (o) => Array.isArray(e3.value) && n.range && e3.value[0] && l.value ? o ? Re(l.value, e3.value[0]) : Pe(l.value, e3.value[0]) : true, g = (o, $) => {
    const X3 = () => e3.value ? $ ? e3.value[0] || null : e3.value[1] : null, s3 = e3.value && Array.isArray(e3.value) ? X3() : null;
    return ge(P(o.value), s3);
  }, Y3 = (o) => {
    const $ = Array.isArray(e3.value) ? e3.value[0] : null;
    return o ? !Pe(l.value ?? null, $) : true;
  }, R3 = (o, $ = true) => (n.range || n.weekPicker) && Array.isArray(e3.value) && e3.value.length === 2 ? n.hideOffsetDates && !o.current ? false : ge(P(o.value), e3.value[$ ? 0 : 1]) : n.range ? g(o, $) && Y3($) || ge(o.value, Array.isArray(e3.value) ? e3.value[0] : null) && S3($) : false, G3 = (o, $, X3) => Array.isArray(e3.value) && e3.value[0] && e3.value.length === 1 ? o ? false : X3 ? Re(e3.value[0], $.value) : Pe(e3.value[0], $.value) : false, q3 = (o) => !e3.value || n.hideOffsetDates && !o.current ? false : n.range ? n.modelAuto && Array.isArray(e3.value) ? ge(o.value, e3.value[0] ? e3.value[0] : c3.value) : false : n.multiDates && Array.isArray(e3.value) ? e3.value.some(($) => ge($, o.value)) : ge(o.value, e3.value ? e3.value : c3.value), J = (o) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !o.current)
          return false;
        const $ = addDays(l.value, +n.autoRange), X3 = jt(P(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ge(X3[1], P(o.value)) : ge($, P(o.value));
      }
      return false;
    }
    return false;
  }, Q3 = (o) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        const $ = addDays(l.value, +n.autoRange);
        if (n.hideOffsetDates && !o.current)
          return false;
        const X3 = jt(P(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? Re(o.value, X3[0]) && Pe(o.value, X3[1]) : Re(o.value, l.value) && Pe(o.value, $);
      }
      return false;
    }
    return false;
  }, p = (o) => {
    if (n.autoRange || n.weekPicker) {
      if (l.value) {
        if (n.hideOffsetDates && !o.current)
          return false;
        const $ = jt(P(l.value), n.timezone, n.weekStart);
        return n.weekPicker ? ge($[0], o.value) : ge(l.value, o.value);
      }
      return false;
    }
    return false;
  }, M3 = (o) => Hn(e3.value, l.value, o.value), E3 = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, z3 = () => n.modelAuto ? $a(n.internalModelValue) : true, K3 = (o) => {
    if (Array.isArray(e3.value) && e3.value.length || n.weekPicker)
      return false;
    const $ = n.range ? !R3(o) && !R3(o, false) : true;
    return !t3(o.value) && !q3(o) && !(!o.current && n.hideOffsetDates) && $;
  }, _ = (o) => n.range ? n.modelAuto ? E3() && q3(o) : false : q3(o), re2 = (o) => {
    var $;
    return n.highlight ? r(
      o.value,
      ($ = n.arrMapValues) != null && $.highlightedDates ? n.arrMapValues.highlightedDates : n.highlight
    ) : false;
  }, x3 = (o) => t3(o.value) && n.highlightDisabledDays === false, L3 = (o) => {
    var $;
    return ($ = n.highlightWeekDays) == null ? void 0 : $.includes(o.value.getDay());
  }, h5 = (o) => (n.range || n.weekPicker) && (!(a3.value.count > 0) || o.current) && z3() && !(!o.current && n.hideOffsetDates) && !q3(o) ? M3(o) : false, T3 = (o) => {
    const { isRangeStart: $, isRangeEnd: X3 } = v(o), s3 = n.range ? $ || X3 : false;
    return {
      dp__cell_offset: !o.current,
      dp__pointer: !n.disabled && !(!o.current && n.hideOffsetDates) && !t3(o.value),
      dp__cell_disabled: t3(o.value),
      dp__cell_highlight: !x3(o) && (re2(o) || L3(o)) && !_(o) && !s3,
      dp__cell_highlight_active: !x3(o) && (re2(o) || L3(o)) && _(o),
      dp__today: !n.noToday && ge(o.value, c3.value) && o.current
    };
  }, H3 = (o) => ({
    dp__active_date: _(o),
    dp__date_hover: K3(o)
  }), ee = (o) => ({
    ...I3(o),
    ...f(o),
    dp__range_between_week: h5(o) && n.weekPicker
  }), v = (o) => {
    const $ = a3.value.count > 0 ? o.current && R3(o) && z3() : R3(o) && z3(), X3 = a3.value.count > 0 ? o.current && R3(o, false) && z3() : R3(o, false) && z3();
    return { isRangeStart: $, isRangeEnd: X3 };
  }, I3 = (o) => {
    const { isRangeStart: $, isRangeEnd: X3 } = v(o);
    return {
      dp__range_start: $,
      dp__range_end: X3,
      dp__range_between: h5(o) && !n.weekPicker,
      dp__date_hover_start: G3(K3(o), o, true),
      dp__date_hover_end: G3(K3(o), o, false)
    };
  }, f = (o) => ({
    ...I3(o),
    dp__cell_auto_range: Q3(o),
    dp__cell_auto_range_start: p(o),
    dp__cell_auto_range_end: J(o)
  }), k3 = (o) => n.range ? n.autoRange ? f(o) : n.modelAuto ? { ...H3(o), ...I3(o) } : I3(o) : n.weekPicker ? ee(o) : H3(o);
  return {
    setHoverDate: y3,
    clearHoverDate: D3,
    getDayClassData: (o) => n.hideOffsetDates && !o.current ? {} : {
      ...T3(o),
      ...k3(o),
      [n.dayClass ? n.dayClass(o.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    }
  };
};
var Et = (e3) => {
  const { defaultedFilters: n } = Se(e3), a3 = () => {
    if (e3.timezone)
      return e3.timezone;
    if (e3.utc)
      return "UTC";
  }, t3 = (h5) => {
    const T3 = He(r(P(h5))).toISOString(), [H3] = T3.split("T");
    return H3;
  }, r = (h5) => e3.utc === "preserve" ? Sa(h5, a3()) : Ge(h5, a3()), l = (h5) => {
    var $;
    const T3 = e3.maxDate ? Re(r(h5), r(P(e3.maxDate))) : false, H3 = e3.minDate ? Pe(r(h5), r(P(e3.minDate))) : false, ee = S3(
      r(h5),
      ($ = e3.arrMapValues) != null && $.disabledDates ? e3.arrMapValues.disabledDates : e3.disabledDates
    ), I3 = n.value.months.map((X3) => +X3).includes(getMonth(h5)), f = e3.disabledWeekDays.length ? e3.disabledWeekDays.some((X3) => +X3 === getDay(h5)) : false, k3 = Y3(h5), d3 = getYear(h5), o = d3 < +e3.yearRange[0] || d3 > +e3.yearRange[1];
    return !(T3 || H3 || ee || I3 || o || f || k3);
  }, c3 = (h5, T3) => Pe(...et(e3.minDate, h5, T3)) || ge(...et(e3.minDate, h5, T3)), y3 = (h5, T3) => Re(...et(e3.maxDate, h5, T3)) || ge(...et(e3.maxDate, h5, T3)), D3 = (h5, T3, H3) => {
    let ee = false;
    return e3.maxDate && H3 && y3(h5, T3) && (ee = true), e3.minDate && !H3 && c3(h5, T3) && (ee = true), ee;
  }, S3 = (h5, T3) => h5 ? T3 instanceof Map ? !!T3.get(t3(h5)) : Array.isArray(T3) ? T3.some((H3) => ge(r(P(H3)), r(h5))) : T3 ? T3(P(JSON.parse(JSON.stringify(h5)))) : false : true, g = (h5, T3, H3, ee) => {
    let v = false;
    return ee ? e3.minDate && e3.maxDate ? v = D3(h5, T3, H3) : (e3.minDate && c3(h5, T3) || e3.maxDate && y3(h5, T3)) && (v = true) : v = true, v;
  }, Y3 = (h5) => {
    var T3, H3, ee, v, I3;
    return Array.isArray(e3.allowedDates) && !((T3 = e3.allowedDates) != null && T3.length) ? true : (H3 = e3.arrMapValues) != null && H3.allowedDates ? !S3(h5, (ee = e3.arrMapValues) == null ? void 0 : ee.allowedDates) : (v = e3.allowedDates) != null && v.length ? !((I3 = e3.allowedDates) != null && I3.some((f) => ge(r(P(f)), r(h5)))) : false;
  }, R3 = (h5) => !l(h5), G3 = (h5) => e3.noDisabledRange ? !eachDayOfInterval({ start: h5[0], end: h5[1] }).some((H3) => R3(H3)) : true, q3 = (h5, T3, H3 = 0) => {
    if (Array.isArray(T3) && T3[H3]) {
      const ee = differenceInCalendarDays(h5, T3[H3]), v = _a(T3[H3], h5), I3 = v.length === 1 ? 0 : v.filter((k3) => R3(k3)).length, f = Math.abs(ee) - I3;
      if (e3.minRange && e3.maxRange)
        return f >= +e3.minRange && f <= +e3.maxRange;
      if (e3.minRange)
        return f >= +e3.minRange;
      if (e3.maxRange)
        return f <= +e3.maxRange;
    }
    return true;
  }, J = (h5) => new Map(h5.map((T3) => [t3(T3), true])), Q3 = (h5) => Array.isArray(h5) && h5.length > 0, p = () => {
    const h5 = {
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    };
    return Q3(e3.allowedDates) && (h5.allowedDates = J(e3.allowedDates)), Q3(e3.highlight) && (h5.highlightedDates = J(e3.highlight)), Q3(e3.disabledDates) && (h5.disabledDates = J(e3.disabledDates)), h5;
  }, M3 = () => !e3.enableTimePicker || e3.monthPicker || e3.yearPicker || e3.ignoreTimeValidation, E3 = (h5) => Array.isArray(h5) ? [h5[0] ? mn(h5[0]) : null, h5[1] ? mn(h5[1]) : null] : mn(h5), z3 = (h5, T3, H3) => h5.find(
    (ee) => +ee.hours === getHours(T3) && ee.minutes === "*" ? true : +ee.minutes === getMinutes(T3)
  ) && H3, K3 = (h5, T3, H3) => {
    const [ee, v] = h5, [I3, f] = T3;
    return !z3(ee, I3, H3) && !z3(v, f, H3) && H3;
  }, _ = (h5, T3) => {
    const H3 = Array.isArray(T3) ? T3 : [T3];
    return Array.isArray(e3.disabledTimes) ? Array.isArray(e3.disabledTimes[0]) ? K3(e3.disabledTimes, H3, h5) : !H3.some((ee) => z3(e3.disabledTimes, ee, h5)) : h5;
  }, re2 = (h5, T3) => {
    const H3 = Array.isArray(T3) ? [vt(T3[0]), T3[1] ? vt(T3[1]) : void 0] : vt(T3), ee = !e3.disabledTimes(H3);
    return h5 && ee;
  }, x3 = (h5, T3) => e3.disabledTimes ? Array.isArray(e3.disabledTimes) ? _(T3, h5) : re2(T3, h5) : T3;
  return {
    isDisabled: R3,
    validateDate: l,
    validateMonthYearInRange: g,
    isDateRangeAllowed: G3,
    checkMinMaxRange: q3,
    matchDate: S3,
    mapDatesArrToMap: p,
    isValidTime: (h5) => {
      let T3 = true;
      if (!h5 || M3())
        return true;
      const H3 = !e3.minDate && !e3.maxDate ? E3(h5) : h5;
      return (e3.maxTime || e3.maxDate) && (T3 = oa(e3.maxTime, e3.maxDate, "max", $e(H3), T3)), (e3.minTime || e3.minDate) && (T3 = oa(e3.minTime, e3.minDate, "min", $e(H3), T3)), x3(h5, T3);
    }
  };
};
var qt = () => {
  const e3 = computed(() => (t3, r) => t3 == null ? void 0 : t3.includes(r)), n = computed(() => (t3, r) => t3.count ? t3.solo ? true : r === 0 : true), a3 = computed(() => (t3, r) => t3.count ? t3.solo ? true : r === t3.count - 1 : true);
  return { hideNavigationButtons: e3, showLeftIcon: n, showRightIcon: a3 };
};
var xr = (e3, n, a3) => {
  const t3 = ref(0), r = reactive({
    // monthYearInput: !!props.timePicker,
    [mt.timePicker]: !e3.enableTimePicker || e3.timePicker || e3.monthPicker,
    [mt.calendar]: false,
    [mt.header]: false
  }), l = (g) => {
    var Y3;
    (Y3 = e3.flow) != null && Y3.length && (r[g] = true, Object.keys(r).filter((R3) => !r[R3]).length || S3());
  }, c3 = () => {
    var g;
    (g = e3.flow) != null && g.length && t3.value !== -1 && (t3.value += 1, n("flow-step", t3.value), S3());
  }, y3 = () => {
    t3.value = -1;
  }, D3 = (g, Y3, ...R3) => {
    e3.flow[t3.value] === g && a3.value && a3.value[Y3](...R3);
  }, S3 = () => {
    D3(je.month, "toggleMonthPicker", true), D3(je.year, "toggleYearPicker", true), D3(je.calendar, "toggleTimePicker", false, true), D3(je.time, "toggleTimePicker", true, true);
    const g = e3.flow[t3.value];
    (g === je.hours || g === je.minutes || g === je.seconds) && D3(g, "toggleTimePicker", true, true, g);
  };
  return { childMount: l, updateFlowStep: c3, resetFlow: y3, flowStep: t3 };
};
var Xt = {
  multiCalendars: { type: [Boolean, Number, String, Object], default: void 0 },
  modelValue: { type: [String, Date, Array, Object, Number], default: null },
  modelType: { type: String, default: null },
  position: { type: String, default: "center" },
  dark: { type: Boolean, default: false },
  format: {
    type: [String, Function],
    default: () => null
  },
  closeOnScroll: { type: Boolean, default: false },
  autoPosition: { type: Boolean, default: true },
  closeOnAutoApply: { type: Boolean, default: true },
  altPosition: { type: Function, default: null },
  transitions: { type: [Boolean, Object], default: true },
  formatLocale: { type: Object, default: null },
  utc: { type: [Boolean, String], default: false },
  ariaLabels: { type: Object, default: () => ({}) },
  offset: { type: [Number, String], default: 10 },
  hideNavigation: { type: Array, default: () => [] },
  timezone: { type: String, default: null },
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
  modeHeight: { type: [Number, String], default: 255 },
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
  keepActionRow: { type: Boolean, default: false },
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
  disableTimeRangeValidation: { type: Boolean, default: false },
  highlight: {
    type: [Array, Function],
    default: null
  },
  highlightWeekDays: {
    type: Array,
    default: null
  },
  highlightDisabledDays: { type: Boolean, default: false },
  teleport: { type: [String, Boolean], default: null },
  teleportCenter: { type: Boolean, default: false },
  locale: { type: String, default: "en-Us" },
  weekNumName: { type: String, default: "W" },
  weekStart: { type: [Number, String], default: 1 },
  weekNumbers: {
    type: [String, Function],
    default: null
  },
  calendarClassName: { type: String, default: null },
  noSwipe: { type: Boolean, default: false },
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
  multiDates: { type: Boolean, default: false },
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
  range: { type: Boolean, default: false },
  uid: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  inline: { type: [Boolean, Object], default: false },
  textInput: { type: [Boolean, Object], default: false },
  onClickOutside: { type: Function, default: null },
  noDisabledRange: { type: Boolean, default: false },
  sixWeeks: { type: [Boolean, String], default: false },
  actionRow: { type: Object, default: () => ({}) },
  allowPreventDefault: { type: Boolean, default: false },
  closeOnClearValue: { type: Boolean, default: true },
  focusStartDate: { type: Boolean, default: false },
  disabledTimes: { type: [Function, Array], default: void 0 },
  showLastInRange: { type: Boolean, default: true },
  timePickerInline: { type: Boolean, default: false },
  calendar: { type: Function, default: null },
  config: { type: Object, default: void 0 }
};
var xe = {
  ...Xt,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  arrMapValues: { type: Object, default: () => ({}) }
};
var Qr = {
  key: 1,
  class: "dp__input_wrap"
};
var el = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid", "onKeydown"];
var tl = {
  key: 2,
  class: "dp__clear_icon"
};
var nl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...Xt
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, {
      defaultedTextInput: r,
      defaultedAriaLabels: l,
      defaultedInline: c3,
      defaultedConfig: y3,
      getDefaultPattern: D3,
      getDefaultStartTime: S3
    } = Se(t3), g = ref(), Y3 = ref(null), R3 = ref(false), G3 = ref(false), q3 = computed(
      () => ({
        dp__pointer: !t3.disabled && !t3.readonly && !r.value.enabled,
        dp__disabled: t3.disabled,
        dp__input_readonly: !r.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !t3.hideInputIcon,
        dp__input_valid: !!t3.state,
        dp__input_invalid: t3.state === false,
        dp__input_focus: R3.value || t3.isMenuOpen,
        dp__input_reg: !r.value.enabled,
        [t3.inputClassName]: !!t3.inputClassName
      })
    ), J = () => {
      a3("set-input-date", null), t3.autoApply && (a3("set-empty-date"), g.value = null);
    }, Q3 = (v) => {
      const I3 = S3();
      return Cr(
        v,
        r.value.format ?? D3(),
        I3 ?? Pa({}, t3.enableSeconds),
        t3.inputValue,
        G3.value
      );
    }, p = (v) => {
      const { rangeSeparator: I3 } = r.value, [f, k3] = v.split(`${I3}`);
      if (f) {
        const d3 = Q3(f.trim()), o = k3 ? Q3(k3.trim()) : null, $ = d3 && o ? [d3, o] : [d3];
        g.value = d3 ? $ : null;
      }
    }, M3 = () => {
      G3.value = true;
    }, E3 = (v) => {
      if (t3.range)
        p(v);
      else if (t3.multiDates) {
        const I3 = v.split(";");
        g.value = I3.map((f) => Q3(f.trim())).filter((f) => f);
      } else
        g.value = Q3(v);
    }, z3 = (v) => {
      var f;
      const I3 = typeof v == "string" ? v : (f = v.target) == null ? void 0 : f.value;
      I3 !== "" ? (r.value.openMenu && !t3.isMenuOpen && a3("open"), E3(I3), a3("set-input-date", g.value)) : J(), G3.value = false, a3("update:input-value", I3);
    }, K3 = (v) => {
      r.value.enabled ? (E3(v.target.value), r.value.enterSubmit && Sn(g.value) && t3.inputValue !== "" ? (a3("set-input-date", g.value, true), g.value = null) : r.value.enterSubmit && t3.inputValue === "" && (g.value = null, a3("clear"))) : x3(v);
    }, _ = (v) => {
      r.value.enabled && r.value.tabSubmit && E3(v.target.value), r.value.tabSubmit && Sn(g.value) && t3.inputValue !== "" ? (a3("set-input-date", g.value, true), g.value = null) : r.value.tabSubmit && t3.inputValue === "" && (g.value = null, a3("clear"));
    }, re2 = () => {
      R3.value = true, a3("focus");
    }, x3 = (v) => {
      v.preventDefault(), tt(v, y3.value, true), r.value.enabled && r.value.openMenu && !c3.value.input && !t3.isMenuOpen ? a3("open") : r.value.enabled || a3("toggle");
    }, L3 = () => {
      a3("real-blur"), R3.value = false, (!t3.isMenuOpen || c3.value.enabled && c3.value.input) && a3("blur"), t3.autoApply && r.value.enabled && g.value && !t3.isMenuOpen && (a3("set-input-date", g.value), a3("select-date"), g.value = null);
    }, h5 = (v) => {
      tt(v, y3.value, true), a3("clear");
    }, T3 = (v) => {
      if (!r.value.enabled) {
        if (v.code === "Tab")
          return;
        v.preventDefault();
      }
    };
    return n({
      focusInput: () => {
        var v;
        (v = Y3.value) == null || v.focus({ preventScroll: true });
      },
      setParsedDate: (v) => {
        g.value = v;
      }
    }), (v, I3) => {
      var f;
      return openBlock(), createElementBlock("div", { onClick: x3 }, [
        v.$slots.trigger && !v.$slots["dp-input"] && !unref(c3).enabled ? renderSlot(v.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !v.$slots.trigger && (!unref(c3).enabled || unref(c3).input) ? (openBlock(), createElementBlock("div", Qr, [
          v.$slots["dp-input"] && !v.$slots.trigger && !unref(c3).enabled ? renderSlot(v.$slots, "dp-input", {
            key: 0,
            value: e3.inputValue,
            isMenuOpen: e3.isMenuOpen,
            onInput: z3,
            onEnter: K3,
            onTab: _,
            onClear: h5,
            onBlur: L3,
            onKeypress: T3,
            onPaste: M3
          }) : createCommentVNode("", true),
          v.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: Y3,
            id: v.uid ? `dp-input-${v.uid}` : void 0,
            name: v.name,
            class: normalizeClass(q3.value),
            inputmode: unref(r).enabled ? "text" : "none",
            placeholder: v.placeholder,
            disabled: v.disabled,
            readonly: v.readonly,
            required: v.required,
            value: e3.inputValue,
            autocomplete: v.autocomplete,
            "aria-label": (f = unref(l)) == null ? void 0 : f.input,
            "aria-disabled": v.disabled || void 0,
            "aria-invalid": v.state === false ? true : void 0,
            onInput: z3,
            onKeydown: [
              withKeys(K3, ["enter"]),
              withKeys(_, ["tab"]),
              T3
            ],
            onBlur: L3,
            onFocus: re2,
            onKeypress: T3,
            onPaste: M3
          }, null, 42, el)),
          createBaseVNode("div", {
            onClick: I3[2] || (I3[2] = (k3) => a3("toggle"))
          }, [
            v.$slots["input-icon"] && !v.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: I3[0] || (I3[0] = (k3) => a3("toggle"))
            }, [
              renderSlot(v.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !v.$slots["input-icon"] && !v.hideInputIcon && !v.$slots["dp-input"] ? (openBlock(), createBlock(unref(It), {
              key: 1,
              onClick: I3[1] || (I3[1] = (k3) => a3("toggle")),
              class: "dp__input_icon dp__input_icons"
            })) : createCommentVNode("", true)
          ]),
          v.$slots["clear-icon"] && e3.inputValue && v.clearable && !v.disabled && !v.readonly ? (openBlock(), createElementBlock("span", tl, [
            renderSlot(v.$slots, "clear-icon", { clear: h5 })
          ])) : createCommentVNode("", true),
          v.clearable && !v.$slots["clear-icon"] && e3.inputValue && !v.disabled && !v.readonly ? (openBlock(), createBlock(unref(ba), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            onClick: I3[3] || (I3[3] = withModifiers((k3) => h5(k3), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var al = ["title"];
var rl = { class: "dp__action_buttons" };
var ll = ["onKeydown", "disabled"];
var ol = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...xe
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e3, { emit: n }) {
    const a3 = e3, {
      defaultedActionRow: t3,
      defaultedPreviewFormat: r,
      defaultedMultiCalendars: l,
      defaultedTextInput: c3,
      defaultedInline: y3,
      getDefaultPattern: D3
    } = Se(a3), { isValidTime: S3 } = Et(a3), { buildMatrix: g } = lt(), Y3 = ref(null), R3 = ref(null);
    onMounted(() => {
      a3.arrowNavigation && g([Ae(Y3), Ae(R3)], "actionRow");
    });
    const G3 = computed(() => a3.range && !a3.partialRange && a3.internalModelValue ? a3.internalModelValue.length === 2 : true), q3 = computed(() => !J.value || !Q3.value || !G3.value), J = computed(() => !a3.enableTimePicker || a3.ignoreTimeValidation ? true : S3(a3.internalModelValue)), Q3 = computed(() => a3.monthPicker ? a3.range && Array.isArray(a3.internalModelValue) ? !a3.internalModelValue.filter((h5) => !re2(h5)).length : re2(a3.internalModelValue) : true), p = () => {
      const L3 = r.value;
      return a3.timePicker || a3.monthPicker, L3($e(a3.internalModelValue));
    }, M3 = () => {
      const L3 = a3.internalModelValue;
      return l.value.count > 0 ? `${E3(L3[0])} - ${E3(L3[1])}` : [E3(L3[0]), E3(L3[1])];
    }, E3 = (L3) => Ra(
      L3,
      r.value,
      a3.formatLocale,
      c3.value.rangeSeparator,
      a3.modelAuto,
      D3()
    ), z3 = computed(() => !a3.internalModelValue || !a3.menuMount ? "" : typeof r.value == "string" ? Array.isArray(a3.internalModelValue) ? a3.internalModelValue.length === 2 && a3.internalModelValue[1] ? M3() : a3.multiDates ? a3.internalModelValue.map((L3) => `${E3(L3)}`) : a3.modelAuto ? `${E3(a3.internalModelValue[0])}` : `${E3(a3.internalModelValue[0])} -` : E3(a3.internalModelValue) : p()), K3 = () => a3.multiDates ? "; " : " - ", _ = computed(
      () => Array.isArray(z3.value) ? z3.value.join(K3()) : z3.value
    ), re2 = (L3) => {
      if (!a3.monthPicker)
        return true;
      let h5 = true;
      const T3 = P(We(L3));
      if (a3.minDate && a3.maxDate) {
        const H3 = P(We(a3.minDate)), ee = P(We(a3.maxDate));
        return Re(T3, H3) && Pe(T3, ee) || ge(T3, H3) || ge(T3, ee);
      }
      if (a3.minDate) {
        const H3 = P(We(a3.minDate));
        h5 = Re(T3, H3) || ge(T3, H3);
      }
      if (a3.maxDate) {
        const H3 = P(We(a3.maxDate));
        h5 = Pe(T3, H3) || ge(T3, H3);
      }
      return h5;
    }, x3 = () => {
      J.value && Q3.value && G3.value ? n("select-date") : n("invalid-select");
    };
    return (L3, h5) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e3.calendarWidth ? { width: `${e3.calendarWidth}px` } : {})
    }, [
      L3.$slots["action-row"] ? renderSlot(L3.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: L3.internalModelValue,
        disabled: q3.value,
        selectDate: () => L3.$emit("select-date"),
        closePicker: () => L3.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(t3).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: _.value
        }, [
          L3.$slots["action-preview"] ? renderSlot(L3.$slots, "action-preview", {
            key: 0,
            value: L3.internalModelValue
          }) : createCommentVNode("", true),
          L3.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(_.value), 1)
          ], 64))
        ], 8, al)) : createCommentVNode("", true),
        createBaseVNode("div", rl, [
          L3.$slots["action-buttons"] ? renderSlot(L3.$slots, "action-buttons", {
            key: 0,
            value: L3.internalModelValue
          }) : createCommentVNode("", true),
          L3.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(y3).enabled && unref(t3).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: Y3,
              class: "dp__action_button dp__action_cancel",
              onClick: h5[0] || (h5[0] = (T3) => L3.$emit("close-picker")),
              onKeydown: [
                h5[1] || (h5[1] = withKeys((T3) => L3.$emit("close-picker"), ["enter"])),
                h5[2] || (h5[2] = withKeys((T3) => L3.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(L3.cancelText), 545)) : createCommentVNode("", true),
            unref(t3).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: Y3,
              class: "dp__action_button dp__action_cancel",
              onClick: h5[3] || (h5[3] = (T3) => L3.$emit("select-now")),
              onKeydown: [
                h5[4] || (h5[4] = withKeys((T3) => L3.$emit("select-now"), ["enter"])),
                h5[5] || (h5[5] = withKeys((T3) => L3.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(L3.nowButtonLabel), 545)) : createCommentVNode("", true),
            unref(t3).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              type: "button",
              class: "dp__action_button dp__action_select",
              onKeydown: [
                withKeys(x3, ["enter"]),
                withKeys(x3, ["space"])
              ],
              onClick: x3,
              disabled: q3.value,
              ref_key: "selectButtonRef",
              ref: R3
            }, toDisplayString(L3.selectText), 41, ll)) : createCommentVNode("", true)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
});
var sl = ["onKeydown"];
var ul = { class: "dp__selection_grid_header" };
var il = ["aria-selected", "aria-disabled", "onClick", "onKeydown", "onMouseover"];
var dl = ["aria-label", "onKeydown"];
var Ot = defineComponent({
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
    config: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, { setSelectionGrid: r, buildMultiLevelMatrix: l, setMonthPicker: c3 } = lt(), { defaultedAriaLabels: y3, defaultedTextInput: D3, defaultedConfig: S3 } = Se(
      t3
    ), { hideNavigationButtons: g } = qt(), Y3 = ref(false), R3 = ref(null), G3 = ref(null), q3 = ref([]), J = ref(), Q3 = ref(null), p = ref(0), M3 = ref(null);
    onBeforeUpdate(() => {
      R3.value = null;
    }), onMounted(() => {
      nextTick().then(() => h5()), z3(), E3(true);
    }), onUnmounted(() => E3(false));
    const E3 = (d3) => {
      var o;
      t3.arrowNavigation && ((o = t3.headerRefs) != null && o.length ? c3(d3) : r(d3));
    }, z3 = () => {
      var o;
      const d3 = Ae(G3);
      d3 && (D3.value.enabled || (R3.value ? (o = R3.value) == null || o.focus({ preventScroll: true }) : d3.focus({ preventScroll: true })), Y3.value = d3.clientHeight < d3.scrollHeight);
    }, K3 = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !t3.useRelative,
        "dp--overlay-relative": t3.useRelative
      })
    ), _ = computed(
      () => t3.useRelative ? { height: `${t3.height}px`, width: "260px" } : void 0
    ), re2 = computed(() => ({
      dp__overlay_col: true
    })), x3 = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: Y3.value,
        dp__button_bottom: t3.isLast
      })
    ), L3 = computed(() => {
      var d3, o;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((d3 = t3.items) == null ? void 0 : d3.length) <= 6,
        dp__container_block: ((o = t3.items) == null ? void 0 : o.length) > 6
      };
    }), h5 = () => {
      nextTick().then(() => {
        const d3 = Ae(R3), o = Ae(G3), $ = Ae(Q3), X3 = Ae(M3), s3 = $ ? $.getBoundingClientRect().height : 0;
        o && (p.value = o.getBoundingClientRect().height - s3), d3 && X3 && (X3.scrollTop = d3.offsetTop - X3.offsetTop - (p.value / 2 - d3.getBoundingClientRect().height) - s3);
      });
    }, T3 = (d3) => {
      d3.disabled || a3("selected", d3.value);
    }, H3 = () => {
      a3("toggle"), a3("reset-flow");
    }, ee = () => {
      t3.escClose && H3();
    }, v = (d3, o, $, X3) => {
      d3 && (o.active && (R3.value = d3), t3.arrowNavigation && (Array.isArray(q3.value[$]) ? q3.value[$][X3] = d3 : q3.value[$] = [d3], I3()));
    }, I3 = () => {
      var o, $;
      const d3 = (o = t3.headerRefs) != null && o.length ? [t3.headerRefs].concat(q3.value) : q3.value.concat([t3.skipButtonRef ? [] : [Q3.value]]);
      l($e(d3), ($ = t3.headerRefs) != null && $.length ? "monthPicker" : "selectionGrid");
    }, f = (d3) => {
      t3.arrowNavigation || tt(d3, S3.value, true);
    }, k3 = (d3) => {
      J.value = d3, a3("hover-value", d3);
    };
    return n({ focusGrid: z3 }), (d3, o) => {
      var $;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: G3,
        class: normalizeClass(K3.value),
        style: normalizeStyle(_.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(ee, ["prevent"]), ["esc"]),
          o[0] || (o[0] = withKeys(withModifiers((X3) => f(X3), ["prevent"]), ["left"])),
          o[1] || (o[1] = withKeys(withModifiers((X3) => f(X3), ["prevent"]), ["up"])),
          o[2] || (o[2] = withKeys(withModifiers((X3) => f(X3), ["prevent"]), ["down"])),
          o[3] || (o[3] = withKeys(withModifiers((X3) => f(X3), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          class: normalizeClass(L3.value),
          ref_key: "containerRef",
          ref: M3,
          role: "grid",
          style: normalizeStyle({ height: `${p.value}px` })
        }, [
          createBaseVNode("div", ul, [
            renderSlot(d3.$slots, "header")
          ]),
          d3.$slots.overlay ? renderSlot(d3.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(d3.items, (X3, s3) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: d3.items.length >= 3 }]),
            key: s3,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(X3, (u3, C) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(re2.value),
              key: u3.value,
              "aria-selected": u3.active,
              "aria-disabled": u3.disabled || void 0,
              ref_for: true,
              ref: (O3) => v(O3, u3, s3, C),
              tabindex: "0",
              onClick: (O3) => T3(u3),
              onKeydown: [
                withKeys(withModifiers((O3) => T3(u3), ["prevent"]), ["enter"]),
                withKeys(withModifiers((O3) => T3(u3), ["prevent"]), ["space"])
              ],
              onMouseover: (O3) => k3(u3.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(u3.className)
              }, [
                d3.$slots.item ? renderSlot(d3.$slots, "item", {
                  key: 0,
                  item: u3
                }) : createCommentVNode("", true),
                d3.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(u3.text), 1)
                ], 64))
              ], 2)
            ], 42, il))), 128))
          ], 2))), 128))
        ], 6),
        d3.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          "aria-label": ($ = unref(y3)) == null ? void 0 : $.toggleOverlay,
          class: normalizeClass(x3.value),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: Q3,
          onClick: H3,
          onKeydown: [
            withKeys(H3, ["enter"]),
            withKeys(H3, ["tab"])
          ]
        }, [
          renderSlot(d3.$slots, "button-icon")
        ], 42, dl)), [
          [vShow, !unref(g)(d3.hideNavigation, d3.type)]
        ]) : createCommentVNode("", true)
      ], 46, sl);
    };
  }
});
var Un = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean }
  },
  setup(e3) {
    const n = e3, a3 = computed(
      () => n.multiCalendars > 0 ? [...Array(n.multiCalendars).keys()] : [0]
    ), t3 = computed(() => ({
      dp__instance_calendar: n.multiCalendars > 0
    }));
    return (r, l) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !r.stretch,
        "dp--menu--inner-stretched": r.stretch,
        dp__flex_display: r.multiCalendars > 0
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(a3.value, (c3, y3) => (openBlock(), createElementBlock("div", {
        key: c3,
        class: normalizeClass(t3.value)
      }, [
        renderSlot(r.$slots, "default", {
          instance: c3,
          index: y3
        })
      ], 2))), 128))
    ], 2));
  }
});
var cl = ["aria-label", "aria-disabled"];
var St = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e3, { emit: n }) {
    const a3 = ref(null);
    return onMounted(() => n("set-ref", a3)), (t3, r) => (openBlock(), createElementBlock("button", {
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      onClick: r[0] || (r[0] = (l) => t3.$emit("activate")),
      onKeydown: [
        r[1] || (r[1] = withKeys(withModifiers((l) => t3.$emit("activate"), ["prevent"]), ["enter"])),
        r[2] || (r[2] = withKeys(withModifiers((l) => t3.$emit("activate"), ["prevent"]), ["space"]))
      ],
      tabindex: "0",
      "aria-label": t3.ariaLabel,
      "aria-disabled": t3.disabled || void 0,
      ref_key: "elRef",
      ref: a3
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: t3.disabled }])
      }, [
        renderSlot(t3.$slots, "default")
      ], 2)
    ], 40, cl));
  }
});
var Ln = (e3, n, a3) => {
  if (n.value && Array.isArray(n.value))
    if (n.value.some((t3) => ge(e3, t3))) {
      const t3 = n.value.filter((r) => !ge(r, e3));
      n.value = t3.length ? t3 : null;
    } else
      (a3 && +a3 > n.value.length || !a3) && n.value.push(e3);
  else
    n.value = [e3];
};
var Na = (e3, n, a3) => {
  let t3 = e3.value ? e3.value.slice() : [];
  return t3.length === 2 && t3[1] !== null && (t3 = []), t3.length ? Pe(n, t3[0]) ? (t3.unshift(n), a3("range-start", t3[0]), a3("range-start", t3[1])) : (t3[1] = n, a3("range-end", n)) : (t3 = [n], a3("range-start", n)), e3.value = t3, t3;
};
var Wn = (e3, n, a3, t3) => {
  e3[0] && e3[1] && a3 && n("auto-apply"), e3[0] && !e3[1] && t3 && a3 && n("auto-apply");
};
var fl = (e3, n) => {
  const { defaultedMultiCalendars: a3, defaultedAriaLabels: t3, defaultedTransitions: r, defaultedConfig: l } = Se(e3), { modelValue: c3, year: y3, month: D3, calendars: S3 } = Zt(e3, n), g = computed(() => Ma(e3.formatLocale, e3.locale, e3.monthNameFormat)), Y3 = computed(() => Vn(e3.yearRange, e3.reverseYears)), R3 = ref(null), G3 = () => {
    for (let f = 0; f < a3.value.count; f++)
      if (f === 0)
        S3.value[f] = S3.value[0];
      else {
        const k3 = set(P(), S3.value[f - 1]);
        S3.value[f] = { month: getMonth(k3), year: getYear(addYears(k3, f)) };
      }
  }, q3 = (f) => {
    if (!f)
      return G3();
    const k3 = set(P(), S3.value[f]);
    return S3.value[0].year = getYear(subYears(k3, a3.value.count - 1)), G3();
  }, J = (f) => e3.focusStartDate ? f[0] : f[1] ? f[1] : f[0], Q3 = () => {
    if (c3.value) {
      const f = Array.isArray(c3.value) ? J(c3.value) : c3.value;
      S3.value[0] = { month: getMonth(f), year: getYear(f) };
    }
  };
  onMounted(() => {
    Q3(), a3.value.count && G3();
  });
  const p = computed(() => (f, k3) => {
    const d3 = set(We(/* @__PURE__ */ new Date()), {
      month: D3.value(f),
      year: y3.value(f)
    });
    return Ca(d3, e3.maxDate, e3.minDate, e3.preventMinMaxNavigation, k3);
  }), M3 = (f) => f ? { month: getMonth(f), year: getYear(f) } : { month: null, year: null }, E3 = () => c3.value ? Array.isArray(c3.value) ? c3.value.map((f) => M3(f)) : M3(c3.value) : M3(), z3 = (f, k3) => {
    const d3 = S3.value[f], o = E3();
    return Array.isArray(o) ? o.some(($) => $.year === (d3 == null ? void 0 : d3.year) && $.month === k3) : (d3 == null ? void 0 : d3.year) === o.year && k3 === o.month;
  }, K3 = (f, k3, d3) => {
    var $, X3;
    const o = E3();
    return Array.isArray(o) ? y3.value(k3) === (($ = o[d3]) == null ? void 0 : $.year) && f === ((X3 = o[d3]) == null ? void 0 : X3.month) : false;
  }, _ = (f, k3) => {
    if (e3.range) {
      const d3 = E3();
      if (Array.isArray(c3.value) && Array.isArray(d3)) {
        const o = K3(f, k3, 0) || K3(f, k3, 1), $ = Je(We(P()), f, y3.value(k3));
        return Hn(c3.value, R3.value, $) && !o;
      }
      return false;
    }
    return false;
  }, re2 = computed(() => (f) => kt(g.value, (k3) => {
    const d3 = z3(f, k3.value), o = Rt(
      k3.value,
      Ta(y3.value(f), e3.minDate),
      Aa(y3.value(f), e3.maxDate)
    ) || Br(e3.disabledDates, y3.value(f)).includes(k3.value), $ = _(k3.value, f);
    return { active: d3, disabled: o, isBetween: $ };
  })), x3 = computed(() => (f) => kt(Y3.value, (k3) => {
    const d3 = y3.value(f) === k3.value, o = Rt(k3.value, wt(e3.minDate), wt(e3.maxDate));
    return { active: d3, disabled: o };
  })), L3 = (f, k3) => Je(We(P()), f, y3.value(k3)), h5 = (f, k3) => {
    const d3 = c3.value ? c3.value : We(/* @__PURE__ */ new Date());
    c3.value = Je(d3, f, y3.value(k3)), n("auto-apply");
  }, T3 = (f, k3) => {
    const d3 = Na(c3, L3(f, k3), n);
    Wn(d3, n, e3.autoApply, e3.modelAuto);
  }, H3 = (f, k3) => {
    Ln(L3(f, k3), c3, e3.multiDatesLimit), n("auto-apply", true);
  };
  return {
    groupedMonths: re2,
    groupedYears: x3,
    year: y3,
    isDisabled: p,
    defaultedMultiCalendars: a3,
    defaultedAriaLabels: t3,
    defaultedTransitions: r,
    defaultedConfig: l,
    setHoverDate: (f, k3) => {
      R3.value = L3(f, k3);
    },
    selectMonth: (f, k3) => (S3.value[k3].month = f, e3.multiDates ? H3(f, k3) : e3.range ? T3(f, k3) : h5(f, k3)),
    selectYear: (f, k3) => {
      S3.value[k3].year = f, a3.value.count && !a3.value.solo && q3(k3);
    }
  };
};
var vl = { class: "dp__month_picker_header" };
var ml = ["aria-label", "onClick", "onKeydown"];
var gl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...xe
  },
  emits: [
    "update:internal-model-value",
    "overlay-closed",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply"
  ],
  setup(e3, { emit: n }) {
    const a3 = e3, {
      groupedMonths: t3,
      groupedYears: r,
      year: l,
      isDisabled: c3,
      defaultedMultiCalendars: y3,
      defaultedAriaLabels: D3,
      defaultedTransitions: S3,
      defaultedConfig: g,
      setHoverDate: Y3,
      selectMonth: R3,
      selectYear: G3
    } = fl(a3, n), { transitionName: q3, showTransition: J } = Bt(S3), { showRightIcon: Q3, showLeftIcon: p } = qt(), M3 = ref([false]), E3 = (_, re2) => {
      G3(_, re2), K3(re2);
    }, z3 = (_, re2 = false) => {
      if (!c3.value(_, re2)) {
        const x3 = re2 ? l.value(_) + 1 : l.value(_) - 1;
        G3(x3, _);
      }
    }, K3 = (_, re2 = false, x3) => {
      re2 || n("reset-flow"), x3 !== void 0 ? M3.value[_] = x3 : M3.value[_] = !M3.value[_], M3.value || n("overlay-closed");
    };
    return (_, re2) => (openBlock(), createBlock(Un, {
      "multi-calendars": unref(y3).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: x3 }) => [
        _.$slots["month-year"] ? renderSlot(_.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
          year: unref(l),
          months: unref(t3)(x3),
          years: unref(r)(x3),
          selectMonth: unref(R3),
          selectYear: unref(G3),
          instance: x3
        }))) : (openBlock(), createBlock(Ot, {
          key: 1,
          items: unref(t3)(x3),
          "arrow-navigation": _.arrowNavigation,
          "is-last": _.autoApply && !_.keepActionRow && !unref(g).keepActionRow,
          "esc-close": _.escClose,
          height: _.modeHeight !== 255 ? _.modeHeight : unref(g).modeHeight,
          config: _.config,
          onSelected: (L3) => unref(R3)(L3, x3),
          onHoverValue: (L3) => unref(Y3)(L3, x3),
          "use-relative": "",
          type: "month"
        }, {
          header: withCtx(() => {
            var L3, h5, T3;
            return [
              createBaseVNode("div", vl, [
                unref(p)(unref(y3), x3) ? (openBlock(), createBlock(St, {
                  key: 0,
                  ref: "mpPrevIconRef",
                  "aria-label": (L3 = unref(D3)) == null ? void 0 : L3.prevYear,
                  disabled: unref(c3)(x3, false),
                  onActivate: (H3) => z3(x3, false)
                }, {
                  default: withCtx(() => [
                    _.$slots["arrow-left"] ? renderSlot(_.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                    _.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Rn), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createBaseVNode("div", {
                  class: "dp--year-select",
                  role: "button",
                  ref: "mpYearButtonRef",
                  "aria-label": (h5 = unref(D3)) == null ? void 0 : h5.openYearsOverlay,
                  tabindex: "0",
                  onClick: () => K3(x3, false),
                  onKeydown: withKeys(() => K3(x3, false), ["enter"])
                }, [
                  _.$slots.year ? renderSlot(_.$slots, "year", {
                    key: 0,
                    year: unref(l)(x3)
                  }) : createCommentVNode("", true),
                  _.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(l)(x3)), 1)
                  ], 64))
                ], 40, ml),
                unref(Q3)(unref(y3), x3) ? (openBlock(), createBlock(St, {
                  key: 1,
                  ref: "mpNextIconRef",
                  "aria-label": (T3 = unref(D3)) == null ? void 0 : T3.nextYear,
                  disabled: unref(c3)(x3, false),
                  onActivate: (H3) => z3(x3, true)
                }, {
                  default: withCtx(() => [
                    _.$slots["arrow-right"] ? renderSlot(_.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                    _.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(On), { key: 1 }))
                  ]),
                  _: 2
                }, 1032, ["aria-label", "disabled", "onActivate"])) : createCommentVNode("", true),
                createVNode(Transition, {
                  name: unref(q3)(M3.value[x3]),
                  css: unref(J)
                }, {
                  default: withCtx(() => [
                    M3.value[x3] ? (openBlock(), createBlock(Ot, {
                      key: 0,
                      items: unref(r)(x3),
                      "text-input": _.textInput,
                      "esc-close": _.escClose,
                      config: _.config,
                      onToggle: (H3) => K3(x3),
                      onSelected: (H3) => E3(H3, x3),
                      "is-last": _.autoApply && !_.keepActionRow && !unref(g).keepActionRow,
                      type: "year"
                    }, createSlots({
                      "button-icon": withCtx(() => [
                        _.$slots["calendar-icon"] ? renderSlot(_.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        _.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      _.$slots["year-overlay-value"] ? {
                        name: "item",
                        fn: withCtx(({ item: H3 }) => [
                          renderSlot(_.$slots, "year-overlay-value", {
                            text: H3.text,
                            value: H3.value
                          })
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1032, ["items", "text-input", "esc-close", "config", "onToggle", "onSelected", "is-last"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["name", "css"])
              ])
            ];
          }),
          _: 2
        }, 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "config", "onSelected", "onHoverValue"]))
      ]),
      _: 3
    }, 8, ["multi-calendars"]));
  }
});
var yl = (e3, n) => {
  const { modelValue: a3 } = Zt(e3, n), t3 = ref(null), r = (g) => Array.isArray(a3.value) ? a3.value.some((Y3) => getYear(Y3) === g) : a3.value ? getYear(a3.value) === g : false, l = (g) => e3.range && Array.isArray(a3.value) ? Hn(a3.value, t3.value, y3(g)) : false, c3 = computed(() => kt(Vn(e3.yearRange, e3.reverseYears), (g) => {
    const Y3 = r(g.value), R3 = Rt(g.value, wt(e3.minDate), wt(e3.maxDate)), G3 = l(g.value);
    return { active: Y3, disabled: R3, isBetween: G3 };
  })), y3 = (g) => setYear(We(/* @__PURE__ */ new Date()), g);
  return {
    groupedYears: c3,
    setHoverValue: (g) => {
      t3.value = setYear(We(/* @__PURE__ */ new Date()), g);
    },
    selectYear: (g) => {
      if (e3.multiDates)
        return Ln(y3(g), a3, e3.multiDatesLimit), n("auto-apply", true);
      if (e3.range) {
        const Y3 = Na(a3, y3(g), n);
        return Wn(Y3, n, e3.autoApply, e3.modelAuto);
      }
      a3.value = y3(g), n("auto-apply");
    }
  };
};
var hl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...xe
  },
  emits: ["update:internal-model-value", "reset-flow", "range-start", "range-end", "auto-apply"],
  setup(e3, { emit: n }) {
    const a3 = e3, { groupedYears: t3, selectYear: r, setHoverValue: l } = yl(a3, n), { defaultedConfig: c3 } = Se(a3);
    return (y3, D3) => (openBlock(), createElementBlock("div", null, [
      y3.$slots["month-year"] ? renderSlot(y3.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
        years: unref(t3),
        selectYear: unref(r)
      }))) : (openBlock(), createBlock(Ot, {
        key: 1,
        items: unref(t3),
        "is-last": y3.autoApply && !y3.keepActionRow && !unref(c3).keepActionRow,
        height: y3.modeHeight !== 255 ? y3.modeHeight : unref(c3).modeHeight,
        config: y3.config,
        type: "year",
        "use-relative": "",
        onSelected: unref(r),
        onHoverValue: unref(l)
      }, createSlots({ _: 2 }, [
        y3.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: S3 }) => [
            renderSlot(y3.$slots, "year-overlay-value", {
              text: S3.text,
              value: S3.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "onSelected", "onHoverValue"]))
    ]));
  }
});
var pl = {
  key: 0,
  class: "dp__time_input"
};
var bl = ["aria-label", "onKeydown", "onClick"];
var kl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var wl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var Dl = ["aria-label", "disabled", "onKeydown", "onClick"];
var Ml = ["aria-label", "onKeydown", "onClick"];
var $l = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var Tl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var Al = { key: 0 };
var Sl = ["aria-label", "onKeydown"];
var _l = defineComponent({
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
    ...xe
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, { setTimePickerElements: r, setTimePickerBackRef: l } = lt(), { defaultedAriaLabels: c3, defaultedTransitions: y3, defaultedFilters: D3, defaultedConfig: S3 } = Se(t3), { transitionName: g, showTransition: Y3 } = Bt(y3), R3 = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), G3 = ref("AM"), q3 = ref(null), J = ref([]);
    onMounted(() => {
      a3("mounted");
    });
    const Q3 = (u3) => set(/* @__PURE__ */ new Date(), {
      hours: u3.hours,
      minutes: u3.minutes,
      seconds: t3.enableSeconds ? u3.seconds : 0,
      milliseconds: 0
    }), p = computed(() => (u3) => T3(u3, t3[u3])), M3 = computed(() => ({ hours: t3.hours, minutes: t3.minutes, seconds: t3.seconds })), E3 = computed(() => (u3) => !ee(+t3[u3] + +t3[`${u3}Increment`], u3)), z3 = computed(() => (u3) => !ee(+t3[u3] - +t3[`${u3}Increment`], u3)), K3 = (u3, C) => add(set(P(), u3), C), _ = (u3, C) => sub(set(P(), u3), C), re2 = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !t3.timePickerInline,
        dp__time_col_reg_block: !t3.enableSeconds && t3.is24 && !t3.timePickerInline,
        dp__time_col_reg_inline: !t3.enableSeconds && t3.is24 && t3.timePickerInline,
        dp__time_col_reg_with_button: !t3.enableSeconds && !t3.is24,
        dp__time_col_sec: t3.enableSeconds && t3.is24,
        dp__time_col_sec_with_button: t3.enableSeconds && !t3.is24
      })
    ), x3 = computed(() => {
      const u3 = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t3.enableSeconds ? u3.concat([{ type: "", separator: true }, { type: "seconds" }]) : u3;
    }), L3 = computed(() => x3.value.filter((u3) => !u3.separator)), h5 = computed(() => (u3) => {
      if (u3 === "hours") {
        const C = d3(+t3.hours);
        return { text: C < 10 ? `0${C}` : `${C}`, value: C };
      }
      return { text: t3[u3] < 10 ? `0${t3[u3]}` : `${t3[u3]}`, value: t3[u3] };
    }), T3 = (u3, C) => {
      var A;
      if (!t3.disabledTimesConfig)
        return false;
      const O3 = t3.disabledTimesConfig(t3.order, u3 === "hours" ? C : void 0);
      return O3[u3] ? !!((A = O3[u3]) != null && A.includes(C)) : true;
    }, H3 = (u3) => {
      const C = t3.is24 ? 24 : 12, O3 = u3 === "hours" ? C : 60, A = +t3[`${u3}GridIncrement`], te = u3 === "hours" && !t3.is24 ? A : 0, B3 = [];
      for (let ie = te; ie < O3; ie += A)
        B3.push({ value: ie, text: ie < 10 ? `0${ie}` : `${ie}` });
      return u3 === "hours" && !t3.is24 && B3.push({ value: 0, text: "12" }), kt(B3, (ie) => ({ active: false, disabled: D3.value.times[u3].includes(ie.value) || !ee(ie.value, u3) || T3(u3, ie.value) }));
    }, ee = (u3, C) => {
      const O3 = t3.minTime ? Q3(fn(t3.minTime)) : null, A = t3.maxTime ? Q3(fn(t3.maxTime)) : null, te = Q3(fn(M3.value, C, u3));
      return O3 && A ? (isBefore(te, A) || isEqual(te, A)) && (isAfter(te, O3) || isEqual(te, O3)) : O3 ? isAfter(te, O3) || isEqual(te, O3) : A ? isBefore(te, A) || isEqual(te, A) : true;
    }, v = (u3) => t3[`no${u3[0].toUpperCase() + u3.slice(1)}Overlay`], I3 = (u3) => {
      v(u3) || (R3[u3] = !R3[u3], R3[u3] || a3("overlay-closed"));
    }, f = (u3) => u3 === "hours" ? getHours : u3 === "minutes" ? getMinutes : getSeconds, k3 = (u3, C = true) => {
      const O3 = C ? K3 : _, A = C ? +t3[`${u3}Increment`] : -+t3[`${u3}Increment`];
      ee(+t3[u3] + A, u3) && a3(
        `update:${u3}`,
        f(u3)(O3({ [u3]: +t3[u3] }, { [u3]: +t3[`${u3}Increment`] }))
      );
    }, d3 = (u3) => t3.is24 ? u3 : (u3 >= 12 ? G3.value = "PM" : G3.value = "AM", Ar(u3)), o = () => {
      G3.value === "PM" ? (G3.value = "AM", a3("update:hours", t3.hours - 12)) : (G3.value = "PM", a3("update:hours", t3.hours + 12)), a3("am-pm-change", G3.value);
    }, $ = (u3) => {
      R3[u3] = true;
    }, X3 = (u3, C, O3) => {
      if (u3 && t3.arrowNavigation) {
        Array.isArray(J.value[C]) ? J.value[C][O3] = u3 : J.value[C] = [u3];
        const A = J.value.reduce(
          (te, B3) => B3.map((ie, he) => [...te[he] || [], B3[he]]),
          []
        );
        l(t3.closeTimePickerBtn), q3.value && (A[1] = A[1].concat(q3.value)), r(A, t3.order);
      }
    }, s3 = (u3, C) => (I3(u3), u3 === "hours" && !t3.is24 ? a3(`update:${u3}`, G3.value === "PM" ? C + 12 : C) : a3(`update:${u3}`, C));
    return n({ openChildCmp: $ }), (u3, C) => {
      var O3;
      return u3.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", pl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(x3.value, (A, te) => {
          var B3, ie, he;
          return openBlock(), createElementBlock("div", {
            key: te,
            class: normalizeClass(re2.value)
          }, [
            A.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t3.timePickerInline,
                  dp__inc_dec_button_inline: t3.timePickerInline,
                  dp__tp_inline_btn_top: t3.timePickerInline,
                  dp__inc_dec_button_disabled: E3.value(A.type)
                }),
                "aria-label": (B3 = unref(c3)) == null ? void 0 : B3.incrementValue(A.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((me2) => k3(A.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((me2) => k3(A.type), ["prevent"]), ["space"])
                ],
                onClick: (me2) => k3(A.type),
                ref_for: true,
                ref: (me2) => X3(me2, te, 0)
              }, [
                t3.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  kl,
                  wl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  u3.$slots["arrow-up"] ? renderSlot(u3.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  u3.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Yn), { key: 1 }))
                ], 64))
              ], 42, bl),
              createBaseVNode("button", {
                type: "button",
                "aria-label": (ie = unref(c3)) == null ? void 0 : ie.openTpOverlay(A.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !t3.timePickerInline,
                  dp__time_display_inline: t3.timePickerInline,
                  "dp--time-invalid": p.value(A.type),
                  "dp--time-overlay-btn": !p.value(A.type)
                }),
                disabled: v(A.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((me2) => I3(A.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((me2) => I3(A.type), ["prevent"]), ["space"])
                ],
                onClick: (me2) => I3(A.type),
                ref_for: true,
                ref: (me2) => X3(me2, te, 1)
              }, [
                u3.$slots[A.type] ? renderSlot(u3.$slots, A.type, {
                  key: 0,
                  text: h5.value(A.type).text,
                  value: h5.value(A.type).value
                }) : createCommentVNode("", true),
                u3.$slots[A.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(h5.value(A.type).text), 1)
                ], 64))
              ], 42, Dl),
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t3.timePickerInline,
                  dp__inc_dec_button_inline: t3.timePickerInline,
                  dp__tp_inline_btn_bottom: t3.timePickerInline,
                  dp__inc_dec_button_disabled: z3.value(A.type)
                }),
                "aria-label": (he = unref(c3)) == null ? void 0 : he.decrementValue(A.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((me2) => k3(A.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((me2) => k3(A.type, false), ["prevent"]), ["space"])
                ],
                onClick: (me2) => k3(A.type, false),
                ref_for: true,
                ref: (me2) => X3(me2, te, 2)
              }, [
                t3.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  $l,
                  Tl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  u3.$slots["arrow-down"] ? renderSlot(u3.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  u3.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(In), { key: 1 }))
                ], 64))
              ], 42, Ml)
            ], 64))
          ], 2);
        }), 128)),
        u3.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Al, [
          u3.$slots["am-pm-button"] ? renderSlot(u3.$slots, "am-pm-button", {
            key: 0,
            toggle: o,
            value: G3.value
          }) : createCommentVNode("", true),
          u3.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: q3,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (O3 = unref(c3)) == null ? void 0 : O3.amPmButton,
            tabindex: "0",
            onClick: o,
            onKeydown: [
              withKeys(withModifiers(o, ["prevent"]), ["enter"]),
              withKeys(withModifiers(o, ["prevent"]), ["space"])
            ]
          }, toDisplayString(G3.value), 41, Sl))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(L3.value, (A, te) => (openBlock(), createBlock(Transition, {
          key: te,
          name: unref(g)(R3[A.type]),
          css: unref(Y3)
        }, {
          default: withCtx(() => [
            R3[A.type] ? (openBlock(), createBlock(Ot, {
              key: 0,
              items: H3(A.type),
              "is-last": u3.autoApply && !u3.keepActionRow && !unref(S3).keepActionRow,
              "esc-close": u3.escClose,
              type: A.type,
              "text-input": u3.textInput,
              config: u3.config,
              "arrow-navigation": u3.arrowNavigation,
              onSelected: (B3) => s3(A.type, B3),
              onToggle: (B3) => I3(A.type),
              onResetFlow: C[0] || (C[0] = (B3) => u3.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                u3.$slots["clock-icon"] ? renderSlot(u3.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                u3.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nn), { key: 1 }))
              ]),
              _: 2
            }, [
              u3.$slots[`${A.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: B3 }) => [
                  renderSlot(u3.$slots, `${A.type}-overlay-value`, {
                    text: B3.text,
                    value: B3.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "onSelected", "onToggle"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var Pl = ["aria-label"];
var Cl = ["tabindex"];
var Rl = ["aria-label"];
var Ya = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    ...xe
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, { buildMatrix: r, setTimePicker: l } = lt(), c3 = useSlots(), { defaultedTransitions: y3, defaultedAriaLabels: D3, defaultedTextInput: S3, defaultedConfig: g } = Se(t3), { transitionName: Y3, showTransition: R3 } = Bt(y3), { hideNavigationButtons: G3 } = qt(), q3 = ref(null), J = ref(null), Q3 = ref([]), p = ref(null);
    onMounted(() => {
      a3("mount"), !t3.timePicker && t3.arrowNavigation ? r([Ae(q3.value)], "time") : l(true, t3.timePicker);
    });
    const M3 = computed(() => t3.range && t3.modelAuto ? $a(t3.internalModelValue) : true), E3 = ref(false), z3 = (v) => ({
      hours: Array.isArray(t3.hours) ? t3.hours[v] : t3.hours,
      minutes: Array.isArray(t3.minutes) ? t3.minutes[v] : t3.minutes,
      seconds: Array.isArray(t3.seconds) ? t3.seconds[v] : t3.seconds
    }), K3 = computed(() => {
      const v = [];
      if (t3.range)
        for (let I3 = 0; I3 < 2; I3++)
          v.push(z3(I3));
      else
        v.push(z3(0));
      return v;
    }), _ = (v, I3 = false, f = "") => {
      I3 || a3("reset-flow"), E3.value = v, a3(v ? "overlay-opened" : "overlay-closed"), t3.arrowNavigation && l(v), nextTick(() => {
        f !== "" && Q3.value[0] && Q3.value[0].openChildCmp(f);
      });
    }, re2 = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: t3.autoApply && !t3.keepActionRow && !g.value.keepActionRow
    })), x3 = ze(c3, "timePicker"), L3 = (v, I3, f) => t3.range ? I3 === 0 ? [v, K3.value[1][f]] : [K3.value[0][f], v] : v, h5 = (v) => {
      a3("update:hours", v);
    }, T3 = (v) => {
      a3("update:minutes", v);
    }, H3 = (v) => {
      a3("update:seconds", v);
    }, ee = () => {
      if (p.value && !S3.value.enabled) {
        const v = _r(p.value);
        v && v.focus({ preventScroll: true });
      }
    };
    return n({ toggleTimePicker: _ }), (v, I3) => {
      var f;
      return openBlock(), createElementBlock("div", null, [
        !v.timePicker && !v.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: normalizeClass(re2.value),
          "aria-label": (f = unref(D3)) == null ? void 0 : f.openTimePicker,
          tabindex: "0",
          ref_key: "openTimePickerBtn",
          ref: q3,
          onKeydown: [
            I3[0] || (I3[0] = withKeys((k3) => _(true), ["enter"])),
            I3[1] || (I3[1] = withKeys((k3) => _(true), ["space"]))
          ],
          onClick: I3[2] || (I3[2] = (k3) => _(true))
        }, [
          v.$slots["clock-icon"] ? renderSlot(v.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          v.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Nn), { key: 1 }))
        ], 42, Pl)), [
          [vShow, !unref(G3)(v.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(Y3)(E3.value),
          css: unref(R3) && !v.timePickerInline
        }, {
          default: withCtx(() => {
            var k3;
            return [
              E3.value || v.timePicker || v.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass({
                  dp__overlay: !v.timePickerInline,
                  "dp--overlay-absolute": !t3.timePicker && !v.timePickerInline,
                  "dp--overlay-relative": t3.timePicker
                }),
                style: normalizeStyle(
                  v.timePicker ? { height: `${v.modeHeight !== 255 ? v.modeHeight : unref(g).modeHeight}px` } : void 0
                ),
                ref_key: "overlayRef",
                ref: p,
                tabindex: v.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    v.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  v.$slots["time-picker-overlay"] ? renderSlot(v.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e3.hours,
                    minutes: e3.minutes,
                    seconds: e3.seconds,
                    setHours: h5,
                    setMinutes: T3,
                    setSeconds: H3
                  }) : createCommentVNode("", true),
                  v.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(v.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(K3.value, (d3, o) => withDirectives((openBlock(), createBlock(_l, mergeProps({ key: o }, {
                      ...v.$props,
                      order: o,
                      hours: d3.hours,
                      minutes: d3.minutes,
                      seconds: d3.seconds,
                      closeTimePickerBtn: J.value,
                      disabledTimesConfig: e3.disabledTimesConfig,
                      disabled: o === 0 ? v.fixedStart : v.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: Q3,
                      "onUpdate:hours": ($) => h5(L3($, o, "hours")),
                      "onUpdate:minutes": ($) => T3(L3($, o, "minutes")),
                      "onUpdate:seconds": ($) => H3(L3($, o, "seconds")),
                      onMounted: ee,
                      onOverlayClosed: ee,
                      onAmPmChange: I3[3] || (I3[3] = ($) => v.$emit("am-pm-change", $))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(x3), ($, X3) => ({
                        name: $,
                        fn: withCtx((s3) => [
                          renderSlot(v.$slots, $, normalizeProps(guardReactiveProps(s3)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, o === 0 ? true : M3.value]
                    ])), 128))
                  ], 2)),
                  !v.timePicker && !v.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    type: "button",
                    ref_key: "closeTimePickerBtn",
                    ref: J,
                    class: normalizeClass(re2.value),
                    "aria-label": (k3 = unref(D3)) == null ? void 0 : k3.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      I3[4] || (I3[4] = withKeys((d3) => _(false), ["enter"])),
                      I3[5] || (I3[5] = withKeys((d3) => _(false), ["space"]))
                    ],
                    onClick: I3[6] || (I3[6] = (d3) => _(false))
                  }, [
                    v.$slots["calendar-icon"] ? renderSlot(v.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    v.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                  ], 42, Rl)), [
                    [vShow, !unref(G3)(v.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, Cl)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Ia = (e3, n, a3, t3) => {
  const r = (p, M3) => Array.isArray(n[p]) ? n[p][M3] : n[p], l = (p) => e3.enableSeconds ? Array.isArray(n.seconds) ? n.seconds[p] : n.seconds : 0, c3 = (p, M3) => p ? M3 !== void 0 ? nt(p, r("hours", M3), r("minutes", M3), l(M3)) : nt(p, n.hours, n.minutes, l()) : P(), y3 = (p, M3) => {
    n[p] = M3;
  }, D3 = (p, M3) => {
    const E3 = Object.fromEntries(
      Object.keys(n).map((z3) => z3 === p ? [z3, M3] : [z3, n[z3]].slice())
    );
    if (e3.range && !e3.disableTimeRangeValidation) {
      const z3 = (_) => a3.value ? nt(
        a3.value[_],
        E3.hours[_],
        E3.minutes[_],
        E3.seconds[_]
      ) : null, K3 = (_) => setMilliseconds(a3.value[_], 0);
      return !(ge(z3(0), z3(1)) && (isAfter(z3(0), K3(1)) || isBefore(z3(1), K3(0))));
    }
    return true;
  }, S3 = (p, M3) => {
    D3(p, M3) && (y3(p, M3), t3 && t3());
  }, g = (p) => {
    S3("hours", p);
  }, Y3 = (p) => {
    S3("minutes", p);
  }, R3 = (p) => {
    S3("seconds", p);
  }, G3 = (p, M3, E3, z3) => {
    M3 && g(p), !M3 && !E3 && Y3(p), E3 && R3(p), a3.value && z3(a3.value);
  }, q3 = (p) => {
    if (p) {
      const M3 = Array.isArray(p), E3 = M3 ? [+p[0].hours, +p[1].hours] : +p.hours, z3 = M3 ? [+p[0].minutes, +p[1].minutes] : +p.minutes, K3 = M3 ? [+p[0].seconds, +p[1].seconds] : +p.seconds;
      y3("hours", E3), y3("minutes", z3), e3.enableSeconds && y3("seconds", K3);
    }
  }, J = (p, M3) => {
    const E3 = {
      hours: Array.isArray(n.hours) ? n.hours[p] : n.hours,
      disabledArr: []
    };
    return (M3 || M3 === 0) && (E3.hours = M3), Array.isArray(e3.disabledTimes) && (E3.disabledArr = e3.range && Array.isArray(e3.disabledTimes[p]) ? e3.disabledTimes[p] : e3.disabledTimes), E3;
  }, Q3 = computed(() => (p, M3) => {
    var E3;
    if (Array.isArray(e3.disabledTimes)) {
      const { disabledArr: z3, hours: K3 } = J(p, M3), _ = z3.filter((re2) => +re2.hours === K3);
      return ((E3 = _[0]) == null ? void 0 : E3.minutes) === "*" ? { hours: [K3], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (_ == null ? void 0 : _.map((re2) => +re2.minutes)) ?? [],
        seconds: (_ == null ? void 0 : _.map((re2) => re2.seconds ? +re2.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: y3,
    updateHours: g,
    updateMinutes: Y3,
    updateSeconds: R3,
    getSetDateTime: c3,
    updateTimeValues: G3,
    getSecondsValue: l,
    assignStartTime: q3,
    disabledTimesConfig: Q3
  };
};
var Ol = (e3, n) => {
  const { modelValue: a3, time: t3 } = Zt(e3, n), { defaultedStartTime: r } = Se(e3), { updateTimeValues: l, getSetDateTime: c3, setTime: y3, assignStartTime: D3, disabledTimesConfig: S3 } = Ia(
    e3,
    t3,
    a3
  ), g = (M3) => {
    const { hours: E3, minutes: z3, seconds: K3 } = M3;
    return { hours: +E3, minutes: +z3, seconds: K3 ? +K3 : 0 };
  }, Y3 = () => {
    if (e3.startTime) {
      if (Array.isArray(e3.startTime)) {
        const E3 = g(e3.startTime[0]), z3 = g(e3.startTime[1]);
        return [set(P(), E3), set(P(), z3)];
      }
      const M3 = g(e3.startTime);
      return set(P(), M3);
    }
    return e3.range ? [null, null] : null;
  }, R3 = () => {
    if (e3.range) {
      const [M3, E3] = Y3();
      a3.value = [c3(M3, 0), c3(E3, 1)];
    } else
      a3.value = c3(Y3());
  }, G3 = (M3) => Array.isArray(M3) ? [vt(P(M3[0])), vt(P(M3[1]))] : [vt(M3 ?? P())], q3 = (M3, E3, z3) => {
    y3("hours", M3), y3("minutes", E3), e3.enableSeconds && y3("seconds", z3);
  }, J = () => {
    const [M3, E3] = G3(a3.value);
    return e3.range ? q3(
      [M3.hours, E3.hours],
      [M3.minutes, E3.minutes],
      [M3.seconds, E3.minutes]
    ) : q3(M3.hours, M3.minutes, M3.seconds);
  };
  onMounted(() => {
    if (!e3.shadow)
      return D3(r.value), a3.value ? J() : R3();
  });
  const Q3 = () => {
    Array.isArray(a3.value) ? a3.value = a3.value.map((M3, E3) => M3 && c3(M3, E3)) : a3.value = c3(a3.value), n("time-update");
  };
  return {
    time: t3,
    disabledTimesConfig: S3,
    updateTime: (M3, E3 = true, z3 = false) => {
      l(M3, E3, z3, Q3);
    }
  };
};
var Nl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...xe
  },
  emits: ["update:internal-model-value", "time-update", "am-pm-change"],
  setup(e3, { emit: n }) {
    const a3 = e3, t3 = useSlots(), r = ze(t3, "timePicker"), { time: l, disabledTimesConfig: c3, updateTime: y3 } = Ol(a3, n);
    return (D3, S3) => (openBlock(), createBlock(Un, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Ya, mergeProps(D3.$props, {
          hours: unref(l).hours,
          minutes: unref(l).minutes,
          seconds: unref(l).seconds,
          "internal-model-value": D3.internalModelValue,
          "disabled-times-config": unref(c3),
          "onUpdate:hours": S3[0] || (S3[0] = (g) => unref(y3)(g)),
          "onUpdate:minutes": S3[1] || (S3[1] = (g) => unref(y3)(g, false)),
          "onUpdate:seconds": S3[2] || (S3[2] = (g) => unref(y3)(g, false, true)),
          onAmPmChange: S3[3] || (S3[3] = (g) => D3.$emit("am-pm-change", g))
        }), createSlots({ _: 2 }, [
          renderList(unref(r), (g, Y3) => ({
            name: g,
            fn: withCtx((R3) => [
              renderSlot(D3.$slots, g, normalizeProps(guardReactiveProps(R3)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config"])
      ]),
      _: 3
    }));
  }
});
var Yl = { class: "dp__month_year_row" };
var Il = ["aria-label", "onClick", "onKeydown"];
var Bl = defineComponent({
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
    ...xe
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed"],
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, { defaultedTransitions: r, defaultedAriaLabels: l, defaultedMultiCalendars: c3, defaultedFilters: y3, defaultedConfig: D3 } = Se(t3), { transitionName: S3, showTransition: g } = Bt(r), { buildMatrix: Y3 } = lt(), { handleMonthYearChange: R3, isDisabled: G3, updateMonthYear: q3 } = Gr(t3, a3), { showLeftIcon: J, showRightIcon: Q3 } = qt(), p = ref(false), M3 = ref(false), E3 = ref([null, null, null, null]);
    onMounted(() => {
      a3("mount");
    });
    const z3 = (d3) => ({
      get: () => t3[d3],
      set: (o) => {
        const $ = d3 === Le.month ? Le.year : Le.month;
        a3("update-month-year", { [d3]: o, [$]: t3[$] }), d3 === Le.month ? H3(true) : ee(true);
      }
    }), K3 = computed(z3(Le.month)), _ = computed(z3(Le.year)), re2 = computed(() => (d3) => ({
      month: t3.month,
      year: t3.year,
      items: d3 === Le.month ? t3.months : t3.years,
      instance: t3.instance,
      updateMonthYear: q3,
      toggle: d3 === Le.month ? H3 : ee
    })), x3 = computed(() => {
      const d3 = t3.months.find((o) => o.value === t3.month);
      return d3 || { text: "", value: 0 };
    }), L3 = computed(() => kt(t3.months, (d3) => {
      const o = t3.month === d3.value, $ = Rt(
        d3.value,
        Ta(t3.year, t3.minDate),
        Aa(t3.year, t3.maxDate)
      ) || y3.value.months.includes(d3.value);
      return { active: o, disabled: $ };
    })), h5 = computed(() => kt(t3.years, (d3) => {
      const o = t3.year === d3.value, $ = Rt(d3.value, wt(t3.minDate), wt(t3.maxDate)) || y3.value.years.includes(d3.value);
      return { active: o, disabled: $ };
    })), T3 = (d3, o) => {
      o !== void 0 ? d3.value = o : d3.value = !d3.value, d3.value || a3("overlay-closed");
    }, H3 = (d3 = false, o) => {
      v(d3), T3(p, o);
    }, ee = (d3 = false, o) => {
      v(d3), T3(M3, o);
    }, v = (d3) => {
      d3 || a3("reset-flow");
    }, I3 = (d3, o) => {
      t3.arrowNavigation && (E3.value[o] = Ae(d3), Y3(E3.value, "monthYear"));
    }, f = computed(() => {
      var d3, o;
      return [
        {
          type: Le.month,
          index: 1,
          toggle: H3,
          modelValue: K3.value,
          updateModelValue: ($) => K3.value = $,
          text: x3.value.text,
          showSelectionGrid: p.value,
          items: L3.value,
          ariaLabel: (d3 = l.value) == null ? void 0 : d3.openMonthsOverlay
        },
        {
          type: Le.year,
          index: 2,
          toggle: ee,
          modelValue: _.value,
          updateModelValue: ($) => _.value = $,
          text: t3.year,
          showSelectionGrid: M3.value,
          items: h5.value,
          ariaLabel: (o = l.value) == null ? void 0 : o.openYearsOverlay
        }
      ];
    }), k3 = computed(
      () => t3.disableYearSelect ? [f.value[0]] : f.value
    );
    return n({
      toggleMonthPicker: H3,
      toggleYearPicker: ee,
      handleMonthYearChange: R3
    }), (d3, o) => {
      var $, X3, s3;
      return openBlock(), createElementBlock("div", Yl, [
        d3.$slots["month-year"] ? renderSlot(d3.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e3.month, year: e3.year, months: e3.months, years: e3.years, updateMonthYear: unref(q3), handleMonthYearChange: unref(R3), instance: e3.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(J)(unref(c3), e3.instance) && !d3.vertical ? (openBlock(), createBlock(St, {
            key: 0,
            "aria-label": ($ = unref(l)) == null ? void 0 : $.prevMonth,
            disabled: unref(G3)(false),
            onActivate: o[0] || (o[0] = (u3) => unref(R3)(false, true)),
            onSetRef: o[1] || (o[1] = (u3) => I3(u3, 0))
          }, {
            default: withCtx(() => [
              d3.$slots["arrow-left"] ? renderSlot(d3.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              d3.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Rn), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["dp__month_year_wrap", {
              dp__year_disable_select: d3.disableYearSelect
            }])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(k3.value, (u3, C) => (openBlock(), createElementBlock(Fragment, {
              key: u3.type
            }, [
              createBaseVNode("button", {
                type: "button",
                class: "dp__btn dp__month_year_select",
                tabindex: "0",
                "aria-label": u3.ariaLabel,
                ref_for: true,
                ref: (O3) => I3(O3, C + 1),
                onClick: u3.toggle,
                onKeydown: [
                  withKeys(withModifiers(u3.toggle, ["prevent"]), ["enter"]),
                  withKeys(withModifiers(u3.toggle, ["prevent"]), ["space"])
                ]
              }, [
                d3.$slots[u3.type] ? renderSlot(d3.$slots, u3.type, {
                  key: 0,
                  text: u3.text,
                  value: t3[u3.type]
                }) : createCommentVNode("", true),
                d3.$slots[u3.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(u3.text), 1)
                ], 64))
              ], 40, Il),
              createVNode(Transition, {
                name: unref(S3)(u3.showSelectionGrid),
                css: unref(g)
              }, {
                default: withCtx(() => [
                  u3.showSelectionGrid ? (openBlock(), createBlock(Ot, {
                    key: 0,
                    items: u3.items,
                    "arrow-navigation": d3.arrowNavigation,
                    "hide-navigation": d3.hideNavigation,
                    "is-last": d3.autoApply && !d3.keepActionRow && !unref(D3).keepActionRow,
                    "skip-button-ref": false,
                    config: d3.config,
                    type: u3.type,
                    "header-refs": [],
                    "esc-close": d3.escClose,
                    "text-input": d3.textInput,
                    onSelected: u3.updateModelValue,
                    onToggle: u3.toggle
                  }, createSlots({
                    "button-icon": withCtx(() => [
                      d3.$slots["calendar-icon"] ? renderSlot(d3.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                      d3.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(It), { key: 1 }))
                    ]),
                    _: 2
                  }, [
                    d3.$slots[`${u3.type}-overlay-val`] ? {
                      name: "item",
                      fn: withCtx(({ item: O3 }) => [
                        renderSlot(d3.$slots, `${u3.type}-overlay-val`, {
                          text: O3.text,
                          value: O3.value
                        })
                      ]),
                      key: "0"
                    } : void 0,
                    d3.$slots[`${u3.type}-overlay`] ? {
                      name: "overlay",
                      fn: withCtx(() => [
                        renderSlot(d3.$slots, `${u3.type}-overlay`, normalizeProps(guardReactiveProps(re2.value(u3.type))))
                      ]),
                      key: "1"
                    } : void 0,
                    d3.$slots[`${u3.type}-overlay-header`] ? {
                      name: "header",
                      fn: withCtx(() => [
                        renderSlot(d3.$slots, `${u3.type}-overlay-header`, {
                          toggle: u3.toggle
                        })
                      ]),
                      key: "2"
                    } : void 0
                  ]), 1032, ["items", "arrow-navigation", "hide-navigation", "is-last", "config", "type", "esc-close", "text-input", "onSelected", "onToggle"])) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["name", "css"])
            ], 64))), 128))
          ], 2),
          unref(J)(unref(c3), e3.instance) && d3.vertical ? (openBlock(), createBlock(St, {
            key: 1,
            "aria-label": (X3 = unref(l)) == null ? void 0 : X3.prevMonth,
            disabled: unref(G3)(false),
            onActivate: o[2] || (o[2] = (u3) => unref(R3)(false, true))
          }, {
            default: withCtx(() => [
              d3.$slots["arrow-up"] ? renderSlot(d3.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
              d3.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Yn), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          unref(Q3)(unref(c3), e3.instance) ? (openBlock(), createBlock(St, {
            key: 2,
            ref: "rightIcon",
            disabled: unref(G3)(true),
            "aria-label": (s3 = unref(l)) == null ? void 0 : s3.nextMonth,
            onActivate: o[3] || (o[3] = (u3) => unref(R3)(true, true)),
            onSetRef: o[4] || (o[4] = (u3) => I3(u3, d3.disableYearSelect ? 2 : 3))
          }, {
            default: withCtx(() => [
              d3.$slots[d3.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(d3.$slots, d3.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
              d3.$slots[d3.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(d3.vertical ? unref(In) : unref(On)), { key: 1 }))
            ]),
            _: 3
          }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
});
var El = ["aria-label"];
var Fl = {
  class: "dp__calendar_header",
  role: "row"
};
var Vl = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Hl = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Ul = ["aria-label"];
var Ll = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var Wl = { class: "dp__cell_inner" };
var zl = ["aria-selected", "aria-disabled", "aria-label", "onClick", "onKeydown", "onMouseenter", "onMouseleave"];
var jl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...xe
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
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, { buildMultiLevelMatrix: r } = lt(), { defaultedTransitions: l, defaultedConfig: c3, defaultedAriaLabels: y3, defaultedMultiCalendars: D3 } = Se(t3), S3 = ref(null), g = ref({
      bottom: "",
      left: "",
      transform: ""
    }), Y3 = ref([]), R3 = ref(null), G3 = ref(true), q3 = ref(""), J = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), Q3 = ref([]), p = ref({ left: "50%" }), M3 = computed(() => t3.calendar ? t3.calendar(t3.mappedDates) : t3.mappedDates), E3 = computed(() => t3.dayNames ? Array.isArray(t3.dayNames) ? t3.dayNames : t3.dayNames(t3.locale, +t3.weekStart) : Tr(t3.formatLocale, t3.locale, +t3.weekStart));
    onMounted(() => {
      a3("mount", { cmp: "calendar", refs: Y3 }), !t3.noSwipe && !c3.value.noSwipe && R3.value && (R3.value.addEventListener("touchstart", ee, { passive: false }), R3.value.addEventListener("touchend", v, { passive: false }), R3.value.addEventListener("touchmove", I3, { passive: false })), t3.monthChangeOnScroll && R3.value && R3.value.addEventListener("wheel", d3, { passive: false });
    });
    const z3 = (s3) => s3 ? t3.vertical ? "vNext" : "next" : t3.vertical ? "vPrevious" : "previous", K3 = (s3, u3) => {
      if (t3.transitions) {
        const C = He(Je(P(), t3.month, t3.year));
        q3.value = Re(He(Je(P(), s3, u3)), C) ? l.value[z3(true)] : l.value[z3(false)], G3.value = false, nextTick(() => {
          G3.value = true;
        });
      }
    }, _ = computed(
      () => ({
        [t3.calendarClassName]: !!t3.calendarClassName
      })
    ), re2 = computed(() => (s3) => {
      const u3 = Sr(s3);
      return {
        dp__marker_dot: u3.type === "dot",
        dp__marker_line: u3.type === "line"
      };
    }), x3 = computed(() => (s3) => ge(s3, S3.value)), L3 = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: D3.value.count > 0 && t3.instance !== 0
    })), h5 = computed(() => (s3) => t3.hideOffsetDates ? s3.current : true), T3 = async (s3, u3, C) => {
      var O3, A;
      if (a3("set-hover-date", s3), (A = (O3 = s3.marker) == null ? void 0 : O3.tooltip) != null && A.length) {
        const te = Ae(Y3.value[u3][C]);
        if (te) {
          const { width: B3, height: ie } = te.getBoundingClientRect();
          S3.value = s3.value;
          let he = { left: `${B3 / 2}px` }, me2 = -50;
          if (await nextTick(), Q3.value[0]) {
            const { left: N, width: j } = Q3.value[0].getBoundingClientRect();
            N < 0 && (he = { left: "0" }, me2 = 0, p.value.left = `${B3 / 2}px`), window.innerWidth < N + j && (he = { right: "0" }, me2 = 0, p.value.left = `${j - B3 / 2}px`);
          }
          g.value = {
            bottom: `${ie}px`,
            ...he,
            transform: `translateX(${me2}%)`
          }, a3("tooltip-open", s3.marker);
        }
      }
    }, H3 = (s3) => {
      S3.value && (S3.value = null, g.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a3("tooltip-close", s3.marker));
    }, ee = (s3) => {
      J.value.startX = s3.changedTouches[0].screenX, J.value.startY = s3.changedTouches[0].screenY;
    }, v = (s3) => {
      J.value.endX = s3.changedTouches[0].screenX, J.value.endY = s3.changedTouches[0].screenY, f();
    }, I3 = (s3) => {
      t3.vertical && !t3.inline && s3.preventDefault();
    }, f = () => {
      const s3 = t3.vertical ? "Y" : "X";
      Math.abs(J.value[`start${s3}`] - J.value[`end${s3}`]) > 10 && a3("handle-swipe", J.value[`start${s3}`] > J.value[`end${s3}`] ? "right" : "left");
    }, k3 = (s3, u3, C) => {
      s3 && (Array.isArray(Y3.value[u3]) ? Y3.value[u3][C] = s3 : Y3.value[u3] = [s3]), t3.arrowNavigation && r(Y3.value, "calendar");
    }, d3 = (s3) => {
      t3.monthChangeOnScroll && (s3.preventDefault(), a3("handle-scroll", s3));
    }, o = (s3) => {
      const u3 = s3[0];
      return t3.weekNumbers === "local" ? getWeek(u3.value, { weekStartsOn: +t3.weekStart }) : t3.weekNumbers === "iso" ? getISOWeek(u3.value) : typeof t3.weekNumbers == "function" ? t3.weekNumbers(u3.value) : "";
    }, $ = (s3, u3) => {
      tt(s3, c3.value), a3("select-date", u3);
    }, X3 = (s3) => {
      tt(s3, c3.value);
    };
    return n({ triggerTransition: K3 }), (s3, u3) => {
      var C;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(L3.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: R3,
          role: "grid",
          class: normalizeClass(_.value),
          "aria-label": (C = unref(y3)) == null ? void 0 : C.calendarWrap
        }, [
          (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", Fl, [
              s3.weekNumbers ? (openBlock(), createElementBlock("div", Vl, toDisplayString(s3.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(E3.value, (O3, A) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: A
              }, [
                s3.$slots["calendar-header"] ? renderSlot(s3.$slots, "calendar-header", {
                  key: 0,
                  day: O3,
                  index: A
                }) : createCommentVNode("", true),
                s3.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(O3), 1)
                ], 64))
              ]))), 128))
            ]),
            Hl,
            createVNode(Transition, {
              name: q3.value,
              css: !!s3.transitions
            }, {
              default: withCtx(() => {
                var O3;
                return [
                  G3.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": ((O3 = unref(y3)) == null ? void 0 : O3.calendarDays) || void 0
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(M3.value, (A, te) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: te
                    }, [
                      s3.weekNumbers ? (openBlock(), createElementBlock("div", Ll, [
                        createBaseVNode("div", Wl, toDisplayString(o(A.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(A.days, (B3, ie) => {
                        var he, me2, N;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (j) => k3(j, te, ie),
                          key: ie + te,
                          "aria-selected": B3.classData.dp__active_date || B3.classData.dp__range_start || B3.classData.dp__range_start,
                          "aria-disabled": B3.classData.dp__cell_disabled || void 0,
                          "aria-label": (me2 = (he = unref(y3)) == null ? void 0 : he.day) == null ? void 0 : me2.call(he, B3),
                          tabindex: "0",
                          onClick: withModifiers((j) => $(j, B3), ["prevent"]),
                          onKeydown: [
                            withKeys((j) => s3.$emit("select-date", B3), ["enter"]),
                            withKeys((j) => s3.$emit("handle-space", B3), ["space"])
                          ],
                          onMouseenter: (j) => T3(B3, te, ie),
                          onMouseleave: (j) => H3(B3)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", B3.classData])
                          }, [
                            s3.$slots.day && h5.value(B3) ? renderSlot(s3.$slots, "day", {
                              key: 0,
                              day: +B3.text,
                              date: B3.value
                            }) : createCommentVNode("", true),
                            s3.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(B3.text), 1)
                            ], 64)),
                            B3.marker && h5.value(B3) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              s3.$slots.marker ? renderSlot(s3.$slots, "marker", {
                                key: 0,
                                marker: B3.marker,
                                day: +B3.text,
                                date: B3.value
                              }) : (openBlock(), createElementBlock("div", {
                                key: 1,
                                class: normalizeClass(re2.value(B3.marker)),
                                style: normalizeStyle(B3.marker.color ? { backgroundColor: B3.marker.color } : {})
                              }, null, 6))
                            ], 64)) : createCommentVNode("", true),
                            x3.value(B3.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: Q3,
                              style: normalizeStyle(g.value)
                            }, [
                              (N = B3.marker) != null && N.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: X3
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(B3.marker.tooltip, (j, De2) => (openBlock(), createElementBlock("div", {
                                  key: De2,
                                  class: "dp__tooltip_text"
                                }, [
                                  s3.$slots["marker-tooltip"] ? renderSlot(s3.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: j,
                                    day: B3.value
                                  }) : createCommentVNode("", true),
                                  s3.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(j.color ? { backgroundColor: j.color } : {})
                                    }, null, 4),
                                    createBaseVNode("div", null, toDisplayString(j.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createBaseVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(p.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, zl);
                      }), 128))
                    ]))), 128))
                  ], 8, Ul)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 64))
        ], 10, El)
      ], 2);
    };
  }
});
var ia = (e3) => Array.isArray(e3);
var Kl = (e3, n, a3, t3) => {
  const r = ref([]), { modelValue: l, calendars: c3, time: y3 } = Zt(e3, n), { defaultedMultiCalendars: D3, defaultedStartTime: S3 } = Se(e3), { validateMonthYearInRange: g, isDisabled: Y3, isDateRangeAllowed: R3, checkMinMaxRange: G3 } = Et(e3), { updateTimeValues: q3, getSetDateTime: J, setTime: Q3, assignStartTime: p, disabledTimesConfig: M3 } = Ia(
    e3,
    y3,
    l,
    t3
  ), E3 = computed(
    () => (i3) => c3.value[i3] ? c3.value[i3].month : 0
  ), z3 = computed(
    () => (i3) => c3.value[i3] ? c3.value[i3].year : 0
  ), K3 = (i3, w3, U) => {
    var se2, be2;
    c3.value[i3] || (c3.value[i3] = { month: 0, year: 0 }), c3.value[i3].month = aa(w3) ? (se2 = c3.value[i3]) == null ? void 0 : se2.month : w3, c3.value[i3].year = aa(U) ? (be2 = c3.value[i3]) == null ? void 0 : be2.year : U;
  }, _ = () => {
    e3.autoApply && n("select-date");
  };
  watch(l, (i3, w3) => {
    JSON.stringify(i3) !== JSON.stringify(w3) && L3();
  }), onMounted(() => {
    e3.shadow || (l.value || (o(), S3.value && p(S3.value)), L3(true), e3.focusStartDate && e3.startDate && o());
  });
  const re2 = computed(() => {
    var i3;
    return (i3 = e3.flow) != null && i3.length && !e3.partialFlow ? e3.flowStep === e3.flow.length : true;
  }), x3 = () => {
    e3.autoApply && re2.value && n("auto-apply", e3.partialFlow);
  }, L3 = (i3 = false) => {
    if (l.value)
      return Array.isArray(l.value) ? (r.value = l.value, I3(i3)) : T3(l.value, i3);
    if (D3.value.count && i3 && !e3.startDate)
      return h5(P(), i3);
  }, h5 = (i3, w3 = false) => {
    if ((!D3.value.count || !D3.value.static || w3) && K3(0, getMonth(i3), getYear(i3)), D3.value.count)
      for (let U = 1; U < D3.value.count; U++) {
        const se2 = set(P(), { month: E3.value(U - 1), year: z3.value(U - 1) }), be2 = add(se2, { months: 1 });
        c3.value[U] = { month: getMonth(be2), year: getYear(be2) };
      }
  }, T3 = (i3, w3) => {
    h5(i3), Q3("hours", getHours(i3)), Q3("minutes", getMinutes(i3)), Q3("seconds", getSeconds(i3)), D3.value.count && w3 && d3();
  }, H3 = (i3) => {
    if (D3.value.count) {
      if (D3.value.solo)
        return 0;
      const w3 = getMonth(i3[0]), U = getMonth(i3[1]);
      return Math.abs(U - w3) < D3.value.count ? 0 : 1;
    }
    return 1;
  }, ee = (i3, w3) => {
    i3[1] && e3.showLastInRange ? h5(i3[H3(i3)], w3) : h5(i3[0], w3);
    const U = (se2, be2) => [
      se2(i3[0]),
      i3[1] ? se2(i3[1]) : y3[be2][1]
    ];
    Q3("hours", U(getHours, "hours")), Q3("minutes", U(getMinutes, "minutes")), Q3("seconds", U(getSeconds, "seconds"));
  }, v = (i3, w3) => {
    if ((e3.range || e3.weekPicker) && !e3.multiDates)
      return ee(i3, w3);
    if (e3.multiDates && w3) {
      const U = i3[i3.length - 1];
      return T3(U, w3);
    }
  }, I3 = (i3) => {
    const w3 = l.value;
    v(w3, i3), D3.value.count && D3.value.solo && d3();
  }, f = (i3, w3) => {
    const U = set(P(), { month: E3.value(w3), year: z3.value(w3) }), se2 = i3 < 0 ? addMonths(U, 1) : subMonths(U, 1);
    g(getMonth(se2), getYear(se2), i3 < 0, e3.preventMinMaxNavigation) && (K3(w3, getMonth(se2), getYear(se2)), D3.value.count && !D3.value.solo && k3(w3), a3());
  }, k3 = (i3) => {
    for (let w3 = i3 - 1; w3 >= 0; w3--) {
      const U = subMonths(set(P(), { month: E3.value(w3 + 1), year: z3.value(w3 + 1) }), 1);
      K3(w3, getMonth(U), getYear(U));
    }
    for (let w3 = i3 + 1; w3 <= D3.value.count - 1; w3++) {
      const U = addMonths(set(P(), { month: E3.value(w3 - 1), year: z3.value(w3 - 1) }), 1);
      K3(w3, getMonth(U), getYear(U));
    }
  }, d3 = () => {
    if (Array.isArray(l.value) && l.value.length === 2) {
      const i3 = P(
        P(l.value[1] ? l.value[1] : addMonths(l.value[0], 1))
      ), [w3, U] = [getMonth(l.value[0]), getYear(l.value[0])], [se2, be2] = [getMonth(l.value[1]), getYear(l.value[1])];
      (w3 !== se2 || w3 === se2 && U !== be2) && D3.value.solo && K3(1, getMonth(i3), getYear(i3));
    } else
      l.value && !Array.isArray(l.value) && (K3(0, getMonth(l.value), getYear(l.value)), h5(P()));
  }, o = () => {
    e3.startDate && (K3(0, getMonth(P(e3.startDate)), getYear(P(e3.startDate))), D3.value.count && k3(0));
  }, $ = (i3, w3) => {
    e3.monthChangeOnScroll && f(e3.monthChangeOnScroll !== "inverse" ? -i3.deltaY : i3.deltaY, w3);
  }, X3 = (i3, w3, U = false) => {
    e3.monthChangeOnArrows && e3.vertical === U && s3(i3, w3);
  }, s3 = (i3, w3) => {
    f(i3 === "right" ? -1 : 1, w3);
  }, u3 = (i3) => e3.markers.find((w3) => ge(la(i3.value), la(w3.date))), C = (i3, w3) => {
    switch (e3.sixWeeks === true ? "append" : e3.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [i3 == 0, true];
      case "fair":
        return [i3 == 0 || w3 > i3, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, O3 = (i3, w3, U, se2) => {
    if (e3.sixWeeks && i3.length < 6) {
      const be2 = 6 - i3.length, Qe2 = (w3.getDay() + 7 - se2) % 7, Ft2 = 6 - (U.getDay() + 7 - se2) % 7, [Tt2, ln] = C(Qe2, Ft2);
      for (let ot2 = 1; ot2 <= be2; ot2++)
        if (ln ? !!(ot2 % 2) == Tt2 : Tt2) {
          const Vt2 = i3[0].days[0], on = A(addDays(Vt2.value, -7), getMonth(w3));
          i3.unshift({ days: on });
        } else {
          const Vt2 = i3[i3.length - 1], on = Vt2.days[Vt2.days.length - 1], Ea2 = A(addDays(on.value, 1), getMonth(w3));
          i3.push({ days: Ea2 });
        }
    }
    return i3;
  }, A = (i3, w3) => {
    const U = P(i3), se2 = [];
    for (let be2 = 0; be2 < 7; be2++) {
      const Qe2 = addDays(U, be2), $t2 = getMonth(Qe2) !== w3;
      se2.push({
        text: e3.hideOffsetDates && $t2 ? "" : Qe2.getDate(),
        value: Qe2,
        current: !$t2,
        classData: {}
      });
    }
    return se2;
  }, te = (i3, w3) => {
    const U = [], se2 = P(Ge(new Date(w3, i3), e3.timezone)), be2 = P(Ge(new Date(w3, i3 + 1, 0), e3.timezone)), Qe2 = e3.weekStart, $t2 = startOfWeek(se2, { weekStartsOn: Qe2 }), Ft2 = (Tt2) => {
      const ln = A(Tt2, i3);
      if (U.push({ days: ln }), !U[U.length - 1].days.some(
        (ot2) => ge(He(ot2.value), He(be2))
      )) {
        const ot2 = addDays(Tt2, 7);
        Ft2(ot2);
      }
    };
    return Ft2($t2), O3(U, se2, be2, Qe2);
  }, B3 = (i3) => (l.value = jt(P(i3.value), e3.timezone, e3.weekStart), x3()), ie = (i3) => {
    const w3 = nt(P(i3.value), y3.hours, y3.minutes, Te());
    e3.multiDates ? Ln(w3, l, e3.multiDatesLimit) : l.value = w3, t3(), nextTick().then(() => {
      x3();
    });
  }, he = (i3) => e3.noDisabledRange ? _a(r.value[0], i3).some((U) => Y3(U)) : false, me2 = () => {
    r.value = l.value ? l.value.slice() : [], r.value.length === 2 && !(e3.fixedStart || e3.fixedEnd) && (r.value = []);
  }, N = (i3, w3) => {
    const U = [P(i3.value), addDays(P(i3.value), +e3.autoRange)];
    R3(U) && (w3 && j(i3.value), r.value = U);
  }, j = (i3) => {
    const w3 = getMonth(P(i3)), U = getYear(P(i3));
    if (K3(0, w3, U), D3.value.count > 0)
      for (let se2 = 1; se2 < D3.value.count; se2++) {
        const be2 = Or(
          set(P(i3), { year: E3.value(se2 - 1), month: z3.value(se2 - 1) })
        );
        K3(se2, be2.month, be2.year);
      }
  }, De2 = (i3) => Array.isArray(l.value) && l.value.length === 2 ? e3.fixedStart && (Re(i3, l.value[0]) || ge(i3, l.value[0])) ? [l.value[0], i3] : e3.fixedEnd && (Pe(i3, l.value[1]) || ge(i3, l.value[1])) ? [i3, l.value[1]] : (n("invalid-fixed-range", i3), l.value) : [], ne = (i3) => {
    he(i3.value) || !G3(i3.value, l.value, e3.fixedStart ? 0 : 1) || (r.value = De2(P(i3.value)));
  }, Fe = (i3, w3) => {
    if (me2(), e3.autoRange)
      return N(i3, w3);
    if (e3.fixedStart || e3.fixedEnd)
      return ne(i3);
    r.value[0] ? G3(P(i3.value), l.value) && !he(i3.value) && (Pe(P(i3.value), P(r.value[0])) ? (r.value.unshift(P(i3.value)), n("range-end", r.value[0])) : (r.value[1] = P(i3.value), n("range-end", r.value[1]))) : (r.value[0] = P(i3.value), n("range-start", r.value[0]));
  }, Te = (i3 = true) => e3.enableSeconds ? Array.isArray(y3.seconds) ? i3 ? y3.seconds[0] : y3.seconds[1] : y3.seconds : 0, Mt2 = (i3) => {
    r.value[i3] = nt(
      r.value[i3],
      y3.hours[i3],
      y3.minutes[i3],
      Te(i3 !== 1)
    );
  }, Jt2 = () => {
    var i3, w3;
    r.value[0] && r.value[1] && +((i3 = r.value) == null ? void 0 : i3[0]) > +((w3 = r.value) == null ? void 0 : w3[1]) && (r.value.reverse(), n("range-start", r.value[0]), n("range-end", r.value[1]));
  }, xt2 = () => {
    r.value.length && (r.value[0] && !r.value[1] ? Mt2(0) : (Mt2(0), Mt2(1), t3()), Jt2(), l.value = r.value.slice(), Wn(r.value, n, e3.autoApply, e3.modelAuto));
  }, Qt2 = (i3, w3 = false) => {
    if (!(Y3(i3.value) || !i3.current && e3.hideOffsetDates)) {
      if (e3.weekPicker)
        return B3(i3);
      if (!e3.range)
        return ie(i3);
      ia(y3.hours) && ia(y3.minutes) && !e3.multiDates && (Fe(i3, w3), xt2());
    }
  }, en = (i3, w3) => {
    var se2;
    K3(i3, w3.month, w3.year), D3.value.count && !D3.value.solo && k3(i3), n("update-month-year", { instance: i3, month: w3.month, year: w3.year }), a3(D3.value.solo ? i3 : void 0);
    const U = (se2 = e3.flow) != null && se2.length ? e3.flow[e3.flowStep] : void 0;
    !w3.fromNav && (U === je.month || U === je.year) && t3();
  }, tn = (i3, w3) => {
    Array.isArray(i3) && i3.length <= 2 && e3.range ? l.value = i3.map((U) => Ge(P(U), w3 ? void 0 : e3.timezone)) : Array.isArray(i3) || (l.value = Ge(P(i3), w3 ? void 0 : e3.timezone)), _(), e3.multiCalendars && nextTick().then(() => L3(true));
  }, nn = () => {
    e3.range ? l.value && Array.isArray(l.value) && l.value[0] ? l.value = Pe(P(), l.value[0]) ? [P(), l.value[0]] : [l.value[0], P()] : l.value = [P()] : l.value = P(), _();
  }, an = () => {
    if (Array.isArray(l.value))
      if (e3.multiDates) {
        const i3 = rn();
        l.value[l.value.length - 1] = J(i3);
      } else
        l.value = l.value.map((i3, w3) => i3 && J(i3, w3));
    else
      l.value = J(l.value);
    n("time-update");
  }, rn = () => Array.isArray(l.value) && l.value.length ? l.value[l.value.length - 1] : null;
  return {
    calendars: c3,
    modelValue: l,
    month: E3,
    year: z3,
    time: y3,
    disabledTimesConfig: M3,
    getCalendarDays: te,
    getMarker: u3,
    handleScroll: $,
    handleSwipe: s3,
    handleArrow: X3,
    selectDate: Qt2,
    updateMonthYear: en,
    presetDate: tn,
    selectCurrentDate: nn,
    updateTime: (i3, w3 = true, U = false) => {
      q3(i3, w3, U, an);
    }
  };
};
var Gl = { key: 0 };
var Zl = defineComponent({
  __name: "DatePicker",
  props: {
    ...xe
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
    "update-month-year"
  ],
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, {
      calendars: r,
      month: l,
      year: c3,
      modelValue: y3,
      time: D3,
      disabledTimesConfig: S3,
      getCalendarDays: g,
      getMarker: Y3,
      handleArrow: R3,
      handleScroll: G3,
      handleSwipe: q3,
      selectDate: J,
      updateMonthYear: Q3,
      presetDate: p,
      selectCurrentDate: M3,
      updateTime: E3
    } = Kl(t3, a3, k3, d3), z3 = useSlots(), { setHoverDate: K3, getDayClassData: _, clearHoverDate: re2 } = Jr(y3, t3), { defaultedMultiCalendars: x3 } = Se(t3), L3 = ref([]), h5 = ref([]), T3 = ref(null), H3 = ze(z3, "calendar"), ee = ze(z3, "monthYear"), v = ze(z3, "timePicker"), I3 = (C) => {
      t3.shadow || a3("mount", C);
    };
    watch(
      r,
      () => {
        t3.shadow || setTimeout(() => {
          a3("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const f = computed(() => (C) => g(l.value(C), c3.value(C)).map((O3) => ({
      ...O3,
      days: O3.days.map((A) => (A.marker = Y3(A), A.classData = _(A), A))
    })));
    function k3(C) {
      var O3;
      C || C === 0 ? (O3 = h5.value[C]) == null || O3.triggerTransition(l.value(C), c3.value(C)) : h5.value.forEach((A, te) => A.triggerTransition(l.value(te), c3.value(te)));
    }
    function d3() {
      a3("update-flow-step");
    }
    const o = (C, O3 = false) => {
      J(C, O3), t3.spaceConfirm && a3("select-date");
    };
    return n({
      clearHoverDate: re2,
      presetDate: p,
      selectCurrentDate: M3,
      toggleMonthPicker: (C, O3, A = 0) => {
        var te;
        (te = L3.value[A]) == null || te.toggleMonthPicker(C, O3);
      },
      toggleYearPicker: (C, O3, A = 0) => {
        var te;
        (te = L3.value[A]) == null || te.toggleYearPicker(C, O3);
      },
      toggleTimePicker: (C, O3, A) => {
        var te;
        (te = T3.value) == null || te.toggleTimePicker(C, O3, A);
      },
      handleArrow: R3,
      updateMonthYear: Q3,
      getSidebarProps: () => ({
        modelValue: y3,
        month: l,
        year: c3,
        time: D3,
        updateTime: E3,
        updateMonthYear: Q3,
        selectDate: J,
        presetDate: p
      })
    }), (C, O3) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(Un, {
        "multi-calendars": unref(x3).count
      }, {
        default: withCtx(({ instance: A, index: te }) => [
          C.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Bl, mergeProps({
            key: 0,
            ref: (B3) => {
              B3 && (L3.value[te] = B3);
            },
            months: unref(Ma)(C.formatLocale, C.locale, C.monthNameFormat),
            years: unref(Vn)(C.yearRange, C.reverseYears),
            month: unref(l)(A),
            year: unref(c3)(A),
            instance: A
          }, C.$props, {
            onMount: O3[0] || (O3[0] = (B3) => I3(unref(mt).header)),
            onResetFlow: O3[1] || (O3[1] = (B3) => C.$emit("reset-flow")),
            onUpdateMonthYear: (B3) => unref(Q3)(A, B3),
            onOverlayClosed: O3[2] || (O3[2] = (B3) => C.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(ee), (B3, ie) => ({
              name: B3,
              fn: withCtx((he) => [
                renderSlot(C.$slots, B3, normalizeProps(guardReactiveProps(he)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(jl, mergeProps({
            ref: (B3) => {
              B3 && (h5.value[te] = B3);
            },
            "mapped-dates": f.value(A),
            month: unref(l)(A),
            year: unref(c3)(A)
          }, C.$props, {
            onSelectDate: (B3) => unref(J)(B3, A !== 1),
            onHandleSpace: (B3) => o(B3, A !== 1),
            onSetHoverDate: O3[3] || (O3[3] = (B3) => unref(K3)(B3)),
            onHandleScroll: (B3) => unref(G3)(B3, A),
            onHandleSwipe: (B3) => unref(q3)(B3, A),
            onMount: O3[4] || (O3[4] = (B3) => I3(unref(mt).calendar)),
            onResetFlow: O3[5] || (O3[5] = (B3) => C.$emit("reset-flow")),
            onTooltipOpen: O3[6] || (O3[6] = (B3) => C.$emit("tooltip-open", B3)),
            onTooltipClose: O3[7] || (O3[7] = (B3) => C.$emit("tooltip-close", B3))
          }), createSlots({ _: 2 }, [
            renderList(unref(H3), (B3, ie) => ({
              name: B3,
              fn: withCtx((he) => [
                renderSlot(C.$slots, B3, normalizeProps(guardReactiveProps({ ...he })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars"]),
      C.enableTimePicker ? (openBlock(), createElementBlock("div", Gl, [
        C.$slots["time-picker"] ? renderSlot(C.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(D3), updateTime: unref(E3) }))) : (openBlock(), createBlock(Ya, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: T3
        }, C.$props, {
          hours: unref(D3).hours,
          minutes: unref(D3).minutes,
          seconds: unref(D3).seconds,
          "internal-model-value": C.internalModelValue,
          "disabled-times-config": unref(S3),
          onMount: O3[8] || (O3[8] = (A) => I3(unref(mt).timePicker)),
          "onUpdate:hours": O3[9] || (O3[9] = (A) => unref(E3)(A)),
          "onUpdate:minutes": O3[10] || (O3[10] = (A) => unref(E3)(A, false)),
          "onUpdate:seconds": O3[11] || (O3[11] = (A) => unref(E3)(A, false, true)),
          onResetFlow: O3[12] || (O3[12] = (A) => C.$emit("reset-flow")),
          onOverlayClosed: O3[13] || (O3[13] = (A) => C.$emit("time-picker-close")),
          onOverlayOpened: O3[14] || (O3[14] = (A) => C.$emit("time-picker-open", A)),
          onAmPmChange: O3[15] || (O3[15] = (A) => C.$emit("am-pm-change", A))
        }), createSlots({ _: 2 }, [
          renderList(unref(v), (A, te) => ({
            name: A,
            fn: withCtx((B3) => [
              renderSlot(C.$slots, A, normalizeProps(guardReactiveProps(B3)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var ql = ["id", "onKeydown"];
var Xl = {
  key: 0,
  class: "dp__sidebar_left"
};
var Jl = {
  key: 1,
  class: "dp--preset-dates"
};
var xl = ["onClick", "onKeydown"];
var Ql = {
  key: 2,
  class: "dp__sidebar_right"
};
var eo = {
  key: 3,
  class: "dp__action_extra"
};
var da = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...Xt,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    arrMapValues: { type: Object, default: () => ({}) }
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
    "range-end"
  ],
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, r = computed(() => {
      const { openOnTop: N, ...j } = t3;
      return {
        ...j,
        flowStep: re2.value
      };
    }), { setMenuFocused: l, setShiftKey: c3, control: y3 } = Oa(), D3 = useSlots(), { defaultedTextInput: S3, defaultedInline: g, defaultedConfig: Y3 } = Se(t3), R3 = ref(null), G3 = ref(0), q3 = ref(null), J = ref(null), Q3 = ref(false), p = ref(null);
    onMounted(() => {
      if (!t3.shadow) {
        Q3.value = true, M3(), window.addEventListener("resize", M3);
        const N = Ae(q3);
        if (N && !S3.value.enabled && !g.value.enabled && (l(true), H3()), N) {
          const j = (De2) => {
            (t3.allowPreventDefault || Y3.value.allowPreventDefault) && De2.preventDefault(), tt(De2, Y3.value, true);
          };
          N.addEventListener("pointerdown", j), N.addEventListener("mousedown", j);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", M3);
    });
    const M3 = () => {
      const N = Ae(J);
      N && (G3.value = N.getBoundingClientRect().width);
    }, { arrowRight: E3, arrowLeft: z3, arrowDown: K3, arrowUp: _ } = lt(), { flowStep: re2, updateFlowStep: x3, childMount: L3, resetFlow: h5 } = xr(t3, a3, p), T3 = computed(() => t3.monthPicker ? gl : t3.yearPicker ? hl : t3.timePicker ? Nl : Zl), H3 = () => {
      const N = Ae(q3);
      N && N.focus({ preventScroll: true });
    }, ee = computed(() => {
      var N;
      return ((N = p.value) == null ? void 0 : N.getSidebarProps()) || {};
    }), v = () => {
      t3.openOnTop && a3("recalculate-position");
    }, I3 = ze(D3, "action"), f = computed(() => t3.monthPicker || t3.yearPicker ? ze(D3, "monthYear") : t3.timePicker ? ze(D3, "timePicker") : ze(D3, "shared")), k3 = computed(() => t3.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), d3 = computed(() => ({
      dp__menu_disabled: t3.disabled,
      dp__menu_readonly: t3.readonly
    })), o = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !g.value.enabled,
        dp__relative: g.value.enabled,
        [t3.menuClassName]: !!t3.menuClassName
      })
    ), $ = (N) => {
      tt(N, Y3.value, true);
    }, X3 = () => {
      t3.escClose && a3("close-picker");
    }, s3 = (N) => {
      if (t3.arrowNavigation) {
        if (N === "up")
          return _();
        if (N === "down")
          return K3();
        if (N === "left")
          return z3();
        if (N === "right")
          return E3();
      } else
        N === "left" || N === "up" ? te("handleArrow", "left", 0, N === "up") : te("handleArrow", "right", 0, N === "down");
    }, u3 = (N) => {
      c3(N.shiftKey), !t3.disableMonthYearSelect && N.code === "Tab" && N.target.classList.contains("dp__menu") && y3.value.shiftKeyInMenu && (N.preventDefault(), tt(N, Y3.value, true), a3("close-picker"));
    }, C = () => {
      H3(), a3("time-picker-close");
    }, O3 = (N) => {
      var j, De2, ne;
      (j = p.value) == null || j.toggleTimePicker(false, false), (De2 = p.value) == null || De2.toggleMonthPicker(false, false, N), (ne = p.value) == null || ne.toggleYearPicker(false, false, N);
    }, A = (N, j = 0) => {
      var De2, ne, Fe;
      return N === "month" ? (De2 = p.value) == null ? void 0 : De2.toggleMonthPicker(false, true, j) : N === "year" ? (ne = p.value) == null ? void 0 : ne.toggleYearPicker(false, true, j) : N === "time" ? (Fe = p.value) == null ? void 0 : Fe.toggleTimePicker(true, false) : O3(j);
    }, te = (N, ...j) => {
      var De2, ne;
      (De2 = p.value) != null && De2[N] && ((ne = p.value) == null || ne[N](...j));
    }, B3 = () => {
      te("selectCurrentDate");
    }, ie = (N, j) => {
      te("presetDate", N, j);
    }, he = () => {
      te("clearHoverDate");
    };
    return n({
      updateMonthYear: (N, j) => {
        te("updateMonthYear", N, j);
      },
      switchView: A
    }), (N, j) => {
      var De2;
      return openBlock(), createElementBlock("div", {
        id: N.uid ? `dp-menu-${N.uid}` : void 0,
        tabindex: "0",
        ref_key: "dpMenuRef",
        ref: q3,
        role: "dialog",
        class: normalizeClass(o.value),
        onMouseleave: he,
        onClick: $,
        onKeydown: [
          withKeys(X3, ["esc"]),
          j[15] || (j[15] = withKeys(withModifiers((ne) => s3("left"), ["prevent"]), ["left"])),
          j[16] || (j[16] = withKeys(withModifiers((ne) => s3("up"), ["prevent"]), ["up"])),
          j[17] || (j[17] = withKeys(withModifiers((ne) => s3("down"), ["prevent"]), ["down"])),
          j[18] || (j[18] = withKeys(withModifiers((ne) => s3("right"), ["prevent"]), ["right"])),
          u3
        ]
      }, [
        (N.disabled || N.readonly) && unref(g).enabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(d3.value)
        }, null, 2)) : createCommentVNode("", true),
        !unref(g).enabled && !N.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(k3.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: J,
          class: normalizeClass({
            dp__menu_content_wrapper: ((De2 = N.presetDates) == null ? void 0 : De2.length) || !!N.$slots["left-sidebar"] || !!N.$slots["right-sidebar"]
          }),
          style: normalizeStyle({ "--dp-menu-width": `${G3.value}px` })
        }, [
          N.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Xl, [
            renderSlot(N.$slots, "left-sidebar", normalizeProps(guardReactiveProps(ee.value)))
          ])) : createCommentVNode("", true),
          N.presetDates.length ? (openBlock(), createElementBlock("div", Jl, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(N.presetDates, (ne, Fe) => (openBlock(), createElementBlock("div", {
              key: Fe,
              style: normalizeStyle(ne.style || {}),
              class: "dp--preset-range"
            }, [
              ne.slot ? renderSlot(N.$slots, ne.slot, {
                key: 0,
                presetDate: ie,
                label: ne.label,
                value: ne.value
              }) : (openBlock(), createElementBlock("div", {
                key: 1,
                role: "button",
                tabindex: "0",
                onClick: (Te) => ie(ne.value, ne.noTz),
                onKeydown: [
                  withKeys(withModifiers((Te) => ie(ne.value, ne.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((Te) => ie(ne.value, ne.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(ne.label), 41, xl))
            ], 4))), 128))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: "dp__instance_calendar",
            ref_key: "calendarWrapperRef",
            ref: R3,
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(T3.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: p
            }, r.value, {
              "flow-step": unref(re2),
              onMount: unref(L3),
              onUpdateFlowStep: unref(x3),
              onResetFlow: unref(h5),
              onFocusMenu: H3,
              onSelectDate: j[0] || (j[0] = (ne) => N.$emit("select-date")),
              onTooltipOpen: j[1] || (j[1] = (ne) => N.$emit("tooltip-open", ne)),
              onTooltipClose: j[2] || (j[2] = (ne) => N.$emit("tooltip-close", ne)),
              onAutoApply: j[3] || (j[3] = (ne) => N.$emit("auto-apply", ne)),
              onRangeStart: j[4] || (j[4] = (ne) => N.$emit("range-start", ne)),
              onRangeEnd: j[5] || (j[5] = (ne) => N.$emit("range-end", ne)),
              onInvalidFixedRange: j[6] || (j[6] = (ne) => N.$emit("invalid-fixed-range", ne)),
              onTimeUpdate: j[7] || (j[7] = (ne) => N.$emit("time-update")),
              onAmPmChange: j[8] || (j[8] = (ne) => N.$emit("am-pm-change", ne)),
              onTimePickerOpen: j[9] || (j[9] = (ne) => N.$emit("time-picker-open", ne)),
              onTimePickerClose: C,
              onRecalculatePosition: v,
              onUpdateMonthYear: j[10] || (j[10] = (ne) => N.$emit("update-month-year", ne)),
              "onUpdate:internalModelValue": j[11] || (j[11] = (ne) => N.$emit("update:internal-model-value", ne))
            }), createSlots({ _: 2 }, [
              renderList(f.value, (ne, Fe) => ({
                name: ne,
                fn: withCtx((Te) => [
                  renderSlot(N.$slots, ne, normalizeProps(guardReactiveProps({ ...Te })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          N.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Ql, [
            renderSlot(N.$slots, "right-sidebar", normalizeProps(guardReactiveProps(ee.value)))
          ])) : createCommentVNode("", true),
          N.$slots["action-extra"] ? (openBlock(), createElementBlock("div", eo, [
            N.$slots["action-extra"] ? renderSlot(N.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: B3
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !N.autoApply || N.keepActionRow || unref(Y3).keepActionRow ? (openBlock(), createBlock(ol, mergeProps({
          key: 2,
          "menu-mount": Q3.value
        }, r.value, {
          "calendar-width": G3.value,
          onClosePicker: j[12] || (j[12] = (ne) => N.$emit("close-picker")),
          onSelectDate: j[13] || (j[13] = (ne) => N.$emit("select-date")),
          onInvalidSelect: j[14] || (j[14] = (ne) => N.$emit("invalid-select")),
          onSelectNow: B3
        }), createSlots({ _: 2 }, [
          renderList(unref(I3), (ne, Fe) => ({
            name: ne,
            fn: withCtx((Te) => [
              renderSlot(N.$slots, ne, normalizeProps(guardReactiveProps({ ...Te })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 42, ql);
    };
  }
});
var to = typeof window < "u" ? window : void 0;
var bn = () => {
};
var no = (e3) => getCurrentScope() ? (onScopeDispose(e3), true) : false;
var ao = (e3, n, a3, t3) => {
  if (!e3)
    return bn;
  let r = bn;
  const l = watch(
    () => unref(e3),
    (y3) => {
      r(), y3 && (y3.addEventListener(n, a3, t3), r = () => {
        y3.removeEventListener(n, a3, t3), r = bn;
      });
    },
    { immediate: true, flush: "post" }
  ), c3 = () => {
    l(), r();
  };
  return no(c3), c3;
};
var ro = (e3, n, a3, t3 = {}) => {
  const { window: r = to, event: l = "pointerdown" } = t3;
  return r ? ao(r, l, (y3) => {
    const D3 = Ae(e3), S3 = Ae(n);
    !D3 || !S3 || D3 === y3.target || y3.composedPath().includes(D3) || y3.composedPath().includes(S3) || a3(y3);
  }, { passive: true }) : void 0;
};
var lo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...Xt
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
    "range-end"
  ],
  setup(e3, { expose: n, emit: a3 }) {
    const t3 = e3, r = useSlots(), l = ref(false), c3 = toRef(t3, "modelValue"), y3 = toRef(t3, "timezone"), D3 = ref(null), S3 = ref(null), g = ref(null), Y3 = ref(false), R3 = ref(null), { setMenuFocused: G3, setShiftKey: q3 } = Oa(), { clearArrowNav: J } = lt(), { mapDatesArrToMap: Q3, validateDate: p, isValidTime: M3 } = Et(t3), { defaultedTransitions: E3, defaultedTextInput: z3, defaultedInline: K3, defaultedConfig: _ } = Se(t3), { menuTransition: re2, showTransition: x3 } = Bt(E3);
    onMounted(() => {
      $(t3.modelValue), nextTick().then(() => {
        K3.value.enabled || (f(R3.value).addEventListener("scroll", te), window.addEventListener("resize", B3));
      }), K3.value.enabled && (l.value = true);
    });
    const L3 = computed(() => Q3());
    onUnmounted(() => {
      if (!K3.value.enabled) {
        const i3 = f(R3.value);
        i3 && i3.removeEventListener("scroll", te), window.removeEventListener("resize", B3);
      }
    });
    const h5 = ze(r, "all", t3.presetDates), T3 = ze(r, "input");
    watch(
      [c3, y3],
      () => {
        $(c3.value);
      },
      { deep: true }
    );
    const { openOnTop: H3, menuStyle: ee, xCorrect: v, setMenuPosition: I3, getScrollableParent: f, shadowRender: k3 } = Zr({
      menuRef: D3,
      menuRefInner: S3,
      inputRef: g,
      pickerWrapperRef: R3,
      inline: K3,
      emit: a3,
      props: t3,
      slots: r
    }), {
      inputValue: d3,
      internalModelValue: o,
      parseExternalModelValue: $,
      emitModelValue: X3,
      formatInputValue: s3,
      checkBeforeEmit: u3
    } = Kr(a3, t3, Y3), C = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t3.dark,
        dp__theme_light: !t3.dark,
        dp__flex_display: K3.value.enabled,
        dp__flex_display_with_input: K3.value.input
      })
    ), O3 = computed(() => t3.dark ? "dp__theme_dark" : "dp__theme_light"), A = computed(() => t3.teleport ? {
      to: typeof t3.teleport == "boolean" ? "body" : t3.teleport,
      disabled: K3.value.enabled
    } : { class: "dp__outer_menu_wrap" }), te = () => {
      l.value && (t3.closeOnScroll || _.value.closeOnScroll ? Te() : I3());
    }, B3 = () => {
      l.value && I3();
    }, ie = () => {
      !t3.disabled && !t3.readonly && (k3(da, t3), I3(false), l.value = true, l.value && a3("open"), l.value || Fe(), $(t3.modelValue));
    }, he = () => {
      d3.value = "", Fe(), a3("update:model-value", null), a3("update:model-timezone-value", null), a3("cleared"), (t3.closeOnClearValue || _.value.closeOnClearValue) && Te();
    }, me2 = () => {
      const i3 = o.value;
      return !i3 || !Array.isArray(i3) && p(i3) ? true : Array.isArray(i3) ? i3.length === 2 && p(i3[0]) && p(i3[1]) ? true : t3.partialRange && !t3.timePicker ? p(i3[0]) : false : false;
    }, N = () => {
      u3() && me2() ? (X3(), Te()) : a3("invalid-select", o.value);
    }, j = (i3) => {
      De2(), X3(), (t3.closeOnAutoApply || _.value.closeOnAutoApply) && !i3 && Te();
    }, De2 = () => {
      g.value && z3.value.enabled && g.value.setParsedDate(o.value);
    }, ne = (i3 = false) => {
      t3.autoApply && M3(o.value) && me2() && (t3.range && Array.isArray(o.value) ? (t3.partialRange || o.value.length === 2) && j(i3) : j(i3));
    }, Fe = () => {
      z3.value.enabled || (o.value = null);
    }, Te = () => {
      K3.value.enabled || (l.value && (l.value = false, v.value = false, G3(false), q3(false), J(), a3("closed"), d3.value && $(c3.value)), Fe(), a3("blur"));
    }, Mt2 = (i3, w3) => {
      if (!i3) {
        o.value = null;
        return;
      }
      o.value = i3, w3 && (N(), a3("text-submit"));
    }, Jt2 = () => {
      t3.autoApply && M3(o.value) && X3(), De2();
    }, xt2 = () => l.value ? Te() : ie(), Qt2 = (i3) => {
      o.value = i3;
    }, en = () => {
      z3.value.enabled && (Y3.value = true, s3()), a3("focus");
    }, tn = () => {
      z3.value.enabled && (Y3.value = false, $(t3.modelValue)), a3("blur");
    }, nn = (i3) => {
      S3.value && S3.value.updateMonthYear(0, {
        month: na(i3.month),
        year: na(i3.year)
      });
    }, an = (i3) => {
      $(i3 ?? t3.modelValue);
    }, rn = (i3, w3) => {
      var U;
      (U = S3.value) == null || U.switchView(i3, w3);
    }, zn = (i3) => t3.onClickOutside ? t3.onClickOutside(i3) : _.value.onClickOutside ? _.value.onClickOutside(i3) : Te();
    return ro(D3, g, () => zn(me2)), n({
      closeMenu: Te,
      selectDate: N,
      clearValue: he,
      openMenu: ie,
      onScroll: te,
      formatInputValue: s3,
      // exposed for testing purposes
      updateInternalModelValue: Qt2,
      // modify internal modelValue
      setMonthYear: nn,
      parseModel: an,
      switchView: rn
    }), (i3, w3) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(C.value),
      ref_key: "pickerWrapperRef",
      ref: R3
    }, [
      createVNode(nl, mergeProps({
        ref_key: "inputRef",
        ref: g,
        "is-menu-open": l.value,
        "input-value": unref(d3),
        "onUpdate:inputValue": w3[0] || (w3[0] = (U) => isRef(d3) ? d3.value = U : null)
      }, i3.$props, {
        onClear: he,
        onOpen: ie,
        onSetInputDate: Mt2,
        onSetEmptyDate: unref(X3),
        onSelectDate: N,
        onToggle: xt2,
        onClose: Te,
        onFocus: en,
        onBlur: tn,
        onRealBlur: w3[1] || (w3[1] = (U) => Y3.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(T3), (U, se2) => ({
          name: U,
          fn: withCtx((be2) => [
            renderSlot(i3.$slots, U, normalizeProps(guardReactiveProps(be2)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      createVNode(Transition, {
        name: unref(re2)(unref(H3)),
        css: unref(x3) && !unref(K3).enabled
      }, {
        default: withCtx(() => [
          l.value ? (openBlock(), createBlock(resolveDynamicComponent(i3.teleport ? Teleport : "div"), mergeProps({
            key: 0,
            ref_key: "dpWrapMenuRef",
            ref: D3
          }, A.value, {
            class: { "dp--menu-wrapper": !unref(K3).enabled },
            style: unref(K3).enabled ? void 0 : unref(ee)
          }), {
            default: withCtx(() => [
              createVNode(da, mergeProps({
                ref_key: "dpMenuRef",
                ref: S3,
                class: { [O3.value]: true, "dp--menu-wrapper": i3.teleport },
                style: i3.teleport ? unref(ee) : void 0,
                "open-on-top": unref(H3),
                "arr-map-values": L3.value
              }, i3.$props, {
                "internal-model-value": unref(o),
                "onUpdate:internalModelValue": w3[2] || (w3[2] = (U) => isRef(o) ? o.value = U : null),
                onClosePicker: Te,
                onSelectDate: N,
                onAutoApply: ne,
                onTimeUpdate: Jt2,
                onFlowStep: w3[3] || (w3[3] = (U) => i3.$emit("flow-step", U)),
                onUpdateMonthYear: w3[4] || (w3[4] = (U) => i3.$emit("update-month-year", U)),
                onInvalidSelect: w3[5] || (w3[5] = (U) => i3.$emit("invalid-select", unref(o))),
                onInvalidFixedRange: w3[6] || (w3[6] = (U) => i3.$emit("invalid-fixed-range", U)),
                onRecalculatePosition: unref(I3),
                onTooltipOpen: w3[7] || (w3[7] = (U) => i3.$emit("tooltip-open", U)),
                onTooltipClose: w3[8] || (w3[8] = (U) => i3.$emit("tooltip-close", U)),
                onTimePickerOpen: w3[9] || (w3[9] = (U) => i3.$emit("time-picker-open", U)),
                onTimePickerClose: w3[10] || (w3[10] = (U) => i3.$emit("time-picker-close", U)),
                onAmPmChange: w3[11] || (w3[11] = (U) => i3.$emit("am-pm-change", U)),
                onRangeStart: w3[12] || (w3[12] = (U) => i3.$emit("range-start", U)),
                onRangeEnd: w3[13] || (w3[13] = (U) => i3.$emit("range-end", U))
              }), createSlots({ _: 2 }, [
                renderList(unref(h5), (U, se2) => ({
                  name: U,
                  fn: withCtx((be2) => [
                    renderSlot(i3.$slots, U, normalizeProps(guardReactiveProps({ ...be2 })))
                  ])
                }))
              ]), 1040, ["class", "style", "open-on-top", "arr-map-values", "internal-model-value", "onRecalculatePosition"])
            ]),
            _: 3
          }, 16, ["class", "style"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name", "css"])
    ], 2));
  }
});
var Ba = (() => {
  const e3 = lo;
  return e3.install = (n) => {
    n.component("Vue3DatePicker", e3);
  }, e3;
})();
var oo = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Ba
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(oo).forEach(([e3, n]) => {
  e3 !== "default" && (Ba[e3] = n);
});

// node_modules/.pnpm/@vueuse+integrations@10.5.0_qrcode@1.5.3_vue@3.3.4/node_modules/@vueuse/integrations/useQRCode.mjs
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

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/swiper-vue.mjs
init_vue_runtime_esm_bundler();

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/shared/ssr-window.esm.mjs
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

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/shared/utils.mjs
function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch (e3) {
    }
    try {
      delete object[key];
    } catch (e3) {
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
function getComputedStyle2(el3) {
  const window2 = getWindow();
  let style;
  if (window2.getComputedStyle) {
    style = window2.getComputedStyle(el3, null);
  }
  if (!style && el3.currentStyle) {
    style = el3.currentStyle;
  }
  if (!style) {
    style = el3.style;
  }
  return style;
}
function getTranslate(el3, axis) {
  if (axis === void 0) {
    axis = "x";
  }
  const window2 = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle2(el3);
  if (window2.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(",").length > 6) {
      curTransform = curTransform.split(", ").map((a3) => a3.replace(",", ".")).join(", ");
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
  const to2 = Object(arguments.length <= 0 ? void 0 : arguments[0]);
  const noExtend = ["__proto__", "constructor", "prototype"];
  for (let i3 = 1; i3 < arguments.length; i3 += 1) {
    const nextSource = i3 < 0 || arguments.length <= i3 ? void 0 : arguments[i3];
    if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== void 0 && desc.enumerable) {
          if (isObject2(to2[nextKey]) && isObject2(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to2[nextKey] = nextSource[nextKey];
            } else {
              extend2(to2[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject2(to2[nextKey]) && isObject2(nextSource[nextKey])) {
            to2[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to2[nextKey] = nextSource[nextKey];
            } else {
              extend2(to2[nextKey], nextSource[nextKey]);
            }
          } else {
            to2[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to2;
}
function setCSSProperty(el3, varName, varValue) {
  el3.style.setProperty(varName, varValue);
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
  return [...element.children].filter((el3) => el3.matches(selector));
}
function createElement(tag, classes2) {
  if (classes2 === void 0) {
    classes2 = [];
  }
  const el3 = document.createElement(tag);
  el3.classList.add(...Array.isArray(classes2) ? classes2 : [classes2]);
  return el3;
}
function elementPrevAll(el3, selector) {
  const prevEls = [];
  while (el3.previousElementSibling) {
    const prev = el3.previousElementSibling;
    if (selector) {
      if (prev.matches(selector))
        prevEls.push(prev);
    } else
      prevEls.push(prev);
    el3 = prev;
  }
  return prevEls;
}
function elementNextAll(el3, selector) {
  const nextEls = [];
  while (el3.nextElementSibling) {
    const next = el3.nextElementSibling;
    if (selector) {
      if (next.matches(selector))
        nextEls.push(next);
    } else
      nextEls.push(next);
    el3 = next;
  }
  return nextEls;
}
function elementStyle(el3, prop) {
  const window2 = getWindow();
  return window2.getComputedStyle(el3, null).getPropertyValue(prop);
}
function elementIndex(el3) {
  let child = el3;
  let i3;
  if (child) {
    i3 = 0;
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1)
        i3 += 1;
    }
    return i3;
  }
  return void 0;
}
function elementParents(el3, selector) {
  const parents = [];
  let parent = el3.parentElement;
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
function elementTransitionEnd(el3, callback) {
  function fireCallBack(e3) {
    if (e3.target !== el3)
      return;
    callback.call(el3, e3);
    el3.removeEventListener("transitionend", fireCallBack);
  }
  if (callback) {
    el3.addEventListener("transitionend", fireCallBack);
  }
}
function elementOuterSize(el3, size, includeMargins) {
  const window2 = getWindow();
  if (includeMargins) {
    return el3[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el3, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el3, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
  }
  return el3.offsetWidth;
}

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/shared/swiper-core.mjs
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
  return {
    isSafari: needPerspectiveFix || isSafari(),
    needPerspectiveFix,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent)
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
    on,
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
  on("init", () => {
    if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
      createObserver();
      return;
    }
    window2.addEventListener("resize", resizeHandler);
    window2.addEventListener("orientationchange", orientationChangeHandler);
  });
  on("destroy", () => {
    removeObserver();
    window2.removeEventListener("resize", resizeHandler);
    window2.removeEventListener("orientationchange", orientationChangeHandler);
  });
}
function Observer(_ref) {
  let {
    swiper,
    extendParams,
    on,
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
      for (let i3 = 0; i3 < containerParents.length; i3 += 1) {
        attach(containerParents[i3]);
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
  on("init", init);
  on("destroy", destroy);
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
  const el3 = swiper.el;
  if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el3.clientWidth;
  }
  if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el3.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }
  width = width - parseInt(elementStyle(el3, "padding-left") || 0, 10) - parseInt(elementStyle(el3, "padding-right") || 0, 10);
  height = height - parseInt(elementStyle(el3, "padding-top") || 0, 10) - parseInt(elementStyle(el3, "padding-bottom") || 0, 10);
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
  function getDirectionLabel(property) {
    if (swiper.isHorizontal()) {
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
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
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
    swiper.grid.initSlides(slidesLength);
  }
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
    return typeof params.breakpoints[key].slidesPerView !== "undefined";
  }).length > 0;
  for (let i3 = 0; i3 < slidesLength; i3 += 1) {
    slideSize = 0;
    let slide2;
    if (slides[i3])
      slide2 = slides[i3];
    if (gridEnabled) {
      swiper.grid.updateSlide(i3, slide2, slidesLength, getDirectionLabel);
    }
    if (slides[i3] && elementStyle(slide2, "display") === "none")
      continue;
    if (params.slidesPerView === "auto") {
      if (shouldResetSlideSize) {
        slides[i3].style[getDirectionLabel("width")] = ``;
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
      if (slides[i3]) {
        slides[i3].style[getDirectionLabel("width")] = `${slideSize}px`;
      }
    }
    if (slides[i3]) {
      slides[i3].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i3 !== 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i3 === 0)
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
    wrapperEl.style[getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  }
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i3 = 0; i3 < snapGrid.length; i3 += 1) {
      let slidesGridItem = snapGrid[i3];
      if (params.roundLengths)
        slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i3] <= swiper.virtualSize - swiperSize) {
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
      for (let i3 = 0; i3 < groups; i3 += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (let i3 = 0; i3 < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i3 += 1) {
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
    const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
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
    if (allSlidesSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
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
  let i3;
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
      for (i3 = 0; i3 < Math.ceil(swiper.params.slidesPerView); i3 += 1) {
        const index = swiper.activeIndex + i3;
        if (index > swiper.slides.length && !isVirtual)
          break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }
  for (i3 = 0; i3 < activeSlides.length; i3 += 1) {
    if (typeof activeSlides[i3] !== "undefined") {
      const height = activeSlides[i3].offsetHeight;
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
  for (let i3 = 0; i3 < slides.length; i3 += 1) {
    slides[i3].swiperSlideOffset = (swiper.isHorizontal() ? slides[i3].offsetLeft : slides[i3].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
  }
}
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
  slides.forEach((slideEl) => {
    slideEl.classList.remove(params.slideVisibleClass);
  });
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  let spaceBetween = params.spaceBetween;
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
  } else if (typeof spaceBetween === "string") {
    spaceBetween = parseFloat(spaceBetween);
  }
  for (let i3 = 0; i3 < slides.length; i3 += 1) {
    const slide2 = slides[i3];
    let slideOffset = slide2.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i3];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide2);
      swiper.visibleSlidesIndexes.push(i3);
      slides[i3].classList.add(params.slideVisibleClass);
    }
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
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    slidesEl,
    activeIndex
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const getFilteredSlide = (selector) => {
    return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
  };
  slides.forEach((slideEl) => {
    slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
  });
  let activeSlide;
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
    activeSlide = slides[activeIndex];
  }
  if (activeSlide) {
    activeSlide.classList.add(params.slideActiveClass);
    let nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
    if (params.loop && !nextSlide) {
      nextSlide = slides[0];
    }
    if (nextSlide) {
      nextSlide.classList.add(params.slideNextClass);
    }
    let prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
    if (params.loop && !prevSlide === 0) {
      prevSlide = slides[slides.length - 1];
    }
    if (prevSlide) {
      prevSlide.classList.add(params.slidePrevClass);
    }
  }
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
    }).map((_, i3) => {
      return activeColumn + slidesPerView + i3;
    }));
    swiper.slides.forEach((slideEl, i3) => {
      if (preloadColumns.includes(slideEl.column))
        unlazy(swiper, i3);
    });
    return;
  }
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind || swiper.params.loop) {
    for (let i3 = activeIndex - amount; i3 <= slideIndexLastInView + amount; i3 += 1) {
      const realIndex = (i3 % len + len) % len;
      if (realIndex < activeIndex || realIndex > slideIndexLastInView)
        unlazy(swiper, realIndex);
    }
  } else {
    for (let i3 = Math.max(activeIndex - amount, 0); i3 <= Math.min(slideIndexLastInView + amount, len - 1); i3 += 1) {
      if (i3 !== activeIndex && (i3 > slideIndexLastInView || i3 < activeIndex)) {
        unlazy(swiper, i3);
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
  for (let i3 = 0; i3 < slidesGrid.length; i3 += 1) {
    if (typeof slidesGrid[i3 + 1] !== "undefined") {
      if (translate2 >= slidesGrid[i3] && translate2 < slidesGrid[i3 + 1] - (slidesGrid[i3 + 1] - slidesGrid[i3]) / 2) {
        activeIndex = i3;
      } else if (translate2 >= slidesGrid[i3] && translate2 < slidesGrid[i3 + 1]) {
        activeIndex = i3 + 1;
      }
    } else if (translate2 >= slidesGrid[i3]) {
      activeIndex = i3;
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
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit("snapIndexChange");
    }
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.realIndex = getVirtualRealIndex(activeIndex);
    }
    return;
  }
  let realIndex;
  if (swiper.virtual && params.virtual.enabled && params.loop) {
    realIndex = getVirtualRealIndex(activeIndex);
  } else if (swiper.slides[activeIndex]) {
    realIndex = parseInt(swiper.slides[activeIndex].getAttribute("data-swiper-slide-index") || activeIndex, 10);
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
function updateClickedSlide(el3, path) {
  const swiper = this;
  const params = swiper.params;
  let slide2 = el3.closest(`.${params.slideClass}, swiper-slide`);
  if (!slide2 && swiper.isElement && path && path.length > 1 && path.includes(el3)) {
    [...path.slice(path.indexOf(el3) + 1, path.length)].forEach((pathEl) => {
      if (!slide2 && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) {
        slide2 = pathEl;
      }
    });
  }
  let slideFound = false;
  let slideIndex;
  if (slide2) {
    for (let i3 = 0; i3 < swiper.slides.length; i3 += 1) {
      if (swiper.slides[i3] === slide2) {
        slideFound = true;
        slideIndex = i3;
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
  let x3 = 0;
  let y3 = 0;
  const z3 = 0;
  if (swiper.isHorizontal()) {
    x3 = rtl ? -translate2 : translate2;
  } else {
    y3 = translate2;
  }
  if (params.roundLengths) {
    x3 = Math.floor(x3);
    y3 = Math.floor(y3);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x3 : y3;
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x3 : -y3;
  } else if (!params.virtualTranslate) {
    if (swiper.isHorizontal()) {
      x3 -= swiper.cssOverflowAdjustment();
    } else {
      y3 -= swiper.cssOverflowAdjustment();
    }
    wrapperEl.style.transform = `translate3d(${x3}px, ${y3}px, ${z3}px)`;
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
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e3) {
          if (!swiper || swiper.destroyed)
            return;
          if (e3.target !== this)
            return;
          swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
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
  if (speed === void 0) {
    speed = this.params.speed;
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
  if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
    return false;
  }
  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
  const translate2 = -snapGrid[snapIndex];
  if (params.normalizeSlideIndex) {
    for (let i3 = 0; i3 < slidesGrid.length; i3 += 1) {
      const normalizedTranslate = -Math.floor(translate2 * 100);
      const normalizedGrid = Math.floor(slidesGrid[i3] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i3 + 1] * 100);
      if (typeof slidesGrid[i3 + 1] !== "undefined") {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i3;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i3 + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i3;
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
    const t3 = rtl ? translate2 : -translate2;
    if (speed === 0) {
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = "none";
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t3;
        });
      } else {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t3;
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
          targetPosition: t3,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: t3,
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
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e3) {
        if (!swiper || swiper.destroyed)
          return;
        if (e3.target !== this)
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
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (typeof index === "string") {
    const indexAsNumber = parseInt(index, 10);
    index = indexAsNumber;
  }
  const swiper = this;
  let newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      newIndex = swiper.getSlideIndexByData(newIndex);
    }
  }
  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}
function slideNext(speed, runCallbacks, internal) {
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    enabled,
    params,
    animating
  } = swiper;
  if (!enabled)
    return swiper;
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
  if (speed === void 0) {
    speed = this.params.speed;
  }
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
  if (!enabled)
    return swiper;
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
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
function slideToClosest(speed, runCallbacks, internal, threshold) {
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (threshold === void 0) {
    threshold = 0.5;
  }
  const swiper = this;
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
  const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  slides.forEach((el3, index) => {
    el3.setAttribute("data-swiper-slide-index", index);
  });
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
  const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
  let loopedSlides = params.loopedSlides || slidesPerView;
  if (loopedSlides % params.slidesPerGroup !== 0) {
    loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
  }
  swiper.loopedSlides = loopedSlides;
  const prependSlidesIndexes = [];
  const appendSlidesIndexes = [];
  let activeIndex = swiper.activeIndex;
  if (typeof activeSlideIndex === "undefined") {
    activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter((el3) => el3.classList.contains(params.slideActiveClass))[0]);
  } else {
    activeIndex = activeSlideIndex;
  }
  const isNext = direction === "next" || !direction;
  const isPrev = direction === "prev" || !direction;
  let slidesPrepended = 0;
  let slidesAppended = 0;
  if (activeSlideIndex < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
    for (let i3 = 0; i3 < loopedSlides - activeSlideIndex; i3 += 1) {
      const index = i3 - Math.floor(i3 / slides.length) * slides.length;
      prependSlidesIndexes.push(slides.length - index - 1);
    }
  } else if (activeSlideIndex > swiper.slides.length - loopedSlides * 2) {
    slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);
    for (let i3 = 0; i3 < slidesAppended; i3 += 1) {
      const index = i3 - Math.floor(i3 / slides.length) * slides.length;
      appendSlidesIndexes.push(index);
    }
  }
  if (isPrev) {
    prependSlidesIndexes.forEach((index) => {
      swiper.slides[index].swiperLoopMoveDOM = true;
      slidesEl.prepend(swiper.slides[index]);
      swiper.slides[index].swiperLoopMoveDOM = false;
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach((index) => {
      swiper.slides[index].swiperLoopMoveDOM = true;
      slidesEl.append(swiper.slides[index]);
      swiper.slides[index].swiperLoopMoveDOM = false;
    });
  }
  swiper.recalcSlides();
  if (params.slidesPerView === "auto") {
    swiper.updateSlides();
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
          swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
          if (setTranslate2) {
            swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
            swiper.touchEventsData.currentTranslate = swiper.translate;
          }
        }
      } else {
        if (setTranslate2) {
          swiper.slideToLoop(slideRealIndex, 0, false, true);
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
            swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
            swiper.touchEventsData.currentTranslate = swiper.translate;
          }
        }
      } else {
        swiper.slideToLoop(slideRealIndex, 0, false, true);
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
      swiper.controller.control.forEach((c3) => {
        if (!c3.destroyed && c3.params.loop)
          c3.loopFix({
            ...loopParams,
            slideTo: c3.params.slidesPerView === params.slidesPerView ? slideTo2 : false
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
  const el3 = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el3.style.cursor = "move";
  el3.style.cursor = moving ? "grabbing" : "grab";
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
  function __closestFrom(el3) {
    if (!el3 || el3 === getDocument() || el3 === getWindow())
      return null;
    if (el3.assignedSlot)
      el3 = el3.assignedSlot;
    const found = el3.closest(selector);
    if (!found && !el3.getRootNode) {
      return null;
    }
    return found || __closestFrom(el3.getRootNode().host);
  }
  return __closestFrom(base);
}
function onTouchStart(event2) {
  const swiper = this;
  const document2 = getDocument();
  const window2 = getWindow();
  const data = swiper.touchEventsData;
  data.evCache.push(event2);
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (!params.simulateTouch && event2.pointerType === "mouse")
    return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let e3 = event2;
  if (e3.originalEvent)
    e3 = e3.originalEvent;
  let targetEl = e3.target;
  if (params.touchEventsTarget === "wrapper") {
    if (!swiper.wrapperEl.contains(targetEl))
      return;
  }
  if ("which" in e3 && e3.which === 3)
    return;
  if ("button" in e3 && e3.button > 0)
    return;
  if (data.isTouched && data.isMoved)
    return;
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
  const eventPath = event2.composedPath ? event2.composedPath() : event2.path;
  if (swipingClassHasValue && e3.target && e3.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e3.target && e3.target.shadowRoot);
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler))
      return;
  }
  touches.currentX = e3.pageX;
  touches.currentY = e3.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;
  const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === "prevent") {
      event2.preventDefault();
    } else {
      return;
    }
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
    e3.preventDefault();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit("touchStart", e3);
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
  let e3 = event2;
  if (e3.originalEvent)
    e3 = e3.originalEvent;
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit("touchMoveOpposite", e3);
    }
    return;
  }
  const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === e3.pointerId);
  if (pointerIndex >= 0)
    data.evCache[pointerIndex] = e3;
  const targetTouch = data.evCache.length > 1 ? data.evCache[0] : e3;
  const pageX = targetTouch.pageX;
  const pageY = targetTouch.pageY;
  if (e3.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e3.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        prevX: swiper.touches.currentX,
        prevY: swiper.touches.currentY,
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
    if (e3.target === document2.activeElement && e3.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit("touchMove", e3);
  }
  if (e3.targetTouches && e3.targetTouches.length > 1)
    return;
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
    swiper.emit("touchMoveOpposite", e3);
  }
  if (typeof data.startMoving === "undefined") {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e3.cancelable) {
    e3.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e3.stopPropagation();
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
  const allowLoopFix = swiper.swipeDirection === "next" && swiper.allowSlideNext || swiper.swipeDirection === "prev" && swiper.allowSlidePrev;
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
        cancelable: true
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit("sliderFirstMove", e3);
  }
  let loopFixed;
  if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
    swiper.loopFix({
      direction: swiper.swipeDirection,
      setTranslate: true
    });
    loopFixed = true;
  }
  swiper.emit("sliderMove", e3);
  data.isMoved = true;
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (isLoop && allowLoopFix && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) {
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
    if (isLoop && allowLoopFix && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) {
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
    e3.preventedByNestedSwiper = true;
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
  const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === event2.pointerId);
  if (pointerIndex >= 0) {
    data.evCache.splice(pointerIndex, 1);
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(event2.type)) {
    const proceed = ["pointercancel", "contextmenu"].includes(event2.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
    if (!proceed) {
      return;
    }
  }
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (!params.simulateTouch && event2.pointerType === "mouse")
    return;
  let e3 = event2;
  if (e3.originalEvent)
    e3 = e3.originalEvent;
  if (data.allowTouchCallbacks) {
    swiper.emit("touchEnd", e3);
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
    const pathTree = e3.path || e3.composedPath && e3.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e3.target, pathTree);
    swiper.emit("tap click", e3);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit("doubleTap doubleClick", e3);
    }
  }
  data.lastClickTime = now();
  nextTick2(() => {
    if (!swiper.destroyed)
      swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
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
  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];
  for (let i3 = 0; i3 < slidesGrid.length; i3 += i3 < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment2 = i3 < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i3 + increment2] !== "undefined") {
      if (currentPos >= slidesGrid[i3] && currentPos < slidesGrid[i3 + increment2]) {
        stopIndex = i3;
        groupSize = slidesGrid[i3 + increment2] - slidesGrid[i3];
      }
    } else if (currentPos >= slidesGrid[i3]) {
      stopIndex = i3;
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
    const isNavButtonTarget = swiper.navigation && (e3.target === swiper.navigation.nextEl || e3.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === "next") {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === "prev") {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e3.target === swiper.navigation.nextEl) {
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
    el: el3
  } = swiper;
  if (el3 && el3.offsetWidth === 0)
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
function onClick(e3) {
  const swiper = this;
  if (!swiper.enabled)
    return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks)
      e3.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e3.stopPropagation();
      e3.stopImmediatePropagation();
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
function onLoad(e3) {
  const swiper = this;
  processLazyPreloader(swiper, e3.target);
  if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
    return;
  }
  swiper.update();
}
var dummyEventAttached = false;
function dummyEventListener() {
}
var events = (swiper, method) => {
  const document2 = getDocument();
  const {
    params,
    el: el3,
    wrapperEl,
    device
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
  const swiperMethod = method;
  el3[domMethod]("pointerdown", swiper.onTouchStart, {
    passive: false
  });
  document2[domMethod]("pointermove", swiper.onTouchMove, {
    passive: false,
    capture
  });
  document2[domMethod]("pointerup", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointercancel", swiper.onTouchEnd, {
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
    el3[domMethod]("click", swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]("scroll", swiper.onScroll);
  }
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
  } else {
    swiper[swiperMethod]("observerUpdate", onResize, true);
  }
  el3[domMethod]("load", swiper.onLoad, {
    capture: true
  });
};
function attachEvents() {
  const swiper = this;
  const document2 = getDocument();
  const {
    params
  } = swiper;
  swiper.onTouchStart = onTouchStart.bind(swiper);
  swiper.onTouchMove = onTouchMove.bind(swiper);
  swiper.onTouchEnd = onTouchEnd.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }
  swiper.onClick = onClick.bind(swiper);
  swiper.onLoad = onLoad.bind(swiper);
  if (!dummyEventAttached) {
    document2.addEventListener("touchstart", dummyEventListener);
    dummyEventAttached = true;
  }
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
    el: el3
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
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el3.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el3.classList.add(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
      el3.classList.add(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
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
  points.sort((a3, b3) => parseInt(a3.value, 10) - parseInt(b3.value, 10));
  for (let i3 = 0; i3 < points.length; i3 += 1) {
    const {
      point,
      value
    } = points[i3];
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
    el: el3,
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
  el3.classList.add(...classNames);
  swiper.emitContainerClasses();
}
function removeClasses() {
  const swiper = this;
  const {
    el: el3,
    classNames
  } = swiper;
  el3.classList.remove(...classNames);
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
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
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
  loopedSlides: null,
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
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
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
    let el3;
    let params;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
      params = args[0];
    } else {
      [el3, params] = args;
    }
    if (!params)
      params = {};
    params = extend2({}, params);
    if (el3 && !params.el)
      params.el = el3;
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
      el: el3,
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
        evCache: []
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
      let slideSize = slides[activeIndex] ? slides[activeIndex].swiperSlideSize : 0;
      let breakLoop;
      for (let i3 = activeIndex + 1; i3 < slides.length; i3 += 1) {
        if (slides[i3] && !breakLoop) {
          slideSize += slides[i3].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
      for (let i3 = activeIndex - 1; i3 >= 0; i3 -= 1) {
        if (slides[i3] && !breakLoop) {
          slideSize += slides[i3].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
    } else {
      if (view === "current") {
        for (let i3 = activeIndex + 1; i3 < slides.length; i3 += 1) {
          const slideInView = exact ? slidesGrid[i3] + slidesSizesGrid[i3] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i3] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        for (let i3 = activeIndex - 1; i3 >= 0; i3 -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i3] < swiperSize;
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
    let el3 = element || swiper.params.el;
    if (typeof el3 === "string") {
      el3 = document.querySelector(el3);
    }
    if (!el3) {
      return false;
    }
    el3.swiper = swiper;
    if (el3.parentNode && el3.parentNode.host && el3.parentNode.host.nodeName === "SWIPER-CONTAINER") {
      swiper.isElement = true;
    }
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
    };
    const getWrapper = () => {
      if (el3 && el3.shadowRoot && el3.shadowRoot.querySelector) {
        const res = el3.shadowRoot.querySelector(getWrapperSelector());
        return res;
      }
      return elementChildren(el3, getWrapperSelector())[0];
    };
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = createElement("div", swiper.params.wrapperClass);
      el3.append(wrapperEl);
      elementChildren(el3, `.${swiper.params.slideClass}`).forEach((slideEl) => {
        wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      el: el3,
      wrapperEl,
      slidesEl: swiper.isElement && !el3.parentNode.host.slideSlots ? el3.parentNode.host : wrapperEl,
      hostEl: swiper.isElement ? el3.parentNode.host : el3,
      mounted: true,
      // RTL
      rtl: el3.dir.toLowerCase() === "rtl" || elementStyle(el3, "direction") === "rtl",
      rtlTranslate: swiper.params.direction === "horizontal" && (el3.dir.toLowerCase() === "rtl" || elementStyle(el3, "direction") === "rtl"),
      wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
    });
    return true;
  }
  init(el3) {
    const swiper = this;
    if (swiper.initialized)
      return swiper;
    const mounted = swiper.mount(el3);
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
        imageEl.addEventListener("load", (e3) => {
          processLazyPreloader(swiper, e3.target);
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
      el: el3,
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
      el3.removeAttribute("style");
      wrapperEl.removeAttribute("style");
      if (slides && slides.length) {
        slides.forEach((slideEl) => {
          slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
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
      module.forEach((m3) => _Swiper.installModule(m3));
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

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/shared/update-swiper.mjs
var paramsList = [
  "eventsPrefix",
  "injectStyles",
  "injectStylesUrls",
  "modules",
  "init",
  "_direction",
  "oneWayMovement",
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
  "loopedSlides",
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
  "slideNextClass",
  "slidePrevClass",
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
  const classes2 = classNames.split(" ").map((c3) => c3.trim()).filter((c3) => !!c3);
  const unique = [];
  classes2.forEach((c3) => {
    if (unique.indexOf(c3) < 0)
      unique.push(c3);
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
      extend3(currentParams[key], passedParams[key]);
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

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/shared/update-on-virtual-data.mjs
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
    el: el3,
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
  swiper.init(el3);
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

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/swiper-vue.mjs
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
      } else if (vnode.type && (vnode.type.name === "SwiperSlide" || vnode.type.name === "AsyncComponentWrapper")) {
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
    to: to2
  } = virtualData;
  const loopFrom = swiperRef.value.params.loop ? -slides.length : 0;
  const loopTo = swiperRef.value.params.loop ? slides.length * 2 : slides.length;
  const slidesToRender = [];
  for (let i3 = loopFrom; i3 < loopTo; i3 += 1) {
    if (i3 >= from && i3 <= to2) {
      slidesToRender.push(slides[getSlideIndex(i3)]);
    }
  }
  return slidesToRender.map((slide2) => {
    if (!slide2.props)
      slide2.props = {};
    if (!slide2.props.style)
      slide2.props.style = {};
    slide2.props.swiperRef = swiperRef;
    slide2.props.style = style;
    return h(slide2.type, {
      ...slide2.props
    }, slide2.children);
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
  emits: ["_beforeBreakpoint", "_containerClasses", "_slideClass", "_slideClasses", "_swiper", "_freeModeNoMomentumRelease", "activeIndexChange", "afterInit", "autoplay", "autoplayStart", "autoplayStop", "autoplayPause", "autoplayResume", "autoplayTimeLeft", "beforeDestroy", "beforeInit", "beforeLoopFix", "beforeResize", "beforeSlideChangeStart", "beforeTransitionStart", "breakpoint", "breakpointsBase", "changeDirection", "click", "disable", "doubleTap", "doubleClick", "destroy", "enable", "fromEdge", "hashChange", "hashSet", "init", "keyPress", "lock", "loopFix", "momentumBounce", "navigationHide", "navigationShow", "navigationPrev", "navigationNext", "observerUpdate", "orientationchange", "paginationHide", "paginationRender", "paginationShow", "paginationUpdate", "progress", "reachBeginning", "reachEnd", "realIndexChange", "resize", "scroll", "scrollbarDragEnd", "scrollbarDragMove", "scrollbarDragStart", "setTransition", "setTranslate", "slideChange", "slideChangeTransitionEnd", "slideChangeTransitionStart", "slideNextTransitionEnd", "slideNextTransitionStart", "slidePrevTransitionEnd", "slidePrevTransitionStart", "slideResetTransitionStart", "slideResetTransitionEnd", "sliderMove", "sliderFirstMove", "slidesLengthChange", "slidesGridLengthChange", "snapGridLengthChange", "snapIndexChange", "swiper", "tap", "toEdge", "touchEnd", "touchMove", "touchMoveOpposite", "touchStart", "transitionEnd", "transitionStart", "unlock", "update", "virtualUpdate", "zoomChange"],
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
      const changedParams = getChangedParams(newPassedParams, oldPassedParamsRef.value, slidesRef.value, oldSlidesRef.value, (c3) => c3.props && c3.props.key);
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
    function updateClasses(swiper, el3, classNames) {
      if (el3 === slideElRef.value) {
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

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/shared/create-element-if-not-defined.mjs
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

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/modules/navigation.mjs
function Navigation(_ref) {
  let {
    swiper,
    extendParams,
    on,
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
  const makeElementsArray = (el3) => (Array.isArray(el3) ? el3 : [el3]).filter((e3) => !!e3);
  function getEl(el3) {
    let res;
    if (el3 && typeof el3 === "string" && swiper.isElement) {
      res = swiper.el.querySelector(el3);
      if (res)
        return res;
    }
    if (el3) {
      if (typeof el3 === "string")
        res = [...document.querySelectorAll(el3)];
      if (swiper.params.uniqueNavElements && typeof el3 === "string" && res.length > 1 && swiper.el.querySelectorAll(el3).length === 1) {
        res = swiper.el.querySelector(el3);
      }
    }
    if (el3 && !res)
      return el3;
    return res;
  }
  function toggleEl(el3, disabled) {
    const params = swiper.params.navigation;
    el3 = makeElementsArray(el3);
    el3.forEach((subEl) => {
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
  function onPrevClick(e3) {
    e3.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
      return;
    swiper.slidePrev();
    emit("navigationPrev");
  }
  function onNextClick(e3) {
    e3.preventDefault();
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
    const initButton = (el3, dir) => {
      if (el3) {
        el3.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el3) {
        el3.classList.add(...params.lockClass.split(" "));
      }
    };
    nextEl.forEach((el3) => initButton(el3, "next"));
    prevEl.forEach((el3) => initButton(el3, "prev"));
  }
  function destroy() {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const destroyButton = (el3, dir) => {
      el3.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      el3.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
    };
    nextEl.forEach((el3) => destroyButton(el3, "next"));
    prevEl.forEach((el3) => destroyButton(el3, "prev"));
  }
  on("init", () => {
    if (swiper.params.navigation.enabled === false) {
      disable();
    } else {
      init();
      update2();
    }
  });
  on("toEdge fromEdge lock unlock", () => {
    update2();
  });
  on("destroy", () => {
    destroy();
  });
  on("enable disable", () => {
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
    [...nextEl, ...prevEl].filter((el3) => !!el3).forEach((el3) => el3.classList.add(swiper.params.navigation.lockClass));
  });
  on("click", (_s, e3) => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const targetEl = e3.target;
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
      [...nextEl, ...prevEl].filter((el3) => !!el3).forEach((el3) => el3.classList.toggle(swiper.params.navigation.hiddenClass));
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

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/shared/classes-to-selector.mjs
function classesToSelector(classes2) {
  if (classes2 === void 0) {
    classes2 = "";
  }
  return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/modules/pagination.mjs
function Pagination(_ref) {
  let {
    swiper,
    extendParams,
    on,
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
  const makeElementsArray = (el3) => (Array.isArray(el3) ? el3 : [el3]).filter((e3) => !!e3);
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
  function onBulletClick(e3) {
    const bulletEl = e3.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
    if (!bulletEl) {
      return;
    }
    e3.preventDefault();
    const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index)
        return;
      const realIndex = swiper.realIndex;
      const newSlideIndex = swiper.getSlideIndexByData(index);
      const currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);
      const loopFix2 = (dir) => {
        const indexBeforeLoopFix = swiper.activeIndex;
        swiper.loopFix({
          direction: dir,
          activeSlideIndex: newSlideIndex,
          slideTo: false
        });
        const indexAfterFix = swiper.activeIndex;
        if (indexBeforeLoopFix === indexAfterFix) {
          swiper.slideToLoop(realIndex, 0, false, true);
        }
      };
      if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) {
        loopFix2(newSlideIndex > currentSlideIndex ? "next" : "prev");
      } else if (swiper.params.centeredSlides) {
        const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
        if (newSlideIndex < Math.floor(slidesPerView / 2)) {
          loopFix2("prev");
        }
      }
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
    let el3 = swiper.pagination.el;
    el3 = makeElementsArray(el3);
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
        el3.forEach((subEl) => {
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
        const classesToRemove = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => `${params.bulletActiveClass}${suffix}`)].map((s3) => typeof s3 === "string" && s3.includes(" ") ? s3.split(" ") : s3).flat();
        bulletEl.classList.remove(...classesToRemove);
      });
      if (el3.length > 1) {
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
          for (let i3 = firstIndex; i3 <= lastIndex; i3 += 1) {
            if (bullets[i3]) {
              bullets[i3].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
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
    el3.forEach((subEl, subElIndex) => {
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
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    let el3 = swiper.pagination.el;
    el3 = makeElementsArray(el3);
    let paginationHTML = "";
    if (params.type === "bullets") {
      let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (let i3 = 0; i3 < numberOfBullets; i3 += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i3, params.bulletClass);
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
    el3.forEach((subEl) => {
      if (params.type !== "custom") {
        subEl.innerHTML = paginationHTML || "";
      }
      if (params.type === "bullets") {
        swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
      }
    });
    if (params.type !== "custom") {
      emit("paginationRender", el3[0]);
    }
  }
  function init() {
    swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: "swiper-pagination"
    });
    const params = swiper.params.pagination;
    if (!params.el)
      return;
    let el3;
    if (typeof params.el === "string" && swiper.isElement) {
      el3 = swiper.el.querySelector(params.el);
    }
    if (!el3 && typeof params.el === "string") {
      el3 = [...document.querySelectorAll(params.el)];
    }
    if (!el3) {
      el3 = params.el;
    }
    if (!el3 || el3.length === 0)
      return;
    if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el3) && el3.length > 1) {
      el3 = [...swiper.el.querySelectorAll(params.el)];
      if (el3.length > 1) {
        el3 = el3.filter((subEl) => {
          if (elementParents(subEl, ".swiper")[0] !== swiper.el)
            return false;
          return true;
        })[0];
      }
    }
    if (Array.isArray(el3) && el3.length === 1)
      el3 = el3[0];
    Object.assign(swiper.pagination, {
      el: el3
    });
    el3 = makeElementsArray(el3);
    el3.forEach((subEl) => {
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
    let el3 = swiper.pagination.el;
    if (el3) {
      el3 = makeElementsArray(el3);
      el3.forEach((subEl) => {
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
  on("changeDirection", () => {
    if (!swiper.pagination || !swiper.pagination.el)
      return;
    const params = swiper.params.pagination;
    let {
      el: el3
    } = swiper.pagination;
    el3 = makeElementsArray(el3);
    el3.forEach((subEl) => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on("init", () => {
    if (swiper.params.pagination.enabled === false) {
      disable();
    } else {
      init();
      render2();
      update2();
    }
  });
  on("activeIndexChange", () => {
    if (typeof swiper.snapIndex === "undefined") {
      update2();
    }
  });
  on("snapIndexChange", () => {
    update2();
  });
  on("snapGridLengthChange", () => {
    render2();
    update2();
  });
  on("destroy", () => {
    destroy();
  });
  on("enable disable", () => {
    let {
      el: el3
    } = swiper.pagination;
    if (el3) {
      el3 = makeElementsArray(el3);
      el3.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
    }
  });
  on("lock unlock", () => {
    update2();
  });
  on("click", (_s, e3) => {
    const targetEl = e3.target;
    const el3 = makeElementsArray(swiper.pagination.el);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el3 && el3.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
        return;
      const isHidden = el3[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit("paginationShow");
      } else {
        emit("paginationHide");
      }
      el3.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    let {
      el: el3
    } = swiper.pagination;
    if (el3) {
      el3 = makeElementsArray(el3);
      el3.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
    }
    init();
    render2();
    update2();
  };
  const disable = () => {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    let {
      el: el3
    } = swiper.pagination;
    if (el3) {
      el3 = makeElementsArray(el3);
      el3.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
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

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/modules/autoplay.mjs
function Autoplay(_ref) {
  let {
    swiper,
    extendParams,
    on,
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
      disableOnInteraction: true,
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
  let autoplayStartTime = (/* @__PURE__ */ new Date()).getTime;
  let wasPaused;
  let isTouched;
  let pausedByTouch;
  let touchStartTimeout;
  let slideChanged;
  let pausedByInteraction;
  function onTransitionEnd(e3) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl)
      return;
    if (e3.target !== swiper.wrapperEl)
      return;
    swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
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
  const onPointerEnter = (e3) => {
    if (e3.pointerType !== "mouse")
      return;
    pausedByInteraction = true;
    if (swiper.animating || swiper.autoplay.paused)
      return;
    pause(true);
  };
  const onPointerLeave = (e3) => {
    if (e3.pointerType !== "mouse")
      return;
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
  on("init", () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
      start();
    }
  });
  on("destroy", () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on("beforeTransitionStart", (_s, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on("sliderFirstMove", () => {
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
  on("touchEnd", () => {
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
  on("slideChange", () => {
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

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/shared/effect-init.mjs
function effectInit(params) {
  const {
    effect,
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams
  } = params;
  on("beforeInit", () => {
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
  on("setTranslate", () => {
    if (swiper.params.effect !== effect)
      return;
    setTranslate2();
  });
  on("setTransition", (_s, duration) => {
    if (swiper.params.effect !== effect)
      return;
    setTransition2(duration);
  });
  on("transitionEnd", () => {
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
  on("virtualUpdate", () => {
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

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/shared/effect-target.mjs
function effectTarget(effectParams, slideEl) {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = "hidden";
    transformEl.style["-webkit-backface-visibility"] = "hidden";
  }
  return transformEl;
}

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/shared/effect-virtual-transition-end.mjs
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
  const getSlide = (el3) => {
    if (!el3.parentElement) {
      const slide2 = swiper.slides.filter((slideEl) => slideEl.shadowRoot && slideEl.shadowRoot === el3.parentNode)[0];
      return slide2;
    }
    return el3.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter((transformEl) => {
        const el3 = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
        return swiper.getSlideIndex(el3) === activeIndex;
      });
    }
    transitionEndTarget.forEach((el3) => {
      elementTransitionEnd(el3, () => {
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

// node_modules/.pnpm/swiper@10.3.1/node_modules/swiper/modules/effect-fade.mjs
function EffectFade(_ref) {
  let {
    swiper,
    extendParams,
    on
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
    for (let i3 = 0; i3 < slides.length; i3 += 1) {
      const slideEl = swiper.slides[i3];
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
    transformElements.forEach((el3) => {
      el3.style.transitionDuration = `${duration}ms`;
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
    on,
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

// node_modules/.pnpm/vue-amazing-ui@0.1.17/node_modules/vue-amazing-ui/dist/vue-amazing-ui.js
function M6(l = Date.now(), a3 = "YYYY-MM-DD HH:mm:ss") {
  if (typeof l == "number" || typeof l == "string")
    var e3 = new Date(l);
  else
    e3 = l;
  function s3(n) {
    return n < 10 ? "0" + n : String(n);
  }
  var c3 = a3;
  if (c3.includes("SSS")) {
    const n = e3.getMilliseconds();
    c3 = c3.replace("SSS", "0".repeat(3 - String(n).length) + n);
  }
  if (c3.includes("YY")) {
    const n = e3.getFullYear();
    c3 = c3.includes("YYYY") ? c3.replace("YYYY", String(n)) : c3.replace("YY", String(n).slice(2, 4));
  }
  if (c3.includes("M")) {
    const n = e3.getMonth() + 1;
    c3 = c3.includes("MM") ? c3.replace("MM", s3(n)) : c3.replace("M", String(n));
  }
  if (c3.includes("D")) {
    const n = e3.getDate();
    c3 = c3.includes("DD") ? c3.replace("DD", s3(n)) : c3.replace("D", String(n));
  }
  if (c3.includes("H")) {
    const n = e3.getHours();
    c3 = c3.includes("HH") ? c3.replace("HH", s3(n)) : c3.replace("H", String(n));
  }
  if (c3.includes("m")) {
    var u3 = e3.getMinutes();
    c3 = c3.includes("mm") ? c3.replace("mm", s3(u3)) : c3.replace("m", String(u3));
  }
  if (c3.includes("s")) {
    var o = e3.getSeconds();
    c3 = c3.includes("ss") ? c3.replace("ss", s3(o)) : c3.replace("s", String(o));
  }
  return c3;
}
var de = typeof window < "u" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {
};
var R1 = typeof window < "u" ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {
};
function re(l, a3 = 0, e3 = false) {
  const s3 = typeof window < "u" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {
  };
  var c3 = null;
  const u3 = { id: s3(function o(n) {
    c3 || (c3 = n), n - c3 >= a3 ? (l(), e3 && (c3 = null, u3.id = s3(o))) : u3.id = s3(o);
  }) };
  return u3;
}
function me(l) {
  const a3 = typeof window < "u" ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {
  };
  l && l.id && a3(l.id);
}
function _6(l, a3 = 300) {
  var e3 = true;
  return function() {
    return e3 && (e3 = false, re(() => {
      l(), e3 = true;
    }, a3)), false;
  };
}
function z6(l, a3 = 300) {
  let e3 = null;
  return function() {
    e3 && me(e3), e3 = re(l, a3);
  };
}
function C6(l, a3) {
  const e3 = String(l).split(".")[1], s3 = String(a3).split(".")[1];
  let c3 = Math.max((e3 == null ? void 0 : e3.length) || 0, (s3 == null ? void 0 : s3.length) || 0), u3 = l.toFixed(c3), o = a3.toFixed(c3);
  return (+u3.replace(".", "") + +o.replace(".", "")) / Math.pow(10, c3);
}
function $6(l, a3) {
  var e3 = "";
  if (a3)
    e3 = a3;
  else {
    const c3 = l.split("?")[0].split("/");
    e3 = c3[c3.length - 1];
  }
  var s3 = new XMLHttpRequest();
  s3.open("GET", l, true), s3.responseType = "blob", s3.onload = function() {
    if (s3.status === 200) {
      const c3 = s3.response, u3 = document.createElement("a"), o = document.querySelector("body");
      u3.href = window.URL.createObjectURL(c3), u3.download = e3, u3.style.display = "none", o == null || o.appendChild(u3), u3.click(), o == null || o.removeChild(u3), window.URL.revokeObjectURL(u3.href);
    }
  }, s3.send();
}
function ga(l, a3 = 2, e3 = ",", s3 = ".", c3 = "", u3 = "") {
  if (Number(l) === 0)
    return Number(l).toFixed(a3);
  if (!l)
    return "";
  l = Number(l).toFixed(a3);
  const o = (l += "").split(".");
  let n = o[0];
  const d3 = o.length > 1 ? s3 + o[1] : "", f = /(\d+)(\d{3})/;
  if (e3 && (h5 = e3, Object.prototype.toString.call(h5) !== "[object Number]"))
    for (; f.test(n); )
      n = n.replace(f, "$1" + e3 + "$2");
  var h5;
  return c3 + n + d3 + u3;
}
function B6() {
  document.documentElement.classList.toggle("dark");
}
var ue = (l) => (pushScopeId("data-v-e2a4ec13"), l = l(), popScopeId(), l);
var ya = { key: 0, class: "m-icon" };
var ka2 = ["src"];
var ba2 = { key: 1, focusable: "false", class: "u-icon", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var wa2 = [ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var xa2 = { key: 2, focusable: "false", class: "u-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Ma2 = [ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var _a2 = { key: 3, focusable: "false", class: "u-icon", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var za = [ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var Ca2 = { key: 4, focusable: "false", class: "u-icon", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var $a2 = [ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var Ba2 = { key: 1, class: "m-big-icon" };
var Fa = ["src"];
var La = { key: 1, focusable: "false", class: "u-icon", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Sa2 = [ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), ue(() => createBaseVNode("path", { d: "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1))];
var Aa2 = { key: 2, focusable: "false", class: "u-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Da2 = [ue(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1)), ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var Ha = { key: 3, focusable: "false", class: "u-icon", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Ea = [ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), ue(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var Va = { key: 4, focusable: "false", class: "u-icon", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var ja = [ue(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1)), ue(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var Ia2 = { class: "m-content" };
var Ta2 = { class: "u-message" };
var Ra2 = { key: 0 };
var Wa = { key: 1, focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Oa2 = [ue(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var I2 = (l, a3) => {
  const e3 = l.__vccOpts || l;
  for (const [s3, c3] of a3)
    e3[s3] = c3;
  return e3;
};
var Ye2 = I2(defineComponent({ __name: "Alert", props: { message: { default: "" }, description: { default: "" }, type: { default: "info" }, closable: { type: Boolean, default: false }, closeText: { default: "" }, icon: { default: "" }, showIcon: { type: Boolean, default: false } }, emits: ["close"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = ref(), c3 = ref(), u3 = ref(1);
  function o(n) {
    s3.value.style.height = 0, s3.value.style.opacity = 0, a3("close", n);
  }
  return onMounted(() => {
    u3.value = c3.value.offsetHeight, e3.closable && nextTick(() => {
      s3.value.style.height = s3.value.offsetHeight + "px", s3.value.style.opacity = 1;
    });
  }), (n, d3) => (openBlock(), createElementBlock("div", { ref_key: "alert", ref: s3, class: "m-alert-wrapper" }, [createBaseVNode("div", { class: normalizeClass(["m-alert", [`${n.type}`, { "width-description": u3.value }]]) }, [n.showIcon ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [u3.value ? (openBlock(), createElementBlock("span", Ba2, [renderSlot(n.$slots, "icon", {}, () => [n.icon ? (openBlock(), createElementBlock("img", { key: 0, src: n.icon, class: "u-big-icon-img" }, null, 8, Fa)) : n.type === "info" ? (openBlock(), createElementBlock("svg", La, Sa2)) : n.type === "success" ? (openBlock(), createElementBlock("svg", Aa2, Da2)) : n.type === "warning" ? (openBlock(), createElementBlock("svg", Ha, Ea)) : n.type === "error" ? (openBlock(), createElementBlock("svg", Va, ja)) : createCommentVNode("", true)], true)])) : (openBlock(), createElementBlock("span", ya, [renderSlot(n.$slots, "icon", {}, () => [n.icon ? (openBlock(), createElementBlock("img", { key: 0, src: n.icon, class: "u-icon-img" }, null, 8, ka2)) : n.type === "info" ? (openBlock(), createElementBlock("svg", ba2, wa2)) : n.type === "success" ? (openBlock(), createElementBlock("svg", xa2, Ma2)) : n.type === "warning" ? (openBlock(), createElementBlock("svg", _a2, za)) : n.type === "error" ? (openBlock(), createElementBlock("svg", Ca2, $a2)) : createCommentVNode("", true)], true)]))], 64)) : createCommentVNode("", true), createBaseVNode("div", Ia2, [createBaseVNode("div", Ta2, [renderSlot(n.$slots, "message", {}, () => [createTextVNode(toDisplayString(n.message), 1)], true)]), u3.value ? (openBlock(), createElementBlock("div", { key: 0, class: "u-description", ref_key: "descRef", ref: c3 }, [renderSlot(n.$slots, "description", {}, () => [createTextVNode(toDisplayString(n.description), 1)], true)], 512)) : createCommentVNode("", true)]), n.closable ? (openBlock(), createElementBlock("a", { key: 1, class: "m-close", onClick: o }, [renderSlot(n.$slots, "closeText", {}, () => [n.closeText ? (openBlock(), createElementBlock("span", Ra2, toDisplayString(n.closeText), 1)) : (openBlock(), createElementBlock("svg", Wa, Oa2))], true)])) : createCommentVNode("", true)], 2)], 512));
} }), [["__scopeId", "data-v-e2a4ec13"]]);
Ye2.install = (l) => {
  l.component(Ye2.__name, Ye2);
};
var Na2 = ["src", "alt"];
var Ue = I2(defineComponent({ __name: "Avatar", props: { shape: { default: "circle" }, size: { default: "default" }, src: { default: "" }, alt: { default: "" }, icon: { default: void 0 } }, setup(l) {
  const a3 = l, e3 = ref(document.documentElement.clientWidth), s3 = ref(), c3 = ref(1), u3 = ref(), o = ref(1);
  function n() {
    e3.value = document.documentElement.clientWidth;
  }
  onMounted(() => {
    window.addEventListener("resize", n), a3.src || (c3.value = s3.value.offsetHeight, nextTick(() => {
      c3.value || (o.value = u3.value.offsetHeight);
    }));
  }), onUnmounted(() => {
    window.removeEventListener("resize", n);
  });
  const d3 = computed(() => {
    if (typeof a3.size == "string")
      return null;
    if (typeof a3.size == "number")
      return c3.value ? { width: a3.size + "px", height: a3.size + "px", lineHeight: a3.size + "px", fontSize: a3.size / 2 + "px" } : { width: a3.size + "px", height: a3.size + "px", lineHeight: a3.size + "px", fontSize: "18px" };
    if (typeof a3.size == "object") {
      let h5 = 32;
      return e3.value >= 1600 && a3.size.xxl ? h5 = a3.size.xxl : e3.value >= 1200 && a3.size.xl ? h5 = a3.size.xl : e3.value >= 992 && a3.size.lg ? h5 = a3.size.lg : e3.value >= 768 && a3.size.md ? h5 = a3.size.md : e3.value >= 576 && a3.size.sm ? h5 = a3.size.sm : e3.value < 576 && a3.size.xs && (h5 = a3.size.xs), { width: h5 + "px", height: h5 + "px", lineHeight: h5 + "px", fontSize: h5 / 2 + "px" };
    }
  }), f = computed(() => {
    if (typeof a3.size == "string")
      return { transform: "scale(1) translateX(-50%)" };
    if (typeof a3.size == "number") {
      const h5 = Math.min(1, Math.max(0.022222222222222223, (1 + 1 * (a3.size - 9)) / 45));
      return { lineHeight: a3.size + "px", transform: `scale(${h5}) translateX(-50%)` };
    }
  });
  return (h5, w3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-avatar", [d3.value === null ? "avatar-" + h5.size : "", "avatar-" + h5.shape, { "avatar-image": h5.src }]]), style: normalizeStyle(d3.value || {}) }, [h5.src ? (openBlock(), createElementBlock("img", { key: 0, class: "u-image", src: h5.src, alt: h5.alt }, null, 8, Na2)) : createCommentVNode("", true), !h5.src && c3.value ? (openBlock(), createElementBlock("span", { key: 1, class: "m-icon", ref_key: "iconRef", ref: s3 }, [renderSlot(h5.$slots, "icon", {}, void 0, true)], 512)) : createCommentVNode("", true), h5.src || c3.value || !o.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", { key: 2, class: "m-string", style: normalizeStyle(f.value), ref_key: "strRef", ref: u3 }, [renderSlot(h5.$slots, "default", {}, void 0, true)], 4))], 6));
} }), [["__scopeId", "data-v-98fa5874"]]);
Ue.install = (l) => {
  l.component(Ue.__name, Ue);
};
var qa = ((l) => (pushScopeId("data-v-05696e1d"), l = l(), popScopeId(), l))(() => createBaseVNode("span", { class: "m-icon" }, [createBaseVNode("svg", { class: "u-icon", viewBox: "0 0 24 24", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xlinkHref: "http://www.w3.org/1999/xlink" }, [createBaseVNode("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, [createBaseVNode("g", { transform: "translate(-139.000000, -4423.000000)", "fill-rule": "nonzero" }, [createBaseVNode("g", { transform: "translate(120.000000, 4285.000000)" }, [createBaseVNode("g", { transform: "translate(7.000000, 126.000000)" }, [createBaseVNode("g", { transform: "translate(24.000000, 24.000000) scale(1, -1) translate(-24.000000, -24.000000) translate(12.000000, 12.000000)" }, [createBaseVNode("g", { transform: "translate(4.000000, 2.000000)" }, [createBaseVNode("path", { d: "M8,0 C8.51283584,0 8.93550716,0.38604019 8.99327227,0.883378875 L9,1 L9,10.584 L12.2928932,7.29289322 C12.6834175,6.90236893 13.3165825,6.90236893 13.7071068,7.29289322 C14.0675907,7.65337718 14.0953203,8.22060824 13.7902954,8.61289944 L13.7071068,8.70710678 L8.70710678,13.7071068 L8.62544899,13.7803112 L8.618,13.784 L8.59530661,13.8036654 L8.4840621,13.8753288 L8.37133602,13.9287745 L8.22929083,13.9735893 L8.14346259,13.9897165 L8.03324678,13.9994506 L7.9137692,13.9962979 L7.77070917,13.9735893 L7.6583843,13.9401293 L7.57677845,13.9063266 L7.47929125,13.8540045 L7.4048407,13.8036865 L7.38131006,13.7856883 C7.35030318,13.7612383 7.32077858,13.7349921 7.29289322,13.7071068 L2.29289322,8.70710678 L2.20970461,8.61289944 C1.90467972,8.22060824 1.93240926,7.65337718 2.29289322,7.29289322 C2.65337718,6.93240926 3.22060824,6.90467972 3.61289944,7.20970461 L3.70710678,7.29289322 L7,10.585 L7,1 L7.00672773,0.883378875 C7.06449284,0.38604019 7.48716416,0 8,0 Z" }), createBaseVNode("path", { d: "M14.9333333,15.9994506 C15.5224371,15.9994506 16,16.4471659 16,16.9994506 C16,17.5122865 15.5882238,17.9349578 15.0577292,17.9927229 L14.9333333,17.9994506 L1.06666667,17.9994506 C0.477562934,17.9994506 0,17.5517354 0,16.9994506 C0,16.4866148 0.411776203,16.0639435 0.9422708,16.0061783 L1.06666667,15.9994506 L14.9333333,15.9994506 Z" })])])])])])])])], -1));
var Ke = I2(defineComponent({ __name: "BackTop", props: { bottom: { default: 40 }, right: { default: 40 }, visibilityHeight: { default: 180 }, to: { default: "body" }, listenTo: { default: void 0 } }, emits: ["click", "show"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = computed(() => typeof e3.bottom == "number" ? e3.bottom + "px" : e3.bottom), c3 = computed(() => typeof e3.right == "number" ? e3.right + "px" : e3.right), u3 = ref(), o = ref(0), n = ref();
  watchEffect(() => {
    nextTick(() => {
      var k3;
      e3.listenTo === void 0 ? n.value = h5((k3 = u3.value) == null ? void 0 : k3.parentElement) : typeof e3.listenTo == "string" ? n.value = typeof document < "u" ? document.getElementsByTagName(e3.listenTo)[0] : null : e3.listenTo instanceof HTMLElement && (n.value = e3.listenTo), n.value && (function(v) {
        const p = { attributes: true, subtree: true };
        new MutationObserver(function(y3, x3) {
          o.value = n.value.scrollTop;
        }).observe(v, p);
      }(n.value), n.value.addEventListener("scroll", (v) => {
        o.value = v.target.scrollTop;
      }));
    });
  });
  const d3 = ref();
  watchEffect(() => {
    nextTick(() => {
      typeof e3.to == "string" ? d3.value = typeof document < "u" ? document.getElementsByTagName(e3.to)[0] : null : e3.to instanceof HTMLElement && (d3.value = e3.to), d3.value && d3.value.insertAdjacentElement("beforeend", u3.value);
    });
  }), onBeforeUnmount(() => {
    u3.value.remove();
  });
  const f = computed(() => o.value >= e3.visibilityHeight);
  function h5(k3) {
    return k3 ? k3.scrollHeight > k3.clientHeight ? k3 : h5(k3.parentElement) : null;
  }
  function w3() {
    n.value && n.value.scrollTo({ top: 0, behavior: "smooth" }), a3("click");
  }
  return watch(f, (k3) => {
    a3("show", k3);
  }), (k3, v) => (openBlock(), createBlock(Transition, null, { default: withCtx(() => [withDirectives(createBaseVNode("div", { ref_key: "backtop", ref: u3, onClick: w3, class: "m-backtop", style: normalizeStyle(`bottom: ${s3.value}; right: ${c3.value};`) }, [renderSlot(k3.$slots, "default", {}, () => [qa], true)], 4), [[vShow, f.value]])]), _: 3 }));
} }), [["__scopeId", "data-v-05696e1d"]]);
Ke.install = (l) => {
  l.component(Ke.__name, Ke);
};
var Pa2 = { class: "u-status-text" };
var Ya2 = ["title"];
var Ua = { key: 0, class: "m-number", style: { transition: "none 0s ease 0s" } };
var Ka = { class: "u-number" };
var Ge2 = I2(defineComponent({ __name: "Badge", props: { color: { default: "" }, count: { default: 0 }, max: { default: 99 }, showZero: { type: Boolean, default: false }, dot: { type: Boolean, default: false }, status: { default: void 0 }, text: { default: "" }, countStyle: { default: () => ({}) }, title: { default: "" }, ripple: { type: Boolean, default: true } }, setup(l) {
  const a3 = l, e3 = ["pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"], s3 = computed(() => {
    if (a3.color && !e3.includes(a3.color))
      return { color: a3.color, backgroundColor: a3.color };
  }), c3 = ref(), u3 = ref(1), o = ref(), n = ref(1);
  return onMounted(() => {
    a3.status || a3.color || (u3.value = c3.value.offsetHeight, n.value = o.value.offsetHeight);
  }), (d3, f) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-badge", { "badge-status": d3.status }]) }, [d3.status || d3.color ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("span", { class: normalizeClass(["u-status-dot", [`status-${d3.status || d3.color}`, { "dot-ripple": d3.ripple }]]), style: normalizeStyle(s3.value) }, null, 6), createBaseVNode("span", Pa2, [renderSlot(d3.$slots, "default", {}, () => [createTextVNode(toDisplayString(d3.text), 1)], true)])], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [u3.value ? (openBlock(), createElementBlock("span", { key: 0, ref_key: "contentRef", ref: c3 }, [renderSlot(d3.$slots, "default", {}, void 0, true)], 512)) : createCommentVNode("", true), n.value ? (openBlock(), createElementBlock("span", { key: 1, ref_key: "countRef", ref: o, class: normalizeClass(["m-count", { "only-number": !u3.value }]) }, [renderSlot(d3.$slots, "count", {}, void 0, true)], 2)) : (openBlock(), createBlock(Transition, { key: 2, name: "zoom" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-badge-count", { "small-num": d3.count < 10, "only-number": !u3.value, "only-dot": d3.count === 0 && !d3.showZero }]), style: normalizeStyle(d3.countStyle), title: d3.title || String(d3.count) }, [d3.dot ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", Ua, [createBaseVNode("span", Ka, toDisplayString(d3.count > d3.max ? d3.max + "+" : d3.count), 1)]))], 14, Ya2), [[vShow, d3.showZero || d3.count !== 0 || d3.dot]])]), _: 1 }))], 64))], 2));
} }), [["__scopeId", "data-v-222106a4"]]);
Ge2.install = (l) => {
  l.component(Ge2.__name, Ge2);
};
var ta2 = (l) => (pushScopeId("data-v-d8af300c"), l = l(), popScopeId(), l);
var Ga = ["href", "title", "target"];
var Ja = { key: 0, class: "u-separator" };
var Za = { key: 1, class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "right", "aria-hidden": "true", focusable: "false" };
var Xa = [ta2(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1))];
var Qa2 = ta2(() => createBaseVNode("div", { class: "assist" }, null, -1));
var Je2 = I2(defineComponent({ __name: "Breadcrumb", props: { routes: { default: () => [] }, fontSize: { default: 14 }, height: { default: 21 }, maxWidth: { default: 180 }, separator: { default: "" }, target: { default: "_self" } }, setup(l) {
  const a3 = l, e3 = computed(() => a3.routes.length);
  function s3(c3) {
    var u3 = c3.path;
    if (c3.query && JSON.stringify(c3.query) !== "{}") {
      const o = c3.query;
      Object.keys(o).forEach((n, d3) => {
        u3 = d3 === 0 ? u3 + "?" + n + "=" + o[n] : u3 + "&" + n + "=" + o[n];
      });
    }
    return u3;
  }
  return (c3, u3) => (openBlock(), createElementBlock("div", { class: "m-breadcrumb", style: normalizeStyle(`height: ${c3.height}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(c3.routes, (o, n) => (openBlock(), createElementBlock("div", { class: "m-bread", key: n }, [createBaseVNode("a", { class: normalizeClass(["u-route", { active: n === e3.value - 1 }]), style: normalizeStyle(`font-size: ${c3.fontSize}px; max-width: ${c3.maxWidth}px;`), href: n === e3.value - 1 ? "javascript:;" : s3(o), title: o.name, target: n === e3.value - 1 ? "_self" : c3.target }, toDisplayString(o.name || "--"), 15, Ga), n !== e3.value - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [c3.separator ? (openBlock(), createElementBlock("span", Ja, toDisplayString(c3.separator), 1)) : (openBlock(), createElementBlock("svg", Za, Xa))], 64)) : createCommentVNode("", true)]))), 128)), Qa2], 4));
} }), [["__scopeId", "data-v-d8af300c"]]);
Je2.install = (l) => {
  l.component(Je2.__name, Je2);
};
var el2 = ["href", "target", "disabled"];
var al2 = { class: "u-spin-circle" };
var ll2 = { class: "u-text" };
var fe = I2(defineComponent({ __name: "Button", props: { name: { default: "按钮" }, type: { default: "default" }, effect: { default: "fade" }, size: { default: "middle" }, route: { default: () => ({}) }, target: { default: "_self" }, disabled: { type: Boolean, default: false }, loading: { type: Boolean, default: false }, center: { type: Boolean, default: false } }, emits: ["click"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = computed(() => JSON.stringify(e3.route) !== "{}");
  function c3(o) {
    s3.value || a3("click", o);
  }
  function u3(o) {
    var n = o.path;
    if (o.query && JSON.stringify(o.query) !== "{}") {
      const d3 = o.query;
      Object.keys(d3).forEach((f, h5) => {
        n = h5 === 0 ? n + "?" + f + "=" + d3[f] : n + "&" + f + "=" + d3[f];
      });
    }
    return n;
  }
  return (o, n) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-btn-wrap", { center: o.center }]) }, [createBaseVNode("a", { onClick: c3, href: u3(o.route), target: s3.value ? o.target : "_self", disabled: o.disabled, class: normalizeClass(["m-btn", [o.type, o.size, { [o.effect]: o.type === "default", disabled: o.disabled, "m-btn-loading": !s3.value && o.loading }]]) }, [withDirectives(createBaseVNode("span", { class: normalizeClass(["m-loading-icon", { "show-spin": o.loading }]) }, [withDirectives(createBaseVNode("span", al2, null, 512), [[vShow, o.loading]])], 2), [[vShow, !s3.value]]), createBaseVNode("span", ll2, [renderSlot(o.$slots, "default", {}, () => [createTextVNode(toDisplayString(o.name), 1)], true)])], 10, el2)], 2));
} }), [["__scopeId", "data-v-6d3cf291"]]);
fe.install = (l) => {
  l.component(fe.__name, fe);
};
var tl2 = { class: "u-title" };
var sl2 = { class: "u-extra" };
var Ze = I2(defineComponent({ __name: "Card", props: { width: { default: "auto" }, bordered: { type: Boolean, default: true }, extra: { default: "" }, size: { default: "default" }, title: { default: "" }, headStyle: { default: () => ({}) }, bodyStyle: { default: () => ({}) } }, setup(l) {
  const a3 = l, e3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), s3 = ref(), c3 = ref(1);
  return onMounted(() => {
    c3.value = s3.value.offsetHeight;
  }), (u3, o) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-card", { bordered: u3.bordered, "m-small-card": u3.size === "small" }]), style: normalizeStyle(`width: ${e3.value};`) }, [c3.value ? (openBlock(), createElementBlock("div", { key: 0, class: "m-card-head", style: normalizeStyle(u3.headStyle) }, [createBaseVNode("div", { class: "m-head-wrapper", ref_key: "headRef", ref: s3 }, [createBaseVNode("div", tl2, [renderSlot(u3.$slots, "title", {}, () => [createTextVNode(toDisplayString(u3.title), 1)], true)]), createBaseVNode("div", sl2, [renderSlot(u3.$slots, "extra", {}, () => [createTextVNode(toDisplayString(u3.extra), 1)], true)])], 512)], 4)) : createCommentVNode("", true), createBaseVNode("div", { class: "m-card-body", style: normalizeStyle(u3.bodyStyle) }, [renderSlot(u3.$slots, "default", {}, void 0, true)], 4)], 6));
} }), [["__scopeId", "data-v-b66e2672"]]);
Ze.install = (l) => {
  l.component(Ze.__name, Ze);
};
var De = (l) => (pushScopeId("data-v-22ff15ed"), l = l(), popScopeId(), l);
var ol2 = { class: "m-spin" };
var nl2 = { class: "m-spin-box" };
var il2 = { key: 0, class: "m-spin-dot" };
var cl2 = [De(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), De(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), De(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), De(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1))];
var ul2 = { key: 1, class: "u-quarter-circle" };
var dl2 = { key: 2, class: "u-three-quarters-circle" };
var rl2 = { key: 3, class: "m-dynamic-circle" };
var vl2 = [De(() => createBaseVNode("svg", { class: "circular", viewBox: "0 0 50 50" }, [createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" })], -1))];
var se = I2(defineComponent({ __name: "Spin", props: { spinning: { type: Boolean, default: true }, size: { default: "default" }, tip: { default: "" }, indicator: { default: "dot" }, color: { default: "#1677FF" } }, setup: (l) => (a3, e3) => (openBlock(), createElementBlock("div", { class: normalizeClass(`m-spin-wrap ${a3.size}`), style: normalizeStyle(`--color: ${a3.color};`) }, [withDirectives(createBaseVNode("div", ol2, [createBaseVNode("div", nl2, [a3.indicator === "dot" ? (openBlock(), createElementBlock("div", il2, cl2)) : createCommentVNode("", true), a3.indicator === "quarter-circle" ? (openBlock(), createElementBlock("div", ul2)) : createCommentVNode("", true), a3.indicator === "three-quarters-circle" ? (openBlock(), createElementBlock("div", dl2)) : createCommentVNode("", true), a3.indicator === "dynamic-circle" ? (openBlock(), createElementBlock("div", rl2, vl2)) : createCommentVNode("", true), withDirectives(createBaseVNode("p", { class: "u-tip" }, toDisplayString(a3.tip), 513), [[vShow, a3.tip]])])], 512), [[vShow, a3.spinning]]), createBaseVNode("div", { class: normalizeClass(["m-spin-content", { "m-spin-mask": a3.spinning }]) }, [renderSlot(a3.$slots, "default", {}, void 0, true)], 2)], 6)) }), [["__scopeId", "data-v-22ff15ed"]]);
se.install = (l) => {
  l.component(se.__name, se);
};
var sa2 = (l) => (pushScopeId("data-v-9a59f428"), l = l(), popScopeId(), l);
var pl2 = ["href", "target"];
var fl2 = ["onLoad", "src", "alt"];
var hl2 = { key: 0, class: "m-image" };
var ml2 = ["href", "target"];
var gl2 = ["src", "alt"];
var yl2 = [sa2(() => createBaseVNode("path", { d: "M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z" }, null, -1))];
var kl2 = [sa2(() => createBaseVNode("path", { d: "M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z" }, null, -1))];
var bl2 = { key: 1, class: "m-switch" };
var wl2 = ["onClick"];
var Xe = I2(defineComponent({ __name: "Carousel", props: { images: { default: () => [] }, interval: { default: 3e3 }, width: { default: "100%" }, height: { default: "100vh" }, navigation: { type: Boolean, default: true }, navColor: { default: "#FFF" }, navSize: { default: 36 }, pagination: { type: Boolean, default: true }, pageActiveColor: { default: "#1677FF" }, pageSize: { default: 10 }, pageStyle: { default: () => ({}) }, disableOnInteraction: { type: Boolean, default: true }, pauseOnMouseEnter: { type: Boolean, default: true } }, setup(l) {
  const a3 = l, e3 = ref(true), s3 = ref(0), c3 = ref(false), u3 = ref(), o = ref(), n = ref(), d3 = ref(false), f = ref(), h5 = ref(1), w3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), k3 = computed(() => typeof a3.height == "number" ? a3.height + "px" : a3.height), v = computed(() => (a3.images.length + 1) * _.value), p = computed(() => a3.images.length);
  onMounted(() => {
    (function() {
      var F = null;
      function P3(G3) {
        F ? (b3.value = Math.floor(1e3 / (G3 - F)), console.log("fps", b3.value)) : (x3.value > 10 && (F = G3), x3.value = de(P3));
      }
      x3.value = de(P3);
    })(), _.value = f.value.offsetWidth, E3.value = f.value.offsetHeight, document.addEventListener("keydown", H3);
  }), onUnmounted(() => {
    document.removeEventListener("keydown", H3);
  });
  const y3 = ref(Array(p.value).fill(false)), x3 = ref(), b3 = ref(60), g = computed(() => b3.value === 60 ? 12 : b3.value / 60 * 12);
  function S3(F) {
    y3.value[F] = true;
  }
  watch(() => y3.value[0], (F) => {
    F && A();
  });
  const _ = ref(), E3 = ref();
  function H3(F) {
    F.preventDefault(), p.value > 1 && (F.key !== "ArrowLeft" && F.key !== "ArrowUp" || Ne(), F.key !== "ArrowRight" && F.key !== "ArrowDown" || qe());
  }
  function A() {
    p.value > 1 && y3.value[0] && (e3.value = true, c3.value = false, ee(), console.log("imageSlider start"));
  }
  function j() {
    R1(o.value), c3.value = true, s3.value = Math.ceil(s3.value / _.value) * _.value;
  }
  function oe() {
    R1(o.value), c3.value = true, s3.value = Math.floor(s3.value / _.value) * _.value;
  }
  function ee() {
    u3.value = re(() => {
      const F = s3.value % (p.value * _.value) + _.value;
      h5.value = h5.value % p.value + 1, function(P3) {
        s3.value === p.value * _.value && (s3.value = 0), n.value = P3, o.value = de(Pe2);
      }(F);
    }, a3.interval);
  }
  function xe2(F) {
    e3.value ? j() : (oe(), e3.value = true), c3.value = false, function(P3) {
      s3.value === p.value * _.value && (s3.value = 0), n.value = P3, o.value = de(Fe);
    }(F);
  }
  function Oe2(F) {
    e3.value ? (j(), e3.value = false) : oe(), c3.value = false, function(P3) {
      s3.value === 0 && (s3.value = p.value * _.value), n.value = P3, o.value = de(Le2);
    }(F);
  }
  function Ne() {
    const F = (h5.value + p.value - 2) % p.value * _.value;
    h5.value = h5.value - 1 > 0 ? h5.value - 1 : p.value, Oe2(F);
  }
  function qe() {
    const F = h5.value * _.value;
    h5.value = h5.value % p.value + 1, xe2(F);
  }
  function Pe2() {
    if (s3.value >= n.value)
      ee();
    else {
      var F = Math.ceil((n.value - s3.value) / g.value);
      s3.value += F, o.value = de(Pe2);
    }
  }
  function Fe() {
    if (s3.value >= n.value)
      d3.value && (d3.value = false, a3.disableOnInteraction || a3.pauseOnMouseEnter || A());
    else {
      var F = Math.ceil((n.value - s3.value) / g.value);
      s3.value += F, o.value = de(Fe);
    }
  }
  function Le2() {
    if (s3.value <= n.value)
      d3.value && (d3.value = false, a3.disableOnInteraction || a3.pauseOnMouseEnter || A());
    else {
      var F = Math.floor((n.value - s3.value) / g.value);
      s3.value += F, o.value = de(Le2);
    }
  }
  return (F, P3) => (openBlock(), createElementBlock("div", { class: "m-slider", ref_key: "carousel", ref: f, style: normalizeStyle(`--navColor: ${F.navColor}; --pageActiveColor: ${F.pageActiveColor}; width: ${w3.value}; height: ${k3.value};`), onMouseenter: P3[1] || (P3[1] = (G3) => F.pauseOnMouseEnter ? (me(u3.value), u3.value = null, e3.value ? j() : oe(), void console.log("imageSlider stop")) : () => false), onMouseleave: P3[2] || (P3[2] = (G3) => F.pauseOnMouseEnter ? A() : () => false) }, [createBaseVNode("div", { class: normalizeClass({ transition: c3.value }), style: normalizeStyle(`width: ${v.value}px; height: 100%; will-change: transform; transform: translateX(${-s3.value}px);`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(F.images, (G3, X3) => (openBlock(), createElementBlock("div", { class: "m-image", key: X3 }, [createVNode(unref(se), { spinning: !y3.value[X3], indicator: "dynamic-circle" }, { default: withCtx(() => [createBaseVNode("a", { href: G3.link ? G3.link : "javascript:;", target: G3.link ? "_blank" : "_self", class: "m-link" }, [(openBlock(), createElementBlock("img", { onLoad: (te) => S3(X3), src: G3.src, key: G3.src, alt: G3.title, class: "u-img", style: normalizeStyle(`width: ${_.value}px; height: ${E3.value}px;`) }, null, 44, fl2))], 8, pl2)]), _: 2 }, 1032, ["spinning"])]))), 128)), p.value ? (openBlock(), createElementBlock("div", hl2, [createVNode(unref(se), { spinning: !y3.value[0], indicator: "dynamic-circle" }, { default: withCtx(() => [createBaseVNode("a", { href: F.images[0].link ? F.images[0].link : "javascript:;", target: F.images[0].link ? "_blank" : "_self", class: "m-link" }, [(openBlock(), createElementBlock("img", { onLoad: P3[0] || (P3[0] = (G3) => S3(0)), src: F.images[0].src, key: F.images[0].src, alt: F.images[0].title, class: "u-img", style: normalizeStyle(`width: ${_.value}px; height: ${E3.value}px;`) }, null, 44, gl2))], 8, ml2)]), _: 1 }, 8, ["spinning"])])) : createCommentVNode("", true)], 6), F.navigation ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [(openBlock(), createElementBlock("svg", { class: "arrow-left", style: normalizeStyle(`width: ${F.navSize}px; height: ${F.navSize}px;`), onClick: Ne, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, yl2, 4)), (openBlock(), createElementBlock("svg", { class: "arrow-right", style: normalizeStyle(`width: ${F.navSize}px; height: ${F.navSize}px;`), onClick: qe, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, kl2, 4))], 64)) : createCommentVNode("", true), F.pagination ? (openBlock(), createElementBlock("div", bl2, [(openBlock(true), createElementBlock(Fragment, null, renderList(p.value, (G3) => (openBlock(), createElementBlock("div", { onClick: (X3) => function(te) {
    if (h5.value !== te) {
      d3.value = true;
      const ne = (te - 1) * _.value;
      te < h5.value && (h5.value = te, Oe2(ne)), te > h5.value && (h5.value = te, xe2(ne));
    }
  }(G3), class: normalizeClass(["u-circle", { active: h5.value === G3 }]), style: normalizeStyle([{ width: `${F.pageSize}px`, height: `${F.pageSize}px` }, F.pageStyle]), key: G3 }, null, 14, wl2))), 128))])) : createCommentVNode("", true)], 36));
} }), [["__scopeId", "data-v-9a59f428"]]);
Xe.install = (l) => {
  l.component(Xe.__name, Xe);
};
var xl2 = { class: "m-empty" };
var Ml2 = [createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-fca5069e><g transform="translate(24 31.67)" data-v-fca5069e><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-fca5069e></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-fca5069e></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-fca5069e></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-fca5069e></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-fca5069e></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-fca5069e></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-fca5069e><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-fca5069e></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-fca5069e></path></g></g>', 1)];
var _l2 = [createStaticVNode('<g transform="translate(0 1)" fill="none" fill-rule="evenodd" data-v-fca5069e><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" data-v-fca5069e></ellipse><g fill-rule="nonzero" stroke="#d9d9d9" data-v-fca5069e><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" data-v-fca5069e></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" data-v-fca5069e></path></g></g>', 1)];
var zl2 = ["src"];
var ze2 = I2(defineComponent({ __name: "Empty", props: { description: { default: "暂无数据" }, image: { default: "1" }, imageStyle: { default: () => ({}) } }, setup: (l) => (a3, e3) => (openBlock(), createElementBlock("div", xl2, [a3.image === "1" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-empty-1", style: normalizeStyle(a3.imageStyle), viewBox: "0 0 184 152", xmlns: "http://www.w3.org/2000/svg" }, Ml2, 4)) : a3.image === "2" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-empty-2", style: normalizeStyle(a3.imageStyle), viewBox: "0 0 64 41", xmlns: "http://www.w3.org/2000/svg" }, _l2, 4)) : renderSlot(a3.$slots, "default", { key: 2 }, () => [createBaseVNode("img", { class: "u-empty", src: a3.image, style: normalizeStyle(a3.imageStyle), alt: "image" }, null, 12, zl2)], true), a3.description ? (openBlock(), createElementBlock("p", { key: 3, class: normalizeClass(["u-description", { gray: a3.image === "2" }]) }, [renderSlot(a3.$slots, "description", {}, () => [createTextVNode(toDisplayString(a3.description), 1)], true)], 2)) : createCommentVNode("", true)])) }), [["__scopeId", "data-v-fca5069e"]]);
ze2.install = (l) => {
  l.component(ze2.__name, ze2);
};
var O1 = (l) => (pushScopeId("data-v-c92d5a45"), l = l(), popScopeId(), l);
var Cl2 = ["title"];
var $l2 = ["placeholder"];
var Bl2 = [O1(() => createBaseVNode("path", { d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" }, null, -1))];
var Fl2 = [O1(() => createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1))];
var Ll2 = ["onClick"];
var Sl2 = [O1(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var Al2 = ["title", "onMouseenter", "onClick"];
var ke2 = I2(defineComponent({ __name: "Select", props: { options: { default: () => [] }, label: { default: "label" }, value: { default: "value" }, placeholder: { default: "请选择" }, disabled: { type: Boolean, default: false }, allowClear: { type: Boolean, default: false }, search: { type: Boolean, default: false }, filter: { type: [Function, Boolean], default: true }, width: { default: 120 }, height: { default: 32 }, maxDisplay: { default: 6 }, modelValue: { default: null } }, emits: ["update:modelValue", "change"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = ref(), c3 = ref(), u3 = ref(), o = ref(), n = ref(false), d3 = ref(true), f = ref(true), h5 = ref(false), w3 = ref(false), k3 = ref();
  function v() {
    e3.allowClear && c3.value && (f.value = false, h5.value = true, e3.search && (w3.value = false));
  }
  function p() {
    e3.allowClear && h5.value && (h5.value = false, e3.search || (f.value = true)), e3.search && (n.value ? (w3.value = true, f.value = false, k3.value.focus()) : (w3.value = false, f.value = true));
  }
  function y3() {
    d3.value = false;
  }
  function x3() {
    o.value = null, d3.value = true, k3.value.focus();
  }
  function b3() {
    h5.value = false, c3.value = null, o.value = null, n.value = false, f.value = true, a3("update:modelValue"), a3("change");
  }
  return watchEffect(() => {
    e3.search ? (s3.value = e3.options.filter((g) => typeof e3.filter == "function" ? e3.filter(u3.value, g) : g[e3.label].includes(u3.value)), s3.value.length && u3.value ? o.value = s3.value[0][e3.value] : o.value = null) : s3.value = e3.options;
  }), watchEffect(() => {
    (function() {
      if (e3.modelValue) {
        const g = e3.options.find((S3) => S3[e3.value] === e3.modelValue);
        g ? (c3.value = g[e3.label], o.value = g[e3.value]) : (c3.value = e3.modelValue, o.value = null);
      } else
        c3.value = null, o.value = null;
      e3.search && (u3.value = c3.value);
    })();
  }), watch(n, (g) => {
    !g && e3.search && (u3.value = c3.value);
  }), (g, S3) => (openBlock(), createElementBlock("div", { class: "m-select", style: normalizeStyle(`height: ${g.height}px;`) }, [createBaseVNode("div", { class: normalizeClass(["m-select-wrap", { hover: !g.disabled, focus: n.value, disabled: g.disabled }]), style: normalizeStyle(`width: ${g.width}px; height: ${g.height}px;`), tabindex: "1", ref_key: "selectRef", ref: k3, onMouseenter: v, onMouseleave: p, onBlur: S3[1] || (S3[1] = (_) => d3.value && !g.disabled ? (n.value && (n.value = false), void (e3.search && (w3.value = false, f.value = true))) : () => false), onClick: S3[2] || (S3[2] = (_) => g.disabled ? () => false : function() {
    if (n.value = !n.value, u3.value = "", !o.value && c3.value) {
      const E3 = e3.options.find((H3) => H3[e3.label] === c3.value);
      o.value = E3 ? E3[e3.value] : null;
    }
    e3.search && (h5.value || (f.value = !n.value, w3.value = n.value));
  }()) }, [g.search ? withDirectives((openBlock(), createElementBlock("input", { key: 1, class: "u-search", style: normalizeStyle(`line-height: ${g.height - 2}px;`), autocomplete: "off", "onUpdate:modelValue": S3[0] || (S3[0] = (_) => u3.value = _), placeholder: c3.value || g.placeholder }, null, 12, $l2)), [[vModelText, u3.value, void 0, { number: true, trim: true }]]) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["u-select-input", { placeholder: !c3.value }]), style: normalizeStyle(`line-height: ${g.height - 2}px;`), title: c3.value }, toDisplayString(c3.value || g.placeholder), 15, Cl2)), (openBlock(), createElementBlock("svg", { focusable: "false", class: normalizeClass(["u-svg", { show: w3.value }]), "data-icon": "search", "aria-hidden": "true", viewBox: "64 64 896 896" }, Bl2, 2)), (openBlock(), createElementBlock("svg", { class: normalizeClass(["u-svg", { rotate: n.value, show: f.value }]), viewBox: "64 64 896 896", "data-icon": "down", "aria-hidden": "true", focusable: "false" }, Fl2, 2)), (openBlock(), createElementBlock("svg", { onClick: withModifiers(b3, ["stop"]), class: normalizeClass(["close", { show: h5.value }]), focusable: "false", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" }, Sl2, 10, Ll2))], 38), createVNode(TransitionGroup, { name: "fade", tag: "div" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-options-panel", onMouseenter: y3, onMouseleave: x3, key: "1", style: normalizeStyle(`top: ${g.height + 4}px; line-height: ${g.height - 10}px; max-height: ${g.maxDisplay * g.height + 9}px; width: ${g.width}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(s3.value, (_, E3) => (openBlock(), createElementBlock("p", { key: E3, class: normalizeClass(["u-option", { "option-hover": !_.disabled && _[g.value] === o.value, "option-selected": _[g.label] === c3.value, "option-disabled": _.disabled }]), title: _[g.label], onMouseenter: (H3) => {
    return A = _[g.value], void (o.value = A);
    var A;
  }, onClick: (H3) => _.disabled ? () => false : function(A, j, oe) {
    e3.modelValue !== A && (c3.value = j, o.value = A, a3("update:modelValue", A), a3("change", A, j, oe)), n.value = false, e3.search && (w3.value = false, f.value = true);
  }(_[g.value], _[g.label], E3) }, toDisplayString(_[g.label]), 43, Al2))), 128))], 36), [[vShow, n.value && s3.value && s3.value.length]]), withDirectives(createBaseVNode("div", { key: "2", class: "m-empty-wrap", style: normalizeStyle(`top: ${g.height + 4}px; width: ${g.width}px;`) }, [createVNode(unref(ze2), { image: "2", key: "2" })], 4), [[vShow, n.value && s3.value && !s3.value.length]])]), _: 1 })], 4));
} }), [["__scopeId", "data-v-c92d5a45"]]);
ke2.install = (l) => {
  l.component(ke2.__name, ke2);
};
var Qe = I2(defineComponent({ __name: "Cascader", props: { options: { default: () => [] }, label: { default: "label" }, value: { default: "value" }, children: { default: "children" }, placeholder: { default: "请选择" }, changeOnSelect: { type: Boolean, default: false }, gap: { default: 8 }, width: { default: 120 }, height: { default: 32 }, disabled: { type: [Boolean, Array], default: false }, allowClear: { type: Boolean, default: false }, search: { type: Boolean, default: false }, filter: { type: [Function, Boolean], default: true }, maxDisplay: { default: 6 }, selectedValue: { default: () => [] } }, emits: ["update:selectedValue", "change"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = ref([]), c3 = ref([]), u3 = ref([]), o = ref([]), n = ref([]);
  function d3(v, p) {
    const y3 = v.length;
    for (let x3 = 0; x3 < y3; x3++)
      if (v[x3][e3.value] === s3.value[p])
        return v[x3][e3.children] || [];
    return [];
  }
  function f(v, p) {
    const y3 = v.length;
    for (let x3 = 0; x3 < y3; x3++)
      if (v[x3][e3.value] === s3.value[p])
        return v[x3][e3.label];
    return s3.value[p];
  }
  function h5(v, p) {
    e3.changeOnSelect ? (a3("update:selectedValue", [v]), a3("change", [v], [p])) : (s3.value = [v], c3.value = [p]);
  }
  function w3(v, p) {
    e3.changeOnSelect ? (a3("update:selectedValue", [s3.value[0], v]), a3("change", [s3.value[0], v], [c3.value[0], p])) : (s3.value = [s3.value[0], v], c3.value = [c3.value[0], p]);
  }
  function k3(v, p) {
    a3("update:selectedValue", [...s3.value.slice(0, 2), v]), a3("change", [...s3.value.slice(0, 2), v], [...c3.value.slice(0, 2), p]);
  }
  return watchEffect(() => {
    u3.value = [...e3.options];
  }), watchEffect(() => {
    s3.value = [...e3.selectedValue];
  }), watchEffect(() => {
    var v;
    v = s3.value, o.value = d3(u3.value, 0), n.value = [], v.length > 1 && (n.value = d3(o.value, 1)), function(p) {
      c3.value[0] = f(u3.value, 0), p.length > 1 && (c3.value[1] = f(o.value, 1)), p.length > 2 && (c3.value[2] = f(n.value, 2));
    }(s3.value);
  }), (v, p) => (openBlock(), createElementBlock("div", { class: "m-cascader", style: normalizeStyle(`height: ${v.height}px; gap: ${v.gap}px;`) }, [createVNode(unref(ke2), { options: u3.value, label: v.label, value: v.value, placeholder: Array.isArray(v.placeholder) ? v.placeholder[0] : v.placeholder, disabled: Array.isArray(v.disabled) ? v.disabled[0] : v.disabled, "allow-clear": v.allowClear, search: v.search, filter: v.filter, width: Array.isArray(v.width) ? v.width[0] : v.width, height: v.height, "max-display": v.maxDisplay, modelValue: s3.value[0], "onUpdate:modelValue": p[0] || (p[0] = (y3) => s3.value[0] = y3), onChange: h5 }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]), createVNode(unref(ke2), { options: o.value, label: v.label, value: v.value, placeholder: Array.isArray(v.placeholder) ? v.placeholder[1] : v.placeholder, disabled: Array.isArray(v.disabled) ? v.disabled[1] : v.disabled, "allow-clear": v.allowClear, search: v.search, filter: v.filter, width: Array.isArray(v.width) ? v.width[1] : v.width, height: v.height, "max-display": v.maxDisplay, modelValue: s3.value[1], "onUpdate:modelValue": p[1] || (p[1] = (y3) => s3.value[1] = y3), onChange: w3 }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]), createVNode(unref(ke2), { options: n.value, label: v.label, value: v.value, placeholder: Array.isArray(v.placeholder) ? v.placeholder[2] : v.placeholder, disabled: Array.isArray(v.disabled) ? v.disabled[2] : v.disabled, "allow-clear": v.allowClear, search: v.search, filter: v.filter, width: Array.isArray(v.width) ? v.width[2] : v.width, height: v.height, "max-display": v.maxDisplay, modelValue: s3.value[2], "onUpdate:modelValue": p[2] || (p[2] = (y3) => s3.value[2] = y3), onChange: k3 }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"])], 4));
} }), [["__scopeId", "data-v-3cd9d99b"]]);
Qe.install = (l) => {
  l.component(Qe.__name, Qe);
};
var Dl2 = ["onClick"];
var Hl2 = { class: "u-label" };
var El2 = { key: 1, class: "m-checkbox-wrap" };
var Vl2 = { class: "u-label" };
var e1 = I2(defineComponent({ __name: "Checkbox", props: { options: { default: () => [] }, disabled: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, value: { default: () => [] }, gap: { default: 8 }, width: { default: "auto" }, height: { default: "auto" }, indeterminate: { type: Boolean, default: false }, checked: { type: Boolean, default: false } }, emits: ["update:value", "update:checked", "change"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = computed(() => e3.options.length), c3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), u3 = computed(() => typeof e3.height == "number" ? e3.height + "px" : e3.height), o = ref(e3.value);
  watch(() => e3.value, (f) => {
    o.value = f;
  });
  const n = computed(() => e3.vertical ? { marginBottom: e3.gap + "px" } : { marginRight: e3.gap + "px" });
  function d3() {
    a3("update:checked", !e3.checked);
  }
  return (f, h5) => (openBlock(), createElementBlock("div", { class: "m-checkbox", style: normalizeStyle(`max-width: ${c3.value}; max-height: ${u3.value};`) }, [s3.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(f.options, (w3, k3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-checkbox-wrap", { vertical: f.vertical }]), style: normalizeStyle(s3.value !== k3 + 1 ? n.value : ""), key: k3 }, [createBaseVNode("div", { class: normalizeClass(["m-box", { disabled: f.disabled || w3.disabled }]), onClick: (v) => f.disabled || w3.disabled ? () => false : function(p) {
    if (e3.value.includes(p)) {
      const y3 = o.value.filter((x3) => x3 !== p);
      a3("update:value", y3), a3("change", y3);
    } else {
      const y3 = [...o.value, p];
      a3("update:value", y3), a3("change", y3);
    }
  }(w3.value) }, [createBaseVNode("span", { class: normalizeClass(["u-checkbox", { "u-checkbox-checked": o.value.includes(w3.value) }]) }, null, 2), createBaseVNode("span", Hl2, [renderSlot(f.$slots, "default", { label: w3.label }, () => [createTextVNode(toDisplayString(w3.label), 1)], true)])], 10, Dl2)], 6))), 128)) : (openBlock(), createElementBlock("div", El2, [createBaseVNode("div", { class: normalizeClass(["m-box", { disabled: f.disabled }]), onClick: d3 }, [createBaseVNode("span", { class: normalizeClass(["u-checkbox", { "u-checkbox-checked": f.checked && !f.indeterminate, indeterminate: f.indeterminate }]) }, null, 2), createBaseVNode("span", Vl2, [renderSlot(f.$slots, "default", {}, () => [createTextVNode("Check all")], true)])], 2)]))], 4));
} }), [["__scopeId", "data-v-2a033f18"]]);
e1.install = (l) => {
  l.component(e1.__name, e1);
};
var a1 = I2(defineComponent({ __name: "Col", props: { span: { default: void 0 }, offset: { default: 0 }, flex: { default: "" }, xs: { default: void 0 }, sm: { default: void 0 }, md: { default: void 0 }, lg: { default: void 0 }, xl: { default: void 0 }, xxl: { default: void 0 } }, setup(l) {
  const a3 = l, e3 = computed(() => typeof a3.flex == "number" ? `${a3.flex} ${a3.flex} auto` : a3.flex), s3 = computed(() => c3.value >= 1600 && a3.xxl ? typeof a3.xxl == "object" ? a3.xxl : { span: a3.xxl, offset: void 0 } : c3.value >= 1200 && a3.xl ? typeof a3.xl == "object" ? a3.xl : { span: a3.xl, offset: void 0 } : c3.value >= 992 && a3.lg ? typeof a3.lg == "object" ? a3.lg : { span: a3.lg, offset: void 0 } : c3.value >= 768 && a3.md ? typeof a3.md == "object" ? a3.md : { span: a3.md, offset: void 0 } : c3.value >= 576 && a3.sm ? typeof a3.sm == "object" ? a3.sm : { span: a3.sm, offset: void 0 } : c3.value < 576 && a3.xs ? typeof a3.xs == "object" ? a3.xs : { span: a3.xs, offset: void 0 } : void 0), c3 = ref(document.documentElement.clientWidth);
  function u3() {
    c3.value = document.documentElement.clientWidth;
  }
  return onMounted(() => {
    window.addEventListener("resize", u3);
  }), onUnmounted(() => {
    window.removeEventListener("resize", u3);
  }), (o, n) => {
    var d3, f;
    return openBlock(), createElementBlock("div", { class: normalizeClass(`m-col col-${((d3 = s3.value) == null ? void 0 : d3.span) || o.span} offset-${((f = s3.value) == null ? void 0 : f.offset) || o.offset}`), style: normalizeStyle([{ "padding-left": "var(--xGap)", "padding-right": "var(--xGap)" }, `flex: ${e3.value}`]) }, [renderSlot(o.$slots, "default", {}, void 0, true)], 6);
  };
} }), [["__scopeId", "data-v-c7ddaac6"]]);
a1.install = (l) => {
  l.component(a1.__name, a1);
};
var jl2 = { class: "m-collapse" };
var Il2 = ["onClick"];
var Tl2 = { key: 0, focusable: "false", class: "u-arrow", "data-icon": "right", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Rl2 = [((l) => (pushScopeId("data-v-7bb27cfd"), l = l(), popScopeId(), l))(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1))];
var Wl2 = { class: "u-lang" };
var l1 = I2(defineComponent({ __name: "Collapse", props: { collapseData: { default: () => [] }, activeKey: { default: null }, copyable: { type: Boolean, default: false }, lang: { default: "" }, fontSize: { default: 14 }, headerFontSize: { default: 0 }, textFontSize: { default: 0 }, showArrow: { type: Boolean, default: true } }, emits: ["update:activeKey", "change"], setup(l, { emit: a3 }) {
  const e3 = l;
  watchEffect(() => {
    (function(d3) {
      for (let f = 0; f < d3; f++)
        c3.value.push(s3.value[f].offsetHeight);
    })(e3.collapseData.length);
  }, { flush: "post" });
  const s3 = ref(), c3 = ref([]);
  function u3(d3) {
    a3("update:activeKey", d3), a3("change", d3);
  }
  function o(d3) {
    return Array.isArray(e3.activeKey) ? e3.activeKey.includes(d3) : e3.activeKey === d3;
  }
  const n = ref("Copy");
  return (d3, f) => {
    const h5 = resolveComponent("Button");
    return openBlock(), createElementBlock("div", jl2, [(openBlock(true), createElementBlock(Fragment, null, renderList(d3.collapseData, (w3, k3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-collapse-item", { "u-collapse-item-active": o(w3.key || k3) }]), key: k3 }, [createBaseVNode("div", { class: "u-collapse-header", onClick: (v) => {
      var p;
      o(p = w3.key || k3) ? Array.isArray(e3.activeKey) ? u3(e3.activeKey.filter((y3) => y3 !== p)) : u3(null) : Array.isArray(e3.activeKey) ? u3([...e3.activeKey, p]) : u3(p);
    } }, [d3.showArrow ? (openBlock(), createElementBlock("svg", Tl2, Rl2)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["u-header", { ml24: d3.showArrow }]), style: normalizeStyle(`font-size: ${d3.headerFontSize || d3.fontSize}px;`) }, [renderSlot(d3.$slots, "header", { header: w3.header, key: w3.key || k3 }, () => [createTextVNode(toDisplayString(w3.header || "--"), 1)], true)], 6)], 8, Il2), createBaseVNode("div", { class: normalizeClass(["u-collapse-content", { "u-collapse-copyable": d3.copyable }]), style: normalizeStyle(`height: ${o(w3.key || k3) ? c3.value[k3] : 0}px; opacity: ${o(w3.key || k3) ? 1 : 0};`) }, [createBaseVNode("div", Wl2, [renderSlot(d3.$slots, "lang", { lang: d3.lang, key: w3.key || k3 }, () => [createTextVNode(toDisplayString(d3.lang), 1)], true)]), createVNode(h5, { size: "small", class: "u-copy", type: "primary", onClick: (v) => function(p) {
      navigator.clipboard.writeText(s3.value[p].innerText || "").then(() => {
        n.value = "Copied", re(() => {
          n.value = "Copy";
        }, 3e3);
      }, (y3) => {
        n.value = y3;
      });
    }(k3) }, { default: withCtx(() => [createTextVNode(toDisplayString(n.value), 1)]), _: 2 }, 1032, ["onClick"]), createBaseVNode("div", { ref_for: true, ref_key: "text", ref: s3, class: "u-text", style: normalizeStyle(`font-size: ${d3.textFontSize || d3.fontSize}px;`) }, [renderSlot(d3.$slots, "text", { text: w3.text, key: w3.key || k3 }, () => [createTextVNode(toDisplayString(w3.text), 1)], true)], 4)], 6)], 2))), 128))]);
  };
} }), [["__scopeId", "data-v-7bb27cfd"]]);
l1.install = (l) => {
  l.component(l1.__name, l1);
};
var Ol2 = { class: "m-countdown" };
var Nl2 = { class: "m-time" };
var t1 = I2(defineComponent({ __name: "Countdown", props: { title: { default: "Countdown" }, value: { default: void 0 }, format: { default: "HH:mm:ss" }, prefix: { default: "" }, suffix: { default: "" }, titleStyle: { default: () => ({}) }, valueStyle: { default: () => ({}) }, finishedText: { default: "Finished" } }, emits: ["finish"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = ref(), c3 = ref(), u3 = ref(1), o = ref(1);
  onMounted(() => {
    u3.value = s3.value.offsetWidth, o.value = c3.value.offsetWidth;
  });
  const n = ref(), d3 = ref(), f = computed(() => ({ showMillisecond: e3.format.includes("SSS"), showYear: e3.format.includes("Y"), showMonth: e3.format.includes("M"), showDay: e3.format.includes("D"), showHour: e3.format.includes("H"), showMinute: e3.format.includes("m"), showSecond: e3.format.includes("s") }));
  function h5(v) {
    return v < 10 ? "0" + v : String(v);
  }
  function w3(v) {
    if (v === null)
      return "--";
    let p = e3.format;
    if (f.value.showMillisecond) {
      var y3 = v % 1e3;
      p = p.replace("SSS", "0".repeat(3 - String(y3).length) + y3);
    }
    if (v = Math.floor(v / 1e3), f.value.showYear) {
      var x3 = Math.floor(v / 31104e3);
      p = p.includes("YY") ? p.replace("YY", h5(x3)) : p.replace("Y", String(x3));
    } else
      x3 = 0;
    if (f.value.showMonth) {
      v -= 60 * x3 * 60 * 24 * 30 * 12;
      var b3 = Math.floor(v / 2592e3);
      p = p.includes("MM") ? p.replace("MM", h5(b3)) : p.replace("M", String(b3));
    } else
      b3 = 0;
    if (f.value.showDay) {
      v -= 60 * b3 * 60 * 24 * 30;
      var g = Math.floor(v / 86400);
      p = p.includes("DD") ? p.replace("DD", h5(g)) : p.replace("D", String(g));
    } else
      g = 0;
    if (f.value.showHour) {
      v -= 60 * g * 60 * 24;
      var S3 = Math.floor(v / 3600);
      p = p.includes("HH") ? p.replace("HH", h5(S3)) : p.replace("H", String(S3));
    } else
      S3 = 0;
    if (f.value.showMinute) {
      v -= 60 * S3 * 60;
      var _ = Math.floor(v / 60);
      p = p.includes("mm") ? p.replace("mm", h5(_)) : p.replace("m", String(_));
    } else
      _ = 0;
    if (f.value.showSecond) {
      var E3 = v - 60 * _;
      p = p.includes("ss") ? p.replace("ss", h5(E3)) : p.replace("s", String(E3));
    }
    return p;
  }
  function k3() {
    n.value > Date.now() ? (d3.value = n.value - Date.now(), de(k3)) : (d3.value = 0, a3("finish"));
  }
  return watchEffect(() => {
    Number.isFinite(e3.value) ? (e3.value >= Date.now() ? n.value = e3.value : n.value = e3.value + Date.now(), de(k3)) : d3.value = null;
  }), (v, p) => (openBlock(), createElementBlock("div", Ol2, [createBaseVNode("div", { class: "u-title", style: normalizeStyle(v.titleStyle) }, [renderSlot(v.$slots, "title", {}, () => [createTextVNode(toDisplayString(e3.title), 1)], true)], 4), createBaseVNode("div", Nl2, [u3.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [u3.value || d3.value > 0 || d3.value === null ? (openBlock(), createElementBlock("span", { key: 0, ref_key: "prefixRef", ref: s3, class: "u-prefix" }, [renderSlot(v.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(v.prefix), 1)], true)], 512)) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), v.finishedText && d3.value === 0 && d3.value !== null ? (openBlock(), createElementBlock("span", { key: 1, class: "u-time-value", style: normalizeStyle(v.valueStyle) }, [renderSlot(v.$slots, "finish", {}, () => [createTextVNode(toDisplayString(v.finishedText), 1)], true)], 4)) : createCommentVNode("", true), Number.isFinite(d3.value) && d3.value > 0 ? (openBlock(), createElementBlock("span", { key: 2, class: "u-time-value", style: normalizeStyle(v.valueStyle) }, toDisplayString(w3(d3.value)), 5)) : createCommentVNode("", true), o.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [o.value || d3.value > 0 || d3.value === null ? (openBlock(), createElementBlock("span", { key: 0, ref_key: "suffixRef", ref: c3, class: "u-suffix" }, [renderSlot(v.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(v.suffix), 1)], true)], 512)) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)])]));
} }), [["__scopeId", "data-v-8a3ac908"]]);
t1.install = (l) => {
  l.component(t1.__name, t1);
};
var s1 = I2(defineComponent({ inheritAttrs: false, __name: "DatePicker", props: { width: { default: 180 }, mode: { default: "date" }, showTime: { type: Boolean, default: false }, showToday: { type: Boolean, default: false }, modelType: { default: "format" } }, setup(l) {
  const a3 = l, e3 = computed(() => a3.mode === "time"), s3 = computed(() => a3.mode === "week"), c3 = computed(() => a3.mode === "month"), u3 = computed(() => a3.mode === "year");
  return (o, n) => (openBlock(), createElementBlock("div", { class: "m-datepicker", style: normalizeStyle(`width: ${o.width}px;`) }, [createVNode(unref(Ba), mergeProps({ locale: "zh-CN", "month-change-on-scroll": false, "enable-time-picker": o.showTime, "time-picker": e3.value, "week-picker": s3.value, "month-picker": c3.value, "year-picker": u3.value, "now-button-label": "今天", "show-now-button": o.showToday, "auto-apply": "", "text-input": "", "model-type": o.modelType, "day-names": ["一", "二", "三", "四", "五", "六", "七"] }, o.$attrs), null, 16, ["enable-time-picker", "time-picker", "week-picker", "month-picker", "year-picker", "show-now-button", "model-type"])], 4));
} }), [["__scopeId", "data-v-83e36abf"]]);
s1.install = (l) => {
  l.component(s1.__name, s1);
};
var ql2 = { class: "m-header" };
var Pl2 = { class: "u-title" };
var Yl2 = { class: "u-extra" };
var Ul2 = { key: 0 };
var Kl2 = ["colspan"];
var Gl2 = { key: 1 };
var o1 = I2(defineComponent({ __name: "Descriptions", props: { title: { default: "" }, bordered: { type: Boolean, default: false }, column: { default: () => ({ xs: 1, sm: 2, md: 3 }) }, extra: { default: "" }, size: { default: "default" }, labelStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) } }, setup(l) {
  const a3 = l, e3 = ref(document.documentElement.clientWidth);
  function s3() {
    e3.value = document.documentElement.clientWidth;
  }
  onMounted(() => {
    window.addEventListener("resize", s3);
  }), onUnmounted(() => {
    window.removeEventListener("resize", s3);
  });
  const c3 = computed(() => typeof a3.column == "object" ? e3.value >= 1600 && a3.column.xxl ? a3.column.xxl : e3.value >= 1200 && a3.column.xl ? a3.column.xl : e3.value >= 992 && a3.column.lg ? a3.column.lg : e3.value >= 768 && a3.column.md ? a3.column.md : e3.value >= 576 && a3.column.sm ? a3.column.sm : e3.value < 576 && a3.column.xs ? a3.column.xs : 1 : a3.column), u3 = ref(), o = ref(), n = ref(), d3 = ref(), f = ref([]), h5 = computed(() => f.value.length);
  function w3(p, y3) {
    const x3 = p.length;
    let b3 = [];
    for (let g = 0; g < x3; g++) {
      const S3 = { span: Math.min(p[g].dataset.span, y3), element: p[g] };
      k3(b3) < y3 ? (S3.span = Math.min(S3.span, y3 - k3(b3)), g === x3 - 1 && (S3.span = y3 - k3(b3)), b3.push(S3), g === x3 - 1 && f.value.push(b3)) : (f.value.push(b3), b3 = [S3], g === x3 - 1 && (S3.span = y3, f.value.push(b3)));
    }
    a3.bordered ? nextTick(() => {
      f.value.forEach((g, S3) => {
        g.forEach((_) => {
          const E3 = Array.from(_.element.children), H3 = E3[0].cloneNode(true);
          H3.colSpan = 1, v(H3, a3.labelStyle), v(H3, JSON.parse(_.element.dataset.labelStyle));
          const A = E3[1].cloneNode(true);
          A.colSpan = 2 * _.span - 1, v(A, a3.contentStyle), v(A, JSON.parse(_.element.dataset.contentStyle)), d3.value[S3].appendChild(H3), d3.value[S3].appendChild(A);
        });
      });
    }) : nextTick(() => {
      p.forEach((g, S3) => {
        const _ = Array.from(g.children), E3 = _[0];
        v(E3, a3.labelStyle), v(E3, JSON.parse(g.dataset.labelStyle));
        const H3 = _[1];
        v(H3, a3.contentStyle), v(H3, JSON.parse(g.dataset.contentStyle)), n.value[S3].appendChild(g);
      });
    });
  }
  function k3(p) {
    return p.reduce((y3, x3) => y3 + x3.span, 0);
  }
  function v(p, y3) {
    JSON.stringify(y3) !== "{}" && Object.keys(y3).forEach((x3) => {
      p.style[x3] = y3[x3];
    });
  }
  return watchEffect(() => {
    a3.bordered ? o.value = Array.from(u3.value.children).filter((p) => p.className === "m-desc-item-bordered") : o.value = Array.from(u3.value.children).filter((p) => p.className === "m-desc-item");
  }, { flush: "post" }), watch(o, (p) => {
    f.value = [], nextTick(() => {
      w3(p, c3.value);
    });
  }), watch(c3, (p) => {
    f.value = [], nextTick(() => {
      w3(o.value, p);
    });
  }), (p, y3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-desc", `desc-${p.size}`]) }, [createBaseVNode("div", ql2, [createBaseVNode("div", Pl2, [renderSlot(p.$slots, "title", {}, () => [createTextVNode(toDisplayString(p.title), 1)], true)]), createBaseVNode("div", Yl2, [renderSlot(p.$slots, "extra", {}, () => [createTextVNode(toDisplayString(p.extra), 1)], true)])]), withDirectives(createBaseVNode("div", { ref_key: "view", ref: u3 }, [renderSlot(p.$slots, "default", {}, void 0, true)], 512), [[vShow, false]]), createBaseVNode("div", { class: normalizeClass(["m-desc-view", { "m-bordered": p.bordered }]) }, [createBaseVNode("table", null, [p.bordered ? (openBlock(), createElementBlock("tbody", Gl2, [h5.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(h5.value, (x3) => (openBlock(), createElementBlock("tr", { ref_for: true, ref_key: "rows", ref: d3, class: "tr-bordered", key: x3 }))), 128)) : createCommentVNode("", true)])) : (openBlock(), createElementBlock("tbody", Ul2, [(openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (x3, b3) => (openBlock(), createElementBlock("tr", { key: b3 }, [(openBlock(true), createElementBlock(Fragment, null, renderList(x3, (g, S3) => (openBlock(), createElementBlock("td", { ref_for: true, ref_key: "cols", ref: n, class: "u-item-td", colspan: g.span, key: S3 }, null, 8, Kl2))), 128))]))), 128))]))])], 2)], 2));
} }), [["__scopeId", "data-v-50d36368"]]);
o1.install = (l) => {
  l.component(o1.__name, o1);
};
var Jl2 = ["data-span", "data-label-style", "data-content-style"];
var Zl2 = { class: "u-label" };
var Xl2 = { class: "u-content" };
var Ql2 = ["data-span", "data-label-style", "data-content-style"];
var et2 = { class: "u-label-th" };
var at = { class: "u-content-td" };
var n1 = I2(defineComponent({ __name: "DescriptionsItem", props: { label: { default: "" }, span: { default: 1 }, labelStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) } }, setup: (l) => (a3, e3) => (openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", { class: "m-desc-item", "data-span": a3.span, "data-label-style": JSON.stringify(a3.labelStyle), "data-content-style": JSON.stringify(a3.contentStyle) }, [createBaseVNode("span", Zl2, [renderSlot(a3.$slots, "label", {}, () => [createTextVNode(toDisplayString(a3.label), 1)], true)]), createBaseVNode("span", Xl2, [renderSlot(a3.$slots, "default", {}, void 0, true)])], 8, Jl2), createBaseVNode("div", { class: "m-desc-item-bordered", "data-span": a3.span, "data-label-style": JSON.stringify(a3.labelStyle), "data-content-style": JSON.stringify(a3.contentStyle) }, [createBaseVNode("th", et2, [renderSlot(a3.$slots, "label", {}, () => [createTextVNode(toDisplayString(a3.label), 1)], true)]), createBaseVNode("td", at, [renderSlot(a3.$slots, "default", {}, void 0, true)])], 8, Ql2)], 64)) }), [["__scopeId", "data-v-d38b635d"]]);
n1.install = (l) => {
  l.component(n1.__name, n1);
};
var N1 = (l) => (pushScopeId("data-v-2889fdc5"), l = l(), popScopeId(), l);
var lt2 = { class: "m-dialog-root" };
var tt2 = { class: "m-dialog-mask" };
var st2 = ["onClick"];
var ot = { class: "m-dialog-header" };
var nt2 = { class: "u-head" };
var it = { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "fullscreen", "aria-hidden": "true", focusable: "false" };
var ct = [N1(() => createBaseVNode("path", { d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z" }, null, -1))];
var ut2 = { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "fullscreen-exit", "aria-hidden": "true", focusable: "false" };
var dt = [N1(() => createBaseVNode("path", { d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z" }, null, -1))];
var rt = [N1(() => createBaseVNode("svg", { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "close", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var vt2 = { class: "m-dialog-footer" };
var i1 = I2(defineComponent({ __name: "Dialog", props: { title: { default: "提示" }, content: { default: "" }, width: { default: 540 }, height: { default: "auto" }, switchFullscreen: { type: Boolean, default: false }, cancelText: { default: "取消" }, okText: { default: "确定" }, footer: { type: Boolean, default: false }, center: { type: Boolean, default: true }, top: { default: 100 }, loading: { type: Boolean, default: false }, bodyStyle: { default: () => ({}) }, visible: { type: Boolean, default: false } }, emits: ["close", "cancel", "ok"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = ref(false), c3 = computed(() => typeof e3.height == "number" ? e3.height + "px" : e3.height);
  function u3() {
    e3.loading || a3("close");
  }
  function o() {
    s3.value = !s3.value;
  }
  function n() {
    a3("close");
  }
  function d3() {
    a3("cancel");
  }
  function f() {
    a3("ok");
  }
  return watch(() => e3.visible, (h5) => {
    h5 && (s3.value = false);
  }), (h5, w3) => (openBlock(), createElementBlock("div", lt2, [createVNode(Transition, { name: "mask" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", tt2, null, 512), [[vShow, h5.visible]])]), _: 1 }), createVNode(Transition, null, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-dialog-wrap", onClick: withModifiers(u3, ["self"]) }, [createBaseVNode("div", { ref: "dialog", class: normalizeClass(["m-dialog", h5.center ? "relative-hv-center" : "top-center"]), style: normalizeStyle(`width: ${s3.value ? "100%" : e3.width + "px"}; top: ${h5.center ? "50%" : s3.value ? 0 : h5.top + "px"};`) }, [createBaseVNode("div", { class: normalizeClass(["m-dialog-content", { loading: h5.loading }]), style: normalizeStyle(`--height: ${s3.value ? "100vh" : c3.value}`) }, [createVNode(unref(se), { class: "u-spin", spinning: h5.loading, size: "small" }, null, 8, ["spinning"]), createBaseVNode("div", ot, [createBaseVNode("p", nt2, [renderSlot(h5.$slots, "title", {}, () => [createTextVNode(toDisplayString(h5.title), 1)], true)])]), h5.switchFullscreen ? (openBlock(), createElementBlock("span", { key: 0, class: "m-screen", onClick: o }, [withDirectives((openBlock(), createElementBlock("svg", it, ct, 512)), [[vShow, !s3.value]]), withDirectives((openBlock(), createElementBlock("svg", ut2, dt, 512)), [[vShow, s3.value]])])) : createCommentVNode("", true), createBaseVNode("span", { class: "m-close", onClick: n }, rt), createBaseVNode("div", { class: "m-dialog-body", style: normalizeStyle(h5.bodyStyle) }, [renderSlot(h5.$slots, "default", {}, () => [createTextVNode(toDisplayString(h5.content), 1)], true)], 4), withDirectives(createBaseVNode("div", vt2, [createVNode(unref(fe), { class: "mr8", onClick: d3 }, { default: withCtx(() => [createTextVNode(toDisplayString(h5.cancelText), 1)]), _: 1 }), createVNode(unref(fe), { type: "primary", onClick: f }, { default: withCtx(() => [createTextVNode(toDisplayString(h5.okText), 1)]), _: 1 })], 512), [[vShow, h5.footer]])], 6)], 6)], 8, st2), [[vShow, h5.visible]])]), _: 3 })]));
} }), [["__scopeId", "data-v-2889fdc5"]]);
i1.install = (l) => {
  l.component(i1.__name, i1);
};
var c1 = I2(defineComponent({ __name: "Divider", props: { dashed: { type: Boolean, default: false }, orientation: { default: "center" }, orientationMargin: { default: "" }, borderWidth: { default: 1 } }, setup(l) {
  const a3 = l, e3 = ref(), s3 = ref(true), c3 = computed(() => {
    if (a3.orientationMargin !== "")
      return typeof a3.orientationMargin == "number" ? a3.orientationMargin + "px" : a3.orientationMargin;
  });
  return onMounted(() => {
    e3.value.offsetHeight || (s3.value = false);
  }), (u3, o) => (openBlock(), createElementBlock("div", { class: normalizeClass([`m-divider ${u3.orientation}`, { dashed: u3.dashed, margin24: !s3.value, marginLeft: u3.orientationMargin !== "" && u3.orientation === "left", marginRight: u3.orientationMargin !== "" && u3.orientation === "right" }]), style: normalizeStyle(`--border-width: ${u3.borderWidth}px;`) }, [u3.orientation === "left" ? withDirectives((openBlock(), createElementBlock("span", { key: 0, class: "u-text", style: normalizeStyle(`margin-left: ${c3.value};`), ref_key: "text", ref: e3 }, [renderSlot(u3.$slots, "default", {}, void 0, true)], 4)), [[vShow, s3.value]]) : u3.orientation === "right" ? withDirectives((openBlock(), createElementBlock("span", { key: 1, class: "u-text", style: normalizeStyle(`margin-right: ${c3.value};`), ref_key: "text", ref: e3 }, [renderSlot(u3.$slots, "default", {}, void 0, true)], 4)), [[vShow, s3.value]]) : withDirectives((openBlock(), createElementBlock("span", { key: 2, class: "u-text", ref_key: "text", ref: e3 }, [renderSlot(u3.$slots, "default", {}, void 0, true)], 512)), [[vShow, s3.value]])], 6));
} }), [["__scopeId", "data-v-df281fd1"]]);
c1.install = (l) => {
  l.component(c1.__name, c1);
};
var oa2 = (l) => (pushScopeId("data-v-84da70c0"), l = l(), popScopeId(), l);
var pt = { class: "m-drawer", tabindex: "-1" };
var ft = ["onClick"];
var ht2 = { class: "m-drawer-content" };
var mt2 = { key: 0, class: "m-drawer-body-wrapper" };
var gt = { class: "m-drawer-header" };
var yt2 = { class: "m-header-title" };
var kt2 = [oa2(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var bt = { class: "u-title" };
var wt2 = { class: "m-drawer-extra" };
var xt = { class: "m-drawer-body" };
var Mt = { key: 1, class: "m-drawer-body-wrapper" };
var _t = { class: "m-drawer-header" };
var zt = { class: "m-header-title" };
var Ct = [oa2(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var $t = { class: "u-title" };
var Bt2 = { class: "m-drawer-extra" };
var Ft = { class: "m-drawer-body" };
var u1 = I2(defineComponent({ __name: "Drawer", props: { title: { default: "" }, width: { default: 378 }, height: { default: 378 }, closable: { type: Boolean, default: true }, destroyOnClose: { type: Boolean, default: false }, extra: { default: "" }, placement: { default: "right" }, zIndex: { default: 1e3 }, open: { type: Boolean, default: false } }, emits: ["update:open", "close"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), c3 = computed(() => typeof e3.height == "number" ? e3.height + "px" : e3.height);
  function u3(n) {
    o(n);
  }
  function o(n) {
    a3("update:open", false), a3("close", n);
  }
  return (n, d3) => (openBlock(), createElementBlock("div", pt, [createVNode(Transition, { name: "fade" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-drawer-mask", onClick: withModifiers(u3, ["self"]) }, null, 8, ft), [[vShow, n.open]])]), _: 1 }), createVNode(Transition, { name: `motion-${n.placement}` }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-drawer-wrapper", `drawer-${n.placement}`]), style: normalizeStyle(`z-index: ${n.zIndex}; ${["top", "bottom"].includes(n.placement) ? "height:" + c3.value : "width:" + s3.value};`) }, [createBaseVNode("div", ht2, [n.destroyOnClose ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", mt2, [createBaseVNode("div", gt, [createBaseVNode("div", yt2, [n.closable ? (openBlock(), createElementBlock("svg", { key: 0, focusable: "false", onClick: o, class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, kt2)) : createCommentVNode("", true), createBaseVNode("p", bt, [renderSlot(n.$slots, "title", {}, () => [createTextVNode(toDisplayString(n.title), 1)], true)])]), createBaseVNode("div", wt2, [renderSlot(n.$slots, "extra", {}, () => [createTextVNode(toDisplayString(n.extra), 1)], true)])]), createBaseVNode("div", xt, [renderSlot(n.$slots, "default", {}, void 0, true)])])), n.destroyOnClose && n.open ? (openBlock(), createElementBlock("div", Mt, [createBaseVNode("div", _t, [createBaseVNode("div", zt, [(openBlock(), createElementBlock("svg", { focusable: "false", onClick: o, class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, Ct)), createBaseVNode("p", $t, [renderSlot(n.$slots, "title", {}, () => [createTextVNode(toDisplayString(n.title), 1)], true)])]), createBaseVNode("div", Bt2, [renderSlot(n.$slots, "extra", {}, () => [createTextVNode(toDisplayString(n.extra), 1)], true)])]), createBaseVNode("div", Ft, [renderSlot(n.$slots, "default", {}, void 0, true)])])) : createCommentVNode("", true)])], 6), [[vShow, n.open]])]), _: 3 }, 8, ["name"])]));
} }), [["__scopeId", "data-v-84da70c0"]]);
u1.install = (l) => {
  l.component(u1.__name, u1);
};
var Lt = ((l) => (pushScopeId("data-v-4bca3c05"), l = l(), popScopeId(), l))(() => createBaseVNode("div", { class: "m-tooltip-arrow" }, [createBaseVNode("span", { class: "u-tooltip-arrow" })], -1));
var Ee = I2(defineComponent({ __name: "Tooltip", props: { maxWidth: { default: 120 }, content: { default: "暂无内容" }, tooltip: { default: "暂无提示" }, fontSize: { default: 14 }, color: { default: "#FFF" }, backgroundColor: { default: "rgba(0, 0, 0, .85)" }, overlayStyle: { default: () => ({}) } }, emits: ["openChange"], setup(l, { emit: a3 }) {
  const e3 = ref(false), s3 = ref(), c3 = ref(0), u3 = ref(0), o = ref(), n = ref();
  function d3() {
    (function() {
      const h5 = o.value.offsetWidth, w3 = n.value.offsetWidth, k3 = n.value.offsetHeight;
      c3.value = k3 + 4, u3.value = (w3 - h5) / 2;
    })(), me(s3.value), e3.value = true, a3("openChange", e3.value);
  }
  function f() {
    s3.value = re(() => {
      e3.value = false, a3("openChange", e3.value);
    }, 100);
  }
  return (h5, w3) => (openBlock(), createElementBlock("div", { class: "m-tooltip", onMouseenter: d3, onMouseleave: f }, [createBaseVNode("div", { ref_key: "tooltipRef", ref: n, class: normalizeClass(["m-tooltip-content", { "show-tip": e3.value }]), style: normalizeStyle(`--tooltip-font-size: ${h5.fontSize}px; --tooltip-color: ${h5.color}; --tooltip-background-color: ${h5.backgroundColor}; max-width: ${h5.maxWidth}px; top: ${-c3.value}px; left: ${-u3.value}px;`), onMouseenter: d3, onMouseleave: f }, [createBaseVNode("div", { class: "u-tooltip", style: normalizeStyle(h5.overlayStyle) }, [renderSlot(h5.$slots, "tooltip", {}, () => [createTextVNode(toDisplayString(h5.tooltip), 1)], true)], 4), Lt], 38), createBaseVNode("div", { ref_key: "contentRef", ref: o }, [renderSlot(h5.$slots, "default", {}, () => [createTextVNode(toDisplayString(h5.content), 1)], true)], 512)], 32));
} }), [["__scopeId", "data-v-4bca3c05"]]);
Ee.install = (l) => {
  l.component(Ee.__name, Ee);
};
var d1 = I2(defineComponent({ __name: "Ellipsis", props: { maxWidth: { default: "100%" }, line: { default: void 0 }, expand: { type: Boolean, default: false }, tooltip: { type: Boolean, default: true }, tooltipMaxWidth: { default: void 0 }, tooltipFontSize: { default: 14 }, tooltipColor: { default: "#FFF" }, tooltipBackgroundColor: { default: "rgba(0, 0, 0, .85)" }, tooltipOverlayStyle: { default: () => ({ padding: "8px 12px", textAlign: "justify" }) } }, emits: ["expandChange"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = computed(() => typeof e3.maxWidth == "number" ? e3.maxWidth + "px" : e3.maxWidth), c3 = ref(), u3 = ref(), o = ref();
  function n() {
    u3.value.style["-webkit-line-clamp"] ? (e3.tooltip ? (c3.value = false, nextTick(() => {
      u3.value.style["-webkit-line-clamp"] = "";
    })) : u3.value.style["-webkit-line-clamp"] = "", a3("expandChange", true)) : (e3.tooltip && (c3.value = true), u3.value.style["-webkit-line-clamp"] = e3.line, a3("expandChange", false));
  }
  return watchEffect(() => {
    c3.value = e3.tooltip;
  }), watchEffect(() => {
    e3.tooltip && (e3.tooltipMaxWidth ? o.value = e3.tooltipMaxWidth : o.value = u3.value.offsetWidth + 24);
  }, { flush: "post" }), (d3, f) => c3.value ? (openBlock(), createBlock(unref(Ee), { key: 0, "max-width": o.value, fontSize: d3.tooltipFontSize, color: d3.tooltipColor, backgroundColor: d3.tooltipBackgroundColor, overlayStyle: d3.tooltipOverlayStyle }, { tooltip: withCtx(() => [renderSlot(d3.$slots, "tooltip", {}, () => [renderSlot(d3.$slots, "default", {}, void 0, true)], true)]), default: withCtx(() => [createBaseVNode("div", mergeProps({ ref_key: "ellipsis", ref: u3, class: ["m-ellipsis", [d3.line ? "ellipsis-line" : "not-ellipsis-line", { "cursor-pointer": d3.expand }]], style: `-webkit-line-clamp: ${d3.line}; max-width: ${s3.value};`, onClick: f[0] || (f[0] = (h5) => d3.expand ? n() : () => false) }, d3.$attrs), [renderSlot(d3.$slots, "default", {}, void 0, true)], 16)]), _: 3 }, 8, ["max-width", "fontSize", "color", "backgroundColor", "overlayStyle"])) : (openBlock(), createElementBlock("div", mergeProps({ key: 1, ref_key: "ellipsis", ref: u3, class: ["m-ellipsis", [d3.line ? "ellipsis-line" : "not-ellipsis-line", { "cursor-pointer": d3.expand }]], style: `-webkit-line-clamp: ${d3.line}; max-width: ${s3.value};`, onClick: f[1] || (f[1] = (h5) => d3.expand ? n() : () => false) }, d3.$attrs), [renderSlot(d3.$slots, "default", {}, void 0, true)], 16));
} }), [["__scopeId", "data-v-becc1d77"]]);
d1.install = (l) => {
  l.component(d1.__name, d1);
};
var be = I2(defineComponent({ __name: "Space", props: { width: { default: "auto" }, align: { default: "start" }, direction: { default: "horizontal" }, size: { default: "small" }, wrap: { type: Boolean, default: true } }, setup(l) {
  const a3 = l, e3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), s3 = computed(() => {
    if (typeof a3.size == "number")
      return a3.size + "px";
    if (Array.isArray(a3.size))
      return a3.size[1] + "px " + a3.size[0] + "px ";
    if (["small", "middle", "large"].includes(a3.size))
      return { small: "8px", middle: "16px", large: "24px" }[a3.size];
  });
  return (c3, u3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-space", [`${c3.direction} ${c3.align}`, { wrap: c3.wrap }]]), style: normalizeStyle(`width: ${e3.value}; gap: ${s3.value}; margin-bottom: -${Array.isArray(a3.size) && c3.wrap ? a3.size[1] : 0}px;`) }, [renderSlot(c3.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-15e6c265"]]);
be.install = (l) => {
  l.component(be.__name, be);
};
var pe = (l) => (pushScopeId("data-v-fbf55b26"), l = l(), popScopeId(), l);
var St2 = { class: "m-image-wrap" };
var At2 = ["onLoad", "src", "alt"];
var Dt = ["onClick"];
var Ht2 = { class: "m-image-mask-info" };
var Et2 = pe(() => createBaseVNode("svg", { class: "u-eye", focusable: "false", "data-icon": "eye", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })], -1));
var Vt = { class: "u-pre" };
var jt2 = { class: "m-preview-mask" };
var It2 = ["onClick", "onWheel"];
var Tt = { class: "m-preview-body" };
var Rt2 = { class: "m-preview-operations" };
var Wt = ["href", "title"];
var Ot2 = [pe(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "close", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var Nt = [pe(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "zoom-in", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })], -1))];
var qt2 = [pe(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "zoom-out", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })], -1))];
var Pt = [pe(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "expand", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z" })], -1))];
var Yt = [pe(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "rotate-right", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" }), createBaseVNode("path", { d: "M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" })], -1))];
var Ut2 = [pe(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "rotate-left", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" }), createBaseVNode("path", { d: "M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" })], -1))];
var Kt = [pe(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "swap", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" })], -1))];
var Gt2 = { class: "u-icon", style: { transform: "rotate(90deg)" }, focusable: "false", "data-icon": "swap", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Jt = [pe(() => createBaseVNode("path", { d: "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" }, null, -1))];
var Zt2 = ["src", "alt", "onLoad"];
var Xt2 = [pe(() => createBaseVNode("svg", { focusable: "false", class: "u-switch", "data-icon": "left", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })], -1))];
var Qt = [pe(() => createBaseVNode("svg", { focusable: "false", class: "u-switch", "data-icon": "right", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" })], -1))];
var e2 = defineComponent({ __name: "Image", props: { src: { default: "" }, name: { default: "" }, width: { default: 200 }, height: { default: 200 }, bordered: { type: Boolean, default: true }, gap: { default: 8 }, fit: { default: "contain" }, preview: { default: "预览" }, zoomRatio: { default: 0.1 }, minZoomScale: { default: 0.1 }, maxZoomScale: { default: 10 }, resetOnDbclick: { type: Boolean, default: true }, loop: { type: Boolean, default: false }, album: { type: Boolean, default: false } }, setup(l, { expose: a3 }) {
  const e3 = l, s3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), c3 = computed(() => typeof e3.height == "number" ? e3.height + "px" : e3.height), u3 = ref([]);
  watchEffect(() => {
    u3.value = Array.isArray(e3.src) ? e3.src : [{ src: e3.src, name: e3.name }];
  });
  const o = computed(() => u3.value.length);
  onMounted(() => {
    document.addEventListener("keydown", S3);
  }), onUnmounted(() => {
    document.removeEventListener("keydown", S3);
  });
  const n = ref(Array(o.value).fill(false)), d3 = ref(Array(o.value).fill(false)), f = ref(0), h5 = ref(false), w3 = ref(0), k3 = ref(1), v = ref(1), p = ref(1), y3 = ref(0), x3 = ref(0), b3 = ref(0), g = ref(0);
  function S3(F) {
    F.preventDefault(), h5.value && o.value > 1 && (F.key !== "ArrowLeft" && F.key !== "ArrowUp" || Fe(), F.key !== "ArrowRight" && F.key !== "ArrowDown" || Le2());
  }
  function _(F) {
    if (F) {
      if (F.name)
        return F.name;
      {
        const P3 = F.src.split("?")[0].split("/");
        return P3[P3.length - 1];
      }
    }
  }
  function E3(F) {
    k3.value = 1, w3.value = 0, b3.value = 0, g.value = 0, h5.value = true, f.value = F;
  }
  function H3(F, P3) {
    const G3 = String(F).split(".")[1], X3 = String(P3).split(".")[1];
    let te = Math.max((G3 == null ? void 0 : G3.length) || 0, (X3 == null ? void 0 : X3.length) || 0), ne = F.toFixed(te), Me = P3.toFixed(te);
    return (+ne.replace(".", "") + +Me.replace(".", "")) / Math.pow(10, te);
  }
  function A() {
    h5.value = false;
  }
  function j() {
    k3.value + e3.zoomRatio > e3.maxZoomScale ? k3.value = e3.maxZoomScale : k3.value = H3(k3.value, e3.zoomRatio);
  }
  function oe() {
    k3.value - e3.zoomRatio < e3.minZoomScale ? k3.value = e3.minZoomScale : k3.value = H3(k3.value, -e3.zoomRatio);
  }
  function ee() {
    k3.value = 1, v.value = 1, p.value = 1, w3.value = 0, b3.value = 0, g.value = 0;
  }
  function xe2() {
    w3.value += 90;
  }
  function Oe2() {
    w3.value -= 90;
  }
  function Ne() {
    v.value *= -1;
  }
  function qe() {
    p.value *= -1;
  }
  function Pe2(F) {
    console.log("e", F);
    const P3 = F.deltaY * e3.zoomRatio * 0.1;
    k3.value === e3.minZoomScale && P3 > 0 || k3.value === e3.maxZoomScale && P3 < 0 || (k3.value - P3 < e3.minZoomScale ? k3.value = e3.minZoomScale : k3.value - P3 > e3.maxZoomScale ? k3.value = e3.maxZoomScale : k3.value = H3(k3.value, -P3));
  }
  function Fe() {
    e3.loop ? f.value = (f.value - 1 + o.value) % o.value : f.value > 0 && f.value--, ee();
  }
  function Le2() {
    e3.loop ? f.value = (f.value + 1) % o.value : f.value < o.value - 1 && f.value++, ee();
  }
  return a3({ onPreview: E3 }), (F, P3) => (openBlock(), createElementBlock("div", St2, [createVNode(unref(be), { size: F.gap }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(u3.value, (G3, X3) => withDirectives((openBlock(), createElementBlock("div", { class: normalizeClass(["m-image", { bordered: F.bordered, "image-hover-mask": n.value[X3] }]), style: normalizeStyle(`width: ${s3.value}; height: ${c3.value};`), key: X3 }, [createVNode(unref(se), { spinning: !n.value[X3], indicator: "dynamic-circle" }, { default: withCtx(() => [createBaseVNode("img", { class: "u-image", style: normalizeStyle(`width: calc(${s3.value} - 2px); height: calc(${c3.value} - 2px); object-fit: ${F.fit};`), onLoad: (te) => {
    return ne = X3, void (n.value[ne] = true);
    var ne;
  }, src: G3.src, alt: G3.name }, null, 44, At2)]), _: 2 }, 1032, ["spinning"]), createBaseVNode("div", { class: "m-image-mask", onClick: (te) => E3(X3) }, [createBaseVNode("div", Ht2, [Et2, createBaseVNode("p", Vt, [renderSlot(F.$slots, "preview", {}, () => [createTextVNode(toDisplayString(F.preview), 1)], true)])])], 8, Dt)], 6)), [[vShow, !F.album || F.album && X3 === 0]])), 128))]), _: 3 }, 8, ["size"]), createVNode(Transition, { name: "mask" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", jt2, null, 512), [[vShow, h5.value]])]), _: 1 }), createVNode(Transition, { name: "preview" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-preview-wrap", onClick: withModifiers(A, ["self"]), onWheel: withModifiers(Pe2, ["prevent"]) }, [createBaseVNode("div", Tt, [createBaseVNode("div", Rt2, [createBaseVNode("a", { class: "u-name", href: u3.value[f.value].src, target: "_blank", title: _(u3.value[f.value]) }, toDisplayString(_(u3.value[f.value])), 9, Wt), withDirectives(createBaseVNode("p", { class: "u-preview-progress" }, toDisplayString(f.value + 1) + " / " + toDisplayString(o.value), 513), [[vShow, Array.isArray(F.src)]]), createBaseVNode("div", { class: "u-preview-operation", title: "关闭", onClick: A }, Ot2), createBaseVNode("div", { class: normalizeClass(["u-preview-operation", { "u-operation-disabled": k3.value === F.maxZoomScale }]), title: "放大", onClick: j }, Nt, 2), createBaseVNode("div", { class: normalizeClass(["u-preview-operation", { "u-operation-disabled": k3.value === F.minZoomScale }]), title: "缩小", onClick: oe }, qt2, 2), createBaseVNode("div", { class: "u-preview-operation", title: "还原", onClick: ee }, Pt), createBaseVNode("div", { class: "u-preview-operation", title: "向右旋转", onClick: xe2 }, Yt), createBaseVNode("div", { class: "u-preview-operation", title: "向左旋转", onClick: Oe2 }, Ut2), createBaseVNode("div", { class: "u-preview-operation", title: "水平镜像", onClick: Ne }, Kt), createBaseVNode("div", { class: "u-preview-operation", title: "垂直镜像", onClick: qe }, [(openBlock(), createElementBlock("svg", Gt2, Jt))])]), createBaseVNode("div", { class: "m-preview-image", style: normalizeStyle(`transform: translate3d(${b3.value}px, ${g.value}px, 0px);`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(u3.value, (G3, X3) => withDirectives((openBlock(), createBlock(unref(se), { spinning: !d3.value[X3], indicator: "dynamic-circle", key: X3 }, { default: withCtx(() => [createBaseVNode("img", { class: "u-preview-image", style: normalizeStyle(`transform: scale3d(${v.value * k3.value}, ${p.value * k3.value}, 1) rotate(${w3.value}deg);`), src: G3.src, alt: G3.name, onMousedown: P3[0] || (P3[0] = withModifiers((te) => function(ne) {
    const Me = ne.target.getBoundingClientRect(), P1 = Me.top, Y1 = Me.bottom, U1 = Me.right, K1 = Me.left, G1 = document.documentElement.clientWidth, J1 = document.documentElement.clientHeight;
    y3.value = ne.clientX, x3.value = ne.clientY;
    const Se2 = b3.value, Ae2 = g.value;
    document.onmousemove = (Z1) => {
      b3.value = Se2 + Z1.clientX - y3.value, g.value = Ae2 + Z1.clientY - x3.value;
    }, document.onmouseup = () => {
      b3.value > Se2 + G1 - U1 && (b3.value = Se2 + G1 - U1), b3.value < Se2 - K1 && (b3.value = Se2 - K1), g.value > Ae2 + J1 - Y1 && (g.value = Ae2 + J1 - Y1), g.value < Ae2 - P1 && (g.value = Ae2 - P1), document.onmousemove = null;
    };
  }(te), ["prevent"])), onLoad: (te) => function(ne) {
    d3.value[ne] = true;
  }(X3), onDblclick: P3[1] || (P3[1] = (te) => F.resetOnDbclick ? ee() : () => false) }, null, 44, Zt2)]), _: 2 }, 1032, ["spinning"])), [[vShow, f.value === X3]])), 128))], 4), o.value > 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", { class: normalizeClass(["m-switch-left", { "u-switch-disabled": f.value === 0 && !F.loop }]), onClick: Fe }, Xt2, 2), createBaseVNode("div", { class: normalizeClass(["m-switch-right", { "u-switch-disabled": f.value === o.value - 1 && !F.loop }]), onClick: Le2 }, Qt, 2)], 64)) : createCommentVNode("", true)])], 40, It2), [[vShow, h5.value]])]), _: 1 })]));
} });
var Ve = I2(e2, [["__scopeId", "data-v-fbf55b26"]]);
Ve.install = (l) => {
  l.component(Ve.__name, Ve);
};
var j1 = (l) => (pushScopeId("data-v-b16d02c6"), l = l(), popScopeId(), l);
var a22 = ["type", "value", "maxlength", "disabled"];
var l2 = [j1(() => createBaseVNode("svg", { focusable: "false", class: "u-clear", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })], -1))];
var t2 = { focusable: "false", class: "u-eye", "data-icon": "eye", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var s22 = [j1(() => createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" }, null, -1))];
var o2 = { focusable: "false", class: "u-eye", "data-icon": "eye-invisible", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var n2 = [j1(() => createBaseVNode("path", { d: "M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" }, null, -1)), j1(() => createBaseVNode("path", { d: "M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" }, null, -1))];
var i2 = { key: 2, class: "m-count" };
var r1 = I2(defineComponent({ inheritAttrs: false, __name: "Input", props: { width: { default: "100%" }, addonBefore: { default: "" }, addonAfter: { default: "" }, allowClear: { type: Boolean, default: false }, password: { type: Boolean, default: false }, disabled: { type: Boolean, default: false }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, size: { default: "middle" }, prefix: { default: "" }, suffix: { default: "" }, value: { default: "" }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "enter"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), c3 = computed(() => e3.maxlength ? e3.value.length + " / " + e3.maxlength : e3.value.length), u3 = ref(false), o = ref(), n = ref(1), d3 = ref(), f = ref(1), h5 = ref(), w3 = ref(1), k3 = ref(), v = ref(1);
  function p(_) {
    "lazy" in e3.valueModifiers || (a3("update:value", _.target.value), a3("change", _));
  }
  function y3(_) {
    "lazy" in e3.valueModifiers && (a3("update:value", _.target.value), a3("change", _));
  }
  function x3(_) {
    _.key === "Enter" && a3("enter", _);
  }
  onMounted(() => {
    n.value = o.value.offsetWidth, f.value = d3.value.offsetWidth, w3.value = h5.value.offsetWidth, v.value = k3.value.offsetWidth;
  });
  const b3 = ref();
  function g() {
    a3("update:value", ""), b3.value.focus();
  }
  function S3() {
    u3.value = !u3.value;
  }
  return (_, E3) => (openBlock(), createElementBlock("div", { class: "m-input-wrap", style: normalizeStyle(`width: ${s3.value};`) }, [w3.value !== 23 ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["m-addon", { before: w3.value }]), ref_key: "beforeRef", ref: h5 }, [renderSlot(_.$slots, "addonBefore", {}, () => [createTextVNode(toDisplayString(_.addonBefore), 1)], true)], 2)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["m-input", [`${_.size}`, { disabled: _.disabled, "input-before": w3.value !== 23, "input-after": v.value !== 23 }]]), tabindex: "1" }, [n.value ? (openBlock(), createElementBlock("span", { key: 0, class: "m-prefix", ref_key: "prefixRef", ref: o }, [renderSlot(_.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(_.prefix), 1)], true)], 512)) : createCommentVNode("", true), createBaseVNode("input", mergeProps({ class: "u-input", ref_key: "input", ref: b3, type: _.password && !u3.value ? "password" : "text", value: _.value, maxlength: _.maxlength, disabled: _.disabled, onInput: p, onChange: y3, onKeydown: x3 }, _.$attrs), null, 16, a22), f.value ? (openBlock(), createElementBlock("span", { key: 1, class: "m-suffix", ref_key: "suffixRef", ref: d3 }, [!_.disabled && _.allowClear && _.value ? (openBlock(), createElementBlock("span", { key: 0, class: "m-action", onClick: g }, l2)) : createCommentVNode("", true), _.password ? (openBlock(), createElementBlock("span", { key: 1, class: "m-action", onClick: S3 }, [withDirectives((openBlock(), createElementBlock("svg", t2, s22, 512)), [[vShow, u3.value]]), withDirectives((openBlock(), createElementBlock("svg", o2, n2, 512)), [[vShow, !u3.value]])])) : createCommentVNode("", true), _.showCount ? (openBlock(), createElementBlock("span", i2, toDisplayString(c3.value), 1)) : createCommentVNode("", true), renderSlot(_.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(_.suffix), 1)], true)], 512)) : createCommentVNode("", true)], 2), v.value !== 23 ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["m-addon", { after: v.value }]), ref_key: "afterRef", ref: k3 }, [renderSlot(_.$slots, "addonAfter", {}, () => [createTextVNode(toDisplayString(_.addonAfter), 1)], true)], 2)) : createCommentVNode("", true)], 4));
} }), [["__scopeId", "data-v-b16d02c6"]]);
r1.install = (l) => {
  l.component(r1.__name, r1);
};
var na2 = (l) => (pushScopeId("data-v-275fafbe"), l = l(), popScopeId(), l);
var c2 = { class: "m-input-wrap" };
var u2 = { class: "m-handler-wrap" };
var d22 = [na2(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "up", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" })], -1))];
var r2 = [na2(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "down", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })], -1))];
var v2 = defineComponent({ inheritAttrs: false, __name: "InputNumber", props: { width: { default: 90 }, min: { default: -1 / 0 }, max: { default: 1 / 0 }, step: { default: 1 }, precision: { default: 0 }, prefix: { default: "" }, formatter: { type: Function, default: (l) => l }, keyboard: { type: Boolean, default: true }, value: { default: null } }, emits: ["update:value", "change"], setup(l, { emit: a3 }) {
  var p;
  const e3 = l, s3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), c3 = computed(() => {
    var x3;
    const y3 = ((x3 = String(e3.step).split(".")[1]) == null ? void 0 : x3.length) || 0;
    return Math.max(e3.precision, y3);
  }), u3 = ref(e3.formatter((p = e3.value) == null ? void 0 : p.toFixed(c3.value)));
  watch(() => e3.value, (y3) => {
    u3.value = e3.formatter(y3 == null ? void 0 : y3.toFixed(c3.value));
  }), watch(u3, (y3) => {
    y3 || d3(null);
  });
  const o = ref(), n = ref(1);
  function d3(y3) {
    a3("change", y3), a3("update:value", y3);
  }
  function f(y3) {
    var b3, g;
    const x3 = y3.target.value.replaceAll(",", "");
    if (Number.isNaN(parseFloat(x3)))
      u3.value = (b3 = e3.value) == null ? void 0 : b3.toFixed(c3.value);
    else {
      if (parseFloat(x3) > e3.max)
        return void d3(e3.max);
      if (parseFloat(x3) < e3.min)
        return void d3(e3.min);
      parseFloat(x3) !== e3.value ? d3(parseFloat(x3)) : u3.value = (g = e3.value) == null ? void 0 : g.toFixed(c3.value);
    }
  }
  function h5(y3, x3) {
    const b3 = String(y3).split(".")[1], g = String(x3).split(".")[1];
    let S3 = Math.max((b3 == null ? void 0 : b3.length) || 0, (g == null ? void 0 : g.length) || 0), _ = y3.toFixed(S3), E3 = x3.toFixed(S3);
    return (+_.replace(".", "") + +E3.replace(".", "")) / Math.pow(10, S3);
  }
  function w3(y3) {
    y3.key === "ArrowUp" && k3(), y3.key === "ArrowDown" && v();
  }
  function k3() {
    d3(parseFloat(Math.min(e3.max, h5(e3.value || 0, +e3.step)).toFixed(c3.value)));
  }
  function v() {
    d3(parseFloat(Math.max(e3.min, h5(e3.value || 0, -e3.step)).toFixed(c3.value)));
  }
  return onMounted(() => {
    n.value = o.value.offsetWidth;
  }), (y3, x3) => (openBlock(), createElementBlock("div", { class: "m-input-number", tabindex: "1", style: normalizeStyle(`width: ${s3.value};`) }, [createBaseVNode("div", c2, [n.value ? (openBlock(), createElementBlock("span", { key: 0, class: "u-input-prefix", ref_key: "prefixRef", ref: o }, [renderSlot(y3.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(y3.prefix), 1)], true)], 512)) : createCommentVNode("", true), y3.keyboard ? withDirectives((openBlock(), createElementBlock("input", mergeProps({ key: 1, autocomplete: "off", class: "u-input-number", onChange: f, "onUpdate:modelValue": x3[0] || (x3[0] = (b3) => u3.value = b3), onKeydown: [x3[1] || (x3[1] = withKeys(withModifiers(() => {
  }, ["prevent"]), ["up"])), w3] }, y3.$attrs), null, 16)), [[vModelDynamic, u3.value]]) : withDirectives((openBlock(), createElementBlock("input", mergeProps({ key: 2, autocomplete: "off", class: "u-input-number", onChange: f, "onUpdate:modelValue": x3[2] || (x3[2] = (b3) => u3.value = b3) }, y3.$attrs), null, 16)), [[vModelDynamic, u3.value]])]), createBaseVNode("div", u2, [createBaseVNode("span", { class: normalizeClass(["u-up-arrow", { disabled: (y3.value || 0) >= y3.max }]), onClick: k3 }, d22, 2), createBaseVNode("span", { class: normalizeClass(["u-down-arrow", { disabled: (y3.value || 0) <= y3.min }]), onClick: v }, r2, 2)])], 4));
} });
var v1 = I2(v2, [["__scopeId", "data-v-275fafbe"]]);
v1.install = (l) => {
  l.component(v1.__name, v1);
};
var Re2 = (l) => (pushScopeId("data-v-7095e1cc"), l = l(), popScopeId(), l);
var p2 = ["onMouseenter", "onMouseleave"];
var f2 = [Re2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var h22 = [Re2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var m22 = [Re2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var g2 = [Re2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var y22 = [Re2(() => createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" }, null, -1))];
var k2 = { class: "u-content" };
var _e2 = ((l) => (l.info = "#1677FF", l.success = "#52c41a", l.error = "#ff4d4f", l.warning = "#faad14", l.loading = "#1677FF", l))(_e2 || {});
var je2 = I2(defineComponent({ __name: "Message", props: { duration: { default: 3e3 }, top: { default: 30 } }, emits: ["close"], setup(l, { expose: a3, emit: e3 }) {
  const s3 = l, c3 = ref(), u3 = ref([]), o = ref([]), n = ref([]), d3 = computed(() => u3.value.every((w3) => !w3));
  function f() {
    me(c3.value);
    const w3 = n.value.length - 1;
    u3.value[w3] = true, h5(w3);
  }
  function h5(w3) {
    o.value[w3] = re(() => {
      u3.value[w3] = false, e3("close");
    }, s3.duration);
  }
  return watch(d3, (w3, k3) => {
    !k3 && w3 && (c3.value = re(() => {
      n.value.splice(0), u3.value.splice(0);
    }, 300));
  }), a3({ info: function(w3) {
    n.value.push({ content: w3, mode: "info" }), f();
  }, success: function(w3) {
    n.value.push({ content: w3, mode: "success" }), f();
  }, error: function(w3) {
    n.value.push({ content: w3, mode: "error" }), f();
  }, warning: function(w3) {
    n.value.push({ content: w3, mode: "warning" }), f();
  }, loading: function(w3) {
    n.value.push({ content: w3, mode: "loading" }), f();
  } }), (w3, k3) => (openBlock(), createElementBlock("div", { class: "m-message-wrap", style: normalizeStyle(`top: ${w3.top}px;`) }, [createVNode(TransitionGroup, { name: "slide-fade" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (v, p) => withDirectives((openBlock(), createElementBlock("div", { class: "m-message", key: p }, [createBaseVNode("div", { class: "m-message-content", onMouseenter: (y3) => function(x3) {
    me(o.value[x3]);
  }(p), onMouseleave: (y3) => function(x3) {
    h5(x3);
  }(p) }, [v.mode === "info" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-svg", style: normalizeStyle({ fill: _e2[v.mode] }), viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true", focusable: "false" }, f2, 4)) : createCommentVNode("", true), v.mode === "success" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-svg", style: normalizeStyle({ fill: _e2[v.mode] }), viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true", focusable: "false" }, h22, 4)) : createCommentVNode("", true), v.mode === "error" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-svg", style: normalizeStyle({ fill: _e2[v.mode] }), viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true", focusable: "false" }, m22, 4)) : createCommentVNode("", true), v.mode === "warning" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-svg", style: normalizeStyle({ fill: _e2[v.mode] }), viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true", focusable: "false" }, g2, 4)) : createCommentVNode("", true), v.mode === "loading" ? (openBlock(), createElementBlock("svg", { key: 4, class: "u-svg circular", style: normalizeStyle({ stroke: _e2[v.mode] }), viewBox: "0 0 50 50", focusable: "false" }, y22, 4)) : createCommentVNode("", true), createBaseVNode("p", k2, toDisplayString(v.content), 1)], 40, p2)])), [[vShow, u3.value[p]]])), 128))]), _: 1 })], 4));
} }), [["__scopeId", "data-v-7095e1cc"]]);
je2.install = (l) => {
  l.component(je2.__name, je2);
};
var Ce = (l) => (pushScopeId("data-v-97057242"), l = l(), popScopeId(), l);
var b2 = { class: "m-modal-root" };
var w2 = { class: "m-modal-mask" };
var x2 = ["onClick"];
var M22 = { class: "m-body" };
var _2 = { class: "m-title" };
var z2 = { key: 0, focusable: "false", class: "u-icon confirm", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var C2 = [Ce(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), Ce(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var $2 = { key: 1, focusable: "false", class: "u-icon info", "data-icon": "info-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var B2 = [Ce(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var F2 = { key: 2, focusable: "false", class: "u-icon success", "data-icon": "check-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var L2 = [Ce(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var S22 = { key: 3, focusable: "false", class: "u-icon error", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var A2 = [Ce(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var D2 = { key: 4, focusable: "false", class: "u-icon warning", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var H22 = [Ce(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var E2 = { class: "u-title" };
var V2 = { class: "u-content" };
var j2 = { class: "m-btns" };
var p1 = I2(defineComponent({ __name: "Modal", props: { width: { default: 420 }, cancelText: { default: "取消" }, okText: { default: "确定" }, noticeText: { default: "知道了" }, center: { type: Boolean, default: true }, top: { default: 100 }, loading: { type: Boolean, default: false }, visible: { type: Boolean, default: false } }, emits: ["cancel", "ok", "know"], setup(l, { expose: a3, emit: e3 }) {
  const s3 = ref(""), c3 = ref();
  function u3() {
    e3("cancel");
  }
  function o() {
    e3("cancel");
  }
  function n() {
    e3("ok");
  }
  function d3() {
    e3("know");
  }
  return a3({ info: function(f) {
    s3.value = "info", c3.value = f;
  }, success: function(f) {
    s3.value = "success", c3.value = f;
  }, error: function(f) {
    s3.value = "error", c3.value = f;
  }, warning: function(f) {
    s3.value = "warning", c3.value = f;
  }, confirm: function(f) {
    s3.value = "confirm", c3.value = f;
  }, erase: function(f) {
    s3.value = "erase", c3.value = f;
  } }), (f, h5) => (openBlock(), createElementBlock("div", b2, [createVNode(Transition, { name: "mask" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", w2, null, 512), [[vShow, f.visible]])]), _: 1 }), createVNode(Transition, null, { default: withCtx(() => {
    var w3, k3;
    return [withDirectives(createBaseVNode("div", { class: "m-modal-wrap", onClick: withModifiers(u3, ["self"]) }, [createBaseVNode("div", { class: normalizeClass(["m-modal", f.center ? "relative-hv-center" : "top-center"]), style: normalizeStyle(`width: ${f.width}px; top: ${f.center ? "50%" : f.top + "px"};`) }, [createBaseVNode("div", { class: normalizeClass(["m-modal-body", { loading: f.loading }]) }, [createVNode(unref(se), { class: "u-spin", spinning: f.loading, size: "small" }, null, 8, ["spinning"]), createBaseVNode("div", M22, [createBaseVNode("div", _2, [s3.value === "confirm" || s3.value === "erase" ? (openBlock(), createElementBlock("svg", z2, C2)) : createCommentVNode("", true), s3.value === "info" ? (openBlock(), createElementBlock("svg", $2, B2)) : createCommentVNode("", true), s3.value === "success" ? (openBlock(), createElementBlock("svg", F2, L2)) : createCommentVNode("", true), s3.value === "error" ? (openBlock(), createElementBlock("svg", S22, A2)) : createCommentVNode("", true), s3.value === "warning" ? (openBlock(), createElementBlock("svg", D2, H22)) : createCommentVNode("", true), createBaseVNode("div", E2, toDisplayString((w3 = c3.value) == null ? void 0 : w3.title), 1)]), createBaseVNode("div", V2, toDisplayString((k3 = c3.value) == null ? void 0 : k3.content), 1)]), createBaseVNode("div", j2, [s3.value === "confirm" || s3.value === "erase" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(unref(fe), { class: "mr8", onClick: o }, { default: withCtx(() => [createTextVNode(toDisplayString(f.cancelText), 1)]), _: 1 }), s3.value === "confirm" ? (openBlock(), createBlock(unref(fe), { key: 0, type: "primary", onClick: n }, { default: withCtx(() => [createTextVNode(toDisplayString(f.okText), 1)]), _: 1 })) : createCommentVNode("", true), s3.value === "erase" ? (openBlock(), createBlock(unref(fe), { key: 1, type: "danger", onClick: n }, { default: withCtx(() => [createTextVNode(toDisplayString(f.okText), 1)]), _: 1 })) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), ["info", "success", "error", "warning"].includes(s3.value) ? (openBlock(), createBlock(unref(fe), { key: 1, type: "primary", onClick: d3 }, { default: withCtx(() => [createTextVNode(toDisplayString(f.noticeText), 1)]), _: 1 })) : createCommentVNode("", true)])], 2)], 6)], 8, x2), [[vShow, f.visible]])];
  }), _: 1 })]));
} }), [["__scopeId", "data-v-97057242"]]);
p1.install = (l) => {
  l.component(p1.__name, p1);
};
var ge2 = (l) => (pushScopeId("data-v-40ed4a6f"), l = l(), popScopeId(), l);
var I22 = ["onMouseenter", "onMouseleave"];
var T2 = { class: "m-notification-content" };
var R2 = [ge2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), ge2(() => createBaseVNode("path", { d: "M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1))];
var W2 = [ge2(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1)), ge2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var O2 = [ge2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), ge2(() => createBaseVNode("path", { d: "M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var N2 = [ge2(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1)), ge2(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var q2 = ["onClick"];
var P2 = [ge2(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var He2 = ((l) => (l.info = "#1677FF", l.success = "#52c41a", l.error = "#ff4d4f", l.warning = "#faad14", l))(He2 || {});
var f1 = I2(defineComponent({ __name: "Notification", props: { message: { default: "温馨提示" }, duration: { default: 4500 }, top: { default: 24 }, bottom: { default: 24 }, placement: { default: "topRight" } }, emits: ["close"], setup(l, { expose: a3, emit: e3 }) {
  const s3 = l, c3 = ref(), u3 = ref([]), o = ref([]), n = ref([]), d3 = ref(s3.placement), f = ref(), h5 = computed(() => u3.value.length === n.value.length);
  function w3() {
    me(c3.value), o.value.push(null);
    const v = n.value.length - 1;
    nextTick(() => {
      f.value[v].style.height = f.value[v].offsetHeight + "px", f.value[v].style.opacity = 1;
    }), n.value[v].placement && (d3.value = n.value[v].placement), s3.duration && (o.value[v] = re(() => {
      k3(v);
    }, s3.duration));
  }
  function k3(v) {
    u3.value.push(v), e3("close");
  }
  return watch(h5, (v, p) => {
    !p && v && (c3.value = re(() => {
      u3.value.splice(0), n.value.splice(0);
    }, 300));
  }), a3({ open: function(v) {
    n.value.push({ ...v, mode: "open" }), w3();
  }, info: function(v) {
    n.value.push({ ...v, mode: "info" }), w3();
  }, success: function(v) {
    n.value.push({ ...v, mode: "success" }), w3();
  }, error: function(v) {
    n.value.push({ ...v, mode: "error" }), w3();
  }, warning: function(v) {
    n.value.push({ ...v, mode: "warning" }), w3();
  } }), (v, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-notification-wrapper", d3.value]), style: normalizeStyle(`top: ${["topRight", "topLeft"].includes(d3.value) ? v.top : "auto"}px; bottom: ${["bottomRight", "bottomLeft"].includes(d3.value) ? v.bottom : ""}px;`) }, [createVNode(TransitionGroup, { name: ["topRight", "bottomRight"].includes(d3.value) ? "right" : "left" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (y3, x3) => withDirectives((openBlock(), createElementBlock("div", { ref_for: true, ref_key: "notification", ref: f, class: "m-notification", onMouseenter: (b3) => function(g) {
    me(o.value[g]), o.value[g] = null;
  }(x3), onMouseleave: (b3) => function(g) {
    s3.duration && (o.value[g] = re(() => {
      k3(g);
    }, s3.duration));
  }(x3), key: x3 }, [createBaseVNode("div", T2, [y3.mode === "info" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-svg", style: normalizeStyle(`fill: ${He2[y3.mode]}`), viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true", focusable: "false" }, R2, 4)) : createCommentVNode("", true), y3.mode === "success" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-svg", style: normalizeStyle(`fill: ${He2[y3.mode]}`), viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true", focusable: "false" }, W2, 4)) : createCommentVNode("", true), y3.mode === "warning" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-svg", style: normalizeStyle(`fill: ${He2[y3.mode]}`), viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true", focusable: "false" }, O2, 4)) : createCommentVNode("", true), y3.mode === "error" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-svg", style: normalizeStyle(`fill: ${He2[y3.mode]}`), viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true", focusable: "false" }, N2, 4)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["u-title", { mb4: y3.mode !== "open", ml36: y3.mode !== "open" }]) }, toDisplayString(y3.message || v.message), 3), createBaseVNode("p", { class: normalizeClass(["u-description", { ml36: y3.mode !== "open" }]) }, toDisplayString(y3.description || "--"), 3), (openBlock(), createElementBlock("svg", { class: "u-close", onClick: (b3) => k3(x3), viewBox: "64 64 896 896", "data-icon": "close", "aria-hidden": "true", focusable: "false" }, P2, 8, q2))])], 40, I22)), [[vShow, !u3.value.includes(x3)]])), 128))]), _: 1 }, 8, ["name"])], 6));
} }), [["__scopeId", "data-v-40ed4a6f"]]);
f1.install = (l) => {
  l.component(f1.__name, f1);
};
var h1 = defineComponent({ __name: "NumberAnimation", props: { from: { default: 0 }, to: { default: 1e3 }, duration: { default: 3e3 }, autoplay: { type: Boolean, default: true }, precision: { default: 0 }, prefix: { default: "" }, suffix: { default: "" }, separator: { default: "," }, decimal: { default: "." }, valueStyle: { default: () => ({}) }, transition: { default: "easeInOutCubic" } }, emits: ["started", "finished"], setup(l, { expose: a3, emit: e3 }) {
  const s3 = l, c3 = ref(s3.from);
  watchEffect(() => {
    c3.value = s3.from;
  }), watch([() => s3.from, () => s3.to], () => {
    s3.autoplay && o();
  }), onMounted(() => {
    s3.autoplay && o();
  });
  const u3 = useTransition(c3, { duration: s3.duration, transition: TransitionPresets[s3.transition], onFinished: () => e3("finished"), onStarted: () => e3("started") });
  function o() {
    c3.value = s3.to;
  }
  const n = computed(() => function(d3) {
    const { precision: f, decimal: h5, separator: w3, suffix: k3, prefix: v } = s3;
    if (d3 === 0)
      return d3.toFixed(f);
    if (!d3)
      return "";
    d3 = Number(d3).toFixed(f);
    const p = (d3 += "").split(".");
    let y3 = p[0];
    const x3 = p.length > 1 ? h5 + p[1] : "", b3 = /(\d+)(\d{3})/;
    if (w3 && (g = w3, Object.prototype.toString.call(g) !== "[object Number]"))
      for (; b3.test(y3); )
        y3 = y3.replace(b3, "$1" + w3 + "$2");
    var g;
    return v + y3 + x3 + k3;
  }(u3.value));
  return a3({ play: o }), (d3, f) => (openBlock(), createElementBlock("span", { style: normalizeStyle(d3.valueStyle) }, toDisplayString(n.value), 5));
} });
h1.install = (l) => {
  l.component(h1.__name, h1);
};
var $e2 = (l) => (pushScopeId("data-v-80b1a1f1"), l = l(), popScopeId(), l);
var Y2 = { class: "m-pagination-wrap" };
var U2 = { key: 0, class: "mr8" };
var K2 = [$e2(() => createBaseVNode("svg", { class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "left", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })], -1))];
var G2 = [$e2(() => createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1)), $e2(() => createBaseVNode("svg", { class: "u-icon", viewBox: "64 64 896 896", "data-icon": "double-left", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" })], -1))];
var J2 = ["onClick"];
var Z2 = [$e2(() => createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1)), $e2(() => createBaseVNode("svg", { class: "u-icon", viewBox: "64 64 896 896", "data-icon": "double-right", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" })], -1))];
var X2 = [$e2(() => createBaseVNode("svg", { class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "right", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })], -1))];
var Q2 = { key: 1, class: "u-jump-page" };
var Ie = I2(defineComponent({ __name: "Pagination", props: { current: { default: 1 }, pageSize: { default: 10 }, total: { default: 0 }, pageListNum: { default: 5 }, hideOnSinglePage: { type: Boolean, default: false }, showQuickJumper: { type: Boolean, default: false }, showTotal: { type: Boolean, default: false }, placement: { default: "center" } }, emits: ["change"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = ref(e3.current), c3 = ref(""), u3 = ref(false), o = ref(false), n = ref(false), d3 = ref(false), f = computed(() => Math.ceil(e3.total / e3.pageSize)), h5 = computed(() => function(p) {
    var y3 = [], x3 = Math.floor(e3.pageListNum / 2), b3 = { start: p - x3, end: p + x3 };
    b3.start < 1 && (b3.end = b3.end + (1 - b3.start), b3.start = 1), b3.end > f.value && (b3.start = b3.start - (b3.end - f.value), b3.end = f.value), b3.start < 1 && (b3.start = 1), b3.start > 1 ? u3.value = true : u3.value = false, b3.end < f.value ? o.value = true : o.value = false;
    for (let g = b3.start; g <= b3.end; g++)
      y3.push(g);
    return y3;
  }(s3.value).filter((p) => p !== 1 && p !== f.value));
  function w3() {
    s3.value = s3.value - e3.pageListNum > 0 ? s3.value - e3.pageListNum : 1;
  }
  function k3() {
    s3.value = s3.value + e3.pageListNum < f.value ? s3.value + e3.pageListNum : f.value;
  }
  function v(p) {
    if (p === 0 || p === f.value + 1)
      return false;
    s3.value !== p && (s3.value = p);
  }
  return watch(s3, (p) => {
    console.log("change:", p), a3("change", { page: p, pageSize: e3.pageSize });
  }), onMounted(() => {
    document.onkeydown = (p) => {
      p && p.key === "Enter" && function() {
        var y3 = Number(c3.value);
        Number.isInteger(y3) && (y3 < 1 && (y3 = 1), y3 > f.value && (y3 = f.value), v(y3)), c3.value = "";
      }();
    };
  }), onUnmounted(() => {
    document.onkeydown = null;
  }), (p, y3) => (openBlock(), createElementBlock("div", { class: normalizeClass([`m-pagination ${p.placement}`, { hidden: p.hideOnSinglePage && p.total <= p.pageSize }]) }, [createBaseVNode("div", Y2, [p.showTotal ? (openBlock(), createElementBlock("span", U2, "共 " + toDisplayString(f.value) + " 页 / " + toDisplayString(p.total) + " 条", 1)) : createCommentVNode("", true), createBaseVNode("span", { class: normalizeClass(["u-item", { disabled: s3.value === 1 }]), onClick: y3[0] || (y3[0] = (x3) => v(s3.value - 1)) }, K2, 2), createBaseVNode("span", { class: normalizeClass(["u-item", { active: s3.value === 1 }]), onClick: y3[1] || (y3[1] = (x3) => v(1)) }, "1", 2), withDirectives(createBaseVNode("span", { class: "m-arrow", ref: "forward", onClick: w3, onMouseenter: y3[2] || (y3[2] = (x3) => n.value = true), onMouseleave: y3[3] || (y3[3] = (x3) => n.value = false) }, G2, 544), [[vShow, u3.value && h5.value[0] - 1 > 1]]), (openBlock(true), createElementBlock(Fragment, null, renderList(h5.value, (x3, b3) => (openBlock(), createElementBlock("span", { class: normalizeClass(["u-item", { active: s3.value === x3 }]), key: b3, onClick: (g) => v(x3) }, toDisplayString(x3), 11, J2))), 128)), withDirectives(createBaseVNode("span", { class: "m-arrow", ref: "backward", onClick: k3, onMouseenter: y3[4] || (y3[4] = (x3) => d3.value = true), onMouseleave: y3[5] || (y3[5] = (x3) => d3.value = false) }, Z2, 544), [[vShow, o.value && h5.value[h5.value.length - 1] + 1 < f.value]]), withDirectives(createBaseVNode("span", { class: normalizeClass(["u-item", { active: s3.value === f.value }]), onClick: y3[6] || (y3[6] = (x3) => v(f.value)) }, toDisplayString(f.value), 3), [[vShow, f.value !== 1]]), createBaseVNode("span", { class: normalizeClass(["u-item", { disabled: s3.value === f.value }]), onClick: y3[7] || (y3[7] = (x3) => v(s3.value + 1)) }, X2, 2), p.showQuickJumper ? (openBlock(), createElementBlock("span", Q2, [createTextVNode("跳至"), withDirectives(createBaseVNode("input", { type: "text", "onUpdate:modelValue": y3[8] || (y3[8] = (x3) => c3.value = x3) }, null, 512), [[vModelText, c3.value]]), createTextVNode("页")])) : createCommentVNode("", true)])], 2));
} }), [["__scopeId", "data-v-80b1a1f1"]]);
Ie.install = (l) => {
  l.component(Ie.__name, Ie);
};
var We2 = (l) => (pushScopeId("data-v-11f4813c"), l = l(), popScopeId(), l);
var e4 = { class: "m-popconfirm" };
var a4 = { class: "m-pop" };
var l4 = { class: "m-pop-message" };
var t4 = { class: "m-icon" };
var s4 = { key: 0, focusable: "false", class: "u-icon", width: "1em", height: "1em", viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true" };
var o4 = [We2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var n4 = { key: 1, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#52c41a" }, viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true" };
var i4 = [We2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var c4 = { key: 2, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#ff4d4f" }, viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true" };
var u4 = [We2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var d4 = { key: 3, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#faad14" }, viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true" };
var r4 = [We2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var v4 = { class: "m-pop-buttons" };
var p4 = We2(() => createBaseVNode("div", { class: "m-pop-arrow" }, [createBaseVNode("span", { class: "u-pop-arrow" })], -1));
var m1 = I2(defineComponent({ __name: "Popconfirm", props: { title: { default: "" }, description: { default: "" }, content: { default: "" }, icon: { default: "" }, iconType: { default: "warning" }, maxWidth: { default: "auto" }, cancelText: { default: "取消" }, cancelType: { default: "default" }, okText: { default: "确定" }, okType: { default: "primary" }, showCancel: { type: Boolean, default: true } }, emits: ["cancel", "ok", "openChange"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = computed(() => typeof e3.maxWidth == "number" ? e3.maxWidth + "px" : e3.maxWidth), c3 = ref(false), u3 = ref(), o = ref(1);
  onMounted(() => {
    o.value = u3.value.offsetHeight;
  });
  const n = ref(0), d3 = ref(0), f = ref(), h5 = ref(), w3 = ref(false);
  function k3() {
    w3.value = false;
  }
  function v() {
    w3.value = true, h5.value.focus();
  }
  function p() {
    c3.value = !c3.value, c3.value && function() {
      const b3 = f.value.offsetWidth, g = h5.value.offsetWidth, S3 = h5.value.offsetHeight;
      n.value = S3 + 4, d3.value = (g - b3) / 2;
    }(), a3("openChange", c3.value);
  }
  function y3(b3) {
    c3.value = false, a3("openChange", false), a3("cancel", b3);
  }
  function x3(b3) {
    c3.value = false, a3("openChange", false), a3("ok", b3);
  }
  return (b3, g) => {
    const S3 = resolveComponent("Button");
    return openBlock(), createElementBlock("div", e4, [createBaseVNode("div", { ref_key: "popRef", ref: h5, tabindex: "1", class: normalizeClass(["m-pop-content", { "show-pop": c3.value }]), style: normalizeStyle(`max-width: ${s3.value}; top: ${-n.value}px; left: ${-d3.value}px;`), onBlur: g[0] || (g[0] = (_) => w3.value ? (c3.value = false, void a3("openChange", false)) : () => false) }, [createBaseVNode("div", a4, [createBaseVNode("div", l4, [createBaseVNode("span", t4, [renderSlot(b3.$slots, "icon", {}, () => [b3.iconType === "info" ? (openBlock(), createElementBlock("svg", s4, o4)) : createCommentVNode("", true), b3.iconType === "success" ? (openBlock(), createElementBlock("svg", n4, i4)) : createCommentVNode("", true), b3.iconType === "error" ? (openBlock(), createElementBlock("svg", c4, u4)) : createCommentVNode("", true), b3.iconType === "warning" ? (openBlock(), createElementBlock("svg", d4, r4)) : createCommentVNode("", true)], true)]), createBaseVNode("div", { class: normalizeClass(["m-title", { "font-weight": o.value }]) }, [renderSlot(b3.$slots, "title", {}, () => [createTextVNode(toDisplayString(b3.title), 1)], true)], 2)]), o.value ? (openBlock(), createElementBlock("div", { key: 0, class: "m-pop-description", ref_key: "desc", ref: u3 }, [renderSlot(b3.$slots, "description", {}, () => [createTextVNode(toDisplayString(b3.description), 1)], true)], 512)) : createCommentVNode("", true), createBaseVNode("div", v4, [b3.showCancel ? (openBlock(), createBlock(S3, { key: 0, onClick: y3, size: "small", type: b3.cancelType }, { default: withCtx(() => [createTextVNode(toDisplayString(b3.cancelText), 1)]), _: 1 }, 8, ["type"])) : createCommentVNode("", true), createVNode(S3, { onClick: x3, size: "small", type: b3.okType }, { default: withCtx(() => [createTextVNode(toDisplayString(b3.okText), 1)]), _: 1 }, 8, ["type"])])]), p4], 38), createBaseVNode("div", { ref_key: "contentRef", ref: f, onClick: p, onMouseenter: k3, onMouseleave: v }, [renderSlot(b3.$slots, "default", {}, () => [createTextVNode(toDisplayString(b3.content), 1)], true)], 544)]);
  };
} }), [["__scopeId", "data-v-11f4813c"]]);
m1.install = (l) => {
  l.component(m1.__name, m1);
};
var ia2 = (l) => (pushScopeId("data-v-27020600"), l = l(), popScopeId(), l);
var f4 = { class: "m-progress-inner" };
var h4 = { key: 0, class: "m-success" };
var m4 = [ia2(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" })], -1))];
var g4 = { key: 1, class: "u-progress-text" };
var y4 = { class: "u-progress-circle", viewBox: "0 0 100 100" };
var k4 = ["d", "stroke-width"];
var b4 = ["d", "stroke-width", "stroke", "opacity"];
var w4 = { key: 0, class: "u-icon", focusable: "false", "data-icon": "check", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var x4 = [ia2(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1))];
var M4 = { key: 1, class: "u-progress-text" };
var g1 = I2(defineComponent({ __name: "Progress", props: { width: { default: "100%" }, percent: { default: 0 }, strokeColor: { default: "#1677FF" }, strokeWidth: { default: 8 }, showInfo: { type: Boolean, default: true }, type: { default: "line" } }, setup(l) {
  const a3 = l, e3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), s3 = computed(() => (100 - a3.strokeWidth) * Math.PI), c3 = computed(() => {
    const o = 100 - a3.strokeWidth;
    return `M 50,50 m 0,-${o / 2}
   a ${o / 2},${o / 2} 0 1 1 0,${o}
   a ${o / 2},${o / 2} 0 1 1 0,-${o}`;
  }), u3 = computed(() => typeof a3.strokeColor == "string" ? a3.strokeColor : `linear-gradient(to ${a3.strokeColor.direction || "right"}, ${a3.strokeColor["0%"] || a3.strokeColor.from}, ${a3.strokeColor["100%"] || a3.strokeColor.to})`);
  return (o, n) => o.type === "line" ? (openBlock(), createElementBlock("div", { key: 0, class: "m-progress-line", style: normalizeStyle(`width: ${e3.value}; height: ${o.strokeWidth < 24 ? 24 : o.strokeWidth}px;`) }, [createBaseVNode("div", f4, [createBaseVNode("div", { class: normalizeClass(["u-progress-bg", { "u-success-bg": o.percent >= 100 }]), style: normalizeStyle(`background: ${u3.value}; width: ${o.percent >= 100 ? 100 : o.percent}%; height: ${o.strokeWidth}px;`) }, null, 6)]), o.showInfo ? (openBlock(), createBlock(Transition, { key: 0, mode: "out-in" }, { default: withCtx(() => [o.percent >= 100 ? (openBlock(), createElementBlock("span", h4, m4)) : (openBlock(), createElementBlock("p", g4, toDisplayString(o.percent >= 100 ? 100 : o.percent) + "%", 1))]), _: 1 })) : createCommentVNode("", true)], 4)) : (openBlock(), createElementBlock("div", { key: 1, class: "m-progress-circle", style: normalizeStyle(`width: ${e3.value}; height: ${e3.value};`) }, [(openBlock(), createElementBlock("svg", y4, [createBaseVNode("path", { d: c3.value, "stroke-linecap": "round", class: "u-progress-circle-trail", "stroke-width": o.strokeWidth, style: normalizeStyle(`stroke-dasharray: ${s3.value}px, ${s3.value}px;`), "fill-opacity": "0" }, null, 12, k4), createBaseVNode("path", { d: c3.value, "stroke-linecap": "round", class: normalizeClass(["u-progress-circle-path", { success: o.percent >= 100 }]), "stroke-width": o.strokeWidth, stroke: u3.value, style: normalizeStyle(`stroke-dasharray: ${o.percent / 100 * s3.value}px, ${s3.value}px;`), opacity: o.percent === 0 ? 0 : 1, "fill-opacity": "0" }, null, 14, b4)])), o.showInfo ? (openBlock(), createBlock(Transition, { key: 0, mode: "out-in" }, { default: withCtx(() => [o.percent >= 100 ? (openBlock(), createElementBlock("svg", w4, x4)) : (openBlock(), createElementBlock("p", M4, toDisplayString(o.percent >= 100 ? 100 : o.percent) + "%", 1))]), _: 1 })) : createCommentVNode("", true)], 4));
} }), [["__scopeId", "data-v-27020600"]]);
g1.install = (l) => {
  l.component(g1.__name, g1);
};
var _4 = ["src"];
var y1 = I2(defineComponent({ __name: "QRCode", props: { value: { default: "" }, size: { default: 160 }, color: { default: "#000" }, backgroundColor: { default: "#FFF" }, bordered: { type: Boolean, default: true }, borderColor: { default: "#0505050f" }, scale: { default: 8 }, errorLevel: { default: "H" } }, setup(l) {
  const a3 = l, e3 = useQRCode(a3.value, { errorCorrectionLevel: a3.errorLevel, type: "image/png", quality: 1, margin: 3, scale: a3.scale, color: { dark: a3.color, light: a3.backgroundColor } });
  return (s3, c3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-qrcode", { bordered: s3.bordered }]), style: normalizeStyle(`width: ${s3.size}px; height: ${s3.size}px; border-color: ${s3.borderColor};`) }, [createBaseVNode("img", { src: unref(e3), class: "u-qrcode", alt: "QRCode" }, null, 8, _4)], 6));
} }), [["__scopeId", "data-v-a604e87a"]]);
y1.install = (l) => {
  l.component(y1.__name, y1);
};
var z4 = { class: "m-radio" };
var C4 = ["onClick"];
var $4 = { class: "u-label" };
var k1 = I2(defineComponent({ __name: "Radio", props: { options: { default: () => [] }, disabled: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, value: { default: null }, gap: { default: 8 } }, emits: ["update:value", "change"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = computed(() => e3.options.length), c3 = computed(() => e3.vertical ? { marginBottom: e3.gap + "px" } : { marginRight: e3.gap + "px" });
  return (u3, o) => (openBlock(), createElementBlock("div", z4, [(openBlock(true), createElementBlock(Fragment, null, renderList(u3.options, (n, d3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio-wrap", { vertical: u3.vertical }]), style: normalizeStyle(s3.value !== d3 + 1 ? c3.value : ""), key: d3 }, [createBaseVNode("div", { class: normalizeClass(["m-box", { disabled: u3.disabled || n.disabled }]), onClick: (f) => {
    return u3.disabled || n.disabled ? () => false : void ((h5 = n.value) !== e3.value && (a3("update:value", h5), a3("change", h5)));
    var h5;
  } }, [createBaseVNode("span", { class: normalizeClass(["u-radio", { "u-radio-checked": u3.value === n.value }]) }, null, 2), createBaseVNode("span", $4, [renderSlot(u3.$slots, "default", { label: n.label }, () => [createTextVNode(toDisplayString(n.label), 1)], true)])], 10, C4)], 6))), 128))]));
} }), [["__scopeId", "data-v-93208a6d"]]);
k1.install = (l) => {
  l.component(k1.__name, k1);
};
var ye = (l) => (pushScopeId("data-v-3840d4df"), l = l(), popScopeId(), l);
var B4 = ["onClick"];
var F4 = ["onClick", "onMouseenter"];
var L4 = [ye(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1))];
var S4 = [ye(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1))];
var A4 = [ye(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1))];
var D4 = [ye(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1))];
var H4 = ["onClick", "onMouseenter"];
var E4 = [ye(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1))];
var V4 = [ye(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1))];
var j4 = [ye(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1))];
var I4 = [ye(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1))];
var b1 = I2(defineComponent({ __name: "Rate", props: { allowClear: { type: Boolean, default: true }, allowHalf: { type: Boolean, default: false }, count: { default: 5 }, character: { default: "star-filled" }, size: { default: 20 }, color: { default: "#fadb14" }, gap: { default: 8 }, disabled: { type: Boolean, default: false }, value: { default: 0 } }, emits: ["update:value", "change", "hoverChange"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = ref(e3.value), c3 = ref();
  function u3(d3) {
    c3.value = null, d3 !== e3.value ? (a3("change", d3), a3("update:value", d3)) : e3.allowClear ? (c3.value = d3, a3("change", 0), a3("update:value", 0)) : a3("change", d3);
  }
  function o() {
    c3.value = null;
  }
  function n() {
    s3.value = e3.value;
  }
  return watch(() => e3.value, (d3) => {
    s3.value = d3;
  }), (d3, f) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-rate", { disabled: d3.disabled }]), style: normalizeStyle(`--color: ${d3.color};`), onMouseleave: n }, [(openBlock(true), createElementBlock(Fragment, null, renderList(d3.count, (h5) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-star", { "u-star-half": d3.allowHalf && s3.value >= h5 - 0.5 && s3.value < h5, "u-star-full": s3.value >= h5, "temp-gray": !d3.allowHalf && c3.value === h5 }]), style: normalizeStyle(`margin-right: ${h5 !== d3.count ? d3.gap : 0}px;`), onClick: (w3) => d3.allowHalf ? void w3.preventDefault() : u3(h5), key: h5 }, [d3.allowHalf ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["u-star-first", { "temp-gray-first": c3.value === h5 - 0.5 }]), onClick: withModifiers((w3) => u3(h5 - 0.5), ["stop"]), onMouseenter: (w3) => {
    return k3 = h5 - 0.5, s3.value = k3, void a3("hoverChange", k3);
    var k3;
  }, onMouseleave: o }, [d3.character === "star-filled" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-star", style: normalizeStyle(`width: ${d3.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, L4, 4)) : d3.character === "star-outlined" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-star", style: normalizeStyle(`width: ${d3.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, S4, 4)) : d3.character === "heart-filled" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-star", style: normalizeStyle(`width: ${d3.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, A4, 4)) : d3.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-star", style: normalizeStyle(`width: ${d3.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, D4, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-star", style: normalizeStyle(`font-size: ${0.66 * d3.size}px; height: ${d3.size}px;`) }, [renderSlot(d3.$slots, "character", {}, () => [createTextVNode(toDisplayString(d3.character), 1)], true)], 4))], 42, F4)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["u-star-second", { "temp-gray-second": c3.value === h5 }]), onClick: withModifiers((w3) => u3(h5), ["stop"]), onMouseenter: (w3) => {
    return k3 = h5, s3.value = k3, void a3("hoverChange", k3);
    var k3;
  }, onMouseleave: o }, [d3.character === "star-filled" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-star", style: normalizeStyle(`width: ${d3.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, E4, 4)) : d3.character === "star-outlined" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-star", style: normalizeStyle(`width: ${d3.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, V4, 4)) : d3.character === "heart-filled" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-star", style: normalizeStyle(`width: ${d3.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, j4, 4)) : d3.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-star", style: normalizeStyle(`width: ${d3.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, I4, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-star", style: normalizeStyle(`font-size: ${0.66 * d3.size}px; height: ${d3.size}px;`) }, [renderSlot(d3.$slots, "character", {}, () => [createTextVNode(toDisplayString(d3.character), 1)], true)], 4))], 42, H4)], 14, B4))), 128))], 38));
} }), [["__scopeId", "data-v-3840d4df"]]);
b1.install = (l) => {
  l.component(b1.__name, b1);
};
var T1 = (l) => (pushScopeId("data-v-9ab8168c"), l = l(), popScopeId(), l);
var T4 = { class: "m-result" };
var R4 = { class: "m-image" };
var W4 = { key: 0, focusable: "false", class: "u-svg", style: "fill: @themeColor;", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var O4 = [T1(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var N4 = { key: 1, focusable: "false", class: "u-svg", style: "fill: #52c41a;", "data-icon": "check-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var q4 = [T1(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var P4 = { key: 2, focusable: "false", class: "u-svg", style: "fill: #faad14;", "data-icon": "warning", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Y4 = [T1(() => createBaseVNode("path", { d: "M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var U4 = { key: 3, focusable: "false", class: "u-svg", style: "fill: #ff4d4f;", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var K4 = [T1(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var G4 = { key: 4, class: "u-image", width: "251", height: "294" };
var J4 = [createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-9ab8168c><path d="M0 129.023v-2.084C0 58.364 55.591 2.774 124.165 2.774h2.085c68.574 0 124.165 55.59 124.165 124.165v2.084c0 68.575-55.59 124.166-124.165 124.166h-2.085C55.591 253.189 0 197.598 0 129.023" fill="#E4EBF7" data-v-9ab8168c></path><path d="M41.417 132.92a8.231 8.231 0 1 1-16.38-1.65 8.231 8.231 0 0 1 16.38 1.65" fill="#FFF" data-v-9ab8168c></path><path d="M38.652 136.36l10.425 5.91M49.989 148.505l-12.58 10.73" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path d="M41.536 161.28a5.636 5.636 0 1 1-11.216-1.13 5.636 5.636 0 0 1 11.216 1.13M59.154 145.261a5.677 5.677 0 1 1-11.297-1.138 5.677 5.677 0 0 1 11.297 1.138M100.36 29.516l29.66-.013a4.562 4.562 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 0 0 .005 9.126M111.705 47.754l29.659-.013a4.563 4.563 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 1 0 .005 9.126" fill="#FFF" data-v-9ab8168c></path><path d="M114.066 29.503V29.5l15.698-.007a4.563 4.563 0 1 0 .004 9.126l-15.698.007v-.002a4.562 4.562 0 0 0-.004-9.122M185.405 137.723c-.55 5.455-5.418 9.432-10.873 8.882-5.456-.55-9.432-5.418-8.882-10.873.55-5.455 5.418-9.432 10.873-8.882 5.455.55 9.432 5.418 8.882 10.873" fill="#FFF" data-v-9ab8168c></path><path d="M180.17 143.772l12.572 7.129M193.841 158.42L178.67 171.36" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path d="M185.55 171.926a6.798 6.798 0 1 1-13.528-1.363 6.798 6.798 0 0 1 13.527 1.363M204.12 155.285a6.848 6.848 0 1 1-13.627-1.375 6.848 6.848 0 0 1 13.626 1.375" fill="#FFF" data-v-9ab8168c></path><path d="M152.988 194.074a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0zM225.931 118.217a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM217.09 153.051a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.42 0zM177.84 109.842a2.21 2.21 0 1 1-4.422 0 2.21 2.21 0 0 1 4.421 0zM196.114 94.454a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM202.844 182.523a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0z" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path stroke="#FFF" stroke-width="2" d="M215.125 155.262l-1.902 20.075-10.87 5.958M174.601 176.636l-6.322 9.761H156.98l-4.484 6.449M175.874 127.28V111.56M221.51 119.404l-12.77 7.859-15.228-7.86V96.668" data-v-9ab8168c></path><path d="M180.68 29.32C180.68 13.128 193.806 0 210 0c16.193 0 29.32 13.127 29.32 29.32 0 16.194-13.127 29.322-29.32 29.322-16.193 0-29.32-13.128-29.32-29.321" fill="#A26EF4" data-v-9ab8168c></path><path d="M221.45 41.706l-21.563-.125a1.744 1.744 0 0 1-1.734-1.754l.071-12.23a1.744 1.744 0 0 1 1.754-1.734l21.562.125c.964.006 1.74.791 1.735 1.755l-.071 12.229a1.744 1.744 0 0 1-1.754 1.734" fill="#FFF" data-v-9ab8168c></path><path d="M215.106 29.192c-.015 2.577-2.049 4.654-4.543 4.64-2.494-.014-4.504-2.115-4.489-4.693l.04-6.925c.016-2.577 2.05-4.654 4.543-4.64 2.494.015 4.504 2.116 4.49 4.693l-.04 6.925zm-4.53-14.074a6.877 6.877 0 0 0-6.916 6.837l-.043 7.368a6.877 6.877 0 0 0 13.754.08l.042-7.368a6.878 6.878 0 0 0-6.837-6.917zM167.566 68.367h-3.93a4.73 4.73 0 0 1-4.717-4.717 4.73 4.73 0 0 1 4.717-4.717h3.93a4.73 4.73 0 0 1 4.717 4.717 4.73 4.73 0 0 1-4.717 4.717" fill="#FFF" data-v-9ab8168c></path><path d="M168.214 248.838a6.611 6.611 0 0 1-6.61-6.611v-66.108a6.611 6.611 0 0 1 13.221 0v66.108a6.611 6.611 0 0 1-6.61 6.61" fill="#5BA02E" data-v-9ab8168c></path><path d="M176.147 248.176a6.611 6.611 0 0 1-6.61-6.61v-33.054a6.611 6.611 0 1 1 13.221 0v33.053a6.611 6.611 0 0 1-6.61 6.611" fill="#92C110" data-v-9ab8168c></path><path d="M185.994 293.89h-27.376a3.17 3.17 0 0 1-3.17-3.17v-45.887a3.17 3.17 0 0 1 3.17-3.17h27.376a3.17 3.17 0 0 1 3.17 3.17v45.886a3.17 3.17 0 0 1-3.17 3.17" fill="#F2D7AD" data-v-9ab8168c></path><path d="M81.972 147.673s6.377-.927 17.566-1.28c11.729-.371 17.57 1.086 17.57 1.086s3.697-3.855.968-8.424c1.278-12.077 5.982-32.827.335-48.273-1.116-1.339-3.743-1.512-7.536-.62-1.337.315-7.147-.149-7.983-.1l-15.311-.347s-3.487-.17-8.035-.508c-1.512-.113-4.227-1.683-5.458-.338-.406.443-2.425 5.669-1.97 16.077l8.635 35.642s-3.141 3.61 1.219 7.085" fill="#FFF" data-v-9ab8168c></path><path d="M75.768 73.325l-.9-6.397 11.982-6.52s7.302-.118 8.038 1.205c.737 1.324-5.616.993-5.616.993s-1.836 1.388-2.615 2.5c-1.654 2.363-.986 6.471-8.318 5.986-1.708.284-2.57 2.233-2.57 2.233" fill="#FFC6A0" data-v-9ab8168c></path><path d="M52.44 77.672s14.217 9.406 24.973 14.444c1.061.497-2.094 16.183-11.892 11.811-7.436-3.318-20.162-8.44-21.482-14.496-.71-3.258 2.543-7.643 8.401-11.76M141.862 80.113s-6.693 2.999-13.844 6.876c-3.894 2.11-10.137 4.704-12.33 7.988-6.224 9.314 3.536 11.22 12.947 7.503 6.71-2.651 28.999-12.127 13.227-22.367" fill="#FFB594" data-v-9ab8168c></path><path d="M76.166 66.36l3.06 3.881s-2.783 2.67-6.31 5.747c-7.103 6.195-12.803 14.296-15.995 16.44-3.966 2.662-9.754 3.314-12.177-.118-3.553-5.032.464-14.628 31.422-25.95" fill="#FFC6A0" data-v-9ab8168c></path><path d="M64.674 85.116s-2.34 8.413-8.912 14.447c.652.548 18.586 10.51 22.144 10.056 5.238-.669 6.417-18.968 1.145-20.531-.702-.208-5.901-1.286-8.853-2.167-.87-.26-1.611-1.71-3.545-.936l-1.98-.869zM128.362 85.826s5.318 1.956 7.325 13.734c-.546.274-17.55 12.35-21.829 7.805-6.534-6.94-.766-17.393 4.275-18.61 4.646-1.121 5.03-1.37 10.23-2.929" fill="#FFF" data-v-9ab8168c></path><path d="M78.18 94.656s.911 7.41-4.914 13.078" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M87.397 94.68s3.124 2.572 10.263 2.572c7.14 0 9.074-3.437 9.074-3.437" stroke="#E4EBF7" stroke-width=".932" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M117.184 68.639l-6.781-6.177s-5.355-4.314-9.223-.893c-3.867 3.422 4.463 2.083 5.653 4.165 1.19 2.082.848 1.143-2.083.446-5.603-1.331-2.082.893 2.975 5.355 2.091 1.845 6.992.955 6.992.955l2.467-3.851z" fill="#FFC6A0" data-v-9ab8168c></path><path d="M105.282 91.315l-.297-10.937-15.918-.027-.53 10.45c-.026.403.17.788.515.999 2.049 1.251 9.387 5.093 15.799.424.287-.21.443-.554.431-.91" fill="#FFB594" data-v-9ab8168c></path><path d="M107.573 74.24c.817-1.147.982-9.118 1.015-11.928a1.046 1.046 0 0 0-.965-1.055l-4.62-.365c-7.71-1.044-17.071.624-18.253 6.346-5.482 5.813-.421 13.244-.421 13.244s1.963 3.566 4.305 6.791c.756 1.041.398-3.731 3.04-5.929 5.524-4.594 15.899-7.103 15.899-7.103" fill="#5C2552" data-v-9ab8168c></path><path d="M88.426 83.206s2.685 6.202 11.602 6.522c7.82.28 8.973-7.008 7.434-17.505l-.909-5.483c-6.118-2.897-15.478.54-15.478.54s-.576 2.044-.19 5.504c-2.276 2.066-1.824 5.618-1.824 5.618s-.905-1.922-1.98-2.321c-.86-.32-1.897.089-2.322 1.98-1.04 4.632 3.667 5.145 3.667 5.145" fill="#FFC6A0" data-v-9ab8168c></path><path stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" d="M100.843 77.099l1.701-.928-1.015-4.324.674-1.406" data-v-9ab8168c></path><path d="M105.546 74.092c-.022.713-.452 1.279-.96 1.263-.51-.016-.904-.607-.882-1.32.021-.713.452-1.278.96-1.263.51.016.904.607.882 1.32M97.592 74.349c-.022.713-.452 1.278-.961 1.263-.509-.016-.904-.607-.882-1.32.022-.713.452-1.279.961-1.263.51.016.904.606.882 1.32" fill="#552950" data-v-9ab8168c></path><path d="M91.132 86.786s5.269 4.957 12.679 2.327" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M99.776 81.903s-3.592.232-1.44-2.79c1.59-1.496 4.897-.46 4.897-.46s1.156 3.906-3.457 3.25" fill="#DB836E" data-v-9ab8168c></path><path d="M102.88 70.6s2.483.84 3.402.715M93.883 71.975s2.492-1.144 4.778-1.073" stroke="#5C2552" stroke-width="1.526" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M86.32 77.374s.961.879 1.458 2.106c-.377.48-1.033 1.152-.236 1.809M99.337 83.719s1.911.151 2.509-.254" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M87.782 115.821l15.73-3.012M100.165 115.821l10.04-2.008" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M66.508 86.763s-1.598 8.83-6.697 14.078" stroke="#E4EBF7" stroke-width="1.114" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M128.31 87.934s3.013 4.121 4.06 11.785" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M64.09 84.816s-6.03 9.912-13.607 9.903" stroke="#DB836E" stroke-width=".795" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M112.366 65.909l-.142 5.32s5.993 4.472 11.945 9.202c4.482 3.562 8.888 7.455 10.985 8.662 4.804 2.766 8.9 3.355 11.076 1.808 4.071-2.894 4.373-9.878-8.136-15.263-4.271-1.838-16.144-6.36-25.728-9.73" fill="#FFC6A0" data-v-9ab8168c></path><path d="M130.532 85.488s4.588 5.757 11.619 6.214" stroke="#DB836E" stroke-width=".75" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M121.708 105.73s-.393 8.564-1.34 13.612" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M115.784 161.512s-3.57-1.488-2.678-7.14" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M101.52 290.246s4.326 2.057 7.408 1.03c2.842-.948 4.564.673 7.132 1.186 2.57.514 6.925 1.108 11.772-1.269-.104-5.551-6.939-4.01-12.048-6.763-2.582-1.39-3.812-4.757-3.625-8.863h-9.471s-1.402 10.596-1.169 14.68" fill="#CBD1D1" data-v-9ab8168c></path><path d="M101.496 290.073s2.447 1.281 6.809.658c3.081-.44 3.74.485 7.479 1.039 3.739.554 10.802-.07 11.91-.9.415 1.108-.347 2.077-.347 2.077s-1.523.608-4.847.831c-2.045.137-5.843.293-7.663-.507-1.8-1.385-5.286-1.917-5.77-.243-3.947.958-7.41-.288-7.41-.288l-.16-2.667z" fill="#2B0849" data-v-9ab8168c></path><path d="M108.824 276.19h3.116s-.103 6.751 4.57 8.62c-4.673.624-8.62-2.32-7.686-8.62" fill="#A4AABA" data-v-9ab8168c></path><path d="M57.65 272.52s-2.122 7.47-4.518 12.396c-1.811 3.724-4.255 7.548 5.505 7.548 6.698 0 9.02-.483 7.479-6.648-1.541-6.164.268-13.296.268-13.296H57.65z" fill="#CBD1D1" data-v-9ab8168c></path><path d="M51.54 290.04s2.111 1.178 6.682 1.178c6.128 0 8.31-1.662 8.31-1.662s.605 1.122-.624 2.18c-1 .862-3.624 1.603-7.444 1.559-4.177-.049-5.876-.57-6.786-1.177-.831-.554-.692-1.593-.138-2.078" fill="#2B0849" data-v-9ab8168c></path><path d="M58.533 274.438s.034 1.529-.315 2.95c-.352 1.431-1.087 3.127-1.139 4.17-.058 1.16 4.57 1.592 5.194.035.623-1.559 1.303-6.475 1.927-7.306.622-.831-4.94-2.135-5.667.15" fill="#A4AABA" data-v-9ab8168c></path><path d="M100.885 277.015l13.306.092s1.291-54.228 1.843-64.056c.552-9.828 3.756-43.13.997-62.788l-12.48-.64-22.725.776s-.433 3.944-1.19 9.921c-.062.493-.677.838-.744 1.358-.075.582.42 1.347.318 1.956-2.35 14.003-6.343 32.926-8.697 46.425-.116.663-1.227 1.004-1.45 2.677-.04.3.21 1.516.112 1.785-6.836 18.643-10.89 47.584-14.2 61.551l14.528-.014s2.185-8.524 4.008-16.878c2.796-12.817 22.987-84.553 22.987-84.553l3-.517 1.037 46.1s-.223 1.228.334 2.008c.558.782-.556 1.117-.39 2.233l.39 1.784s-.446 7.14-.892 11.826c-.446 4.685-.092 38.954-.092 38.954" fill="#7BB2F9" data-v-9ab8168c></path><path d="M77.438 220.434c1.146.094 4.016-2.008 6.916-4.91M107.55 223.931s2.758-1.103 6.069-3.862" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M108.459 220.905s2.759-1.104 6.07-3.863" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M76.099 223.557s2.608-.587 6.47-3.346M87.33 150.82c-.27 3.088.297 8.478-4.315 9.073M104.829 149.075s.11 13.936-1.286 14.983c-2.207 1.655-2.975 1.934-2.975 1.934M101.014 149.63s.035 12.81-1.19 24.245M94.93 174.965s7.174-1.655 9.38-1.655M75.671 204.754c-.316 1.55-.64 3.067-.973 4.535 0 0-1.45 1.822-1.003 3.756.446 1.934-.943 2.034-4.96 15.273-1.686 5.559-4.464 18.49-6.313 27.447-.078.38-4.018 18.06-4.093 18.423M77.043 196.743a313.269 313.269 0 0 1-.877 4.729M83.908 151.414l-1.19 10.413s-1.091.148-.496 2.23c.111 1.34-2.66 15.692-5.153 30.267M57.58 272.94h13.238" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M117.377 147.423s-16.955-3.087-35.7.199c.157 2.501-.002 4.128-.002 4.128s14.607-2.802 35.476-.31c.251-2.342.226-4.017.226-4.017" fill="#192064" data-v-9ab8168c></path><path d="M107.511 150.353l.004-4.885a.807.807 0 0 0-.774-.81c-2.428-.092-5.04-.108-7.795-.014a.814.814 0 0 0-.784.81l-.003 4.88c0 .456.371.82.827.808a140.76 140.76 0 0 1 7.688.017.81.81 0 0 0 .837-.806" fill="#FFF" data-v-9ab8168c></path><path d="M106.402 149.426l.002-3.06a.64.64 0 0 0-.616-.643 94.135 94.135 0 0 0-5.834-.009.647.647 0 0 0-.626.643l-.001 3.056c0 .36.291.648.651.64 1.78-.04 3.708-.041 5.762.012.36.009.662-.279.662-.64" fill="#192064" data-v-9ab8168c></path><path d="M101.485 273.933h12.272M102.652 269.075c.006 3.368.04 5.759.11 6.47M102.667 263.125c-.009 1.53-.015 2.98-.016 4.313M102.204 174.024l.893 44.402s.669 1.561-.224 2.677c-.892 1.116 2.455.67.893 2.231-1.562 1.562.893 1.116 0 3.347-.592 1.48-.988 20.987-1.09 34.956" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path></g>', 1)];
var Z4 = { key: 5, class: "u-image", width: "252", height: "294" };
var X4 = [createStaticVNode('<defs data-v-9ab8168c><path d="M0 .387h251.772v251.772H0z" data-v-9ab8168c></path></defs><g fill="none" fill-rule="evenodd" data-v-9ab8168c><g transform="translate(0 .012)" data-v-9ab8168c><mask fill="#fff" data-v-9ab8168c></mask><path d="M0 127.32v-2.095C0 56.279 55.892.387 124.838.387h2.096c68.946 0 124.838 55.892 124.838 124.838v2.096c0 68.946-55.892 124.838-124.838 124.838h-2.096C55.892 252.16 0 196.267 0 127.321" fill="#E4EBF7" mask="url(#b)" data-v-9ab8168c></path></g><path d="M39.755 130.84a8.276 8.276 0 1 1-16.468-1.66 8.276 8.276 0 0 1 16.468 1.66" fill="#FFF" data-v-9ab8168c></path><path d="M36.975 134.297l10.482 5.943M48.373 146.508l-12.648 10.788" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path d="M39.875 159.352a5.667 5.667 0 1 1-11.277-1.136 5.667 5.667 0 0 1 11.277 1.136M57.588 143.247a5.708 5.708 0 1 1-11.358-1.145 5.708 5.708 0 0 1 11.358 1.145M99.018 26.875l29.82-.014a4.587 4.587 0 1 0-.003-9.175l-29.82.013a4.587 4.587 0 1 0 .003 9.176M110.424 45.211l29.82-.013a4.588 4.588 0 0 0-.004-9.175l-29.82.013a4.587 4.587 0 1 0 .004 9.175" fill="#FFF" data-v-9ab8168c></path><path d="M112.798 26.861v-.002l15.784-.006a4.588 4.588 0 1 0 .003 9.175l-15.783.007v-.002a4.586 4.586 0 0 0-.004-9.172M184.523 135.668c-.553 5.485-5.447 9.483-10.931 8.93-5.485-.553-9.483-5.448-8.93-10.932.552-5.485 5.447-9.483 10.932-8.93 5.485.553 9.483 5.447 8.93 10.932" fill="#FFF" data-v-9ab8168c></path><path d="M179.26 141.75l12.64 7.167M193.006 156.477l-15.255 13.011" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path d="M184.668 170.057a6.835 6.835 0 1 1-13.6-1.372 6.835 6.835 0 0 1 13.6 1.372M203.34 153.325a6.885 6.885 0 1 1-13.7-1.382 6.885 6.885 0 0 1 13.7 1.382" fill="#FFF" data-v-9ab8168c></path><path d="M151.931 192.324a2.222 2.222 0 1 1-4.444 0 2.222 2.222 0 0 1 4.444 0zM225.27 116.056a2.222 2.222 0 1 1-4.445 0 2.222 2.222 0 0 1 4.444 0zM216.38 151.08a2.223 2.223 0 1 1-4.446-.001 2.223 2.223 0 0 1 4.446 0zM176.917 107.636a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM195.291 92.165a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM202.058 180.711a2.223 2.223 0 1 1-4.446 0 2.223 2.223 0 0 1 4.446 0z" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path stroke="#FFF" stroke-width="2" d="M214.404 153.302l-1.912 20.184-10.928 5.99M173.661 174.792l-6.356 9.814h-11.36l-4.508 6.484M174.941 125.168v-15.804M220.824 117.25l-12.84 7.901-15.31-7.902V94.39" data-v-9ab8168c></path><path d="M166.588 65.936h-3.951a4.756 4.756 0 0 1-4.743-4.742 4.756 4.756 0 0 1 4.743-4.743h3.951a4.756 4.756 0 0 1 4.743 4.743 4.756 4.756 0 0 1-4.743 4.742" fill="#FFF" data-v-9ab8168c></path><path d="M174.823 30.03c0-16.281 13.198-29.48 29.48-29.48 16.28 0 29.48 13.199 29.48 29.48 0 16.28-13.2 29.48-29.48 29.48-16.282 0-29.48-13.2-29.48-29.48" fill="#1890FF" data-v-9ab8168c></path><path d="M205.952 38.387c.5.5.785 1.142.785 1.928s-.286 1.465-.785 1.964c-.572.5-1.214.75-2 .75-.785 0-1.429-.285-1.929-.785-.572-.5-.82-1.143-.82-1.929s.248-1.428.82-1.928c.5-.5 1.144-.75 1.93-.75.785 0 1.462.25 1.999.75m4.285-19.463c1.428 1.249 2.143 2.963 2.143 5.142 0 1.712-.427 3.13-1.219 4.25-.067.096-.137.18-.218.265-.416.429-1.41 1.346-2.956 2.699a5.07 5.07 0 0 0-1.428 1.75 5.207 5.207 0 0 0-.536 2.357v.5h-4.107v-.5c0-1.357.215-2.536.714-3.5.464-.964 1.857-2.464 4.178-4.536l.43-.5c.643-.785.964-1.643.964-2.535 0-1.18-.358-2.108-1-2.785-.678-.68-1.643-1.001-2.858-1.001-1.536 0-2.642.464-3.357 1.43-.37.5-.621 1.135-.76 1.904a1.999 1.999 0 0 1-1.971 1.63h-.004c-1.277 0-2.257-1.183-1.98-2.43.337-1.518 1.02-2.78 2.073-3.784 1.536-1.5 3.607-2.25 6.25-2.25 2.32 0 4.214.607 5.642 1.894" fill="#FFF" data-v-9ab8168c></path><path d="M52.04 76.131s21.81 5.36 27.307 15.945c5.575 10.74-6.352 9.26-15.73 4.935-10.86-5.008-24.7-11.822-11.577-20.88" fill="#FFB594" data-v-9ab8168c></path><path d="M90.483 67.504l-.449 2.893c-.753.49-4.748-2.663-4.748-2.663l-1.645.748-1.346-5.684s6.815-4.589 8.917-5.018c2.452-.501 9.884.94 10.7 2.278 0 0 1.32.486-2.227.69-3.548.203-5.043.447-6.79 3.132-1.747 2.686-2.412 3.624-2.412 3.624" fill="#FFC6A0" data-v-9ab8168c></path><path d="M128.055 111.367c-2.627-7.724-6.15-13.18-8.917-15.478-3.5-2.906-9.34-2.225-11.366-4.187-1.27-1.231-3.215-1.197-3.215-1.197s-14.98-3.158-16.828-3.479c-2.37-.41-2.124-.714-6.054-1.405-1.57-1.907-2.917-1.122-2.917-1.122l-7.11-1.383c-.853-1.472-2.423-1.023-2.423-1.023l-2.468-.897c-1.645 9.976-7.74 13.796-7.74 13.796 1.795 1.122 15.703 8.3 15.703 8.3l5.107 37.11s-3.321 5.694 1.346 9.109c0 0 19.883-3.743 34.921-.329 0 0 3.047-2.546.972-8.806.523-3.01 1.394-8.263 1.736-11.622.385.772 2.019 1.918 3.14 3.477 0 0 9.407-7.365 11.052-14.012-.832-.723-1.598-1.585-2.267-2.453-.567-.736-.358-2.056-.765-2.717-.669-1.084-1.804-1.378-1.907-1.682" fill="#FFF" data-v-9ab8168c></path><path d="M101.09 289.998s4.295 2.041 7.354 1.021c2.821-.94 4.53.668 7.08 1.178 2.55.51 6.874 1.1 11.686-1.26-.103-5.51-6.889-3.98-11.96-6.713-2.563-1.38-3.784-4.722-3.598-8.799h-9.402s-1.392 10.52-1.16 14.573" fill="#CBD1D1" data-v-9ab8168c></path><path d="M101.067 289.826s2.428 1.271 6.759.653c3.058-.437 3.712.481 7.423 1.031 3.712.55 10.724-.069 11.823-.894.413 1.1-.343 2.063-.343 2.063s-1.512.603-4.812.824c-2.03.136-5.8.291-7.607-.503-1.787-1.375-5.247-1.903-5.728-.241-3.918.95-7.355-.286-7.355-.286l-.16-2.647z" fill="#2B0849" data-v-9ab8168c></path><path d="M108.341 276.044h3.094s-.103 6.702 4.536 8.558c-4.64.618-8.558-2.303-7.63-8.558" fill="#A4AABA" data-v-9ab8168c></path><path d="M57.542 272.401s-2.107 7.416-4.485 12.306c-1.798 3.695-4.225 7.492 5.465 7.492 6.648 0 8.953-.48 7.423-6.599-1.53-6.12.266-13.199.266-13.199h-8.669z" fill="#CBD1D1" data-v-9ab8168c></path><path d="M51.476 289.793s2.097 1.169 6.633 1.169c6.083 0 8.249-1.65 8.249-1.65s.602 1.114-.619 2.165c-.993.855-3.597 1.591-7.39 1.546-4.145-.048-5.832-.566-6.736-1.168-.825-.55-.687-1.58-.137-2.062" fill="#2B0849" data-v-9ab8168c></path><path d="M58.419 274.304s.033 1.519-.314 2.93c-.349 1.42-1.078 3.104-1.13 4.139-.058 1.151 4.537 1.58 5.155.034.62-1.547 1.294-6.427 1.913-7.252.619-.825-4.903-2.119-5.624.15" fill="#A4AABA" data-v-9ab8168c></path><path d="M99.66 278.514l13.378.092s1.298-54.52 1.853-64.403c.554-9.882 3.776-43.364 1.002-63.128l-12.547-.644-22.849.78s-.434 3.966-1.195 9.976c-.063.496-.682.843-.749 1.365-.075.585.423 1.354.32 1.966-2.364 14.08-6.377 33.104-8.744 46.677-.116.666-1.234 1.009-1.458 2.691-.04.302.211 1.525.112 1.795-6.873 18.744-10.949 47.842-14.277 61.885l14.607-.014s2.197-8.57 4.03-16.97c2.811-12.886 23.111-85.01 23.111-85.01l3.016-.521 1.043 46.35s-.224 1.234.337 2.02c.56.785-.56 1.123-.392 2.244l.392 1.794s-.449 7.178-.898 11.89c-.448 4.71-.092 39.165-.092 39.165" fill="#7BB2F9" data-v-9ab8168c></path><path d="M76.085 221.626c1.153.094 4.038-2.019 6.955-4.935M106.36 225.142s2.774-1.11 6.103-3.883" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M107.275 222.1s2.773-1.11 6.102-3.884" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M74.74 224.767s2.622-.591 6.505-3.365M86.03 151.634c-.27 3.106.3 8.525-4.336 9.123M103.625 149.88s.11 14.012-1.293 15.065c-2.219 1.664-2.99 1.944-2.99 1.944M99.79 150.438s.035 12.88-1.196 24.377M93.673 175.911s7.212-1.664 9.431-1.664M74.31 205.861a212.013 212.013 0 0 1-.979 4.56s-1.458 1.832-1.009 3.776c.449 1.944-.947 2.045-4.985 15.355-1.696 5.59-4.49 18.591-6.348 27.597l-.231 1.12M75.689 197.807a320.934 320.934 0 0 1-.882 4.754M82.591 152.233L81.395 162.7s-1.097.15-.5 2.244c.113 1.346-2.674 15.775-5.18 30.43M56.12 274.418h13.31" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M116.241 148.22s-17.047-3.104-35.893.2c.158 2.514-.003 4.15-.003 4.15s14.687-2.818 35.67-.312c.252-2.355.226-4.038.226-4.038" fill="#192064" data-v-9ab8168c></path><path d="M106.322 151.165l.003-4.911a.81.81 0 0 0-.778-.815c-2.44-.091-5.066-.108-7.836-.014a.818.818 0 0 0-.789.815l-.003 4.906a.81.81 0 0 0 .831.813c2.385-.06 4.973-.064 7.73.017a.815.815 0 0 0 .842-.81" fill="#FFF" data-v-9ab8168c></path><path d="M105.207 150.233l.002-3.076a.642.642 0 0 0-.619-.646 94.321 94.321 0 0 0-5.866-.01.65.65 0 0 0-.63.647v3.072a.64.64 0 0 0 .654.644 121.12 121.12 0 0 1 5.794.011c.362.01.665-.28.665-.642" fill="#192064" data-v-9ab8168c></path><path d="M100.263 275.415h12.338M101.436 270.53c.006 3.387.042 5.79.111 6.506M101.451 264.548a915.75 915.75 0 0 0-.015 4.337M100.986 174.965l.898 44.642s.673 1.57-.225 2.692c-.897 1.122 2.468.673.898 2.243-1.57 1.57.897 1.122 0 3.365-.596 1.489-.994 21.1-1.096 35.146" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M46.876 83.427s-.516 6.045 7.223 5.552c11.2-.712 9.218-9.345 31.54-21.655-.786-2.708-2.447-4.744-2.447-4.744s-11.068 3.11-22.584 8.046c-6.766 2.9-13.395 6.352-13.732 12.801M104.46 91.057l.941-5.372-8.884-11.43-5.037 5.372-1.74 7.834a.321.321 0 0 0 .108.32c.965.8 6.5 5.013 14.347 3.544a.332.332 0 0 0 .264-.268" fill="#FFC6A0" data-v-9ab8168c></path><path d="M93.942 79.387s-4.533-2.853-2.432-6.855c1.623-3.09 4.513 1.133 4.513 1.133s.52-3.642 3.121-3.642c.52-1.04 1.561-4.162 1.561-4.162s11.445 2.601 13.526 3.121c0 5.203-2.304 19.424-7.84 19.861-8.892.703-12.449-9.456-12.449-9.456" fill="#FFC6A0" data-v-9ab8168c></path><path d="M113.874 73.446c2.601-2.081 3.47-9.722 3.47-9.722s-2.479-.49-6.64-2.05c-4.683-2.081-12.798-4.747-17.48.976-9.668 3.223-2.05 19.823-2.05 19.823l2.713-3.021s-3.935-3.287-2.08-6.243c2.17-3.462 3.92 1.073 3.92 1.073s.637-2.387 3.581-3.342c.355-.71 1.036-2.674 1.432-3.85a1.073 1.073 0 0 1 1.263-.704c2.4.558 8.677 2.019 11.356 2.662.522.125.871.615.82 1.15l-.305 3.248z" fill="#520038" data-v-9ab8168c></path><path d="M104.977 76.064c-.103.61-.582 1.038-1.07.956-.489-.083-.801-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.644.698 1.254M112.132 77.694c-.103.61-.582 1.038-1.07.956-.488-.083-.8-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.643.698 1.254" fill="#552950" data-v-9ab8168c></path><path stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" d="M110.13 74.84l-.896 1.61-.298 4.357h-2.228" data-v-9ab8168c></path><path d="M110.846 74.481s1.79-.716 2.506.537" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M92.386 74.282s.477-1.114 1.113-.716c.637.398 1.274 1.433.558 1.99-.717.556.159 1.67.159 1.67" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M103.287 72.93s1.83 1.113 4.137.954" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M103.685 81.762s2.227 1.193 4.376 1.193M104.64 84.308s.954.398 1.511.318M94.693 81.205s2.308 7.4 10.424 7.639" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M81.45 89.384s.45 5.647-4.935 12.787M69 82.654s-.726 9.282-8.204 14.206" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M129.405 122.865s-5.272 7.403-9.422 10.768" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M119.306 107.329s.452 4.366-2.127 32.062" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M150.028 151.232h-49.837a1.01 1.01 0 0 1-1.01-1.01v-31.688c0-.557.452-1.01 1.01-1.01h49.837c.558 0 1.01.453 1.01 1.01v31.688a1.01 1.01 0 0 1-1.01 1.01" fill="#F2D7AD" data-v-9ab8168c></path><path d="M150.29 151.232h-19.863v-33.707h20.784v32.786a.92.92 0 0 1-.92.92" fill="#F4D19D" data-v-9ab8168c></path><path d="M123.554 127.896H92.917a.518.518 0 0 1-.425-.816l6.38-9.113c.193-.277.51-.442.85-.442h31.092l-7.26 10.371z" fill="#F2D7AD" data-v-9ab8168c></path><path fill="#CC9B6E" d="M123.689 128.447H99.25v-.519h24.169l7.183-10.26.424.298z" data-v-9ab8168c></path><path d="M158.298 127.896h-18.669a2.073 2.073 0 0 1-1.659-.83l-7.156-9.541h19.965c.49 0 .95.23 1.244.622l6.69 8.92a.519.519 0 0 1-.415.83" fill="#F4D19D" data-v-9ab8168c></path><path fill="#CC9B6E" d="M157.847 128.479h-19.384l-7.857-10.475.415-.31 7.7 10.266h19.126zM130.554 150.685l-.032-8.177.519-.002.032 8.177z" data-v-9ab8168c></path><path fill="#CC9B6E" d="M130.511 139.783l-.08-21.414.519-.002.08 21.414zM111.876 140.932l-.498-.143 1.479-5.167.498.143zM108.437 141.06l-2.679-2.935 2.665-3.434.41.318-2.397 3.089 2.384 2.612zM116.607 141.06l-.383-.35 2.383-2.612-2.397-3.089.41-.318 2.665 3.434z" data-v-9ab8168c></path><path d="M154.316 131.892l-3.114-1.96.038 3.514-1.043.092c-1.682.115-3.634.23-4.789.23-1.902 0-2.693 2.258 2.23 2.648l-2.645-.596s-2.168 1.317.504 2.3c0 0-1.58 1.217.561 2.58-.584 3.504 5.247 4.058 7.122 3.59 1.876-.47 4.233-2.359 4.487-5.16.28-3.085-.89-5.432-3.35-7.238" fill="#FFC6A0" data-v-9ab8168c></path><path d="M153.686 133.577s-6.522.47-8.36.372c-1.836-.098-1.904 2.19 2.359 2.264 3.739.15 5.451-.044 5.451-.044" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M145.16 135.877c-1.85 1.346.561 2.355.561 2.355s3.478.898 6.73.617" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M151.89 141.71s-6.28.111-6.73-2.132c-.223-1.346.45-1.402.45-1.402M146.114 140.868s-1.103 3.16 5.44 3.533M151.202 129.932v3.477M52.838 89.286c3.533-.337 8.423-1.248 13.582-7.754" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M168.567 248.318a6.647 6.647 0 0 1-6.647-6.647v-66.466a6.647 6.647 0 1 1 13.294 0v66.466a6.647 6.647 0 0 1-6.647 6.647" fill="#5BA02E" data-v-9ab8168c></path><path d="M176.543 247.653a6.647 6.647 0 0 1-6.646-6.647v-33.232a6.647 6.647 0 1 1 13.293 0v33.232a6.647 6.647 0 0 1-6.647 6.647" fill="#92C110" data-v-9ab8168c></path><path d="M186.443 293.613H158.92a3.187 3.187 0 0 1-3.187-3.187v-46.134a3.187 3.187 0 0 1 3.187-3.187h27.524a3.187 3.187 0 0 1 3.187 3.187v46.134a3.187 3.187 0 0 1-3.187 3.187" fill="#F2D7AD" data-v-9ab8168c></path><path d="M88.979 89.48s7.776 5.384 16.6 2.842" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path></g>', 2)];
var Q4 = { key: 6, class: "u-image", width: "254", height: "294" };
var e0 = [createStaticVNode('<defs data-v-9ab8168c><path d="M0 .335h253.49v253.49H0z" data-v-9ab8168c></path><path d="M0 293.665h253.49V.401H0z" data-v-9ab8168c></path></defs><g fill="none" fill-rule="evenodd" data-v-9ab8168c><g transform="translate(0 .067)" data-v-9ab8168c><mask fill="#fff" data-v-9ab8168c></mask><path d="M0 128.134v-2.11C0 56.608 56.273.334 125.69.334h2.11c69.416 0 125.69 56.274 125.69 125.69v2.11c0 69.417-56.274 125.69-125.69 125.69h-2.11C56.273 253.824 0 197.551 0 128.134" fill="#E4EBF7" mask="url(#b)" data-v-9ab8168c></path></g><path d="M39.989 132.108a8.332 8.332 0 1 1-16.581-1.671 8.332 8.332 0 0 1 16.58 1.671" fill="#FFF" data-v-9ab8168c></path><path d="M37.19 135.59l10.553 5.983M48.665 147.884l-12.734 10.861" stroke="#FFF" stroke-width="2" data-v-9ab8168c></path><path d="M40.11 160.816a5.706 5.706 0 1 1-11.354-1.145 5.706 5.706 0 0 1 11.354 1.145M57.943 144.6a5.747 5.747 0 1 1-11.436-1.152 5.747 5.747 0 0 1 11.436 1.153M99.656 27.434l30.024-.013a4.619 4.619 0 1 0-.004-9.238l-30.024.013a4.62 4.62 0 0 0 .004 9.238M111.14 45.896l30.023-.013a4.62 4.62 0 1 0-.004-9.238l-30.024.013a4.619 4.619 0 1 0 .004 9.238" fill="#FFF" data-v-9ab8168c></path><path d="M113.53 27.421v-.002l15.89-.007a4.619 4.619 0 1 0 .005 9.238l-15.892.007v-.002a4.618 4.618 0 0 0-.004-9.234M150.167 70.091h-3.979a4.789 4.789 0 0 1-4.774-4.775 4.788 4.788 0 0 1 4.774-4.774h3.979a4.789 4.789 0 0 1 4.775 4.774 4.789 4.789 0 0 1-4.775 4.775" fill="#FFF" data-v-9ab8168c></path><path d="M171.687 30.234c0-16.392 13.289-29.68 29.681-29.68 16.392 0 29.68 13.288 29.68 29.68 0 16.393-13.288 29.681-29.68 29.681s-29.68-13.288-29.68-29.68" fill="#FF603B" data-v-9ab8168c></path><path d="M203.557 19.435l-.676 15.035a1.514 1.514 0 0 1-3.026 0l-.675-15.035a2.19 2.19 0 1 1 4.377 0m-.264 19.378c.513.477.77 1.1.77 1.87s-.257 1.393-.77 1.907c-.55.476-1.21.733-1.943.733a2.545 2.545 0 0 1-1.87-.77c-.55-.514-.806-1.136-.806-1.87 0-.77.256-1.393.806-1.87.513-.513 1.137-.733 1.87-.733.77 0 1.43.22 1.943.733" fill="#FFF" data-v-9ab8168c></path><path d="M119.3 133.275c4.426-.598 3.612-1.204 4.079-4.778.675-5.18-3.108-16.935-8.262-25.118-1.088-10.72-12.598-11.24-12.598-11.24s4.312 4.895 4.196 16.199c1.398 5.243.804 14.45.804 14.45s5.255 11.369 11.78 10.487" fill="#FFB594" data-v-9ab8168c></path><path d="M100.944 91.61s1.463-.583 3.211.582c8.08 1.398 10.368 6.706 11.3 11.368 1.864 1.282 1.864 2.33 1.864 3.496.365.777 1.515 3.03 1.515 3.03s-7.225 1.748-10.954 6.758c-1.399-6.41-6.936-25.235-6.936-25.235" fill="#FFF" data-v-9ab8168c></path><path d="M94.008 90.5l1.019-5.815-9.23-11.874-5.233 5.581-2.593 9.863s8.39 5.128 16.037 2.246" fill="#FFB594" data-v-9ab8168c></path><path d="M82.931 78.216s-4.557-2.868-2.445-6.892c1.632-3.107 4.537 1.139 4.537 1.139s.524-3.662 3.139-3.662c.523-1.046 1.569-4.184 1.569-4.184s11.507 2.615 13.6 3.138c-.001 5.23-2.317 19.529-7.884 19.969-8.94.706-12.516-9.508-12.516-9.508" fill="#FFC6A0" data-v-9ab8168c></path><path d="M102.971 72.243c2.616-2.093 3.489-9.775 3.489-9.775s-2.492-.492-6.676-2.062c-4.708-2.092-12.867-4.771-17.575.982-9.54 4.41-2.062 19.93-2.062 19.93l2.729-3.037s-3.956-3.304-2.092-6.277c2.183-3.48 3.943 1.08 3.943 1.08s.64-2.4 3.6-3.36c.356-.714 1.04-2.69 1.44-3.872a1.08 1.08 0 0 1 1.27-.707c2.41.56 8.723 2.03 11.417 2.676.524.126.876.619.825 1.156l-.308 3.266z" fill="#520038" data-v-9ab8168c></path><path d="M101.22 76.514c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.961.491.083.805.647.702 1.26M94.26 75.074c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.96.491.082.805.646.702 1.26" fill="#552950" data-v-9ab8168c></path><path stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" d="M99.206 73.644l-.9 1.62-.3 4.38h-2.24" data-v-9ab8168c></path><path d="M99.926 73.284s1.8-.72 2.52.54" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M81.367 73.084s.48-1.12 1.12-.72c.64.4 1.28 1.44.56 2s.16 1.68.16 1.68" stroke="#DB836E" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M92.326 71.724s1.84 1.12 4.16.96" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M92.726 80.604s2.24 1.2 4.4 1.2M93.686 83.164s.96.4 1.52.32M83.687 80.044s1.786 6.547 9.262 7.954" stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M95.548 91.663s-1.068 2.821-8.298 2.105c-7.23-.717-10.29-5.044-10.29-5.044" stroke="#E4EBF7" stroke-width="1.136" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M78.126 87.478s6.526 4.972 16.47 2.486c0 0 9.577 1.02 11.536 5.322 5.36 11.77.543 36.835 0 39.962 3.496 4.055-.466 8.483-.466 8.483-15.624-3.548-35.81-.6-35.81-.6-4.849-3.546-1.223-9.044-1.223-9.044L62.38 110.32c-2.485-15.227.833-19.803 3.549-20.743 3.03-1.049 8.04-1.282 8.04-1.282.496-.058 1.08-.076 1.37-.233 2.36-1.282 2.787-.583 2.787-.583" fill="#FFF" data-v-9ab8168c></path><path d="M65.828 89.81s-6.875.465-7.59 8.156c-.466 8.857 3.03 10.954 3.03 10.954s6.075 22.102 16.796 22.957c8.39-2.176 4.758-6.702 4.661-11.42-.233-11.304-7.108-16.897-7.108-16.897s-4.212-13.75-9.789-13.75" fill="#FFC6A0" data-v-9ab8168c></path><path d="M71.716 124.225s.855 11.264 9.828 6.486c4.765-2.536 7.581-13.828 9.789-22.568 1.456-5.768 2.58-12.197 2.58-12.197l-4.973-1.709s-2.408 5.516-7.769 12.275c-4.335 5.467-9.144 11.11-9.455 17.713" fill="#FFC6A0" data-v-9ab8168c></path><path d="M108.463 105.191s1.747 2.724-2.331 30.535c2.376 2.216 1.053 6.012-.233 7.51" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M123.262 131.527s-.427 2.732-11.77 1.981c-15.187-1.006-25.326-3.25-25.326-3.25l.933-5.8s.723.215 9.71-.068c11.887-.373 18.714-6.07 24.964-1.022 4.039 3.263 1.489 8.16 1.489 8.16" fill="#FFC6A0" data-v-9ab8168c></path><path d="M70.24 90.974s-5.593-4.739-11.054 2.68c-3.318 7.223.517 15.284 2.664 19.578-.31 3.729 2.33 4.311 2.33 4.311s.108.895 1.516 2.68c4.078-7.03 6.72-9.166 13.711-12.546-.328-.656-1.877-3.265-1.825-3.767.175-1.69-1.282-2.623-1.282-2.623s-.286-.156-1.165-2.738c-.788-2.313-2.036-5.177-4.895-7.575" fill="#FFF" data-v-9ab8168c></path><path d="M90.232 288.027s4.855 2.308 8.313 1.155c3.188-1.063 5.12.755 8.002 1.331 2.881.577 7.769 1.243 13.207-1.424-.117-6.228-7.786-4.499-13.518-7.588-2.895-1.56-4.276-5.336-4.066-9.944H91.544s-1.573 11.89-1.312 16.47" fill="#CBD1D1" data-v-9ab8168c></path><path d="M90.207 287.833s2.745 1.437 7.639.738c3.456-.494 3.223.66 7.418 1.282 4.195.621 13.092-.194 14.334-1.126.466 1.242-.388 2.33-.388 2.33s-1.709.682-5.438.932c-2.295.154-8.098.276-10.14-.621-2.02-1.554-4.894-1.515-6.06-.234-4.427 1.075-7.184-.31-7.184-.31l-.181-2.991z" fill="#2B0849" data-v-9ab8168c></path><path d="M98.429 272.257h3.496s-.117 7.574 5.127 9.671c-5.244.7-9.672-2.602-8.623-9.671" fill="#A4AABA" data-v-9ab8168c></path><path d="M44.425 272.046s-2.208 7.774-4.702 12.899c-1.884 3.874-4.428 7.854 5.729 7.854 6.97 0 9.385-.503 7.782-6.917-1.604-6.415.279-13.836.279-13.836h-9.088z" fill="#CBD1D1" data-v-9ab8168c></path><path d="M38.066 290.277s2.198 1.225 6.954 1.225c6.376 0 8.646-1.73 8.646-1.73s.63 1.168-.649 2.27c-1.04.897-3.77 1.668-7.745 1.621-4.347-.05-6.115-.593-7.062-1.224-.864-.577-.72-1.657-.144-2.162" fill="#2B0849" data-v-9ab8168c></path><path d="M45.344 274.041s.035 1.592-.329 3.07c-.365 1.49-1.13 3.255-1.184 4.34-.061 1.206 4.755 1.657 5.403.036.65-1.622 1.357-6.737 2.006-7.602.648-.865-5.14-2.222-5.896.156" fill="#A4AABA" data-v-9ab8168c></path><path d="M89.476 277.57l13.899.095s1.349-56.643 1.925-66.909c.576-10.267 3.923-45.052 1.042-65.585l-13.037-.669-23.737.81s-.452 4.12-1.243 10.365c-.065.515-.708.874-.777 1.417-.078.608.439 1.407.332 2.044-2.455 14.627-5.797 32.736-8.256 46.837-.121.693-1.282 1.048-1.515 2.796-.042.314.22 1.584.116 1.865-7.14 19.473-12.202 52.601-15.66 67.19l15.176-.015s2.282-10.145 4.185-18.871c2.922-13.389 24.012-88.32 24.012-88.32l3.133-.954-.158 48.568s-.233 1.282.35 2.098c.583.815-.581 1.167-.408 2.331l.408 1.864s-.466 7.458-.932 12.352c-.467 4.895 1.145 40.69 1.145 40.69" fill="#7BB2F9" data-v-9ab8168c></path><path d="M64.57 218.881c1.197.099 4.195-2.097 7.225-5.127M96.024 222.534s2.881-1.152 6.34-4.034" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M96.973 219.373s2.882-1.153 6.34-4.034" stroke="#648BD8" stroke-width="1.032" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M63.172 222.144s2.724-.614 6.759-3.496M74.903 146.166c-.281 3.226.31 8.856-4.506 9.478M93.182 144.344s.115 14.557-1.344 15.65c-2.305 1.73-3.107 2.02-3.107 2.02M89.197 144.923s.269 13.144-1.01 25.088M83.525 170.71s6.81-1.051 9.116-1.051M46.026 270.045l-.892 4.538M46.937 263.289l-.815 4.157M62.725 202.503c-.33 1.618-.102 1.904-.449 3.438 0 0-2.756 1.903-2.29 3.923.466 2.02-.31 3.424-4.505 17.252-1.762 5.807-4.233 18.922-6.165 28.278-.03.144-.521 2.646-1.14 5.8M64.158 194.136c-.295 1.658-.6 3.31-.917 4.938M71.33 146.787l-1.244 10.877s-1.14.155-.519 2.33c.117 1.399-2.778 16.39-5.382 31.615M44.242 273.727H58.07" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M106.18 142.117c-3.028-.489-18.825-2.744-36.219.2a.625.625 0 0 0-.518.644c.063 1.307.044 2.343.015 2.995a.617.617 0 0 0 .716.636c3.303-.534 17.037-2.412 35.664-.266.347.04.66-.214.692-.56.124-1.347.16-2.425.17-3.029a.616.616 0 0 0-.52-.62" fill="#192064" data-v-9ab8168c></path><path d="M96.398 145.264l.003-5.102a.843.843 0 0 0-.809-.847 114.104 114.104 0 0 0-8.141-.014.85.85 0 0 0-.82.847l-.003 5.097c0 .476.388.857.864.845 2.478-.064 5.166-.067 8.03.017a.848.848 0 0 0 .876-.843" fill="#FFF" data-v-9ab8168c></path><path d="M95.239 144.296l.002-3.195a.667.667 0 0 0-.643-.672c-1.9-.061-3.941-.073-6.094-.01a.675.675 0 0 0-.654.672l-.002 3.192c0 .376.305.677.68.669 1.859-.042 3.874-.043 6.02.012.376.01.69-.291.691-.668" fill="#192064" data-v-9ab8168c></path><path d="M90.102 273.522h12.819M91.216 269.761c.006 3.519-.072 5.55 0 6.292M90.923 263.474c-.009 1.599-.016 2.558-.016 4.505M90.44 170.404l.932 46.38s.7 1.631-.233 2.796c-.932 1.166 2.564.7.932 2.33-1.63 1.633.933 1.166 0 3.497-.618 1.546-1.031 21.921-1.138 36.513" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M73.736 98.665l2.214 4.312s2.098.816 1.865 2.68l.816 2.214M64.297 116.611c.233-.932 2.176-7.147 12.585-10.488M77.598 90.042s7.691 6.137 16.547 2.72" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M91.974 86.954s5.476-.816 7.574-4.545c1.297-.345.72 2.212-.33 3.671-.7.971-1.01 1.554-1.01 1.554s.194.31.155.816c-.053.697-.175.653-.272 1.048-.081.335.108.657 0 1.049-.046.17-.198.5-.382.878-.12.249-.072.687-.2.948-.231.469-1.562 1.87-2.622 2.855-3.826 3.554-5.018 1.644-6.001-.408-.894-1.865-.661-5.127-.874-6.875-.35-2.914-2.622-3.03-1.923-4.429.343-.685 2.87.69 3.263 1.748.757 2.04 2.952 1.807 2.622 1.69" fill="#FFC6A0" data-v-9ab8168c></path><path d="M99.8 82.429c-.465.077-.35.272-.97 1.243-.622.971-4.817 2.932-6.39 3.224-2.589.48-2.278-1.56-4.254-2.855-1.69-1.107-3.562-.638-1.398 1.398.99.932.932 1.107 1.398 3.205.335 1.506-.64 3.67.7 5.593" stroke="#DB836E" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M79.543 108.673c-2.1 2.926-4.266 6.175-5.557 8.762" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M87.72 124.768s-2.098-1.942-5.127-2.719c-3.03-.777-3.574-.155-5.516.078-1.942.233-3.885-.932-3.652.7.233 1.63 5.05 1.01 5.206 2.097.155 1.087-6.37 2.796-8.313 2.175-.777.777.466 1.864 2.02 2.175.233 1.554 2.253 1.554 2.253 1.554s.699 1.01 2.641 1.088c2.486 1.32 8.934-.7 10.954-1.554 2.02-.855-.466-5.594-.466-5.594" fill="#FFC6A0" data-v-9ab8168c></path><path d="M73.425 122.826s.66 1.127 3.167 1.418c2.315.27 2.563.583 2.563.583s-2.545 2.894-9.07 2.272M72.416 129.274s3.826.097 4.933-.718M74.98 130.75s1.961.136 3.36-.505M77.232 131.916s1.748.019 2.914-.505M73.328 122.321s-.595-1.032 1.262-.427c1.671.544 2.833.055 5.128.155 1.389.061 3.067-.297 3.982.15 1.606.784 3.632 2.181 3.632 2.181s10.526 1.204 19.033-1.127M78.864 108.104s-8.39 2.758-13.168 12.12" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M109.278 112.533s3.38-3.613 7.575-4.662" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M107.375 123.006s9.697-2.745 11.445-.88" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M194.605 83.656l3.971-3.886M187.166 90.933l3.736-3.655M191.752 84.207l-4.462-4.56M198.453 91.057l-4.133-4.225M129.256 163.074l3.718-3.718M122.291 170.039l3.498-3.498M126.561 163.626l-4.27-4.27M132.975 170.039l-3.955-3.955" stroke="#BFCDDD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-9ab8168c></path><path d="M190.156 211.779h-1.604a4.023 4.023 0 0 1-4.011-4.011V175.68a4.023 4.023 0 0 1 4.01-4.01h1.605a4.023 4.023 0 0 1 4.011 4.01v32.088a4.023 4.023 0 0 1-4.01 4.01" fill="#A3B4C6" data-v-9ab8168c></path><path d="M237.824 212.977a4.813 4.813 0 0 1-4.813 4.813h-86.636a4.813 4.813 0 0 1 0-9.626h86.636a4.813 4.813 0 0 1 4.813 4.813" fill="#A3B4C6" data-v-9ab8168c></path><mask fill="#fff" data-v-9ab8168c></mask><path fill="#A3B4C6" mask="url(#d)" d="M154.098 190.096h70.513v-84.617h-70.513z" data-v-9ab8168c></path><path d="M224.928 190.096H153.78a3.219 3.219 0 0 1-3.208-3.209V167.92a3.219 3.219 0 0 1 3.208-3.21h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.219 3.219 0 0 1-3.21 3.209M224.928 130.832H153.78a3.218 3.218 0 0 1-3.208-3.208v-18.968a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.218 3.218 0 0 1-3.21 3.208" fill="#BFCDDD" mask="url(#d)" data-v-9ab8168c></path><path d="M159.563 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 120.546h-22.461a.802.802 0 0 1-.802-.802v-3.208c0-.443.359-.803.802-.803h22.46c.444 0 .803.36.803.803v3.208c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-9ab8168c></path><path d="M224.928 160.464H153.78a3.218 3.218 0 0 1-3.208-3.209v-18.967a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.209v18.967a3.218 3.218 0 0 1-3.21 3.209" fill="#BFCDDD" mask="url(#d)" data-v-9ab8168c></path><path d="M173.455 130.832h49.301M164.984 130.832h6.089M155.952 130.832h6.75M173.837 160.613h49.3M165.365 160.613h6.089M155.57 160.613h6.751" stroke="#7C90A5" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-9ab8168c></path><path d="M159.563 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M166.98 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M174.397 151.038a2.407 2.407 0 1 1 .001-4.814 2.407 2.407 0 0 1 0 4.814M222.539 151.038h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802M159.563 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 179.987h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-9ab8168c></path><path d="M203.04 221.108h-27.372a2.413 2.413 0 0 1-2.406-2.407v-11.448a2.414 2.414 0 0 1 2.406-2.407h27.372a2.414 2.414 0 0 1 2.407 2.407V218.7a2.413 2.413 0 0 1-2.407 2.407" fill="#BFCDDD" mask="url(#d)" data-v-9ab8168c></path><path d="M177.259 207.217v11.52M201.05 207.217v11.52" stroke="#A3B4C6" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-9ab8168c></path><path d="M162.873 267.894a9.422 9.422 0 0 1-9.422-9.422v-14.82a9.423 9.423 0 0 1 18.845 0v14.82a9.423 9.423 0 0 1-9.423 9.422" fill="#5BA02E" mask="url(#d)" data-v-9ab8168c></path><path d="M171.22 267.83a9.422 9.422 0 0 1-9.422-9.423v-3.438a9.423 9.423 0 0 1 18.845 0v3.438a9.423 9.423 0 0 1-9.422 9.423" fill="#92C110" mask="url(#d)" data-v-9ab8168c></path><path d="M181.31 293.666h-27.712a3.209 3.209 0 0 1-3.209-3.21V269.79a3.209 3.209 0 0 1 3.209-3.21h27.711a3.209 3.209 0 0 1 3.209 3.21v20.668a3.209 3.209 0 0 1-3.209 3.209" fill="#F2D7AD" mask="url(#d)" data-v-9ab8168c></path></g>', 2)];
var a0 = { class: "m-title" };
var l0 = { class: "m-subtitle" };
var t0 = { class: "m-extra" };
var w1 = I2(defineComponent({ __name: "Result", props: { status: { default: "info" }, title: { default: "" }, subTitle: { default: "" } }, setup(l) {
  const a3 = ref(), e3 = ref(1);
  return onMounted(() => {
    e3.value = a3.value.offsetHeight;
  }), (s3, c3) => (openBlock(), createElementBlock("div", T4, [createBaseVNode("div", R4, [renderSlot(s3.$slots, "image", {}, () => [s3.status === "info" ? (openBlock(), createElementBlock("svg", W4, O4)) : createCommentVNode("", true), s3.status === "success" ? (openBlock(), createElementBlock("svg", N4, q4)) : createCommentVNode("", true), s3.status === "warning" ? (openBlock(), createElementBlock("svg", P4, Y4)) : createCommentVNode("", true), s3.status === "error" ? (openBlock(), createElementBlock("svg", U4, K4)) : createCommentVNode("", true), s3.status === "403" ? (openBlock(), createElementBlock("svg", G4, J4)) : createCommentVNode("", true), s3.status === "404" ? (openBlock(), createElementBlock("svg", Z4, X4)) : createCommentVNode("", true), s3.status === "500" ? (openBlock(), createElementBlock("svg", Q4, e0)) : createCommentVNode("", true)], true)]), createBaseVNode("div", a0, [renderSlot(s3.$slots, "title", {}, () => [createTextVNode(toDisplayString(s3.title), 1)], true)]), createBaseVNode("div", l0, [renderSlot(s3.$slots, "subTitle", {}, () => [createTextVNode(toDisplayString(s3.subTitle), 1)], true)]), createBaseVNode("div", t0, [renderSlot(s3.$slots, "extra", {}, void 0, true)]), e3.value !== 48 ? (openBlock(), createElementBlock("div", { key: 0, class: "m-content", ref_key: "contentRef", ref: a3 }, [renderSlot(s3.$slots, "default", {}, void 0, true)], 512)) : createCommentVNode("", true)]));
} }), [["__scopeId", "data-v-9ab8168c"]]);
w1.install = (l) => {
  l.component(w1.__name, w1);
};
var x1 = I2(defineComponent({ __name: "Row", props: { width: { default: "auto" }, gutter: { default: 0 }, wrap: { type: Boolean, default: false }, align: { default: "top" }, justify: { default: "start" } }, setup(l) {
  const a3 = l, e3 = { top: "flex-start", middle: "center", bottom: "flex-end", stretch: "stretch" }, s3 = computed(() => typeof a3.gutter == "number" ? a3.gutter : Array.isArray(a3.gutter) ? typeof a3.gutter[0] == "object" ? o.value >= 1600 && a3.gutter[0].xxl ? a3.gutter[0].xxl : o.value >= 1200 && a3.gutter[0].xl ? a3.gutter[0].xl : o.value >= 992 && a3.gutter[0].lg ? a3.gutter[0].lg : o.value >= 768 && a3.gutter[0].md ? a3.gutter[0].md : o.value >= 576 && a3.gutter[0].sm ? a3.gutter[0].sm : o.value < 576 && a3.gutter[0].xs ? a3.gutter[0].xs : 16 : a3.gutter[0] : typeof a3.gutter == "object" ? o.value >= 1600 && a3.gutter.xxl ? a3.gutter.xxl : o.value >= 1200 && a3.gutter.xl ? a3.gutter.xl : o.value >= 992 && a3.gutter.lg ? a3.gutter.lg : o.value >= 768 && a3.gutter.md ? a3.gutter.md : o.value >= 576 && a3.gutter.sm ? a3.gutter.sm : o.value < 576 && a3.gutter.xs ? a3.gutter.xs : 16 : 0), c3 = computed(() => Array.isArray(a3.gutter) ? typeof a3.gutter[1] == "object" ? o.value >= 1600 && a3.gutter[1].xxl ? a3.gutter[1].xxl : o.value >= 1200 && a3.gutter[1].xl ? a3.gutter[1].xl : o.value >= 992 && a3.gutter[1].lg ? a3.gutter[1].lg : o.value >= 768 && a3.gutter[1].md ? a3.gutter[1].md : o.value >= 576 && a3.gutter[1].sm ? a3.gutter[1].sm : o.value < 576 && a3.gutter[1].xs ? a3.gutter[1].xs : 16 : a3.gutter[1] : 0), u3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), o = ref(document.documentElement.clientWidth);
  function n() {
    o.value = document.documentElement.clientWidth;
  }
  return onMounted(() => {
    window.addEventListener("resize", n);
  }), onUnmounted(() => {
    window.removeEventListener("resize", n);
  }), (d3, f) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-row", { "gutter-row": d3.gutter }]), style: normalizeStyle(`--xGap: ${s3.value / 2}px; --justify: ${d3.justify}; --align: ${e3[d3.align]}; width: ${u3.value}; margin-left: -${s3.value / 2}px; margin-right: -${s3.value / 2}px; row-gap: ${c3.value}px;`) }, [renderSlot(d3.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-aee57bbb"]]);
x1.install = (l) => {
  l.component(x1.__name, x1);
};
var ca = (l) => (pushScopeId("data-v-f5caf7a6"), l = l(), popScopeId(), l);
var s0 = { key: 0, class: "m-handle-tooltip" };
var o0 = ca(() => createBaseVNode("div", { class: "m-arrow" }, null, -1));
var n0 = { key: 0, class: "m-handle-tooltip" };
var i0 = ca(() => createBaseVNode("div", { class: "m-arrow" }, null, -1));
var M1 = I2(defineComponent({ __name: "Slider", props: { width: { default: "100%" }, min: { default: 0 }, max: { default: 100 }, disabled: { type: Boolean, default: false }, range: { type: Boolean, default: false }, step: { default: 1 }, tipFormatter: { type: Function, default: (l) => l }, hideTip: { type: Boolean, default: false }, value: { default: 0 } }, emits: ["update:value", "change"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = ref(false), c3 = ref(), u3 = ref(0), o = ref(0), n = ref(), d3 = ref(), f = ref(), h5 = ref(), w3 = computed(() => x3(d3.value / (e3.max - e3.min) * e3.step)), k3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), v = computed(() => {
    const H3 = Math.round(o.value / w3.value * e3.step + e3.min);
    return e3.range ? [Math.round(u3.value / w3.value * e3.step + e3.min), H3] : H3;
  }), p = computed(() => e3.range ? e3.tipFormatter(v.value[0]) : null), y3 = computed(() => e3.range ? e3.tipFormatter(v.value[1]) : e3.tipFormatter(v.value));
  function x3(H3) {
    return parseFloat(H3.toFixed(2));
  }
  function b3() {
    e3.range ? (u3.value = x3((e3.value[0] - e3.min) / e3.step * w3.value), o.value = x3((e3.value[1] - e3.min) / e3.step * w3.value)) : o.value = x3((e3.value - e3.min) / e3.step * w3.value);
  }
  function g() {
    const H3 = n.value.getBoundingClientRect().left;
    document.onmousemove = (A) => {
      const j = x3(Math.round((A.clientX - H3) / w3.value) * w3.value);
      j < 0 ? u3.value = 0 : j >= 0 && j <= o.value ? u3.value = j : (u3.value = o.value, h5.value.focus(), S3());
    }, document.onmouseup = () => {
      document.onmousemove = null;
    };
  }
  function S3() {
    const H3 = n.value.getBoundingClientRect().left;
    document.onmousemove = (A) => {
      const j = x3(Math.round((A.clientX - H3) / w3.value) * w3.value);
      j > d3.value ? o.value = d3.value : u3.value <= j && j <= d3.value ? o.value = j : (o.value = u3.value, f.value.focus(), g());
    }, document.onmouseup = () => {
      document.onmousemove = null;
    };
  }
  function _(H3, A) {
    const j = H3 - w3.value;
    A === "left" ? u3.value = j < 0 ? 0 : j : j >= u3.value ? o.value = j : (o.value = u3.value, u3.value = j, f.value.focus());
  }
  function E3(H3, A) {
    const j = H3 + w3.value;
    A === "right" ? j > d3.value ? o.value = d3.value : o.value = j : j <= o.value ? u3.value = j : (u3.value = o.value, o.value = j, h5.value.focus());
  }
  return watch(() => e3.value, () => {
    b3();
  }), watch(v, (H3) => {
    a3("update:value", H3), a3("change", H3);
  }), onMounted(() => {
    d3.value = n.value.offsetWidth, b3();
  }), (H3, A) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-slider", { disabled: H3.disabled }]), ref_key: "slider", ref: n, style: normalizeStyle(`width: ${k3.value};`) }, [createBaseVNode("div", { class: "u-slider-rail", onClick: A[0] || (A[0] = withModifiers((j) => H3.disabled ? () => false : function(oe) {
    s3.value ? (me(c3.value), c3.value = null) : s3.value = true, c3.value = re(() => {
      s3.value = false;
    }, 300);
    const ee = Math.round(oe.layerX / w3.value) * w3.value;
    e3.range ? ee <= u3.value ? (u3.value = ee, f.value.focus()) : ee >= o.value ? (o.value = ee, h5.value.focus()) : ee - u3.value < o.value - ee ? (u3.value = ee, f.value.focus()) : (o.value = ee, h5.value.focus()) : (o.value = ee, h5.value.focus());
  }(j), ["self"])) }), createBaseVNode("div", { class: normalizeClass(["u-slider-track", { trackTransition: s3.value }]), style: normalizeStyle(`left: ${u3.value}px; right: auto; width: ${o.value - u3.value}px;`) }, null, 6), H3.range ? (openBlock(), createElementBlock("div", { key: 0, tabindex: "0", ref_key: "leftHandle", ref: f, class: normalizeClass(["u-slider-handle", { handleTransition: s3.value }]), style: normalizeStyle(`left: ${u3.value}px; right: auto; transform: translate(-50%, -50%);`), onKeydown: [A[1] || (A[1] = withKeys(withModifiers((j) => H3.disabled ? () => false : _(u3.value, "left"), ["prevent"]), ["left"])), A[2] || (A[2] = withKeys(withModifiers((j) => H3.disabled ? () => false : E3(u3.value, "left"), ["prevent"]), ["right"])), A[3] || (A[3] = withKeys(withModifiers((j) => H3.disabled ? () => false : _(u3.value, "left"), ["prevent"]), ["down"])), A[4] || (A[4] = withKeys(withModifiers((j) => H3.disabled ? () => false : E3(u3.value, "left"), ["prevent"]), ["up"]))], onMousedown: A[5] || (A[5] = (j) => H3.disabled ? () => false : g()) }, [H3.hideTip ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", s0, [createTextVNode(toDisplayString(p.value) + " ", 1), o0]))], 38)) : createCommentVNode("", true), createBaseVNode("div", { tabindex: "0", ref_key: "rightHandle", ref: h5, class: normalizeClass(["u-slider-handle", { handleTransition: s3.value }]), style: normalizeStyle(`left: ${o.value}px; right: auto; transform: translate(-50%, -50%);`), onKeydown: [A[6] || (A[6] = withKeys(withModifiers((j) => H3.disabled ? () => false : _(o.value, "right"), ["prevent"]), ["left"])), A[7] || (A[7] = withKeys(withModifiers((j) => H3.disabled ? () => false : E3(o.value, "right"), ["prevent"]), ["right"])), A[8] || (A[8] = withKeys(withModifiers((j) => H3.disabled ? () => false : _(o.value, "right"), ["prevent"]), ["down"])), A[9] || (A[9] = withKeys(withModifiers((j) => H3.disabled ? () => false : E3(o.value, "right"), ["prevent"]), ["up"]))], onMousedown: A[10] || (A[10] = (j) => H3.disabled ? () => false : S3()) }, [H3.hideTip ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", n0, [createTextVNode(toDisplayString(y3.value) + " ", 1), i0]))], 38)], 6));
} }), [["__scopeId", "data-v-f5caf7a6"]]);
M1.install = (l) => {
  l.component(M1.__name, M1);
};
var c0 = { class: "m-statistic" };
var u0 = { class: "u-title" };
var d0 = { class: "u-content-value" };
var _1 = I2(defineComponent({ __name: "Statistic", props: { title: { default: "" }, value: { default: "" }, valueStyle: { default: () => ({}) }, precision: { default: 0 }, prefix: { default: "" }, suffix: { default: "" }, separator: { default: "," }, formatter: { type: Function, default: (l) => l } }, setup(l) {
  const a3 = l, e3 = computed(() => a3.formatter(ga(a3.value, a3.precision, a3.separator))), s3 = ref(), c3 = ref(1), u3 = ref(), o = ref(1);
  return onMounted(() => {
    c3.value = s3.value.offsetHeight, o.value = u3.value.offsetHeight;
  }), (n, d3) => (openBlock(), createElementBlock("div", c0, [createBaseVNode("div", u0, [renderSlot(n.$slots, "title", {}, () => [createTextVNode(toDisplayString(n.title), 1)], true)]), createBaseVNode("div", { class: "m-content", style: normalizeStyle(n.valueStyle) }, [c3.value ? (openBlock(), createElementBlock("span", { key: 0, ref_key: "prefixRef", ref: s3, class: "u-prefix" }, [renderSlot(n.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(n.prefix), 1)], true)], 512)) : createCommentVNode("", true), createBaseVNode("span", d0, [renderSlot(n.$slots, "default", {}, () => [createTextVNode(toDisplayString(e3.value), 1)], true)]), o.value ? (openBlock(), createElementBlock("span", { key: 1, ref_key: "suffixRef", ref: u3, class: "u-suffix" }, [renderSlot(n.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(n.suffix), 1)], true)], 512)) : createCommentVNode("", true)], 4)]));
} }), [["__scopeId", "data-v-79da07bf"]]);
_1.install = (l) => {
  l.component(_1.__name, _1);
};
var r0 = { class: "m-steps" };
var v0 = ["onClick"];
var p0 = { class: "m-steps-icon" };
var f0 = { key: 0, class: "u-num" };
var h0 = { key: 1, class: "u-icon", viewBox: "64 64 896 896", "data-icon": "check", "aria-hidden": "true", focusable: "false" };
var m0 = [((l) => (pushScopeId("data-v-bd73c9b1"), l = l(), popScopeId(), l))(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1))];
var g0 = { class: "m-steps-content" };
var y0 = { class: "u-steps-title" };
var z1 = I2(defineComponent({ __name: "Steps", props: { steps: { default: () => [] }, current: { default: 1 }, width: { default: "100%" }, descMaxWidth: { default: 120 } }, emits: ["update:current", "change"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), c3 = computed(() => e3.steps.length), u3 = computed(() => e3.current < 1 ? 1 : e3.current > c3.value + 1 ? c3.value + 1 : e3.current);
  return (o, n) => (openBlock(), createElementBlock("div", { class: "m-steps-area", style: normalizeStyle(`width: ${s3.value};`) }, [createBaseVNode("div", r0, [(openBlock(true), createElementBlock(Fragment, null, renderList(o.steps, (d3, f) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-steps-item", { finish: u3.value > f + 1, process: u3.value === f + 1, wait: u3.value < f + 1 }]), key: f }, [createBaseVNode("div", { class: "m-info-wrap", onClick: (h5) => function(w3) {
    u3.value !== w3 && (a3("update:current", w3), a3("change", w3));
  }(f + 1) }, [createBaseVNode("div", p0, [u3.value <= f + 1 ? (openBlock(), createElementBlock("span", f0, toDisplayString(f + 1), 1)) : (openBlock(), createElementBlock("svg", h0, m0))]), createBaseVNode("div", g0, [createBaseVNode("div", y0, toDisplayString(d3.title), 1), withDirectives(createBaseVNode("div", { class: "u-steps-description", style: normalizeStyle(`max-width: ${o.descMaxWidth}px;`) }, toDisplayString(d3.description), 5), [[vShow, d3.description]])])], 8, v0)], 2))), 128))])], 4));
} }), [["__scopeId", "data-v-bd73c9b1"]]);
z1.install = (l) => {
  l.component(z1.__name, z1);
};
var k0 = ["href", "target"];
var b0 = ["src", "alt"];
var w0 = ["href", "target"];
var x0 = ["src", "alt"];
var M0 = defineComponent({ __name: "Swiper", props: { images: { default: () => [] }, width: { default: "100%" }, height: { default: "100vh" }, type: { default: "banner" }, navigation: { type: Boolean, default: true }, delay: { default: 3e3 }, swipe: { type: Boolean, default: true }, preloaderColor: { default: "theme" } }, setup(l) {
  const a3 = l, e3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), s3 = computed(() => typeof a3.height == "number" ? a3.height + "px" : a3.height), c3 = ref([Navigation, Pagination, Autoplay, EffectFade]), u3 = ref({ dynamicBullets: true, clickable: true }), o = ref({ delay: a3.delay, disableOnInteraction: false, pauseOnMouseEnter: true }), n = ref([Autoplay]), d3 = ref({ delay: 0, disableOnInteraction: false });
  function f(h5) {
    a3.type === "carousel" && (h5.el.onmouseenter = () => {
      h5.autoplay.stop();
    }, h5.el.onmouseleave = () => {
      h5.autoplay.start();
    });
  }
  return (h5, w3) => (openBlock(), createElementBlock(Fragment, null, [h5.type === "banner" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 0, class: { "swiper-no-swiping": !h5.swipe }, modules: c3.value, lazy: true, navigation: h5.navigation, pagination: u3.value, "slides-per-view": 1, autoplay: o.value, loop: true, onSwiper: f, onSlideChange: w3[0] || (w3[0] = (k3) => h5.$emit("change")) }, h5.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(h5.images, (k3, v) => (openBlock(), createBlock(unref(SwiperSlide), { key: v }, { default: withCtx(() => [createBaseVNode("a", { href: k3.link ? k3.link : "javascript:;", target: k3.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { src: k3.src, class: "u-img", style: normalizeStyle(`width: ${e3.value}; height: ${s3.value};`), alt: k3.title, loading: "lazy" }, null, 12, b0)], 8, k0), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${h5.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["class", "modules", "navigation", "pagination", "autoplay"])) : createCommentVNode("", true), h5.type === "carousel" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 1, class: "swiper-no-swiping", modules: n.value, lazy: true, autoplay: d3.value, loop: true, onSwiper: f, onSlideChange: w3[1] || (w3[1] = (k3) => h5.$emit("change")) }, h5.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(h5.images, (k3, v) => (openBlock(), createBlock(unref(SwiperSlide), { key: v }, { default: withCtx(() => [createBaseVNode("a", { href: k3.link ? k3.link : "javascript:;", target: k3.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { src: k3.src, class: "u-img", style: normalizeStyle(`width: ${e3.value}; height: ${s3.value};`), alt: k3.title, loading: "lazy" }, null, 12, x0)], 8, w0), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${h5.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["modules", "autoplay"])) : createCommentVNode("", true)], 64));
} });
var C1 = I2(M0, [["__scopeId", "data-v-98362268"]]);
C1.install = (l) => {
  l.component(C1.__name, C1);
};
var _0 = { class: "m-switch-wrap" };
var $1 = I2(defineComponent({ __name: "Switch", props: { onInfo: { default: "" }, offInfo: { default: "" }, disabled: { type: Boolean, default: false }, checked: { type: Boolean, default: false }, nodeStyle: { default: () => ({}) } }, emits: ["update:checked", "change"], setup(l, { emit: a3 }) {
  const e3 = l;
  return (s3, c3) => (openBlock(), createElementBlock("div", _0, [createBaseVNode("div", { onClick: c3[0] || (c3[0] = (u3) => s3.disabled ? () => false : (a3("update:checked", !e3.checked), void a3("change", !e3.checked))), class: normalizeClass(["m-switch", { "switch-checked": s3.checked, disabled: s3.disabled }]) }, [createBaseVNode("div", { class: normalizeClass(["u-switch-inner", s3.checked ? "inner-checked" : "inner-unchecked"]) }, toDisplayString(s3.checked ? s3.onInfo : s3.offInfo), 3), createBaseVNode("div", { class: normalizeClass(["u-node", { "node-checked": s3.checked }]), style: normalizeStyle(s3.nodeStyle) }, [renderSlot(s3.$slots, "node", {}, void 0, true)], 6)], 2)]));
} }), [["__scopeId", "data-v-b0415d28"]]);
$1.install = (l) => {
  l.component($1.__name, $1);
};
var z0 = { class: "m-table-wrap" };
var C0 = { class: "m-table" };
var $0 = { class: "m-tr" };
var B0 = { class: "m-body" };
var F0 = { class: "m-tr-loading" };
var L0 = { class: "m-tr-empty" };
var S0 = ["colspan"];
var A0 = ["title"];
var D0 = { key: 1 };
var B1 = I2(defineComponent({ __name: "Table", props: { columns: { default: () => [] }, dataSource: { default: () => [] }, pagination: { default: () => ({ page: 1, pageSize: 10 }) }, showPagination: { type: Boolean, default: true }, hideOnSinglePage: { type: Boolean, default: false }, total: { default: 0 }, loading: { type: Boolean, default: false } }, emits: ["change"], setup(l, { emit: a3 }) {
  function e3(s3) {
    a3("change", s3);
  }
  return (s3, c3) => (openBlock(), createElementBlock("div", z0, [createBaseVNode("table", C0, [createBaseVNode("thead", null, [createBaseVNode("tr", $0, [(openBlock(true), createElementBlock(Fragment, null, renderList(s3.columns, (u3, o) => (openBlock(), createElementBlock("th", { class: "m-th", style: normalizeStyle(`width: ${typeof u3.width == "number" ? u3.width + "px" : u3.width};`), key: o }, toDisplayString(u3.title), 5))), 128))])]), createBaseVNode("tbody", B0, [withDirectives(createBaseVNode("tr", F0, [createVNode(unref(se), { class: "m-loading", size: "small", colspan: s3.columns.length }, null, 8, ["colspan"])], 512), [[vShow, s3.loading]]), withDirectives(createBaseVNode("tr", L0, [createBaseVNode("td", { class: "m-td-empty", colspan: s3.columns.length }, [createVNode(unref(ze2), { class: "empty", image: "2" })], 8, S0)], 512), [[vShow, !s3.total]]), (openBlock(true), createElementBlock(Fragment, null, renderList(s3.dataSource, (u3, o) => (openBlock(), createElementBlock("tr", { class: "m-tr", key: o }, [(openBlock(true), createElementBlock(Fragment, null, renderList(s3.columns, (n, d3) => (openBlock(), createElementBlock("td", { class: "m-td", key: d3, title: u3[n.dataIndex] }, [n.slot ? renderSlot(s3.$slots, n.slot, mergeProps({ key: 0 }, u3, { index: o }), () => [createTextVNode(toDisplayString(u3[n.dataIndex] || "--"), 1)], true) : (openBlock(), createElementBlock("span", D0, toDisplayString(u3[n.dataIndex] || "--"), 1))], 8, A0))), 128))]))), 128))])]), s3.showPagination && s3.total ? (openBlock(), createBlock(unref(Ie), { key: 0, class: "mt20", onChange: e3, current: s3.pagination.page, pageSize: s3.pagination.pageSize, total: s3.total, hideOnSinglePage: s3.hideOnSinglePage, showQuickJumper: true, showTotal: true, placement: "right" }, null, 8, ["current", "pageSize", "total", "hideOnSinglePage"])) : createCommentVNode("", true)]));
} }), [["__scopeId", "data-v-bb4358d9"]]);
B1.install = (l) => {
  l.component(B1.__name, B1);
};
var H0 = { class: "m-tabs-nav" };
var E0 = ["onClick"];
var V0 = { class: "m-tabs-page" };
var F1 = I2(defineComponent({ __name: "Tabs", props: { tabPages: { default: () => [] }, centered: { type: Boolean, default: false }, size: { default: "small" }, activeKey: { default: "" } }, emits: ["update:activeKey", "change"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = ref(), c3 = ref(0), u3 = ref(0), o = ref(), n = ref(), d3 = ref(false), f = ref(0), h5 = ref(0);
  function w3(k3) {
    const v = s3.value[k3];
    v ? (c3.value = v.offsetLeft, u3.value = v.offsetWidth) : (c3.value = 0, u3.value = 0);
  }
  return watchEffect(() => {
    (function() {
      const k3 = o.value.offsetWidth, v = n.value.offsetWidth;
      v > k3 && (d3.value = true, f.value = v - k3);
    })();
  }, { flush: "post" }), watchEffect(() => {
    w3(e3.tabPages.findIndex((k3) => k3.key === e3.activeKey));
  }, { flush: "post" }), (k3, v) => (openBlock(), createElementBlock("div", { class: normalizeClass(`m-tabs ${k3.size}`) }, [createBaseVNode("div", H0, [createBaseVNode("div", { ref_key: "wrap", ref: o, class: normalizeClass(["m-tabs-nav-wrap", { "tabs-center": k3.centered, "before-shadow-active": h5.value > 0, "after-shadow-active": h5.value < f.value }]) }, [createBaseVNode("div", { ref_key: "nav", ref: n, class: "m-tabs-nav-list", onWheel: v[0] || (v[0] = (p) => d3.value ? function(y3) {
    if (y3.deltaX !== 0) {
      y3.preventDefault();
      const x3 = 1 * y3.deltaX;
      h5.value + x3 > f.value ? h5.value = f.value : h5.value + x3 < 0 ? h5.value = 0 : h5.value += x3;
    }
  }(p) : () => false), style: normalizeStyle(`transform: translate(${-h5.value}px, 0)`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(k3.tabPages, (p, y3) => (openBlock(), createElementBlock("div", { ref_for: true, ref_key: "tabs", ref: s3, class: normalizeClass(["u-tab", { "u-tab-active": k3.activeKey === p.key, "u-tab-disabled": p.disabled }]), onClick: (x3) => p.disabled ? () => false : function(b3, g) {
    w3(g), a3("update:activeKey", b3), a3("change", b3);
  }(p.key, y3), key: p.key }, toDisplayString(p.tab), 11, E0))), 128)), createBaseVNode("div", { class: "u-tab-bar", style: normalizeStyle(`left: ${c3.value}px; width: ${u3.value}px;`) }, null, 4)], 36)], 2)]), createBaseVNode("div", V0, [(openBlock(true), createElementBlock(Fragment, null, renderList(k3.tabPages, (p) => withDirectives((openBlock(), createElementBlock("div", { class: "m-tabs-content", key: p.key }, [renderSlot(k3.$slots, p.key, {}, () => [createTextVNode(toDisplayString(p.content), 1)], true)])), [[vShow, k3.activeKey === p.key]])), 128))])], 2));
} }), [["__scopeId", "data-v-c385aa08"]]);
F1.install = (l) => {
  l.component(F1.__name, F1);
};
var q1 = (l) => (pushScopeId("data-v-239ed553"), l = l(), popScopeId(), l);
var j0 = { class: "u-tag" };
var I0 = [q1(() => createBaseVNode("svg", { focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var T0 = { class: "u-tag" };
var R0 = ["onClick"];
var W0 = [q1(() => createBaseVNode("svg", { focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var O0 = [q1(() => createBaseVNode("svg", { focusable: "false", class: "u-plus", "data-icon": "plus", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }), createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })], -1))];
var L1 = I2(defineComponent({ __name: "Tag", props: { closable: { type: Boolean, default: false }, color: { default: "" }, icon: { default: "" }, size: { default: "middle" }, dynamic: { type: Boolean, default: false }, value: { default: () => [] }, spaceWidth: { default: "auto" }, spaceAlign: { default: "start" }, spaceDirection: { default: "horizontal" }, spaceSize: { default: "small" } }, emits: ["update:value", "close", "dynamicClose"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = computed(() => {
    if (e3.dynamic && e3.value.length) {
      if (typeof e3.value[0] == "string")
        return true;
      if (typeof e3.value[0] == "object")
        return false;
    }
    return null;
  }), c3 = computed(() => e3.dynamic && e3.value.length ? s3.value ? e3.value.map((g) => ({ label: g, closable: true })) : e3.value.map((g) => ({ closable: true, ...g })) : []), u3 = ref(), o = ref(false), n = ref(""), d3 = ["success", "processing", "error", "warning", "default", "pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"], f = ref(false), h5 = ref(), w3 = ref(1), k3 = ref(), v = ref(Array(e3.value.length).fill(1));
  function p(g) {
    f.value = true, a3("close", g);
  }
  function y3() {
    o.value = true, nextTick(() => {
      u3.value.focus();
    });
  }
  function x3() {
    s3.value ? a3("update:value", [...e3.value, n.value]) : a3("update:value", [...e3.value, { label: n.value }]), o.value = false, u3.value = "";
  }
  function b3(g) {
    g.key === "Enter" && u3.value.blur();
  }
  return onMounted(() => {
    if (e3.dynamic)
      for (let g = 0; g < e3.value.length; g++)
        v.value[g] = k3.value[g].offsetWidth;
    else
      w3.value = h5.value.offsetWidth;
  }), (g, S3) => g.dynamic ? (openBlock(), createBlock(unref(be), { key: 1, width: g.spaceWidth, align: g.spaceAlign, direction: g.spaceDirection, size: g.spaceSize }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(c3.value, (_, E3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-tag", [`tag-${_.size || g.size}`, (_.color || g.color) && d3.includes(_.color || g.color) ? "tag-" + (_.color || g.color) : "", { "has-color": (_.color || g.color) && !d3.includes(_.color || g.color) }]]), style: normalizeStyle(`background-color: ${!_.color && !g.color || d3.includes(_.color || g.color) ? "" : _.color || g.color};`), key: E3 }, [v.value[E3] ? (openBlock(), createElementBlock("span", { key: 0, class: "m-icon", ref_for: true, ref_key: "tagsIconRef", ref: k3 }, [renderSlot(g.$slots, "icon", { index: E3 }, () => [createTextVNode(toDisplayString(_.icon), 1)], true)], 512)) : createCommentVNode("", true), createBaseVNode("span", T0, [renderSlot(g.$slots, "default", { label: _.label, index: E3 }, () => [createTextVNode(toDisplayString(_.label), 1)], true)]), _.closable || g.closable ? (openBlock(), createElementBlock("span", { key: 1, class: "m-close", onClick: (H3) => function(A, j) {
    const oe = e3.value.filter((ee, xe2) => xe2 !== j);
    a3("update:value", oe), a3("dynamicClose", A, j);
  }(_, E3) }, W0, 8, R0)) : createCommentVNode("", true)], 6))), 128)), o.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-tag", [`tag-${g.size}`, { "m-plus": g.dynamic }]]), onClick: y3 }, O0, 2)), withDirectives(createBaseVNode("input", { ref_key: "inputRef", ref: u3, class: normalizeClass(["u-input", `input-${g.size}`]), type: "text", "onUpdate:modelValue": S3[0] || (S3[0] = (_) => n.value = _), onBlur: S3[1] || (S3[1] = (_) => o.value = false), onChange: x3, onKeydown: b3 }, null, 34), [[vShow, o.value], [vModelText, n.value]])]), _: 3 }, 8, ["width", "align", "direction", "size"])) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-tag", [`tag-${g.size}`, g.color && d3.includes(g.color) ? "tag-" + g.color : "", { "has-color": g.color && !d3.includes(g.color), hidden: f.value }]]), style: normalizeStyle(`background-color: ${g.color && !d3.includes(g.color) ? g.color : ""};`) }, [w3.value ? (openBlock(), createElementBlock("span", { key: 0, class: "m-icon", ref_key: "iconRef", ref: h5 }, [renderSlot(g.$slots, "icon", {}, void 0, true)], 512)) : createCommentVNode("", true), createBaseVNode("span", j0, [renderSlot(g.$slots, "default", {}, void 0, true)]), g.closable ? (openBlock(), createElementBlock("span", { key: 1, class: "m-close", onClick: p }, I0)) : createCommentVNode("", true)], 6));
} }), [["__scopeId", "data-v-239ed553"]]);
L1.install = (l) => {
  l.component(L1.__name, L1);
};
var N0 = ["data-count"];
var q0 = ["value", "maxlength", "disabled"];
var P0 = [((l) => (pushScopeId("data-v-94787871"), l = l(), popScopeId(), l))(() => createBaseVNode("svg", { focusable: "false", class: "u-clear", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })], -1))];
var S1 = I2(defineComponent({ inheritAttrs: false, __name: "Textarea", props: { width: { default: "100%" }, allowClear: { type: Boolean, default: false }, autoSize: { type: [Boolean, Object], default: false }, disabled: { type: Boolean, default: false }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, value: { default: "" }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "enter"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), c3 = computed(() => {
    if (typeof e3.autoSize == "object") {
      const v = { resize: "none" };
      return "minRows" in e3.autoSize && (v["min-height"] = 22 * e3.autoSize.minRows + 10 + "px"), "maxRows" in e3.autoSize && (v["max-height"] = 22 * e3.autoSize.maxRows + 10 + "px"), v;
    }
    if (typeof e3.autoSize == "boolean")
      return e3.autoSize ? { "max-height": "9000000000000000px", resize: "none" } : {};
  }), u3 = computed(() => e3.maxlength ? e3.value.length + " / " + e3.maxlength : e3.value.length);
  watch(() => e3.value, () => {
    JSON.stringify(c3.value) !== "{}" && (n.value = 32, nextTick(() => {
      d3();
    }));
  });
  const o = ref(), n = ref(32);
  function d3() {
    n.value = o.value.scrollHeight + 2;
  }
  function f(v) {
    "lazy" in e3.valueModifiers || (a3("update:value", v.target.value), a3("change", v));
  }
  function h5(v) {
    "lazy" in e3.valueModifiers && (a3("update:value", v.target.value), a3("change", v));
  }
  function w3(v) {
    v.key === "Enter" && a3("enter", v);
  }
  function k3() {
    a3("update:value", ""), o.value.focus();
  }
  return onMounted(() => {
    d3();
  }), (v, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-textarea", { "show-count": v.showCount }]), style: normalizeStyle(`width: ${s3.value};`), "data-count": u3.value }, [createBaseVNode("textarea", mergeProps({ ref_key: "textarea", ref: o, type: "hidden", class: ["u-textarea", { disabled: v.disabled }], style: [`height: ${v.autoSize ? n.value : ""}px`, c3.value], value: v.value, maxlength: v.maxlength, disabled: v.disabled, onInput: f, onChange: h5, onKeydown: w3 }, v.$attrs), null, 16, q0), !v.disabled && v.allowClear && v.value ? (openBlock(), createElementBlock("span", { key: 0, class: "m-clear", onClick: k3 }, P0)) : createCommentVNode("", true)], 14, N0));
} }), [["__scopeId", "data-v-94787871"]]);
S1.install = (l) => {
  l.component(S1.__name, S1);
};
var Y0 = ["title", "href", "target", "onClick"];
var U0 = ["title", "href", "target", "onClick"];
var A1 = I2(defineComponent({ __name: "TextScroll", props: { text: { default: () => [] }, width: { default: "100%" }, height: { default: 60 }, backgroundColor: { default: "#FFF" }, amount: { default: 4 }, gap: { default: 20 }, vertical: { type: Boolean, default: false }, interval: { default: 3e3 } }, emits: ["click"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = ref(0), c3 = ref(0), u3 = ref(), o = ref(60), n = ref([...e3.text]), d3 = ref(), f = ref(0), h5 = computed(() => o.value === 60 ? 1 : 60 / o.value);
  function w3() {
    const E3 = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var H3 = null;
    c3.value = E3(function A(j) {
      if (H3)
        return o.value = Math.floor(1e3 / (j - H3)), console.log("fps", o.value), f.value = parseFloat((d3.value.offsetWidth / e3.amount).toFixed(2)), void y3();
      c3.value > 10 && (H3 = j), c3.value = E3(A);
    });
  }
  function k3() {
    s3.value >= f.value ? (n.value.push(n.value.shift()), s3.value = 0) : s3.value += h5.value, u3.value = de(k3);
  }
  const v = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), p = computed(() => e3.text.length);
  function y3() {
    e3.vertical ? p.value > 1 && _() : n.value.length > e3.amount && (u3.value = de(k3));
  }
  function x3() {
    e3.vertical ? p.value > 1 && me(S3) : R1(u3.value);
  }
  function b3(E3) {
    a3("click", E3);
  }
  onMounted(() => {
    e3.vertical ? y3() : w3();
  });
  const g = ref(0);
  var S3 = null;
  function _() {
    S3 = re(() => {
      g.value === p.value - 1 ? g.value = 0 : g.value++, _();
    }, e3.interval);
  }
  return (E3, H3) => E3.vertical ? (openBlock(), createElementBlock("div", { key: 1, class: "m-slider-vertical", onMouseenter: x3, onMouseleave: y3, style: normalizeStyle(`height: ${E3.height}px; width: ${v.value}; background: ${E3.backgroundColor};`) }, [createVNode(TransitionGroup, { name: "slide" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (A, j) => withDirectives((openBlock(), createElementBlock("div", { class: "m-slider", style: normalizeStyle(`width: calc(${v.value} - ${2 * E3.gap}px); height: ${E3.height}px;`), key: j }, [createBaseVNode("a", { class: "u-slider", title: A.title, href: A.link ? A.link : "javascript:;", target: A.link ? "_blank" : "_self", onClick: (oe) => b3(A.title) }, toDisplayString(A.title || "--"), 9, U0)], 4)), [[vShow, g.value === j]])), 128))]), _: 1 })], 36)) : (openBlock(), createElementBlock("div", { key: 0, class: "m-slider-horizon", onMouseenter: x3, onMouseleave: y3, ref_key: "horizonRef", ref: d3, style: normalizeStyle(`height: ${E3.height}px; width: ${v.value}; background: ${E3.backgroundColor};`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (A, j) => (openBlock(), createElementBlock("a", { style: normalizeStyle(`will-change: transform; transform: translateX(${-s3.value}px); width: ${f.value - E3.gap}px; margin-left: ${E3.gap}px;`), class: "u-slide-title", key: j, title: A.title, href: A.link ? A.link : "javascript:;", target: A.link ? "_blank" : "_self", onClick: (oe) => b3(A.title) }, toDisplayString(A.title || "--"), 13, Y0))), 128))], 36));
} }), [["__scopeId", "data-v-b92925b9"]]);
A1.install = (l) => {
  l.component(A1.__name, A1);
};
var K0 = { class: "m-timeline" };
var D1 = I2(defineComponent({ __name: "Timeline", props: { timelineData: { default: () => [] }, width: { default: 360 }, lineStyle: { default: "solid" } }, setup(l) {
  const a3 = l, e3 = ref(), s3 = ref([]), c3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width);
  return watchEffect(() => {
    (function() {
      const u3 = a3.timelineData.length;
      for (let o = 0; o < u3; o++)
        s3.value[o] = getComputedStyle(e3.value[o].firstElementChild || e3.value[o], null).getPropertyValue("line-height");
    })();
  }, { flush: "post" }), (u3, o) => (openBlock(), createElementBlock("div", { class: "m-timeline-area", style: normalizeStyle(`width: ${c3.value};`) }, [createBaseVNode("div", K0, [(openBlock(true), createElementBlock(Fragment, null, renderList(u3.timelineData, (n, d3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-timeline-item", { last: d3 === u3.timelineData.length - 1 }]), key: d3 }, [createBaseVNode("span", { class: "u-tail", style: normalizeStyle(`border-left-style: ${u3.lineStyle};`) }, null, 4), createBaseVNode("div", { class: "m-dot", style: normalizeStyle(`height: ${s3.value[d3]}`) }, [renderSlot(u3.$slots, "dot", { index: d3 }, () => [n.color === "red" ? (openBlock(), createElementBlock("span", { key: 0, class: "u-dot", style: normalizeStyle({ borderColor: "#ff4d4f" }) }, null, 4)) : n.color === "gray" ? (openBlock(), createElementBlock("span", { key: 1, class: "u-dot", style: normalizeStyle({ borderColor: "#00000040" }) }, null, 4)) : n.color === "green" ? (openBlock(), createElementBlock("span", { key: 2, class: "u-dot", style: normalizeStyle({ borderColor: "#52c41a" }) }, null, 4)) : n.color === "blue" ? (openBlock(), createElementBlock("span", { key: 3, class: "u-dot", style: normalizeStyle({ borderColor: "#1677ff" }) }, null, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-dot", style: normalizeStyle({ borderColor: n.color || "#1677ff" }) }, null, 4))], true)], 4), createBaseVNode("div", { ref_for: true, ref_key: "desc", ref: e3, class: "u-desc" }, [renderSlot(u3.$slots, "desc", { index: d3 }, () => [createTextVNode(toDisplayString(n.desc || "--"), 1)], true)], 512)], 2))), 128))])], 4));
} }), [["__scopeId", "data-v-f55b0664"]]);
D1.install = (l) => {
  l.component(D1.__name, D1);
};
var Be = (l) => (pushScopeId("data-v-4a4522ff"), l = l(), popScopeId(), l);
var G0 = { class: "m-upload-list" };
var J0 = { class: "m-upload" };
var Z0 = ["onDrop", "onClick"];
var X0 = ["accept", "multiple", "onChange"];
var Q0 = Be(() => createBaseVNode("svg", { focusable: "false", class: "u-plus", "data-icon": "plus", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("defs"), createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }), createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })], -1));
var e6 = { class: "u-tip" };
var a6 = { class: "m-file-uploading" };
var l6 = { key: 0, class: "m-file-preview" };
var t6 = { key: 1, class: "u-file", focusable: "false", "data-icon": "file-pdf", "aria-hidden": "true", viewBox: "64 64 896 896" };
var s6 = [Be(() => createBaseVNode("path", { d: "M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1))];
var o6 = { key: 2, class: "u-file", focusable: "false", "data-icon": "file", "aria-hidden": "true", viewBox: "64 64 896 896" };
var n6 = [Be(() => createBaseVNode("path", { d: "M534 352V136H232v752h560V394H576a42 42 0 01-42-42z", fill: "#e6f7ff" }, null, -1)), Be(() => createBaseVNode("path", { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1))];
var i6 = { class: "m-file-mask" };
var c6 = ["onClick"];
var u6 = [Be(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "eye", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })], -1))];
var d6 = ["onClick"];
var r6 = [Be(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "delete", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" })], -1))];
var H1 = I2(defineComponent({ __name: "Upload", props: { accept: { default: "*" }, multiple: { type: Boolean, default: false }, maxCount: { default: 1 }, tip: { default: "Upload" }, uploadingTip: { default: "Uploading" }, gap: { default: 8 }, fit: { default: "contain" }, errorInfo: { default: "" }, beforeUpload: { type: Function, default: () => true }, uploadMode: { default: "base64" }, customRequest: { type: Function, default: () => {
} }, disabled: { type: Boolean, default: false }, fileList: { default: () => [] } }, emits: ["update:fileList", "change", "remove"], setup(l, { emit: a3 }) {
  const e3 = l, s3 = ref([]), c3 = ref(1), u3 = ref(Array(e3.maxCount).fill(false)), o = ref();
  function n(k3) {
    return /\.(jpg|jpeg|png|gif)$/i.test(k3) || /^data:image/.test(k3);
  }
  watchEffect(() => {
    (function() {
      s3.value = [...e3.fileList], s3.value.length > e3.maxCount && s3.value.splice(e3.maxCount), e3.disabled ? c3.value = s3.value.length : s3.value.length < e3.maxCount ? c3.value = e3.fileList.length + 1 : c3.value = e3.maxCount;
    })();
  });
  const d3 = function(k3, v) {
    e3.beforeUpload(k3) ? (e3.maxCount > c3.value && c3.value++, e3.uploadMode === "base64" && (u3.value[v] = true, function(p, y3) {
      var x3 = new FileReader();
      x3.readAsDataURL(p), x3.onloadstart = function(b3) {
      }, x3.onabort = function(b3) {
      }, x3.onerror = function(b3) {
      }, x3.onprogress = function(b3) {
        b3.loaded === b3.total && (u3.value[y3] = false);
      }, x3.onload = function(b3) {
        var g;
        s3.value.push({ name: p.name, url: (g = b3.target) == null ? void 0 : g.result }), a3("update:fileList", s3.value), a3("change", s3.value);
      }, x3.onloadend = function(b3) {
      };
    }(k3, v)), e3.uploadMode === "custom" && (u3.value[v] = true, function(p, y3) {
      e3.customRequest(p).then((x3) => {
        s3.value.push(x3), a3("update:fileList", s3.value), a3("change", s3.value);
      }).catch((x3) => {
        e3.maxCount > 1 && (c3.value = s3.value.length + 1), w3(x3);
      }).finally(() => {
        u3.value[y3] = false;
      });
    }(k3, v))) : nextTick(() => {
      w3(e3.errorInfo);
    });
  }, f = ref(), h5 = ref();
  function w3(k3) {
    h5.value.error(k3);
  }
  return (k3, v) => (openBlock(), createElementBlock("div", G0, [createVNode(unref(be), { size: k3.gap }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(c3.value, (p) => {
    return openBlock(), createElementBlock("div", { class: "m-upload-item", key: p }, [createBaseVNode("div", J0, [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-upload-wrap", { "upload-disabled": k3.disabled }]), onDragenter: v[1] || (v[1] = withModifiers(() => {
    }, ["stop", "prevent"])), onDragover: v[2] || (v[2] = withModifiers(() => {
    }, ["stop", "prevent"])), onDrop: withModifiers((x3) => k3.disabled ? () => false : function(b3, g) {
      var _;
      const S3 = (_ = b3.dataTransfer) == null ? void 0 : _.files;
      if (S3 != null && S3.length) {
        const E3 = S3.length;
        for (let H3 = 0; H3 < E3 && g + H3 <= e3.maxCount; H3++)
          d3(S3[H3], g + H3);
        o.value[g].value = "";
      }
    }(x3, p - 1), ["stop", "prevent"]), onClick: (x3) => {
      return k3.disabled ? () => false : (b3 = p - 1, void o.value[b3].click());
      var b3;
    } }, [createBaseVNode("input", { ref_for: true, ref_key: "uploadInput", ref: o, type: "file", onClick: v[0] || (v[0] = withModifiers(() => {
    }, ["stop"])), accept: k3.accept, multiple: k3.multiple, onChange: (x3) => function(b3, g) {
      const S3 = b3.target.files;
      if (S3 != null && S3.length) {
        const _ = S3.length;
        for (let E3 = 0; E3 < _ && g + E3 < e3.maxCount; E3++)
          d3(S3[E3], g + E3);
        o.value[g].value = "";
      }
    }(x3, p - 1), style: { display: "none" } }, null, 40, X0), createBaseVNode("div", null, [Q0, createBaseVNode("p", e6, [renderSlot(k3.$slots, "default", {}, () => [createTextVNode(toDisplayString(k3.tip), 1)], true)])])], 42, Z0), [[vShow, !u3.value[p - 1] && !s3.value[p - 1]]]), withDirectives(createBaseVNode("div", a6, [createVNode(unref(se), { class: "u-spin", tip: k3.uploadingTip, size: "small", indicator: "dynamic-circle" }, null, 8, ["tip"])], 512), [[vShow, u3.value[p - 1]]]), s3.value[p - 1] ? (openBlock(), createElementBlock("div", l6, [n(s3.value[p - 1].url) ? (openBlock(), createBlock(unref(Ve), { key: 0, ref_for: true, ref_key: "imageRef", ref: f, bordered: false, width: 82, height: 82, src: s3.value[p - 1].url, name: s3.value[p - 1].name }, null, 8, ["src", "name"])) : (y3 = s3.value[p - 1].url, /\.pdf$/i.test(y3) || /^data:application\/pdf/.test(y3) ? (openBlock(), createElementBlock("svg", t6, s6)) : (openBlock(), createElementBlock("svg", o6, n6))), createBaseVNode("div", i6, [createBaseVNode("a", { class: "m-icon", title: "预览", onClick: (x3) => function(b3, g) {
      if (console.log("isImage", n(g)), n(g)) {
        const S3 = s3.value.slice(0, b3).filter((_) => !n(_.url));
        f.value[b3 - S3.length].onPreview(0);
      } else
        window.open(g);
    }(p - 1, s3.value[p - 1].url) }, u6, 8, c6), withDirectives(createBaseVNode("a", { class: "m-icon", title: "删除", onClick: withModifiers((x3) => function(b3) {
      s3.value.length < e3.maxCount && c3.value--;
      const g = s3.value.splice(b3, 1);
      a3("remove", g), a3("update:fileList", s3.value), a3("change", s3.value);
    }(p - 1), ["prevent", "stop"]) }, r6, 8, d6), [[vShow, !k3.disabled]])])])) : createCommentVNode("", true)])]);
    var y3;
  }), 128))]), _: 3 }, 8, ["size"]), createVNode(unref(je2), { ref_key: "message", ref: h5, duration: 3e3, top: 30 }, null, 512)]));
} }), [["__scopeId", "data-v-4a4522ff"]]);
H1.install = (l) => {
  l.component(H1.__name, H1);
};
var v6 = ["src", "poster", "width", "height", "autoplay", "controls", "loop", "muted", "preload", "onClickOnce"];
var p6 = [((l) => (pushScopeId("data-v-d01fba1c"), l = l(), popScopeId(), l))(() => createBaseVNode("svg", { class: "u-svg", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 34 34" }, [createBaseVNode("path", { d: `M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039
          C31.913,19.675,31.913,14.325,28.26,11.961z` })], -1))];
var E1 = I2(defineComponent({ __name: "Video", props: { src: { default: "" }, poster: { default: "" }, second: { default: 0.5 }, width: { default: 800 }, height: { default: 450 }, autoplay: { type: Boolean, default: false }, controls: { type: Boolean, default: true }, loop: { type: Boolean, default: false }, muted: { type: Boolean, default: false }, preload: { default: "auto" }, showPlay: { type: Boolean, default: true }, fit: { default: "contain" } }, setup(l) {
  const a3 = l, e3 = ref(a3.poster), s3 = ref(true), c3 = ref(false), u3 = ref();
  function o() {
    var n, d3;
    s3.value && (u3.value.currentTime = 0, s3.value = false), a3.autoplay ? (n = u3.value) == null || n.pause() : (c3.value = true, (d3 = u3.value) == null || d3.play());
  }
  return onMounted(() => {
    a3.autoplay && (c3.value = true, s3.value = false);
  }), (n, d3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-video", { "u-video-hover": !c3.value }]), style: normalizeStyle(`width: ${n.width}px; height: ${n.height}px;`) }, [createBaseVNode("video", mergeProps({ ref_key: "veo", ref: u3, style: `object-fit: ${n.fit};`, src: n.src, poster: e3.value, width: n.width, height: n.height, autoplay: n.autoplay, controls: !s3.value && n.controls, loop: n.loop, muted: n.autoplay || n.muted, preload: n.preload, crossorigin: "anonymous", onLoadeddata: d3[0] || (d3[0] = (f) => n.poster ? () => false : function() {
    u3.value.currentTime = a3.second;
    const h5 = document.createElement("canvas"), w3 = h5.getContext("2d");
    h5.width = u3.value.videoWidth, h5.height = u3.value.videoHeight, w3 == null || w3.drawImage(u3.value, 0, 0, h5.width, h5.height), e3.value = h5.toDataURL("image/png");
  }()), onPause: d3[1] || (d3[1] = (f) => n.showPlay ? void (c3.value = false) : () => false), onPlaying: d3[2] || (d3[2] = (f) => n.showPlay ? void (c3.value = true) : () => false), onClickOnce: withModifiers(o, ["prevent"]) }, n.$attrs), " 您的浏览器不支持video标签。 ", 16, v6), withDirectives(createBaseVNode("span", { class: normalizeClass(["m-icon-play", { hidden: c3.value }]) }, p6, 2), [[vShow, s3.value || n.showPlay]])], 6));
} }), [["__scopeId", "data-v-d01fba1c"]]);
E1.install = (l) => {
  l.component(E1.__name, E1);
};
var f6 = ["src", "alt", "onLoad"];
var h6 = ["src", "alt", "onLoad"];
var V1 = I2(defineComponent({ __name: "Waterfall", props: { images: { default: () => [] }, columnCount: { default: 3 }, columnGap: { default: 20 }, width: { default: "100%" }, backgroundColor: { default: "#F2F4F8" }, mode: { default: "JS" } }, setup(l) {
  const a3 = l, e3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), s3 = ref([]), c3 = ref([]), u3 = ref(), o = ref(), n = computed(() => Math.max(...c3.value) + a3.columnGap), d3 = computed(() => a3.images.length), f = ref(Array(d3.value).fill(false));
  function h5(p) {
    f.value[p] = true;
  }
  function w3(p, y3) {
    if (p < a3.columnCount)
      return c3.value[p] = a3.columnGap + y3, { top: a3.columnGap, left: (o.value + a3.columnGap) * p + a3.columnGap };
    {
      const b3 = Math.min(...c3.value);
      var x3 = 0;
      for (let g = 0; g < c3.value.length; g++)
        if (c3.value[g] === b3) {
          x3 = g;
          break;
        }
      return c3.value[x3] = b3 + a3.columnGap + y3, { top: b3 + a3.columnGap, left: (o.value + a3.columnGap) * x3 + a3.columnGap };
    }
  }
  function k3(p, y3) {
    return new Promise((x3) => {
      const b3 = new Image();
      b3.src = p, b3.onload = function() {
        var g = b3.height / (b3.width / o.value);
        s3.value[y3] = { width: o.value, height: g, ...w3(y3, g) }, x3("load");
      };
    });
  }
  async function v() {
    o.value = (u3.value.offsetWidth - (a3.columnCount + 1) * a3.columnGap) / a3.columnCount;
    const p = a3.images.length;
    s3.value.splice(p);
    for (let y3 = 0; y3 < p; y3++)
      await k3(a3.images[y3].src, y3);
  }
  return watch(() => a3.images, (p) => {
    p.length && a3.mode === "JS" && v();
  }), onMounted(() => {
    a3.images.length && a3.mode === "JS" && v();
  }), (p, y3) => (openBlock(), createElementBlock(Fragment, null, [p.mode === "JS" ? (openBlock(), createElementBlock("div", mergeProps({ key: 0 }, p.$attrs, { class: "m-waterfall-js", ref_key: "waterfall", ref: u3, style: `background-color: ${p.backgroundColor}; width: ${e3.value}; height: ${n.value}px;` }), [(openBlock(true), createElementBlock(Fragment, null, renderList(s3.value, (x3, b3) => (openBlock(), createBlock(unref(se), { class: "m-img", style: normalizeStyle(`width: ${x3.width}px; height: ${x3.height}px; top: ${x3 && x3.top}px; left: ${x3 && x3.left}px;`), spinning: !f.value[b3], size: "small", indicator: "dynamic-circle", key: b3 }, { default: withCtx(() => [createBaseVNode("img", { class: "u-img", src: p.images[b3].src, alt: p.images[b3].title, onLoad: (g) => h5(b3) }, null, 40, f6)]), _: 2 }, 1032, ["style", "spinning"]))), 128))], 16)) : createCommentVNode("", true), p.mode === "CSS" ? (openBlock(), createElementBlock("div", mergeProps({ key: 1 }, p.$attrs, { class: "m-waterfall-css", style: `background: ${p.backgroundColor}; width: ${e3.value}; padding: ${p.columnGap}px; column-count: ${p.columnCount}; column-gap: ${p.columnGap}px;` }), [(openBlock(true), createElementBlock(Fragment, null, renderList(p.images, (x3, b3) => (openBlock(), createBlock(unref(se), { style: normalizeStyle(`margin-bottom: ${p.columnGap}px;`), spinning: !f.value[b3], size: "small", indicator: "dynamic-circle", key: b3 }, { default: withCtx(() => [createBaseVNode("img", { class: "u-img", src: x3.src, alt: x3.title, onLoad: (g) => h5(b3) }, null, 40, h6)]), _: 2 }, 1032, ["style", "spinning"]))), 128))], 16)) : createCommentVNode("", true)], 64));
} }), [["__scopeId", "data-v-42fced48"]]);
V1.install = (l) => {
  l.component(V1.__name, V1);
};
var m6 = [Ye2, Ue, Ke, Ge2, Je2, fe, Ze, Xe, Qe, e1, a1, l1, t1, s1, o1, n1, i1, c1, u1, d1, ze2, Ve, r1, v1, je2, p1, f1, h1, Ie, m1, g1, y1, k1, b1, w1, x1, ke2, M1, be, se, _1, z1, C1, $1, B1, F1, L1, S1, A1, D1, Ee, H1, E1, V1];
var F6 = { install: (l) => {
  m6.forEach((a3) => l.component(a3.__name, a3));
} };
export {
  Ye2 as Alert,
  Ue as Avatar,
  Ke as BackTop,
  Ge2 as Badge,
  Je2 as Breadcrumb,
  fe as Button,
  Ze as Card,
  Xe as Carousel,
  Qe as Cascader,
  e1 as Checkbox,
  a1 as Col,
  l1 as Collapse,
  t1 as Countdown,
  s1 as DatePicker,
  o1 as Descriptions,
  n1 as DescriptionsItem,
  i1 as Dialog,
  c1 as Divider,
  u1 as Drawer,
  d1 as Ellipsis,
  ze2 as Empty,
  Ve as Image,
  r1 as Input,
  v1 as InputNumber,
  je2 as Message,
  p1 as Modal,
  f1 as Notification,
  h1 as NumberAnimation,
  Ie as Pagination,
  m1 as Popconfirm,
  g1 as Progress,
  y1 as QRCode,
  k1 as Radio,
  b1 as Rate,
  w1 as Result,
  x1 as Row,
  ke2 as Select,
  M1 as Slider,
  be as Space,
  se as Spin,
  _1 as Statistic,
  z1 as Steps,
  C1 as Swiper,
  $1 as Switch,
  B1 as Table,
  F1 as Tabs,
  L1 as Tag,
  A1 as TextScroll,
  S1 as Textarea,
  D1 as Timeline,
  Ee as Tooltip,
  H1 as Upload,
  E1 as Video,
  V1 as Waterfall,
  C6 as add,
  R1 as cancelAnimationFrame,
  me as cancelRaf,
  M6 as dateFormat,
  z6 as debounce,
  F6 as default,
  $6 as downloadFile,
  ga as formatNumber,
  re as rafTimeout,
  de as requestAnimationFrame,
  _6 as throttle,
  B6 as toggleDark
};
//# sourceMappingURL=vue-amazing-ui.js.map
