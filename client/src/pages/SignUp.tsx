import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
   
  const onSubmit = (data: any) => console.log(data);
  return (
    <div className=" w-[100vw] h-[100vh] flex items-center justify-center">
      <div className=" max-w-[400px] ">
        <div className=" font-semibold text-3xl text-center">Create An Account</div>
        <div className="">
          
        <p className="mt-2 text-gray-600 text-base font-light text-[15px]">
          Sign up to gain access to our exclusive code base.
        </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col  gap-3 mt-7"
        >
          <div>
            <input
              className=" border w-full border-gray-200 p-3 rounded-md text-[14px]"
              placeholder="Email address"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
            />
            <p className=" mt-1  text-[12px] text-red-500">
              {errors.email?.message}
            </p>
          </div>
          <Button className="text-[14px] py-6 mt-3" type="submit">
            <div className="">Continue</div>
          </Button>
        </form>
        <div className=" mt-4 flex flex-row items-center  gap-2">
          <div className="flex flex-1 h-0.5 bg-gray-200"></div>
          <div className="text-sm text-gray-500">or</div>
          <div className="flex flex-1 h-0.5 bg-gray-200"></div>
        </div>
        <Button variant={"outline"} className="text-[14px] w-full py-6 mt-4 cursor-pointer">
          <FaGoogle />
          <div className="">Continue with google</div>
        </Button>
        <div className=" text-center mt-6">
            <p className=" text-sm">Don't have an account ? <Link to={'/login'} className=" text-blue-600 cursor-pointer">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
