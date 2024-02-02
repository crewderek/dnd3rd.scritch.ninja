import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSheetNewComponent } from './character-sheet-new.component';

describe('CharacterSheetNewComponent', () => {
  let component: CharacterSheetNewComponent;
  let fixture: ComponentFixture<CharacterSheetNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterSheetNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterSheetNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
