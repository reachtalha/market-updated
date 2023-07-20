import SortByDropdown from "@/components/common/SortByDropdown";

type ProductHeaderProps = {
  title: string | null;
};
export default function ProductHeader({ title = "" }: ProductHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="uppercase font-medium tracking-wide text-sm">{title}</p>
      <SortByDropdown />
    </div>
  );
}
