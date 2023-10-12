import { useMutation } from "@tanstack/react-query";
import { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginService } from "../Services/AuthService";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";
const Login = () => {
  const navigate = useNavigate();
  //!Props

  //! State
  const { dispatch } = useContext(authContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const mutateLogin = useMutation({ mutationFn: () => LoginService(formData) });
  //! Function
  const handleInputChange = useCallback((e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }, []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await mutateLogin.mutateAsync();
        const { status, message } = response?.data;
        if (!status) {
          throw new Error(message);
        }

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: response?.data?.data,
            token: response?.data?.token,
            role: response?.data?.role,
          },
        });
        toast.success(message);
        navigate("/home");
        console.log("jkanjds", response);
      } catch (error) {
        console.log("error", error);
        toast.error(error.message);
      }
    },
    [formData]
  );
  //! Effect

  //! Render
  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello <span className="text-primaryColor">Welcome</span> Back 🎉
        </h3>
        <form className="py-4 md:py-0" onSubmit={handleLogin}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full  py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password..."
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>

          <div className="mt-7">
            <button
              disabled={mutateLogin.isLoading && true}
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {mutateLogin.isLoading ? (
                <HashLoader size={25} color="#ffffff" />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            {`Don't have an account? `}
            <Link
              to={"/register"}
              className="text-primaryColor font-medium ml-1"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
