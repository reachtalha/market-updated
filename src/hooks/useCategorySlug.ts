import {useSearchParams} from "next/navigation";

export default function useCategorySlug(){
  const searchParams = useSearchParams();
  return searchParams.get('category') || 'all';
}