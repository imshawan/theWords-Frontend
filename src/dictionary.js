import React, {useEffect,useState} from 'react';

const Dictionary = ({wrd,meaning}) => {
    const [meanings, setMeanings] = useState([])
    useEffect(() => {
    setMeanings(meaning);
    }, [meaning]);
    return(
        <div className="Dict">
            <p className="word">Word: {wrd}</p>
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
const Meaning = ({partOfSpeech, def}) => {
    const [definitions, setDefinitions] = useState([])
    useEffect(() => {
        setDefinitions(def);
    }, [def]);
        return(
            <div className="meaning">
                <p>{partOfSpeech}</p> 
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
            <div className="definition">
                {def}
                <div className="example">{example}</div>
                <div className="syns">
                    {synonyms.map((synonym, index) => (
                        <span>{synonym},&nbsp;</span>
                    ))}
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="definition">
                {def}
                <div className="example">Example: {example}</div>
            </div>
        )   
    }
}

export default Dictionary;