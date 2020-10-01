import 'regenerator-runtime';

import(
    /* webpackPreload: true */
    /* webpackChunkName: 'maincss' */
    './styles/Index.scss');

import(
    /* webpackPreload: true */
    /* webpackChunkName: 'compcss' */
    './styles/Components.scss');

import './scripts/App';