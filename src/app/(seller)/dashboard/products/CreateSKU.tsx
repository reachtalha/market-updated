import React, { useState, useRef } from "react";

import { useFormContext } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { toast } from "react-toastify";
import { Plus } from "lucide-react";

import AddModal from "@/components/common/Seller/AddProduct/AddModal";
import { formatCurrency } from "@/components/common/functions/index";

const SIZE = ["small", "medium", "large", "x-large"];
const SMALL = ["50", "100", "250", "500"];
const LARGE = ["1", "2", "5", "10"];

const CreateSKU = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { setValue, getValues } = useFormContext();

  const unit = getValues("unit");
  const name = getValues("name");

  const [skuList, setList] = useState([]);
  const [sizeList, setSizeList] = useState<string[]>(
    unit === "size" ? SIZE : unit === "l" || unit === "kg" ? LARGE : SMALL
  );
  const [colorList, setColorList] = useState<string[]>([
    "meteorite",
    "black",
    "navy",
    "charcoal",
  ]);
  const [measurement, setMeasurement] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [isColors, setIsColors] = useState<boolean>(false);

  const priceRef = useRef<HTMLInputElement | null>(null);
  const quantityRef = useRef<HTMLInputElement | null>(null);

  function generateSKU(productName: string, productAttributes: any) {
    const name = productName?.split(" ")[0];
    const attrStr = productAttributes.join("-");
    const randomStr = Math.random().toString(36).substring(2, 8);
    const sku = `${name}-${attrStr}-${randomStr}`;
    return sku.toUpperCase();
  }

  function createSKU() {
    const price = priceRef.current?.value;
    const quantity = quantityRef.current?.value;

    if (!price || !quantity || (isColors && !color) || !measurement) {
      toast.error("Please fill out all required fields!");
      return;
    }

    const sku = generateSKU(name, [color, measurement]);
    setList((prev) => [
      ...prev,
      {
        id: sku,
        price: Number(price),
        quantity: Number(quantity),
        measurement: measurement,
        ...(color ? { color: color } : {}),
      },
    ]);

    if (priceRef.current) priceRef.current.value = "";
    if (quantityRef.current) quantityRef.current.value = "";
    setColor("");
    setMeasurement("");
  }

  const nextStep = async () => {
    if (skuList.length === 0) {
      toast.error("Please create atleast 1 SKU!");
      return;
    }
    setValue("SKU", skuList);
    setStep((e: number) => e + 1);
  };

  return (
    <>
      <div className='w-full space-y-1'>
        <label className='text-sm text-gray-500'>Add Color</label>
        <div className='space-y-2'>
          <label className='relative flex items-center cursor-pointer w-fit'>
            <input
              type='checkbox'
              id='colors-switch'
              className='sr-only peer w-fit'
              onChange={() => setIsColors(!isColors)}
            />
            <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-killarney-300 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-killarney-600"></div>
            <span className='ml-2 text-sm font-medium text-gray-800 '>
              Colors
            </span>
          </label>
        </div>
      </div>
      <div className='space-y-1 w-full'>
        <label className='text-sm text-gray-600'>Select Measurements</label>
        <ul className='flex flex-wrap gap-2'>
          {sizeList?.map((s) => (
            <li
              key={Date.now() + Math.random()}
              onClick={() => setMeasurement(s)}
              className={`cursor-pointer rounded-full bg-gray-100 capitalize px-2 border py-1 ${
                measurement === s
                  ? "bg-killarney-700 text-white border-killarney-700"
                  : ""
              }`}
            >
              {s}
              {unit !== "size" && unit}
            </li>
          ))}

          <AddModal list={sizeList} setList={setSizeList} />
        </ul>
      </div>
      <div className={isColors ? "space-y-1 w-full" : "hidden"}>
        <label className='text-sm text-gray-600'>Select Colors</label>
        <ul className='flex flex-wrap gap-2 capitalize'>
          {colorList.map((c, index) => (
            <li
              key={index}
              onClick={() => setColor(c)}
              className={`cursor-pointer rounded-full bg-gray-100 px-2 border py-1 ${
                color === c
                  ? "bg-killarney-700 text-white border-killarney-700"
                  : ""
              }`}
            >
              {c}
            </li>
          ))}
          <AddModal list={colorList} setList={setColorList} />
        </ul>
      </div>
      <div className='flex gap-x-2 items-end'>
        <div className='space-y-1 w-full '>
          <label className='text-sm text-gray-600'>Product Price</label>
          <input
            ref={priceRef}
            className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
            type='text'
            inputMode='numeric'
            placeholder='Product Price'
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm text-gray-600'>Qty</label>
          <input
            ref={quantityRef}
            className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700'
            type='number'
            inputMode='numeric'
            placeholder='Quantity'
          />
        </div>

        <button
          type='button'
          onClick={createSKU}
          className='py-2.5 px-3 text-sm bg-killarney-200 border-[2px] border-killarney-200 hover:bg-killarney-200/80 duration-300 transition-colors rounded-lg text-killarney-700'
        >
          <Plus className='w-6 h-6 text-killarney-700' />
        </button>
      </div>
      <div>
        {skuList.map((l, index) => (
          <Accordion type='single' collapsible key={index}>
            <AccordionHeader>{l.id}</AccordionHeader>
            <AccordionBody>
              <ul>
                <li>Price: {formatCurrency(l.price)}</li>
                <li>Quantity: {l.quantity}</li>
                <li>Measurement: {l.measurement}</li>
                <li className={l.color ? "inline-block capitalize" : "hidden"}>
                  Color: {l.color}
                </li>
              </ul>
            </AccordionBody>
          </Accordion>
        ))}
      </div>
      <div className='flex gap-x-2'>
        <button
          type='button'
          onClick={() => setStep((prev) => prev - 1)}
          className='w-full py-2.5 bg-killarney-100 hover:bg-killarney-200 duration-300 transition-colors rounded-md text-black'
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={skuList.length == 0 ? true : false}
          className='disabled:cursor-not-allowed w-full py-2.5 bg-killarney-700 hover:bg-killarney-800 duration-300 transition-colors rounded-md text-white'
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CreateSKU;
