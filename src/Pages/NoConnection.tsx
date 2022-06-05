import { MdErrorOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { currentTheme } from "../store/selectors/selectors";

const NoConnection = () => {
  const darkTheme = useSelector(currentTheme);
  return (
    <div
      className={`flex flex-col justify-center items-center h-96 text-9xl ${
        darkTheme ? "text-white" : "text-gray-900"
      }`}
    >
      <MdErrorOutline />
      <p className="mt-5 text-xl font-bold text-center px-8">
        Unable to fetch data.
        <br />
        Please check your internet connection and try again
      </p>
    </div>
  );
};

export default NoConnection;
