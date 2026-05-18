import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  getAllPosts,
} from "../../../config/redux/action/postAction";
import {
  getAboutUser,
  getAllUsers,
} from "../../../config/redux/action/authAction";
import UserLayout from "@/layout/UserLayout/UserLayout";
import DashboardLayout from "@/layout/DashboardLaout";
import { BASE_URL } from "../../../config";

import style from "./index.module.css";

function Dashboard() {
  const dispatch = useDispatch();

  const [postContent, setPostContent] = useState("");
  const [fileContent, setFileContent] = useState();

  const handlePostUpload = async () => {
    await dispatch(
      createPost({
        body: postContent,
        file: fileContent,
      }),
    );

    setPostContent("");
    setFileContent(null);
  };

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isTokenThere) {
      const token = localStorage.getItem("token");
      dispatch(getAllPosts());
      dispatch(getAboutUser({ token: token }));
    }
    if (!authState.all_profile_fetched) {
      dispatch(getAllUsers());
    }
  }, [authState.isTokenThere]);

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={style.scrollContainer}>
          <div className={style.createPostContainer}>
            <img
              className={style.userProfile}
              src={`${BASE_URL}/${authState.user?.userId?.profilePicture}`}
              alt=""
              width={50}
            />
            <textarea
              value={postContent}
              onChange={(e) => {
                setPostContent(e.target.value);
              }}
              className={style.textAreafield}
              name=""
              placeholder="Write your post"
              id=""
            ></textarea>
            <label htmlFor="fileUpload">
              <div className={style.fabButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </label>
            <input
              value={fileContent}
              onChange={(e) => {
                setFileContent(e.target.files[0]);
              }}
              type="file"
              name=""
              id="fileUpload"
              hidden
            />
            {postContent.length > 0 && (
              <div
                onClick={() => {
                  handlePostUpload();
                }}
                className={style.postContentButton}
              >
                Post
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}

export default Dashboard;
