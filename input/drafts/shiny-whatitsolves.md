Title: Shiny - What is it trying to solve
Published: 10/05/2021
Image: images/shiny_logo.png
Tags:
    - Xamarin
    - OSS
    - Shiny
---

Some have called Shiny, heavy weight.... Guess what - they're right!  Why is it heavyweight?  I'm trying to solve
problems that others may or may not have come across in a way that seems logical to me.

## The trouble with Plugins
As of late, I've seen numerous videos and articles coming out showing how to do push notifications.  I love these ones because 
often people want the notification part, but what they really want/need is the background portion of when a notification is received.
These samples simply can't offer or fix that with any sort of ease. Some of the big plugins do try to fix these, but not before paying the "devils due" 
to get there.  The issue with Android & iOS plugins is that they need some form of boilerplate code.  They also require you have some sort of understanding of "where/when/why" to hook
to the lifecycle of the platform.

* They often need their own internal stuff for persistenance, scheduling, lifecycle, etc
* They are often too lightweight
* You end with a hodgepodge of a bunch of plugins, all with their own internals
* James Montemagno & I got smart over the years by having a dependency chain of differing nugets.

But I just want to use Shiny.X
Ok so....?  Go ahead... It doesn't mean I'm going to change the way I'm doing things because you just want to use X.
Honestly though, if you are only taking in Shiny for just notifications, it's a waste.

## LINKS
* <?# ConfiguredLink "Documentation" /?>
* <?# ConfiguredLink "Samples" /?>
* <?# ConfiguredLink "GitHub" /?>
* <?# ConfiguredLink "AllNugets" /?>