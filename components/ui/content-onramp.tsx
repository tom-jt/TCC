/**
 * Carries the hero's graph paper down into the top of the page.
 *
 * The hero and the section below it are the same colour — in light mode both
 * are zinc-50 — so there was never a colour step at that join. What made it
 * stark was density: the hero is richly ruled and tinted, and the page under it
 * is very nearly bare. A change that large in texture reads as an edge whether
 * or not the background behind it changes at all.
 *
 * This is the hero's own ruling and its own tint, at the hero's own strength,
 * over the first screen of the page and faded out by a mask. The hero's grid
 * now stops at part strength rather than nothing, and this resumes at that same
 * part strength, so the paper runs out across the join instead of ending at it.
 *
 * All of the styling — and the note on why the two grids line up — is in
 * globals.css under `.content-onramp`.
 */
const ContentOnramp = () => {
  return (
    <div className="content-onramp" aria-hidden="true">
      <div className="content-onramp__paper ruled" />
      <div className="content-onramp__foil ruled-mask" />
    </div>
  );
};

export default ContentOnramp;
