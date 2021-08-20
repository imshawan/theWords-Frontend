import React, {useEffect,useState} from 'react';

const Dictionary = ({meaning}) => {
    const [meanings, setMeanings] = useState([])


    useEffect(() => {
        setMeanings(meaning);
    }, [meaning]);

    if (meanings) {
    return(
        <div className="dictionary-items">
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
            <div className="dictionary-items">
                <div className="meanings">
                    <div className="not-found">
                        Sorry, I Couldn't find that...!
                    </div>
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
        var synss = "";
        for (var i=0; i<synonyms.length; i++){
            if (synss === ""){
                synss += synonyms[i];
            }
            else {
                synss += ", " + synonyms[i];
            }
        }
        return(
            <ul>
                <li className="definition-items">
                    <div className="definition">{def}</div>
                    <div className="example">{example === "" || example === " " || typeof(example) === "undefined" ? 
                    ("") : ("Example: " + example)}</div>
                    <div className="syns hyphens">
                    Synonyms:&nbsp;
                        {synss}
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
                <div className="example">{example === "" || example === " " || typeof(example) === "undefined" ? 
                ("") : ("Example: " + example)}</div>
            </li>
            </ul>
        )   
    }
}

export default Dictionary;