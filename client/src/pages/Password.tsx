import  { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
 
import {useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
 
function Password() {
  const location = useLocation();
 
  const [isLoading, setIsLoading] = useState(false);
  const { email } = location.state || {};
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });
  const navigate = useNavigate();
  

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      if (!email || !watch("password") || watch("password").length < 6) {
        toast("Otp Error", {
          description:
            "Email and password is required please make sure to confirm",
          position: "top-center",
          action: {
            label: "Undo",
            onClick: () => {
              // navigage("/");
            },
          },
        });
      }
      console.log(email,data.password)
      navigate('/create-username' ,{state : {email : email , password:data?.password , state : 'signup'}});
     
    } catch (error: any) {
      toast("Error", {
        description: error.message,
        position: "top-center",
        action: {
          label: "Close",
          onClick: () => {
            console.log("Closed");
          },
        },
      });
      setIsLoading(false);
    }
  };
  return (
    <div className=" w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="w-sm-[300px] w-md-[300px] w-lg-[400px] ">
        <div className=" font-semibold text-3xl text-center">
          Create Password
        </div>
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
                type="password"
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

          <Button
            className="text-[14px] py-6 mt-3"
            type="submit"
            disabled={!watch("password") || isLoading}
          >
            <div className="">Create</div>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Password;
