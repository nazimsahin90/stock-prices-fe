import { render, screen, queryByAttribute } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import App from './App';

const getById = queryByAttribute.bind(null, 'id');
const app = render(<App />);

test('Search dropdown filter is present', () => {
  const searchBar = getById(app.container, 'search-dropdown');
  expect(searchBar).toBeVisible();
});

test('Starting text is present', () => {
  render(<App />);
  const linkElement = screen.getByText(/Add stocks to compare historical prices/i);
  expect(linkElement).toBeInTheDocument();
});
