let on, off, len, dimsx, dimsy, dims, play, dir;

function setup() {
	createCanvas(1000,200);

	len = 8;
	play = 0;
	dir = 1;

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
        on.push(new Node(null, null, loadImage('img/logo' + i + '.png'), [dist, 50], i));
        dist += dims[i-1];
        console.log('img/logo' + i + '.png in ON');
        i++;
    }

    while(i < len+1){
    	off.push(new Node(null, null, loadImage('img/logo' + i + '.png'), [dims[i-1],50], i));
    	console.log('img/logo' + i + '.png (' + dims[i-1] + ') in OFF');
    	i++;
    }
}

function draw() {
	background(255);
	while(on.curr != null){
        image(on.curr.value, on.curr.coord[0], on.curr.coord[1], dims[on.curr.ind-1], height-100);

        update(on.curr);
        on.next();
    }
    on.begin();

	line(width, 0, width, height);
    line(0, height, width, height);
}

function update(node) {
	if(play == 1){
		node.coord[0] += dir;
	}
	if(!inBounds(node.coord[0])){
		node.coord[0] = dims[node.ind-1]; //nullify x coord
		console.log("ON -->  OFF: " + node.ind);
        off.push(on.pop(node)); //pop from on, push to off
        console.log("ON: " + printLL(on));
		console.log("OFF: " + printLL(off));
    }

    //console.log("OFF Logo " + off.head.ind + ": " + off.head.coord[0]);
    //console.log("ON Logo " + on.head.ind + ": " + on.head.coord[0]);
    if(!off.isNull() && on.head.coord[0] > off.head.coord[0]){
    	off.head.coord[0] *= -1; //set the coord
    	console.log("OFF -->  ON: " + off.head.ind);
    	on.push(off.pop(off.head)); //pop from off, push to on
    	console.log("ON: " + printLL(on));
    	console.log("OFF: " + printLL(off));
    	
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

function printLL(l){
	var list = l.copyList();
	var str = "[";
	while(list.curr!= null){
		str += ("Logo " + list.curr.ind) + ", ";
		list.next();
	}
	str += "]";
	return str;
}

function keyPressed() {
	if(keyCode == LEFT_ARROW){
		dir = -1;
	}
	else if(keyCode == RIGHT_ARROW){
		dir = 1;
	}
	else if(keyCode == RETURN){
		if(play == 0){
			play = 1;
		}else{
			play = 0;
		}
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