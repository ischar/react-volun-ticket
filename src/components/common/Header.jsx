import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <div className="flex flex-row w-full h-full items-center justify-between text-light-fg-black dark:text-white">
      <div className="w-full h-full flex items-center">
        <img
          className="w-12 h-12 ml-[40px] hover:opacity-75 transition-opacity ease-in-out duration-300"
          src={logo}
          alt="logo"
        />
        <div className="flex flex-row ml-[50px] text-sm"></div>
      </div>
    </div>
  );
}
