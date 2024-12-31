import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
export default function SelectProductVariant() {
  return (
    <RadioGroup className="flex" defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem className="bg-[#DED8CD]" value="default" id="r1" />
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem className="bg-[#DED8C4]" value="comfortable" id="r2" />
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem className="bg-[#B7C0A8]" value="compact" id="r3" />
      </div>
    </RadioGroup>
  );
}
