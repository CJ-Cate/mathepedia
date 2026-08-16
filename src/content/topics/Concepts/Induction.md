---
title: Induction
description: Proving a statement for every natural number by establishing a base case and a step that carries each case to the next, with the well-ordering property behind it and a worked example.
category: concept
tags:
  - logic
  - proof-techniques
prerequisites:
  - concepts/sigma_notation
seeAlso:
  - concepts/proof_by_contradiction
  - concepts/sets_of_numbers
---

Induction is a technique used to prove statements, where you need to prove a base case and the base+1 case. It can be thought of like a ladder or staircase, where you need to prove the first step and then prove how to get to the next step.

One way of showing the idea of induction is this:
$$
\begin{align}
 & 1.\ \text{Prove the base case }	P(1) \\
 & 2.\ \forall n \in \Bbb N : P(n) \implies P(n+1)
\end{align}
$$
If we can prove the base case and that $P(n) \implies P(n+1)$ then we can show that we can get on the ladder and that each step will lead to the next.

# Theorem
The set of natural numbers $\Bbb N = \{ 1,2,3,\dots \}$ has an ordering, meaning that each subsequent element is larger than the prior.

Axiom: Well ordering property of $\Bbb N$.
$$
\begin{align}
     & \text{ If } S \subset \Bbb N \text{ and } S \neq \phi \text{ then } S \text{ has a smallest element.} \\
	 &  \exists x\in S,\  \forall y\in S: x\leq y
\end{align}	
$$

Let $P(n)$ be a statement depending on $n\in \Bbb N$. Assume the following:
1. Base case: $P(1)$ is true
2. Inductive step: If $P(m)$ is true then $P(m+1)$ is true
Then $P(n)$ is true for all $n \in \Bbb N$.

# Example Proof

Prove the following:
$$
1+2+3+\dots+n=\sum_{x=1}^nx=\frac{n(n+1)}{2}
$$
We proceed by induction. The base case of $n=1$:
$$
1=\frac{1(1+1)}{2}
$$
We use the inductive step to show the $(n+1)$-th case. Assume $P(n)$ holds, then:
$$
\begin{align}
1+2+3+\dots+n+(n+1)
  &= \frac{n(n+1)}{2}+(n+1)
     &&\quad \text{inductive hypothesis} \\[4pt]
  &= \frac{n(n+1)+2(n+1)}{2}
     &&\quad \text{common denominator} \\[4pt]
  &= \frac{(n+1)(n+2)}{2}
     &&\quad \text{factor out } (n+1) \\[4pt]
  &= \frac{(n+1)\big((n+1)+1\big)}{2}
     &&\quad = P(n+1)
\end{align}
$$

Therefore $\sum_{x=1}^nx=\frac{n(n+1)}{2}$.
