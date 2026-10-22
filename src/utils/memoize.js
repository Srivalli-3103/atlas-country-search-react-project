/**
 * Tiny stand-in for reselect: builds a selector that recomputes only when one of its
 * input selectors returns a different value (reference equality) than last time.
 */
export function createMemoizedSelector(inputSelectors, compute) {
  let lastInputs = null;
  let lastResult;

  return (state) => {
    const inputs = inputSelectors.map((select) => select(state));
    const unchanged = lastInputs && inputs.every((value, i) => value === lastInputs[i]);
    if (unchanged) return lastResult;
    lastInputs = inputs;
    lastResult = compute(...inputs);
    return lastResult;
  };
}
