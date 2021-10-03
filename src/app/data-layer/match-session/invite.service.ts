import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class InviteService {
  message$ = this.socket.fromEvent<string>('msgToClient');
  socketOn$ = this.socket.fromEvent<string>('socketOn');

  constructor(private socket: Socket) {}

  msgToServer(event: string, message: any) {
    this.socket.emit(event, message);
  }
}
