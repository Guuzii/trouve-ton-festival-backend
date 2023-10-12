import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
  orderBy: {
    email: 'ASC',
    id: 'DESC',
  },
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, length: 64 })
  email: string;

  @Column()
  password: string;

  /** prénom */
  @Column({ type: 'varchar', length: 64, nullable: true })
  firstname: string | null;

  /** nom */
  @Column({ type: 'varchar', length: 64, nullable: true })
  lastname: string | null;

  @Column({ name: 'avatar_url', type: 'varchar', nullable: true })
  avatarUrl: string | null;

  @Column({ name: 'reset_password_token', type: 'varchar', nullable: true })
  resetPwdToken: string | null;
}
