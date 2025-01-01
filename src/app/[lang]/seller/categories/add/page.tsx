'use client';
import React, { useState } from 'react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';
import toast from 'react-hot-toast';
const PerishableItemForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [isPerishable, setIsPerishable] = useState<boolean>(false);
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handlePerishableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPerishable(event.target.checked);
  };

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  const handleSubmit = () => {
    const object = {
      image:
        'https://firebasestorage.googleapis.com/v0/b/market-25d08.appspot.com/o/category%2FUntitled.png?alt=media&token=25aea40f-b241-40d5-adaf-9d93f833a0ba',
      title,
      lifeSpan: isPerishable ? 'perishable' : 'non-perishable',
      list: items
    };
    const addDocument = async () => {
      const ref = await addDoc(collection(db, 'categories'), object);
      toast.success('Category added');
    };
    addDocument();
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="isPerishable" className="block text-gray-700 font-bold mb-2">
          Is Perishable?
        </label>
        <input
          type="checkbox"
          id="isPerishable"
          className="mr-2"
          checked={isPerishable}
          onChange={handlePerishableChange}
        />
        <span className="text-gray-600">Yes, it is perishable</span>
      </div>
      <div className="mb-4">
        <label htmlFor="newItem" className="block text-gray-700 font-bold mb-2">
          Add Item:
        </label>
        <div className="flex">
          <input
            type="text"
            id="newItem"
            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
            value={newItem}
            onChange={handleItemChange}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleAddItem}
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <p className="block text-gray-700 font-bold mb-2">Items:</p>
        <ul className="list-disc ml-6">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSubmit} className="py-3 px-4 text-white bg-blue-500 rounded-lg">
        Add Category
      </button>
    </div>
  );
};

export default PerishableItemForm;
