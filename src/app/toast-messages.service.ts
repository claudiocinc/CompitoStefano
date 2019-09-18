import { MessageService } from 'primeng/components/common/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {

  constructor(private messageService: MessageService) { }
  calltoast(sev, sum, det) {
    this.messageService.add({severity: sev, key: 'toast', summary: sum, detail: det});
  }
}
