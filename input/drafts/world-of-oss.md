Title: Life as an Open Source Maintainer (from a Xamarin perspective)
Published: 10/05/2021
Tags:
    - OSS
    - Xamarin
---

Why do I do open source?
* It's fun
* I learn from it by trying things
* It serves my customers and my projects for my needs
* I wanted to give back to the open source community - I'm an consumer, therefore I wanted to be a supplier as well.  Give & Take!

Where do I see it failing for people?
Those that use open source as a crutch.  What do I mean by this?  Simple - you use open source to get around areas you don't know
or have experience with.  You really should understand what you are using, why you are using it, and if given the time - you could build
yourself with a reasonable amount of effort.  Open source usage should be about saving you time, not about covering a gap in knowledge.  
An example of this would be people who use Shiny.BluetoothLE on Android and often complain about the internal queue mechanism "slowing" things down.
I often encourage them to go write Android Bluetooth code on their own before issuing a "complaint"

Xamarin failures
.NET web developers use Xamarin thinking they'll be fine because they know the language, but this is the failure.  Knowing the language and general
workings on .NET is great, but knowing the laws of the operating system are a must.  Developers coming from ASP.NET or Windows, are generally used
to a ton of resources.  Mobile doesn't have that.


## QUESTION & ANSWER TIME

> "I'm new to Xamarin"

* Great - welcome!  I'd suggest learning the platform before using a project as deep as Shiny.  Get to know the operating system(s) you are working with.
While I'm happy you're working with Xamarin, this doesn't mean I'm here to walk you through setting it up.  I do the best I can to offer samples and docs where I have 
time, but the amount of emails I get asking me to do a sample is rediculous and not welcome.  


> "It doesn't do this"

* Ok - send a PR?  Open source isn't a laundry list.  You can make it yourself, send a PR to the project for discussion, or simply find something else

> "I don't like the way this works"

* Same as "it doesn't do this".  

> "I only want to use notifications - why do I need all of this other stuff"

* This library likely isn't for you.  It was meant to solve tough technical background problems.  Notifications is considered an "addon" to help with backgrounding.  That being said, notifications internally uses a lot
of the Shiny internals.

> "The samples are too hard"

* You probably shouldn't use the library then.  Take time to understand what it is solving, how it is solving it, and how it works then.

> "The documentation isn't complete"

* You're right, the documentation isn't finished, but my library isn't a product.  It is something I do for fun and for my customer base.  I know how it works.
I understand the internals thoroughly and therefore I am able to justify the usage to safely apply for use to my work.
  
> "When will X be released/fixed"

* When it's done.  OSS Maintainers aren't under timelines.  You can always submit a PR for something and have it discussed.

> "You closed my issue without any explanation"

* When you get emails, messages, tweet, etc about something, maintainers burn out.  If you simply file something that says "It doesn't work", as a professional developer
how do you solve this with a customer?  It isn't helpful is it.  You'll often check logs for crashes and then plan a fix based of that stack trace... correct?  Why is it that
a maintainer should have to ask for this?  If the issue template even state "include XYZ or this issue will be closed without explanation" that people still ask "why was this closed"?

> "Why did you shutdown project XYZ"

* Because I don't use it anymore.  You can fork it and do what you will with it.  In some cases, with things like ACR User Dialogs, I decided I had enough
with the constant support questions for something I didn't use anymore.  People can still submit PR's that I review and push through.

> "That's not what open source is about"

* I love this one.  The source code I made in my free time that is all out in the open for you to use for free means that I can apply
whatever principles or rules to how I operate that code freely.  As with all things free, you don't have to use them.  If I don't like 
a feature request, change, or anything to do with something coming into the project - I can & will decline it.  

## Realizations

* You didn't pay for the open source work
* The project doesn't owe you anything
* You don't have to use project XYZ if you find it complex, poorly documented, or simply don't like the way it solves something

 ## Closing Notes
While some of these seem "harsh" - they are just cold hard facts.  The first fact was that most of us doing open source got into it for the very first things 
I said in my opening notes.  We didn't ask for all of the rest of this stuff!

People often ask if this means I'll quit open source?  The answer is simply no because of all the main opening points again.  The positive outweighs the negative and I'm learning
new ways of managing the negative.  Better issue templates, public speaking about these experiences in open source, blog posts like this, etc.  