import { fetchApi } from "@/api/fetchApi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

function Username() {
  const location = useLocation();
  const { email,password } = location.state || {};
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
   
  const handleSubmit = async (e: any) => {
   
    e.preventDefault();
      if(!username){
        toast("Sign Up Error", {
          description: "Please enter a valid name!",
          position: "top-center",
          action: {
            label: "Close",
            onClick: () => {
              console.log("Closed");
            },
          },
        });
      }
      if(!email || !password){
        toast("Sign Up Error", {
          description: "Please try again!",
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
      const user_name=username.replace(/\s+/g, "").toLocaleLowerCase()
   const responseData = await fetchApi({
          endpoint: "/auth/create-password",
          data: {password,email,username:user_name},
        });
        setIsLoading(false);
        
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
          localStorage.setItem("access_token", responseData.user.token);
          if(localStorage.getItem("access_token")){
            window.location.href = '/';
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
      <div className="w-sm-[300px] w-md-[300px] w-[400px] ">
        <div className=" font-semibold text-3xl text-center">Create Username</div>
        <div className="">
          <p className="mt-2 text-gray-600 text-base font-light text-[15px]">
            Create a unique username to personalize your experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className=" flex flex-col  gap-3 mt-7">
          <div>
            <input
              className=" border w-full border-gray-200 p-3 rounded-md text-[14px]"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <Button
            className="text-[14px] py-6 mt-3"
            type="submit"
            
            disabled={isLoading || !username}
          >
            {isLoading ? (
              <div className="">Loading...</div>
            ) : (
              <div className="">Create</div>
            )}
          </Button>
        </form>
        
      </div>
    </div>
  );
}

export default Username;
