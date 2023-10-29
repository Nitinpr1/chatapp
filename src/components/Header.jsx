import chat from "../assets/chat.png";
const Header = () => {
  return (
    <header className="fixed top-0 w-full z-10">
      <nav className="flex justify-between p-4 rounded-xl shadow-md bg-inherit border-b-2">
        <h1 className="text-2xl font-extrabold text-indigo-800 flex gap-2 justify-center items-center">
          {" "}
          <img src={chat} width={40} alt="chat app" />
          ChatApp
        </h1>
        <p className="text-slate-900 m-2">en</p>
      </nav>
    </header>
  );
};

export default Header;
