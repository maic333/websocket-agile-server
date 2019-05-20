# WebSocket Agile Server (WAS)

> Node.js module used for creating a WebSocket server that supports Request-Response communication with the clients


## Installation

```sh
npm install git+https://github.com/maic333/websocket-agile-server.git --save
```

## Dependencies

> Uses [ws](https://www.npmjs.com/package/ws) to create the WebSocket server

> Uses [Agile Client](https://github.com/maic333/agile-client) as a wrapper for the WebSocket server, to add support for Request-Response communication with the clients.

## Usage

> **Step 1**: Create the WAS server

```typescript
import { WebsocketAgileServer } from 'websocket-agile-server/dist';
...

const was = new WebsocketAgileServer({
  // options for creating the WebSocket server (directly passed to the 'ws' module)
  options: {
    port: 8080
  }
});
```

> **Step 2**: Handle messages received from clients

```typescript
import { PromiseExecutor } from 'agile-client/dist/types/promise-executor';
...

was.handleMessage = (message: string, executor: PromiseExecutor<string>) => {
  // say you are using JSON encoded objects for client-server communication
  try {
    const messageObj = JSON.parse(message);
    
    if (messageObj.message) {
      // send a response to the client
      executor.resolve('Received the message');
    } else {
      // send an error to the client
      executor.reject('There is no message');
    }
  } catch (e) {
    // send an error to the client
    executor.reject('Wrong message format');
  }
};
```

> **Step 3**: Send a message to a client
> * 'wsClient' is the WebSocket client that you want to send the message to

```typescript
was.sendMessage(wsClient, message)
  .then((result) => {
    // got a response
    console.log(result);
  })
  .catch((error) => {
    // something went wrong
    console.log(error);
  })
```

## License

ISC
