import { initializeState, actions } from './assets/js/state.js';
import { checkNodes, render } from './assets/js/dom.js';
import { init } from './assets/js/app.js';

init(document, {
  initializeState,
  actions,
  checkNodes,
  render,
});

export {
  initializeState,
  actions,
  init,
};

