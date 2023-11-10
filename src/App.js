import './App.css';
import Content from './Components/Content';
import Header from './Components/Header';
import Side from './Components/Side';

function App() {
  return (
    <div className="App bg-neutral-200 h-screen">
      <Header></Header>
      <div className='flex justify-between'>
        <Side/>
        <Content/>
      </div>
    </div>
  );
}

export default App;
