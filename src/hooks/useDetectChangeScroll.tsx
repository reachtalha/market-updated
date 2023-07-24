import {useEffect, useState} from "react";

export default function useDetectChangeScroll(){
  const [isScrollChanged, setIsScrollChanged] = useState(false);
  const changeScroll = () => setIsScrollChanged(window.scrollY > 0)

  useEffect(() => {
    window.addEventListener("scroll", changeScroll);
    return () => {
      window.removeEventListener("scroll", changeScroll);
    };
  }, []);

  return isScrollChanged;
}