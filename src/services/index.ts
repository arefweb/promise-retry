import axios, {
  RawAxiosRequestHeaders,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const http = axios.create({
  baseURL: "http://localhost:8633/api",
});

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
};

let pendingRequests: {
  config: AxiosRequestConfig;
  deferred: Deferred<any>;
}[] = [];


function createDeferred<T>(): Deferred<T> {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve: resolve!, reject: reject! };
}

export async function get<T>({
  url,
  headers,
}: {
  url: string;
  headers?: RawAxiosRequestHeaders;
}): Promise<AxiosResponse<T>> {
  // this deffered object is the trick!
  const deferred = createDeferred<AxiosResponse<T>>();
  http({
    method: "get",
    url,
    headers,
  })
    .then((resp) => deferred.resolve(resp))
    .catch((error) => {
      pendingRequests.push({
        config: error.config,
        deferred,
      });
      // Show error modal or toast here with retry option
    });
  return deferred.promise;
}

export function retryAllRequests() {
  const requestsToRetry = [...pendingRequests];
  pendingRequests = [];

  requestsToRetry.forEach(({ config, deferred }) => {
    const shouldError = localStorage.getItem("shouldError") === "true";
    if (config.headers && !shouldError) {
      config.headers["X-Custom"] = "";
    }
    http(config)
      .then((resp) => {
        deferred.resolve(resp);
      })
      .catch((error) => {
        pendingRequests.push({
          config: error.config,
          deferred,
        });
        // Show error modal or toast here with retry option
      });
  });
}