import { filterValidUrls } from "./utils";
import * as pagesRepo from './pages-repo';

export async function queueForIndexing(urls: string[]) {
   const validUrls = filterValidUrls(urls);
   await pagesRepo.addPages(validUrls);
}