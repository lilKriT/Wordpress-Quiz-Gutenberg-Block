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
    question: { type: "string" },
    answers: { type: "array", default: ["red", "blue"] },
    correctAnswer: { type: "number", default: undefined },
  },
  edit: EditComponent,
  save: function () {
    return null;
  },
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
  }

  // TextControl is a WordPress element
  // FlexBlock takes all the space it can
  // FlexItem only takes as much as it needs
  return (
    <div className="quizEditBlock">
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
              <Button>
                <Icon className="markAsCorrect" icon="star-empty" />
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
