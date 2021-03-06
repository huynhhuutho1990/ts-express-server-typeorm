import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import ValidationFailedException from '../../exceptions/ValidationFailedException';

class Validator {
  /**
   * Validate body request object from client
   *
   * @static
   * @param {*} reqObject
   * @returns {Promise<boolean>} true if valid else throw error
   * @memberof Validator
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static async validateReqObject(reqObject: any): Promise<boolean | Error> {
    try {
      const validationError = await validate(reqObject);

      if (validationError.length) throw plainToClass(ValidationError, validationError[0]);

      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw this.convertValidationErrorToException(error);
      }

      throw error;
    }
  }

  /**
   * Convert ValidationError object to ValidationFailedException instance
   *
   * @private
   * @param {ValidationError} error
   * @returns {ValidationFailedException}
   * @memberof Validator
   */
  private static convertValidationErrorToException(error: ValidationError): ValidationFailedException {
    const { children, constraints } = error;

    let message = '';
    if (children && children.length) {
      const firstChild = children[0];
      firstChild.constraints && (message = firstChild.constraints[Object.keys(firstChild.constraints)[0]]);

      if (firstChild.children && firstChild.children.length) {
        const firstGrandchild = firstChild.children[0];
        firstGrandchild.constraints &&
          (message = firstGrandchild.constraints[Object.keys(firstGrandchild.constraints)[0]]);
      }
    } else {
      constraints && (message = constraints[Object.keys(constraints)[0]]);
    }

    return new ValidationFailedException(message || 'invalid parameter');
  }
}
export default Validator;
