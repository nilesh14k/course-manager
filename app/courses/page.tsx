"use client";
import React, { Suspense } from "react";
import Loading from "../components/Loading";
import CoursesContent from "./CoursesContent";

export default function CoursesPage() {
  return (
    <Suspense fallback={<Loading message="Loading courses..." />}>
      <CoursesContent />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
