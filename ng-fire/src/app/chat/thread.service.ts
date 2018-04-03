import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Thread } from './/thread.model';
import { Message } from './/message.model';

import { AuthService } from '../core/auth.service';
import { MessageService } from './/message.service';

@Injectable()
export class ThreadService {

  threadsCollection: AngularFirestoreCollection<Thread>;
  threadDoc: AngularFirestoreDocument<Thread>;
  
  messages: Observable<Message[]>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  getThreads() {
    this.threadsCollection = this.afs.collection('chats', ref => ref.where(`members.${this.auth.currentUserId}`, "==", true))
    return this.threadsCollection.valueChanges();
  }

  getThread(profileId: string) {
    this.threadDoc = this.afs.doc<Thread>(`chats/${profileId}`)
    return this.threadDoc.valueChanges();
  }

  createThread(profileId) {
    const currentUserId = this.auth.currentUserId;
    const id = profileId < currentUserId ? `${profileId}_${currentUserId}` : `${currentUserId}_${profileId}` 
    const avatar = this.auth.authState.photoURL;
    const members = {
      [profileId]: true,
      [currentUserId]: true
    }
    const creator = this.auth.authState.displayName || this.auth.authState.email
    const lastMessage = null

    const thread: Thread = {
      id, avatar, creator, lastMessage, members
    }

    const threadPath = `chats/${id}`;

    return this.afs
    .doc(threadPath)
    .set(thread, {merge: true})
    .then(()=> this.router.navigate([`chat/${id}`]));
  }

  async deleteThread(threadId: string) {
    const batch = this.afs.firestore.batch()
    const query = await this.afs.collection(`chats/${threadId}/messages`).ref.get()
    console.log(query)
    query.forEach(doc => {
      console.log(doc);
      console.log(`deleteing: ${doc.ref}`);
      batch.delete(doc.ref);
    })

    batch.commit().then(()=> {
      this.afs.doc(`chats/${threadId}`).delete();

    })
  }

  saveLastMessage(channelId, message) {
    const data = {
      lastMessage: message,

    }
    return this.afs.doc(`chats/${channelId}`).set(data, { merge: true});

  }
}
