import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Post } from './post.model';

@Injectable()
export class PostService {
  postCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument<Post>;

  constructor(private afs: AngularFirestore) { 
    this.postCollection = this.afs.collection<Post>("posts", ref => ref.orderBy("trending", "desc").limit(10));
  }

  create(data: Post) {
    return this.postCollection.add(data);
  }

  getPosts(): Observable<Post[]> {
    // this.postCollection = this.afs.collection('posts');
    // return this.postCollection.valueChanges();
    return this.postCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  getPostData(id: string) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`)
    return this.postDoc.valueChanges()
  }

  getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`)
  }

  delete(id: string) {
    return this.getPost(id).delete();
  }

  update(id: string, formData) {
    return this.getPost(id).update(formData);
  }
}
