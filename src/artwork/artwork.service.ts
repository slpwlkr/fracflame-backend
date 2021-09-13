import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { Artwork } from './entities/artwork.entity';
import { Attractor } from './entities/attractor.entity';
import { Variation } from './entities/variation.entity';
@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private artworkRepository: Repository<Artwork>,
    @InjectRepository(Attractor)
    private attractorRepository : Repository<Attractor>,
    @InjectRepository(Variation)
    private variationRepository : Repository<Variation>,
    private connection: Connection
  ) {}

  create(createArtworkDto: CreateArtworkDto) {
    return 'This action adds a new artwork';
  }

  async findAll() {
    return await this.artworkRepository.find()
  }

  async findByUserID(id: number) {
    return await this.artworkRepository.find({
      where: {
        user: {
          userid: id
        }
      }
    })
  }

  async findOne(id: number) {
    return await this.artworkRepository.findOne({
      relations: ["attractors", "attractors.variations"],
      where: {
        artworkid: id
      }
    })
   }

  update(id: number, updateArtworkDto: UpdateArtworkDto) {
    return `This action updates a #${id} artwork`;
  }

  remove(id: number) {
    return `This action removes a #${id} artwork`;
  }
}
