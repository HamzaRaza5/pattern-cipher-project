import { Controller, Post, Get, Body, Delete, Param } from '@nestjs/common';
import { CipherService } from './cipher.service';

@Controller('cipher')
export class CipherController {
  constructor(private readonly cipherService: CipherService) {}

  @Post('encrypt')
  encrypt(@Body() body: { text: string; key: number }) {
    return this.cipherService.encrypt(body.text, body.key);
  }

  @Post('decrypt')
  decrypt(@Body() body: { text: string; key: number }) {
    return { decrypted: this.cipherService.decrypt(body.text, body.key) };
  }

  @Get('all')
  getAllMessages() {
    return this.cipherService.getAllMessages();
  }

  @Delete(':id')
  deleteMessage(@Param('id') id: number) {
    return this.cipherService.deleteMessage(id);
  }
}
