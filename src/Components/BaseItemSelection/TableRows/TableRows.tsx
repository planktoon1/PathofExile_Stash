import React from 'react';
import { getBaseItemsInDomain } from '../../../Common/Crafting/CraftingUtil';
import { mapObject } from '../../../Common/Utilities';
import WeaponTableLayout from './WeaponTableLayout'; 
import ArmourTableLayout from './ArmourTableLayout'; 
import JewelleryTableLayout from './JewelleryTableLayout'; 

import '../BaseItemSelection.css';
import { BaseItem } from '../../../Common/Crafting/interfaces';

export interface TableLayoutProps {
    item: BaseItem
};

export interface TableRowsProps {
    itemCategory: string;
    itemClass: string;
};

const TableRows = React.memo<any>( ({itemCategory, itemClass}) => {
    switch (itemCategory) {
        case "Armor":
            return mapObject(getBaseItemsInDomain('item', itemClass), (itemID, item)=>
            <ArmourTableLayout 
                key={item.key}
                item={item} 
            />);
        case "One Handed Weapon":
        case "Two Handed Weapon":
            return mapObject(getBaseItemsInDomain('item', itemClass), (itemID, item)=>
            <WeaponTableLayout 
                key={item.key}
                item={item} 
            />);
        case "Offhand":
            if (itemClass === "Shield")
                return mapObject(getBaseItemsInDomain('item', itemClass), (itemID, item)=>
                <ArmourTableLayout 
                    key={item.key}
                    item={item}
                />);
            else if (itemClass === "Quiver")
                return mapObject(getBaseItemsInDomain('item', itemClass), (itemID, item)=>
                <JewelleryTableLayout 
                    key={item.key}
                    item={item}
                />);
            break;
        case "Jewellery":                        
            return mapObject(getBaseItemsInDomain('item', itemClass), (itemID, item)=>
            <JewelleryTableLayout 
                key={item.key}
                item={item}
            />);
        default:
            return (<></>);
    }
})


export default TableRows;