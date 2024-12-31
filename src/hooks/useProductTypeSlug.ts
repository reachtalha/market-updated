import { useSearchParams } from 'next/navigation';

export default function useProductTypeSlug() {
  const searchParams = useSearchParams();
  return searchParams.get('type');
}
