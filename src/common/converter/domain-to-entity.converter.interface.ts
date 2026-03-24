import { Converter } from './converter.interface';

export type DomainToEntityConverter<Domain, Entity> = Converter<Domain, Entity>;
