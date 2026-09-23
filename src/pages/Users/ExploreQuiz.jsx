import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { Outlet } from "react-router-dom";

export default function ExploreQuiz() {
    return (
        <MainLayout>
            <Outlet/>
        </MainLayout>
    );
}
