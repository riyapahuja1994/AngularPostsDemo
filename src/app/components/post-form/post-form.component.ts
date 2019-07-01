import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Iposts } from 'src/app/interfaces/iposts';
import { PostCrudService } from "../../services/post-crud.service";
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  addPostForm: FormGroup;
  isUpdate: boolean = false;
  post: Iposts;
  result: Iposts = null;
  successAddPost: boolean = false;
  successUpdatePost: boolean = false;
  postId: number;

  constructor(private PostCrudService: PostCrudService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    await this.route.params.subscribe(
      async (params: Params) => {
        this.postId = +params['id'];
        this.isUpdate = this.postId ? true : false;
        if (this.isUpdate) {
          const data = await this.PostCrudService.getPostDetails(this.postId);
          if (data) {
            data.subscribe(post => {
              this.post = post;
              this.initForm();
            })
          }
        }
        else
          this.initForm();
      }
    )
  }

  initForm() {
    let title = '';
    let body = '';
    if (this.isUpdate) {
      title = this.post.title;
      body = this.post.body;
    }
    this.addPostForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'body': new FormControl(body, Validators.required)
    });
    if (this.isUpdate) {
      let id = this.post.id;
      let userId = this.post.userId;
      this.addPostForm.addControl('id', new FormControl(id));
      this.addPostForm.addControl('userId', new FormControl(userId));
    }
  }

  async savePost() {
    console.log(this.addPostForm.value);
    if (this.isUpdate) {
      const data = await this.PostCrudService.updatePost(this.addPostForm.value).catch(err => { console.log(err); });
      if (data) {
        data.subscribe(post => {
          this.result = post;
          this.successUpdatePost = true;
          setTimeout(() => {
            this.successUpdatePost = false;
            this.router.navigateByUrl('/posts');
          }, 5000);
        });
      }
    }
    else {
      const data = await this.PostCrudService.addPost(this.addPostForm.value).catch(err => { console.log(err); });
      if (data) {
        data.subscribe(post => {
          this.result = post;
          this.successAddPost = true;
          setTimeout(() => {
            this.successAddPost = false;
            this.addPostForm.reset();
          }, 2000);
        })
      }
    }
  }

}
