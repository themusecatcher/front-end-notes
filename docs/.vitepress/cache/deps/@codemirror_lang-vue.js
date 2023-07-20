import {
  completeFromList,
  ifNotIn,
  snippetCompletion
} from "./chunk-SFVPAFGM.js";
import {
  DefaultBufferLength,
  EditorSelection,
  EditorView,
  IterMode,
  LRLanguage,
  LanguageSupport,
  NodeProp,
  NodeSet,
  NodeType,
  NodeWeakMap,
  Parser,
  Tree,
  bracketMatchingHandle,
  continuedIndent,
  defineLanguageFacet,
  delimitedIndent,
  flatIndent,
  foldInside,
  foldNodeProp,
  indentNodeProp,
  parseMixed,
  styleTags,
  sublanguageProp,
  syntaxTree,
  tags
} from "./chunk-V67IRD63.js";
import "./chunk-ROME4SDB.js";

// node_modules/.pnpm/@lezer+lr@1.3.9/node_modules/@lezer/lr/dist/index.js
var Stack = class _Stack {
  /// @internal
  constructor(p, stack, state, reducePos, pos, score, buffer, bufferBase, curContext, lookAhead = 0, parent) {
    this.p = p;
    this.stack = stack;
    this.state = state;
    this.reducePos = reducePos;
    this.pos = pos;
    this.score = score;
    this.buffer = buffer;
    this.bufferBase = bufferBase;
    this.curContext = curContext;
    this.lookAhead = lookAhead;
    this.parent = parent;
  }
  /// @internal
  toString() {
    return `[${this.stack.filter((_, i) => i % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
  }
  // Start an empty stack
  /// @internal
  static start(p, state, pos = 0) {
    let cx = p.parser.context;
    return new _Stack(p, [], state, pos, pos, 0, [], 0, cx ? new StackContext(cx, cx.start) : null, 0, null);
  }
  /// The stack's current [context](#lr.ContextTracker) value, if
  /// any. Its type will depend on the context tracker's type
  /// parameter, or it will be `null` if there is no context
  /// tracker.
  get context() {
    return this.curContext ? this.curContext.context : null;
  }
  // Push a state onto the stack, tracking its start position as well
  // as the buffer base at that point.
  /// @internal
  pushState(state, start) {
    this.stack.push(this.state, start, this.bufferBase + this.buffer.length);
    this.state = state;
  }
  // Apply a reduce action
  /// @internal
  reduce(action) {
    var _a;
    let depth = action >> 19, type = action & 65535;
    let { parser: parser5 } = this.p;
    let dPrec = parser5.dynamicPrecedence(type);
    if (dPrec)
      this.score += dPrec;
    if (depth == 0) {
      this.pushState(parser5.getGoto(this.state, type, true), this.reducePos);
      if (type < parser5.minRepeatTerm)
        this.storeNode(type, this.reducePos, this.reducePos, 4, true);
      this.reduceContext(type, this.reducePos);
      return;
    }
    let base = this.stack.length - (depth - 1) * 3 - (action & 262144 ? 6 : 0);
    let start = base ? this.stack[base - 2] : this.p.ranges[0].from, size = this.reducePos - start;
    if (size >= 2e3 && !((_a = this.p.parser.nodeSet.types[type]) === null || _a === void 0 ? void 0 : _a.isAnonymous)) {
      if (start == this.p.lastBigReductionStart) {
        this.p.bigReductionCount++;
        this.p.lastBigReductionSize = size;
      } else if (this.p.lastBigReductionSize < size) {
        this.p.bigReductionCount = 1;
        this.p.lastBigReductionStart = start;
        this.p.lastBigReductionSize = size;
      }
    }
    let bufferBase = base ? this.stack[base - 1] : 0, count = this.bufferBase + this.buffer.length - bufferBase;
    if (type < parser5.minRepeatTerm || action & 131072) {
      let pos = parser5.stateFlag(
        this.state,
        1
        /* StateFlag.Skipped */
      ) ? this.pos : this.reducePos;
      this.storeNode(type, start, pos, count + 4, true);
    }
    if (action & 262144) {
      this.state = this.stack[base];
    } else {
      let baseStateID = this.stack[base - 3];
      this.state = parser5.getGoto(baseStateID, type, true);
    }
    while (this.stack.length > base)
      this.stack.pop();
    this.reduceContext(type, start);
  }
  // Shift a value into the buffer
  /// @internal
  storeNode(term, start, end, size = 4, isReduce = false) {
    if (term == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
      let cur = this, top = this.buffer.length;
      if (top == 0 && cur.parent) {
        top = cur.bufferBase - cur.parent.bufferBase;
        cur = cur.parent;
      }
      if (top > 0 && cur.buffer[top - 4] == 0 && cur.buffer[top - 1] > -1) {
        if (start == end)
          return;
        if (cur.buffer[top - 2] >= start) {
          cur.buffer[top - 2] = end;
          return;
        }
      }
    }
    if (!isReduce || this.pos == end) {
      this.buffer.push(term, start, end, size);
    } else {
      let index = this.buffer.length;
      if (index > 0 && this.buffer[index - 4] != 0)
        while (index > 0 && this.buffer[index - 2] > end) {
          this.buffer[index] = this.buffer[index - 4];
          this.buffer[index + 1] = this.buffer[index - 3];
          this.buffer[index + 2] = this.buffer[index - 2];
          this.buffer[index + 3] = this.buffer[index - 1];
          index -= 4;
          if (size > 4)
            size -= 4;
        }
      this.buffer[index] = term;
      this.buffer[index + 1] = start;
      this.buffer[index + 2] = end;
      this.buffer[index + 3] = size;
    }
  }
  // Apply a shift action
  /// @internal
  shift(action, next, nextEnd) {
    let start = this.pos;
    if (action & 131072) {
      this.pushState(action & 65535, this.pos);
    } else if ((action & 262144) == 0) {
      let nextState = action, { parser: parser5 } = this.p;
      if (nextEnd > this.pos || next <= parser5.maxNode) {
        this.pos = nextEnd;
        if (!parser5.stateFlag(
          nextState,
          1
          /* StateFlag.Skipped */
        ))
          this.reducePos = nextEnd;
      }
      this.pushState(nextState, start);
      this.shiftContext(next, start);
      if (next <= parser5.maxNode)
        this.buffer.push(next, start, nextEnd, 4);
    } else {
      this.pos = nextEnd;
      this.shiftContext(next, start);
      if (next <= this.p.parser.maxNode)
        this.buffer.push(next, start, nextEnd, 4);
    }
  }
  // Apply an action
  /// @internal
  apply(action, next, nextEnd) {
    if (action & 65536)
      this.reduce(action);
    else
      this.shift(action, next, nextEnd);
  }
  // Add a prebuilt (reused) node into the buffer.
  /// @internal
  useNode(value, next) {
    let index = this.p.reused.length - 1;
    if (index < 0 || this.p.reused[index] != value) {
      this.p.reused.push(value);
      index++;
    }
    let start = this.pos;
    this.reducePos = this.pos = start + value.length;
    this.pushState(next, start);
    this.buffer.push(
      index,
      start,
      this.reducePos,
      -1
      /* size == -1 means this is a reused value */
    );
    if (this.curContext)
      this.updateContext(this.curContext.tracker.reuse(this.curContext.context, value, this, this.p.stream.reset(this.pos - value.length)));
  }
  // Split the stack. Due to the buffer sharing and the fact
  // that `this.stack` tends to stay quite shallow, this isn't very
  // expensive.
  /// @internal
  split() {
    let parent = this;
    let off = parent.buffer.length;
    while (off > 0 && parent.buffer[off - 2] > parent.reducePos)
      off -= 4;
    let buffer = parent.buffer.slice(off), base = parent.bufferBase + off;
    while (parent && base == parent.bufferBase)
      parent = parent.parent;
    return new _Stack(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, buffer, base, this.curContext, this.lookAhead, parent);
  }
  // Try to recover from an error by 'deleting' (ignoring) one token.
  /// @internal
  recoverByDelete(next, nextEnd) {
    let isNode = next <= this.p.parser.maxNode;
    if (isNode)
      this.storeNode(next, this.pos, nextEnd, 4);
    this.storeNode(0, this.pos, nextEnd, isNode ? 8 : 4);
    this.pos = this.reducePos = nextEnd;
    this.score -= 190;
  }
  /// Check if the given term would be able to be shifted (optionally
  /// after some reductions) on this stack. This can be useful for
  /// external tokenizers that want to make sure they only provide a
  /// given token when it applies.
  canShift(term) {
    for (let sim = new SimulatedStack(this); ; ) {
      let action = this.p.parser.stateSlot(
        sim.state,
        4
        /* ParseState.DefaultReduce */
      ) || this.p.parser.hasAction(sim.state, term);
      if (action == 0)
        return false;
      if ((action & 65536) == 0)
        return true;
      sim.reduce(action);
    }
  }
  // Apply up to Recover.MaxNext recovery actions that conceptually
  // inserts some missing token or rule.
  /// @internal
  recoverByInsert(next) {
    if (this.stack.length >= 300)
      return [];
    let nextStates = this.p.parser.nextStates(this.state);
    if (nextStates.length > 4 << 1 || this.stack.length >= 120) {
      let best = [];
      for (let i = 0, s; i < nextStates.length; i += 2) {
        if ((s = nextStates[i + 1]) != this.state && this.p.parser.hasAction(s, next))
          best.push(nextStates[i], s);
      }
      if (this.stack.length < 120)
        for (let i = 0; best.length < 4 << 1 && i < nextStates.length; i += 2) {
          let s = nextStates[i + 1];
          if (!best.some((v, i2) => i2 & 1 && v == s))
            best.push(nextStates[i], s);
        }
      nextStates = best;
    }
    let result = [];
    for (let i = 0; i < nextStates.length && result.length < 4; i += 2) {
      let s = nextStates[i + 1];
      if (s == this.state)
        continue;
      let stack = this.split();
      stack.pushState(s, this.pos);
      stack.storeNode(0, stack.pos, stack.pos, 4, true);
      stack.shiftContext(nextStates[i], this.pos);
      stack.score -= 200;
      result.push(stack);
    }
    return result;
  }
  // Force a reduce, if possible. Return false if that can't
  // be done.
  /// @internal
  forceReduce() {
    let { parser: parser5 } = this.p;
    let reduce = parser5.stateSlot(
      this.state,
      5
      /* ParseState.ForcedReduce */
    );
    if ((reduce & 65536) == 0)
      return false;
    if (!parser5.validAction(this.state, reduce)) {
      let depth = reduce >> 19, term = reduce & 65535;
      let target = this.stack.length - depth * 3;
      if (target < 0 || parser5.getGoto(this.stack[target], term, false) < 0) {
        let backup = this.findForcedReduction();
        if (backup == null)
          return false;
        reduce = backup;
      }
      this.storeNode(0, this.pos, this.pos, 4, true);
      this.score -= 100;
    }
    this.reducePos = this.pos;
    this.reduce(reduce);
    return true;
  }
  /// Try to scan through the automaton to find some kind of reduction
  /// that can be applied. Used when the regular ForcedReduce field
  /// isn't a valid action. @internal
  findForcedReduction() {
    let { parser: parser5 } = this.p, seen = [];
    let explore = (state, depth) => {
      if (seen.includes(state))
        return;
      seen.push(state);
      return parser5.allActions(state, (action) => {
        if (action & (262144 | 131072))
          ;
        else if (action & 65536) {
          let rDepth = (action >> 19) - depth;
          if (rDepth > 1) {
            let term = action & 65535, target = this.stack.length - rDepth * 3;
            if (target >= 0 && parser5.getGoto(this.stack[target], term, false) >= 0)
              return rDepth << 19 | 65536 | term;
          }
        } else {
          let found = explore(action, depth + 1);
          if (found != null)
            return found;
        }
      });
    };
    return explore(this.state, 0);
  }
  /// @internal
  forceAll() {
    while (!this.p.parser.stateFlag(
      this.state,
      2
      /* StateFlag.Accepting */
    )) {
      if (!this.forceReduce()) {
        this.storeNode(0, this.pos, this.pos, 4, true);
        break;
      }
    }
    return this;
  }
  /// Check whether this state has no further actions (assumed to be a direct descendant of the
  /// top state, since any other states must be able to continue
  /// somehow). @internal
  get deadEnd() {
    if (this.stack.length != 3)
      return false;
    let { parser: parser5 } = this.p;
    return parser5.data[parser5.stateSlot(
      this.state,
      1
      /* ParseState.Actions */
    )] == 65535 && !parser5.stateSlot(
      this.state,
      4
      /* ParseState.DefaultReduce */
    );
  }
  /// Restart the stack (put it back in its start state). Only safe
  /// when this.stack.length == 3 (state is directly below the top
  /// state). @internal
  restart() {
    this.state = this.stack[0];
    this.stack.length = 0;
  }
  /// @internal
  sameState(other) {
    if (this.state != other.state || this.stack.length != other.stack.length)
      return false;
    for (let i = 0; i < this.stack.length; i += 3)
      if (this.stack[i] != other.stack[i])
        return false;
    return true;
  }
  /// Get the parser used by this stack.
  get parser() {
    return this.p.parser;
  }
  /// Test whether a given dialect (by numeric ID, as exported from
  /// the terms file) is enabled.
  dialectEnabled(dialectID) {
    return this.p.parser.dialect.flags[dialectID];
  }
  shiftContext(term, start) {
    if (this.curContext)
      this.updateContext(this.curContext.tracker.shift(this.curContext.context, term, this, this.p.stream.reset(start)));
  }
  reduceContext(term, start) {
    if (this.curContext)
      this.updateContext(this.curContext.tracker.reduce(this.curContext.context, term, this, this.p.stream.reset(start)));
  }
  /// @internal
  emitContext() {
    let last = this.buffer.length - 1;
    if (last < 0 || this.buffer[last] != -3)
      this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
  }
  /// @internal
  emitLookAhead() {
    let last = this.buffer.length - 1;
    if (last < 0 || this.buffer[last] != -4)
      this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
  }
  updateContext(context) {
    if (context != this.curContext.context) {
      let newCx = new StackContext(this.curContext.tracker, context);
      if (newCx.hash != this.curContext.hash)
        this.emitContext();
      this.curContext = newCx;
    }
  }
  /// @internal
  setLookAhead(lookAhead) {
    if (lookAhead > this.lookAhead) {
      this.emitLookAhead();
      this.lookAhead = lookAhead;
    }
  }
  /// @internal
  close() {
    if (this.curContext && this.curContext.tracker.strict)
      this.emitContext();
    if (this.lookAhead > 0)
      this.emitLookAhead();
  }
};
var StackContext = class {
  constructor(tracker, context) {
    this.tracker = tracker;
    this.context = context;
    this.hash = tracker.strict ? tracker.hash(context) : 0;
  }
};
var Recover;
(function(Recover2) {
  Recover2[Recover2["Insert"] = 200] = "Insert";
  Recover2[Recover2["Delete"] = 190] = "Delete";
  Recover2[Recover2["Reduce"] = 100] = "Reduce";
  Recover2[Recover2["MaxNext"] = 4] = "MaxNext";
  Recover2[Recover2["MaxInsertStackDepth"] = 300] = "MaxInsertStackDepth";
  Recover2[Recover2["DampenInsertStackDepth"] = 120] = "DampenInsertStackDepth";
  Recover2[Recover2["MinBigReduction"] = 2e3] = "MinBigReduction";
})(Recover || (Recover = {}));
var SimulatedStack = class {
  constructor(start) {
    this.start = start;
    this.state = start.state;
    this.stack = start.stack;
    this.base = this.stack.length;
  }
  reduce(action) {
    let term = action & 65535, depth = action >> 19;
    if (depth == 0) {
      if (this.stack == this.start.stack)
        this.stack = this.stack.slice();
      this.stack.push(this.state, 0, 0);
      this.base += 3;
    } else {
      this.base -= (depth - 1) * 3;
    }
    let goto = this.start.p.parser.getGoto(this.stack[this.base - 3], term, true);
    this.state = goto;
  }
};
var StackBufferCursor = class _StackBufferCursor {
  constructor(stack, pos, index) {
    this.stack = stack;
    this.pos = pos;
    this.index = index;
    this.buffer = stack.buffer;
    if (this.index == 0)
      this.maybeNext();
  }
  static create(stack, pos = stack.bufferBase + stack.buffer.length) {
    return new _StackBufferCursor(stack, pos, pos - stack.bufferBase);
  }
  maybeNext() {
    let next = this.stack.parent;
    if (next != null) {
      this.index = this.stack.bufferBase - next.bufferBase;
      this.stack = next;
      this.buffer = next.buffer;
    }
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  next() {
    this.index -= 4;
    this.pos -= 4;
    if (this.index == 0)
      this.maybeNext();
  }
  fork() {
    return new _StackBufferCursor(this.stack, this.pos, this.index);
  }
};
function decodeArray(input, Type = Uint16Array) {
  if (typeof input != "string")
    return input;
  let array = null;
  for (let pos = 0, out = 0; pos < input.length; ) {
    let value = 0;
    for (; ; ) {
      let next = input.charCodeAt(pos++), stop = false;
      if (next == 126) {
        value = 65535;
        break;
      }
      if (next >= 92)
        next--;
      if (next >= 34)
        next--;
      let digit = next - 32;
      if (digit >= 46) {
        digit -= 46;
        stop = true;
      }
      value += digit;
      if (stop)
        break;
      value *= 46;
    }
    if (array)
      array[out++] = value;
    else
      array = new Type(value);
  }
  return array;
}
var CachedToken = class {
  constructor() {
    this.start = -1;
    this.value = -1;
    this.end = -1;
    this.extended = -1;
    this.lookAhead = 0;
    this.mask = 0;
    this.context = 0;
  }
};
var nullToken = new CachedToken();
var InputStream = class {
  /// @internal
  constructor(input, ranges) {
    this.input = input;
    this.ranges = ranges;
    this.chunk = "";
    this.chunkOff = 0;
    this.chunk2 = "";
    this.chunk2Pos = 0;
    this.next = -1;
    this.token = nullToken;
    this.rangeIndex = 0;
    this.pos = this.chunkPos = ranges[0].from;
    this.range = ranges[0];
    this.end = ranges[ranges.length - 1].to;
    this.readNext();
  }
  /// @internal
  resolveOffset(offset, assoc) {
    let range = this.range, index = this.rangeIndex;
    let pos = this.pos + offset;
    while (pos < range.from) {
      if (!index)
        return null;
      let next = this.ranges[--index];
      pos -= range.from - next.to;
      range = next;
    }
    while (assoc < 0 ? pos > range.to : pos >= range.to) {
      if (index == this.ranges.length - 1)
        return null;
      let next = this.ranges[++index];
      pos += next.from - range.to;
      range = next;
    }
    return pos;
  }
  /// @internal
  clipPos(pos) {
    if (pos >= this.range.from && pos < this.range.to)
      return pos;
    for (let range of this.ranges)
      if (range.to > pos)
        return Math.max(pos, range.from);
    return this.end;
  }
  /// Look at a code unit near the stream position. `.peek(0)` equals
  /// `.next`, `.peek(-1)` gives you the previous character, and so
  /// on.
  ///
  /// Note that looking around during tokenizing creates dependencies
  /// on potentially far-away content, which may reduce the
  /// effectiveness incremental parsing—when looking forward—or even
  /// cause invalid reparses when looking backward more than 25 code
  /// units, since the library does not track lookbehind.
  peek(offset) {
    let idx = this.chunkOff + offset, pos, result;
    if (idx >= 0 && idx < this.chunk.length) {
      pos = this.pos + offset;
      result = this.chunk.charCodeAt(idx);
    } else {
      let resolved = this.resolveOffset(offset, 1);
      if (resolved == null)
        return -1;
      pos = resolved;
      if (pos >= this.chunk2Pos && pos < this.chunk2Pos + this.chunk2.length) {
        result = this.chunk2.charCodeAt(pos - this.chunk2Pos);
      } else {
        let i = this.rangeIndex, range = this.range;
        while (range.to <= pos)
          range = this.ranges[++i];
        this.chunk2 = this.input.chunk(this.chunk2Pos = pos);
        if (pos + this.chunk2.length > range.to)
          this.chunk2 = this.chunk2.slice(0, range.to - pos);
        result = this.chunk2.charCodeAt(0);
      }
    }
    if (pos >= this.token.lookAhead)
      this.token.lookAhead = pos + 1;
    return result;
  }
  /// Accept a token. By default, the end of the token is set to the
  /// current stream position, but you can pass an offset (relative to
  /// the stream position) to change that.
  acceptToken(token, endOffset = 0) {
    let end = endOffset ? this.resolveOffset(endOffset, -1) : this.pos;
    if (end == null || end < this.token.start)
      throw new RangeError("Token end out of bounds");
    this.token.value = token;
    this.token.end = end;
  }
  getChunk() {
    if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
      let { chunk, chunkPos } = this;
      this.chunk = this.chunk2;
      this.chunkPos = this.chunk2Pos;
      this.chunk2 = chunk;
      this.chunk2Pos = chunkPos;
      this.chunkOff = this.pos - this.chunkPos;
    } else {
      this.chunk2 = this.chunk;
      this.chunk2Pos = this.chunkPos;
      let nextChunk = this.input.chunk(this.pos);
      let end = this.pos + nextChunk.length;
      this.chunk = end > this.range.to ? nextChunk.slice(0, this.range.to - this.pos) : nextChunk;
      this.chunkPos = this.pos;
      this.chunkOff = 0;
    }
  }
  readNext() {
    if (this.chunkOff >= this.chunk.length) {
      this.getChunk();
      if (this.chunkOff == this.chunk.length)
        return this.next = -1;
    }
    return this.next = this.chunk.charCodeAt(this.chunkOff);
  }
  /// Move the stream forward N (defaults to 1) code units. Returns
  /// the new value of [`next`](#lr.InputStream.next).
  advance(n = 1) {
    this.chunkOff += n;
    while (this.pos + n >= this.range.to) {
      if (this.rangeIndex == this.ranges.length - 1)
        return this.setDone();
      n -= this.range.to - this.pos;
      this.range = this.ranges[++this.rangeIndex];
      this.pos = this.range.from;
    }
    this.pos += n;
    if (this.pos >= this.token.lookAhead)
      this.token.lookAhead = this.pos + 1;
    return this.readNext();
  }
  setDone() {
    this.pos = this.chunkPos = this.end;
    this.range = this.ranges[this.rangeIndex = this.ranges.length - 1];
    this.chunk = "";
    return this.next = -1;
  }
  /// @internal
  reset(pos, token) {
    if (token) {
      this.token = token;
      token.start = pos;
      token.lookAhead = pos + 1;
      token.value = token.extended = -1;
    } else {
      this.token = nullToken;
    }
    if (this.pos != pos) {
      this.pos = pos;
      if (pos == this.end) {
        this.setDone();
        return this;
      }
      while (pos < this.range.from)
        this.range = this.ranges[--this.rangeIndex];
      while (pos >= this.range.to)
        this.range = this.ranges[++this.rangeIndex];
      if (pos >= this.chunkPos && pos < this.chunkPos + this.chunk.length) {
        this.chunkOff = pos - this.chunkPos;
      } else {
        this.chunk = "";
        this.chunkOff = 0;
      }
      this.readNext();
    }
    return this;
  }
  /// @internal
  read(from, to) {
    if (from >= this.chunkPos && to <= this.chunkPos + this.chunk.length)
      return this.chunk.slice(from - this.chunkPos, to - this.chunkPos);
    if (from >= this.chunk2Pos && to <= this.chunk2Pos + this.chunk2.length)
      return this.chunk2.slice(from - this.chunk2Pos, to - this.chunk2Pos);
    if (from >= this.range.from && to <= this.range.to)
      return this.input.read(from, to);
    let result = "";
    for (let r of this.ranges) {
      if (r.from >= to)
        break;
      if (r.to > from)
        result += this.input.read(Math.max(r.from, from), Math.min(r.to, to));
    }
    return result;
  }
};
var TokenGroup = class {
  constructor(data, id2) {
    this.data = data;
    this.id = id2;
  }
  token(input, stack) {
    let { parser: parser5 } = stack.p;
    readToken(this.data, input, stack, this.id, parser5.data, parser5.tokenPrecTable);
  }
};
TokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
var LocalTokenGroup = class {
  constructor(data, precTable, elseToken) {
    this.precTable = precTable;
    this.elseToken = elseToken;
    this.data = typeof data == "string" ? decodeArray(data) : data;
  }
  token(input, stack) {
    let start = input.pos, skipped = 0;
    for (; ; ) {
      let atEof = input.next < 0, nextPos = input.resolveOffset(1, 1);
      readToken(this.data, input, stack, 0, this.data, this.precTable);
      if (input.token.value > -1)
        break;
      if (this.elseToken == null)
        return;
      if (!atEof)
        skipped++;
      if (nextPos == null)
        break;
      input.reset(nextPos, input.token);
    }
    if (skipped) {
      input.reset(start, input.token);
      input.acceptToken(this.elseToken, skipped);
    }
  }
};
LocalTokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
var ExternalTokenizer = class {
  /// Create a tokenizer. The first argument is the function that,
  /// given an input stream, scans for the types of tokens it
  /// recognizes at the stream's position, and calls
  /// [`acceptToken`](#lr.InputStream.acceptToken) when it finds
  /// one.
  constructor(token, options = {}) {
    this.token = token;
    this.contextual = !!options.contextual;
    this.fallback = !!options.fallback;
    this.extend = !!options.extend;
  }
};
function readToken(data, input, stack, group, precTable, precOffset) {
  let state = 0, groupMask = 1 << group, { dialect } = stack.p.parser;
  scan:
    for (; ; ) {
      if ((groupMask & data[state]) == 0)
        break;
      let accEnd = data[state + 1];
      for (let i = state + 3; i < accEnd; i += 2)
        if ((data[i + 1] & groupMask) > 0) {
          let term = data[i];
          if (dialect.allows(term) && (input.token.value == -1 || input.token.value == term || overrides(term, input.token.value, precTable, precOffset))) {
            input.acceptToken(term);
            break;
          }
        }
      let next = input.next, low = 0, high = data[state + 2];
      if (input.next < 0 && high > low && data[accEnd + high * 3 - 3] == 65535 && data[accEnd + high * 3 - 3] == 65535) {
        state = data[accEnd + high * 3 - 1];
        continue scan;
      }
      for (; low < high; ) {
        let mid = low + high >> 1;
        let index = accEnd + mid + (mid << 1);
        let from = data[index], to = data[index + 1] || 65536;
        if (next < from)
          high = mid;
        else if (next >= to)
          low = mid + 1;
        else {
          state = data[index + 2];
          input.advance();
          continue scan;
        }
      }
      break;
    }
}
function findOffset(data, start, term) {
  for (let i = start, next; (next = data[i]) != 65535; i++)
    if (next == term)
      return i - start;
  return -1;
}
function overrides(token, prev, tableData, tableOffset) {
  let iPrev = findOffset(tableData, tableOffset, prev);
  return iPrev < 0 || findOffset(tableData, tableOffset, token) < iPrev;
}
var verbose = typeof process != "undefined" && process.env && /\bparse\b/.test(process.env.LOG);
var stackIDs = null;
var Safety;
(function(Safety2) {
  Safety2[Safety2["Margin"] = 25] = "Margin";
})(Safety || (Safety = {}));
function cutAt(tree, pos, side) {
  let cursor = tree.cursor(IterMode.IncludeAnonymous);
  cursor.moveTo(pos);
  for (; ; ) {
    if (!(side < 0 ? cursor.childBefore(pos) : cursor.childAfter(pos)))
      for (; ; ) {
        if ((side < 0 ? cursor.to < pos : cursor.from > pos) && !cursor.type.isError)
          return side < 0 ? Math.max(0, Math.min(
            cursor.to - 1,
            pos - 25
            /* Safety.Margin */
          )) : Math.min(tree.length, Math.max(
            cursor.from + 1,
            pos + 25
            /* Safety.Margin */
          ));
        if (side < 0 ? cursor.prevSibling() : cursor.nextSibling())
          break;
        if (!cursor.parent())
          return side < 0 ? 0 : tree.length;
      }
  }
}
var FragmentCursor = class {
  constructor(fragments, nodeSet) {
    this.fragments = fragments;
    this.nodeSet = nodeSet;
    this.i = 0;
    this.fragment = null;
    this.safeFrom = -1;
    this.safeTo = -1;
    this.trees = [];
    this.start = [];
    this.index = [];
    this.nextFragment();
  }
  nextFragment() {
    let fr = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
    if (fr) {
      this.safeFrom = fr.openStart ? cutAt(fr.tree, fr.from + fr.offset, 1) - fr.offset : fr.from;
      this.safeTo = fr.openEnd ? cutAt(fr.tree, fr.to + fr.offset, -1) - fr.offset : fr.to;
      while (this.trees.length) {
        this.trees.pop();
        this.start.pop();
        this.index.pop();
      }
      this.trees.push(fr.tree);
      this.start.push(-fr.offset);
      this.index.push(0);
      this.nextStart = this.safeFrom;
    } else {
      this.nextStart = 1e9;
    }
  }
  // `pos` must be >= any previously given `pos` for this cursor
  nodeAt(pos) {
    if (pos < this.nextStart)
      return null;
    while (this.fragment && this.safeTo <= pos)
      this.nextFragment();
    if (!this.fragment)
      return null;
    for (; ; ) {
      let last = this.trees.length - 1;
      if (last < 0) {
        this.nextFragment();
        return null;
      }
      let top = this.trees[last], index = this.index[last];
      if (index == top.children.length) {
        this.trees.pop();
        this.start.pop();
        this.index.pop();
        continue;
      }
      let next = top.children[index];
      let start = this.start[last] + top.positions[index];
      if (start > pos) {
        this.nextStart = start;
        return null;
      }
      if (next instanceof Tree) {
        if (start == pos) {
          if (start < this.safeFrom)
            return null;
          let end = start + next.length;
          if (end <= this.safeTo) {
            let lookAhead = next.prop(NodeProp.lookAhead);
            if (!lookAhead || end + lookAhead < this.fragment.to)
              return next;
          }
        }
        this.index[last]++;
        if (start + next.length >= Math.max(this.safeFrom, pos)) {
          this.trees.push(next);
          this.start.push(start);
          this.index.push(0);
        }
      } else {
        this.index[last]++;
        this.nextStart = start + next.length;
      }
    }
  }
};
var TokenCache = class {
  constructor(parser5, stream) {
    this.stream = stream;
    this.tokens = [];
    this.mainToken = null;
    this.actions = [];
    this.tokens = parser5.tokenizers.map((_) => new CachedToken());
  }
  getActions(stack) {
    let actionIndex = 0;
    let main = null;
    let { parser: parser5 } = stack.p, { tokenizers } = parser5;
    let mask = parser5.stateSlot(
      stack.state,
      3
      /* ParseState.TokenizerMask */
    );
    let context = stack.curContext ? stack.curContext.hash : 0;
    let lookAhead = 0;
    for (let i = 0; i < tokenizers.length; i++) {
      if ((1 << i & mask) == 0)
        continue;
      let tokenizer = tokenizers[i], token = this.tokens[i];
      if (main && !tokenizer.fallback)
        continue;
      if (tokenizer.contextual || token.start != stack.pos || token.mask != mask || token.context != context) {
        this.updateCachedToken(token, tokenizer, stack);
        token.mask = mask;
        token.context = context;
      }
      if (token.lookAhead > token.end + 25)
        lookAhead = Math.max(token.lookAhead, lookAhead);
      if (token.value != 0) {
        let startIndex = actionIndex;
        if (token.extended > -1)
          actionIndex = this.addActions(stack, token.extended, token.end, actionIndex);
        actionIndex = this.addActions(stack, token.value, token.end, actionIndex);
        if (!tokenizer.extend) {
          main = token;
          if (actionIndex > startIndex)
            break;
        }
      }
    }
    while (this.actions.length > actionIndex)
      this.actions.pop();
    if (lookAhead)
      stack.setLookAhead(lookAhead);
    if (!main && stack.pos == this.stream.end) {
      main = new CachedToken();
      main.value = stack.p.parser.eofTerm;
      main.start = main.end = stack.pos;
      actionIndex = this.addActions(stack, main.value, main.end, actionIndex);
    }
    this.mainToken = main;
    return this.actions;
  }
  getMainToken(stack) {
    if (this.mainToken)
      return this.mainToken;
    let main = new CachedToken(), { pos, p } = stack;
    main.start = pos;
    main.end = Math.min(pos + 1, p.stream.end);
    main.value = pos == p.stream.end ? p.parser.eofTerm : 0;
    return main;
  }
  updateCachedToken(token, tokenizer, stack) {
    let start = this.stream.clipPos(stack.pos);
    tokenizer.token(this.stream.reset(start, token), stack);
    if (token.value > -1) {
      let { parser: parser5 } = stack.p;
      for (let i = 0; i < parser5.specialized.length; i++)
        if (parser5.specialized[i] == token.value) {
          let result = parser5.specializers[i](this.stream.read(token.start, token.end), stack);
          if (result >= 0 && stack.p.parser.dialect.allows(result >> 1)) {
            if ((result & 1) == 0)
              token.value = result >> 1;
            else
              token.extended = result >> 1;
            break;
          }
        }
    } else {
      token.value = 0;
      token.end = this.stream.clipPos(start + 1);
    }
  }
  putAction(action, token, end, index) {
    for (let i = 0; i < index; i += 3)
      if (this.actions[i] == action)
        return index;
    this.actions[index++] = action;
    this.actions[index++] = token;
    this.actions[index++] = end;
    return index;
  }
  addActions(stack, token, end, index) {
    let { state } = stack, { parser: parser5 } = stack.p, { data } = parser5;
    for (let set = 0; set < 2; set++) {
      for (let i = parser5.stateSlot(
        state,
        set ? 2 : 1
        /* ParseState.Actions */
      ); ; i += 3) {
        if (data[i] == 65535) {
          if (data[i + 1] == 1) {
            i = pair(data, i + 2);
          } else {
            if (index == 0 && data[i + 1] == 2)
              index = this.putAction(pair(data, i + 2), token, end, index);
            break;
          }
        }
        if (data[i] == token)
          index = this.putAction(pair(data, i + 1), token, end, index);
      }
    }
    return index;
  }
};
var Rec;
(function(Rec2) {
  Rec2[Rec2["Distance"] = 5] = "Distance";
  Rec2[Rec2["MaxRemainingPerStep"] = 3] = "MaxRemainingPerStep";
  Rec2[Rec2["MinBufferLengthPrune"] = 500] = "MinBufferLengthPrune";
  Rec2[Rec2["ForceReduceLimit"] = 10] = "ForceReduceLimit";
  Rec2[Rec2["CutDepth"] = 15e3] = "CutDepth";
  Rec2[Rec2["CutTo"] = 9e3] = "CutTo";
  Rec2[Rec2["MaxLeftAssociativeReductionCount"] = 300] = "MaxLeftAssociativeReductionCount";
  Rec2[Rec2["MaxStackCount"] = 12] = "MaxStackCount";
})(Rec || (Rec = {}));
var Parse = class {
  constructor(parser5, input, fragments, ranges) {
    this.parser = parser5;
    this.input = input;
    this.ranges = ranges;
    this.recovering = 0;
    this.nextStackID = 9812;
    this.minStackPos = 0;
    this.reused = [];
    this.stoppedAt = null;
    this.lastBigReductionStart = -1;
    this.lastBigReductionSize = 0;
    this.bigReductionCount = 0;
    this.stream = new InputStream(input, ranges);
    this.tokens = new TokenCache(parser5, this.stream);
    this.topTerm = parser5.top[1];
    let { from } = ranges[0];
    this.stacks = [Stack.start(this, parser5.top[0], from)];
    this.fragments = fragments.length && this.stream.end - from > parser5.bufferLength * 4 ? new FragmentCursor(fragments, parser5.nodeSet) : null;
  }
  get parsedPos() {
    return this.minStackPos;
  }
  // Move the parser forward. This will process all parse stacks at
  // `this.pos` and try to advance them to a further position. If no
  // stack for such a position is found, it'll start error-recovery.
  //
  // When the parse is finished, this will return a syntax tree. When
  // not, it returns `null`.
  advance() {
    let stacks = this.stacks, pos = this.minStackPos;
    let newStacks = this.stacks = [];
    let stopped, stoppedTokens;
    if (this.bigReductionCount > 300 && stacks.length == 1) {
      let [s] = stacks;
      while (s.forceReduce() && s.stack.length && s.stack[s.stack.length - 2] >= this.lastBigReductionStart) {
      }
      this.bigReductionCount = this.lastBigReductionSize = 0;
    }
    for (let i = 0; i < stacks.length; i++) {
      let stack = stacks[i];
      for (; ; ) {
        this.tokens.mainToken = null;
        if (stack.pos > pos) {
          newStacks.push(stack);
        } else if (this.advanceStack(stack, newStacks, stacks)) {
          continue;
        } else {
          if (!stopped) {
            stopped = [];
            stoppedTokens = [];
          }
          stopped.push(stack);
          let tok = this.tokens.getMainToken(stack);
          stoppedTokens.push(tok.value, tok.end);
        }
        break;
      }
    }
    if (!newStacks.length) {
      let finished = stopped && findFinished(stopped);
      if (finished)
        return this.stackToTree(finished);
      if (this.parser.strict) {
        if (verbose && stopped)
          console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none"));
        throw new SyntaxError("No parse at " + pos);
      }
      if (!this.recovering)
        this.recovering = 5;
    }
    if (this.recovering && stopped) {
      let finished = this.stoppedAt != null && stopped[0].pos > this.stoppedAt ? stopped[0] : this.runRecovery(stopped, stoppedTokens, newStacks);
      if (finished)
        return this.stackToTree(finished.forceAll());
    }
    if (this.recovering) {
      let maxRemaining = this.recovering == 1 ? 1 : this.recovering * 3;
      if (newStacks.length > maxRemaining) {
        newStacks.sort((a, b) => b.score - a.score);
        while (newStacks.length > maxRemaining)
          newStacks.pop();
      }
      if (newStacks.some((s) => s.reducePos > pos))
        this.recovering--;
    } else if (newStacks.length > 1) {
      outer:
        for (let i = 0; i < newStacks.length - 1; i++) {
          let stack = newStacks[i];
          for (let j = i + 1; j < newStacks.length; j++) {
            let other = newStacks[j];
            if (stack.sameState(other) || stack.buffer.length > 500 && other.buffer.length > 500) {
              if ((stack.score - other.score || stack.buffer.length - other.buffer.length) > 0) {
                newStacks.splice(j--, 1);
              } else {
                newStacks.splice(i--, 1);
                continue outer;
              }
            }
          }
        }
      if (newStacks.length > 12)
        newStacks.splice(
          12,
          newStacks.length - 12
          /* Rec.MaxStackCount */
        );
    }
    this.minStackPos = newStacks[0].pos;
    for (let i = 1; i < newStacks.length; i++)
      if (newStacks[i].pos < this.minStackPos)
        this.minStackPos = newStacks[i].pos;
    return null;
  }
  stopAt(pos) {
    if (this.stoppedAt != null && this.stoppedAt < pos)
      throw new RangeError("Can't move stoppedAt forward");
    this.stoppedAt = pos;
  }
  // Returns an updated version of the given stack, or null if the
  // stack can't advance normally. When `split` and `stacks` are
  // given, stacks split off by ambiguous operations will be pushed to
  // `split`, or added to `stacks` if they move `pos` forward.
  advanceStack(stack, stacks, split) {
    let start = stack.pos, { parser: parser5 } = this;
    let base = verbose ? this.stackID(stack) + " -> " : "";
    if (this.stoppedAt != null && start > this.stoppedAt)
      return stack.forceReduce() ? stack : null;
    if (this.fragments) {
      let strictCx = stack.curContext && stack.curContext.tracker.strict, cxHash = strictCx ? stack.curContext.hash : 0;
      for (let cached = this.fragments.nodeAt(start); cached; ) {
        let match = this.parser.nodeSet.types[cached.type.id] == cached.type ? parser5.getGoto(stack.state, cached.type.id) : -1;
        if (match > -1 && cached.length && (!strictCx || (cached.prop(NodeProp.contextHash) || 0) == cxHash)) {
          stack.useNode(cached, match);
          if (verbose)
            console.log(base + this.stackID(stack) + ` (via reuse of ${parser5.getName(cached.type.id)})`);
          return true;
        }
        if (!(cached instanceof Tree) || cached.children.length == 0 || cached.positions[0] > 0)
          break;
        let inner = cached.children[0];
        if (inner instanceof Tree && cached.positions[0] == 0)
          cached = inner;
        else
          break;
      }
    }
    let defaultReduce = parser5.stateSlot(
      stack.state,
      4
      /* ParseState.DefaultReduce */
    );
    if (defaultReduce > 0) {
      stack.reduce(defaultReduce);
      if (verbose)
        console.log(base + this.stackID(stack) + ` (via always-reduce ${parser5.getName(
          defaultReduce & 65535
          /* Action.ValueMask */
        )})`);
      return true;
    }
    if (stack.stack.length >= 15e3) {
      while (stack.stack.length > 9e3 && stack.forceReduce()) {
      }
    }
    let actions = this.tokens.getActions(stack);
    for (let i = 0; i < actions.length; ) {
      let action = actions[i++], term = actions[i++], end = actions[i++];
      let last = i == actions.length || !split;
      let localStack = last ? stack : stack.split();
      localStack.apply(action, term, end);
      if (verbose)
        console.log(base + this.stackID(localStack) + ` (via ${(action & 65536) == 0 ? "shift" : `reduce of ${parser5.getName(
          action & 65535
          /* Action.ValueMask */
        )}`} for ${parser5.getName(term)} @ ${start}${localStack == stack ? "" : ", split"})`);
      if (last)
        return true;
      else if (localStack.pos > start)
        stacks.push(localStack);
      else
        split.push(localStack);
    }
    return false;
  }
  // Advance a given stack forward as far as it will go. Returns the
  // (possibly updated) stack if it got stuck, or null if it moved
  // forward and was given to `pushStackDedup`.
  advanceFully(stack, newStacks) {
    let pos = stack.pos;
    for (; ; ) {
      if (!this.advanceStack(stack, null, null))
        return false;
      if (stack.pos > pos) {
        pushStackDedup(stack, newStacks);
        return true;
      }
    }
  }
  runRecovery(stacks, tokens, newStacks) {
    let finished = null, restarted = false;
    for (let i = 0; i < stacks.length; i++) {
      let stack = stacks[i], token = tokens[i << 1], tokenEnd = tokens[(i << 1) + 1];
      let base = verbose ? this.stackID(stack) + " -> " : "";
      if (stack.deadEnd) {
        if (restarted)
          continue;
        restarted = true;
        stack.restart();
        if (verbose)
          console.log(base + this.stackID(stack) + " (restarted)");
        let done = this.advanceFully(stack, newStacks);
        if (done)
          continue;
      }
      let force = stack.split(), forceBase = base;
      for (let j = 0; force.forceReduce() && j < 10; j++) {
        if (verbose)
          console.log(forceBase + this.stackID(force) + " (via force-reduce)");
        let done = this.advanceFully(force, newStacks);
        if (done)
          break;
        if (verbose)
          forceBase = this.stackID(force) + " -> ";
      }
      for (let insert of stack.recoverByInsert(token)) {
        if (verbose)
          console.log(base + this.stackID(insert) + " (via recover-insert)");
        this.advanceFully(insert, newStacks);
      }
      if (this.stream.end > stack.pos) {
        if (tokenEnd == stack.pos) {
          tokenEnd++;
          token = 0;
        }
        stack.recoverByDelete(token, tokenEnd);
        if (verbose)
          console.log(base + this.stackID(stack) + ` (via recover-delete ${this.parser.getName(token)})`);
        pushStackDedup(stack, newStacks);
      } else if (!finished || finished.score < stack.score) {
        finished = stack;
      }
    }
    return finished;
  }
  // Convert the stack's buffer to a syntax tree.
  stackToTree(stack) {
    stack.close();
    return Tree.build({
      buffer: StackBufferCursor.create(stack),
      nodeSet: this.parser.nodeSet,
      topID: this.topTerm,
      maxBufferLength: this.parser.bufferLength,
      reused: this.reused,
      start: this.ranges[0].from,
      length: stack.pos - this.ranges[0].from,
      minRepeatType: this.parser.minRepeatTerm
    });
  }
  stackID(stack) {
    let id2 = (stackIDs || (stackIDs = /* @__PURE__ */ new WeakMap())).get(stack);
    if (!id2)
      stackIDs.set(stack, id2 = String.fromCodePoint(this.nextStackID++));
    return id2 + stack;
  }
};
function pushStackDedup(stack, newStacks) {
  for (let i = 0; i < newStacks.length; i++) {
    let other = newStacks[i];
    if (other.pos == stack.pos && other.sameState(stack)) {
      if (newStacks[i].score < stack.score)
        newStacks[i] = stack;
      return;
    }
  }
  newStacks.push(stack);
}
var Dialect = class {
  constructor(source, flags, disabled) {
    this.source = source;
    this.flags = flags;
    this.disabled = disabled;
  }
  allows(term) {
    return !this.disabled || this.disabled[term] == 0;
  }
};
var id = (x) => x;
var ContextTracker = class {
  /// Define a context tracker.
  constructor(spec) {
    this.start = spec.start;
    this.shift = spec.shift || id;
    this.reduce = spec.reduce || id;
    this.reuse = spec.reuse || id;
    this.hash = spec.hash || (() => 0);
    this.strict = spec.strict !== false;
  }
};
var LRParser = class _LRParser extends Parser {
  /// @internal
  constructor(spec) {
    super();
    this.wrappers = [];
    if (spec.version != 14)
      throw new RangeError(`Parser version (${spec.version}) doesn't match runtime version (${14})`);
    let nodeNames = spec.nodeNames.split(" ");
    this.minRepeatTerm = nodeNames.length;
    for (let i = 0; i < spec.repeatNodeCount; i++)
      nodeNames.push("");
    let topTerms = Object.keys(spec.topRules).map((r) => spec.topRules[r][1]);
    let nodeProps = [];
    for (let i = 0; i < nodeNames.length; i++)
      nodeProps.push([]);
    function setProp(nodeID, prop, value) {
      nodeProps[nodeID].push([prop, prop.deserialize(String(value))]);
    }
    if (spec.nodeProps)
      for (let propSpec of spec.nodeProps) {
        let prop = propSpec[0];
        if (typeof prop == "string")
          prop = NodeProp[prop];
        for (let i = 1; i < propSpec.length; ) {
          let next = propSpec[i++];
          if (next >= 0) {
            setProp(next, prop, propSpec[i++]);
          } else {
            let value = propSpec[i + -next];
            for (let j = -next; j > 0; j--)
              setProp(propSpec[i++], prop, value);
            i++;
          }
        }
      }
    this.nodeSet = new NodeSet(nodeNames.map((name, i) => NodeType.define({
      name: i >= this.minRepeatTerm ? void 0 : name,
      id: i,
      props: nodeProps[i],
      top: topTerms.indexOf(i) > -1,
      error: i == 0,
      skipped: spec.skippedNodes && spec.skippedNodes.indexOf(i) > -1
    })));
    if (spec.propSources)
      this.nodeSet = this.nodeSet.extend(...spec.propSources);
    this.strict = false;
    this.bufferLength = DefaultBufferLength;
    let tokenArray = decodeArray(spec.tokenData);
    this.context = spec.context;
    this.specializerSpecs = spec.specialized || [];
    this.specialized = new Uint16Array(this.specializerSpecs.length);
    for (let i = 0; i < this.specializerSpecs.length; i++)
      this.specialized[i] = this.specializerSpecs[i].term;
    this.specializers = this.specializerSpecs.map(getSpecializer);
    this.states = decodeArray(spec.states, Uint32Array);
    this.data = decodeArray(spec.stateData);
    this.goto = decodeArray(spec.goto);
    this.maxTerm = spec.maxTerm;
    this.tokenizers = spec.tokenizers.map((value) => typeof value == "number" ? new TokenGroup(tokenArray, value) : value);
    this.topRules = spec.topRules;
    this.dialects = spec.dialects || {};
    this.dynamicPrecedences = spec.dynamicPrecedences || null;
    this.tokenPrecTable = spec.tokenPrec;
    this.termNames = spec.termNames || null;
    this.maxNode = this.nodeSet.types.length - 1;
    this.dialect = this.parseDialect();
    this.top = this.topRules[Object.keys(this.topRules)[0]];
  }
  createParse(input, fragments, ranges) {
    let parse = new Parse(this, input, fragments, ranges);
    for (let w of this.wrappers)
      parse = w(parse, input, fragments, ranges);
    return parse;
  }
  /// Get a goto table entry @internal
  getGoto(state, term, loose = false) {
    let table = this.goto;
    if (term >= table[0])
      return -1;
    for (let pos = table[term + 1]; ; ) {
      let groupTag = table[pos++], last = groupTag & 1;
      let target = table[pos++];
      if (last && loose)
        return target;
      for (let end = pos + (groupTag >> 1); pos < end; pos++)
        if (table[pos] == state)
          return target;
      if (last)
        return -1;
    }
  }
  /// Check if this state has an action for a given terminal @internal
  hasAction(state, terminal) {
    let data = this.data;
    for (let set = 0; set < 2; set++) {
      for (let i = this.stateSlot(
        state,
        set ? 2 : 1
        /* ParseState.Actions */
      ), next; ; i += 3) {
        if ((next = data[i]) == 65535) {
          if (data[i + 1] == 1)
            next = data[i = pair(data, i + 2)];
          else if (data[i + 1] == 2)
            return pair(data, i + 2);
          else
            break;
        }
        if (next == terminal || next == 0)
          return pair(data, i + 1);
      }
    }
    return 0;
  }
  /// @internal
  stateSlot(state, slot) {
    return this.states[state * 6 + slot];
  }
  /// @internal
  stateFlag(state, flag) {
    return (this.stateSlot(
      state,
      0
      /* ParseState.Flags */
    ) & flag) > 0;
  }
  /// @internal
  validAction(state, action) {
    return !!this.allActions(state, (a) => a == action ? true : null);
  }
  /// @internal
  allActions(state, action) {
    let deflt = this.stateSlot(
      state,
      4
      /* ParseState.DefaultReduce */
    );
    let result = deflt ? action(deflt) : void 0;
    for (let i = this.stateSlot(
      state,
      1
      /* ParseState.Actions */
    ); result == null; i += 3) {
      if (this.data[i] == 65535) {
        if (this.data[i + 1] == 1)
          i = pair(this.data, i + 2);
        else
          break;
      }
      result = action(pair(this.data, i + 1));
    }
    return result;
  }
  /// Get the states that can follow this one through shift actions or
  /// goto jumps. @internal
  nextStates(state) {
    let result = [];
    for (let i = this.stateSlot(
      state,
      1
      /* ParseState.Actions */
    ); ; i += 3) {
      if (this.data[i] == 65535) {
        if (this.data[i + 1] == 1)
          i = pair(this.data, i + 2);
        else
          break;
      }
      if ((this.data[i + 2] & 65536 >> 16) == 0) {
        let value = this.data[i + 1];
        if (!result.some((v, i2) => i2 & 1 && v == value))
          result.push(this.data[i], value);
      }
    }
    return result;
  }
  /// Configure the parser. Returns a new parser instance that has the
  /// given settings modified. Settings not provided in `config` are
  /// kept from the original parser.
  configure(config) {
    let copy = Object.assign(Object.create(_LRParser.prototype), this);
    if (config.props)
      copy.nodeSet = this.nodeSet.extend(...config.props);
    if (config.top) {
      let info = this.topRules[config.top];
      if (!info)
        throw new RangeError(`Invalid top rule name ${config.top}`);
      copy.top = info;
    }
    if (config.tokenizers)
      copy.tokenizers = this.tokenizers.map((t) => {
        let found = config.tokenizers.find((r) => r.from == t);
        return found ? found.to : t;
      });
    if (config.specializers) {
      copy.specializers = this.specializers.slice();
      copy.specializerSpecs = this.specializerSpecs.map((s, i) => {
        let found = config.specializers.find((r) => r.from == s.external);
        if (!found)
          return s;
        let spec = Object.assign(Object.assign({}, s), { external: found.to });
        copy.specializers[i] = getSpecializer(spec);
        return spec;
      });
    }
    if (config.contextTracker)
      copy.context = config.contextTracker;
    if (config.dialect)
      copy.dialect = this.parseDialect(config.dialect);
    if (config.strict != null)
      copy.strict = config.strict;
    if (config.wrap)
      copy.wrappers = copy.wrappers.concat(config.wrap);
    if (config.bufferLength != null)
      copy.bufferLength = config.bufferLength;
    return copy;
  }
  /// Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
  /// are registered for this parser.
  hasWrappers() {
    return this.wrappers.length > 0;
  }
  /// Returns the name associated with a given term. This will only
  /// work for all terms when the parser was generated with the
  /// `--names` option. By default, only the names of tagged terms are
  /// stored.
  getName(term) {
    return this.termNames ? this.termNames[term] : String(term <= this.maxNode && this.nodeSet.types[term].name || term);
  }
  /// The eof term id is always allocated directly after the node
  /// types. @internal
  get eofTerm() {
    return this.maxNode + 1;
  }
  /// The type of top node produced by the parser.
  get topNode() {
    return this.nodeSet.types[this.top[1]];
  }
  /// @internal
  dynamicPrecedence(term) {
    let prec = this.dynamicPrecedences;
    return prec == null ? 0 : prec[term] || 0;
  }
  /// @internal
  parseDialect(dialect) {
    let values2 = Object.keys(this.dialects), flags = values2.map(() => false);
    if (dialect)
      for (let part of dialect.split(" ")) {
        let id2 = values2.indexOf(part);
        if (id2 >= 0)
          flags[id2] = true;
      }
    let disabled = null;
    for (let i = 0; i < values2.length; i++)
      if (!flags[i]) {
        for (let j = this.dialects[values2[i]], id2; (id2 = this.data[j++]) != 65535; )
          (disabled || (disabled = new Uint8Array(this.maxTerm + 1)))[id2] = 1;
      }
    return new Dialect(dialect, flags, disabled);
  }
  /// Used by the output of the parser generator. Not available to
  /// user code. @hide
  static deserialize(spec) {
    return new _LRParser(spec);
  }
};
function pair(data, off) {
  return data[off] | data[off + 1] << 16;
}
function findFinished(stacks) {
  let best = null;
  for (let stack of stacks) {
    let stopped = stack.p.stoppedAt;
    if ((stack.pos == stack.p.stream.end || stopped != null && stack.pos > stopped) && stack.p.parser.stateFlag(
      stack.state,
      2
      /* StateFlag.Accepting */
    ) && (!best || best.score < stack.score))
      best = stack;
  }
  return best;
}
function getSpecializer(spec) {
  if (spec.external) {
    let mask = spec.extend ? 1 : 0;
    return (value, stack) => spec.external(value, stack) << 1 | mask;
  }
  return spec.get;
}

