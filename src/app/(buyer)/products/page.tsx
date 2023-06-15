import React from "react";

const Products = () => {
  return (
    <section className="flex gap-x-5 py-20">
      <div className="w-48 pl-10 bg-gray-200">
        <ul className="space-y-2 hover:opacity-60">
          <li className="uppercase tracking-wide text-sm hover:opacity-100 hover:underline underline-offset-4">
            Shop All
          </li>
          <li className="uppercase tracking-wide text-sm">Deodrants</li>
          <li className="uppercase tracking-wide text-sm">Face</li>
          <li className="uppercase tracking-wide text-sm">Body</li>
          <li className="uppercase tracking-wide text-sm">Sunscreen</li>
        </ul>
      </div>
      <div className="flex-1 bg-blue-200"></div>
    </section>
  );
};

export default Products;
