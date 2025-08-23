import {WebSocketContext} from "@/context/WebSocketContext";
import React from "react";

export const useWebSocketContext = () => {
    const context = React.useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocketContext must be used within a WebSocketProvider');
    }
    return context;
}