// node_modules/.pnpm/@lezer+html@1.3.6/node_modules/@lezer/html/dist/index.js
var scriptText = 54;
var StartCloseScriptTag = 1;
var styleText = 55;
var StartCloseStyleTag = 2;
var textareaText = 56;
var StartCloseTextareaTag = 3;
var EndTag = 4;
var SelfClosingEndTag = 5;
var StartTag = 6;
var StartScriptTag = 7;
var StartStyleTag = 8;
var StartTextareaTag = 9;
var StartSelfClosingTag = 10;
var StartCloseTag = 11;
var NoMatchStartCloseTag = 12;
var MismatchedStartCloseTag = 13;
var missingCloseTag = 57;
var IncompleteCloseTag = 14;
var commentContent$1 = 58;
var Element = 20;
var TagName = 22;
var Attribute = 23;
var AttributeName = 24;
var AttributeValue = 26;
var UnquotedAttributeValue = 27;
var ScriptText = 28;
var StyleText = 31;
var TextareaText = 34;
var OpenTag = 36;
var CloseTag = 37;
var Dialect_noMatch = 0;
var Dialect_selfClosing = 1;
var selfClosers = {
  area: true,
  base: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
  menuitem: true
};
var implicitlyClosed = {
  dd: true,
  li: true,
  optgroup: true,
  option: true,
  p: true,
  rp: true,
  rt: true,
  tbody: true,
  td: true,
  tfoot: true,
  th: true,
  tr: true
};
var closeOnOpen = {
  dd: { dd: true, dt: true },
  dt: { dd: true, dt: true },
  li: { li: true },
  option: { option: true, optgroup: true },
  optgroup: { optgroup: true },
  p: {
    address: true,
    article: true,
    aside: true,
    blockquote: true,
    dir: true,
    div: true,
    dl: true,
    fieldset: true,
    footer: true,
    form: true,
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
    header: true,
    hgroup: true,
    hr: true,
    menu: true,
    nav: true,
    ol: true,
    p: true,
    pre: true,
    section: true,
    table: true,
    ul: true
  },
  rp: { rp: true, rt: true },
  rt: { rp: true, rt: true },
  tbody: { tbody: true, tfoot: true },
  td: { td: true, th: true },
  tfoot: { tbody: true },
  th: { td: true, th: true },
  thead: { tbody: true, tfoot: true },
  tr: { tr: true }
};
function nameChar(ch) {
  return ch == 45 || ch == 46 || ch == 58 || ch >= 65 && ch <= 90 || ch == 95 || ch >= 97 && ch <= 122 || ch >= 161;
}
function isSpace(ch) {
  return ch == 9 || ch == 10 || ch == 13 || ch == 32;
}
var cachedName = null;
var cachedInput = null;
var cachedPos = 0;
function tagNameAfter(input, offset) {
  let pos = input.pos + offset;
  if (cachedPos == pos && cachedInput == input)
    return cachedName;
  let next = input.peek(offset);
  while (isSpace(next))
    next = input.peek(++offset);
  let name = "";
  for (; ; ) {
    if (!nameChar(next))
      break;
    name += String.fromCharCode(next);
    next = input.peek(++offset);
  }
  cachedInput = input;
  cachedPos = pos;
  return cachedName = name ? name.toLowerCase() : next == question || next == bang ? void 0 : null;
}
var lessThan = 60;
var greaterThan = 62;
var slash = 47;
var question = 63;
var bang = 33;
var dash = 45;
function ElementContext(name, parent) {
  this.name = name;
  this.parent = parent;
  this.hash = parent ? parent.hash : 0;
  for (let i = 0; i < name.length; i++)
    this.hash += (this.hash << 4) + name.charCodeAt(i) + (name.charCodeAt(i) << 8);
}
var startTagTerms = [StartTag, StartSelfClosingTag, StartScriptTag, StartStyleTag, StartTextareaTag];
var elementContext = new ContextTracker({
  start: null,
  shift(context, term, stack, input) {
    return startTagTerms.indexOf(term) > -1 ? new ElementContext(tagNameAfter(input, 1) || "", context) : context;
  },
  reduce(context, term) {
    return term == Element && context ? context.parent : context;
  },
  reuse(context, node, stack, input) {
    let type = node.type.id;
    return type == StartTag || type == OpenTag ? new ElementContext(tagNameAfter(input, 1) || "", context) : context;
  },
  hash(context) {
    return context ? context.hash : 0;
  },
  strict: false
});
var tagStart = new ExternalTokenizer((input, stack) => {
  if (input.next != lessThan) {
    if (input.next < 0 && stack.context)
      input.acceptToken(missingCloseTag);
    return;
  }
  input.advance();
  let close = input.next == slash;
  if (close)
    input.advance();
  let name = tagNameAfter(input, 0);
  if (name === void 0)
    return;
  if (!name)
    return input.acceptToken(close ? IncompleteCloseTag : StartTag);
  let parent = stack.context ? stack.context.name : null;
  if (close) {
    if (name == parent)
      return input.acceptToken(StartCloseTag);
    if (parent && implicitlyClosed[parent])
      return input.acceptToken(missingCloseTag, -2);
    if (stack.dialectEnabled(Dialect_noMatch))
      return input.acceptToken(NoMatchStartCloseTag);
    for (let cx = stack.context; cx; cx = cx.parent)
      if (cx.name == name)
        return;
    input.acceptToken(MismatchedStartCloseTag);
  } else {
    if (name == "script")
      return input.acceptToken(StartScriptTag);
    if (name == "style")
      return input.acceptToken(StartStyleTag);
    if (name == "textarea")
      return input.acceptToken(StartTextareaTag);
    if (selfClosers.hasOwnProperty(name))
      return input.acceptToken(StartSelfClosingTag);
    if (parent && closeOnOpen[parent] && closeOnOpen[parent][name])
      input.acceptToken(missingCloseTag, -1);
    else
      input.acceptToken(StartTag);
  }
}, { contextual: true });
var commentContent = new ExternalTokenizer((input) => {
  for (let dashes = 0, i = 0; ; i++) {
    if (input.next < 0) {
      if (i)
        input.acceptToken(commentContent$1);
      break;
    }
    if (input.next == dash) {
      dashes++;
    } else if (input.next == greaterThan && dashes >= 2) {
      if (i > 3)
        input.acceptToken(commentContent$1, -2);
      break;
    } else {
      dashes = 0;
    }
    input.advance();
  }
});
function inForeignElement(context) {
  for (; context; context = context.parent)
    if (context.name == "svg" || context.name == "math")
      return true;
  return false;
}
var endTag = new ExternalTokenizer((input, stack) => {
  if (input.next == slash && input.peek(1) == greaterThan) {
    let selfClosing = stack.dialectEnabled(Dialect_selfClosing) || inForeignElement(stack.context);
    input.acceptToken(selfClosing ? SelfClosingEndTag : EndTag, 2);
  } else if (input.next == greaterThan) {
    input.acceptToken(EndTag, 1);
  }
});
function contentTokenizer(tag, textToken, endToken) {
  let lastState = 2 + tag.length;
  return new ExternalTokenizer((input) => {
    for (let state = 0, matchedLen = 0, i = 0; ; i++) {
      if (input.next < 0) {
        if (i)
          input.acceptToken(textToken);
        break;
      }
      if (state == 0 && input.next == lessThan || state == 1 && input.next == slash || state >= 2 && state < lastState && input.next == tag.charCodeAt(state - 2)) {
        state++;
        matchedLen++;
      } else if ((state == 2 || state == lastState) && isSpace(input.next)) {
        matchedLen++;
      } else if (state == lastState && input.next == greaterThan) {
        if (i > matchedLen)
          input.acceptToken(textToken, -matchedLen);
        else
          input.acceptToken(endToken, -(matchedLen - 2));
        break;
      } else if ((input.next == 10 || input.next == 13) && i) {
        input.acceptToken(textToken, 1);
        break;
      } else {
        state = matchedLen = 0;
      }
      input.advance();
    }
  });
}
var scriptTokens = contentTokenizer("script", scriptText, StartCloseScriptTag);
var styleTokens = contentTokenizer("style", styleText, StartCloseStyleTag);
var textareaTokens = contentTokenizer("textarea", textareaText, StartCloseTextareaTag);
var htmlHighlighting = styleTags({
  "Text RawText": tags.content,
  "StartTag StartCloseTag SelfClosingEndTag EndTag": tags.angleBracket,
  TagName: tags.tagName,
  "MismatchedCloseTag/TagName": [tags.tagName, tags.invalid],
  AttributeName: tags.attributeName,
  "AttributeValue UnquotedAttributeValue": tags.attributeValue,
  Is: tags.definitionOperator,
  "EntityReference CharacterReference": tags.character,
  Comment: tags.blockComment,
  ProcessingInst: tags.processingInstruction,
  DoctypeDecl: tags.documentMeta
});
var parser = LRParser.deserialize({
  version: 14,
  states: ",xOVO!rOOO!WQ#tO'#CqO!]Q#tO'#CzO!bQ#tO'#C}O!gQ#tO'#DQO!lQ#tO'#DSO!qOaO'#CpO!|ObO'#CpO#XOdO'#CpO$eO!rO'#CpOOO`'#Cp'#CpO$lO$fO'#DTO$tQ#tO'#DVO$yQ#tO'#DWOOO`'#Dk'#DkOOO`'#DY'#DYQVO!rOOO%OQ&rO,59]O%WQ&rO,59fO%`Q&rO,59iO%hQ&rO,59lO%sQ&rO,59nOOOa'#D^'#D^O%{OaO'#CxO&WOaO,59[OOOb'#D_'#D_O&`ObO'#C{O&kObO,59[OOOd'#D`'#D`O&sOdO'#DOO'OOdO,59[OOO`'#Da'#DaO'WO!rO,59[O'_Q#tO'#DROOO`,59[,59[OOOp'#Db'#DbO'dO$fO,59oOOO`,59o,59oO'lQ#|O,59qO'qQ#|O,59rOOO`-E7W-E7WO'vQ&rO'#CsOOQW'#DZ'#DZO(UQ&rO1G.wOOOa1G.w1G.wO(^Q&rO1G/QOOOb1G/Q1G/QO(fQ&rO1G/TOOOd1G/T1G/TO(nQ&rO1G/WOOO`1G/W1G/WOOO`1G/Y1G/YO(yQ&rO1G/YOOOa-E7[-E7[O)RQ#tO'#CyOOO`1G.v1G.vOOOb-E7]-E7]O)WQ#tO'#C|OOOd-E7^-E7^O)]Q#tO'#DPOOO`-E7_-E7_O)bQ#|O,59mOOOp-E7`-E7`OOO`1G/Z1G/ZOOO`1G/]1G/]OOO`1G/^1G/^O)gQ,UO,59_OOQW-E7X-E7XOOOa7+$c7+$cOOOb7+$l7+$lOOOd7+$o7+$oOOO`7+$r7+$rOOO`7+$t7+$tO)rQ#|O,59eO)wQ#|O,59hO)|Q#|O,59kOOO`1G/X1G/XO*RO7[O'#CvO*dOMhO'#CvOOQW1G.y1G.yOOO`1G/P1G/POOO`1G/S1G/SOOO`1G/V1G/VOOOO'#D['#D[O*uO7[O,59bOOQW,59b,59bOOOO'#D]'#D]O+WOMhO,59bOOOO-E7Y-E7YOOQW1G.|1G.|OOOO-E7Z-E7Z",
  stateData: "+s~O!^OS~OUSOVPOWQOXROYTO[]O][O^^O`^Oa^Ob^Oc^Ox^O{_O!dZO~OfaO~OfbO~OfcO~OfdO~OfeO~O!WfOPlP!ZlP~O!XiOQoP!ZoP~O!YlORrP!ZrP~OUSOVPOWQOXROYTOZqO[]O][O^^O`^Oa^Ob^Oc^Ox^O!dZO~O!ZrO~P#dO![sO!euO~OfvO~OfwO~OS|OhyO~OS!OOhyO~OS!QOhyO~OS!SOT!TOhyO~OS!TOhyO~O!WfOPlX!ZlX~OP!WO!Z!XO~O!XiOQoX!ZoX~OQ!ZO!Z!XO~O!YlORrX!ZrX~OR!]O!Z!XO~O!Z!XO~P#dOf!_O~O![sO!e!aO~OS!bO~OS!cO~Oi!dOSgXhgXTgX~OS!fOhyO~OS!gOhyO~OS!hOhyO~OS!iOT!jOhyO~OS!jOhyO~Of!kO~Of!lO~Of!mO~OS!nO~Ok!qO!`!oO!b!pO~OS!rO~OS!sO~OS!tO~Oa!uOb!uOc!uO!`!wO!a!uO~Oa!xOb!xOc!xO!b!wO!c!xO~Oa!uOb!uOc!uO!`!{O!a!uO~Oa!xOb!xOc!xO!b!{O!c!xO~OT~bac!dx{!d~",
  goto: "%p!`PPPPPPPPPPPPPPPPPPPP!a!gP!mPP!yP!|#P#S#Y#]#`#f#i#l#r#x!aP!a!aP$O$U$l$r$x%O%U%[%bPPPPPPPP%hX^OX`pXUOX`pezabcde{}!P!R!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ}bQ!PcQ!RdQ!UeZ!e{}!P!R!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
  nodeNames: "⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
  maxTerm: 67,
  context: elementContext,
  nodeProps: [
    ["closedBy", -10, 1, 2, 3, 7, 8, 9, 10, 11, 12, 13, "EndTag", 6, "EndTag SelfClosingEndTag", -4, 21, 30, 33, 36, "CloseTag"],
    ["openedBy", 4, "StartTag StartCloseTag", 5, "StartTag", -4, 29, 32, 35, 37, "OpenTag"],
    ["group", -9, 14, 17, 18, 19, 20, 39, 40, 41, 42, "Entity", 16, "Entity TextContent", -3, 28, 31, 34, "TextContent Entity"]
  ],
  propSources: [htmlHighlighting],
  skippedNodes: [0],
  repeatNodeCount: 9,
  tokenData: "!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|c`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bX`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UV`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pT`POv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!cpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({W`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!a`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!a`!cpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYkWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]``P!a`!cp!^^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebhSkWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXhSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vchS`P!a`!cpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!`h`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WihSkWc!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zbkWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOa!R!R7tP;=`<%l7S!Z8OYkWa!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{ihSkWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbhSkWa!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QchSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXhSa!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TakWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOb!R!RAwP;=`<%lAY!ZBRYkWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbhSkWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbhSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXhSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!bx`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYlhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_khS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_X`P!a`!cp!eQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZhSfQ`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!a`!cpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!a`!cp!dPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!a`!cpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!a`!cpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!a`!cpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!a`!cpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!a`!cpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!a`!cpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!a`!cpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!cpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO{PP!-nP;=`<%l!-Sq!-xS!cp{POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!a`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!a`{POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!a`!cp{POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!a`!cpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!a`!cpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!a`!cpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!a`!cpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!a`!cpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!a`!cpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!cpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOxPP!7TP;=`<%l!6Vq!7]V!cpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!cpxPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!a`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!a`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!a`xPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!a`!cpxPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXiS`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",
  tokenizers: [scriptTokens, styleTokens, textareaTokens, endTag, tagStart, commentContent, 0, 1, 2, 3, 4, 5],
  topRules: { "Document": [0, 15] },
  dialects: { noMatch: 0, selfClosing: 485 },
  tokenPrec: 487
});
function getAttrs(openTag, input) {
  let attrs = /* @__PURE__ */ Object.create(null);
  for (let att of openTag.getChildren(Attribute)) {
    let name = att.getChild(AttributeName), value = att.getChild(AttributeValue) || att.getChild(UnquotedAttributeValue);
    if (name)
      attrs[input.read(name.from, name.to)] = !value ? "" : value.type.id == AttributeValue ? input.read(value.from + 1, value.to - 1) : input.read(value.from, value.to);
  }
  return attrs;
}
function findTagName(openTag, input) {
  let tagNameNode = openTag.getChild(TagName);
  return tagNameNode ? input.read(tagNameNode.from, tagNameNode.to) : " ";
}
function maybeNest(node, input, tags3) {
  let attrs;
  for (let tag of tags3) {
    if (!tag.attrs || tag.attrs(attrs || (attrs = getAttrs(node.node.parent.firstChild, input))))
      return { parser: tag.parser };
  }
  return null;
}
function configureNesting(tags3 = [], attributes = []) {
  let script = [], style = [], textarea = [], other = [];
  for (let tag of tags3) {
    let array = tag.tag == "script" ? script : tag.tag == "style" ? style : tag.tag == "textarea" ? textarea : other;
    array.push(tag);
  }
  let attrs = attributes.length ? /* @__PURE__ */ Object.create(null) : null;
  for (let attr of attributes)
    (attrs[attr.name] || (attrs[attr.name] = [])).push(attr);
  return parseMixed((node, input) => {
    let id2 = node.type.id;
    if (id2 == ScriptText)
      return maybeNest(node, input, script);
    if (id2 == StyleText)
      return maybeNest(node, input, style);
    if (id2 == TextareaText)
      return maybeNest(node, input, textarea);
    if (id2 == Element && other.length) {
      let n = node.node, open = n.firstChild, tagName = open && findTagName(open, input), attrs2;
      if (tagName)
        for (let tag of other) {
          if (tag.tag == tagName && (!tag.attrs || tag.attrs(attrs2 || (attrs2 = getAttrs(n, input))))) {
            let close = n.lastChild;
            return { parser: tag.parser, overlay: [{ from: open.to, to: close.type.id == CloseTag ? close.from : n.to }] };
          }
        }
    }
    if (attrs && id2 == Attribute) {
      let n = node.node, nameNode;
      if (nameNode = n.firstChild) {
        let matches = attrs[input.read(nameNode.from, nameNode.to)];
        if (matches)
          for (let attr of matches) {
            if (attr.tagName && attr.tagName != findTagName(n.parent, input))
              continue;
            let value = n.lastChild;
            if (value.type.id == AttributeValue) {
              let from = value.from + 1;
              let last = value.lastChild, to = value.to - (last && last.isError ? 0 : 1);
              if (to > from)
                return { parser: attr.parser, overlay: [{ from, to }] };
            } else if (value.type.id == UnquotedAttributeValue) {
              return { parser: attr.parser, overlay: [{ from: value.from, to: value.to }] };
            }
          }
      }
    }
    return null;
  });
}

