"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var dist_1 = require("agile-client/dist");
/**
 * WebSocket server that performs Request-Response communication with clients
 */
var WebsocketAgileServer = /** @class */ (function () {
    function WebsocketAgileServer(config) {
        var _this = this;
        // create the AC instance
        this.ac = new dist_1.AgileClient(config.requestTimeout);
        // overwrite the default message handler of the AC
        this.ac.handleMessage = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.handleMessage.apply(_this, args);
        };
        // create the WebSocket server
        this.wss = new WebSocket.Server(config.options);
        // listen for new connections
        this.wss.on('connection', function (ws) {
            // listen for new messages
            ws.on('message', function (message) {
                // configure the AC to handle the messages received over the WebSocket connection
                _this.ac.receiveMessage(ws, message);
            });
        });
        this.wss.on('error', function (error) {
            // #TODO
            var err = error;
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
    WebsocketAgileServer.prototype.handleMessage = function (message, executor) {
        executor.resolve('OK');
    };
    /**
     * Send a message to a WebSocket client
     */
    WebsocketAgileServer.prototype.sendMessage = function (client, message) {
        // send messages through the AC
        return this.ac.sendMessage(client, message);
    };
    return WebsocketAgileServer;
}());
exports.WebsocketAgileServer = WebsocketAgileServer;
