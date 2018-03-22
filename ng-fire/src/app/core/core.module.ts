import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from '../auth/auth.module';
import { AuthService } from './auth.service';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { UserModule } from '../user/user.module';

@NgModule({
  imports: [
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AuthModule,
    UserModule
  ],
  declarations: [],
  providers: [AuthService]
})
export class CoreModule { }
