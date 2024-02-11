import './App.css';
import ModeSelection from './components/ModeSelection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QAndA from './components/QAndA';
function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <h1>CS Quiz</h1>
      </header>

      <Routes>
        {/* the 'path' is the URL of the element component
        the routing will be triggered when a <Link> component is clicked */}
        <Route path='/' element={<ModeSelection/>}/>

        {/* the ':' specifies an optional parameter in the URL that can be passed to the component */}
        <Route path='/quiz/:mode' element={<QAndA/>}/>
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
