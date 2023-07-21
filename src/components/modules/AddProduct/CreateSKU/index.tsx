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
import {
  formatCurrency,
  updateAction,
} from "@/components/common/functions/index";
import Title from "@/components/common/Seller/Shared/Title";
import { useStateMachine } from "little-state-machine";

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
  const { actions, state } = useStateMachine({ updateAction });

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
    setList((prev: any) => [
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
      <Title title='Create SKU' />
      <div className='w-full  mt-2'>
        <label className='font-medium text-gray-600'>Color</label>
        <div className='flex flex-wrap items-center justify-between gap-3 w-full'>
          <ul className='flex flex-wrap gap-2 capitalize'>
            {colorList.map((c, index) => (
              <li
                key={index}
                onClick={() => setColor(c)}
                className={`cursor-pointer rounded-full bg-gray-100 px-2 border py-1 ${
                  color === c ? "bg-primary text-white border-primary" : ""
                }`}
              >
                {c}
              </li>
            ))}
            <AddModal list={colorList} setList={setColorList} />
          </ul>
        </div>
      </div>
      <div className='space-y-2 w-full mt-2'>
        <label className='font-medium text-gray-600 mb-2  '>
          Select Measurements
        </label>
        <ul className='flex flex-wrap  items-center  gap-2'>
          {sizeList?.map((s) => (
            <li
              key={Date.now() + Math.random()}
              onClick={() => setMeasurement(s)}
              className={`cursor-pointer rounded-full bg-gray-100 capitalize px-2 border py-1 ${
                measurement === s ? "bg-primary text-white border-primary" : ""
              }`}
            >
              {s}
              {/* {unit !== "size" && unit} */}
            </li>
          ))}

          <AddModal list={sizeList} setList={setSizeList} />
        </ul>
      </div>

      <div className='flex gap-x-2 mt-3 flex-col items-start'>
        <div className='space-y-1 w-full '>
          <label className=' font-medium text-gray-600'>Product Price</label>
          <input
            ref={priceRef}
            className='w-full rounded-xl border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-primary focus:-translate-y-[2px] focus:outline-primary'
            type='text'
            inputMode='numeric'
            placeholder='Product Price'
          />
        </div>
        <div className='space-y-1 flex flex-row items-end gap-x-5 justify-between mt-2 w-full'>
          <div className='flex-1'>
            <label className='font-medium text-gray-600'>Quantity</label>
            <input
              ref={quantityRef}
              className='w-full rounded-xl mt-1  border-[2px] border-gray-300 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-primary focus:-translate-y-[2px] focus:outline-primary'
              type='number'
              inputMode='numeric'
              placeholder='Quantity'
            />
          </div>

          <button
            type='button'
            onClick={createSKU}
            className='h-12 w-12 rounded-xl flex items-center justify-center text-sm bg-gray-200 border-[2px] border-gray-200 hover:bg-gray-200/80 duration-300 transition-colors text-primary'
          >
            <Plus className='w-6 h-6 text-primary' />
          </button>
        </div>
      </div>
      <div className='mt-2'>
        <Accordion type='single' collapsible>
          {skuList.map((l: any, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{l.id}</AccordionTrigger>
              <AccordionContent>
                <ul>
                  <li>Price: {formatCurrency(l.price)}</li>
                  <li>Quantity: {l.quantity}</li>
                  <li>Measurement: {l.measurement}</li>
                  <li
                    className={l.color ? "inline-block capitalize" : "hidden"}
                  >
                    Color: {l.color}
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className='flex gap-x-2 mt-2'>
        <button
          type='button'
          onClick={() => setStep((prev) => prev - 1)}
          className='w-full py-2.5 bg-gray-200 hover:bg-killarney-200 duration-300 transition-colors rounded-md text-black'
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={skuList.length == 0 ? true : false}
          className='disabled:cursor-not-allowed w-full py-2.5 bg-primary hover:bg-killarney-800 duration-300 transition-colors rounded-md text-white'
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CreateSKU;
