import './App.css';
import Content from './Components/Content';
import Header from './Components/Header';
import Side from './Components/Side';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className='flex justify-between'>
        <Side/>
        <Content/>
      </div>
    </div>
  );
}

export default App;
