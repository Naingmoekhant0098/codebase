import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { token_descrypt } from "@/Services/Decrypt";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { RxCrossCircled } from "react-icons/rx";

import { fetchApi } from "@/api/fetchApi";
import api from "@/api/axios";
import { QueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Select from "react-select";
import tags from "@/lib/tags.json";
 
function Post() {
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
 
  const [content, setContent] = useState("");
  const [progress, setProgress] = useState(0);
  const [short_des, setShortDes] = useState("");
  const [downloadImage, setDownloadImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [newCategory, setNewCategory] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [categories,setCategories] = useState<any>([]); 
  const Fileref = useRef<any>(null);
  const[selectedTags,setSelectedTags] = useState<any>(null)
 const[selectedOptions,setSelectedOptions] = useState<any>(null)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4,5,6, false] }], // Add headers
      [{ font: [] }],
      [{ size: ["small", "normal", "large", "huge"] }],

      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],

      [{ align: [] }],

      ["link", "image"],
      ["clean"], // The 'clean' button will allow clearing the editor
      [{ 'code-block': 'code' }]
    ],
  };

  
  const queryClient = new QueryClient();

  const handleChange = (value: any) => {
    // setEditorValue(value);
    setContent(value);
  };
  useEffect(()=>{
    fetchCategory();

  },[])
  const fetchCategory = async () => {
    try {
      const response = await api.get("category/get-category");
      if (response.status !== 200) {
        toast("Error fetching categories", {
          description: response.data.message,
          position: "top-center",
          action: {
            label: "Close",
            onClick: () => {
              console.log("Closed");
            },
          },
        });
      }
      setCategories(response.data.data.category);
    } catch (error) {}
  };
  // const  {data}  = useQuery({
  //   queryKey: ["category_query"],
  //   queryFn: () => fetchCategory(),
  // });

 

  const createNewCategory = async (categoryName: any) => {
    // Add your update logic here
    try {
      const response = await api.post("/category/create-category", {
        name: categoryName,
      });
      if (response.status !== 200) {
        toast("Error creating category", {
          description: response.data.message,
          position: "top-center",
          action: {
            label: "Close",
            onClick: () => {
              console.log("Closed");
            },
          },
        });
      }
      setCategories([
        ...categories,
        response.data.data.category,
      ]);
      setIsPending(false);
      setIsDialogOpen(false);
      setNewCategory("");
      toast("Created new Category", {
        position: "top-center",
        action: {
          label: "Close",
          onClick: () => {
            console.log("Closed");
          },
        },
      });
      
    } catch (error: any) {
      console.log(error.message);
    }
  };
 
  // const updateMutation = useMutation({
  //   mutationFn: createNewCategory,
  //   onMutate: () => {
  //     const prevProducts = queryClient.getQueryData(["category_query"]);
  //     if (!prevProducts) {
  //       console.log("No cached data found for 'category_query'");
  //     } else {
  //       console.log(prevProducts);
  //     }
  //     setIsPending(true);
  //   },
  //   onError: (err) => {
  //     console.log(err.message);
  //     setIsPending(false);
  //   },
  //   onSuccess: (data) => {
     
  //     // queryClient.setQueryData(['category'], (old:any) =>{
  //     //   console.log(old);
  //     // });
  //     // queryClient.invalidateQueries({ queryKey: ["category"] });

  //     // toast("Created new Category", {
  //     //   position: "top-center",
  //     //   action: {
  //     //     label: "Close",
  //     //     onClick: () => {
  //     //       console.log("Closed");
  //     //     },
  //     //   },
  //     // });
  //     setIsPending(false);
  //     setIsDialogOpen(false);
  //     setNewCategory("");
  //   },
  // onSettled: () => {
  //   queryClient.invalidateQueries({ queryKey: ["category_query"] });
  //   setIsPending(false);
  //   setIsDialogOpen(false);
  //   setNewCategory("");
  // },
  // });


  const selectedHandler=(selectedOption : any , action:any)=>{
    setSelectedOptions(selectedOption)
 const tags = selectedOption.map((item:any) => item.value);
 console.log(tags)
 setSelectedTags(tags);
  }

  console.log(selectedTags)
  const handleCreateCategory = async () => {
  createNewCategory(newCategory);
  };
  const clearAllFields = () => {
    setTitle("");
    setSelectedOption(null)
    
    setContent("");
    setShortDes("");
    setDownloadImage("");
    setProgress(0);
    setSelectedOptions(null)
    setSelectedTags(null)
  };
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
          console.log(progress);
          setProgress(progress);
          // setUploadFileProgress(progress.toFixed(0))
        },
        (error) => {
          console.log(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setDownloadImage(downloadUrl);

            // setUpdateData({ ...updateData, profile: downloadUrl });
          });
        }
      );
    }
  };
  const encryptedToken = localStorage.getItem("access_token");
  const userId = (token_descrypt(encryptedToken) as { id: string })?.id;
  const handlePost = async () => {
    const data = {
      title: title,
      category: selectedOption?.value,
      cover_image: downloadImage,
      description: content,
      short_description: short_des,
      author_id: userId,
      tags : selectedTags
    };
    if (!title ||!short_des ||!content || !downloadImage || !selectedOption.value || selectedTags.length === 0) {
      toast("Post Create Error!", {
        description: "Please Fill All Required Fields!",
        position: "top-center",
        action: {
          label: "Close",
          onClick: () => {
            console.log("Closed");
          },
        },
      });
    }
    setIsLoading(true);
    const responseData = await fetchApi({
      endpoint: "/posts/create-post",
      data,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    setIsLoading(false);
    if (responseData.status !== 200) {
      toast("Error posting", {
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
    if (responseData.status === 200) {
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
      clearAllFields();
    }
  };

  const handleChangeCategory = (selected: any) => {
    if (selected.value === "create_new") {
      setIsDialogOpen(true);
    } else {
      console.log(selected)
      setSelectedOption(selected);
    }
  };

  return (
    <div className=" max-w-3xl md:px-0 px-5   mx-auto pb-20 mt-20">
      <div className=" text-2xl md:text-3xl font-[500] mt-8 text-center">
        Write CodeBase Post
      </div>
      <div className=" flex flex-col gap-4 mt-6 md:mt-8 pb-10">
        <Input
          placeholder="Post header title"
          className="text-sm h-[50px] shadow-none"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select
          onChange={handleChangeCategory}
          className="  text-sm"
          value={selectedOption}
          options={categories&&categories
            ?.map((item: any) => ({
              label: item.name,
              value: item._id,
            }))
            ?.concat({ label: "➕ Create New Topic", value: "create_new" })}
          placeholder="Choose Topic"
          isClearable
        />
        
        {progress > 0 ? (
          <div>
            <div className=" flex items-center gap-2">
              <Progress
                value={progress}
                color="green"
                className=" bg-gray-200 w-[100%] mt-1 h-1.5"
              />
              <div className=" text-[12px] font-[400]">
                {(progress / 100) * 100 + "%"}
              </div>
            </div>
            <div className=" relative">
              <RxCrossCircled
                size={32}
                color=" white"
                className=" absolute top-3 right-3 cursor-pointer"
                onClick={() => {
                  setDownloadImage("");
                  setProgress(0);
                }}
              />
              <img
                src={downloadImage}
                alt=""
                className=" mt-4 w-full h-[20] rounded-sm object-cover"
              />
            </div>
          </div>
        ) : (
          <section className=" w-full mx-auto items-center mt-1">
            <div
              className="max-w-full mx-auto bg-white overflow-hidden items-center"
              onClick={() => Fileref?.current.click()}
            >
              <div className="">
                <div
                  id="image-preview"
                  className="max-w-full p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
                >
                  <input
                    id="upload"
                    type="file"
                    className="hidden"
                    ref={Fileref}
                    onChange={handleFileChange}
                    accept="image/jpg,image/png,image/jpeg"
                  />
                  <label className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-8 h-8 text-gray-700 mx-auto mb-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    <h5 className="mb-2 text-md md:text-lg font-bold tracking-tight text-gray-700">
                      Upload picture
                    </h5>
                    <p className="font-normal text-sm text-gray-400 md:px-6">
                      Choose photo size should be less than{" "}
                      <b className="text-gray-600 text-sm">2mb</b>
                    </p>
                    <p className="font-normal text-sm text-gray-400 md:px-6">
                      and should be in{" "}
                      <b className="text-gray-600 text-sm">JPG, PNG, or GIF</b>{" "}
                      format.
                    </p>
                    <span
                      id="filename"
                      className="text-gray-500 bg-gray-200 z-50"
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          </section>
        )}

        <Textarea
          placeholder="Short Description"
          className=" text-[13px] focus:outline-0 focus:border-0"
          value={short_des}
          onChange={(e) => setShortDes(e.target.value)}
        />


<Select
value={selectedOptions}
    // defaultValue={[colourOptions[2], colourOptions[3]]}
    isMulti
    name="colors"
    options={tags}
    className="basic-multi-select font-[12px]"
    classNamePrefix="select"
    onChange={selectedHandler}
  />

        <ReactQuill
          theme="snow"
          modules={modules}
          value={content}
          onChange={handleChange}
          ref={quillRef}
        />

        <div className="flex space-x-3 justify-end">
          <Button size={"lg"} variant="outline" onClick={clearAllFields}>
            Clear
          </Button>

          <Button
            size={"lg"}
            onClick={handlePost}
            disabled={
              !downloadImage || !title || !selectedOption.value || !content || !short_des
            }
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Create
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Enter new category name..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button disabled={isPending} onClick={handleCreateCategory}>
              {isPending && <Loader2 className="animate-spin" />}
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Post;
