// localStorage persistence with versioning and migration support

const STORAGE_VERSION = '1.0.0';
const STORAGE_KEY = 'invoiceBuilderData';

export interface StorageData {
  version: string;
  companyProfile: any | null;
  clients: any[];
  invoices: any[];
  invoiceNumbering: {
    prefix: string;
    nextNumber: number;
  };
}

const defaultData: StorageData = {
  version: STORAGE_VERSION,
  companyProfile: null,
  clients: [],
  invoices: [],
  invoiceNumbering: {
    prefix: 'INV',
    nextNumber: 1,
  },
};

export function loadStorage(): StorageData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { ...defaultData };
    }
    const data = JSON.parse(stored);
    
    // Migration logic - can be extended for future versions
    if (data.version !== STORAGE_VERSION) {
      // Migrate data if needed
      return migrateData(data);
    }
    
    // Ensure arrays are proper arrays (not frozen objects)
    const result: StorageData = {
      ...data,
      clients: Array.isArray(data.clients) ? [...data.clients] : [],
      invoices: Array.isArray(data.invoices) ? [...data.invoices] : [],
    };
    
    return result;
  } catch (error) {
    console.error('Failed to load storage:', error);
    return { ...defaultData };
  }
}

export function saveStorage(data: StorageData): void {
  try {
    const dataToSave = {
      ...data,
      version: STORAGE_VERSION,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Failed to save storage:', error);
  }
}

function migrateData(data: any): StorageData {
  // Migration from older versions
  const migrated: StorageData = {
    ...defaultData,
    ...data,
    version: STORAGE_VERSION,
  };
  
  // Ensure all required fields exist and are proper arrays
  if (!migrated.invoiceNumbering) {
    migrated.invoiceNumbering = { ...defaultData.invoiceNumbering };
  }
  if (!Array.isArray(migrated.clients)) {
    migrated.clients = [];
  } else {
    migrated.clients = [...migrated.clients];
  }
  if (!Array.isArray(migrated.invoices)) {
    migrated.invoices = [];
  } else {
    migrated.invoices = [...migrated.invoices];
  }
  
  return migrated;
}

export function clearStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
}

// Helper to generate stable IDs
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
