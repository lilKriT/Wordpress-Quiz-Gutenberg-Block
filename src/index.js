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
      <TextControl label="Question:" />
      <p>Answers:</p>
      <Flex>
        <FlexBlock>
          <TextControl />
        </FlexBlock>
        <FlexItem>
          <Button>
            <Icon icon="star-empty" />
          </Button>
        </FlexItem>
        <FlexItem>
          <Button>Delete</Button>
        </FlexItem>
      </Flex>
    </div>
  );
}

// How to get jsx to work?
// install node
// npm init
// npm i @wordpress/scripts -D
// Add build commands
// npm run start
