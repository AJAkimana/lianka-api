import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { UsersService } from './users.service';
import { UsersController } from '../../controllers/users.controller';
import { LedgerModule } from '../ledger/ledger.module';
import { WithdrawalsModule } from '../withdrawals/withdrawals.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LedgerModule,
    forwardRef(() => WithdrawalsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
