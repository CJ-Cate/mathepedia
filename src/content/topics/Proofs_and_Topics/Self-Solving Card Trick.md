---
title: Self-Solving Card Trick
description: A simple card trick that uses algebra to look like magic
category: proof
tags:
  - algebra
  - arithmetic
seeAlso:
---

The card trick is as follows:
1. Place a card face-up to create a pile. If it is a face card or ace, remove it to the bottom of the deck in your hand and begin step 2 again.
2. Take note of the current card's numerical value, call it $n$. Add $13-n$ cards in the pile. You can do this by counting from $n$ to 13 by placing a card on each count.
3. Repeat steps $1,2$ until you cannot create any more piles.
4. Flip over all piles so that they are face-down.
5. Choose any $2$ piles of cards and turn the top card face-up. Sum the numerical values of those cards and add an extra $10$.
6. Discard the total sum you received from the previous step into a discard pile.
7. The amount of cards remaining in your hand will be equal to the numerical value of the top card of the unflipped pile, which can be dramatically revealed.

Let's break down how this works. First, we can simplify this procedure so that we only originally create 3 piles of cards, since every other pile is being returned to our hand anyways.

The optimised procedure for the trick is as follows:
1. Place a card face-up to create a pile.
2. Take note of the current card's value $n$ (A=1, J=11, Q=12, K=13). Add $13-n$ cards in the pile. You can do this by counting from $n$ to 13 by placing a card on each count.
3. Repeat steps $1,2$ until you create 3 piles.
4. Flip over all piles so that they are face-down.
5. Choose any $2$ piles of cards and turn the top card face-up. Sum the numerical values of those cards and add an extra $10$.
6. Discard the total sum you received from the previous step into a discard pile.
7. The amount of cards remaining in your hand will be equal to the numerical value of the top card of the unflipped pile.
# Explanation

Let $a,\,b,\,c$ be the "seed card" of each pile. Each seed card is a numerical card from a standard deck. The piles are notated with $p_{a}\,,\ p_{b}\,,\ p_{c}$ for each respective seed card. 

Each pile $p_n$ has $13-n+1$ cards in it, because each pile is made by adding $13-n$ cards on top of the seed card.
$$
p_n = 13-n+1 = 14-n
$$
The reveal of the trick can be represented with the following statement, for any combination of the piles.
$$
\text{(amount of cards in hand)} - (a + b + 10) = c
$$

What we need to find is the amount of cards in your hand dependent on $a,\,b,\,c$.
$$
\begin{align}
\text{amount of cards in hand} &= 52-p_{a}-p_{b}-p_{c} \\
 & = 52-(14-a)-(14-b)-(14-c) \\
 & = 10+a+b+c
\end{align}
$$
This is where the 'magic number' $10$ comes from. Now all we have to do is ensure that the equality is true.
$$
\begin{align}
     \text{(amount of cards in hand)} - (a+b+10) & =c \\
	 (10+a+b+c) - (a+b+10) & =c \\
	 c & =c
\end{align}
$$
Thus the card trick can be reduced to a simple algebra statement.