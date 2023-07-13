import { query } from 'faunadb';
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from "../../../services/fauna";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { name, email } = user;

      try {
        // await fauna.query(
        //   query.Create(
        //     query.Collection('users'),
        //     { data: { name, email } }
        //   )
        // );

        await fauna.query(
          query.If(
            query.Not(
              query.Exists(
                query.Match(
                  query.Index('user_by_email'),
                  query.Casefold(email),
                )
              )
            ),
            query.Create(
              query.Collection('users'),
              { data: { name, email } }
            ),
            query.Get(
              query.Match(
                query.Index('user_by_email'),
                query.Casefold(email),
              )
            )
          )
        );

        return true;
      } catch {
        return false;
      }

    }
  }
}

export default NextAuth(authOptions)