// import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
// import { type Adapter } from "next-auth/adapters";

import { env } from "~/env";
// import { db } from "~/server/db";
// import {
//   accounts,
//   sessions,
//   users,
//   verificationTokens,
// } from "~/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  // adapter: DrizzleAdapter(db, {
  //   usersTable: users,
  //   accountsTable: accounts,
  //   sessionsTable: sessions,
  //   verificationTokensTable: verificationTokens,
  // }) as Adapter,
  providers: [
    {
      id: "aliexpress",
      name: "Aliexpress",
      type: "oauth",
      version: "2.0",
      clientId: env.AE_APP_ID,
      clientSecret: env.AE_APP_SECRET,
      client: {
        response_types: ["code"],
        redirect_uris: [env.AE_CALLBACK_URL],
      },
      authorization: `https://oauth.aliexpress.com/authorize?force_auth=true`,
      token: "https://api-sg.aliexpress.com/auth/token/create",
      // token: "https://oauth.aliexpress.com/token",
      // userinfo: "https://kapi.kakao.com/v2/user/me",
      profile(profile) {
        console.log(profile);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return profile;
      },
    },
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
