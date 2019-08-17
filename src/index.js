import React from 'react';
import { render } from 'react-dom';
import App from './app/App';
import './scss/index.scss';

const container = document.getElementById('app');

render(<App />, container);
