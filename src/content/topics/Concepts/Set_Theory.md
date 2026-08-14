---
title: Set Theory
description: Understanding how to group things and the properties that follow.
category: concept
tags:
  - set_theory
seeAlso:
---
Set theory is the mathematical idea of putting things into collections and seeing what properties may arrise from those collections. Let us define a simple set of numbers, $S$, that contains the number $1, 2, 3$:
$$
S=\left\{1, 2, 3\right\}
$$
We are now prepared to ask questions about this set. Lets ask a few questions.
1. Is the number $2$ in the set $S$?
2. Is the number $4$ in the set $S$?
3. If any element of the set $S$ were to be squared, would that value be greater than or equal to $10$?

 The first two questions are simple to answer, and we can do so with some simple notation. We use the $\in$ symbol to mean "in", so $1\in S$ means "the number $1$ is in the set $S$". Similarly we can put a strike (meaning "not") through the symbol to mean "not in", like $4 \not \in S$.

The third question is a bit more abstract, because we want to answer a question about the entire set. To do this, we will use the $\forall$ symbol (an upside-down A) meaning "for all". The answer, first in text, looks like this: For all members $x$ in the set $S$, it is true that $x^2 < 10$. With some mathematical notation is would look like this:
$$
\left\{\forall x \in S: x^2<10\right\}
$$
Again: For all $x$ in $S$, $x^2 < 10$. The colon is a seperator.

There is a similar operator to $\forall$, which is "exists" $\exists$. Instead of all members of a set needing to comply with a bound, only one or more members must comply. Try to understand this:
$$
\left\{\exists x \in S : 2x \geq 4\right\}
$$
"There exists $x$ in $S$ that satisfies the condition $2x \geq 4$". This of course is true, because $2(2)=4$ and $3(2)=6$. 

# Set-Builder Notation
Set-builder notation is the general notation that we use to define a set, which was implied above. To define a set of elements, we use curly braces surrounding the elements. If a $\dots$ is present, that means that we intend the defined pattern to continue either indefinitely or to a point.
$$
\begin{flalign}
	S_{1}=\left\{1,2,3\right\} \\
	S_{2}=\left\{1,2,3,\dots\right\} \\
	S_{3}=\left\{3,6,9,\dots,102,105\right\}
\end{flalign}
$$
The set $S_1$ contains only $1,2,3$. The set $S_2$ contains all positive integers incrementing by $1$. The set $S_3$ contains the positive integers divisible by $3$ until $105$.

# The Empty Set
When we are defining sets, we must define what an empty set looks like. An empty set is a set with no elements, and is commonly denoted with the greek phi, $\phi$.
$$
\phi = \left\{\right\}
$$
# Set Operators
There are many operators of sets which let us interact and modify sets.
## Subsets
Let $A=\left\{1,2,3,4,5\right\}$, and let $S$ be a subset of $A$. This means that $S$ will have some combination of the elements of $A$. For this example it is not important which elements, but it must only have elements from $A$. This is handy because this guarentees that if element $e\in S$ then $e\in A$. We again can show this with some new notation.

First we have the subset character, $\subset$. We can show that $S$ is a subset of $A$ with this character.
$$
S \subset A
$$
The second character is the implies arrow, $\implies$. This arrow means that "if the thing on the left is true, then the thing on the right must be true". We can use it to show the above property of the element $e$ in the subset.
$$
e\in S \implies e\in A
$$

## Proper Subsets
A *proper subset* is a subset of a set that is not equal to it.
$$
A \subset B \ \text{ and }\ A \neq B \implies A \subsetneq B
$$
## Set Equality
Two sets are said to be equal if they are subsets of each other.
$$
A \subset B \ \text{ and }\  B \subset A \implies B = A
$$
## Unions of Sets
Two sets can be combined with the union operator, $\cup$.
$$
A \cup B = \left\{x : x \in A \text{ or } x \in B\right\}
$$
## Intersection of Sets
The intersection of sets $A$ and $B$ is the following:
$$
A \cap B = \left\{x : x \in A \text{ and } x \in B \right\}
$$
## Set Difference
The set difference of $A$ with respect to $B$ is set of elements that are only found in $A$.
$$
A \setminus B = \{ x \in A \,\text{ and }\,x \not \in B \}
$$
## Set Compliment
The compliment of a set is the set of all elements that are not in A.
$$
A^c = \{ x : x\not\in A \}
$$

You may also see the notation $A'$.
# Sources
- https://www.youtube.com/watch?v=LY7YmuDbuW0&list=PLUl4u3cNGP61O7HkcF7UImpM0cR_L2gSw
- How to Prove It: A Structured Approach, Third Edition by Daniel J. Velleman
