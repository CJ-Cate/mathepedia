---
title: Functions
description: How functions map inputs to outputs, from notation and the formal set-theoretic definition through inverse, injective, surjective, and bijective functions.
category: concept
tags:
  - set-theory
  - functions
prerequisites:
  - concepts/set_theory
seeAlso:
---

A function is a method of converting an input to an output. A simple function would output whatever it receives as input.
$$
x \to x
$$
Most commonly the letter $x$ is used to represent the input variable. This is helpful because $x$ can represent the entire domain of inputs and act as an easily manipulatable object.

Functions are commonly notated with a letter followed by parenthesis containing the variable they use, then the function definition.
$$
f(x)=2x+3
$$
Here the letter is $f$, the variable is $x$, and the definition is $2x+3$. The most common letter to name a single function is $f$, but there is no strict requirement as such. There is also no limit to the amount of variables that a function can have as an input. The following are also valid functions.
$$
\begin{align}
 & f(x,y)=2xy+y^2 \\
 & g(x)=x^2 \\
 & \Gamma(x)=x!
\end{align}
$$
# Definition of a Function
If $A, B$ are sets, the function $f:A\to B$ is a mapping that assigns members of $x\in A$ to an element $f(x)\in B$.

When discussing the sets that exist around a function $f$, there are three generally accepted sets:
1. The domain
2. The codomain
3. The range (or image)
The domain is the set of all possible inputs to the function, and the codomain is the set of all possible outputs of the function. The range is the set of all outputs that the function will actually output, which if the function is surjective is the same as the codomain.
## Inverse Functions
Functions are widely thought of as transforming *input* into *output*. The inverse process of this would be transforming *output* into *input*. Not every function has an inverse.

Said mathematically, if a function maps $A$ to $B$, then the inverse function, if it exists, maps $B$ to $A$.
$$
\begin{align}
f &: A \to B \\
f^{-1} &: B \to A
\end{align}
$$

## Injective Functions
A function is injective, or one-to-one, if it guarantees that each output has a unique input. The function $f : \Bbb R \to \Bbb R, f(x)=x$ is injective because each output has a unique input, but the function $f: \Bbb R \to \Bbb R, f(x)=x^2$ is not injective because there is more than one input for a given output. 

### Definition
Suppose $f:A\to B$. The function $f$ is considered injective if
$$
\forall a_{1},a_{2} \in A :f(a_{1})=f(a_{2}) \to a_{1} = a_{2}
$$

There are some alternate phrasings of this statement as well.
By the contrapositive:
$$
\forall a_{1},a_{2} \in A :a_{1}\neq a_{2} \to f(a_{1})\neq f(a_{2})
$$
With the use of negation:
$$
\neg\exists a_{1},a_{2}\in A :f(a_{1})=f(a_{2}) \land a_{1}\neq a_{2}
$$



## Surjective Functions
A function is surjective, or onto, if every element of the codomain is able to be output by the function. 

A function $f:A\to B$ is called surjective, or onto, if
$$
\forall b\in B, \exists a \in A : f(a)=b
$$
This guarantees that the entire codomain is covered.
## Bijective Functions
A function $f:A\to B$ is called bijective if it is both one-to-one and onto.


# Sources, Courses, and External Resources
- Pierce, Rod. "Domain, Range and Codomain" Math Is Fun. Ed. Rod Pierce. 12 Dec 2025. 15 Aug 2026 <https://www.mathsisfun.com/sets/domain-range-codomain.html>