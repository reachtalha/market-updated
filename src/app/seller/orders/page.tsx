import { Order, columns } from './columns';
import { DataTable } from './data-table';
import Title from '@/components/common/Seller/Shared/Title';

const DummyData: Order[] = [
  {
    id: '1',
    name: 'Tony Stark',
    email: 'product1@example.com',
    status: 'pending',
    address: '123 Main St',
    price: '$19.99',
    placedAt: '2023-07-27T12:34:56'
  },
  {
    id: '2',
    name: 'Steve Rogers',
    email: 'product2@example.com',
    status: 'delivered',
    address: '456 Park Ave',
    price: '$29.99',
    placedAt: '2023-07-26T10:20:30'
  },
  {
    id: '3',
    name: 'Mark Ruffolow',
    email: 'product3@example.com',
    status: 'cancelled',
    address: '789 Elm St',
    price: '$9.99',
    placedAt: '2023-07-25T15:45:10'
  },
  {
    id: '4',
    name: 'Ant Man',
    email: 'product4@example.com',
    status: 'pending',
    address: '101 Market St',
    price: '$14.99',
    placedAt: '2023-07-24T18:12:30'
  },
  {
    id: '5',
    name: 'John Doe',
    email: 'product5@example.com',
    status: 'delivered',
    address: '202 Park Blvd',
    price: '$39.99',
    placedAt: '2023-07-23T09:00:45'
  },
  {
    id: '6',
    name: 'Thor',
    email: 'product6@example.com',
    status: 'cancelled',
    address: '303 Elm St',
    price: '$7.49',
    placedAt: '2023-07-22T14:55:20'
  },
  {
    id: '7',
    name: 'Peter Parker',
    email: 'product7@example.com',
    status: 'pending',
    address: '404 Oak Ave',
    price: '$24.99',
    placedAt: '2023-07-21T11:30:15'
  },
  {
    id: '8',
    name: 'Steven Strange',
    email: 'product8@example.com',
    status: 'delivered',
    address: '505 Pine St',
    price: '$19.99',
    placedAt: '2023-07-20T16:40:05'
  }
];

export default async function DemoPage() {
  const data = DummyData;

  return (
    <div className="container mx-auto py-20">
      <Title title="Orders" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
