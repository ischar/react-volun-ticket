import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API } from "../utils/config";
import { loginSuccess } from "../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    axios
      .post(
        `${API.LOGIN}`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // JSON 요청을 명시
          },
        }
      )
      .then((res) => {
        dispatch(loginSuccess(res.data));
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert(error.data);
      });
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-items-center text-center text-2xl font-semibold dark:text-white">
      <div className="relative w-full itmes-center justify-items-center">
        <div className="mt-40 w-[480px] h-80 rounded-2xl bg-light-card dark:bg-dark-card">
          <h2 className="text-2xl font-bold pt-12 text-light-primaryText dark:text-dark-primaryText">
            volunTicket
          </h2>
          <form className="text-lg mt-12 space-y-2 mx-20 text-light-primaryText dark:text-dark-primaryText">
            <div className="flex justify-between items-center">
              <label>이메일</label>
              <input
                type="text"
                value={email}
                className="pl-4 py-1 bg-light-input dark:bg-dark-input rounded-md"
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="mr-4">비밀번호</label>
              <input
                type="password"
                value={password}
                className="pl-4 py-1 bg-light-input dark:bg-dark-input rounded-md"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="mt-4 bg-dark-activeMenu w-80 py-1 rounded-md"
                onClick={handleLogin}
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
