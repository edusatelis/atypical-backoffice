import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'socket.io-client';
import { MessageRegisterRequestDto } from 'src/app/dtos/message/messsage-register-request.dto';
import { HelpStatusEnum } from 'src/app/enums/help.enum';
import { ChatSocketService } from 'src/app/services/chat.socket.service';
import { HelpService } from 'src/app/services/help.service';
import { UserService } from 'src/app/services/user.service';


interface Message {
  text: string;
  user: boolean;
}

@Component({
  selector: 'app-message-help-modal',
  templateUrl: './message-help-modal.component.html',
  styleUrls: ['./message-help-modal.component.scss']
})
export class MessageHelpModalComponent {

  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;


  form: FormGroup;
  helpRequest: any;

  senderId: string = ''
  reciverId: string = ''
  chatSocket: Socket | undefined;
  messageList: MessageRegisterRequestDto[] =[]
  targetName: string = ''
  targetPhoto: string = ''
  messageContent: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private modalService: MatDialog,
    public  _chatGateway:ChatSocketService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private helpService: HelpService


  ) {
    this.form = this.formBuilder.group({
      message: [''],
    });
  }


  ngOnInit() {
    const userStorage = JSON.parse(localStorage.getItem('user') || "");
    

    if(this.helpRequest.status == HelpStatusEnum.PENDING){

      this.helpService.update(this.helpRequest.id,HelpStatusEnum.OPEN).subscribe({
        next: data =>{
          
        }
      })
    }

    this._chatGateway.initializeMain(); 
    this.route.params.subscribe(params => {
      this.reciverId =this.helpRequest.user.id;
      this.senderId = userStorage.id

      const identifier = this.senderId + this.reciverId;
      this.userService.getById(this.reciverId).subscribe({
        next: (data: any) => {
          console.log('da', data)
          this.targetName = data.name
          this.targetPhoto = data.profilePicture
        }
        
      })

      this._chatGateway.joinRoom(identifier);
      this._chatGateway.requestMessageList(identifier, this.senderId, this.reciverId)
      this._chatGateway.getMessages().subscribe(messages => {
        this.messageList = messages.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        this.cdr.detectChanges();
        this.scrollToBottom();
      });
    });
  }

  solved(){
    this.helpService.update(this.helpRequest.id,HelpStatusEnum.SOLVED).subscribe({
      next: data => {
        this.close()
      }
    })
  }

  close() {
    this.modalService.closeAll();
    window.location.href = window.location.href
  }

  connect() {
    this.chatSocket =  this._chatGateway.initializeMain();
    
  }
  private scrollToBottom(): void {
    if (this.chatMessagesContainer && this.chatMessagesContainer.nativeElement) {
      try {
        this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
      } catch(err) {
        console.error('Error scrolling to bottom:', err);
      }
    } else {
      console.error('chatMessagesContainer is not defined');
    }
  }

  sendMessage() {
    const messageInput = document.getElementById('messageInput') as HTMLInputElement;
    this._chatGateway.sendMessage({client1: this.senderId, client2:  this.reciverId, content: messageInput.value, identifier: this.senderId+this.reciverId})
    messageInput.value = '';
    this.scrollToBottom();

  }

  goBack() {
    this.router.navigate(['/logged/messages'])
  }
}

