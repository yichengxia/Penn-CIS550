# Forx News

<img src="client/public/github/forxnews.png" alt="forxnews" width="500">

## Description

Forx News is a restaurant review website based on Yelp datasets. It aims to help users search restaurants in a simplistic way, and present them with insightful restaurant reviews.

Project Wiki: [https://forx-news.gitbook.io/forx-news-wiki](https://forx-news.gitbook.io/forx-news-wiki)

Demo Video: [https://youtu.be/nuDBwg3mG6o](https://youtu.be/nuDBwg3mG6o)

Deployment on Heroku: [https://forxnews.herokuapp.com](https://forxnews.herokuapp.com/)

## Tech Stack

<img src="https://img.shields.io/badge/-React-000000?style=flat&logo=react&logoColor=00C8FF"> <img src="http://img.shields.io/badge/-Node.js-4DB33D?style=flat&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/-Express.js-eed718?style=flat&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/-MySQL-F29111?style=flat&logo=mysql&logoColor=white"> <img src="http://img.shields.io/badge/-Heroku-430098?style=flat&logo=heroku&logoColor=white">

## System Architecture

<img src="client/public/github/architecture.png" alt="architecture" width="800">

## Folder Structure

We host our backend codes in the root project folder, and nest frontend codes inside the `client` folder.

```
.
├── client                  # Frontend
│   ├── public              # Static resources, such as icons and images
│   └── src
│       ├── components      # Pages, components and styles
│       ├── hooks           # Custom hooks
│       ├── constants       # Constants
│       ├── utils           # Helper functions
│       ├── App.js
│       ├── index.css
│       └── index.js
├── config                  # Env variables, such as API keys and secrets
├── middlewares             # Custom middleware functions
├── routes                  # Route handlers
├── services                # Third-party services, such as Passport.js
├── database.js             # MySQL connection
├── index.js                # Configures server, middlewares and routes
└── schema.js               # Request schema validation rules
```

## Development Guidelines

Make sure you have installed `git`, `node`, `npm` before starting.

### 1. Get Started

1. Clone repo: `git clone git@github.com:ruichen199801/cis550-fa22-project.git`
2. Checkout feature branch: `git checkout -b <feature branch name>`
3. Install backend dependencies: `cd cis550-fa22-project && npm i`
4. Install frontend dependencies: `cd client && npm i`
5. Run frontend and backend concurrently: `cd .. && npm run dev`

### 2. Before Commit

1. Stash uncommited changes on your local branch: `git stash`
2. Fetch remote changes into local main: `git checkout main && git pull origin main`
3. Sync your branch with local main: `git checkout <your branch name> && git merge main`
4. Restore changes and continue your work: `git stash pop`

### 3. Commit Your Work

1. Sanity check: `git status`, `git branch`
2. Push changes: `git add .`, `git commit -m <commit message>`, `git push`
3. Open pull request and assign code reviewer
4. Merge codes after approval

### 4. After Merge

Archive branch according to [https://gist.github.com/zkiraly/c378a1a43d8be9c9a8f9](https://gist.github.com/zkiraly/c378a1a43d8be9c9a8f9)

### 5. DO NOT

1. Push to main directly or force merge into main
2. Push untested or bugged codes
3. Use API keys and secrets explicitly in code
4. Include node_modules in commits
5. Overwrite package-lock.json without introducing new dependencies (use `npm ci` instead for subsequent `npm install`)

### 6. Common Issues

1. Port already in use: `lsof -i tcp:<port>`, then `kill -9 <PID>`
2. Nodemon app crashed: `pkill -f nodemon`, then restart server

### 7. Debug

Heroku logs: `heroku logs -t`

### 8. Test Suites

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/297c85e5a4e000c2d40a?action=collection%2Fimport)
