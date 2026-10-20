import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiUtilService } from '../../utils/api-util/api-util.service';
import { map, Observable } from 'rxjs';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  constructor(private apiUtilService: ApiUtilService) {}
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) =>
        this.apiUtilService.formatResponse({
          data,
        }),
      ),
    );
  }
}
