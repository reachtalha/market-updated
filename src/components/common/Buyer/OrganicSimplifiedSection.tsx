import Image from "next/image";
import user from "@/assets/images/user.jpeg";

export default function OrganicSimplifiedSection(){
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium">#OrganicSimplified</p>
        <p className="text-xl font-medium">@allorganicsmarket</p>
      </div>
      <ul className="flex justify-between gap-x-4">
        <li>
          <Image
            src={user}
            height={400}
            width={400}
            alt=""
            className="w-[432px] h-96 rounded-lg object-cover"
          />
        </li>
        <li>
          <Image
            src={user}
            height={400}
            width={400}
            alt=""
            className="w-[432px] h-96 rounded-lg object-cover"
          />
        </li>
        <li>
          <Image
            src={user}
            height={400}
            width={400}
            alt=""
            className="w-[420px] h-96 rounded-lg object-cover"
          />
        </li>
      </ul>
    </div>
  )
}