import { TestBed } from '@angular/core/testing';

import { ToastMessagesService } from './toast-messages.service';

describe('ToastMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastMessagesService = TestBed.get(ToastMessagesService);
    expect(service).toBeTruthy();
  });
});
