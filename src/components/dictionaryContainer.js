import React, {useEffect,useState} from 'react';
import '../styles/App.css';
import Dictionary from './dictionary';

const DictionaryContainer = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setData(data);
    }, [data]);
    
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getDict = async (e) => {
    setLoader(true)
    e.preventDefault();
    const response = await fetch(`https://the-words.herokuapp.com/api/v2/definitions/en-US/entries/${search}`, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost/3000',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    setData([data])
    setLoader(false)
  }
  

  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={getDict}>
        <input className="fetch" id="fetch" type="text" value={search} onChange={updateSearch} placeholder="Enter word: "></input>
        <button className="fetch-button" type="submit">
          Fetch Data
        </button>
      </form>
      <div className="content">
        {loader ?  (<div className="loader"><div className="loaderBar"></div></div>) : (data.map((word, index) => (
          <Dictionary
            key={index}
            wrd={word.word}
            meaning={word.meanings}
          />
        )))}
        </div>
      </header>
    </div>
  );
}

export default DictionaryContainer;