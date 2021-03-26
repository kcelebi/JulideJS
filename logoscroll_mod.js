let on, off, len, dimsx, dimsy, dists;

function setup() {
	createCanvas(1000,200);

	dimsx = [225,338,224,546,360,216,800,640];
    dimsy = [225,149,225,155,228,206,800,480];
    dists = []

    on = new LinkedList(null,null);
    off = new LinkedList(null,null);

    var dist = 0;
    var i=1;
    while(dist < width){
    	var div = dimsy[i-1]/(height-100); 
        list.push(new Node(null, null, loadImage('img/logo' + i + '.png'), [dist, 50]));

        dist += dimsx[i-1]/div;
        dists.push(dimsx[i-1]/div);
        i++;
    }

    while(i < len+1){
    	off.push(new Node(null, null, loadImage('img/logo' + i + '.png'), [null,50]))
    	i++;
    }
}

function draw() {
	background(255);

	line(width, 0, width, height);
    line(0, height, width, height);
}

function update(node, i) {
	node.coord[0] +=1;

	if(!inBounds(node.coord[0])){
        node.coord[0] = -dists[i];
    }
}

//index i tells dist from i to i+1
function createDists() {
	for(var i=0; i < len-1; i++){
		dists[i] = dimsx[i+1] + 50;
	}
}

function inBounds(x) {
    if(x > width){
        return false;
    }
    return true;
}

class Node {
    constructor(next, prev, value, coord) {
        this.next = next;
        this.prev = prev;
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

    //pops given node and returns
    pop(node) {
    	var next = this.node.next;
    	var prev = this.node.prev;
    	this.prev.next = next;
    	this.next.prev = prev;

    	return node;
    }

    //add to end
    push(node) {
        if(this.head == null){
            this.head = node;
            this.curr = node;
            this.end = node;
        }
        else{
            this.end.next = node;
            node.prev = this.end;
            this.end = this.end.next;
        }
    }

    /*set() {
        this.end.next = this.head;
    }*/
}