import axios, { AxiosResponse } from "axios";

export default function CancelFetchPage() {
  const handleClick = () => {
    // fetchWithTimeout("/cancel-fetch").then((res) => res.json());
    // xhrWithTimeout("/cancel-fetch", { method: "GET" }, 5000).then((res) =>
    //   console.log(res)
    // );
    // xhrWithTimeout("/cancel-fetch", { method: "POST" }, 5000).then((res) =>
    //   console.log(res)
    // );

    axiosWithTimeout("/cancel-fetch", { method: "get" }).then((res) =>
      console.log(res)
    );
  };

  return (
    <div>
      <h1>CancelFetchPage</h1>
      <button onClick={handleClick}>click</button>
    </div>
  );
}

type XhrWithTimeout = <T>(
  url: string | URL,
  options: { method: string },
  timeout?: number
) => Promise<T>;
const xhrWithTimeout: XhrWithTimeout = (url, options, timeout = 3000) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const timeoutId = setTimeout(() => {
      xhr.abort();
      reject(new Error("Request timeout"));
    }, timeout);

    xhr.onload = () => {
      clearTimeout(timeoutId);
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch (error) {
          reject(new Error("Invalid JSON response"));
        }
      } else {
        reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      clearTimeout(timeoutId);
      reject(new Error("Network error"));
    };

    xhr.onabort = () => {
      clearTimeout(timeoutId);
      reject(new Error("Request aborted"));
    };

    xhr.onprogress = (event) => {
      console.log("onprogress event", (event.loaded / event.total) * 100);
    };

    xhr.open(options.method, url);

    if (options.method === "POST" || options.method === "PUT") {
      const largeData = "hello world".repeat(40000000);
      xhr.send(largeData);
    } else {
      xhr.send();
    }
  });
};

type FetchWithTimeout = (
  url: string,
  options?: RequestInit,
  timeout?: number
) => Promise<Response>;
const fetchWithTimeout: FetchWithTimeout = async (
  url,
  options = {},
  timeout = 3000
) => {
  const abortcontroller = new AbortController();
  const timeoutId = setTimeout(() => abortcontroller.abort(), timeout);
  try {
    const result = await fetch(url, {
      ...options,
      signal: abortcontroller.signal,
    });
    return result;
  } finally {
    clearTimeout(timeoutId);
  }
};

type AxiosWithTimeout = (
  url: string,
  options: { method: "get" | "post" | "put" | "delete" },
  timeout?: number
) => Promise<AxiosResponse>;
const axiosWithTimeout: AxiosWithTimeout = async (
  url,
  options,
  timeout = 3000
) => {
  const abortcontroller = new AbortController();
  const timeoutId = setTimeout(() => abortcontroller.abort(), timeout);

  try {
    const result = await axios[options.method](url, {
      signal: abortcontroller.signal,
    });
    return result;
  } finally {
    clearTimeout(timeoutId);
  }
};
