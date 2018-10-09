import { TestBed, inject } from '@angular/core/testing';

import { NavigationManagerService } from './navigation-manager.service';

describe('NavigationManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationManagerService]
    });
  });

  it('should be created', inject([NavigationManagerService], (service: NavigationManagerService) => {
    expect(service).toBeTruthy();
  }));
});
