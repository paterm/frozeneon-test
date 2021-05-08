import ApiService from '@/services/api.service';
import { TUnknownObj } from '@/types';

class JsdelivrApiService extends ApiService {
  public getPackage(name: string): Promise<void | TUnknownObj> | undefined {
    return this.fetch(`/package/npm/${name}`)
      .then((response) => {
        console.log('response', response);
      });
  }
}

export const JsdelivrService = new JsdelivrApiService({
  base: 'https://data.jsdelivr.com/v1',
});
