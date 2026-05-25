import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdrawal } from '../../entities/withdrawal.entity';
import { WithdrawalAddress } from '../../entities/withdrawal-address.entity';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawalsController } from '../../controllers/withdrawals.controller';
import { UsersModule } from '../users/users.module';
import { LedgerModule } from '../ledger/ledger.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { EmailModule } from '../email/email.module';
import { LoyaltyModule } from '../loyalty/loyalty.module';
import { WithdrawalAddressController } from '../../controllers/withdrawal-address.controller';
import { WithdrawalAddressService } from './withdrawal-address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Withdrawal, WithdrawalAddress]),
    forwardRef(() => UsersModule),
    LedgerModule,
    NotificationsModule,
    EmailModule,
    forwardRef(() => LoyaltyModule),
  ],
  controllers: [WithdrawalsController, WithdrawalAddressController],
  providers: [WithdrawalsService, WithdrawalAddressService],
  exports: [WithdrawalsService, WithdrawalAddressService],
})
export class WithdrawalsModule {}
