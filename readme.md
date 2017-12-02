expect breaking changes until v1

  - [view the current app @ www.noahedward.com](http://www.noahedward.com)

# TLDR;
## development
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


# About
## Web Application Builder

  - Ideal for senior full stack developers building sophisticated universal web applications
  - Ideal for rapid prototyping
  - Ideal copying/pasting our code into your application ;)

## notable opinions
### Core Third Party Modules

#### Frontend
  - Ant Design
  - Axios
  - Classnames
  - CQ-Prolyfill
  - PostCSS
  - React
  - Recompose
  - Redux
  - Redux Thunk
  - Reselect
  - Method-override
  - Store (local storage)

#### Backend
  - Axios
  - Express
  - Method-override
  - Memory-fs

#### Other
  - Babel
  - Babel Import Glob (see `src/store/api`)
  - Browserslist
  - Docker
  - Eslint
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
  - CSS Next
  - Container Queries [via cq-prolyfill](https://github.com/ausi/cq-prolyfill/blob/master/docs/usage.md#colors)
    ```css
      /*
        cq-polyfill: recommended,
        usage in css: apply directly to child class
        usage in js: in App/Client.js.componentDidMount:
          require('cq-prolyfill')({ preprocess: false });
      */
        .childElement {
          &:global(:container(width < 400px)) {
            background-color: black;
          }
        }

      /*
        css-element-queries: not recommended, currently disabled
        usage in css: apply to parent class
        usage in js: in SomeComponent.js.componentDidMount:
          require('css-element-queries/src/ElementQueries').init();
      */
      .parentElement {
        &[min-width~="400px"] h2 {
          background-color: black
        }
      }
      ```


### Todo

  - db-migrate
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

# Services I use in developing this repository

  - [ready.mobi](https://ready.mobi/)
  - [Pagespeed insights](https://developers.google.com/speed/pagespeed/)
  - [w3c validator](https://validator.w3.org/)
  - [woorank](https://www.woorank.com/)
  - [wave](http://wave.webaim.org/)
  - [lighthouse](https://developers.google.com/web/tools/lighthouse/)
  -
