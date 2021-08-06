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

Listen, I know I normally start projects off the deep end and then keep going, but I swear this one started out normal. 

All I wanted to do was embed an itsy bitsy little carousel with project photos and videos into this site. All it had to do was neatly display pictures and live update from the Google Photos album I use for storage. It's **Google** - They had this embed feature like 10 years ago with Picasa. There's no way they just chucked that feature out the windows and watched the world burn right? [(<- *They totally fucking did those rat bastards*)]

# Part I: The Katabasis

Okay, but like surely there's a third party service that just turns your photo album link into a little photo carousel.

[There is!](https://www.publicalbum.org/blog/) 

This guy's tool does it! 
....But it doesn't auto-update from album changes
....And you can't do videos

Building from scratch still sounds like too much effort. 
  
    
Okay, Google's got their cloud services. They've probably got a great Google Photos API. I used their cloud compute services all of like one time but I'm pretty handy with AWS, I'm sure it'll be fine. 

{{< figure src="https://i.imgur.com/8fNIfjn.png" >}}

It's a public link sharing album... why the hell do I need OAuth?



Okay fuck fuck uhhhh. 
Github... yeah yeah... everyone has a Github! There's no way there's not some nerd that wrote a npm package or something that just does this perfectly no questions asked. 

There is! In PHP :( 


# Part II: Reverse Engineering Google's Shit. 

Public Google Photos albums have a permanent public link. With some elbow grease (*cough* regex and a GET request), you can pretty easily figure them out. 

All the urls look like this:

```
https://lh3.googleusercontent.com/pw/ACtC-3ey3tCB-Qxgi5WBq5tSq_-vyysVr27GClmcYaJxecmLssKdOsFivD0c6zGaAzQGZSKXJZpWXNez2q2MSAxkiL2d8AlZHnoWrNbGH8U2lgMHma-efg93QctIuns9dByUqY01TlVMfIHe3dfbDpL3gkn2=w1769-h986-no
```

The `wXXX-hXXX` you see at the end of the url let you specify a size to pull the image in. Literally 10 lines of javascript and I was most of the way done, easy project. 


## Part III: Enter Hell

See, I also wanted my little photo carousel to have videos. 

Why? 

Well, while pictures of robots are good. Videos are gooder. 

Also:

```python
#!/bin/python
import random

word = "good"
picture = 1000*word
seconds = random.randint(0,100)

video = picture * 60 * seconds 

>>> "goodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgood"
```

Okay, so after staring at this Google Photos album for far too many hours, I've learned a couple things. 

Google loads videos in 2 scenarios. 

1. When you click on a video, it pulls it up. 
    - The problem is it's an internal API call and the source data doesn't contain a permanent link to the data so I can't embed that.

2. When you hover over a video, Google also loads that video.
    - I was watching the HTML change when that happens and Gotcha! When you hover over a video, it returns an HTML tag with a permanent data source url that can be embedded.

Now how do I get this link automatically. I could scrape it but that would suck and be slow 

Out of curiosity I diffed the link of the picture I get when I make the get request and its corresponding video and voila! 

They're almost identical! 

The end of the photo link: `=w1769-h986-no`
The end of the video link `=m134?sq=0&sq_end=1`

After doing some tests in Jupyter Notebook [here](https://github.com/arjungandhi/google-photos-yoinker/blob/master/testing/hippity%20hoppity%20your%20photos%20are%20now%20my%20property.ipynb) I realized the GET request returned a status code that could verify whether the item was a photo or a video!

The response URL from the vide could also be used as the video source!

I'm gonna stop here for now... while writing this post I thought of a couple more things to experiment with and I'll be back with the results.



