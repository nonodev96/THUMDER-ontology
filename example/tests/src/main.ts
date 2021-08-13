class Parent {
    autoPlay() {
        this.play("automatically "); // call child method
    }

    play(x: string) {
        console.log(x + "playing default from " + this.constructor.name);
    }
}

class ChildA extends Parent {
    // does not override play
}

class ChildB extends Parent {


    play(x: string) {
        console.log(x + "playing " + "this.song" + " from tus muertos");
    }
}

const child1 = new ChildA();
child1.autoPlay();

const child2 = new ChildB();
child2.autoPlay();