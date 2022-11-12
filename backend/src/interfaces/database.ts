export interface IDatabase {
  conenct: () => Promise<boolean>;
  disconnect: () => Promise<boolean>;
}
