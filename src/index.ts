import 'regenerator-runtime';

import(
    /* webpackPreload: true */
    /* webpackChunkName: 'maincss' */
    './styles/Index.scss');

import(
    /* webpackPreload: true */
    /* webpackChunkName: 'componentcss' */
    './styles/Components.scss');

import(
    /* webpackPreload: true */
    /* webpackChunkName: 'app' */
    './scripts/App');

// import './scripts/App';