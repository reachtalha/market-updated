import BoxedContent from '@/components/common/BoxedContent';

import { NewUser, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<NewUser[]> {
  return [
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
    {
      name: "Test",
      email: "m@example.com",
      socials: [],
      bio: "loremipsum",
      isApproved: false
    },
  ]
}

export default async function NewRegisteredUsers(){
  const data = await getData()

  return (
    <BoxedContent className="flex gap-x-5 py-20">
      <DataTable columns={columns} data={data} />
    </BoxedContent>
  )
}