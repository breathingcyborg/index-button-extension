import Dexie, { Table } from 'dexie';
import { Page } from './bulk-indexing/pages-repo';
import { SitemapPage } from './bulk-indexing/sitemap-pages-repo';

class AppDatabase extends Dexie {
  pages!: Table<Page, number>;
  sitemapPages!: Table<SitemapPage, number>;

  constructor() {
    super('AppDatabase');
    this.version(1).stores({
      pages: '++id, url, status, created_at, last_submitted_at, error_message',
      sitemapPages: '++id, url, selected',
    });
  }
}

export const db = new AppDatabase();
