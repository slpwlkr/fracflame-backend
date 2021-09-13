import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { Artwork } from './entities/artwork.entity';
import { Attractor } from './entities/attractor.entity';
import { Variation } from './entities/variation.entity';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private artworkRepository: Repository<Artwork>,
    @InjectRepository(Attractor)
    private attractorRepository : Repository<Attractor>,
    @InjectRepository(Variation)
    private variationRepository : Repository<Variation>,
    private connection: Connection,
    private usersService : UsersService
  ) {}

  async createDefault(userid: number) {
    const variation1 = this.variationRepository.create({
      type_index: 0,
      weight: 1
    })
    const variation2 = this.variationRepository.create({
      type_index: 0,
      weight: 1
    })
    const variation3 = this.variationRepository.create({
      type_index: 0,
      weight: 1
    })
    await this.variationRepository.save([variation1, variation2, variation3])

    const attractor1 = this.attractorRepository.create({
      affine_a: 0.5,
      affine_b: 0,
      affine_c: 0,
      affine_d: 0,
      affine_e: 0.5,
      affine_f: 0,
      weight: 0.33,
      color_r: 255,
      color_g: 0,
      color_b: 0,
      variations: [variation1]
    })
    const attractor2 = this.attractorRepository.create({
      affine_a: 0.5,
      affine_b: 0,
      affine_c: 0.5,
      affine_d: 0,
      affine_e: 0.5,
      affine_f: 0,
      weight: 0.33,
      color_r: 0,
      color_g: 255,
      color_b: 0,
      variations: [variation2]
    })
    const attractor3 = this.attractorRepository.create({
      affine_a: 0.5,
      affine_b: 0,
      affine_c: 0,
      affine_d: 0,
      affine_e: 0.5,
      affine_f: 0.5,
      weight: 0.34,
      color_r: 0,
      color_g: 0,
      color_b: 255,
      variations: [variation3]
    })
    await this.attractorRepository.save([attractor1, attractor2, attractor3])

    const user = await this.usersService.findOneByID(userid)

    const artwork = this.artworkRepository.create({
      user: user,
      title: 'new flame',
      canvas_width: 512,
      canvas_height: 512,
      gamma: 2.2,
      created_at: Math.round(Date.now() / 1000),
      last_updated_at: Math.round(Date.now() / 1000),
      attractors: [attractor1, attractor2, attractor3]
    })
    await this.artworkRepository.save(artwork)
    return artwork
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

  async remove(id: number) {
    await this.artworkRepository.delete(id)
    return {
      deleted: true,
      deletedId: id
    }
  }
}
