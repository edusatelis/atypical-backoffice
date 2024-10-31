import { Socket, io } from "socket.io-client";
import { SocketDto } from "../dtos/socket/socket.dto";
import { LocalStorageKeys } from "../utils/localStorage.util";

export abstract class BaseSocketService {

    private socketDto: SocketDto;
  
    constructor(socketDto: SocketDto) {
      this.socketDto = socketDto;
    }
  
    abstract initializeMain(): void;
  
    protected initializeCommonRoutine(socket: Socket): Socket {
  
      const user = JSON.parse(localStorage.getItem(LocalStorageKeys.user)!);
      const token = user.token
      if (!socket)
        socket = io(this.socketDto.host, {
          auth: {
            Authorization: `Bearer ${token}`,
          },
          path: this.socketDto.path,
        });
        console.log('socket', socket)
  
      return socket.connect();
    }
    
  
    abstract shutDownAll(): void;
  }