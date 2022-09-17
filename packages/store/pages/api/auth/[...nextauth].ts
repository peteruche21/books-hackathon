import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { ISODateString } from "next-auth";
import Moralis from "moralis";

export type TUserData = {
  address: string;
  signature: string;
  profileId: string;
  expirationTime: ISODateString;
  chainId: number;
};

export interface ISession {
  user: TUserData;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "MoralisAuth",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          // "message" and "signature" are needed for authorisation
          // we described them in "credentials" above
          const { message, signature } = credentials as Record<string, string>;

          await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

          const { address, profileId, expirationTime, chainId } = (
            await Moralis.Auth.verify({ message, signature, network: "evm" })
          ).raw;

          const user = {
            address,
            profileId,
            expirationTime,
            signature,
            chainId,
          };
          // returning the user object and creating  a session
          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  // adding user info to the user session object
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }: any) {
      session.expires = (token as unknown as ISession).user.expirationTime;
      (session as unknown as ISession).user = (
        token as unknown as ISession
      ).user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
});
