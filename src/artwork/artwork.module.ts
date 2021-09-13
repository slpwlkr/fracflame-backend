import { Module } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { ArtworkController } from './artwork.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artwork } from './entities/artwork.entity';
import { Attractor } from './entities/attractor.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Artwork, Attractor])],
  controllers: [ArtworkController],
  providers: [ArtworkService],
  exports: [ArtworkService, TypeOrmModule]
})
export class ArtworkModule {}
