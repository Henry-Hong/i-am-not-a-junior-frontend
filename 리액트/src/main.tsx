import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import FilterPage from "./pages/FilterPage";
import ExternalPage from "./pages/ExternalPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import BottomReach from "./BottomReach/index.tsx";
import CallbackRef from "./pages/CallbackRefPage/index.tsx";
import CookiePage from "./pages/CookiePage/index.tsx";
import CounterPage from "./pages/Counter/index.tsx";
import EmailPage from "./pages/Email/index.tsx";
import ReducerPage from "./pages/Reducer/index.tsx";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/index");
    return worker.start();
  }
}

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/test",
    element: (
      <div>
        <Link to={{ pathname: "/" }}>click</Link>
      </div>
    ),
  },
  {
    path: "/filter",
    element: <FilterPage />,
  },
  {
    path: "/external",
    element: <ExternalPage />,
  },
  {
    path: "/bottom-reach",
    element: <BottomReach />,
  },
  {
    path: "/callback-ref",
    element: <CallbackRef />,
  },
  {
    path: "/cookie",
    element: <CookiePage />,
  },
  {
    path: "/counter",
    element: <CounterPage />,
  },
  {
    path: "/email",
    element: <EmailPage />,
  },
  {
    path: "/reducer",
    element: <ReducerPage />,
  },
]);

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
);
