export interface IDatabase {
  conenct: () => Promise<boolean>;
  disconnect: () => Promise<boolean>;
  query: (queryString: string) => any;
}
