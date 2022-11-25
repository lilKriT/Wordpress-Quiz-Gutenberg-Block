import "./index.scss";
import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Button,
  Icon,
  PanelBody,
  PanelRow,
  ColorPicker,
} from "@wordpress/components";
import {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
} from "@wordpress/block-editor";
import { ChromePicker } from "react-color";

// This trick will let you run a function without a name (immediately invoked function expression)
(function () {
  // this will run any time content changes
  let locked = false;

  wp.data.subscribe(function () {
    const results = wp.data
      .select("core/block-editor")
      .getBlocks()
      .filter((block) => {
        return (
          block.name == "quizplugin/quizblock" &&
          block.attributes.correctAnswer == undefined
        );
      });

    // console.log(results.length);

    if (results.length > 0 && locked == false) {
      locked = true;
      wp.data.dispatch("core/editor").lockPostSaving("noanswer");
    }

    if (!results.length && locked) {
      locked = false;
      wp.data.dispatch("core/editor").unlockPostSaving("noanswer");
    }
  });
})();

wp.blocks.registerBlockType("quizplugin/quizblock", {
  title: "Quiz Block",
  icon: "smiley",
  category: "common",
  attributes: {
    question: { type: "string" },
    answers: { type: "array", default: [undefined] },
    correctAnswer: { type: "number", default: undefined },
    bgColor: { type: "string", default: "#ebebeb" },
    questionAlignment: { type: "string", default: "left" },
  },
  edit: EditComponent,
  save: function () {
    return null;
  },
  example: {
    attributes: {
      question: "Whats your name?",
      answers: ["John", "Jim", "James"],
      correctAnswer: 3,
      bgColor: "#CFE8F1",
      questionAlignment: "center",
    },
  },
  description: "A block that allows you to add a quiz to the post.",
});

function EditComponent(props) {
  function updateQuestion(value) {
    props.setAttributes({ question: value });
  }

  function deleteAnswer(indexToDelete) {
    // console.log("Hey");
    const newAnswers = props.attributes.answers.filter((x, index) => {
      return index != indexToDelete;
    });
    props.setAttributes({ answers: newAnswers });

    if (indexToDelete == props.attributes.correctAnswer) {
      props.setAttributes({ correctAnswer: undefined });
    }

    if (indexToDelete < props.attributes.correctAnswer) {
      let newAnswer = props.attributes.correctAnswer - 1;
      props.setAttributes({ correctAnswer: newAnswer });
    }
  }

  function markAsCorrect(index) {
    props.setAttributes({ correctAnswer: index });
  }

  // TextControl is a WordPress element
  // FlexBlock takes all the space it can
  // FlexItem only takes as much as it needs
  return (
    <div
      className="quizEditBlock"
      style={{ backgroundColor: props.attributes.bgColor }}
    >
      <BlockControls>
        <AlignmentToolbar
          value={props.attributes.questionAlignment}
          onChange={(e) => props.setAttributes({ questionAlignment: e })}
        />
      </BlockControls>
      <InspectorControls>
        <PanelBody title="Background Color" initialOpen={true}>
          <PanelRow>
            <ChromePicker
              color={props.attributes.bgColor}
              onChangeComplete={(e) => {
                props.setAttributes({ bgColor: e.hex });
              }}
              disableAlpha={true}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <TextControl
        label="Question:"
        value={props.attributes.question}
        onChange={updateQuestion}
        style={{ fontSize: "20px" }}
      />
      <p style={{ fontSize: 13, margin: "20px 0 8px" }}>Answers:</p>

      {props.attributes.answers.map(function (answer, index) {
        return (
          <Flex>
            <FlexBlock>
              <TextControl
                value={answer}
                onChange={(newValue) => {
                  const newAnswers = props.attributes.answers.concat([]);
                  newAnswers[index] = newValue;
                  props.setAttributes({ answers: newAnswers });
                }}
                autoFocus={answer == undefined}
              />
            </FlexBlock>
            <FlexItem>
              <Button onClick={() => markAsCorrect(index)}>
                <Icon
                  className="markAsCorrect"
                  icon={
                    index == props.attributes.correctAnswer
                      ? "star-filled"
                      : "star-empty"
                  }
                />
              </Button>
            </FlexItem>
            <FlexItem>
              <Button
                isLink
                className="delete"
                onClick={() => deleteAnswer(index)}
              >
                Delete
              </Button>
            </FlexItem>
          </Flex>
        );
      })}

      <Button
        variant="primary"
        onClick={() => {
          props.setAttributes({
            answers: props.attributes.answers.concat([undefined]),
          });
        }}
      >
        Add another answer
      </Button>
    </div>
  );
}

// How to get jsx to work?
// install node
// npm init
// npm i @wordpress/scripts -D
// Add build commands
// npm run start
