import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthorsService } from '../authors.service';

@Injectable()
export class AuthorExistsGuard implements CanActivate {
  constructor(private readonly authorsService: AuthorsService) {}
  /**
   * This checks the author in the request (/authors/:authorId/books) exists as
   * if it does, we send it along the request.
   * 
   * @param context
   * @returns
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // If the author does not exists it's going to throw a not found exception,
    // but we are good people so we are going to throw a bad request exception
    try {
      const author = await this.authorsService.findOne(request.params.authorId);
      request['author'] = author;
    } catch {
      throw new BadRequestException();
    }

    return true;
  }
}
