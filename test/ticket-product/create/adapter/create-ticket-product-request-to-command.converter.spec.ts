import { CreateTicketProductDto } from '../../../../src/ticket-product/create/adapter/create-ticket-product.dto';
import { CreateTicketProductDtoToCommandConverter } from '../../../../src/ticket-product/create/adapter/create-ticket-product-dto-to-command.converter';

describe('CreateTicketProductDtoToCommandConverter', (): void => {
  it('should convert request dto to command when valid request dto is provided', (): void => {
    const requestDto: CreateTicketProductDto = {
      tenantId: 'de305d54-75b4-431b-adb2-eb6b9e546015',
      eventId: 'de305d54-75b4-431b-adb2-eb6b9e546016',
      ticketTemplateId: 'de305d54-75b4-431b-adb2-eb6b9e546017',
      name: 'General Admission',
      code: 'GENERAL-ADMISSION',
      description: 'Default ticket product for integration-safe tests.',
      deliveryType: 'digital_pdf',
      availableQuantity: 100,
      additionalInfo: {
        category: 'standard',
      },
      salesStartsAt: '2026-01-01T10:00:00.000Z',
      salesEndsAt: '2026-01-02T10:00:00.000Z',
      maxValidationCount: 1,
      isSingleUse: true,
      validFrom: '2026-01-10T10:00:00.000Z',
      validUntil: '2026-01-11T10:00:00.000Z',
      validationRules: {
        entryGate: 'main',
      },
    };
    const converter = new CreateTicketProductDtoToCommandConverter();

    const command = converter.convert(requestDto);

    expect(command.tenantId).toBe(requestDto.tenantId);
    expect(command.eventId).toBe(requestDto.eventId);
    expect(command.ticketTemplateId).toBe(requestDto.ticketTemplateId);
    expect(command.name).toBe(requestDto.name);
    expect(command.code).toBe(requestDto.code);
    expect(command.description).toBe(requestDto.description);
    expect(command.deliveryType).toBe(requestDto.deliveryType);
    expect(command.availableQuantity).toBe(requestDto.availableQuantity);
    expect(command.additionalInfo).toEqual(requestDto.additionalInfo);
    expect(command.salesStartsAt?.toISOString()).toBe(requestDto.salesStartsAt);
    expect(command.salesEndsAt?.toISOString()).toBe(requestDto.salesEndsAt);
    expect(command.maxValidationCount).toBe(requestDto.maxValidationCount);
    expect(command.isSingleUse).toBe(requestDto.isSingleUse);
    expect(command.validFrom?.toISOString()).toBe(requestDto.validFrom);
    expect(command.validUntil?.toISOString()).toBe(requestDto.validUntil);
    expect(command.validationRules).toEqual(requestDto.validationRules);
  });
});
