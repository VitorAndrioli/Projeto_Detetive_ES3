import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as io from 'socket.io-client'

@Injectable()
export class WebsocketService {
  public socket:io;
  constructor() { 
    this.socket = io('http://localhost:8000');
}


}