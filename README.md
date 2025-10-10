# formyfelleows
just write

a technical blog built with eleventy (11ty) and deployed on vercel.

## 🚀 quick start

### development

```bash
# install dependencies
npm install

# start development server
npm run serve
# or
npm start
```

visit http://localhost:8080

### creating a new post

use the interactive post generator:

```bash
npm run new
```

this will prompt you for:
- post title (required)
- description (optional)
- tags (comma-separated, optional)
- draft status (y/n)

the script will:
- generate a slug from your title
- create a markdown file in `src/posts/`
- add frontmatter with current date
- include a basic template structure

### manually creating a post

create a new markdown file in `src/posts/` with frontmatter:

```markdown
---
title: "your post title"
date: 2025-10-10
layout: post.njk
draft: true
tags:
  - tag1
  - tag2
description: "your description"
---

your content here...
```

### publishing posts

to publish a draft post, change `draft: true` to `draft: false` in the frontmatter.

drafts are:
- ✅ visible in development mode (with draft indicators)
- ❌ hidden from production (won't appear in lists, show 404 if accessed directly)

## 📦 build & deploy

### build for production

```bash
npm run build
```

### deploy

push to github and vercel will automatically deploy.

## 🛠️ available scripts

- `npm start` - start development server
- `npm run serve` - start development server
- `npm run build` - build for production
- `npm run new` - create a new post interactively
- `npm run debug` - run eleventy with debug output

## 📁 project structure

```
.
├── src/
│   ├── _data/              # global data files
│   ├── _includes/
│   │   └── layouts/        # layout templates
│   ├── css/                # stylesheets
│   ├── posts/              # blog posts (markdown)
│   ├── about.md            # about page
│   └── index.njk           # homepage
├── scripts/
│   └── new-post.js         # post generator script
├── .eleventy.js            # eleventy configuration
└── package.json
```

## 🌐 live site

[formyfellows.com](https://formyfellows.com)
