import { TestStaleAndCacheTime } from "./pages/TestStaleAndCacheTime";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/test-stale-and-cache-time",
    element: <TestStaleAndCacheTime />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
