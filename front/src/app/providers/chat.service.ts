import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const CHAT_URL = 'ws://localhost:3030';

export interface Message {
	author: string,
	message: string
}
export interface User {
	email: string,
	password:string,
	admin:boolean
}
@Injectable()
export class ChatService {
	constructor(wsService: WebsocketService) {
	}


}