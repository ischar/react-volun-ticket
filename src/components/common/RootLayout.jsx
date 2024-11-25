import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function RootLayout() {
  return (
    <div className="relative">
      <header className="h-20 w-full">
        <Header />
      </header>
      <main className="flex h-calc-100-minus-20">
        <Outlet />
      </main>
    </div>
  );
}
