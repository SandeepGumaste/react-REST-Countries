import React, { useEffect } from "react";
import Header from "./header";
import { useSelector, useDispatch } from "react-redux";
import { currentTheme } from "../store/selectors/selectors";
import { setTheme } from "../store/reducers/themeReducer";

const Layout = ({ children }: { children: any }) => {
  const darkTheme = useSelector(currentTheme);
  const dispatch = useDispatch();
  useEffect(() => {
    const darkThemeString = localStorage.getItem("darkTheme");
    if (darkThemeString) {
      const theme = JSON.parse(darkThemeString);
      dispatch(setTheme(theme));
    }
  }, [dispatch]);
  return (
    <div
      className={` ${darkTheme ? "bg-gray-800" : "bg-gray-200"}`}
      style={{ minHeight: "100vh" }}
    >
      <div className="fixed z-10">
        <Header />
      </div>
      <div className="pt-24 pb-10">{children}</div>
    </div>
  );
};

export default Layout;
