import { ServerOptions } from 'ws';
export interface ServerConfig {
    options: ServerOptions;
    requestTimeout?: number;
}
