wp.blocks.registerBlockType("quizplugin/quizblock", {
  title: "Quiz Block",
  icon: "smiley",
  category: "common",
  attributes: {
    skyColor: { type: "string" },
    grassColor: { type: "string" },
  },
  edit: function (props) {
    function updateSkyColor(e) {
      props.setAttributes({ skyColor: e.target.value });
    }

    function updateGrassColor(e) {
      props.setAttributes({ grassColor: e.target.value });
    }

    return (
      <div>
        <input
          type="text"
          placeholder="Sky Color"
          onChange={updateSkyColor}
          value={props.attributes.skyColor}
        />
        <input
          type="text"
          placeholder="Grass Color"
          onChange={updateGrassColor}
          value={props.attributes.grassColor}
        />
      </div>
    );
  },
  save: function () {
    return null;
  },
});

// How to get jsx to work?
// install node
// npm init
// npm i @wordpress/scripts -D
// Add build commands
// npm run start
