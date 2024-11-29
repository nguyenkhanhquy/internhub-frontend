import { useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { toast } from "react-toastify";

const useWebSocket = (email) => {
    const stompClientRef = useRef(null);

    const connectWebSocket = useCallback(() => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate(); // Đảm bảo hủy kết nối cũ
        }

        const client = new Client({
            webSocketFactory: () => new SockJS(`${import.meta.env.VITE_BACKEND_URL}` + "/ws"),
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Connected to WebSocket!");

                client.subscribe("/topic/message", (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    toast.info(`Public message: ${receivedMessage.message}`);
                });

                client.subscribe(`/user/${email}/private`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    toast.info(`Private message: ${receivedMessage.message}`);
                });
            },
            onDisconnect: () => {
                console.log("Disconnected from WebSocket!");
            },
            onStompError: (frame) => {
                console.error("STOMP error:", frame);
            },
        });

        client.activate();
        stompClientRef.current = client;
    }, [email]);

    const disconnectWebSocket = useCallback(() => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate();
            stompClientRef.current = null;
        }
    }, []);

    return { connectWebSocket, disconnectWebSocket };
};

export default useWebSocket;
