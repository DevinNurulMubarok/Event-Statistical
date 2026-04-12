import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, Role } from "../../generated/prisma/index.js";
import { ApiError } from "../../utils/api-error.js";
import crypto from "crypto";

export class AuthService {
  constructor(private prisma: PrismaClient) {}

  generateReferralCode(name: string) {
    const prefix = name.substring(0, 3).toUpperCase();
    const randomStr = crypto.randomBytes(3).toString("hex").toUpperCase();
    return `${prefix}${randomStr}`;
  }

  async register(data: any) {
    const { email, password, name, referralCodeUsed, role } = data;
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ApiError("Email already in use", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRefCode = this.generateReferralCode(name);

    return await this.prisma.$transaction(async (tx) => {
      let referredByUserId = null;

      if (referralCodeUsed) {
        const referrer = await tx.user.findUnique({ where: { referralCode: referralCodeUsed } });
        if (referrer) {
          referredByUserId = referrer.id;
          const expiresAt = new Date();
          expiresAt.setMonth(expiresAt.getMonth() + 3);

          await tx.user.update({
            where: { id: referrer.id },
            data: { pointsBalance: referrer.pointsBalance + 10000 }
          });
          
          await tx.pointHistory.create({
            data: {
              userId: referrer.id,
              amount: 10000,
              type: "REFERRAL_BONUS",
              expiredAt: expiresAt
            }
          });
        }
      }

      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: (role as Role) || Role.CUSTOMER,
          referralCode: newRefCode,
          referredById: referredByUserId,
        }
      });

      if (referredByUserId) {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 3);

        await tx.coupon.create({
          data: {
            code: `DISC${crypto.randomBytes(3).toString("hex").toUpperCase()}`,
            discountPercent: 10,
            expiresAt
          }
        });
      }

      return user;
    });
  }

  async login(data: any) {
    const { email, password } = data;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new ApiError("Invalid credentials", 401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ApiError("Invalid credentials", 401);

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1d" });
    return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role, pointsBalance: user.pointsBalance } };
  }
}
