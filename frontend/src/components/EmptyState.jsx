const EmptyState = ({ title = 'Nothing to display', description, action }) => (
  <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
    <p className="text-lg font-semibold text-slate-800">{title}</p>
    {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
    {action && <div className="mt-6 flex justify-center">{action}</div>}
  </div>
);

export default EmptyState;

