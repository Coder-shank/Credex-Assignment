import { useEffect, useState } from "react";
import { generateAudit } from "./utils/auditEngine";
import pricingData from "./data/pricingData";

function App() {
  const [email, setEmail] = useState("");
const [company, setCompany] = useState("");
const [role, setRole] = useState("");
  const [tools, setTools] = useState(() => {
    const savedTools = localStorage.getItem("ai-tools");

    return savedTools
      ? JSON.parse(savedTools)
      : [
          {
            tool: "",
            plan: "",
            spend: "",
            seats: "",
            useCase: "",
          },
        ];
  });

  const [auditResults, setAuditResults] = useState([]);
  const [auditId, setAuditId] = useState("");

  useEffect(() => {
    localStorage.setItem("ai-tools", JSON.stringify(tools));
  }, [tools]);

  const handleAudit = async () => {
    const results = generateAudit(tools);

    setAuditResults(results);

    try {
      const response = await fetch(
        "http://localhost:5000/save-audit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tools,
            results,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setAuditId(data.auditId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalMonthlySavings = auditResults.reduce(
    (total, item) => total + item.savings,
    0
  );

  const totalAnnualSavings = totalMonthlySavings * 12;


  const handleChange = (index, field, value) => {
  const updatedTools = [...tools];

  updatedTools[index][field] = value;

  if (field === "tool") {
    updatedTools[index].plan = "";
  }

  setTools(updatedTools);
};  


  const addTool = () => {
    setTools([
      ...tools,
      {
        tool: "",
        plan: "",
        spend: "",
        seats: "",
        useCase: "",
      },
    ]);
  };

  const clearForm = () => {
    localStorage.removeItem("ai-tools");

    setTools([
      {
        tool: "",
        plan: "",
        spend: "",
        seats: "",
        useCase: "",
      },
    ]);

    setAuditResults([]);
    setAuditId("");
  };
  const saveLead = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/save-lead",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          company,
          role,
          auditId,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Lead saved successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
 return (
  <div className="min-h-screen bg-black text-white p-8">
    <h1 className="text-4xl font-bold mb-2">
      StackSense
    </h1>

    <p className="text-gray-400 mb-8">
      Find hidden savings in your AI tool stack.
    </p>

    {tools.map((item, index) => (
      <div
        key={index}
        className="bg-zinc-900 p-6 rounded-xl mb-6 max-w-2xl"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Tool {index + 1}
        </h2>

        <select
          value={item.tool}
          onChange={(e) =>
            handleChange(index, "tool", e.target.value)
          }
          className="w-full p-3 rounded-lg bg-zinc-800 mb-4"
        >
          <option value="">Select Tool</option>
          <option value="ChatGPT">ChatGPT</option>
          <option value="Claude">Claude</option>
          <option value="Cursor">Cursor</option>
          <option value="GitHub Copilot">
            GitHub Copilot
          </option>
          <option value="Gemini">Gemini</option>
        </select>

        <select
          value={item.plan}
          onChange={(e) =>
            handleChange(index, "plan", e.target.value)
          }
          className="w-full p-3 rounded-lg bg-zinc-800 mb-4"
        >
          <option value="">Select Plan</option>

          {item.tool &&
            Object.keys(
              pricingData[item.tool] || {}
            ).map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
        </select>

        <input
          type="number"
          placeholder="Monthly Spend ($)"
          value={item.spend}
          onChange={(e) =>
            handleChange(index, "spend", e.target.value)
          }
          className="w-full p-3 rounded-lg bg-zinc-800 mb-4"
        />

        <input
          type="number"
          placeholder="Seats"
          value={item.seats}
          onChange={(e) =>
            handleChange(index, "seats", e.target.value)
          }
          className="w-full p-3 rounded-lg bg-zinc-800 mb-4"
        />

        <select
          value={item.useCase}
          onChange={(e) =>
            handleChange(index, "useCase", e.target.value)
          }
          className="w-full p-3 rounded-lg bg-zinc-800"
        >
          <option value="">Select Use Case</option>
          <option value="coding">Coding</option>
          <option value="writing">Writing</option>
          <option value="research">Research</option>
          <option value="data">Data</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>
    ))}

    <div className="flex flex-wrap gap-4">
      <button
        onClick={addTool}
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
      >
        Add Another Tool
      </button>

      <button
        onClick={handleAudit}
        className="bg-green-500 px-6 py-3 rounded-lg font-semibold"
      >
        Generate Audit
      </button>

      <button
        onClick={clearForm}
        className="bg-red-500 px-6 py-3 rounded-lg font-semibold"
      >
        Clear
      </button>
    </div>

    {auditResults.length > 0 && (
      <>
        <div className="bg-green-600 p-8 rounded-2xl max-w-3xl mb-10 mt-10">
          <h2 className="text-4xl font-bold mb-4">
            Potential Savings Found
          </h2>

          <p className="text-2xl mb-2">
            Monthly Savings: $
            {totalMonthlySavings}
          </p>

          <p className="text-2xl">
            Annual Savings: $
            {totalAnnualSavings}
          </p>

          {totalMonthlySavings > 500 && (
            <div className="mt-4 bg-black p-4 rounded-xl">
              <p className="text-lg font-semibold text-yellow-400">
                Your team may benefit significantly
                from discounted AI infrastructure
                credits through Credex.
              </p>
            </div>
          )}

          {totalMonthlySavings < 100 && (
            <div className="mt-4 bg-black p-4 rounded-xl">
              <p className="text-lg font-semibold text-blue-300">
                Your current AI spending appears
                relatively optimized.
              </p>
            </div>
          )}
        </div>

        {auditId && (
          <div className="bg-zinc-800 p-4 rounded-xl max-w-3xl mb-6">
            <p className="text-green-400 font-semibold">
              Audit Saved Successfully
            </p>

            <p className="text-sm text-gray-400 mt-2 break-all">
              Shareable Link:
              http://localhost:5173/audit/{auditId}
            </p>
          </div>
        )}

        <div className="bg-zinc-900 p-6 rounded-2xl max-w-3xl mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Get Full Audit Report
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-zinc-800 mb-4"
          />

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-zinc-800 mb-4"
          />

          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-zinc-800 mb-4"
          />

          <button
            onClick={saveLead}
            className="bg-green-500 px-6 py-3 rounded-lg font-semibold"
          >
            Save Report
          </button>
        </div>
      </>
    )}

    <div className="mt-10">
      {auditResults.map((result, index) => (
        <div
          key={index}
          className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl mb-4 max-w-3xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-2">
            {result.tool}
          </h2>

          <p className="mb-2">
            Current Plan: {result.currentPlan}
          </p>

          <p className="mb-2 text-green-400">
            Recommendation:{" "}
            {result.recommendation}
          </p>

          <p className="mb-2">
            <span className="text-green-400 font-bold">
              Estimated Savings:
            </span>{" "}
            ${result.savings}/month
          </p>

          <p className="text-gray-400">
            {result.reason}
          </p>
        </div>
      ))}
    </div>
  </div>
) };


export default App;