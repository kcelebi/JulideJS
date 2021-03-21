
let list;

function setup() {
    createCanvas(800,200);
}

function draw() {
    background(255);

}

function update(){

}

class Node {
    constructor(next, value) {
        this.next = next;
        this.value = value;
    }
}

class LinkedList {
    constructor(head, end){
        this.head = head;
        this.end = end;
        this.curr = head;
    }

    next() {
        this.curr = this.curr.next;
    }

    //jump to head
    head() {
        this.curr = this.head;
    }

    //pop head and move to end
    pop() {
        var temp = this.head;
        this.end.next = temp;
        temp.next = None;

        this.head = this.head.next;
    }
}