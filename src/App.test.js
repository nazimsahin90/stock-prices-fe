import { render, queryByAttribute } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import App from './App';

const getById = queryByAttribute.bind(null, 'id');

describe('Smoke test that checks app components are loaded on init', () => {

  const app = render(<App />);
  test('Search dropdown filter is present', () => {
    const searchBar = getById(app.container, 'searchFilter');
    expect(searchBar).toBeVisible();
  });
});
