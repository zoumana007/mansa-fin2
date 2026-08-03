import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { validateEnvironment } from "./config/environment.js";
import { PrismaService } from "./database/prisma.service.js";
import { HealthController } from "./health/health.controller.js";
import { IdentityModule } from "./identity/identity.module.js";
import { LedgerModule } from "./ledger/ledger.module.js";
import { KycModule } from "./kyc/kyc.module.js";
import { PaymentModule } from "./payment/payment.module.js";
import { ProfileModule } from "./profile/profile.module.js";
import { RbacModule } from "./rbac/rbac.module.js";
import { AccessTokenGuard } from "./security/access-token.guard.js";
import { PermissionsGuard } from "./security/permissions.guard.js";
import { WalletModule } from "./wallet/wallet.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate: validateEnvironment }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    IdentityModule,
    KycModule,
    LedgerModule,
    PaymentModule,
    ProfileModule,
    RbacModule,
    WalletModule,
  ],
  controllers: [HealthController],
  providers: [
    PrismaService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: AccessTokenGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard },
  ],
})
export class AppModule {}
