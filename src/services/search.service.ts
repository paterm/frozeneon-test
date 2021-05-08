import algoliaSearch from 'algoliasearch';
import {
  ISearchOptions,
  ISearchServiceOptions, THitsResponse,
  TSearchHit,
} from '@/types';

class SearchApiService {
  private readonly options: ISearchServiceOptions

  private algolia

  private index

  constructor(options: ISearchServiceOptions) {
    this.options = options;
    this.algolia = algoliaSearch(
      options.appId,
      options.apiKey,
      options.apiOptions,
    );
    this.index = this.algolia.initIndex('npm-search');
  }

  public search(params: ISearchOptions): Promise<THitsResponse> {
    const options = {
      page: params.page,
      hitsPerPage: params.hitsPerPage,
      attributesToHighlight: [],
      attributesToRetrieve: this.options.attributesToRetrieve,
      analyticsTags: this.options.analyticsTags,
    };

    // eslint-disable-next-line
    // @ts-ignore
    return this.index.search(params.text, options)
      .then((response) => {
        // eslint-disable-next-line
        // @ts-ignore
        response.hits.sort((a: TSearchHit, b: TSearchHit) => (
          a.name === params.text ? -1 : b.name === params.text
        ));

        return response;
      });
  }
}

export const SearchService = new SearchApiService({
  appId: 'OFCNCOG2CU',
  apiKey: 'f54e21fa3a2a0160595bb058179bfb1e',
  indexName: 'npm-search',
  apiOptions: { protocol: 'https:' },
  attributesToRetrieve: [
    'deprecated', 'description', 'githubRepo', 'homepage',
    'keywords', 'license', 'name', 'owner', 'version',
  ],
  analyticsTags: ['jsdelivr'],
});
