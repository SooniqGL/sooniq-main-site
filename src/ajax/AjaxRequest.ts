import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
  } from "axios";
  
  // https://antenna.io/blog/2021/04/handle-ajax-requests-with-vue-3-vuex-axios-and-type-script/
  
  import { AjaxPromise } from "./ajax-promise.type";
  import { ErrorMessage } from "./error-message.interface";
  import { Status } from "./status";
  import store from "../../store";
  
  export class AjaxRequest {
    private requestId: string;
    private config: AxiosRequestConfig;
    private reject = false;
  
    constructor(requestId: string, config: AxiosRequestConfig = {}) {
      this.requestId = requestId;
      this.config = config;
  
      this.setHeaders();
      this.initRequest();
    }
  
    private setHeaders(): void {
      this.config.headers = {
        ...this.config.headers,
        ...this.jsonHeaders(),
        ...this.authorizationHeaders(),
      };
    }
  
    private jsonHeaders(): Record<string, string> {
      return {
        Accept: "application/json",
        "Content-type": "application/json",
      };
    }
  
    private authorizationHeaders(): Record<string, string> {
      const accessToken = store.getters.getAccessToken;
      return accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {};
    }
  
    private initRequest(): void {
      store.commit("newRequest", { requestId: this.id() });
    }
  
    public id(): string {
      return this.requestId;
    }
  
    public url(path: string): AjaxRequest {
      this.config.url = `${process.env.VUE_APP_BASE_URL}${path}`;
      return this;
    }
  
    public body(data: any): AjaxRequest {
      this.config.data = data;
      return this;
    }
  
    public rejectOnError(): AjaxRequest {
      this.reject = true;
      return this;
    }
  
    public send<T>(method: Method = "get"): AjaxPromise<T> {
      this.config.method = method;
      return this.makeRequest<T>();
    }
  
    public get<T>(): AjaxPromise<T> {
      this.config.method = "get";
      return this.makeRequest<T>();
    }
  
    public post<T>(): AjaxPromise<T> {
      this.config.method = "post";
      return this.makeRequest<T>();
    }
  
    public put<T>(): AjaxPromise<T> {
      this.config.method = "put";
      return this.makeRequest<T>();
    }
  
    public delete<T>(): AjaxPromise<T> {
      this.config.method = "delete";
      return this.makeRequest<T>();
    }
  
    protected updateStatus(status: Status): void {
      store.commit("updateAjaxStatus", { requestId: this.id(), status });
    }
  
    protected makeRequest<T>(): AjaxPromise<T> {
      this.updateStatus(Status.PENDING);
  
      return axios
        .request<T>(this.config)
        .then((response: AxiosResponse) => {
          this.updateStatus(Status.SUCCESS);
          return response;
        })
        .catch((error: AxiosError) => {
          this.updateStatus(Status.ERROR);
          this.errorHandler(error);
  
          // The errors are already handled above, however we can optionally rethrow
          // the error, so that it can be handled in the next catch block again
          if (this.reject) {
            throw error;
          }
        });
    }
  
    protected errorHandler(error: AxiosError): void {
      if (error.response) {
        switch (error.response.status) {
          case 422:
            this.parseValidationErrors(error.response);
            break;
          default:
            this.parseError(error.response);
            break;
        }
      }
    }
  
    protected parseError(response: AxiosResponse): void {
      store.commit("storeError", {
        requestId: this.id(),
        error: response.data?.message || "error.generic",
      });
    }
  
    protected parseValidationErrors(response: AxiosResponse): void {
      const errors = {} as Record<string, string[]>;
  
      response.data.message.map((m: ErrorMessage) => {
        errors[m.property] = Object.values(m.constraints);
      });
  
      store.commit("storeValidationErrors", {
        requestId: this.id(),
        errors,
      });
    }
  }