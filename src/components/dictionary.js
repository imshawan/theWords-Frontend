import React, {useEffect,useState} from 'react';
import '../styles/Dictionary.css';

const Dictionary = ({wrd,meaning,audio_info}) => {
    const [meanings, setMeanings] = useState([])
    const [audio, setAudio] = useState([]);

    useEffect(() => {
        setAudio(audio);
        }, [audio]);

    useEffect(() => {
    setMeanings(meaning);
    }, [meaning]);

    const getAudio = async (e) => {
        //setLoader(true)
        e.preventDefault();
        const response = await fetch(`https://the-words.herokuapp.com/api/v2/audio/en-US/entries/`, {
          method: 'GET',
          headers: {
            'Origin': 'http://localhost/3000',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        setAudio([audio])
        //setLoader(false)
      }

    if (meanings) {
    return(
        <div className="dict">
            <p className="word">{wrd}</p>
            <div className="meanings">
                {meanings.map((ele, index) => (
                    <Meaning
                        key = {index}
                        partOfSpeech = {ele.partOfSpeech}
                        def = {ele.definitions}
                    />
                ))}
            
            </div>
        </div>
    );
    }
    else {
        return(
            <div className="dict">
                <p className="word">{wrd}</p>
                <div className="meanings">
                    Sorry! Couldn't find that...
                </div>
            </div>
        );
    }
}
const Meaning = ({partOfSpeech, def}) => {
    const [definitions, setDefinitions] = useState([])
    useEffect(() => {
        setDefinitions(def);
    }, [def]);
        return(
            <div className="meaning">
                <p key={partOfSpeech} className="partofspeech">{partOfSpeech}</p> 
                    {definitions.map((definition, index) => (
                        <Definitions 
                            key = {index}
                            def = {definition.definition}
                            example = {definition.example}
                            syns = {definition.synonyms}
                        />
                    ))}
            </div>
        )
}

const Definitions = ({def, example, syns}) => {
    const [synonyms, setSynonyms] = useState([])
    useEffect(() => {
        setSynonyms(syns);
    }, [syns]);
    if (synonyms)
    {
        return(
            <ul>
                <li className="definition">
                    {def}
                    <div className="example">{example === "" || example === " " ? ("") : ("Example: " + example)}</div>

                    <div className="syns">
                    Synonyms:&nbsp;
                        {synonyms.map((synonym, index) => (
                            <span key={synonym}>{synonym},&nbsp;</span>
                        ))}
                    </div>
                </li>
            </ul>
        )
    }
    else{
        return(
            <ul>
            <li className="definition">
                {def}
                <div className="example">{example === "" || example === " " ? ("") : ("Example: " + example)}</div>
            </li>
            </ul>
        )   
    }
}

export default Dictionary;