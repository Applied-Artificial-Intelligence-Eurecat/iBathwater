import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { useLocation } from "react-router";

const TimelineContext = React.createContext();

const TimelineContextProvider = (props) => {
    let socket;
    let { id } = useParams();
    let location = useLocation();
    let thingId = location.state.thingId;
    let thingProperty = location.state.property;
    const [timeData, setTimeData] = useState([]);

    const handleDisconnect = () => {
       if (socket) socket.close();
    }

    useEffect(() => {
        socket = new WebSocket('ws://'+thingId.split('http://')[1]+'/properties/'+thingProperty.title);
        socket.onmessage = (event) => {
            const recevData = JSON.parse(event.data);
            setTimeData(prevData => prevData.length > 10? [...prevData, recevData.data.measurement].slice(1)
                :[...prevData, recevData.data.measurement]);
        };


    }, []);

    return (
        <TimelineContext.Provider value ={{
            id,
            thingProperty,
            timeData
        }}>
            {props.children}
        </TimelineContext.Provider>
    )
}


export {TimelineContext, TimelineContextProvider}