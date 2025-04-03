import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import axios from 'axios';
import { PrismaService } from 'src/core/database/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QrCodeService {
  private readonly movieDataUrl = process.env.MOVIE_API_URL;

  constructor(private prisma: PrismaService) {}

  async generateQRCode() {
    const token = uuidv4();
    const url = `https://qr-code-generator-frontend-cyan.vercel.app/movies/${token}`;

    await this.prisma.qrCode.create({
      data: { token },
    });

    const qrCode = await QRCode.toDataURL(url);
    return { qrCode, url };
  }

  async getMoviesByToken(token: string) {
    const record = await this.prisma.qrCode.findUnique({ where: { token } });
    if (!record) return [];

    return this.getRandomMovies();
  }

  private async getRandomMovies() {
    if (!this.movieDataUrl) {
      throw new Error('MOVIE_API_URL is not defined');
    }
    const response = await axios.get(this.movieDataUrl);
    const movies = response.data;
    return movies.sort(() => 0.5 - Math.random()).slice(0, 10);
  }
}
