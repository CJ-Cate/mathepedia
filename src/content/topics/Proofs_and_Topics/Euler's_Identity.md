---
title: Euler's Identity
description: Why $e^{i\pi}+1=0$ holds, worked from the power series definition of the exponential function.
category: proof
tags:
  - calculus
  - imaginary-numbers
seeAlso:
  - concepts/eulers_constant
  - concepts/exponentials
---

The following is Euler's Identity:
$$
e^{i\pi}+1=0
$$
It is notable at least in part for its apparent absurdity. The claim is being made that three famous constants $e$, $i$, and $\pi$ are able to configure themselves such that they are equal to $-1$. The idea that this mix of irrational and imaginary numbers has any right to equate to something so simple can be hard to believe upon first glance, but I assure not only that it is true but that all methods of deriving its certainty are nothing except extraordinary.

*Writer's note: At time of writing I have met two people who have Euler's Identity as a tattoo. It is the claim of one of them that this is likely the most common math tattoo.*

## Method One: Euler's Formula

In order to understand where Euler's Identity can be found, we must understand what it means to raise $e$ to the power of $i\pi$. At face value it is unintuitive to raise an irrational number ($e$) to another irrational number ($\pi$), let along the product of $\pi$ and and $i$. 

First lets substitute $e^x$ for its alternate notation $exp(x)$ which more clearly shows $e$ as a function of which accepts inputs. It is now much easier to ask what is the definition of this exponential function? There are of course many ways to represent the exponential function, but the one which will lead us to our success is the power series definition.
$$
\exp(x)=\sum_{n=0}^{\infty} \frac{x^n}{n!}
$$



Euler's Identity is, as it turns out, a specific value of Euler's Formula equated at the value $\pi$. Euler's Formula is as such:
$$
e^{ix}=\cos(x)+i\sin(x)
$$
