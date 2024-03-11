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
  customRef,
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
  readonly,
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
} from "./chunk-3DXR62HT.js";
import {
  __commonJS,
  __toESM
} from "./chunk-LQ2VYIYD.js";

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
    exports.getSymbolSize = function getSymbolSize(version2) {
      if (!version2)
        throw new Error('"version" cannot be null or undefined');
      if (version2 < 1 || version2 > 40)
        throw new Error('"version" should be in range from 1 to 40');
      return version2 * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version2) {
      return CODEWORDS_COUNT[version2];
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
    exports.getRowColCoords = function getRowColCoords(version2) {
      if (version2 === 1)
        return [];
      const posCount = Math.floor(version2 / 7) + 2;
      const size = getSymbolSize(version2);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i3 = 1; i3 < posCount - 1; i3++) {
        positions[i3] = positions[i3 - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version2) {
      const coords = [];
      const pos = exports.getRowColCoords(version2);
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
    exports.getPositions = function getPositions(version2) {
      const size = getSymbolSize(version2);
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
    exports.getBlocksCount = function getBlocksCount(version2, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version2, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 3];
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
    exports.isValid = function isValid2(version2) {
      return !isNaN(version2) && version2 >= 1 && version2 <= 40;
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
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version2) {
      if (!mode.ccBits)
        throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version2)) {
        throw new Error("Invalid version: " + version2);
      }
      if (version2 >= 1 && version2 < 10)
        return mode.ccBits[0];
      else if (version2 < 27)
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
    function getReservedBitsCount(mode, version2) {
      return Mode.getCharCountIndicator(mode, version2) + 4;
    }
    function getTotalBitsFromDataArray(segments, version2) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version2);
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
    exports.getCapacity = function getCapacity(version2, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version2)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined")
        mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version2);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED)
        return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version2);
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
    exports.getEncodedBits = function getEncodedBits(version2) {
      if (!VersionCheck.isValid(version2) || version2 < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d3 = version2 << 12;
      while (Utils.getBCHDigit(d3) - G18_BCH >= 0) {
        d3 ^= G18 << Utils.getBCHDigit(d3) - G18_BCH;
      }
      return version2 << 12 | d3;
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
      return segs.sort(function(s1, s23) {
        return s1.index - s23.index;
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
    function buildGraph(nodes, version2) {
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
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version2);
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
    exports.fromString = function fromString(data, version2) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version2);
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
    function setupFinderPattern(matrix, version2) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version2);
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
    function setupAlignmentPattern(matrix, version2) {
      const pos = AlignmentPattern.getPositions(version2);
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
    function setupVersionInfo(matrix, version2) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version2);
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
    function createData(version2, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version2));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version2);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel);
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
      return createCodewords(buffer, version2, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version2, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version2);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version2, errorCorrectionLevel);
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
    function createSymbol(data, version2, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version2;
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
      if (!version2) {
        version2 = bestVersion;
      } else if (version2 < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version2, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version2);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version2);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version2);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version2 >= 7) {
        setupVersionInfo(modules, version2);
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
        version: version2,
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
      let version2;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version2 = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version2, errorCorrectionLevel, mask);
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/typeof.js
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
  var timestamp2 = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp2 + amount);
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/addQuarters/index.js
function addQuarters(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  var months = amount * 3;
  return addMonths(dirtyDate, months);
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/getQuarter/index.js
function getQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var quarter = Math.floor(date.getMonth() / 3) + 1;
  return quarter;
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfQuarter/index.js
function startOfQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3;
  date.setMonth(month, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/eachQuarterOfInterval/index.js
function eachQuarterOfInterval(dirtyInterval) {
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var startDateQuarter = startOfQuarter(startDate);
  var endDateQuarter = startOfQuarter(endDate);
  endTime = endDateQuarter.getTime();
  var quarters = [];
  var currentQuarter = startDateQuarter;
  while (currentQuarter.getTime() <= endTime) {
    quarters.push(toDate(currentQuarter));
    currentQuarter = addQuarters(currentQuarter, 1);
  }
  return quarters;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/endOfYear/index.js
function endOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/startOfYear/index.js
function startOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var cleanDate = toDate(dirtyDate);
  var date = /* @__PURE__ */ new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/endOfQuarter/index.js
function endOfQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
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
  var timestamp2 = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp2 - startOfYearTimestamp;
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
    var timestamp2 = Math.floor(originalDate.getTime() / 1e3);
    return addLeadingZeros(timestamp2, token.length);
  },
  // Milliseconds timestamp
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp2 = originalDate.getTime();
    return addLeadingZeros(timestamp2, token.length);
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++)
    arr2[i3] = arr[i3];
  return arr2;
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
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
        e: function e3(_e) {
          throw _e;
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
    e: function e3(_e2) {
      didErr = true;
      err = _e2;
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o, p);
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/inherits.js
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o);
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  try {
    var t3 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t5) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t3;
  })();
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/createSuper.js
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t3, r) {
  if ("object" != _typeof(t3) || !t3)
    return t3;
  var e3 = t3[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i3 = e3.call(t3, r || "default");
    if ("object" != _typeof(i3))
      return i3;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t3);
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t3) {
  var i3 = toPrimitive(t3, "string");
  return "symbol" == _typeof(i3) ? i3 : String(i3);
}

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
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

// node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
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
    value: function set3(utcDate, flags, options) {
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
    value: function set3(date, flags) {
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
    value: function set3(date, flags, value) {
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
    value: function set3(date, flags, value) {
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
    value: function set3(date, flags, value, options) {
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
    value: function set3(_date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value, options) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value, options) {
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
    value: function set3(date, _flags, value, options) {
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
    value: function set3(date, _flags, value, options) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, _flags, value) {
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
    value: function set3(date, flags, value) {
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
    value: function set3(date, flags, value) {
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
    value: function set3(_date, _flags, value) {
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
    value: function set3(_date, _flags, value) {
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

// node_modules/.pnpm/date-fns@2.30.0/node_modules/date-fns/esm/isSameQuarter/index.js
function isSameQuarter(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfQuarter = startOfQuarter(dirtyDateLeft);
  var dateRightStartOfQuarter = startOfQuarter(dirtyDateRight);
  return dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime();
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
  var timestamp2 = date.getTime();
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
    var dirtyDate = new Date(timestamp2 + time);
    var result = /* @__PURE__ */ new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }
  return new Date(timestamp2 + time + offset);
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

// node_modules/.pnpm/@vuepic+vue-datepicker@7.4.1_vue@3.4.15/node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
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
function Aa() {
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
Aa.compatConfig = {
  MODE: 3
};
function En() {
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
En.compatConfig = {
  MODE: 3
};
function Fn() {
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
Fn.compatConfig = {
  MODE: 3
};
function Hn() {
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
Hn.compatConfig = {
  MODE: 3
};
function Vn() {
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
Vn.compatConfig = {
  MODE: 3
};
function Ln() {
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
Ln.compatConfig = {
  MODE: 3
};
function Un(e3) {
  return e3 && e3.__esModule && Object.prototype.hasOwnProperty.call(e3, "default") ? e3.default : e3;
}
var Sa = { exports: {} };
(function(e3) {
  function t3(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e3.exports = t3, e3.exports.__esModule = true, e3.exports.default = e3.exports;
})(Sa);
var fr = Sa.exports;
var An = { exports: {} };
(function(e3, t3) {
  Object.defineProperty(t3, "__esModule", {
    value: true
  }), t3.default = r;
  function r(a3) {
    if (a3 === null || a3 === true || a3 === false)
      return NaN;
    var n = Number(a3);
    return isNaN(n) ? n : n < 0 ? Math.ceil(n) : Math.floor(n);
  }
  e3.exports = t3.default;
})(An, An.exports);
var vr = An.exports;
var mr = Un(vr);
var Sn = { exports: {} };
(function(e3, t3) {
  Object.defineProperty(t3, "__esModule", {
    value: true
  }), t3.default = r;
  function r(a3) {
    var n = new Date(Date.UTC(a3.getFullYear(), a3.getMonth(), a3.getDate(), a3.getHours(), a3.getMinutes(), a3.getSeconds(), a3.getMilliseconds()));
    return n.setUTCFullYear(a3.getFullYear()), a3.getTime() - n.getTime();
  }
  e3.exports = t3.default;
})(Sn, Sn.exports);
var gr = Sn.exports;
var na = Un(gr);
function yr(e3, t3) {
  var r = kr(t3);
  return r.formatToParts ? pr(r, e3) : br(r, e3);
}
var hr = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function pr(e3, t3) {
  try {
    for (var r = e3.formatToParts(t3), a3 = [], n = 0; n < r.length; n++) {
      var o = hr[r[n].type];
      o >= 0 && (a3[o] = parseInt(r[n].value, 10));
    }
    return a3;
  } catch (i3) {
    if (i3 instanceof RangeError)
      return [NaN];
    throw i3;
  }
}
function br(e3, t3) {
  var r = e3.format(t3).replace(/\u200E/g, ""), a3 = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(r);
  return [a3[3], a3[1], a3[2], a3[4], a3[5], a3[6]];
}
var fn = {};
function kr(e3) {
  if (!fn[e3]) {
    var t3 = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), r = t3 === "06/25/2014, 00:00:00" || t3 === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
    fn[e3] = r ? new Intl.DateTimeFormat("en-US", {
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
  return fn[e3];
}
function zn(e3, t3, r, a3, n, o, i3) {
  var c3 = /* @__PURE__ */ new Date(0);
  return c3.setUTCFullYear(e3, t3, r), c3.setUTCHours(a3, n, o, i3), c3;
}
var aa = 36e5;
var wr = 6e4;
var vn = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function Wn(e3, t3, r) {
  var a3, n;
  if (e3 === "" || (a3 = vn.timezoneZ.exec(e3), a3))
    return 0;
  var o;
  if (a3 = vn.timezoneHH.exec(e3), a3)
    return o = parseInt(a3[1], 10), ra(o) ? -(o * aa) : NaN;
  if (a3 = vn.timezoneHHMM.exec(e3), a3) {
    o = parseInt(a3[1], 10);
    var i3 = parseInt(a3[2], 10);
    return ra(o, i3) ? (n = Math.abs(o) * aa + i3 * wr, o > 0 ? -n : n) : NaN;
  }
  if ($r(e3)) {
    t3 = new Date(t3 || Date.now());
    var c3 = r ? t3 : Dr(t3), p = Pn(c3, e3), T3 = r ? p : Mr(t3, p, e3);
    return -T3;
  }
  return NaN;
}
function Dr(e3) {
  return zn(
    e3.getFullYear(),
    e3.getMonth(),
    e3.getDate(),
    e3.getHours(),
    e3.getMinutes(),
    e3.getSeconds(),
    e3.getMilliseconds()
  );
}
function Pn(e3, t3) {
  var r = yr(e3, t3), a3 = zn(
    r[0],
    r[1] - 1,
    r[2],
    r[3] % 24,
    r[4],
    r[5],
    0
  ).getTime(), n = e3.getTime(), o = n % 1e3;
  return n -= o >= 0 ? o : 1e3 + o, a3 - n;
}
function Mr(e3, t3, r) {
  var a3 = e3.getTime(), n = a3 - t3, o = Pn(new Date(n), r);
  if (t3 === o)
    return t3;
  n -= o - t3;
  var i3 = Pn(new Date(n), r);
  return o === i3 ? o : Math.max(o, i3);
}
function ra(e3, t3) {
  return -23 <= e3 && e3 <= 23 && (t3 == null || 0 <= t3 && t3 <= 59);
}
var la = {};
function $r(e3) {
  if (la[e3])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e3 }), la[e3] = true, true;
  } catch {
    return false;
  }
}
var Pa = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var mn = 36e5;
var oa = 6e4;
var Tr = 2;
var Ve = {
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
  timeZone: Pa
};
function Cn(e3, t3) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e3 === null)
    return /* @__PURE__ */ new Date(NaN);
  var r = t3 || {}, a3 = r.additionalDigits == null ? Tr : mr(r.additionalDigits);
  if (a3 !== 2 && a3 !== 1 && a3 !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e3 instanceof Date || typeof e3 == "object" && Object.prototype.toString.call(e3) === "[object Date]")
    return new Date(e3.getTime());
  if (typeof e3 == "number" || Object.prototype.toString.call(e3) === "[object Number]")
    return new Date(e3);
  if (!(typeof e3 == "string" || Object.prototype.toString.call(e3) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var n = Ar(e3), o = Sr(n.date, a3), i3 = o.year, c3 = o.restDateString, p = Pr(c3, i3);
  if (isNaN(p))
    return /* @__PURE__ */ new Date(NaN);
  if (p) {
    var T3 = p.getTime(), D3 = 0, R3;
    if (n.time && (D3 = Cr(n.time), isNaN(D3)))
      return /* @__PURE__ */ new Date(NaN);
    if (n.timeZone || r.timeZone) {
      if (R3 = Wn(n.timeZone || r.timeZone, new Date(T3 + D3)), isNaN(R3))
        return /* @__PURE__ */ new Date(NaN);
    } else
      R3 = na(new Date(T3 + D3)), R3 = na(new Date(T3 + D3 + R3));
    return new Date(T3 + D3 + R3);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Ar(e3) {
  var t3 = {}, r = Ve.dateTimePattern.exec(e3), a3;
  if (r ? (t3.date = r[1], a3 = r[3]) : (r = Ve.datePattern.exec(e3), r ? (t3.date = r[1], a3 = r[2]) : (t3.date = null, a3 = e3)), a3) {
    var n = Ve.timeZone.exec(a3);
    n ? (t3.time = a3.replace(n[1], ""), t3.timeZone = n[1].trim()) : t3.time = a3;
  }
  return t3;
}
function Sr(e3, t3) {
  var r = Ve.YYY[t3], a3 = Ve.YYYYY[t3], n;
  if (n = Ve.YYYY.exec(e3) || a3.exec(e3), n) {
    var o = n[1];
    return {
      year: parseInt(o, 10),
      restDateString: e3.slice(o.length)
    };
  }
  if (n = Ve.YY.exec(e3) || r.exec(e3), n) {
    var i3 = n[1];
    return {
      year: parseInt(i3, 10) * 100,
      restDateString: e3.slice(i3.length)
    };
  }
  return {
    year: null
  };
}
function Pr(e3, t3) {
  if (t3 === null)
    return null;
  var r, a3, n, o;
  if (e3.length === 0)
    return a3 = /* @__PURE__ */ new Date(0), a3.setUTCFullYear(t3), a3;
  if (r = Ve.MM.exec(e3), r)
    return a3 = /* @__PURE__ */ new Date(0), n = parseInt(r[1], 10) - 1, ia(t3, n) ? (a3.setUTCFullYear(t3, n), a3) : /* @__PURE__ */ new Date(NaN);
  if (r = Ve.DDD.exec(e3), r) {
    a3 = /* @__PURE__ */ new Date(0);
    var i3 = parseInt(r[1], 10);
    return Or(t3, i3) ? (a3.setUTCFullYear(t3, 0, i3), a3) : /* @__PURE__ */ new Date(NaN);
  }
  if (r = Ve.MMDD.exec(e3), r) {
    a3 = /* @__PURE__ */ new Date(0), n = parseInt(r[1], 10) - 1;
    var c3 = parseInt(r[2], 10);
    return ia(t3, n, c3) ? (a3.setUTCFullYear(t3, n, c3), a3) : /* @__PURE__ */ new Date(NaN);
  }
  if (r = Ve.Www.exec(e3), r)
    return o = parseInt(r[1], 10) - 1, ua(t3, o) ? sa(t3, o) : /* @__PURE__ */ new Date(NaN);
  if (r = Ve.WwwD.exec(e3), r) {
    o = parseInt(r[1], 10) - 1;
    var p = parseInt(r[2], 10) - 1;
    return ua(t3, o, p) ? sa(t3, o, p) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Cr(e3) {
  var t3, r, a3;
  if (t3 = Ve.HH.exec(e3), t3)
    return r = parseFloat(t3[1].replace(",", ".")), gn(r) ? r % 24 * mn : NaN;
  if (t3 = Ve.HHMM.exec(e3), t3)
    return r = parseInt(t3[1], 10), a3 = parseFloat(t3[2].replace(",", ".")), gn(r, a3) ? r % 24 * mn + a3 * oa : NaN;
  if (t3 = Ve.HHMMSS.exec(e3), t3) {
    r = parseInt(t3[1], 10), a3 = parseInt(t3[2], 10);
    var n = parseFloat(t3[3].replace(",", "."));
    return gn(r, a3, n) ? r % 24 * mn + a3 * oa + n * 1e3 : NaN;
  }
  return null;
}
function sa(e3, t3, r) {
  t3 = t3 || 0, r = r || 0;
  var a3 = /* @__PURE__ */ new Date(0);
  a3.setUTCFullYear(e3, 0, 4);
  var n = a3.getUTCDay() || 7, o = t3 * 7 + r + 1 - n;
  return a3.setUTCDate(a3.getUTCDate() + o), a3;
}
var _r = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var Rr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Ca(e3) {
  return e3 % 400 === 0 || e3 % 4 === 0 && e3 % 100 !== 0;
}
function ia(e3, t3, r) {
  if (t3 < 0 || t3 > 11)
    return false;
  if (r != null) {
    if (r < 1)
      return false;
    var a3 = Ca(e3);
    if (a3 && r > Rr[t3] || !a3 && r > _r[t3])
      return false;
  }
  return true;
}
function Or(e3, t3) {
  if (t3 < 1)
    return false;
  var r = Ca(e3);
  return !(r && t3 > 366 || !r && t3 > 365);
}
function ua(e3, t3, r) {
  return !(t3 < 0 || t3 > 52 || r != null && (r < 0 || r > 6));
}
function gn(e3, t3, r) {
  return !(e3 != null && (e3 < 0 || e3 >= 25) || t3 != null && (t3 < 0 || t3 >= 60) || r != null && (r < 0 || r >= 60));
}
var _n = { exports: {} };
var Rn = { exports: {} };
(function(e3, t3) {
  Object.defineProperty(t3, "__esModule", {
    value: true
  }), t3.default = r;
  function r(a3, n) {
    if (a3 == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (a3[o] = n[o]);
    return a3;
  }
  e3.exports = t3.default;
})(Rn, Rn.exports);
var Yr = Rn.exports;
(function(e3, t3) {
  var r = fr.default;
  Object.defineProperty(t3, "__esModule", {
    value: true
  }), t3.default = n;
  var a3 = r(Yr);
  function n(o) {
    return (0, a3.default)({}, o);
  }
  e3.exports = t3.default;
})(_n, _n.exports);
var Nr = _n.exports;
var Ir = Un(Nr);
function Br(e3, t3, r) {
  var a3 = Cn(e3, r), n = Wn(t3, a3, true), o = new Date(a3.getTime() - n), i3 = /* @__PURE__ */ new Date(0);
  return i3.setFullYear(o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate()), i3.setHours(o.getUTCHours(), o.getUTCMinutes(), o.getUTCSeconds(), o.getUTCMilliseconds()), i3;
}
function Er(e3, t3, r) {
  if (typeof e3 == "string" && !e3.match(Pa)) {
    var a3 = Ir(r);
    return a3.timeZone = t3, Cn(e3, a3);
  }
  var n = Cn(e3, r), o = zn(
    n.getFullYear(),
    n.getMonth(),
    n.getDate(),
    n.getHours(),
    n.getMinutes(),
    n.getSeconds(),
    n.getMilliseconds()
  ).getTime(), i3 = Wn(t3, new Date(o));
  return new Date(o + i3);
}
function da(e3) {
  return (t3) => new Intl.DateTimeFormat(e3, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t3}T00:00:00+00:00`)).slice(0, 2);
}
function Fr(e3) {
  return (t3) => format(/* @__PURE__ */ new Date(`2017-01-0${t3}T00:00:00+00:00`), "EEEEEE", { locale: e3 });
}
var Hr = (e3, t3, r) => {
  const a3 = [1, 2, 3, 4, 5, 6, 7];
  let n;
  if (e3 !== null)
    try {
      n = a3.map(Fr(e3));
    } catch {
      n = a3.map(da(t3));
    }
  else
    n = a3.map(da(t3));
  const o = n.slice(0, r), i3 = n.slice(r + 1, n.length);
  return [n[r]].concat(...i3).concat(...o);
};
var jn = (e3, t3) => {
  const r = [];
  for (let a3 = +e3[0]; a3 <= +e3[1]; a3++)
    r.push({ value: +a3, text: `${a3}` });
  return t3 ? r.reverse() : r;
};
var _a = (e3, t3, r) => {
  const a3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((o) => {
    const i3 = o < 10 ? `0${o}` : o;
    return /* @__PURE__ */ new Date(`2017-${i3}-01T00:00:00+00:00`);
  });
  if (e3 !== null)
    try {
      const o = r === "long" ? "MMMM" : "MMM";
      return a3.map((i3, c3) => {
        const p = format(i3, o, { locale: e3 });
        return {
          text: p.charAt(0).toUpperCase() + p.substring(1),
          value: c3
        };
      });
    } catch {
    }
  const n = new Intl.DateTimeFormat(t3, { month: r, timeZone: "UTC" });
  return a3.map((o, i3) => {
    const c3 = n.format(o);
    return {
      text: c3.charAt(0).toUpperCase() + c3.substring(1),
      value: i3
    };
  });
};
var Vr = (e3) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e3];
var Re = (e3) => {
  const t3 = unref(e3);
  return t3 != null && t3.$el ? t3 == null ? void 0 : t3.$el : t3;
};
var Lr = (e3) => Object.assign({ type: "dot" }, e3);
var Ra = (e3) => Array.isArray(e3) ? !!e3[0] && !!e3[1] : false;
var tn = {
  prop: (e3) => `"${e3}" prop must be enabled!`,
  dateArr: (e3) => `You need to use array as "model-value" binding in order to support "${e3}"`
};
var Ce = (e3) => e3;
var ca = (e3) => e3 === 0 ? e3 : !e3 || isNaN(+e3) ? null : +e3;
var fa = (e3) => e3 === null;
var Ur = (e3) => {
  if (e3)
    return [...e3.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var zr = (e3) => {
  const t3 = [], r = (a3) => a3.filter((n) => n);
  for (let a3 = 0; a3 < e3.length; a3 += 3) {
    const n = [e3[a3], e3[a3 + 1], e3[a3 + 2]];
    t3.push(r(n));
  }
  return t3;
};
var Ht = (e3, t3, r) => {
  const a3 = r != null, n = t3 != null;
  if (!a3 && !n)
    return false;
  const o = +r, i3 = +t3;
  return a3 && n ? +e3 > o || +e3 < i3 : a3 ? +e3 > o : n ? +e3 < i3 : false;
};
var Ct = (e3, t3) => zr(e3).map((r) => r.map((a3) => {
  const { active: n, disabled: o, isBetween: i3, highlighted: c3 } = t3(a3);
  return {
    ...a3,
    active: n,
    disabled: o,
    className: {
      dp__overlay_cell_active: n,
      dp__overlay_cell: !n,
      dp__overlay_cell_disabled: o,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: o && n,
      dp__cell_in_between: i3,
      "dp--highlighted": c3
    }
  };
}));
var ft = (e3, t3, r = false) => {
  e3 && t3.allowStopPropagation && (r && e3.stopImmediatePropagation(), e3.stopPropagation());
};
var Wr = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function jr(e3, t3) {
  let r = [...document.querySelectorAll(Wr())];
  r = r.filter((n) => !e3.contains(n) || n.hasAttribute("data-datepicker-instance"));
  const a3 = r.indexOf(e3);
  if (a3 >= 0 && (t3 ? a3 - 1 >= 0 : a3 + 1 <= r.length))
    return r[a3 + (t3 ? -1 : 1)];
}
var Kr = (e3, t3) => {
  let r;
  return function(...a3) {
    clearTimeout(r), r = setTimeout(() => {
      e3(...a3);
    }, t3);
  };
};
var va = (e3, t3, r, a3, n) => {
  const o = parse(e3, t3.slice(0, e3.length), /* @__PURE__ */ new Date());
  return isValid(o) && isDate(o) ? a3 || n ? o : set(o, {
    hours: +r.hours,
    minutes: +(r == null ? void 0 : r.minutes),
    seconds: +(r == null ? void 0 : r.seconds),
    milliseconds: 0
  }) : null;
};
var Gr = (e3, t3, r, a3, n) => {
  const o = Array.isArray(r) ? r[0] : r;
  if (typeof t3 == "string")
    return va(e3, t3, o, a3, n);
  if (Array.isArray(t3)) {
    let i3 = null;
    for (const c3 of t3)
      if (i3 = va(e3, c3, o, a3, n), i3)
        break;
    return i3;
  }
  return typeof t3 == "function" ? t3(e3) : null;
};
var B2 = (e3) => e3 ? new Date(e3) : /* @__PURE__ */ new Date();
var qr = (e3, t3, r) => {
  if (t3) {
    const n = (e3.getMonth() + 1).toString().padStart(2, "0"), o = e3.getDate().toString().padStart(2, "0"), i3 = e3.getHours().toString().padStart(2, "0"), c3 = e3.getMinutes().toString().padStart(2, "0"), p = r ? e3.getSeconds().toString().padStart(2, "0") : "00";
    return `${e3.getFullYear()}-${n}-${o}T${i3}:${c3}:${p}.000Z`;
  }
  const a3 = Date.UTC(
    e3.getUTCFullYear(),
    e3.getUTCMonth(),
    e3.getUTCDate(),
    e3.getUTCHours(),
    e3.getUTCMinutes(),
    e3.getUTCSeconds()
  );
  return new Date(a3).toISOString();
};
var Fe = (e3) => {
  let t3 = B2(JSON.parse(JSON.stringify(e3)));
  return t3 = setHours(t3, 0), t3 = setMinutes(t3, 0), t3 = setSeconds(t3, 0), t3 = setMilliseconds(t3, 0), t3;
};
var vt = (e3, t3, r, a3) => {
  let n = e3 ? B2(e3) : B2();
  return (t3 || t3 === 0) && (n = setHours(n, +t3)), (r || r === 0) && (n = setMinutes(n, +r)), (a3 || a3 === 0) && (n = setSeconds(n, +a3)), setMilliseconds(n, 0);
};
var Ye = (e3, t3) => !e3 || !t3 ? false : isBefore(Fe(e3), Fe(t3));
var ke = (e3, t3) => !e3 || !t3 ? false : isEqual(Fe(e3), Fe(t3));
var Ee = (e3, t3) => !e3 || !t3 ? false : isAfter(Fe(e3), Fe(t3));
var nn = (e3, t3, r) => e3 != null && e3[0] && (e3 != null && e3[1]) ? Ee(r, e3[0]) && Ye(r, e3[1]) : e3 != null && e3[0] && t3 ? Ee(r, e3[0]) && Ye(r, t3) || Ye(r, e3[0]) && Ee(r, t3) : false;
var Xe = (e3) => {
  const t3 = set(new Date(e3), { date: 1 });
  return Fe(t3);
};
var yn = (e3, t3, r) => t3 && (r || r === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((a3) => a3 === t3 ? [a3, r] : [a3, isNaN(+e3[a3]) ? void 0 : +e3[a3]])
) : {
  hours: isNaN(+e3.hours) ? void 0 : +e3.hours,
  minutes: isNaN(+e3.minutes) ? void 0 : +e3.minutes,
  seconds: isNaN(+e3.seconds) ? void 0 : +e3.seconds
};
var wt = (e3) => ({
  hours: getHours(e3),
  minutes: getMinutes(e3),
  seconds: getSeconds(e3)
});
var Oa = (e3, t3) => {
  if (t3) {
    const r = getYear(B2(t3));
    if (r > e3)
      return 12;
    if (r === e3)
      return getMonth(B2(t3));
  }
};
var Ya = (e3, t3) => {
  if (t3) {
    const r = getYear(B2(t3));
    return r < e3 ? -1 : r === e3 ? getMonth(B2(t3)) : void 0;
  }
};
var _t = (e3) => {
  if (e3)
    return getYear(B2(e3));
};
var et = (e3, t3) => t3 ? Br(e3, t3) : e3;
var Na = (e3, t3) => t3 ? Er(e3, t3) : e3;
var Zr = (e3) => e3 instanceof Date ? e3 : parseISO(e3);
var Ia = (e3, t3) => {
  const r = Ee(e3, t3) ? t3 : e3, a3 = Ee(t3, e3) ? t3 : e3;
  return eachDayOfInterval({ start: r, end: a3 });
};
var Qr = (e3) => {
  const t3 = addMonths(e3, 1);
  return { month: getMonth(t3), year: getYear(t3) };
};
var xt = (e3, t3, r) => {
  const a3 = startOfWeek(et(e3, t3), { weekStartsOn: +r }), n = endOfWeek(et(e3, t3), { weekStartsOn: +r });
  return [a3, n];
};
var Ba = (e3, t3) => {
  const r = {
    hours: getHours(B2()),
    minutes: getMinutes(B2()),
    seconds: t3 ? getSeconds(B2()) : 0
  };
  return Object.assign(r, e3);
};
var dt = (e3, t3, r) => [set(B2(e3), { date: 1 }), set(B2(), { month: t3, year: r, date: 1 })];
var ot = (e3, t3, r) => {
  let a3 = e3 ? B2(e3) : B2();
  return (t3 || t3 === 0) && (a3 = setMonth(a3, t3)), r && (a3 = setYear(a3, r)), a3;
};
var Ea = (e3, t3, r, a3, n) => {
  if (!a3 || n && !t3 || !n && !r)
    return false;
  const o = n ? addMonths(e3, 1) : subMonths(e3, 1), i3 = [getMonth(o), getYear(o)];
  return n ? !Jr(...i3, t3) : !Xr(...i3, r);
};
var Xr = (e3, t3, r) => Ye(...dt(r, e3, t3)) || ke(...dt(r, e3, t3));
var Jr = (e3, t3, r) => Ee(...dt(r, e3, t3)) || ke(...dt(r, e3, t3));
var Fa = (e3, t3, r, a3, n, o, i3) => {
  if (typeof t3 == "function" && !i3)
    return t3(e3);
  const c3 = r ? { locale: r } : void 0;
  return Array.isArray(e3) ? `${format(e3[0], o, c3)}${n && !e3[1] ? "" : a3}${e3[1] ? format(e3[1], o, c3) : ""}` : format(e3, o, c3);
};
var Tt = (e3) => {
  if (e3)
    return null;
  throw new Error(tn.prop("partial-range"));
};
var qt = (e3, t3) => {
  if (t3)
    return e3();
  throw new Error(tn.prop("range"));
};
var On = (e3) => Array.isArray(e3) ? isValid(e3[0]) && (e3[1] ? isValid(e3[1]) : true) : e3 ? isValid(e3) : false;
var xr = (e3, t3) => set(t3 ?? B2(), {
  hours: +e3.hours || 0,
  minutes: +e3.minutes || 0,
  seconds: +e3.seconds || 0
});
var hn = (e3, t3, r, a3) => {
  if (!e3)
    return true;
  if (a3) {
    const n = r === "max" ? isBefore(e3, t3) : isAfter(e3, t3), o = { seconds: 0, milliseconds: 0 };
    return n || isEqual(set(e3, o), set(t3, o));
  }
  return r === "max" ? e3.getTime() <= t3.getTime() : e3.getTime() >= t3.getTime();
};
var pn = (e3, t3, r) => e3 ? xr(e3, t3) : B2(r ?? t3);
var ma = (e3, t3, r, a3, n) => {
  if (Array.isArray(a3)) {
    const i3 = pn(e3, a3[0], t3), c3 = pn(e3, a3[1], t3);
    return hn(a3[0], i3, r, !!t3) && hn(a3[1], c3, r, !!t3) && n;
  }
  const o = pn(e3, a3, t3);
  return hn(a3, o, r, !!t3) && n;
};
var bn = (e3) => set(B2(), wt(e3));
var el = (e3, t3) => Array.isArray(e3) ? e3.map((r) => B2(r)).filter((r) => getYear(B2(r)) === t3).map((r) => getMonth(r)) : [];
var Ha = (e3, t3, r) => typeof e3 == "function" ? e3({ month: t3, year: r }) : !!e3.months.find((a3) => a3.month === t3 && a3.year === r);
var Kn = (e3, t3) => typeof e3 == "function" ? e3(t3) : e3.years.includes(t3);
var Nt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var Va = () => {
  const e3 = (a3) => {
    Nt.menuFocused = a3;
  }, t3 = (a3) => {
    Nt.shiftKeyInMenu !== a3 && (Nt.shiftKeyInMenu = a3);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Nt.shiftKeyInMenu, menuFocused: Nt.menuFocused })),
    setMenuFocused: e3,
    setShiftKey: t3
  };
};
var $e = reactive({
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
var kn = ref(null);
var Zt = ref(false);
var wn = ref(false);
var Dn = ref(false);
var Mn = ref(false);
var He = ref(0);
var Oe = ref(0);
var yt = () => {
  const e3 = computed(() => Zt.value ? [...$e.selectionGrid, $e.actionRow].filter((g) => g.length) : wn.value ? [
    ...$e.timePicker[0],
    ...$e.timePicker[1],
    Mn.value ? [] : [kn.value],
    $e.actionRow
  ].filter((g) => g.length) : Dn.value ? [...$e.monthPicker, $e.actionRow] : [$e.monthYear, ...$e.calendar, $e.time, $e.actionRow].filter((g) => g.length)), t3 = (g) => {
    He.value = g ? He.value + 1 : He.value - 1;
    let S3 = null;
    e3.value[Oe.value] && (S3 = e3.value[Oe.value][He.value]), S3 || (He.value = g ? He.value - 1 : He.value + 1);
  }, r = (g) => {
    if (Oe.value === 0 && !g || Oe.value === e3.value.length && g)
      return;
    Oe.value = g ? Oe.value + 1 : Oe.value - 1, e3.value[Oe.value] ? e3.value[Oe.value] && !e3.value[Oe.value][He.value] && He.value !== 0 && (He.value = e3.value[Oe.value].length - 1) : Oe.value = g ? Oe.value - 1 : Oe.value + 1;
  }, a3 = (g) => {
    let S3 = null;
    e3.value[Oe.value] && (S3 = e3.value[Oe.value][He.value]), S3 ? S3.focus({ preventScroll: !Zt.value }) : He.value = g ? He.value - 1 : He.value + 1;
  }, n = () => {
    t3(true), a3(true);
  }, o = () => {
    t3(false), a3(false);
  }, i3 = () => {
    r(false), a3(true);
  }, c3 = () => {
    r(true), a3(true);
  }, p = (g, S3) => {
    $e[S3] = g;
  }, T3 = (g, S3) => {
    $e[S3] = g;
  }, D3 = () => {
    He.value = 0, Oe.value = 0;
  };
  return {
    buildMatrix: p,
    buildMultiLevelMatrix: T3,
    setTimePickerBackRef: (g) => {
      kn.value = g;
    },
    setSelectionGrid: (g) => {
      Zt.value = g, D3(), g || ($e.selectionGrid = []);
    },
    setTimePicker: (g, S3 = false) => {
      wn.value = g, Mn.value = S3, D3(), g || ($e.timePicker[0] = [], $e.timePicker[1] = []);
    },
    setTimePickerElements: (g, S3 = 0) => {
      $e.timePicker[S3] = g;
    },
    arrowRight: n,
    arrowLeft: o,
    arrowUp: i3,
    arrowDown: c3,
    clearArrowNav: () => {
      $e.monthYear = [], $e.calendar = [], $e.time = [], $e.actionRow = [], $e.selectionGrid = [], $e.timePicker[0] = [], $e.timePicker[1] = [], Zt.value = false, wn.value = false, Mn.value = false, Dn.value = false, D3(), kn.value = null;
    },
    setMonthPicker: (g) => {
      Dn.value = g, D3();
    },
    refSets: $e
    // exposed for testing
  };
};
var ga = (e3) => ({
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
var tl = (e3) => ({
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
  calendarWrap: "Calendar wrapper",
  calendarDays: "Calendar days",
  openTimePicker: "Open time picker",
  closeTimePicker: "Close time Picker",
  incrementValue: (t3) => `Increment ${t3}`,
  decrementValue: (t3) => `Decrement ${t3}`,
  openTpOverlay: (t3) => `Open ${t3} overlay`,
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
var ya = (e3) => e3 ? typeof e3 == "boolean" ? e3 ? 2 : 0 : +e3 >= 2 ? +e3 : 2 : 0;
var nl = (e3) => {
  const t3 = typeof e3 == "object" && e3, r = {
    static: true,
    solo: false
  };
  if (!e3)
    return { ...r, count: ya(false) };
  const a3 = t3 ? e3 : {}, n = t3 ? a3.count ?? true : e3, o = ya(n);
  return Object.assign(r, a3, { count: o });
};
var al = (e3, t3, r) => e3 || (typeof r == "string" ? r : t3);
var rl = (e3) => typeof e3 == "boolean" ? e3 ? ga({}) : false : ga(e3);
var ll = (e3) => {
  const t3 = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e3 == "object" ? { ...t3, ...e3 ?? {}, enabled: true } : { ...t3, enabled: e3 };
};
var ol = (e3) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e3 ?? {}
});
var sl = (e3) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e3 ?? {}
});
var il = (e3) => {
  const t3 = { input: false };
  return typeof e3 == "object" ? { ...t3, ...e3 ?? {}, enabled: true } : {
    enabled: e3,
    ...t3
  };
};
var ul = (e3) => ({ ...{
  allowStopPropagation: true,
  closeOnScroll: false,
  modeHeight: 255,
  allowPreventDefault: false,
  closeOnClearValue: true,
  closeOnAutoApply: true,
  noSwipe: false,
  keepActionRow: false,
  onClickOutside: void 0,
  tabOutClosesMenu: true
}, ...e3 ?? {} });
var dl = (e3, t3, r) => {
  const a3 = {
    dates: Array.isArray(e3) ? e3.map((n) => B2(n)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: t3,
    options: { highlightDisabled: r }
  };
  return typeof e3 == "function" ? e3 : { ...a3, ...e3 ?? {} };
};
var cl = (e3) => typeof e3 == "object" ? {
  type: e3.type,
  hideOnOffsetDates: e3.hideOnOffsetDates ?? false
} : {
  type: e3,
  hideOnOffsetDates: false
};
var Pe = (e3) => {
  const t3 = () => {
    const g = e3.enableSeconds ? ":ss" : "";
    return e3.is24 ? `HH:mm${g}` : `hh:mm${g} aa`;
  }, r = () => e3.format ? e3.format : e3.monthPicker ? "MM/yyyy" : e3.timePicker ? t3() : e3.weekPicker ? "MM/dd/yyyy" : e3.yearPicker ? "yyyy" : e3.quarterPicker ? "QQQ/yyyy" : e3.enableTimePicker ? `MM/dd/yyyy, ${t3()}` : "MM/dd/yyyy", a3 = (g) => Ba(g, e3.enableSeconds), n = () => e3.range ? e3.startTime && Array.isArray(e3.startTime) ? [a3(e3.startTime[0]), a3(e3.startTime[1])] : null : e3.startTime && !Array.isArray(e3.startTime) ? a3(e3.startTime) : null, o = computed(() => nl(e3.multiCalendars)), i3 = computed(() => n()), c3 = computed(() => tl(e3.ariaLabels)), p = computed(() => ol(e3.filters)), T3 = computed(() => rl(e3.transitions)), D3 = computed(() => sl(e3.actionRow)), R3 = computed(
    () => al(e3.previewFormat, e3.format, r())
  ), P = computed(() => ll(e3.textInput)), M3 = computed(() => il(e3.inline)), C = computed(() => ul(e3.config)), A = computed(
    () => dl(e3.highlight, e3.highlightWeekDays, e3.highlightDisabledDays)
  ), q3 = computed(() => cl(e3.weekNumbers));
  return {
    defaultedTransitions: T3,
    defaultedMultiCalendars: o,
    defaultedStartTime: i3,
    defaultedAriaLabels: c3,
    defaultedFilters: p,
    defaultedActionRow: D3,
    defaultedPreviewFormat: R3,
    defaultedTextInput: P,
    defaultedInline: M3,
    defaultedConfig: C,
    defaultedHighlight: A,
    defaultedWeekNumbers: q3,
    getDefaultPattern: r,
    getDefaultStartTime: n
  };
};
var fl = (e3, t3, r) => {
  const a3 = ref(), { defaultedTextInput: n, getDefaultPattern: o } = Pe(t3), i3 = ref(""), c3 = toRef(t3, "format");
  watch(a3, () => {
    e3("internal-model-change", a3.value);
  }), watch(c3, () => {
    ne();
  });
  const p = (s3) => Na(s3, t3.timezone), T3 = (s3) => et(s3, t3.timezone), D3 = (s3, J, de = false) => Fa(
    s3,
    t3.format,
    t3.formatLocale,
    n.value.rangeSeparator,
    t3.modelAuto,
    J ?? o(),
    de
  ), R3 = (s3) => s3 ? t3.modelType ? d3(s3) : {
    hours: getHours(s3),
    minutes: getMinutes(s3),
    seconds: t3.enableSeconds ? getSeconds(s3) : 0
  } : null, P = (s3) => t3.modelType ? d3(s3) : { month: getMonth(s3), year: getYear(s3) }, M3 = (s3) => Array.isArray(s3) ? t3.multiDates ? s3.map((J) => C(J, setYear(B2(), J))) : qt(
    () => [
      setYear(B2(), s3[0]),
      s3[1] ? setYear(B2(), s3[1]) : Tt(t3.partialRange)
    ],
    t3.range
  ) : setYear(B2(), +s3), C = (s3, J) => (typeof s3 == "string" || typeof s3 == "number") && t3.modelType ? O3(s3) : J, A = (s3) => Array.isArray(s3) ? [
    C(
      s3[0],
      vt(null, +s3[0].hours, +s3[0].minutes, s3[0].seconds)
    ),
    C(
      s3[1],
      vt(null, +s3[1].hours, +s3[1].minutes, s3[1].seconds)
    )
  ] : C(s3, vt(null, s3.hours, s3.minutes, s3.seconds)), q3 = (s3) => Array.isArray(s3) ? t3.multiDates ? s3.map((J) => C(J, ot(null, +J.month, +J.year))) : qt(
    () => [
      C(s3[0], ot(null, +s3[0].month, +s3[0].year)),
      C(
        s3[1],
        s3[1] ? ot(null, +s3[1].month, +s3[1].year) : Tt(t3.partialRange)
      )
    ],
    t3.range
  ) : C(s3, ot(null, +s3.month, +s3.year)), g = (s3) => {
    if (Array.isArray(s3))
      return s3.map((J) => O3(J));
    throw new Error(tn.dateArr("multi-dates"));
  }, S3 = (s3) => {
    if (Array.isArray(s3))
      return [B2(s3[0]), B2(s3[1])];
    throw new Error(tn.dateArr("week-picker"));
  }, F = (s3) => t3.modelAuto ? Array.isArray(s3) ? [O3(s3[0]), O3(s3[1])] : t3.autoApply ? [O3(s3)] : [O3(s3), null] : Array.isArray(s3) ? qt(
    () => [
      O3(s3[0]),
      s3[1] ? O3(s3[1]) : Tt(t3.partialRange)
    ],
    t3.range
  ) : O3(s3), b3 = () => {
    Array.isArray(a3.value) && t3.range && a3.value.length === 1 && a3.value.push(Tt(t3.partialRange));
  }, _ = () => {
    const s3 = a3.value;
    return [
      d3(s3[0]),
      s3[1] ? d3(s3[1]) : Tt(t3.partialRange)
    ];
  }, X3 = () => a3.value[1] ? _() : d3(Ce(a3.value[0])), ae = () => (a3.value || []).map((s3) => d3(s3)), V3 = () => (b3(), t3.modelAuto ? X3() : t3.multiDates ? ae() : Array.isArray(a3.value) ? qt(() => _(), t3.range) : d3(Ce(a3.value))), ie2 = (s3) => !s3 || Array.isArray(s3) && !s3.length ? null : t3.timePicker ? A(Ce(s3)) : t3.monthPicker ? q3(Ce(s3)) : t3.yearPicker ? M3(Ce(s3)) : t3.multiDates ? g(Ce(s3)) : t3.weekPicker ? S3(Ce(s3)) : F(Ce(s3)), E3 = (s3) => {
    const J = ie2(s3);
    On(Ce(J)) ? (a3.value = Ce(J), ne()) : (a3.value = null, i3.value = "");
  }, f = () => {
    const s3 = (J) => format(J, n.value.format);
    return `${s3(a3.value[0])} ${n.value.rangeSeparator} ${a3.value[1] ? s3(a3.value[1]) : ""}`;
  }, w3 = () => r.value && a3.value ? Array.isArray(a3.value) ? f() : format(a3.value, n.value.format) : D3(a3.value), L3 = () => a3.value ? t3.multiDates ? a3.value.map((s3) => D3(s3)).join("; ") : n.value.enabled && typeof n.value.format == "string" ? w3() : D3(a3.value) : "", ne = () => {
    !t3.format || typeof t3.format == "string" || n.value.enabled && typeof n.value.format == "string" ? i3.value = L3() : i3.value = t3.format(a3.value);
  }, O3 = (s3) => {
    if (t3.utc) {
      const J = new Date(s3);
      return t3.utc === "preserve" ? new Date(J.getTime() + J.getTimezoneOffset() * 6e4) : J;
    }
    return t3.modelType ? t3.modelType === "date" || t3.modelType === "timestamp" ? T3(new Date(s3)) : t3.modelType === "format" && (typeof t3.format == "string" || !t3.format) ? parse(s3, o(), /* @__PURE__ */ new Date()) : T3(parse(s3, t3.modelType, /* @__PURE__ */ new Date())) : T3(new Date(s3));
  }, d3 = (s3) => s3 ? t3.utc ? qr(s3, t3.utc === "preserve", t3.enableSeconds) : t3.modelType ? t3.modelType === "timestamp" ? +p(s3) : t3.modelType === "format" && (typeof t3.format == "string" || !t3.format) ? D3(p(s3)) : D3(p(s3), t3.modelType, true) : p(s3) : "", Y3 = (s3, J = false) => {
    if (e3("update:model-value", s3), t3.emitTimezone && J) {
      const de = Array.isArray(s3) ? s3.map(($) => et(Ce($)), t3.emitTimezone) : et(Ce(s3), t3.emitTimezone);
      e3("update:model-timezone-value", de);
    }
  }, Z = (s3) => Array.isArray(a3.value) ? t3.multiDates ? a3.value.map((J) => s3(J)) : [
    s3(a3.value[0]),
    a3.value[1] ? s3(a3.value[1]) : Tt(t3.partialRange)
  ] : s3(Ce(a3.value)), y3 = (s3) => Y3(Ce(Z(s3)));
  return {
    inputValue: i3,
    internalModelValue: a3,
    checkBeforeEmit: () => a3.value ? t3.range ? t3.partialRange ? a3.value.length >= 1 : a3.value.length === 2 : !!a3.value : false,
    parseExternalModelValue: E3,
    formatInputValue: ne,
    emitModelValue: () => (ne(), t3.monthPicker ? y3(P) : t3.timePicker ? y3(R3) : t3.yearPicker ? y3(getYear) : t3.weekPicker ? Y3(
      a3.value.map((s3) => d3(s3)),
      true
    ) : Y3(V3(), true))
  };
};
var vl = (e3, t3) => {
  const { defaultedFilters: r } = Pe(e3), { validateMonthYearInRange: a3 } = $t(e3), n = (T3, D3) => {
    let R3 = T3;
    return r.value.months.includes(getMonth(R3)) ? (R3 = D3 ? addMonths(T3, 1) : subMonths(T3, 1), n(R3, D3)) : R3;
  }, o = (T3, D3) => {
    let R3 = T3;
    return r.value.years.includes(getYear(R3)) ? (R3 = D3 ? addYears(T3, 1) : subYears(T3, 1), o(R3, D3)) : R3;
  }, i3 = (T3, D3 = false) => {
    const R3 = set(/* @__PURE__ */ new Date(), { month: e3.month, year: e3.year });
    let P = T3 ? addMonths(R3, 1) : subMonths(R3, 1);
    e3.disableYearSelect && (P = setYear(P, e3.year));
    let M3 = getMonth(P), C = getYear(P);
    r.value.months.includes(M3) && (P = n(P, T3), M3 = getMonth(P), C = getYear(P)), r.value.years.includes(C) && (P = o(P, T3), C = getYear(P)), a3(M3, C, T3, e3.preventMinMaxNavigation) && c3(M3, C, D3);
  }, c3 = (T3, D3, R3) => {
    t3("update-month-year", { month: T3, year: D3, fromNav: R3 });
  }, p = computed(() => (T3) => Ea(
    set(/* @__PURE__ */ new Date(), { month: e3.month, year: e3.year }),
    e3.maxDate,
    e3.minDate,
    e3.preventMinMaxNavigation,
    T3
  ));
  return { handleMonthYearChange: i3, isDisabled: p, updateMonthYear: c3 };
};
var At = ((e3) => (e3.center = "center", e3.left = "left", e3.right = "right", e3))(At || {});
var Qe = ((e3) => (e3.month = "month", e3.year = "year", e3))(Qe || {});
var pt = ((e3) => (e3.top = "top", e3.bottom = "bottom", e3))(pt || {});
var Dt = ((e3) => (e3.header = "header", e3.calendar = "calendar", e3.timePicker = "timePicker", e3))(Dt || {});
var at = ((e3) => (e3.month = "month", e3.year = "year", e3.calendar = "calendar", e3.time = "time", e3.minutes = "minutes", e3.hours = "hours", e3.seconds = "seconds", e3))(at || {});
var ml = ({
  menuRef: e3,
  menuRefInner: t3,
  inputRef: r,
  pickerWrapperRef: a3,
  inline: n,
  emit: o,
  props: i3,
  slots: c3
}) => {
  const p = ref({}), T3 = ref(false), D3 = ref({
    top: "0",
    left: "0"
  }), R3 = ref(false), P = toRef(i3, "teleportCenter");
  watch(P, () => {
    D3.value = JSON.parse(JSON.stringify({})), b3();
  });
  const M3 = (d3) => {
    if (i3.teleport) {
      const Y3 = d3.getBoundingClientRect();
      return {
        left: Y3.left + window.scrollX,
        top: Y3.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, C = (d3, Y3) => {
    D3.value.left = `${d3 + Y3 - p.value.width}px`;
  }, A = (d3) => {
    D3.value.left = `${d3}px`;
  }, q3 = (d3, Y3) => {
    i3.position === At.left && A(d3), i3.position === At.right && C(d3, Y3), i3.position === At.center && (D3.value.left = `${d3 + Y3 / 2 - p.value.width / 2}px`);
  }, g = (d3) => {
    const { width: Y3, height: Z } = d3.getBoundingClientRect(), { top: y3, left: l } = i3.altPosition ? i3.altPosition(d3) : M3(d3);
    return { top: +y3, left: +l, width: Y3, height: Z };
  }, S3 = () => {
    D3.value.left = "50%", D3.value.top = "50%", D3.value.transform = "translate(-50%, -50%)", D3.value.position = "fixed", delete D3.value.opacity;
  }, F = () => {
    const d3 = Re(r), { top: Y3, left: Z, transform: y3 } = i3.altPosition(d3);
    D3.value = { top: `${Y3}px`, left: `${Z}px`, transform: y3 ?? "" };
  }, b3 = (d3 = true) => {
    var Y3;
    if (!n.value.enabled) {
      if (P.value)
        return S3();
      if (i3.altPosition !== null)
        return F();
      if (d3) {
        const Z = i3.teleport ? (Y3 = t3.value) == null ? void 0 : Y3.$el : e3.value;
        Z && (p.value = Z.getBoundingClientRect()), o("recalculate-position");
      }
      return f();
    }
  }, _ = ({ inputEl: d3, left: Y3, width: Z }) => {
    window.screen.width > 768 && !T3.value && q3(Y3, Z), V3(d3);
  }, X3 = (d3) => {
    const { top: Y3, left: Z, height: y3, width: l } = g(d3);
    D3.value.top = `${y3 + Y3 + +i3.offset}px`, R3.value = false, T3.value || (D3.value.left = `${Z + l / 2 - p.value.width / 2}px`), _({ inputEl: d3, left: Z, width: l });
  }, ae = (d3) => {
    const { top: Y3, left: Z, width: y3 } = g(d3);
    D3.value.top = `${Y3 - +i3.offset - p.value.height}px`, R3.value = true, _({ inputEl: d3, left: Z, width: y3 });
  }, V3 = (d3) => {
    if (i3.autoPosition) {
      const { left: Y3, width: Z } = g(d3), { left: y3, right: l } = p.value;
      if (!T3.value) {
        if (Math.abs(y3) !== Math.abs(l)) {
          if (y3 <= 0)
            return T3.value = true, A(Y3);
          if (l >= document.documentElement.clientWidth)
            return T3.value = true, C(Y3, Z);
        }
        return q3(Y3, Z);
      }
    }
  }, ie2 = () => {
    const d3 = Re(r);
    if (d3) {
      const { height: Y3 } = p.value, { top: Z, height: y3 } = d3.getBoundingClientRect(), h5 = window.innerHeight - Z - y3, s3 = Z;
      return Y3 <= h5 ? pt.bottom : Y3 > h5 && Y3 <= s3 ? pt.top : h5 >= s3 ? pt.bottom : pt.top;
    }
    return pt.bottom;
  }, E3 = (d3) => ie2() === pt.bottom ? X3(d3) : ae(d3), f = () => {
    const d3 = Re(r);
    if (d3)
      return i3.autoPosition ? E3(d3) : X3(d3);
  }, w3 = function(d3) {
    if (d3) {
      const Y3 = d3.scrollHeight > d3.clientHeight, y3 = window.getComputedStyle(d3).overflowY.indexOf("hidden") !== -1;
      return Y3 && !y3;
    }
    return true;
  }, L3 = function(d3) {
    return !d3 || d3 === document.body || d3.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : w3(d3) ? d3 : L3(d3.parentNode);
  }, ne = (d3) => {
    if (d3)
      switch (i3.position) {
        case At.left:
          return { left: 0, transform: "translateX(0)" };
        case At.right:
          return { left: `${d3.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${d3.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: R3,
    menuStyle: D3,
    xCorrect: T3,
    setMenuPosition: b3,
    getScrollableParent: L3,
    shadowRender: (d3, Y3) => {
      var J, de, $;
      const Z = document.createElement("div"), y3 = (J = Re(r)) == null ? void 0 : J.getBoundingClientRect();
      Z.setAttribute("id", "dp--temp-container");
      const l = (de = a3.value) != null && de.clientWidth ? a3.value : document.body;
      l.append(Z);
      const h5 = ne(y3), s3 = h(
        d3,
        {
          ...Y3,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...h5 }
        },
        Object.fromEntries(
          Object.keys(c3).filter((u3) => ["right-sidebar", "left-sidebar"].includes(u3)).map((u3) => [u3, c3[u3]])
        )
      );
      render(s3, Z), p.value = ($ = s3.el) == null ? void 0 : $.getBoundingClientRect(), render(null, Z), l.removeChild(Z);
    }
  };
};
var ut = [
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
  { name: "quarter", use: ["shared"] }
];
var gl = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var yl = {
  all: () => ut,
  monthYear: () => ut.filter((e3) => e3.use.includes("month-year")),
  input: () => gl,
  timePicker: () => ut.filter((e3) => e3.use.includes("time")),
  action: () => ut.filter((e3) => e3.use.includes("action")),
  calendar: () => ut.filter((e3) => e3.use.includes("calendar")),
  menu: () => ut.filter((e3) => e3.use.includes("menu")),
  shared: () => ut.filter((e3) => e3.use.includes("shared")),
  yearMode: () => ut.filter((e3) => e3.use.includes("year-mode"))
};
var qe = (e3, t3, r) => {
  const a3 = [];
  return yl[t3]().forEach((n) => {
    e3[n.name] && a3.push(n.name);
  }), r != null && r.length && r.forEach((n) => {
    n.slot && a3.push(n.slot);
  }), a3;
};
var Lt = (e3) => {
  const t3 = computed(() => (a3) => e3.value ? a3 ? e3.value.open : e3.value.close : ""), r = computed(() => (a3) => e3.value ? a3 ? e3.value.menuAppearTop : e3.value.menuAppearBottom : "");
  return { transitionName: t3, showTransition: !!e3.value, menuTransition: r };
};
var Ut = (e3, t3) => {
  const r = B2(et(/* @__PURE__ */ new Date(), e3.timezone)), a3 = ref([{ month: getMonth(r), year: getYear(r) }]), n = reactive({
    hours: e3.range ? [getHours(r), getHours(r)] : getHours(r),
    minutes: e3.range ? [getMinutes(r), getMinutes(r)] : getMinutes(r),
    seconds: e3.range ? [0, 0] : 0
  }), o = computed({
    get: () => e3.internalModelValue,
    set: (p) => {
      !e3.readonly && !e3.disabled && t3("update:internal-model-value", p);
    }
  }), i3 = computed(
    () => (p) => a3.value[p] ? a3.value[p].month : 0
  ), c3 = computed(
    () => (p) => a3.value[p] ? a3.value[p].year : 0
  );
  return {
    calendars: a3,
    time: n,
    modelValue: o,
    month: i3,
    year: c3
  };
};
var hl = (e3, t3) => {
  const { defaultedMultiCalendars: r, defaultedHighlight: a3 } = Pe(t3), { isDisabled: n, matchDate: o } = $t(t3), i3 = ref(null), c3 = ref(B2(et(/* @__PURE__ */ new Date(), t3.timezone))), p = (l) => {
    !l.current && t3.hideOffsetDates || (i3.value = l.value);
  }, T3 = () => {
    i3.value = null;
  }, D3 = (l) => Array.isArray(e3.value) && t3.range && e3.value[0] && i3.value ? l ? Ee(i3.value, e3.value[0]) : Ye(i3.value, e3.value[0]) : true, R3 = (l, h5) => {
    const s3 = () => e3.value ? h5 ? e3.value[0] || null : e3.value[1] : null, J = e3.value && Array.isArray(e3.value) ? s3() : null;
    return ke(B2(l.value), J);
  }, P = (l) => {
    const h5 = Array.isArray(e3.value) ? e3.value[0] : null;
    return l ? !Ye(i3.value ?? null, h5) : true;
  }, M3 = (l, h5 = true) => (t3.range || t3.weekPicker) && Array.isArray(e3.value) && e3.value.length === 2 ? t3.hideOffsetDates && !l.current ? false : ke(B2(l.value), e3.value[h5 ? 0 : 1]) : t3.range ? R3(l, h5) && P(h5) || ke(l.value, Array.isArray(e3.value) ? e3.value[0] : null) && D3(h5) : false, C = (l, h5, s3) => Array.isArray(e3.value) && e3.value[0] && e3.value.length === 1 ? l ? false : s3 ? Ee(e3.value[0], h5.value) : Ye(e3.value[0], h5.value) : false, A = (l) => !e3.value || t3.hideOffsetDates && !l.current ? false : t3.range ? t3.modelAuto && Array.isArray(e3.value) ? ke(l.value, e3.value[0] ? e3.value[0] : c3.value) : false : t3.multiDates && Array.isArray(e3.value) ? e3.value.some((h5) => ke(h5, l.value)) : ke(l.value, e3.value ? e3.value : c3.value), q3 = (l) => {
    if (t3.autoRange || t3.weekPicker) {
      if (i3.value) {
        if (t3.hideOffsetDates && !l.current)
          return false;
        const h5 = addDays(i3.value, +t3.autoRange), s3 = xt(B2(i3.value), t3.timezone, t3.weekStart);
        return t3.weekPicker ? ke(s3[1], B2(l.value)) : ke(h5, B2(l.value));
      }
      return false;
    }
    return false;
  }, g = (l) => {
    if (t3.autoRange || t3.weekPicker) {
      if (i3.value) {
        const h5 = addDays(i3.value, +t3.autoRange);
        if (t3.hideOffsetDates && !l.current)
          return false;
        const s3 = xt(B2(i3.value), t3.timezone, t3.weekStart);
        return t3.weekPicker ? Ee(l.value, s3[0]) && Ye(l.value, s3[1]) : Ee(l.value, i3.value) && Ye(l.value, h5);
      }
      return false;
    }
    return false;
  }, S3 = (l) => {
    if (t3.autoRange || t3.weekPicker) {
      if (i3.value) {
        if (t3.hideOffsetDates && !l.current)
          return false;
        const h5 = xt(B2(i3.value), t3.timezone, t3.weekStart);
        return t3.weekPicker ? ke(h5[0], l.value) : ke(i3.value, l.value);
      }
      return false;
    }
    return false;
  }, F = (l) => nn(e3.value, i3.value, l.value), b3 = () => t3.modelAuto && Array.isArray(t3.internalModelValue) ? !!t3.internalModelValue[0] : false, _ = () => t3.modelAuto ? Ra(t3.internalModelValue) : true, X3 = (l) => {
    if (Array.isArray(e3.value) && e3.value.length || t3.weekPicker)
      return false;
    const h5 = t3.range ? !M3(l) && !M3(l, false) : true;
    return !n(l.value) && !A(l) && !(!l.current && t3.hideOffsetDates) && h5;
  }, ae = (l) => t3.range ? t3.modelAuto ? b3() && A(l) : false : A(l), V3 = (l) => {
    var h5;
    return a3.value ? typeof a3.value == "function" ? a3.value(l.value) : o(
      l.value,
      (h5 = t3.arrMapValues) != null && h5.highlightedDates ? t3.arrMapValues.highlightedDates : a3.value.dates
    ) : false;
  }, ie2 = (l) => {
    const h5 = n(l.value);
    return h5 && (typeof a3.value == "function" ? !a3.value(l.value, h5) : !a3.value.options.highlightDisabled);
  }, E3 = (l) => {
    var h5;
    return typeof a3.value == "function" ? a3.value(l.value) : (h5 = a3.value.weekdays) == null ? void 0 : h5.includes(l.value.getDay());
  }, f = (l) => (t3.range || t3.weekPicker) && (!(r.value.count > 0) || l.current) && _() && !(!l.current && t3.hideOffsetDates) && !A(l) ? F(l) : false, w3 = (l) => {
    const { isRangeStart: h5, isRangeEnd: s3 } = O3(l), J = t3.range ? h5 || s3 : false;
    return {
      dp__cell_offset: !l.current,
      dp__pointer: !t3.disabled && !(!l.current && t3.hideOffsetDates) && !n(l.value),
      dp__cell_disabled: n(l.value),
      dp__cell_highlight: !ie2(l) && (V3(l) || E3(l)) && !ae(l) && !J && !S3(l) && !(f(l) && t3.weekPicker) && !s3,
      dp__cell_highlight_active: !ie2(l) && (V3(l) || E3(l)) && ae(l),
      dp__today: !t3.noToday && ke(l.value, c3.value) && l.current
    };
  }, L3 = (l) => ({
    dp__active_date: ae(l),
    dp__date_hover: X3(l)
  }), ne = (l) => ({
    ...d3(l),
    ...Y3(l),
    dp__range_between_week: f(l) && t3.weekPicker
  }), O3 = (l) => {
    const h5 = r.value.count > 0 ? l.current && M3(l) && _() : M3(l) && _(), s3 = r.value.count > 0 ? l.current && M3(l, false) && _() : M3(l, false) && _();
    return { isRangeStart: h5, isRangeEnd: s3 };
  }, d3 = (l) => {
    const { isRangeStart: h5, isRangeEnd: s3 } = O3(l);
    return {
      dp__range_start: h5,
      dp__range_end: s3,
      dp__range_between: f(l) && !t3.weekPicker,
      dp__date_hover_start: C(X3(l), l, true),
      dp__date_hover_end: C(X3(l), l, false)
    };
  }, Y3 = (l) => ({
    ...d3(l),
    dp__cell_auto_range: g(l),
    dp__cell_auto_range_start: S3(l),
    dp__cell_auto_range_end: q3(l)
  }), Z = (l) => t3.range ? t3.autoRange ? Y3(l) : t3.modelAuto ? { ...L3(l), ...d3(l) } : d3(l) : t3.weekPicker ? ne(l) : L3(l);
  return {
    setHoverDate: p,
    clearHoverDate: T3,
    getDayClassData: (l) => t3.hideOffsetDates && !l.current ? {} : {
      ...w3(l),
      ...Z(l),
      [t3.dayClass ? t3.dayClass(l.value) : ""]: true,
      [t3.calendarCellClassName]: !!t3.calendarCellClassName
    }
  };
};
var $t = (e3) => {
  const { defaultedFilters: t3, defaultedHighlight: r } = Pe(e3), a3 = () => {
    if (e3.timezone)
      return e3.timezone;
    if (e3.utc)
      return "UTC";
  }, n = (f) => {
    const w3 = Fe(o(B2(f))).toISOString(), [L3] = w3.split("T");
    return L3;
  }, o = (f) => e3.utc === "preserve" ? Na(f, a3()) : et(f, a3()), i3 = (f) => {
    var h5;
    const w3 = e3.maxDate ? Ee(f, o(B2(e3.maxDate))) : false, L3 = e3.minDate ? Ye(f, o(B2(e3.minDate))) : false, ne = D3(
      o(f),
      (h5 = e3.arrMapValues) != null && h5.disabledDates ? e3.arrMapValues.disabledDates : e3.disabledDates
    ), d3 = t3.value.months.map((s3) => +s3).includes(getMonth(f)), Y3 = e3.disabledWeekDays.length ? e3.disabledWeekDays.some((s3) => +s3 === getDay(f)) : false, Z = P(f), y3 = getYear(f), l = y3 < +e3.yearRange[0] || y3 > +e3.yearRange[1];
    return !(w3 || L3 || ne || d3 || l || Y3 || Z);
  }, c3 = (f, w3) => Ye(...dt(e3.minDate, f, w3)) || ke(...dt(e3.minDate, f, w3)), p = (f, w3) => Ee(...dt(e3.maxDate, f, w3)) || ke(...dt(e3.maxDate, f, w3)), T3 = (f, w3, L3) => {
    let ne = false;
    return e3.maxDate && L3 && p(f, w3) && (ne = true), e3.minDate && !L3 && c3(f, w3) && (ne = true), ne;
  }, D3 = (f, w3) => f ? w3 instanceof Map ? !!w3.get(n(f)) : Array.isArray(w3) ? w3.some((L3) => ke(o(B2(L3)), f)) : w3 ? w3(B2(JSON.parse(JSON.stringify(f)))) : false : true, R3 = (f, w3, L3, ne) => {
    let O3 = false;
    return ne ? e3.minDate && e3.maxDate ? O3 = T3(f, w3, L3) : (e3.minDate && c3(f, w3) || e3.maxDate && p(f, w3)) && (O3 = true) : O3 = true, O3;
  }, P = (f) => {
    var w3, L3, ne, O3, d3;
    return Array.isArray(e3.allowedDates) && !((w3 = e3.allowedDates) != null && w3.length) ? true : (L3 = e3.arrMapValues) != null && L3.allowedDates ? !D3(f, (ne = e3.arrMapValues) == null ? void 0 : ne.allowedDates) : (O3 = e3.allowedDates) != null && O3.length ? !((d3 = e3.allowedDates) != null && d3.some(
      (Y3) => ke(Fe(Y3), o(Fe(f)))
    )) : false;
  }, M3 = (f) => !i3(f), C = (f) => e3.noDisabledRange ? !eachDayOfInterval({ start: f[0], end: f[1] }).some((L3) => M3(L3)) : true, A = (f, w3, L3 = 0) => {
    if (Array.isArray(w3) && w3[L3]) {
      const ne = differenceInCalendarDays(f, w3[L3]), O3 = Ia(w3[L3], f), d3 = O3.length === 1 ? 0 : O3.filter((Z) => M3(Z)).length, Y3 = Math.abs(ne) - d3;
      if (e3.minRange && e3.maxRange)
        return Y3 >= +e3.minRange && Y3 <= +e3.maxRange;
      if (e3.minRange)
        return Y3 >= +e3.minRange;
      if (e3.maxRange)
        return Y3 <= +e3.maxRange;
    }
    return true;
  }, q3 = (f) => new Map(f.map((w3) => [n(w3), true])), g = (f) => Array.isArray(f) && f.length > 0, S3 = () => {
    const f = {
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    };
    return g(e3.allowedDates) && (f.allowedDates = q3(e3.allowedDates)), typeof r.value != "function" && g(r.value.dates) && (f.highlightedDates = q3(r.value.dates)), g(e3.disabledDates) && (f.disabledDates = q3(e3.disabledDates)), f;
  }, F = () => !e3.enableTimePicker || e3.monthPicker || e3.yearPicker || e3.ignoreTimeValidation, b3 = (f) => Array.isArray(f) ? [f[0] ? bn(f[0]) : null, f[1] ? bn(f[1]) : null] : bn(f), _ = (f, w3, L3) => f.find(
    (ne) => +ne.hours === getHours(w3) && ne.minutes === "*" ? true : +ne.minutes === getMinutes(w3) && +ne.hours === getHours(w3)
  ) && L3, X3 = (f, w3, L3) => {
    const [ne, O3] = f, [d3, Y3] = w3;
    return !_(ne, d3, L3) && !_(O3, Y3, L3) && L3;
  }, ae = (f, w3) => {
    const L3 = Array.isArray(w3) ? w3 : [w3];
    return Array.isArray(e3.disabledTimes) ? Array.isArray(e3.disabledTimes[0]) ? X3(e3.disabledTimes, L3, f) : !L3.some((ne) => _(e3.disabledTimes, ne, f)) : f;
  }, V3 = (f, w3) => {
    const L3 = Array.isArray(w3) ? [wt(w3[0]), w3[1] ? wt(w3[1]) : void 0] : wt(w3), ne = !e3.disabledTimes(L3);
    return f && ne;
  }, ie2 = (f, w3) => e3.disabledTimes ? Array.isArray(e3.disabledTimes) ? ae(w3, f) : V3(w3, f) : w3;
  return {
    isDisabled: M3,
    validateDate: i3,
    validateMonthYearInRange: R3,
    isDateRangeAllowed: C,
    checkMinMaxRange: A,
    matchDate: D3,
    mapDatesArrToMap: S3,
    isValidTime: (f) => {
      let w3 = true;
      if (!f || F())
        return true;
      const L3 = !e3.minDate && !e3.maxDate ? b3(f) : f;
      return (e3.maxTime || e3.maxDate) && (w3 = ma(
        e3.maxTime,
        e3.maxDate,
        "max",
        Ce(L3),
        w3
      )), (e3.minTime || e3.minDate) && (w3 = ma(
        e3.minTime,
        e3.minDate,
        "min",
        Ce(L3),
        w3
      )), ie2(f, w3);
    }
  };
};
var an = () => {
  const e3 = computed(() => (a3, n) => a3 == null ? void 0 : a3.includes(n)), t3 = computed(() => (a3, n) => a3.count ? a3.solo ? true : n === 0 : true), r = computed(() => (a3, n) => a3.count ? a3.solo ? true : n === a3.count - 1 : true);
  return { hideNavigationButtons: e3, showLeftIcon: t3, showRightIcon: r };
};
var pl = (e3, t3, r) => {
  const a3 = ref(0), n = reactive({
    [Dt.timePicker]: !e3.enableTimePicker || e3.timePicker || e3.monthPicker,
    [Dt.calendar]: false,
    [Dt.header]: false
  }), o = computed(() => e3.monthPicker), i3 = (R3) => {
    var P;
    if ((P = e3.flow) != null && P.length) {
      if (!R3 && o.value)
        return D3();
      n[R3] = true, Object.keys(n).filter((M3) => !n[M3]).length || D3();
    }
  }, c3 = () => {
    var R3;
    (R3 = e3.flow) != null && R3.length && a3.value !== -1 && (a3.value += 1, t3("flow-step", a3.value), D3());
  }, p = () => {
    a3.value = -1;
  }, T3 = (R3, P, ...M3) => {
    e3.flow[a3.value] === R3 && r.value && r.value[P](...M3);
  }, D3 = () => {
    T3(at.month, "toggleMonthPicker", true), T3(at.year, "toggleYearPicker", true), T3(at.calendar, "toggleTimePicker", false, true), T3(at.time, "toggleTimePicker", true, true);
    const R3 = e3.flow[a3.value];
    (R3 === at.hours || R3 === at.minutes || R3 === at.seconds) && T3(R3, "toggleTimePicker", true, true, R3);
  };
  return { childMount: i3, updateFlowStep: c3, resetFlow: p, flowStep: a3 };
};
var rn = {
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
    type: [Array, Function, Object],
    default: null
  },
  highlightWeekDays: {
    type: Array,
    default: null
  },
  highlightDisabledDays: { type: Boolean, default: false },
  teleport: { type: [String, Boolean, Object], default: null },
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
  yearFirst: { type: Boolean, default: false }
};
var tt = {
  ...rn,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  arrMapValues: { type: Object, default: () => ({}) },
  noOverlayFocus: { type: Boolean, default: false }
};
var bl = {
  key: 1,
  class: "dp__input_wrap"
};
var kl = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var wl = {
  key: 2,
  class: "dp__clear_icon"
};
var Dl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...rn
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
  setup(e3, { expose: t3, emit: r }) {
    const a3 = r, n = e3, {
      defaultedTextInput: o,
      defaultedAriaLabels: i3,
      defaultedInline: c3,
      defaultedConfig: p,
      getDefaultPattern: T3,
      getDefaultStartTime: D3
    } = Pe(n), { checkMinMaxRange: R3 } = $t(n), P = ref(), M3 = ref(null), C = ref(false), A = ref(false), q3 = computed(
      () => ({
        dp__pointer: !n.disabled && !n.readonly && !o.value.enabled,
        dp__disabled: n.disabled,
        dp__input_readonly: !o.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !n.hideInputIcon,
        dp__input_valid: !!n.state,
        dp__input_invalid: n.state === false,
        dp__input_focus: C.value || n.isMenuOpen,
        dp__input_reg: !o.value.enabled,
        [n.inputClassName]: !!n.inputClassName
      })
    ), g = () => {
      a3("set-input-date", null), n.autoApply && (a3("set-empty-date"), P.value = null);
    }, S3 = (d3) => {
      const Y3 = D3();
      return Gr(
        d3,
        o.value.format ?? T3(),
        Y3 ?? Ba({}, n.enableSeconds),
        n.inputValue,
        A.value
      );
    }, F = (d3) => {
      const { rangeSeparator: Y3 } = o.value, [Z, y3] = d3.split(`${Y3}`);
      if (Z) {
        const l = S3(Z.trim()), h5 = y3 ? S3(y3.trim()) : null, s3 = l && h5 ? [l, h5] : [l];
        R3(h5, s3, 0) && (P.value = l ? s3 : null);
      }
    }, b3 = () => {
      A.value = true;
    }, _ = (d3) => {
      if (n.range)
        F(d3);
      else if (n.multiDates) {
        const Y3 = d3.split(";");
        P.value = Y3.map((Z) => S3(Z.trim())).filter((Z) => Z);
      } else
        P.value = S3(d3);
    }, X3 = (d3) => {
      var Z;
      const Y3 = typeof d3 == "string" ? d3 : (Z = d3.target) == null ? void 0 : Z.value;
      Y3 !== "" ? (o.value.openMenu && !n.isMenuOpen && a3("open"), _(Y3), a3("set-input-date", P.value)) : g(), A.value = false, a3("update:input-value", Y3);
    }, ae = (d3) => {
      o.value.enabled ? (_(d3.target.value), o.value.enterSubmit && On(P.value) && n.inputValue !== "" ? (a3("set-input-date", P.value, true), P.value = null) : o.value.enterSubmit && n.inputValue === "" && (P.value = null, a3("clear"))) : E3(d3);
    }, V3 = (d3) => {
      o.value.enabled && o.value.tabSubmit && _(d3.target.value), o.value.tabSubmit && On(P.value) && n.inputValue !== "" ? (a3("set-input-date", P.value, true, true), P.value = null) : o.value.tabSubmit && n.inputValue === "" && (P.value = null, a3("clear", true));
    }, ie2 = () => {
      var d3;
      C.value = true, a3("focus"), o.value.enabled && o.value.selectOnFocus && ((d3 = M3.value) == null || d3.select());
    }, E3 = (d3) => {
      d3.preventDefault(), ft(d3, p.value, true), o.value.enabled && o.value.openMenu && !c3.value.input && !n.isMenuOpen ? a3("open") : o.value.enabled || a3("toggle");
    }, f = () => {
      a3("real-blur"), C.value = false, (!n.isMenuOpen || c3.value.enabled && c3.value.input) && a3("blur"), n.autoApply && o.value.enabled && P.value && !n.isMenuOpen && (a3("set-input-date", P.value), a3("select-date"), P.value = null);
    }, w3 = (d3) => {
      ft(d3, p.value, true), a3("clear");
    }, L3 = (d3) => {
      if (!o.value.enabled) {
        if (d3.code === "Tab")
          return;
        d3.preventDefault();
      }
    };
    return t3({
      focusInput: () => {
        var d3;
        (d3 = M3.value) == null || d3.focus({ preventScroll: true });
      },
      setParsedDate: (d3) => {
        P.value = d3;
      }
    }), (d3, Y3) => {
      var Z;
      return openBlock(), createElementBlock("div", { onClick: E3 }, [
        d3.$slots.trigger && !d3.$slots["dp-input"] && !unref(c3).enabled ? renderSlot(d3.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !d3.$slots.trigger && (!unref(c3).enabled || unref(c3).input) ? (openBlock(), createElementBlock("div", bl, [
          d3.$slots["dp-input"] && !d3.$slots.trigger && !unref(c3).enabled ? renderSlot(d3.$slots, "dp-input", {
            key: 0,
            value: e3.inputValue,
            isMenuOpen: e3.isMenuOpen,
            onInput: X3,
            onEnter: ae,
            onTab: V3,
            onClear: w3,
            onBlur: f,
            onKeypress: L3,
            onPaste: b3,
            openMenu: () => d3.$emit("open"),
            closeMenu: () => d3.$emit("close"),
            toggleMenu: () => d3.$emit("toggle")
          }) : createCommentVNode("", true),
          d3.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: d3.uid ? `dp-input-${d3.uid}` : void 0,
            ref_key: "inputRef",
            ref: M3,
            name: d3.name,
            class: normalizeClass(q3.value),
            inputmode: unref(o).enabled ? "text" : "none",
            placeholder: d3.placeholder,
            disabled: d3.disabled,
            readonly: d3.readonly,
            required: d3.required,
            value: e3.inputValue,
            autocomplete: d3.autocomplete,
            "aria-label": (Z = unref(i3)) == null ? void 0 : Z.input,
            "aria-disabled": d3.disabled || void 0,
            "aria-invalid": d3.state === false ? true : void 0,
            onInput: X3,
            onKeydown: [
              withKeys(ae, ["enter"]),
              withKeys(V3, ["tab"]),
              L3
            ],
            onBlur: f,
            onFocus: ie2,
            onKeypress: L3,
            onPaste: b3
          }, null, 42, kl)),
          createBaseVNode("div", {
            onClick: Y3[2] || (Y3[2] = (y3) => a3("toggle"))
          }, [
            d3.$slots["input-icon"] && !d3.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: Y3[0] || (Y3[0] = (y3) => a3("toggle"))
            }, [
              renderSlot(d3.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !d3.$slots["input-icon"] && !d3.hideInputIcon && !d3.$slots["dp-input"] ? (openBlock(), createBlock(unref(Ot), {
              key: 1,
              class: "dp__input_icon dp__input_icons",
              onClick: Y3[1] || (Y3[1] = (y3) => a3("toggle"))
            })) : createCommentVNode("", true)
          ]),
          d3.$slots["clear-icon"] && e3.inputValue && d3.clearable && !d3.disabled && !d3.readonly ? (openBlock(), createElementBlock("span", wl, [
            renderSlot(d3.$slots, "clear-icon", { clear: w3 })
          ])) : createCommentVNode("", true),
          d3.clearable && !d3.$slots["clear-icon"] && e3.inputValue && !d3.disabled && !d3.readonly ? (openBlock(), createBlock(unref(Aa), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            onClick: Y3[3] || (Y3[3] = withModifiers((y3) => w3(y3), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var Ml = ["title"];
var $l = { class: "dp__action_buttons" };
var Tl = ["disabled"];
var Al = defineComponent({
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
  setup(e3, { emit: t3 }) {
    const r = t3, a3 = e3, {
      defaultedActionRow: n,
      defaultedPreviewFormat: o,
      defaultedMultiCalendars: i3,
      defaultedTextInput: c3,
      defaultedInline: p,
      getDefaultPattern: T3
    } = Pe(a3), { isValidTime: D3 } = $t(a3), { buildMatrix: R3 } = yt(), P = ref(null), M3 = ref(null);
    onMounted(() => {
      a3.arrowNavigation && R3([Re(P), Re(M3)], "actionRow");
    });
    const C = computed(() => a3.range && !a3.partialRange && a3.internalModelValue ? a3.internalModelValue.length === 2 : true), A = computed(() => !q3.value || !g.value || !C.value), q3 = computed(() => !a3.enableTimePicker || a3.ignoreTimeValidation ? true : D3(a3.internalModelValue)), g = computed(() => a3.monthPicker ? a3.range && Array.isArray(a3.internalModelValue) ? !a3.internalModelValue.filter((f) => !V3(f)).length : V3(a3.internalModelValue) : true), S3 = () => {
      const E3 = o.value;
      return a3.timePicker || a3.monthPicker, E3(Ce(a3.internalModelValue));
    }, F = () => {
      const E3 = a3.internalModelValue;
      return i3.value.count > 0 ? `${b3(E3[0])} - ${b3(E3[1])}` : [b3(E3[0]), b3(E3[1])];
    }, b3 = (E3) => Fa(
      E3,
      o.value,
      a3.formatLocale,
      c3.value.rangeSeparator,
      a3.modelAuto,
      T3()
    ), _ = computed(() => !a3.internalModelValue || !a3.menuMount ? "" : typeof o.value == "string" ? Array.isArray(a3.internalModelValue) ? a3.internalModelValue.length === 2 && a3.internalModelValue[1] ? F() : a3.multiDates ? a3.internalModelValue.map((E3) => `${b3(E3)}`) : a3.modelAuto ? `${b3(a3.internalModelValue[0])}` : `${b3(a3.internalModelValue[0])} -` : b3(a3.internalModelValue) : S3()), X3 = () => a3.multiDates ? "; " : " - ", ae = computed(
      () => Array.isArray(_.value) ? _.value.join(X3()) : _.value
    ), V3 = (E3) => {
      if (!a3.monthPicker)
        return true;
      let f = true;
      const w3 = B2(Xe(E3));
      if (a3.minDate && a3.maxDate) {
        const L3 = B2(Xe(a3.minDate)), ne = B2(Xe(a3.maxDate));
        return Ee(w3, L3) && Ye(w3, ne) || ke(w3, L3) || ke(w3, ne);
      }
      if (a3.minDate) {
        const L3 = B2(Xe(a3.minDate));
        f = Ee(w3, L3) || ke(w3, L3);
      }
      if (a3.maxDate) {
        const L3 = B2(Xe(a3.maxDate));
        f = Ye(w3, L3) || ke(w3, L3);
      }
      return f;
    }, ie2 = () => {
      q3.value && g.value && C.value ? r("select-date") : r("invalid-select");
    };
    return (E3, f) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e3.calendarWidth ? { width: `${e3.calendarWidth}px` } : {})
    }, [
      E3.$slots["action-row"] ? renderSlot(E3.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: E3.internalModelValue,
        disabled: A.value,
        selectDate: () => E3.$emit("select-date"),
        closePicker: () => E3.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(n).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: ae.value
        }, [
          E3.$slots["action-preview"] ? renderSlot(E3.$slots, "action-preview", {
            key: 0,
            value: E3.internalModelValue
          }) : createCommentVNode("", true),
          E3.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(ae.value), 1)
          ], 64))
        ], 8, Ml)) : createCommentVNode("", true),
        createBaseVNode("div", $l, [
          E3.$slots["action-buttons"] ? renderSlot(E3.$slots, "action-buttons", {
            key: 0,
            value: E3.internalModelValue
          }) : createCommentVNode("", true),
          E3.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(p).enabled && unref(n).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: P,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: f[0] || (f[0] = (w3) => E3.$emit("close-picker")),
              onKeydown: [
                f[1] || (f[1] = withKeys((w3) => E3.$emit("close-picker"), ["enter"])),
                f[2] || (f[2] = withKeys((w3) => E3.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(E3.cancelText), 545)) : createCommentVNode("", true),
            unref(n).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              ref_key: "cancelButtonRef",
              ref: P,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: f[3] || (f[3] = (w3) => E3.$emit("select-now")),
              onKeydown: [
                f[4] || (f[4] = withKeys((w3) => E3.$emit("select-now"), ["enter"])),
                f[5] || (f[5] = withKeys((w3) => E3.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(E3.nowButtonLabel), 545)) : createCommentVNode("", true),
            unref(n).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: M3,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: A.value,
              onKeydown: [
                withKeys(ie2, ["enter"]),
                withKeys(ie2, ["space"])
              ],
              onClick: ie2
            }, toDisplayString(E3.selectText), 41, Tl)) : createCommentVNode("", true)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
});
var Sl = ["onKeydown"];
var Pl = { class: "dp__selection_grid_header" };
var Cl = ["aria-selected", "aria-disabled", "onClick", "onKeydown", "onMouseover"];
var _l = ["aria-label"];
var zt = defineComponent({
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
    focusValue: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e3, { expose: t3, emit: r }) {
    const { setSelectionGrid: a3, buildMultiLevelMatrix: n, setMonthPicker: o } = yt(), i3 = r, c3 = e3, { defaultedAriaLabels: p, defaultedTextInput: T3, defaultedConfig: D3 } = Pe(
      c3
    ), { hideNavigationButtons: R3 } = an(), P = ref(false), M3 = ref(null), C = ref(null), A = ref([]), q3 = ref(), g = ref(null), S3 = ref(0), F = ref(null);
    onBeforeUpdate(() => {
      M3.value = null;
    }), onMounted(() => {
      nextTick().then(() => f()), c3.noOverlayFocus || _(), b3(true);
    }), onUnmounted(() => b3(false));
    const b3 = (y3) => {
      var l;
      c3.arrowNavigation && ((l = c3.headerRefs) != null && l.length ? o(y3) : a3(y3));
    }, _ = () => {
      var l;
      const y3 = Re(C);
      y3 && (T3.value.enabled || (M3.value ? (l = M3.value) == null || l.focus({ preventScroll: true }) : y3.focus({ preventScroll: true })), P.value = y3.clientHeight < y3.scrollHeight);
    }, X3 = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !c3.useRelative,
        "dp--overlay-relative": c3.useRelative
      })
    ), ae = computed(
      () => c3.useRelative ? { height: `${c3.height}px`, width: "260px" } : void 0
    ), V3 = computed(() => ({
      dp__overlay_col: true
    })), ie2 = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: P.value,
        dp__button_bottom: c3.isLast
      })
    ), E3 = computed(() => {
      var y3, l;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((y3 = c3.items) == null ? void 0 : y3.length) <= 6,
        dp__container_block: ((l = c3.items) == null ? void 0 : l.length) > 6
      };
    });
    watch(
      () => c3.items,
      () => f(),
      { deep: true }
    );
    const f = () => {
      nextTick().then(() => {
        const y3 = Re(M3), l = Re(C), h5 = Re(g), s3 = Re(F), J = h5 ? h5.getBoundingClientRect().height : 0;
        l && (l.getBoundingClientRect().height ? S3.value = l.getBoundingClientRect().height - J : S3.value = D3.value.modeHeight - J), y3 && s3 && (s3.scrollTop = y3.offsetTop - s3.offsetTop - (S3.value / 2 - y3.getBoundingClientRect().height) - J);
      });
    }, w3 = (y3) => {
      y3.disabled || i3("selected", y3.value);
    }, L3 = () => {
      i3("toggle"), i3("reset-flow");
    }, ne = () => {
      c3.escClose && L3();
    }, O3 = (y3, l, h5, s3) => {
      y3 && ((l.active || l.value === c3.focusValue) && (M3.value = y3), c3.arrowNavigation && (Array.isArray(A.value[h5]) ? A.value[h5][s3] = y3 : A.value[h5] = [y3], d3()));
    }, d3 = () => {
      var l, h5;
      const y3 = (l = c3.headerRefs) != null && l.length ? [c3.headerRefs].concat(A.value) : A.value.concat([c3.skipButtonRef ? [] : [g.value]]);
      n(Ce(y3), (h5 = c3.headerRefs) != null && h5.length ? "monthPicker" : "selectionGrid");
    }, Y3 = (y3) => {
      c3.arrowNavigation || ft(y3, D3.value, true);
    }, Z = (y3) => {
      q3.value = y3, i3("hover-value", y3);
    };
    return t3({ focusGrid: _ }), (y3, l) => {
      var h5;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: C,
        class: normalizeClass(X3.value),
        style: normalizeStyle(ae.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(ne, ["prevent"]), ["esc"]),
          l[0] || (l[0] = withKeys(withModifiers((s3) => Y3(s3), ["prevent"]), ["left"])),
          l[1] || (l[1] = withKeys(withModifiers((s3) => Y3(s3), ["prevent"]), ["up"])),
          l[2] || (l[2] = withKeys(withModifiers((s3) => Y3(s3), ["prevent"]), ["down"])),
          l[3] || (l[3] = withKeys(withModifiers((s3) => Y3(s3), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: F,
          class: normalizeClass(E3.value),
          role: "grid",
          style: normalizeStyle({ height: `${S3.value}px` })
        }, [
          createBaseVNode("div", Pl, [
            renderSlot(y3.$slots, "header")
          ]),
          y3.$slots.overlay ? renderSlot(y3.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(y3.items, (s3, J) => (openBlock(), createElementBlock("div", {
            key: J,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: y3.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(s3, (de, $) => (openBlock(), createElementBlock("div", {
              key: de.value,
              ref_for: true,
              ref: (u3) => O3(u3, de, J, $),
              role: "gridcell",
              class: normalizeClass(V3.value),
              "aria-selected": de.active,
              "aria-disabled": de.disabled || void 0,
              tabindex: "0",
              onClick: (u3) => w3(de),
              onKeydown: [
                withKeys(withModifiers((u3) => w3(de), ["prevent"]), ["enter"]),
                withKeys(withModifiers((u3) => w3(de), ["prevent"]), ["space"])
              ],
              onMouseover: (u3) => Z(de.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(de.className)
              }, [
                y3.$slots.item ? renderSlot(y3.$slots, "item", {
                  key: 0,
                  item: de
                }) : createCommentVNode("", true),
                y3.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(de.text), 1)
                ], 64))
              ], 2)
            ], 42, Cl))), 128))
          ], 2))), 128))
        ], 6),
        y3.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: g,
          type: "button",
          "aria-label": (h5 = unref(p)) == null ? void 0 : h5.toggleOverlay,
          class: normalizeClass(ie2.value),
          tabindex: "0",
          onClick: L3,
          onKeydown: [
            withKeys(L3, ["enter"]),
            withKeys(L3, ["tab"])
          ]
        }, [
          renderSlot(y3.$slots, "button-icon")
        ], 42, _l)), [
          [vShow, !unref(R3)(y3.hideNavigation, y3.type)]
        ]) : createCommentVNode("", true)
      ], 46, Sl);
    };
  }
});
var ln = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean }
  },
  setup(e3) {
    const t3 = e3, r = computed(
      () => t3.multiCalendars > 0 ? [...Array(t3.multiCalendars).keys()] : [0]
    ), a3 = computed(() => ({
      dp__instance_calendar: t3.multiCalendars > 0
    }));
    return (n, o) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !n.stretch,
        "dp--menu--inner-stretched": n.stretch,
        dp__flex_display: n.multiCalendars > 0
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(r.value, (i3, c3) => (openBlock(), createElementBlock("div", {
        key: i3,
        class: normalizeClass(a3.value)
      }, [
        renderSlot(n.$slots, "default", {
          instance: i3,
          index: c3
        })
      ], 2))), 128))
    ], 2));
  }
});
var Rl = ["aria-label", "aria-disabled"];
var It = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e3, { emit: t3 }) {
    const r = t3, a3 = ref(null);
    return onMounted(() => r("set-ref", a3)), (n, o) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: a3,
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": n.ariaLabel,
      "aria-disabled": n.disabled || void 0,
      onClick: o[0] || (o[0] = (i3) => n.$emit("activate")),
      onKeydown: [
        o[1] || (o[1] = withKeys(withModifiers((i3) => n.$emit("activate"), ["prevent"]), ["enter"])),
        o[2] || (o[2] = withKeys(withModifiers((i3) => n.$emit("activate"), ["prevent"]), ["space"]))
      ]
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: n.disabled }])
      }, [
        renderSlot(n.$slots, "default")
      ], 2)
    ], 40, Rl));
  }
});
var Ol = { class: "dp--year-mode-picker" };
var Yl = ["aria-label"];
var La = defineComponent({
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
  setup(e3, { emit: t3 }) {
    const r = t3, a3 = e3, { showRightIcon: n, showLeftIcon: o } = an(), { defaultedConfig: i3, defaultedMultiCalendars: c3, defaultedAriaLabels: p, defaultedTransitions: T3 } = Pe(a3), { showTransition: D3, transitionName: R3 } = Lt(T3), P = (A = false, q3) => {
      r("toggle-year-picker", { flow: A, show: q3 });
    }, M3 = (A) => {
      r("year-select", A);
    }, C = (A = false) => {
      r("handle-year", A);
    };
    return (A, q3) => {
      var g, S3, F;
      return openBlock(), createElementBlock("div", Ol, [
        unref(o)(unref(c3), e3.instance) ? (openBlock(), createBlock(It, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": (g = unref(p)) == null ? void 0 : g.prevYear,
          disabled: e3.isDisabled(false),
          onActivate: q3[0] || (q3[0] = (b3) => C(false))
        }, {
          default: withCtx(() => [
            A.$slots["arrow-left"] ? renderSlot(A.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
            A.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(En), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createBaseVNode("button", {
          ref: "mpYearButtonRef",
          class: "dp__btn dp--year-select",
          type: "button",
          "aria-label": (S3 = unref(p)) == null ? void 0 : S3.openYearsOverlay,
          onClick: q3[1] || (q3[1] = () => P(false)),
          onKeydown: q3[2] || (q3[2] = withKeys(() => P(false), ["enter"]))
        }, [
          A.$slots.year ? renderSlot(A.$slots, "year", {
            key: 0,
            year: e3.year
          }) : createCommentVNode("", true),
          A.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e3.year), 1)
          ], 64))
        ], 40, Yl),
        unref(n)(unref(c3), e3.instance) ? (openBlock(), createBlock(It, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": (F = unref(p)) == null ? void 0 : F.nextYear,
          disabled: e3.isDisabled(true),
          onActivate: q3[3] || (q3[3] = (b3) => C(true))
        }, {
          default: withCtx(() => [
            A.$slots["arrow-right"] ? renderSlot(A.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
            A.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Fn), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(R3)(e3.showYearPicker),
          css: unref(D3)
        }, {
          default: withCtx(() => [
            e3.showYearPicker ? (openBlock(), createBlock(zt, {
              key: 0,
              items: e3.items,
              "text-input": A.textInput,
              "esc-close": A.escClose,
              config: A.config,
              "is-last": A.autoApply && !unref(i3).keepActionRow,
              "hide-navigation": A.hideNavigation,
              type: "year",
              onToggle: P,
              onSelected: q3[4] || (q3[4] = (b3) => M3(b3))
            }, createSlots({
              "button-icon": withCtx(() => [
                A.$slots["calendar-icon"] ? renderSlot(A.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                A.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ot), { key: 1 }))
              ]),
              _: 2
            }, [
              A.$slots["year-overlay-value"] ? {
                name: "item",
                fn: withCtx(({ item: b3 }) => [
                  renderSlot(A.$slots, "year-overlay-value", {
                    text: b3.text,
                    value: b3.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "text-input", "esc-close", "config", "is-last", "hide-navigation"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Gn = (e3, t3, r) => {
  if (t3.value && Array.isArray(t3.value))
    if (t3.value.some((a3) => ke(e3, a3))) {
      const a3 = t3.value.filter((n) => !ke(n, e3));
      t3.value = a3.length ? a3 : null;
    } else
      (r && +r > t3.value.length || !r) && t3.value.push(e3);
  else
    t3.value = [e3];
};
var qn = (e3, t3, r) => {
  let a3 = e3.value ? e3.value.slice() : [];
  return a3.length === 2 && a3[1] !== null && (a3 = []), a3.length ? Ye(t3, a3[0]) ? (a3.unshift(t3), r("range-start", a3[0]), r("range-start", a3[1])) : (a3[1] = t3, r("range-end", t3)) : (a3 = [t3], r("range-start", t3)), e3.value = a3, a3;
};
var on = (e3, t3, r, a3) => {
  e3[0] && e3[1] && r && t3("auto-apply"), e3[0] && !e3[1] && a3 && r && t3("auto-apply");
};
var Ua = (e3) => {
  Array.isArray(e3.value) && e3.value.length <= 2 && e3.range ? e3.modelValue.value = e3.value.map((t3) => et(B2(t3), e3.timezone)) : Array.isArray(e3.value) || (e3.modelValue.value = et(B2(e3.value), e3.timezone));
};
var za = ({
  multiCalendars: e3,
  highlight: t3,
  calendars: r,
  modelValue: a3,
  props: n,
  year: o,
  month: i3,
  emit: c3
}) => {
  const p = computed(() => jn(n.yearRange, n.reverseYears)), T3 = ref([false]), D3 = computed(() => (b3, _) => {
    const X3 = set(Xe(/* @__PURE__ */ new Date()), {
      month: i3.value(b3),
      year: o.value(b3)
    });
    return Ea(X3, n.maxDate, n.minDate, n.preventMinMaxNavigation, _);
  }), R3 = () => {
    for (let b3 = 0; b3 < e3.value.count; b3++)
      if (b3 === 0)
        r.value[b3] = r.value[0];
      else {
        const _ = set(B2(), r.value[b3 - 1]);
        r.value[b3] = { month: getMonth(_), year: getYear(addYears(_, 1)) };
      }
  }, P = (b3) => {
    if (!b3)
      return R3();
    const _ = set(B2(), r.value[b3]);
    return r.value[0].year = getYear(subYears(_, e3.value.count - 1)), R3();
  }, M3 = (b3) => n.focusStartDate ? b3[0] : b3[1] ? b3[1] : b3[0], C = () => {
    if (a3.value) {
      const b3 = Array.isArray(a3.value) ? M3(a3.value) : a3.value;
      r.value[0] = { month: getMonth(b3), year: getYear(b3) };
    }
  };
  onMounted(() => {
    C(), e3.value.count && R3();
  });
  const A = (b3, _) => {
    r.value[_].year = b3, e3.value.count && !e3.value.solo && P(_);
  }, q3 = computed(() => (b3) => Ct(p.value, (_) => {
    const X3 = o.value(b3) === _.value, ae = Ht(_.value, _t(n.minDate), _t(n.maxDate)), V3 = Kn(t3.value, _.value);
    return { active: X3, disabled: ae, highlighted: V3 };
  })), g = (b3, _) => {
    A(b3, _), F(_);
  }, S3 = (b3, _ = false) => {
    if (!D3.value(b3, _)) {
      const X3 = _ ? o.value(b3) + 1 : o.value(b3) - 1;
      A(X3, b3);
    }
  }, F = (b3, _ = false, X3) => {
    _ || c3("reset-flow"), X3 !== void 0 ? T3.value[b3] = X3 : T3.value[b3] = !T3.value[b3], T3.value || c3("overlay-closed");
  };
  return {
    isDisabled: D3,
    groupedYears: q3,
    showYearPicker: T3,
    selectYear: A,
    toggleYearPicker: F,
    handleYearSelect: g,
    handleYear: S3
  };
};
var Nl = (e3, t3) => {
  const { defaultedMultiCalendars: r, defaultedAriaLabels: a3, defaultedTransitions: n, defaultedConfig: o, defaultedHighlight: i3 } = Pe(e3), { modelValue: c3, year: p, month: T3, calendars: D3 } = Ut(e3, t3), R3 = computed(() => _a(e3.formatLocale, e3.locale, e3.monthNameFormat)), P = ref(null), {
    selectYear: M3,
    groupedYears: C,
    showYearPicker: A,
    toggleYearPicker: q3,
    handleYearSelect: g,
    handleYear: S3,
    isDisabled: F
  } = za({
    modelValue: c3,
    multiCalendars: r,
    highlight: i3,
    calendars: D3,
    year: p,
    month: T3,
    props: e3,
    emit: t3
  });
  onMounted(() => {
    e3.startDate && (c3.value && e3.focusStartDate || !c3.value) && M3(getYear(B2(e3.startDate)), 0);
  });
  const b3 = (y3) => y3 ? { month: getMonth(y3), year: getYear(y3) } : { month: null, year: null }, _ = () => c3.value ? Array.isArray(c3.value) ? c3.value.map((y3) => b3(y3)) : b3(c3.value) : b3(), X3 = (y3, l) => {
    const h5 = D3.value[y3], s3 = _();
    return Array.isArray(s3) ? s3.some((J) => J.year === (h5 == null ? void 0 : h5.year) && J.month === l) : (h5 == null ? void 0 : h5.year) === s3.year && l === s3.month;
  }, ae = (y3, l, h5) => {
    var J, de;
    const s3 = _();
    return Array.isArray(s3) ? p.value(l) === ((J = s3[h5]) == null ? void 0 : J.year) && y3 === ((de = s3[h5]) == null ? void 0 : de.month) : false;
  }, V3 = (y3, l) => {
    if (e3.range) {
      const h5 = _();
      if (Array.isArray(c3.value) && Array.isArray(h5)) {
        const s3 = ae(y3, l, 0) || ae(y3, l, 1), J = ot(Xe(B2()), y3, p.value(l));
        return nn(c3.value, P.value, J) && !s3;
      }
      return false;
    }
    return false;
  }, ie2 = computed(() => (y3) => Ct(R3.value, (l) => {
    const h5 = X3(y3, l.value), s3 = Ht(
      l.value,
      Oa(p.value(y3), e3.minDate),
      Ya(p.value(y3), e3.maxDate)
    ) || el(e3.disabledDates, p.value(y3)).includes(l.value), J = V3(l.value, y3), de = Ha(i3.value, l.value, p.value(y3));
    return { active: h5, disabled: s3, isBetween: J, highlighted: de };
  })), E3 = (y3, l) => ot(Xe(B2()), y3, p.value(l)), f = (y3, l) => {
    const h5 = c3.value ? c3.value : Xe(/* @__PURE__ */ new Date());
    c3.value = ot(h5, y3, p.value(l)), t3("auto-apply");
  }, w3 = (y3, l) => {
    const h5 = qn(c3, E3(y3, l), t3);
    on(h5, t3, e3.autoApply, e3.modelAuto);
  }, L3 = (y3, l) => {
    Gn(E3(y3, l), c3, e3.multiDatesLimit), t3("auto-apply", true);
  }, ne = (y3, l) => (D3.value[l].month = y3, d3(l, D3.value[l].year, y3), e3.multiDates ? L3(y3, l) : e3.range ? w3(y3, l) : f(y3, l)), O3 = (y3, l) => {
    M3(y3, l), d3(l, y3, null);
  }, d3 = (y3, l, h5) => {
    let s3 = h5;
    if (!s3 && s3 !== 0) {
      const J = _();
      s3 = Array.isArray(J) ? J[y3].month : J.month;
    }
    t3("update-month-year", { instance: y3, year: l, month: s3 });
  };
  return {
    groupedMonths: ie2,
    groupedYears: C,
    year: p,
    isDisabled: F,
    defaultedMultiCalendars: r,
    defaultedAriaLabels: a3,
    defaultedTransitions: n,
    defaultedConfig: o,
    showYearPicker: A,
    modelValue: c3,
    presetDate: (y3, l) => {
      Ua({ value: y3, modelValue: c3, range: e3.range, timezone: l ? void 0 : e3.timezone }), t3("auto-apply");
    },
    setHoverDate: (y3, l) => {
      P.value = E3(y3, l);
    },
    selectMonth: ne,
    selectYear: O3,
    toggleYearPicker: q3,
    handleYearSelect: g,
    handleYear: S3,
    getModelMonthYear: _
  };
};
var Il = defineComponent({
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
    "mount"
  ],
  setup(e3, { expose: t3, emit: r }) {
    const a3 = r, n = useSlots(), o = qe(n, "yearMode"), i3 = e3;
    onMounted(() => {
      i3.shadow || a3("mount", null);
    });
    const {
      groupedMonths: c3,
      groupedYears: p,
      year: T3,
      isDisabled: D3,
      defaultedMultiCalendars: R3,
      defaultedConfig: P,
      showYearPicker: M3,
      modelValue: C,
      presetDate: A,
      setHoverDate: q3,
      selectMonth: g,
      selectYear: S3,
      toggleYearPicker: F,
      handleYearSelect: b3,
      handleYear: _,
      getModelMonthYear: X3
    } = Nl(i3, a3);
    return t3({ getSidebarProps: () => ({
      modelValue: C,
      year: T3,
      getModelMonthYear: X3,
      selectMonth: g,
      selectYear: S3,
      handleYear: _
    }), presetDate: A, toggleYearPicker: (V3) => F(0, V3) }), (V3, ie2) => (openBlock(), createBlock(ln, {
      "multi-calendars": unref(R3).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: E3 }) => [
        V3.$slots["month-year"] ? renderSlot(V3.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
          year: unref(T3),
          months: unref(c3)(E3),
          years: unref(p)(E3),
          selectMonth: unref(g),
          selectYear: unref(S3),
          instance: E3
        }))) : (openBlock(), createBlock(zt, {
          key: 1,
          items: unref(c3)(E3),
          "arrow-navigation": V3.arrowNavigation,
          "is-last": V3.autoApply && !unref(P).keepActionRow,
          "esc-close": V3.escClose,
          height: unref(P).modeHeight,
          config: V3.config,
          "no-overlay-focus": !!(V3.noOverlayFocus || V3.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (f) => unref(g)(f, E3),
          onHoverValue: (f) => unref(q3)(f, E3)
        }, {
          header: withCtx(() => [
            createVNode(La, mergeProps(V3.$props, {
              items: unref(p)(E3),
              instance: E3,
              "show-year-picker": unref(M3)[E3],
              year: unref(T3)(E3),
              "is-disabled": (f) => unref(D3)(E3, f),
              onHandleYear: (f) => unref(_)(E3, f),
              onYearSelect: (f) => unref(b3)(f, E3),
              onToggleYearPicker: (f) => unref(F)(E3, f == null ? void 0 : f.flow, f == null ? void 0 : f.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(o), (f, w3) => ({
                name: f,
                fn: withCtx((L3) => [
                  renderSlot(V3.$slots, f, normalizeProps(guardReactiveProps(L3)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "config", "no-overlay-focus", "onSelected", "onHoverValue"]))
      ]),
      _: 3
    }, 8, ["multi-calendars"]));
  }
});
var Bl = (e3, t3) => {
  const { modelValue: r } = Ut(e3, t3), a3 = ref(null), { defaultedHighlight: n, defaultedFilters: o } = Pe(e3), i3 = ref();
  onMounted(() => {
    e3.startDate && (r.value && e3.focusStartDate || !r.value) && (i3.value = getYear(B2(e3.startDate)));
  });
  const c3 = (M3) => Array.isArray(r.value) ? r.value.some((C) => getYear(C) === M3) : r.value ? getYear(r.value) === M3 : false, p = (M3) => e3.range && Array.isArray(r.value) ? nn(r.value, a3.value, D3(M3)) : false, T3 = computed(() => Ct(jn(e3.yearRange, e3.reverseYears), (M3) => {
    const C = c3(M3.value), A = Ht(M3.value, _t(e3.minDate), _t(e3.maxDate)) || o.value.years.includes(M3.value), q3 = p(M3.value) && !C, g = Kn(n.value, M3.value);
    return { active: C, disabled: A, isBetween: q3, highlighted: g };
  })), D3 = (M3) => setYear(Xe(/* @__PURE__ */ new Date()), M3);
  return {
    groupedYears: T3,
    modelValue: r,
    focusYear: i3,
    setHoverValue: (M3) => {
      a3.value = setYear(Xe(/* @__PURE__ */ new Date()), M3);
    },
    selectYear: (M3) => {
      var C;
      if (e3.multiDates)
        return r.value ? Array.isArray(r.value) && (((C = r.value) == null ? void 0 : C.map((q3) => getYear(q3))).includes(M3) ? r.value = r.value.filter((q3) => getYear(q3) !== M3) : r.value.push(setYear(Fe(B2()), M3))) : r.value = [setYear(Fe(B2()), M3)], t3("auto-apply", true);
      if (e3.range) {
        const A = qn(r, D3(M3), t3);
        return on(A, t3, e3.autoApply, e3.modelAuto);
      }
      r.value = D3(M3), t3("auto-apply");
    }
  };
};
var El = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...tt
  },
  emits: ["update:internal-model-value", "reset-flow", "range-start", "range-end", "auto-apply"],
  setup(e3, { expose: t3, emit: r }) {
    const a3 = r, n = e3, { groupedYears: o, modelValue: i3, focusYear: c3, selectYear: p, setHoverValue: T3 } = Bl(n, a3), { defaultedConfig: D3 } = Pe(n);
    return t3({ getSidebarProps: () => ({
      modelValue: i3,
      selectYear: p
    }) }), (P, M3) => (openBlock(), createElementBlock("div", null, [
      P.$slots["month-year"] ? renderSlot(P.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
        years: unref(o),
        selectYear: unref(p)
      }))) : (openBlock(), createBlock(zt, {
        key: 1,
        items: unref(o),
        "is-last": P.autoApply && !unref(D3).keepActionRow,
        height: unref(D3).modeHeight,
        config: P.config,
        "no-overlay-focus": !!(P.noOverlayFocus || P.textInput),
        "focus-value": unref(c3),
        type: "year",
        "use-relative": "",
        onSelected: unref(p),
        onHoverValue: unref(T3)
      }, createSlots({ _: 2 }, [
        P.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: C }) => [
            renderSlot(P.$slots, "year-overlay-value", {
              text: C.text,
              value: C.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
});
var Fl = {
  key: 0,
  class: "dp__time_input"
};
var Hl = ["aria-label", "onKeydown", "onClick"];
var Vl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var Ll = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var Ul = ["aria-label", "disabled", "onKeydown", "onClick"];
var zl = ["aria-label", "onKeydown", "onClick"];
var Wl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var jl = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var Kl = { key: 0 };
var Gl = ["aria-label", "onKeydown"];
var ql = defineComponent({
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
  setup(e3, { expose: t3, emit: r }) {
    const a3 = r, n = e3, { setTimePickerElements: o, setTimePickerBackRef: i3 } = yt(), { defaultedAriaLabels: c3, defaultedTransitions: p, defaultedFilters: T3, defaultedConfig: D3 } = Pe(n), { transitionName: R3, showTransition: P } = Lt(p), M3 = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), C = ref("AM"), A = ref(null), q3 = ref([]);
    onMounted(() => {
      a3("mounted");
    });
    const g = (u3) => set(/* @__PURE__ */ new Date(), {
      hours: u3.hours,
      minutes: u3.minutes,
      seconds: n.enableSeconds ? u3.seconds : 0,
      milliseconds: 0
    }), S3 = computed(
      () => (u3) => ne(u3, n[u3]) || b3(u3, n[u3])
    ), F = computed(() => ({ hours: n.hours, minutes: n.minutes, seconds: n.seconds })), b3 = (u3, I3) => n.range && !n.disableTimeRangeValidation ? !n.validateTime(u3, I3) : false, _ = (u3, I3) => {
      if (n.range && !n.disableTimeRangeValidation) {
        const Q3 = I3 ? +n[`${u3}Increment`] : -+n[`${u3}Increment`], K3 = n[u3] + Q3;
        return !n.validateTime(u3, K3);
      }
      return false;
    }, X3 = computed(() => (u3) => !d3(+n[u3] + +n[`${u3}Increment`], u3) || _(u3, true)), ae = computed(() => (u3) => !d3(+n[u3] - +n[`${u3}Increment`], u3) || _(u3, false)), V3 = (u3, I3) => add(set(B2(), u3), I3), ie2 = (u3, I3) => sub(set(B2(), u3), I3), E3 = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !n.timePickerInline,
        dp__time_col_reg_block: !n.enableSeconds && n.is24 && !n.timePickerInline,
        dp__time_col_reg_inline: !n.enableSeconds && n.is24 && n.timePickerInline,
        dp__time_col_reg_with_button: !n.enableSeconds && !n.is24,
        dp__time_col_sec: n.enableSeconds && n.is24,
        dp__time_col_sec_with_button: n.enableSeconds && !n.is24
      })
    ), f = computed(() => {
      const u3 = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return n.enableSeconds ? u3.concat([{ type: "", separator: true }, { type: "seconds" }]) : u3;
    }), w3 = computed(() => f.value.filter((u3) => !u3.separator)), L3 = computed(() => (u3) => {
      if (u3 === "hours") {
        const I3 = h5(+n.hours);
        return { text: I3 < 10 ? `0${I3}` : `${I3}`, value: I3 };
      }
      return { text: n[u3] < 10 ? `0${n[u3]}` : `${n[u3]}`, value: n[u3] };
    }), ne = (u3, I3) => {
      var K3;
      if (!n.disabledTimesConfig)
        return false;
      const Q3 = n.disabledTimesConfig(n.order, u3 === "hours" ? I3 : void 0);
      return Q3[u3] ? !!((K3 = Q3[u3]) != null && K3.includes(I3)) : true;
    }, O3 = (u3) => {
      const I3 = n.is24 ? 24 : 12, Q3 = u3 === "hours" ? I3 : 60, K3 = +n[`${u3}GridIncrement`], te = u3 === "hours" && !n.is24 ? K3 : 0, le = [];
      for (let be2 = te; be2 < Q3; be2 += K3)
        le.push({ value: be2, text: be2 < 10 ? `0${be2}` : `${be2}` });
      return u3 === "hours" && !n.is24 && le.push({ value: 0, text: "12" }), Ct(le, (be2) => ({ active: false, disabled: T3.value.times[u3].includes(be2.value) || !d3(be2.value, u3) || ne(u3, be2.value) || b3(u3, be2.value) }));
    }, d3 = (u3, I3) => {
      const Q3 = n.minTime ? g(yn(n.minTime)) : null, K3 = n.maxTime ? g(yn(n.maxTime)) : null, te = g(yn(F.value, I3, u3));
      return Q3 && K3 ? (isBefore(te, K3) || isEqual(te, K3)) && (isAfter(te, Q3) || isEqual(te, Q3)) : Q3 ? isAfter(te, Q3) || isEqual(te, Q3) : K3 ? isBefore(te, K3) || isEqual(te, K3) : true;
    }, Y3 = (u3) => n[`no${u3[0].toUpperCase() + u3.slice(1)}Overlay`], Z = (u3) => {
      Y3(u3) || (M3[u3] = !M3[u3], M3[u3] || a3("overlay-closed"));
    }, y3 = (u3) => u3 === "hours" ? getHours : u3 === "minutes" ? getMinutes : getSeconds, l = (u3, I3 = true) => {
      const Q3 = I3 ? V3 : ie2, K3 = I3 ? +n[`${u3}Increment`] : -+n[`${u3}Increment`];
      d3(+n[u3] + K3, u3) && a3(
        `update:${u3}`,
        y3(u3)(Q3({ [u3]: +n[u3] }, { [u3]: +n[`${u3}Increment`] }))
      );
    }, h5 = (u3) => n.is24 ? u3 : (u3 >= 12 ? C.value = "PM" : C.value = "AM", Vr(u3)), s3 = () => {
      C.value === "PM" ? (C.value = "AM", a3("update:hours", n.hours - 12)) : (C.value = "PM", a3("update:hours", n.hours + 12)), a3("am-pm-change", C.value);
    }, J = (u3) => {
      M3[u3] = true;
    }, de = (u3, I3, Q3) => {
      if (u3 && n.arrowNavigation) {
        Array.isArray(q3.value[I3]) ? q3.value[I3][Q3] = u3 : q3.value[I3] = [u3];
        const K3 = q3.value.reduce(
          (te, le) => le.map((be2, N) => [...te[N] || [], le[N]]),
          []
        );
        i3(n.closeTimePickerBtn), A.value && (K3[1] = K3[1].concat(A.value)), o(K3, n.order);
      }
    }, $ = (u3, I3) => (Z(u3), u3 === "hours" && !n.is24 ? a3(`update:${u3}`, C.value === "PM" ? I3 + 12 : I3) : a3(`update:${u3}`, I3));
    return t3({ openChildCmp: J }), (u3, I3) => {
      var Q3;
      return u3.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Fl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (K3, te) => {
          var le, be2, N;
          return openBlock(), createElementBlock("div", {
            key: te,
            class: normalizeClass(E3.value)
          }, [
            K3.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (U) => de(U, te, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !u3.timePickerInline,
                  dp__inc_dec_button_inline: u3.timePickerInline,
                  dp__tp_inline_btn_top: u3.timePickerInline,
                  dp__inc_dec_button_disabled: X3.value(K3.type)
                }),
                "aria-label": (le = unref(c3)) == null ? void 0 : le.incrementValue(K3.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((U) => l(K3.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((U) => l(K3.type), ["prevent"]), ["space"])
                ],
                onClick: (U) => l(K3.type)
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  Vl,
                  Ll
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  u3.$slots["arrow-up"] ? renderSlot(u3.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  u3.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Vn), { key: 1 }))
                ], 64))
              ], 42, Hl),
              createBaseVNode("button", {
                ref_for: true,
                ref: (U) => de(U, te, 1),
                type: "button",
                "aria-label": (be2 = unref(c3)) == null ? void 0 : be2.openTpOverlay(K3.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !u3.timePickerInline,
                  dp__time_display_inline: u3.timePickerInline,
                  "dp--time-invalid": S3.value(K3.type),
                  "dp--time-overlay-btn": !S3.value(K3.type)
                }),
                disabled: Y3(K3.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((U) => Z(K3.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((U) => Z(K3.type), ["prevent"]), ["space"])
                ],
                onClick: (U) => Z(K3.type)
              }, [
                u3.$slots[K3.type] ? renderSlot(u3.$slots, K3.type, {
                  key: 0,
                  text: L3.value(K3.type).text,
                  value: L3.value(K3.type).value
                }) : createCommentVNode("", true),
                u3.$slots[K3.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(L3.value(K3.type).text), 1)
                ], 64))
              ], 42, Ul),
              createBaseVNode("button", {
                ref_for: true,
                ref: (U) => de(U, te, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !u3.timePickerInline,
                  dp__inc_dec_button_inline: u3.timePickerInline,
                  dp__tp_inline_btn_bottom: u3.timePickerInline,
                  dp__inc_dec_button_disabled: ae.value(K3.type)
                }),
                "aria-label": (N = unref(c3)) == null ? void 0 : N.decrementValue(K3.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((U) => l(K3.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((U) => l(K3.type, false), ["prevent"]), ["space"])
                ],
                onClick: (U) => l(K3.type, false)
              }, [
                n.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  Wl,
                  jl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  u3.$slots["arrow-down"] ? renderSlot(u3.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  u3.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ln), { key: 1 }))
                ], 64))
              ], 42, zl)
            ], 64))
          ], 2);
        }), 128)),
        u3.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Kl, [
          u3.$slots["am-pm-button"] ? renderSlot(u3.$slots, "am-pm-button", {
            key: 0,
            toggle: s3,
            value: C.value
          }) : createCommentVNode("", true),
          u3.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: A,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (Q3 = unref(c3)) == null ? void 0 : Q3.amPmButton,
            tabindex: "0",
            onClick: s3,
            onKeydown: [
              withKeys(withModifiers(s3, ["prevent"]), ["enter"]),
              withKeys(withModifiers(s3, ["prevent"]), ["space"])
            ]
          }, toDisplayString(C.value), 41, Gl))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(w3.value, (K3, te) => (openBlock(), createBlock(Transition, {
          key: te,
          name: unref(R3)(M3[K3.type]),
          css: unref(P)
        }, {
          default: withCtx(() => [
            M3[K3.type] ? (openBlock(), createBlock(zt, {
              key: 0,
              items: O3(K3.type),
              "is-last": u3.autoApply && !unref(D3).keepActionRow,
              "esc-close": u3.escClose,
              type: K3.type,
              "text-input": u3.textInput,
              config: u3.config,
              "arrow-navigation": u3.arrowNavigation,
              onSelected: (le) => $(K3.type, le),
              onToggle: (le) => Z(K3.type),
              onResetFlow: I3[0] || (I3[0] = (le) => u3.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                u3.$slots["clock-icon"] ? renderSlot(u3.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                u3.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(u3.timePickerInline ? unref(Ot) : unref(Hn)), { key: 1 }))
              ]),
              _: 2
            }, [
              u3.$slots[`${K3.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: le }) => [
                  renderSlot(u3.$slots, `${K3.type}-overlay-value`, {
                    text: le.text,
                    value: le.value
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
var Zl = { class: "dp--tp-wrap" };
var Ql = ["aria-label", "tabindex"];
var Xl = ["tabindex"];
var Jl = ["aria-label"];
var Wa = defineComponent({
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
  setup(e3, { expose: t3, emit: r }) {
    const a3 = r, n = e3, { buildMatrix: o, setTimePicker: i3 } = yt(), c3 = useSlots(), { defaultedTransitions: p, defaultedAriaLabels: T3, defaultedTextInput: D3, defaultedConfig: R3 } = Pe(n), { transitionName: P, showTransition: M3 } = Lt(p), { hideNavigationButtons: C } = an(), A = ref(null), q3 = ref(null), g = ref([]), S3 = ref(null);
    onMounted(() => {
      a3("mount"), !n.timePicker && n.arrowNavigation ? o([Re(A.value)], "time") : i3(true, n.timePicker);
    });
    const F = computed(() => n.range && n.modelAuto ? Ra(n.internalModelValue) : true), b3 = ref(false), _ = (O3) => ({
      hours: Array.isArray(n.hours) ? n.hours[O3] : n.hours,
      minutes: Array.isArray(n.minutes) ? n.minutes[O3] : n.minutes,
      seconds: Array.isArray(n.seconds) ? n.seconds[O3] : n.seconds
    }), X3 = computed(() => {
      const O3 = [];
      if (n.range)
        for (let d3 = 0; d3 < 2; d3++)
          O3.push(_(d3));
      else
        O3.push(_(0));
      return O3;
    }), ae = (O3, d3 = false, Y3 = "") => {
      d3 || a3("reset-flow"), b3.value = O3, a3(O3 ? "overlay-opened" : "overlay-closed"), n.arrowNavigation && i3(O3), nextTick(() => {
        Y3 !== "" && g.value[0] && g.value[0].openChildCmp(Y3);
      });
    }, V3 = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: n.autoApply && !R3.value.keepActionRow
    })), ie2 = qe(c3, "timePicker"), E3 = (O3, d3, Y3) => n.range ? d3 === 0 ? [O3, X3.value[1][Y3]] : [X3.value[0][Y3], O3] : O3, f = (O3) => {
      a3("update:hours", O3);
    }, w3 = (O3) => {
      a3("update:minutes", O3);
    }, L3 = (O3) => {
      a3("update:seconds", O3);
    }, ne = () => {
      if (S3.value && !D3.value.enabled && !n.noOverlayFocus) {
        const O3 = Ur(S3.value);
        O3 && O3.focus({ preventScroll: true });
      }
    };
    return t3({ toggleTimePicker: ae }), (O3, d3) => {
      var Y3;
      return openBlock(), createElementBlock("div", Zl, [
        !O3.timePicker && !O3.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: A,
          type: "button",
          class: normalizeClass(V3.value),
          "aria-label": (Y3 = unref(T3)) == null ? void 0 : Y3.openTimePicker,
          tabindex: O3.noOverlayFocus ? void 0 : 0,
          onKeydown: [
            d3[0] || (d3[0] = withKeys((Z) => ae(true), ["enter"])),
            d3[1] || (d3[1] = withKeys((Z) => ae(true), ["space"]))
          ],
          onClick: d3[2] || (d3[2] = (Z) => ae(true))
        }, [
          O3.$slots["clock-icon"] ? renderSlot(O3.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          O3.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
        ], 42, Ql)), [
          [vShow, !unref(C)(O3.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(P)(b3.value),
          css: unref(M3) && !O3.timePickerInline
        }, {
          default: withCtx(() => {
            var Z;
            return [
              b3.value || O3.timePicker || O3.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: S3,
                class: normalizeClass({
                  dp__overlay: !O3.timePickerInline,
                  "dp--overlay-absolute": !n.timePicker && !O3.timePickerInline,
                  "dp--overlay-relative": n.timePicker
                }),
                style: normalizeStyle(O3.timePicker ? { height: `${unref(R3).modeHeight}px` } : void 0),
                tabindex: O3.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    O3.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  O3.$slots["time-picker-overlay"] ? renderSlot(O3.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e3.hours,
                    minutes: e3.minutes,
                    seconds: e3.seconds,
                    setHours: f,
                    setMinutes: w3,
                    setSeconds: L3
                  }) : createCommentVNode("", true),
                  O3.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(O3.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(X3.value, (y3, l) => withDirectives((openBlock(), createBlock(ql, mergeProps({ key: l }, {
                      ...O3.$props,
                      order: l,
                      hours: y3.hours,
                      minutes: y3.minutes,
                      seconds: y3.seconds,
                      closeTimePickerBtn: q3.value,
                      disabledTimesConfig: e3.disabledTimesConfig,
                      disabled: l === 0 ? O3.fixedStart : O3.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: g,
                      "validate-time": (h5, s3) => e3.validateTime(h5, E3(s3, l, h5)),
                      "onUpdate:hours": (h5) => f(E3(h5, l, "hours")),
                      "onUpdate:minutes": (h5) => w3(E3(h5, l, "minutes")),
                      "onUpdate:seconds": (h5) => L3(E3(h5, l, "seconds")),
                      onMounted: ne,
                      onOverlayClosed: ne,
                      onAmPmChange: d3[3] || (d3[3] = (h5) => O3.$emit("am-pm-change", h5))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(ie2), (h5, s3) => ({
                        name: h5,
                        fn: withCtx((J) => [
                          renderSlot(O3.$slots, h5, normalizeProps(guardReactiveProps(J)))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, l === 0 ? true : F.value]
                    ])), 128))
                  ], 2)),
                  !O3.timePicker && !O3.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: q3,
                    type: "button",
                    class: normalizeClass(V3.value),
                    "aria-label": (Z = unref(T3)) == null ? void 0 : Z.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      d3[4] || (d3[4] = withKeys((y3) => ae(false), ["enter"])),
                      d3[5] || (d3[5] = withKeys((y3) => ae(false), ["space"]))
                    ],
                    onClick: d3[6] || (d3[6] = (y3) => ae(false))
                  }, [
                    O3.$slots["calendar-icon"] ? renderSlot(O3.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    O3.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ot), { key: 1 }))
                  ], 42, Jl)), [
                    [vShow, !unref(C)(O3.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, Xl)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var ja = (e3, t3, r, a3) => {
  const n = (g, S3) => Array.isArray(t3[g]) ? t3[g][S3] : t3[g], o = (g) => e3.enableSeconds ? Array.isArray(t3.seconds) ? t3.seconds[g] : t3.seconds : 0, i3 = (g, S3) => g ? S3 !== void 0 ? vt(g, n("hours", S3), n("minutes", S3), o(S3)) : vt(g, t3.hours, t3.minutes, o()) : setSeconds(B2(), o(S3)), c3 = (g, S3) => {
    t3[g] = S3;
  }, p = (g, S3) => {
    const F = Object.fromEntries(
      Object.keys(t3).map((b3) => b3 === g ? [b3, S3] : [b3, t3[b3]].slice())
    );
    if (e3.range && !e3.disableTimeRangeValidation) {
      const b3 = (X3) => r.value ? vt(
        r.value[X3],
        F.hours[X3],
        F.minutes[X3],
        F.seconds[X3]
      ) : null, _ = (X3) => setMilliseconds(r.value[X3], 0);
      return !(ke(b3(0), b3(1)) && (isAfter(b3(0), _(1)) || isBefore(b3(1), _(0))));
    }
    return true;
  }, T3 = (g, S3) => {
    p(g, S3) && (c3(g, S3), a3 && a3());
  }, D3 = (g) => {
    T3("hours", g);
  }, R3 = (g) => {
    T3("minutes", g);
  }, P = (g) => {
    T3("seconds", g);
  }, M3 = (g, S3, F, b3) => {
    S3 && D3(g), !S3 && !F && R3(g), F && P(g), r.value && b3(r.value);
  }, C = (g) => {
    if (g) {
      const S3 = Array.isArray(g), F = S3 ? [+g[0].hours, +g[1].hours] : +g.hours, b3 = S3 ? [+g[0].minutes, +g[1].minutes] : +g.minutes, _ = S3 ? [+g[0].seconds, +g[1].seconds] : +g.seconds;
      c3("hours", F), c3("minutes", b3), e3.enableSeconds && c3("seconds", _);
    }
  }, A = (g, S3) => {
    const F = {
      hours: Array.isArray(t3.hours) ? t3.hours[g] : t3.hours,
      disabledArr: []
    };
    return (S3 || S3 === 0) && (F.hours = S3), Array.isArray(e3.disabledTimes) && (F.disabledArr = e3.range && Array.isArray(e3.disabledTimes[g]) ? e3.disabledTimes[g] : e3.disabledTimes), F;
  }, q3 = computed(() => (g, S3) => {
    var F;
    if (Array.isArray(e3.disabledTimes)) {
      const { disabledArr: b3, hours: _ } = A(g, S3), X3 = b3.filter((ae) => +ae.hours === _);
      return ((F = X3[0]) == null ? void 0 : F.minutes) === "*" ? { hours: [_], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: (X3 == null ? void 0 : X3.map((ae) => +ae.minutes)) ?? [],
        seconds: (X3 == null ? void 0 : X3.map((ae) => ae.seconds ? +ae.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: c3,
    updateHours: D3,
    updateMinutes: R3,
    updateSeconds: P,
    getSetDateTime: i3,
    updateTimeValues: M3,
    getSecondsValue: o,
    assignStartTime: C,
    validateTime: p,
    disabledTimesConfig: q3
  };
};
var xl = (e3, t3) => {
  const { modelValue: r, time: a3 } = Ut(e3, t3), { defaultedStartTime: n } = Pe(e3), { updateTimeValues: o, getSetDateTime: i3, setTime: c3, assignStartTime: p, disabledTimesConfig: T3, validateTime: D3 } = ja(e3, a3, r), R3 = (F) => {
    const { hours: b3, minutes: _, seconds: X3 } = F;
    return { hours: +b3, minutes: +_, seconds: X3 ? +X3 : 0 };
  }, P = () => {
    if (e3.startTime) {
      if (Array.isArray(e3.startTime)) {
        const b3 = R3(e3.startTime[0]), _ = R3(e3.startTime[1]);
        return [set(B2(), b3), set(B2(), _)];
      }
      const F = R3(e3.startTime);
      return set(B2(), F);
    }
    return e3.range ? [null, null] : null;
  }, M3 = () => {
    if (e3.range) {
      const [F, b3] = P();
      r.value = [i3(F, 0), i3(b3, 1)];
    } else
      r.value = i3(P());
  }, C = (F) => Array.isArray(F) ? [wt(B2(F[0])), wt(B2(F[1]))] : [wt(F ?? B2())], A = (F, b3, _) => {
    c3("hours", F), c3("minutes", b3), c3("seconds", e3.enableSeconds ? _ : 0);
  }, q3 = () => {
    const [F, b3] = C(r.value);
    return e3.range ? A(
      [F.hours, b3.hours],
      [F.minutes, b3.minutes],
      [F.seconds, b3.minutes]
    ) : A(F.hours, F.minutes, F.seconds);
  };
  onMounted(() => {
    if (!e3.shadow)
      return p(n.value), r.value ? q3() : M3();
  });
  const g = () => {
    Array.isArray(r.value) ? r.value = r.value.map((F, b3) => F && i3(F, b3)) : r.value = i3(r.value), t3("time-update");
  };
  return {
    modelValue: r,
    time: a3,
    disabledTimesConfig: T3,
    updateTime: (F, b3 = true, _ = false) => {
      o(F, b3, _, g);
    },
    validateTime: D3
  };
};
var eo = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...tt
  },
  emits: ["update:internal-model-value", "time-update", "am-pm-change"],
  setup(e3, { expose: t3, emit: r }) {
    const a3 = r, n = e3, o = useSlots(), i3 = qe(o, "timePicker"), { time: c3, modelValue: p, disabledTimesConfig: T3, updateTime: D3, validateTime: R3 } = xl(n, a3);
    return t3({ getSidebarProps: () => ({
      modelValue: p,
      time: c3,
      updateTime: D3
    }) }), (M3, C) => (openBlock(), createBlock(ln, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Wa, mergeProps(M3.$props, {
          hours: unref(c3).hours,
          minutes: unref(c3).minutes,
          seconds: unref(c3).seconds,
          "internal-model-value": M3.internalModelValue,
          "disabled-times-config": unref(T3),
          "validate-time": unref(R3),
          "onUpdate:hours": C[0] || (C[0] = (A) => unref(D3)(A)),
          "onUpdate:minutes": C[1] || (C[1] = (A) => unref(D3)(A, false)),
          "onUpdate:seconds": C[2] || (C[2] = (A) => unref(D3)(A, false, true)),
          onAmPmChange: C[3] || (C[3] = (A) => M3.$emit("am-pm-change", A))
        }), createSlots({ _: 2 }, [
          renderList(unref(i3), (A, q3) => ({
            name: A,
            fn: withCtx((g) => [
              renderSlot(M3.$slots, A, normalizeProps(guardReactiveProps(g)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
});
var to = { class: "dp__month_year_row" };
var no = ["aria-label", "onClick", "onKeydown"];
var ao = defineComponent({
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
  setup(e3, { expose: t3, emit: r }) {
    const a3 = r, n = e3, {
      defaultedTransitions: o,
      defaultedAriaLabels: i3,
      defaultedMultiCalendars: c3,
      defaultedFilters: p,
      defaultedConfig: T3,
      defaultedHighlight: D3
    } = Pe(n), { transitionName: R3, showTransition: P } = Lt(o), { buildMatrix: M3 } = yt(), { handleMonthYearChange: C, isDisabled: A, updateMonthYear: q3 } = vl(n, a3), { showLeftIcon: g, showRightIcon: S3 } = an(), F = ref(false), b3 = ref(false), _ = ref([null, null, null, null]);
    onMounted(() => {
      a3("mount");
    });
    const X3 = (l) => ({
      get: () => n[l],
      set: (h5) => {
        const s3 = l === Qe.month ? Qe.year : Qe.month;
        a3("update-month-year", { [l]: h5, [s3]: n[s3] }), l === Qe.month ? ne(true) : O3(true);
      }
    }), ae = computed(X3(Qe.month)), V3 = computed(X3(Qe.year)), ie2 = computed(() => (l) => ({
      month: n.month,
      year: n.year,
      items: l === Qe.month ? n.months : n.years,
      instance: n.instance,
      updateMonthYear: q3,
      toggle: l === Qe.month ? ne : O3
    })), E3 = computed(() => {
      const l = n.months.find((h5) => h5.value === n.month);
      return l || { text: "", value: 0 };
    }), f = computed(() => Ct(n.months, (l) => {
      const h5 = n.month === l.value, s3 = Ht(
        l.value,
        Oa(n.year, n.minDate),
        Ya(n.year, n.maxDate)
      ) || p.value.months.includes(l.value), J = Ha(D3.value, l.value, n.year);
      return { active: h5, disabled: s3, highlighted: J };
    })), w3 = computed(() => Ct(n.years, (l) => {
      const h5 = n.year === l.value, s3 = Ht(l.value, _t(n.minDate), _t(n.maxDate)) || p.value.years.includes(l.value), J = Kn(D3.value, l.value);
      return { active: h5, disabled: s3, highlighted: J };
    })), L3 = (l, h5) => {
      h5 !== void 0 ? l.value = h5 : l.value = !l.value, l.value || a3("overlay-closed");
    }, ne = (l = false, h5) => {
      d3(l), L3(F, h5);
    }, O3 = (l = false, h5) => {
      d3(l), L3(b3, h5);
    }, d3 = (l) => {
      l || a3("reset-flow");
    }, Y3 = (l, h5) => {
      n.arrowNavigation && (_.value[h5] = Re(l), M3(_.value, "monthYear"));
    }, Z = computed(() => {
      var l, h5;
      return [
        {
          type: Qe.month,
          index: 1,
          toggle: ne,
          modelValue: ae.value,
          updateModelValue: (s3) => ae.value = s3,
          text: E3.value.text,
          showSelectionGrid: F.value,
          items: f.value,
          ariaLabel: (l = i3.value) == null ? void 0 : l.openMonthsOverlay
        },
        {
          type: Qe.year,
          index: 2,
          toggle: O3,
          modelValue: V3.value,
          updateModelValue: (s3) => V3.value = s3,
          text: n.year,
          showSelectionGrid: b3.value,
          items: w3.value,
          ariaLabel: (h5 = i3.value) == null ? void 0 : h5.openYearsOverlay
        }
      ];
    }), y3 = computed(() => n.disableYearSelect ? [Z.value[0]] : n.yearFirst ? [...Z.value].reverse() : Z.value);
    return t3({
      toggleMonthPicker: ne,
      toggleYearPicker: O3,
      handleMonthYearChange: C
    }), (l, h5) => {
      var s3, J, de;
      return openBlock(), createElementBlock("div", to, [
        l.$slots["month-year"] ? renderSlot(l.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e3.month, year: e3.year, months: e3.months, years: e3.years, updateMonthYear: unref(q3), handleMonthYearChange: unref(C), instance: e3.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(g)(unref(c3), e3.instance) && !l.vertical ? (openBlock(), createBlock(It, {
            key: 0,
            "aria-label": (s3 = unref(i3)) == null ? void 0 : s3.prevMonth,
            disabled: unref(A)(false),
            onActivate: h5[0] || (h5[0] = ($) => unref(C)(false, true)),
            onSetRef: h5[1] || (h5[1] = ($) => Y3($, 0))
          }, {
            default: withCtx(() => [
              l.$slots["arrow-left"] ? renderSlot(l.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              l.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(En), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["dp__month_year_wrap", {
              dp__year_disable_select: l.disableYearSelect
            }])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(y3.value, ($, u3) => (openBlock(), createElementBlock(Fragment, {
              key: $.type
            }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (I3) => Y3(I3, u3 + 1),
                type: "button",
                class: "dp__btn dp__month_year_select",
                tabindex: "0",
                "aria-label": $.ariaLabel,
                onClick: $.toggle,
                onKeydown: [
                  withKeys(withModifiers($.toggle, ["prevent"]), ["enter"]),
                  withKeys(withModifiers($.toggle, ["prevent"]), ["space"])
                ]
              }, [
                l.$slots[$.type] ? renderSlot(l.$slots, $.type, {
                  key: 0,
                  text: $.text,
                  value: n[$.type]
                }) : createCommentVNode("", true),
                l.$slots[$.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString($.text), 1)
                ], 64))
              ], 40, no),
              createVNode(Transition, {
                name: unref(R3)($.showSelectionGrid),
                css: unref(P)
              }, {
                default: withCtx(() => [
                  $.showSelectionGrid ? (openBlock(), createBlock(zt, {
                    key: 0,
                    items: $.items,
                    "arrow-navigation": l.arrowNavigation,
                    "hide-navigation": l.hideNavigation,
                    "is-last": l.autoApply && !unref(T3).keepActionRow,
                    "skip-button-ref": false,
                    config: l.config,
                    type: $.type,
                    "header-refs": [],
                    "esc-close": l.escClose,
                    "text-input": l.textInput,
                    onSelected: $.updateModelValue,
                    onToggle: $.toggle
                  }, createSlots({
                    "button-icon": withCtx(() => [
                      l.$slots["calendar-icon"] ? renderSlot(l.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                      l.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ot), { key: 1 }))
                    ]),
                    _: 2
                  }, [
                    l.$slots[`${$.type}-overlay-value`] ? {
                      name: "item",
                      fn: withCtx(({ item: I3 }) => [
                        renderSlot(l.$slots, `${$.type}-overlay-value`, {
                          text: I3.text,
                          value: I3.value
                        })
                      ]),
                      key: "0"
                    } : void 0,
                    l.$slots[`${$.type}-overlay`] ? {
                      name: "overlay",
                      fn: withCtx(() => [
                        renderSlot(l.$slots, `${$.type}-overlay`, normalizeProps(guardReactiveProps(ie2.value($.type))))
                      ]),
                      key: "1"
                    } : void 0,
                    l.$slots[`${$.type}-overlay-header`] ? {
                      name: "header",
                      fn: withCtx(() => [
                        renderSlot(l.$slots, `${$.type}-overlay-header`, {
                          toggle: $.toggle
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
          unref(g)(unref(c3), e3.instance) && l.vertical ? (openBlock(), createBlock(It, {
            key: 1,
            "aria-label": (J = unref(i3)) == null ? void 0 : J.prevMonth,
            disabled: unref(A)(false),
            onActivate: h5[2] || (h5[2] = ($) => unref(C)(false, true))
          }, {
            default: withCtx(() => [
              l.$slots["arrow-up"] ? renderSlot(l.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
              l.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Vn), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          unref(S3)(unref(c3), e3.instance) ? (openBlock(), createBlock(It, {
            key: 2,
            ref: "rightIcon",
            disabled: unref(A)(true),
            "aria-label": (de = unref(i3)) == null ? void 0 : de.nextMonth,
            onActivate: h5[3] || (h5[3] = ($) => unref(C)(true, true)),
            onSetRef: h5[4] || (h5[4] = ($) => Y3($, l.disableYearSelect ? 2 : 3))
          }, {
            default: withCtx(() => [
              l.$slots[l.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(l.$slots, l.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
              l.$slots[l.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(l.vertical ? unref(Ln) : unref(Fn)), { key: 1 }))
            ]),
            _: 3
          }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
});
var ro = ["aria-label"];
var lo = {
  class: "dp__calendar_header",
  role: "row"
};
var oo = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var so = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var io = ["aria-label"];
var uo = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var co = { class: "dp__cell_inner" };
var fo = ["id", "aria-selected", "aria-disabled", "aria-label", "onClick", "onKeydown", "onMouseenter", "onMouseleave"];
var vo = defineComponent({
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
  setup(e3, { expose: t3, emit: r }) {
    const a3 = r, n = e3, { buildMultiLevelMatrix: o } = yt(), {
      defaultedTransitions: i3,
      defaultedConfig: c3,
      defaultedAriaLabels: p,
      defaultedMultiCalendars: T3,
      defaultedWeekNumbers: D3
    } = Pe(n), R3 = ref(null), P = ref({
      bottom: "",
      left: "",
      transform: ""
    }), M3 = ref([]), C = ref(null), A = ref(true), q3 = ref(""), g = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), S3 = ref([]), F = ref({ left: "50%" }), b3 = computed(() => n.calendar ? n.calendar(n.mappedDates) : n.mappedDates), _ = computed(() => n.dayNames ? Array.isArray(n.dayNames) ? n.dayNames : n.dayNames(n.locale, +n.weekStart) : Hr(n.formatLocale, n.locale, +n.weekStart));
    onMounted(() => {
      a3("mount", { cmp: "calendar", refs: M3 }), c3.value.noSwipe || C.value && (C.value.addEventListener("touchstart", O3, { passive: false }), C.value.addEventListener("touchend", d3, { passive: false }), C.value.addEventListener("touchmove", Y3, { passive: false })), n.monthChangeOnScroll && C.value && C.value.addEventListener("wheel", l, { passive: false });
    });
    const X3 = ($) => $ ? n.vertical ? "vNext" : "next" : n.vertical ? "vPrevious" : "previous", ae = ($, u3) => {
      if (n.transitions) {
        const I3 = Fe(ot(B2(), n.month, n.year));
        q3.value = Ee(Fe(ot(B2(), $, u3)), I3) ? i3.value[X3(true)] : i3.value[X3(false)], A.value = false, nextTick(() => {
          A.value = true;
        });
      }
    }, V3 = computed(
      () => ({
        [n.calendarClassName]: !!n.calendarClassName
      })
    ), ie2 = computed(() => ($) => {
      const u3 = Lr($);
      return {
        dp__marker_dot: u3.type === "dot",
        dp__marker_line: u3.type === "line"
      };
    }), E3 = computed(() => ($) => ke($, R3.value)), f = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: T3.value.count > 0 && n.instance !== 0
    })), w3 = computed(() => ($) => n.hideOffsetDates ? $.current : true), L3 = async ($, u3, I3) => {
      var Q3, K3;
      if (a3("set-hover-date", $), (K3 = (Q3 = $.marker) == null ? void 0 : Q3.tooltip) != null && K3.length) {
        const te = Re(M3.value[u3][I3]);
        if (te) {
          const { width: le, height: be2 } = te.getBoundingClientRect();
          R3.value = $.value;
          let N = { left: `${le / 2}px` }, U = -50;
          if (await nextTick(), S3.value[0]) {
            const { left: Me, width: G3 } = S3.value[0].getBoundingClientRect();
            Me < 0 && (N = { left: "0" }, U = 0, F.value.left = `${le / 2}px`), window.innerWidth < Me + G3 && (N = { right: "0" }, U = 0, F.value.left = `${G3 - le / 2}px`);
          }
          P.value = {
            bottom: `${be2}px`,
            ...N,
            transform: `translateX(${U}%)`
          }, a3("tooltip-open", $.marker);
        }
      }
    }, ne = ($) => {
      R3.value && (R3.value = null, P.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a3("tooltip-close", $.marker));
    }, O3 = ($) => {
      g.value.startX = $.changedTouches[0].screenX, g.value.startY = $.changedTouches[0].screenY;
    }, d3 = ($) => {
      g.value.endX = $.changedTouches[0].screenX, g.value.endY = $.changedTouches[0].screenY, Z();
    }, Y3 = ($) => {
      n.vertical && !n.inline && $.preventDefault();
    }, Z = () => {
      const $ = n.vertical ? "Y" : "X";
      Math.abs(g.value[`start${$}`] - g.value[`end${$}`]) > 10 && a3("handle-swipe", g.value[`start${$}`] > g.value[`end${$}`] ? "right" : "left");
    }, y3 = ($, u3, I3) => {
      $ && (Array.isArray(M3.value[u3]) ? M3.value[u3][I3] = $ : M3.value[u3] = [$]), n.arrowNavigation && o(M3.value, "calendar");
    }, l = ($) => {
      n.monthChangeOnScroll && ($.preventDefault(), a3("handle-scroll", $));
    }, h5 = ($) => D3.value.type === "local" ? getWeek($.value, { weekStartsOn: +n.weekStart }) : D3.value.type === "iso" ? getISOWeek($.value) : typeof D3.value.type == "function" ? D3.value.type($.value) : "", s3 = ($) => {
      const u3 = $[0];
      return D3.value.hideOnOffsetDates ? $.some((I3) => I3.current) ? h5(u3) : "" : h5(u3);
    }, J = ($, u3) => {
      ft($, c3.value), a3("select-date", u3);
    }, de = ($) => {
      ft($, c3.value);
    };
    return t3({ triggerTransition: ae }), ($, u3) => {
      var I3;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(f.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: C,
          role: "grid",
          class: normalizeClass(V3.value),
          "aria-label": (I3 = unref(p)) == null ? void 0 : I3.calendarWrap
        }, [
          (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", lo, [
              $.weekNumbers ? (openBlock(), createElementBlock("div", oo, toDisplayString($.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(_.value, (Q3, K3) => (openBlock(), createElementBlock("div", {
                key: K3,
                class: "dp__calendar_header_item",
                role: "gridcell"
              }, [
                $.$slots["calendar-header"] ? renderSlot($.$slots, "calendar-header", {
                  key: 0,
                  day: Q3,
                  index: K3
                }) : createCommentVNode("", true),
                $.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(Q3), 1)
                ], 64))
              ]))), 128))
            ]),
            so,
            createVNode(Transition, {
              name: q3.value,
              css: !!$.transitions
            }, {
              default: withCtx(() => {
                var Q3;
                return [
                  A.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "rowgroup",
                    "aria-label": ((Q3 = unref(p)) == null ? void 0 : Q3.calendarDays) || void 0
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(b3.value, (K3, te) => (openBlock(), createElementBlock("div", {
                      key: te,
                      class: "dp__calendar_row",
                      role: "row"
                    }, [
                      $.weekNumbers ? (openBlock(), createElementBlock("div", uo, [
                        createBaseVNode("div", co, toDisplayString(s3(K3.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(K3.days, (le, be2) => {
                        var N, U, Me;
                        return openBlock(), createElementBlock("div", {
                          id: le.value.toISOString().split("T")[0],
                          ref_for: true,
                          ref: (G3) => y3(G3, te, be2),
                          key: be2 + te,
                          role: "gridcell",
                          class: "dp__calendar_item",
                          "aria-selected": le.classData.dp__active_date || le.classData.dp__range_start || le.classData.dp__range_start,
                          "aria-disabled": le.classData.dp__cell_disabled || void 0,
                          "aria-label": (U = (N = unref(p)) == null ? void 0 : N.day) == null ? void 0 : U.call(N, le),
                          tabindex: "0",
                          onClick: withModifiers((G3) => J(G3, le), ["prevent"]),
                          onKeydown: [
                            withKeys((G3) => $.$emit("select-date", le), ["enter"]),
                            withKeys((G3) => $.$emit("handle-space", le), ["space"])
                          ],
                          onMouseenter: (G3) => L3(le, te, be2),
                          onMouseleave: (G3) => ne(le)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", le.classData])
                          }, [
                            $.$slots.day && w3.value(le) ? renderSlot($.$slots, "day", {
                              key: 0,
                              day: +le.text,
                              date: le.value
                            }) : createCommentVNode("", true),
                            $.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(le.text), 1)
                            ], 64)),
                            le.marker && w3.value(le) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              $.$slots.marker ? renderSlot($.$slots, "marker", {
                                key: 0,
                                marker: le.marker,
                                day: +le.text,
                                date: le.value
                              }) : (openBlock(), createElementBlock("div", {
                                key: 1,
                                class: normalizeClass(ie2.value(le.marker)),
                                style: normalizeStyle(le.marker.color ? { backgroundColor: le.marker.color } : {})
                              }, null, 6))
                            ], 64)) : createCommentVNode("", true),
                            E3.value(le.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: S3,
                              class: "dp__marker_tooltip",
                              style: normalizeStyle(P.value)
                            }, [
                              (Me = le.marker) != null && Me.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: de
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(le.marker.tooltip, (G3, We) => (openBlock(), createElementBlock("div", {
                                  key: We,
                                  class: "dp__tooltip_text"
                                }, [
                                  $.$slots["marker-tooltip"] ? renderSlot($.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: G3,
                                    day: le.value
                                  }) : createCommentVNode("", true),
                                  $.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(G3.color ? { backgroundColor: G3.color } : {})
                                    }, null, 4),
                                    createBaseVNode("div", null, toDisplayString(G3.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createBaseVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(F.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, fo);
                      }), 128))
                    ]))), 128))
                  ], 8, io)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 64))
        ], 10, ro)
      ], 2);
    };
  }
});
var ha = (e3) => Array.isArray(e3);
var mo = (e3, t3, r, a3) => {
  const n = ref([]), { modelValue: o, calendars: i3, time: c3 } = Ut(e3, t3), { defaultedMultiCalendars: p, defaultedStartTime: T3 } = Pe(e3), { validateMonthYearInRange: D3, isDisabled: R3, isDateRangeAllowed: P, checkMinMaxRange: M3 } = $t(e3), { updateTimeValues: C, getSetDateTime: A, setTime: q3, assignStartTime: g, validateTime: S3, disabledTimesConfig: F } = ja(e3, c3, o, a3), b3 = computed(
    () => (m3) => i3.value[m3] ? i3.value[m3].month : 0
  ), _ = computed(
    () => (m3) => i3.value[m3] ? i3.value[m3].year : 0
  ), X3 = (m3, W, oe) => {
    var me2, Se2;
    i3.value[m3] || (i3.value[m3] = { month: 0, year: 0 }), i3.value[m3].month = fa(W) ? (me2 = i3.value[m3]) == null ? void 0 : me2.month : W, i3.value[m3].year = fa(oe) ? (Se2 = i3.value[m3]) == null ? void 0 : Se2.year : oe;
  }, ae = () => {
    e3.autoApply && t3("select-date");
  };
  watch(o, (m3, W) => {
    JSON.stringify(m3) !== JSON.stringify(W) && E3();
  }), onMounted(() => {
    e3.shadow || (o.value || (l(), T3.value && g(T3.value)), E3(true), e3.focusStartDate && e3.startDate && l());
  });
  const V3 = computed(() => {
    var m3;
    return (m3 = e3.flow) != null && m3.length && !e3.partialFlow ? e3.flowStep === e3.flow.length : true;
  }), ie2 = () => {
    e3.autoApply && V3.value && t3("auto-apply", e3.partialFlow);
  }, E3 = (m3 = false) => {
    if (o.value)
      return Array.isArray(o.value) ? (n.value = o.value, d3(m3)) : w3(o.value, m3);
    if (p.value.count && m3 && !e3.startDate)
      return f(B2(), m3);
  }, f = (m3, W = false) => {
    if ((!p.value.count || !p.value.static || W) && X3(0, getMonth(m3), getYear(m3)), p.value.count && (!p.value.solo || !o.value))
      for (let oe = 1; oe < p.value.count; oe++) {
        const me2 = set(B2(), { month: b3.value(oe - 1), year: _.value(oe - 1) }), Se2 = add(me2, { months: 1 });
        i3.value[oe] = { month: getMonth(Se2), year: getYear(Se2) };
      }
  }, w3 = (m3, W) => {
    f(m3), q3("hours", getHours(m3)), q3("minutes", getMinutes(m3)), q3("seconds", getSeconds(m3)), p.value.count && W && y3();
  }, L3 = (m3) => {
    if (p.value.count) {
      if (p.value.solo)
        return 0;
      const W = getMonth(m3[0]), oe = getMonth(m3[1]);
      return Math.abs(oe - W) < p.value.count ? 0 : 1;
    }
    return 1;
  }, ne = (m3, W) => {
    m3[1] && e3.showLastInRange ? f(m3[L3(m3)], W) : f(m3[0], W);
    const oe = (me2, Se2) => [
      me2(m3[0]),
      m3[1] ? me2(m3[1]) : c3[Se2][1]
    ];
    q3("hours", oe(getHours, "hours")), q3("minutes", oe(getMinutes, "minutes")), q3("seconds", oe(getSeconds, "seconds"));
  }, O3 = (m3, W) => {
    if ((e3.range || e3.weekPicker) && !e3.multiDates)
      return ne(m3, W);
    if (e3.multiDates && W) {
      const oe = m3[m3.length - 1];
      return w3(oe, W);
    }
  }, d3 = (m3) => {
    const W = o.value;
    O3(W, m3), p.value.count && p.value.solo && y3();
  }, Y3 = (m3, W) => {
    const oe = set(B2(), { month: b3.value(W), year: _.value(W) }), me2 = m3 < 0 ? addMonths(oe, 1) : subMonths(oe, 1);
    D3(getMonth(me2), getYear(me2), m3 < 0, e3.preventMinMaxNavigation) && (X3(W, getMonth(me2), getYear(me2)), t3("update-month-year", { instance: W, month: getMonth(me2), year: getYear(me2) }), p.value.count && !p.value.solo && Z(W), r());
  }, Z = (m3) => {
    for (let W = m3 - 1; W >= 0; W--) {
      const oe = subMonths(set(B2(), { month: b3.value(W + 1), year: _.value(W + 1) }), 1);
      X3(W, getMonth(oe), getYear(oe));
    }
    for (let W = m3 + 1; W <= p.value.count - 1; W++) {
      const oe = addMonths(set(B2(), { month: b3.value(W - 1), year: _.value(W - 1) }), 1);
      X3(W, getMonth(oe), getYear(oe));
    }
  }, y3 = () => {
    if (Array.isArray(o.value) && o.value.length === 2) {
      const m3 = B2(
        B2(o.value[1] ? o.value[1] : addMonths(o.value[0], 1))
      ), [W, oe] = [getMonth(o.value[0]), getYear(o.value[0])], [me2, Se2] = [getMonth(o.value[1]), getYear(o.value[1])];
      (W !== me2 || W === me2 && oe !== Se2) && p.value.solo && X3(1, getMonth(m3), getYear(m3));
    } else
      o.value && !Array.isArray(o.value) && (X3(0, getMonth(o.value), getYear(o.value)), f(B2()));
  }, l = () => {
    e3.startDate && (X3(0, getMonth(B2(e3.startDate)), getYear(B2(e3.startDate))), p.value.count && Z(0));
  }, h5 = Kr((m3, W) => {
    e3.monthChangeOnScroll && Y3(e3.monthChangeOnScroll !== "inverse" ? -m3.deltaY : m3.deltaY, W);
  }, 50), s3 = (m3, W, oe = false) => {
    e3.monthChangeOnArrows && e3.vertical === oe && J(m3, W);
  }, J = (m3, W) => {
    Y3(m3 === "right" ? -1 : 1, W);
  }, de = (m3) => e3.markers.find(
    (W) => ke(Zr(m3.value), et(B2(W.date), e3.timezone))
  ), $ = (m3, W) => {
    switch (e3.sixWeeks === true ? "append" : e3.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [m3 == 0, true];
      case "fair":
        return [m3 == 0 || W > m3, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, u3 = (m3, W, oe, me2) => {
    if (e3.sixWeeks && m3.length < 6) {
      const Se2 = 6 - m3.length, nt2 = (W.getDay() + 7 - me2) % 7, ue2 = 6 - (oe.getDay() + 7 - me2) % 7, [se, ht2] = $(nt2, ue2);
      for (let Ke = 1; Ke <= Se2; Ke++)
        if (ht2 ? !!(Ke % 2) == se : se) {
          const Gt2 = m3[0].days[0], cn = I3(addDays(Gt2.value, -7), getMonth(W));
          m3.unshift({ days: cn });
        } else {
          const Gt2 = m3[m3.length - 1], cn = Gt2.days[Gt2.days.length - 1], Ga2 = I3(addDays(cn.value, 1), getMonth(W));
          m3.push({ days: Ga2 });
        }
    }
    return m3;
  }, I3 = (m3, W) => {
    const oe = B2(m3), me2 = [];
    for (let Se2 = 0; Se2 < 7; Se2++) {
      const nt2 = addDays(oe, Se2), x3 = getMonth(nt2) !== W;
      me2.push({
        text: e3.hideOffsetDates && x3 ? "" : nt2.getDate(),
        value: nt2,
        current: !x3,
        classData: {}
      });
    }
    return me2;
  }, Q3 = (m3, W) => {
    const oe = [], me2 = new Date(W, m3), Se2 = new Date(W, m3 + 1, 0), nt2 = e3.weekStart, x3 = startOfWeek(me2, { weekStartsOn: nt2 }), ue2 = (se) => {
      const ht2 = I3(se, m3);
      if (oe.push({ days: ht2 }), !oe[oe.length - 1].days.some(
        (Ke) => ke(Fe(Ke.value), Fe(Se2))
      )) {
        const Ke = addDays(se, 7);
        ue2(Ke);
      }
    };
    return ue2(x3), u3(oe, me2, Se2, nt2);
  }, K3 = (m3) => (o.value = xt(B2(m3.value), e3.timezone, e3.weekStart), t3("date-update", m3.value), ie2()), te = (m3) => {
    const W = vt(B2(m3.value), c3.hours, c3.minutes, je2());
    t3("date-update", W), e3.multiDates ? Gn(W, o, e3.multiDatesLimit) : o.value = W, a3(), nextTick().then(() => {
      ie2();
    });
  }, le = (m3) => e3.noDisabledRange ? Ia(n.value[0], m3).some((oe) => R3(oe)) : false, be2 = () => {
    n.value = o.value ? o.value.slice() : [], n.value.length === 2 && !(e3.fixedStart || e3.fixedEnd) && (n.value = []);
  }, N = (m3, W) => {
    const oe = [B2(m3.value), addDays(B2(m3.value), +e3.autoRange)];
    P(oe) ? (W && U(m3.value), n.value = oe) : t3("invalid-date", m3.value);
  }, U = (m3) => {
    const W = getMonth(B2(m3)), oe = getYear(B2(m3));
    if (X3(0, W, oe), p.value.count > 0)
      for (let me2 = 1; me2 < p.value.count; me2++) {
        const Se2 = Qr(
          set(B2(m3), { year: b3.value(me2 - 1), month: _.value(me2 - 1) })
        );
        X3(me2, Se2.month, Se2.year);
      }
  }, Me = (m3) => Array.isArray(o.value) && o.value.length === 2 ? e3.fixedStart && (Ee(m3, o.value[0]) || ke(m3, o.value[0])) ? [o.value[0], m3] : e3.fixedEnd && (Ye(m3, o.value[1]) || ke(m3, o.value[1])) ? [m3, o.value[1]] : (t3("invalid-fixed-range", m3), o.value) : [], G3 = (m3) => {
    if (le(m3.value) || !M3(m3.value, o.value, e3.fixedStart ? 0 : 1))
      return t3("invalid-date", m3.value);
    n.value = Me(B2(m3.value));
  }, We = (m3, W) => {
    if (be2(), e3.autoRange)
      return N(m3, W);
    if (e3.fixedStart || e3.fixedEnd)
      return G3(m3);
    n.value[0] ? M3(B2(m3.value), o.value) && !le(m3.value) ? Ye(B2(m3.value), B2(n.value[0])) ? (n.value.unshift(B2(m3.value)), t3("range-end", n.value[0])) : (n.value[1] = B2(m3.value), t3("range-end", n.value[1])) : (e3.autoApply && t3("auto-apply-invalid", m3.value), t3("invalid-date", m3.value)) : (n.value[0] = B2(m3.value), t3("range-start", n.value[0]));
  }, je2 = (m3 = true) => e3.enableSeconds ? Array.isArray(c3.seconds) ? m3 ? c3.seconds[0] : c3.seconds[1] : c3.seconds : 0, it2 = (m3) => {
    n.value[m3] = vt(
      n.value[m3],
      c3.hours[m3],
      c3.minutes[m3],
      je2(m3 !== 1)
    );
  }, Wt2 = () => {
    var m3, W;
    n.value[0] && n.value[1] && +((m3 = n.value) == null ? void 0 : m3[0]) > +((W = n.value) == null ? void 0 : W[1]) && (n.value.reverse(), t3("range-start", n.value[0]), t3("range-end", n.value[1]));
  }, jt2 = () => {
    n.value.length && (n.value[0] && !n.value[1] ? it2(0) : (it2(0), it2(1), a3()), Wt2(), o.value = n.value.slice(), on(n.value, t3, e3.autoApply, e3.modelAuto));
  }, sn = (m3, W = false) => {
    if (R3(m3.value) || !m3.current && e3.hideOffsetDates)
      return t3("invalid-date", m3.value);
    if (e3.weekPicker)
      return K3(m3);
    if (!e3.range)
      return te(m3);
    ha(c3.hours) && ha(c3.minutes) && !e3.multiDates && (We(m3, W), jt2());
  }, Yt2 = (m3, W) => {
    var me2;
    X3(m3, W.month, W.year), p.value.count && !p.value.solo && Z(m3), t3("update-month-year", { instance: m3, month: W.month, year: W.year }), r(p.value.solo ? m3 : void 0);
    const oe = (me2 = e3.flow) != null && me2.length ? e3.flow[e3.flowStep] : void 0;
    !W.fromNav && (oe === at.month || oe === at.year) && a3();
  }, Ze2 = (m3, W) => {
    Ua({ value: m3, modelValue: o, range: e3.range, timezone: W ? void 0 : e3.timezone }), ae(), e3.multiCalendars && nextTick().then(() => E3(true));
  }, un = () => {
    e3.range ? o.value && Array.isArray(o.value) && o.value[0] ? o.value = Ye(B2(), o.value[0]) ? [B2(), o.value[0]] : [o.value[0], B2()] : o.value = [B2()] : o.value = B2(), ae();
  }, dn = () => {
    if (Array.isArray(o.value))
      if (e3.multiDates) {
        const m3 = Kt2();
        o.value[o.value.length - 1] = A(m3);
      } else
        o.value = o.value.map((m3, W) => m3 && A(m3, W));
    else
      o.value = A(o.value);
    t3("time-update");
  }, Kt2 = () => Array.isArray(o.value) && o.value.length ? o.value[o.value.length - 1] : null;
  return {
    calendars: i3,
    modelValue: o,
    month: b3,
    year: _,
    time: c3,
    disabledTimesConfig: F,
    validateTime: S3,
    getCalendarDays: Q3,
    getMarker: de,
    handleScroll: h5,
    handleSwipe: J,
    handleArrow: s3,
    selectDate: sn,
    updateMonthYear: Yt2,
    presetDate: Ze2,
    selectCurrentDate: un,
    updateTime: (m3, W = true, oe = false) => {
      C(m3, W, oe, dn);
    }
  };
};
var go = { key: 0 };
var yo = defineComponent({
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
  setup(e3, { expose: t3, emit: r }) {
    const a3 = r, n = e3, {
      calendars: o,
      month: i3,
      year: c3,
      modelValue: p,
      time: T3,
      disabledTimesConfig: D3,
      validateTime: R3,
      getCalendarDays: P,
      getMarker: M3,
      handleArrow: C,
      handleScroll: A,
      handleSwipe: q3,
      selectDate: g,
      updateMonthYear: S3,
      presetDate: F,
      selectCurrentDate: b3,
      updateTime: _
    } = mo(n, a3, y3, l), X3 = useSlots(), { setHoverDate: ae, getDayClassData: V3, clearHoverDate: ie2 } = hl(p, n), { defaultedMultiCalendars: E3 } = Pe(n), f = ref([]), w3 = ref([]), L3 = ref(null), ne = qe(X3, "calendar"), O3 = qe(X3, "monthYear"), d3 = qe(X3, "timePicker"), Y3 = (u3) => {
      n.shadow || a3("mount", u3);
    };
    watch(
      o,
      () => {
        n.shadow || setTimeout(() => {
          a3("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const Z = computed(() => (u3) => P(i3.value(u3), c3.value(u3)).map((I3) => ({
      ...I3,
      days: I3.days.map((Q3) => (Q3.marker = M3(Q3), Q3.classData = V3(Q3), Q3))
    })));
    function y3(u3) {
      var I3;
      u3 || u3 === 0 ? (I3 = w3.value[u3]) == null || I3.triggerTransition(i3.value(u3), c3.value(u3)) : w3.value.forEach((Q3, K3) => Q3.triggerTransition(i3.value(K3), c3.value(K3)));
    }
    function l() {
      a3("update-flow-step");
    }
    const h5 = (u3, I3 = false) => {
      g(u3, I3), n.spaceConfirm && a3("select-date");
    };
    return t3({
      clearHoverDate: ie2,
      presetDate: F,
      selectCurrentDate: b3,
      toggleMonthPicker: (u3, I3, Q3 = 0) => {
        var K3;
        (K3 = f.value[Q3]) == null || K3.toggleMonthPicker(u3, I3);
      },
      toggleYearPicker: (u3, I3, Q3 = 0) => {
        var K3;
        (K3 = f.value[Q3]) == null || K3.toggleYearPicker(u3, I3);
      },
      toggleTimePicker: (u3, I3, Q3) => {
        var K3;
        (K3 = L3.value) == null || K3.toggleTimePicker(u3, I3, Q3);
      },
      handleArrow: C,
      updateMonthYear: S3,
      getSidebarProps: () => ({
        modelValue: p,
        month: i3,
        year: c3,
        time: T3,
        updateTime: _,
        updateMonthYear: S3,
        selectDate: g,
        presetDate: F
      })
    }), (u3, I3) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(ln, {
        "multi-calendars": unref(E3).count
      }, {
        default: withCtx(({ instance: Q3, index: K3 }) => [
          u3.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(ao, mergeProps({
            key: 0,
            ref: (te) => {
              te && (f.value[K3] = te);
            },
            months: unref(_a)(u3.formatLocale, u3.locale, u3.monthNameFormat),
            years: unref(jn)(u3.yearRange, u3.reverseYears),
            month: unref(i3)(Q3),
            year: unref(c3)(Q3),
            instance: Q3
          }, u3.$props, {
            onMount: I3[0] || (I3[0] = (te) => Y3(unref(Dt).header)),
            onResetFlow: I3[1] || (I3[1] = (te) => u3.$emit("reset-flow")),
            onUpdateMonthYear: (te) => unref(S3)(Q3, te),
            onOverlayClosed: I3[2] || (I3[2] = (te) => u3.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(O3), (te, le) => ({
              name: te,
              fn: withCtx((be2) => [
                renderSlot(u3.$slots, te, normalizeProps(guardReactiveProps(be2)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(vo, mergeProps({
            ref: (te) => {
              te && (w3.value[K3] = te);
            },
            "mapped-dates": Z.value(Q3),
            month: unref(i3)(Q3),
            year: unref(c3)(Q3),
            instance: Q3
          }, u3.$props, {
            onSelectDate: (te) => unref(g)(te, Q3 !== 1),
            onHandleSpace: (te) => h5(te, Q3 !== 1),
            onSetHoverDate: I3[3] || (I3[3] = (te) => unref(ae)(te)),
            onHandleScroll: (te) => unref(A)(te, Q3),
            onHandleSwipe: (te) => unref(q3)(te, Q3),
            onMount: I3[4] || (I3[4] = (te) => Y3(unref(Dt).calendar)),
            onResetFlow: I3[5] || (I3[5] = (te) => u3.$emit("reset-flow")),
            onTooltipOpen: I3[6] || (I3[6] = (te) => u3.$emit("tooltip-open", te)),
            onTooltipClose: I3[7] || (I3[7] = (te) => u3.$emit("tooltip-close", te))
          }), createSlots({ _: 2 }, [
            renderList(unref(ne), (te, le) => ({
              name: te,
              fn: withCtx((be2) => [
                renderSlot(u3.$slots, te, normalizeProps(guardReactiveProps({ ...be2 })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars"]),
      u3.enableTimePicker ? (openBlock(), createElementBlock("div", go, [
        u3.$slots["time-picker"] ? renderSlot(u3.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(T3), updateTime: unref(_) }))) : (openBlock(), createBlock(Wa, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: L3
        }, u3.$props, {
          hours: unref(T3).hours,
          minutes: unref(T3).minutes,
          seconds: unref(T3).seconds,
          "internal-model-value": u3.internalModelValue,
          "disabled-times-config": unref(D3),
          "validate-time": unref(R3),
          onMount: I3[8] || (I3[8] = (Q3) => Y3(unref(Dt).timePicker)),
          "onUpdate:hours": I3[9] || (I3[9] = (Q3) => unref(_)(Q3)),
          "onUpdate:minutes": I3[10] || (I3[10] = (Q3) => unref(_)(Q3, false)),
          "onUpdate:seconds": I3[11] || (I3[11] = (Q3) => unref(_)(Q3, false, true)),
          onResetFlow: I3[12] || (I3[12] = (Q3) => u3.$emit("reset-flow")),
          onOverlayClosed: I3[13] || (I3[13] = (Q3) => u3.$emit("time-picker-close")),
          onOverlayOpened: I3[14] || (I3[14] = (Q3) => u3.$emit("time-picker-open", Q3)),
          onAmPmChange: I3[15] || (I3[15] = (Q3) => u3.$emit("am-pm-change", Q3))
        }), createSlots({ _: 2 }, [
          renderList(unref(d3), (Q3, K3) => ({
            name: Q3,
            fn: withCtx((te) => [
              renderSlot(u3.$slots, Q3, normalizeProps(guardReactiveProps(te)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var ho = (e3, t3) => {
  const r = ref(), { defaultedMultiCalendars: a3, defaultedConfig: n, defaultedHighlight: o } = Pe(e3), { modelValue: i3, year: c3, month: p, calendars: T3 } = Ut(e3, t3), { isDisabled: D3 } = $t(e3), { selectYear: R3, groupedYears: P, showYearPicker: M3, isDisabled: C, toggleYearPicker: A, handleYearSelect: q3, handleYear: g } = za({
    modelValue: i3,
    multiCalendars: a3,
    highlight: o,
    calendars: T3,
    month: p,
    year: c3,
    props: e3,
    emit: t3
  }), S3 = (f, w3) => [f, w3].map((L3) => format(L3, "MMMM", { locale: e3.formatLocale })).join("-"), F = computed(() => (f) => i3.value ? Array.isArray(i3.value) ? i3.value.some((w3) => isSameQuarter(f, w3)) : isSameQuarter(i3.value, f) : false), b3 = (f) => {
    if (e3.range) {
      if (Array.isArray(i3.value)) {
        const w3 = ke(f, i3.value[0]) || ke(f, i3.value[1]);
        return nn(i3.value, r.value, f) && !w3;
      }
      return false;
    }
    return false;
  }, _ = computed(() => (f) => {
    const w3 = set(/* @__PURE__ */ new Date(), { year: c3.value(f) });
    return eachQuarterOfInterval({
      start: startOfYear(w3),
      end: endOfYear(w3)
    }).map((L3) => {
      const ne = startOfQuarter(L3), O3 = endOfQuarter(L3), d3 = D3(L3), Y3 = b3(ne), Z = typeof o.value == "function" ? o.value({ quarter: getQuarter(ne), year: getYear(ne) }) : !!o.value.quarters.find(
        (y3) => y3.quarter === getQuarter(ne) && y3.year === getYear(ne)
      );
      return {
        text: S3(ne, O3),
        value: ne,
        active: F.value(ne),
        highlighted: Z,
        disabled: d3,
        isBetween: Y3
      };
    });
  }), X3 = (f) => {
    Gn(f, i3, e3.multiDatesLimit), t3("auto-apply", true);
  }, ae = (f) => {
    const w3 = qn(i3, f, t3);
    on(w3, t3, e3.autoApply, e3.modelAuto);
  }, V3 = (f) => {
    i3.value = f, t3("auto-apply");
  };
  return {
    defaultedConfig: n,
    defaultedMultiCalendars: a3,
    groupedYears: P,
    year: c3,
    isDisabled: C,
    quarters: _,
    showYearPicker: M3,
    modelValue: i3,
    setHoverDate: (f) => {
      r.value = f;
    },
    selectYear: R3,
    selectQuarter: (f, w3, L3) => {
      if (!L3)
        return T3.value[w3].month = getMonth(endOfQuarter(f)), e3.multiDates ? X3(f) : e3.range ? ae(f) : V3(f);
    },
    toggleYearPicker: A,
    handleYearSelect: q3,
    handleYear: g
  };
};
var po = { class: "dp--quarter-items" };
var bo = ["disabled", "onClick", "onMouseover"];
var ko = defineComponent({
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
  setup(e3, { expose: t3, emit: r }) {
    const a3 = r, n = e3, o = useSlots(), i3 = qe(o, "yearMode"), {
      defaultedMultiCalendars: c3,
      defaultedConfig: p,
      groupedYears: T3,
      year: D3,
      isDisabled: R3,
      quarters: P,
      modelValue: M3,
      showYearPicker: C,
      setHoverDate: A,
      selectQuarter: q3,
      toggleYearPicker: g,
      handleYearSelect: S3,
      handleYear: F
    } = ho(n, a3);
    return t3({ getSidebarProps: () => ({
      modelValue: M3,
      year: D3,
      selectQuarter: q3,
      handleYearSelect: S3,
      handleYear: F
    }) }), (_, X3) => (openBlock(), createBlock(ln, {
      "multi-calendars": unref(c3).count,
      stretch: ""
    }, {
      default: withCtx(({ instance: ae }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(p).modeHeight}px` })
        }, [
          createBaseVNode("div", null, [
            createVNode(La, mergeProps(_.$props, {
              items: unref(T3)(ae),
              instance: ae,
              "show-year-picker": unref(C)[ae],
              year: unref(D3)(ae),
              "is-disabled": (V3) => unref(R3)(ae, V3),
              onHandleYear: (V3) => unref(F)(ae, V3),
              onYearSelect: (V3) => unref(S3)(V3, ae),
              onToggleYearPicker: (V3) => unref(g)(ae, V3 == null ? void 0 : V3.flow, V3 == null ? void 0 : V3.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(i3), (V3, ie2) => ({
                name: V3,
                fn: withCtx((E3) => [
                  renderSlot(_.$slots, V3, normalizeProps(guardReactiveProps(E3)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", po, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(P)(ae), (V3, ie2) => (openBlock(), createElementBlock("div", { key: ie2 }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": V3.active,
                  "dp--qr-btn-between": V3.isBetween,
                  "dp--qr-btn-disabled": V3.disabled,
                  "dp--highlighted": V3.highlighted
                }]),
                disabled: V3.disabled,
                onClick: (E3) => unref(q3)(V3.value, ae, V3.disabled),
                onMouseover: (E3) => unref(A)(V3.value)
              }, [
                _.$slots.quarter ? renderSlot(_.$slots, "quarter", {
                  key: 0,
                  value: V3.value,
                  text: V3.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(V3.text), 1)
                ], 64))
              ], 42, bo)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars"]));
  }
});
var wo = ["id"];
var Do = {
  key: 0,
  class: "dp__sidebar_left"
};
var Mo = {
  key: 1,
  class: "dp--preset-dates"
};
var $o = ["onClick", "onKeydown"];
var To = {
  key: 2,
  class: "dp__sidebar_right"
};
var Ao = {
  key: 3,
  class: "dp__action_extra"
};
var pa = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...rn,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    arrMapValues: { type: Object, default: () => ({}) },
    noOverlayFocus: { type: Boolean, default: false }
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
  setup(e3, { expose: t3, emit: r }) {
    const a3 = r, n = e3, o = computed(() => {
      const { openOnTop: N, ...U } = n;
      return {
        ...U,
        flowStep: V3.value,
        noOverlayFocus: n.noOverlayFocus
      };
    }), { setMenuFocused: i3, setShiftKey: c3, control: p } = Va(), T3 = useSlots(), { defaultedTextInput: D3, defaultedInline: R3, defaultedConfig: P } = Pe(n), M3 = ref(null), C = ref(0), A = ref(null), q3 = ref(null), g = ref(false), S3 = ref(null);
    onMounted(() => {
      if (!n.shadow) {
        g.value = true, F(), window.addEventListener("resize", F);
        const N = Re(A);
        if (N && !D3.value.enabled && !R3.value.enabled && (i3(true), L3()), N) {
          const U = (Me) => {
            P.value.allowPreventDefault && Me.preventDefault(), ft(Me, P.value, true);
          };
          N.addEventListener("pointerdown", U), N.addEventListener("mousedown", U);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", F);
    });
    const F = () => {
      const N = Re(q3);
      N && (C.value = N.getBoundingClientRect().width);
    }, { arrowRight: b3, arrowLeft: _, arrowDown: X3, arrowUp: ae } = yt(), { flowStep: V3, updateFlowStep: ie2, childMount: E3, resetFlow: f } = pl(n, a3, S3), w3 = computed(() => n.monthPicker ? Il : n.yearPicker ? El : n.timePicker ? eo : n.quarterPicker ? ko : yo), L3 = () => {
      const N = Re(A);
      N && N.focus({ preventScroll: true });
    }, ne = computed(() => {
      var N;
      return ((N = S3.value) == null ? void 0 : N.getSidebarProps()) || {};
    }), O3 = () => {
      n.openOnTop && a3("recalculate-position");
    }, d3 = qe(T3, "action"), Y3 = computed(() => n.monthPicker || n.yearPicker ? qe(T3, "monthYear") : n.timePicker ? qe(T3, "timePicker") : qe(T3, "shared")), Z = computed(() => n.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), y3 = computed(() => ({
      dp__menu_disabled: n.disabled,
      dp__menu_readonly: n.readonly
    })), l = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !R3.value.enabled,
        dp__relative: R3.value.enabled,
        [n.menuClassName]: !!n.menuClassName
      })
    ), h5 = (N) => {
      ft(N, P.value, true);
    }, s3 = () => {
      n.escClose && a3("close-picker");
    }, J = (N) => {
      if (n.arrowNavigation) {
        if (N === "up")
          return ae();
        if (N === "down")
          return X3();
        if (N === "left")
          return _();
        if (N === "right")
          return b3();
      } else
        N === "left" || N === "up" ? Q3("handleArrow", "left", 0, N === "up") : Q3("handleArrow", "right", 0, N === "down");
    }, de = (N) => {
      c3(N.shiftKey), !n.disableMonthYearSelect && N.code === "Tab" && N.target.classList.contains("dp__menu") && p.value.shiftKeyInMenu && (N.preventDefault(), ft(N, P.value, true), a3("close-picker"));
    }, $ = () => {
      L3(), a3("time-picker-close");
    }, u3 = (N) => {
      var U, Me, G3;
      (U = S3.value) == null || U.toggleTimePicker(false, false), (Me = S3.value) == null || Me.toggleMonthPicker(false, false, N), (G3 = S3.value) == null || G3.toggleYearPicker(false, false, N);
    }, I3 = (N, U = 0) => {
      var Me, G3, We;
      return N === "month" ? (Me = S3.value) == null ? void 0 : Me.toggleMonthPicker(false, true, U) : N === "year" ? (G3 = S3.value) == null ? void 0 : G3.toggleYearPicker(false, true, U) : N === "time" ? (We = S3.value) == null ? void 0 : We.toggleTimePicker(true, false) : u3(U);
    }, Q3 = (N, ...U) => {
      var Me, G3;
      (Me = S3.value) != null && Me[N] && ((G3 = S3.value) == null || G3[N](...U));
    }, K3 = () => {
      Q3("selectCurrentDate");
    }, te = (N, U) => {
      Q3("presetDate", N, U);
    }, le = () => {
      Q3("clearHoverDate");
    };
    return t3({
      updateMonthYear: (N, U) => {
        Q3("updateMonthYear", N, U);
      },
      switchView: I3
    }), (N, U) => {
      var Me;
      return openBlock(), createElementBlock("div", {
        id: N.uid ? `dp-menu-${N.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: A,
        tabindex: "0",
        role: "dialog",
        class: normalizeClass(l.value),
        onMouseleave: le,
        onClick: h5,
        onKeydown: [
          withKeys(s3, ["esc"]),
          U[18] || (U[18] = withKeys(withModifiers((G3) => J("left"), ["prevent"]), ["left"])),
          U[19] || (U[19] = withKeys(withModifiers((G3) => J("up"), ["prevent"]), ["up"])),
          U[20] || (U[20] = withKeys(withModifiers((G3) => J("down"), ["prevent"]), ["down"])),
          U[21] || (U[21] = withKeys(withModifiers((G3) => J("right"), ["prevent"]), ["right"])),
          de
        ]
      }, [
        (N.disabled || N.readonly) && unref(R3).enabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(y3.value)
        }, null, 2)) : createCommentVNode("", true),
        !unref(R3).enabled && !N.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(Z.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: q3,
          class: normalizeClass({
            dp__menu_content_wrapper: ((Me = N.presetDates) == null ? void 0 : Me.length) || !!N.$slots["left-sidebar"] || !!N.$slots["right-sidebar"]
          }),
          style: normalizeStyle({ "--dp-menu-width": `${C.value}px` })
        }, [
          N.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Do, [
            renderSlot(N.$slots, "left-sidebar", normalizeProps(guardReactiveProps(ne.value)))
          ])) : createCommentVNode("", true),
          N.presetDates.length ? (openBlock(), createElementBlock("div", Mo, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(N.presetDates, (G3, We) => (openBlock(), createElementBlock(Fragment, { key: We }, [
              G3.slot ? renderSlot(N.$slots, G3.slot, {
                key: 0,
                presetDate: te,
                label: G3.label,
                value: G3.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(G3.style || {}),
                class: "dp__btn dp--preset-range",
                onClick: withModifiers((je2) => te(G3.value, G3.noTz), ["prevent"]),
                onKeydown: [
                  withKeys(withModifiers((je2) => te(G3.value, G3.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((je2) => te(G3.value, G3.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(G3.label), 45, $o))
            ], 64))), 128))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: M3,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(w3.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: S3
            }, o.value, {
              "flow-step": unref(V3),
              onMount: unref(E3),
              onUpdateFlowStep: unref(ie2),
              onResetFlow: unref(f),
              onFocusMenu: L3,
              onSelectDate: U[0] || (U[0] = (G3) => N.$emit("select-date")),
              onDateUpdate: U[1] || (U[1] = (G3) => N.$emit("date-update", G3)),
              onTooltipOpen: U[2] || (U[2] = (G3) => N.$emit("tooltip-open", G3)),
              onTooltipClose: U[3] || (U[3] = (G3) => N.$emit("tooltip-close", G3)),
              onAutoApply: U[4] || (U[4] = (G3) => N.$emit("auto-apply", G3)),
              onRangeStart: U[5] || (U[5] = (G3) => N.$emit("range-start", G3)),
              onRangeEnd: U[6] || (U[6] = (G3) => N.$emit("range-end", G3)),
              onInvalidFixedRange: U[7] || (U[7] = (G3) => N.$emit("invalid-fixed-range", G3)),
              onTimeUpdate: U[8] || (U[8] = (G3) => N.$emit("time-update")),
              onAmPmChange: U[9] || (U[9] = (G3) => N.$emit("am-pm-change", G3)),
              onTimePickerOpen: U[10] || (U[10] = (G3) => N.$emit("time-picker-open", G3)),
              onTimePickerClose: $,
              onRecalculatePosition: O3,
              onUpdateMonthYear: U[11] || (U[11] = (G3) => N.$emit("update-month-year", G3)),
              onAutoApplyInvalid: U[12] || (U[12] = (G3) => N.$emit("auto-apply-invalid", G3)),
              onInvalidDate: U[13] || (U[13] = (G3) => N.$emit("invalid-date", G3)),
              "onUpdate:internalModelValue": U[14] || (U[14] = (G3) => N.$emit("update:internal-model-value", G3))
            }), createSlots({ _: 2 }, [
              renderList(Y3.value, (G3, We) => ({
                name: G3,
                fn: withCtx((je2) => [
                  renderSlot(N.$slots, G3, normalizeProps(guardReactiveProps({ ...je2 })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          N.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", To, [
            renderSlot(N.$slots, "right-sidebar", normalizeProps(guardReactiveProps(ne.value)))
          ])) : createCommentVNode("", true),
          N.$slots["action-extra"] ? (openBlock(), createElementBlock("div", Ao, [
            N.$slots["action-extra"] ? renderSlot(N.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: K3
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !N.autoApply || unref(P).keepActionRow ? (openBlock(), createBlock(Al, mergeProps({
          key: 2,
          "menu-mount": g.value
        }, o.value, {
          "calendar-width": C.value,
          onClosePicker: U[15] || (U[15] = (G3) => N.$emit("close-picker")),
          onSelectDate: U[16] || (U[16] = (G3) => N.$emit("select-date")),
          onInvalidSelect: U[17] || (U[17] = (G3) => N.$emit("invalid-select")),
          onSelectNow: K3
        }), createSlots({ _: 2 }, [
          renderList(unref(d3), (G3, We) => ({
            name: G3,
            fn: withCtx((je2) => [
              renderSlot(N.$slots, G3, normalizeProps(guardReactiveProps({ ...je2 })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 42, wo);
    };
  }
});
var So = typeof window < "u" ? window : void 0;
var $n = () => {
};
var Po = (e3) => getCurrentScope() ? (onScopeDispose(e3), true) : false;
var Co = (e3, t3, r, a3) => {
  if (!e3)
    return $n;
  let n = $n;
  const o = watch(
    () => unref(e3),
    (c3) => {
      n(), c3 && (c3.addEventListener(t3, r, a3), n = () => {
        c3.removeEventListener(t3, r, a3), n = $n;
      });
    },
    { immediate: true, flush: "post" }
  ), i3 = () => {
    o(), n();
  };
  return Po(i3), i3;
};
var _o = (e3, t3, r, a3 = {}) => {
  const { window: n = So, event: o = "pointerdown" } = a3;
  return n ? Co(n, o, (c3) => {
    const p = Re(e3), T3 = Re(t3);
    !p || !T3 || p === c3.target || c3.composedPath().includes(p) || c3.composedPath().includes(T3) || r(c3);
  }, { passive: true }) : void 0;
};
var Ro = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...rn
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
  setup(e3, { expose: t3, emit: r }) {
    const a3 = r, n = e3, o = useSlots(), i3 = ref(false), c3 = toRef(n, "modelValue"), p = toRef(n, "timezone"), T3 = ref(null), D3 = ref(null), R3 = ref(null), P = ref(false), M3 = ref(null), C = ref(false), A = ref(false), { setMenuFocused: q3, setShiftKey: g } = Va(), { clearArrowNav: S3 } = yt(), { mapDatesArrToMap: F, validateDate: b3, isValidTime: _ } = $t(n), { defaultedTransitions: X3, defaultedTextInput: ae, defaultedInline: V3, defaultedConfig: ie2 } = Pe(n), { menuTransition: E3, showTransition: f } = Lt(X3);
    onMounted(() => {
      J(n.modelValue), nextTick().then(() => {
        if (!V3.value.enabled) {
          const x3 = y3(M3.value);
          x3 == null || x3.addEventListener("scroll", be2), window == null || window.addEventListener("resize", N);
        }
      }), V3.value.enabled && (i3.value = true), window == null || window.addEventListener("keyup", U), window == null || window.addEventListener("keydown", Me);
    });
    const w3 = computed(() => F());
    onUnmounted(() => {
      if (!V3.value.enabled) {
        const x3 = y3(M3.value);
        x3 == null || x3.removeEventListener("scroll", be2), window == null || window.removeEventListener("resize", N);
      }
      window == null || window.removeEventListener("keyup", U), window == null || window.removeEventListener("keydown", Me);
    });
    const L3 = qe(o, "all", n.presetDates), ne = qe(o, "input");
    watch(
      [c3, p],
      () => {
        J(c3.value);
      },
      { deep: true }
    );
    const { openOnTop: O3, menuStyle: d3, xCorrect: Y3, setMenuPosition: Z, getScrollableParent: y3, shadowRender: l } = ml({
      menuRef: T3,
      menuRefInner: D3,
      inputRef: R3,
      pickerWrapperRef: M3,
      inline: V3,
      emit: a3,
      props: n,
      slots: o
    }), {
      inputValue: h5,
      internalModelValue: s3,
      parseExternalModelValue: J,
      emitModelValue: de,
      formatInputValue: $,
      checkBeforeEmit: u3
    } = fl(a3, n, P), I3 = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: n.dark,
        dp__theme_light: !n.dark,
        dp__flex_display: V3.value.enabled,
        dp__flex_display_with_input: V3.value.input
      })
    ), Q3 = computed(() => n.dark ? "dp__theme_dark" : "dp__theme_light"), K3 = computed(() => ({
      to: typeof n.teleport == "boolean" ? "body" : n.teleport,
      disabled: !n.teleport || V3.value.enabled
    })), te = computed(() => ({ class: "dp__outer_menu_wrap" })), le = computed(() => V3.value.enabled && (n.timePicker || n.monthPicker || n.yearPicker || n.quarterPicker)), be2 = () => {
      i3.value && (ie2.value.closeOnScroll ? Ze2() : Z());
    }, N = () => {
      i3.value && Z();
    }, U = (x3) => {
      x3.key === "Tab" && !V3.value.enabled && !n.teleport && ie2.value.tabOutClosesMenu && (M3.value.contains(document.activeElement) || Ze2()), A.value = x3.shiftKey;
    }, Me = (x3) => {
      A.value = x3.shiftKey;
    }, G3 = () => {
      !n.disabled && !n.readonly && (l(pa, n), Z(false), i3.value = true, i3.value && a3("open"), i3.value || Yt2(), J(n.modelValue));
    }, We = () => {
      var x3;
      h5.value = "", Yt2(), (x3 = R3.value) == null || x3.setParsedDate(null), a3("update:model-value", null), a3("update:model-timezone-value", null), a3("cleared"), ie2.value.closeOnClearValue && Ze2();
    }, je2 = () => {
      const x3 = s3.value;
      return !x3 || !Array.isArray(x3) && b3(x3) ? true : Array.isArray(x3) ? n.multiDates || x3.length === 2 && b3(x3[0]) && b3(x3[1]) ? true : n.partialRange && !n.timePicker ? b3(x3[0]) : false : false;
    }, it2 = () => {
      u3() && je2() ? (de(), Ze2()) : a3("invalid-select", s3.value);
    }, Wt2 = (x3) => {
      jt2(), de(), ie2.value.closeOnAutoApply && !x3 && Ze2();
    }, jt2 = () => {
      R3.value && ae.value.enabled && R3.value.setParsedDate(s3.value);
    }, sn = (x3 = false) => {
      n.autoApply && _(s3.value) && je2() && (n.range && Array.isArray(s3.value) ? (n.partialRange || s3.value.length === 2) && Wt2(x3) : Wt2(x3));
    }, Yt2 = () => {
      ae.value.enabled || (s3.value = null);
    }, Ze2 = () => {
      V3.value.enabled || (i3.value && (i3.value = false, Y3.value = false, q3(false), g(false), S3(), a3("closed"), h5.value && J(c3.value)), Yt2(), a3("blur"));
    }, un = (x3, ue2, se = false) => {
      if (!x3) {
        s3.value = null;
        return;
      }
      const ht2 = Array.isArray(x3) ? !x3.some((Qn) => !b3(Qn)) : b3(x3), Ke = _(x3);
      ht2 && Ke && (s3.value = x3, ue2 && (C.value = se, it2(), a3("text-submit")));
    }, dn = () => {
      n.autoApply && _(s3.value) && de(), jt2();
    }, Kt2 = () => i3.value ? Ze2() : G3(), Zn = (x3) => {
      s3.value = x3;
    }, m3 = () => {
      ae.value.enabled && (P.value = true, $()), a3("focus");
    }, W = () => {
      if (ae.value.enabled && (P.value = false, J(n.modelValue), C.value)) {
        const x3 = jr(M3.value, A.value);
        x3 == null || x3.focus();
      }
      a3("blur");
    }, oe = (x3) => {
      D3.value && D3.value.updateMonthYear(0, {
        month: ca(x3.month),
        year: ca(x3.year)
      });
    }, me2 = (x3) => {
      J(x3 ?? n.modelValue);
    }, Se2 = (x3, ue2) => {
      var se;
      (se = D3.value) == null || se.switchView(x3, ue2);
    }, nt2 = (x3) => ie2.value.onClickOutside ? ie2.value.onClickOutside(x3) : Ze2();
    return _o(T3, R3, () => nt2(je2)), t3({
      closeMenu: Ze2,
      selectDate: it2,
      clearValue: We,
      openMenu: G3,
      onScroll: be2,
      formatInputValue: $,
      // exposed for testing purposes
      updateInternalModelValue: Zn,
      // modify internal modelValue
      setMonthYear: oe,
      parseModel: me2,
      switchView: Se2,
      toggleMenu: Kt2
    }), (x3, ue2) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: M3,
      class: normalizeClass(I3.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(Dl, mergeProps({
        ref_key: "inputRef",
        ref: R3,
        "input-value": unref(h5),
        "onUpdate:inputValue": ue2[0] || (ue2[0] = (se) => isRef(h5) ? h5.value = se : null),
        "is-menu-open": i3.value
      }, x3.$props, {
        onClear: We,
        onOpen: G3,
        onSetInputDate: un,
        onSetEmptyDate: unref(de),
        onSelectDate: it2,
        onToggle: Kt2,
        onClose: Ze2,
        onFocus: m3,
        onBlur: W,
        onRealBlur: ue2[1] || (ue2[1] = (se) => P.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(ne), (se, ht2) => ({
          name: se,
          fn: withCtx((Ke) => [
            renderSlot(x3.$slots, se, normalizeProps(guardReactiveProps(Ke)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      createVNode(Teleport, normalizeProps(guardReactiveProps(K3.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(E3)(unref(O3)),
            css: unref(f) && !unref(V3).enabled
          }, {
            default: withCtx(() => [
              i3.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: T3
              }, te.value, {
                class: { "dp--menu-wrapper": !unref(V3).enabled },
                style: unref(V3).enabled ? void 0 : unref(d3)
              }), [
                createVNode(pa, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: D3
                }, x3.$props, {
                  "internal-model-value": unref(s3),
                  "onUpdate:internalModelValue": ue2[2] || (ue2[2] = (se) => isRef(s3) ? s3.value = se : null),
                  class: { [Q3.value]: true, "dp--menu-wrapper": x3.teleport },
                  "open-on-top": unref(O3),
                  "arr-map-values": w3.value,
                  "no-overlay-focus": le.value,
                  onClosePicker: Ze2,
                  onSelectDate: it2,
                  onAutoApply: sn,
                  onTimeUpdate: dn,
                  onFlowStep: ue2[3] || (ue2[3] = (se) => x3.$emit("flow-step", se)),
                  onUpdateMonthYear: ue2[4] || (ue2[4] = (se) => x3.$emit("update-month-year", se)),
                  onInvalidSelect: ue2[5] || (ue2[5] = (se) => x3.$emit("invalid-select", unref(s3))),
                  onAutoApplyInvalid: ue2[6] || (ue2[6] = (se) => x3.$emit("invalid-select", se)),
                  onInvalidFixedRange: ue2[7] || (ue2[7] = (se) => x3.$emit("invalid-fixed-range", se)),
                  onRecalculatePosition: unref(Z),
                  onTooltipOpen: ue2[8] || (ue2[8] = (se) => x3.$emit("tooltip-open", se)),
                  onTooltipClose: ue2[9] || (ue2[9] = (se) => x3.$emit("tooltip-close", se)),
                  onTimePickerOpen: ue2[10] || (ue2[10] = (se) => x3.$emit("time-picker-open", se)),
                  onTimePickerClose: ue2[11] || (ue2[11] = (se) => x3.$emit("time-picker-close", se)),
                  onAmPmChange: ue2[12] || (ue2[12] = (se) => x3.$emit("am-pm-change", se)),
                  onRangeStart: ue2[13] || (ue2[13] = (se) => x3.$emit("range-start", se)),
                  onRangeEnd: ue2[14] || (ue2[14] = (se) => x3.$emit("range-end", se)),
                  onDateUpdate: ue2[15] || (ue2[15] = (se) => x3.$emit("date-update", se)),
                  onInvalidDate: ue2[16] || (ue2[16] = (se) => x3.$emit("invalid-date", se))
                }), createSlots({ _: 2 }, [
                  renderList(unref(L3), (se, ht2) => ({
                    name: se,
                    fn: withCtx((Ke) => [
                      renderSlot(x3.$slots, se, normalizeProps(guardReactiveProps({ ...Ke })))
                    ])
                  }))
                ]), 1040, ["internal-model-value", "class", "open-on-top", "arr-map-values", "no-overlay-focus", "onRecalculatePosition"])
              ], 16)) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["name", "css"])
        ]),
        _: 3
      }, 16)
    ], 2));
  }
});
var Ka = (() => {
  const e3 = Ro;
  return e3.install = (t3) => {
    t3.component("Vue3DatePicker", e3);
  }, e3;
})();
var Oo = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Ka
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(Oo).forEach(([e3, t3]) => {
  e3 !== "default" && (Ka[e3] = t3);
});

// node_modules/.pnpm/@vueuse+shared@10.7.2_vue@3.4.15/node_modules/@vueuse/shared/index.mjs
function tryOnScopeDispose(fn2) {
  if (getCurrentScope()) {
    onScopeDispose(fn2);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
var isWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _a3, _b;
  return isClient && ((_a3 = window == null ? void 0 : window.navigator) == null ? void 0 : _a3.userAgent) && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function cacheStringFunction(fn2) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn2(str));
  };
}
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c3) => c3 ? c3.toUpperCase() : "");
});
function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
  return new Promise((resolve, reject) => {
    if (throwOnTimeout)
      setTimeout(() => reject(reason), ms);
    else
      setTimeout(resolve, ms);
  });
}
function identity(arg) {
  return arg;
}
function toRef2(...args) {
  if (args.length !== 1)
    return toRef(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
}

// node_modules/.pnpm/@vueuse+core@10.7.2_vue@3.4.15/node_modules/@vueuse/core/index.mjs
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
var defaultLocation = isClient ? window.location : void 0;
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = Object.keys(defaultState);
var DEFAULT_UNITS = [
  { max: 6e4, value: 1e3, name: "second" },
  { max: 276e4, value: 6e4, name: "minute" },
  { max: 72e6, value: 36e5, name: "hour" },
  { max: 5184e5, value: 864e5, name: "day" },
  { max: 24192e5, value: 6048e5, name: "week" },
  { max: 28512e6, value: 2592e6, name: "month" },
  { max: Number.POSITIVE_INFINITY, value: 31536e6, name: "year" }
];
var _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
var TransitionPresets = Object.assign({}, { linear: identity }, _TransitionPresets);
function createEasingFunction([p02, p12, p22, p3]) {
  const a3 = (a12, a23) => 1 - 3 * a23 + 3 * a12;
  const b3 = (a12, a23) => 3 * a23 - 6 * a12;
  const c3 = (a12) => 3 * a12;
  const calcBezier = (t3, a12, a23) => ((a3(a12, a23) * t3 + b3(a12, a23)) * t3 + c3(a12)) * t3;
  const getSlope = (t3, a12, a23) => 3 * a3(a12, a23) * t3 * t3 + 2 * b3(a12, a23) * t3 + c3(a12);
  const getTforX = (x3) => {
    let aGuessT = x3;
    for (let i3 = 0; i3 < 4; ++i3) {
      const currentSlope = getSlope(aGuessT, p02, p22);
      if (currentSlope === 0)
        return aGuessT;
      const currentX = calcBezier(aGuessT, p02, p22) - x3;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  };
  return (x3) => p02 === p12 && p22 === p3 ? x3 : calcBezier(getTforX(x3), p12, p3);
}
function lerp(a3, b3, alpha) {
  return a3 + alpha * (b3 - a3);
}
function toVec(t3) {
  return (typeof t3 === "number" ? [t3] : t3) || [];
}
function executeTransition(source, from, to3, options = {}) {
  var _a3, _b;
  const fromVal = toValue(from);
  const toVal = toValue(to3);
  const v12 = toVec(fromVal);
  const v22 = toVec(toVal);
  const duration = (_a3 = toValue(options.duration)) != null ? _a3 : 1e3;
  const startedAt = Date.now();
  const endAt = Date.now() + duration;
  const trans = typeof options.transition === "function" ? options.transition : (_b = toValue(options.transition)) != null ? _b : identity;
  const ease = typeof trans === "function" ? trans : createEasingFunction(trans);
  return new Promise((resolve) => {
    source.value = fromVal;
    const tick = () => {
      var _a22;
      if ((_a22 = options.abort) == null ? void 0 : _a22.call(options)) {
        resolve();
        return;
      }
      const now2 = Date.now();
      const alpha = ease((now2 - startedAt) / duration);
      const arr = toVec(source.value).map((n, i3) => lerp(v12[i3], v22[i3], alpha));
      if (Array.isArray(source.value))
        source.value = arr.map((n, i3) => {
          var _a32, _b2;
          return lerp((_a32 = v12[i3]) != null ? _a32 : 0, (_b2 = v22[i3]) != null ? _b2 : 0, alpha);
        });
      else if (typeof source.value === "number")
        source.value = arr[0];
      if (now2 < endAt) {
        requestAnimationFrame(tick);
      } else {
        source.value = toVal;
        resolve();
      }
    };
    tick();
  });
}
function useTransition(source, options = {}) {
  let currentId = 0;
  const sourceVal = () => {
    const v = toValue(source);
    return typeof v === "number" ? v : v.map(toValue);
  };
  const outputRef = ref(sourceVal());
  watch(sourceVal, async (to3) => {
    var _a3, _b;
    if (toValue(options.disabled))
      return;
    const id = ++currentId;
    if (options.delay)
      await promiseTimeout(toValue(options.delay));
    if (id !== currentId)
      return;
    const toVal = Array.isArray(to3) ? to3.map(toValue) : toValue(to3);
    (_a3 = options.onStarted) == null ? void 0 : _a3.call(options);
    await executeTransition(outputRef, outputRef.value, toVal, {
      ...options,
      abort: () => {
        var _a22;
        return id !== currentId || ((_a22 = options.abort) == null ? void 0 : _a22.call(options));
      }
    });
    (_b = options.onFinished) == null ? void 0 : _b.call(options);
  }, { deep: true });
  watch(() => toValue(options.disabled), (disabled) => {
    if (disabled) {
      currentId++;
      outputRef.value = sourceVal();
    }
  });
  tryOnScopeDispose(() => {
    currentId++;
  });
  return computed(() => toValue(options.disabled) ? sourceVal() : outputRef.value);
}

// node_modules/.pnpm/@vueuse+integrations@10.7.2_qrcode@1.5.3_vue@3.4.15/node_modules/@vueuse/integrations/useQRCode.mjs
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/shared/ssr-window.esm.mjs
function isObject2(obj) {
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
    else if (isObject2(src[key]) && isObject2(target[key]) && Object.keys(src[key]).length > 0) {
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
  CustomEvent: function CustomEvent2() {
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/shared/utils.mjs
function classesToTokens(classes2) {
  if (classes2 === void 0) {
    classes2 = "";
  }
  return classes2.trim().split(" ").filter((c3) => !!c3.trim());
}
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
function isObject3(o) {
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
  for (let i3 = 1; i3 < arguments.length; i3 += 1) {
    const nextSource = i3 < 0 || arguments.length <= i3 ? void 0 : arguments[i3];
    if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== void 0 && desc.enumerable) {
          if (isObject3(to3[nextKey]) && isObject3(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to3[nextKey] = nextSource[nextKey];
            } else {
              extend2(to3[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject3(to3[nextKey]) && isObject3(nextSource[nextKey])) {
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
  const el3 = document.createElement(tag);
  el3.classList.add(...Array.isArray(classes2) ? classes2 : classesToTokens(classes2));
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/shared/swiper-core.mjs
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
  on2("init", init);
  on2("destroy", destroy);
}
var eventsEmitter = {
  on(events2, handler, priority) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed)
      return self2;
    if (typeof handler !== "function")
      return self2;
    const method = priority ? "unshift" : "push";
    events2.split(" ").forEach((event2) => {
      if (!self2.eventsListeners[event2])
        self2.eventsListeners[event2] = [];
      self2.eventsListeners[event2][method](handler);
    });
    return self2;
  },
  once(events2, handler, priority) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed)
      return self2;
    if (typeof handler !== "function")
      return self2;
    function onceHandler() {
      self2.off(events2, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      handler.apply(self2, args);
    }
    onceHandler.__emitterProxy = handler;
    return self2.on(events2, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed)
      return self2;
    if (typeof handler !== "function")
      return self2;
    const method = priority ? "unshift" : "push";
    if (self2.eventsAnyListeners.indexOf(handler) < 0) {
      self2.eventsAnyListeners[method](handler);
    }
    return self2;
  },
  offAny(handler) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed)
      return self2;
    if (!self2.eventsAnyListeners)
      return self2;
    const index = self2.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self2.eventsAnyListeners.splice(index, 1);
    }
    return self2;
  },
  off(events2, handler) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed)
      return self2;
    if (!self2.eventsListeners)
      return self2;
    events2.split(" ").forEach((event2) => {
      if (typeof handler === "undefined") {
        self2.eventsListeners[event2] = [];
      } else if (self2.eventsListeners[event2]) {
        self2.eventsListeners[event2].forEach((eventHandler, index) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self2.eventsListeners[event2].splice(index, 1);
          }
        });
      }
    });
    return self2;
  },
  emit() {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed)
      return self2;
    if (!self2.eventsListeners)
      return self2;
    let events2;
    let data;
    let context;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (typeof args[0] === "string" || Array.isArray(args[0])) {
      events2 = args[0];
      data = args.slice(1, args.length);
      context = self2;
    } else {
      events2 = args[0].events;
      data = args[0].data;
      context = args[0].context || self2;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
    eventsArray.forEach((event2) => {
      if (self2.eventsAnyListeners && self2.eventsAnyListeners.length) {
        self2.eventsAnyListeners.forEach((eventHandler) => {
          eventHandler.apply(context, [event2, ...data]);
        });
      }
      if (self2.eventsListeners && self2.eventsListeners[event2]) {
        self2.eventsListeners[event2].forEach((eventHandler) => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self2;
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
  for (let i3 = 0; i3 < slidesLength; i3 += 1) {
    slideSize = 0;
    let slide2;
    if (slides[i3])
      slide2 = slides[i3];
    if (gridEnabled) {
      swiper.grid.updateSlide(i3, slide2, slides);
    }
    if (slides[i3] && elementStyle(slide2, "display") === "none")
      continue;
    if (params.slidesPerView === "auto") {
      if (shouldResetSlideSize) {
        slides[i3].style[swiper.getDirectionLabel("width")] = ``;
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
        slides[i3].style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
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
    wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid);
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
    slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass);
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
    const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i3];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide2);
      swiper.visibleSlidesIndexes.push(i3);
      slides[i3].classList.add(params.slideVisibleClass);
    }
    if (isFullyVisible) {
      slides[i3].classList.add(params.slideFullyVisibleClass);
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
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  const getFilteredSlide = (selector) => {
    return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
  };
  slides.forEach((slideEl) => {
    slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
  });
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
    activeSlide.classList.add(params.slideActiveClass);
    if (gridEnabled) {
      if (nextSlide) {
        nextSlide.classList.add(params.slideNextClass);
      }
      if (prevSlide) {
        prevSlide.classList.add(params.slidePrevClass);
      }
    } else {
      nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !nextSlide) {
        nextSlide = slides[0];
      }
      if (nextSlide) {
        nextSlide.classList.add(params.slideNextClass);
      }
      prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !prevSlide === 0) {
        prevSlide = slides[slides.length - 1];
      }
      if (prevSlide) {
        prevSlide.classList.add(params.slidePrevClass);
      }
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
  const initSlides = () => {
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    slides.forEach((el3, index) => {
      el3.setAttribute("data-swiper-slide-index", index);
    });
  };
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
  const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
  const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
  const addBlankSlides = (amountOfSlides) => {
    for (let i3 = 0; i3 < amountOfSlides; i3 += 1) {
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
    activeSlideIndex = swiper.getSlideIndex(slides.filter((el3) => el3.classList.contains(params.slideActiveClass))[0]);
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
    for (let i3 = 0; i3 < loopedSlides - activeColIndexWithShift; i3 += 1) {
      const index = i3 - Math.floor(i3 / cols) * cols;
      if (gridEnabled) {
        const colIndexToPrepend = cols - index - 1;
        for (let i5 = slides.length - 1; i5 >= 0; i5 -= 1) {
          if (slides[i5].column === colIndexToPrepend)
            prependSlidesIndexes.push(i5);
        }
      } else {
        prependSlidesIndexes.push(cols - index - 1);
      }
    }
  } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
    slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
    for (let i3 = 0; i3 < slidesAppended; i3 += 1) {
      const index = i3 - Math.floor(i3 / cols) * cols;
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
          swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
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
  let e3 = event2;
  if (e3.originalEvent)
    e3 = e3.originalEvent;
  const data = swiper.touchEventsData;
  if (e3.type === "pointerdown") {
    if (data.pointerId !== null && data.pointerId !== e3.pointerId) {
      return;
    }
    data.pointerId = e3.pointerId;
  } else if (e3.type === "touchstart" && e3.targetTouches.length === 1) {
    data.touchId = e3.targetTouches[0].identifier;
  }
  if (e3.type === "touchstart") {
    preventEdgeSwipe(swiper, e3, e3.targetTouches[0].pageX);
    return;
  }
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (!params.simulateTouch && e3.pointerType === "mouse")
    return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
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
  const eventPath = e3.composedPath ? e3.composedPath() : e3.path;
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
  if (!preventEdgeSwipe(swiper, e3, startX)) {
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
  if (e3.type === "pointermove") {
    if (data.touchId !== null)
      return;
    const id = e3.pointerId;
    if (id !== data.pointerId)
      return;
  }
  let targetTouch;
  if (e3.type === "touchmove") {
    targetTouch = [...e3.changedTouches].filter((t3) => t3.identifier === data.touchId)[0];
    if (!targetTouch || targetTouch.identifier !== data.touchId)
      return;
  } else {
    targetTouch = e3;
  }
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit("touchMoveOpposite", e3);
    }
    return;
  }
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
    swiper.emit("touchMoveOpposite", e3);
  }
  if (typeof data.startMoving === "undefined") {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling) {
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
  swiper.emit("sliderMove", e3);
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
  let e3 = event2;
  if (e3.originalEvent)
    e3 = e3.originalEvent;
  let targetTouch;
  const isTouchEvent = e3.type === "touchend" || e3.type === "touchcancel";
  if (!isTouchEvent) {
    if (data.touchId !== null)
      return;
    if (e3.pointerId !== data.pointerId)
      return;
    targetTouch = e3;
  } else {
    targetTouch = [...e3.changedTouches].filter((t3) => t3.identifier === data.touchId)[0];
    if (!targetTouch || targetTouch.identifier !== data.touchId)
      return;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(e3.type)) {
    const proceed = ["pointercancel", "contextmenu"].includes(e3.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
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
  if (!params.simulateTouch && e3.pointerType === "mouse")
    return;
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
  for (let i3 = 0; i3 < slidesGrid.length; i3 += i3 < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment2 = i3 < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i3 + increment2] !== "undefined") {
      if (swipeToLast || currentPos >= slidesGrid[i3] && currentPos < slidesGrid[i3 + increment2]) {
        stopIndex = i3;
        groupSize = slidesGrid[i3 + increment2] - slidesGrid[i3];
      }
    } else if (swipeToLast || currentPos >= slidesGrid[i3]) {
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
    el: el3,
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
  el3[domMethod]("touchstart", swiper.onTouchStart, {
    passive: false
  });
  el3[domMethod]("pointerdown", swiper.onTouchStart, {
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/shared/update-swiper.mjs
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
function isObject4(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object" && !o.__swiper__;
}
function extend3(target, src) {
  const noExtend = ["__proto__", "constructor", "prototype"];
  Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
    if (typeof target[key] === "undefined")
      target[key] = src[key];
    else if (isObject4(src[key]) && isObject4(target[key]) && Object.keys(src[key]).length > 0) {
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
    if (isObject4(currentParams[key]) && isObject4(passedParams[key])) {
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/shared/update-on-virtual-data.mjs
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
      if (isObject4(obj[key])) {
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
  const keys2 = [];
  if (!oldParams)
    return keys2;
  const addKey = (key) => {
    if (keys2.indexOf(key) < 0)
      keys2.push(key);
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
      if (isObject4(swiperParams[key]) && isObject4(oldParams[key])) {
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
  return keys2;
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/swiper-vue.mjs
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
    to: to3
  } = virtualData;
  const loopFrom = swiperRef.value.params.loop ? -slides.length : 0;
  const loopTo = swiperRef.value.params.loop ? slides.length * 2 : slides.length;
  const slidesToRender = [];
  for (let i3 = loopFrom; i3 < loopTo; i3 += 1) {
    if (i3 >= from && i3 <= to3) {
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/modules/mousewheel.mjs
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
  function normalize(e3) {
    const PIXEL_STEP = 10;
    const LINE_HEIGHT = 40;
    const PAGE_HEIGHT = 800;
    let sX = 0;
    let sY = 0;
    let pX = 0;
    let pY = 0;
    if ("detail" in e3) {
      sY = e3.detail;
    }
    if ("wheelDelta" in e3) {
      sY = -e3.wheelDelta / 120;
    }
    if ("wheelDeltaY" in e3) {
      sY = -e3.wheelDeltaY / 120;
    }
    if ("wheelDeltaX" in e3) {
      sX = -e3.wheelDeltaX / 120;
    }
    if ("axis" in e3 && e3.axis === e3.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }
    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;
    if ("deltaY" in e3) {
      pY = e3.deltaY;
    }
    if ("deltaX" in e3) {
      pX = e3.deltaX;
    }
    if (e3.shiftKey && !pX) {
      pX = pY;
      pY = 0;
    }
    if ((pX || pY) && e3.deltaMode) {
      if (e3.deltaMode === 1) {
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
    let e3 = event2;
    let disableParentSwiper = true;
    if (!swiper.enabled)
      return;
    if (event2.target.closest(`.${swiper.params.mousewheel.noMousewheelClass}`))
      return;
    const params = swiper.params.mousewheel;
    if (swiper.params.cssMode) {
      e3.preventDefault();
    }
    let targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== "container") {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    const targetElContainsTarget = targetEl && targetEl.contains(e3.target);
    if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges)
      return true;
    if (e3.originalEvent)
      e3 = e3.originalEvent;
    let delta = 0;
    const rtlFactor = swiper.rtlTranslate ? -1 : 1;
    const data = normalize(e3);
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
      e3.stopPropagation();
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
          emit("scroll", e3);
        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction)
          swiper.autoplay.stop();
        if (params.releaseOnEdges && (position === swiper.minTranslate() || position === swiper.maxTranslate())) {
          return true;
        }
      }
    }
    if (e3.preventDefault)
      e3.preventDefault();
    else
      e3.returnValue = false;
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/shared/create-element-if-not-defined.mjs
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/modules/navigation.mjs
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
    [...nextEl, ...prevEl].filter((el3) => !!el3).forEach((el3) => el3.classList.add(swiper.params.navigation.lockClass));
  });
  on2("click", (_s, e3) => {
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/shared/classes-to-selector.mjs
function classesToSelector(classes2) {
  if (classes2 === void 0) {
    classes2 = "";
  }
  return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/modules/pagination.mjs
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
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
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
  on2("changeDirection", () => {
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
      el: el3
    } = swiper.pagination;
    if (el3) {
      el3 = makeElementsArray(el3);
      el3.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
    }
  });
  on2("lock unlock", () => {
    update2();
  });
  on2("click", (_s, e3) => {
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/modules/autoplay.mjs
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
  function onTransitionEnd(e3) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl)
      return;
    if (e3.target !== swiper.wrapperEl)
      return;
    swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
    if (pausedByPointerEnter) {
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
  const onPointerEnter = (e3) => {
    if (e3.pointerType !== "mouse")
      return;
    pausedByInteraction = true;
    pausedByPointerEnter = true;
    if (swiper.animating || swiper.autoplay.paused)
      return;
    pause(true);
  };
  const onPointerLeave = (e3) => {
    if (e3.pointerType !== "mouse")
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/shared/effect-init.mjs
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/shared/effect-target.mjs
function effectTarget(effectParams, slideEl) {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = "hidden";
    transformEl.style["-webkit-backface-visibility"] = "hidden";
  }
  return transformEl;
}

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/shared/effect-virtual-transition-end.mjs
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

// node_modules/.pnpm/swiper@11.0.5/node_modules/swiper/modules/effect-fade.mjs
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

// node_modules/.pnpm/vue-amazing-ui@0.1.32_@algolia+client-search@4.22.1_less@4.2.0_search-insights@2.13.0/node_modules/vue-amazing-ui/dist/vue-amazing-ui.js
function No(l = Date.now(), a3 = "YYYY-MM-DD HH:mm:ss") {
  if (typeof l == "number" || typeof l == "string")
    var e3 = new Date(l);
  else
    e3 = l;
  function o(d3) {
    return d3 < 10 ? "0" + d3 : String(d3);
  }
  let n = a3;
  if (n.includes("SSS")) {
    const d3 = e3.getMilliseconds();
    n = n.replace("SSS", "0".repeat(3 - String(d3).length) + d3);
  }
  if (n.includes("YY")) {
    const d3 = e3.getFullYear();
    n = n.includes("YYYY") ? n.replace("YYYY", String(d3)) : n.replace("YY", String(d3).slice(2, 4));
  }
  if (n.includes("M")) {
    const d3 = e3.getMonth() + 1;
    n = n.includes("MM") ? n.replace("MM", o(d3)) : n.replace("M", String(d3));
  }
  if (n.includes("D")) {
    const d3 = e3.getDate();
    n = n.includes("DD") ? n.replace("DD", o(d3)) : n.replace("D", String(d3));
  }
  if (n.includes("H")) {
    const d3 = e3.getHours();
    n = n.includes("HH") ? n.replace("HH", o(d3)) : n.replace("H", String(d3));
  }
  if (n.includes("m")) {
    const d3 = e3.getMinutes();
    n = n.includes("mm") ? n.replace("mm", o(d3)) : n.replace("m", String(d3));
  }
  if (n.includes("s")) {
    const d3 = e3.getSeconds();
    n = n.includes("ss") ? n.replace("ss", o(d3)) : n.replace("s", String(d3));
  }
  return n;
}
var pe = typeof window < "u" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {
};
var Qa = typeof window < "u" ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {
};
function me(l, a3 = 0, e3 = false) {
  const o = typeof window < "u" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {
  };
  let n = null;
  const d3 = { id: o(function s3(c3) {
    n || (n = c3), c3 - n >= a3 ? (l(), e3 && (n = null, d3.id = o(s3))) : d3.id = o(s3);
  }) };
  return d3;
}
function Ce2(l) {
  const a3 = typeof window < "u" ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {
  };
  l && l.id && a3(l.id);
}
function Oo2(l, a3 = 300) {
  let e3 = true;
  return function() {
    return e3 && (e3 = false, me(() => {
      l(), e3 = true;
    }, a3)), false;
  };
}
function qo(l, a3 = 300) {
  let e3 = null;
  return function() {
    e3 && Ce2(e3), e3 = me(l, a3);
  };
}
function Po2(l, a3) {
  const e3 = String(l).split(".")[1], o = String(a3).split(".")[1], n = Math.max((e3 == null ? void 0 : e3.length) || 0, (o == null ? void 0 : o.length) || 0), d3 = l.toFixed(n), s3 = a3.toFixed(n);
  return (+d3.replace(".", "") + +s3.replace(".", "")) / Math.pow(10, n);
}
function Yo(l, a3) {
  let e3 = "";
  if (a3)
    e3 = a3;
  else {
    const n = l.split("?")[0].split("/");
    e3 = n[n.length - 1];
  }
  const o = new XMLHttpRequest();
  o.open("GET", l, true), o.responseType = "blob", o.onload = function() {
    if (o.status === 200) {
      const n = o.response, d3 = document.createElement("a"), s3 = document.querySelector("body");
      d3.href = window.URL.createObjectURL(n), d3.download = e3, d3.style.display = "none", s3 == null || s3.appendChild(d3), d3.click(), s3 == null || s3.removeChild(d3), window.URL.revokeObjectURL(d3.href);
    }
  }, o.send();
}
function z1(l, a3 = 2, e3 = ",", o = ".", n = "", d3 = "") {
  if (Number(l) === 0)
    return Number(l).toFixed(a3);
  if (!l)
    return "";
  l = Number(l).toFixed(a3);
  const s3 = (l += "").split(".");
  let c3 = s3[0];
  const p = s3.length > 1 ? o + s3[1] : "", i3 = /(\d+)(\d{3})/;
  if (e3 && (h5 = e3, Object.prototype.toString.call(h5) !== "[object Number]"))
    for (; i3.test(c3); )
      c3 = c3.replace(i3, "$1" + e3 + "$2");
  var h5;
  return n + c3 + p + d3;
}
function Uo() {
  document.documentElement.classList.toggle("dark");
}
var ue = (l) => (pushScopeId("data-v-68ad7050"), l = l(), popScopeId(), l);
var _1 = { key: 0, class: "m-icon" };
var C1 = ["src"];
var $1 = { key: 1, focusable: "false", class: "u-icon", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var B1 = [ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var F1 = { key: 2, focusable: "false", class: "u-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var S1 = [ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var L1 = { key: 3, focusable: "false", class: "u-icon", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var A1 = [ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var D1 = { key: 4, focusable: "false", class: "u-icon", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var E1 = [ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var H1 = { key: 1, class: "m-big-icon" };
var I1 = ["src"];
var T1 = { key: 1, focusable: "false", class: "u-icon", "data-icon": "info-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var j1 = [ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), ue(() => createBaseVNode("path", { d: "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1))];
var V1 = { key: 2, focusable: "false", class: "u-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var R1 = [ue(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1)), ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var W1 = { key: 3, focusable: "false", class: "u-icon", "data-icon": "exclamation-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var N1 = [ue(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), ue(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var O1 = { key: 4, focusable: "false", class: "u-icon", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var q1 = [ue(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1)), ue(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var P1 = { class: "m-content" };
var Y1 = { class: "u-message" };
var U1 = { key: 0, class: "u-description" };
var K1 = { key: 0 };
var Z1 = { key: 1, focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var G1 = [ue(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var V = (l, a3) => {
  const e3 = l.__vccOpts || l;
  for (const [o, n] of a3)
    e3[o] = n;
  return e3;
};
var aa2 = V(defineComponent({ __name: "Alert", props: { message: { default: "" }, description: { default: "" }, type: { default: "info" }, closable: { type: Boolean, default: false }, closeText: { default: "" }, icon: { default: "" }, showIcon: { type: Boolean, default: false } }, emits: ["close"], setup(l, { emit: a3 }) {
  const e3 = l, o = ref(), n = useSlots(), d3 = computed(() => {
    var i3;
    const p = (i3 = n.description) == null ? void 0 : i3.call(n);
    return p ? !!(p[0].children !== "v-if" && (p != null && p.length)) : e3.description;
  });
  watchPostEffect(() => {
    e3.closable && (o.value.style.height = o.value.offsetHeight + "px", o.value.style.opacity = 1);
  });
  const s3 = a3;
  function c3(p) {
    o.value.style.height = 0, o.value.style.opacity = 0, s3("close", p);
  }
  return (p, i3) => (openBlock(), createElementBlock("div", { ref_key: "alert", ref: o, class: "m-alert-wrapper" }, [createBaseVNode("div", { class: normalizeClass(["m-alert", [`${p.type}`, { "width-description": d3.value }]]) }, [p.showIcon ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [d3.value ? (openBlock(), createElementBlock("span", H1, [renderSlot(p.$slots, "icon", {}, () => [p.icon ? (openBlock(), createElementBlock("img", { key: 0, src: p.icon, class: "u-big-icon-img" }, null, 8, I1)) : p.type === "info" ? (openBlock(), createElementBlock("svg", T1, j1)) : p.type === "success" ? (openBlock(), createElementBlock("svg", V1, R1)) : p.type === "warning" ? (openBlock(), createElementBlock("svg", W1, N1)) : p.type === "error" ? (openBlock(), createElementBlock("svg", O1, q1)) : createCommentVNode("", true)], true)])) : (openBlock(), createElementBlock("span", _1, [renderSlot(p.$slots, "icon", {}, () => [p.icon ? (openBlock(), createElementBlock("img", { key: 0, src: p.icon, class: "u-icon-img" }, null, 8, C1)) : p.type === "info" ? (openBlock(), createElementBlock("svg", $1, B1)) : p.type === "success" ? (openBlock(), createElementBlock("svg", F1, S1)) : p.type === "warning" ? (openBlock(), createElementBlock("svg", L1, A1)) : p.type === "error" ? (openBlock(), createElementBlock("svg", D1, E1)) : createCommentVNode("", true)], true)]))], 64)) : createCommentVNode("", true), createBaseVNode("div", P1, [createBaseVNode("div", Y1, [renderSlot(p.$slots, "message", {}, () => [createTextVNode(toDisplayString(p.message), 1)], true)]), d3.value ? (openBlock(), createElementBlock("div", U1, [renderSlot(p.$slots, "description", {}, () => [createTextVNode(toDisplayString(p.description), 1)], true)])) : createCommentVNode("", true)]), p.closable ? (openBlock(), createElementBlock("a", { key: 1, class: "m-close", onClick: c3 }, [renderSlot(p.$slots, "closeText", {}, () => [p.closeText ? (openBlock(), createElementBlock("span", K1, toDisplayString(p.closeText), 1)) : (openBlock(), createElementBlock("svg", Z1, G1))], true)])) : createCommentVNode("", true)], 2)], 512));
} }), [["__scopeId", "data-v-68ad7050"]]);
aa2.install = (l) => {
  l.component(aa2.__name, aa2);
};
var J1 = ["src", "alt"];
var X1 = { key: 1, class: "m-icon" };
var la2 = V(defineComponent({ __name: "Avatar", props: { shape: { default: "circle" }, size: { default: "default" }, src: { default: "" }, alt: { default: "" }, icon: { default: void 0 } }, setup(l) {
  const a3 = l, e3 = ref(document.documentElement.clientWidth);
  function o() {
    e3.value = document.documentElement.clientWidth;
  }
  onMounted(() => {
    window.addEventListener("resize", o);
  }), onUnmounted(() => {
    window.removeEventListener("resize", o);
  });
  const n = computed(() => {
    if (typeof a3.size == "string")
      return null;
    if (typeof a3.size == "number")
      return s3.value ? { width: a3.size + "px", height: a3.size + "px", lineHeight: a3.size + "px", fontSize: a3.size / 2 + "px" } : { width: a3.size + "px", height: a3.size + "px", lineHeight: a3.size + "px", fontSize: "18px" };
    if (typeof a3.size == "object") {
      let i3 = 32;
      return e3.value >= 1600 && a3.size.xxl ? i3 = a3.size.xxl : e3.value >= 1200 && a3.size.xl ? i3 = a3.size.xl : e3.value >= 992 && a3.size.lg ? i3 = a3.size.lg : e3.value >= 768 && a3.size.md ? i3 = a3.size.md : e3.value >= 576 && a3.size.sm ? i3 = a3.size.sm : e3.value < 576 && a3.size.xs && (i3 = a3.size.xs), { width: i3 + "px", height: i3 + "px", lineHeight: i3 + "px", fontSize: i3 / 2 + "px" };
    }
  }), d3 = useSlots(), s3 = computed(() => {
    var i3;
    if (!a3.src) {
      const h5 = (i3 = d3.icon) == null ? void 0 : i3.call(d3);
      if (h5)
        return !!(h5[0].children !== "v-if" && (h5 != null && h5.length));
    }
    return false;
  }), c3 = computed(() => {
    var i3, h5;
    if (!a3.src && !s3.value) {
      const x3 = (i3 = d3.default) == null ? void 0 : i3.call(d3);
      if (x3)
        return !!(x3[0].children !== "v-if" && ((h5 = x3[0].children) != null && h5.length));
    }
    return false;
  }), p = computed(() => {
    if (typeof a3.size == "string")
      return { transform: "scale(1) translateX(-50%)" };
    if (typeof a3.size == "number") {
      const i3 = Math.min(1, Math.max(0.022222222222222223, (1 + 1 * (a3.size - 9)) / 45));
      return { lineHeight: a3.size + "px", transform: `scale(${i3}) translateX(-50%)` };
    }
  });
  return (i3, h5) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-avatar", [n.value === null ? "avatar-" + i3.size : "", "avatar-" + i3.shape, { "avatar-image": i3.src }]]), style: normalizeStyle(n.value || {}) }, [i3.src ? (openBlock(), createElementBlock("img", { key: 0, class: "u-image", src: i3.src, alt: i3.alt }, null, 8, J1)) : createCommentVNode("", true), !i3.src && s3.value ? (openBlock(), createElementBlock("span", X1, [renderSlot(i3.$slots, "icon", {}, void 0, true)])) : createCommentVNode("", true), i3.src || s3.value || !c3.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", { key: 2, class: "m-string", style: normalizeStyle(p.value) }, [renderSlot(i3.$slots, "default", {}, void 0, true)], 4))], 6));
} }), [["__scopeId", "data-v-64afe26f"]]);
la2.install = (l) => {
  l.component(la2.__name, la2);
};
var Q1 = ((l) => (pushScopeId("data-v-05696e1d"), l = l(), popScopeId(), l))(() => createBaseVNode("span", { class: "m-icon" }, [createBaseVNode("svg", { class: "u-icon", viewBox: "0 0 24 24", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xlinkHref: "http://www.w3.org/1999/xlink" }, [createBaseVNode("g", { stroke: "none", "stroke-width": "1", "fill-rule": "evenodd" }, [createBaseVNode("g", { transform: "translate(-139.000000, -4423.000000)", "fill-rule": "nonzero" }, [createBaseVNode("g", { transform: "translate(120.000000, 4285.000000)" }, [createBaseVNode("g", { transform: "translate(7.000000, 126.000000)" }, [createBaseVNode("g", { transform: "translate(24.000000, 24.000000) scale(1, -1) translate(-24.000000, -24.000000) translate(12.000000, 12.000000)" }, [createBaseVNode("g", { transform: "translate(4.000000, 2.000000)" }, [createBaseVNode("path", { d: "M8,0 C8.51283584,0 8.93550716,0.38604019 8.99327227,0.883378875 L9,1 L9,10.584 L12.2928932,7.29289322 C12.6834175,6.90236893 13.3165825,6.90236893 13.7071068,7.29289322 C14.0675907,7.65337718 14.0953203,8.22060824 13.7902954,8.61289944 L13.7071068,8.70710678 L8.70710678,13.7071068 L8.62544899,13.7803112 L8.618,13.784 L8.59530661,13.8036654 L8.4840621,13.8753288 L8.37133602,13.9287745 L8.22929083,13.9735893 L8.14346259,13.9897165 L8.03324678,13.9994506 L7.9137692,13.9962979 L7.77070917,13.9735893 L7.6583843,13.9401293 L7.57677845,13.9063266 L7.47929125,13.8540045 L7.4048407,13.8036865 L7.38131006,13.7856883 C7.35030318,13.7612383 7.32077858,13.7349921 7.29289322,13.7071068 L2.29289322,8.70710678 L2.20970461,8.61289944 C1.90467972,8.22060824 1.93240926,7.65337718 2.29289322,7.29289322 C2.65337718,6.93240926 3.22060824,6.90467972 3.61289944,7.20970461 L3.70710678,7.29289322 L7,10.585 L7,1 L7.00672773,0.883378875 C7.06449284,0.38604019 7.48716416,0 8,0 Z" }), createBaseVNode("path", { d: "M14.9333333,15.9994506 C15.5224371,15.9994506 16,16.4471659 16,16.9994506 C16,17.5122865 15.5882238,17.9349578 15.0577292,17.9927229 L14.9333333,17.9994506 L1.06666667,17.9994506 C0.477562934,17.9994506 0,17.5517354 0,16.9994506 C0,16.4866148 0.411776203,16.0639435 0.9422708,16.0061783 L1.06666667,15.9994506 L14.9333333,15.9994506 Z" })])])])])])])])], -1));
var ta = V(defineComponent({ __name: "BackTop", props: { bottom: { default: 40 }, right: { default: 40 }, visibilityHeight: { default: 180 }, to: { default: "body" }, listenTo: { default: void 0 } }, emits: ["click", "show"], setup(l, { emit: a3 }) {
  const e3 = l, o = computed(() => typeof e3.bottom == "number" ? e3.bottom + "px" : e3.bottom), n = computed(() => typeof e3.right == "number" ? e3.right + "px" : e3.right), d3 = ref(), s3 = ref(0), c3 = ref();
  watchEffect(() => {
    nextTick(() => {
      var m3;
      e3.listenTo === void 0 ? c3.value = h5((m3 = d3.value) == null ? void 0 : m3.parentElement) : typeof e3.listenTo == "string" ? c3.value = typeof document < "u" ? document.getElementsByTagName(e3.listenTo)[0] : null : e3.listenTo instanceof HTMLElement && (c3.value = e3.listenTo), c3.value && (function(u3) {
        const b3 = { attributes: true, subtree: true };
        new MutationObserver(function(g, k3) {
          s3.value = c3.value.scrollTop;
        }).observe(u3, b3);
      }(c3.value), c3.value.addEventListener("scroll", (u3) => {
        s3.value = u3.target.scrollTop;
      }));
    });
  });
  const p = ref();
  watchEffect(() => {
    nextTick(() => {
      typeof e3.to == "string" ? p.value = typeof document < "u" ? document.getElementsByTagName(e3.to)[0] : null : e3.to instanceof HTMLElement && (p.value = e3.to), p.value && p.value.insertAdjacentElement("beforeend", d3.value);
    });
  }), onBeforeUnmount(() => {
    d3.value.remove();
  });
  const i3 = computed(() => s3.value >= e3.visibilityHeight);
  function h5(m3) {
    return m3 ? m3.scrollHeight > m3.clientHeight ? m3 : h5(m3.parentElement) : null;
  }
  const x3 = a3;
  function M3() {
    c3.value && c3.value.scrollTo({ top: 0, behavior: "smooth" }), x3("click");
  }
  return watch(i3, (m3) => {
    x3("show", m3);
  }), (m3, u3) => (openBlock(), createBlock(Transition, null, { default: withCtx(() => [withDirectives(createBaseVNode("div", { ref_key: "backtop", ref: d3, onClick: M3, class: "m-backtop", style: normalizeStyle(`bottom: ${o.value}; right: ${n.value};`) }, [renderSlot(m3.$slots, "default", {}, () => [Q1], true)], 4), [[vShow, i3.value]])]), _: 3 }));
} }), [["__scopeId", "data-v-05696e1d"]]);
ta.install = (l) => {
  l.component(ta.__name, ta);
};
var el2 = { class: "u-status-text" };
var al2 = { key: 0 };
var ll2 = ["title"];
var tl2 = { key: 0, class: "m-number", style: { transition: "none 0s ease 0s" } };
var ol2 = { class: "u-number" };
var oa2 = V(defineComponent({ __name: "Badge", props: { color: { default: "" }, count: { default: 0 }, max: { default: 99 }, showZero: { type: Boolean, default: false }, dot: { type: Boolean, default: false }, status: { default: void 0 }, text: { default: "" }, countStyle: { default: () => ({}) }, title: { default: "" }, ripple: { type: Boolean, default: true } }, setup(l) {
  const a3 = l, e3 = ["pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"], o = computed(() => {
    if (a3.color && !e3.includes(a3.color))
      return { color: a3.color, backgroundColor: a3.color };
  }), n = useSlots(), d3 = computed(() => {
    var c3;
    if (!a3.status && !a3.color) {
      const p = (c3 = n.default) == null ? void 0 : c3.call(n);
      if (p)
        return !!(p[0].children !== "v-if" && (p != null && p.length));
    }
    return false;
  }), s3 = computed(() => {
    var c3;
    if (!a3.status && !a3.color) {
      const p = (c3 = n.count) == null ? void 0 : c3.call(n);
      return !!(p != null && p.length);
    }
    return false;
  });
  return (c3, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-badge", { "badge-status": c3.status }]) }, [c3.status || c3.color ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("span", { class: normalizeClass(["u-status-dot", [`status-${c3.status || c3.color}`, { "dot-ripple": c3.ripple }]]), style: normalizeStyle(o.value) }, null, 6), createBaseVNode("span", el2, [renderSlot(c3.$slots, "default", {}, () => [createTextVNode(toDisplayString(c3.text), 1)], true)])], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [d3.value ? (openBlock(), createElementBlock("span", al2, [renderSlot(c3.$slots, "default", {}, void 0, true)])) : createCommentVNode("", true), s3.value ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["m-count", { "only-number": !d3.value }]) }, [renderSlot(c3.$slots, "count", {}, void 0, true)], 2)) : (openBlock(), createBlock(Transition, { key: 2, name: "zoom" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-badge-count", { "small-num": c3.count < 10, "only-number": !d3.value, "only-dot": c3.count === 0 && !c3.showZero }]), style: normalizeStyle(c3.countStyle), title: c3.title || String(c3.count) }, [c3.dot ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", tl2, [createBaseVNode("span", ol2, toDisplayString(c3.count > c3.max ? c3.max + "+" : c3.count), 1)]))], 14, ll2), [[vShow, c3.showZero || c3.count !== 0 || c3.dot]])]), _: 1 }))], 64))], 2));
} }), [["__scopeId", "data-v-251706ce"]]);
oa2.install = (l) => {
  l.component(oa2.__name, oa2);
};
var r1 = (l) => (pushScopeId("data-v-48d2adb6"), l = l(), popScopeId(), l);
var sl2 = ["href", "title", "target"];
var nl2 = { key: 0, class: "u-separator" };
var il2 = { key: 1, class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "right", "aria-hidden": "true", focusable: "false" };
var ul2 = [r1(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" }, null, -1))];
var cl2 = r1(() => createBaseVNode("div", { class: "assist" }, null, -1));
var sa2 = V(defineComponent({ __name: "Breadcrumb", props: { routes: { default: () => [] }, fontSize: { default: 14 }, height: { default: 21 }, maxWidth: { default: 180 }, separator: { default: "" }, target: { default: "_self" } }, setup(l) {
  const a3 = l, e3 = computed(() => a3.routes.length);
  function o(n) {
    var d3 = n.path;
    if (n.query && JSON.stringify(n.query) !== "{}") {
      const s3 = n.query;
      Object.keys(s3).forEach((c3, p) => {
        d3 = p === 0 ? d3 + "?" + c3 + "=" + s3[c3] : d3 + "&" + c3 + "=" + s3[c3];
      });
    }
    return d3;
  }
  return (n, d3) => (openBlock(), createElementBlock("div", { class: "m-breadcrumb", style: normalizeStyle(`height: ${n.height}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(n.routes, (s3, c3) => (openBlock(), createElementBlock("div", { class: "m-bread", key: c3 }, [createBaseVNode("a", { class: normalizeClass(["u-route", { active: c3 === e3.value - 1 }]), style: normalizeStyle(`font-size: ${n.fontSize}px; max-width: ${n.maxWidth}px;`), href: c3 === e3.value - 1 ? "javascript:;" : o(s3), title: s3.name, target: c3 === e3.value - 1 ? "_self" : n.target }, toDisplayString(s3.name || "--"), 15, sl2), c3 !== e3.value - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [n.separator ? (openBlock(), createElementBlock("span", nl2, toDisplayString(n.separator), 1)) : (openBlock(), createElementBlock("svg", il2, ul2))], 64)) : createCommentVNode("", true)]))), 128)), cl2], 4));
} }), [["__scopeId", "data-v-48d2adb6"]]);
sa2.install = (l) => {
  l.component(sa2.__name, sa2);
};
var dl2 = ["href", "target", "disabled"];
var rl2 = { class: "u-text" };
var xe = V(defineComponent({ __name: "Button", props: { name: { default: "按钮" }, type: { default: "default" }, effect: { default: "fade" }, size: { default: "middle" }, route: { default: () => ({}) }, target: { default: "_self" }, disabled: { type: Boolean, default: false }, loading: { type: Boolean, default: false }, center: { type: Boolean, default: false } }, emits: ["click"], setup(l, { emit: a3 }) {
  const e3 = l, o = computed(() => JSON.stringify(e3.route) !== "{}"), n = a3;
  function d3(c3) {
    o.value || n("click", c3);
  }
  function s3(c3) {
    var p = c3.path;
    if (c3.query && JSON.stringify(c3.query) !== "{}") {
      const i3 = c3.query;
      Object.keys(i3).forEach((h5, x3) => {
        p = x3 === 0 ? p + "?" + h5 + "=" + i3[h5] : p + "&" + h5 + "=" + i3[h5];
      });
    }
    return p;
  }
  return (c3, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-btn-wrap", { center: c3.center }]) }, [createBaseVNode("a", { onClick: d3, href: s3(c3.route), target: o.value ? c3.target : "_self", disabled: c3.disabled, class: normalizeClass(["m-btn", [c3.type, c3.size, { [c3.effect]: c3.type === "default", disabled: c3.disabled, "m-btn-loading": !o.value && c3.loading }]]) }, [withDirectives(createBaseVNode("span", { class: normalizeClass(["m-loading-icon", { [`loading-${c3.size}`]: c3.loading }]) }, [createBaseVNode("span", { class: normalizeClass(["u-spin-circle", `spin-${c3.size}`]) }, null, 2)], 2), [[vShow, !o.value]]), createBaseVNode("span", rl2, [renderSlot(c3.$slots, "default", {}, () => [createTextVNode(toDisplayString(c3.name), 1)], true)])], 10, dl2)], 2));
} }), [["__scopeId", "data-v-2ce0a6fe"]]);
xe.install = (l) => {
  l.component(xe.__name, xe);
};
var vl2 = { class: "m-head-wrapper" };
var pl2 = { class: "u-title" };
var fl2 = { class: "u-extra" };
var na2 = V(defineComponent({ __name: "Card", props: { width: { default: "auto" }, bordered: { type: Boolean, default: true }, extra: { default: "" }, size: { default: "default" }, title: { default: "" }, headStyle: { default: () => ({}) }, bodyStyle: { default: () => ({}) } }, setup(l) {
  const a3 = l, e3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), o = useSlots(), n = computed(() => {
    var p, i3, h5, x3;
    const d3 = (p = o.title) == null ? void 0 : p.call(o), s3 = (i3 = o.extra) == null ? void 0 : i3.call(o);
    let c3 = 0;
    return d3 && ((h5 = d3[0].children) != null && h5.length) && c3++, s3 && ((x3 = s3[0].children) != null && x3.length) && c3++, !!c3 || a3.title || a3.extra;
  });
  return (d3, s3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-card", { bordered: d3.bordered, "m-small-card": d3.size === "small" }]), style: normalizeStyle(`width: ${e3.value};`) }, [n.value ? (openBlock(), createElementBlock("div", { key: 0, class: "m-card-head", style: normalizeStyle(d3.headStyle) }, [createBaseVNode("div", vl2, [createBaseVNode("div", pl2, [renderSlot(d3.$slots, "title", {}, () => [createTextVNode(toDisplayString(d3.title), 1)], true)]), createBaseVNode("div", fl2, [renderSlot(d3.$slots, "extra", {}, () => [createTextVNode(toDisplayString(d3.extra), 1)], true)])])], 4)) : createCommentVNode("", true), createBaseVNode("div", { class: "m-card-body", style: normalizeStyle(d3.bodyStyle) }, [renderSlot(d3.$slots, "default", {}, void 0, true)], 4)], 6));
} }), [["__scopeId", "data-v-d6040459"]]);
na2.install = (l) => {
  l.component(na2.__name, na2);
};
var Ne = (l) => (pushScopeId("data-v-22ff15ed"), l = l(), popScopeId(), l);
var hl2 = { class: "m-spin" };
var ml2 = { class: "m-spin-box" };
var gl2 = { key: 0, class: "m-spin-dot" };
var yl2 = [Ne(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), Ne(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), Ne(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1)), Ne(() => createBaseVNode("span", { class: "u-dot-item" }, null, -1))];
var bl2 = { key: 1, class: "u-quarter-circle" };
var kl2 = { key: 2, class: "u-three-quarters-circle" };
var wl2 = { key: 3, class: "m-dynamic-circle" };
var xl2 = [Ne(() => createBaseVNode("svg", { class: "circular", viewBox: "0 0 50 50" }, [createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" })], -1))];
var ie = V(defineComponent({ __name: "Spin", props: { spinning: { type: Boolean, default: true }, size: { default: "default" }, tip: { default: "" }, indicator: { default: "dot" }, color: { default: "#1677FF" } }, setup: (l) => (a3, e3) => (openBlock(), createElementBlock("div", { class: normalizeClass(`m-spin-wrap ${a3.size}`), style: normalizeStyle(`--color: ${a3.color};`) }, [withDirectives(createBaseVNode("div", hl2, [createBaseVNode("div", ml2, [a3.indicator === "dot" ? (openBlock(), createElementBlock("div", gl2, yl2)) : createCommentVNode("", true), a3.indicator === "quarter-circle" ? (openBlock(), createElementBlock("div", bl2)) : createCommentVNode("", true), a3.indicator === "three-quarters-circle" ? (openBlock(), createElementBlock("div", kl2)) : createCommentVNode("", true), a3.indicator === "dynamic-circle" ? (openBlock(), createElementBlock("div", wl2, xl2)) : createCommentVNode("", true), withDirectives(createBaseVNode("p", { class: "u-tip" }, toDisplayString(a3.tip), 513), [[vShow, a3.tip]])])], 512), [[vShow, a3.spinning]]), createBaseVNode("div", { class: normalizeClass(["m-spin-content", { "m-spin-mask": a3.spinning }]) }, [renderSlot(a3.$slots, "default", {}, void 0, true)], 2)], 6)) }), [["__scopeId", "data-v-22ff15ed"]]);
ie.install = (l) => {
  l.component(ie.__name, ie);
};
var v1 = (l) => (pushScopeId("data-v-9a59f428"), l = l(), popScopeId(), l);
var Ml2 = ["href", "target"];
var zl2 = ["onLoad", "src", "alt"];
var _l2 = { key: 0, class: "m-image" };
var Cl2 = ["href", "target"];
var $l2 = ["src", "alt"];
var Bl2 = [v1(() => createBaseVNode("path", { d: "M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z" }, null, -1))];
var Fl2 = [v1(() => createBaseVNode("path", { d: "M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z" }, null, -1))];
var Sl2 = { key: 1, class: "m-switch" };
var Ll2 = ["onClick"];
var ia2 = V(defineComponent({ __name: "Carousel", props: { images: { default: () => [] }, interval: { default: 3e3 }, width: { default: "100%" }, height: { default: "100vh" }, navigation: { type: Boolean, default: true }, navColor: { default: "#FFF" }, navSize: { default: 36 }, pagination: { type: Boolean, default: true }, pageActiveColor: { default: "#1677FF" }, pageSize: { default: 10 }, pageStyle: { default: () => ({}) }, disableOnInteraction: { type: Boolean, default: true }, pauseOnMouseEnter: { type: Boolean, default: true } }, setup(l) {
  const a3 = l, e3 = ref(true), o = ref(0), n = ref(false), d3 = ref(), s3 = ref(), c3 = ref(), p = ref(false), i3 = ref(), h5 = ref(1), x3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), M3 = computed(() => typeof a3.height == "number" ? a3.height + "px" : a3.height), m3 = computed(() => (a3.images.length + 1) * z3.value), u3 = computed(() => a3.images.length);
  onMounted(() => {
    (function() {
      var D3 = null;
      function q3(Z) {
        D3 ? (k3.value = Math.floor(1e3 / (Z - D3)), console.log("fps", k3.value)) : (g.value > 10 && (D3 = Z), g.value = pe(q3));
      }
      g.value = pe(q3);
    })(), z3.value = i3.value.offsetWidth, B3.value = i3.value.offsetHeight, document.addEventListener("keydown", I3);
  }), onUnmounted(() => {
    document.removeEventListener("keydown", I3);
  });
  const b3 = ref(Array(u3.value).fill(false)), g = ref(), k3 = ref(60), f = computed(() => k3.value === 60 ? 12 : k3.value / 60 * 12);
  function y3(D3) {
    b3.value[D3] = true;
  }
  watch(() => b3.value[0], (D3) => {
    D3 && S3();
  });
  const z3 = ref(), B3 = ref();
  function I3(D3) {
    D3.preventDefault(), u3.value > 1 && (D3.key !== "ArrowLeft" && D3.key !== "ArrowUp" || ke2(), D3.key !== "ArrowRight" && D3.key !== "ArrowDown" || we());
  }
  function S3() {
    u3.value > 1 && b3.value[0] && (e3.value = true, n.value = false, K3(), console.log("imageSlider start"));
  }
  function H3() {
    Qa(s3.value), n.value = true, o.value = Math.ceil(o.value / z3.value) * z3.value;
  }
  function E3() {
    Qa(s3.value), n.value = true, o.value = Math.floor(o.value / z3.value) * z3.value;
  }
  function K3() {
    d3.value = me(() => {
      const D3 = o.value % (u3.value * z3.value) + z3.value;
      h5.value = h5.value % u3.value + 1, function(q3) {
        o.value === u3.value * z3.value && (o.value = 0), c3.value = q3, s3.value = pe(re);
      }(D3);
    }, a3.interval);
  }
  function ee(D3) {
    e3.value ? H3() : (E3(), e3.value = true), n.value = false, function(q3) {
      o.value === u3.value * z3.value && (o.value = 0), c3.value = q3, s3.value = pe(ne);
    }(D3);
  }
  function de(D3) {
    e3.value ? (H3(), e3.value = false) : E3(), n.value = false, function(q3) {
      o.value === 0 && (o.value = u3.value * z3.value), c3.value = q3, s3.value = pe(ve);
    }(D3);
  }
  function ke2() {
    const D3 = (h5.value + u3.value - 2) % u3.value * z3.value;
    h5.value = h5.value - 1 > 0 ? h5.value - 1 : u3.value, de(D3);
  }
  function we() {
    const D3 = h5.value * z3.value;
    h5.value = h5.value % u3.value + 1, ee(D3);
  }
  function re() {
    if (o.value >= c3.value)
      K3();
    else {
      var D3 = Math.ceil((c3.value - o.value) / f.value);
      o.value += D3, s3.value = pe(re);
    }
  }
  function ne() {
    if (o.value >= c3.value)
      p.value && (p.value = false, a3.disableOnInteraction || a3.pauseOnMouseEnter || S3());
    else {
      var D3 = Math.ceil((c3.value - o.value) / f.value);
      o.value += D3, s3.value = pe(ne);
    }
  }
  function ve() {
    if (o.value <= c3.value)
      p.value && (p.value = false, a3.disableOnInteraction || a3.pauseOnMouseEnter || S3());
    else {
      var D3 = Math.floor((c3.value - o.value) / f.value);
      o.value += D3, s3.value = pe(ve);
    }
  }
  return (D3, q3) => (openBlock(), createElementBlock("div", { class: "m-slider", ref_key: "carousel", ref: i3, style: normalizeStyle(`--navColor: ${D3.navColor}; --pageActiveColor: ${D3.pageActiveColor}; width: ${x3.value}; height: ${M3.value};`), onMouseenter: q3[1] || (q3[1] = (Z) => D3.pauseOnMouseEnter ? (Ce2(d3.value), d3.value = null, e3.value ? H3() : E3(), void console.log("imageSlider stop")) : () => false), onMouseleave: q3[2] || (q3[2] = (Z) => D3.pauseOnMouseEnter ? S3() : () => false) }, [createBaseVNode("div", { class: normalizeClass({ transition: n.value }), style: normalizeStyle(`width: ${m3.value}px; height: 100%; will-change: transform; transform: translateX(${-o.value}px);`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(D3.images, (Z, ae) => (openBlock(), createElementBlock("div", { class: "m-image", key: ae }, [createVNode(unref(ie), { spinning: !b3.value[ae], indicator: "dynamic-circle" }, { default: withCtx(() => [createBaseVNode("a", { href: Z.link ? Z.link : "javascript:;", target: Z.link ? "_blank" : "_self", class: "m-link" }, [(openBlock(), createElementBlock("img", { onLoad: (le) => y3(ae), src: Z.src, key: Z.src, alt: Z.title, class: "u-img", style: normalizeStyle(`width: ${z3.value}px; height: ${B3.value}px;`) }, null, 44, zl2))], 8, Ml2)]), _: 2 }, 1032, ["spinning"])]))), 128)), u3.value ? (openBlock(), createElementBlock("div", _l2, [createVNode(unref(ie), { spinning: !b3.value[0], indicator: "dynamic-circle" }, { default: withCtx(() => [createBaseVNode("a", { href: D3.images[0].link ? D3.images[0].link : "javascript:;", target: D3.images[0].link ? "_blank" : "_self", class: "m-link" }, [(openBlock(), createElementBlock("img", { onLoad: q3[0] || (q3[0] = (Z) => y3(0)), src: D3.images[0].src, key: D3.images[0].src, alt: D3.images[0].title, class: "u-img", style: normalizeStyle(`width: ${z3.value}px; height: ${B3.value}px;`) }, null, 44, $l2))], 8, Cl2)]), _: 1 }, 8, ["spinning"])])) : createCommentVNode("", true)], 6), D3.navigation ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [(openBlock(), createElementBlock("svg", { class: "arrow-left", style: normalizeStyle(`width: ${D3.navSize}px; height: ${D3.navSize}px;`), onClick: ke2, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, Bl2, 4)), (openBlock(), createElementBlock("svg", { class: "arrow-right", style: normalizeStyle(`width: ${D3.navSize}px; height: ${D3.navSize}px;`), onClick: we, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" }, Fl2, 4))], 64)) : createCommentVNode("", true), D3.pagination ? (openBlock(), createElementBlock("div", Sl2, [(openBlock(true), createElementBlock(Fragment, null, renderList(u3.value, (Z) => (openBlock(), createElementBlock("div", { onClick: (ae) => function(le) {
    if (h5.value !== le) {
      p.value = true;
      const Q3 = (le - 1) * z3.value;
      le < h5.value && (h5.value = le, de(Q3)), le > h5.value && (h5.value = le, ee(Q3));
    }
  }(Z), class: normalizeClass(["u-circle", { active: h5.value === Z }]), style: normalizeStyle([{ width: `${D3.pageSize}px`, height: `${D3.pageSize}px` }, D3.pageStyle]), key: Z }, null, 14, Ll2))), 128))])) : createCommentVNode("", true)], 36));
} }), [["__scopeId", "data-v-9a59f428"]]);
ia2.install = (l) => {
  l.component(ia2.__name, ia2);
};
var Al2 = { class: "m-empty" };
var Dl2 = [createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-fca5069e><g transform="translate(24 31.67)" data-v-fca5069e><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-fca5069e></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-fca5069e></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-fca5069e></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-fca5069e></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-fca5069e></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-fca5069e></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-fca5069e><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-fca5069e></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-fca5069e></path></g></g>', 1)];
var El2 = [createStaticVNode('<g transform="translate(0 1)" fill="none" fill-rule="evenodd" data-v-fca5069e><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" data-v-fca5069e></ellipse><g fill-rule="nonzero" stroke="#d9d9d9" data-v-fca5069e><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" data-v-fca5069e></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" data-v-fca5069e></path></g></g>', 1)];
var Hl2 = ["src"];
var He2 = V(defineComponent({ __name: "Empty", props: { description: { default: "暂无数据" }, image: { default: "1" }, imageStyle: { default: () => ({}) } }, setup: (l) => (a3, e3) => (openBlock(), createElementBlock("div", Al2, [a3.image === "1" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-empty-1", style: normalizeStyle(a3.imageStyle), viewBox: "0 0 184 152", xmlns: "http://www.w3.org/2000/svg" }, Dl2, 4)) : a3.image === "2" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-empty-2", style: normalizeStyle(a3.imageStyle), viewBox: "0 0 64 41", xmlns: "http://www.w3.org/2000/svg" }, El2, 4)) : renderSlot(a3.$slots, "default", { key: 2 }, () => [createBaseVNode("img", { class: "u-empty", src: a3.image, style: normalizeStyle(a3.imageStyle), alt: "image" }, null, 12, Hl2)], true), a3.description ? (openBlock(), createElementBlock("p", { key: 3, class: normalizeClass(["u-description", { gray: a3.image === "2" }]) }, [renderSlot(a3.$slots, "description", {}, () => [createTextVNode(toDisplayString(a3.description), 1)], true)], 2)) : createCommentVNode("", true)])) }), [["__scopeId", "data-v-fca5069e"]]);
He2.install = (l) => {
  l.component(He2.__name, He2);
};
var a1 = (l) => (pushScopeId("data-v-c92d5a45"), l = l(), popScopeId(), l);
var Il2 = ["title"];
var Tl2 = ["placeholder"];
var jl2 = [a1(() => createBaseVNode("path", { d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" }, null, -1))];
var Vl2 = [a1(() => createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1))];
var Rl2 = [a1(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var Wl2 = ["title", "onMouseenter", "onClick"];
var Se = V(defineComponent({ __name: "Select", props: { options: { default: () => [] }, label: { default: "label" }, value: { default: "value" }, placeholder: { default: "请选择" }, disabled: { type: Boolean, default: false }, allowClear: { type: Boolean, default: false }, search: { type: Boolean, default: false }, filter: { type: [Function, Boolean], default: true }, width: { default: 120 }, height: { default: 32 }, maxDisplay: { default: 6 }, modelValue: { default: null } }, emits: ["update:modelValue", "change"], setup(l, { emit: a3 }) {
  const e3 = l, o = ref(), n = ref(), d3 = ref(), s3 = ref(), c3 = ref(false), p = ref(true), i3 = ref(true), h5 = ref(false), x3 = ref(false), M3 = ref();
  function m3() {
    e3.allowClear && n.value && (i3.value = false, h5.value = true, e3.search && (x3.value = false));
  }
  function u3() {
    e3.allowClear && h5.value && (h5.value = false, e3.search || (i3.value = true)), e3.search && (c3.value ? (x3.value = true, i3.value = false, M3.value.focus()) : (x3.value = false, i3.value = true));
  }
  function b3() {
    p.value = false;
  }
  function g() {
    s3.value = null, p.value = true, M3.value.focus();
  }
  watchEffect(() => {
    e3.search ? (o.value = e3.options.filter((y3) => typeof e3.filter == "function" ? e3.filter(d3.value, y3) : y3[e3.label].includes(d3.value)), o.value.length && d3.value ? s3.value = o.value[0][e3.value] : s3.value = null) : o.value = e3.options;
  }), watchEffect(() => {
    (function() {
      if (e3.modelValue) {
        const y3 = e3.options.find((z3) => z3[e3.value] === e3.modelValue);
        y3 ? (n.value = y3[e3.label], s3.value = y3[e3.value]) : (n.value = e3.modelValue, s3.value = null);
      } else
        n.value = null, s3.value = null;
      e3.search && (d3.value = n.value);
    })();
  }), watch(c3, (y3) => {
    !y3 && e3.search && (d3.value = n.value);
  });
  const k3 = a3;
  function f() {
    h5.value = false, n.value = null, s3.value = null, c3.value = false, i3.value = true, k3("update:modelValue"), k3("change");
  }
  return (y3, z3) => (openBlock(), createElementBlock("div", { class: "m-select", style: normalizeStyle(`height: ${y3.height}px;`) }, [createBaseVNode("div", { class: normalizeClass(["m-select-wrap", { hover: !y3.disabled, focus: c3.value, disabled: y3.disabled }]), style: normalizeStyle(`width: ${y3.width}px; height: ${y3.height}px;`), tabindex: "1", ref_key: "selectRef", ref: M3, onMouseenter: m3, onMouseleave: u3, onBlur: z3[1] || (z3[1] = (B3) => p.value && !y3.disabled ? (c3.value && (c3.value = false), void (e3.search && (x3.value = false, i3.value = true))) : () => false), onClick: z3[2] || (z3[2] = (B3) => y3.disabled ? () => false : function() {
    if (c3.value = !c3.value, d3.value = "", !s3.value && n.value) {
      const I3 = e3.options.find((S3) => S3[e3.label] === n.value);
      s3.value = I3 ? I3[e3.value] : null;
    }
    e3.search && (h5.value || (i3.value = !c3.value, x3.value = c3.value));
  }()) }, [y3.search ? withDirectives((openBlock(), createElementBlock("input", { key: 1, class: "u-search", style: normalizeStyle(`line-height: ${y3.height - 2}px;`), autocomplete: "off", "onUpdate:modelValue": z3[0] || (z3[0] = (B3) => d3.value = B3), placeholder: n.value || y3.placeholder }, null, 12, Tl2)), [[vModelText, d3.value, void 0, { number: true, trim: true }]]) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["u-select-input", { placeholder: !n.value }]), style: normalizeStyle(`line-height: ${y3.height - 2}px;`), title: n.value }, toDisplayString(n.value || y3.placeholder), 15, Il2)), (openBlock(), createElementBlock("svg", { focusable: "false", class: normalizeClass(["u-svg", { show: x3.value }]), "data-icon": "search", "aria-hidden": "true", viewBox: "64 64 896 896" }, jl2, 2)), (openBlock(), createElementBlock("svg", { class: normalizeClass(["u-svg", { rotate: c3.value, show: i3.value }]), viewBox: "64 64 896 896", "data-icon": "down", "aria-hidden": "true", focusable: "false" }, Vl2, 2)), (openBlock(), createElementBlock("svg", { onClick: withModifiers(f, ["stop"]), class: normalizeClass(["close", { show: h5.value }]), focusable: "false", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" }, Rl2, 2))], 38), createVNode(TransitionGroup, { name: "fade", tag: "div" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-options-panel", onMouseenter: b3, onMouseleave: g, key: "1", style: normalizeStyle(`top: ${y3.height + 4}px; line-height: ${y3.height - 10}px; max-height: ${y3.maxDisplay * y3.height + 9}px; width: ${y3.width}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (B3, I3) => (openBlock(), createElementBlock("p", { key: I3, class: normalizeClass(["u-option", { "option-hover": !B3.disabled && B3[y3.value] === s3.value, "option-selected": B3[y3.label] === n.value, "option-disabled": B3.disabled }]), title: B3[y3.label], onMouseenter: (S3) => {
    return H3 = B3[y3.value], void (s3.value = H3);
    var H3;
  }, onClick: (S3) => B3.disabled ? () => false : function(H3, E3, K3) {
    e3.modelValue !== H3 && (n.value = E3, s3.value = H3, k3("update:modelValue", H3), k3("change", H3, E3, K3)), c3.value = false, e3.search && (x3.value = false, i3.value = true);
  }(B3[y3.value], B3[y3.label], I3) }, toDisplayString(B3[y3.label]), 43, Wl2))), 128))], 36), [[vShow, c3.value && o.value && o.value.length]]), withDirectives(createBaseVNode("div", { key: "2", class: "m-empty-wrap", style: normalizeStyle(`top: ${y3.height + 4}px; width: ${y3.width}px;`) }, [createVNode(unref(He2), { image: "2", key: "2" })], 4), [[vShow, c3.value && o.value && !o.value.length]])]), _: 1 })], 4));
} }), [["__scopeId", "data-v-c92d5a45"]]);
Se.install = (l) => {
  l.component(Se.__name, Se);
};
var ua2 = V(defineComponent({ __name: "Cascader", props: { options: { default: () => [] }, label: { default: "label" }, value: { default: "value" }, children: { default: "children" }, placeholder: { default: "请选择" }, changeOnSelect: { type: Boolean, default: false }, gap: { default: 8 }, width: { default: 120 }, height: { default: 32 }, disabled: { type: [Boolean, Array], default: false }, allowClear: { type: Boolean, default: false }, search: { type: Boolean, default: false }, filter: { type: [Function, Boolean], default: true }, maxDisplay: { default: 6 }, selectedValue: { default: () => [] } }, emits: ["update:selectedValue", "change"], setup(l, { emit: a3 }) {
  const e3 = l, o = ref([]), n = ref([]), d3 = ref([]), s3 = ref([]), c3 = ref([]);
  function p(u3, b3) {
    const g = u3.length;
    for (let k3 = 0; k3 < g; k3++)
      if (u3[k3][e3.value] === o.value[b3])
        return u3[k3][e3.children] || [];
    return [];
  }
  function i3(u3, b3) {
    const g = u3.length;
    for (let k3 = 0; k3 < g; k3++)
      if (u3[k3][e3.value] === o.value[b3])
        return u3[k3][e3.label];
    return o.value[b3];
  }
  watchEffect(() => {
    d3.value = [...e3.options];
  }), watchEffect(() => {
    o.value = [...e3.selectedValue];
  }), watchEffect(() => {
    var u3;
    u3 = o.value, s3.value = p(d3.value, 0), c3.value = [], u3.length > 1 && (c3.value = p(s3.value, 1)), function(b3) {
      n.value[0] = i3(d3.value, 0), b3.length > 1 && (n.value[1] = i3(s3.value, 1)), b3.length > 2 && (n.value[2] = i3(c3.value, 2));
    }(o.value);
  });
  const h5 = a3;
  function x3(u3, b3) {
    e3.changeOnSelect ? (h5("update:selectedValue", [u3]), h5("change", [u3], [b3])) : (o.value = [u3], n.value = [b3]);
  }
  function M3(u3, b3) {
    e3.changeOnSelect ? (h5("update:selectedValue", [o.value[0], u3]), h5("change", [o.value[0], u3], [n.value[0], b3])) : (o.value = [o.value[0], u3], n.value = [n.value[0], b3]);
  }
  function m3(u3, b3) {
    h5("update:selectedValue", [...o.value.slice(0, 2), u3]), h5("change", [...o.value.slice(0, 2), u3], [...n.value.slice(0, 2), b3]);
  }
  return (u3, b3) => (openBlock(), createElementBlock("div", { class: "m-cascader", style: normalizeStyle(`height: ${u3.height}px; gap: ${u3.gap}px;`) }, [createVNode(unref(Se), { options: d3.value, label: u3.label, value: u3.value, placeholder: Array.isArray(u3.placeholder) ? u3.placeholder[0] : u3.placeholder, disabled: Array.isArray(u3.disabled) ? u3.disabled[0] : u3.disabled, "allow-clear": u3.allowClear, search: u3.search, filter: u3.filter, width: Array.isArray(u3.width) ? u3.width[0] : u3.width, height: u3.height, "max-display": u3.maxDisplay, modelValue: o.value[0], "onUpdate:modelValue": b3[0] || (b3[0] = (g) => o.value[0] = g), onChange: x3 }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]), createVNode(unref(Se), { options: s3.value, label: u3.label, value: u3.value, placeholder: Array.isArray(u3.placeholder) ? u3.placeholder[1] : u3.placeholder, disabled: Array.isArray(u3.disabled) ? u3.disabled[1] : u3.disabled, "allow-clear": u3.allowClear, search: u3.search, filter: u3.filter, width: Array.isArray(u3.width) ? u3.width[1] : u3.width, height: u3.height, "max-display": u3.maxDisplay, modelValue: o.value[1], "onUpdate:modelValue": b3[1] || (b3[1] = (g) => o.value[1] = g), onChange: M3 }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"]), createVNode(unref(Se), { options: c3.value, label: u3.label, value: u3.value, placeholder: Array.isArray(u3.placeholder) ? u3.placeholder[2] : u3.placeholder, disabled: Array.isArray(u3.disabled) ? u3.disabled[2] : u3.disabled, "allow-clear": u3.allowClear, search: u3.search, filter: u3.filter, width: Array.isArray(u3.width) ? u3.width[2] : u3.width, height: u3.height, "max-display": u3.maxDisplay, modelValue: o.value[2], "onUpdate:modelValue": b3[2] || (b3[2] = (g) => o.value[2] = g), onChange: m3 }, null, 8, ["options", "label", "value", "placeholder", "disabled", "allow-clear", "search", "filter", "width", "height", "max-display", "modelValue"])], 4));
} }), [["__scopeId", "data-v-3cd9d99b"]]);
ua2.install = (l) => {
  l.component(ua2.__name, ua2);
};
var Nl2 = ["onClick"];
var Ol2 = { class: "u-label" };
var ql2 = { key: 1, class: "m-checkbox-wrap" };
var Pl2 = { class: "u-label" };
var ca2 = V(defineComponent({ __name: "Checkbox", props: { options: { default: () => [] }, disabled: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, value: { default: () => [] }, gap: { default: 8 }, width: { default: "auto" }, height: { default: "auto" }, indeterminate: { type: Boolean, default: false }, checked: { type: Boolean, default: false } }, emits: ["update:value", "update:checked", "change"], setup(l, { emit: a3 }) {
  const e3 = l, o = computed(() => e3.options.length), n = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), d3 = computed(() => typeof e3.height == "number" ? e3.height + "px" : e3.height), s3 = ref(e3.value);
  watch(() => e3.value, (h5) => {
    s3.value = h5;
  });
  const c3 = computed(() => e3.vertical ? { marginBottom: e3.gap + "px" } : { marginRight: e3.gap + "px" }), p = a3;
  function i3() {
    p("update:checked", !e3.checked);
  }
  return (h5, x3) => (openBlock(), createElementBlock("div", { class: "m-checkbox", style: normalizeStyle(`max-width: ${n.value}; max-height: ${d3.value};`) }, [o.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(h5.options, (M3, m3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-checkbox-wrap", { vertical: h5.vertical }]), style: normalizeStyle(o.value !== m3 + 1 ? c3.value : ""), key: m3 }, [createBaseVNode("div", { class: normalizeClass(["m-box", { disabled: h5.disabled || M3.disabled }]), onClick: (u3) => h5.disabled || M3.disabled ? () => false : function(b3) {
    if (e3.value.includes(b3)) {
      const g = s3.value.filter((k3) => k3 !== b3);
      p("update:value", g), p("change", g);
    } else {
      const g = [...s3.value, b3];
      p("update:value", g), p("change", g);
    }
  }(M3.value) }, [createBaseVNode("span", { class: normalizeClass(["u-checkbox", { "u-checkbox-checked": s3.value.includes(M3.value) }]) }, null, 2), createBaseVNode("span", Ol2, [renderSlot(h5.$slots, "default", { label: M3.label }, () => [createTextVNode(toDisplayString(M3.label), 1)], true)])], 10, Nl2)], 6))), 128)) : (openBlock(), createElementBlock("div", ql2, [createBaseVNode("div", { class: normalizeClass(["m-box", { disabled: h5.disabled }]), onClick: i3 }, [createBaseVNode("span", { class: normalizeClass(["u-checkbox", { "u-checkbox-checked": h5.checked && !h5.indeterminate, indeterminate: h5.indeterminate }]) }, null, 2), createBaseVNode("span", Pl2, [renderSlot(h5.$slots, "default", {}, () => [createTextVNode("Check all")], true)])], 2)]))], 4));
} }), [["__scopeId", "data-v-2a033f18"]]);
ca2.install = (l) => {
  l.component(ca2.__name, ca2);
};
var da2 = V(defineComponent({ __name: "Col", props: { span: { default: void 0 }, offset: { default: 0 }, flex: { default: "" }, xs: { default: void 0 }, sm: { default: void 0 }, md: { default: void 0 }, lg: { default: void 0 }, xl: { default: void 0 }, xxl: { default: void 0 } }, setup(l) {
  const a3 = l, e3 = computed(() => typeof a3.flex == "number" ? `${a3.flex} ${a3.flex} auto` : a3.flex), o = computed(() => n.value >= 1600 && a3.xxl ? typeof a3.xxl == "object" ? a3.xxl : { span: a3.xxl, offset: void 0 } : n.value >= 1200 && a3.xl ? typeof a3.xl == "object" ? a3.xl : { span: a3.xl, offset: void 0 } : n.value >= 992 && a3.lg ? typeof a3.lg == "object" ? a3.lg : { span: a3.lg, offset: void 0 } : n.value >= 768 && a3.md ? typeof a3.md == "object" ? a3.md : { span: a3.md, offset: void 0 } : n.value >= 576 && a3.sm ? typeof a3.sm == "object" ? a3.sm : { span: a3.sm, offset: void 0 } : n.value < 576 && a3.xs ? typeof a3.xs == "object" ? a3.xs : { span: a3.xs, offset: void 0 } : void 0), n = ref(document.documentElement.clientWidth);
  function d3() {
    n.value = document.documentElement.clientWidth;
  }
  return onMounted(() => {
    window.addEventListener("resize", d3);
  }), onUnmounted(() => {
    window.removeEventListener("resize", d3);
  }), (s3, c3) => {
    var p, i3;
    return openBlock(), createElementBlock("div", { class: normalizeClass(`m-col col-${((p = o.value) == null ? void 0 : p.span) || s3.span} offset-${((i3 = o.value) == null ? void 0 : i3.offset) || s3.offset}`), style: normalizeStyle([{ "padding-left": "var(--xGap)", "padding-right": "var(--xGap)" }, `flex: ${e3.value}`]) }, [renderSlot(s3.$slots, "default", {}, void 0, true)], 6);
  };
} }), [["__scopeId", "data-v-c7ddaac6"]]);
da2.install = (l) => {
  l.component(da2.__name, da2);
};
var Yl2 = { class: "m-collapse" };
var Ul2 = ["onClick"];
var Kl2 = { key: 0, focusable: "false", class: "u-arrow", "data-icon": "right", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Zl2 = [((l) => (pushScopeId("data-v-7bb27cfd"), l = l(), popScopeId(), l))(() => createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1))];
var Gl2 = { class: "u-lang" };
var ra2 = V(defineComponent({ __name: "Collapse", props: { collapseData: { default: () => [] }, activeKey: { default: null }, copyable: { type: Boolean, default: false }, lang: { default: "" }, fontSize: { default: 14 }, headerFontSize: { default: 0 }, textFontSize: { default: 0 }, showArrow: { type: Boolean, default: true } }, emits: ["update:activeKey", "change"], setup(l, { emit: a3 }) {
  const e3 = l;
  watchEffect(() => {
    (function(i3) {
      for (let h5 = 0; h5 < i3; h5++)
        n.value.push(o.value[h5].offsetHeight);
    })(e3.collapseData.length);
  }, { flush: "post" });
  const o = ref(), n = ref([]), d3 = a3;
  function s3(i3) {
    d3("update:activeKey", i3), d3("change", i3);
  }
  function c3(i3) {
    return Array.isArray(e3.activeKey) ? e3.activeKey.includes(i3) : e3.activeKey === i3;
  }
  const p = ref("Copy");
  return (i3, h5) => {
    const x3 = resolveComponent("Button");
    return openBlock(), createElementBlock("div", Yl2, [(openBlock(true), createElementBlock(Fragment, null, renderList(i3.collapseData, (M3, m3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-collapse-item", { "u-collapse-item-active": c3(M3.key || m3) }]), key: m3 }, [createBaseVNode("div", { class: "u-collapse-header", onClick: (u3) => {
      var b3;
      c3(b3 = M3.key || m3) ? Array.isArray(e3.activeKey) ? s3(e3.activeKey.filter((g) => g !== b3)) : s3(null) : Array.isArray(e3.activeKey) ? s3([...e3.activeKey, b3]) : s3(b3);
    } }, [i3.showArrow ? (openBlock(), createElementBlock("svg", Kl2, Zl2)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["u-header", { ml24: i3.showArrow }]), style: normalizeStyle(`font-size: ${i3.headerFontSize || i3.fontSize}px;`) }, [renderSlot(i3.$slots, "header", { header: M3.header, key: M3.key || m3 }, () => [createTextVNode(toDisplayString(M3.header || "--"), 1)], true)], 6)], 8, Ul2), createBaseVNode("div", { class: normalizeClass(["u-collapse-content", { "u-collapse-copyable": i3.copyable }]), style: normalizeStyle(`height: ${c3(M3.key || m3) ? n.value[m3] : 0}px; opacity: ${c3(M3.key || m3) ? 1 : 0};`) }, [createBaseVNode("div", Gl2, [renderSlot(i3.$slots, "lang", { lang: i3.lang, key: M3.key || m3 }, () => [createTextVNode(toDisplayString(i3.lang), 1)], true)]), createVNode(x3, { size: "small", class: "u-copy", type: "primary", onClick: (u3) => function(b3) {
      navigator.clipboard.writeText(o.value[b3].innerText || "").then(() => {
        p.value = "Copied", me(() => {
          p.value = "Copy";
        }, 3e3);
      }, (g) => {
        p.value = g;
      });
    }(m3) }, { default: withCtx(() => [createTextVNode(toDisplayString(p.value), 1)]), _: 2 }, 1032, ["onClick"]), createBaseVNode("div", { ref_for: true, ref_key: "text", ref: o, class: "u-text", style: normalizeStyle(`font-size: ${i3.textFontSize || i3.fontSize}px;`) }, [renderSlot(i3.$slots, "text", { text: M3.text, key: M3.key || m3 }, () => [createTextVNode(toDisplayString(M3.text), 1)], true)], 4)], 6)], 2))), 128))]);
  };
} }), [["__scopeId", "data-v-7bb27cfd"]]);
ra2.install = (l) => {
  l.component(ra2.__name, ra2);
};
var Jl2 = { class: "m-countdown" };
var Xl2 = { class: "m-time" };
var Ql2 = { key: 0, class: "u-prefix" };
var et2 = { key: 0, class: "u-suffix" };
var va2 = V(defineComponent({ __name: "Countdown", props: { title: { default: "Countdown" }, value: { default: void 0 }, future: { type: Boolean, default: true }, format: { default: "HH:mm:ss" }, prefix: { default: "" }, suffix: { default: "" }, titleStyle: { default: () => ({}) }, valueStyle: { default: () => ({}) }, finishedText: { default: "Finished" } }, emits: ["finish"], setup(l, { emit: a3 }) {
  const e3 = l, o = useSlots(), n = computed(() => {
    var u3;
    const m3 = (u3 = o.prefix) == null ? void 0 : u3.call(o);
    return m3 ? !!(m3[0].children !== "v-if" && (m3 != null && m3.length)) : e3.prefix;
  }), d3 = computed(() => {
    var u3;
    const m3 = (u3 = o.suffix) == null ? void 0 : u3.call(o);
    return m3 ? !!(m3[0].children !== "v-if" && (m3 != null && m3.length)) : e3.suffix;
  }), s3 = ref(0), c3 = ref(), p = computed(() => ({ showMillisecond: e3.format.includes("SSS"), showYear: e3.format.includes("Y"), showMonth: e3.format.includes("M"), showDay: e3.format.includes("D"), showHour: e3.format.includes("H"), showMinute: e3.format.includes("m"), showSecond: e3.format.includes("s") }));
  function i3(m3) {
    return m3 < 10 ? "0" + m3 : String(m3);
  }
  function h5(m3) {
    if (m3 === null)
      return "--";
    let u3 = e3.format;
    if (p.value.showMillisecond) {
      var b3 = m3 % 1e3;
      u3 = u3.replace("SSS", "0".repeat(3 - String(b3).length) + b3);
    }
    if (m3 = Math.floor(m3 / 1e3), p.value.showYear) {
      var g = Math.floor(m3 / 31104e3);
      u3 = u3.includes("YY") ? u3.replace("YY", i3(g)) : u3.replace("Y", String(g));
    } else
      g = 0;
    if (p.value.showMonth) {
      m3 -= 60 * g * 60 * 24 * 30 * 12;
      var k3 = Math.floor(m3 / 2592e3);
      u3 = u3.includes("MM") ? u3.replace("MM", i3(k3)) : u3.replace("M", String(k3));
    } else
      k3 = 0;
    if (p.value.showDay) {
      m3 -= 60 * k3 * 60 * 24 * 30;
      var f = Math.floor(m3 / 86400);
      u3 = u3.includes("DD") ? u3.replace("DD", i3(f)) : u3.replace("D", String(f));
    } else
      f = 0;
    if (p.value.showHour) {
      m3 -= 60 * f * 60 * 24;
      var y3 = Math.floor(m3 / 3600);
      u3 = u3.includes("HH") ? u3.replace("HH", i3(y3)) : u3.replace("H", String(y3));
    } else
      y3 = 0;
    if (p.value.showMinute) {
      m3 -= 60 * y3 * 60;
      var z3 = Math.floor(m3 / 60);
      u3 = u3.includes("mm") ? u3.replace("mm", i3(z3)) : u3.replace("m", String(z3));
    } else
      z3 = 0;
    if (p.value.showSecond) {
      var B3 = m3 - 60 * z3;
      u3 = u3.includes("ss") ? u3.replace("ss", i3(B3)) : u3.replace("s", String(B3));
    }
    return u3;
  }
  const x3 = a3;
  function M3() {
    s3.value > Date.now() ? (c3.value = s3.value - Date.now(), pe(M3)) : (c3.value = 0, x3("finish"));
  }
  return watchEffect(() => {
    Number.isFinite(e3.value) ? (e3.future ? e3.value >= Date.now() && (s3.value = e3.value) : e3.value >= 0 && (s3.value = e3.value + Date.now()), pe(M3)) : c3.value = null;
  }), (m3, u3) => (openBlock(), createElementBlock("div", Jl2, [createBaseVNode("div", { class: "u-title", style: normalizeStyle(m3.titleStyle) }, [renderSlot(m3.$slots, "title", {}, () => [createTextVNode(toDisplayString(e3.title), 1)], true)], 4), createBaseVNode("div", Xl2, [n.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [n.value || c3.value > 0 || c3.value === null ? (openBlock(), createElementBlock("span", Ql2, [renderSlot(m3.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(m3.prefix), 1)], true)])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), m3.finishedText && c3.value === 0 && c3.value !== null ? (openBlock(), createElementBlock("span", { key: 1, class: "u-time-value", style: normalizeStyle(m3.valueStyle) }, [renderSlot(m3.$slots, "finish", {}, () => [createTextVNode(toDisplayString(m3.finishedText), 1)], true)], 4)) : createCommentVNode("", true), Number.isFinite(c3.value) && c3.value > 0 ? (openBlock(), createElementBlock("span", { key: 2, class: "u-time-value", style: normalizeStyle(m3.valueStyle) }, toDisplayString(h5(c3.value)), 5)) : createCommentVNode("", true), d3.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [d3.value || c3.value > 0 || c3.value === null ? (openBlock(), createElementBlock("span", et2, [renderSlot(m3.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(m3.suffix), 1)], true)])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)])]));
} }), [["__scopeId", "data-v-77cdeaee"]]);
va2.install = (l) => {
  l.component(va2.__name, va2);
};
var pa2 = V(defineComponent({ inheritAttrs: false, __name: "DatePicker", props: { width: { default: 180 }, mode: { default: "date" }, showTime: { type: Boolean, default: false }, showToday: { type: Boolean, default: false }, modelType: { default: "format" } }, setup(l) {
  const a3 = l, e3 = computed(() => a3.mode === "time"), o = computed(() => a3.mode === "week"), n = computed(() => a3.mode === "month"), d3 = computed(() => a3.mode === "year");
  return (s3, c3) => (openBlock(), createElementBlock("div", { class: "m-datepicker", style: normalizeStyle(`width: ${s3.width}px;`) }, [createVNode(unref(Ka), mergeProps({ locale: "zh-CN", "month-change-on-scroll": false, "enable-time-picker": s3.showTime, "time-picker": e3.value, "week-picker": o.value, "month-picker": n.value, "year-picker": d3.value, "now-button-label": "今天", "show-now-button": s3.showToday, "auto-apply": "", "text-input": "", "model-type": s3.modelType, "day-names": ["一", "二", "三", "四", "五", "六", "七"] }, s3.$attrs), null, 16, ["enable-time-picker", "time-picker", "week-picker", "month-picker", "year-picker", "show-now-button", "model-type"])], 4));
} }), [["__scopeId", "data-v-83e36abf"]]);
pa2.install = (l) => {
  l.component(pa2.__name, pa2);
};
var at2 = { class: "m-header" };
var lt = { class: "u-title" };
var tt2 = { class: "u-extra" };
var ot2 = { key: 0 };
var st = ["colspan"];
var nt = { key: 1 };
var fa2 = V(defineComponent({ __name: "Descriptions", props: { title: { default: "" }, bordered: { type: Boolean, default: false }, column: { default: () => ({ xs: 1, sm: 2, md: 3 }) }, extra: { default: "" }, size: { default: "default" }, labelStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) } }, setup(l) {
  const a3 = l, e3 = ref(document.documentElement.clientWidth);
  function o() {
    e3.value = document.documentElement.clientWidth;
  }
  onMounted(() => {
    window.addEventListener("resize", o);
  }), onUnmounted(() => {
    window.removeEventListener("resize", o);
  });
  const n = computed(() => typeof a3.column == "object" ? e3.value >= 1600 && a3.column.xxl ? a3.column.xxl : e3.value >= 1200 && a3.column.xl ? a3.column.xl : e3.value >= 992 && a3.column.lg ? a3.column.lg : e3.value >= 768 && a3.column.md ? a3.column.md : e3.value >= 576 && a3.column.sm ? a3.column.sm : e3.value < 576 && a3.column.xs ? a3.column.xs : 1 : a3.column), d3 = ref(), s3 = ref(), c3 = ref(), p = ref(), i3 = ref([]), h5 = computed(() => i3.value.length);
  function x3(u3, b3) {
    const g = u3.length;
    let k3 = [];
    for (let f = 0; f < g; f++) {
      const y3 = { span: Math.min(u3[f].dataset.span, b3), element: u3[f] };
      M3(k3) < b3 ? (y3.span = Math.min(y3.span, b3 - M3(k3)), f === g - 1 && (y3.span = b3 - M3(k3)), k3.push(y3), f === g - 1 && i3.value.push(k3)) : (i3.value.push(k3), k3 = [y3], f === g - 1 && (y3.span = b3, i3.value.push(k3)));
    }
    a3.bordered ? nextTick(() => {
      i3.value.forEach((f, y3) => {
        f.forEach((z3) => {
          const B3 = Array.from(z3.element.children), I3 = B3[0].cloneNode(true);
          I3.colSpan = 1, m3(I3, a3.labelStyle), m3(I3, JSON.parse(z3.element.dataset.labelStyle));
          const S3 = B3[1].cloneNode(true);
          S3.colSpan = 2 * z3.span - 1, m3(S3, a3.contentStyle), m3(S3, JSON.parse(z3.element.dataset.contentStyle)), p.value[y3].appendChild(I3), p.value[y3].appendChild(S3);
        });
      });
    }) : nextTick(() => {
      u3.forEach((f, y3) => {
        const z3 = Array.from(f.children), B3 = z3[0];
        m3(B3, a3.labelStyle), m3(B3, JSON.parse(f.dataset.labelStyle));
        const I3 = z3[1];
        m3(I3, a3.contentStyle), m3(I3, JSON.parse(f.dataset.contentStyle)), c3.value[y3].appendChild(f);
      });
    });
  }
  function M3(u3) {
    return u3.reduce((b3, g) => b3 + g.span, 0);
  }
  function m3(u3, b3) {
    JSON.stringify(b3) !== "{}" && Object.keys(b3).forEach((g) => {
      u3.style[g] = b3[g];
    });
  }
  return watchEffect(() => {
    a3.bordered ? s3.value = Array.from(d3.value.children).filter((u3) => u3.className === "m-desc-item-bordered") : s3.value = Array.from(d3.value.children).filter((u3) => u3.className === "m-desc-item");
  }, { flush: "post" }), watch(s3, (u3) => {
    i3.value = [], nextTick(() => {
      x3(u3, n.value);
    });
  }), watch(n, (u3) => {
    i3.value = [], nextTick(() => {
      x3(s3.value, u3);
    });
  }), (u3, b3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-desc", `desc-${u3.size}`]) }, [createBaseVNode("div", at2, [createBaseVNode("div", lt, [renderSlot(u3.$slots, "title", {}, () => [createTextVNode(toDisplayString(u3.title), 1)], true)]), createBaseVNode("div", tt2, [renderSlot(u3.$slots, "extra", {}, () => [createTextVNode(toDisplayString(u3.extra), 1)], true)])]), withDirectives(createBaseVNode("div", { ref_key: "view", ref: d3 }, [renderSlot(u3.$slots, "default", {}, void 0, true)], 512), [[vShow, false]]), createBaseVNode("div", { class: normalizeClass(["m-desc-view", { "m-bordered": u3.bordered }]) }, [createBaseVNode("table", null, [u3.bordered ? (openBlock(), createElementBlock("tbody", nt, [h5.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(h5.value, (g) => (openBlock(), createElementBlock("tr", { ref_for: true, ref_key: "rows", ref: p, class: "tr-bordered", key: g }))), 128)) : createCommentVNode("", true)])) : (openBlock(), createElementBlock("tbody", ot2, [(openBlock(true), createElementBlock(Fragment, null, renderList(i3.value, (g, k3) => (openBlock(), createElementBlock("tr", { key: k3 }, [(openBlock(true), createElementBlock(Fragment, null, renderList(g, (f, y3) => (openBlock(), createElementBlock("td", { ref_for: true, ref_key: "cols", ref: c3, class: "u-item-td", colspan: f.span, key: y3 }, null, 8, st))), 128))]))), 128))]))])], 2)], 2));
} }), [["__scopeId", "data-v-d1848170"]]);
fa2.install = (l) => {
  l.component(fa2.__name, fa2);
};
var it = ["data-span", "data-label-style", "data-content-style"];
var ut2 = { class: "u-label" };
var ct = { class: "u-content" };
var dt2 = ["data-span", "data-label-style", "data-content-style"];
var rt = { class: "u-label-th" };
var vt2 = { class: "u-content-td" };
var ha2 = V(defineComponent({ __name: "DescriptionsItem", props: { label: { default: "" }, span: { default: 1 }, labelStyle: { default: () => ({}) }, contentStyle: { default: () => ({}) } }, setup: (l) => (a3, e3) => (openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", { class: "m-desc-item", "data-span": a3.span, "data-label-style": JSON.stringify(a3.labelStyle), "data-content-style": JSON.stringify(a3.contentStyle) }, [createBaseVNode("span", ut2, [renderSlot(a3.$slots, "label", {}, () => [createTextVNode(toDisplayString(a3.label), 1)], true)]), createBaseVNode("span", ct, [renderSlot(a3.$slots, "default", {}, void 0, true)])], 8, it), createBaseVNode("div", { class: "m-desc-item-bordered", "data-span": a3.span, "data-label-style": JSON.stringify(a3.labelStyle), "data-content-style": JSON.stringify(a3.contentStyle) }, [createBaseVNode("th", rt, [renderSlot(a3.$slots, "label", {}, () => [createTextVNode(toDisplayString(a3.label), 1)], true)]), createBaseVNode("td", vt2, [renderSlot(a3.$slots, "default", {}, void 0, true)])], 8, dt2)], 64)) }), [["__scopeId", "data-v-d38b635d"]]);
ha2.install = (l) => {
  l.component(ha2.__name, ha2);
};
var l1 = (l) => (pushScopeId("data-v-2889fdc5"), l = l(), popScopeId(), l);
var pt2 = { class: "m-dialog-root" };
var ft2 = { class: "m-dialog-mask" };
var ht = { class: "m-dialog-header" };
var mt = { class: "u-head" };
var gt = { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "fullscreen", "aria-hidden": "true", focusable: "false" };
var yt2 = [l1(() => createBaseVNode("path", { d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z" }, null, -1))];
var bt = { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "fullscreen-exit", "aria-hidden": "true", focusable: "false" };
var kt = [l1(() => createBaseVNode("path", { d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z" }, null, -1))];
var wt2 = [l1(() => createBaseVNode("svg", { class: "u-svg", viewBox: "64 64 896 896", "data-icon": "close", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var xt2 = { class: "m-dialog-footer" };
var ma2 = V(defineComponent({ __name: "Dialog", props: { title: { default: "提示" }, content: { default: "" }, width: { default: 540 }, height: { default: "auto" }, switchFullscreen: { type: Boolean, default: false }, cancelText: { default: "取消" }, okText: { default: "确定" }, footer: { type: Boolean, default: false }, center: { type: Boolean, default: true }, top: { default: 100 }, loading: { type: Boolean, default: false }, bodyStyle: { default: () => ({}) }, visible: { type: Boolean, default: false } }, emits: ["close", "cancel", "ok"], setup(l, { emit: a3 }) {
  const e3 = l, o = ref(false), n = computed(() => typeof e3.height == "number" ? e3.height + "px" : e3.height);
  watch(() => e3.visible, (x3) => {
    x3 && (o.value = false);
  });
  const d3 = a3;
  function s3() {
    e3.loading || d3("close");
  }
  function c3() {
    o.value = !o.value;
  }
  function p() {
    d3("close");
  }
  function i3() {
    d3("cancel");
  }
  function h5() {
    d3("ok");
  }
  return (x3, M3) => (openBlock(), createElementBlock("div", pt2, [createVNode(Transition, { name: "mask" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", ft2, null, 512), [[vShow, x3.visible]])]), _: 1 }), createVNode(Transition, null, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-dialog-wrap", onClick: withModifiers(s3, ["self"]) }, [createBaseVNode("div", { ref: "dialog", class: normalizeClass(["m-dialog", x3.center ? "relative-hv-center" : "top-center"]), style: normalizeStyle(`width: ${o.value ? "100%" : e3.width + "px"}; top: ${x3.center ? "50%" : o.value ? 0 : x3.top + "px"};`) }, [createBaseVNode("div", { class: normalizeClass(["m-dialog-content", { loading: x3.loading }]), style: normalizeStyle(`--height: ${o.value ? "100vh" : n.value}`) }, [createVNode(unref(ie), { class: "u-spin", spinning: x3.loading, size: "small" }, null, 8, ["spinning"]), createBaseVNode("div", ht, [createBaseVNode("p", mt, [renderSlot(x3.$slots, "title", {}, () => [createTextVNode(toDisplayString(x3.title), 1)], true)])]), x3.switchFullscreen ? (openBlock(), createElementBlock("span", { key: 0, class: "m-screen", onClick: c3 }, [withDirectives((openBlock(), createElementBlock("svg", gt, yt2, 512)), [[vShow, !o.value]]), withDirectives((openBlock(), createElementBlock("svg", bt, kt, 512)), [[vShow, o.value]])])) : createCommentVNode("", true), createBaseVNode("span", { class: "m-close", onClick: p }, wt2), createBaseVNode("div", { class: "m-dialog-body", style: normalizeStyle(x3.bodyStyle) }, [renderSlot(x3.$slots, "default", {}, () => [createTextVNode(toDisplayString(x3.content), 1)], true)], 4), withDirectives(createBaseVNode("div", xt2, [createVNode(unref(xe), { class: "mr8", onClick: i3 }, { default: withCtx(() => [createTextVNode(toDisplayString(x3.cancelText), 1)]), _: 1 }), createVNode(unref(xe), { type: "primary", onClick: h5 }, { default: withCtx(() => [createTextVNode(toDisplayString(x3.okText), 1)]), _: 1 })], 512), [[vShow, x3.footer]])], 6)], 6)], 512), [[vShow, x3.visible]])]), _: 3 })]));
} }), [["__scopeId", "data-v-2889fdc5"]]);
ma2.install = (l) => {
  l.component(ma2.__name, ma2);
};
var Mt = { key: 2, class: "u-text" };
var zt2 = { key: 1, class: "m-divider-vertical" };
var ga2 = V(defineComponent({ __name: "Divider", props: { dashed: { type: Boolean, default: false }, orientation: { default: "center" }, orientationMargin: { default: "" }, borderWidth: { default: 1 }, type: { default: "horizontal" } }, setup(l) {
  const a3 = l, e3 = computed(() => {
    if (a3.orientationMargin !== "")
      return typeof a3.orientationMargin == "number" ? a3.orientationMargin + "px" : a3.orientationMargin;
  }), o = useSlots(), n = computed(() => {
    var s3, c3;
    const d3 = (s3 = o.default) == null ? void 0 : s3.call(o);
    return !!d3 && !!(d3[0].children !== "v-if" && ((c3 = d3[0].children) != null && c3.length));
  });
  return (d3, s3) => d3.type === "horizontal" ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass([`m-divider-horizontal ${d3.orientation}`, { dashed: d3.dashed, margin24: !n.value, marginLeft: d3.orientationMargin !== "" && d3.orientation === "left", marginRight: d3.orientationMargin !== "" && d3.orientation === "right" }]), style: normalizeStyle(`--border-width: ${d3.borderWidth}px;`) }, [d3.orientation === "left" ? withDirectives((openBlock(), createElementBlock("span", { key: 0, class: "u-text", style: normalizeStyle(`margin-left: ${e3.value};`) }, [renderSlot(d3.$slots, "default", {}, void 0, true)], 4)), [[vShow, n.value]]) : d3.orientation === "right" ? withDirectives((openBlock(), createElementBlock("span", { key: 1, class: "u-text", style: normalizeStyle(`margin-right: ${e3.value};`) }, [renderSlot(d3.$slots, "default", {}, void 0, true)], 4)), [[vShow, n.value]]) : withDirectives((openBlock(), createElementBlock("span", Mt, [renderSlot(d3.$slots, "default", {}, void 0, true)], 512)), [[vShow, n.value]])], 6)) : (openBlock(), createElementBlock("div", zt2));
} }), [["__scopeId", "data-v-42a50a74"]]);
ga2.install = (l) => {
  l.component(ga2.__name, ga2);
};
var p1 = (l) => (pushScopeId("data-v-84da70c0"), l = l(), popScopeId(), l);
var _t2 = { class: "m-drawer", tabindex: "-1" };
var Ct2 = { class: "m-drawer-content" };
var $t2 = { key: 0, class: "m-drawer-body-wrapper" };
var Bt = { class: "m-drawer-header" };
var Ft = { class: "m-header-title" };
var St = [p1(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var Lt2 = { class: "u-title" };
var At2 = { class: "m-drawer-extra" };
var Dt2 = { class: "m-drawer-body" };
var Et = { key: 1, class: "m-drawer-body-wrapper" };
var Ht2 = { class: "m-drawer-header" };
var It2 = { class: "m-header-title" };
var Tt2 = [p1(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var jt = { class: "u-title" };
var Vt = { class: "m-drawer-extra" };
var Rt = { class: "m-drawer-body" };
var ya2 = V(defineComponent({ __name: "Drawer", props: { title: { default: "" }, width: { default: 378 }, height: { default: 378 }, closable: { type: Boolean, default: true }, destroyOnClose: { type: Boolean, default: false }, extra: { default: "" }, placement: { default: "right" }, zIndex: { default: 1e3 }, open: { type: Boolean, default: false } }, emits: ["update:open", "close"], setup(l, { emit: a3 }) {
  const e3 = l, o = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), n = computed(() => typeof e3.height == "number" ? e3.height + "px" : e3.height), d3 = a3;
  function s3(p) {
    c3(p);
  }
  function c3(p) {
    d3("update:open", false), d3("close", p);
  }
  return (p, i3) => (openBlock(), createElementBlock("div", _t2, [createVNode(Transition, { name: "fade" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-drawer-mask", onClick: withModifiers(s3, ["self"]) }, null, 512), [[vShow, p.open]])]), _: 1 }), createVNode(Transition, { name: `motion-${p.placement}` }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-drawer-wrapper", `drawer-${p.placement}`]), style: normalizeStyle(`z-index: ${p.zIndex}; ${["top", "bottom"].includes(p.placement) ? "height:" + n.value : "width:" + o.value};`) }, [createBaseVNode("div", Ct2, [p.destroyOnClose ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", $t2, [createBaseVNode("div", Bt, [createBaseVNode("div", Ft, [p.closable ? (openBlock(), createElementBlock("svg", { key: 0, focusable: "false", onClick: c3, class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, St)) : createCommentVNode("", true), createBaseVNode("p", Lt2, [renderSlot(p.$slots, "title", {}, () => [createTextVNode(toDisplayString(p.title), 1)], true)])]), createBaseVNode("div", At2, [renderSlot(p.$slots, "extra", {}, () => [createTextVNode(toDisplayString(p.extra), 1)], true)])]), createBaseVNode("div", Dt2, [renderSlot(p.$slots, "default", {}, void 0, true)])])), p.destroyOnClose && p.open ? (openBlock(), createElementBlock("div", Et, [createBaseVNode("div", Ht2, [createBaseVNode("div", It2, [(openBlock(), createElementBlock("svg", { focusable: "false", onClick: c3, class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, Tt2)), createBaseVNode("p", jt, [renderSlot(p.$slots, "title", {}, () => [createTextVNode(toDisplayString(p.title), 1)], true)])]), createBaseVNode("div", Vt, [renderSlot(p.$slots, "extra", {}, () => [createTextVNode(toDisplayString(p.extra), 1)], true)])]), createBaseVNode("div", Rt, [renderSlot(p.$slots, "default", {}, void 0, true)])])) : createCommentVNode("", true)])], 6), [[vShow, p.open]])]), _: 3 }, 8, ["name"])]));
} }), [["__scopeId", "data-v-84da70c0"]]);
ya2.install = (l) => {
  l.component(ya2.__name, ya2);
};
var Wt = ((l) => (pushScopeId("data-v-4bca3c05"), l = l(), popScopeId(), l))(() => createBaseVNode("div", { class: "m-tooltip-arrow" }, [createBaseVNode("span", { class: "u-tooltip-arrow" })], -1));
var qe2 = V(defineComponent({ __name: "Tooltip", props: { maxWidth: { default: 120 }, content: { default: "暂无内容" }, tooltip: { default: "暂无提示" }, fontSize: { default: 14 }, color: { default: "#FFF" }, backgroundColor: { default: "rgba(0, 0, 0, .85)" }, overlayStyle: { default: () => ({}) } }, emits: ["openChange"], setup(l, { emit: a3 }) {
  const e3 = ref(false), o = ref(), n = ref(0), d3 = ref(0), s3 = ref(), c3 = ref(), p = a3;
  function i3() {
    (function() {
      const x3 = s3.value.offsetWidth, M3 = c3.value.offsetWidth, m3 = c3.value.offsetHeight;
      n.value = m3 + 4, d3.value = (M3 - x3) / 2;
    })(), Ce2(o.value), e3.value = true, p("openChange", e3.value);
  }
  function h5() {
    o.value = me(() => {
      e3.value = false, p("openChange", e3.value);
    }, 100);
  }
  return (x3, M3) => (openBlock(), createElementBlock("div", { class: "m-tooltip", onMouseenter: i3, onMouseleave: h5 }, [createBaseVNode("div", { ref_key: "tooltipRef", ref: c3, class: normalizeClass(["m-tooltip-content", { "show-tip": e3.value }]), style: normalizeStyle(`--tooltip-font-size: ${x3.fontSize}px; --tooltip-color: ${x3.color}; --tooltip-background-color: ${x3.backgroundColor}; max-width: ${x3.maxWidth}px; top: ${-n.value}px; left: ${-d3.value}px;`), onMouseenter: i3, onMouseleave: h5 }, [createBaseVNode("div", { class: "u-tooltip", style: normalizeStyle(x3.overlayStyle) }, [renderSlot(x3.$slots, "tooltip", {}, () => [createTextVNode(toDisplayString(x3.tooltip), 1)], true)], 4), Wt], 38), createBaseVNode("div", { ref_key: "contentRef", ref: s3 }, [renderSlot(x3.$slots, "default", {}, () => [createTextVNode(toDisplayString(x3.content), 1)], true)], 512)], 32));
} }), [["__scopeId", "data-v-4bca3c05"]]);
qe2.install = (l) => {
  l.component(qe2.__name, qe2);
};
var ba = V(defineComponent({ __name: "Ellipsis", props: { maxWidth: { default: "100%" }, line: { default: void 0 }, expand: { type: Boolean, default: false }, tooltip: { type: Boolean, default: true }, tooltipMaxWidth: { default: void 0 }, tooltipFontSize: { default: 14 }, tooltipColor: { default: "#FFF" }, tooltipBackgroundColor: { default: "rgba(0, 0, 0, .85)" }, tooltipOverlayStyle: { default: () => ({ padding: "8px 12px", textAlign: "justify" }) } }, emits: ["expandChange"], setup(l, { emit: a3 }) {
  const e3 = l, o = computed(() => typeof e3.maxWidth == "number" ? e3.maxWidth + "px" : e3.maxWidth), n = ref(), d3 = ref(), s3 = ref();
  watchEffect(() => {
    n.value = e3.tooltip;
  }), watchEffect(() => {
    e3.tooltip && (e3.tooltipMaxWidth ? s3.value = e3.tooltipMaxWidth : s3.value = d3.value.offsetWidth + 24);
  }, { flush: "post" });
  const c3 = a3;
  function p() {
    d3.value.style["-webkit-line-clamp"] ? (e3.tooltip ? (n.value = false, nextTick(() => {
      d3.value.style["-webkit-line-clamp"] = "";
    })) : d3.value.style["-webkit-line-clamp"] = "", c3("expandChange", true)) : (e3.tooltip && (n.value = true), d3.value.style["-webkit-line-clamp"] = e3.line, c3("expandChange", false));
  }
  return (i3, h5) => n.value ? (openBlock(), createBlock(unref(qe2), { key: 0, "max-width": s3.value, fontSize: i3.tooltipFontSize, color: i3.tooltipColor, backgroundColor: i3.tooltipBackgroundColor, overlayStyle: i3.tooltipOverlayStyle }, { tooltip: withCtx(() => [renderSlot(i3.$slots, "tooltip", {}, () => [renderSlot(i3.$slots, "default", {}, void 0, true)], true)]), default: withCtx(() => [createBaseVNode("div", mergeProps({ ref_key: "ellipsis", ref: d3, class: ["m-ellipsis", [i3.line ? "ellipsis-line" : "not-ellipsis-line", { "cursor-pointer": i3.expand }]], style: `-webkit-line-clamp: ${i3.line}; max-width: ${o.value};`, onClick: h5[0] || (h5[0] = (x3) => i3.expand ? p() : () => false) }, i3.$attrs), [renderSlot(i3.$slots, "default", {}, void 0, true)], 16)]), _: 3 }, 8, ["max-width", "fontSize", "color", "backgroundColor", "overlayStyle"])) : (openBlock(), createElementBlock("div", mergeProps({ key: 1, ref_key: "ellipsis", ref: d3, class: ["m-ellipsis", [i3.line ? "ellipsis-line" : "not-ellipsis-line", { "cursor-pointer": i3.expand }]], style: `-webkit-line-clamp: ${i3.line}; max-width: ${o.value};`, onClick: h5[1] || (h5[1] = (x3) => i3.expand ? p() : () => false) }, i3.$attrs), [renderSlot(i3.$slots, "default", {}, void 0, true)], 16));
} }), [["__scopeId", "data-v-becc1d77"]]);
ba.install = (l) => {
  l.component(ba.__name, ba);
};
var ka = V(defineComponent({ __name: "Flex", props: { width: { default: "auto" }, vertical: { type: Boolean, default: false }, wrap: { default: "nowrap" }, justify: { default: "normal" }, align: { default: "normal" }, gap: { default: void 0 } }, setup(l) {
  const a3 = l, e3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), o = computed(() => {
    if (a3.gap === void 0)
      return 0;
    if (typeof a3.gap == "number")
      return a3.gap + "px";
    if (Array.isArray(a3.gap))
      return a3.gap[1] + "px " + a3.gap[0] + "px ";
    if (["small", "middle", "large"].includes(a3.gap))
      return { small: "8px", middle: "16px", large: "24px" }[a3.gap];
  });
  return (n, d3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-flex", { "flex-vertical": n.vertical }]), style: normalizeStyle(`
      width: ${e3.value};
      gap: ${o.value};
      margin-bottom: -${Array.isArray(a3.gap) && n.wrap ? a3.gap[1] : 0}px;
      --wrap: ${n.wrap};
      --justify: ${n.justify};
      --align: ${n.align};
    `) }, [renderSlot(n.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-145d6ac2"]]);
ka.install = (l) => {
  l.component(ka.__name, ka);
};
var Le = V(defineComponent({ __name: "Space", props: { width: { default: "auto" }, align: { default: "start" }, direction: { default: "horizontal" }, size: { default: "small" }, wrap: { type: Boolean, default: true } }, setup(l) {
  const a3 = l, e3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), o = computed(() => {
    if (typeof a3.size == "number")
      return a3.size + "px";
    if (Array.isArray(a3.size))
      return a3.size[1] + "px " + a3.size[0] + "px ";
    if (["small", "middle", "large"].includes(a3.size))
      return { small: "8px", middle: "16px", large: "24px" }[a3.size];
  });
  return (n, d3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-space", [`${n.direction} ${n.align}`, { wrap: n.wrap }]]), style: normalizeStyle(`width: ${e3.value}; gap: ${o.value}; margin-bottom: -${Array.isArray(a3.size) && n.wrap ? a3.size[1] : 0}px;`) }, [renderSlot(n.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-15e6c265"]]);
Le.install = (l) => {
  l.component(Le.__name, Le);
};
var be = (l) => (pushScopeId("data-v-f7604d80"), l = l(), popScopeId(), l);
var Nt2 = { class: "m-image-wrap" };
var Ot2 = ["onLoad", "src", "alt"];
var qt2 = ["onClick"];
var Pt = { class: "m-image-mask-info" };
var Yt = be(() => createBaseVNode("svg", { class: "u-eye", focusable: "false", "data-icon": "eye", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })], -1));
var Ut2 = { class: "u-pre" };
var Kt = { class: "m-preview-mask" };
var Zt2 = { class: "m-preview-body" };
var Gt = { class: "m-preview-operations" };
var Jt = ["href", "title"];
var Xt = [be(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "close", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var Qt = [be(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "zoom-in", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })], -1))];
var e2 = [be(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "zoom-out", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })], -1))];
var a22 = [be(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "expand", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z" })], -1))];
var l2 = [be(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "rotate-right", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" }), createBaseVNode("path", { d: "M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" })], -1))];
var t2 = [be(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "rotate-left", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" }), createBaseVNode("path", { d: "M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" })], -1))];
var o2 = [be(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "swap", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" })], -1))];
var s22 = { class: "u-icon", style: { transform: "rotate(90deg)" }, focusable: "false", "data-icon": "swap", "aria-hidden": "true", viewBox: "64 64 896 896" };
var n2 = [be(() => createBaseVNode("path", { d: "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" }, null, -1))];
var i2 = ["src", "alt", "onLoad"];
var u2 = [be(() => createBaseVNode("svg", { focusable: "false", class: "u-switch", "data-icon": "left", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })], -1))];
var c2 = [be(() => createBaseVNode("svg", { focusable: "false", class: "u-switch", "data-icon": "right", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" })], -1))];
var d22 = defineComponent({ __name: "Image", props: { src: { default: "" }, name: { default: "" }, width: { default: 200 }, height: { default: 200 }, bordered: { type: Boolean, default: true }, gap: { default: 8 }, fit: { default: "contain" }, preview: { default: "预览" }, zoomRatio: { default: 0.1 }, minZoomScale: { default: 0.1 }, maxZoomScale: { default: 10 }, resetOnDbclick: { type: Boolean, default: true }, loop: { type: Boolean, default: false }, album: { type: Boolean, default: false } }, setup(l, { expose: a3 }) {
  const e3 = l, o = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), n = computed(() => typeof e3.height == "number" ? e3.height + "px" : e3.height), d3 = ref([]);
  watchEffect(() => {
    d3.value = Array.isArray(e3.src) ? e3.src : [{ src: e3.src, name: e3.name }];
  });
  const s3 = computed(() => d3.value.length);
  onMounted(() => {
    document.addEventListener("keydown", y3);
  }), onUnmounted(() => {
    document.removeEventListener("keydown", y3);
  });
  const c3 = ref(Array(s3.value).fill(false)), p = ref(Array(s3.value).fill(false)), i3 = ref(0), h5 = ref(false), x3 = ref(0), M3 = ref(1), m3 = ref(1), u3 = ref(1), b3 = ref(0), g = ref(0), k3 = ref(0), f = ref(0);
  function y3(D3) {
    D3.preventDefault(), h5.value && s3.value > 1 && (D3.key !== "ArrowLeft" && D3.key !== "ArrowUp" || ne(), D3.key !== "ArrowRight" && D3.key !== "ArrowDown" || ve());
  }
  function z3(D3) {
    if (D3) {
      if (D3.name)
        return D3.name;
      {
        const q3 = D3.src.split("?")[0].split("/");
        return q3[q3.length - 1];
      }
    }
  }
  function B3(D3) {
    M3.value = 1, x3.value = 0, k3.value = 0, f.value = 0, h5.value = true, i3.value = D3;
  }
  function I3(D3, q3) {
    const Z = String(D3).split(".")[1], ae = String(q3).split(".")[1];
    let le = Math.max((Z == null ? void 0 : Z.length) || 0, (ae == null ? void 0 : ae.length) || 0), Q3 = D3.toFixed(le), Me = q3.toFixed(le);
    return (+Q3.replace(".", "") + +Me.replace(".", "")) / Math.pow(10, le);
  }
  function S3() {
    h5.value = false;
  }
  function H3() {
    M3.value + e3.zoomRatio > e3.maxZoomScale ? M3.value = e3.maxZoomScale : M3.value = I3(M3.value, e3.zoomRatio);
  }
  function E3() {
    M3.value - e3.zoomRatio < e3.minZoomScale ? M3.value = e3.minZoomScale : M3.value = I3(M3.value, -e3.zoomRatio);
  }
  function K3() {
    M3.value = 1, m3.value = 1, u3.value = 1, x3.value = 0, k3.value = 0, f.value = 0;
  }
  function ee() {
    x3.value += 90;
  }
  function de() {
    x3.value -= 90;
  }
  function ke2() {
    m3.value *= -1;
  }
  function we() {
    u3.value *= -1;
  }
  function re(D3) {
    console.log("e", D3);
    const q3 = D3.deltaY * e3.zoomRatio * 0.1;
    M3.value === e3.minZoomScale && q3 > 0 || M3.value === e3.maxZoomScale && q3 < 0 || (M3.value - q3 < e3.minZoomScale ? M3.value = e3.minZoomScale : M3.value - q3 > e3.maxZoomScale ? M3.value = e3.maxZoomScale : M3.value = I3(M3.value, -q3));
  }
  function ne() {
    e3.loop ? i3.value = (i3.value - 1 + s3.value) % s3.value : i3.value > 0 && i3.value--, K3();
  }
  function ve() {
    e3.loop ? i3.value = (i3.value + 1) % s3.value : i3.value < s3.value - 1 && i3.value++, K3();
  }
  return a3({ onPreview: B3 }), (D3, q3) => (openBlock(), createElementBlock("div", Nt2, [createVNode(unref(Le), { size: D3.gap }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(d3.value, (Z, ae) => withDirectives((openBlock(), createElementBlock("div", { class: normalizeClass(["m-image", { bordered: D3.bordered, "image-hover-mask": c3.value[ae] }]), style: normalizeStyle(`width: ${o.value}; height: ${n.value};`), key: ae }, [createVNode(unref(ie), { spinning: !c3.value[ae], indicator: "dynamic-circle" }, { default: withCtx(() => [createBaseVNode("img", { class: "u-image", style: normalizeStyle(`width: calc(${o.value} - 2px); height: calc(${n.value} - 2px); object-fit: ${D3.fit};`), onLoad: (le) => {
    return Q3 = ae, void (c3.value[Q3] = true);
    var Q3;
  }, src: Z.src, alt: Z.name }, null, 44, Ot2)]), _: 2 }, 1032, ["spinning"]), createBaseVNode("div", { class: "m-image-mask", onClick: (le) => B3(ae) }, [createBaseVNode("div", Pt, [Yt, createBaseVNode("p", Ut2, [renderSlot(D3.$slots, "preview", {}, () => [createTextVNode(toDisplayString(D3.preview), 1)], true)])])], 8, qt2)], 6)), [[vShow, !D3.album || D3.album && ae === 0]])), 128))]), _: 3 }, 8, ["size"]), createVNode(Transition, { name: "mask" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", Kt, null, 512), [[vShow, h5.value]])]), _: 1 }), createVNode(Transition, { name: "preview" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", { class: "m-preview-wrap", onClick: withModifiers(S3, ["self"]), onWheel: withModifiers(re, ["prevent"]) }, [createBaseVNode("div", Zt2, [createBaseVNode("div", Gt, [createBaseVNode("a", { class: "u-name", href: d3.value[i3.value].src, target: "_blank", title: z3(d3.value[i3.value]) }, toDisplayString(z3(d3.value[i3.value])), 9, Jt), withDirectives(createBaseVNode("p", { class: "u-preview-progress" }, toDisplayString(i3.value + 1) + " / " + toDisplayString(s3.value), 513), [[vShow, Array.isArray(D3.src)]]), createBaseVNode("div", { class: "u-preview-operation", title: "关闭", onClick: S3 }, Xt), createBaseVNode("div", { class: normalizeClass(["u-preview-operation", { "u-operation-disabled": M3.value === D3.maxZoomScale }]), title: "放大", onClick: H3 }, Qt, 2), createBaseVNode("div", { class: normalizeClass(["u-preview-operation", { "u-operation-disabled": M3.value === D3.minZoomScale }]), title: "缩小", onClick: E3 }, e2, 2), createBaseVNode("div", { class: "u-preview-operation", title: "还原", onClick: K3 }, a22), createBaseVNode("div", { class: "u-preview-operation", title: "向右旋转", onClick: ee }, l2), createBaseVNode("div", { class: "u-preview-operation", title: "向左旋转", onClick: de }, t2), createBaseVNode("div", { class: "u-preview-operation", title: "水平镜像", onClick: ke2 }, o2), createBaseVNode("div", { class: "u-preview-operation", title: "垂直镜像", onClick: we }, [(openBlock(), createElementBlock("svg", s22, n2))])]), createBaseVNode("div", { class: "m-preview-image", style: normalizeStyle(`transform: translate3d(${k3.value}px, ${f.value}px, 0px);`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(d3.value, (Z, ae) => withDirectives((openBlock(), createBlock(unref(ie), { spinning: !p.value[ae], indicator: "dynamic-circle", key: ae }, { default: withCtx(() => [createBaseVNode("img", { class: "u-preview-image", style: normalizeStyle(`transform: scale3d(${m3.value * M3.value}, ${u3.value * M3.value}, 1) rotate(${x3.value}deg);`), src: Z.src, alt: Z.name, onMousedown: q3[0] || (q3[0] = withModifiers((le) => function(Q3) {
    const Me = Q3.target.getBoundingClientRect(), Ve2 = Me.top, De = Me.bottom, Je = Me.right, Xe2 = Me.left, Qe2 = document.documentElement.clientWidth, Re2 = document.documentElement.clientHeight;
    b3.value = Q3.clientX, g.value = Q3.clientY;
    const Fe2 = k3.value, ze = f.value;
    document.onmousemove = (ea) => {
      k3.value = Fe2 + ea.clientX - b3.value, f.value = ze + ea.clientY - g.value;
    }, document.onmouseup = () => {
      k3.value > Fe2 + Qe2 - Je && (k3.value = Fe2 + Qe2 - Je), k3.value < Fe2 - Xe2 && (k3.value = Fe2 - Xe2), f.value > ze + Re2 - De && (f.value = ze + Re2 - De), f.value < ze - Ve2 && (f.value = ze - Ve2), document.onmousemove = null;
    };
  }(le), ["prevent"])), onLoad: (le) => function(Q3) {
    p.value[Q3] = true;
  }(ae), onDblclick: q3[1] || (q3[1] = (le) => D3.resetOnDbclick ? K3() : () => false) }, null, 44, i2)]), _: 2 }, 1032, ["spinning"])), [[vShow, i3.value === ae]])), 128))], 4), s3.value > 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", { class: normalizeClass(["m-switch-left", { "u-switch-disabled": i3.value === 0 && !D3.loop }]), onClick: ne }, u2, 2), createBaseVNode("div", { class: normalizeClass(["m-switch-right", { "u-switch-disabled": i3.value === s3.value - 1 && !D3.loop }]), onClick: ve }, c2, 2)], 64)) : createCommentVNode("", true)])], 544), [[vShow, h5.value]])]), _: 1 })]));
} });
var Pe2 = V(d22, [["__scopeId", "data-v-f7604d80"]]);
Pe2.install = (l) => {
  l.component(Pe2.__name, Pe2);
};
var Ka2 = (l) => (pushScopeId("data-v-3d814f6a"), l = l(), popScopeId(), l);
var r2 = { key: 0, class: "m-prefix" };
var v2 = ["type", "value", "maxlength", "disabled"];
var p2 = { key: 1, class: "m-suffix" };
var f2 = [Ka2(() => createBaseVNode("svg", { focusable: "false", class: "u-clear", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })], -1))];
var h22 = { focusable: "false", class: "u-eye", "data-icon": "eye", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var m22 = [Ka2(() => createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" }, null, -1))];
var g2 = { focusable: "false", class: "u-eye", "data-icon": "eye-invisible", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var y22 = [Ka2(() => createBaseVNode("path", { d: "M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" }, null, -1)), Ka2(() => createBaseVNode("path", { d: "M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" }, null, -1))];
var b2 = { key: 2, class: "m-count" };
var wa = V(defineComponent({ inheritAttrs: false, __name: "Input", props: { width: { default: "100%" }, addonBefore: { default: "" }, addonAfter: { default: "" }, allowClear: { type: Boolean, default: false }, password: { type: Boolean, default: false }, disabled: { type: Boolean, default: false }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, size: { default: "middle" }, prefix: { default: "" }, suffix: { default: "" }, value: { default: "" }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "enter"], setup(l, { emit: a3 }) {
  const e3 = l, o = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), n = computed(() => e3.maxlength ? e3.value.length + " / " + e3.maxlength : e3.value.length), d3 = useSlots(), s3 = computed(() => {
    var y3;
    const f = (y3 = d3.prefix) == null ? void 0 : y3.call(d3);
    return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e3.prefix;
  }), c3 = computed(() => {
    var y3;
    const f = (y3 = d3.suffix) == null ? void 0 : y3.call(d3);
    return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e3.suffix;
  }), p = computed(() => {
    var y3;
    const f = (y3 = d3.addonBefore) == null ? void 0 : y3.call(d3);
    return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e3.addonBefore;
  }), i3 = computed(() => {
    var y3;
    const f = (y3 = d3.addonAfter) == null ? void 0 : y3.call(d3);
    return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e3.addonAfter;
  }), h5 = a3;
  function x3(f) {
    "lazy" in e3.valueModifiers || (h5("update:value", f.target.value), h5("change", f));
  }
  function M3(f) {
    "lazy" in e3.valueModifiers && (h5("update:value", f.target.value), h5("change", f));
  }
  function m3(f) {
    f.key === "Enter" && h5("enter", f);
  }
  const u3 = ref();
  function b3() {
    h5("update:value", ""), u3.value.focus();
  }
  const g = ref(false);
  function k3() {
    g.value = !g.value;
  }
  return (f, y3) => (openBlock(), createElementBlock("div", { class: "m-input-wrap", style: normalizeStyle(`width: ${o.value};`) }, [p.value ? (openBlock(), createElementBlock("span", { key: 0, class: normalizeClass(["m-addon", { before: p.value }]) }, [renderSlot(f.$slots, "addonBefore", {}, () => [createTextVNode(toDisplayString(f.addonBefore), 1)], true)], 2)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["m-input", [`${f.size}`, { disabled: f.disabled, "input-before": p.value, "input-after": i3.value }]]), tabindex: "1" }, [s3.value ? (openBlock(), createElementBlock("span", r2, [renderSlot(f.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(f.prefix), 1)], true)])) : createCommentVNode("", true), createBaseVNode("input", mergeProps({ class: "u-input", ref_key: "input", ref: u3, type: f.password && !g.value ? "password" : "text", value: f.value, maxlength: f.maxlength, disabled: f.disabled, onInput: x3, onChange: M3, onKeydown: m3 }, f.$attrs), null, 16, v2), c3.value ? (openBlock(), createElementBlock("span", p2, [!f.disabled && f.allowClear && f.value ? (openBlock(), createElementBlock("span", { key: 0, class: "m-action", onClick: b3 }, f2)) : createCommentVNode("", true), f.password ? (openBlock(), createElementBlock("span", { key: 1, class: "m-action", onClick: k3 }, [withDirectives((openBlock(), createElementBlock("svg", h22, m22, 512)), [[vShow, g.value]]), withDirectives((openBlock(), createElementBlock("svg", g2, y22, 512)), [[vShow, !g.value]])])) : createCommentVNode("", true), f.showCount ? (openBlock(), createElementBlock("span", b2, toDisplayString(n.value), 1)) : createCommentVNode("", true), renderSlot(f.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(f.suffix), 1)], true)])) : createCommentVNode("", true)], 2), i3.value ? (openBlock(), createElementBlock("span", { key: 1, class: normalizeClass(["m-addon", { after: i3.value }]) }, [renderSlot(f.$slots, "addonAfter", {}, () => [createTextVNode(toDisplayString(f.addonAfter), 1)], true)], 2)) : createCommentVNode("", true)], 4));
} }), [["__scopeId", "data-v-3d814f6a"]]);
wa.install = (l) => {
  l.component(wa.__name, wa);
};
var f1 = (l) => (pushScopeId("data-v-d152c72b"), l = l(), popScopeId(), l);
var k2 = { class: "m-input-wrap" };
var w2 = { key: 0, class: "u-input-prefix" };
var x2 = { class: "m-handler-wrap" };
var M22 = [f1(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "up", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" })], -1))];
var z2 = [f1(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "down", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })], -1))];
var _2 = defineComponent({ inheritAttrs: false, __name: "InputNumber", props: { width: { default: 90 }, min: { default: -1 / 0 }, max: { default: 1 / 0 }, step: { default: 1 }, precision: { default: 0 }, prefix: { default: "" }, formatter: { type: Function, default: (l) => l }, keyboard: { type: Boolean, default: true }, value: { default: null } }, emits: ["update:value", "change"], setup(l, { emit: a3 }) {
  var b3;
  const e3 = l, o = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), n = computed(() => {
    var k3;
    const g = ((k3 = String(e3.step).split(".")[1]) == null ? void 0 : k3.length) || 0;
    return Math.max(e3.precision, g);
  }), d3 = useSlots(), s3 = computed(() => {
    var k3;
    const g = (k3 = d3.prefix) == null ? void 0 : k3.call(d3);
    return g ? !!(g[0].children !== "v-if" && (g != null && g.length)) : e3.prefix;
  }), c3 = ref(e3.formatter((b3 = e3.value) == null ? void 0 : b3.toFixed(n.value)));
  watch(() => e3.value, (g) => {
    c3.value = e3.formatter(g == null ? void 0 : g.toFixed(n.value));
  }), watch(c3, (g) => {
    g || i3(null);
  });
  const p = a3;
  function i3(g) {
    p("change", g), p("update:value", g);
  }
  function h5(g) {
    var f, y3;
    const k3 = g.target.value.replaceAll(",", "");
    if (Number.isNaN(parseFloat(k3)))
      c3.value = (f = e3.value) == null ? void 0 : f.toFixed(n.value);
    else {
      if (parseFloat(k3) > e3.max)
        return void i3(e3.max);
      if (parseFloat(k3) < e3.min)
        return void i3(e3.min);
      parseFloat(k3) !== e3.value ? i3(parseFloat(k3)) : c3.value = (y3 = e3.value) == null ? void 0 : y3.toFixed(n.value);
    }
  }
  function x3(g, k3) {
    const f = String(g).split(".")[1], y3 = String(k3).split(".")[1];
    let z3 = Math.max((f == null ? void 0 : f.length) || 0, (y3 == null ? void 0 : y3.length) || 0), B3 = g.toFixed(z3), I3 = k3.toFixed(z3);
    return (+B3.replace(".", "") + +I3.replace(".", "")) / Math.pow(10, z3);
  }
  function M3(g) {
    g.key === "ArrowUp" && m3(), g.key === "ArrowDown" && u3();
  }
  function m3() {
    i3(parseFloat(Math.min(e3.max, x3(e3.value || 0, +e3.step)).toFixed(n.value)));
  }
  function u3() {
    i3(parseFloat(Math.max(e3.min, x3(e3.value || 0, -e3.step)).toFixed(n.value)));
  }
  return (g, k3) => (openBlock(), createElementBlock("div", { class: "m-input-number", tabindex: "1", style: normalizeStyle(`width: ${o.value};`) }, [createBaseVNode("div", k2, [s3.value ? (openBlock(), createElementBlock("span", w2, [renderSlot(g.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(g.prefix), 1)], true)])) : createCommentVNode("", true), g.keyboard ? withDirectives((openBlock(), createElementBlock("input", mergeProps({ key: 1, autocomplete: "off", class: "u-input-number", onChange: h5, "onUpdate:modelValue": k3[0] || (k3[0] = (f) => c3.value = f), onKeydown: [k3[1] || (k3[1] = withKeys(withModifiers(() => {
  }, ["prevent"]), ["up"])), M3] }, g.$attrs), null, 16)), [[vModelDynamic, c3.value]]) : withDirectives((openBlock(), createElementBlock("input", mergeProps({ key: 2, autocomplete: "off", class: "u-input-number", onChange: h5, "onUpdate:modelValue": k3[2] || (k3[2] = (f) => c3.value = f) }, g.$attrs), null, 16)), [[vModelDynamic, c3.value]])]), createBaseVNode("div", x2, [createBaseVNode("span", { class: normalizeClass(["u-up-arrow", { disabled: (g.value || 0) >= g.max }]), onClick: m3 }, M22, 2), createBaseVNode("span", { class: normalizeClass(["u-down-arrow", { disabled: (g.value || 0) <= g.min }]), onClick: u3 }, z2, 2)])], 4));
} });
var xa = V(_2, [["__scopeId", "data-v-d152c72b"]]);
xa.install = (l) => {
  l.component(xa.__name, xa);
};
var Ze = (l) => (pushScopeId("data-v-94d4249f"), l = l(), popScopeId(), l);
var C2 = ["onMouseenter", "onMouseleave"];
var $2 = [Ze(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var B22 = [Ze(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var F2 = [Ze(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var S22 = [Ze(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var L2 = [Ze(() => createBaseVNode("circle", { class: "path", cx: "25", cy: "25", r: "20", fill: "none" }, null, -1))];
var A2 = { class: "u-content" };
var Ee2 = ((l) => (l.info = "#1677FF", l.success = "#52c41a", l.error = "#ff4d4f", l.warning = "#faad14", l.loading = "#1677FF", l))(Ee2 || {});
var Ye2 = V(defineComponent({ __name: "Message", props: { duration: { default: 3e3 }, top: { default: 30 } }, emits: ["close"], setup(l, { expose: a3, emit: e3 }) {
  const o = l, n = ref(), d3 = ref([]), s3 = ref([]), c3 = ref([]), p = computed(() => typeof o.top == "number" ? o.top + "px" : o.top), i3 = computed(() => d3.value.every((m3) => !m3));
  function h5() {
    Ce2(n.value);
    const m3 = c3.value.length - 1;
    d3.value[m3] = true, M3(m3);
  }
  watch(i3, (m3, u3) => {
    !u3 && m3 && (n.value = me(() => {
      c3.value.splice(0), d3.value.splice(0);
    }, 300));
  }), a3({ info: function(m3) {
    c3.value.push({ content: m3, mode: "info" }), h5();
  }, success: function(m3) {
    c3.value.push({ content: m3, mode: "success" }), h5();
  }, error: function(m3) {
    c3.value.push({ content: m3, mode: "error" }), h5();
  }, warning: function(m3) {
    c3.value.push({ content: m3, mode: "warning" }), h5();
  }, loading: function(m3) {
    c3.value.push({ content: m3, mode: "loading" }), h5();
  } });
  const x3 = e3;
  function M3(m3) {
    s3.value[m3] = me(() => {
      d3.value[m3] = false, x3("close");
    }, o.duration);
  }
  return (m3, u3) => (openBlock(), createElementBlock("div", { class: "m-message-wrap", style: normalizeStyle(`top: ${p.value};`) }, [createVNode(TransitionGroup, { name: "slide-fade" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(c3.value, (b3, g) => withDirectives((openBlock(), createElementBlock("div", { class: "m-message", key: g }, [createBaseVNode("div", { class: "m-message-content", onMouseenter: (k3) => function(f) {
    Ce2(s3.value[f]);
  }(g), onMouseleave: (k3) => function(f) {
    M3(f);
  }(g) }, [b3.mode === "info" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-svg", style: normalizeStyle({ fill: Ee2[b3.mode] }), viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true", focusable: "false" }, $2, 4)) : createCommentVNode("", true), b3.mode === "success" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-svg", style: normalizeStyle({ fill: Ee2[b3.mode] }), viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true", focusable: "false" }, B22, 4)) : createCommentVNode("", true), b3.mode === "error" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-svg", style: normalizeStyle({ fill: Ee2[b3.mode] }), viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true", focusable: "false" }, F2, 4)) : createCommentVNode("", true), b3.mode === "warning" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-svg", style: normalizeStyle({ fill: Ee2[b3.mode] }), viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true", focusable: "false" }, S22, 4)) : createCommentVNode("", true), b3.mode === "loading" ? (openBlock(), createElementBlock("svg", { key: 4, class: "u-svg circular", style: normalizeStyle({ stroke: Ee2[b3.mode] }), viewBox: "0 0 50 50", focusable: "false" }, L2, 4)) : createCommentVNode("", true), createBaseVNode("p", A2, toDisplayString(b3.content), 1)], 40, C2)])), [[vShow, d3.value[g]]])), 128))]), _: 1 })], 4));
} }), [["__scopeId", "data-v-94d4249f"]]);
Ye2.install = (l) => {
  l.component(Ye2.__name, Ye2);
};
var Ie = (l) => (pushScopeId("data-v-97057242"), l = l(), popScopeId(), l);
var D2 = { class: "m-modal-root" };
var E2 = { class: "m-modal-mask" };
var H22 = { class: "m-body" };
var I2 = { class: "m-title" };
var T2 = { key: 0, focusable: "false", class: "u-icon confirm", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var j2 = [Ie(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), Ie(() => createBaseVNode("path", { d: "M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var V2 = { key: 1, focusable: "false", class: "u-icon info", "data-icon": "info-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var R2 = [Ie(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var W2 = { key: 2, focusable: "false", class: "u-icon success", "data-icon": "check-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var N2 = [Ie(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var O2 = { key: 3, focusable: "false", class: "u-icon error", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var q2 = [Ie(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var P2 = { key: 4, focusable: "false", class: "u-icon warning", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Y2 = [Ie(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var U2 = { class: "u-title" };
var K2 = { class: "u-content" };
var Z2 = { class: "m-btns" };
var Ma = V(defineComponent({ __name: "Modal", props: { width: { default: 420 }, cancelText: { default: "取消" }, okText: { default: "确定" }, noticeText: { default: "知道了" }, center: { type: Boolean, default: true }, top: { default: 100 }, loading: { type: Boolean, default: false }, visible: { type: Boolean, default: false } }, emits: ["cancel", "ok", "know"], setup(l, { expose: a3, emit: e3 }) {
  const o = ref(""), n = ref();
  a3({ info: function(h5) {
    o.value = "info", n.value = h5;
  }, success: function(h5) {
    o.value = "success", n.value = h5;
  }, error: function(h5) {
    o.value = "error", n.value = h5;
  }, warning: function(h5) {
    o.value = "warning", n.value = h5;
  }, confirm: function(h5) {
    o.value = "confirm", n.value = h5;
  }, erase: function(h5) {
    o.value = "erase", n.value = h5;
  } });
  const d3 = e3;
  function s3() {
    d3("cancel");
  }
  function c3() {
    d3("cancel");
  }
  function p() {
    d3("ok");
  }
  function i3() {
    d3("know");
  }
  return (h5, x3) => (openBlock(), createElementBlock("div", D2, [createVNode(Transition, { name: "mask" }, { default: withCtx(() => [withDirectives(createBaseVNode("div", E2, null, 512), [[vShow, h5.visible]])]), _: 1 }), createVNode(Transition, null, { default: withCtx(() => {
    var M3, m3;
    return [withDirectives(createBaseVNode("div", { class: "m-modal-wrap", onClick: withModifiers(s3, ["self"]) }, [createBaseVNode("div", { class: normalizeClass(["m-modal", h5.center ? "relative-hv-center" : "top-center"]), style: normalizeStyle(`width: ${h5.width}px; top: ${h5.center ? "50%" : h5.top + "px"};`) }, [createBaseVNode("div", { class: normalizeClass(["m-modal-body", { loading: h5.loading }]) }, [createVNode(unref(ie), { class: "u-spin", spinning: h5.loading, size: "small" }, null, 8, ["spinning"]), createBaseVNode("div", H22, [createBaseVNode("div", I2, [o.value === "confirm" || o.value === "erase" ? (openBlock(), createElementBlock("svg", T2, j2)) : createCommentVNode("", true), o.value === "info" ? (openBlock(), createElementBlock("svg", V2, R2)) : createCommentVNode("", true), o.value === "success" ? (openBlock(), createElementBlock("svg", W2, N2)) : createCommentVNode("", true), o.value === "error" ? (openBlock(), createElementBlock("svg", O2, q2)) : createCommentVNode("", true), o.value === "warning" ? (openBlock(), createElementBlock("svg", P2, Y2)) : createCommentVNode("", true), createBaseVNode("div", U2, toDisplayString((M3 = n.value) == null ? void 0 : M3.title), 1)]), createBaseVNode("div", K2, toDisplayString((m3 = n.value) == null ? void 0 : m3.content), 1)]), createBaseVNode("div", Z2, [o.value === "confirm" || o.value === "erase" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(unref(xe), { class: "mr8", onClick: c3 }, { default: withCtx(() => [createTextVNode(toDisplayString(h5.cancelText), 1)]), _: 1 }), o.value === "confirm" ? (openBlock(), createBlock(unref(xe), { key: 0, type: "primary", onClick: p }, { default: withCtx(() => [createTextVNode(toDisplayString(h5.okText), 1)]), _: 1 })) : createCommentVNode("", true), o.value === "erase" ? (openBlock(), createBlock(unref(xe), { key: 1, type: "danger", onClick: p }, { default: withCtx(() => [createTextVNode(toDisplayString(h5.okText), 1)]), _: 1 })) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), ["info", "success", "error", "warning"].includes(o.value) ? (openBlock(), createBlock(unref(xe), { key: 1, type: "primary", onClick: i3 }, { default: withCtx(() => [createTextVNode(toDisplayString(h5.noticeText), 1)]), _: 1 })) : createCommentVNode("", true)])], 2)], 6)], 512), [[vShow, h5.visible]])];
  }), _: 1 })]));
} }), [["__scopeId", "data-v-97057242"]]);
Ma.install = (l) => {
  l.component(Ma.__name, Ma);
};
var $e2 = (l) => (pushScopeId("data-v-40ed4a6f"), l = l(), popScopeId(), l);
var G2 = ["onMouseenter", "onMouseleave"];
var J2 = { class: "m-notification-content" };
var X2 = [$e2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), $e2(() => createBaseVNode("path", { d: "M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" }, null, -1))];
var Q2 = [$e2(() => createBaseVNode("path", { d: "M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" }, null, -1)), $e2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var e0 = [$e2(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1)), $e2(() => createBaseVNode("path", { d: "M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" }, null, -1))];
var a0 = [$e2(() => createBaseVNode("path", { d: "M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" }, null, -1)), $e2(() => createBaseVNode("path", { d: "M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }, null, -1))];
var l0 = ["onClick"];
var t0 = [$e2(() => createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }, null, -1))];
var Oe2 = ((l) => (l.info = "#1677FF", l.success = "#52c41a", l.error = "#ff4d4f", l.warning = "#faad14", l))(Oe2 || {});
var za2 = V(defineComponent({ __name: "Notification", props: { message: { default: "温馨提示" }, duration: { default: 4500 }, top: { default: 24 }, bottom: { default: 24 }, placement: { default: "topRight" } }, emits: ["close"], setup(l, { expose: a3, emit: e3 }) {
  const o = l, n = ref(), d3 = ref([]), s3 = ref([]), c3 = ref([]), p = ref(o.placement), i3 = ref(), h5 = computed(() => d3.value.length === c3.value.length);
  function x3() {
    Ce2(n.value), s3.value.push(null);
    const u3 = c3.value.length - 1;
    nextTick(() => {
      i3.value[u3].style.height = i3.value[u3].offsetHeight + "px", i3.value[u3].style.opacity = 1;
    }), c3.value[u3].placement && (p.value = c3.value[u3].placement), o.duration && (s3.value[u3] = me(() => {
      m3(u3);
    }, o.duration));
  }
  watch(h5, (u3, b3) => {
    !b3 && u3 && (n.value = me(() => {
      d3.value.splice(0), c3.value.splice(0);
    }, 300));
  }), a3({ open: function(u3) {
    c3.value.push({ ...u3, mode: "open" }), x3();
  }, info: function(u3) {
    c3.value.push({ ...u3, mode: "info" }), x3();
  }, success: function(u3) {
    c3.value.push({ ...u3, mode: "success" }), x3();
  }, error: function(u3) {
    c3.value.push({ ...u3, mode: "error" }), x3();
  }, warning: function(u3) {
    c3.value.push({ ...u3, mode: "warning" }), x3();
  } });
  const M3 = e3;
  function m3(u3) {
    d3.value.push(u3), M3("close");
  }
  return (u3, b3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-notification-wrapper", p.value]), style: normalizeStyle(`top: ${["topRight", "topLeft"].includes(p.value) ? u3.top : "auto"}px; bottom: ${["bottomRight", "bottomLeft"].includes(p.value) ? u3.bottom : ""}px;`) }, [createVNode(TransitionGroup, { name: ["topRight", "bottomRight"].includes(p.value) ? "right" : "left" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(c3.value, (g, k3) => withDirectives((openBlock(), createElementBlock("div", { ref_for: true, ref_key: "notification", ref: i3, class: "m-notification", onMouseenter: (f) => function(y3) {
    Ce2(s3.value[y3]), s3.value[y3] = null;
  }(k3), onMouseleave: (f) => function(y3) {
    o.duration && (s3.value[y3] = me(() => {
      m3(y3);
    }, o.duration));
  }(k3), key: k3 }, [createBaseVNode("div", J2, [g.mode === "info" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-svg", style: normalizeStyle(`fill: ${Oe2[g.mode]}`), viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true", focusable: "false" }, X2, 4)) : createCommentVNode("", true), g.mode === "success" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-svg", style: normalizeStyle(`fill: ${Oe2[g.mode]}`), viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true", focusable: "false" }, Q2, 4)) : createCommentVNode("", true), g.mode === "warning" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-svg", style: normalizeStyle(`fill: ${Oe2[g.mode]}`), viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true", focusable: "false" }, e0, 4)) : createCommentVNode("", true), g.mode === "error" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-svg", style: normalizeStyle(`fill: ${Oe2[g.mode]}`), viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true", focusable: "false" }, a0, 4)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["u-title", { mb4: g.mode !== "open", ml36: g.mode !== "open" }]) }, toDisplayString(g.message || u3.message), 3), createBaseVNode("p", { class: normalizeClass(["u-description", { ml36: g.mode !== "open" }]) }, toDisplayString(g.description || "--"), 3), (openBlock(), createElementBlock("svg", { class: "u-close", onClick: (f) => m3(k3), viewBox: "64 64 896 896", "data-icon": "close", "aria-hidden": "true", focusable: "false" }, t0, 8, l0))])], 40, G2)), [[vShow, !d3.value.includes(k3)]])), 128))]), _: 1 }, 8, ["name"])], 6));
} }), [["__scopeId", "data-v-40ed4a6f"]]);
za2.install = (l) => {
  l.component(za2.__name, za2);
};
var _a2 = defineComponent({ __name: "NumberAnimation", props: { from: { default: 0 }, to: { default: 1e3 }, duration: { default: 3e3 }, autoplay: { type: Boolean, default: true }, precision: { default: 0 }, prefix: { default: "" }, suffix: { default: "" }, separator: { default: "," }, decimal: { default: "." }, valueStyle: { default: () => ({}) }, transition: { default: "easeInOutCubic" } }, emits: ["started", "finished"], setup(l, { expose: a3, emit: e3 }) {
  const o = l, n = ref(o.from);
  watchEffect(() => {
    n.value = o.from;
  }), watch([() => o.from, () => o.to], () => {
    o.autoplay && s3();
  }), onMounted(() => {
    o.autoplay && s3();
  });
  const d3 = useTransition(n, { duration: o.duration, transition: TransitionPresets[o.transition], onFinished: () => p("finished"), onStarted: () => p("started") });
  function s3() {
    n.value = o.to;
  }
  const c3 = computed(() => function(i3) {
    const { precision: h5, decimal: x3, separator: M3, suffix: m3, prefix: u3 } = o;
    if (i3 === 0)
      return i3.toFixed(h5);
    if (!i3)
      return "";
    i3 = Number(i3).toFixed(h5);
    const b3 = (i3 += "").split(".");
    let g = b3[0];
    const k3 = b3.length > 1 ? x3 + b3[1] : "", f = /(\d+)(\d{3})/;
    if (M3 && (y3 = M3, Object.prototype.toString.call(y3) !== "[object Number]"))
      for (; f.test(g); )
        g = g.replace(f, "$1" + M3 + "$2");
    var y3;
    return u3 + g + k3 + m3;
  }(d3.value)), p = e3;
  return a3({ play: s3 }), (i3, h5) => (openBlock(), createElementBlock("span", { style: normalizeStyle(i3.valueStyle) }, toDisplayString(c3.value), 5));
} });
_a2.install = (l) => {
  l.component(_a2.__name, _a2);
};
var Te = (l) => (pushScopeId("data-v-80b1a1f1"), l = l(), popScopeId(), l);
var o0 = { class: "m-pagination-wrap" };
var s0 = { key: 0, class: "mr8" };
var n0 = [Te(() => createBaseVNode("svg", { class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "left", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })], -1))];
var i0 = [Te(() => createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1)), Te(() => createBaseVNode("svg", { class: "u-icon", viewBox: "64 64 896 896", "data-icon": "double-left", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" })], -1))];
var u0 = ["onClick"];
var c0 = [Te(() => createBaseVNode("span", { class: "u-ellipsis" }, "•••", -1)), Te(() => createBaseVNode("svg", { class: "u-icon", viewBox: "64 64 896 896", "data-icon": "double-right", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" })], -1))];
var d0 = [Te(() => createBaseVNode("svg", { class: "u-arrow", viewBox: "64 64 896 896", "data-icon": "right", "aria-hidden": "true", focusable: "false" }, [createBaseVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" })], -1))];
var r0 = { key: 1, class: "u-jump-page" };
var Ue = V(defineComponent({ __name: "Pagination", props: { current: { default: 1 }, pageSize: { default: 10 }, total: { default: 0 }, pageListNum: { default: 5 }, hideOnSinglePage: { type: Boolean, default: false }, showQuickJumper: { type: Boolean, default: false }, showTotal: { type: Boolean, default: false }, placement: { default: "center" } }, emits: ["change"], setup(l, { emit: a3 }) {
  const e3 = l, o = ref(e3.current), n = ref(""), d3 = ref(false), s3 = ref(false), c3 = ref(false), p = ref(false), i3 = computed(() => Math.ceil(e3.total / e3.pageSize)), h5 = computed(() => function(b3) {
    var g = [], k3 = Math.floor(e3.pageListNum / 2), f = { start: b3 - k3, end: b3 + k3 };
    f.start < 1 && (f.end = f.end + (1 - f.start), f.start = 1), f.end > i3.value && (f.start = f.start - (f.end - i3.value), f.end = i3.value), f.start < 1 && (f.start = 1), f.start > 1 ? d3.value = true : d3.value = false, f.end < i3.value ? s3.value = true : s3.value = false;
    for (let y3 = f.start; y3 <= f.end; y3++)
      g.push(y3);
    return g;
  }(o.value).filter((b3) => b3 !== 1 && b3 !== i3.value)), x3 = a3;
  function M3() {
    o.value = o.value - e3.pageListNum > 0 ? o.value - e3.pageListNum : 1;
  }
  function m3() {
    o.value = o.value + e3.pageListNum < i3.value ? o.value + e3.pageListNum : i3.value;
  }
  function u3(b3) {
    if (b3 === 0 || b3 === i3.value + 1)
      return false;
    o.value !== b3 && (o.value = b3);
  }
  return watch(o, (b3) => {
    console.log("change:", b3), x3("change", { page: b3, pageSize: e3.pageSize });
  }), onMounted(() => {
    document.onkeydown = (b3) => {
      b3 && b3.key === "Enter" && function() {
        var g = Number(n.value);
        Number.isInteger(g) && (g < 1 && (g = 1), g > i3.value && (g = i3.value), u3(g)), n.value = "";
      }();
    };
  }), onUnmounted(() => {
    document.onkeydown = null;
  }), (b3, g) => (openBlock(), createElementBlock("div", { class: normalizeClass([`m-pagination ${b3.placement}`, { hidden: b3.hideOnSinglePage && b3.total <= b3.pageSize }]) }, [createBaseVNode("div", o0, [b3.showTotal ? (openBlock(), createElementBlock("span", s0, "共 " + toDisplayString(i3.value) + " 页 / " + toDisplayString(b3.total) + " 条", 1)) : createCommentVNode("", true), createBaseVNode("span", { class: normalizeClass(["u-item", { disabled: o.value === 1 }]), onClick: g[0] || (g[0] = (k3) => u3(o.value - 1)) }, n0, 2), createBaseVNode("span", { class: normalizeClass(["u-item", { active: o.value === 1 }]), onClick: g[1] || (g[1] = (k3) => u3(1)) }, "1", 2), withDirectives(createBaseVNode("span", { class: "m-arrow", ref: "forward", onClick: M3, onMouseenter: g[2] || (g[2] = (k3) => c3.value = true), onMouseleave: g[3] || (g[3] = (k3) => c3.value = false) }, i0, 544), [[vShow, d3.value && h5.value[0] - 1 > 1]]), (openBlock(true), createElementBlock(Fragment, null, renderList(h5.value, (k3, f) => (openBlock(), createElementBlock("span", { class: normalizeClass(["u-item", { active: o.value === k3 }]), key: f, onClick: (y3) => u3(k3) }, toDisplayString(k3), 11, u0))), 128)), withDirectives(createBaseVNode("span", { class: "m-arrow", ref: "backward", onClick: m3, onMouseenter: g[4] || (g[4] = (k3) => p.value = true), onMouseleave: g[5] || (g[5] = (k3) => p.value = false) }, c0, 544), [[vShow, s3.value && h5.value[h5.value.length - 1] + 1 < i3.value]]), withDirectives(createBaseVNode("span", { class: normalizeClass(["u-item", { active: o.value === i3.value }]), onClick: g[6] || (g[6] = (k3) => u3(i3.value)) }, toDisplayString(i3.value), 3), [[vShow, i3.value !== 1]]), createBaseVNode("span", { class: normalizeClass(["u-item", { disabled: o.value === i3.value }]), onClick: g[7] || (g[7] = (k3) => u3(o.value + 1)) }, d0, 2), b3.showQuickJumper ? (openBlock(), createElementBlock("span", r0, [createTextVNode("跳至"), withDirectives(createBaseVNode("input", { type: "text", "onUpdate:modelValue": g[8] || (g[8] = (k3) => n.value = k3) }, null, 512), [[vModelText, n.value]]), createTextVNode("页")])) : createCommentVNode("", true)])], 2));
} }), [["__scopeId", "data-v-80b1a1f1"]]);
Ue.install = (l) => {
  l.component(Ue.__name, Ue);
};
var Ge = (l) => (pushScopeId("data-v-210d0dbf"), l = l(), popScopeId(), l);
var v0 = { class: "m-popconfirm" };
var p0 = { class: "m-pop" };
var f0 = { class: "m-pop-message" };
var h0 = { class: "m-icon" };
var m0 = { key: 0, focusable: "false", class: "u-icon", width: "1em", height: "1em", viewBox: "64 64 896 896", "data-icon": "info-circle", "aria-hidden": "true" };
var g0 = [Ge(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var y0 = { key: 1, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#52c41a" }, viewBox: "64 64 896 896", "data-icon": "check-circle", "aria-hidden": "true" };
var b0 = [Ge(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var k0 = { key: 2, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#ff4d4f" }, viewBox: "64 64 896 896", "data-icon": "close-circle", "aria-hidden": "true" };
var w0 = [Ge(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var x0 = { key: 3, focusable: "false", class: "u-icon", width: "1em", height: "1em", style: { fill: "#faad14" }, viewBox: "64 64 896 896", "data-icon": "exclamation-circle", "aria-hidden": "true" };
var M0 = [Ge(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" }, null, -1))];
var z0 = { key: 0, class: "m-pop-description" };
var _0 = { class: "m-pop-buttons" };
var C0 = Ge(() => createBaseVNode("div", { class: "m-pop-arrow" }, [createBaseVNode("span", { class: "u-pop-arrow" })], -1));
var Ca2 = V(defineComponent({ __name: "Popconfirm", props: { title: { default: "" }, description: { default: "" }, content: { default: "" }, icon: { default: "" }, iconType: { default: "warning" }, maxWidth: { default: "auto" }, cancelText: { default: "取消" }, cancelType: { default: "default" }, okText: { default: "确定" }, okType: { default: "primary" }, showCancel: { type: Boolean, default: true } }, emits: ["cancel", "ok", "openChange"], setup(l, { emit: a3 }) {
  const e3 = l, o = computed(() => typeof e3.maxWidth == "number" ? e3.maxWidth + "px" : e3.maxWidth), n = useSlots(), d3 = computed(() => {
    var y3;
    const f = (y3 = n.description) == null ? void 0 : y3.call(n);
    return f ? !!(f[0].children !== "v-if" && (f != null && f.length)) : e3.description;
  }), s3 = ref(false), c3 = ref(0), p = ref(0), i3 = ref(), h5 = ref(), x3 = ref(false);
  function M3() {
    x3.value = false;
  }
  function m3() {
    x3.value = true, h5.value.focus();
  }
  const u3 = a3;
  function b3() {
    s3.value = !s3.value, s3.value && function() {
      const f = i3.value.offsetWidth, y3 = h5.value.offsetWidth, z3 = h5.value.offsetHeight;
      c3.value = z3 + 4, p.value = (y3 - f) / 2;
    }(), u3("openChange", s3.value);
  }
  function g(f) {
    s3.value = false, u3("openChange", false), u3("cancel", f);
  }
  function k3(f) {
    s3.value = false, u3("openChange", false), u3("ok", f);
  }
  return (f, y3) => {
    const z3 = resolveComponent("Button");
    return openBlock(), createElementBlock("div", v0, [createBaseVNode("div", { ref_key: "popRef", ref: h5, tabindex: "1", class: normalizeClass(["m-pop-content", { "show-pop": s3.value }]), style: normalizeStyle(`max-width: ${o.value}; top: ${-c3.value}px; left: ${-p.value}px;`), onBlur: y3[0] || (y3[0] = (B3) => x3.value ? (s3.value = false, void u3("openChange", false)) : () => false) }, [createBaseVNode("div", p0, [createBaseVNode("div", f0, [createBaseVNode("span", h0, [renderSlot(f.$slots, "icon", {}, () => [f.iconType === "info" ? (openBlock(), createElementBlock("svg", m0, g0)) : createCommentVNode("", true), f.iconType === "success" ? (openBlock(), createElementBlock("svg", y0, b0)) : createCommentVNode("", true), f.iconType === "error" ? (openBlock(), createElementBlock("svg", k0, w0)) : createCommentVNode("", true), f.iconType === "warning" ? (openBlock(), createElementBlock("svg", x0, M0)) : createCommentVNode("", true)], true)]), createBaseVNode("div", { class: normalizeClass(["m-title", { "font-weight": d3.value }]) }, [renderSlot(f.$slots, "title", {}, () => [createTextVNode(toDisplayString(f.title), 1)], true)], 2)]), d3.value ? (openBlock(), createElementBlock("div", z0, [renderSlot(f.$slots, "description", {}, () => [createTextVNode(toDisplayString(f.description), 1)], true)])) : createCommentVNode("", true), createBaseVNode("div", _0, [f.showCancel ? (openBlock(), createBlock(z3, { key: 0, onClick: g, size: "small", type: f.cancelType }, { default: withCtx(() => [createTextVNode(toDisplayString(f.cancelText), 1)]), _: 1 }, 8, ["type"])) : createCommentVNode("", true), createVNode(z3, { onClick: k3, size: "small", type: f.okType }, { default: withCtx(() => [createTextVNode(toDisplayString(f.okText), 1)]), _: 1 }, 8, ["type"])])]), C0], 38), createBaseVNode("div", { ref_key: "contentRef", ref: i3, onClick: b3, onMouseenter: M3, onMouseleave: m3 }, [renderSlot(f.$slots, "default", {}, () => [createTextVNode(toDisplayString(f.content), 1)], true)], 544)]);
  };
} }), [["__scopeId", "data-v-210d0dbf"]]);
Ca2.install = (l) => {
  l.component(Ca2.__name, Ca2);
};
var h1 = (l) => (pushScopeId("data-v-27020600"), l = l(), popScopeId(), l);
var $0 = { class: "m-progress-inner" };
var B0 = { key: 0, class: "m-success" };
var F0 = [h1(() => createBaseVNode("svg", { focusable: "false", class: "u-icon", "data-icon": "check-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" })], -1))];
var S0 = { key: 1, class: "u-progress-text" };
var L0 = { class: "u-progress-circle", viewBox: "0 0 100 100" };
var A0 = ["d", "stroke-width"];
var D0 = ["d", "stroke-width", "stroke", "opacity"];
var E0 = { key: 0, class: "u-icon", focusable: "false", "data-icon": "check", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" };
var H0 = [h1(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1))];
var I0 = { key: 1, class: "u-progress-text" };
var $a = V(defineComponent({ __name: "Progress", props: { width: { default: "100%" }, percent: { default: 0 }, strokeColor: { default: "#1677FF" }, strokeWidth: { default: 8 }, showInfo: { type: Boolean, default: true }, type: { default: "line" } }, setup(l) {
  const a3 = l, e3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), o = computed(() => (100 - a3.strokeWidth) * Math.PI), n = computed(() => {
    const s3 = 100 - a3.strokeWidth;
    return `M 50,50 m 0,-${s3 / 2}
   a ${s3 / 2},${s3 / 2} 0 1 1 0,${s3}
   a ${s3 / 2},${s3 / 2} 0 1 1 0,-${s3}`;
  }), d3 = computed(() => typeof a3.strokeColor == "string" ? a3.strokeColor : `linear-gradient(to ${a3.strokeColor.direction || "right"}, ${a3.strokeColor["0%"] || a3.strokeColor.from}, ${a3.strokeColor["100%"] || a3.strokeColor.to})`);
  return (s3, c3) => s3.type === "line" ? (openBlock(), createElementBlock("div", { key: 0, class: "m-progress-line", style: normalizeStyle(`width: ${e3.value}; height: ${s3.strokeWidth < 24 ? 24 : s3.strokeWidth}px;`) }, [createBaseVNode("div", $0, [createBaseVNode("div", { class: normalizeClass(["u-progress-bg", { "u-success-bg": s3.percent >= 100 }]), style: normalizeStyle(`background: ${d3.value}; width: ${s3.percent >= 100 ? 100 : s3.percent}%; height: ${s3.strokeWidth}px;`) }, null, 6)]), s3.showInfo ? (openBlock(), createBlock(Transition, { key: 0, mode: "out-in" }, { default: withCtx(() => [s3.percent >= 100 ? (openBlock(), createElementBlock("span", B0, F0)) : (openBlock(), createElementBlock("p", S0, toDisplayString(s3.percent >= 100 ? 100 : s3.percent) + "%", 1))]), _: 1 })) : createCommentVNode("", true)], 4)) : (openBlock(), createElementBlock("div", { key: 1, class: "m-progress-circle", style: normalizeStyle(`width: ${e3.value}; height: ${e3.value};`) }, [(openBlock(), createElementBlock("svg", L0, [createBaseVNode("path", { d: n.value, "stroke-linecap": "round", class: "u-progress-circle-trail", "stroke-width": s3.strokeWidth, style: normalizeStyle(`stroke-dasharray: ${o.value}px, ${o.value}px;`), "fill-opacity": "0" }, null, 12, A0), createBaseVNode("path", { d: n.value, "stroke-linecap": "round", class: normalizeClass(["u-progress-circle-path", { success: s3.percent >= 100 }]), "stroke-width": s3.strokeWidth, stroke: d3.value, style: normalizeStyle(`stroke-dasharray: ${s3.percent / 100 * o.value}px, ${o.value}px;`), opacity: s3.percent === 0 ? 0 : 1, "fill-opacity": "0" }, null, 14, D0)])), s3.showInfo ? (openBlock(), createBlock(Transition, { key: 0, mode: "out-in" }, { default: withCtx(() => [s3.percent >= 100 ? (openBlock(), createElementBlock("svg", E0, H0)) : (openBlock(), createElementBlock("p", I0, toDisplayString(s3.percent >= 100 ? 100 : s3.percent) + "%", 1))]), _: 1 })) : createCommentVNode("", true)], 4));
} }), [["__scopeId", "data-v-27020600"]]);
$a.install = (l) => {
  l.component($a.__name, $a);
};
var T0 = ["src"];
var Ba2 = V(defineComponent({ __name: "QRCode", props: { value: { default: "" }, size: { default: 160 }, color: { default: "#000" }, bgColor: { default: "#FFF" }, bordered: { type: Boolean, default: true }, borderColor: { default: "#0505050f" }, scale: { default: 8 }, errorLevel: { default: "H" } }, setup(l) {
  const a3 = l, e3 = computed(() => useQRCode(a3.value, { errorCorrectionLevel: a3.errorLevel, type: "image/png", quality: 1, margin: 3, scale: a3.scale, color: { dark: a3.color, light: a3.bgColor } }));
  return (o, n) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-qrcode", { bordered: o.bordered }]), style: normalizeStyle(`width: ${o.size}px; height: ${o.size}px; border-color: ${o.borderColor};`) }, [createBaseVNode("img", { src: e3.value.value, class: "u-qrcode", alt: "QRCode" }, null, 8, T0)], 6));
} }), [["__scopeId", "data-v-dc8d00cb"]]);
Ba2.install = (l) => {
  l.component(Ba2.__name, Ba2);
};
var j0 = ["onClick"];
var V0 = { class: "u-label" };
var R0 = ["onClick"];
var W0 = { class: "u-label" };
var Fa2 = V(defineComponent({ __name: "Radio", props: { options: { default: () => [] }, disabled: { type: Boolean, default: false }, vertical: { type: Boolean, default: false }, value: { default: null }, gap: { default: 8 }, button: { type: Boolean, default: false }, buttonStyle: { default: "outline" } }, emits: ["update:value", "change"], setup(l, { emit: a3 }) {
  const e3 = l, o = computed(() => e3.options.length), n = computed(() => e3.vertical ? { marginBottom: e3.gap + "px" } : { marginRight: e3.gap + "px" }), d3 = a3;
  function s3(c3) {
    c3 !== e3.value && (d3("update:value", c3), d3("change", c3));
  }
  return (c3, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio", { "m-radio-button-solid": c3.buttonStyle === "solid" }]) }, [c3.button ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(c3.options, (i3, h5) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio-button-wrap", { "m-radio-button-checked": c3.value === i3.value, "m-radio-button-disabled": c3.disabled || i3.disabled }]), key: h5, onClick: (x3) => c3.disabled || i3.disabled ? () => false : s3(i3.value) }, [createBaseVNode("span", W0, [renderSlot(c3.$slots, "default", { label: i3.label }, () => [createTextVNode(toDisplayString(i3.label), 1)], true)])], 10, R0))), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(c3.options, (i3, h5) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-radio-wrap", { vertical: c3.vertical }]), style: normalizeStyle(o.value !== h5 + 1 ? n.value : ""), key: h5 }, [createBaseVNode("div", { class: normalizeClass(["m-box", { "m-radio-disabled": c3.disabled || i3.disabled }]), onClick: (x3) => c3.disabled || i3.disabled ? () => false : s3(i3.value) }, [createBaseVNode("span", { class: normalizeClass(["u-radio", { "u-radio-checked": c3.value === i3.value }]) }, null, 2), createBaseVNode("span", V0, [renderSlot(c3.$slots, "default", { label: i3.label }, () => [createTextVNode(toDisplayString(i3.label), 1)], true)])], 10, j0)], 6))), 128))], 2));
} }), [["__scopeId", "data-v-5a3af575"]]);
Fa2.install = (l) => {
  l.component(Fa2.__name, Fa2);
};
var Be = (l) => (pushScopeId("data-v-3840d4df"), l = l(), popScopeId(), l);
var N0 = ["onClick"];
var O0 = ["onClick", "onMouseenter"];
var q0 = [Be(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1))];
var P0 = [Be(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1))];
var Y0 = [Be(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1))];
var U0 = [Be(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1))];
var K0 = ["onClick", "onMouseenter"];
var Z0 = [Be(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" }, null, -1))];
var G0 = [Be(() => createBaseVNode("path", { d: "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" }, null, -1))];
var J0 = [Be(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" }, null, -1))];
var X0 = [Be(() => createBaseVNode("path", { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" }, null, -1))];
var Sa2 = V(defineComponent({ __name: "Rate", props: { allowClear: { type: Boolean, default: true }, allowHalf: { type: Boolean, default: false }, count: { default: 5 }, character: { default: "star-filled" }, size: { default: 20 }, color: { default: "#fadb14" }, gap: { default: 8 }, disabled: { type: Boolean, default: false }, value: { default: 0 } }, emits: ["update:value", "change", "hoverChange"], setup(l, { emit: a3 }) {
  const e3 = l, o = ref(e3.value), n = ref();
  watch(() => e3.value, (i3) => {
    o.value = i3;
  });
  const d3 = a3;
  function s3(i3) {
    n.value = null, i3 !== e3.value ? (d3("change", i3), d3("update:value", i3)) : e3.allowClear ? (n.value = i3, d3("change", 0), d3("update:value", 0)) : d3("change", i3);
  }
  function c3() {
    n.value = null;
  }
  function p() {
    o.value = e3.value;
  }
  return (i3, h5) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-rate", { disabled: i3.disabled }]), style: normalizeStyle(`--color: ${i3.color};`), onMouseleave: p }, [(openBlock(true), createElementBlock(Fragment, null, renderList(i3.count, (x3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-star", { "u-star-half": i3.allowHalf && o.value >= x3 - 0.5 && o.value < x3, "u-star-full": o.value >= x3, "temp-gray": !i3.allowHalf && n.value === x3 }]), style: normalizeStyle(`margin-right: ${x3 !== i3.count ? i3.gap : 0}px;`), onClick: (M3) => i3.allowHalf ? void M3.preventDefault() : s3(x3), key: x3 }, [i3.allowHalf ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["u-star-first", { "temp-gray-first": n.value === x3 - 0.5 }]), onClick: withModifiers((M3) => s3(x3 - 0.5), ["stop"]), onMouseenter: (M3) => {
    return m3 = x3 - 0.5, o.value = m3, void d3("hoverChange", m3);
    var m3;
  }, onMouseleave: c3 }, [i3.character === "star-filled" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-star", style: normalizeStyle(`width: ${i3.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, q0, 4)) : i3.character === "star-outlined" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-star", style: normalizeStyle(`width: ${i3.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, P0, 4)) : i3.character === "heart-filled" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-star", style: normalizeStyle(`width: ${i3.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, Y0, 4)) : i3.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-star", style: normalizeStyle(`width: ${i3.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, U0, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-star", style: normalizeStyle(`font-size: ${0.66 * i3.size}px; height: ${i3.size}px;`) }, [renderSlot(i3.$slots, "character", {}, () => [createTextVNode(toDisplayString(i3.character), 1)], true)], 4))], 42, O0)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(["u-star-second", { "temp-gray-second": n.value === x3 }]), onClick: withModifiers((M3) => s3(x3), ["stop"]), onMouseenter: (M3) => {
    return m3 = x3, o.value = m3, void d3("hoverChange", m3);
    var m3;
  }, onMouseleave: c3 }, [i3.character === "star-filled" ? (openBlock(), createElementBlock("svg", { key: 0, class: "u-star", style: normalizeStyle(`width: ${i3.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, Z0, 4)) : i3.character === "star-outlined" ? (openBlock(), createElementBlock("svg", { key: 1, class: "u-star", style: normalizeStyle(`width: ${i3.size}px;`), focusable: "false", "data-icon": "star", "aria-hidden": "true", viewBox: "64 64 896 896" }, G0, 4)) : i3.character === "heart-filled" ? (openBlock(), createElementBlock("svg", { key: 2, class: "u-star", style: normalizeStyle(`width: ${i3.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, J0, 4)) : i3.character === "heart-outlined" ? (openBlock(), createElementBlock("svg", { key: 3, class: "u-star", style: normalizeStyle(`width: ${i3.size}px;`), focusable: "false", "data-icon": "heart", "aria-hidden": "true", viewBox: "64 64 896 896" }, X0, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-star", style: normalizeStyle(`font-size: ${0.66 * i3.size}px; height: ${i3.size}px;`) }, [renderSlot(i3.$slots, "character", {}, () => [createTextVNode(toDisplayString(i3.character), 1)], true)], 4))], 42, K0)], 14, N0))), 128))], 38));
} }), [["__scopeId", "data-v-3840d4df"]]);
Sa2.install = (l) => {
  l.component(Sa2.__name, Sa2);
};
var Ga = (l) => (pushScopeId("data-v-3aeb057e"), l = l(), popScopeId(), l);
var Q0 = { class: "m-result" };
var e4 = { class: "m-image" };
var a4 = { key: 0, focusable: "false", class: "u-svg", style: "fill: #1677ff;", "data-icon": "exclamation-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var l4 = [Ga(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var t4 = { key: 1, focusable: "false", class: "u-svg", style: "fill: #52c41a;", "data-icon": "check-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var o4 = [Ga(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }, null, -1))];
var s4 = { key: 2, focusable: "false", class: "u-svg", style: "fill: #faad14;", "data-icon": "warning", "aria-hidden": "true", viewBox: "64 64 896 896" };
var n4 = [Ga(() => createBaseVNode("path", { d: "M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }, null, -1))];
var i4 = { key: 3, focusable: "false", class: "u-svg", style: "fill: #ff4d4f;", "data-icon": "close-circle", "aria-hidden": "true", viewBox: "64 64 896 896" };
var u4 = [Ga(() => createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" }, null, -1))];
var c4 = { key: 4, class: "u-image", width: "251", height: "294" };
var d4 = [createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-3aeb057e><path d="M0 129.023v-2.084C0 58.364 55.591 2.774 124.165 2.774h2.085c68.574 0 124.165 55.59 124.165 124.165v2.084c0 68.575-55.59 124.166-124.165 124.166h-2.085C55.591 253.189 0 197.598 0 129.023" fill="#E4EBF7" data-v-3aeb057e></path><path d="M41.417 132.92a8.231 8.231 0 1 1-16.38-1.65 8.231 8.231 0 0 1 16.38 1.65" fill="#FFF" data-v-3aeb057e></path><path d="M38.652 136.36l10.425 5.91M49.989 148.505l-12.58 10.73" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path d="M41.536 161.28a5.636 5.636 0 1 1-11.216-1.13 5.636 5.636 0 0 1 11.216 1.13M59.154 145.261a5.677 5.677 0 1 1-11.297-1.138 5.677 5.677 0 0 1 11.297 1.138M100.36 29.516l29.66-.013a4.562 4.562 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 0 0 .005 9.126M111.705 47.754l29.659-.013a4.563 4.563 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 1 0 .005 9.126" fill="#FFF" data-v-3aeb057e></path><path d="M114.066 29.503V29.5l15.698-.007a4.563 4.563 0 1 0 .004 9.126l-15.698.007v-.002a4.562 4.562 0 0 0-.004-9.122M185.405 137.723c-.55 5.455-5.418 9.432-10.873 8.882-5.456-.55-9.432-5.418-8.882-10.873.55-5.455 5.418-9.432 10.873-8.882 5.455.55 9.432 5.418 8.882 10.873" fill="#FFF" data-v-3aeb057e></path><path d="M180.17 143.772l12.572 7.129M193.841 158.42L178.67 171.36" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path d="M185.55 171.926a6.798 6.798 0 1 1-13.528-1.363 6.798 6.798 0 0 1 13.527 1.363M204.12 155.285a6.848 6.848 0 1 1-13.627-1.375 6.848 6.848 0 0 1 13.626 1.375" fill="#FFF" data-v-3aeb057e></path><path d="M152.988 194.074a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0zM225.931 118.217a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM217.09 153.051a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.42 0zM177.84 109.842a2.21 2.21 0 1 1-4.422 0 2.21 2.21 0 0 1 4.421 0zM196.114 94.454a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM202.844 182.523a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0z" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path stroke="#FFF" stroke-width="2" d="M215.125 155.262l-1.902 20.075-10.87 5.958M174.601 176.636l-6.322 9.761H156.98l-4.484 6.449M175.874 127.28V111.56M221.51 119.404l-12.77 7.859-15.228-7.86V96.668" data-v-3aeb057e></path><path d="M180.68 29.32C180.68 13.128 193.806 0 210 0c16.193 0 29.32 13.127 29.32 29.32 0 16.194-13.127 29.322-29.32 29.322-16.193 0-29.32-13.128-29.32-29.321" fill="#A26EF4" data-v-3aeb057e></path><path d="M221.45 41.706l-21.563-.125a1.744 1.744 0 0 1-1.734-1.754l.071-12.23a1.744 1.744 0 0 1 1.754-1.734l21.562.125c.964.006 1.74.791 1.735 1.755l-.071 12.229a1.744 1.744 0 0 1-1.754 1.734" fill="#FFF" data-v-3aeb057e></path><path d="M215.106 29.192c-.015 2.577-2.049 4.654-4.543 4.64-2.494-.014-4.504-2.115-4.489-4.693l.04-6.925c.016-2.577 2.05-4.654 4.543-4.64 2.494.015 4.504 2.116 4.49 4.693l-.04 6.925zm-4.53-14.074a6.877 6.877 0 0 0-6.916 6.837l-.043 7.368a6.877 6.877 0 0 0 13.754.08l.042-7.368a6.878 6.878 0 0 0-6.837-6.917zM167.566 68.367h-3.93a4.73 4.73 0 0 1-4.717-4.717 4.73 4.73 0 0 1 4.717-4.717h3.93a4.73 4.73 0 0 1 4.717 4.717 4.73 4.73 0 0 1-4.717 4.717" fill="#FFF" data-v-3aeb057e></path><path d="M168.214 248.838a6.611 6.611 0 0 1-6.61-6.611v-66.108a6.611 6.611 0 0 1 13.221 0v66.108a6.611 6.611 0 0 1-6.61 6.61" fill="#5BA02E" data-v-3aeb057e></path><path d="M176.147 248.176a6.611 6.611 0 0 1-6.61-6.61v-33.054a6.611 6.611 0 1 1 13.221 0v33.053a6.611 6.611 0 0 1-6.61 6.611" fill="#92C110" data-v-3aeb057e></path><path d="M185.994 293.89h-27.376a3.17 3.17 0 0 1-3.17-3.17v-45.887a3.17 3.17 0 0 1 3.17-3.17h27.376a3.17 3.17 0 0 1 3.17 3.17v45.886a3.17 3.17 0 0 1-3.17 3.17" fill="#F2D7AD" data-v-3aeb057e></path><path d="M81.972 147.673s6.377-.927 17.566-1.28c11.729-.371 17.57 1.086 17.57 1.086s3.697-3.855.968-8.424c1.278-12.077 5.982-32.827.335-48.273-1.116-1.339-3.743-1.512-7.536-.62-1.337.315-7.147-.149-7.983-.1l-15.311-.347s-3.487-.17-8.035-.508c-1.512-.113-4.227-1.683-5.458-.338-.406.443-2.425 5.669-1.97 16.077l8.635 35.642s-3.141 3.61 1.219 7.085" fill="#FFF" data-v-3aeb057e></path><path d="M75.768 73.325l-.9-6.397 11.982-6.52s7.302-.118 8.038 1.205c.737 1.324-5.616.993-5.616.993s-1.836 1.388-2.615 2.5c-1.654 2.363-.986 6.471-8.318 5.986-1.708.284-2.57 2.233-2.57 2.233" fill="#FFC6A0" data-v-3aeb057e></path><path d="M52.44 77.672s14.217 9.406 24.973 14.444c1.061.497-2.094 16.183-11.892 11.811-7.436-3.318-20.162-8.44-21.482-14.496-.71-3.258 2.543-7.643 8.401-11.76M141.862 80.113s-6.693 2.999-13.844 6.876c-3.894 2.11-10.137 4.704-12.33 7.988-6.224 9.314 3.536 11.22 12.947 7.503 6.71-2.651 28.999-12.127 13.227-22.367" fill="#FFB594" data-v-3aeb057e></path><path d="M76.166 66.36l3.06 3.881s-2.783 2.67-6.31 5.747c-7.103 6.195-12.803 14.296-15.995 16.44-3.966 2.662-9.754 3.314-12.177-.118-3.553-5.032.464-14.628 31.422-25.95" fill="#FFC6A0" data-v-3aeb057e></path><path d="M64.674 85.116s-2.34 8.413-8.912 14.447c.652.548 18.586 10.51 22.144 10.056 5.238-.669 6.417-18.968 1.145-20.531-.702-.208-5.901-1.286-8.853-2.167-.87-.26-1.611-1.71-3.545-.936l-1.98-.869zM128.362 85.826s5.318 1.956 7.325 13.734c-.546.274-17.55 12.35-21.829 7.805-6.534-6.94-.766-17.393 4.275-18.61 4.646-1.121 5.03-1.37 10.23-2.929" fill="#FFF" data-v-3aeb057e></path><path d="M78.18 94.656s.911 7.41-4.914 13.078" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M87.397 94.68s3.124 2.572 10.263 2.572c7.14 0 9.074-3.437 9.074-3.437" stroke="#E4EBF7" stroke-width=".932" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M117.184 68.639l-6.781-6.177s-5.355-4.314-9.223-.893c-3.867 3.422 4.463 2.083 5.653 4.165 1.19 2.082.848 1.143-2.083.446-5.603-1.331-2.082.893 2.975 5.355 2.091 1.845 6.992.955 6.992.955l2.467-3.851z" fill="#FFC6A0" data-v-3aeb057e></path><path d="M105.282 91.315l-.297-10.937-15.918-.027-.53 10.45c-.026.403.17.788.515.999 2.049 1.251 9.387 5.093 15.799.424.287-.21.443-.554.431-.91" fill="#FFB594" data-v-3aeb057e></path><path d="M107.573 74.24c.817-1.147.982-9.118 1.015-11.928a1.046 1.046 0 0 0-.965-1.055l-4.62-.365c-7.71-1.044-17.071.624-18.253 6.346-5.482 5.813-.421 13.244-.421 13.244s1.963 3.566 4.305 6.791c.756 1.041.398-3.731 3.04-5.929 5.524-4.594 15.899-7.103 15.899-7.103" fill="#5C2552" data-v-3aeb057e></path><path d="M88.426 83.206s2.685 6.202 11.602 6.522c7.82.28 8.973-7.008 7.434-17.505l-.909-5.483c-6.118-2.897-15.478.54-15.478.54s-.576 2.044-.19 5.504c-2.276 2.066-1.824 5.618-1.824 5.618s-.905-1.922-1.98-2.321c-.86-.32-1.897.089-2.322 1.98-1.04 4.632 3.667 5.145 3.667 5.145" fill="#FFC6A0" data-v-3aeb057e></path><path stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" d="M100.843 77.099l1.701-.928-1.015-4.324.674-1.406" data-v-3aeb057e></path><path d="M105.546 74.092c-.022.713-.452 1.279-.96 1.263-.51-.016-.904-.607-.882-1.32.021-.713.452-1.278.96-1.263.51.016.904.607.882 1.32M97.592 74.349c-.022.713-.452 1.278-.961 1.263-.509-.016-.904-.607-.882-1.32.022-.713.452-1.279.961-1.263.51.016.904.606.882 1.32" fill="#552950" data-v-3aeb057e></path><path d="M91.132 86.786s5.269 4.957 12.679 2.327" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M99.776 81.903s-3.592.232-1.44-2.79c1.59-1.496 4.897-.46 4.897-.46s1.156 3.906-3.457 3.25" fill="#DB836E" data-v-3aeb057e></path><path d="M102.88 70.6s2.483.84 3.402.715M93.883 71.975s2.492-1.144 4.778-1.073" stroke="#5C2552" stroke-width="1.526" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M86.32 77.374s.961.879 1.458 2.106c-.377.48-1.033 1.152-.236 1.809M99.337 83.719s1.911.151 2.509-.254" stroke="#DB836E" stroke-width="1.145" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M87.782 115.821l15.73-3.012M100.165 115.821l10.04-2.008" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M66.508 86.763s-1.598 8.83-6.697 14.078" stroke="#E4EBF7" stroke-width="1.114" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M128.31 87.934s3.013 4.121 4.06 11.785" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M64.09 84.816s-6.03 9.912-13.607 9.903" stroke="#DB836E" stroke-width=".795" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M112.366 65.909l-.142 5.32s5.993 4.472 11.945 9.202c4.482 3.562 8.888 7.455 10.985 8.662 4.804 2.766 8.9 3.355 11.076 1.808 4.071-2.894 4.373-9.878-8.136-15.263-4.271-1.838-16.144-6.36-25.728-9.73" fill="#FFC6A0" data-v-3aeb057e></path><path d="M130.532 85.488s4.588 5.757 11.619 6.214" stroke="#DB836E" stroke-width=".75" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M121.708 105.73s-.393 8.564-1.34 13.612" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M115.784 161.512s-3.57-1.488-2.678-7.14" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M101.52 290.246s4.326 2.057 7.408 1.03c2.842-.948 4.564.673 7.132 1.186 2.57.514 6.925 1.108 11.772-1.269-.104-5.551-6.939-4.01-12.048-6.763-2.582-1.39-3.812-4.757-3.625-8.863h-9.471s-1.402 10.596-1.169 14.68" fill="#CBD1D1" data-v-3aeb057e></path><path d="M101.496 290.073s2.447 1.281 6.809.658c3.081-.44 3.74.485 7.479 1.039 3.739.554 10.802-.07 11.91-.9.415 1.108-.347 2.077-.347 2.077s-1.523.608-4.847.831c-2.045.137-5.843.293-7.663-.507-1.8-1.385-5.286-1.917-5.77-.243-3.947.958-7.41-.288-7.41-.288l-.16-2.667z" fill="#2B0849" data-v-3aeb057e></path><path d="M108.824 276.19h3.116s-.103 6.751 4.57 8.62c-4.673.624-8.62-2.32-7.686-8.62" fill="#A4AABA" data-v-3aeb057e></path><path d="M57.65 272.52s-2.122 7.47-4.518 12.396c-1.811 3.724-4.255 7.548 5.505 7.548 6.698 0 9.02-.483 7.479-6.648-1.541-6.164.268-13.296.268-13.296H57.65z" fill="#CBD1D1" data-v-3aeb057e></path><path d="M51.54 290.04s2.111 1.178 6.682 1.178c6.128 0 8.31-1.662 8.31-1.662s.605 1.122-.624 2.18c-1 .862-3.624 1.603-7.444 1.559-4.177-.049-5.876-.57-6.786-1.177-.831-.554-.692-1.593-.138-2.078" fill="#2B0849" data-v-3aeb057e></path><path d="M58.533 274.438s.034 1.529-.315 2.95c-.352 1.431-1.087 3.127-1.139 4.17-.058 1.16 4.57 1.592 5.194.035.623-1.559 1.303-6.475 1.927-7.306.622-.831-4.94-2.135-5.667.15" fill="#A4AABA" data-v-3aeb057e></path><path d="M100.885 277.015l13.306.092s1.291-54.228 1.843-64.056c.552-9.828 3.756-43.13.997-62.788l-12.48-.64-22.725.776s-.433 3.944-1.19 9.921c-.062.493-.677.838-.744 1.358-.075.582.42 1.347.318 1.956-2.35 14.003-6.343 32.926-8.697 46.425-.116.663-1.227 1.004-1.45 2.677-.04.3.21 1.516.112 1.785-6.836 18.643-10.89 47.584-14.2 61.551l14.528-.014s2.185-8.524 4.008-16.878c2.796-12.817 22.987-84.553 22.987-84.553l3-.517 1.037 46.1s-.223 1.228.334 2.008c.558.782-.556 1.117-.39 2.233l.39 1.784s-.446 7.14-.892 11.826c-.446 4.685-.092 38.954-.092 38.954" fill="#7BB2F9" data-v-3aeb057e></path><path d="M77.438 220.434c1.146.094 4.016-2.008 6.916-4.91M107.55 223.931s2.758-1.103 6.069-3.862" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M108.459 220.905s2.759-1.104 6.07-3.863" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M76.099 223.557s2.608-.587 6.47-3.346M87.33 150.82c-.27 3.088.297 8.478-4.315 9.073M104.829 149.075s.11 13.936-1.286 14.983c-2.207 1.655-2.975 1.934-2.975 1.934M101.014 149.63s.035 12.81-1.19 24.245M94.93 174.965s7.174-1.655 9.38-1.655M75.671 204.754c-.316 1.55-.64 3.067-.973 4.535 0 0-1.45 1.822-1.003 3.756.446 1.934-.943 2.034-4.96 15.273-1.686 5.559-4.464 18.49-6.313 27.447-.078.38-4.018 18.06-4.093 18.423M77.043 196.743a313.269 313.269 0 0 1-.877 4.729M83.908 151.414l-1.19 10.413s-1.091.148-.496 2.23c.111 1.34-2.66 15.692-5.153 30.267M57.58 272.94h13.238" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M117.377 147.423s-16.955-3.087-35.7.199c.157 2.501-.002 4.128-.002 4.128s14.607-2.802 35.476-.31c.251-2.342.226-4.017.226-4.017" fill="#192064" data-v-3aeb057e></path><path d="M107.511 150.353l.004-4.885a.807.807 0 0 0-.774-.81c-2.428-.092-5.04-.108-7.795-.014a.814.814 0 0 0-.784.81l-.003 4.88c0 .456.371.82.827.808a140.76 140.76 0 0 1 7.688.017.81.81 0 0 0 .837-.806" fill="#FFF" data-v-3aeb057e></path><path d="M106.402 149.426l.002-3.06a.64.64 0 0 0-.616-.643 94.135 94.135 0 0 0-5.834-.009.647.647 0 0 0-.626.643l-.001 3.056c0 .36.291.648.651.64 1.78-.04 3.708-.041 5.762.012.36.009.662-.279.662-.64" fill="#192064" data-v-3aeb057e></path><path d="M101.485 273.933h12.272M102.652 269.075c.006 3.368.04 5.759.11 6.47M102.667 263.125c-.009 1.53-.015 2.98-.016 4.313M102.204 174.024l.893 44.402s.669 1.561-.224 2.677c-.892 1.116 2.455.67.893 2.231-1.562 1.562.893 1.116 0 3.347-.592 1.48-.988 20.987-1.09 34.956" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path></g>', 1)];
var r4 = { key: 5, class: "u-image", width: "252", height: "294" };
var v4 = [createStaticVNode('<defs data-v-3aeb057e><path d="M0 .387h251.772v251.772H0z" data-v-3aeb057e></path></defs><g fill="none" fill-rule="evenodd" data-v-3aeb057e><g transform="translate(0 .012)" data-v-3aeb057e><mask fill="#fff" data-v-3aeb057e></mask><path d="M0 127.32v-2.095C0 56.279 55.892.387 124.838.387h2.096c68.946 0 124.838 55.892 124.838 124.838v2.096c0 68.946-55.892 124.838-124.838 124.838h-2.096C55.892 252.16 0 196.267 0 127.321" fill="#E4EBF7" mask="url(#b)" data-v-3aeb057e></path></g><path d="M39.755 130.84a8.276 8.276 0 1 1-16.468-1.66 8.276 8.276 0 0 1 16.468 1.66" fill="#FFF" data-v-3aeb057e></path><path d="M36.975 134.297l10.482 5.943M48.373 146.508l-12.648 10.788" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path d="M39.875 159.352a5.667 5.667 0 1 1-11.277-1.136 5.667 5.667 0 0 1 11.277 1.136M57.588 143.247a5.708 5.708 0 1 1-11.358-1.145 5.708 5.708 0 0 1 11.358 1.145M99.018 26.875l29.82-.014a4.587 4.587 0 1 0-.003-9.175l-29.82.013a4.587 4.587 0 1 0 .003 9.176M110.424 45.211l29.82-.013a4.588 4.588 0 0 0-.004-9.175l-29.82.013a4.587 4.587 0 1 0 .004 9.175" fill="#FFF" data-v-3aeb057e></path><path d="M112.798 26.861v-.002l15.784-.006a4.588 4.588 0 1 0 .003 9.175l-15.783.007v-.002a4.586 4.586 0 0 0-.004-9.172M184.523 135.668c-.553 5.485-5.447 9.483-10.931 8.93-5.485-.553-9.483-5.448-8.93-10.932.552-5.485 5.447-9.483 10.932-8.93 5.485.553 9.483 5.447 8.93 10.932" fill="#FFF" data-v-3aeb057e></path><path d="M179.26 141.75l12.64 7.167M193.006 156.477l-15.255 13.011" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path d="M184.668 170.057a6.835 6.835 0 1 1-13.6-1.372 6.835 6.835 0 0 1 13.6 1.372M203.34 153.325a6.885 6.885 0 1 1-13.7-1.382 6.885 6.885 0 0 1 13.7 1.382" fill="#FFF" data-v-3aeb057e></path><path d="M151.931 192.324a2.222 2.222 0 1 1-4.444 0 2.222 2.222 0 0 1 4.444 0zM225.27 116.056a2.222 2.222 0 1 1-4.445 0 2.222 2.222 0 0 1 4.444 0zM216.38 151.08a2.223 2.223 0 1 1-4.446-.001 2.223 2.223 0 0 1 4.446 0zM176.917 107.636a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM195.291 92.165a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM202.058 180.711a2.223 2.223 0 1 1-4.446 0 2.223 2.223 0 0 1 4.446 0z" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path stroke="#FFF" stroke-width="2" d="M214.404 153.302l-1.912 20.184-10.928 5.99M173.661 174.792l-6.356 9.814h-11.36l-4.508 6.484M174.941 125.168v-15.804M220.824 117.25l-12.84 7.901-15.31-7.902V94.39" data-v-3aeb057e></path><path d="M166.588 65.936h-3.951a4.756 4.756 0 0 1-4.743-4.742 4.756 4.756 0 0 1 4.743-4.743h3.951a4.756 4.756 0 0 1 4.743 4.743 4.756 4.756 0 0 1-4.743 4.742" fill="#FFF" data-v-3aeb057e></path><path d="M174.823 30.03c0-16.281 13.198-29.48 29.48-29.48 16.28 0 29.48 13.199 29.48 29.48 0 16.28-13.2 29.48-29.48 29.48-16.282 0-29.48-13.2-29.48-29.48" fill="#1890FF" data-v-3aeb057e></path><path d="M205.952 38.387c.5.5.785 1.142.785 1.928s-.286 1.465-.785 1.964c-.572.5-1.214.75-2 .75-.785 0-1.429-.285-1.929-.785-.572-.5-.82-1.143-.82-1.929s.248-1.428.82-1.928c.5-.5 1.144-.75 1.93-.75.785 0 1.462.25 1.999.75m4.285-19.463c1.428 1.249 2.143 2.963 2.143 5.142 0 1.712-.427 3.13-1.219 4.25-.067.096-.137.18-.218.265-.416.429-1.41 1.346-2.956 2.699a5.07 5.07 0 0 0-1.428 1.75 5.207 5.207 0 0 0-.536 2.357v.5h-4.107v-.5c0-1.357.215-2.536.714-3.5.464-.964 1.857-2.464 4.178-4.536l.43-.5c.643-.785.964-1.643.964-2.535 0-1.18-.358-2.108-1-2.785-.678-.68-1.643-1.001-2.858-1.001-1.536 0-2.642.464-3.357 1.43-.37.5-.621 1.135-.76 1.904a1.999 1.999 0 0 1-1.971 1.63h-.004c-1.277 0-2.257-1.183-1.98-2.43.337-1.518 1.02-2.78 2.073-3.784 1.536-1.5 3.607-2.25 6.25-2.25 2.32 0 4.214.607 5.642 1.894" fill="#FFF" data-v-3aeb057e></path><path d="M52.04 76.131s21.81 5.36 27.307 15.945c5.575 10.74-6.352 9.26-15.73 4.935-10.86-5.008-24.7-11.822-11.577-20.88" fill="#FFB594" data-v-3aeb057e></path><path d="M90.483 67.504l-.449 2.893c-.753.49-4.748-2.663-4.748-2.663l-1.645.748-1.346-5.684s6.815-4.589 8.917-5.018c2.452-.501 9.884.94 10.7 2.278 0 0 1.32.486-2.227.69-3.548.203-5.043.447-6.79 3.132-1.747 2.686-2.412 3.624-2.412 3.624" fill="#FFC6A0" data-v-3aeb057e></path><path d="M128.055 111.367c-2.627-7.724-6.15-13.18-8.917-15.478-3.5-2.906-9.34-2.225-11.366-4.187-1.27-1.231-3.215-1.197-3.215-1.197s-14.98-3.158-16.828-3.479c-2.37-.41-2.124-.714-6.054-1.405-1.57-1.907-2.917-1.122-2.917-1.122l-7.11-1.383c-.853-1.472-2.423-1.023-2.423-1.023l-2.468-.897c-1.645 9.976-7.74 13.796-7.74 13.796 1.795 1.122 15.703 8.3 15.703 8.3l5.107 37.11s-3.321 5.694 1.346 9.109c0 0 19.883-3.743 34.921-.329 0 0 3.047-2.546.972-8.806.523-3.01 1.394-8.263 1.736-11.622.385.772 2.019 1.918 3.14 3.477 0 0 9.407-7.365 11.052-14.012-.832-.723-1.598-1.585-2.267-2.453-.567-.736-.358-2.056-.765-2.717-.669-1.084-1.804-1.378-1.907-1.682" fill="#FFF" data-v-3aeb057e></path><path d="M101.09 289.998s4.295 2.041 7.354 1.021c2.821-.94 4.53.668 7.08 1.178 2.55.51 6.874 1.1 11.686-1.26-.103-5.51-6.889-3.98-11.96-6.713-2.563-1.38-3.784-4.722-3.598-8.799h-9.402s-1.392 10.52-1.16 14.573" fill="#CBD1D1" data-v-3aeb057e></path><path d="M101.067 289.826s2.428 1.271 6.759.653c3.058-.437 3.712.481 7.423 1.031 3.712.55 10.724-.069 11.823-.894.413 1.1-.343 2.063-.343 2.063s-1.512.603-4.812.824c-2.03.136-5.8.291-7.607-.503-1.787-1.375-5.247-1.903-5.728-.241-3.918.95-7.355-.286-7.355-.286l-.16-2.647z" fill="#2B0849" data-v-3aeb057e></path><path d="M108.341 276.044h3.094s-.103 6.702 4.536 8.558c-4.64.618-8.558-2.303-7.63-8.558" fill="#A4AABA" data-v-3aeb057e></path><path d="M57.542 272.401s-2.107 7.416-4.485 12.306c-1.798 3.695-4.225 7.492 5.465 7.492 6.648 0 8.953-.48 7.423-6.599-1.53-6.12.266-13.199.266-13.199h-8.669z" fill="#CBD1D1" data-v-3aeb057e></path><path d="M51.476 289.793s2.097 1.169 6.633 1.169c6.083 0 8.249-1.65 8.249-1.65s.602 1.114-.619 2.165c-.993.855-3.597 1.591-7.39 1.546-4.145-.048-5.832-.566-6.736-1.168-.825-.55-.687-1.58-.137-2.062" fill="#2B0849" data-v-3aeb057e></path><path d="M58.419 274.304s.033 1.519-.314 2.93c-.349 1.42-1.078 3.104-1.13 4.139-.058 1.151 4.537 1.58 5.155.034.62-1.547 1.294-6.427 1.913-7.252.619-.825-4.903-2.119-5.624.15" fill="#A4AABA" data-v-3aeb057e></path><path d="M99.66 278.514l13.378.092s1.298-54.52 1.853-64.403c.554-9.882 3.776-43.364 1.002-63.128l-12.547-.644-22.849.78s-.434 3.966-1.195 9.976c-.063.496-.682.843-.749 1.365-.075.585.423 1.354.32 1.966-2.364 14.08-6.377 33.104-8.744 46.677-.116.666-1.234 1.009-1.458 2.691-.04.302.211 1.525.112 1.795-6.873 18.744-10.949 47.842-14.277 61.885l14.607-.014s2.197-8.57 4.03-16.97c2.811-12.886 23.111-85.01 23.111-85.01l3.016-.521 1.043 46.35s-.224 1.234.337 2.02c.56.785-.56 1.123-.392 2.244l.392 1.794s-.449 7.178-.898 11.89c-.448 4.71-.092 39.165-.092 39.165" fill="#7BB2F9" data-v-3aeb057e></path><path d="M76.085 221.626c1.153.094 4.038-2.019 6.955-4.935M106.36 225.142s2.774-1.11 6.103-3.883" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M107.275 222.1s2.773-1.11 6.102-3.884" stroke="#648BD8" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M74.74 224.767s2.622-.591 6.505-3.365M86.03 151.634c-.27 3.106.3 8.525-4.336 9.123M103.625 149.88s.11 14.012-1.293 15.065c-2.219 1.664-2.99 1.944-2.99 1.944M99.79 150.438s.035 12.88-1.196 24.377M93.673 175.911s7.212-1.664 9.431-1.664M74.31 205.861a212.013 212.013 0 0 1-.979 4.56s-1.458 1.832-1.009 3.776c.449 1.944-.947 2.045-4.985 15.355-1.696 5.59-4.49 18.591-6.348 27.597l-.231 1.12M75.689 197.807a320.934 320.934 0 0 1-.882 4.754M82.591 152.233L81.395 162.7s-1.097.15-.5 2.244c.113 1.346-2.674 15.775-5.18 30.43M56.12 274.418h13.31" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M116.241 148.22s-17.047-3.104-35.893.2c.158 2.514-.003 4.15-.003 4.15s14.687-2.818 35.67-.312c.252-2.355.226-4.038.226-4.038" fill="#192064" data-v-3aeb057e></path><path d="M106.322 151.165l.003-4.911a.81.81 0 0 0-.778-.815c-2.44-.091-5.066-.108-7.836-.014a.818.818 0 0 0-.789.815l-.003 4.906a.81.81 0 0 0 .831.813c2.385-.06 4.973-.064 7.73.017a.815.815 0 0 0 .842-.81" fill="#FFF" data-v-3aeb057e></path><path d="M105.207 150.233l.002-3.076a.642.642 0 0 0-.619-.646 94.321 94.321 0 0 0-5.866-.01.65.65 0 0 0-.63.647v3.072a.64.64 0 0 0 .654.644 121.12 121.12 0 0 1 5.794.011c.362.01.665-.28.665-.642" fill="#192064" data-v-3aeb057e></path><path d="M100.263 275.415h12.338M101.436 270.53c.006 3.387.042 5.79.111 6.506M101.451 264.548a915.75 915.75 0 0 0-.015 4.337M100.986 174.965l.898 44.642s.673 1.57-.225 2.692c-.897 1.122 2.468.673.898 2.243-1.57 1.57.897 1.122 0 3.365-.596 1.489-.994 21.1-1.096 35.146" stroke="#648BD8" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M46.876 83.427s-.516 6.045 7.223 5.552c11.2-.712 9.218-9.345 31.54-21.655-.786-2.708-2.447-4.744-2.447-4.744s-11.068 3.11-22.584 8.046c-6.766 2.9-13.395 6.352-13.732 12.801M104.46 91.057l.941-5.372-8.884-11.43-5.037 5.372-1.74 7.834a.321.321 0 0 0 .108.32c.965.8 6.5 5.013 14.347 3.544a.332.332 0 0 0 .264-.268" fill="#FFC6A0" data-v-3aeb057e></path><path d="M93.942 79.387s-4.533-2.853-2.432-6.855c1.623-3.09 4.513 1.133 4.513 1.133s.52-3.642 3.121-3.642c.52-1.04 1.561-4.162 1.561-4.162s11.445 2.601 13.526 3.121c0 5.203-2.304 19.424-7.84 19.861-8.892.703-12.449-9.456-12.449-9.456" fill="#FFC6A0" data-v-3aeb057e></path><path d="M113.874 73.446c2.601-2.081 3.47-9.722 3.47-9.722s-2.479-.49-6.64-2.05c-4.683-2.081-12.798-4.747-17.48.976-9.668 3.223-2.05 19.823-2.05 19.823l2.713-3.021s-3.935-3.287-2.08-6.243c2.17-3.462 3.92 1.073 3.92 1.073s.637-2.387 3.581-3.342c.355-.71 1.036-2.674 1.432-3.85a1.073 1.073 0 0 1 1.263-.704c2.4.558 8.677 2.019 11.356 2.662.522.125.871.615.82 1.15l-.305 3.248z" fill="#520038" data-v-3aeb057e></path><path d="M104.977 76.064c-.103.61-.582 1.038-1.07.956-.489-.083-.801-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.644.698 1.254M112.132 77.694c-.103.61-.582 1.038-1.07.956-.488-.083-.8-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.643.698 1.254" fill="#552950" data-v-3aeb057e></path><path stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" d="M110.13 74.84l-.896 1.61-.298 4.357h-2.228" data-v-3aeb057e></path><path d="M110.846 74.481s1.79-.716 2.506.537" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M92.386 74.282s.477-1.114 1.113-.716c.637.398 1.274 1.433.558 1.99-.717.556.159 1.67.159 1.67" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M103.287 72.93s1.83 1.113 4.137.954" stroke="#5C2552" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M103.685 81.762s2.227 1.193 4.376 1.193M104.64 84.308s.954.398 1.511.318M94.693 81.205s2.308 7.4 10.424 7.639" stroke="#DB836E" stroke-width="1.118" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M81.45 89.384s.45 5.647-4.935 12.787M69 82.654s-.726 9.282-8.204 14.206" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M129.405 122.865s-5.272 7.403-9.422 10.768" stroke="#E4EBF7" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M119.306 107.329s.452 4.366-2.127 32.062" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M150.028 151.232h-49.837a1.01 1.01 0 0 1-1.01-1.01v-31.688c0-.557.452-1.01 1.01-1.01h49.837c.558 0 1.01.453 1.01 1.01v31.688a1.01 1.01 0 0 1-1.01 1.01" fill="#F2D7AD" data-v-3aeb057e></path><path d="M150.29 151.232h-19.863v-33.707h20.784v32.786a.92.92 0 0 1-.92.92" fill="#F4D19D" data-v-3aeb057e></path><path d="M123.554 127.896H92.917a.518.518 0 0 1-.425-.816l6.38-9.113c.193-.277.51-.442.85-.442h31.092l-7.26 10.371z" fill="#F2D7AD" data-v-3aeb057e></path><path fill="#CC9B6E" d="M123.689 128.447H99.25v-.519h24.169l7.183-10.26.424.298z" data-v-3aeb057e></path><path d="M158.298 127.896h-18.669a2.073 2.073 0 0 1-1.659-.83l-7.156-9.541h19.965c.49 0 .95.23 1.244.622l6.69 8.92a.519.519 0 0 1-.415.83" fill="#F4D19D" data-v-3aeb057e></path><path fill="#CC9B6E" d="M157.847 128.479h-19.384l-7.857-10.475.415-.31 7.7 10.266h19.126zM130.554 150.685l-.032-8.177.519-.002.032 8.177z" data-v-3aeb057e></path><path fill="#CC9B6E" d="M130.511 139.783l-.08-21.414.519-.002.08 21.414zM111.876 140.932l-.498-.143 1.479-5.167.498.143zM108.437 141.06l-2.679-2.935 2.665-3.434.41.318-2.397 3.089 2.384 2.612zM116.607 141.06l-.383-.35 2.383-2.612-2.397-3.089.41-.318 2.665 3.434z" data-v-3aeb057e></path><path d="M154.316 131.892l-3.114-1.96.038 3.514-1.043.092c-1.682.115-3.634.23-4.789.23-1.902 0-2.693 2.258 2.23 2.648l-2.645-.596s-2.168 1.317.504 2.3c0 0-1.58 1.217.561 2.58-.584 3.504 5.247 4.058 7.122 3.59 1.876-.47 4.233-2.359 4.487-5.16.28-3.085-.89-5.432-3.35-7.238" fill="#FFC6A0" data-v-3aeb057e></path><path d="M153.686 133.577s-6.522.47-8.36.372c-1.836-.098-1.904 2.19 2.359 2.264 3.739.15 5.451-.044 5.451-.044" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M145.16 135.877c-1.85 1.346.561 2.355.561 2.355s3.478.898 6.73.617" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M151.89 141.71s-6.28.111-6.73-2.132c-.223-1.346.45-1.402.45-1.402M146.114 140.868s-1.103 3.16 5.44 3.533M151.202 129.932v3.477M52.838 89.286c3.533-.337 8.423-1.248 13.582-7.754" stroke="#DB836E" stroke-width="1.051" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M168.567 248.318a6.647 6.647 0 0 1-6.647-6.647v-66.466a6.647 6.647 0 1 1 13.294 0v66.466a6.647 6.647 0 0 1-6.647 6.647" fill="#5BA02E" data-v-3aeb057e></path><path d="M176.543 247.653a6.647 6.647 0 0 1-6.646-6.647v-33.232a6.647 6.647 0 1 1 13.293 0v33.232a6.647 6.647 0 0 1-6.647 6.647" fill="#92C110" data-v-3aeb057e></path><path d="M186.443 293.613H158.92a3.187 3.187 0 0 1-3.187-3.187v-46.134a3.187 3.187 0 0 1 3.187-3.187h27.524a3.187 3.187 0 0 1 3.187 3.187v46.134a3.187 3.187 0 0 1-3.187 3.187" fill="#F2D7AD" data-v-3aeb057e></path><path d="M88.979 89.48s7.776 5.384 16.6 2.842" stroke="#E4EBF7" stroke-width="1.101" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path></g>', 2)];
var p4 = { key: 6, class: "u-image", width: "254", height: "294" };
var f4 = [createStaticVNode('<defs data-v-3aeb057e><path d="M0 .335h253.49v253.49H0z" data-v-3aeb057e></path><path d="M0 293.665h253.49V.401H0z" data-v-3aeb057e></path></defs><g fill="none" fill-rule="evenodd" data-v-3aeb057e><g transform="translate(0 .067)" data-v-3aeb057e><mask fill="#fff" data-v-3aeb057e></mask><path d="M0 128.134v-2.11C0 56.608 56.273.334 125.69.334h2.11c69.416 0 125.69 56.274 125.69 125.69v2.11c0 69.417-56.274 125.69-125.69 125.69h-2.11C56.273 253.824 0 197.551 0 128.134" fill="#E4EBF7" mask="url(#b)" data-v-3aeb057e></path></g><path d="M39.989 132.108a8.332 8.332 0 1 1-16.581-1.671 8.332 8.332 0 0 1 16.58 1.671" fill="#FFF" data-v-3aeb057e></path><path d="M37.19 135.59l10.553 5.983M48.665 147.884l-12.734 10.861" stroke="#FFF" stroke-width="2" data-v-3aeb057e></path><path d="M40.11 160.816a5.706 5.706 0 1 1-11.354-1.145 5.706 5.706 0 0 1 11.354 1.145M57.943 144.6a5.747 5.747 0 1 1-11.436-1.152 5.747 5.747 0 0 1 11.436 1.153M99.656 27.434l30.024-.013a4.619 4.619 0 1 0-.004-9.238l-30.024.013a4.62 4.62 0 0 0 .004 9.238M111.14 45.896l30.023-.013a4.62 4.62 0 1 0-.004-9.238l-30.024.013a4.619 4.619 0 1 0 .004 9.238" fill="#FFF" data-v-3aeb057e></path><path d="M113.53 27.421v-.002l15.89-.007a4.619 4.619 0 1 0 .005 9.238l-15.892.007v-.002a4.618 4.618 0 0 0-.004-9.234M150.167 70.091h-3.979a4.789 4.789 0 0 1-4.774-4.775 4.788 4.788 0 0 1 4.774-4.774h3.979a4.789 4.789 0 0 1 4.775 4.774 4.789 4.789 0 0 1-4.775 4.775" fill="#FFF" data-v-3aeb057e></path><path d="M171.687 30.234c0-16.392 13.289-29.68 29.681-29.68 16.392 0 29.68 13.288 29.68 29.68 0 16.393-13.288 29.681-29.68 29.681s-29.68-13.288-29.68-29.68" fill="#FF603B" data-v-3aeb057e></path><path d="M203.557 19.435l-.676 15.035a1.514 1.514 0 0 1-3.026 0l-.675-15.035a2.19 2.19 0 1 1 4.377 0m-.264 19.378c.513.477.77 1.1.77 1.87s-.257 1.393-.77 1.907c-.55.476-1.21.733-1.943.733a2.545 2.545 0 0 1-1.87-.77c-.55-.514-.806-1.136-.806-1.87 0-.77.256-1.393.806-1.87.513-.513 1.137-.733 1.87-.733.77 0 1.43.22 1.943.733" fill="#FFF" data-v-3aeb057e></path><path d="M119.3 133.275c4.426-.598 3.612-1.204 4.079-4.778.675-5.18-3.108-16.935-8.262-25.118-1.088-10.72-12.598-11.24-12.598-11.24s4.312 4.895 4.196 16.199c1.398 5.243.804 14.45.804 14.45s5.255 11.369 11.78 10.487" fill="#FFB594" data-v-3aeb057e></path><path d="M100.944 91.61s1.463-.583 3.211.582c8.08 1.398 10.368 6.706 11.3 11.368 1.864 1.282 1.864 2.33 1.864 3.496.365.777 1.515 3.03 1.515 3.03s-7.225 1.748-10.954 6.758c-1.399-6.41-6.936-25.235-6.936-25.235" fill="#FFF" data-v-3aeb057e></path><path d="M94.008 90.5l1.019-5.815-9.23-11.874-5.233 5.581-2.593 9.863s8.39 5.128 16.037 2.246" fill="#FFB594" data-v-3aeb057e></path><path d="M82.931 78.216s-4.557-2.868-2.445-6.892c1.632-3.107 4.537 1.139 4.537 1.139s.524-3.662 3.139-3.662c.523-1.046 1.569-4.184 1.569-4.184s11.507 2.615 13.6 3.138c-.001 5.23-2.317 19.529-7.884 19.969-8.94.706-12.516-9.508-12.516-9.508" fill="#FFC6A0" data-v-3aeb057e></path><path d="M102.971 72.243c2.616-2.093 3.489-9.775 3.489-9.775s-2.492-.492-6.676-2.062c-4.708-2.092-12.867-4.771-17.575.982-9.54 4.41-2.062 19.93-2.062 19.93l2.729-3.037s-3.956-3.304-2.092-6.277c2.183-3.48 3.943 1.08 3.943 1.08s.64-2.4 3.6-3.36c.356-.714 1.04-2.69 1.44-3.872a1.08 1.08 0 0 1 1.27-.707c2.41.56 8.723 2.03 11.417 2.676.524.126.876.619.825 1.156l-.308 3.266z" fill="#520038" data-v-3aeb057e></path><path d="M101.22 76.514c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.961.491.083.805.647.702 1.26M94.26 75.074c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.96.491.082.805.646.702 1.26" fill="#552950" data-v-3aeb057e></path><path stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" d="M99.206 73.644l-.9 1.62-.3 4.38h-2.24" data-v-3aeb057e></path><path d="M99.926 73.284s1.8-.72 2.52.54" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M81.367 73.084s.48-1.12 1.12-.72c.64.4 1.28 1.44.56 2s.16 1.68.16 1.68" stroke="#DB836E" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M92.326 71.724s1.84 1.12 4.16.96" stroke="#5C2552" stroke-width="1.117" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M92.726 80.604s2.24 1.2 4.4 1.2M93.686 83.164s.96.4 1.52.32M83.687 80.044s1.786 6.547 9.262 7.954" stroke="#DB836E" stroke-width="1.063" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M95.548 91.663s-1.068 2.821-8.298 2.105c-7.23-.717-10.29-5.044-10.29-5.044" stroke="#E4EBF7" stroke-width="1.136" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M78.126 87.478s6.526 4.972 16.47 2.486c0 0 9.577 1.02 11.536 5.322 5.36 11.77.543 36.835 0 39.962 3.496 4.055-.466 8.483-.466 8.483-15.624-3.548-35.81-.6-35.81-.6-4.849-3.546-1.223-9.044-1.223-9.044L62.38 110.32c-2.485-15.227.833-19.803 3.549-20.743 3.03-1.049 8.04-1.282 8.04-1.282.496-.058 1.08-.076 1.37-.233 2.36-1.282 2.787-.583 2.787-.583" fill="#FFF" data-v-3aeb057e></path><path d="M65.828 89.81s-6.875.465-7.59 8.156c-.466 8.857 3.03 10.954 3.03 10.954s6.075 22.102 16.796 22.957c8.39-2.176 4.758-6.702 4.661-11.42-.233-11.304-7.108-16.897-7.108-16.897s-4.212-13.75-9.789-13.75" fill="#FFC6A0" data-v-3aeb057e></path><path d="M71.716 124.225s.855 11.264 9.828 6.486c4.765-2.536 7.581-13.828 9.789-22.568 1.456-5.768 2.58-12.197 2.58-12.197l-4.973-1.709s-2.408 5.516-7.769 12.275c-4.335 5.467-9.144 11.11-9.455 17.713" fill="#FFC6A0" data-v-3aeb057e></path><path d="M108.463 105.191s1.747 2.724-2.331 30.535c2.376 2.216 1.053 6.012-.233 7.51" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M123.262 131.527s-.427 2.732-11.77 1.981c-15.187-1.006-25.326-3.25-25.326-3.25l.933-5.8s.723.215 9.71-.068c11.887-.373 18.714-6.07 24.964-1.022 4.039 3.263 1.489 8.16 1.489 8.16" fill="#FFC6A0" data-v-3aeb057e></path><path d="M70.24 90.974s-5.593-4.739-11.054 2.68c-3.318 7.223.517 15.284 2.664 19.578-.31 3.729 2.33 4.311 2.33 4.311s.108.895 1.516 2.68c4.078-7.03 6.72-9.166 13.711-12.546-.328-.656-1.877-3.265-1.825-3.767.175-1.69-1.282-2.623-1.282-2.623s-.286-.156-1.165-2.738c-.788-2.313-2.036-5.177-4.895-7.575" fill="#FFF" data-v-3aeb057e></path><path d="M90.232 288.027s4.855 2.308 8.313 1.155c3.188-1.063 5.12.755 8.002 1.331 2.881.577 7.769 1.243 13.207-1.424-.117-6.228-7.786-4.499-13.518-7.588-2.895-1.56-4.276-5.336-4.066-9.944H91.544s-1.573 11.89-1.312 16.47" fill="#CBD1D1" data-v-3aeb057e></path><path d="M90.207 287.833s2.745 1.437 7.639.738c3.456-.494 3.223.66 7.418 1.282 4.195.621 13.092-.194 14.334-1.126.466 1.242-.388 2.33-.388 2.33s-1.709.682-5.438.932c-2.295.154-8.098.276-10.14-.621-2.02-1.554-4.894-1.515-6.06-.234-4.427 1.075-7.184-.31-7.184-.31l-.181-2.991z" fill="#2B0849" data-v-3aeb057e></path><path d="M98.429 272.257h3.496s-.117 7.574 5.127 9.671c-5.244.7-9.672-2.602-8.623-9.671" fill="#A4AABA" data-v-3aeb057e></path><path d="M44.425 272.046s-2.208 7.774-4.702 12.899c-1.884 3.874-4.428 7.854 5.729 7.854 6.97 0 9.385-.503 7.782-6.917-1.604-6.415.279-13.836.279-13.836h-9.088z" fill="#CBD1D1" data-v-3aeb057e></path><path d="M38.066 290.277s2.198 1.225 6.954 1.225c6.376 0 8.646-1.73 8.646-1.73s.63 1.168-.649 2.27c-1.04.897-3.77 1.668-7.745 1.621-4.347-.05-6.115-.593-7.062-1.224-.864-.577-.72-1.657-.144-2.162" fill="#2B0849" data-v-3aeb057e></path><path d="M45.344 274.041s.035 1.592-.329 3.07c-.365 1.49-1.13 3.255-1.184 4.34-.061 1.206 4.755 1.657 5.403.036.65-1.622 1.357-6.737 2.006-7.602.648-.865-5.14-2.222-5.896.156" fill="#A4AABA" data-v-3aeb057e></path><path d="M89.476 277.57l13.899.095s1.349-56.643 1.925-66.909c.576-10.267 3.923-45.052 1.042-65.585l-13.037-.669-23.737.81s-.452 4.12-1.243 10.365c-.065.515-.708.874-.777 1.417-.078.608.439 1.407.332 2.044-2.455 14.627-5.797 32.736-8.256 46.837-.121.693-1.282 1.048-1.515 2.796-.042.314.22 1.584.116 1.865-7.14 19.473-12.202 52.601-15.66 67.19l15.176-.015s2.282-10.145 4.185-18.871c2.922-13.389 24.012-88.32 24.012-88.32l3.133-.954-.158 48.568s-.233 1.282.35 2.098c.583.815-.581 1.167-.408 2.331l.408 1.864s-.466 7.458-.932 12.352c-.467 4.895 1.145 40.69 1.145 40.69" fill="#7BB2F9" data-v-3aeb057e></path><path d="M64.57 218.881c1.197.099 4.195-2.097 7.225-5.127M96.024 222.534s2.881-1.152 6.34-4.034" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M96.973 219.373s2.882-1.153 6.34-4.034" stroke="#648BD8" stroke-width="1.032" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M63.172 222.144s2.724-.614 6.759-3.496M74.903 146.166c-.281 3.226.31 8.856-4.506 9.478M93.182 144.344s.115 14.557-1.344 15.65c-2.305 1.73-3.107 2.02-3.107 2.02M89.197 144.923s.269 13.144-1.01 25.088M83.525 170.71s6.81-1.051 9.116-1.051M46.026 270.045l-.892 4.538M46.937 263.289l-.815 4.157M62.725 202.503c-.33 1.618-.102 1.904-.449 3.438 0 0-2.756 1.903-2.29 3.923.466 2.02-.31 3.424-4.505 17.252-1.762 5.807-4.233 18.922-6.165 28.278-.03.144-.521 2.646-1.14 5.8M64.158 194.136c-.295 1.658-.6 3.31-.917 4.938M71.33 146.787l-1.244 10.877s-1.14.155-.519 2.33c.117 1.399-2.778 16.39-5.382 31.615M44.242 273.727H58.07" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M106.18 142.117c-3.028-.489-18.825-2.744-36.219.2a.625.625 0 0 0-.518.644c.063 1.307.044 2.343.015 2.995a.617.617 0 0 0 .716.636c3.303-.534 17.037-2.412 35.664-.266.347.04.66-.214.692-.56.124-1.347.16-2.425.17-3.029a.616.616 0 0 0-.52-.62" fill="#192064" data-v-3aeb057e></path><path d="M96.398 145.264l.003-5.102a.843.843 0 0 0-.809-.847 114.104 114.104 0 0 0-8.141-.014.85.85 0 0 0-.82.847l-.003 5.097c0 .476.388.857.864.845 2.478-.064 5.166-.067 8.03.017a.848.848 0 0 0 .876-.843" fill="#FFF" data-v-3aeb057e></path><path d="M95.239 144.296l.002-3.195a.667.667 0 0 0-.643-.672c-1.9-.061-3.941-.073-6.094-.01a.675.675 0 0 0-.654.672l-.002 3.192c0 .376.305.677.68.669 1.859-.042 3.874-.043 6.02.012.376.01.69-.291.691-.668" fill="#192064" data-v-3aeb057e></path><path d="M90.102 273.522h12.819M91.216 269.761c.006 3.519-.072 5.55 0 6.292M90.923 263.474c-.009 1.599-.016 2.558-.016 4.505M90.44 170.404l.932 46.38s.7 1.631-.233 2.796c-.932 1.166 2.564.7.932 2.33-1.63 1.633.933 1.166 0 3.497-.618 1.546-1.031 21.921-1.138 36.513" stroke="#648BD8" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M73.736 98.665l2.214 4.312s2.098.816 1.865 2.68l.816 2.214M64.297 116.611c.233-.932 2.176-7.147 12.585-10.488M77.598 90.042s7.691 6.137 16.547 2.72" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M91.974 86.954s5.476-.816 7.574-4.545c1.297-.345.72 2.212-.33 3.671-.7.971-1.01 1.554-1.01 1.554s.194.31.155.816c-.053.697-.175.653-.272 1.048-.081.335.108.657 0 1.049-.046.17-.198.5-.382.878-.12.249-.072.687-.2.948-.231.469-1.562 1.87-2.622 2.855-3.826 3.554-5.018 1.644-6.001-.408-.894-1.865-.661-5.127-.874-6.875-.35-2.914-2.622-3.03-1.923-4.429.343-.685 2.87.69 3.263 1.748.757 2.04 2.952 1.807 2.622 1.69" fill="#FFC6A0" data-v-3aeb057e></path><path d="M99.8 82.429c-.465.077-.35.272-.97 1.243-.622.971-4.817 2.932-6.39 3.224-2.589.48-2.278-1.56-4.254-2.855-1.69-1.107-3.562-.638-1.398 1.398.99.932.932 1.107 1.398 3.205.335 1.506-.64 3.67.7 5.593" stroke="#DB836E" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M79.543 108.673c-2.1 2.926-4.266 6.175-5.557 8.762" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M87.72 124.768s-2.098-1.942-5.127-2.719c-3.03-.777-3.574-.155-5.516.078-1.942.233-3.885-.932-3.652.7.233 1.63 5.05 1.01 5.206 2.097.155 1.087-6.37 2.796-8.313 2.175-.777.777.466 1.864 2.02 2.175.233 1.554 2.253 1.554 2.253 1.554s.699 1.01 2.641 1.088c2.486 1.32 8.934-.7 10.954-1.554 2.02-.855-.466-5.594-.466-5.594" fill="#FFC6A0" data-v-3aeb057e></path><path d="M73.425 122.826s.66 1.127 3.167 1.418c2.315.27 2.563.583 2.563.583s-2.545 2.894-9.07 2.272M72.416 129.274s3.826.097 4.933-.718M74.98 130.75s1.961.136 3.36-.505M77.232 131.916s1.748.019 2.914-.505M73.328 122.321s-.595-1.032 1.262-.427c1.671.544 2.833.055 5.128.155 1.389.061 3.067-.297 3.982.15 1.606.784 3.632 2.181 3.632 2.181s10.526 1.204 19.033-1.127M78.864 108.104s-8.39 2.758-13.168 12.12" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M109.278 112.533s3.38-3.613 7.575-4.662" stroke="#E4EBF7" stroke-width="1.085" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M107.375 123.006s9.697-2.745 11.445-.88" stroke="#E59788" stroke-width=".774" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M194.605 83.656l3.971-3.886M187.166 90.933l3.736-3.655M191.752 84.207l-4.462-4.56M198.453 91.057l-4.133-4.225M129.256 163.074l3.718-3.718M122.291 170.039l3.498-3.498M126.561 163.626l-4.27-4.27M132.975 170.039l-3.955-3.955" stroke="#BFCDDD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-3aeb057e></path><path d="M190.156 211.779h-1.604a4.023 4.023 0 0 1-4.011-4.011V175.68a4.023 4.023 0 0 1 4.01-4.01h1.605a4.023 4.023 0 0 1 4.011 4.01v32.088a4.023 4.023 0 0 1-4.01 4.01" fill="#A3B4C6" data-v-3aeb057e></path><path d="M237.824 212.977a4.813 4.813 0 0 1-4.813 4.813h-86.636a4.813 4.813 0 0 1 0-9.626h86.636a4.813 4.813 0 0 1 4.813 4.813" fill="#A3B4C6" data-v-3aeb057e></path><mask fill="#fff" data-v-3aeb057e></mask><path fill="#A3B4C6" mask="url(#d)" d="M154.098 190.096h70.513v-84.617h-70.513z" data-v-3aeb057e></path><path d="M224.928 190.096H153.78a3.219 3.219 0 0 1-3.208-3.209V167.92a3.219 3.219 0 0 1 3.208-3.21h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.219 3.219 0 0 1-3.21 3.209M224.928 130.832H153.78a3.218 3.218 0 0 1-3.208-3.208v-18.968a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.218 3.218 0 0 1-3.21 3.208" fill="#BFCDDD" mask="url(#d)" data-v-3aeb057e></path><path d="M159.563 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 120.546h-22.461a.802.802 0 0 1-.802-.802v-3.208c0-.443.359-.803.802-.803h22.46c.444 0 .803.36.803.803v3.208c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-3aeb057e></path><path d="M224.928 160.464H153.78a3.218 3.218 0 0 1-3.208-3.209v-18.967a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.209v18.967a3.218 3.218 0 0 1-3.21 3.209" fill="#BFCDDD" mask="url(#d)" data-v-3aeb057e></path><path d="M173.455 130.832h49.301M164.984 130.832h6.089M155.952 130.832h6.75M173.837 160.613h49.3M165.365 160.613h6.089M155.57 160.613h6.751" stroke="#7C90A5" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-3aeb057e></path><path d="M159.563 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M166.98 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M174.397 151.038a2.407 2.407 0 1 1 .001-4.814 2.407 2.407 0 0 1 0 4.814M222.539 151.038h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802M159.563 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 179.987h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802" fill="#FFF" mask="url(#d)" data-v-3aeb057e></path><path d="M203.04 221.108h-27.372a2.413 2.413 0 0 1-2.406-2.407v-11.448a2.414 2.414 0 0 1 2.406-2.407h27.372a2.414 2.414 0 0 1 2.407 2.407V218.7a2.413 2.413 0 0 1-2.407 2.407" fill="#BFCDDD" mask="url(#d)" data-v-3aeb057e></path><path d="M177.259 207.217v11.52M201.05 207.217v11.52" stroke="#A3B4C6" stroke-width="1.124" stroke-linecap="round" stroke-linejoin="round" mask="url(#d)" data-v-3aeb057e></path><path d="M162.873 267.894a9.422 9.422 0 0 1-9.422-9.422v-14.82a9.423 9.423 0 0 1 18.845 0v14.82a9.423 9.423 0 0 1-9.423 9.422" fill="#5BA02E" mask="url(#d)" data-v-3aeb057e></path><path d="M171.22 267.83a9.422 9.422 0 0 1-9.422-9.423v-3.438a9.423 9.423 0 0 1 18.845 0v3.438a9.423 9.423 0 0 1-9.422 9.423" fill="#92C110" mask="url(#d)" data-v-3aeb057e></path><path d="M181.31 293.666h-27.712a3.209 3.209 0 0 1-3.209-3.21V269.79a3.209 3.209 0 0 1 3.209-3.21h27.711a3.209 3.209 0 0 1 3.209 3.21v20.668a3.209 3.209 0 0 1-3.209 3.209" fill="#F2D7AD" mask="url(#d)" data-v-3aeb057e></path></g>', 2)];
var h4 = { class: "m-title" };
var m4 = { class: "m-subtitle" };
var g4 = { class: "m-extra" };
var y4 = { key: 0, class: "m-content" };
var La2 = V(defineComponent({ __name: "Result", props: { status: { default: "info" }, title: { default: "" }, subTitle: { default: "" } }, setup(l) {
  const a3 = useSlots(), e3 = computed(() => {
    var n;
    const o = (n = a3.default) == null ? void 0 : n.call(a3);
    return !!o && !!(o[0].children !== "v-if" && (o != null && o.length));
  });
  return (o, n) => (openBlock(), createElementBlock("div", Q0, [createBaseVNode("div", e4, [renderSlot(o.$slots, "image", {}, () => [o.status === "info" ? (openBlock(), createElementBlock("svg", a4, l4)) : createCommentVNode("", true), o.status === "success" ? (openBlock(), createElementBlock("svg", t4, o4)) : createCommentVNode("", true), o.status === "warning" ? (openBlock(), createElementBlock("svg", s4, n4)) : createCommentVNode("", true), o.status === "error" ? (openBlock(), createElementBlock("svg", i4, u4)) : createCommentVNode("", true), o.status === "403" ? (openBlock(), createElementBlock("svg", c4, d4)) : createCommentVNode("", true), o.status === "404" ? (openBlock(), createElementBlock("svg", r4, v4)) : createCommentVNode("", true), o.status === "500" ? (openBlock(), createElementBlock("svg", p4, f4)) : createCommentVNode("", true)], true)]), createBaseVNode("div", h4, [renderSlot(o.$slots, "title", {}, () => [createTextVNode(toDisplayString(o.title), 1)], true)]), createBaseVNode("div", m4, [renderSlot(o.$slots, "subTitle", {}, () => [createTextVNode(toDisplayString(o.subTitle), 1)], true)]), createBaseVNode("div", g4, [renderSlot(o.$slots, "extra", {}, void 0, true)]), e3.value ? (openBlock(), createElementBlock("div", y4, [renderSlot(o.$slots, "default", {}, void 0, true)])) : createCommentVNode("", true)]));
} }), [["__scopeId", "data-v-3aeb057e"]]);
La2.install = (l) => {
  l.component(La2.__name, La2);
};
var Aa2 = V(defineComponent({ __name: "Row", props: { width: { default: "auto" }, gutter: { default: 0 }, wrap: { type: Boolean, default: false }, align: { default: "top" }, justify: { default: "start" } }, setup(l) {
  const a3 = l, e3 = { top: "flex-start", middle: "center", bottom: "flex-end", stretch: "stretch" }, o = computed(() => typeof a3.gutter == "number" ? a3.gutter : Array.isArray(a3.gutter) ? typeof a3.gutter[0] == "object" ? s3.value >= 1600 && a3.gutter[0].xxl ? a3.gutter[0].xxl : s3.value >= 1200 && a3.gutter[0].xl ? a3.gutter[0].xl : s3.value >= 992 && a3.gutter[0].lg ? a3.gutter[0].lg : s3.value >= 768 && a3.gutter[0].md ? a3.gutter[0].md : s3.value >= 576 && a3.gutter[0].sm ? a3.gutter[0].sm : s3.value < 576 && a3.gutter[0].xs ? a3.gutter[0].xs : 16 : a3.gutter[0] : typeof a3.gutter == "object" ? s3.value >= 1600 && a3.gutter.xxl ? a3.gutter.xxl : s3.value >= 1200 && a3.gutter.xl ? a3.gutter.xl : s3.value >= 992 && a3.gutter.lg ? a3.gutter.lg : s3.value >= 768 && a3.gutter.md ? a3.gutter.md : s3.value >= 576 && a3.gutter.sm ? a3.gutter.sm : s3.value < 576 && a3.gutter.xs ? a3.gutter.xs : 16 : 0), n = computed(() => Array.isArray(a3.gutter) ? typeof a3.gutter[1] == "object" ? s3.value >= 1600 && a3.gutter[1].xxl ? a3.gutter[1].xxl : s3.value >= 1200 && a3.gutter[1].xl ? a3.gutter[1].xl : s3.value >= 992 && a3.gutter[1].lg ? a3.gutter[1].lg : s3.value >= 768 && a3.gutter[1].md ? a3.gutter[1].md : s3.value >= 576 && a3.gutter[1].sm ? a3.gutter[1].sm : s3.value < 576 && a3.gutter[1].xs ? a3.gutter[1].xs : 16 : a3.gutter[1] : 0), d3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), s3 = ref(document.documentElement.clientWidth);
  function c3() {
    s3.value = document.documentElement.clientWidth;
  }
  return onMounted(() => {
    window.addEventListener("resize", c3);
  }), onUnmounted(() => {
    window.removeEventListener("resize", c3);
  }), (p, i3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-row", { "gutter-row": p.gutter }]), style: normalizeStyle(`--xGap: ${o.value / 2}px; --justify: ${p.justify}; --align: ${e3[p.align]}; width: ${d3.value}; margin-left: -${o.value / 2}px; margin-right: -${o.value / 2}px; row-gap: ${n.value}px;`) }, [renderSlot(p.$slots, "default", {}, void 0, true)], 6));
} }), [["__scopeId", "data-v-aee57bbb"]]);
Aa2.install = (l) => {
  l.component(Aa2.__name, Aa2);
};
var m1 = (l) => (pushScopeId("data-v-f5caf7a6"), l = l(), popScopeId(), l);
var b4 = { key: 0, class: "m-handle-tooltip" };
var k4 = m1(() => createBaseVNode("div", { class: "m-arrow" }, null, -1));
var w4 = { key: 0, class: "m-handle-tooltip" };
var x4 = m1(() => createBaseVNode("div", { class: "m-arrow" }, null, -1));
var Da = V(defineComponent({ __name: "Slider", props: { width: { default: "100%" }, min: { default: 0 }, max: { default: 100 }, disabled: { type: Boolean, default: false }, range: { type: Boolean, default: false }, step: { default: 1 }, tipFormatter: { type: Function, default: (l) => l }, hideTip: { type: Boolean, default: false }, value: { default: 0 } }, emits: ["update:value", "change"], setup(l, { emit: a3 }) {
  const e3 = l, o = ref(false), n = ref(), d3 = ref(0), s3 = ref(0), c3 = ref(), p = ref(), i3 = ref(), h5 = ref(), x3 = computed(() => k3(p.value / (e3.max - e3.min) * e3.step)), M3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), m3 = computed(() => {
    const S3 = Math.round(s3.value / x3.value * e3.step + e3.min);
    return e3.range ? [Math.round(d3.value / x3.value * e3.step + e3.min), S3] : S3;
  }), u3 = computed(() => e3.range ? e3.tipFormatter(m3.value[0]) : null), b3 = computed(() => e3.range ? e3.tipFormatter(m3.value[1]) : e3.tipFormatter(m3.value)), g = a3;
  function k3(S3) {
    return parseFloat(S3.toFixed(2));
  }
  function f() {
    e3.range ? (d3.value = k3((e3.value[0] - e3.min) / e3.step * x3.value), s3.value = k3((e3.value[1] - e3.min) / e3.step * x3.value)) : s3.value = k3((e3.value - e3.min) / e3.step * x3.value);
  }
  function y3() {
    const S3 = c3.value.getBoundingClientRect().left;
    document.onmousemove = (H3) => {
      const E3 = k3(Math.round((H3.clientX - S3) / x3.value) * x3.value);
      E3 < 0 ? d3.value = 0 : E3 >= 0 && E3 <= s3.value ? d3.value = E3 : (d3.value = s3.value, h5.value.focus(), z3());
    }, document.onmouseup = () => {
      document.onmousemove = null;
    };
  }
  function z3() {
    const S3 = c3.value.getBoundingClientRect().left;
    document.onmousemove = (H3) => {
      const E3 = k3(Math.round((H3.clientX - S3) / x3.value) * x3.value);
      E3 > p.value ? s3.value = p.value : d3.value <= E3 && E3 <= p.value ? s3.value = E3 : (s3.value = d3.value, i3.value.focus(), y3());
    }, document.onmouseup = () => {
      document.onmousemove = null;
    };
  }
  function B3(S3, H3) {
    const E3 = S3 - x3.value;
    H3 === "left" ? d3.value = E3 < 0 ? 0 : E3 : E3 >= d3.value ? s3.value = E3 : (s3.value = d3.value, d3.value = E3, i3.value.focus());
  }
  function I3(S3, H3) {
    const E3 = S3 + x3.value;
    H3 === "right" ? E3 > p.value ? s3.value = p.value : s3.value = E3 : E3 <= s3.value ? d3.value = E3 : (d3.value = s3.value, s3.value = E3, h5.value.focus());
  }
  return watch(() => e3.value, () => {
    f();
  }), watch(m3, (S3) => {
    g("update:value", S3), g("change", S3);
  }), onMounted(() => {
    p.value = c3.value.offsetWidth, f();
  }), (S3, H3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-slider", { disabled: S3.disabled }]), ref_key: "slider", ref: c3, style: normalizeStyle(`width: ${M3.value};`) }, [createBaseVNode("div", { class: "u-slider-rail", onClick: H3[0] || (H3[0] = withModifiers((E3) => S3.disabled ? () => false : function(K3) {
    o.value ? (Ce2(n.value), n.value = null) : o.value = true, n.value = me(() => {
      o.value = false;
    }, 300);
    const ee = Math.round(K3.layerX / x3.value) * x3.value;
    e3.range ? ee <= d3.value ? (d3.value = ee, i3.value.focus()) : ee >= s3.value ? (s3.value = ee, h5.value.focus()) : ee - d3.value < s3.value - ee ? (d3.value = ee, i3.value.focus()) : (s3.value = ee, h5.value.focus()) : (s3.value = ee, h5.value.focus());
  }(E3), ["self"])) }), createBaseVNode("div", { class: normalizeClass(["u-slider-track", { trackTransition: o.value }]), style: normalizeStyle(`left: ${d3.value}px; right: auto; width: ${s3.value - d3.value}px;`) }, null, 6), S3.range ? (openBlock(), createElementBlock("div", { key: 0, tabindex: "0", ref_key: "leftHandle", ref: i3, class: normalizeClass(["u-slider-handle", { handleTransition: o.value }]), style: normalizeStyle(`left: ${d3.value}px; right: auto; transform: translate(-50%, -50%);`), onKeydown: [H3[1] || (H3[1] = withKeys(withModifiers((E3) => S3.disabled ? () => false : B3(d3.value, "left"), ["prevent"]), ["left"])), H3[2] || (H3[2] = withKeys(withModifiers((E3) => S3.disabled ? () => false : I3(d3.value, "left"), ["prevent"]), ["right"])), H3[3] || (H3[3] = withKeys(withModifiers((E3) => S3.disabled ? () => false : B3(d3.value, "left"), ["prevent"]), ["down"])), H3[4] || (H3[4] = withKeys(withModifiers((E3) => S3.disabled ? () => false : I3(d3.value, "left"), ["prevent"]), ["up"]))], onMousedown: H3[5] || (H3[5] = (E3) => S3.disabled ? () => false : y3()) }, [S3.hideTip ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", b4, [createTextVNode(toDisplayString(u3.value) + " ", 1), k4]))], 38)) : createCommentVNode("", true), createBaseVNode("div", { tabindex: "0", ref_key: "rightHandle", ref: h5, class: normalizeClass(["u-slider-handle", { handleTransition: o.value }]), style: normalizeStyle(`left: ${s3.value}px; right: auto; transform: translate(-50%, -50%);`), onKeydown: [H3[6] || (H3[6] = withKeys(withModifiers((E3) => S3.disabled ? () => false : B3(s3.value, "right"), ["prevent"]), ["left"])), H3[7] || (H3[7] = withKeys(withModifiers((E3) => S3.disabled ? () => false : I3(s3.value, "right"), ["prevent"]), ["right"])), H3[8] || (H3[8] = withKeys(withModifiers((E3) => S3.disabled ? () => false : B3(s3.value, "right"), ["prevent"]), ["down"])), H3[9] || (H3[9] = withKeys(withModifiers((E3) => S3.disabled ? () => false : I3(s3.value, "right"), ["prevent"]), ["up"]))], onMousedown: H3[10] || (H3[10] = (E3) => S3.disabled ? () => false : z3()) }, [S3.hideTip ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", w4, [createTextVNode(toDisplayString(b3.value) + " ", 1), x4]))], 38)], 6));
} }), [["__scopeId", "data-v-f5caf7a6"]]);
Da.install = (l) => {
  l.component(Da.__name, Da);
};
var M4 = { class: "m-statistic" };
var z4 = { class: "u-title" };
var _4 = { key: 0, class: "u-prefix" };
var C4 = { class: "u-content-value" };
var $4 = { key: 1, class: "u-suffix" };
var Ea2 = V(defineComponent({ __name: "Statistic", props: { title: { default: "" }, value: { default: "" }, valueStyle: { default: () => ({}) }, precision: { default: 0 }, prefix: { default: "" }, suffix: { default: "" }, separator: { default: "," }, formatter: { type: Function, default: (l) => l } }, setup(l) {
  const a3 = l, e3 = computed(() => a3.formatter(z1(a3.value, a3.precision, a3.separator))), o = useSlots(), n = computed(() => {
    var c3;
    const s3 = (c3 = o.prefix) == null ? void 0 : c3.call(o);
    return s3 ? !!(s3[0].children !== "v-if" && (s3 != null && s3.length)) : a3.prefix;
  }), d3 = computed(() => {
    var c3;
    const s3 = (c3 = o.suffix) == null ? void 0 : c3.call(o);
    return s3 ? !!(s3[0].children !== "v-if" && (s3 != null && s3.length)) : a3.suffix;
  });
  return (s3, c3) => (openBlock(), createElementBlock("div", M4, [createBaseVNode("div", z4, [renderSlot(s3.$slots, "title", {}, () => [createTextVNode(toDisplayString(s3.title), 1)], true)]), createBaseVNode("div", { class: "m-content", style: normalizeStyle(s3.valueStyle) }, [n.value ? (openBlock(), createElementBlock("span", _4, [renderSlot(s3.$slots, "prefix", {}, () => [createTextVNode(toDisplayString(s3.prefix), 1)], true)])) : createCommentVNode("", true), createBaseVNode("span", C4, [renderSlot(s3.$slots, "default", {}, () => [createTextVNode(toDisplayString(e3.value), 1)], true)]), d3.value ? (openBlock(), createElementBlock("span", $4, [renderSlot(s3.$slots, "suffix", {}, () => [createTextVNode(toDisplayString(s3.suffix), 1)], true)])) : createCommentVNode("", true)], 4)]));
} }), [["__scopeId", "data-v-39869a0d"]]);
Ea2.install = (l) => {
  l.component(Ea2.__name, Ea2);
};
var B4 = { class: "m-steps" };
var F4 = ["onClick"];
var S4 = { class: "m-steps-icon" };
var L4 = { key: 0, class: "u-num" };
var A4 = { key: 1, class: "u-icon", viewBox: "64 64 896 896", "data-icon": "check", "aria-hidden": "true", focusable: "false" };
var D4 = [((l) => (pushScopeId("data-v-bd73c9b1"), l = l(), popScopeId(), l))(() => createBaseVNode("path", { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }, null, -1))];
var E4 = { class: "m-steps-content" };
var H4 = { class: "u-steps-title" };
var Ha2 = V(defineComponent({ __name: "Steps", props: { steps: { default: () => [] }, current: { default: 1 }, width: { default: "100%" }, descMaxWidth: { default: 120 } }, emits: ["update:current", "change"], setup(l, { emit: a3 }) {
  const e3 = l, o = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), n = computed(() => e3.steps.length), d3 = computed(() => e3.current < 1 ? 1 : e3.current > n.value + 1 ? n.value + 1 : e3.current), s3 = a3;
  return (c3, p) => (openBlock(), createElementBlock("div", { class: "m-steps-area", style: normalizeStyle(`width: ${o.value};`) }, [createBaseVNode("div", B4, [(openBlock(true), createElementBlock(Fragment, null, renderList(c3.steps, (i3, h5) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-steps-item", { finish: d3.value > h5 + 1, process: d3.value === h5 + 1, wait: d3.value < h5 + 1 }]), key: h5 }, [createBaseVNode("div", { class: "m-info-wrap", onClick: (x3) => function(M3) {
    d3.value !== M3 && (s3("update:current", M3), s3("change", M3));
  }(h5 + 1) }, [createBaseVNode("div", S4, [d3.value <= h5 + 1 ? (openBlock(), createElementBlock("span", L4, toDisplayString(h5 + 1), 1)) : (openBlock(), createElementBlock("svg", A4, D4))]), createBaseVNode("div", E4, [createBaseVNode("div", H4, toDisplayString(i3.title), 1), withDirectives(createBaseVNode("div", { class: "u-steps-description", style: normalizeStyle(`max-width: ${c3.descMaxWidth}px;`) }, toDisplayString(i3.description), 5), [[vShow, i3.description]])])], 8, F4)], 2))), 128))])], 4));
} }), [["__scopeId", "data-v-bd73c9b1"]]);
Ha2.install = (l) => {
  l.component(Ha2.__name, Ha2);
};
var I4 = ["href", "target"];
var T4 = ["src", "alt"];
var j4 = ["href", "target"];
var V4 = ["src", "alt"];
var R4 = ["href", "target"];
var W4 = ["src", "alt"];
var Ia2 = V(defineComponent({ __name: "Swiper", props: { images: { default: () => [] }, width: { default: "100%" }, height: { default: "100vh" }, type: { default: "banner" }, navigation: { type: Boolean, default: true }, delay: { default: 3e3 }, swipe: { type: Boolean, default: true }, preloaderColor: { default: "theme" } }, emits: ["swiper", "change"], setup(l, { emit: a3 }) {
  const e3 = l, o = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), n = computed(() => typeof e3.height == "number" ? e3.height + "px" : e3.height), d3 = ref([Navigation, Pagination, Autoplay, EffectFade]), s3 = ref({ delay: e3.delay, disableOnInteraction: false, pauseOnMouseEnter: true }), c3 = ref([Autoplay]), p = ref({ delay: 0, disableOnInteraction: false }), i3 = ref([Navigation, Pagination, Mousewheel]), h5 = a3;
  function x3(M3) {
    h5("swiper", M3), e3.type === "carousel" && (M3.el.onmouseenter = () => {
      M3.autoplay.stop();
    }, M3.el.onmouseleave = () => {
      M3.autoplay.start();
    });
  }
  return (M3, m3) => (openBlock(), createElementBlock(Fragment, null, [M3.type === "banner" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 0, class: { "swiper-no-swiping": !M3.swipe }, modules: d3.value, navigation: M3.navigation, "slides-per-view": 1, autoplay: s3.value, lazy: "", loop: "", onSwiper: x3, onSlideChange: m3[0] || (m3[0] = (u3) => M3.$emit("change")) }, M3.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(M3.images, (u3, b3) => (openBlock(), createBlock(unref(SwiperSlide), { key: b3 }, { default: withCtx(() => [createBaseVNode("a", { href: u3.link ? u3.link : "javascript:;", target: u3.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { src: u3.src, class: "u-img", style: normalizeStyle(`width: ${o.value}; height: ${n.value};`), alt: u3.title, loading: "lazy" }, null, 12, T4)], 8, I4), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${M3.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["class", "modules", "navigation", "autoplay"])) : createCommentVNode("", true), M3.type === "carousel" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 1, class: "swiper-no-swiping", modules: c3.value, autoplay: p.value, lazy: "", loop: "", onSwiper: x3, onSlideChange: m3[1] || (m3[1] = (u3) => M3.$emit("change")) }, M3.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(M3.images, (u3, b3) => (openBlock(), createBlock(unref(SwiperSlide), { key: b3 }, { default: withCtx(() => [createBaseVNode("a", { href: u3.link ? u3.link : "javascript:;", target: u3.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { src: u3.src, class: "u-img", style: normalizeStyle(`width: ${o.value}; height: ${n.value};`), alt: u3.title, loading: "lazy" }, null, 12, V4)], 8, j4), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${M3.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["modules", "autoplay"])) : createCommentVNode("", true), M3.type === "broadcast" ? (openBlock(), createBlock(unref(Swiper2), mergeProps({ key: 2, modules: i3.value, navigation: M3.navigation, lazy: "", onSwiper: x3, onSlideChange: m3[2] || (m3[2] = (u3) => M3.$emit("change")) }, M3.$attrs), { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(M3.images, (u3, b3) => (openBlock(), createBlock(unref(SwiperSlide), { key: b3 }, { default: withCtx(() => [createBaseVNode("a", { href: u3.link ? u3.link : "javascript:;", target: u3.link ? "_blank" : "_self", class: "m-link" }, [createBaseVNode("img", { src: u3.src, class: "u-img", style: normalizeStyle(`width: ${o.value}; height: ${n.value};`), alt: u3.title, loading: "lazy" }, null, 12, W4)], 8, R4), createBaseVNode("div", { class: normalizeClass(`swiper-lazy-preloader swiper-lazy-preloader-${M3.preloaderColor}`) }, null, 2)]), _: 2 }, 1024))), 128))]), _: 1 }, 16, ["modules", "navigation"])) : createCommentVNode("", true)], 64));
} }), [["__scopeId", "data-v-d6a3d8a5"]]);
Ia2.install = (l) => {
  l.component(Ia2.__name, Ia2);
};
var N4 = { class: "m-switch-wrap" };
var Ta = V(defineComponent({ __name: "Switch", props: { onInfo: { default: "" }, offInfo: { default: "" }, disabled: { type: Boolean, default: false }, checked: { type: Boolean, default: false }, nodeStyle: { default: () => ({}) } }, emits: ["update:checked", "change"], setup(l, { emit: a3 }) {
  const e3 = l, o = a3;
  return (n, d3) => (openBlock(), createElementBlock("div", N4, [createBaseVNode("div", { onClick: d3[0] || (d3[0] = (s3) => n.disabled ? () => false : (o("update:checked", !e3.checked), void o("change", !e3.checked))), class: normalizeClass(["m-switch", { "switch-checked": n.checked, disabled: n.disabled }]) }, [createBaseVNode("div", { class: normalizeClass(["u-switch-inner", n.checked ? "inner-checked" : "inner-unchecked"]) }, toDisplayString(n.checked ? n.onInfo : n.offInfo), 3), createBaseVNode("div", { class: normalizeClass(["u-node", { "node-checked": n.checked }]), style: normalizeStyle(n.nodeStyle) }, [renderSlot(n.$slots, "node", {}, void 0, true)], 6)], 2)]));
} }), [["__scopeId", "data-v-b0415d28"]]);
Ta.install = (l) => {
  l.component(Ta.__name, Ta);
};
var O4 = { class: "m-table-wrap" };
var q4 = { class: "m-table" };
var P4 = { class: "m-tr" };
var Y4 = { class: "m-body" };
var U4 = { class: "m-tr-loading" };
var K4 = { class: "m-tr-empty" };
var Z4 = ["colspan"];
var G4 = ["title"];
var J4 = { key: 1 };
var ja2 = V(defineComponent({ __name: "Table", props: { columns: { default: () => [] }, dataSource: { default: () => [] }, pagination: { default: () => ({ page: 1, pageSize: 10 }) }, showPagination: { type: Boolean, default: true }, hideOnSinglePage: { type: Boolean, default: false }, total: { default: 0 }, loading: { type: Boolean, default: false } }, emits: ["change"], setup(l, { emit: a3 }) {
  const e3 = a3;
  function o(n) {
    e3("change", n);
  }
  return (n, d3) => (openBlock(), createElementBlock("div", O4, [createBaseVNode("table", q4, [createBaseVNode("thead", null, [createBaseVNode("tr", P4, [(openBlock(true), createElementBlock(Fragment, null, renderList(n.columns, (s3, c3) => (openBlock(), createElementBlock("th", { class: "m-th", style: normalizeStyle(`width: ${typeof s3.width == "number" ? s3.width + "px" : s3.width};`), key: c3 }, toDisplayString(s3.title), 5))), 128))])]), createBaseVNode("tbody", Y4, [withDirectives(createBaseVNode("tr", U4, [createVNode(unref(ie), { class: "m-loading", size: "small", colspan: n.columns.length }, null, 8, ["colspan"])], 512), [[vShow, n.loading]]), withDirectives(createBaseVNode("tr", K4, [createBaseVNode("td", { class: "m-td-empty", colspan: n.columns.length }, [createVNode(unref(He2), { class: "empty", image: "2" })], 8, Z4)], 512), [[vShow, !n.total]]), (openBlock(true), createElementBlock(Fragment, null, renderList(n.dataSource, (s3, c3) => (openBlock(), createElementBlock("tr", { class: "m-tr", key: c3 }, [(openBlock(true), createElementBlock(Fragment, null, renderList(n.columns, (p, i3) => (openBlock(), createElementBlock("td", { class: "m-td", key: i3, title: s3[p.dataIndex] }, [p.slot ? renderSlot(n.$slots, p.slot, mergeProps({ key: 0 }, s3, { index: c3 }), () => [createTextVNode(toDisplayString(s3[p.dataIndex] || "--"), 1)], true) : (openBlock(), createElementBlock("span", J4, toDisplayString(s3[p.dataIndex] || "--"), 1))], 8, G4))), 128))]))), 128))])]), n.showPagination && n.total ? (openBlock(), createBlock(unref(Ue), { key: 0, class: "mt20", onChange: o, current: n.pagination.page, pageSize: n.pagination.pageSize, total: n.total, hideOnSinglePage: n.hideOnSinglePage, showQuickJumper: true, showTotal: true, placement: "right" }, null, 8, ["current", "pageSize", "total", "hideOnSinglePage"])) : createCommentVNode("", true)]));
} }), [["__scopeId", "data-v-bb4358d9"]]);
ja2.install = (l) => {
  l.component(ja2.__name, ja2);
};
var X4 = { class: "m-tabs-nav" };
var Q4 = ["onClick"];
var eo2 = { class: "m-tabs-page" };
var Va2 = V(defineComponent({ __name: "Tabs", props: { tabPages: { default: () => [] }, centered: { type: Boolean, default: false }, size: { default: "small" }, activeKey: { default: "" } }, emits: ["update:activeKey", "change"], setup(l, { emit: a3 }) {
  const e3 = l, o = ref(), n = ref(0), d3 = ref(0), s3 = ref(), c3 = ref(), p = ref(false), i3 = ref(0), h5 = ref(0);
  watchEffect(() => {
    (function() {
      const m3 = s3.value.offsetWidth, u3 = c3.value.offsetWidth;
      u3 > m3 && (p.value = true, i3.value = u3 - m3);
    })();
  }, { flush: "post" }), watchEffect(() => {
    M3(e3.tabPages.findIndex((m3) => m3.key === e3.activeKey));
  }, { flush: "post" });
  const x3 = a3;
  function M3(m3) {
    const u3 = o.value[m3];
    u3 ? (n.value = u3.offsetLeft, d3.value = u3.offsetWidth) : (n.value = 0, d3.value = 0);
  }
  return (m3, u3) => (openBlock(), createElementBlock("div", { class: normalizeClass(`m-tabs ${m3.size}`) }, [createBaseVNode("div", X4, [createBaseVNode("div", { ref_key: "wrap", ref: s3, class: normalizeClass(["m-tabs-nav-wrap", { "tabs-center": m3.centered, "before-shadow-active": h5.value > 0, "after-shadow-active": h5.value < i3.value }]) }, [createBaseVNode("div", { ref_key: "nav", ref: c3, class: "m-tabs-nav-list", onWheel: u3[0] || (u3[0] = (b3) => p.value ? function(g) {
    if (g.deltaX !== 0) {
      g.preventDefault();
      const k3 = 1 * g.deltaX;
      h5.value + k3 > i3.value ? h5.value = i3.value : h5.value + k3 < 0 ? h5.value = 0 : h5.value += k3;
    }
  }(b3) : () => false), style: normalizeStyle(`transform: translate(${-h5.value}px, 0)`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(m3.tabPages, (b3, g) => (openBlock(), createElementBlock("div", { ref_for: true, ref_key: "tabs", ref: o, class: normalizeClass(["u-tab", { "u-tab-active": m3.activeKey === b3.key, "u-tab-disabled": b3.disabled }]), onClick: (k3) => b3.disabled ? () => false : function(f, y3) {
    M3(y3), x3("update:activeKey", f), x3("change", f);
  }(b3.key, g), key: b3.key }, toDisplayString(b3.tab), 11, Q4))), 128)), createBaseVNode("div", { class: "u-tab-bar", style: normalizeStyle(`left: ${n.value}px; width: ${d3.value}px;`) }, null, 4)], 36)], 2)]), createBaseVNode("div", eo2, [(openBlock(true), createElementBlock(Fragment, null, renderList(m3.tabPages, (b3) => withDirectives((openBlock(), createElementBlock("div", { class: "m-tabs-content", key: b3.key }, [renderSlot(m3.$slots, b3.key, {}, () => [createTextVNode(toDisplayString(b3.content), 1)], true)])), [[vShow, m3.activeKey === b3.key]])), 128))])], 2));
} }), [["__scopeId", "data-v-c385aa08"]]);
Va2.install = (l) => {
  l.component(Va2.__name, Va2);
};
var t1 = (l) => (pushScopeId("data-v-a9350280"), l = l(), popScopeId(), l);
var ao2 = { key: 0, class: "m-icon" };
var lo2 = { class: "u-tag" };
var to2 = [t1(() => createBaseVNode("svg", { focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var oo2 = { class: "u-tag" };
var so2 = ["onClick"];
var no2 = [t1(() => createBaseVNode("svg", { focusable: "false", class: "u-close", "data-icon": "close", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })], -1))];
var io2 = [t1(() => createBaseVNode("svg", { focusable: "false", class: "u-plus", "data-icon": "plus", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }), createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })], -1))];
var Ra2 = V(defineComponent({ __name: "Tag", props: { closable: { type: Boolean, default: false }, color: { default: "" }, icon: { default: "" }, size: { default: "middle" }, bordered: { type: Boolean, default: true }, dynamic: { type: Boolean, default: false }, value: { default: () => [] }, spaceWidth: { default: "auto" }, spaceAlign: { default: "start" }, spaceDirection: { default: "horizontal" }, spaceSize: { default: "small" } }, emits: ["update:value", "close", "dynamicClose"], setup(l, { emit: a3 }) {
  const e3 = l, o = computed(() => {
    if (e3.dynamic && e3.value.length) {
      if (typeof e3.value[0] == "string")
        return true;
      if (typeof e3.value[0] == "object")
        return false;
    }
    return null;
  }), n = computed(() => e3.dynamic && e3.value.length ? o.value ? e3.value.map((y3) => ({ label: y3, closable: true })) : e3.value.map((y3) => ({ closable: true, ...y3 })) : []), d3 = useSlots(), s3 = computed(() => {
    var y3;
    if (!e3.dynamic) {
      const z3 = (y3 = d3.icon) == null ? void 0 : y3.call(d3);
      return z3 ? !!(z3[0].children !== "v-if" && (z3 != null && z3.length)) : e3.icon;
    }
    return false;
  }), c3 = ref(), p = ref(false), i3 = ref(""), h5 = ["success", "processing", "error", "warning", "default", "pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"], x3 = ref(false), M3 = ref(), m3 = ref(Array(e3.value.length).fill(1));
  watchEffect(() => {
    if (e3.dynamic) {
      const y3 = e3.value.length;
      m3.value = Array(y3).fill(1), nextTick(() => {
        if (M3.value)
          for (let z3 = 0; z3 < y3; z3++)
            m3.value[z3] = M3.value[z3].offsetWidth;
      });
    }
  });
  const u3 = a3;
  function b3(y3) {
    x3.value = true, u3("close", y3);
  }
  function g() {
    p.value = true, nextTick(() => {
      c3.value.focus();
    });
  }
  function k3() {
    o.value ? u3("update:value", [...e3.value, i3.value]) : u3("update:value", [...e3.value, { label: i3.value }]), p.value = false, c3.value = "";
  }
  function f(y3) {
    y3.key === "Enter" && c3.value.blur();
  }
  return (y3, z3) => y3.dynamic ? (openBlock(), createBlock(unref(Le), { key: 1, width: y3.spaceWidth, align: y3.spaceAlign, direction: y3.spaceDirection, size: y3.spaceSize }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (B3, I3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-tag", [`tag-${B3.size || y3.size}`, (B3.color || y3.color) && h5.includes(B3.color || y3.color) ? "tag-" + (B3.color || y3.color) : "", { "tag-borderless": B3.bordered !== void 0 && !B3.bordered, "has-color": (B3.color || y3.color) && !h5.includes(B3.color || y3.color) }]]), style: normalizeStyle(`background-color: ${!B3.color && !y3.color || h5.includes(B3.color || y3.color) ? "" : B3.color || y3.color};`), key: I3 }, [withDirectives(createBaseVNode("span", { class: "m-icon", ref_for: true, ref_key: "tagsIconRef", ref: M3 }, [renderSlot(y3.$slots, "icon", { index: I3 }, () => [createTextVNode(toDisplayString(B3.icon), 1)], true)], 512), [[vShow, m3.value[I3]]]), createBaseVNode("span", oo2, [renderSlot(y3.$slots, "default", { label: B3.label, index: I3 }, () => [createTextVNode(toDisplayString(B3.label), 1)], true)]), B3.closable || y3.closable ? (openBlock(), createElementBlock("span", { key: 0, class: "m-close", onClick: (S3) => function(H3, E3) {
    const K3 = e3.value.filter((ee, de) => de !== E3);
    u3("update:value", K3), u3("dynamicClose", H3, E3);
  }(B3, I3) }, no2, 8, so2)) : createCommentVNode("", true)], 6))), 128)), p.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-tag", [`tag-${y3.size}`, { "m-plus": y3.dynamic }]]), onClick: g }, io2, 2)), withDirectives(createBaseVNode("input", { ref_key: "inputRef", ref: c3, class: normalizeClass(["u-input", `input-${y3.size}`]), type: "text", "onUpdate:modelValue": z3[0] || (z3[0] = (B3) => i3.value = B3), onBlur: z3[1] || (z3[1] = (B3) => p.value = false), onChange: k3, onKeydown: f }, null, 34), [[vShow, p.value], [vModelText, i3.value]])]), _: 3 }, 8, ["width", "align", "direction", "size"])) : (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["m-tag", [`tag-${y3.size}`, y3.color && h5.includes(y3.color) ? "tag-" + y3.color : "", { "tag-borderless": !y3.bordered, "has-color": y3.color && !h5.includes(y3.color), hidden: x3.value }]]), style: normalizeStyle(`background-color: ${y3.color && !h5.includes(y3.color) ? y3.color : ""};`) }, [s3.value ? (openBlock(), createElementBlock("span", ao2, [renderSlot(y3.$slots, "icon", {}, () => [createTextVNode(toDisplayString(y3.icon), 1)], true)])) : createCommentVNode("", true), createBaseVNode("span", lo2, [renderSlot(y3.$slots, "default", {}, void 0, true)]), y3.closable ? (openBlock(), createElementBlock("span", { key: 1, class: "m-close", onClick: b3 }, to2)) : createCommentVNode("", true)], 6));
} }), [["__scopeId", "data-v-a9350280"]]);
Ra2.install = (l) => {
  l.component(Ra2.__name, Ra2);
};
var uo2 = ["data-count"];
var co2 = ["value", "maxlength", "disabled"];
var ro2 = [((l) => (pushScopeId("data-v-94787871"), l = l(), popScopeId(), l))(() => createBaseVNode("svg", { focusable: "false", class: "u-clear", "data-icon": "close-circle", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" })], -1))];
var Wa2 = V(defineComponent({ inheritAttrs: false, __name: "Textarea", props: { width: { default: "100%" }, allowClear: { type: Boolean, default: false }, autoSize: { type: [Boolean, Object], default: false }, disabled: { type: Boolean, default: false }, maxlength: { default: void 0 }, showCount: { type: Boolean, default: false }, value: { default: "" }, valueModifiers: { default: () => ({}) } }, emits: ["update:value", "change", "enter"], setup(l, { emit: a3 }) {
  const e3 = l, o = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width), n = computed(() => {
    if (typeof e3.autoSize == "object") {
      const u3 = { resize: "none" };
      return "minRows" in e3.autoSize && (u3["min-height"] = 22 * e3.autoSize.minRows + 10 + "px"), "maxRows" in e3.autoSize && (u3["max-height"] = 22 * e3.autoSize.maxRows + 10 + "px"), u3;
    }
    if (typeof e3.autoSize == "boolean")
      return e3.autoSize ? { "max-height": "9000000000000000px", resize: "none" } : {};
  }), d3 = computed(() => e3.maxlength ? e3.value.length + " / " + e3.maxlength : e3.value.length);
  watch(() => e3.value, () => {
    JSON.stringify(n.value) !== "{}" && (c3.value = 32, nextTick(() => {
      p();
    }));
  });
  const s3 = ref(), c3 = ref(32);
  function p() {
    c3.value = s3.value.scrollHeight + 2;
  }
  onMounted(() => {
    p();
  });
  const i3 = a3;
  function h5(u3) {
    "lazy" in e3.valueModifiers || (i3("update:value", u3.target.value), i3("change", u3));
  }
  function x3(u3) {
    "lazy" in e3.valueModifiers && (i3("update:value", u3.target.value), i3("change", u3));
  }
  function M3(u3) {
    u3.key === "Enter" && i3("enter", u3);
  }
  function m3() {
    i3("update:value", ""), s3.value.focus();
  }
  return (u3, b3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-textarea", { "show-count": u3.showCount }]), style: normalizeStyle(`width: ${o.value};`), "data-count": d3.value }, [createBaseVNode("textarea", mergeProps({ ref_key: "textarea", ref: s3, type: "hidden", class: ["u-textarea", { disabled: u3.disabled }], style: [`height: ${u3.autoSize ? c3.value : ""}px`, n.value], value: u3.value, maxlength: u3.maxlength, disabled: u3.disabled, onInput: h5, onChange: x3, onKeydown: M3 }, u3.$attrs), null, 16, co2), !u3.disabled && u3.allowClear && u3.value ? (openBlock(), createElementBlock("span", { key: 0, class: "m-clear", onClick: m3 }, ro2)) : createCommentVNode("", true)], 14, uo2));
} }), [["__scopeId", "data-v-94787871"]]);
Wa2.install = (l) => {
  l.component(Wa2.__name, Wa2);
};
var vo2 = ["title", "href", "target", "onClick"];
var po2 = ["title", "href", "target", "onClick"];
var Na2 = V(defineComponent({ __name: "TextScroll", props: { scrollText: {}, single: { type: Boolean, default: false }, width: { default: "100%" }, height: { default: 60 }, fontSize: { default: 16 }, fontWeight: { default: 400 }, color: { default: "rgba(0, 0, 0, .88)" }, backgroundColor: { default: "#FFF" }, amount: { default: 4 }, gap: { default: 20 }, vertical: { type: Boolean, default: false }, interval: { default: 3e3 } }, emits: ["click"], setup(l, { emit: a3 }) {
  const e3 = l, o = ref(0), n = ref(0), d3 = ref(), s3 = ref(60), c3 = computed(() => e3.single ? [e3.scrollText, e3.scrollText] : [...e3.scrollText]), p = computed(() => c3.value.length), i3 = computed(() => e3.single ? 1 : e3.amount), h5 = computed(() => s3.value === 60 ? 1 : 60 / s3.value), x3 = ref(), M3 = ref(0);
  function m3() {
    const S3 = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var H3 = null;
    n.value = S3(function E3(K3) {
      if (H3)
        return s3.value = Math.floor(1e3 / (K3 - H3)), console.log("fps", s3.value), M3.value = parseFloat((x3.value.offsetWidth / i3.value).toFixed(2)), void g();
      n.value > 10 && (H3 = K3), n.value = S3(E3);
    });
  }
  function u3() {
    o.value >= M3.value ? (c3.value.push(c3.value.shift()), o.value = 0) : o.value += h5.value, d3.value = pe(u3);
  }
  const b3 = computed(() => typeof e3.width == "number" ? e3.width + "px" : e3.width);
  function g() {
    e3.vertical ? p.value > 1 && I3() : c3.value.length > i3.value && (d3.value = pe(u3));
  }
  function k3() {
    e3.vertical ? p.value > 1 && Ce2(B3) : Qa(d3.value);
  }
  onMounted(() => {
    e3.vertical ? g() : m3();
  });
  const f = a3;
  function y3(S3) {
    f("click", S3);
  }
  const z3 = ref(0);
  var B3 = null;
  function I3() {
    B3 = me(() => {
      z3.value === p.value - 1 ? z3.value = 0 : z3.value++, I3();
    }, e3.interval);
  }
  return (S3, H3) => S3.vertical ? (openBlock(), createElementBlock("div", { key: 1, class: "m-slider-vertical", onMouseenter: k3, onMouseleave: g, style: normalizeStyle(`height: ${S3.height}px; width: ${b3.value}; background: ${S3.backgroundColor}; --fontSize: ${S3.fontSize}px; --fontWeight: ${S3.fontWeight}; --color: ${S3.color};`) }, [createVNode(TransitionGroup, { name: "slide" }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(c3.value, (E3, K3) => withDirectives((openBlock(), createElementBlock("div", { class: "m-slider", style: normalizeStyle(`width: calc(${b3.value} - ${2 * S3.gap}px); height: ${S3.height}px;`), key: K3 }, [createBaseVNode("a", { class: "u-slider", title: E3.title, href: E3.link ? E3.link : "javascript:;", target: E3.link ? "_blank" : "_self", onClick: (ee) => y3(E3.title) }, toDisplayString(E3.title || "--"), 9, po2)], 4)), [[vShow, z3.value === K3]])), 128))]), _: 1 })], 36)) : (openBlock(), createElementBlock("div", { key: 0, ref_key: "horizonRef", ref: x3, class: "m-slider-horizon", onMouseenter: k3, onMouseleave: g, style: normalizeStyle(`height: ${S3.height}px; width: ${b3.value}; background: ${S3.backgroundColor}; --fontSize: ${S3.fontSize}px; --fontWeight: ${S3.fontWeight}; --color: ${S3.color};`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(c3.value, (E3, K3) => (openBlock(), createElementBlock("a", { style: normalizeStyle(`will-change: transform; transform: translateX(${-o.value}px); width: ${M3.value - S3.gap}px; margin-left: ${S3.gap}px;`), class: "u-slide-title", key: K3, title: E3.title, href: E3.link ? E3.link : "javascript:;", target: E3.link ? "_blank" : "_self", onClick: (ee) => y3(E3.title) }, toDisplayString(E3.title || "--"), 13, vo2))), 128))], 36));
} }), [["__scopeId", "data-v-71abcabf"]]);
Na2.install = (l) => {
  l.component(Na2.__name, Na2);
};
var fo2 = { class: "m-timeline" };
var Oa2 = V(defineComponent({ __name: "Timeline", props: { timelineData: { default: () => [] }, width: { default: "100%" }, lineStyle: { default: "solid" }, mode: { default: "left" }, position: { default: "left" } }, setup(l) {
  const a3 = l, e3 = ref(), o = ref([]), n = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), d3 = computed(() => a3.timelineData.length);
  return watchEffect(() => {
    (function() {
      for (let s3 = 0; s3 < d3.value; s3++)
        o.value[s3] = getComputedStyle(e3.value[s3].firstElementChild || e3.value[s3], null).getPropertyValue("line-height");
    })();
  }, { flush: "post" }), watchEffect(() => {
    if (a3.mode === "center")
      for (let s3 = 0; s3 < d3.value; s3++)
        (s3 + 1) % 2 ? a3.position === "left" ? e3.value[s3].classList.add("alternate-left-desc") : e3.value[s3].classList.add("alternate-right-desc") : a3.position === "left" ? e3.value[s3].classList.add("alternate-right-desc") : e3.value[s3].classList.add("alternate-left-desc");
  }, { flush: "post" }), (s3, c3) => (openBlock(), createElementBlock("div", { class: "m-timeline-area", style: normalizeStyle(`width: ${n.value};`) }, [createBaseVNode("div", fo2, [(openBlock(true), createElementBlock(Fragment, null, renderList(s3.timelineData, (p, i3) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-timeline-item", { last: i3 === s3.timelineData.length - 1 }]), key: i3 }, [createBaseVNode("span", { class: normalizeClass(`u-tail ${s3.mode}-tail`), style: normalizeStyle(`border-left-style: ${s3.lineStyle};`) }, null, 6), createBaseVNode("div", { class: normalizeClass(`m-dot ${s3.mode}-dot`), style: normalizeStyle(`height: ${o.value[i3]}`) }, [renderSlot(s3.$slots, "dot", { index: i3 }, () => [p.color === "red" ? (openBlock(), createElementBlock("span", { key: 0, class: "u-dot", style: normalizeStyle({ borderColor: "#ff4d4f" }) }, null, 4)) : p.color === "gray" ? (openBlock(), createElementBlock("span", { key: 1, class: "u-dot", style: normalizeStyle({ borderColor: "#00000040" }) }, null, 4)) : p.color === "green" ? (openBlock(), createElementBlock("span", { key: 2, class: "u-dot", style: normalizeStyle({ borderColor: "#52c41a" }) }, null, 4)) : p.color === "blue" ? (openBlock(), createElementBlock("span", { key: 3, class: "u-dot", style: normalizeStyle({ borderColor: "#1677ff" }) }, null, 4)) : (openBlock(), createElementBlock("span", { key: 4, class: "u-dot", style: normalizeStyle({ borderColor: p.color || "#1677ff" }) }, null, 4))], true)], 6), createBaseVNode("div", { ref_for: true, ref_key: "desc", ref: e3, class: normalizeClass(`u-desc ${s3.mode}-desc`) }, [renderSlot(s3.$slots, "desc", { index: i3 }, () => [createTextVNode(toDisplayString(p.desc || "--"), 1)], true)], 2)], 2))), 128))])], 4));
} }), [["__scopeId", "data-v-b7773841"]]);
Oa2.install = (l) => {
  l.component(Oa2.__name, Oa2);
};
var je = (l) => (pushScopeId("data-v-f6bbe87f"), l = l(), popScopeId(), l);
var ho2 = { class: "m-upload-list" };
var mo2 = { class: "m-upload" };
var go2 = ["onDrop", "onClick"];
var yo2 = ["accept", "multiple", "onChange"];
var bo2 = je(() => createBaseVNode("svg", { focusable: "false", class: "u-plus", "data-icon": "plus", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("defs"), createBaseVNode("path", { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }), createBaseVNode("path", { d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" })], -1));
var ko2 = { class: "u-tip" };
var wo2 = { class: "m-file-uploading" };
var xo = { key: 0, class: "m-file-preview" };
var Mo2 = { key: 1, class: "u-file", focusable: "false", "data-icon": "file-pdf", "aria-hidden": "true", viewBox: "64 64 896 896" };
var zo = [je(() => createBaseVNode("path", { d: "M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1))];
var _o2 = { key: 2, class: "u-file", focusable: "false", "data-icon": "file", "aria-hidden": "true", viewBox: "64 64 896 896" };
var Co2 = [je(() => createBaseVNode("path", { d: "M534 352V136H232v752h560V394H576a42 42 0 01-42-42z", fill: "#e6f7ff" }, null, -1)), je(() => createBaseVNode("path", { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z" }, null, -1))];
var $o2 = { class: "m-file-mask" };
var Bo = ["onClick"];
var Fo = [je(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "eye", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })], -1))];
var So2 = ["onClick"];
var Lo = [je(() => createBaseVNode("svg", { class: "u-icon", focusable: "false", "data-icon": "delete", "aria-hidden": "true", viewBox: "64 64 896 896" }, [createBaseVNode("path", { d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" })], -1))];
var qa = V(defineComponent({ __name: "Upload", props: { accept: { default: "*" }, multiple: { type: Boolean, default: false }, maxCount: { default: 1 }, tip: { default: "Upload" }, uploadingTip: { default: "Uploading" }, gap: { default: 8 }, fit: { default: "contain" }, errorInfo: { default: "" }, beforeUpload: { type: Function, default: () => true }, uploadMode: { default: "base64" }, customRequest: { type: Function, default: () => {
} }, disabled: { type: Boolean, default: false }, fileList: { default: () => [] } }, emits: ["update:fileList", "change", "remove"], setup(l, { emit: a3 }) {
  const e3 = l, o = ref([]), n = ref(1), d3 = ref(Array(e3.maxCount).fill(false)), s3 = ref();
  function c3(m3) {
    return /\.(jpg|jpeg|png|gif)$/i.test(m3) || /^data:image/.test(m3);
  }
  watchEffect(() => {
    (function() {
      o.value = [...e3.fileList], o.value.length > e3.maxCount && o.value.splice(e3.maxCount), e3.disabled ? n.value = o.value.length : o.value.length < e3.maxCount ? n.value = e3.fileList.length + 1 : n.value = e3.maxCount;
    })();
  });
  const p = a3, i3 = function(m3, u3) {
    e3.beforeUpload(m3) ? (e3.maxCount > n.value && n.value++, e3.uploadMode === "base64" && (d3.value[u3] = true, function(b3, g) {
      var k3 = new FileReader();
      k3.readAsDataURL(b3), k3.onloadstart = function(f) {
        console.log("开始读取 onloadstart:", f);
      }, k3.onabort = function(f) {
        console.log("读取中止 onabort:", f);
      }, k3.onerror = function(f) {
        console.log("读取错误 onerror:", f);
      }, k3.onprogress = function(f) {
        f.loaded === f.total && (d3.value[g] = false);
      }, k3.onload = function(f) {
        var y3;
        o.value.push({ name: b3.name, url: (y3 = f.target) == null ? void 0 : y3.result }), p("update:fileList", o.value), p("change", o.value);
      }, k3.onloadend = function(f) {
        console.log("读取结束 onloadend:", f);
      };
    }(m3, u3)), e3.uploadMode === "custom" && (d3.value[u3] = true, function(b3, g) {
      e3.customRequest(b3).then((k3) => {
        o.value.push(k3), p("update:fileList", o.value), p("change", o.value);
      }).catch((k3) => {
        e3.maxCount > 1 && (n.value = o.value.length + 1), M3(k3);
      }).finally(() => {
        d3.value[g] = false;
      });
    }(m3, u3))) : nextTick(() => {
      M3(e3.errorInfo);
    });
  }, h5 = ref(), x3 = ref();
  function M3(m3) {
    x3.value.error(m3);
  }
  return (m3, u3) => (openBlock(), createElementBlock("div", ho2, [createVNode(unref(Le), { size: m3.gap }, { default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (b3) => {
    return openBlock(), createElementBlock("div", { class: "m-upload-item", key: b3 }, [createBaseVNode("div", mo2, [withDirectives(createBaseVNode("div", { class: normalizeClass(["m-upload-wrap", { "upload-disabled": m3.disabled }]), onDragenter: u3[1] || (u3[1] = withModifiers(() => {
    }, ["stop", "prevent"])), onDragover: u3[2] || (u3[2] = withModifiers(() => {
    }, ["stop", "prevent"])), onDrop: withModifiers((k3) => m3.disabled ? () => false : function(f, y3) {
      var B3;
      const z3 = (B3 = f.dataTransfer) == null ? void 0 : B3.files;
      if (z3 != null && z3.length) {
        const I3 = z3.length;
        for (let S3 = 0; S3 < I3 && y3 + S3 <= e3.maxCount; S3++)
          i3(z3[S3], y3 + S3);
        s3.value[y3].value = "";
      }
    }(k3, b3 - 1), ["stop", "prevent"]), onClick: (k3) => {
      return m3.disabled ? () => false : (f = b3 - 1, void s3.value[f].click());
      var f;
    } }, [createBaseVNode("input", { ref_for: true, ref_key: "uploadInput", ref: s3, type: "file", onClick: u3[0] || (u3[0] = withModifiers(() => {
    }, ["stop"])), accept: m3.accept, multiple: m3.multiple, onChange: (k3) => function(f, y3) {
      const z3 = f.target.files;
      if (z3 != null && z3.length) {
        const B3 = z3.length;
        for (let I3 = 0; I3 < B3 && y3 + I3 < e3.maxCount; I3++)
          i3(z3[I3], y3 + I3);
        s3.value[y3].value = "";
      }
    }(k3, b3 - 1), style: { display: "none" } }, null, 40, yo2), createBaseVNode("div", null, [bo2, createBaseVNode("p", ko2, [renderSlot(m3.$slots, "default", {}, () => [createTextVNode(toDisplayString(m3.tip), 1)], true)])])], 42, go2), [[vShow, !d3.value[b3 - 1] && !o.value[b3 - 1]]]), withDirectives(createBaseVNode("div", wo2, [createVNode(unref(ie), { class: "u-spin", tip: m3.uploadingTip, size: "small", indicator: "dynamic-circle" }, null, 8, ["tip"])], 512), [[vShow, d3.value[b3 - 1]]]), o.value[b3 - 1] ? (openBlock(), createElementBlock("div", xo, [c3(o.value[b3 - 1].url) ? (openBlock(), createBlock(unref(Pe2), { key: 0, ref_for: true, ref_key: "imageRef", ref: h5, bordered: false, width: 82, height: 82, src: o.value[b3 - 1].url, name: o.value[b3 - 1].name }, null, 8, ["src", "name"])) : (g = o.value[b3 - 1].url, /\.pdf$/i.test(g) || /^data:application\/pdf/.test(g) ? (openBlock(), createElementBlock("svg", Mo2, zo)) : (openBlock(), createElementBlock("svg", _o2, Co2))), createBaseVNode("div", $o2, [createBaseVNode("a", { class: "m-icon", title: "预览", onClick: (k3) => function(f, y3) {
      if (console.log("isImage", c3(y3)), c3(y3)) {
        const z3 = o.value.slice(0, f).filter((B3) => !c3(B3.url));
        h5.value[f - z3.length].onPreview(0);
      } else
        window.open(y3);
    }(b3 - 1, o.value[b3 - 1].url) }, Fo, 8, Bo), withDirectives(createBaseVNode("a", { class: "m-icon", title: "删除", onClick: withModifiers((k3) => function(f) {
      o.value.length < e3.maxCount && n.value--;
      const y3 = o.value.splice(f, 1);
      p("remove", y3), p("update:fileList", o.value), p("change", o.value);
    }(b3 - 1), ["prevent", "stop"]) }, Lo, 8, So2), [[vShow, !m3.disabled]])])])) : createCommentVNode("", true)])]);
    var g;
  }), 128))]), _: 3 }, 8, ["size"]), createVNode(unref(Ye2), { ref_key: "message", ref: x3, duration: 3e3, top: 30 }, null, 512)]));
} }), [["__scopeId", "data-v-f6bbe87f"]]);
qa.install = (l) => {
  l.component(qa.__name, qa);
};
var Ao2 = ["src", "poster", "width", "height", "autoplay", "controls", "loop", "muted", "preload"];
var Do2 = [((l) => (pushScopeId("data-v-e5be5d67"), l = l(), popScopeId(), l))(() => createBaseVNode("svg", { class: "u-svg", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 34 34" }, [createBaseVNode("path", { d: `M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039
          C31.913,19.675,31.913,14.325,28.26,11.961z` })], -1))];
var Pa2 = V(defineComponent({ __name: "Video", props: { src: { default: "" }, poster: { default: "" }, second: { default: 0.5 }, width: { default: 800 }, height: { default: 450 }, autoplay: { type: Boolean, default: false }, controls: { type: Boolean, default: true }, loop: { type: Boolean, default: false }, muted: { type: Boolean, default: false }, preload: { default: "metadata" }, showPlay: { type: Boolean, default: true }, fit: { default: "contain" } }, setup(l) {
  const a3 = l, e3 = ref(a3.poster), o = ref(true), n = ref(false), d3 = ref();
  function s3() {
    var c3, p;
    o.value && (d3.value.currentTime = 0, o.value = false), a3.autoplay ? (c3 = d3.value) == null || c3.pause() : (n.value = true, (p = d3.value) == null || p.play());
  }
  return onMounted(() => {
    a3.autoplay && (n.value = true, o.value = false);
  }), (c3, p) => (openBlock(), createElementBlock("div", { class: normalizeClass(["m-video", { "u-video-hover": !n.value }]), style: normalizeStyle(`width: ${c3.width}px; height: ${c3.height}px;`) }, [createBaseVNode("video", mergeProps({ ref_key: "veo", ref: d3, style: `object-fit: ${c3.fit};`, src: c3.src, poster: e3.value, width: c3.width, height: c3.height, autoplay: c3.autoplay, controls: !o.value && c3.controls, loop: c3.loop, muted: c3.autoplay || c3.muted, preload: c3.preload, crossorigin: "anonymous", onLoadedmetadata: p[0] || (p[0] = (i3) => c3.poster ? () => false : async function() {
    d3.value.currentTime = a3.second;
    const h5 = document.createElement("canvas"), x3 = h5.getContext("2d");
    h5.width = d3.value.videoWidth, h5.height = d3.value.videoHeight, x3 == null || x3.drawImage(d3.value, 0, 0, h5.width, h5.height), e3.value = h5.toDataURL("image/png");
  }()), onPause: p[1] || (p[1] = (i3) => c3.showPlay ? void (n.value = false) : () => false), onPlaying: p[2] || (p[2] = (i3) => c3.showPlay ? void (n.value = true) : () => false), onClickOnce: withModifiers(s3, ["prevent"]) }, c3.$attrs), " 您的浏览器不支持video标签。 ", 16, Ao2), withDirectives(createBaseVNode("span", { class: normalizeClass(["m-icon-play", { hidden: n.value }]) }, Do2, 2), [[vShow, o.value || c3.showPlay]])], 6));
} }), [["__scopeId", "data-v-e5be5d67"]]);
Pa2.install = (l) => {
  l.component(Pa2.__name, Pa2);
};
var Eo = ["src", "alt", "onLoad"];
var Ya2 = V(defineComponent({ __name: "Waterfall", props: { images: { default: () => [] }, columnCount: { default: 3 }, columnGap: { default: 20 }, width: { default: "100%" }, borderRadius: { default: 8 }, backgroundColor: { default: "#F2F4F8" } }, setup(l) {
  const a3 = l, e3 = computed(() => typeof a3.width == "number" ? a3.width + "px" : a3.width), o = ref([]), n = ref(Array(a3.columnCount).fill(0)), d3 = shallowRef(), s3 = ref(), c3 = computed(() => Math.max(...n.value) + a3.columnGap), p = computed(() => a3.images.length), i3 = ref(Array(p.value)), h5 = ref(false);
  async function x3() {
    s3.value = (d3.value.offsetWidth - (a3.columnCount + 1) * a3.columnGap) / a3.columnCount, o.value.splice(0);
    for (let u3 = 0; u3 < p.value; u3++)
      await M3(a3.images[u3].src, u3);
  }
  function M3(u3, b3) {
    return new Promise((g) => {
      const k3 = new Image();
      k3.src = u3, k3.onload = function() {
        h5.value || (i3.value[b3] = false);
        var f = k3.height / (k3.width / s3.value);
        o.value[b3] = { width: s3.value, height: f, ...m3(b3, f) }, g("load");
      };
    });
  }
  function m3(u3, b3) {
    if (u3 < a3.columnCount)
      return n.value[u3] = a3.columnGap + b3, { top: a3.columnGap, left: (s3.value + a3.columnGap) * u3 + a3.columnGap };
    {
      const g = Math.min(...n.value);
      let k3 = 0;
      for (let f = 0; f < a3.columnCount; f++)
        if (n.value[f] === g) {
          k3 = f;
          break;
        }
      return n.value[k3] = g + a3.columnGap + b3, { top: g + a3.columnGap, left: (s3.value + a3.columnGap) * k3 + a3.columnGap };
    }
  }
  return watch(() => [a3.columnCount, a3.columnGap, a3.width], () => {
    h5.value = true, n.value = Array(a3.columnCount).fill(0), x3();
  }, { deep: true, flush: "post" }), watchPostEffect(() => {
    a3.images.length && x3();
  }), (u3, b3) => (openBlock(), createElementBlock("div", { class: "m-waterfall", ref_key: "waterfall", ref: d3, style: normalizeStyle(`--borderRadius: ${u3.borderRadius}px; background-color: ${u3.backgroundColor}; width: ${e3.value}; height: ${c3.value}px;`) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (g, k3) => withDirectives((openBlock(), createBlock(unref(ie), { class: "m-image", style: normalizeStyle(`width: ${g.width}px; height: ${g.height}px; top: ${g && g.top}px; left: ${g && g.left}px;`), spinning: !i3.value[k3], size: "small", indicator: "dynamic-circle", key: k3 }, { default: withCtx(() => [createBaseVNode("img", { class: "u-image", src: u3.images[k3].src, alt: u3.images[k3].title, onLoad: (f) => function(y3) {
    i3.value[y3] = true;
  }(k3) }, null, 40, Eo)]), _: 2 }, 1032, ["style", "spinning"])), [[vShow, i3.value[k3] !== void 0]])), 128))], 4));
} }), [["__scopeId", "data-v-81ea6290"]]);
Ya2.install = (l) => {
  l.component(Ya2.__name, Ya2);
};
var Ua2 = defineComponent({ __name: "Watermark", props: { width: { default: void 0 }, height: { default: void 0 }, layout: { default: "alternate" }, rotate: { default: -22 }, zIndex: { default: 9 }, image: { default: void 0 }, content: { default: "" }, fullscreen: { type: Boolean, default: false }, color: { default: "rgba(0,0,0,.15)" }, fontSize: { default: 16 }, fontWeight: { default: "normal" }, fontFamily: { default: "sans-serif" }, fontStyle: { default: "normal" }, gap: { default: () => [100, 100] }, offset: { default: () => [50, 50] } }, setup(l) {
  const a3 = l, e3 = shallowRef(), o = shallowRef(), n = shallowRef(document.documentElement), d3 = shallowRef(false), s3 = computed(() => {
    var z3;
    return ((z3 = a3.gap) == null ? void 0 : z3[0]) ?? 100;
  }), c3 = computed(() => {
    var z3;
    return ((z3 = a3.gap) == null ? void 0 : z3[1]) ?? 100;
  }), p = computed(() => s3.value / 2), i3 = computed(() => c3.value / 2), h5 = computed(() => {
    var z3;
    return ((z3 = a3.offset) == null ? void 0 : z3[0]) ?? p.value;
  }), x3 = computed(() => {
    var z3;
    return ((z3 = a3.offset) == null ? void 0 : z3[1]) ?? i3.value;
  }), M3 = computed(() => ({ parallel: 1, alternate: 2 })[a3.layout]), m3 = computed(() => {
    const z3 = { zIndex: a3.zIndex ?? 9, position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", backgroundRepeat: "repeat" };
    let B3 = h5.value - p.value, I3 = x3.value - i3.value;
    return B3 > 0 && (z3.left = `${B3}px`, z3.width = `calc(100% - ${B3}px)`, B3 = 0), I3 > 0 && (z3.top = `${I3}px`, z3.height = `calc(100% - ${I3}px)`, I3 = 0), z3.backgroundPosition = `${B3}px ${I3}px`, z3;
  });
  function u3() {
    o.value && (o.value.remove(), o.value = void 0);
  }
  function b3(z3, B3) {
    var S3;
    var I3;
    e3.value && o.value && (d3.value = true, o.value.setAttribute("style", (I3 = { ...m3.value, backgroundImage: `url('${z3}')`, backgroundSize: (s3.value + B3) * M3.value + "px" }, Object.keys(I3).map((H3) => `${function(E3) {
      return E3.replace(/([A-Z])/g, "-$1").toLowerCase();
    }(H3)}: ${I3[H3]};`).join(" "))), a3.fullscreen ? (n.value.setAttribute("style", "position: relative"), n.value.append(o.value)) : (S3 = e3.value) == null || S3.append(o.value), setTimeout(() => {
      d3.value = false;
    }));
  }
  function g() {
    return window.devicePixelRatio || 1;
  }
  function k3(z3, B3, I3, S3, H3) {
    const E3 = g(), K3 = a3.content, ee = a3.fontSize, de = a3.fontWeight, ke2 = a3.fontFamily, we = a3.fontStyle, re = a3.color, ne = Number(ee) * E3;
    z3.font = `${we} normal ${de} ${ne}px/${H3}px ${ke2}`, z3.fillStyle = re, z3.textAlign = "center", z3.textBaseline = "top", z3.translate(S3 / 2, 0);
    const ve = Array.isArray(K3) ? K3 : [K3];
    ve == null || ve.forEach((D3, q3) => {
      z3.fillText(D3 ?? "", B3, I3 + q3 * (ne + 3 * E3));
    });
  }
  function f() {
    const z3 = document.createElement("canvas"), B3 = z3.getContext("2d"), I3 = a3.image, S3 = a3.rotate ?? -22;
    if (B3) {
      o.value || (o.value = document.createElement("div"));
      const H3 = g(), [E3, K3] = function(Q3) {
        let Me = 120, Ve2 = 64;
        const De = a3.content, Je = a3.image, Xe2 = a3.width, Qe2 = a3.height, Re2 = a3.fontSize, Fe2 = a3.fontFamily;
        if (!Je && Q3.measureText) {
          Q3.font = `${Number(Re2)}px ${Fe2}`;
          const ze = Array.isArray(De) ? De : [De], ea = ze.map((g1) => Q3.measureText(g1).width);
          Me = Math.ceil(Math.max(...ea)), Ve2 = Number(Re2) * ze.length + 3 * (ze.length - 1);
        }
        return [Xe2 ?? Me, Qe2 ?? Ve2];
      }(B3), ee = (s3.value + E3) * H3, de = (c3.value + K3) * H3;
      z3.setAttribute("width", ee * M3.value + "px"), z3.setAttribute("height", de * M3.value + "px");
      const ke2 = s3.value * H3 / 2, we = c3.value * H3 / 2, re = E3 * H3, ne = K3 * H3, ve = (re + s3.value * H3) / 2, D3 = (ne + c3.value * H3) / 2, q3 = ke2 + ee, Z = we + de, ae = ve + ee, le = D3 + de;
      if (B3.save(), y3(B3, ve, D3, S3), I3) {
        const Q3 = new Image();
        Q3.onload = () => {
          B3.drawImage(Q3, ke2, we, re, ne), B3.restore(), y3(B3, ae, le, S3), B3.drawImage(Q3, q3, Z, re, ne), b3(z3.toDataURL(), E3);
        }, Q3.crossOrigin = "anonymous", Q3.referrerPolicy = "no-referrer", Q3.src = I3;
      } else
        k3(B3, ke2, we, re, ne), B3.restore(), y3(B3, ae, le, S3), k3(B3, q3, Z, re, ne), b3(z3.toDataURL(), E3);
    }
  }
  function y3(z3, B3, I3, S3) {
    z3.translate(B3, I3), z3.rotate(Math.PI / 180 * Number(S3)), z3.translate(-B3, -I3);
  }
  return onMounted(() => {
    f();
  }), watch(() => [a3], () => {
    f();
  }, { deep: true, flush: "post" }), onBeforeUnmount(() => {
    u3();
  }), function(z3, B3, I3) {
    let S3;
    const H3 = () => {
      S3 && (S3.disconnect(), S3 = void 0);
    }, E3 = watch(() => unref(z3), (K3) => {
      H3(), window && K3 && (S3 = new MutationObserver(B3), S3.observe(K3, I3));
    }, { immediate: true });
  }(a3.fullscreen ? n : e3, function(z3) {
    d3.value || z3.forEach((B3) => {
      (function(I3, S3) {
        let H3 = false;
        return I3.removedNodes.length && (H3 = Array.from(I3.removedNodes).some((E3) => E3 === S3)), I3.type === "attributes" && I3.target === S3 && (H3 = true), H3;
      })(B3, o.value) && (u3(), f());
    });
  }, { subtree: true, childList: true, attributes: true, attributeFilter: ["style", "class"] }), (z3, B3) => (openBlock(), createElementBlock("div", { ref_key: "containerRef", ref: e3, style: { position: "relative" } }, [renderSlot(z3.$slots, "default")], 512));
} });
Ua2.install = (l) => {
  l.component(Ua2.__name, Ua2);
};
var Ho = [aa2, la2, ta, oa2, sa2, xe, na2, ia2, ua2, ca2, da2, ra2, va2, pa2, fa2, ha2, ma2, ga2, ya2, ba, He2, ka, Pe2, wa, xa, Ye2, Ma, za2, _a2, Ue, Ca2, $a, Ba2, Fa2, Sa2, La2, Aa2, Se, Da, Le, ie, Ea2, Ha2, Ia2, Ta, ja2, Va2, Ra2, Wa2, Na2, Oa2, qe2, qa, Pa2, Ya2, Ua2];
var Ko = { install: (l) => {
  Ho.forEach((a3) => l.component(a3.__name, a3));
} };
export {
  aa2 as Alert,
  la2 as Avatar,
  ta as BackTop,
  oa2 as Badge,
  sa2 as Breadcrumb,
  xe as Button,
  na2 as Card,
  ia2 as Carousel,
  ua2 as Cascader,
  ca2 as Checkbox,
  da2 as Col,
  ra2 as Collapse,
  va2 as Countdown,
  pa2 as DatePicker,
  fa2 as Descriptions,
  ha2 as DescriptionsItem,
  ma2 as Dialog,
  ga2 as Divider,
  ya2 as Drawer,
  ba as Ellipsis,
  He2 as Empty,
  ka as Flex,
  Pe2 as Image,
  wa as Input,
  xa as InputNumber,
  Ye2 as Message,
  Ma as Modal,
  za2 as Notification,
  _a2 as NumberAnimation,
  Ue as Pagination,
  Ca2 as Popconfirm,
  $a as Progress,
  Ba2 as QRCode,
  Fa2 as Radio,
  Sa2 as Rate,
  La2 as Result,
  Aa2 as Row,
  Se as Select,
  Da as Slider,
  Le as Space,
  ie as Spin,
  Ea2 as Statistic,
  Ha2 as Steps,
  Ia2 as Swiper,
  Ta as Switch,
  ja2 as Table,
  Va2 as Tabs,
  Ra2 as Tag,
  Na2 as TextScroll,
  Wa2 as Textarea,
  Oa2 as Timeline,
  qe2 as Tooltip,
  qa as Upload,
  Pa2 as Video,
  Ya2 as Waterfall,
  Ua2 as Watermark,
  Po2 as add,
  Qa as cancelAnimationFrame,
  Ce2 as cancelRaf,
  No as dateFormat,
  qo as debounce,
  Ko as default,
  Yo as downloadFile,
  z1 as formatNumber,
  me as rafTimeout,
  pe as requestAnimationFrame,
  Oo2 as throttle,
  Uo as toggleDark
};
//# sourceMappingURL=vue-amazing-ui.js.map
