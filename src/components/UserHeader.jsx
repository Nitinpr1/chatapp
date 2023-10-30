import { LogOut } from "react-feather";
import { User } from "react-feather";
import { useAuth } from "../utils/AuthContext";

const UserHeader = () => {
  const { user, handleUserLogOut } = useAuth();

  return (
    <div className="px-4 py-4 rounded-md bg-opacity-40 border-2 md:w-2/3 w-full sticky top-0 inset-x-4 bg-slate-100">
      {user ? (
        <div className="flex justify-between">
          <h1 className="text-xl flex gap-3 font-bold text-indigo-500">
            <User /> {user.name}
          </h1>
          <LogOut
            className="text-indigo-500 hover:text-red-600 cursor-pointer"
            onClick={handleUserLogOut}
          />
        </div>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
};

export default UserHeader;
