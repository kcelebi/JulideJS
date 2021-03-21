
let list, len, dimsx, dimsy, divs;

function setup() {
    createCanvas(1000,200);

    dimsx = [225,338,224,546,360,216,800,640];
    dimsy = [225,149,225,155,228,206,800,480];
    dists = []

    len = 8;
    list = new LinkedList(null,null);
    var dist = 0;
    for(var i=1; i < len+1; i++){
        var div = dimsy[i-1]/(height-100); 
        list.push(new Node(null, loadImage('img/logo' + i + '.png'), [dist, 50]));

        dist += dimsx[i-1]/div;
        dists.push(dimsx[i-1]/div);
    }
    list.set();
}

function draw() {
    background(255);
    for(var i=0; i < len; i++){
        image(list.curr.value, list.curr.coord[0], list.curr.coord[1], dists[i], height-100);

        update(list.curr,i);
        list.next();
    }
    list.begin();
    
    line(width, 0, width, height);
    line(0, height, width, height);
}

function update(node,i){
    //node.coord[0] += 1; //increment pos

    if(!inBounds(node.coord[0])){
        node.coord[0] = -dists[i];
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