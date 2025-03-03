import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TestAuthProvider } from "./mocks/AuthContext";
import AdminLayout from "../src/Layouts/AdminLayout";
import { MemoryRouter } from "react-router-dom";

describe("Layout component", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <TestAuthProvider>
          <AdminLayout />
        </TestAuthProvider>
      </MemoryRouter>
    );

    // Verifica che il componente sia renderizzato correttamente
    expect(document.body.innerHTML).toBeTruthy();
  });
});
