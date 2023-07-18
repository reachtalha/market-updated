import {ReactNode} from "react";

type BoxedContentProps = {
  children: ReactNode
  className?: string
}
export default function BoxedContent({ children, className } : BoxedContentProps){
  return <div className={`x-3 md:px-5 lg:px-8 xl:px-10 ${className}`}>
    {children}
  </div>
}