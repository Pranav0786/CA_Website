import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { auth, db } from "../../../firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

// ✅ Import your logo
import caLogo from "../../../assets/image.png"; // <-- adjust path to your logo

const Navbar = ({ setActiveComponent }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  // ✅ Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, "charteredAccountant", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          const q = query(
            collection(db, "charteredAccountant"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            setProfile(querySnapshot.docs[0].data());
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-black/80 via-gray-900/80 to-black/90 backdrop-blur-xl border-r border-white/10 p-6 shadow-lg flex flex-col">
      {/* ✅ Logo & App Title */}
      <div
        className="flex items-center space-x-3 cursor-pointer mb-10"
        onClick={() => navigate("/")} // ✅ Redirect to home
      >
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400 shadow-lg">
          <img
            src={caLogo}
            alt="CA Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-2xl font-extrabold text-white tracking-wide">
          CA Hub
        </span>
      </div>

      {/* Navigation Links */}
      <ul className="flex-1 flex flex-col gap-4">
        <li
          className="text-violet-400 text-lg font-medium flex items-center gap-3 p-3 cursor-pointer hover:bg-white/10 hover:text-violet-300 rounded-lg transition-all"
          onClick={() => setActiveComponent("dashboard")}
        >
          <i className="fas fa-tachometer-alt text-xl"></i> Dashboard
        </li>
        <li
          className="text-violet-400 text-lg font-medium flex items-center gap-3 p-3 cursor-pointer hover:bg-white/10 hover:text-violet-300 rounded-lg transition-all"
          onClick={() => setActiveComponent("accounting")}
        >
          <i className="fas fa-calculator text-xl"></i> Accounting
        </li>
        <li
          className="text-violet-400 text-lg font-medium flex items-center gap-3 p-3 cursor-pointer hover:bg-white/10 hover:text-violet-300 rounded-lg transition-all"
          onClick={() => setActiveComponent("taxation")}
        >
          <i className="fas fa-receipt text-xl"></i> Taxation
        </li>
        <li
          className="text-violet-400 text-lg font-medium flex items-center gap-3 p-3 cursor-pointer hover:bg-white/10 hover:text-violet-300 rounded-lg transition-all"
          onClick={() => setActiveComponent("audits")}
        >
          <i className="fas fa-file-signature text-xl"></i> Audits
        </li>
      </ul>

      {/* Profile Section */}
      <div className="relative">
        <div
          className="cursor-pointer flex items-center gap-2 text-violet-400 hover:text-violet-300"
          onClick={() => setShowProfile(!showProfile)}
        >
          <i className="fas fa-user-circle text-2xl"></i>
          <span className="text-sm">{profile?.name || "Profile"}</span>
        </div>

        {showProfile && (
          <div className="absolute bottom-12 left-0 w-64 bg-gray-900 border border-white/10 rounded-lg shadow-xl p-4 text-white z-50">
            <h3 className="text-lg font-semibold mb-2 text-violet-300">
              Profile
            </h3>

            {profile ? (
              <>
                <p>
                  <span className="font-medium">Name:</span> {profile.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {profile.email}
                </p>
                <p>
                  <span className="font-medium">Mobile:</span> {profile.mobile}
                </p>
              </>
            ) : (
              <p className="text-gray-400">No profile found</p>
            )}

            <button
              onClick={handleLogout}
              className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Navbar;
