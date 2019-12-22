//封装双向链表
function DoublyLinkedList() {
  //属性
  this.head = null;
  this.tail = null;
  this.length = 0;

  //节点类
  function Node(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }

  //常见方法
  //1. append(element):向链表尾部添加一个新的项
  DoublyLinkedList.prototype.append = function (data) {
    //创建节点
    let newNode = new Node(data);

    //判断添加的是否是第一个节点
    if (!this.length) {
      //如果是第一个节点
      this.head = newNode;
    } else {
      //如果不是第一个节点
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
      newNode.prev = current;
    }

    //让tail指向新添加的节点
    this.tail = newNode;

    //链表长度+1
    this.length++;

    return '添加成功';
  }

  //2. insert(position,element):向链表的特定位置插入一个新的项
  DoublyLinkedList.prototype.insert = function (position, data) {
    //越界判断
    if (position < 0 || position > this.length) return false;

    //创建节点
    let newNode = new Node(data);

    //判断position是否为0
    if (position === 0) {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    } else if (position === this.length) {
      //如果插入的位置是最后一个
      let lastNode = this.tail;
      lastNode.next = newNode;
      newNode.prev = lastNode;
      this.tail = newNode;
    } else {
      //如果插入的位置是中间
      let current = this.head;

      for (let i = 0; i < position; i++) {
        //找到要插入位置的那个节点
        current = current.next;
      }
      newNode.prev = current.prev;
      current.prev.next = newNode;
      newNode.next = current;
      current.prev = newNode;
    }

    //链表的长度+1
    this.length++;

    return '插入成功';
  }

  //getPosEle(position):封装一个获取指定位置元素的方法(需要多次使用)
  DoublyLinkedList.prototype.getPosEle = function (position) {
    //获取对应位置的元素
    //对position做一个简单的判断，来提高查找效率
    //如果position在链表的前面一半就从前往后找，如果position在链表的后面一半就从后往前找
    if (position <= this.length / 2) {
      let current = this.head;
      for (let i = 0; i < position; i++) {
        current = current.next;
      }
      return current;
    } else {
      let current = this.tail;
      for (i = this.length - 1; i > position; i--) {
        current = current.prev;
      }
      return current;
    }
  }

  //3. get(position):获取对应位置的元素
  DoublyLinkedList.prototype.get = function (position) {
    //越界判断
    if (position < 0 || position >= this.length) return null;

    return this.getPosEle(position).data;
  }

  //4. indexOf(element):返回元素在链表中的索引。如果每天该元素则返回-1
  DoublyLinkedList.prototype.indexOf = function (data) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }

    //没有找到指定元素，返回-1
    return -1;
  }

  //5. update(position,element):修改某个位置的元素
  DoublyLinkedList.prototype.update = function (position, newData) {
    //越界判断
    if (position < 0 || position >= this.length) return false;

    this.getPosEle(position).data = newData;

    return '修改成功';
  }

  //6. removeAt(position):从链表的特定位置移除一项
  DoublyLinkedList.prototype.removeAt = function (position) {
    //越界判断
    if (position < 0 || position >= this.length) return null;

    let current = this.head;

    //判断链表中是否只有一个节点
    if (this.length === 1) {
      //只有一个节点
      this.head = null;
      this.tail = null;
    } else { // 不止一个节点
      if (position === 0) {
        //如果删除的是第一个元素
        this.head = this.head.next;
        this.head.prev = null;
      } else if (position === this.length - 1) {
        //如果删除的是最后一个元素
        current = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
      } else {
        //如果删除的是中间位置的元素
        //获取对应位置的元素
        current = this.getPosEle(position);
        current.prev.next = current.next;
        current.next.prev = current.prev;
      }
    }

    //链表的长度-1
    this.length--;

    return current.data;
  }

  //7. remove(element):从链表中移除指定项
  DoublyLinkedList.prototype.remove = function (data) {
    //利用前面已经实现的方法 -- 通过找到元素的位置删除元素
    // return this.removeAt(this.indexOf(data));

    //不利用前面已经实现的方法 -- 通过找到元素本身删除元素
    let current = this.head;

    //找到值与data相等的元素
    while (current) {
      if (current.data === data) {
        if (!current.prev) { //如果此节点的prev指向null说明要找的节点为第一个节点
          this.head = this.head.next;
          this.head.prev = null;
        } else if (!current.next) { //如果此节点的next指向null说明要找的节点为最后一个节点
          this.tail = this.tail.prev;
          this.tail.next = null;
        } else {
          //如果要找的节点是中间的节点
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }

        //链表的长度-1
        this.length--;

        return `删除元素: ${data} 成功`;
      }
      current = current.next;
    }

    //如果没有找到对应元素，返回错误信息
    return `没有找到${data}元素`;
  }

  //8. isEmpty():如果链表中不包含任何元素，返回true,否则返回false
  DoublyLinkedList.prototype.isEmpty = function () {
    return this.length === 0;
  }

  //9. size():返回链表中包含的元素个数
  DoublyLinkedList.prototype.size = function () {
    return this.length;
  }

  //10.toString():把链表中的元素转换成字符串形式输出(默认从前往后)
  DoublyLinkedList.prototype.toString = function () {
    return this.backwardString();
  }

  //11. forwardString():返会反向遍历链表（从后往前previous）时所有节点的字符串形式
  DoublyLinkedList.prototype.forwardString = function () {
    let current = this.tail;
    let listStrPrev = '';

    //从后往前遍历节点（prev）
    while (current) {
      listStrPrev += current.data + ' ';
      current = current.prev;
    }

    return listStrPrev;
  }

  //12.backwardString():返回正向遍历（从前往后next）链表时所有节点的字符串形式
  DoublyLinkedList.prototype.backwardString = function () {
    let current = this.head;
    let listStrNext = '';

    //从前往后遍历节点（next）
    while (current) {
      listStrNext += current.data + ' ';
      current = current.next;
    }

    return listStrNext;
  }

  //13.getHead():获取链表第一个元素
  DoublyLinkedList.prototype.getHead = function () {
    return this.head.data;
  }

  //14.getTail():获取链表最后一个元素
  DoublyLinkedList.prototype.getTail = function () {
    return this.tail.data;
  }
}