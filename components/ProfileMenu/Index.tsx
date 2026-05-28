'use client'

import { useState } from "react";
import Header from "./HeaderSection/Index";
import Account from "./AccountSection/Index";
import MoreSettings from "./MoreSetting/Index";
import MyProfile from "./MyProfile/Index";

export default function MainPage() {
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    return (
        <div className="min-h-screen w-80 bg-white dark:bg-zinc-900 flex flex-col z-10 fixed">
            <Header isOpen={isAccountOpen} setIsOpen={setIsAccountOpen} />
            <Account isOpen={isAccountOpen} setIsOpen={setIsAccountOpen} />
            <MyProfile />
            <MoreSettings />
        </div>
    );
}