function setup() {

}

function draw() {

}

function inBounds(x) {
    if(x > width){
        return false;
    }
    return true;
}

class Node {
    constructor(next, value, coord) {
        this.next = next;
        this.value = value;
        this.coord = coord;
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
    begin() {
        this.curr = this.head;
    }

    //pop end and move to head
    /*pop() {

        var temp = this.head;
        this.end.next = temp;
        temp.next = None;

        this.head = this.head.next;
        this.end = this.end.next;
    }*/

    //add to end
    push(node) {
        if(this.head == null){
            this.head = node;
            this.curr = node;
            this.end = node;
        }
        else{
            this.end.next = node;
            this.end = this.end.next;
        }
    }

    set() {
        this.end.next = this.head;
    }
}