import "./index.css"
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/index");
    return worker.start();
  }
}

const queryClient = new QueryClient();

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
);