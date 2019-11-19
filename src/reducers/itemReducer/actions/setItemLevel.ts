export function setItemLevel(itemLevel: number) {
    return {
      type: 'SET_ITEM_LEVEL',
      itemLevel
    } as const
}