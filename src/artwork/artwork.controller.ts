import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('artwork')
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req) {
    return await this.artworkService.createDefault(+req.user.userid);
  }

  @Get()
  async findAll() {
    return await this.artworkService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async findMyArtworks(@Req() req) {
    return await this.artworkService.findByUserID(req.user.userid)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    const result = await this.artworkService.findOne(+id);
    if(result && result.user.userid != req.user.userid) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'token userid does not match artwork userid'
      }, HttpStatus.BAD_REQUEST)
    } else {
      return result
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtworkDto: UpdateArtworkDto) {
    return this.artworkService.update(+id, updateArtworkDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    const result = await this.artworkService.findOne(+id);
    if(result && result.user.userid != req.user.userid) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'token userid does not match artwork userid'
      }, HttpStatus.BAD_REQUEST)
    } else {
      return this.artworkService.remove(+id);
    }
  }
}
