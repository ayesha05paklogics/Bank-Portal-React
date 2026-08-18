
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import defaultUser from "../assets/default-user.png";

function EditProfile() {
  const navigate = useNavigate();

  // Current logged-in user
  const [currentUser, setCurrentUser] =
    useState(null);

  // Form fields
  const [name, setName] = useState("");

  // Profile image
  const [profileImage, setProfileImage] =
    useState(defaultUser);

  // --------------------------------
  // GET USER DATA
  // --------------------------------

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    setCurrentUser(loggedInUser);
    setName(loggedInUser.name || "");

    // Get saved profile image
    const imageKey =
      "profileImage_" +
      loggedInUser.email;

    const savedImage =
      localStorage.getItem(imageKey);

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, [navigate]);

  // --------------------------------
  // IMAGE UPLOAD
  // --------------------------------

  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const maxSize =
      1.5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert(
        "Image is too large. Please choose an image under 1.5MB."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      setProfileImage(
        event.target.result
      );
    };

    reader.readAsDataURL(file);
  }


  function handleSaveProfile(e) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const userIndex =
      users.findIndex(
        (user) =>
          user.email ===
          currentUser.email
      );

    if (userIndex === -1) {
      alert("User account not found.");
      return;
    }

    // Update user inside users array
    users[userIndex] = {
      ...users[userIndex],
      name: name.trim(),
      profileImage: profileImage,
    };

    // Save updated users
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    // Update logged-in user
    const updatedLoggedInUser = {
      ...currentUser,
      name: name.trim(),
      profileImage: profileImage,
    };

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(
        updatedLoggedInUser
      )
    );

    // Save profile image separately
    const imageKey =
      "profileImage_" +
      currentUser.email;

    localStorage.setItem(
      imageKey,
      profileImage
    );

    setCurrentUser(
      updatedLoggedInUser
    );

    alert(
      "Profile updated successfully."
    );

    navigate("/dashboard");
  }

  

  function handleLogout() {
    localStorage.removeItem(
      "loggedInUser"
    );

    navigate("/login");
  }


  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f9ff]">

      {/* Header */}

      <header className="border-b border-[#d9e8f5] bg-white">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">

          <div>

            <h1 className="text-2xl font-bold text-[#263238] sm:text-3xl">
              Edit Profile
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update your profile information.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard")
            }
            className="rounded-lg border border-[#d9e8f5] px-4 py-2.5 text-sm font-medium text-[#195fd7] hover:bg-[#eef6ff]"
          >
            Dashboard
          </button>

        </div>

      </header>

      {/* Main */}

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8">

        <div className="rounded-2xl border border-[#d9e8f5] bg-white p-6 shadow-sm sm:p-8">

          <form
            onSubmit={handleSaveProfile}
            className="mx-auto max-w-2xl"
          >

            {/* Profile Image */}

            <div className="mb-8 text-center">

              <div className="relative mx-auto h-32 w-32">

                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-[#eef6ff] object-cover"
                />

                <label
                  htmlFor="profileImage"
                  className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#195fd7] text-xl font-bold text-white shadow-md hover:bg-[#0d47a1]"
                  title="Change profile picture"
                >
                  +
                </label>

              </div>

              <input
                type="file"
                id="profileImage"
                accept="image/*"
                hidden
                onChange={
                  handleImageUpload
                }
              />

              <p className="mt-3 text-sm text-gray-500">
                Upload a profile picture
              </p>

              <p className="text-xs text-gray-400">
                Maximum size: 1.5 MB
              </p>

            </div>

            {/* Name */}

            <div className="mb-5">

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#263238]"
              >
                Full Name
              </label>

              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="Enter your name"
                className="w-full rounded-lg border border-[#d9e8f5] px-4 py-3 text-sm outline-none transition focus:border-[#195fd7] focus:ring-2 focus:ring-[#195fd7]/10"
              />

            </div>

            {/* Email */}

            <div className="mb-6">

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#263238]"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                value={currentUser.email}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-[#d9e8f5] bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
              />

              <p className="mt-2 text-xs text-gray-400">
                Email cannot be changed because it is
                used to identify your account transactions.
              </p>

            </div>

            {/* Buttons */}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard")
                }
                className="rounded-lg border border-[#d9e8f5] px-5 py-3 text-sm font-medium text-[#263238] hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-[#195fd7] px-5 py-3 text-sm font-medium text-white hover:bg-[#0d47a1]"
              >
                Save Changes
              </button>

            </div>

          </form>

        </div>

        {/* Bottom actions */}

        <div className="mt-6 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/transaction-history"
              )
            }
            className="rounded-lg border border-[#d9e8f5] bg-white px-4 py-2.5 text-sm font-medium text-[#195fd7] hover:bg-[#eef6ff]"
          >
            Transaction History
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-red-100 bg-white px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Logout
          </button>

        </div>

      </main>

    </div>
  );
}

export default EditProfile;