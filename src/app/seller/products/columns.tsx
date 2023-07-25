"use client";
import { ColumnDef } from "@tanstack/react-table";


export type Product = {
  id: string;
  name: string;
  type: string;
  status: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
