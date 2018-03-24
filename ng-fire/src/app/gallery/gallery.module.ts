import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryDetailComponent } from './gallery-detail/gallery-detail.component';
import { GalleryService } from './gallery.service';

const routes: Routes = [
  { path: 'gallery', component: GalleryListComponent },
  { path: 'gallery/:id', component: GalleryDetailComponent },
  { path: 'users/:id/:id', component: GalleryDetailComponent }

]
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GalleryListComponent, GalleryDetailComponent],
  providers: [GalleryService],
  
})
export class GalleryModule { }
