# Visualization Tool
This repository contains code for an internship assignment: create a visualization tool using data from the Open Trivia DB API.

The project deployed with GitHub Pages and available at: https://leragogogo.github.io/visualization_tool/

## Architecture
- **Stack:** React + TypeScript + Vite.
- **State management:** Context + useReducer providers to keep global state.
- **Models:** Entities for trivia data to keep component props and service boundaries strictly typed.
- **Data layer:** services/trivia_service encapsulates calls to the Open Trivia DB API.

```console
src/
  widgets/              # Reusable UI components
  providers/            # React Context providers
  services/             # API clients
  models/               # TS interfaces
  theme/                # Store app's colors, themes, strings, etc
```


## How to run
Prereqs: Node.js, npm.

### Clone & install
```console
git clone https://github.com/leragogogo/visualization_tool.git
cd visualization_tool
npm install
```

### Start the dev server
```console
npm run dev
```

### Deploy to GitHub Pages
```console
npm run deploy
```
