import 'dotenv/config';
import { writeFile } from 'fs/promises';
const BROSWER_API_KEY = process.env.BROSWER_API_KEY;


/**
 * @typedef BraveWebSearchParams
 * @property {string} q                   The user’s search query term. Query can not be empty. max of 400 chars
 * @property {string} [country]           The search query country, where the results come from.
 * @property {string} [search_lang]       The search language preference.
 * @property {string} [ui_lang]           User interface language preferred in response.
 * @property {number} [count]             The number of search results returned in response.
 * @property {number} [offset]            The zero based offset that indicates the page number of search results.
 * @property {string} [safesearch]        Filters search results for adult content.
 * @property {string} [freshness]         Filters search results by when they were discovered.  YYYY-MM-DDtoYYYY-MM-DD
 * @property {boolean} [text_decorations] Whether display strings (e.g. result snippets) should include decoration markers
 * @property {boolean} [spellcheck]       Whether to spellcheck provided query. If the spellchecker is enabled, t
 * @property {string} [result_filter]     A comma delimited string of result types to include in the search response.
 * @property {string} [goggles_id]        Goggles act as a custom re-ranking on top of Brave’s search index.   
 * @property {Array<string>} [goggles]    The measurement units. If not provided, units are derived from search country.
 * @property {string} [units]             The measurement units. If not provided, units are derived from search country.
 * @property {boolean} [etra_snippets]    A snippet is an excerpt from a page you get as a result of the query,
 * @property {boolean} [summary]          This parameter enables summary key generation in web search results. 
 */

/**
 * 
 * @param {BraveWebSearchParams} searchParams 
 */
export async function fetchSearchResults(searchParams){
    const params = new URLSearchParams(searchParams);
      const response = await fetch(`https://api.search.brave.com/res/v1/web/search?${params}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip',
          'x-subscription-token': BROSWER_API_KEY,
        },
      });
      const body = await response.json();
      return body;
}

