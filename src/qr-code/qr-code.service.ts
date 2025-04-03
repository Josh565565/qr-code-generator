import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import axios from 'axios';
import { PrismaService } from 'src/core/database/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QrCodeService {
  private readonly movieDataUrl =
    'https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw';

  constructor(private prisma: PrismaService) {}

  async generateQRCode() {
    const movies = await this.getRandomMovies();

    const token = uuidv4();

    await this.prisma.qrCode.create({
      data: { token, movies },
    });

    const url = `http://localhost:3000/movies/${token}`;
    const qrCode = await QRCode.toDataURL(url);

    return { qrCode, url };
  }

  async getMoviesByToken(token: string) {
    const record = await this.prisma.qrCode.findUnique({ where: { token } });
    return record ? record.movies : [];
  }

  private async getRandomMovies() {
    const response = await axios.get(this.movieDataUrl);
    const movies = response.data;
    return movies.sort(() => 0.5 - Math.random()).slice(0, 10);
  }
}
