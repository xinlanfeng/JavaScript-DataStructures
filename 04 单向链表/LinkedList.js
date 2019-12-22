//封装链表类
//链表的每一个节点不仅包含数据本身还包含下一个元素的引用
function LinkedList() {
    //封装一个内部的类，用于实现同时存储元素本身data和下一个元素的引用next
    function Node(data) {
        this.data = data
        this.next = null //默认为null
    }

    //属性
    this.head = null //head指向第一个节点
    this.length = 0

    //链表常见操作
    //1.append(element):向链表尾部添加一个新的项
    LinkedList.prototype.append = function (data) {
        //创建新节点
        let newNode = new Node(data)

        //链表为空(要添加的是第一个节点)，head指向新添加的节点
        if (!this.length) {
            this.head = newNode
        }
        //链表不为空，最后一个元素的next指向新添加的元素
        else {
            //通过head一个一个找，直到找到最后一个元素节点，让它的next指向新添加的元素
            let current = this.head //current表示第一个元素节点
            //如果current.next!=null，就说明它不是链表中的最后一个元素，就继续找，直到current.next为null
            while (current.next) {
                current = current.next
            }
            //找到了最后一个节点current，让其指向新添加的元素
            current.next = newNode
        }

        //链表的长度+1
        this.length++
    }

    //2.insert(data, position):向链表的特定位置插入一个新的项
    LinkedList.prototype.insert = function (data, position) {
        //1.对position进行越界判断 -- position不能为负数，不能超过length
        if (position < 0 || position > this.length) return false;

        //2.创建newNode
        let newNode = new Node(data);

        //插入分为2种情况：
        //（1）插入position=0的位置（第一个节点）
        //（2)插入除第一个节点之外的后面任意一个节点 0 < position <= length
        //3.判断插入的位置是否是第一个
        if (position === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let previous = this.head;
            //获取插入位置的前一个节点
            for (i = 0; i < position - 1; i++) {
                previous = previous.next;
            }
            newNode.next = previous.next;
            previous.next = newNode;
        }

        //4.链表的长度+1
        this.length++;

        return true;
    }

    //3.get(position):获取对应位置的元素
    LinkedList.prototype.get = function (position) {
        //1.对position进行越界判断 -- position不能为负数，不能>=length
        if (position < 0 || position >= this.length) return null;

        //2.获取对应位置的元素
        let current = this.head;
        for (i = 0; i < position; i++) {
            current = current.next
        }
        return current.data;
    }

    //4.indexOf(element):返回指定元素在链表中的位置，没有返回-1
    LinkedList.prototype.indexOf = function (data) {
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

    //5.update(position, element):修改某个位置的元素
    LinkedList.prototype.update = function (position, newData) {
        //1.对position进行越界判断 -- position不能为负数，不能>=length
        if (position < 0 || position >= this.length) return false;

        //2.获取对应位置的元素并修改
        let current = this.head;
        for (i = 0; i < position; i++) {
            current = current.next
        }
        current.data = newData;
    }

    //6.removeAt(position):删除指定位置的元素并返回
    LinkedList.prototype.removeAt = function (position) {
        //1.对position进行越界判断 -- position不能为负数，不能>=length
        if (position < 0 || position >= this.length) return null;

        let current = this.head; //指定位置的节点

        //2.判断删除的位置是否是第一个
        if (position === 0) {
            this.head = current.next;
        } else { //如果position不为0
            let previous = null; //指定位置的上一个节点

            for (let i = 0; i < position; i++) {
                previous = current;
                current = current.next;
            }

            //删除指定位置的元素
            previous.next = current.next;
        }

        //3.链表长度-1
        this.length--;

        //4.返回被删除的数据
        return current.data;
    }

    //7.remove(element):从链表中删除指定元素
    LinkedList.prototype.remove = function (data) {
        //利用前面已经实现的方法实现remove -- 通过找到元素的位置删除元素
        // //1.根据data获取元素在链表中的位置
        // let position = this.indexOf(data);

        // //2.根据元素的位置删除元素
        // return this.removeAt(position);

        //不利用前面已经实现的方法 -- 通过找到元素本身删除元素
        let current = this.head; //当前节点
        let previous = null; //前一个节点

        while (current) {
            if (current.data === data) {
                if (!previous) { //如果previous为null,说明要删除的节点为第一个节点
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }

                //链表长度-1
                this.length--;

                //返回被删除的数据
                return current.data;
            }
            previous = current;
            current = current.next;
        }

        //如果没有找到对应元素，返回错误信息
        return `没有找到${data}元素`;
    }

    //8.isEmpty():如果链表中不包含任何元素，返回true，否则返回false
    LinkedList.prototype.isEmpty = function () {
        return this.length === 0;
    }

    //9.size():返回链表中包含元素的个数
    LinkedList.prototype.size = function () {
        return this.length;
    }

    //10.toString():由于链表使用了Node类，就需要重写继承自JS对象默认的toString方法，让其只输出元素的值
    LinkedList.prototype.toString = function () {
        let current = this.head;
        let listString = '';

        while (current) {
            listString += current.data + ' ';
            current = current.next;
        }

        return listString;
    }
}