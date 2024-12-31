---
slug: diffs
title: Image Diffing
authors: [toshimoto821]
tags: [developer, image, diffing]
draft: true
---

# Image Diffing

Understanding diffs are at the core of Webshot Archive. This blog post will explain how diffs work and where they are used.

## Diffs in Github Comments on PR

When the Webshot Archive Github Action runs, your screenshots are uploaded to the Webshot Archive storage. The server willthen create a diff of the new screenshot and the screenshot the action tells it to compare to. This diff is then uploaded to the Webshot Archive storage along with the original screenshot and added to the Github comment on your PR.

![Github Comment with Diff](./pixel-diff-github.png)

### Minimum Pixels To Ignore

On the Project Settings page you can set the minimum number of pixels to ignore when the original screenshot is compared to the new screenshot. This is useful if you are working on a test/screenshot that may have some noise in it and vary on each run. This number difference is the value returned by `pixelmatch()` as documented [here](https://github.com/mapbox/pixelmatch?tab=readme-ov-file#pixelmatch). If an image differs by just a few pixels because of noise such as font rendering this number will be very low. Here is an example:

![Screenshot Comparison Carousel](./pixel-diff-webshot-archive.png)

You can also see the diff on the Screenshot Comparison Carousel. In this example the diff is almost 4000 pixels which is a lot but can give some context to what a little value might be. In my opinion 250 pixels is a good starting point. Some pages though may have a lot of noise and a higher value may be needed.

### Setting the Minimum Pixels To Ignore

You can set the minimum pixels to ignore on the Project Settings page.

![Project Settings](./pixel-diff-setting.png)

#### Global Minimum Pixels To Ignore on Diffs

Setting this value will set the value for all images you upload.

#### Pixels to ignore by filename

The file pattern a `<glob>=<number>`

```text
**/some-cool-test.cy.ts/**=1000
```

This will set the minimum pixels to ignore to 1000 for all screenshots in the `some-cool-test.cy.ts` file.

Now when minor changes are done, the screenshots are treated as identical and no changes are noted. The benefit of Webshot Archive is to be able to clearly understand what and when changes real changs are made.
