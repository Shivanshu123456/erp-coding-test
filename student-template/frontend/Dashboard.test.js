import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';

global.fetch = jest.fn();

describe('Dashboard Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('shows loading state initially', () => {
    render(<Dashboard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders table when alerts are returned', async () => {
    const mockData = [
      {
        id: '1',
        product_name: 'Widget',
        quantity: 5,
        reorder_level: 10,
      },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Widget')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });

  test('shows fallback message when alerts is empty', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(
        screen.getByText('All inventory levels are healthy.')
      ).toBeInTheDocument();
    });
  });
});
