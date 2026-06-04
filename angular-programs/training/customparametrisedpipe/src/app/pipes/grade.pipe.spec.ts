import { GradePipe } from './grade.pipe';

describe('GradePipe', () => {
  let pipe: GradePipe;

  beforeEach(() => {
    pipe = new GradePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Letter grade format', () => {
    it('should return A+ for marks >= 90', () => {
      expect(pipe.transform(95, 'letter')).toBe('95 - A+');
      expect(pipe.transform(90, 'letter')).toBe('90 - A+');
    });

    it('should return A for marks >= 80', () => {
      expect(pipe.transform(85, 'letter')).toBe('85 - A');
      expect(pipe.transform(80, 'letter')).toBe('80 - A');
    });

    it('should return B for marks >= 70', () => {
      expect(pipe.transform(75, 'letter')).toBe('75 - B');
      expect(pipe.transform(70, 'letter')).toBe('70 - B');
    });

    it('should return F for marks < 50', () => {
      expect(pipe.transform(45, 'letter')).toBe('45 - F');
      expect(pipe.transform(30, 'letter')).toBe('30 - F');
    });
  });

  describe('Word grade format', () => {
    it('should return Excellent for marks >= 90', () => {
      expect(pipe.transform(95, 'word')).toBe('95 - Excellent');
    });

    it('should return Very Good for marks >= 80', () => {
      expect(pipe.transform(85, 'word')).toBe('85 - Very Good');
    });

    it('should return Fail for marks < 50', () => {
      expect(pipe.transform(45, 'word')).toBe('45 - Fail');
    });
  });

  it('should default to letter format when no format specified', () => {
    expect(pipe.transform(85)).toBe('85 - A');
  });
});
