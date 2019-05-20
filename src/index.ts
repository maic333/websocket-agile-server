import * as WebSocket from 'ws';
import { AgileClient } from 'agile-client/dist';
import { PromiseExecutor } from 'agile-client/dist/types/promise-executor';
import { ServerConfig } from './types/server-config';

/**
 * WebSocket server that performs Request-Response communication with clients
 */
export class WebsocketAgileServer {
  // WebSocket server
  private wss: WebSocket.Server;
  // Agile Client
  private ac: AgileClient<WebSocket>;

  constructor(config: ServerConfig) {
    // create the AC instance
    this.ac = new AgileClient<WebSocket>(config.requestTimeout);

    // overwrite the default message handler of the AC
    this.ac.handleMessage = (...args) => {
      return this.handleMessage(...args);
    };

    // create the WebSocket server
    this.wss = new WebSocket.Server(config.options);

    // listen for new connections
    this.wss.on('connection', (ws: WebSocket) => {
      // listen for new messages
      ws.on('message', (message: string) => {
        // configure the AC to handle the messages received over the WebSocket connection
        this.ac.receiveMessage(ws, message);
      });
    });

    this.wss.on('error', (error) => {
      // #TODO
      const err = error;
    });
  }

  /**
   * #TODO implement 'handleConnection' method
   */

  /**
   * #TODO include the client in this callback
   * TO BE OVERWRITTEN
   * Handle a received message. By default, always respond with an ACK
   */
  public handleMessage(message: string, executor: PromiseExecutor<string>) {
    executor.resolve('OK');
  }

  /**
   * Send a message to a WebSocket client
   */
  public sendMessage(client: WebSocket, message: string): Promise<string> {
    // send messages through the AC
    return this.ac.sendMessage(client, message);
  }
}
