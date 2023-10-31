import * as signalR from "@microsoft/signalr";

// const URL = "https://localhost:7203/hub";
const URL = "https://localhost:5000/api/gameshub";

class Connector {
  public connection: signalR.HubConnection;
  public listenForMessages: (callback: (message: string) => void) => void;
  private callbacks: ((message: string) => void)[] = [];
  static instance: Connector;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();
    this.connection.start().catch(err => document.write(err));
    this.listenForMessages = (callback: (message: string) => void) => {
      if (this.callbacks.length === 0)

      this.connection.on("message", callback);
      this.callbacks.push(callback);
    };
  }
  public send = (message: string) => {
    this.connection.send("sendMessage", message).then(x => console.log("sent"));
  };

  public registerPong = (callback: () => void) => {
    if (this.callbacks.length === 0)
    this.connection.on("log", callback);
    this.callbacks.push(callback);

  }
  public ping = () => {
    this.connection.send("ping").then(x => console.log("pinged"));
  }

  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();
    return Connector.instance;
  }
}
export default Connector.getInstance;