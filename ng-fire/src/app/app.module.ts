import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { MaterialModule } from './/material.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RoutingModule } from './/routing.module';
import { environment } from '../environments/environment';
import { PostModule } from './post/post.module';
import { GalleryModule } from './/gallery/gallery.module';
import { ChatModule } from './/chat/chat.module';
// import auth？
import { AuthModule } from './auth/auth.module';
import { RoutingGuard } from './/routing.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    RoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}), 
    AngularFireModule.initializeApp(environment.firebase),
    PostModule,
    GalleryModule,
    ChatModule,
    AuthModule
  ],
  providers:[RoutingGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
