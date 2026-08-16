---
title: Proof by Contradiction
description: The proof technique of assuming the negation of what you want to prove and following it until something breaks, with a worked example showing there is no largest integer.
category: concept
tags:
  - logic
  - proof-techniques
seeAlso:
  - proofs_and_topics/euclids_theorem
---

A proof by contradiction is a popular proof in mathematics due to its flexibility. Let's use an example in which we know that statement $A$ is true and want to figure out if statement $B$ is true. There are two possibilities: $B$ is true or false. Let's say that we assume $B$ is false; from starting with the assumption that $B$ is false if we can prove that $A$ is false under that assumption, then we have reached a contradiction and $B$ must be true.

More concisely, you are assuming that the negation of the statement that you want to prove is true to arrive at a false statement.

It is important when writing a proof by contradiction that you establish that you are working towards a contradiction. The following phrase is overwhelmingly common: Towards a contradiction suppose (something).

# Example

Prove that there is no largest integer.

Towards a contradiction suppose that there is a largest integer, $n$. Addition is closed over the set of integers, so $n+1$ is also an integer. Because $n+1 > n$, we reach a contradiction and there is no largest integer.