'use client';

import ImageWithFallback from '@/components/common/FallbackImage';
import { formatDate } from '@/utils/formatters';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'thumbnailImage',
    header: 'Thumbnail Image',
    cell: ({ row }) => {
      const image: string = String(row.getValue('thumbnailImage'));
      return (
        <span className="capitalize max-w-fit">
          <ImageWithFallback
            src={image}
            height={150}
            width={150}
            alt=""
            className="w-16 h-16 rounded object-cover"
          />
        </span>
      );
    }
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const title: string = String(row.getValue('title'));
      return <span className="max-w-[200px] truncate">{title}</span>;
    }
  },
  {
    accessorKey: 'postedAt',
    header: 'Posted At',
    cell: ({ row }) => {
      const postedAt: any = row.getValue('postedAt');
      return <span className="capitalize">{formatDate(postedAt.seconds * 1000)}</span>;
    }
  }
];
