import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import OtpInput from 'react-otp-input';

import { Link } from "react-router-dom";
function Otp() {
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
  const [otp, setOtp] = useState('');
  const onSubmit = (data: any) => console.log(data);
  return (
    <div className=" w-[100vw] h-[100vh] flex items-center justify-center">
      <div className=" max-w-[400px] ">
        <div className=" font-semibold text-3xl text-center">Verify Your Account</div>
        <div className="">
          
        <p className="mt-2 text-center text-gray-600 text-base font-light text-[15px]">
         
        Enter the OTP sent to your email address to verify your account.
        </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col  gap-3 mt-7 "
        >
         <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      shouldAutoFocus={true}
      inputStyle={" border flex-1 border-gray-300 rounded-md w-12 h-12"}
      containerStyle={"flex justify-between gap-5"}
      renderInput={(props) => <input   {...props} />}
    />
          <Button className="text-[14px] py-6 mt-3" type="submit">
            <div className="">Verify</div>
          </Button>
        </form>
        
        
        <div className=" text-center mt-6">
            <p className=" text-sm">Don't get an otp ? <Link to={'/login'} className=" text-blue-600 cursor-pointer">resend code</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Otp;
