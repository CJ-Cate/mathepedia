---
title: Sets of Numbers
description: Exploring different sets of numbers and introductory set theory.
category: concept
tags:
 - set-theory
 - imaginary-numbers
seeAlso:
---
Like many things in life, numbers can be sorted into different groupings called sets. The most common set of numbers is likely the set of natural numbers. This set of numbers starts at 1 and continues by increments of 1 forever, but does not contain infinity.

$$
\Bbb N = \{1, 2, 3, 4, 5,\dots\}
$$

There are many different sets of numbers other than the set of natural numbers shown above. Some of them are shown below.
- $\Bbb Z$, the set of all integers
- $\Bbb Q$, the set of all rational numbers (fractions)
- $\neg \, \Bbb Q$, the set of irrational numbers (not fractions)
- $\Bbb R$, the set of all real numbers (fractions and not fractions)
- $\Bbb C$, the set of all complex numbers
- $\Bbb I$, the set of all imaginary numbers

Sets are used in many parts of mathematics as a useful tool for proofs, as a common organisational structure, and even in an entire field of math dedicated to studying them called set theory! For example, if you want to ask the question "is a number part of the set of natural numbers?" you can do so by using the "in" ($\in$) operator.
$$
5 \in \Bbb N \\
3.14 \not\in \Bbb N
$$

# A More Rigorous Definition of Number Sets
To understand more about sets of numbers, each set must be properly defined.

### The Natural Numbers $\Bbb N$
The set of natural numbers, $\Bbb N$, is defined as follows:
$$
\begin{align}
	\Bbb N = \{1, 2, 3, 4,\dots\}
\end{align}
$$
Having brackets around the numbers denotes that it is a set, and the trailing ellipsis notation shows that the established pattern continues indefinitely. 

### The Integers $\Bbb Z$
The set of all integers, $\Bbb Z$, contains all positive and negative whole numbers and zero.
$$
\begin{align}
	\Bbb Z = \{\dots,-2,-1,0,1,2,\dots\}
\end{align}
$$
Notably this is the first set here that contains zero. Also of note is that the set of all integers is said to *contain* the set of natural numbers. Said differently, the set of natural numbers is a subset of the integers. This will not be explicitly noted each time, but will be a trend going forward. 
$$
\begin{align}
	\Bbb N \in \Bbb Z
\end{align}
$$
### The Rationals $\Bbb Q$
The next set is the set of rational numbers, $\Bbb Q$. The set is defined as such:
$$
\begin{align}
	\Bbb{Q} = \left\{ \frac{p}{q} \mid p, q \in \Bbb{Z}, q \neq 0 \right\}
\end{align}
$$
In plaintext, a number is rational if it can be represented as a fraction. (Note $q \neq 0$ because fractions must have a non-zero denominator.) This also encompasses the integers, because you may pick any integer $p$ with a denominator of $1$. 

### The Irrationals $\neg\,\Bbb Q$ 
The irrational set, $\neg\,\Bbb Q$ (not $\Bbb Q$) is simple: it is the negation of the rational set. Any number that can be represented as a rational number is simply not an irrational number and vise versa. Common examples of irrational numbers include pi ($\pi$) (approx. 3.142) and the golden ratio, phi ($\phi$) (approx. 1.618). Because by definition irrational numbers cannot be represented as fractions, the well-known ones are commonly represented as Greek characters to represent their value.

### The Reals $\Bbb R$
The set of real numbers is the simple union (combination) of the rational set and the irrational set. This set of numbers encompasses any number that does not have a complex component.
$$
\begin{align}
	\Bbb R = \Bbb Q \,\cap\, \neg \,\Bbb Q
\end{align}
$$
### The Complex Numbers $\Bbb C$
Finally the complex set, $\Bbb C$. A complex number is a number with a real part and an imaginary part.
$$
\begin{align}
	\Bbb C = \{a+bi \ |\ a,b\in\Bbb R\}
\end{align}
$$

### The Imaginary Numbers $\Bbb I$
As a corollary to complex numbers existing as a pair of both a real and imaginary number, there exists a set of only imaginary numbers as well.
$$
\begin{align}
	\Bbb I = \{ai \ |\ a\in\Bbb R\}
\end{align}

$$

## Popular Colloquialisms and Contradictions
Although mathematics exists as a pure concept, written mathematics is a form of language; and like all language, written mathematics has developed different standards at different places. 

One of the least standardised parts of number sets is likely the definition of the natural numbers. The concept is that it is natural to start counting at 1 and therefore the natural numbers start at 1, however this method of counting is most popular in the West. It is equally reasonable to start counting at 0, leading to the accidental creation of two distinct sets of natural numbers.
$$
\begin{align}
	\Bbb N_{0} = \{0, 1,2,3,\dots\} \\
	\Bbb N_{1} = \{1,2,3,4,\dots\}
\end{align}
$$
To attempt to remedy this there is the set of whole numbers, $\Bbb W$, although it seems to be less popular than the natural number set.
$$
\begin{align}
    \Bbb W = \{0, 1, 2, 3,\dots\}	
\end{align}
$$
If you wish to maintain absolute clarity in your mathematics, the simplest set that could be said to be universally standard is the set of integers, $\Bbb Z$. There exists some accepted notation that can be used to define the set of natural numbers and the set of whole numbers from this set, shown below.
$$
\begin{align}
	\Bbb N_{1} = \Bbb Z^+ = \{1, 2, 3, 4,\dots\} \\
    \Bbb W = \Bbb N_{0} = \Bbb Z_{0}^+ = \{0, 1, 2, 3, \dots \} 
\end{align}
$$
The first set, $\Bbb Z^+$, could be said as "the set of all positive integers", and the second, $\Bbb Z_{0}^{+}$, as "the set of all non-negative integers". The notation of putting a plus in the top corner of a set is quite common to refer to only the positive values of the set, as well as a minus to refer to only the negative values of that set.
