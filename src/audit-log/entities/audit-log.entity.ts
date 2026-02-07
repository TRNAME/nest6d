/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // 操作人

  @Column({ length: 50 })
  action: string; // 动作标识，如 CREATE_USER / DELETE_ORDER

  @CreateDateColumn()
  createdAt: Date; // 操作时间
}
