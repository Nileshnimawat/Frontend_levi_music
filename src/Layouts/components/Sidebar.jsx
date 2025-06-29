import { RiAdminFill, RiHome5Fill, RiRegisteredFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { PiBroadcastBold, PiPlaylistBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import liked from "/liked.png";
import reactsvg from "../../assets/react.svg";
import { setCurrentSource } from "@/store/musicSlice";

import AddPlayListDialog from "@/pages/Admin/components/AddPlayListDialog";
import { handleLogout } from "@/hooks/useAuth";
import { LogIn, LogOut } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state?.user?.user);
  const likedSongs = useSelector((state) => state?.music?.likedMusics);
  const allPlaylists = useSelector((state) => state?.playlist?.playlists);
  const likedPlaylistIds =
    useSelector((state) => state?.user?.user?.liked_playlist) || [];

  const currentSong = likedSongs?.[0];

  const handleNavigation = () => {
    navigate("/");
  };

  const handlePlaylist = (playlist) => {
    navigate(`/playlist/${playlist._id}`);
  };

  const handleLikedPlaylist = () => {
    dispatch(setCurrentSource("liked"));
    navigate("/LikedPlayList");
  };

  return (
    <div className=" sm:pr-2 rounded-md h-full bg-[#212121] text-gray-400 ">
      <div
        style={{
          background: "rgba(18, 18, 18, 0.30)",
          backdropFilter: "blur(74px)",
          WebkitBackdropFilter: "blur(74px)",
        }}
        className="flex relative overflow-y-auto hide-scrollbar h-full"
      >
        <aside
          className={`text-whiteflex flex-col transition-all duration-300 rounded-xl min-h-full ${
            isOpen
              ? "w-[220px] sm:w-[270px]  p-5 "
              : " items-center  sm:block hidden   lg:w-24 p-1 pt-5 "
          }`}
        >
          {/* Toggle Button */}
          {
            <div
              className={` mb-3 hidden sm:flex ${
                !isOpen ? " items-center justify-center " : ""
              }`}
            >
              <button
                className="text-white p-3 focus:outline-none bg-zinc-800 rounded-full hover:bg-gray-700 transition"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FaBars className="text-md md:text-2xl" />
              </button>
            </div>
          }

          <div
            className={`flex flex-col gap-1 border-b border-gray-600 pb-3 w-full ${
              !isOpen ? "items-center" : "items-start"
            }`}
          >
            {/* Home */}
            <button
              onClick={handleNavigation}
              className="flex items-center gap-4 px-4 py-2 w-full hover:border-r-green-500 hover:border-r-8  transition duration-200 rounded-md text-gray-300"
            >
              <div className="w-6  flex justify-center">
                <RiHome5Fill className="text-2xl hover:text-[#1DB954]" />
              </div>
              {isOpen && <span className="text-lg">Home</span>}
            </button>

            {/* Playlists */}
            <button
              onClick={handleNavigation}
              className="flex items-center gap-4 px-4 py-2 w-full hover:bg-[#1db9541a] transition duration-200 rounded-md text-gray-300"
            >
              <div className="w-6 min-w-[24px] flex justify-center">
                <PiPlaylistBold className="text-2xl" />
              </div>
              {isOpen && <span className="text-lg">Playlists</span>}
            </button>

            {isOpen && loggedInUser && (
              <button
                onClick={() => handleLogout(dispatch)}
                className="flex items-center gap-4 px-4 py-2 w-full hover:bg-[#1db9541a] transition duration-200 rounded-md text-gray-300"
              >
                <div className="w-6 min-w-[24px] flex justify-center">
                  <LogOut className="text-2xl" />
                </div>
                {isOpen && <span className="text-lg">Logout</span>}
              </button>
            )}

            {isOpen && !loggedInUser && (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-4 px-4 py-2 w-full hover:bg-[#1db9541a] transition duration-200 rounded-md text-gray-300"
              >
                <div className="w-6 min-w-[24px] flex justify-center">
                  <LogIn className="text-2xl" />
                </div>
                {isOpen && <span className="text-lg">Login</span>}
              </button>
            )}

            {isOpen && !loggedInUser && (
              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-4 px-4 py-2 w-full hover:bg-[#1db9541a] transition duration-200 rounded-md text-gray-300"
              >
                <div className="w-6 min-w-[24px] flex justify-center">
                  <RiRegisteredFill className="text-2xl" />
                </div>
                {isOpen && <span className="text-lg">Register</span>}
              </button>
            )}

            {isOpen && loggedInUser && (
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-4 px-4 py-2 w-full hover:bg-[#1db9541a] transition duration-200 rounded-md text-gray-300"
              >
                <div className="w-6 min-w-[24px] flex justify-center">
                  <RiAdminFill className="text-2xl" />
                </div>
                {isOpen && <span className="text-lg">Admin</span>}
              </button>
            )}

            {isOpen && loggedInUser && (
              <button
                onClick={() => navigate("/room")}
                className="flex items-center gap-4 px-4 py-2 w-full hover:bg-[#1db9541a] transition duration-200 rounded-md text-gray-300"
              >
                <div className="w-6 min-w-[24px] flex justify-center">
                  <PiBroadcastBold className="text-2xl" />
                </div>
                {isOpen && <span className="text-lg">Room</span>}
              </button>
            )}
          </div>

          {/* Liked Playlist & User Playlists */}
          <div
            className={`flex flex-col gap-1 h-full overflow-y-auto hide-scrollbar ${
              isOpen ? "block" : ""
            }`}
          >
            {/* === Library Section Header === */}
            {isOpen && (
              <h2 className="text-sm text-gray-400 font-semibold uppercase px-3 pt-4">
                Your Library
              </h2>
            )}

            {/* === Liked Playlist === */}
            {loggedInUser && (
              <button
                onClick={handleLikedPlaylist}
                className="flex gap-2 w-full pl-3 pr-2 py-2 hover:bg-[#1F1F1F] rounded-md transition duration-200 items-center"
              >
                <img
                  src={liked}
                  alt="Liked Playlist"
                  className={`w-10 h-10 object-cover ${
                    !isOpen ? "rounded-xl" : "rounded-md"
                  }`}
                />
                {isOpen && (
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-semibold  truncate">
                      Liked Playlist
                    </p>
                    <p className="text-xs  text-gray-400 truncate">
                      {likedPlaylistIds.length} songs
                    </p>
                  </div>
                )}
              </button>
            )}

            {/* === Playlists Section Header === */}
            {isOpen && loggedInUser && (
              <div className="flex items-center justify-between px-3 mt-1">
                <h2 className="text-sm text-gray-400 font-semibold uppercase">
                  Playlists
                </h2>

                <AddPlayListDialog />
              </div>
            )}

            {/* === User Playlists === */}
            <div className="flex flex-col gap-1  px-2">
              {loggedInUser &&
                allPlaylists?.length > 0 &&
                allPlaylists.map((playlist) => (
                  <button
                    key={playlist._id}
                    onClick={() => handlePlaylist(playlist)}
                    className="flex gap-3 items-center justify-start w-full hover:bg-[#1F1F1F] px-1 py-2 rounded-md transition"
                  >
                    <img
                      src={playlist?.coverImage || reactsvg}
                      alt={playlist?.title}
                      className={`w-8 h-8 md:w-10 md:h-10 object-cover ${
                        isOpen ? "rounded-xl" : "rounded-md"
                      }`}
                    />
                    {isOpen && (
                      <div className="flex flex-col justify-center">
                        <p className="text-sm font-semibold truncate">
                          {playlist.title}
                        </p>
                      </div>
                    )}
                  </button>
                ))}

              {/* === No Playlist Message === */}
              {loggedInUser && allPlaylists?.length === 0 && (
                <p className="text-sm text-gray-400 px-3 mt-2">
                  No playlists found.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
