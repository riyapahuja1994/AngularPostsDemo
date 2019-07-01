import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { NoSelectionComponent } from './components/no-selection/no-selection.component';

const routes: Routes = [
  {
    path: 'posts', component: PostsComponent,
    children: [
      { path: '', component: NoSelectionComponent },
      { path: ':id', component: PostDetailsComponent }
    ]
  },
  { path: 'new-post', component: PostFormComponent },
  { path: 'new-post/:id', component: PostFormComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: '**', redirectTo: '/posts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
