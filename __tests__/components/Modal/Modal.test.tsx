import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Modal } from '../../../src/components';

describe('Modal component tests', () => {
  const handleClose = vi.fn();
  const props = {
    isOpen: true,
    onClose: () => {},
    children: <p>Modal body</p>,
    headerTitle: 'Modal title',
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render correctly with default props', () => {
    render(
      <Modal isOpen={false} onClose={handleClose}>
        {props.children}
      </Modal>
    );
    expect(screen.queryByText('Modal body')).toBeNull();
  });

  test('should render modal content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={handleClose}>
        {props.children}
      </Modal>
    );
    expect(screen.getByText('Modal body')).toBeInTheDocument();
  });

  test('should call onClose when the close button is clicked', async () => {
    render(
      <Modal isOpen={true} onClose={handleClose}>
        {props.children}
      </Modal>
    );
    fireEvent.click(screen.getByRole('button', { name: '×' }));

    await waitFor(
      () => {
        expect(handleClose).toHaveBeenCalled();
      },
      { timeout: 200 }
    );
  });

  test('should apply the header title prop', () => {
    render(
      <Modal
        isOpen={true}
        onClose={handleClose}
        headerTitle={props.headerTitle}
      >
        {props.children}
      </Modal>
    );
    expect(screen.getByText(props.headerTitle)).toBeInTheDocument();
  });
});
