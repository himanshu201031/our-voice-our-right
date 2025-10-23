import type { DistrictData } from '../types';

const DB_NAME = 'MGNREGADashboardDB';
const DB_VERSION = 1;
const STORE_NAME = 'districtData';

let db: IDBDatabase;

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('IndexedDB error:', request.error);
      reject('IndexedDB error');
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

export const getDistrictData = async (id: string): Promise<DistrictData | null> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onerror = () => {
      console.error('Error fetching data from DB');
      reject('Error fetching data from DB');
    };

    request.onsuccess = () => {
      resolve(request.result || null);
    };
  });
};

export const saveDistrictData = async (data: DistrictData): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(data);

    request.onerror = () => {
      console.error('Error saving data to DB');
      reject('Error saving data to DB');
    };

    request.onsuccess = () => {
      resolve();
    };
  });
};
