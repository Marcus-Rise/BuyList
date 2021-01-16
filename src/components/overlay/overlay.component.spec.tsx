import { fireEvent, render, screen } from "@testing-library/react";
import { Overlay } from "./overlay.component";
import React from "react";

describe("Overlay", () => {
  test("close on click", () => {
    const text = "awd";
    const onClose = jest.fn();
    render(<Overlay onClose={onClose}>{text}</Overlay>);

    fireEvent.click(screen.getByText(text));
    expect(onClose).toBeCalledTimes(1);
  });
});
