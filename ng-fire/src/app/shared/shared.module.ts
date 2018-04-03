import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FromNowPipe } from './from-now.pipe';

import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';
import { NavbarComponent } from './navbar/navbar.component';

// import router ?? ..
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule , MaterialModule, RouterModule
  ],
  exports: [ CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, FromNowPipe,UploadComponent, NavbarComponent], 
  declarations: [FromNowPipe, UploadComponent, NavbarComponent],
  providers: [UploadService]
})
export class SharedModule { }
