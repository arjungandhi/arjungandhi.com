---
title: "Scripting my existince"
date: 2023-05-31 
description: "mmmmm scripting so many flavors" # TODO:
tags:
  - bash 
  - linux
  - unix philosphy
  - go
categories:
  - code 
draft: true # TODO
---
# The Blurb

I scripted in bash/go alot. 

# Links:
- [the small random ones](https://github.com/arjungandhi/dot/tree/master/scripts)
- [zet](https://github.com/arjungandhi/zet)
- [list](https://github.com/arjungandhi/list)
- [magellan - wip](https://github.com/arjunandhi/magellan)

<end-tldr>

# The Dream

So I've had this dream for a really long time... 

Imagine a system where you could build really small apis and link them together inorder to create really complex behavior, and you could use timers to run those linked apis on a timer and ohmygoditwouldbeamazing. 

So for about a year I went down the rabbit hole of kubernetes, argo, distributed computing, and more. Turns out that building a Jarvis is hard... and expensive.

After another year of sitting with my finger in my butt tyrna figure out how to do any of this I stumbled upon a video by [rwxrob](https://github.com/rwxrob), he talked about how you could use filters to transform text in vim. And that was all I needed tip the boulder that sent me tumbling down the scripting rabbit hole.

# 3 weeks later

I have discovered just how *cracked* linux's [Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) really is specifically bash [filters](https://bash.cyberciti.biz/guide/Filters). It's

Turns out my dream had already been designed, implemented, open sourced, and made completely free by some Finnish Dude in the 90's. Go figure.

Anyway bash filters are awesome so I'm gonna do a bit of a dive into em here mostly for my own entertainment. 

## What is filter

A filter in it's basic form is pretty simple. It's any command that takes input data from the `standard input` and outputs the result to `standard output`. 

## Why is a filter

This was the part that made this click for me. 
