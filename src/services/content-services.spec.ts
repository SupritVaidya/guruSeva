import { TestBed } from '@angular/core/testing';

import { ContentServices } from './content-services';

describe('ContentServices', () => {
  let service: ContentServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
