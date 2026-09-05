export default function SummaryBar({ total, favorites }) {
  return (
    <div className="stats shadow w-full">
      {/* TODO: two <div className="stat"> blocks.
          - First: title "Total Recipes", value {total}
          - Second: title "Favorites", value {favorites} ★
      */}
      <div className="stat-title">
        {total}
      </div>

      <div className="stat-value">
        {favorites}⭐
      </div>
    </div>
  );
}
