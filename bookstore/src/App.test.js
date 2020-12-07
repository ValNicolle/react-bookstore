import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'


it("renders without crashing", () => {
  const div = document.createElement('div')
  ReactDOM.render(<App/>, div)
})

// it('renders empty app correctly', () => { 
//   act(() => {
//   const tree = renderer
//     .create(<App/>)
//     .toJSON();
//   })
//   expect(tree).toMatchSnapshot();
// });

test('renders BookItem correctly', async() => {
  render(<App />) 
  await waitFor(() =>
      screen.findByRole('heading', { name: /Henri Potier à l'école des sorciers/i }),
  )
  screen.getAllByText(/35 €/i)

})

test('display empty minicart', ()=>{
  // render(<App/>)
  // screen.getByTestId('MiniCart').toHaveTextContent('0')
  const { container } = render(<App />)
  const foo = container.querySelector('[data-testid="MiniCart"]')
  expect(foo).toHaveTextContent('0')
})

 
