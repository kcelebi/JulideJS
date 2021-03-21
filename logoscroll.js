
let list, imgs, len;

function setup() {
    createCanvas(800,200);
    list = new LinkedList(null,null);
    len = 8;
    for(var i=1; i < len+1; i++){
        list.push(new Node(null, loadImage('img/logo' + i + '.png'), [(i-1)*60, 30]));
    }
    list.set();
}

function draw() {
    background(255);
    for(var i=0; i < len; i++){
        image(list.curr.value, list.curr.coord[0],list.curr.coord[1], 50,50);
        console.log(list.curr.coord);
        update(list.curr);
        list.next();
    }
    list.begin();
    
}

function update(node){
    node.coord[0] += 1; //increment pos

    if(!inBounds(node.coord[0])){
        node.coord[0] = -50;
    }

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