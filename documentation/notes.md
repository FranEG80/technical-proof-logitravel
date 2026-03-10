# Development Notes

## Technical Vanilla JS

- The mockup follows a very static approach, with absolute positioning and fixed width/height values to replicate the design faithfully.
- The height was adjusted to be dynamic, although it could remain fixed if strict pixel-perfect layout fidelity is required.
- Because fixed dimensions are used, absolute positioning is kept in the main frame.
- In a real product scenario, a centered container with `display: flex` and responsive behavior would be the recommended approach.
- In the modal, the height has been set to the design's minimum to prevent content from overflowing when displaying errors.

## Technical React + TypeScript

- In this version, the absolute sizing approach from `technical-vanilla-js` was avoided, prioritizing centered layout and composition using `flex` and `grid`.
- `styled-components` was chosen. Although `CSS Modules` is often a lighter and more maintainable option today, `styled-components` is still useful for style encapsulation per component.
- `styled-components` works similarly to SASS in terms of composition, wrapping elements/components and applying co-located styles.
- For small projects, proof of concepts, or fast iterations, `Tailwind CSS` can be a very productive alternative.
- `RxJS` was included because the job posting requested knowledge of it. It remains especially useful for streams, event coordination, and complex async flows, although in React it is usually not the default option compared to Redux, Zustand, or React Query.
