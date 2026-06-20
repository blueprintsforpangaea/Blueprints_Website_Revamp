import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";

export default function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
}) {
  // TODO: animate from 0 -> value when scrolled into view (use useScrollAnimation)
  const { ref, isVisible } = useScrollAnimation();
  const displayed = isVisible ? value : 0;

  return (
    <div className="stat" ref={ref}>
      <span className="statValuee">
        {prefix}
        {displayed.toLocaleString()}
        {suffix}
      </span>
      <span className="stat__label">{label}</span>
    </div>
  );
}
