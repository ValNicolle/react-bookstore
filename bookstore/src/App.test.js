import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom'

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it("renders without crashing", () => {
  const div = document.createElement('div')
  ReactDOM.render(<App/>, div)
})

test('renders BookItem correctly', async() => {
  render(<App />) 

  await waitFor(() =>
      screen.findByRole('heading', { name: /Henri Potier à l'école des sorciers/i }),
  )
  screen.getAllByText(/35 €/i)

})
