/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../audit-log/entities/audit-log.entity';
import { PageOptionsDto } from './dto/page-options';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // ← 拿到 User 表的操作句柄
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // return this.userRepo.save(createUserDto);
    return this.userRepo.manager.transaction(async (manager) => {
      const user = await manager.save(User, createUserDto);
      await manager.save(AuditLog, { action: 'CREATE_USER', userId: user.id });
      return user;
    });
  }

  findAll(pageOptionsDto?: PageOptionsDto) {
    const qb = this.userRepo.createQueryBuilder('user');
    if (pageOptionsDto) {
      // 1. 搜索
      if (pageOptionsDto.search)
        qb.andWhere('user.username LIKE :s', {
          s: `%${pageOptionsDto.search}%`,
        });

      // 2. 排序
      if (pageOptionsDto.orderBy && pageOptionsDto.order)
        qb.orderBy(`user.${pageOptionsDto.orderBy}`, pageOptionsDto.order);

      // 3. 分页
      if (pageOptionsDto.limit && pageOptionsDto.page)
        qb.skip((pageOptionsDto.page - 1) * pageOptionsDto.limit).take(
          pageOptionsDto.limit,
        );
    }

    return qb.getManyAndCount(); // [rows, total]
  }

  findOne(username: string) {
    return this.userRepo.findOneBy({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number) {
    // return this.userRepo.delete(id);
    return this.userRepo.manager.transaction(async (manager) => {
      const result = await this.userRepo.softDelete(id); // 只填 deletedAt；
      // 复活：await this.userRepo.restore(id);
      if (result.affected === 0)
        throw new NotFoundException(`User #${id} not found`);
      await manager.save(AuditLog, { action: 'DELETE_ORDER', userId: id });
      return { message: '已软删除' };
    });
  }
}
