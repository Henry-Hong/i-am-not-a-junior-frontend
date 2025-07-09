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
import FormPage from "./pages/FormPage/index.tsx";
import AsyncPage from "./pages/AsyncPage/index.tsx";
import PrevPage from "./pages/PrevPage/index.tsx";
import DisplayNamePage from "./pages/DisplayNamePage/index.tsx";
import AvatarsPage from "./pages/AvatarsPage/index.tsx";
import UseEffectsPage from "./pages/UseEffectsPage/index.tsx";
import ExternalEasyPage from "./pages/ExternalEasyPage/index.tsx";
import LazyInitializationPage from "./pages/LazyInitializationPage/index.tsx";
import DataAttributePage from "./pages/DataAttribute/index.tsx";
import ChildrenPage from "./pages/ChildrenPage/index.tsx";
import CountUpPage from "./pages/CountUpPage/index.tsx";
import ScrollPage from "./pages/ScrollPage/index.tsx";

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
    path: "/external-easy",
    element: <ExternalEasyPage />,
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
  {
    path: "/form",
    element: <FormPage />,
  },
  {
    path: "/async",
    element: <AsyncPage />,
  },
  {
    path: "/prev",
    element: <PrevPage />,
  },
  {
    path: "/display-name",
    element: <DisplayNamePage name={"hello fucking world"} />,
  },
  {
    path: "/avatars",
    element: <AvatarsPage />,
  },
  {
    path: "/use-effects",
    element: <UseEffectsPage />,
  },
  {
    path: "/lazy-initialize",
    element: <LazyInitializationPage />,
  },
  {
    path: "/data-attribute",
    element: <DataAttributePage />,
  },
  {
    path: "/children",
    element: <ChildrenPage />,
  },
  {
    path: "/count-up",
    element: <CountUpPage />,
  },
  {
    path: "/scroll",
    element: <ScrollPage />,
  },
  {
    path: "/idle",
    element: <IdlePage />,
  },
]);

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
);
