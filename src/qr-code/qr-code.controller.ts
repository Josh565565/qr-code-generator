import { Controller, Get, Post, Param } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

const BASE_PATH = 'qr-code';
@Controller(BASE_PATH)
@ApiTags(BASE_PATH)
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @Post()
  @ApiOperation({ summary: 'Generate a QR Code' })
  @ApiResponse({ status: 201, description: 'QR Code successfully generated.' })
  async generateQrCode() {
    return this.qrCodeService.generateQRCode();
  }

  @Get(':token')
  @ApiOperation({ summary: 'Get Movies by QR Code Token' })
  @ApiParam({
    name: 'token',
    required: true,
    description: 'Unique QR code token',
  })
  @ApiResponse({
    status: 200,
    description: 'List of movies for the given token.',
  })
  async getMovies(@Param('token') token: string) {
    return this.qrCodeService.getMoviesByToken(token);
  }
}
