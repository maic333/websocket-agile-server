import * as WebSocket from 'ws';
import { PromiseExecutor } from 'agile-client/dist/types/promise-executor';
import { ServerConfig } from './types/server-config';
/**
 * WebSocket server that performs Request-Response communication with clients
 */
export declare class WebsocketAgileServer {
    private wss;
    private ac;
    constructor(config: ServerConfig);
    /**
     * #TODO implement 'handleConnection' method
     */
    /**
     * #TODO include the client in this callback
     * TO BE OVERWRITTEN
     * Handle a received message. By default, always respond with an ACK
     */
    handleMessage(message: string, executor: PromiseExecutor<string>): void;
    /**
     * Send a message to a WebSocket client
     */
    sendMessage(client: WebSocket, message: string): Promise<string>;
}
