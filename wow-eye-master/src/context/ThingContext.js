import React, {useEffect, useState} from "react";

const ThingContext = React.createContext();

const ThingContextProvider = (props) => {
    const [things, setThings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3100/things')
            .then(response => response.json())
            .then (data => setThings(data));
    }, []);



    return (
        <ThingContext.Provider value={{
            things,
        }}>
            {props.children}
        </ThingContext.Provider>
    )
}

export {ThingContextProvider, ThingContext}