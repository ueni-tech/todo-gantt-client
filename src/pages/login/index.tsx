import { NEXT_PUBLIC_BACKEND_API_URL } from "@/env";
import axios from "axios";
import React, { useState, FormEvent, FC, ChangeEvent } from "react";

const login: FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, formData);
      if (response.status !== 200) {
        console.error("ログインに失敗しました");
      } else {
        //成功したら、トークンを保存
          localStorage.setItem("token", response.data.access_token);
          alert("ログインに成功しました");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  );
};

export default login;