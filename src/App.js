// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom'; 
import SearchPage from './Components/SearchPage';
import DrugDetails from './Components/DrugDetails';

const App=()=>{
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/drugs/search' element={<SearchPage />} />
        <Route path='/drugs/:drug_name' element={<DrugDetails />} />

      </Routes>
    </Router>
    </div>
  );
};

export default App;