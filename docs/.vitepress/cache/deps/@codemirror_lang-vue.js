import {
  completeFromList,
  ifNotIn,
  snippetCompletion
} from "./chunk-YB6MOJYX.js";
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
} from "./chunk-RCHT3CGY.js";
import "./chunk-EWTE5DHJ.js";

// node_modules/.pnpm/@lezer+lr@1.4.2/node_modules/@lezer/lr/dist/index.js
var Stack = class _Stack {
  /**
  @internal
  */
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
  /**
  @internal
  */
  toString() {
    return `[${this.stack.filter((_, i) => i % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
  }
  // Start an empty stack
  /**
  @internal
  */
  static start(p, state, pos = 0) {
    let cx = p.parser.context;
    return new _Stack(p, [], state, pos, pos, 0, [], 0, cx ? new StackContext(cx, cx.start) : null, 0, null);
  }
  /**
  The stack's current [context](#lr.ContextTracker) value, if
  any. Its type will depend on the context tracker's type
  parameter, or it will be `null` if there is no context
  tracker.
  */
  get context() {
    return this.curContext ? this.curContext.context : null;
  }
  // Push a state onto the stack, tracking its start position as well
  // as the buffer base at that point.
  /**
  @internal
  */
  pushState(state, start) {
    this.stack.push(this.state, start, this.bufferBase + this.buffer.length);
    this.state = state;
  }
  // Apply a reduce action
  /**
  @internal
  */
  reduce(action) {
    var _a;
    let depth = action >> 19, type = action & 65535;
    let { parser: parser5 } = this.p;
    let lookaheadRecord = this.reducePos < this.pos - 25;
    if (lookaheadRecord)
      this.setLookAhead(this.pos);
    let dPrec = parser5.dynamicPrecedence(type);
    if (dPrec)
      this.score += dPrec;
    if (depth == 0) {
      this.pushState(parser5.getGoto(this.state, type, true), this.reducePos);
      if (type < parser5.minRepeatTerm)
        this.storeNode(type, this.reducePos, this.reducePos, lookaheadRecord ? 8 : 4, true);
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
  /**
  @internal
  */
  storeNode(term, start, end, size = 4, mustSink = false) {
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
    if (!mustSink || this.pos == end) {
      this.buffer.push(term, start, end, size);
    } else {
      let index = this.buffer.length;
      if (index > 0 && this.buffer[index - 4] != 0) {
        let mustMove = false;
        for (let scan = index; scan > 0 && this.buffer[scan - 2] > end; scan -= 4) {
          if (this.buffer[scan - 1] >= 0) {
            mustMove = true;
            break;
          }
        }
        if (mustMove)
          while (index > 0 && this.buffer[index - 2] > end) {
            this.buffer[index] = this.buffer[index - 4];
            this.buffer[index + 1] = this.buffer[index - 3];
            this.buffer[index + 2] = this.buffer[index - 2];
            this.buffer[index + 3] = this.buffer[index - 1];
            index -= 4;
            if (size > 4)
              size -= 4;
          }
      }
      this.buffer[index] = term;
      this.buffer[index + 1] = start;
      this.buffer[index + 2] = end;
      this.buffer[index + 3] = size;
    }
  }
  // Apply a shift action
  /**
  @internal
  */
  shift(action, type, start, end) {
    if (action & 131072) {
      this.pushState(action & 65535, this.pos);
    } else if ((action & 262144) == 0) {
      let nextState = action, { parser: parser5 } = this.p;
      if (end > this.pos || type <= parser5.maxNode) {
        this.pos = end;
        if (!parser5.stateFlag(
          nextState,
          1
          /* StateFlag.Skipped */
        ))
          this.reducePos = end;
      }
      this.pushState(nextState, start);
      this.shiftContext(type, start);
      if (type <= parser5.maxNode)
        this.buffer.push(type, start, end, 4);
    } else {
      this.pos = end;
      this.shiftContext(type, start);
      if (type <= this.p.parser.maxNode)
        this.buffer.push(type, start, end, 4);
    }
  }
  // Apply an action
  /**
  @internal
  */
  apply(action, next, nextStart, nextEnd) {
    if (action & 65536)
      this.reduce(action);
    else
      this.shift(action, next, nextStart, nextEnd);
  }
  // Add a prebuilt (reused) node into the buffer.
  /**
  @internal
  */
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
  /**
  @internal
  */
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
  /**
  @internal
  */
  recoverByDelete(next, nextEnd) {
    let isNode = next <= this.p.parser.maxNode;
    if (isNode)
      this.storeNode(next, this.pos, nextEnd, 4);
    this.storeNode(0, this.pos, nextEnd, isNode ? 8 : 4);
    this.pos = this.reducePos = nextEnd;
    this.score -= 190;
  }
  /**
  Check if the given term would be able to be shifted (optionally
  after some reductions) on this stack. This can be useful for
  external tokenizers that want to make sure they only provide a
  given token when it applies.
  */
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
  /**
  @internal
  */
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
      stack.reducePos = this.pos;
      stack.score -= 200;
      result.push(stack);
    }
    return result;
  }
  // Force a reduce, if possible. Return false if that can't
  // be done.
  /**
  @internal
  */
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
  /**
  Try to scan through the automaton to find some kind of reduction
  that can be applied. Used when the regular ForcedReduce field
  isn't a valid action. @internal
  */
  findForcedReduction() {
    let { parser: parser5 } = this.p, seen = [];
    let explore = (state, depth) => {
      if (seen.includes(state))
        return;
      seen.push(state);
      return parser5.allActions(state, (action) => {
        if (action & (262144 | 131072)) ;
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
  /**
  @internal
  */
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
  /**
  Check whether this state has no further actions (assumed to be a direct descendant of the
  top state, since any other states must be able to continue
  somehow). @internal
  */
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
  /**
  Restart the stack (put it back in its start state). Only safe
  when this.stack.length == 3 (state is directly below the top
  state). @internal
  */
  restart() {
    this.storeNode(0, this.pos, this.pos, 4, true);
    this.state = this.stack[0];
    this.stack.length = 0;
  }
  /**
  @internal
  */
  sameState(other) {
    if (this.state != other.state || this.stack.length != other.stack.length)
      return false;
    for (let i = 0; i < this.stack.length; i += 3)
      if (this.stack[i] != other.stack[i])
        return false;
    return true;
  }
  /**
  Get the parser used by this stack.
  */
  get parser() {
    return this.p.parser;
  }
  /**
  Test whether a given dialect (by numeric ID, as exported from
  the terms file) is enabled.
  */
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
  /**
  @internal
  */
  emitContext() {
    let last = this.buffer.length - 1;
    if (last < 0 || this.buffer[last] != -3)
      this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
  }
  /**
  @internal
  */
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
  /**
  @internal
  */
  setLookAhead(lookAhead) {
    if (lookAhead > this.lookAhead) {
      this.emitLookAhead();
      this.lookAhead = lookAhead;
    }
  }
  /**
  @internal
  */
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
  /**
  @internal
  */
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
  /**
  @internal
  */
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
  /**
  @internal
  */
  clipPos(pos) {
    if (pos >= this.range.from && pos < this.range.to)
      return pos;
    for (let range of this.ranges)
      if (range.to > pos)
        return Math.max(pos, range.from);
    return this.end;
  }
  /**
  Look at a code unit near the stream position. `.peek(0)` equals
  `.next`, `.peek(-1)` gives you the previous character, and so
  on.
  
  Note that looking around during tokenizing creates dependencies
  on potentially far-away content, which may reduce the
  effectiveness incremental parsing—when looking forward—or even
  cause invalid reparses when looking backward more than 25 code
  units, since the library does not track lookbehind.
  */
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
  /**
  Accept a token. By default, the end of the token is set to the
  current stream position, but you can pass an offset (relative to
  the stream position) to change that.
  */
  acceptToken(token, endOffset = 0) {
    let end = endOffset ? this.resolveOffset(endOffset, -1) : this.pos;
    if (end == null || end < this.token.start)
      throw new RangeError("Token end out of bounds");
    this.token.value = token;
    this.token.end = end;
  }
  /**
  Accept a token ending at a specific given position.
  */
  acceptTokenTo(token, endPos) {
    this.token.value = token;
    this.token.end = endPos;
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
  /**
  Move the stream forward N (defaults to 1) code units. Returns
  the new value of [`next`](#lr.InputStream.next).
  */
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
  /**
  @internal
  */
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
  /**
  @internal
  */
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
  /**
  Create a tokenizer. The first argument is the function that,
  given an input stream, scans for the types of tokens it
  recognizes at the stream's position, and calls
  [`acceptToken`](#lr.InputStream.acceptToken) when it finds
  one.
  */
  constructor(token, options = {}) {
    this.token = token;
    this.contextual = !!options.contextual;
    this.fallback = !!options.fallback;
    this.extend = !!options.extend;
  }
};
function readToken(data, input, stack, group, precTable, precOffset) {
  let state = 0, groupMask = 1 << group, { dialect } = stack.p.parser;
  scan: for (; ; ) {
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
    if (input.next < 0 && high > low && data[accEnd + high * 3 - 3] == 65535) {
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
            /* Lookahead.Margin */
          )) : Math.min(tree.length, Math.max(
            cursor.from + 1,
            pos + 25
            /* Lookahead.Margin */
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
      if (finished) {
        if (verbose)
          console.log("Finish with " + this.stackID(finished));
        return this.stackToTree(finished);
      }
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
      if (finished) {
        if (verbose)
          console.log("Force-finish " + this.stackID(finished));
        return this.stackToTree(finished.forceAll());
      }
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
      outer: for (let i = 0; i < newStacks.length - 1; i++) {
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
    if (stack.stack.length >= 8400) {
      while (stack.stack.length > 6e3 && stack.forceReduce()) {
      }
    }
    let actions = this.tokens.getActions(stack);
    for (let i = 0; i < actions.length; ) {
      let action = actions[i++], term = actions[i++], end = actions[i++];
      let last = i == actions.length || !split;
      let localStack = last ? stack : stack.split();
      let main = this.tokens.mainToken;
      localStack.apply(action, term, main ? main.start : localStack.pos, end);
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
  /**
  Define a context tracker.
  */
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
  /**
  @internal
  */
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
  /**
  Get a goto table entry @internal
  */
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
  /**
  Check if this state has an action for a given terminal @internal
  */
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
  /**
  @internal
  */
  stateSlot(state, slot) {
    return this.states[state * 6 + slot];
  }
  /**
  @internal
  */
  stateFlag(state, flag) {
    return (this.stateSlot(
      state,
      0
      /* ParseState.Flags */
    ) & flag) > 0;
  }
  /**
  @internal
  */
  validAction(state, action) {
    return !!this.allActions(state, (a) => a == action ? true : null);
  }
  /**
  @internal
  */
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
  /**
  Get the states that can follow this one through shift actions or
  goto jumps. @internal
  */
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
  /**
  Configure the parser. Returns a new parser instance that has the
  given settings modified. Settings not provided in `config` are
  kept from the original parser.
  */
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
  /**
  Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
  are registered for this parser.
  */
  hasWrappers() {
    return this.wrappers.length > 0;
  }
  /**
  Returns the name associated with a given term. This will only
  work for all terms when the parser was generated with the
  `--names` option. By default, only the names of tagged terms are
  stored.
  */
  getName(term) {
    return this.termNames ? this.termNames[term] : String(term <= this.maxNode && this.nodeSet.types[term].name || term);
  }
  /**
  The eof term id is always allocated directly after the node
  types. @internal
  */
  get eofTerm() {
    return this.maxNode + 1;
  }
  /**
  The type of top node produced by the parser.
  */
  get topNode() {
    return this.nodeSet.types[this.top[1]];
  }
  /**
  @internal
  */
  dynamicPrecedence(term) {
    let prec = this.dynamicPrecedences;
    return prec == null ? 0 : prec[term] || 0;
  }
  /**
  @internal
  */
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
  /**
  Used by the output of the parser generator. Not available to
  user code. @hide
  */
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

// node_modules/.pnpm/@lezer+html@1.3.10/node_modules/@lezer/html/dist/index.js
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
  if (cachedPos == pos && cachedInput == input) return cachedName;
  let next = input.peek(offset);
  while (isSpace(next)) next = input.peek(++offset);
  let name = "";
  for (; ; ) {
    if (!nameChar(next)) break;
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
  strict: false
});
var tagStart = new ExternalTokenizer((input, stack) => {
  if (input.next != lessThan) {
    if (input.next < 0 && stack.context) input.acceptToken(missingCloseTag);
    return;
  }
  input.advance();
  let close = input.next == slash;
  if (close) input.advance();
  let name = tagNameAfter(input, 0);
  if (name === void 0) return;
  if (!name) return input.acceptToken(close ? IncompleteCloseTag : StartTag);
  let parent = stack.context ? stack.context.name : null;
  if (close) {
    if (name == parent) return input.acceptToken(StartCloseTag);
    if (parent && implicitlyClosed[parent]) return input.acceptToken(missingCloseTag, -2);
    if (stack.dialectEnabled(Dialect_noMatch)) return input.acceptToken(NoMatchStartCloseTag);
    for (let cx = stack.context; cx; cx = cx.parent) if (cx.name == name) return;
    input.acceptToken(MismatchedStartCloseTag);
  } else {
    if (name == "script") return input.acceptToken(StartScriptTag);
    if (name == "style") return input.acceptToken(StartStyleTag);
    if (name == "textarea") return input.acceptToken(StartTextareaTag);
    if (selfClosers.hasOwnProperty(name)) return input.acceptToken(StartSelfClosingTag);
    if (parent && closeOnOpen[parent] && closeOnOpen[parent][name]) input.acceptToken(missingCloseTag, -1);
    else input.acceptToken(StartTag);
  }
}, { contextual: true });
var commentContent = new ExternalTokenizer((input) => {
  for (let dashes = 0, i = 0; ; i++) {
    if (input.next < 0) {
      if (i) input.acceptToken(commentContent$1);
      break;
    }
    if (input.next == dash) {
      dashes++;
    } else if (input.next == greaterThan && dashes >= 2) {
      if (i >= 3) input.acceptToken(commentContent$1, -2);
      break;
    } else {
      dashes = 0;
    }
    input.advance();
  }
});
function inForeignElement(context) {
  for (; context; context = context.parent)
    if (context.name == "svg" || context.name == "math") return true;
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
        if (i) input.acceptToken(textToken);
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
  states: ",xOVO!rOOO!WQ#tO'#CqO!]Q#tO'#CzO!bQ#tO'#C}O!gQ#tO'#DQO!lQ#tO'#DSO!qOaO'#CpO!|ObO'#CpO#XOdO'#CpO$eO!rO'#CpOOO`'#Cp'#CpO$lO$fO'#DTO$tQ#tO'#DVO$yQ#tO'#DWOOO`'#Dk'#DkOOO`'#DY'#DYQVO!rOOO%OQ&rO,59]O%ZQ&rO,59fO%fQ&rO,59iO%qQ&rO,59lO%|Q&rO,59nOOOa'#D^'#D^O&XOaO'#CxO&dOaO,59[OOOb'#D_'#D_O&lObO'#C{O&wObO,59[OOOd'#D`'#D`O'POdO'#DOO'[OdO,59[OOO`'#Da'#DaO'dO!rO,59[O'kQ#tO'#DROOO`,59[,59[OOOp'#Db'#DbO'pO$fO,59oOOO`,59o,59oO'xQ#|O,59qO'}Q#|O,59rOOO`-E7W-E7WO(SQ&rO'#CsOOQW'#DZ'#DZO(bQ&rO1G.wOOOa1G.w1G.wOOO`1G/Y1G/YO(mQ&rO1G/QOOOb1G/Q1G/QO(xQ&rO1G/TOOOd1G/T1G/TO)TQ&rO1G/WOOO`1G/W1G/WO)`Q&rO1G/YOOOa-E7[-E7[O)kQ#tO'#CyOOO`1G.v1G.vOOOb-E7]-E7]O)pQ#tO'#C|OOOd-E7^-E7^O)uQ#tO'#DPOOO`-E7_-E7_O)zQ#|O,59mOOOp-E7`-E7`OOO`1G/Z1G/ZOOO`1G/]1G/]OOO`1G/^1G/^O*PQ,UO,59_OOQW-E7X-E7XOOOa7+$c7+$cOOO`7+$t7+$tOOOb7+$l7+$lOOOd7+$o7+$oOOO`7+$r7+$rO*[Q#|O,59eO*aQ#|O,59hO*fQ#|O,59kOOO`1G/X1G/XO*kO7[O'#CvO*|OMhO'#CvOOQW1G.y1G.yOOO`1G/P1G/POOO`1G/S1G/SOOO`1G/V1G/VOOOO'#D['#D[O+_O7[O,59bOOQW,59b,59bOOOO'#D]'#D]O+pOMhO,59bOOOO-E7Y-E7YOOQW1G.|1G.|OOOO-E7Z-E7Z",
  stateData: ",]~O!^OS~OUSOVPOWQOXROYTO[]O][O^^O`^Oa^Ob^Oc^Ox^O{_O!dZO~OfaO~OfbO~OfcO~OfdO~OfeO~O!WfOPlP!ZlP~O!XiOQoP!ZoP~O!YlORrP!ZrP~OUSOVPOWQOXROYTOZqO[]O][O^^O`^Oa^Ob^Oc^Ox^O!dZO~O!ZrO~P#dO![sO!euO~OfvO~OfwO~OS|OT}OhyO~OS!POT}OhyO~OS!ROT}OhyO~OS!TOT}OhyO~OS}OT}OhyO~O!WfOPlX!ZlX~OP!WO!Z!XO~O!XiOQoX!ZoX~OQ!ZO!Z!XO~O!YlORrX!ZrX~OR!]O!Z!XO~O!Z!XO~P#dOf!_O~O![sO!e!aO~OS!bO~OS!cO~Oi!dOSgXTgXhgX~OS!fOT!gOhyO~OS!hOT!gOhyO~OS!iOT!gOhyO~OS!jOT!gOhyO~OS!gOT!gOhyO~Of!kO~Of!lO~Of!mO~OS!nO~Ok!qO!`!oO!b!pO~OS!rO~OS!sO~OS!tO~Oa!uOb!uOc!uO!`!wO!a!uO~Oa!xOb!xOc!xO!b!wO!c!xO~Oa!uOb!uOc!uO!`!{O!a!uO~Oa!xOb!xOc!xO!b!{O!c!xO~OT~bac!dx{!d~",
  goto: "%p!`PPPPPPPPPPPPPPPPPPPP!a!gP!mPP!yP!|#P#S#Y#]#`#f#i#l#r#x!aP!a!aP$O$U$l$r$x%O%U%[%bPPPPPPPP%hX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
  nodeNames: "⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
  maxTerm: 67,
  context: elementContext,
  nodeProps: [
    ["closedBy", -10, 1, 2, 3, 7, 8, 9, 10, 11, 12, 13, "EndTag", 6, "EndTag SelfClosingEndTag", -4, 21, 30, 33, 36, "CloseTag"],
    ["openedBy", 4, "StartTag StartCloseTag", 5, "StartTag", -4, 29, 32, 35, 37, "OpenTag"],
    ["group", -9, 14, 17, 18, 19, 20, 39, 40, 41, 42, "Entity", 16, "Entity TextContent", -3, 28, 31, 34, "TextContent Entity"],
    ["isolate", -11, 21, 29, 30, 32, 33, 35, 36, 37, 38, 41, 42, "ltr", -3, 26, 27, 39, ""]
  ],
  propSources: [htmlHighlighting],
  skippedNodes: [0],
  repeatNodeCount: 9,
  tokenData: "!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|c`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bX`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UV`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pT`POv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!cpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({W`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!a`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!a`!cpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYkWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]``P!a`!cp!^^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebhSkWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXhSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vchS`P!a`!cpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!`h`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WihSkWc!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zbkWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOa!R!R7tP;=`<%l7S!Z8OYkWa!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{ihSkWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbhSkWa!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QchSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXhSa!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TakWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOb!R!RAwP;=`<%lAY!ZBRYkWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbhSkWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbhSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXhSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!bx`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYlhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_khS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_X`P!a`!cp!eQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZhSfQ`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!a`!cpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!a`!cp!dPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!a`!cpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!a`!cpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!a`!cpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!a`!cpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!a`!cpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!a`!cpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!a`!cpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!cpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO{PP!-nP;=`<%l!-Sq!-xS!cp{POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!a`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!a`{POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!a`!cp{POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!a`!cpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!a`!cpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!a`!cpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!a`!cpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!a`!cpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!a`!cpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!cpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOxPP!7TP;=`<%l!6Vq!7]V!cpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!cpxPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!a`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!a`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!a`xPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!a`!cpxPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXiS`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",
  tokenizers: [scriptTokens, styleTokens, textareaTokens, endTag, tagStart, commentContent, 0, 1, 2, 3, 4, 5],
  topRules: { "Document": [0, 15] },
  dialects: { noMatch: 0, selfClosing: 509 },
  tokenPrec: 511
});
function getAttrs(openTag, input) {
  let attrs = /* @__PURE__ */ Object.create(null);
  for (let att of openTag.getChildren(Attribute)) {
    let name = att.getChild(AttributeName), value = att.getChild(AttributeValue) || att.getChild(UnquotedAttributeValue);
    if (name) attrs[input.read(name.from, name.to)] = !value ? "" : value.type.id == AttributeValue ? input.read(value.from + 1, value.to - 1) : input.read(value.from, value.to);
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
  for (let attr of attributes) (attrs[attr.name] || (attrs[attr.name] = [])).push(attr);
  return parseMixed((node, input) => {
    let id2 = node.type.id;
    if (id2 == ScriptText) return maybeNest(node, input, script);
    if (id2 == StyleText) return maybeNest(node, input, style);
    if (id2 == TextareaText) return maybeNest(node, input, textarea);
    if (id2 == Element && other.length) {
      let n = node.node, open = n.firstChild, tagName = open && findTagName(open, input), attrs2;
      if (tagName) for (let tag of other) {
        if (tag.tag == tagName && (!tag.attrs || tag.attrs(attrs2 || (attrs2 = getAttrs(open, input))))) {
          let close = n.lastChild;
          let to = close.type.id == CloseTag ? close.from : n.to;
          if (to > open.to)
            return { parser: tag.parser, overlay: [{ from: open.to, to }] };
        }
      }
    }
    if (attrs && id2 == Attribute) {
      let n = node.node, nameNode;
      if (nameNode = n.firstChild) {
        let matches = attrs[input.read(nameNode.from, nameNode.to)];
        if (matches) for (let attr of matches) {
          if (attr.tagName && attr.tagName != findTagName(n.parent, input)) continue;
          let value = n.lastChild;
          if (value.type.id == AttributeValue) {
            let from = value.from + 1;
            let last = value.lastChild, to = value.to - (last && last.isError ? 0 : 1);
            if (to > from) return { parser: attr.parser, overlay: [{ from, to }] };
          } else if (value.type.id == UnquotedAttributeValue) {
            return { parser: attr.parser, overlay: [{ from: value.from, to: value.to }] };
          }
        }
      }
    }
    return null;
  });
}

// node_modules/.pnpm/@lezer+css@1.1.9/node_modules/@lezer/css/dist/index.js
var descendantOp = 99;
var Unit = 1;
var callee = 100;
var identifier = 101;
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
var ampersand = 38;
var backslash = 92;
var newline = 10;
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
      if (!inside && (next != dash2 || i > 0)) inside = true;
      if (dashes === i && next == dash2) dashes++;
      input.advance();
    } else if (next == backslash && input.peek(1) != newline) {
      input.advance();
      if (input.next > -1) input.advance();
      inside = true;
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
    if (isAlpha(next) || next == underscore || next == hash || next == period || next == bracketL || next == colon && isAlpha(input.peek(1)) || next == dash2 || next == ampersand)
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
      } while (isAlpha(input.next) || isDigit(input.next));
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
var spec_callee = { __proto__: null, lang: 32, "nth-child": 32, "nth-last-child": 32, "nth-of-type": 32, "nth-last-of-type": 32, dir: 32, "host-context": 32, url: 60, "url-prefix": 60, domain: 60, regexp: 60, selector: 138 };
var spec_AtKeyword = { __proto__: null, "@import": 118, "@media": 142, "@charset": 146, "@namespace": 150, "@keyframes": 156, "@supports": 168 };
var spec_identifier = { __proto__: null, not: 132, only: 132 };
var parser2 = LRParser.deserialize({
  version: 14,
  states: ":jQYQ[OOO#_Q[OOP#fOWOOOOQP'#Cd'#CdOOQP'#Cc'#CcO#kQ[O'#CfO$_QXO'#CaO$fQ[O'#ChO$qQ[O'#DTO$vQ[O'#DWOOQP'#Em'#EmO${QdO'#DgO%jQ[O'#DtO${QdO'#DvO%{Q[O'#DxO&WQ[O'#D{O&`Q[O'#ERO&nQ[O'#ETOOQS'#El'#ElOOQS'#EW'#EWQYQ[OOO&uQXO'#CdO'jQWO'#DcO'oQWO'#EsO'zQ[O'#EsQOQWOOP(UO#tO'#C_POOO)C@[)C@[OOQP'#Cg'#CgOOQP,59Q,59QO#kQ[O,59QO(aQ[O'#E[O({QWO,58{O)TQ[O,59SO$qQ[O,59oO$vQ[O,59rO(aQ[O,59uO(aQ[O,59wO(aQ[O,59xO)`Q[O'#DbOOQS,58{,58{OOQP'#Ck'#CkOOQO'#DR'#DROOQP,59S,59SO)gQWO,59SO)lQWO,59SOOQP'#DV'#DVOOQP,59o,59oOOQO'#DX'#DXO)qQ`O,59rOOQS'#Cp'#CpO${QdO'#CqO)yQvO'#CsO+ZQtO,5:ROOQO'#Cx'#CxO)lQWO'#CwO+oQWO'#CyO+tQ[O'#DOOOQS'#Ep'#EpOOQO'#Dj'#DjO+|Q[O'#DqO,[QWO'#EtO&`Q[O'#DoO,jQWO'#DrOOQO'#Eu'#EuO)OQWO,5:`O,oQpO,5:bOOQS'#Dz'#DzO,wQWO,5:dO,|Q[O,5:dOOQO'#D}'#D}O-UQWO,5:gO-ZQWO,5:mO-cQWO,5:oOOQS-E8U-E8UO-kQdO,59}O-{Q[O'#E^O.YQWO,5;_O.YQWO,5;_POOO'#EV'#EVP.eO#tO,58yPOOO,58y,58yOOQP1G.l1G.lO/[QXO,5:vOOQO-E8Y-E8YOOQS1G.g1G.gOOQP1G.n1G.nO)gQWO1G.nO)lQWO1G.nOOQP1G/Z1G/ZO/iQ`O1G/^O0SQXO1G/aO0jQXO1G/cO1QQXO1G/dO1hQWO,59|O1mQ[O'#DSO1tQdO'#CoOOQP1G/^1G/^O${QdO1G/^O1{QpO,59]OOQS,59_,59_O${QdO,59aO2TQWO1G/mOOQS,59c,59cO2YQ!bO,59eOOQS'#DP'#DPOOQS'#EY'#EYO2eQ[O,59jOOQS,59j,59jO2mQWO'#DjO2xQWO,5:VO2}QWO,5:]O&`Q[O,5:XO&`Q[O'#E_O3VQWO,5;`O3bQWO,5:ZO(aQ[O,5:^OOQS1G/z1G/zOOQS1G/|1G/|OOQS1G0O1G0OO3sQWO1G0OO3xQdO'#EOOOQS1G0R1G0ROOQS1G0X1G0XOOQS1G0Z1G0ZO4TQtO1G/iOOQO1G/i1G/iOOQO,5:x,5:xO4kQ[O,5:xOOQO-E8[-E8[O4xQWO1G0yPOOO-E8T-E8TPOOO1G.e1G.eOOQP7+$Y7+$YOOQP7+$x7+$xO${QdO7+$xOOQS1G/h1G/hO5TQXO'#ErO5[QWO,59nO5aQtO'#EXO6XQdO'#EoO6cQWO,59ZO6hQpO7+$xOOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%X7+%XOOQS1G/P1G/PO6pQWO1G/POOQS-E8W-E8WOOQS1G/U1G/UO${QdO1G/qOOQO1G/w1G/wOOQO1G/s1G/sO6uQWO,5:yOOQO-E8]-E8]O7TQXO1G/xOOQS7+%j7+%jO7[QYO'#CsOOQO'#EQ'#EQO7gQ`O'#EPOOQO'#EP'#EPO7rQWO'#E`O7zQdO,5:jOOQS,5:j,5:jO8VQtO'#E]O${QdO'#E]O9WQdO7+%TOOQO7+%T7+%TOOQO1G0d1G0dO9kQpO<<HdO9sQWO,5;^OOQP1G/Y1G/YOOQS-E8V-E8VO${QdO'#EZO9{QWO,5;ZOOQT1G.u1G.uOOQP<<Hd<<HdOOQS7+$k7+$kO:TQdO7+%]OOQO7+%d7+%dOOQO,5:k,5:kO3{QdO'#EaO7rQWO,5:zOOQS,5:z,5:zOOQS-E8^-E8^OOQS1G0U1G0UO:[QtO,5:wOOQS-E8Z-E8ZOOQO<<Ho<<HoOOQPAN>OAN>OO;]QdO,5:uOOQO-E8X-E8XOOQO<<Hw<<HwOOQO,5:{,5:{OOQO-E8_-E8_OOQS1G0f1G0f",
  stateData: ";o~O#ZOS#[QQ~OUYOXYO]VO^VOqXOxWO![aO!]ZO!i[O!k]O!m^O!p_O!v`O#XRO#bTO~OQfOUYOXYO]VO^VOqXOxWO![aO!]ZO!i[O!k]O!m^O!p_O!v`O#XeO#bTO~O#U#gP~P!ZO#[jO~O#XlO~O]qO^qOqsOtoOxrO!OtO!RvO#VuO#bnO~O!TwO~P#pO`}O#WzO#XyO~O#X!OO~O#X!QO~OQ![Ob!TOf![Oh![On!YOq!ZO#W!WO#X!SO#e!UO~Ob!^O!d!`O!g!aO#X!]O!T#hP~Oh!fOn!YO#X!eO~Oh!hO#X!hO~Ob!^O!d!`O!g!aO#X!]O~O!Y#hP~P%jO]WX]!WX^WXqWXtWXxWX!OWX!RWX!TWX#VWX#bWX~O]!mO~O!Y!nO#U#gX!S#gX~O#U#gX!S#gX~P!ZO#]!qO#^!qO#_!sO~OUYOXYO]VO^VOqXOxWO#XRO#bTO~OtoO!TwO~O`!zO#WzO#XyO~O!S#gP~P!ZOb#RO~Ob#SO~Op#TO|#UO~OP#WObgXjgX!YgX!dgX!ggX#XgXagXQgXfgXhgXngXqgXtgX!XgX#UgX#WgX#egXpgX!SgX~Ob!^Oj#XO!d!`O!g!aO#X!]O!Y#hP~Ob#[O~Op#`O#X#]O~Ob!^O!d!`O!g!aO#X#aO~Ot#eO!b#dO!T#hX!Y#hX~Ob#hO~Oj#XO!Y#jO~O!Y#kO~Oh#lOn!YO~O!T#mO~O!TwO!b#dO~O!TwO!Y#pO~O!X#rO!Y!Va#U!Va!S!Va~P${O!Y#QX#U#QX!S#QX~P!ZO!Y!nO#U#ga!S#ga~O#]!qO#^!qO#_#xO~O]qO^qOqsOxrO!OtO!RvO#VuO#bnO~Ot#Oa!T#Oaa#Oa~P.pOp#zO|#{O~O]qO^qOqsOxrO#bnO~Ot}i!O}i!R}i!T}i#V}ia}i~P/qOt!Pi!O!Pi!R!Pi!T!Pi#V!Pia!Pi~P/qOt!Qi!O!Qi!R!Qi!T!Qi#V!Qia!Qi~P/qO!S#|O~Oa#fP~P(aOa#cP~P${Oa$TOj#XO~O!Y$VO~Oa$WOh$XOo$XO~Op$ZO#X#]O~O]!`Xa!^X!b!^X~O]$[O~Oa$]O!b#dO~Ot#eO!T#ha!Y#ha~O!b#dOt!ca!T!ca!Y!caa!ca~O!Y$bO~O!S$iO#X$dO#e$cO~Oj#XOt$kO!X$mO!Y!Vi#U!Vi!S!Vi~P${O!Y#Qa#U#Qa!S#Qa~P!ZO!Y!nO#U#gi!S#gi~Oa#fX~P#pOa$qO~Oj#XOQ!{Xa!{Xb!{Xf!{Xh!{Xn!{Xq!{Xt!{X#W!{X#X!{X#e!{X~Ot$sOa#cX~P${Oa$uO~Oj#XOp$vO~Oa$wO~O!b#dOt#Ra!T#Ra!Y#Ra~Oa$yO~P.pOP#WOtgX!TgX~O#e$cOt!sX!T!sX~Ot${O!TwO~O!S%PO#X$dO#e$cO~Oj#XOQ#PXb#PXf#PXh#PXn#PXq#PXt#PX!X#PX!Y#PX#U#PX#W#PX#X#PX#e#PX!S#PX~Ot$kO!X%SO!Y!Vq#U!Vq!S!Vq~P${Oj#XOp%TO~OtoOa#fa~Ot$sOa#ca~Oa%WO~P${Oj#XOQ#Pab#Paf#Pah#Pan#Paq#Pat#Pa!X#Pa!Y#Pa#U#Pa#W#Pa#X#Pa#e#Pa!S#Pa~Oa!}at!}a~P${O#Zo#[#ej!R#e~",
  goto: "-g#jPPP#kP#nP#w$WP#w$g#wPP$mPPP$s$|$|P%`P$|P$|%z&^PPPP$|&vP&z'Q#wP'W#w'^P#wP#w#wPPP'd'y(WPP#nPP(_(_(i(_P(_P(_(_P#nP#nP#nP(l#nP(o(r(u(|#nP#nP)R)X)h)v)|*S*^*d*n*t*zPPPPPPPPPP+Q+ZP+v+yP,o,r,x-RRkQ_bOPdhw!n#tkYOPdhotuvw!n#R#h#tkSOPdhotuvw!n#R#h#tQmTR!tnQ{VR!xqQ!x}Q#Z!XR#y!zq![Z]!T!m#S#U#X#q#{$Q$[$k$l$s$x%Up![Z]!T!m#S#U#X#q#{$Q$[$k$l$s$x%UU$f#m$h${R$z$eq!XZ]!T!m#S#U#X#q#{$Q$[$k$l$s$x%Up![Z]!T!m#S#U#X#q#{$Q$[$k$l$s$x%UQ!f^R#l!gT#^!Z#_Q|VR!yqQ!x|R#y!yQ!PWR!{rQ!RXR!|sQxUQ!wpQ#i!cQ#o!jQ#p!kQ$}$gR%Z$|SgPwQ!phQ#s!nR$n#tZfPhw!n#ta!b[`a!V!^!`#d#eR#b!^R!g^R!i_R#n!iS$g#m$hR%X${V$e#m$h${Q!rjR#w!rQdOShPwU!ldh#tR#t!nQ$Q#SU$r$Q$x%UQ$x$[R%U$sQ#_!ZR$Y#_Q$t$QR%V$tQpUS!vp$pR$p#}Q$l#qR%R$lQ!ogS#u!o#vR#v!pQ#f!_R$`#fQ$h#mR%O$hQ$|$gR%Y$|_cOPdhw!n#t^UOPdhw!n#tQ!uoQ!}tQ#OuQ#PvQ#}#RR$a#hR$R#SQ!VZQ!d]Q#V!TQ#q!m[$P#S$Q$[$s$x%UQ$S#UQ$U#XS$j#q$lQ$o#{R%Q$kR$O#RQiPR#QwQ!c[Q!kaR#Y!VU!_[a!VQ!j`Q#c!^Q#g!`Q$^#dR$_#e",
  nodeNames: "⚠ Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent ] [ LineNames LineName , PseudoClassName ArgList IdSelector # IdName AttributeSelector AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports AtRule Styles",
  maxTerm: 117,
  nodeProps: [
    ["isolate", -2, 3, 24, ""],
    ["openedBy", 17, "(", 32, "[", 50, "{"],
    ["closedBy", 18, ")", 33, "]", 51, "}"]
  ],
  propSources: [cssHighlighting],
  skippedNodes: [0, 3, 87],
  repeatNodeCount: 11,
  tokenData: "J^~R!^OX$}X^%u^p$}pq%uqr)Xrs.Rst/utu6duv$}vw7^wx7oxy9^yz9oz{9t{|:_|}?Q}!O?c!O!P@Q!P!Q@i!Q![Ab![!]B]!]!^CX!^!_$}!_!`Cj!`!aC{!a!b$}!b!cDw!c!}$}!}#OFa#O#P$}#P#QFr#Q#R6d#R#T$}#T#UGT#U#c$}#c#dHf#d#o$}#o#pH{#p#q6d#q#rI^#r#sIo#s#y$}#y#z%u#z$f$}$f$g%u$g#BY$}#BY#BZ%u#BZ$IS$}$IS$I_%u$I_$I|$}$I|$JO%u$JO$JT$}$JT$JU%u$JU$KV$}$KV$KW%u$KW&FU$}&FU&FV%u&FV;'S$};'S;=`JW<%lO$}`%QSOy%^z;'S%^;'S;=`%o<%lO%^`%cSo`Oy%^z;'S%^;'S;=`%o<%lO%^`%rP;=`<%l%^~%zh#Z~OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^~'mh#Z~o`OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^l)[UOy%^z#]%^#]#^)n#^;'S%^;'S;=`%o<%lO%^l)sUo`Oy%^z#a%^#a#b*V#b;'S%^;'S;=`%o<%lO%^l*[Uo`Oy%^z#d%^#d#e*n#e;'S%^;'S;=`%o<%lO%^l*sUo`Oy%^z#c%^#c#d+V#d;'S%^;'S;=`%o<%lO%^l+[Uo`Oy%^z#f%^#f#g+n#g;'S%^;'S;=`%o<%lO%^l+sUo`Oy%^z#h%^#h#i,V#i;'S%^;'S;=`%o<%lO%^l,[Uo`Oy%^z#T%^#T#U,n#U;'S%^;'S;=`%o<%lO%^l,sUo`Oy%^z#b%^#b#c-V#c;'S%^;'S;=`%o<%lO%^l-[Uo`Oy%^z#h%^#h#i-n#i;'S%^;'S;=`%o<%lO%^l-uS!X[o`Oy%^z;'S%^;'S;=`%o<%lO%^~.UWOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o<%lO.R~.sOh~~.vRO;'S.R;'S;=`/P;=`O.R~/SXOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o;=`<%l.R<%lO.R~/rP;=`<%l.Rn/zYxQOy%^z!Q%^!Q![0j![!c%^!c!i0j!i#T%^#T#Z0j#Z;'S%^;'S;=`%o<%lO%^l0oYo`Oy%^z!Q%^!Q![1_![!c%^!c!i1_!i#T%^#T#Z1_#Z;'S%^;'S;=`%o<%lO%^l1dYo`Oy%^z!Q%^!Q![2S![!c%^!c!i2S!i#T%^#T#Z2S#Z;'S%^;'S;=`%o<%lO%^l2ZYf[o`Oy%^z!Q%^!Q![2y![!c%^!c!i2y!i#T%^#T#Z2y#Z;'S%^;'S;=`%o<%lO%^l3QYf[o`Oy%^z!Q%^!Q![3p![!c%^!c!i3p!i#T%^#T#Z3p#Z;'S%^;'S;=`%o<%lO%^l3uYo`Oy%^z!Q%^!Q![4e![!c%^!c!i4e!i#T%^#T#Z4e#Z;'S%^;'S;=`%o<%lO%^l4lYf[o`Oy%^z!Q%^!Q![5[![!c%^!c!i5[!i#T%^#T#Z5[#Z;'S%^;'S;=`%o<%lO%^l5aYo`Oy%^z!Q%^!Q![6P![!c%^!c!i6P!i#T%^#T#Z6P#Z;'S%^;'S;=`%o<%lO%^l6WSf[o`Oy%^z;'S%^;'S;=`%o<%lO%^d6gUOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^d7QS|So`Oy%^z;'S%^;'S;=`%o<%lO%^b7cSXQOy%^z;'S%^;'S;=`%o<%lO%^~7rWOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W<%lO7o~8_RO;'S7o;'S;=`8h;=`O7o~8kXOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W;=`<%l7o<%lO7o~9ZP;=`<%l7on9cSb^Oy%^z;'S%^;'S;=`%o<%lO%^~9tOa~n9{UUQjWOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^n:fWjW!RQOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^l;TUo`Oy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^l;nYo`#e[Oy%^z!Q%^!Q![;g![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^l<cYo`Oy%^z{%^{|=R|}%^}!O=R!O!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=WUo`Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=qUo`#e[Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l>[[o`#e[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^n?VSt^Oy%^z;'S%^;'S;=`%o<%lO%^l?hWjWOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^n@VU#bQOy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^~@nTjWOy%^z{@}{;'S%^;'S;=`%o<%lO%^~AUSo`#[~Oy%^z;'S%^;'S;=`%o<%lO%^lAg[#e[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^bBbU]QOy%^z![%^![!]Bt!];'S%^;'S;=`%o<%lO%^bB{S^Qo`Oy%^z;'S%^;'S;=`%o<%lO%^nC^S!Y^Oy%^z;'S%^;'S;=`%o<%lO%^dCoS|SOy%^z;'S%^;'S;=`%o<%lO%^bDQU!OQOy%^z!`%^!`!aDd!a;'S%^;'S;=`%o<%lO%^bDkS!OQo`Oy%^z;'S%^;'S;=`%o<%lO%^bDzWOy%^z!c%^!c!}Ed!}#T%^#T#oEd#o;'S%^;'S;=`%o<%lO%^bEk[![Qo`Oy%^z}%^}!OEd!O!Q%^!Q![Ed![!c%^!c!}Ed!}#T%^#T#oEd#o;'S%^;'S;=`%o<%lO%^nFfSq^Oy%^z;'S%^;'S;=`%o<%lO%^nFwSp^Oy%^z;'S%^;'S;=`%o<%lO%^bGWUOy%^z#b%^#b#cGj#c;'S%^;'S;=`%o<%lO%^bGoUo`Oy%^z#W%^#W#XHR#X;'S%^;'S;=`%o<%lO%^bHYS!bQo`Oy%^z;'S%^;'S;=`%o<%lO%^bHiUOy%^z#f%^#f#gHR#g;'S%^;'S;=`%o<%lO%^fIQS!TUOy%^z;'S%^;'S;=`%o<%lO%^nIcS!S^Oy%^z;'S%^;'S;=`%o<%lO%^fItU!RQOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^`JZP;=`<%l$}",
  tokenizers: [descendant, unitToken, identifiers, 1, 2, 3, 4, new LocalTokenGroup("m~RRYZ[z{a~~g~aO#^~~dP!P!Qg~lO#_~~", 28, 105)],
  topRules: { "StyleSheet": [0, 4], "Styles": [1, 86] },
  specialized: [{ term: 100, get: (value) => spec_callee[value] || -1 }, { term: 58, get: (value) => spec_AtKeyword[value] || -1 }, { term: 101, get: (value) => spec_identifier[value] || -1 }],
  tokenPrec: 1219
});

