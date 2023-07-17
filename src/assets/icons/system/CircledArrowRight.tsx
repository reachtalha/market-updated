export default function CircledArrowRight({ ...props }){
  return (
    <svg {...props} width="60" height="60" viewBox="0 0 60 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="58" height="58" rx="29" stroke="white" strokeWidth="2"/>
      <path d="M25 40L36 30L25 20" stroke="white" strokeWidth="2" strokeLinecap="square"/>
    </svg>
  )
};

