import { Module } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { ArtworkController } from './artwork.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artwork } from './entities/artwork.entity';
import { Attractor } from './entities/attractor.entity';
import { Variation } from './entities/variation.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Artwork, Attractor, Variation, User])],
  controllers: [ArtworkController],
  providers: [ArtworkService, UsersService],
  exports: [ArtworkService, TypeOrmModule]
})
export class ArtworkModule {}
