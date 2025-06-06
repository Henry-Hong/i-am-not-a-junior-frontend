import TestMultipleQueries from "./pages/TestMultipleQueries";
import TestQueryFnAlwaysSuccess from "./pages/TestQueryFnAlwaysSuccess";
import TestUserSpecificErrorCode from "./pages/TestUserSpecificErrorCode";
import { TestStaleAndCacheTime } from "./pages/TestStaleAndCacheTime";
import TestRefetchAfterMutation from "./pages/TestRefetchAfterMutation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/test-stale-and-cache-time",
    element: <TestStaleAndCacheTime />,
  },
  {
    path: "/test-multiple-queries",
    element: <TestMultipleQueries />,
  },
  {
    path: "/test-queryfn-always-success",
    element: <TestQueryFnAlwaysSuccess />,
  },
  {
    path: "/test-user-specific-error-code",
    element: <TestUserSpecificErrorCode />,
  },
  {
    path: "/test-refetch-after-mutation",
    element: <TestRefetchAfterMutation />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
