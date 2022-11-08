---
id: lazy-load
title: "html-ec0lint/lazy-load"
---

## Suggest to use lazy loading for image and video files

### Rule Details

Lazy loading loads heavy elements of a website (usually an image or a video) only when needed. 
For example, images or videos further down on a website are only loaded if the user scrolls down. 
With lazy loading, less data needs to be transferred and thus less energy is consumed.

### CO2 reduction

By using lazy loading, we provide that no unnecessary images and videos will be transferred, 
so for the file that won't be displayed by website user, we limit CO2 emissions connected with loading this 
file to 0g.
By multiplying the file size by the end-user traffic (0.81 kWh / 1000 Mb) and by the energy emissions (442 g/kWh) , the carbon footprint of the average image file (3 MB) sums up to 8.59 g. 
So, by lazy loading this file we could get 8.59g CO2 reduction (100% less CO2).

Examples of **incorrect** code for this rule:

```html
<video class="none"></video>
```

```html
<video preload="auto"></video>
```

```html
<img src="img.jpg"></img>
```

```html
<iframe data-src="img.jpg" class="none"></iframe>
```

Examples of **correct** code for this rule:

```html
<img src="img.jpg" loading="lazy"></img>
```

```html
<iframe data-src="img.jpg" class="lazy"></iframe>
```

```html
<img data-src="img.jpg" class="lazyload"></img>
```

```html
<video class="lazy"></video>
```


```html
<video preload="none"></video>
```

```html
<div>Lazy loading rule</div>
```

