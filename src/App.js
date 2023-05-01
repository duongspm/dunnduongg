
import {Route, Routes} from 'react-router-dom';
import IndexAdmin from './components/admin/indexAdmin';
import IndexClient from './components/client/indexClient';

import './App.css';

function App() {
  return (
    <div>
          <Routes>
            <Route path='/*' element={<IndexClient/>}></Route>
            <Route path='/admin' element={<IndexAdmin/>}></Route>
          </Routes>
    </div>
  );
}

export default App;
