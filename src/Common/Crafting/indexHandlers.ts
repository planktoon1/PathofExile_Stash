export const indexHandlers: { [id: string]: (value: number) => number } = {
    "30%_of_value": (v) => v * 0.3,
    "60%_of_value": (v) => v * 0.6,
    "deciseconds_to_seconds": (v) => v / 10,
    "divide_by_one_hundred": (v) => v / 100,
    "divide_by_one_hundred_and_negate": (v) => -v / 100,
    "divide_by_one_hundred_2dp": (v) => round(v / 100, 2),
    "divide_by_six": (v) => v / 6,
    "divide_by_ten_0dp": (v) => round(v / 10, 0),
    "divide_by_twelve": (v) => v / 12,
    "divide_by_two_0dp": (v) => round(v / 2, 0),
    "divide_by_fifteen_0dp": (v) => round(v / 15, 0),
    "divide_by_twenty_then_double_0dp": (v) => round(v / 20, 0) * 2,
    "milliseconds_to_seconds": (v) => v / 1000,
    "milliseconds_to_seconds_0dp": (v) => round(v / 1000, 0),
    "milliseconds_to_seconds_1dp": (v) => round(v / 1000, 1),
    "milliseconds_to_seconds_2dp": (v) => round(v / 1000, 2),
    "milliseconds_to_seconds_2dp_if_required": (v) => round(v / 1000, 2),
    "multiplicative_damage_modifier": (v) => v + 100,
    "multiplicative_permyriad_damage_modifier": (v) => v / 100 + 100,
    "negate": (v) => -v,
    "old_leech_percent": (v) => v / 5,
    "old_leech_permyriad": (v) => v / 500,
    "per_minute_to_per_second": (v) => round(v / 60, 1),
    "per_minute_to_per_second_0dp": (v) => round(v / 60, 0),
    "per_minute_to_per_second_1dp": (v) => round(v / 60, 1),
    "per_minute_to_per_second_2dp": (v) => round(v / 60, 2),
    "per_minute_to_per_second_2dp_if_required": (v) => round(v / 60, 2),
    "mod_value_to_item_class": (v) => {throw new Error('The "mod_value_to_item_class" index handler is not supported')},
    "canonical_stat": (v) => v,
    "times_twenty": (v) => v * 20,
    
}

function round(value: number, decimals: number) {
    return Number(Math.round(Number(value+'e'+decimals))+'e-'+decimals);
}
