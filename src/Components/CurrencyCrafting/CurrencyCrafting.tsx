import React, { useContext } from "react";
import "./CurrencyCrafting.css";
import * as imgUrls from "../../Common/imageUrls.json";
import GodPanel from "./GodPanel";
import { CraftingContext } from "../../contexts/ItemContext";

function CurrencyCrafting() {
  const { entityStateMeta, selectCurrency } = useContext(CraftingContext);
  return (
    <div className="craftingArea currencyCraft">
      <div className="currencies">
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Chaos Orb"]
              ? entityStateMeta.statistics["Chaos Orb"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Chaos Orb"
            src={imgUrls.currencies.chaos}
            alt="Chaos Orb"
          />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Orb of Alchemy"]
              ? entityStateMeta.statistics["Orb of Alchemy"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Orb of Alchemy"
            src={imgUrls.currencies.alch}
            alt="Orb of Alchemy"
          />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Exalted Orb"]
              ? entityStateMeta.statistics["Exalted Orb"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Exalted Orb"
            src={imgUrls.currencies.exa}
            alt="Exalted Orb"
          />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Orb of Alteration"]
              ? entityStateMeta.statistics["Orb of Alteration"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Orb of Alteration"
            src={imgUrls.currencies.alt}
            alt="Orb of Alteration"
          />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Orb of Transmutation"]
              ? entityStateMeta.statistics["Orb of Transmutation"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Orb of Transmutation"
            src={imgUrls.currencies.tra}
            alt="Orb of Transmutation"
          />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Orb of Augmentation"]
              ? entityStateMeta.statistics["Orb of Augmentation"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Orb of Augmentation"
            src={imgUrls.currencies.aug}
            alt="Orb of Augmentation"
          />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Regal Orb"]
              ? entityStateMeta.statistics["Regal Orb"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Regal Orb"
            src={imgUrls.currencies.regal}
            alt="Regal Orb"
          />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Orb of Annulment"]
              ? entityStateMeta.statistics["Orb of Annulment"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Orb of Annulment"
            src={imgUrls.currencies.orb}
            alt="Orb of Annulment"
          />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Vaal Orb"]
              ? entityStateMeta.statistics["Vaal Orb"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img title="Vaal Orb" src={imgUrls.currencies.vaal} alt="Vaal Orb" />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Orb of Scouring"]
              ? entityStateMeta.statistics["Orb of Scouring"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Orb of Scouring"
            src={imgUrls.currencies.scour}
            alt="Orb of Scouring"
          />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Blessed Orb"]
              ? entityStateMeta.statistics["Blessed Orb"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Blessed Orb"
            src={imgUrls.currencies.blessed}
            alt="Blessed Orb"
          />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Divine Orb"]
              ? entityStateMeta.statistics["Divine Orb"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Divine Orb"
            src={imgUrls.currencies.divine}
            alt="Divine Orb"
          />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Armourer's Scrap"]
              ? entityStateMeta.statistics["Armourer's Scrap"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Armourer's Scrap"
            src={imgUrls.currencies.scr}
            alt="Armourer's Scrap"
          />
        </button>
        <button
          className="crafting-currency"
          data-count={
            entityStateMeta.statistics["Blacksmith's Whetstone"]
              ? entityStateMeta.statistics["Blacksmith's Whetstone"].count
              : undefined
          }
          onClick={selectCurrency}
          onContextMenu={selectCurrency}
        >
          <img
            title="Blacksmith's Whetstone"
            src={imgUrls.currencies.whe}
            alt="Blacksmith's Whetstone"
          />
        </button>
        {/* 
                <img onClick={selectCurrency} onContextMenu={selectCurrency} data-id="jew" title="Jeweller's Orb" className="crafting-currency" src="http://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketNumbers.png?v=2946b0825af70f796b8f15051d75164d" alt="Jeweller's Orb" />
                <img onClick={selectCurrency} onContextMenu={selectCurrency} data-id="chrom" title="Chromatic Orb" className="crafting-currency" data-original-title="Chromatic Orb" src="http://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketColours.png?v=9d377f2cf04a16a39aac7b14abc9d7c3" alt="Chromatic Orb" />
                <img onClick={selectCurrency} onContextMenu={selectCurrency} data-id="fuse" title="Orb of Fusing" className="crafting-currency" src="http://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketLinks.png?v=0ad7134a62e5c45e4f8bc8a44b95540f" alt="Orb of Fusing" />
                <img onClick={selectCurrency} onContextMenu={selectCurrency} data-id="chance" title="Orb of Chance" className="crafting-currency" src="http://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeRandomly.png?v=e4049939b9cd61291562f94364ee0f00" alt="Orb of Chance" />
                <img onClick={selectCurrency} onContextMenu={selectCurrency} data-id="wis" title="Scroll of Wisdom" className="crafting-currency" data-original-title="Scroll of Wisdom" src="http://web.poecdn.com/image/Art/2DItems/Currency/CurrencyIdentification.png?v=1b9b38c45be95c59d8900f91b2afd58b" alt="Scroll of Wisdom" />
                <img onClick={selectCurrency} onContextMenu={selectCurrency} data-id="orb-of-binding" title="Orb of Binding" className="crafting-currency" src="http://web.poecdn.com/image/Art/2DItems/Currency/BindingOrb.png?v=6ee0528156592a01c2931262d024f842" alt="Orb of Binding" />
                <img onClick={selectCurrency} onContextMenu={selectCurrency} data-id="ancient-orb" title="Ancient Orb" className="crafting-currency" data-original-title="Ancient Orb" src="http://web.poecdn.com/image/Art/2DItems/Currency/AncientOrb.png?v=3edb14b53b9b05e176124814aba86f94" alt="Ancient Orb" />
                <img onClick={selectCurrency} onContextMenu={selectCurrency} data-id="mir" title="Mirror of Kalandra" className="crafting-currency" src="http://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?v=6fd68c1a5c4292c05b97770e83aa22bc" alt="Mirror of Kalandra" />
                <img onClick={selectCurrency} onContextMenu={selectCurrency} data-id="ete" title="Eternal Orb" className="crafting-currency" src="http://web.poecdn.com/image/Art/2DItems/Currency/CurrencyImprintOrb.png?v=0483ded9ac1f08c320fc21d5ddc208c0" alt="Eternal Orb" />
                */}
      </div>
      <GodPanel />
    </div>
  );
}

export default CurrencyCrafting;
