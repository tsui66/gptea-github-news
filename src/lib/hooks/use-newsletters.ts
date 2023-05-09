import useSWR from 'swr';
import { fetcher } from '../utils';
import { Newsletter } from '@prisma/client';

export default function useNewsletter() {
  const {
    data: newsletters,
    mutate,
    error,
  } = useSWR(`/api/newsletters`, fetcher<Newsletter[]>);

  const loading = !newsletters && !error;

  return { loading, newsletters, mutate };
}