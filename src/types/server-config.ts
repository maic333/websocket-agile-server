import { ServerOptions } from 'ws';

export interface ServerConfig {
  // options for creating the Websocket server
  options: ServerOptions;
  // request timeout value
  requestTimeout?: number;
}
