---
title: PEMDAS & BODMAS
description: Mnemonic devices to help remember elemtary order of operations.
category: concept
tags: [addition, subtraction, multiplcation, division, exponentiation]
seeAlso: []
updated: 2026-08-03
---

The mnemonic device PEMDAS and BODMAS are used to remember the order of operations for elementary functions in mathematics. 

PEMDAS stands for:
- Parenthesis
- Exponentiation
- Multiplication
- Division
- Addition
- Subtraction

BODMAS stands for:
- Brackets
- Orders (Exponents)
- Division
- Multiplication
- Addition
- Subtraction

Because [multiplication and division] and [addition and subtraction] are commutative sets (meaning they can be done in any order), some teachers encourage the acronym to be written as such:

```
P
E
MD
AS
``` 

## Phrases 
There exist some common phrases used to help remember order of operations:
- Please Excuse My Dear Aunt Sally
- Purple Elephants Might Destroy A School

## Examples

Lets look at some examples of how an order of operations acronym is used with the following example:
$$
10-5*2 + (2 +4) +2^3 +1 \div 3
$$
If we were to blindly execute these operations from left to right (ignoring parenthesis), we would get the incorrect answer of 24. Let us again calculate this expression by following the steps of PEMDAS.
1. Parenthesis, execute all steps inside parenthesis

   $$10-5*2 + \mathbf{6} +2^3 +1 \div 3$$
2. Exponentiation, evaluate all exponents 

   $$ 10-5*2 + 6 + \mathbf{8} +1 \div 3$$
3. Multiply & Divide

   $$ 10- \mathbf{10} + 6 + 8 + \mathbf{\frac{1}{3}}$$
4. Add & Subtract

   $$ 14 \frac{1}{3}$$

When solving an expression with PEMDAS it is important to recognise that the first P (or B in BODMAS) is recursive, meaning that when you solve an expression inside of brackets that you must continue to apply the PEMDAS order of operations.

Incorrect, does not follow recursive order of operations:

$$ 2*1+(2+3*4)\not=22 $$

Correct, follows recursive order of operations:

$$ 2*1+(2+3*4)=16 $$
