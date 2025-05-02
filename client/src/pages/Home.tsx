import  { useState } from 'react'
import Card from '../components/card'
import api from '@/api/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { token_descrypt } from '@/Services/Decrypt';
import InfiniteScroll from 'react-infinite-scroll-component';
function Home() {

  const [hasMore,setHasMore] = useState(true)
  const[page,setPage] = useState(1)
  
  const fetchPosts = async () => {
    try {
      const response = await api.get(
        "/posts/get-posts?order=desc&page=" + page + "&limit=" + 5
      );
    
      if (response?.data?.data?.posts?.length < 5) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
      return response?.data?.data;
    } catch (error) {}
  };

  const { isLoading, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    // onSuccess: (data) => {
    //   if (data?.posts.length < 5) {
    //     setHasMore(false);
    //   } else {
    //     setPage((prevPage) => prevPage + 1);
    //   }
    // }
  });
  const encryptedToken = localStorage.getItem("access_token");
  const queryClient = useQueryClient(); 
  const username = (
    token_descrypt(encryptedToken) as { id: string; username: string }
  )?.username;
  const fetchUserData = async (username: string | undefined) => {
    try {
      const response = await api.get(
        "/auth/get-user?username=" + username
      );
      return response?.data?.data;
    } catch (error) {}
  };
  const {  error:userError } = useQuery({
    queryKey: ["profileData", username],
    queryFn: () => fetchUserData(username),
  });
  console.log(userError)

  const fetchMoreData = async () => {
    console.log("fetch more is working")
    try {
      const response = await api.get(
        "/posts/get-posts?order=desc&page=" + (page) + "&limit=" + 5
      );
      const newPosts = response?.data?.data?.posts;
 
      if (newPosts?.length < 5) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }

      queryClient.setQueryData(["posts"], (oldData: any) => {
        return {
          ...oldData,
          posts: [...(oldData?.posts), ...newPosts],
        };
      });

      // Fetch user data for new posts
      if (username) {
        await fetchUserData(username);
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };
   
 
  return (

    
    <div className=' max-w-3xl mx-auto  mt-20'>
      {
        isLoading && Array.from({ length: 6 }).map((_, index) => {
          return  <div key={index} className="flex flex-row items-center mt-6">
          <div className=" w-[75%]">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-2 w-[200px]" />
            </div>
            <div className="flex w-full justify-between gap-2 mt-1">
              <div className="">
                <div className=" text-xl mt-2 w-full font-semibold line-clamp-2">
                  <Skeleton className="h-3" />
                </div>
                <div className=" mt-2 space-y-1 text-gray-500 text-[14px] line-clamp-2 font-[400]">
                  <Skeleton className="h-2 w-[400px]" />
                  <Skeleton className="h-2 w-[400px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[20%]">
          <Skeleton className="h-[125px] w-[200px] rounded-xl" />
          </div>
        </div>
        })
      }

<InfiniteScroll
        dataLength={data?.posts?.length||5}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={ <div  className="flex flex-row items-center mt-6">
        <div className=" w-[73%]">
          <div className="flex gap-2 items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-2 w-[200px]" />
          </div>
          <div className="flex w-full justify-between gap-2 mt-1">
            <div className="">
              <div className=" text-xl mt-2 w-full font-semibold line-clamp-2">
                <Skeleton className="h-3" />
              </div>
              <div className=" mt-2 space-y-1 text-gray-500 text-[14px] line-clamp-2 font-[400]">
                <Skeleton className="h-2 w-[400px]" />
                <Skeleton className="h-2 w-[400px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[20%]">
        <Skeleton className="h-[125px] w-[200px] rounded-xl" />
        </div>
      </div>
                    }
      >
        {
        data?.posts?.map((post:any,index:number)=>{
         return   <Card {...post} key={index} />
        })
      }



</InfiniteScroll>

    
     
       
    </div>
  )
}

export default Home