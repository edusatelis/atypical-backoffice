import { Injectable } from "@angular/core";
import { ReplaySubject, BehaviorSubject } from "rxjs";
import { Socket } from "socket.io-client";
import { environment } from "src/environments/environment";
import { MessageListIdentifierWebsocketDto } from "../dtos/message/message-list-identifier-websocket.dto";
import { MessageRegisterRequestDto } from "../dtos/message/messsage-register-request.dto";
import { ResponseDto } from "../dtos/socket/response.dto";
import { SocketDto } from "../dtos/socket/socket.dto";
import { BaseSocketService } from "./base.socket.service";
import { ChatEventsEnum } from "../enums/chat-events.enum";

@Injectable({
    providedIn: "root",
  })
  export class ChatSocketService extends BaseSocketService {
  
    private _socket: Socket | undefined;
  
    joinConversationResponse = new ReplaySubject<MessageListIdentifierWebsocketDto>();
    messages = new BehaviorSubject<MessageRegisterRequestDto[]>([]);
    response = new ReplaySubject<ResponseDto>();
  
  
  
    constructor(
    ) {
      super(
        new SocketDto(
          environment.socket.chat.host,
          environment.socket.chat.path,
        ));
    }
  
    initializeMain(): Socket {
      this._socket = this.initializeCommonRoutine(this._socket!);
      return this._socket;
    }
  
  
    sendMessage(dto: MessageRegisterRequestDto) {
  
      this._socket!.emit(
        ChatEventsEnum.SEND_MESSAGE_BACKOFFICE,
        dto
      );
  
      this._socket!.on(ChatEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE, (response: ResponseDto) => {
  
       
        if (response.success) {
  
          this.messages.next(response.data);
        }
  
      });
    }
  
  
    requestMessageList(identifier: string, client1: string, client2: string): void {
  
      if (this._socket) {
        this._socket.emit(ChatEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE, { identifier , client1, client2});
        this._socket.on(ChatEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE, (response: ResponseDto) => {
          if (response.success) {
            this.messages.next(response.data);
          }
        });
      } else {
        console.error('WebSocket não está conectado.');
      }
    }
    getMessages() {
      return this.messages.asObservable()
    }
  
    joinRoom(identifier: string): void {
      if (this._socket) {
        this._socket.emit(ChatEventsEnum.REQUEST_JOIN_ROOM_IDENTIFIER_BACKOFFICE, { identifier });
        this._socket.on(ChatEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE, (response: ResponseDto) => {
          if (response.success) {
            this.messages.next(response.data);
          }
        });
      } else {
        console.error('WebSocket não está conectado.');
      }
    }
  
    shutDownAll(): void {
      if (!!this._socket && this._socket.connected) {
        this._socket.offAny()
        this._socket.removeAllListeners();
        this._socket.close();
        this._socket.disconnect();
      }
    }
  }