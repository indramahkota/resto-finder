import 'regenerator-runtime';

import(
    /* webpackPreload: true */
    /* webpackChunkName: 'maincss' */
    './styles/Index.scss');

import(
    /* webpackPrefetch: true */
    /* webpackChunkName: 'componentcss' */
    './styles/Components.scss');

import(
    /* webpackPrefetch: true */
    /* webpackChunkName: 'app' */
    './scripts/App');

// import './scripts/App';