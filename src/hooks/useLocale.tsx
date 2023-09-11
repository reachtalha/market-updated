import { useParams } from 'next/navigation';

export default function useLocale(){
  const params = useParams();
  return params.lang;
}