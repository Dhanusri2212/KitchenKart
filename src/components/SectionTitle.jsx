export default function SectionTitle({ eyebrow, title, action, onAction }) {
  return <div className="section-title">
    <div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2></div>
    {action && <button className="text-action" onClick={onAction}>{action} →</button>}
  </div>;
}