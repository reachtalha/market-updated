import Image from "next/image";
import user from "@/assets/images/user.jpeg";

export default function OrganicSimplifiedSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium">#OrganicSimplified</p>
        <p className="text-xl font-medium">@allorganicsmarket</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-y-4 md:gap-x-4">
          <div
            // src={user}
            // height={400}
            // width={400}
            // style={{ width: 400, height: 400 }}
            // alt=""
            className="w-full h-[200px] md:h-[350px] rounded-lg object-cover bg-gray-100"
          />
          <div
            // src={user}
            // height={400}
            // width={400}
            // style={{ width: 400, height: 400 }}
            // alt=""
            className="w-full h-[200px] md:h-[350px] rounded-lg object-cover bg-gray-100"
          />
          <div
            // src={user}
            // height={400}
            // width={400}
            // style={{ width: 400, height: 400 }}
            // alt=""
            className="w-full h-[200px] md:h-[350px] rounded-lg object-cover bg-gray-100"
          />
      </div>
    </div>
  );
}
