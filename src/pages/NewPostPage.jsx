import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/config";
import deleteButton from "../assets/icons/delete-image.png";
import DatePicker from "react-datepicker";
import axios from "axios";

export default function NewPostPage() {
  const { userInfo } = useSelector((state) => state.user);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("VOLUNTEER");
  const [date, setDate] = useState();
  const [maxParticipants, setMaxParticipants] = useState();
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    if (imagePreviews.length >= 1) {
      alert("이미지는 하나만 업로드 가능합니다.");
      return;
    }
    const files = Array.from(event.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDeleteImage = (urlToDelete) => {
    const indexToDelete = imagePreviews.findIndex(
      (previewUrl) => previewUrl === urlToDelete
    );

    if (indexToDelete !== -1) {
      setImagePreviews((prevPreviews) =>
        prevPreviews.filter((_, index) => index !== indexToDelete)
      );
      setImages((prevImages) =>
        prevImages.filter((_, index) => index !== indexToDelete)
      );
    }
  };

  const handleDate = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\. /g, '.').slice(0, -1);

    setDate(formattedDate);
  }

  const handleSubmit = async (event) => {
    if (title === "") alert("제목을 입력하세요.");
    else if (content === "") alert("글을 입력하세요.");

    alert(date);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("user", userInfo.email);
    formData.append("maxParticipants", maxParticipants);
    formData.append("recruitmentPeriod", date);
    formData.append("images", images[0]);

    try {
      axios.post(`${API.POST}/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigate(-1);
    }
  };

  return (
    <div className="flex mx-28 mt-8 w-full bg-light-card dark:bg-dark-card rounded-3xl">
      <div className="mx-10 w-full h-full">
        <div className="flex flex-row mt-4">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-row mx-4">
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="block py-2.5 w-28 text-sm  bg-transparent appearance-none text-light-placeholderText dark:text-dark-placeholderText dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value="VOLUNTEER">봉사</option>
                <option value="PERFORMANCE">공연</option>
              </select>
              <input
                placeholder="제목을 입력하세요."
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent outline-none text-light-placeholderText dark:text-dark-placeholderText font-medium text-lg focus:border-b-0.5"
              />
              <div className="flex flex-row justify-center items-center dark:text-dark-primaryText">
                <label
                  htmlFor="date"
                  className="w-20 dark:text-dark-menuText font-medium"
                >
                  마감 날짜
                </label>
                <div>
                  <DatePicker
                    className="bg-transparent text-light-menuText dark:text-dark-menuText w-24 mr-8"
                    dateFormat="yyyy.MM.dd"
                    shouldCloseOnSelect
                    selected={date}
                    onChange={(date) => handleDate(date)}
                  />
                </div>
                <label
                  htmlFor="date"
                  className="w-20 dark:text-dark-menuText font-medium"
                >
                  전체 인원 수
                </label>
                <input
                  type="number"
                  placeholder="0"
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  className="w-10 ml-4 bg-transparent focus:outline-none "
                />
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <textarea
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요."
                className="w-full h-[448px] p-6 outline-none bg-light-input dark:bg-dark-input text-light-primaryText dark:text-dark-primaryText border-gray-400 border-0.5 rounded-3xl"
              ></textarea>
              <div className="flex flex-row justify-between h-10 w-full">
                <div className="h-10 mt-2">
                  <h3 className="text-sm font-medium text-light-menuText dark:text-dark-menuText">
                    이미지 미리보기
                  </h3>
                  <div className="flex flex-row">
                    {imagePreviews.map((previewUrl, index) => (
                      <div className="flex flex-row mr-8">
                        <img
                          key={index}
                          src={previewUrl}
                          alt={`Preview ${index}`}
                          className="w-24 h-20 py-2 pl-2"
                          style={{ maxWidth: "100%", maxHeight: "150px" }}
                        />
                        <img
                          src={deleteButton}
                          onClick={() => handleDeleteImage(previewUrl)}
                          alt="Remove"
                          className="w-4 h-4"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row mt-10">
                  <label className="cursor-pointer">
                    <span className="inline-block px-2 py-2 dark:bg-dark-input text-light-primaryText dark:text-dark-menuText rounded-md">
                      이미지 업로드
                    </span>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e)}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                  <button
                    type="submit"
                    className="ml-1 font-semibold bg-light-colorCard dark:bg-dark-colorCard w-12 h-10 text-light-primaryText rounded-md"
                  >
                    작성
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
