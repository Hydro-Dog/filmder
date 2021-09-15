import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class InviteService {
  message$ = this.socket.fromEvent<string>('msgToClient');

  constructor(private socket: Socket) {}

  msgToServer(message) {
    console.log('msgToServer');
    this.socket.emit('msgToServer', message);
  }
}
