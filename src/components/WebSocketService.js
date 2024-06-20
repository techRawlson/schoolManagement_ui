// src/WebSocketService.js

class WebSocketService {
    constructor(url) {
      this.url = url;
      this.ws = null;
      this.connected = false;
      this.onMessageCallback = null;
    }
  
    connect() {
      if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
        this.ws = new WebSocket(this.url);
  
        this.ws.onopen = () => {
          console.log('Connected to WebSocket server');
          this.connected = true;
        };
  
        this.ws.onmessage = (event) => {
          console.log('Received message:', event.data);
          if (this.onMessageCallback) {
            this.onMessageCallback(event.data);
          }
        };
  
        this.ws.onclose = () => {
          console.log('Disconnected from WebSocket server');
          this.connected = false;
        };
  
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.connected = false;
        };
      } else {
        console.log('WebSocket is already connected or connecting');
      }
    }
  
    sendMessage(message) {
      if (this.connected && this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(message);
      } else {
        console.error('WebSocket is not open');
      }
    }
  
    disconnect() {
      if (this.ws) {
        this.ws.close();
      }
    }
  
    onMessage(callback) {
      this.onMessageCallback = callback;
    }
  }
  
  export default WebSocketService;
  