

//
// Note that this is supposed to run from command line.
// Do not use anything besides pause, control.runInBackground, console.log
//

// pause(2000)
type Action any;
type uint8 number;
type int8 number;
type uint16 number;
type int16 number;

namespace control {
	function runInBackground(f: ()=>void): void {
		f();
	}

	function dmesg(s: string): void {
	}
}

function pause(t: number) {
}

function msg(s: string): void {
    console.log(s)
    control.dmesg(s)
    //pause(50);
}

msg("start!")

function assert(cond: boolean, m?: string) {
    if (!cond) {
        msg("assertion failed: ")
        if (m) {
            msg(m)
	}

        throw m;
    }
}

//
// start tests
//

let glb1: number;
let s2: string;
let x: number;
let action: Action;
let tot: string;
let lazyAcc: number;
let sum: number;
let u8: uint8
let i8: int8
let u16: uint16
let i16: int16

let xyz = 12;


let hasFloat = true
if ((1 / 10) == 0) {
    hasFloat = false
}

class Testrec {
    str: string;
    num: number;
    _bool: boolean;
    str2: string;
}

function clean() {
    glb1 = 0
    s2 = ""
    x = 0
    action = null
    tot = ""
    lazyAcc = 0
    sum = 0
}
class StaticCl {
    static x = 12;
    static foo() {
        glb1 += StaticCl.x
    }
    static bar(k: number) {
        StaticCl.x = k
    }

    static doSomething: (v:number) => void;
}

function testStatic() {
    msg("testStatic");
    glb1 = 0
    StaticCl.foo()
    assert(glb1 == 12, "s0")
    StaticCl.bar(13)
    StaticCl.foo()
    assert(glb1 == 25, "s1")

    StaticCl.doSomething = (x) => {
        assert(x == 42, "s42")
    }
    StaticCl.doSomething(42)
}
testStatic()
clean()
msg("test OK!")
