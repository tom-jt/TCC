/**
 * Decorative page background.
 *
 * This replaces the pair of full-page particle canvases that used to sit here.
 * Those sized their backing store to the *whole scrollable page* times the
 * device pixel ratio and repainted a thousand particles every frame for as long
 * as the tab was open. This is a ruled grid and one wash on a sticky, viewport-
 * sized stage: no canvas, no animation frame loop, and no client JavaScript, so
 * it renders on the server and costs nothing to keep on screen.
 *
 * All the styling lives in globals.css under `.ambient`. It is deliberately
 * still: a ruled grid with one ochre wash behind it, rather than the drifting
 * blue/indigo/violet orbs this replaced.
 */
const AmbientBackground = () => {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-stage">
        <div className="ambient-wash" />
        <div className="ambient-grid" />
      </div>
    </div>
  );
};

export default AmbientBackground;
