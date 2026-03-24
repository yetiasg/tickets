export interface BaseRepository<Domain, Id> {
  create(domain: Domain): Promise<Domain>;
  findById(id: Id): Promise<Domain | null>;
}
