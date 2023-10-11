import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';

import Head from 'next/head';
import { stripe } from '../lib/stripe';
import { ImageContainer, SuccessContainer } from "../styles/(pages)/success";

interface PageProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: PageProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada com sucesso | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = query.session_id as string

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customerName: session.customer_details.name,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}
