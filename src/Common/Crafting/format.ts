export const formats: { [id: string]: (value: number | string) => string } = {
    "#": (v) => String(v),
    "+#": (v) => v >= 0 ? "+" + String(v) : String(v),
    "#%": (v) => String(v) + "%",
    "+#%": (v) => (v >= 0 ? "+" + String(v) : String(v)) + "%",
    "ignore": () => "",
}