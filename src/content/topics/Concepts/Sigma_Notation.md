---
title: Sigma Notation
description: Exploring different sets of numbers and introductory set theory.
category: concept
tags:
seeAlso:
---

A capital Greek sigma is the notation used for a summation statement, also called sigma notation. It looks like this:
$$
\sum_{}^{}
$$
Summation statements are powerful tools that let us examine how functions act 

In order to use this powerful tool, we must define three things.
1. What index to start at
2. What index to stop at
3. The thing we are iterating through
Those things are placed in these respective spots:
$$
\sum_{1}^{2}3
$$
Here is an example summation statement that will sum 1, 2, and 3.
$$
\sum_{n=1}^{3}n=1+2+3=6
$$
We simply substitute our value of $n$ into the equation, evaluate it, and then add it to the sum total. We could also evaluate the sum of cubes the numbers 3 and 4.
$$
f(x)=x^3; \sum_{n=3}^{4}f(n)=3^3+4^3=91
$$
Summation statements really are that simple!

If you are familiar with for loops in programming languages, then you are already familiar with the concept! This is an example for loop that is the same as summing 1, 2, and 3 together.

```go
sum := 0
for i := 1; i <= 3; i++ {
    sum += i
}
return sum
```
