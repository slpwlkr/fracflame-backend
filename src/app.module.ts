import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/entities/user.entity';
import { ArtworkModule } from './artwork/artwork.module';
import { Artwork } from './artwork/entities/artwork.entity';
import { Attractor } from './artwork/entities/attractor.entity';
import { Variation } from './artwork/entities/variation.entity';
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
      entities: [User, Artwork, Attractor, Variation],
      synchronize: true,
    }),
    ArtworkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
