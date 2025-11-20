import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FlashcardDeck from '../components/FlashcardDeck';

const cards = [
  { prompt: 'Step 1', answer: 'Mix ingredients' },
  { prompt: 'Step 2', answer: 'Bake for 20 min' },
];

describe('FlashcardDeck', () => {
  it('renders prompt and answer', () => {
    render(<FlashcardDeck cards={cards} />);
    expect(screen.getByText(/Step 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Mix ingredients/i)).toBeInTheDocument();
  });

  it('navigates between cards', async () => {
    const user = userEvent.setup();
    render(<FlashcardDeck cards={cards} />);
    await user.click(screen.getByRole('button', { name: /Next/i }));
    expect(screen.getByText(/Step 2/i)).toBeInTheDocument();
  });
});

