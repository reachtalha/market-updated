export default function OurMission({ text }: { text: string }) {
  return (
    <>
      <h6 className="underline underline-offset-4 uppercase text-sm">&#8594; Our Mission</h6>
      <p className="text-xl font-semibold mt-4 mb-10 md:mb-20">{text}</p>
    </>
  );
}
