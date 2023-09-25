import Image from 'next/image';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination } from 'swiper/modules';
import { Share2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/pagination';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ProductSlider({ images }: { images: string[] }) {
  return (
    <Swiper
      loop
      pagination={{ clickable: true }}
      keyboard
      modules={[Keyboard, Pagination]}
      className="container w-full h-full mySwiper relative"
    >
      <div className="absolute z-10 top-5 right-5">
        <Popover>
          <PopoverTrigger>
            <Share2 />
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="flex flex-col items-center justify-center">
              <a
                href={`${
                  window.innerWidth < 420 ? 'whatsapp://' : 'https://web.whatsapp.com/'
                }send?text=Check out this amazing product on All Organics ${window.location.href}`}
                data-action="share/whatsapp/share"
                target="_blank"
                className="hover:bg-slate-200 w-full p-2 flex items-center justify-center rounded-lg"
              >
                Share On Whatsapp
              </a>
              <span className="hover:bg-slate-200 w-full p-2 flex items-center justify-center rounded-lg">
                <FacebookShareButton url={encodeURI(window.location.href)}>
                  Share On Facebook
                </FacebookShareButton>
              </span>
              <span className="hover:bg-slate-200 w-full p-2 flex items-center justify-center rounded-lg">
                <TwitterShareButton url={encodeURI(window.location.href)}>
                  Share On Twitter
                </TwitterShareButton>
              </span>
              <CopyToClipboard
                onCopy={() => toast.success('Link Copied')}
                text={window.location.href}
              >
                <span className="hover:bg-slate-200 w-full p-2 cursor-pointer flex items-center justify-center rounded-lg">
                  Copy Link
                </span>
              </CopyToClipboard>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {images.map((url: string, index: number) => (
        <SwiperSlide className=" w-full h-full" key={index}>
          <div className="relative w-full rounded-lg overflow-hidden h-[60vh] md:h-full">
            <Image
              sizes="100%"
              className="w-full  h-full object-cover object-center"
              src={url}
              alt="product details"
              fill
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
