import React from "react";
import { useEffect, useState } from "react";
import { ReactComponent as WriteIcon } from "../assets/icons/write.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API } from "../utils/config";
import axios from "axios";

export default function MainPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("VOLUNTEER");
  const [posts, setPosts] = useState();
  const { userInfo } = useSelector((state) => state.user);

  const handleWrite = () => {
    navigate("/write");
  };

  const handleDelete = (id) => {
    try {
      axios.delete(`${API.POST}/posts/${id}`, { withCredentials: true });

      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const postList = async () => {
    try {
      console.log(`${API.POST}/posts/${category.toLowerCase()}`);
      const response = await axios.get(
        `${API.POST}/posts/${category.toLowerCase()}`,
        { params: { email: userInfo.email }, withCredentials: true }
      );
      setPosts(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    postList();
  }, [category]);

  return (
    <div className="h-full w-full flex flex-col text-2xl font-semibold text-light-primaryText dark:text-dark-primaryText">
      <div className="relative mt-8 w-full h-full">
        <div className="w-[1140px] h-full mx-auto bg-light-card dark:bg-dark-card rounded-3xl">
          <div className="pt-8 px-12 flex flex-row w-full h-18 justify-between">
            <select
              value={category}
              onChange={handleCategoryChange}
              className="block py-2.5 w-28 text-sm  bg-transparent appearance-none text-light-placeholderText dark:text-dark-placeholderText dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="VOLUNTEER">봉사</option>
              <option value="PERFORMANCE">공연</option>
            </select>
            <WriteIcon
              className="w-10 h-10 py-2 text-light-primaryText dark:text-dark-primaryText"
              onClick={handleWrite}
            />
          </div>
          <div className="px-12 mt-8">
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between my-4 py-2 border-b-[0.75px] border-light-border dark:border-dark-border"
                >
                  <div className="flex flex-row text-sm">
                    <p className="mr-8">{index + 1}</p>
                  </div>
                  <p className="text-sm">{post.title}</p>

                  <div className="flex flex-row text-sm">
                    <p>마감일: {post.recruitmentPeriod}</p>
                    <p className="mx-8">
                      인원수: {post.currentParticipants}/{post.maxParticipants}
                    </p>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="py-1 px-2 bg-dark-activeMenu rounded-md"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg">게시물이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
