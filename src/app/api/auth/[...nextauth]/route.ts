// 카카오 로그인을 위함
import NextAuth from "next-auth"
import KakaoProvider from "next-auth/providers/kakao";

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID||'',
      clientSecret: process.env.KAKAO_CLIENT_SECRET||'',
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: "/main",
    signOut: "/",
    newUser: "/join"
  },

});

export { handler as GET, handler as POST };
