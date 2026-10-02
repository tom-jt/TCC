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
 * All the styling lives in globals.css under `.ambient`. It is the hero's
 * graph paper — the same ruling, from the same `.ruled` class and the same
 * --rule-minor — inked far lighter, with the same iridescence resting in the
 * rules and two faint washes behind it. Deliberately still: the hero is a place
 * to look at and can afford a sheen crossing it, while everything down here is
 * a place to read.
 */
const AmbientBackground = () => {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-stage">
        <div className="ambient-wash" />
        <div className="ambient-rules">
          <div className="ambient-grid ruled" />
          <div className="ambient-foil ruled-mask" />
        </div>
      </div>
    </div>
  );
};

export default AmbientBackground;
