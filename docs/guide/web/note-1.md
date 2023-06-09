# Note 1

## 字符串和数组相互转换

### 数组转字符串

```js
const arr = [1,2,3,'a']
const str = arr.join(',')
console.log('str:', str) // 1,2,3,a
```

### 字符串转数组

```js
const str = '1,2,3,a'
const arr = str.split(',')
console.log('arr:', arr) // ["1", "2", "3", "a"]  (数组)
```

### 字符串转数组，数组转数JSON，JSON转数组

```js
const str = '1,2,3,a'
const arr = str.split(',')
const string = JSON.stringify(arr)
console.log('arr:', arr) // ['1', '2', '3', 'a']   (数组)
console.log('string:', string) // ['1', '2', '3', 'a']   (字符串)

const string = '["1", "2", "3", "a"]'
const arr = JSON.parse(string)
console.log('arr:', arr) // ['1', '2', '3', 'a']   (数组)
```

## 数值转换，将float强制转换为整型

### 丢弃小数部分,保留整数部分

```js
parseInt(7/2)
```

### 向上取整,有小数就整数部分加1

```js
Math.ceil(7/2)
```

### 四舍五入

```js
Math.round(7/2)
```

### 向下取整

```js
Math.floor(7/2)
```
