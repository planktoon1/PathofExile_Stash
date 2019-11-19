export function changeBaseItem(itemId: string ) {
    return {
      type: 'CHANGE_BASEITEM',
      itemId
    } as const
}