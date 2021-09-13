import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/entities/user.entity';
import { ArtworkModule } from './artwork/artwork.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '057721MySQL',
      database: 'fracflame',
      entities: [User],
      synchronize: true,
    }),
    ArtworkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
