import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
function Password() {
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
  console.log(errors);
  const onSubmit = (data: any) => console.log(data);
  return (
    <div className=" w-[100vw] h-[100vh] flex items-center justify-center">
      <div className=" max-w-[400px] ">
        <div className=" font-semibold text-3xl text-center">Create Password</div>
        <div className="">
          <p className="mt-4 text-gray-500  text-center text-base font-[400] text-[15px]">
          To protect your account, make sure your password is not too easy.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col  gap-3 mt-7"
        >
          <div className="flex flex-col gap-2">
            <div>
              <input
                className=" border w-full border-gray-200 p-3 rounded-md text-[14px]"
                placeholder="Password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters!",
                  },
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              <p className=" mt-1  text-[12px] text-red-500">
                {errors.password?.message}
              </p>
            </div>

           
          </div>

          <Button className="text-[14px] py-6 mt-3" type="submit">
            <div className="">Create</div>
          </Button>
        </form>
        
        
      </div>
    </div>
  );
}

export default Password;
