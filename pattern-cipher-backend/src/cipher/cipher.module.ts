import { Module } from '@nestjs/common';
import { CipherController } from './cipher.controller';
import { CipherService } from './cipher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CipherEntity } from './cipher.entity/cipher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CipherEntity])],
  controllers: [CipherController],
  providers: [CipherService],
})
export class CipherModule {}
