const StatCard = ({ label, value, trend }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
    <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    {trend && <p className="mt-1 text-xs text-emerald-500">{trend}</p>}
  </div>
);

export default StatCard;

