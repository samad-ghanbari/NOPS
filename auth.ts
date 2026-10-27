import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";

import { verifyCaptcha } from "./lib/captcha";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { includes } from "zod";

class CaptchaInvalidError extends CredentialsSignin {
  code = "CAPTCHA_INVALID";
}
class CredInvalidError extends CredentialsSignin {
  code = "CRED_INVALID";
}
class DatabaseError extends CredentialsSignin {
  code = "DB_INVALID";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },

  // Credentials is a function that receives configs object and returns provider object
  // Credentials({...})
  /*
  {
  credentials: {.
    natid: {},
    password: {},
  },

  authorize(credentials) {
    ...
  }
}
  */

  cookies: {
    sessionToken: {
      name: "nops-auth-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  providers: [
    Credentials({
      credentials: {
        natid: {}, // empty config
        password: {},
        captcha: {},
        captchaToken: {},
      },

      async authorize(credentials) {
        const natid = credentials.natid as string;
        const password = credentials.password as string;
        const captcha = credentials.captcha as string;
        const captchaToken = credentials.captchaToken as string;

        try {
          //check db connected
          await prisma.$queryRaw`SELECT 1`;
        } catch (e) {
          throw new DatabaseError();
        }

        const CapVerify: boolean = await verifyCaptcha(captcha, captchaToken);

        if (!CapVerify) {
          throw new CaptchaInvalidError();
        }

        const user = await prisma.user.findUnique({
          where: {
            natid: natid,
            enabled: true,
          },
          include: {
            provinceUsers: {
              include: { province: true },
            },
            userRole: {
              include: {
                role: {
                  include: {
                    rolePermission: { include: { permission: true } },
                  },
                },
              },
            },
          },
        });

        if (!user) {
          throw new CredInvalidError();
        }

        const validPassword = await verifyPassword(password, user.password);

        if (!validPassword) {
          throw new CredInvalidError();
        }

        const provinces = user?.provinceUsers.map((item) => {
          return { id: item.province.id, name: item.province.provinceName };
        });
        const roles = user?.userRole.flatMap((ur) => {
          return { name: ur.role.name, description: ur.role.description };
        });
        const permissions = user?.userRole.flatMap((ur) =>
          ur.role.rolePermission.map((i) => i.permission.code),
        );

        // as User in types/next-auth.d.ts
        return {
          // returns user for token payload
          id: user.id,
          natid: user.natid,
          name: `${user.name} ${user.lastname}`,
          provinces,
          roles,
          permissions,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.natid = user.natid;
        token.name = user.name;
        token.provinces = user.provinces;
        token.roles = user.roles;
        token.permissions = user.permissions;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.natid = token.natid as string;
      session.user.name = token.name as string;
      session.user.provinces = token.provinces as {
        id: string;
        name: string;
      }[];
      session.user.roles = token.roles as {
        name: string;
        description: string;
      }[];
      session.user.permissions = token.permissions as string[];

      return session;
    },
  },
});
