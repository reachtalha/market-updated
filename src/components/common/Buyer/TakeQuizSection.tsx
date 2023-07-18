export default function TakeQuizSection(){
  return (
    <div className="bg-primary text-white text-center py-28 px-10">
      <h2 className="text-7xl font-medium tracking-wide">
        Organic Products
        <span className="ml-2 font-alpina font-normal italic tracking-tight">
              curated for you
            </span>
      </h2>
      <p className="text-xl mt-2">
        Get personalized product picks from a Real Expert — for free.
      </p>
      <button className="rounded-full mt-5 uppercase text-sm px-5 duration-300 delay-75 transition-colors py-2.5 border-[2px] border-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 bg-none">
        Take our Quiz
      </button>
    </div>
  )
}