import React, { useState } from "react";
import PropTypes from 'prop-types';

function PasteItem(props) {
const [itemData, setItemData] = useState({ 
    stringItem: "",
    jsonItem: {
        info: {
            rarity: 0,
            name: '',
            base: '',
            type: '',
        },
        stats: {
            armour_stats: {
                armour: 0,
                evasion: 0,
                energy_shield: 0,
                block: 0,
            },
            weapon_stats: {
                physical_dmg: 0,
                fire_dmg: 0,
                cold_dmg: 0,
                lightning_dmg: 0,
                crit_chance: 0,
                attacks_per_sec: 0,
                weapon_range: 0,
            }
        },
        requirements: {
            level: 0,
            str: 0,
            dex: 0,
            int: 0,
        },
        sockets: '',
        item_level: 0,
        affixes: {
            implicit: [],
            prefixes: [],
            suffixes: [],
        },
        flavor_text: '',
        note: '',
    }, 
});

const onStringChange = (event) => {
    
  setItemData({stringItem: event.target.value});
  // Check if string is a valid item

  // Convert string to json-item
  let jsonItem = stringItemToJsonItem(event.target.value);
  //setItemData({jsonItem: jsonItem});

  // Pass the json-item to parent
  props.onJsonItemUpdate(jsonItem)
}

  return (
    <>
        <textarea value={itemData.stringItem} onChange={onStringChange} style={{
        width: '100%',
        height: '500px',
        whiteSpace: 'pre-wrap',
        }}>
        
        </textarea>
        <br/>
        <span style={{ whiteSpace: 'pre-wrap' }}>{itemData.stringItem}</span>
    </>
  );
}


function stringItemToJsonItem(itemString) {
    return itemString;
}


PasteItem.propTypes = {
    onJsonItemUpdate: PropTypes.func,
  };
export default PasteItem;