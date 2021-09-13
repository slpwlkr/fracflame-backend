import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { Artwork } from './entities/artwork.entity';
import { Attractor } from './entities/attractor.entity';
@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private artworkRepository: Repository<Artwork>,
    private attractorRepository : Repository<Attractor>,
    private connection: Connection
  ) {}

  create(createArtworkDto: CreateArtworkDto) {
    return 'This action adds a new artwork';
  }

  async findAll() {
    return await this.artworkRepository.find({ relations: ["user", "attractors"]})
  }

  findOne(id: number) {
    return `This action returns a #${id} artwork`;
  }

  update(id: number, updateArtworkDto: UpdateArtworkDto) {
    return `This action updates a #${id} artwork`;
  }

  remove(id: number) {
    return `This action removes a #${id} artwork`;
  }
}
