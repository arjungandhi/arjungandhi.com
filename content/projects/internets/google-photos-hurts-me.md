---
title: "Google Photos Hurts Me "
date: 2021-07-19
description: "pain"
tags:
  - html
  - javascript
  - suffering
  - reverse engineering
  - css
  - chrome dev tools
  - npm 
categories:
  - internets
draft: false
---

# The Blurb

Google had no good way to embed google photos albums so I did it my self.

# Features
  - blur until load
  - dynamic resizing
  - load videos and photos
  - auto updates pictures and videos using the just the album id
  - grid and carousel display options 
  - minimal css for easy editing 

# Demos

Here's a quick demo to highlight the functionality

To find the album id just grab last part of the share url (or just hit submit with my default one)

```https://photos.app.goo.gl/L74MSFRNuyNSmrKm9``` <- this last part after the forward slash


<form id ='photo-demo-form'>
<label for="album_id">google photos album id:</label><br>
<input  type="text" name= "album_id" value = "tbHcgyWN44g9qj216"> </input><br>
<input type="submit" value="Submit">
</form>

ps. it takes a couple seconds to load be patient  
pps. maybe more than a couple seconds if you have bad internet

## carousel
<div class="center"> 
<div id='carousel-demo'></div>
</div>

## grid
<div class="center"> 
<div id='grid-demo'></div>
</div>

<script type="module">
let form = document.getElementById('photo-demo-form')

form.onsubmit = (e) => {
e.preventDefault();
let id = new FormData(document.querySelector('#photo-demo-form')).get('album_id')
let c = document.getElementById('carousel-demo')
let g = document.getElementById('grid-demo')
c.innerHTML= ''
g.innerHTML = ''

photo_function(id,"carousel-demo","carousel")
photo_function(id,"grid-demo","grid")
}
</script>

# Links/How To
npm: https://www.npmjs.com/package/google-photos-yoinker   
jsdelivr: https://www.jsdelivr.com/package/npm/google-photos-yoinker   
github: https://www.github.com/arjungandhi/google-photos-yoinker   

A note here for this to work on your website you need to set up your own proxy and API on your own, I used AWS and lambda functions to do this and have instructions for it in the README of the repo. 


<end-tldr>

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

Ah. shit is that PHP. Who even uses that anymore. (And it doesn't do videos)


# arjun starts reverse engineering googles shit. 

Okay so turns out the public google photos have like a permanent public link to em, and a get request to the album link and a a little bit a regex and you can pretty easily figure them out. 

All the urls look like this

```
https://lh3.googleusercontent.com/pw/ACtC-3ey3tCB-Qxgi5WBq5tSq_-vyysVr27GClmcYaJxecmLssKdOsFivD0c6zGaAzQGZSKXJZpWXNez2q2MSAxkiL2d8AlZHnoWrNbGH8U2lgMHma-efg93QctIuns9dByUqY01TlVMfIHe3dfbDpL3gkn2=w1769-h986-no
```

Even nicer that ```wXXX-hXXX``` you see at the end of the url let you specify a size to pull the image in. Literally 10 line of javascript I was done easy project. 


## enter hell

See I wanted to also have my little photo carousel have videos. 

Why? 

Well while pictures of robots are good. videos are gooder. 

proof:

```python
#!/bin/python
>>> import random
>>> word = "good"
>>> picture = 1000*word
>>> seconds = random.randint(0,100)
>>> video = picture * 60 * seconds 
>>> print(video)
"goodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgood"
```

Okay, so after staring at google photos html for far to many hours. I've learned a couple things. 

Google loads videos in 2 scenarios. 

1. When you click on a video and it pulls it up. 
    - the problem is its a api between them and youtube and the source data doesn't contain a permanent link to the data rather its some sort of blob. So I can't embed that. 

2. Sometimes when I load the site I notice google enables a video on hover feature. 
    - Watching the html while that happens.. Gotcha! a html video tag with a url as the source 


Going to the URL its the independent video! 

Now how do I get this link automatically. I could scrape it but that would suck and be slow 

Out of curiosity I diffed the link of the picture I get when I make the get request and its corresponding video and voila! 

Their almost identical! 

The end of the photo link: ```=w1769-h986-no```  
The end of the video link ```=m134?sq=0&sq_end=1```

So running some tests with in jupyter notebook [here](https://github.com/arjungandhi/google-photos-yoinker/blob/master/testing/hippity%20hoppity%20your%20photos%20are%20now%20my%20property.ipynb) by get requesting second variation of each base photo link game me a 200 status code I could check if the media item was a photo or a video!

I can also can try using the response url as the source of the video and it should work!

....... at this point in the writing of this point i had an idea and went and rewrote the entire code base. 

## it's been a week and I'm tired. 

So this post was going to be about how even with the base url I the videos refused to load in the jupyter notebook. Which sucks.

But after gremlin prowling through google api documentation. I found [this](https://developers.google.com/photos/library/guides/access-media-items).

So this project might actually work! (note the finding documentation ends up a sentence long but was 3 days of staring at the dev tools and googling till my eyes fell out of my head.)

## enter hell but now it's css flavored

So my initial plan was to just embed a carousel of the photos and videos that I had found. But in my 5 min of looking for a decent carousel library I didn't find one that I liked. 

And then as I was prowling around the google photos html. I thought how cool would it be to have my own google photos grid, that I could embed in any site. 

Luckily [Dan](https://schlosser.io/) had a great [article](https://medium.com/@danrschlosser/building-the-image-grid-from-google-photos-6a09e193c74a) on how it all worked. 

I tried using his library didn't really like it too much and then ended up implementing the algorithm from scratch anyway. 

I then trugged my way back to the carousel and found [Swiper](https://swiperjs.com/swiper-api) and got a sweet carousel. 

3 days later some suffering and bingo bango boongo you got a javascript library that can embed google photos. 

{{< tweet 1420455256136237059 >}}

# demos

Here's a quick demo to highlight the functionality

To find the album id just grab last part of the share url (or just hit submit with my default one)

```https://photos.app.goo.gl/L74MSFRNuyNSmrKm9``` <- this last part after the forward slash


<form id ='photo-demo-form'>
<label for="album_id">google photos album id:</label><br>
<input  type="text" name= "album_id" value = "tbHcgyWN44g9qj216"> </input><br>
<input type="submit" value="Submit">
</form>

ps. it takes a couple seconds to load be patient  
pps. maybe more than a couple seconds if you have bad internet

## carousel
<div class="center"> 
<div id='carousel-demo'></div>
</div>

## grid
<div class="center"> 
<div id='grid-demo'></div>
</div>

<script type="module">
let form = document.getElementById('photo-demo-form')

form.onsubmit = (e) => {
e.preventDefault();
let id = new FormData(document.querySelector('#photo-demo-form')).get('album_id')
let c = document.getElementById('carousel-demo')
let g = document.getElementById('grid-demo')
c.innerHTML= ''
g.innerHTML = ''

photo_function(id,"carousel-demo","carousel")
photo_function(id,"grid-demo","grid")
}
</script>

# how do I hippity hoppity yoink your property. 

npm: https://www.npmjs.com/package/google-photos-yoinker   
jsdelivr: https://www.jsdelivr.com/package/npm/google-photos-yoinker   
github: https://www.github.com/arjungandhi/google-photos-yoinker   

A note here for this to work on your website you need to set up your own proxy and API on your own, I used AWS and lambda functions to do this and have instructions for it in the README of the repo. 








