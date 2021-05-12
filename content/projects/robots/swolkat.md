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

## Designing the thing

Okay, so you know those cool robot arms in factories? What if you were to take them flip them upside down and attach them together. You'd get a horrifying moster of a quadruped. But it is a quadruped. Unrelated.... if you ever get coffee with me ask me about the **hexcavator pod**. 

Anyway a quadruped is really just 4 robotic arms strapped together. So to make a full quadruped you need to first make one good leg. Pro-tip from some one who's suffered through this, test the hell out of your leg, make it do all of the motions put it under load , the whole shabang. Due to time constraints on our project we only checked that we could move the thing right and thats bit us in the ass as you'll read later. 

Okay, I have a series of questions for you. 

1. How many degrees of freedom do you need in a quadruped leg?
2. Where do the motors go? 
3. How do you correctly transmit power to the places that need them?

I'll be expecting your answers in my office at 08:00 sharp.

.....

For the rest of you slackers I guess I'll explain to you our answers. 

{{< figure src="http://orthopets.com/wp-content/uploads/2018/03/coparison.jpg" alt="image" caption="okay but how funny is it that some artist had to draw a human in this position" class="left" >}}

This is a dog. Interms of anatomy (dogs, cats, cheetahs, horses, humans) their all basically the same.

Since we are trying to make a quadruped that walks we figured we should start with an animal that already does it. So dogs have 4 degrees of freedom in their legs. 2 in the hips 1 in the knee and 1 in the ankle. So we decided to copy that and gave the dog 3 DOF legs. 

Now the brightest among you might notice that 4 != 3. You are indeed correct. The ankle joint in quadruped movment while useful for fast movements and storing energy is really just a extra bit of complexity that we really don't need in this project. So we like most quadrupeds have chosen to ignore it for now. 

Now in order to design a quadruped leg of your own that may work the solution is simple. 

Step 1: Find a mechanical deisgner friend who likes to spend all his time in CAD.   
Step 2: Make him do it. 

Bingo bango Boongo 6-9 months later and you've given birth do to a beautiful leg. 

{{< figure src="https://lh3.googleusercontent.com/pw/ACtC-3dEu7uQ0Hs4QXj8ZQXgpfMyLkHhgkUM9zaTkIhxtrU9RUOzXXmifiONb0085s7lSvzzdq-rh1wIh0vLMpcZbTne-966jjmfxCuS-xVSKb-L64B4enbnHmMXXmlcIuLJO-ie_ynaoxXmX1oMSJMAlT2O=w1911-h981-no?authuser=0" alt="image" caption="cad model of our final leg">}}


## Making it move

Okay, so while my partners were working on designing and builidng the real robot I wanted to be doing something too. So I began writing the code base. 

Okay, so my goal when writing this code base was 2 fold: 
1. I wanted to be able to run a virtual version of the leg and the real leg with the same code. 
2. I didnt want to have to completely rewrite this code for the full quadruped. 


{{< figure src="https://lh3.googleusercontent.com/0bGFX2fN2gmQA8O9m2bXUV2tQ8baFFYrWFy0BtlsuFBjBJO3vbZjobl9SkgdRILouBkfo5DMwF5m3WjEeUUB8oEnGjMj9z4jLOyI5YuooQGXDN4m_2EmrIbq54FbEk5ShN959hB44bohNJiY2rkZkUahCP4vIMEcms8kPkmAGtlc-VheQLZZtoXFjTaGKKn1BrEVvUUg0GXQ8oVOngEnmwC5QfZMCgdfnVf_vN2KNOU5g7IB0aQjHnerS4T4L88kewh0SjR00a1W9iLbm47awWiPYgazCzWTu-FPZEFfB04D-7xQgxD_UQ2mSXZZFbAdFALpIfEPT9EnfdhG7XKUzfkFwqVw57XiMyO7SqwmIDs1CtdT62eqdpQrhwf7SaRaW1ZZLOGcbAAWg36TU9I4w2ShFkowFrRTD-EFwVaZH9snEyWrMkCMEiLOJ4uljM4UE6WQkNQWavBb0ycVG_57ST7d4a_pZisyyOmcTBV5oIcAY4qaQBvpWvt_8A-GMhYs5yer0guLebJHagD8GrPO5eDnyEkEUZk1BUfbEfKsdPIW-oAph8hY0jiNgqz5sLVup3_QYX-ndCWiUhXOBDAsycnBLDdI-S-ewzUFj0HqG9MFLAyzsg3rfGt704SIvDeEf0u1bEYV425LIHlwOKnFgr-se7QsgeDf9EFSP7VEdHMX7OP4WTrfGGwLxzafgisoPnSElWeS0qzQTVxPg0Fz-to=w481-h258-no?authuser=0" alt="image" class="left" >}}

So I came up with this cute little class structure. There's a couple cool things about this. Notice how the leg class, can send values to either the Joint or the Virtual Joint. Basically I created 2 joint objects, one communicates with the actual controller we are using, and the other just pretends to communicate to the controller. You can make the leg with any combinations of the two and the leg class will just work. This structure proved to just be the best. It allowed me to completely test all my math on virtual legs and with in a few moment run any number of joints to see if they were working as I wanted. 

The other nice thing is you could create a variety of joint objects to communicate with all sorts of different controllers, as long as it followed the base class structure it would just **work** 

Now yes yes this is the basis of object oriented design, but you'd be suprised how quick that goes out the window the minuite any real hardware is involved. 

As normal after a couple weeks of attempting to debug via a terminal and print statements, I got fed up. 

So like last time I created another web GUI to control and test the leg. 
{{< figure src="https://lh3.googleusercontent.com/pw/ACtC-3ey3tCB-Qxgi5WBq5tSq_-vyysVr27GClmcYaJxecmLssKdOsFivD0c6zGaAzQGZSKXJZpWXNez2q2MSAxkiL2d8AlZHnoWrNbGH8U2lgMHma-efg93QctIuns9dByUqY01TlVMfIHe3dfbDpL3gkn2=w1769-h986-no?authuser=0" alt="image">}}

This Gui had all the neat features of the last tool I made and testing way easier it also was able to show the live position of the robot arm in the browser it's self. 

## The Math. DUN DUN DUN

Generally when your moving a robot arm around you want to be able to control where the end of it is and how the end of it moves (task space). Unfortuantely, we can only control the angles of each joint of the robot (joint space). Because of this we need to do some math, and figure out how to convert between joint space and task space. 


For postion this conversion is called Forward and Inverse Kinematics and are a pretty well studied thing in robotics.

Unfortunately sometimes position control just doesnt cut it. Sometimes you want to be able to control the velocity, and forces on the end effector (tip) as well. 
Again we have math that can do this, and is generally known as Velocity Kinematics. (Velocity Kinematics lets us do both velocity and force control on the robot)

I'm not gonna rederive the math for them here, if you want to see how it was done you can find it all in our [paper](link), (its alot of matrixies)

The end result of this with a little bit of trajectory generation and gait control (I'll cover this later) is 

{{< youtube mMwvLhEuTUQ >}}

(I found out later that we accidently set the currently limit on the motors to like 2 amps which meant it was struggling to move the leg around in the air, keep reading the steps look alot cooler later on)

# Now do it again but more. 
