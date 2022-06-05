import { useSelector, useDispatch } from "react-redux";
import { currentTheme } from "../store/selectors/selectors";
import { toggleTheme } from "../store/reducers/themeReducer";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const darkTheme = useSelector(currentTheme);
  useEffect(() => {
    const darkString = localStorage.getItem("darkTheme");
    if (!darkString) {
      localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`flex justify-center px-8 py-3 h-20 shadow-md ${
        darkTheme ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
      }`}
      style={{ width: "100vw" }}
    >
      <div
        className="w-full flex justify-between items-center"
        style={{ maxWidth: "1400px" }}
      >
        <div
          className="font-bold text-xl md:text-2xl cursor-pointer"
          onClick={() => {
            if (window.location.pathname !== "/") {
              window.location.replace("/");
            }
          }}
        >
          Where in the world ?
        </div>
        <div
          onClick={() => {
            if (darkTheme) {
              dispatch(toggleTheme("light"));
              localStorage.setItem("darkTheme", JSON.stringify(false));
            } else {
              dispatch(toggleTheme("dark"));
              localStorage.setItem("darkTheme", JSON.stringify(true));
            }
          }}
          className="flex items-center md:text-lg cursor-pointer"
        >
          {darkTheme ? (
            <IoSunny className="mr-3 w-5 h-5" />
          ) : (
            <IoMoon className="mr-3 w-4 h-4" />
          )}

          <p>{darkTheme ? "Light mode" : "Dark mode"}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
