import React from "react";

function About() {
  return (
    <div className="About">
      <h1>Path of Exile - Stash</h1>
      <h3>
        Welcome to Stash. A website that is trying to emulate the crafting
        system of the ARpg Path of Exile.
      </h3>
      The goal of this tool is to provide an authentic crafting experience that
      stays true to the game systems as well as providing
      <br />
      valuable insight into the system, that can help you get better results
      when crafting in game.
      <br /> There is a lot of features that is yet to be implemented, and
      likely some bugs as well. I would love to hear feature
      <br />
      suggestions and also about the bugs you encounter, feel free to contact me
      at: mail: <i>fkoe90@gmail.com</i> discord: <i>Planken#8344</i>.
      <br />
      <br />
      <br />
      <h3> Planned features</h3>
      <b>
        ( that i'm working on currently, or will work on whenever i have the
        time. )
      </b>
      <ul style={{ listStyleType: "circle" }}>
        <li>
          Item stats
          <ul style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            <li>Weapons: Dps, Ele. Dps, Phys. Dps, Aps, Crit</li>
          </ul>
          <ul style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            <li>Armour: Armour, Evasion, Energy Shield.</li>
          </ul>
          <ul style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            <li>Likely others</li>
          </ul>
        </li>
      </ul>
      <br />
      <ul style={{ listStyleType: "circle" }}>
        <li>
          Copy Paste Feature
          <ul style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            <li>
              Right now you can CTRL + C while hovering an item in PoE and it
              will copy a text representation of the item to clipboard.
              <br /> This feature would allow users to paste items into this
              website and that way get their item in this tool, and then be able
              to craft
              <br /> and see possible outcomes.
            </li>
          </ul>
          <ul style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            <li>Paste into website</li>
            <li>Copy item from website</li>
          </ul>
        </li>
      </ul>
      <br />
      <ul style={{ listStyleType: "circle" }}>
        <li>
          Info buttons that explains some of the less intuitive features, and
          also how things are calculated
        </li>
      </ul>
      <br />
      <ul style={{ listStyleType: "circle" }}>
        <li>
          Master Crafting
          <ul style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            <li>Add to the manual affix tab</li>
          </ul>
          <ul style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            <li>
              Separate tab with costs ( basically same menu as the one you find
              in game )
            </li>
          </ul>
        </li>
      </ul>
      <br />
      <ul style={{ listStyleType: "circle" }}>
        <li>
          Delve Crafting
          <ul style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            <li>Add to the manual affix tab</li>
          </ul>
          <ul style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            <li>
              Separate tab that allows similar usage of resonators to in game
            </li>
            <li>Some way of showing possible outcomes with selected fossils</li>
          </ul>
        </li>
      </ul>
      <br />
      <ul style={{ listStyleType: "circle" }}>
        <li>Save state in browser so it's not lost on refresh</li>
        <ul style={{ listStyleType: "circle", listStylePosition: "inside" }}>
          <li>With this i will also look into making an "undo" feature</li>
        </ul>
      </ul>
      <br />
      <ul style={{ listStyleType: "circle" }}>
        <li>Bestiary Crafting</li>
        <ul style={{ listStyleType: "circle", listStylePosition: "inside" }}>
          <li>When everything else is done i'll start thinking about this</li>
        </ul>
      </ul>
      <br />
      <br />
      <br />
      <br />
      <h2 style={{ textAlign: "center" }}>Credits</h2>
      <p>
        <a href="http://www.grindinggear.com/" style={{ color: "wheat" }}>
          Grinding Gear Games
        </a>{" "}
        for{" "}
        <a href="https://www.pathofexile.com/" style={{ color: "wheat" }}>
          Path of Exile
        </a>
        . The contents of all data files belong to them.
      </p>
      <p>
        <a href="https://github.com/brather1ng" style={{ color: "wheat" }}>
          brather1ng
        </a>{" "}
        for answering all my questions and for providing{" "}
        <a
          href="https://github.com/brather1ng/RePoE"
          style={{ color: "wheat" }}
        >
          RePoE
        </a>
      </p>
      <p>
        <a href="https://github.com/OmegaK2/" style={{ color: "wheat" }}>
          OmegaK2
        </a>{" "}
        for{" "}
        <a href="https://github.com/OmegaK2/PyPoE" style={{ color: "wheat" }}>
          PyPoE
        </a>
        . While my app is written in typescript, some methods of it is 1:1
        rewrites of the Python code written in this project
      </p>
    </div>
  );
}

export default About;
