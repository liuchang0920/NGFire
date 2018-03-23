import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { PostService } from '../post.service';
import { Post } from '../post.model';
import { AuthService } from '../../core/auth.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  postForm: FormGroup;
  imageURL: string;
  uploadPercent: Observable<Number>;
  downloadURL: Observable<string>;

  constructor(private postService: PostService,
              private fb: FormBuilder,
              private auth: AuthService,
              private storage: AngularFireStorage) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = this.fb.group({
      title: [''],
      content: [''],
      draft: false
    })
  }

  savePost(data: Post) {
    const formData: Post = {
      author: this.auth.authState.displayName || this.auth.authState.email, // displayName is optional, email is required
      authorId: this.auth.currentUserId,
      title: this.postForm.get('title').value,
      image: this.imageURL || null,
      content: this.postForm.get('content').value,
      draft: this.postForm.get('draft').value || false,
      published:new Date(),
      trending: 0
    }

    if(!this.postForm.untouched) {
      this.postService.create(formData);
      this.postForm.reset();

    }
    this.imageURL = '';

  }

  uploadPostImage(event) {
    const file = event.target.files[0]
    const path = `posts/${file.name}`
    if (file.type.split('/')[0] !== "image") {
      return alert("only image files")
    } else {
      const task = this.storage.upload(path, file);
      this.downloadURL = task.downloadURL();
      this.uploadPercent = task.percentageChanges();
      console.log('iamge uploaded..');
      this.downloadURL.subscribe(url => this.imageURL = url);
    }
  }
}
