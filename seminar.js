let on, off, text;

function preload() {
	text = loadStrings('seminar.txt');
}
function setup() {
	createCanvas(800,800);

	on = new LinkedList(null,null);
	off = new LinkedList(null,null);

}

function draw() {
	background(255);
}

class Seminar {
	constructor(date, title, venue, loc) {
		this.date = date;
		this.title = title;
		this.venue = venue;
		this.loc = loc;
	}
}

class Node {
    constructor(next, prev, value, coord, ind) {
        this.next = next;
        this.prev = prev;
        this.value = value;
        this.coord = coord;
        this.ind = ind;
    }

    isEqual(node) {
    	return this.ind == node.ind;
    }

    drawNode() {
    	fill(182, 127, 127);
    	rect(this.coord[0], this.coord[1], width/2, 100);
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

    prev() {
    	this.curr = this.curr.prev;
    }

    //jump to head
    begin() {
        this.curr = this.head;
    }

    //pops given node and returns
    pop(node) {
    	if (node.next != null && node.prev != null) {
    		var next = node.next;
	    	var prev = node.prev;
	    	prev.next = next;
	    	next.prev = prev;

	    	node.next = null;
	    	node.prev = null;
    	}
    	else if (node.isEqual(this.head)) {
    		//implies prev is null
    		if(node.next != null){
    			this.head.next.prev = null;
    			this.head = this.head.next;
    		}
    		else{//means prev and next are null
    			this.head = null;
    		}
    		node.next = null;
    	}
    	else if (node.isEqual(this.end)) {
    		//implies next is null
    		this.end.prev.next = null;
    		this.end = this.end.prev;
    		node.prev = null;
    	}
    	return node;
    }

    //add to head, loc = 0, end loc = 1
    push(node, loc) {
        if(this.head == null){
            this.head = node;
            this.curr = node;
            this.end = node;
        }
        else if(loc == 0){
        	this.head.prev = node;
        	node.next = this.head;
        	this.head = this.head.prev;
        }
        else if(loc == 1){
        	this.end.next = node;
        	node.prev = this.end;
        	this.end = this.end.next;
        }
    }

    copyList() {
    	return new LinkedList(this.head, this.end);
    }

    isNull() {
    	return this.head == null;
    }

    /*set() {
        this.end.next = this.head;
    }*/
}