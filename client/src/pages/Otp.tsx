import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import OtpInput from 'react-otp-input';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchApi } from "@/api/fetchApi";
 
function Otp() {
  const location= useLocation();
  const{email,state} = location.state ||{state : 'login'};
  const [otp, setOtp] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const navigage = useNavigate();
  const[isSend,setIsSend] = useState(false);
  const handleSubmit = async(e:any) =>{
    e.preventDefault();
    if(!otp && otp.length<6){
      toast("Otp Error", {
        description: "Otp is required plese fill all required fields!",
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
      if(!otp || otp.length<6 || !email){
        toast("Otp Error", {
          description: "Email and Otp is required please make sure to confirm",
          position: "top-center",
          action: {
            label: "Login",
            onClick: () => {
              navigage('/');
            },
          },
        });
      }
      const responseData = await fetchApi({ endpoint: "/auth/verify-otp", data :{email , otp,state} });
            setIsLoading(false);
            if (responseData.status !== 200) {
              toast("Otp Error", {
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
              toast("Success", {
                description: responseData.message,
                position: "top-center",
                action: {
                  label: "Close",
                  onClick: () => {
                    console.log("Closed");
                  },
                },
              });
              if(state=='login'){
                localStorage.setItem("access_token",responseData.data.user.token);
                if(localStorage.getItem("access_token")){
                  navigage('/');
                }
            
              }else{
                navigage('/confirm-password' ,{state : {email :email}});
              }
              
           
            }
      
    } catch (error : any) {
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
    }
  
  const resendOtp=async()=>{
       if(!isSend){
        try {
          setIsSend(true);
          const responseData = await fetchApi({ endpoint: "/auth/send-otp", data :{email} });
          if (responseData.status !== 200) {
            toast("Otp Error", {
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
            toast("Success", {
              description: "Otp code resend successfully please try again",
              position: "top-center",
              action: {
                label: "Close",
                onClick: () => {
                  console.log("Closed");
                },
              },
            });
           
          }
        } catch (error) {
          
        }
       }
  }
  return (
    <div className=" w-[100vw] h-[100vh] flex items-center justify-center">
      <div className=" max-w-[400px] ">
        <div className=" font-semibold text-3xl text-center">Verify Your Account</div>
        <div className="">
          
        <p className="mt-2 text-center text-gray-600 text-base font-light text-[15px]">
         
        Enter the OTP sent to <span className="text-blue-600">{email}</span> and  verify your account.
        </p>
        </div>

        <form
          onSubmit={handleSubmit}
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
          <Button className="text-[14px] py-6 mt-3" type="submit" disabled={!otp||isLoading||otp.length<6}>
            <div className="">Verify</div>
          </Button>
        </form>
        
        
        <div className=" text-center mt-6">
            <p className=" text-sm">Don't get an otp ? <span className=" text-blue-600 cursor-pointer" onClick={resendOtp}>resend code</span></p>
        </div>
      </div>
    </div>
  );
}

export default Otp;
