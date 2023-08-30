import Link from 'next/link';
import Image from '@/components/common/FallbackImage';
import { formatDateOrTime } from '@/utils/formatters';

type BlogCardProps = {
  title: string;
  slug: string;
  thumbnailImage: string;
  postedAt: {
    seconds: number;
    milliseconds: number;
  };
};
export default function BlogCard({ title, slug, thumbnailImage, postedAt }: BlogCardProps) {
  return (
    <Link href={`/blogs/${slug}`} className="group h-fit w-full relative">
      <div className="relative h-96 w-full drop-shadow-sm rounded overflow-hidden">
        <Image
          src={thumbnailImage}
          className="object-cover"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="image"
        />
      </div>
      <h3 className="font-medium text-primary text-xl mt-3 truncate">{title}</h3>
      <span className="text-sm text-neutral-600">
        {formatDateOrTime(new Date(postedAt?.seconds * 1000))}
      </span>
    </Link>
  );
}
