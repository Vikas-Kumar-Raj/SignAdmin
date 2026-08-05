import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaPen,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, admin } = response.data;

      // Remember checked = localStorage
      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("admin", JSON.stringify(admin));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("admin", JSON.stringify(admin));
      }

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <header className="w-full py-6 px-5">
        <div className=" flex flex-col justify-center items-center gap-2">

          <div className="text-xl font-bold leading-none flex items-center">
            <FaPen className="mr-1" />

            SignAdmin
          </div>

          <p className="text-[10px] tracking-widest text-gray-500 uppercase">
            Enterprise Console
          </p>

        </div>
      </header>

      {/* Login */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">

        <div className="w-full max-w-[430px] border border-gray-200 rounded-lg shadow-sm p-5 sm:p-7 md:p-10">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Welcome Back
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Please enter your credentials to access the admin workspace.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700 mb-1.5"
              >
                Administrator Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                autoComplete="email"
                className="w-full h-11 border border-gray-300 rounded-md px-3 text-sm outline-none focus:border-gray-900 transition"
              />

            </div>

            {/* Password */}
            <div>

              <div className="flex items-center justify-between mb-1.5">

                <label
                  htmlFor="password"
                  className="text-xs font-medium text-gray-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-blue-600 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-11 border border-gray-300 rounded-md px-3 pr-11 text-sm outline-none focus:border-gray-900 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />

              <label
                htmlFor="remember"
                className="text-xs text-gray-600 cursor-pointer"
              >
                Remember this device for 30 days
              </label>

            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2.5 rounded-md">
                {error}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-black hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-md text-sm font-medium flex items-center justify-center gap-2 transition cursor-pointer"
            >

              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In to Console
                  <FaArrowRight className="text-xs" />
                </>
              )}

            </button>

          </form>

        </div>

      </section>

      {/* Footer */}
      <footer className="py-6 px-4">

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-[10px] text-gray-400">

          <span>
            © PROTECTED BY AES-256 ENCRYPTION
          </span>

          <div className="flex flex-wrap justify-center gap-4">

            <button className="hover:text-gray-700 cursor-pointer">
              Privacy Policy
            </button>

            <button className="hover:text-gray-700 cursor-pointer">
              Terms of Service
            </button>

            <button className="hover:text-gray-700 cursor-pointer">
              Support
            </button>

          </div>

        </div>

      </footer>
    </main>
  );
};

export default Login;