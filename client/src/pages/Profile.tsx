import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "@/components/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BsBlockquoteLeft } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LiaEditSolid } from "react-icons/lia";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { AiOutlineComment } from "react-icons/ai";
import { SlLike } from "react-icons/sl";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import MessageSheet from "@/components/messageSheet";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { APP_URL } from "@/Config";
import { token_descrypt } from "@/Services/Decrypt";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/loading";
import api from "@/api/axios";
import CardTwo from "@/components/cartTwo";
import { CiEdit } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

function Profile() {
  const [progress, setProgress] = React.useState(13)
 
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500)
    return () => clearTimeout(timer)
  }, [])
  const { username } = useParams();
  const ref= useRef(null);
  const encryptedToken = localStorage.getItem("access_token");
  const userId = (token_descrypt(encryptedToken) as { id: string })?.id;
  const [isFollow, setisFollow] = useState(false);
  const fetchUserData = async (username: string | undefined) => {
    try {
      const response = await api.get(
        "/auth/get-user?username=" + username?.replace("@", "")
      );
      return response?.data?.data;
    } catch (error) {}
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["profileData", username],
    queryFn: () => fetchUserData(username),
  });
  if (error) return "An error has occurred: " + error.message;
const handleFileChange=(e:any)=>{
const file = e.target.files;
console.log(file[0])
}
  return (
    <div className=" max-w-3xl md:px-0 px-5  mx-auto pb-10">
      {isLoading ? (
        <div className=" mt-10 flex flex-col  space-y-3 items-center">
          <div className="gap-2 items-center mx-auto flex flex-col">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-3 mt-3 w-[200px]" />
            <Skeleton className="h-3 mt-3 w-[300px]" />

            <div className=" flex items-center gap-3">
              <Skeleton className="h-10 rounded-full mt-3 w-24" />
              <Skeleton className="h-10 rounded-full mt-3 w-24" />
            </div>

            <Loading />
          </div>
        </div>
      ) : (
        <div className=" mt-10 flex flex-col  space-y-3 items-center">
          <LazyLoadImage
            alt={"not found"}
            effect="blur"
            className="rounded-full w-24 h-24"
            src={
              "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
            } // use normal <img> attributes as props
          />
          {/* <img
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
              alt=""
              className="rounded-full w-24 h-24"
            /> */}
          <div className=" mt-3 text-2xl font-semibold">John Stone</div>
          {data?.user?.bio && (
            <div className="text-gray-500 text-[14px] line-clamp-2 font-[400]">
              {data?.user?.bio}
            </div>
          )}

          <div className="flex h-5 items-center space-x-4 text-sm">
            <div className=" opacity-70">
              {data?.user?.followings?.length} Following
            </div>
            <Separator orientation="vertical" />
            <div className="opacity-70">
              {data?.user?.followers?.length} Follower
            </div>
            <Separator orientation="vertical" />
            <div className="opacity-70">{data?.posts?.length} Posts</div>
          </div>
          <div className=" mt-3 flex gap-2">
            {data?.user?._id != userId &&
              (isFollow ? (
                <div className="  px-6 py-2 cursor-pointer text-[14px] rounded-full border inline-block border-black  hover:bg-black hover:text-white">
                  Follow
                </div>
              ) : (
                <div className="  px-6 py-2 cursor-pointer text-[14px] rounded-full border inline-block border-black  hover:bg-black hover:text-white">
                  Unfollow
                </div>
              ))}

            {data?.user?._id === userId && (
              <Dialog>
                <DialogTrigger>
                  <div className="  px-6 py-2 cursor-pointer text-[14px] rounded-full border inline-block border-black  hover:bg-black hover:text-white">
                    Edit Profile
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogDescription className=" flex flex-col items-center">
                      <div className=" relative">
                        <LazyLoadImage
                          alt={"not found"}
                          effect="blur"
                          className="rounded-full w-20 h-20"
                          src={
                            "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2584"
                          } // use normal <img> attributes as props
                        />
                        <div className=" bg-white p-1 cursor-pointer absolute bottom-1 shadow right-0 rounded-full" onClick={()=>ref.current.click()}>
                        <CiEdit size={20}/>
                        </div>
                        
                       
                        <input type="file" name="" onChange={handleFileChange}  accept="image/jpeg,image/png,image/png" ref={ref} className=" hidden" id="" />
                      </div>
                     <div className=" flex items-center gap-2">
                     <Progress value={progress} color="green" className=" bg-gray-200 w-30 mt-1 h-1.5"/>
                     <div className=" text-[12px] font-[400]">
                      {
                        progress/100*100 + "%"
                      }
                     </div>
                     </div>
                      <div className=" flex  flex-col gap-4">
                        <div className=" flex items-start flex-col gap-1.5">
                          <label className=" text-black opacity-70 font-[500]">Name</label>
                          <Input type="text" placeholder="Name" value={data?.user.name} className=" text-[13px] shadow-none"/>

                        </div>
                        <div className=" flex items-start flex-col gap-1.5">
                          <label className=" text-black opacity-70 font-[500]">Username</label>
                          <Input type="text" placeholder="Username" value={data?.user.username} className=" shadow-none text-[13px]"/>

                        </div>
                        <div className=" flex items-start flex-col gap-1.5">
                          <label className=" text-black opacity-70 font-[500]">Bio</label>
                          <Textarea placeholder="Bio"  className=" text-[13px] focus:outline-0 focus:border-0" value={data?.user.bio}/>

                        </div>

                      </div>

                      <div className=" mt-6  flex gap-4">
                        <Button variant={"outline"} className=" text-[13px]">Cancel</Button>
                        <Button className=" text-[13px]">Submit</Button>
                      </div>
                      
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}

            {data?.user?._id != userId && <MessageSheet />}
          </div>

          <div className="flex items-center mt-4">
            <div className="flex  items-center gap-2 px-12 py-3 border-b border-black cursor-pointer font-[400]">
              <BsBlockquoteLeft className=" text-[24px] font-bold" />{" "}
              <div>{data?.posts?.length} Posts</div>
            </div>
            <div className="flex items-center gap-2 px-12 py-3 border-b  opacity-70 cursor-pointer">
              <BsBookmarks className=" text-[20px] font-bold" />
              <div>Favourites</div>
            </div>
          </div>

          <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.posts.length > 0 ? (
              data?.posts?.map((post: any, index: number) => (
                <CardTwo key={index} {...post} />
              ))
            ) : (
              <p>This user has not posted yet!ß</p>
            )}
          </div>

          <div className="  px-4 py-2 cursor-pointer text-[14px] rounded-full mt-6 border inline-block border-black ">
            See More Posts
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
