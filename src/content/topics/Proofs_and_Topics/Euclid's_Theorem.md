---
title: Euclid's Theorem
description: The proof that the prime numbers never run out, and the flawed retelling of it that circulates widely.
category: proof
tags:
  - number-theory
prerequisites:
  - concepts/divisibility
seeAlso:
---

Euclid's theorem proves that there are infinite prime numbers. The proof uses a tactic called "proof by cases", which checks all possible cases (2 in this case) and confirms whether something is true or false. In the case of Euclid's proof, we start with an assumption that we will disprove in every case if it were true.

# Explained Proof
It starts like this: Assume that there is a finite amount of prime numbers. If this were the case we could put them all in a list. Let's use $P$ to represent the number that we would get if we multiplied every value in this list together. We will also assign $q$ the value of $P+1$.
$$
\begin{align}
    P = p_{1}*p_{2}*p_{3}*\dots*p_{n} \\
    q=P+1 	
\end{align}	
$$
Now, even though we dont know the exact value of $q$, there are two possibilities for it: either it is a prime number or it is not a prime number; these are the two cases we will look at. 

1. If $q$ is prime, then the list of prime numbers that we used to create $P$ is incomplete. Therefore there must be an infinite amount of primes.
2. If $q$ is not prime, then it must have at least 1 prime factor $p$ that is a multiple of $q$. Because this factor is prime, it must appear in our list.
   
   So $p$ is a factor of both $q$ and $P$, and it can be shown that if a number is a factor of two numbers, then it is also a factor of the difference between those numbers. (see [Divisibility](/topics/concepts/divisibility/)) 


# Proof
Assume there are a finite amount of prime numbers, then we could define a finite list of those prime numbers $p_1,p_2,...,p_n$. Let $P=p_1*p_2*...*p_n$. Let $q=P+1$.
1. If $q$ is prime then there is at least 1 prime not in the list, $q$ itself, and we have reached a contradiction.
2. If $q$ is not prime then there must be at least 1 prime factor $p$ that divides $q$. Then $p$ must be present in the list of primes. 
   
   It is simple to show that is two numbers are divided by the same factor, then that factor must also divide the difference of those factors. ([Proof](/topics/concepts/divisibility/)). 

   So $p$ divides both $P$ and $q$, so it must divide the difference of them. This difference is $P-q=P-(P+1)=1$. A number can only divide $1$ if it itself is $1$, therefore $p=1$ and is not prime, which is a contradiction. 
## Common Fallacy
An alternate and incorrect version of the second case is commonly distributed. It is as follows:
2. 

Counter example:
$$
30031=(2*3*5*7*11*13)+1=59*509
$$

# Sources 
- https://en.wikipedia.org/wiki/Euclid%27s_theorem#Euclid's_proof
- https://proofwiki.org/wiki/Euclid's_Theorem
