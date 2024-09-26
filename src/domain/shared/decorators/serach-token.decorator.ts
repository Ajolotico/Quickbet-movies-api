import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const headerValue = request.headers['authorization'];
    if (!headerValue) {
      return null;
    }
    const token = headerValue.split(' ')[1];
    return token;
  },
);
