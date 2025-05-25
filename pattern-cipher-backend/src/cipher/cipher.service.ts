import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CipherEntity } from './cipher.entity/cipher.entity';

@Injectable()
export class CipherService {
  constructor(
    @InjectRepository(CipherEntity)
    private cipherRepo: Repository<CipherEntity>,
  ) {}

  private symbols = [
    '@#',
    '%*',
    '$@',
    '&^',
    '!~',
    '+=',
    '?/',
    ':;',
    '<>',
    '()',
    '{}',
    '[]',
    '||',
    '&&',
    '**',
    '##',
    '$$',
    '%%',
    '@@',
    '^^',
    '!!',
    '--',
    '++',
    '==',
    '~~',
    '//',
  ];

  generatePatternTable(key: number): Record<string, string> {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const shifted = this.symbols.slice(key).concat(this.symbols.slice(0, key));
    const table: Record<string, string> = {};

    for (let i = 0; i < 26; i++) {
      table[alphabet[i]] = shifted[i];
    }

    return table;
  }

  async encrypt(plainText: string, key: number): Promise<string> {
    const table = this.generatePatternTable(key);

    const encrypted = plainText
      .toUpperCase()
      .split('')
      .map((char) => {
        if (/[A-Z]/.test(char)) {
          return table[char]; // encrypt only A-Z letters
        }
        return char; // keep spaces, punctuation, etc.
      })
      .join('');

    const entry = this.cipherRepo.create({
      originalText: plainText,
      encryptedText: encrypted,
      key: key,
    });

    await this.cipherRepo.save(entry);
    return encrypted;
  }

  decrypt(cipherText: string, key: number): string {
    const table = this.generatePatternTable(key);
    const reverseTable = Object.fromEntries(
      Object.entries(table).map(([k, v]) => [v, k]),
    );

    let result = '';
    let i = 0;
    while (i < cipherText.length) {
      const chunk = cipherText.slice(i, i + 2);
      if (reverseTable[chunk]) {
        result += reverseTable[chunk];
        i += 2;
      } else {
        // if not a symbol pattern, treat it as-is (like space or punctuation)
        result += cipherText[i];
        i += 1;
      }
    }

    return result;
  }

  async getAllMessages() {
    return this.cipherRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async deleteMessage(id: number): Promise<{ message: string }> {
    const result = await this.cipherRepo.delete(id);

    if (result.affected === 0) {
      return { message: `No message found with ID ${id}` };
    }

    return { message: `Message with ID ${id} deleted successfully` };
  }
}
