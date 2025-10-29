---
title: "What is OAuth 2.0?"
date: 2025-01-01
layout: post.njk
draft: true
tags: 
  - post
  - authentication
  - oauth
  - security
description: "An introduction to OAuth 2.0 protocol and how it enables secure delegation of user permissions to third-party applications."
---

This is my first official blog, I write sometimes before but most of them are just some random things that I need to quickly write down so that I can reference it later, if not that, then they are just things I copy and paste from some textbooks.

So a bit of context, I was thinking of what would be the first topic that I feel the most confident so that I can easily start without too much thinking and researching, but I cannot think of any. And you are correct, that there is no topic that I can know every details. So I think I should just start with something that I've been working with recently, and tada it's Keycloak. But then, to actually be able to brainstorm with Keycloak, there is necessary base knowledge of OAuth 2.0 and Open ID Connect which I don't have, so I would rather start with OAuth 2.0. Okay, it's far beyond just a context, let's get started.

## What is OAuth 2.0?

So of course, what is OAuth 2.0? The only thing that pops up in my mind is that OAuth 2.0 is the protocol to help a server delegates a user's permissions to a 3rd party server. What does that mean thought? Let take a look at long time ago, of course I wasn't there back then but some website uses to do that. 

For example, a company had developed a new social website, and they wanted to attract new users. They relised that the user often came to website, click on Register button and then they went away. Why was that? Because the form to register a new account had a bunch of textboxes that the user needs to fill, the username for login, the first and last name for displaying, the two times password for making sure user doesn't have two passwords :D, a nice picture for profile looking cool. 

So how to solve that? The company noticed that a nother social website at that time had had milions of users with more than enough information, can we leverage that? Yes, in a way, the company instead of requiring users to sign up for new account, they replaced the title of that button with "Login by Facebook", and you know what, the amount of users had increased signigficantly, thousands by thousands in every day. 

## The Old (Insecure) Way

So how the company has done it? Well, it turns out that when user decided to log in by Facebook, the log in form requires the username + password of the Facebook server, so that the website can use that information, to log in into user's Facebook account, and gather all the needed information like fullname, avatar and bunch of other stuffs, who knows what the company has taken, they can have all right of Facebook as a regular user does. Of course, everyone can see that is not a very good option if I don't want to say the very worst option that ever a person can think of, but yea what else we can do.

## The OAuth 2.0 Solution

Yea, a big applaude for someone who invented the OAuth 2.0, so the idea of OAuth 2.0 is too simple, how can a user let other system uses their information without the need to provide their username + password. But first, let take a look at some main components of a webstie at that time would have?

- An identity server which stores user's authentication and authorization information.
- A backend server which saves user's operation information
- A fronend website so that user can interact with the server.

So to let other 3rd parties access the user's information, Facebook requires that the 3rd party needs to register with Facebook that who the 3rd party is? Why is that? Facebook needs to tell with its users that who is the 3rd party wants to access their information, that sounds reasonable indeed. 

Then what? Same thing as before, when user accesses to the 3rd party website, they will click the same Login by Faceebook button, but this time, the 3rd party server will redirect user to the Facebook login form, only then user needs to login into Facebook. And because Facebook already knew where the user came from, so they asked the user that do you really want to let the 3rd party access your information like fullname, avatar, etc. 

At that time, you can say yes and no and it's all about your opinion, if you choose to say no, when the 3rd party will never be able to know who you are. But if user chooses yes, then Facebook will give that information to 3rd party, but how can they do that? 

Well, Facebook at the point you knot your head, they will create a ticket for the 3rd party, with that ticket, the 3rd party can tell to the Facebook identity server that me on behalf of the user, I want the user's fullname, so Facebook ID server looks that ticket and indeed the ticket is valid, and the ticket tells that this ticket is able to see user's username so here you are. Well done, problem sovled. What a genius invented. 

## OAuth 2.0 Components

You can map a couple of things into OAuth 2.0 components:

- **Identity Server**: Facebook ID Server
- **Resource Server**: The server that holds user data (often the same as identity server)
- **Client**: The third-party application requesting access
- **Resource Owner**: The user who owns the data

## Resource
