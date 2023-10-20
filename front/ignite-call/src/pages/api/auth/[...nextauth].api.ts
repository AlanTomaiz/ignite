import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { PrismaAdapter } from '../../../lib/auth/prisma-adapter'

export function buildNextAuthOptions(
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            username: null!,
            email: profile.email,
            avatar_url: profile.picture,
          }
        },
      }),
    ],

    secret: process.env.NEXTAUTH_SECRET ?? '',

    callbacks: {
      async signIn({ account }) {
        if (!account?.scope?.includes('/auth/calendar')) {
          return '/connect-calendar/?error=permissions'
        }

        return true
      },

      async session({ session, user }) {
        return {
          user,
          ...session,
        }
      },
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, buildNextAuthOptions(req, res))
}
