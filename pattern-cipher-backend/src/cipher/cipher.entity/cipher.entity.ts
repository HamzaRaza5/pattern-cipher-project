import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CipherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalText: string;

  @Column()
  encryptedText: string;

  @Column()
  key: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}






