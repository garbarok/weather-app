# Weather App

A simple weather app built with Vue.js, Vuex, and Vue Router. This app allows users to search for the weather in a specific location and save their favorite locations.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 14.x
- [npm](https://www.npmjs.com/) >= 6.x

## Installation

1. Clone the repository:
https://github.com/garbarok/weather-app.git

2. Install dependencies:

pnpm install
npm install


3. Create a `.env` file in the root directory of the project with the following contents:

VITE_API_KEY=your_api_key_here
VITE_APP_BASE_URL=/

Replace `your_api_key_here` with your actual OpenWeatherMap API key. You can obtain an API key by signing up for a free account on the [OpenWeatherMap website](https://openweathermap.org/).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
## Troubleshooting

### 404 Error on Refresh

If you are using Vercel, create a `vercel.json` file in the root directory of the project with the following contents:

```json
{
  "routes": [    {      "src": "/(.*)",      "dest": "/index.html",      "status": 200    }  ]
}