// node_modules/.pnpm/@lezer+css@1.1.3/node_modules/@lezer/css/dist/index.js
var descendantOp = 96;
var Unit = 1;
var callee = 97;
var identifier = 98;
var VariableName = 2;
var space = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288
];
var colon = 58;
var parenL = 40;
var underscore = 95;
var bracketL = 91;
var dash2 = 45;
var period = 46;
var hash = 35;
var percent = 37;
function isAlpha(ch) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 161;
}
function isDigit(ch) {
  return ch >= 48 && ch <= 57;
}
var identifiers = new ExternalTokenizer((input, stack) => {
  for (let inside = false, dashes = 0, i = 0; ; i++) {
    let { next } = input;
    if (isAlpha(next) || next == dash2 || next == underscore || inside && isDigit(next)) {
      if (!inside && (next != dash2 || i > 0))
        inside = true;
      if (dashes === i && next == dash2)
        dashes++;
      input.advance();
    } else {
      if (inside)
        input.acceptToken(next == parenL ? callee : dashes == 2 && stack.canShift(VariableName) ? VariableName : identifier);
      break;
    }
  }
});
var descendant = new ExternalTokenizer((input) => {
  if (space.includes(input.peek(-1))) {
    let { next } = input;
    if (isAlpha(next) || next == underscore || next == hash || next == period || next == bracketL || next == colon || next == dash2)
      input.acceptToken(descendantOp);
  }
});
var unitToken = new ExternalTokenizer((input) => {
  if (!space.includes(input.peek(-1))) {
    let { next } = input;
    if (next == percent) {
      input.advance();
      input.acceptToken(Unit);
    }
    if (isAlpha(next)) {
      do {
        input.advance();
      } while (isAlpha(input.next));
      input.acceptToken(Unit);
    }
  }
});
var cssHighlighting = styleTags({
  "AtKeyword import charset namespace keyframes media supports": tags.definitionKeyword,
  "from to selector": tags.keyword,
  NamespaceName: tags.namespace,
  KeyframeName: tags.labelName,
  KeyframeRangeName: tags.operatorKeyword,
  TagName: tags.tagName,
  ClassName: tags.className,
  PseudoClassName: tags.constant(tags.className),
  IdName: tags.labelName,
  "FeatureName PropertyName": tags.propertyName,
  AttributeName: tags.attributeName,
  NumberLiteral: tags.number,
  KeywordQuery: tags.keyword,
  UnaryQueryOp: tags.operatorKeyword,
  "CallTag ValueName": tags.atom,
  VariableName: tags.variableName,
  Callee: tags.operatorKeyword,
  Unit: tags.unit,
  "UniversalSelector NestingSelector": tags.definitionOperator,
  MatchOp: tags.compareOperator,
  "ChildOp SiblingOp, LogicOp": tags.logicOperator,
  BinOp: tags.arithmeticOperator,
  Important: tags.modifier,
  Comment: tags.blockComment,
  ColorLiteral: tags.color,
  "ParenthesizedContent StringLiteral": tags.string,
  ":": tags.punctuation,
  "PseudoOp #": tags.derefOperator,
  "; ,": tags.separator,
  "( )": tags.paren,
  "[ ]": tags.squareBracket,
  "{ }": tags.brace
});
var spec_callee = { __proto__: null, lang: 32, "nth-child": 32, "nth-last-child": 32, "nth-of-type": 32, "nth-last-of-type": 32, dir: 32, "host-context": 32, url: 60, "url-prefix": 60, domain: 60, regexp: 60, selector: 134 };
var spec_AtKeyword = { __proto__: null, "@import": 114, "@media": 138, "@charset": 142, "@namespace": 146, "@keyframes": 152, "@supports": 164 };
var spec_identifier = { __proto__: null, not: 128, only: 128 };
var parser2 = LRParser.deserialize({
  version: 14,
  states: "9bQYQ[OOO#_Q[OOP#fOWOOOOQP'#Cd'#CdOOQP'#Cc'#CcO#kQ[O'#CfO$_QXO'#CaO$fQ[O'#ChO$qQ[O'#DPO$vQ[O'#DTOOQP'#Ej'#EjO${QdO'#DeO%gQ[O'#DrO${QdO'#DtO%xQ[O'#DvO&TQ[O'#DyO&]Q[O'#EPO&kQ[O'#EROOQS'#Ei'#EiOOQS'#EU'#EUQYQ[OOO&rQXO'#CdO'gQWO'#DaO'lQWO'#EpO'wQ[O'#EpQOQWOOP(RO#tO'#C_POOO)C@X)C@XOOQP'#Cg'#CgOOQP,59Q,59QO#kQ[O,59QO(^Q[O'#EXO(xQWO,58{O)QQ[O,59SO$qQ[O,59kO$vQ[O,59oO(^Q[O,59sO(^Q[O,59uO(^Q[O,59vO)]Q[O'#D`OOQS,58{,58{OOQP'#Ck'#CkOOQO'#C}'#C}OOQP,59S,59SO)dQWO,59SO)iQWO,59SOOQP'#DR'#DROOQP,59k,59kOOQO'#DV'#DVO)nQ`O,59oOOQS'#Cp'#CpO${QdO'#CqO)vQvO'#CsO+TQtO,5:POOQO'#Cx'#CxO)iQWO'#CwO+iQWO'#CyOOQS'#Em'#EmOOQO'#Dh'#DhO+nQ[O'#DoO+|QWO'#EqO&]Q[O'#DmO,[QWO'#DpOOQO'#Er'#ErO({QWO,5:^O,aQpO,5:`OOQS'#Dx'#DxO,iQWO,5:bO,nQ[O,5:bOOQO'#D{'#D{O,vQWO,5:eO,{QWO,5:kO-TQWO,5:mOOQS-E8S-E8SO${QdO,59{O-]Q[O'#EZO-jQWO,5;[O-jQWO,5;[POOO'#ET'#ETP-uO#tO,58yPOOO,58y,58yOOQP1G.l1G.lO.lQXO,5:sOOQO-E8V-E8VOOQS1G.g1G.gOOQP1G.n1G.nO)dQWO1G.nO)iQWO1G.nOOQP1G/V1G/VO.yQ`O1G/ZO/dQXO1G/_O/zQXO1G/aO0bQXO1G/bO0xQWO,59zO0}Q[O'#DOO1UQdO'#CoOOQP1G/Z1G/ZO${QdO1G/ZO1]QpO,59]OOQS,59_,59_O${QdO,59aO1eQWO1G/kOOQS,59c,59cO1jQ!bO,59eO1rQWO'#DhO1}QWO,5:TO2SQWO,5:ZO&]Q[O,5:VO&]Q[O'#E[O2[QWO,5;]O2gQWO,5:XO(^Q[O,5:[OOQS1G/x1G/xOOQS1G/z1G/zOOQS1G/|1G/|O2xQWO1G/|O2}QdO'#D|OOQS1G0P1G0POOQS1G0V1G0VOOQS1G0X1G0XO3YQtO1G/gOOQO,5:u,5:uO3pQ[O,5:uOOQO-E8X-E8XO3}QWO1G0vPOOO-E8R-E8RPOOO1G.e1G.eOOQP7+$Y7+$YOOQP7+$u7+$uO${QdO7+$uOOQS1G/f1G/fO4YQXO'#EoO4aQWO,59jO4fQtO'#EVO5ZQdO'#ElO5eQWO,59ZO5jQpO7+$uOOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%V7+%VO5rQWO1G/PO${QdO1G/oOOQO1G/u1G/uOOQO1G/q1G/qO5wQWO,5:vOOQO-E8Y-E8YO6VQXO1G/vOOQS7+%h7+%hO6^QYO'#CsOOQO'#EO'#EOO6iQ`O'#D}OOQO'#D}'#D}O6tQWO'#E]O6|QdO,5:hOOQS,5:h,5:hO7XQtO'#EYO${QdO'#EYO8VQdO7+%ROOQO7+%R7+%ROOQO1G0a1G0aO8jQpO<<HaO8rQWO,5;ZOOQP1G/U1G/UOOQS-E8T-E8TO${QdO'#EWO8zQWO,5;WOOQT1G.u1G.uOOQP<<Ha<<HaOOQS7+$k7+$kO9SQdO7+%ZOOQO7+%b7+%bOOQO,5:i,5:iO3QQdO'#E^O6tQWO,5:wOOQS,5:w,5:wOOQS-E8Z-E8ZOOQS1G0S1G0SO9ZQtO,5:tOOQS-E8W-E8WOOQO<<Hm<<HmOOQPAN={AN={O:XQdO,5:rOOQO-E8U-E8UOOQO<<Hu<<HuOOQO,5:x,5:xOOQO-E8[-E8[OOQS1G0c1G0c",
  stateData: ":k~O#WOS#XQQ~OUYOXYO]VO^VOtWOxXO!YaO!ZZO!g[O!i]O!k^O!n_O!t`O#URO#_TO~OQfOUYOXYO]VO^VOtWOxXO!YaO!ZZO!g[O!i]O!k^O!n_O!t`O#UeO#_TO~O#R#dP~P!ZO#XjO~O#UlO~O]qO^qOpoOtrOxsO|tO!PvO#SuO#_nO~O!RwO~P#pO`}O#TzO#UyO~O#U!OO~O#U!QO~OQ!ZOb!TOf!ZOh!ZOn!YO#T!WO#U!SO#b!UO~Ob!]O!b!_O!e!`O#U![O!R#eP~Oh!eOn!YO#U!dO~Oh!gO#U!gO~Ob!]O!b!_O!e!`O#U![O~O!W#eP~P%gO]WX]!UX^WXpWXtWXxWX|WX!PWX!RWX#SWX#_WX~O]!lO~O!W!mO#R#dX!Q#dX~O#R#dX!Q#dX~P!ZO#Y!pO#Z!pO#[!rO~OUYOXYO]VO^VOtWOxXO#URO#_TO~OpoO!RwO~O`!yO#TzO#UyO~O!Q#dP~P!ZOb#QO~Ob#RO~Ov#SOz#TO~OP#VObgXjgX!WgX!bgX!egX#UgXagXQgXfgXhgXngXpgX!VgX#RgX#TgX#bgXvgX!QgX~Ob!]Oj#WO!b!_O!e!`O#U![O!W#eP~Ob#ZO~Ob!]O!b!_O!e!`O#U#[O~Op#`O!`#_O!R#eX!W#eX~Ob#cO~Oj#WO!W#eO~O!W#fO~Oh#gOn!YO~O!R#hO~O!RwO!`#_O~O!RwO!W#kO~O!W!}X#R!}X!Q!}X~P!ZO!W!mO#R#da!Q#da~O#Y!pO#Z!pO#[#rO~O]qO^qOtrOxsO|tO!PvO#SuO#_nO~Op!{a!R!{aa!{a~P.QOv#tOz#uO~O]qO^qOtrOxsO#_nO~Op{i|{i!P{i!R{i#S{ia{i~P/ROp}i|}i!P}i!R}i#S}ia}i~P/ROp!Oi|!Oi!P!Oi!R!Oi#S!Oia!Oi~P/RO!Q#vO~Oa#cP~P(^Oa#`P~P${Oa#}Oj#WO~O!W$PO~Oh$QOo$QO~O]!^Xa![X!`![X~O]$RO~Oa$SO!`#_O~Op#`O!R#ea!W#ea~O!`#_Op!aa!R!aa!W!aaa!aa~O!W$XO~O!Q$`O#U$ZO#b$YO~Oj#WOp$bO!V$dO!W!Ti#R!Ti!Q!Ti~P${O!W!}a#R!}a!Q!}a~P!ZO!W!mO#R#di!Q#di~Oa#cX~P#pOa$hO~Oj#WOQ!yXa!yXb!yXf!yXh!yXn!yXp!yX#T!yX#U!yX#b!yX~Op$jOa#`X~P${Oa$lO~Oj#WOv$mO~Oa$nO~O!`#_Op#Oa!R#Oa!W#Oa~Oa$pO~P.QOP#VOpgX!RgX~O#b$YOp!qX!R!qX~Op$rO!RwO~O!Q$vO#U$ZO#b$YO~Oj#WOQ!|Xb!|Xf!|Xh!|Xn!|Xp!|X!V!|X!W!|X#R!|X#T!|X#U!|X#b!|X!Q!|X~Op$bO!V$yO!W!Tq#R!Tq!Q!Tq~P${Oj#WOv$zO~OpoOa#ca~Op$jOa#`a~Oa$}O~P${Oj#WOQ!|ab!|af!|ah!|an!|ap!|a!V!|a!W!|a#R!|a#T!|a#U!|a#b!|a!Q!|a~Oa!zap!za~P${O#Wo#X#bj!P#b~",
  goto: "-Y#gPPP#hP#kP#t$TP#t$d#tPP$jPPP$p$y$yP%]P$yP$y%w&ZPPP&s&y#tP'PP#tP'VP#tP#t#tPPP']'r(PPP#kPP(W(W(b(WP(WP(W(WP#kP#kP#kP(e#kP(h(k(n(u#kP#kP(z)Q)a)o)u*P*V*a*g*mPPPPPPPPPP*s*|P+i+lP,b,e,k,tRkQ_bOPdhw!m#nkYOPdhotuvw!m#Q#c#nkSOPdhotuvw!m#Q#c#nQmTR!snQ{VR!wqQ!w}Q#Y!XR#s!yq!ZZ]!T!l#R#T#W#l#u#z$R$b$c$j$o${p!ZZ]!T!l#R#T#W#l#u#z$R$b$c$j$o${U$]#h$_$rR$q$[q!XZ]!T!l#R#T#W#l#u#z$R$b$c$j$o${p!ZZ]!T!l#R#T#W#l#u#z$R$b$c$j$o${Q!e^R#g!fQ|VR!xqQ!w|R#s!xQ!PWR!zrQ!RXR!{sQxUQ!vpQ#d!bQ#j!iQ#k!jQ$t$^R%Q$sSgPwQ!ohQ#m!mR$e#nZfPhw!m#na!a[`a!V!]!_#_#`R#]!]R!f^R!h_R#i!hS$^#h$_R%O$rV$[#h$_$rQ!qjR#q!qQdOShPwU!kdh#nR#n!mQ#z#RU$i#z$o${Q$o$RR${$jQ$k#zR$|$kQpUS!up$gR$g#wQ$c#lR$x$cQ!ngS#o!n#pR#p!oQ#a!^R$V#aQ$_#hR$u$_Q$s$^R%P$s_cOPdhw!m#n^UOPdhw!m#nQ!toQ!|tQ!}uQ#OvQ#w#QR$W#cR#{#RQ!VZQ!c]Q#U!TQ#l!l[#y#R#z$R$j$o${Q#|#TQ$O#WS$a#l$cQ$f#uR$w$bR#x#QQiPR#PwQ!b[Q!jaR#X!VU!^[a!VQ!i`Q#^!]Q#b!_Q$T#_R$U#`",
  nodeNames: "⚠ Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent , PseudoClassName ArgList IdSelector # IdName ] AttributeSelector [ AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports AtRule Styles",
  maxTerm: 114,
  nodeProps: [
    ["openedBy", 17, "(", 48, "{"],
    ["closedBy", 18, ")", 49, "}"]
  ],
  propSources: [cssHighlighting],
  skippedNodes: [0, 3, 85],
  repeatNodeCount: 10,
  tokenData: "J^~R!^OX$}X^%u^p$}pq%uqr)Xrs.Rst/utu6duv$}vw7^wx7oxy9^yz9oz{9t{|:_|}?Q}!O?c!O!P@Q!P!Q@i!Q![Ab![!]B]!]!^CX!^!_$}!_!`Cj!`!aC{!a!b$}!b!cDw!c!}$}!}#OFa#O#P$}#P#QFr#Q#R6d#R#T$}#T#UGT#U#c$}#c#dHf#d#o$}#o#pH{#p#q6d#q#rI^#r#sIo#s#y$}#y#z%u#z$f$}$f$g%u$g#BY$}#BY#BZ%u#BZ$IS$}$IS$I_%u$I_$I|$}$I|$JO%u$JO$JT$}$JT$JU%u$JU$KV$}$KV$KW%u$KW&FU$}&FU&FV%u&FV;'S$};'S;=`JW<%lO$}`%QSOy%^z;'S%^;'S;=`%o<%lO%^`%cSo`Oy%^z;'S%^;'S;=`%o<%lO%^`%rP;=`<%l%^~%zh#W~OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^~'mh#W~o`OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^l)[UOy%^z#]%^#]#^)n#^;'S%^;'S;=`%o<%lO%^l)sUo`Oy%^z#a%^#a#b*V#b;'S%^;'S;=`%o<%lO%^l*[Uo`Oy%^z#d%^#d#e*n#e;'S%^;'S;=`%o<%lO%^l*sUo`Oy%^z#c%^#c#d+V#d;'S%^;'S;=`%o<%lO%^l+[Uo`Oy%^z#f%^#f#g+n#g;'S%^;'S;=`%o<%lO%^l+sUo`Oy%^z#h%^#h#i,V#i;'S%^;'S;=`%o<%lO%^l,[Uo`Oy%^z#T%^#T#U,n#U;'S%^;'S;=`%o<%lO%^l,sUo`Oy%^z#b%^#b#c-V#c;'S%^;'S;=`%o<%lO%^l-[Uo`Oy%^z#h%^#h#i-n#i;'S%^;'S;=`%o<%lO%^l-uS!V[o`Oy%^z;'S%^;'S;=`%o<%lO%^~.UWOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o<%lO.R~.sOh~~.vRO;'S.R;'S;=`/P;=`O.R~/SXOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o;=`<%l.R<%lO.R~/rP;=`<%l.Rn/zYtQOy%^z!Q%^!Q![0j![!c%^!c!i0j!i#T%^#T#Z0j#Z;'S%^;'S;=`%o<%lO%^l0oYo`Oy%^z!Q%^!Q![1_![!c%^!c!i1_!i#T%^#T#Z1_#Z;'S%^;'S;=`%o<%lO%^l1dYo`Oy%^z!Q%^!Q![2S![!c%^!c!i2S!i#T%^#T#Z2S#Z;'S%^;'S;=`%o<%lO%^l2ZYf[o`Oy%^z!Q%^!Q![2y![!c%^!c!i2y!i#T%^#T#Z2y#Z;'S%^;'S;=`%o<%lO%^l3QYf[o`Oy%^z!Q%^!Q![3p![!c%^!c!i3p!i#T%^#T#Z3p#Z;'S%^;'S;=`%o<%lO%^l3uYo`Oy%^z!Q%^!Q![4e![!c%^!c!i4e!i#T%^#T#Z4e#Z;'S%^;'S;=`%o<%lO%^l4lYf[o`Oy%^z!Q%^!Q![5[![!c%^!c!i5[!i#T%^#T#Z5[#Z;'S%^;'S;=`%o<%lO%^l5aYo`Oy%^z!Q%^!Q![6P![!c%^!c!i6P!i#T%^#T#Z6P#Z;'S%^;'S;=`%o<%lO%^l6WSf[o`Oy%^z;'S%^;'S;=`%o<%lO%^d6gUOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^d7QSzSo`Oy%^z;'S%^;'S;=`%o<%lO%^b7cSXQOy%^z;'S%^;'S;=`%o<%lO%^~7rWOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W<%lO7o~8_RO;'S7o;'S;=`8h;=`O7o~8kXOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W;=`<%l7o<%lO7o~9ZP;=`<%l7on9cSb^Oy%^z;'S%^;'S;=`%o<%lO%^~9tOa~n9{UUQjWOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^n:fWjW!PQOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^l;TUo`Oy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^l;nYo`#b[Oy%^z!Q%^!Q![;g![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^l<cYo`Oy%^z{%^{|=R|}%^}!O=R!O!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=WUo`Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=qUo`#b[Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l>[[o`#b[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^n?VSp^Oy%^z;'S%^;'S;=`%o<%lO%^l?hWjWOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^n@VU#_QOy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^~@nTjWOy%^z{@}{;'S%^;'S;=`%o<%lO%^~AUSo`#X~Oy%^z;'S%^;'S;=`%o<%lO%^lAg[#b[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^bBbU]QOy%^z![%^![!]Bt!];'S%^;'S;=`%o<%lO%^bB{S^Qo`Oy%^z;'S%^;'S;=`%o<%lO%^nC^S!W^Oy%^z;'S%^;'S;=`%o<%lO%^dCoSzSOy%^z;'S%^;'S;=`%o<%lO%^bDQU|QOy%^z!`%^!`!aDd!a;'S%^;'S;=`%o<%lO%^bDkS|Qo`Oy%^z;'S%^;'S;=`%o<%lO%^bDzWOy%^z!c%^!c!}Ed!}#T%^#T#oEd#o;'S%^;'S;=`%o<%lO%^bEk[!YQo`Oy%^z}%^}!OEd!O!Q%^!Q![Ed![!c%^!c!}Ed!}#T%^#T#oEd#o;'S%^;'S;=`%o<%lO%^bFfSxQOy%^z;'S%^;'S;=`%o<%lO%^lFwSv[Oy%^z;'S%^;'S;=`%o<%lO%^bGWUOy%^z#b%^#b#cGj#c;'S%^;'S;=`%o<%lO%^bGoUo`Oy%^z#W%^#W#XHR#X;'S%^;'S;=`%o<%lO%^bHYS!`Qo`Oy%^z;'S%^;'S;=`%o<%lO%^bHiUOy%^z#f%^#f#gHR#g;'S%^;'S;=`%o<%lO%^fIQS!RUOy%^z;'S%^;'S;=`%o<%lO%^nIcS!Q^Oy%^z;'S%^;'S;=`%o<%lO%^fItU!PQOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^`JZP;=`<%l$}",
  tokenizers: [descendant, unitToken, identifiers, 1, 2, 3, 4, new LocalTokenGroup("m~RRYZ[z{a~~g~aO#Z~~dP!P!Qg~lO#[~~", 28, 102)],
  topRules: { "StyleSheet": [0, 4], "Styles": [1, 84] },
  specialized: [{ term: 97, get: (value) => spec_callee[value] || -1 }, { term: 56, get: (value) => spec_AtKeyword[value] || -1 }, { term: 98, get: (value) => spec_identifier[value] || -1 }],
  tokenPrec: 1169
});

