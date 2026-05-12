import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AuditPage() {
  const { id } = useParams();

  const [audit, setAudit] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/audit/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAudit(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!audit) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Audit...
      </div>
    );
  }

  const totalSavings = audit.results.reduce(
    (total, item) => total + item.savings,
    0
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">
        Shared AI Spend Audit
      </h1>

      <div className="bg-green-600 p-6 rounded-2xl mb-8 max-w-3xl">
        <h2 className="text-3xl font-bold mb-2">
          Potential Savings
        </h2>

        <p className="text-2xl">
          ${totalSavings}/month
        </p>

        <p className="text-xl">
          ${totalSavings * 12}/year
        </p>
      </div>

      {audit.results.map((result, index) => (
        <div
          key={index}
          className="bg-zinc-900 p-6 rounded-2xl mb-4 max-w-3xl"
        >
          <h2 className="text-2xl font-bold mb-2">
            {result.tool}
          </h2>

          <p className="mb-2">
            Current Plan: {result.currentPlan}
          </p>

          <p className="mb-2 text-green-400">
            Recommendation: {result.recommendation}
          </p>

          <p className="mb-2">
            Savings: ${result.savings}/month
          </p>

          <p className="text-gray-400">
            {result.reason}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AuditPage;