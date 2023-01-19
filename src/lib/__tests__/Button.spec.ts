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

  test('it renders primary/secondary styles', () => {
    const primaryButton = render(Button, { testId: 'primary', primaryAction: true });
    const secondaryButton = render(Button, { testId: 'secondary', primaryAction: false });

    const primaryButtonEl = primaryButton.getByTestId('primary', { exact: true });
    const secondaryButtonEl = secondaryButton.getByTestId('secondary', { exact: true });

    const primaryCSSClass = primaryButtonEl.getAttribute('class');
    const secondaryCSSClass = secondaryButtonEl.getAttribute('class');

    expect(primaryCSSClass).toContain('bg-black text-white');
    expect(secondaryCSSClass).not.toContain('bg-black text-white');
  });

  test('it extends the button components CSS class', () => {
    const extendedCSSContainer = render(Button, { testId: 'extendedClass', class: 'bg-yellow' });
    const defaultCSSContainer = render(Button, { testId: 'defaultClass' });

    const extendedCSSButton = extendedCSSContainer.getByTestId('extendedClass', { exact: true });
    const defaultCSSButton = defaultCSSContainer.getByTestId('defaultClass', { exact: true });

    const extendedCSSClass = extendedCSSButton.getAttribute('class');
    const defaultCSSClass = defaultCSSButton.getAttribute('class');

    expect(extendedCSSClass).toContain('bg-yellow');
    expect(defaultCSSClass).not.toContain('bg-yellow');
  });
});
