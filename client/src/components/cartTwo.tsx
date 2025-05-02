import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
 
import "react-lazy-load-image-component/src/effects/blur.css";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import numeral from "numeral";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { SlLike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
 
 
import { LazyLoadImage } from "react-lazy-load-image-component";
import { token_descrypt } from "@/Services/Decrypt";
import { IoMdBookmark } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import moment from "moment";
import api from "@/api/axios";
import { Link } from "react-router-dom";
 
const encryptedToken = localStorage.getItem("access_token");
const userId = (token_descrypt(encryptedToken) as { id: string })?.id;
 
interface postProp {
  favs:any;
    handleBookmark: any;
    handleLike: any;
    _id: string;
    title: string;
    description: string;
    slug: string;
    cover_image: string;
    likes: string[];
    createdAt : Date;
    author_id: {
      profile: string;
      username: string;
      name?: string | null;
      bio?: string;
      _id: string;
      followers?: string[];
      favourites?:string[];
      createdAt: Date;
      handleLike: (userId: string, postId: string) => void;
      handleBookmark : (userId: string, postId: string) => void;
      favs?: string[];
  }
}
function CardTwo( post:postProp,) {
  // const queryClient = useQueryClient();
  
   const likeFunction = post?.handleLike;
   const bookmarkFunction = post?.handleBookmark;  
   const username = (token_descrypt(encryptedToken) as { id: string ,username:string})?.username;
   const fetchUserData = async (username: string | undefined) => {
     try {
       const response = await api.get(
         "/auth/get-user?username=" + username?.replace("@", "")
       );
       return response?.data?.data;
     } catch (error) {}
   };
   const {  data } = useQuery({
     queryKey: ["profileData", username?.replace("@", "")],
     queryFn: () => fetchUserData(username?.replace("@", "")),
   });


  //  const handleFollowUpdate = async (
  //   userId: string,
  //   followedUserId: string,
  //   postId: string
  // ) => {
  //   try {
  //     const response = await api.put(
  //       `/auth/follow-user?userId=${userId}&followedUserId=${followedUserId}`
  //     );
  //     return response.data;
  //   } catch (error: any) {
  //     console.log(error.message+postId);
  //   }
  // };
  // const followMutation = useMutation({
  //   mutationFn: ({
  //     userId,
  //     followedUserId,
  //     postId,
  //   }: {
  //     userId: string;
  //     followedUserId: string;
  //     postId: string;
  //   }) => handleFollowUpdate(userId, followedUserId, postId),
  //   onMutate: async (newTodo) => {
     
  //     const previousTodos = queryClient.getQueryData(["posts"]);

  //     queryClient.setQueryData(["posts"], (old: any) => {
  //       const updatedPosts = old?.posts?.map((post: any) => {
  //         if (post._id === newTodo.postId) {
  //           const updatedFollowers = post?.author_id?.followers?.includes(
  //             userId
  //           )
  //             ? post?.author_id?.followers?.filter(
  //                 (follower: string) => follower !== userId
  //               )
  //             : [...post?.author_id?.followers, userId];

  //           return {
  //             ...post,
  //             author_id: {
  //               ...post.author_id,
  //               followers: updatedFollowers,
  //             },
  //           };
  //         }
  //         return post;
  //       });
  //       return {
  //         ...old,
  //         posts: updatedPosts,
  //       };
  //     });

  //     return { previousTodos };
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   },
  //   onSuccess: () => {
  //     console.log("Followed successfully");
  //     // queryClient.invalidateQueries({ queryKey: ["userData", author_id] });
  //   },
  //   onSettled: () => {
  //     //  queryClient.invalidateQueries({ queryKey: ["userData", author_id] });
  //   },
  // });

  // const handleFollow = (
  //   userId: string,
  //   followedUserId: string,
  //   postId: string
  // ) => {
  //   followMutation.mutate({ userId, followedUserId, postId });
  // };
   
  
  return (
    <div className=" ">
        <Link to={"/detail/" + post?.slug}>
       <LazyLoadImage
                    alt={"Not found"}
                    effect="blur"
                   
                    src={post?.cover_image}  
                  className="w-full h-[200px] object-cover rounded-md"
                    wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "1s"},
                  }}
                  />
                  </Link>
      {/* <img src={post?.cover_image} alt="" className="w-full" /> */}
      <div className="flex gap-2 mt-2 items-center">
        <img
          src={post?.author_id?.profile}
          alt=""
          className="rounded-full w-6 h-6"
        />
        <div className=" text-[12px]  text-gray-50">
          <HoverCard>
            <HoverCardTrigger asChild>
                <Link to={"/profile/@" + post?.author_id?.username}>
              <Button variant="link" className=" font-light ps-0 text-[13px]">
                {post?.author_id?.name !== null ? (
                  <p className=" capitalize">{post?.author_id?.name}</p>
                ) : (
                  <p className=" capitalize">{post?.author_id?.username}</p>
                )}
              </Button>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <div className=" flex items-center gap-4">
                    <img
                      src={post?.author_id?.profile}
                      alt=""
                      className="rounded-full w-10 h-10"
                    />
                  <div className=" flex items-center justify-between  w-60">
                  <div >
                      <div className=" font-light ps-0 text-[13px]">
                        {post?.author_id?.name !== null ? (
                          <p className=" capitalize">{post?.author_id?.name}</p>
                        ) : (
                          <p className=" capitalize">{post?.author_id?.username}</p>
                        )}
                      </div>
                      <div className=" font-light ps-0 text-[13px]">
                        
                          <p className=" capitalize">{post?.author_id?.followers?.length} Followers</p>
                        
                      </div>
                    </div>
                   {/* {post?.author_id._id !== userId && (
                                               <Button
                                                 className=" text-[12px] rounded-full"
                                                 size={"sm"}
                                                 onClick={() =>
                                                   handleFollow(userId, post?.author_id._id, post?._id)
                                                 }
                                               >
                                                 {!post?.author_id?.followers?.includes(userId)
                                                   ? "Follow"
                                                   : "Unfollow"}
                                               </Button>
                                             )} */}
                  </div>

                  </div>
                  <p className="text-sm mt-2">
                   {post?.author_id?.bio}
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      Joined December 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <Link to={"/detail/" + post?.slug}>
      <div className=" text-xl font-semibold line-clamp-2">{post?.title}</div>
      </Link>
      <div className=" mt-2 text-gray-500 text-[14px] line-clamp-2 font-[400]">
        {post?.description}
      </div>
      <div className=" mt-5 flex items-center justify-between">
        <div className=" flex items-center gap-5">
          <div className=" text-[13px] opacity-70 cursor-pointer">
             {moment(post?.createdAt).format("MMM D")}
          </div>
          <div className="flex gap-2 items-center opacity-70">
            <SlLike
                             className=" text-[16px] cursor-pointer  "
                             color={post?.likes?.includes(userId) ? "red" : "black"}
                             onClick={() => likeFunction(userId, post?._id)}
                           />
            <div className=" text-[14px]  ">
              {post?.likes?.length < 1000
                ? numeral(post?.likes?.length).format("0a")
                : numeral(post?.likes?.length).format("0.0a")}
            </div>
          </div>
          <div className="flex gap-2 items-center opacity-70 cursor-pointer">
            <AiOutlineComment className=" text-[20px]" />
            <div className=" text-[14px]">1.2k</div>
          </div>
        </div>
        <div className=" flex items-center gap-5">
           <div className=" flex ">
                         {data?.user?.favourites?.includes(post?._id) ? (
                           <IoMdBookmark
                             size={23}
                             className=" mt-[2px] cursor-pointer"
                             onClick={() => bookmarkFunction(userId, post?._id)}
                           />
                         ) : (
                           <CiBookmark
                             size={23}
                             className=" mt-[2px] cursor-pointer"
                             onClick={() => bookmarkFunction(userId, post?._id)}
                           />
                         )}
                       </div>
          <Popover>
            <PopoverTrigger className=" mb-0">
              {" "}
              <HiOutlineDotsCircleHorizontal className=" text-[22px] opacity-70 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CardTwo);
