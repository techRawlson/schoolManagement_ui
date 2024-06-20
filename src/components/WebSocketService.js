// WebSocketService.js
class WebSocketService {
    constructor(url) {
      this.url = url;
      this.ws = null;
      this.onMessageCallback = null;
    }
  
    connect() {
      this.ws = new WebSocket(this.url);
  
      this.ws.onopen = () => {
        console.log('Connected to WebSocket server');
      };
  
      this.ws.onmessage = (event) => {
        console.log('Received message:', event.data);
        if (this.onMessageCallback) {
          this.onMessageCallback(event.data); // Invoke callback with received message
        }
      };
  
      this.ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };
  
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  
    sendMessage(message) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(message);
        console.log('Sent message:', message);
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
  