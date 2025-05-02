import  { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchApi } from "@/api/fetchApi";
function SignUp() {
  const [isLoading,setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    
    },
  });
  const navigate =useNavigate();
   
  const onSubmit = async(data: any) => {
    if(!data){
      return;
    }
    if(data.email.length < 10){
      toast("Sign Up Error", {
        description: "Please enter a valid email!",
        position: "top-center",
        action: {
          label: "Close",
          onClick: () => {
            console.log("Closed");
          },
        },
      });
    }
    try {
      setIsLoading(true);
      const responseData = await fetchApi({ endpoint: "/auth/send-otp", data : {...data,state: 'signup'} });
      setIsLoading(false);
      if (responseData.status !== 200) {
        toast("Sign Up Error", {
          description: responseData.message,
          position: "top-center",
          action: {
            label: "Close",
            onClick: () => {
              console.log("Closed");
            },
          },
        });
      }
    
      if(responseData.status===200){
        toast("Otp", {
          description: responseData.message,
          position: "top-center",
          action: {
            label: "Close",
            onClick: () => {
              console.log("Closed");
            },
          },
        });
       
        // localStorage.setItem("access_token",responseData.user.token);
        navigate('/otp-verify' ,{state : {email : data.email , state : 'signup'}});
      }


    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
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
    
    }
    
    
  };
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
              type="email"
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
          <Button className="text-[14px] py-6 mt-3" type="submit" disabled={isLoading||!watch('email')}>
           {
            isLoading ?  <div className="">Loading...</div>: <div className="">Continue</div>
           }
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
