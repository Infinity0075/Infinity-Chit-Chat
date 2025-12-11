import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  CameraIcon,
  ShuffleIcon,
  MapPinIcon,
  InfinityIcon,
  LoaderIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";
import { useNavigate } from "react-router-dom";

const OnBoardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Prefill fields if user has data
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  // Mutation for submitting onboarding data
  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");

      // Update user cache
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      // Redirect to homepage after onboarding
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Onboarding failed");
    },
  });

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  // Generate random avatar
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const avatarUrl = `https://api.dicebear.com/7.x/adventurer/png?seed=${idx}`;

    setFormState({ ...formState, profilePic: avatarUrl });
    toast.success("Random avatar generated!");
  };

  return (
    <div
      className="min-h-screen bg-base-100 flex items-center justify-center p-4"
      data-theme="dark"
    >
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl ">
        <div className="card-body p-6 sm:p-8 ">
          {/* HEADER */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* AVATAR SECTION */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-32 h-32 rounded-full bg-base-300 overflow-hidden flex items-center justify-center">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CameraIcon className="w-12 h-12 opacity-40" />
                )}
              </div>

              <button
                type="button"
                onClick={handleRandomAvatar}
                className="btn btn-accent flex items-center gap-2"
              >
                <ShuffleIcon className="w-5 h-5" />
                Generate Random Avatar
              </button>
            </div>

            {/* FULL NAME */}
            <div className="form-control space-y-2">
              <label className="label-text font-medium">Full Name</label>
              <input
                type="text"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="Enter your full name"
              />
            </div>

            {/* BIO */}
            <div className="form-control space-y-2">
              <label className="label-text font-medium">Bio</label>
              <textarea
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea textarea-bordered w-full h-28 leading-relaxed"
                placeholder="Tell something about yourself..."
              />
            </div>

            {/* LANGUAGES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Native Language */}
              <div className="form-control space-y-2">
                <label className="label-text font-medium">
                  Native Language
                </label>
                <select
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Learning Language */}
              <div className="form-control space-y-2">
                <label className="label-text font-medium">
                  Learning Language
                </label>
                <select
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select learning language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control space-y-2">
              <label className="label-text font-medium">Location</label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60" />
                <input
                  type="text"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-12"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <InfinityIcon className="w-5 h-5" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
