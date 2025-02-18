import { db } from '../db';

export type PageStatus = 'pending' | 'submitted' | 'error' | 'processing';

export interface Page {
  id?: number;
  url: string;
  status: PageStatus;
  created_at: number;
  last_submitted_at?: number;
  error_message?: string;
}

export const addPages = async (urls: string[]): Promise<void> => {
   await db.pages.bulkAdd(urls.map(url => ({
    url: url,
    status: 'pending',
    created_at: Date.now()
  })));
};

export const updatePage = async (id: number, updates: Partial<Omit<Page, 'id'>>) => {
  await db.pages.update(id, updates);
};

export const getPendingPages = async (limit = 10) => {
  return await db.pages.where('status').equals('pending').limit(limit).toArray();
};

export const searchPages = async ({
  limit = 20,
  status,
  search
} : {
  limit?: number,
  status?: PageStatus | null,
  search?: string | null,
}) => {

  // The query is inefficient but thats the best we have for now
  // https://github.com/dexie/Dexie.js/issues/297

  return db
    .pages
    .orderBy('id')
    .reverse()
    .filter((page) => {
      if (status) {
        return page.status === status;
      }
      return true;
    })
    .filter(page => {
      if (search) {
        return page.url.includes(search);
      }
      return true;
    })
    .limit(limit)
    .toArray();
}

export const countPages = async ({
  status,
  search
} : {
  limit?: number,
  status?: PageStatus | null,
  search?: string | null,
}) => {
  
  let statusList : PageStatus[] = !!status
    ? [status]
    : ['pending', 'error', 'submitted', 'processing'];

  let collection = db
    .pages
    .where("status")
    .anyOf(statusList);
 
  if (search) {
    collection = collection.filter(page => {
      return page.url.includes(search);
    });
  }

  return collection.count();
}

export async function deletePage(id: number) {
  return db.pages.delete(id);
}

export async function totalPagesCount() {
  return db.pages.count();
}

export async function deleteAllPages() {
  await db.pages.clear();
}


export async function findPageById(id: number) {
  const page = await db.pages.get(id);
  return page;
}

export { db }