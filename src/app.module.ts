import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganisationUnitsModule } from './organisation_units/organisation_units.module';
import { CacheModule } from '@nestjs/cache-manager';
import { MdlModule } from './mdl/mdl.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env-prod' }),
    CacheModule.register({
      max: 30000,
      ttl: 0,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        retryAttempts: 20,
        retryDelay: 3000,
        keepConnectionAlive: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    OrganisationUnitsModule,
    MdlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
