import {
  getKnobsInput,
  commonDataElementInputPreview,
} from "../../locators";

When("I put {string} example grouped character in no Iframe", (text) => {
  commonDataElementInputPreview()
    .clear()
    .type(text, { delay: 1000, force: true });
});

Then("example grouped character is {string}", (text) => {
  commonDataElementInputPreview().should("have.value", text);
});

When(
  "I input json to {string} input field the {string}",
  (inputFieldName, value) => {
    cy.fixture("groupedCharacter.json").then(($json) => {
      switch (value) {
        case "first":
          getKnobsInput(inputFieldName)
            .clear()
            .then(($selector) => $selector.val(JSON.stringify($json[0][value])))
            .type(" ");
          break;
        case "second":
          getKnobsInput(inputFieldName)
            .clear()
            .then(($selector) => $selector.val(JSON.stringify($json[1][value])))
            .type(" ");
          break;
        case "third":
          getKnobsInput(inputFieldName)
            .clear()
            .then(($selector) => $selector.val(JSON.stringify($json[2][value])))
            .type(" ");
          break;
        default:
          throw new Error(
            "There are only three array objects in groupedCharacter.json"
          );
      }
    });
  }
);
