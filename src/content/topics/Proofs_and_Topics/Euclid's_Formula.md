---
title: Euclid's Formula
description: Generating every Pythagorean triple from a pair of integers.
category: proof
tags:
  - number-theory
  - geometry
seeAlso:
  - concepts/pythagorean_theorem
draft: true
---

Euclid's Formula is one which allows the generation of arbitrary Pythagorean Triples. It is as follows:

$$
\begin{align}
    \text{Let } m>n>0 \ \text{and } n,m \in \Bbb Z. \\
    a=m^{2}-n^{2},\ \,b=2mn,\ \,c=m^{2}+n^{2}
\end{align}
$$


Pick $m = 2,\ n = 1$ as the smallest possible pair to generate the triple (3, 4, 5):

$$
\begin{align}
    a = 2^2 − 1^2 = 3 \\
    b = 2 (2*1) = 4 \\
    c = 2^2 + 1^2 = 5
\end{align}
$$

# Sources
- https://mathcs.clarku.edu/~djoyce/java/elements/bookX/propX29.html
