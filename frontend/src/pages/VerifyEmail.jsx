import React, { useRef, useState } from "react";
import bg from "../assets/bg.png";
import { apiClient } from "../api/Client";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(
        "/api/auth/send-verify-otp",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const otpArray = inputRefs.current.map((el) => el.value);
      const otpValue = otpArray.join("");

      const response = await apiClient.post(
        "/api/auth/verify-account",
        { otp: otpValue },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Account verified successfully");
        setIsOtpSubmitted(true);
        navigate("/");
      } else {
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#ff6767] min-h-screen relative flex items-center justify-center">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-146 text-sm z-10 h-110 flex flex-col justify-center"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Enter the 6-digit code sent to your email id
        </p>
        <div className="flex gap-3 justify-center mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                key={index}
                required
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 bg-gray-700 text-white text-center text-xl rounded-md"
              />
            ))}
        </div>

        <div
          className="flex justify-center items-center mb-4 underline text-blue-700 cursor-pointer"
          onClick={resendOtp}
        >
          <p>Resend Otp</p>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-70 py-3 bg-[#ff6767] text-white rounded-full font-semibold text-xl disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
