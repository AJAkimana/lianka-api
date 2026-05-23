import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdrawal } from '../../entities/withdrawal.entity';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawalsController } from '../../controllers/withdrawals.controller';
import { UsersModule } from '../users/users.module';
import { LedgerModule } from '../ledger/ledger.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { EmailModule } from '../email/email.module';
import { LoyaltyModule } from '../loyalty/loyalty.module';
import { WithdrawalAddressController } from '../../controllers/withdrawal-address.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Withdrawal]),
    UsersModule,
    LedgerModule,
    NotificationsModule,
    EmailModule,
    LoyaltyModule,
  ],
  controllers: [WithdrawalsController, WithdrawalAddressController],
  providers: [WithdrawalsService],
  exports: [WithdrawalsService],
})
export class WithdrawalsModule {}
