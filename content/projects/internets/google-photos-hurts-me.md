---
title: "Google Photos Hurts Me "
date: 2021-07-19
description: "pain"
tags:
  - html
  - javascript
  - suffering
  - reverse engineering
categories:
  - internets
draft: false
---

Listen, I know normally when I start projects I start off the deep end then keep going, but I swear. This one started out normal. 

All I wanted to do. was embed an itsy bitsy little carousel with my photos and videos a projects into this site. I keep my photos in google photos, because its good, and you know its **Google** they had this feature like 10 years ago or what ever with Picasa. There's no way they just chucked that feature out the windows and watch the world burn right? (<- *they totally fucking did those rat bastards*)

# the katabasis

Okay, but like surely there's a third party service that just you know turns your photo album link, into a little photo carousel, and bobs your uncle. 

[There is!](https://www.publicalbum.org/blog/) 

This guy's tool does it! But it doesn't auto update.... every time you upload a new photo you gotta re run and re copy and paste his snip it in....... and you can't do videos.

That sounds like effort. 
  
    

Okay you know google's got their cloud services. They've probably got a great photo's API. I used their cloud compute services all of like one time but I'm pretty handy with AWS, I'm sure it'll be fine. 

{{< figure src="https://i.imgur.com/8fNIfjn.png" >}}

Oh what the fuck its a public link sharing album why the hell do I need OAuth?



Okay fuck fuck uhhhh. github... yeah yeah... everyone has a github! there's no way there's not some nerd that wrote a npm package or something that just does this perfectly no questions asked. 

Ah. shit is that PHP. Who even uses that anymore.


# arjun starts reverse engineering googles shit. 

Okay so turns out the public google photos have like a permanent public link to em, and a get request to the album link and a a little bit a regex and you can pretty easily figure them out. 

All the urls look like this

```
https://lh3.googleusercontent.com/pw/ACtC-3ey3tCB-Qxgi5WBq5tSq_-vyysVr27GClmcYaJxecmLssKdOsFivD0c6zGaAzQGZSKXJZpWXNez2q2MSAxkiL2d8AlZHnoWrNbGH8U2lgMHma-efg93QctIuns9dByUqY01TlVMfIHe3dfbDpL3gkn2=w1769-h986-no
```

Even nicer that `wXXX-hXXX` you see at the end of the url let you specify a size to pull the image in. Literally 10 line of javascript I was done easy project. 


## enter hell

See I wanted to also have my little photo carousel have videos. 

Why? 

Well while pictures of robots are good. videos are gooder. 

Also

```python
#!/bin/python
import random

word = "good"
picture = 1000*word
seconds = random.randint(0,100)

video = picture * 60 * seconds 

>>> "goodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgood"
```

Okay, so after staring 

