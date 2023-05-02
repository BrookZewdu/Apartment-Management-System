import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "../../../recoil_state";

export const Profile = () => {
    const [profile, setProfile] = useState(
        {
            name: "",
            lastname: "",
            email: "",
            phone: "",
            resume: "",
            telegram: "",
            github: "",
            linkedin: ""
        }
    );
    const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    }, []);

    useEffect(() => {
        if (!loggedInUser) {
            return;
        }
        setProfile(loggedInUser);
    }, [loggedInUser]);

    const saveProfile = (event) => {
        event.preventDefault();
        if (isLoading) return;
        setIsLoading(true);

        axios.put("/profile", profile).then((response) => {
            console.log("Profile updated", response.data.data);
            setLoggedInUser(response.data.data);
        }).catch((error) => {
            console.log("Error updating profile", error);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <form className="px-16 pt-16 mb-16">
            <div className="space-y-12">
                <div className="pb-12 border-b border-gray-900/10">
                    <p className="text-4xl font-semibold text-neutral-900">Profile</p>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                </div>

                <div className="pb-12 border-b border-gray-900/10">
                    <h2 className="text-base font-semibold leading-7 text-neutral-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">Make sure to provide your most used communication channels.</p>

                    <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-neutral-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="John"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-neutral-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="Doe"
                                    value={profile.lastname}
                                    onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-neutral-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="yourname@email.com"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-neutral-900">
                                Phone
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="+251980555555"
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    type="tel"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-neutral-900">
                                Resume Link
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="https://drive.google.com/file/d/1.../view?usp=sharing"
                                    value={profile.resume}
                                    onChange={(e) => setProfile({ ...profile, resume: e.target.value })}
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-neutral-900">
                                Telegram
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="https://t.me/yourusername"
                                    value={profile.telegram}
                                    onChange={(e) => setProfile({ ...profile, telegram: e.target.value })}
                                    type="text"
                                    name="city"
                                    id="city"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-neutral-900">
                                Github
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="https://www.github.com/yourusername"
                                    value={profile.github}
                                    onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                                    type="text"
                                    name="region"
                                    id="region"
                                    autoComplete="address-level1"
                                    className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-neutral-900">
                                LinkedIn
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="https://www.linkedin.com/in/yourusername"
                                    value={profile.linkedin}
                                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                                    type="text"
                                    name="postal-code"
                                    id="postal-code"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex items-center justify-end mt-6 gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-neutral-900">
                    Cancel
                </button>
                <button
                    type="button "
                    className={"btn btn-primary btn-md w-48 " + (isLoading ? " loading btn-disabled" : "")}
                    onClick={saveProfile}
                >
                    Save
                </button>
            </div>
        </form>
    )
}
