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
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  return querySnapshot;
};

const Index = async (props: Props) => {
  const categories = await getCategories();
  let data: any = [];
  console.log("Here");
  console.log(categories);
  categories.forEach((doc) => {
    console.log(doc.id, " => ", doc.data().title);
  });

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
