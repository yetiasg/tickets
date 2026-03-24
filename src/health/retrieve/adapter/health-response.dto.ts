import { Builder, IBuilder } from 'builder-pattern';

import { HealthStatus } from '../domain/health-status';

export class HealthResponseDto {
  public readonly status!: HealthStatus;
  public readonly timestamp!: string;

  static build(
    props?: Partial<HealthResponseDto>,
  ): IBuilder<HealthResponseDto> {
    return Builder(HealthResponseDto, props);
  }

  toBuilder(): IBuilder<HealthResponseDto> {
    return HealthResponseDto.build(structuredClone(this));
  }
}
