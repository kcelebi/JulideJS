let on, off, len, dimsx, dimsy, dims;

function setup() {
	createCanvas(1000,200);
	len = 8;

	dimsx = [225,338,224,546,360,216,800,640];
    dimsy = [225,149,225,155,228,206,800,480];
    dims = preCalcDims();

    console.log("Calculating Dims");
    console.log(dims);
    on = new LinkedList(null,null);
    off = new LinkedList(null,null);

    var dist = 0;
    var i=1;
    while(dist < width){
        on.push(new Node(null, null, loadImage('img/logo' + i + '.png'), [dist, 50]));
        dist += dims[i-1];
        console.log('img/logo' + i + '.png in ON');
        console.log("Dist: " + dims[i-1]);
        i++;
    }

    while(i < len+1){
    	off.push(new Node(null, null, loadImage('img/logo' + i + '.png'), [dims[i],50]));
    	console.log('img/logo' + i + '.png in OFF');
    	i++;
    }
}

function draw() {
	background(255);
	var i=0;
	while(on.curr != null){
        image(on.curr.value, on.curr.coord[0], on.curr.coord[1], dims[i], height-100);

        update(on.curr,i);
        on.next();
        i++;
    }
    on.begin();

	line(width, 0, width, height);
    line(0, height, width, height);
}

function update(node, i) {
	node.coord[0] +=1;
	if(!inBounds(node.coord[0])){
		node.coord[0] = dims[i]; //nullify x coord
        off.push(on.pop(node)); //pop from on, push to off
    }
    //console.log("onhead: " + on.head.coord[0]);
    //console.log("offhead: " + off.head.coord[0]);
    console.log('on.head: ' + on.head == null);
    console.log('off.head: ' + off.head == null);
    if(on.head.coord[0]+50 > off.head.coord[0]){
    	off.head.coord[0] *= -1; //set the coord
    	on.push(off.pop(off.head)); //pop from off, push to on
    }
}

function inBounds(x) {
    if(x > width){
        return false;
    }
    return true;
}

function preCalcDims() {
	var newdims = [];
	for(var i=0; i < len; i++) {
		var div = dimsy[i]/(height-100);
		newdims.push(dimsx[i]/div);
	}
	return newdims;
}

class Node {
    constructor(next, prev, value, coord) {
        this.next = next;
        this.prev = prev;
        this.value = value;
        this.coord = coord;
    }

    isEqual(node) {
    	return this.value == node.value;
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
    		var next = this.node.next;
	    	var prev = this.node.prev;
	    	this.prev.next = next;
	    	this.next.prev = prev;
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