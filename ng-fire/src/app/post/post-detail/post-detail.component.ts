import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post

  constructor(private route: ActivatedRoute,
              private postService: PostService) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.getPostData(id).subscribe(post => this.post = post)
  }
}
