import { Injectable } from '@angular/core';
import { Iposts } from '../interfaces/iposts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icomment } from '../interfaces/icomment';

@Injectable({
  providedIn: 'root'
})
export class PostCrudService {
  _postsUrl: string = 'https://jsonplaceholder.typicode.com/posts';
  posts: Iposts[] = [];

  constructor(private http: HttpClient) { }

  async getAllPosts(): Promise<Observable<Iposts[]>> {
    // console.log(this.http.get<Iposts[]>(this._postsUrl).subscribe(posts => { console.log(posts); }));
    return await this.http.get<Iposts[]>(this._postsUrl);
  }

  async getPostDetails(id: number): Promise<Observable<Iposts>> {
    return await this.http.get<Iposts>(`${this._postsUrl}/${id}`);
  }

  async getComments(id: number): Promise<Observable<Icomment[]>> {
    return await this.http.get<Icomment[]>(`${this._postsUrl}/${id}/comments`);
  }

  async addPost(post: Iposts): Promise<Observable<Iposts>> {
    let postNew: {};
    const postsObj = await this.getAllPosts();
    postsObj.subscribe(posts => {
      this.posts = posts;
    })
    let id = this.posts.length + 1;
    let userId = id % 10;
    if (id % 10 == 0)
      userId = userId - 1;
    postNew = {
      id: id,
      userId: userId,
      ...post
    }
    return await this.http.post<Iposts>(this._postsUrl, postNew);
  }

  async updatePost(post: Iposts): Promise<Observable<Iposts>> {
    return await this.http.put<Iposts>(`${this._postsUrl}/${post.id}`, post);
  }
}
