---
title: "Swol Kat"
date: 2021-05-10
description: "Building a Quadruped, I think"
tags:
  - robots
categories:
  - robots
draft: false
---

Hi, welcome to a culmination of the last 4 years of my education, a robot kat that theoretically walks. 

# The Goal 

So we like every other soon-to-be-college-grad, thought we were gods and said, we're gonna build a walking quadruped, how hard could it be?

MIT did it in like 10 years.

Our school has never really done it well.

So like we can pull it off in one. Right? 

....   
.....
......
.......
........

The goal of this project was simple: build a quadruped that could do both a dynamic and static wallking gait. 

With that in mind, I grabbed 4 friends and we gave it our best shot.

# Some Background 

## Why in the world is it named Swol Kat? 
Err....This one's on me. Last year, a couple friends of mine had attempted to make a servo-based quadruped called [Small Kat](https://hackaday.io/project/164727-smallkat-an-adorable-dynamics-oriented-robot-cat). 
Since our team wanted to use big, strong, power-dense [BLDCs](renesas.com/us/en/support/engineer-school/brushless-dc-motor-01-overview) I said .... AS A JOKE  
> Hey we should call our project Swol Kat... cause it's like Small Kat but you know [Swol](https://www.urbandictionary.com/define.php?term=swol)

So then we started referring to the project as Swol Kat.... then we called it Swol Kat to our future advisors .... and then .... we registered it as the official name of our project. So its Swol Kat I guess. 

## What did I do on the project? 
On this project, I focused on software and controls of the robots. As such, I'm gonna talk mostly about software and controls. One because that's what I did. Two the electronics are controlled by angry pixies and I've yet to unlock the pixie wrangler skillset. If you're a big fan of pixies, feel free to read our 75 page long [paper](PLEASE PUT A LINK HERE DONT FORGET).

# How to make a motor go brr

## What we need
So the core of this project are the actuators. Finding actuators that can do what we need to do is surprisingly difficult: you need high torque and low rpm actuators which haven't been magicked into existence by overworked researchers yet. The traditional engineering approach says for us to build a quadruped we must first do all the surrounding math and use that math to determine the ideal actuator and control system needed. However there’s a few problems with that.

- Dynamic quadruped math was outside the scope of our senior thesis. While it's an area I hope to explore in the future, it would probably have driven my team up a wall to hold up the entire project while learning a new field.

- Spending all this time on trying to design or make this perfect actuator is a distraction from the real point of the project. Our goal is to make a quadruped walk, not design a beautiful robotics actuator. Other teams that have pulled off this project have had 3-4 years worth of iterations and testing to get something to a workable state. We didn't have that time, so rather than trying to reinvent the wheel, we are trying to piggy back off as much previous work as possible.

## What we are using
After reading through the papers on MIT's [Mini Cheetah](https://build-its.blogspot.com/2019/12/the-mini-cheetah-robot.html) and Stanford's [Doggo](https://github.com/Nate711/StanfordDoggoProject), we ~~copied them and~~ settled on using the [Turningy Multistar 9225 160kv BLDC](https://hobbyking.com/en_us/9225-160kv-turnigy-multistar-brushless-multi-rotor-motor.html?queryID=&objectID=40516&indexName=hbk_live_magento_en_us_products) they were right in the range of what previous projects had used and, even better, my roommate had 8 of them just lying around. We paired these motors with the Odrive Controllers previous projects had success with 

(Unrelated: Odrive was created in a demon lair and sucks the life out of your soul. To make it slightly less painful, I wrote a tuner tool that you can read more about [here](/projects/robots/odrive-tuner)). 

After wrestling with the tuning gods (aka days of dedicated grind time), I got some pretty cool position control working: 
{{< youtube BdbSvHMulOI >}}

# ~~Arms~~, ~~Legs~~, Thing that the robot stand on