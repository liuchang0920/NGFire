import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatFeedComponent } from './chat-feed/chat-feed.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatTreadComponent } from './chat-tread/chat-tread.component';
import { ChatTreadsComponent } from './chat-treads/chat-treads.component';

import { ThreadService } from './thread.service';
import { MessageService } from './message.service';
import { MessageComponent } from './message/message.component';


const routes: Routes = [
  { path: 'chat/detail', component: ChatDetailComponent },
  { path: 'chat', component: ChatDetailComponent }
]
@NgModule({
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ],
  exports: [
    ChatInputComponent, ChatFeedComponent, ChatMessagesComponent, ChatTreadsComponent // why export these components
  ],
  declarations: [ChatListComponent, ChatDetailComponent, ChatInputComponent, ChatFeedComponent, ChatMessageComponent, ChatMessagesComponent, ChatTreadComponent, ChatTreadsComponent, MessageComponent],
  providers: [ThreadService, MessageService]
})
export class ChatModule { }
