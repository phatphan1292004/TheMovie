import React, { useState } from "react";
import OTPInput from "../components/input/OTPInput";
import Button2 from "../components/button/Button2";
import useSignupStore from "../store/useSignupStore";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../axios/axiosClient";

const OtpPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { otp, setOtp, formData, reset } = useSignupStore();
  const email = state ? state.email : formData.email;
  const mode = state?.mode;

  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (otp.length < 6) {
      toast.error("Vui lòng nhập đầy đủ mã OTP");
      return;
    }

    try {
      const res = await axiosClient.post("/verify-otp", {
        email,
        otp,
      });

      if (res.status === 200) {
        toast.success("Xác thực OTP thành công!");

        if (mode === "forgot-password") {
          setShowNewPasswordForm(true); // Hiện form đổi mật khẩu
        } else {
          await axiosClient.post("/sign-up", formData);
          reset();
          navigate("/login");
        }
      }
    } catch (error) {
      toast.error("Mã OTP không đúng hoặc đã hết hạn.");
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }

    try {
      const res = await axiosClient.post("/reset-password", {
        email,
        newPassword,
      });

      if (res.status === 200) {
        toast.success(res.data.message); 
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi đặt lại mật khẩu");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[350px]">
        {!showNewPasswordForm ? (
          <>
            <h2 className="text-white text-center text-lg font-semibold mb-4">
              Nhập mã OTP
            </h2>
            <OTPInput length={6} onChange={setOtp} />
            <Button2
              onClick={handleSubmit}
              className="block mx-auto w-[200px] h-[50px] mt-4"
            >
              Xác nhận mã OTP
            </Button2>
          </>
        ) : (
          <>
            <h2 className="text-white text-center text-lg font-semibold mb-4">
              Đặt lại mật khẩu
            </h2>
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white mb-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button2
              onClick={handleChangePassword}
              className="block mx-auto w-[200px] h-[50px]"
            >
              Đổi mật khẩu
            </Button2>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpPage;
