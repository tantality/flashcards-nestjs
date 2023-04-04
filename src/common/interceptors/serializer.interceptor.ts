import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializerInterceptor<T> implements NestInterceptor<Partial<T>, T> {
  constructor(private classType: T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((data: object) => {
        return plainToClass(this.classType as ClassConstructor<T>, data);
      }),
    );
  }
}
