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

Hi, welcome to a culmination of the last 4 years of my education, a robot kat that thereortically walks. 

# The Goal 

So we like every other soon to be college grad, thought we were gods and said, we're gonna build a walking quadruped, how hard could it be?
MIT did it in like 10 years.
Our school has never really done it well.
So like we can pull it off in one. Right?....   

So really the goal of this project was simple, build a quadruped that could do both a dynamic and static wallking gait. 

With in mind I grabbed 4 competent friends and we gave it our best shot.

# Some Background 

## Why in the world is it named Swol Kat? 
Err.... This one's on me. Last year a couple friends of mine had attempted to make a sevo-based quadruped called [Small Kat](https://hackaday.io/project/164727-smallkat-an-adorable-dynamics-oriented-robot-cat). 
Since our team wanted to use big, strong, powerdense [BLDCs](renesas.com/us/en/support/engineer-school/brushless-dc-motor-01-overview) I said .... AS A JOKE  
> Hey we should call our project Swol Kat... cause it's like Small Kat but you know Swol

So then we started refering to the project as Swol Kat.... then we called it Swol Kat to our future advisors .... and then .... we registered it as the official name of our project. So its Swol Kat I guess. 

## What did I do on the project. 
On this project I focused on software and controls of the robot, as such I'm gonna talk mostly about software and controls. One becaue thats what I did. Two the electronics are controlled by angry pixies and I'm not a pixie wrangler, and three the mechanical designer has some complicated stuff going on in the legs of this thing and it sounds like a lot of effort to explain it all. If you're super curious about those sections feel free to read our 75 page long [paper](PLEASE PUT A LINK HERE DONT FORGET).

# How to make a motor go brr

## What we need
So the core of this project are the actuators, finding actuators that can do what we need is surprisingly difficult, you need high torque, low rpm actuators and for those of you that aren’t robotics students, thats not a thing. Colleges and students trying to design robust actuators has hot spot in research for ages. Now traditional engineering approach says for us to build a quadruped we must first do all the math about it and use that math to determine the ideal actuator and control system needed. However there’s a few problems with that.

- I have no idea how to do that math. Dynamics of quadrupeds is a hard problem and being honest with you as some one that has never had to touch anything over basic dynamics in my undergraduate education it would be funny but probably annoying to hold up the entire project while my team attempts to figure out how to do the math.

- Spending all this time on trying to design or make this perfect actuator is a distraction from the real point of the project, our goal is to make a quadruped walk not design a beautiful robotics actuator. Other teams that have pulled off this project have had 3-4 years worth of iterations and testing to get something to a workable state. We didn't have that time, so rather than trying to reinvent the wheel, we are trying to piggy back off as much previous work as possible.

## What we are using
After reading through the papers on MIT's [Mini Cheetah](https://build-its.blogspot.com/2019/12/the-mini-cheetah-robot.html) and Stanford's [Doggo](https://github.com/Nate711/StanfordDoggoProject), we ~~copied them and~~ settled on using the [Turningy Multistar 9225 160kv BLDC](https://hobbyking.com/en_us/9225-160kv-turnigy-multistar-brushless-multi-rotor-motor.html?queryID=&objectID=40516&indexName=hbk_live_magento_en_us_products) they were right in the range of what previous projects had used and even better my roommate had 8 of them just lying and so we hippity hoppity your motor is now our propertied that into our robot. To pair with this motor we went with the Odrive Controller previous projects have had good success with this (don't do this they suck I wrote this section before I truly understood how much). 

## Applying brr

Being honest with you, our motor controller selection is where everything went wrong. For this project we used the ODrive motor controllers (no I'm not linking to them, I hate them, and they suck). But you know I saw them in a Micheal Reeves video and thought they would be a good idea. Also like Stanford used them and their [thing](https://github.com/Nate711/StanfordDoggoProject) could a backflip. Also at the time everyone hadn't started producing [Ben Katz's sexy motor controllers](https://github.com/bgkatz/3phase_integrated) yet. 

So we began the long painful journey of trying to make this stupid motor controller spin. In order to preven me from blowing up the expensive motors, we started with a tiny motor. After a like 2 **weeks** of suffering with settings and pleading on the ODrive discord for help, I eventually got the stupid thing to control the motor, though tuning it was another nightmare.

{{< youtube KpVeFrApOGs >}}

WOO progress. Then pain...

For some reason getting the bigger motor working and tuned is was even more painful than the first. After the nightmare of attempting to tune the first motor my seratonin bananna craving brain kicked in so I applied yeet and wrote a tuner tool. But like most of my projects, I force my self to learn a bunch of mildy useful skills. So I decided I wanted a pretty looking Web Gui that could communicate over my wifi network to the pi that would control the robot. 

After a week of head bashing I ended up with a pretty sexy looking tool, read more about that [here](/projects/robots/odrive-tuner)

This got me to a working working final motor quicker, although that also had loads of tuning headaches as well. But in the end I got some pretty cool position control working below. 
{{< youtube BdbSvHMulOI >}}

# ~~Arms~~, ~~Legs~~, Thing that the robot stand on