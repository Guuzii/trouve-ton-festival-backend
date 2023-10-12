import { BadRequestException } from '@nestjs/common';

import { EmailValidationPipe } from './email-validation.pipe';

describe('EmailValidationPipe', () => {
  let emailValidationPipe: EmailValidationPipe;

  beforeEach(() => {
    emailValidationPipe = new EmailValidationPipe();
  });

  it('should be defined', () => {
    expect(emailValidationPipe).toBeDefined();
  });

  describe('successful calls', () => {
    it('should let a valid email string go on through', () => {
      const email: string = 'foo@bar.com';
      expect(emailValidationPipe.transform(email)).toEqual(email);
    });
  });

  describe('unsuccessful calls', () => {
    describe('bad email string', () => {
      it('should throw an error bad email string', () => {
        const email: string = 'test';
        const errorPipe = () => emailValidationPipe.transform(email);

        expect(errorPipe).toThrowError(BadRequestException);
        expect(errorPipe).toThrowError(
          'Validation failed (valid email format is expected)',
        );
      });
    });
  });
});
