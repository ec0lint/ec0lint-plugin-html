---
id: lazy-load
title: "html-ec0lint/lazy-load"
---

## Suggest to use lazy loading for image and video files

### Rule Details

Lazy loading loads heavy elements of a website, like an image or a video, only when they're needed. 
For example, images or videos further down on a website are only loaded if the user scrolls down. 
With lazy loading, less data needs to be transferred and thus less energy is consumed.

### CO2 reduction

By using lazy loading no unnecessary images and videos will be transferred. 
For the file that isn't displayed by a website user, we reduce CO2 emissions related to loading the 
file to 0g.

To calculate the combined carbon footprint of all image files on an average website (1000 kB), we multiply the file sizes by the end-user traffic (0.81 kWh/1 GB) and by the energy emissions (442 g/kWh), which sums up to 0.36 g.

So, by enabling lazy loading of these files, we could get 0.36 CO2 reduction (100% less CO2).

In the case of video files (on average 3472 kB per website), we get 1.25 g CO2 reduction.

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

