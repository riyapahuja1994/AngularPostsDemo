import { Component, OnInit } from '@angular/core';
import { Iposts } from "../../interfaces/iposts";
import { PostCrudService } from "../../services/post-crud.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Iposts[];
  constructor(private PostCrudService: PostCrudService) { }

  async ngOnInit() {
    const data = await this.PostCrudService.getAllPosts().catch(err => { console.log(err); });
    if (data) {
      data.subscribe(posts => {
        this.posts = posts;
      });
    }
  }
}
