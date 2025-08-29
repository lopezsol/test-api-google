import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guestguardGuard } from './guestguard.guard';

describe('guestguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guestguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
