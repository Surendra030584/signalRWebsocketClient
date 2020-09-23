import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'test-chat-app';
  name = '';
  messages: Array<string>;
  constructor(private chatService: ChatService) { 
    this.messages = new Array<string>();
  }

  ngOnInit(): void {
    // this.chatService.startConnection().then(() => {
    //   this.chatService.sendMessage('Hello Arjun');
    // });
  }

  run = () => {
    // alert('Hello');
    const url = `ws://localhost/WebAPIDemo/WebSocketServer.ashx?chatName=${this.name}`;
    const w = new WebSocket(url);
    w.onopen = () => {
      console.log('open web socket');
      w.send('thanks');
    };

    w.onmessage = (e) => {
      this.messages.push(e.data.toString());
      console.log(e.data.toString());
    };

    w.onclose = () => {
      console.log('closed');
    };

    w.onerror = () => {
      console.log('error');
    };
  }

}
