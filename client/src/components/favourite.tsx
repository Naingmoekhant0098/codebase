import api from '@/api/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React,{useCallback} from 'react'
import CardTwo from './cartTwo';
import { Skeleton } from './ui/skeleton';
 
interface postProp {
  postId: string;
  
}
function Favourite({postId }: postProp) {
    
 
   
  const queryClient=useQueryClient();
   
    const fetchSinglePost = async () => {
        try {
          const response = await api.get(
            "/posts/get-single-post?id="+postId
          );

          console.log(response);
        
         
         return response.data.data.post;
        } catch (error) {
          console.log(error);
        }
      };
    
      const { isLoading, data  } = useQuery({
        queryKey: ["single-post",postId],
        queryFn: () => fetchSinglePost(),
      });
 

       
     
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
          const previousTodos = queryClient.getQueryData(["single-post",newTodo.postId]);
         
          if (previousTodos) {
                  queryClient.setQueryData(["single-post",newTodo.postId], (old: any) => {
                
                    const updatedPosts = old?.post?.likes?.includes(newTodo.userId)
                      ? old?.post?.likes?.filter((pt: string) => pt !== newTodo.userId)
                      : [...old?.post?.likes, newTodo.userId];
                     
                    //const isLiked = old?.post?.likes?.includes(newTodo.userId);
                    // if (isLiked) {
                    //   toast.success("Post unliked");
                    // } else {
                    //   toast.success("Post liked");
                    // }
                    return {
                      ...old,
                      post: {
                        ...old.post,
                        likes: updatedPosts,
                      },
                    };
                  });
                }

                console.log(previousTodos)
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
     
        
     
if(isLoading){
    return (
        <div>
        <Skeleton className="h-[200px]  mt-3 w-[300px]" />
        <div className="flex gap-2 mt-3 items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-2 w-[200px]" />
        </div>
        <div className="flex w-full justify-between gap-2 mt-1">
          <div className="">
            <div className=" text-xl mt-2 w-full font-semibold line-clamp-2">
              <Skeleton className="h-3" />
            </div>
            <div className=" mt-3 space-y-1 text-gray-500 text-[14px] line-clamp-2 font-[400]">
              <Skeleton className="h-2 w-[300px]" />
              <Skeleton className="h-2 w-[300px]" />
            </div>
            <div className=" mt-3 flex justify-between items-center text-gray-500 text-[14px] line-clamp-2 font-[400]">
              <Skeleton className="h-2 w-20" />
              <Skeleton className="h-2 w-20" />
            </div>
          </div>
        </div>
      </div>
    )
}
  return (
    <CardTwo {...data} handleLike={handleLike}   />
  )
}

export default React.memo(Favourite);