import { useEffect, useState } from "react"
import { socket } from "libs/socket"

function useConnectSocket() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        // function onFooEvent(value) {
        //     console.log(value, '<<< foo');
            
        //     setFooEvents(previous => [...previous, value]);
        // }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        // socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            // socket.off('foo', onFooEvent);
        };
    }, []);

    return [isConnected, fooEvents];
}

export default useConnectSocket;
