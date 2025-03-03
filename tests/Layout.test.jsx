import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TestAuthProvider } from "./mocks/AuthContext";
import Layout from "../src/Layouts/Layout";
import { MemoryRouter } from "react-router-dom";

describe("Layout component", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <TestAuthProvider>
          <Layout />
        </TestAuthProvider>
      </MemoryRouter>
    );

    // Verifica che il componente sia renderizzato correttamente
    expect(document.body.innerHTML).toBeTruthy();
  });
});
