---
id: lighter-video-files
title: "html-ec0lint/lighter-video-files"
---

## Suggest to use lighter video files format

### Rule Details

Video files inside web applications should be in WebM format. It is an open, royalty-free media file format designed specifically for the web, hence it is supported by HTML and has a good compatibility with all modern browsers. Clips in the WebM format are on average much smaller than those in MP4 or OGV (other video formats supported by HTML). We can achieve even a 66% reduction of the file size using WebM instead of the popular MP4 format which quality is only slightly better.

### CO2 reduction

The table below shows the comparison between file sizes and CO2 emission for a short (23 s) exemplary video (in 1366 x 720 resolution). 

[Link to the exemplary video](https://www.pexels.com/video/alpaca-closeup-5795043/)

| File format | File size | CO2 emission |
|-------------|-----------|--------------|
| WebM       | 2.6 MB     | 0.04 g       |
| MP4        | 5.9 MB     | 0.07 g       |
| OGV        | 9.22 MB    | 0.11 g       |

Examples of **incorrect** code for this rule:

```html
<video width="320" height="240" controls>
    <source src="movie.ogv" type="video/ogv">
</video>
```

```html
<video width="320" height="240" controls>
    <source src="movie.mp4" type="video/mp4">
</video>
```

Examples of **correct** code for this rule:

```html
<video width="320" height="240" controls>
    <source src="movie.webm" type="video/webm">
</video>
```

```html
<video width="320" height="240" controls></video>
```

```html
<div>Lighter video files rule</div>
```
