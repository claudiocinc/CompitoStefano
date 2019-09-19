import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaSquadraComponent } from './crea-squadra.component';

describe('CreaSquadraComponent', () => {
  let component: CreaSquadraComponent;
  let fixture: ComponentFixture<CreaSquadraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaSquadraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaSquadraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
