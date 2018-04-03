import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Location } from '@angular/common';

import { AuthService } from '../../core/auth.service';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  editing = false;
  user: User;
  task: AngularFireUploadTask;

  path: string
  meta: object
  uploadType: boolean

  constructor(private auth: AuthService,
              private userService: UserService,
              private storage: AngularFireStorage,
              private location: Location) { }

  ngOnInit() {
    this.getUser();
    this.setUploadData();
  }

  getUser() {
    this.auth.user.subscribe(user => {
      this.user = user;
      console.log("find user：", user);
      return null;
    });
  }

  updateProfile() {
    return this.userService.updateProfileData(
      this.user.displayName,
      this.user.photoURL
    )
  }

  updateEmail() {
    return this.userService.updateEmailData(
      this.user.email
    )
  } 

  uploadPhotoURL(event): void {
    const file = event.target.files[0]
    const path = `users/${this.user.uid}/photos/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert("only images allowed");
    } else {
      this.task = this.storage.upload(path, file)
      this.task.downloadURL().subscribe(url => {
        this.userService.updateProfileData(this.user.displayName, url)
      })
    }
  }

  updateUser() {
    console.log("updating user..")
    const data = {
      website: this.user.website || null,
      location: this.user.location || null,
      bio: this.user.bio || null
    }
    return this.userService.updateUserData(data)
  }

  goBack() {
    this.location.back();
  }

  setUploadData() {
    const uid = this.auth.currentUserId;
    return this.auth.user.subscribe(user => {
      this.path = `users/${uid}/gallery`
      this.meta = {
        uploader: user.uid,
        website: 'www.google.com',
      }
      // true means collections upload
      // flase means document field upload
      this.uploadType = true
    })
  }
}
