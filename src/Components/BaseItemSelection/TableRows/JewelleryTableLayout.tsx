import React, { useContext } from 'react';
import {getModById, getImgUrlFromBaseItem} from '../../../Common/Crafting/CraftingUtil';
import {getModDescription} from '../../../Common/Crafting/Translation';
import '../BaseItemSelection.css';
import { CraftingContext } from '../../../contexts/ItemContext';
import { changeBaseItem } from '../../../reducers/itemReducer/actions/changeBaseItem';


function JewelleryTableLayout({item}) {
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
                <td className="name" rowSpan={2} colSpan={2}>{item.name}</td>
                <td className="level" rowSpan={2} title="Level">{item.drop_level}</td>
                <td className="implicit" rowSpan={2} title="Implicit Mod" colSpan={5}>{implicits}</td>         
            </tr>
            <tr></tr>
        </colgroup>
    );
}


export default JewelleryTableLayout;