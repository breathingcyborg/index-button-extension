import { db } from "../db";

export interface SitemapPage {
    id?: number;
    url: string;
    selected: number; // 0 = false, 1 = true
}

/**
 * Bulk add sitemap pages
 * 
 */
export const addPages = async (urls: string[]): Promise<void> => {
    await db.sitemapPages.bulkAdd(urls.map(url => ({
     url: url,
     selected: 0,
   })));
};

/**
 * This function should be called when importing new sitemap.
 * We want to delete all urls before importing new sitemap.
 * 
 */
export const deleteAllPages = async () : Promise<void> => {
    await db.sitemapPages.clear();
}

/**
 * Search pages by search term
 * 
 * @returns 
 */
export const searchPages = async ({
    limit = 20,
    offset = 0,
    search
} : {
    limit?: number,
    offset?: number,
    search?: string | null,
}) => {
  
    // The query is inefficient but thats the best we have for now
    // https://github.com/dexie/Dexie.js/issues/297
  
    return db
      .sitemapPages
      .orderBy('id')
    //   .reverse()
      .filter(page => {
        if (search) {
          return page.url.includes(search);
        }
        return true;
      })
      .offset(offset)
      .limit(limit)
      .toArray();
}

/**
 * Count pages matching the search term
 * 
 * @returns 
 */
export const countPages = async ({
    search
  } : {
    search?: string | null,
}) => {

    let collection = db
      .sitemapPages
      .filter(page => {
        if (!search) {
            return true;
        }
        return page.url.includes(search);
    })

    return collection.count();
}

/**
 * Count number of pages that are selected
 * 
 * @returns 
 */
export const countSelectedPages = async ({
    search
  } : {
    search?: string | null,
}) => {

    let collection = db
      .sitemapPages
      .where("selected")
      .equals(1)

    if (search) {
        collection = collection.filter(page => {
          return page.url.includes(search);
        })
    }

    return collection.count();
}

/**
 * Select all pages, 
 * 
 * @returns 
 */
export const selectAllPages = async ({
    search
} : {
    search?: string | null,
}) => {
  
    return db
      .sitemapPages
      .orderBy('id')
      .reverse()
      .filter(page => {
        if (search) {
          return page.url.includes(search);
        }
        return true;
      })
      .modify({ selected: 1 })
}

/**
 * Deselect all pages, 
 * 
 * @returns 
 */
export const deselectAllPages = async ({
    search
} : {
    search?: string | null,
}) => {
  
    return db
      .sitemapPages
      .orderBy('id')
      .reverse()
      .filter(page => {
        if (search) {
          return page.url.includes(search);
        }
        return true;
      })
      .modify({ selected: 0 })
}

/**
 * Select pages matching list of ids
 * 
 * @returns 
 */
export const selectPages = async ({ 
    ids 
} : { 
    ids: number[] 
}) => {
    return db
    .sitemapPages
    .where('id')
    .anyOf(ids)
    .modify({ selected: 1 })
}

/**
 * Deselect pages matching list of ids
 * 
 * @returns 
 */
export const deselectPages = async ({ 
    ids 
} : { 
    ids: number[] 
}) => {
    return db
    .sitemapPages
    .where('id')
    .anyOf(ids)
    .modify({ selected: 0 })
}

/**
 * returns all selected pages
 */
export const getSelectedPages = async () => {
  return db
    .sitemapPages
    .where('selected')
    .equals(1)
    .toArray();
}

