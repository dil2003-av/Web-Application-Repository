export default function PanelHeader({ title, notice }) {
  return (
    <div className="panel-title-wrap">
      <h2>{title}</h2>
      <span className={"status-pill " + notice.type}>{notice.message}</span>
    </div>
  );
}
