import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Note from "./Note";

test("Render Content", () => {
  const note = {
    content: "This is a test",
    important: true,
  };
  const component = render(<Note note={note} />);
  component.getAllByText("This is a test");
  component.getAllByText("make not important");
  //   expect(component.container).toHaveTextContent(note.content)
  // const li=component.container.querySelector('li')
  // console.log(prettyDOM(li))
});

test("Clicking the button calls event handler once", () => {
  const note = {
    content: "This is a test",
    important: true,
  };
  const mockHandler = jest.fn();
  const component = render(<Note note={note} toggleImportance={mockHandler} />);
  const button = component.getByText("make not important");
  fireEvent.click(button);
  expect(mockHandler).toHaveBeenCalledTimes(1);
});
