import React from 'react';

import './styles/main.scss'

import {Helmet} from 'react-helmet'
import * as l from './components/layout'
import * as c from './scripts/const'

function App() {
  return (
    <>
      <Helmet defaultTitle={c.TITLE} />
      <div className="App">
          <l.Layout />
      </div>
    </>
  );
}

export default App;
