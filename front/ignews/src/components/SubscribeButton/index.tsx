import { signIn, useSession } from 'next-auth/react';

import { api } from '../../services/axios';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  productId: string;
}

export function SubscribeButton({ productId }: SubscribeButtonProps) {
  const { data } = useSession();

  async function handleSubscribe() {
    if (!data) {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <button type="button" className={styles.button} onClick={handleSubscribe}>
      Subscribe now
    </button>
  )
}