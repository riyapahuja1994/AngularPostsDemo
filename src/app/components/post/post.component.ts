import { Component, OnInit, Input } from '@angular/core';
import { Iposts } from 'src/app/interfaces/iposts';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Iposts;

  constructor() { }

  ngOnInit() {
  }

}
