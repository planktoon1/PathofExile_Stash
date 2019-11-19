import React from 'react';
import TableRows from './TableRows/TableRows'; 

import './BaseItemSelection.css';

function BaseItemTable({itemCategory, itemClass}) {

    const tableHead = () => {
        const armourTableHead = (<thead>
            <tr>
                <th rowSpan="2"></th>
                <th rowSpan="2">Name</th>
                <th>Level</th>
                <th>Armour</th>
                <th>Evasion</th>
                <th style={{whiteSpace: "nowrap"}}>Energy Shield</th>
                <th>Req Str</th>
                <th>Req Dex</th>
                <th>Req Int</th>
            </tr>
            <tr>
                <th colSpan="7">Implicit Mod</th>
            </tr>
        </thead>);

        const weaponTableHead = (<thead>
            <tr>
                <th rowSpan="2"></th>
                <th rowSpan="2">Name</th>
                <th>Level</th>
                <th>Damage</th>
                <th>APS</th>
                <th>DPS</th>
                <th>Req Str</th>
                <th>Req Dex</th>
                <th>Req Int</th>
            </tr>
            <tr>
                <th colSpan="5">Implicit Mod</th>
                <th>Crit.</th>
                <th>Range</th>
            </tr>
        </thead>);
        
        const jewelleryTableHead = (<thead>
            <tr style={{height: "2rem"}}>
                <th></th>
                <th colSpan="2">Name</th>
                <th>Level</th>
                <th colSpan="5">Implicit Mod</th>
                
            </tr>
        </thead>);

        switch (itemCategory) {
            case "Armor":
                return armourTableHead;  
            case "One Handed Weapon":
            case "Two Handed Weapon":
                return weaponTableHead;  
            case "Offhand":
                if (itemClass === "Shield")
                    return armourTableHead;
                else if (itemClass === "Quiver")
                    return jewelleryTableHead;
                break;
            case "Jewellery":                        
                return jewelleryTableHead;
            default:
                return (<></>);
        }    
    };
    
    return (
        <table className="baseItemsList">
            {tableHead()}
            <tbody className="tableBody">
            <TableRows 
                itemCategory={itemCategory}
                itemClass={itemClass}
            />
            </tbody>
        </table>

    );
}


export default BaseItemTable;