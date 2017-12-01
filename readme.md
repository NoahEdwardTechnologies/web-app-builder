expect breaking changes until v1

  - [view the current app @ www.noahedward.com](http://www.noahedward.com)

# Web Application Builder

  - Ideal for senior full stack developers building sophisticated universal web applications
  - Ideal for rapid prototyping
  - Ideal copying/pasting our code into your application ;)

## opinions
### Current

  - Ant Design
  - Babel
  - Babel Import Glob (see `src/store/api`)
  - Docker
  - Eslint
  - Express
  - PostCSS
  - React
  - Stylelint
  - Webpack 3

### Core features (TODO: list all features)

  - Auto generate sprites from all your images (postcss-sprites)
  - Auto prefixer for your supported client environments (via browserslist)
  - Autoload Google Fonts (via postcss font-magician)
  - Hot Module Replacement (both client & server)
  - Server Side Rendering
  - Dual server + client or Client only dev/production process.
    - you're developing a static website
    - you're focused on the frontend and dont need the backend overhead
  - Ability to not emit any files during development, or to emit all files during development (useful for debugging however I generally dont like to emit anything)


### Todo

  - db-migrate
  - Element Queries
  - Jest
  - JS + CSS Code Splitting
  - NETECH/babel-preset
  - NETECH/eslint-config
  - NETECH/ReactJS D3 Universal
  - NGINX Reverse Proxy
  - PostGReSQL (bigger clients)
  - Protractor + Selenium
  - Seamless Immutable
  - sqlite3 (rapid prototyping)

## get started
### development
  - `yarn ssr`: start api and client in dev mode
  - `yarn client`: start client in dev mode

### build for production
  - `yarn build`: build api and client for production
  - `yarn buildclient`: build client for production
  - `yarn buildserver`: build server for production

### dockerize production build
  1. build app for production `yarn build`
    - client only: `yarn prodclient`
    - server only: `yarn prodserver`
  2. build docker image: `docker build -t YOUR_IMAGE_NAME .`
  3. launch docker container from image `docker run -p 8082:3000 YOUR_IMAGE_NAME`
