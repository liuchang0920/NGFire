import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FromNowPipe } from './from-now.pipe';

import { UploadComponent } from './upload/upload.component';
import { UploadService } from './upload/upload.service';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule , MaterialModule
  ],
  exports: [ CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, FromNowPipe,UploadComponent ], 
  declarations: [FromNowPipe, UploadComponent],
  providers: [UploadService]
})
export class SharedModule { }
