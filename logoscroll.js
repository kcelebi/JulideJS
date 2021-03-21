
let list, imgs;

function setup() {
    createCanvas(800,200);
    list = new LinkedList(null,null);
    for(var i=1; i < 9; i++){
        list.push(new Node(null, loadImage('img/logo' + i + '.png')));
    }
}

function draw() {
    background(255);
    var i=0;
    while(list.curr != null){
        image(list.curr.value, i*60,30, 50,50);
        list.next();
        i++;
    }
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
        this.end = this.end.next;
    }

    //add to end
    push(node) {
        if(this.head = null){
            this.head = node;
            this.curr = node;
            this.end = node;
        }
        else{
            this.end.next = node;
            this.end = this.end.next;
        }
    }
}