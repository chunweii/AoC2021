**Credits to reddit.**

The code is very similar for all 14 inputs. All variables will be initialised to 0, except for z.
z acts as a base-26 number, which we can represent as a stack.

The general code is as follows:
```
inp w
mul x 0
add x z
mod x 26
div z {a := 1 | 26}
add x {b}
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y {c := 0 .. 16}
mul y x
add z y
```
Which can be simplified to the following:
```
w = input()
x = z (mod 26) + b
z = z (div a)
x = x != w
z = z * (25 * x + 1)  ## multiply by 26 if x == 1
z = z + (w + c) * x ## only add if x == 1
```
We will only add a base-26 digit to `z` when `x != w`. Note that `w + c` is always a positive number less than 26. Also, note that there are 7 instances where `a` is 1 and 7 instances where `a` is 26.

`z` can be represented by a stack of base-26 digits. 

When `a` is 1, we do not change the value of `z`. In this case the value of `b` is always positive and more than 9. Therefore, it will always be the case that `x != w` since w is less than 10. This means that a digit `w + c` will be pushed to the `z` stack.

When `a` is 26, we pop of the top value of `z` (least significant base-26 digit). In this case the value of `b` is always negative, so we can find some value of `w` equal to the popped digit plus `b`. We do not consider the case when `x != w` since that will add another digit to our stack, which will result in a non-empty stack after we finish all 14 inputs, so `z` would not be 0 at the end.

My input:
```
INPUT 0:
    (1, 14, 14): add i(0) + 14 to the stack
    STACK:
    i(0) + 14

INPUT 1:
    (1, 14, 2): add i(1) + 2 to the stack
    STACK:
    i(1) + 2
    i(0) + 14

INPUT 2:
    (1, 14, 1): add i(2) + 1 to the stack
    STACK:
    i(2) + 1
    i(1) + 2
    i(0) + 14

INPUT 3:
    (1, 12, 13): add i(3) + 13 to the stack
    STACK:
    i(3) + 13
    i(2) + 1
    i(1) + 2
    i(0) + 14

INPUT 4:
    (1, 15, 5): add i(4) + 5 to the stack
    STACK:
    i(4) + 5 
    i(3) + 13
    i(2) + 1
    i(1) + 2
    i(0) + 14

INPUT 5:
    (26, -12, 5): pop i(4) + 5 from the stack
    STACK:
    i(3) + 13
    i(2) + 1
    i(1) + 2
    i(0) + 14
    KNOWN EQN:
    i(4) + 5 - 12 = i(5)

INPUT 6:
    (26, -12, 5): pop i(3) + 13 from the stack
    STACK:
    i(2) + 1
    i(1) + 2
    i(0) + 14
    KNOWN EQN:
    i(4) + 5 - 12 = i(5)
    i(3) + 13 - 12 = i(6)

INPUT 7:
    (1, 12, 9): add i(7) + 9 to the stack
    STACK:
    i(7) + 9
    i(2) + 1
    i(1) + 2
    i(0) + 14
    KNOWN EQN:
    i(4) + 5 - 12 = i(5)
    i(3) + 13 - 12 = i(6)

INPUT 8:
    (26, -7, 3): pop i(7) + 9 from the stack
    STACK:
    i(2) + 1
    i(1) + 2
    i(0) + 14
    KNOWN EQN:
    i(4) + 5 - 12 = i(5)
    i(3) + 13 - 12 = i(6)
    i(7) + 9 - 7 = i(8)

INPUT 9:
    (1, 13, 13): add i(9) + 13 to the stack
    STACK:
    i(9) + 13
    i(2) + 1
    i(1) + 2
    i(0) + 14
    KNOWN EQN:
    i(4) + 5 - 12 = i(5)
    i(3) + 13 - 12 = i(6)
    i(7) + 9 - 7 = i(8)

INPUT 10:
    (26, -8, 2): pop i(9) + 13 from the stack
    STACK:
    i(2) + 1
    i(1) + 2
    i(0) + 14
    KNOWN EQN:
    i(4) + 5 - 12 = i(5)
    i(3) + 13 - 12 = i(6)
    i(7) + 9 - 7 = i(8)
    i(9) + 13 - 8 = i(10)

INPUT 11:
    (26, -5, 1): pop i(2) + 1 from the stack
    STACK:
    i(1) + 2
    i(0) + 14
    KNOWN EQN:
    i(4) + 5 - 12 = i(5)
    i(3) + 13 - 12 = i(6)
    i(7) + 9 - 7 = i(8)
    i(9) + 13 - 8 = i(10)
    i(2) + 1 - 5 = i(11)

INPUT 12:
    (26, -10, 11): pop i(1) + 2 from the stack
    STACK:
    i(0) + 14
    KNOWN EQN:
    i(4) + 5 - 12 = i(5)
    i(3) + 13 - 12 = i(6)
    i(7) + 9 - 7 = i(8)
    i(9) + 13 - 8 = i(10)
    i(2) + 1 - 5 = i(11)
    i(1) + 2 - 10 = i(12)

INPUT 13:
    (26, -7, 8): pop i(0) + 14 from the stack
    STACK:
    KNOWN EQN:
    i(4) + 5 - 12 = i(5)
    i(3) + 13 - 12 = i(6)
    i(7) + 9 - 7 = i(8)
    i(9) + 13 - 8 = i(10)
    i(2) + 1 - 5 = i(11)
    i(1) + 2 - 10 = i(12)
    i(0) + 14 - 7 = i(13)
```

Solving the equations to find possible values:
```
KNOWN EQN:          Left    Right
i(4) - 7 = i(5)     [8, 9]  [1, 2]
i(3) + 1 = i(6)     [1, 8]  [2, 9]
i(7) + 2 = i(8)     [1, 7]  [3, 9]
i(9) + 5 = i(10)    [1, 4]  [6, 9]
i(2) - 4 = i(11)    [5, 9]  [1, 5]
i(1) - 8 = i(12)    [9, 9]  [1, 1]
i(0) + 7 = i(13)    [1, 2]  [8, 9]
```

Problem 1 solution (get all max values): 29989297949519

Problem 2 solution (get all min values): 19518121316118
