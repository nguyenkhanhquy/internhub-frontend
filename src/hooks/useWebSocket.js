// @ts-nocheck

import { useRef, useCallback, useState } from "react";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

import { toast } from "react-toastify";

const isDevelopment = import.meta.env.MODE === "development";

const useWebSocket = (id) => {
    const stompClientRef = useRef(null);
    const [flag, setFlag] = useState(false);

    const connectWebSocket = useCallback(async () => {
        if (stompClientRef.current) {
            await stompClientRef.current.deactivate(); // Đảm bảo hủy kết nối cũ
        }

        const client = new Client({
            webSocketFactory: () => new SockJS(`${import.meta.env.VITE_BACKEND_URL}` + "/ws"),
            debug: (str) => {
                if (isDevelopment) console.log(str);
            },
            reconnectDelay: 5000,
            onConnect: () => {
                if (isDevelopment) console.log("Connected to WebSocket!");

                client.subscribe("/topic/message", (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    toast.info(`Public message: ${receivedMessage.message}`);
                });

                if (id) {
                    client.subscribe(`/user/${id}/private`, (message) => {
                        const receivedMessage = JSON.parse(message.body);
                        setFlag((prev) => !prev);
                        toast.info(`${receivedMessage.message}`);
                    });
                }
            },
            onDisconnect: () => {
                if (isDevelopment) console.log("Disconnected from WebSocket!");
            },
            onStompError: (frame) => {
                if (isDevelopment) console.error("STOMP error:", frame);
            },
        });

        client.activate();
        stompClientRef.current = client;
    }, [id]);

    const disconnectWebSocket = useCallback(async () => {
        if (stompClientRef.current) {
            await stompClientRef.current.deactivate();
            stompClientRef.current = null;
        }
    }, []);

    return { connectWebSocket, disconnectWebSocket, flag };
};

export default useWebSocket;
