import HttpException from './HttpException';

class ValidationFailedException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export default ValidationFailedException;
