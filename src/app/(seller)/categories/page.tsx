import React from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

type Props = {};

//get data
const getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));

  return querySnapshot;
};

const Index = async (props: Props) => {
  const categories = await getCategories();
  let data: any = [];

  return (
    <div>
      <ul>
        {data.map((item: any, index: number) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default Index;
