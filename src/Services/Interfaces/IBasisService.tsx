import { Basis } from "@core/index";

export interface IBasisService {
  getAllBasis: () => Promise<Basis[]>;
  getBasisById: (id: string) => Promise<Basis | null>;
}
