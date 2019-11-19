export function applyCurrency(currencyId: string) {
    return {
      type: 'USE_CURRENCY',
      currencyId
    } as const
}