// node_modules/.pnpm/@codemirror+lang-css@6.3.0_@codemirror+view@6.34.2/node_modules/@codemirror/lang-css/dist/index.js
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
var atRules = [
  "@charset",
  "@color-profile",
  "@container",
  "@counter-style",
  "@font-face",
  "@font-feature-values",
  "@font-palette-values",
  "@import",
  "@keyframes",
  "@layer",
  "@media",
  "@namespace",
  "@page",
  "@position-try",
  "@property",
  "@scope",
  "@starting-style",
  "@supports",
  "@view-transition"
].map((label) => ({ type: "keyword", label }));
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
  if (node.name == "AtKeyword")
    return { from: node.from, options: atRules, validFor: identifier2 };
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
        "Block KeyframeList": foldInside
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

// node_modules/.pnpm/@lezer+javascript@1.4.19/node_modules/@lezer/javascript/dist/index.js
var noSemi = 312;
var noSemiType = 313;
var incdec = 1;
var incdecPrefix = 2;
var questionDot = 3;
var JSXStartTag = 4;
var insertSemi = 314;
var spaces = 316;
var newline2 = 317;
var LineComment = 5;
var BlockComment = 6;
var Dialect_jsx = 0;
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
var lt = 60;
var comma = 44;
var question2 = 63;
var dot = 46;
var bracketL2 = 91;
var trackNewline = new ContextTracker({
  start: false,
  shift(context, term) {
    return term == LineComment || term == BlockComment || term == spaces ? context : term == newline2;
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
  if (space2.indexOf(next) > -1) return;
  if (next == slash2 && ((after = input.peek(1)) == slash2 || after == star)) return;
  if (next != braceR && next != semicolon && next != -1 && !stack.context)
    input.acceptToken(noSemi);
}, { contextual: true });
var noSemicolonType = new ExternalTokenizer((input, stack) => {
  if (input.next == bracketL2 && !stack.context) input.acceptToken(noSemiType);
}, { contextual: true });
var operatorToken = new ExternalTokenizer((input, stack) => {
  let { next } = input;
  if (next == plus || next == minus) {
    input.advance();
    if (next == input.next) {
      input.advance();
      let mayPostfix = !stack.context && stack.canShift(incdec);
      input.acceptToken(mayPostfix ? incdec : incdecPrefix);
    }
  } else if (next == question2 && input.peek(1) == dot) {
    input.advance();
    input.advance();
    if (input.next < 48 || input.next > 57)
      input.acceptToken(questionDot);
  }
}, { contextual: true });
function identifierChar(ch, start) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch == 95 || ch >= 192 || !start && ch >= 48 && ch <= 57;
}
var jsx = new ExternalTokenizer((input, stack) => {
  if (input.next != lt || !stack.dialectEnabled(Dialect_jsx)) return;
  input.advance();
  if (input.next == slash2) return;
  let back = 0;
  while (space2.indexOf(input.next) > -1) {
    input.advance();
    back++;
  }
  if (identifierChar(input.next, true)) {
    input.advance();
    back++;
    while (identifierChar(input.next, false)) {
      input.advance();
      back++;
    }
    while (space2.indexOf(input.next) > -1) {
      input.advance();
      back++;
    }
    if (input.next == comma) return;
    for (let i = 0; ; i++) {
      if (i == 7) {
        if (!identifierChar(input.next, true)) return;
        break;
      }
      if (input.next != "extends".charCodeAt(i)) break;
      input.advance();
      back++;
    }
  }
  input.acceptToken(JSXStartTag, -back);
});
var jsHighlight = styleTags({
  "get set async static": tags.modifier,
  "for while do if else switch try catch finally return throw break continue default case": tags.controlKeyword,
  "in of await yield void typeof delete instanceof": tags.operatorKeyword,
  "let var const using function class extends": tags.definitionKeyword,
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
  "LineComment Hashbang": tags.lineComment,
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
var spec_identifier2 = { __proto__: null, export: 20, as: 25, from: 33, default: 36, async: 41, function: 42, extends: 54, this: 58, true: 66, false: 66, null: 78, void: 82, typeof: 86, super: 102, new: 136, delete: 148, yield: 157, await: 161, class: 166, public: 229, private: 229, protected: 229, readonly: 231, instanceof: 250, satisfies: 253, in: 254, const: 256, import: 290, keyof: 345, unique: 349, infer: 355, is: 391, abstract: 411, implements: 413, type: 415, let: 418, var: 420, using: 423, interface: 429, enum: 433, namespace: 439, module: 441, declare: 445, global: 449, for: 468, of: 477, while: 480, with: 484, do: 488, if: 492, else: 494, switch: 498, case: 504, try: 510, catch: 514, finally: 518, return: 522, throw: 526, break: 530, continue: 534, debugger: 538 };
var spec_word = { __proto__: null, async: 123, get: 125, set: 127, declare: 189, public: 191, private: 191, protected: 191, static: 193, abstract: 195, override: 197, readonly: 203, accessor: 205, new: 395 };
var spec_LessThan = { __proto__: null, "<": 187 };
var parser3 = LRParser.deserialize({
  version: 14,
  states: "$CdQ%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#D^O.QQlO'#DdO.bQlO'#DoO%[QlO'#DwO0fQlO'#EPOOQ!0Lf'#EX'#EXO1PQ`O'#EUOOQO'#Em'#EmOOQO'#Ih'#IhO1XQ`O'#GpO1dQ`O'#ElO1iQ`O'#ElO3hQ!0MxO'#JnO6[Q!0MxO'#JoO6uQ`O'#F[O6zQ,UO'#FsOOQ!0Lf'#Fe'#FeO7VO7dO'#FeO7eQMhO'#FzO9RQ`O'#FyOOQ!0Lf'#Jo'#JoOOQ!0Lb'#Jn'#JnO9WQ`O'#GtOOQ['#K['#K[O9cQ`O'#IUO9hQ!0LrO'#IVOOQ['#J['#J[OOQ['#IZ'#IZQ`QlOOQ`QlOOO9pQ!L^O'#DsO9wQlO'#D{O:OQlO'#D}O9^Q`O'#GpO:VQMhO'#CoO:eQ`O'#EkO:pQ`O'#EvO:uQMhO'#FdO;dQ`O'#GpOOQO'#K]'#K]O;iQ`O'#K]O;wQ`O'#GxO;wQ`O'#GyO;wQ`O'#G{O9^Q`O'#HOO<nQ`O'#HRO>VQ`O'#CeO>gQ`O'#H_O>oQ`O'#HeO>oQ`O'#HgO`QlO'#HiO>oQ`O'#HkO>oQ`O'#HnO>tQ`O'#HtO>yQ!0LsO'#HzO%[QlO'#H|O?UQ!0LsO'#IOO?aQ!0LsO'#IQO9hQ!0LrO'#ISO?lQ!0MxO'#CiO@nQpO'#DiQOQ`OOO%[QlO'#D}OAUQ`O'#EQO:VQMhO'#EkOAaQ`O'#EkOAlQ!bO'#FdOOQ['#Cg'#CgOOQ!0Lb'#Dn'#DnOOQ!0Lb'#Jr'#JrO%[QlO'#JrOOQO'#Ju'#JuOOQO'#Id'#IdOBlQpO'#EdOOQ!0Lb'#Ec'#EcOOQ!0Lb'#Jy'#JyOChQ!0MSO'#EdOCrQpO'#ETOOQO'#Jt'#JtODWQpO'#JuOEeQpO'#ETOCrQpO'#EdPErO&2DjO'#CbPOOO)CDy)CDyOOOO'#I['#I[OE}O#tO,59UOOQ!0Lh,59U,59UOOOO'#I]'#I]OF]O&jO,59UOFkQ!L^O'#D`OOOO'#I_'#I_OFrO#@ItO,59xOOQ!0Lf,59x,59xOGQQlO'#I`OGeQ`O'#JpOIdQ!fO'#JpO+}QlO'#JpOIkQ`O,5:OOJRQ`O'#EmOJ`Q`O'#KPOJkQ`O'#KOOJkQ`O'#KOOJsQ`O,5;ZOJxQ`O'#J}OOQ!0Ln,5:Z,5:ZOKPQlO,5:ZOL}Q!0MxO,5:cOMnQ`O,5:kONXQ!0LrO'#J|ON`Q`O'#J{O9WQ`O'#J{ONtQ`O'#J{ON|Q`O,5;YO! RQ`O'#J{O!#WQ!fO'#JoOOQ!0Lh'#Ci'#CiO%[QlO'#EPO!#vQ!fO,5:pOOQS'#Jv'#JvOOQO-E<f-E<fO9^Q`O,5=[O!$^Q`O,5=[O!$cQlO,5;WO!&fQMhO'#EhO!(PQ`O,5;WO!(UQlO'#DvO!(`QpO,5;aO!(hQpO,5;aO%[QlO,5;aOOQ['#FS'#FSOOQ['#FU'#FUO%[QlO,5;bO%[QlO,5;bO%[QlO,5;bO%[QlO,5;bO%[QlO,5;bO%[QlO,5;bO%[QlO,5;bO%[QlO,5;bO%[QlO,5;bO%[QlO,5;bOOQ['#FY'#FYO!(vQlO,5;sOOQ!0Lf,5;x,5;xOOQ!0Lf,5;y,5;yOOQ!0Lf,5;{,5;{O%[QlO'#IlO!*yQ!0LrO,5<gO%[QlO,5;bO!&fQMhO,5;bO!+hQMhO,5;bO!-YQMhO'#EZO%[QlO,5;vOOQ!0Lf,5;z,5;zO!-aQ,UO'#FiO!.^Q,UO'#KTO!-xQ,UO'#KTO!.eQ,UO'#KTOOQO'#KT'#KTO!.yQ,UO,5<ROOOW,5<_,5<_O!/[QlO'#FuOOOW'#Ik'#IkO7VO7dO,5<PO!/cQ,UO'#FwOOQ!0Lf,5<P,5<PO!0SQ$IUO'#CvOOQ!0Lh'#Cz'#CzO!0gO#@ItO'#DOO!1TQMjO,5<dO!1[Q`O,5<fO!2wQ(CWO'#GVO!3UQ`O'#GWO!3ZQ`O'#GWO!4yQ(CWO'#G[O!6OQpO'#G`OOQO'#Gk'#GkO!+oQMhO'#GjOOQO'#Gm'#GmO!+oQMhO'#GlO!6qQ$IUO'#JhOOQ!0Lh'#Jh'#JhO!6{Q`O'#JgO!7ZQ`O'#JfO!7cQ`O'#CuOOQ!0Lh'#Cx'#CxO!7kQ`O'#CzOOQ!0Lh'#DS'#DSOOQ!0Lh'#DU'#DUO1SQ`O'#DWO!+oQMhO'#F}O!+oQMhO'#GPO!7pQ`O'#GRO!7uQ`O'#GSO!3ZQ`O'#GYO!+oQMhO'#G_O!7zQ`O'#EnO!8iQ`O,5<eOOQ!0Lb'#Cr'#CrO!8qQ`O'#EoO!9kQpO'#EpOOQ!0Lb'#J}'#J}O!9rQ!0LrO'#K^O9hQ!0LrO,5=`O`QlO,5>pOOQ['#Jd'#JdOOQ[,5>q,5>qOOQ[-E<X-E<XO!;qQ!0MxO,5:_O!9fQpO,5:]O!>[Q!0MxO,5:gO%[QlO,5:gO!@rQ!0MxO,5:iOOQO,5@w,5@wO!AcQMhO,5=[O!AqQ!0LrO'#JeO9RQ`O'#JeO!BSQ!0LrO,59ZO!B_QpO,59ZO!BgQMhO,59ZO:VQMhO,59ZO!BrQ`O,5;WO!BzQ`O'#H^O!C`Q`O'#KaO%[QlO,5;|O!9fQpO,5<OO!ChQ`O,5=wO!CmQ`O,5=wO!CrQ`O,5=wO9hQ!0LrO,5=wO;wQ`O,5=gOOQO'#Cv'#CvO!DQQpO,5=dO!DYQMhO,5=eO!DeQ`O,5=gO!DjQ!bO,5=jO!DrQ`O'#K]O>tQ`O'#HTO9^Q`O'#HVO!DwQ`O'#HVO:VQMhO'#HXO!D|Q`O'#HXOOQ[,5=m,5=mO!ERQ`O'#HYO!EdQ`O'#CoO!EiQ`O,59PO!EsQ`O,59PO!GxQlO,59POOQ[,59P,59PO!HYQ!0LrO,59PO%[QlO,59PO!JeQlO'#HaOOQ['#Hb'#HbOOQ['#Hc'#HcO`QlO,5=yO!J{Q`O,5=yO`QlO,5>PO`QlO,5>RO!KQQ`O,5>TO`QlO,5>VO!KVQ`O,5>YO!K[QlO,5>`OOQ[,5>f,5>fO%[QlO,5>fO9hQ!0LrO,5>hOOQ[,5>j,5>jO# fQ`O,5>jOOQ[,5>l,5>lO# fQ`O,5>lOOQ[,5>n,5>nO#!SQpO'#D[O%[QlO'#JrO#!uQpO'#JrO##PQpO'#DjO##bQpO'#DjO#%sQlO'#DjO#%zQ`O'#JqO#&SQ`O,5:TO#&XQ`O'#EqO#&gQ`O'#KQO#&oQ`O,5;[O#&tQpO'#DjO#'RQpO'#ESOOQ!0Lf,5:l,5:lO%[QlO,5:lO#'YQ`O,5:lO>tQ`O,5;VO!B_QpO,5;VO!BgQMhO,5;VO:VQMhO,5;VO#'bQ`O,5@^O#'gQ07dO,5:pOOQO-E<b-E<bO#(mQ!0MSO,5;OOCrQpO,5:oO#(wQpO,5:oOCrQpO,5;OO!BSQ!0LrO,5:oOOQ!0Lb'#Eg'#EgOOQO,5;O,5;OO%[QlO,5;OO#)UQ!0LrO,5;OO#)aQ!0LrO,5;OO!B_QpO,5:oOOQO,5;U,5;UO#)oQ!0LrO,5;OPOOO'#IY'#IYP#*TO&2DjO,58|POOO,58|,58|OOOO-E<Y-E<YOOQ!0Lh1G.p1G.pOOOO-E<Z-E<ZOOOO,59z,59zO#*`Q!bO,59zOOOO-E<]-E<]OOQ!0Lf1G/d1G/dO#*eQ!fO,5>zO+}QlO,5>zOOQO,5?Q,5?QO#*oQlO'#I`OOQO-E<^-E<^O#*|Q`O,5@[O#+UQ!fO,5@[O#+]Q`O,5@jOOQ!0Lf1G/j1G/jO%[QlO,5@kO#+eQ`O'#IfOOQO-E<d-E<dO#+]Q`O,5@jOOQ!0Lb1G0u1G0uOOQ!0Ln1G/u1G/uOOQ!0Ln1G0V1G0VO%[QlO,5@hO#+yQ!0LrO,5@hO#,[Q!0LrO,5@hO#,cQ`O,5@gO9WQ`O,5@gO#,kQ`O,5@gO#,yQ`O'#IiO#,cQ`O,5@gOOQ!0Lb1G0t1G0tO!(`QpO,5:rO!(kQpO,5:rOOQS,5:t,5:tO#-kQdO,5:tO#-sQMhO1G2vO9^Q`O1G2vOOQ!0Lf1G0r1G0rO#.RQ!0MxO1G0rO#/WQ!0MvO,5;SOOQ!0Lh'#GU'#GUO#/tQ!0MzO'#JhO!$cQlO1G0rO#2PQ!fO'#JsO%[QlO'#JsO#2ZQ`O,5:bOOQ!0Lh'#D['#D[OOQ!0Lf1G0{1G0{O%[QlO1G0{OOQ!0Lf1G1e1G1eO#2`Q`O1G0{O#4tQ!0MxO1G0|O#4{Q!0MxO1G0|O#7cQ!0MxO1G0|O#7jQ!0MxO1G0|O#:QQ!0MxO1G0|O#<hQ!0MxO1G0|O#<oQ!0MxO1G0|O#<vQ!0MxO1G0|O#?^Q!0MxO1G0|O#?eQ!0MxO1G0|O#ArQ?MtO'#CiO#CmQ?MtO1G1_O#CtQ?MtO'#JoO#DXQ!0MxO,5?WOOQ!0Lb-E<j-E<jO#FfQ!0MxO1G0|O#GcQ!0MzO1G0|OOQ!0Lf1G0|1G0|O#HfQMjO'#JxO#HpQ`O,5:uO#HuQ!0MxO1G1bO#IiQ,UO,5<VO#IqQ,UO,5<WO#IyQ,UO'#FnO#JbQ`O'#FmOOQO'#KU'#KUOOQO'#Ij'#IjO#JgQ,UO1G1mOOQ!0Lf1G1m1G1mOOOW1G1x1G1xO#JxQ?MtO'#JnO#KSQ`O,5<aO!(vQlO,5<aOOOW-E<i-E<iOOQ!0Lf1G1k1G1kO#KXQpO'#KTOOQ!0Lf,5<c,5<cO#KaQpO,5<cO#KfQMhO'#DQOOOO'#I^'#I^O#KmO#@ItO,59jOOQ!0Lh,59j,59jO%[QlO1G2OO!7uQ`O'#InO#KxQ`O,5<xOOQ!0Lh,5<u,5<uO!+oQMhO'#IqO#LfQMjO,5=UO!+oQMhO'#IsO#MXQMjO,5=WO!&fQMhO,5=YOOQO1G2Q1G2QO#McQ!dO'#CrO#MvQ(CWO'#EoO#N{QpO'#G`O$ cQ!dO,5<qO$ jQ`O'#KXO9WQ`O'#KXO$ xQ`O,5<sO!+oQMhO,5<rO$ }Q`O'#GXO$!`Q`O,5<rO$!eQ!dO'#GUO$!rQ!dO'#KYO$!|Q`O'#KYO!&fQMhO'#KYO$#RQ`O,5<vO$#WQlO'#JrO$#bQpO'#GaO##bQpO'#GaO$#sQ`O'#GeO!3ZQ`O'#GhO$#xQ!0LrO'#IpO$$TQpO,5<zOOQ!0Lp,5<z,5<zO$$[QpO'#GaO$$iQpO'#GbO$$zQpO'#GbO$%PQMjO,5=UO$%aQMjO,5=WOOQ!0Lh,5=Z,5=ZO!+oQMhO,5@RO!+oQMhO,5@RO$%qQ`O'#IuO$%|Q`O,5@QO$&UQ`O,59aOOQ!0Lh,59f,59fO$&{Q$IYO,59rOOQ!0Lh'#Jl'#JlO$'nQMjO,5<iO$(aQMjO,5<kO@fQ`O,5<mOOQ!0Lh,5<n,5<nO$(kQ`O,5<tO$(pQMjO,5<yO$)QQ`O'#J{O!$cQlO1G2PO$)VQ`O1G2PO9WQ`O'#KOO9WQ`O'#EqO%[QlO'#EqO9WQ`O'#IwO$)[Q!0LrO,5@xOOQ[1G2z1G2zOOQ[1G4[1G4[OOQ!0Lf1G/y1G/yOOQ!0Lf1G/w1G/wO$+^Q!0MxO1G0ROOQ[1G2v1G2vO!&fQMhO1G2vO%[QlO1G2vO#-vQ`O1G2vO$-bQMhO'#EhOOQ!0Lb,5@P,5@PO$-lQ!0LrO,5@POOQ[1G.u1G.uO!BSQ!0LrO1G.uO!B_QpO1G.uO!BgQMhO1G.uO$-}Q`O1G0rO$.SQ`O'#CiO$._Q`O'#KbO$.gQ`O,5=xO$.lQ`O'#KbO$.qQ`O'#KbO$/PQ`O'#I}O$/_Q`O,5@{O$/gQ!fO1G1hOOQ!0Lf1G1j1G1jO9^Q`O1G3cO@fQ`O1G3cO$/nQ`O1G3cO$/sQ`O1G3cOOQ[1G3c1G3cO!DeQ`O1G3RO!&fQMhO1G3OO$/xQ`O1G3OOOQ[1G3P1G3PO!&fQMhO1G3PO$/}Q`O1G3PO$0VQpO'#G}OOQ[1G3R1G3RO!5yQpO'#IyO!DjQ!bO1G3UOOQ[1G3U1G3UOOQ[,5=o,5=oO$0_QMhO,5=qO9^Q`O,5=qO$#sQ`O,5=sO9RQ`O,5=sO!B_QpO,5=sO!BgQMhO,5=sO:VQMhO,5=sO$0mQ`O'#K`O$0xQ`O,5=tOOQ[1G.k1G.kO$0}Q!0LrO1G.kO@fQ`O1G.kO$1YQ`O1G.kO9hQ!0LrO1G.kO$3bQ!fO,5@}O$3oQ`O,5@}O9WQ`O,5@}O$3zQlO,5={O$4RQ`O,5={OOQ[1G3e1G3eO`QlO1G3eOOQ[1G3k1G3kOOQ[1G3m1G3mO>oQ`O1G3oO$4WQlO1G3qO$8[QlO'#HpOOQ[1G3t1G3tO$8iQ`O'#HvO>tQ`O'#HxOOQ[1G3z1G3zO$8qQlO1G3zO9hQ!0LrO1G4QOOQ[1G4S1G4SOOQ!0Lb'#G]'#G]O9hQ!0LrO1G4UO9hQ!0LrO1G4WO$<xQ`O,5@^O!(vQlO,5;]O9WQ`O,5;]O>tQ`O,5:UO!(vQlO,5:UO!B_QpO,5:UO$<}Q?MtO,5:UOOQO,5;],5;]O$=XQpO'#IaO$=oQ`O,5@]OOQ!0Lf1G/o1G/oO$=wQpO'#IgO$>RQ`O,5@lOOQ!0Lb1G0v1G0vO##bQpO,5:UOOQO'#Ic'#IcO$>ZQpO,5:nOOQ!0Ln,5:n,5:nO#']Q`O1G0WOOQ!0Lf1G0W1G0WO%[QlO1G0WOOQ!0Lf1G0q1G0qO>tQ`O1G0qO!B_QpO1G0qO!BgQMhO1G0qOOQ!0Lb1G5x1G5xO!BSQ!0LrO1G0ZOOQO1G0j1G0jO%[QlO1G0jO$>bQ!0LrO1G0jO$>mQ!0LrO1G0jO!B_QpO1G0ZOCrQpO1G0ZO$>{Q!0LrO1G0jOOQO1G0Z1G0ZO$?aQ!0MxO1G0jPOOO-E<W-E<WPOOO1G.h1G.hOOOO1G/f1G/fO$?kQ!bO,5<gO$?sQ!fO1G4fOOQO1G4l1G4lO%[QlO,5>zO$?}Q`O1G5vO$@VQ`O1G6UO$@_Q!fO1G6VO9WQ`O,5?QO$@iQ!0MxO1G6SO%[QlO1G6SO$@yQ!0LrO1G6SO$A[Q`O1G6RO$A[Q`O1G6RO9WQ`O1G6RO$AdQ`O,5?TO9WQ`O,5?TOOQO,5?T,5?TO$AxQ`O,5?TO$)QQ`O,5?TOOQO-E<g-E<gOOQS1G0^1G0^OOQS1G0`1G0`O#-nQ`O1G0`OOQ[7+(b7+(bO!&fQMhO7+(bO%[QlO7+(bO$BWQ`O7+(bO$BcQMhO7+(bO$BqQ!0MzO,5=UO$D|Q!0MzO,5=WO$GXQ!0MzO,5=UO$IjQ!0MzO,5=WO$K{Q!0MzO,59rO$NQQ!0MzO,5<iO%!]Q!0MzO,5<kO%$hQ!0MzO,5<yOOQ!0Lf7+&^7+&^O%&yQ!0MxO7+&^O%'mQlO'#IbO%'zQ`O,5@_O%(SQ!fO,5@_OOQ!0Lf1G/|1G/|O%(^Q`O7+&gOOQ!0Lf7+&g7+&gO%(cQ?MtO,5:cO%[QlO7+&yO%(mQ?MtO,5:_O%(zQ?MtO,5:gO%)UQ?MtO,5:iO%)`QMhO'#IeO%)jQ`O,5@dOOQ!0Lh1G0a1G0aOOQO1G1q1G1qOOQO1G1r1G1rO%)rQ!jO,5<YO!(vQlO,5<XOOQO-E<h-E<hOOQ!0Lf7+'X7+'XOOOW7+'d7+'dOOOW1G1{1G1{O%)}Q`O1G1{OOQ!0Lf1G1}1G1}OOOO,59l,59lO%*SQ!dO,59lOOOO-E<[-E<[OOQ!0Lh1G/U1G/UO%*ZQ!0MxO7+'jOOQ!0Lh,5?Y,5?YO%*}QMhO1G2dP%+UQ`O'#InPOQ!0Lh-E<l-E<lO%+rQMjO,5?]OOQ!0Lh-E<o-E<oO%,eQMjO,5?_OOQ!0Lh-E<q-E<qO%,oQ!dO1G2tO%,vQ!dO'#CrO%-^QMhO'#KOO$#WQlO'#JrOOQ!0Lh1G2]1G2]O%-eQ`O'#ImO%-yQ`O,5@sO%-yQ`O,5@sO%.RQ`O,5@sO%.^Q`O,5@sOOQO1G2_1G2_O%.lQMjO1G2^O!+oQMhO1G2^O%.|Q(CWO'#IoO%/ZQ`O,5@tO!&fQMhO,5@tO%/cQ!dO,5@tOOQ!0Lh1G2b1G2bO%1sQ!fO'#CiO%1}Q`O,5<}OOQ!0Lb,5<{,5<{O%2VQpO,5<{OOQ!0Lb,5<|,5<|OCcQ`O,5<{O%2bQpO,5<{OOQ!0Lb,5=P,5=PO$)QQ`O,5=SOOQO,5?[,5?[OOQO-E<n-E<nOOQ!0Lp1G2f1G2fO##bQpO,5<{O$#WQlO,5<}O%2pQ`O,5<|O%2{QpO,5<|O!+oQMhO'#IqO%3uQMjO1G2pO!+oQMhO'#IsO%4hQMjO1G2rO%4rQMjO1G5mO%4|QMjO1G5mOOQO,5?a,5?aOOQO-E<s-E<sOOQO1G.{1G.{O!9fQpO,59tO%[QlO,59tOOQ!0Lh,5<h,5<hO%5ZQ`O1G2XO!+oQMhO1G2`O%5`Q!0MxO7+'kOOQ!0Lf7+'k7+'kO!$cQlO7+'kO%6SQ`O,5;]OOQ!0Lb,5?c,5?cOOQ!0Lb-E<u-E<uO%6XQ!dO'#KZO#']Q`O7+(bO4UQ!fO7+(bO$BZQ`O7+(bO%6cQ!0MvO'#CiO%6vQ!0MvO,5=QO%7hQ`O,5=QOOQ!0Lb1G5k1G5kOOQ[7+$a7+$aO!BSQ!0LrO7+$aO!B_QpO7+$aO!$cQlO7+&^O%7mQ`O'#I|O%8UQ`O,5@|OOQO1G3d1G3dO9^Q`O,5@|O%8UQ`O,5@|O%8^Q`O,5@|OOQO,5?i,5?iOOQO-E<{-E<{OOQ!0Lf7+'S7+'SO%8cQ`O7+(}O9hQ!0LrO7+(}O9^Q`O7+(}O@fQ`O7+(}OOQ[7+(m7+(mO%8hQ!0MvO7+(jO!&fQMhO7+(jO!D`Q`O7+(kOOQ[7+(k7+(kO!&fQMhO7+(kO%8rQ`O'#K_O%8}Q`O,5=iOOQO,5?e,5?eOOQO-E<w-E<wOOQ[7+(p7+(pO%:aQpO'#HWOOQ[1G3]1G3]O!&fQMhO1G3]O%[QlO1G3]O%:hQ`O1G3]O%:sQMhO1G3]O9hQ!0LrO1G3_O$#sQ`O1G3_O9RQ`O1G3_O!B_QpO1G3_O!BgQMhO1G3_O%;RQ`O'#I{O%;gQ`O,5@zO%;oQpO,5@zOOQ!0Lb1G3`1G3`OOQ[7+$V7+$VO@fQ`O7+$VO9hQ!0LrO7+$VO%;zQ`O7+$VO%[QlO1G6iO%[QlO1G6jO%<PQ!0LrO1G6iO%<ZQlO1G3gO%<bQ`O1G3gO%<gQlO1G3gOOQ[7+)P7+)PO9hQ!0LrO7+)ZO`QlO7+)]OOQ['#Ke'#KeOOQ['#JO'#JOO%<nQlO,5>[OOQ[,5>[,5>[O%[QlO'#HqO%<{Q`O'#HsOOQ[,5>b,5>bO9WQ`O,5>bOOQ[,5>d,5>dOOQ[7+)f7+)fOOQ[7+)l7+)lOOQ[7+)p7+)pOOQ[7+)r7+)rO%=QQpO1G5xO%=lQ?MtO1G0wO%=vQ`O1G0wOOQO1G/p1G/pO%>RQ?MtO1G/pO>tQ`O1G/pO!(vQlO'#DjOOQO,5>{,5>{OOQO-E<_-E<_OOQO,5?R,5?ROOQO-E<e-E<eO!B_QpO1G/pOOQO-E<a-E<aOOQ!0Ln1G0Y1G0YOOQ!0Lf7+%r7+%rO#']Q`O7+%rOOQ!0Lf7+&]7+&]O>tQ`O7+&]O!B_QpO7+&]OOQO7+%u7+%uO$?aQ!0MxO7+&UOOQO7+&U7+&UO%[QlO7+&UO%>]Q!0LrO7+&UO!BSQ!0LrO7+%uO!B_QpO7+%uO%>hQ!0LrO7+&UO%>vQ!0MxO7++nO%[QlO7++nO%?WQ`O7++mO%?WQ`O7++mOOQO1G4o1G4oO9WQ`O1G4oO%?`Q`O1G4oOOQS7+%z7+%zO#']Q`O<<K|O4UQ!fO<<K|O%?nQ`O<<K|OOQ[<<K|<<K|O!&fQMhO<<K|O%[QlO<<K|O%?vQ`O<<K|O%@RQ!0MzO,5?]O%B^Q!0MzO,5?_O%DiQ!0MzO1G2^O%FzQ!0MzO1G2pO%IVQ!0MzO1G2rO%KbQ!fO,5>|O%[QlO,5>|OOQO-E<`-E<`O%KlQ`O1G5yOOQ!0Lf<<JR<<JRO%KtQ?MtO1G0rO%M{Q?MtO1G0|O%NSQ?MtO1G0|O&!TQ?MtO1G0|O&![Q?MtO1G0|O&$]Q?MtO1G0|O&&^Q?MtO1G0|O&&eQ?MtO1G0|O&&lQ?MtO1G0|O&(mQ?MtO1G0|O&(tQ?MtO1G0|O&({Q!0MxO<<JeO&*sQ?MtO1G0|O&+pQ?MvO1G0|O&,sQ?MvO'#JhO&.yQ?MtO1G1bO&/WQ?MtO1G0RO&/bQMjO,5?POOQO-E<c-E<cO!(vQlO'#FpOOQO'#KV'#KVOOQO1G1t1G1tO&/lQ`O1G1sO&/qQ?MtO,5?WOOOW7+'g7+'gOOOO1G/W1G/WO&/{Q!dO1G4tOOQ!0Lh7+(O7+(OP!&fQMhO,5?YO!+oQMhO7+(`O&0SQ`O,5?XO9WQ`O,5?XOOQO-E<k-E<kO&0bQ`O1G6_O&0bQ`O1G6_O&0jQ`O1G6_O&0uQMjO7+'xO&1VQ!dO,5?ZO&1aQ`O,5?ZO!&fQMhO,5?ZOOQO-E<m-E<mO&1fQ!dO1G6`O&1pQ`O1G6`O&1xQ`O1G2iO!&fQMhO1G2iOOQ!0Lb1G2g1G2gOOQ!0Lb1G2h1G2hO%2VQpO1G2gO!B_QpO1G2gOCcQ`O1G2gOOQ!0Lb1G2n1G2nO&1}QpO1G2gO&2]Q`O1G2iO$)QQ`O1G2hOCcQ`O1G2hO$#WQlO1G2iO&2eQ`O1G2hO&3XQMjO,5?]OOQ!0Lh-E<p-E<pO&3zQMjO,5?_OOQ!0Lh-E<r-E<rO!+oQMhO7++XOOQ!0Lh1G/`1G/`O&4UQ`O1G/`OOQ!0Lh7+'s7+'sO&4ZQMjO7+'zO&4kQ!0MxO<<KVOOQ!0Lf<<KV<<KVO&5_Q`O1G0wO!&fQMhO'#IvO&5dQ`O,5@uO&7fQ!fO<<K|O!&fQMhO1G2lOOQ[<<G{<<G{O!BSQ!0LrO<<G{O&7mQ!0MxO<<IxOOQ!0Lf<<Ix<<IxOOQO,5?h,5?hO&8aQ`O,5?hO&8fQ`O,5?hOOQO-E<z-E<zO&8tQ`O1G6hO&8tQ`O1G6hO9^Q`O1G6hO@fQ`O<<LiOOQ[<<Li<<LiO&8|Q`O<<LiO9hQ!0LrO<<LiOOQ[<<LU<<LUO%8hQ!0MvO<<LUOOQ[<<LV<<LVO!D`Q`O<<LVO&9RQpO'#IxO&9^Q`O,5@yO!(vQlO,5@yOOQ[1G3T1G3TOOQO'#Iz'#IzO9hQ!0LrO'#IzO&9fQpO,5=rOOQ[,5=r,5=rO&9mQpO'#EdO&9tQpO'#GcO&9yQ`O7+(wO&:OQ`O7+(wOOQ[7+(w7+(wO!&fQMhO7+(wO%[QlO7+(wO&:WQ`O7+(wOOQ[7+(y7+(yO9hQ!0LrO7+(yO$#sQ`O7+(yO9RQ`O7+(yO!B_QpO7+(yO&:cQ`O,5?gOOQO-E<y-E<yOOQO'#HZ'#HZO&:nQ`O1G6fO9hQ!0LrO<<GqOOQ[<<Gq<<GqO@fQ`O<<GqO&:vQ`O7+,TO&:{Q`O7+,UO%[QlO7+,TO%[QlO7+,UOOQ[7+)R7+)RO&;QQ`O7+)RO&;VQlO7+)RO&;^Q`O7+)ROOQ[<<Lu<<LuOOQ[<<Lw<<LwOOQ[-E<|-E<|OOQ[1G3v1G3vO&;cQ`O,5>]OOQ[,5>_,5>_O&;hQ`O1G3|O9WQ`O7+&cO!(vQlO7+&cOOQO7+%[7+%[O&;mQ?MtO1G6VO>tQ`O7+%[OOQ!0Lf<<I^<<I^OOQ!0Lf<<Iw<<IwO>tQ`O<<IwOOQO<<Ip<<IpO$?aQ!0MxO<<IpO%[QlO<<IpOOQO<<Ia<<IaO!BSQ!0LrO<<IaO&;wQ!0LrO<<IpO&<SQ!0MxO<= YO&<dQ`O<= XOOQO7+*Z7+*ZO9WQ`O7+*ZOOQ[ANAhANAhO&<lQ!fOANAhO!&fQMhOANAhO#']Q`OANAhO4UQ!fOANAhO&<sQ`OANAhO%[QlOANAhO&<{Q!0MzO7+'xO&?^Q!0MzO,5?]O&AiQ!0MzO,5?_O&CtQ!0MzO7+'zO&FVQ!fO1G4hO&FaQ?MtO7+&^O&HeQ?MvO,5=UO&JlQ?MvO,5=WO&J|Q?MvO,5=UO&K^Q?MvO,5=WO&KnQ?MvO,59rO&MtQ?MvO,5<iO' wQ?MvO,5<kO'$]Q?MvO,5<yO'&RQ?MtO7+'jO'&`Q?MtO7+'kO'&mQ`O,5<[OOQO7+'_7+'_OOQ!0Lh7+*`7+*`O'&rQMjO<<KzOOQO1G4s1G4sO'&yQ`O1G4sO''UQ`O1G4sO''dQ`O7++yO''dQ`O7++yO!&fQMhO1G4uO''lQ!dO1G4uO''vQ`O7++zO'(OQ`O7+(TO'(ZQ!dO7+(TOOQ!0Lb7+(R7+(ROOQ!0Lb7+(S7+(SO!B_QpO7+(ROCcQ`O7+(RO'(eQ`O7+(TO!&fQMhO7+(TO$)QQ`O7+(SO'(jQ`O7+(TOCcQ`O7+(SO'(rQMjO<<NsOOQ!0Lh7+$z7+$zO'(|Q!dO,5?bOOQO-E<t-E<tO')WQ!0MvO7+(WOOQ[AN=gAN=gO9^Q`O1G5SOOQO1G5S1G5SO')hQ`O1G5SO')mQ`O7+,SO')mQ`O7+,SO9hQ!0LrOANBTO@fQ`OANBTOOQ[ANBTANBTOOQ[ANApANApOOQ[ANAqANAqO')uQ`O,5?dOOQO-E<v-E<vO'*QQ?MtO1G6eOOQO,5?f,5?fOOQO-E<x-E<xOOQ[1G3^1G3^O'*[Q`O,5<}OOQ[<<Lc<<LcO!&fQMhO<<LcO&9yQ`O<<LcO'*aQ`O<<LcO%[QlO<<LcOOQ[<<Le<<LeO9hQ!0LrO<<LeO$#sQ`O<<LeO9RQ`O<<LeO'*iQpO1G5RO'*tQ`O7+,QOOQ[AN=]AN=]O9hQ!0LrOAN=]OOQ[<= o<= oOOQ[<= p<= pO'*|Q`O<= oO'+RQ`O<= pOOQ[<<Lm<<LmO'+WQ`O<<LmO'+]QlO<<LmOOQ[1G3w1G3wO>tQ`O7+)hO'+dQ`O<<I}O'+oQ?MtO<<I}OOQO<<Hv<<HvOOQ!0LfAN?cAN?cOOQOAN?[AN?[O$?aQ!0MxOAN?[OOQOAN>{AN>{O%[QlOAN?[OOQO<<Mu<<MuOOQ[G27SG27SO!&fQMhOG27SO#']Q`OG27SO'+yQ!fOG27SO4UQ!fOG27SO',QQ`OG27SO',YQ?MtO<<JeO',gQ?MvO1G2^O'.]Q?MvO,5?]O'0`Q?MvO,5?_O'2cQ?MvO1G2pO'4fQ?MvO1G2rO'6iQ?MtO<<KVO'6vQ?MtO<<IxOOQO1G1v1G1vO!+oQMhOANAfOOQO7+*_7+*_O'7TQ`O7+*_O'7`Q`O<= eO'7hQ!dO7+*aOOQ!0Lb<<Ko<<KoO$)QQ`O<<KoOCcQ`O<<KoO'7rQ`O<<KoO!&fQMhO<<KoOOQ!0Lb<<Km<<KmO!B_QpO<<KmO'7}Q!dO<<KoOOQ!0Lb<<Kn<<KnO'8XQ`O<<KoO!&fQMhO<<KoO$)QQ`O<<KnOOQO7+*n7+*nO9^Q`O7+*nO'8^Q`O<= nOOQ[G27oG27oO9hQ!0LrOG27oO!(vQlO1G5OO'8fQ`O7+,PO'8nQ`O1G2iO&9yQ`OANA}OOQ[ANA}ANA}O!&fQMhOANA}O'8sQ`OANA}OOQ[ANBPANBPO9hQ!0LrOANBPO$#sQ`OANBPOOQO'#H['#H[OOQO7+*m7+*mOOQ[G22wG22wOOQ[ANEZANEZOOQ[ANE[ANE[OOQ[ANBXANBXO'8{Q`OANBXOOQ[<<MS<<MSO!(vQlOAN?iOOQOG24vG24vO$?aQ!0MxOG24vO#']Q`OLD,nOOQ[LD,nLD,nO!&fQMhOLD,nO'9QQ!fOLD,nO'9XQ?MvO7+'xO':}Q?MvO,5?]O'=QQ?MvO,5?_O'?TQ?MvO7+'zO'@yQMjOG27QOOQO<<My<<MyOOQ!0LbANAZANAZO$)QQ`OANAZOCcQ`OANAZO'AZQ!dOANAZOOQ!0LbANAXANAXO'AbQ`OANAZO!&fQMhOANAZO'AmQ!dOANAZOOQ!0LbANAYANAYOOQO<<NY<<NYOOQ[LD-ZLD-ZO'AwQ?MtO7+*jOOQO'#Gd'#GdOOQ[G27iG27iO&9yQ`OG27iO!&fQMhOG27iOOQ[G27kG27kO9hQ!0LrOG27kOOQ[G27sG27sO'BRQ?MtOG25TOOQOLD*bLD*bOOQ[!$(!Y!$(!YO#']Q`O!$(!YO!&fQMhO!$(!YO'B]Q!0MzOG27QOOQ!0LbG26uG26uO$)QQ`OG26uO'DnQ`OG26uOCcQ`OG26uO'DyQ!dOG26uO!&fQMhOG26uOOQ[LD-TLD-TO&9yQ`OLD-TOOQ[LD-VLD-VOOQ[!)9Et!)9EtO#']Q`O!)9EtOOQ!0LbLD,aLD,aO$)QQ`OLD,aOCcQ`OLD,aO'EQQ`OLD,aO'E]Q!dOLD,aOOQ[!$(!o!$(!oOOQ[!.K;`!.K;`O'EdQ?MvOG27QOOQ!0Lb!$( {!$( {O$)QQ`O!$( {OCcQ`O!$( {O'GYQ`O!$( {OOQ!0Lb!)9Eg!)9EgO$)QQ`O!)9EgOCcQ`O!)9EgOOQ!0Lb!.K;R!.K;RO$)QQ`O!.K;ROOQ!0Lb!4/0m!4/0mO!(vQlO'#DwO1PQ`O'#EUO'GeQ!fO'#JnO'GlQ!L^O'#DsO'GsQlO'#D{O'GzQ!fO'#CiO'JbQ!fO'#CiO!(vQlO'#D}O'JrQlO,5;WO!(vQlO,5;bO!(vQlO,5;bO!(vQlO,5;bO!(vQlO,5;bO!(vQlO,5;bO!(vQlO,5;bO!(vQlO,5;bO!(vQlO,5;bO!(vQlO,5;bO!(vQlO,5;bO!(vQlO'#IlO'LuQ`O,5<gO!(vQlO,5;bO'L}QMhO,5;bO'NhQMhO,5;bO!(vQlO,5;vO!&fQMhO'#GjO'L}QMhO'#GjO!&fQMhO'#GlO'L}QMhO'#GlO1SQ`O'#DWO1SQ`O'#DWO!&fQMhO'#F}O'L}QMhO'#F}O!&fQMhO'#GPO'L}QMhO'#GPO!&fQMhO'#G_O'L}QMhO'#G_O!(vQlO,5:gO'NoQpO'#D[O'NyQpO'#JrO!(vQlO,5@kO'JrQlO1G0rO( TQ?MtO'#CiO!(vQlO1G2OO!&fQMhO'#IqO'L}QMhO'#IqO!&fQMhO'#IsO'L}QMhO'#IsO( _Q!dO'#CrO!&fQMhO,5<rO'L}QMhO,5<rO'JrQlO1G2PO!(vQlO7+&yO!&fQMhO1G2^O'L}QMhO1G2^O!&fQMhO'#IqO'L}QMhO'#IqO!&fQMhO'#IsO'L}QMhO'#IsO!&fQMhO1G2`O'L}QMhO1G2`O'JrQlO7+'kO'JrQlO7+&^O!&fQMhOANAfO'L}QMhOANAfO( rQ`O'#ElO( wQ`O'#ElO(!PQ`O'#F[O(!UQ`O'#EvO(!ZQ`O'#KPO(!fQ`O'#J}O(!qQ`O,5;WO(!vQMjO,5<dO(!}Q`O'#GWO(#SQ`O'#GWO(#XQ`O,5<eO(#aQ`O,5;WO(#iQ?MtO1G1_O(#pQ`O,5<rO(#uQ`O,5<rO(#zQ`O,5<tO($PQ`O,5<tO($UQ`O1G2PO($ZQ`O1G0rO($`QMjO<<KzO($gQMjO<<KzO7eQMhO'#FzO9RQ`O'#FyOAaQ`O'#EkO!(vQlO,5;sO!3ZQ`O'#GWO!3ZQ`O'#GWO!3ZQ`O'#GYO!3ZQ`O'#GYO!+oQMhO7+(`O!+oQMhO7+(`O%,oQ!dO1G2tO%,oQ!dO1G2tO!&fQMhO,5=YO!&fQMhO,5=Y",
  stateData: "(%k~O'xOS'yOSTOS'zRQ~OPYOQYOSfOY!VOaqOdzOeyOmkOoYOpkOqkOwkOyYO{YO!PWO!TkO!UkO![XO!fuO!iZO!lYO!mYO!nYO!pvO!rwO!uxO!y]O#t!PO$V|O%e}O%g!QO%i!OO%j!OO%k!OO%n!RO%p!SO%s!TO%t!TO%v!UO&S!WO&Y!XO&[!YO&^!ZO&`![O&c!]O&i!^O&o!_O&q!`O&s!aO&u!bO&w!cO(PSO(RTO(UUO(]VO(k[O(ziO~OWtO~P`OPYOQYOSfOd!jOe!iOmkOoYOpkOqkOwkOyYO{YO!PWO!TkO!UkO![!eO!fuO!iZO!lYO!mYO!nYO!pvO!r!gO!u!hO$V!kO(P!dO(RTO(UUO(]VO(k[O(ziO~Oa!wOp!nO!P!oO!_!yO!`!vO!a!vO!y;kO#Q!pO#R!pO#S!xO#T!pO#U!pO#X!zO#Y!zO(Q!lO(RTO(UUO(a!mO(k!sO~O'z!{O~OP]XR]X[]Xa]Xo]X}]X!P]X!Y]X!i]X!m]X#O]X#P]X#]]X#hfX#k]X#l]X#m]X#n]X#o]X#p]X#q]X#r]X#s]X#u]X#w]X#y]X#z]X$P]X'v]X(]]X(n]X(u]X(v]X~O!d%PX~P(qO_!}O(R#PO(S!}O(T#PO~O_#QO(T#PO(U#PO(V#QO~Ou#SO!R#TO(^#TO(_#VO~OPYOQYOSfOd!jOe!iOmkOoYOpkOqkOwkOyYO{YO!PWO!TkO!UkO![!eO!fuO!iZO!lYO!mYO!nYO!pvO!r!gO!u!hO$V!kO(P;oO(RTO(UUO(]VO(k[O(ziO~O!X#ZO!Y#WO!V(dP!V(rP~P+}O!Z#cO~P`OPYOQYOSfOd!jOe!iOoYOpkOqkOwkOyYO{YO!PWO!TkO!UkO![!eO!fuO!iZO!lYO!mYO!nYO!pvO!r!gO!u!hO$V!kO(RTO(UUO(]VO(k[O(ziO~Om#mO!X#iO!y]O#f#lO#g#iO(P;pO!h(oP~P.iO!i#oO(P#nO~O!u#sO!y]O%e#tO~O#h#uO~O!d#vO#h#uO~OP$[OR#zO[$cOo$aO}#yO!P#{O!Y$_O!i#xO!m$[O#O$RO#k$OO#l$PO#m$PO#n$PO#o$QO#p$RO#q$RO#r$bO#s$RO#u$SO#w$UO#y$WO#z$XO(]VO(n$YO(u#|O(v#}O~Oa(bX'v(bX's(bX!h(bX!V(bX![(bX%f(bX!d(bX~P1qO#P$dO#]$eO$P$eOP(cXR(cX[(cXo(cX}(cX!P(cX!Y(cX!i(cX!m(cX#O(cX#k(cX#l(cX#m(cX#n(cX#o(cX#p(cX#q(cX#r(cX#s(cX#u(cX#w(cX#y(cX#z(cX(](cX(n(cX(u(cX(v(cX![(cX%f(cX~Oa(cX'v(cX's(cX!V(cX!h(cXs(cX!d(cX~P4UO#]$eO~O$[$hO$^$gO$e$mO~OSfO![$nO$h$oO$j$qO~Oh%VOm%WOo%XOp$tOq$tOw%YOy%ZO{%[O!P${O![$|O!f%aO!i$xO#g%bO$V%_O$r%]O$t%^O$w%`O(P$sO(RTO(UUO(]$uO(u$}O(v%POg(YP~O!i%cO~O!P%fO![%gO(P%eO~O!d%kO~Oa%lO'v%lO~O}%pO~P%[O(Q!lO~P%[O%k%tO~P%[Oh%VO!i%cO(P%eO(Q!lO~Oe%{O!i%cO(P%eO~O#s$RO~O}&QO![%}O!i&PO%g&TO(P%eO(Q!lO(RTO(UUO`)TP~O!u#sO~O%p&VO!P)PX![)PX(P)PX~O(P&WO~O!r&]O#t!PO%g!QO%i!OO%j!OO%k!OO%n!RO%p!SO%s!TO%t!TO~Od&bOe&aO!u&_O%e&`O%x&^O~P;|Od&eOeyO![&dO!r&]O!uxO!y]O#t!PO%e}O%i!OO%j!OO%k!OO%n!RO%p!SO%s!TO%t!TO%v!UO~Ob&hO#]&kO%g&fO(Q!lO~P=RO!i&lO!r&pO~O!i#oO~O![XO~Oa%lO't&xO'v%lO~Oa%lO't&{O'v%lO~Oa%lO't&}O'v%lO~O's]X!V]Xs]X!h]X&W]X![]X%f]X!d]X~P(qO!_'[O!`'TO!a'TO(Q!lO(RTO(UUO~Op'RO!P'QO!X'UO(a'PO!Z(eP!Z(tP~P@YOk'_O![']O(P%eO~Oe'dO!i%cO(P%eO~O}&QO!i&PO~Op!nO!P!oO!y;kO#Q!pO#R!pO#T!pO#U!pO(Q!lO(RTO(UUO(a!mO(k!sO~O!_'jO!`'iO!a'iO#S!pO#X'kO#Y'kO~PAtOa%lOh%VO!d#vO!i%cO'v%lO(n'mO~O!m'qO#]'oO~PCSOp!nO!P!oO(RTO(UUO(a!mO(k!sO~O![XOp(iX!P(iX!_(iX!`(iX!a(iX!y(iX#Q(iX#R(iX#S(iX#T(iX#U(iX#X(iX#Y(iX(Q(iX(R(iX(U(iX(a(iX(k(iX~O!`'iO!a'iO(Q!lO~PCrO'{'uO'|'uO'}'wO~O_!}O(R'yO(S!}O(T'yO~O_#QO(T'yO(U'yO(V#QO~Os'{O~P%[Ou#SO!R#TO(^#TO(_(OO~O!X(QO!V'SX!V'YX!Y'SX!Y'YX~P+}O!Y(SO!V(dX~OP$[OR#zO[$cOo$aO}#yO!P#{O!Y(SO!i#xO!m$[O#O$RO#k$OO#l$PO#m$PO#n$PO#o$QO#p$RO#q$RO#r$bO#s$RO#u$SO#w$UO#y$WO#z$XO(]VO(n$YO(u#|O(v#}O~O!V(dX~PGmO!V(XO~O!V(qX!Y(qX!d(qX!h(qX(n(qX~O#](qX#h#aX!Z(qX~PIpO#](YO!V(sX!Y(sX~O!Y(ZO!V(rX~O!V(^O~O#]$eO~PIpO!Z(_O~P`OR#zO}#yO!P#{O!i#xO(]VOP!ka[!kao!ka!Y!ka!m!ka#O!ka#k!ka#l!ka#m!ka#n!ka#o!ka#p!ka#q!ka#r!ka#s!ka#u!ka#w!ka#y!ka#z!ka(n!ka(u!ka(v!ka~Oa!ka'v!ka's!ka!V!ka!h!kas!ka![!ka%f!ka!d!ka~PKWO!h(`O~O!d#vO#](aO(n'mO!Y(pXa(pX'v(pX~O!h(pX~PMsO!P%fO![%gO!y]O#f(fO#g(eO(P%eO~O!Y(gO!h(oX~O!h(iO~O!P%fO![%gO#g(eO(P%eO~OP(cXR(cX[(cXo(cX}(cX!P(cX!Y(cX!i(cX!m(cX#O(cX#k(cX#l(cX#m(cX#n(cX#o(cX#p(cX#q(cX#r(cX#s(cX#u(cX#w(cX#y(cX#z(cX(](cX(n(cX(u(cX(v(cX~O!d#vO!h(cX~P! aOR(kO}(jO!i#xO#P$dO!y!xa!P!xa~O!u!xa%e!xa![!xa#f!xa#g!xa(P!xa~P!#bO!u(oO~OPYOQYOSfOd!jOe!iOmkOoYOpkOqkOwkOyYO{YO!PWO!TkO!UkO![XO!fuO!iZO!lYO!mYO!nYO!pvO!r!gO!u!hO$V!kO(P!dO(RTO(UUO(]VO(k[O(ziO~Oh%VOm%WOo%XOp$tOq$tOw%YOy%ZO{<XO!P${O![$|O!f=jO!i$xO#g<_O$V%_O$r<ZO$t<]O$w%`O(P(sO(RTO(UUO(]$uO(u$}O(v%PO~O#h(uO~O!X(wO!h(gP~P%[O(a(yO(k[O~O!P({O!i#xO(a(yO(k[O~OP;jOQ;jOSfOd=fOe!iOmkOo;jOpkOqkOwkOy;jO{;jO!PWO!TkO!UkO![!eO!f;mO!iZO!l;jO!m;jO!n;jO!p;nO!r;qO!u!hO$V!kO(P)YO(RTO(UUO(]VO(k[O(z=dO~O!Y$_Oa$oa'v$oa's$oa!h$oa!V$oa![$oa%f$oa!d$oa~O#t)aO~P!&fOh%VOm%WOo%XOp$tOq$tOw%YOy%ZO{%[O!P${O![$|O!f%aO!i$xO#g%bO$V%_O$r%]O$t%^O$w%`O(P(sO(RTO(UUO(]$uO(u$}O(v%PO~Og(lP~P!+oO})fO!d)eO![$]X$Y$]X$[$]X$^$]X$e$]X~O!d)eO![(wX$Y(wX$[(wX$^(wX$e(wX~O})fO~P!-xO})fO![(wX$Y(wX$[(wX$^(wX$e(wX~O![)hO$Y)lO$[)gO$^)gO$e)mO~O!X)pO~P!(vO$[$hO$^$gO$e)tO~Ok$xX}$xX#P$xX'u$xX(u$xX(v$xX~OgjXg$xXkjX!YjX#]jX~P!/nOu)vO(^)wO(_)yO~Ok*SO}){O'u)|O(u$}O(v%PO~Og)zO~P!0rOg*TO~Oh%VOm%WOo%XOp$tOq$tOw%YOy%ZO{<XO!P*VO![*WO!f=jO!i$xO#g<_O$V%_O$r<ZO$t<]O$w%`O(RTO(UUO(]$uO(u$}O(v%PO~O!X*ZO(P*UO!h({P~P!1aO#h*]O~O!i*^O~Oh%VOm%WOo%XOp$tOq$tOw%YOy%ZO{<XO!P${O![$|O!f=jO!i$xO#g<_O$V%_O$r<ZO$t<]O$w%`O(P*`O(RTO(UUO(]$uO(u$}O(v%PO~O!X*cO!V(|P~P!3`Oo*oOp!nO!P*eO!_*mO!`*gO!a*gO!i*^O#X*nO%]*iO(Q!lO(RTO(UUO(a!mO~O!Z*lO~P!5TO#P$dOk([X}([X'u([X(u([X(v([X!Y([X#]([X~Og([X#}([X~P!6VOk*tO#]*sOg(ZX!Y(ZX~O!Y*uOg(YX~O(P&WOg(YP~Op*xO~O!i*}O~O(P(sO~Om+RO!P%fO!X#iO![%gO!y]O#f#lO#g#iO(P%eO!h(oP~O!d#vO#h+SO~O!P%fO!X+UO!Y(ZO![%gO(P%eO!V(rP~Op'XO!P+WO!X+VO(RTO(UUO(a(yO~O!Z(tP~P!9VO!Y+XOa)QX'v)QX~OP$[OR#zO[$cOo$aO}#yO!P#{O!i#xO!m$[O#O$RO#k$OO#l$PO#m$PO#n$PO#o$QO#p$RO#q$RO#r$bO#s$RO#u$SO#w$UO#y$WO#z$XO(]VO(n$YO(u#|O(v#}O~Oa!ga!Y!ga'v!ga's!ga!V!ga!h!gas!ga![!ga%f!ga!d!ga~P!9}OR#zO}#yO!P#{O!i#xO(]VOP!oa[!oao!oa!Y!oa!m!oa#O!oa#k!oa#l!oa#m!oa#n!oa#o!oa#p!oa#q!oa#r!oa#s!oa#u!oa#w!oa#y!oa#z!oa(n!oa(u!oa(v!oa~Oa!oa'v!oa's!oa!V!oa!h!oas!oa![!oa%f!oa!d!oa~P!<eOR#zO}#yO!P#{O!i#xO(]VOP!qa[!qao!qa!Y!qa!m!qa#O!qa#k!qa#l!qa#m!qa#n!qa#o!qa#p!qa#q!qa#r!qa#s!qa#u!qa#w!qa#y!qa#z!qa(n!qa(u!qa(v!qa~Oa!qa'v!qa's!qa!V!qa!h!qas!qa![!qa%f!qa!d!qa~P!>{Oh%VOk+bO![']O%f+aO~O!d+dOa(XX![(XX'v(XX!Y(XX~Oa%lO![XO'v%lO~Oh%VO!i%cO~Oh%VO!i%cO(P%eO~O!d#vO#h(uO~Ob+oO%g+pO(P+lO(RTO(UUO!Z)UP~O!Y+qO`)TX~O[+uO~O`+vO~O![%}O(P%eO(Q!lO`)TP~Oh%VO#]+{O~Oh%VOk,OO![$|O~O![,QO~O},SO![XO~O%k%tO~O!u,XO~Oe,^O~Ob,_O(P#nO(RTO(UUO!Z)SP~Oe%{O~O%g!QO(P&WO~P=RO[,dO`,cO~OPYOQYOSfOdzOeyOmkOoYOpkOqkOwkOyYO{YO!PWO!TkO!UkO!fuO!iZO!lYO!mYO!nYO!pvO!uxO!y]O%e}O(RTO(UUO(]VO(k[O(ziO~O![!eO!r!gO$V!kO(P!dO~P!E{O`,cOa%lO'v%lO~OPYOQYOSfOd!jOe!iOmkOoYOpkOqkOwkOyYO{YO!PWO!TkO!UkO![!eO!fuO!iZO!lYO!mYO!nYO!pvO!u!hO$V!kO(P!dO(RTO(UUO(]VO(k[O(ziO~Oa,iO!rwO#t!OO%i!OO%j!OO%k!OO~P!HeO!i&lO~O&Y,oO~O![,qO~O&k,sO&m,tOP&haQ&haS&haY&haa&had&hae&ham&hao&hap&haq&haw&hay&ha{&ha!P&ha!T&ha!U&ha![&ha!f&ha!i&ha!l&ha!m&ha!n&ha!p&ha!r&ha!u&ha!y&ha#t&ha$V&ha%e&ha%g&ha%i&ha%j&ha%k&ha%n&ha%p&ha%s&ha%t&ha%v&ha&S&ha&Y&ha&[&ha&^&ha&`&ha&c&ha&i&ha&o&ha&q&ha&s&ha&u&ha&w&ha's&ha(P&ha(R&ha(U&ha(]&ha(k&ha(z&ha!Z&ha&a&hab&ha&f&ha~O(P,yO~Oh!bX!Y!OX!Z!OX!d!OX!d!bX!i!bX#]!OX~O!Y!bX!Z!bX~P# kO!d-OO#],}Oh(fX!Y#eX!Z#eX!d(fX!i(fX~O!Y(fX!Z(fX~P#!^Oh%VO!d-QO!i%cO!Y!^X!Z!^X~Op!nO!P!oO(RTO(UUO(a!mO~OP;jOQ;jOSfOd=fOe!iOmkOo;jOpkOqkOwkOy;jO{;jO!PWO!TkO!UkO![!eO!f;mO!iZO!l;jO!m;jO!n;jO!p;nO!r;qO!u!hO$V!kO(RTO(UUO(]VO(k[O(z=dO~O(P<fO~P##sO!Y-UO!Z(eX~O!Z-WO~O!d-OO#],}O!Y#eX!Z#eX~O!Y-XO!Z(tX~O!Z-ZO~O!`-[O!a-[O(Q!lO~P##bO!Z-_O~P'_Ok-bO![']O~O!V-gO~Op!xa!_!xa!`!xa!a!xa#Q!xa#R!xa#S!xa#T!xa#U!xa#X!xa#Y!xa(Q!xa(R!xa(U!xa(a!xa(k!xa~P!#bO!m-lO#]-jO~PCSO!`-nO!a-nO(Q!lO~PCrOa%lO#]-jO'v%lO~Oa%lO!d#vO#]-jO'v%lO~Oa%lO!d#vO!m-lO#]-jO'v%lO(n'mO~O'{'uO'|'uO'}-sO~Os-tO~O!V'Sa!Y'Sa~P!9}O!X-xO!V'SX!Y'SX~P%[O!Y(SO!V(da~O!V(da~PGmO!Y(ZO!V(ra~O!P%fO!X-|O![%gO(P%eO!V'YX!Y'YX~O#].OO!Y(pa!h(paa(pa'v(pa~O!d#vO~P#+yO!Y(gO!h(oa~O!P%fO![%gO#g.SO(P%eO~Om.XO!P%fO!X.UO![%gO!y]O#f.WO#g.UO(P%eO!Y']X!h']X~OR.]O!i#xO~Oh%VOk.`O![']O%f._O~Oa#`i!Y#`i'v#`i's#`i!V#`i!h#`is#`i![#`i%f#`i!d#`i~P!9}Ok=pO}){O'u)|O(u$}O(v%PO~O#h#[aa#[a#]#[a'v#[a!Y#[a!h#[a![#[a!V#[a~P#.uO#h([XP([XR([X[([Xa([Xo([X!P([X!i([X!m([X#O([X#k([X#l([X#m([X#n([X#o([X#p([X#q([X#r([X#s([X#u([X#w([X#y([X#z([X'v([X(]([X(n([X!h([X!V([X's([Xs([X![([X%f([X!d([X~P!6VO!Y.mO!h(gX~P!9}O!h.pO~O!V.rO~OP$[OR#zO}#yO!P#{O!i#xO!m$[O(]VO[#jia#jio#ji!Y#ji#O#ji#l#ji#m#ji#n#ji#o#ji#p#ji#q#ji#r#ji#s#ji#u#ji#w#ji#y#ji#z#ji'v#ji(n#ji(u#ji(v#ji's#ji!V#ji!h#jis#ji![#ji%f#ji!d#ji~O#k#ji~P#2eO#k$OO~P#2eOP$[OR#zOo$aO}#yO!P#{O!i#xO!m$[O#k$OO#l$PO#m$PO#n$PO(]VO[#jia#ji!Y#ji#O#ji#p#ji#q#ji#r#ji#s#ji#u#ji#w#ji#y#ji#z#ji'v#ji(n#ji(u#ji(v#ji's#ji!V#ji!h#jis#ji![#ji%f#ji!d#ji~O#o#ji~P#5SO#o$QO~P#5SOP$[OR#zO[$cOo$aO}#yO!P#{O!i#xO!m$[O#O$RO#k$OO#l$PO#m$PO#n$PO#o$QO#p$RO#q$RO#r$bO#s$RO(]VOa#ji!Y#ji#w#ji#y#ji#z#ji'v#ji(n#ji(u#ji(v#ji's#ji!V#ji!h#jis#ji![#ji%f#ji!d#ji~O#u#ji~P#7qOP$[OR#zO[$cOo$aO}#yO!P#{O!i#xO!m$[O#O$RO#k$OO#l$PO#m$PO#n$PO#o$QO#p$RO#q$RO#r$bO#s$RO#u$SO(]VO(v#}Oa#ji!Y#ji#y#ji#z#ji'v#ji(n#ji(u#ji's#ji!V#ji!h#jis#ji![#ji%f#ji!d#ji~O#w$UO~P#:XO#w#ji~P#:XO#u$SO~P#7qOP$[OR#zO[$cOo$aO}#yO!P#{O!i#xO!m$[O#O$RO#k$OO#l$PO#m$PO#n$PO#o$QO#p$RO#q$RO#r$bO#s$RO#u$SO#w$UO(]VO(u#|O(v#}Oa#ji!Y#ji#z#ji'v#ji(n#ji's#ji!V#ji!h#jis#ji![#ji%f#ji!d#ji~O#y#ji~P#<}O#y$WO~P#<}OP]XR]X[]Xo]X}]X!P]X!i]X!m]X#O]X#P]X#]]X#hfX#k]X#l]X#m]X#n]X#o]X#p]X#q]X#r]X#s]X#u]X#w]X#y]X#z]X$P]X(]]X(n]X(u]X(v]X!Y]X!Z]X~O#}]X~P#?lOP$[OR#zO[<ROo<PO}#yO!P#{O!i#xO!m$[O#O;vO#k;sO#l;tO#m;tO#n;tO#o;uO#p;vO#q;vO#r<QO#s;vO#u;wO#w;yO#y;{O#z;|O(]VO(n$YO(u#|O(v#}O~O#}.tO~P#AyO#P$dO#]<SO$P<SO#}(cX!Z(cX~P! aOa'`a!Y'`a'v'`a's'`a!h'`a!V'`as'`a!['`a%f'`a!d'`a~P!9}O[#jia#jio#ji!Y#ji#O#ji#o#ji#p#ji#q#ji#r#ji#s#ji#u#ji#w#ji#y#ji#z#ji'v#ji(n#ji's#ji!V#ji!h#jis#ji![#ji%f#ji!d#ji~OP$[OR#zO}#yO!P#{O!i#xO!m$[O#k$OO#l$PO#m$PO#n$PO(]VO(u#ji(v#ji~P#D{Ok=pO}){O'u)|O(u$}O(v%POP#jiR#ji!P#ji!i#ji!m#ji#k#ji#l#ji#m#ji#n#ji(]#ji~P#D{O!Y.xOg(lX~P!0rOg.zO~Oa$Oi!Y$Oi'v$Oi's$Oi!V$Oi!h$Ois$Oi![$Oi%f$Oi!d$Oi~P!9}O$[.{O$^.{O~O$[.|O$^.|O~O!d)eO#].}O![$bX$Y$bX$[$bX$^$bX$e$bX~O!X/OO~O![)hO$Y/QO$[)gO$^)gO$e/RO~O!Y;}O!Z(bX~P#AyO!Z/SO~O!d)eO$e(wX~O$e/UO~Os/VO~P!&fOu)vO(^)wO(_/YO~O!P/]O~O(u$}Ok%^a}%^a'u%^a(v%^a!Y%^a#]%^a~Og%^a#}%^a~P#K}O(v%POk%`a}%`a'u%`a(u%`a!Y%`a#]%`a~Og%`a#}%`a~P#LpO!YfX!dfX!hfX!h$xX(nfX~P!/nO!X/fO!Y(ZO(P/eO!V(rP!V(|P~P!1aOo*oO!_*mO!`*gO!a*gO!i*^O#X*nO%]*iO(Q!lO(RTO(UUO~Op<cO!P/gO!X+VO!Z*lO(a<bO!Z(tP~P#NZO!h/hO~P#.uO!Y/iO!d#vO(n'mO!h({X~O!h/nO~O!P%fO!X*ZO![%gO(P%eO!h({P~O#h/pO~O!V$xX!Y$xX!d%PX~P!/nO!Y/qO!V(|X~P#.uO!d/sO~O!V/uO~OmkO(P/vO~P.iOh%VOo/{O!d#vO!i%cO(n'mO~O!d+dO~Oa%lO!Y0PO'v%lO~O!Z0RO~P!5TO!`0SO!a0SO(Q!lO~P##bOp!nO!P0TO(RTO(UUO(a!mO~O#X0VO~Og%^a!Y%^a#]%^a#}%^a~P!0rOg%`a!Y%`a#]%`a#}%`a~P!0rO(P&WOg'iX!Y'iX~O!Y*uOg(Ya~Og0`O~OR0aO}0aO!P0bO#P$dOkza'uza(uza(vza!Yza#]za~Ogza#}za~P$&ZO}){O'u)|Ok$qa(u$qa(v$qa!Y$qa#]$qa~Og$qa#}$qa~P$'VO}){O'u)|Ok$sa(u$sa(v$sa!Y$sa#]$sa~Og$sa#}$sa~P$'xO#h0eO~Og%Ra!Y%Ra#]%Ra#}%Ra~P!0rO!d#vO~O#h0hO~O!Y+XOa)Qa'v)Qa~OR#zO}#yO!P#{O!i#xO(]VOP!oi[!oio!oi!Y!oi!m!oi#O!oi#k!oi#l!oi#m!oi#n!oi#o!oi#p!oi#q!oi#r!oi#s!oi#u!oi#w!oi#y!oi#z!oi(n!oi(u!oi(v!oi~Oa!oi'v!oi's!oi!V!oi!h!ois!oi![!oi%f!oi!d!oi~P$)gOh%VOo%XOp$tOq$tOw%YOy%ZO{<XO!P${O![$|O!f=jO!i$xO#g<_O$V%_O$r<ZO$t<]O$w%`O(RTO(UUO(]$uO(u$}O(v%PO~Om0qO(P0pO~P$+}O!d+dOa(Xa![(Xa'v(Xa!Y(Xa~O#h0wO~O[]X!YfX!ZfX~O!Y0xO!Z)UX~O!Z0zO~O[0{O~Ob0}O(P+lO(RTO(UUO~O![%}O(P%eO`'qX!Y'qX~O!Y+qO`)Ta~O!h1QO~P!9}O[1TO~O`1UO~O#]1XO~Ok1[O![$|O~O(a(yO!Z)RP~Oh%VOk1eO![1bO%f1dO~O[1oO!Y1mO!Z)SX~O!Z1pO~O`1rOa%lO'v%lO~O(P#nO(RTO(UUO~O#P$dO#]$eO$P$eOP(cXR(cX[(cXo(cX}(cX!P(cX!Y(cX!i(cX!m(cX#O(cX#k(cX#l(cX#m(cX#n(cX#o(cX#p(cX#q(cX#r(cX#u(cX#w(cX#y(cX#z(cX(](cX(n(cX(u(cX(v(cX~O#s1uO&W1vOa(cX~P$1eO#]$eO#s1uO&W1vO~Oa1xO~P%[Oa1zO~O&a1}OP&_iQ&_iS&_iY&_ia&_id&_ie&_im&_io&_ip&_iq&_iw&_iy&_i{&_i!P&_i!T&_i!U&_i![&_i!f&_i!i&_i!l&_i!m&_i!n&_i!p&_i!r&_i!u&_i!y&_i#t&_i$V&_i%e&_i%g&_i%i&_i%j&_i%k&_i%n&_i%p&_i%s&_i%t&_i%v&_i&S&_i&Y&_i&[&_i&^&_i&`&_i&c&_i&i&_i&o&_i&q&_i&s&_i&u&_i&w&_i's&_i(P&_i(R&_i(U&_i(]&_i(k&_i(z&_i!Z&_ib&_i&f&_i~Ob2TO!Z2RO&f2SO~P`O![XO!i2VO~O&m,tOP&hiQ&hiS&hiY&hia&hid&hie&him&hio&hip&hiq&hiw&hiy&hi{&hi!P&hi!T&hi!U&hi![&hi!f&hi!i&hi!l&hi!m&hi!n&hi!p&hi!r&hi!u&hi!y&hi#t&hi$V&hi%e&hi%g&hi%i&hi%j&hi%k&hi%n&hi%p&hi%s&hi%t&hi%v&hi&S&hi&Y&hi&[&hi&^&hi&`&hi&c&hi&i&hi&o&hi&q&hi&s&hi&u&hi&w&hi's&hi(P&hi(R&hi(U&hi(]&hi(k&hi(z&hi!Z&hi&a&hib&hi&f&hi~O!V2]O~O!Y!^a!Z!^a~P#AyOp!nO!P!oO!X2cO(a!mO!Y'TX!Z'TX~P@YO!Y-UO!Z(ea~O!Y'ZX!Z'ZX~P!9VO!Y-XO!Z(ta~O!Z2jO~P'_Oa%lO#]2sO'v%lO~Oa%lO!d#vO#]2sO'v%lO~Oa%lO!d#vO!m2wO#]2sO'v%lO(n'mO~Oa%lO'v%lO~P!9}O!Y$_Os$oa~O!V'Si!Y'Si~P!9}O!Y(SO!V(di~O!Y(ZO!V(ri~O!V(si!Y(si~P!9}O!Y(pi!h(pia(pi'v(pi~P!9}O#]2yO!Y(pi!h(pia(pi'v(pi~O!Y(gO!h(oi~O!P%fO![%gO!y]O#f3OO#g2}O(P%eO~O!P%fO![%gO#g2}O(P%eO~Ok3VO![']O%f3UO~Oh%VOk3VO![']O%f3UO~O#h%^aP%^aR%^a[%^aa%^ao%^a!P%^a!i%^a!m%^a#O%^a#k%^a#l%^a#m%^a#n%^a#o%^a#p%^a#q%^a#r%^a#s%^a#u%^a#w%^a#y%^a#z%^a'v%^a(]%^a(n%^a!h%^a!V%^a's%^as%^a![%^a%f%^a!d%^a~P#K}O#h%`aP%`aR%`a[%`aa%`ao%`a!P%`a!i%`a!m%`a#O%`a#k%`a#l%`a#m%`a#n%`a#o%`a#p%`a#q%`a#r%`a#s%`a#u%`a#w%`a#y%`a#z%`a'v%`a(]%`a(n%`a!h%`a!V%`a's%`as%`a![%`a%f%`a!d%`a~P#LpO#h%^aP%^aR%^a[%^aa%^ao%^a!P%^a!Y%^a!i%^a!m%^a#O%^a#k%^a#l%^a#m%^a#n%^a#o%^a#p%^a#q%^a#r%^a#s%^a#u%^a#w%^a#y%^a#z%^a'v%^a(]%^a(n%^a!h%^a!V%^a's%^a#]%^as%^a![%^a%f%^a!d%^a~P#.uO#h%`aP%`aR%`a[%`aa%`ao%`a!P%`a!Y%`a!i%`a!m%`a#O%`a#k%`a#l%`a#m%`a#n%`a#o%`a#p%`a#q%`a#r%`a#s%`a#u%`a#w%`a#y%`a#z%`a'v%`a(]%`a(n%`a!h%`a!V%`a's%`a#]%`as%`a![%`a%f%`a!d%`a~P#.uO#hzaPza[zaazaoza!iza!mza#Oza#kza#lza#mza#nza#oza#pza#qza#rza#sza#uza#wza#yza#zza'vza(]za(nza!hza!Vza'szasza![za%fza!dza~P$&ZO#h$qaP$qaR$qa[$qaa$qao$qa!P$qa!i$qa!m$qa#O$qa#k$qa#l$qa#m$qa#n$qa#o$qa#p$qa#q$qa#r$qa#s$qa#u$qa#w$qa#y$qa#z$qa'v$qa(]$qa(n$qa!h$qa!V$qa's$qas$qa![$qa%f$qa!d$qa~P$'VO#h$saP$saR$sa[$saa$sao$sa!P$sa!i$sa!m$sa#O$sa#k$sa#l$sa#m$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#u$sa#w$sa#y$sa#z$sa'v$sa(]$sa(n$sa!h$sa!V$sa's$sas$sa![$sa%f$sa!d$sa~P$'xO#h%RaP%RaR%Ra[%Raa%Rao%Ra!P%Ra!Y%Ra!i%Ra!m%Ra#O%Ra#k%Ra#l%Ra#m%Ra#n%Ra#o%Ra#p%Ra#q%Ra#r%Ra#s%Ra#u%Ra#w%Ra#y%Ra#z%Ra'v%Ra(]%Ra(n%Ra!h%Ra!V%Ra's%Ra#]%Ras%Ra![%Ra%f%Ra!d%Ra~P#.uOa#`q!Y#`q'v#`q's#`q!V#`q!h#`qs#`q![#`q%f#`q!d#`q~P!9}O!X3_O!Y'UX!h'UX~P%[O!Y.mO!h(ga~O!Y.mO!h(ga~P!9}O!V3bO~O#}!ka!Z!ka~PKWO#}!ga!Y!ga!Z!ga~P#AyO#}!oa!Z!oa~P!<eO#}!qa!Z!qa~P!>{Og'XX!Y'XX~P!+oO!Y.xOg(la~OSfO![3vO$c3wO~O!Z3{O~Os3|O~P#.uOa$lq!Y$lq'v$lq's$lq!V$lq!h$lqs$lq![$lq%f$lq!d$lq~P!9}O!V4OO~P!&fO!P4PO~O}){O'u)|O(v%POk'ea(u'ea!Y'ea#]'ea~Og'ea#}'ea~P%+ZO}){O'u)|Ok'ga(u'ga(v'ga!Y'ga#]'ga~Og'ga#}'ga~P%+|O(n$YO~P#.uO!VfX!V$xX!YfX!Y$xX!d%PX#]fX~P!/nO(P<lO~P!1aO!P%fO!X4SO![%gO(P%eO!Y'aX!h'aX~O!Y/iO!h({a~O!Y/iO!d#vO!h({a~O!Y/iO!d#vO(n'mO!h({a~Og$zi!Y$zi#]$zi#}$zi~P!0rO!X4[O!V'cX!Y'cX~P!3`O!Y/qO!V(|a~O!Y/qO!V(|a~P#.uOP]XR]X[]Xo]X}]X!P]X!V]X!Y]X!i]X!m]X#O]X#P]X#]]X#hfX#k]X#l]X#m]X#n]X#o]X#p]X#q]X#r]X#s]X#u]X#w]X#y]X#z]X$P]X(]]X(n]X(u]X(v]X~O!d%WX#s%WX~P%/mO!d#vO#s4aO~Oh%VO!d#vO!i%cO~Oh%VOo4fO!i%cO(n'mO~Oo4kO!d#vO(n'mO~Op!nO!P4lO(RTO(UUO(a!mO~O(u$}Ok%^i}%^i'u%^i(v%^i!Y%^i#]%^i~Og%^i#}%^i~P%3^O(v%POk%`i}%`i'u%`i(u%`i!Y%`i#]%`i~Og%`i#}%`i~P%4POg(Zi!Y(Zi~P!0rO#]4rOg(Zi!Y(Zi~P!0rO!h4uO~Oa$mq!Y$mq'v$mq's$mq!V$mq!h$mqs$mq![$mq%f$mq!d$mq~P!9}O!V4yO~O!Y4zO![(}X~P#.uOa$xX![$xX%Z]X'v$xX!Y$xX~P!/nO%Z4}OalXklX}lX![lX'ulX'vlX(ulX(vlX!YlX~O%Z4}O~Ob5TO%g5UO(P+lO(RTO(UUO!Y'pX!Z'pX~O!Y0xO!Z)Ua~O[5YO~O`5ZO~Oa%lO'v%lO~P#.uO!Y5cO#]5eO!Z)RX~O!Z5fO~Oo5lOp!nO!P*eO!_!yO!`!vO!a!vO!y;kO#Q!pO#R!pO#S!pO#T!pO#U!pO#X5kO#Y!zO(Q!lO(RTO(UUO(a!mO(k!sO~O!Z5jO~P%9SOk5qO![1bO%f5pO~Oh%VOk5qO![1bO%f5pO~Ob5xO(P#nO(RTO(UUO!Y'oX!Z'oX~O!Y1mO!Z)Sa~O(RTO(UUO(a5zO~O`6OO~O#s6RO&W6SO~PMsO!h6TO~P%[Oa6VO~Oa6VO~P%[Ob2TO!Z6[O&f2SO~P`O!d6^O~O!d6`Oh(fi!Y(fi!Z(fi!d(fi!i(fio(fi(n(fi~O!Y#ei!Z#ei~P#AyO#]6aO!Y#ei!Z#ei~O!Y!^i!Z!^i~P#AyOa%lO#]6jO'v%lO~Oa%lO!d#vO#]6jO'v%lO~O!Y(pq!h(pqa(pq'v(pq~P!9}O!Y(gO!h(oq~O!P%fO![%gO#g6qO(P%eO~O![']O%f6tO~Ok6xO![']O%f6tO~O#h'eaP'eaR'ea['eaa'eao'ea!P'ea!i'ea!m'ea#O'ea#k'ea#l'ea#m'ea#n'ea#o'ea#p'ea#q'ea#r'ea#s'ea#u'ea#w'ea#y'ea#z'ea'v'ea(]'ea(n'ea!h'ea!V'ea's'eas'ea!['ea%f'ea!d'ea~P%+ZO#h'gaP'gaR'ga['gaa'gao'ga!P'ga!i'ga!m'ga#O'ga#k'ga#l'ga#m'ga#n'ga#o'ga#p'ga#q'ga#r'ga#s'ga#u'ga#w'ga#y'ga#z'ga'v'ga(]'ga(n'ga!h'ga!V'ga's'gas'ga!['ga%f'ga!d'ga~P%+|O#h$ziP$ziR$zi[$zia$zio$zi!P$zi!Y$zi!i$zi!m$zi#O$zi#k$zi#l$zi#m$zi#n$zi#o$zi#p$zi#q$zi#r$zi#s$zi#u$zi#w$zi#y$zi#z$zi'v$zi(]$zi(n$zi!h$zi!V$zi's$zi#]$zis$zi![$zi%f$zi!d$zi~P#.uO#h%^iP%^iR%^i[%^ia%^io%^i!P%^i!i%^i!m%^i#O%^i#k%^i#l%^i#m%^i#n%^i#o%^i#p%^i#q%^i#r%^i#s%^i#u%^i#w%^i#y%^i#z%^i'v%^i(]%^i(n%^i!h%^i!V%^i's%^is%^i![%^i%f%^i!d%^i~P%3^O#h%`iP%`iR%`i[%`ia%`io%`i!P%`i!i%`i!m%`i#O%`i#k%`i#l%`i#m%`i#n%`i#o%`i#p%`i#q%`i#r%`i#s%`i#u%`i#w%`i#y%`i#z%`i'v%`i(]%`i(n%`i!h%`i!V%`i's%`is%`i![%`i%f%`i!d%`i~P%4PO!Y'Ua!h'Ua~P!9}O!Y.mO!h(gi~O#}#`i!Y#`i!Z#`i~P#AyOP$[OR#zO}#yO!P#{O!i#xO!m$[O(]VO[#jio#ji#O#ji#l#ji#m#ji#n#ji#o#ji#p#ji#q#ji#r#ji#s#ji#u#ji#w#ji#y#ji#z#ji#}#ji(n#ji(u#ji(v#ji!Y#ji!Z#ji~O#k#ji~P%LRO#k;sO~P%LROP$[OR#zOo<PO}#yO!P#{O!i#xO!m$[O#k;sO#l;tO#m;tO#n;tO(]VO[#ji#O#ji#p#ji#q#ji#r#ji#s#ji#u#ji#w#ji#y#ji#z#ji#}#ji(n#ji(u#ji(v#ji!Y#ji!Z#ji~O#o#ji~P%NZO#o;uO~P%NZOP$[OR#zO[<ROo<PO}#yO!P#{O!i#xO!m$[O#O;vO#k;sO#l;tO#m;tO#n;tO#o;uO#p;vO#q;vO#r<QO#s;vO(]VO#w#ji#y#ji#z#ji#}#ji(n#ji(u#ji(v#ji!Y#ji!Z#ji~O#u#ji~P&!cOP$[OR#zO[<ROo<PO}#yO!P#{O!i#xO!m$[O#O;vO#k;sO#l;tO#m;tO#n;tO#o;uO#p;vO#q;vO#r<QO#s;vO#u;wO(]VO(v#}O#y#ji#z#ji#}#ji(n#ji(u#ji!Y#ji!Z#ji~O#w;yO~P&$dO#w#ji~P&$dO#u;wO~P&!cOP$[OR#zO[<ROo<PO}#yO!P#{O!i#xO!m$[O#O;vO#k;sO#l;tO#m;tO#n;tO#o;uO#p;vO#q;vO#r<QO#s;vO#u;wO#w;yO(]VO(u#|O(v#}O#z#ji#}#ji(n#ji!Y#ji!Z#ji~O#y#ji~P&&sO#y;{O~P&&sOa#{y!Y#{y'v#{y's#{y!V#{y!h#{ys#{y![#{y%f#{y!d#{y~P!9}O[#jio#ji#O#ji#o#ji#p#ji#q#ji#r#ji#s#ji#u#ji#w#ji#y#ji#z#ji#}#ji(n#ji!Y#ji!Z#ji~OP$[OR#zO}#yO!P#{O!i#xO!m$[O#k;sO#l;tO#m;tO#n;tO(]VO(u#ji(v#ji~P&)oOk=qO}){O'u)|O(u$}O(v%POP#jiR#ji!P#ji!i#ji!m#ji#k#ji#l#ji#m#ji#n#ji(]#ji~P&)oO#P$dOP([XR([X[([Xk([Xo([X}([X!P([X!i([X!m([X#O([X#k([X#l([X#m([X#n([X#o([X#p([X#q([X#r([X#s([X#u([X#w([X#y([X#z([X#}([X'u([X(]([X(n([X(u([X(v([X!Y([X!Z([X~O#}$Oi!Y$Oi!Z$Oi~P#AyO#}!oi!Z!oi~P$)gOg'Xa!Y'Xa~P!0rO!Z7[O~O!Y'`a!Z'`a~P#AyO!V7]O~P#.uO!d#vO(n'mO!Y'aa!h'aa~O!Y/iO!h({i~O!Y/iO!d#vO!h({i~Og$zq!Y$zq#]$zq#}$zq~P!0rO!V'ca!Y'ca~P#.uO!d7dO~O!Y/qO!V(|i~P#.uO!Y/qO!V(|i~O!V7gO~Oh%VOo7lO!i%cO(n'mO~O!d#vO#s7nO~Oo7qO!d#vO(n'mO~O}){O'u)|O(v%POk'fa(u'fa!Y'fa#]'fa~Og'fa#}'fa~P&2pO}){O'u)|Ok'ha(u'ha(v'ha!Y'ha#]'ha~Og'ha#}'ha~P&3cO!V7sO~Og$|q!Y$|q#]$|q#}$|q~P!0rOa$my!Y$my'v$my's$my!V$my!h$mys$my![$my%f$my!d$my~P!9}O!d6`O~O!Y4zO![(}a~O![']OP$SaR$Sa[$Sao$Sa}$Sa!P$Sa!Y$Sa!i$Sa!m$Sa#O$Sa#k$Sa#l$Sa#m$Sa#n$Sa#o$Sa#p$Sa#q$Sa#r$Sa#s$Sa#u$Sa#w$Sa#y$Sa#z$Sa(]$Sa(n$Sa(u$Sa(v$Sa~O%f6tO~P&5lOa#`y!Y#`y'v#`y's#`y!V#`y!h#`ys#`y![#`y%f#`y!d#`y~P!9}O[7xO~Ob7zO(P+lO(RTO(UUO~O!Y0xO!Z)Ui~O`8OO~O(a(yO!Y'lX!Z'lX~O!Y5cO!Z)Ra~O!Z8XO~P%9SO(k!sO~P$$iO#X8YO~O![1bO~O![1bO%f8[O~Ok8_O![1bO%f8[O~O[8dO!Y'oa!Z'oa~O!Y1mO!Z)Si~O!h8hO~O!h8iO~O!h8lO~O!h8lO~P%[Oa8nO~O!d8oO~O!h8pO~O!Y(si!Z(si~P#AyOa%lO#]8xO'v%lO~O!Y(py!h(pya(py'v(py~P!9}O!Y(gO!h(oy~O%f8{O~P&5lO![']O%f8{O~O#h$zqP$zqR$zq[$zqa$zqo$zq!P$zq!Y$zq!i$zq!m$zq#O$zq#k$zq#l$zq#m$zq#n$zq#o$zq#p$zq#q$zq#r$zq#s$zq#u$zq#w$zq#y$zq#z$zq'v$zq(]$zq(n$zq!h$zq!V$zq's$zq#]$zqs$zq![$zq%f$zq!d$zq~P#.uO#h'faP'faR'fa['faa'fao'fa!P'fa!i'fa!m'fa#O'fa#k'fa#l'fa#m'fa#n'fa#o'fa#p'fa#q'fa#r'fa#s'fa#u'fa#w'fa#y'fa#z'fa'v'fa(]'fa(n'fa!h'fa!V'fa's'fas'fa!['fa%f'fa!d'fa~P&2pO#h'haP'haR'ha['haa'hao'ha!P'ha!i'ha!m'ha#O'ha#k'ha#l'ha#m'ha#n'ha#o'ha#p'ha#q'ha#r'ha#s'ha#u'ha#w'ha#y'ha#z'ha'v'ha(]'ha(n'ha!h'ha!V'ha's'has'ha!['ha%f'ha!d'ha~P&3cO#h$|qP$|qR$|q[$|qa$|qo$|q!P$|q!Y$|q!i$|q!m$|q#O$|q#k$|q#l$|q#m$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#u$|q#w$|q#y$|q#z$|q'v$|q(]$|q(n$|q!h$|q!V$|q's$|q#]$|qs$|q![$|q%f$|q!d$|q~P#.uO!Y'Ui!h'Ui~P!9}O#}#`q!Y#`q!Z#`q~P#AyO(u$}OP%^aR%^a[%^ao%^a!P%^a!i%^a!m%^a#O%^a#k%^a#l%^a#m%^a#n%^a#o%^a#p%^a#q%^a#r%^a#s%^a#u%^a#w%^a#y%^a#z%^a#}%^a(]%^a(n%^a!Y%^a!Z%^a~Ok%^a}%^a'u%^a(v%^a~P&FnO(v%POP%`aR%`a[%`ao%`a!P%`a!i%`a!m%`a#O%`a#k%`a#l%`a#m%`a#n%`a#o%`a#p%`a#q%`a#r%`a#s%`a#u%`a#w%`a#y%`a#z%`a#}%`a(]%`a(n%`a!Y%`a!Z%`a~Ok%`a}%`a'u%`a(u%`a~P&HuOk=qO}){O'u)|O(v%PO~P&FnOk=qO}){O'u)|O(u$}O~P&HuOR0aO}0aO!P0bO#P$dOPza[zakzaoza!iza!mza#Oza#kza#lza#mza#nza#oza#pza#qza#rza#sza#uza#wza#yza#zza#}za'uza(]za(nza(uza(vza!Yza!Zza~O}){O'u)|OP$qaR$qa[$qak$qao$qa!P$qa!i$qa!m$qa#O$qa#k$qa#l$qa#m$qa#n$qa#o$qa#p$qa#q$qa#r$qa#s$qa#u$qa#w$qa#y$qa#z$qa#}$qa(]$qa(n$qa(u$qa(v$qa!Y$qa!Z$qa~O}){O'u)|OP$saR$sa[$sak$sao$sa!P$sa!i$sa!m$sa#O$sa#k$sa#l$sa#m$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#u$sa#w$sa#y$sa#z$sa#}$sa(]$sa(n$sa(u$sa(v$sa!Y$sa!Z$sa~Ok=qO}){O'u)|O(u$}O(v%PO~OP%RaR%Ra[%Rao%Ra!P%Ra!i%Ra!m%Ra#O%Ra#k%Ra#l%Ra#m%Ra#n%Ra#o%Ra#p%Ra#q%Ra#r%Ra#s%Ra#u%Ra#w%Ra#y%Ra#z%Ra#}%Ra(]%Ra(n%Ra!Y%Ra!Z%Ra~P'#zO#}$lq!Y$lq!Z$lq~P#AyO#}$mq!Y$mq!Z$mq~P#AyO!Z9YO~O#}9ZO~P!0rO!d#vO!Y'ai!h'ai~O!d#vO(n'mO!Y'ai!h'ai~O!Y/iO!h({q~O!V'ci!Y'ci~P#.uO!Y/qO!V(|q~Oo9bO!d#vO(n'mO~O[9dO!V9cO~P#.uO!V9cO~O!d#vO#s9jO~Og(Zy!Y(Zy~P!0rO!Y'ja!['ja~P#.uOa%Yq![%Yq'v%Yq!Y%Yq~P#.uO[9mO~O!Y0xO!Z)Uq~O#]9qO!Y'la!Z'la~O!Y5cO!Z)Ri~P#AyO!P9sO~O![1bO%f9vO~O(RTO(UUO(a9{O~O!Y1mO!Z)Sq~O!h:OO~O!h:PO~O!h:QO~O!h:QO~P%[O#]:TO!Y#ey!Z#ey~O!Y#ey!Z#ey~P#AyO%f:YO~P&5lO![']O%f:YO~O#}#{y!Y#{y!Z#{y~P#AyOP$ziR$zi[$zio$zi!P$zi!i$zi!m$zi#O$zi#k$zi#l$zi#m$zi#n$zi#o$zi#p$zi#q$zi#r$zi#s$zi#u$zi#w$zi#y$zi#z$zi#}$zi(]$zi(n$zi!Y$zi!Z$zi~P'#zO}){O'u)|O(v%POP'eaR'ea['eak'eao'ea!P'ea!i'ea!m'ea#O'ea#k'ea#l'ea#m'ea#n'ea#o'ea#p'ea#q'ea#r'ea#s'ea#u'ea#w'ea#y'ea#z'ea#}'ea(]'ea(n'ea(u'ea!Y'ea!Z'ea~O}){O'u)|OP'gaR'ga['gak'gao'ga!P'ga!i'ga!m'ga#O'ga#k'ga#l'ga#m'ga#n'ga#o'ga#p'ga#q'ga#r'ga#s'ga#u'ga#w'ga#y'ga#z'ga#}'ga(]'ga(n'ga(u'ga(v'ga!Y'ga!Z'ga~O(u$}OP%^iR%^i[%^ik%^io%^i}%^i!P%^i!i%^i!m%^i#O%^i#k%^i#l%^i#m%^i#n%^i#o%^i#p%^i#q%^i#r%^i#s%^i#u%^i#w%^i#y%^i#z%^i#}%^i'u%^i(]%^i(n%^i(v%^i!Y%^i!Z%^i~O(v%POP%`iR%`i[%`ik%`io%`i}%`i!P%`i!i%`i!m%`i#O%`i#k%`i#l%`i#m%`i#n%`i#o%`i#p%`i#q%`i#r%`i#s%`i#u%`i#w%`i#y%`i#z%`i#}%`i'u%`i(]%`i(n%`i(u%`i!Y%`i!Z%`i~O#}$my!Y$my!Z$my~P#AyO#}#`y!Y#`y!Z#`y~P#AyO!d#vO!Y'aq!h'aq~O!Y/iO!h({y~O!V'cq!Y'cq~P#.uOo:dO!d#vO(n'mO~O[:hO!V:gO~P#.uO!V:gO~O!Y0xO!Z)Uy~O!Y5cO!Z)Rq~O(P:nO~O![1bO%f:qO~O!h:tO~O%f:yO~P&5lOP$zqR$zq[$zqo$zq!P$zq!i$zq!m$zq#O$zq#k$zq#l$zq#m$zq#n$zq#o$zq#p$zq#q$zq#r$zq#s$zq#u$zq#w$zq#y$zq#z$zq#}$zq(]$zq(n$zq!Y$zq!Z$zq~P'#zO}){O'u)|O(v%POP'faR'fa['fak'fao'fa!P'fa!i'fa!m'fa#O'fa#k'fa#l'fa#m'fa#n'fa#o'fa#p'fa#q'fa#r'fa#s'fa#u'fa#w'fa#y'fa#z'fa#}'fa(]'fa(n'fa(u'fa!Y'fa!Z'fa~O}){O'u)|OP'haR'ha['hak'hao'ha!P'ha!i'ha!m'ha#O'ha#k'ha#l'ha#m'ha#n'ha#o'ha#p'ha#q'ha#r'ha#s'ha#u'ha#w'ha#y'ha#z'ha#}'ha(]'ha(n'ha(u'ha(v'ha!Y'ha!Z'ha~OP$|qR$|q[$|qo$|q!P$|q!i$|q!m$|q#O$|q#k$|q#l$|q#m$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#u$|q#w$|q#y$|q#z$|q#}$|q(]$|q(n$|q!Y$|q!Z$|q~P'#zOg%b!Z!Y%b!Z#]%b!Z#}%b!Z~P!0rO!V:}O~P#.uOo;OO!d#vO(n'mO~O[;QO!V:}O~P#.uO!Y'lq!Z'lq~P#AyO!Y#e!Z!Z#e!Z~P#AyO#h%b!ZP%b!ZR%b!Z[%b!Za%b!Zo%b!Z!P%b!Z!Y%b!Z!i%b!Z!m%b!Z#O%b!Z#k%b!Z#l%b!Z#m%b!Z#n%b!Z#o%b!Z#p%b!Z#q%b!Z#r%b!Z#s%b!Z#u%b!Z#w%b!Z#y%b!Z#z%b!Z'v%b!Z(]%b!Z(n%b!Z!h%b!Z!V%b!Z's%b!Z#]%b!Zs%b!Z![%b!Z%f%b!Z!d%b!Z~P#.uOo;YO!d#vO(n'mO~O!V;ZO~P#.uOo;bO!d#vO(n'mO~O!V;cO~P#.uOP%b!ZR%b!Z[%b!Zo%b!Z!P%b!Z!i%b!Z!m%b!Z#O%b!Z#k%b!Z#l%b!Z#m%b!Z#n%b!Z#o%b!Z#p%b!Z#q%b!Z#r%b!Z#s%b!Z#u%b!Z#w%b!Z#y%b!Z#z%b!Z#}%b!Z(]%b!Z(n%b!Z!Y%b!Z!Z%b!Z~P'#zOo;fO!d#vO(n'mO~Os(bX~P1qO}%pO~P!(vO(Q!lO~P!(vO!VfX!YfX#]fX~P%/mOP]XR]X[]Xo]X}]X!P]X!Y]X!YfX!i]X!m]X#O]X#P]X#]]X#]fX#hfX#k]X#l]X#m]X#n]X#o]X#p]X#q]X#r]X#s]X#u]X#w]X#y]X#z]X$P]X(]]X(n]X(u]X(v]X~O!dfX!h]X!hfX(nfX~P'HXOP;jOQ;jOSfOd=fOe!iOmkOo;jOpkOqkOwkOy;jO{;jO!PWO!TkO!UkO![XO!f;mO!iZO!l;jO!m;jO!n;jO!p;nO!r;qO!u!hO$V!kO(P)YO(RTO(UUO(]VO(k[O(z=dO~O!Y;}O!Z$oa~Oh%VOm%WOo%XOp$tOq$tOw%YOy%ZO{<YO!P${O![$|O!f=kO!i$xO#g<`O$V%_O$r<[O$t<^O$w%`O(P(sO(RTO(UUO(]$uO(u$}O(v%PO~O#t)aO~P'L}Oo!bX(n!bX~P# kOo(fX(n(fX~P#!^O!Z]X!ZfX~P'HXO!VfX!V$xX!YfX!Y$xX#]fX~P!/nO#h;rO~O!d#vO#h;rO~O#]<SO~O#s;vO~O#]<dO!Y(sX!Z(sX~O#]<SO!Y(qX!Z(qX~O#h<eO~Og<gO~P!0rO#h<mO~O#h<nO~O!d#vO#h<oO~O!d#vO#h<eO~O#}<pO~P#AyO#h<qO~O#h<rO~O#h<wO~O#h<xO~O#h<yO~O#h<zO~O#}<{O~P!0rO#}<|O~P!0rO#P#Q#R#T#U#X#f#g#r(z$r$t$w%Z%e%f%g%n%p%s%t%v%x~'zT#l!U'x(Q#mp#k#no}'y$['y(P$^(a~",
  goto: "$6w)YPPPPPP)ZPP)^P)oP+P/RPPPP6XPP6oPP<g@VP@jP@jPPP@jPBnP@jP@jP@jPBrPBwPCfPH`PPPHdPPPPHdKgPPPKmL_PHdPHdPPNmHdPPPHdPHdP!!tHdP!&[!'a!'jP!(^!(b!(^!+oPPPPPPP!,`!'aPP!,p!.bP!1nHdHd!1s!5P!9m!9m!=lPPP!=tHdPPPPPPPPPPP!ATP!BbPPHd!CsPHdPHdHdHdHdHdPHd!EVP!HaP!KgP!Kk!Ku!Ky!KyP!H^P!K}!K}P# TP# XHdHd# _#$dBr@jP@jP@j@jP#%q@j@j#(P@j#*s@j#,{@j@j#-k#/{#/{#0Q#0Z#/{#0fP#/{P@j#1O@j#4u@j@j6XPPP#8rPPP#9]#9]P#9]P#9s#9]PP#9yP#9pP#9p#:^#9p#:x#;O#;R)^#;U)^P#;]#;]#;]P)^P)^P)^P)^PP)^P#;c#;fP#;f)^P#;jP#;mP)^P)^P)^P)^P)^P)^)^PP#;s#;y#<U#<[#<b#<h#<n#<|#=S#=^#=d#=n#=t#>U#>[#>|#?`#?f#?l#?z#@a#BQ#B`#Bg#C}#D]#Ey#FX#F_#Fe#Fk#Fu#F{#GR#G]#Go#GuPPPPPPPPPPP#G{PPPPPPP#Hp#Kw#Ma#Mh#MpPPP$%OP$%X$(Q$.k$.n$.q$/p$/s$/z$0SP$0Y$0]P$0y$0}$1u$3T$3Y$3pPP$3u$3{$4PP$4S$4W$4[$5W$5o$6W$6[$6_$6b$6h$6k$6o$6sR!|RoqOXst!Z#d%k&o&q&r&t,l,q1}2QY!vQ']-^1b5iQ%rvQ%zyQ&R|Q&g!VS'T!e-UQ'c!iS'i!r!yU*g$|*W*kQ+j%{Q+w&TQ,]&aQ-['[Q-f'dQ-n'jQ0S*mQ1l,^R<a;n%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%k%r&P&h&k&o&q&r&t&x'Q'_'o(Q(S(Y(a(u(w({)z*e+S+W,i,l,q-b-j-x.O.m.t/g0T0b0h0w1e1u1v1x1z1}2Q2S2s2y3_4l5q6R6S6V6j8_8n8xS#q];k!r)[$Z$n'U)p,}-Q/O2c3v5e6a9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=gU*z%[<X<YQ+o%}Q,_&dQ,f&lQ0n+bQ0r+dQ0}+pQ1t,dQ3R.`Q5T0xQ5x1mQ6v3VQ7z5UR9O6x'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%k%r&P&h&k&l&o&q&r&t&x'Q'U'_'o(Q(S(Y(a(u(w({)p)z*e+S+W+b,i,l,q,}-Q-b-j-x.O.`.m.t/O/g0T0b0h0w1e1u1v1x1z1}2Q2S2c2s2y3V3_3v4l5e5q6R6S6V6a6j6x8_8n8x9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=g!S!nQ!r!v!y!z$|'T'[']'i'j'k*g*k*m*n-U-[-^-n0S0V1b5i5k%S$ti#v$b$c$d$x${%O%Q%]%^%b)v*O*Q*S*V*]*c*s*t+a+d+{,O._.x/]/f/p/q/s0W0Y0e1X1[1d3U4P4Q4[4a4r4z4}5p6t7d7n8[8{9Z9d9j9v:Y:h:q:y;Q<Q<R<T<U<V<W<Z<[<]<^<_<`<h<i<j<k<m<n<q<r<s<t<u<v<w<x<{<|=d=l=m=p=qQ&U|Q'R!eS'X%g-XQ+o%}Q,_&dQ0d*}Q0}+pQ1S+vQ1s,cQ1t,dQ5T0xQ5^1UQ5x1mQ5{1oQ5|1rQ7z5UQ7}5ZQ8g6OQ9p8OQ9|8dR<c*WrnOXst!V!Z#d%k&f&o&q&r&t,l,q1}2QR,a&h&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%k%r&P&h&k&l&o&q&r&t&x'Q'_'o(S(Y(a(u(w({)p)z*e+S+W+b,i,l,q,}-Q-b-j-x.O.`.m.t/O/g0T0b0h0w1e1u1v1x1z1}2Q2S2c2s2y3V3_3v4l5e5q6R6S6V6a6j6x8_8n8x9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=f=g[#]WZ#W#Z'U(Q!b%hm#h#i#l$x%c%f(Z(e(f(g*V*Z*^+U+V+X,h-O-|.S.T.U.W/f/i2V2}3O4S6`6qQ%uxQ%yyS&O|&TQ&[!TQ'`!hQ'b!iQ(n#sS+i%z%{Q+m%}Q,W&_Q,[&aS-e'c'dQ.b(oQ0v+jQ0|+pQ1O+qQ1R+uQ1g,XS1k,],^Q2o-fQ5S0xQ5W0{Q5]1TQ5w1lQ7y5UQ7|5YQ9l7xR:k9m!O$zi$d%O%Q%]%^%b*O*Q*]*s*t.x/p0W0Y0e4Q4r9Z=d=l=m!^%wy!i!u%y%z%{'S'b'c'd'h'r*f+i+j-R-e-f-m/y/|0v2h2o2v4d4e4h7k9fQ+c%uQ+|&XQ,P&YQ,Z&aQ.a(nQ1f,WU1j,[,],^Q3W.bQ5r1gS5v1k1lQ8c5w#d=h#v$b$c$x${)v*S*V*c+a+d+{,O._/]/f/q/s1X1[1d3U4P4[4a4z4}5p6t7d7n8[8{9d9j9v:Y:h:q:y;Q<T<V<Z<]<_<h<j<m<q<s<u<w<{=p=qo=i<Q<R<U<W<[<^<`<i<k<n<r<t<v<x<|W%Ti%V*u=dS&X!Q&fQ&Y!RQ&Z!SR+z&V%T%Si#v$b$c$d$x${%O%Q%]%^%b)v*O*Q*S*V*]*c*s*t+a+d+{,O._.x/]/f/p/q/s0W0Y0e1X1[1d3U4P4Q4[4a4r4z4}5p6t7d7n8[8{9Z9d9j9v:Y:h:q:y;Q<Q<R<T<U<V<W<Z<[<]<^<_<`<h<i<j<k<m<n<q<r<s<t<u<v<w<x<{<|=d=l=m=p=qT)w$u)xV*z%[<X<YW'X!e%g*W-XS(z#y#zQ+^%pQ+t&QS.Z(j(kQ1],QQ4s0aR8S5c'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%k%r&P&h&k&l&o&q&r&t&x'Q'U'_'o(Q(S(Y(a(u(w({)p)z*e+S+W+b,i,l,q,}-Q-b-j-x.O.`.m.t/O/g0T0b0h0w1e1u1v1x1z1}2Q2S2c2s2y3V3_3v4l5e5q6R6S6V6a6j6x8_8n8x9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=g$i$^c#Y#e%o%q%s(P(V(q(v)O)P)Q)R)S)T)U)V)W)X)Z)])_)d)n+_+s-S-q-v-{-}.l.o.s.u.v.w/Z0f2^2a2q2x3^3c3d3e3f3g3h3i3j3k3l3m3n3o3r3s3z4w5Q6c6i6n6}7O7X7Y8U8r8v9Q9W9X:V:m:u;l=ZT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%k%r&P&h&k&l&o&q&r&t&x'Q'U'_'o(Q(S(Y(a(u(w({)p)z*e+S+W+b,i,l,q,}-Q-b-j-x.O.`.m.t/O/g0T0b0h0w1e1u1v1x1z1}2Q2S2c2s2y3V3_3v4l5e5q6R6S6V6a6j6x8_8n8x9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=gQ'V!eR2d-U!W!nQ!e!r!v!y!z$|'T'[']'i'j'k*W*g*k*m*n-U-[-^-n0S0V1b5i5kR1_,SnqOXst!Z#d%k&o&q&r&t,l,q1}2QQ&v!^Q's!xS(p#u;rQ+g%xQ,U&[Q,V&^Q-c'aQ-p'lS.k(u<eS0g+S<oQ0t+hQ1a,TQ2U,sQ2W,tQ2`-PQ2m-dQ2p-hS4x0h<yQ5O0uS5R0w<zQ6b2bQ6f2nQ6k2uQ7w5PQ8s6dQ8t6gQ8w6lR:S8p$d$]c#Y#e%q%s(P(V(q(v)O)P)Q)R)S)T)U)V)W)X)Z)])_)d)n+_+s-S-q-v-{-}.l.o.s.v.w/Z0f2^2a2q2x3^3c3d3e3f3g3h3i3j3k3l3m3n3o3r3s3z4w5Q6c6i6n6}7O7X7Y8U8r8v9Q9W9X:V:m:u;l=ZS(l#p'fQ(|#zS+]%o.uS.[(k(mR3P.]'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%k%r&P&h&k&l&o&q&r&t&x'Q'U'_'o(Q(S(Y(a(u(w({)p)z*e+S+W+b,i,l,q,}-Q-b-j-x.O.`.m.t/O/g0T0b0h0w1e1u1v1x1z1}2Q2S2c2s2y3V3_3v4l5e5q6R6S6V6a6j6x8_8n8x9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=gS#q];kQ&q!XQ&r!YQ&t![Q&u!]R1|,oQ'^!hQ+`%uQ-a'`S.^(n+cQ2k-`W3T.a.b0m0oQ6e2lW6r3Q3S3W4|U8z6s6u6wU:X8|8}9PS:w:W:ZQ;U:xR;^;VU!wQ']-^T5g1b5i!Q_OXZ`st!V!Z#d#h%c%k&f&h&o&q&r&t(g,l,q.T1}2Q]!pQ!r']-^1b5iT#q];k%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%k%r&P&h&k&l&o&q&r&t&x'Q'_'o(Q(S(Y(a(u(w({)z*e+S+W+b,i,l,q-b-j-x.O.`.m.t/g0T0b0h0w1e1u1v1x1z1}2Q2S2s2y3V3_4l5q6R6S6V6j6x8_8n8xS(z#y#zS.Z(j(k!s=Q$Z$n'U)p,}-Q/O2c3v5e6a9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=gU$fd)[,fS(m#p'fU*r%R(t3qU0c*y.g7TQ4|0nQ6s3RQ8}6vR:Z9Om!tQ!r!v!y!z']'i'j'k-^-n1b5i5kQ'q!uS(c#g1wS-l'h'tQ/l*YQ/y*fQ2w-oQ4W/mQ4d/{Q4e/|Q4j0UQ7`4RS7k4f4hS7o4k4mQ9]7aQ9a7gQ9f7lQ9k7qS:c9b9cS:|:d:gS;X:};OS;a;Y;ZS;e;b;cR;h;fQ#wbQ'p!uS(b#g1wS(d#m+RQ+T%dQ+e%vQ+k%|U-k'h'q'tQ.P(cQ/k*YQ/z*fQ/}*hQ0s+fQ1h,YS2t-l-oQ2|.XS4V/l/mQ4`/wS4c/y0UQ4g0OQ5t1iQ6m2wQ7_4RQ7c4WU7j4d4j4mQ7m4iQ8a5uS9[7`7aQ9`7gQ9h7oQ9i7pQ9y8bQ:a9]S:b9a9cQ:j9kQ:s9zS:{:c:gS;W:|:}S;`;X;ZS;d;a;cQ;g;eQ;i;hQ=T=OQ=`=XR=a=YV!wQ']-^%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%k%r&P&h&k&l&o&q&r&t&x'Q'_'o(Q(S(Y(a(u(w({)z*e+S+W+b,i,l,q-b-j-x.O.`.m.t/g0T0b0h0w1e1u1v1x1z1}2Q2S2s2y3V3_4l5q6R6S6V6j6x8_8n8xS#wz!j!r<}$Z$n'U)p,}-Q/O2c3v5e6a9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=gR=T=f%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%k%r&P&h&k&l&o&q&r&t&x'Q'_'o(Q(S(Y(a(u(w({)z*e+S+W+b,i,l,q-b-j-x.O.`.m.t/g0T0b0h0w1e1u1v1x1z1}2Q2S2s2y3V3_4l5q6R6S6V6j6x8_8n8xQ%dj!^%vy!i!u%y%z%{'S'b'c'd'h'r*f+i+j-R-e-f-m/y/|0v2h2o2v4d4e4h7k9fS%|z!jQ+f%wQ,Y&aW1i,Z,[,],^U5u1j1k1lS8b5v5wQ9z8c!r=O$Z$n'U)p,}-Q/O2c3v5e6a9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=gQ=X=eR=Y=f%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%k%r&P&h&k&o&q&r&t&x'Q'_'o(S(Y(a(u(w({)z*e+S+W+b,i,l,q-b-j-x.O.`.m.t/g0T0b0h0w1e1u1v1x1z1}2Q2S2s2y3V3_4l5q6R6S6V6j6x8_8n8xY#bWZ#W#Z(Q!b%hm#h#i#l$x%c%f(Z(e(f(g*V*Z*^+U+V+X,h-O-|.S.T.U.W/f/i2V2}3O4S6`6qQ,g&l!p=P$Z$n)p,}-Q/O2c3v5e6a9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=gR=S'UU'Y!e%g*WR2f-X%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%k%r&P&h&k&o&q&r&t&x'Q'_'o(Q(S(Y(a(u(w({)z*e+S+W,i,l,q-b-j-x.O.m.t/g0T0b0h0w1e1u1v1x1z1}2Q2S2s2y3_4l5q6R6S6V6j8_8n8x!r)[$Z$n'U)p,}-Q/O2c3v5e6a9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=gQ,f&lQ0n+bQ3R.`Q6v3VR9O6x!b$Tc#Y%o(P(V(q(v)W)X)])d+s-q-v-{-}.l.o/Z0f2q2x3^3n4w5Q6i6n6}8v:V;l!P;x)Z)n-S.u2^2a3c3l3m3r3z6c7O7X7Y8U8r9Q9W9X:m:u=Z!f$Vc#Y%o(P(V(q(v)T)U)W)X)])d+s-q-v-{-}.l.o/Z0f2q2x3^3n4w5Q6i6n6}8v:V;l!T;z)Z)n-S.u2^2a3c3i3j3l3m3r3z6c7O7X7Y8U8r9Q9W9X:m:u=Z!^$Zc#Y%o(P(V(q(v)])d+s-q-v-{-}.l.o/Z0f2q2x3^3n4w5Q6i6n6}8v:V;lQ4Q/dz=g)Z)n-S.u2^2a3c3r3z6c7O7X7Y8U8r9Q9W9X:m:u=ZQ=l=nR=m=o'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%k%r&P&h&k&l&o&q&r&t&x'Q'U'_'o(Q(S(Y(a(u(w({)p)z*e+S+W+b,i,l,q,}-Q-b-j-x.O.`.m.t/O/g0T0b0h0w1e1u1v1x1z1}2Q2S2c2s2y3V3_3v4l5e5q6R6S6V6a6j6x8_8n8x9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=gS$oh$pR3w.}'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%k%r&P&h&k&l&o&q&r&t&x'Q'U'_'o(Q(S(Y(a(u(w({)p)z*e+S+W+b,i,l,q,}-Q-b-j-x.O.`.m.t.}/O/g0T0b0h0w1e1u1v1x1z1}2Q2S2c2s2y3V3_3v4l5e5q6R6S6V6a6j6x8_8n8x9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=gT$kf$qQ$ifS)g$l)kR)s$qT$jf$qT)i$l)k'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%k%r&P&h&k&l&o&q&r&t&x'Q'U'_'o(Q(S(Y(a(u(w({)p)z*e+S+W+b,i,l,q,}-Q-b-j-x.O.`.m.t.}/O/g0T0b0h0w1e1u1v1x1z1}2Q2S2c2s2y3V3_3v4l5e5q6R6S6V6a6j6x8_8n8x9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=gT$oh$pQ$rhR)r$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%k%r&P&h&k&l&o&q&r&t&x'Q'_'o(Q(S(Y(a(u(w({)z*e+S+W+b,i,l,q-b-j-x.O.`.m.t/g0T0b0h0w1e1u1v1x1z1}2Q2S2s2y3V3_4l5q6R6S6V6j6x8_8n8x!s=e$Z$n'U)p,}-Q/O2c3v5e6a9q:T;j;m;n;q;r;s;t;u;v;w;x;y;z;{;|;}<P<S<a<d<e<g<o<p<y<z=g#glOPXZst!Z!`!o#S#d#o#{$n%k&h&k&l&o&q&r&t&x'Q'_({)p*e+W+b,i,l,q-b.`/O/g0T0b1e1u1v1x1z1}2Q2S3V3v4l5q6R6S6V6x8_8n!O%Ri$d%O%Q%]%^%b*O*Q*]*s*t.x/p0W0Y0e4Q4r9Z=d=l=m#d(t#v$b$c$x${)v*S*V*c+a+d+{,O._/]/f/q/s1X1[1d3U4P4[4a4z4}5p6t7d7n8[8{9d9j9v:Y:h:q:y;Q<T<V<Z<]<_<h<j<m<q<s<u<w<{=p=qQ+O%`Q/[){o3q<Q<R<U<W<[<^<`<i<k<n<r<t<v<x<|!O$yi$d%O%Q%]%^%b*O*Q*]*s*t.x/p0W0Y0e4Q4r9Z=d=l=mQ*_$zU*h$|*W*kQ+P%aQ0O*i#d=V#v$b$c$x${)v*S*V*c+a+d+{,O._/]/f/q/s1X1[1d3U4P4[4a4z4}5p6t7d7n8[8{9d9j9v:Y:h:q:y;Q<T<V<Z<]<_<h<j<m<q<s<u<w<{=p=qn=W<Q<R<U<W<[<^<`<i<k<n<r<t<v<x<|Q=[=hQ=]=iQ=^=jR=_=k!O%Ri$d%O%Q%]%^%b*O*Q*]*s*t.x/p0W0Y0e4Q4r9Z=d=l=m#d(t#v$b$c$x${)v*S*V*c+a+d+{,O._/]/f/q/s1X1[1d3U4P4[4a4z4}5p6t7d7n8[8{9d9j9v:Y:h:q:y;Q<T<V<Z<]<_<h<j<m<q<s<u<w<{=p=qo3q<Q<R<U<W<[<^<`<i<k<n<r<t<v<x<|noOXst!Z#d%k&o&q&r&t,l,q1}2QS*b${*VQ,z&{Q,{&}R4Z/q%S%Si#v$b$c$d$x${%O%Q%]%^%b)v*O*Q*S*V*]*c*s*t+a+d+{,O._.x/]/f/p/q/s0W0Y0e1X1[1d3U4P4Q4[4a4r4z4}5p6t7d7n8[8{9Z9d9j9v:Y:h:q:y;Q<Q<R<T<U<V<W<Z<[<]<^<_<`<h<i<j<k<m<n<q<r<s<t<u<v<w<x<{<|=d=l=m=p=qQ+}&YQ1Z,PQ5a1YR8R5bV*j$|*W*kU*j$|*W*kT5h1b5iS/w*e/gQ4i0TT7p4l9sQ+e%vQ/}*hQ0s+fQ1h,YQ5t1iQ8a5uQ9y8bR:s9z!O%Oi$d%O%Q%]%^%b*O*Q*]*s*t.x/p0W0Y0e4Q4r9Z=d=l=mr*O$v)b*P*q+Q/o0[0]3t4X4v7^7r:`=U=b=cS0W*p0X#d<T#v$b$c$x${)v*S*V*c+a+d+{,O._/]/f/q/s1X1[1d3U4P4[4a4z4}5p6t7d7n8[8{9d9j9v:Y:h:q:y;Q<T<V<Z<]<_<h<j<m<q<s<u<w<{=p=qn<U<Q<R<U<W<[<^<`<i<k<n<r<t<v<x<|!b<h(r)`*X*a.c.f.j/W/d/t0l1W3Z3}4Y4^5`6y6|7e7h7t7v9_9g:e:i:z;P;[=n=o`<i3p7P7S7W9R:[:_;_S<s.e3[T<t7R9U!O%Qi$d%O%Q%]%^%b*O*Q*]*s*t.x/p0W0Y0e4Q4r9Z=d=l=mv*Q$v)b*R*p+Q/`/o0[0]3t4X4n4v7^7r:`=U=b=cS0Y*q0Z#d<V#v$b$c$x${)v*S*V*c+a+d+{,O._/]/f/q/s1X1[1d3U4P4[4a4z4}5p6t7d7n8[8{9d9j9v:Y:h:q:y;Q<T<V<Z<]<_<h<j<m<q<s<u<w<{=p=qn<W<Q<R<U<W<[<^<`<i<k<n<r<t<v<x<|!f<j(r)`*X*a.d.e.j/W/d/t0l1W3X3Z3}4Y4^5`6y6z6|7e7h7t7v9_9g:e:i:z;P;[=n=od<k3p7Q7R7W9R9S:[:]:_;_S<u.f3]T<v7S9VrnOXst!V!Z#d%k&f&o&q&r&t,l,q1}2QQ&c!UR,i&lrnOXst!V!Z#d%k&f&o&q&r&t,l,q1}2QR&c!UQ,R&ZR1V+zsnOXst!V!Z#d%k&f&o&q&r&t,l,q1}2QQ1c,WS5o1f1gU8Z5m5n5rS9u8]8^S:o9t9wQ;R:pR;];SQ&j!VR,b&fR5{1oR9|8dS&O|&TR1O+qQ&o!WR,l&pR,r&uT2O,q2QR,v&vQ,u&vR2X,vQ'v!{R-r'vSsOtQ#dXT%ns#dQ#OTR'x#OQ#RUR'z#RQ)x$uR/X)xQ#UVR'}#UQ#XWU(T#X(U-yQ(U#YR-y(VQ-V'VR2e-VQ.n(vS3`.n3aR3a.oQ-^']R2i-^Y!rQ']-^1b5iR'g!rQ.y)bR3u.yU#_W%f*VU([#_(]-zQ(]#`R-z(WQ-Y'YR2g-Yt`OXst!V!Z#d%k&f&h&o&q&r&t,l,q1}2QS#hZ%cU#r`#h.TR.T(gQ(h#jQ.Q(dW.Y(h.Q2z6oQ2z.RR6o2{Q)k$lR/P)kQ$phR)q$pQ$`cU)^$`-u<OQ-u;lR<O)nQ/j*YW4T/j4U7b9^U4U/k/l/mS7b4V4WR9^7c$])}$v(r)`)b*X*a*p*q*{*|+Q.e.f.h.i.j/W/`/b/d/o/t0[0]0l1W3X3Y3Z3p3t3}4X4Y4^4n4p4v5`6y6z6{6|7R7S7U7V7W7^7e7h7r7t7v9R9S9T9_9g:[:]:^:_:`:e:i:z;P;[;_=U=b=c=n=oQ/r*aU4]/r4_7fQ4_/tR7f4^S*k$|*WR0Q*kr*P$v)b*p*q+Q/o0[0]3t4X4v7^7r:`=U=b=c!b.c(r)`*X*a.e.f.j/W/d/t0l1W3Z3}4Y4^5`6y6|7e7h7t7v9_9g:e:i:z;P;[=n=oU/a*P.c7Pa7P3p7R7S7W9R:[:_;_Q0X*pQ3[.eU4o0X3[9UR9U7Rv*R$v)b*p*q+Q/`/o0[0]3t4X4n4v7^7r:`=U=b=c!f.d(r)`*X*a.e.f.j/W/d/t0l1W3X3Z3}4Y4^5`6y6z6|7e7h7t7v9_9g:e:i:z;P;[=n=oU/c*R.d7Qe7Q3p7R7S7W9R9S:[:]:_;_Q0Z*qQ3].fU4q0Z3]9VR9V7SQ*v%UR0_*vQ4{0lR7u4{Q+Y%iR0k+YQ5d1]S8T5d9rR9r8UQ,T&[R1`,TQ5i1bR8W5iQ1n,_S5y1n8eR8e5{Q0y+mW5V0y5X7{9nQ5X0|Q7{5WR9n7|Q+r&OR1P+rQ2Q,qR6Z2QYrOXst#dQ&s!ZQ+[%kQ,k&oQ,m&qQ,n&rQ,p&tQ1{,lS2O,q2QR6Y1}Q%mpQ&w!_Q&z!aQ&|!bQ'O!cQ'n!uQ+Z%jQ+g%xQ+y&UQ,a&jQ,x&yW-i'h'p'q'tQ-p'lQ0P*jQ0t+hS1q,b,eQ2Y,wQ2Z,zQ2[,{Q2p-hW2r-k-l-o-qQ5O0uQ5[1SQ5_1WQ5s1hQ5}1sQ6X1|U6h2q2t2wQ6k2uQ7w5PQ8P5^Q8Q5`Q8V5hQ8`5tQ8f5|S8u6i6mQ8w6lQ9o7}Q9x8aQ9}8gQ:U8vQ:l9pQ:r9yQ:v:VR;T:sQ%xyQ'a!iQ'l!uU+h%y%z%{Q-P'SU-d'b'c'dS-h'h'rQ/x*fS0u+i+jQ2b-RS2n-e-fQ2u-mS4b/y/|Q5P0vQ6d2hQ6g2oQ6l2vU7i4d4e4hQ9e7kR:f9fS$wi=dR*w%VU%Ui%V=dR0^*uQ$viS(r#v+dS)`$b$cQ)b$dQ*X$xS*a${*VQ*p%OQ*q%QQ*{%]Q*|%^Q+Q%bQ.e<TQ.f<VQ.h<ZQ.i<]Q.j<_Q/W)vQ/`*OQ/b*QQ/d*SQ/o*]S/t*c/fQ0[*sQ0]*tl0l+a,O._1[1d3U5p6t8[8{9v:Y:q:yQ1W+{Q3X<hQ3Y<jQ3Z<mS3p<Q<RQ3t.xS3}/]4PQ4X/pQ4Y/qQ4^/sQ4n0WQ4p0YQ4v0eQ5`1XQ6y<qQ6z<sQ6{<uQ6|<wQ7R<UQ7S<WQ7U<[Q7V<^Q7W<`Q7^4QQ7e4[Q7h4aQ7r4rQ7t4zQ7v4}Q9R<nQ9S<iQ9T<kQ9_7dQ9g7nQ:[<rQ:]<tQ:^<vQ:_<xQ:`9ZQ:e9dQ:i9jQ:z<{Q;P:hQ;[;QQ;_<|Q=U=dQ=b=lQ=c=mQ=n=pR=o=qQ*y%[Q.g<XR7T<YnpOXst!Z#d%k&o&q&r&t,l,q1}2QQ!fPS#fZ#oQ&y!`W'e!o*e0T4lQ'|#SQ(}#{Q)o$nS,e&h&kQ,j&lQ,w&xS,|'Q/gQ-`'_Q.q({Q/T)pQ0i+WQ0o+bQ1y,iQ2l-bQ3S.`Q3y/OQ4t0bQ5n1eQ6P1uQ6Q1vQ6U1xQ6W1zQ6]2SQ6w3VQ7Z3vQ8^5qQ8j6RQ8k6SQ8m6VQ9P6xQ9w8_R:R8n#[cOPXZst!Z!`!o#d#o#{%k&h&k&l&o&q&r&t&x'Q'_({*e+W+b,i,l,q-b.`/g0T0b1e1u1v1x1z1}2Q2S3V4l5q6R6S6V6x8_8nQ#YWQ#eYQ%ouQ%qvS%sw!gS(P#W(SQ(V#ZQ(q#uQ(v#xQ)O$OQ)P$PQ)Q$QQ)R$RQ)S$SQ)T$TQ)U$UQ)V$VQ)W$WQ)X$XQ)Z$ZQ)]$_Q)_$aQ)d$eW)n$n)p/O3vQ+_%rQ+s&PS-S'U2cQ-q'oS-v(Q-xQ-{(YQ-}(aQ.l(uQ.o(wQ.s;jQ.u;mQ.v;nQ.w;qQ/Z)zQ0f+SQ2^,}Q2a-QQ2q-jQ2x.OQ3^.mQ3c;rQ3d;sQ3e;tQ3f;uQ3g;vQ3h;wQ3i;xQ3j;yQ3k;zQ3l;{Q3m;|Q3n.tQ3o<PQ3r<SQ3s<aQ3z;}Q4w0hQ5Q0wQ6c<dQ6i2sQ6n2yQ6}3_Q7O<eQ7X<gQ7Y<oQ8U5eQ8r6aQ8v6jQ9Q<pQ9W<yQ9X<zQ:V8xQ:m9qQ:u:TQ;l#SR=Z=gR#[WR'W!el!tQ!r!v!y!z']'i'j'k-^-n1b5i5kS'S!e-UU*f$|*W*kS-R'T'[S/|*g*mQ0U*nQ2h-[Q4h0SR4m0VR(x#xQ!fQT-]']-^]!qQ!r']-^1b5iQ#p]R'f;kR)c$dY!uQ']-^1b5iQ'h!rS'r!v!yS't!z5kS-m'i'jQ-o'kR2v-nT#kZ%cS#jZ%cS%im,hU(d#h#i#lS.R(e(fQ.V(gQ0j+XQ2{.SU2|.T.U.WS6p2}3OR8y6qd#^W#W#Z%f(Q(Z*V+U-|/fr#gZm#h#i#l%c(e(f(g+X.S.T.U.W2}3O6qS*Y$x*^Q/m*ZQ1w,hQ2_-OQ4R/iQ6_2VQ7a4SQ8q6`T=R'U+VV#aW%f*VU#`W%f*VS(R#W(ZU(W#Z+U/fS-T'U+VT-w(Q-|V'Z!e%g*WQ$lfR)u$qT)j$l)kR3x.}T*[$x*^T*d${*VQ0m+aQ1Y,OQ3Q._Q5b1[Q5m1dQ6u3UQ8]5pQ8|6tQ9t8[Q:W8{Q:p9vQ:x:YQ;S:qR;V:ynqOXst!Z#d%k&o&q&r&t,l,q1}2QQ&i!VR,a&ftmOXst!U!V!Z#d%k&f&o&q&r&t,l,q1}2QR,h&lT%jm,hR1^,QR,`&dQ&S|R+x&TR+n%}T&m!W&pT&n!W&pT2P,q2Q",
  nodeNames: "⚠ ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies in const CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
  maxTerm: 377,
  context: trackNewline,
  nodeProps: [
    ["isolate", -8, 5, 6, 14, 34, 36, 48, 50, 52, ""],
    ["group", -26, 9, 17, 19, 65, 204, 208, 212, 213, 215, 218, 221, 231, 233, 239, 241, 243, 245, 248, 254, 260, 262, 264, 266, 268, 270, 271, "Statement", -34, 13, 14, 29, 32, 33, 39, 48, 51, 52, 54, 59, 67, 69, 73, 77, 79, 81, 82, 107, 108, 117, 118, 135, 138, 140, 141, 142, 143, 144, 146, 147, 166, 167, 169, "Expression", -23, 28, 30, 34, 38, 40, 42, 171, 173, 175, 176, 178, 179, 180, 182, 183, 184, 186, 187, 188, 198, 200, 202, 203, "Type", -3, 85, 100, 106, "ClassItem"],
    ["openedBy", 23, "<", 35, "InterpolationStart", 53, "[", 57, "{", 70, "(", 159, "JSXStartCloseTag"],
    ["closedBy", 24, ">", 37, "InterpolationEnd", 47, "]", 58, "}", 71, ")", 164, "JSXEndTag"]
  ],
  propSources: [jsHighlight],
  skippedNodes: [0, 5, 6, 274],
  repeatNodeCount: 37,
  tokenData: "$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$h&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$h&j(V!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU(V!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$h&j(SpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(SpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Sp(V!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$h&j(Sp(V!b'x0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(T#S$h&j'y0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$h&j(Sp(V!b'y0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$h&j!m),Q(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#u(Ch$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#u(Ch$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(R':f$h&j(V!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$h&j(V!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$h&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$c`$h&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$c``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$c`$h&j(V!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ(V!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$c`(V!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$h&j(Sp(V!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$h&j(Sp(V!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$h&j(V!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$h&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS(V!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$h&j(SpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(SpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Sp(V!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$h&j(k%1l(Sp(V!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$h&j(Sp(V!b$[#t(P,2j(a$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$h&j(Sp(V!b$[#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$h&j(Sp(V!b#m(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$h&j$P(Ch(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva(v+JY$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$h&j#y(Ch(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(U';W$h&j(SpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$h&j(SpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$h&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$c`$h&j(SpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(SpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$c`(SpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!i/.^$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!h!Lf$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$h&j(Sp(V!b(Q%&f#n(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$h&j(Sp(V!b#k(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$h&j(Sp(V!bo+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!Y+Jf$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$h&j(Sp(V!b}.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_!X!L^$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$h&j(Sp(V!bp'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$h&j(Sp(V!bp'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$h&j(Sp(V!b#l(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$h&j(Sp(V!b!U7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$h&j(V!b!U7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$h&j!U7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$h&j!U7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!U7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!U7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$h&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$h&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$h&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$h&j(V!b!U7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ(V!b!U7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse(V!b!U7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX(V!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$h&j(V!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$h&j(Sp!U7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$h&j(Sp!U7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Sp!U7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Sp!U7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(SpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$h&j(SpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$h&j(Sp(V!b!U7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Sp(V!b!U7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Sp(V!b!U7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Sp(V!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$h&j(Sp(V!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$h&j(Sp(V!b'z0/l!U7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$h&j(Sp(V!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$h&j(V!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$h&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW(V!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$h&j(SpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(SpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Sp(V!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$h&j$P(Ch(Sp(V!b!U7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$Y#t$h&j(Sp(V!b!U7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$h&j(Sp(V!bp'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$h&j(Sp(V!bp'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$h&j(Sp(V!bp'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$h&j(Sp(V!bp'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$h&j(Sp(V!bp'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$h&j(Sp(V!bp'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!d$b$h&j#})Lv(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#O-<U(Sp(V!b(z7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$j&j(Sp(V!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#o(Ch(Sp(V!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$P(Ch(Sp(V!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#p(Ch(Sp(V!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#]*!Y$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#h(Cl$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#p(Ch$e#|$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#p(Ch$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#o(Ch$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#o(Ch$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(n(Ct$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$h&j#z(Ch(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!y$Ip$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!P0,v$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$h&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$h&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$h&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$h&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$h&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$h&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!V#)l$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#w(Ch$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$h&j(Sp(V!b(]+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$h&j(Sp(V!b(P,2j$^#t(a$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$h&j(Sp(V!b$^#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X![#Hb(Sp(V!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(u+JY$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_!Z(CdsBr$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!n7`$h&j(Sp(V!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$h&j(Sp(V!b'x0/l$[#t(P,2j(a$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$h&j(Sp(V!b'y0/l$[#t(P,2j(a$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",
  tokenizers: [noSemicolon, noSemicolonType, operatorToken, jsx, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, insertSemicolon, new LocalTokenGroup("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOu~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!R~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(_~~", 141, 336), new LocalTokenGroup("j~RQYZXz{^~^O'|~~aP!P!Qd~iO'}~~", 25, 319)],
  topRules: { "Script": [0, 7], "SingleExpression": [1, 272], "SingleClassItem": [2, 273] },
  dialects: { jsx: 0, ts: 14980 },
  dynamicPrecedences: { "77": 1, "79": 1, "91": 1, "167": 1, "196": 1 },
  specialized: [{ term: 323, get: (value) => spec_identifier2[value] || -1 }, { term: 339, get: (value) => spec_word[value] || -1 }, { term: 92, get: (value) => spec_LessThan[value] || -1 }],
  tokenPrec: 15004
});

// node_modules/.pnpm/@codemirror+lang-javascript@6.2.2/node_modules/@codemirror/lang-javascript/dist/index.js
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
var typescriptSnippets = snippets.concat([
  snippetCompletion("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  snippetCompletion("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  snippetCompletion("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]);
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
var kwCompletion = (name) => ({ label: name, type: "keyword" });
var keywords = "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(kwCompletion);
var typescriptKeywords = keywords.concat(["declare", "implements", "private", "protected", "public"].map(kwCompletion));
function javascript(config = {}) {
  let lang = config.jsx ? config.typescript ? tsxLanguage : jsxLanguage : config.typescript ? typescriptLanguage : javascriptLanguage;
  let completions = config.typescript ? typescriptSnippets.concat(typescriptKeywords) : snippets.concat(keywords);
  return new LanguageSupport(lang, [
    javascriptLanguage.data.of({
      autocomplete: ifNotIn(dontComplete, completeFromList(completions))
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
var android = typeof navigator == "object" && /Android\b/.test(navigator.userAgent);
var autoCloseTags = EditorView.inputHandler.of((view, from, to, text, defaultInsert) => {
  if ((android ? view.composing : view.compositionStarted) || view.state.readOnly || from != to || text != ">" && text != "/" || !javascriptLanguage.isActiveAt(view.state, from, -1))
    return false;
  let base = defaultInsert(), { state } = base;
  let closeTags = state.changeByRange((range) => {
    var _a;
    let { head } = range, around = syntaxTree(state).resolveInner(head - 1, -1), name;
    if (around.name == "JSXStartTag")
      around = around.parent;
    if (state.doc.sliceString(head - 1, head) != text || around.name == "JSXAttributeValue" && around.to > head) ;
    else if (text == ">" && around.name == "JSXFragmentTag") {
      return { range, changes: { from: head, insert: `</>` } };
    } else if (text == "/" && around.name == "JSXStartCloseTag") {
      let empty = around.parent, base2 = empty.parent;
      if (base2 && empty.from == head - 2 && ((name = elementName(state.doc, base2.firstChild, head)) || ((_a = base2.firstChild) === null || _a === void 0 ? void 0 : _a.name) == "JSXFragmentTag")) {
        let insert = `${name}>`;
        return { range: EditorSelection.cursor(head + insert.length, -1), changes: { from: head, insert } };
      }
    } else if (text == ">") {
      let openTag = findOpenTag(around);
      if (openTag && openTag.name == "JSXOpenTag" && !/^\/?>|^<\//.test(state.doc.sliceString(head, head + 2)) && (name = elementName(state.doc, openTag, head)))
        return { range, changes: { from: head, insert: `</${name}>` } };
    }
    return { range };
  });
  if (closeTags.changes.empty)
    return false;
  view.dispatch([
    base,
    state.update(closeTags, { userEvent: "input.complete", scrollIntoView: true })
  ]);
  return true;
});

// node_modules/.pnpm/@codemirror+lang-html@6.4.9/node_modules/@codemirror/lang-html/dist/index.js
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
  } else if (tree.name == "OpenTag" || tree.name == "SelfClosingTag" || tree.name == "AttributeName") {
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
var jsonParser = javascriptLanguage.parser.configure({ top: "SingleExpression" });
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
      return /^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(attrs.type);
    },
    parser: jsonParser
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
var autoCloseTags2 = EditorView.inputHandler.of((view, from, to, text, insertTransaction) => {
  if (view.composing || view.state.readOnly || from != to || text != ">" && text != "/" || !htmlLanguage.isActiveAt(view.state, from, -1))
    return false;
  let base = insertTransaction(), { state } = base;
  let closeTags = state.changeByRange((range) => {
    var _a, _b, _c;
    let didType = state.doc.sliceString(range.from - 1, range.to) == text;
    let { head } = range, after = syntaxTree(state).resolveInner(head, -1), name;
    if (didType && text == ">" && after.name == "EndTag") {
      let tag = after.parent;
      if (((_b = (_a = tag.parent) === null || _a === void 0 ? void 0 : _a.lastChild) === null || _b === void 0 ? void 0 : _b.name) != "CloseTag" && (name = elementName2(state.doc, tag.parent, head)) && !selfClosers2.has(name)) {
        let to2 = head + (state.doc.sliceString(head, head + 1) === ">" ? 1 : 0);
        let insert = `</${name}>`;
        return { range, changes: { from: head, to: to2, insert } };
      }
    } else if (didType && text == "/" && after.name == "IncompleteCloseTag") {
      let tag = after.parent;
      if (after.from == head - 2 && ((_c = tag.lastChild) === null || _c === void 0 ? void 0 : _c.name) != "CloseTag" && (name = elementName2(state.doc, tag, head)) && !selfClosers2.has(name)) {
        let to2 = head + (state.doc.sliceString(head, head + 1) === ">" ? 1 : 0);
        let insert = `${name}>`;
        return {
          range: EditorSelection.cursor(head + insert.length, -1),
          changes: { from: head, to: to2, insert }
        };
      }
    }
    return { range };
  });
  if (closeTags.changes.empty)
    return false;
  view.dispatch([
    base,
    state.update(closeTags, {
      userEvent: "input.complete",
      scrollIntoView: true
    })
  ]);
  return true;
});

// node_modules/.pnpm/@codemirror+lang-vue@0.1.3/node_modules/@codemirror/lang-vue/dist/index.js
var parser4 = LRParser.deserialize({
  version: 14,
  states: "%pOVOWOOObQPOOOpOSO'#C_OOOO'#Cp'#CpQVOWOOQxQPOOO!TQQOOQ!YQPOOOOOO,58y,58yO!_OSO,58yOOOO-E6n-E6nO!dQQO'#CqQ{QPOOO!iQPOOQ{QPOOO!qQPOOOOOO1G.e1G.eOOQO,59],59]OOQO-E6o-E6oO!yOpO'#CiO#RO`O'#CiQOQPOOO#ZO#tO'#CmO#fO!bO'#CmOOQO,59T,59TO#qOpO,59TO#vO`O,59TOOOO'#Cr'#CrO#{O#tO,59XOOQO,59X,59XOOOO'#Cs'#CsO$WO!bO,59XOOQO1G.o1G.oOOOO-E6p-E6pOOQO1G.s1G.sOOOO-E6q-E6q",
  stateData: "$g~OjOS~OQROUROkQO~OWTOXUOZUO`VO~OSXOTWO~OXUO[]OlZO~OY^O~O[_O~OT`O~OYaO~OmcOodO~OmfOogO~O^iOnhO~O_jOphO~ObkOqkOrmO~OcnOsnOtmO~OnpO~OppO~ObkOqkOrrO~OcnOsnOtrO~OWX`~",
  goto: "!^hPPPiPPPPPPPPPmPPPpPPsy!Q!WTROSRe]Re_QSORYSS[T^Rb[QlfRqlQogRso",
  nodeNames: "⚠ Content Text Interpolation InterpolationContent }} Entity Attribute VueAttributeName : Identifier @ Is ScriptAttributeValue AttributeScript AttributeScript AttributeName AttributeValue Entity Entity",
  maxTerm: 36,
  nodeProps: [
    ["isolate", -3, 3, 13, 17, ""]
  ],
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
