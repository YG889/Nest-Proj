import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const now = Date.now();

    return next.handle().pipe(
      tap(() =>
        console.log(`${req.method} ${req.url} - ${Date.now() - now}ms`),
      ),
    );
  }
}