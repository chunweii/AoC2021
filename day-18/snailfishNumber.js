"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnailfishNumber = void 0;
class SnailfishNumber {
    constructor(head, tail) {
        this.head = head;
        this.tail = tail;
    }
    static createSnailfishNumber(head, tail) {
        const isHeadSnailfish = (head instanceof SnailfishNumber);
        const isTailSnailfish = (tail instanceof SnailfishNumber);
        const result = new SnailfishNumber(isHeadSnailfish ? head : [head], isTailSnailfish ? tail : [tail]);
        if (isHeadSnailfish) {
            head.parent = result;
            head.isHeadOfParent = true;
        }
        if (isTailSnailfish) {
            tail.parent = result;
            tail.isHeadOfParent = false;
        }
        return result;
    }
    isExplodable() {
        return !(this.head instanceof SnailfishNumber || this.tail instanceof SnailfishNumber || this.parent === undefined);
    }
    explode() {
        if (this.head instanceof SnailfishNumber || this.tail instanceof SnailfishNumber || this.parent === undefined) {
            throw new Error("This must be a pair of numbers" + this.toString());
        }
        const head = this.head[0];
        const tail = this.tail[0];
        // left
        let availableSnailfish = this.parent;
        let headOfParent = this.isHeadOfParent;
        while (availableSnailfish !== undefined && headOfParent) {
            headOfParent = availableSnailfish.isHeadOfParent;
            availableSnailfish = availableSnailfish.parent;
        }
        if (availableSnailfish !== undefined) {
            if (availableSnailfish.head instanceof SnailfishNumber) {
                availableSnailfish.head.getRightmostNumber()[0] += head;
            }
            else {
                availableSnailfish.head[0] += head;
            }
        }
        // right
        availableSnailfish = this.parent;
        let tailOfParent = !this.isHeadOfParent;
        while (availableSnailfish !== undefined && tailOfParent) {
            tailOfParent = !availableSnailfish.isHeadOfParent;
            availableSnailfish = availableSnailfish.parent;
        }
        if (availableSnailfish !== undefined) {
            if (availableSnailfish.tail instanceof SnailfishNumber) {
                availableSnailfish.tail.getLeftmostNumber()[0] += tail;
            }
            else {
                availableSnailfish.tail[0] += tail;
            }
        }
        // Set to 0
        if (this.isHeadOfParent) {
            this.parent.head = [0];
        }
        else {
            this.parent.tail = [0];
        }
    }
    getLeftmostNumber() {
        let result = this.head;
        while (result instanceof SnailfishNumber) {
            result = result.head;
        }
        return result;
    }
    getRightmostNumber() {
        let result = this.tail;
        while (result instanceof SnailfishNumber) {
            result = result.tail;
        }
        return result;
    }
    split(head) {
        if (head) {
            if (this.head instanceof SnailfishNumber)
                throw new Error("cannot split non simple number");
            const num = this.head[0];
            this.head = SnailfishNumber.createSnailfishNumber(Math.floor(num / 2), Math.ceil(num / 2));
            this.head.parent = this;
            this.head.isHeadOfParent = true;
        }
        else {
            if (this.tail instanceof SnailfishNumber)
                throw new Error("cannot split non simple number");
            const num = this.tail[0];
            this.tail = SnailfishNumber.createSnailfishNumber(Math.floor(num / 2), Math.ceil(num / 2));
            this.tail.parent = this;
            this.tail.isHeadOfParent = false;
        }
    }
    toString() {
        let str = "[";
        if (this.head instanceof SnailfishNumber)
            str += this.head.toString();
        else
            str += this.head[0];
        str += ",";
        if (this.tail instanceof SnailfishNumber)
            str += this.tail.toString();
        else
            str += this.tail[0];
        str += "]";
        return str;
    }
    getMagnitude() {
        let headNum = 0;
        if (this.head instanceof SnailfishNumber) {
            headNum = 3 * this.head.getMagnitude();
        }
        else {
            headNum = 3 * this.head[0];
        }
        let tailNum = 0;
        if (this.tail instanceof SnailfishNumber) {
            tailNum = 2 * this.tail.getMagnitude();
        }
        else {
            tailNum = 2 * this.tail[0];
        }
        return headNum + tailNum;
    }
    getCopy() {
        let newHead;
        if (this.head instanceof Array) {
            newHead = this.head[0];
        }
        else {
            newHead = this.head.getCopy();
        }
        let newTail;
        if (this.tail instanceof Array) {
            newTail = this.tail[0];
        }
        else {
            newTail = this.tail.getCopy();
        }
        return SnailfishNumber.createSnailfishNumber(newHead, newTail);
    }
}
exports.SnailfishNumber = SnailfishNumber;
