import { ChevronRightIcon } from '@radix-ui/react-icons';
import BoxedContent from '@/components/common/BoxedContent';
import Link from 'next/link';

const DISCOUNT = 10;

const Footer = ({ dictionary }: { dictionary: any }) => {
  return (
    <footer className="">
      <BoxedContent className="flex flex-col lg:flex-row  w-full mx-auto my-12">
        <div className="w-full space-y-6">
          <p className="uppercase text-sm">{dictionary.footer.subscription.heading} {DISCOUNT}%</p>
          <form className="flex items-center p-2 w-full md:w-2/3 gap-x-1 border placeholder:text-sm border-neutral-500 placeholder:text-neutral-500 focus-within:border-neutral-900 rounded-md">
            <input
              type="email"
              placeholder={dictionary.footer.subscription.emailPlaceholder}
              className="bg-none focus:outline-none flex-1"
            />
            <button type="submit">
              <ChevronRightIcon width={22} height={22} />
            </button>
          </form>
          <ul className="hidden lg:flex flex-col md:flex-row gap-x-5 text-sm">
            <li className="cursor-pointer hover:underline underline-offset-2">{dictionary.footer.links.org.privacy}</li>
            <li className="cursor-pointer hover:underline underline-offset-2">{dictionary.footer.links.org.terms}</li>
            <li className="cursor-pointer hover:underline underline-offset-2">{dictionary.footer.links.org.accessibility}</li>
          </ul>
        </div>
        <div className="w-full flex gap-y-6 mt-8 lg:mt-0 md:gap-x-12 flex-col md:flex-row items-start">
          <div className="flex-shrink-0 space-y-3">
            <h6 className="font-medium uppercase">{dictionary.footer.links.about.heading}</h6>
            <ul className="space-y-1 text-sm">
              <li className="hover:underline cursor-pointer">{dictionary.footer.links.about.about}</li>
              <li className="hover:underline cursor-pointer">{dictionary.footer.links.about.expertsProgram}</li>
              <li className="hover:underline cursor-pointer">
                <Link href="/market">{dictionary.footer.links.about.brandsAndShops}</Link>
              </li>
              <li className="hover:underline cursor-pointer">{dictionary.footer.links.about.contact}</li>
            </ul>
          </div>
          <div className="flex-shrink-0 space-y-3">
            <h6 className="font-medium uppercase">{dictionary.footer.links.ordersAndSupport.heading}</h6>
            <ul className="space-y-1 text-sm">
              <li className="hover:underline cursor-pointer">{dictionary.footer.links.ordersAndSupport.shipping}</li>
              <li className="hover:underline cursor-pointer">{dictionary.footer.links.ordersAndSupport.return}</li>
              <li className="hover:underline cursor-pointer">{dictionary.footer.links.ordersAndSupport.payment}</li>
            </ul>
          </div>
          <div className="flex-shrink-0 space-y-3">
            <h6 className="font-medium uppercase">{dictionary.footer.links.locationPreferences.heading}</h6>
            <ul className="space-y-1 text-sm">
              <li className="hover:underline cursor-pointer">Shipping: United States</li>
              <li className="hover:underline cursor-pointer">Language: English</li>
            </ul>
          </div>
        </div>
        <ul className="flex flex-col gap-y-1.5 mt-8 sm:flex-row sm:gap-x-5 lg:hidden  text-sm">
          <li className="cursor-pointer hover:underline underline-offset-2">Privacy Policy</li>
          <li className="cursor-pointer hover:underline underline-offset-2">Terms of Use</li>
          <li className="cursor-pointer hover:underline underline-offset-2">Accessibility</li>
        </ul>
      </BoxedContent>
    </footer>
  );
};

export default Footer;
