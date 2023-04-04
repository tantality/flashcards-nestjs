import { ValidationError } from 'class-validator';

export const groupValidationErrorMessagesByPropertyName = (errors: ValidationError[]): string[] => {
  return errors.map((error) => {
    const groupedMessages = Object.values(error.constraints as object).join('. ');
    return groupedMessages;
  });
};
