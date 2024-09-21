import './App.css';
import { Select } from './components/Select';

const elements = ['first', 'second', 'third'];

function App() {
  return (
    <div className="App">
      <Select elements={elements} />
    </div>
  );
}

export default App;
