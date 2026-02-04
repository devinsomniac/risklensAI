type ShapReason = {
  feature: string;
  impact: number; // 
};

export function ShapReasons({ reasons }: { reasons: ShapReason[] }) {
  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-sm font-semibold text-[#003d5c]">
        Key Risk Drivers (SHAP)
      </h3>

      {reasons.map((r, i) => (
        <div
          key={i}
          className="flex justify-between items-center bg-slate-50 border-l-4 border-[#003d5c] px-4 py-2"
        >
          <span className="text-sm text-slate-700">{r.feature}</span>
          <span
            className={`text-sm font-semibold ${
              r.impact > 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {r.impact > 0 ? "+" : ""}
            {r.impact.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}
