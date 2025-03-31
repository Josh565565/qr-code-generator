import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { QrCodeModule } from './qr-code/qr-code.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    QrCodeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
