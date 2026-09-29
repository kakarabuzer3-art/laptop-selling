type SpecTableProps = {
  rows: Array<{ label: string; value: string }>;
  caption: string;
};

/** Semantic two-column specification table — real <table>, real scopes. */
export function SpecTable({ rows, caption }: SpecTableProps) {
  return (
    <table className="spec-table w-full border-collapse text-left">
      <caption className="caption sr-only">{caption}</caption>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-t border-line">
            <th scope="row" className="caption w-[38%] py-4 pr-6 align-top font-normal sm:w-[30%]">
              {row.label}
            </th>
            <td className="py-4 text-sm text-fog-200 sm:text-[0.9375rem]">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
