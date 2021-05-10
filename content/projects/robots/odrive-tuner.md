---
title: "Odrive Tuner Tool"
date: 2021-05-9
description: "OverKill Web Tuner"
tags:
  - pretty-please
  - html
  - css
  - javascript
categories:
  - robots
draft: false
---


The interface to the ODrive controller is a python library with some pretty painful to use CLI tools, and after about a month of suffering, I had gotten pretty tired with creating jank python scripts to change and modify my parameters and struggling with the lack of decent feedback for if my tunes were any good. 

So I decided to go complete overview overkill and build like a semi decent GUI that could do all sorts of fancy things.  

**A forwarning:** Writing this after 8 months of becoming a better coder and after becoming much more familiar with the tuner tool theres alot of jank stuff, I did that ~~absolutely should~~ could be better. If you're super gungho about wanting to do use it let me know and if I have time or you buy me coffee, I'll go through and fix all those broken things (its only a little bit of modification). Also this was my first time doing like 90% of this local webbrowser as a control UI thing so I'm definately not following any of those best practice things. 

# How does it work? 

In preperation for communicating with my actual robot I wanted to make this thing fast, work over wifi, and pretty. So given I was more comfortable with webdevelopment than actual the UI tools in python I decided to make this tool browser based.

The first library I found that seemed to do a decent job at this and didn't suck to use was [Socket.io](https://socket.io/). I used that in combination with [Flask](https://flask.palletsprojects.com/) to create a websocket and then deploy some static html, javascript, and css files to the connected users browsers.

# How did you make it have such nice colors
I wrote a CSS framework a whileback based on the [Nord](https://www.nordtheme.com/) color pallete, check it out [here](AHHHH WRITE THIS LINK AND PUT IT)

# Results 

## Stuff that Works
- Connecting to, Rebooting and Clearing Errors of the ODrive.
- Live Reporting on any errors that occurred for the axis that was being
worked on.
- Live Readout of Encoder Position, Voltage, and Current State.
- Ability to set a variety of Axis States and Control Modes.
- Seeing and Setting Position, Velocity and Current setpoints.
- Seeing and Setting Gains and Config of the ODrive.
- Live Graphing of Position, Velocity, and Current setpoints and positions.
- A debugging log to display useful information

You can find the github repo (and a picture) for the tool [here](https://github.com/swol-kat/odrive-tuner/blob/master/README.md)

## Stuff to be Added
- Work with both Odrive Axis at once, currently only works with one and code needs to be changed to make it work with the other. 
- Allow user to config all the various Odrive parmeters not just the one's I hard coded in. 
- Handle Odrive reboots

