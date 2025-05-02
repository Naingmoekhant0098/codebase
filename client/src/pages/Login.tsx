import  { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchApi } from "@/api/fetchApi";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    if (!data.email || !data.password) {
      toast("Crenditial Error", {
        description: "Please fill all the required fields",
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
      const responseData = await fetchApi({ endpoint: "/auth/login", data });
      setIsLoading(false);
      if (responseData.status !== 200) {
        toast("Log In Error", {
          description: "Wrong credentials please try again!",
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
        toast("Log In", {
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
        navigate('/otp-verify' ,{state : {email : data.email , state : "login"} });
      }


    } catch (error: any) {
      console.log(error);
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
      <div className=" max-w-[400px] ">
        <div className=" font-semibold text-3xl text-center">
          Welcome To Code Base
        </div>
        <div className="">
          <p className="mt-4 text-base text-[15px]">
            Enter your credentials to access the code base.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col  gap-3 mt-7"
        >
          <div>
            <input
              type="email"
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

          <div className="flex flex-col gap-2">
            <div>
              <input
                type="password"
                className=" border w-full border-gray-200 p-3 rounded-md text-[14px]"
                placeholder="Password"
                {...register("password", {
                  minLength: {
                    value: 6,
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

            <a className=" text-[12px]  text-end text-blue-400">
              forget password?
            </a>
          </div>

          <Button
            className="text-[14px] py-6 mt-3"
            type="submit"
            disabled={!watch("email") || !watch("password") || isLoading}
          >
            {isLoading ? (
              <div className="">Loading.....</div>
            ) : (
              <div className="">Login</div>
            )}
          </Button>
        </form>
        <div className=" mt-4 flex flex-row items-center  gap-2">
          <div className="flex flex-1 h-0.5 bg-gray-200"></div>
          <div className="text-sm text-gray-500">or</div>
          <div className="flex flex-1 h-0.5 bg-gray-200"></div>
        </div>
        <Button
          variant={"outline"}
          className="text-[14px] w-full py-6 mt-4 cursor-pointer"
        >
          <FaGoogle />
          <div className="">Continue with google</div>
        </Button>
        <div className=" text-center mt-6">
          <p className=" text-sm">
            Don't have an account ?{" "}
            <Link to={"/signup"} className=" text-blue-600 cursor-pointer">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
