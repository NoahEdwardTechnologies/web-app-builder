expect breaking changes until v1

# Web Application Builder

  - Ideal for senior full stack developers building sophisticated universal web applications

## opinions
### Current

  - Ant Design
  - Babel
  - Babel Import Glob (see `src/store/api`)
  - Eslint
  - Express
  - PostCSS
  - React
  - Stylelint
  - Webpack 3

### Core features (TODO: finish this)

  - Auto generate sprites from all your images (postcss-sprites)
  - Auto prefixer for your supported client environments (via browserlist)
  - Autoload Google Fonts (via postcss font-magician)
  - Hot Module Replacement (both client & server)
  - Server Side Rendering
  - Dual server + client or Client only dev/production process. E.g., if you're building a static website and dont need the API related devops
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

  - `yarn ssr`: start api and client in dev mode
  - `yarn client`: start client in dev mode
  - `yarn build`: build api and client for production
  - `yarn buildclient`: build client for production
  - `yarn buildserver`: build server for production
