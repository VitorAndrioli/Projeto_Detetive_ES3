import { TestBed, inject } from '@angular/core/testing';

import { WaitRoomService } from './wait-room.service';

describe('WaitRoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaitRoomService]
    });
  });

  it('should ...', inject([WaitRoomService], (service: WaitRoomService) => {
    expect(service).toBeTruthy();
  }));
});
