import { render } from '@testing-library/svelte';

import Container from '../Container.svelte';

describe('Container Component', () => {
  test('it extends the container components CSS class', () => {
    const extendedCSSContainer = render(Container, {
      testId: 'extendedClass',
      class: 'bg-yellow',
    });
    const defaultCSSContainer = render(Container, { testId: 'defaultClass' });

    const extendedCSSContainerEl = extendedCSSContainer.getByTestId(
      'extendedClass',
      {
        exact: true,
      }
    );
    const defaultCSSContainerEl = defaultCSSContainer.getByTestId(
      'defaultClass',
      { exact: true }
    );

    const extendedCSSClass = extendedCSSContainerEl.getAttribute('class');
    const defaultCSSClass = defaultCSSContainerEl.getAttribute('class');

    expect(extendedCSSClass).toContain('bg-yellow');
    expect(defaultCSSClass).not.toContain('bg-yellow');
  });
});
