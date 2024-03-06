# Note 11

## [WeakSet()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) & [WeakMap()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

`WeakSet` 结构与 `Set` 类似，也是不重复的值的集合，具备:

- `WeakSet.prototype.add(value)` ：向 `WeakSet` 实例添加一个新成员。
- `WeakSet.prototype.delete(value)` ：清除 `WeakSet` 实例的指定成员。
- `WeakSet.prototype.has(value)` ：返回一个布尔值，表示某个值是否在 `WeakSet` 实例之中。

`WeakSet` 与 `Set` 有两个区别（也没有`size`和`forEach`属性）：

- `WeakSet` 的**成员只能是对象和 Symbol 值**，而**不能是其他类型的值**
- `WeakSet` 中的**对象都是弱引用**，即**垃圾回收机制不考虑 WeakSet 对该对象的引用**，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 `WeakSet` 之中。

由于 `WeakSet` 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此，**ES6规定 WeakSet 和 WeakMap 不可遍历**。

### WeakSet()应用场景

<br/>

一个很典型的应用场景： **储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏**

```js
// 需要一个数组来保存着被禁止掉的 DOM 元素:
const disabledElements = new Set()
const loginButton = document.querySelector('button')
// 通过加入对应集合，给这个节点打上“禁用”标签
disabledElements.add(loginButton)
// 查询元素在不在 disabledElements 中,就可以知道它是不是被禁用了,但是假如 元素从 DOM 树中被删除了,它的引用却仍然保存在 Set 中，它的键依然引用着,因此垃圾回收程序也不能回收它，这就很容易造成内存泄漏。
```

使用 `WeakSet` 对象就很好的解决了这个问题:

```js
const disabledElements = new WeakSet()
const loginButton = document.querySelector('#login')
// 通过加入对应集合，给这个节点打上“禁用”标签 
disabledElements.add(loginButton)
// 这样只要 WeakSet 中任何元素从 DOM 树中被删除，垃圾回收程序就可以忽略其存在，而立即释放其内存。
```

`WeakMap` **弱引用的只是键名，而不是键值**。键值依然是正常引用。

`WeakMap`与`Map`有两个区别（也没有`size`、`forEach`和`clear`属性）：

- `WeakMap`**只接受对象和 Symbol 值作为键名**（`null`除外，`null`是对象但不能作为键名），不接受其他类型的值作为键名
  
  ```js
  const map = new WeakMap()
  map.set(1, 2) // 报错
  map.set(null, 2) // 报错
  map.set(Symbol(), 2) // 不报错
  ```

- `WeakMap`的键名所指向的对象，不计入垃圾回收机制。
  
**只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存**。也就是说，一旦不再需要，`WeakMap` 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

`WeakMap`的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。

```js
const e1 = document.getElementById('foo')
const e2 = document.getElementById('bar')
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素']
]
// 一旦不再需要两个对象 e1 和 e2，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放el占用的内存.
// 不需要 e1 和 e2 的时候，必须手动删除引用，一旦忘记删除，就会造成内存泄露
arr = null

// 使用weakMap解决该问题
// 以下代码棕 DOM 节点对象除了 WeakMap 的弱引用外，其他位置对该对象的引用一旦消除，该对象占用的内存就会被垃圾回收机制释放。
// WeakMap 保存的这个键值对，也会自动消失。
const wm = new WeakMap()
const el = document.getElementById('foo')
map.set(el, 'foo元素') // 这样当el被移除时，就会自动释放占用的内存
wm.get(el) // 'foo元素'
```

总之，**WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失**。`WeakMap`结构有助于防止内存泄漏。
<br/>
一个典型应用场景是，在网页的 `DOM` 元素上添加数据，就可以使用`WeakMap`结构。当该 `DOM` 元素被清除，其所对应的`WeakMap`记录就会自动被移除。
