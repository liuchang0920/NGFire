import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from '../auth/auth.module';
import { AuthService } from './auth.service';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule} from 'angularfire2/auth';

@NgModule({
  imports: [
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AuthModule
  ],
  declarations: [],
  providers: [AuthService]
})
export class CoreModule { }
