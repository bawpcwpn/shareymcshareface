# Sharey McShareface

## Overview

Sharey McShareface is a lightweight alternative to AddThis or ShareThis. It doesn't initiate any service specific scripts until you hover over that service.

## Setup

This uses **Gulp v4.0**.  
To install use  
`npm install -g git+https://git@github.com/gulpjs/gulp.git#4.0`  
You may be required to uninstall previous versions of gulp using `npm uninstall -g gulp` first


## Getting started

First include the script on your site:

`//vivogroup.com.au/sharey/sharey.min.js`

And then simply include any of following:

* **Facebook** - `<span class="sharey_facebook"></span>`
* **Twitter** - `<span class="sharey_twitter"></span>`
* **LinkedIn** - `<span class="sharey_linkedin"></span>`
* **Email** - `<span class="sharey_email"></span>`



## Options

By default, Sharey McShareface will pull in:  

* Page Title
* Page URL
* Page `<meta property="description" value="description" />`  

It will then override with the following OpenGraph (http://ogp.me) tags if they exist on the page

* `og:title`
* `og:type`
* `og:image`
* `og:url`

### Facebook

Facebook doesn't have any additional parameters at this stage. Parameters for Facebook can be set via OpenGraph tags.

### Twitter

Twitter accepts the following additional data-attribute parameters to override data:

| data-attribute  | Details |
|-----------------|---------|
| data-username | eg. `data-username="vivogroup"` - this adds ` via @username` to the end of the tweet |
| data-description  | This overrides the page description, so you can set a Twitter length friendly message | 

### LinkedIn

LinkedIn doesn't have any additional parameters at this stage

### Email

Email accepts the following additional data-attribute parameters to override data:

| data-attribute  | Details |
|-----------------|---------|
| data-subject | Set a custom subject on the email |
| data-message  | Allows you set to email content sans the Page title and page url to be included. Lines breaks are not accepted currently. | 
