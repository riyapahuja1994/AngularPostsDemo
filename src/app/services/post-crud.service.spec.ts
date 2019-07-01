import { TestBed } from '@angular/core/testing';

import { PostCrudService } from './post-crud.service';

describe('PostCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostCrudService = TestBed.get(PostCrudService);
    expect(service).toBeTruthy();
  });
});
