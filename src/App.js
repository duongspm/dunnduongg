import {Route, Routes, Link } from 'react-router-dom';
import IndexAdmin from './components/admin/indexAdmin';
import IndexBlog from './components/blog/indexBlog';
import IndexClient from './components/client/indexClient';

import './App.css';

function App() {
  return (
    
    <div>
          <Routes>
            <Route path='/*' element={<IndexClient/>}></Route>
            <Route path='/admin' element={<IndexAdmin/>}></Route>
            <Route path='/blog' element={<IndexBlog/>}></Route>

          </Routes>
    </div>
  );
}

export default App;
