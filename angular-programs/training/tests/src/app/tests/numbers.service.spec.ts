import { TestBed } from '@angular/core/testing';
import { NumbersService } from './numbers.service';
import { Numbers } from './numbers.model';

describe('NumbersService', () => {
  let service: NumbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumbersService]
    });

    service = TestBed.inject(NumbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return numbers [1, 2, 3]', () => {
    const expectedResult: Numbers = { values: [1, 2, 3] };

    service.getNumbers().subscribe(data => {
      expect(data).toEqual(expectedResult);
      expect(data.values.length).toBe(3);
      expect(data.values).toContain(1);
      expect(data.values).toContain(2);
      expect(data.values).toContain(3);
    });
  });

});