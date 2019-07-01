import { Component, OnInit } from '@angular/core';
import { PostCrudService } from "../../services/post-crud.service";
import { ActivatedRoute, Params } from '@angular/router';
import { Iposts } from 'src/app/interfaces/iposts';
import { Icomment } from 'src/app/interfaces/icomment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  postId: number;
  post: Iposts;
  comments: Icomment[];
  constructor(private PostCrudService: PostCrudService, private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.route.params.subscribe(async (params: Params) => {
      this.postId = params['id'];
      const data = await this.PostCrudService.getPostDetails(this.postId).catch(err => console.log(err));
      if (data) {
        data.subscribe(post => {
          this.post = post;
        })
      }
      const commentsData = await this.PostCrudService.getComments(this.postId).catch(err => console.log(err));
      if (commentsData) {
        commentsData.subscribe(comments => {
          this.comments = comments;
          this.comments = this.comments.filter(comm => comm.postId == this.postId);
        })
      }
    })
  }
}
