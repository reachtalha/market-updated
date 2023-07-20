import { ReactNode } from "react";

type BoxedContentProps = {
  children: ReactNode;
  className?: string;
};
export default function BoxedContent({
  children,
  className,
}: BoxedContentProps) {
  return <div className={`container ${className}`}>{children}</div>;
}
