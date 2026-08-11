---
title: Divisibility
description: What it means for one number to divide another, defined through multiplication rather than division, with worked proofs of the basic properties.
category: concept
tags:
  - number-theory
seeAlso:
  - concepts/sets_of_numbers
---

test
A number is said to divide another number if that number is an integer multiple of that number. For example, 5 divides 30 because there exists the integer 6 that can be multiplied with 5 to get 30. We notate this as such:
$$
5\ |\ 30
$$
Formally it is defined like this:
>A number $n$ is said to divide $m$ if there exists an integer $k$ that satisfies $m=nk$.
$$
a\ |\ b \leftrightarrow \exists k\in\Bbb Z, a*k=b
$$

It may seem repetive to define divisibility when we already have division as a standard arithmatic operator, but notice that we have not used any division here! Multiplication is generally a much more versatile tool than divison because it does not have restrictions like divison does (cannot divide by zero, division is not a "closed operation").

Of course dividing by zero is easy to avoid when you have known values, but if all you know about a number $x$ is that it is an integer then asserting that $y=2 \div x$ may not be correct.

# Proofs with Divisibility

#### Prove that if $a\ |\ b$ and $a\ |\ c$ that $a\ |\ (b-c)$.
If $a\ |\ b$ and $a\ |\ c$ then there exists integers $k_1,k_2$ such that $ak_1=b$ and $ak_2=c$. So $a\ |\ (b-c)$ can be rewritten as $a\ |\ (ak_1-ak_2) = a\ |\ a(k_1-k_2)$. Because $k_1,k_2 \in \Bbb Z$ and the set of integers is closed over subtraction then the difference between them is also an integer. By definition a number will divide an integer multiple of iteself, so this is true. 
   
