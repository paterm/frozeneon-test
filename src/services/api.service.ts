import { TUnknownObj } from '@/types/general.types';

class ApiService {
  private readonly options: TUnknownObj;

  constructor(options: TUnknownObj) {
    this.options = options;
  }

  public fetch<T>(url: string, options?: TUnknownObj): Promise<T> {
    const fetchUrl = new URL(this.options.base + url);
    const fetchOptions = { ...this.options, ...options };
    let params = this.options.params || {};

    if (fetchOptions && fetchOptions.params) {
      params = {
        ...params,
        ...options?.params,
      };
    }

    if (fetchOptions && fetchOptions.body && typeof fetchOptions.body !== 'string') {
      fetchOptions.body = JSON.stringify(fetchOptions.body);
    }

    if (Object.keys(params).length) {
      fetchOptions.params = params;

      Object.keys(params).forEach((key) => {
        fetchUrl.searchParams.set(key, fetchOptions.params[key]);
      });
    }

    return fetch(fetchUrl.toString(), fetchOptions)
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          return data;
        }

        return Promise.reject(new Error(response.status.toString()));
      });
  }
}

export default ApiService;
