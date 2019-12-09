//注意：数字越小，优先级越高
//封装优先级队列 -- 基于数组
function PriorityQueue() {
    //在PriorityQueue重新创建一个类，可以理解为内部类
    //队列的数据 -- 保存每个数据及其优先级
    function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }

    //封装属性
    this.items = [];

    //优先级队列方法 -- 与普通队列的最主要区别就是插入方法的不同
    //1.插入
    PriorityQueue.prototype.enqueue = function (element, priority) {
        //1.创建QueueElement对象
        let queueEle = new QueueElement(element, priority);

        //2.判断队列是否为空
        if (!this.items.length) { //如果队列为空，就可以直接插入元素
            this.items.push(queueEle); //数组中存放的是对象{元素, 优先级}
        } else { //如果队列不为空，就需要一个一个进行比较，看谁的优先级高（数字越小，优先级越高）
            let added = false; //用一个变量记录是否有插入
            for (let i = 0; i < this.items.length; i++) {
                if (queueEle.priority < this.items[i].priority) {
                    this.items.splice(i, 0, queueEle);
                    added = true;
                    break;
                }
            }

            //如果循环结束后没有插入的情况，说明新添加的元素优先级是最小的，要直接插入到最后
            if (!added) {
                this.items.push(queueEle);
            }
        }
    }

    //2.删除,并返回删除的元素 -- 只能从前端删除
    PriorityQueue.prototype.dequeue = function () {
        return this.items.shift();
    }

    //3.返回队列的第一个元素，不做任何操作
    PriorityQueue.prototype.front = function () {
        return this.items[0].element; // 只返回数据，不返回优先级
    }

    //4.判断队列是否为空，是返回true,否则返回false
    PriorityQueue.prototype.isEmpty = function () {
        return this.items.length === 0;
    }

    //5.返回队列的长度
    PriorityQueue.prototype.size = function () {
        return this.items.length;
    }

    //6.toString()  -- 将队列中的内容转换成字符串形式
    PriorityQueue.prototype.toString = function () {
        let str = '';
        this.items.forEach(item => {
            str += item.element + '-' + item.priority + ' ';
        })
        return str;
    }
}