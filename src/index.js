import "./index.scss";
import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Button,
  Icon,
} from "@wordpress/components";

wp.blocks.registerBlockType("quizplugin/quizblock", {
  title: "Quiz Block",
  icon: "smiley",
  category: "common",
  attributes: {
    skyColor: { type: "string" },
    grassColor: { type: "string" },
  },
  edit: EditComponent,
  save: function () {
    return null;
  },
});

function EditComponent(props) {
  function updateSkyColor(e) {
    props.setAttributes({ skyColor: e.target.value });
  }

  function updateGrassColor(e) {
    props.setAttributes({ grassColor: e.target.value });
  }

  // TextControl is a WordPress element
  // FlexBlock takes all the space it can
  // FlexItem only takes as much as it needs
  return (
    <div className="quizEditBlock">
      <TextControl label="Question:" style={{ fontSize: "20px" }} />
      <p style={{ fontSize: 13, margin: "20px 0 8px" }}>Answers:</p>
      <Flex>
        <FlexBlock>
          <TextControl />
        </FlexBlock>
        <FlexItem>
          <Button>
            <Icon className="markAsCorrect" icon="star-empty" />
          </Button>
        </FlexItem>
        <FlexItem>
          <Button isLink className="delete">
            Delete
          </Button>
        </FlexItem>
      </Flex>
      <Button variant="primary">Add another answer</Button>
    </div>
  );
}

// How to get jsx to work?
// install node
// npm init
// npm i @wordpress/scripts -D
// Add build commands
// npm run start
