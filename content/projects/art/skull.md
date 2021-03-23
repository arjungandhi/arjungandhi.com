---
title: "Interactive Touch: Skull"
date: 2021-03-15T14:47:41+00:00
description: "Representing the affects of covid 19 on us"
tags:
  - art 
  - p5.js
  - pretty-please
  - html
  - css
  - javascript
categories:
  - art
draft: false

---

---

### Inputs

<div class= "pretty container" id = 'box'></div>

---
### About The Project


#### Stuff I used

- [p5.js](https://p5js.org/)
- [pretty-please](https://pretty-please.arjungandhi.com)


<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.0/p5.min.js" integrity="sha512-tGZFF1kxT/c9C+kv77mKkZ9Ww1VyU8TMX6HLUSzbPrDLuptbiRFBfti8A33ip+BBIHYUsybuZD9OKLmIqdLmaQ==" crossorigin="anonymous"></script>
<link rel="stylesheet" href="/css/projects/art/skull/skull.css">
<script src="/js/projects/art/skull/skull.js" type="text/javascript"></script>

<script>
function preload() {
  // preload() runs once
  skull = loadImage("/images/projects/art/skull/skull.png")
  warn = loadImage("/images/projects/art/skull/warn.png")
  smile = loadImage("/images/projects/art/skull/smile.png")
}

