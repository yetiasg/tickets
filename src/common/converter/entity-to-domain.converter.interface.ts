import { Converter } from './converter.interface';

export type EntityToDomainConverter<Entity, Domain> = Converter<Entity, Domain>;