// node_modules/.pnpm/@codemirror+lang-css@6.2.0_@codemirror+view@6.15.3/node_modules/@codemirror/lang-css/dist/index.js
var _properties = null;
function properties() {
  if (!_properties && typeof document == "object" && document.body) {
    let { style } = document.body, names = [], seen = /* @__PURE__ */ new Set();
    for (let prop in style)
      if (prop != "cssText" && prop != "cssFloat") {
        if (typeof style[prop] == "string") {
          if (/[A-Z]/.test(prop))
            prop = prop.replace(/[A-Z]/g, (ch) => "-" + ch.toLowerCase());
          if (!seen.has(prop)) {
            names.push(prop);
            seen.add(prop);
          }
        }
      }
    _properties = names.sort().map((name) => ({ type: "property", label: name }));
  }
  return _properties || [];
}
var pseudoClasses = [
  "active",
  "after",
  "any-link",
  "autofill",
  "backdrop",
  "before",
  "checked",
  "cue",
  "default",
  "defined",
  "disabled",
  "empty",
  "enabled",
  "file-selector-button",
  "first",
  "first-child",
  "first-letter",
  "first-line",
  "first-of-type",
  "focus",
  "focus-visible",
  "focus-within",
  "fullscreen",
  "has",
  "host",
  "host-context",
  "hover",
  "in-range",
  "indeterminate",
  "invalid",
  "is",
  "lang",
  "last-child",
  "last-of-type",
  "left",
  "link",
  "marker",
  "modal",
  "not",
  "nth-child",
  "nth-last-child",
  "nth-last-of-type",
  "nth-of-type",
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "part",
  "placeholder",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "selection",
  "slotted",
  "target",
  "target-text",
  "valid",
  "visited",
  "where"
].map((name) => ({ type: "class", label: name }));
var values = [
  "above",
  "absolute",
  "activeborder",
  "additive",
  "activecaption",
  "after-white-space",
  "ahead",
  "alias",
  "all",
  "all-scroll",
  "alphabetic",
  "alternate",
  "always",
  "antialiased",
  "appworkspace",
  "asterisks",
  "attr",
  "auto",
  "auto-flow",
  "avoid",
  "avoid-column",
  "avoid-page",
  "avoid-region",
  "axis-pan",
  "background",
  "backwards",
  "baseline",
  "below",
  "bidi-override",
  "blink",
  "block",
  "block-axis",
  "bold",
  "bolder",
  "border",
  "border-box",
  "both",
  "bottom",
  "break",
  "break-all",
  "break-word",
  "bullets",
  "button",
  "button-bevel",
  "buttonface",
  "buttonhighlight",
  "buttonshadow",
  "buttontext",
  "calc",
  "capitalize",
  "caps-lock-indicator",
  "caption",
  "captiontext",
  "caret",
  "cell",
  "center",
  "checkbox",
  "circle",
  "cjk-decimal",
  "clear",
  "clip",
  "close-quote",
  "col-resize",
  "collapse",
  "color",
  "color-burn",
  "color-dodge",
  "column",
  "column-reverse",
  "compact",
  "condensed",
  "contain",
  "content",
  "contents",
  "content-box",
  "context-menu",
  "continuous",
  "copy",
  "counter",
  "counters",
  "cover",
  "crop",
  "cross",
  "crosshair",
  "currentcolor",
  "cursive",
  "cyclic",
  "darken",
  "dashed",
  "decimal",
  "decimal-leading-zero",
  "default",
  "default-button",
  "dense",
  "destination-atop",
  "destination-in",
  "destination-out",
  "destination-over",
  "difference",
  "disc",
  "discard",
  "disclosure-closed",
  "disclosure-open",
  "document",
  "dot-dash",
  "dot-dot-dash",
  "dotted",
  "double",
  "down",
  "e-resize",
  "ease",
  "ease-in",
  "ease-in-out",
  "ease-out",
  "element",
  "ellipse",
  "ellipsis",
  "embed",
  "end",
  "ethiopic-abegede-gez",
  "ethiopic-halehame-aa-er",
  "ethiopic-halehame-gez",
  "ew-resize",
  "exclusion",
  "expanded",
  "extends",
  "extra-condensed",
  "extra-expanded",
  "fantasy",
  "fast",
  "fill",
  "fill-box",
  "fixed",
  "flat",
  "flex",
  "flex-end",
  "flex-start",
  "footnotes",
  "forwards",
  "from",
  "geometricPrecision",
  "graytext",
  "grid",
  "groove",
  "hand",
  "hard-light",
  "help",
  "hidden",
  "hide",
  "higher",
  "highlight",
  "highlighttext",
  "horizontal",
  "hsl",
  "hsla",
  "hue",
  "icon",
  "ignore",
  "inactiveborder",
  "inactivecaption",
  "inactivecaptiontext",
  "infinite",
  "infobackground",
  "infotext",
  "inherit",
  "initial",
  "inline",
  "inline-axis",
  "inline-block",
  "inline-flex",
  "inline-grid",
  "inline-table",
  "inset",
  "inside",
  "intrinsic",
  "invert",
  "italic",
  "justify",
  "keep-all",
  "landscape",
  "large",
  "larger",
  "left",
  "level",
  "lighter",
  "lighten",
  "line-through",
  "linear",
  "linear-gradient",
  "lines",
  "list-item",
  "listbox",
  "listitem",
  "local",
  "logical",
  "loud",
  "lower",
  "lower-hexadecimal",
  "lower-latin",
  "lower-norwegian",
  "lowercase",
  "ltr",
  "luminosity",
  "manipulation",
  "match",
  "matrix",
  "matrix3d",
  "medium",
  "menu",
  "menutext",
  "message-box",
  "middle",
  "min-intrinsic",
  "mix",
  "monospace",
  "move",
  "multiple",
  "multiple_mask_images",
  "multiply",
  "n-resize",
  "narrower",
  "ne-resize",
  "nesw-resize",
  "no-close-quote",
  "no-drop",
  "no-open-quote",
  "no-repeat",
  "none",
  "normal",
  "not-allowed",
  "nowrap",
  "ns-resize",
  "numbers",
  "numeric",
  "nw-resize",
  "nwse-resize",
  "oblique",
  "opacity",
  "open-quote",
  "optimizeLegibility",
  "optimizeSpeed",
  "outset",
  "outside",
  "outside-shape",
  "overlay",
  "overline",
  "padding",
  "padding-box",
  "painted",
  "page",
  "paused",
  "perspective",
  "pinch-zoom",
  "plus-darker",
  "plus-lighter",
  "pointer",
  "polygon",
  "portrait",
  "pre",
  "pre-line",
  "pre-wrap",
  "preserve-3d",
  "progress",
  "push-button",
  "radial-gradient",
  "radio",
  "read-only",
  "read-write",
  "read-write-plaintext-only",
  "rectangle",
  "region",
  "relative",
  "repeat",
  "repeating-linear-gradient",
  "repeating-radial-gradient",
  "repeat-x",
  "repeat-y",
  "reset",
  "reverse",
  "rgb",
  "rgba",
  "ridge",
  "right",
  "rotate",
  "rotate3d",
  "rotateX",
  "rotateY",
  "rotateZ",
  "round",
  "row",
  "row-resize",
  "row-reverse",
  "rtl",
  "run-in",
  "running",
  "s-resize",
  "sans-serif",
  "saturation",
  "scale",
  "scale3d",
  "scaleX",
  "scaleY",
  "scaleZ",
  "screen",
  "scroll",
  "scrollbar",
  "scroll-position",
  "se-resize",
  "self-start",
  "self-end",
  "semi-condensed",
  "semi-expanded",
  "separate",
  "serif",
  "show",
  "single",
  "skew",
  "skewX",
  "skewY",
  "skip-white-space",
  "slide",
  "slider-horizontal",
  "slider-vertical",
  "sliderthumb-horizontal",
  "sliderthumb-vertical",
  "slow",
  "small",
  "small-caps",
  "small-caption",
  "smaller",
  "soft-light",
  "solid",
  "source-atop",
  "source-in",
  "source-out",
  "source-over",
  "space",
  "space-around",
  "space-between",
  "space-evenly",
  "spell-out",
  "square",
  "start",
  "static",
  "status-bar",
  "stretch",
  "stroke",
  "stroke-box",
  "sub",
  "subpixel-antialiased",
  "svg_masks",
  "super",
  "sw-resize",
  "symbolic",
  "symbols",
  "system-ui",
  "table",
  "table-caption",
  "table-cell",
  "table-column",
  "table-column-group",
  "table-footer-group",
  "table-header-group",
  "table-row",
  "table-row-group",
  "text",
  "text-bottom",
  "text-top",
  "textarea",
  "textfield",
  "thick",
  "thin",
  "threeddarkshadow",
  "threedface",
  "threedhighlight",
  "threedlightshadow",
  "threedshadow",
  "to",
  "top",
  "transform",
  "translate",
  "translate3d",
  "translateX",
  "translateY",
  "translateZ",
  "transparent",
  "ultra-condensed",
  "ultra-expanded",
  "underline",
  "unidirectional-pan",
  "unset",
  "up",
  "upper-latin",
  "uppercase",
  "url",
  "var",
  "vertical",
  "vertical-text",
  "view-box",
  "visible",
  "visibleFill",
  "visiblePainted",
  "visibleStroke",
  "visual",
  "w-resize",
  "wait",
  "wave",
  "wider",
  "window",
  "windowframe",
  "windowtext",
  "words",
  "wrap",
  "wrap-reverse",
  "x-large",
  "x-small",
  "xor",
  "xx-large",
  "xx-small"
].map((name) => ({ type: "keyword", label: name })).concat([
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "grey",
  "green",
  "greenyellow",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
].map((name) => ({ type: "constant", label: name })));
var tags2 = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "b",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "footer",
  "form",
  "header",
  "hgroup",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "meter",
  "nav",
  "ol",
  "output",
  "p",
  "pre",
  "ruby",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul"
].map((name) => ({ type: "type", label: name }));
var identifier2 = /^(\w[\w-]*|-\w[\w-]*|)$/;
var variable = /^-(-[\w-]*)?$/;
function isVarArg(node, doc) {
  var _a;
  if (node.name == "(" || node.type.isError)
    node = node.parent || node;
  if (node.name != "ArgList")
    return false;
  let callee2 = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.firstChild;
  if ((callee2 === null || callee2 === void 0 ? void 0 : callee2.name) != "Callee")
    return false;
  return doc.sliceString(callee2.from, callee2.to) == "var";
}
var VariablesByNode = new NodeWeakMap();
var declSelector = ["Declaration"];
function astTop(node) {
  for (let cur = node; ; ) {
    if (cur.type.isTop)
      return cur;
    if (!(cur = cur.parent))
      return node;
  }
}
function variableNames(doc, node, isVariable) {
  if (node.to - node.from > 4096) {
    let known = VariablesByNode.get(node);
    if (known)
      return known;
    let result = [], seen = /* @__PURE__ */ new Set(), cursor = node.cursor(IterMode.IncludeAnonymous);
    if (cursor.firstChild())
      do {
        for (let option of variableNames(doc, cursor.node, isVariable))
          if (!seen.has(option.label)) {
            seen.add(option.label);
            result.push(option);
          }
      } while (cursor.nextSibling());
    VariablesByNode.set(node, result);
    return result;
  } else {
    let result = [], seen = /* @__PURE__ */ new Set();
    node.cursor().iterate((node2) => {
      var _a;
      if (isVariable(node2) && node2.matchContext(declSelector) && ((_a = node2.node.nextSibling) === null || _a === void 0 ? void 0 : _a.name) == ":") {
        let name = doc.sliceString(node2.from, node2.to);
        if (!seen.has(name)) {
          seen.add(name);
          result.push({ label: name, type: "variable" });
        }
      }
    });
    return result;
  }
}
var defineCSSCompletionSource = (isVariable) => (context) => {
  let { state, pos } = context, node = syntaxTree(state).resolveInner(pos, -1);
  let isDash = node.type.isError && node.from == node.to - 1 && state.doc.sliceString(node.from, node.to) == "-";
  if (node.name == "PropertyName" || (isDash || node.name == "TagName") && /^(Block|Styles)$/.test(node.resolve(node.to).name))
    return { from: node.from, options: properties(), validFor: identifier2 };
  if (node.name == "ValueName")
    return { from: node.from, options: values, validFor: identifier2 };
  if (node.name == "PseudoClassName")
    return { from: node.from, options: pseudoClasses, validFor: identifier2 };
  if (isVariable(node) || (context.explicit || isDash) && isVarArg(node, state.doc))
    return {
      from: isVariable(node) || isDash ? node.from : pos,
      options: variableNames(state.doc, astTop(node), isVariable),
      validFor: variable
    };
  if (node.name == "TagName") {
    for (let { parent } = node; parent; parent = parent.parent)
      if (parent.name == "Block")
        return { from: node.from, options: properties(), validFor: identifier2 };
    return { from: node.from, options: tags2, validFor: identifier2 };
  }
  if (!context.explicit)
    return null;
  let above = node.resolve(pos), before = above.childBefore(pos);
  if (before && before.name == ":" && above.name == "PseudoClassSelector")
    return { from: pos, options: pseudoClasses, validFor: identifier2 };
  if (before && before.name == ":" && above.name == "Declaration" || above.name == "ArgList")
    return { from: pos, options: values, validFor: identifier2 };
  if (above.name == "Block" || above.name == "Styles")
    return { from: pos, options: properties(), validFor: identifier2 };
  return null;
};
var cssCompletionSource = defineCSSCompletionSource((n) => n.name == "VariableName");
var cssLanguage = LRLanguage.define({
  name: "css",
  parser: parser2.configure({
    props: [
      indentNodeProp.add({
        Declaration: continuedIndent()
      }),
      foldNodeProp.add({
        Block: foldInside
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*\}$/,
    wordChars: "-"
  }
});
function css() {
  return new LanguageSupport(cssLanguage, cssLanguage.data.of({ autocomplete: cssCompletionSource }));
}

// node_modules/.pnpm/@lezer+javascript@1.4.4/node_modules/@lezer/javascript/dist/index.js
var noSemi = 303;
var incdec = 1;
var incdecPrefix = 2;
var insertSemi = 304;
var spaces = 306;
var newline = 307;
var LineComment = 3;
var BlockComment = 4;
var space2 = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288
];
var braceR = 125;
var semicolon = 59;
var slash2 = 47;
var star = 42;
var plus = 43;
var minus = 45;
var trackNewline = new ContextTracker({
  start: false,
  shift(context, term) {
    return term == LineComment || term == BlockComment || term == spaces ? context : term == newline;
  },
  strict: false
});
var insertSemicolon = new ExternalTokenizer((input, stack) => {
  let { next } = input;
  if (next == braceR || next == -1 || stack.context)
    input.acceptToken(insertSemi);
}, { contextual: true, fallback: true });
var noSemicolon = new ExternalTokenizer((input, stack) => {
  let { next } = input, after;
  if (space2.indexOf(next) > -1)
    return;
  if (next == slash2 && ((after = input.peek(1)) == slash2 || after == star))
    return;
  if (next != braceR && next != semicolon && next != -1 && !stack.context)
    input.acceptToken(noSemi);
}, { contextual: true });
var incdecToken = new ExternalTokenizer((input, stack) => {
  let { next } = input;
  if (next == plus || next == minus) {
    input.advance();
    if (next == input.next) {
      input.advance();
      let mayPostfix = !stack.context && stack.canShift(incdec);
      input.acceptToken(mayPostfix ? incdec : incdecPrefix);
    }
  }
}, { contextual: true });
var jsHighlight = styleTags({
  "get set async static": tags.modifier,
  "for while do if else switch try catch finally return throw break continue default case": tags.controlKeyword,
  "in of await yield void typeof delete instanceof": tags.operatorKeyword,
  "let var const function class extends": tags.definitionKeyword,
  "import export from": tags.moduleKeyword,
  "with debugger as new": tags.keyword,
  TemplateString: tags.special(tags.string),
  super: tags.atom,
  BooleanLiteral: tags.bool,
  this: tags.self,
  null: tags.null,
  Star: tags.modifier,
  VariableName: tags.variableName,
  "CallExpression/VariableName TaggedTemplateExpression/VariableName": tags.function(tags.variableName),
  VariableDefinition: tags.definition(tags.variableName),
  Label: tags.labelName,
  PropertyName: tags.propertyName,
  PrivatePropertyName: tags.special(tags.propertyName),
  "CallExpression/MemberExpression/PropertyName": tags.function(tags.propertyName),
  "FunctionDeclaration/VariableDefinition": tags.function(tags.definition(tags.variableName)),
  "ClassDeclaration/VariableDefinition": tags.definition(tags.className),
  PropertyDefinition: tags.definition(tags.propertyName),
  PrivatePropertyDefinition: tags.definition(tags.special(tags.propertyName)),
  UpdateOp: tags.updateOperator,
  LineComment: tags.lineComment,
  BlockComment: tags.blockComment,
  Number: tags.number,
  String: tags.string,
  Escape: tags.escape,
  ArithOp: tags.arithmeticOperator,
  LogicOp: tags.logicOperator,
  BitOp: tags.bitwiseOperator,
  CompareOp: tags.compareOperator,
  RegExp: tags.regexp,
  Equals: tags.definitionOperator,
  Arrow: tags.function(tags.punctuation),
  ": Spread": tags.punctuation,
  "( )": tags.paren,
  "[ ]": tags.squareBracket,
  "{ }": tags.brace,
  "InterpolationStart InterpolationEnd": tags.special(tags.brace),
  ".": tags.derefOperator,
  ", ;": tags.separator,
  "@": tags.meta,
  TypeName: tags.typeName,
  TypeDefinition: tags.definition(tags.typeName),
  "type enum interface implements namespace module declare": tags.definitionKeyword,
  "abstract global Privacy readonly override": tags.modifier,
  "is keyof unique infer": tags.operatorKeyword,
  JSXAttributeValue: tags.attributeValue,
  JSXText: tags.content,
  "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": tags.angleBracket,
  "JSXIdentifier JSXNameSpacedName": tags.tagName,
  "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": tags.attributeName,
  "JSXBuiltin/JSXIdentifier": tags.standard(tags.tagName)
});
var spec_identifier2 = { __proto__: null, export: 14, as: 19, from: 27, default: 30, async: 35, function: 36, extends: 46, this: 50, true: 58, false: 58, null: 70, void: 74, typeof: 78, super: 96, new: 130, delete: 146, yield: 155, await: 159, class: 164, public: 221, private: 221, protected: 221, readonly: 223, instanceof: 242, satisfies: 245, in: 246, const: 248, import: 280, keyof: 335, unique: 339, infer: 345, is: 381, abstract: 401, implements: 403, type: 405, let: 408, var: 410, using: 413, interface: 419, enum: 423, namespace: 429, module: 431, declare: 435, global: 439, for: 458, of: 467, while: 470, with: 474, do: 478, if: 482, else: 484, switch: 488, case: 494, try: 500, catch: 504, finally: 508, return: 512, throw: 516, break: 520, continue: 524, debugger: 528 };
var spec_word = { __proto__: null, async: 117, get: 119, set: 121, declare: 181, public: 183, private: 183, protected: 183, static: 185, abstract: 187, override: 189, readonly: 195, accessor: 197, new: 385 };
var spec_LessThan = { __proto__: null, "<": 137 };
var parser3 = LRParser.deserialize({
  version: 14,
  states: "$6tO`QUOOO%TQUOOO'WQWOOP(eOSOOO*sQ(CjO'#CfO*zOpO'#CgO+YO!bO'#CgO+hO07`O'#DZO-yQUO'#DaO.ZQUO'#DlO%TQUO'#DvO0_QUO'#EOOOQ(CY'#EW'#EWO0xQSO'#ETOOQO'#Ei'#EiOOQO'#Ic'#IcO1QQSO'#GkO1]QSO'#EhO1bQSO'#EhO3dQ(CjO'#JdO6TQ(CjO'#JeO6qQSO'#FWO6vQ#tO'#FoOOQ(CY'#F`'#F`O7RO&jO'#F`O7aQ,UO'#FvO8wQSO'#FuOOQ(CY'#Je'#JeOOQ(CW'#Jd'#JdO8|QSO'#GoOOQQ'#KP'#KPO9XQSO'#IPO9^Q(C[O'#IQOOQQ'#JQ'#JQOOQQ'#IU'#IUQ`QUOOO%TQUO'#DnO9fQUO'#DzO9mQUO'#D|O9SQSO'#GkO9tQ,UO'#ClO:SQSO'#EgO:_QSO'#ErO:dQ,UO'#F_O;RQSO'#GkOOQO'#KQ'#KQO;WQSO'#KQO;fQSO'#GsO;fQSO'#GtO;fQSO'#GvO9SQSO'#GyO<]QSO'#G|O=tQSO'#CbO>UQSO'#HYO>^QSO'#H`O>^QSO'#HbO`QUO'#HdO>^QSO'#HfO>^QSO'#HiO>cQSO'#HoO>hQ(C]O'#HuO%TQUO'#HwO>sQ(C]O'#HyO?OQ(C]O'#H{O9^Q(C[O'#H}O?ZQ(CjO'#CfO@]QWO'#DfQOQSOOO%TQUO'#D|O@sQSO'#EPO9tQ,UO'#EgOAOQSO'#EgOAZQ`O'#F_OOQQ'#Cd'#CdOOQ(CW'#Dk'#DkOOQ(CW'#Jh'#JhO%TQUO'#JhOOQO'#Jl'#JlOOQO'#I`'#I`OBZQWO'#E`OOQ(CW'#E_'#E_OCVQ(C`O'#E`OCaQWO'#ESOOQO'#Jk'#JkOCuQWO'#JlOESQWO'#ESOCaQWO'#E`PEaO?MpO'#C`POOO)CDo)CDoOOOO'#IV'#IVOElOpO,59ROOQ(CY,59R,59ROOOO'#IW'#IWOEzO!bO,59RO%TQUO'#D]OOOO'#IY'#IYOFYO07`O,59uOOQ(CY,59u,59uOFhQUO'#IZOF{QSO'#JfOH}QbO'#JfO+vQUO'#JfOIUQSO,59{OIlQSO'#EiOIyQSO'#JtOJUQSO'#JsOJUQSO'#JsOJ^QSO,5;VOJcQSO'#JrOOQ(CY,5:W,5:WOJjQUO,5:WOLkQ(CjO,5:bOM[QSO,5:jOMuQ(C[O'#JqOM|QSO'#JpO8|QSO'#JpONbQSO'#JpONjQSO,5;UONoQSO'#JpO!!wQbO'#JeOOQ(CY'#Cf'#CfO%TQUO'#EOO!#gQ`O,5:oOOQO'#Jm'#JmOOQO-E<a-E<aO9SQSO,5=VO!#}QSO,5=VO!$SQUO,5;SO!&VQ,UO'#EdO!'jQSO,5;SO!)SQ,UO'#DpO!)ZQUO'#DuO!)eQWO,5;]O!)mQWO,5;]O%TQUO,5;]OOQQ'#FO'#FOOOQQ'#FQ'#FQO%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^OOQQ'#FU'#FUO!){QUO,5;oOOQ(CY,5;t,5;tOOQ(CY,5;u,5;uO!,OQSO,5;uOOQ(CY,5;v,5;vO%TQUO'#IgO!,WQ(C[O,5<cO!&VQ,UO,5;^O!,uQ,UO,5;^O%TQUO,5;rO!,|Q#tO'#FeO!-yQ#tO'#JxO!-eQ#tO'#JxO!.QQ#tO'#JxOOQO'#Jx'#JxO!.fQ#tO,5;}OOOO,5<Z,5<ZO!.wQUO'#FqOOOO'#If'#IfO7RO&jO,5;zO!/OQ#tO'#FsOOQ(CY,5;z,5;zO!/oQ7[O'#CrOOQ(CY'#Cv'#CvO!0SQSO'#CvO!0XO07`O'#CzO!0uQ,UO,5<`O!0|QSO,5<bO!2cQMhO'#GQO!2pQSO'#GRO!2uQSO'#GRO!2zQMhO'#GVO!3yQWO'#GZO!4lQ7[O'#J_OOQ(CY'#J_'#J_O!4vQSO'#J^O!5UQSO'#J]O!5^QSO'#CqOOQ(CY'#Ct'#CtOOQ(CY'#DO'#DOOOQ(CY'#DQ'#DQO0{QSO'#DSO!'oQ,UO'#FxO!'oQ,UO'#FzO!5fQSO'#F|O!5kQSO'#F}O!2uQSO'#GTO!'oQ,UO'#GYO!5pQSO'#EjO!6_QSO,5<aOOQ(CW'#Co'#CoO!6gQSO'#EkO!7aQWO'#ElOOQ(CW'#Jr'#JrO!7hQ(C[O'#KRO9^Q(C[O,5=ZO`QUO,5>kOOQQ'#JY'#JYOOQQ,5>l,5>lOOQQ-E<S-E<SO!9jQ(CjO,5:YO!<WQ(CjO,5:fO%TQUO,5:fO!>qQ(CjO,5:hOOQO,5@l,5@lO!?bQ,UO,5=VO!?pQ(C[O'#JZO8wQSO'#JZO!@RQ(C[O,59WO!@^QWO,59WO!@fQ,UO,59WO9tQ,UO,59WO!@qQSO,5;SO!@yQSO'#HXO!A[QSO'#KUO%TQUO,5;wO!7[QWO,5;yO!AdQSO,5=rO!AiQSO,5=rO!AnQSO,5=rO9^Q(C[O,5=rO;fQSO,5=bOOQO'#Cr'#CrO!A|QWO,5=_O!BUQ,UO,5=`O!BaQSO,5=bO!BfQ`O,5=eO!BnQSO'#KQO>cQSO'#HOO9SQSO'#HQO!BsQSO'#HQO9tQ,UO'#HSO!BxQSO'#HSOOQQ,5=h,5=hO!B}QSO'#HTO!CVQSO'#ClO!C[QSO,58|O!CfQSO,58|O!EkQUO,58|OOQQ,58|,58|O!E{Q(C[O,58|O%TQUO,58|O!HWQUO'#H[OOQQ'#H]'#H]OOQQ'#H^'#H^O`QUO,5=tO!HnQSO,5=tO`QUO,5=zO`QUO,5=|O!HsQSO,5>OO`QUO,5>QO!HxQSO,5>TO!H}QUO,5>ZOOQQ,5>a,5>aO%TQUO,5>aO9^Q(C[O,5>cOOQQ,5>e,5>eO!MXQSO,5>eOOQQ,5>g,5>gO!MXQSO,5>gOOQQ,5>i,5>iO!M^QWO'#DXO%TQUO'#JhO!M{QWO'#JhO!NjQWO'#DgO!N{QWO'#DgO##^QUO'#DgO##eQSO'#JgO##mQSO,5:QO##rQSO'#EmO#$QQSO'#JuO#$YQSO,5;WO#$_QWO'#DgO#$lQWO'#EROOQ(CY,5:k,5:kO%TQUO,5:kO#$sQSO,5:kO>cQSO,5;RO!@^QWO,5;RO!@fQ,UO,5;RO9tQ,UO,5;RO#${QSO,5@SO#%QQ!LQO,5:oOOQO-E<^-E<^O#&WQ(C`O,5:zOCaQWO,5:nO#&bQWO,5:nOCaQWO,5:zO!@RQ(C[O,5:nOOQ(CW'#Ec'#EcOOQO,5:z,5:zO%TQUO,5:zO#&oQ(C[O,5:zO#&zQ(C[O,5:zO!@^QWO,5:nOOQO,5;Q,5;QO#'YQ(C[O,5:zPOOO'#IT'#ITP#'nO?MpO,58zPOOO,58z,58zOOOO-E<T-E<TOOQ(CY1G.m1G.mOOOO-E<U-E<UO#'yQ`O,59wOOOO-E<W-E<WOOQ(CY1G/a1G/aO#(OQbO,5>uO+vQUO,5>uOOQO,5>{,5>{O#(YQUO'#IZOOQO-E<X-E<XO#(gQSO,5@QO#(oQbO,5@QO#(vQSO,5@_OOQ(CY1G/g1G/gO%TQUO,5@`O#)OQSO'#IaOOQO-E<_-E<_O#(vQSO,5@_OOQ(CW1G0q1G0qOOQ(CY1G/r1G/rOOQ(CY1G0U1G0UO%TQUO,5@]O#)dQ(C[O,5@]O#)uQ(C[O,5@]O#)|QSO,5@[O8|QSO,5@[O#*UQSO,5@[O#*dQSO'#IdO#)|QSO,5@[OOQ(CW1G0p1G0pO!)eQWO,5:qO!)pQWO,5:qOOQO,5:s,5:sO#+UQSO,5:sO#+^Q,UO1G2qO9SQSO1G2qOOQ(CY1G0n1G0nO#+lQ(CjO1G0nO#,qQ(ChO,5;OOOQ(CY'#GP'#GPO#-_Q(CjO'#J_O!$SQUO1G0nO#/gQ,UO'#JiO#/qQSO,5:[O#/vQbO'#JjO%TQUO'#JjO#0QQSO,5:aOOQ(CY'#DX'#DXOOQ(CY1G0w1G0wO%TQUO1G0wOOQ(CY1G1a1G1aO#0VQSO1G0wO#2nQ(CjO1G0xO#2uQ(CjO1G0xO#5`Q(CjO1G0xO#5gQ(CjO1G0xO#7qQ(CjO1G0xO#8XQ(CjO1G0xO#;RQ(CjO1G0xO#;YQ(CjO1G0xO#=sQ(CjO1G0xO#=zQ(CjO1G0xO#?rQ(CjO1G0xO#BrQ$IUO'#CfO#DpQ$IUO1G1ZO#DwQ$IUO'#JeO!,RQSO1G1aO#EXQ(CjO,5?ROOQ(CW-E<e-E<eO#E{Q(CjO1G0xOOQ(CY1G0x1G0xO#HWQ(CjO1G1^O#HzQ#tO,5<RO#ISQ#tO,5<SO#I[Q#tO'#FjO#IsQSO'#FiOOQO'#Jy'#JyOOQO'#Ie'#IeO#IxQ#tO1G1iOOQ(CY1G1i1G1iOOOO1G1t1G1tO#JZQ$IUO'#JdO#JeQSO,5<]O!){QUO,5<]OOOO-E<d-E<dOOQ(CY1G1f1G1fO#JjQWO'#JxOOQ(CY,5<_,5<_O#JrQWO,5<_OOQ(CY,59b,59bO!&VQ,UO'#C|OOOO'#IX'#IXO#JwO07`O,59fOOQ(CY,59f,59fO%TQUO1G1zO!5kQSO'#IiO#KSQSO,5<sOOQ(CY,5<p,5<pOOQO'#Gf'#GfO!'oQ,UO,5=POOQO'#Gh'#GhO!'oQ,UO,5=RO!&VQ,UO,5=TOOQO1G1|1G1|O#KbQ`O'#CoO#KuQ`O,5<lO#K|QSO'#J|O9SQSO'#J|O#L[QSO,5<nO!'oQ,UO,5<mO#LaQSO'#GSO#LlQSO,5<mO#LqQ`O'#GPO#MOQ`O'#J}O#MYQSO'#J}O!&VQ,UO'#J}O#M_QSO,5<qO#MdQWO'#G[O!3tQWO'#G[O#MuQSO'#G^O#MzQSO'#G`O!2uQSO'#GcO#NPQ(C[O'#IkO#N[QWO,5<uOOQ(CY,5<u,5<uO#NcQWO'#G[O#NqQWO'#G]O#NyQWO'#G]OOQ(CY,5=U,5=UO!'oQ,UO,5?xO!'oQ,UO,5?xO$ OQSO'#IlO$ ZQSO,5?wO$ cQSO,59]O$!SQ,UO,59nOOQ(CY,59n,59nO$!uQ,UO,5<dO$#hQ,UO,5<fO@TQSO,5<hOOQ(CY,5<i,5<iO$#rQSO,5<oO$#wQ,UO,5<tO$$XQSO'#JpO!$SQUO1G1{O$$^QSO1G1{O8|QSO'#JsO8|QSO'#EmO%TQUO'#EmO8|QSO'#InO$$cQ(C[O,5@mOOQQ1G2u1G2uOOQQ1G4V1G4VOOQ(CY1G/t1G/tO!,OQSO1G/tO$&hQ(CjO1G0QOOQQ1G2q1G2qO!&VQ,UO1G2qO%TQUO1G2qO$'XQSO1G2qO$'dQ,UO'#EdOOQ(CW,5?u,5?uO$'nQ(C[O,5?uOOQQ1G.r1G.rO!@RQ(C[O1G.rO!@^QWO1G.rO!@fQ,UO1G.rO$(PQSO1G0nO$(UQSO'#CfO$(aQSO'#KVO$(iQSO,5=sO$(nQSO'#KVO$(sQSO'#KVO$)OQSO'#ItO$)^QSO,5@pO$)fQbO1G1cOOQ(CY1G1e1G1eO9SQSO1G3^O@TQSO1G3^O$)mQSO1G3^O$)rQSO1G3^OOQQ1G3^1G3^O!BaQSO1G2|O!&VQ,UO1G2yO$)wQSO1G2yOOQQ1G2z1G2zO!&VQ,UO1G2zO$)|QSO1G2zO$*UQWO'#GxOOQQ1G2|1G2|O!3tQWO'#IpO!BfQ`O1G3POOQQ1G3P1G3POOQQ,5=j,5=jO$*^Q,UO,5=lO9SQSO,5=lO#MzQSO,5=nO8wQSO,5=nO!@^QWO,5=nO!@fQ,UO,5=nO9tQ,UO,5=nO$*lQSO'#KTO$*wQSO,5=oOOQQ1G.h1G.hO$*|Q(C[O1G.hO@TQSO1G.hO$+XQSO1G.hO9^Q(C[O1G.hO$-^QbO,5@rO$-nQSO,5@rO8|QSO,5@rO$-yQUO,5=vO$.QQSO,5=vOOQQ1G3`1G3`O`QUO1G3`OOQQ1G3f1G3fOOQQ1G3h1G3hO>^QSO1G3jO$.VQUO1G3lO$2ZQUO'#HkOOQQ1G3o1G3oO$2hQSO'#HqO>cQSO'#HsOOQQ1G3u1G3uO$2pQUO1G3uO9^Q(C[O1G3{OOQQ1G3}1G3}OOQ(CW'#GW'#GWO9^Q(C[O1G4PO9^Q(C[O1G4RO$6wQSO,5@SO!){QUO,5;XO8|QSO,5;XO>cQSO,5:RO!){QUO,5:RO!@^QWO,5:RO$6|Q$IUO,5:ROOQO,5;X,5;XO$7WQWO'#I[O$7nQSO,5@ROOQ(CY1G/l1G/lO$7vQWO'#IbO$8QQSO,5@aOOQ(CW1G0r1G0rO!N{QWO,5:ROOQO'#I_'#I_O$8YQWO,5:mOOQ(CY,5:m,5:mO#$vQSO1G0VOOQ(CY1G0V1G0VO%TQUO1G0VOOQ(CY1G0m1G0mO>cQSO1G0mO!@^QWO1G0mO!@fQ,UO1G0mOOQ(CW1G5n1G5nO!@RQ(C[O1G0YOOQO1G0f1G0fO%TQUO1G0fO$8aQ(C[O1G0fO$8lQ(C[O1G0fO!@^QWO1G0YOCaQWO1G0YO$8zQ(C[O1G0fOOQO1G0Y1G0YO$9`Q(CjO1G0fPOOO-E<R-E<RPOOO1G.f1G.fOOOO1G/c1G/cO$9jQ`O,5<cO$9rQbO1G4aOOQO1G4g1G4gO%TQUO,5>uO$9|QSO1G5lO$:UQSO1G5yO$:^QbO1G5zO8|QSO,5>{O$:hQ(CjO1G5wO%TQUO1G5wO$:xQ(C[O1G5wO$;ZQSO1G5vO$;ZQSO1G5vO8|QSO1G5vO$;cQSO,5?OO8|QSO,5?OOOQO,5?O,5?OO$;wQSO,5?OO$$XQSO,5?OOOQO-E<b-E<bOOQO1G0]1G0]OOQO1G0_1G0_O!,RQSO1G0_OOQQ7+(]7+(]O!&VQ,UO7+(]O%TQUO7+(]O$<VQSO7+(]O$<bQ,UO7+(]O$<pQ(CjO,59nO$>xQ(CjO,5<dO$ATQ(CjO,5<fO$C`Q(CjO,5<tOOQ(CY7+&Y7+&YO$EqQ(CjO7+&YO$FeQ,UO'#I]O$FoQSO,5@TOOQ(CY1G/v1G/vO$FwQUO'#I^O$GUQSO,5@UO$G^QbO,5@UOOQ(CY1G/{1G/{O$GhQSO7+&cOOQ(CY7+&c7+&cO$GmQ$IUO,5:bO%TQUO7+&uO$GwQ$IUO,5:YO$HUQ$IUO,5:fO$H`Q$IUO,5:hOOQ(CY7+&{7+&{OOQO1G1m1G1mOOQO1G1n1G1nO$HjQ#tO,5<UO!){QUO,5<TOOQO-E<c-E<cOOQ(CY7+'T7+'TOOOO7+'`7+'`OOOO1G1w1G1wO$HuQSO1G1wOOQ(CY1G1y1G1yO$HzQ`O,59hOOOO-E<V-E<VOOQ(CY1G/Q1G/QO$IRQ(CjO7+'fOOQ(CY,5?T,5?TO$IuQSO,5?TOOQ(CY1G2_1G2_P$IzQSO'#IiPOQ(CY-E<g-E<gO$JnQ,UO1G2kO$KaQ,UO1G2mO$KkQ`O1G2oOOQ(CY1G2W1G2WO$KrQSO'#IhO$LQQSO,5@hO$LQQSO,5@hO$LYQSO,5@hO$LeQSO,5@hOOQO1G2Y1G2YO$LsQ,UO1G2XO!'oQ,UO1G2XO$MTQMhO'#IjO$MeQSO,5@iO!&VQ,UO,5@iO$MmQ`O,5@iOOQ(CY1G2]1G2]OOQ(CW,5<v,5<vOOQ(CW,5<w,5<wO$$XQSO,5<wOCQQSO,5<wO!@^QWO,5<vOOQO'#G_'#G_O$MwQSO,5<xOOQ(CW,5<z,5<zO$$XQSO,5<}OOQO,5?V,5?VOOQO-E<i-E<iOOQ(CY1G2a1G2aO!3tQWO,5<vO$NPQSO,5<wO#MuQSO,5<xO!3tQWO,5<wO$N[Q,UO1G5dO$NfQ,UO1G5dOOQO,5?W,5?WOOQO-E<j-E<jOOQO1G.w1G.wO!7[QWO,59pO%TQUO,59pO$NsQSO1G2SO!'oQ,UO1G2ZO$NxQ(CjO7+'gOOQ(CY7+'g7+'gO!$SQUO7+'gO% lQSO,5;XOOQ(CW,5?Y,5?YOOQ(CW-E<l-E<lOOQ(CY7+%`7+%`O% qQ`O'#KOO#$vQSO7+(]O% {QbO7+(]O$<YQSO7+(]O%!SQ(ChO'#CfO%!gQ(ChO,5<{O%#XQSO,5<{OOQ(CW1G5a1G5aOOQQ7+$^7+$^O!@RQ(C[O7+$^O!@^QWO7+$^O!$SQUO7+&YO%#^QSO'#IsO%#rQSO,5@qOOQO1G3_1G3_O9SQSO,5@qO%#rQSO,5@qO%#zQSO,5@qOOQO,5?`,5?`OOQO-E<r-E<rOOQ(CY7+&}7+&}O%$PQSO7+(xO9^Q(C[O7+(xO9SQSO7+(xO@TQSO7+(xOOQQ7+(h7+(hO%$UQ(ChO7+(eO!&VQ,UO7+(eO%$`Q`O7+(fOOQQ7+(f7+(fO!&VQ,UO7+(fO%$gQSO'#KSO%$rQSO,5=dOOQO,5?[,5?[OOQO-E<n-E<nOOQQ7+(k7+(kO%&RQWO'#HROOQQ1G3W1G3WO!&VQ,UO1G3WO%TQUO1G3WO%&YQSO1G3WO%&eQ,UO1G3WO9^Q(C[O1G3YO#MzQSO1G3YO8wQSO1G3YO!@^QWO1G3YO!@fQ,UO1G3YO%&sQSO'#IrO%'OQSO,5@oO%'WQWO,5@oOOQ(CW1G3Z1G3ZOOQQ7+$S7+$SO@TQSO7+$SO9^Q(C[O7+$SO%'cQSO7+$SO%TQUO1G6^O%TQUO1G6_O%'hQ(C[O1G6^O%'rQUO1G3bO%'yQSO1G3bO%(OQUO1G3bOOQQ7+(z7+(zO9^Q(C[O7+)UO`QUO7+)WOOQQ'#KY'#KYOOQQ'#Iu'#IuO%(VQUO,5>VOOQQ,5>V,5>VO%TQUO'#HlO%(dQSO'#HnOOQQ,5>],5>]O8|QSO,5>]OOQQ,5>_,5>_OOQQ7+)a7+)aOOQQ7+)g7+)gOOQQ7+)k7+)kOOQQ7+)m7+)mO%(iQWO1G5nO%(}Q$IUO1G0sO%)XQSO1G0sOOQO1G/m1G/mO%)dQ$IUO1G/mO>cQSO1G/mO!){QUO'#DgOOQO,5>v,5>vOOQO-E<Y-E<YOOQO,5>|,5>|OOQO-E<`-E<`O!@^QWO1G/mOOQO-E<]-E<]OOQ(CY1G0X1G0XOOQ(CY7+%q7+%qO#$vQSO7+%qOOQ(CY7+&X7+&XO>cQSO7+&XO!@^QWO7+&XOOQO7+%t7+%tO$9`Q(CjO7+&QOOQO7+&Q7+&QO%TQUO7+&QO%)nQ(C[O7+&QO!@RQ(C[O7+%tO!@^QWO7+%tO%)yQ(C[O7+&QO%*XQ(CjO7++cO%TQUO7++cO%*iQSO7++bO%*iQSO7++bOOQO1G4j1G4jO8|QSO1G4jO%*qQSO1G4jOOQO7+%y7+%yO#$vQSO<<KwO% {QbO<<KwO%+PQSO<<KwOOQQ<<Kw<<KwO!&VQ,UO<<KwO%TQUO<<KwO%+XQSO<<KwO%+dQ(CjO1G2kO%-oQ(CjO1G2mO%/zQ(CjO1G2XO%2]Q,UO,5>wOOQO-E<Z-E<ZO%2gQbO,5>xO%TQUO,5>xOOQO-E<[-E<[O%2qQSO1G5pOOQ(CY<<I}<<I}O%2yQ$IUO1G0nO%5TQ$IUO1G0xO%5[Q$IUO1G0xO%7`Q$IUO1G0xO%7gQ$IUO1G0xO%9[Q$IUO1G0xO%9rQ$IUO1G0xO%<VQ$IUO1G0xO%<^Q$IUO1G0xO%>bQ$IUO1G0xO%>iQ$IUO1G0xO%@aQ$IUO1G0xO%@tQ(CjO<<JaO%AyQ$IUO1G0xO%CoQ$IUO'#J_O%ErQ$IUO1G1^O%FPQ$IUO1G0QO!){QUO'#FlOOQO'#Jz'#JzOOQO1G1p1G1pO%FZQSO1G1oO%F`Q$IUO,5?ROOOO7+'c7+'cOOOO1G/S1G/SOOQ(CY1G4o1G4oO!'oQ,UO7+(ZO%FjQSO,5?SO9SQSO,5?SOOQO-E<f-E<fO%FxQSO1G6SO%FxQSO1G6SO%GQQSO1G6SO%G]Q,UO7+'sO%GmQ`O,5?UO%GwQSO,5?UO!&VQ,UO,5?UOOQO-E<h-E<hO%G|Q`O1G6TO%HWQSO1G6TOOQ(CW1G2c1G2cO$$XQSO1G2cOOQ(CW1G2b1G2bO%H`QSO1G2dO!&VQ,UO1G2dOOQ(CW1G2i1G2iO!@^QWO1G2bOCQQSO1G2cO%HeQSO1G2dO%HmQSO1G2cO!'oQ,UO7++OOOQ(CY1G/[1G/[O%HxQSO1G/[OOQ(CY7+'n7+'nO%H}Q,UO7+'uO%I_Q(CjO<<KROOQ(CY<<KR<<KRO%JRQSO1G0sO!&VQ,UO'#ImO%JWQSO,5@jO!&VQ,UO1G2gOOQQ<<Gx<<GxO!@RQ(C[O<<GxO%J`Q(CjO<<ItOOQ(CY<<It<<ItOOQO,5?_,5?_O%KSQSO,5?_O$(sQSO,5?_OOQO-E<q-E<qO%KXQSO1G6]O%KXQSO1G6]O9SQSO1G6]O@TQSO<<LdOOQQ<<Ld<<LdO%KaQSO<<LdO9^Q(C[O<<LdOOQQ<<LP<<LPO%$UQ(ChO<<LPOOQQ<<LQ<<LQO%$`Q`O<<LQO%KfQWO'#IoO%KqQSO,5@nO!){QUO,5@nOOQQ1G3O1G3OO%KyQUO'#JhOOQO'#Iq'#IqO9^Q(C[O'#IqO%LTQWO,5=mOOQQ,5=m,5=mO%L[QWO'#E`O%LpQSO7+(rO%LuQSO7+(rOOQQ7+(r7+(rO!&VQ,UO7+(rO%TQUO7+(rO%L}QSO7+(rOOQQ7+(t7+(tO9^Q(C[O7+(tO#MzQSO7+(tO8wQSO7+(tO!@^QWO7+(tO%MYQSO,5?^OOQO-E<p-E<pOOQO'#HU'#HUO%MeQSO1G6ZO9^Q(C[O<<GnOOQQ<<Gn<<GnO@TQSO<<GnO%MmQSO7++xO%MrQSO7++yO%TQUO7++xO%TQUO7++yOOQQ7+(|7+(|O%MwQSO7+(|O%M|QUO7+(|O%NTQSO7+(|OOQQ<<Lp<<LpOOQQ<<Lr<<LrOOQQ-E<s-E<sOOQQ1G3q1G3qO%NYQSO,5>WOOQQ,5>Y,5>YO%N_QSO1G3wO8|QSO7+&_O!){QUO7+&_OOQO7+%X7+%XO%NdQ$IUO1G5zO>cQSO7+%XOOQ(CY<<I]<<I]OOQ(CY<<Is<<IsO>cQSO<<IsOOQO<<Il<<IlO$9`Q(CjO<<IlO%TQUO<<IlOOQO<<I`<<I`O!@RQ(C[O<<I`O%NnQ(C[O<<IlO%NyQ(CjO<<N}O& ZQSO<<N|OOQO7+*U7+*UO8|QSO7+*UOOQQANAcANAcO& cQSOANAcO!&VQ,UOANAcO#$vQSOANAcO% {QbOANAcO%TQUOANAcO& kQ(CjO7+'sO&#|Q(CjO7+'uO&&_QbO1G4dO&&iQ$IUO7+&YO&&vQ$IUO,59nO&(yQ$IUO,5<dO&*|Q$IUO,5<fO&-PQ$IUO,5<tO&.uQ$IUO7+'fO&/SQ$IUO7+'gO&/aQSO,5<WOOQO7+'Z7+'ZO&/fQ,UO<<KuOOQO1G4n1G4nO&/mQSO1G4nO&/xQSO1G4nO&0WQSO7++nO&0WQSO7++nO!&VQ,UO1G4pO&0`Q`O1G4pO&0jQSO7++oOOQ(CW7+'}7+'}O$$XQSO7+(OO&0rQ`O7+(OOOQ(CW7+'|7+'|O$$XQSO7+'}O&0yQSO7+(OO!&VQ,UO7+(OOCQQSO7+'}O&1OQ,UO<<NjOOQ(CY7+$v7+$vO&1YQ`O,5?XOOQO-E<k-E<kO&1dQ(ChO7+(ROOQQAN=dAN=dO9SQSO1G4yOOQO1G4y1G4yO&1tQSO1G4yO&1yQSO7++wO&1yQSO7++wO9^Q(C[OANBOO@TQSOANBOOOQQANBOANBOOOQQANAkANAkOOQQANAlANAlO&2RQSO,5?ZOOQO-E<m-E<mO&2^Q$IUO1G6YO&4nQbO'#CfOOQO,5?],5?]OOQO-E<o-E<oOOQQ1G3X1G3XO%KyQUO,5<xOOQQ<<L^<<L^O!&VQ,UO<<L^O%LpQSO<<L^O&4xQSO<<L^O%TQUO<<L^OOQQ<<L`<<L`O9^Q(C[O<<L`O#MzQSO<<L`O8wQSO<<L`O&5QQWO1G4xO&5]QSO7++uOOQQAN=YAN=YO9^Q(C[OAN=YOOQQ<= d<= dOOQQ<= e<= eO&5eQSO<= dO&5jQSO<= eOOQQ<<Lh<<LhO&5oQSO<<LhO&5tQUO<<LhOOQQ1G3r1G3rO>cQSO7+)cO&5{QSO<<IyO&6WQ$IUO<<IyOOQO<<Hs<<HsOOQ(CYAN?_AN?_OOQOAN?WAN?WO$9`Q(CjOAN?WOOQOAN>zAN>zO%TQUOAN?WOOQO<<Mp<<MpOOQQG26}G26}O!&VQ,UOG26}O#$vQSOG26}O&6bQSOG26}O% {QbOG26}O&6jQ$IUO<<JaO&6wQ$IUO1G2XO&8mQ$IUO1G2kO&:pQ$IUO1G2mO&<sQ$IUO<<KRO&=QQ$IUO<<ItOOQO1G1r1G1rO!'oQ,UOANAaOOQO7+*Y7+*YO&=_QSO7+*YO&=jQSO<= YO&=rQ`O7+*[OOQ(CW<<Kj<<KjO$$XQSO<<KjOOQ(CW<<Ki<<KiO&=|Q`O<<KjO$$XQSO<<KiOOQO7+*e7+*eO9SQSO7+*eO&>TQSO<= cOOQQG27jG27jO9^Q(C[OG27jO!){QUO1G4uO&>]QSO7++tO%LpQSOANAxOOQQANAxANAxO!&VQ,UOANAxO&>eQSOANAxOOQQANAzANAzO9^Q(C[OANAzO#MzQSOANAzOOQO'#HV'#HVOOQO7+*d7+*dOOQQG22tG22tOOQQANEOANEOOOQQANEPANEPOOQQANBSANBSO&>mQSOANBSOOQQ<<L}<<L}O!){QUOAN?eOOQOG24rG24rO$9`Q(CjOG24rO#$vQSOLD,iOOQQLD,iLD,iO!&VQ,UOLD,iO&>rQSOLD,iO&>zQ$IUO7+'sO&@pQ$IUO7+'uO&BfQ,UOG26{OOQO<<Mt<<MtOOQ(CWANAUANAUO$$XQSOANAUOOQ(CWANATANATOOQO<<NP<<NPOOQQLD-ULD-UO&BvQ$IUO7+*aOOQQG27dG27dO%LpQSOG27dO!&VQ,UOG27dOOQQG27fG27fO9^Q(C[OG27fOOQQG27nG27nO&CQQ$IUOG25POOQOLD*^LD*^OOQQ!$(!T!$(!TO#$vQSO!$(!TO!&VQ,UO!$(!TO&C[Q(CjOG26{OOQ(CWG26pG26pOOQQLD-OLD-OO%LpQSOLD-OOOQQLD-QLD-QOOQQ!)9Eo!)9EoO#$vQSO!)9EoOOQQ!$(!j!$(!jOOQQ!.K;Z!.K;ZO&EmQ$IUOG26{O!){QUO'#DvO0xQSO'#ETO&GcQbO'#JdO!){QUO'#DnO&GjQUO'#DzO&GqQbO'#CfO&JXQbO'#CfO!){QUO'#D|O&JiQUO,5;SO!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO'#IgO&LlQSO,5<cO&LtQ,UO,5;^O&NXQ,UO,5;^O!){QUO,5;rO0{QSO'#DSO0{QSO'#DSO!&VQ,UO'#FxO&LtQ,UO'#FxO!&VQ,UO'#FzO&LtQ,UO'#FzO!&VQ,UO'#GYO&LtQ,UO'#GYO!){QUO,5:fO!){QUO,5@`O&JiQUO1G0nO&N`Q$IUO'#CfO!){QUO1G1zO!&VQ,UO,5=PO&LtQ,UO,5=PO!&VQ,UO,5=RO&LtQ,UO,5=RO!&VQ,UO,5<mO&LtQ,UO,5<mO&JiQUO1G1{O!){QUO7+&uO!&VQ,UO1G2XO&LtQ,UO1G2XO!&VQ,UO1G2ZO&LtQ,UO1G2ZO&JiQUO7+'gO&JiQUO7+&YO!&VQ,UOANAaO&LtQ,UOANAaO&NjQSO'#EhO&NoQSO'#EhO&NwQSO'#FWO&N|QSO'#ErO' RQSO'#JtO' ^QSO'#JrO' iQSO,5;SO' nQ,UO,5<`O' uQSO'#GRO' zQSO'#GRO'!PQSO,5<aO'!XQSO,5;SO'!aQ$IUO1G1ZO'!hQSO,5<mO'!mQSO,5<mO'!rQSO,5<oO'!wQSO,5<oO'!|QSO1G1{O'#RQSO1G0nO'#WQ,UO<<KuO'#_Q,UO<<KuO7aQ,UO'#FvO8wQSO'#FuOAOQSO'#EgO!){QUO,5;oO!2uQSO'#GRO!2uQSO'#GRO!2uQSO'#GTO!2uQSO'#GTO!'oQ,UO7+(ZO!'oQ,UO7+(ZO$KkQ`O1G2oO$KkQ`O1G2oO!&VQ,UO,5=TO!&VQ,UO,5=T",
  stateData: "'$h~O'nOS'oOSROS'pRQ~OPYOQYOV!UO^qOayObxOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!XXO!ctO!hZO!kYO!lYO!mYO!ouO!qvO!twO!x]O#p!OO$Q{O$UfO%`|O%b!PO%d}O%e}O%f}O%i!QO%k!RO%n!SO%o!SO%q!TO%}!VO&T!WO&V!XO&X!YO&Z!ZO&^![O&d!]O&j!^O&l!_O&n!`O&p!aO&r!bO'uSO'wTO'zUO(SVO(b[O(oiO~OPYOQYOa!iOb!hOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!dO!ctO!hZO!kYO!lYO!mYO!ouO!q!fO!t!gO$Q!jO$UfO'u!cO'wTO'zUO(SVO(b[O(oiO~O^!uOl!mO|!nO![!wO!]!tO!^!tO!x9qO!|!oO!}!oO#O!vO#P!oO#Q!oO#T!xO#U!xO'v!kO'wTO'zUO(V!lO(b!rO~O'p!yO~OPYXXYX^YXkYXyYXzYX|YX!VYX!eYX!fYX!hYX!lYX#XYX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX'lYX(SYX(cYX(jYX(kYX~O!a$zX~P(jO[!{O'w!}O'x!{O'y!}O~O[#OO'y!}O'z!}O'{#OO~Oq#QO!O#RO(T#RO(U#TO~OPYOQYOa!iOb!hOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!dO!ctO!hZO!kYO!lYO!mYO!ouO!q!fO!t!gO$Q!jO$UfO'u9uO'wTO'zUO(SVO(b[O(oiO~O!U#XO!V#UO!S(YP!S(gP~P+vO!W#aO~P`OPYOQYOa!iOb!hOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!dO!ctO!hZO!kYO!lYO!mYO!ouO!q!fO!t!gO$Q!jO$UfO'wTO'zUO(SVO(b[O(oiO~Oi#kO!U#gO!x]O#b#jO#c#gO'u9vO!g(dP~P.bO!h#mO'u#lO~O!t#qO!x]O%`#rO~O#d#sO~O!a#tO#d#sO~OP$[OX$cOk$POy#xOz#yO|#zO!V$`O!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO#u$WO#v$XO(SVO(c$YO(j#{O(k#|O~O^(WX'l(WX'j(WX!g(WX!S(WX!X(WX%a(WX!a(WX~P1jO#X$dO#{$dOP(XXX(XXk(XXy(XXz(XX|(XX!V(XX!e(XX!h(XX!l(XX#g(XX#h(XX#i(XX#j(XX#k(XX#l(XX#m(XX#n(XX#o(XX#q(XX#s(XX#u(XX#v(XX(S(XX(c(XX(j(XX(k(XX!X(XX%a(XX~O^(XX!f(XX'l(XX'j(XX!S(XX!g(XXo(XX!a(XX~P4QO#X$dO~O$W$fO$Y$eO$a$kO~O!X$lO$UfO$d$mO$f$oO~Oi%ROk$sOl$rOm$rOs%SOu%TOw%UO|$zO!X${O!c%ZO!h$wO#c%[O$Q%XO$m%VO$o%WO$r%YO'u$qO'wTO'zUO(O%QO(S$tOd(PP~O!h%]O~O|%`O!X%aO'u%_O~O!a%eO~O^%fO'l%fO~O'v!kO~P%TO%f%mO~P%TO!h%]O'u%_O'v!kO(O%QO~Ob%tO!h%]O'u%_O~O#o$RO~Oy%yO!X%vO!h%xO%b%|O'u%_O'v!kO'wTO'zUO](xP~O!t#qO~O%k&OO|(tX!X(tX'u(tX~O'u&PO~O!q&UO#p!OO%b!PO%d}O%e}O%f}O%i!QO%k!RO%n!SO%o!SO~Oa&ZOb&YO!t&WO%`&XO%s&VO~P;kOa&^ObxO!X&]O!q&UO!twO!x]O#p!OO%`|O%d}O%e}O%f}O%i!QO%k!RO%n!SO%o!SO%q!TO~O_&aO#X&dO%b&_O'v!kO~P<pO!h&eO!q&iO~O!h#mO~O!XXO~O^%fO'k&qO'l%fO~O^%fO'k&tO'l%fO~O^%fO'k&vO'l%fO~O'jYX!SYXoYX!gYX&RYX!XYX%aYX!aYX~P(jO!['TO!]&|O!^&|O'v!kO'wTO'zUO~Ol&zO|&yO!U&}O(V&xO!W(ZP!W(iP~P?wOg'WO!X'UO'u%_O~Ob']O!h%]O'u%_O~Oy%yO!h%xO~Ol!mO|!nO!x9qO!|!oO!}!oO#P!oO#Q!oO'v!kO'wTO'zUO(V!lO(b!rO~O!['cO!]'bO!^'bO#O!oO#T'dO#U'dO~PAcO^%fO!a#tO!h%]O'l%fO(O%QO(c'fO~O!l'jO#X'hO~PBqOl!mO|!nO'wTO'zUO(V!lO(b!rO~O!XXOl(`X|(`X![(`X!](`X!^(`X!x(`X!|(`X!}(`X#O(`X#P(`X#Q(`X#T(`X#U(`X'v(`X'w(`X'z(`X(V(`X(b(`X~O!]'bO!^'bO'v!kO~PCaO'q'nO'r'nO's'pO~O[!{O'w'rO'x!{O'y'rO~O[#OO'y'rO'z'rO'{#OO~Oq#QO!O#RO(T#RO(U'vO~O!U'xO!S&}X!S'TX!V&}X!V'TX~P+vO!V'zO!S(YX~OP$[OX$cOk$POy#xOz#yO|#zO!V'zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO#u$WO#v$XO(SVO(c$YO(j#{O(k#|O~O!S(YX~PGTO!S(PO~O!S(fX!V(fX!a(fX!g(fX(c(fX~O#X(fX#d#]X!W(fX~PIZO#X(QO!S(hX!V(hX~O!V(RO!S(gX~O!S(UO~O#X$dO~PIZO!W(VO~P`Oy#xOz#yO|#zO!f#vO!h#wO(SVOP!jaX!jak!ja!V!ja!e!ja!l!ja#g!ja#h!ja#i!ja#j!ja#k!ja#l!ja#m!ja#n!ja#o!ja#q!ja#s!ja#u!ja#v!ja(c!ja(j!ja(k!ja~O^!ja'l!ja'j!ja!S!ja!g!jao!ja!X!ja%a!ja!a!ja~PJqO!g(WO~O!a#tO#X(XO(c'fO!V(eX^(eX'l(eX~O!g(eX~PMaO|%`O!X%aO!x]O#b(^O#c(]O'u%_O~O!V(_O!g(dX~O!g(aO~O|%`O!X%aO#c(]O'u%_O~OP(XXX(XXk(XXy(XXz(XX|(XX!V(XX!e(XX!f(XX!h(XX!l(XX#g(XX#h(XX#i(XX#j(XX#k(XX#l(XX#m(XX#n(XX#o(XX#q(XX#s(XX#u(XX#v(XX(S(XX(c(XX(j(XX(k(XX~O!a#tO!g(XX~PN}Oy(bOz(cO!f#vO!h#wO!x!wa|!wa~O!t!wa%`!wa!X!wa#b!wa#c!wa'u!wa~P!#RO!t(gO~OPYOQYOa!iOb!hOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!XXO!ctO!hZO!kYO!lYO!mYO!ouO!q!fO!t!gO$Q!jO$UfO'u!cO'wTO'zUO(SVO(b[O(oiO~Oi%ROk$sOl$rOm$rOs%SOu%TOw:ZO|$zO!X${O!c;eO!h$wO#c:aO$Q%XO$m:]O$o:_O$r%YO'u(kO'wTO'zUO(O%QO(S$tO~O#d(mO~Oi%ROk$sOl$rOm$rOs%SOu%TOw%UO|$zO!X${O!c%ZO!h$wO#c%[O$Q%XO$m%VO$o%WO$r%YO'u(kO'wTO'zUO(O%QO(S$tO~Od(]P~P!'oO!U(qO!g(^P~P%TO(V(sO(b[O~O|(uO!h#wO(V(sO(b[O~OP9pOQ9pOa;aOb!hOikOk9pOlkOmkOskOu9pOw9pO|WO!QkO!RkO!X!dO!c9sO!hZO!k9pO!l9pO!m9pO!o9tO!q9wO!t!gO$Q!jO$UfO'u)TO'wTO'zUO(SVO(b[O(o;_O~Oz)WO!h#wO~O!V$`O^$ka'l$ka'j$ka!g$ka!S$ka!X$ka%a$ka!a$ka~O#p)[O~P!&VOy)_O!a)^O!X$XX$T$XX$W$XX$Y$XX$a$XX~O!a)^O!X(lX$T(lX$W(lX$Y(lX$a(lX~Oy)_O~P!-eOy)_O!X(lX$T(lX$W(lX$Y(lX$a(lX~O!X)aO$T)eO$W)`O$Y)`O$a)fO~O!U)iO~P!){O$W$fO$Y$eO$a)mO~Og$sXy$sX|$sX!f$sX(j$sX(k$sX~OdfXd$sXgfX!VfX#XfX~P!/ZOl)oO~Oq)pO(T)qO(U)sO~Og)|Oy)uO|)vO(j)xO(k)zO~Od)tO~P!0dOd)}O~Oi%ROk$sOl$rOm$rOs%SOu%TOw:ZO|$zO!X${O!c;eO!h$wO#c:aO$Q%XO$m:]O$o:_O$r%YO'wTO'zUO(O%QO(S$tO~O!U*RO'u*OO!g(pP~P!1RO#d*TO~O!h*UO~O!U*ZO'u*WO!S(qP~P!1ROk*gO|*_O![*eO!]*^O!^*^O!h*UO#T*fO%W*aO'v!kO(V!lO~O!W*dO~P!3XO!f#vOg(RXy(RX|(RX(j(RX(k(RX!V(RX#X(RX~Od(RX#y(RX~P!4QOg*jO#X*iOd(QX!V(QX~O!V*kOd(PX~O'u&POd(PP~O!h*rO~O'u(kO~Oi*vO|%`O!U#gO!X%aO!x]O#b#jO#c#gO'u%_O!g(dP~O!a#tO#d*wO~O|%`O!U*yO!V(RO!X%aO'u%_O!S(gP~Ol'QO|*{O!U*zO'wTO'zUO(V(sO~O!W(iP~P!6{O!V*|O^(uX'l(uX~OP$[OX$cOk$POy#xOz#yO|#zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO#u$WO#v$XO(SVO(c$YO(j#{O(k#|O~O^!ba!V!ba'l!ba'j!ba!S!ba!g!bao!ba!X!ba%a!ba!a!ba~P!7sOy#xOz#yO|#zO!f#vO!h#wO(SVOP!naX!nak!na!V!na!e!na!l!na#g!na#h!na#i!na#j!na#k!na#l!na#m!na#n!na#o!na#q!na#s!na#u!na#v!na(c!na(j!na(k!na~O^!na'l!na'j!na!S!na!g!nao!na!X!na%a!na!a!na~P!:^Oy#xOz#yO|#zO!f#vO!h#wO(SVOP!paX!pak!pa!V!pa!e!pa!l!pa#g!pa#h!pa#i!pa#j!pa#k!pa#l!pa#m!pa#n!pa#o!pa#q!pa#s!pa#u!pa#v!pa(c!pa(j!pa(k!pa~O^!pa'l!pa'j!pa!S!pa!g!pao!pa!X!pa%a!pa!a!pa~P!<wOg+VO!X'UO%a+UO(O%QO~O!a+XO^'}X!X'}X'l'}X!V'}X~O^%fO!XXO'l%fO~O!h%]O(O%QO~O!h%]O'u%_O(O%QO~O!a#tO#d(mO~O%b+eO'u+aO'wTO'zUO!W(yP~O!V+fO](xX~OX+jO~O]+kO~O!X%vO'u%_O'v!kO](xP~O#X+pO(O%QO~Og+sO!X${O(O%QO~O!X+uO~Oy+wO!XXO~O%f%mO~O!t+|O~Ob,RO~O'u#lO!W(wP~Ob%tO~O%b!PO'u&PO~P<pOX,XO],WO~OPYOQYOayObxOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!ctO!hZO!kYO!lYO!mYO!ouO!twO!x]O$UfO%`|O'wTO'zUO(SVO(b[O(oiO~O!X!dO!q!fO$Q!jO'u!cO~P!CnO],WO^%fO'l%fO~OPYOQYOa!iOb!hOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!dO!ctO!hZO!kYO!lYO!mYO!ouO!t!gO$Q!jO$UfO'u!cO'wTO'zUO(SVO(b[O(oiO~O^,^O!qvO#p}O%d}O%e}O%f}O~P!FWO!h&eO~O&T,dO~O!X,fO~O&f,hO&h,iOP&caQ&caV&ca^&caa&cab&cai&cak&cal&cam&cas&cau&caw&ca|&ca!Q&ca!R&ca!X&ca!c&ca!h&ca!k&ca!l&ca!m&ca!o&ca!q&ca!t&ca!x&ca#p&ca$Q&ca$U&ca%`&ca%b&ca%d&ca%e&ca%f&ca%i&ca%k&ca%n&ca%o&ca%q&ca%}&ca&T&ca&V&ca&X&ca&Z&ca&^&ca&d&ca&j&ca&l&ca&n&ca&p&ca&r&ca'j&ca'u&ca'w&ca'z&ca(S&ca(b&ca(o&ca!W&ca&[&ca_&ca&a&ca~O'u,nO~O!V{X!V!_X!W{X!W!_X!a{X!a!_X!h!_X#X{X(O!_X~O!a,sO#X,rO!V#aX!V([X!W#aX!W([X!a([X!h([X(O([X~O!a,uO!h%]O(O%QO!V!ZX!W!ZX~Ol!mO|!nO'wTO'zUO(V!lO~OP9pOQ9pOa;aOb!hOikOk9pOlkOmkOskOu9pOw9pO|WO!QkO!RkO!X!dO!c9sO!hZO!k9pO!l9pO!m9pO!o9tO!q9wO!t!gO$Q!jO$UfO'wTO'zUO(SVO(b[O(o;_O~O'u:fO~P# ^O!V,yO!W(ZX~O!W,{O~O!a,sO#X,rO!V#aX!W#aX~O!V,|O!W(iX~O!W-OO~O!]-PO!^-PO'v!kO~P!N{O!W-SO~P'WOg-VO!X'UO~O!S-[O~Ol!wa![!wa!]!wa!^!wa!|!wa!}!wa#O!wa#P!wa#Q!wa#T!wa#U!wa'v!wa'w!wa'z!wa(V!wa(b!wa~P!#RO!l-aO#X-_O~PBqO!]-cO!^-cO'v!kO~PCaO^%fO#X-_O'l%fO~O^%fO!a#tO#X-_O'l%fO~O^%fO!a#tO!l-aO#X-_O'l%fO(c'fO~O'q'nO'r'nO's-hO~Oo-iO~O!S&}a!V&}a~P!7sO!U-mO!S&}X!V&}X~P%TO!V'zO!S(Ya~O!S(Ya~PGTO!V(RO!S(ga~O|%`O!U-qO!X%aO'u%_O!S'TX!V'TX~O#X-sO!V(ea!g(ea^(ea'l(ea~O!a#tO~P#)dO!V(_O!g(da~O|%`O!X%aO#c-wO'u%_O~Oi-|O|%`O!U-yO!X%aO!x]O#b-{O#c-yO'u%_O!V'WX!g'WX~Oz.QO!h#wO~Og.TO!X'UO%a.SO(O%QO~O^#[i!V#[i'l#[i'j#[i!S#[i!g#[io#[i!X#[i%a#[i!a#[i~P!7sOg;kOy)uO|)vO(j)xO(k)zO~O#d#Wa^#Wa#X#Wa'l#Wa!V#Wa!g#Wa!X#Wa!S#Wa~P#,`O#d(RXP(RXX(RX^(RXk(RXz(RX!e(RX!h(RX!l(RX#g(RX#h(RX#i(RX#j(RX#k(RX#l(RX#m(RX#n(RX#o(RX#q(RX#s(RX#u(RX#v(RX'l(RX(S(RX(c(RX!g(RX!S(RX'j(RXo(RX!X(RX%a(RX!a(RX~P!4QO!V.^Od(]X~P!0dOd.`O~O!V.aO!g(^X~P!7sO!g.dO~O!S.fO~OP$[Oy#xOz#yO|#zO!f#vO!h#wO!l$[O(SVOX#fi^#fik#fi!V#fi!e#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi'l#fi(c#fi(j#fi(k#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~O#g#fi~P#0[O#g#}O~P#0[OP$[Oy#xOz#yO|#zO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO(SVOX#fi^#fi!V#fi!e#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi'l#fi(c#fi(j#fi(k#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~Ok#fi~P#2|Ok$PO~P#2|OP$[Ok$POy#xOz#yO|#zO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO(SVO^#fi!V#fi#q#fi#s#fi#u#fi#v#fi'l#fi(c#fi(j#fi(k#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~OX#fi!e#fi#l#fi#m#fi#n#fi#o#fi~P#5nOX$cO!e$RO#l$RO#m$RO#n$bO#o$RO~P#5nOP$[OX$cOk$POy#xOz#yO|#zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO(SVO^#fi!V#fi#s#fi#u#fi#v#fi'l#fi(c#fi(k#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~O(j#fi~P#8oO(j#{O~P#8oOP$[OX$cOk$POy#xOz#yO|#zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO(SVO(j#{O^#fi!V#fi#u#fi#v#fi'l#fi(c#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~O(k#fi~P#;aO(k#|O~P#;aOP$[OX$cOk$POy#xOz#yO|#zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO#u$WO(SVO(j#{O(k#|O~O^#fi!V#fi#v#fi'l#fi(c#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~P#>ROPYXXYXkYXyYXzYX|YX!eYX!fYX!hYX!lYX#XYX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX(SYX(cYX(jYX(kYX!VYX!WYX~O#yYX~P#@lOP$[OX:XOk9{Oy#xOz#yO|#zO!e9}O!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O#l9}O#m9}O#n:WO#o9}O#q:OO#s:QO#u:SO#v:TO(SVO(c$YO(j#{O(k#|O~O#y.hO~P#ByO#X:YO#{:YO#y(XX!W(XX~PN}O^'Za!V'Za'l'Za'j'Za!g'Za!S'Zao'Za!X'Za%a'Za!a'Za~P!7sOP#fiX#fi^#fik#fiz#fi!V#fi!e#fi!f#fi!h#fi!l#fi#g#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi'l#fi(S#fi(c#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~P#,`O^#zi!V#zi'l#zi'j#zi!S#zi!g#zio#zi!X#zi%a#zi!a#zi~P!7sO$W.mO$Y.mO~O$W.nO$Y.nO~O!a)^O#X.oO!X$^X$T$^X$W$^X$Y$^X$a$^X~O!U.pO~O!X)aO$T.rO$W)`O$Y)`O$a.sO~O!V:UO!W(WX~P#ByO!W.tO~O!a)^O$a(lX~O$a.vO~Oq)pO(T)qO(U.yO~Ol.|O!S.}O'wTO'zUO~O!VcX!acX!gcX!g$sX(ccX~P!/ZO!g/TO~P#,`O!V/UO!a#tO(c'fO!g(pX~O!g/ZO~O!U*RO'u%_O!g(pP~O#d/]O~O!S$sX!V$sX!a$zX~P!/ZO!V/^O!S(qX~P#,`O!a/`O~O!S/bO~Ok/fO!a#tO!h%]O(O%QO(c'fO~O'u/hO~O!a+XO~O^%fO!V/lO'l%fO~O!W/nO~P!3XO!]/oO!^/oO'v!kO(V!lO~O|/qO(V!lO~O#T/rO~O'u&POd'`X!V'`X~O!V*kOd(Pa~Od/wO~Oy/xOz/xO|/yOgva(jva(kva!Vva#Xva~Odva#yva~P$ hOy)uO|)vOg$la(j$la(k$la!V$la#X$la~Od$la#y$la~P$!^Oy)uO|)vOg$na(j$na(k$na!V$na#X$na~Od$na#y$na~P$#PO#d/{O~Od$|a!V$|a#X$|a#y$|a~P!0dO!a#tO~O#d0OO~O!V*|O^(ua'l(ua~Oy#xOz#yO|#zO!f#vO!h#wO(SVOP!niX!nik!ni!V!ni!e!ni!l!ni#g!ni#h!ni#i!ni#j!ni#k!ni#l!ni#m!ni#n!ni#o!ni#q!ni#s!ni#u!ni#v!ni(c!ni(j!ni(k!ni~O^!ni'l!ni'j!ni!S!ni!g!nio!ni!X!ni%a!ni!a!ni~P$$nOg.TO!X'UO%a.SO~Oi0YO'u0XO~P!1UO!a+XO^'}a!X'}a'l'}a!V'}a~O#d0`O~OXYX!VcX!WcX~O!V0aO!W(yX~O!W0cO~OX0dO~O'u+aO'wTO'zUO~O!X%vO'u%_O]'hX!V'hX~O!V+fO](xa~O!g0iO~P!7sOX0lO~O]0mO~O#X0pO~Og0sO!X${O~O(V(sO!W(vP~Og0|O!X0yO%a0{O(O%QO~OX1WO!V1UO!W(wX~O!W1XO~O]1ZO^%fO'l%fO~O'u#lO'wTO'zUO~O#X$dO#{$dOP(XXX(XXk(XXy(XXz(XX|(XX!V(XX!e(XX!h(XX!l(XX#g(XX#h(XX#i(XX#j(XX#k(XX#l(XX#m(XX#n(XX#q(XX#s(XX#u(XX#v(XX(S(XX(c(XX(j(XX(k(XX~O#o1^O&R1_O^(XX!f(XX~P$+dO#X$dO#o1^O&R1_O~O^1aO~P%TO^1cO~O&[1fOP&YiQ&YiV&Yi^&Yia&Yib&Yii&Yik&Yil&Yim&Yis&Yiu&Yiw&Yi|&Yi!Q&Yi!R&Yi!X&Yi!c&Yi!h&Yi!k&Yi!l&Yi!m&Yi!o&Yi!q&Yi!t&Yi!x&Yi#p&Yi$Q&Yi$U&Yi%`&Yi%b&Yi%d&Yi%e&Yi%f&Yi%i&Yi%k&Yi%n&Yi%o&Yi%q&Yi%}&Yi&T&Yi&V&Yi&X&Yi&Z&Yi&^&Yi&d&Yi&j&Yi&l&Yi&n&Yi&p&Yi&r&Yi'j&Yi'u&Yi'w&Yi'z&Yi(S&Yi(b&Yi(o&Yi!W&Yi_&Yi&a&Yi~O_1lO!W1jO&a1kO~P`O!XXO!h1nO~O&h,iOP&ciQ&ciV&ci^&cia&cib&cii&cik&cil&cim&cis&ciu&ciw&ci|&ci!Q&ci!R&ci!X&ci!c&ci!h&ci!k&ci!l&ci!m&ci!o&ci!q&ci!t&ci!x&ci#p&ci$Q&ci$U&ci%`&ci%b&ci%d&ci%e&ci%f&ci%i&ci%k&ci%n&ci%o&ci%q&ci%}&ci&T&ci&V&ci&X&ci&Z&ci&^&ci&d&ci&j&ci&l&ci&n&ci&p&ci&r&ci'j&ci'u&ci'w&ci'z&ci(S&ci(b&ci(o&ci!W&ci&[&ci_&ci&a&ci~O!S1tO~O!V!Za!W!Za~P#ByOl!mO|!nO!U1zO(V!lO!V'OX!W'OX~P?wO!V,yO!W(Za~O!V'UX!W'UX~P!6{O!V,|O!W(ia~O!W2RO~P'WO^%fO#X2[O'l%fO~O^%fO!a#tO#X2[O'l%fO~O^%fO!a#tO!l2`O#X2[O'l%fO(c'fO~O^%fO'l%fO~P!7sO!V$`Oo$ka~O!S&}i!V&}i~P!7sO!V'zO!S(Yi~O!V(RO!S(gi~O!S(hi!V(hi~P!7sO!V(ei!g(ei^(ei'l(ei~P!7sO#X2bO!V(ei!g(ei^(ei'l(ei~O!V(_O!g(di~O|%`O!X%aO!x]O#b2gO#c2fO'u%_O~O|%`O!X%aO#c2fO'u%_O~Og2nO!X'UO%a2mO~Og2nO!X'UO%a2mO(O%QO~O#dvaPvaXva^vakva!eva!fva!hva!lva#gva#hva#iva#jva#kva#lva#mva#nva#ova#qva#sva#uva#vva'lva(Sva(cva!gva!Sva'jvaova!Xva%ava!ava~P$ hO#d$laP$laX$la^$lak$laz$la!e$la!f$la!h$la!l$la#g$la#h$la#i$la#j$la#k$la#l$la#m$la#n$la#o$la#q$la#s$la#u$la#v$la'l$la(S$la(c$la!g$la!S$la'j$lao$la!X$la%a$la!a$la~P$!^O#d$naP$naX$na^$nak$naz$na!e$na!f$na!h$na!l$na#g$na#h$na#i$na#j$na#k$na#l$na#m$na#n$na#o$na#q$na#s$na#u$na#v$na'l$na(S$na(c$na!g$na!S$na'j$nao$na!X$na%a$na!a$na~P$#PO#d$|aP$|aX$|a^$|ak$|az$|a!V$|a!e$|a!f$|a!h$|a!l$|a#g$|a#h$|a#i$|a#j$|a#k$|a#l$|a#m$|a#n$|a#o$|a#q$|a#s$|a#u$|a#v$|a'l$|a(S$|a(c$|a!g$|a!S$|a'j$|a#X$|ao$|a!X$|a%a$|a!a$|a~P#,`O^#[q!V#[q'l#[q'j#[q!S#[q!g#[qo#[q!X#[q%a#[q!a#[q~P!7sOd'PX!V'PX~P!'oO!V.^Od(]a~O!U2vO!V'QX!g'QX~P%TO!V.aO!g(^a~O!V.aO!g(^a~P!7sO!S2yO~O#y!ja!W!ja~PJqO#y!ba!V!ba!W!ba~P#ByO#y!na!W!na~P!:^O#y!pa!W!pa~P!<wO!X3]O$UfO$_3^O~O!W3bO~Oo3cO~P#,`O^$hq!V$hq'l$hq'j$hq!S$hq!g$hqo$hq!X$hq%a$hq!a$hq~P!7sO!S3dO~Ol.|O'wTO'zUO~Oy)uO|)vO(k)zOg%Xi(j%Xi!V%Xi#X%Xi~Od%Xi#y%Xi~P$JVOy)uO|)vOg%Zi(j%Zi(k%Zi!V%Zi#X%Zi~Od%Zi#y%Zi~P$JxO(c$YO~P#,`O!U3gO'u%_O!V'[X!g'[X~O!V/UO!g(pa~O!V/UO!a#tO!g(pa~O!V/UO!a#tO(c'fO!g(pa~Od$ui!V$ui#X$ui#y$ui~P!0dO!U3oO'u*WO!S'^X!V'^X~P!1RO!V/^O!S(qa~O!V/^O!S(qa~P#,`O!a#tO#o3wO~Ok3zO!a#tO(c'fO~Od(Qi!V(Qi~P!0dO#X3}Od(Qi!V(Qi~P!0dO!g4QO~O^$iq!V$iq'l$iq'j$iq!S$iq!g$iqo$iq!X$iq%a$iq!a$iq~P!7sO!S4UO~O!V4VO!X(rX~P#,`O!f#vO~P4QO^$sX!X$sX%UYX'l$sX!V$sX~P!/ZO%U4XO^hXghXyhX|hX!XhX'lhX(jhX(khX!VhX~O%U4XO~O%b4`O'u+aO'wTO'zUO!V'gX!W'gX~O!V0aO!W(ya~OX4dO~O]4eO~O^%fO'l%fO~P#,`O!X${O~P#,`O!V4mO#X4oO!W(vX~O!W4pO~Ol!mO|4qO![!wO!]!tO!^!tO!x9qO!|!oO!}!oO#O!oO#P!oO#Q!oO#T4vO#U!xO'v!kO'wTO'zUO(V!lO(b!rO~O!W4uO~P%$wOg4{O!X0yO%a4zO~Og4{O!X0yO%a4zO(O%QO~O'u#lO!V'fX!W'fX~O!V1UO!W(wa~O'wTO'zUO(V5UO~O]5YO~O#o5]O&R5^O~PMaO!g5_O~P%TO^5aO~O^5aO~P%TO_1lO!W5fO&a1kO~P`O!a5hO~O!a5jO!V([i!W([i!a([i!h([i(O([i~O!V#ai!W#ai~P#ByO#X5kO!V#ai!W#ai~O!V!Zi!W!Zi~P#ByO^%fO#X5tO'l%fO~O^%fO!a#tO#X5tO'l%fO~O!V(eq!g(eq^(eq'l(eq~P!7sO!V(_O!g(dq~O|%`O!X%aO#c5{O'u%_O~O!X'UO%a6OO~Og6RO!X'UO%a6OO~O#d%XiP%XiX%Xi^%Xik%Xiz%Xi!e%Xi!f%Xi!h%Xi!l%Xi#g%Xi#h%Xi#i%Xi#j%Xi#k%Xi#l%Xi#m%Xi#n%Xi#o%Xi#q%Xi#s%Xi#u%Xi#v%Xi'l%Xi(S%Xi(c%Xi!g%Xi!S%Xi'j%Xio%Xi!X%Xi%a%Xi!a%Xi~P$JVO#d%ZiP%ZiX%Zi^%Zik%Ziz%Zi!e%Zi!f%Zi!h%Zi!l%Zi#g%Zi#h%Zi#i%Zi#j%Zi#k%Zi#l%Zi#m%Zi#n%Zi#o%Zi#q%Zi#s%Zi#u%Zi#v%Zi'l%Zi(S%Zi(c%Zi!g%Zi!S%Zi'j%Zio%Zi!X%Zi%a%Zi!a%Zi~P$JxO#d$uiP$uiX$ui^$uik$uiz$ui!V$ui!e$ui!f$ui!h$ui!l$ui#g$ui#h$ui#i$ui#j$ui#k$ui#l$ui#m$ui#n$ui#o$ui#q$ui#s$ui#u$ui#v$ui'l$ui(S$ui(c$ui!g$ui!S$ui'j$ui#X$uio$ui!X$ui%a$ui!a$ui~P#,`Od'Pa!V'Pa~P!0dO!V'Qa!g'Qa~P!7sO!V.aO!g(^i~O#y#[i!V#[i!W#[i~P#ByOP$[Oy#xOz#yO|#zO!f#vO!h#wO!l$[O(SVOX#fik#fi!e#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi#y#fi(c#fi(j#fi(k#fi!V#fi!W#fi~O#g#fi~P%3WO#g9yO~P%3WOP$[Oy#xOz#yO|#zO!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO(SVOX#fi!e#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi#y#fi(c#fi(j#fi(k#fi!V#fi!W#fi~Ok#fi~P%5cOk9{O~P%5cOP$[Ok9{Oy#xOz#yO|#zO!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O(SVO#q#fi#s#fi#u#fi#v#fi#y#fi(c#fi(j#fi(k#fi!V#fi!W#fi~OX#fi!e#fi#l#fi#m#fi#n#fi#o#fi~P%7nOX:XO!e9}O#l9}O#m9}O#n:WO#o9}O~P%7nOP$[OX:XOk9{Oy#xOz#yO|#zO!e9}O!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O#l9}O#m9}O#n:WO#o9}O#q:OO(SVO#s#fi#u#fi#v#fi#y#fi(c#fi(k#fi!V#fi!W#fi~O(j#fi~P%:YO(j#{O~P%:YOP$[OX:XOk9{Oy#xOz#yO|#zO!e9}O!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O#l9}O#m9}O#n:WO#o9}O#q:OO#s:QO(SVO(j#{O#u#fi#v#fi#y#fi(c#fi!V#fi!W#fi~O(k#fi~P%<eO(k#|O~P%<eOP$[OX:XOk9{Oy#xOz#yO|#zO!e9}O!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O#l9}O#m9}O#n:WO#o9}O#q:OO#s:QO#u:SO(SVO(j#{O(k#|O~O#v#fi#y#fi(c#fi!V#fi!W#fi~P%>pO^#wy!V#wy'l#wy'j#wy!S#wy!g#wyo#wy!X#wy%a#wy!a#wy~P!7sOg;lOy)uO|)vO(j)xO(k)zO~OP#fiX#fik#fiz#fi!e#fi!f#fi!h#fi!l#fi#g#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi#y#fi(S#fi(c#fi!V#fi!W#fi~P%AhO!f#vOP(RXX(RXg(RXk(RXy(RXz(RX|(RX!e(RX!h(RX!l(RX#g(RX#h(RX#i(RX#j(RX#k(RX#l(RX#m(RX#n(RX#o(RX#q(RX#s(RX#u(RX#v(RX#y(RX(S(RX(c(RX(j(RX(k(RX!V(RX!W(RX~O#y#zi!V#zi!W#zi~P#ByO#y!ni!W!ni~P$$nO!W6_O~O!V'Za!W'Za~P#ByO!a#tO(c'fO!V'[a!g'[a~O!V/UO!g(pi~O!V/UO!a#tO!g(pi~Od$uq!V$uq#X$uq#y$uq~P!0dO!S'^a!V'^a~P#,`O!a6fO~O!V/^O!S(qi~P#,`O!V/^O!S(qi~O!S6jO~O!a#tO#o6oO~Ok6pO!a#tO(c'fO~O!S6rO~Od$wq!V$wq#X$wq#y$wq~P!0dO^$iy!V$iy'l$iy'j$iy!S$iy!g$iyo$iy!X$iy%a$iy!a$iy~P!7sO!a5jO~O!V4VO!X(ra~O^#[y!V#[y'l#[y'j#[y!S#[y!g#[yo#[y!X#[y%a#[y!a#[y~P!7sOX6wO~O!V0aO!W(yi~O]6}O~O(V(sO!V'cX!W'cX~O!V4mO!W(va~OikO'u7UO~P.bO!W7XO~P%$wOl!mO|7YO'wTO'zUO(V!lO(b!rO~O!X0yO~O!X0yO%a7[O~Og7_O!X0yO%a7[O~OX7dO!V'fa!W'fa~O!V1UO!W(wi~O!g7hO~O!g7iO~O!g7lO~O!g7lO~P%TO^7nO~O!a7oO~O!g7pO~O!V(hi!W(hi~P#ByO^%fO#X7xO'l%fO~O!V(ey!g(ey^(ey'l(ey~P!7sO!V(_O!g(dy~O!X'UO%a7{O~O#d$uqP$uqX$uq^$uqk$uqz$uq!V$uq!e$uq!f$uq!h$uq!l$uq#g$uq#h$uq#i$uq#j$uq#k$uq#l$uq#m$uq#n$uq#o$uq#q$uq#s$uq#u$uq#v$uq'l$uq(S$uq(c$uq!g$uq!S$uq'j$uq#X$uqo$uq!X$uq%a$uq!a$uq~P#,`O#d$wqP$wqX$wq^$wqk$wqz$wq!V$wq!e$wq!f$wq!h$wq!l$wq#g$wq#h$wq#i$wq#j$wq#k$wq#l$wq#m$wq#n$wq#o$wq#q$wq#s$wq#u$wq#v$wq'l$wq(S$wq(c$wq!g$wq!S$wq'j$wq#X$wqo$wq!X$wq%a$wq!a$wq~P#,`O!V'Qi!g'Qi~P!7sO#y#[q!V#[q!W#[q~P#ByOy/xOz/xO|/yOPvaXvagvakva!eva!fva!hva!lva#gva#hva#iva#jva#kva#lva#mva#nva#ova#qva#sva#uva#vva#yva(Sva(cva(jva(kva!Vva!Wva~Oy)uO|)vOP$laX$lag$lak$laz$la!e$la!f$la!h$la!l$la#g$la#h$la#i$la#j$la#k$la#l$la#m$la#n$la#o$la#q$la#s$la#u$la#v$la#y$la(S$la(c$la(j$la(k$la!V$la!W$la~Oy)uO|)vOP$naX$nag$nak$naz$na!e$na!f$na!h$na!l$na#g$na#h$na#i$na#j$na#k$na#l$na#m$na#n$na#o$na#q$na#s$na#u$na#v$na#y$na(S$na(c$na(j$na(k$na!V$na!W$na~OP$|aX$|ak$|az$|a!e$|a!f$|a!h$|a!l$|a#g$|a#h$|a#i$|a#j$|a#k$|a#l$|a#m$|a#n$|a#o$|a#q$|a#s$|a#u$|a#v$|a#y$|a(S$|a(c$|a!V$|a!W$|a~P%AhO#y$hq!V$hq!W$hq~P#ByO#y$iq!V$iq!W$iq~P#ByO!W8VO~O#y8WO~P!0dO!a#tO!V'[i!g'[i~O!a#tO(c'fO!V'[i!g'[i~O!V/UO!g(pq~O!S'^i!V'^i~P#,`O!V/^O!S(qq~O!S8^O~P#,`O!S8^O~Od(Qy!V(Qy~P!0dO!V'aa!X'aa~P#,`O^%Tq!X%Tq'l%Tq!V%Tq~P#,`OX8cO~O!V0aO!W(yq~O#X8gO!V'ca!W'ca~O!V4mO!W(vi~P#ByOPYXXYXkYXyYXzYX|YX!SYX!VYX!eYX!fYX!hYX!lYX#XYX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX(SYX(cYX(jYX(kYX~O!a%RX#o%RX~P&2hO!X0yO%a8kO~O'wTO'zUO(V8pO~O!V1UO!W(wq~O!g8sO~O!g8tO~O!g8uO~O!g8uO~P%TO#X8xO!V#ay!W#ay~O!V#ay!W#ay~P#ByO!X'UO%a8}O~O#y#wy!V#wy!W#wy~P#ByOP$uiX$uik$uiz$ui!e$ui!f$ui!h$ui!l$ui#g$ui#h$ui#i$ui#j$ui#k$ui#l$ui#m$ui#n$ui#o$ui#q$ui#s$ui#u$ui#v$ui#y$ui(S$ui(c$ui!V$ui!W$ui~P%AhOy)uO|)vO(k)zOP%XiX%Xig%Xik%Xiz%Xi!e%Xi!f%Xi!h%Xi!l%Xi#g%Xi#h%Xi#i%Xi#j%Xi#k%Xi#l%Xi#m%Xi#n%Xi#o%Xi#q%Xi#s%Xi#u%Xi#v%Xi#y%Xi(S%Xi(c%Xi(j%Xi!V%Xi!W%Xi~Oy)uO|)vOP%ZiX%Zig%Zik%Ziz%Zi!e%Zi!f%Zi!h%Zi!l%Zi#g%Zi#h%Zi#i%Zi#j%Zi#k%Zi#l%Zi#m%Zi#n%Zi#o%Zi#q%Zi#s%Zi#u%Zi#v%Zi#y%Zi(S%Zi(c%Zi(j%Zi(k%Zi!V%Zi!W%Zi~O#y$iy!V$iy!W$iy~P#ByO#y#[y!V#[y!W#[y~P#ByO!a#tO!V'[q!g'[q~O!V/UO!g(py~O!S'^q!V'^q~P#,`O!S9UO~P#,`O!V0aO!W(yy~O!V4mO!W(vq~O!X0yO%a9]O~O!g9`O~O!X'UO%a9eO~OP$uqX$uqk$uqz$uq!e$uq!f$uq!h$uq!l$uq#g$uq#h$uq#i$uq#j$uq#k$uq#l$uq#m$uq#n$uq#o$uq#q$uq#s$uq#u$uq#v$uq#y$uq(S$uq(c$uq!V$uq!W$uq~P%AhOP$wqX$wqk$wqz$wq!e$wq!f$wq!h$wq!l$wq#g$wq#h$wq#i$wq#j$wq#k$wq#l$wq#m$wq#n$wq#o$wq#q$wq#s$wq#u$wq#v$wq#y$wq(S$wq(c$wq!V$wq!W$wq~P%AhOd%]!Z!V%]!Z#X%]!Z#y%]!Z~P!0dO!V'cq!W'cq~P#ByO!V#a!Z!W#a!Z~P#ByO#d%]!ZP%]!ZX%]!Z^%]!Zk%]!Zz%]!Z!V%]!Z!e%]!Z!f%]!Z!h%]!Z!l%]!Z#g%]!Z#h%]!Z#i%]!Z#j%]!Z#k%]!Z#l%]!Z#m%]!Z#n%]!Z#o%]!Z#q%]!Z#s%]!Z#u%]!Z#v%]!Z'l%]!Z(S%]!Z(c%]!Z!g%]!Z!S%]!Z'j%]!Z#X%]!Zo%]!Z!X%]!Z%a%]!Z!a%]!Z~P#,`OP%]!ZX%]!Zk%]!Zz%]!Z!e%]!Z!f%]!Z!h%]!Z!l%]!Z#g%]!Z#h%]!Z#i%]!Z#j%]!Z#k%]!Z#l%]!Z#m%]!Z#n%]!Z#o%]!Z#q%]!Z#s%]!Z#u%]!Z#v%]!Z#y%]!Z(S%]!Z(c%]!Z!V%]!Z!W%]!Z~P%AhOo(WX~P1jO'v!kO~P!){O!ScX!VcX#XcX~P&2hOPYXXYXkYXyYXzYX|YX!VYX!VcX!eYX!fYX!hYX!lYX#XYX#XcX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX(SYX(cYX(jYX(kYX~O!acX!gYX!gcX(ccX~P&HOOP9pOQ9pOa;aOb!hOikOk9pOlkOmkOskOu9pOw9pO|WO!QkO!RkO!XXO!c9sO!hZO!k9pO!l9pO!m9pO!o9tO!q9wO!t!gO$Q!jO$UfO'u)TO'wTO'zUO(SVO(b[O(o;_O~O!V:UO!W$ka~Oi%ROk$sOl$rOm$rOs%SOu%TOw:[O|$zO!X${O!c;fO!h$wO#c:bO$Q%XO$m:^O$o:`O$r%YO'u(kO'wTO'zUO(O%QO(S$tO~O#p)[O~P&LtO!WYX!WcX~P&HOO#d9xO~O!a#tO#d9xO~O#X:YO~O#o9}O~O#X:dO!V(hX!W(hX~O#X:YO!V(fX!W(fX~O#d:eO~Od:gO~P!0dO#d:lO~O#d:mO~O!a#tO#d:nO~O!a#tO#d:eO~O#y:oO~P#ByO#d:pO~O#d:qO~O#d:rO~O#d:sO~O#d:tO~O#d:uO~O#y:vO~P!0dO#y:wO~P!0dO$U~!f!|!}#P#Q#T#b#c#n(o$m$o$r%U%`%a%b%i%k%n%o%q%s~'pR$U(o#h!R'n'v#il#g#jky'o(V'o'u$W$Y$W~",
  goto: "$&O(}PPPP)OP)RP)cP*r.uPPPP5WPP5mP;h>mP?QP?QPPP?QP@pP?QP?QP?QP@tPP@yPAdPFZPPPF_PPPPF_I_PPPIeJ`PF_PLmPPPPN{F_PPPF_PF_P!#ZF_P!&n!'p!'yP!(l!(p!(lPPPPP!+z!'pPP!,h!-bP!0UF_F_!0Z!3d!7x!7x!;mPPP!;tF_PPPPPPPPPPP!?QP!@cPPF_!ApPF_PF_F_F_F_PF_!CSPP!FZP!I^P!Ib!Il!Ip!IpP!FWP!It!ItP!LwP!L{F_F_!MR#!T?QP?QP?Q?QP##_?Q?Q#%X?Q#'f?Q#)Y?Q?Q#)v#+r#+r#+v#,O#+r#,WP#+rP?Q#,p?Q#-x?Q?Q5WPPP#/TPPP#/m#/mP#/mP#0S#/mPP#0YP#0PP#0P#0l#0P#1W#1^5T)R#1a)RP#1h#1h#1hP)RP)RP)RP)RPP)RP#1n#1qP#1q)RP#1uP#1xP)RP)RP)RP)RP)RP)R)RPP#2O#2U#2`#2f#2l#2r#2x#3W#3^#3d#3n#3t#4O#4_#4e#5U#5h#5n#5t#6S#6i#7y#8X#8_#8e#8k#8q#8{#9R#9X#9c#9u#9{PPPPPPPPPP#:RPPPPPPP#:u#=|P#?]#?d#?lPPPP#Cv#Fl#MS#MV#MY#NR#NU#NX#N`#NhPP#Nn#Nr$ j$!i$!m$#RPP$#V$#]$#aP$#d$#h$#k$$a$$w$%_$%c$%f$%i$%o$%r$%v$%zR!zRmqOXs!Y#b%e&h&j&k&m,a,f1f1iY!tQ'U-R0y4tQ%kuQ%sxQ%z{Q&`!US&|!d,yQ'[!hS'b!q!wS*^${*cQ+_%tQ+l%|Q,Q&YQ-P'TQ-Z']Q-c'cQ/o*eQ1T,RR:c9t$|dOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{,^,a,f-V-_-m-s.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2v4q4{5]5^5a5t7Y7_7n7xS#o]9q!r)V$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bQ*n%UQ+d%vQ,S&]Q,Z&eQ.W:ZQ0V+VQ0Z+XQ0f+eQ1],XQ2j.TQ4_0aQ5S1UQ6Q2nQ6W:[Q6y4`R8O6R&zkOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bt!mQ!q!t!w!x&|'T'U'b'c'd,y-P-R-c0y4t4v$Y$ri#t#v$b$c$w$z%V%W%[)p)y){)|*T*Z*i*j+U+X+p+s.S.^/]/^/`/{0p0s0{2m3e3o3w3}4V4X4z6O6f6o7[7{8W8k8}9]9e:W:X:]:^:_:`:a:b:h:i:j:k:l:m:p:q:r:s:v:w;_;g;h;k;lQ%}{Q&z!dS'Q%a,|Q+d%vS.|)v/OQ/z*rQ0f+eQ0k+kQ1[,WQ1],XQ4_0aQ4h0mQ5V1WQ5W1ZQ6y4`Q6|4eQ7g5YQ8f6}R8q7dpnOXs!U!Y#b%e&_&h&j&k&m,a,f1f1iR,U&a&t^OPXYstuvy!Y!_!f!i!n#Q#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y'W'h'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;a;b[#ZWZ#U#X&}'x!S%bm#f#g#j%]%`(R(](^(_*y*z*|,],s-q-w-x-y-{1n2f2g5j5{Q%nwQ%rxS%w{%|Q&T!SQ'X!gQ'Z!hQ(f#qS*Q$w*US+^%s%tQ+b%vQ+{&WQ,P&YS-Y'[']Q.V(gQ/Y*RQ0_+_Q0e+eQ0g+fQ0j+jQ1O+|S1S,Q,RQ2W-ZQ3f/UQ4^0aQ4b0dQ4g0lQ5R1TQ6c3gQ6x4`Q6{4dQ8b6wR9W8cv$yi#v%V%W%[)y){*T*i*j.^/]/{3e3}8W;_;g;h!S%px!h!s%r%s%t&{'Z'[']'a'k*]+^+_,v-Y-Z-b/g0_2P2W2_3yQ+W%nQ+q&QQ+t&RQ,O&YQ.U(fQ0}+{U1R,P,Q,RQ2o.VQ4|1OS5Q1S1TQ7c5R!z;c#t$b$c$w$z)p)|*Z+U+X+p+s.S/^/`0p0s0{2m3o3w4V4X4z6O6f6o7[7{8k8}9]9e:]:_:a:h:j:l:p:r:v;k;lg;d:W:X:^:`:b:i:k:m:q:s:wW%Oi%Q*k;_S&Q!P&_Q&R!QQ&S!RR+o&O$Z$}i#t#v$b$c$w$z%V%W%[)p)y){)|*T*Z*i*j+U+X+p+s.S.^/]/^/`/{0p0s0{2m3e3o3w3}4V4X4z6O6f6o7[7{8W8k8}9]9e:W:X:]:^:_:`:a:b:h:i:j:k:l:m:p:q:r:s:v:w;_;g;h;k;lT)q$t)rV*o%U:Z:[U'Q!d%a,|S(t#x#yQ+i%yS.O(b(cQ0t+uQ4O/xR7R4m&zkOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;b$i$_c#W#c%i%j%l'w'}(i(p(x(y(z({(|(})O)P)Q)R)S)U)X)])g+S+h,w-f-k-p-r.].c.g.i.j.k.z/|1u1x2Y2a2u2z2{2|2}3O3P3Q3R3S3T3U3V3W3Z3[3a4S4[5m5s5x6U6V6[6]7T7r7v8P8T8U8z9Y9a9r;UT#RV#S&{kOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bQ'O!dR1{,yv!mQ!d!q!t!w!x&|'T'U'b'c'd,y-P-R-c0y4t4vS*]${*cS/g*^*eQ/p*fQ0v+wQ3y/oR3|/rlqOXs!Y#b%e&h&j&k&m,a,f1f1iQ&o!]Q'l!vS(h#s9xQ+[%qQ+y&TQ+z&VQ-W'YQ-e'eS.[(m:eS/}*w:nQ0]+]Q0x+xQ1m,hQ1o,iQ1w,tQ2U-XQ2X-]S4T0O:tQ4Y0^S4]0`:uQ5l1yQ5p2VQ5u2^Q6v4ZQ7s5nQ7t5qQ7w5vR8w7p$d$^c#W#c%j%l'w'}(i(p(x(y(z({(|(})O)P)Q)R)S)U)X)])g+S+h,w-f-k-p-r.].c.g.j.k.z/|1u1x2Y2a2u2z2{2|2}3O3P3Q3R3S3T3U3V3W3Z3[3a4S4[5m5s5x6U6V6[6]7T7r7v8P8T8U8z9Y9a9r;US(e#n'_U*h$|(l3YS+R%i.iQ2k0VQ5}2jQ7}6QR9O8O$d$]c#W#c%j%l'w'}(i(p(x(y(z({(|(})O)P)Q)R)S)U)X)])g+S+h,w-f-k-p-r.].c.g.j.k.z/|1u1x2Y2a2u2z2{2|2}3O3P3Q3R3S3T3U3V3W3Z3[3a4S4[5m5s5x6U6V6[6]7T7r7v8P8T8U8z9Y9a9r;US(d#n'_S(v#y$^S+Q%i.iS.P(c(eQ.l)WQ0S+RR2h.Q&zkOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bS#o]9qQ&j!WQ&k!XQ&m!ZQ&n![R1e,dQ'V!gQ+T%nQ-U'XS.R(f+WQ2S-TW2l.U.V0U0WQ5o2TU5|2i2k2oS7z5}6PS8|7|7}S9c8{9OQ9k9dR9n9lU!uQ'U-RT4r0y4t!O_OXZ`s!U!Y#b#f%]%e&_&a&h&j&k&m(_,a,f-x1f1i]!oQ!q'U-R0y4tT#o]9q%WzOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&e&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7xS(t#x#yS.O(b(c!s:{$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bY!sQ'U-R0y4tQ'a!qS'k!t!wS'm!x4vS-b'b'cQ-d'dR2_-cQ'j!sS(Z#e1`S-a'a'mQ/X*QQ/e*]Q2`-dQ3k/YS3t/f/pQ6b3fS6m3z3|Q8Y6cR8a6pQ#ubQ'i!sS(Y#e1`S([#k*vQ*x%^Q+Y%oQ+`%uU-`'a'j'mQ-t(ZQ/W*QQ/d*]Q/j*`Q0[+ZQ1P+}S2]-a-dQ2e-|S3j/X/YS3s/e/pQ3v/iQ3x/kQ5O1QQ5w2`Q6a3fQ6e3kS6i3t3|Q6n3{Q7a5PS8X6b6cQ8]6jQ8_6mQ8n7bQ9S8YQ9T8^Q9V8aQ9_8oQ9g9UQ;O:yQ;Z;SR;[;TV!uQ'U-R%WaOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&e&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7xS#uy!i!r:x$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bR;O;a%WbOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&e&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7xQ%^j!S%ox!h!s%r%s%t&{'Z'[']'a'k*]+^+_,v-Y-Z-b/g0_2P2W2_3yS%uy!iQ+Z%pQ+}&YW1Q,O,P,Q,RU5P1R1S1TS7b5Q5RQ8o7c!r:y$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bQ;S;`R;T;a$zeOPXYstuv!Y!_!f!n#Q#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&h&j&k&m&q&y'W'h'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7xY#`WZ#U#X'x!S%bm#f#g#j%]%`(R(](^(_*y*z*|,],s-q-w-x-y-{1n2f2g5j5{Q,[&e!p:z$Z$l)i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bR:}&}S'R!d%aR1},|$|dOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{,^,a,f-V-_-m-s.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2v4q4{5]5^5a5t7Y7_7n7x!r)V$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bQ,Z&eQ0V+VQ2j.TQ6Q2nR8O6R!f$Tc#W%i'w'}(i(p)P)Q)R)S)X)]+h-f-k-p-r.].c.z/|2Y2a2u3W4S4[5s5x6U7v8z9r!T:P)U)g,w.i1u1x2z3S3T3U3V3Z3a5m6V6[6]7T7r8P8T8U9Y9a;U!b$Vc#W%i'w'}(i(p)R)S)X)]+h-f-k-p-r.].c.z/|2Y2a2u3W4S4[5s5x6U7v8z9r!P:R)U)g,w.i1u1x2z3U3V3Z3a5m6V6[6]7T7r8P8T8U9Y9a;U!^$Zc#W%i'w'}(i(p)X)]+h-f-k-p-r.].c.z/|2Y2a2u3W4S4[5s5x6U7v8z9rQ3e/Sz;b)U)g,w.i1u1x2z3Z3a5m6V6[6]7T7r8P8T8U9Y9a;UQ;g;iR;h;j&zkOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bS$mh$nR3^.o'RgOPWXYZhstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l$n%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.o.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bT$if$oQ$gfS)`$j)dR)l$oT$hf$oT)b$j)d'RhOPWXYZhstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l$n%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.o.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bT$mh$nQ$phR)k$n%WjOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&e&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7x!s;`$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;b#alOPXZs!Y!_!n#Q#b#m#z$l%e&a&d&e&h&j&k&m&q&y'W(u)i*{+V,^,a,f-V.T.p/y0|1^1_1a1c1f1i1k2n3]4q4{5]5^5a6R7Y7_7nv$|i#v%V%W%[)y){*T*i*j.^/]/{3e3}8W;_;g;h!z(l#t$b$c$w$z)p)|*Z+U+X+p+s.S/^/`0p0s0{2m3o3w4V4X4z6O6f6o7[7{8k8}9]9e:]:_:a:h:j:l:p:r:v;k;lQ*s%YQ.{)ug3Y:W:X:^:`:b:i:k:m:q:s:wv$xi#v%V%W%[)y){*T*i*j.^/]/{3e3}8W;_;g;hQ*V$yS*`${*cQ*t%ZQ/k*a!z;Q#t$b$c$w$z)p)|*Z+U+X+p+s.S/^/`0p0s0{2m3o3w4V4X4z6O6f6o7[7{8k8}9]9e:]:_:a:h:j:l:p:r:v;k;lf;R:W:X:^:`:b:i:k:m:q:s:wQ;V;cQ;W;dQ;X;eR;Y;fv$|i#v%V%W%[)y){*T*i*j.^/]/{3e3}8W;_;g;h!z(l#t$b$c$w$z)p)|*Z+U+X+p+s.S/^/`0p0s0{2m3o3w4V4X4z6O6f6o7[7{8k8}9]9e:]:_:a:h:j:l:p:r:v;k;lg3Y:W:X:^:`:b:i:k:m:q:s:wloOXs!Y#b%e&h&j&k&m,a,f1f1iQ*Y$zQ,o&tQ,p&vR3n/^$Y$}i#t#v$b$c$w$z%V%W%[)p)y){)|*T*Z*i*j+U+X+p+s.S.^/]/^/`/{0p0s0{2m3e3o3w3}4V4X4z6O6f6o7[7{8W8k8}9]9e:W:X:]:^:_:`:a:b:h:i:j:k:l:m:p:q:r:s:v:w;_;g;h;k;lQ+r&RQ0r+tQ4k0qR7Q4lT*b${*cS*b${*cT4s0y4tS/i*_4qT3{/q7YQ+Y%oQ/j*`Q0[+ZQ1P+}Q5O1QQ7a5PQ8n7bR9_8on)y$u(n*u/[/s/t2s3l4R6`6q9R;P;];^!W:h(j)Z*P*X.Z.w/S/a0T0o0q2r3m3q4j4l6S6T6g6k6s6u8[8`9f;i;j]:i3X6Z8Q9P9Q9op){$u(n*u/Q/[/s/t2s3l4R6`6q9R;P;];^!Y:j(j)Z*P*X.Z.w/S/a0T0o0q2p2r3m3q4j4l6S6T6g6k6s6u8[8`9f;i;j_:k3X6Z8Q8R9P9Q9opnOXs!U!Y#b%e&_&h&j&k&m,a,f1f1iQ&[!TR,^&epnOXs!U!Y#b%e&_&h&j&k&m,a,f1f1iR&[!TQ+v&SR0n+oqnOXs!U!Y#b%e&_&h&j&k&m,a,f1f1iQ0z+{S4y0}1OU7Z4w4x4|S8j7]7^S9Z8i8lQ9h9[R9m9iQ&c!UR,V&_R5V1WS%w{%|R0g+fQ&h!VR,a&iR,g&nT1g,f1iR,k&oQ,j&oR1p,kQ'o!yR-g'oQsOQ#bXT%hs#bQ!|TR'q!|Q#PUR's#PQ)r$tR.x)rQ#SVR'u#SQ#VWU'{#V'|-nQ'|#WR-n'}Q,z'OR1|,zQ._(nR2t._Q.b(pS2w.b2xR2x.cQ-R'UR2Q-RY!qQ'U-R0y4tR'`!qS#]W%`U(S#](T-oQ(T#^R-o(OQ,}'RR2O,}r`OXs!U!Y#b%e&_&a&h&j&k&m,a,f1f1iS#fZ%]U#p`#f-xR-x(_Q(`#hQ-u([W-}(`-u2c5yQ2c-vR5y2dQ)d$jR.q)dQ$nhR)j$nQ$acU)Y$a-j:VQ-j9rR:V)gQ/V*QW3h/V3i6d8ZU3i/W/X/YS6d3j3kR8Z6e#m)w$u(j(n)Z*P*X*p*q*u.X.Y.Z.w/Q/R/S/[/a/s/t0T0o0q2p2q2r2s3X3l3m3q4R4j4l6S6T6X6Y6Z6`6g6k6q6s6u8Q8R8S8[8`9P9Q9R9f9o;P;];^;i;jQ/_*XU3p/_3r6hQ3r/aR6h3qQ*c${R/m*cQ*l%PR/v*lQ4W0TR6t4WQ*}%cR0R*}Q4n0tS7S4n8hR8h7TQ+x&TR0w+xQ4t0yR7W4tQ1V,SS5T1V7eR7e5VQ0b+bW4a0b4c6z8dQ4c0eQ6z4bR8d6{Q+g%wR0h+gQ1i,fR5e1iWrOXs#bQ&l!YQ+P%eQ,`&hQ,b&jQ,c&kQ,e&mQ1d,aS1g,f1iR5d1fQ%gpQ&p!^Q&s!`Q&u!aQ&w!bQ'g!sQ+O%dQ+[%qQ+n%}Q,U&cQ,m&rW-^'a'i'j'mQ-e'eQ/l*bQ0]+]S1Y,V,YQ1q,lQ1r,oQ1s,pQ2X-]W2Z-`-a-d-fQ4Y0^Q4f0kQ4i0oQ4}1PQ5X1[Q5c1eU5r2Y2]2`Q5u2^Q6v4ZQ7O4hQ7P4jQ7V4sQ7`5OQ7f5WS7u5s5wQ7w5vQ8e6|Q8m7aQ8r7gQ8y7vQ9X8fQ9^8nQ9b8zR9j9_Q%qxQ'Y!hQ'e!sU+]%r%s%tQ,t&{U-X'Z'[']S-]'a'kQ/c*]S0^+^+_Q1y,vS2V-Y-ZQ2^-bQ3u/gQ4Z0_Q5n2PQ5q2WQ5v2_R6l3yS$vi;_R*m%QU%Pi%Q;_R/u*kQ$uiS(j#t+XQ(n#vS)Z$b$cQ*P$wQ*X$zQ*p%VQ*q%WQ*u%[Q.X:]Q.Y:_Q.Z:aQ.w)pQ/Q)yQ/R){Q/S)|Q/[*TQ/a*ZQ/s*iQ/t*jh0T+U.S0{2m4z6O7[7{8k8}9]9eQ0o+pQ0q+sQ2p:hQ2q:jQ2r:lQ2s.^S3X:W:XQ3l/]Q3m/^Q3q/`Q4R/{Q4j0pQ4l0sQ6S:pQ6T:rQ6X:^Q6Y:`Q6Z:bQ6`3eQ6g3oQ6k3wQ6q3}Q6s4VQ6u4XQ8Q:mQ8R:iQ8S:kQ8[6fQ8`6oQ9P:qQ9Q:sQ9R8WQ9f:vQ9o:wQ;P;_Q;];gQ;^;hQ;i;kR;j;llpOXs!Y#b%e&h&j&k&m,a,f1f1iQ!ePS#dZ#mQ&r!_U'^!n4q7YQ't#QQ(w#zQ)h$lS,Y&a&dQ,_&eQ,l&qQ,q&yQ-T'WQ.e(uQ.u)iQ0P*{Q0W+VQ1b,^Q2T-VQ2k.TQ3`.pQ4P/yQ4x0|Q5Z1^Q5[1_Q5`1aQ5b1cQ5g1kQ5}2nQ6^3]Q7^4{Q7j5]Q7k5^Q7m5aQ7}6RQ8l7_R8v7n#UcOPXZs!Y!_!n#b#m#z%e&a&d&e&h&j&k&m&q&y'W(u*{+V,^,a,f-V.T/y0|1^1_1a1c1f1i1k2n4q4{5]5^5a6R7Y7_7nQ#WWQ#cYQ%itQ%juS%lv!fS'w#U'zQ'}#XQ(i#sQ(p#wQ(x#}Q(y$OQ(z$PQ({$QQ(|$RQ(}$SQ)O$TQ)P$UQ)Q$VQ)R$WQ)S$XQ)U$ZQ)X$`Q)]$dW)g$l)i.p3]Q+S%kQ+h%xS,w&}1zQ-f'hS-k'x-mQ-p(QQ-r(XQ.](mQ.c(qQ.g9pQ.i9sQ.j9tQ.k9wQ.z)tQ/|*wQ1u,rQ1x,uQ2Y-_Q2a-sQ2u.aQ2z9xQ2{9yQ2|9zQ2}9{Q3O9|Q3P9}Q3Q:OQ3R:PQ3S:QQ3T:RQ3U:SQ3V:TQ3W.hQ3Z:YQ3[:cQ3a:UQ4S0OQ4[0`Q5m:dQ5s2[Q5x2bQ6U2vQ6V:eQ6[:gQ6]:nQ7T4oQ7r5kQ7v5tQ8P:oQ8T:tQ8U:uQ8z7xQ9Y8gQ9a8xQ9r#QR;U;bR#YWR'P!dY!sQ'U-R0y4tS&{!d,yQ'a!qS'k!t!wS'm!x4vS,v&|'TS-b'b'cQ-d'dQ2P-PR2_-cR(o#vR(r#wQ!eQT-Q'U-R]!pQ!q'U-R0y4tQ#n]R'_9qT#iZ%]S#hZ%]S%cm,]U([#f#g#jS-v(](^Q-z(_Q0Q*|Q2d-wU2e-x-y-{S5z2f2gR7y5{`#[W#U#X%`'x(R*y-qr#eZm#f#g#j%](](^(_*|-w-x-y-{2f2g5{Q1`,]Q1v,sQ5i1nQ7q5jT:|&}*zT#_W%`S#^W%`S'y#U(RS(O#X*yS,x&}*zT-l'x-qT'S!d%aQ$jfR)n$oT)c$j)dR3_.oT*S$w*UR*[$zQ0U+UQ2i.SQ4w0{Q6P2mQ7]4zQ7|6OQ8i7[Q8{7{Q9[8kQ9d8}Q9i9]R9l9elqOXs!Y#b%e&h&j&k&m,a,f1f1iQ&b!UR,U&_rmOXs!T!U!Y#b%e&_&h&j&k&m,a,f1f1iR,]&eT%dm,]R0u+uR,T&]Q%{{R+m%|R+c%vT&f!V&iT&g!V&iT1h,f1i",
  nodeNames: "⚠ ArithOp ArithOp LineComment BlockComment Script ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > TypeParamList TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . ?. PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewExpression new TypeArgList CompareOp < ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies in const CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXStartTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast ArrowFunction TypeParamList SequenceExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
  maxTerm: 366,
  context: trackNewline,
  nodeProps: [
    ["group", -26, 6, 14, 16, 62, 199, 203, 207, 208, 210, 213, 216, 226, 228, 234, 236, 238, 240, 243, 249, 255, 257, 259, 261, 263, 265, 266, "Statement", -32, 10, 11, 25, 28, 29, 35, 45, 48, 49, 51, 56, 64, 72, 76, 78, 80, 81, 103, 104, 113, 114, 131, 134, 136, 137, 138, 139, 141, 142, 162, 163, 165, "Expression", -23, 24, 26, 30, 34, 36, 38, 166, 168, 170, 171, 173, 174, 175, 177, 178, 179, 181, 182, 183, 193, 195, 197, 198, "Type", -3, 84, 96, 102, "ClassItem"],
    ["openedBy", 31, "InterpolationStart", 50, "[", 54, "{", 69, "(", 143, "JSXStartTag", 155, "JSXStartTag JSXStartCloseTag"],
    ["closedBy", 33, "InterpolationEnd", 44, "]", 55, "}", 70, ")", 144, "JSXSelfCloseEndTag JSXEndTag", 160, "JSXEndTag"]
  ],
  propSources: [jsHighlight],
  skippedNodes: [0, 3, 4, 269],
  repeatNodeCount: 33,
  tokenData: "$>y(CSR!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tu>PuvBavwDxwxGgxyMvyz! Qz{!![{|!%O|}!&]}!O!%O!O!P!'g!P!Q!1w!Q!R#0t!R![#3T![!]#@T!]!^#Aa!^!_#Bk!_!`#GS!`!a#In!a!b#N{!b!c$$z!c!}>P!}#O$&U#O#P$'`#P#Q$,w#Q#R$.R#R#S>P#S#T$/`#T#o$0j#o#p$4z#p#q$5p#q#r$7Q#r#s$8^#s$f%Z$f$g+g$g#BY>P#BY#BZ$9h#BZ$IS>P$IS$I_$9h$I_$I|>P$I|$I}$<s$I}$JO$<s$JO$JT>P$JT$JU$9h$JU$KV>P$KV$KW$9h$KW&FU>P&FU&FV$9h&FV;'S>P;'S;=`BZ<%l?HT>P?HT?HU$9h?HUO>P(n%d_$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$d&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$d&j'{!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU'{!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$d&j'xpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU'xpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z(CS+rq$d&j'xp'{!b'n(;dOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z(CS.ST'y#S$d&j'o(;dO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c(CS.n_$d&j'xp'{!b'o(;dOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`/x`$d&j!l$Ip'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S1V`#q$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S2d_#q$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$2b3l_'w$(n$d&j'{!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k*r4r_$d&j'{!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k)`5vX$d&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q)`6jT$_#t$d&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#t6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y#t7bO$_#t#t7eP;=`<%l6y)`7kP;=`<%l5q*r7w]$_#t$d&j'{!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}%W8uZ'{!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p%W9oU$_#t'{!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}%W:UP;=`<%l8p*r:[P;=`<%l4k#%|:hg$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}st%Ztu<Puw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}<P!}#O%Z#O#P&c#P#R%Z#R#S<P#S#T%Z#T#o<P#o#p*g#p$g%Z$g;'S<P;'S;=`=y<%lO<P#%|<[i$d&j(b!L^'xp'{!bOY%ZYZ&cZr%Zrs&}st%Ztu<Puw%Zwx(rx!Q%Z!Q![<P![!^%Z!^!_*g!_!c%Z!c!}<P!}#O%Z#O#P&c#P#R%Z#R#S<P#S#T%Z#T#o<P#o#p*g#p$g%Z$g;'S<P;'S;=`=y<%lO<P#%|=|P;=`<%l<P(CS>`k$d&j'xp'{!b(V!LY'u&;d$W#tOY%ZYZ&cZr%Zrs&}st%Ztu>Puw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![>P![!^%Z!^!_*g!_!c%Z!c!}>P!}#O%Z#O#P&c#P#R%Z#R#S>P#S#T%Z#T#o>P#o#p*g#p$g%Z$g;'S>P;'S;=`BZ<%lO>P+d@`k$d&j'xp'{!b$W#tOY%ZYZ&cZr%Zrs&}st%Ztu@Tuw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![@T![!^%Z!^!_*g!_!c%Z!c!}@T!}#O%Z#O#P&c#P#R%Z#R#S@T#S#T%Z#T#o@T#o#p*g#p$g%Z$g;'S@T;'S;=`BT<%lO@T+dBWP;=`<%l@T(CSB^P;=`<%l>P%#SBl`$d&j'xp'{!b#i$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#SCy_$d&j#{$Id'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%DfETa(k%<v$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sv%ZvwFYwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#SFe`$d&j#u$Id'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$2bGp_'z$)`$d&j'xpOYHoYZIuZrHorsIuswHowxKVx!^Ho!^!_LX!_#OHo#O#PIu#P#oHo#o#pLX#p;'SHo;'S;=`Mp<%lOHo*QHv_$d&j'xpOYHoYZIuZrHorsIuswHowxKVx!^Ho!^!_LX!_#OHo#O#PIu#P#oHo#o#pLX#p;'SHo;'S;=`Mp<%lOHo)`IzX$d&jOwIuwx6cx!^Iu!^!_Jg!_#oIu#o#pJg#p;'SIu;'S;=`KP<%lOIu#tJjTOwJgwx7]x;'SJg;'S;=`Jy<%lOJg#tJ|P;=`<%lJg)`KSP;=`<%lIu*QK`]$_#t$d&j'xpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r$fL^Z'xpOYLXYZJgZrLXrsJgswLXwxMPx#OLX#O#PJg#P;'SLX;'S;=`Mj<%lOLX$fMWU$_#t'xpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r$fMmP;=`<%lLX*QMsP;=`<%lHo(*QNR_!h(!b$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z!'l! ]_!gM|$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'+h!!ib$d&j'xp'{!b'v#)d#j$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!#q{!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S!#|`$d&j'xp'{!b#g$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&-O!%Z`$d&j'xp'{!bk&%`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&C[!&h_!V&;l$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS!'rc$d&j'xp'{!by'<nOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!(}!P!Q%Z!Q![!+g![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z!'d!)Wa$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!*]!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z!'d!*h_!UMt$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!+rg$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!+g![!^%Z!^!_*g!_!g%Z!g!h!-Z!h#O%Z#O#P&c#P#R%Z#R#S!+g#S#X%Z#X#Y!-Z#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!-dg$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!.{|}%Z}!O!.{!O!Q%Z!Q![!0a![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!0a#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!/Uc$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!0a![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!0a#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!0lc$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!0a![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!0a#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS!2Sf$d&j'xp'{!b#h$IdOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}xz!3hz{#$s{!P!3h!P!Q#&Y!Q!^!3h!^!_!Mh!_!`#-x!`!a#/_!a!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h(r!3sb$d&j'xp'{!b!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h(Q!5U`$d&j'{!b!RSOY!4{YZ&cZw!4{wx!6Wx!P!4{!P!Q!=o!Q!^!4{!^!_!?g!_!}!4{!}#O!Bn#O#P!<w#P#o!4{#o#p!?g#p;'S!4{;'S;=`!Cw<%lO!4{&n!6_^$d&j!RSOY!6WYZ&cZ!P!6W!P!Q!7Z!Q!^!6W!^!_!8g!_!}!6W!}#O!;U#O#P!<w#P#o!6W#o#p!8g#p;'S!6W;'S;=`!=i<%lO!6W&n!7ba$d&j!RSO!^&c!_#Z&c#Z#[!7Z#[#]&c#]#^!7Z#^#a&c#a#b!7Z#b#g&c#g#h!7Z#h#i&c#i#j!7Z#j#m&c#m#n!7Z#n#o&c#p;'S&c;'S;=`&w<%lO&cS!8lX!RSOY!8gZ!P!8g!P!Q!9X!Q!}!8g!}#O!9p#O#P!:o#P;'S!8g;'S;=`!;O<%lO!8gS!9^U!RS#Z#[!9X#]#^!9X#a#b!9X#g#h!9X#i#j!9X#m#n!9XS!9sVOY!9pZ#O!9p#O#P!:Y#P#Q!8g#Q;'S!9p;'S;=`!:i<%lO!9pS!:]SOY!9pZ;'S!9p;'S;=`!:i<%lO!9pS!:lP;=`<%l!9pS!:rSOY!8gZ;'S!8g;'S;=`!;O<%lO!8gS!;RP;=`<%l!8g&n!;Z[$d&jOY!;UYZ&cZ!^!;U!^!_!9p!_#O!;U#O#P!<P#P#Q!6W#Q#o!;U#o#p!9p#p;'S!;U;'S;=`!<q<%lO!;U&n!<UX$d&jOY!;UYZ&cZ!^!;U!^!_!9p!_#o!;U#o#p!9p#p;'S!;U;'S;=`!<q<%lO!;U&n!<tP;=`<%l!;U&n!<|X$d&jOY!6WYZ&cZ!^!6W!^!_!8g!_#o!6W#o#p!8g#p;'S!6W;'S;=`!=i<%lO!6W&n!=lP;=`<%l!6W(Q!=xi$d&j'{!b!RSOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#Z&}#Z#[!=o#[#]&}#]#^!=o#^#a&}#a#b!=o#b#g&}#g#h!=o#h#i&}#i#j!=o#j#m&}#m#n!=o#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!f!?nZ'{!b!RSOY!?gZw!?gwx!8gx!P!?g!P!Q!@a!Q!}!?g!}#O!Ap#O#P!:o#P;'S!?g;'S;=`!Bh<%lO!?g!f!@hb'{!b!RSOY'}Zw'}x#O'}#P#Z'}#Z#[!@a#[#]'}#]#^!@a#^#a'}#a#b!@a#b#g'}#g#h!@a#h#i'}#i#j!@a#j#m'}#m#n!@a#n;'S'};'S;=`(f<%lO'}!f!AuX'{!bOY!ApZw!Apwx!9px#O!Ap#O#P!:Y#P#Q!?g#Q;'S!Ap;'S;=`!Bb<%lO!Ap!f!BeP;=`<%l!Ap!f!BkP;=`<%l!?g(Q!Bu^$d&j'{!bOY!BnYZ&cZw!Bnwx!;Ux!^!Bn!^!_!Ap!_#O!Bn#O#P!<P#P#Q!4{#Q#o!Bn#o#p!Ap#p;'S!Bn;'S;=`!Cq<%lO!Bn(Q!CtP;=`<%l!Bn(Q!CzP;=`<%l!4{'`!DW`$d&j'xp!RSOY!C}YZ&cZr!C}rs!6Ws!P!C}!P!Q!EY!Q!^!C}!^!_!GQ!_!}!C}!}#O!JX#O#P!<w#P#o!C}#o#p!GQ#p;'S!C};'S;=`!Kb<%lO!C}'`!Eci$d&j'xp!RSOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#Z(r#Z#[!EY#[#](r#]#^!EY#^#a(r#a#b!EY#b#g(r#g#h!EY#h#i(r#i#j!EY#j#m(r#m#n!EY#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rt!GXZ'xp!RSOY!GQZr!GQrs!8gs!P!GQ!P!Q!Gz!Q!}!GQ!}#O!IZ#O#P!:o#P;'S!GQ;'S;=`!JR<%lO!GQt!HRb'xp!RSOY)rZr)rs#O)r#P#Z)r#Z#[!Gz#[#])r#]#^!Gz#^#a)r#a#b!Gz#b#g)r#g#h!Gz#h#i)r#i#j!Gz#j#m)r#m#n!Gz#n;'S)r;'S;=`*Z<%lO)rt!I`X'xpOY!IZZr!IZrs!9ps#O!IZ#O#P!:Y#P#Q!GQ#Q;'S!IZ;'S;=`!I{<%lO!IZt!JOP;=`<%l!IZt!JUP;=`<%l!GQ'`!J`^$d&j'xpOY!JXYZ&cZr!JXrs!;Us!^!JX!^!_!IZ!_#O!JX#O#P!<P#P#Q!C}#Q#o!JX#o#p!IZ#p;'S!JX;'S;=`!K[<%lO!JX'`!K_P;=`<%l!JX'`!KeP;=`<%l!C}(r!Ksk$d&j'xp'{!b!RSOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#Z%Z#Z#[!Kh#[#]%Z#]#^!Kh#^#a%Z#a#b!Kh#b#g%Z#g#h!Kh#h#i%Z#i#j!Kh#j#m%Z#m#n!Kh#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#W!Mq]'xp'{!b!RSOY!MhZr!Mhrs!?gsw!Mhwx!GQx!P!Mh!P!Q!Nj!Q!}!Mh!}#O#!U#O#P!:o#P;'S!Mh;'S;=`##U<%lO!Mh#W!Nse'xp'{!b!RSOY*gZr*grs'}sw*gwx)rx#O*g#P#Z*g#Z#[!Nj#[#]*g#]#^!Nj#^#a*g#a#b!Nj#b#g*g#g#h!Nj#h#i*g#i#j!Nj#j#m*g#m#n!Nj#n;'S*g;'S;=`+Z<%lO*g#W#!]Z'xp'{!bOY#!UZr#!Urs!Apsw#!Uwx!IZx#O#!U#O#P!:Y#P#Q!Mh#Q;'S#!U;'S;=`##O<%lO#!U#W##RP;=`<%l#!U#W##XP;=`<%l!Mh(r##e`$d&j'xp'{!bOY##[YZ&cZr##[rs!Bnsw##[wx!JXx!^##[!^!_#!U!_#O##[#O#P!<P#P#Q!3h#Q#o##[#o#p#!U#p;'S##[;'S;=`#$g<%lO##[(r#$jP;=`<%l##[(r#$pP;=`<%l!3h(CS#%Qb$d&j'xp'{!b'p(;d!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h(CS#&e_$d&j'xp'{!bR(;dOY#&YYZ&cZr#&Yrs#'dsw#&Ywx#*tx!^#&Y!^!_#,s!_#O#&Y#O#P#(f#P#o#&Y#o#p#,s#p;'S#&Y;'S;=`#-r<%lO#&Y(Bb#'m]$d&j'{!bR(;dOY#'dYZ&cZw#'dwx#(fx!^#'d!^!_#)w!_#O#'d#O#P#(f#P#o#'d#o#p#)w#p;'S#'d;'S;=`#*n<%lO#'d(AO#(mX$d&jR(;dOY#(fYZ&cZ!^#(f!^!_#)Y!_#o#(f#o#p#)Y#p;'S#(f;'S;=`#)q<%lO#(f(;d#)_SR(;dOY#)YZ;'S#)Y;'S;=`#)k<%lO#)Y(;d#)nP;=`<%l#)Y(AO#)tP;=`<%l#(f(<v#*OW'{!bR(;dOY#)wZw#)wwx#)Yx#O#)w#O#P#)Y#P;'S#)w;'S;=`#*h<%lO#)w(<v#*kP;=`<%l#)w(Bb#*qP;=`<%l#'d(Ap#*}]$d&j'xpR(;dOY#*tYZ&cZr#*trs#(fs!^#*t!^!_#+v!_#O#*t#O#P#(f#P#o#*t#o#p#+v#p;'S#*t;'S;=`#,m<%lO#*t(<U#+}W'xpR(;dOY#+vZr#+vrs#)Ys#O#+v#O#P#)Y#P;'S#+v;'S;=`#,g<%lO#+v(<U#,jP;=`<%l#+v(Ap#,pP;=`<%l#*t(=h#,|Y'xp'{!bR(;dOY#,sZr#,srs#)wsw#,swx#+vx#O#,s#O#P#)Y#P;'S#,s;'S;=`#-l<%lO#,s(=h#-oP;=`<%l#,s(CS#-uP;=`<%l#&Y%#W#.Vb$d&j#{$Id'xp'{!b!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h+h#/lb$T#t$d&j'xp'{!b!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h$/l#1Pp$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!+g!P!Q%Z!Q![#3T![!^%Z!^!_*g!_!g%Z!g!h!-Z!h#O%Z#O#P&c#P#R%Z#R#S#3T#S#U%Z#U#V#6_#V#X%Z#X#Y!-Z#Y#b%Z#b#c#5T#c#d#9g#d#l%Z#l#m#<i#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#3`k$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!+g!P!Q%Z!Q![#3T![!^%Z!^!_*g!_!g%Z!g!h!-Z!h#O%Z#O#P&c#P#R%Z#R#S#3T#S#X%Z#X#Y!-Z#Y#b%Z#b#c#5T#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#5`_$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#6hd$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#7v!R!S#7v!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#7v#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#8Rf$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#7v!R!S#7v!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#7v#S#b%Z#b#c#5T#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#9pc$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#:{!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#:{#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#;We$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#:{!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#:{#S#b%Z#b#c#5T#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#<rg$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#>Z![!^%Z!^!_*g!_!c%Z!c!i#>Z!i#O%Z#O#P&c#P#R%Z#R#S#>Z#S#T%Z#T#Z#>Z#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#>fi$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#>Z![!^%Z!^!_*g!_!c%Z!c!i#>Z!i#O%Z#O#P&c#P#R%Z#R#S#>Z#S#T%Z#T#Z#>Z#Z#b%Z#b#c#5T#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%Gh#@b_!a$b$d&j#y%<f'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Al_^l$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS#Bz^(O!*v!e'.r'xp'{!b$U)d(oSOY*gZr*grs'}sw*gwx)rx!P*g!P!Q#Cv!Q!^*g!^!_#Dl!_!`#F^!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#DPX$f&j'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g$Kh#DuZ#k$Id'xp'{!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Eh!`#O*g#P;'S*g;'S;=`+Z<%lO*g$Kh#EqX#{$Id'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g$Kh#FgX#l$Id'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g%Gh#G_a#X%?x$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a#Hd!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#W#Ho_#d$Ih$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%Gh#I}adBf#l$Id$a#|$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`#KS!`!a#L^!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S#K__#l$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S#Lia#k$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`!a#Mn!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S#My`#k$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'+h$ Wc(c$Ip$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P$!c!P!^%Z!^!_*g!_!a%Z!a!b$#m!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'+`$!n_z'#p$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S$#x`$d&j#v$Id'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&^$%V_!x!Ln$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(@^$&a_|(8n$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$'eZ$d&jO!^$(W!^!_$(n!_#i$(W#i#j$(s#j#l$(W#l#m$*f#m#o$(W#o#p$(n#p;'S$(W;'S;=`$,q<%lO$(W(n$(_T[#S$d&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$(sO[#S(n$(x[$d&jO!Q&c!Q![$)n![!^&c!_!c&c!c!i$)n!i#T&c#T#Z$)n#Z#o&c#o#p$,U#p;'S&c;'S;=`&w<%lO&c(n$)sZ$d&jO!Q&c!Q![$*f![!^&c!_!c&c!c!i$*f!i#T&c#T#Z$*f#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$*kZ$d&jO!Q&c!Q![$+^![!^&c!_!c&c!c!i$+^!i#T&c#T#Z$+^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$+cZ$d&jO!Q&c!Q![$(W![!^&c!_!c&c!c!i$(W!i#T&c#T#Z$(W#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$,XR!Q![$,b!c!i$,b#T#Z$,b#S$,eS!Q![$,b!c!i$,b#T#Z$,b#q#r$(n(n$,tP;=`<%l$(W!'l$-S_!SM|$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S$.^`#s$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&,v$/k_$d&j'xp'{!b(S&%WOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS$0yk$d&j'xp'{!b(V!LY'u&;d$Y#tOY%ZYZ&cZr%Zrs&}st%Ztu$0juw%Zwx(rx}%Z}!O$2n!O!Q%Z!Q![$0j![!^%Z!^!_*g!_!c%Z!c!}$0j!}#O%Z#O#P&c#P#R%Z#R#S$0j#S#T%Z#T#o$0j#o#p*g#p$g%Z$g;'S$0j;'S;=`$4t<%lO$0j+d$2yk$d&j'xp'{!b$Y#tOY%ZYZ&cZr%Zrs&}st%Ztu$2nuw%Zwx(rx}%Z}!O$2n!O!Q%Z!Q![$2n![!^%Z!^!_*g!_!c%Z!c!}$2n!}#O%Z#O#P&c#P#R%Z#R#S$2n#S#T%Z#T#o$2n#o#p*g#p$g%Z$g;'S$2n;'S;=`$4n<%lO$2n+d$4qP;=`<%l$2n(CS$4wP;=`<%l$0j!5p$5TX!X!3l'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g%Df$5{a(j%<v$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$#m#q;'S%Z;'S;=`+a<%lO%Z%#`$7__!W$I`o`$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(r$8i_!mS$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS$9y|$d&j'xp'{!b'n(;d(V!LY'u&;d$W#tOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%Ztu>Puw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![>P![!^%Z!^!_*g!_!c%Z!c!}>P!}#O%Z#O#P&c#P#R%Z#R#S>P#S#T%Z#T#o>P#o#p*g#p$f%Z$f$g+g$g#BY>P#BY#BZ$9h#BZ$IS>P$IS$I_$9h$I_$JT>P$JT$JU$9h$JU$KV>P$KV$KW$9h$KW&FU>P&FU&FV$9h&FV;'S>P;'S;=`BZ<%l?HT>P?HT?HU$9h?HUO>P(CS$=Uk$d&j'xp'{!b'o(;d(V!LY'u&;d$W#tOY%ZYZ&cZr%Zrs&}st%Ztu>Puw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![>P![!^%Z!^!_*g!_!c%Z!c!}>P!}#O%Z#O#P&c#P#R%Z#R#S>P#S#T%Z#T#o>P#o#p*g#p$g%Z$g;'S>P;'S;=`BZ<%lO>P",
  tokenizers: [noSemicolon, incdecToken, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, insertSemicolon, new LocalTokenGroup("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOq~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!O~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(U~~", 141, 327), new LocalTokenGroup("j~RQYZXz{^~^O'r~~aP!P!Qd~iO's~~", 25, 309)],
  topRules: { "Script": [0, 5], "SingleExpression": [1, 267], "SingleClassItem": [2, 268] },
  dialects: { jsx: 12810, ts: 12812 },
  dynamicPrecedences: { "76": 1, "78": 1, "163": 1, "191": 1 },
  specialized: [{ term: 313, get: (value) => spec_identifier2[value] || -1 }, { term: 329, get: (value) => spec_word[value] || -1 }, { term: 67, get: (value) => spec_LessThan[value] || -1 }],
  tokenPrec: 12836
});

// node_modules/.pnpm/@codemirror+lang-javascript@6.1.9/node_modules/@codemirror/lang-javascript/dist/index.js
var snippets = [
  snippetCompletion("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  snippetCompletion("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  snippetCompletion("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  snippetCompletion("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  snippetCompletion("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  snippetCompletion("try {\n	${}\n} catch (${error}) {\n	${}\n}", {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  snippetCompletion("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  snippetCompletion("if (${}) {\n	${}\n} else {\n	${}\n}", {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  snippetCompletion("class ${name} {\n	constructor(${params}) {\n		${}\n	}\n}", {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  snippetCompletion('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  snippetCompletion('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
];
var cache = new NodeWeakMap();
var ScopeNodes = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function defID(type) {
  return (node, def) => {
    let id2 = node.node.getChild("VariableDefinition");
    if (id2)
      def(id2, type);
    return true;
  };
}
var functionContext = ["FunctionDeclaration"];
var gatherCompletions = {
  FunctionDeclaration: defID("function"),
  ClassDeclaration: defID("class"),
  ClassExpression: () => true,
  EnumDeclaration: defID("constant"),
  TypeAliasDeclaration: defID("type"),
  NamespaceDeclaration: defID("namespace"),
  VariableDefinition(node, def) {
    if (!node.matchContext(functionContext))
      def(node, "variable");
  },
  TypeDefinition(node, def) {
    def(node, "type");
  },
  __proto__: null
};
function getScope(doc, node) {
  let cached = cache.get(node);
  if (cached)
    return cached;
  let completions = [], top = true;
  function def(node2, type) {
    let name = doc.sliceString(node2.from, node2.to);
    completions.push({ label: name, type });
  }
  node.cursor(IterMode.IncludeAnonymous).iterate((node2) => {
    if (top) {
      top = false;
    } else if (node2.name) {
      let gather = gatherCompletions[node2.name];
      if (gather && gather(node2, def) || ScopeNodes.has(node2.name))
        return false;
    } else if (node2.to - node2.from > 8192) {
      for (let c of getScope(doc, node2.node))
        completions.push(c);
      return false;
    }
  });
  cache.set(node, completions);
  return completions;
}
var Identifier = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/;
var dontComplete = [
  "TemplateString",
  "String",
  "RegExp",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "TypeDefinition",
  "Label",
  "PropertyDefinition",
  "PropertyName",
  "PrivatePropertyDefinition",
  "PrivatePropertyName",
  ".",
  "?."
];
function localCompletionSource(context) {
  let inner = syntaxTree(context.state).resolveInner(context.pos, -1);
  if (dontComplete.indexOf(inner.name) > -1)
    return null;
  let isWord = inner.name == "VariableName" || inner.to - inner.from < 20 && Identifier.test(context.state.sliceDoc(inner.from, inner.to));
  if (!isWord && !context.explicit)
    return null;
  let options = [];
  for (let pos = inner; pos; pos = pos.parent) {
    if (ScopeNodes.has(pos.name))
      options = options.concat(getScope(context.state.doc, pos));
  }
  return {
    options,
    from: isWord ? inner.from : context.pos,
    validFor: Identifier
  };
}
var javascriptLanguage = LRLanguage.define({
  name: "javascript",
  parser: parser3.configure({
    props: [
      indentNodeProp.add({
        IfStatement: continuedIndent({ except: /^\s*({|else\b)/ }),
        TryStatement: continuedIndent({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: flatIndent,
        SwitchBody: (context) => {
          let after = context.textAfter, closed = /^\s*\}/.test(after), isCase = /^\s*(case|default)\b/.test(after);
          return context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit;
        },
        Block: delimitedIndent({ closing: "}" }),
        ArrowFunction: (cx) => cx.baseIndent + cx.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": continuedIndent({ except: /^{/ }),
        JSXElement(context) {
          let closed = /^\s*<\//.test(context.textAfter);
          return context.lineIndent(context.node.from) + (closed ? 0 : context.unit);
        },
        JSXEscape(context) {
          let closed = /\s*\}/.test(context.textAfter);
          return context.lineIndent(context.node.from) + (closed ? 0 : context.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(context) {
          return context.column(context.node.from) + context.unit;
        }
      }),
      foldNodeProp.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": foldInside,
        BlockComment(tree) {
          return { from: tree.from + 2, to: tree.to - 2 };
        }
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
});
var jsxSublanguage = {
  test: (node) => /^JSX/.test(node.name),
  facet: defineLanguageFacet({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
};
var typescriptLanguage = javascriptLanguage.configure({ dialect: "ts" }, "typescript");
var jsxLanguage = javascriptLanguage.configure({
  dialect: "jsx",
  props: [sublanguageProp.add((n) => n.isTop ? [jsxSublanguage] : void 0)]
});
var tsxLanguage = javascriptLanguage.configure({
  dialect: "jsx ts",
  props: [sublanguageProp.add((n) => n.isTop ? [jsxSublanguage] : void 0)]
}, "typescript");
var keywords = "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map((kw) => ({ label: kw, type: "keyword" }));
function javascript(config = {}) {
  let lang = config.jsx ? config.typescript ? tsxLanguage : jsxLanguage : config.typescript ? typescriptLanguage : javascriptLanguage;
  return new LanguageSupport(lang, [
    javascriptLanguage.data.of({
      autocomplete: ifNotIn(dontComplete, completeFromList(snippets.concat(keywords)))
    }),
    javascriptLanguage.data.of({
      autocomplete: localCompletionSource
    }),
    config.jsx ? autoCloseTags : []
  ]);
}
function findOpenTag(node) {
  for (; ; ) {
    if (node.name == "JSXOpenTag" || node.name == "JSXSelfClosingTag" || node.name == "JSXFragmentTag")
      return node;
    if (node.name == "JSXEscape" || !node.parent)
      return null;
    node = node.parent;
  }
}
function elementName(doc, tree, max = doc.length) {
  for (let ch = tree === null || tree === void 0 ? void 0 : tree.firstChild; ch; ch = ch.nextSibling) {
    if (ch.name == "JSXIdentifier" || ch.name == "JSXBuiltin" || ch.name == "JSXNamespacedName" || ch.name == "JSXMemberExpression")
      return doc.sliceString(ch.from, Math.min(ch.to, max));
  }
  return "";
}
function isEndTag(node) {
  return node && (node.name == "JSXEndTag" || node.name == "JSXSelfCloseEndTag");
}
var android = typeof navigator == "object" && /Android\b/.test(navigator.userAgent);
var autoCloseTags = EditorView.inputHandler.of((view, from, to, text) => {
  if ((android ? view.composing : view.compositionStarted) || view.state.readOnly || from != to || text != ">" && text != "/" || !javascriptLanguage.isActiveAt(view.state, from, -1))
    return false;
  let { state } = view;
  let changes = state.changeByRange((range) => {
    var _a;
    let { head } = range, around = syntaxTree(state).resolveInner(head, -1), name;
    if (around.name == "JSXStartTag")
      around = around.parent;
    if (around.name == "JSXAttributeValue" && around.to > head)
      ;
    else if (text == ">" && around.name == "JSXFragmentTag") {
      return { range: EditorSelection.cursor(head + 1), changes: { from: head, insert: `></>` } };
    } else if (text == "/" && around.name == "JSXFragmentTag") {
      let empty = around.parent, base = empty === null || empty === void 0 ? void 0 : empty.parent;
      if (empty.from == head - 1 && ((_a = base.lastChild) === null || _a === void 0 ? void 0 : _a.name) != "JSXEndTag" && (name = elementName(state.doc, base === null || base === void 0 ? void 0 : base.firstChild, head))) {
        let insert = `/${name}>`;
        return { range: EditorSelection.cursor(head + insert.length), changes: { from: head, insert } };
      }
    } else if (text == ">") {
      let openTag = findOpenTag(around);
      if (openTag && !isEndTag(openTag.lastChild) && state.sliceDoc(head, head + 2) != "</" && (name = elementName(state.doc, openTag, head)))
        return { range: EditorSelection.cursor(head + 1), changes: { from: head, insert: `></${name}>` } };
    }
    return { range };
  });
  if (changes.changes.empty)
    return false;
  view.dispatch(changes, { userEvent: "input.type", scrollIntoView: true });
  return true;
});

// node_modules/.pnpm/@codemirror+lang-html@6.4.5/node_modules/@codemirror/lang-html/dist/index.js
var Targets = ["_blank", "_self", "_top", "_parent"];
var Charsets = ["ascii", "utf-8", "utf-16", "latin1", "latin1"];
var Methods = ["get", "post", "put", "delete"];
var Encs = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"];
var Bool = ["true", "false"];
var S = {};
var Tags = {
  a: {
    attrs: {
      href: null,
      ping: null,
      type: null,
      media: null,
      target: Targets,
      hreflang: null
    }
  },
  abbr: S,
  address: S,
  area: {
    attrs: {
      alt: null,
      coords: null,
      href: null,
      target: null,
      ping: null,
      media: null,
      hreflang: null,
      type: null,
      shape: ["default", "rect", "circle", "poly"]
    }
  },
  article: S,
  aside: S,
  audio: {
    attrs: {
      src: null,
      mediagroup: null,
      crossorigin: ["anonymous", "use-credentials"],
      preload: ["none", "metadata", "auto"],
      autoplay: ["autoplay"],
      loop: ["loop"],
      controls: ["controls"]
    }
  },
  b: S,
  base: { attrs: { href: null, target: Targets } },
  bdi: S,
  bdo: S,
  blockquote: { attrs: { cite: null } },
  body: S,
  br: S,
  button: {
    attrs: {
      form: null,
      formaction: null,
      name: null,
      value: null,
      autofocus: ["autofocus"],
      disabled: ["autofocus"],
      formenctype: Encs,
      formmethod: Methods,
      formnovalidate: ["novalidate"],
      formtarget: Targets,
      type: ["submit", "reset", "button"]
    }
  },
  canvas: { attrs: { width: null, height: null } },
  caption: S,
  center: S,
  cite: S,
  code: S,
  col: { attrs: { span: null } },
  colgroup: { attrs: { span: null } },
  command: {
    attrs: {
      type: ["command", "checkbox", "radio"],
      label: null,
      icon: null,
      radiogroup: null,
      command: null,
      title: null,
      disabled: ["disabled"],
      checked: ["checked"]
    }
  },
  data: { attrs: { value: null } },
  datagrid: { attrs: { disabled: ["disabled"], multiple: ["multiple"] } },
  datalist: { attrs: { data: null } },
  dd: S,
  del: { attrs: { cite: null, datetime: null } },
  details: { attrs: { open: ["open"] } },
  dfn: S,
  div: S,
  dl: S,
  dt: S,
  em: S,
  embed: { attrs: { src: null, type: null, width: null, height: null } },
  eventsource: { attrs: { src: null } },
  fieldset: { attrs: { disabled: ["disabled"], form: null, name: null } },
  figcaption: S,
  figure: S,
  footer: S,
  form: {
    attrs: {
      action: null,
      name: null,
      "accept-charset": Charsets,
      autocomplete: ["on", "off"],
      enctype: Encs,
      method: Methods,
      novalidate: ["novalidate"],
      target: Targets
    }
  },
  h1: S,
  h2: S,
  h3: S,
  h4: S,
  h5: S,
  h6: S,
  head: {
    children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
  },
  header: S,
  hgroup: S,
  hr: S,
  html: {
    attrs: { manifest: null }
  },
  i: S,
  iframe: {
    attrs: {
      src: null,
      srcdoc: null,
      name: null,
      width: null,
      height: null,
      sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
      seamless: ["seamless"]
    }
  },
  img: {
    attrs: {
      alt: null,
      src: null,
      ismap: null,
      usemap: null,
      width: null,
      height: null,
      crossorigin: ["anonymous", "use-credentials"]
    }
  },
  input: {
    attrs: {
      alt: null,
      dirname: null,
      form: null,
      formaction: null,
      height: null,
      list: null,
      max: null,
      maxlength: null,
      min: null,
      name: null,
      pattern: null,
      placeholder: null,
      size: null,
      src: null,
      step: null,
      value: null,
      width: null,
      accept: ["audio/*", "video/*", "image/*"],
      autocomplete: ["on", "off"],
      autofocus: ["autofocus"],
      checked: ["checked"],
      disabled: ["disabled"],
      formenctype: Encs,
      formmethod: Methods,
      formnovalidate: ["novalidate"],
      formtarget: Targets,
      multiple: ["multiple"],
      readonly: ["readonly"],
      required: ["required"],
      type: [
        "hidden",
        "text",
        "search",
        "tel",
        "url",
        "email",
        "password",
        "datetime",
        "date",
        "month",
        "week",
        "time",
        "datetime-local",
        "number",
        "range",
        "color",
        "checkbox",
        "radio",
        "file",
        "submit",
        "image",
        "reset",
        "button"
      ]
    }
  },
  ins: { attrs: { cite: null, datetime: null } },
  kbd: S,
  keygen: {
    attrs: {
      challenge: null,
      form: null,
      name: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      keytype: ["RSA"]
    }
  },
  label: { attrs: { for: null, form: null } },
  legend: S,
  li: { attrs: { value: null } },
  link: {
    attrs: {
      href: null,
      type: null,
      hreflang: null,
      media: null,
      sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
    }
  },
  map: { attrs: { name: null } },
  mark: S,
  menu: { attrs: { label: null, type: ["list", "context", "toolbar"] } },
  meta: {
    attrs: {
      content: null,
      charset: Charsets,
      name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
      "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
    }
  },
  meter: { attrs: { value: null, min: null, low: null, high: null, max: null, optimum: null } },
  nav: S,
  noscript: S,
  object: {
    attrs: {
      data: null,
      type: null,
      name: null,
      usemap: null,
      form: null,
      width: null,
      height: null,
      typemustmatch: ["typemustmatch"]
    }
  },
  ol: {
    attrs: { reversed: ["reversed"], start: null, type: ["1", "a", "A", "i", "I"] },
    children: ["li", "script", "template", "ul", "ol"]
  },
  optgroup: { attrs: { disabled: ["disabled"], label: null } },
  option: { attrs: { disabled: ["disabled"], label: null, selected: ["selected"], value: null } },
  output: { attrs: { for: null, form: null, name: null } },
  p: S,
  param: { attrs: { name: null, value: null } },
  pre: S,
  progress: { attrs: { value: null, max: null } },
  q: { attrs: { cite: null } },
  rp: S,
  rt: S,
  ruby: S,
  samp: S,
  script: {
    attrs: {
      type: ["text/javascript"],
      src: null,
      async: ["async"],
      defer: ["defer"],
      charset: Charsets
    }
  },
  section: S,
  select: {
    attrs: {
      form: null,
      name: null,
      size: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      multiple: ["multiple"]
    }
  },
  slot: { attrs: { name: null } },
  small: S,
  source: { attrs: { src: null, type: null, media: null } },
  span: S,
  strong: S,
  style: {
    attrs: {
      type: ["text/css"],
      media: null,
      scoped: null
    }
  },
  sub: S,
  summary: S,
  sup: S,
  table: S,
  tbody: S,
  td: { attrs: { colspan: null, rowspan: null, headers: null } },
  template: S,
  textarea: {
    attrs: {
      dirname: null,
      form: null,
      maxlength: null,
      name: null,
      placeholder: null,
      rows: null,
      cols: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      readonly: ["readonly"],
      required: ["required"],
      wrap: ["soft", "hard"]
    }
  },
  tfoot: S,
  th: { attrs: { colspan: null, rowspan: null, headers: null, scope: ["row", "col", "rowgroup", "colgroup"] } },
  thead: S,
  time: { attrs: { datetime: null } },
  title: S,
  tr: S,
  track: {
    attrs: {
      src: null,
      label: null,
      default: null,
      kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
      srclang: null
    }
  },
  ul: { children: ["li", "script", "template", "ul", "ol"] },
  var: S,
  video: {
    attrs: {
      src: null,
      poster: null,
      width: null,
      height: null,
      crossorigin: ["anonymous", "use-credentials"],
      preload: ["auto", "metadata", "none"],
      autoplay: ["autoplay"],
      mediagroup: ["movie"],
      muted: ["muted"],
      controls: ["controls"]
    }
  },
  wbr: S
};
var GlobalAttrs = {
  accesskey: null,
  class: null,
  contenteditable: Bool,
  contextmenu: null,
  dir: ["ltr", "rtl", "auto"],
  draggable: ["true", "false", "auto"],
  dropzone: ["copy", "move", "link", "string:", "file:"],
  hidden: ["hidden"],
  id: null,
  inert: ["inert"],
  itemid: null,
  itemprop: null,
  itemref: null,
  itemscope: ["itemscope"],
  itemtype: null,
  lang: ["ar", "bn", "de", "en-GB", "en-US", "es", "fr", "hi", "id", "ja", "pa", "pt", "ru", "tr", "zh"],
  spellcheck: Bool,
  autocorrect: Bool,
  autocapitalize: Bool,
  style: null,
  tabindex: null,
  title: null,
  translate: ["yes", "no"],
  rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"],
  role: "alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),
  "aria-activedescendant": null,
  "aria-atomic": Bool,
  "aria-autocomplete": ["inline", "list", "both", "none"],
  "aria-busy": Bool,
  "aria-checked": ["true", "false", "mixed", "undefined"],
  "aria-controls": null,
  "aria-describedby": null,
  "aria-disabled": Bool,
  "aria-dropeffect": null,
  "aria-expanded": ["true", "false", "undefined"],
  "aria-flowto": null,
  "aria-grabbed": ["true", "false", "undefined"],
  "aria-haspopup": Bool,
  "aria-hidden": Bool,
  "aria-invalid": ["true", "false", "grammar", "spelling"],
  "aria-label": null,
  "aria-labelledby": null,
  "aria-level": null,
  "aria-live": ["off", "polite", "assertive"],
  "aria-multiline": Bool,
  "aria-multiselectable": Bool,
  "aria-owns": null,
  "aria-posinset": null,
  "aria-pressed": ["true", "false", "mixed", "undefined"],
  "aria-readonly": Bool,
  "aria-relevant": null,
  "aria-required": Bool,
  "aria-selected": ["true", "false", "undefined"],
  "aria-setsize": null,
  "aria-sort": ["ascending", "descending", "none", "other"],
  "aria-valuemax": null,
  "aria-valuemin": null,
  "aria-valuenow": null,
  "aria-valuetext": null
};
var eventAttributes = "beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload".split(" ").map((n) => "on" + n);
for (let a of eventAttributes)
  GlobalAttrs[a] = null;
var Schema = class {
  constructor(extraTags, extraAttrs) {
    this.tags = Object.assign(Object.assign({}, Tags), extraTags);
    this.globalAttrs = Object.assign(Object.assign({}, GlobalAttrs), extraAttrs);
    this.allTags = Object.keys(this.tags);
    this.globalAttrNames = Object.keys(this.globalAttrs);
  }
};
Schema.default = new Schema();
function elementName2(doc, tree, max = doc.length) {
  if (!tree)
    return "";
  let tag = tree.firstChild;
  let name = tag && tag.getChild("TagName");
  return name ? doc.sliceString(name.from, Math.min(name.to, max)) : "";
}
function findParentElement(tree, skip = false) {
  for (; tree; tree = tree.parent)
    if (tree.name == "Element") {
      if (skip)
        skip = false;
      else
        return tree;
    }
  return null;
}
function allowedChildren(doc, tree, schema) {
  let parentInfo = schema.tags[elementName2(doc, findParentElement(tree))];
  return (parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.children) || schema.allTags;
}
function openTags(doc, tree) {
  let open = [];
  for (let parent = findParentElement(tree); parent && !parent.type.isTop; parent = findParentElement(parent.parent)) {
    let tagName = elementName2(doc, parent);
    if (tagName && parent.lastChild.name == "CloseTag")
      break;
    if (tagName && open.indexOf(tagName) < 0 && (tree.name == "EndTag" || tree.from >= parent.firstChild.to))
      open.push(tagName);
  }
  return open;
}
var identifier3 = /^[:\-\.\w\u00b7-\uffff]*$/;
function completeTag(state, schema, tree, from, to) {
  let end = /\s*>/.test(state.sliceDoc(to, to + 5)) ? "" : ">";
  let parent = findParentElement(tree, true);
  return {
    from,
    to,
    options: allowedChildren(state.doc, parent, schema).map((tagName) => ({ label: tagName, type: "type" })).concat(openTags(state.doc, tree).map((tag, i) => ({
      label: "/" + tag,
      apply: "/" + tag + end,
      type: "type",
      boost: 99 - i
    }))),
    validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/
  };
}
function completeCloseTag(state, tree, from, to) {
  let end = /\s*>/.test(state.sliceDoc(to, to + 5)) ? "" : ">";
  return {
    from,
    to,
    options: openTags(state.doc, tree).map((tag, i) => ({ label: tag, apply: tag + end, type: "type", boost: 99 - i })),
    validFor: identifier3
  };
}
function completeStartTag(state, schema, tree, pos) {
  let options = [], level = 0;
  for (let tagName of allowedChildren(state.doc, tree, schema))
    options.push({ label: "<" + tagName, type: "type" });
  for (let open of openTags(state.doc, tree))
    options.push({ label: "</" + open + ">", type: "type", boost: 99 - level++ });
  return { from: pos, to: pos, options, validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/ };
}
function completeAttrName(state, schema, tree, from, to) {
  let elt = findParentElement(tree), info = elt ? schema.tags[elementName2(state.doc, elt)] : null;
  let localAttrs = info && info.attrs ? Object.keys(info.attrs) : [];
  let names = info && info.globalAttrs === false ? localAttrs : localAttrs.length ? localAttrs.concat(schema.globalAttrNames) : schema.globalAttrNames;
  return {
    from,
    to,
    options: names.map((attrName) => ({ label: attrName, type: "property" })),
    validFor: identifier3
  };
}
function completeAttrValue(state, schema, tree, from, to) {
  var _a;
  let nameNode = (_a = tree.parent) === null || _a === void 0 ? void 0 : _a.getChild("AttributeName");
  let options = [], token = void 0;
  if (nameNode) {
    let attrName = state.sliceDoc(nameNode.from, nameNode.to);
    let attrs = schema.globalAttrs[attrName];
    if (!attrs) {
      let elt = findParentElement(tree), info = elt ? schema.tags[elementName2(state.doc, elt)] : null;
      attrs = (info === null || info === void 0 ? void 0 : info.attrs) && info.attrs[attrName];
    }
    if (attrs) {
      let base = state.sliceDoc(from, to).toLowerCase(), quoteStart = '"', quoteEnd = '"';
      if (/^['"]/.test(base)) {
        token = base[0] == '"' ? /^[^"]*$/ : /^[^']*$/;
        quoteStart = "";
        quoteEnd = state.sliceDoc(to, to + 1) == base[0] ? "" : base[0];
        base = base.slice(1);
        from++;
      } else {
        token = /^[^\s<>='"]*$/;
      }
      for (let value of attrs)
        options.push({ label: value, apply: quoteStart + value + quoteEnd, type: "constant" });
    }
  }
  return { from, to, options, validFor: token };
}
function htmlCompletionFor(schema, context) {
  let { state, pos } = context, tree = syntaxTree(state).resolveInner(pos, -1), around = tree.resolve(pos);
  for (let scan = pos, before; around == tree && (before = tree.childBefore(scan)); ) {
    let last = before.lastChild;
    if (!last || !last.type.isError || last.from < last.to)
      break;
    around = tree = before;
    scan = last.from;
  }
  if (tree.name == "TagName") {
    return tree.parent && /CloseTag$/.test(tree.parent.name) ? completeCloseTag(state, tree, tree.from, pos) : completeTag(state, schema, tree, tree.from, pos);
  } else if (tree.name == "StartTag") {
    return completeTag(state, schema, tree, pos, pos);
  } else if (tree.name == "StartCloseTag" || tree.name == "IncompleteCloseTag") {
    return completeCloseTag(state, tree, pos, pos);
  } else if (context.explicit && (tree.name == "OpenTag" || tree.name == "SelfClosingTag") || tree.name == "AttributeName") {
    return completeAttrName(state, schema, tree, tree.name == "AttributeName" ? tree.from : pos, pos);
  } else if (tree.name == "Is" || tree.name == "AttributeValue" || tree.name == "UnquotedAttributeValue") {
    return completeAttrValue(state, schema, tree, tree.name == "Is" ? pos : tree.from, pos);
  } else if (context.explicit && (around.name == "Element" || around.name == "Text" || around.name == "Document")) {
    return completeStartTag(state, schema, tree, pos);
  } else {
    return null;
  }
}
function htmlCompletionSourceWith(config) {
  let { extraTags, extraGlobalAttributes: extraAttrs } = config;
  let schema = extraAttrs || extraTags ? new Schema(extraTags, extraAttrs) : Schema.default;
  return (context) => htmlCompletionFor(schema, context);
}
var defaultNesting = [
  {
    tag: "script",
    attrs: (attrs) => attrs.type == "text/typescript" || attrs.lang == "ts",
    parser: typescriptLanguage.parser
  },
  {
    tag: "script",
    attrs: (attrs) => attrs.type == "text/babel" || attrs.type == "text/jsx",
    parser: jsxLanguage.parser
  },
  {
    tag: "script",
    attrs: (attrs) => attrs.type == "text/typescript-jsx",
    parser: tsxLanguage.parser
  },
  {
    tag: "script",
    attrs(attrs) {
      return !attrs.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(attrs.type);
    },
    parser: javascriptLanguage.parser
  },
  {
    tag: "style",
    attrs(attrs) {
      return (!attrs.lang || attrs.lang == "css") && (!attrs.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(attrs.type));
    },
    parser: cssLanguage.parser
  }
];
var defaultAttrs = [
  {
    name: "style",
    parser: cssLanguage.parser.configure({ top: "Styles" })
  }
].concat(eventAttributes.map((name) => ({ name, parser: javascriptLanguage.parser })));
var htmlPlain = LRLanguage.define({
  name: "html",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Element(context) {
          let after = /^(\s*)(<\/)?/.exec(context.textAfter);
          if (context.node.to <= context.pos + after[0].length)
            return context.continue();
          return context.lineIndent(context.node.from) + (after[2] ? 0 : context.unit);
        },
        "OpenTag CloseTag SelfClosingTag"(context) {
          return context.column(context.node.from) + context.unit;
        },
        Document(context) {
          if (context.pos + /\s*/.exec(context.textAfter)[0].length < context.node.to)
            return context.continue();
          let endElt = null, close;
          for (let cur = context.node; ; ) {
            let last = cur.lastChild;
            if (!last || last.name != "Element" || last.to != cur.to)
              break;
            endElt = cur = last;
          }
          if (endElt && !((close = endElt.lastChild) && (close.name == "CloseTag" || close.name == "SelfClosingTag")))
            return context.lineIndent(endElt.from) + context.unit;
          return null;
        }
      }),
      foldNodeProp.add({
        Element(node) {
          let first = node.firstChild, last = node.lastChild;
          if (!first || first.name != "OpenTag")
            return null;
          return { from: first.to, to: last.name == "CloseTag" ? last.from : node.to };
        }
      }),
      bracketMatchingHandle.add({
        "OpenTag CloseTag": (node) => node.getChild("TagName")
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "<!--", close: "-->" } },
    indentOnInput: /^\s*<\/\w+\W$/,
    wordChars: "-._"
  }
});
var htmlLanguage = htmlPlain.configure({
  wrap: configureNesting(defaultNesting, defaultAttrs)
});
function html(config = {}) {
  let dialect = "", wrap;
  if (config.matchClosingTags === false)
    dialect = "noMatch";
  if (config.selfClosingTags === true)
    dialect = (dialect ? dialect + " " : "") + "selfClosing";
  if (config.nestedLanguages && config.nestedLanguages.length || config.nestedAttributes && config.nestedAttributes.length)
    wrap = configureNesting((config.nestedLanguages || []).concat(defaultNesting), (config.nestedAttributes || []).concat(defaultAttrs));
  let lang = wrap ? htmlPlain.configure({ wrap, dialect }) : dialect ? htmlLanguage.configure({ dialect }) : htmlLanguage;
  return new LanguageSupport(lang, [
    htmlLanguage.data.of({ autocomplete: htmlCompletionSourceWith(config) }),
    config.autoCloseTags !== false ? autoCloseTags2 : [],
    javascript().support,
    css().support
  ]);
}
var selfClosers2 = new Set("area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "));
var autoCloseTags2 = EditorView.inputHandler.of((view, from, to, text) => {
  if (view.composing || view.state.readOnly || from != to || text != ">" && text != "/" || !htmlLanguage.isActiveAt(view.state, from, -1))
    return false;
  let { state } = view;
  let changes = state.changeByRange((range) => {
    var _a, _b, _c;
    let { head } = range, around = syntaxTree(state).resolveInner(head, -1), name;
    if (around.name == "TagName" || around.name == "StartTag")
      around = around.parent;
    if (text == ">" && around.name == "OpenTag") {
      if (((_b = (_a = around.parent) === null || _a === void 0 ? void 0 : _a.lastChild) === null || _b === void 0 ? void 0 : _b.name) != "CloseTag" && (name = elementName2(state.doc, around.parent, head)) && !selfClosers2.has(name)) {
        let hasRightBracket = view.state.doc.sliceString(head, head + 1) === ">";
        let insert = `${hasRightBracket ? "" : ">"}</${name}>`;
        return { range: EditorSelection.cursor(head + 1), changes: { from: head + (hasRightBracket ? 1 : 0), insert } };
      }
    } else if (text == "/" && around.name == "OpenTag") {
      let empty = around.parent, base = empty === null || empty === void 0 ? void 0 : empty.parent;
      if (empty.from == head - 1 && ((_c = base.lastChild) === null || _c === void 0 ? void 0 : _c.name) != "CloseTag" && (name = elementName2(state.doc, base, head)) && !selfClosers2.has(name)) {
        let hasRightBracket = view.state.doc.sliceString(head, head + 1) === ">";
        let insert = `/${name}${hasRightBracket ? "" : ">"}`;
        let pos = head + insert.length + (hasRightBracket ? 1 : 0);
        return { range: EditorSelection.cursor(pos), changes: { from: head, insert } };
      }
    }
    return { range };
  });
  if (changes.changes.empty)
    return false;
  view.dispatch(changes, { userEvent: "input.type", scrollIntoView: true });
  return true;
});

// node_modules/.pnpm/@codemirror+lang-vue@0.1.2/node_modules/@codemirror/lang-vue/dist/index.js
var parser4 = LRParser.deserialize({
  version: 14,
  states: "%pOVOWOOObQPOOOpOSO'#C_OOOO'#Cp'#CpQVOWOOQxQPOOO!TQQOOQ!YQPOOOOOO,58y,58yO!_OSO,58yOOOO-E6n-E6nO!dQQO'#CqQ{QPOOO!iQPOOQ{QPOOO!qQPOOOOOO1G.e1G.eOOQO,59],59]OOQO-E6o-E6oO!yOpO'#CiO#RO`O'#CiQOQPOOO#ZO#tO'#CmO#fO!bO'#CmOOQO,59T,59TO#qOpO,59TO#vO`O,59TOOOO'#Cr'#CrO#{O#tO,59XOOQO,59X,59XOOOO'#Cs'#CsO$WO!bO,59XOOQO1G.o1G.oOOOO-E6p-E6pOOQO1G.s1G.sOOOO-E6q-E6q",
  stateData: "$g~OjOS~OQROUROkQO~OWTOXUOZUO`VO~OSXOTWO~OXUO[]OlZO~OY^O~O[_O~OT`O~OYaO~OmcOodO~OmfOogO~O^iOnhO~O_jOphO~ObkOqkOrmO~OcnOsnOtmO~OnpO~OppO~ObkOqkOrrO~OcnOsnOtrO~OWX`~",
  goto: "!^hPPPiPPPPPPPPPmPPPpPPsy!Q!WTROSRe]Re_QSORYSS[T^Rb[QlfRqlQogRso",
  nodeNames: "⚠ Content Text Interpolation InterpolationContent }} Entity Attribute VueAttributeName : Identifier @ Is ScriptAttributeValue AttributeScript AttributeScript AttributeName AttributeValue Entity Entity",
  maxTerm: 36,
  skippedNodes: [0],
  repeatNodeCount: 4,
  tokenData: "'y~RdXY!aYZ!a]^!apq!ars!rwx!w}!O!|!O!P#t!Q![#y![!]$s!_!`%g!b!c%l!c!}#y#R#S#y#T#j#y#j#k%q#k#o#y%W;'S#y;'S;:j$m<%lO#y~!fSj~XY!aYZ!a]^!apq!a~!wOm~~!|Oo~!b#RX`!b}!O!|!Q![!|![!]!|!c!}!|#R#S!|#T#o!|%W;'S!|;'S;:j#n<%lO!|!b#qP;=`<%l!|~#yOl~%W$QXY#t`!b}!O!|!Q![#y![!]!|!c!}#y#R#S#y#T#o#y%W;'S#y;'S;:j$m<%lO#y%W$pP;=`<%l#y~$zXX~`!b}!O!|!Q![!|![!]!|!c!}!|#R#S!|#T#o!|%W;'S!|;'S;:j#n<%lO!|~%lO[~~%qOZ~%W%xXY#t`!b}!O&e!Q![#y![!]!|!c!}#y#R#S#y#T#o#y%W;'S#y;'S;:j$m<%lO#y!b&jX`!b}!O!|!Q![!|![!]!|!c!}'V#R#S!|#T#o'V%W;'S!|;'S;:j#n<%lO!|!b'^XW!b`!b}!O!|!Q![!|![!]!|!c!}'V#R#S!|#T#o'V%W;'S!|;'S;:j#n<%lO!|",
  tokenizers: [6, 7, new LocalTokenGroup("b~RP#q#rU~XP#q#r[~aOT~~", 17, 4), new LocalTokenGroup("!k~RQvwX#o#p!_~^TU~Opmq!]m!^;'Sm;'S;=`!X<%lOm~pUOpmq!]m!]!^!S!^;'Sm;'S;=`!X<%lOm~!XOU~~![P;=`<%lm~!bP#o#p!e~!jOk~~", 72, 2), new LocalTokenGroup("[~RPwxU~ZOp~~", 11, 15), new LocalTokenGroup("[~RPrsU~ZOn~~", 11, 14), new LocalTokenGroup("!e~RQvwXwx!_~^Tc~Opmq!]m!^;'Sm;'S;=`!X<%lOm~pUOpmq!]m!]!^!S!^;'Sm;'S;=`!X<%lOm~!XOc~~![P;=`<%lm~!dOt~~", 66, 35), new LocalTokenGroup("!e~RQrsXvw^~^Or~~cTb~Oprq!]r!^;'Sr;'S;=`!^<%lOr~uUOprq!]r!]!^!X!^;'Sr;'S;=`!^<%lOr~!^Ob~~!aP;=`<%lr~", 66, 33)],
  topRules: { "Content": [0, 1], "Attribute": [1, 7] },
  tokenPrec: 157
});
var exprParser = javascriptLanguage.parser.configure({
  top: "SingleExpression"
});
var baseParser = parser4.configure({
  props: [
    styleTags({
      Text: tags.content,
      Is: tags.definitionOperator,
      AttributeName: tags.attributeName,
      VueAttributeName: tags.keyword,
      Identifier: tags.variableName,
      "AttributeValue ScriptAttributeValue": tags.attributeValue,
      Entity: tags.character,
      "{{ }}": tags.brace,
      "@ :": tags.punctuation
    })
  ]
});
var exprMixed = { parser: exprParser };
var textParser = baseParser.configure({
  wrap: parseMixed((node, input) => node.name == "InterpolationContent" ? exprMixed : null)
});
var attrParser = baseParser.configure({
  wrap: parseMixed((node, input) => node.name == "AttributeScript" ? exprMixed : null),
  top: "Attribute"
});
var textMixed = { parser: textParser };
var attrMixed = { parser: attrParser };
var baseHTML = html();
function makeVue(base) {
  return base.configure({
    dialect: "selfClosing",
    wrap: parseMixed(mixVue)
  }, "vue");
}
var vueLanguage = makeVue(baseHTML.language);
function mixVue(node, input) {
  switch (node.name) {
    case "Attribute":
      return /^(@|:|v-)/.test(input.read(node.from, node.from + 2)) ? attrMixed : null;
    case "Text":
      return textMixed;
  }
  return null;
}
function vue(config = {}) {
  let base = baseHTML;
  if (config.base) {
    if (config.base.language.name != "html" || !(config.base.language instanceof LRLanguage))
      throw new RangeError("The base option must be the result of calling html(...)");
    base = config.base;
  }
  return new LanguageSupport(base.language == baseHTML.language ? vueLanguage : makeVue(base.language), [
    base.support,
    base.language.data.of({ closeBrackets: { brackets: ["{", '"'] } })
  ]);
}
export {
  vue,
  vueLanguage
};
//# sourceMappingURL=@codemirror_lang-vue.js.map
