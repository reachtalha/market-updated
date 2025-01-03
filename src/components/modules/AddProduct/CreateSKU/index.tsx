import React, { useState, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import toast from 'react-hot-toast';
import { Plus, Pencil } from 'lucide-react';
import AddModal from '@/components/common/Seller/AddProduct/AddModal';

import { formatCurrency } from '@/components/common/functions/index';
import Title from '@/components/common/Seller/Shared/Title';
import useGlobalStore from '@/state';

const SIZE = ['small', 'medium', 'large', 'x-large'];
const SMALL = ['50', '100', '250', '500'];
const LARGE = ['1', '2', '5', '10'];

const initialSKUState = {
  id: '',
  price: 1,
  quantity: 1,
  measurement: '',
  color: ''
};

const CreateSKU = ({
  setStep,
  isEdit = false,
  dictionary
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isEdit?: boolean;
  dictionary: any;
}) => {
  const { setValue, getValues } = useFormContext();
  const [editMode, setEditMode] = useState(false);
  const [isEditSku, setIsEditSku] = useState<boolean>(false);
  const [sku, setSKU] = useState(initialSKUState);
  const [editSkuId, setEditSkuId] = useState<string>();

  const unit = getValues('unit');
  const name = getValues('name');

  const { SKUList, setSKUList } = useGlobalStore((state: any) => state);
  const [sizeList, setSizeList] = useState<string[]>(
    unit === 'size' ? SIZE : unit === 'l' || unit === 'kg' ? LARGE : SMALL
  );
  const [colorList, setColorList] = useState<string[]>(['meteorite', 'black', 'navy', 'charcoal']);

  const [isColors, setIsColors] = useState<boolean>(false);

  useEffect(() => {
    if (isEditSku) setSKU(SKUList.filter((l: any) => l.id === editSkuId)[0]);
  }, [editSkuId]);

  function generateSKU(productName: string, productAttributes: any) {
    const name = productName?.split(' ')[0];
    const attrStr = productAttributes.join('-');
    const randomStr = Math.random().toString(36).substring(2, 8);
    const sku = `${name}-${attrStr}-${randomStr}`;
    return sku.toUpperCase();
  }

  function createSKU() {
    if (sku.price < 1) {
      toast.error(dictionary.seller.newProduct.createSku.skuPriceError);
      return;
    }

    if (sku.quantity < 1) {
      toast.error(dictionary.seller.newProduct.createSku.skuQuantityError);
      return;
    }

    if (!sku.price || !sku.quantity || (isColors && !sku.color) || !sku.measurement) {
      toast.error(dictionary.seller.newProduct.createSku.skuAllFieldsError);
      return;
    }

    if (isEditSku) {
      const index = SKUList.findIndex((l: any) => l.id === editSkuId);
      SKUList[index] = {
        ...sku,
        id: editSkuId
      };

      setIsEditSku(false);
      setEditSkuId('');
    } else {
      const skuId = generateSKU(name, [sku.color, sku.measurement]);
      setSKUList({
        ...sku,
        id: skuId
      });
    }

    setSKU(initialSKUState);
  }

  const nextStep = async () => {
    if (SKUList.length === 0) {
      toast.error('Please create atleast 1 SKU!');
      return;
    }
    setValue('SKU', SKUList);
    setStep((e: number) => e + 1);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <Title title={dictionary.seller.newProduct.createSku.heading} />
        {isEdit && (
          <Pencil
            className="cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => setEditMode(true)}
            size={17}
          />
        )}
      </div>

      <div className="w-full  mt-3 xl:mt-5">
        <Label>{dictionary.seller.newProduct.createSku.color.label}</Label>
        <div className="flex flex-wrap items-center justify-between gap-3 w-full">
          <ul className="flex flex-wrap gap-2 capitalize">
            {colorList.map((c, index) => (
              <li
                key={index}
                onClick={() => {
                  if ((isEdit && !editMode) || isEditSku) return;
                  setSKU((prev) => ({ ...prev, color: c }));
                }}
                className={`cursor-pointer rounded-full bg-gray-100 px-2 border py-1 ${
                  sku?.color === c ? 'bg-primary text-white border-primary' : ''
                } ${isEditSku && ' cursor-not-allowed '}`}
              >
                {c}
              </li>
            ))}
            <AddModal list={colorList} setList={setColorList} />
          </ul>
        </div>
      </div>
      <div className="space-y-2 w-full mt-3 xl:mt-5">
        <Label>{dictionary.seller.newProduct.createSku.measurement.label}</Label>
        <ul className="flex flex-wrap  items-center  gap-2">
          {sizeList?.map((s, index) => (
            <li
              key={index}
              onClick={() => {
                if ((isEdit && !editMode) || isEditSku) return;
                setSKU((prev) => ({ ...prev, measurement: s }));
              }}
              className={`cursor-pointer rounded-full bg-gray-100 capitalize px-2 border py-1 ${
                sku?.measurement === s ? 'bg-primary text-white border-primary' : ''
              } ${isEditSku && ' cursor-not-allowed '} `}
            >
              {s}
            </li>
          ))}

          <AddModal list={sizeList} setList={setSizeList} />
        </ul>
      </div>

      <div className="flex gap-x-2 mt-3 flex-col items-start">
        <div className="space-y-1 w-full ">
          <Label>{dictionary.seller.newProduct.createSku.price.label}</Label>
          <Input
            onChange={(e: any) => {
              const input = e.target.value;
              if (/^\d*\.?\d{0,2}$/.test(input)) {
                setSKU((prev) => ({ ...prev, price: Number(input) }));
              }
            }}
            className="w-full placeholder:text-sm"
            type="number"
            inputMode="numeric"
            placeholder={dictionary.seller.newProduct.createSku.price.placeholder}
            value={sku.price}
            disabled={isEdit && !editMode}
          />
        </div>
        <div className="space-y-1 flex flex-row items-end gap-x-5 justify-between mt-3 xl:mt-5 w-full">
          <div className="flex-1 space-y-1">
            <Label>{dictionary.seller.newProduct.createSku.quantity.label}</Label>
            <Input
              onChange={(e) => setSKU((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))}
              className="w-full placeholder:text-sm"
              type="number"
              inputMode="numeric"
              placeholder={dictionary.seller.newProduct.createSku.quantity.placeholder}
              value={sku.quantity}
              disabled={isEdit && !editMode}
            />
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={isEdit && !editMode ? () => {} : createSKU}
            className="w-12"
          >
            <Plus className="w-6 h-6 text-primary" />
          </Button>
        </div>
      </div>
      <div className="mt-3 xl:mt-5">
        <Accordion type="single" collapsible>
          {SKUList.map((l: any, index: number) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>
                <div className="flex w-full items-center justify-between">
                  <span>{l.id}</span>
                  <Pencil
                    size={14}
                    className={`cursor-pointer me-1 hover:scale-105 transition-all duration-200 ${
                      isEdit && !editMode && ' hidden'
                    }`}
                    onClick={() => {
                      setIsEditSku(true);
                      setEditSkuId(l.id);
                    }}
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  <li>
                    {dictionary.seller.newProduct.createSku.skuPriceLabel}:{' '}
                    {formatCurrency(l.price)}
                  </li>
                  <li>
                    {dictionary.seller.newProduct.createSku.skuQuantityLabel}: {l.quantity}
                  </li>
                  <li>
                    {dictionary.seller.newProduct.createSku.skuMeasurementLabel}: {l.measurement}
                  </li>
                  <li className={l.color ? 'inline-block capitalize' : 'hidden'}>
                    {dictionary.seller.newProduct.createSku.skuColorLabel}: {l.color}
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="flex gap-x-2 mt-5 xl:mt-8">
        {!isEdit && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setStep((prev) => prev - 1)}
            className="w-1/2"
          >
            Back
          </Button>
        )}

        {(!isEdit || editMode) && (
          <Button
            type={isEdit && editMode ? 'submit' : 'button'}
            onClick={isEdit ? () => {} : nextStep}
            className={isEdit ? 'w-full' : 'w-1/2'}
            variant="default"
          >
            {isEdit && editMode ? ' Update' : ' Next'}
          </Button>
        )}
      </div>
    </>
  );
};

export default CreateSKU;
