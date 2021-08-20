import React, {useEffect,useState} from 'react';
import Dictionary from './dictionary';

const DictionaryContainer = () => {
  const [data, setData] = useState([]);
  const [audio, setAudio] = useState();
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState('');
  const [queryWord, setqueryWord] = useState('');

  var pronunciation = "", audio_url = "";
  var x;

  useEffect(() => {
    setData(data);
    }, [data]);
    
  const updateSearch = e => {
    setSearch(e.target.value);
  }
  const playAudio = () => {
    //this.firstElementChild.play();
    x = document.getElementById("audio_clip"); 
    x.play();
  }
  const getDict = async (e) => {
    setLoader(true)
    e.preventDefault();
    const audioresponse = await fetch(`https://the-words.herokuapp.com/api/v2/audio/en-US/entries/${search}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
    const audio = await audioresponse.json();
    setAudio(audio.contents)
    
    const response = await fetch(`https://the-words.herokuapp.com/api/v2/definitions/en-US/entries/${search}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    setData([data])
    setqueryWord(data.word)
    setLoader(false)
  }
  if (audio){
    pronunciation = audio[0].pronunciation;
    audio_url = audio[0].audio;
  }

  return (
    <div id="wrap" class="input">
      <header class="input-header">
        <h1>Start your search here.</h1>
      </header>
      <section class="input-content">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-11 col-md-offset-1 testt">
            <form className="search-query" onSubmit={getDict}>
              <input className="fetch" id="fetch" type="text" value={search} onChange={updateSearch} placeholder="Type a word... "></input>
              <button className="fetch-button" type="submit">
                <i className="bx bx-search-alt-2"></i>
              </button>
            </form>
          <div className="hyphens">
              <div className="dictionary" id="dictionary">
                  {loader ? ("") : (<div className="entry-word"><p className="word">{queryWord}</p>
                  <p className="pronunciation">{pronunciation === "" ? ("") : (pronunciation)}
                  <span className="audio">{audio_url === "" ? ("") : (<button className="audio-play-btn" onClick={playAudio}>
                    <i className="bx bx-volume-full"></i>
                    <audio id="audio_clip">
                      <source src={audio_url}/>
                    </audio>
                    </button>
                  )}</span>
              </p></div>
                  )}
                    {loader ?  (<div className="loaderr"><div className="loaderrBar"></div></div>) : (data.map((word, index) => (
                      <Dictionary
                        key={index}
                        meaning={word.meanings}
                      />
                    )))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
  </div>
  );
}

export default DictionaryContainer;