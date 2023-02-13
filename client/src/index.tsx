import React from "react";
import ReactDOM from "react-dom/client";
import "global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "core/api";
import App from "App";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>} />
        </Routes>
        {/* <Root /> */}
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
