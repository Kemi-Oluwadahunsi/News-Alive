import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Header from "../Header";

// Mock the framer-motion module
vi.mock("framer-motion", () => ({
  motion: {
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock the useLocation hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({
      pathname: "/",
    }),
  };
});

describe("Header", () => {
  it("renders the logo and navigation links", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Check if the logo is present
    const logoElement = screen.getByText("News");
    const logoHighlight = screen.getByText("Alive");
    expect(logoElement).toBeInTheDocument();
    expect(logoHighlight).toBeInTheDocument();

    // Check if navigation links are present in desktop view
    const homeLink = screen.getByRole("link", { name: /home/i });
    const articlesLink = screen.getByRole("link", { name: /articles/i });
    const aboutLink = screen.getByRole("link", { name: /about/i });
    const contactLink = screen.getByRole("link", { name: /contact/i });

    expect(homeLink).toBeInTheDocument();
    expect(articlesLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  it("opens and closes mobile menu", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Check if menu button is present
    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();

    // Open mobile menu
    fireEvent.click(menuButton);

    // Check if mobile menu links are present
    const mobileHomeLink = screen.getAllByRole("link", { name: /home/i })[1];
    const mobileArticlesLink = screen.getAllByRole("link", {
      name: /articles/i,
    })[1];
    const mobileAboutLink = screen.getAllByRole("link", { name: /about/i })[1];
    const mobileContactLink = screen.getAllByRole("link", {
      name: /contact/i,
    })[1];

    expect(mobileHomeLink).toBeInTheDocument();
    expect(mobileArticlesLink).toBeInTheDocument();
    expect(mobileAboutLink).toBeInTheDocument();
    expect(mobileContactLink).toBeInTheDocument();

    // Close mobile menu
    fireEvent.click(menuButton);

    // Check if mobile menu links are not visible
    expect(screen.queryAllByRole("link", { name: /home/i })).toHaveLength(1);
    expect(screen.queryAllByRole("link", { name: /articles/i })).toHaveLength(
      1
    );
    expect(screen.queryAllByRole("link", { name: /about/i })).toHaveLength(1);
    expect(screen.queryAllByRole("link", { name: /contact/i })).toHaveLength(1);
  });
});
