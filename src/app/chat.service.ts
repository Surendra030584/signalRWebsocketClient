import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  hubConnection: HubConnection;

   startConnection = async () => {
     this.hubConnection.start().then(() => {
      console.log('connection established with message hub');
    });
  }

  constructor() {
    // create connection with Hub
    this.hubConnection = new HubConnectionBuilder().withUrl('http://localhost/signalr.API/signalrtc').build();

    // register methods from server
    this.hubConnection.on('newMessage', (data) => {
      console.log(`newMessage: ${JSON.stringify(data)}`);
    });
    this.hubConnection.on('Send', (data) => {
      console.log(`Send: ${JSON.stringify(data)}`);
    });

    // start connection with message hub.
    // this.startConnection();
  }

  sendMessage = message => {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('SendMessage', message);
    }
  }

  sendMessageToGroup = (username, groupName, message) => {
    this.hubConnection.start().then(() => {
      this.hubConnection.invoke('SendMessageToGroup', username, groupName, message);
    });
  }

  addToGroup = (username, groupName) => {
    this.hubConnection.start().then(() => {
      this.hubConnection.invoke('AddToGroup', username, groupName);
    });
  }

  removeFromGroup = (username, groupName) => {
    this.hubConnection.start().then(() => {
      this.hubConnection.invoke('RemoveFromGroup', username, groupName);
    });
  }


}
