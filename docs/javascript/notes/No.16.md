# Note 16

<BackTop />

## `for...in` 和 `for...of`

### **核心区别对比表**

| **特性** | `for...in` | `for...of` |
|--|--|--|
| **遍历目标** | **对象**的可枚举属性（包括原型链）| **可迭代对象**的元素（数组、字符串等）|
| **返回值** | 属性名（字符串）| 元素值 |
| **适用范围** | 普通对象、数组（不推荐）| 数组、字符串、`Map`、`Set` 等实现了 `Symbol.iterator` 的对象 |
| **原型链属性** | ✅ 遍历可枚举的原型链属性 | ❌ 不遍历原型链 |
| **性能** | 较慢（需检查原型链）| 更快 |

### **一、`for...in` 的特点**

#### 1. **遍历对象属性**

```js
const obj = { a: 1, b: 2 }
for (const key in obj) {
  console.log(key) // 输出 "a", "b"
}
```

#### 2. **遍历数组（不推荐）**

```js
const arr = [10, 20]
for (const index in arr) {
  console.log(index) // 输出 "0", "1"（字符串类型！）
}
```

#### 3. **包含原型链属性**

```js
Object.prototype.customProp = "来自原型链"
const obj = { a: 1 }

for (const key in obj) {
  console.log(key) // 输出 "a", "customProp"
}
```

### **二、`for...of` 的特点**

#### 1. **遍历数组元素**

```js
const arr = [10, 20]
for (const value of arr) {
  console.log(value) // 输出 10, 20
}
```

#### 2. **遍历字符串字符**

```js
const str = "Hi"
for (const char of str) {
  console.log(char) // 输出 "H", "i"
}
```

#### 3. **遍历其他可迭代对象**

```js
const map = new Map([["a", 1], ["b", 2]]);
for (const [key, value] of map) {
  console.log(key, value) // 输出 "a 1", "b 2"
}
```

#### 4. **对象默认不可迭代**

```js
const obj = { a: 1, b: 2 }
for (const val of obj) { // ❌ 报错：obj is not iterable
  console.log(val)
}
```

### **三、关键注意事项**

#### 1. **数组遍历的正确选择**

```js
// 错误用法（遍历索引）
const arr = [10, 20]
for (const index in arr) {
  console.log(arr[index]) // 可行但低效
}

// 正确用法（直接遍历值）
for (const value of arr) {
  console.log(value) // ✅ 推荐
}
```

#### 2. **跳过原型链属性**

```js
const obj = { a: 1 }
Object.prototype.b = 2

// 只遍历自身属性
for (const key in obj) {
  if (obj.hasOwnProperty(key)) { // ✅ 过滤原型属性
    console.log(key) // 仅输出 "a"
  }
}
```

#### 3. **让对象支持 `for...of`**

```js
// 实现迭代器协议
const obj = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        return index < this.data.length 
          ? { value: this.data[index++], done: false }
          : { done: true }
      }
    }
  }
}

for (const num of obj) {
  console.log(num) // 输出 1, 2, 3
}
```

### **四、总结**

- **用 `for...in`**：  
  遍历对象的可枚举属性（包括原型链），适合调试或处理动态属性。
- **用 `for...of`**：  
  遍历可迭代对象的元素值，适合数组、字符串等结构化数据。
