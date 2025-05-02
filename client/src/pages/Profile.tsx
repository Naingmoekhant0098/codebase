import { Button } from "@/components/ui/button";
import React, { useCallback, useRef, useState } from "react";
import { BsBlockquoteLeft } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
import "react-lazy-load-image-component/src/effects/blur.css";
import MessageSheet from "@/components/messageSheet";
import { Separator } from "@/components/ui/separator";
import { PiBookmarksSimpleFill } from "react-icons/pi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Favourite from "@/components/favourite";
import {
  getStorage,
  ref,
  
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {  useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
 
import { token_descrypt } from "@/Services/Decrypt";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/loading";
import api from "@/api/axios";
import CardTwo from "@/components/cartTwo";
import { CiEdit } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { app } from "@/firebase";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function Profile() {
  console.log("Profile component");
  
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(0);
  const [downloadImage, setDownloadImage] = useState("");
  const { username } = useParams();
  const Fileref = useRef<HTMLInputElement>(null);
  const encryptedToken = localStorage.getItem("access_token");
  const userId = (token_descrypt(encryptedToken) as { id: string })?.id;
  const [tab, setTab] = useState("posts");
  const handleTab =useCallback((tab: string) => {
    setTab(tab);
  },[tab]);
   //const user_name = (token_descrypt(encryptedToken) as { id: string ,username:string})?.username;
  const fetchUserData = async (username: string | undefined) => {
    try {
      const response = await api.get(
        "/auth/get-user?username=" + username?.replace("@", "")
      );
      return response?.data?.data;
    } catch (error) {}
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["profileData", username?.replace("@", "")],
    queryFn: () => fetchUserData(username?.replace("@", "")),
  });

  
 
  interface UpdateData {
    name?: string;
    username?: string;
    bio?: string;
    profile?: string;
  }

  const [updateData, setUpdateData] = useState<UpdateData>({});
  const storage = getStorage(app);
  const handleFileChange = (e: any) => {
    const file = e.target.files;
    if (file.length > 0) {
      const storageRef = ref(
        storage,
        new Date().getTime() + "_" + file[0].name
      );
      const uploadTask = uploadBytesResumable(storageRef, file[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          // setUploadFileProgress(progress.toFixed(0))
        },
        (error) => {
          console.log(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setDownloadImage(downloadUrl);

            setUpdateData({ ...updateData, profile: downloadUrl });
          });
        }
      );
    }
  };
  const updateProfile = async (updateData: any) => {
    // Add your update logic here
    try {
      const response = await api.post("/auth/update-username", {
        ...updateData,
        email: data?.user.email,
      });
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const [isPending, setIsPending] = useState(false);
  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onMutate: () => {
      
      setIsPending(true);
      // const previousTodos = queryClient.getQueryData(["profileData", username]);
      // console.log(username)
    },
    onError: (err) => {
      console.log(err.message);
      setIsPending(false);
    },
    onSuccess: () => {
      console.log(updateData)
      queryClient.invalidateQueries({ queryKey: ["profileData", username?.replace("@", "")] });
      toast("Profile Updated", {
        position: "top-center",
        action: {
          label: "Close",
          onClick: () => {
            console.log("Closed");
          },
        },
      });
      setIsPending(false);
      if (updateData?.username) {
        navigate("/profile/@" + updateData?.username, { replace: true });
      }
    },
  });
  const handleUpdate = (e: any) => {
    e.preventDefault();
    updateMutation.mutate(updateData);
  };
  const handleFollowUpdate = async (userId: string, followedUserId: string) => {
    try {
      const response = await api.put(
        `/auth/follow-user?userId=${userId}&followedUserId=${followedUserId}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const followMutation = useMutation({
    mutationFn: ({
      userId,
      followedUserId,
    }: {
      userId: string;
      followedUserId: string;
    }) => handleFollowUpdate(userId, followedUserId),
    onMutate: async (newTodo) => {
      //console.log(newTodo)
      const previousTodos = queryClient.getQueryData(["profileData", username?.replace("@", "")]);

      queryClient.setQueryData(["profileData", username?.replace("@", "")], (old: any) => {
        const isFollowing = old?.user?.followers?.includes(newTodo.userId);
        const updatedFollowers = isFollowing
          ? old?.user?.followers?.filter(
              (follow: string) => follow !== newTodo.userId
            )
          : [...old?.user?.followers, newTodo.userId];

          console.log(updatedFollowers)
        if (isFollowing) {
          toast.success("Unfollowed successfully");
        } else {
          toast.success("Followed successfully");
        }
        return {
          ...old,
          user: {
            ...old.user,
            followers: updatedFollowers,
          },
        };
      });

      return { previousTodos };
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
     // queryClient.invalidateQueries({ queryKey: ["profileData", username?.replace("@", "")] });
    },
  });
  const handleFollow = (userId: string, followedUserId: string) => {
    followMutation.mutate({ userId, followedUserId });
  };   
  const handleLikeUpdate = async (userId: string, postId: string) => {
    try {
      const response = await api.put(
        `/posts/like-post?userId=${userId}&postId=${postId}`
      );
     
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  };
   const likeMutation = useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      handleLikeUpdate(userId, postId),
    onMutate: async (newTodo) => {
      const previousTodos = queryClient.getQueryData(["profileData", username?.replace("@", "")]);
     console.log(previousTodos)
      if (previousTodos) {
        queryClient.setQueryData(["profileData", username?.replace("@", "")], (old: any) => {
          const updatedLikes = old?.posts?.map((post: any) => {
            if (post._id === newTodo.postId) {
              const updatedLikes = post?.likes?.includes(userId)
                ? post?.likes?.filter((like: string) => like !== userId)
                : [...post?.likes, userId];
              return {
                ...post,
                likes: updatedLikes,
              };
            }
            return post;
          });
          return {
            ...old,
            posts: updatedLikes,
          };
        });
      }
      

      return { previousTodos };
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log("Liked successfully");
    },
  });
   const handleLike =useCallback((userId: string, postId: string) => {
    
    likeMutation.mutate({ userId, postId });
  },[]);
  const handleSaveUpdate = async (userId: string, postId: string) => {
    try {
      const response = await api.put(
        `/posts/save-post?userId=${userId}&postId=${postId}`
      );

      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  };

   
    const user_name = (token_descrypt(encryptedToken) as { id: string , username : string })?.username;
    
   
  const bookmarkMutation = useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      handleSaveUpdate(userId, postId),
    onMutate: async (newTodo) => {
      const previousTodos = queryClient.getQueryData(["profileData", user_name]);
      
     
     if (previousTodos) {
           queryClient.setQueryData(["profileData", user_name], (old: any) => {

            
            //  const updatedPosts = old?.posts?.map((post: any) => {
            //    if (post._id === newTodo.postId) {
            //      const updatedFollowers = post?.author_id?.favourites?.includes(
            //        newTodo.postId
            //      )
            //        ? post?.author_id?.favourites?.filter(
            //            (pt: string) => pt !== newTodo.postId
            //          )
            //        : [...post?.author_id?.favourites, newTodo.postId];
            //      const isSavedd = post?.author_id?.favourites?.includes(
            //        newTodo.postId
            //      );
            //      if (isSavedd) {
            //        toast.success("Post removed from bookmarks");
            //      } else {
            //        toast.success("Post saved to bookmarks");
            //      }
            //      return {
            //        ...post,
            //        author_id: {
            //          ...post.author_id,
            //          favourites: updatedFollowers,
            //        },
            //      };
            //    }
   
            //    return post;
            //  });

             const isFavUpdate = old.user.favourites.includes(newTodo.postId);
            
               const updatedFavourites = isFavUpdate ? old.user.favourites.filter(
                 (fav: string) => fav !== newTodo.postId
               ) :
                [
                 ...old.user.favourites,
                 newTodo.postId,
               ];

              
               if (isFavUpdate) {
               
                toast.success("Post removed from bookmarks");
               } else {
                toast.success("Post saved to bookmarks");
               }

             return {
               ...old,
               user : {
                 ...old.user,
                 favourites: updatedFavourites,
               }
             };
           });
         }
   
         return { previousTodos };

    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      console.log("Saved successfully");
    },
  });
  const handleBookmark =useCallback((userId: string, postId: string) => {
    bookmarkMutation.mutate({ userId, postId });
    console.log('what happen')
  },[]);
   
  if (error) return "An error has occurred: " + error.message;
  
  return (
    <div className=" max-w-3xl md:px-0 px-5  mx-auto pb-10 mt-20">
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
            className="rounded-full w-22 md:w-24  h-22 md:h-24 object-cover"
            src={data?.user?.profile}
          />

          <div className=" mt-3 text-2xl font-semibold">{data?.user?.name ? data?.user?.name : `@${data?.user?.username}`}</div>
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
            {data?.user?._id != userId && (
              <div
                className="  px-6 py-2 cursor-pointer text-[14px] rounded-full border inline-block border-black  hover:bg-black hover:text-white"
                onClick={() => handleFollow(userId, data?.user?._id)}
              >
                {!data?.user?.followers?.includes(userId)
                  ? "Follow"
                  : "Unfollow"}
              </div>
            )}
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
                          className="rounded-full w-20 h-20  object-cover"
                          src={
                            downloadImage ? downloadImage : data?.user?.profile
                          } // use normal <img> attributes as props
                        />
                        <div
                          className=" bg-white p-1 cursor-pointer absolute bottom-1 shadow right-0 rounded-full"
                          onClick={() => Fileref?.current?.click()}
                        >
                          <CiEdit size={20} />
                        </div>

                        <input
                          type="file"
                          name=""
                          onChange={handleFileChange}
                          accept="image/jpeg,image/png,image/png"
                          ref={Fileref}
                          className=" hidden"
                          id=""
                        />
                      </div>
                      {progress > 0 && (
                        <div className=" flex items-center gap-2">
                          <Progress
                            value={progress}
                            color="green"
                            className=" bg-gray-200 w-30 mt-1 h-1.5"
                          />
                          <div className=" text-[12px] font-[400]">
                            {(progress / 100) * 100 + "%"}
                          </div>
                        </div>
                      )}
                      <form action="post" onSubmit={handleUpdate}>
                        <div className=" flex  flex-col gap-4">
                          <div className=" flex items-start flex-col gap-1.5">
                            <label className=" text-black opacity-70 font-[500]">
                              Name
                            </label>
                            <Input
                              type="text"
                              placeholder="Name"
                              defaultValue={data?.user?.name}
                              className=" text-[13px] shadow-none"
                              onChange={(e) =>
                                setUpdateData({
                                  ...updateData,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className=" flex items-start flex-col gap-1.5">
                            <label className=" text-black opacity-70 font-[500]">
                              Username
                            </label>
                            <Input
                              type="text"
                              disabled
                              placeholder="Username"
                              defaultValue={data?.user?.username}
                              className=" shadow-none text-[13px]"
                              onChange={(e) =>
                                setUpdateData({
                                  ...updateData,
                                  username: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className=" flex items-start flex-col gap-1.5">
                            <label className=" text-black opacity-70 font-[500]">
                              Bio
                            </label>
                            <Textarea
                              placeholder="Bio"
                              className=" max-w-[200] text-[13px] focus:outline-0 focus:border-0"
                              defaultValue={data?.user?.bio}
                              onChange={(e) =>
                                setUpdateData({
                                  ...updateData,
                                  bio: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className=" mt-6  justify-center flex gap-4">
                          <DialogTrigger asChild>
                            <Button
                              variant={"outline"}
                              className=" text-[13px]"
                            >
                              Cancel
                            </Button>
                          </DialogTrigger>
                          <Button
                            disabled={!updateData || isPending}
                            type="submit"
                            className=" text-[13px]"
                          >
                            {isPending && <Loader2 className="animate-spin" />}
                            Submit
                          </Button>
                        </div>
                      </form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}

            {data?.user?._id != userId && <MessageSheet userData={data} />}
          </div>

          <div className="flex items-center mt-4">
            <div
              className={`flex  items-center gap-2 px-12 py-3 border-b ${tab==='posts'  ?  'border-black opacity-100 font-[400]' : "opacity-70"} cursor-pointer `}
              onClick={() => handleTab("posts")}
            >
              <BsBlockquoteLeft className=" text-[24px] font-bold" />{" "}
              <div>{data?.posts?.length} Posts</div>
            </div>
            <div
              className={`flex items-center gap-2 px-12 py-3 border-b ${tab==='favourites'  ?  'border-black opacity-100 font-[400]' : "opacity-70"}  cursor-pointer`}
              onClick={() => handleTab("favourites")}
            >
              {
                tab === "favourites" ? (
                 
                  <PiBookmarksSimpleFill className=" text-[24px] font-bold" />
                ) : (
                  <BsBookmarks className=" text-[20px] font-bold" />
                )
              }
            
              <div>Favourites</div>
            </div>
          </div>

          {
            tab === "posts"  ? (
              <div>
              <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {data?.posts?.length > 0 ? (
                  data?.posts?.map((post: any, index: number) => (
                  <CardTwo key={index} {...post} handleLike={handleLike} handleBookmark={handleBookmark} favs={data?.user?.favourites} />
                  ))
                ) : (
                  <p>This user has not posted yet!☹︎</p>
                )}
              </div>
  
              {/* <div className="  px-4 py-2 cursor-pointer text-[14px] rounded-full mt-6 border inline-block border-black ">
                See More Posts
              </div> */}
            </div>
            ) : (
              <div>
              <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"> 
                {data?.user?.favourites?.length > 0 ? (
                 data?.user?.favourites?.map((post: any, index: number) => (
                    <Favourite key={index} postId={post} favs={data?.user?.favourites} />
                  ))
                ) : (
                  <p>This user has no favourites yet!☹︎</p>
                )}
              </div>
  
              {/* <div className="mx-auto px-4 py-2 cursor-pointer text-[14px] rounded-full mt-6 border inline-block border-black ">
                See More Posts
              </div> */}
            </div>

            )
          }


        </div>
      )}
    </div>
  );
}

export default Profile;
