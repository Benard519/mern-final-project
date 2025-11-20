import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeFilters from '../components/RecipeFilters';

describe('RecipeFilters', () => {
  it('emits search value changes', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <RecipeFilters
        values={{ search: '', category: '', difficulty: '', maxPrepTime: 0 }}
        onChange={onChange}
      />
    );

    const input = screen.getByPlaceholderText(/Search by title/i);
    await user.type(input, 'pasta');
    expect(onChange).toHaveBeenCalled();
  });
});

