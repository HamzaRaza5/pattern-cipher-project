import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CipherModule } from './cipher/cipher.module';
import { CipherEntity } from './cipher/cipher.entity/cipher.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'injuredlion',
      database: 'pattern_cipher_db',
      entities: [CipherEntity],
      synchronize: true, // ❗Only for development, not production
    }),
    CipherModule,
  ],
})
export class AppModule {}
