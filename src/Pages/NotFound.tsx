import { TbError404 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { currentTheme } from "../store/selectors/selectors";

const NotFound = () => {
  const darkTheme = useSelector(currentTheme);
  return (
    <div
      className={`flex flex-col justify-center items-center h-96 text-9xl ${
        darkTheme ? "text-white" : "text-gray-900"
      }`}
    >
      <TbError404 />
      <p className="mt-5 text-5xl font-bold">Not Found</p>
    </div>
  );
};

export default NotFound;
