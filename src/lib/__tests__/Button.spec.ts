import { fireEvent, render } from '@testing-library/svelte';
import { vi } from 'vitest';

import Button from '../Button.svelte';

describe('Button Component', () => {
  test('it calls click handler', () => {
    const clickHandler = {
      mock: vi.fn(),
    };

    const spy = vi.spyOn(clickHandler, 'mock');

    const { getByTestId } = render(Button, { testId: 'testId', onClickHandler: clickHandler.mock });
    const button = getByTestId('testId', { exact: true });

    fireEvent(button, new MouseEvent('click'));

    expect(spy).toHaveBeenCalled();
  });
});
