import { useFormContext } from "react-hook-form";

const Influencer = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <h4 className="mb-3 text-2xl text-killarney-600">Add Personal Info</h4>
      <div className="flex mt-3 flex-col md:flex-row w-full gap-3">
        <div className="w-full md:w-1/2 space-y-1">
          <label className="text-sm text-gray-400">Facebook URL</label>
          <input
            type="text"
            inputMode="text"
            className="w-full rounded-xl border-[2px] border-gray-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700"
            placeholder="Your facebook profile URL"
            {...register("fb")}
          />
          {errors.fb && (
            <span className="text-sm text-red-500">
              Is your FB profile URL right?
            </span>
          )}
        </div>
        <div className="w-full md:w-1/2 space-y-1">
          <label className="text-sm text-gray-400">Twitter URL</label>
          <input
            type="text"
            inputMode="text"
            className="w-full rounded-xl border-[2px] border-gray-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700"
            placeholder="Your twitter profile URL"
            {...register("twitter")}
          />
          {errors.twitter && (
            <span className="text-sm text-red-500">
              Is your twitter profile URL right?
            </span>
          )}
        </div>
      </div>
      <div className="w-full mt-3">
        <label className="text-sm text-gray-400">Linkedin URL</label>
        <input
          type="text"
          inputMode="text"
          className="w-full rounded-xl border-[2px] border-gray-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700"
          placeholder="Your linkedin profile URL"
          {...register("linkedin")}
        />
        {errors.linkedin && (
          <span className="text-sm text-red-500">
            Is your linkedin profile URL right?
          </span>
        )}
      </div>
      <div className="w-full mt-3">
        <label className="text-sm text-gray-400">Your Bio</label>
        <textarea
          rows={3}
          className="w-full resize-none rounded-xl border-[2px] border-gray-200 p-2.5 transition-transform delay-75 duration-300 placeholder:text-sm hover:border-killarney-700 focus:-translate-y-[2px] focus:outline-killarney-700"
          placeholder="Your Bio"
          {...register("bio", {
            required: true,
          })}
        ></textarea>
        {errors.bio && (
          <span className="text-sm text-red-500">Bio cannot be empty!</span>
        )}
      </div>
    </>
  );
};

export default Influencer;
