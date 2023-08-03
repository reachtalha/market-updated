import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export default function DetailsAccordion({ SKU }: { SKU: any }) {
  return (
    <Accordion type="single" collapsible className="mt-8 w-full">
      <AccordionItem className="border-black border-t" value="item-1">
        <AccordionTrigger className="uppercase">Variants</AccordionTrigger>
        <AccordionContent>
          Sunlight sparkles on softly rolling waves. A deep breath. Awaken. Energize. Lift. Plunge
          into depths of eucalyptus and orange blossom, earthy vetiver and amber, warm and
          lingering. Crisp bergamot and sharp grapefruit punctuate—a fresh start, a new day. Notes:
          Top — Italian Bergamot, Grapefruit Heart — Hinoki, Vetiver Base — Eucalyptus, Amber,
          Orange Blossom
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
