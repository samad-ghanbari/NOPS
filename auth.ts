import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  // Credentials is a function that reeceives configs object and returns provider object
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
  providers: [
    Credentials({
      credentials: {
        natid: {}, // empty config
        password: {},
      },

      async authorize(credentials) {
        const natid = credentials.natid as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: {
            natid, // shortend for natid: natid
          },
        });

        if (!user) {
          return null;
        }

        const validPassword = await verifyPassword(password, user.password);

        if (!validPassword) {
          return null;
        }

        return {
          id: user.id,
          natid: user.natid,
        };
      },
    }),
  ],
});
