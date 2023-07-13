import { query as Query } from 'faunadb';
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
    async signIn({ user }) {
      const { name, email } = user;

      try {
        await fauna.query(
          Query.If(
            Query.Not(
              Query.Exists(
                Query.Match(
                  Query.Index('user_by_email'),
                  Query.Casefold(email),
                )
              )
            ),
            Query.Create(
              Query.Collection('users'),
              { data: { name, email } }
            ),
            Query.Get(
              Query.Match(
                Query.Index('user_by_email'),
                Query.Casefold(email),
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