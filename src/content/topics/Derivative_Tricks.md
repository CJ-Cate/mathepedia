---
title: Derivative Tricks
description: A collection of derivatives with convenient answers.
category: concept
tags:
seeAlso:
---

In calculus 1, students are taught about the definition of a derivative, $f'(x)=\frac{f(x+h)-f(x)}{h}$, which is used to generically define the derivative of a function $f$. This definition is useful because it is able to differentiate any function $f$ at any point $x$, but in certain situations also simplifies nicely for all points $x$; this is a collection of those functions.

#### Simple Rules

$\frac{d}{dx}[c]=0$

$\frac{d}{dx}[x]=1$

$\frac{d}{dx}[c*f(x)]=c*\frac{d}{dx}[f(x)]$

$\frac{d}{dx}[f(x)+g(x)]=\frac{d}{dx}[f(x)]+\frac{d}{dx}[g(x)]$

#### Power Rule

$\frac{d}{dx}[x^n]=nx^{(n-1)}$

#### Product Rule

$\frac{d}{dx}[f(x)g(x)]=f'(x)g(x)+f(x)g'(x)$

#### Quotient Rule

$\frac{d}{dx}\left[ \frac{f(x)}{g(x)} \right]=\frac{f'(x)g(x)-f(x)g'(x)}{g(x)^2}$

#### Chain Rule

$\frac{d}{dx}[f(g(x))]=f'(g(x))*g'(x)$

#### Natural Number (e) Rules

$\frac{d}{dx}[e^x]=e^x$

$\frac{d}{dx}[e^{cx}]=ce^{cx}$

$\frac{d}{dx}[\ln(x)]=\frac{1}{x}$


#### L'Hopital's Rule

If $\lim_{ x \to a } f(x)$ and $\lim_{ x \to a } g(x)$ both approach $0$ or both approach $\pm\infty$, then:

$\lim_{ x \to a } \frac{f(x)}{g(x)}=\lim_{ x \to a }\frac{f'(x)}{g'(x)}$

#### Trigonometric Functions

$\frac{d}{dx}[\sin (x)]=\cos(x)$

$\frac{d}{dx}[\cos(x)]=-\sin(x)$

$\frac{d}{dx}[\tan(x)]=\sec^2(x)$

$\frac{d}{dx}[\sec(x)]=\sec (x)*\tan(x)$

$\frac{d}{dx}[\csc(x)]=-\csc(x)*\cot(x)$

$\frac{d}{dx}[\cot(x)]=-\csc^2(x)$

#### Inverse Trigonometric Functions

$\frac{d}{dx}[\sin^{-1}(x)]=\frac{1}{\sqrt{ 1-x^2 }}$

$\frac{d}{dx}[\cos^{-1}(x)]=-\frac{1}{\sqrt{ 1-x^2 }}$

$\frac{d}{dx}[\tan^{-1}(x)]=\frac{1}{1+x^2}$

$\frac{d}{dx}[\csc^{-1}(x)]=-\frac{1}{x\sqrt{ x^2-1 }}$

$\frac{d}{dx}[\sec^{-1}(x)]=\frac{1}{x \sqrt{ x^2-1 } }$

$\frac{d}{dx}[\cot^{-1}(x)]=-\frac{1}{1+x^2}$
