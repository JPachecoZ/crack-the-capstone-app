import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import Header from './components/Header';

import '@fontsource/roboto/300.css';

function App(): JSX.Element {

  return (
    <Fragment>
      <Header/>
      <Routes>
        <Route path="/" element={<UploadPage />}/>
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
