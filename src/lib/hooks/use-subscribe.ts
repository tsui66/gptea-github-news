import useSWR from 'swr';
import { fetcher } from '../utils';
import { Subscriber } from '@prisma/client';

export default function useSubscriber() {
  const {
    data: subscriber,
    mutate,
    error,
  } = useSWR(`/api/subscribe`, fetcher<Subscriber>);

  const loading = !subscriber && !error;

  return { loading, subscriber, mutate };
}