"use client"

import { ColumnDef } from "@tanstack/react-table"

export type NewUser = {
  name: string
  email: string
  bio: string
  socials: string[]
  isApproved: boolean
}

export const columns: ColumnDef<NewUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "bio",
    header: "Bio",
  },
  {
    accessorKey: "socials",
    header: "Socials",
  },
  {
    accessorKey: "isApproved",
    header: "Is approved?",
  },
]