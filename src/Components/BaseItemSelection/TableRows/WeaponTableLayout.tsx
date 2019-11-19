import React, { useContext } from 'react';
import {getModById, getImgUrlFromBaseItem} from '../../../Common/Crafting/CraftingUtil';
import {getModDescription} from '../../../Common/Crafting/Translation';
import '../BaseItemSelection.css';
import { CraftingContext } from '../../../contexts/ItemContext';
import { changeBaseItem } from '../../../reducers/itemReducer/actions/changeBaseItem';

function WeaponTableLayout({item}) {
    const implicitList: any[] = [];
    const {dispatch} = useContext(CraftingContext)
    for (let implicit of item.implicits) {
        const mod = getModById(implicit)
        if (mod) {
            implicitList.push(...getModDescription(mod)); 
        }
    }
    const implicits = implicitList.map((implicit) => <p>{implicit}</p>)


    const handleClick = () => {
        dispatch(changeBaseItem(item.name))
    }

    return (
        <colgroup className="rowGroup" onClick={handleClick} key={item.key}>
            <tr>
                <td className="icon" rowSpan={2}><img className="icon" title={item.name} src={getImgUrlFromBaseItem(item)} alt={item.name}/></td>
                <td className="name" rowSpan={2}>{item.name}</td>
                <td className="level" title="Level">{item.requirements.level || 0}</td>    
                <td className="Damage" title="Damage">{item.properties.physical_damage_min} to {item.properties.physical_damage_max}</td>    
                <td className="AttacksPerSecond" title="Attacks Per Second">{(1000 / item.properties.attack_time).toFixed(2)}</td>    
                <td className="DPS" title="Damage Per Second">{
                    ((item.properties.physical_damage_min + item.properties.physical_damage_max)/2*(1000 / item.properties.attack_time)).toFixed(1)
                }</td>    
                    
                <td className="ReqStr" title="Required Str">{item.requirements.strength}</td>    
                <td className="ReqDex" title="Required Dex">{item.requirements.dexterity}</td>    
                <td className="ReqInt" title="Required Int">{item.requirements.intelligence}</td>   
            </tr>
            <tr>
                <td className="implicit" title="Implicit Mod" colSpan={5}>{implicits}</td> 
                <td className="criticalStrikeChance" title="Critical Strike Chance">{(item.properties.critical_strike_chance / 100).toFixed(2)}%</td>    
                <td className="Range"  title="Weapon Range">{item.properties.range}</td>
            </tr>
        </colgroup>
    );
}


export default WeaponTableLayout;