import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { AuthenticationGuard } from './authentication.guard';
import { MailModule } from '../mail/mail.module';
import { ApiConsumerModule } from '../api-consumer/api-consumer.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
    }),
    MailModule,
    ApiConsumerModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AuthenticationModule {}
