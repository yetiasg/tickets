import { HealthResponseDto } from '../../../../src/health/retrieve/adapter/health-response.dto';
import { TEST_TIMESTAMP } from '../../../test-lib/testing.constants';

describe('HealthResponseDto', (): void => {
  it('should create health response dto when valid status and timestamp are provided', (): void => {
    const status = 'ok';
    const timestamp = TEST_TIMESTAMP;

    const responseDto = HealthResponseDto.build()
      .status(status)
      .timestamp(timestamp)
      .build();

    expect(responseDto).toBeInstanceOf(HealthResponseDto);
    expect(responseDto.status).toBe(status);
    expect(responseDto.timestamp).toBe(timestamp);
  });

  it('should clone health response dto when toBuilder is called on instance', (): void => {
    const responseDto: HealthResponseDto = HealthResponseDto.build()
      .status('ok')
      .timestamp(TEST_TIMESTAMP)
      .build();
    const builtResponseDto: HealthResponseDto = responseDto.toBuilder().build();

    expect(builtResponseDto).toBeInstanceOf(HealthResponseDto);
    expect(builtResponseDto).not.toBe(responseDto);
    expect(builtResponseDto).toEqual(responseDto);
  });
});
